/**
 * Planck.js v1.4.2
 * @license The MIT license
 * @copyright Copyright (c) 2025 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics$1 = function(d2, b2) {
  extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p in b3) if (Object.prototype.hasOwnProperty.call(b3, p)) d3[p] = b3[p];
  };
  return extendStatics$1(d2, b2);
};
function __extends$1(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics$1(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t) {
    for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
      s2 = arguments[i];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p)) t[p] = s2[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var options = function(input2, defaults) {
  if (input2 === null || typeof input2 === "undefined") {
    input2 = {};
  }
  var output2 = __assign$1({}, input2);
  for (var key in defaults) {
    if (defaults.hasOwnProperty(key) && typeof input2[key] === "undefined") {
      output2[key] = defaults[key];
    }
  }
  if (typeof Object.getOwnPropertySymbols === "function") {
    var symbols = Object.getOwnPropertySymbols(defaults);
    for (var i = 0; i < symbols.length; i++) {
      var symbol = symbols[i];
      if (defaults.propertyIsEnumerable(symbol) && typeof input2[symbol] === "undefined") {
        output2[symbol] = defaults[symbol];
      }
    }
  }
  return output2;
};
var math_random$1 = Math.random;
var EPSILON = 1e-9;
var isFinite = Number.isFinite;
function nextPowerOfTwo(x2) {
  x2 |= x2 >> 1;
  x2 |= x2 >> 2;
  x2 |= x2 >> 4;
  x2 |= x2 >> 8;
  x2 |= x2 >> 16;
  return x2 + 1;
}
function isPowerOfTwo(x2) {
  return x2 > 0 && (x2 & x2 - 1) === 0;
}
function mod(num, min, max) {
  if (typeof min === "undefined") {
    max = 1;
    min = 0;
  } else if (typeof max === "undefined") {
    max = min;
    min = 0;
  }
  if (max > min) {
    num = (num - min) % (max - min);
    return num + (num < 0 ? max : min);
  } else {
    num = (num - max) % (min - max);
    return num + (num <= 0 ? min : max);
  }
}
function clamp$1(num, min, max) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
}
function random$1(min, max) {
  if (typeof min === "undefined") {
    max = 1;
    min = 0;
  } else if (typeof max === "undefined") {
    max = min;
    min = 0;
  }
  return min === max ? min : math_random$1() * (max - min) + min;
}
var math$1 = Object.create(Math);
math$1.EPSILON = EPSILON;
math$1.isFinite = isFinite;
math$1.nextPowerOfTwo = nextPowerOfTwo;
math$1.isPowerOfTwo = isPowerOfTwo;
math$1.mod = mod;
math$1.clamp = clamp$1;
math$1.random = random$1;
var math_abs$a = Math.abs;
var math_sqrt$8 = Math.sqrt;
var math_max$b = Math.max;
var math_min$d = Math.min;
var Vec2 = (
  /** @class */
  function() {
    function Vec22(x2, y) {
      if (!(this instanceof Vec22)) {
        return new Vec22(x2, y);
      }
      if (typeof x2 === "undefined") {
        this.x = 0;
        this.y = 0;
      } else if (typeof x2 === "object") {
        this.x = x2.x;
        this.y = x2.y;
      } else {
        this.x = x2;
        this.y = y;
      }
    }
    Vec22.prototype._serialize = function() {
      return {
        x: this.x,
        y: this.y
      };
    };
    Vec22._deserialize = function(data) {
      var obj = Object.create(Vec22.prototype);
      obj.x = data.x;
      obj.y = data.y;
      return obj;
    };
    Vec22.zero = function() {
      var obj = Object.create(Vec22.prototype);
      obj.x = 0;
      obj.y = 0;
      return obj;
    };
    Vec22.neo = function(x2, y) {
      var obj = Object.create(Vec22.prototype);
      obj.x = x2;
      obj.y = y;
      return obj;
    };
    Vec22.clone = function(v3) {
      return Vec22.neo(v3.x, v3.y);
    };
    Vec22.prototype.toString = function() {
      return JSON.stringify(this);
    };
    Vec22.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return Number.isFinite(obj.x) && Number.isFinite(obj.y);
    };
    Vec22.assert = function(o) {
    };
    Vec22.prototype.clone = function() {
      return Vec22.clone(this);
    };
    Vec22.prototype.setZero = function() {
      this.x = 0;
      this.y = 0;
      return this;
    };
    Vec22.prototype.set = function(x2, y) {
      if (typeof x2 === "object") {
        this.x = x2.x;
        this.y = x2.y;
      } else {
        this.x = x2;
        this.y = y;
      }
      return this;
    };
    Vec22.prototype.setNum = function(x2, y) {
      this.x = x2;
      this.y = y;
      return this;
    };
    Vec22.prototype.setVec2 = function(value) {
      this.x = value.x;
      this.y = value.y;
      return this;
    };
    Vec22.prototype.wSet = function(a2, v3, b2, w) {
      if (typeof b2 !== "undefined" || typeof w !== "undefined") {
        return this.setCombine(a2, v3, b2, w);
      } else {
        return this.setMul(a2, v3);
      }
    };
    Vec22.prototype.setCombine = function(a2, v3, b2, w) {
      var x2 = a2 * v3.x + b2 * w.x;
      var y = a2 * v3.y + b2 * w.y;
      this.x = x2;
      this.y = y;
      return this;
    };
    Vec22.prototype.setMul = function(a2, v3) {
      var x2 = a2 * v3.x;
      var y = a2 * v3.y;
      this.x = x2;
      this.y = y;
      return this;
    };
    Vec22.prototype.add = function(w) {
      this.x += w.x;
      this.y += w.y;
      return this;
    };
    Vec22.prototype.wAdd = function(a2, v3, b2, w) {
      if (typeof b2 !== "undefined" || typeof w !== "undefined") {
        return this.addCombine(a2, v3, b2, w);
      } else {
        return this.addMul(a2, v3);
      }
    };
    Vec22.prototype.addCombine = function(a2, v3, b2, w) {
      var x2 = a2 * v3.x + b2 * w.x;
      var y = a2 * v3.y + b2 * w.y;
      this.x += x2;
      this.y += y;
      return this;
    };
    Vec22.prototype.addMul = function(a2, v3) {
      var x2 = a2 * v3.x;
      var y = a2 * v3.y;
      this.x += x2;
      this.y += y;
      return this;
    };
    Vec22.prototype.wSub = function(a2, v3, b2, w) {
      if (typeof b2 !== "undefined" || typeof w !== "undefined") {
        return this.subCombine(a2, v3, b2, w);
      } else {
        return this.subMul(a2, v3);
      }
    };
    Vec22.prototype.subCombine = function(a2, v3, b2, w) {
      var x2 = a2 * v3.x + b2 * w.x;
      var y = a2 * v3.y + b2 * w.y;
      this.x -= x2;
      this.y -= y;
      return this;
    };
    Vec22.prototype.subMul = function(a2, v3) {
      var x2 = a2 * v3.x;
      var y = a2 * v3.y;
      this.x -= x2;
      this.y -= y;
      return this;
    };
    Vec22.prototype.sub = function(w) {
      this.x -= w.x;
      this.y -= w.y;
      return this;
    };
    Vec22.prototype.mul = function(m) {
      this.x *= m;
      this.y *= m;
      return this;
    };
    Vec22.prototype.length = function() {
      return Vec22.lengthOf(this);
    };
    Vec22.prototype.lengthSquared = function() {
      return Vec22.lengthSquared(this);
    };
    Vec22.prototype.normalize = function() {
      var length2 = this.length();
      if (length2 < EPSILON) {
        return 0;
      }
      var invLength = 1 / length2;
      this.x *= invLength;
      this.y *= invLength;
      return length2;
    };
    Vec22.normalize = function(v3) {
      var length2 = Vec22.lengthOf(v3);
      if (length2 < EPSILON) {
        return Vec22.zero();
      }
      var invLength = 1 / length2;
      return Vec22.neo(v3.x * invLength, v3.y * invLength);
    };
    Vec22.lengthOf = function(v3) {
      return math_sqrt$8(v3.x * v3.x + v3.y * v3.y);
    };
    Vec22.lengthSquared = function(v3) {
      return v3.x * v3.x + v3.y * v3.y;
    };
    Vec22.distance = function(v3, w) {
      var dx = v3.x - w.x;
      var dy = v3.y - w.y;
      return math_sqrt$8(dx * dx + dy * dy);
    };
    Vec22.distanceSquared = function(v3, w) {
      var dx = v3.x - w.x;
      var dy = v3.y - w.y;
      return dx * dx + dy * dy;
    };
    Vec22.areEqual = function(v3, w) {
      return v3 === w || typeof w === "object" && w !== null && v3.x === w.x && v3.y === w.y;
    };
    Vec22.skew = function(v3) {
      return Vec22.neo(-v3.y, v3.x);
    };
    Vec22.dot = function(v3, w) {
      return v3.x * w.x + v3.y * w.y;
    };
    Vec22.cross = function(v3, w) {
      if (typeof w === "number") {
        return Vec22.neo(w * v3.y, -w * v3.x);
      } else if (typeof v3 === "number") {
        return Vec22.neo(-v3 * w.y, v3 * w.x);
      } else {
        return v3.x * w.y - v3.y * w.x;
      }
    };
    Vec22.crossVec2Vec2 = function(v3, w) {
      return v3.x * w.y - v3.y * w.x;
    };
    Vec22.crossVec2Num = function(v3, w) {
      return Vec22.neo(w * v3.y, -w * v3.x);
    };
    Vec22.crossNumVec2 = function(v3, w) {
      return Vec22.neo(-v3 * w.y, v3 * w.x);
    };
    Vec22.addCross = function(a2, v3, w) {
      if (typeof w === "number") {
        return Vec22.neo(w * v3.y + a2.x, -w * v3.x + a2.y);
      } else if (typeof v3 === "number") {
        return Vec22.neo(-v3 * w.y + a2.x, v3 * w.x + a2.y);
      }
    };
    Vec22.addCrossVec2Num = function(a2, v3, w) {
      return Vec22.neo(w * v3.y + a2.x, -w * v3.x + a2.y);
    };
    Vec22.addCrossNumVec2 = function(a2, v3, w) {
      return Vec22.neo(-v3 * w.y + a2.x, v3 * w.x + a2.y);
    };
    Vec22.add = function(v3, w) {
      return Vec22.neo(v3.x + w.x, v3.y + w.y);
    };
    Vec22.wAdd = function(a2, v3, b2, w) {
      if (typeof b2 !== "undefined" || typeof w !== "undefined") {
        return Vec22.combine(a2, v3, b2, w);
      } else {
        return Vec22.mulNumVec2(a2, v3);
      }
    };
    Vec22.combine = function(a2, v3, b2, w) {
      return Vec22.zero().setCombine(a2, v3, b2, w);
    };
    Vec22.sub = function(v3, w) {
      return Vec22.neo(v3.x - w.x, v3.y - w.y);
    };
    Vec22.mul = function(a2, b2) {
      if (typeof a2 === "object") {
        return Vec22.neo(a2.x * b2, a2.y * b2);
      } else if (typeof b2 === "object") {
        return Vec22.neo(a2 * b2.x, a2 * b2.y);
      }
    };
    Vec22.mulVec2Num = function(a2, b2) {
      return Vec22.neo(a2.x * b2, a2.y * b2);
    };
    Vec22.mulNumVec2 = function(a2, b2) {
      return Vec22.neo(a2 * b2.x, a2 * b2.y);
    };
    Vec22.prototype.neg = function() {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    };
    Vec22.neg = function(v3) {
      return Vec22.neo(-v3.x, -v3.y);
    };
    Vec22.abs = function(v3) {
      return Vec22.neo(math_abs$a(v3.x), math_abs$a(v3.y));
    };
    Vec22.mid = function(v3, w) {
      return Vec22.neo((v3.x + w.x) * 0.5, (v3.y + w.y) * 0.5);
    };
    Vec22.upper = function(v3, w) {
      return Vec22.neo(math_max$b(v3.x, w.x), math_max$b(v3.y, w.y));
    };
    Vec22.lower = function(v3, w) {
      return Vec22.neo(math_min$d(v3.x, w.x), math_min$d(v3.y, w.y));
    };
    Vec22.prototype.clamp = function(max) {
      var lengthSqr = this.x * this.x + this.y * this.y;
      if (lengthSqr > max * max) {
        var scale = max / math_sqrt$8(lengthSqr);
        this.x *= scale;
        this.y *= scale;
      }
      return this;
    };
    Vec22.clamp = function(v3, max) {
      var r = Vec22.neo(v3.x, v3.y);
      r.clamp(max);
      return r;
    };
    Vec22.clampVec2 = function(v3, min, max) {
      return {
        x: clamp$1(v3.x, min === null || min === void 0 ? void 0 : min.x, max === null || max === void 0 ? void 0 : max.x),
        y: clamp$1(v3.y, min === null || min === void 0 ? void 0 : min.y, max === null || max === void 0 ? void 0 : max.y)
      };
    };
    Vec22.scaleFn = function(x2, y) {
      return function(v3) {
        return Vec22.neo(v3.x * x2, v3.y * y);
      };
    };
    Vec22.translateFn = function(x2, y) {
      return function(v3) {
        return Vec22.neo(v3.x + x2, v3.y + y);
      };
    };
    return Vec22;
  }()
);
var math_max$a = Math.max;
var math_min$c = Math.min;
var AABB = (
  /** @class */
  function() {
    function AABB2(lower, upper) {
      if (!(this instanceof AABB2)) {
        return new AABB2(lower, upper);
      }
      this.lowerBound = Vec2.zero();
      this.upperBound = Vec2.zero();
      if (typeof lower === "object") {
        this.lowerBound.setVec2(lower);
      }
      if (typeof upper === "object") {
        this.upperBound.setVec2(upper);
      } else if (typeof lower === "object") {
        this.upperBound.setVec2(lower);
      }
    }
    AABB2.prototype.isValid = function() {
      return AABB2.isValid(this);
    };
    AABB2.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return Vec2.isValid(obj.lowerBound) && Vec2.isValid(obj.upperBound) && Vec2.sub(obj.upperBound, obj.lowerBound).lengthSquared() >= 0;
    };
    AABB2.assert = function(o) {
    };
    AABB2.prototype.getCenter = function() {
      return Vec2.neo((this.lowerBound.x + this.upperBound.x) * 0.5, (this.lowerBound.y + this.upperBound.y) * 0.5);
    };
    AABB2.prototype.getExtents = function() {
      return Vec2.neo((this.upperBound.x - this.lowerBound.x) * 0.5, (this.upperBound.y - this.lowerBound.y) * 0.5);
    };
    AABB2.prototype.getPerimeter = function() {
      return 2 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
    };
    AABB2.prototype.combine = function(a2, b2) {
      b2 = b2 || this;
      var lowerA = a2.lowerBound;
      var upperA = a2.upperBound;
      var lowerB = b2.lowerBound;
      var upperB = b2.upperBound;
      var lowerX = math_min$c(lowerA.x, lowerB.x);
      var lowerY = math_min$c(lowerA.y, lowerB.y);
      var upperX = math_max$a(upperB.x, upperA.x);
      var upperY = math_max$a(upperB.y, upperA.y);
      this.lowerBound.setNum(lowerX, lowerY);
      this.upperBound.setNum(upperX, upperY);
    };
    AABB2.prototype.combinePoints = function(a2, b2) {
      this.lowerBound.setNum(math_min$c(a2.x, b2.x), math_min$c(a2.y, b2.y));
      this.upperBound.setNum(math_max$a(a2.x, b2.x), math_max$a(a2.y, b2.y));
    };
    AABB2.prototype.set = function(aabb) {
      this.lowerBound.setNum(aabb.lowerBound.x, aabb.lowerBound.y);
      this.upperBound.setNum(aabb.upperBound.x, aabb.upperBound.y);
    };
    AABB2.prototype.contains = function(aabb) {
      var result = true;
      result = result && this.lowerBound.x <= aabb.lowerBound.x;
      result = result && this.lowerBound.y <= aabb.lowerBound.y;
      result = result && aabb.upperBound.x <= this.upperBound.x;
      result = result && aabb.upperBound.y <= this.upperBound.y;
      return result;
    };
    AABB2.prototype.extend = function(value) {
      AABB2.extend(this, value);
      return this;
    };
    AABB2.extend = function(out, value) {
      out.lowerBound.x -= value;
      out.lowerBound.y -= value;
      out.upperBound.x += value;
      out.upperBound.y += value;
      return out;
    };
    AABB2.testOverlap = function(a2, b2) {
      var d1x = b2.lowerBound.x - a2.upperBound.x;
      var d2x = a2.lowerBound.x - b2.upperBound.x;
      var d1y = b2.lowerBound.y - a2.upperBound.y;
      var d2y = a2.lowerBound.y - b2.upperBound.y;
      if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
        return false;
      }
      return true;
    };
    AABB2.areEqual = function(a2, b2) {
      return Vec2.areEqual(a2.lowerBound, b2.lowerBound) && Vec2.areEqual(a2.upperBound, b2.upperBound);
    };
    AABB2.diff = function(a2, b2) {
      var wD = math_max$a(0, math_min$c(a2.upperBound.x, b2.upperBound.x) - math_max$a(b2.lowerBound.x, a2.lowerBound.x));
      var hD = math_max$a(0, math_min$c(a2.upperBound.y, b2.upperBound.y) - math_max$a(b2.lowerBound.y, a2.lowerBound.y));
      var wA = a2.upperBound.x - a2.lowerBound.x;
      var hA = a2.upperBound.y - a2.lowerBound.y;
      var wB = b2.upperBound.x - b2.lowerBound.x;
      var hB = b2.upperBound.y - b2.lowerBound.y;
      return wA * hA + wB * hB - wD * hD;
    };
    AABB2.prototype.rayCast = function(output2, input2) {
      var tmin = -Infinity;
      var tmax = Infinity;
      var p = input2.p1;
      var d2 = Vec2.sub(input2.p2, input2.p1);
      var absD = Vec2.abs(d2);
      var normal3 = Vec2.zero();
      {
        if (absD.x < EPSILON) {
          if (p.x < this.lowerBound.x || this.upperBound.x < p.x) {
            return false;
          }
        } else {
          var inv_d = 1 / d2.x;
          var t1 = (this.lowerBound.x - p.x) * inv_d;
          var t2 = (this.upperBound.x - p.x) * inv_d;
          var s2 = -1;
          if (t1 > t2) {
            var temp3 = t1;
            t1 = t2;
            t2 = temp3;
            s2 = 1;
          }
          if (t1 > tmin) {
            normal3.setZero();
            normal3.x = s2;
            tmin = t1;
          }
          tmax = math_min$c(tmax, t2);
          if (tmin > tmax) {
            return false;
          }
        }
      }
      {
        if (absD.y < EPSILON) {
          if (p.y < this.lowerBound.y || this.upperBound.y < p.y) {
            return false;
          }
        } else {
          var inv_d = 1 / d2.y;
          var t1 = (this.lowerBound.y - p.y) * inv_d;
          var t2 = (this.upperBound.y - p.y) * inv_d;
          var s2 = -1;
          if (t1 > t2) {
            var temp3 = t1;
            t1 = t2;
            t2 = temp3;
            s2 = 1;
          }
          if (t1 > tmin) {
            normal3.setZero();
            normal3.y = s2;
            tmin = t1;
          }
          tmax = math_min$c(tmax, t2);
          if (tmin > tmax) {
            return false;
          }
        }
      }
      if (tmin < 0 || input2.maxFraction < tmin) {
        return false;
      }
      output2.fraction = tmin;
      output2.normal = normal3;
      return true;
    };
    AABB2.prototype.toString = function() {
      return JSON.stringify(this);
    };
    AABB2.combinePoints = function(out, a2, b2) {
      out.lowerBound.x = math_min$c(a2.x, b2.x);
      out.lowerBound.y = math_min$c(a2.y, b2.y);
      out.upperBound.x = math_max$a(a2.x, b2.x);
      out.upperBound.y = math_max$a(a2.y, b2.y);
      return out;
    };
    AABB2.combinedPerimeter = function(a2, b2) {
      var lx = math_min$c(a2.lowerBound.x, b2.lowerBound.x);
      var ly = math_min$c(a2.lowerBound.y, b2.lowerBound.y);
      var ux = math_max$a(a2.upperBound.x, b2.upperBound.x);
      var uy = math_max$a(a2.upperBound.y, b2.upperBound.y);
      return 2 * (ux - lx + uy - ly);
    };
    return AABB2;
  }()
);
var math_PI$8 = Math.PI;
var Settings = (
  /** @class */
  function() {
    function Settings2() {
    }
    Object.defineProperty(Settings2, "polygonRadius", {
      /**
       * The radius of the polygon/edge shape skin. This should not be modified.
       * Making this smaller means polygons will have an insufficient buffer for
       * continuous collision. Making it larger may create artifacts for vertex
       * collision.
       */
      get: function() {
        return 2 * Settings2.linearSlop;
      },
      enumerable: false,
      configurable: true
    });
    Settings2.lengthUnitsPerMeter = 1;
    Settings2.maxManifoldPoints = 2;
    Settings2.maxPolygonVertices = 12;
    Settings2.aabbExtension = 0.1;
    Settings2.aabbMultiplier = 2;
    Settings2.linearSlop = 5e-3;
    Settings2.angularSlop = 2 / 180 * math_PI$8;
    Settings2.maxSubSteps = 8;
    Settings2.maxTOIContacts = 32;
    Settings2.maxTOIIterations = 20;
    Settings2.maxDistanceIterations = 20;
    Settings2.velocityThreshold = 1;
    Settings2.maxLinearCorrection = 0.2;
    Settings2.maxAngularCorrection = 8 / 180 * math_PI$8;
    Settings2.maxTranslation = 2;
    Settings2.maxRotation = 0.5 * math_PI$8;
    Settings2.baumgarte = 0.2;
    Settings2.toiBaugarte = 0.75;
    Settings2.timeToSleep = 0.5;
    Settings2.linearSleepTolerance = 0.01;
    Settings2.angularSleepTolerance = 2 / 180 * math_PI$8;
    return Settings2;
  }()
);
var SettingsInternal = (
  /** @class */
  function() {
    function SettingsInternal2() {
    }
    Object.defineProperty(SettingsInternal2, "maxManifoldPoints", {
      get: function() {
        return Settings.maxManifoldPoints;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxPolygonVertices", {
      get: function() {
        return Settings.maxPolygonVertices;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "aabbExtension", {
      get: function() {
        return Settings.aabbExtension * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "aabbMultiplier", {
      get: function() {
        return Settings.aabbMultiplier;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "linearSlop", {
      get: function() {
        return Settings.linearSlop * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "linearSlopSquared", {
      get: function() {
        return Settings.linearSlop * Settings.lengthUnitsPerMeter * Settings.linearSlop * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "angularSlop", {
      get: function() {
        return Settings.angularSlop;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "polygonRadius", {
      get: function() {
        return 2 * Settings.linearSlop;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxSubSteps", {
      get: function() {
        return Settings.maxSubSteps;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxTOIContacts", {
      get: function() {
        return Settings.maxTOIContacts;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxTOIIterations", {
      get: function() {
        return Settings.maxTOIIterations;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxDistanceIterations", {
      get: function() {
        return Settings.maxDistanceIterations;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "velocityThreshold", {
      get: function() {
        return Settings.velocityThreshold * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxLinearCorrection", {
      get: function() {
        return Settings.maxLinearCorrection * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxAngularCorrection", {
      get: function() {
        return Settings.maxAngularCorrection;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxTranslation", {
      get: function() {
        return Settings.maxTranslation * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxTranslationSquared", {
      get: function() {
        return Settings.maxTranslation * Settings.lengthUnitsPerMeter * Settings.maxTranslation * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxRotation", {
      get: function() {
        return Settings.maxRotation;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "maxRotationSquared", {
      get: function() {
        return Settings.maxRotation * Settings.maxRotation;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "baumgarte", {
      get: function() {
        return Settings.baumgarte;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "toiBaugarte", {
      get: function() {
        return Settings.toiBaugarte;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "timeToSleep", {
      get: function() {
        return Settings.timeToSleep;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "linearSleepTolerance", {
      get: function() {
        return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "linearSleepToleranceSqr", {
      get: function() {
        return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter * Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "angularSleepTolerance", {
      get: function() {
        return Settings.angularSleepTolerance;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SettingsInternal2, "angularSleepToleranceSqr", {
      get: function() {
        return Settings.angularSleepTolerance * Settings.angularSleepTolerance;
      },
      enumerable: false,
      configurable: true
    });
    return SettingsInternal2;
  }()
);
var Pool = (
  /** @class */
  function() {
    function Pool2(opts) {
      this._list = [];
      this._max = Infinity;
      this._hasCreateFn = false;
      this._createCount = 0;
      this._hasAllocateFn = false;
      this._allocateCount = 0;
      this._hasReleaseFn = false;
      this._releaseCount = 0;
      this._hasDisposeFn = false;
      this._disposeCount = 0;
      this._list = [];
      this._max = opts.max || this._max;
      this._createFn = opts.create;
      this._hasCreateFn = typeof this._createFn === "function";
      this._allocateFn = opts.allocate;
      this._hasAllocateFn = typeof this._allocateFn === "function";
      this._releaseFn = opts.release;
      this._hasReleaseFn = typeof this._releaseFn === "function";
      this._disposeFn = opts.dispose;
      this._hasDisposeFn = typeof this._disposeFn === "function";
    }
    Pool2.prototype.max = function(n2) {
      if (typeof n2 === "number") {
        this._max = n2;
        return this;
      }
      return this._max;
    };
    Pool2.prototype.size = function() {
      return this._list.length;
    };
    Pool2.prototype.allocate = function() {
      var item;
      if (this._list.length > 0) {
        item = this._list.shift();
      } else {
        this._createCount++;
        if (this._hasCreateFn) {
          item = this._createFn();
        } else {
          item = {};
        }
      }
      this._allocateCount++;
      if (this._hasAllocateFn) {
        this._allocateFn(item);
      }
      return item;
    };
    Pool2.prototype.release = function(item) {
      if (this._list.length < this._max) {
        this._releaseCount++;
        if (this._hasReleaseFn) {
          this._releaseFn(item);
        }
        this._list.push(item);
      } else {
        this._disposeCount++;
        if (this._hasDisposeFn) {
          item = this._disposeFn(item);
        }
      }
    };
    Pool2.prototype.toString = function() {
      return " +" + this._createCount + " >" + this._allocateCount + " <" + this._releaseCount + " -" + this._disposeCount + " =" + this._list.length + "/" + this._max;
    };
    return Pool2;
  }()
);
var math_abs$9 = Math.abs;
var math_max$9 = Math.max;
var TreeNode = (
  /** @class */
  function() {
    function TreeNode2(id) {
      this.aabb = new AABB();
      this.userData = null;
      this.parent = null;
      this.child1 = null;
      this.child2 = null;
      this.height = -1;
      this.id = id;
    }
    TreeNode2.prototype.toString = function() {
      return this.id + ": " + this.userData;
    };
    TreeNode2.prototype.isLeaf = function() {
      return this.child1 == null;
    };
    return TreeNode2;
  }()
);
var poolTreeNode = new Pool({
  create: function() {
    return new TreeNode();
  },
  release: function(node) {
    node.userData = null;
    node.parent = null;
    node.child1 = null;
    node.child2 = null;
    node.height = -1;
    node.id = void 0;
  }
});
var DynamicTree = (
  /** @class */
  function() {
    function DynamicTree2() {
      this.inputPool = new Pool({
        create: function() {
          return {};
        },
        release: function(stack) {
        }
      });
      this.stackPool = new Pool({
        create: function() {
          return [];
        },
        release: function(stack) {
          stack.length = 0;
        }
      });
      this.iteratorPool = new Pool({
        create: function() {
          return new Iterator();
        },
        release: function(iterator) {
          iterator.close();
        }
      });
      this.m_root = null;
      this.m_nodes = {};
      this.m_lastProxyId = 0;
    }
    DynamicTree2.prototype.getUserData = function(id) {
      var node = this.m_nodes[id];
      return node.userData;
    };
    DynamicTree2.prototype.getFatAABB = function(id) {
      var node = this.m_nodes[id];
      return node.aabb;
    };
    DynamicTree2.prototype.allocateNode = function() {
      var node = poolTreeNode.allocate();
      node.id = ++this.m_lastProxyId;
      this.m_nodes[node.id] = node;
      return node;
    };
    DynamicTree2.prototype.freeNode = function(node) {
      delete this.m_nodes[node.id];
      poolTreeNode.release(node);
    };
    DynamicTree2.prototype.createProxy = function(aabb, userData) {
      var node = this.allocateNode();
      node.aabb.set(aabb);
      AABB.extend(node.aabb, SettingsInternal.aabbExtension);
      node.userData = userData;
      node.height = 0;
      this.insertLeaf(node);
      return node.id;
    };
    DynamicTree2.prototype.destroyProxy = function(id) {
      var node = this.m_nodes[id];
      this.removeLeaf(node);
      this.freeNode(node);
    };
    DynamicTree2.prototype.moveProxy = function(id, aabb, d2) {
      var node = this.m_nodes[id];
      if (node.aabb.contains(aabb)) {
        return false;
      }
      this.removeLeaf(node);
      node.aabb.set(aabb);
      aabb = node.aabb;
      AABB.extend(aabb, SettingsInternal.aabbExtension);
      if (d2.x < 0) {
        aabb.lowerBound.x += d2.x * SettingsInternal.aabbMultiplier;
      } else {
        aabb.upperBound.x += d2.x * SettingsInternal.aabbMultiplier;
      }
      if (d2.y < 0) {
        aabb.lowerBound.y += d2.y * SettingsInternal.aabbMultiplier;
      } else {
        aabb.upperBound.y += d2.y * SettingsInternal.aabbMultiplier;
      }
      this.insertLeaf(node);
      return true;
    };
    DynamicTree2.prototype.insertLeaf = function(leaf) {
      if (this.m_root == null) {
        this.m_root = leaf;
        this.m_root.parent = null;
        return;
      }
      var leafAABB = leaf.aabb;
      var index = this.m_root;
      while (!index.isLeaf()) {
        var child1 = index.child1;
        var child2 = index.child2;
        var area = index.aabb.getPerimeter();
        var combinedArea = AABB.combinedPerimeter(index.aabb, leafAABB);
        var cost = 2 * combinedArea;
        var inheritanceCost = 2 * (combinedArea - area);
        var newArea1 = AABB.combinedPerimeter(leafAABB, child1.aabb);
        var cost1 = newArea1 + inheritanceCost;
        if (!child1.isLeaf()) {
          var oldArea = child1.aabb.getPerimeter();
          cost1 -= oldArea;
        }
        var newArea2 = AABB.combinedPerimeter(leafAABB, child2.aabb);
        var cost2 = newArea2 + inheritanceCost;
        if (!child2.isLeaf()) {
          var oldArea = child2.aabb.getPerimeter();
          cost2 -= oldArea;
        }
        if (cost < cost1 && cost < cost2) {
          break;
        }
        if (cost1 < cost2) {
          index = child1;
        } else {
          index = child2;
        }
      }
      var sibling = index;
      var oldParent = sibling.parent;
      var newParent = this.allocateNode();
      newParent.parent = oldParent;
      newParent.userData = null;
      newParent.aabb.combine(leafAABB, sibling.aabb);
      newParent.height = sibling.height + 1;
      if (oldParent != null) {
        if (oldParent.child1 === sibling) {
          oldParent.child1 = newParent;
        } else {
          oldParent.child2 = newParent;
        }
        newParent.child1 = sibling;
        newParent.child2 = leaf;
        sibling.parent = newParent;
        leaf.parent = newParent;
      } else {
        newParent.child1 = sibling;
        newParent.child2 = leaf;
        sibling.parent = newParent;
        leaf.parent = newParent;
        this.m_root = newParent;
      }
      index = leaf.parent;
      while (index != null) {
        index = this.balance(index);
        var child1 = index.child1;
        var child2 = index.child2;
        index.height = 1 + math_max$9(child1.height, child2.height);
        index.aabb.combine(child1.aabb, child2.aabb);
        index = index.parent;
      }
    };
    DynamicTree2.prototype.removeLeaf = function(leaf) {
      if (leaf === this.m_root) {
        this.m_root = null;
        return;
      }
      var parent = leaf.parent;
      var grandParent = parent.parent;
      var sibling;
      if (parent.child1 === leaf) {
        sibling = parent.child2;
      } else {
        sibling = parent.child1;
      }
      if (grandParent != null) {
        if (grandParent.child1 === parent) {
          grandParent.child1 = sibling;
        } else {
          grandParent.child2 = sibling;
        }
        sibling.parent = grandParent;
        this.freeNode(parent);
        var index = grandParent;
        while (index != null) {
          index = this.balance(index);
          var child1 = index.child1;
          var child2 = index.child2;
          index.aabb.combine(child1.aabb, child2.aabb);
          index.height = 1 + math_max$9(child1.height, child2.height);
          index = index.parent;
        }
      } else {
        this.m_root = sibling;
        sibling.parent = null;
        this.freeNode(parent);
      }
    };
    DynamicTree2.prototype.balance = function(iA) {
      var A = iA;
      if (A.isLeaf() || A.height < 2) {
        return iA;
      }
      var B = A.child1;
      var C = A.child2;
      var balance = C.height - B.height;
      if (balance > 1) {
        var F = C.child1;
        var G = C.child2;
        C.child1 = A;
        C.parent = A.parent;
        A.parent = C;
        if (C.parent != null) {
          if (C.parent.child1 === iA) {
            C.parent.child1 = C;
          } else {
            C.parent.child2 = C;
          }
        } else {
          this.m_root = C;
        }
        if (F.height > G.height) {
          C.child2 = F;
          A.child2 = G;
          G.parent = A;
          A.aabb.combine(B.aabb, G.aabb);
          C.aabb.combine(A.aabb, F.aabb);
          A.height = 1 + math_max$9(B.height, G.height);
          C.height = 1 + math_max$9(A.height, F.height);
        } else {
          C.child2 = G;
          A.child2 = F;
          F.parent = A;
          A.aabb.combine(B.aabb, F.aabb);
          C.aabb.combine(A.aabb, G.aabb);
          A.height = 1 + math_max$9(B.height, F.height);
          C.height = 1 + math_max$9(A.height, G.height);
        }
        return C;
      }
      if (balance < -1) {
        var D = B.child1;
        var E = B.child2;
        B.child1 = A;
        B.parent = A.parent;
        A.parent = B;
        if (B.parent != null) {
          if (B.parent.child1 === A) {
            B.parent.child1 = B;
          } else {
            B.parent.child2 = B;
          }
        } else {
          this.m_root = B;
        }
        if (D.height > E.height) {
          B.child2 = D;
          A.child1 = E;
          E.parent = A;
          A.aabb.combine(C.aabb, E.aabb);
          B.aabb.combine(A.aabb, D.aabb);
          A.height = 1 + math_max$9(C.height, E.height);
          B.height = 1 + math_max$9(A.height, D.height);
        } else {
          B.child2 = E;
          A.child1 = D;
          D.parent = A;
          A.aabb.combine(C.aabb, D.aabb);
          B.aabb.combine(A.aabb, E.aabb);
          A.height = 1 + math_max$9(C.height, D.height);
          B.height = 1 + math_max$9(A.height, E.height);
        }
        return B;
      }
      return A;
    };
    DynamicTree2.prototype.getHeight = function() {
      if (this.m_root == null) {
        return 0;
      }
      return this.m_root.height;
    };
    DynamicTree2.prototype.getAreaRatio = function() {
      if (this.m_root == null) {
        return 0;
      }
      var root = this.m_root;
      var rootArea = root.aabb.getPerimeter();
      var totalArea = 0;
      var node;
      var it = this.iteratorPool.allocate().preorder(this.m_root);
      while (node = it.next()) {
        if (node.height < 0) {
          continue;
        }
        totalArea += node.aabb.getPerimeter();
      }
      this.iteratorPool.release(it);
      return totalArea / rootArea;
    };
    DynamicTree2.prototype.computeHeight = function(id) {
      var node;
      if (typeof id !== "undefined") {
        node = this.m_nodes[id];
      } else {
        node = this.m_root;
      }
      if (node.isLeaf()) {
        return 0;
      }
      var height1 = this.computeHeight(node.child1.id);
      var height2 = this.computeHeight(node.child2.id);
      return 1 + math_max$9(height1, height2);
    };
    DynamicTree2.prototype.validateStructure = function(node) {
      if (node == null) {
        return;
      }
      if (node === this.m_root) ;
      var child1 = node.child1;
      var child2 = node.child2;
      if (node.isLeaf()) {
        return;
      }
      this.validateStructure(child1);
      this.validateStructure(child2);
    };
    DynamicTree2.prototype.validateMetrics = function(node) {
      if (node == null) {
        return;
      }
      var child1 = node.child1;
      var child2 = node.child2;
      if (node.isLeaf()) {
        return;
      }
      this.validateMetrics(child1);
      this.validateMetrics(child2);
    };
    DynamicTree2.prototype.validate = function() {
      return;
    };
    DynamicTree2.prototype.getMaxBalance = function() {
      var maxBalance = 0;
      var node;
      var it = this.iteratorPool.allocate().preorder(this.m_root);
      while (node = it.next()) {
        if (node.height <= 1) {
          continue;
        }
        var balance = math_abs$9(node.child2.height - node.child1.height);
        maxBalance = math_max$9(maxBalance, balance);
      }
      this.iteratorPool.release(it);
      return maxBalance;
    };
    DynamicTree2.prototype.rebuildBottomUp = function() {
      var nodes = [];
      var count = 0;
      var node;
      var it = this.iteratorPool.allocate().preorder(this.m_root);
      while (node = it.next()) {
        if (node.height < 0) {
          continue;
        }
        if (node.isLeaf()) {
          node.parent = null;
          nodes[count] = node;
          ++count;
        } else {
          this.freeNode(node);
        }
      }
      this.iteratorPool.release(it);
      while (count > 1) {
        var minCost = Infinity;
        var iMin = -1;
        var jMin = -1;
        for (var i = 0; i < count; ++i) {
          var aabbi = nodes[i].aabb;
          for (var j = i + 1; j < count; ++j) {
            var aabbj = nodes[j].aabb;
            var cost = AABB.combinedPerimeter(aabbi, aabbj);
            if (cost < minCost) {
              iMin = i;
              jMin = j;
              minCost = cost;
            }
          }
        }
        var child1 = nodes[iMin];
        var child2 = nodes[jMin];
        var parent_1 = this.allocateNode();
        parent_1.child1 = child1;
        parent_1.child2 = child2;
        parent_1.height = 1 + math_max$9(child1.height, child2.height);
        parent_1.aabb.combine(child1.aabb, child2.aabb);
        parent_1.parent = null;
        child1.parent = parent_1;
        child2.parent = parent_1;
        nodes[jMin] = nodes[count - 1];
        nodes[iMin] = parent_1;
        --count;
      }
      this.m_root = nodes[0];
    };
    DynamicTree2.prototype.shiftOrigin = function(newOrigin) {
      var node;
      var it = this.iteratorPool.allocate().preorder(this.m_root);
      while (node = it.next()) {
        var aabb = node.aabb;
        aabb.lowerBound.x -= newOrigin.x;
        aabb.lowerBound.y -= newOrigin.y;
        aabb.upperBound.x -= newOrigin.x;
        aabb.upperBound.y -= newOrigin.y;
      }
      this.iteratorPool.release(it);
    };
    DynamicTree2.prototype.query = function(aabb, queryCallback) {
      var stack = this.stackPool.allocate();
      stack.push(this.m_root);
      while (stack.length > 0) {
        var node = stack.pop();
        if (node == null) {
          continue;
        }
        if (AABB.testOverlap(node.aabb, aabb)) {
          if (node.isLeaf()) {
            var proceed = queryCallback(node.id);
            if (proceed === false) {
              return;
            }
          } else {
            stack.push(node.child1);
            stack.push(node.child2);
          }
        }
      }
      this.stackPool.release(stack);
    };
    DynamicTree2.prototype.rayCast = function(input2, rayCastCallback) {
      var p1 = input2.p1;
      var p2 = input2.p2;
      var r = Vec2.sub(p2, p1);
      r.normalize();
      var v3 = Vec2.crossNumVec2(1, r);
      var abs_v = Vec2.abs(v3);
      var maxFraction = input2.maxFraction;
      var segmentAABB = new AABB();
      var t = Vec2.combine(1 - maxFraction, p1, maxFraction, p2);
      segmentAABB.combinePoints(p1, t);
      var stack = this.stackPool.allocate();
      var subInput = this.inputPool.allocate();
      stack.push(this.m_root);
      while (stack.length > 0) {
        var node = stack.pop();
        if (node == null) {
          continue;
        }
        if (AABB.testOverlap(node.aabb, segmentAABB) === false) {
          continue;
        }
        var c2 = node.aabb.getCenter();
        var h = node.aabb.getExtents();
        var separation = math_abs$9(Vec2.dot(v3, Vec2.sub(p1, c2))) - Vec2.dot(abs_v, h);
        if (separation > 0) {
          continue;
        }
        if (node.isLeaf()) {
          subInput.p1 = Vec2.clone(input2.p1);
          subInput.p2 = Vec2.clone(input2.p2);
          subInput.maxFraction = maxFraction;
          var value = rayCastCallback(subInput, node.id);
          if (value === 0) {
            break;
          } else if (value > 0) {
            maxFraction = value;
            t = Vec2.combine(1 - maxFraction, p1, maxFraction, p2);
            segmentAABB.combinePoints(p1, t);
          }
        } else {
          stack.push(node.child1);
          stack.push(node.child2);
        }
      }
      this.stackPool.release(stack);
      this.inputPool.release(subInput);
    };
    return DynamicTree2;
  }()
);
var Iterator = (
  /** @class */
  function() {
    function Iterator2() {
      this.parents = [];
      this.states = [];
    }
    Iterator2.prototype.preorder = function(root) {
      this.parents.length = 0;
      this.parents.push(root);
      this.states.length = 0;
      this.states.push(0);
      return this;
    };
    Iterator2.prototype.next = function() {
      while (this.parents.length > 0) {
        var i = this.parents.length - 1;
        var node = this.parents[i];
        if (this.states[i] === 0) {
          this.states[i] = 1;
          return node;
        }
        if (this.states[i] === 1) {
          this.states[i] = 2;
          if (node.child1) {
            this.parents.push(node.child1);
            this.states.push(1);
            return node.child1;
          }
        }
        if (this.states[i] === 2) {
          this.states[i] = 3;
          if (node.child2) {
            this.parents.push(node.child2);
            this.states.push(1);
            return node.child2;
          }
        }
        this.parents.pop();
        this.states.pop();
      }
    };
    Iterator2.prototype.close = function() {
      this.parents.length = 0;
    };
    return Iterator2;
  }()
);
var math_max$8 = Math.max;
var math_min$b = Math.min;
var BroadPhase = (
  /** @class */
  function() {
    function BroadPhase2() {
      var _this = this;
      this.m_tree = new DynamicTree();
      this.m_moveBuffer = [];
      this.query = function(aabb, queryCallback) {
        _this.m_tree.query(aabb, queryCallback);
      };
      this.queryCallback = function(proxyId) {
        if (proxyId === _this.m_queryProxyId) {
          return true;
        }
        var proxyIdA = math_min$b(proxyId, _this.m_queryProxyId);
        var proxyIdB = math_max$8(proxyId, _this.m_queryProxyId);
        var userDataA = _this.m_tree.getUserData(proxyIdA);
        var userDataB = _this.m_tree.getUserData(proxyIdB);
        _this.m_callback(userDataA, userDataB);
        return true;
      };
    }
    BroadPhase2.prototype.getUserData = function(proxyId) {
      return this.m_tree.getUserData(proxyId);
    };
    BroadPhase2.prototype.testOverlap = function(proxyIdA, proxyIdB) {
      var aabbA = this.m_tree.getFatAABB(proxyIdA);
      var aabbB = this.m_tree.getFatAABB(proxyIdB);
      return AABB.testOverlap(aabbA, aabbB);
    };
    BroadPhase2.prototype.getFatAABB = function(proxyId) {
      return this.m_tree.getFatAABB(proxyId);
    };
    BroadPhase2.prototype.getProxyCount = function() {
      return this.m_moveBuffer.length;
    };
    BroadPhase2.prototype.getTreeHeight = function() {
      return this.m_tree.getHeight();
    };
    BroadPhase2.prototype.getTreeBalance = function() {
      return this.m_tree.getMaxBalance();
    };
    BroadPhase2.prototype.getTreeQuality = function() {
      return this.m_tree.getAreaRatio();
    };
    BroadPhase2.prototype.rayCast = function(input2, rayCastCallback) {
      this.m_tree.rayCast(input2, rayCastCallback);
    };
    BroadPhase2.prototype.shiftOrigin = function(newOrigin) {
      this.m_tree.shiftOrigin(newOrigin);
    };
    BroadPhase2.prototype.createProxy = function(aabb, userData) {
      var proxyId = this.m_tree.createProxy(aabb, userData);
      this.bufferMove(proxyId);
      return proxyId;
    };
    BroadPhase2.prototype.destroyProxy = function(proxyId) {
      this.unbufferMove(proxyId);
      this.m_tree.destroyProxy(proxyId);
    };
    BroadPhase2.prototype.moveProxy = function(proxyId, aabb, displacement2) {
      var changed = this.m_tree.moveProxy(proxyId, aabb, displacement2);
      if (changed) {
        this.bufferMove(proxyId);
      }
    };
    BroadPhase2.prototype.touchProxy = function(proxyId) {
      this.bufferMove(proxyId);
    };
    BroadPhase2.prototype.bufferMove = function(proxyId) {
      this.m_moveBuffer.push(proxyId);
    };
    BroadPhase2.prototype.unbufferMove = function(proxyId) {
      for (var i = 0; i < this.m_moveBuffer.length; ++i) {
        if (this.m_moveBuffer[i] === proxyId) {
          this.m_moveBuffer[i] = null;
        }
      }
    };
    BroadPhase2.prototype.updatePairs = function(addPairCallback) {
      this.m_callback = addPairCallback;
      while (this.m_moveBuffer.length > 0) {
        this.m_queryProxyId = this.m_moveBuffer.pop();
        if (this.m_queryProxyId === null) {
          continue;
        }
        var fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);
        this.m_tree.query(fatAABB, this.queryCallback);
      }
    };
    return BroadPhase2;
  }()
);
var math_sin$2 = Math.sin;
var math_cos$2 = Math.cos;
var math_sqrt$7 = Math.sqrt;
function vec2(x2, y) {
  return { x: x2, y };
}
function rotation(angle) {
  return { s: math_sin$2(angle), c: math_cos$2(angle) };
}
function setVec2(out, x2, y) {
  out.x = x2;
  out.y = y;
  return out;
}
function copyVec2(out, w) {
  out.x = w.x;
  out.y = w.y;
  return out;
}
function zeroVec2(out) {
  out.x = 0;
  out.y = 0;
  return out;
}
function negVec2(out) {
  out.x = -out.x;
  out.y = -out.y;
  return out;
}
function plusVec2(out, w) {
  out.x += w.x;
  out.y += w.y;
  return out;
}
function addVec2(out, v3, w) {
  out.x = v3.x + w.x;
  out.y = v3.x + w.y;
  return out;
}
function minusVec2(out, w) {
  out.x -= w.x;
  out.y -= w.y;
  return out;
}
function subVec2(out, v3, w) {
  out.x = v3.x - w.x;
  out.y = v3.y - w.y;
  return out;
}
function mulVec2(out, m) {
  out.x *= m;
  out.y *= m;
  return out;
}
function scaleVec2(out, m, w) {
  out.x = m * w.x;
  out.y = m * w.y;
  return out;
}
function plusScaleVec2(out, m, w) {
  out.x += m * w.x;
  out.y += m * w.y;
  return out;
}
function minusScaleVec2(out, m, w) {
  out.x -= m * w.x;
  out.y -= m * w.y;
  return out;
}
function combine2Vec2(out, am, a2, bm, b2) {
  out.x = am * a2.x + bm * b2.x;
  out.y = am * a2.y + bm * b2.y;
  return out;
}
function combine3Vec2(out, am, a2, bm, b2, cm, c2) {
  out.x = am * a2.x + bm * b2.x + cm * c2.x;
  out.y = am * a2.y + bm * b2.y + cm * c2.y;
  return out;
}
function normalizeVec2Length(out) {
  var length2 = math_sqrt$7(out.x * out.x + out.y * out.y);
  if (length2 !== 0) {
    var invLength = 1 / length2;
    out.x *= invLength;
    out.y *= invLength;
  }
  return length2;
}
function normalizeVec2(out) {
  var length2 = math_sqrt$7(out.x * out.x + out.y * out.y);
  if (length2 > 0) {
    var invLength = 1 / length2;
    out.x *= invLength;
    out.y *= invLength;
  }
  return out;
}
function crossVec2Num(out, v3, w) {
  var x2 = w * v3.y;
  var y = -w * v3.x;
  out.x = x2;
  out.y = y;
  return out;
}
function crossNumVec2(out, w, v3) {
  var x2 = -w * v3.y;
  var y = w * v3.x;
  out.x = x2;
  out.y = y;
  return out;
}
function crossVec2Vec2(a2, b2) {
  return a2.x * b2.y - a2.y * b2.x;
}
function dotVec2(a2, b2) {
  return a2.x * b2.x + a2.y * b2.y;
}
function lengthSqrVec2(a2) {
  return a2.x * a2.x + a2.y * a2.y;
}
function distVec2(a2, b2) {
  var dx = a2.x - b2.x;
  var dy = a2.y - b2.y;
  return math_sqrt$7(dx * dx + dy * dy);
}
function distSqrVec2(a2, b2) {
  var dx = a2.x - b2.x;
  var dy = a2.y - b2.y;
  return dx * dx + dy * dy;
}
function setRotAngle(out, a2) {
  out.c = math_cos$2(a2);
  out.s = math_sin$2(a2);
  return out;
}
function rotVec2(out, q, v3) {
  out.x = q.c * v3.x - q.s * v3.y;
  out.y = q.s * v3.x + q.c * v3.y;
  return out;
}
function derotVec2(out, q, v3) {
  var x2 = q.c * v3.x + q.s * v3.y;
  var y = -q.s * v3.x + q.c * v3.y;
  out.x = x2;
  out.y = y;
  return out;
}
function rerotVec2(out, before, after, v3) {
  var x0 = before.c * v3.x + before.s * v3.y;
  var y0 = -before.s * v3.x + before.c * v3.y;
  var x2 = after.c * x0 - after.s * y0;
  var y = after.s * x0 + after.c * y0;
  out.x = x2;
  out.y = y;
  return out;
}
function transform(x2, y, a2) {
  return { p: vec2(x2, y), q: rotation(a2) };
}
function copyTransform(out, transform2) {
  out.p.x = transform2.p.x;
  out.p.y = transform2.p.y;
  out.q.s = transform2.q.s;
  out.q.c = transform2.q.c;
  return out;
}
function transformVec2(out, xf2, v3) {
  var x2 = xf2.q.c * v3.x - xf2.q.s * v3.y + xf2.p.x;
  var y = xf2.q.s * v3.x + xf2.q.c * v3.y + xf2.p.y;
  out.x = x2;
  out.y = y;
  return out;
}
function detransformVec2(out, xf2, v3) {
  var px = v3.x - xf2.p.x;
  var py = v3.y - xf2.p.y;
  var x2 = xf2.q.c * px + xf2.q.s * py;
  var y = -xf2.q.s * px + xf2.q.c * py;
  out.x = x2;
  out.y = y;
  return out;
}
function retransformVec2(out, from, to, v3) {
  var x0 = from.q.c * v3.x - from.q.s * v3.y + from.p.x;
  var y0 = from.q.s * v3.x + from.q.c * v3.y + from.p.y;
  var px = x0 - to.p.x;
  var py = y0 - to.p.y;
  var x2 = to.q.c * px + to.q.s * py;
  var y = -to.q.s * px + to.q.c * py;
  out.x = x2;
  out.y = y;
  return out;
}
function detransformTransform(out, a2, b2) {
  var c2 = a2.q.c * b2.q.c + a2.q.s * b2.q.s;
  var s2 = a2.q.c * b2.q.s - a2.q.s * b2.q.c;
  var x2 = a2.q.c * (b2.p.x - a2.p.x) + a2.q.s * (b2.p.y - a2.p.y);
  var y = -a2.q.s * (b2.p.x - a2.p.x) + a2.q.c * (b2.p.y - a2.p.y);
  out.q.c = c2;
  out.q.s = s2;
  out.p.x = x2;
  out.p.y = y;
  return out;
}
var math_sin$1 = Math.sin;
var math_cos$1 = Math.cos;
var math_atan2$3 = Math.atan2;
var Rot = (
  /** @class */
  function() {
    function Rot2(angle) {
      if (!(this instanceof Rot2)) {
        return new Rot2(angle);
      }
      if (typeof angle === "number") {
        this.setAngle(angle);
      } else if (typeof angle === "object") {
        this.setRot(angle);
      } else {
        this.setIdentity();
      }
    }
    Rot2.neo = function(angle) {
      var obj = Object.create(Rot2.prototype);
      obj.setAngle(angle);
      return obj;
    };
    Rot2.clone = function(rot) {
      var obj = Object.create(Rot2.prototype);
      obj.s = rot.s;
      obj.c = rot.c;
      return obj;
    };
    Rot2.identity = function() {
      var obj = Object.create(Rot2.prototype);
      obj.s = 0;
      obj.c = 1;
      return obj;
    };
    Rot2.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return Number.isFinite(obj.s) && Number.isFinite(obj.c);
    };
    Rot2.assert = function(o) {
    };
    Rot2.prototype.setIdentity = function() {
      this.s = 0;
      this.c = 1;
    };
    Rot2.prototype.set = function(angle) {
      if (typeof angle === "object") {
        this.s = angle.s;
        this.c = angle.c;
      } else {
        this.s = math_sin$1(angle);
        this.c = math_cos$1(angle);
      }
    };
    Rot2.prototype.setRot = function(angle) {
      this.s = angle.s;
      this.c = angle.c;
    };
    Rot2.prototype.setAngle = function(angle) {
      this.s = math_sin$1(angle);
      this.c = math_cos$1(angle);
    };
    Rot2.prototype.getAngle = function() {
      return math_atan2$3(this.s, this.c);
    };
    Rot2.prototype.getXAxis = function() {
      return Vec2.neo(this.c, this.s);
    };
    Rot2.prototype.getYAxis = function() {
      return Vec2.neo(-this.s, this.c);
    };
    Rot2.mul = function(rot, m) {
      if ("c" in m && "s" in m) {
        var qr = Rot2.identity();
        qr.s = rot.s * m.c + rot.c * m.s;
        qr.c = rot.c * m.c - rot.s * m.s;
        return qr;
      } else if ("x" in m && "y" in m) {
        return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
      }
    };
    Rot2.mulRot = function(rot, m) {
      var qr = Rot2.identity();
      qr.s = rot.s * m.c + rot.c * m.s;
      qr.c = rot.c * m.c - rot.s * m.s;
      return qr;
    };
    Rot2.mulVec2 = function(rot, m) {
      return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
    };
    Rot2.mulSub = function(rot, v3, w) {
      var x2 = rot.c * (v3.x - w.x) - rot.s * (v3.y - w.y);
      var y = rot.s * (v3.x - w.x) + rot.c * (v3.y - w.y);
      return Vec2.neo(x2, y);
    };
    Rot2.mulT = function(rot, m) {
      if ("c" in m && "s" in m) {
        var qr = Rot2.identity();
        qr.s = rot.c * m.s - rot.s * m.c;
        qr.c = rot.c * m.c + rot.s * m.s;
        return qr;
      } else if ("x" in m && "y" in m) {
        return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
      }
    };
    Rot2.mulTRot = function(rot, m) {
      var qr = Rot2.identity();
      qr.s = rot.c * m.s - rot.s * m.c;
      qr.c = rot.c * m.c + rot.s * m.s;
      return qr;
    };
    Rot2.mulTVec2 = function(rot, m) {
      return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
    };
    return Rot2;
  }()
);
var math_atan2$2 = Math.atan2;
var math_PI$7 = Math.PI;
var temp$7 = vec2(0, 0);
var Sweep = (
  /** @class */
  function() {
    function Sweep2() {
      this.localCenter = Vec2.zero();
      this.c = Vec2.zero();
      this.a = 0;
      this.alpha0 = 0;
      this.c0 = Vec2.zero();
      this.a0 = 0;
    }
    Sweep2.prototype.recycle = function() {
      zeroVec2(this.localCenter);
      zeroVec2(this.c);
      this.a = 0;
      this.alpha0 = 0;
      zeroVec2(this.c0);
      this.a0 = 0;
    };
    Sweep2.prototype.setTransform = function(xf2) {
      transformVec2(temp$7, xf2, this.localCenter);
      copyVec2(this.c, temp$7);
      copyVec2(this.c0, temp$7);
      this.a = this.a0 = math_atan2$2(xf2.q.s, xf2.q.c);
    };
    Sweep2.prototype.setLocalCenter = function(localCenter2, xf2) {
      copyVec2(this.localCenter, localCenter2);
      transformVec2(temp$7, xf2, this.localCenter);
      copyVec2(this.c, temp$7);
      copyVec2(this.c0, temp$7);
    };
    Sweep2.prototype.getTransform = function(xf2, beta) {
      if (beta === void 0) {
        beta = 0;
      }
      setRotAngle(xf2.q, (1 - beta) * this.a0 + beta * this.a);
      combine2Vec2(xf2.p, 1 - beta, this.c0, beta, this.c);
      minusVec2(xf2.p, rotVec2(temp$7, xf2.q, this.localCenter));
    };
    Sweep2.prototype.advance = function(alpha) {
      var beta = (alpha - this.alpha0) / (1 - this.alpha0);
      combine2Vec2(this.c0, beta, this.c, 1 - beta, this.c0);
      this.a0 = beta * this.a + (1 - beta) * this.a0;
      this.alpha0 = alpha;
    };
    Sweep2.prototype.forward = function() {
      this.a0 = this.a;
      copyVec2(this.c0, this.c);
    };
    Sweep2.prototype.normalize = function() {
      var a0 = mod(this.a0, -math_PI$7, +math_PI$7);
      this.a -= this.a0 - a0;
      this.a0 = a0;
    };
    Sweep2.prototype.set = function(that) {
      copyVec2(this.localCenter, that.localCenter);
      copyVec2(this.c, that.c);
      this.a = that.a;
      this.alpha0 = that.alpha0;
      copyVec2(this.c0, that.c0);
      this.a0 = that.a0;
    };
    return Sweep2;
  }()
);
var Transform = (
  /** @class */
  function() {
    function Transform2(position, rotation2) {
      if (!(this instanceof Transform2)) {
        return new Transform2(position, rotation2);
      }
      this.p = Vec2.zero();
      this.q = Rot.identity();
      if (typeof position !== "undefined") {
        this.p.setVec2(position);
      }
      if (typeof rotation2 !== "undefined") {
        this.q.setAngle(rotation2);
      }
    }
    Transform2.clone = function(xf2) {
      var obj = Object.create(Transform2.prototype);
      obj.p = Vec2.clone(xf2.p);
      obj.q = Rot.clone(xf2.q);
      return obj;
    };
    Transform2.neo = function(position, rotation2) {
      var obj = Object.create(Transform2.prototype);
      obj.p = Vec2.clone(position);
      obj.q = Rot.clone(rotation2);
      return obj;
    };
    Transform2.identity = function() {
      var obj = Object.create(Transform2.prototype);
      obj.p = Vec2.zero();
      obj.q = Rot.identity();
      return obj;
    };
    Transform2.prototype.setIdentity = function() {
      this.p.setZero();
      this.q.setIdentity();
    };
    Transform2.prototype.set = function(a2, b2) {
      if (typeof b2 === "undefined") {
        this.p.set(a2.p);
        this.q.set(a2.q);
      } else {
        this.p.set(a2);
        this.q.set(b2);
      }
    };
    Transform2.prototype.setNum = function(position, rotation2) {
      this.p.setVec2(position);
      this.q.setAngle(rotation2);
    };
    Transform2.prototype.setTransform = function(xf2) {
      this.p.setVec2(xf2.p);
      this.q.setRot(xf2.q);
    };
    Transform2.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return Vec2.isValid(obj.p) && Rot.isValid(obj.q);
    };
    Transform2.assert = function(o) {
    };
    Transform2.mul = function(a2, b2) {
      if (Array.isArray(b2)) {
        var arr = [];
        for (var i = 0; i < b2.length; i++) {
          arr[i] = Transform2.mul(a2, b2[i]);
        }
        return arr;
      } else if ("x" in b2 && "y" in b2) {
        return Transform2.mulVec2(a2, b2);
      } else if ("p" in b2 && "q" in b2) {
        return Transform2.mulXf(a2, b2);
      }
    };
    Transform2.mulAll = function(a2, b2) {
      var arr = [];
      for (var i = 0; i < b2.length; i++) {
        arr[i] = Transform2.mul(a2, b2[i]);
      }
      return arr;
    };
    Transform2.mulFn = function(a2) {
      return function(b2) {
        return Transform2.mul(a2, b2);
      };
    };
    Transform2.mulVec2 = function(a2, b2) {
      var x2 = a2.q.c * b2.x - a2.q.s * b2.y + a2.p.x;
      var y = a2.q.s * b2.x + a2.q.c * b2.y + a2.p.y;
      return Vec2.neo(x2, y);
    };
    Transform2.mulXf = function(a2, b2) {
      var xf2 = Transform2.identity();
      xf2.q = Rot.mulRot(a2.q, b2.q);
      xf2.p = Vec2.add(Rot.mulVec2(a2.q, b2.p), a2.p);
      return xf2;
    };
    Transform2.mulT = function(a2, b2) {
      if ("x" in b2 && "y" in b2) {
        return Transform2.mulTVec2(a2, b2);
      } else if ("p" in b2 && "q" in b2) {
        return Transform2.mulTXf(a2, b2);
      }
    };
    Transform2.mulTVec2 = function(a2, b2) {
      var px = b2.x - a2.p.x;
      var py = b2.y - a2.p.y;
      var x2 = a2.q.c * px + a2.q.s * py;
      var y = -a2.q.s * px + a2.q.c * py;
      return Vec2.neo(x2, y);
    };
    Transform2.mulTXf = function(a2, b2) {
      var xf2 = Transform2.identity();
      xf2.q.setRot(Rot.mulTRot(a2.q, b2.q));
      xf2.p.setVec2(Rot.mulTVec2(a2.q, Vec2.sub(b2.p, a2.p)));
      return xf2;
    };
    return Transform2;
  }()
);
var Velocity = (
  /** @class */
  /* @__PURE__ */ function() {
    function Velocity2() {
      this.v = Vec2.zero();
      this.w = 0;
    }
    return Velocity2;
  }()
);
var math_sin = Math.sin;
var math_cos = Math.cos;
var Position = (
  /** @class */
  function() {
    function Position2() {
      this.c = Vec2.zero();
      this.a = 0;
    }
    Position2.prototype.getTransform = function(xf2, p) {
      xf2.q.c = math_cos(this.a);
      xf2.q.s = math_sin(this.a);
      xf2.p.x = this.c.x - (xf2.q.c * p.x - xf2.q.s * p.y);
      xf2.p.y = this.c.y - (xf2.q.s * p.x + xf2.q.c * p.y);
      return xf2;
    };
    return Position2;
  }()
);
function getTransform(xf2, p, c2, a2) {
  xf2.q.c = math_cos(a2);
  xf2.q.s = math_sin(a2);
  xf2.p.x = c2.x - (xf2.q.c * p.x - xf2.q.s * p.y);
  xf2.p.y = c2.y - (xf2.q.s * p.x + xf2.q.c * p.y);
  return xf2;
}
var Shape = (
  /** @class */
  function() {
    function Shape2() {
      this.style = {};
      this.appData = {};
    }
    Shape2.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return typeof obj.m_type === "string" && typeof obj.m_radius === "number";
    };
    return Shape2;
  }()
);
var synchronize_aabb1 = new AABB();
var synchronize_aabb2 = new AABB();
var displacement = vec2(0, 0);
var FixtureDefDefault = {
  userData: null,
  friction: 0.2,
  restitution: 0,
  density: 0,
  isSensor: false,
  filterGroupIndex: 0,
  filterCategoryBits: 1,
  filterMaskBits: 65535
};
var FixtureProxy = (
  /** @class */
  /* @__PURE__ */ function() {
    function FixtureProxy2(fixture, childIndex) {
      this.aabb = new AABB();
      this.fixture = fixture;
      this.childIndex = childIndex;
    }
    return FixtureProxy2;
  }()
);
var Fixture = (
  /** @class */
  function() {
    function Fixture2(body, shape, def) {
      this.style = {};
      this.appData = {};
      if (shape.shape) {
        def = shape;
        shape = shape.shape;
      } else if (typeof def === "number") {
        def = { density: def };
      }
      def = options(def, FixtureDefDefault);
      this.m_body = body;
      this.m_friction = def.friction;
      this.m_restitution = def.restitution;
      this.m_density = def.density;
      this.m_isSensor = def.isSensor;
      this.m_filterGroupIndex = def.filterGroupIndex;
      this.m_filterCategoryBits = def.filterCategoryBits;
      this.m_filterMaskBits = def.filterMaskBits;
      this.m_shape = shape;
      this.m_next = null;
      this.m_proxies = [];
      this.m_proxyCount = 0;
      var childCount = this.m_shape.getChildCount();
      for (var i = 0; i < childCount; ++i) {
        this.m_proxies[i] = new FixtureProxy(this, i);
      }
      this.m_userData = def.userData;
      if (typeof def.style === "object" && def.style !== null) {
        this.style = def.style;
      }
    }
    Fixture2.prototype._reset = function() {
      var body = this.getBody();
      var broadPhase = body.m_world.m_broadPhase;
      this.destroyProxies(broadPhase);
      if (this.m_shape._reset) {
        this.m_shape._reset();
      }
      var childCount = this.m_shape.getChildCount();
      for (var i = 0; i < childCount; ++i) {
        this.m_proxies[i] = new FixtureProxy(this, i);
      }
      this.createProxies(broadPhase, body.m_xf);
      body.resetMassData();
    };
    Fixture2.prototype._serialize = function() {
      return {
        friction: this.m_friction,
        restitution: this.m_restitution,
        density: this.m_density,
        isSensor: this.m_isSensor,
        filterGroupIndex: this.m_filterGroupIndex,
        filterCategoryBits: this.m_filterCategoryBits,
        filterMaskBits: this.m_filterMaskBits,
        shape: this.m_shape
      };
    };
    Fixture2._deserialize = function(data, body, restore) {
      var shape = restore(Shape, data.shape);
      var fixture = shape && new Fixture2(body, shape, data);
      return fixture;
    };
    Fixture2.prototype.getType = function() {
      return this.m_shape.m_type;
    };
    Fixture2.prototype.getShape = function() {
      return this.m_shape;
    };
    Fixture2.prototype.isSensor = function() {
      return this.m_isSensor;
    };
    Fixture2.prototype.setSensor = function(sensor) {
      if (sensor != this.m_isSensor) {
        this.m_body.setAwake(true);
        this.m_isSensor = sensor;
      }
    };
    Fixture2.prototype.getUserData = function() {
      return this.m_userData;
    };
    Fixture2.prototype.setUserData = function(data) {
      this.m_userData = data;
    };
    Fixture2.prototype.getBody = function() {
      return this.m_body;
    };
    Fixture2.prototype.getNext = function() {
      return this.m_next;
    };
    Fixture2.prototype.getDensity = function() {
      return this.m_density;
    };
    Fixture2.prototype.setDensity = function(density) {
      this.m_density = density;
    };
    Fixture2.prototype.getFriction = function() {
      return this.m_friction;
    };
    Fixture2.prototype.setFriction = function(friction) {
      this.m_friction = friction;
    };
    Fixture2.prototype.getRestitution = function() {
      return this.m_restitution;
    };
    Fixture2.prototype.setRestitution = function(restitution) {
      this.m_restitution = restitution;
    };
    Fixture2.prototype.testPoint = function(p) {
      return this.m_shape.testPoint(this.m_body.getTransform(), p);
    };
    Fixture2.prototype.rayCast = function(output2, input2, childIndex) {
      return this.m_shape.rayCast(output2, input2, this.m_body.getTransform(), childIndex);
    };
    Fixture2.prototype.getMassData = function(massData) {
      this.m_shape.computeMass(massData, this.m_density);
    };
    Fixture2.prototype.getAABB = function(childIndex) {
      return this.m_proxies[childIndex].aabb;
    };
    Fixture2.prototype.createProxies = function(broadPhase, xf2) {
      this.m_proxyCount = this.m_shape.getChildCount();
      for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        this.m_shape.computeAABB(proxy.aabb, xf2, i);
        proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
      }
    };
    Fixture2.prototype.destroyProxies = function(broadPhase) {
      for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        broadPhase.destroyProxy(proxy.proxyId);
        proxy.proxyId = null;
      }
      this.m_proxyCount = 0;
    };
    Fixture2.prototype.synchronize = function(broadPhase, xf1, xf2) {
      for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        this.m_shape.computeAABB(synchronize_aabb1, xf1, proxy.childIndex);
        this.m_shape.computeAABB(synchronize_aabb2, xf2, proxy.childIndex);
        proxy.aabb.combine(synchronize_aabb1, synchronize_aabb2);
        subVec2(displacement, xf2.p, xf1.p);
        broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
      }
    };
    Fixture2.prototype.setFilterData = function(filter) {
      this.m_filterGroupIndex = filter.groupIndex;
      this.m_filterCategoryBits = filter.categoryBits;
      this.m_filterMaskBits = filter.maskBits;
      this.refilter();
    };
    Fixture2.prototype.getFilterGroupIndex = function() {
      return this.m_filterGroupIndex;
    };
    Fixture2.prototype.setFilterGroupIndex = function(groupIndex) {
      this.m_filterGroupIndex = groupIndex;
      this.refilter();
    };
    Fixture2.prototype.getFilterCategoryBits = function() {
      return this.m_filterCategoryBits;
    };
    Fixture2.prototype.setFilterCategoryBits = function(categoryBits) {
      this.m_filterCategoryBits = categoryBits;
      this.refilter();
    };
    Fixture2.prototype.getFilterMaskBits = function() {
      return this.m_filterMaskBits;
    };
    Fixture2.prototype.setFilterMaskBits = function(maskBits) {
      this.m_filterMaskBits = maskBits;
      this.refilter();
    };
    Fixture2.prototype.refilter = function() {
      if (this.m_body == null) {
        return;
      }
      var edge = this.m_body.getContactList();
      while (edge) {
        var contact = edge.contact;
        var fixtureA = contact.getFixtureA();
        var fixtureB = contact.getFixtureB();
        if (fixtureA == this || fixtureB == this) {
          contact.flagForFiltering();
        }
        edge = edge.next;
      }
      var world = this.m_body.getWorld();
      if (world == null) {
        return;
      }
      var broadPhase = world.m_broadPhase;
      for (var i = 0; i < this.m_proxyCount; ++i) {
        broadPhase.touchProxy(this.m_proxies[i].proxyId);
      }
    };
    Fixture2.prototype.shouldCollide = function(that) {
      if (that.m_filterGroupIndex === this.m_filterGroupIndex && that.m_filterGroupIndex !== 0) {
        return that.m_filterGroupIndex > 0;
      }
      var collideA = (that.m_filterMaskBits & this.m_filterCategoryBits) !== 0;
      var collideB = (that.m_filterCategoryBits & this.m_filterMaskBits) !== 0;
      var collide = collideA && collideB;
      return collide;
    };
    return Fixture2;
  }()
);
var STATIC = "static";
var KINEMATIC = "kinematic";
var DYNAMIC = "dynamic";
var oldCenter = vec2(0, 0);
var localCenter = vec2(0, 0);
var shift = vec2(0, 0);
var temp$6 = vec2(0, 0);
var xf$2 = transform(0, 0, 0);
var BodyDefDefault = {
  type: STATIC,
  position: Vec2.zero(),
  angle: 0,
  linearVelocity: Vec2.zero(),
  angularVelocity: 0,
  linearDamping: 0,
  angularDamping: 0,
  fixedRotation: false,
  bullet: false,
  gravityScale: 1,
  allowSleep: true,
  awake: true,
  active: true,
  userData: null
};
var Body = (
  /** @class */
  function() {
    function Body2(world, def) {
      this.style = {};
      this.appData = {};
      def = options(def, BodyDefDefault);
      this.m_world = world;
      this.m_awakeFlag = def.awake;
      this.m_autoSleepFlag = def.allowSleep;
      this.m_bulletFlag = def.bullet;
      this.m_fixedRotationFlag = def.fixedRotation;
      this.m_activeFlag = def.active;
      this.m_islandFlag = false;
      this.m_toiFlag = false;
      this.m_userData = def.userData;
      this.m_type = def.type;
      if (this.m_type == DYNAMIC) {
        this.m_mass = 1;
        this.m_invMass = 1;
      } else {
        this.m_mass = 0;
        this.m_invMass = 0;
      }
      this.m_I = 0;
      this.m_invI = 0;
      this.m_xf = Transform.identity();
      this.m_xf.p.setVec2(def.position);
      this.m_xf.q.setAngle(def.angle);
      this.m_sweep = new Sweep();
      this.m_sweep.setTransform(this.m_xf);
      this.c_velocity = new Velocity();
      this.c_position = new Position();
      this.m_force = Vec2.zero();
      this.m_torque = 0;
      this.m_linearVelocity = Vec2.clone(def.linearVelocity);
      this.m_angularVelocity = def.angularVelocity;
      this.m_linearDamping = def.linearDamping;
      this.m_angularDamping = def.angularDamping;
      this.m_gravityScale = def.gravityScale;
      this.m_sleepTime = 0;
      this.m_jointList = null;
      this.m_contactList = null;
      this.m_fixtureList = null;
      this.m_prev = null;
      this.m_next = null;
      this.m_destroyed = false;
      if (typeof def.style === "object" && def.style !== null) {
        this.style = def.style;
      }
    }
    Body2.prototype._serialize = function() {
      var fixtures = [];
      for (var f = this.m_fixtureList; f; f = f.m_next) {
        fixtures.push(f);
      }
      return {
        type: this.m_type,
        bullet: this.m_bulletFlag,
        position: this.m_xf.p,
        angle: this.m_xf.q.getAngle(),
        linearVelocity: this.m_linearVelocity,
        angularVelocity: this.m_angularVelocity,
        fixtures
      };
    };
    Body2._deserialize = function(data, world, restore) {
      var body = new Body2(world, data);
      if (data.fixtures) {
        for (var i = data.fixtures.length - 1; i >= 0; i--) {
          var fixture = restore(Fixture, data.fixtures[i], body);
          body._addFixture(fixture);
        }
      }
      return body;
    };
    Body2.prototype.isWorldLocked = function() {
      return this.m_world && this.m_world.isLocked() ? true : false;
    };
    Body2.prototype.getWorld = function() {
      return this.m_world;
    };
    Body2.prototype.getNext = function() {
      return this.m_next;
    };
    Body2.prototype.setUserData = function(data) {
      this.m_userData = data;
    };
    Body2.prototype.getUserData = function() {
      return this.m_userData;
    };
    Body2.prototype.getFixtureList = function() {
      return this.m_fixtureList;
    };
    Body2.prototype.getJointList = function() {
      return this.m_jointList;
    };
    Body2.prototype.getContactList = function() {
      return this.m_contactList;
    };
    Body2.prototype.isStatic = function() {
      return this.m_type == STATIC;
    };
    Body2.prototype.isDynamic = function() {
      return this.m_type == DYNAMIC;
    };
    Body2.prototype.isKinematic = function() {
      return this.m_type == KINEMATIC;
    };
    Body2.prototype.setStatic = function() {
      this.setType(STATIC);
      return this;
    };
    Body2.prototype.setDynamic = function() {
      this.setType(DYNAMIC);
      return this;
    };
    Body2.prototype.setKinematic = function() {
      this.setType(KINEMATIC);
      return this;
    };
    Body2.prototype.getType = function() {
      return this.m_type;
    };
    Body2.prototype.setType = function(type) {
      if (this.isWorldLocked() == true) {
        return;
      }
      if (this.m_type == type) {
        return;
      }
      this.m_type = type;
      this.resetMassData();
      if (this.m_type == STATIC) {
        this.m_linearVelocity.setZero();
        this.m_angularVelocity = 0;
        this.m_sweep.forward();
        this.synchronizeFixtures();
      }
      this.setAwake(true);
      this.m_force.setZero();
      this.m_torque = 0;
      var ce = this.m_contactList;
      while (ce) {
        var ce0 = ce;
        ce = ce.next;
        this.m_world.destroyContact(ce0.contact);
      }
      this.m_contactList = null;
      var broadPhase = this.m_world.m_broadPhase;
      for (var f = this.m_fixtureList; f; f = f.m_next) {
        for (var i = 0; i < f.m_proxyCount; ++i) {
          broadPhase.touchProxy(f.m_proxies[i].proxyId);
        }
      }
    };
    Body2.prototype.isBullet = function() {
      return this.m_bulletFlag;
    };
    Body2.prototype.setBullet = function(flag) {
      this.m_bulletFlag = !!flag;
    };
    Body2.prototype.isSleepingAllowed = function() {
      return this.m_autoSleepFlag;
    };
    Body2.prototype.setSleepingAllowed = function(flag) {
      this.m_autoSleepFlag = !!flag;
      if (this.m_autoSleepFlag == false) {
        this.setAwake(true);
      }
    };
    Body2.prototype.isAwake = function() {
      return this.m_awakeFlag;
    };
    Body2.prototype.setAwake = function(flag) {
      if (flag) {
        this.m_awakeFlag = true;
        this.m_sleepTime = 0;
      } else {
        this.m_awakeFlag = false;
        this.m_sleepTime = 0;
        this.m_linearVelocity.setZero();
        this.m_angularVelocity = 0;
        this.m_force.setZero();
        this.m_torque = 0;
      }
    };
    Body2.prototype.isActive = function() {
      return this.m_activeFlag;
    };
    Body2.prototype.setActive = function(flag) {
      if (flag == this.m_activeFlag) {
        return;
      }
      this.m_activeFlag = !!flag;
      if (this.m_activeFlag) {
        var broadPhase = this.m_world.m_broadPhase;
        for (var f = this.m_fixtureList; f; f = f.m_next) {
          f.createProxies(broadPhase, this.m_xf);
        }
        this.m_world.m_newFixture = true;
      } else {
        var broadPhase = this.m_world.m_broadPhase;
        for (var f = this.m_fixtureList; f; f = f.m_next) {
          f.destroyProxies(broadPhase);
        }
        var ce = this.m_contactList;
        while (ce) {
          var ce0 = ce;
          ce = ce.next;
          this.m_world.destroyContact(ce0.contact);
        }
        this.m_contactList = null;
      }
    };
    Body2.prototype.isFixedRotation = function() {
      return this.m_fixedRotationFlag;
    };
    Body2.prototype.setFixedRotation = function(flag) {
      if (this.m_fixedRotationFlag == flag) {
        return;
      }
      this.m_fixedRotationFlag = !!flag;
      this.m_angularVelocity = 0;
      this.resetMassData();
    };
    Body2.prototype.getTransform = function() {
      return this.m_xf;
    };
    Body2.prototype.setTransform = function(a2, b2) {
      if (this.isWorldLocked() == true) {
        return;
      }
      if (typeof b2 === "number") {
        this.m_xf.setNum(a2, b2);
      } else {
        this.m_xf.setTransform(a2);
      }
      this.m_sweep.setTransform(this.m_xf);
      var broadPhase = this.m_world.m_broadPhase;
      for (var f = this.m_fixtureList; f; f = f.m_next) {
        f.synchronize(broadPhase, this.m_xf, this.m_xf);
      }
      this.setAwake(true);
    };
    Body2.prototype.synchronizeTransform = function() {
      this.m_sweep.getTransform(this.m_xf, 1);
    };
    Body2.prototype.synchronizeFixtures = function() {
      this.m_sweep.getTransform(xf$2, 0);
      var broadPhase = this.m_world.m_broadPhase;
      for (var f = this.m_fixtureList; f; f = f.m_next) {
        f.synchronize(broadPhase, xf$2, this.m_xf);
      }
    };
    Body2.prototype.advance = function(alpha) {
      this.m_sweep.advance(alpha);
      copyVec2(this.m_sweep.c, this.m_sweep.c0);
      this.m_sweep.a = this.m_sweep.a0;
      this.m_sweep.getTransform(this.m_xf, 1);
    };
    Body2.prototype.getPosition = function() {
      return this.m_xf.p;
    };
    Body2.prototype.setPosition = function(p) {
      this.setTransform(p, this.m_sweep.a);
    };
    Body2.prototype.getAngle = function() {
      return this.m_sweep.a;
    };
    Body2.prototype.setAngle = function(angle) {
      this.setTransform(this.m_xf.p, angle);
    };
    Body2.prototype.getWorldCenter = function() {
      return this.m_sweep.c;
    };
    Body2.prototype.getLocalCenter = function() {
      return this.m_sweep.localCenter;
    };
    Body2.prototype.getLinearVelocity = function() {
      return this.m_linearVelocity;
    };
    Body2.prototype.getLinearVelocityFromWorldPoint = function(worldPoint) {
      var localCenter2 = Vec2.sub(worldPoint, this.m_sweep.c);
      return Vec2.add(this.m_linearVelocity, Vec2.crossNumVec2(this.m_angularVelocity, localCenter2));
    };
    Body2.prototype.getLinearVelocityFromLocalPoint = function(localPoint) {
      return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
    };
    Body2.prototype.setLinearVelocity = function(v3) {
      if (this.m_type == STATIC) {
        return;
      }
      if (Vec2.dot(v3, v3) > 0) {
        this.setAwake(true);
      }
      this.m_linearVelocity.setVec2(v3);
    };
    Body2.prototype.getAngularVelocity = function() {
      return this.m_angularVelocity;
    };
    Body2.prototype.setAngularVelocity = function(w) {
      if (this.m_type == STATIC) {
        return;
      }
      if (w * w > 0) {
        this.setAwake(true);
      }
      this.m_angularVelocity = w;
    };
    Body2.prototype.getLinearDamping = function() {
      return this.m_linearDamping;
    };
    Body2.prototype.setLinearDamping = function(linearDamping) {
      this.m_linearDamping = linearDamping;
    };
    Body2.prototype.getAngularDamping = function() {
      return this.m_angularDamping;
    };
    Body2.prototype.setAngularDamping = function(angularDamping) {
      this.m_angularDamping = angularDamping;
    };
    Body2.prototype.getGravityScale = function() {
      return this.m_gravityScale;
    };
    Body2.prototype.setGravityScale = function(scale) {
      this.m_gravityScale = scale;
    };
    Body2.prototype.getMass = function() {
      return this.m_mass;
    };
    Body2.prototype.getInertia = function() {
      return this.m_I + this.m_mass * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
    };
    Body2.prototype.getMassData = function(data) {
      data.mass = this.m_mass;
      data.I = this.getInertia();
      copyVec2(data.center, this.m_sweep.localCenter);
    };
    Body2.prototype.resetMassData = function() {
      this.m_mass = 0;
      this.m_invMass = 0;
      this.m_I = 0;
      this.m_invI = 0;
      zeroVec2(this.m_sweep.localCenter);
      if (this.isStatic() || this.isKinematic()) {
        copyVec2(this.m_sweep.c0, this.m_xf.p);
        copyVec2(this.m_sweep.c, this.m_xf.p);
        this.m_sweep.a0 = this.m_sweep.a;
        return;
      }
      zeroVec2(localCenter);
      for (var f = this.m_fixtureList; f; f = f.m_next) {
        if (f.m_density == 0) {
          continue;
        }
        var massData = {
          mass: 0,
          center: vec2(0, 0),
          I: 0
        };
        f.getMassData(massData);
        this.m_mass += massData.mass;
        plusScaleVec2(localCenter, massData.mass, massData.center);
        this.m_I += massData.I;
      }
      if (this.m_mass > 0) {
        this.m_invMass = 1 / this.m_mass;
        scaleVec2(localCenter, this.m_invMass, localCenter);
      } else {
        this.m_mass = 1;
        this.m_invMass = 1;
      }
      if (this.m_I > 0 && this.m_fixedRotationFlag == false) {
        this.m_I -= this.m_mass * dotVec2(localCenter, localCenter);
        this.m_invI = 1 / this.m_I;
      } else {
        this.m_I = 0;
        this.m_invI = 0;
      }
      copyVec2(oldCenter, this.m_sweep.c);
      this.m_sweep.setLocalCenter(localCenter, this.m_xf);
      subVec2(shift, this.m_sweep.c, oldCenter);
      crossNumVec2(temp$6, this.m_angularVelocity, shift);
      plusVec2(this.m_linearVelocity, temp$6);
    };
    Body2.prototype.setMassData = function(massData) {
      if (this.isWorldLocked() == true) {
        return;
      }
      if (this.m_type != DYNAMIC) {
        return;
      }
      this.m_invMass = 0;
      this.m_I = 0;
      this.m_invI = 0;
      this.m_mass = massData.mass;
      if (this.m_mass <= 0) {
        this.m_mass = 1;
      }
      this.m_invMass = 1 / this.m_mass;
      if (massData.I > 0 && this.m_fixedRotationFlag == false) {
        this.m_I = massData.I - this.m_mass * dotVec2(massData.center, massData.center);
        this.m_invI = 1 / this.m_I;
      }
      copyVec2(oldCenter, this.m_sweep.c);
      this.m_sweep.setLocalCenter(massData.center, this.m_xf);
      subVec2(shift, this.m_sweep.c, oldCenter);
      crossNumVec2(temp$6, this.m_angularVelocity, shift);
      plusVec2(this.m_linearVelocity, temp$6);
    };
    Body2.prototype.applyForce = function(force, point2, wake) {
      if (wake === void 0) {
        wake = true;
      }
      if (this.m_type != DYNAMIC) {
        return;
      }
      if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
      }
      if (this.m_awakeFlag) {
        this.m_force.add(force);
        this.m_torque += Vec2.crossVec2Vec2(Vec2.sub(point2, this.m_sweep.c), force);
      }
    };
    Body2.prototype.applyForceToCenter = function(force, wake) {
      if (wake === void 0) {
        wake = true;
      }
      if (this.m_type != DYNAMIC) {
        return;
      }
      if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
      }
      if (this.m_awakeFlag) {
        this.m_force.add(force);
      }
    };
    Body2.prototype.applyTorque = function(torque, wake) {
      if (wake === void 0) {
        wake = true;
      }
      if (this.m_type != DYNAMIC) {
        return;
      }
      if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
      }
      if (this.m_awakeFlag) {
        this.m_torque += torque;
      }
    };
    Body2.prototype.applyLinearImpulse = function(impulse, point2, wake) {
      if (wake === void 0) {
        wake = true;
      }
      if (this.m_type != DYNAMIC) {
        return;
      }
      if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
      }
      if (this.m_awakeFlag) {
        this.m_linearVelocity.addMul(this.m_invMass, impulse);
        this.m_angularVelocity += this.m_invI * Vec2.crossVec2Vec2(Vec2.sub(point2, this.m_sweep.c), impulse);
      }
    };
    Body2.prototype.applyAngularImpulse = function(impulse, wake) {
      if (wake === void 0) {
        wake = true;
      }
      if (this.m_type != DYNAMIC) {
        return;
      }
      if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
      }
      if (this.m_awakeFlag) {
        this.m_angularVelocity += this.m_invI * impulse;
      }
    };
    Body2.prototype.shouldCollide = function(that) {
      if (this.m_type != DYNAMIC && that.m_type != DYNAMIC) {
        return false;
      }
      for (var jn = this.m_jointList; jn; jn = jn.next) {
        if (jn.other == that) {
          if (jn.joint.m_collideConnected == false) {
            return false;
          }
        }
      }
      return true;
    };
    Body2.prototype._addFixture = function(fixture) {
      if (this.isWorldLocked() == true) {
        return null;
      }
      if (this.m_activeFlag) {
        var broadPhase = this.m_world.m_broadPhase;
        fixture.createProxies(broadPhase, this.m_xf);
      }
      fixture.m_next = this.m_fixtureList;
      this.m_fixtureList = fixture;
      if (fixture.m_density > 0) {
        this.resetMassData();
      }
      this.m_world.m_newFixture = true;
      return fixture;
    };
    Body2.prototype.createFixture = function(shape, fixdef) {
      if (this.isWorldLocked() == true) {
        return null;
      }
      var fixture = new Fixture(this, shape, fixdef);
      this._addFixture(fixture);
      return fixture;
    };
    Body2.prototype.destroyFixture = function(fixture) {
      if (this.isWorldLocked() == true) {
        return;
      }
      if (this.m_fixtureList === fixture) {
        this.m_fixtureList = fixture.m_next;
      } else {
        var node = this.m_fixtureList;
        while (node != null) {
          if (node.m_next === fixture) {
            node.m_next = fixture.m_next;
            break;
          }
          node = node.m_next;
        }
      }
      var edge = this.m_contactList;
      while (edge) {
        var c2 = edge.contact;
        edge = edge.next;
        var fixtureA = c2.getFixtureA();
        var fixtureB = c2.getFixtureB();
        if (fixture == fixtureA || fixture == fixtureB) {
          this.m_world.destroyContact(c2);
        }
      }
      if (this.m_activeFlag) {
        var broadPhase = this.m_world.m_broadPhase;
        fixture.destroyProxies(broadPhase);
      }
      fixture.m_body = null;
      fixture.m_next = null;
      this.m_world.publish("remove-fixture", fixture);
      this.resetMassData();
    };
    Body2.prototype.getWorldPoint = function(localPoint) {
      return Transform.mulVec2(this.m_xf, localPoint);
    };
    Body2.prototype.getWorldVector = function(localVector) {
      return Rot.mulVec2(this.m_xf.q, localVector);
    };
    Body2.prototype.getLocalPoint = function(worldPoint) {
      return Transform.mulTVec2(this.m_xf, worldPoint);
    };
    Body2.prototype.getLocalVector = function(worldVector) {
      return Rot.mulTVec2(this.m_xf.q, worldVector);
    };
    Body2.STATIC = "static";
    Body2.KINEMATIC = "kinematic";
    Body2.DYNAMIC = "dynamic";
    return Body2;
  }()
);
var JointEdge = (
  /** @class */
  /* @__PURE__ */ function() {
    function JointEdge2() {
      this.other = null;
      this.joint = null;
      this.prev = null;
      this.next = null;
    }
    return JointEdge2;
  }()
);
var Joint = (
  /** @class */
  function() {
    function Joint2(def, bodyA, bodyB) {
      this.m_type = "unknown-joint";
      this.m_prev = null;
      this.m_next = null;
      this.m_edgeA = new JointEdge();
      this.m_edgeB = new JointEdge();
      this.m_islandFlag = false;
      this.style = {};
      this.appData = {};
      bodyA = "bodyA" in def ? def.bodyA : bodyA;
      bodyB = "bodyB" in def ? def.bodyB : bodyB;
      this.m_bodyA = bodyA;
      this.m_bodyB = bodyB;
      this.m_collideConnected = !!def.collideConnected;
      this.m_userData = def.userData;
      if (typeof def.style === "object" && def.style !== null) {
        this.style = def.style;
      }
    }
    Joint2.prototype.isActive = function() {
      return this.m_bodyA.isActive() && this.m_bodyB.isActive();
    };
    Joint2.prototype.getType = function() {
      return this.m_type;
    };
    Joint2.prototype.getBodyA = function() {
      return this.m_bodyA;
    };
    Joint2.prototype.getBodyB = function() {
      return this.m_bodyB;
    };
    Joint2.prototype.getNext = function() {
      return this.m_next;
    };
    Joint2.prototype.getUserData = function() {
      return this.m_userData;
    };
    Joint2.prototype.setUserData = function(data) {
      this.m_userData = data;
    };
    Joint2.prototype.getCollideConnected = function() {
      return this.m_collideConnected;
    };
    Joint2.prototype.shiftOrigin = function(newOrigin) {
    };
    Joint2.prototype._resetAnchors = function(def) {
      return this._reset(def);
    };
    return Joint2;
  }()
);
var stats$1 = {
  gjkCalls: 0,
  gjkIters: 0,
  gjkMaxIters: 0,
  toiTime: 0,
  toiMaxTime: 0,
  toiCalls: 0,
  toiIters: 0,
  toiMaxIters: 0,
  toiRootIters: 0,
  toiMaxRootIters: 0,
  toString: function(newline) {
    newline = typeof newline === "string" ? newline : "\n";
    var string = "";
    for (var name_1 in this) {
      if (typeof this[name_1] !== "function" && typeof this[name_1] !== "object") {
        string += name_1 + ": " + this[name_1] + newline;
      }
    }
    return string;
  }
};
var now = function() {
  return Date.now();
};
var diff = function(time) {
  return Date.now() - time;
};
const Timer = {
  now,
  diff
};
var math_max$7 = Math.max;
var temp$5 = vec2(0, 0);
var normal$4 = vec2(0, 0);
var e12 = vec2(0, 0);
var e13 = vec2(0, 0);
var e23 = vec2(0, 0);
var temp1 = vec2(0, 0);
var temp2 = vec2(0, 0);
stats$1.gjkCalls = 0;
stats$1.gjkIters = 0;
stats$1.gjkMaxIters = 0;
var DistanceInput = (
  /** @class */
  function() {
    function DistanceInput2() {
      this.proxyA = new DistanceProxy();
      this.proxyB = new DistanceProxy();
      this.transformA = Transform.identity();
      this.transformB = Transform.identity();
      this.useRadii = false;
    }
    DistanceInput2.prototype.recycle = function() {
      this.proxyA.recycle();
      this.proxyB.recycle();
      this.transformA.setIdentity();
      this.transformB.setIdentity();
      this.useRadii = false;
    };
    return DistanceInput2;
  }()
);
var DistanceOutput = (
  /** @class */
  function() {
    function DistanceOutput2() {
      this.pointA = vec2(0, 0);
      this.pointB = vec2(0, 0);
      this.distance = 0;
      this.iterations = 0;
    }
    DistanceOutput2.prototype.recycle = function() {
      zeroVec2(this.pointA);
      zeroVec2(this.pointB);
      this.distance = 0;
      this.iterations = 0;
    };
    return DistanceOutput2;
  }()
);
var SimplexCache = (
  /** @class */
  function() {
    function SimplexCache2() {
      this.metric = 0;
      this.indexA = [];
      this.indexB = [];
      this.count = 0;
    }
    SimplexCache2.prototype.recycle = function() {
      this.metric = 0;
      this.indexA.length = 0;
      this.indexB.length = 0;
      this.count = 0;
    };
    return SimplexCache2;
  }()
);
var Distance = function(output2, cache2, input2) {
  ++stats$1.gjkCalls;
  var proxyA = input2.proxyA;
  var proxyB = input2.proxyB;
  var xfA2 = input2.transformA;
  var xfB2 = input2.transformB;
  simplex.recycle();
  simplex.readCache(cache2, proxyA, xfA2, proxyB, xfB2);
  var vertices = simplex.m_v;
  var k_maxIters = SettingsInternal.maxDistanceIterations;
  var saveA = [];
  var saveB = [];
  var saveCount = 0;
  var iter = 0;
  while (iter < k_maxIters) {
    saveCount = simplex.m_count;
    for (var i = 0; i < saveCount; ++i) {
      saveA[i] = vertices[i].indexA;
      saveB[i] = vertices[i].indexB;
    }
    simplex.solve();
    if (simplex.m_count === 3) {
      break;
    }
    var d2 = simplex.getSearchDirection();
    if (lengthSqrVec2(d2) < EPSILON * EPSILON) {
      break;
    }
    var vertex = vertices[simplex.m_count];
    vertex.indexA = proxyA.getSupport(derotVec2(temp$5, xfA2.q, scaleVec2(temp$5, -1, d2)));
    transformVec2(vertex.wA, xfA2, proxyA.getVertex(vertex.indexA));
    vertex.indexB = proxyB.getSupport(derotVec2(temp$5, xfB2.q, d2));
    transformVec2(vertex.wB, xfB2, proxyB.getVertex(vertex.indexB));
    subVec2(vertex.w, vertex.wB, vertex.wA);
    ++iter;
    ++stats$1.gjkIters;
    var duplicate = false;
    for (var i = 0; i < saveCount; ++i) {
      if (vertex.indexA === saveA[i] && vertex.indexB === saveB[i]) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) {
      break;
    }
    ++simplex.m_count;
  }
  stats$1.gjkMaxIters = math_max$7(stats$1.gjkMaxIters, iter);
  simplex.getWitnessPoints(output2.pointA, output2.pointB);
  output2.distance = distVec2(output2.pointA, output2.pointB);
  output2.iterations = iter;
  simplex.writeCache(cache2);
  if (input2.useRadii) {
    var rA2 = proxyA.m_radius;
    var rB2 = proxyB.m_radius;
    if (output2.distance > rA2 + rB2 && output2.distance > EPSILON) {
      output2.distance -= rA2 + rB2;
      subVec2(normal$4, output2.pointB, output2.pointA);
      normalizeVec2(normal$4);
      plusScaleVec2(output2.pointA, rA2, normal$4);
      minusScaleVec2(output2.pointB, rB2, normal$4);
    } else {
      var p = subVec2(temp$5, output2.pointA, output2.pointB);
      copyVec2(output2.pointA, p);
      copyVec2(output2.pointB, p);
      output2.distance = 0;
    }
  }
};
var DistanceProxy = (
  /** @class */
  function() {
    function DistanceProxy2() {
      this.m_vertices = [];
      this.m_count = 0;
      this.m_radius = 0;
    }
    DistanceProxy2.prototype.recycle = function() {
      this.m_vertices.length = 0;
      this.m_count = 0;
      this.m_radius = 0;
    };
    DistanceProxy2.prototype.getVertexCount = function() {
      return this.m_count;
    };
    DistanceProxy2.prototype.getVertex = function(index) {
      return this.m_vertices[index];
    };
    DistanceProxy2.prototype.getSupport = function(d2) {
      var bestIndex = -1;
      var bestValue = -Infinity;
      for (var i = 0; i < this.m_count; ++i) {
        var value = dotVec2(this.m_vertices[i], d2);
        if (value > bestValue) {
          bestIndex = i;
          bestValue = value;
        }
      }
      return bestIndex;
    };
    DistanceProxy2.prototype.getSupportVertex = function(d2) {
      return this.m_vertices[this.getSupport(d2)];
    };
    DistanceProxy2.prototype.set = function(shape, index) {
      shape.computeDistanceProxy(this, index);
    };
    DistanceProxy2.prototype.setVertices = function(vertices, count, radius) {
      this.m_vertices = vertices;
      this.m_count = count;
      this.m_radius = radius;
    };
    return DistanceProxy2;
  }()
);
var SimplexVertex = (
  /** @class */
  function() {
    function SimplexVertex2() {
      this.wA = vec2(0, 0);
      this.indexA = 0;
      this.wB = vec2(0, 0);
      this.indexB = 0;
      this.w = vec2(0, 0);
      this.a = 0;
    }
    SimplexVertex2.prototype.recycle = function() {
      this.indexA = 0;
      this.indexB = 0;
      zeroVec2(this.wA);
      zeroVec2(this.wB);
      zeroVec2(this.w);
      this.a = 0;
    };
    SimplexVertex2.prototype.set = function(v3) {
      this.indexA = v3.indexA;
      this.indexB = v3.indexB;
      copyVec2(this.wA, v3.wA);
      copyVec2(this.wB, v3.wB);
      copyVec2(this.w, v3.w);
      this.a = v3.a;
    };
    return SimplexVertex2;
  }()
);
var searchDirection_reuse = vec2(0, 0);
var closestPoint_reuse = vec2(0, 0);
var Simplex = (
  /** @class */
  function() {
    function Simplex2() {
      this.m_v1 = new SimplexVertex();
      this.m_v2 = new SimplexVertex();
      this.m_v3 = new SimplexVertex();
      this.m_v = [this.m_v1, this.m_v2, this.m_v3];
    }
    Simplex2.prototype.recycle = function() {
      this.m_v1.recycle();
      this.m_v2.recycle();
      this.m_v3.recycle();
      this.m_count = 0;
    };
    Simplex2.prototype.toString = function() {
      if (this.m_count === 3) {
        return [
          "+" + this.m_count,
          this.m_v1.a,
          this.m_v1.wA.x,
          this.m_v1.wA.y,
          this.m_v1.wB.x,
          this.m_v1.wB.y,
          this.m_v2.a,
          this.m_v2.wA.x,
          this.m_v2.wA.y,
          this.m_v2.wB.x,
          this.m_v2.wB.y,
          this.m_v3.a,
          this.m_v3.wA.x,
          this.m_v3.wA.y,
          this.m_v3.wB.x,
          this.m_v3.wB.y
        ].toString();
      } else if (this.m_count === 2) {
        return [
          "+" + this.m_count,
          this.m_v1.a,
          this.m_v1.wA.x,
          this.m_v1.wA.y,
          this.m_v1.wB.x,
          this.m_v1.wB.y,
          this.m_v2.a,
          this.m_v2.wA.x,
          this.m_v2.wA.y,
          this.m_v2.wB.x,
          this.m_v2.wB.y
        ].toString();
      } else if (this.m_count === 1) {
        return [
          "+" + this.m_count,
          this.m_v1.a,
          this.m_v1.wA.x,
          this.m_v1.wA.y,
          this.m_v1.wB.x,
          this.m_v1.wB.y
        ].toString();
      } else {
        return "+" + this.m_count;
      }
    };
    Simplex2.prototype.readCache = function(cache2, proxyA, transformA, proxyB, transformB) {
      this.m_count = cache2.count;
      for (var i = 0; i < this.m_count; ++i) {
        var v3 = this.m_v[i];
        v3.indexA = cache2.indexA[i];
        v3.indexB = cache2.indexB[i];
        var wALocal = proxyA.getVertex(v3.indexA);
        var wBLocal = proxyB.getVertex(v3.indexB);
        transformVec2(v3.wA, transformA, wALocal);
        transformVec2(v3.wB, transformB, wBLocal);
        subVec2(v3.w, v3.wB, v3.wA);
        v3.a = 0;
      }
      if (this.m_count > 1) {
        var metric1 = cache2.metric;
        var metric2 = this.getMetric();
        if (metric2 < 0.5 * metric1 || 2 * metric1 < metric2 || metric2 < EPSILON) {
          this.m_count = 0;
        }
      }
      if (this.m_count === 0) {
        var v3 = this.m_v[0];
        v3.indexA = 0;
        v3.indexB = 0;
        var wALocal = proxyA.getVertex(0);
        var wBLocal = proxyB.getVertex(0);
        transformVec2(v3.wA, transformA, wALocal);
        transformVec2(v3.wB, transformB, wBLocal);
        subVec2(v3.w, v3.wB, v3.wA);
        v3.a = 1;
        this.m_count = 1;
      }
    };
    Simplex2.prototype.writeCache = function(cache2) {
      cache2.metric = this.getMetric();
      cache2.count = this.m_count;
      for (var i = 0; i < this.m_count; ++i) {
        cache2.indexA[i] = this.m_v[i].indexA;
        cache2.indexB[i] = this.m_v[i].indexB;
      }
    };
    Simplex2.prototype.getSearchDirection = function() {
      var v13 = this.m_v1;
      var v22 = this.m_v2;
      switch (this.m_count) {
        case 1:
          return setVec2(searchDirection_reuse, -v13.w.x, -v13.w.y);
        case 2: {
          subVec2(e12, v22.w, v13.w);
          var sgn = -crossVec2Vec2(e12, v13.w);
          if (sgn > 0) {
            return setVec2(searchDirection_reuse, -e12.y, e12.x);
          } else {
            return setVec2(searchDirection_reuse, e12.y, -e12.x);
          }
        }
        default:
          return zeroVec2(searchDirection_reuse);
      }
    };
    Simplex2.prototype.getClosestPoint = function() {
      var v13 = this.m_v1;
      var v22 = this.m_v2;
      switch (this.m_count) {
        case 0:
          return zeroVec2(closestPoint_reuse);
        case 1:
          return copyVec2(closestPoint_reuse, v13.w);
        case 2:
          return combine2Vec2(closestPoint_reuse, v13.a, v13.w, v22.a, v22.w);
        case 3:
          return zeroVec2(closestPoint_reuse);
        default:
          return zeroVec2(closestPoint_reuse);
      }
    };
    Simplex2.prototype.getWitnessPoints = function(pA2, pB2) {
      var v13 = this.m_v1;
      var v22 = this.m_v2;
      var v3 = this.m_v3;
      switch (this.m_count) {
        case 0:
          break;
        case 1:
          copyVec2(pA2, v13.wA);
          copyVec2(pB2, v13.wB);
          break;
        case 2:
          combine2Vec2(pA2, v13.a, v13.wA, v22.a, v22.wA);
          combine2Vec2(pB2, v13.a, v13.wB, v22.a, v22.wB);
          break;
        case 3:
          combine3Vec2(pA2, v13.a, v13.wA, v22.a, v22.wA, v3.a, v3.wA);
          copyVec2(pB2, pA2);
          break;
      }
    };
    Simplex2.prototype.getMetric = function() {
      switch (this.m_count) {
        case 0:
          return 0;
        case 1:
          return 0;
        case 2:
          return distVec2(this.m_v1.w, this.m_v2.w);
        case 3:
          return crossVec2Vec2(subVec2(temp1, this.m_v2.w, this.m_v1.w), subVec2(temp2, this.m_v3.w, this.m_v1.w));
        default:
          return 0;
      }
    };
    Simplex2.prototype.solve = function() {
      switch (this.m_count) {
        case 1:
          break;
        case 2:
          this.solve2();
          break;
        case 3:
          this.solve3();
          break;
      }
    };
    Simplex2.prototype.solve2 = function() {
      var w1 = this.m_v1.w;
      var w2 = this.m_v2.w;
      subVec2(e12, w2, w1);
      var d12_2 = -dotVec2(w1, e12);
      if (d12_2 <= 0) {
        this.m_v1.a = 1;
        this.m_count = 1;
        return;
      }
      var d12_1 = dotVec2(w2, e12);
      if (d12_1 <= 0) {
        this.m_v2.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v2);
        return;
      }
      var inv_d12 = 1 / (d12_1 + d12_2);
      this.m_v1.a = d12_1 * inv_d12;
      this.m_v2.a = d12_2 * inv_d12;
      this.m_count = 2;
    };
    Simplex2.prototype.solve3 = function() {
      var w1 = this.m_v1.w;
      var w2 = this.m_v2.w;
      var w3 = this.m_v3.w;
      subVec2(e12, w2, w1);
      var w1e12 = dotVec2(w1, e12);
      var w2e12 = dotVec2(w2, e12);
      var d12_1 = w2e12;
      var d12_2 = -w1e12;
      subVec2(e13, w3, w1);
      var w1e13 = dotVec2(w1, e13);
      var w3e13 = dotVec2(w3, e13);
      var d13_1 = w3e13;
      var d13_2 = -w1e13;
      subVec2(e23, w3, w2);
      var w2e23 = dotVec2(w2, e23);
      var w3e23 = dotVec2(w3, e23);
      var d23_1 = w3e23;
      var d23_2 = -w2e23;
      var n123 = crossVec2Vec2(e12, e13);
      var d123_1 = n123 * crossVec2Vec2(w2, w3);
      var d123_2 = n123 * crossVec2Vec2(w3, w1);
      var d123_3 = n123 * crossVec2Vec2(w1, w2);
      if (d12_2 <= 0 && d13_2 <= 0) {
        this.m_v1.a = 1;
        this.m_count = 1;
        return;
      }
      if (d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
        var inv_d12 = 1 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2;
        return;
      }
      if (d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
        var inv_d13 = 1 / (d13_1 + d13_2);
        this.m_v1.a = d13_1 * inv_d13;
        this.m_v3.a = d13_2 * inv_d13;
        this.m_count = 2;
        this.m_v2.set(this.m_v3);
        return;
      }
      if (d12_1 <= 0 && d23_2 <= 0) {
        this.m_v2.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v2);
        return;
      }
      if (d13_1 <= 0 && d23_1 <= 0) {
        this.m_v3.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v3);
        return;
      }
      if (d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
        var inv_d23 = 1 / (d23_1 + d23_2);
        this.m_v2.a = d23_1 * inv_d23;
        this.m_v3.a = d23_2 * inv_d23;
        this.m_count = 2;
        this.m_v1.set(this.m_v3);
        return;
      }
      var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
      this.m_v1.a = d123_1 * inv_d123;
      this.m_v2.a = d123_2 * inv_d123;
      this.m_v3.a = d123_3 * inv_d123;
      this.m_count = 3;
    };
    return Simplex2;
  }()
);
var simplex = new Simplex();
var input$1 = new DistanceInput();
var cache$1 = new SimplexCache();
var output$1 = new DistanceOutput();
var testOverlap = function(shapeA, indexA, shapeB, indexB, xfA2, xfB2) {
  input$1.recycle();
  input$1.proxyA.set(shapeA, indexA);
  input$1.proxyB.set(shapeB, indexB);
  copyTransform(input$1.transformA, xfA2);
  copyTransform(input$1.transformB, xfB2);
  input$1.useRadii = true;
  output$1.recycle();
  cache$1.recycle();
  Distance(output$1, cache$1, input$1);
  return output$1.distance < 10 * EPSILON;
};
Distance.testOverlap = testOverlap;
Distance.Input = DistanceInput;
Distance.Output = DistanceOutput;
Distance.Proxy = DistanceProxy;
Distance.Cache = SimplexCache;
var ShapeCastInput = (
  /** @class */
  function() {
    function ShapeCastInput2() {
      this.proxyA = new DistanceProxy();
      this.proxyB = new DistanceProxy();
      this.transformA = Transform.identity();
      this.transformB = Transform.identity();
      this.translationB = Vec2.zero();
    }
    ShapeCastInput2.prototype.recycle = function() {
      this.proxyA.recycle();
      this.proxyB.recycle();
      this.transformA.setIdentity();
      this.transformB.setIdentity();
      zeroVec2(this.translationB);
    };
    return ShapeCastInput2;
  }()
);
var ShapeCastOutput = (
  /** @class */
  /* @__PURE__ */ function() {
    function ShapeCastOutput2() {
      this.point = Vec2.zero();
      this.normal = Vec2.zero();
      this.lambda = 1;
      this.iterations = 0;
    }
    return ShapeCastOutput2;
  }()
);
var ShapeCast = function(output2, input2) {
  output2.iterations = 0;
  output2.lambda = 1;
  output2.normal.setZero();
  output2.point.setZero();
  var proxyA = input2.proxyA;
  var proxyB = input2.proxyB;
  var radiusA = math_max$7(proxyA.m_radius, SettingsInternal.polygonRadius);
  var radiusB = math_max$7(proxyB.m_radius, SettingsInternal.polygonRadius);
  var radius = radiusA + radiusB;
  var xfA2 = input2.transformA;
  var xfB2 = input2.transformB;
  var r = input2.translationB;
  var n2 = Vec2.zero();
  var lambda = 0;
  var simplex2 = new Simplex();
  simplex2.m_count = 0;
  var vertices = simplex2.m_v;
  var indexA = proxyA.getSupport(Rot.mulTVec2(xfA2.q, Vec2.neg(r)));
  var wA = Transform.mulVec2(xfA2, proxyA.getVertex(indexA));
  var indexB = proxyB.getSupport(Rot.mulTVec2(xfB2.q, r));
  var wB = Transform.mulVec2(xfB2, proxyB.getVertex(indexB));
  var v3 = Vec2.sub(wA, wB);
  var sigma = math_max$7(SettingsInternal.polygonRadius, radius - SettingsInternal.polygonRadius);
  var tolerance = 0.5 * SettingsInternal.linearSlop;
  var k_maxIters = 20;
  var iter = 0;
  while (iter < k_maxIters && v3.length() - sigma > tolerance) {
    output2.iterations += 1;
    indexA = proxyA.getSupport(Rot.mulTVec2(xfA2.q, Vec2.neg(v3)));
    wA = Transform.mulVec2(xfA2, proxyA.getVertex(indexA));
    indexB = proxyB.getSupport(Rot.mulTVec2(xfB2.q, v3));
    wB = Transform.mulVec2(xfB2, proxyB.getVertex(indexB));
    var p = Vec2.sub(wA, wB);
    v3.normalize();
    var vp = Vec2.dot(v3, p);
    var vr = Vec2.dot(v3, r);
    if (vp - sigma > lambda * vr) {
      if (vr <= 0) {
        return false;
      }
      lambda = (vp - sigma) / vr;
      if (lambda > 1) {
        return false;
      }
      n2.setMul(-1, v3);
      simplex2.m_count = 0;
    }
    var vertex = vertices[simplex2.m_count];
    vertex.indexA = indexB;
    vertex.wA = Vec2.combine(1, wB, lambda, r);
    vertex.indexB = indexA;
    vertex.wB = wA;
    vertex.w = Vec2.sub(vertex.wB, vertex.wA);
    vertex.a = 1;
    simplex2.m_count += 1;
    switch (simplex2.m_count) {
      case 1:
        break;
      case 2:
        simplex2.solve2();
        break;
      case 3:
        simplex2.solve3();
        break;
    }
    if (simplex2.m_count == 3) {
      return false;
    }
    v3.setVec2(simplex2.getClosestPoint());
    ++iter;
  }
  if (iter == 0) {
    return false;
  }
  var pointA2 = Vec2.zero();
  var pointB2 = Vec2.zero();
  simplex2.getWitnessPoints(pointB2, pointA2);
  if (v3.lengthSquared() > 0) {
    n2.setMul(-1, v3);
    n2.normalize();
  }
  output2.point = Vec2.combine(1, pointA2, radiusA, n2);
  output2.normal = n2;
  output2.lambda = lambda;
  output2.iterations = iter;
  return true;
};
var math_abs$8 = Math.abs;
var math_max$6 = Math.max;
var TOIInput = (
  /** @class */
  function() {
    function TOIInput2() {
      this.proxyA = new DistanceProxy();
      this.proxyB = new DistanceProxy();
      this.sweepA = new Sweep();
      this.sweepB = new Sweep();
    }
    TOIInput2.prototype.recycle = function() {
      this.proxyA.recycle();
      this.proxyB.recycle();
      this.sweepA.recycle();
      this.sweepB.recycle();
      this.tMax = -1;
    };
    return TOIInput2;
  }()
);
var TOIOutputState;
(function(TOIOutputState2) {
  TOIOutputState2[TOIOutputState2["e_unset"] = -1] = "e_unset";
  TOIOutputState2[TOIOutputState2["e_unknown"] = 0] = "e_unknown";
  TOIOutputState2[TOIOutputState2["e_failed"] = 1] = "e_failed";
  TOIOutputState2[TOIOutputState2["e_overlapped"] = 2] = "e_overlapped";
  TOIOutputState2[TOIOutputState2["e_touching"] = 3] = "e_touching";
  TOIOutputState2[TOIOutputState2["e_separated"] = 4] = "e_separated";
})(TOIOutputState || (TOIOutputState = {}));
var TOIOutput = (
  /** @class */
  function() {
    function TOIOutput2() {
      this.state = TOIOutputState.e_unset;
      this.t = -1;
    }
    TOIOutput2.prototype.recycle = function() {
      this.state = TOIOutputState.e_unset;
      this.t = -1;
    };
    return TOIOutput2;
  }()
);
stats$1.toiTime = 0;
stats$1.toiMaxTime = 0;
stats$1.toiCalls = 0;
stats$1.toiIters = 0;
stats$1.toiMaxIters = 0;
stats$1.toiRootIters = 0;
stats$1.toiMaxRootIters = 0;
var distanceInput = new DistanceInput();
var distanceOutput = new DistanceOutput();
var cache = new SimplexCache();
var xfA$1 = transform(0, 0, 0);
var xfB$1 = transform(0, 0, 0);
var temp$4 = vec2(0, 0);
var pointA$2 = vec2(0, 0);
var pointB$2 = vec2(0, 0);
var normal$3 = vec2(0, 0);
var axisA = vec2(0, 0);
var axisB = vec2(0, 0);
var localPointA = vec2(0, 0);
var localPointB = vec2(0, 0);
var TimeOfImpact = function(output2, input2) {
  var timer = Timer.now();
  ++stats$1.toiCalls;
  output2.state = TOIOutputState.e_unknown;
  output2.t = input2.tMax;
  var proxyA = input2.proxyA;
  var proxyB = input2.proxyB;
  var sweepA = input2.sweepA;
  var sweepB = input2.sweepB;
  sweepA.normalize();
  sweepB.normalize();
  var tMax = input2.tMax;
  var totalRadius = proxyA.m_radius + proxyB.m_radius;
  var target = math_max$6(SettingsInternal.linearSlop, totalRadius - 3 * SettingsInternal.linearSlop);
  var tolerance = 0.25 * SettingsInternal.linearSlop;
  var t1 = 0;
  var k_maxIterations = SettingsInternal.maxTOIIterations;
  var iter = 0;
  cache.recycle();
  distanceInput.proxyA.setVertices(proxyA.m_vertices, proxyA.m_count, proxyA.m_radius);
  distanceInput.proxyB.setVertices(proxyB.m_vertices, proxyB.m_count, proxyB.m_radius);
  distanceInput.useRadii = false;
  while (true) {
    sweepA.getTransform(xfA$1, t1);
    sweepB.getTransform(xfB$1, t1);
    copyTransform(distanceInput.transformA, xfA$1);
    copyTransform(distanceInput.transformB, xfB$1);
    Distance(distanceOutput, cache, distanceInput);
    if (distanceOutput.distance <= 0) {
      output2.state = TOIOutputState.e_overlapped;
      output2.t = 0;
      break;
    }
    if (distanceOutput.distance < target + tolerance) {
      output2.state = TOIOutputState.e_touching;
      output2.t = t1;
      break;
    }
    separationFunction.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
    var done = false;
    var t2 = tMax;
    var pushBackIter = 0;
    while (true) {
      var s2 = separationFunction.findMinSeparation(t2);
      if (s2 > target + tolerance) {
        output2.state = TOIOutputState.e_separated;
        output2.t = tMax;
        done = true;
        break;
      }
      if (s2 > target - tolerance) {
        t1 = t2;
        break;
      }
      var s1 = separationFunction.evaluate(t1);
      if (s1 < target - tolerance) {
        output2.state = TOIOutputState.e_failed;
        output2.t = t1;
        done = true;
        break;
      }
      if (s1 <= target + tolerance) {
        output2.state = TOIOutputState.e_touching;
        output2.t = t1;
        done = true;
        break;
      }
      var rootIterCount = 0;
      var a1 = t1;
      var a2 = t2;
      while (true) {
        var t = void 0;
        if (rootIterCount & 1) {
          t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
        } else {
          t = 0.5 * (a1 + a2);
        }
        ++rootIterCount;
        ++stats$1.toiRootIters;
        var s3 = separationFunction.evaluate(t);
        if (math_abs$8(s3 - target) < tolerance) {
          t2 = t;
          break;
        }
        if (s3 > target) {
          a1 = t;
          s1 = s3;
        } else {
          a2 = t;
          s2 = s3;
        }
        if (rootIterCount === 50) {
          break;
        }
      }
      stats$1.toiMaxRootIters = math_max$6(stats$1.toiMaxRootIters, rootIterCount);
      ++pushBackIter;
      if (pushBackIter === SettingsInternal.maxPolygonVertices) {
        break;
      }
    }
    ++iter;
    ++stats$1.toiIters;
    if (done) {
      break;
    }
    if (iter === k_maxIterations) {
      output2.state = TOIOutputState.e_failed;
      output2.t = t1;
      break;
    }
  }
  stats$1.toiMaxIters = math_max$6(stats$1.toiMaxIters, iter);
  var time = Timer.diff(timer);
  stats$1.toiMaxTime = math_max$6(stats$1.toiMaxTime, time);
  stats$1.toiTime += time;
  separationFunction.recycle();
};
var SeparationFunctionType;
(function(SeparationFunctionType2) {
  SeparationFunctionType2[SeparationFunctionType2["e_unset"] = -1] = "e_unset";
  SeparationFunctionType2[SeparationFunctionType2["e_points"] = 1] = "e_points";
  SeparationFunctionType2[SeparationFunctionType2["e_faceA"] = 2] = "e_faceA";
  SeparationFunctionType2[SeparationFunctionType2["e_faceB"] = 3] = "e_faceB";
})(SeparationFunctionType || (SeparationFunctionType = {}));
var SeparationFunction = (
  /** @class */
  function() {
    function SeparationFunction2() {
      this.m_proxyA = null;
      this.m_proxyB = null;
      this.m_sweepA = null;
      this.m_sweepB = null;
      this.m_type = SeparationFunctionType.e_unset;
      this.m_localPoint = vec2(0, 0);
      this.m_axis = vec2(0, 0);
      this.indexA = -1;
      this.indexB = -1;
    }
    SeparationFunction2.prototype.recycle = function() {
      this.m_proxyA = null;
      this.m_proxyB = null;
      this.m_sweepA = null;
      this.m_sweepB = null;
      this.m_type = SeparationFunctionType.e_unset;
      zeroVec2(this.m_localPoint);
      zeroVec2(this.m_axis);
      this.indexA = -1;
      this.indexB = -1;
    };
    SeparationFunction2.prototype.initialize = function(cache2, proxyA, sweepA, proxyB, sweepB, t1) {
      var count = cache2.count;
      this.m_proxyA = proxyA;
      this.m_proxyB = proxyB;
      this.m_sweepA = sweepA;
      this.m_sweepB = sweepB;
      this.m_sweepA.getTransform(xfA$1, t1);
      this.m_sweepB.getTransform(xfB$1, t1);
      if (count === 1) {
        this.m_type = SeparationFunctionType.e_points;
        var localPointA_1 = this.m_proxyA.getVertex(cache2.indexA[0]);
        var localPointB_1 = this.m_proxyB.getVertex(cache2.indexB[0]);
        transformVec2(pointA$2, xfA$1, localPointA_1);
        transformVec2(pointB$2, xfB$1, localPointB_1);
        subVec2(this.m_axis, pointB$2, pointA$2);
        var s2 = normalizeVec2Length(this.m_axis);
        return s2;
      } else if (cache2.indexA[0] === cache2.indexA[1]) {
        this.m_type = SeparationFunctionType.e_faceB;
        var localPointB1 = proxyB.getVertex(cache2.indexB[0]);
        var localPointB2 = proxyB.getVertex(cache2.indexB[1]);
        crossVec2Num(this.m_axis, subVec2(temp$4, localPointB2, localPointB1), 1);
        normalizeVec2(this.m_axis);
        rotVec2(normal$3, xfB$1.q, this.m_axis);
        combine2Vec2(this.m_localPoint, 0.5, localPointB1, 0.5, localPointB2);
        transformVec2(pointB$2, xfB$1, this.m_localPoint);
        var localPointA_2 = proxyA.getVertex(cache2.indexA[0]);
        var pointA_1 = Transform.mulVec2(xfA$1, localPointA_2);
        var s2 = dotVec2(pointA_1, normal$3) - dotVec2(pointB$2, normal$3);
        if (s2 < 0) {
          negVec2(this.m_axis);
          s2 = -s2;
        }
        return s2;
      } else {
        this.m_type = SeparationFunctionType.e_faceA;
        var localPointA1 = this.m_proxyA.getVertex(cache2.indexA[0]);
        var localPointA2 = this.m_proxyA.getVertex(cache2.indexA[1]);
        crossVec2Num(this.m_axis, subVec2(temp$4, localPointA2, localPointA1), 1);
        normalizeVec2(this.m_axis);
        rotVec2(normal$3, xfA$1.q, this.m_axis);
        combine2Vec2(this.m_localPoint, 0.5, localPointA1, 0.5, localPointA2);
        transformVec2(pointA$2, xfA$1, this.m_localPoint);
        var localPointB_2 = this.m_proxyB.getVertex(cache2.indexB[0]);
        transformVec2(pointB$2, xfB$1, localPointB_2);
        var s2 = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
        if (s2 < 0) {
          negVec2(this.m_axis);
          s2 = -s2;
        }
        return s2;
      }
    };
    SeparationFunction2.prototype.compute = function(find, t) {
      this.m_sweepA.getTransform(xfA$1, t);
      this.m_sweepB.getTransform(xfB$1, t);
      switch (this.m_type) {
        case SeparationFunctionType.e_points: {
          if (find) {
            derotVec2(axisA, xfA$1.q, this.m_axis);
            derotVec2(axisB, xfB$1.q, scaleVec2(temp$4, -1, this.m_axis));
            this.indexA = this.m_proxyA.getSupport(axisA);
            this.indexB = this.m_proxyB.getSupport(axisB);
          }
          copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
          copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
          transformVec2(pointA$2, xfA$1, localPointA);
          transformVec2(pointB$2, xfB$1, localPointB);
          var sep = dotVec2(pointB$2, this.m_axis) - dotVec2(pointA$2, this.m_axis);
          return sep;
        }
        case SeparationFunctionType.e_faceA: {
          rotVec2(normal$3, xfA$1.q, this.m_axis);
          transformVec2(pointA$2, xfA$1, this.m_localPoint);
          if (find) {
            derotVec2(axisB, xfB$1.q, scaleVec2(temp$4, -1, normal$3));
            this.indexA = -1;
            this.indexB = this.m_proxyB.getSupport(axisB);
          }
          copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
          transformVec2(pointB$2, xfB$1, localPointB);
          var sep = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
          return sep;
        }
        case SeparationFunctionType.e_faceB: {
          rotVec2(normal$3, xfB$1.q, this.m_axis);
          transformVec2(pointB$2, xfB$1, this.m_localPoint);
          if (find) {
            derotVec2(axisA, xfA$1.q, scaleVec2(temp$4, -1, normal$3));
            this.indexB = -1;
            this.indexA = this.m_proxyA.getSupport(axisA);
          }
          copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
          transformVec2(pointA$2, xfA$1, localPointA);
          var sep = dotVec2(pointA$2, normal$3) - dotVec2(pointB$2, normal$3);
          return sep;
        }
        default:
          if (find) {
            this.indexA = -1;
            this.indexB = -1;
          }
          return 0;
      }
    };
    SeparationFunction2.prototype.findMinSeparation = function(t) {
      return this.compute(true, t);
    };
    SeparationFunction2.prototype.evaluate = function(t) {
      return this.compute(false, t);
    };
    return SeparationFunction2;
  }()
);
var separationFunction = new SeparationFunction();
TimeOfImpact.Input = TOIInput;
TimeOfImpact.Output = TOIOutput;
var math_abs$7 = Math.abs;
var math_sqrt$6 = Math.sqrt;
var math_min$a = Math.min;
var TimeStep = (
  /** @class */
  function() {
    function TimeStep2() {
      this.dt = 0;
      this.inv_dt = 0;
      this.velocityIterations = 0;
      this.positionIterations = 0;
      this.warmStarting = false;
      this.blockSolve = true;
      this.inv_dt0 = 0;
      this.dtRatio = 1;
    }
    TimeStep2.prototype.reset = function(dt) {
      if (this.dt > 0) {
        this.inv_dt0 = this.inv_dt;
      }
      this.dt = dt;
      this.inv_dt = dt == 0 ? 0 : 1 / dt;
      this.dtRatio = dt * this.inv_dt0;
    };
    return TimeStep2;
  }()
);
var s_subStep = new TimeStep();
var c = vec2(0, 0);
var v = vec2(0, 0);
var translation = vec2(0, 0);
var input = new TOIInput();
var output = new TOIOutput();
var backup = new Sweep();
var backup1 = new Sweep();
var backup2 = new Sweep();
var ContactImpulse = (
  /** @class */
  function() {
    function ContactImpulse2(contact) {
      this.contact = contact;
      this.normals = [];
      this.tangents = [];
    }
    ContactImpulse2.prototype.recycle = function() {
      this.normals.length = 0;
      this.tangents.length = 0;
    };
    Object.defineProperty(ContactImpulse2.prototype, "normalImpulses", {
      get: function() {
        var contact = this.contact;
        var normals = this.normals;
        normals.length = 0;
        for (var p = 0; p < contact.v_points.length; ++p) {
          normals.push(contact.v_points[p].normalImpulse);
        }
        return normals;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ContactImpulse2.prototype, "tangentImpulses", {
      get: function() {
        var contact = this.contact;
        var tangents = this.tangents;
        tangents.length = 0;
        for (var p = 0; p < contact.v_points.length; ++p) {
          tangents.push(contact.v_points[p].tangentImpulse);
        }
        return tangents;
      },
      enumerable: false,
      configurable: true
    });
    return ContactImpulse2;
  }()
);
var Solver = (
  /** @class */
  function() {
    function Solver2(world) {
      this.m_world = world;
      this.m_stack = [];
      this.m_bodies = [];
      this.m_contacts = [];
      this.m_joints = [];
    }
    Solver2.prototype.clear = function() {
      this.m_stack.length = 0;
      this.m_bodies.length = 0;
      this.m_contacts.length = 0;
      this.m_joints.length = 0;
    };
    Solver2.prototype.addBody = function(body) {
      this.m_bodies.push(body);
    };
    Solver2.prototype.addContact = function(contact) {
      this.m_contacts.push(contact);
    };
    Solver2.prototype.addJoint = function(joint) {
      this.m_joints.push(joint);
    };
    Solver2.prototype.solveWorld = function(step) {
      var world = this.m_world;
      for (var b2 = world.m_bodyList; b2; b2 = b2.m_next) {
        b2.m_islandFlag = false;
      }
      for (var c_1 = world.m_contactList; c_1; c_1 = c_1.m_next) {
        c_1.m_islandFlag = false;
      }
      for (var j = world.m_jointList; j; j = j.m_next) {
        j.m_islandFlag = false;
      }
      var stack = this.m_stack;
      for (var seed = world.m_bodyList; seed; seed = seed.m_next) {
        if (seed.m_islandFlag) {
          continue;
        }
        if (seed.isAwake() == false || seed.isActive() == false) {
          continue;
        }
        if (seed.isStatic()) {
          continue;
        }
        this.clear();
        stack.push(seed);
        seed.m_islandFlag = true;
        while (stack.length > 0) {
          var b2 = stack.pop();
          this.addBody(b2);
          b2.m_awakeFlag = true;
          if (b2.isStatic()) {
            continue;
          }
          for (var ce = b2.m_contactList; ce; ce = ce.next) {
            var contact = ce.contact;
            if (contact.m_islandFlag) {
              continue;
            }
            if (contact.isEnabled() == false || contact.isTouching() == false) {
              continue;
            }
            var sensorA = contact.m_fixtureA.m_isSensor;
            var sensorB = contact.m_fixtureB.m_isSensor;
            if (sensorA || sensorB) {
              continue;
            }
            this.addContact(contact);
            contact.m_islandFlag = true;
            var other = ce.other;
            if (other.m_islandFlag) {
              continue;
            }
            stack.push(other);
            other.m_islandFlag = true;
          }
          for (var je = b2.m_jointList; je; je = je.next) {
            if (je.joint.m_islandFlag == true) {
              continue;
            }
            var other = je.other;
            if (other.isActive() == false) {
              continue;
            }
            this.addJoint(je.joint);
            je.joint.m_islandFlag = true;
            if (other.m_islandFlag) {
              continue;
            }
            stack.push(other);
            other.m_islandFlag = true;
          }
        }
        this.solveIsland(step);
        for (var i = 0; i < this.m_bodies.length; ++i) {
          var b2 = this.m_bodies[i];
          if (b2.isStatic()) {
            b2.m_islandFlag = false;
          }
        }
      }
    };
    Solver2.prototype.solveIsland = function(step) {
      var world = this.m_world;
      var gravity = world.m_gravity;
      var allowSleep = world.m_allowSleep;
      var h = step.dt;
      for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        copyVec2(c, body.m_sweep.c);
        var a2 = body.m_sweep.a;
        copyVec2(v, body.m_linearVelocity);
        var w = body.m_angularVelocity;
        copyVec2(body.m_sweep.c0, body.m_sweep.c);
        body.m_sweep.a0 = body.m_sweep.a;
        if (body.isDynamic()) {
          plusScaleVec2(v, h * body.m_gravityScale, gravity);
          plusScaleVec2(v, h * body.m_invMass, body.m_force);
          w += h * body.m_invI * body.m_torque;
          scaleVec2(v, 1 / (1 + h * body.m_linearDamping), v);
          w *= 1 / (1 + h * body.m_angularDamping);
        }
        copyVec2(body.c_position.c, c);
        body.c_position.a = a2;
        copyVec2(body.c_velocity.v, v);
        body.c_velocity.w = w;
      }
      for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initConstraint(step);
      }
      for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initVelocityConstraint(step);
      }
      if (step.warmStarting) {
        for (var i = 0; i < this.m_contacts.length; ++i) {
          var contact = this.m_contacts[i];
          contact.warmStartConstraint(step);
        }
      }
      for (var i = 0; i < this.m_joints.length; ++i) {
        var joint = this.m_joints[i];
        joint.initVelocityConstraints(step);
      }
      for (var i = 0; i < step.velocityIterations; ++i) {
        for (var j = 0; j < this.m_joints.length; ++j) {
          var joint = this.m_joints[j];
          joint.solveVelocityConstraints(step);
        }
        for (var j = 0; j < this.m_contacts.length; ++j) {
          var contact = this.m_contacts[j];
          contact.solveVelocityConstraint(step);
        }
      }
      for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.storeConstraintImpulses(step);
      }
      for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        copyVec2(c, body.c_position.c);
        var a2 = body.c_position.a;
        copyVec2(v, body.c_velocity.v);
        var w = body.c_velocity.w;
        scaleVec2(translation, h, v);
        var translationLengthSqr = lengthSqrVec2(translation);
        if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
          var ratio = SettingsInternal.maxTranslation / math_sqrt$6(translationLengthSqr);
          mulVec2(v, ratio);
        }
        var rotation2 = h * w;
        if (rotation2 * rotation2 > SettingsInternal.maxRotationSquared) {
          var ratio = SettingsInternal.maxRotation / math_abs$7(rotation2);
          w *= ratio;
        }
        plusScaleVec2(c, h, v);
        a2 += h * w;
        copyVec2(body.c_position.c, c);
        body.c_position.a = a2;
        copyVec2(body.c_velocity.v, v);
        body.c_velocity.w = w;
      }
      var positionSolved = false;
      for (var i = 0; i < step.positionIterations; ++i) {
        var minSeparation = 0;
        for (var j = 0; j < this.m_contacts.length; ++j) {
          var contact = this.m_contacts[j];
          var separation = contact.solvePositionConstraint(step);
          minSeparation = math_min$a(minSeparation, separation);
        }
        var contactsOkay = minSeparation >= -3 * SettingsInternal.linearSlop;
        var jointsOkay = true;
        for (var j = 0; j < this.m_joints.length; ++j) {
          var joint = this.m_joints[j];
          var jointOkay = joint.solvePositionConstraints(step);
          jointsOkay = jointsOkay && jointOkay;
        }
        if (contactsOkay && jointsOkay) {
          positionSolved = true;
          break;
        }
      }
      for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        copyVec2(body.m_sweep.c, body.c_position.c);
        body.m_sweep.a = body.c_position.a;
        copyVec2(body.m_linearVelocity, body.c_velocity.v);
        body.m_angularVelocity = body.c_velocity.w;
        body.synchronizeTransform();
      }
      this.postSolveIsland();
      if (allowSleep) {
        var minSleepTime = Infinity;
        var linTolSqr = SettingsInternal.linearSleepToleranceSqr;
        var angTolSqr = SettingsInternal.angularSleepToleranceSqr;
        for (var i = 0; i < this.m_bodies.length; ++i) {
          var body = this.m_bodies[i];
          if (body.isStatic()) {
            continue;
          }
          if (body.m_autoSleepFlag == false || body.m_angularVelocity * body.m_angularVelocity > angTolSqr || lengthSqrVec2(body.m_linearVelocity) > linTolSqr) {
            body.m_sleepTime = 0;
            minSleepTime = 0;
          } else {
            body.m_sleepTime += h;
            minSleepTime = math_min$a(minSleepTime, body.m_sleepTime);
          }
        }
        if (minSleepTime >= SettingsInternal.timeToSleep && positionSolved) {
          for (var i = 0; i < this.m_bodies.length; ++i) {
            var body = this.m_bodies[i];
            body.setAwake(false);
          }
        }
      }
    };
    Solver2.prototype.solveWorldTOI = function(step) {
      var world = this.m_world;
      if (world.m_stepComplete) {
        for (var b2 = world.m_bodyList; b2; b2 = b2.m_next) {
          b2.m_islandFlag = false;
          b2.m_sweep.alpha0 = 0;
        }
        for (var c_2 = world.m_contactList; c_2; c_2 = c_2.m_next) {
          c_2.m_toiFlag = false;
          c_2.m_islandFlag = false;
          c_2.m_toiCount = 0;
          c_2.m_toi = 1;
        }
      }
      while (true) {
        var minContact = null;
        var minAlpha = 1;
        for (var c_3 = world.m_contactList; c_3; c_3 = c_3.m_next) {
          if (c_3.isEnabled() == false) {
            continue;
          }
          if (c_3.m_toiCount > SettingsInternal.maxSubSteps) {
            continue;
          }
          var alpha = 1;
          if (c_3.m_toiFlag) {
            alpha = c_3.m_toi;
          } else {
            var fA_1 = c_3.getFixtureA();
            var fB_1 = c_3.getFixtureB();
            if (fA_1.isSensor() || fB_1.isSensor()) {
              continue;
            }
            var bA_1 = fA_1.getBody();
            var bB_1 = fB_1.getBody();
            var activeA = bA_1.isAwake() && !bA_1.isStatic();
            var activeB = bB_1.isAwake() && !bB_1.isStatic();
            if (activeA == false && activeB == false) {
              continue;
            }
            var collideA = bA_1.isBullet() || !bA_1.isDynamic();
            var collideB = bB_1.isBullet() || !bB_1.isDynamic();
            if (collideA == false && collideB == false) {
              continue;
            }
            var alpha0 = bA_1.m_sweep.alpha0;
            if (bA_1.m_sweep.alpha0 < bB_1.m_sweep.alpha0) {
              alpha0 = bB_1.m_sweep.alpha0;
              bA_1.m_sweep.advance(alpha0);
            } else if (bB_1.m_sweep.alpha0 < bA_1.m_sweep.alpha0) {
              alpha0 = bA_1.m_sweep.alpha0;
              bB_1.m_sweep.advance(alpha0);
            }
            var indexA = c_3.getChildIndexA();
            var indexB = c_3.getChildIndexB();
            input.proxyA.set(fA_1.getShape(), indexA);
            input.proxyB.set(fB_1.getShape(), indexB);
            input.sweepA.set(bA_1.m_sweep);
            input.sweepB.set(bB_1.m_sweep);
            input.tMax = 1;
            TimeOfImpact(output, input);
            var beta = output.t;
            if (output.state == TOIOutputState.e_touching) {
              alpha = math_min$a(alpha0 + (1 - alpha0) * beta, 1);
            } else {
              alpha = 1;
            }
            c_3.m_toi = alpha;
            c_3.m_toiFlag = true;
          }
          if (alpha < minAlpha) {
            minContact = c_3;
            minAlpha = alpha;
          }
        }
        if (minContact == null || 1 - 10 * EPSILON < minAlpha) {
          world.m_stepComplete = true;
          break;
        }
        var fA = minContact.getFixtureA();
        var fB = minContact.getFixtureB();
        var bA = fA.getBody();
        var bB = fB.getBody();
        backup1.set(bA.m_sweep);
        backup2.set(bB.m_sweep);
        bA.advance(minAlpha);
        bB.advance(minAlpha);
        minContact.update(world);
        minContact.m_toiFlag = false;
        ++minContact.m_toiCount;
        if (minContact.isEnabled() == false || minContact.isTouching() == false) {
          minContact.setEnabled(false);
          bA.m_sweep.set(backup1);
          bB.m_sweep.set(backup2);
          bA.synchronizeTransform();
          bB.synchronizeTransform();
          continue;
        }
        bA.setAwake(true);
        bB.setAwake(true);
        this.clear();
        this.addBody(bA);
        this.addBody(bB);
        this.addContact(minContact);
        bA.m_islandFlag = true;
        bB.m_islandFlag = true;
        minContact.m_islandFlag = true;
        var bodies = [bA, bB];
        for (var i = 0; i < bodies.length; ++i) {
          var body = bodies[i];
          if (body.isDynamic()) {
            for (var ce = body.m_contactList; ce; ce = ce.next) {
              var contact = ce.contact;
              if (contact.m_islandFlag) {
                continue;
              }
              var other = ce.other;
              if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
                continue;
              }
              var sensorA = contact.m_fixtureA.m_isSensor;
              var sensorB = contact.m_fixtureB.m_isSensor;
              if (sensorA || sensorB) {
                continue;
              }
              backup.set(other.m_sweep);
              if (other.m_islandFlag == false) {
                other.advance(minAlpha);
              }
              contact.update(world);
              if (contact.isEnabled() == false || contact.isTouching() == false) {
                other.m_sweep.set(backup);
                other.synchronizeTransform();
                continue;
              }
              contact.m_islandFlag = true;
              this.addContact(contact);
              if (other.m_islandFlag) {
                continue;
              }
              other.m_islandFlag = true;
              if (!other.isStatic()) {
                other.setAwake(true);
              }
              this.addBody(other);
            }
          }
        }
        s_subStep.reset((1 - minAlpha) * step.dt);
        s_subStep.dtRatio = 1;
        s_subStep.positionIterations = 20;
        s_subStep.velocityIterations = step.velocityIterations;
        s_subStep.warmStarting = false;
        this.solveIslandTOI(s_subStep, bA, bB);
        for (var i = 0; i < this.m_bodies.length; ++i) {
          var body = this.m_bodies[i];
          body.m_islandFlag = false;
          if (!body.isDynamic()) {
            continue;
          }
          body.synchronizeFixtures();
          for (var ce = body.m_contactList; ce; ce = ce.next) {
            ce.contact.m_toiFlag = false;
            ce.contact.m_islandFlag = false;
          }
        }
        world.findNewContacts();
        if (world.m_subStepping) {
          world.m_stepComplete = false;
          break;
        }
      }
    };
    Solver2.prototype.solveIslandTOI = function(subStep, toiA, toiB) {
      for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        copyVec2(body.c_position.c, body.m_sweep.c);
        body.c_position.a = body.m_sweep.a;
        copyVec2(body.c_velocity.v, body.m_linearVelocity);
        body.c_velocity.w = body.m_angularVelocity;
      }
      for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initConstraint(subStep);
      }
      for (var i = 0; i < subStep.positionIterations; ++i) {
        var minSeparation = 0;
        for (var j = 0; j < this.m_contacts.length; ++j) {
          var contact = this.m_contacts[j];
          var separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
          minSeparation = math_min$a(minSeparation, separation);
        }
        var contactsOkay = minSeparation >= -1.5 * SettingsInternal.linearSlop;
        if (contactsOkay) {
          break;
        }
      }
      var i;
      copyVec2(toiA.m_sweep.c0, toiA.c_position.c);
      toiA.m_sweep.a0 = toiA.c_position.a;
      copyVec2(toiB.m_sweep.c0, toiB.c_position.c);
      toiB.m_sweep.a0 = toiB.c_position.a;
      for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initVelocityConstraint(subStep);
      }
      for (var i = 0; i < subStep.velocityIterations; ++i) {
        for (var j = 0; j < this.m_contacts.length; ++j) {
          var contact = this.m_contacts[j];
          contact.solveVelocityConstraint(subStep);
        }
      }
      var h = subStep.dt;
      for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        copyVec2(c, body.c_position.c);
        var a2 = body.c_position.a;
        copyVec2(v, body.c_velocity.v);
        var w = body.c_velocity.w;
        scaleVec2(translation, h, v);
        var translationLengthSqr = lengthSqrVec2(translation);
        if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
          var ratio = SettingsInternal.maxTranslation / math_sqrt$6(translationLengthSqr);
          mulVec2(v, ratio);
        }
        var rotation2 = h * w;
        if (rotation2 * rotation2 > SettingsInternal.maxRotationSquared) {
          var ratio = SettingsInternal.maxRotation / math_abs$7(rotation2);
          w *= ratio;
        }
        plusScaleVec2(c, h, v);
        a2 += h * w;
        copyVec2(body.c_position.c, c);
        body.c_position.a = a2;
        copyVec2(body.c_velocity.v, v);
        body.c_velocity.w = w;
        copyVec2(body.m_sweep.c, c);
        body.m_sweep.a = a2;
        copyVec2(body.m_linearVelocity, v);
        body.m_angularVelocity = w;
        body.synchronizeTransform();
      }
      this.postSolveIsland();
    };
    Solver2.prototype.postSolveIsland = function() {
      for (var c_5 = 0; c_5 < this.m_contacts.length; ++c_5) {
        var contact = this.m_contacts[c_5];
        this.m_world.postSolve(contact, contact.m_impulse);
      }
    };
    return Solver2;
  }()
);
Solver.TimeStep = TimeStep;
var Mat22 = (
  /** @class */
  function() {
    function Mat222(a2, b2, c2, d2) {
      if (typeof a2 === "object" && a2 !== null) {
        this.ex = Vec2.clone(a2);
        this.ey = Vec2.clone(b2);
      } else if (typeof a2 === "number") {
        this.ex = Vec2.neo(a2, c2);
        this.ey = Vec2.neo(b2, d2);
      } else {
        this.ex = Vec2.zero();
        this.ey = Vec2.zero();
      }
    }
    Mat222.prototype.toString = function() {
      return JSON.stringify(this);
    };
    Mat222.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return Vec2.isValid(obj.ex) && Vec2.isValid(obj.ey);
    };
    Mat222.assert = function(o) {
    };
    Mat222.prototype.set = function(a2, b2, c2, d2) {
      if (typeof a2 === "number" && typeof b2 === "number" && typeof c2 === "number" && typeof d2 === "number") {
        this.ex.setNum(a2, c2);
        this.ey.setNum(b2, d2);
      } else if (typeof a2 === "object" && typeof b2 === "object") {
        this.ex.setVec2(a2);
        this.ey.setVec2(b2);
      } else if (typeof a2 === "object") {
        this.ex.setVec2(a2.ex);
        this.ey.setVec2(a2.ey);
      } else ;
    };
    Mat222.prototype.setIdentity = function() {
      this.ex.x = 1;
      this.ey.x = 0;
      this.ex.y = 0;
      this.ey.y = 1;
    };
    Mat222.prototype.setZero = function() {
      this.ex.x = 0;
      this.ey.x = 0;
      this.ex.y = 0;
      this.ey.y = 0;
    };
    Mat222.prototype.getInverse = function() {
      var a2 = this.ex.x;
      var b2 = this.ey.x;
      var c2 = this.ex.y;
      var d2 = this.ey.y;
      var det = a2 * d2 - b2 * c2;
      if (det !== 0) {
        det = 1 / det;
      }
      var imx = new Mat222();
      imx.ex.x = det * d2;
      imx.ey.x = -det * b2;
      imx.ex.y = -det * c2;
      imx.ey.y = det * a2;
      return imx;
    };
    Mat222.prototype.solve = function(v3) {
      var a2 = this.ex.x;
      var b2 = this.ey.x;
      var c2 = this.ex.y;
      var d2 = this.ey.y;
      var det = a2 * d2 - b2 * c2;
      if (det !== 0) {
        det = 1 / det;
      }
      var w = Vec2.zero();
      w.x = det * (d2 * v3.x - b2 * v3.y);
      w.y = det * (a2 * v3.y - c2 * v3.x);
      return w;
    };
    Mat222.mul = function(mx, v3) {
      if (v3 && "x" in v3 && "y" in v3) {
        var x2 = mx.ex.x * v3.x + mx.ey.x * v3.y;
        var y = mx.ex.y * v3.x + mx.ey.y * v3.y;
        return Vec2.neo(x2, y);
      } else if (v3 && "ex" in v3 && "ey" in v3) {
        var a2 = mx.ex.x * v3.ex.x + mx.ey.x * v3.ex.y;
        var b2 = mx.ex.x * v3.ey.x + mx.ey.x * v3.ey.y;
        var c2 = mx.ex.y * v3.ex.x + mx.ey.y * v3.ex.y;
        var d2 = mx.ex.y * v3.ey.x + mx.ey.y * v3.ey.y;
        return new Mat222(a2, b2, c2, d2);
      }
    };
    Mat222.mulVec2 = function(mx, v3) {
      var x2 = mx.ex.x * v3.x + mx.ey.x * v3.y;
      var y = mx.ex.y * v3.x + mx.ey.y * v3.y;
      return Vec2.neo(x2, y);
    };
    Mat222.mulMat22 = function(mx, v3) {
      var a2 = mx.ex.x * v3.ex.x + mx.ey.x * v3.ex.y;
      var b2 = mx.ex.x * v3.ey.x + mx.ey.x * v3.ey.y;
      var c2 = mx.ex.y * v3.ex.x + mx.ey.y * v3.ex.y;
      var d2 = mx.ex.y * v3.ey.x + mx.ey.y * v3.ey.y;
      return new Mat222(a2, b2, c2, d2);
    };
    Mat222.mulT = function(mx, v3) {
      if (v3 && "x" in v3 && "y" in v3) {
        return Vec2.neo(Vec2.dot(v3, mx.ex), Vec2.dot(v3, mx.ey));
      } else if (v3 && "ex" in v3 && "ey" in v3) {
        var c1 = Vec2.neo(Vec2.dot(mx.ex, v3.ex), Vec2.dot(mx.ey, v3.ex));
        var c2 = Vec2.neo(Vec2.dot(mx.ex, v3.ey), Vec2.dot(mx.ey, v3.ey));
        return new Mat222(c1, c2);
      }
    };
    Mat222.mulTVec2 = function(mx, v3) {
      return Vec2.neo(Vec2.dot(v3, mx.ex), Vec2.dot(v3, mx.ey));
    };
    Mat222.mulTMat22 = function(mx, v3) {
      var c1 = Vec2.neo(Vec2.dot(mx.ex, v3.ex), Vec2.dot(mx.ey, v3.ex));
      var c2 = Vec2.neo(Vec2.dot(mx.ex, v3.ey), Vec2.dot(mx.ey, v3.ey));
      return new Mat222(c1, c2);
    };
    Mat222.abs = function(mx) {
      return new Mat222(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
    };
    Mat222.add = function(mx1, mx2) {
      return new Mat222(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
    };
    return Mat222;
  }()
);
var math_sqrt$5 = Math.sqrt;
var pointA$1 = vec2(0, 0);
var pointB$1 = vec2(0, 0);
var temp$3 = vec2(0, 0);
var cA$1 = vec2(0, 0);
var cB$1 = vec2(0, 0);
var dist = vec2(0, 0);
var planePoint$2 = vec2(0, 0);
var clipPoint$1 = vec2(0, 0);
var ManifoldType;
(function(ManifoldType2) {
  ManifoldType2[ManifoldType2["e_unset"] = -1] = "e_unset";
  ManifoldType2[ManifoldType2["e_circles"] = 0] = "e_circles";
  ManifoldType2[ManifoldType2["e_faceA"] = 1] = "e_faceA";
  ManifoldType2[ManifoldType2["e_faceB"] = 2] = "e_faceB";
})(ManifoldType || (ManifoldType = {}));
var ContactFeatureType;
(function(ContactFeatureType2) {
  ContactFeatureType2[ContactFeatureType2["e_unset"] = -1] = "e_unset";
  ContactFeatureType2[ContactFeatureType2["e_vertex"] = 0] = "e_vertex";
  ContactFeatureType2[ContactFeatureType2["e_face"] = 1] = "e_face";
})(ContactFeatureType || (ContactFeatureType = {}));
var PointState;
(function(PointState2) {
  PointState2[PointState2["nullState"] = 0] = "nullState";
  PointState2[PointState2["addState"] = 1] = "addState";
  PointState2[PointState2["persistState"] = 2] = "persistState";
  PointState2[PointState2["removeState"] = 3] = "removeState";
})(PointState || (PointState = {}));
var ClipVertex = (
  /** @class */
  function() {
    function ClipVertex2() {
      this.v = vec2(0, 0);
      this.id = new ContactID();
    }
    ClipVertex2.prototype.set = function(o) {
      copyVec2(this.v, o.v);
      this.id.set(o.id);
    };
    ClipVertex2.prototype.recycle = function() {
      zeroVec2(this.v);
      this.id.recycle();
    };
    return ClipVertex2;
  }()
);
var Manifold = (
  /** @class */
  function() {
    function Manifold2() {
      this.localNormal = vec2(0, 0);
      this.localPoint = vec2(0, 0);
      this.points = [new ManifoldPoint(), new ManifoldPoint()];
      this.pointCount = 0;
    }
    Manifold2.prototype.set = function(that) {
      this.type = that.type;
      copyVec2(this.localNormal, that.localNormal);
      copyVec2(this.localPoint, that.localPoint);
      this.pointCount = that.pointCount;
      this.points[0].set(that.points[0]);
      this.points[1].set(that.points[1]);
    };
    Manifold2.prototype.recycle = function() {
      this.type = ManifoldType.e_unset;
      zeroVec2(this.localNormal);
      zeroVec2(this.localPoint);
      this.pointCount = 0;
      this.points[0].recycle();
      this.points[1].recycle();
    };
    Manifold2.prototype.getWorldManifold = function(wm, xfA2, radiusA, xfB2, radiusB) {
      if (this.pointCount == 0) {
        return wm;
      }
      wm = wm || new WorldManifold();
      wm.pointCount = this.pointCount;
      var normal3 = wm.normal;
      var points = wm.points;
      var separations = wm.separations;
      switch (this.type) {
        case ManifoldType.e_circles: {
          setVec2(normal3, 1, 0);
          var manifoldPoint = this.points[0];
          transformVec2(pointA$1, xfA2, this.localPoint);
          transformVec2(pointB$1, xfB2, manifoldPoint.localPoint);
          subVec2(dist, pointB$1, pointA$1);
          var lengthSqr = lengthSqrVec2(dist);
          if (lengthSqr > EPSILON * EPSILON) {
            var length_1 = math_sqrt$5(lengthSqr);
            scaleVec2(normal3, 1 / length_1, dist);
          }
          combine2Vec2(cA$1, 1, pointA$1, radiusA, normal3);
          combine2Vec2(cB$1, 1, pointB$1, -radiusB, normal3);
          combine2Vec2(points[0], 0.5, cA$1, 0.5, cB$1);
          separations[0] = dotVec2(subVec2(temp$3, cB$1, cA$1), normal3);
          break;
        }
        case ManifoldType.e_faceA: {
          rotVec2(normal3, xfA2.q, this.localNormal);
          transformVec2(planePoint$2, xfA2, this.localPoint);
          for (var i = 0; i < this.pointCount; ++i) {
            var manifoldPoint = this.points[i];
            transformVec2(clipPoint$1, xfB2, manifoldPoint.localPoint);
            combine2Vec2(cA$1, 1, clipPoint$1, radiusA - dotVec2(subVec2(temp$3, clipPoint$1, planePoint$2), normal3), normal3);
            combine2Vec2(cB$1, 1, clipPoint$1, -radiusB, normal3);
            combine2Vec2(points[i], 0.5, cA$1, 0.5, cB$1);
            separations[i] = dotVec2(subVec2(temp$3, cB$1, cA$1), normal3);
          }
          break;
        }
        case ManifoldType.e_faceB: {
          rotVec2(normal3, xfB2.q, this.localNormal);
          transformVec2(planePoint$2, xfB2, this.localPoint);
          for (var i = 0; i < this.pointCount; ++i) {
            var manifoldPoint = this.points[i];
            transformVec2(clipPoint$1, xfA2, manifoldPoint.localPoint);
            combine2Vec2(cB$1, 1, clipPoint$1, radiusB - dotVec2(subVec2(temp$3, clipPoint$1, planePoint$2), normal3), normal3);
            combine2Vec2(cA$1, 1, clipPoint$1, -radiusA, normal3);
            combine2Vec2(points[i], 0.5, cA$1, 0.5, cB$1);
            separations[i] = dotVec2(subVec2(temp$3, cA$1, cB$1), normal3);
          }
          negVec2(normal3);
          break;
        }
      }
      return wm;
    };
    Manifold2.clipSegmentToLine = clipSegmentToLine;
    Manifold2.ClipVertex = ClipVertex;
    Manifold2.getPointStates = getPointStates;
    Manifold2.PointState = PointState;
    return Manifold2;
  }()
);
var ManifoldPoint = (
  /** @class */
  function() {
    function ManifoldPoint2() {
      this.localPoint = vec2(0, 0);
      this.normalImpulse = 0;
      this.tangentImpulse = 0;
      this.id = new ContactID();
    }
    ManifoldPoint2.prototype.set = function(that) {
      copyVec2(this.localPoint, that.localPoint);
      this.normalImpulse = that.normalImpulse;
      this.tangentImpulse = that.tangentImpulse;
      this.id.set(that.id);
    };
    ManifoldPoint2.prototype.recycle = function() {
      zeroVec2(this.localPoint);
      this.normalImpulse = 0;
      this.tangentImpulse = 0;
      this.id.recycle();
    };
    return ManifoldPoint2;
  }()
);
var ContactID = (
  /** @class */
  function() {
    function ContactID2() {
      this.key = -1;
      this.indexA = -1;
      this.indexB = -1;
      this.typeA = ContactFeatureType.e_unset;
      this.typeB = ContactFeatureType.e_unset;
    }
    ContactID2.prototype.setFeatures = function(indexA, typeA, indexB, typeB) {
      this.indexA = indexA;
      this.indexB = indexB;
      this.typeA = typeA;
      this.typeB = typeB;
      this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
    };
    ContactID2.prototype.set = function(that) {
      this.indexA = that.indexA;
      this.indexB = that.indexB;
      this.typeA = that.typeA;
      this.typeB = that.typeB;
      this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
    };
    ContactID2.prototype.swapFeatures = function() {
      var indexA = this.indexA;
      var indexB = this.indexB;
      var typeA = this.typeA;
      var typeB = this.typeB;
      this.indexA = indexB;
      this.indexB = indexA;
      this.typeA = typeB;
      this.typeB = typeA;
      this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
    };
    ContactID2.prototype.recycle = function() {
      this.indexA = 0;
      this.indexB = 0;
      this.typeA = ContactFeatureType.e_unset;
      this.typeB = ContactFeatureType.e_unset;
      this.key = -1;
    };
    return ContactID2;
  }()
);
var WorldManifold = (
  /** @class */
  function() {
    function WorldManifold2() {
      this.normal = vec2(0, 0);
      this.points = [vec2(0, 0), vec2(0, 0)];
      this.separations = [0, 0];
      this.pointCount = 0;
    }
    WorldManifold2.prototype.recycle = function() {
      zeroVec2(this.normal);
      zeroVec2(this.points[0]);
      zeroVec2(this.points[1]);
      this.separations[0] = 0;
      this.separations[1] = 0;
      this.pointCount = 0;
    };
    return WorldManifold2;
  }()
);
function getPointStates(state1, state2, manifold1, manifold2) {
  for (var i = 0; i < manifold1.pointCount; ++i) {
    var id = manifold1.points[i].id;
    state1[i] = PointState.removeState;
    for (var j = 0; j < manifold2.pointCount; ++j) {
      if (manifold2.points[j].id.key === id.key) {
        state1[i] = PointState.persistState;
        break;
      }
    }
  }
  for (var i = 0; i < manifold2.pointCount; ++i) {
    var id = manifold2.points[i].id;
    state2[i] = PointState.addState;
    for (var j = 0; j < manifold1.pointCount; ++j) {
      if (manifold1.points[j].id.key === id.key) {
        state2[i] = PointState.persistState;
        break;
      }
    }
  }
}
function clipSegmentToLine(vOut, vIn, normal3, offset, vertexIndexA) {
  var numOut = 0;
  var distance0 = dotVec2(normal3, vIn[0].v) - offset;
  var distance1 = dotVec2(normal3, vIn[1].v) - offset;
  if (distance0 <= 0)
    vOut[numOut++].set(vIn[0]);
  if (distance1 <= 0)
    vOut[numOut++].set(vIn[1]);
  if (distance0 * distance1 < 0) {
    var interp = distance0 / (distance0 - distance1);
    combine2Vec2(vOut[numOut].v, 1 - interp, vIn[0].v, interp, vIn[1].v);
    vOut[numOut].id.setFeatures(vertexIndexA, ContactFeatureType.e_vertex, vIn[0].id.indexB, ContactFeatureType.e_face);
    ++numOut;
  }
  return numOut;
}
var math_sqrt$4 = Math.sqrt;
var math_max$5 = Math.max;
var math_min$9 = Math.min;
var contactPool = new Pool({
  create: function() {
    return new Contact();
  },
  release: function(contact) {
    contact.recycle();
  }
});
var oldManifold = new Manifold();
var worldManifold = new WorldManifold();
var ContactEdge = (
  /** @class */
  function() {
    function ContactEdge2(contact) {
      this.prev = null;
      this.next = null;
      this.other = null;
      this.contact = contact;
    }
    ContactEdge2.prototype.recycle = function() {
      this.prev = null;
      this.next = null;
      this.other = null;
    };
    return ContactEdge2;
  }()
);
function mixFriction(friction1, friction2) {
  return math_sqrt$4(friction1 * friction2);
}
function mixRestitution(restitution1, restitution2) {
  return restitution1 > restitution2 ? restitution1 : restitution2;
}
var s_registers = [];
var VelocityConstraintPoint = (
  /** @class */
  function() {
    function VelocityConstraintPoint2() {
      this.rA = vec2(0, 0);
      this.rB = vec2(0, 0);
      this.normalImpulse = 0;
      this.tangentImpulse = 0;
      this.normalMass = 0;
      this.tangentMass = 0;
      this.velocityBias = 0;
    }
    VelocityConstraintPoint2.prototype.recycle = function() {
      zeroVec2(this.rA);
      zeroVec2(this.rB);
      this.normalImpulse = 0;
      this.tangentImpulse = 0;
      this.normalMass = 0;
      this.tangentMass = 0;
      this.velocityBias = 0;
    };
    return VelocityConstraintPoint2;
  }()
);
var cA = vec2(0, 0);
var vA = vec2(0, 0);
var cB = vec2(0, 0);
var vB = vec2(0, 0);
var tangent$1 = vec2(0, 0);
var xfA = transform(0, 0, 0);
var xfB = transform(0, 0, 0);
var pointA = vec2(0, 0);
var pointB = vec2(0, 0);
var clipPoint = vec2(0, 0);
var planePoint$1 = vec2(0, 0);
var rA = vec2(0, 0);
var rB = vec2(0, 0);
var P$1 = vec2(0, 0);
var normal$2 = vec2(0, 0);
var point = vec2(0, 0);
var dv = vec2(0, 0);
var dv1 = vec2(0, 0);
var dv2 = vec2(0, 0);
var b = vec2(0, 0);
var a = vec2(0, 0);
var x = vec2(0, 0);
var d = vec2(0, 0);
var P1 = vec2(0, 0);
var P2 = vec2(0, 0);
var temp$2 = vec2(0, 0);
var Contact = (
  /** @class */
  function() {
    function Contact2() {
      this.m_nodeA = new ContactEdge(this);
      this.m_nodeB = new ContactEdge(this);
      this.m_fixtureA = null;
      this.m_fixtureB = null;
      this.m_indexA = -1;
      this.m_indexB = -1;
      this.m_evaluateFcn = null;
      this.m_manifold = new Manifold();
      this.m_prev = null;
      this.m_next = null;
      this.m_toi = 1;
      this.m_toiCount = 0;
      this.m_toiFlag = false;
      this.m_friction = 0;
      this.m_restitution = 0;
      this.m_tangentSpeed = 0;
      this.m_enabledFlag = true;
      this.m_islandFlag = false;
      this.m_touchingFlag = false;
      this.m_filterFlag = false;
      this.m_bulletHitFlag = false;
      this.m_impulse = new ContactImpulse(this);
      this.v_points = [new VelocityConstraintPoint(), new VelocityConstraintPoint()];
      this.v_normal = vec2(0, 0);
      this.v_normalMass = new Mat22();
      this.v_K = new Mat22();
      this.v_pointCount = 0;
      this.v_tangentSpeed = 0;
      this.v_friction = 0;
      this.v_restitution = 0;
      this.v_invMassA = 0;
      this.v_invMassB = 0;
      this.v_invIA = 0;
      this.v_invIB = 0;
      this.p_localPoints = [vec2(0, 0), vec2(0, 0)];
      this.p_localNormal = vec2(0, 0);
      this.p_localPoint = vec2(0, 0);
      this.p_localCenterA = vec2(0, 0);
      this.p_localCenterB = vec2(0, 0);
      this.p_type = ManifoldType.e_unset;
      this.p_radiusA = 0;
      this.p_radiusB = 0;
      this.p_pointCount = 0;
      this.p_invMassA = 0;
      this.p_invMassB = 0;
      this.p_invIA = 0;
      this.p_invIB = 0;
    }
    Contact2.prototype.initialize = function(fA, indexA, fB, indexB, evaluateFcn) {
      this.m_fixtureA = fA;
      this.m_fixtureB = fB;
      this.m_indexA = indexA;
      this.m_indexB = indexB;
      this.m_evaluateFcn = evaluateFcn;
      this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
      this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
    };
    Contact2.prototype.recycle = function() {
      this.m_nodeA.recycle();
      this.m_nodeB.recycle();
      this.m_fixtureA = null;
      this.m_fixtureB = null;
      this.m_indexA = -1;
      this.m_indexB = -1;
      this.m_evaluateFcn = null;
      this.m_manifold.recycle();
      this.m_prev = null;
      this.m_next = null;
      this.m_toi = 1;
      this.m_toiCount = 0;
      this.m_toiFlag = false;
      this.m_friction = 0;
      this.m_restitution = 0;
      this.m_tangentSpeed = 0;
      this.m_enabledFlag = true;
      this.m_islandFlag = false;
      this.m_touchingFlag = false;
      this.m_filterFlag = false;
      this.m_bulletHitFlag = false;
      this.m_impulse.recycle();
      for (var _i = 0, _a2 = this.v_points; _i < _a2.length; _i++) {
        var point_1 = _a2[_i];
        point_1.recycle();
      }
      zeroVec2(this.v_normal);
      this.v_normalMass.setZero();
      this.v_K.setZero();
      this.v_pointCount = 0;
      this.v_tangentSpeed = 0;
      this.v_friction = 0;
      this.v_restitution = 0;
      this.v_invMassA = 0;
      this.v_invMassB = 0;
      this.v_invIA = 0;
      this.v_invIB = 0;
      for (var _b = 0, _c = this.p_localPoints; _b < _c.length; _b++) {
        var point_2 = _c[_b];
        zeroVec2(point_2);
      }
      zeroVec2(this.p_localNormal);
      zeroVec2(this.p_localPoint);
      zeroVec2(this.p_localCenterA);
      zeroVec2(this.p_localCenterB);
      this.p_type = ManifoldType.e_unset;
      this.p_radiusA = 0;
      this.p_radiusB = 0;
      this.p_pointCount = 0;
      this.p_invMassA = 0;
      this.p_invMassB = 0;
      this.p_invIA = 0;
      this.p_invIB = 0;
    };
    Contact2.prototype.initConstraint = function(step) {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return;
      var shapeA = fixtureA.m_shape;
      var shapeB = fixtureB.m_shape;
      if (shapeA === null || shapeB === null)
        return;
      var manifold = this.m_manifold;
      var pointCount = manifold.pointCount;
      this.v_invMassA = bodyA.m_invMass;
      this.v_invMassB = bodyB.m_invMass;
      this.v_invIA = bodyA.m_invI;
      this.v_invIB = bodyB.m_invI;
      this.v_friction = this.m_friction;
      this.v_restitution = this.m_restitution;
      this.v_tangentSpeed = this.m_tangentSpeed;
      this.v_pointCount = pointCount;
      this.v_K.setZero();
      this.v_normalMass.setZero();
      this.p_invMassA = bodyA.m_invMass;
      this.p_invMassB = bodyB.m_invMass;
      this.p_invIA = bodyA.m_invI;
      this.p_invIB = bodyB.m_invI;
      copyVec2(this.p_localCenterA, bodyA.m_sweep.localCenter);
      copyVec2(this.p_localCenterB, bodyB.m_sweep.localCenter);
      this.p_radiusA = shapeA.m_radius;
      this.p_radiusB = shapeB.m_radius;
      this.p_type = manifold.type;
      copyVec2(this.p_localNormal, manifold.localNormal);
      copyVec2(this.p_localPoint, manifold.localPoint);
      this.p_pointCount = pointCount;
      for (var j = 0; j < SettingsInternal.maxManifoldPoints; ++j) {
        this.v_points[j].recycle();
        zeroVec2(this.p_localPoints[j]);
      }
      for (var j = 0; j < pointCount; ++j) {
        var cp = manifold.points[j];
        var vcp = this.v_points[j];
        if (step.warmStarting) {
          vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
          vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;
        }
        copyVec2(this.p_localPoints[j], cp.localPoint);
      }
    };
    Contact2.prototype.getManifold = function() {
      return this.m_manifold;
    };
    Contact2.prototype.getWorldManifold = function(worldManifold2) {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return;
      var shapeA = fixtureA.m_shape;
      var shapeB = fixtureB.m_shape;
      if (shapeA === null || shapeB === null)
        return;
      return this.m_manifold.getWorldManifold(worldManifold2, bodyA.getTransform(), shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
    };
    Contact2.prototype.setEnabled = function(flag) {
      this.m_enabledFlag = !!flag;
    };
    Contact2.prototype.isEnabled = function() {
      return this.m_enabledFlag;
    };
    Contact2.prototype.isTouching = function() {
      return this.m_touchingFlag;
    };
    Contact2.prototype.getNext = function() {
      return this.m_next;
    };
    Contact2.prototype.getFixtureA = function() {
      return this.m_fixtureA;
    };
    Contact2.prototype.getFixtureB = function() {
      return this.m_fixtureB;
    };
    Contact2.prototype.getChildIndexA = function() {
      return this.m_indexA;
    };
    Contact2.prototype.getChildIndexB = function() {
      return this.m_indexB;
    };
    Contact2.prototype.flagForFiltering = function() {
      this.m_filterFlag = true;
    };
    Contact2.prototype.setFriction = function(friction) {
      this.m_friction = friction;
    };
    Contact2.prototype.getFriction = function() {
      return this.m_friction;
    };
    Contact2.prototype.resetFriction = function() {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      this.m_friction = mixFriction(fixtureA.m_friction, fixtureB.m_friction);
    };
    Contact2.prototype.setRestitution = function(restitution) {
      this.m_restitution = restitution;
    };
    Contact2.prototype.getRestitution = function() {
      return this.m_restitution;
    };
    Contact2.prototype.resetRestitution = function() {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      this.m_restitution = mixRestitution(fixtureA.m_restitution, fixtureB.m_restitution);
    };
    Contact2.prototype.setTangentSpeed = function(speed) {
      this.m_tangentSpeed = speed;
    };
    Contact2.prototype.getTangentSpeed = function() {
      return this.m_tangentSpeed;
    };
    Contact2.prototype.evaluate = function(manifold, xfA2, xfB2) {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      this.m_evaluateFcn(manifold, xfA2, fixtureA, this.m_indexA, xfB2, fixtureB, this.m_indexB);
    };
    Contact2.prototype.update = function(listener) {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return;
      var shapeA = fixtureA.m_shape;
      var shapeB = fixtureB.m_shape;
      if (shapeA === null || shapeB === null)
        return;
      this.m_enabledFlag = true;
      var touching = false;
      var wasTouching = this.m_touchingFlag;
      var sensorA = fixtureA.m_isSensor;
      var sensorB = fixtureB.m_isSensor;
      var sensor = sensorA || sensorB;
      var xfA2 = bodyA.m_xf;
      var xfB2 = bodyB.m_xf;
      if (sensor) {
        touching = testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA2, xfB2);
        this.m_manifold.pointCount = 0;
      } else {
        oldManifold.recycle();
        oldManifold.set(this.m_manifold);
        this.m_manifold.recycle();
        this.evaluate(this.m_manifold, xfA2, xfB2);
        touching = this.m_manifold.pointCount > 0;
        for (var i = 0; i < this.m_manifold.pointCount; ++i) {
          var nmp = this.m_manifold.points[i];
          nmp.normalImpulse = 0;
          nmp.tangentImpulse = 0;
          for (var j = 0; j < oldManifold.pointCount; ++j) {
            var omp = oldManifold.points[j];
            if (omp.id.key === nmp.id.key) {
              nmp.normalImpulse = omp.normalImpulse;
              nmp.tangentImpulse = omp.tangentImpulse;
              break;
            }
          }
        }
        if (touching !== wasTouching) {
          bodyA.setAwake(true);
          bodyB.setAwake(true);
        }
      }
      this.m_touchingFlag = touching;
      var hasListener = typeof listener === "object" && listener !== null;
      if (!wasTouching && touching && hasListener) {
        listener.beginContact(this);
      }
      if (wasTouching && !touching && hasListener) {
        listener.endContact(this);
      }
      if (!sensor && touching && hasListener && oldManifold) {
        listener.preSolve(this, oldManifold);
      }
    };
    Contact2.prototype.solvePositionConstraint = function(step) {
      return this._solvePositionConstraint(step, null, null);
    };
    Contact2.prototype.solvePositionConstraintTOI = function(step, toiA, toiB) {
      return this._solvePositionConstraint(step, toiA, toiB);
    };
    Contact2.prototype._solvePositionConstraint = function(step, toiA, toiB) {
      var toi = toiA !== null && toiB !== null ? true : false;
      var minSeparation = 0;
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return minSeparation;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return minSeparation;
      var positionA = bodyA.c_position;
      var positionB = bodyB.c_position;
      var localCenterA = this.p_localCenterA;
      var localCenterB = this.p_localCenterB;
      var mA = 0;
      var iA = 0;
      if (!toi || bodyA === toiA || bodyA === toiB) {
        mA = this.p_invMassA;
        iA = this.p_invIA;
      }
      var mB = 0;
      var iB = 0;
      if (!toi || bodyB === toiA || bodyB === toiB) {
        mB = this.p_invMassB;
        iB = this.p_invIB;
      }
      copyVec2(cA, positionA.c);
      var aA = positionA.a;
      copyVec2(cB, positionB.c);
      var aB = positionB.a;
      for (var j = 0; j < this.p_pointCount; ++j) {
        getTransform(xfA, localCenterA, cA, aA);
        getTransform(xfB, localCenterB, cB, aB);
        var separation = void 0;
        switch (this.p_type) {
          case ManifoldType.e_circles: {
            transformVec2(pointA, xfA, this.p_localPoint);
            transformVec2(pointB, xfB, this.p_localPoints[0]);
            subVec2(normal$2, pointB, pointA);
            normalizeVec2(normal$2);
            combine2Vec2(point, 0.5, pointA, 0.5, pointB);
            separation = dotVec2(pointB, normal$2) - dotVec2(pointA, normal$2) - this.p_radiusA - this.p_radiusB;
            break;
          }
          case ManifoldType.e_faceA: {
            rotVec2(normal$2, xfA.q, this.p_localNormal);
            transformVec2(planePoint$1, xfA, this.p_localPoint);
            transformVec2(clipPoint, xfB, this.p_localPoints[j]);
            separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
            copyVec2(point, clipPoint);
            break;
          }
          case ManifoldType.e_faceB: {
            rotVec2(normal$2, xfB.q, this.p_localNormal);
            transformVec2(planePoint$1, xfB, this.p_localPoint);
            transformVec2(clipPoint, xfA, this.p_localPoints[j]);
            separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
            copyVec2(point, clipPoint);
            negVec2(normal$2);
            break;
          }
          default: {
            return minSeparation;
          }
        }
        subVec2(rA, point, cA);
        subVec2(rB, point, cB);
        minSeparation = math_min$9(minSeparation, separation);
        var baumgarte = toi ? SettingsInternal.toiBaugarte : SettingsInternal.baumgarte;
        var linearSlop = SettingsInternal.linearSlop;
        var maxLinearCorrection = SettingsInternal.maxLinearCorrection;
        var C = clamp$1(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0);
        var rnA = crossVec2Vec2(rA, normal$2);
        var rnB = crossVec2Vec2(rB, normal$2);
        var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
        var impulse = K > 0 ? -C / K : 0;
        scaleVec2(P$1, impulse, normal$2);
        minusScaleVec2(cA, mA, P$1);
        aA -= iA * crossVec2Vec2(rA, P$1);
        plusScaleVec2(cB, mB, P$1);
        aB += iB * crossVec2Vec2(rB, P$1);
      }
      copyVec2(positionA.c, cA);
      positionA.a = aA;
      copyVec2(positionB.c, cB);
      positionB.a = aB;
      return minSeparation;
    };
    Contact2.prototype.initVelocityConstraint = function(step) {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return;
      var velocityA = bodyA.c_velocity;
      var velocityB = bodyB.c_velocity;
      var positionA = bodyA.c_position;
      var positionB = bodyB.c_position;
      var radiusA = this.p_radiusA;
      var radiusB = this.p_radiusB;
      var manifold = this.m_manifold;
      var mA = this.v_invMassA;
      var mB = this.v_invMassB;
      var iA = this.v_invIA;
      var iB = this.v_invIB;
      var localCenterA = this.p_localCenterA;
      var localCenterB = this.p_localCenterB;
      copyVec2(cA, positionA.c);
      var aA = positionA.a;
      copyVec2(vA, velocityA.v);
      var wA = velocityA.w;
      copyVec2(cB, positionB.c);
      var aB = positionB.a;
      copyVec2(vB, velocityB.v);
      var wB = velocityB.w;
      getTransform(xfA, localCenterA, cA, aA);
      getTransform(xfB, localCenterB, cB, aB);
      worldManifold.recycle();
      manifold.getWorldManifold(worldManifold, xfA, radiusA, xfB, radiusB);
      copyVec2(this.v_normal, worldManifold.normal);
      for (var j = 0; j < this.v_pointCount; ++j) {
        var vcp = this.v_points[j];
        var wmp = worldManifold.points[j];
        subVec2(vcp.rA, wmp, cA);
        subVec2(vcp.rB, wmp, cB);
        var rnA = crossVec2Vec2(vcp.rA, this.v_normal);
        var rnB = crossVec2Vec2(vcp.rB, this.v_normal);
        var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
        vcp.normalMass = kNormal > 0 ? 1 / kNormal : 0;
        crossVec2Num(tangent$1, this.v_normal, 1);
        var rtA = crossVec2Vec2(vcp.rA, tangent$1);
        var rtB = crossVec2Vec2(vcp.rB, tangent$1);
        var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
        vcp.tangentMass = kTangent > 0 ? 1 / kTangent : 0;
        vcp.velocityBias = 0;
        var vRel = 0;
        vRel += dotVec2(this.v_normal, vB);
        vRel += dotVec2(this.v_normal, crossNumVec2(temp$2, wB, vcp.rB));
        vRel -= dotVec2(this.v_normal, vA);
        vRel -= dotVec2(this.v_normal, crossNumVec2(temp$2, wA, vcp.rA));
        if (vRel < -SettingsInternal.velocityThreshold) {
          vcp.velocityBias = -this.v_restitution * vRel;
        }
      }
      if (this.v_pointCount == 2 && step.blockSolve) {
        var vcp1 = this.v_points[0];
        var vcp2 = this.v_points[1];
        var rn1A = crossVec2Vec2(vcp1.rA, this.v_normal);
        var rn1B = crossVec2Vec2(vcp1.rB, this.v_normal);
        var rn2A = crossVec2Vec2(vcp2.rA, this.v_normal);
        var rn2B = crossVec2Vec2(vcp2.rB, this.v_normal);
        var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
        var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
        var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
        var k_maxConditionNumber = 1e3;
        if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
          this.v_K.ex.setNum(k11, k12);
          this.v_K.ey.setNum(k12, k22);
          var a_1 = this.v_K.ex.x;
          var b_1 = this.v_K.ey.x;
          var c2 = this.v_K.ex.y;
          var d_1 = this.v_K.ey.y;
          var det = a_1 * d_1 - b_1 * c2;
          if (det !== 0) {
            det = 1 / det;
          }
          this.v_normalMass.ex.x = det * d_1;
          this.v_normalMass.ey.x = -det * b_1;
          this.v_normalMass.ex.y = -det * c2;
          this.v_normalMass.ey.y = det * a_1;
        } else {
          this.v_pointCount = 1;
        }
      }
      copyVec2(positionA.c, cA);
      positionA.a = aA;
      copyVec2(velocityA.v, vA);
      velocityA.w = wA;
      copyVec2(positionB.c, cB);
      positionB.a = aB;
      copyVec2(velocityB.v, vB);
      velocityB.w = wB;
    };
    Contact2.prototype.warmStartConstraint = function(step) {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return;
      var velocityA = bodyA.c_velocity;
      var velocityB = bodyB.c_velocity;
      var mA = this.v_invMassA;
      var iA = this.v_invIA;
      var mB = this.v_invMassB;
      var iB = this.v_invIB;
      copyVec2(vA, velocityA.v);
      var wA = velocityA.w;
      copyVec2(vB, velocityB.v);
      var wB = velocityB.w;
      copyVec2(normal$2, this.v_normal);
      crossVec2Num(tangent$1, normal$2, 1);
      for (var j = 0; j < this.v_pointCount; ++j) {
        var vcp = this.v_points[j];
        combine2Vec2(P$1, vcp.normalImpulse, normal$2, vcp.tangentImpulse, tangent$1);
        wA -= iA * crossVec2Vec2(vcp.rA, P$1);
        minusScaleVec2(vA, mA, P$1);
        wB += iB * crossVec2Vec2(vcp.rB, P$1);
        plusScaleVec2(vB, mB, P$1);
      }
      copyVec2(velocityA.v, vA);
      velocityA.w = wA;
      copyVec2(velocityB.v, vB);
      velocityB.w = wB;
    };
    Contact2.prototype.storeConstraintImpulses = function(step) {
      var manifold = this.m_manifold;
      for (var j = 0; j < this.v_pointCount; ++j) {
        manifold.points[j].normalImpulse = this.v_points[j].normalImpulse;
        manifold.points[j].tangentImpulse = this.v_points[j].tangentImpulse;
      }
    };
    Contact2.prototype.solveVelocityConstraint = function(step) {
      var fixtureA = this.m_fixtureA;
      var fixtureB = this.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return;
      var velocityA = bodyA.c_velocity;
      var velocityB = bodyB.c_velocity;
      var mA = this.v_invMassA;
      var iA = this.v_invIA;
      var mB = this.v_invMassB;
      var iB = this.v_invIB;
      copyVec2(vA, velocityA.v);
      var wA = velocityA.w;
      copyVec2(vB, velocityB.v);
      var wB = velocityB.w;
      copyVec2(normal$2, this.v_normal);
      crossVec2Num(tangent$1, normal$2, 1);
      var friction = this.v_friction;
      for (var j = 0; j < this.v_pointCount; ++j) {
        var vcp = this.v_points[j];
        zeroVec2(dv);
        plusVec2(dv, vB);
        plusVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
        minusVec2(dv, vA);
        minusVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
        var vt = dotVec2(dv, tangent$1) - this.v_tangentSpeed;
        var lambda = vcp.tangentMass * -vt;
        var maxFriction = friction * vcp.normalImpulse;
        var newImpulse = clamp$1(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
        lambda = newImpulse - vcp.tangentImpulse;
        vcp.tangentImpulse = newImpulse;
        scaleVec2(P$1, lambda, tangent$1);
        minusScaleVec2(vA, mA, P$1);
        wA -= iA * crossVec2Vec2(vcp.rA, P$1);
        plusScaleVec2(vB, mB, P$1);
        wB += iB * crossVec2Vec2(vcp.rB, P$1);
      }
      if (this.v_pointCount == 1 || step.blockSolve == false) {
        for (var i = 0; i < this.v_pointCount; ++i) {
          var vcp = this.v_points[i];
          zeroVec2(dv);
          plusVec2(dv, vB);
          plusVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
          minusVec2(dv, vA);
          minusVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
          var vn = dotVec2(dv, normal$2);
          var lambda = -vcp.normalMass * (vn - vcp.velocityBias);
          var newImpulse = math_max$5(vcp.normalImpulse + lambda, 0);
          lambda = newImpulse - vcp.normalImpulse;
          vcp.normalImpulse = newImpulse;
          scaleVec2(P$1, lambda, normal$2);
          minusScaleVec2(vA, mA, P$1);
          wA -= iA * crossVec2Vec2(vcp.rA, P$1);
          plusScaleVec2(vB, mB, P$1);
          wB += iB * crossVec2Vec2(vcp.rB, P$1);
        }
      } else {
        var vcp1 = this.v_points[0];
        var vcp2 = this.v_points[1];
        setVec2(a, vcp1.normalImpulse, vcp2.normalImpulse);
        zeroVec2(dv1);
        plusVec2(dv1, vB);
        plusVec2(dv1, crossNumVec2(temp$2, wB, vcp1.rB));
        minusVec2(dv1, vA);
        minusVec2(dv1, crossNumVec2(temp$2, wA, vcp1.rA));
        zeroVec2(dv2);
        plusVec2(dv2, vB);
        plusVec2(dv2, crossNumVec2(temp$2, wB, vcp2.rB));
        minusVec2(dv2, vA);
        minusVec2(dv2, crossNumVec2(temp$2, wA, vcp2.rA));
        var vn1 = dotVec2(dv1, normal$2);
        var vn2 = dotVec2(dv2, normal$2);
        setVec2(b, vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);
        b.x -= this.v_K.ex.x * a.x + this.v_K.ey.x * a.y;
        b.y -= this.v_K.ex.y * a.x + this.v_K.ey.y * a.y;
        while (true) {
          zeroVec2(x);
          x.x = -(this.v_normalMass.ex.x * b.x + this.v_normalMass.ey.x * b.y);
          x.y = -(this.v_normalMass.ex.y * b.x + this.v_normalMass.ey.y * b.y);
          if (x.x >= 0 && x.y >= 0) {
            subVec2(d, x, a);
            scaleVec2(P1, d.x, normal$2);
            scaleVec2(P2, d.y, normal$2);
            combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
            wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
            combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
            wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
            vcp1.normalImpulse = x.x;
            vcp2.normalImpulse = x.y;
            break;
          }
          x.x = -vcp1.normalMass * b.x;
          x.y = 0;
          vn1 = 0;
          vn2 = this.v_K.ex.y * x.x + b.y;
          if (x.x >= 0 && vn2 >= 0) {
            subVec2(d, x, a);
            scaleVec2(P1, d.x, normal$2);
            scaleVec2(P2, d.y, normal$2);
            combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
            wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
            combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
            wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
            vcp1.normalImpulse = x.x;
            vcp2.normalImpulse = x.y;
            break;
          }
          x.x = 0;
          x.y = -vcp2.normalMass * b.y;
          vn1 = this.v_K.ey.x * x.y + b.x;
          vn2 = 0;
          if (x.y >= 0 && vn1 >= 0) {
            subVec2(d, x, a);
            scaleVec2(P1, d.x, normal$2);
            scaleVec2(P2, d.y, normal$2);
            combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
            wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
            combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
            wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
            vcp1.normalImpulse = x.x;
            vcp2.normalImpulse = x.y;
            break;
          }
          x.x = 0;
          x.y = 0;
          vn1 = b.x;
          vn2 = b.y;
          if (vn1 >= 0 && vn2 >= 0) {
            subVec2(d, x, a);
            scaleVec2(P1, d.x, normal$2);
            scaleVec2(P2, d.y, normal$2);
            combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
            wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
            combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
            wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
            vcp1.normalImpulse = x.x;
            vcp2.normalImpulse = x.y;
            break;
          }
          break;
        }
      }
      copyVec2(velocityA.v, vA);
      velocityA.w = wA;
      copyVec2(velocityB.v, vB);
      velocityB.w = wB;
    };
    Contact2.addType = function(type1, type2, callback) {
      s_registers[type1] = s_registers[type1] || {};
      s_registers[type1][type2] = callback;
    };
    Contact2.create = function(fixtureA, indexA, fixtureB, indexB) {
      var typeA = fixtureA.m_shape.m_type;
      var typeB = fixtureB.m_shape.m_type;
      var contact = contactPool.allocate();
      var evaluateFcn;
      if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
        contact.initialize(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
      } else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
        contact.initialize(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
      } else {
        return null;
      }
      fixtureA = contact.m_fixtureA;
      fixtureB = contact.m_fixtureB;
      indexA = contact.getChildIndexA();
      indexB = contact.getChildIndexB();
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      contact.m_nodeA.contact = contact;
      contact.m_nodeA.other = bodyB;
      contact.m_nodeA.prev = null;
      contact.m_nodeA.next = bodyA.m_contactList;
      if (bodyA.m_contactList != null) {
        bodyA.m_contactList.prev = contact.m_nodeA;
      }
      bodyA.m_contactList = contact.m_nodeA;
      contact.m_nodeB.contact = contact;
      contact.m_nodeB.other = bodyA;
      contact.m_nodeB.prev = null;
      contact.m_nodeB.next = bodyB.m_contactList;
      if (bodyB.m_contactList != null) {
        bodyB.m_contactList.prev = contact.m_nodeB;
      }
      bodyB.m_contactList = contact.m_nodeB;
      if (fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
        bodyA.setAwake(true);
        bodyB.setAwake(true);
      }
      return contact;
    };
    Contact2.destroy = function(contact, listener) {
      var fixtureA = contact.m_fixtureA;
      var fixtureB = contact.m_fixtureB;
      if (fixtureA === null || fixtureB === null)
        return;
      var bodyA = fixtureA.m_body;
      var bodyB = fixtureB.m_body;
      if (bodyA === null || bodyB === null)
        return;
      if (contact.isTouching()) {
        listener.endContact(contact);
      }
      if (contact.m_nodeA.prev) {
        contact.m_nodeA.prev.next = contact.m_nodeA.next;
      }
      if (contact.m_nodeA.next) {
        contact.m_nodeA.next.prev = contact.m_nodeA.prev;
      }
      if (contact.m_nodeA == bodyA.m_contactList) {
        bodyA.m_contactList = contact.m_nodeA.next;
      }
      if (contact.m_nodeB.prev) {
        contact.m_nodeB.prev.next = contact.m_nodeB.next;
      }
      if (contact.m_nodeB.next) {
        contact.m_nodeB.next.prev = contact.m_nodeB.prev;
      }
      if (contact.m_nodeB == bodyB.m_contactList) {
        bodyB.m_contactList = contact.m_nodeB.next;
      }
      if (contact.m_manifold.pointCount > 0 && !fixtureA.m_isSensor && !fixtureB.m_isSensor) {
        bodyA.setAwake(true);
        bodyB.setAwake(true);
      }
      contactPool.release(contact);
    };
    return Contact2;
  }()
);
var DEFAULTS$c = {
  gravity: Vec2.zero(),
  allowSleep: true,
  warmStarting: true,
  continuousPhysics: true,
  subStepping: false,
  blockSolve: true,
  velocityIterations: 8,
  positionIterations: 3
};
var World = (
  /** @class */
  function() {
    function World2(def) {
      if (!(this instanceof World2)) {
        return new World2(def);
      }
      this.s_step = new TimeStep();
      if (!def) {
        def = {};
      } else if (Vec2.isValid(def)) {
        def = { gravity: def };
      }
      def = options(def, DEFAULTS$c);
      this.m_solver = new Solver(this);
      this.m_broadPhase = new BroadPhase();
      this.m_contactList = null;
      this.m_contactCount = 0;
      this.m_bodyList = null;
      this.m_bodyCount = 0;
      this.m_jointList = null;
      this.m_jointCount = 0;
      this.m_stepComplete = true;
      this.m_allowSleep = def.allowSleep;
      this.m_gravity = Vec2.clone(def.gravity);
      this.m_clearForces = true;
      this.m_newFixture = false;
      this.m_locked = false;
      this.m_warmStarting = def.warmStarting;
      this.m_continuousPhysics = def.continuousPhysics;
      this.m_subStepping = def.subStepping;
      this.m_blockSolve = def.blockSolve;
      this.m_velocityIterations = def.velocityIterations;
      this.m_positionIterations = def.positionIterations;
      this.m_t = 0;
      this.m_step_callback = [];
    }
    World2.prototype._serialize = function() {
      var bodies = [];
      var joints = [];
      for (var b2 = this.getBodyList(); b2; b2 = b2.getNext()) {
        bodies.push(b2);
      }
      for (var j = this.getJointList(); j; j = j.getNext()) {
        if (typeof j._serialize === "function") {
          joints.push(j);
        }
      }
      return {
        gravity: this.m_gravity,
        bodies,
        joints
      };
    };
    World2._deserialize = function(data, context, restore) {
      if (!data) {
        return new World2();
      }
      var world = new World2(data.gravity);
      if (data.bodies) {
        for (var i = data.bodies.length - 1; i >= 0; i -= 1) {
          world._addBody(restore(Body, data.bodies[i], world));
        }
      }
      if (data.joints) {
        for (var i = data.joints.length - 1; i >= 0; i--) {
          world.createJoint(restore(Joint, data.joints[i], world));
        }
      }
      return world;
    };
    World2.prototype.getBodyList = function() {
      return this.m_bodyList;
    };
    World2.prototype.getJointList = function() {
      return this.m_jointList;
    };
    World2.prototype.getContactList = function() {
      return this.m_contactList;
    };
    World2.prototype.getBodyCount = function() {
      return this.m_bodyCount;
    };
    World2.prototype.getJointCount = function() {
      return this.m_jointCount;
    };
    World2.prototype.getContactCount = function() {
      return this.m_contactCount;
    };
    World2.prototype.setGravity = function(gravity) {
      this.m_gravity.set(gravity);
    };
    World2.prototype.getGravity = function() {
      return this.m_gravity;
    };
    World2.prototype.isLocked = function() {
      return this.m_locked;
    };
    World2.prototype.setAllowSleeping = function(flag) {
      if (flag == this.m_allowSleep) {
        return;
      }
      this.m_allowSleep = flag;
      if (this.m_allowSleep == false) {
        for (var b2 = this.m_bodyList; b2; b2 = b2.m_next) {
          b2.setAwake(true);
        }
      }
    };
    World2.prototype.getAllowSleeping = function() {
      return this.m_allowSleep;
    };
    World2.prototype.setWarmStarting = function(flag) {
      this.m_warmStarting = flag;
    };
    World2.prototype.getWarmStarting = function() {
      return this.m_warmStarting;
    };
    World2.prototype.setContinuousPhysics = function(flag) {
      this.m_continuousPhysics = flag;
    };
    World2.prototype.getContinuousPhysics = function() {
      return this.m_continuousPhysics;
    };
    World2.prototype.setSubStepping = function(flag) {
      this.m_subStepping = flag;
    };
    World2.prototype.getSubStepping = function() {
      return this.m_subStepping;
    };
    World2.prototype.setAutoClearForces = function(flag) {
      this.m_clearForces = flag;
    };
    World2.prototype.getAutoClearForces = function() {
      return this.m_clearForces;
    };
    World2.prototype.clearForces = function() {
      for (var body = this.m_bodyList; body; body = body.getNext()) {
        body.m_force.setZero();
        body.m_torque = 0;
      }
    };
    World2.prototype.queryAABB = function(aabb, callback) {
      var broadPhase = this.m_broadPhase;
      this.m_broadPhase.query(aabb, function(proxyId) {
        var proxy = broadPhase.getUserData(proxyId);
        return callback(proxy.fixture);
      });
    };
    World2.prototype.rayCast = function(point1, point2, callback) {
      var broadPhase = this.m_broadPhase;
      this.m_broadPhase.rayCast({
        maxFraction: 1,
        p1: point1,
        p2: point2
      }, function(input2, proxyId) {
        var proxy = broadPhase.getUserData(proxyId);
        var fixture = proxy.fixture;
        var index = proxy.childIndex;
        var output2 = {};
        var hit = fixture.rayCast(output2, input2, index);
        if (hit) {
          var fraction = output2.fraction;
          var point3 = Vec2.add(Vec2.mulNumVec2(1 - fraction, input2.p1), Vec2.mulNumVec2(fraction, input2.p2));
          return callback(fixture, point3, output2.normal, fraction);
        }
        return input2.maxFraction;
      });
    };
    World2.prototype.getProxyCount = function() {
      return this.m_broadPhase.getProxyCount();
    };
    World2.prototype.getTreeHeight = function() {
      return this.m_broadPhase.getTreeHeight();
    };
    World2.prototype.getTreeBalance = function() {
      return this.m_broadPhase.getTreeBalance();
    };
    World2.prototype.getTreeQuality = function() {
      return this.m_broadPhase.getTreeQuality();
    };
    World2.prototype.shiftOrigin = function(newOrigin) {
      if (this.isLocked()) {
        return;
      }
      for (var b2 = this.m_bodyList; b2; b2 = b2.m_next) {
        b2.m_xf.p.sub(newOrigin);
        b2.m_sweep.c0.sub(newOrigin);
        b2.m_sweep.c.sub(newOrigin);
      }
      for (var j = this.m_jointList; j; j = j.m_next) {
        j.shiftOrigin(newOrigin);
      }
      this.m_broadPhase.shiftOrigin(newOrigin);
    };
    World2.prototype._addBody = function(body) {
      if (this.isLocked()) {
        return;
      }
      body.m_prev = null;
      body.m_next = this.m_bodyList;
      if (this.m_bodyList) {
        this.m_bodyList.m_prev = body;
      }
      this.m_bodyList = body;
      ++this.m_bodyCount;
    };
    World2.prototype.createBody = function(arg1, arg2) {
      if (this.isLocked()) {
        return null;
      }
      var def = {};
      if (!arg1) ;
      else if (Vec2.isValid(arg1)) {
        def = { position: arg1, angle: arg2 };
      } else if (typeof arg1 === "object") {
        def = arg1;
      }
      var body = new Body(this, def);
      this._addBody(body);
      return body;
    };
    World2.prototype.createDynamicBody = function(arg1, arg2) {
      var def = {};
      if (!arg1) ;
      else if (Vec2.isValid(arg1)) {
        def = { position: arg1, angle: arg2 };
      } else if (typeof arg1 === "object") {
        def = arg1;
      }
      def.type = "dynamic";
      return this.createBody(def);
    };
    World2.prototype.createKinematicBody = function(arg1, arg2) {
      var def = {};
      if (!arg1) ;
      else if (Vec2.isValid(arg1)) {
        def = { position: arg1, angle: arg2 };
      } else if (typeof arg1 === "object") {
        def = arg1;
      }
      def.type = "kinematic";
      return this.createBody(def);
    };
    World2.prototype.destroyBody = function(b2) {
      if (this.isLocked()) {
        return;
      }
      if (b2.m_destroyed) {
        return false;
      }
      var je = b2.m_jointList;
      while (je) {
        var je0 = je;
        je = je.next;
        this.publish("remove-joint", je0.joint);
        this.destroyJoint(je0.joint);
        b2.m_jointList = je;
      }
      b2.m_jointList = null;
      var ce = b2.m_contactList;
      while (ce) {
        var ce0 = ce;
        ce = ce.next;
        this.destroyContact(ce0.contact);
        b2.m_contactList = ce;
      }
      b2.m_contactList = null;
      var f = b2.m_fixtureList;
      while (f) {
        var f0 = f;
        f = f.m_next;
        this.publish("remove-fixture", f0);
        f0.destroyProxies(this.m_broadPhase);
        b2.m_fixtureList = f;
      }
      b2.m_fixtureList = null;
      if (b2.m_prev) {
        b2.m_prev.m_next = b2.m_next;
      }
      if (b2.m_next) {
        b2.m_next.m_prev = b2.m_prev;
      }
      if (b2 == this.m_bodyList) {
        this.m_bodyList = b2.m_next;
      }
      b2.m_destroyed = true;
      --this.m_bodyCount;
      this.publish("remove-body", b2);
      return true;
    };
    World2.prototype.createJoint = function(joint) {
      if (this.isLocked()) {
        return null;
      }
      joint.m_prev = null;
      joint.m_next = this.m_jointList;
      if (this.m_jointList) {
        this.m_jointList.m_prev = joint;
      }
      this.m_jointList = joint;
      ++this.m_jointCount;
      joint.m_edgeA.joint = joint;
      joint.m_edgeA.other = joint.m_bodyB;
      joint.m_edgeA.prev = null;
      joint.m_edgeA.next = joint.m_bodyA.m_jointList;
      if (joint.m_bodyA.m_jointList)
        joint.m_bodyA.m_jointList.prev = joint.m_edgeA;
      joint.m_bodyA.m_jointList = joint.m_edgeA;
      joint.m_edgeB.joint = joint;
      joint.m_edgeB.other = joint.m_bodyA;
      joint.m_edgeB.prev = null;
      joint.m_edgeB.next = joint.m_bodyB.m_jointList;
      if (joint.m_bodyB.m_jointList)
        joint.m_bodyB.m_jointList.prev = joint.m_edgeB;
      joint.m_bodyB.m_jointList = joint.m_edgeB;
      if (joint.m_collideConnected == false) {
        for (var edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
          if (edge.other == joint.m_bodyA) {
            edge.contact.flagForFiltering();
          }
        }
      }
      return joint;
    };
    World2.prototype.destroyJoint = function(joint) {
      if (this.isLocked()) {
        return;
      }
      if (joint.m_prev) {
        joint.m_prev.m_next = joint.m_next;
      }
      if (joint.m_next) {
        joint.m_next.m_prev = joint.m_prev;
      }
      if (joint == this.m_jointList) {
        this.m_jointList = joint.m_next;
      }
      var bodyA = joint.m_bodyA;
      var bodyB = joint.m_bodyB;
      bodyA.setAwake(true);
      bodyB.setAwake(true);
      if (joint.m_edgeA.prev) {
        joint.m_edgeA.prev.next = joint.m_edgeA.next;
      }
      if (joint.m_edgeA.next) {
        joint.m_edgeA.next.prev = joint.m_edgeA.prev;
      }
      if (joint.m_edgeA == bodyA.m_jointList) {
        bodyA.m_jointList = joint.m_edgeA.next;
      }
      joint.m_edgeA.prev = null;
      joint.m_edgeA.next = null;
      if (joint.m_edgeB.prev) {
        joint.m_edgeB.prev.next = joint.m_edgeB.next;
      }
      if (joint.m_edgeB.next) {
        joint.m_edgeB.next.prev = joint.m_edgeB.prev;
      }
      if (joint.m_edgeB == bodyB.m_jointList) {
        bodyB.m_jointList = joint.m_edgeB.next;
      }
      joint.m_edgeB.prev = null;
      joint.m_edgeB.next = null;
      --this.m_jointCount;
      if (joint.m_collideConnected == false) {
        var edge = bodyB.getContactList();
        while (edge) {
          if (edge.other == bodyA) {
            edge.contact.flagForFiltering();
          }
          edge = edge.next;
        }
      }
      this.publish("remove-joint", joint);
    };
    World2.prototype.step = function(timeStep, velocityIterations, positionIterations) {
      this.publish("pre-step", timeStep);
      if ((velocityIterations | 0) !== velocityIterations) {
        velocityIterations = 0;
      }
      velocityIterations = velocityIterations || this.m_velocityIterations;
      positionIterations = positionIterations || this.m_positionIterations;
      if (this.m_newFixture) {
        this.findNewContacts();
        this.m_newFixture = false;
      }
      this.m_locked = true;
      this.s_step.reset(timeStep);
      this.s_step.velocityIterations = velocityIterations;
      this.s_step.positionIterations = positionIterations;
      this.s_step.warmStarting = this.m_warmStarting;
      this.s_step.blockSolve = this.m_blockSolve;
      this.updateContacts();
      if (this.m_stepComplete && timeStep > 0) {
        this.m_solver.solveWorld(this.s_step);
        for (var b2 = this.m_bodyList; b2; b2 = b2.getNext()) {
          if (b2.m_islandFlag == false) {
            continue;
          }
          if (b2.isStatic()) {
            continue;
          }
          b2.synchronizeFixtures();
        }
        this.findNewContacts();
      }
      if (this.m_continuousPhysics && timeStep > 0) {
        this.m_solver.solveWorldTOI(this.s_step);
      }
      if (this.m_clearForces) {
        this.clearForces();
      }
      this.m_locked = false;
      var callback;
      while (callback = this.m_step_callback.shift()) {
        callback(this);
      }
      this.publish("post-step", timeStep);
    };
    World2.prototype.queueUpdate = function(callback) {
      if (!this.isLocked()) {
        callback(this);
      } else {
        this.m_step_callback.push(callback);
      }
    };
    World2.prototype.findNewContacts = function() {
      var _this = this;
      this.m_broadPhase.updatePairs(function(proxyA, proxyB) {
        return _this.createContact(proxyA, proxyB);
      });
    };
    World2.prototype.createContact = function(proxyA, proxyB) {
      var fixtureA = proxyA.fixture;
      var fixtureB = proxyB.fixture;
      var indexA = proxyA.childIndex;
      var indexB = proxyB.childIndex;
      var bodyA = fixtureA.getBody();
      var bodyB = fixtureB.getBody();
      if (bodyA == bodyB) {
        return;
      }
      var edge = bodyB.getContactList();
      while (edge) {
        if (edge.other == bodyA) {
          var fA = edge.contact.getFixtureA();
          var fB = edge.contact.getFixtureB();
          var iA = edge.contact.getChildIndexA();
          var iB = edge.contact.getChildIndexB();
          if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
            return;
          }
          if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
            return;
          }
        }
        edge = edge.next;
      }
      if (bodyB.shouldCollide(bodyA) == false) {
        return;
      }
      if (fixtureB.shouldCollide(fixtureA) == false) {
        return;
      }
      var contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
      if (contact == null) {
        return;
      }
      contact.m_prev = null;
      if (this.m_contactList != null) {
        contact.m_next = this.m_contactList;
        this.m_contactList.m_prev = contact;
      }
      this.m_contactList = contact;
      ++this.m_contactCount;
    };
    World2.prototype.updateContacts = function() {
      var c2;
      var next_c = this.m_contactList;
      while (c2 = next_c) {
        next_c = c2.getNext();
        var fixtureA = c2.getFixtureA();
        var fixtureB = c2.getFixtureB();
        var indexA = c2.getChildIndexA();
        var indexB = c2.getChildIndexB();
        var bodyA = fixtureA.getBody();
        var bodyB = fixtureB.getBody();
        if (c2.m_filterFlag) {
          if (bodyB.shouldCollide(bodyA) == false) {
            this.destroyContact(c2);
            continue;
          }
          if (fixtureB.shouldCollide(fixtureA) == false) {
            this.destroyContact(c2);
            continue;
          }
          c2.m_filterFlag = false;
        }
        var activeA = bodyA.isAwake() && !bodyA.isStatic();
        var activeB = bodyB.isAwake() && !bodyB.isStatic();
        if (activeA == false && activeB == false) {
          continue;
        }
        var proxyIdA = fixtureA.m_proxies[indexA].proxyId;
        var proxyIdB = fixtureB.m_proxies[indexB].proxyId;
        var overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);
        if (overlap == false) {
          this.destroyContact(c2);
          continue;
        }
        c2.update(this);
      }
    };
    World2.prototype.destroyContact = function(contact) {
      if (contact.m_prev) {
        contact.m_prev.m_next = contact.m_next;
      }
      if (contact.m_next) {
        contact.m_next.m_prev = contact.m_prev;
      }
      if (contact == this.m_contactList) {
        this.m_contactList = contact.m_next;
      }
      Contact.destroy(contact, this);
      --this.m_contactCount;
    };
    World2.prototype.on = function(name, listener) {
      if (typeof name !== "string" || typeof listener !== "function") {
        return this;
      }
      if (!this._listeners) {
        this._listeners = {};
      }
      if (!this._listeners[name]) {
        this._listeners[name] = [];
      }
      this._listeners[name].push(listener);
      return this;
    };
    World2.prototype.off = function(name, listener) {
      if (typeof name !== "string" || typeof listener !== "function") {
        return this;
      }
      var listeners = this._listeners && this._listeners[name];
      if (!listeners || !listeners.length) {
        return this;
      }
      var index = listeners.indexOf(listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
      return this;
    };
    World2.prototype.publish = function(name, arg1, arg2, arg3) {
      var listeners = this._listeners && this._listeners[name];
      if (!listeners || !listeners.length) {
        return 0;
      }
      for (var l = 0; l < listeners.length; l++) {
        listeners[l].call(this, arg1, arg2, arg3);
      }
      return listeners.length;
    };
    World2.prototype.beginContact = function(contact) {
      this.publish("begin-contact", contact);
    };
    World2.prototype.endContact = function(contact) {
      this.publish("end-contact", contact);
    };
    World2.prototype.preSolve = function(contact, oldManifold2) {
      this.publish("pre-solve", contact, oldManifold2);
    };
    World2.prototype.postSolve = function(contact, impulse) {
      this.publish("post-solve", contact, impulse);
    };
    return World2;
  }()
);
var Vec3 = (
  /** @class */
  function() {
    function Vec32(x2, y, z) {
      if (!(this instanceof Vec32)) {
        return new Vec32(x2, y, z);
      }
      if (typeof x2 === "undefined") {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      } else if (typeof x2 === "object") {
        this.x = x2.x;
        this.y = x2.y;
        this.z = x2.z;
      } else {
        this.x = x2;
        this.y = y;
        this.z = z;
      }
    }
    Vec32.prototype._serialize = function() {
      return {
        x: this.x,
        y: this.y,
        z: this.z
      };
    };
    Vec32._deserialize = function(data) {
      var obj = Object.create(Vec32.prototype);
      obj.x = data.x;
      obj.y = data.y;
      obj.z = data.z;
      return obj;
    };
    Vec32.neo = function(x2, y, z) {
      var obj = Object.create(Vec32.prototype);
      obj.x = x2;
      obj.y = y;
      obj.z = z;
      return obj;
    };
    Vec32.zero = function() {
      var obj = Object.create(Vec32.prototype);
      obj.x = 0;
      obj.y = 0;
      obj.z = 0;
      return obj;
    };
    Vec32.clone = function(v3) {
      return Vec32.neo(v3.x, v3.y, v3.z);
    };
    Vec32.prototype.toString = function() {
      return JSON.stringify(this);
    };
    Vec32.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return Number.isFinite(obj.x) && Number.isFinite(obj.y) && Number.isFinite(obj.z);
    };
    Vec32.assert = function(o) {
    };
    Vec32.prototype.setZero = function() {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      return this;
    };
    Vec32.prototype.set = function(x2, y, z) {
      this.x = x2;
      this.y = y;
      this.z = z;
      return this;
    };
    Vec32.prototype.add = function(w) {
      this.x += w.x;
      this.y += w.y;
      this.z += w.z;
      return this;
    };
    Vec32.prototype.sub = function(w) {
      this.x -= w.x;
      this.y -= w.y;
      this.z -= w.z;
      return this;
    };
    Vec32.prototype.mul = function(m) {
      this.x *= m;
      this.y *= m;
      this.z *= m;
      return this;
    };
    Vec32.areEqual = function(v3, w) {
      return v3 === w || typeof v3 === "object" && v3 !== null && typeof w === "object" && w !== null && v3.x === w.x && v3.y === w.y && v3.z === w.z;
    };
    Vec32.dot = function(v3, w) {
      return v3.x * w.x + v3.y * w.y + v3.z * w.z;
    };
    Vec32.cross = function(v3, w) {
      return new Vec32(v3.y * w.z - v3.z * w.y, v3.z * w.x - v3.x * w.z, v3.x * w.y - v3.y * w.x);
    };
    Vec32.add = function(v3, w) {
      return new Vec32(v3.x + w.x, v3.y + w.y, v3.z + w.z);
    };
    Vec32.sub = function(v3, w) {
      return new Vec32(v3.x - w.x, v3.y - w.y, v3.z - w.z);
    };
    Vec32.mul = function(v3, m) {
      return new Vec32(m * v3.x, m * v3.y, m * v3.z);
    };
    Vec32.prototype.neg = function() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    };
    Vec32.neg = function(v3) {
      return new Vec32(-v3.x, -v3.y, -v3.z);
    };
    return Vec32;
  }()
);
var v1$2 = vec2(0, 0);
var v2$1 = vec2(0, 0);
var EdgeShape = (
  /** @class */
  function(_super) {
    __extends$1(EdgeShape2, _super);
    function EdgeShape2(v122, v22) {
      var _this = this;
      if (!(_this instanceof EdgeShape2)) {
        return new EdgeShape2(v122, v22);
      }
      _this = _super.call(this) || this;
      _this.m_type = EdgeShape2.TYPE;
      _this.m_radius = SettingsInternal.polygonRadius;
      _this.m_vertex1 = v122 ? Vec2.clone(v122) : Vec2.zero();
      _this.m_vertex2 = v22 ? Vec2.clone(v22) : Vec2.zero();
      _this.m_vertex0 = Vec2.zero();
      _this.m_vertex3 = Vec2.zero();
      _this.m_hasVertex0 = false;
      _this.m_hasVertex3 = false;
      return _this;
    }
    EdgeShape2.prototype._serialize = function() {
      return {
        type: this.m_type,
        vertex1: this.m_vertex1,
        vertex2: this.m_vertex2,
        vertex0: this.m_vertex0,
        vertex3: this.m_vertex3,
        hasVertex0: this.m_hasVertex0,
        hasVertex3: this.m_hasVertex3
      };
    };
    EdgeShape2._deserialize = function(data) {
      var shape = new EdgeShape2(data.vertex1, data.vertex2);
      if (shape.m_hasVertex0) {
        shape.setPrevVertex(data.vertex0);
      }
      if (shape.m_hasVertex3) {
        shape.setNextVertex(data.vertex3);
      }
      return shape;
    };
    EdgeShape2.prototype._reset = function() {
    };
    EdgeShape2.prototype.getRadius = function() {
      return this.m_radius;
    };
    EdgeShape2.prototype.getType = function() {
      return this.m_type;
    };
    EdgeShape2.prototype.setNext = function(v3) {
      return this.setNextVertex(v3);
    };
    EdgeShape2.prototype.setNextVertex = function(v3) {
      if (v3) {
        this.m_vertex3.setVec2(v3);
        this.m_hasVertex3 = true;
      } else {
        this.m_vertex3.setZero();
        this.m_hasVertex3 = false;
      }
      return this;
    };
    EdgeShape2.prototype.getNextVertex = function() {
      return this.m_vertex3;
    };
    EdgeShape2.prototype.setPrev = function(v3) {
      return this.setPrevVertex(v3);
    };
    EdgeShape2.prototype.setPrevVertex = function(v3) {
      if (v3) {
        this.m_vertex0.setVec2(v3);
        this.m_hasVertex0 = true;
      } else {
        this.m_vertex0.setZero();
        this.m_hasVertex0 = false;
      }
      return this;
    };
    EdgeShape2.prototype.getPrevVertex = function() {
      return this.m_vertex0;
    };
    EdgeShape2.prototype._set = function(v122, v22) {
      this.m_vertex1.setVec2(v122);
      this.m_vertex2.setVec2(v22);
      this.m_hasVertex0 = false;
      this.m_hasVertex3 = false;
      return this;
    };
    EdgeShape2.prototype._clone = function() {
      var clone = new EdgeShape2();
      clone.m_type = this.m_type;
      clone.m_radius = this.m_radius;
      clone.m_vertex1.setVec2(this.m_vertex1);
      clone.m_vertex2.setVec2(this.m_vertex2);
      clone.m_vertex0.setVec2(this.m_vertex0);
      clone.m_vertex3.setVec2(this.m_vertex3);
      clone.m_hasVertex0 = this.m_hasVertex0;
      clone.m_hasVertex3 = this.m_hasVertex3;
      return clone;
    };
    EdgeShape2.prototype.getChildCount = function() {
      return 1;
    };
    EdgeShape2.prototype.testPoint = function(xf2, p) {
      return false;
    };
    EdgeShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
      var p1 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p1, xf2.p));
      var p2 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p2, xf2.p));
      var d2 = Vec2.sub(p2, p1);
      var v122 = this.m_vertex1;
      var v22 = this.m_vertex2;
      var e3 = Vec2.sub(v22, v122);
      var normal3 = Vec2.neo(e3.y, -e3.x);
      normal3.normalize();
      var numerator = Vec2.dot(normal3, Vec2.sub(v122, p1));
      var denominator = Vec2.dot(normal3, d2);
      if (denominator == 0) {
        return false;
      }
      var t = numerator / denominator;
      if (t < 0 || input2.maxFraction < t) {
        return false;
      }
      var q = Vec2.add(p1, Vec2.mulNumVec2(t, d2));
      var r = Vec2.sub(v22, v122);
      var rr = Vec2.dot(r, r);
      if (rr == 0) {
        return false;
      }
      var s2 = Vec2.dot(Vec2.sub(q, v122), r) / rr;
      if (s2 < 0 || 1 < s2) {
        return false;
      }
      output2.fraction = t;
      if (numerator > 0) {
        output2.normal = Rot.mulVec2(xf2.q, normal3).neg();
      } else {
        output2.normal = Rot.mulVec2(xf2.q, normal3);
      }
      return true;
    };
    EdgeShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
      transformVec2(v1$2, xf2, this.m_vertex1);
      transformVec2(v2$1, xf2, this.m_vertex2);
      AABB.combinePoints(aabb, v1$2, v2$1);
      AABB.extend(aabb, this.m_radius);
    };
    EdgeShape2.prototype.computeMass = function(massData, density) {
      massData.mass = 0;
      combine2Vec2(massData.center, 0.5, this.m_vertex1, 0.5, this.m_vertex2);
      massData.I = 0;
    };
    EdgeShape2.prototype.computeDistanceProxy = function(proxy) {
      proxy.m_vertices[0] = this.m_vertex1;
      proxy.m_vertices[1] = this.m_vertex2;
      proxy.m_vertices.length = 2;
      proxy.m_count = 2;
      proxy.m_radius = this.m_radius;
    };
    EdgeShape2.TYPE = "edge";
    return EdgeShape2;
  }(Shape)
);
var v1$1 = vec2(0, 0);
var v2 = vec2(0, 0);
var ChainShape = (
  /** @class */
  function(_super) {
    __extends$1(ChainShape2, _super);
    function ChainShape2(vertices, loop) {
      var _this = this;
      if (!(_this instanceof ChainShape2)) {
        return new ChainShape2(vertices, loop);
      }
      _this = _super.call(this) || this;
      _this.m_type = ChainShape2.TYPE;
      _this.m_radius = SettingsInternal.polygonRadius;
      _this.m_vertices = [];
      _this.m_count = 0;
      _this.m_prevVertex = null;
      _this.m_nextVertex = null;
      _this.m_hasPrevVertex = false;
      _this.m_hasNextVertex = false;
      _this.m_isLoop = !!loop;
      if (vertices && vertices.length) {
        if (loop) {
          _this._createLoop(vertices);
        } else {
          _this._createChain(vertices);
        }
      }
      return _this;
    }
    ChainShape2.prototype._serialize = function() {
      var data = {
        type: this.m_type,
        vertices: this.m_isLoop ? this.m_vertices.slice(0, this.m_vertices.length - 1) : this.m_vertices,
        isLoop: this.m_isLoop,
        hasPrevVertex: this.m_hasPrevVertex,
        hasNextVertex: this.m_hasNextVertex,
        prevVertex: null,
        nextVertex: null
      };
      if (this.m_prevVertex) {
        data.prevVertex = this.m_prevVertex;
      }
      if (this.m_nextVertex) {
        data.nextVertex = this.m_nextVertex;
      }
      return data;
    };
    ChainShape2._deserialize = function(data, fixture, restore) {
      var vertices = [];
      if (data.vertices) {
        for (var i = 0; i < data.vertices.length; i++) {
          vertices.push(restore(Vec2, data.vertices[i]));
        }
      }
      var shape = new ChainShape2(vertices, data.isLoop);
      if (data.prevVertex) {
        shape.setPrevVertex(data.prevVertex);
      }
      if (data.nextVertex) {
        shape.setNextVertex(data.nextVertex);
      }
      return shape;
    };
    ChainShape2.prototype.getType = function() {
      return this.m_type;
    };
    ChainShape2.prototype.getRadius = function() {
      return this.m_radius;
    };
    ChainShape2.prototype._createLoop = function(vertices) {
      if (vertices.length < 3) {
        return;
      }
      var i;
      this.m_vertices = [];
      this.m_count = vertices.length + 1;
      for (var i = 0; i < vertices.length; ++i) {
        this.m_vertices[i] = Vec2.clone(vertices[i]);
      }
      this.m_vertices[vertices.length] = Vec2.clone(vertices[0]);
      this.m_prevVertex = this.m_vertices[this.m_count - 2];
      this.m_nextVertex = this.m_vertices[1];
      this.m_hasPrevVertex = true;
      this.m_hasNextVertex = true;
      return this;
    };
    ChainShape2.prototype._createChain = function(vertices) {
      var i;
      this.m_vertices = [];
      this.m_count = vertices.length;
      for (var i = 0; i < vertices.length; ++i) {
        this.m_vertices[i] = Vec2.clone(vertices[i]);
      }
      this.m_prevVertex = null;
      this.m_nextVertex = null;
      this.m_hasPrevVertex = false;
      this.m_hasNextVertex = false;
      return this;
    };
    ChainShape2.prototype._reset = function() {
      if (this.m_isLoop) {
        this._createLoop(this.m_vertices.slice(0, this.m_vertices.length - 1));
      } else {
        this._createChain(this.m_vertices);
      }
    };
    ChainShape2.prototype.setPrevVertex = function(prevVertex) {
      this.m_prevVertex = prevVertex;
      this.m_hasPrevVertex = true;
    };
    ChainShape2.prototype.getPrevVertex = function() {
      return this.m_prevVertex;
    };
    ChainShape2.prototype.setNextVertex = function(nextVertex) {
      this.m_nextVertex = nextVertex;
      this.m_hasNextVertex = true;
    };
    ChainShape2.prototype.getNextVertex = function() {
      return this.m_nextVertex;
    };
    ChainShape2.prototype._clone = function() {
      var clone = new ChainShape2();
      clone._createChain(this.m_vertices);
      clone.m_type = this.m_type;
      clone.m_radius = this.m_radius;
      clone.m_prevVertex = this.m_prevVertex;
      clone.m_nextVertex = this.m_nextVertex;
      clone.m_hasPrevVertex = this.m_hasPrevVertex;
      clone.m_hasNextVertex = this.m_hasNextVertex;
      return clone;
    };
    ChainShape2.prototype.getChildCount = function() {
      return this.m_count - 1;
    };
    ChainShape2.prototype.getChildEdge = function(edge, childIndex) {
      edge.m_type = EdgeShape.TYPE;
      edge.m_radius = this.m_radius;
      edge.m_vertex1 = this.m_vertices[childIndex];
      edge.m_vertex2 = this.m_vertices[childIndex + 1];
      if (childIndex > 0) {
        edge.m_vertex0 = this.m_vertices[childIndex - 1];
        edge.m_hasVertex0 = true;
      } else {
        edge.m_vertex0 = this.m_prevVertex;
        edge.m_hasVertex0 = this.m_hasPrevVertex;
      }
      if (childIndex < this.m_count - 2) {
        edge.m_vertex3 = this.m_vertices[childIndex + 2];
        edge.m_hasVertex3 = true;
      } else {
        edge.m_vertex3 = this.m_nextVertex;
        edge.m_hasVertex3 = this.m_hasNextVertex;
      }
    };
    ChainShape2.prototype.getVertex = function(index) {
      if (index < this.m_count) {
        return this.m_vertices[index];
      } else {
        return this.m_vertices[0];
      }
    };
    ChainShape2.prototype.isLoop = function() {
      return this.m_isLoop;
    };
    ChainShape2.prototype.testPoint = function(xf2, p) {
      return false;
    };
    ChainShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
      var edgeShape = new EdgeShape(this.getVertex(childIndex), this.getVertex(childIndex + 1));
      return edgeShape.rayCast(output2, input2, xf2, 0);
    };
    ChainShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
      transformVec2(v1$1, xf2, this.getVertex(childIndex));
      transformVec2(v2, xf2, this.getVertex(childIndex + 1));
      AABB.combinePoints(aabb, v1$1, v2);
    };
    ChainShape2.prototype.computeMass = function(massData, density) {
      massData.mass = 0;
      zeroVec2(massData.center);
      massData.I = 0;
    };
    ChainShape2.prototype.computeDistanceProxy = function(proxy, childIndex) {
      proxy.m_vertices[0] = this.getVertex(childIndex);
      proxy.m_vertices[1] = this.getVertex(childIndex + 1);
      proxy.m_count = 2;
      proxy.m_radius = this.m_radius;
    };
    ChainShape2.TYPE = "chain";
    return ChainShape2;
  }(Shape)
);
var math_max$4 = Math.max;
var math_min$8 = Math.min;
var temp$1 = vec2(0, 0);
var e$1 = vec2(0, 0);
var e1$1 = vec2(0, 0);
var e2$1 = vec2(0, 0);
var center = vec2(0, 0);
var s = vec2(0, 0);
var PolygonShape = (
  /** @class */
  function(_super) {
    __extends$1(PolygonShape2, _super);
    function PolygonShape2(vertices) {
      var _this = this;
      if (!(_this instanceof PolygonShape2)) {
        return new PolygonShape2(vertices);
      }
      _this = _super.call(this) || this;
      _this.m_type = PolygonShape2.TYPE;
      _this.m_radius = SettingsInternal.polygonRadius;
      _this.m_centroid = Vec2.zero();
      _this.m_vertices = [];
      _this.m_normals = [];
      _this.m_count = 0;
      if (vertices && vertices.length) {
        _this._set(vertices);
      }
      return _this;
    }
    PolygonShape2.prototype._serialize = function() {
      return {
        type: this.m_type,
        vertices: this.m_vertices
      };
    };
    PolygonShape2._deserialize = function(data, fixture, restore) {
      var vertices = [];
      if (data.vertices) {
        for (var i = 0; i < data.vertices.length; i++) {
          vertices.push(restore(Vec2, data.vertices[i]));
        }
      }
      var shape = new PolygonShape2(vertices);
      return shape;
    };
    PolygonShape2.prototype.getType = function() {
      return this.m_type;
    };
    PolygonShape2.prototype.getRadius = function() {
      return this.m_radius;
    };
    PolygonShape2.prototype._clone = function() {
      var clone = new PolygonShape2();
      clone.m_type = this.m_type;
      clone.m_radius = this.m_radius;
      clone.m_count = this.m_count;
      clone.m_centroid.setVec2(this.m_centroid);
      for (var i = 0; i < this.m_count; i++) {
        clone.m_vertices.push(this.m_vertices[i].clone());
      }
      for (var i = 0; i < this.m_normals.length; i++) {
        clone.m_normals.push(this.m_normals[i].clone());
      }
      return clone;
    };
    PolygonShape2.prototype.getChildCount = function() {
      return 1;
    };
    PolygonShape2.prototype._reset = function() {
      this._set(this.m_vertices);
    };
    PolygonShape2.prototype._set = function(vertices) {
      if (vertices.length < 3) {
        this._setAsBox(1, 1);
        return;
      }
      var n2 = math_min$8(vertices.length, SettingsInternal.maxPolygonVertices);
      var ps = [];
      for (var i = 0; i < n2; ++i) {
        var v3 = vertices[i];
        var unique = true;
        for (var j = 0; j < ps.length; ++j) {
          if (Vec2.distanceSquared(v3, ps[j]) < 0.25 * SettingsInternal.linearSlopSquared) {
            unique = false;
            break;
          }
        }
        if (unique) {
          ps.push(Vec2.clone(v3));
        }
      }
      n2 = ps.length;
      if (n2 < 3) {
        this._setAsBox(1, 1);
        return;
      }
      var i0 = 0;
      var x0 = ps[0].x;
      for (var i = 1; i < n2; ++i) {
        var x2 = ps[i].x;
        if (x2 > x0 || x2 === x0 && ps[i].y < ps[i0].y) {
          i0 = i;
          x0 = x2;
        }
      }
      var hull = [];
      var m = 0;
      var ih = i0;
      while (true) {
        hull[m] = ih;
        var ie2 = 0;
        for (var j = 1; j < n2; ++j) {
          if (ie2 === ih) {
            ie2 = j;
            continue;
          }
          var r = Vec2.sub(ps[ie2], ps[hull[m]]);
          var v3 = Vec2.sub(ps[j], ps[hull[m]]);
          var c2 = Vec2.crossVec2Vec2(r, v3);
          if (c2 < 0) {
            ie2 = j;
          }
          if (c2 === 0 && v3.lengthSquared() > r.lengthSquared()) {
            ie2 = j;
          }
        }
        ++m;
        ih = ie2;
        if (ie2 === i0) {
          break;
        }
      }
      if (m < 3) {
        this._setAsBox(1, 1);
        return;
      }
      this.m_count = m;
      this.m_vertices = [];
      for (var i = 0; i < m; ++i) {
        this.m_vertices[i] = ps[hull[i]];
      }
      for (var i = 0; i < m; ++i) {
        var i1 = i;
        var i2 = i + 1 < m ? i + 1 : 0;
        var edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
        this.m_normals[i] = Vec2.crossVec2Num(edge, 1);
        this.m_normals[i].normalize();
      }
      this.m_centroid = computeCentroid(this.m_vertices, m);
    };
    PolygonShape2.prototype._setAsBox = function(hx, hy, center2, angle) {
      this.m_vertices[0] = Vec2.neo(hx, -hy);
      this.m_vertices[1] = Vec2.neo(hx, hy);
      this.m_vertices[2] = Vec2.neo(-hx, hy);
      this.m_vertices[3] = Vec2.neo(-hx, -hy);
      this.m_normals[0] = Vec2.neo(1, 0);
      this.m_normals[1] = Vec2.neo(0, 1);
      this.m_normals[2] = Vec2.neo(-1, 0);
      this.m_normals[3] = Vec2.neo(0, -1);
      this.m_count = 4;
      if (center2 && Vec2.isValid(center2)) {
        angle = angle || 0;
        copyVec2(this.m_centroid, center2);
        var xf2 = Transform.identity();
        xf2.p.setVec2(center2);
        xf2.q.setAngle(angle);
        for (var i = 0; i < this.m_count; ++i) {
          this.m_vertices[i] = Transform.mulVec2(xf2, this.m_vertices[i]);
          this.m_normals[i] = Rot.mulVec2(xf2.q, this.m_normals[i]);
        }
      }
    };
    PolygonShape2.prototype.testPoint = function(xf2, p) {
      var pLocal = detransformVec2(temp$1, xf2, p);
      for (var i = 0; i < this.m_count; ++i) {
        var dot = dotVec2(this.m_normals[i], pLocal) - dotVec2(this.m_normals[i], this.m_vertices[i]);
        if (dot > 0) {
          return false;
        }
      }
      return true;
    };
    PolygonShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
      var p1 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p1, xf2.p));
      var p2 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p2, xf2.p));
      var d2 = Vec2.sub(p2, p1);
      var lower = 0;
      var upper = input2.maxFraction;
      var index = -1;
      for (var i = 0; i < this.m_count; ++i) {
        var numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
        var denominator = Vec2.dot(this.m_normals[i], d2);
        if (denominator == 0) {
          if (numerator < 0) {
            return false;
          }
        } else {
          if (denominator < 0 && numerator < lower * denominator) {
            lower = numerator / denominator;
            index = i;
          } else if (denominator > 0 && numerator < upper * denominator) {
            upper = numerator / denominator;
          }
        }
        if (upper < lower) {
          return false;
        }
      }
      if (index >= 0) {
        output2.fraction = lower;
        output2.normal = Rot.mulVec2(xf2.q, this.m_normals[index]);
        return true;
      }
      return false;
    };
    PolygonShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
      var minX = Infinity;
      var minY = Infinity;
      var maxX = -Infinity;
      var maxY = -Infinity;
      for (var i = 0; i < this.m_count; ++i) {
        var v3 = transformVec2(temp$1, xf2, this.m_vertices[i]);
        minX = math_min$8(minX, v3.x);
        maxX = math_max$4(maxX, v3.x);
        minY = math_min$8(minY, v3.y);
        maxY = math_max$4(maxY, v3.y);
      }
      setVec2(aabb.lowerBound, minX - this.m_radius, minY - this.m_radius);
      setVec2(aabb.upperBound, maxX + this.m_radius, maxY + this.m_radius);
    };
    PolygonShape2.prototype.computeMass = function(massData, density) {
      zeroVec2(center);
      var area = 0;
      var I = 0;
      zeroVec2(s);
      for (var i = 0; i < this.m_count; ++i) {
        plusVec2(s, this.m_vertices[i]);
      }
      scaleVec2(s, 1 / this.m_count, s);
      var k_inv3 = 1 / 3;
      for (var i = 0; i < this.m_count; ++i) {
        subVec2(e1$1, this.m_vertices[i], s);
        if (i + 1 < this.m_count) {
          subVec2(e2$1, this.m_vertices[i + 1], s);
        } else {
          subVec2(e2$1, this.m_vertices[0], s);
        }
        var D = crossVec2Vec2(e1$1, e2$1);
        var triangleArea = 0.5 * D;
        area += triangleArea;
        combine2Vec2(temp$1, triangleArea * k_inv3, e1$1, triangleArea * k_inv3, e2$1);
        plusVec2(center, temp$1);
        var ex1 = e1$1.x;
        var ey1 = e1$1.y;
        var ex2 = e2$1.x;
        var ey2 = e2$1.y;
        var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
        var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
        I += 0.25 * k_inv3 * D * (intx2 + inty2);
      }
      massData.mass = density * area;
      scaleVec2(center, 1 / area, center);
      addVec2(massData.center, center, s);
      massData.I = density * I;
      massData.I += massData.mass * (dotVec2(massData.center, massData.center) - dotVec2(center, center));
    };
    PolygonShape2.prototype.validate = function() {
      for (var i = 0; i < this.m_count; ++i) {
        var i1 = i;
        var i2 = i < this.m_count - 1 ? i1 + 1 : 0;
        var p = this.m_vertices[i1];
        subVec2(e$1, this.m_vertices[i2], p);
        for (var j = 0; j < this.m_count; ++j) {
          if (j == i1 || j == i2) {
            continue;
          }
          var c2 = crossVec2Vec2(e$1, subVec2(temp$1, this.m_vertices[j], p));
          if (c2 < 0) {
            return false;
          }
        }
      }
      return true;
    };
    PolygonShape2.prototype.computeDistanceProxy = function(proxy) {
      for (var i = 0; i < this.m_count; ++i) {
        proxy.m_vertices[i] = this.m_vertices[i];
      }
      proxy.m_vertices.length = this.m_count;
      proxy.m_count = this.m_count;
      proxy.m_radius = this.m_radius;
    };
    PolygonShape2.TYPE = "polygon";
    return PolygonShape2;
  }(Shape)
);
function computeCentroid(vs, count) {
  var c2 = Vec2.zero();
  var area = 0;
  var pRef = Vec2.zero();
  var i;
  var inv3 = 1 / 3;
  for (var i = 0; i < count; ++i) {
    var p1 = pRef;
    var p2 = vs[i];
    var p3 = i + 1 < count ? vs[i + 1] : vs[0];
    var e1_1 = Vec2.sub(p2, p1);
    var e2_1 = Vec2.sub(p3, p1);
    var D = Vec2.crossVec2Vec2(e1_1, e2_1);
    var triangleArea = 0.5 * D;
    area += triangleArea;
    combine3Vec2(temp$1, 1, p1, 1, p2, 1, p3);
    plusScaleVec2(c2, triangleArea * inv3, temp$1);
  }
  c2.mul(1 / area);
  return c2;
}
var math_sqrt$3 = Math.sqrt;
var math_PI$6 = Math.PI;
var temp = vec2(0, 0);
var CircleShape = (
  /** @class */
  function(_super) {
    __extends$1(CircleShape2, _super);
    function CircleShape2(a2, b2) {
      var _this = this;
      if (!(_this instanceof CircleShape2)) {
        return new CircleShape2(a2, b2);
      }
      _this = _super.call(this) || this;
      _this.m_type = CircleShape2.TYPE;
      _this.m_p = Vec2.zero();
      _this.m_radius = 1;
      if (typeof a2 === "object" && Vec2.isValid(a2)) {
        _this.m_p.setVec2(a2);
        if (typeof b2 === "number") {
          _this.m_radius = b2;
        }
      } else if (typeof a2 === "number") {
        _this.m_radius = a2;
      }
      return _this;
    }
    CircleShape2.prototype._serialize = function() {
      return {
        type: this.m_type,
        p: this.m_p,
        radius: this.m_radius
      };
    };
    CircleShape2._deserialize = function(data) {
      return new CircleShape2(data.p, data.radius);
    };
    CircleShape2.prototype._reset = function() {
    };
    CircleShape2.prototype.getType = function() {
      return this.m_type;
    };
    CircleShape2.prototype.getRadius = function() {
      return this.m_radius;
    };
    CircleShape2.prototype.getCenter = function() {
      return this.m_p;
    };
    CircleShape2.prototype._clone = function() {
      var clone = new CircleShape2();
      clone.m_type = this.m_type;
      clone.m_radius = this.m_radius;
      clone.m_p = this.m_p.clone();
      return clone;
    };
    CircleShape2.prototype.getChildCount = function() {
      return 1;
    };
    CircleShape2.prototype.testPoint = function(xf2, p) {
      var center2 = transformVec2(temp, xf2, this.m_p);
      return distSqrVec2(p, center2) <= this.m_radius * this.m_radius;
    };
    CircleShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
      var position = Vec2.add(xf2.p, Rot.mulVec2(xf2.q, this.m_p));
      var s2 = Vec2.sub(input2.p1, position);
      var b2 = Vec2.dot(s2, s2) - this.m_radius * this.m_radius;
      var r = Vec2.sub(input2.p2, input2.p1);
      var c2 = Vec2.dot(s2, r);
      var rr = Vec2.dot(r, r);
      var sigma = c2 * c2 - rr * b2;
      if (sigma < 0 || rr < EPSILON) {
        return false;
      }
      var a2 = -(c2 + math_sqrt$3(sigma));
      if (0 <= a2 && a2 <= input2.maxFraction * rr) {
        a2 /= rr;
        output2.fraction = a2;
        output2.normal = Vec2.add(s2, Vec2.mulNumVec2(a2, r));
        output2.normal.normalize();
        return true;
      }
      return false;
    };
    CircleShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
      var p = transformVec2(temp, xf2, this.m_p);
      setVec2(aabb.lowerBound, p.x - this.m_radius, p.y - this.m_radius);
      setVec2(aabb.upperBound, p.x + this.m_radius, p.y + this.m_radius);
    };
    CircleShape2.prototype.computeMass = function(massData, density) {
      massData.mass = density * math_PI$6 * this.m_radius * this.m_radius;
      copyVec2(massData.center, this.m_p);
      massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + lengthSqrVec2(this.m_p));
    };
    CircleShape2.prototype.computeDistanceProxy = function(proxy) {
      proxy.m_vertices[0] = this.m_p;
      proxy.m_vertices.length = 1;
      proxy.m_count = 1;
      proxy.m_radius = this.m_radius;
    };
    CircleShape2.TYPE = "circle";
    return CircleShape2;
  }(Shape)
);
var math_abs$6 = Math.abs;
var math_PI$5 = Math.PI;
var DEFAULTS$b = {
  frequencyHz: 0,
  dampingRatio: 0
};
var DistanceJoint = (
  /** @class */
  function(_super) {
    __extends$1(DistanceJoint2, _super);
    function DistanceJoint2(def, bodyA, bodyB, anchorA, anchorB) {
      var _this = this;
      if (!(_this instanceof DistanceJoint2)) {
        return new DistanceJoint2(def, bodyA, bodyB, anchorA, anchorB);
      }
      if (bodyB && anchorA && "m_type" in anchorA && "x" in bodyB && "y" in bodyB) {
        var temp3 = bodyB;
        bodyB = anchorA;
        anchorA = temp3;
      }
      def = options(def, DEFAULTS$b);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = DistanceJoint2.TYPE;
      _this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.zero());
      _this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.zero());
      _this.m_length = Number.isFinite(def.length) ? def.length : Vec2.distance(bodyA.getWorldPoint(_this.m_localAnchorA), bodyB.getWorldPoint(_this.m_localAnchorB));
      _this.m_frequencyHz = def.frequencyHz;
      _this.m_dampingRatio = def.dampingRatio;
      _this.m_impulse = 0;
      _this.m_gamma = 0;
      _this.m_bias = 0;
      return _this;
    }
    DistanceJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        frequencyHz: this.m_frequencyHz,
        dampingRatio: this.m_dampingRatio,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB,
        length: this.m_length,
        impulse: this.m_impulse,
        gamma: this.m_gamma,
        bias: this.m_bias
      };
    };
    DistanceJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new DistanceJoint2(data);
      return joint;
    };
    DistanceJoint2.prototype._reset = function(def) {
      if (def.anchorA) {
        this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
      } else if (def.localAnchorA) {
        this.m_localAnchorA.setVec2(def.localAnchorA);
      }
      if (def.anchorB) {
        this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
      } else if (def.localAnchorB) {
        this.m_localAnchorB.setVec2(def.localAnchorB);
      }
      if (def.length > 0) {
        this.m_length = +def.length;
      } else if (def.length < 0) ;
      else if (def.anchorA || def.anchorA || def.anchorA || def.anchorA) {
        this.m_length = Vec2.distance(this.m_bodyA.getWorldPoint(this.m_localAnchorA), this.m_bodyB.getWorldPoint(this.m_localAnchorB));
      }
      if (Number.isFinite(def.frequencyHz)) {
        this.m_frequencyHz = def.frequencyHz;
      }
      if (Number.isFinite(def.dampingRatio)) {
        this.m_dampingRatio = def.dampingRatio;
      }
    };
    DistanceJoint2.prototype.getLocalAnchorA = function() {
      return this.m_localAnchorA;
    };
    DistanceJoint2.prototype.getLocalAnchorB = function() {
      return this.m_localAnchorB;
    };
    DistanceJoint2.prototype.setLength = function(length2) {
      this.m_length = length2;
    };
    DistanceJoint2.prototype.getLength = function() {
      return this.m_length;
    };
    DistanceJoint2.prototype.setFrequency = function(hz) {
      this.m_frequencyHz = hz;
    };
    DistanceJoint2.prototype.getFrequency = function() {
      return this.m_frequencyHz;
    };
    DistanceJoint2.prototype.setDampingRatio = function(ratio) {
      this.m_dampingRatio = ratio;
    };
    DistanceJoint2.prototype.getDampingRatio = function() {
      return this.m_dampingRatio;
    };
    DistanceJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    DistanceJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    DistanceJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
    };
    DistanceJoint2.prototype.getReactionTorque = function(inv_dt) {
      return 0;
    };
    DistanceJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      this.m_u = Vec2.sub(Vec2.add(cB2, this.m_rB), Vec2.add(cA2, this.m_rA));
      var length2 = this.m_u.length();
      if (length2 > SettingsInternal.linearSlop) {
        this.m_u.mul(1 / length2);
      } else {
        this.m_u.setNum(0, 0);
      }
      var crAu = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
      var crBu = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
      var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
      this.m_mass = invMass != 0 ? 1 / invMass : 0;
      if (this.m_frequencyHz > 0) {
        var C = length2 - this.m_length;
        var omega = 2 * math_PI$5 * this.m_frequencyHz;
        var d2 = 2 * this.m_mass * this.m_dampingRatio * omega;
        var k = this.m_mass * omega * omega;
        var h = step.dt;
        this.m_gamma = h * (d2 + h * k);
        this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
        this.m_bias = C * h * k * this.m_gamma;
        invMass += this.m_gamma;
        this.m_mass = invMass != 0 ? 1 / invMass : 0;
      } else {
        this.m_gamma = 0;
        this.m_bias = 0;
      }
      if (step.warmStarting) {
        this.m_impulse *= step.dtRatio;
        var P3 = Vec2.mulNumVec2(this.m_impulse, this.m_u);
        vA2.subMul(this.m_invMassA, P3);
        wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
        vB2.addMul(this.m_invMassB, P3);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
      } else {
        this.m_impulse = 0;
      }
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
    };
    DistanceJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var vpA = Vec2.add(vA2, Vec2.crossNumVec2(wA, this.m_rA));
      var vpB = Vec2.add(vB2, Vec2.crossNumVec2(wB, this.m_rB));
      var Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);
      var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
      this.m_impulse += impulse;
      var P3 = Vec2.mulNumVec2(impulse, this.m_u);
      vA2.subMul(this.m_invMassA, P3);
      wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
      vB2.addMul(this.m_invMassB, P3);
      wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
    };
    DistanceJoint2.prototype.solvePositionConstraints = function(step) {
      if (this.m_frequencyHz > 0) {
        return true;
      }
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
      var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
      var u = Vec2.sub(Vec2.add(cB2, rB2), Vec2.add(cA2, rA2));
      var length2 = u.normalize();
      var C = clamp$1(length2 - this.m_length, -SettingsInternal.maxLinearCorrection, SettingsInternal.maxLinearCorrection);
      var impulse = -this.m_mass * C;
      var P3 = Vec2.mulNumVec2(impulse, u);
      cA2.subMul(this.m_invMassA, P3);
      aA -= this.m_invIA * Vec2.crossVec2Vec2(rA2, P3);
      cB2.addMul(this.m_invMassB, P3);
      aB += this.m_invIB * Vec2.crossVec2Vec2(rB2, P3);
      this.m_bodyA.c_position.c.setVec2(cA2);
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c.setVec2(cB2);
      this.m_bodyB.c_position.a = aB;
      return math_abs$6(C) < SettingsInternal.linearSlop;
    };
    DistanceJoint2.TYPE = "distance-joint";
    return DistanceJoint2;
  }(Joint)
);
var DEFAULTS$a = {
  maxForce: 0,
  maxTorque: 0
};
var FrictionJoint = (
  /** @class */
  function(_super) {
    __extends$1(FrictionJoint2, _super);
    function FrictionJoint2(def, bodyA, bodyB, anchor) {
      var _this = this;
      if (!(_this instanceof FrictionJoint2)) {
        return new FrictionJoint2(def, bodyA, bodyB, anchor);
      }
      def = options(def, DEFAULTS$a);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = FrictionJoint2.TYPE;
      _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
      _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
      _this.m_linearImpulse = Vec2.zero();
      _this.m_angularImpulse = 0;
      _this.m_maxForce = def.maxForce;
      _this.m_maxTorque = def.maxTorque;
      return _this;
    }
    FrictionJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        maxForce: this.m_maxForce,
        maxTorque: this.m_maxTorque,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB
      };
    };
    FrictionJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new FrictionJoint2(data);
      return joint;
    };
    FrictionJoint2.prototype._reset = function(def) {
      if (def.anchorA) {
        this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
      } else if (def.localAnchorA) {
        this.m_localAnchorA.setVec2(def.localAnchorA);
      }
      if (def.anchorB) {
        this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
      } else if (def.localAnchorB) {
        this.m_localAnchorB.setVec2(def.localAnchorB);
      }
      if (Number.isFinite(def.maxForce)) {
        this.m_maxForce = def.maxForce;
      }
      if (Number.isFinite(def.maxTorque)) {
        this.m_maxTorque = def.maxTorque;
      }
    };
    FrictionJoint2.prototype.getLocalAnchorA = function() {
      return this.m_localAnchorA;
    };
    FrictionJoint2.prototype.getLocalAnchorB = function() {
      return this.m_localAnchorB;
    };
    FrictionJoint2.prototype.setMaxForce = function(force) {
      this.m_maxForce = force;
    };
    FrictionJoint2.prototype.getMaxForce = function() {
      return this.m_maxForce;
    };
    FrictionJoint2.prototype.setMaxTorque = function(torque) {
      this.m_maxTorque = torque;
    };
    FrictionJoint2.prototype.getMaxTorque = function() {
      return this.m_maxTorque;
    };
    FrictionJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    FrictionJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    FrictionJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
    };
    FrictionJoint2.prototype.getReactionTorque = function(inv_dt) {
      return inv_dt * this.m_angularImpulse;
    };
    FrictionJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var K = new Mat22();
      K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
      K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
      K.ey.x = K.ex.y;
      K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
      this.m_linearMass = K.getInverse();
      this.m_angularMass = iA + iB;
      if (this.m_angularMass > 0) {
        this.m_angularMass = 1 / this.m_angularMass;
      }
      if (step.warmStarting) {
        this.m_linearImpulse.mul(step.dtRatio);
        this.m_angularImpulse *= step.dtRatio;
        var P3 = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
        vA2.subMul(mA, P3);
        wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_angularImpulse);
        vB2.addMul(mB, P3);
        wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_angularImpulse);
      } else {
        this.m_linearImpulse.setZero();
        this.m_angularImpulse = 0;
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    FrictionJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var h = step.dt;
      {
        var Cdot = wB - wA;
        var impulse = -this.m_angularMass * Cdot;
        var oldImpulse = this.m_angularImpulse;
        var maxImpulse = h * this.m_maxTorque;
        this.m_angularImpulse = clamp$1(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_angularImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
      }
      {
        var Cdot = Vec2.sub(Vec2.add(vB2, Vec2.crossNumVec2(wB, this.m_rB)), Vec2.add(vA2, Vec2.crossNumVec2(wA, this.m_rA)));
        var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
        var oldImpulse = this.m_linearImpulse;
        this.m_linearImpulse.add(impulse);
        var maxImpulse = h * this.m_maxForce;
        if (this.m_linearImpulse.lengthSquared() > maxImpulse * maxImpulse) {
          this.m_linearImpulse.normalize();
          this.m_linearImpulse.mul(maxImpulse);
        }
        impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
        vA2.subMul(mA, impulse);
        wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
        vB2.addMul(mB, impulse);
        wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    FrictionJoint2.prototype.solvePositionConstraints = function(step) {
      return true;
    };
    FrictionJoint2.TYPE = "friction-joint";
    return FrictionJoint2;
  }(Joint)
);
var Mat33 = (
  /** @class */
  function() {
    function Mat332(a2, b2, c2) {
      if (typeof a2 === "object" && a2 !== null) {
        this.ex = Vec3.clone(a2);
        this.ey = Vec3.clone(b2);
        this.ez = Vec3.clone(c2);
      } else {
        this.ex = Vec3.zero();
        this.ey = Vec3.zero();
        this.ez = Vec3.zero();
      }
    }
    Mat332.prototype.toString = function() {
      return JSON.stringify(this);
    };
    Mat332.isValid = function(obj) {
      if (obj === null || typeof obj === "undefined") {
        return false;
      }
      return Vec3.isValid(obj.ex) && Vec3.isValid(obj.ey) && Vec3.isValid(obj.ez);
    };
    Mat332.assert = function(o) {
    };
    Mat332.prototype.setZero = function() {
      this.ex.setZero();
      this.ey.setZero();
      this.ez.setZero();
      return this;
    };
    Mat332.prototype.solve33 = function(v3) {
      var cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
      var cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
      var cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
      var det = this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z;
      if (det !== 0) {
        det = 1 / det;
      }
      var r = new Vec3();
      cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
      cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
      cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
      r.x = det * (v3.x * cross_x + v3.y * cross_y + v3.z * cross_z);
      cross_x = v3.y * this.ez.z - v3.z * this.ez.y;
      cross_y = v3.z * this.ez.x - v3.x * this.ez.z;
      cross_z = v3.x * this.ez.y - v3.y * this.ez.x;
      r.y = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
      cross_x = this.ey.y * v3.z - this.ey.z * v3.y;
      cross_y = this.ey.z * v3.x - this.ey.x * v3.z;
      cross_z = this.ey.x * v3.y - this.ey.y * v3.x;
      r.z = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
      return r;
    };
    Mat332.prototype.solve22 = function(v3) {
      var a11 = this.ex.x;
      var a12 = this.ey.x;
      var a21 = this.ex.y;
      var a22 = this.ey.y;
      var det = a11 * a22 - a12 * a21;
      if (det !== 0) {
        det = 1 / det;
      }
      var r = Vec2.zero();
      r.x = det * (a22 * v3.x - a12 * v3.y);
      r.y = det * (a11 * v3.y - a21 * v3.x);
      return r;
    };
    Mat332.prototype.getInverse22 = function(M) {
      var a2 = this.ex.x;
      var b2 = this.ey.x;
      var c2 = this.ex.y;
      var d2 = this.ey.y;
      var det = a2 * d2 - b2 * c2;
      if (det !== 0) {
        det = 1 / det;
      }
      M.ex.x = det * d2;
      M.ey.x = -det * b2;
      M.ex.z = 0;
      M.ex.y = -det * c2;
      M.ey.y = det * a2;
      M.ey.z = 0;
      M.ez.x = 0;
      M.ez.y = 0;
      M.ez.z = 0;
    };
    Mat332.prototype.getSymInverse33 = function(M) {
      var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
      if (det !== 0) {
        det = 1 / det;
      }
      var a11 = this.ex.x;
      var a12 = this.ey.x;
      var a13 = this.ez.x;
      var a22 = this.ey.y;
      var a23 = this.ez.y;
      var a33 = this.ez.z;
      M.ex.x = det * (a22 * a33 - a23 * a23);
      M.ex.y = det * (a13 * a23 - a12 * a33);
      M.ex.z = det * (a12 * a23 - a13 * a22);
      M.ey.x = M.ex.y;
      M.ey.y = det * (a11 * a33 - a13 * a13);
      M.ey.z = det * (a13 * a12 - a11 * a23);
      M.ez.x = M.ex.z;
      M.ez.y = M.ey.z;
      M.ez.z = det * (a11 * a22 - a12 * a12);
    };
    Mat332.mul = function(a2, b2) {
      if (b2 && "z" in b2 && "y" in b2 && "x" in b2) {
        var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y + a2.ez.x * b2.z;
        var y = a2.ex.y * b2.x + a2.ey.y * b2.y + a2.ez.y * b2.z;
        var z = a2.ex.z * b2.x + a2.ey.z * b2.y + a2.ez.z * b2.z;
        return new Vec3(x2, y, z);
      } else if (b2 && "y" in b2 && "x" in b2) {
        var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y;
        var y = a2.ex.y * b2.x + a2.ey.y * b2.y;
        return Vec2.neo(x2, y);
      }
    };
    Mat332.mulVec3 = function(a2, b2) {
      var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y + a2.ez.x * b2.z;
      var y = a2.ex.y * b2.x + a2.ey.y * b2.y + a2.ez.y * b2.z;
      var z = a2.ex.z * b2.x + a2.ey.z * b2.y + a2.ez.z * b2.z;
      return new Vec3(x2, y, z);
    };
    Mat332.mulVec2 = function(a2, b2) {
      var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y;
      var y = a2.ex.y * b2.x + a2.ey.y * b2.y;
      return Vec2.neo(x2, y);
    };
    Mat332.add = function(a2, b2) {
      return new Mat332(Vec3.add(a2.ex, b2.ex), Vec3.add(a2.ey, b2.ey), Vec3.add(a2.ez, b2.ez));
    };
    return Mat332;
  }()
);
var math_abs$5 = Math.abs;
var LimitState$2;
(function(LimitState2) {
  LimitState2[LimitState2["inactiveLimit"] = 0] = "inactiveLimit";
  LimitState2[LimitState2["atLowerLimit"] = 1] = "atLowerLimit";
  LimitState2[LimitState2["atUpperLimit"] = 2] = "atUpperLimit";
  LimitState2[LimitState2["equalLimits"] = 3] = "equalLimits";
})(LimitState$2 || (LimitState$2 = {}));
var DEFAULTS$9 = {
  lowerAngle: 0,
  upperAngle: 0,
  maxMotorTorque: 0,
  motorSpeed: 0,
  enableLimit: false,
  enableMotor: false
};
var RevoluteJoint = (
  /** @class */
  function(_super) {
    __extends$1(RevoluteJoint2, _super);
    function RevoluteJoint2(def, bodyA, bodyB, anchor) {
      var _this = this;
      var _a2, _b, _c, _d, _e, _f;
      if (!(_this instanceof RevoluteJoint2)) {
        return new RevoluteJoint2(def, bodyA, bodyB, anchor);
      }
      def = def !== null && def !== void 0 ? def : {};
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_mass = new Mat33();
      _this.m_limitState = LimitState$2.inactiveLimit;
      _this.m_type = RevoluteJoint2.TYPE;
      if (Vec2.isValid(anchor)) {
        _this.m_localAnchorA = bodyA.getLocalPoint(anchor);
      } else if (Vec2.isValid(def.localAnchorA)) {
        _this.m_localAnchorA = Vec2.clone(def.localAnchorA);
      } else {
        _this.m_localAnchorA = Vec2.zero();
      }
      if (Vec2.isValid(anchor)) {
        _this.m_localAnchorB = bodyB.getLocalPoint(anchor);
      } else if (Vec2.isValid(def.localAnchorB)) {
        _this.m_localAnchorB = Vec2.clone(def.localAnchorB);
      } else {
        _this.m_localAnchorB = Vec2.zero();
      }
      if (Number.isFinite(def.referenceAngle)) {
        _this.m_referenceAngle = def.referenceAngle;
      } else {
        _this.m_referenceAngle = bodyB.getAngle() - bodyA.getAngle();
      }
      _this.m_impulse = new Vec3();
      _this.m_motorImpulse = 0;
      _this.m_lowerAngle = (_a2 = def.lowerAngle) !== null && _a2 !== void 0 ? _a2 : DEFAULTS$9.lowerAngle;
      _this.m_upperAngle = (_b = def.upperAngle) !== null && _b !== void 0 ? _b : DEFAULTS$9.upperAngle;
      _this.m_maxMotorTorque = (_c = def.maxMotorTorque) !== null && _c !== void 0 ? _c : DEFAULTS$9.maxMotorTorque;
      _this.m_motorSpeed = (_d = def.motorSpeed) !== null && _d !== void 0 ? _d : DEFAULTS$9.motorSpeed;
      _this.m_enableLimit = (_e = def.enableLimit) !== null && _e !== void 0 ? _e : DEFAULTS$9.enableLimit;
      _this.m_enableMotor = (_f = def.enableMotor) !== null && _f !== void 0 ? _f : DEFAULTS$9.enableMotor;
      return _this;
    }
    RevoluteJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        lowerAngle: this.m_lowerAngle,
        upperAngle: this.m_upperAngle,
        maxMotorTorque: this.m_maxMotorTorque,
        motorSpeed: this.m_motorSpeed,
        enableLimit: this.m_enableLimit,
        enableMotor: this.m_enableMotor,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB,
        referenceAngle: this.m_referenceAngle
      };
    };
    RevoluteJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new RevoluteJoint2(data);
      return joint;
    };
    RevoluteJoint2.prototype._reset = function(def) {
      if (def.anchorA) {
        this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
      } else if (def.localAnchorA) {
        this.m_localAnchorA.setVec2(def.localAnchorA);
      }
      if (def.anchorB) {
        this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
      } else if (def.localAnchorB) {
        this.m_localAnchorB.setVec2(def.localAnchorB);
      }
      if (Number.isFinite(def.referenceAngle)) {
        this.m_referenceAngle = def.referenceAngle;
      }
      if (def.enableLimit !== void 0) {
        this.m_enableLimit = def.enableLimit;
      }
      if (Number.isFinite(def.lowerAngle)) {
        this.m_lowerAngle = def.lowerAngle;
      }
      if (Number.isFinite(def.upperAngle)) {
        this.m_upperAngle = def.upperAngle;
      }
      if (Number.isFinite(def.maxMotorTorque)) {
        this.m_maxMotorTorque = def.maxMotorTorque;
      }
      if (Number.isFinite(def.motorSpeed)) {
        this.m_motorSpeed = def.motorSpeed;
      }
      if (def.enableMotor !== void 0) {
        this.m_enableMotor = def.enableMotor;
      }
    };
    RevoluteJoint2.prototype.getLocalAnchorA = function() {
      return this.m_localAnchorA;
    };
    RevoluteJoint2.prototype.getLocalAnchorB = function() {
      return this.m_localAnchorB;
    };
    RevoluteJoint2.prototype.getReferenceAngle = function() {
      return this.m_referenceAngle;
    };
    RevoluteJoint2.prototype.getJointAngle = function() {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
    };
    RevoluteJoint2.prototype.getJointSpeed = function() {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      return bB.m_angularVelocity - bA.m_angularVelocity;
    };
    RevoluteJoint2.prototype.isMotorEnabled = function() {
      return this.m_enableMotor;
    };
    RevoluteJoint2.prototype.enableMotor = function(flag) {
      if (flag == this.m_enableMotor)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_enableMotor = flag;
    };
    RevoluteJoint2.prototype.getMotorTorque = function(inv_dt) {
      return inv_dt * this.m_motorImpulse;
    };
    RevoluteJoint2.prototype.setMotorSpeed = function(speed) {
      if (speed == this.m_motorSpeed)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_motorSpeed = speed;
    };
    RevoluteJoint2.prototype.getMotorSpeed = function() {
      return this.m_motorSpeed;
    };
    RevoluteJoint2.prototype.setMaxMotorTorque = function(torque) {
      if (torque == this.m_maxMotorTorque)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_maxMotorTorque = torque;
    };
    RevoluteJoint2.prototype.getMaxMotorTorque = function() {
      return this.m_maxMotorTorque;
    };
    RevoluteJoint2.prototype.isLimitEnabled = function() {
      return this.m_enableLimit;
    };
    RevoluteJoint2.prototype.enableLimit = function(flag) {
      if (flag != this.m_enableLimit) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableLimit = flag;
        this.m_impulse.z = 0;
      }
    };
    RevoluteJoint2.prototype.getLowerLimit = function() {
      return this.m_lowerAngle;
    };
    RevoluteJoint2.prototype.getUpperLimit = function() {
      return this.m_upperAngle;
    };
    RevoluteJoint2.prototype.setLimits = function(lower, upper) {
      if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_impulse.z = 0;
        this.m_lowerAngle = lower;
        this.m_upperAngle = upper;
      }
    };
    RevoluteJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    RevoluteJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    RevoluteJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
    };
    RevoluteJoint2.prototype.getReactionTorque = function(inv_dt) {
      return inv_dt * this.m_impulse.z;
    };
    RevoluteJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var fixedRotation = iA + iB === 0;
      this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
      this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
      this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
      this.m_mass.ex.y = this.m_mass.ey.x;
      this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
      this.m_mass.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
      this.m_mass.ex.z = this.m_mass.ez.x;
      this.m_mass.ey.z = this.m_mass.ez.y;
      this.m_mass.ez.z = iA + iB;
      this.m_motorMass = iA + iB;
      if (this.m_motorMass > 0) {
        this.m_motorMass = 1 / this.m_motorMass;
      }
      if (this.m_enableMotor == false || fixedRotation) {
        this.m_motorImpulse = 0;
      }
      if (this.m_enableLimit && fixedRotation == false) {
        var jointAngle = aB - aA - this.m_referenceAngle;
        if (math_abs$5(this.m_upperAngle - this.m_lowerAngle) < 2 * SettingsInternal.angularSlop) {
          this.m_limitState = LimitState$2.equalLimits;
        } else if (jointAngle <= this.m_lowerAngle) {
          if (this.m_limitState != LimitState$2.atLowerLimit) {
            this.m_impulse.z = 0;
          }
          this.m_limitState = LimitState$2.atLowerLimit;
        } else if (jointAngle >= this.m_upperAngle) {
          if (this.m_limitState != LimitState$2.atUpperLimit) {
            this.m_impulse.z = 0;
          }
          this.m_limitState = LimitState$2.atUpperLimit;
        } else {
          this.m_limitState = LimitState$2.inactiveLimit;
          this.m_impulse.z = 0;
        }
      } else {
        this.m_limitState = LimitState$2.inactiveLimit;
      }
      if (step.warmStarting) {
        this.m_impulse.mul(step.dtRatio);
        this.m_motorImpulse *= step.dtRatio;
        var P3 = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
        vA2.subMul(mA, P3);
        wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_motorImpulse + this.m_impulse.z);
        vB2.addMul(mB, P3);
        wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_motorImpulse + this.m_impulse.z);
      } else {
        this.m_impulse.setZero();
        this.m_motorImpulse = 0;
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    RevoluteJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var fixedRotation = iA + iB === 0;
      if (this.m_enableMotor && this.m_limitState != LimitState$2.equalLimits && fixedRotation == false) {
        var Cdot = wB - wA - this.m_motorSpeed;
        var impulse = -this.m_motorMass * Cdot;
        var oldImpulse = this.m_motorImpulse;
        var maxImpulse = step.dt * this.m_maxMotorTorque;
        this.m_motorImpulse = clamp$1(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
      }
      if (this.m_enableLimit && this.m_limitState != LimitState$2.inactiveLimit && fixedRotation == false) {
        var Cdot1 = Vec2.zero();
        Cdot1.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
        Cdot1.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
        var Cdot2 = wB - wA;
        var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var impulse = Vec3.neg(this.m_mass.solve33(Cdot));
        if (this.m_limitState == LimitState$2.equalLimits) {
          this.m_impulse.add(impulse);
        } else if (this.m_limitState == LimitState$2.atLowerLimit) {
          var newImpulse = this.m_impulse.z + impulse.z;
          if (newImpulse < 0) {
            var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
            var reduced = this.m_mass.solve22(rhs);
            impulse.x = reduced.x;
            impulse.y = reduced.y;
            impulse.z = -this.m_impulse.z;
            this.m_impulse.x += reduced.x;
            this.m_impulse.y += reduced.y;
            this.m_impulse.z = 0;
          } else {
            this.m_impulse.add(impulse);
          }
        } else if (this.m_limitState == LimitState$2.atUpperLimit) {
          var newImpulse = this.m_impulse.z + impulse.z;
          if (newImpulse > 0) {
            var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
            var reduced = this.m_mass.solve22(rhs);
            impulse.x = reduced.x;
            impulse.y = reduced.y;
            impulse.z = -this.m_impulse.z;
            this.m_impulse.x += reduced.x;
            this.m_impulse.y += reduced.y;
            this.m_impulse.z = 0;
          } else {
            this.m_impulse.add(impulse);
          }
        }
        var P3 = Vec2.neo(impulse.x, impulse.y);
        vA2.subMul(mA, P3);
        wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + impulse.z);
        vB2.addMul(mB, P3);
        wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + impulse.z);
      } else {
        var Cdot = Vec2.zero();
        Cdot.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
        Cdot.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
        var impulse = this.m_mass.solve22(Vec2.neg(Cdot));
        this.m_impulse.x += impulse.x;
        this.m_impulse.y += impulse.y;
        vA2.subMul(mA, impulse);
        wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
        vB2.addMul(mB, impulse);
        wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    RevoluteJoint2.prototype.solvePositionConstraints = function(step) {
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var angularError = 0;
      var positionError = 0;
      var fixedRotation = this.m_invIA + this.m_invIB == 0;
      if (this.m_enableLimit && this.m_limitState != LimitState$2.inactiveLimit && fixedRotation == false) {
        var angle = aB - aA - this.m_referenceAngle;
        var limitImpulse = 0;
        if (this.m_limitState == LimitState$2.equalLimits) {
          var C = clamp$1(angle - this.m_lowerAngle, -SettingsInternal.maxAngularCorrection, SettingsInternal.maxAngularCorrection);
          limitImpulse = -this.m_motorMass * C;
          angularError = math_abs$5(C);
        } else if (this.m_limitState == LimitState$2.atLowerLimit) {
          var C = angle - this.m_lowerAngle;
          angularError = -C;
          C = clamp$1(C + SettingsInternal.angularSlop, -SettingsInternal.maxAngularCorrection, 0);
          limitImpulse = -this.m_motorMass * C;
        } else if (this.m_limitState == LimitState$2.atUpperLimit) {
          var C = angle - this.m_upperAngle;
          angularError = C;
          C = clamp$1(C - SettingsInternal.angularSlop, 0, SettingsInternal.maxAngularCorrection);
          limitImpulse = -this.m_motorMass * C;
        }
        aA -= this.m_invIA * limitImpulse;
        aB += this.m_invIB * limitImpulse;
      }
      {
        qA.setAngle(aA);
        qB.setAngle(aB);
        var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var C = Vec2.zero();
        C.addCombine(1, cB2, 1, rB2);
        C.subCombine(1, cA2, 1, rA2);
        positionError = C.length();
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var K = new Mat22();
        K.ex.x = mA + mB + iA * rA2.y * rA2.y + iB * rB2.y * rB2.y;
        K.ex.y = -iA * rA2.x * rA2.y - iB * rB2.x * rB2.y;
        K.ey.x = K.ex.y;
        K.ey.y = mA + mB + iA * rA2.x * rA2.x + iB * rB2.x * rB2.x;
        var impulse = Vec2.neg(K.solve(C));
        cA2.subMul(mA, impulse);
        aA -= iA * Vec2.crossVec2Vec2(rA2, impulse);
        cB2.addMul(mB, impulse);
        aB += iB * Vec2.crossVec2Vec2(rB2, impulse);
      }
      this.m_bodyA.c_position.c.setVec2(cA2);
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c.setVec2(cB2);
      this.m_bodyB.c_position.a = aB;
      return positionError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
    };
    RevoluteJoint2.TYPE = "revolute-joint";
    return RevoluteJoint2;
  }(Joint)
);
var math_abs$4 = Math.abs;
var math_max$3 = Math.max;
var math_min$7 = Math.min;
var LimitState$1;
(function(LimitState2) {
  LimitState2[LimitState2["inactiveLimit"] = 0] = "inactiveLimit";
  LimitState2[LimitState2["atLowerLimit"] = 1] = "atLowerLimit";
  LimitState2[LimitState2["atUpperLimit"] = 2] = "atUpperLimit";
  LimitState2[LimitState2["equalLimits"] = 3] = "equalLimits";
})(LimitState$1 || (LimitState$1 = {}));
var DEFAULTS$8 = {
  enableLimit: false,
  lowerTranslation: 0,
  upperTranslation: 0,
  enableMotor: false,
  maxMotorForce: 0,
  motorSpeed: 0
};
var PrismaticJoint = (
  /** @class */
  function(_super) {
    __extends$1(PrismaticJoint2, _super);
    function PrismaticJoint2(def, bodyA, bodyB, anchor, axis) {
      var _this = this;
      if (!(_this instanceof PrismaticJoint2)) {
        return new PrismaticJoint2(def, bodyA, bodyB, anchor, axis);
      }
      def = options(def, DEFAULTS$8);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = PrismaticJoint2.TYPE;
      _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
      _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
      _this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || Vec2.neo(1, 0));
      _this.m_localXAxisA.normalize();
      _this.m_localYAxisA = Vec2.crossNumVec2(1, _this.m_localXAxisA);
      _this.m_referenceAngle = Number.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
      _this.m_impulse = new Vec3();
      _this.m_motorMass = 0;
      _this.m_motorImpulse = 0;
      _this.m_lowerTranslation = def.lowerTranslation;
      _this.m_upperTranslation = def.upperTranslation;
      _this.m_maxMotorForce = def.maxMotorForce;
      _this.m_motorSpeed = def.motorSpeed;
      _this.m_enableLimit = def.enableLimit;
      _this.m_enableMotor = def.enableMotor;
      _this.m_limitState = LimitState$1.inactiveLimit;
      _this.m_axis = Vec2.zero();
      _this.m_perp = Vec2.zero();
      _this.m_K = new Mat33();
      return _this;
    }
    PrismaticJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        lowerTranslation: this.m_lowerTranslation,
        upperTranslation: this.m_upperTranslation,
        maxMotorForce: this.m_maxMotorForce,
        motorSpeed: this.m_motorSpeed,
        enableLimit: this.m_enableLimit,
        enableMotor: this.m_enableMotor,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB,
        localAxisA: this.m_localXAxisA,
        referenceAngle: this.m_referenceAngle
      };
    };
    PrismaticJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      data.localAxisA = Vec2.clone(data.localAxisA);
      var joint = new PrismaticJoint2(data);
      return joint;
    };
    PrismaticJoint2.prototype._reset = function(def) {
      if (def.anchorA) {
        this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
      } else if (def.localAnchorA) {
        this.m_localAnchorA.setVec2(def.localAnchorA);
      }
      if (def.anchorB) {
        this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
      } else if (def.localAnchorB) {
        this.m_localAnchorB.setVec2(def.localAnchorB);
      }
      if (def.localAxisA) {
        this.m_localXAxisA.setVec2(def.localAxisA);
        this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1, def.localAxisA));
      }
      if (Number.isFinite(def.referenceAngle)) {
        this.m_referenceAngle = def.referenceAngle;
      }
      if (typeof def.enableLimit !== "undefined") {
        this.m_enableLimit = !!def.enableLimit;
      }
      if (Number.isFinite(def.lowerTranslation)) {
        this.m_lowerTranslation = def.lowerTranslation;
      }
      if (Number.isFinite(def.upperTranslation)) {
        this.m_upperTranslation = def.upperTranslation;
      }
      if (typeof def.enableMotor !== "undefined") {
        this.m_enableMotor = !!def.enableMotor;
      }
      if (Number.isFinite(def.maxMotorForce)) {
        this.m_maxMotorForce = def.maxMotorForce;
      }
      if (Number.isFinite(def.motorSpeed)) {
        this.m_motorSpeed = def.motorSpeed;
      }
    };
    PrismaticJoint2.prototype.getLocalAnchorA = function() {
      return this.m_localAnchorA;
    };
    PrismaticJoint2.prototype.getLocalAnchorB = function() {
      return this.m_localAnchorB;
    };
    PrismaticJoint2.prototype.getLocalAxisA = function() {
      return this.m_localXAxisA;
    };
    PrismaticJoint2.prototype.getReferenceAngle = function() {
      return this.m_referenceAngle;
    };
    PrismaticJoint2.prototype.getJointTranslation = function() {
      var pA2 = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      var pB2 = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      var d2 = Vec2.sub(pB2, pA2);
      var axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);
      var translation2 = Vec2.dot(d2, axis);
      return translation2;
    };
    PrismaticJoint2.prototype.getJointSpeed = function() {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var rA2 = Rot.mulVec2(bA.m_xf.q, Vec2.sub(this.m_localAnchorA, bA.m_sweep.localCenter));
      var rB2 = Rot.mulVec2(bB.m_xf.q, Vec2.sub(this.m_localAnchorB, bB.m_sweep.localCenter));
      var p1 = Vec2.add(bA.m_sweep.c, rA2);
      var p2 = Vec2.add(bB.m_sweep.c, rB2);
      var d2 = Vec2.sub(p2, p1);
      var axis = Rot.mulVec2(bA.m_xf.q, this.m_localXAxisA);
      var vA2 = bA.m_linearVelocity;
      var vB2 = bB.m_linearVelocity;
      var wA = bA.m_angularVelocity;
      var wB = bB.m_angularVelocity;
      var speed = Vec2.dot(d2, Vec2.crossNumVec2(wA, axis)) + Vec2.dot(axis, Vec2.sub(Vec2.addCrossNumVec2(vB2, wB, rB2), Vec2.addCrossNumVec2(vA2, wA, rA2)));
      return speed;
    };
    PrismaticJoint2.prototype.isLimitEnabled = function() {
      return this.m_enableLimit;
    };
    PrismaticJoint2.prototype.enableLimit = function(flag) {
      if (flag != this.m_enableLimit) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableLimit = flag;
        this.m_impulse.z = 0;
      }
    };
    PrismaticJoint2.prototype.getLowerLimit = function() {
      return this.m_lowerTranslation;
    };
    PrismaticJoint2.prototype.getUpperLimit = function() {
      return this.m_upperTranslation;
    };
    PrismaticJoint2.prototype.setLimits = function(lower, upper) {
      if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_lowerTranslation = lower;
        this.m_upperTranslation = upper;
        this.m_impulse.z = 0;
      }
    };
    PrismaticJoint2.prototype.isMotorEnabled = function() {
      return this.m_enableMotor;
    };
    PrismaticJoint2.prototype.enableMotor = function(flag) {
      if (flag == this.m_enableMotor)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_enableMotor = flag;
    };
    PrismaticJoint2.prototype.setMotorSpeed = function(speed) {
      if (speed == this.m_motorSpeed)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_motorSpeed = speed;
    };
    PrismaticJoint2.prototype.setMaxMotorForce = function(force) {
      if (force == this.m_maxMotorForce)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_maxMotorForce = force;
    };
    PrismaticJoint2.prototype.getMaxMotorForce = function() {
      return this.m_maxMotorForce;
    };
    PrismaticJoint2.prototype.getMotorSpeed = function() {
      return this.m_motorSpeed;
    };
    PrismaticJoint2.prototype.getMotorForce = function(inv_dt) {
      return inv_dt * this.m_motorImpulse;
    };
    PrismaticJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    PrismaticJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    PrismaticJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis).mul(inv_dt);
    };
    PrismaticJoint2.prototype.getReactionTorque = function(inv_dt) {
      return inv_dt * this.m_impulse.y;
    };
    PrismaticJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var d2 = Vec2.zero();
      d2.addCombine(1, cB2, 1, rB2);
      d2.subCombine(1, cA2, 1, rA2);
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      {
        this.m_axis = Rot.mulVec2(qA, this.m_localXAxisA);
        this.m_a1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_axis);
        this.m_a2 = Vec2.crossVec2Vec2(rB2, this.m_axis);
        this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
        if (this.m_motorMass > 0) {
          this.m_motorMass = 1 / this.m_motorMass;
        }
      }
      {
        this.m_perp = Rot.mulVec2(qA, this.m_localYAxisA);
        this.m_s1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_perp);
        this.m_s2 = Vec2.crossVec2Vec2(rB2, this.m_perp);
        Vec2.crossVec2Vec2(rA2, this.m_perp);
        var k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
        var k12 = iA * this.m_s1 + iB * this.m_s2;
        var k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
        var k22 = iA + iB;
        if (k22 == 0) {
          k22 = 1;
        }
        var k23 = iA * this.m_a1 + iB * this.m_a2;
        var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
        this.m_K.ex.set(k11, k12, k13);
        this.m_K.ey.set(k12, k22, k23);
        this.m_K.ez.set(k13, k23, k33);
      }
      if (this.m_enableLimit) {
        var jointTranslation = Vec2.dot(this.m_axis, d2);
        if (math_abs$4(this.m_upperTranslation - this.m_lowerTranslation) < 2 * SettingsInternal.linearSlop) {
          this.m_limitState = LimitState$1.equalLimits;
        } else if (jointTranslation <= this.m_lowerTranslation) {
          if (this.m_limitState != LimitState$1.atLowerLimit) {
            this.m_limitState = LimitState$1.atLowerLimit;
            this.m_impulse.z = 0;
          }
        } else if (jointTranslation >= this.m_upperTranslation) {
          if (this.m_limitState != LimitState$1.atUpperLimit) {
            this.m_limitState = LimitState$1.atUpperLimit;
            this.m_impulse.z = 0;
          }
        } else {
          this.m_limitState = LimitState$1.inactiveLimit;
          this.m_impulse.z = 0;
        }
      } else {
        this.m_limitState = LimitState$1.inactiveLimit;
        this.m_impulse.z = 0;
      }
      if (this.m_enableMotor == false) {
        this.m_motorImpulse = 0;
      }
      if (step.warmStarting) {
        this.m_impulse.mul(step.dtRatio);
        this.m_motorImpulse *= step.dtRatio;
        var P3 = Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis);
        var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
        var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
        vA2.subMul(mA, P3);
        wA -= iA * LA;
        vB2.addMul(mB, P3);
        wB += iB * LB;
      } else {
        this.m_impulse.setZero();
        this.m_motorImpulse = 0;
      }
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
    };
    PrismaticJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      if (this.m_enableMotor && this.m_limitState != LimitState$1.equalLimits) {
        var Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB2, vA2)) + this.m_a2 * wB - this.m_a1 * wA;
        var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
        var oldImpulse = this.m_motorImpulse;
        var maxImpulse = step.dt * this.m_maxMotorForce;
        this.m_motorImpulse = clamp$1(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        var P3 = Vec2.mulNumVec2(impulse, this.m_axis);
        var LA = impulse * this.m_a1;
        var LB = impulse * this.m_a2;
        vA2.subMul(mA, P3);
        wA -= iA * LA;
        vB2.addMul(mB, P3);
        wB += iB * LB;
      }
      var Cdot1 = Vec2.zero();
      Cdot1.x += Vec2.dot(this.m_perp, vB2) + this.m_s2 * wB;
      Cdot1.x -= Vec2.dot(this.m_perp, vA2) + this.m_s1 * wA;
      Cdot1.y = wB - wA;
      if (this.m_enableLimit && this.m_limitState != LimitState$1.inactiveLimit) {
        var Cdot2 = 0;
        Cdot2 += Vec2.dot(this.m_axis, vB2) + this.m_a2 * wB;
        Cdot2 -= Vec2.dot(this.m_axis, vA2) + this.m_a1 * wA;
        var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var f1 = Vec3.clone(this.m_impulse);
        var df = this.m_K.solve33(Vec3.neg(Cdot));
        this.m_impulse.add(df);
        if (this.m_limitState == LimitState$1.atLowerLimit) {
          this.m_impulse.z = math_max$3(this.m_impulse.z, 0);
        } else if (this.m_limitState == LimitState$1.atUpperLimit) {
          this.m_impulse.z = math_min$7(this.m_impulse.z, 0);
        }
        var b2 = Vec2.combine(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y));
        var f2r = Vec2.add(this.m_K.solve22(b2), Vec2.neo(f1.x, f1.y));
        this.m_impulse.x = f2r.x;
        this.m_impulse.y = f2r.y;
        df = Vec3.sub(this.m_impulse, f1);
        var P3 = Vec2.combine(df.x, this.m_perp, df.z, this.m_axis);
        var LA = df.x * this.m_s1 + df.y + df.z * this.m_a1;
        var LB = df.x * this.m_s2 + df.y + df.z * this.m_a2;
        vA2.subMul(mA, P3);
        wA -= iA * LA;
        vB2.addMul(mB, P3);
        wB += iB * LB;
      } else {
        var df = this.m_K.solve22(Vec2.neg(Cdot1));
        this.m_impulse.x += df.x;
        this.m_impulse.y += df.y;
        var P3 = Vec2.mulNumVec2(df.x, this.m_perp);
        var LA = df.x * this.m_s1 + df.y;
        var LB = df.x * this.m_s2 + df.y;
        vA2.subMul(mA, P3);
        wA -= iA * LA;
        vB2.addMul(mB, P3);
        wB += iB * LB;
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    PrismaticJoint2.prototype.solvePositionConstraints = function(step) {
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var d2 = Vec2.sub(Vec2.add(cB2, rB2), Vec2.add(cA2, rA2));
      var axis = Rot.mulVec2(qA, this.m_localXAxisA);
      var a1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), axis);
      var a2 = Vec2.crossVec2Vec2(rB2, axis);
      var perp2 = Rot.mulVec2(qA, this.m_localYAxisA);
      var s1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), perp2);
      var s2 = Vec2.crossVec2Vec2(rB2, perp2);
      var impulse = new Vec3();
      var C1 = Vec2.zero();
      C1.x = Vec2.dot(perp2, d2);
      C1.y = aB - aA - this.m_referenceAngle;
      var linearError = math_abs$4(C1.x);
      var angularError = math_abs$4(C1.y);
      var linearSlop = SettingsInternal.linearSlop;
      var maxLinearCorrection = SettingsInternal.maxLinearCorrection;
      var active = false;
      var C2 = 0;
      if (this.m_enableLimit) {
        var translation2 = Vec2.dot(axis, d2);
        if (math_abs$4(this.m_upperTranslation - this.m_lowerTranslation) < 2 * linearSlop) {
          C2 = clamp$1(translation2, -maxLinearCorrection, maxLinearCorrection);
          linearError = math_max$3(linearError, math_abs$4(translation2));
          active = true;
        } else if (translation2 <= this.m_lowerTranslation) {
          C2 = clamp$1(translation2 - this.m_lowerTranslation + linearSlop, -maxLinearCorrection, 0);
          linearError = Math.max(linearError, this.m_lowerTranslation - translation2);
          active = true;
        } else if (translation2 >= this.m_upperTranslation) {
          C2 = clamp$1(translation2 - this.m_upperTranslation - linearSlop, 0, maxLinearCorrection);
          linearError = Math.max(linearError, translation2 - this.m_upperTranslation);
          active = true;
        }
      }
      if (active) {
        var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
        var k12 = iA * s1 + iB * s2;
        var k13 = iA * s1 * a1 + iB * s2 * a2;
        var k22 = iA + iB;
        if (k22 == 0) {
          k22 = 1;
        }
        var k23 = iA * a1 + iB * a2;
        var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
        var K = new Mat33();
        K.ex.set(k11, k12, k13);
        K.ey.set(k12, k22, k23);
        K.ez.set(k13, k23, k33);
        var C = new Vec3();
        C.x = C1.x;
        C.y = C1.y;
        C.z = C2;
        impulse = K.solve33(Vec3.neg(C));
      } else {
        var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
        var k12 = iA * s1 + iB * s2;
        var k22 = iA + iB;
        if (k22 == 0) {
          k22 = 1;
        }
        var K = new Mat22();
        K.ex.setNum(k11, k12);
        K.ey.setNum(k12, k22);
        var impulse1 = K.solve(Vec2.neg(C1));
        impulse.x = impulse1.x;
        impulse.y = impulse1.y;
        impulse.z = 0;
      }
      var P3 = Vec2.combine(impulse.x, perp2, impulse.z, axis);
      var LA = impulse.x * s1 + impulse.y + impulse.z * a1;
      var LB = impulse.x * s2 + impulse.y + impulse.z * a2;
      cA2.subMul(mA, P3);
      aA -= iA * LA;
      cB2.addMul(mB, P3);
      aB += iB * LB;
      this.m_bodyA.c_position.c = cA2;
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c = cB2;
      this.m_bodyB.c_position.a = aB;
      return linearError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
    };
    PrismaticJoint2.TYPE = "prismatic-joint";
    return PrismaticJoint2;
  }(Joint)
);
var DEFAULTS$7 = {
  ratio: 1
};
var GearJoint = (
  /** @class */
  function(_super) {
    __extends$1(GearJoint2, _super);
    function GearJoint2(def, bodyA, bodyB, joint1, joint2, ratio) {
      var _this = this;
      if (!(_this instanceof GearJoint2)) {
        return new GearJoint2(def, bodyA, bodyB, joint1, joint2, ratio);
      }
      def = options(def, DEFAULTS$7);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = GearJoint2.TYPE;
      _this.m_joint1 = joint1 ? joint1 : def.joint1;
      _this.m_joint2 = joint2 ? joint2 : def.joint2;
      _this.m_ratio = Number.isFinite(ratio) ? ratio : def.ratio;
      _this.m_type1 = _this.m_joint1.getType();
      _this.m_type2 = _this.m_joint2.getType();
      var coordinateA;
      var coordinateB;
      _this.m_bodyC = _this.m_joint1.getBodyA();
      _this.m_bodyA = _this.m_joint1.getBodyB();
      var xfA2 = _this.m_bodyA.m_xf;
      var aA = _this.m_bodyA.m_sweep.a;
      var xfC = _this.m_bodyC.m_xf;
      var aC = _this.m_bodyC.m_sweep.a;
      if (_this.m_type1 === RevoluteJoint.TYPE) {
        var revolute = _this.m_joint1;
        _this.m_localAnchorC = revolute.m_localAnchorA;
        _this.m_localAnchorA = revolute.m_localAnchorB;
        _this.m_referenceAngleA = revolute.m_referenceAngle;
        _this.m_localAxisC = Vec2.zero();
        coordinateA = aA - aC - _this.m_referenceAngleA;
      } else {
        var prismatic = _this.m_joint1;
        _this.m_localAnchorC = prismatic.m_localAnchorA;
        _this.m_localAnchorA = prismatic.m_localAnchorB;
        _this.m_referenceAngleA = prismatic.m_referenceAngle;
        _this.m_localAxisC = prismatic.m_localXAxisA;
        var pC = _this.m_localAnchorC;
        var pA2 = Rot.mulTVec2(xfC.q, Vec2.add(Rot.mulVec2(xfA2.q, _this.m_localAnchorA), Vec2.sub(xfA2.p, xfC.p)));
        coordinateA = Vec2.dot(pA2, _this.m_localAxisC) - Vec2.dot(pC, _this.m_localAxisC);
      }
      _this.m_bodyD = _this.m_joint2.getBodyA();
      _this.m_bodyB = _this.m_joint2.getBodyB();
      var xfB2 = _this.m_bodyB.m_xf;
      var aB = _this.m_bodyB.m_sweep.a;
      var xfD = _this.m_bodyD.m_xf;
      var aD = _this.m_bodyD.m_sweep.a;
      if (_this.m_type2 === RevoluteJoint.TYPE) {
        var revolute = _this.m_joint2;
        _this.m_localAnchorD = revolute.m_localAnchorA;
        _this.m_localAnchorB = revolute.m_localAnchorB;
        _this.m_referenceAngleB = revolute.m_referenceAngle;
        _this.m_localAxisD = Vec2.zero();
        coordinateB = aB - aD - _this.m_referenceAngleB;
      } else {
        var prismatic = _this.m_joint2;
        _this.m_localAnchorD = prismatic.m_localAnchorA;
        _this.m_localAnchorB = prismatic.m_localAnchorB;
        _this.m_referenceAngleB = prismatic.m_referenceAngle;
        _this.m_localAxisD = prismatic.m_localXAxisA;
        var pD = _this.m_localAnchorD;
        var pB2 = Rot.mulTVec2(xfD.q, Vec2.add(Rot.mulVec2(xfB2.q, _this.m_localAnchorB), Vec2.sub(xfB2.p, xfD.p)));
        coordinateB = Vec2.dot(pB2, _this.m_localAxisD) - Vec2.dot(pD, _this.m_localAxisD);
      }
      _this.m_constant = coordinateA + _this.m_ratio * coordinateB;
      _this.m_impulse = 0;
      return _this;
    }
    GearJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        joint1: this.m_joint1,
        joint2: this.m_joint2,
        ratio: this.m_ratio
        // _constant: this.m_constant,
      };
    };
    GearJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      data.joint1 = restore(Joint, data.joint1, world);
      data.joint2 = restore(Joint, data.joint2, world);
      var joint = new GearJoint2(data);
      return joint;
    };
    GearJoint2.prototype._reset = function(def) {
      if (Number.isFinite(def.ratio)) {
        this.m_ratio = def.ratio;
      }
    };
    GearJoint2.prototype.getJoint1 = function() {
      return this.m_joint1;
    };
    GearJoint2.prototype.getJoint2 = function() {
      return this.m_joint2;
    };
    GearJoint2.prototype.setRatio = function(ratio) {
      this.m_ratio = ratio;
    };
    GearJoint2.prototype.getRatio = function() {
      return this.m_ratio;
    };
    GearJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    GearJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    GearJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.mulNumVec2(this.m_impulse, this.m_JvAC).mul(inv_dt);
    };
    GearJoint2.prototype.getReactionTorque = function(inv_dt) {
      var L = this.m_impulse * this.m_JwA;
      return inv_dt * L;
    };
    GearJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_lcA = this.m_bodyA.m_sweep.localCenter;
      this.m_lcB = this.m_bodyB.m_sweep.localCenter;
      this.m_lcC = this.m_bodyC.m_sweep.localCenter;
      this.m_lcD = this.m_bodyD.m_sweep.localCenter;
      this.m_mA = this.m_bodyA.m_invMass;
      this.m_mB = this.m_bodyB.m_invMass;
      this.m_mC = this.m_bodyC.m_invMass;
      this.m_mD = this.m_bodyD.m_invMass;
      this.m_iA = this.m_bodyA.m_invI;
      this.m_iB = this.m_bodyB.m_invI;
      this.m_iC = this.m_bodyC.m_invI;
      this.m_iD = this.m_bodyD.m_invI;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var aC = this.m_bodyC.c_position.a;
      var vC = this.m_bodyC.c_velocity.v;
      var wC = this.m_bodyC.c_velocity.w;
      var aD = this.m_bodyD.c_position.a;
      var vD = this.m_bodyD.c_velocity.v;
      var wD = this.m_bodyD.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var qC = Rot.neo(aC);
      var qD = Rot.neo(aD);
      this.m_mass = 0;
      if (this.m_type1 == RevoluteJoint.TYPE) {
        this.m_JvAC = Vec2.zero();
        this.m_JwA = 1;
        this.m_JwC = 1;
        this.m_mass += this.m_iA + this.m_iC;
      } else {
        var u = Rot.mulVec2(qC, this.m_localAxisC);
        var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
        var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
        this.m_JvAC = u;
        this.m_JwC = Vec2.crossVec2Vec2(rC, u);
        this.m_JwA = Vec2.crossVec2Vec2(rA2, u);
        this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
      }
      if (this.m_type2 == RevoluteJoint.TYPE) {
        this.m_JvBD = Vec2.zero();
        this.m_JwB = this.m_ratio;
        this.m_JwD = this.m_ratio;
        this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
      } else {
        var u = Rot.mulVec2(qD, this.m_localAxisD);
        var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
        var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
        this.m_JvBD = Vec2.mulNumVec2(this.m_ratio, u);
        this.m_JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
        this.m_JwB = this.m_ratio * Vec2.crossVec2Vec2(rB2, u);
        this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
      }
      this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0;
      if (step.warmStarting) {
        vA2.addMul(this.m_mA * this.m_impulse, this.m_JvAC);
        wA += this.m_iA * this.m_impulse * this.m_JwA;
        vB2.addMul(this.m_mB * this.m_impulse, this.m_JvBD);
        wB += this.m_iB * this.m_impulse * this.m_JwB;
        vC.subMul(this.m_mC * this.m_impulse, this.m_JvAC);
        wC -= this.m_iC * this.m_impulse * this.m_JwC;
        vD.subMul(this.m_mD * this.m_impulse, this.m_JvBD);
        wD -= this.m_iD * this.m_impulse * this.m_JwD;
      } else {
        this.m_impulse = 0;
      }
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
      this.m_bodyC.c_velocity.v.setVec2(vC);
      this.m_bodyC.c_velocity.w = wC;
      this.m_bodyD.c_velocity.v.setVec2(vD);
      this.m_bodyD.c_velocity.w = wD;
    };
    GearJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var vC = this.m_bodyC.c_velocity.v;
      var wC = this.m_bodyC.c_velocity.w;
      var vD = this.m_bodyD.c_velocity.v;
      var wD = this.m_bodyD.c_velocity.w;
      var Cdot = Vec2.dot(this.m_JvAC, vA2) - Vec2.dot(this.m_JvAC, vC) + Vec2.dot(this.m_JvBD, vB2) - Vec2.dot(this.m_JvBD, vD);
      Cdot += this.m_JwA * wA - this.m_JwC * wC + (this.m_JwB * wB - this.m_JwD * wD);
      var impulse = -this.m_mass * Cdot;
      this.m_impulse += impulse;
      vA2.addMul(this.m_mA * impulse, this.m_JvAC);
      wA += this.m_iA * impulse * this.m_JwA;
      vB2.addMul(this.m_mB * impulse, this.m_JvBD);
      wB += this.m_iB * impulse * this.m_JwB;
      vC.subMul(this.m_mC * impulse, this.m_JvAC);
      wC -= this.m_iC * impulse * this.m_JwC;
      vD.subMul(this.m_mD * impulse, this.m_JvBD);
      wD -= this.m_iD * impulse * this.m_JwD;
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
      this.m_bodyC.c_velocity.v.setVec2(vC);
      this.m_bodyC.c_velocity.w = wC;
      this.m_bodyD.c_velocity.v.setVec2(vD);
      this.m_bodyD.c_velocity.w = wD;
    };
    GearJoint2.prototype.solvePositionConstraints = function(step) {
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var cC = this.m_bodyC.c_position.c;
      var aC = this.m_bodyC.c_position.a;
      var cD = this.m_bodyD.c_position.c;
      var aD = this.m_bodyD.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var qC = Rot.neo(aC);
      var qD = Rot.neo(aD);
      var linearError = 0;
      var coordinateA;
      var coordinateB;
      var JvAC;
      var JvBD;
      var JwA;
      var JwB;
      var JwC;
      var JwD;
      var mass = 0;
      if (this.m_type1 == RevoluteJoint.TYPE) {
        JvAC = Vec2.zero();
        JwA = 1;
        JwC = 1;
        mass += this.m_iA + this.m_iC;
        coordinateA = aA - aC - this.m_referenceAngleA;
      } else {
        var u = Rot.mulVec2(qC, this.m_localAxisC);
        var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
        var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
        JvAC = u;
        JwC = Vec2.crossVec2Vec2(rC, u);
        JwA = Vec2.crossVec2Vec2(rA2, u);
        mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
        var pC = Vec2.sub(this.m_localAnchorC, this.m_lcC);
        var pA2 = Rot.mulTVec2(qC, Vec2.add(rA2, Vec2.sub(cA2, cC)));
        coordinateA = Vec2.dot(Vec2.sub(pA2, pC), this.m_localAxisC);
      }
      if (this.m_type2 == RevoluteJoint.TYPE) {
        JvBD = Vec2.zero();
        JwB = this.m_ratio;
        JwD = this.m_ratio;
        mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
        coordinateB = aB - aD - this.m_referenceAngleB;
      } else {
        var u = Rot.mulVec2(qD, this.m_localAxisD);
        var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
        var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
        JvBD = Vec2.mulNumVec2(this.m_ratio, u);
        JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
        JwB = this.m_ratio * Vec2.crossVec2Vec2(rB2, u);
        mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;
        var pD = Vec2.sub(this.m_localAnchorD, this.m_lcD);
        var pB2 = Rot.mulTVec2(qD, Vec2.add(rB2, Vec2.sub(cB2, cD)));
        coordinateB = Vec2.dot(pB2, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
      }
      var C = coordinateA + this.m_ratio * coordinateB - this.m_constant;
      var impulse = 0;
      if (mass > 0) {
        impulse = -C / mass;
      }
      cA2.addMul(this.m_mA * impulse, JvAC);
      aA += this.m_iA * impulse * JwA;
      cB2.addMul(this.m_mB * impulse, JvBD);
      aB += this.m_iB * impulse * JwB;
      cC.subMul(this.m_mC * impulse, JvAC);
      aC -= this.m_iC * impulse * JwC;
      cD.subMul(this.m_mD * impulse, JvBD);
      aD -= this.m_iD * impulse * JwD;
      this.m_bodyA.c_position.c.setVec2(cA2);
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c.setVec2(cB2);
      this.m_bodyB.c_position.a = aB;
      this.m_bodyC.c_position.c.setVec2(cC);
      this.m_bodyC.c_position.a = aC;
      this.m_bodyD.c_position.c.setVec2(cD);
      this.m_bodyD.c_position.a = aD;
      return linearError < SettingsInternal.linearSlop;
    };
    GearJoint2.TYPE = "gear-joint";
    return GearJoint2;
  }(Joint)
);
var DEFAULTS$6 = {
  maxForce: 1,
  maxTorque: 1,
  correctionFactor: 0.3
};
var MotorJoint = (
  /** @class */
  function(_super) {
    __extends$1(MotorJoint2, _super);
    function MotorJoint2(def, bodyA, bodyB) {
      var _this = this;
      if (!(_this instanceof MotorJoint2)) {
        return new MotorJoint2(def, bodyA, bodyB);
      }
      def = options(def, DEFAULTS$6);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = MotorJoint2.TYPE;
      _this.m_linearOffset = Vec2.isValid(def.linearOffset) ? Vec2.clone(def.linearOffset) : bodyA.getLocalPoint(bodyB.getPosition());
      _this.m_angularOffset = Number.isFinite(def.angularOffset) ? def.angularOffset : bodyB.getAngle() - bodyA.getAngle();
      _this.m_linearImpulse = Vec2.zero();
      _this.m_angularImpulse = 0;
      _this.m_maxForce = def.maxForce;
      _this.m_maxTorque = def.maxTorque;
      _this.m_correctionFactor = def.correctionFactor;
      return _this;
    }
    MotorJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        maxForce: this.m_maxForce,
        maxTorque: this.m_maxTorque,
        correctionFactor: this.m_correctionFactor,
        linearOffset: this.m_linearOffset,
        angularOffset: this.m_angularOffset
      };
    };
    MotorJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new MotorJoint2(data);
      return joint;
    };
    MotorJoint2.prototype._reset = function(def) {
      if (Number.isFinite(def.angularOffset)) {
        this.m_angularOffset = def.angularOffset;
      }
      if (Number.isFinite(def.maxForce)) {
        this.m_maxForce = def.maxForce;
      }
      if (Number.isFinite(def.maxTorque)) {
        this.m_maxTorque = def.maxTorque;
      }
      if (Number.isFinite(def.correctionFactor)) {
        this.m_correctionFactor = def.correctionFactor;
      }
      if (Vec2.isValid(def.linearOffset)) {
        this.m_linearOffset.set(def.linearOffset);
      }
    };
    MotorJoint2.prototype.setMaxForce = function(force) {
      this.m_maxForce = force;
    };
    MotorJoint2.prototype.getMaxForce = function() {
      return this.m_maxForce;
    };
    MotorJoint2.prototype.setMaxTorque = function(torque) {
      this.m_maxTorque = torque;
    };
    MotorJoint2.prototype.getMaxTorque = function() {
      return this.m_maxTorque;
    };
    MotorJoint2.prototype.setCorrectionFactor = function(factor) {
      this.m_correctionFactor = factor;
    };
    MotorJoint2.prototype.getCorrectionFactor = function() {
      return this.m_correctionFactor;
    };
    MotorJoint2.prototype.setLinearOffset = function(linearOffset) {
      if (linearOffset.x != this.m_linearOffset.x || linearOffset.y != this.m_linearOffset.y) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_linearOffset.set(linearOffset);
      }
    };
    MotorJoint2.prototype.getLinearOffset = function() {
      return this.m_linearOffset;
    };
    MotorJoint2.prototype.setAngularOffset = function(angularOffset) {
      if (angularOffset != this.m_angularOffset) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_angularOffset = angularOffset;
      }
    };
    MotorJoint2.prototype.getAngularOffset = function() {
      return this.m_angularOffset;
    };
    MotorJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getPosition();
    };
    MotorJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getPosition();
    };
    MotorJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
    };
    MotorJoint2.prototype.getReactionTorque = function(inv_dt) {
      return inv_dt * this.m_angularImpulse;
    };
    MotorJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_linearOffset, this.m_localCenterA));
      this.m_rB = Rot.mulVec2(qB, Vec2.neg(this.m_localCenterB));
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var K = new Mat22();
      K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
      K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
      K.ey.x = K.ex.y;
      K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
      this.m_linearMass = K.getInverse();
      this.m_angularMass = iA + iB;
      if (this.m_angularMass > 0) {
        this.m_angularMass = 1 / this.m_angularMass;
      }
      this.m_linearError = Vec2.zero();
      this.m_linearError.addCombine(1, cB2, 1, this.m_rB);
      this.m_linearError.subCombine(1, cA2, 1, this.m_rA);
      this.m_angularError = aB - aA - this.m_angularOffset;
      if (step.warmStarting) {
        this.m_linearImpulse.mul(step.dtRatio);
        this.m_angularImpulse *= step.dtRatio;
        var P3 = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
        vA2.subMul(mA, P3);
        wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_angularImpulse);
        vB2.addMul(mB, P3);
        wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_angularImpulse);
      } else {
        this.m_linearImpulse.setZero();
        this.m_angularImpulse = 0;
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    MotorJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var h = step.dt;
      var inv_h = step.inv_dt;
      {
        var Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
        var impulse = -this.m_angularMass * Cdot;
        var oldImpulse = this.m_angularImpulse;
        var maxImpulse = h * this.m_maxTorque;
        this.m_angularImpulse = clamp$1(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_angularImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
      }
      {
        var Cdot = Vec2.zero();
        Cdot.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
        Cdot.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
        Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);
        var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
        var oldImpulse = Vec2.clone(this.m_linearImpulse);
        this.m_linearImpulse.add(impulse);
        var maxImpulse = h * this.m_maxForce;
        this.m_linearImpulse.clamp(maxImpulse);
        impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
        vA2.subMul(mA, impulse);
        wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
        vB2.addMul(mB, impulse);
        wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    MotorJoint2.prototype.solvePositionConstraints = function(step) {
      return true;
    };
    MotorJoint2.TYPE = "motor-joint";
    return MotorJoint2;
  }(Joint)
);
var math_PI$4 = Math.PI;
var DEFAULTS$5 = {
  maxForce: 0,
  frequencyHz: 5,
  dampingRatio: 0.7
};
var MouseJoint = (
  /** @class */
  function(_super) {
    __extends$1(MouseJoint2, _super);
    function MouseJoint2(def, bodyA, bodyB, target) {
      var _this = this;
      if (!(_this instanceof MouseJoint2)) {
        return new MouseJoint2(def, bodyA, bodyB, target);
      }
      def = options(def, DEFAULTS$5);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = MouseJoint2.TYPE;
      if (Vec2.isValid(target)) {
        _this.m_targetA = Vec2.clone(target);
      } else if (Vec2.isValid(def.target)) {
        _this.m_targetA = Vec2.clone(def.target);
      } else {
        _this.m_targetA = Vec2.zero();
      }
      _this.m_localAnchorB = Transform.mulTVec2(bodyB.getTransform(), _this.m_targetA);
      _this.m_maxForce = def.maxForce;
      _this.m_impulse = Vec2.zero();
      _this.m_frequencyHz = def.frequencyHz;
      _this.m_dampingRatio = def.dampingRatio;
      _this.m_beta = 0;
      _this.m_gamma = 0;
      _this.m_rB = Vec2.zero();
      _this.m_localCenterB = Vec2.zero();
      _this.m_invMassB = 0;
      _this.m_invIB = 0;
      _this.m_mass = new Mat22();
      _this.m_C = Vec2.zero();
      return _this;
    }
    MouseJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        target: this.m_targetA,
        maxForce: this.m_maxForce,
        frequencyHz: this.m_frequencyHz,
        dampingRatio: this.m_dampingRatio,
        _localAnchorB: this.m_localAnchorB
      };
    };
    MouseJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      data.target = Vec2.clone(data.target);
      var joint = new MouseJoint2(data);
      if (data._localAnchorB) {
        joint.m_localAnchorB = data._localAnchorB;
      }
      return joint;
    };
    MouseJoint2.prototype._reset = function(def) {
      if (Number.isFinite(def.maxForce)) {
        this.m_maxForce = def.maxForce;
      }
      if (Number.isFinite(def.frequencyHz)) {
        this.m_frequencyHz = def.frequencyHz;
      }
      if (Number.isFinite(def.dampingRatio)) {
        this.m_dampingRatio = def.dampingRatio;
      }
    };
    MouseJoint2.prototype.setTarget = function(target) {
      if (Vec2.areEqual(target, this.m_targetA))
        return;
      this.m_bodyB.setAwake(true);
      this.m_targetA.set(target);
    };
    MouseJoint2.prototype.getTarget = function() {
      return this.m_targetA;
    };
    MouseJoint2.prototype.setMaxForce = function(force) {
      this.m_maxForce = force;
    };
    MouseJoint2.prototype.getMaxForce = function() {
      return this.m_maxForce;
    };
    MouseJoint2.prototype.setFrequency = function(hz) {
      this.m_frequencyHz = hz;
    };
    MouseJoint2.prototype.getFrequency = function() {
      return this.m_frequencyHz;
    };
    MouseJoint2.prototype.setDampingRatio = function(ratio) {
      this.m_dampingRatio = ratio;
    };
    MouseJoint2.prototype.getDampingRatio = function() {
      return this.m_dampingRatio;
    };
    MouseJoint2.prototype.getAnchorA = function() {
      return Vec2.clone(this.m_targetA);
    };
    MouseJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    MouseJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.mulNumVec2(inv_dt, this.m_impulse);
    };
    MouseJoint2.prototype.getReactionTorque = function(inv_dt) {
      return inv_dt * 0;
    };
    MouseJoint2.prototype.shiftOrigin = function(newOrigin) {
      this.m_targetA.sub(newOrigin);
    };
    MouseJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIB = this.m_bodyB.m_invI;
      var position = this.m_bodyB.c_position;
      var velocity = this.m_bodyB.c_velocity;
      var cB2 = position.c;
      var aB = position.a;
      var vB2 = velocity.v;
      var wB = velocity.w;
      var qB = Rot.neo(aB);
      var mass = this.m_bodyB.getMass();
      var omega = 2 * math_PI$4 * this.m_frequencyHz;
      var d2 = 2 * mass * this.m_dampingRatio * omega;
      var k = mass * (omega * omega);
      var h = step.dt;
      this.m_gamma = h * (d2 + h * k);
      if (this.m_gamma != 0) {
        this.m_gamma = 1 / this.m_gamma;
      }
      this.m_beta = h * k * this.m_gamma;
      this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var K = new Mat22();
      K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
      K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
      K.ey.x = K.ex.y;
      K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
      this.m_mass = K.getInverse();
      this.m_C.setVec2(cB2);
      this.m_C.addCombine(1, this.m_rB, -1, this.m_targetA);
      this.m_C.mul(this.m_beta);
      wB *= 0.98;
      if (step.warmStarting) {
        this.m_impulse.mul(step.dtRatio);
        vB2.addMul(this.m_invMassB, this.m_impulse);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, this.m_impulse);
      } else {
        this.m_impulse.setZero();
      }
      velocity.v.setVec2(vB2);
      velocity.w = wB;
    };
    MouseJoint2.prototype.solveVelocityConstraints = function(step) {
      var velocity = this.m_bodyB.c_velocity;
      var vB2 = Vec2.clone(velocity.v);
      var wB = velocity.w;
      var Cdot = Vec2.crossNumVec2(wB, this.m_rB);
      Cdot.add(vB2);
      Cdot.addCombine(1, this.m_C, this.m_gamma, this.m_impulse);
      Cdot.neg();
      var impulse = Mat22.mulVec2(this.m_mass, Cdot);
      var oldImpulse = Vec2.clone(this.m_impulse);
      this.m_impulse.add(impulse);
      var maxImpulse = step.dt * this.m_maxForce;
      this.m_impulse.clamp(maxImpulse);
      impulse = Vec2.sub(this.m_impulse, oldImpulse);
      vB2.addMul(this.m_invMassB, impulse);
      wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, impulse);
      velocity.v.setVec2(vB2);
      velocity.w = wB;
    };
    MouseJoint2.prototype.solvePositionConstraints = function(step) {
      return true;
    };
    MouseJoint2.TYPE = "mouse-joint";
    return MouseJoint2;
  }(Joint)
);
var math_abs$3 = Math.abs;
var DEFAULTS$4 = {
  collideConnected: true
};
var PulleyJoint = (
  /** @class */
  function(_super) {
    __extends$1(PulleyJoint2, _super);
    function PulleyJoint2(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio) {
      var _this = this;
      if (!(_this instanceof PulleyJoint2)) {
        return new PulleyJoint2(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio);
      }
      def = options(def, DEFAULTS$4);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = PulleyJoint2.TYPE;
      _this.m_groundAnchorA = Vec2.clone(groundA ? groundA : def.groundAnchorA || Vec2.neo(-1, 1));
      _this.m_groundAnchorB = Vec2.clone(groundB ? groundB : def.groundAnchorB || Vec2.neo(1, 1));
      _this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.neo(-1, 0));
      _this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.neo(1, 0));
      _this.m_lengthA = Number.isFinite(def.lengthA) ? def.lengthA : Vec2.distance(anchorA, groundA);
      _this.m_lengthB = Number.isFinite(def.lengthB) ? def.lengthB : Vec2.distance(anchorB, groundB);
      _this.m_ratio = Number.isFinite(ratio) ? ratio : def.ratio;
      _this.m_constant = _this.m_lengthA + _this.m_ratio * _this.m_lengthB;
      _this.m_impulse = 0;
      return _this;
    }
    PulleyJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        groundAnchorA: this.m_groundAnchorA,
        groundAnchorB: this.m_groundAnchorB,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB,
        lengthA: this.m_lengthA,
        lengthB: this.m_lengthB,
        ratio: this.m_ratio
      };
    };
    PulleyJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new PulleyJoint2(data);
      return joint;
    };
    PulleyJoint2.prototype._reset = function(def) {
      if (Vec2.isValid(def.groundAnchorA)) {
        this.m_groundAnchorA.set(def.groundAnchorA);
      }
      if (Vec2.isValid(def.groundAnchorB)) {
        this.m_groundAnchorB.set(def.groundAnchorB);
      }
      if (Vec2.isValid(def.localAnchorA)) {
        this.m_localAnchorA.set(def.localAnchorA);
      } else if (Vec2.isValid(def.anchorA)) {
        this.m_localAnchorA.set(this.m_bodyA.getLocalPoint(def.anchorA));
      }
      if (Vec2.isValid(def.localAnchorB)) {
        this.m_localAnchorB.set(def.localAnchorB);
      } else if (Vec2.isValid(def.anchorB)) {
        this.m_localAnchorB.set(this.m_bodyB.getLocalPoint(def.anchorB));
      }
      if (Number.isFinite(def.lengthA)) {
        this.m_lengthA = def.lengthA;
      }
      if (Number.isFinite(def.lengthB)) {
        this.m_lengthB = def.lengthB;
      }
      if (Number.isFinite(def.ratio)) {
        this.m_ratio = def.ratio;
      }
    };
    PulleyJoint2.prototype.getGroundAnchorA = function() {
      return this.m_groundAnchorA;
    };
    PulleyJoint2.prototype.getGroundAnchorB = function() {
      return this.m_groundAnchorB;
    };
    PulleyJoint2.prototype.getLengthA = function() {
      return this.m_lengthA;
    };
    PulleyJoint2.prototype.getLengthB = function() {
      return this.m_lengthB;
    };
    PulleyJoint2.prototype.getRatio = function() {
      return this.m_ratio;
    };
    PulleyJoint2.prototype.getCurrentLengthA = function() {
      var p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      var s2 = this.m_groundAnchorA;
      return Vec2.distance(p, s2);
    };
    PulleyJoint2.prototype.getCurrentLengthB = function() {
      var p = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      var s2 = this.m_groundAnchorB;
      return Vec2.distance(p, s2);
    };
    PulleyJoint2.prototype.shiftOrigin = function(newOrigin) {
      this.m_groundAnchorA.sub(newOrigin);
      this.m_groundAnchorB.sub(newOrigin);
    };
    PulleyJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    PulleyJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    PulleyJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.mulNumVec2(this.m_impulse, this.m_uB).mul(inv_dt);
    };
    PulleyJoint2.prototype.getReactionTorque = function(inv_dt) {
      return 0;
    };
    PulleyJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      this.m_uA = Vec2.sub(Vec2.add(cA2, this.m_rA), this.m_groundAnchorA);
      this.m_uB = Vec2.sub(Vec2.add(cB2, this.m_rB), this.m_groundAnchorB);
      var lengthA = this.m_uA.length();
      var lengthB = this.m_uB.length();
      if (lengthA > 10 * SettingsInternal.linearSlop) {
        this.m_uA.mul(1 / lengthA);
      } else {
        this.m_uA.setZero();
      }
      if (lengthB > 10 * SettingsInternal.linearSlop) {
        this.m_uB.mul(1 / lengthB);
      } else {
        this.m_uB.setZero();
      }
      var ruA = Vec2.crossVec2Vec2(this.m_rA, this.m_uA);
      var ruB = Vec2.crossVec2Vec2(this.m_rB, this.m_uB);
      var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
      var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
      this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
      if (this.m_mass > 0) {
        this.m_mass = 1 / this.m_mass;
      }
      if (step.warmStarting) {
        this.m_impulse *= step.dtRatio;
        var PA = Vec2.mulNumVec2(-this.m_impulse, this.m_uA);
        var PB = Vec2.mulNumVec2(-this.m_ratio * this.m_impulse, this.m_uB);
        vA2.addMul(this.m_invMassA, PA);
        wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
        vB2.addMul(this.m_invMassB, PB);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
      } else {
        this.m_impulse = 0;
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    PulleyJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var vpA = Vec2.add(vA2, Vec2.crossNumVec2(wA, this.m_rA));
      var vpB = Vec2.add(vB2, Vec2.crossNumVec2(wB, this.m_rB));
      var Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio * Vec2.dot(this.m_uB, vpB);
      var impulse = -this.m_mass * Cdot;
      this.m_impulse += impulse;
      var PA = Vec2.mulNumVec2(-impulse, this.m_uA);
      var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, this.m_uB);
      vA2.addMul(this.m_invMassA, PA);
      wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
      vB2.addMul(this.m_invMassB, PB);
      wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    PulleyJoint2.prototype.solvePositionConstraints = function(step) {
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var uA = Vec2.sub(Vec2.add(cA2, this.m_rA), this.m_groundAnchorA);
      var uB = Vec2.sub(Vec2.add(cB2, this.m_rB), this.m_groundAnchorB);
      var lengthA = uA.length();
      var lengthB = uB.length();
      if (lengthA > 10 * SettingsInternal.linearSlop) {
        uA.mul(1 / lengthA);
      } else {
        uA.setZero();
      }
      if (lengthB > 10 * SettingsInternal.linearSlop) {
        uB.mul(1 / lengthB);
      } else {
        uB.setZero();
      }
      var ruA = Vec2.crossVec2Vec2(rA2, uA);
      var ruB = Vec2.crossVec2Vec2(rB2, uB);
      var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
      var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
      var mass = mA + this.m_ratio * this.m_ratio * mB;
      if (mass > 0) {
        mass = 1 / mass;
      }
      var C = this.m_constant - lengthA - this.m_ratio * lengthB;
      var linearError = math_abs$3(C);
      var impulse = -mass * C;
      var PA = Vec2.mulNumVec2(-impulse, uA);
      var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, uB);
      cA2.addMul(this.m_invMassA, PA);
      aA += this.m_invIA * Vec2.crossVec2Vec2(rA2, PA);
      cB2.addMul(this.m_invMassB, PB);
      aB += this.m_invIB * Vec2.crossVec2Vec2(rB2, PB);
      this.m_bodyA.c_position.c = cA2;
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c = cB2;
      this.m_bodyB.c_position.a = aB;
      return linearError < SettingsInternal.linearSlop;
    };
    PulleyJoint2.TYPE = "pulley-joint";
    return PulleyJoint2;
  }(Joint)
);
var math_min$6 = Math.min;
var LimitState;
(function(LimitState2) {
  LimitState2[LimitState2["inactiveLimit"] = 0] = "inactiveLimit";
  LimitState2[LimitState2["atLowerLimit"] = 1] = "atLowerLimit";
  LimitState2[LimitState2["atUpperLimit"] = 2] = "atUpperLimit";
  LimitState2[LimitState2["equalLimits"] = 3] = "equalLimits";
})(LimitState || (LimitState = {}));
var DEFAULTS$3 = {
  maxLength: 0
};
var RopeJoint = (
  /** @class */
  function(_super) {
    __extends$1(RopeJoint2, _super);
    function RopeJoint2(def, bodyA, bodyB, anchor) {
      var _this = this;
      if (!(_this instanceof RopeJoint2)) {
        return new RopeJoint2(def, bodyA, bodyB, anchor);
      }
      def = options(def, DEFAULTS$3);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = RopeJoint2.TYPE;
      _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.neo(-1, 0));
      _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.neo(1, 0));
      _this.m_maxLength = def.maxLength;
      _this.m_mass = 0;
      _this.m_impulse = 0;
      _this.m_length = 0;
      _this.m_state = LimitState.inactiveLimit;
      return _this;
    }
    RopeJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB,
        maxLength: this.m_maxLength
      };
    };
    RopeJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new RopeJoint2(data);
      return joint;
    };
    RopeJoint2.prototype._reset = function(def) {
      if (Number.isFinite(def.maxLength)) {
        this.m_maxLength = def.maxLength;
      }
    };
    RopeJoint2.prototype.getLocalAnchorA = function() {
      return this.m_localAnchorA;
    };
    RopeJoint2.prototype.getLocalAnchorB = function() {
      return this.m_localAnchorB;
    };
    RopeJoint2.prototype.setMaxLength = function(length2) {
      this.m_maxLength = length2;
    };
    RopeJoint2.prototype.getMaxLength = function() {
      return this.m_maxLength;
    };
    RopeJoint2.prototype.getLimitState = function() {
      return this.m_state;
    };
    RopeJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    RopeJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    RopeJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
    };
    RopeJoint2.prototype.getReactionTorque = function(inv_dt) {
      return 0;
    };
    RopeJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
      this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
      this.m_u = Vec2.zero();
      this.m_u.addCombine(1, cB2, 1, this.m_rB);
      this.m_u.subCombine(1, cA2, 1, this.m_rA);
      this.m_length = this.m_u.length();
      var C = this.m_length - this.m_maxLength;
      if (C > 0) {
        this.m_state = LimitState.atUpperLimit;
      } else {
        this.m_state = LimitState.inactiveLimit;
      }
      if (this.m_length > SettingsInternal.linearSlop) {
        this.m_u.mul(1 / this.m_length);
      } else {
        this.m_u.setZero();
        this.m_mass = 0;
        this.m_impulse = 0;
        return;
      }
      var crA = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
      var crB = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
      var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;
      this.m_mass = invMass != 0 ? 1 / invMass : 0;
      if (step.warmStarting) {
        this.m_impulse *= step.dtRatio;
        var P3 = Vec2.mulNumVec2(this.m_impulse, this.m_u);
        vA2.subMul(this.m_invMassA, P3);
        wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
        vB2.addMul(this.m_invMassB, P3);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
      } else {
        this.m_impulse = 0;
      }
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
    };
    RopeJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var vpA = Vec2.addCrossNumVec2(vA2, wA, this.m_rA);
      var vpB = Vec2.addCrossNumVec2(vB2, wB, this.m_rB);
      var C = this.m_length - this.m_maxLength;
      var Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA));
      if (C < 0) {
        Cdot += step.inv_dt * C;
      }
      var impulse = -this.m_mass * Cdot;
      var oldImpulse = this.m_impulse;
      this.m_impulse = math_min$6(0, this.m_impulse + impulse);
      impulse = this.m_impulse - oldImpulse;
      var P3 = Vec2.mulNumVec2(impulse, this.m_u);
      vA2.subMul(this.m_invMassA, P3);
      wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
      vB2.addMul(this.m_invMassB, P3);
      wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    RopeJoint2.prototype.solvePositionConstraints = function(step) {
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
      var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
      var u = Vec2.zero();
      u.addCombine(1, cB2, 1, rB2);
      u.subCombine(1, cA2, 1, rA2);
      var length2 = u.normalize();
      var C = length2 - this.m_maxLength;
      C = clamp$1(C, 0, SettingsInternal.maxLinearCorrection);
      var impulse = -this.m_mass * C;
      var P3 = Vec2.mulNumVec2(impulse, u);
      cA2.subMul(this.m_invMassA, P3);
      aA -= this.m_invIA * Vec2.crossVec2Vec2(rA2, P3);
      cB2.addMul(this.m_invMassB, P3);
      aB += this.m_invIB * Vec2.crossVec2Vec2(rB2, P3);
      this.m_bodyA.c_position.c.setVec2(cA2);
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c.setVec2(cB2);
      this.m_bodyB.c_position.a = aB;
      return length2 - this.m_maxLength < SettingsInternal.linearSlop;
    };
    RopeJoint2.TYPE = "rope-joint";
    return RopeJoint2;
  }(Joint)
);
var math_abs$2 = Math.abs;
var math_PI$3 = Math.PI;
var DEFAULTS$2 = {
  frequencyHz: 0,
  dampingRatio: 0
};
var WeldJoint = (
  /** @class */
  function(_super) {
    __extends$1(WeldJoint2, _super);
    function WeldJoint2(def, bodyA, bodyB, anchor) {
      var _this = this;
      if (!(_this instanceof WeldJoint2)) {
        return new WeldJoint2(def, bodyA, bodyB, anchor);
      }
      def = options(def, DEFAULTS$2);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_type = WeldJoint2.TYPE;
      _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
      _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
      _this.m_referenceAngle = Number.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
      _this.m_frequencyHz = def.frequencyHz;
      _this.m_dampingRatio = def.dampingRatio;
      _this.m_impulse = new Vec3();
      _this.m_bias = 0;
      _this.m_gamma = 0;
      _this.m_mass = new Mat33();
      return _this;
    }
    WeldJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        frequencyHz: this.m_frequencyHz,
        dampingRatio: this.m_dampingRatio,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB,
        referenceAngle: this.m_referenceAngle
      };
    };
    WeldJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new WeldJoint2(data);
      return joint;
    };
    WeldJoint2.prototype._reset = function(def) {
      if (def.anchorA) {
        this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
      } else if (def.localAnchorA) {
        this.m_localAnchorA.setVec2(def.localAnchorA);
      }
      if (def.anchorB) {
        this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
      } else if (def.localAnchorB) {
        this.m_localAnchorB.setVec2(def.localAnchorB);
      }
      if (Number.isFinite(def.frequencyHz)) {
        this.m_frequencyHz = def.frequencyHz;
      }
      if (Number.isFinite(def.dampingRatio)) {
        this.m_dampingRatio = def.dampingRatio;
      }
    };
    WeldJoint2.prototype.getLocalAnchorA = function() {
      return this.m_localAnchorA;
    };
    WeldJoint2.prototype.getLocalAnchorB = function() {
      return this.m_localAnchorB;
    };
    WeldJoint2.prototype.getReferenceAngle = function() {
      return this.m_referenceAngle;
    };
    WeldJoint2.prototype.setFrequency = function(hz) {
      this.m_frequencyHz = hz;
    };
    WeldJoint2.prototype.getFrequency = function() {
      return this.m_frequencyHz;
    };
    WeldJoint2.prototype.setDampingRatio = function(ratio) {
      this.m_dampingRatio = ratio;
    };
    WeldJoint2.prototype.getDampingRatio = function() {
      return this.m_dampingRatio;
    };
    WeldJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    WeldJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    WeldJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
    };
    WeldJoint2.prototype.getReactionTorque = function(inv_dt) {
      return inv_dt * this.m_impulse.z;
    };
    WeldJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var K = new Mat33();
      K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
      K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
      K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
      K.ex.y = K.ey.x;
      K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
      K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
      K.ex.z = K.ez.x;
      K.ey.z = K.ez.y;
      K.ez.z = iA + iB;
      if (this.m_frequencyHz > 0) {
        K.getInverse22(this.m_mass);
        var invM = iA + iB;
        var m = invM > 0 ? 1 / invM : 0;
        var C = aB - aA - this.m_referenceAngle;
        var omega = 2 * math_PI$3 * this.m_frequencyHz;
        var d2 = 2 * m * this.m_dampingRatio * omega;
        var k = m * omega * omega;
        var h = step.dt;
        this.m_gamma = h * (d2 + h * k);
        this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
        this.m_bias = C * h * k * this.m_gamma;
        invM += this.m_gamma;
        this.m_mass.ez.z = invM != 0 ? 1 / invM : 0;
      } else if (K.ez.z == 0) {
        K.getInverse22(this.m_mass);
        this.m_gamma = 0;
        this.m_bias = 0;
      } else {
        K.getSymInverse33(this.m_mass);
        this.m_gamma = 0;
        this.m_bias = 0;
      }
      if (step.warmStarting) {
        this.m_impulse.mul(step.dtRatio);
        var P3 = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
        vA2.subMul(mA, P3);
        wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_impulse.z);
        vB2.addMul(mB, P3);
        wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_impulse.z);
      } else {
        this.m_impulse.setZero();
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    WeldJoint2.prototype.solveVelocityConstraints = function(step) {
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      if (this.m_frequencyHz > 0) {
        var Cdot2 = wB - wA;
        var impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
        this.m_impulse.z += impulse2;
        wA -= iA * impulse2;
        wB += iB * impulse2;
        var Cdot1 = Vec2.zero();
        Cdot1.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
        Cdot1.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
        var impulse1 = Vec2.neg(Mat33.mulVec2(this.m_mass, Cdot1));
        this.m_impulse.x += impulse1.x;
        this.m_impulse.y += impulse1.y;
        var P3 = Vec2.clone(impulse1);
        vA2.subMul(mA, P3);
        wA -= iA * Vec2.crossVec2Vec2(this.m_rA, P3);
        vB2.addMul(mB, P3);
        wB += iB * Vec2.crossVec2Vec2(this.m_rB, P3);
      } else {
        var Cdot1 = Vec2.zero();
        Cdot1.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
        Cdot1.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
        var Cdot2 = wB - wA;
        var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var impulse = Vec3.neg(Mat33.mulVec3(this.m_mass, Cdot));
        this.m_impulse.add(impulse);
        var P3 = Vec2.neo(impulse.x, impulse.y);
        vA2.subMul(mA, P3);
        wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + impulse.z);
        vB2.addMul(mB, P3);
        wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + impulse.z);
      }
      this.m_bodyA.c_velocity.v = vA2;
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v = vB2;
      this.m_bodyB.c_velocity.w = wB;
    };
    WeldJoint2.prototype.solvePositionConstraints = function(step) {
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var positionError;
      var angularError;
      var K = new Mat33();
      K.ex.x = mA + mB + rA2.y * rA2.y * iA + rB2.y * rB2.y * iB;
      K.ey.x = -rA2.y * rA2.x * iA - rB2.y * rB2.x * iB;
      K.ez.x = -rA2.y * iA - rB2.y * iB;
      K.ex.y = K.ey.x;
      K.ey.y = mA + mB + rA2.x * rA2.x * iA + rB2.x * rB2.x * iB;
      K.ez.y = rA2.x * iA + rB2.x * iB;
      K.ex.z = K.ez.x;
      K.ey.z = K.ez.y;
      K.ez.z = iA + iB;
      if (this.m_frequencyHz > 0) {
        var C1 = Vec2.zero();
        C1.addCombine(1, cB2, 1, rB2);
        C1.subCombine(1, cA2, 1, rA2);
        positionError = C1.length();
        angularError = 0;
        var P3 = Vec2.neg(K.solve22(C1));
        cA2.subMul(mA, P3);
        aA -= iA * Vec2.crossVec2Vec2(rA2, P3);
        cB2.addMul(mB, P3);
        aB += iB * Vec2.crossVec2Vec2(rB2, P3);
      } else {
        var C1 = Vec2.zero();
        C1.addCombine(1, cB2, 1, rB2);
        C1.subCombine(1, cA2, 1, rA2);
        var C2 = aB - aA - this.m_referenceAngle;
        positionError = C1.length();
        angularError = math_abs$2(C2);
        var C = new Vec3(C1.x, C1.y, C2);
        var impulse = new Vec3();
        if (K.ez.z > 0) {
          impulse = Vec3.neg(K.solve33(C));
        } else {
          var impulse2 = Vec2.neg(K.solve22(C1));
          impulse.set(impulse2.x, impulse2.y, 0);
        }
        var P3 = Vec2.neo(impulse.x, impulse.y);
        cA2.subMul(mA, P3);
        aA -= iA * (Vec2.crossVec2Vec2(rA2, P3) + impulse.z);
        cB2.addMul(mB, P3);
        aB += iB * (Vec2.crossVec2Vec2(rB2, P3) + impulse.z);
      }
      this.m_bodyA.c_position.c = cA2;
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c = cB2;
      this.m_bodyB.c_position.a = aB;
      return positionError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
    };
    WeldJoint2.TYPE = "weld-joint";
    return WeldJoint2;
  }(Joint)
);
var math_abs$1 = Math.abs;
var math_PI$2 = Math.PI;
var DEFAULTS$1 = {
  enableMotor: false,
  maxMotorTorque: 0,
  motorSpeed: 0,
  frequencyHz: 2,
  dampingRatio: 0.7
};
var WheelJoint = (
  /** @class */
  function(_super) {
    __extends$1(WheelJoint2, _super);
    function WheelJoint2(def, bodyA, bodyB, anchor, axis) {
      var _this = this;
      if (!(_this instanceof WheelJoint2)) {
        return new WheelJoint2(def, bodyA, bodyB, anchor, axis);
      }
      def = options(def, DEFAULTS$1);
      _this = _super.call(this, def, bodyA, bodyB) || this;
      bodyA = _this.m_bodyA;
      bodyB = _this.m_bodyB;
      _this.m_ax = Vec2.zero();
      _this.m_ay = Vec2.zero();
      _this.m_type = WheelJoint2.TYPE;
      _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
      _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
      if (Vec2.isValid(axis)) {
        _this.m_localXAxisA = bodyA.getLocalVector(axis);
      } else if (Vec2.isValid(def.localAxisA)) {
        _this.m_localXAxisA = Vec2.clone(def.localAxisA);
      } else if (Vec2.isValid(def.localAxis)) {
        _this.m_localXAxisA = Vec2.clone(def.localAxis);
      } else {
        _this.m_localXAxisA = Vec2.neo(1, 0);
      }
      _this.m_localYAxisA = Vec2.crossNumVec2(1, _this.m_localXAxisA);
      _this.m_mass = 0;
      _this.m_impulse = 0;
      _this.m_motorMass = 0;
      _this.m_motorImpulse = 0;
      _this.m_springMass = 0;
      _this.m_springImpulse = 0;
      _this.m_maxMotorTorque = def.maxMotorTorque;
      _this.m_motorSpeed = def.motorSpeed;
      _this.m_enableMotor = def.enableMotor;
      _this.m_frequencyHz = def.frequencyHz;
      _this.m_dampingRatio = def.dampingRatio;
      _this.m_bias = 0;
      _this.m_gamma = 0;
      return _this;
    }
    WheelJoint2.prototype._serialize = function() {
      return {
        type: this.m_type,
        bodyA: this.m_bodyA,
        bodyB: this.m_bodyB,
        collideConnected: this.m_collideConnected,
        enableMotor: this.m_enableMotor,
        maxMotorTorque: this.m_maxMotorTorque,
        motorSpeed: this.m_motorSpeed,
        frequencyHz: this.m_frequencyHz,
        dampingRatio: this.m_dampingRatio,
        localAnchorA: this.m_localAnchorA,
        localAnchorB: this.m_localAnchorB,
        localAxisA: this.m_localXAxisA
      };
    };
    WheelJoint2._deserialize = function(data, world, restore) {
      data = __assign$1({}, data);
      data.bodyA = restore(Body, data.bodyA, world);
      data.bodyB = restore(Body, data.bodyB, world);
      var joint = new WheelJoint2(data);
      return joint;
    };
    WheelJoint2.prototype._reset = function(def) {
      if (def.anchorA) {
        this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
      } else if (def.localAnchorA) {
        this.m_localAnchorA.setVec2(def.localAnchorA);
      }
      if (def.anchorB) {
        this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
      } else if (def.localAnchorB) {
        this.m_localAnchorB.setVec2(def.localAnchorB);
      }
      if (def.localAxisA) {
        this.m_localXAxisA.setVec2(def.localAxisA);
        this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1, def.localAxisA));
      }
      if (def.enableMotor !== void 0) {
        this.m_enableMotor = def.enableMotor;
      }
      if (Number.isFinite(def.maxMotorTorque)) {
        this.m_maxMotorTorque = def.maxMotorTorque;
      }
      if (Number.isFinite(def.motorSpeed)) {
        this.m_motorSpeed = def.motorSpeed;
      }
      if (Number.isFinite(def.frequencyHz)) {
        this.m_frequencyHz = def.frequencyHz;
      }
      if (Number.isFinite(def.dampingRatio)) {
        this.m_dampingRatio = def.dampingRatio;
      }
    };
    WheelJoint2.prototype.getLocalAnchorA = function() {
      return this.m_localAnchorA;
    };
    WheelJoint2.prototype.getLocalAnchorB = function() {
      return this.m_localAnchorB;
    };
    WheelJoint2.prototype.getLocalAxisA = function() {
      return this.m_localXAxisA;
    };
    WheelJoint2.prototype.getJointTranslation = function() {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var pA2 = bA.getWorldPoint(this.m_localAnchorA);
      var pB2 = bB.getWorldPoint(this.m_localAnchorB);
      var d2 = Vec2.sub(pB2, pA2);
      var axis = bA.getWorldVector(this.m_localXAxisA);
      var translation2 = Vec2.dot(d2, axis);
      return translation2;
    };
    WheelJoint2.prototype.getJointSpeed = function() {
      var wA = this.m_bodyA.m_angularVelocity;
      var wB = this.m_bodyB.m_angularVelocity;
      return wB - wA;
    };
    WheelJoint2.prototype.isMotorEnabled = function() {
      return this.m_enableMotor;
    };
    WheelJoint2.prototype.enableMotor = function(flag) {
      if (flag == this.m_enableMotor)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_enableMotor = flag;
    };
    WheelJoint2.prototype.setMotorSpeed = function(speed) {
      if (speed == this.m_motorSpeed)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_motorSpeed = speed;
    };
    WheelJoint2.prototype.getMotorSpeed = function() {
      return this.m_motorSpeed;
    };
    WheelJoint2.prototype.setMaxMotorTorque = function(torque) {
      if (torque == this.m_maxMotorTorque)
        return;
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_maxMotorTorque = torque;
    };
    WheelJoint2.prototype.getMaxMotorTorque = function() {
      return this.m_maxMotorTorque;
    };
    WheelJoint2.prototype.getMotorTorque = function(inv_dt) {
      return inv_dt * this.m_motorImpulse;
    };
    WheelJoint2.prototype.setSpringFrequencyHz = function(hz) {
      this.m_frequencyHz = hz;
    };
    WheelJoint2.prototype.getSpringFrequencyHz = function() {
      return this.m_frequencyHz;
    };
    WheelJoint2.prototype.setSpringDampingRatio = function(ratio) {
      this.m_dampingRatio = ratio;
    };
    WheelJoint2.prototype.getSpringDampingRatio = function() {
      return this.m_dampingRatio;
    };
    WheelJoint2.prototype.getAnchorA = function() {
      return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    };
    WheelJoint2.prototype.getAnchorB = function() {
      return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    };
    WheelJoint2.prototype.getReactionForce = function(inv_dt) {
      return Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax).mul(inv_dt);
    };
    WheelJoint2.prototype.getReactionTorque = function(inv_dt) {
      return inv_dt * this.m_motorImpulse;
    };
    WheelJoint2.prototype.initVelocityConstraints = function(step) {
      this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
      this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
      this.m_invMassA = this.m_bodyA.m_invMass;
      this.m_invMassB = this.m_bodyB.m_invMass;
      this.m_invIA = this.m_bodyA.m_invI;
      this.m_invIB = this.m_bodyB.m_invI;
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var d2 = Vec2.zero();
      d2.addCombine(1, cB2, 1, rB2);
      d2.subCombine(1, cA2, 1, rA2);
      {
        this.m_ay = Rot.mulVec2(qA, this.m_localYAxisA);
        this.m_sAy = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_ay);
        this.m_sBy = Vec2.crossVec2Vec2(rB2, this.m_ay);
        this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;
        if (this.m_mass > 0) {
          this.m_mass = 1 / this.m_mass;
        }
      }
      this.m_springMass = 0;
      this.m_bias = 0;
      this.m_gamma = 0;
      if (this.m_frequencyHz > 0) {
        this.m_ax = Rot.mulVec2(qA, this.m_localXAxisA);
        this.m_sAx = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_ax);
        this.m_sBx = Vec2.crossVec2Vec2(rB2, this.m_ax);
        var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
        if (invMass > 0) {
          this.m_springMass = 1 / invMass;
          var C = Vec2.dot(d2, this.m_ax);
          var omega = 2 * math_PI$2 * this.m_frequencyHz;
          var damp = 2 * this.m_springMass * this.m_dampingRatio * omega;
          var k = this.m_springMass * omega * omega;
          var h = step.dt;
          this.m_gamma = h * (damp + h * k);
          if (this.m_gamma > 0) {
            this.m_gamma = 1 / this.m_gamma;
          }
          this.m_bias = C * h * k * this.m_gamma;
          this.m_springMass = invMass + this.m_gamma;
          if (this.m_springMass > 0) {
            this.m_springMass = 1 / this.m_springMass;
          }
        }
      } else {
        this.m_springImpulse = 0;
      }
      if (this.m_enableMotor) {
        this.m_motorMass = iA + iB;
        if (this.m_motorMass > 0) {
          this.m_motorMass = 1 / this.m_motorMass;
        }
      } else {
        this.m_motorMass = 0;
        this.m_motorImpulse = 0;
      }
      if (step.warmStarting) {
        this.m_impulse *= step.dtRatio;
        this.m_springImpulse *= step.dtRatio;
        this.m_motorImpulse *= step.dtRatio;
        var P3 = Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
        var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
        var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
        vA2.subMul(this.m_invMassA, P3);
        wA -= this.m_invIA * LA;
        vB2.addMul(this.m_invMassB, P3);
        wB += this.m_invIB * LB;
      } else {
        this.m_impulse = 0;
        this.m_springImpulse = 0;
        this.m_motorImpulse = 0;
      }
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
    };
    WheelJoint2.prototype.solveVelocityConstraints = function(step) {
      var mA = this.m_invMassA;
      var mB = this.m_invMassB;
      var iA = this.m_invIA;
      var iB = this.m_invIB;
      var vA2 = this.m_bodyA.c_velocity.v;
      var wA = this.m_bodyA.c_velocity.w;
      var vB2 = this.m_bodyB.c_velocity.v;
      var wB = this.m_bodyB.c_velocity.w;
      {
        var Cdot = Vec2.dot(this.m_ax, vB2) - Vec2.dot(this.m_ax, vA2) + this.m_sBx * wB - this.m_sAx * wA;
        var impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
        this.m_springImpulse += impulse;
        var P3 = Vec2.mulNumVec2(impulse, this.m_ax);
        var LA = impulse * this.m_sAx;
        var LB = impulse * this.m_sBx;
        vA2.subMul(mA, P3);
        wA -= iA * LA;
        vB2.addMul(mB, P3);
        wB += iB * LB;
      }
      {
        var Cdot = wB - wA - this.m_motorSpeed;
        var impulse = -this.m_motorMass * Cdot;
        var oldImpulse = this.m_motorImpulse;
        var maxImpulse = step.dt * this.m_maxMotorTorque;
        this.m_motorImpulse = clamp$1(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
      }
      {
        var Cdot = Vec2.dot(this.m_ay, vB2) - Vec2.dot(this.m_ay, vA2) + this.m_sBy * wB - this.m_sAy * wA;
        var impulse = -this.m_mass * Cdot;
        this.m_impulse += impulse;
        var P3 = Vec2.mulNumVec2(impulse, this.m_ay);
        var LA = impulse * this.m_sAy;
        var LB = impulse * this.m_sBy;
        vA2.subMul(mA, P3);
        wA -= iA * LA;
        vB2.addMul(mB, P3);
        wB += iB * LB;
      }
      this.m_bodyA.c_velocity.v.setVec2(vA2);
      this.m_bodyA.c_velocity.w = wA;
      this.m_bodyB.c_velocity.v.setVec2(vB2);
      this.m_bodyB.c_velocity.w = wB;
    };
    WheelJoint2.prototype.solvePositionConstraints = function(step) {
      var cA2 = this.m_bodyA.c_position.c;
      var aA = this.m_bodyA.c_position.a;
      var cB2 = this.m_bodyB.c_position.c;
      var aB = this.m_bodyB.c_position.a;
      var qA = Rot.neo(aA);
      var qB = Rot.neo(aB);
      var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      var d2 = Vec2.zero();
      d2.addCombine(1, cB2, 1, rB2);
      d2.subCombine(1, cA2, 1, rA2);
      var ay = Rot.mulVec2(qA, this.m_localYAxisA);
      var sAy = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), ay);
      var sBy = Vec2.crossVec2Vec2(rB2, ay);
      var C = Vec2.dot(d2, ay);
      var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
      var impulse = k != 0 ? -C / k : 0;
      var P3 = Vec2.mulNumVec2(impulse, ay);
      var LA = impulse * sAy;
      var LB = impulse * sBy;
      cA2.subMul(this.m_invMassA, P3);
      aA -= this.m_invIA * LA;
      cB2.addMul(this.m_invMassB, P3);
      aB += this.m_invIB * LB;
      this.m_bodyA.c_position.c.setVec2(cA2);
      this.m_bodyA.c_position.a = aA;
      this.m_bodyB.c_position.c.setVec2(cB2);
      this.m_bodyB.c_position.a = aB;
      return math_abs$1(C) <= SettingsInternal.linearSlop;
    };
    WheelJoint2.TYPE = "wheel-joint";
    return WheelJoint2;
  }(Joint)
);
var _a;
var SID = 0;
var SERIALIZE_REF_TYPES = {
  "World": World,
  "Body": Body,
  "Joint": Joint,
  "Fixture": Fixture,
  "Shape": Shape
};
var DESERIALIZE_BY_REF_TYPE = {
  "Vec2": Vec2,
  "Vec3": Vec3,
  "World": World,
  "Body": Body,
  "Joint": Joint,
  "Fixture": Fixture,
  "Shape": Shape
};
var DESERIALIZE_BY_TYPE_FIELD = (_a = {}, _a[Body.STATIC] = Body, _a[Body.DYNAMIC] = Body, _a[Body.KINEMATIC] = Body, _a[ChainShape.TYPE] = ChainShape, // [BoxShape.TYPE]: BoxShape,
_a[PolygonShape.TYPE] = PolygonShape, _a[EdgeShape.TYPE] = EdgeShape, _a[CircleShape.TYPE] = CircleShape, _a[DistanceJoint.TYPE] = DistanceJoint, _a[FrictionJoint.TYPE] = FrictionJoint, _a[GearJoint.TYPE] = GearJoint, _a[MotorJoint.TYPE] = MotorJoint, _a[MouseJoint.TYPE] = MouseJoint, _a[PrismaticJoint.TYPE] = PrismaticJoint, _a[PulleyJoint.TYPE] = PulleyJoint, _a[RevoluteJoint.TYPE] = RevoluteJoint, _a[RopeJoint.TYPE] = RopeJoint, _a[WeldJoint.TYPE] = WeldJoint, _a[WheelJoint.TYPE] = WheelJoint, _a);
var DEFAULT_OPTIONS = {
  rootClass: World,
  preSerialize: function(obj) {
    return obj;
  },
  postSerialize: function(data, obj) {
    return data;
  },
  preDeserialize: function(data) {
    return data;
  },
  postDeserialize: function(obj, data) {
    return obj;
  }
};
var Serializer = (
  /** @class */
  /* @__PURE__ */ function() {
    function Serializer2(options2) {
      var _this = this;
      this.toJson = function(root) {
        var preSerialize = _this.options.preSerialize;
        var postSerialize = _this.options.postSerialize;
        var json = [];
        var refQueue = [root];
        var refMemoById = {};
        function addToRefQueue(value, typeName) {
          value.__sid = value.__sid || ++SID;
          if (!refMemoById[value.__sid]) {
            refQueue.push(value);
            var index = json.length + refQueue.length;
            var ref = {
              refIndex: index,
              refType: typeName
            };
            refMemoById[value.__sid] = ref;
          }
          return refMemoById[value.__sid];
        }
        function serializeWithHooks(obj2) {
          obj2 = preSerialize(obj2);
          var data = obj2._serialize();
          data = postSerialize(data, obj2);
          return data;
        }
        function traverse(value, noRefType) {
          if (noRefType === void 0) {
            noRefType = false;
          }
          if (typeof value !== "object" || value === null) {
            return value;
          }
          if (typeof value._serialize === "function") {
            if (!noRefType) {
              for (var typeName in SERIALIZE_REF_TYPES) {
                if (value instanceof SERIALIZE_REF_TYPES[typeName]) {
                  return addToRefQueue(value, typeName);
                }
              }
            }
            value = serializeWithHooks(value);
          }
          if (Array.isArray(value)) {
            var newValue = [];
            for (var key = 0; key < value.length; key++) {
              newValue[key] = traverse(value[key]);
            }
            value = newValue;
          } else {
            var newValue = {};
            for (var key in value) {
              if (value.hasOwnProperty(key)) {
                newValue[key] = traverse(value[key]);
              }
            }
            value = newValue;
          }
          return value;
        }
        while (refQueue.length) {
          var obj = refQueue.shift();
          var str = traverse(obj, true);
          json.push(str);
        }
        return json;
      };
      this.fromJson = function(json) {
        var preDeserialize = _this.options.preDeserialize;
        var postDeserialize = _this.options.postDeserialize;
        var rootClass = _this.options.rootClass;
        var deserializedRefMemoByIndex = {};
        function deserializeWithHooks(classHint, data, context) {
          if (!classHint || !classHint._deserialize) {
            classHint = DESERIALIZE_BY_TYPE_FIELD[data.type];
          }
          var deserializer = classHint && classHint._deserialize;
          if (!deserializer) {
            return;
          }
          data = preDeserialize(data);
          var classDeserializeFn = classHint._deserialize;
          var obj = classDeserializeFn(data, context, deserializeChild);
          obj = postDeserialize(obj, data);
          return obj;
        }
        function deserializeChild(classHint, dataOrRef, context) {
          var isRefObject = dataOrRef.refIndex && dataOrRef.refType;
          if (!isRefObject) {
            return deserializeWithHooks(classHint, dataOrRef, context);
          }
          var ref = dataOrRef;
          if (DESERIALIZE_BY_REF_TYPE[ref.refType]) {
            classHint = DESERIALIZE_BY_REF_TYPE[ref.refType];
          }
          var refIndex = ref.refIndex;
          if (!deserializedRefMemoByIndex[refIndex]) {
            var data = json[refIndex];
            var obj = deserializeWithHooks(classHint, data, context);
            deserializedRefMemoByIndex[refIndex] = obj;
          }
          return deserializedRefMemoByIndex[refIndex];
        }
        var root = deserializeWithHooks(rootClass, json[0], null);
        return root;
      };
      this.options = __assign$1(__assign$1({}, DEFAULT_OPTIONS), options2);
    }
    return Serializer2;
  }()
);
var worldSerializer = new Serializer({
  rootClass: World
});
Serializer.fromJson = worldSerializer.fromJson;
Serializer.toJson = worldSerializer.toJson;
var Testbed = (
  /** @class */
  function() {
    function Testbed2() {
    }
    Testbed2.mount = function(options2) {
      throw new Error("Not implemented");
    };
    Testbed2.start = function(world) {
      var testbed2 = Testbed2.mount();
      testbed2.start(world);
      return testbed2;
    };
    return Testbed2;
  }()
);
function testbed(a2, b2) {
  var callback;
  var options2;
  if (typeof a2 === "function") {
    callback = a2;
    options2 = b2;
  } else if (typeof b2 === "function") {
    callback = b2;
    options2 = a2;
  } else {
    options2 = a2 !== null && a2 !== void 0 ? a2 : b2;
  }
  var testbed2 = Testbed.mount(options2);
  if (callback) {
    var world = callback(testbed2) || testbed2.world;
    testbed2.start(world);
  } else {
    return testbed2;
  }
}
var BoxShape = (
  /** @class */
  function(_super) {
    __extends$1(BoxShape2, _super);
    function BoxShape2(halfWidth, halfHeight, center2, angle) {
      var _this = this;
      if (!(_this instanceof BoxShape2)) {
        return new BoxShape2(halfWidth, halfHeight, center2, angle);
      }
      _this = _super.call(this) || this;
      _this._setAsBox(halfWidth, halfHeight, center2, angle);
      return _this;
    }
    BoxShape2.TYPE = "polygon";
    return BoxShape2;
  }(PolygonShape)
);
Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);
function CircleCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
  CollideCircles(manifold, fixtureA.getShape(), xfA2, fixtureB.getShape(), xfB2);
}
var pA = vec2(0, 0);
var pB = vec2(0, 0);
var CollideCircles = function(manifold, circleA, xfA2, circleB, xfB2) {
  manifold.pointCount = 0;
  transformVec2(pA, xfA2, circleA.m_p);
  transformVec2(pB, xfB2, circleB.m_p);
  var distSqr = distSqrVec2(pB, pA);
  var rA2 = circleA.m_radius;
  var rB2 = circleB.m_radius;
  var radius = rA2 + rB2;
  if (distSqr > radius * radius) {
    return;
  }
  manifold.type = ManifoldType.e_circles;
  copyVec2(manifold.localPoint, circleA.m_p);
  zeroVec2(manifold.localNormal);
  manifold.pointCount = 1;
  copyVec2(manifold.points[0].localPoint, circleB.m_p);
  manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
};
Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);
function EdgeCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
  var shapeA = fixtureA.getShape();
  var shapeB = fixtureB.getShape();
  CollideEdgeCircle(manifold, shapeA, xfA2, shapeB, xfB2);
}
function ChainCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
  var chain = fixtureA.getShape();
  var edge = new EdgeShape();
  chain.getChildEdge(edge, indexA);
  var shapeA = edge;
  var shapeB = fixtureB.getShape();
  CollideEdgeCircle(manifold, shapeA, xfA2, shapeB, xfB2);
}
var e = vec2(0, 0);
var e1 = vec2(0, 0);
var e2 = vec2(0, 0);
var Q = vec2(0, 0);
var P = vec2(0, 0);
var n$2 = vec2(0, 0);
var CollideEdgeCircle = function(manifold, edgeA, xfA2, circleB, xfB2) {
  manifold.pointCount = 0;
  retransformVec2(Q, xfB2, xfA2, circleB.m_p);
  var A = edgeA.m_vertex1;
  var B = edgeA.m_vertex2;
  subVec2(e, B, A);
  var u = dotVec2(e, B) - dotVec2(e, Q);
  var v3 = dotVec2(e, Q) - dotVec2(e, A);
  var radius = edgeA.m_radius + circleB.m_radius;
  if (v3 <= 0) {
    copyVec2(P, A);
    var dd_1 = distSqrVec2(Q, A);
    if (dd_1 > radius * radius) {
      return;
    }
    if (edgeA.m_hasVertex0) {
      var A1 = edgeA.m_vertex0;
      var B1 = A;
      subVec2(e1, B1, A1);
      var u1 = dotVec2(e1, B1) - dotVec2(e1, Q);
      if (u1 > 0) {
        return;
      }
    }
    manifold.type = ManifoldType.e_circles;
    zeroVec2(manifold.localNormal);
    copyVec2(manifold.localPoint, P);
    manifold.pointCount = 1;
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
    return;
  }
  if (u <= 0) {
    copyVec2(P, B);
    var dd_2 = distSqrVec2(Q, P);
    if (dd_2 > radius * radius) {
      return;
    }
    if (edgeA.m_hasVertex3) {
      var B2 = edgeA.m_vertex3;
      var A2 = B;
      subVec2(e2, B2, A2);
      var v22 = dotVec2(e2, Q) - dotVec2(e2, A2);
      if (v22 > 0) {
        return;
      }
    }
    manifold.type = ManifoldType.e_circles;
    zeroVec2(manifold.localNormal);
    copyVec2(manifold.localPoint, P);
    manifold.pointCount = 1;
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(1, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
    return;
  }
  var den = lengthSqrVec2(e);
  combine2Vec2(P, u / den, A, v3 / den, B);
  var dd = distSqrVec2(Q, P);
  if (dd > radius * radius) {
    return;
  }
  crossNumVec2(n$2, 1, e);
  if (dotVec2(n$2, Q) - dotVec2(n$2, A) < 0) {
    negVec2(n$2);
  }
  normalizeVec2(n$2);
  manifold.type = ManifoldType.e_faceA;
  copyVec2(manifold.localNormal, n$2);
  copyVec2(manifold.localPoint, A);
  manifold.pointCount = 1;
  copyVec2(manifold.points[0].localPoint, circleB.m_p);
  manifold.points[0].id.setFeatures(0, ContactFeatureType.e_face, 0, ContactFeatureType.e_vertex);
};
var incidentEdge = [new ClipVertex(), new ClipVertex()];
var clipPoints1$1 = [new ClipVertex(), new ClipVertex()];
var clipPoints2$1 = [new ClipVertex(), new ClipVertex()];
var clipSegmentToLineNormal = vec2(0, 0);
var v1 = vec2(0, 0);
var n$1 = vec2(0, 0);
var xf$1 = transform(0, 0, 0);
var v11 = vec2(0, 0);
var v12 = vec2(0, 0);
var localTangent = vec2(0, 0);
var localNormal = vec2(0, 0);
var planePoint = vec2(0, 0);
var tangent = vec2(0, 0);
var normal$1 = vec2(0, 0);
var normal1$1 = vec2(0, 0);
Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);
function PolygonContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
  CollidePolygons(manifold, fixtureA.getShape(), xfA2, fixtureB.getShape(), xfB2);
}
function findMaxSeparation(poly1, xf1, poly2, xf2, output2) {
  var count1 = poly1.m_count;
  var count2 = poly2.m_count;
  var n1s = poly1.m_normals;
  var v1s = poly1.m_vertices;
  var v2s = poly2.m_vertices;
  detransformTransform(xf$1, xf2, xf1);
  var bestIndex = 0;
  var maxSeparation2 = -Infinity;
  for (var i = 0; i < count1; ++i) {
    rotVec2(n$1, xf$1.q, n1s[i]);
    transformVec2(v1, xf$1, v1s[i]);
    var si = Infinity;
    for (var j = 0; j < count2; ++j) {
      var sij = dotVec2(n$1, v2s[j]) - dotVec2(n$1, v1);
      if (sij < si) {
        si = sij;
      }
    }
    if (si > maxSeparation2) {
      maxSeparation2 = si;
      bestIndex = i;
    }
  }
  output2.maxSeparation = maxSeparation2;
  output2.bestIndex = bestIndex;
}
function findIncidentEdge(clipVertex, poly1, xf1, edge12, poly2, xf2) {
  var normals1 = poly1.m_normals;
  var count2 = poly2.m_count;
  var vertices2 = poly2.m_vertices;
  var normals2 = poly2.m_normals;
  rerotVec2(normal1$1, xf2.q, xf1.q, normals1[edge12]);
  var index = 0;
  var minDot = Infinity;
  for (var i = 0; i < count2; ++i) {
    var dot = dotVec2(normal1$1, normals2[i]);
    if (dot < minDot) {
      minDot = dot;
      index = i;
    }
  }
  var i1 = index;
  var i2 = i1 + 1 < count2 ? i1 + 1 : 0;
  transformVec2(clipVertex[0].v, xf2, vertices2[i1]);
  clipVertex[0].id.setFeatures(edge12, ContactFeatureType.e_face, i1, ContactFeatureType.e_vertex);
  transformVec2(clipVertex[1].v, xf2, vertices2[i2]);
  clipVertex[1].id.setFeatures(edge12, ContactFeatureType.e_face, i2, ContactFeatureType.e_vertex);
}
var maxSeparation = {
  maxSeparation: 0,
  bestIndex: 0
};
var CollidePolygons = function(manifold, polyA, xfA2, polyB, xfB2) {
  manifold.pointCount = 0;
  var totalRadius = polyA.m_radius + polyB.m_radius;
  findMaxSeparation(polyA, xfA2, polyB, xfB2, maxSeparation);
  var edgeA = maxSeparation.bestIndex;
  var separationA = maxSeparation.maxSeparation;
  if (separationA > totalRadius)
    return;
  findMaxSeparation(polyB, xfB2, polyA, xfA2, maxSeparation);
  var edgeB = maxSeparation.bestIndex;
  var separationB = maxSeparation.maxSeparation;
  if (separationB > totalRadius)
    return;
  var poly1;
  var poly2;
  var xf1;
  var xf2;
  var edge12;
  var flip;
  var k_tol = 0.1 * SettingsInternal.linearSlop;
  if (separationB > separationA + k_tol) {
    poly1 = polyB;
    poly2 = polyA;
    xf1 = xfB2;
    xf2 = xfA2;
    edge12 = edgeB;
    manifold.type = ManifoldType.e_faceB;
    flip = true;
  } else {
    poly1 = polyA;
    poly2 = polyB;
    xf1 = xfA2;
    xf2 = xfB2;
    edge12 = edgeA;
    manifold.type = ManifoldType.e_faceA;
    flip = false;
  }
  incidentEdge[0].recycle();
  incidentEdge[1].recycle();
  findIncidentEdge(incidentEdge, poly1, xf1, edge12, poly2, xf2);
  var count1 = poly1.m_count;
  var vertices1 = poly1.m_vertices;
  var iv1 = edge12;
  var iv2 = edge12 + 1 < count1 ? edge12 + 1 : 0;
  copyVec2(v11, vertices1[iv1]);
  copyVec2(v12, vertices1[iv2]);
  subVec2(localTangent, v12, v11);
  normalizeVec2(localTangent);
  crossVec2Num(localNormal, localTangent, 1);
  combine2Vec2(planePoint, 0.5, v11, 0.5, v12);
  rotVec2(tangent, xf1.q, localTangent);
  crossVec2Num(normal$1, tangent, 1);
  transformVec2(v11, xf1, v11);
  transformVec2(v12, xf1, v12);
  var frontOffset = dotVec2(normal$1, v11);
  var sideOffset1 = -dotVec2(tangent, v11) + totalRadius;
  var sideOffset2 = dotVec2(tangent, v12) + totalRadius;
  clipPoints1$1[0].recycle();
  clipPoints1$1[1].recycle();
  clipPoints2$1[0].recycle();
  clipPoints2$1[1].recycle();
  setVec2(clipSegmentToLineNormal, -tangent.x, -tangent.y);
  var np1 = clipSegmentToLine(clipPoints1$1, incidentEdge, clipSegmentToLineNormal, sideOffset1, iv1);
  if (np1 < 2) {
    return;
  }
  setVec2(clipSegmentToLineNormal, tangent.x, tangent.y);
  var np2 = clipSegmentToLine(clipPoints2$1, clipPoints1$1, clipSegmentToLineNormal, sideOffset2, iv2);
  if (np2 < 2) {
    return;
  }
  copyVec2(manifold.localNormal, localNormal);
  copyVec2(manifold.localPoint, planePoint);
  var pointCount = 0;
  for (var i = 0; i < clipPoints2$1.length; ++i) {
    var separation = dotVec2(normal$1, clipPoints2$1[i].v) - frontOffset;
    if (separation <= totalRadius) {
      var cp = manifold.points[pointCount];
      detransformVec2(cp.localPoint, xf2, clipPoints2$1[i].v);
      cp.id.set(clipPoints2$1[i].id);
      if (flip) {
        cp.id.swapFeatures();
      }
      ++pointCount;
    }
  }
  manifold.pointCount = pointCount;
};
Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);
function PolygonCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
  CollidePolygonCircle(manifold, fixtureA.getShape(), xfA2, fixtureB.getShape(), xfB2);
}
var cLocal = vec2(0, 0);
var faceCenter = vec2(0, 0);
var CollidePolygonCircle = function(manifold, polygonA, xfA2, circleB, xfB2) {
  manifold.pointCount = 0;
  retransformVec2(cLocal, xfB2, xfA2, circleB.m_p);
  var normalIndex = 0;
  var separation = -Infinity;
  var radius = polygonA.m_radius + circleB.m_radius;
  var vertexCount = polygonA.m_count;
  var vertices = polygonA.m_vertices;
  var normals = polygonA.m_normals;
  for (var i = 0; i < vertexCount; ++i) {
    var s2 = dotVec2(normals[i], cLocal) - dotVec2(normals[i], vertices[i]);
    if (s2 > radius) {
      return;
    }
    if (s2 > separation) {
      separation = s2;
      normalIndex = i;
    }
  }
  var vertIndex1 = normalIndex;
  var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
  var v13 = vertices[vertIndex1];
  var v22 = vertices[vertIndex2];
  if (separation < EPSILON) {
    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    copyVec2(manifold.localNormal, normals[normalIndex]);
    combine2Vec2(manifold.localPoint, 0.5, v13, 0.5, v22);
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
    return;
  }
  var u1 = dotVec2(cLocal, v22) - dotVec2(cLocal, v13) - dotVec2(v13, v22) + dotVec2(v13, v13);
  var u2 = dotVec2(cLocal, v13) - dotVec2(cLocal, v22) - dotVec2(v22, v13) + dotVec2(v22, v22);
  if (u1 <= 0) {
    if (distSqrVec2(cLocal, v13) > radius * radius) {
      return;
    }
    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    subVec2(manifold.localNormal, cLocal, v13);
    normalizeVec2(manifold.localNormal);
    copyVec2(manifold.localPoint, v13);
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
  } else if (u2 <= 0) {
    if (distSqrVec2(cLocal, v22) > radius * radius) {
      return;
    }
    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    subVec2(manifold.localNormal, cLocal, v22);
    normalizeVec2(manifold.localNormal);
    copyVec2(manifold.localPoint, v22);
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
  } else {
    combine2Vec2(faceCenter, 0.5, v13, 0.5, v22);
    var separation_1 = dotVec2(cLocal, normals[vertIndex1]) - dotVec2(faceCenter, normals[vertIndex1]);
    if (separation_1 > radius) {
      return;
    }
    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    copyVec2(manifold.localNormal, normals[vertIndex1]);
    copyVec2(manifold.localPoint, faceCenter);
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
  }
};
var math_min$5 = Math.min;
Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);
function EdgePolygonContact(manifold, xfA2, fA, indexA, xfB2, fB, indexB) {
  CollideEdgePolygon(manifold, fA.getShape(), xfA2, fB.getShape(), xfB2);
}
var edge_reuse = new EdgeShape();
function ChainPolygonContact(manifold, xfA2, fA, indexA, xfB2, fB, indexB) {
  var chain = fA.getShape();
  chain.getChildEdge(edge_reuse, indexA);
  CollideEdgePolygon(manifold, edge_reuse, xfA2, fB.getShape(), xfB2);
}
var EPAxisType;
(function(EPAxisType2) {
  EPAxisType2[EPAxisType2["e_unknown"] = -1] = "e_unknown";
  EPAxisType2[EPAxisType2["e_edgeA"] = 1] = "e_edgeA";
  EPAxisType2[EPAxisType2["e_edgeB"] = 2] = "e_edgeB";
})(EPAxisType || (EPAxisType = {}));
var VertexType;
(function(VertexType2) {
  VertexType2[VertexType2["e_isolated"] = 0] = "e_isolated";
  VertexType2[VertexType2["e_concave"] = 1] = "e_concave";
  VertexType2[VertexType2["e_convex"] = 2] = "e_convex";
})(VertexType || (VertexType = {}));
var EPAxis = (
  /** @class */
  /* @__PURE__ */ function() {
    function EPAxis2() {
    }
    return EPAxis2;
  }()
);
var TempPolygon = (
  /** @class */
  /* @__PURE__ */ function() {
    function TempPolygon2() {
      this.vertices = [];
      this.normals = [];
      this.count = 0;
      for (var i = 0; i < SettingsInternal.maxPolygonVertices; i++) {
        this.vertices.push(vec2(0, 0));
        this.normals.push(vec2(0, 0));
      }
    }
    return TempPolygon2;
  }()
);
var ReferenceFace = (
  /** @class */
  function() {
    function ReferenceFace2() {
      this.v1 = vec2(0, 0);
      this.v2 = vec2(0, 0);
      this.normal = vec2(0, 0);
      this.sideNormal1 = vec2(0, 0);
      this.sideNormal2 = vec2(0, 0);
    }
    ReferenceFace2.prototype.recycle = function() {
      zeroVec2(this.v1);
      zeroVec2(this.v2);
      zeroVec2(this.normal);
      zeroVec2(this.sideNormal1);
      zeroVec2(this.sideNormal2);
    };
    return ReferenceFace2;
  }()
);
var clipPoints1 = [new ClipVertex(), new ClipVertex()];
var clipPoints2 = [new ClipVertex(), new ClipVertex()];
var ie = [new ClipVertex(), new ClipVertex()];
var edgeAxis = new EPAxis();
var polygonAxis = new EPAxis();
var polygonBA = new TempPolygon();
var rf = new ReferenceFace();
var centroidB = vec2(0, 0);
var edge0 = vec2(0, 0);
var edge1 = vec2(0, 0);
var edge2 = vec2(0, 0);
var xf = transform(0, 0, 0);
var normal = vec2(0, 0);
var normal0 = vec2(0, 0);
var normal1 = vec2(0, 0);
var normal2 = vec2(0, 0);
var lowerLimit = vec2(0, 0);
var upperLimit = vec2(0, 0);
var perp = vec2(0, 0);
var n = vec2(0, 0);
var CollideEdgePolygon = function(manifold, edgeA, xfA2, polygonB, xfB2) {
  detransformTransform(xf, xfA2, xfB2);
  transformVec2(centroidB, xf, polygonB.m_centroid);
  var v0 = edgeA.m_vertex0;
  var v13 = edgeA.m_vertex1;
  var v22 = edgeA.m_vertex2;
  var v3 = edgeA.m_vertex3;
  var hasVertex0 = edgeA.m_hasVertex0;
  var hasVertex3 = edgeA.m_hasVertex3;
  subVec2(edge1, v22, v13);
  normalizeVec2(edge1);
  setVec2(normal1, edge1.y, -edge1.x);
  var offset1 = dotVec2(normal1, centroidB) - dotVec2(normal1, v13);
  var offset0 = 0;
  var offset2 = 0;
  var convex1 = false;
  var convex2 = false;
  zeroVec2(normal0);
  zeroVec2(normal2);
  if (hasVertex0) {
    subVec2(edge0, v13, v0);
    normalizeVec2(edge0);
    setVec2(normal0, edge0.y, -edge0.x);
    convex1 = crossVec2Vec2(edge0, edge1) >= 0;
    offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
  }
  if (hasVertex3) {
    subVec2(edge2, v3, v22);
    normalizeVec2(edge2);
    setVec2(normal2, edge2.y, -edge2.x);
    convex2 = Vec2.crossVec2Vec2(edge1, edge2) > 0;
    offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v22);
  }
  var front;
  zeroVec2(normal);
  zeroVec2(lowerLimit);
  zeroVec2(upperLimit);
  if (hasVertex0 && hasVertex3) {
    if (convex1 && convex2) {
      front = offset0 >= 0 || offset1 >= 0 || offset2 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        copyVec2(lowerLimit, normal0);
        copyVec2(upperLimit, normal2);
      } else {
        scaleVec2(normal, -1, normal1);
        scaleVec2(lowerLimit, -1, normal1);
        scaleVec2(upperLimit, -1, normal1);
      }
    } else if (convex1) {
      front = offset0 >= 0 || offset1 >= 0 && offset2 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        copyVec2(lowerLimit, normal0);
        copyVec2(upperLimit, normal1);
      } else {
        scaleVec2(normal, -1, normal1);
        scaleVec2(lowerLimit, -1, normal2);
        scaleVec2(upperLimit, -1, normal1);
      }
    } else if (convex2) {
      front = offset2 >= 0 || offset0 >= 0 && offset1 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        copyVec2(lowerLimit, normal1);
        copyVec2(upperLimit, normal2);
      } else {
        scaleVec2(normal, -1, normal1);
        scaleVec2(lowerLimit, -1, normal1);
        scaleVec2(upperLimit, -1, normal0);
      }
    } else {
      front = offset0 >= 0 && offset1 >= 0 && offset2 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        copyVec2(lowerLimit, normal1);
        copyVec2(upperLimit, normal1);
      } else {
        scaleVec2(normal, -1, normal1);
        scaleVec2(lowerLimit, -1, normal2);
        scaleVec2(upperLimit, -1, normal0);
      }
    }
  } else if (hasVertex0) {
    if (convex1) {
      front = offset0 >= 0 || offset1 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        copyVec2(lowerLimit, normal0);
        scaleVec2(upperLimit, -1, normal1);
      } else {
        scaleVec2(normal, -1, normal1);
        copyVec2(lowerLimit, normal1);
        scaleVec2(upperLimit, -1, normal1);
      }
    } else {
      front = offset0 >= 0 && offset1 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        copyVec2(lowerLimit, normal1);
        scaleVec2(upperLimit, -1, normal1);
      } else {
        scaleVec2(normal, -1, normal1);
        copyVec2(lowerLimit, normal1);
        scaleVec2(upperLimit, -1, normal0);
      }
    }
  } else if (hasVertex3) {
    if (convex2) {
      front = offset1 >= 0 || offset2 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        scaleVec2(lowerLimit, -1, normal1);
        copyVec2(upperLimit, normal2);
      } else {
        scaleVec2(normal, -1, normal1);
        scaleVec2(lowerLimit, -1, normal1);
        copyVec2(upperLimit, normal1);
      }
    } else {
      front = offset1 >= 0 && offset2 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        scaleVec2(lowerLimit, -1, normal1);
        copyVec2(upperLimit, normal1);
      } else {
        scaleVec2(normal, -1, normal1);
        scaleVec2(lowerLimit, -1, normal2);
        copyVec2(upperLimit, normal1);
      }
    }
  } else {
    front = offset1 >= 0;
    if (front) {
      copyVec2(normal, normal1);
      scaleVec2(lowerLimit, -1, normal1);
      scaleVec2(upperLimit, -1, normal1);
    } else {
      scaleVec2(normal, -1, normal1);
      copyVec2(lowerLimit, normal1);
      copyVec2(upperLimit, normal1);
    }
  }
  polygonBA.count = polygonB.m_count;
  for (var i = 0; i < polygonB.m_count; ++i) {
    transformVec2(polygonBA.vertices[i], xf, polygonB.m_vertices[i]);
    rotVec2(polygonBA.normals[i], xf.q, polygonB.m_normals[i]);
  }
  var radius = polygonB.m_radius + edgeA.m_radius;
  manifold.pointCount = 0;
  {
    edgeAxis.type = EPAxisType.e_edgeA;
    edgeAxis.index = front ? 0 : 1;
    edgeAxis.separation = Infinity;
    for (var i = 0; i < polygonBA.count; ++i) {
      var v4 = polygonBA.vertices[i];
      var s2 = dotVec2(normal, v4) - dotVec2(normal, v13);
      if (s2 < edgeAxis.separation) {
        edgeAxis.separation = s2;
      }
    }
  }
  if (edgeAxis.type == EPAxisType.e_unknown) {
    return;
  }
  if (edgeAxis.separation > radius) {
    return;
  }
  {
    polygonAxis.type = EPAxisType.e_unknown;
    polygonAxis.index = -1;
    polygonAxis.separation = -Infinity;
    setVec2(perp, -normal.y, normal.x);
    for (var i = 0; i < polygonBA.count; ++i) {
      scaleVec2(n, -1, polygonBA.normals[i]);
      var s1 = dotVec2(n, polygonBA.vertices[i]) - dotVec2(n, v13);
      var s22 = dotVec2(n, polygonBA.vertices[i]) - dotVec2(n, v22);
      var s2 = math_min$5(s1, s22);
      if (s2 > radius) {
        polygonAxis.type = EPAxisType.e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s2;
        break;
      }
      if (dotVec2(n, perp) >= 0) {
        if (dotVec2(n, normal) - dotVec2(upperLimit, normal) < -SettingsInternal.angularSlop) {
          continue;
        }
      } else {
        if (dotVec2(n, normal) - dotVec2(lowerLimit, normal) < -SettingsInternal.angularSlop) {
          continue;
        }
      }
      if (s2 > polygonAxis.separation) {
        polygonAxis.type = EPAxisType.e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s2;
      }
    }
  }
  if (polygonAxis.type != EPAxisType.e_unknown && polygonAxis.separation > radius) {
    return;
  }
  var k_relativeTol = 0.98;
  var k_absoluteTol = 1e-3;
  var primaryAxis;
  if (polygonAxis.type == EPAxisType.e_unknown) {
    primaryAxis = edgeAxis;
  } else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
    primaryAxis = polygonAxis;
  } else {
    primaryAxis = edgeAxis;
  }
  ie[0].recycle();
  ie[1].recycle();
  if (primaryAxis.type == EPAxisType.e_edgeA) {
    manifold.type = ManifoldType.e_faceA;
    var bestIndex = 0;
    var bestValue = dotVec2(normal, polygonBA.normals[0]);
    for (var i = 1; i < polygonBA.count; ++i) {
      var value = dotVec2(normal, polygonBA.normals[i]);
      if (value < bestValue) {
        bestValue = value;
        bestIndex = i;
      }
    }
    var i1 = bestIndex;
    var i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;
    copyVec2(ie[0].v, polygonBA.vertices[i1]);
    ie[0].id.setFeatures(0, ContactFeatureType.e_face, i1, ContactFeatureType.e_vertex);
    copyVec2(ie[1].v, polygonBA.vertices[i2]);
    ie[1].id.setFeatures(0, ContactFeatureType.e_face, i2, ContactFeatureType.e_vertex);
    if (front) {
      rf.i1 = 0;
      rf.i2 = 1;
      copyVec2(rf.v1, v13);
      copyVec2(rf.v2, v22);
      copyVec2(rf.normal, normal1);
    } else {
      rf.i1 = 1;
      rf.i2 = 0;
      copyVec2(rf.v1, v22);
      copyVec2(rf.v2, v13);
      scaleVec2(rf.normal, -1, normal1);
    }
  } else {
    manifold.type = ManifoldType.e_faceB;
    copyVec2(ie[0].v, v13);
    ie[0].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);
    copyVec2(ie[1].v, v22);
    ie[1].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);
    rf.i1 = primaryAxis.index;
    rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
    copyVec2(rf.v1, polygonBA.vertices[rf.i1]);
    copyVec2(rf.v2, polygonBA.vertices[rf.i2]);
    copyVec2(rf.normal, polygonBA.normals[rf.i1]);
  }
  setVec2(rf.sideNormal1, rf.normal.y, -rf.normal.x);
  setVec2(rf.sideNormal2, -rf.sideNormal1.x, -rf.sideNormal1.y);
  rf.sideOffset1 = dotVec2(rf.sideNormal1, rf.v1);
  rf.sideOffset2 = dotVec2(rf.sideNormal2, rf.v2);
  clipPoints1[0].recycle();
  clipPoints1[1].recycle();
  clipPoints2[0].recycle();
  clipPoints2[1].recycle();
  var np1 = clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
  if (np1 < SettingsInternal.maxManifoldPoints) {
    return;
  }
  var np2 = clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
  if (np2 < SettingsInternal.maxManifoldPoints) {
    return;
  }
  if (primaryAxis.type == EPAxisType.e_edgeA) {
    copyVec2(manifold.localNormal, rf.normal);
    copyVec2(manifold.localPoint, rf.v1);
  } else {
    copyVec2(manifold.localNormal, polygonB.m_normals[rf.i1]);
    copyVec2(manifold.localPoint, polygonB.m_vertices[rf.i1]);
  }
  var pointCount = 0;
  for (var i = 0; i < SettingsInternal.maxManifoldPoints; ++i) {
    var separation = dotVec2(rf.normal, clipPoints2[i].v) - dotVec2(rf.normal, rf.v1);
    if (separation <= radius) {
      var cp = manifold.points[pointCount];
      if (primaryAxis.type == EPAxisType.e_edgeA) {
        detransformVec2(cp.localPoint, xf, clipPoints2[i].v);
        cp.id.set(clipPoints2[i].id);
      } else {
        copyVec2(cp.localPoint, clipPoints2[i].v);
        cp.id.set(clipPoints2[i].id);
        cp.id.swapFeatures();
      }
      ++pointCount;
    }
  }
  manifold.pointCount = pointCount;
};
var internal = {
  CollidePolygons,
  Settings,
  Sweep,
  Manifold,
  Distance,
  TimeOfImpact,
  DynamicTree,
  stats: stats$1
};
var DataDriver = (
  /** @class */
  function() {
    function DataDriver2(key, listener) {
      this._refMap = {};
      this._map = {};
      this._xmap = {};
      this._data = [];
      this._entered = [];
      this._exited = [];
      this._key = key;
      this._listener = listener;
    }
    DataDriver2.prototype.update = function(data) {
      if (!Array.isArray(data))
        throw "Invalid data: " + data;
      this._entered.length = 0;
      this._exited.length = 0;
      this._data.length = data.length;
      for (var i = 0; i < data.length; i++) {
        if (typeof data[i] !== "object" || data[i] === null)
          continue;
        var d2 = data[i];
        var id = this._key(d2);
        if (!this._map[id]) {
          this._entered.push(d2);
        } else {
          delete this._map[id];
        }
        this._data[i] = d2;
        this._xmap[id] = d2;
      }
      for (var id in this._map) {
        this._exited.push(this._map[id]);
        delete this._map[id];
      }
      var temp3 = this._map;
      this._map = this._xmap;
      this._xmap = temp3;
      for (var i = 0; i < this._exited.length; i++) {
        var d2 = this._exited[i];
        var key = this._key(d2);
        var ref = this._refMap[key];
        this._listener.exit(d2, ref);
        delete this._refMap[key];
      }
      for (var i = 0; i < this._entered.length; i++) {
        var d2 = this._entered[i];
        var key = this._key(d2);
        var ref = this._listener.enter(d2);
        if (ref) {
          this._refMap[key] = ref;
        }
      }
      for (var i = 0; i < this._data.length; i++) {
        if (typeof data[i] !== "object" || data[i] === null)
          continue;
        var d2 = this._data[i];
        var key = this._key(d2);
        var ref = this._refMap[key];
        this._listener.update(d2, ref);
      }
      this._entered.length = 0;
      this._exited.length = 0;
      this._data.length = 0;
    };
    DataDriver2.prototype.ref = function(d2) {
      return this._refMap[this._key(d2)];
    };
    return DataDriver2;
  }()
);
/**
 * Stage.js 1.0.0-alpha.12
 *
 * @copyright Copyright (c) Ali Shakiba
 * @license The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var math_random = Math.random;
var math_sqrt$2 = Math.sqrt;
function random(min, max) {
  if (typeof min === "undefined") {
    max = 1;
    min = 0;
  } else if (typeof max === "undefined") {
    max = min;
    min = 0;
  }
  return min == max ? min : math_random() * (max - min) + min;
}
function wrap(num, min, max) {
  if (typeof min === "undefined") {
    max = 1;
    min = 0;
  } else if (typeof max === "undefined") {
    max = min;
    min = 0;
  }
  if (max > min) {
    num = (num - min) % (max - min);
    return num + (num < 0 ? max : min);
  } else {
    num = (num - max) % (min - max);
    return num + (num <= 0 ? min : max);
  }
}
function clamp(num, min, max) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
}
function length(x2, y) {
  return math_sqrt$2(x2 * x2 + y * y);
}
var math = Object.create(Math);
math.random = random;
math.wrap = wrap;
math.clamp = clamp;
math.length = length;
math.rotate = wrap;
math.limit = clamp;
var Matrix = (
  /** @class */
  function() {
    function Matrix2(a2, b2, c2, d2, e3, f) {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0;
      if (typeof a2 === "object") {
        this.reset(a2);
      } else {
        this.reset(a2, b2, c2, d2, e3, f);
      }
    }
    Matrix2.prototype.toString = function() {
      return "[" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.e + ", " + this.f + "]";
    };
    Matrix2.prototype.clone = function() {
      return new Matrix2(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    Matrix2.prototype.reset = function(a2, b2, c2, d2, e3, f) {
      this._dirty = true;
      if (typeof a2 === "object") {
        this.a = a2.a;
        this.d = a2.d;
        this.b = a2.b;
        this.c = a2.c;
        this.e = a2.e;
        this.f = a2.f;
      } else {
        this.a = typeof a2 === "number" ? a2 : 1;
        this.b = typeof b2 === "number" ? b2 : 0;
        this.c = typeof c2 === "number" ? c2 : 0;
        this.d = typeof d2 === "number" ? d2 : 1;
        this.e = typeof e3 === "number" ? e3 : 0;
        this.f = typeof f === "number" ? f : 0;
      }
      return this;
    };
    Matrix2.prototype.identity = function() {
      this._dirty = true;
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0;
      return this;
    };
    Matrix2.prototype.rotate = function(angle) {
      if (!angle) {
        return this;
      }
      this._dirty = true;
      var u = angle ? Math.cos(angle) : 1;
      var v3 = angle ? Math.sin(angle) : 0;
      var a2 = u * this.a - v3 * this.b;
      var b2 = u * this.b + v3 * this.a;
      var c2 = u * this.c - v3 * this.d;
      var d2 = u * this.d + v3 * this.c;
      var e3 = u * this.e - v3 * this.f;
      var f = u * this.f + v3 * this.e;
      this.a = a2;
      this.b = b2;
      this.c = c2;
      this.d = d2;
      this.e = e3;
      this.f = f;
      return this;
    };
    Matrix2.prototype.translate = function(x2, y) {
      if (!x2 && !y) {
        return this;
      }
      this._dirty = true;
      this.e += x2;
      this.f += y;
      return this;
    };
    Matrix2.prototype.scale = function(x2, y) {
      if (!(x2 - 1) && !(y - 1)) {
        return this;
      }
      this._dirty = true;
      this.a *= x2;
      this.b *= y;
      this.c *= x2;
      this.d *= y;
      this.e *= x2;
      this.f *= y;
      return this;
    };
    Matrix2.prototype.skew = function(x2, y) {
      if (!x2 && !y) {
        return this;
      }
      this._dirty = true;
      var a2 = this.a + this.b * x2;
      var b2 = this.b + this.a * y;
      var c2 = this.c + this.d * x2;
      var d2 = this.d + this.c * y;
      var e3 = this.e + this.f * x2;
      var f = this.f + this.e * y;
      this.a = a2;
      this.b = b2;
      this.c = c2;
      this.d = d2;
      this.e = e3;
      this.f = f;
      return this;
    };
    Matrix2.prototype.concat = function(m) {
      this._dirty = true;
      var a2 = this.a * m.a + this.b * m.c;
      var b2 = this.b * m.d + this.a * m.b;
      var c2 = this.c * m.a + this.d * m.c;
      var d2 = this.d * m.d + this.c * m.b;
      var e3 = this.e * m.a + m.e + this.f * m.c;
      var f = this.f * m.d + m.f + this.e * m.b;
      this.a = a2;
      this.b = b2;
      this.c = c2;
      this.d = d2;
      this.e = e3;
      this.f = f;
      return this;
    };
    Matrix2.prototype.inverse = function() {
      if (this._dirty) {
        this._dirty = false;
        if (!this.inverted) {
          this.inverted = new Matrix2();
        }
        var z = this.a * this.d - this.b * this.c;
        this.inverted.a = this.d / z;
        this.inverted.b = -this.b / z;
        this.inverted.c = -this.c / z;
        this.inverted.d = this.a / z;
        this.inverted.e = (this.c * this.f - this.e * this.d) / z;
        this.inverted.f = (this.e * this.b - this.a * this.f) / z;
      }
      return this.inverted;
    };
    Matrix2.prototype.map = function(p, q) {
      q = q || { x: 0, y: 0 };
      q.x = this.a * p.x + this.c * p.y + this.e;
      q.y = this.b * p.x + this.d * p.y + this.f;
      return q;
    };
    Matrix2.prototype.mapX = function(x2, y) {
      if (typeof x2 === "object") {
        y = x2.y;
        x2 = x2.x;
      }
      return this.a * x2 + this.c * y + this.e;
    };
    Matrix2.prototype.mapY = function(x2, y) {
      if (typeof x2 === "object") {
        y = x2.y;
        x2 = x2.x;
      }
      return this.b * x2 + this.d * y + this.f;
    };
    return Matrix2;
  }()
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d22, b22) {
    d22.__proto__ = b22;
  } || function(d22, b22) {
    for (var p in b22) if (b22.hasOwnProperty(p)) d22[p] = b22[p];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
      s2 = arguments[i];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p)) t[p] = s2[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P3, generator) {
  function adopt(value) {
    return value instanceof P3 ? value : new P3(function(resolve) {
      resolve(value);
    });
  }
  return new (P3 || (P3 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n2) {
    return function(v3) {
      return step([n2, v3]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e3) {
      op = [6, e3];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
var objectToString = Object.prototype.toString;
function isFn(value) {
  var str = objectToString.call(value);
  return str === "[object Function]" || str === "[object GeneratorFunction]" || str === "[object AsyncFunction]";
}
function isHash(value) {
  return objectToString.call(value) === "[object Object]" && value.constructor === Object;
}
const stats = {
  create: 0,
  tick: 0,
  node: 0,
  draw: 0,
  fps: 0
};
var uid = function() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};
var Texture = (
  /** @class */
  function() {
    function Texture2() {
      this.uid = "texture:" + uid();
      this.sx = 0;
      this.sy = 0;
      this.dx = 0;
      this.dy = 0;
    }
    Texture2.prototype.setSourceCoordinate = function(x2, y) {
      this.sx = x2;
      this.sy = y;
    };
    Texture2.prototype.setSourceDimension = function(w, h) {
      this.sw = w;
      this.sh = h;
    };
    Texture2.prototype.setDestinationCoordinate = function(x2, y) {
      this.dx = x2;
      this.dy = y;
    };
    Texture2.prototype.setDestinationDimension = function(w, h) {
      this.dw = w;
      this.dh = h;
    };
    Texture2.prototype.draw = function(context, x1, y1, w1, h1, x2, y2, w2, h2) {
      var sx, sy, sw, sh;
      var dx, dy, dw, dh;
      if (arguments.length > 5) {
        sx = this.sx + x1;
        sy = this.sy + y1;
        sw = w1 !== null && w1 !== void 0 ? w1 : this.sw;
        sh = h1 !== null && h1 !== void 0 ? h1 : this.sh;
        dx = this.dx + x2;
        dy = this.dy + y2;
        dw = w2 !== null && w2 !== void 0 ? w2 : this.dw;
        dh = h2 !== null && h2 !== void 0 ? h2 : this.dh;
      } else if (arguments.length > 1) {
        sx = this.sx;
        sy = this.sy;
        sw = this.sw;
        sh = this.sh;
        dx = this.dx + x1;
        dy = this.dy + y1;
        dw = w1 !== null && w1 !== void 0 ? w1 : this.dw;
        dh = h1 !== null && h1 !== void 0 ? h1 : this.dh;
      } else {
        sx = this.sx;
        sy = this.sy;
        sw = this.sw;
        sh = this.sh;
        dx = this.dx;
        dy = this.dy;
        dw = this.dw;
        dh = this.dh;
      }
      this.drawWithNormalizedArgs(context, sx, sy, sw, sh, dx, dy, dw, dh);
    };
    return Texture2;
  }()
);
var ImageTexture = (
  /** @class */
  function(_super) {
    __extends(ImageTexture2, _super);
    function ImageTexture2(source, pixelRatio) {
      var _this = _super.call(this) || this;
      _this._pixelRatio = 1;
      _this.padding = 0;
      if (typeof source === "object") {
        _this.setSourceImage(source, pixelRatio);
      }
      return _this;
    }
    ImageTexture2.prototype.setSourceImage = function(image2, pixelRatio) {
      if (pixelRatio === void 0) {
        pixelRatio = 1;
      }
      this._source = image2;
      this._pixelRatio = pixelRatio;
    };
    ImageTexture2.prototype.setPadding = function(padding) {
      this.padding = padding;
    };
    ImageTexture2.prototype.getWidth = function() {
      return this._source.width / this._pixelRatio + (this.padding + this.padding);
    };
    ImageTexture2.prototype.getHeight = function() {
      return this._source.height / this._pixelRatio + (this.padding + this.padding);
    };
    ImageTexture2.prototype.prerender = function(context) {
      return false;
    };
    ImageTexture2.prototype.drawWithNormalizedArgs = function(context, sx, sy, sw, sh, dx, dy, dw, dh) {
      var image2 = this._source;
      if (image2 === null || typeof image2 !== "object") {
        return;
      }
      sw = sw !== null && sw !== void 0 ? sw : this._source.width / this._pixelRatio;
      sh = sh !== null && sh !== void 0 ? sh : this._source.height / this._pixelRatio;
      dw = dw !== null && dw !== void 0 ? dw : sw;
      dh = dh !== null && dh !== void 0 ? dh : sh;
      dx += this.padding;
      dy += this.padding;
      var ix = sx * this._pixelRatio;
      var iy = sy * this._pixelRatio;
      var iw = sw * this._pixelRatio;
      var ih = sh * this._pixelRatio;
      try {
        stats.draw++;
        context.drawImage(image2, ix, iy, iw, ih, dx, dy, dw, dh);
      } catch (ex) {
        if (!this._draw_failed) {
          console.log("Unable to draw: ", image2);
          console.log(ex);
          this._draw_failed = true;
        }
      }
    };
    return ImageTexture2;
  }(Texture)
);
var PipeTexture = (
  /** @class */
  function(_super) {
    __extends(PipeTexture2, _super);
    function PipeTexture2(source) {
      var _this = _super.call(this) || this;
      _this._source = source;
      return _this;
    }
    PipeTexture2.prototype.setSourceTexture = function(texture2) {
      this._source = texture2;
    };
    PipeTexture2.prototype.getWidth = function() {
      var _a2, _b;
      return (_b = (_a2 = this.dw) !== null && _a2 !== void 0 ? _a2 : this.sw) !== null && _b !== void 0 ? _b : this._source.getWidth();
    };
    PipeTexture2.prototype.getHeight = function() {
      var _a2, _b;
      return (_b = (_a2 = this.dh) !== null && _a2 !== void 0 ? _a2 : this.sh) !== null && _b !== void 0 ? _b : this._source.getHeight();
    };
    PipeTexture2.prototype.prerender = function(context) {
      return this._source.prerender(context);
    };
    PipeTexture2.prototype.drawWithNormalizedArgs = function(context, sx, sy, sw, sh, dx, dy, dw, dh) {
      var texture2 = this._source;
      if (texture2 === null || typeof texture2 !== "object") {
        return;
      }
      texture2.draw(context, sx, sy, sw, sh, dx, dy, dw, dh);
    };
    return PipeTexture2;
  }(Texture)
);
/** @class */
(function(_super) {
  __extends(Atlas2, _super);
  function Atlas2(def) {
    if (def === void 0) {
      def = {};
    }
    var _this = _super.call(this) || this;
    _this.pipeSpriteTexture = function(def2) {
      var map = _this._map;
      var ppu = _this._ppu;
      var trim = _this._trim;
      if (!def2) {
        return void 0;
      }
      def2 = Object.assign({}, def2);
      if (isFn(map)) {
        def2 = map(def2);
      }
      if (ppu != 1) {
        def2.x *= ppu;
        def2.y *= ppu;
        def2.width *= ppu;
        def2.height *= ppu;
        def2.top *= ppu;
        def2.bottom *= ppu;
        def2.left *= ppu;
        def2.right *= ppu;
      }
      if (trim != 0) {
        def2.x += trim;
        def2.y += trim;
        def2.width -= 2 * trim;
        def2.height -= 2 * trim;
        def2.top -= trim;
        def2.bottom -= trim;
        def2.left -= trim;
        def2.right -= trim;
      }
      var texture2 = new PipeTexture(_this);
      texture2.top = def2.top;
      texture2.bottom = def2.bottom;
      texture2.left = def2.left;
      texture2.right = def2.right;
      texture2.setSourceCoordinate(def2.x, def2.y);
      texture2.setSourceDimension(def2.width, def2.height);
      return texture2;
    };
    _this.findSpriteDefinition = function(query) {
      var textures = _this._textures;
      if (textures) {
        if (isFn(textures)) {
          return textures(query);
        } else if (isHash(textures)) {
          return textures[query];
        }
      }
    };
    _this.select = function(query) {
      if (!query) {
        return new TextureSelection(new PipeTexture(_this));
      }
      var textureDefinition = _this.findSpriteDefinition(query);
      if (textureDefinition) {
        return new TextureSelection(textureDefinition, _this);
      }
    };
    _this.name = def.name;
    _this._ppu = def.ppu || def.ratio || 1;
    _this._trim = def.trim || 0;
    _this._map = def.map || def.filter;
    _this._textures = def.textures;
    if (typeof def.image === "object" && isHash(def.image)) {
      _this._imageSrc = def.image.src || def.image.url;
      if (typeof def.image.ratio === "number") {
        _this._pixelRatio = def.image.ratio;
      }
    } else {
      if (typeof def.imagePath === "string") {
        _this._imageSrc = def.imagePath;
      } else if (typeof def.image === "string") {
        _this._imageSrc = def.image;
      }
      if (typeof def.imageRatio === "number") {
        _this._pixelRatio = def.imageRatio;
      }
    }
    deprecatedWarning(def);
    return _this;
  }
  Atlas2.prototype.load = function() {
    return __awaiter(this, void 0, void 0, function() {
      var image2;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!this._imageSrc) return [3, 2];
            return [4, asyncLoadImage(this._imageSrc)];
          case 1:
            image2 = _a2.sent();
            this.setSourceImage(image2, this._pixelRatio);
            _a2.label = 2;
          case 2:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  };
  return Atlas2;
})(ImageTexture);
function asyncLoadImage(src) {
  console.debug && console.debug("Loading image: " + src);
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      console.debug && console.debug("Image loaded: " + src);
      resolve(img);
    };
    img.onerror = function(error) {
      console.error("Loading failed: " + src);
      reject(error);
    };
    img.src = src;
  });
}
function deprecatedWarning(def) {
  if ("filter" in def)
    console.warn("'filter' field of atlas definition is deprecated");
  if ("cutouts" in def)
    console.warn("'cutouts' field of atlas definition is deprecated");
  if ("sprites" in def)
    console.warn("'sprites' field of atlas definition is deprecated");
  if ("factory" in def)
    console.warn("'factory' field of atlas definition is deprecated");
  if ("ratio" in def)
    console.warn("'ratio' field of atlas definition is deprecated");
  if ("imagePath" in def)
    console.warn("'imagePath' field of atlas definition is deprecated");
  if ("imageRatio" in def)
    console.warn("'imageRatio' field of atlas definition is deprecated");
  if (typeof def.image === "object" && "url" in def.image)
    console.warn("'image.url' field of atlas definition is deprecated");
}
function isAtlasSpriteDefinition(selection) {
  return typeof selection === "object" && isHash(selection) && "number" === typeof selection.width && "number" === typeof selection.height;
}
var TextureSelection = (
  /** @class */
  function() {
    function TextureSelection2(selection, atlas2) {
      this.selection = selection;
      this.atlas = atlas2;
    }
    TextureSelection2.prototype.resolve = function(selection, subquery) {
      if (!selection) {
        return NO_TEXTURE;
      } else if (Array.isArray(selection)) {
        return this.resolve(selection[0]);
      } else if (selection instanceof Texture) {
        return selection;
      } else if (isAtlasSpriteDefinition(selection)) {
        if (!this.atlas) {
          return NO_TEXTURE;
        }
        return this.atlas.pipeSpriteTexture(selection);
      } else if (typeof selection === "object" && isHash(selection) && typeof subquery !== "undefined") {
        return this.resolve(selection[subquery]);
      } else if (typeof selection === "function" && isFn(selection)) {
        return this.resolve(selection(subquery));
      } else if (typeof selection === "string") {
        if (!this.atlas) {
          return NO_TEXTURE;
        }
        return this.resolve(this.atlas.findSpriteDefinition(selection));
      }
    };
    TextureSelection2.prototype.one = function(subquery) {
      return this.resolve(this.selection, subquery);
    };
    TextureSelection2.prototype.array = function(arr) {
      var array = Array.isArray(arr) ? arr : [];
      if (Array.isArray(this.selection)) {
        for (var i = 0; i < this.selection.length; i++) {
          array[i] = this.resolve(this.selection[i]);
        }
      } else {
        array[0] = this.resolve(this.selection);
      }
      return array;
    };
    return TextureSelection2;
  }()
);
var NO_TEXTURE = new /** @class */
(function(_super) {
  __extends(class_1, _super);
  function class_1() {
    var _this = _super.call(this) || this;
    _this.setSourceDimension(0, 0);
    return _this;
  }
  class_1.prototype.getWidth = function() {
    return 0;
  };
  class_1.prototype.getHeight = function() {
    return 0;
  };
  class_1.prototype.prerender = function(context) {
    return false;
  };
  class_1.prototype.drawWithNormalizedArgs = function(context, sx, sy, sw, sh, dx, dy, dw, dh) {
  };
  class_1.prototype.setSourceCoordinate = function(x2, y) {
  };
  class_1.prototype.setSourceDimension = function(w, h) {
  };
  class_1.prototype.setDestinationCoordinate = function(x2, y) {
  };
  class_1.prototype.setDestinationDimension = function(w, h) {
  };
  class_1.prototype.draw = function() {
  };
  return class_1;
}(Texture))();
var NO_SELECTION = new TextureSelection(NO_TEXTURE);
var ATLAS_MEMO_BY_NAME = {};
var ATLAS_ARRAY = [];
function texture(query) {
  if ("string" !== typeof query) {
    return new TextureSelection(query);
  }
  var result = null;
  var colonIndex = query.indexOf(":");
  if (colonIndex > 0 && query.length > colonIndex + 1) {
    var atlas_1 = ATLAS_MEMO_BY_NAME[query.slice(0, colonIndex)];
    result = atlas_1 && atlas_1.select(query.slice(colonIndex + 1));
  }
  if (!result) {
    var atlas_2 = ATLAS_MEMO_BY_NAME[query];
    result = atlas_2 && atlas_2.select();
  }
  if (!result) {
    for (var i = 0; i < ATLAS_ARRAY.length; i++) {
      result = ATLAS_ARRAY[i].select(query);
      if (result) {
        break;
      }
    }
  }
  if (!result) {
    console.error("Texture not found: " + query);
    result = NO_SELECTION;
  }
  return result;
}
var ResizableTexture = (
  /** @class */
  function(_super) {
    __extends(ResizableTexture2, _super);
    function ResizableTexture2(source, mode) {
      var _this = _super.call(this) || this;
      _this._source = source;
      _this._resizeMode = mode;
      return _this;
    }
    ResizableTexture2.prototype.getWidth = function() {
      var _a2;
      return (_a2 = this.dw) !== null && _a2 !== void 0 ? _a2 : this._source.getWidth();
    };
    ResizableTexture2.prototype.getHeight = function() {
      var _a2;
      return (_a2 = this.dh) !== null && _a2 !== void 0 ? _a2 : this._source.getHeight();
    };
    ResizableTexture2.prototype.prerender = function(context) {
      return false;
    };
    ResizableTexture2.prototype.drawWithNormalizedArgs = function(context, sx, sy, sw, sh, dx, dy, dw, dh) {
      var texture2 = this._source;
      if (texture2 === null || typeof texture2 !== "object") {
        return;
      }
      var outWidth = dw;
      var outHeight = dh;
      var left = Number.isFinite(texture2.left) ? texture2.left : 0;
      var right = Number.isFinite(texture2.right) ? texture2.right : 0;
      var top = Number.isFinite(texture2.top) ? texture2.top : 0;
      var bottom = Number.isFinite(texture2.bottom) ? texture2.bottom : 0;
      var width = texture2.getWidth() - left - right;
      var height = texture2.getHeight() - top - bottom;
      if (!this._innerSize) {
        outWidth = Math.max(outWidth - left - right, 0);
        outHeight = Math.max(outHeight - top - bottom, 0);
      }
      if (top > 0 && left > 0) {
        texture2.draw(context, 0, 0, left, top, 0, 0, left, top);
      }
      if (bottom > 0 && left > 0) {
        texture2.draw(context, 0, height + top, left, bottom, 0, outHeight + top, left, bottom);
      }
      if (top > 0 && right > 0) {
        texture2.draw(context, width + left, 0, right, top, outWidth + left, 0, right, top);
      }
      if (bottom > 0 && right > 0) {
        texture2.draw(context, width + left, height + top, right, bottom, outWidth + left, outHeight + top, right, bottom);
      }
      if (this._resizeMode === "stretch") {
        if (top > 0) {
          texture2.draw(context, left, 0, width, top, left, 0, outWidth, top);
        }
        if (bottom > 0) {
          texture2.draw(context, left, height + top, width, bottom, left, outHeight + top, outWidth, bottom);
        }
        if (left > 0) {
          texture2.draw(context, 0, top, left, height, 0, top, left, outHeight);
        }
        if (right > 0) {
          texture2.draw(context, width + left, top, right, height, outWidth + left, top, right, outHeight);
        }
        texture2.draw(context, left, top, width, height, left, top, outWidth, outHeight);
      } else if (this._resizeMode === "tile") {
        var l = left;
        var r = outWidth;
        var w = void 0;
        while (r > 0) {
          w = Math.min(width, r);
          r -= width;
          var t = top;
          var b2 = outHeight;
          var h = void 0;
          while (b2 > 0) {
            h = Math.min(height, b2);
            b2 -= height;
            texture2.draw(context, left, top, w, h, l, t, w, h);
            if (r <= 0) {
              if (left) {
                texture2.draw(context, 0, top, left, h, 0, t, left, h);
              }
              if (right) {
                texture2.draw(context, width + left, top, right, h, l + w, t, right, h);
              }
            }
            t += h;
          }
          if (top) {
            texture2.draw(context, left, 0, w, top, l, 0, w, top);
          }
          if (bottom) {
            texture2.draw(context, left, height + top, w, bottom, l, t, w, bottom);
          }
          l += w;
        }
      }
    };
    return ResizableTexture2;
  }(Texture)
);
function getDevicePixelRatio() {
  return typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
}
function isValidFitMode(value) {
  return value && (value === "cover" || value === "contain" || value === "fill" || value === "in" || value === "in-pad" || value === "out" || value === "out-crop");
}
var iid$1 = 0;
var Pin = (
  /** @class */
  function() {
    function Pin2(owner) {
      this.uid = "pin:" + uid();
      this._directionX = 1;
      this._directionY = 1;
      this._owner = owner;
      this._parent = null;
      this._relativeMatrix = new Matrix();
      this._absoluteMatrix = new Matrix();
      this.reset();
    }
    Pin2.prototype.reset = function() {
      this._textureAlpha = 1;
      this._alpha = 1;
      this._width = 0;
      this._height = 0;
      this._scaleX = 1;
      this._scaleY = 1;
      this._skewX = 0;
      this._skewY = 0;
      this._rotation = 0;
      this._pivoted = false;
      this._pivotX = 0;
      this._pivotY = 0;
      this._handled = false;
      this._handleX = 0;
      this._handleY = 0;
      this._aligned = false;
      this._alignX = 0;
      this._alignY = 0;
      this._offsetX = 0;
      this._offsetY = 0;
      this._boxX = 0;
      this._boxY = 0;
      this._boxWidth = this._width;
      this._boxHeight = this._height;
      this._ts_translate = ++iid$1;
      this._ts_transform = ++iid$1;
      this._ts_matrix = ++iid$1;
    };
    Pin2.prototype._update = function() {
      this._parent = this._owner._parent && this._owner._parent._pin;
      if (this._handled && this._mo_handle != this._ts_transform) {
        this._mo_handle = this._ts_transform;
        this._ts_translate = ++iid$1;
      }
      if (this._aligned && this._parent && this._mo_align != this._parent._ts_transform) {
        this._mo_align = this._parent._ts_transform;
        this._ts_translate = ++iid$1;
      }
      return this;
    };
    Pin2.prototype.toString = function() {
      return this._owner + " (" + (this._parent ? this._parent._owner : null) + ")";
    };
    Pin2.prototype.absoluteMatrix = function() {
      this._update();
      var ts = Math.max(this._ts_transform, this._ts_translate, this._parent ? this._parent._ts_matrix : 0);
      if (this._mo_abs == ts) {
        return this._absoluteMatrix;
      }
      this._mo_abs = ts;
      var abs = this._absoluteMatrix;
      abs.reset(this.relativeMatrix());
      this._parent && abs.concat(this._parent._absoluteMatrix);
      this._ts_matrix = ++iid$1;
      return abs;
    };
    Pin2.prototype.relativeMatrix = function() {
      this._update();
      var ts = Math.max(this._ts_transform, this._ts_translate, this._parent ? this._parent._ts_transform : 0);
      if (this._mo_rel == ts) {
        return this._relativeMatrix;
      }
      this._mo_rel = ts;
      var rel = this._relativeMatrix;
      rel.identity();
      if (this._pivoted) {
        rel.translate(-this._pivotX * this._width, -this._pivotY * this._height);
      }
      rel.scale(this._scaleX * this._directionX, this._scaleY * this._directionY);
      rel.skew(this._skewX, this._skewY);
      rel.rotate(this._rotation);
      if (this._pivoted) {
        rel.translate(this._pivotX * this._width, this._pivotY * this._height);
      }
      if (this._pivoted) {
        this._boxX = 0;
        this._boxY = 0;
        this._boxWidth = this._width;
        this._boxHeight = this._height;
      } else {
        var p = void 0;
        var q = void 0;
        if (rel.a > 0 && rel.c > 0 || rel.a < 0 && rel.c < 0) {
          p = 0;
          q = rel.a * this._width + rel.c * this._height;
        } else {
          p = rel.a * this._width;
          q = rel.c * this._height;
        }
        if (p > q) {
          this._boxX = q;
          this._boxWidth = p - q;
        } else {
          this._boxX = p;
          this._boxWidth = q - p;
        }
        if (rel.b > 0 && rel.d > 0 || rel.b < 0 && rel.d < 0) {
          p = 0;
          q = rel.b * this._width + rel.d * this._height;
        } else {
          p = rel.b * this._width;
          q = rel.d * this._height;
        }
        if (p > q) {
          this._boxY = q;
          this._boxHeight = p - q;
        } else {
          this._boxY = p;
          this._boxHeight = q - p;
        }
      }
      this._x = this._offsetX;
      this._y = this._offsetY;
      this._x -= this._boxX + this._handleX * this._boxWidth * this._directionX;
      this._y -= this._boxY + this._handleY * this._boxHeight * this._directionY;
      if (this._aligned && this._parent) {
        this._parent.relativeMatrix();
        this._x += this._alignX * this._parent._width;
        this._y += this._alignY * this._parent._height;
      }
      rel.translate(this._x, this._y);
      return this._relativeMatrix;
    };
    Pin2.prototype.get = function(key) {
      if (typeof getters[key] === "function") {
        return getters[key](this);
      }
    };
    Pin2.prototype.set = function(a2, b2) {
      if (typeof a2 === "string") {
        if (typeof setters[a2] === "function" && typeof b2 !== "undefined") {
          setters[a2](this, b2);
        }
      } else if (typeof a2 === "object") {
        for (b2 in a2) {
          if (typeof setters[b2] === "function" && typeof a2[b2] !== "undefined") {
            setters[b2](this, a2[b2], a2);
          }
        }
      }
      if (this._owner) {
        this._owner._ts_pin = ++iid$1;
        this._owner.touch();
      }
      return this;
    };
    Pin2.prototype.fit = function(width, height, mode) {
      this._ts_transform = ++iid$1;
      if (mode === "contain") {
        mode = "in-pad";
      }
      if (mode === "cover") {
        mode = "out-crop";
      }
      if (typeof width === "number") {
        this._scaleX = width / this._unscaled_width;
        this._width = this._unscaled_width;
      }
      if (typeof height === "number") {
        this._scaleY = height / this._unscaled_height;
        this._height = this._unscaled_height;
      }
      if (typeof width === "number" && typeof height === "number" && typeof mode === "string") {
        if (mode === "fill") ;
        else if (mode === "out" || mode === "out-crop") {
          this._scaleX = this._scaleY = Math.max(this._scaleX, this._scaleY);
        } else if (mode === "in" || mode === "in-pad") {
          this._scaleX = this._scaleY = Math.min(this._scaleX, this._scaleY);
        }
        if (mode === "out-crop" || mode === "in-pad") {
          this._width = width / this._scaleX;
          this._height = height / this._scaleY;
        }
      }
    };
    return Pin2;
  }()
);
var getters = {
  alpha: function(pin) {
    return pin._alpha;
  },
  textureAlpha: function(pin) {
    return pin._textureAlpha;
  },
  width: function(pin) {
    return pin._width;
  },
  height: function(pin) {
    return pin._height;
  },
  boxWidth: function(pin) {
    return pin._boxWidth;
  },
  boxHeight: function(pin) {
    return pin._boxHeight;
  },
  // scale : function(pin: Pin) {
  // },
  scaleX: function(pin) {
    return pin._scaleX;
  },
  scaleY: function(pin) {
    return pin._scaleY;
  },
  // skew : function(pin: Pin) {
  // },
  skewX: function(pin) {
    return pin._skewX;
  },
  skewY: function(pin) {
    return pin._skewY;
  },
  rotation: function(pin) {
    return pin._rotation;
  },
  // pivot : function(pin: Pin) {
  // },
  pivotX: function(pin) {
    return pin._pivotX;
  },
  pivotY: function(pin) {
    return pin._pivotY;
  },
  // offset : function(pin: Pin) {
  // },
  offsetX: function(pin) {
    return pin._offsetX;
  },
  offsetY: function(pin) {
    return pin._offsetY;
  },
  // align : function(pin: Pin) {
  // },
  alignX: function(pin) {
    return pin._alignX;
  },
  alignY: function(pin) {
    return pin._alignY;
  },
  // handle : function(pin: Pin) {
  // },
  handleX: function(pin) {
    return pin._handleX;
  },
  handleY: function(pin) {
    return pin._handleY;
  }
};
var setters = {
  alpha: function(pin, value) {
    pin._alpha = value;
  },
  textureAlpha: function(pin, value) {
    pin._textureAlpha = value;
  },
  width: function(pin, value) {
    pin._unscaled_width = value;
    pin._width = value;
    pin._ts_transform = ++iid$1;
  },
  height: function(pin, value) {
    pin._unscaled_height = value;
    pin._height = value;
    pin._ts_transform = ++iid$1;
  },
  scale: function(pin, value) {
    pin._scaleX = value;
    pin._scaleY = value;
    pin._ts_transform = ++iid$1;
  },
  scaleX: function(pin, value) {
    pin._scaleX = value;
    pin._ts_transform = ++iid$1;
  },
  scaleY: function(pin, value) {
    pin._scaleY = value;
    pin._ts_transform = ++iid$1;
  },
  skew: function(pin, value) {
    pin._skewX = value;
    pin._skewY = value;
    pin._ts_transform = ++iid$1;
  },
  skewX: function(pin, value) {
    pin._skewX = value;
    pin._ts_transform = ++iid$1;
  },
  skewY: function(pin, value) {
    pin._skewY = value;
    pin._ts_transform = ++iid$1;
  },
  rotation: function(pin, value) {
    pin._rotation = value;
    pin._ts_transform = ++iid$1;
  },
  pivot: function(pin, value) {
    pin._pivotX = value;
    pin._pivotY = value;
    pin._pivoted = true;
    pin._ts_transform = ++iid$1;
  },
  pivotX: function(pin, value) {
    pin._pivotX = value;
    pin._pivoted = true;
    pin._ts_transform = ++iid$1;
  },
  pivotY: function(pin, value) {
    pin._pivotY = value;
    pin._pivoted = true;
    pin._ts_transform = ++iid$1;
  },
  offset: function(pin, value) {
    pin._offsetX = value;
    pin._offsetY = value;
    pin._ts_translate = ++iid$1;
  },
  offsetX: function(pin, value) {
    pin._offsetX = value;
    pin._ts_translate = ++iid$1;
  },
  offsetY: function(pin, value) {
    pin._offsetY = value;
    pin._ts_translate = ++iid$1;
  },
  align: function(pin, value) {
    this.alignX(pin, value);
    this.alignY(pin, value);
  },
  alignX: function(pin, value) {
    pin._alignX = value;
    pin._aligned = true;
    pin._ts_translate = ++iid$1;
    this.handleX(pin, value);
  },
  alignY: function(pin, value) {
    pin._alignY = value;
    pin._aligned = true;
    pin._ts_translate = ++iid$1;
    this.handleY(pin, value);
  },
  handle: function(pin, value) {
    this.handleX(pin, value);
    this.handleY(pin, value);
  },
  handleX: function(pin, value) {
    pin._handleX = value;
    pin._handled = true;
    pin._ts_translate = ++iid$1;
  },
  handleY: function(pin, value) {
    pin._handleY = value;
    pin._handled = true;
    pin._ts_translate = ++iid$1;
  },
  resizeMode: function(pin, value, all) {
    if (all) {
      if (value == "in") {
        value = "in-pad";
      } else if (value == "out") {
        value = "out-crop";
      }
      pin.fit(all.resizeWidth, all.resizeHeight, value);
    }
  },
  resizeWidth: function(pin, value, all) {
    if (!all || !all.resizeMode) {
      pin.fit(value, null);
    }
  },
  resizeHeight: function(pin, value, all) {
    if (!all || !all.resizeMode) {
      pin.fit(null, value);
    }
  },
  scaleMode: function(pin, value, all) {
    if (all) {
      pin.fit(all.scaleWidth, all.scaleHeight, value);
    }
  },
  scaleWidth: function(pin, value, all) {
    if (!all || !all.scaleMode) {
      pin.fit(value, null);
    }
  },
  scaleHeight: function(pin, value, all) {
    if (!all || !all.scaleMode) {
      pin.fit(null, value);
    }
  },
  matrix: function(pin, value) {
    this.scaleX(pin, value.a);
    this.skewX(pin, value.c / value.d);
    this.skewY(pin, value.b / value.a);
    this.scaleY(pin, value.d);
    this.offsetX(pin, value.e);
    this.offsetY(pin, value.f);
    this.rotation(pin, 0);
  }
};
function IDENTITY(x2) {
  return x2;
}
var LOOKUP_CACHE = {};
var MODE_BY_NAME = {};
var EASE_BY_NAME = {};
var Easing = (
  /** @class */
  function() {
    function Easing2() {
    }
    Easing2.get = function(token, fallback) {
      fallback = fallback || IDENTITY;
      if (typeof token === "function") {
        return token;
      }
      if (typeof token !== "string") {
        return fallback;
      }
      var easeFn = LOOKUP_CACHE[token];
      if (easeFn) {
        return easeFn;
      }
      var tokens = /^(\w+)(-(in|out|in-out|out-in))?(\((.*)\))?$/i.exec(token);
      if (!tokens || !tokens.length) {
        return fallback;
      }
      var easeName = tokens[1];
      var easing = EASE_BY_NAME[easeName];
      var modeName = tokens[3];
      var modeFn = MODE_BY_NAME[modeName];
      var params = tokens[5];
      if (!easing) {
        easeFn = fallback;
      } else if ("fn" in easing && typeof easing.fn === "function") {
        easeFn = easing.fn;
      } else if ("fc" in easing && typeof easing.fc === "function") {
        var args = params ? params.replace(/\s+/, "").split(",") : void 0;
        easeFn = easing.fc.apply(easing.fc, args);
      } else {
        easeFn = fallback;
      }
      if (modeFn) {
        easeFn = modeFn(easeFn);
      }
      LOOKUP_CACHE[token] = easeFn;
      return easeFn;
    };
    return Easing2;
  }()
);
function addMode(name, fn) {
  MODE_BY_NAME[name] = fn;
}
function addEaseFn(data) {
  var names = data.name.split(/\s+/);
  for (var i = 0; i < names.length; i++) {
    var key = names[i];
    if (key) {
      EASE_BY_NAME[key] = data;
    }
  }
}
addMode("in", function(f) {
  return f;
});
addMode("out", function(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
});
addMode("in-out", function(f) {
  return function(t) {
    return t < 0.5 ? f(2 * t) / 2 : 1 - f(2 * (1 - t)) / 2;
  };
});
addMode("out-in", function(f) {
  return function(t) {
    return t < 0.5 ? 1 - f(2 * (1 - t)) / 2 : f(2 * t) / 2;
  };
});
addEaseFn({
  name: "linear",
  fn: function(t) {
    return t;
  }
});
addEaseFn({
  name: "quad",
  fn: function(t) {
    return t * t;
  }
});
addEaseFn({
  name: "cubic",
  fn: function(t) {
    return t * t * t;
  }
});
addEaseFn({
  name: "quart",
  fn: function(t) {
    return t * t * t * t;
  }
});
addEaseFn({
  name: "quint",
  fn: function(t) {
    return t * t * t * t * t;
  }
});
addEaseFn({
  name: "sin sine",
  fn: function(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  }
});
addEaseFn({
  name: "exp expo",
  fn: function(t) {
    return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
  }
});
addEaseFn({
  name: "circle circ",
  fn: function(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
});
addEaseFn({
  name: "bounce",
  fn: function(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
});
addEaseFn({
  name: "poly",
  fc: function(e3) {
    return function(t) {
      return Math.pow(t, e3);
    };
  }
});
addEaseFn({
  name: "elastic",
  fc: function(a2, p) {
    p = p || 0.45;
    a2 = a2 || 1;
    var s2 = p / (2 * Math.PI) * Math.asin(1 / a2);
    return function(t) {
      return 1 + a2 * Math.pow(2, -10 * t) * Math.sin((t - s2) * (2 * Math.PI) / p);
    };
  }
});
addEaseFn({
  name: "back",
  fc: function(s2) {
    s2 = typeof s2 !== "undefined" ? s2 : 1.70158;
    return function(t) {
      return t * t * ((s2 + 1) * t - s2);
    };
  }
});
var Transition = (
  /** @class */
  function() {
    function Transition2(owner, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      this.uid = "transition:" + uid();
      this._ending = [];
      this._end = {};
      this._duration = options2.duration || 400;
      this._delay = options2.delay || 0;
      this._owner = owner;
      this._time = 0;
    }
    Transition2.prototype.tick = function(node, elapsed, now2, last) {
      this._time += elapsed;
      if (this._time < this._delay) {
        return;
      }
      var time = this._time - this._delay;
      if (!this._start) {
        this._start = {};
        for (var key in this._end) {
          this._start[key] = this._owner.pin(key);
        }
      }
      var p = Math.min(time / this._duration, 1);
      var ended = p >= 1;
      if (typeof this._easing == "function") {
        p = this._easing(p);
      }
      var q = 1 - p;
      for (var key in this._end) {
        this._owner.pin(key, this._start[key] * q + this._end[key] * p);
      }
      return ended;
    };
    Transition2.prototype.finish = function() {
      var _this = this;
      this._ending.forEach(function(callback) {
        try {
          callback.call(_this._owner);
        } catch (e3) {
          console.error(e3);
        }
      });
      return this._next;
    };
    Transition2.prototype.tween = function(a2, b2) {
      var options2;
      if (typeof a2 === "object" && a2 !== null) {
        options2 = a2;
      } else {
        options2 = {};
        if (typeof a2 === "number") {
          options2.duration = a2;
          if (typeof b2 === "number") {
            options2.delay = b2;
          }
        }
      }
      return this._next = new Transition2(this._owner, options2);
    };
    Transition2.prototype.duration = function(duration) {
      this._duration = duration;
      return this;
    };
    Transition2.prototype.delay = function(delay) {
      this._delay = delay;
      return this;
    };
    Transition2.prototype.ease = function(easing) {
      this._easing = Easing.get(easing);
      return this;
    };
    Transition2.prototype.done = function(fn) {
      this._ending.push(fn);
      return this;
    };
    Transition2.prototype.hide = function() {
      this._ending.push(function() {
        this.hide();
      });
      this._hide = true;
      return this;
    };
    Transition2.prototype.remove = function() {
      this._ending.push(function() {
        this.remove();
      });
      this._remove = true;
      return this;
    };
    Transition2.prototype.pin = function(a2, b2) {
      if (typeof a2 === "object") {
        for (var attr in a2) {
          pinning(this._owner, this._end, attr, a2[attr]);
        }
      } else if (typeof b2 !== "undefined") {
        pinning(this._owner, this._end, a2, b2);
      }
      return this;
    };
    Transition2.prototype.then = function(fn) {
      this.done(fn);
      return this;
    };
    Transition2.prototype.clear = function(forward) {
      return this;
    };
    Transition2.prototype.size = function(w, h) {
      this.pin("width", w);
      this.pin("height", h);
      return this;
    };
    Transition2.prototype.width = function(w) {
      if (typeof w === "undefined") {
        return this.pin("width");
      }
      this.pin("width", w);
      return this;
    };
    Transition2.prototype.height = function(h) {
      if (typeof h === "undefined") {
        return this.pin("height");
      }
      this.pin("height", h);
      return this;
    };
    Transition2.prototype.offset = function(a2, b2) {
      if (typeof a2 === "object") {
        b2 = a2.y;
        a2 = a2.x;
      }
      this.pin("offsetX", a2);
      this.pin("offsetY", b2);
      return this;
    };
    Transition2.prototype.rotate = function(a2) {
      this.pin("rotation", a2);
      return this;
    };
    Transition2.prototype.skew = function(a2, b2) {
      if (typeof a2 === "object") {
        b2 = a2.y;
        a2 = a2.x;
      } else if (typeof b2 === "undefined") {
        b2 = a2;
      }
      this.pin("skewX", a2);
      this.pin("skewY", b2);
      return this;
    };
    Transition2.prototype.scale = function(a2, b2) {
      if (typeof a2 === "object") {
        b2 = a2.y;
        a2 = a2.x;
      } else if (typeof b2 === "undefined") {
        b2 = a2;
      }
      this.pin("scaleX", a2);
      this.pin("scaleY", b2);
      return this;
    };
    Transition2.prototype.alpha = function(a2, ta) {
      this.pin("alpha", a2);
      if (typeof ta !== "undefined") {
        this.pin("textureAlpha", ta);
      }
      return this;
    };
    return Transition2;
  }()
);
function pinning(node, map, key, value) {
  if (typeof node.pin(key) === "number") {
    map[key] = value;
  } else if (typeof node.pin(key + "X") === "number" && typeof node.pin(key + "Y") === "number") {
    map[key + "X"] = value;
    map[key + "Y"] = value;
  }
}
var iid = 0;
stats.create = 0;
function assertType(obj) {
  if (obj && obj instanceof Node) {
    return obj;
  }
  throw "Invalid node: " + obj;
}
var Node = (
  /** @class */
  function() {
    function Node2() {
      var _this = this;
      this.uid = "node:" + uid();
      this._label = "";
      this._parent = null;
      this._next = null;
      this._prev = null;
      this._first = null;
      this._last = null;
      this._visible = true;
      this._alpha = 1;
      this._padding = 0;
      this._spacing = 0;
      this._pin = new Pin(this);
      this._listeners = {};
      this._attrs = {};
      this._flags = {};
      this._transitions = [];
      this._tickBefore = [];
      this._tickAfter = [];
      this.MAX_ELAPSE = Infinity;
      this.renderedBefore = false;
      this._transitionTickInitied = false;
      this._transitionTickLastTime = 0;
      this._transitionTick = function(elapsed, now2, last) {
        if (!_this._transitions.length) {
          return false;
        }
        var ignore = _this._transitionTickLastTime !== last;
        _this._transitionTickLastTime = now2;
        if (ignore) {
          return true;
        }
        var head = _this._transitions[0];
        var ended = head.tick(_this, elapsed, now2, last);
        if (ended) {
          if (head === _this._transitions[0]) {
            _this._transitions.shift();
          }
          var next = head.finish();
          if (next) {
            _this._transitions.unshift(next);
          }
        }
        return true;
      };
      stats.create++;
      if (this instanceof Node2) {
        this.label(this.constructor.name);
      }
    }
    Node2.prototype.matrix = function(relative) {
      if (relative === void 0) {
        relative = false;
      }
      if (relative === true) {
        return this._pin.relativeMatrix();
      }
      return this._pin.absoluteMatrix();
    };
    Node2.prototype.getPixelRatio = function() {
      var _a2;
      var m = (_a2 = this._parent) === null || _a2 === void 0 ? void 0 : _a2.matrix();
      var pixelRatio = !m ? 1 : Math.max(Math.abs(m.a), Math.abs(m.b)) / getDevicePixelRatio();
      return pixelRatio;
    };
    Node2.prototype.getDevicePixelRatio = function() {
      var _a2;
      var parentMatrix = (_a2 = this._parent) === null || _a2 === void 0 ? void 0 : _a2.matrix();
      var pixelRatio = !parentMatrix ? 1 : Math.max(Math.abs(parentMatrix.a), Math.abs(parentMatrix.b));
      return pixelRatio;
    };
    Node2.prototype.getLogicalPixelRatio = function() {
      return this.getDevicePixelRatio() / getDevicePixelRatio();
    };
    Node2.prototype.pin = function(a2, b2) {
      if (typeof a2 === "object") {
        this._pin.set(a2);
        return this;
      } else if (typeof a2 === "string") {
        if (typeof b2 === "undefined") {
          return this._pin.get(a2);
        } else {
          this._pin.set(a2, b2);
          return this;
        }
      } else if (typeof a2 === "undefined") {
        return this._pin;
      }
    };
    Node2.prototype.fit = function(a2, b2, c2) {
      if (typeof a2 === "object") {
        c2 = b2;
        b2 = a2.y;
        a2 = a2.x;
      }
      this._pin.fit(a2, b2, c2);
      return this;
    };
    Node2.prototype.scaleTo = function(a2, b2, c2) {
      return this.fit(a2, b2, c2);
    };
    Node2.prototype.toString = function() {
      return "[" + this._label + "]";
    };
    Node2.prototype.id = function(label) {
      if (typeof label === "undefined") {
        return this._label;
      }
      this._label = label;
      return this;
    };
    Node2.prototype.label = function(label) {
      if (typeof label === "undefined") {
        return this._label;
      }
      this._label = label;
      return this;
    };
    Node2.prototype.attr = function(name, value) {
      if (typeof value === "undefined") {
        return this._attrs !== null ? this._attrs[name] : void 0;
      }
      (this._attrs !== null ? this._attrs : this._attrs = {})[name] = value;
      return this;
    };
    Node2.prototype.visible = function(visible) {
      if (typeof visible === "undefined") {
        return this._visible;
      }
      this._visible = visible;
      this._parent && (this._parent._ts_children = ++iid);
      this._ts_pin = ++iid;
      this.touch();
      return this;
    };
    Node2.prototype.hide = function() {
      this.visible(false);
      return this;
    };
    Node2.prototype.show = function() {
      this.visible(true);
      return this;
    };
    Node2.prototype.parent = function() {
      return this._parent;
    };
    Node2.prototype.next = function(visible) {
      var next = this._next;
      while (next && visible && !next._visible) {
        next = next._next;
      }
      return next;
    };
    Node2.prototype.prev = function(visible) {
      var prev = this._prev;
      while (prev && visible && !prev._visible) {
        prev = prev._prev;
      }
      return prev;
    };
    Node2.prototype.first = function(visible) {
      var next = this._first;
      while (next && visible && !next._visible) {
        next = next._next;
      }
      return next;
    };
    Node2.prototype.last = function(visible) {
      var prev = this._last;
      while (prev && visible && !prev._visible) {
        prev = prev._prev;
      }
      return prev;
    };
    Node2.prototype.visit = function(visitor, payload) {
      var reverse = visitor.reverse;
      var visible = visitor.visible;
      if (visitor.start && visitor.start(this, payload)) {
        return;
      }
      var child;
      var next = reverse ? this.last(visible) : this.first(visible);
      while (child = next) {
        next = reverse ? child.prev(visible) : child.next(visible);
        if (child.visit(visitor, payload)) {
          return true;
        }
      }
      return visitor.end && visitor.end(this, payload);
    };
    Node2.prototype.append = function(child, more) {
      if (Array.isArray(child)) {
        for (var i = 0; i < child.length; i++) {
          Node2.append(this, child[i]);
        }
      } else if (typeof more !== "undefined") {
        for (var i = 0; i < arguments.length; i++) {
          Node2.append(this, arguments[i]);
        }
      } else if (typeof child !== "undefined")
        Node2.append(this, child);
      return this;
    };
    Node2.prototype.prepend = function(child, more) {
      if (Array.isArray(child)) {
        for (var i = child.length - 1; i >= 0; i--) {
          Node2.prepend(this, child[i]);
        }
      } else if (typeof more !== "undefined") {
        for (var i = arguments.length - 1; i >= 0; i--) {
          Node2.prepend(this, arguments[i]);
        }
      } else if (typeof child !== "undefined")
        Node2.prepend(this, child);
      return this;
    };
    Node2.prototype.appendTo = function(parent) {
      Node2.append(parent, this);
      return this;
    };
    Node2.prototype.prependTo = function(parent) {
      Node2.prepend(parent, this);
      return this;
    };
    Node2.prototype.insertNext = function(sibling, more) {
      if (Array.isArray(sibling)) {
        for (var i = 0; i < sibling.length; i++) {
          Node2.insertAfter(sibling[i], this);
        }
      } else if (typeof more !== "undefined") {
        for (var i = 0; i < arguments.length; i++) {
          Node2.insertAfter(arguments[i], this);
        }
      } else if (typeof sibling !== "undefined") {
        Node2.insertAfter(sibling, this);
      }
      return this;
    };
    Node2.prototype.insertPrev = function(sibling, more) {
      if (Array.isArray(sibling)) {
        for (var i = sibling.length - 1; i >= 0; i--) {
          Node2.insertBefore(sibling[i], this);
        }
      } else if (typeof more !== "undefined") {
        for (var i = arguments.length - 1; i >= 0; i--) {
          Node2.insertBefore(arguments[i], this);
        }
      } else if (typeof sibling !== "undefined") {
        Node2.insertBefore(sibling, this);
      }
      return this;
    };
    Node2.prototype.insertAfter = function(prev) {
      Node2.insertAfter(this, prev);
      return this;
    };
    Node2.prototype.insertBefore = function(next) {
      Node2.insertBefore(this, next);
      return this;
    };
    Node2.append = function(parent, child) {
      assertType(child);
      assertType(parent);
      child.remove();
      if (parent._last) {
        parent._last._next = child;
        child._prev = parent._last;
      }
      child._parent = parent;
      parent._last = child;
      if (!parent._first) {
        parent._first = child;
      }
      child._parent._flag(child, true);
      child._ts_parent = ++iid;
      parent._ts_children = ++iid;
      parent.touch();
    };
    Node2.prepend = function(parent, child) {
      assertType(child);
      assertType(parent);
      child.remove();
      if (parent._first) {
        parent._first._prev = child;
        child._next = parent._first;
      }
      child._parent = parent;
      parent._first = child;
      if (!parent._last) {
        parent._last = child;
      }
      child._parent._flag(child, true);
      child._ts_parent = ++iid;
      parent._ts_children = ++iid;
      parent.touch();
    };
    Node2.insertBefore = function(self, next) {
      assertType(self);
      assertType(next);
      self.remove();
      var parent = next._parent;
      var prev = next._prev;
      if (!parent) {
        return;
      }
      next._prev = self;
      prev && (prev._next = self) || parent && (parent._first = self);
      self._parent = parent;
      self._prev = prev;
      self._next = next;
      self._parent._flag(self, true);
      self._ts_parent = ++iid;
      self.touch();
    };
    Node2.insertAfter = function(self, prev) {
      assertType(self);
      assertType(prev);
      self.remove();
      var parent = prev._parent;
      var next = prev._next;
      if (!parent) {
        return;
      }
      prev._next = self;
      next && (next._prev = self) || parent && (parent._last = self);
      self._parent = parent;
      self._prev = prev;
      self._next = next;
      self._parent._flag(self, true);
      self._ts_parent = ++iid;
      self.touch();
    };
    Node2.prototype.remove = function(child, more) {
      if (typeof child !== "undefined") {
        if (Array.isArray(child)) {
          for (var i = 0; i < child.length; i++) {
            assertType(child[i]).remove();
          }
        } else if (typeof more !== "undefined") {
          for (var i = 0; i < arguments.length; i++) {
            assertType(arguments[i]).remove();
          }
        } else {
          assertType(child).remove();
        }
        return this;
      }
      if (this._prev) {
        this._prev._next = this._next;
      }
      if (this._next) {
        this._next._prev = this._prev;
      }
      if (this._parent) {
        if (this._parent._first === this) {
          this._parent._first = this._next;
        }
        if (this._parent._last === this) {
          this._parent._last = this._prev;
        }
        this._parent._flag(this, false);
        this._parent._ts_children = ++iid;
        this._parent.touch();
      }
      this._prev = this._next = this._parent = null;
      this._ts_parent = ++iid;
      return this;
    };
    Node2.prototype.empty = function() {
      var child = null;
      var next = this._first;
      while (child = next) {
        next = child._next;
        child._prev = child._next = child._parent = null;
        this._flag(child, false);
      }
      this._first = this._last = null;
      this._ts_children = ++iid;
      this.touch();
      return this;
    };
    Node2.prototype.touch = function() {
      this._ts_touch = ++iid;
      this._parent && this._parent.touch();
      return this;
    };
    Node2.prototype._flag = function(key, value) {
      if (typeof value === "undefined") {
        return this._flags !== null && this._flags[key] || 0;
      }
      if (typeof key === "string") {
        if (value) {
          this._flags = this._flags || {};
          if (!this._flags[key] && this._parent) {
            this._parent._flag(key, true);
          }
          this._flags[key] = (this._flags[key] || 0) + 1;
        } else if (this._flags && this._flags[key] > 0) {
          if (this._flags[key] == 1 && this._parent) {
            this._parent._flag(key, false);
          }
          this._flags[key] = this._flags[key] - 1;
        }
      }
      if (typeof key === "object") {
        if (key._flags) {
          for (var type in key._flags) {
            if (key._flags[type] > 0) {
              this._flag(type, value);
            }
          }
        }
      }
      return this;
    };
    Node2.prototype.hitTest = function(hit) {
      var width = this._pin._width;
      var height = this._pin._height;
      return hit.x >= 0 && hit.x <= width && hit.y >= 0 && hit.y <= height;
    };
    Node2.prototype.prerender = function() {
      if (!this._visible) {
        return;
      }
      this.prerenderTexture();
      var child;
      var next = this._first;
      while (child = next) {
        next = child._next;
        child.prerender();
      }
    };
    Node2.prototype.prerenderTexture = function() {
    };
    Node2.prototype.render = function(context) {
      if (!this._visible) {
        return;
      }
      stats.node++;
      var m = this.matrix();
      context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);
      this._alpha = this._pin._alpha * (this._parent ? this._parent._alpha : 1);
      var alpha = this._pin._textureAlpha * this._alpha;
      if (context.globalAlpha != alpha) {
        context.globalAlpha = alpha;
      }
      if (!this.renderedBefore) {
        this.prerenderTexture();
      }
      this.renderedBefore = true;
      this.renderTexture(context);
      if (context.globalAlpha != this._alpha) {
        context.globalAlpha = this._alpha;
      }
      var child;
      var next = this._first;
      while (child = next) {
        next = child._next;
        child.render(context);
      }
    };
    Node2.prototype.renderTexture = function(context) {
    };
    Node2.prototype._tick = function(elapsed, now2, last) {
      if (!this._visible) {
        return;
      }
      if (elapsed > this.MAX_ELAPSE) {
        elapsed = this.MAX_ELAPSE;
      }
      var ticked = false;
      if (this._tickBefore !== null) {
        for (var i = 0; i < this._tickBefore.length; i++) {
          stats.tick++;
          var tickFn = this._tickBefore[i];
          ticked = tickFn.call(this, elapsed, now2, last) === true || ticked;
        }
      }
      var child;
      var next = this._first;
      while (child = next) {
        next = child._next;
        if (child._flag("_tick")) {
          ticked = child._tick(elapsed, now2, last) === true ? true : ticked;
        }
      }
      if (this._tickAfter !== null) {
        for (var i = 0; i < this._tickAfter.length; i++) {
          stats.tick++;
          var tickFn = this._tickAfter[i];
          ticked = tickFn.call(this, elapsed, now2, last) === true || ticked;
        }
      }
      return ticked;
    };
    Node2.prototype.tick = function(callback, before) {
      var _a2, _b;
      if (before === void 0) {
        before = false;
      }
      if (typeof callback !== "function") {
        return;
      }
      if (before) {
        if (this._tickBefore === null) {
          this._tickBefore = [];
        }
        this._tickBefore.push(callback);
      } else {
        if (this._tickAfter === null) {
          this._tickAfter = [];
        }
        this._tickAfter.push(callback);
      }
      var hasTickListener = ((_a2 = this._tickAfter) === null || _a2 === void 0 ? void 0 : _a2.length) > 0 || ((_b = this._tickBefore) === null || _b === void 0 ? void 0 : _b.length) > 0;
      this._flag("_tick", hasTickListener);
    };
    Node2.prototype.untick = function(callback) {
      if (typeof callback !== "function") {
        return;
      }
      var i;
      if (this._tickBefore !== null && (i = this._tickBefore.indexOf(callback)) >= 0) {
        this._tickBefore.splice(i, 1);
      }
      if (this._tickAfter !== null && (i = this._tickAfter.indexOf(callback)) >= 0) {
        this._tickAfter.splice(i, 1);
      }
    };
    Node2.prototype.timeout = function(callback, time) {
      this.setTimeout(callback, time);
    };
    Node2.prototype.setTimeout = function(callback, time) {
      function timer(t) {
        if ((time -= t) < 0) {
          this.untick(timer);
          callback.call(this);
        } else {
          return true;
        }
      }
      this.tick(timer);
      return timer;
    };
    Node2.prototype.clearTimeout = function(timer) {
      this.untick(timer);
    };
    Node2.prototype.on = function(type, listener) {
      if (!type || !type.length || typeof listener !== "function") {
        return this;
      }
      if (typeof type !== "string" && typeof type.join === "function") {
        for (var i = 0; i < type.length; i++) {
          this.on(type[i], listener);
        }
      } else if (typeof type === "string" && type.indexOf(" ") > -1) {
        type = type.match(/\S+/g);
        for (var i = 0; i < type.length; i++) {
          this._on(type[i], listener);
        }
      } else if (typeof type === "string") {
        this._on(type, listener);
      } else ;
      return this;
    };
    Node2.prototype._on = function(type, listener) {
      if (typeof type !== "string" && typeof listener !== "function") {
        return;
      }
      this._listeners[type] = this._listeners[type] || [];
      this._listeners[type].push(listener);
      this._flag(type, true);
    };
    Node2.prototype.off = function(type, listener) {
      if (!type || !type.length || typeof listener !== "function") {
        return this;
      }
      if (typeof type !== "string" && typeof type.join === "function") {
        for (var i = 0; i < type.length; i++) {
          this.off(type[i], listener);
        }
      } else if (typeof type === "string" && type.indexOf(" ") > -1) {
        type = type.match(/\S+/g);
        for (var i = 0; i < type.length; i++) {
          this._off(type[i], listener);
        }
      } else if (typeof type === "string") {
        this._off(type, listener);
      } else ;
      return this;
    };
    Node2.prototype._off = function(type, listener) {
      if (typeof type !== "string" && typeof listener !== "function") {
        return;
      }
      var listeners = this._listeners[type];
      if (!listeners || !listeners.length) {
        return;
      }
      var index = listeners.indexOf(listener);
      if (index >= 0) {
        listeners.splice(index, 1);
        this._flag(type, false);
      }
    };
    Node2.prototype.listeners = function(type) {
      return this._listeners[type];
    };
    Node2.prototype.publish = function(name, args) {
      var listeners = this.listeners(name);
      if (!listeners || !listeners.length) {
        return 0;
      }
      for (var l = 0; l < listeners.length; l++) {
        listeners[l].apply(this, args);
      }
      return listeners.length;
    };
    Node2.prototype.trigger = function(name, args) {
      this.publish(name, args);
      return this;
    };
    Node2.prototype.size = function(w, h) {
      this.pin("width", w);
      this.pin("height", h);
      return this;
    };
    Node2.prototype.width = function(w) {
      if (typeof w === "undefined") {
        return this.pin("width");
      }
      this.pin("width", w);
      return this;
    };
    Node2.prototype.height = function(h) {
      if (typeof h === "undefined") {
        return this.pin("height");
      }
      this.pin("height", h);
      return this;
    };
    Node2.prototype.offset = function(a2, b2) {
      if (typeof a2 === "object") {
        b2 = a2.y;
        a2 = a2.x;
      }
      this.pin("offsetX", a2);
      this.pin("offsetY", b2);
      return this;
    };
    Node2.prototype.rotate = function(a2) {
      this.pin("rotation", a2);
      return this;
    };
    Node2.prototype.skew = function(a2, b2) {
      if (typeof a2 === "object") {
        b2 = a2.y;
        a2 = a2.x;
      } else if (typeof b2 === "undefined")
        b2 = a2;
      this.pin("skewX", a2);
      this.pin("skewY", b2);
      return this;
    };
    Node2.prototype.scale = function(a2, b2) {
      if (typeof a2 === "object") {
        b2 = a2.y;
        a2 = a2.x;
      } else if (typeof b2 === "undefined")
        b2 = a2;
      this.pin("scaleX", a2);
      this.pin("scaleY", b2);
      return this;
    };
    Node2.prototype.alpha = function(a2, ta) {
      this.pin("alpha", a2);
      if (typeof ta !== "undefined") {
        this.pin("textureAlpha", ta);
      }
      return this;
    };
    Node2.prototype.tween = function(a2, b2, c2) {
      var options2;
      if (typeof a2 === "object" && a2 !== null) {
        options2 = a2;
      } else {
        options2 = {};
        if (typeof a2 === "number") {
          options2.duration = a2;
          if (typeof b2 === "number") {
            options2.delay = b2;
            if (typeof c2 === "boolean") {
              options2.append = c2;
            }
          } else if (typeof b2 === "boolean") {
            options2.append = b2;
          }
        } else if (typeof a2 === "boolean") {
          options2.append = a2;
        }
      }
      if (!this._transitionTickInitied) {
        this.tick(this._transitionTick, true);
        this._transitionTickInitied = true;
      }
      this.touch();
      if (!options2.append) {
        this._transitions.length = 0;
      }
      var transition = new Transition(this, options2);
      this._transitions.push(transition);
      return transition;
    };
    Node2.prototype.row = function(align) {
      this.align("row", align);
      return this;
    };
    Node2.prototype.column = function(align) {
      this.align("column", align);
      return this;
    };
    Node2.prototype.align = function(type, align) {
      var _this = this;
      this._padding = this._padding;
      this._spacing = this._spacing;
      this._layoutTicker && this.untick(this._layoutTicker);
      this.tick(this._layoutTicker = function() {
        if (_this._mo_seq == _this._ts_touch) {
          return;
        }
        _this._mo_seq = _this._ts_touch;
        var alignChildren = _this._mo_seqAlign != _this._ts_children;
        _this._mo_seqAlign = _this._ts_children;
        var width = 0;
        var height = 0;
        var child;
        var next = _this.first(true);
        var first = true;
        while (child = next) {
          next = child.next(true);
          child.matrix(true);
          var w = child.pin("boxWidth");
          var h = child.pin("boxHeight");
          if (type == "column") {
            !first && (height += _this._spacing);
            child.pin("offsetY") != height && child.pin("offsetY", height);
            width = Math.max(width, w);
            height = height + h;
            alignChildren && child.pin("alignX", align);
          } else if (type == "row") {
            !first && (width += _this._spacing);
            child.pin("offsetX") != width && child.pin("offsetX", width);
            width = width + w;
            height = Math.max(height, h);
            alignChildren && child.pin("alignY", align);
          }
          first = false;
        }
        width += 2 * _this._padding;
        height += 2 * _this._padding;
        _this.pin("width") != width && _this.pin("width", width);
        _this.pin("height") != height && _this.pin("height", height);
      });
      return this;
    };
    Node2.prototype.box = function() {
      return this.minimize();
    };
    Node2.prototype.layer = function() {
      return this.maximize();
    };
    Node2.prototype.minimize = function() {
      var _this = this;
      this._padding = this._padding;
      this._layoutTicker && this.untick(this._layoutTicker);
      this.tick(this._layoutTicker = function() {
        if (_this._mo_box == _this._ts_touch) {
          return;
        }
        _this._mo_box = _this._ts_touch;
        var width = 0;
        var height = 0;
        var child;
        var next = _this.first(true);
        while (child = next) {
          next = child.next(true);
          child.matrix(true);
          var w = child.pin("boxWidth");
          var h = child.pin("boxHeight");
          width = Math.max(width, w);
          height = Math.max(height, h);
        }
        width += 2 * _this._padding;
        height += 2 * _this._padding;
        _this.pin("width") != width && _this.pin("width", width);
        _this.pin("height") != height && _this.pin("height", height);
      });
      return this;
    };
    Node2.prototype.maximize = function() {
      var _this = this;
      this._layoutTicker && this.untick(this._layoutTicker);
      this.tick(this._layoutTicker = function() {
        var parent = _this.parent();
        if (parent) {
          var width = parent.pin("width");
          if (_this.pin("width") != width) {
            _this.pin("width", width);
          }
          var height = parent.pin("height");
          if (_this.pin("height") != height) {
            _this.pin("height", height);
          }
        }
      }, true);
      return this;
    };
    Node2.prototype.padding = function(pad) {
      this._padding = pad;
      return this;
    };
    Node2.prototype.spacing = function(space) {
      this._spacing = space;
      return this;
    };
    return Node2;
  }()
);
function sprite(frame) {
  var sprite2 = new Sprite();
  frame && sprite2.texture(frame);
  return sprite2;
}
var Sprite = (
  /** @class */
  function(_super) {
    __extends(Sprite2, _super);
    function Sprite2() {
      var _this = _super.call(this) || this;
      _this._texture = null;
      _this._image = null;
      _this._tiled = false;
      _this._stretched = false;
      _this.prerenderContext = {};
      _this.label("Sprite");
      return _this;
    }
    Sprite2.prototype.texture = function(frame) {
      this._image = texture(frame).one();
      if (this._image) {
        this.pin("width", this._image.getWidth());
        this.pin("height", this._image.getHeight());
        if (this._tiled) {
          this._texture = new ResizableTexture(this._image, "tile");
        } else if (this._stretched) {
          this._texture = new ResizableTexture(this._image, "stretch");
        } else {
          this._texture = new PipeTexture(this._image);
        }
      } else {
        this.pin("width", 0);
        this.pin("height", 0);
        this._texture = null;
      }
      return this;
    };
    Sprite2.prototype.image = function(frame) {
      return this.texture(frame);
    };
    Sprite2.prototype.tile = function(inner) {
      this._tiled = true;
      var texture2 = new ResizableTexture(this._image, "tile");
      this._texture = texture2;
      return this;
    };
    Sprite2.prototype.stretch = function(inner) {
      this._stretched = true;
      var texture2 = new ResizableTexture(this._image, "stretch");
      this._texture = texture2;
      return this;
    };
    Sprite2.prototype.prerenderTexture = function() {
      if (!this._image)
        return;
      var pixelRatio = this.getDevicePixelRatio();
      this.prerenderContext.pixelRatio = pixelRatio;
      var updated = this._image.prerender(this.prerenderContext);
      if (updated === true) {
        var w = this._image.getWidth();
        var h = this._image.getHeight();
        this.size(w, h);
      }
    };
    Sprite2.prototype.renderTexture = function(context) {
      if (!this._texture)
        return;
      if (this._texture["_resizeMode"]) {
        this._texture.dw = this.pin("width");
        this._texture.dh = this.pin("height");
      }
      this._texture.draw(context);
    };
    return Sprite2;
  }(Node)
);
var CanvasTexture = (
  /** @class */
  function(_super) {
    __extends(CanvasTexture2, _super);
    function CanvasTexture2() {
      var _this = _super.call(this, document.createElement("canvas")) || this;
      _this._lastPixelRatio = 0;
      return _this;
    }
    CanvasTexture2.prototype.setSize = function(destWidth, destHeight, pixelRatio) {
      if (pixelRatio === void 0) {
        pixelRatio = 1;
      }
      this._source.width = destWidth * pixelRatio;
      this._source.height = destHeight * pixelRatio;
      this._pixelRatio = pixelRatio;
    };
    CanvasTexture2.prototype.getContext = function(type, attributes) {
      if (type === void 0) {
        type = "2d";
      }
      return this._source.getContext(type, attributes);
    };
    CanvasTexture2.prototype.getDevicePixelRatio = function() {
      return this._lastPixelRatio;
    };
    CanvasTexture2.prototype.getOptimalPixelRatio = function() {
      return this.getDevicePixelRatio();
    };
    CanvasTexture2.prototype.setMemoizer = function(memoizer) {
      this._memoizer = memoizer;
    };
    CanvasTexture2.prototype.setDrawer = function(drawer) {
      this._drawer = drawer;
    };
    CanvasTexture2.prototype.prerender = function(context) {
      var newPixelRatio = context.pixelRatio;
      var lastPixelRatio = this._lastPixelRatio;
      var pixelRationChange = lastPixelRatio / newPixelRatio;
      var pixelRatioChanged = lastPixelRatio === 0 || pixelRationChange > 1.25 || pixelRationChange < 0.8;
      if (pixelRatioChanged) {
        this._lastPixelRatio = newPixelRatio;
      }
      var newMemoKey = this._memoizer ? this._memoizer.call(this) : null;
      var memoKeyChanged = this._lastMemoKey !== newMemoKey;
      if (pixelRatioChanged || memoKeyChanged) {
        this._lastMemoKey = newMemoKey;
        this._lastPixelRatio = newPixelRatio;
        if (typeof this._drawer === "function") {
          this._drawer.call(this);
        }
        return true;
      }
    };
    CanvasTexture2.prototype.size = function(width, height, pixelRatio) {
      this.setSize(width, height, pixelRatio);
      return this;
    };
    CanvasTexture2.prototype.context = function(type, attributes) {
      if (type === void 0) {
        type = "2d";
      }
      return this.getContext(type, attributes);
    };
    CanvasTexture2.prototype.canvas = function(legacyTextureDrawer) {
      if (typeof legacyTextureDrawer === "function") {
        legacyTextureDrawer.call(this, this.getContext());
      } else if (typeof legacyTextureDrawer === "undefined") {
        if (typeof this._drawer === "function") {
          this._drawer.call(this);
        }
      }
      return this;
    };
    return CanvasTexture2;
  }(ImageTexture)
);
function canvas(type, attributes, legacyTextureDrawer) {
  if (typeof type === "function") {
    var texture_1 = new CanvasTexture();
    legacyTextureDrawer = type;
    texture_1.setDrawer(function() {
      legacyTextureDrawer.call(texture_1, texture_1.getContext());
    });
    return texture_1;
  } else if (typeof attributes === "function") {
    var texture_2 = new CanvasTexture();
    legacyTextureDrawer = attributes;
    texture_2.setDrawer(function() {
      legacyTextureDrawer.call(texture_2, texture_2.getContext(type));
    });
    return texture_2;
  } else if (typeof legacyTextureDrawer === "function") {
    var texture_3 = new CanvasTexture();
    texture_3.setDrawer(function() {
      legacyTextureDrawer.call(texture_3, texture_3.getContext(type, attributes));
    });
    return texture_3;
  } else {
    var texture2 = new CanvasTexture();
    return texture2;
  }
}
var POINTER_DOWN = "touchstart mousedown";
var POINTER_MOVE = "touchmove mousemove";
var POINTER_UP = "touchend mouseup";
var POINTER_CANCEL = "touchcancel mousecancel";
var EventPoint = (
  /** @class */
  function() {
    function EventPoint2() {
    }
    EventPoint2.prototype.clone = function(obj) {
      if (obj) {
        obj.x = this.x;
        obj.y = this.y;
      } else {
        obj = {
          x: this.x,
          y: this.y
        };
      }
      return obj;
    };
    EventPoint2.prototype.toString = function() {
      return (this.x | 0) + "x" + (this.y | 0);
    };
    return EventPoint2;
  }()
);
var PointerSyntheticEvent = (
  /** @class */
  function() {
    function PointerSyntheticEvent2() {
      this.abs = new EventPoint();
    }
    PointerSyntheticEvent2.prototype.clone = function(obj) {
      if (obj) {
        obj.x = this.x;
        obj.y = this.y;
      } else {
        obj = {
          x: this.x,
          y: this.y
        };
      }
      return obj;
    };
    PointerSyntheticEvent2.prototype.toString = function() {
      return this.type + ": " + (this.x | 0) + "x" + (this.y | 0);
    };
    return PointerSyntheticEvent2;
  }()
);
var VisitPayload = (
  /** @class */
  function() {
    function VisitPayload2() {
      this.type = "";
      this.x = 0;
      this.y = 0;
      this.timeStamp = -1;
      this.event = null;
      this.root = null;
      this.collected = null;
    }
    VisitPayload2.prototype.toString = function() {
      return this.type + ": " + (this.x | 0) + "x" + (this.y | 0);
    };
    return VisitPayload2;
  }()
);
var syntheticEvent = new PointerSyntheticEvent();
var PAYLOAD = new VisitPayload();
var Pointer = (
  /** @class */
  function() {
    function Pointer2() {
      var _this = this;
      this.ratio = 1;
      this.clickList = [];
      this.cancelList = [];
      this.handleStart = function(event) {
        Pointer2.DEBUG && console.debug && console.debug("pointer-start", event.type);
        event.preventDefault();
        _this.localPoint(event);
        _this.dispatchEvent(event.type, event);
        _this.findTargets("click", _this.clickList);
        _this.findTargets("mousecancel", _this.cancelList);
      };
      this.handleMove = function(event) {
        event.preventDefault();
        _this.localPoint(event);
        _this.dispatchEvent(event.type, event);
      };
      this.handleEnd = function(event) {
        var _a2;
        event.preventDefault();
        Pointer2.DEBUG && console.debug && console.debug("pointer-end", event.type);
        _this.dispatchEvent(event.type, event);
        if (_this.clickList.length) {
          Pointer2.DEBUG && console.debug && console.debug("pointer-click: ", event.type, (_a2 = _this.clickList) === null || _a2 === void 0 ? void 0 : _a2.length);
          _this.dispatchEvent("click", event, _this.clickList);
        }
        _this.cancelList.length = 0;
      };
      this.handleCancel = function(event) {
        var _a2;
        if (_this.cancelList.length) {
          Pointer2.DEBUG && console.debug && console.debug("pointer-cancel", event.type, (_a2 = _this.clickList) === null || _a2 === void 0 ? void 0 : _a2.length);
          _this.dispatchEvent("mousecancel", event, _this.cancelList);
        }
        _this.clickList.length = 0;
      };
      this.visitStart = function(node, payload) {
        return !node._flag(payload.type);
      };
      this.visitEnd = function(node, payload) {
        syntheticEvent.raw = payload.event;
        syntheticEvent.type = payload.type;
        syntheticEvent.timeStamp = payload.timeStamp;
        syntheticEvent.abs.x = payload.x;
        syntheticEvent.abs.y = payload.y;
        var listeners = node.listeners(payload.type);
        if (!listeners) {
          return;
        }
        node.matrix().inverse().map(payload, syntheticEvent);
        var isEventTarget = node === payload.root || node.attr("spy") || node.hitTest(syntheticEvent);
        if (!isEventTarget) {
          return;
        }
        if (payload.collected) {
          payload.collected.push(node);
        }
        if (payload.event) {
          var stop_1 = false;
          for (var l = 0; l < listeners.length; l++) {
            stop_1 = listeners[l].call(node, syntheticEvent) ? true : stop_1;
          }
          return stop_1;
        }
      };
    }
    Pointer2.prototype.mount = function(stage, elem) {
      var _this = this;
      this.stage = stage;
      this.elem = elem;
      this.ratio = stage.viewport().ratio || 1;
      stage.on("viewport", function(viewport) {
        var _a2;
        _this.ratio = (_a2 = viewport.ratio) !== null && _a2 !== void 0 ? _a2 : _this.ratio;
      });
      elem.addEventListener("touchstart", this.handleStart);
      elem.addEventListener("touchend", this.handleEnd);
      elem.addEventListener("touchmove", this.handleMove);
      elem.addEventListener("touchcancel", this.handleCancel);
      elem.addEventListener("mousedown", this.handleStart);
      elem.addEventListener("mouseup", this.handleEnd);
      elem.addEventListener("mousemove", this.handleMove);
      document.addEventListener("mouseup", this.handleCancel);
      window.addEventListener("blur", this.handleCancel);
      return this;
    };
    Pointer2.prototype.unmount = function() {
      var elem = this.elem;
      elem.removeEventListener("touchstart", this.handleStart);
      elem.removeEventListener("touchend", this.handleEnd);
      elem.removeEventListener("touchmove", this.handleMove);
      elem.removeEventListener("touchcancel", this.handleCancel);
      elem.removeEventListener("mousedown", this.handleStart);
      elem.removeEventListener("mouseup", this.handleEnd);
      elem.removeEventListener("mousemove", this.handleMove);
      document.removeEventListener("mouseup", this.handleCancel);
      window.removeEventListener("blur", this.handleCancel);
      return this;
    };
    Pointer2.prototype.localPoint = function(event) {
      var _a2;
      var elem = this.elem;
      var x2;
      var y;
      if ((_a2 = event.touches) === null || _a2 === void 0 ? void 0 : _a2.length) {
        x2 = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else {
        x2 = event.clientX;
        y = event.clientY;
      }
      var rect = elem.getBoundingClientRect();
      x2 -= rect.left;
      y -= rect.top;
      x2 -= elem.clientLeft | 0;
      y -= elem.clientTop | 0;
      PAYLOAD.x = x2 * this.ratio;
      PAYLOAD.y = y * this.ratio;
    };
    Pointer2.prototype.findTargets = function(type, result) {
      var payload = PAYLOAD;
      payload.type = type;
      payload.root = this.stage;
      payload.event = null;
      payload.collected = result;
      payload.collected.length = 0;
      this.stage.visit({
        reverse: true,
        visible: true,
        start: this.visitStart,
        end: this.visitEnd
      }, payload);
    };
    Pointer2.prototype.dispatchEvent = function(type, event, targets) {
      var payload = PAYLOAD;
      payload.type = type;
      payload.root = this.stage;
      payload.event = event;
      payload.timeStamp = Date.now();
      payload.collected = null;
      if (type !== "mousemove" && type !== "touchmove") {
        Pointer2.DEBUG && console.debug && console.debug("pointer:dispatchEvent", payload, targets === null || targets === void 0 ? void 0 : targets.length);
      }
      if (targets) {
        while (targets.length) {
          var node = targets.shift();
          if (this.visitEnd(node, payload)) {
            break;
          }
        }
        targets.length = 0;
      } else {
        this.stage.visit({
          reverse: true,
          visible: true,
          start: this.visitStart,
          end: this.visitEnd
        }, payload);
      }
    };
    Pointer2.DEBUG = false;
    return Pointer2;
  }()
);
function mount(configs) {
  if (configs === void 0) {
    configs = {};
  }
  var root = new Root();
  root.mount(configs);
  root.pointer = new Pointer().mount(root, root.dom);
  return root;
}
var Root = (
  /** @class */
  function(_super) {
    __extends(Root2, _super);
    function Root2() {
      var _this = _super.call(this) || this;
      _this.canvas = null;
      _this.dom = null;
      _this.context = null;
      _this.pixelWidth = -1;
      _this.pixelHeight = -1;
      _this.pixelRatio = 1;
      _this.drawingWidth = 0;
      _this.drawingHeight = 0;
      _this.mounted = false;
      _this.paused = false;
      _this.sleep = false;
      _this.mount = function(configs) {
        if (configs === void 0) {
          configs = {};
        }
        if (typeof configs.canvas === "string") {
          _this.canvas = document.getElementById(configs.canvas);
          if (!_this.canvas) {
            console.error("Canvas element not found: ", configs.canvas);
          }
        } else if (configs.canvas instanceof HTMLCanvasElement) {
          _this.canvas = configs.canvas;
        } else if (configs.canvas) {
          console.error("Unknown value for canvas:", configs.canvas);
        }
        if (!_this.canvas) {
          _this.canvas = document.getElementById("cutjs") || document.getElementById("stage");
        }
        if (!_this.canvas) {
          console.debug && console.debug("Creating canvas element...");
          _this.canvas = document.createElement("canvas");
          Object.assign(_this.canvas.style, {
            position: "absolute",
            display: "block",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            width: "100%",
            height: "100%"
          });
          var body = document.body;
          body.insertBefore(_this.canvas, body.firstChild);
        }
        _this.dom = _this.canvas;
        _this.context = _this.canvas.getContext("2d");
        _this.devicePixelRatio = window.devicePixelRatio || 1;
        _this.backingStoreRatio = _this.context["webkitBackingStorePixelRatio"] || _this.context["mozBackingStorePixelRatio"] || _this.context["msBackingStorePixelRatio"] || _this.context["oBackingStorePixelRatio"] || _this.context["backingStorePixelRatio"] || 1;
        _this.pixelRatio = _this.devicePixelRatio / _this.backingStoreRatio;
        _this.mounted = true;
        _this.requestFrame();
      };
      _this.frameRequested = false;
      _this.requestFrame = function() {
        if (!_this.frameRequested) {
          _this.frameRequested = true;
          requestAnimationFrame(_this.onFrame);
        }
      };
      _this._lastFrameTime = 0;
      _this._mo_touch = null;
      _this.onFrame = function(now2) {
        _this.frameRequested = false;
        if (!_this.mounted || !_this.canvas || !_this.context) {
          return;
        }
        _this.requestFrame();
        var newPixelWidth = _this.canvas.clientWidth;
        var newPixelHeight = _this.canvas.clientHeight;
        if (_this.pixelWidth !== newPixelWidth || _this.pixelHeight !== newPixelHeight) {
          _this.pixelWidth = newPixelWidth;
          _this.pixelHeight = newPixelHeight;
          _this.drawingWidth = newPixelWidth * _this.pixelRatio;
          _this.drawingHeight = newPixelHeight * _this.pixelRatio;
          if (_this.canvas.width !== _this.drawingWidth || _this.canvas.height !== _this.drawingHeight) {
            _this.canvas.width = _this.drawingWidth;
            _this.canvas.height = _this.drawingHeight;
            console.debug && console.debug("Resize: [" + _this.drawingWidth + ", " + _this.drawingHeight + "] = " + _this.pixelRatio + " x [" + _this.pixelWidth + ", " + _this.pixelHeight + "]");
            _this.viewport({
              width: _this.drawingWidth,
              height: _this.drawingHeight,
              ratio: _this.pixelRatio
            });
          }
        }
        var last = _this._lastFrameTime || now2;
        var elapsed = now2 - last;
        if (!_this.mounted || _this.paused || _this.sleep) {
          return;
        }
        _this._lastFrameTime = now2;
        _this.prerender();
        var tickRequest = _this._tick(elapsed, now2, last);
        if (_this._mo_touch != _this._ts_touch) {
          _this._mo_touch = _this._ts_touch;
          _this.sleep = false;
          if (_this.drawingWidth > 0 && _this.drawingHeight > 0) {
            _this.context.setTransform(1, 0, 0, 1, 0, 0);
            _this.context.clearRect(0, 0, _this.drawingWidth, _this.drawingHeight);
            if (_this.debugDrawAxis > 0) {
              _this.renderDebug(_this.context);
            }
            _this.render(_this.context);
          }
        } else if (tickRequest) {
          _this.sleep = false;
        } else {
          _this.sleep = true;
        }
        stats.fps = elapsed ? 1e3 / elapsed : 0;
      };
      _this.debugDrawAxis = 0;
      _this.label("Root");
      return _this;
    }
    Root2.prototype.renderDebug = function(context) {
      var size = typeof this.debugDrawAxis === "number" ? this.debugDrawAxis : 10;
      var m = this.matrix();
      context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);
      var lineWidth = 3 / m.a;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, 0.8 * size);
      context.lineTo(-0.2 * size, 0.8 * size);
      context.lineTo(0, size);
      context.lineTo(0.2 * size, 0.8 * size);
      context.lineTo(0, 0.8 * size);
      context.strokeStyle = "rgba(93, 173, 226)";
      context.lineJoin = "round";
      context.lineCap = "round";
      context.lineWidth = lineWidth;
      context.stroke();
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0.8 * size, 0);
      context.lineTo(0.8 * size, -0.2 * size);
      context.lineTo(size, 0);
      context.lineTo(0.8 * size, 0.2 * size);
      context.lineTo(0.8 * size, 0);
      context.strokeStyle = "rgba(236, 112, 99)";
      context.lineJoin = "round";
      context.lineCap = "round";
      context.lineWidth = lineWidth;
      context.stroke();
    };
    Root2.prototype.resume = function() {
      if (this.sleep || this.paused) {
        this.requestFrame();
      }
      this.paused = false;
      this.sleep = false;
      this.publish("resume");
      return this;
    };
    Root2.prototype.pause = function() {
      if (!this.paused) {
        this.publish("pause");
      }
      this.paused = true;
      return this;
    };
    Root2.prototype.touch = function() {
      if (this.sleep || this.paused) {
        this.requestFrame();
      }
      this.sleep = false;
      return _super.prototype.touch.call(this);
    };
    Root2.prototype.unmount = function() {
      var _a2;
      this.mounted = false;
      (_a2 = this.pointer) === null || _a2 === void 0 ? void 0 : _a2.unmount();
      return this;
    };
    Root2.prototype.background = function(color) {
      if (this.dom) {
        this.dom.style.backgroundColor = color;
      }
      return this;
    };
    Root2.prototype.viewport = function(width, height, ratio) {
      if (typeof width === "undefined") {
        return Object.assign({}, this._viewport);
      }
      if (typeof width === "object") {
        var options2 = width;
        width = options2.width;
        height = options2.height;
        ratio = options2.ratio;
      }
      if (typeof width === "number" && typeof height === "number") {
        this._viewport = {
          width,
          height,
          ratio: typeof ratio === "number" ? ratio : 1
        };
        this.viewbox();
        var data_1 = Object.assign({}, this._viewport);
        this.visit({
          start: function(node) {
            if (!node._flag("viewport")) {
              return true;
            }
            node.publish("viewport", [data_1]);
          }
        });
      }
      return this;
    };
    Root2.prototype.viewbox = function(width, height, mode) {
      if (typeof width === "number" && typeof height === "number") {
        this._viewbox = {
          width,
          height,
          mode
        };
      } else if (typeof width === "object" && width !== null) {
        this._viewbox = __assign({}, width);
      }
      this.rescale();
      return this;
    };
    Root2.prototype.camera = function(matrix) {
      this._camera = matrix;
      this.rescale();
      return this;
    };
    Root2.prototype.rescale = function() {
      var viewbox = this._viewbox;
      var viewport = this._viewport;
      var camera = this._camera;
      if (viewport && viewbox) {
        var viewportWidth = viewport.width;
        var viewportHeight = viewport.height;
        var viewboxMode = isValidFitMode(viewbox.mode) ? viewbox.mode : "in-pad";
        var viewboxWidth = viewbox.width;
        var viewboxHeight = viewbox.height;
        this.pin({
          width: viewboxWidth,
          height: viewboxHeight
        });
        this.fit(viewportWidth, viewportHeight, viewboxMode);
        var viewboxX = viewbox.x || 0;
        var viewboxY = viewbox.y || 0;
        var cameraZoomX = (camera === null || camera === void 0 ? void 0 : camera.a) || 1;
        var cameraZoomY = (camera === null || camera === void 0 ? void 0 : camera.d) || 1;
        var cameraX = (camera === null || camera === void 0 ? void 0 : camera.e) || 0;
        var cameraY = (camera === null || camera === void 0 ? void 0 : camera.f) || 0;
        var scaleX = this.pin("scaleX");
        var scaleY = this.pin("scaleY");
        this.pin("scaleX", scaleX * cameraZoomX);
        this.pin("scaleY", scaleY * cameraZoomY);
        this.pin("offsetX", cameraX - viewboxX * scaleX * cameraZoomX);
        this.pin("offsetY", cameraY - viewboxY * scaleY * cameraZoomY);
      } else if (viewport) {
        this.pin({
          width: viewport.width,
          height: viewport.height
        });
      }
      return this;
    };
    Root2.prototype.flipX = function(x2) {
      this._pin._directionX = x2 ? -1 : 1;
      return this;
    };
    Root2.prototype.flipY = function(y) {
      this._pin._directionY = y ? -1 : 1;
      return this;
    };
    return Root2;
  }(Node)
);
var FPS = 15;
/** @class */
(function(_super) {
  __extends(Anim2, _super);
  function Anim2() {
    var _this = _super.call(this) || this;
    _this._texture = null;
    _this._frames = [];
    _this._time = -1;
    _this._repeat = 0;
    _this._index = 0;
    _this._animTickLastTime = 0;
    _this._animTick = function(t, now2, last) {
      if (_this._time < 0 || _this._frames.length <= 1) {
        return;
      }
      var ignore = _this._animTickLastTime != last;
      _this._animTickLastTime = now2;
      if (ignore) {
        return true;
      }
      _this._time += t;
      if (_this._time < _this._ft) {
        return true;
      }
      var n2 = _this._time / _this._ft | 0;
      _this._time -= n2 * _this._ft;
      _this.moveFrame(n2);
      if (_this._repeat > 0 && (_this._repeat -= n2) <= 0) {
        _this.stop();
        _this._callback && _this._callback();
        return false;
      }
      return true;
    };
    _this.label("Anim");
    _this._fps = FPS;
    _this._ft = 1e3 / _this._fps;
    _this.tick(_this._animTick, false);
    return _this;
  }
  Anim2.prototype.renderTexture = function(context) {
    if (!this._texture)
      return;
    this._texture.draw(context);
  };
  Anim2.prototype.fps = function(fps) {
    if (typeof fps === "undefined") {
      return this._fps;
    }
    this._fps = fps > 0 ? fps : FPS;
    this._ft = 1e3 / this._fps;
    return this;
  };
  Anim2.prototype.setFrames = function(frames) {
    return this.frames(frames);
  };
  Anim2.prototype.frames = function(frames) {
    this._index = 0;
    this._frames = texture(frames).array();
    this.touch();
    return this;
  };
  Anim2.prototype.length = function() {
    return this._frames ? this._frames.length : 0;
  };
  Anim2.prototype.gotoFrame = function(frame, resize) {
    if (resize === void 0) {
      resize = false;
    }
    this._index = math.wrap(frame, this._frames.length) | 0;
    resize = resize || !this._texture;
    this._texture = this._frames[this._index];
    if (resize) {
      this.pin("width", this._texture.getWidth());
      this.pin("height", this._texture.getHeight());
    }
    this.touch();
    return this;
  };
  Anim2.prototype.moveFrame = function(move) {
    return this.gotoFrame(this._index + move);
  };
  Anim2.prototype.repeat = function(repeat, callback) {
    this._repeat = repeat * this._frames.length - 1;
    this._callback = callback;
    this.play();
    return this;
  };
  Anim2.prototype.play = function(frame) {
    if (typeof frame !== "undefined") {
      this.gotoFrame(frame);
      this._time = 0;
    } else if (this._time < 0) {
      this._time = 0;
    }
    this.touch();
    return this;
  };
  Anim2.prototype.stop = function(frame) {
    this._time = -1;
    if (typeof frame !== "undefined") {
      this.gotoFrame(frame);
    }
    return this;
  };
  return Anim2;
})(Node);
/** @class */
(function(_super) {
  __extends(Monotype2, _super);
  function Monotype2() {
    var _this = _super.call(this) || this;
    _this._textures = [];
    _this.label("Monotype");
    return _this;
  }
  Monotype2.prototype.renderTexture = function(context) {
    if (!this._textures || !this._textures.length)
      return;
    for (var i = 0, n2 = this._textures.length; i < n2; i++) {
      this._textures[i].draw(context);
    }
  };
  Monotype2.prototype.setFont = function(frames) {
    return this.frames(frames);
  };
  Monotype2.prototype.frames = function(frames) {
    this._textures = [];
    if (typeof frames == "string") {
      var selection_1 = texture(frames);
      this._font = function(value) {
        return selection_1.one(value);
      };
    } else if (typeof frames === "object") {
      this._font = function(value) {
        return frames[value];
      };
    } else if (typeof frames === "function") {
      this._font = frames;
    }
    return this;
  };
  Monotype2.prototype.setValue = function(value) {
    return this.value(value);
  };
  Monotype2.prototype.value = function(value) {
    if (typeof value === "undefined") {
      return this._value;
    }
    if (this._value === value) {
      return this;
    }
    this._value = value;
    if (value === null) {
      value = "";
    } else if (typeof value !== "string" && !Array.isArray(value)) {
      value = value.toString();
    }
    this._spacing = this._spacing || 0;
    var width = 0;
    var height = 0;
    for (var i = 0; i < value.length; i++) {
      var v3 = value[i];
      var texture_1 = this._textures[i] = this._font(typeof v3 === "string" ? v3 : v3 + "");
      width += i > 0 ? this._spacing : 0;
      texture_1.setDestinationCoordinate(width, 0);
      width = width + texture_1.getWidth();
      height = Math.max(height, texture_1.getHeight());
    }
    this.pin("width", width);
    this.pin("height", height);
    this._textures.length = value.length;
    return this;
  };
  return Monotype2;
})(Node);
var SHAPE_DEFAULTS = {
  stroke: "rgba(255,255,255,0.9)",
  fill: "rgba(255,255,255,0.1)",
  lineWidth: 3
};
var JOINT_DEFAULTS = {
  stroke: "rgba(255,255,255,0.9)",
  fill: null,
  lineWidth: 3
};
function getStyle(obj) {
  if (typeof obj["render"] === "object" && ("stroke" in obj["render"] || "fill" in obj["render"])) {
    return obj["render"];
  } else if (typeof obj["style"] === "object") {
    return obj["style"];
  }
}
var ComputedShapeStyle = (
  /** @class */
  function() {
    function ComputedShapeStyle2(body, fixture, global) {
      this.body = body;
      this.fixture = fixture;
      this.global = global;
    }
    Object.defineProperty(ComputedShapeStyle2.prototype, "stroke", {
      get: function() {
        var _a2;
        var shapeStyle = getStyle(this.fixture.getShape());
        var fixtureStyle = getStyle(this.fixture);
        var bodyStyle = getStyle(this.body);
        var stroke = SHAPE_DEFAULTS.stroke;
        if (shapeStyle === null || shapeStyle === void 0 ? void 0 : shapeStyle.stroke) {
          stroke = shapeStyle.stroke;
        } else if (fixtureStyle === null || fixtureStyle === void 0 ? void 0 : fixtureStyle.stroke) {
          stroke = fixtureStyle.stroke;
        } else if (bodyStyle === null || bodyStyle === void 0 ? void 0 : bodyStyle.stroke) {
          stroke = bodyStyle.stroke;
        } else if ((_a2 = this.global) === null || _a2 === void 0 ? void 0 : _a2.stroke) {
          stroke = this.global.stroke;
        } else if (this.body.isDynamic()) {
          stroke = "rgba(255,255,255,0.9)";
        } else if (this.body.isKinematic()) {
          stroke = "rgba(255,255,255,0.8)";
        } else if (this.body.isStatic()) {
          stroke = "rgba(255,255,255,0.7)";
        }
        return stroke;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ComputedShapeStyle2.prototype, "fill", {
      get: function() {
        var _a2;
        var shapeStyle = getStyle(this.fixture.getShape());
        var fixtureStyle = getStyle(this.fixture);
        var bodyStyle = getStyle(this.body);
        var fill = SHAPE_DEFAULTS.fill;
        if (shapeStyle === null || shapeStyle === void 0 ? void 0 : shapeStyle.fill) {
          fill = shapeStyle.fill;
        } else if (fixtureStyle === null || fixtureStyle === void 0 ? void 0 : fixtureStyle.fill) {
          fill = fixtureStyle.fill;
        } else if (bodyStyle === null || bodyStyle === void 0 ? void 0 : bodyStyle.fill) {
          fill = bodyStyle.fill;
        } else if ((_a2 = this.global) === null || _a2 === void 0 ? void 0 : _a2.fill) {
          fill = this.global.fill;
        }
        return fill;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ComputedShapeStyle2.prototype, "lineWidth", {
      get: function() {
        var _a2;
        var shapeStyle = getStyle(this.fixture.getShape());
        var fixtureStyle = getStyle(this.fixture);
        var bodyStyle = getStyle(this.body);
        var lineWidth = SHAPE_DEFAULTS.lineWidth;
        if (shapeStyle === null || shapeStyle === void 0 ? void 0 : shapeStyle.lineWidth) {
          lineWidth = shapeStyle.lineWidth;
        } else if (fixtureStyle === null || fixtureStyle === void 0 ? void 0 : fixtureStyle.lineWidth) {
          lineWidth = fixtureStyle.lineWidth;
        } else if (bodyStyle === null || bodyStyle === void 0 ? void 0 : bodyStyle.lineWidth) {
          lineWidth = bodyStyle.lineWidth;
        } else if ((_a2 = this.global) === null || _a2 === void 0 ? void 0 : _a2.lineWidth) {
          lineWidth = this.global.lineWidth;
        }
        return lineWidth;
      },
      enumerable: false,
      configurable: true
    });
    return ComputedShapeStyle2;
  }()
);
var ComputedJointStyle = (
  /** @class */
  function() {
    function ComputedJointStyle2(joint, global) {
      this.joint = joint;
      this.global = global;
    }
    Object.defineProperty(ComputedJointStyle2.prototype, "stroke", {
      get: function() {
        var _a2;
        var jointStyle = getStyle(this.joint);
        var stroke = JOINT_DEFAULTS.stroke;
        if (jointStyle === null || jointStyle === void 0 ? void 0 : jointStyle.stroke) {
          stroke = jointStyle.stroke;
        } else if ((_a2 = this.global) === null || _a2 === void 0 ? void 0 : _a2.stroke) {
          stroke = this.global.stroke;
        }
        return stroke;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ComputedJointStyle2.prototype, "fill", {
      get: function() {
        var _a2;
        var jointStyle = getStyle(this.joint);
        var fill = JOINT_DEFAULTS.fill;
        if (jointStyle === null || jointStyle === void 0 ? void 0 : jointStyle.fill) {
          fill = jointStyle.fill;
        } else if ((_a2 = this.global) === null || _a2 === void 0 ? void 0 : _a2.fill) {
          fill = this.global.fill;
        }
        return fill;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ComputedJointStyle2.prototype, "lineWidth", {
      get: function() {
        var _a2;
        var jointStyle = getStyle(this.joint);
        var lineWidth = JOINT_DEFAULTS.lineWidth;
        if (jointStyle === null || jointStyle === void 0 ? void 0 : jointStyle.lineWidth) {
          lineWidth = jointStyle.lineWidth;
        } else if ((_a2 = this.global) === null || _a2 === void 0 ? void 0 : _a2.lineWidth) {
          lineWidth = this.global.lineWidth;
        }
        return lineWidth;
      },
      enumerable: false,
      configurable: true
    });
    return ComputedJointStyle2;
  }()
);
var Memo = (
  /** @class */
  function() {
    function Memo2() {
      this.memory = [];
    }
    Memo2.init = function() {
      return new Memo2();
    };
    Memo2.prototype.update = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var equal = this.memory.length === args.length;
      for (var i = 0; i < args.length; i++) {
        equal = equal && this.memory[i] === args[i];
        this.memory[i] = args[i];
      }
      this.memory.length = args.length;
      return !equal;
    };
    Memo2.prototype.clear = function() {
      this.memory.length = 0;
    };
    return Memo2;
  }()
);
var math_max$2 = Math.max;
var math_min$4 = Math.min;
var ChainShapeComponent = (
  /** @class */
  function(_super) {
    __extends$1(ChainShapeComponent2, _super);
    function ChainShapeComponent2(shape, style) {
      var _this = _super.call(this) || this;
      _this.textureOffset = { x: 0, y: 0, a: 0 };
      _this.__memo = Memo.init();
      _this.handleTick = function() {
        var x2 = _this.textureOffset.x;
        var y = _this.textureOffset.y;
        var a2 = _this.textureOffset.a;
        if (!_this.__memo.update(x2, y, a2)) {
          return true;
        }
        _this.offset(x2, y);
        _this.rotate(a2);
      };
      _this.style = style;
      _this.shape = shape;
      var textureOffset = _this.textureOffset;
      var texture2 = canvas();
      texture2.setMemoizer(function() {
        var key = "";
        var vertices = shape.m_vertices;
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          key += v3.x + "," + v3.y + ";";
        }
        key += shape.isLoop() + ";";
        key += style.lineWidth + ";";
        key += style.stroke + ";";
        key += style.fill + ";";
        return key;
      });
      texture2.setDrawer(function() {
        var lineWidth = style.lineWidth;
        var stroke = style.stroke;
        style.fill;
        var ctx = this.getContext();
        var ratio = this.getDevicePixelRatio();
        var lw = lineWidth / ratio;
        var vertices = shape.m_vertices;
        if (!vertices.length) {
          return;
        }
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          minX = math_min$4(minX, v3.x);
          maxX = math_max$2(maxX, v3.x);
          minY = math_min$4(minY, v3.y);
          maxY = math_max$2(maxY, v3.y);
        }
        textureOffset.x = minX;
        textureOffset.y = minY;
        this.setSize(maxX - minX + lw, maxY - minY + lw, ratio);
        this.setPadding(-lw / 2);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          var x2 = v3.x - minX + lw / 2;
          var y = v3.y - minY + lw / 2;
          if (i == 0)
            ctx.moveTo(x2, y);
          else
            ctx.lineTo(x2, y);
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke !== null && stroke !== void 0 ? stroke : "";
        ctx.stroke();
      });
      _this.texture(texture2);
      _this.tick(_this.handleTick);
      return _this;
    }
    return ChainShapeComponent2;
  }(Sprite)
);
var math_PI$1 = Math.PI;
var CircleShapeComponent = (
  /** @class */
  function(_super) {
    __extends$1(CircleShapeComponent2, _super);
    function CircleShapeComponent2(shape, style) {
      var _this = _super.call(this) || this;
      _this.textureOffset = { x: 0, y: 0, a: 0 };
      _this.__memo = Memo.init();
      _this.handleTick = function() {
        var x2 = _this.textureOffset.x;
        var y = _this.textureOffset.y;
        var a2 = _this.textureOffset.a;
        if (!_this.__memo.update(x2, y, a2)) {
          return true;
        }
        _this.offset(x2, y);
        _this.rotate(a2);
      };
      _this.style = style;
      _this.shape = shape;
      var textureOffset = _this.textureOffset;
      var texture2 = canvas();
      texture2.setMemoizer(function() {
        var key = "";
        var v3 = shape.getCenter();
        key += v3.x + "," + v3.y + ";";
        key += shape.getRadius() + ";";
        key += style.lineWidth + ";";
        key += style.stroke + ";";
        key += style.fill + ";";
        return key;
      });
      texture2.setDrawer(function() {
        var lineWidth = style.lineWidth;
        var stroke = style.stroke;
        var fill = style.fill;
        var ctx = this.getContext();
        var ratio = this.getDevicePixelRatio();
        var lw = lineWidth / ratio;
        var r = shape.m_radius;
        textureOffset.x = shape.m_p.x - r;
        textureOffset.y = shape.m_p.y - r;
        this.setSize(r * 2 + lw, r * 2 + lw, ratio);
        this.setPadding(-lw / 2);
        ctx.scale(ratio, ratio);
        ctx.arc(r + lw / 2, r + lw / 2, r, 0, 2 * math_PI$1);
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        ctx.lineTo(r + lw / 2, r + lw / 2);
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke !== null && stroke !== void 0 ? stroke : "";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      });
      _this.texture(texture2);
      _this.tick(_this.handleTick);
      return _this;
    }
    return CircleShapeComponent2;
  }(Sprite)
);
var math_atan2$1 = Math.atan2;
var math_sqrt$1 = Math.sqrt;
var math_min$3 = Math.min;
var EdgeShapeComponent = (
  /** @class */
  function(_super) {
    __extends$1(EdgeShapeComponent2, _super);
    function EdgeShapeComponent2(shape, style) {
      var _this = _super.call(this) || this;
      _this.textureOffset = { x: 0, y: 0, a: 0 };
      _this.__memo = Memo.init();
      _this.handleTick = function() {
        var x2 = _this.textureOffset.x;
        var y = _this.textureOffset.y;
        var a2 = _this.textureOffset.a;
        if (!_this.__memo.update(x2, y, a2)) {
          return true;
        }
        _this.offset(x2, y);
        _this.rotate(a2);
      };
      _this.style = style;
      _this.shape = shape;
      var textureOffset = _this.textureOffset;
      var texture2 = canvas();
      texture2.setMemoizer(function() {
        var key = "";
        var v13 = shape.m_vertex1;
        var v22 = shape.m_vertex2;
        key += (v13 === null || v13 === void 0 ? void 0 : v13.x) + "," + (v13 === null || v13 === void 0 ? void 0 : v13.y) + ";";
        key += (v22 === null || v22 === void 0 ? void 0 : v22.x) + "," + (v22 === null || v22 === void 0 ? void 0 : v22.y) + ";";
        key += style.lineWidth + ";";
        key += style.stroke + ";";
        key += style.fill + ";";
        return key;
      });
      texture2.setDrawer(function() {
        var lineWidth = style.lineWidth;
        var stroke = style.stroke;
        style.fill;
        var ctx = this.getContext();
        var ratio = this.getDevicePixelRatio();
        var lw = lineWidth / ratio;
        var v13 = shape.m_vertex1;
        var v22 = shape.m_vertex2;
        var dx = v22.x - v13.x;
        var dy = v22.y - v13.y;
        var length2 = math_sqrt$1(dx * dx + dy * dy);
        this.setSize(length2 + lw, lw, ratio);
        this.setPadding(-lw / 2);
        var minX = math_min$3(v13.x, v22.x);
        var minY = math_min$3(v13.y, v22.y);
        textureOffset.x = minX;
        textureOffset.y = minY;
        textureOffset.a = math_atan2$1(dy, dx);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        ctx.moveTo(lw / 2, lw / 2);
        ctx.lineTo(lw / 2 + length2, lw / 2);
        ctx.lineCap = "round";
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke !== null && stroke !== void 0 ? stroke : "";
        ctx.stroke();
      });
      _this.texture(texture2);
      _this.tick(_this.handleTick);
      return _this;
    }
    return EdgeShapeComponent2;
  }(Sprite)
);
var math_max$1 = Math.max;
var math_min$2 = Math.min;
var PolygonShapeComponent = (
  /** @class */
  function(_super) {
    __extends$1(PolygonShapeComponent2, _super);
    function PolygonShapeComponent2(shape, style) {
      var _this = _super.call(this) || this;
      _this.textureOffset = { x: 0, y: 0, a: 0 };
      _this.__memo = Memo.init();
      _this.handleTick = function() {
        var x2 = _this.textureOffset.x;
        var y = _this.textureOffset.y;
        var a2 = _this.textureOffset.a;
        if (!_this.__memo.update(x2, y, a2)) {
          return true;
        }
        _this.offset(x2, y);
        _this.rotate(a2);
      };
      _this.style = style;
      _this.shape = shape;
      var textureOffset = _this.textureOffset;
      var texture2 = canvas();
      texture2.setMemoizer(function() {
        var key = "";
        var vertices = shape.m_vertices;
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          key += v3.x + "," + v3.y + ";";
        }
        key += style.lineWidth + ";";
        key += style.stroke + ";";
        key += style.fill + ";";
        return key;
      });
      texture2.setDrawer(function() {
        var lineWidth = style.lineWidth;
        var stroke = style.stroke;
        var fill = style.fill;
        var ctx = this.getContext();
        var ratio = this.getDevicePixelRatio();
        var lw = lineWidth / ratio;
        var vertices = shape.m_vertices;
        if (!vertices.length) {
          return;
        }
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          minX = math_min$2(minX, v3.x);
          maxX = math_max$1(maxX, v3.x);
          minY = math_min$2(minY, v3.y);
          maxY = math_max$1(maxY, v3.y);
        }
        textureOffset.x = minX;
        textureOffset.y = minY;
        this.setSize(maxX - minX + lw, maxY - minY + lw, ratio);
        this.setPadding(-lw / 2);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          var x2 = v3.x - minX + lw / 2;
          var y = v3.y - minY + lw / 2;
          if (i == 0)
            ctx.moveTo(x2, y);
          else
            ctx.lineTo(x2, y);
        }
        if (vertices.length > 2) {
          if (fill) {
            ctx.fillStyle = fill;
            ctx.fill();
          }
          ctx.closePath();
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke !== null && stroke !== void 0 ? stroke : "";
        ctx.stroke();
      });
      _this.texture(texture2);
      _this.tick(_this.handleTick);
      return _this;
    }
    return PolygonShapeComponent2;
  }(Sprite)
);
var math_atan2 = Math.atan2;
var math_sqrt = Math.sqrt;
var math_min$1 = Math.min;
var JointComponent = (
  /** @class */
  function(_super) {
    __extends$1(JointComponent2, _super);
    function JointComponent2(joint, style) {
      var _this = _super.call(this) || this;
      _this.memo = Memo.init();
      _this.style = style;
      _this.joint = joint;
      var offsetX = 0;
      var offsetY = 0;
      var offsetA = 0;
      var offsetMemo = Memo.init();
      var texture2 = canvas();
      texture2.setMemoizer(function() {
        var v13 = joint.getAnchorA();
        var v22 = joint.getAnchorB();
        var token = v13.x + "." + v13.y + "." + v22.x + "." + v22.y;
        return token;
      });
      texture2.setDrawer(function() {
        var lineWidth = style.lineWidth;
        var stroke = style.stroke;
        style.fill;
        var ctx = this.getContext();
        var ratio = this.getDevicePixelRatio();
        var lw = lineWidth / ratio;
        var v13 = joint.getAnchorA();
        var v22 = joint.getAnchorB();
        var dx = v22.x - v13.x;
        var dy = v22.y - v13.y;
        var length2 = math_sqrt(dx * dx + dy * dy);
        this.setSize(length2 + lw, lw, ratio);
        this.setPadding(-lw / 2);
        var minX = math_min$1(v13.x, v22.x);
        var minY = math_min$1(v13.y, v22.y);
        offsetX = minX;
        offsetY = minY;
        offsetA = math_atan2(dy, dx);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        ctx.moveTo(lw / 2, lw / 2);
        ctx.lineTo(lw / 2 + length2, lw / 2);
        ctx.lineCap = "round";
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke !== null && stroke !== void 0 ? stroke : "";
        ctx.stroke();
      });
      var sprite$1 = sprite(texture2);
      sprite$1.tick(function() {
        if (offsetMemo.update(offsetX, offsetY, offsetA)) {
          sprite$1.offset(offsetX, offsetY);
          sprite$1.rotate(offsetA);
        }
      });
      _this.append(sprite$1);
      return _this;
    }
    return JointComponent2;
  }(Node)
);
var math_max = Math.max;
var math_min = Math.min;
var PulleyJointComponent = (
  /** @class */
  function(_super) {
    __extends$1(PulleyJointComponent2, _super);
    function PulleyJointComponent2(joint, style) {
      var _this = _super.call(this) || this;
      _this.memo = Memo.init();
      _this.style = style;
      _this.joint = joint;
      var vertices = [];
      var offsetX = 0;
      var offsetY = 0;
      var offsetMemo = Memo.init();
      var texture2 = canvas();
      texture2.setMemoizer(function() {
        var v13 = joint.getAnchorA();
        var v22 = joint.getGroundAnchorA();
        var v3 = joint.getGroundAnchorB();
        var v4 = joint.getAnchorB();
        var token = v13.x + "." + v13.y + "." + v22.x + "." + v22.y + "." + v3.x + "." + v3.y + "." + v4.x + "." + v4.y;
        return token;
      });
      texture2.setDrawer(function() {
        var lineWidth = style.lineWidth;
        var stroke = style.stroke;
        style.fill;
        var ctx = this.getContext();
        var ratio = this.getDevicePixelRatio();
        var lw = lineWidth / ratio;
        vertices[0] = joint.getAnchorA();
        vertices[1] = joint.getGroundAnchorA();
        vertices[2] = joint.getGroundAnchorB();
        vertices[3] = joint.getAnchorB();
        if (!vertices.length) {
          return;
        }
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          minX = math_min(minX, v3.x);
          maxX = math_max(maxX, v3.x);
          minY = math_min(minY, v3.y);
          maxY = math_max(maxY, v3.y);
        }
        var width = maxX - minX;
        var height = maxY - minY;
        offsetX = minX;
        offsetY = minY;
        this.setSize(width + lw, height + lw, ratio);
        this.setPadding(-lw / 2);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        for (var i = 0; i < vertices.length; ++i) {
          var v3 = vertices[i];
          var x2 = v3.x - minX + lw / 2;
          var y = v3.y - minY + lw / 2;
          if (i == 0)
            ctx.moveTo(x2, y);
          else
            ctx.lineTo(x2, y);
        }
        ctx.lineCap = "round";
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke !== null && stroke !== void 0 ? stroke : "";
        ctx.stroke();
      });
      var sprite$1 = sprite(texture2);
      sprite$1.tick(function() {
        if (offsetMemo.update(offsetX, offsetY)) {
          sprite$1.offset(offsetX, offsetY);
        }
      });
      _this.append(sprite$1);
      return _this;
    }
    return PulleyJointComponent2;
  }(Node)
);
var BodyComponent = (
  /** @class */
  function(_super) {
    __extends$1(BodyComponent2, _super);
    function BodyComponent2(body) {
      var _this = _super.call(this) || this;
      _this.__memo = Memo.init();
      _this.handleTick = function() {
        if (!_this.body) {
          return;
        }
        var p = _this.body.getPosition();
        var x2 = p.x;
        var y = p.y;
        var a2 = _this.body.getAngle();
        if (!_this.__memo.update(x2, y, a2)) {
          return true;
        }
        _this.offset(x2, y);
        _this.rotate(a2);
      };
      _this.body = body;
      _this.tick(_this.handleTick, false);
      return _this;
    }
    return BodyComponent2;
  }(Sprite)
);
var math_abs = Math.abs;
var HIT_RADIUS_PIXEL = 10;
var DEFAULTS = {
  speed: 1,
  hz: 60
};
var WorldComponent = (
  /** @class */
  function(_super) {
    __extends$1(WorldComponent2, _super);
    function WorldComponent2(context, emit) {
      var _this = _super.call(this) || this;
      _this.bodies = /* @__PURE__ */ new WeakMap();
      _this.shapes = /* @__PURE__ */ new WeakMap();
      _this.joints = /* @__PURE__ */ new WeakMap();
      _this.getHitRadius = function() {
        var pixelPerUnit = _this.getLogicalPixelRatio();
        var hitRadius = HIT_RADIUS_PIXEL / pixelPerUnit;
        return hitRadius;
      };
      _this.timeBuffer = 0;
      _this.stepErrored = false;
      _this.handleTick = function(dt) {
        var _a2, _b;
        if (!_this.world)
          return false;
        if (_this.stepErrored)
          return false;
        if (_this.context.paused)
          return false;
        var speed = (_a2 = _this.context.speed) !== null && _a2 !== void 0 ? _a2 : DEFAULTS.speed;
        var hz = (_b = _this.context.hz) !== null && _b !== void 0 ? _b : DEFAULTS.hz;
        if (math_abs(hz) < 1) {
          hz = 1 / hz;
        }
        var timeStep = 1 / hz;
        try {
          dt = dt * 1e-3 * speed;
          _this.timeBuffer += dt;
          while (_this.timeBuffer > timeStep) {
            _this.world.step(timeStep);
            _this.timeBuffer -= timeStep;
          }
          _this.renderWorld();
          return true;
        } catch (error) {
          _this.stepErrored = true;
          console.error(error);
          return false;
        }
      };
      _this.setWorld = function(world) {
        if (_this.world === world) {
          return;
        }
        if (_this.world) {
          _this.world.off("remove-body", _this.removeBody);
          _this.world.off("remove-fixture", _this.removeShape);
          _this.world.off("remove-joint", _this.removeJoint);
        }
        _this.world = world;
        if (_this.world) {
          _this.world.on("remove-body", _this.removeBody);
          _this.world.on("remove-fixture", _this.removeShape);
          _this.world.on("remove-joint", _this.removeJoint);
        }
        _this.empty();
        _this.bodies = /* @__PURE__ */ new WeakMap();
        _this.shapes = /* @__PURE__ */ new WeakMap();
        _this.joints = /* @__PURE__ */ new WeakMap();
        _this.renderWorld();
      };
      _this.removeShape = function(obj) {
        var _a2;
        (_a2 = _this.shapes.get(obj)) === null || _a2 === void 0 ? void 0 : _a2.remove();
        _this.shapes.delete(obj);
      };
      _this.removeBody = function(obj) {
        var _a2;
        (_a2 = _this.bodies.get(obj)) === null || _a2 === void 0 ? void 0 : _a2.remove();
        _this.bodies.delete(obj);
      };
      _this.removeJoint = function(obj) {
        var _a2;
        (_a2 = _this.joints.get(obj)) === null || _a2 === void 0 ? void 0 : _a2.remove();
        _this.joints.delete(obj);
      };
      _this.rerenderWorld = function() {
        _this.renderWorld(true);
      };
      _this.renderWorld = function(clearCache) {
        if (clearCache === void 0) {
          clearCache = false;
        }
        if (clearCache === true) {
          _this.empty();
          _this.shapes = /* @__PURE__ */ new WeakMap();
          _this.bodies = /* @__PURE__ */ new WeakMap();
          _this.joints = /* @__PURE__ */ new WeakMap();
        }
        if (!_this.world)
          return;
        var world = _this.world;
        for (var b2 = world.getBodyList(); b2; b2 = b2.getNext()) {
          _this.renderBody(b2);
        }
        for (var j = world.getJointList(); j; j = j.getNext()) {
          _this.renderJoint(j);
        }
      };
      _this.pointerStart = { x: 0, y: 0 };
      _this.pointerLast = { x: 0, y: 0 };
      _this.pointerDragged = false;
      _this.pointerDown = false;
      _this.handlePointerDown = function(point2) {
        var _a2;
        if (!_this.world)
          return;
        var fixture = _this.findFixture(point2);
        (_a2 = _this.emit) === null || _a2 === void 0 ? void 0 : _a2.call(_this, "world-pointer-down", {
          point: point2,
          fixture,
          background: !fixture
        });
        _this.pointerStart.x = point2.x;
        _this.pointerStart.y = point2.y;
        _this.pointerLast.x = point2.x;
        _this.pointerLast.y = point2.y;
        _this.pointerDown = true;
        _this.pointerDragged = false;
      };
      _this.handlePointerMove = function(point2) {
        var _a2, _b, _c;
        if (!_this.world)
          return;
        (_a2 = _this.emit) === null || _a2 === void 0 ? void 0 : _a2.call(_this, "world-pointer-move", {
          point: point2
        });
        if (!_this.pointerDown)
          return;
        var move = {
          x: point2.x - _this.pointerStart.x,
          y: point2.y - _this.pointerStart.y
        };
        var delta = {
          x: point2.x - _this.pointerLast.x,
          y: point2.y - _this.pointerLast.y
        };
        if (_this.pointerDragged) {
          _this.pointerLast.x = point2.x;
          _this.pointerLast.y = point2.y;
          (_b = _this.emit) === null || _b === void 0 ? void 0 : _b.call(_this, "world-drag-move", {
            point: point2,
            delta,
            move
          });
        } else if (move.x !== 0 || move.y !== 0) {
          _this.pointerDragged = true;
          var fixture = _this.findFixture(point2);
          (_c = _this.emit) === null || _c === void 0 ? void 0 : _c.call(_this, "world-drag-start", {
            point: point2,
            fixture,
            background: !fixture
          });
        }
      };
      _this.handlePointerUp = function(point2) {
        var _a2, _b, _c;
        if (!_this.world)
          return;
        (_a2 = _this.emit) === null || _a2 === void 0 ? void 0 : _a2.call(_this, "world-pointer-up", {
          point: point2
        });
        if (!_this.pointerDown)
          return;
        _this.pointerDown = false;
        ({
          x: point2.x - _this.pointerStart.x,
          y: point2.y - _this.pointerStart.y
        });
        ({
          x: point2.x - _this.pointerLast.x,
          y: point2.y - _this.pointerLast.y
        });
        _this.pointerLast.x = point2.x;
        _this.pointerLast.y = point2.y;
        if (_this.pointerDragged) {
          (_b = _this.emit) === null || _b === void 0 ? void 0 : _b.call(_this, "world-drag-end", {
            point: point2
          });
          return;
        }
        var fixture = _this.findFixture(point2);
        (_c = _this.emit) === null || _c === void 0 ? void 0 : _c.call(_this, "world-click", {
          point: point2,
          fixture,
          background: !fixture
        });
      };
      _this.handlePointerCancel = function() {
        var _a2, _b;
        if (!_this.world)
          return;
        (_a2 = _this.emit) === null || _a2 === void 0 ? void 0 : _a2.call(_this, "world-pointer-cancel");
        if (!_this.pointerDown)
          return;
        _this.pointerDown = false;
        if (_this.pointerDragged) {
          (_b = _this.emit) === null || _b === void 0 ? void 0 : _b.call(_this, "world-drag-cancel");
        }
      };
      _this.findFixture = function(point2, filter) {
        var radius = _this.getHitRadius();
        var fixture = findFixture(_this.world, point2, radius, filter);
        return fixture;
      };
      _this.context = context;
      _this.emit = emit;
      _this.attr("spy", true);
      _this.on(POINTER_DOWN, _this.handlePointerDown);
      _this.on(POINTER_MOVE, _this.handlePointerMove);
      _this.on(POINTER_UP, _this.handlePointerUp);
      _this.on(POINTER_CANCEL, _this.handlePointerCancel);
      _this.tick(_this.handleTick, true);
      return _this;
    }
    WorldComponent2.prototype.renderBody = function(body) {
      var bodyComponent = this.bodies.get(body);
      if (!bodyComponent) {
        bodyComponent = new BodyComponent(body);
        bodyComponent.appendTo(this);
        this.bodies.set(body, bodyComponent);
      }
      for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
        this.renderFixture(bodyComponent, body, fixture);
      }
    };
    WorldComponent2.prototype.renderFixture = function(bodyComponent, body, fixture) {
      var shapeComponent = this.shapes.get(fixture);
      if (shapeComponent) {
        return;
      }
      var type = fixture.getType();
      var shape = fixture.getShape();
      var style = new ComputedShapeStyle(body, fixture, this.context);
      if (type == "circle") {
        shapeComponent = new CircleShapeComponent(shape, style);
      } else if (type == "edge") {
        shapeComponent = new EdgeShapeComponent(shape, style);
      } else if (type == "polygon") {
        shapeComponent = new PolygonShapeComponent(shape, style);
      } else if (type == "chain") {
        shapeComponent = new ChainShapeComponent(shape, style);
      } else {
        return;
      }
      shapeComponent.appendTo(bodyComponent);
      this.shapes.set(fixture, shapeComponent);
    };
    WorldComponent2.prototype.renderJoint = function(joint) {
      var component = this.joints.get(joint);
      if (component) {
        return;
      }
      var type = joint.getType();
      var style = new ComputedJointStyle(joint, this.context);
      if (type == PulleyJoint.TYPE) {
        component = new PulleyJointComponent(joint, style);
      } else {
        component = new JointComponent(joint, style);
      }
      component.appendTo(this);
      this.joints.set(joint, component);
    };
    return WorldComponent2;
  }(Node)
);
function findFixture(world, point2, radius, filter) {
  var bestFixture;
  var bestDistance = radius;
  var aabb = new AABB(point2, point2).extend(radius);
  var distanceInput2 = new DistanceInput();
  distanceInput2.useRadii = true;
  distanceInput2.proxyB.set(new CircleShape(1e-5), 0);
  distanceInput2.transformB.set(new Transform(point2));
  world.queryAABB(aabb, function(fixture) {
    if (filter && !filter(fixture)) {
      return true;
    }
    if (fixture.testPoint(point2)) {
      bestFixture = fixture;
      bestDistance = 0;
      return true;
    }
    for (var childIndex = fixture.getShape().getChildCount(); childIndex >= 0; childIndex--) {
      distanceInput2.proxyA.set(fixture.getShape(), childIndex);
      distanceInput2.transformA.set(fixture.getBody().getTransform());
      var cache2 = new SimplexCache();
      var output2 = new DistanceOutput();
      Distance(output2, cache2, distanceInput2);
      var distance = Vec2.distance(output2.pointA, output2.pointB);
      if (distance < bestDistance) {
        bestFixture = fixture;
        bestDistance = distance;
      }
    }
    return bestDistance == 0 ? false : true;
  });
  return bestFixture;
}
var math_PI = Math.PI;
var mounted = null;
Testbed.mount = function() {
  if (mounted) {
    return mounted;
  }
  mounted = new StageTestbed();
  var playButton = document.getElementById("testbed-play");
  var statusElement = document.getElementById("testbed-status");
  var infoElement = document.getElementById("testbed-info");
  if (playButton) {
    playButton.addEventListener("click", function() {
      if (mounted.isPaused()) {
        mounted.resume();
      } else {
        mounted.pause();
      }
    });
    mounted._pause = function() {
      playButton.classList.add("pause");
      playButton.classList.remove("play");
    };
    mounted._resume = function() {
      playButton.classList.add("play");
      playButton.classList.remove("pause");
    };
  } else {
    console.log("Please create a button with id='testbed-play'");
  }
  var lastStatus = "";
  if (statusElement) {
    statusElement.innerText = lastStatus;
  }
  mounted._status = function(text) {
    if (lastStatus === text) {
      return;
    }
    lastStatus = text;
    if (statusElement) {
      statusElement.innerText = text;
    }
  };
  var lastInfo = "";
  if (infoElement) {
    infoElement.innerText = lastInfo;
  }
  mounted._info = function(text) {
    if (lastInfo === text) {
      return;
    }
    lastInfo = text;
    if (infoElement) {
      infoElement.innerText = text;
    }
  };
  return mounted;
};
var StageTestbed = (
  /** @class */
  function() {
    function StageTestbed2() {
      this.width = 80;
      this.height = 60;
      this.x = 0;
      this.y = -10;
      this.scaleY = -1;
      this.hz = 60;
      this.speed = 1;
      this.background = "#222222";
      this.activeKeys = {};
      this.step = function(dt, t) {
        return;
      };
      this.keydown = function(keyCode, label) {
        return;
      };
      this.keyup = function(keyCode, label) {
        return;
      };
      this.paused = false;
      this.lastDrawHash = "";
      this.newDrawHash = "";
      this.buffer = [];
      this.statusText = "";
      this.statusMap = {};
      this.drawSegment = this.drawEdge;
    }
    StageTestbed2.prototype.color = function(r, g, b2) {
      r = r * 256 | 0;
      g = g * 256 | 0;
      b2 = b2 * 256 | 0;
      return "rgb(" + r + ", " + g + ", " + b2 + ")";
    };
    StageTestbed2.prototype.start = function(world) {
      var _this = this;
      var stage = this.stage = mount();
      var canvas2 = this.canvas = stage.dom;
      var testbed2 = this;
      this.canvas = canvas2;
      stage.on(POINTER_DOWN, function() {
        var _a2;
        window.focus();
        (_a2 = document.activeElement) === null || _a2 === void 0 ? void 0 : _a2.blur();
        canvas2.focus();
      });
      stage.MAX_ELAPSE = 1e3 / 30;
      stage.flipY(true);
      stage.on("resume", function() {
        _this.paused = false;
        _this._resume();
      });
      stage.on("pause", function() {
        _this.paused = true;
        _this._pause();
      });
      var drawingTexture = new CanvasTexture();
      drawingTexture.draw = function(ctx) {
        var pixelRatio = drawingTexture.getDevicePixelRatio();
        ctx.save();
        ctx.transform(1, 0, 0, 1, 0, 0);
        ctx.lineWidth = 3 / pixelRatio;
        ctx.lineCap = "round";
        for (var drawing = _this.buffer.shift(); drawing; drawing = _this.buffer.shift()) {
          drawing(ctx, pixelRatio);
        }
        ctx.restore();
      };
      var drawingElement = sprite(drawingTexture);
      stage.append(drawingElement);
      stage.tick(function() {
        _this.buffer.length = 0;
      }, true);
      stage.background(this.background);
      stage.viewbox(this.width, this.height);
      stage.pin("alignX", -0.5);
      stage.pin("alignY", -0.5);
      var mouseGround = world.createBody();
      var mouseJoint = null;
      var targetBody = null;
      var mouseMove = { x: 0, y: 0 };
      var pointerStart = function(event) {
        var point2 = event.point;
        if (targetBody) {
          return;
        }
        var fixture = worldNode.findFixture(point2);
        if (!fixture) {
          return;
        }
        var body = fixture.getBody();
        if (_this.mouseForce) {
          targetBody = body;
        } else if (_this.mouseForce === 0) ;
        else {
          mouseJoint = new MouseJoint({ maxForce: 1e3 }, mouseGround, body, {
            x: point2.x,
            y: point2.y
          });
          world.createJoint(mouseJoint);
        }
      };
      var pointerMove = function(event) {
        var point2 = event.point;
        if (mouseJoint) {
          mouseJoint.setTarget(point2);
        }
        mouseMove.x = point2.x;
        mouseMove.y = point2.y;
      };
      var pointerEnd = function(event) {
        var point2 = event.point;
        if (mouseJoint) {
          world.destroyJoint(mouseJoint);
          mouseJoint = null;
        }
        if (targetBody && _this.mouseForce) {
          var target = targetBody.getPosition();
          var force = {
            x: (point2.x - target.x) * _this.mouseForce,
            y: (point2.y - target.y) * _this.mouseForce
          };
          targetBody.applyForceToCenter(force, true);
          targetBody = null;
        }
      };
      var pointerCancel = function() {
        if (mouseJoint) {
          world.destroyJoint(mouseJoint);
          mouseJoint = null;
        }
        if (targetBody) {
          targetBody = null;
        }
      };
      var worldNode = new WorldComponent(this, function(name, event) {
        if (name === "world-drag-start") {
          pointerStart(event);
        } else if (name === "world-drag-move") {
          pointerMove(event);
        } else if (name === "world-drag-end") {
          pointerEnd(event);
        } else if (name === "world-pointer-cancel") {
          pointerCancel();
        }
      });
      worldNode.setWorld(world);
      stage.prepend(worldNode);
      var viewboxMemo = Memo.init();
      stage.tick(function(dt, t) {
        if (viewboxMemo.update(_this.x, _this.y, _this.width, _this.height)) {
          stage.viewbox(_this);
        }
      });
      worldNode.tick(function(dt, t) {
        _this.step(dt, t);
        if (targetBody) {
          _this.drawSegment(targetBody.getPosition(), mouseMove, "rgba(255,255,255,0.2)");
        }
        if (_this.lastDrawHash !== _this.newDrawHash) {
          _this.lastDrawHash = _this.newDrawHash;
          stage.touch();
        }
        _this.newDrawHash = "";
        return true;
      });
      var activeKeys = testbed2.activeKeys;
      var downKeys = {};
      function updateActiveKeys(keyCode, down) {
        var char = String.fromCharCode(keyCode);
        if (/\w/.test(char)) {
          activeKeys[char] = down;
        }
        activeKeys.right = downKeys[39] || activeKeys["D"];
        activeKeys.left = downKeys[37] || activeKeys["A"];
        activeKeys.up = downKeys[38] || activeKeys["W"];
        activeKeys.down = downKeys[40] || activeKeys["S"];
        activeKeys.fire = downKeys[32] || downKeys[13];
      }
      window.addEventListener("keydown", function(e3) {
        var _a2;
        var keyCode = e3.keyCode;
        downKeys[keyCode] = true;
        updateActiveKeys(keyCode, true);
        (_a2 = testbed2.keydown) === null || _a2 === void 0 ? void 0 : _a2.call(testbed2, keyCode, String.fromCharCode(keyCode));
      });
      window.addEventListener("keyup", function(e3) {
        var _a2;
        var keyCode = e3.keyCode;
        downKeys[keyCode] = false;
        updateActiveKeys(keyCode, false);
        (_a2 = testbed2.keyup) === null || _a2 === void 0 ? void 0 : _a2.call(testbed2, keyCode, String.fromCharCode(keyCode));
      });
      this.resume();
    };
    StageTestbed2.prototype.focus = function() {
      document.activeElement && document.activeElement.blur();
      this.canvas.focus();
    };
    StageTestbed2.prototype._pause = function() {
    };
    StageTestbed2.prototype._resume = function() {
    };
    StageTestbed2.prototype.status = function(a2, b2) {
      if (typeof b2 !== "undefined") {
        var key_1 = a2;
        var value_1 = b2;
        if (typeof value_1 !== "function" && typeof value_1 !== "object") {
          this.statusMap[key_1] = value_1;
        }
      } else if (a2 && typeof a2 === "object") {
        for (var key_2 in a2) {
          var value_2 = a2[key_2];
          if (typeof value_2 !== "function" && typeof value_2 !== "object") {
            this.statusMap[key_2] = value_2;
          }
        }
      } else if (typeof a2 === "string") {
        this.statusText = a2;
      }
      var newline = "\n";
      var text = this.statusText || "";
      for (var key in this.statusMap) {
        var value = this.statusMap[key];
        if (typeof value === "function")
          continue;
        text += (text && newline) + key + ": " + value;
      }
      this._status(text);
    };
    StageTestbed2.prototype.info = function(text) {
      this._info(text);
    };
    StageTestbed2.prototype._status = function(string) {
    };
    StageTestbed2.prototype._info = function(text) {
    };
    StageTestbed2.prototype.isPaused = function() {
      return this.paused;
    };
    StageTestbed2.prototype.togglePause = function() {
      if (this.paused) {
        this.resume();
      } else {
        this.pause();
      }
    };
    StageTestbed2.prototype.pause = function() {
      this.stage.pause();
    };
    StageTestbed2.prototype.resume = function() {
      this.stage.resume();
      this.focus();
    };
    StageTestbed2.prototype.drawPoint = function(p, r, color) {
      this.buffer.push(function(ctx, ratio) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 / ratio, 0, 2 * math_PI);
        ctx.strokeStyle = color;
        ctx.stroke();
      });
      this.newDrawHash += "point" + p.x + "," + p.y + "," + r + "," + color;
    };
    StageTestbed2.prototype.drawCircle = function(p, r, color) {
      this.buffer.push(function(ctx) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, 2 * math_PI);
        ctx.strokeStyle = color;
        ctx.stroke();
      });
      this.newDrawHash += "circle" + p.x + "," + p.y + "," + r + "," + color;
    };
    StageTestbed2.prototype.drawEdge = function(a2, b2, color) {
      this.buffer.push(function(ctx) {
        ctx.beginPath();
        ctx.moveTo(a2.x, a2.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.strokeStyle = color;
        ctx.stroke();
      });
      this.newDrawHash += "segment" + a2.x + "," + a2.y + "," + b2.x + "," + b2.y + "," + color;
    };
    StageTestbed2.prototype.drawPolygon = function(points, color) {
      if (!points || !points.length) {
        return;
      }
      this.buffer.push(function(ctx) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i2 = 1; i2 < points.length; i2++) {
          ctx.lineTo(points[i2].x, points[i2].y);
        }
        ctx.strokeStyle = color;
        ctx.closePath();
        ctx.stroke();
      });
      this.newDrawHash += "polygon";
      for (var i = 1; i < points.length; i++) {
        this.newDrawHash += points[i].x + "," + points[i].y + ",";
      }
      this.newDrawHash += color;
    };
    StageTestbed2.prototype.drawChain = function(points, color) {
      if (!points || !points.length) {
        return;
      }
      this.buffer.push(function(ctx) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i2 = 1; i2 < points.length; i2++) {
          ctx.lineTo(points[i2].x, points[i2].y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
      });
      this.newDrawHash += "chain";
      for (var i = 1; i < points.length; i++) {
        this.newDrawHash += points[i].x + "," + points[i].y + ",";
      }
      this.newDrawHash += color;
    };
    StageTestbed2.prototype.drawAABB = function(aabb, color) {
      this.buffer.push(function(ctx) {
        ctx.beginPath();
        ctx.moveTo(aabb.lowerBound.x, aabb.lowerBound.y);
        ctx.lineTo(aabb.upperBound.x, aabb.lowerBound.y);
        ctx.lineTo(aabb.upperBound.x, aabb.upperBound.y);
        ctx.lineTo(aabb.lowerBound.x, aabb.upperBound.y);
        ctx.strokeStyle = color;
        ctx.closePath();
        ctx.stroke();
      });
      this.newDrawHash += "aabb";
      this.newDrawHash += aabb.lowerBound.x + "," + aabb.lowerBound.y + ",";
      this.newDrawHash += aabb.upperBound.x + "," + aabb.upperBound.y + ",";
      this.newDrawHash += color;
    };
    StageTestbed2.prototype.findOne = function(query) {
      throw new Error("Not implemented");
    };
    StageTestbed2.prototype.findAll = function(query) {
      throw new Error("Not implemented");
    };
    return StageTestbed2;
  }()
);
const planck = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AABB,
  Body,
  Box: BoxShape,
  BoxShape,
  BroadPhase,
  Chain: ChainShape,
  ChainShape,
  Circle: CircleShape,
  CircleShape,
  ClipVertex,
  CollideCircles,
  CollideEdgeCircle,
  CollideEdgePolygon,
  CollidePolygonCircle,
  CollidePolygons,
  Contact,
  ContactEdge,
  get ContactFeatureType() {
    return ContactFeatureType;
  },
  ContactID,
  ContactImpulse,
  DataDriver,
  Distance,
  DistanceInput,
  DistanceJoint,
  DistanceOutput,
  DistanceProxy,
  DynamicTree,
  Edge: EdgeShape,
  EdgeShape,
  Fixture,
  FixtureProxy,
  FrictionJoint,
  GearJoint,
  Joint,
  JointEdge,
  Manifold,
  ManifoldPoint,
  get ManifoldType() {
    return ManifoldType;
  },
  Mat22,
  Mat33,
  Math: math$1,
  MotorJoint,
  MouseJoint,
  get PointState() {
    return PointState;
  },
  Polygon: PolygonShape,
  PolygonShape,
  PrismaticJoint,
  PulleyJoint,
  RevoluteJoint,
  RopeJoint,
  Rot,
  Serializer,
  Settings,
  SettingsInternal,
  Shape,
  ShapeCast,
  ShapeCastInput,
  ShapeCastOutput,
  SimplexCache,
  Solver,
  StageTestbed,
  Sweep,
  TOIInput,
  TOIOutput,
  get TOIOutputState() {
    return TOIOutputState;
  },
  Testbed,
  TimeOfImpact,
  TimeStep,
  Transform,
  TreeNode,
  Vec2,
  Vec3,
  VelocityConstraintPoint,
  WeldJoint,
  WheelJoint,
  World,
  WorldManifold,
  clipSegmentToLine,
  getPointStates,
  internal,
  mixFriction,
  mixRestitution,
  stats: stats$1,
  testOverlap,
  testbed
}, Symbol.toStringTag, { value: "Module" }));
export {
  AABB,
  Body,
  BoxShape as Box,
  BoxShape,
  BroadPhase,
  ChainShape as Chain,
  ChainShape,
  CircleShape as Circle,
  CircleShape,
  ClipVertex,
  CollideCircles,
  CollideEdgeCircle,
  CollideEdgePolygon,
  CollidePolygonCircle,
  CollidePolygons,
  Contact,
  ContactEdge,
  ContactFeatureType,
  ContactID,
  ContactImpulse,
  DataDriver,
  Distance,
  DistanceInput,
  DistanceJoint,
  DistanceOutput,
  DistanceProxy,
  DynamicTree,
  EdgeShape as Edge,
  EdgeShape,
  Fixture,
  FixtureProxy,
  FrictionJoint,
  GearJoint,
  Joint,
  JointEdge,
  Manifold,
  ManifoldPoint,
  ManifoldType,
  Mat22,
  Mat33,
  math$1 as Math,
  MotorJoint,
  MouseJoint,
  PointState,
  PolygonShape as Polygon,
  PolygonShape,
  PrismaticJoint,
  PulleyJoint,
  RevoluteJoint,
  RopeJoint,
  Rot,
  Serializer,
  Settings,
  SettingsInternal,
  Shape,
  ShapeCast,
  ShapeCastInput,
  ShapeCastOutput,
  SimplexCache,
  Solver,
  StageTestbed,
  Sweep,
  TOIInput,
  TOIOutput,
  TOIOutputState,
  Testbed,
  TimeOfImpact,
  TimeStep,
  Transform,
  TreeNode,
  Vec2,
  Vec3,
  VelocityConstraintPoint,
  WeldJoint,
  WheelJoint,
  World,
  WorldManifold,
  clipSegmentToLine,
  planck as default,
  getPointStates,
  internal,
  mixFriction,
  mixRestitution,
  stats$1 as stats,
  testOverlap,
  testbed
};
//# sourceMappingURL=planck-with-testbed.mjs.map
