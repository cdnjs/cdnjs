/*
MIT License

Copyright (c) 2012 - 2021 jonobr1 / http://jonobr1.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * @name Two.Commands
 * @property {Object} - Map of possible path commands. Taken from the SVG specification.
 */
var Commands = {
  move: 'M',
  line: 'L',
  curve: 'C',
  arc: 'A',
  close: 'Z'
};

var root;
if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof self !== 'undefined') {
  root = self;
}

var root$1 = root;

var Matrix$1;

/**
 * @name Two.Utils.decomposeMatrix
 * @function
 * @param {Two.Matrix} matrix - The matrix to decompose.
 * @returns {Object} An object containing relevant skew values.
 * @description Decompose a 2D 3x3 Matrix to find the skew.
 */
var decomposeMatrix = function(matrix) {

  // TODO: Include skewX, skewY
  // https://math.stackexchange.com/questions/237369/given-this-transformation-matrix-how-do-i-decompose-it-into-translation-rotati/417813
  // https://stackoverflow.com/questions/45159314/decompose-2d-transformation-matrix

  return {
      translateX: matrix.e,
      translateY: matrix.f,
      scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
      scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
      rotation: 180 * Math.atan2(matrix.b, matrix.a) / Math.PI
  };

};

var setMatrix = function(M) {
  Matrix$1 = M;
};

/**
 * @name Two.Utils.getComputedMatrix
 * @function
 * @param {Two.Shape} object - The Two.js object that has a matrix property to calculate from.
 * @param {Two.Matrix} [matrix] - The matrix to apply calculated transformations to if available.
 * @returns {Two.Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
 * @description Method to get the world space transformation of a given object in a Two.js scene.
 */
var getComputedMatrix = function(object, matrix) {

  matrix = (matrix && matrix.identity()) || new Matrix$1();
  var parent = object, matrices = [];

  while (parent && parent._matrix) {
    matrices.push(parent._matrix);
    parent = parent.parent;
  }

  matrices.reverse();

  for (var i = 0; i < matrices.length; i++) {

    var m = matrices[i];
    var e = m.elements;
    matrix.multiply(
      e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);

  }

  return matrix;

};

/**
 * @name Two.Utils.lerp
 * @function
 * @param {Number} a - Start value.
 * @param {Number} b - End value.
 * @param {Number} t - Zero-to-one value describing percentage between a and b.
 * @returns {Number}
 * @description Linear interpolation between two values `a` and `b` by an amount `t`.
 */
var lerp = function(a, b, t) {
  return t * (b - a) + a;
};

/**
 * @name Two.Utils.mod
 * @function
 * @param {Number} v - The value to modulo
 * @param {Number} l - The value to modulo by
 * @returns {Number}
 * @description Modulo with added functionality to handle negative values in a positive manner.
 */
var mod = function(v, l) {

  while (v < 0) {
    v += l;
  }

  return v % l;

};

var NumArray = root$1.Float32Array || Array;

/**
* @name Two.Utils.toFixed
* @function
* @param {Number} v - Any float
* @returns {Number} That float trimmed to the third decimal place.
* @description A pretty fast toFixed(3) alternative.
* @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
*/
var toFixed = function(v) {
  return Math.floor(v * 1000000) / 1000000;
};

var math = /*#__PURE__*/Object.freeze({
  __proto__: null,
  decomposeMatrix: decomposeMatrix,
  getComputedMatrix: getComputedMatrix,
  setMatrix: setMatrix,
  lerp: lerp,
  mod: mod,
  NumArray: NumArray,
  toFixed: toFixed
});

var slice = Array.prototype.slice;

var isArrayLike = function(collection) {
  if (collection === null || collection === undefined) return false;
  var length = collection.length;
  // Arrays cannot hold more than 2^32 - 1 items
  return (typeof length == 'number' && length >= 0 && length < 4294967296);
};

var _ = {
  isNaN: function(obj) {
    return typeof obj === 'number' && obj !== +obj;
  },
  isElement: function(obj) {
    return !!(obj && obj.nodeType === 1);
  },
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  },
  extend: function(base) {
    var sources = slice.call(arguments, 1);
    for (var i = 0; i < sources.length; i++) {
      var obj = sources[i];
      for (var k in obj) {
        base[k] = obj[k];
      }
    }
    return base;
  },
  defaults: function(base) {
    var sources = slice.call(arguments, 1);
    for (var i = 0; i < sources.length; i++) {
      var obj = sources[i];
      for (var k in obj) {
        if (base[k] === void 0) {
        base[k] = obj[k];
        }
      }
    }
    return base;
  },
  each: function(obj, iteratee, context) {
    var ctx = context || this;
    var keys = !isArrayLike(obj) && Object.keys(obj);
    var length = (keys || obj).length;
    for (var i = 0; i < length; i++) {
      var k = keys ? keys[i] : i;
      iteratee.call(ctx, obj[k], k, obj);
    }
    return obj;
  },
  /**
   * @name Two.Utils.performance
   * @property {Date} - A special `Date` like object to get the current millis of the session. Used internally to calculate time between frames.
   * e.g: `Utils.performance.now() // milliseconds since epoch`
   */
  performance: ((root$1.performance && root$1.performance.now) ? root$1.performance : Date),
};

/**
 * @name Two.Events
 * @class
 * @description Object inherited by many Two.js objects in order to facilitate custom events.
 */
var Events = {

  /**
   * @name Two.Events#on
   * @function
   * @param {String} [name] - The name of the event to bind a function to.
   * @param {Function} [handler] - The function to be invoked when the event is dispatched.
   * @description Call to add a listener to a specific event name.
   */
  on: addEventListener,

  /**
   * @name Two.Events#off
   * @function
   * @param {String} [name] - The name of the event intended to be removed.
   * @param {Function} [handler] - The handler intended to be reomved.
   * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
   */
  off: removeEventListener,

  /**
   * @name Two.Events#trigger
   * @function
   * @param {String} name - The name of the event to dispatch.
   * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
   * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
   */
  trigger: function(name) {
    var scope = this;
    if (!scope._events) return scope;
    var args = Array.prototype.slice.call(arguments, 1);
    var events = scope._events[name];
    if (events) dispatch(scope, events, args);
    return scope;
  },

  listen: function(obj, name, handler) {

    var bound = this;

    if (obj) {

      var event = function () {
        handler.apply(bound, arguments);
      };

      // Add references about the object that assigned this listener
      event.obj = obj;
      event.name = name;
      event.handler = handler;

      obj.on(name, event);

    }

    return bound;

  },

  ignore: function(obj, name, handler) {

    var scope = this;
    obj.off(name, handler);
    return scope;

  },

  /**
   * @name Two.Events.Types
   * @property {Object} - Object of different types of Two.js specific events.
   */
  Types: {
    play: 'play',
    pause: 'pause',
    update: 'update',
    render: 'render',
    resize: 'resize',
    change: 'change',
    remove: 'remove',
    insert: 'insert',
    order: 'order',
    load: 'load'
  }

};


/**
 * @name Two.Events.bind
 * @function
 * @description Alias for {@link Two.Events.on}.
 */
Events.bind = addEventListener;

/**
 * @name Two.Events.unbind
 * @function
 * @description Alias for {@link Two.Events.off}.
 */
Events.unbind = removeEventListener;

/**
 * @private
 * @returns {Two.Events} - Returns an instance of self for the purpose of chaining.
 */
function addEventListener(name, handler) {

  var scope = this;

  scope._events || (scope._events = {});
  var list = scope._events[name] || (scope._events[name] = []);

  list.push(handler);

  return scope;

}

/**
 * @private
 * @returns {Two.Events} - Returns an instance of self for the purpose of chaining.
 */
function removeEventListener(name, handler) {

  var scope = this;

  if (!scope._events) {
    return scope;
  }
  if (!name && !handler) {
    scope._events = {};
    return scope;
  }

  var names = name ? [name] : Object.keys(scope._events);
  for (var i = 0, l = names.length; i < l; i++) {

    name = names[i];
    var list = scope._events[name];

    if (list) {
      var events = [];
      if (handler) {
        for (var j = 0, k = list.length; j < k; j++) {
          var ev = list[j];
          ev = ev.handler ? ev.handler : ev;
          if (handler && handler !== ev) {
            events.push(ev);
          }
        }
      }
      scope._events[name] = events;
    }
  }

  return scope;
}

function dispatch(obj, events, args) {
  var method;
  switch (args.length) {
  case 0:
    method = function(i) {
      events[i].call(obj, args[0]);
    };
    break;
  case 1:
    method = function(i) {
      events[i].call(obj, args[0], args[1]);
    };
    break;
  case 2:
    method = function(i) {
      events[i].call(obj, args[0], args[1], args[2]);
    };
    break;
  case 3:
    method = function(i) {
      events[i].call(obj, args[0], args[1], args[2], args[3]);
    };
    break;
  default:
    method = function(i) {
      events[i].apply(obj, args);
    };
  }
  for (var i = 0; i < events.length; i++) {
    method(i);
  }
}

/**
 * @name Two.Vector
 * @class
 * @param {Number} [x=0] - Any number to represent the horizontal x-component of the vector.
 * @param {Number} [y=0] - Any number to represent the vertical y-component of the vector.
 * @description A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
 */
function Vector(x, y) {

  /**
   * @name Two.Vector#x
   * @property {Number} - The horizontal x-component of the vector.
   */
  this.x = x || 0;

  /**
   * @name Two.Vector#y
   * @property {Number} - The vertical y-component of the vector.
   */
  this.y = y || 0;

}

_.extend(Vector, {

  /**
   * @name Two.Vector.zero
   * @readonly
   * @property {Two.Vector} - Handy reference to a vector with component values 0, 0 at all times.
   */
  zero: new Vector(),

  /**
   * @name Two.Vector.add
   * @function
   * @param {Two.Vector} v1
   * @param {Two.Vector} v2
   * @returns {Two.Vector}
   * @description Add two vectors together.
   */
  add: function(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  },

  /**
   * @name Two.Vector.sub
   * @function
   * @param {Two.Vector} v1
   * @param {Two.Vector} v2
   * @returns {Two.Vector}
   * @description Subtract two vectors: `v2` from `v1`.
   */
  sub: function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  },

  /**
   * @name Two.Vector.subtract
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  subtract: function(v1, v2) {
    return Vector.sub(v1, v2);
  },

  /**
   * @name Two.Vector.ratioBetween
   * @function
   * @param {Two.Vector} A
   * @param {Two.Vector} B
   * @returns {Number} The ratio betwen two points `v1` and `v2`.
   */
  ratioBetween: function(v1, v2) {

    return (v1.x * v2.x + v1.y * v2.y) / (v1.length() * v2.length());

  },

  /**
   * @name Two.Vector.angleBetween
   * @function
   * @param {Two.Vector} v1
   * @param {Two.Vector} v2
   * @returns {Number} The angle between points `v1` and `v2`.
   */
  angleBetween: function(v1, v2) {

    var dx, dy;

    if (arguments.length >= 4) {

      dx = arguments[0] - arguments[2];
      dy = arguments[1] - arguments[3];

      return Math.atan2(dy, dx);

    }

    dx = v1.x - v2.x;
    dy = v1.y - v2.y;

    return Math.atan2(dy, dx);

  },

  /**
   * @name Two.Vector.distanceBetween
   * @function
   * @param {Two.Vector} v1
   * @param {Two.Vector} v2
   * @returns {Number} The distance between points `v1` and `v2`. Distance is always positive.
   */
  distanceBetween: function(v1, v2) {

    return Math.sqrt(Vector.distanceBetweenSquared(v1, v2));

  },

  /**
   * @name Two.Vector.distanceBetweenSquared
   * @function
   * @param {Two.Vector} v1
   * @param {Two.Vector} v2
   * @returns {Number} The squared distance between points `v1` and `v2`.
   */
  distanceBetweenSquared: function(v1, v2) {

    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;

    return dx * dx + dy * dy;

  },

  /**
   * @name Two.Vector.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Vector} to any object. Handy if you'd like to extend the {@link Two.Vector} class on a custom class.
   */
  MakeObservable: function(object) {

    // /**
    //  * Override Backbone bind / on in order to add properly broadcasting.
    //  * This allows Two.Vector to not broadcast events unless event listeners
    //  * are explicity bound to it.
    //  */

    object.bind = object.on = function() {

      if (!this._bound) {
        this._x = this.x;
        this._y = this.y;
        Object.defineProperty(this, 'x', xgs);
        Object.defineProperty(this, 'y', ygs);
        _.extend(this, BoundProto);
        this._bound = true; // Reserved for event initialization check
      }

      Events.bind.apply(this, arguments);

      return this;

    };

  }

});

_.extend(Vector.prototype, Events, {

  constructor: Vector,

  /**
   * @name Two.Vector#set
   * @function
   * @param {Number} x
   * @param {Number} y
   * @description Set the x / y components of a vector to specific number values.
   */
  set: function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  },

  /**
   * @name Two.Vector#copy
   * @function
   * @param {Two.Vector} v
   * @description Copy the x / y components of another object `v`.
   */
  copy: function(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  },

  /**
   * @name Two.Vector#clear
   * @function
   * @description Set the x / y component values of the vector to zero.
   */
  clear: function() {
    this.x = 0;
    this.y = 0;
    return this;
  },

  /**
   * @name Two.Vector#clone
   * @function
   * @description Create a new vector and copy the existing values onto the newly created instance.
   */
  clone: function() {
    return new Vector(this.x, this.y);
  },

  /**
   * @name Two.Vector#add
   * @function
   * @param {Two.Vector} v
   * @description Add an object with x / y component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#add
   * @function
   * @param {Number} v
   * @description Add the **same** number to both x / y component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#add
   * @function
   * @param {Number} x
   * @param {Number} y
   * @description Add `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  add: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x += x;
        this.y += x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x += x.x;
        this.y += x.y;
      }
    } else {
      this.x += x;
      this.y += y;
    }
    return this;
  },

  /**
   * @name Two.Vector#addSelf
   * @function
   * @description Alias for {@link Two.Vector.add}.
   */
  addSelf: function(v) {
    return this.add.apply(this, arguments);
  },

  /**
   * @name Two.Vector#sub
   * @function
   * @param {Two.Vector} v
   * @description Subtract an object with x / y component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#sub
   * @function
   * @param {Number} v
   * @description Subtract the **same** number to both x / y component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#sub
   * @function
   * @param {Number} x
   * @param {Number} y
   * @description Subtract `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  sub: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x -= x;
        this.y -= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x -= x.x;
        this.y -= x.y;
      }
    } else {
      this.x -= x;
      this.y -= y;
    }
    return this;
  },

  /**
   * @name Two.Vector#subtract
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  subtract: function() {
    return this.sub.apply(this, arguments);
  },

  /**
   * @name Two.Vector#subSelf
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  subSelf: function(v) {
    return this.sub.apply(this, arguments);
  },

  /**
   * @name Two.Vector#subtractSelf
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  subtractSelf: function(v) {
    return this.sub.apply(this, arguments);
  },

  /**
   * @name Two.Vector#multiply
   * @function
   * @param {Two.Vector} v
   * @description Multiply an object with x / y component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#multiply
   * @function
   * @param {Number} v
   * @description Multiply the **same** number to both x / y component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#multiply
   * @function
   * @param {Number} x
   * @param {Number} y
   * @description Multiply `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  multiply: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x *= x;
        this.y *= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x *= x.x;
        this.y *= x.y;
      }
    } else {
      this.x *= x;
      this.y *= y;
    }
    return this;
  },

  /**
   * @name Two.Vector#multiplySelf
   * @function
   * @description Alias for {@link Two.Vector.multiply}.
   */
  multiplySelf: function(v) {
    return this.multiply.apply(this, arguments);
  },

  /**
   * @name Two.Vector#multiplyScalar
   * @function
   * @param {Number} s - The scalar to multiply by.
   * @description Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
   */
  multiplyScalar: function(s) {
    return this.multiply(s);
  },

  /**
   * @name Two.Vector#divide
   * @function
   * @param {Two.Vector} v
   * @description Divide an object with x / y component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#divide
   * @function
   * @param {Number} v
   * @description Divide the **same** number to both x / y component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#divide
   * @function
   * @param {Number} x
   * @param {Number} y
   * @description Divide `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  divide: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x /= x;
        this.y /= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x /= x.x;
        this.y /= x.y;
      }
    } else {
      this.x /= x;
      this.y /= y;
    }
    if (_.isNaN(this.x)) {
      this.x = 0;
    }
    if (_.isNaN(this.y)) {
      this.y = 0;
    }
    return this;
  },

  /**
   * @name Two.Vector#divideSelf
   * @function
   * @description Alias for {@link Two.Vector.divide}.
   */
  divideSelf: function(v) {
    return this.divide.apply(this, arguments);
  },

  /**
   * @name Two.Vector#divideScalar
   * @function
   * @param {Number} s - The scalar to divide by.
   * @description Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
   */
  divideScalar: function(s) {
    return this.divide(s);
  },

  /**
   * @name Two.Vector#negate
   * @function
   * @description Invert each component's sign value.
   */
  negate: function() {
    return this.multiply(-1);
  },

  /**
   * @name Two.Vector#negate
   * @function
   * @returns {Number}
   * @description Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.
   */
  dot: function(v) {
    return this.x * v.x + this.y * v.y;
  },

  /**
   * @name Two.Vector#length
   * @function
   * @returns {Number}
   * @description Get the length of a vector.
   */
  length: function() {
    return Math.sqrt(this.lengthSquared());
  },

  /**
   * @name Two.Vector#lengthSquared
   * @function
   * @returns {Number}
   * @description Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length}, because it isn't square-rooting any numbers.
   */
  lengthSquared: function() {
    return this.x * this.x + this.y * this.y;
  },

  /**
   * @name Two.Vector#normalize
   * @function
   * @description Normalize the vector from negative one to one.
   */
  normalize: function() {
    return this.divideScalar(this.length());
  },

  /**
   * @name Two.Vector#distanceTo
   * @function
   * @returns {Number}
   * @description Get the distance between two vectors.
   */
  distanceTo: function(v) {
    return Math.sqrt(this.distanceToSquared(v));
  },

  /**
   * @name Two.Vector#distanceToSquared
   * @function
   * @returns {Number}
   * @description Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo}, because it isn't square-rooting any numbers.
   */
  distanceToSquared: function(v) {
    var dx = this.x - v.x,
        dy = this.y - v.y;
    return dx * dx + dy * dy;
  },

  /**
   * @name Two.Vector#setLength
   * @function
   * @param {Number} l - length to set vector to.
   * @description Set the length of a vector.
   */
  setLength: function(l) {
    return this.normalize().multiplyScalar(l);
  },

  /**
   * @name Two.Vector#equals
   * @function
   * @param {Two.Vector} v - The vector to compare against.
   * @param {Number} [eps=0.0001] - An options epsilon for precision.
   * @returns {Boolean}
   * @description Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
   */
  equals: function(v, eps) {
    eps = (typeof eps === 'undefined') ?  0.0001 : eps;
    return (this.distanceTo(v) < eps);
  },

  /**
   * @name Two.Vector#lerp
   * @function
   * @param {Two.Vector} v - The destination vector to step towards.
   * @param {Number} t - The zero to one value of how close the current vector gets to the destination vector.
   * @description Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
   * @see [Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.
   */
  lerp: function(v, t) {
    var x = (v.x - this.x) * t + this.x;
    var y = (v.y - this.y) * t + this.y;
    return this.set(x, y);
  },

  /**
   * @name Two.Vector#isZero
   * @function
   * @param {Number} [eps=0.0001] - Optional precision amount to check against.
   * @returns {Boolean}
   * @description Check to see if vector is roughly zero, based on the `epsilon` precision value.
   */
  isZero: function(eps) {
    eps = (typeof eps === 'undefined') ?  0.0001 : eps;
    return (this.length() < eps);
  },

  /**
   * @name Two.Vector#toString
   * @function
   * @returns {String}
   * @description Return a comma-separated string of x, y value. Great for storing in a database.
   */
  toString: function() {
    return this.x + ', ' + this.y;
  },

  /**
   * @name Two.Vector#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the vector.
   */
  toObject: function() {
    return { x: this.x, y: this.y };
  },

  /**
   * @name Two.Vector#rotate
   * @function
   * @param {Number} Number - The amoun to rotate the vector by.
   * @description Rotate a vector.
   */
  rotate: function(Number) {
    var cos = Math.cos(Number);
    var sin = Math.sin(Number);
    this.x = this.x * cos - this.y * sin;
    this.y = this.x * sin + this.y * cos;
    return this;
  }

});

// The same set of prototypical functions, but using the underlying
// getter or setter for `x` and `y` values. This set of functions
// is used instead of the previously documented ones above when
// Two.Vector#bind is invoked and there is event dispatching processed
// on x / y property changes.
var BoundProto = {

  constructor: Vector,

  set: function(x, y) {
    this._x = x;
    this._y = y;
    return this.trigger(Events.Types.change);
  },

  copy: function(v) {
    this._x = v.x;
    this._y = v.y;
    return this.trigger(Events.Types.change);
  },

  clear: function() {
    this._x = 0;
    this._y = 0;
    return this.trigger(Events.Types.change);
  },

  clone: function() {
    return new Vector(this._x, this._y);
  },

  add: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this._x += x;
        this._y += x;
      }  else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this._x += x.x;
        this._y += x.y;
      }
    } else {
      this._x += x;
      this._y += y;
    }
    return this.trigger(Events.Types.change);
  },

  sub: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this._x -= x;
        this._y -= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this._x -= x.x;
        this._y -= x.y;
      }
    } else {
      this._x -= x;
      this._y -= y;
    }
    return this.trigger(Events.Types.change);
  },

  multiply: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this._x *= x;
        this._y *= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this._x *= x.x;
        this._y *= x.y;
      }
    } else {
      this._x *= x;
      this._y *= y;
    }
    return this.trigger(Events.Types.change);
  },

  divide: function(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this._x /= x;
        this._y /= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this._x /= x.x;
        this._y /= x.y;
      }
    } else {
      this._x /= x;
      this._y /= y;
    }
    if (_.isNaN(this._x)) {
      this._x = 0;
    }
    if (_.isNaN(this._y)) {
      this._y = 0;
    }
    return this.trigger(Events.Types.change);
  },

  dot: function(v) {
    return this._x * v.x + this._y * v.y;
  },

  lengthSquared: function() {
    return this._x * this._x + this._y * this._y;
  },

  distanceToSquared: function(v) {
    var dx = this._x - v.x,
        dy = this._y - v.y;
    return dx * dx + dy * dy;
  },

  lerp: function(v, t) {
    var x = (v.x - this._x) * t + this._x;
    var y = (v.y - this._y) * t + this._y;
    return this.set(x, y);
  },

  toString: function() {
    return this._x + ', ' + this._y;
  },

  toObject: function() {
    return { x: this._x, y: this._y };
  },

  rotate: function (Number) {
    var cos = Math.cos(Number);
    var sin = Math.sin(Number);
    this._x = this._x * cos - this._y * sin;
    this._y = this._x * sin + this._y * cos;
    return this;
  }

};

var xgs = {
  enumerable: true,
  get: function() {
    return this._x;
  },
  set: function(v) {
    this._x = v;
    this.trigger(Events.Types.change, 'x');
  }
};

var ygs = {
  enumerable: true,
  get: function() {
    return this._y;
  },
  set: function(v) {
    this._y = v;
    this.trigger(Events.Types.change, 'y');
  }
};

Vector.MakeObservable(Vector.prototype);

/**
 * @class
 * @name Two.Anchor
 * @param {Number} [x=0] - The x position of the root anchor point.
 * @param {Number} [y=0] - The y position of the root anchor point.
 * @param {Number} [lx=0] - The x position of the left handle point.
 * @param {Number} [ly=0] - The y position of the left handle point.
 * @param {Number} [rx=0] - The x position of the right handle point.
 * @param {Number} [ry=0] - The y position of the right handle point.
 * @param {String} [command=Two.Commands.move] - The command to describe how to render. Applicable commands are {@link Two.Commands}
 * @extends Two.Vector
 * @description An object that holds 3 {@link Two.Vector}s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.
 */
function Anchor(x, y, lx, ly, rx, ry, command) {

  Vector.call(this, x, y);

  this._broadcast = (function() {
    this.trigger(Events.Types.change);
  }).bind(this);

  this._command = command || Commands.move;
  this._relative = true;

  var ilx = typeof lx === 'number';
  var ily = typeof ly === 'number';
  var irx = typeof rx === 'number';
  var iry = typeof ry === 'number';

  // Append the `controls` object only if control points are specified,
  // keeping the Two.Anchor inline with a Two.Vector until it needs to
  // evolve beyond those functions - e.g: a simple 2 component vector.
  if (ilx || ily || irx || iry) {
    Anchor.AppendCurveProperties(this);
  }

  if (ilx) {
    this.controls.left.x = lx;
  }
  if (ily) {
    this.controls.left.y = ly;
  }
  if (irx) {
    this.controls.right.x = rx;
  }
  if (iry) {
    this.controls.right.y = ry;
  }

}

_.extend(Anchor, {

  /**
   * @name Two.Anchor.AppendCurveProperties
   * @function
   * @param {Two.Anchor} anchor - The instance to append the `control`object to.
   * @description Adds the `controls` property as an object with `left` and `right` properties to access the bezier control handles that define how the curve is drawn. It also sets the `relative` property to `true` making vectors in the `controls` object relative to their corresponding root anchor point.
   */
  AppendCurveProperties: function(anchor) {

    anchor.relative = true;

    /**
     * @name Two.Anchor#controls
     * @property {Object} controls
     * @description An plain object that holds the controls handles for a {@link Two.Anchor}.
     */
    anchor.controls = {};

    /**
     * @name Two.Anchor#controls#left
     * @property {Two.Vector} left
     * @description The "left" control point to define handles on a bezier curve.
     */
    anchor.controls.left = new Vector(0, 0);

    /**
     * @name Two.Anchor#controls#right
     * @property {Two.Vector} right
     * @description The "left" control point to define handles on a bezier curve.
     */
    anchor.controls.right = new Vector(0, 0);

  },

  /**
   * @name Two.Anchor.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Anchor} to any object. Handy if you'd like to extend the {@link Two.Anchor} class on a custom class.
   */
  MakeObservable: function(object) {

    /**
     * @name Two.Anchor#command
     * @property {Two.Commands}
     * @description A draw command associated with the anchor point.
     */
    Object.defineProperty(object, 'command', {

      enumerable: true,

      get: function() {
        return this._command;
      },

      set: function(c) {
        this._command = c;
        if (this._command === Commands.curve && !_.isObject(this.controls)) {
          Anchor.AppendCurveProperties(this);
        }
        this.trigger(Events.Types.change);
      }

    });

    /**
     * @name Two.Anchor#relative
     * @property {Boolean}
     * @description A boolean to render control points relative to the root anchor point or in global coordinate-space to the rest of the scene.
     */
    Object.defineProperty(object, 'relative', {

      enumerable: true,

      get: function() {
        return this._relative;
      },

      set: function(b) {
        if (this._relative != b) {
          this._relative = !!b;
          this.trigger(Events.Types.change);
        }
      }

    });

    _.extend(object, Vector.prototype, AnchorProto);

    // Make it possible to bind and still have the Anchor specific
    // inheritance from Two.Vector. In this case relying on `Two.Vector`
    // to do much of the heavy event-listener binding / unbinding.
    object.bind = object.on = function() {
      var bound = this._bound;
      Vector.prototype.bind.apply(this, arguments);
      if (!bound) {
        _.extend(this, AnchorProto);
      }
    };

  }

});

var AnchorProto = {

  constructor: Anchor,

  /**
   * @name Two.Anchor#listen
   * @function
   * @description Convenience method used mainly by {@link Two.Path#vertices} to listen and propagate changes from control points up to their respective anchors and further if necessary.
   */
  listen: function() {

    if (!_.isObject(this.controls)) {
      Anchor.AppendCurveProperties(this);
    }

    this.controls.left.bind(Events.Types.change, this._broadcast);
    this.controls.right.bind(Events.Types.change, this._broadcast);

    return this;

  },

  /**
   * @name Two.Anchor#ignore
   * @function
   * @description Convenience method used mainly by {@link Two.Path#vertices} to ignore changes from a specific anchor's control points.
   */
  ignore: function() {

    this.controls.left.unbind(Events.Types.change, this._broadcast);
    this.controls.right.unbind(Events.Types.change, this._broadcast);

    return this;

  },

  /**
   * @name Two.Anchor#copy
   * @function
   * @param {Two.Anchor} v - The anchor to apply values to.
   * @description Copy the properties of one {@link Two.Anchor} onto another.
   */
  copy: function(v) {

    this.x = v.x;
    this.y = v.y;

    if (typeof v.command === 'string') {
      this.command = v.command;
    }
    if (_.isObject(v.controls)) {
      if (!_.isObject(this.controls)) {
        Anchor.AppendCurveProperties(this);
      }
      // TODO: Do we need to listen here?
      this.controls.left.copy(v.controls.left);
      this.controls.right.copy(v.controls.right);
    }
    if (typeof v.relative === 'boolean') {
      this.relative = v.relative;
    }

    // TODO: Hack for `Two.Commands.arc`
    if (this.command === Commands.arc) {
      this.rx = v.rx;
      this.ry = v.ry;
      this.xAxisRotation = v.xAxisRotation;
      this.largeArcFlag = v.largeArcFlag;
      this.sweepFlag = v.sweepFlag;
    }

    return this;

  },

  /**
   * @name Two.Anchor#clone
   * @function
   * @returns {Two.Anchor}
   * @description Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
   */
  clone: function() {

    var controls = this.controls;

    var clone = new Anchor(
      this.x,
      this.y,
      controls && controls.left.x,
      controls && controls.left.y,
      controls && controls.right.x,
      controls && controls.right.y,
      this.command
    );
    clone.relative = this._relative;
    return clone;

  },

  /**
   * @name Two.Anchor#toObject
   * @function
   * @returns {Object} - An object with properties filled out to mirror {@link Two.Anchor}.
   * @description Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
   */
  toObject: function() {
    var o = {
      x: this.x,
      y: this.y
    };
    if (this._command) {
      o.command = this._command;
    }
    if (this._relative) {
      o.relative = this._relative;
    }
    if (this.controls) {
      o.controls = {
        left: this.controls.left.toObject(),
        right: this.controls.right.toObject()
      };
    }
    return o;
  },

  /**
   * @name Two.Anchor#toString
   * @function
   * @returns {String} - A String with comma-separated values reflecting the various values on the current instance.
   * @description Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
   */
  toString: function() {
    if (!this.controls) {
      return [this._x, this._y].join(', ');
    }
    return [this._x, this._y, this.controls.left.x, this.controls.left.y,
      this.controls.right.x, this.controls.right.y, this._command,
      this._relative ? 1 : 0].join(', ');
  }

};

Anchor.MakeObservable(Anchor.prototype);

var count = 0;

var Constants = {

  /**
   * @name Two.nextFrameID
   * @property {Number}
   * @description The id of the next requestAnimationFrame function.
   */
  nextFrameID: null,

  // Primitive

  /**
   * @name Two.Types
   * @property {Object} - The different rendering types available in the library.
   */
  Types: {
    webgl: 'WebGLRenderer',
    svg: 'SVGRenderer',
    canvas: 'CanvasRenderer'
  },

  /**
   * @name Two.Version
   * @property {String} - The current working version of the library.
   */
  Version: 'v0.7.6',

  /**
   * @name Two.PublishDate
   * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
   */
  PublishDate: '2021-07-10T14:53:41.922Z',

  /**
   * @name Two.Identifier
   * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
   */
  Identifier: 'two-',

  /**
   * @name Two.Resolution
   * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
   */
  Resolution: 12,

  /**
   * @name Two.AutoCalculateImportedMatrices
   * @property {Boolean} - When importing SVGs through the {@link two#interpret} and {@link two#load}, this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.
   * @nota-bene `false` copies the exact transformation matrix values, but also sets the path's `matrix.manual = true`.
   */
  AutoCalculateImportedMatrices: true,

  /**
   * @name Two.Instances
   * @property {Two[]} - Registered list of all Two.js instances in the current session.
   */
  Instances: [],

  /**
   * @function Two.uniqueId
   * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
   * @returns {Number} Ever increasing Number.
   */
  uniqueId: function() {
    return count++;
  }

};

var HALF_PI$3 = Math.PI / 2;

/**
 * @name Two.Utils.Curve
 * @property {Object} - Additional utility constant variables related to curve math and calculations.
 */
var Curve = {

  CollinearityEpsilon: Math.pow(10, -30),

  RecursionLimit: 16,

  CuspLimit: 0,

  Tolerance: {
    distance: 0.25,
    angle: 0,
    epsilon: Number.EPSILON
  },

  // Lookup tables for abscissas and weights with values for n = 2 .. 16.
  // As values are symmetric, only store half of them and adapt algorithm
  // to factor in symmetry.
  abscissas: [
    [  0.5773502691896257645091488],
    [0,0.7745966692414833770358531],
    [  0.3399810435848562648026658,0.8611363115940525752239465],
    [0,0.5384693101056830910363144,0.9061798459386639927976269],
    [  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
    [0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
    [  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
    [0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
    [  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
    [0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
    [  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
    [0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
    [  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
    [0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
    [  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
  ],

  weights: [
    [1],
    [0.8888888888888888888888889,0.5555555555555555555555556],
    [0.6521451548625461426269361,0.3478548451374538573730639],
    [0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
    [0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
    [0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
    [0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
    [0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
    [0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
    [0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
    [0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
    [0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
    [0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
    [0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
    [0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
  ]

};

/**
 * @name Two.Utils.getComponentOnCubicBezier
 * @function
 * @param {Number} t - Zero-to-one value describing what percentage to calculate.
 * @param {Number} a - The firt point's component value.
 * @param {Number} b - The first point's bezier component value.
 * @param {Number} c - The second point's bezier component value.
 * @param {Number} d - The second point's component value.
 * @returns {Number} The coordinate value for a specific component along a cubic bezier curve by `t`.
 */
var getComponentOnCubicBezier = function(t, a, b, c, d) {
  var k = 1 - t;
  return (k * k * k * a) + (3 * k * k * t * b) + (3 * k * t * t * c) +
      (t * t * t * d);
};

/**
 * @name Two.Utils.subdivide
 * @function
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
 * @returns {Anchor[]} A list of anchor points ordered in between `x1`, `y1` and `x4`, `y4`
 * @description Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.
 */
var subdivide = function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

  limit = limit || Curve.RecursionLimit;
  var amount = limit + 1;

  // TODO: Abstract 0.001 to a limiting variable
  // Don't recurse if the end points are identical
  if (Math.abs(x1 - x4) < 0.001 && Math.abs(y1 - y4) < 0.001) {
    return [new Anchor(x4, y4)];
  }

  var result = [];

  for (var i = 0; i < amount; i++) {
    var t = i / amount;
    var x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
    var y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
    result.push(new Anchor(x, y));
  }

  return result;

};

/**
 * @name Two.Utils.getCurveLength
 * @function
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
 * @returns {Number} The length of a curve.
 * @description Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
 */
var getCurveLength$1 = function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

  // TODO: Better / fuzzier equality check
  // Linear calculation
  if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
    var dx = x4 - x1;
    var dy = y4 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Calculate the coefficients of a Bezier derivative.
  var ax = 9 * (x2 - x3) + 3 * (x4 - x1),
    bx = 6 * (x1 + x3) - 12 * x2,
    cx = 3 * (x2 - x1),

    ay = 9 * (y2 - y3) + 3 * (y4 - y1),
    by = 6 * (y1 + y3) - 12 * y2,
    cy = 3 * (y2 - y1);

  var integrand = function(t) {
    // Calculate quadratic equations of derivatives for x and y
    var dx = (ax * t + bx) * t + cx,
      dy = (ay * t + by) * t + cy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return integrate(
    integrand, 0, 1, limit || Curve.RecursionLimit
  );

};

/**
 * @name Two.Utils.getCurveBoundingBox
 * @function
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @returns {Object} Object contains min and max `x` / `y` bounds.
 * @see {@link https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js#L856}
 */
var getCurveBoundingBox = function(x1, y1, x2, y2, x3, y3, x4, y4) {

  var tvalues = [];
  var bounds = [[], []];
  var a, b, c, t, t1, t2, b2ac, sqrtb2ac;

  for (var i = 0; i < 2; ++i) {
      if (i == 0) {
        b = 6 * x1 - 12 * x2 + 6 * x3;
        a = -3 * x1 + 9 * x2 - 9 * x3 + 3 * x4;
        c = 3 * x2 - 3 * x1;
      } else {
        b = 6 * y1 - 12 * y2 + 6 * y3;
        a = -3 * y1 + 9 * y2 - 9 * y3 + 3 * y4;
        c = 3 * y2 - 3 * y1;
      }
      if (Math.abs(a) < 1e-12) {
        if (Math.abs(b) < 1e-12) {
          continue;
        }
        t = -c / b;
        if (0 < t && t < 1) {
          tvalues.push(t);
        }
        continue;
      }
      b2ac = b * b - 4 * c * a;
      sqrtb2ac = Math.sqrt(b2ac);
      if (b2ac < 0) {
        continue;
      }
      t1 = (-b + sqrtb2ac) / (2 * a);
      if (0 < t1 && t1 < 1) {
        tvalues.push(t1);
      }
      t2 = (-b - sqrtb2ac) / (2 * a);
      if (0 < t2 && t2 < 1) {
        tvalues.push(t2);
      }
  }

  var j = tvalues.length;
  var jlen = j;
  var mt;

  while (j--) {
    t = tvalues[j];
    mt = 1 - t;
    bounds[0][j] = mt * mt * mt * x1 + 3 * mt * mt * t * x2 + 3 * mt * t * t * x3 + t * t * t * x4;
    bounds[1][j] = mt * mt * mt * y1 + 3 * mt * mt * t * y2 + 3 * mt * t * t * y3 + t * t * t * y4;
  }

  bounds[0][jlen] = x1;
  bounds[1][jlen] = y1;
  bounds[0][jlen + 1] = x4;
  bounds[1][jlen + 1] = y4;
  bounds[0].length = bounds[1].length = jlen + 2;

  return {
    min: { x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1]) },
    max: { x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1]) }
  };

};

/**
 * @name Two.Utils.integrate
 * @function
 * @param {Function} f
 * @param {Number} a
 * @param {Number} b
 * @param {Number} n
 * @description Integration for `getCurveLength` calculations.
 * @see [Paper.js](@link https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101)
 */
var integrate = function(f, a, b, n) {
  var x = Curve.abscissas[n - 2],
    w = Curve.weights[n - 2],
    A = 0.5 * (b - a),
    B = A + a,
    i = 0,
    m = (n + 1) >> 1,
    sum = n & 1 ? w[i++] * f(B) : 0; // Handle odd n
  while (i < m) {
    var Ax = A * x[i];
    sum += w[i++] * (f(B + Ax) + f(B - Ax));
  }
  return A * sum;
};

/**
 * @name Two.Utils.getCurveFromPoints
 * @function
 * @param {Anchor[]} points
 * @param {Boolean} closed
 * @description Sets the bezier handles on {@link Anchor}s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.
 */
var getCurveFromPoints = function(points, closed) {

  var l = points.length, last = l - 1;

  for (var i = 0; i < l; i++) {

    var point = points[i];

    if (!_.isObject(point.controls)) {
      Anchor.AppendCurveProperties(point);
    }

    var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
    var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

    var a = points[prev];
    var b = point;
    var c = points[next];
    getControlPoints(a, b, c);

    b.command = i === 0 ? Commands.move : Commands.curve;

  }

};

/**
 * @name Two.Utils.getControlPoints
 * @function
 * @param {Anchor} a
 * @param {Anchor} b
 * @param {Anchor} c
 * @returns {Anchor} Returns the passed middle point `b`.
 * @description Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
 */
var getControlPoints = function(a, b, c) {

  var a1 = Vector.angleBetween(a, b);
  var a2 = Vector.angleBetween(c, b);

  var d1 = Vector.distanceBetween(a, b);
  var d2 = Vector.distanceBetween(c, b);

  var mid = (a1 + a2) / 2;

  // TODO: Issue 73
  if (d1 < 0.0001 || d2 < 0.0001) {
    if (typeof b.relative === 'boolean' && !b.relative) {
      b.controls.left.copy(b);
      b.controls.right.copy(b);
    }
    return b;
  }

  d1 *= 0.33; // Why 0.33?
  d2 *= 0.33;

  if (a2 < a1) {
    mid += HALF_PI$3;
  } else {
    mid -= HALF_PI$3;
  }

  b.controls.left.x = Math.cos(mid) * d1;
  b.controls.left.y = Math.sin(mid) * d1;

  mid -= Math.PI;

  b.controls.right.x = Math.cos(mid) * d2;
  b.controls.right.y = Math.sin(mid) * d2;

  if (typeof b.relative === 'boolean' && !b.relative) {
    b.controls.left.x += b.x;
    b.controls.left.y += b.y;
    b.controls.right.x += b.x;
    b.controls.right.y += b.y;
  }

  return b;

};

/**
 * @name Two.Utils.getReflection
 * @function
 * @param {Vector} a
 * @param {Vector} b
 * @param {Boolean} [relative=false]
 * @returns {Vector} New {@link Vector} that represents the reflection point.
 * @description Get the reflection of a point `b` about point `a`. Where `a` is in absolute space and `b` is relative to `a`.
 * @see {@link http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes}
 */
var getReflection = function(a, b, relative) {

  return new Vector(
    2 * a.x - (b.x + a.x) - (relative ? a.x : 0),
    2 * a.y - (b.y + a.y) - (relative ? a.y : 0)
  );

};

/**
 * @name Two.Utils.getAnchorsFromArcData
 * @function
 * @param {Vector} center
 * @param {Number} xAxisRotation
 * @param {Number} rx - x radius
 * @param {Number} ry - y radius
 * @param {Number} ts
 * @param {Number} td
 * @param {Boolean} [ccw=false] - Set path traversal to counter-clockwise
 */
var getAnchorsFromArcData = function(center, xAxisRotation, rx, ry, ts, td, ccw) {

  var resolution = Constants.Resolution;

  for (var i = 0; i < resolution; i++) {
    var pct = (i + 1) / resolution;
    if (ccw) {
      pct = 1 - pct;
    }

    var theta = pct * td + ts;
    var x = rx * Math.cos(theta);
    var y = ry * Math.sin(theta);

    // x += center.x;
    // y += center.y;

    var anchor = new Anchor(x, y);
    Anchor.AppendCurveProperties(anchor);
    anchor.command = Commands.line;
  }

};

var Curves = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Curve: Curve,
  getComponentOnCubicBezier: getComponentOnCubicBezier,
  subdivide: subdivide,
  getCurveLength: getCurveLength$1,
  getCurveBoundingBox: getCurveBoundingBox,
  integrate: integrate,
  getCurveFromPoints: getCurveFromPoints,
  getControlPoints: getControlPoints,
  getReflection: getReflection,
  getAnchorsFromArcData: getAnchorsFromArcData
});

var devicePixelRatio = root$1.devicePixelRatio || 1;

var getBackingStoreRatio = function(ctx) {
  return ctx.webkitBackingStorePixelRatio ||
  ctx.mozBackingStorePixelRatio ||
  ctx.msBackingStorePixelRatio ||
  ctx.oBackingStorePixelRatio ||
  ctx.backingStorePixelRatio || 1;
};

/**
 * @name Two.Utils.getRatio
 * @function
 * @param {CanvasRenderingContext2D} ctx
 * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
 * @see [High DPI Rendering](http://www.html5rocks.com/en/tutorials/canvas/hidpi/)
 */
var getRatio = function(ctx) {
  return devicePixelRatio / getBackingStoreRatio(ctx);
};

// Constants

var cos$5 = Math.cos, sin$5 = Math.sin, tan = Math.tan;
var array = [];

/**
 * @name Two.Matrix
 * @class
 * @param {Number} [a=1] - The value for element at the first column and first row.
 * @param {Number} [b=0] - The value for element at the second column and first row.
 * @param {Number} [c=0] - The value for element at the third column and first row.
 * @param {Number} [d=0] - The value for element at the first column and second row.
 * @param {Number} [e=1] - The value for element at the second column and second row.
 * @param {Number} [f=0] - The value for element at the third column and second row.
 * @param {Number} [g=0] - The value for element at the first column and third row.
 * @param {Number} [h=0] - The value for element at the second column and third row.
 * @param {Number} [i=1] - The value for element at the third column and third row.
 * @description A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.
 * @nota-bene Order is based on how to construct transformation strings for the browser.
 */
function Matrix(a, b, c, d, e, f) {

  /**
   * @name Two.Matrix#elements
   * @property {Number[]} - The underlying data stored as an array.
   */
  this.elements = new NumArray(9);

  var elements = a;
  if (!Array.isArray(elements)) {
    elements = Array.prototype.slice.call(arguments);
  }

  // initialize the elements with default values.
  this.identity();

  if (elements.length > 0) {
    this.set(elements);
  }

}

setMatrix(Matrix);

_.extend(Matrix, {

  /**
   * @name Two.Matrix.Identity
   * @property {Number[]} - A stored reference to the default value of a 3 x 3 matrix.
   */
  Identity: [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ],

  /**
   * @name Two.Matrix.Multiply
   * @function
   * @param {Two.Matrix} A
   * @param {Two.Matrix} B
   * @param {Two.Matrix} [C] - An optional matrix to apply the multiplication to.
   * @returns {Two.Matrix} - If an optional `C` matrix isn't passed then a new one is created and returned.
   * @description Multiply two matrices together and return the result.
   */
  Multiply: function(A, B, C) {

    if (B.length <= 3) { // Multiply Vector

      var x, y, z, e = A;

      var a = B[0] || 0,
          b = B[1] || 0,
          c = B[2] || 0;

      // Go down rows first
      // a, d, g, b, e, h, c, f, i

      x = e[0] * a + e[1] * b + e[2] * c;
      y = e[3] * a + e[4] * b + e[5] * c;
      z = e[6] * a + e[7] * b + e[8] * c;

      return { x: x, y: y, z: z };

    }

    var A0 = A[0], A1 = A[1], A2 = A[2];
    var A3 = A[3], A4 = A[4], A5 = A[5];
    var A6 = A[6], A7 = A[7], A8 = A[8];

    var B0 = B[0], B1 = B[1], B2 = B[2];
    var B3 = B[3], B4 = B[4], B5 = B[5];
    var B6 = B[6], B7 = B[7], B8 = B[8];

    C = C || new NumArray(9);

    C[0] = A0 * B0 + A1 * B3 + A2 * B6;
    C[1] = A0 * B1 + A1 * B4 + A2 * B7;
    C[2] = A0 * B2 + A1 * B5 + A2 * B8;
    C[3] = A3 * B0 + A4 * B3 + A5 * B6;
    C[4] = A3 * B1 + A4 * B4 + A5 * B7;
    C[5] = A3 * B2 + A4 * B5 + A5 * B8;
    C[6] = A6 * B0 + A7 * B3 + A8 * B6;
    C[7] = A6 * B1 + A7 * B4 + A8 * B7;
    C[8] = A6 * B2 + A7 * B5 + A8 * B8;

    return C;

  }

});

_.extend(Matrix.prototype, Events, {

  constructor: Matrix,

  /**
   * @name Two.Matrix#manual
   * @property {Boolean} - Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.
   * @nota-bene - Setting to `true` nullifies {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale}.
   */
  manual: false,

  /**
   * @name Two.Matrix#set
   * @function
   * @param {Number} a - The value for element at the first column and first row.
   * @param {Number} b - The value for element at the second column and first row.
   * @param {Number} c - The value for element at the third column and first row.
   * @param {Number} d - The value for element at the first column and second row.
   * @param {Number} e - The value for element at the second column and second row.
   * @param {Number} f - The value for element at the third column and second row.
   * @param {Number} g - The value for element at the first column and third row.
   * @param {Number} h - The value for element at the second column and third row.
   * @param {Number} i - The value for element at the third column and third row.
   * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
   */

    /**
    * @name Two.Matrix#set
    * @function
    * @param {Number[]} a - The array of elements to apply.
    * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
    */
  set: function(a, b, c, d, e, f, g, h, i) {

    var elements;

    if (typeof b === 'undefined') {
      elements = a;
      a = elements[0];
      b = elements[1];
      c = elements[2];
      d = elements[3];
      e = elements[4];
      f = elements[5];
      g = elements[6];
      h = elements[7];
      i = elements[8];
    }

    this.elements[0] = a;
    this.elements[1] = b;
    this.elements[2] = c;
    this.elements[3] = d;
    this.elements[4] = e;
    this.elements[5] = f;
    this.elements[6] = g;
    this.elements[7] = h;
    this.elements[8] = i;

    return this.trigger(Events.Types.change);

  },

  /**
   * @name Two.Matrix#copy
   * @function
   * @description Copy the matrix of one to the current instance.
   */
  copy: function(m) {

    this.elements[0] = m.elements[0];
    this.elements[1] = m.elements[1];
    this.elements[2] = m.elements[2];
    this.elements[3] = m.elements[3];
    this.elements[4] = m.elements[4];
    this.elements[5] = m.elements[5];
    this.elements[6] = m.elements[6];
    this.elements[7] = m.elements[7];
    this.elements[8] = m.elements[8];

    this.manual = m.manual;

    return this.trigger(Events.Types.change);

  },

  /**
   * @name Two.Matrix#identity
   * @function
   * @description Turn matrix to the identity, like resetting.
   */
  identity: function() {

    this.elements[0] = Matrix.Identity[0];
    this.elements[1] = Matrix.Identity[1];
    this.elements[2] = Matrix.Identity[2];
    this.elements[3] = Matrix.Identity[3];
    this.elements[4] = Matrix.Identity[4];
    this.elements[5] = Matrix.Identity[5];
    this.elements[6] = Matrix.Identity[6];
    this.elements[7] = Matrix.Identity[7];
    this.elements[8] = Matrix.Identity[8];

    return this.trigger(Events.Types.change);

  },

  /**
   * @name Two.Matrix#multiply
   * @function
   * @param {Number} a - The scalar to be multiplied.
   * @description Multiply all components of the matrix against a single scalar value.
   * @overloaded
   */

  /**
   * @name Two.Matrix#multiply
   * @function
   * @param {Number} a - The x component to be multiplied.
   * @param {Number} b - The y component to be multiplied.
   * @param {Number} c - The z component to be multiplied.
   * @description Multiply all components of a matrix against a 3 component vector.
   * @overloaded
   */

  /**
   * @name Two.Matrix#multiply
   * @function
   * @param {Number} a - The value at the first column and first row of the matrix to be multiplied.
   * @param {Number} b - The value at the second column and first row of the matrix to be multiplied.
   * @param {Number} c - The value at the third column and first row of the matrix to be multiplied.
   * @param {Number} d - The value at the first column and second row of the matrix to be multiplied.
   * @param {Number} e - The value at the second column and second row of the matrix to be multiplied.
   * @param {Number} f - The value at the third column and second row of the matrix to be multiplied.
   * @param {Number} g - The value at the first column and third row of the matrix to be multiplied.
   * @param {Number} h - The value at the second column and third row of the matrix to be multiplied.
   * @param {Number} i - The value at the third column and third row of the matrix to be multiplied.
   * @description Multiply all components of a matrix against another matrix.
   * @overloaded
   */
  multiply: function(a, b, c, d, e, f, g, h, i) {

    // Multiply scalar

    if (typeof b === 'undefined') {

      this.elements[0] *= a;
      this.elements[1] *= a;
      this.elements[2] *= a;
      this.elements[3] *= a;
      this.elements[4] *= a;
      this.elements[5] *= a;
      this.elements[6] *= a;
      this.elements[7] *= a;
      this.elements[8] *= a;

      return this.trigger(Events.Types.change);

    }

    if (typeof d === 'undefined') { // Multiply Vector

      var x, y, z;
      a = a || 0;
      b = b || 0;
      c = c || 0;
      e = this.elements;

      // Go down rows first
      // a, d, g, b, e, h, c, f, i

      x = e[0] * a + e[1] * b + e[2] * c;
      y = e[3] * a + e[4] * b + e[5] * c;
      z = e[6] * a + e[7] * b + e[8] * c;

      return { x: x, y: y, z: z };

    }

    // Multiple matrix

    var A = this.elements;
    var B = [a, b, c, d, e, f, g, h, i];

    var A0 = A[0], A1 = A[1], A2 = A[2];
    var A3 = A[3], A4 = A[4], A5 = A[5];
    var A6 = A[6], A7 = A[7], A8 = A[8];

    var B0 = B[0], B1 = B[1], B2 = B[2];
    var B3 = B[3], B4 = B[4], B5 = B[5];
    var B6 = B[6], B7 = B[7], B8 = B[8];

    this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
    this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
    this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;

    this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
    this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
    this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;

    this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
    this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
    this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;

    return this.trigger(Events.Types.change);

  },

  /**
   * @name Two.Matrix#inverse
   * @function
   * @param {Two.Matrix} [out] - The optional matrix to apply the inversion to.
   * @description Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
   */
  inverse: function(out) {

    var a = this.elements;
    out = out || new Matrix();

    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];

    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    var det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }

    det = 1.0 / det;

    out.elements[0] = b01 * det;
    out.elements[1] = (-a22 * a01 + a02 * a21) * det;
    out.elements[2] = (a12 * a01 - a02 * a11) * det;
    out.elements[3] = b11 * det;
    out.elements[4] = (a22 * a00 - a02 * a20) * det;
    out.elements[5] = (-a12 * a00 + a02 * a10) * det;
    out.elements[6] = b21 * det;
    out.elements[7] = (-a21 * a00 + a01 * a20) * det;
    out.elements[8] = (a11 * a00 - a01 * a10) * det;

    return out;

  },

  /**
   * @name Two.Matrix#scale
   * @function
   * @param {Number} scale - The one dimensional scale to apply to the matrix.
   * @description Uniformly scale the transformation matrix.
   */

  /**
   * @name Two.Matrix#scale
   * @function
   * @param {Number} sx - The horizontal scale factor.
   * @param {Number} sy - The vertical scale factor
   * @description Scale the transformation matrix in two dimensions.
   */
  scale: function(sx, sy) {

    var l = arguments.length;
    if (l <= 1) {
      sy = sx;
    }

    return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);

  },

  /**
   * @name Two.Matrix#rotate
   * @function
   * @param {Number} Number - The amount to rotate in Number.
   * @description Rotate the matrix.
   */
  rotate: function(Number) {

    var c = cos$5(Number);
    var s = sin$5(Number);

    return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);

  },

  /**
   * @name Two.Matrix#translate
   * @function
   * @param {Number} x - The horizontal translation value to apply.
   * @param {Number} y - The vertical translation value to apply.
   * @description Translate the matrix.
   */
  translate: function(x, y) {

    return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);

  },

  /**
   * @name Two.Matrix#skewX
   * @function
   * @param {Number} Number - The amount to skew in Number.
   * @description Skew the matrix by an angle in the x axis direction.
   */
  skewX: function(Number) {

    var a = tan(Number);

    return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);

  },

  /**
   * @name Two.Matrix#skewY
   * @function
   * @param {Number} Number - The amount to skew in Number.
   * @description Skew the matrix by an angle in the y axis direction.
   */
  skewY: function(Number) {

    var a = tan(Number);

    return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);

  },

  /**
   * @name Two.Matrix#toString
   * @function
   * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
   * @returns {String} - The transformation matrix as a 6 component string separated by spaces.
   * @description Create a transform string. Used for the Two.js rendering APIs.
   */
  toString: function(fullMatrix) {

    array.length = 0;
    this.toTransformArray(fullMatrix, array);

    return array.map(toFixed).join(' ');

  },

  /**
   * @name Two.Matrix#toTransformArray
   * @function
   * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 in the format for 2D transformations.
   * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
   * @description Create a transform array. Used for the Two.js rendering APIs.
   */
  toTransformArray: function(fullMatrix, output) {

    var elements = this.elements;
    var hasOutput = !!output;

    var a = elements[0];
    var b = elements[1];
    var c = elements[2];
    var d = elements[3];
    var e = elements[4];
    var f = elements[5];

    if (fullMatrix) {

      var g = elements[6];
      var h = elements[7];
      var i = elements[8];

      if (hasOutput) {
        output[0] = a;
        output[1] = d;
        output[2] = g;
        output[3] = b;
        output[4] = e;
        output[5] = h;
        output[6] = c;
        output[7] = f;
        output[8] = i;
        return;
      }

      return [
        a, d, g, b, e, h, c, f, i
      ];
    }

    if (hasOutput) {
      output[0] = a;
      output[1] = d;
      output[2] = b;
      output[3] = e;
      output[4] = c;
      output[5] = f;
      return;
    }

    return [
      a, d, b, e, c, f  // Specific format see LN:19
    ];

  },

  /**
   * @name Two.Matrix#toArray
   * @function
   * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
   * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
   * @description Create a transform array. Used for the Two.js rendering APIs.
   */
  toArray: function(fullMatrix, output) {

    var elements = this.elements;
    var hasOutput = !!output;

    var a = elements[0];
    var b = elements[1];
    var c = elements[2];
    var d = elements[3];
    var e = elements[4];
    var f = elements[5];

    if (fullMatrix) {

      var g = elements[6];
      var h = elements[7];
      var i = elements[8];

      if (hasOutput) {
        output[0] = a;
        output[1] = b;
        output[2] = c;
        output[3] = d;
        output[4] = e;
        output[5] = f;
        output[6] = g;
        output[7] = h;
        output[8] = i;
        return;
      }

      return [
        a, b, c, d, e, f, g, h, i
      ];
    }

    if (hasOutput) {
      output[0] = a;
      output[1] = b;
      output[2] = c;
      output[3] = d;
      output[4] = e;
      output[5] = f;
      return;
    }

    return [
      a, b, c, d, e, f
    ];

  },

  /**
   * @name Two.Matrix#toObject
   * @function
   * @description Create a JSON compatible object that represents information of the matrix.
   */
  toObject: function() {
    return {
      elements: this.toArray(true),
      manual: !!this.manual
    };
  },

  /**
   * @name Two.Matrix#clone
   * @function
   * @description Clone the current matrix.
   */
  clone: function() {

    return new Matrix().copy(this);

  }

});

/**
 * @name Two.Shape
 * @class
 * @extends Two.Events
 * @description The foundational transformation object for the Two.js scenegraph.
 */
function Shape() {

  /**
   * @name Two.Shape#renderer
   * @property {Object}
   * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  this.renderer = {};
  this._renderer.flagMatrix = Shape.FlagMatrix.bind(this);
  this.isShape = true;

  /**
   * @name Two.Shape#id
   * @property {String} - Session specific unique identifier.
   * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
   */
  this.id = Constants.Identifier + Constants.uniqueId();

  /**
   * @name Two.Shape#classList
   * @property {String[]}
   * @description A list of class strings stored if imported / interpreted  from an SVG element.
   */
  this.classList = [];

  /**
   * @name Two.Shape#matrix
   * @property {Two.Matrix}
   * @description The transformation matrix of the shape.
   * @nota-bene {@link Two.Shape#translation}, {@link Two.Shape#rotation}, {@link Two.Shape#scale}, {@link Two.Shape#skewX}, and {@link Two.Shape#skewY} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
   */
  this.matrix = new Matrix();

  /**
   * @name Two.Shape#translation
   * @property {Two.Vector} - The x and y value for where the shape is placed relative to its parent.
   */
  this.translation = new Vector();

  /**
   * @name Two.Shape#rotation
   * @property {Number} - The value in Number for how much the shape is rotated relative to its parent.
   */
  this.rotation = 0;

  /**
   * @name Two.Shape#scale
   * @property {Number} - The value for how much the shape is scaled relative to its parent.
   * @nota-bene This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
   */
  this.scale = 1;

  /**
   * @name Two.Shape#skewX
   * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
   * @description Skew the shape by an angle in the x axis direction.
   */
  this.skewX = 0;

  /**
   * @name Two.Shape#skewY
   * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
   * @description Skew the shape by an angle in the y axis direction.
   */
  this.skewY = 0;

}

_.extend(Shape, {

  /**
   * @name Two.Shape.FlagMatrix
   * @function
   * @description Utility function used in conjunction with event handlers to update the flagMatrix of a shape.
   */
  FlagMatrix: function() {
    this._flagMatrix = true;
  },

  /**
   * @name Two.Shape.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Shape} to any object. Handy if you'd like to extend the {@link Two.Shape} class on a custom class.
   */
  MakeObservable: function(object) {

    var translation = {
      enumerable: false,
      get: function() {
        return this._translation;
      },
      set: function(v) {
        if (this._translation) {
          this._translation.unbind(Events.Types.change, this._renderer.flagMatrix);
        }
        this._translation = v;
        this._translation.bind(Events.Types.change, this._renderer.flagMatrix);
        Shape.FlagMatrix.call(this);
      }
    };

    Object.defineProperty(object, 'translation', translation);
    Object.defineProperty(object, 'position', translation);

    Object.defineProperty(object, 'rotation', {
      enumerable: true,
      get: function() {
        return this._rotation;
      },
      set: function(v) {
        this._rotation = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'scale', {
      enumerable: true,
      get: function() {
        return this._scale;
      },
      set: function(v) {

        if (this._scale instanceof Vector) {
          this._scale.unbind(Events.Types.change, this._renderer.flagMatrix);
        }

        this._scale = v;

        if (this._scale instanceof Vector) {
          this._scale.bind(Events.Types.change, this._renderer.flagMatrix);
        }

        this._flagMatrix = true;
        this._flagScale = true;

      }
    });

    Object.defineProperty(object, 'skewX', {
      enumerable: true,
      get: function() {
        return this._skewX;
      },
      set: function(v) {
        this._skewX = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'skewY', {
      enumerable: true,
      get: function() {
        return this._skewY;
      },
      set: function(v) {
        this._skewY = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'matrix', {
      enumerable: true,
      get: function() {
        return this._matrix;
      },
      set: function(v) {
        this._matrix = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'id', {
      enumerable: true,
      get: function() {
        return this._id;
      },
      set: function(v) {
        var id = this._id;
        if (v === this._id) {
          return;
        }
        this._id = v;
        this._flagId = true;
        if (this.parent) {
          delete this.parent.children.ids[id];
          this.parent.children.ids[this._id] = this;
        }
      }
    });

    Object.defineProperty(object, 'className', {

      enumerable: true,

      get: function() {
        return this._className;
      },

      set: function(v) {

        this._flagClassName = this._className !== v;

        if (this._flagClassName) {

          var prev = this._className.split(/\s+?/);
          var dest = v.split(/\s+?/);

          for (var i = 0; i < prev.length; i++) {
            var className = prev[i];
            var index = Array.prototype.indexOf.call(this.classList, className);
            if (index >= 0) {
              this.classList.splice(index, 1);
            }
          }

          this.classList = this.classList.concat(dest);

        }

        this._className = v;

      }

    });

    Object.defineProperty(object, 'renderer', {

      enumerable: false,

      get: function() {
        return this._renderer;
      },

      set: function(obj) {
        this._renderer = obj;
      }

    });

  }

});

_.extend(Shape.prototype, Events, {

  constructor: Shape,

  // Flags

  /**
   * @name Two.Shape#_id
   * @private
   * @property {Boolean} - Determines whether the id needs updating.
   */
  _flagId: true,

  /**
   * @name Two.Shape#_flagMatrix
   * @private
   * @property {Boolean} - Determines whether the matrix needs updating.
   */
  _flagMatrix: true,

  /**
   * @name Two.Shape#_flagScale
   * @private
   * @property {Boolean} - Determines whether the scale needs updating.
   */
  _flagScale: false,

  // _flagMask: false,
  // _flagClip: false,

  /**
   * @name Two.Shape#_flagClassName
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#className} need updating.
   */
  _flagClassName: false,

  // Underlying Properties

  _id: '',

  /**
   * @name Two.Shape#_translation
   * @private
   * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
   */
  _translation: null,

  /**
   * @name Two.Shape#_rotation
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _rotation: 0,

  /**
   * @name Two.Shape#_translation
   * @private
   * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
   */
  _scale: 1,

  /**
   * @name Two.Shape#_skewX
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _skewX: 0,

  /**
   * @name Two.Shape#_skewY
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _skewY: 0,

  /**
   * @name Two.Shape#className
   * @property {String} - A class to be applied to the element to be compatible with CSS styling.
   * @nota-bene Only available for the SVG renderer.
   */
  _className: '',

  /**
   * @name Two.Shape#addTo
   * @function
   * @param {Two.Group} group - The parent the shape adds itself to.
   * @description Convenience method to add itself to the scenegraph.
   */
  addTo: function(group) {
    group.add(this);
    return this;
  },

  /**
   * @name Two.Shape#clone
   * @function
   * @param {Two.Group} [parent] - Optional argument to automatically add the shape to a scenegraph.
   * @returns {Two.Shape}
   * @description Create a new {@link Two.Shape} with the same values as the current shape.
   */
  clone: function(parent) {

    var clone = new Shape();

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();

  },

  /**
   * @name Two.Shape#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function(bubbles) {

    if (!this._matrix.manual && this._flagMatrix) {

      this._matrix
        .identity()
        .translate(this.translation.x, this.translation.y);

        if (this._scale instanceof Vector) {
          this._matrix.scale(this._scale.x, this._scale.y);
        } else {
          this._matrix.scale(this._scale);
        }

        this._matrix.rotate(this.rotation);
        this._matrix.skewX(this.skewX);
        this._matrix.skewY(this.skewY);
    }

    if (bubbles) {
      if (this.parent && this.parent._update) {
        this.parent._update();
      }
    }

    return this;

  },

  /**
   * @name Two.Shape#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagId = this._flagMatrix = this._flagScale =
      this._flagClassName = false;

    return this;

  }

});

Shape.MakeObservable(Shape.prototype);

/**
 * @name Two.Collection
 * @class
 * @extends Two.Events
 * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
 */
function Collection() {

  Array.call(this);

  if (arguments[0] && Array.isArray(arguments[0])) {
    if (arguments[0].length > 0) {
      Array.prototype.push.apply(this, arguments[0]);
    }
  } else if (arguments.length > 0) {
    Array.prototype.push.apply(this, arguments);
  }

}

Collection.prototype = new Array();

_.extend(Collection.prototype, Events, {

  constructor: Collection,

  pop: function() {
    var popped = Array.prototype.pop.apply(this, arguments);
    this.trigger(Events.Types.remove, [popped]);
    return popped;
  },

  shift: function() {
    var shifted = Array.prototype.shift.apply(this, arguments);
    this.trigger(Events.Types.remove, [shifted]);
    return shifted;
  },

  push: function() {
    var pushed = Array.prototype.push.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return pushed;
  },

  unshift: function() {
    var unshifted = Array.prototype.unshift.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return unshifted;
  },

  splice: function() {
    var spliced = Array.prototype.splice.apply(this, arguments);
    var inserted;

    this.trigger(Events.Types.remove, spliced);

    if (arguments.length > 2) {
      inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
      this.trigger(Events.Types.insert, inserted);
      this.trigger(Events.Types.order);
    }
    return spliced;
  },

  sort: function() {
    Array.prototype.sort.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  },

  reverse: function() {
    Array.prototype.reverse.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  },

  indexOf: function() {
    return Array.prototype.indexOf.apply(this, arguments);
  }

});

/**
 * @class
 * @name Two.Group.Children
 * @extends Two.Collection
 * @description A children collection which is accesible both by index and by object `id`.
 */
function Children(children) {

  Collection.apply(this, arguments);

  Object.defineProperty(this, '_events', {
    value : {},
    enumerable: false
  });

  /**
   * @name Two.Group.Children#ids
   * @property {Object} - Map of all elements in the list keyed by `id`s.
   */
  this.ids = {};

  this.attach(
    Array.isArray(children) ? children : Array.prototype.slice.call(arguments)
  );

  this.on(Events.Types.insert, this.attach);
  this.on(Events.Types.remove, this.detach);

}

Children.prototype = new Collection();

_.extend(Children.prototype, {

  constructor: Children,

  /**
   * @function
   * @name Two.Group.Children#attach
   * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be added.
   * @description Adds elements to the `ids` map.
   */
  attach: function(children) {
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child && child.id) {
        this.ids[child.id] = child;
      }
    }
    return this;
  },

  /**
   * @function
   * @name Two.Group.Children#detach
   * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be removed.
   * @description Removes elements to the `ids` map.
   */
  detach: function(children) {
    for (var i = 0; i < children.length; i++) {
      delete this.ids[children[i].id];
    }
    return this;
  }

});

// Constants

var min$3 = Math.min, max$3 = Math.max;

/**
 * @name Two.Group
 * @class
 * @extends Two.Shape
 * @param {Two.Shape[]} [children] - A list of objects that inherit {@link Two.Shape}. For instance, the array could be a {@link Two.Path}, {@link Two.Text}, and {@link Two.RoundedRectangle}.
 * @description This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.
 * @nota-bene The {@link Two#scene} is an instance of `Two.Group`.
 */
function Group(children) {

  Shape.call(this, true);

  this._renderer.type = 'group';

  /**
   * @name Two.Group#additions
   * @property {Two.Shape[]}
   * @description An automatically updated list of children that need to be appended to the renderer's scenegraph.
   */
  this.additions = [];

  /**
   * @name Two.Group#subtractions
   * @property {Two.Shape[]}
   * @description An automatically updated list of children that need to be removed from the renderer's scenegraph.
   */
  this.subtractions = [];

  /**
   * @name Two.Group#children
   * @property {Two.Group.Children}
   * @description A list of all the children in the scenegraph.
   * @nota-bene Ther order of this list indicates the order each element is rendered to the screen.
   */
  this.children = Array.isArray(children) ? children : Array.prototype.slice.call(arguments);

}

_.extend(Group, {

  Children: Children,

  /**
   * @name Two.Group.InsertChildren
   * @function
   * @param {Two.Shape[]} children - The objects to be inserted.
   * @description Cached method to let renderers know children have been added to a {@link Two.Group}.
   */
  InsertChildren: function(children) {
    for (var i = 0; i < children.length; i++) {
      replaceParent.call(this, children[i], this);
    }
  },

  /**
   * @name Two.Group.RemoveChildren
   * @function
   * @param {Two.Shape[]} children - The objects to be removed.
   * @description Cached method to let renderers know children have been removed from a {@link Two.Group}.
   */
  RemoveChildren: function(children) {
    for (var i = 0; i < children.length; i++) {
      replaceParent.call(this, children[i]);
    }
  },

  /**
   * @name Two.Group.OrderChildren
   * @function
   * @description Cached method to let renderers know order has been updated on a {@link Two.Group}.
   */
  OrderChildren: function(children) {
    this._flagOrder = true;
  },

  /**
   * @name Two.Group.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Group}.
   */
  Properties: [
    'fill',
    'stroke',
    'linewidth',
    'cap',
    'join',
    'miter',

    'closed',
    'curved',
    'automatic'
  ],

  /**
   * @name Two.Group.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Group} to any object. Handy if you'd like to extend the {@link Two.Group} class on a custom class.
   */
  MakeObservable: function(object) {

    var properties = Group.Properties;

    Object.defineProperty(object, 'visible', {

      enumerable: true,

      get: function() {
        return this._visible;
      },

      set: function(v) {
        this._flagVisible = this._visible !== v || this._flagVisible;
        this._visible = v;
      }

    });

    Object.defineProperty(object, 'opacity', {

      enumerable: true,

      get: function() {
        return this._opacity;
      },

      set: function(v) {
        this._flagOpacity = this._opacity !== v || this._flagOpacity;
        this._opacity = v;
      }

    });

    Object.defineProperty(object, 'beginning', {

      enumerable: true,

      get: function() {
        return this._beginning;
      },

      set: function(v) {
        this._flagBeginning = this._beginning !== v || this._flagBeginning;
        this._beginning = v;
      }

    });

    Object.defineProperty(object, 'ending', {

      enumerable: true,

      get: function() {
        return this._ending;
      },

      set: function(v) {
        this._flagEnding = this._ending !== v || this._flagEnding;
        this._ending = v;
      }

    });

    Object.defineProperty(object, 'length', {

      enumerable: true,

      get: function() {
        if (this._flagLength || this._length <= 0) {
          this._length = 0;
          if (!this.children) {
            return this._length;
          }
          for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            this._length += child.length;
          }
        }
        return this._length;
      }

    });

    Shape.MakeObservable(object);
    Group.MakeGetterSetters(object, properties);

    Object.defineProperty(object, 'children', {

      enumerable: true,

      get: function() {
        return this._children;
      },

      set: function(children) {

        var insertChildren = Group.InsertChildren.bind(this);
        var removeChildren = Group.RemoveChildren.bind(this);
        var orderChildren = Group.OrderChildren.bind(this);

        if (this._children) {
          this._children.unbind();
          if (this._children.length > 0) {
            removeChildren(this._children);
          }
        }

        this._children = new Children(children);
        this._children.bind(Events.Types.insert, insertChildren);
        this._children.bind(Events.Types.remove, removeChildren);
        this._children.bind(Events.Types.order, orderChildren);

        if (children.length > 0) {
          insertChildren(children);
        }

      }

    });

    Object.defineProperty(object, 'mask', {

      enumerable: true,

      get: function() {
        return this._mask;
      },

      set: function(v) {
        this._mask = v;
        this._flagMask = true;
        if (!v.clip) {
          v.clip = true;
        }
      }

    });

  },

  /**
   * @name Two.Group.MakeGetterSetters
   * @function
   * @param {Two.Group} group - The group to apply getters and setters.
   * @param {Object} properties - A key / value object containing properties to inherit.
   * @description Convenience method to apply getter / setter logic on an array of properties. Used in {@link Two.Group.MakeObservable}.
   */
  MakeGetterSetters: function(group, properties) {

    if (!Array.isArray(properties)) {
      properties = [properties];
    }

    _.each(properties, function(k) {
      Group.MakeGetterSetter(group, k);
    });

  },

  /**
   * @name Two.Group.MakeGetterSetter
   * @function
   * @param {Two.Group} group - The group to apply getters and setters.
   * @param {String} key - The key which will become a property on the group.
   * @description Convenience method to apply getter / setter logic specific to how `Two.Group`s trickle down styles to their children. Used in {@link Two.Group.MakeObservable}.
   */
  MakeGetterSetter: function(group, key) {

    var secret = '_' + key;

    Object.defineProperty(group, key, {

      enumerable: true,

      get: function() {
        return this[secret];
      },

      set: function(v) {
        this[secret] = v;
        // Trickle down styles
        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];
          child[key] = v;
        }
      }

    });

  }

});

_.extend(Group.prototype, Shape.prototype, {

  constructor: Group,

  // Flags
  // http://en.wikipedia.org/wiki/Flag

  /**
   * @name Two.Group#_flagAdditions
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#additions} needs updating.
   */
  _flagAdditions: false,

  /**
   * @name Two.Group#_flagSubtractions
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#subtractions} needs updating.
   */
  _flagSubtractions: false,

  /**
   * @name Two.Group#_flagOrder
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#order} needs updating.
   */
  _flagOrder: false,

  /**
   * @name Two.Group#_flagVisible
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#visible} needs updating.
   */

  /**
   * @name Two.Group#_flagOpacity
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#opacity} needs updating.
   */
  _flagOpacity: true,

  /**
   * @name Two.Group#_flagBeginning
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#beginning} needs updating.
   */
  _flagBeginning: false,

  /**
   * @name Two.Group#_flagEnding
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#ending} needs updating.
   */
  _flagEnding: false,

  /**
   * @name Two.Group#_flagLength
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#length} needs updating.
   */
  _flagLength: false,

  /**
   * @name Two.Group#_flagMask
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#mask} needs updating.
   */
  _flagMask: false,

  // Underlying Properties

  /**
   * @name Two.Group#fill
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _fill: '#fff',

  /**
   * @name Two.Group#stroke
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be outlined in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _stroke: '#000',

  /**
   * @name Two.Group#linewidth
   * @property {Number} - The thickness in pixels of the stroke for all child shapes.
   */
  _linewidth: 1.0,

  /**
   * @name Two.Group#opacity
   * @property {Number} - The opaqueness of all child shapes.
   * @nota-bene Becomes multiplied by the individual child's opacity property.
   */
  _opacity: 1.0,

  /**
   * @name Two.Group#visible
   * @property {Boolean} - Display the path or not.
   * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
   */
  _visible: true,

  /**
   * @name Two.Group#cap
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
   */
  _cap: 'round',

  /**
   * @name Two.Group#join
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
   */
  _join: 'round',

  /**
   * @name Two.Group#miter
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
   */
  _miter: 4,

  /**
   * @name Two.Group#closed
   * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.
   */
  _closed: true,

  /**
   * @name Two.Group#curved
   * @property {Boolean} - When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
   */
  _curved: false,

  /**
   * @name Two.Group#automatic
   * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
   */
  _automatic: true,

  /**
   * @name Two.Group#beginning
   * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
   * @description {@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
   * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#ending}.
   */
  _beginning: 0,

  /**
   * @name Two.Group#ending
   * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
   * @description {@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
   * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#beginning}.
   */
  _ending: 1.0,

  /**
   * @name Two.Group#length
   * @property {Number} - The sum of distances between all child lengths.
   */
  _length: 0,

  /**
   * @name Two.Group#mask
   * @property {Two.Shape} - The Two.js object to clip from a group's rendering.
   */
  _mask: null,

  /**
   * @name Two.Group#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Group}
   * @description Create a new instance of {@link Two.Group} with the same properties of the current group.
   */
  clone: function(parent) {

    // /**
    //  * TODO: Group has a gotcha in that it's at the moment required to be bound to
    //  * an instance of two in order to add elements correctly. This needs to
    //  * be rethought and fixed.
    //  */

    var clone = new Group();
    var children = this.children.map(function(child) {
      return child.clone();
    });

    clone.add(children);

    clone.opacity = this.opacity;

    if (this.mask) {
      clone.mask = this.mask;
    }

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.className = this.className;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();

  },

  /**
   * @name Two.Group#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the group.
   */
  toObject: function() {

    var result = {
      children: [],
      translation: this.translation.toObject(),
      rotation: this.rotation,
      scale: this.scale instanceof Vector ? this.scale.toObject() : this.scale,
      opacity: this.opacity,
      className: this.className,
      mask: (this.mask ? this.mask.toObject() : null)
    };

    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }

    _.each(this.children, function(child, i) {
      result.children[i] = child.toObject();
    }, this);

    return result;

  },

  /**
   * @name Two.Group#corner
   * @function
   * @description Orient the children of the group to the upper left-hand corner of that group.
   */
  corner: function() {

    var rect = this.getBoundingClientRect(true);

    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      child.translation.x -= rect.left;
      child.translation.y -= rect.top;
    }

    return this;

  },

  /**
   * @name Two.Group#center
   * @function
   * @description Orient the children of the group to the center of that group.
   */
  center: function() {

    var rect = this.getBoundingClientRect(true);
    var cx = rect.left + rect.width / 2 - this.translation.x;
    var cy = rect.top + rect.height / 2 - this.translation.y;

    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      if (child.isShape) {
        child.translation.x -= cx;
        child.translation.y -= cy;
      }
    }

    return this;

  },

  /**
   * @name Two.Group#getById
   * @function
   * @description Recursively search for id. Returns the first element found.
   * @returns {Two.Shape} - Or `null` if nothing is found.
   */
  getById: function (id) {
    var found = null;
    function search(node) {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          found = search(node.children[i]);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }
    return search(this);
  },

  /**
   * @name Two.Group#getByClassName
   * @function
   * @description Recursively search for classes. Returns an array of matching elements.
   * @returns {Two.Shape[]} - Or empty array if nothing is found.
   */
  getByClassName: function(className) {
    var found = [];
    function search(node) {
      if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
        found.push(node);
      }
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          search(child);
        }
      }
      return found;
    }
    return search(this);
  },

  /**
   * @name Two.Group#getByType
   * @function
   * @description Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.
   * @returns {Two.Shape[]} - Empty array if nothing is found.
   */
  getByType: function(type) {
    var found = [];
    function search(node) {
      if (node instanceof type) {
        found.push(node);
      }
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          search(child);
        }
      }
      return found;
    }
    return search(this);
  },

  /**
   * @name Two.Group#add
   * @function
   * @param {Two.Shape[]} objects - An array of objects to be added. Can be also be supplied as individual arguments.
   * @description Add objects to the group.
   */
  add: function(objects) {

    // Allow to pass multiple objects either as array or as multiple arguments
    // If it's an array also create copy of it in case we're getting passed
    // a childrens array directly.
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    } else {
      objects = objects.slice();
    }

    // Add the objects
    for (var i = 0; i < objects.length; i++) {
      var child = objects[i];
      if (!(child && child.id)) {
        continue;
      }
      var index = Array.prototype.indexOf.call(this.children, child);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
      this.children.push(child);
    }

    return this;

  },

  /**
   * @name Two.Group#add
   * @function
   * @param {Two.Shape[]} objects - An array of objects to be removed. Can be also removed as individual arguments.
   * @description Remove objects from the group.
   */
  remove: function(objects) {

    var l = arguments.length,
      grandparent = this.parent;

    // Allow to call remove without arguments
    // This will detach the object from its own parent.
    if (l <= 0 && grandparent) {
      grandparent.remove(this);
      return this;
    }

    // Allow to pass multiple objects either as array or as multiple arguments
    // If it's an array also create copy of it in case we're getting passed
    // a childrens array directly.
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    } else {
      objects = objects.slice();
    }

    // Remove the objects
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i];
      if (!object || !this.children.ids[object.id]) {
        continue;
      }
      var index = this.children.indexOf(object);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
    }

    return this;

  },

  /**
   * @name Two.Group#getBoundingClientRect
   * @function
   * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
   * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
   * @description Return an object with top, left, right, bottom, width, and height parameters of the group.
   */
  getBoundingClientRect: function(shallow) {
    var rect, matrix, a, b, c, d, tc, lc, rc, bc;

    // TODO: Update this to not __always__ update. Just when it needs to.
    this._update(true);

    // Variables need to be defined here, because of nested nature of groups.
    var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

    var regex = /texture|gradient/i;

    matrix = shallow ? this._matrix : getComputedMatrix(this);

    for (var i = 0; i < this.children.length; i++) {

      var child = this.children[i];

      if (!child.visible || regex.test(child._renderer.type)) {
        continue;
      }

      rect = child.getBoundingClientRect(shallow);

      tc = typeof rect.top !== 'number' || _.isNaN(rect.top) || !isFinite(rect.top);
      lc = typeof rect.left !== 'number' || _.isNaN(rect.left) || !isFinite(rect.left);
      rc = typeof rect.right !== 'number' || _.isNaN(rect.right) || !isFinite(rect.right);
      bc = typeof rect.bottom !== 'number' || _.isNaN(rect.bottom) || !isFinite(rect.bottom);

      if (tc || lc || rc || bc) {
        continue;
      }

      top = min$3(rect.top, top);
      left = min$3(rect.left, left);
      right = max$3(rect.right, right);
      bottom = max$3(rect.bottom, bottom);

    }

    if (shallow) {

      a = matrix.multiply(left, top, 1);
      b = matrix.multiply(left, bottom, 1);
      c = matrix.multiply(right, top, 1);
      d = matrix.multiply(right, bottom, 1);

      top = min$3(a.y, b.y, c.y, d.y);
      left = min$3(a.x, b.x, c.x, d.x);
      right = max$3(a.x, b.x, c.x, d.x);
      bottom = max$3(a.y, b.y, c.y, d.y);

    }

    return {
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      width: right - left,
      height: bottom - top
    };

  },

  /**
   * @name Two.Group#noFill
   * @function
   * @description Apply `noFill` method to all child shapes.
   */
  noFill: function() {
    this.children.forEach(function(child) {
      child.noFill();
    });
    return this;
  },

  /**
   * @name Two.Group#noStroke
   * @function
   * @description Apply `noStroke` method to all child shapes.
   */
  noStroke: function() {
    this.children.forEach(function(child) {
      child.noStroke();
    });
    return this;
  },

  /**
   * @name Two.Group#subdivide
   * @function
   * @description Apply `subdivide` method to all child shapes.
   */
  subdivide: function() {
    var args = arguments;
    this.children.forEach(function(child) {
      child.subdivide.apply(child, args);
    });
    return this;
  },

  /**
   * @name Two.Group#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    var i, l, child;

    if (this._flagBeginning || this._flagEnding) {

      var beginning = Math.min(this._beginning, this._ending);
      var ending = Math.max(this._beginning, this._ending);
      var length = this.length;
      var sum = 0;

      var bd = beginning * length;
      var ed = ending * length;

      for (i = 0; i < this.children.length; i++) {

        child = this.children[i];
        l = child.length;

        if (bd > sum + l) {
          child.beginning = 1;
          child.ending = 1;
        } else if (ed < sum) {
          child.beginning = 0;
          child.ending = 0;
        } else if (bd > sum && bd < sum + l) {
          child.beginning = (bd - sum) / l;
          child.ending = 1;
        } else if (ed > sum && ed < sum + l) {
          child.beginning = 0;
          child.ending = (ed - sum) / l;
        } else {
          child.beginning = 0;
          child.ending = 1;
        }

        sum += l;

      }

    }

    return Shape.prototype._update.apply(this, arguments);

  },

  /**
   * @name Two.Group#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    if (this._flagAdditions) {
      this.additions.length = 0;
      this._flagAdditions = false;
    }

    if (this._flagSubtractions) {
      this.subtractions.length = 0;
      this._flagSubtractions = false;
    }

    this._flagOrder = this._flagMask = this._flagOpacity =
      this._flagBeginning = this._flagEnding = false;

    Shape.prototype.flagReset.call(this);

    return this;

  }

});

Group.MakeObservable(Group.prototype);

// /**
//  * Helper function used to sync parent-child relationship within the
//  * `Two.Group.children` object.
//  *
//  * Set the parent of the passed object to another object
//  * and updates parent-child relationships
//  * Calling with one arguments will simply remove the parenting
//  */
function replaceParent(child, newParent) {

  var parent = child.parent;
  var index;

  if (parent === newParent) {
    add();
    return;
  }

  if (parent && parent.children.ids[child.id]) {

    index = Array.prototype.indexOf.call(parent.children, child);
    parent.children.splice(index, 1);

    splice();

  }

  if (newParent) {
    add();
    return;
  }

  splice();

  if (parent._flagAdditions && parent.additions.length === 0) {
    parent._flagAdditions = false;
  }
  if (parent._flagSubtractions && parent.subtractions.length === 0) {
    parent._flagSubtractions = false;
  }

  delete child.parent;

  function add() {

    if (newParent.subtractions.length > 0) {
      index = Array.prototype.indexOf.call(newParent.subtractions, child);

      if (index >= 0) {
        newParent.subtractions.splice(index, 1);
      }
    }

    if (newParent.additions.length > 0) {
      index = Array.prototype.indexOf.call(newParent.additions, child);

      if (index >= 0) {
        newParent.additions.splice(index, 1);
      }
    }

    child.parent = newParent;
    newParent.additions.push(child);
    newParent._flagAdditions = true;

  }

  function splice() {

    index = Array.prototype.indexOf.call(parent.additions, child);

    if (index >= 0) {
      parent.additions.splice(index, 1);
    }

    index = Array.prototype.indexOf.call(parent.subtractions, child);

    if (index < 0) {
      parent.subtractions.push(child);
      parent._flagSubtractions = true;
    }

  }

}

// Constants
var emptyArray = [];
var TWO_PI$5 = Math.PI * 2,
  max$2 = Math.max,
  min$2 = Math.min,
  abs = Math.abs,
  sin$4 = Math.sin,
  cos$4 = Math.cos,
  acos = Math.acos,
  sqrt = Math.sqrt;

// Returns true if this is a non-transforming matrix
var isDefaultMatrix = function (m) {
  return (m[0] == 1 && m[3] == 0 && m[1] == 0 && m[4] == 1 && m[2] == 0 && m[5] == 0);
};

var canvas = {

  isHidden: /(undefined|none|transparent)/i,

  alignments: {
    left: 'start',
    middle: 'center',
    right: 'end'
  },

  shim: function(elem, name) {
    elem.tagName = elem.nodeName = name || 'canvas';
    elem.nodeType = 1;
    elem.getAttribute = function(prop) {
      return this[prop];
    };
    elem.setAttribute = function(prop, val) {
      this[prop] = val;
      return this;
    };
    return elem;
  },

  group: {

    renderChild: function(child) {
      canvas[child._renderer.type].render.call(child, this.ctx, true, this.clip);
    },

    render: function(ctx) {

      if (!this._visible) {
        return this;
      }

      this._update();

      var matrix = this._matrix.elements;
      var parent = this.parent;
      this._renderer.opacity = this._opacity
        * (parent && parent._renderer ? parent._renderer.opacity : 1);

      var mask = this._mask;
      // var clip = this._clip;

      var defaultMatrix = isDefaultMatrix(matrix);
      var shouldIsolate = !defaultMatrix || !!mask;

      if (!this._renderer.context) {
        this._renderer.context = {};
      }

      this._renderer.context.ctx = ctx;
      // this._renderer.context.clip = clip;

      if (shouldIsolate) {
        ctx.save();
        if (!defaultMatrix) {
          ctx.transform(matrix[0], matrix[3], matrix[1],
            matrix[4], matrix[2], matrix[5]);
        }
      }

      if (mask) {
        canvas[mask._renderer.type].render.call(mask, ctx, true);
      }

      if (this._opacity > 0 && this._scale !== 0) {
        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];
          canvas[child._renderer.type].render.call(child, ctx);
        }
      }

      if (shouldIsolate) {
        ctx.restore();
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      // if (clip) {
      //   ctx.clip();
      // }

      return this.flagReset();

    }

  },

  path: {

    render: function(ctx, forced, parentClipped) {

      var matrix, stroke, linewidth, fill, opacity, visible, cap, join, miter,
          closed, commands, length, last, next, prev, a, b, c, d, ux, uy, vx, vy,
          ar, bl, br, cl, x, y, mask, clip, defaultMatrix, isOffset, dashes, po;

      po = (this.parent && this.parent._renderer)
        ? this.parent._renderer.opacity : 1;
      mask = this._mask;
      clip = this._clip;
      opacity = this._opacity * (po || 1);
      visible = this._visible;

      if (!forced && (!visible || clip || opacity === 0)) {
        return this;
      }

      this._update();

      matrix = this._matrix.elements;
      stroke = this._stroke;
      linewidth = this._linewidth;
      fill = this._fill;
      cap = this._cap;
      join = this._join;
      miter = this._miter;
      closed = this._closed;
      commands = this._renderer.vertices; // Commands
      length = commands.length;
      last = length - 1;
      defaultMatrix = isDefaultMatrix(matrix);
      dashes = this.dashes;

      // Transform
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951
      if (mask) {
        canvas[mask._renderer.type].render.call(mask, ctx, true);
      }

      // Styles
      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          canvas[fill._renderer.type].render.call(fill, ctx);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          canvas[stroke._renderer.type].render.call(stroke, ctx);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (miter) {
          ctx.miterLimit = miter;
        }
        if (join) {
          ctx.lineJoin = join;
        }
        if (!closed && cap) {
          ctx.lineCap = cap;
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }

      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      ctx.beginPath();

      for (var i = 0; i < commands.length; i++) {

        b = commands[i];

        x = b.x;
        y = b.y;

        switch (b.command) {

          case Commands.close:
            ctx.closePath();
            break;

          case Commands.arc:

            var rx = b.rx;
            var ry = b.ry;
            var xAxisRotation = b.xAxisRotation;
            var largeArcFlag = b.largeArcFlag;
            var sweepFlag = b.sweepFlag;

            prev = closed ? mod(i - 1, length) : max$2(i - 1, 0);
            a = commands[prev];

            var ax = a.x;
            var ay = a.y;

            canvas.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
            break;

          case Commands.curve:

            prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
            next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

            a = commands[prev];
            c = commands[next];
            ar = (a.controls && a.controls.right) || Vector.zero;
            bl = (b.controls && b.controls.left) || Vector.zero;

            if (a._relative) {
              vx = (ar.x + a.x);
              vy = (ar.y + a.y);
            } else {
              vx = ar.x;
              vy = ar.y;
            }

            if (b._relative) {
              ux = (bl.x + b.x);
              uy = (bl.y + b.y);
            } else {
              ux = bl.x;
              uy = bl.y;
            }

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            if (i >= last && closed) {

              c = d;

              br = (b.controls && b.controls.right) || Vector.zero;
              cl = (c.controls && c.controls.left) || Vector.zero;

              if (b._relative) {
                vx = (br.x + b.x);
                vy = (br.y + b.y);
              } else {
                vx = br.x;
                vy = br.y;
              }

              if (c._relative) {
                ux = (cl.x + c.x);
                uy = (cl.y + c.y);
              } else {
                ux = cl.x;
                uy = cl.y;
              }

              x = c.x;
              y = c.y;

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

            break;

          case Commands.line:
            ctx.lineTo(x, y);
            break;

          case Commands.move:
            d = b;
            ctx.moveTo(x, y);
            break;

        }
      }

      // Loose ends

      if (closed) {
        ctx.closePath();
      }

      if (!clip && !parentClipped) {
        if (!canvas.isHidden.test(fill)) {
          isOffset = fill._renderer && fill._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(
              - fill._renderer.offset.x, - fill._renderer.offset.y);
            ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
          }
          ctx.fill();
          if (isOffset) {
            ctx.restore();
          }
        }
        if (!canvas.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(
              - stroke._renderer.offset.x, - stroke._renderer.offset.y);
            ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
            ctx.lineWidth = linewidth / stroke._renderer.scale.x;
          }
          ctx.stroke();
          if (isOffset) {
            ctx.restore();
          }
        }
      }

      if (!defaultMatrix) {
        ctx.restore();
      }

      if (clip && !parentClipped) {
        ctx.clip();
      }

      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }

      return this.flagReset();

    }

  },

  text: {

    render: function(ctx, forced, parentClipped) {

      var po = (this.parent && this.parent._renderer)
        ? this.parent._renderer.opacity : 1;
      var opacity = this._opacity * po;
      var visible = this._visible;
      var mask = this._mask;
      var clip = this._clip;

      if (!forced && (!visible || clip || opacity === 0)) {
        return this;
      }

      this._update();

      var matrix = this._matrix.elements;
      var stroke = this._stroke;
      var linewidth = this._linewidth;
      var fill = this._fill;
      var decoration = this._decoration;
      var defaultMatrix = isDefaultMatrix(matrix);
      var isOffset = fill._renderer && fill._renderer.offset
        && stroke._renderer && stroke._renderer.offset;
      var dashes = this.dashes;
      var alignment = canvas.alignments[this._alignment] || this._alignment;
      var baseline = this._baseline;

      var a, b, c, d, e, sx, sy, x1, y1, x2, y2;

      // Transform
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951
      if (mask) {
        canvas[mask._renderer.type].render.call(mask, ctx, true);
      }

      if (!isOffset) {
        ctx.font = [this._style, this._weight, this._size + 'px/' +
          this._leading + 'px', this._family].join(' ');
      }

      ctx.textAlign = alignment;
      ctx.textBaseline = baseline;

      // Styles
      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          canvas[fill._renderer.type].render.call(fill, ctx);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          canvas[stroke._renderer.type].render.call(stroke, ctx);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      if (!clip && !parentClipped) {

        if (!canvas.isHidden.test(fill)) {

          if (fill._renderer && fill._renderer.offset) {

            sx = fill._renderer.scale.x;
            sy = fill._renderer.scale.y;

            ctx.save();
            ctx.translate( - fill._renderer.offset.x,
              - fill._renderer.offset.y);
            ctx.scale(sx, sy);

            a = this._size / fill._renderer.scale.y;
            b = this._leading / fill._renderer.scale.y;
            ctx.font = [this._style, this._weight, a + 'px/',
              b + 'px', this._family].join(' ');

            c = fill._renderer.offset.x / fill._renderer.scale.x;
            d = fill._renderer.offset.y / fill._renderer.scale.y;

            ctx.fillText(this.value, c, d);
            ctx.restore();

          } else {
            ctx.fillText(this.value, 0, 0);
          }

        }

        if (!canvas.isHidden.test(stroke)) {

          if (stroke._renderer && stroke._renderer.offset) {

            sx = stroke._renderer.scale.x;
            sy = stroke._renderer.scale.y;

            ctx.save();
            ctx.translate(- stroke._renderer.offset.x,
              - stroke._renderer.offset.y);
            ctx.scale(sx, sy);

            a = this._size / stroke._renderer.scale.y;
            b = this._leading / stroke._renderer.scale.y;
            ctx.font = [this._style, this._weight, a + 'px/',
              b + 'px', this._family].join(' ');

            c = stroke._renderer.offset.x / stroke._renderer.scale.x;
            d = stroke._renderer.offset.y / stroke._renderer.scale.y;
            e = linewidth / stroke._renderer.scale.x;

            ctx.lineWidth = e;
            ctx.strokeText(this.value, c, d);
            ctx.restore();

          } else {
            ctx.strokeText(this.value, 0, 0);
          }
        }
      }

      // Handle text-decoration
      if (/(underline|strikethrough)/i.test(decoration)) {

        var metrics = ctx.measureText(this.value);
        var scalar = 1;

        switch (decoration) {
          case 'underline':
            y1 = metrics.actualBoundingBoxAscent;
            y2 = metrics.actualBoundingBoxAscent;
            break;
          case 'strikethrough':
            y1 = 0;
            y2 = 0;
            scalar = 0.5;
            break;
        }

        switch (baseline) {
          case 'top':
            y1 += this._size * scalar;
            y2 += this._size * scalar;
            break;
          case 'baseline':
          case 'bottom':
            y1 -= this._size * scalar;
            y2 -= this._size * scalar;
            break;
        }

        switch (alignment) {
          case 'left':
          case 'start':
            x1 = 0;
            x2 = metrics.width;
            break;
          case 'right':
          case 'end':
            x1 = - metrics.width;
            x2 = 0;
            break;
          default:
            x1 = - metrics.width / 2;
            x2 = metrics.width / 2;
        }

        ctx.lineWidth = Math.max(Math.floor(this._size / 15), 1);
        ctx.strokeStyle = ctx.fillStyle;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

      }

      if (!defaultMatrix) {
        ctx.restore();
      }

      // TODO: Test for text
      if (clip && !parentClipped) {
        ctx.clip();
      }

      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }

      return this.flagReset();

    }

  },

  'linear-gradient': {

    render: function(ctx) {

      this._update();

      if (!this._renderer.effect || this._flagEndPoints || this._flagStops) {

        this._renderer.effect = ctx.createLinearGradient(
          this.left._x, this.left._y,
          this.right._x, this.right._y
        );

        for (var i = 0; i < this.stops.length; i++) {
          var stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }

      }

      return this.flagReset();

    }

  },

  'radial-gradient': {

    render: function(ctx) {

      this._update();

      if (!this._renderer.effect || this._flagCenter || this._flagFocal
          || this._flagRadius || this._flagStops) {

        this._renderer.effect = ctx.createRadialGradient(
          this.center._x, this.center._y, 0,
          this.focal._x, this.focal._y, this._radius
        );

        for (var i = 0; i < this.stops.length; i++) {
          var stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }

      }

      return this.flagReset();

    }

  },

  texture: {

    render: function(ctx) {

      this._update();

      var image = this.image;

      if (!this._renderer.effect || ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded)) {
        this._renderer.effect = ctx.createPattern(this.image, this._repeat);
      }

      if (this._flagOffset || this._flagLoaded || this._flagScale) {

        if (!(this._renderer.offset instanceof Vector)) {
          this._renderer.offset = new Vector();
        }

        this._renderer.offset.x = - this._offset.x;
        this._renderer.offset.y = - this._offset.y;

        if (image) {

          this._renderer.offset.x += image.width / 2;
          this._renderer.offset.y += image.height / 2;

          if (this._scale instanceof Vector) {
            this._renderer.offset.x *= this._scale.x;
            this._renderer.offset.y *= this._scale.y;
          } else {
            this._renderer.offset.x *= this._scale;
            this._renderer.offset.y *= this._scale;
          }
        }

      }

      if (this._flagScale || this._flagLoaded) {

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }

        if (this._scale instanceof Vector) {
          this._renderer.scale.copy(this._scale);
        } else {
          this._renderer.scale.set(this._scale, this._scale);
        }

      }

      return this.flagReset();

    }

  },

  renderSvgArcCommand: function(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y) {

    xAxisRotation = xAxisRotation * Math.PI / 180;

    // Ensure radii are positive
    rx = abs(rx);
    ry = abs(ry);

    // Compute (x1′, y1′)
    var dx2 = (ax - x) / 2.0;
    var dy2 = (ay - y) / 2.0;
    var x1p = cos$4(xAxisRotation) * dx2 + sin$4(xAxisRotation) * dy2;
    var y1p = - sin$4(xAxisRotation) * dx2 + cos$4(xAxisRotation) * dy2;

    // Compute (cx′, cy′)
    var rxs = rx * rx;
    var rys = ry * ry;
    var x1ps = x1p * x1p;
    var y1ps = y1p * y1p;

    // Ensure radii are large enough
    var cr = x1ps / rxs + y1ps / rys;

    if (cr > 1) {

      // scale up rx,ry equally so cr == 1
      var s = sqrt(cr);
      rx = s * rx;
      ry = s * ry;
      rxs = rx * rx;
      rys = ry * ry;

    }

    var dq = (rxs * y1ps + rys * x1ps);
    var pq = (rxs * rys - dq) / dq;
    var q = sqrt(max$2(0, pq));
    if (largeArcFlag === sweepFlag) q = - q;
    var cxp = q * rx * y1p / ry;
    var cyp = - q * ry * x1p / rx;

    // Step 3: Compute (cx, cy) from (cx′, cy′)
    var cx = cos$4(xAxisRotation) * cxp
      - sin$4(xAxisRotation) * cyp + (ax + x) / 2;
    var cy = sin$4(xAxisRotation) * cxp
      + cos$4(xAxisRotation) * cyp + (ay + y) / 2;

    // Step 4: Compute θ1 and Δθ
    var startAngle = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    var delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry,
      (- x1p - cxp) / rx, (- y1p - cyp) / ry) % TWO_PI$5;

    var endAngle = startAngle + delta;

    var clockwise = sweepFlag === 0;

    renderArcEstimate(ctx, cx, cy, rx, ry, startAngle, endAngle,
      clockwise, xAxisRotation);

  }

};

/**
 * @name Two.CanvasRenderer
 * @class
 * @extends Two.Events
 * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
 * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
 * @param {Boolean} [parameters.overdraw] - Determines whether the canvas should clear the background or not. Defaults to `true`.
 * @param {Boolean} [parameters.smoothing=true] - Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm.
 * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.
 */
function Renderer$2(params) {

  // It might not make a big difference on GPU backed canvases.
  var smoothing = (params.smoothing !== false);

  /**
   * @name Two.CanvasRenderer#domElement
   * @property {Element} - The `<canvas />` associated with the Two.js scene.
   */
  this.domElement = params.domElement || document.createElement('canvas');

  /**
   * @name Two.CanvasRenderer#ctx
   * @property {Canvas2DContext} - Associated two dimensional context to render on the `<canvas />`.
   */
  this.ctx = this.domElement.getContext('2d');

  /**
   * @name Two.CanvasRenderer#overdraw
   * @property {Boolean} - Determines whether the canvas clears the background each draw call.
   * @default true
   */
  this.overdraw = params.overdraw || false;

  if (typeof this.ctx.imageSmoothingEnabled !== 'undefined') {
    this.ctx.imageSmoothingEnabled = smoothing;
  }

  /**
   * @name Two.CanvasRenderer#scene
   * @property {Two.Group} - The root group of the scenegraph.
   */
  this.scene = new Group();
  this.scene.parent = this;
}


_.extend(Renderer$2, {

  /**
   * @name Two.CanvasRenderer.Utils
   * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.
   */
  Utils: canvas

});

_.extend(Renderer$2.prototype, Events, {

  constructor: Renderer$2,

  /**
   * @name Two.CanvasRenderer#setSize
   * @function
   * @fires resize
   * @param {Number} width - The new width of the renderer.
   * @param {Number} height - The new height of the renderer.
   * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
   * @description Change the size of the renderer.
   */
  setSize: function(width, height, ratio) {

    this.width = width;
    this.height = height;

    this.ratio = typeof ratio === 'undefined' ? getRatio(this.ctx) : ratio;

    this.domElement.width = width * this.ratio;
    this.domElement.height = height * this.ratio;

    if (this.domElement.style) {
      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px'
      });
    }

    return this.trigger(Events.Types.resize, width, height, ratio);

  },

  /**
   * @name Two.CanvasRenderer#render
   * @function
   * @description Render the current scene to the `<canvas />`.
   */
  render: function() {

    var isOne = this.ratio === 1;

    if (!isOne) {
      this.ctx.save();
      this.ctx.scale(this.ratio, this.ratio);
    }

    if (!this.overdraw) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    canvas.group.render.call(this.scene, this.ctx);

    if (!isOne) {
      this.ctx.restore();
    }

    return this;

  }

});

function renderArcEstimate(ctx, ox, oy, rx, ry, startAngle, endAngle, clockwise, xAxisRotation) {

  var epsilon = Curve.Tolerance.epsilon;
  var deltaAngle = endAngle - startAngle;
  var samePoints = Math.abs(deltaAngle) < epsilon;

  // ensures that deltaAngle is 0 .. 2 PI
  deltaAngle = mod(deltaAngle, TWO_PI$5);

  if (deltaAngle < epsilon) {

    if (samePoints) {

      deltaAngle = 0;

    } else {

      deltaAngle = TWO_PI$5;

    }

  }

  if (clockwise === true && ! samePoints) {

    if (deltaAngle === TWO_PI$5) {

      deltaAngle = - TWO_PI$5;

    } else {

      deltaAngle = deltaAngle - TWO_PI$5;

    }

  }

  for (var i = 0; i < Constants.Resolution; i++) {

    var t = i / (Constants.Resolution - 1);

    var angle = startAngle + t * deltaAngle;
    var x = ox + rx * Math.cos(angle);
    var y = oy + ry * Math.sin(angle);

    if (xAxisRotation !== 0) {

      var cos = Math.cos(xAxisRotation);
      var sin = Math.sin(xAxisRotation);

      var tx = x - ox;
      var ty = y - oy;

      // Rotate the point about the center of the ellipse.
      x = tx * cos - ty * sin + ox;
      y = tx * sin + ty * cos + oy;

    }

    ctx.lineTo(x, y);

  }

}

function svgAngle(ux, uy, vx, vy) {

  var dot = ux * vx + uy * vy;
  var len = sqrt(ux * ux + uy * uy) *  sqrt(vx * vx + vy * vy);
  // floating point precision, slightly over values appear
  var ang = acos(max$2(-1, min$2(1, dot / len)));
  if ((ux * vy - uy * vx) < 0) {
    ang = - ang;
  }

  return ang;

}

var CanvasShim = {

  Image: null,

  isHeadless: false,

  /**
   * @name Two.Utils.shim
   * @function
   * @param {canvas} canvas - The instanced `Canvas` object provided by `node-canvas`.
   * @param {Image} [Image] - The prototypical `Image` object provided by `node-canvas`. This is only necessary to pass if you're going to load bitmap imagery.
   * @returns {canvas} Returns the instanced canvas object you passed from with additional attributes needed for Two.js.
   * @description Convenience method for defining all the dependencies from the npm package `node-canvas`. See [node-canvas](https://github.com/Automattic/node-canvas) for additional information on setting up HTML5 `<canvas />` drawing in a node.js environment.
   */
  shim: function(canvas, Image) {
    Renderer$2.Utils.shim(canvas);
    if (typeof Image !== 'undefined') {
      CanvasShim.Image = Image;
    }
    CanvasShim.isHeadless = true;
    return canvas;
  }

};

var dom = {

  hasEventListeners: typeof root$1.addEventListener === 'function',

  bind: function(elem, event, func, bool) {
    if (this.hasEventListeners) {
      elem.addEventListener(event, func, !!bool);
    } else {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },

  unbind: function(elem, event, func, bool) {
    if (dom.hasEventListeners) {
      elem.removeEventListeners(event, func, !!bool);
    } else {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },

  getRequestAnimationFrame: function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var request = root$1.requestAnimationFrame, cancel;

    if(!request) {
      for (var i = 0; i < vendors.length; i++) {
        request = root$1[vendors[i] + 'RequestAnimationFrame'] || request;
        cancel = root$1[vendors[i] + 'CancelAnimationFrame']
          || root$1[vendors[i] + 'CancelRequestAnimationFrame'] || cancel;
      }

      request = request || function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = root$1.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    return request;

  }

};

var temp = (root$1.document ? root$1.document.createElement('div') : {});
temp.id = 'help-two-load';

Object.defineProperty(dom, 'temp', {
  enumerable: true,
  get: function() {
    if (_.isElement(temp) && !root$1.document.head.contains(temp)) {
      _.extend(temp.style, {
        display: 'none'
      });
      root$1.document.head.appendChild(temp);
    }
    return temp;
  }
});

/**
 * @name Two.Utils.Error
 * @class
 * @description Custom error throwing for Two.js specific identification.
 */
function TwoError(message) {
  this.name = 'Two.js';
  this.message = message;
}

TwoError.prototype = new Error();

_.extend(TwoError.prototype, {
  constructor: TwoError
});

/**
 * @name Two.Utils.defineGetterSetter
 * @function
 * @this Two#
 * @param {String} property - The property to add an enumerable getter / setter to.
 * @description Convenience function to setup the flag based getter / setter that most properties are defined as in Two.js.
 */
var defineGetterSetter = function(property) {

  var object = this;
  var secret = '_' + property;
  var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

  Object.defineProperty(object, property, {
    enumerable: true,
    get: function() {
      return this[secret];
    },
    set: function(v) {
      this[secret] = v;
      this[flag] = true;
    }
  });

};

/**
 * @name Two.Registry
 * @class
 * @description An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
 */
function Registry() {

  this.map = {};

}

_.extend(Registry.prototype, {

  constructor: Registry,

  /**
   * @name Two.Registry#add
   * @function
   * @param {String} id - A unique identifier.
   * @param value - Any type of variable to be registered to the directory.
   * @description Adds any value to the directory. Assigned by the `id`.
   */
  add: function(id, obj) {
    this.map[id] = obj;
    return this;
  },

  /**
   * @name Two.Registry#remove
   * @function
   * @param {String} id - A unique identifier.
   * @description Remove any value from the directory by its `id`.
   */
  remove: function(id) {
    delete this.map[id];
    return this;
  },

  /**
   * @name Two.Registry#get
   * @function
   * @param {String} id - A unique identifier.
   * @returns {?Object} The associated value. If unavailable then `undefined` is returned.
   * @description Get a registered value by its `id`.
   */
  get: function(id) {
    return this.map[id];
  },

  /**
   * @name Two.Registry#contains
   * @function
   * @param {String} id - A unique identifier.
   * @returns {Boolean}
   * @description Convenience method to see if a value is registered to an `id` already.
   */
  contains: function(id) {
    return id in this.map;
  }

});

/**
 * @name Two.Stop
 * @class
 * @param {Number} [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
 * @param {String} [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
 * @param {Number} [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
 * @nota-bene Used specifically in conjunction with {@link Two.Gradient}s to control color graduation.
 */
function Stop(offset, color, opacity) {

  /**
   * @name Two.Stop#renderer
   * @property {Object}
   * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  this.renderer = {};
  this._renderer.type = 'stop';

  /**
   * @name Two.Stop#offset
   * @property {Number} - The offset percentage of the stop represented as a zero-to-one value.
   */
  this.offset = typeof offset === 'number' ? offset
    : Stop.Index <= 0 ? 0 : 1;

  /**
   * @name Two.Stop#opacity
   * @property {Number} - The alpha percentage of the stop represented as a zero-to-one value.
   */
  this.opacity = typeof opacity === 'number' ? opacity : 1;

  /**
   * @name Two.Stop#color
   * @property {String} - The color of the stop.
   */
  this.color = (typeof color === 'string') ? color
    : Stop.Index <= 0 ? '#fff' : '#000';

  Stop.Index = (Stop.Index + 1) % 2;

}

_.extend(Stop, {

  /**
   * @name Two.Stop.Index
   * @property {Number} - The current index being referenced for calculating a stop's default offset value.
   */
  Index: 0,

  /**
   * @name Two.Stop.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Stop}.
   */
  Properties: [
    'offset',
    'opacity',
    'color'
  ],

  /**
   * @name Two.Stop.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Stop} to any object. Handy if you'd like to extend the {@link Two.Stop} class on a custom class.
   */
  MakeObservable: function(object) {

    _.each(Stop.Properties, function(property) {

      var object = this;
      var secret = '_' + property;
      var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

      Object.defineProperty(object, property, {
        enumerable: true,
        get: function() {
          return this[secret];
        },
        set: function(v) {
          this[secret] = v;
          this[flag] = true;
          if (this.parent) {
            this.parent._flagStops = true;
          }
        }
      });

    }, object);

    Object.defineProperty(object, 'renderer', {

      enumerable: false,

      get: function() {
        return this._renderer;
      },

      set: function(obj) {
        this._renderer = obj;
      }

    });

  }

});

_.extend(Stop.prototype, Events, {

  constructor: Stop,

  /**
   * @name Two.Stop#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Stop}
   * @description Create a new instance of {@link Two.Stop} with the same properties of the current path.
   */
  clone: function() {

    var clone = new Stop();

    _.each(Stop.Properties, function(property) {
      clone[property] = this[property];
    }, this);

    return clone;

  },

  /**
   * @name Two.Stop#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = {};

    _.each(Stop.Properties, function(k) {
      result[k] = this[k];
    }, this);

    return result;

  },

  /**
   * @name Two.Stop#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagOffset = this._flagColor = this._flagOpacity = false;

    return this;

  }

});

Stop.MakeObservable(Stop.prototype);

/**
 * @name Two.Gradient
 * @class
 * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
 * @description This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.
 */
function Gradient(stops) {

  /**
   * @name Two.Gradient#renderer
   * @property {Object}
   * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  this.renderer = {};
  this._renderer.type = 'gradient';

  /**
   * @name Two.Gradient#id
   * @property {String} - Session specific unique identifier.
   * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
   */
  this.id = Constants.Identifier + Constants.uniqueId();
  this.classList = [];

  this._renderer.flagStops = Gradient.FlagStops.bind(this);
  this._renderer.bindStops = Gradient.BindStops.bind(this);
  this._renderer.unbindStops = Gradient.UnbindStops.bind(this);

  /**
   * @name Two.Gradient#spread
   * @property {String} - Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.
   * @see {@link https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute} for more information
   */
  this.spread = 'pad';

  /**
   * @name Two.Gradient#stops
   * @property {Two.Stop[]} - An ordered list of {@link Two.Stop}s for rendering the gradient.
   */
  if (stops) {
    this.stops = stops;
  }

}

_.extend(Gradient, {

  /**
   * @name Two.Gradient.Stop
   * @see {@link Two.Stop}
   */
  Stop: Stop,

  /**
   * @name Two.Gradient.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Gradient}.
   */
  Properties: [
    'spread'
  ],

  /**
   * @name Two.Gradient.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Gradient} to any object. Handy if you'd like to extend the {@link Two.Gradient} class on a custom class.
   */
  MakeObservable: function(object) {

    _.each(Gradient.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'stops', {

      enumerable: true,

      get: function() {
        return this._stops;
      },

      set: function(stops) {

        var bindStops = this._renderer.bindStops;
        var unbindStops = this._renderer.unbindStops;

        // Remove previous listeners
        if (this._stops) {
          this._stops
            .unbind(Events.Types.insert, bindStops)
            .unbind(Events.Types.remove, unbindStops);
        }

        // Create new Collection with copy of Stops
        this._stops = new Collection((stops || []).slice(0));

        // Listen for Collection changes and bind / unbind
        this._stops
          .bind(Events.Types.insert, bindStops)
          .bind(Events.Types.remove, unbindStops);

        // Bind Initial Stops
        bindStops(this._stops);

      }

    });

    Object.defineProperty(object, 'renderer', {

      enumerable: false,

      get: function() {
        return this._renderer;
      },

      set: function(obj) {
        this._renderer = obj;
      }

    });

    Object.defineProperty(object, 'id', {

      enumerable: true,

      get: function() {
        return this._id;
      },

      set: function(v) {
        this._id = v;
      }

    });

  },

  /**
   * @name Two.Gradient.FlagStops
   * @function
   * @description Cached method to let renderers know stops have been updated on a {@link Two.Gradient}.
   */
  FlagStops: function() {
    this._flagStops = true;
  },

  /**
   * @name Two.Gradient.BindVertices
   * @function
   * @description Cached method to let {@link Two.Gradient} know vertices have been added to the instance.
   */
  BindStops: function(items) {

    // This function is called a lot
    // when importing a large SVG
    var i = items.length;
    while(i--) {
      items[i].bind(Events.Types.change, this._renderer.flagStops);
      items[i].parent = this;
    }

    this._renderer.flagStops();

  },

  /**
   * @name Two.Gradient.UnbindStops
   * @function
   * @description Cached method to let {@link Two.Gradient} know vertices have been removed from the instance.
   */
  UnbindStops: function(items) {

    var i = items.length;
    while(i--) {
      items[i].unbind(Events.Types.change, this._renderer.flagStops);
      delete items[i].parent;
    }

    this._renderer.flagStops();

  }

});

_.extend(Gradient.prototype, Events, {

  constructor: Gradient,

  /**
   * @name Two.Gradient#_flagId
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Gradient#id} needs updating.
   */
  _flagId: false,

  /**
   * @name Two.Gradient#_flagStops
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Gradient#stops} needs updating.
   */
  _flagStops: false,
  /**
   * @name Two.Gradient#_flagSpread
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Gradient#spread} needs updating.
   */
  _flagSpread: false,

  _id: '',

  /**
   * @name Two.Gradient#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Gradient}
   * @description Create a new instance of {@link Two.Gradient} with the same properties of the current path.
   */
  clone: function(parent) {

    var stops = this.stops.map(function(s) {
      return s.clone();
    });

    var clone = new Gradient(stops);

    _.each(Gradient.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Gradient#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = {
      stops: this.stops.map(function(s) {
        return s.toObject();
      })
    };

    _.each(Gradient.Properties, function(k) {
      result[k] = this[k];
    }, this);

    return result;

  },

  /**
   * @name Two.Gradient#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }

    return this;

  },

  /**
   * @name Two.Gradient#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagSpread = this._flagStops = false;

    return this;

  }

});

Gradient.MakeObservable(Gradient.prototype);

/**
 * @name Two.LinearGradient
 * @class
 * @extends Two.Gradient
 * @param {Number} [x1=0] - The x position of the first end point of the linear gradient.
 * @param {Number} [y1=0] - The y position of the first end point of the linear gradient.
 * @param {Number} [x2=0] - The x position of the second end point of the linear gradient.
 * @param {Number} [y2=0] - The y position of the second end point of the linear gradient.
 * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
 * @nota-bene The linear gradient lives within the space of the parent object's matrix space.
 */
function LinearGradient(x1, y1, x2, y2, stops) {

  Gradient.call(this, stops);

  this._renderer.type = 'linear-gradient';

  var flagEndPoints = LinearGradient.FlagEndPoints.bind(this);

  /**
   * @name Two.LinearGradient#left
   * @property {Two.Vector} - The x and y value for where the first end point is placed on the canvas.
   */
  this.left = new Vector().bind(Events.Types.change, flagEndPoints);
  /**
   * @name Two.LinearGradient#right
   * @property {Two.Vector} - The x and y value for where the second end point is placed on the canvas.
   */
  this.right = new Vector().bind(Events.Types.change, flagEndPoints);

  if (typeof x1 === 'number') {
    this.left.x = x1;
  }
  if (typeof y1 === 'number') {
    this.left.y = y1;
  }
  if (typeof x2 === 'number') {
    this.right.x = x2;
  }
  if (typeof y2 === 'number') {
    this.right.y = y2;
  }

}

_.extend(LinearGradient, {

  /**
   * @name Two.LinearGradient.Stop
   * @see {@link Two.Stop}
   */
  Stop: Stop,

  /**
   * @name Two.LinearGradient.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.LinearGradient} to any object. Handy if you'd like to extend the {@link Two.LinearGradient} class on a custom class.
   */
  MakeObservable: function(object) {
    Gradient.MakeObservable(object);
  },

  /**
   * @name Two.LinearGradient.FlagEndPoints
   * @function
   * @description Cached method to let renderers know end points have been updated on a {@link Two.LinearGradient}.
   */
  FlagEndPoints: function() {
    this._flagEndPoints = true;
  }

});

_.extend(LinearGradient.prototype, Gradient.prototype, {

  constructor: LinearGradient,

  /**
   * @name Two.LinearGradient#_flagEndPoints
   * @private
   * @property {Boolean} - Determines whether the {@link Two.LinearGradient#left} or {@link Two.LinearGradient#right} changed and needs to update.
   */
  _flagEndPoints: false,

  /**
   * @name Two.LinearGradient#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Gradient}
   * @description Create a new instance of {@link Two.LinearGradient} with the same properties of the current path.
   */
  clone: function(parent) {

    var stops = this.stops.map(function(stop) {
      return stop.clone();
    });

    var clone = new LinearGradient(this.left._x, this.left._y,
      this.right._x, this.right._y, stops);

    _.each(Gradient.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.LinearGradient#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = Gradient.prototype.toObject.call(this);

    result.left = this.left.toObject();
    result.right = this.right.toObject();

    return result;

  },

  /**
   * @name Two.LinearGradient#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagEndPoints || this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }

    return this;

  },

  /**
   * @name Two.LinearGradient#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagEndPoints = false;

    Gradient.prototype.flagReset.call(this);

    return this;

  }

});

LinearGradient.MakeObservable(LinearGradient.prototype);

/**
 * @name Two.RadialGradient
 * @class
 * @extends Two.Gradient
 * @param {Number} [x=0] - The x position of the origin of the radial gradient.
 * @param {Number} [y=0] - The y position of the origin of the radial gradient.
 * @param {Number} [radius=0] - The radius of the radial gradient.
 * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
 * @param {Number} [focalX=0] - The x position of the focal point on the radial gradient.
 * @param {Number} [focalY=0] - The y position of the focal point on the radial gradient.
 * @nota-bene The radial gradient lives within the space of the parent object's matrix space.
 */
function RadialGradient(cx, cy, r, stops, fx, fy) {

  Gradient.call(this, stops);

  this._renderer.type = 'radial-gradient';

  /**
   * @name Two.RadialGradient#center
   * @property {Two.Vector} - The x and y value for where the origin of the radial gradient is.
   */
  this.center = new Vector()
    .bind(Events.Types.change, (function() {
      this._flagCenter = true;
    }).bind(this));

  this.radius = typeof r === 'number' ? r : 20;

  /**
   * @name Two.RadialGradient#focal
   * @property {Two.Vector} - The x and y value for where the focal point of the radial gradient is.
   * @nota-bene This effects the spray or spread of the radial gradient.
   */
  this.focal = new Vector()
    .bind(Events.Types.change, (function() {
      this._flagFocal = true;
    }).bind(this));

  if (typeof cx === 'number') {
    this.center.x = cx;
  }
  if (typeof cy === 'number') {
    this.center.y = cy;
  }

  this.focal.copy(this.center);

  if (typeof fx === 'number') {
    this.focal.x = fx;
  }
  if (typeof fy === 'number') {
    this.focal.y = fy;
  }

}

_.extend(RadialGradient, {

  /**
   * @name Two.RadialGradient.Stop
   * @see {@link Two.Stop}
   */
  Stop: Stop,

  /**
   * @name Two.RadialGradient.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.RadialGradient}.
   */
  Properties: [
    'radius'
  ],

  /**
   * @name Two.RadialGradient.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.RadialGradient} to any object. Handy if you'd like to extend the {@link Two.RadialGradient} class on a custom class.
   */
  MakeObservable: function(object) {

    Gradient.MakeObservable(object);

    _.each(RadialGradient.Properties, defineGetterSetter, object);

  }

});

_.extend(RadialGradient.prototype, Gradient.prototype, {

  constructor: RadialGradient,

  /**
   * @name Two.RadialGradient#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RadialGradient#radius} changed and needs to update.
   */
  _flagRadius: false,
  /**
   * @name Two.RadialGradient#_flagCenter
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RadialGradient#center} changed and needs to update.
   */
  _flagCenter: false,
  /**
   * @name Two.RadialGradient#_flagFocal
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RadialGradient#focal} changed and needs to update.
   */
  _flagFocal: false,

  /**
   * @name Two.RadialGradient#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Gradient}
   * @description Create a new instance of {@link Two.RadialGradient} with the same properties of the current path.
   */
  clone: function(parent) {

    var stops = this.stops.map(function(stop) {
      return stop.clone();
    });

    var clone = new RadialGradient(this.center._x, this.center._y,
        this._radius, stops, this.focal._x, this.focal._y);

    _.each(Gradient.Properties.concat(RadialGradient.Properties), function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.RadialGradient#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = Gradient.prototype.toObject.call(this);

    _.each(RadialGradient.Properties, function(k) {
      result[k] = this[k];
    }, this);

    result.center = this.center.toObject();
    result.focal = this.focal.toObject();

    return result;

  },

  /**
   * @name Two.RadialGradient#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagRadius || this._flatCenter || this._flagFocal
      || this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }

    return this;

  },

  /**
   * @name Two.RadialGradient#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagRadius = this._flagCenter = this._flagFocal = false;

    Gradient.prototype.flagReset.call(this);

    return this;

  }

});

RadialGradient.MakeObservable(RadialGradient.prototype);

var anchor;
var regex$1 = {
  video: /\.(mp4|webm|ogg)$/i,
  image: /\.(jpe?g|png|gif|tiff|webp)$/i,
  effect: /texture|gradient/i
};

if (root$1.document) {
  anchor = document.createElement('a');
}

/**
 * @name Two.Texture
 * @class
 * @extends Two.Shape
 * @param {String|HTMLImageElement} [src] - The URL path to an image file or an `<img />` element.
 * @param {Function} [callback] - An optional callback function once the image has been loaded.
 * @description Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.
 */
function Texture(src, callback) {

  /**
   * @name Two.Texture#renderer
   * @property {Object}
   * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  this.renderer = {};
  this._renderer.type = 'texture';
  this._renderer.flagOffset = Texture.FlagOffset.bind(this);
  this._renderer.flagScale = Texture.FlagScale.bind(this);

  this.id = Constants.Identifier + Constants.uniqueId();
  this.classList = [];

  /**
   * @name Two.Texture#loaded
   * @property {Boolean} - Shorthand value to determine if image has been loaded into the texture.
   */
  this.loaded = false;

  /**
   * @name Two.Texture#repeat
   * @property {String} - CSS style declaration to tile {@link Two.Path}. Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.
   * @see {@link https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern}
   */
  this.repeat = 'no-repeat';

  /**
   * @name Two.Texture#offset
   * @property {Two.Vector} - A two-component vector describing any pixel offset of the texture when applied to a {@link Two.Path}.
   */
  this.offset = new Vector();

  if (typeof callback === 'function') {
    var loaded = (function() {
      this.unbind(Events.Types.load, loaded);
      if (typeof callback === 'function') {
        callback();
      }
    }).bind(this);
    this.bind(Events.Types.load, loaded);
  }

  /**
   * @name Two.Texture#src
   * @property {String} - The URL path to the image data.
   * @nota-bene This property is ultimately serialized in a {@link Two.Registry} to cache retrieval.
   */
  if (typeof src === 'string') {
    this.src = src;
  } else if (typeof src === 'object') {
    var elemString = Object.prototype.toString.call(src);
    if (
      elemString === '[object HTMLImageElement]' ||
      elemString === '[object HTMLCanvasElement]' ||
      elemString === '[object HTMLVideoElement]' ||
      elemString === '[object Image]'
    ) {
      /**
       * @name Two.Texture#image
       * @property {Element} - The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See {@link Two.Texture.RegularExpressions} for a full list of supported elements.
       * @nota-bene In headless environments this is a `Canvas.Image` object. See {@link https://github.com/Automattic/node-canvas} for more information on headless image objects.
       */
      this.image = src;
    }
  }

  this._update();

}

_.extend(Texture, {

  /**
   * @name Two.Texture.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Texture}.
   */
  Properties: [
    'id',
    'src',
    'loaded',
    'repeat'
  ],

  /**
   * @name Two.Texture.RegularExpressions
   * @property {Object} - A map of compatible DOM Elements categorized by media format.
   */
  RegularExpressions: regex$1,

  /**
   * @name Two.Texture.ImageRegistry
   * @property {Two.Registry} - A canonical listing of image data used in a single session of Two.js.
   * @nota-bene This object is used to cache image data between different textures.
   */
  ImageRegistry: new Registry(),

  /**
   * @name Two.Texture.getAbsoluteURL
   * @property {Function} - Serializes a URL as an absolute path for canonical attribution in {@link Two.ImageRegistry}.
   * @param {String} path
   * @returns {String} - The serialized absolute path.
   */
  getAbsoluteURL: function(path) {
    if (!anchor) {
      // TODO: Fix for headless environments
      return path;
    }
    anchor.href = path;
    return anchor.href;
  },

  /**
   * @name Two.Texture.loadHeadlessBuffer
   * @property {Function} - Loads an image as a buffer in headless environments.
   * @param {Two.Texture} texture - The {@link Two.Texture} to be loaded.
   * @param {Function} loaded - The callback function to be triggered once the image is loaded.
   * @nota-bene - This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
   */
  loadHeadlessBuffer: function(texture, loaded) {

    texture.image.onload = loaded;
    texture.image.src = texture.src;

  },

  /**
   * @name Two.Texture.getTag
   * @property {Function} - Retrieves the tag name of an image, video, or canvas node.
   * @param {HTMLImageElement} - The image to infer the tag name from.
   * @returns {String} - Returns the tag name of an image, video, or canvas node.
   */
  getTag: function(image) {
    return (image && image.nodeName && image.nodeName.toLowerCase())
      // Headless environments
      || 'img';
  },

  /**
   * @name Two.Texture.getImage
   * @property {Function} - Convenience function to set {@link Two.Texture#image} properties with canonincal versions set in {@link Two.Texture.ImageRegistry}.
   * @param {String} src - The URL path of the image.
   * @returns {HTMLImageElement} - Returns either a cached version of the image or a new one that is registered in {@link Two.Texture.ImageRegistry}.
   */
  getImage: function(src) {

    var absoluteSrc = Texture.getAbsoluteURL(src);

    if (Texture.ImageRegistry.contains(absoluteSrc)) {
      return Texture.ImageRegistry.get(absoluteSrc);
    }

    var image;

    if (CanvasShim.Image) {

      // TODO: Fix for headless environments
      image = new CanvasShim.Image();
      Renderer$2.Utils.shim(image, 'img');

    } else if (root$1.document) {

      if (regex$1.video.test(absoluteSrc)) {
        image = document.createElement('video');
      } else {
        image = document.createElement('img');
      }

    } else {

      console.warn('Two.js: no prototypical image defined for Two.Texture');

    }

    image.crossOrigin = 'anonymous';

    return image;

  },

  /**
   * @name Two.Register
   * @interface
   * @description A collection of functions to register different types of textures. Used internally by a {@link Two.Texture}.
   */
  Register: {
    canvas: function(texture, callback) {
      texture._src = '#' + texture.id;
      Texture.ImageRegistry.add(texture.src, texture.image);
      if (typeof callback === 'function') {
        callback();
      }
    },
    img: function(texture, callback) {

      var image = texture.image;

      var loaded = function(e) {
        if (!CanvasShim.isHeadless && image.removeEventListener && typeof image.removeEventListener === 'function') {
          image.removeEventListener('load', loaded, false);
          image.removeEventListener('error', error, false);
        }
        if (typeof callback === 'function') {
          callback();
        }
      };
      var error = function(e) {
        if (!CanvasShim.isHeadless && typeof image.removeEventListener === 'function') {
          image.removeEventListener('load', loaded, false);
          image.removeEventListener('error', error, false);
        }
        throw new TwoError('unable to load ' + texture.src);
      };

      if (typeof image.width === 'number' && image.width > 0
        && typeof image.height === 'number' && image.height > 0) {
          loaded();
      } else if (!CanvasShim.isHeadless && typeof image.addEventListener === 'function') {
        image.addEventListener('load', loaded, false);
        image.addEventListener('error', error, false);
      }

      texture._src = Texture.getAbsoluteURL(texture._src);

      if (!CanvasShim.isHeadless && image && image.getAttribute('two-src')) {
        return;
      }

      if (!CanvasShim.isHeadless) {
        image.setAttribute('two-src', texture.src);
      }

      Texture.ImageRegistry.add(texture.src, image);

      if (CanvasShim.isHeadless) {

        Texture.loadHeadlessBuffer(texture, loaded);

      } else {

        texture.image.src = texture.src;

      }

    },
    video: function(texture, callback) {

      if (CanvasShim.isHeadless) {
        throw new TwoError('video textures are not implemented in headless environments.');
      }

      var loaded = function(e) {
        texture.image.removeEventListener('canplaythrough', loaded, false);
        texture.image.removeEventListener('error', error, false);
        texture.image.width = texture.image.videoWidth;
        texture.image.height = texture.image.videoHeight;
        if (typeof callback === 'function') {
          callback();
        }
      };
      var error = function(e) {
        texture.image.removeEventListener('canplaythrough', loaded, false);
        texture.image.removeEventListener('error', error, false);
        throw new TwoError('unable to load ' + texture.src);
      };

      texture._src = Texture.getAbsoluteURL(texture._src);

      if (!texture.image.getAttribute('two-src')) {
        texture.image.setAttribute('two-src', texture.src);
        Texture.ImageRegistry.add(texture.src, texture.image);
      }

      if (texture.image.readyState >= 4) {
        loaded();
      } else {
        texture.image.addEventListener('canplaythrough', loaded, false);
        texture.image.addEventListener('error', error, false);
        texture.image.src = texture.src;
        texture.image.load();
      }

    }
  },

  /**
   * @name Two.Texture.load
   * @function
   * @param {Two.Texture} texture - The texture to load.
   * @param {Function} callback - The function to be called once the texture is loaded.
   */
  load: function(texture, callback) {

    var image = texture.image;
    var tag = Texture.getTag(image);

    if (texture._flagImage) {
      if (/canvas/i.test(tag)) {
        Texture.Register.canvas(texture, callback);
      } else {
        texture._src = (!CanvasShim.isHeadless && image.getAttribute('two-src')) || image.src;
        Texture.Register[tag](texture, callback);
      }
    }

    if (texture._flagSrc) {
      if (!image) {
        image = Texture.getImage(texture.src);
        texture.image = image;
      }
      tag = Texture.getTag(image);
      Texture.Register[tag](texture, callback);
    }

  },

  /**
   * @name Two.Texture.FlagOffset
   * @function
   * @description Cached method to let renderers know `offset` has been updated on a {@link Two.Texture}.
   */
  FlagOffset: function() {
    this._flagOffset = true;
  },

  /**
   * @name Two.Texture.FlagScale
   * @function
   * @description Cached method to let renderers know `scale` has been updated on a {@link Two.Texture}.
   */
  FlagScale: function() {
    this._flagScale = true;
  },

  /**
   * @name Two.Texture.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Texture} to any object. Handy if you'd like to extend or inherit the {@link Two.Texture} class on a custom class.
   */
  MakeObservable: function(object) {

    _.each(Texture.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'image', {
      enumerable: true,
      get: function() {
        return this._image;
      },
      set: function(image) {

        var tag = Texture.getTag(image);
        var index;

        switch (tag) {
          case 'canvas':
            index = '#' + image.id;
            break;
          default:
            index = image.src;
        }

        if (Texture.ImageRegistry.contains(index)) {
          this._image = Texture.ImageRegistry.get(image.src);
        } else {
          this._image = image;
        }

        this._flagImage = true;

      }

    });

    Object.defineProperty(object, 'offset', {
      enumerable: true,
      get: function() {
        return this._offset;
      },
      set: function(v) {
        if (this._offset) {
          this._offset.unbind(Events.Types.change, this._renderer.flagOffset);
        }
        this._offset = v;
        this._offset.bind(Events.Types.change, this._renderer.flagOffset);
        this._flagOffset = true;
      }
    });

    Object.defineProperty(object, 'scale', {
      enumerable: true,
      get: function() {
        return this._scale;
      },
      set: function(v) {

        if (this._scale instanceof Vector) {
          this._scale.unbind(Events.Types.change, this._renderer.flagScale);
        }

        this._scale = v;

        if (this._scale instanceof Vector) {
          this._scale.bind(Events.Types.change, this._renderer.flagScale);
        }

        this._flagScale = true;

      }
    });

    Object.defineProperty(object, 'renderer', {

      enumerable: false,

      get: function() {
        return this._renderer;
      },

      set: function(obj) {
        this._renderer = obj;
      }

    });

  }

});

_.extend(Texture.prototype, Events, Shape.prototype, {

  constructor: Texture,

  /**
   * @name Two.Texture#_flagId
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#id} needs updating.
   */
  _flagId: false,

  /**
   * @name Two.Texture#_flagSrc
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#src} needs updating.
   */
  _flagSrc: false,

  /**
   * @name Two.Texture#_flagImage
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#image} needs updating.
   */
  _flagImage: false,

  /**
   * @name Two.Texture#_flagVideo
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#video} needs updating.
   */
  _flagVideo: false,

  /**
   * @name Two.Texture#_flagLoaded
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#loaded} needs updating.
   */
  _flagLoaded: false,

  /**
   * @name Two.Texture#_flagRepeat
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#repeat} needs updating.
   */
  _flagRepeat: false,

  /**
   * @name Two.Texture#_flagOffset
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#offset} needs updating.
   */
  _flagOffset: false,

  /**
   * @name Two.Texture#_flagScale
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#scale} needs updating.
   */
  _flagScale: false,

  /**
   * @name Two.Texture#_id
   * @private
   * @see {@link Two.Texture#id}
   */
  _id: '',

  /**
   * @name Two.Texture#_src
   * @private
   * @see {@link Two.Texture#src}
   */
  _src: '',

  /**
   * @name Two.Texture#_image
   * @private
   * @see {@link Two.Texture#image}
   */
  _image: null,

  /**
   * @name Two.Texture#_loaded
   * @private
   * @see {@link Two.Texture#loaded}
   */
  _loaded: false,

  /**
   * @name Two.Texture#_repeat
   * @private
   * @see {@link Two.Texture#repeat}
   */
  _repeat: 'no-repeat',

  /**
   * @name Two.Texture#_scale
   * @private
   * @see {@link Two.Texture#scale}
   */
  _scale: 1,

  /**
   * @name Two.Texture#_offset
   * @private
   * @see {@link Two.Texture#offset}
   */
  _offset: null,

  /**
   * @name Two.Texture#clone
   * @function
   * @returns {Two.Texture}
   * @description Create a new instance of {@link Two.Texture} with the same properties of the current texture.
   */
  clone: function() {
    var clone = new Texture(this.src);
    clone.repeat = this.repeat;
    clone.offset.copy(this.origin);
    clone.scale = this.scale;
    return clone;
  },

  /**
   * @name Two.Texture#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the texture.
   */
  toObject: function() {
    return {
      src: this.src,
      // image: this.image,
      repeat: this.repeat,
      origin: this.origin.toObject(),
      scale: typeof this.scale === 'number' ? this.scale : this.scale.toObject()
    };
  },

  /**
   * @name Two.Texture#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagSrc || this._flagImage) {

      this.trigger(Events.Types.change);

      if (this._flagSrc || this._flagImage) {
        this.loaded = false;
        Texture.load(this, (function() {
          this.loaded = true;
          this
            .trigger(Events.Types.change)
            .trigger(Events.Types.load);
        }).bind(this));
      }

    }

    if (this._image && this._image.readyState >= 4) {
      this._flagVideo = true;
    }

    return this;

  },

  /**
   * @name Two.Texture#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagSrc = this._flagImage = this._flagLoaded
      = this._flagVideo = this._flagScale = this._flagOffset = false;

    return this;

  }

});

Texture.MakeObservable(Texture.prototype);

// Constants

var min$1 = Math.min, max$1 = Math.max,
  ceil = Math.ceil, floor = Math.floor;

/**
 * @name Two.Path
 * @class
 * @extends Two.Shape
 * @param {Two.Anchor[]} [vertices] - A list of {@link Two.Anchor}s that represent the order and coordinates to construct the rendered shape.
 * @param {Boolean} [closed=false] - Describes whether the shape is closed or open.
 * @param {Boolean} [curved=false] - Describes whether the shape automatically calculates bezier handles for each vertex.
 * @param {Boolean} [manual=false] - Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans.
 * @description This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.
 */
function Path(vertices, closed, curved, manual) {

  Shape.call(this);

  this._renderer.type = 'path';
  this._renderer.flagVertices = Path.FlagVertices.bind(this);
  this._renderer.bindVertices = Path.BindVertices.bind(this);
  this._renderer.unbindVertices = Path.UnbindVertices.bind(this);

  this._renderer.flagFill = Path.FlagFill.bind(this);
  this._renderer.flagStroke = Path.FlagStroke.bind(this);
  this._renderer.vertices = [];
  this._renderer.collection = [];

  /**
   * @name Two.Path#closed
   * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
   */
  this._closed = !!closed;

  /**
   * @name Two.Path#curved
   * @property {Boolean} - When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
   */
  this._curved = !!curved;

  /**
   * @name Two.Path#beginning
   * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
   * @description {@link Two.Path#beginning} is a percentage value that represents at what percentage into the path should the renderer start drawing.
   * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#ending}.
   */
  this.beginning = 0;

  /**
   * @name Two.Path#ending
   * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
   * @description {@link Two.Path#ending} is a percentage value that represents at what percentage into the path should the renderer start drawing.
   * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#beginning}.
   */
  this.ending = 1;

  // Style properties

  /**
   * @name Two.Path#fill
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  this.fill = '#fff';

  /**
   * @name Two.Path#stroke
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  this.stroke = '#000';

  /**
   * @name Two.Path#linewidth
   * @property {Number} - The thickness in pixels of the stroke.
   */
  this.linewidth = 1.0;

  /**
   * @name Two.Path#opacity
   * @property {Number} - The opaqueness of the path.
   * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
   */
  this.opacity = 1.0;

  /**
   * @name Two.Path#className
   * @property {String} - A class to be applied to the element to be compatible with CSS styling.
   * @nota-bene Only available for the SVG renderer.
   */
  this.className = '';

  /**
   * @name Two.Path#visible
   * @property {Boolean} - Display the path or not.
   * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
   */
  this.visible = true;

  /**
   * @name Two.Path#cap
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
   */
  this.cap = 'butt';      // Default of Adobe Illustrator

  /**
   * @name Two.Path#join
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
   */
  this.join = 'miter';    // Default of Adobe Illustrator

  /**
   * @name Two.Path#miter
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
   */
  this.miter = 4;         // Default of Adobe Illustrator

  /**
   * @name Two.Path#vertices
   * @property {Two.Anchor[]} - An ordered list of anchor points for rendering the path.
   * @description A list of {@link Two.Anchor} objects that consist of what form the path takes.
   * @nota-bene The array when manipulating is actually a {@link Two.Collection}.
   */
  this.vertices = vertices;

  /**
   * @name Two.Path#automatic
   * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
   */
  this.automatic = !manual;

  /**
   * @name Two.Path#dashes
   * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
   * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
   */
  this.dashes = [];

  /**
   * @name Two.Path#dashes#offset
   * @property {Number} - A number in pixels to offset {@link Two.Path#dashes} display.
   */
  this.dashes.offset = 0;

}

_.extend(Path, {

  /**
   * @name Two.Path.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Path}.
   */
  Properties: [
    'fill',
    'stroke',
    'linewidth',
    'opacity',
    'visible',
    'cap',
    'join',
    'miter',

    'closed',
    'curved',
    'automatic',
    'beginning',
    'ending'
  ],

  Utils: {
    getCurveLength: getCurveLength
  },

  /**
   * @name Two.Path.FlagVertices
   * @function
   * @description Cached method to let renderers know vertices have been updated on a {@link Two.Path}.
   */
  FlagVertices: function() {
    this._flagVertices = true;
    this._flagLength = true;
    if (this.parent) {
      this.parent._flagLength = true;
    }
  },

  /**
   * @name Two.Path.BindVertices
   * @function
   * @description Cached method to let {@link Two.Path} know vertices have been added to the instance.
   */
  BindVertices: function(items) {

    // This function is called a lot
    // when importing a large SVG
    var i = items.length;
    while (i--) {
      items[i].bind(Events.Types.change, this._renderer.flagVertices);
    }

    this._renderer.flagVertices();

  },

  /**
   * @name Two.Path.UnbindVertices
   * @function
   * @description Cached method to let {@link Two.Path} know vertices have been removed from the instance.
   */
  UnbindVertices: function(items) {

    var i = items.length;
    while (i--) {
      items[i].unbind(Events.Types.change, this._renderer.flagVertices);
    }

    this._renderer.flagVertices();

  },

  /**
   * @name Two.Path.FlagFill
   * @function
   * @description Cached method to let {@link Two.Path} know the fill has changed.
   */
  FlagFill: function() {
    this._flagFill = true;
  },

  /**
   * @name Two.Path.FlagFill
   * @function
   * @description Cached method to let {@link Two.Path} know the stroke has changed.
   */
  FlagStroke: function() {
    this._flagStroke = true;
  },

  /**
   * @name Two.Path.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Path} to any object. Handy if you'd like to extend the {@link Two.Path} class on a custom class.
   */
  MakeObservable: function(object) {

    Shape.MakeObservable(object);

    // Only the 7 defined properties are flagged like this. The subsequent
    // properties behave differently and need to be hand written.
    _.each(Path.Properties.slice(2, 8), defineGetterSetter, object);

    Object.defineProperty(object, 'fill', {
      enumerable: true,
      get: function() {
        return this._fill;
      },
      set: function(f) {

        if (this._fill instanceof Gradient
          || this._fill instanceof LinearGradient
          || this._fill instanceof RadialGradient
          || this._fill instanceof Texture) {
          this._fill.unbind(Events.Types.change, this._renderer.flagFill);
        }

        this._fill = f;
        this._flagFill = true;

        if (this._fill instanceof Gradient
          || this._fill instanceof LinearGradient
          || this._fill instanceof RadialGradient
          || this._fill instanceof Texture) {
          this._fill.bind(Events.Types.change, this._renderer.flagFill);
        }

      }
    });

    Object.defineProperty(object, 'stroke', {
      enumerable: true,
      get: function() {
        return this._stroke;
      },
      set: function(f) {

        if (this._stroke instanceof Gradient
          || this._stroke instanceof LinearGradient
          || this._stroke instanceof RadialGradient
          || this._stroke instanceof Texture) {
          this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
        }

        this._stroke = f;
        this._flagStroke = true;

        if (this._stroke instanceof Gradient
          || this._stroke instanceof LinearGradient
          || this._stroke instanceof RadialGradient
          || this._stroke instanceof Texture) {
          this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
        }

      }
    });

    /**
     * @name Two.Path#length
     * @property {Number} - The sum of distances between all {@link Two.Path#vertices}.
     */
    Object.defineProperty(object, 'length', {
      get: function() {
        if (this._flagLength) {
          this._updateLength();
        }
        return this._length;
      }
    });

    Object.defineProperty(object, 'closed', {
      enumerable: true,
      get: function() {
        return this._closed;
      },
      set: function(v) {
        this._closed = !!v;
        this._flagVertices = true;
      }
    });

    Object.defineProperty(object, 'curved', {
      enumerable: true,
      get: function() {
        return this._curved;
      },
      set: function(v) {
        this._curved = !!v;
        this._flagVertices = true;
      }
    });

    Object.defineProperty(object, 'automatic', {
      enumerable: true,
      get: function() {
        return this._automatic;
      },
      set: function(v) {
        if (v === this._automatic) {
          return;
        }
        this._automatic = !!v;
        var method = this._automatic ? 'ignore' : 'listen';
        _.each(this.vertices, function(v) {
          v[method]();
        });
      }
    });

    Object.defineProperty(object, 'beginning', {
      enumerable: true,
      get: function() {
        return this._beginning;
      },
      set: function(v) {
        this._beginning = v;
        this._flagVertices = true;
      }
    });

    Object.defineProperty(object, 'ending', {
      enumerable: true,
      get: function() {
        return this._ending;
      },
      set: function(v) {
        this._ending = v;
        this._flagVertices = true;
      }
    });

    Object.defineProperty(object, 'vertices', {

      enumerable: true,

      get: function() {
        return this._collection;
      },

      set: function(vertices) {

        var bindVertices = this._renderer.bindVertices;
        var unbindVertices = this._renderer.unbindVertices;

        // Remove previous listeners
        if (this._collection) {
          this._collection
            .unbind(Events.Types.insert, bindVertices)
            .unbind(Events.Types.remove, unbindVertices);
        }

        // Create new Collection with copy of vertices
        if (vertices instanceof Collection) {
          this._collection = vertices;
        } else {
          this._collection = new Collection(vertices || []);
        }


        // Listen for Collection changes and bind / unbind
        this._collection
          .bind(Events.Types.insert, bindVertices)
          .bind(Events.Types.remove, unbindVertices);

        // Bind Initial Vertices
        bindVertices(this._collection);

      }

    });

    /**
     * @name Two.Path#mask
     * @property {Two.Shape} - The shape whose alpha property becomes a clipping area for the path.
     * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
     */
    Object.defineProperty(object, 'mask', {

      enumerable: true,

      get: function() {
        return this._mask;
      },

      set: function(v) {
        this._mask = v;
        this._flagMask = true;
        if (!v.clip) {
          v.clip = true;
        }
      }

    });

    /**
     * @name Two.Path#clip
     * @property {Boolean} - Tells Two.js renderer if this object represents a mask for another object (or not).
     */
    Object.defineProperty(object, 'clip', {
      enumerable: true,
      get: function() {
        return this._clip;
      },
      set: function(v) {
        this._clip = v;
        this._flagClip = true;
      }
    });

    Object.defineProperty(object, 'dashes', {
      enumerable: true,
      get: function() {
        return this._dashes;
      },
      set: function(v) {
        if (typeof v.offset !== 'number') {
          v.offset = this._dashes.offset || 0;
        }
        this._dashes = v;
      }
    });

  }

});

_.extend(Path.prototype, Shape.prototype, {

  constructor: Path,

  // Flags
  // http://en.wikipedia.org/wiki/Flag

  /**
   * @name Two.Path#_flagVertices
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#vertices} need updating.
   */
  _flagVertices: true,

  /**
   * @name Two.Path#_flagLength
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#length} needs updating.
   */
  _flagLength: true,

  /**
   * @name Two.Path#_flagFill
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#fill} needs updating.
   */
  _flagFill: true,

  /**
   * @name Two.Path#_flagStroke
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#stroke} needs updating.
   */
  _flagStroke: true,

  /**
   * @name Two.Path#_flagLinewidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#linewidth} needs updating.
   */
  _flagLinewidth: true,

  /**
   * @name Two.Path#_flagOpacity
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#opacity} needs updating.
   */
  _flagOpacity: true,

  /**
   * @name Two.Path#_flagVisible
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#visible} needs updating.
   */
  _flagVisible: true,

  /**
   * @name Two.Path#_flagCap
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#cap} needs updating.
   */
  _flagCap: true,

  /**
   * @name Two.Path#_flagJoin
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#join} needs updating.
   */
  _flagJoin: true,

  /**
   * @name Two.Path#_flagMiter
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#miter} needs updating.
   */
  _flagMiter: true,

  /**
   * @name Two.Path#_flagMask
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#mask} needs updating.
   */
  _flagMask: false,

  /**
   * @name Two.Path#_flagClip
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#clip} needs updating.
   */
  _flagClip: false,

  // Underlying Properties

  /**
   * @name Two.Path#_length
   * @private
   * @see {@link Two.Path#length}
   */
  _length: 0,

  /**
   * @name Two.Path#_fill
   * @private
   * @see {@link Two.Path#fill}
   */
  _fill: '#fff',

  /**
   * @name Two.Path#_stroke
   * @private
   * @see {@link Two.Path#stroke}
   */
  _stroke: '#000',

  /**
   * @name Two.Path#_linewidth
   * @private
   * @see {@link Two.Path#linewidth}
   */
  _linewidth: 1.0,

  /**
   * @name Two.Path#_opacity
   * @private
   * @see {@link Two.Path#opacity}
   */
  _opacity: 1.0,

  /**
   * @name Two.Path#_visible
   * @private
   * @see {@link Two.Path#visible}
   */
  _visible: true,

  /**
   * @name Two.Path#_cap
   * @private
   * @see {@link Two.Path#cap}
   */
  _cap: 'round',

  /**
   * @name Two.Path#_join
   * @private
   * @see {@link Two.Path#join}
   */
  _join: 'round',

  /**
   * @name Two.Path#_miter
   * @private
   * @see {@link Two.Path#miter}
   */
  _miter: 4,

  /**
   * @name Two.Path#_closed
   * @private
   * @see {@link Two.Path#closed}
   */
  _closed: true,

  /**
   * @name Two.Path#_curved
   * @private
   * @see {@link Two.Path#curved}
   */
  _curved: false,

  /**
   * @name Two.Path#_automatic
   * @private
   * @see {@link Two.Path#automatic}
   */
  _automatic: true,

  /**
   * @name Two.Path#_beginning
   * @private
   * @see {@link Two.Path#beginning}
   */
  _beginning: 0,

  /**
   * @name Two.Path#_ending
   * @private
   * @see {@link Two.Path#ending}
   */
  _ending: 1.0,

  /**
   * @name Two.Path#_mask
   * @private
   * @see {@link Two.Path#mask}
   */
  _mask: null,

  /**
   * @name Two.Path#_clip
   * @private
   * @see {@link Two.Path#clip}
   */
  _clip: false,

  /**
   * @name Two.Path#_dashes
   * @private
   * @see {@link Two.Path#dashes}
   */
  _dashes: [],

  /**
   * @name Two.Path#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Path}
   * @description Create a new instance of {@link Two.Path} with the same properties of the current path.
   */
  clone: function(parent) {

    var clone = new Path();

    for (var j = 0; j < this.vertices.length; j++) {
      clone.vertices.push(this.vertices[j].clone());
    }

    for (var i = 0; i < Path.Properties.length; i++) {
      var k = Path.Properties[i];
      clone[k] = this[k];
    }

    clone.className = this.className;

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();

  },

  /**
   * @name Two.Path#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = {
      vertices: this.vertices.map(function(v) {
        return v.toObject();
      })
    };

    _.each(Path.Properties, function(k) {
      result[k] = this[k];
    }, this);

    result.className = this.className;

    result.translation = this.translation.toObject();
    result.rotation = this.rotation;
    result.scale = this.scale instanceof Vector ? this.scale.toObject() : this.scale;
    result.skewX = this.skewX;
    result.skewY = this.skewY;

    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }

    return result;

  },

  /**
   * @name Two.Path#noFill
   * @function
   * @description Short hand method to set fill to `transparent`.
   */
  noFill: function() {
    this.fill = 'transparent';
    return this;
  },

  /**
   * @name Two.Path#noStroke
   * @function
   * @description Short hand method to set stroke to `transparent`.
   */
  noStroke: function() {
    this.stroke = undefined;
    return this;
  },

  /**
   * @name Two.Path#corner
   * @function
   * @description Orient the vertices of the shape to the upper left-hand corner of the path.
   */
  corner: function() {

    var rect = this.getBoundingClientRect(true);
    var hw = rect.width / 2;
    var hh = rect.height / 2;
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    for (var i = 0; i < this.vertices.length; i++) {
      var v = this.vertices[i];
      v.x -= cx;
      v.y -= cy;
      v.x += hw;
      v.y += hh;
    }

    return this;

  },

  /**
   * @name Two.Path#center
   * @function
   * @description Orient the vertices of the shape to the center of the path.
   */
  center: function() {

    var rect = this.getBoundingClientRect(true);

    var cx = rect.left + rect.width / 2 - this.translation.x;
    var cy = rect.top + rect.height / 2 - this.translation.y;

    for (var i = 0; i < this.vertices.length; i++) {
      var v = this.vertices[i];
      v.x -= cx;
      v.y -= cy;
    }

    return this;

  },

  /**
   * @name Two.Path#remove
   * @function
   * @description Remove self from the scene / parent.
   */
  remove: function() {

    if (!this.parent) {
      return this;
    }

    this.parent.remove(this);

    return this;

  },

  /**
   * @name Two.Path#getBoundingClientRect
   * @function
   * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
   * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
   * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
   */
  getBoundingClientRect: function(shallow) {
    var matrix, border, l, i, v0, v1, c0x, c0y, c1x, c1y, a, b, c, d;

    var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

    // TODO: Update this to not __always__ update. Just when it needs to.
    this._update(true);

    matrix = shallow ? this._matrix : getComputedMatrix(this);

    border = (this.linewidth || 0) / 2;
    l = this._renderer.vertices.length;

    if (l <= 0) {
      return {
        width: 0,
        height: 0
      };
    }

    for (i = 0; i < l; i++) {

      v1 = this._renderer.vertices[i];
      // If i = 0, then this "wraps around" to the last vertex. Otherwise, it's the previous vertex.
      // This is important for handling cyclic paths.
      v0 = this._renderer.vertices[(i + l - 1) % l];

      if (v0.controls && v1.controls) {

        c0x = v0.controls.right.x;
        c0y = v0.controls.right.y;

        if (v0.relative) {
          c0x += v0.x;
          c0y += v0.y;
        }

        c1x = v1.controls.left.x;
        c1y = v1.controls.left.y;

        if (v1.relative) {
          c1x += v1.x;
          c1y += v1.y;
        }

        var bb = getCurveBoundingBox(v0.x, v0.y,
          c0x, c0y, c1x, c1y, v1.x, v1.y);

        top = min$1(bb.min.y - border, top);
        left = min$1(bb.min.x - border, left);
        right = max$1(bb.max.x + border, right);
        bottom = max$1(bb.max.y + border, bottom);

      } else {

        if (i <= 1) {

          top = min$1(v0.y - border, top);
          left = min$1(v0.x - border, left);
          right = max$1(v0.x + border, right);
          bottom = max$1(v0.y + border, bottom);

        }

        top = min$1(v1.y - border, top);
        left = min$1(v1.x - border, left);
        right = max$1(v1.x + border, right);
        bottom = max$1(v1.y + border, bottom);

      }

    }

    a = matrix.multiply(left, top, 1);
    b = matrix.multiply(left, bottom, 1);
    c = matrix.multiply(right, top, 1);
    d = matrix.multiply(right, bottom, 1);

    top = min$1(a.y, b.y, c.y, d.y);
    left = min$1(a.x, b.x, c.x, d.x);
    right = max$1(a.x, b.x, c.x, d.x);
    bottom = max$1(a.y, b.y, c.y, d.y);

    return {
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      width: right - left,
      height: bottom - top
    };

  },

  /**
   * @name Two.Path#getPointAt
   * @function
   * @param {Boolean} t - Percentage value describing where on the Two.Path to estimate and assign coordinate values.
   * @param {Two.Vector} [obj=undefined] - Object to apply calculated x, y to. If none available returns new Object.
   * @returns {Object}
   * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this Two.Path's curve.
   */
  getPointAt: function(t, obj) {

    var ia, ib, result;
    var x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
    var target = this.length * Math.min(Math.max(t, 0), 1);
    var length = this.vertices.length;
    var last = length - 1;

    var a = null;
    var b = null;

    for (var i = 0, l = this._lengths.length, sum = 0; i < l; i++) {

      if (sum + this._lengths[i] >= target) {

        if (this._closed) {
          ia = mod(i, length);
          ib = mod(i - 1, length);
          if (i === 0) {
            ia = ib;
            ib = i;
          }
        } else {
          ia = i;
          ib = Math.min(Math.max(i - 1, 0), last);
        }

        a = this.vertices[ia];
        b = this.vertices[ib];
        target -= sum;
        if (this._lengths[i] !== 0) {
          t = target / this._lengths[i];
        } else {
          t = 0;
        }

        break;

      }

      sum += this._lengths[i];

    }

    if (a === null || b === null) {
      return null;
    }

    if (!a) {
      return b;
    } else if (!b) {
      return a;
    }

    right = b.controls && b.controls.right;
    left = a.controls && a.controls.left;

    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;

    if (right && b.relative) {
      x2 += b.x;
      y2 += b.y;
    }

    if (left && a.relative) {
      x3 += a.x;
      y3 += a.y;
    }

    x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
    y = getComponentOnCubicBezier(t, y1, y2, y3, y4);

    // Higher order points for control calculation.
    var t1x = lerp(x1, x2, t);
    var t1y = lerp(y1, y2, t);
    var t2x = lerp(x2, x3, t);
    var t2y = lerp(y2, y3, t);
    var t3x = lerp(x3, x4, t);
    var t3y = lerp(y3, y4, t);

    // Calculate the returned points control points.
    var brx = lerp(t1x, t2x, t);
    var bry = lerp(t1y, t2y, t);
    var alx = lerp(t2x, t3x, t);
    var aly = lerp(t2y, t3y, t);

    if (_.isObject(obj)) {

      obj.x = x;
      obj.y = y;

      if (!_.isObject(obj.controls)) {
        Anchor.AppendCurveProperties(obj);
      }

      obj.controls.left.x = brx;
      obj.controls.left.y = bry;
      obj.controls.right.x = alx;
      obj.controls.right.y = aly;

      if (!typeof obj.relative === 'boolean' || obj.relative) {
        obj.controls.left.x -= x;
        obj.controls.left.y -= y;
        obj.controls.right.x -= x;
        obj.controls.right.y -= y;
      }

      obj.t = t;

      return obj;

    }

    result = new Anchor(
      x, y, brx - x, bry - y, alx - x, aly - y,
      this._curved ? Commands.curve : Commands.line
    );

    result.t = t;

    return result;

  },

  /**
   * @name Two.Path#plot
   * @function
   * @description Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
   * @nota-bene While this method is public it is internally called by {@link Two.Path#_update} when `automatic = true`.
   */
  plot: function() {

    if (this.curved) {
      getCurveFromPoints(this._collection, this.closed);
      return this;
    }

    for (var i = 0; i < this._collection.length; i++) {
      this._collection[i].command = i === 0 ? Commands.move : Commands.line;
    }

    return this;

  },

  /**
   * @name Two.Path#subdivide
   * @function
   * @param {Number} limit - How many times to recurse subdivisions.
   * @description Insert a {@link Two.Anchor} at the midpoint between every item in {@link Two.Path#vertices}.
   */
  subdivide: function(limit) {
    //TODO: DRYness (function below)
    this._update();

    var last = this.vertices.length - 1;
    var b = this.vertices[last];
    var closed = this._closed || this.vertices[last]._command === Commands.close;
    var points = [];
    _.each(this.vertices, function(a, i) {

      if (i <= 0 && !closed) {
        b = a;
        return;
      }

      if (a.command === Commands.move) {
        points.push(new Anchor(b.x, b.y));
        if (i > 0) {
          points[points.length - 1].command = Commands.line;
        }
        b = a;
        return;
      }

      var verts = getSubdivisions(a, b, limit);
      points = points.concat(verts);

      // Assign commands to all the verts
      _.each(verts, function(v, i) {
        if (i <= 0 && b.command === Commands.move) {
          v.command = Commands.move;
        } else {
          v.command = Commands.line;
        }
      });

      if (i >= last) {

        // TODO: Add check if the two vectors in question are the same values.
        if (this._closed && this._automatic) {

          b = a;

          verts = getSubdivisions(a, b, limit);
          points = points.concat(verts);

          // Assign commands to all the verts
          _.each(verts, function(v, i) {
            if (i <= 0 && b.command === Commands.move) {
              v.command = Commands.move;
            } else {
              v.command = Commands.line;
            }
          });

        } else if (closed) {
          points.push(new Anchor(a.x, a.y));
        }

        points[points.length - 1].command = closed
          ? Commands.close : Commands.line;

      }

      b = a;

    }, this);

    this._automatic = false;
    this._curved = false;
    this.vertices = points;

    return this;

  },

  /**
   * @name Two.Path#_updateLength
   * @function
   * @private
   * @param {Number} [limit=] -
   * @param {Boolean} [silent=false] - If set to `true` then the path isn't updated before calculation. Useful for internal use.
   * @description Recalculate the {@link Two.Path#length} value.
   */
  _updateLength: function(limit, silent) {
    //TODO: DRYness (function above)
    if (!silent) {
      this._update();
    }

    var length = this.vertices.length;
    var last = length - 1;
    var b = this.vertices[last];
    var closed = false;//this._closed || this.vertices[last]._command === Commands.close;
    var sum = 0;

    if (typeof this._lengths === 'undefined') {
      this._lengths = [];
    }

    _.each(this.vertices, function(a, i) {

      if ((i <= 0 && !closed) || a.command === Commands.move) {
        b = a;
        this._lengths[i] = 0;
        return;
      }

      this._lengths[i] = getCurveLength(a, b, limit);
      sum += this._lengths[i];

      if (i >= last && closed) {

        b = this.vertices[(i + 1) % length];

        this._lengths[i + 1] = getCurveLength(a, b, limit);
        sum += this._lengths[i + 1];

      }

      b = a;

    }, this);

    this._length = sum;
    this._flagLength = false;

    return this;

  },

  /**
   * @name Two.Path#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices) {

      if (this._automatic) {
        this.plot();
      }

      if (this._flagLength) {
        this._updateLength(undefined, true);
      }

      var l = this._collection.length;
      var closed = this._closed;

      var beginning = Math.min(this._beginning, this._ending);
      var ending = Math.max(this._beginning, this._ending);

      var bid = getIdByLength(this, beginning * this._length);
      var eid = getIdByLength(this, ending * this._length);

      var low = ceil(bid);
      var high = floor(eid);

      var left, right, prev, next, v;

      this._renderer.vertices.length = 0;

      for (var i = 0; i < l; i++) {

        if (this._renderer.collection.length <= i) {
          // Expected to be `relative` anchor points.
          this._renderer.collection.push(new Anchor());
        }

        if (i > high && !right) {

          v = this._renderer.collection[i];
          v.copy(this._collection[i]);
          this.getPointAt(ending, v);
          v.command = this._renderer.collection[i].command;
          this._renderer.vertices.push(v);

          right = v;
          prev = this._collection[i - 1];

          // Project control over the percentage `t`
          // of the in-between point
          if (prev && prev.controls) {

            v.controls.right.clear();

            this._renderer.collection[i - 1].controls.right
              .clear()
              .lerp(prev.controls.right, v.t);

          }

        } else if (i >= low && i <= high) {

          v = this._renderer.collection[i]
            .copy(this._collection[i]);
          this._renderer.vertices.push(v);

          if (i === high && contains(this, ending)) {
            right = v;
            if (!closed && right.controls) {
              right.controls.right.clear();
            }
          } else if (i === low && contains(this, beginning)) {
            left = v;
            left.command = Commands.move;
            if (!closed && left.controls) {
              left.controls.left.clear();
            }
          }

        }

      }

      // Prepend the trimmed point if necessary.
      if (low > 0 && !left) {

        i = low - 1;

        v = this._renderer.collection[i];
        v.copy(this._collection[i]);
        this.getPointAt(beginning, v);
        v.command = Commands.move;
        this._renderer.vertices.unshift(v);

        left = v;
        next = this._collection[i + 1];

        // Project control over the percentage `t`
        // of the in-between point
        if (next && next.controls) {

          v.controls.left.clear();

          this._renderer.collection[i + 1].controls.left
            .copy(next.controls.left)
            .lerp(Vector.zero, v.t);

        }

      }

    }

    Shape.prototype._update.apply(this, arguments);

    return this;

  },

  /**
   * @name Two.Path#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagVertices =  this._flagFill =  this._flagStroke =
        this._flagLinewidth = this._flagOpacity = this._flagVisible =
        this._flagCap = this._flagJoin = this._flagMiter =
        this._flagClip = false;

    Shape.prototype.flagReset.call(this);

    return this;

  }

});

Path.MakeObservable(Path.prototype);

  // Utility functions

function contains(path, t) {

  if (t === 0 || t === 1) {
    return true;
  }

  var length = path._length;
  var target = length * t;
  var elapsed = 0;

  for (var i = 0; i < path._lengths.length; i++) {
    var dist = path._lengths[i];
    if (elapsed >= target) {
      return target - elapsed >= 0;
    }
    elapsed += dist;
  }

  return false;

}

/**
 * @private
 * @param {Two.Path} path - The path to analyze against.
 * @param {Number} target - The target length at which to find an anchor.
 * @returns {Number}
 * @description Return the id of an anchor based on a target length.
 */
function getIdByLength(path, target) {

  var total = path._length;

  if (target <= 0) {
    return 0;
  } else if (target >= total) {
    return path._lengths.length - 1;
  }

  for (var i = 0, sum = 0; i < path._lengths.length; i++) {

    if (sum + path._lengths[i] >= target) {
      target -= sum;
      return Math.max(i - 1, 0) + target / path._lengths[i];
    }

    sum += path._lengths[i];

  }

  return - 1;

}

function getCurveLength(a, b, limit) {
  // TODO: DRYness
  var x1, x2, x3, x4, y1, y2, y3, y4;

  var right = b.controls && b.controls.right;
  var left = a.controls && a.controls.left;

  x1 = b.x;
  y1 = b.y;
  x2 = (right || b).x;
  y2 = (right || b).y;
  x3 = (left || a).x;
  y3 = (left || a).y;
  x4 = a.x;
  y4 = a.y;

  if (right && b._relative) {
    x2 += b.x;
    y2 += b.y;
  }

  if (left && a._relative) {
    x3 += a.x;
    y3 += a.y;
  }

  return getCurveLength$1(x1, y1, x2, y2, x3, y3, x4, y4, limit);

}

function getSubdivisions(a, b, limit) {
  // TODO: DRYness
  var x1, x2, x3, x4, y1, y2, y3, y4;

  var right = b.controls && b.controls.right;
  var left = a.controls && a.controls.left;

  x1 = b.x;
  y1 = b.y;
  x2 = (right || b).x;
  y2 = (right || b).y;
  x3 = (left || a).x;
  y3 = (left || a).y;
  x4 = a.x;
  y4 = a.y;

  if (right && b._relative) {
    x2 += b.x;
    y2 += b.y;
  }

  if (left && a._relative) {
    x3 += a.x;
    y3 += a.y;
  }

  return subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);

}

/**
 * @name Two.Rectangle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the rectangle.
 * @param {Number} [y=0] - The y position of the rectangle.
 * @param {Number} [width] - The width value of the rectangle.
 * @param {Number} [height] - The width value of the rectangle.
 */
function Rectangle(x, y, width, height) {

  Path.call(this, [
    new Anchor(),
    new Anchor(),
    new Anchor(),
    new Anchor()
    // new Anchor() // TODO: Figure out how to handle this for `beginning` / `ending` animations
  ], true, false, true);

  /**
   * @name Two.Rectangle#width
   * @property {Number} - The size of the width of the rectangle.
   */
  this.width = width;
  /**
   * @name Two.Rectangle#height
   * @property {Number} - The size of the height of the rectangle.
   */
  this.height = height;

  /**
   * @name Two.Rectangle#origin
   * @property {Number} - A two-component vector describing the origin offset to draw the rectangle. Default is `0, 0`.
   */
  this.origin = new Vector();
  this.translation.set(x, y);

  this._update();

}

_.extend(Rectangle, {

  /**
   * @name Two.Rectangle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Rectangle}.
   */
  Properties: ['width', 'height'],

  /**
   * @name Two.Rectangle.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Rectangle} to any object. Handy if you'd like to extend the {@link Two.Rectangle} class on a custom class.
   */
  MakeObservable: function(object) {

    Path.MakeObservable(object);
    _.each(Rectangle.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'origin', {
      enumerable: true,
      get: function() {
        return this._origin;
      },
      set: function(v) {
        if (this._origin) {
          this._origin.unbind(Events.Types.change, this._renderer.flagVertices);
        }
        this._origin = v;
        this._origin.bind(Events.Types.change, this._renderer.flagVertices);
        this._renderer.flagVertices();
      }
    });

  }

});

_.extend(Rectangle.prototype, Path.prototype, {

  constructor: Rectangle,

  /**
   * @name Two.Rectangle#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Rectangle#width} needs updating.
   */
  _flagWidth: 0,
  /**
   * @name Two.Rectangle#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Rectangle#height} needs updating.
   */
  _flagHeight: 0,

  /**
   * @name Two.Rectangle#_width
   * @private
   * @see {@link Two.Rectangle#width}
   */
  _width: 0,
  /**
   * @name Two.Rectangle#_height
   * @private
   * @see {@link Two.Rectangle#height}
   */
  _height: 0,

  _origin: null,

  /**
   * @name Two.Rectangle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagWidth || this._flagHeight) {

      var xr = this._width / 2;
      var yr = this._height / 2;

      if (!this._closed && this.vertices.length === 4) {
        this.vertices.push(new Anchor());
      }

      this.vertices[0].set(-xr, -yr).add(this._origin).command = Commands.move;
      this.vertices[1].set(xr, -yr).add(this._origin).command = Commands.line;
      this.vertices[2].set(xr, yr).add(this._origin).command = Commands.line;
      this.vertices[3].set(-xr, yr).add(this._origin).command = Commands.line;
      // FYI: Two.Sprite and Two.ImageSequence have 4 verts
      if (this.vertices[4]) {
        this.vertices[4].set(-xr, -yr).add(this._origin).command = Commands.line;
      }

    }

    Path.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.Rectangle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = false;
    Path.prototype.flagReset.call(this);

    return this;

  },

  /**
   * @name Two.Rectangle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Rectangle}
   * @description Create a new instance of {@link Two.Rectangle} with the same properties of the current path.
   */
  clone: function(parent) {

    var clone = new Rectangle(0, 0, this.width, this.height);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Rectangle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);
    object.width = this.width;
    object.height = this.height;
    object.origin = this.origin.toObject();
    return object;

  }

});

Rectangle.MakeObservable(Rectangle.prototype);

/**
 * @name Two.Sprite
 * @class
 * @extends Two.Rectangle
 * @param {String|Two.Texture} [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
 * @param {Number} [ox=0] - The initial `x` position of the Two.Sprite.
 * @param {Number} [oy=0] - The initial `y` position of the Two.Sprite.
 * @param {Number} [cols=1] - The number of columns the sprite contains.
 * @param {Number} [rows=1] - The number of rows the sprite contains.
 * @param {Number} [frameRate=0] - The frame rate at which the partitions of the image should playback at.
 * @description A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
 */
function Sprite(path, ox, oy, cols, rows, frameRate) {

  // Not using default constructor of Rectangle due to odd `beginning` / `ending` behavior.
  // See: https://github.com/jonobr1/two.js/issues/383
  Path.call(this, [
    new Anchor(),
    new Anchor(),
    new Anchor(),
    new Anchor()
  ], true);

  this.noStroke();
  this.noFill();

  /**
   * @name Two.Sprite#texture
   * @property {Two.Texture} - The texture to be used as bitmap data to display image in the scene.
   */
  if (path instanceof Texture) {
    this.texture = path;
  } else if (typeof path === 'string') {
    this.texture = new Texture(path);
  }

  this.origin = new Vector();

  this._update();
  this.translation.set(ox || 0, oy || 0);

  /**
   * @name Two.Sprite#columns
   * @property {Number} - The number of columns to split the texture into. Defaults to `1`.
   */
  if (typeof cols === 'number') {
    this.columns = cols;
  }

  /**
   * @name Two.Sprite#rows
   * @property {Number} - The number of rows to split the texture into. Defaults to `1`.
   */
  if (typeof rows === 'number') {
    this.rows = rows;
  }

  /**
   * @name Two.Sprite#frameRate
   * @property {Number} - The number of frames to animate against per second. Defaults to `0` for non-animated sprites.
   */
  if (typeof frameRate === 'number') {
    this.frameRate = frameRate;
  }

  /**
   * @name Two.Sprite#index
   * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
   */
  this.index = 0;

}

_.extend(Sprite, {

  /**
   * @name Two.Sprite.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Sprite}.
   */
  Properties: [
    'texture', 'columns', 'rows', 'frameRate', 'index'
  ],

  /**
   * @name Two.Sprite.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Sprite} to any object. Handy if you'd like to extend or inherit the {@link Two.Sprite} class on a custom class.
   */
  MakeObservable: function(obj) {

    Rectangle.MakeObservable(obj);
    _.each(Sprite.Properties, defineGetterSetter, obj);

  }

});

_.extend(Sprite.prototype, Rectangle.prototype, {

  constructor: Sprite,

  /**
   * @name Two.Sprite#_flagTexture
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Sprite#texture} needs updating.
   */
  _flagTexture: false,

  /**
   * @name Two.Sprite#_flagColumns
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Sprite#columns} need updating.
   */
  _flagColumns: false,

  /**
   * @name Two.Sprite#_flagRows
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Sprite#rows} need updating.
   */
  _flagRows: false,

  /**
   * @name Two.Sprite#_flagFrameRate
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Sprite#flagFrameRate} needs updating.
   */
  _flagFrameRate: false,

  /**
   * @name Two.Sprite#_flagIndex
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Sprite#index} needs updating.
   */
  flagIndex: false,

  // Private variables

  /**
   * @name Two.Sprite#_amount
   * @private
   * @property {Number} - Number of frames for a given {@link Two.Sprite}.
   */
  _amount: 1,

  /**
   * @name Two.Sprite#_duration
   * @private
   * @property {Number} - Number of milliseconds a {@link Two.Sprite}.
   */
  _duration: 0,

  /**
   * @name Two.Sprite#_startTime
   * @private
   * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.Sprite} started.
   */
  _startTime: 0,

  /**
   * @name Two.Sprite#_playing
   * @private
   * @property {Boolean} - Dictates whether the {@link Two.Sprite} is animating or not.
   */
  _playing: false,

  /**
   * @name Two.Sprite#_firstFrame
   * @private
   * @property {Number} - The frame the {@link Two.Sprite} should start with.
   */
  _firstFrame: 0,

  /**
   * @name Two.Sprite#_lastFrame
   * @private
   * @property {Number} - The frame the {@link Two.Sprite} should end with.
   */
  _lastFrame: 0,

  /**
   * @name Two.Sprite#_playing
   * @private
   * @property {Boolean} - Dictates whether the {@link Two.Sprite} should loop or not.
   */
  _loop: true,

  // Exposed through getter-setter

  /**
   * @name Two.Sprite#_texture
   * @private
   * @see {@link Two.Sprite#texture}
   */
  _texture: null,

  /**
   * @name Two.Sprite#_columns
   * @private
   * @see {@link Two.Sprite#columns}
   */
  _columns: 1,

  /**
   * @name Two.Sprite#_rows
   * @private
   * @see {@link Two.Sprite#rows}
   */
  _rows: 1,

  /**
   * @name Two.Sprite#_frameRate
   * @private
   * @see {@link Two.Sprite#frameRate}
   */
  _frameRate: 0,

  /**
   * @name Two.Sprite#_index
   * @private
   * @property {Number} - The current frame the {@link Two.Sprite} is currently displaying.
   */
  _index: 0,

  /**
   * @name Two.Sprite#_origin
   * @private
   * @see {@link Two.Sprite#origin}
   */
  _origin: null,

  /**
   * @name Two.Sprite#play
   * @function
   * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
   * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.Sprite#textures}.
   * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
   * @description Initiate animation playback of a {@link Two.Sprite}.
   */
  play: function(firstFrame, lastFrame, onLastFrame) {

    this._playing = true;
    this._firstFrame = 0;
    this._lastFrame = this.amount - 1;
    this._startTime = _.performance.now();

    if (typeof firstFrame === 'number') {
      this._firstFrame = firstFrame;
    }
    if (typeof lastFrame === 'number') {
      this._lastFrame = lastFrame;
    }
    if (typeof onLastFrame === 'function') {
      this._onLastFrame = onLastFrame;
    } else {
      delete this._onLastFrame;
    }

    if (this._index !== this._firstFrame) {
      this._startTime -= 1000 * Math.abs(this._index - this._firstFrame)
        / this._frameRate;
    }

    return this;

  },

  /**
   * @name Two.Sprite#pause
   * @function
   * @description Halt animation playback of a {@link Two.Sprite}.
   */
  pause: function() {

    this._playing = false;
    return this;

  },

  /**
   * @name Two.Sprite#stop
   * @function
   * @description Halt animation playback of a {@link Two.Sprite} and set the current frame back to the first frame.
   */
  stop: function() {

    this._playing = false;
    this._index = 0;

    return this;

  },

  /**
   * @name Two.Sprite#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Sprite}
   * @description Create a new instance of {@link Two.Sprite} with the same properties of the current sprite.
   */
  clone: function(parent) {

    var clone = new Sprite(
      this.texture, this.translation.x, this.translation.y,
      this.columns, this.rows, this.frameRate
    );

    if (this.playing) {
      clone.play(this._firstFrame, this._lastFrame);
      clone._loop = this._loop;
    }

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Sprite#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {
    var object = Rectangle.prototype.toObject.call(this);
    object.texture = this.texture.toObject();
    object.columns = this.columns;
    object.rows = this.rows;
    object.frameRate = this.frameRate;
    object.index = this.index;
    object._firstFrame = this._firstFrame;
    object._lastFrame = this._lastFrame;
    object._loop = this._loop;
    return object;
  },

  /**
   * @name Two.Sprite#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    var effect = this._texture;
    var cols = this._columns;
    var rows = this._rows;

    var width, height, elapsed, amount, duration;
    var index, iw, ih, frames;

    if (this._flagColumns || this._flagRows) {
      this._amount = this._columns * this._rows;
    }

    if (this._flagFrameRate) {
      this._duration = 1000 * this._amount / this._frameRate;
    }

    if (this._flagTexture) {
      this.fill = this._texture;
    }

    if (this._texture.loaded) {

      iw = effect.image.width;
      ih = effect.image.height;

      width = iw / cols;
      height = ih / rows;
      amount = this._amount;

      if (this.width !== width) {
        this.width = width;
      }
      if (this.height !== height) {
        this.height = height;
      }

      if (this._playing && this._frameRate > 0) {

        if (_.isNaN(this._lastFrame)) {
          this._lastFrame = amount - 1;
        }

        // TODO: Offload perf logic to instance of `Two`.
        elapsed = _.performance.now() - this._startTime;
        frames = this._lastFrame + 1;
        duration = 1000 * (frames - this._firstFrame) / this._frameRate;

        if (this._loop) {
          elapsed = elapsed % duration;
        } else {
          elapsed = Math.min(elapsed, duration);
        }

        index = lerp(this._firstFrame, frames, elapsed / duration);
        index = Math.floor(index);

        if (index !== this._index) {
          this._index = index;
          if (index >= this._lastFrame - 1 && this._onLastFrame) {
            this._onLastFrame();  // Shortcut for chainable sprite animations
          }
        }

      }

      var col = this._index % cols;
      var row = Math.floor(this._index / cols);

      var ox = - width * col + (iw - width) / 2;
      var oy = - height * row + (ih - height) / 2;

      // TODO: Improve performance
      if (ox !== effect.offset.x) {
        effect.offset.x = ox;
      }
      if (oy !== effect.offset.y) {
        effect.offset.y = oy;
      }

    }

    Rectangle.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.Sprite#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagTexture = this._flagColumns = this._flagRows
      = this._flagFrameRate = false;

    Rectangle.prototype.flagReset.call(this);

    return this;
  }


});

Sprite.MakeObservable(Sprite.prototype);

var TWO_PI$4 = Math.PI * 2, HALF_PI$2 = Math.PI / 2;
var cos$3 = Math.cos, sin$3 = Math.sin;

/**
 * @name Two.Circle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the circle.
 * @param {Number} [y=0] - The y position of the circle.
 * @param {Number} [radius=0] - The radius value of the circle.
 * @param {Number} [resolution=4] - The number of vertices used to construct the circle.
 */
function Circle(ox, oy, r, resolution) {

  // At least 2 vertices are required for proper circlage
  var amount = resolution ? Math.max(resolution, 2) : 4;

  var points = [];
  for (var i = 0; i < amount; i++) {
    points.push(new Anchor(0, 0, 0, 0, 0, 0));
  }

  Path.call(this, points, true, true, true);

  /**
   * @name Two.Circle#radius
   * @property {Number} - The size of the radius of the circle.
   */
  if (typeof r === 'number') {
    this.radius = r;
  }

  this._update();

  if (typeof ox === 'number') {
    this.translation.x = ox;
  }
  if (typeof oy === 'number') {
    this.translation.y = oy;
  }

}

_.extend(Circle, {

  /**
   * @name Two.Circle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Circle}.
   */
  Properties: ['radius'],

  /**
   * @name Two.Circle.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Circle} to any object. Handy if you'd like to extend the {@link Two.Circle} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(Circle.Properties, defineGetterSetter, obj);

  }

});

_.extend(Circle.prototype, Path.prototype, {

  constructor: Circle,

  /**
   * @name Two.Circle#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Circle#radius} needs updating.
   */
  _flagRadius: false,

  /**
   * @name Two.Circle#_radius
   * @private
   * @see {@link Two.Circle#radius}
   */
  _radius: 0,

  /**
   * @name Two.Circle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagRadius) {

      var length = this.vertices.length;

      if (!this._closed && length > 2) {
        length -= 1;
      }

      // Coefficient for approximating circular arcs with Bezier curves
      var c = (4 / 3) * Math.tan(Math.PI / (length * 2));
      var radius = this._radius;
      var rc = radius * c;

      for (var i = 0; i < this.vertices.length; i++) {
        var pct = i / length;
        var theta = pct * TWO_PI$4;

        var x = radius * cos$3(theta);
        var y = radius * sin$3(theta);

        var lx = rc * cos$3(theta - HALF_PI$2);
        var ly = rc * sin$3(theta - HALF_PI$2);

        var rx = rc * cos$3(theta + HALF_PI$2);
        var ry = rc * sin$3(theta + HALF_PI$2);

        var v = this.vertices[i];

        v.command = i === 0 ? Commands.move : Commands.curve;
        v.set(x, y);
        v.controls.left.set(lx, ly);
        v.controls.right.set(rx, ry);
      }
    }

    Path.prototype._update.call(this);
    return this;

  },

  /**
   * @name Two.Circle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagRadius = false;

    Path.prototype.flagReset.call(this);
    return this;

  },

  /**
   * @name Two.Circle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Circle}
   * @description Create a new instance of {@link Two.Circle} with the same properties of the current path.
   */
  clone: function(parent) {

    var clone = new Circle(0, 0, this.radius, this.vertices.length);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Circle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(Circle.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

Circle.MakeObservable(Circle.prototype);

var TWO_PI$3 = Math.PI * 2, HALF_PI$1 = Math.PI / 2;
var cos$2 = Math.cos, sin$2 = Math.sin;

/**
 * @name Two.Ellipse
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the ellipse.
 * @param {Number} [y=0] - The y position of the ellipse.
 * @param {Number} [rx=0] - The radius value of the ellipse in the x direction.
 * @param {Number} [ry=0] - The radius value of the ellipse in the y direction.
 * @param {Number} [resolution=4] - The number of vertices used to construct the ellipse.
 */
function Ellipse(ox, oy, rx, ry, resolution) {

  if (typeof ry !== 'number' && typeof rx === 'number') {
    ry = rx;
  }

  // At least 2 vertices are required for proper circlage
  var amount = resolution ? Math.max(resolution, 2) : 4;

  var points = [];
  for (var i = 0; i < amount; i++) {
    points.push(new Anchor());
  }

  Path.call(this, points, true, true, true);

  /**
   * @name Two.Ellipse#width
   * @property {Number} - The width of the ellipse.
   */
  if (typeof rx === 'number') {
    this.width = rx * 2;
  }

  /**
   * @name Two.Ellipse#height
   * @property {Number} - The height of the ellipse.
   */
  if (typeof ry === 'number') {
    this.height = ry * 2;
  }

  this._update();
  this.translation.set(ox, oy);

}

_.extend(Ellipse, {

  /**
   * @name Two.Ellipse.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Ellipse}.
   */
  Properties: ['width', 'height'],

  /**
   * @name Two.Ellipse.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Ellipse} to any object. Handy if you'd like to extend the {@link Two.Ellipse} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(Ellipse.Properties, defineGetterSetter, obj);

  }

});

_.extend(Ellipse.prototype, Path.prototype, {

  /**
   * @name Two.Ellipse#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Ellipse#width} needs updating.
   */
  _flagWidth: false,
  /**
   * @name Two.Ellipse#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Ellipse#height} needs updating.
   */
  _flagHeight: false,

  /**
   * @name Two.Polygon#_width
   * @private
   * @see {@link Two.Ellipse#width}
   */
  _width: 0,
  /**
   * @name Two.Polygon#_height
   * @private
   * @see {@link Two.Ellipse#height}
   */
  _height: 0,

  constructor: Ellipse,

  /**
   * @name Two.Ellipse#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagWidth || this._flagHeight) {

      var length = this.vertices.length;

      if (!this._closed && length > 2) {
        length -= 1;
      }

      // Coefficient for approximating circular arcs with Bezier curves
      var c = (4 / 3) * Math.tan(Math.PI / (this.vertices.length * 2));
      var radiusX = this._width / 2;
      var radiusY = this._height / 2;

      for (var i = 0; i < this.vertices.length; i++) {
        var pct = i / length;
        var theta = pct * TWO_PI$3;

        var x = radiusX * cos$2(theta);
        var y = radiusY * sin$2(theta);

        var lx = radiusX * c * cos$2(theta - HALF_PI$1);
        var ly = radiusY * c * sin$2(theta - HALF_PI$1);

        var rx = radiusX * c * cos$2(theta + HALF_PI$1);
        var ry = radiusY * c * sin$2(theta + HALF_PI$1);

        var v = this.vertices[i];

        v.command = i === 0 ? Commands.move : Commands.curve;
        v.set(x, y);
        v.controls.left.set(lx, ly);
        v.controls.right.set(rx, ry);
      }
    }

    Path.prototype._update.call(this);
    return this;

  },

  /**
   * @name Two.Ellipse#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = false;

    Path.prototype.flagReset.call(this);
    return this;

  },

  /**
   * @name Two.Ellipse#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Polygon}
   * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
   */
  clone: function(parent) {

    var rx = this.width / 2;
    var ry = this.height / 2;
    var resolution = this.vertices.length;
    var clone = new Ellipse(0, 0, rx, ry, resolution);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Ellipse#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(Ellipse.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

Ellipse.MakeObservable(Ellipse.prototype);

/**
 * @name Two.Line
 * @class
 * @extends Two.Path
 * @param {Number} [x1=0] - The x position of the first vertex on the line.
 * @param {Number} [y1=0] - The y position of the first vertex on the line.
 * @param {Number} [x2=0] - The x position of the second vertex on the line.
 * @param {Number} [y2=0] - The y position of the second vertex on the line.
 */
function Line(x1, y1, x2, y2) {

  Path.call(this, [
      new Anchor(x1, y1),
      new Anchor(x2, y2)
  ]);

  this.vertices[0].command = Commands.move;
  this.vertices[1].command = Commands.line;

  this.automatic = false;

}

_.extend(Line.prototype, Path.prototype, {

  constructor: Line

});

Path.MakeObservable(Line.prototype);

/**
 * @name Two.RoundedRectangle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the rounded rectangle.
 * @param {Number} [y=0] - The y position of the rounded rectangle.
 * @param {Number} [width=0] - The width value of the rounded rectangle.
 * @param {Number} [height=0] - The width value of the rounded rectangle.
 * @param {Number} [radius=0] - The radius value of the rounded rectangle.
 * @param {Number} [resolution=12] - The number of vertices used to construct the rounded rectangle.
 */
function RoundedRectangle(ox, oy, width, height, radius) {

  if (typeof radius === 'undefined' &&
    typeof width === 'number' && typeof height === 'number') {
    radius = Math.floor(Math.min(width, height) / 12);
  }

  var amount = 10;

  var points = [];
  for (var i = 0; i < amount; i++) {
    points.push(
      new Anchor(0, 0, 0, 0, 0, 0,
        i === 0 ? Commands.move : Commands.curve)
    );
  }

  // points[points.length - 1].command = Two.Commands.close;

  Path.call(this, points);

  this.closed = true;
  this.automatic = false;

  this._renderer.flagRadius = RoundedRectangle.FlagRadius.bind(this);

  /**
   * @name Two.RoundedRectangle#width
   * @property {Number} - The width of the rounded rectangle.
   */
  if (typeof width === 'number') {
    this.width = width;
  }

  /**
   * @name Two.RoundedRectangle#height
   * @property {Number} - The height of the rounded rectangle.
   */
  if (typeof height === 'number') {
    this.height = height;
  }

  /**
   * @name Two.RoundedRectangle#radius
   * @property {Number} - The size of the radius of the rounded rectangle.
   */
  if (typeof radius === 'number') {
    this.radius = radius;
  }

  this._update();
  this.translation.set(ox, oy);

}

_.extend(RoundedRectangle, {

  /**
   * @name Two.RoundedRectangle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.RoundedRectangle}.
   */
  Properties: ['width', 'height'],

  /**
   * @name Two.RoundedRectangle.FlagRadius
   * @property {Function} - A convenience function to trigger the flag for radius changing.
   */
  FlagRadius: function() {
    this._flagRadius = true;
  },

  /**
   * @name Two.RoundedRectangle.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.RoundedRectangle} to any object. Handy if you'd like to extend the {@link Two.RoundedRectangle} class on a custom class.
   */
  MakeObservable: function(object) {

    Path.MakeObservable(object);
    _.each(RoundedRectangle.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'radius', {
      enumerable: true,
      get: function() {
        return this._radius;
      },
      set: function(v) {

        if (this._radius instanceof Vector) {
          this._radius.unbind(Events.Types.change, this._renderer.flagRadius);
        }

        this._radius = v;

        if (this._radius instanceof Vector) {
          this._radius.bind(Events.Types.change, this._renderer.flagRadius);
        }

        this._flagRadius = true;

      }
    });

  }

});

_.extend(RoundedRectangle.prototype, Path.prototype, {

  constructor: RoundedRectangle,

  /**
   * @name Two.RoundedRectangle#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#width} needs updating.
   */
  _flagWidth: false,
  /**
   * @name Two.RoundedRectangle#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#height} needs updating.
   */
  _flagHeight: false,
  /**
   * @name Two.RoundedRectangle#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#radius} needs updating.
   */
  _flagRadius: false,

  /**
   * @name Two.RoundedRectangle#_width
   * @private
   * @see {@link Two.RoundedRectangle#width}
   */
  _width: 0,
  /**
   * @name Two.RoundedRectangle#_height
   * @private
   * @see {@link Two.RoundedRectangle#height}
   */
  _height: 0,
  /**
   * @name Two.RoundedRectangle#_radius
   * @private
   * @see {@link Two.RoundedRectangle#radius}
   */
  _radius: 12,

  /**
   * @name Two.RoundedRectangle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {

      var width = this._width;
      var height = this._height;

      var rx, ry;

      if (this._radius instanceof Vector) {
        rx = this._radius.x;
        ry = this._radius.y;
      } else {
        rx = this._radius;
        ry = this._radius;
      }

      var v;
      var w = width / 2;
      var h = height / 2;

      v = this.vertices[0];
      v.x = - (w - rx);
      v.y = - h;

      // Upper Right Corner

      v = this.vertices[1];
      v.x = (w - rx);
      v.y = - h;
      v.controls.left.clear();
      v.controls.right.x = rx;
      v.controls.right.y = 0;

      v = this.vertices[2];
      v.x = w;
      v.y = - (h - ry);
      v.controls.right.clear();
      v.controls.left.clear();

      // Bottom Right Corner

      v = this.vertices[3];
      v.x = w;
      v.y = (h - ry);
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = ry;

      v = this.vertices[4];
      v.x = (w - rx);
      v.y = h;
      v.controls.right.clear();
      v.controls.left.clear();

      // Bottom Left Corner

      v = this.vertices[5];
      v.x = - (w - rx);
      v.y = h;
      v.controls.left.clear();
      v.controls.right.x = - rx;
      v.controls.right.y = 0;

      v = this.vertices[6];
      v.x = - w;
      v.y = (h - ry);
      v.controls.left.clear();
      v.controls.right.clear();

      // Upper Left Corner

      v = this.vertices[7];
      v.x = - w;
      v.y = - (h - ry);
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = - ry;

      v = this.vertices[8];
      v.x = - (w - rx);
      v.y = - h;
      v.controls.left.clear();
      v.controls.right.clear();

      v = this.vertices[9];
      v.copy(this.vertices[8]);

    }

    Path.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.RoundedRectangle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = this._flagRadius = false;
    Path.prototype.flagReset.call(this);

    return this;

  },

  /**
   * @name Two.RoundedRectangle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.RoundedRectangle}
   * @description Create a new instance of {@link Two.RoundedRectangle} with the same properties of the current path.
   */
  clone: function(parent) {

    var width = this.width;
    var height = this.height;
    var radius = this.radius;

    var clone = new RoundedRectangle(0, 0, width, height, radius);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.RoundedRectangle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(RoundedRectangle.Properties, function(property) {
      object[property] = this[property];
    }, this);

    object.radius = typeof this.radius === 'number'
      ? this.radius : this.radius.toObject();

    return object;

  }

});

RoundedRectangle.MakeObservable(RoundedRectangle.prototype);

var min = Math.min, max = Math.max;

/**
 * @name Two.Text
 * @class
 * @extends Two.Shape
 * @param {String} [message] - The String to be rendered to the scene.
 * @param {Number} [x=0] - The position in the x direction for the object.
 * @param {Number} [y=0] - The position in the y direction for the object.
 * @param {Object} [styles] - An object where styles are applied. Attribute must exist in Two.Text.Properties.
 * @description This is a primitive class for creating drawable text that can be added to the scenegraph.
 * @returns {Two.Text}
 */
function Text(message, x, y, styles) {

  Shape.call(this);

  this._renderer.type = 'text';
  this._renderer.flagFill = Text.FlagFill.bind(this);
  this._renderer.flagStroke = Text.FlagStroke.bind(this);

  this.value = message;

  if (typeof x === 'number') {
    this.translation.x = x;
  }
  if (typeof y === 'number') {
    this.translation.y = y;
  }

  /**
   * @name Two.Text#dashes
   * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
   * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
   */
  this.dashes = [];

  /**
   * @name Two.Text#dashes#offset
   * @property {Number} - A number in pixels to offset {@link Two.Text#dashes} display.
   */
  this.dashes.offset = 0;

  if (!_.isObject(styles)) {
    return this;
  }

  _.each(Text.Properties, function(property) {

    if (property in styles) {
      this[property] = styles[property];
    }

  }, this);

}

_.extend(Text, {

  /**
   * @name Two.Text.Ratio
   * @property {Number} - Approximate aspect ratio of a typeface's character width to height.
   */
  Ratio: 0.6,

  /**
   * @name Two.Text.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Text}.
   */
  Properties: [
    'value', 'family', 'size', 'leading', 'alignment', 'linewidth', 'style',
    'weight', 'decoration', 'baseline', 'opacity', 'visible', 'className',
    'fill', 'stroke',
  ],

  /**
   * @name Two.Text.FlagFill
   * @function
   * @description Cached method to let renderers know the fill property have been updated on a {@link Two.Text}.
   */
  FlagFill: function() {
    this._flagFill = true;
  },

  /**
   * @name Two.Text.FlagStroke
   * @function
   * @description Cached method to let renderers know the stroke property have been updated on a {@link Two.Text}.
   */
  FlagStroke: function() {
    this._flagStroke = true;
  },

  MakeObservable: function(object) {

    Shape.MakeObservable(object);

    _.each(Text.Properties.slice(0, 12), defineGetterSetter, object);

    Object.defineProperty(object, 'fill', {
      enumerable: true,
      get: function() {
        return this._fill;
      },
      set: function(f) {

        if (this._fill instanceof Gradient
          || this._fill instanceof LinearGradient
          || this._fill instanceof RadialGradient
          || this._fill instanceof Texture) {
          this._fill.unbind(Events.Types.change, this._renderer.flagFill);
        }

        this._fill = f;
        this._flagFill = true;

        if (this._fill instanceof Gradient
          || this._fill instanceof LinearGradient
          || this._fill instanceof RadialGradient
          || this._fill instanceof Texture) {
          this._fill.bind(Events.Types.change, this._renderer.flagFill);
        }

      }
    });

    Object.defineProperty(object, 'stroke', {
      enumerable: true,
      get: function() {
        return this._stroke;
      },
      set: function(f) {

        if (this._stroke instanceof Gradient
          || this._stroke instanceof LinearGradient
          || this._stroke instanceof RadialGradient
          || this._stroke instanceof Texture) {
          this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
        }

        this._stroke = f;
        this._flagStroke = true;

        if (this._stroke instanceof Gradient
          || this._stroke instanceof LinearGradient
          || this._stroke instanceof RadialGradient
          || this._stroke instanceof Texture) {
          this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
        }

      }
    });

    Object.defineProperty(object, 'mask', {

      enumerable: true,

      get: function() {
        return this._mask;
      },

      set: function(v) {
        this._mask = v;
        this._flagMask = true;
        if (!v.clip) {
          v.clip = true;
        }
      }

    });

    Object.defineProperty(object, 'clip', {
      enumerable: true,
      get: function() {
        return this._clip;
      },
      set: function(v) {
        this._clip = v;
        this._flagClip = true;
      }
    });

    Object.defineProperty(object, 'dashes', {
      enumerable: true,
      get: function() {
        return this._dashes;
      },
      set: function(v) {
        if (typeof v.offset !== 'number') {
          v.offset = this._dashes.offset || 0;
        }
        this._dashes = v;
      }
    });

  }

});

_.extend(Text.prototype, Shape.prototype, {

  constructor: Text,

  // Flags
  // http://en.wikipedia.org/wiki/Flag

  /**
   * @name Two.Text#_flagValue
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#value} need updating.
   */
  _flagValue: true,

  /**
   * @name Two.Text#_flagFamily
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#family} need updating.
   */
  _flagFamily: true,

  /**
   * @name Two.Text#_flagSize
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#size} need updating.
   */
  _flagSize: true,

  /**
   * @name Two.Text#_flagLeading
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#leading} need updating.
   */
  _flagLeading: true,

  /**
   * @name Two.Text#_flagAlignment
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#alignment} need updating.
   */
  _flagAlignment: true,

  /**
   * @name Two.Text#_flagBaseline
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#baseline} need updating.
   */
  _flagBaseline: true,

  /**
   * @name Two.Text#_flagStyle
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#style} need updating.
   */
  _flagStyle: true,

  /**
   * @name Two.Text#_flagWeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#weight} need updating.
   */
  _flagWeight: true,

  /**
   * @name Two.Text#_flagDecoration
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#decoration} need updating.
   */
  _flagDecoration: true,

  /**
   * @name Two.Text#_flagFill
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#fill} need updating.
   */
  _flagFill: true,

  /**
   * @name Two.Text#_flagStroke
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#stroke} need updating.
   */
  _flagStroke: true,

  /**
   * @name Two.Text#_flagLinewidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#linewidth} need updating.
   */
  _flagLinewidth: true,

  /**
   * @name Two.Text#_flagOpacity
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#opacity} need updating.
   */
  _flagOpacity: true,

  /**
   * @name Two.Text#_flagClassName
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#className} need updating.
   */
  _flagClassName: true,

  /**
   * @name Two.Text#_flagVisible
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#visible} need updating.
   */
  _flagVisible: true,

  /**
   * @name Two.Path#_flagMask
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#mask} needs updating.
   */
  _flagMask: false,

  /**
   * @name Two.Text#_flagClip
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#clip} need updating.
   */
  _flagClip: false,

  // Underlying Properties

  /**
   * @name Two.Text#value
   * @property {String} - The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.
   */
  _value: '',

  /**
   * @name Two.Text#family
   * @property {String} - The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.
   */
  _family: 'sans-serif',

  /**
   * @name Two.Text#size
   * @property {Number} - The font size in Two.js point space. Defaults to `13`.
   */
  _size: 13,

  /**
   * @name Two.Text#leading
   * @property {Number} - The height between lines measured from base to base in Two.js point space. Defaults to `17`.
   */
  _leading: 17,

  /**
   * @name Two.Text#alignment
   * @property {String} - Alignment of text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.
   */
  _alignment: 'center',

  /**
   * @name Two.Text#baseline
   * @property {String} - The vertical aligment of the text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.
   */
  _baseline: 'middle',

  /**
   * @name Two.Text#style
   * @property {String} - The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.
   */
  _style: 'normal',

  /**
   * @name Two.Text#weight
   * @property {Number} - A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.
   */
  _weight: 500,

  /**
   * @name Two.Text#decoration
   * @property {String} - String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.
   */
  _decoration: 'none',

  /**
   * @name Two.Text#fill
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _fill: '#000',

  /**
   * @name Two.Text#stroke
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _stroke: 'transparent',

  /**
   * @name Two.Text#linewidth
   * @property {Number} - The thickness in pixels of the stroke.
   */
  _linewidth: 1,

  /**
   * @name Two.Text#opacity
   * @property {Number} - The opaqueness of the text object.
   * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
   */
  _opacity: 1,

  /**
   * @name Two.Text#className
   * @property {String} - A class to be applied to the element to be compatible with CSS styling. Only available for the {@link Two.SvgRenderer}.
   */
  _className: '',

  /**
   * @name Two.Text#visible
   * @property {Boolean} - Display the text object or not.
   * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
   */
  _visible: true,

  /**
   * @name Two.Text#mask
   * @property {Two.Shape} - The shape whose alpha property becomes a clipping area for the text.
   * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
   */
  _mask: null,

  /**
   * @name Two.Text#clip
   * @property {Two.Shape} - Object to define clipping area.
   * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
   */
  _clip: false,

  /**
   * @name Two.Text#_dashes
   * @private
   * @see {@link Two.Text#dashes}
   */
  _dashes: [],

  /**
   * @name Two.Text#remove
   * @function
   * @description Remove self from the scene / parent.
   */
  remove: function() {

    if (!this.parent) {
      return this;
    }

    this.parent.remove(this);

    return this;

  },

  /**
   * @name Two.Text#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Text}
   * @description Create a new instance of {@link Two.Text} with the same properties of the current text object.
   */
  clone: function(parent) {

    var clone = new Text(this.value);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;

    _.each(Text.Properties, function(property) {
      clone[property] = this[property];
    }, this);

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();

  },

  /**
   * @name Two.Text#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the text object.
   */
  toObject: function() {

    var result = {
      translation: this.translation.toObject(),
      rotation: this.rotation,
      scale: this.scale
    };

    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }

    _.each(Text.Properties, function(property) {
      result[property] = this[property];
    }, this);

    return result;

  },

  /**
   * @name Two.Text#noFill
   * @function
   * @description Short hand method to set fill to `transparent`.
   */
  noFill: function() {
    this.fill = 'transparent';
    return this;
  },

  /**
   * @name Two.Text#noStroke
   * @function
   * @description Short hand method to set stroke to `transparent`.
   */
  noStroke: function() {
    this.stroke = undefined;
    this.linewidth = undefined;
    return this;
  },

  // A shim to not break `getBoundingClientRect` calls.
  // TODO: Implement a way to calculate proper bounding
  // boxes of `Two.Text`.

  /**
   * @name Two.Text#getBoundingClientRect
   * @function
   * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
   * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
   * @description Return an object with top, left, right, bottom, width, and height parameters of the text object.
   */
  getBoundingClientRect: function(shallow) {

    var matrix, a, b, c, d;
    var left, right, top, bottom;

    // TODO: Update this to not __always__ update. Just when it needs to.
    this._update(true);

    matrix = shallow ? this._matrix : getComputedMatrix(this);

    var height = this.leading;
    var width = this.value.length * this.size * Text.Ratio;
    var border = (this._linewidth || 0) / 2;

    switch (this.alignment) {
      case 'left':
        left = - border;
        right = width + border;
        break;
      case 'right':
        left = - (width + border);
        right = border;
        break;
      default:
        left = - (width / 2 + border);
        right = width / 2 + border;
    }

    switch (this.baseline) {
      case 'top':
        top = - border;
        bottom = height + border;
        break;
      case 'bottom':
        top = - (height + border);
        bottom = border;
        break;
      default:
        top = - (height / 2 + border);
        bottom = height / 2 + border;
    }

    a = matrix.multiply(left, top, 1);
    b = matrix.multiply(left, bottom, 1);
    c = matrix.multiply(right, top, 1);
    d = matrix.multiply(right, bottom, 1);

    top = min(a.y, b.y, c.y, d.y);
    left = min(a.x, b.x, c.x, d.x);
    right = max(a.x, b.x, c.x, d.x);
    bottom = max(a.y, b.y, c.y, d.y);

    return {
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      width: right - left,
      height: bottom - top
    };

  },

  /**
   * @name Two.Text#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagValue = this._flagFamily = this._flagSize =
      this._flagLeading = this._flagAlignment = this._flagFill =
      this._flagStroke = this._flagLinewidth = this._flagOpacity =
      this._flagVisible = this._flagClip = this._flagDecoration =
      this._flagClassName = this._flagBaseline = this._flagWeight =
        this._flagStyle = false;

    Shape.prototype.flagReset.call(this);

    return this;

  }

});

Text.MakeObservable(Text.prototype);

// https://github.com/jonobr1/two.js/issues/507#issuecomment-777159213
var regex = {
  path: /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]\d+)?/g
};

var alignments = {
  start: 'left',
  middle: 'center',
  end: 'right'
};

/**
 * @name Two.Utils.getAlignment
 * @function
 * @param {AlignmentString}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor}
 */
var getAlignment = function(anchor) {
  return alignments[anchor];
};

var getBaseline = function(node) {
  var a = node.getAttribute('dominant-baseline');
  var b = node.getAttribute('alignment-baseline');
  return a || b;
};

var getTagName = function(tag) {
  return tag.replace(/svg:/ig, '').toLowerCase();
};

var applyTransformsToVector = function(transforms, vector) {

  vector.x += transforms.translateX;
  vector.y += transforms.translateY;

  vector.x *= transforms.scaleX;
  vector.y *= transforms.scaleY;

  if (transforms.rotation !== 0) {
    // TODO: Test further
    var l = vector.length();
    vector.x = l * Math.cos(transforms.rotation);
    vector.y = l * Math.sin(transforms.rotation);
  }

};

/**
 * @name Two.Utils.extractCSSText
 * @function
 * @param {String} text - The CSS text body to be parsed and extracted.
 * @param {Object} [styles] - The styles object to apply CSS key values to.
 * @returns {Object} styles
 * @description Parse CSS text body and apply them as key value pairs to a JavaScript object.
 */
var extractCSSText = function(text, styles) {

  var commands, command, name, value;

  if (!styles) {
    styles = {};
  }

  commands = text.split(';');

  for (var i = 0; i < commands.length; i++) {
    command = commands[i].split(':');
    name = command[0];
    value = command[1];
    if (typeof name === 'undefined' || typeof value === 'undefined') {
      continue;
    }
    styles[name] = value.replace(/\s/, '');
  }

  return styles;

};

/**
 * @name Two.Utils.getSvgStyles
 * @function
 * @param {SVGElement} node - The SVG node to parse.
 * @returns {Object} styles
 * @description Get the CSS comands from the `style` attribute of an SVG node and apply them as key value pairs to a JavaScript object.
 */
var getSvgStyles = function(node) {

  var styles = {};
  var attributes = getSvgAttributes(node);
  var length = Math.max(attributes.length, node.style.length);

  for (var i = 0; i < length; i++) {

    var command = node.style[i];
    var attribute = attributes[i];

    if (command) {
      styles[command] = node.style[command];
    }
    if (attribute) {
      styles[attribute] = node.getAttribute(attribute);
    }

  }

  return styles;

};

var getSvgAttributes = function(node) {

  var attributes = node.getAttributeNames();

  // Reserved attributes to remove
  var keywords = ['id', 'class', 'transform', 'xmlns', 'viewBox'];

  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    var index = Array.prototype.indexOf.call(attributes, keyword);
    if (index >= 0) {
      attributes.splice(index, 1);
    }
  }

  return attributes;

};

/**
 * @name Two.Utils.applySvgViewBox
 * @function
 * @param {Two.Shape} node - The Two.js object to apply viewbox matrix to
 * @param {String} value - The viewBox value from the SVG attribute
 * @returns {Two.Shape} node
 * @description Applies the transform of the SVG Viewbox on a given node.
 */
var applySvgViewBox = function(node, value) {

  var elements = value.split(/\s/);

  var x = parseFloat(elements[0]);
  var y = parseFloat(elements[1]);
  var width = parseFloat(elements[2]);
  var height = parseFloat(elements[3]);

  var s = Math.min(this.width / width, this.height / height);

  node.translation.x -= x * s;
  node.translation.y -= y * s;
  node.scale = s;

  return node;

};

/**
 * @name Two.Utils.applySvgAttributes
 * @function
 * @param {SVGElement} node - An SVG Node to extrapolate attributes from.
 * @param {Two.Shape} elem - The Two.js object to apply extrapolated attributes to.
 * @returns {Two.Shape} The Two.js object passed now with applied attributes.
 * @description This function iterates through an SVG Node's properties and stores ones of interest. It tries to resolve styles applied via CSS as well.
 * @TODO Reverse calculate {@link Two.Gradient}s for fill / stroke of any given path.
 */
var applySvgAttributes = function(node, elem, parentStyles) {

  var styles = {}, attributes = {}, extracted = {}, i, m, key, value, attr;
  var transforms, x, y;
  var id, scene, ref, tagName;

  // Not available in non browser environments
  if (root$1.getComputedStyle) {
    // Convert CSSStyleDeclaration to a normal object
    var computedStyles = root$1.getComputedStyle(node);
    i = computedStyles.length;

    while (i--) {
      key = computedStyles[i];
      value = computedStyles[key];
      // Gecko returns undefined for unset properties
      // Webkit returns the default value
      if (typeof value !== 'undefined') {
        styles[key] = value;
      }
    }
  }

  // Convert NodeMap to a normal object
  for (i = 0; i < node.attributes.length; i++) {
    attr = node.attributes[i];
    if (/style/i.test(attr.nodeName)) {
      extractCSSText(attr.value, extracted);
    } else {
      attributes[attr.nodeName] = attr.value;
    }
  }

  // Getting the correct opacity is a bit tricky, since SVG path elements don't
  // support opacity as an attribute, but you can apply it via CSS.
  // So we take the opacity and set (stroke/fill)-opacity to the same value.
  if (typeof styles.opacity !== 'undefined') {
    styles['stroke-opacity'] = styles.opacity;
    styles['fill-opacity'] = styles.opacity;
    delete styles.opacity;
  }

  // Merge attributes and applied styles (attributes take precedence)
  if (parentStyles) {
    _.defaults(styles, parentStyles);
  }
  _.extend(styles, extracted, attributes);

  // Similarly visibility is influenced by the value of both display and visibility.
  // Calculate a unified value here which defaults to `true`.
  styles.visible = !(typeof styles.display === 'undefined' && /none/i.test(styles.display))
    || (typeof styles.visibility === 'undefined' && /hidden/i.test(styles.visibility));

  // Now iterate the whole thing
  for (key in styles) {
    value = styles[key];

    switch (key) {
      case 'gradientTransform':
        // TODO: Check this out https://github.com/paperjs/paper.js/blob/develop/src/svg/SvgImport.js#L315
        if (/none/i.test(value)) break;
        m = (node.gradientTransform && node.gradientTransform.baseVal && node.gradientTransform.baseVal.length > 0)
          ? node.gradientTransform.baseVal[0].matrix
          : (node.getCTM ? node.getCTM() : null);

        if (m === null) break;

        transforms = decomposeMatrix(m);

        switch (elem._renderer.type) {
          case 'linear-gradient':
            applyTransformsToVector(transforms, elem.left);
            applyTransformsToVector(transforms, elem.right);
            break;
          case 'radial-gradient':
            elem.center.x += transforms.translateX;
            elem.center.y += transforms.translateY;

            elem.focal.x += transforms.translateX;
            elem.focal.y += transforms.translateY;

            elem.radius *= Math.max(transforms.scaleX, transforms.scaleY);
            break;
        }

        break;
      case 'transform':
        // TODO: Check this out https://github.com/paperjs/paper.js/blob/develop/src/svg/SvgImport.js#L315
        if (/none/i.test(value)) break;
        m = (node.transform && node.transform.baseVal && node.transform.baseVal.length > 0)
          ? node.transform.baseVal[0].matrix
          : (node.getCTM ? node.getCTM() : null);

        // Might happen when transform string is empty or not valid.
        if (m === null) break;

        if (Constants.AutoCalculateImportedMatrices) {

          // Decompose and infer Two.js related properties.
          transforms = decomposeMatrix(m);

          elem.translation.set(transforms.translateX, transforms.translateY);
          elem.rotation = Math.PI * (transforms.rotation / 180);
          elem.scale = new Vector(transforms.scaleX, transforms.scaleY);

          x = parseFloat((styles.x + '').replace('px'));
          y = parseFloat((styles.y + '').replace('px'));

          // Override based on attributes.
          if (x) {
            elem.translation.x = x;
          }

          if (y) {
            elem.translation.y = y;
          }

        } else {

          // Edit the underlying matrix and don't force an auto calc.
          m = node.getCTM();
          elem._matrix.manual = true;
          elem._matrix.set(m.a, m.b, m.c, m.d, m.e, m.f);

        }

        break;
      case 'viewBox':
        applySvgViewBox.call(this, elem, value);
        break;
      case 'visible':
        if (elem instanceof Group) {
          elem._visible = value;
          break;
        }
        elem.visible = value;
        break;
      case 'stroke-linecap':
        if (elem instanceof Group) {
          elem._cap = value;
          break;
        }
        elem.cap = value;
        break;
      case 'stroke-linejoin':
        if (elem instanceof Group) {
          elem._join = value;
          break;
        }
        elem.join = value;
        break;
      case 'stroke-miterlimit':
        if (elem instanceof Group) {
          elem._miter = value;
          break;
        }
        elem.miter = value;
        break;
      case 'stroke-width':
        if (elem instanceof Group) {
          elem._linewidth = parseFloat(value);
          break;
        }
        elem.linewidth = parseFloat(value);
        break;
      case 'opacity':
      case 'stroke-opacity':
      case 'fill-opacity':
        // Only apply styles to rendered shapes
        // in the scene.
        if (elem instanceof Group) {
          elem._opacity = parseFloat(value);
          break;
        }
        elem.opacity = parseFloat(value);
        break;
      case 'clip-path':
        if (/url\(#.*\)/i.test(value)) {
          id = value.replace(/url\(#(.*)\)/i, '$1');
          if (read.defs.current && read.defs.current.contains(id)) {
            ref = read.defs.current.get(id);
            if (ref && ref.childNodes.length > 0) {
              ref = ref.childNodes[0];
              tagName = getTagName(ref.nodeName);
              elem.mask = read[tagName].call(this, ref, {});
              switch (elem._renderer.type) {
                case 'text':
                case 'path':
                  // The matrix here needs to change to insure that the object
                  // clipping is in the same coordinate space as the `elem`.
                  elem.position.add(elem.mask.position);
                  elem.mask.position.clear();
                  break;
              }
            }
          }
        }
        break;
      case 'fill':
      case 'stroke':
        if (elem instanceof Group) {
          key = '_' + key;
        }
        if (/url\(#.*\)/i.test(value)) {
          id = value.replace(/url\(#(.*)\)/i, '$1');
          if (read.defs.current && read.defs.current.contains(id)) {
            ref = read.defs.current.get(id);
            tagName = getTagName(ref.nodeName);
            ref = read[tagName].call(this, ref, {});
          } else {
            scene = getScene(this);
            ref = scene.getById(id);
          }
          elem[key] = ref;
        } else {
          elem[key] = (/none/i.test(value)) ? 'transparent' : value;
        }
        break;
      case 'id':
        elem.id = value;
        // Overwritten id for non-conflicts on same page SVG documents
        // TODO: Make this non-descructive
        node.id = value + '-' + Constants.Identifier + 'applied';
        break;
      case 'class':
      case 'className':
        elem.classList = value.split(' ');
        break;
      case 'x':
      case 'y':
        var ca = elem instanceof Gradient;
        var cb = elem instanceof LinearGradient;
        var cc = elem instanceof RadialGradient;
        if (ca || cb || cc) {
          break;
        }
        if (value.match('[a-z%]$') && !value.endsWith('px')) {
          var error = new TwoError(
            'only pixel values are supported with the ' + key + ' attribute.');
          console.warn(error.name, error.message);
        }
        elem.translation[key] = parseFloat(value);
        break;
      case 'font-family':
        if (elem instanceof Text) {
          elem.family = value;
        }
        break;
      case 'font-size':
        if (elem instanceof Text) {
          elem.size = value;
        }
        break;
      case 'font-weight':
        if (elem instanceof Text) {
          elem.weight = value;
        }
        break;
      case 'font-style':
        if (elem instanceof Text) {
          elem.style = value;
        }
        break;
      case 'text-decoration':
        if (elem instanceof Text) {
          elem.decoration = value;
        }
        break;
      case 'line-height':
        if (elem instanceof Text) {
          elem.leading = value;
        }
        break;
    }
  }

  return styles;

};

/**
 * @name Two.Utils.updateDefsCache
 * @function
 * @param {SVGElement} node - The SVG Node with which to update the defs cache.
 * @param {Object} Object - The defs cache to be updated.
 * @description Update the cache of children of <defs /> tags.
 */
var updateDefsCache = function(node, defsCache) {
  for (var i = 0, l = node.childNodes.length; i < l; i++) {
    var n = node.childNodes[i];
    if (!n.id) continue;

    var tagName = getTagName(node.nodeName);
    if (tagName === '#text') continue;

    defsCache.add(n.id, n);
  }
};

/**
 * @name Two.Utils.getScene
 * @param {Two.Shape} node - The currently available object in the scenegraph.
 * @returns {Group} - The highest order {@link Two.Group} in the scenegraph.
 * @property {Function}
 */
var getScene = function(node) {

  while (node.parent) {
    node = node.parent;
  }

  return node.scene;

};

/**
 * @name Two.Utils.read
 * @property {Object} read - A map of functions to read any number of SVG node types and create Two.js equivalents of them. Primarily used by the {@link Two#interpret} method.
 */
var read = {

  svg: function(node) {

    var defs = read.defs.current = new Registry();
    var elements = node.getElementsByTagName('defs');

    for (var i = 0; i < elements.length; i++) {
      updateDefsCache(elements[i], defs);
    }

    var svg = read.g.call(this, node);
    // var viewBox = node.getAttribute('viewBox');

    svg.defs = defs;  // Export out the <defs /> for later use
    // Utils.applySvgViewBox(svg, viewBox);

    delete read.defs.current;

    return svg;

  },

  defs: function(node) {
    return null;
  },

  use: function(node, styles) {

    var error;
    var href = node.getAttribute('href') || node.getAttribute('xlink:href');
    if (!href) {
      error = new TwoError('encountered <use /> with no href.');
      console.warn(error.name, error.message);
      return null;
    }

    var id = href.slice(1);
    if (!read.defs.current.contains(id)) {
      error = new TwoError(
        'unable to find element for reference ' + href + '.');
      console.warn(error.name, error.message);
      return null;
    }

    var template = read.defs.current.get(id);
    var fullNode = template.cloneNode(true);
    var overwriteAttrs = ['x', 'y', 'width', 'height', 'href', 'xlink:href'];

    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      var ca = overwriteAttrs.includes(attr.nodeName);
      var cb = !fullNode.hasAttribute(attr.nodeName);
      if (ca || cb) {
        fullNode.setAttribute(attr.nodeName, attr.value);
      }
    }

    var tagName = getTagName(fullNode.nodeName);
    return read[tagName].call(this, fullNode, styles);

  },

  g: function(node, parentStyles) {

    var styles;
    var group = new Group();

    applySvgAttributes.call(this, node, group, parentStyles);

    this.add(group);

    // Switched up order to inherit more specific styles
    styles = getSvgStyles.call(this, node);

    for (var i = 0, l = node.childNodes.length; i < l; i++) {
      var n = node.childNodes[i];
      var tag = n.nodeName;
      if (!tag) return;

      var tagName = getTagName(tag);

      if (tagName in read) {
        var o = read[tagName].call(group, n, styles);
        if (!!o && !o.parent) {
          group.add(o);
        }
      }
    }

    return group;

  },

  polygon: function(node, parentStyles) {

    var points = node.getAttribute('points');

    var verts = [];
    points.replace(/(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g, function(match, p1, p2) {
      verts.push(new Anchor(parseFloat(p1), parseFloat(p2)));
    });

    var poly = new Path(verts, true).noStroke();
    poly.fill = 'black';

    applySvgAttributes.call(this, node, poly, parentStyles);

    return poly;

  },

  polyline: function(node, parentStyles) {
    var poly = read.polygon.call(this, node, parentStyles);
    poly.closed = false;
    return poly;
  },

  path: function(node, parentStyles) {

    var path = node.getAttribute('d');
    var points = [];
    var closed = false, relative = false;

    if (path) {

      // Create a Two.Path from the paths.

      var coord = new Anchor();
      var control, coords;
      var commands = path.match(/[a-df-z][^a-df-z]*/ig);
      var last = commands.length - 1;

      // Split up polybeziers

      _.each(commands.slice(0), function(command, i) {

        var items = command.slice(1).trim().match(regex.path);
        var type = command[0];
        var lower = type.toLowerCase();
        var bin, j, l, ct, times, result = [];

        if (i === 0) {
          commands = [];
        }

        switch (lower) {
          case 'h':
          case 'v':
            if (items.length > 1) {
              bin = 1;
            }
            break;
          case 'm':
          case 'l':
          case 't':
            if (items.length > 2) {
              bin = 2;
            }
            break;
          case 's':
          case 'q':
            if (items.length > 4) {
              bin = 4;
            }
            break;
          case 'c':
            if (items.length > 6) {
              bin = 6;
            }
            break;
          case 'a':
            if (items.length > 7) {
              bin = 7;
            }
            break;
        }

        // This means we have a polybezier.
        if (bin) {

          for (j = 0, l = items.length, times = 0; j < l; j+=bin) {

            ct = type;
            if (times > 0) {

              switch (type) {
                case 'm':
                  ct = 'l';
                  break;
                case 'M':
                  ct = 'L';
                  break;
              }

            }

            result.push(ct + items.slice(j, j + bin).join(' '));
            times++;

          }

          commands = Array.prototype.concat.apply(commands, result);

        } else {

          commands.push(command);

        }

      });

      // Create the vertices for our Two.Path

      _.each(commands, function(command, i) {

        var result, x, y;
        var type = command[0];
        var lower = type.toLowerCase();

        coords = command.slice(1).trim().match(regex.path);
        relative = type === lower;

        var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

        switch (lower) {

          case 'z':
            if (i >= last) {
              closed = true;
            } else {
              x = coord.x;
              y = coord.y;
              result = new Anchor(
                x, y,
                undefined, undefined,
                undefined, undefined,
                Commands.close
              );
              // Make coord be the last `m` command
              for (var j = points.length - 1; j >= 0; j--) {
                var point = points[j];
                if (/m/i.test(point.command)) {
                  coord = point;
                  break;
                }
              }
            }
            break;

          case 'm':
          case 'l':

            control = undefined;

            x = parseFloat(coords[0]);
            y = parseFloat(coords[1]);

            result = new Anchor(
              x, y,
              undefined, undefined,
              undefined, undefined,
              /m/i.test(lower) ? Commands.move : Commands.line
            );

            if (relative) {
              result.addSelf(coord);
            }

            // result.controls.left.copy(result);
            // result.controls.right.copy(result);

            coord = result;
            break;

          case 'h':
          case 'v':

            var a = /h/i.test(lower) ? 'x' : 'y';
            var b = /x/i.test(a) ? 'y' : 'x';

            result = new Anchor(
              undefined, undefined,
              undefined, undefined,
              undefined, undefined,
              Commands.line
            );
            result[a] = parseFloat(coords[0]);
            result[b] = coord[b];

            if (relative) {
              result[a] += coord[a];
            }

            // result.controls.left.copy(result);
            // result.controls.right.copy(result);

            coord = result;
            break;

          case 'c':
          case 's':

            x1 = coord.x;
            y1 = coord.y;

            if (!control) {
              control = new Vector();//.copy(coord);
            }

            if (/c/i.test(lower)) {

              x2 = parseFloat(coords[0]);
              y2 = parseFloat(coords[1]);
              x3 = parseFloat(coords[2]);
              y3 = parseFloat(coords[3]);
              x4 = parseFloat(coords[4]);
              y4 = parseFloat(coords[5]);

            } else {

              // Calculate reflection control point for proper x2, y2
              // inclusion.

              reflection = getReflection(coord, control, relative);

              x2 = reflection.x;
              y2 = reflection.y;
              x3 = parseFloat(coords[0]);
              y3 = parseFloat(coords[1]);
              x4 = parseFloat(coords[2]);
              y4 = parseFloat(coords[3]);

            }

            if (relative) {
              x2 += x1;
              y2 += y1;
              x3 += x1;
              y3 += y1;
              x4 += x1;
              y4 += y1;
            }

            if (!_.isObject(coord.controls)) {
              Anchor.AppendCurveProperties(coord);
            }

            coord.controls.right.set(x2 - coord.x, y2 - coord.y);
            result = new Anchor(
              x4, y4,
              x3 - x4, y3 - y4,
              undefined, undefined,
              Commands.curve
            );

            coord = result;
            control = result.controls.left;

            break;

          case 't':
          case 'q':

            x1 = coord.x;
            y1 = coord.y;

            if (!control) {
              control = new Vector();
            }

            if (/q/i.test(lower)) {

              x2 = parseFloat(coords[0]);
              y2 = parseFloat(coords[1]);
              x3 = parseFloat(coords[0]);
              y3 = parseFloat(coords[1]);
              x4 = parseFloat(coords[2]);
              y4 = parseFloat(coords[3]);

            } else {

              reflection = getReflection(coord, control, relative);

              x2 = reflection.x;
              y2 = reflection.y;
              x3 = reflection.x;
              y3 = reflection.y;
              x4 = parseFloat(coords[0]);
              y4 = parseFloat(coords[1]);

            }

            if (relative) {
              x2 += x1;
              y2 += y1;
              x3 += x1;
              y3 += y1;
              x4 += x1;
              y4 += y1;
            }

            if (!_.isObject(coord.controls)) {
              Anchor.AppendCurveProperties(coord);
            }

            coord.controls.right.set(
              (x2 - coord.x) * 0.33, (y2 - coord.y) * 0.33);
            result = new Anchor(
              x4, y4,
              x3 - x4, y3 - y4,
              undefined, undefined,
              Commands.curve
            );

            coord = result;
            control = result.controls.left;

            break;

          case 'a':

            x1 = coord.x;
            y1 = coord.y;

            var rx = parseFloat(coords[0]);
            var ry = parseFloat(coords[1]);
            var xAxisRotation = parseFloat(coords[2]);// * PI / 180;
            var largeArcFlag = parseFloat(coords[3]);
            var sweepFlag = parseFloat(coords[4]);

            x4 = parseFloat(coords[5]);
            y4 = parseFloat(coords[6]);

            if (relative) {
              x4 += x1;
              y4 += y1;
            }

            var anchor = new Anchor(x4, y4);
            anchor.command = Commands.arc;
            anchor.rx = rx;
            anchor.ry = ry;
            anchor.xAxisRotation = xAxisRotation;
            anchor.largeArcFlag = largeArcFlag;
            anchor.sweepFlag = sweepFlag;

            result = anchor;

            coord = anchor;
            control = undefined;

            break;

        }

        if (result) {
          if (Array.isArray(result)) {
            points = points.concat(result);
          } else {
            points.push(result);
          }
        }

      });

    }

    path = new Path(points, closed, undefined, true).noStroke();
    path.fill = 'black';

    var rect = path.getBoundingClientRect(true);

    // Center objects to stay consistent
    // with the rest of the Two.js API.
    rect.centroid = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    _.each(path.vertices, function(v) {
      v.subSelf(rect.centroid);
    });

    applySvgAttributes.call(this, node, path, parentStyles);

    path.translation.addSelf(rect.centroid);

    return path;

  },

  circle: function(node, parentStyles) {

    var x = parseFloat(node.getAttribute('cx'));
    var y = parseFloat(node.getAttribute('cy'));
    var r = parseFloat(node.getAttribute('r'));

    var circle = new Circle(0, 0, r).noStroke();
    circle.fill = 'black';

    applySvgAttributes.call(this, node, circle, parentStyles);

    circle.translation.x = x;
    circle.translation.y = y;

    return circle;

  },

  ellipse: function(node, parentStyles) {

    var x = parseFloat(node.getAttribute('cx'));
    var y = parseFloat(node.getAttribute('cy'));
    var width = parseFloat(node.getAttribute('rx'));
    var height = parseFloat(node.getAttribute('ry'));

    var ellipse = new Ellipse(0, 0, width, height).noStroke();
    ellipse.fill = 'black';

    applySvgAttributes.call(this, node, ellipse, parentStyles);

    ellipse.translation.x = x;
    ellipse.translation.y = y;

    return ellipse;

  },

  rect: function(node, parentStyles) {

    var rx = parseFloat(node.getAttribute('rx'));
    var ry = parseFloat(node.getAttribute('ry'));

    if (!_.isNaN(rx) || !_.isNaN(ry)) {
      return read['rounded-rect'](node);
    }

    var width = parseFloat(node.getAttribute('width'));
    var height = parseFloat(node.getAttribute('height'));

    var w2 = width / 2;
    var h2 = height / 2;

    var rect = new Rectangle(0, 0, width, height)
      .noStroke();
    rect.fill = 'black';

    applySvgAttributes.call(this, node, rect, parentStyles);

    // For rectangles, (x, y) is the center of the shape rather than the top
    // left corner.
    rect.translation.x += w2;
    rect.translation.y += h2;

    return rect;

  },

  'rounded-rect': function(node, parentStyles) {

    var rx = parseFloat(node.getAttribute('rx')) || 0;
    var ry = parseFloat(node.getAttribute('ry')) || 0;

    var width = parseFloat(node.getAttribute('width'));
    var height = parseFloat(node.getAttribute('height'));

    var w2 = width / 2;
    var h2 = height / 2;
    var radius = new Vector(rx, ry);

    var rect = new RoundedRectangle(0, 0, width, height, radius)
      .noStroke();
    rect.fill = 'black';

    applySvgAttributes.call(this, node, rect, parentStyles);

    // For rectangles, (x, y) is the center of the shape rather than the top
    // left corner.
    rect.translation.x += w2;
    rect.translation.y += h2;

    return rect;

  },

  line: function(node, parentStyles) {

    var x1 = parseFloat(node.getAttribute('x1'));
    var y1 = parseFloat(node.getAttribute('y1'));
    var x2 = parseFloat(node.getAttribute('x2'));
    var y2 = parseFloat(node.getAttribute('y2'));

    var line = new Line(x1, y1, x2, y2).noFill();

    applySvgAttributes.call(this, node, line, parentStyles);

    return line;

  },

  lineargradient: function(node, parentStyles) {

    var x1 = parseFloat(node.getAttribute('x1'));
    var y1 = parseFloat(node.getAttribute('y1'));
    var x2 = parseFloat(node.getAttribute('x2'));
    var y2 = parseFloat(node.getAttribute('y2'));

    var ox = (x2 + x1) / 2;
    var oy = (y2 + y1) / 2;

    var stops = [];
    for (var i = 0; i < node.children.length; i++) {

      var child = node.children[i];

      var offset = child.getAttribute('offset');
      if (/%/ig.test(offset)) {
        offset = parseFloat(offset.replace(/%/ig, '')) / 100;
      }
      offset = parseFloat(offset);

      var color = child.getAttribute('stop-color');
      var opacity = child.getAttribute('stop-opacity');
      var style = child.getAttribute('style');

      var matches;
      if (color === null) {
        matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
        color = matches && matches.length > 1 ? matches[1] : undefined;
      }

      if (opacity === null) {
        matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
        opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
      } else {
        opacity = parseFloat(opacity);
      }

      stops.push(new Stop(offset, color, opacity));

    }

    var gradient = new LinearGradient(x1 - ox, y1 - oy, x2 - ox,
      y2 - oy, stops);

    applySvgAttributes.call(this, node, gradient, parentStyles);

    return gradient;

  },

  radialgradient: function(node, parentStyles) {

    var cx = parseFloat(node.getAttribute('cx')) || 0;
    var cy = parseFloat(node.getAttribute('cy')) || 0;
    var r = parseFloat(node.getAttribute('r'));

    var fx = parseFloat(node.getAttribute('fx'));
    var fy = parseFloat(node.getAttribute('fy'));

    if (_.isNaN(fx)) {
      fx = cx;
    }

    if (_.isNaN(fy)) {
      fy = cy;
    }

    var ox = Math.abs(cx + fx) / 2;
    var oy = Math.abs(cy + fy) / 2;

    var stops = [];
    for (var i = 0; i < node.children.length; i++) {

      var child = node.children[i];

      var offset = child.getAttribute('offset');
      if (/%/ig.test(offset)) {
        offset = parseFloat(offset.replace(/%/ig, '')) / 100;
      }
      offset = parseFloat(offset);

      var color = child.getAttribute('stop-color');
      var opacity = child.getAttribute('stop-opacity');
      var style = child.getAttribute('style');

      var matches;
      if (color === null) {
        matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
        color = matches && matches.length > 1 ? matches[1] : undefined;
      }

      if (opacity === null) {
        matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
        opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
      } else {
        opacity = parseFloat(opacity);
      }

      stops.push(new Stop(offset, color, opacity));

    }

    var gradient = new RadialGradient(cx - ox, cy - oy, r,
      stops, fx - ox, fy - oy);

    applySvgAttributes.call(this, node, gradient, parentStyles);

    return gradient;

  },

  text: function(node, parentStyles) {

    var alignment = getAlignment(node.getAttribute('text-anchor')) || 'left';
    var baseline = getBaseline(node) || 'baseline';
    var message = node.textContent;

    var text = new Text(message);

    applySvgAttributes.call(this, node, text, parentStyles);

    text.alignment = alignment;
    text.baseline = baseline;

    return text;

  },

  clippath: function(node, parentStyles) {
    if (read.defs.current && !read.defs.current.contains(node.id)) {
      read.defs.current.add(node.id, node);
    }
    return null;
  },

  image: function(node, parentStyles) {

    var href = node.getAttribute('href') || node.getAttribute('xlink:href');
    if (!href) {
      var error = new TwoError('encountered <image /> with no href.');
      console.warn(error.name, error.message);
      return null;
    }

    var x = parseFloat(node.getAttribute('x')) || 0;
    var y = parseFloat(node.getAttribute('y')) || 0;
    var width = parseFloat(node.getAttribute('width'));
    var height = parseFloat(node.getAttribute('height'));

    var sprite = new Sprite(href, x, y);

    if (!_.isNaN(width)) {
      sprite.width = width;
    }
    if (!_.isNaN(height)) {
      sprite.height = height;
    }

    applySvgAttributes.call(this, node, sprite, parentStyles);

    return sprite;
  }

};

/**
 * @name Two.Utils.xhr
 * @function
 * @param {String} path
 * @param {Function} callback
 * @returns {XMLHttpRequest} The constructed and called XHR request.
 * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
 */
function xhr(path, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', path);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };

  xhr.send();
  return xhr;

}

/**
 * @name Two.ImageSequence
 * @class
 * @extends Two.Rectangle
 * @param {String|String[]|Two.Texture|Two.Texture[]} paths - A list of URLs or {@link Two.Texture}s.
 * @param {Number} [ox=0] - The initial `x` position of the Two.ImageSequence.
 * @param {Number} [oy=0] - The initial `y` position of the Two.ImageSequence.
 * @param {Number} [frameRate=30] - The frame rate at which the images should playback at.
 * @description A convenient package to display still or animated images organized as a series of still images.
 */
function ImageSequence(paths, ox, oy, frameRate) {

  // Not using default constructor of Rectangle due to odd `beginning` / `ending` behavior.
  // See: https://github.com/jonobr1/two.js/issues/383
  Path.call(this, [
    new Anchor(),
    new Anchor(),
    new Anchor(),
    new Anchor()
  ], true);

  this._renderer.flagTextures = ImageSequence.FlagTextures.bind(this);
  this._renderer.bindTextures = ImageSequence.BindTextures.bind(this);
  this._renderer.unbindTextures = ImageSequence.UnbindTextures.bind(this);

  this.noStroke();
  this.noFill();

  /**
   * @name Two.ImageSequence#textures
   * @property {Two.Texture[]} - A list of textures to be used as frames for animating the {@link Two.ImageSequence}.
   */
  if (Array.isArray(paths)) {
    this.textures = paths.map(ImageSequence.GenerateTexture.bind(this));
  } else {
    // If just a single path convert into a single Two.Texture
    this.textures = [ImageSequence.GenerateTexture(paths)];
  }

  this.origin = new Vector();

  this._update();
  this.translation.set(ox || 0, oy || 0);

  /**
   * @name Two.ImageSequence#frameRate
   * @property {Number} - The number of frames to animate against per second.
   */
  if (typeof frameRate === 'number') {
    this.frameRate = frameRate;
  } else {
    this.frameRate = ImageSequence.DefaultFrameRate;
  }

  /**
   * @name Two.ImageSequence#index
   * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
   */
  this.index = 0;

}

_.extend(ImageSequence, {

  /**
   * @name Two.ImageSequence.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.ImageSequence}.
   */
  Properties: [
    'frameRate',
    'index'
  ],

  /**
   * @name Two.ImageSequence.DefaultFrameRate
   * @property The default frame rate that {@link Two.ImageSequence#frameRate} is set to when instantiated.
   */
  DefaultFrameRate: 30,

  /**
   * @name Two.ImageSequence.FlagTextures
   * @function
   * @description Cached method to let renderers know textures have been updated on a {@link Two.ImageSequence}.
   */
  FlagTextures: function() {
    this._flagTextures = true;
  },

  /**
   * @name Two.ImageSequence.BindTextures
   * @function
   * @description Cached method to let {@link Two.ImageSequence} know textures have been added to the instance.
   */
  BindTextures: function(items) {

    var i = items.length;
    while (i--) {
      items[i].bind(Events.Types.change, this._renderer.flagTextures);
    }

    this._renderer.flagTextures();

  },

  /**
   * @name Two.ImageSequence.UnbindVertices
   * @function
   * @description Cached method to let {@link Two.ImageSequence} know textures have been removed from the instance.
   */
  UnbindTextures: function(items) {

    var i = items.length;
    while (i--) {
      items[i].unbind(Events.Types.change, this._renderer.flagTextures);
    }

    this._renderer.flagTextures();

  },

  /**
   * @name Two.ImageSequence.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.ImageSequence} to any object. Handy if you'd like to extend or inherit the {@link Two.ImageSequence} class on a custom class.
   */
  MakeObservable: function(obj) {

    Rectangle.MakeObservable(obj);
    _.each(ImageSequence.Properties, defineGetterSetter, obj);

    Object.defineProperty(obj, 'textures', {

      enumerable: true,

      get: function() {
        return this._textures;
      },

      set: function(textures) {

        var bindTextures = this._renderer.bindTextures;
        var unbindTextures = this._renderer.unbindTextures;

        // Remove previous listeners
        if (this._textures) {
          this._textures
            .unbind(Events.Types.insert, bindTextures)
            .unbind(Events.Types.remove, unbindTextures);
        }

        // Create new Collection with copy of vertices
        this._textures = new Collection((textures || []).slice(0));

        // Listen for Collection changes and bind / unbind
        this._textures
          .bind(Events.Types.insert, bindTextures)
          .bind(Events.Types.remove, unbindTextures);

        // Bind Initial Textures
        bindTextures(this._textures);

      }

    });

  },

  /**
   * @name Two.ImageSequence.GenerateTexture
   * @property {Function} - Shorthand function to prepare source image material into readable format by {@link Two.ImageSequence}.
   * @param {String|Two.Texture} textureOrString - The texture or string to create a {@link Two.Texture} from.
   * @description Function used internally by {@link Two.ImageSequence} to parse arguments and return {@link Two.Texture}s.
   * @returns {Two.Texture}
   */
  GenerateTexture: function(obj) {
    if (obj instanceof Texture) {
      return obj;
    } else if (typeof obj === 'string') {
      return new Texture(obj);
    }
  }

});

_.extend(ImageSequence.prototype, Rectangle.prototype, {

  constructor: ImageSequence,

  /**
   * @name Two.ImageSequence#_flagTextures
   * @private
   * @property {Boolean} - Determines whether the {@link Two.ImageSequence#textures} need updating.
   */
  _flagTextures: false,

  /**
   * @name Two.ImageSequence#_flagFrameRate
   * @private
   * @property {Boolean} - Determines whether the {@link Two.ImageSequence#frameRate} needs updating.
   */
  _flagFrameRate: false,

  /**
   * @name Two.ImageSequence#_flagIndex
   * @private
   * @property {Boolean} - Determines whether the {@link Two.ImageSequence#index} needs updating.
   */
  _flagIndex: false,

  // Private variables

  /**
   * @name Two.ImageSequence#_amount
   * @private
   * @property {Number} - Number of frames for a given {@link Two.ImageSequence}.
   */
  _amount: 1,

  /**
   * @name Two.ImageSequence#_duration
   * @private
   * @property {Number} - Number of milliseconds a {@link Two.ImageSequence}.
   */
  _duration: 0,

  /**
   * @name Two.ImageSequence#_index
   * @private
   * @property {Number} - The current frame the {@link Two.ImageSequence} is currently displaying.
   */
  _index: 0,

  /**
   * @name Two.ImageSequence#_startTime
   * @private
   * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.ImageSequence} started.
   */
  _startTime: 0,

  /**
   * @name Two.ImageSequence#_playing
   * @private
   * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} is animating or not.
   */
  _playing: false,

  /**
   * @name Two.ImageSequence#_firstFrame
   * @private
   * @property {Number} - The frame the {@link Two.ImageSequence} should start with.
   */
  _firstFrame: 0,

  /**
   * @name Two.ImageSequence#_lastFrame
   * @private
   * @property {Number} - The frame the {@link Two.ImageSequence} should end with.
   */
  _lastFrame: 0,

  /**
   * @name Two.ImageSequence#_playing
   * @private
   * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} should loop or not.
   */
  _loop: true,

  // Exposed through getter-setter

  /**
   * @name Two.ImageSequence#_textures
   * @private
   * @see {@link Two.ImageSequence#textures}
   */
  _textures: null,

  /**
   * @name Two.ImageSequence#_frameRate
   * @private
   * @see {@link Two.ImageSequence#frameRate}
   */
  _frameRate: 0,

  /**
   * @name Two.ImageSequence#_origin
   * @private
   * @see {@link Two.ImageSequence#origin}
   */
  _origin: null,

  /**
   * @name Two.ImageSequence#play
   * @function
   * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
   * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.ImageSequence#textures}.
   * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped.
   * @description Initiate animation playback of a {@link Two.ImageSequence}.
   */
  play: function(firstFrame, lastFrame, onLastFrame) {

    this._playing = true;
    this._firstFrame = 0;
    this._lastFrame = this.amount - 1;
    this._startTime = _.performance.now();

    if (typeof firstFrame === 'number') {
      this._firstFrame = firstFrame;
    }
    if (typeof lastFrame === 'number') {
      this._lastFrame = lastFrame;
    }
    if (typeof onLastFrame === 'function') {
      this._onLastFrame = onLastFrame;
    } else {
      delete this._onLastFrame;
    }

    if (this._index !== this._firstFrame) {
      this._startTime -= 1000 * Math.abs(this._index - this._firstFrame)
        / this._frameRate;
    }

    return this;

  },

  /**
   * @name Two.ImageSequence#pause
   * @function
   * @description Halt animation playback of a {@link Two.ImageSequence}.
   */
  pause: function() {

    this._playing = false;
    return this;

  },

  /**
   * @name Two.ImageSequence#stop
   * @function
   * @description Halt animation playback of a {@link Two.ImageSequence} and set the current frame back to the first frame.
   */
  stop: function() {

    this._playing = false;
    this._index = this._firstFrame;

    return this;

  },

  /**
   * @name Two.ImageSequence#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.ImageSequence}
   * @description Create a new instance of {@link Two.ImageSequence} with the same properties of the current image sequence.
   */
  clone: function(parent) {

    var clone = new ImageSequence(this.textures, this.translation.x,
      this.translation.y, this.frameRate);

    clone._loop = this._loop;

    if (this._playing) {
      clone.play();
    }

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.ImageSequence#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {
    var object = Rectangle.prototype.toObject.call(this);
    object.textures = this.textures.map(function(texture) {
      return texture.toObject();
    });
    object.frameRate = this.frameRate;
    object.index = this.index;
    object._firstFrame = this._firstFrame;
    object._lastFrame = this._lastFrame;
    object._loop = this._loop;
    return object;
  },

  /**
   * @name Two.ImageSequence#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    var effects = this._textures;
    var width, height, elapsed, amount, duration, texture;
    var index, frames;

    if (this._flagTextures) {
      this._amount = effects.length;
    }

    if (this._flagFrameRate) {
      this._duration = 1000 * this._amount / this._frameRate;
    }

    if (this._playing && this._frameRate > 0) {

      amount = this._amount;

      if (_.isNaN(this._lastFrame)) {
        this._lastFrame = amount - 1;
      }

      // TODO: Offload perf logic to instance of `Two`.
      elapsed = _.performance.now() - this._startTime;
      frames = this._lastFrame + 1;
      duration = 1000 * (frames - this._firstFrame) / this._frameRate;

      if (this._loop) {
        elapsed = elapsed % duration;
      } else {
        elapsed = Math.min(elapsed, duration);
      }

      index = lerp(this._firstFrame, frames, elapsed / duration);
      index = Math.floor(index);

      if (index !== this._index) {

        this._index = index;
        texture = effects[this._index];

        if (texture.loaded) {

          width = texture.image.width;
          height = texture.image.height;

          if (this.width !== width) {
            this.width = width;
          }
          if (this.height !== height) {
            this.height = height;
          }

          this.fill = texture;

          if (index >= this._lastFrame - 1 && this._onLastFrame) {
            this._onLastFrame();  // Shortcut for chainable sprite animations
          }

        }

      }

    } else if (this._flagIndex || !(this.fill instanceof Texture)) {

      texture = effects[this._index];

      if (texture.loaded) {

        width = texture.image.width;
        height = texture.image.height;

        if (this.width !== width) {
          this.width = width;
        }
        if (this.height !== height) {
          this.height = height;
        }

      }

      this.fill = texture;

    }

    Rectangle.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.ImageSequence#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagTextures = this._flagFrameRate = false;
    Rectangle.prototype.flagReset.call(this);

    return this;

  }

});

ImageSequence.MakeObservable(ImageSequence.prototype);

var TWO_PI$2 = Math.PI * 2, HALF_PI = Math.PI / 2;

/**
 * @name Two.ArcSegment
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the arc segment.
 * @param {Number} [y=0] - The y position of the arc segment.
 * @param {Number} [innerRadius=0] - The inner radius value of the arc segment.
 * @param {Number} [outerRadius=0] - The outer radius value of the arc segment.
 * @param {Number} [startAngle=0] - The start angle of the arc segment in Number.
 * @param {Number} [endAngle=6.2831] - The end angle of the arc segment in Number.
 * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
 */
function ArcSegment(ox, oy, ir, or, sa, ea, res) {

  var amount = res || (Constants.Resolution * 3);
  var points = [];
  for (var i = 0; i < amount; i++) {
    points.push(new Anchor());
  }

  Path.call(this, points, true, false, true);

  /**
   * @name Two.ArcSegment#innerRadius
   * @property {Number} - The size of the inner radius of the arc segment.
   */
  if (typeof ir === 'number') {
    this.innerRadius = ir;
  }

  /**
   * @name Two.ArcSegment#outerRadius
   * @property {Number} - The size of the outer radius of the arc segment.
   */
  if (typeof or === 'number') {
    this.outerRadius = or;
  }

  /**
   * @name Two.ArcSegment#startRadius
   * @property {Number} - The angle of one side for the arc segment.
   */
  if (typeof sa === 'number') {
    this.startAngle = sa;
  }

  /**
   * @name Two.ArcSegment#endAngle
   * @property {Number} - The angle of the other side for the arc segment.
   */
  if (typeof ea === 'number') {
    this.endAngle = ea;
  }

  this._update();

  if (typeof ox === 'number') {
    this.translation.x = ox;
  }
  if (typeof oy === 'number') {
    this.translation.y = oy;
  }

}

_.extend(ArcSegment, {

  /**
   * @name Two.ArcSegment.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.ArcSegment}.
   */
  Properties: ['startAngle', 'endAngle', 'innerRadius', 'outerRadius'],

  /**
   * @name Two.ArcSegment.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.ArcSegment} to any object. Handy if you'd like to extend the {@link Two.ArcSegment} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(ArcSegment.Properties, defineGetterSetter, obj);

  }

});

_.extend(ArcSegment.prototype, Path.prototype, {

  constructor: ArcSegment,

  /**
   * @name Two.ArcSegment#_flagStartAngle
   * @private
   * @property {Boolean} - Determines whether the {@link Two.ArcSegment#startAngle} needs updating.
   */
  _flagStartAngle: false,
  /**
   * @name Two.ArcSegment#_flagEndAngle
   * @private
   * @property {Boolean} - Determines whether the {@link Two.ArcSegment#endAngle} needs updating.
   */
  _flagEndAngle: false,
  /**
   * @name Two.ArcSegment#_flagInnerRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.ArcSegment#innerRadius} needs updating.
   */
  _flagInnerRadius: false,
  /**
   * @name Two.ArcSegment#_flagOuterRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.ArcSegment#outerRadius} needs updating.
   */
  _flagOuterRadius: false,

  /**
   * @name Two.ArcSegment#_startAngle
   * @private
   * @see {@link Two.ArcSegment#startAngle}
   */
  _startAngle: 0,
  /**
   * @name Two.ArcSegment#_endAngle
   * @private
   * @see {@link Two.ArcSegment#endAngle}
   */
  _endAngle: TWO_PI$2,
  /**
   * @name Two.ArcSegment#_innerRadius
   * @private
   * @see {@link Two.ArcSegment#innerRadius}
   */
  _innerRadius: 0,
  /**
   * @name Two.ArcSegment#_outerRadius
   * @private
   * @see {@link Two.ArcSegment#outerRadius}
   */
  _outerRadius: 0,

  /**
   * @name Two.ArcSegment#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagStartAngle || this._flagEndAngle
      || this._flagInnerRadius || this._flagOuterRadius) {

      var sa = this._startAngle;
      var ea = this._endAngle;

      var ir = this._innerRadius;
      var or = this._outerRadius;

      var connected = mod(sa, TWO_PI$2) === mod(ea, TWO_PI$2);
      var punctured = ir > 0;

      var vertices = this.vertices;
      var length = (punctured ? vertices.length / 2 : vertices.length);
      var command, id = 0;

      if (connected) {
        length--;
      } else if (!punctured) {
        length -= 2;
      }

      /**
       * Outer Circle
       */
      for (var i = 0, last = length - 1; i < length; i++) {

        var pct = i / last;
        var v = vertices[id];
        var theta = pct * (ea - sa) + sa;
        var step = (ea - sa) / length;

        var x = or * Math.cos(theta);
        var y = or * Math.sin(theta);

        switch (i) {
          case 0:
            command = Commands.move;
            break;
          default:
            command = Commands.curve;
        }

        v.command = command;
        v.x = x;
        v.y = y;
        v.controls.left.clear();
        v.controls.right.clear();

        if (v.command === Commands.curve) {
          var amp = or * step / Math.PI;
          v.controls.left.x = amp * Math.cos(theta - HALF_PI);
          v.controls.left.y = amp * Math.sin(theta - HALF_PI);
          v.controls.right.x = amp * Math.cos(theta + HALF_PI);
          v.controls.right.y = amp * Math.sin(theta + HALF_PI);
          if (i === 1) {
            v.controls.left.multiplyScalar(2);
          }
          if (i === last) {
            v.controls.right.multiplyScalar(2);
          }
        }

        id++;

      }

      if (punctured) {

        if (connected) {
          vertices[id].command = Commands.close;
          id++;
        } else {
          length--;
          last = length - 1;
        }

        /**
         * Inner Circle
         */
        for (i = 0; i < length; i++) {

          pct = i / last;
          v = vertices[id];
          theta = (1 - pct) * (ea - sa) + sa;
          step = (ea - sa) / length;

          x = ir * Math.cos(theta);
          y = ir * Math.sin(theta);
          command = Commands.curve;
          if (i <= 0) {
            command = connected ? Commands.move : Commands.line;
          }

          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.left.clear();
          v.controls.right.clear();

          if (v.command === Commands.curve) {
            amp = ir * step / Math.PI;
            v.controls.left.x = amp * Math.cos(theta + HALF_PI);
            v.controls.left.y = amp * Math.sin(theta + HALF_PI);
            v.controls.right.x = amp * Math.cos(theta - HALF_PI);
            v.controls.right.y = amp * Math.sin(theta - HALF_PI);
            if (i === 1) {
              v.controls.left.multiplyScalar(2);
            }
            if (i === last) {
              v.controls.right.multiplyScalar(2);
            }
          }

          id++;

        }

        // Final Point
        vertices[id].copy(vertices[0]);
        vertices[id].command = Commands.line;

      } else if (!connected) {

        vertices[id].command = Commands.line;
        vertices[id].x = 0;
        vertices[id].y = 0;
        id++;

        // Final Point
        vertices[id].copy(vertices[0]);
        vertices[id].command = Commands.line;

      }

    }

    Path.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.ArcSegment#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    Path.prototype.flagReset.call(this);

    this._flagStartAngle = this._flagEndAngle
      = this._flagInnerRadius = this._flagOuterRadius = false;

    return this;

  },

  /**
   * @name Two.ArcSegment#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.ArcSegment}
   * @description Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.
   */
  clone: function(parent) {

    var ir = this.innerRadius;
    var or = this.outerRadius;
    var sa = this.startAngle;
    var ea = this.endAngle;
    var resolution = this.vertices.length;

    var clone = new ArcSegment(0, 0, ir, or, sa, ea, resolution);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.ArcSegment#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(ArcSegment.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

ArcSegment.MakeObservable(ArcSegment.prototype);

var TWO_PI$1 = Math.PI * 2, cos$1 = Math.cos, sin$1 = Math.sin;

/**
 * @name Two.Polygon
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the polygon.
 * @param {Number} [y=0] - The y position of the polygon.
 * @param {Number} [radius=0] - The radius value of the polygon.
 * @param {Number} [sides=12] - The number of vertices used to construct the polygon.
 */
function Polygon(ox, oy, r, sides) {

  sides = Math.max(sides || 0, 3);

  Path.call(this);

  this.closed = true;
  this.automatic = false;

  /**
   * @name Two.Polygon#width
   * @property {Number} - The size of the width of the polygon.
   */
  if (typeof r === 'number') {
    this.width = r * 2;
  }

  /**
   * @name Two.Polygon#height
   * @property {Number} - The size of the height of the polygon.
   */
  if (typeof r === 'number') {
    this.height = r * 2;
  }

  /**
   * @name Two.Polygon#sides
   * @property {Number} - The amount of sides the polyogn has.
   */
  if (typeof sides === 'number') {
    this.sides = sides;
  }

  this._update();

  if (typeof ox === 'number') {
    this.translation.x = ox;
  }
  if (typeof oy === 'number') {
    this.translation.y = oy;
  }

}

_.extend(Polygon, {

  /**
   * @name Two.Polygon.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Polygon}.
   */
  Properties: ['width', 'height', 'sides'],

  /**
   * @name Two.Polygon.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Polygon} to any object. Handy if you'd like to extend the {@link Two.Polygon} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(Polygon.Properties, defineGetterSetter, obj);

  }

});

_.extend(Polygon.prototype, Path.prototype, {

  constructor: Polygon,

  /**
   * @name Two.Polygon#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#width} needs updating.
   */
  _flagWidth: false,
  /**
   * @name Two.Polygon#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#height} needs updating.
   */
  _flagHeight: false,
  /**
   * @name Two.Polygon#_flagSides
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#sides} needs updating.
   */
  _flagSides: false,

  /**
   * @name Two.Polygon#_width
   * @private
   * @see {@link Two.Polygon#width}
   */
  _width: 0,
  /**
   * @name Two.Polygon#_height
   * @private
   * @see {@link Two.Polygon#height}
   */
  _height: 0,
  /**
   * @name Two.Polygon#_sides
   * @private
   * @see {@link Two.Polygon#sides}
   */
  _sides: 0,

  /**
   * @name Two.Polygon#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagSides) {

      var sides = this._sides;
      var amount = sides + 1;
      var length = this.vertices.length;

      if (length > sides) {
        this.vertices.splice(sides - 1, length - sides);
        length = sides;
      }

      for (var i = 0; i < amount; i++) {

        var pct = (i + 0.5) / sides;
        var theta = TWO_PI$1 * pct + Math.PI / 2;
        var x = this._width * cos$1(theta) / 2;
        var y = this._height * sin$1(theta) / 2;

        if (i >= length) {
          this.vertices.push(new Anchor(x, y));
        } else {
          this.vertices[i].set(x, y);
        }

        this.vertices[i].command = i === 0 ? Commands.move : Commands.line;

      }

    }

    Path.prototype._update.call(this);
    return this;

  },

  /**
   * @name Two.Polygon#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = this._flagSides = false;
    Path.prototype.flagReset.call(this);

    return this;

  },

  /**
   * @name Two.Polygon#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Polygon}
   * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
   */
  clone: function(parent) {

    var clone = new Polygon(0, 0, this.radius, this.sides);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Polygon#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(Polygon.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

Polygon.MakeObservable(Polygon.prototype);

var TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;

/**
 * @name Two.Star
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the star.
 * @param {Number} [y=0] - The y position of the star.
 * @param {Number} [innerRadius=0] - The inner radius value of the star.
 * @param {Number} [outerRadius=0] - The outer radius value of the star.
 * @param {Number} [sides=5] - The number of sides used to construct the star.
 */
function Star(ox, oy, ir, or, sides) {

  if (arguments.length <= 3) {
    or = ir;
    ir = or / 2;
  }

  if (typeof sides !== 'number' || sides <= 0) {
    sides = 5;
  }

  Path.call(this);
  this.closed = true;
  this.automatic = false;

  /**
   * @name Two.Star#innerRadius
   * @property {Number} - The size of the inner radius of the star.
   */
  if (typeof ir === 'number') {
    this.innerRadius = ir;
  }

  /**
   * @name Two.Star#outerRadius
   * @property {Number} - The size of the outer radius of the star.
   */
  if (typeof or === 'number') {
    this.outerRadius = or;
  }

  /**
   * @name Two.Star#sides
   * @property {Number} - The amount of sides the star has.
   */
  if (typeof sides === 'number') {
    this.sides = sides;
  }

  this._update();

  if (typeof ox === 'number') {
    this.translation.x = ox;
  }
  if (typeof oy === 'number') {
    this.translation.y = oy;
  }

}

_.extend(Star, {

  /**
   * @name Two.Star.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Star}.
   */
  Properties: ['innerRadius', 'outerRadius', 'sides'],

  /**
   * @name Two.Star.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Star} to any object. Handy if you'd like to extend the {@link Two.Star} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(Star.Properties, defineGetterSetter, obj);

  }

});

_.extend(Star.prototype, Path.prototype, {

  constructor: Star,

  /**
   * @name Two.Star#_flagInnerRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Star#innerRadius} needs updating.
   */
  _flagInnerRadius: false,
  /**
   * @name Two.Star#_flagOuterRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Star#outerRadius} needs updating.
   */
  _flagOuterRadius: false,
  /**
   * @name Two.Star#_flagSides
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Star#sides} needs updating.
   */
  _flagSides: false,

  /**
   * @name Two.Star#_innerRadius
   * @private
   * @see {@link Two.Star#innerRadius}
   */
  _innerRadius: 0,
  /**
   * @name Two.Star#_outerRadius
   * @private
   * @see {@link Two.Star#outerRadius}
   */
  _outerRadius: 0,
  /**
   * @name Two.Star#_sides
   * @private
   * @see {@link Two.Star#sides}
   */
  _sides: 0,

  /**
   * @name Two.Star#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {

      var sides = this._sides * 2;
      var amount = sides + 1;
      var length = this.vertices.length;

      if (length > sides) {
        this.vertices.splice(sides - 1, length - sides);
        length = sides;
      }

      for (var i = 0; i < amount; i++) {

        var pct = (i + 0.5) / sides;
        var theta = TWO_PI * pct;
        var r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
        var x = r * cos(theta);
        var y = r * sin(theta);

        if (i >= length) {
          this.vertices.push(new Anchor(x, y));
        } else {
          this.vertices[i].set(x, y);
        }

        this.vertices[i].command = i === 0 ? Commands.move : Commands.line;

      }

    }

    Path.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.Star#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
    Path.prototype.flagReset.call(this);

    return this;

  },

  /**
   * @name Two.Star#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Star}
   * @description Create a new instance of {@link Two.Star} with the same properties of the current path.
   */
  clone: function(parent) {

    var ir = this.innerRadius;
    var or = this.outerRadius;
    var sides = this.sides;

    var clone = new Star(0, 0, ir, or, sides);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Star#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(Star.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

Star.MakeObservable(Star.prototype);

var svg = {

  version: 1.1,

  ns: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',

  alignments: {
    left: 'start',
    center: 'middle',
    right: 'end'
  },

  // Create an svg namespaced element.
  createElement: function(name, attrs) {
    var tag = name;
    var elem = document.createElementNS(svg.ns, tag);
    if (tag === 'svg') {
      attrs = _.defaults(attrs || {}, {
        version: svg.version
      });
    }
    if (attrs && Object.keys(attrs).length > 0) {
      svg.setAttributes(elem, attrs);
    }
    return elem;
  },

  // Add attributes from an svg element.
  setAttributes: function(elem, attrs) {
    var keys = Object.keys(attrs);
    for (var i = 0; i < keys.length; i++) {
      if (/href/.test(keys[i])) {
        elem.setAttributeNS(svg.xlink, keys[i], attrs[keys[i]]);
      } else {
        elem.setAttribute(keys[i], attrs[keys[i]]);
      }
    }
    return this;
  },

  // Remove attributes from an svg element.
  removeAttributes: function(elem, attrs) {
    for (var key in attrs) {
      elem.removeAttribute(key);
    }
    return this;
  },

  // Turn a set of vertices into a string for the d property of a path
  // element. It is imperative that the string collation is as fast as
  // possible, because this call will be happening multiple times a
  // second.
  toString: function(points, closed) {

    var l = points.length,
      last = l - 1,
      d, // The elusive last Commands.move point
      string = '';

    for (var i = 0; i < l; i++) {
      var b = points[i];
      var command;
      var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
      var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

      var a = points[prev];
      var c = points[next];

      var vx, vy, ux, uy, ar, bl, br, cl;
      var rx, ry, xAxisRotation, largeArcFlag, sweepFlag;

      // Access x and y directly,
      // bypassing the getter
      var x = toFixed(b.x);
      var y = toFixed(b.y);

      switch (b.command) {

        case Commands.close:
          command = Commands.close;
          break;

        case Commands.arc:

          rx = b.rx;
          ry = b.ry;
          xAxisRotation = b.xAxisRotation;
          largeArcFlag = b.largeArcFlag;
          sweepFlag = b.sweepFlag;

          command = Commands.arc + ' ' + rx + ' ' + ry + ' '
            + xAxisRotation + ' ' + largeArcFlag + ' ' + sweepFlag + ' '
            + x + ' ' + y;
          break;

        case Commands.curve:

          ar = (a.controls && a.controls.right) || Vector.zero;
          bl = (b.controls && b.controls.left) || Vector.zero;

          if (a.relative) {
            vx = toFixed((ar.x + a.x));
            vy = toFixed((ar.y + a.y));
          } else {
            vx = toFixed(ar.x);
            vy = toFixed(ar.y);
          }

          if (b.relative) {
            ux = toFixed((bl.x + b.x));
            uy = toFixed((bl.y + b.y));
          } else {
            ux = toFixed(bl.x);
            uy = toFixed(bl.y);
          }

          command = ((i === 0) ? Commands.move : Commands.curve) +
            ' ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
          break;

        case Commands.move:
          d = b;
          command = Commands.move + ' ' + x + ' ' + y;
          break;

        default:
          command = b.command + ' ' + x + ' ' + y;

      }

      // Add a final point and close it off

      if (i >= last && closed) {

        if (b.command === Commands.curve) {

          // Make sure we close to the most previous Commands.move
          c = d;

          br = (b.controls && b.controls.right) || b;
          cl = (c.controls && c.controls.left) || c;

          if (b.relative) {
            vx = toFixed((br.x + b.x));
            vy = toFixed((br.y + b.y));
          } else {
            vx = toFixed(br.x);
            vy = toFixed(br.y);
          }

          if (c.relative) {
            ux = toFixed((cl.x + c.x));
            uy = toFixed((cl.y + c.y));
          } else {
            ux = toFixed(cl.x);
            uy = toFixed(cl.y);
          }

          x = toFixed(c.x);
          y = toFixed(c.y);

          command +=
            ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;

        }

        if (b.command !== Commands.close) {
          command += ' Z';
        }

      }

      string += command + ' ';

    }

    return string;

  },

  getClip: function(shape, domElement) {

    var clip = shape._renderer.clip;

    if (!clip) {

      clip = shape._renderer.clip = svg.createElement('clipPath', {
        'clip-rule': 'nonzero'
      });
      domElement.defs.appendChild(clip);

    }

    return clip;

  },

  group: {

    // TODO: Can speed up.
    // TODO: How does this effect a f
    appendChild: function(object) {

      var elem = object._renderer.elem;

      if (!elem) {
        return;
      }

      var tag = elem.nodeName;

      if (!tag || /(radial|linear)gradient/i.test(tag) || object._clip) {
        return;
      }

      this.elem.appendChild(elem);

    },

    removeChild: function(object) {

      var elem = object._renderer.elem;

      if (!elem || elem.parentNode != this.elem) {
        return;
      }

      var tag = elem.nodeName;

      if (!tag) {
        return;
      }

      // Defer subtractions while clipping.
      if (object._clip) {
        return;
      }

      this.elem.removeChild(elem);

    },

    orderChild: function(object) {
      this.elem.appendChild(object._renderer.elem);
    },

    renderChild: function(child) {
      svg[child._renderer.type].render.call(child, this);
    },

    render: function(domElement) {

      // Shortcut for hidden objects.
      // Doesn't reset the flags, so changes are stored and
      // applied once the object is visible again
      if ((!this._visible && !this._flagVisible)
        || (this._opacity === 0 && !this._flagOpacity)) {
        return this;
      }

      this._update();

      if (!this._renderer.elem) {
        this._renderer.elem = svg.createElement('g', {
          id: this.id
        });
        domElement.appendChild(this._renderer.elem);
      }

      // _Update styles for the <g>
      var flagMatrix = this._matrix.manual || this._flagMatrix;
      var context = {
        domElement: domElement,
        elem: this._renderer.elem
      };

      if (flagMatrix) {
        this._renderer.elem.setAttribute('transform', 'matrix(' + this._matrix.toString() + ')');
      }

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        svg[child._renderer.type].render.call(child, domElement);
      }

      if (this._flagId) {
        this._renderer.elem.setAttribute('id', this._id);
      }

      if (this._flagOpacity) {
        this._renderer.elem.setAttribute('opacity', this._opacity);
      }

      if (this._flagVisible) {
        this._renderer.elem.setAttribute('display', this._visible ? 'inline' : 'none');
      }

      if (this._flagClassName) {
        this._renderer.elem.setAttribute('class', this.classList.join(' '));
      }

      if (this._flagAdditions) {
        this.additions.forEach(svg.group.appendChild, context);
      }

      if (this._flagSubtractions) {
        this.subtractions.forEach(svg.group.removeChild, context);
      }

      if (this._flagOrder) {
        this.children.forEach(svg.group.orderChild, context);
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      // if (this._flagClip) {

      //   clip = svg.getClip(this, domElement);
      //   elem = this._renderer.elem;

      //   if (this._clip) {
      //     elem.removeAttribute('id');
      //     clip.setAttribute('id', this.id);
      //     clip.appendChild(elem);
      //   } else {
      //     clip.removeAttribute('id');
      //     elem.setAttribute('id', this.id);
      //     this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
      //   }

      // }

      if (this._flagMask) {
        if (this._mask) {
          svg[this._mask._renderer.type].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute('clip-path', 'url(#' + this._mask.id + ')');
        } else {
          this._renderer.elem.removeAttribute('clip-path');
        }
      }

      return this.flagReset();

    }

  },

  path: {

    render: function(domElement) {

      // Shortcut for hidden objects.
      // Doesn't reset the flags, so changes are stored and
      // applied once the object is visible again
      if (this._opacity === 0 && !this._flagOpacity) {
        return this;
      }

      this._update();

      // Collect any attribute that needs to be changed here
      var changed = {};

      var flagMatrix = this._matrix.manual || this._flagMatrix;

      if (flagMatrix) {
        changed.transform = 'matrix(' + this._matrix.toString() + ')';
      }

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagVertices) {
        var vertices = svg.toString(this._renderer.vertices, this._closed);
        changed.d = vertices;
      }

      if (this._fill && this._fill._renderer) {
        this._fill._update();
        svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
      }

      if (this._flagFill) {
        changed.fill = this._fill && this._fill.id
          ? 'url(#' + this._fill.id + ')' : this._fill;
      }

      if (this._stroke && this._stroke._renderer) {
        this._stroke._update();
        svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
      }

      if (this._flagStroke) {
        changed.stroke = this._stroke && this._stroke.id
          ? 'url(#' + this._stroke.id + ')' : this._stroke;
      }

      if (this._flagLinewidth) {
        changed['stroke-width'] = this._linewidth;
      }

      if (this._flagOpacity) {
        changed['stroke-opacity'] = this._opacity;
        changed['fill-opacity'] = this._opacity;
      }

      if (this._flagClassName) {
        changed['class'] = this.classList.join(' ');
      }

      if (this._flagVisible) {
        changed.visibility = this._visible ? 'visible' : 'hidden';
      }

      if (this._flagCap) {
        changed['stroke-linecap'] = this._cap;
      }

      if (this._flagJoin) {
        changed['stroke-linejoin'] = this._join;
      }

      if (this._flagMiter) {
        changed['stroke-miterlimit'] = this._miter;
      }

      if (this.dashes && this.dashes.length > 0) {
        changed['stroke-dasharray'] = this.dashes.join(' ');
        changed['stroke-dashoffset'] = this.dashes.offset || 0;
      }

      // If there is no attached DOM element yet,
      // create it with all necessary attributes.
      if (!this._renderer.elem) {

        changed.id = this._id;
        this._renderer.elem = svg.createElement('path', changed);
        domElement.appendChild(this._renderer.elem);

      // Otherwise apply all pending attributes
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }

      if (this._flagClip) {

        var clip = svg.getClip(this, domElement);
        var elem = this._renderer.elem;

        if (this._clip) {
          elem.removeAttribute('id');
          clip.setAttribute('id', this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute('id');
          elem.setAttribute('id', this.id);
          this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
        }

      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      if (this._flagMask) {
        if (this._mask) {
          svg[this._mask._renderer.type].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute('clip-path', 'url(#' + this._mask.id + ')');
        } else {
          this._renderer.elem.removeAttribute('clip-path');
        }
      }

      return this.flagReset();

    }

  },

  text: {

    render: function(domElement) {

      this._update();

      var changed = {};

      var flagMatrix = this._matrix.manual || this._flagMatrix;

      if (flagMatrix) {
        changed.transform = 'matrix(' + this._matrix.toString() + ')';
      }

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagFamily) {
        changed['font-family'] = this._family;
      }
      if (this._flagSize) {
        changed['font-size'] = this._size;
      }
      if (this._flagLeading) {
        changed['line-height'] = this._leading;
      }
      if (this._flagAlignment) {
        changed['text-anchor'] = svg.alignments[this._alignment] || this._alignment;
      }
      if (this._flagBaseline) {
        changed['alignment-baseline'] = changed['dominant-baseline'] = this._baseline;
      }
      if (this._flagStyle) {
        changed['font-style'] = this._style;
      }
      if (this._flagWeight) {
        changed['font-weight'] = this._weight;
      }
      if (this._flagDecoration) {
        changed['text-decoration'] = this._decoration;
      }
      if (this._fill && this._fill._renderer) {
        this._fill._update();
        svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
      }
      if (this._flagFill) {
        changed.fill = this._fill && this._fill.id
          ? 'url(#' + this._fill.id + ')' : this._fill;
      }
      if (this._stroke && this._stroke._renderer) {
        this._stroke._update();
        svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
      }
      if (this._flagStroke) {
        changed.stroke = this._stroke && this._stroke.id
          ? 'url(#' + this._stroke.id + ')' : this._stroke;
      }
      if (this._flagLinewidth) {
        changed['stroke-width'] = this._linewidth;
      }
      if (this._flagOpacity) {
        changed.opacity = this._opacity;
      }
      if (this._flagClassName) {
        changed['class'] = this.classList.join(' ');
      }
      if (this._flagVisible) {
        changed.visibility = this._visible ? 'visible' : 'hidden';
      }
      if (this.dashes && this.dashes.length > 0) {
        changed['stroke-dasharray'] = this.dashes.join(' ');
        changed['stroke-dashoffset'] = this.dashes.offset || 0;
      }

      if (!this._renderer.elem) {

        changed.id = this._id;

        this._renderer.elem = svg.createElement('text', changed);
        domElement.defs.appendChild(this._renderer.elem);

      } else {

        svg.setAttributes(this._renderer.elem, changed);

      }

      if (this._flagClip) {

        var clip = svg.getClip(this, domElement);
        var elem = this._renderer.elem;

        if (this._clip) {
          elem.removeAttribute('id');
          clip.setAttribute('id', this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute('id');
          elem.setAttribute('id', this.id);
          this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
        }

      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      if (this._flagMask) {
        if (this._mask) {
          svg[this._mask._renderer.type].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute('clip-path', 'url(#' + this._mask.id + ')');
        } else {
          this._renderer.elem.removeAttribute('clip-path');
        }
      }

      if (this._flagValue) {
        this._renderer.elem.textContent = this._value;
      }

      return this.flagReset();

    }

  },

  'linear-gradient': {

    render: function(domElement, silent) {

      if (!silent) {
        this._update();
      }

      var changed = {};

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagEndPoints) {
        changed.x1 = this.left._x;
        changed.y1 = this.left._y;
        changed.x2 = this.right._x;
        changed.y2 = this.right._y;
      }

      if (this._flagSpread) {
        changed.spreadMethod = this._spread;
      }

      // If there is no attached DOM element yet,
      // create it with all necessary attributes.
      if (!this._renderer.elem) {

        changed.id = this._id;
        changed.gradientUnits = 'userSpaceOnUse';
        this._renderer.elem = svg.createElement('linearGradient', changed);
        domElement.defs.appendChild(this._renderer.elem);

      // Otherwise apply all pending attributes
      } else {

        svg.setAttributes(this._renderer.elem, changed);

      }

      if (this._flagStops) {

        var lengthChanged = this._renderer.elem.childNodes.length
          !== this.stops.length;

        if (lengthChanged) {
          while (this._renderer.elem.lastChild) {
            this._renderer.elem.removeChild(this._renderer.elem.lastChild);
          }
        }

        for (var i = 0; i < this.stops.length; i++) {

          var stop = this.stops[i];
          var attrs = {};

          if (stop._flagOffset) {
            attrs.offset = 100 * stop._offset + '%';
          }
          if (stop._flagColor) {
            attrs['stop-color'] = stop._color;
          }
          if (stop._flagOpacity) {
            attrs['stop-opacity'] = stop._opacity;
          }

          if (!stop._renderer.elem) {
            stop._renderer.elem = svg.createElement('stop', attrs);
          } else {
            svg.setAttributes(stop._renderer.elem, attrs);
          }

          if (lengthChanged) {
            this._renderer.elem.appendChild(stop._renderer.elem);
          }
          stop.flagReset();

        }

      }

      return this.flagReset();

    }

  },

  'radial-gradient': {

    render: function(domElement, silent) {

      if (!silent) {
        this._update();
      }

      var changed = {};

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagCenter) {
        changed.cx = this.center._x;
        changed.cy = this.center._y;
      }
      if (this._flagFocal) {
        changed.fx = this.focal._x;
        changed.fy = this.focal._y;
      }

      if (this._flagRadius) {
        changed.r = this._radius;
      }

      if (this._flagSpread) {
        changed.spreadMethod = this._spread;
      }

      // If there is no attached DOM element yet,
      // create it with all necessary attributes.
      if (!this._renderer.elem) {

        changed.id = this._id;
        changed.gradientUnits = 'userSpaceOnUse';
        this._renderer.elem = svg.createElement('radialGradient', changed);
        domElement.defs.appendChild(this._renderer.elem);

      // Otherwise apply all pending attributes
      } else {

        svg.setAttributes(this._renderer.elem, changed);

      }

      if (this._flagStops) {

        var lengthChanged = this._renderer.elem.childNodes.length
          !== this.stops.length;

        if (lengthChanged) {
          while (this._renderer.elem.lastChild) {
            this._renderer.elem.removeChild(this._renderer.elem.lastChild);
          }
        }

        for (var i = 0; i < this.stops.length; i++) {

          var stop = this.stops[i];
          var attrs = {};

          if (stop._flagOffset) {
            attrs.offset = 100 * stop._offset + '%';
          }
          if (stop._flagColor) {
            attrs['stop-color'] = stop._color;
          }
          if (stop._flagOpacity) {
            attrs['stop-opacity'] = stop._opacity;
          }

          if (!stop._renderer.elem) {
            stop._renderer.elem = svg.createElement('stop', attrs);
          } else {
            svg.setAttributes(stop._renderer.elem, attrs);
          }

          if (lengthChanged) {
            this._renderer.elem.appendChild(stop._renderer.elem);
          }
          stop.flagReset();

        }

      }

      return this.flagReset();

    }

  },

  texture: {

    render: function(domElement, silent) {

      if (!silent) {
        this._update();
      }

      var changed = {};
      var styles = { x: 0, y: 0 };
      var image = this.image;

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagLoaded && this.loaded) {

        switch (image.nodeName.toLowerCase()) {

          case 'canvas':
            styles.href = styles['xlink:href'] = image.toDataURL('image/png');
            break;
          case 'img':
          case 'image':
            styles.href = styles['xlink:href'] = this.src;
            break;

        }

      }

      if (this._flagOffset || this._flagLoaded || this._flagScale) {

        changed.x = this._offset.x;
        changed.y = this._offset.y;

        if (image) {

          changed.x -= image.width / 2;
          changed.y -= image.height / 2;

          if (this._scale instanceof Vector) {
            changed.x *= this._scale.x;
            changed.y *= this._scale.y;
          } else {
            changed.x *= this._scale;
            changed.y *= this._scale;
          }
        }

        if (changed.x > 0) {
          changed.x *= - 1;
        }
        if (changed.y > 0) {
          changed.y *= - 1;
        }

      }

      if (this._flagScale || this._flagLoaded || this._flagRepeat) {

        changed.width = 0;
        changed.height = 0;

        if (image) {

          styles.width = changed.width = image.width;
          styles.height = changed.height = image.height;

          // TODO: Hack / Band-aid
          switch (this._repeat) {
            case 'no-repeat':
              changed.width += 1;
              changed.height += 1;
              break;
          }

          if (this._scale instanceof Vector) {
            changed.width *= this._scale.x;
            changed.height *= this._scale.y;
          } else {
            changed.width *= this._scale;
            changed.height *= this._scale;
          }
        }

      }

      if (this._flagScale || this._flagLoaded) {
        if (!this._renderer.image) {
          this._renderer.image = svg.createElement('image', styles);
        } else {
          svg.setAttributes(this._renderer.image, styles);
        }
      }

      if (!this._renderer.elem) {

        changed.id = this._id;
        changed.patternUnits = 'userSpaceOnUse';
        this._renderer.elem = svg.createElement('pattern', changed);
        domElement.defs.appendChild(this._renderer.elem);

      } else if (Object.keys(changed).length !== 0) {

        svg.setAttributes(this._renderer.elem, changed);

      }

      if (this._renderer.elem && this._renderer.image && !this._renderer.appended) {
        this._renderer.elem.appendChild(this._renderer.image);
        this._renderer.appended = true;
      }

      return this.flagReset();

    }

  }

};

/**
 * @name Two.SVGRenderer
 * @class
 * @extends Two.Events
 * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
 * @param {Element} [parameters.domElement] - The `<svg />` to draw to. If none given a new one will be constructed.
 * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.
 */
function Renderer$1(params) {

  /**
   * @name Two.SVGRenderer#domElement
   * @property {Element} - The `<svg />` associated with the Two.js scene.
   */
  this.domElement = params.domElement || svg.createElement('svg');

  /**
   * @name Two.SVGRenderer#scene
   * @property {Two.Group} - The root group of the scenegraph.
   */
  this.scene = new Group();
  this.scene.parent = this;

  /**
   * @name Two.SVGRenderer#defs
   * @property {SvgDefintionsElement} - The `<defs />` to apply gradients, patterns, and bitmap imagery.
   */
  this.defs = svg.createElement('defs');
  this.domElement.appendChild(this.defs);
  this.domElement.defs = this.defs;
  this.domElement.style.overflow = 'hidden';

}

_.extend(Renderer$1, {

  /**
   * @name Two.SVGRenderer.Utils
   * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.
   */
  Utils: svg

});

_.extend(Renderer$1.prototype, Events, {

  constructor: Renderer$1,

  /**
   * @name Two.SVGRenderer#setSize
   * @function
   * @param {Number} width - The new width of the renderer.
   * @param {Number} height - The new height of the renderer.
   * @description Change the size of the renderer.
   * @nota-bene Triggers a `Two.Events.resize`.
   */
  setSize: function(width, height) {

    this.width = width;
    this.height = height;

    svg.setAttributes(this.domElement, {
      width: width,
      height: height
    });

    return this.trigger(Events.Types.resize, width, height);

  },

  /**
   * @name Two.SVGRenderer#render
   * @function
   * @description Render the current scene to the `<svg />`.
   */
  render: function() {

    svg.group.render.call(this.scene, this.domElement);

    return this;

  }

});

// Constants

var multiplyMatrix = Matrix.Multiply,
  identity = [1, 0, 0, 0, 1, 0, 0, 0, 1],
  transformation = new NumArray(9),
  CanvasUtils = Renderer$2.Utils;

var webgl = {

  isHidden: /(undefined|none|transparent)/i,

  canvas: (root$1.document ? root$1.document.createElement('canvas') : { getContext: function() {} }),

  alignments: {
    left: 'start',
    middle: 'center',
    right: 'end'
  },

  matrix: new Matrix(),

  group: {

    removeChild: function(child, gl) {
      if (child.children) {
        for (var i = 0; i < child.children.length; i++) {
          webgl.group.removeChild(child.children[i], gl);
        }
        return;
      }
      // Deallocate texture to free up gl memory.
      gl.deleteTexture(child._renderer.texture);
      delete child._renderer.texture;
    },

    render: function(gl, program) {

      if (!this._visible) {
        return;
      }

      this._update();

      var parent = this.parent;
      var flagParentMatrix = (parent._matrix && parent._matrix.manual) || parent._flagMatrix;
      var flagMatrix = this._matrix.manual || this._flagMatrix;

      if (flagParentMatrix || flagMatrix) {

        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }

        // Reduce amount of object / array creation / deletion
        this._matrix.toTransformArray(true, transformation);

        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }

        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x;
          this._renderer.scale.y = this._scale.y;
        } else {
          this._renderer.scale.x = this._scale;
          this._renderer.scale.y = this._scale;
        }

        if (!(/renderer/i.test(parent._renderer.type))) {
          this._renderer.scale.x *= parent._renderer.scale.x;
          this._renderer.scale.y *= parent._renderer.scale.y;
        }

        if (flagParentMatrix) {
          this._flagMatrix = true;
        }

      }

      if (this._mask) {

        // Stencil away everything that isn't rendered by the mask
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);

        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // Don't draw the element onto the canvas, only onto the stencil buffer
        gl.colorMask(false, false, false, false);

        webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

        gl.stencilFunc(gl.EQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);

      }

      this._flagOpacity = parent._flagOpacity || this._flagOpacity;

      this._renderer.opacity = this._opacity
        * (parent && parent._renderer ? parent._renderer.opacity : 1);

      var i;
      if (this._flagSubtractions) {
        for (i = 0; i < this.subtractions.length; i++) {
          webgl.group.removeChild(this.subtractions[i], gl);
        }
      }

      for (i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        webgl[child._renderer.type].render.call(child, gl, program);
      }

      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }

      return this.flagReset();

    }

  },

  path: {

    updateCanvas: function(elem) {

      var next, prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;
      var isOffset;

      var commands = elem._renderer.vertices;
      var canvas = this.canvas;
      var ctx = this.ctx;

      // Styles
      var scale = elem._renderer.scale;
      var stroke = elem._stroke;
      var linewidth = elem._linewidth;
      var fill = elem._fill;
      var opacity = elem._renderer.opacity || elem._opacity;
      var cap = elem._cap;
      var join = elem._join;
      var miter = elem._miter;
      var closed = elem._closed;
      var dashes = elem.dashes;
      var length = commands.length;
      var last = length - 1;

      canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
      canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);

      var centroid = elem._renderer.rect.centroid;
      var cx = centroid.x;
      var cy = centroid.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (miter) {
          ctx.miterLimit = miter;
        }
        if (join) {
          ctx.lineJoin = join;
        }
        if (!closed && cap) {
          ctx.lineCap = cap;
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }

      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      var d;
      ctx.save();
      ctx.scale(scale.x, scale.y);

      ctx.translate(cx, cy);

      ctx.beginPath();
      for (var i = 0; i < commands.length; i++) {

        var b = commands[i];

        x = b.x;
        y = b.y;

        switch (b.command) {

          case Commands.close:
            ctx.closePath();
            break;

          case Commands.arc:

            var rx = b.rx;
            var ry = b.ry;
            var xAxisRotation = b.xAxisRotation;
            var largeArcFlag = b.largeArcFlag;
            var sweepFlag = b.sweepFlag;

            prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
            a = commands[prev];

            var ax = a.x;
            var ay = a.y;

            CanvasUtils.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
            break;

          case Commands.curve:

            prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
            next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

            a = commands[prev];
            c = commands[next];
            ar = (a.controls && a.controls.right) || Vector.zero;
            bl = (b.controls && b.controls.left) || Vector.zero;

            if (a._relative) {
              vx = ar.x + a.x;
              vy = ar.y + a.y;
            } else {
              vx = ar.x;
              vy = ar.y;
            }

            if (b._relative) {
              ux = bl.x + b.x;
              uy = bl.y + b.y;
            } else {
              ux = bl.x;
              uy = bl.y;
            }

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            if (i >= last && closed) {

              c = d;

              br = (b.controls && b.controls.right) || Vector.zero;
              cl = (c.controls && c.controls.left) || Vector.zero;

              if (b._relative) {
                vx = br.x + b.x;
                vy = br.y + b.y;
              } else {
                vx = br.x;
                vy = br.y;
              }

              if (c._relative) {
                ux = cl.x + c.x;
                uy = cl.y + c.y;
              } else {
                ux = cl.x;
                uy = cl.y;
              }

              x = c.x;
              y = c.y;

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

            break;

          case Commands.line:
            ctx.lineTo(x, y);
            break;

          case Commands.move:
            d = b;
            ctx.moveTo(x, y);
            break;

        }

      }

      // Loose ends

      if (closed) {
        ctx.closePath();
      }

      if (!webgl.isHidden.test(fill)) {
        isOffset = fill._renderer && fill._renderer.offset;
        if (isOffset) {
          ctx.save();
          ctx.translate(
            - fill._renderer.offset.x, - fill._renderer.offset.y);
          ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
        }
        ctx.fill();
        if (isOffset) {
          ctx.restore();
        }
      }

      if (!webgl.isHidden.test(stroke)) {
        isOffset = stroke._renderer && stroke._renderer.offset;
        if (isOffset) {
          ctx.save();
          ctx.translate(
            - stroke._renderer.offset.x, - stroke._renderer.offset.y);
          ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
          ctx.lineWidth = linewidth / stroke._renderer.scale.x;
        }
        ctx.stroke();
        if (isOffset) {
          ctx.restore();
        }
      }

      ctx.restore();

    },

    // Returns the rect of a set of verts. Typically takes vertices that are
    // "centered" around 0 and returns them to be anchored upper-left.
    getBoundingClientRect: function(vertices, border, rect) {

      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity,
          width, height;

      vertices.forEach(function(v) {

        var x = v.x, y = v.y, controls = v.controls;
        var a, b, c, d, cl, cr;

        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);

        if (!v.controls) {
          return;
        }

        cl = controls.left;
        cr = controls.right;

        if (!cl || !cr) {
          return;
        }

        a = v._relative ? cl.x + x : cl.x;
        b = v._relative ? cl.y + y : cl.y;
        c = v._relative ? cr.x + x : cr.x;
        d = v._relative ? cr.y + y : cr.y;

        if (!a || !b || !c || !d) {
          return;
        }

        top = Math.min(b, d, top);
        left = Math.min(a, c, left);
        right = Math.max(a, c, right);
        bottom = Math.max(b, d, bottom);

      });

      // Expand borders

      if (typeof border === 'number') {
        top -= border;
        left -= border;
        right += border;
        bottom += border;
      }

      width = right - left;
      height = bottom - top;

      rect.top = top;
      rect.left = left;
      rect.right = right;
      rect.bottom = bottom;
      rect.width = width;
      rect.height = height;

      if (!rect.centroid) {
        rect.centroid = {};
      }

      rect.centroid.x = - left;
      rect.centroid.y = - top;

    },

    render: function(gl, program, forcedParent) {

      if (!this._visible || !this._opacity) {
        return this;
      }

      this._update();

      // Calculate what changed

      var parent = forcedParent || this.parent;
      var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      var flagMatrix = this._matrix.manual || this._flagMatrix;
      var parentChanged = this._renderer.parent !== parent;
      var flagTexture = this._flagVertices || this._flagFill
        || (this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
        || (this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
        || (this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale))
        || (this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
        || (this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
        || (this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale))
        || this._flagStroke || this._flagLinewidth || this._flagOpacity
        || parent._flagOpacity || this._flagVisible || this._flagCap
        || this._flagJoin || this._flagMiter || this._flagScale
        || (this.dashes && this.dashes.length > 0)
        || !this._renderer.texture;

      if (flagParentMatrix || flagMatrix || parentChanged) {

        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }

        // Reduce amount of object / array creation / deletion

        this._matrix.toTransformArray(true, transformation);

        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }

        if (parentChanged) {
          this._renderer.parent = parent;
        }
      }

      if (this._mask) {

        // Stencil away everything that isn't rendered by the mask
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);

        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // Don't draw the element onto the canvas, only onto the stencil buffer
        gl.colorMask(false, false, false, false);

        webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

        gl.stencilFunc(gl.EQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);

      }

      if (flagTexture) {

        if (!this._renderer.rect) {
          this._renderer.rect = {};
        }

        this._renderer.opacity = this._opacity * parent._renderer.opacity;

        webgl.path.getBoundingClientRect(this._renderer.vertices, this._linewidth, this._renderer.rect);

        webgl.updateTexture.call(webgl, gl, this);

      } else {

        // We still need to update child Two elements on the fill and
        // stroke properties.
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }

      }

      if (this._clip && !forcedParent) {
        return;
      }

      // Draw Texture
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);

      // Draw Rect
      var rect = this._renderer.rect;
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }

      return this.flagReset();

    }

  },

  text: {

    updateCanvas: function(elem) {

      var canvas = this.canvas;
      var ctx = this.ctx;

      // Styles
      var scale = elem._renderer.scale;
      var stroke = elem._stroke;
      var linewidth = elem._linewidth * scale;
      var fill = elem._fill;
      var opacity = elem._renderer.opacity || elem._opacity;
      var dashes = elem.dashes;
      var decoration = elem._decoration;

      canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
      canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);

      var centroid = elem._renderer.rect.centroid;
      var cx = centroid.x;
      var cy = centroid.y;

      var a, b, c, d, e, sx, sy, x1, y1, x2, y2;
      var isOffset = fill._renderer && fill._renderer.offset
        && stroke._renderer && stroke._renderer.offset;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isOffset) {
        ctx.font = [elem._style, elem._weight, elem._size + 'px/' +
          elem._leading + 'px', elem._family].join(' ');
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Styles
      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      ctx.save();
      ctx.scale(scale.x, scale.y);
      ctx.translate(cx, cy);

      if (!webgl.isHidden.test(fill)) {

        if (fill._renderer && fill._renderer.offset) {

          sx = fill._renderer.scale.x;
          sy = fill._renderer.scale.y;

          ctx.save();
          ctx.translate( - fill._renderer.offset.x,
            - fill._renderer.offset.y);
          ctx.scale(sx, sy);

          a = elem._size / fill._renderer.scale.y;
          b = elem._leading / fill._renderer.scale.y;
          ctx.font = [elem._style, elem._weight, a + 'px/',
            b + 'px', elem._family].join(' ');

          c = fill._renderer.offset.x / fill._renderer.scale.x;
          d = fill._renderer.offset.y / fill._renderer.scale.y;

          ctx.fillText(elem.value, c, d);
          ctx.restore();

        } else {
          ctx.fillText(elem.value, 0, 0);
        }

      }

      if (!webgl.isHidden.test(stroke)) {

        if (stroke._renderer && stroke._renderer.offset) {

          sx = stroke._renderer.scale.x;
          sy = stroke._renderer.scale.y;

          ctx.save();
          ctx.translate(- stroke._renderer.offset.x,
            - stroke._renderer.offset.y);
          ctx.scale(sx, sy);

          a = elem._size / stroke._renderer.scale.y;
          b = elem._leading / stroke._renderer.scale.y;
          ctx.font = [elem._style, elem._weight, a + 'px/',
            b + 'px', elem._family].join(' ');

          c = stroke._renderer.offset.x / stroke._renderer.scale.x;
          d = stroke._renderer.offset.y / stroke._renderer.scale.y;
          e = linewidth / stroke._renderer.scale.x;

          ctx.lineWidth = e;
          ctx.strokeText(elem.value, c, d);
          ctx.restore();

        } else {
          ctx.strokeText(elem.value, 0, 0);
        }

      }

      // Handle text-decoration
      if (/(underline|strikethrough)/i.test(decoration)) {

        var metrics = ctx.measureText(elem.value);

        switch (decoration) {
          case 'underline':
            y1 = metrics.actualBoundingBoxAscent;
            y2 = metrics.actualBoundingBoxAscent;
            break;
          case 'strikethrough':
            y1 = 0;
            y2 = 0;
            break;
        }

        x1 = - metrics.width / 2;
        x2 = metrics.width / 2;

        ctx.lineWidth = Math.max(Math.floor(elem._size / 15), 1);
        ctx.strokeStyle = ctx.fillStyle;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

      }

      ctx.restore();

    },

    getBoundingClientRect: function(elem, rect) {

      var ctx = webgl.ctx;

      ctx.font = [elem._style, elem._weight, elem._size + 'px/' +
        elem._leading + 'px', elem._family].join(' ');

      ctx.textAlign = 'center';
      ctx.textBaseline = elem._baseline;

      // TODO: Estimate this better
      var width = ctx.measureText(elem._value).width * 1.25;
      var height = Math.max(elem._size, elem._leading) * 1.25;

      if (this._linewidth && !webgl.isHidden.test(this._stroke)) {
        width += this._linewidth * 2;
        height += this._linewidth * 2;
      }

      var w = width / 2;
      var h = height / 2;

      switch (webgl.alignments[elem._alignment] || elem._alignment) {

        case webgl.alignments.left:
          rect.left = 0;
          rect.right = width;
          break;
        case webgl.alignments.right:
          rect.left = - width;
          rect.right = 0;
          break;
        default:
          rect.left = - w;
          rect.right = w;
      }

      // TODO: Gradients aren't inherited...
      switch (elem._baseline) {
        case 'bottom':
          rect.top = - height;
          rect.bottom = 0;
          break;
        case 'top':
          rect.top = 0;
          rect.bottom = height;
          break;
        default:
          rect.top = - h;
          rect.bottom = h;
      }

      rect.width = width;
      rect.height = height;

      if (!rect.centroid) {
        rect.centroid = {};
      }

      // TODO:
      rect.centroid.x = w;
      rect.centroid.y = h;

    },

    render: function(gl, program, forcedParent) {

      if (!this._visible || !this._opacity) {
        return this;
      }

      this._update();

      // Calculate what changed

      var parent = forcedParent || this.parent;
      var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      var flagMatrix = this._matrix.manual || this._flagMatrix;
      var parentChanged = this._renderer.parent !== parent;
      var flagTexture = this._flagVertices || this._flagFill
        || (this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
        || (this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
        || (this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale))
        || (this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
        || (this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
        || (this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale))
        || this._flagStroke || this._flagLinewidth || this._flagOpacity
        || parent._flagOpacity || this._flagVisible || this._flagScale
        || this._flagValue || this._flagFamily || this._flagSize
        || this._flagLeading || this._flagAlignment || this._flagBaseline
        || this._flagStyle || this._flagWeight || this._flagDecoration
        || (this.dashes && this.dashes.length > 0)
        || !this._renderer.texture;

      if (flagParentMatrix || flagMatrix || parentChanged) {

        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }

        // Reduce amount of object / array creation / deletion

        this._matrix.toTransformArray(true, transformation);

        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }

        if (parentChanged) {
          this._renderer.parent = parent;
        }
      }

      if (this._mask) {

        // Stencil away everything that isn't rendered by the mask
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);

        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // Don't draw the element onto the canvas, only onto the stencil buffer
        gl.colorMask(false, false, false, false);

        webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

        gl.stencilFunc(gl.EQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);

      }

      if (flagTexture) {

        if (!this._renderer.rect) {
          this._renderer.rect = {};
        }

        this._renderer.opacity = this._opacity * parent._renderer.opacity;

        webgl.text.getBoundingClientRect(this, this._renderer.rect);

        webgl.updateTexture.call(webgl, gl, this);

      } else {

        // We still need to update child Two elements on the fill and
        // stroke properties.
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }

      }

      if (this._clip && !forcedParent) {
        return;
      }

      // Draw Texture
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);

      // Draw Rect
      var rect = this._renderer.rect;
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }

      return this.flagReset();

    }

  },

  'linear-gradient': {

    render: function(ctx, elem) {

      if (!ctx.canvas.getContext('2d')) {
        return;
      }

      this._update();

      if (!this._renderer.effect || this._flagEndPoints || this._flagStops) {

        this._renderer.effect = ctx.createLinearGradient(
          this.left._x, this.left._y,
          this.right._x, this.right._y
        );

        for (var i = 0; i < this.stops.length; i++) {
          var stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }

      }

      return this.flagReset();

    }

  },

  'radial-gradient': {

    render: function(ctx, elem) {

      if (!ctx.canvas.getContext('2d')) {
        return;
      }

      this._update();

      if (!this._renderer.effect || this._flagCenter || this._flagFocal
          || this._flagRadius || this._flagStops) {

        this._renderer.effect = ctx.createRadialGradient(
          this.center._x, this.center._y, 0,
          this.focal._x, this.focal._y, this._radius
        );

        for (var i = 0; i < this.stops.length; i++) {
          var stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }

      }

      return this.flagReset();

    }

  },

  texture: {

    render: function(ctx, elem) {

      if (!ctx.canvas.getContext('2d')) {
        return;
      }

      this._update();

      var image = this.image;

      if (((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded)) {
        this._renderer.effect = ctx.createPattern(image, this._repeat);
      } else if (!this._renderer.effect) {
        return this.flagReset();
      }

      if (this._flagOffset || this._flagLoaded || this._flagScale) {

        if (!(this._renderer.offset instanceof Vector)) {
          this._renderer.offset = new Vector();
        }

        this._renderer.offset.x = - this._offset.x;
        this._renderer.offset.y = - this._offset.y;

        if (image) {

          this._renderer.offset.x += image.width / 2;
          this._renderer.offset.y += image.height / 2;

          if (this._scale instanceof Vector) {
            this._renderer.offset.x *= this._scale.x;
            this._renderer.offset.y *= this._scale.y;
          } else {
            this._renderer.offset.x *= this._scale;
            this._renderer.offset.y *= this._scale;
          }
        }

      }

      if (this._flagScale || this._flagLoaded) {

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }

        if (this._scale instanceof Vector) {
          this._renderer.scale.copy(this._scale);
        } else {
          this._renderer.scale.set(this._scale, this._scale);
        }

      }

      return this.flagReset();

    }

  },

  updateTexture: function(gl, elem) {

    this[elem._renderer.type].updateCanvas.call(webgl, elem);

    if (!elem._renderer.texture) {
      elem._renderer.texture = gl.createTexture();
    }

    gl.bindTexture(gl.TEXTURE_2D, elem._renderer.texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    if (this.canvas.width <= 0 || this.canvas.height <= 0) {
      return;
    }

    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

  },

  program: {

    create: function(gl, shaders) {
      var program, linked, error;
      program = gl.createProgram();
      _.each(shaders, function(s) {
        gl.attachShader(program, s);
      });

      gl.linkProgram(program);
      linked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!linked) {
        error = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new TwoError('unable to link program: ' + error);
      }

      return program;

    }

  },

  shaders: {

    create: function(gl, source, type) {
      var shader, compiled, error;
      shader = gl.createShader(gl[type]);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!compiled) {
        error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new TwoError('unable to compile shader ' + shader + ': ' + error);
      }

      return shader;

    },

    types: {
      vertex: 'VERTEX_SHADER',
      fragment: 'FRAGMENT_SHADER'
    },

    vertex: [
      'precision mediump float;',
      'attribute vec2 a_position;',
      '',
      'uniform mat3 u_matrix;',
      'uniform vec2 u_resolution;',
      'uniform vec4 u_rect;',
      '',
      'varying vec2 v_textureCoords;',
      '',
      'void main() {',
      '   vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;',
      '   vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;',
      '   vec2 normal = projected / u_resolution;',
      '   vec2 clipspace = (normal * 2.0) - 1.0;',
      '',
      '   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);',
      '   v_textureCoords = a_position;',
      '}'
    ].join('\n'),

    fragment: [
      'precision mediump float;',
      '',
      'uniform sampler2D u_image;',
      'varying vec2 v_textureCoords;',
      '',
      'void main() {',
      '  vec4 texel = texture2D(u_image, v_textureCoords);',
      '  if (texel.a == 0.0) {',
      '    discard;',
      '  }',
      '  gl_FragColor = texel;',
      '}'
    ].join('\n')

  },

  TextureRegistry: new Registry()

};

webgl.ctx = webgl.canvas.getContext('2d');

/**
 * @name Two.WebGLRenderer
 * @class
 * @extends Two.Events
 * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
 * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
 * @param {HTMLCanvasElement} [parameters.offscreenElement] - The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates.
 * @param {Boolean} [parameters.antialias] - Determines whether the canvas should clear render with antialias on.
 * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.
 * @see {@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
 */
function Renderer(params) {

  var gl, vs, fs;

  /**
   * @name Two.WebGLRenderer#domElement
   * @property {Element} - The `<canvas />` associated with the Two.js scene.
   */
  this.domElement = params.domElement || document.createElement('canvas');

  if (typeof params.offscreenElement !== 'undefined') {
    webgl.canvas = params.offscreenElement;
    webgl.ctx = webgl.canvas.getContext('2d');
  }

  /**
   * @name Two.WebGLRenderer#scene
   * @property {Two.Group} - The root group of the scenegraph.
   */
  this.scene = new Group();
  this.scene.parent = this;

  this._renderer = {
    type: 'renderer',
    matrix: new NumArray(identity),
    scale: 1,
    opacity: 1
  };
  this._flagMatrix = true;

  // http://games.greggman.com/game/webgl-and-alpha/
  // http://www.khronos.org/registry/webgl/specs/latest/#5.2
  params = _.defaults(params || {}, {
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    stencil: true,
    preserveDrawingBuffer: true,
    overdraw: false
  });

  /**
   * @name Two.WebGLRenderer#overdraw
   * @property {Boolean} - Determines whether the canvas clears the background each draw call.
   * @default true
   */
  this.overdraw = params.overdraw;

  /**
   * @name Two.WebGLRenderer#ctx
   * @property {WebGLContext} - Associated two dimensional context to render on the `<canvas />`.
   */
  gl = this.ctx = this.domElement.getContext('webgl', params) ||
    this.domElement.getContext('experimental-webgl', params);

  if (!this.ctx) {
    throw new TwoError(
      'unable to create a webgl context. Try using another renderer.');
  }

  // Compile Base Shaders to draw in pixel space.
  vs = webgl.shaders.create(
    gl, webgl.shaders.vertex, webgl.shaders.types.vertex);
  fs = webgl.shaders.create(
    gl, webgl.shaders.fragment, webgl.shaders.types.fragment);

  /**
   * @name Two.WebGLRenderer#program
   * @property {WebGLProgram} - Associated WebGL program to render all elements from the scenegraph.
   */
  this.program = webgl.program.create(gl, [vs, fs]);
  gl.useProgram(this.program);

  // Create and bind the drawing buffer

  // look up where the vertex data needs to go.
  this.program.position = gl.getAttribLocation(this.program, 'a_position');
  this.program.matrix = gl.getUniformLocation(this.program, 'u_matrix');
  this.program.rect = gl.getUniformLocation(this.program, 'u_rect');

  // Bind the vertex buffer
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(this.program.position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(this.program.position);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new NumArray([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    ]),
    gl.STATIC_DRAW);

  // Setup some initial statements of the gl context
  gl.enable(gl.BLEND);

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
}

_.extend(Renderer, {

  /**
   * @name Two.WebGLRenderer.Utils
   * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.
   */
  Utils: webgl

});

_.extend(Renderer.prototype, Events, {

  constructor: Renderer,

  /**
   * @name Two.WebGLRenderer#setSize
   * @function
   * @fires resize
   * @param {Number} width - The new width of the renderer.
   * @param {Number} height - The new height of the renderer.
   * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
   * @description Change the size of the renderer.
   */
  setSize: function(width, height, ratio) {

    this.width = width;
    this.height = height;

    this.ratio = typeof ratio === 'undefined' ? getRatio(this.ctx) : ratio;

    this.domElement.width = width * this.ratio;
    this.domElement.height = height * this.ratio;

    if (_.isObject(this.domElement.style)) {
      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px'
      });
    }

    // Set for this.stage parent scaling to account for HDPI
    this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio;

    this._flagMatrix = true;

    this.ctx.viewport(0, 0, width * this.ratio, height * this.ratio);

    var resolutionLocation = this.ctx.getUniformLocation(
      this.program, 'u_resolution');
    this.ctx.uniform2f(resolutionLocation, width * this.ratio, height * this.ratio);

    return this.trigger(Events.Types.resize, width, height, ratio);

  },

  /**
   * @name Two.WebGLRenderer#render
   * @function
   * @description Render the current scene to the `<canvas />`.
   */
  render: function() {

    var gl = this.ctx;

    if (!this.overdraw) {
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    webgl.group.render.call(this.scene, gl, this.program);
    this._flagMatrix = false;

    return this;

  }

});

// Utils

/**
 * @name Two
 * @class
 * @global
 * @param {Object} [options]
 * @param {Boolean} [options.fullscreen=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well.
 * @param {Boolean} [options.fitted=false] = Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`.
 * @param {Number} [options.width=640] - The width of the stage on construction. This can be set at a later time.
 * @param {Number} [options.height=480] - The height of the stage on construction. This can be set at a later time.
 * @param {String} [options.type=Two.Types.svg] - The type of renderer to setup drawing with. See {@link Two.Types} for available options.
 * @param {Boolean} [options.autostart=false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
 * @param {Element} [options.domElement] - The canvas or SVG element to draw into. This overrides the `options.type` argument.
 * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
 */
function Two(options) {

  // Determine what Renderer to use and setup a scene.

  var params = _.defaults(options || {}, {
    fullscreen: false,
    fitted: false,
    width: 640,
    height: 480,
    type: Two.Types.svg,
    autostart: false
  });

  _.each(params, function(v, k) {
    if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
      return;
    }
    this[k] = v;
  }, this);

  // Specified domElement overrides type declaration only if the element does not support declared renderer type.
  if (_.isElement(params.domElement)) {
    var tagName = params.domElement.tagName.toLowerCase();
    // TODO: Reconsider this if statement's logic.
    if (!/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type+'-'+tagName)) {
      this.type = Two.Types[tagName];
    }
  }

  this.renderer = new Two[this.type](this);
  this.setPlaying(params.autostart);
  this.frameCount = 0;

  /**
   * @name Two#fit
   * @function
   * @description If `options.fullscreen` or `options.fitted` in construction create this function. It sets the `width` and `height` of the instance to its respective parent `window` or `element` depending on the `options` passed.
   */
  if (params.fullscreen) {

    this.fit = fitToWindow.bind(this);
    this.fit.domElement = window;
    this.fit.attached = true;
    _.extend(document.body.style, {
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'fixed'
    });
    _.extend(this.renderer.domElement.style, {
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'fixed'
    });
    dom.bind(this.fit.domElement, 'resize', this.fit);
    this.fit();

  } else if (params.fitted) {

    this.fit = fitToParent.bind(this);
    _.extend(this.renderer.domElement.style, {
      display: 'block'
    });

  } else if (!_.isElement(params.domElement)) {

    this.renderer.setSize(params.width, params.height, this.ratio);
    this.width = params.width;
    this.height = params.height;

  }

  this.renderer.bind(Events.Types.resize, updateDimensions.bind(this));
  this.scene = this.renderer.scene;

  Two.Instances.push(this);
  if (params.autostart) {
    raf.init();
  }

}

_.extend(Two, Constants);

_.extend(Two.prototype, Events, {

  constructor: Two,

  /**
   * @name Two#type
   * @property {String} - A string representing which type of renderer the instance has instantiated.
   */
  type: '',

  /**
   * @name Two#renderer
   * @property {(Two.SVGRenderer|Two.CanvasRenderer|Two.WebGLRenderer)} - The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.
   */
  renderer: null,

  /**
   * @name Two#scene
   * @property {Two.Group} - The base level {@link Two.Group} which houses all objects for the instance. Because it is a {@link Two.Group} transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.
   */
  scene: null,

  /**
   * @name Two#width
   * @property {Number} - The width of the instance's dom element.
   */
  width: 0,

  /**
   * @name Two#height
   * @property {Number} - The height of the instance's dom element.
   */
  height: 0,

  /**
   * @name Two#frameCount
   * @property {Number} - An integer representing how many frames have elapsed.
   */
  frameCount: 0,

  /**
   * @name Two#timeDelta
   * @property {Number} - A number representing how much time has elapsed since the last frame in milliseconds.
   */
  timeDelta: 0,

  /**
   * @name Two#playing
   * @property {Boolean} - A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.
   */
  playing: false,

  /**
   * @name Two#appendTo
   * @function
   * @param {Element} elem - The DOM element to append the Two.js stage to.
   * @description Shorthand method to append your instance of Two.js to the `document`.
   */
  appendTo: function(elem) {

    elem.appendChild(this.renderer.domElement);

    if (this.fit) {
      if (this.fit.domElement !== window) {
        this.fit.domElement = elem;
        this.fit.attached = false;
      }
      this.update();
    }

    return this;

  },

  /**
   * @name Two#play
   * @function
   * @fires Two.Events.Types.play event
   * @description Call to start an internal animation loop.
   * @nota-bene This function initiates a `requestAnimationFrame` loop.
   */
  play: function() {

    this.playing = true;
    raf.init();
    return this.trigger(Events.Types.play);

  },

  /**
   * @name Two#pause
   * @function
   * @fires Two.Events.Types.pause event
   * @description Call to stop the internal animation loop for a specific instance of Two.js.
   */
  pause: function() {

    this.playing = false;
    return this.trigger(Events.Types.pause);

  },

  setPlaying: function(p) {
    this.playing = p;
  },

  /**
   * @name Two#release
   * @function
   * @param {Object} obj
   * @returns {Object} The object passed for event deallocation.
   * @description Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.
   */
  release: function(obj) {

    var i, v, child;

    if (!_.isObject(obj)) {
      return;
    }

    if (typeof obj.unbind === 'function') {
      obj.unbind();
    }

    if (obj.vertices) {
      if (typeof obj.vertices.unbind === 'function') {
        obj.vertices.unbind();
      }
      for (i = 0; i < obj.vertices.length; i++) {
        v = obj.vertices[i];
        if (typeof v.unbind === 'function') {
          v.unbind();
        }
      }
    }

    if (obj.children) {
      for (i = 0; i < obj.children.length; i++) {
        child = obj.children[i];
        this.release(child);
      }
    }

    return obj;

  },

  /**
   * @name Two#update
   * @function
   * @fires Two.Events.Types.update event
   * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
   * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
   */
  update: function() {

    var animated = !!this._lastFrame;
    var now = _.performance.now();

    if (animated) {
      this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
    }
    this._lastFrame = now;

    if (this.fit && this.fit.domElement && !this.fit.attached) {
        dom.bind(this.fit.domElement, 'resize', this.fit);
        this.fit.attached = true;
        this.fit();
    }

    var width = this.width;
    var height = this.height;
    var renderer = this.renderer;

    // Update width / height for the renderer
    if (width !== renderer.width || height !== renderer.height) {
      renderer.setSize(width, height, this.ratio);
    }

    this.trigger(Events.Types.update, this.frameCount, this.timeDelta);

    return this.render();

  },

  /**
   * @name Two#render
   * @function
   * @fires render
   * @description Render all drawable and visible objects of the scene.
   */
  render: function() {

    this.renderer.render();
    return this.trigger(Events.Types.render, this.frameCount++);

  },

  // Convenience Methods

  /**
   * @name Two#add
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
   * @description A shorthand method to add specific Two.js objects to the scene.
   */
  add: function(o) {

    var objects = o;
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    this.scene.add(objects);
    return this;

  },

  /**
   * @name Two#remove
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects.
   * @description A shorthand method to remove specific Two.js objects from the scene.
   */
  remove: function(o) {

    var objects = o;
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    this.scene.remove(objects);

    return this;

  },

  /**
   * @name Two#clear
   * @function
   * @description Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.
   */
  clear: function() {

    this.scene.remove(this.scene.children);
    return this;

  },

  /**
   * @name Two#makeLine
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @returns {Two.Line}
   * @description Creates a Two.js line and adds it to the scene.
   */
  makeLine: function(x1, y1, x2, y2) {

    var line = new Line(x1, y1, x2, y2);
    this.scene.add(line);

    return line;

  },

  /**
   * @name Two#makeArrow
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @returns {Two.Path}
   * @description Creates a Two.js arrow and adds it to the scene.
   */
  makeArrow: function(x1, y1, x2, y2, size) {

    var headlen = typeof size === 'number' ? size : 10;

    var angle = Math.atan2(y2 - y1, x2 - x1);

    var vertices = [

      new Anchor(x1, y1, undefined, undefined, undefined, undefined, Commands.move),
      new Anchor(x2, y2, undefined, undefined, undefined, undefined, Commands.line),
      new Anchor(
        x2 - headlen * Math.cos(angle - Math.PI / 4),
        y2 - headlen * Math.sin(angle - Math.PI / 4),
        undefined, undefined, undefined, undefined, Commands.line
      ),

      new Anchor(x2, y2, undefined, undefined, undefined, undefined, Commands.move),
      new Anchor(
        x2 - headlen * Math.cos(angle + Math.PI / 4),
        y2 - headlen * Math.sin(angle + Math.PI / 4),
        undefined, undefined, undefined, undefined, Commands.line
      )

    ];

    var path = new Path(vertices, false, false, true);
    path.noFill();
    path.cap = 'round';
    path.join = 'round';

    this.scene.add(path);

    return path;
  },

  /**
   * @name Two#makeRectangle
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @returns {Two.Rectangle}
   * @description Creates a Two.js rectangle and adds it to the scene.
   */
  makeRectangle: function(x, y, width, height) {

    var rect = new Rectangle(x, y, width, height);
    this.scene.add(rect);

    return rect;

  },

  /**
   * @name Two#makeRoundedRectangle
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Number} sides
   * @returns {Two.Rectangle}
   * @description Creates a Two.js rounded rectangle and adds it to the scene.
   */
  makeRoundedRectangle: function(x, y, width, height, sides) {

    var rect = new RoundedRectangle(x, y, width, height, sides);
    this.scene.add(rect);

    return rect;

  },

  /**
   * @name Two#makeCircle
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Number} [resolution=4]
   * @returns {Two.Circle}
   * @description Creates a Two.js circle and adds it to the scene.
   */
  makeCircle: function(x, y, radius, resolution) {

    var circle = new Circle(x, y, radius, resolution);
    this.scene.add(circle);

    return circle;

  },

  /**
   * @name Two#makeEllipse
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} rx
   * @param {Number} ry
   * @param {Number} [resolution=4]
   * @returns {Two.Ellipse}
   * @description Creates a Two.js ellipse and adds it to the scene.
   */
  makeEllipse: function(x, y, rx, ry, resolution) {

    var ellipse = new Ellipse(x, y, rx, ry, resolution);
    this.scene.add(ellipse);

    return ellipse;

  },

  /**
   * @name Two#makeStar
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} outerRadius
   * @param {Number} innerRadius
   * @param {Number} sides
   * @returns {Two.Star}
   * @description Creates a Two.js star and adds it to the scene.
   */
  makeStar: function(ox, oy, outerRadius, innerRadius, sides) {

    var star = new Star(ox, oy, outerRadius, innerRadius, sides);
    this.scene.add(star);

    return star;

  },

  /**
   * @name Two#makeCurve
   * @function
   * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points.
   * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
   * @returns {Two.Path} - Where `path.curved` is set to `true`.
   * @description Creates a Two.js path that is curved and adds it to the scene.
   * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
   */
  makeCurve: function(p) {

    var l = arguments.length, points = p;
    if (!Array.isArray(p)) {
      points = [];
      for (var i = 0; i < l; i+=2) {
        var x = arguments[i];
        if (typeof x !== 'number') {
          break;
        }
        var y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }

    var last = arguments[l - 1];
    var curve = new Path(points, !(typeof last === 'boolean' ? last : undefined), true);
    var rect = curve.getBoundingClientRect();
    curve.center().translation
      .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

    this.scene.add(curve);

    return curve;

  },

  /**
   * @name Two#makePolygon
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Number} sides
   * @returns {Two.Polygon}
   * @description Creates a Two.js polygon and adds it to the scene.
   */
  makePolygon: function(x, y, radius, sides) {

    var poly = new Polygon(x, y, radius, sides);
    this.scene.add(poly);

    return poly;

  },

  /**
   * @name Two#makeArcSegment
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} innerRadius
   * @param {Number} outerRadius
   * @param {Number} startAngle
   * @param {Number} endAngle
   * @param {Number} [resolution=Two.Resolution] - The number of vertices that should comprise the arc segment.
   */
  makeArcSegment: function(ox, oy, ir, or, sa, ea, res) {
    var arcSegment = new ArcSegment(ox, oy, ir, or, sa, ea, res);
    this.scene.add(arcSegment);
    return arcSegment;
  },

  /**
   * @name Two#makePath
   * @function
   * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points.
   * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
   * @returns {Two.Path}
   * @description Creates a Two.js path and adds it to the scene.
   * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
   */
  makePath: function(p) {

    var l = arguments.length, points = p;
    if (!Array.isArray(p)) {
      points = [];
      for (var i = 0; i < l; i+=2) {
        var x = arguments[i];
        if (typeof x !== 'number') {
          break;
        }
        var y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }

    var last = arguments[l - 1];
    var path = new Path(points, !(typeof last === 'boolean' ? last : undefined));
    var rect = path.getBoundingClientRect();
    if (typeof rect.top === 'number'   && typeof rect.left === 'number' &&
        typeof rect.right === 'number' && typeof rect.bottom === 'number') {
      path.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    this.scene.add(path);

    return path;

  },

  /**
   * @name Two#makeText
   * @function
   * @param {String} message
   * @param {Number} x
   * @param {Number} y
   * @param {Object} [styles] - An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc..
   * @returns {Two.Text}
   * @description Creates a Two.js text object and adds it to the scene.
   */
  makeText: function(message, x, y, styles) {
    var text = new Text(message, x, y, styles);
    this.add(text);
    return text;
  },

  /**
   * @name Two#makeLinearGradient
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @param {...Two.Stop} stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
   * @returns {Two.LinearGradient}
   * @description Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
   */
  makeLinearGradient: function(x1, y1, x2, y2 /* stops */) {

    var stops = Array.prototype.slice.call(arguments, 4);
    var gradient = new LinearGradient(x1, y1, x2, y2, stops);

    this.add(gradient);

    return gradient;

  },

  /**
   * @name Two#makeRadialGradient
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} radius
   * @param {...Two.Stop} stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
   * @returns {Two.RadialGradient}
   * @description Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
   */
  makeRadialGradient: function(x1, y1, r /* stops */) {

    var stops = Array.prototype.slice.call(arguments, 3);
    var gradient = new RadialGradient(x1, y1, r, stops);

    this.add(gradient);

    return gradient;

  },

  /**
   * @name Two#makeSprite
   * @function
   * @param {(String|Two.Texture)} pathOrTexture - The URL path to an image or an already created {@link Two.Texture}.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} [columns=1]
   * @param {Number} [rows=1]
   * @param {Number} [frameRate=0]
   * @param {Boolean} [autostart=false]
   * @returns {Two.Sprite}
   * @description Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
   */
  makeSprite: function(path, x, y, cols, rows, frameRate, autostart) {

    var sprite = new Sprite(path, x, y, cols, rows, frameRate);
    if (autostart) {
      sprite.play();
    }
    this.add(sprite);

    return sprite;

  },

  /**
   * @name Two#makeImageSequence
   * @function
   * @param {(String[]|Two.Texture[])} pathsOrTextures - An array of paths or of {@link Two.Textures}.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} [frameRate=0]
   * @param {Boolean} [autostart=false]
   * @returns {Two.ImageSequence}
   * @description Creates a Two.js image sequence object and adds it to the scene.
   */
  makeImageSequence: function(paths, x, y, frameRate, autostart) {

    var imageSequence = new ImageSequence(paths, x, y, frameRate);
    if (autostart) {
      imageSequence.play();
    }
    this.add(imageSequence);

    return imageSequence;

  },

  /**
   * @name Two#makeTexture
   * @function
   * @param {(String|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)} [pathOrSource] - The URL path to an image or a DOM image-like element.
   * @param {Function} [callback] - Function to be invoked when the image is loaded.
   * @returns {Two.Texture}
   * @description Creates a Two.js texture object.
   */
  makeTexture: function(path, callback) {

    var texture = new Texture(path, callback);
    return texture;

  },

  /**
   * @name Two#makeGroup
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
   * @returns {Two.Group}
   * @description Creates a Two.js group object and adds it to the scene.
   */
  makeGroup: function(o) {

    var objects = o;
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    var group = new Group();
    this.scene.add(group);
    group.add(objects);

    return group;

  },

  /**
   * @name Two#interpret
   * @function
   * @param {SVGElement} SVGElement - The SVG node to be parsed.
   * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
   * @param {Boolean} add – Automatically add the reconstructed SVG node to scene.
   * @returns {Two.Group}
   * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.
   */
  interpret: function(SVGElement, shallow, add) {

    var tag = SVGElement.tagName.toLowerCase();

    add = (typeof add !== 'undefined') ? add : true;

    if (!(tag in read)) {
      return null;
    }

    var node = read[tag].call(this, SVGElement);

    if (add) {
      this.add(shallow && node instanceof Group ? node.children : node);
    } else if (node.parent) {
      // Remove `g` tags that have been added to scenegraph / DOM
      // in order to be compatible with `getById` methods.
      node.remove();
    }

    return node;

  },

  /**
   * @name Two#load
   * @function
   * @param {String|SVGElement} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
   * @param {Function} callback - Function to call once loading has completed.
   * @returns {Two.Group}
   * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
   */
  load: function(text, callback) {

    var group = new Group();
    var elem, i, j, child;

    var attach = (function(data) {

      dom.temp.innerHTML = data;

      for (i = 0; i < dom.temp.children.length; i++) {
        elem = dom.temp.children[i];
        if (/svg/i.test(elem.nodeName)) {
          child = this.interpret(elem);
          // Two.Utils.applySvgViewBox.call(this, group, elem.getAttribute('viewBox'));
          for (j = 0; j < child.children.length; j++) {
            group.add(child.children[j]);
          }
        } else {
          group.add(this.interpret(elem));
        }
      }

      if (typeof callback === 'function') {
        var svg = dom.temp.children.length <= 1
          ? dom.temp.children[0] : dom.temp.children;
        callback(group, svg);
      }

    }).bind(this);

    if (/.*\.svg/ig.test(text)) {

      xhr(text, attach);

      return group;

    }

    attach(text);

    return group;

  }

});

function fitToWindow() {

  var wr = document.body.getBoundingClientRect();

  var width = this.width = wr.width;
  var height = this.height = wr.height;

  this.renderer.setSize(width, height, this.ratio);

}

function fitToParent() {

  var parent = this.renderer.domElement.parentElement;
  if (!parent) {
    console.warn('Two.js: Attempting to fit to parent, but no parent found.');
    return;
  }
  var wr = parent.getBoundingClientRect();

  var width = this.width = wr.width;
  var height = this.height = wr.height;

  this.renderer.setSize(width, height, this.ratio);

}

function updateDimensions(width, height) {
  this.width = width;
  this.height = height;
  this.trigger(Events.Types.resize, width, height);
}

// Request Animation Frame

var raf = dom.getRequestAnimationFrame();

function loop() {

  for (var i = 0; i < Two.Instances.length; i++) {
    var t = Two.Instances[i];
    if (t.playing) {
      t.update();
    }
  }

  Two.nextFrameID = raf(loop);

}

raf.init = function() {
  loop();
  raf.init = function() {};
};

_.extend(Two, {
  Anchor: Anchor,
  Collection: Collection,
  Events: Events,
  Group: Group,
  Matrix: Matrix,
  Path: Path,
  Registry: Registry,
  Shape: Shape,
  Text: Text,
  Vector: Vector,

  Gradient: Gradient,
  ImageSequence: ImageSequence,
  LinearGradient: LinearGradient,
  RadialGradient: RadialGradient,
  Sprite: Sprite,
  Stop: Stop,
  Texture: Texture,

  ArcSegment: ArcSegment,
  Circle: Circle,
  Ellipse: Ellipse,
  Line: Line,
  Polygon: Polygon,
  Rectangle: Rectangle,
  RoundedRectangle: RoundedRectangle,
  Star: Star,

  CanvasRenderer: Renderer$2,
  SVGRenderer: Renderer$1,
  WebGLRenderer: Renderer,

  Commands: Commands,

  /**
   * @name Two.Utils
   * @property {Object} - A massive object filled with utility functions and properties.
   */
  Utils: _.extend({

    Error: TwoError,
    getRatio: getRatio,
    defineGetterSetter: defineGetterSetter,
    read: read,
    xhr: xhr

  }, _, CanvasShim, Curves, math)

});

export default Two;
