(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Proton = factory());
}(this, (function () { 'use strict';

var PI = 3.1415926;
var INFINITY = Infinity;

var MathUtil = {
  PI: PI,
  PIx2: PI * 2,
  PI_2: PI / 2,
  PI_180: PI / 180,
  N180_PI: 180 / PI,
  Infinity: -999,

  isInfinity: function isInfinity(num) {
    return num === this.Infinity || num === INFINITY;
  },
  randomAToB: function randomAToB(a, b) {
    var isInt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isInt) return a + Math.random() * (b - a);else return Math.floor(Math.random() * (b - a)) + a;
  },
  randomFloating: function randomFloating(center, f, isInt) {
    return this.randomAToB(center - f, center + f, isInt);
  },
  randomColor: function randomColor() {
    return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
  },
  randomZone: function randomZone(display) {},
  floor: function floor(num) {
    var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var digits = Math.pow(10, k);
    return Math.floor(num * digits) / digits;
  },
  degreeTransform: function degreeTransform(a) {
    return a * PI / 180;
  },
  toColor16: function toColor16(num) {
    return "#" + num.toString(16);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Span = function () {
  function Span(a, b, center) {
    classCallCheck(this, Span);

    if (Util.isArray(a)) {
      this.isArray = true;
      this.a = a;
    } else {
      this.isArray = false;
      this.a = Util.initValue(a, 1);
      this.b = Util.initValue(b, this.a);
      this.center = Util.initValue(center, false);
    }
  }

  createClass(Span, [{
    key: "getValue",
    value: function getValue() {
      var isInt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.isArray) {
        return Util.getRandFromArray(this.a);
      } else {
        if (!this.center) {
          return MathUtil.randomAToB(this.a, this.b, isInt);
        } else {
          return MathUtil.randomFloating(this.a, this.b, isInt);
        }
      }
    }

    /**
     * Returns a new Span object
     *
     * @memberof Proton#Proton.Util
     * @method setSpanValue
     *
     * @todo a, b and c should be 'Mixed' or 'Number'?
     *
     * @param {Mixed | Span} a
     * @param {Mixed}               b
     * @param {Mixed}               c
     *
     * @return {Span}
     */

  }], [{
    key: "setSpanValue",
    value: function setSpanValue(a, b, c) {
      if (a instanceof Span) {
        return a;
      } else {
        if (b === undefined) {
          return new Span(a);
        } else {
          if (c === undefined) return new Span(a, b);else return new Span(a, b, c);
        }
      }
    }

    /**
     * Returns the value from a Span, if the param is not a Span it will return the given parameter
     *
     * @memberof Proton#Proton.Util
     * @method getValue
     *
     * @param {Mixed | Span} pan
     *
     * @return {Mixed} the value of Span OR the parameter if it is not a Span
     */

  }, {
    key: "getSpanValue",
    value: function getSpanValue(pan) {
      return pan instanceof Span ? pan.getValue() : pan;
    }
  }]);
  return Span;
}();

var WebGLUtil = {
  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method ipot
   *
   * @todo add description
   * @todo add length description
   *
   * @param {Number} length
   *
   * @return {Boolean}
   */
  ipot: function ipot(length) {
    return (length & length - 1) === 0;
  },


  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method nhpot
   *
   * @todo add description
   * @todo add length description
   *
   * @param {Number} length
   *
   * @return {Number}
   */
  nhpot: function nhpot(length) {
    --length;
    for (var i = 1; i < 32; i <<= 1) {
      length = length | length >> i;
    }

    return length + 1;
  },


  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method makeTranslation
   *
   * @todo add description
   * @todo add tx, ty description
   * @todo add return description
   *
   * @param {Number} tx either 0 or 1
   * @param {Number} ty either 0 or 1
   *
   * @return {Object}
   */
  makeTranslation: function makeTranslation(tx, ty) {
    return [1, 0, 0, 0, 1, 0, tx, ty, 1];
  },


  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method makeRotation
   *
   * @todo add description
   * @todo add return description
   *
   * @param {Number} angleInRadians
   *
   * @return {Object}
   */
  makeRotation: function makeRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [c, -s, 0, s, c, 0, 0, 0, 1];
  },


  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method makeScale
   *
   * @todo add description
   * @todo add tx, ty description
   * @todo add return description
   *
   * @param {Number} sx either 0 or 1
   * @param {Number} sy either 0 or 1
   *
   * @return {Object}
   */
  makeScale: function makeScale(sx, sy) {
    return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
  },


  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method matrixMultiply
   *
   * @todo add description
   * @todo add a, b description
   * @todo add return description
   *
   * @param {Object} a
   * @param {Object} b
   *
   * @return {Object}
   */
  matrixMultiply: function matrixMultiply(a, b) {
    var a00 = a[0 * 3 + 0];
    var a01 = a[0 * 3 + 1];
    var a02 = a[0 * 3 + 2];
    var a10 = a[1 * 3 + 0];
    var a11 = a[1 * 3 + 1];
    var a12 = a[1 * 3 + 2];
    var a20 = a[2 * 3 + 0];
    var a21 = a[2 * 3 + 1];
    var a22 = a[2 * 3 + 2];
    var b00 = b[0 * 3 + 0];
    var b01 = b[0 * 3 + 1];
    var b02 = b[0 * 3 + 2];
    var b10 = b[1 * 3 + 0];
    var b11 = b[1 * 3 + 1];
    var b12 = b[1 * 3 + 2];
    var b20 = b[2 * 3 + 0];
    var b21 = b[2 * 3 + 1];
    var b22 = b[2 * 3 + 2];

    return [a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22];
  }
};

var DomUtil = {
  /**
   * Creates and returns a new canvas. The opacity is by default set to 0
   *
   * @memberof Proton#Proton.DomUtil
   * @method createCanvas
   *
   * @param {String} $id the canvas' id
   * @param {Number} $width the canvas' width
   * @param {Number} $height the canvas' height
   * @param {String} [$position=absolute] the canvas' position, default is 'absolute'
   *
   * @return {Object}
   */
  createCanvas: function createCanvas(id, width, height) {
    var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "absolute";

    var dom = document.createElement("canvas");

    dom.id = id;
    dom.width = width;
    dom.height = height;
    dom.style.opacity = 0;
    dom.style.position = position;
    this.transform(dom, -500, -500, 0, 0);

    return dom;
  },
  createDiv: function createDiv(id, width, height) {
    var dom = document.createElement("div");

    dom.id = id;
    dom.style.position = "absolute";
    this.resize(dom, width, height);

    return dom;
  },
  resize: function resize(dom, width, height) {
    dom.style.width = width + "px";
    dom.style.height = height + "px";
    dom.style.marginLeft = -width / 2 + "px";
    dom.style.marginTop = -height / 2 + "px";
  },


  /**
   * Adds a transform: translate(), scale(), rotate() to a given div dom for all browsers
   *
   * @memberof Proton#Proton.DomUtil
   * @method transform
   *
   * @param {HTMLDivElement} div
   * @param {Number} $x
   * @param {Number} $y
   * @param {Number} $scale
   * @param {Number} $rotate
   */
  transform: function transform(div, x, y, scale, rotate) {
    div.style.willChange = "transform";
    var transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ") rotate(" + rotate + "deg)";
    this.css3(div, "transform", transform);
  },
  transform3d: function transform3d(div, x, y, scale, rotate) {
    div.style.willChange = "transform";
    var transform = "translate3d(" + x + "px, " + y + "px, 0) scale(" + scale + ") rotate(" + rotate + "deg)";
    this.css3(div, "backfaceVisibility", "hidden");
    this.css3(div, "transform", transform);
  },
  css3: function css3(div, key, val) {
    var bkey = key.charAt(0).toUpperCase() + key.substr(1);

    div.style["Webkit" + bkey] = val;
    div.style["Moz" + bkey] = val;
    div.style["O" + bkey] = val;
    div.style["ms" + bkey] = val;
    div.style["" + key] = val;
  }
};

var imgsCache = {};
var canvasCache = {};
var canvasId = 0;

var ImgUtil = {
  /**
   * This will get the image data. It could be necessary to create a Proton.Zone.
   *
   * @memberof Proton#Proton.Util
   * @method getImageData
   *
   * @param {HTMLCanvasElement}   context any canvas, must be a 2dContext 'canvas.getContext('2d')'
   * @param {Object}              image   could be any dom image, e.g. document.getElementById('thisIsAnImgTag');
   * @param {Proton.Rectangle}    rect
   */
  getImageData: function getImageData(context, image, rect) {
    context.drawImage(image, rect.x, rect.y);
    var imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);
    context.clearRect(rect.x, rect.y, rect.width, rect.height);

    return imagedata;
  },


  /**
   * @memberof Proton#Proton.Util
   * @method getImgFromCache
   *
   * @todo add description
   * @todo describe func
   *
   * @param {Mixed}               img
   * @param {Proton.Particle}     particle
   * @param {Boolean}             drawCanvas  set to true if a canvas should be saved into particle.data.canvas
   * @param {Boolean}             func
   */
  getImgFromCache: function getImgFromCache(img, callback, param) {
    var src = typeof img === "string" ? img : img.src;

    if (imgsCache[src]) {
      callback(imgsCache[src], param);
    } else {
      var image = new Image();
      image.onload = function (e) {
        imgsCache[src] = e.target;
        callback(imgsCache[src], param);
      };

      image.src = src;
    }
  },
  getCanvasFromCache: function getCanvasFromCache(img, callback, param) {
    var src = img.src;

    if (!canvasCache[src]) {
      var width = WebGLUtil.nhpot(img.width);
      var height = WebGLUtil.nhpot(img.height);

      var canvas = DomUtil.createCanvas("proton_canvas_cache_" + ++canvasId, width, height);
      var context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, img.width, img.height);

      canvasCache[src] = canvas;
    }

    callback && callback(canvasCache[src], param);

    return canvasCache[src];
  }
};

var Util = {
  /**
   * Returns the default if the value is null or undefined
   *
   * @memberof Proton#Proton.Util
   * @method initValue
   *
   * @param {Mixed} value a specific value, could be everything but null or undefined
   * @param {Mixed} defaults the default if the value is null or undefined
   */
  initValue: function initValue(value, defaults) {
    value = value !== null && value !== undefined ? value : defaults;
    return value;
  },


  /**
   * Checks if the value is a valid array
   *
   * @memberof Proton#Proton.Util
   * @method isArray
   *
   * @param {Array} value Any array
   *
   * @returns {Boolean}
   */
  isArray: function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },


  /**
   * Destroyes the given array
   *
   * @memberof Proton#Proton.Util
   * @method emptyArray
   *
   * @param {Array} array Any array
   */
  emptyArray: function emptyArray(arr) {
    if (arr) arr.length = 0;
  },
  toArray: function toArray(arr) {
    return this.isArray(arr) ? arr : [arr];
  },
  getRandFromArray: function getRandFromArray(arr) {
    if (!arr) return null;
    return arr[Math.floor(arr.length * Math.random())];
  },


  /**
   * Destroyes the given object
   *
   * @memberof Proton#Proton.Util
   * @method emptyObject
   *
   * @param {Object} obj Any object
   */
  emptyObject: function emptyObject(obj) {
    var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    for (var key in obj) {
      if (ignore && ignore.indexOf(key) > -1) continue;
      delete obj[key];
    }
  },


  /**
   * Makes an instance of a class and binds the given array
   *
   * @memberof Proton#Proton.Util
   * @method classApply
   *
   * @param {Function} constructor A class to make an instance from
   * @param {Array} [args] Any array to bind it to the constructor
   *
   * @return {Object} The instance of constructor, optionally bind with args
   */
  classApply: function classApply(constructor) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!args) {
      return new constructor();
    } else {
      var FactoryFunc = constructor.bind.apply(constructor, [null].concat(args));
      return new FactoryFunc();
    }
  },


  /**
   * @memberof Proton#Proton.Util
   * @method setVectorVal
   *
   * @todo add description for param `target`
   * @todo add description for param `conf`
   * @todo add description for function
   *
   * @param {Object} target
   * @param {Object} conf
   */
  setVectorVal: function setVectorVal(particle) {
    var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!conf) return;

    if (this.hasProp(conf, "x")) particle.p.x = conf["x"];
    if (this.hasProp(conf, "y")) particle.p.y = conf["y"];

    if (this.hasProp(conf, "vx")) particle.v.x = conf["vx"];
    if (this.hasProp(conf, "vy")) particle.v.y = conf["vy"];

    if (this.hasProp(conf, "ax")) particle.a.x = conf["ax"];
    if (this.hasProp(conf, "ay")) particle.a.y = conf["ay"];

    if (this.hasProp(conf, "p")) particle.p.copy(conf["p"]);
    if (this.hasProp(conf, "v")) particle.v.copy(conf["v"]);
    if (this.hasProp(conf, "a")) particle.a.copy(conf["a"]);

    if (this.hasProp(conf, "position")) particle.p.copy(conf["position"]);
    if (this.hasProp(conf, "velocity")) particle.v.copy(conf["velocity"]);
    if (this.hasProp(conf, "accelerate")) particle.a.copy(conf["accelerate"]);
  },
  hasProp: function hasProp(target, key) {
    if (!target) return false;
    return target[key] !== undefined;
    // return obj.hasOwnProperty(key);
  },


  /**
   * set the prototype in a given prototypeObject
   *
   * @memberof Proton#Proton.Util
   * @method setProp
   *
   * @todo add description for param `target`
   * @todo translate desription from chinese to english
   *
   * @param {Object} target
   * @param {Object} prototypeObject An object of single prototypes
   *
   * @return {Object} target
   */
  setProp: function setProp(target, props) {
    for (var prop in props) {
      if (target.hasOwnProperty(prop)) {
        target[prop] = Span.getSpanValue(props[prop]);
      }
    }

    return target;
  },


  /**
   * This will get the image data. It could be necessary to create a Proton.Zone.
   *
   * @memberof Proton#Proton.Util
   * @method getImageData
   *
   * @param {HTMLCanvasElement}   context any canvas, must be a 2dContext 'canvas.getContext('2d')'
   * @param {Object}              image   could be any dom image, e.g. document.getElementById('thisIsAnImgTag');
   * @param {Proton.Rectangle}    rect
   */
  getImageData: function getImageData(context, image, rect) {
    return ImgUtil.getImageData(context, image, rect);
  },
  destroyAll: function destroyAll(arr) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var i = arr.length;

    while (i--) {
      try {
        arr[i].destroy(param);
      } catch (e) {}

      delete arr[i];
    }

    arr.length = 0;
  },
  assign: function assign(target, source) {
    if (typeof Object.assign !== "function") {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }

      return target;
    } else {
      return Object.assign(target, source);
    }
  }
};

var idsMap = {};

var Puid = {
  _index: 0,
  _cache: {},

  id: function id(type) {
    if (idsMap[type] === undefined || idsMap[type] === null) idsMap[type] = 0;
    return type + "_" + idsMap[type]++;
  },
  getId: function getId(target) {
    var uid = this.getIdFromCache(target);
    if (uid) return uid;

    uid = "PUID_" + this._index++;
    this._cache[uid] = target;
    return uid;
  },
  getIdFromCache: function getIdFromCache(target) {
    var obj = void 0,
        id = void 0;

    for (id in this._cache) {
      obj = this._cache[id];

      if (obj === target) return id;
      if (this.isBody(obj, target) && obj.src === target.src) return id;
    }

    return null;
  },
  isBody: function isBody(obj, target) {
    return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && (typeof target === "undefined" ? "undefined" : _typeof(target)) === "object" && obj.isInner && target.isInner;
  },
  getTarget: function getTarget(uid) {
    return this._cache[uid];
  }
};

/**
 * Pool is the cache pool of the proton engine, it is very important.
 *
 * get(target, params, uid)
 *  Class
 *    uid = Puid.getId -> Puid save target cache
 *    target.__puid = uid
 *
 *  body
 *    uid = Puid.getId -> Puid save target cache
 *
 *
 * expire(target)
 *  cache[target.__puid] push target
 *
 */
var Pool = function () {
  /**
   * @memberof! Proton#
   * @constructor
   * @alias Proton.Pool
   *
   * @todo add description
   * @todo add description of properties
   *
   * @property {Number} total
   * @property {Object} cache
   */
  function Pool(num) {
    classCallCheck(this, Pool);

    this.total = 0;
    this.cache = {};
  }

  /**
   * @todo add description
   *
   * @method get
   * @memberof Proton#Proton.Pool
   *
   * @param {Object|Function} target
   * @param {Object} [params] just add if `target` is a function
   *
   * @return {Object}
   */


  createClass(Pool, [{
    key: "get",
    value: function get$$1(target, params, uid) {
      var p = void 0;
      uid = uid || target.__puid || Puid.getId(target);

      if (this.cache[uid] && this.cache[uid].length > 0) {
        p = this.cache[uid].pop();
      } else {
        p = this.createOrClone(target, params);
      }

      p.__puid = target.__puid || uid;
      return p;
    }

    /**
     * @todo add description
     *
     * @method set
     * @memberof Proton#Proton.Pool
     *
     * @param {Object} target
     *
     * @return {Object}
     */

  }, {
    key: "expire",
    value: function expire(target) {
      return this.getCache(target.__puid).push(target);
    }

    /**
     * Creates a new class instance
     *
     * @todo add more documentation
     *
     * @method create
     * @memberof Proton#Proton.Pool
     *
     * @param {Object|Function} target any Object or Function
     * @param {Object} [params] just add if `target` is a function
     *
     * @return {Object}
     */

  }, {
    key: "createOrClone",
    value: function createOrClone(target, params) {
      this.total++;

      if (this.create) {
        return this.create(target, params);
      } else if (typeof target === "function") {
        return Util.classApply(target, params);
      } else {
        return target.clone();
      }
    }

    /**
     * @todo add description - what is in the cache?
     *
     * @method getCount
     * @memberof Proton#Proton.Pool
     *
     * @return {Number}
     */

  }, {
    key: "getCount",
    value: function getCount() {
      var count = 0;
      for (var id in this.cache) {
        count += this.cache[id].length;
      }return count++;
    }

    /**
     * Destroyes all items from Pool.cache
     *
     * @method destroy
     * @memberof Proton#Proton.Pool
     */

  }, {
    key: "destroy",
    value: function destroy() {
      for (var id in this.cache) {
        this.cache[id].length = 0;
        delete this.cache[id];
      }
    }

    /**
     * Returns Pool.cache
     *
     * @method getCache
     * @memberof Proton#Proton.Pool
     * @private
     *
     * @param {Number} uid the unique id
     *
     * @return {Object}
     */

  }, {
    key: "getCache",
    value: function getCache() {
      var uid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";

      if (!this.cache[uid]) this.cache[uid] = [];
      return this.cache[uid];
    }
  }]);
  return Pool;
}();

var Stats = function () {
  function Stats(proton) {
    classCallCheck(this, Stats);

    this.proton = proton;
    this.container = null;
    this.type = 1;

    this.emitterIndex = 0;
    this.rendererIndex = 0;
  }

  createClass(Stats, [{
    key: "update",
    value: function update(style, body) {
      this.add(style, body);

      var emitter = this.getEmitter();
      var renderer = this.getRenderer();
      var str = "";

      switch (this.type) {
        case 2:
          str += "emitter:" + this.proton.emitters.length + "<br>";
          if (emitter) str += "em speed:" + emitter.emitSpeed + "<br>";
          if (emitter) str += "pos:" + this.getEmitterPos(emitter);
          break;

        case 3:
          if (emitter) str += "initializes:" + emitter.initializes.length + "<br>";
          if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.initializes) + "</span><br>";
          if (emitter) str += "behaviours:" + emitter.behaviours.length + "<br>";
          if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.behaviours) + "</span><br>";
          break;

        case 4:
          if (renderer) str += renderer.name + "<br>";
          if (renderer) str += "body:" + this.getCreatedNumber(renderer) + "<br>";
          break;

        default:
          str += "particles:" + this.proton.getCount() + "<br>";
          str += "pool:" + this.proton.pool.getCount() + "<br>";
          str += "total:" + this.proton.pool.total;
      }

      this.container.innerHTML = str;
    }
  }, {
    key: "add",
    value: function add(style, body) {
      var _this = this;

      if (!this.container) {
        this.type = 1;

        this.container = document.createElement("div");
        this.container.style.cssText = ["position:absolute;bottom:0px;left:0;cursor:pointer;", "opacity:0.9;z-index:10000;padding:10px;font-size:12px;font-family:Helvetica,Arial,sans-serif;", "width:120px;height:50px;background-color:#002;color:#0ff;"].join("");

        this.container.addEventListener("click", function (e) {
          _this.type++;
          if (_this.type > 4) _this.type = 1;
        }, false);

        var bg = void 0,
            color = void 0;
        switch (style) {
          case 2:
            bg = "#201";
            color = "#f08";
            break;

          case 3:
            bg = "#020";
            color = "#0f0";
            break;

          default:
            bg = "#002";
            color = "#0ff";
        }

        this.container.style["background-color"] = bg;
        this.container.style["color"] = color;
      }

      if (!this.container.parentNode) {
        body = body || this.body || document.body;
        body.appendChild(this.container);
      }
    }
  }, {
    key: "getEmitter",
    value: function getEmitter() {
      return this.proton.emitters[this.emitterIndex];
    }
  }, {
    key: "getRenderer",
    value: function getRenderer() {
      return this.proton.renderers[this.rendererIndex];
    }
  }, {
    key: "concatArr",
    value: function concatArr(arr) {
      var result = "";
      if (!arr || !arr.length) return result;

      for (var i = 0; i < arr.length; i++) {
        result += (arr[i].name || "").substr(0, 1) + ".";
      }

      return result;
    }
  }, {
    key: "getCreatedNumber",
    value: function getCreatedNumber(renderer) {
      return renderer.pool.total || renderer.cpool && renderer.cpool.total || 0;
    }
  }, {
    key: "getEmitterPos",
    value: function getEmitterPos(e) {
      return Math.round(e.p.x) + "," + Math.round(e.p.y);
    }
  }]);
  return Stats;
}();

/*
 * EventDispatcher
 * This code reference since http://createjs.com/.
 *
 **/

var EventDispatcher = function () {
  function EventDispatcher() {
    classCallCheck(this, EventDispatcher);

    this._listeners = null;
  }

  createClass(EventDispatcher, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      if (!this._listeners) {
        this._listeners = {};
      } else {
        this.removeEventListener(type, listener);
      }

      if (!this._listeners[type]) this._listeners[type] = [];
      this._listeners[type].push(listener);

      return listener;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      if (!this._listeners) return;
      if (!this._listeners[type]) return;

      var arr = this._listeners[type];
      var length = arr.length;

      for (var i = 0; i < length; i++) {
        if (arr[i] === listener) {
          if (length === 1) {
            delete this._listeners[type];
          }

          // allows for faster checks.
          else {
              arr.splice(i, 1);
            }

          break;
        }
      }
    }
  }, {
    key: "removeAllEventListeners",
    value: function removeAllEventListeners(type) {
      if (!type) this._listeners = null;else if (this._listeners) delete this._listeners[type];
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(type, args) {
      var result = false;
      var listeners = this._listeners;

      if (type && listeners) {
        var arr = listeners[type];
        if (!arr) return result;

        // arr = arr.slice();
        // to avoid issues with items being removed or added during the dispatch

        var handler = void 0;
        var i = arr.length;
        while (i--) {
          handler = arr[i];
          result = result || handler(args);
        }
      }

      return !!result;
    }
  }, {
    key: "hasEventListener",
    value: function hasEventListener(type) {
      var listeners = this._listeners;
      return !!(listeners && listeners[type]);
    }
  }], [{
    key: "bind",
    value: function bind(target) {
      target.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
      target.prototype.hasEventListener = EventDispatcher.prototype.hasEventListener;
      target.prototype.addEventListener = EventDispatcher.prototype.addEventListener;
      target.prototype.removeEventListener = EventDispatcher.prototype.removeEventListener;
      target.prototype.removeAllEventListeners = EventDispatcher.prototype.removeAllEventListeners;
    }
  }]);
  return EventDispatcher;
}();

var Integration = function () {
  function Integration(type) {
    classCallCheck(this, Integration);

    this.type = type;
  }

  createClass(Integration, [{
    key: "calculate",
    value: function calculate(particles, time, damping) {
      this.eulerIntegrate(particles, time, damping);
    }

    // Euler Integrate
    // https://rosettacode.org/wiki/Euler_method

  }, {
    key: "eulerIntegrate",
    value: function eulerIntegrate(particle, time, damping) {
      if (!particle.sleep) {
        particle.old.p.copy(particle.p);
        particle.old.v.copy(particle.v);

        particle.a.multiplyScalar(1 / particle.mass);
        particle.v.add(particle.a.multiplyScalar(time));
        particle.p.add(particle.old.v.multiplyScalar(time));

        if (damping) particle.v.multiplyScalar(damping);

        particle.a.clear();
      }
    }
  }]);
  return Integration;
}();

var Proton = function () {

  /**
   * The constructor to add emitters
   *
   * @constructor Proton
   *
   * @todo proParticleCount is not in use
   * @todo add more documentation of the single properties and parameters
   *
   * @param {Number} [proParticleCount] not in use?
   * @param {Number} [integrationType=Proton.EULER]
   *
   * @property {String} [integrationType=Proton.EULER]
   * @property {Array} emitters   All added emitter
   * @property {Array} renderers  All added renderer
   * @property {Number} time      The active time
   * @property {Number} oldtime   The old time
   */


  // event name
  function Proton(integrationType) {
    classCallCheck(this, Proton);

    this.emitters = [];
    this.renderers = [];

    this.time = 0;
    this.now = 0;
    this.then = 0;
    this.elapsed = 0;

    this.stats = new Stats(this);
    this.pool = new Pool(80);

    this.integrationType = Util.initValue(integrationType, Proton.EULER);
    this.integrator = new Integration(this.integrationType);

    this._fps = "auto";
    this._interval = Proton.DEFAULT_INTERVAL;
  }

  // measure 1:100


  createClass(Proton, [{
    key: "addRenderer",


    /**
     * add a type of Renderer
     *
     * @method addRenderer
     * @memberof Proton
     * @instance
     *
     * @param {Renderer} render
     */
    value: function addRenderer(render) {
      render.init(this);
      this.renderers.push(render);
    }

    /**
     * @name add a type of Renderer
     *
     * @method addRenderer
     * @param {Renderer} render
     */

  }, {
    key: "removeRenderer",
    value: function removeRenderer(render) {
      var index = this.renderers.indexOf(render);
      this.renderers.splice(index, 1);
      render.remove(this);
    }

    /**
     * add the Emitter
     *
     * @method addEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Emitter} emitter
     */

  }, {
    key: "addEmitter",
    value: function addEmitter(emitter) {
      this.emitters.push(emitter);
      emitter.parent = this;

      this.dispatchEvent(Proton.EMITTER_ADDED, emitter);
    }

    /**
     * Removes an Emitter
     *
     * @method removeEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Proton.Emitter} emitter
     */

  }, {
    key: "removeEmitter",
    value: function removeEmitter(emitter) {
      var index = this.emitters.indexOf(emitter);
      this.emitters.splice(index, 1);
      emitter.parent = null;

      this.dispatchEvent(Proton.EMITTER_REMOVED, emitter);
    }

    /**
     * Updates all added emitters
     *
     * @method update
     * @memberof Proton
     * @instance
     */

  }, {
    key: "update",
    value: function update() {
      // 'auto' is the default browser refresh rate, the vast majority is 60fps
      if (this._fps === "auto") {
        this.dispatchEvent(Proton.PROTON_UPDATE);

        if (Proton.USE_CLOCK) {
          if (!this.then) this.then = new Date().getTime();
          this.now = new Date().getTime();
          this.elapsed = (this.now - this.then) * 0.001;
          // Fix bugs such as chrome browser switching tabs causing excessive time difference
          this.amendChangeTabsBug();

          if (this.elapsed > 0) this.emittersUpdate(this.elapsed);
          this.then = this.now;
        } else {
          this.emittersUpdate(Proton.DEFAULT_INTERVAL);
        }

        this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
      }

      // If the fps frame rate is set
      else {
          if (!this.then) this.then = new Date().getTime();
          this.now = new Date().getTime();
          this.elapsed = (this.now - this.then) * 0.001;

          if (this.elapsed > this._interval) {
            this.dispatchEvent(Proton.PROTON_UPDATE);
            this.emittersUpdate(this._interval);
            // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
            this.then = this.now - this.elapsed % this._interval * 1000;
            this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
          }
        }
    }
  }, {
    key: "emittersUpdate",
    value: function emittersUpdate(elapsed) {
      var i = this.emitters.length;
      while (i--) {
        this.emitters[i].update(elapsed);
      }
    }

    /**
     * @todo add description
     *
     * @method amendChangeTabsBug
     * @memberof Proton
     * @instance
     */

  }, {
    key: "amendChangeTabsBug",
    value: function amendChangeTabsBug() {
      if (!Proton.amendChangeTabsBug) return;
      if (this.elapsed > 0.5) {
        this.then = new Date().getTime();
        this.elapsed = 0;
      }
    }

    /**
     * Counts all particles from all emitters
     *
     * @method getCount
     * @memberof Proton
     * @instance
     */

  }, {
    key: "getCount",
    value: function getCount() {
      var total = 0;
      var i = this.emitters.length;

      while (i--) {
        total += this.emitters[i].particles.length;
      }return total;
    }
  }, {
    key: "getAllParticles",
    value: function getAllParticles() {
      var particles = [];
      var i = this.emitters.length;

      while (i--) {
        particles = particles.concat(this.emitters[i].particles);
      }return particles;
    }
  }, {
    key: "destroyAllEmitters",
    value: function destroyAllEmitters() {
      Util.destroyAll(this.emitters);
    }

    /**
     * Destroys everything related to this Proton instance. This includes all emitters, and all properties
     *
     * @method destroy
     * @memberof Proton
     * @instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this = this;

      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var destroyOther = function destroyOther() {
        _this.time = 0;
        _this.then = 0;
        _this.pool.destroy();

        Util.destroyAll(_this.emitters);
        Util.destroyAll(_this.renderers, _this.getAllParticles());
      };

      if (remove) {
        setTimeout(destroyOther, 200);
      } else {
        destroyOther();
      }
    }
  }, {
    key: "fps",
    set: function set$$1(fps) {
      this._fps = fps;
      this._interval = fps === "auto" ? Proton.DEFAULT_INTERVAL : MathUtil.floor(1 / fps, 7);
    },
    get: function get$$1() {
      return this._fps;
    }
  }]);
  return Proton;
}();

Proton.USE_CLOCK = false;
Proton.MEASURE = 100;
Proton.EULER = "euler";
Proton.RK2 = "runge-kutta2";
Proton.PARTICLE_CREATED = "PARTICLE_CREATED";
Proton.PARTICLE_UPDATE = "PARTICLE_UPDATE";
Proton.PARTICLE_SLEEP = "PARTICLE_SLEEP";
Proton.PARTICLE_DEAD = "PARTICLE_DEAD";
Proton.EMITTER_ADDED = "EMITTER_ADDED";
Proton.EMITTER_REMOVED = "EMITTER_REMOVED";
Proton.PROTON_UPDATE = "PROTON_UPDATE";
Proton.PROTON_UPDATE_AFTER = "PROTON_UPDATE_AFTER";
Proton.DEFAULT_INTERVAL = 0.0167;
Proton.amendChangeTabsBug = true;
EventDispatcher.bind(Proton);

var Rgb = function () {
  function Rgb() {
    var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 255;
    var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
    var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
    classCallCheck(this, Rgb);

    this.r = r;
    this.g = g;
    this.b = b;
  }

  createClass(Rgb, [{
    key: "reset",
    value: function reset() {
      this.r = 255;
      this.g = 255;
      this.b = 255;
    }
  }]);
  return Rgb;
}();

var ease = {
  easeLinear: function easeLinear(value) {
    return value;
  },
  easeInQuad: function easeInQuad(value) {
    return Math.pow(value, 2);
  },
  easeOutQuad: function easeOutQuad(value) {
    return -(Math.pow(value - 1, 2) - 1);
  },
  easeInOutQuad: function easeInOutQuad(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 2);

    return -0.5 * ((value -= 2) * value - 2);
  },
  easeInCubic: function easeInCubic(value) {
    return Math.pow(value, 3);
  },
  easeOutCubic: function easeOutCubic(value) {
    return Math.pow(value - 1, 3) + 1;
  },
  easeInOutCubic: function easeInOutCubic(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 3);

    return 0.5 * (Math.pow(value - 2, 3) + 2);
  },
  easeInQuart: function easeInQuart(value) {
    return Math.pow(value, 4);
  },
  easeOutQuart: function easeOutQuart(value) {
    return -(Math.pow(value - 1, 4) - 1);
  },
  easeInOutQuart: function easeInOutQuart(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 4);

    return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
  },
  easeInSine: function easeInSine(value) {
    return -Math.cos(value * MathUtil.PI_2) + 1;
  },
  easeOutSine: function easeOutSine(value) {
    return Math.sin(value * MathUtil.PI_2);
  },
  easeInOutSine: function easeInOutSine(value) {
    return -0.5 * (Math.cos(Math.PI * value) - 1);
  },
  easeInExpo: function easeInExpo(value) {
    return value === 0 ? 0 : Math.pow(2, 10 * (value - 1));
  },
  easeOutExpo: function easeOutExpo(value) {
    return value === 1 ? 1 : -Math.pow(2, -10 * value) + 1;
  },
  easeInOutExpo: function easeInOutExpo(value) {
    if (value === 0) return 0;

    if (value === 1) return 1;

    if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));

    return 0.5 * (-Math.pow(2, -10 * --value) + 2);
  },
  easeInCirc: function easeInCirc(value) {
    return -(Math.sqrt(1 - value * value) - 1);
  },
  easeOutCirc: function easeOutCirc(value) {
    return Math.sqrt(1 - Math.pow(value - 1, 2));
  },
  easeInOutCirc: function easeInOutCirc(value) {
    if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);
    return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
  },
  easeInBack: function easeInBack(value) {
    var s = 1.70158;
    return value * value * ((s + 1) * value - s);
  },
  easeOutBack: function easeOutBack(value) {
    var s = 1.70158;
    return (value = value - 1) * value * ((s + 1) * value + s) + 1;
  },
  easeInOutBack: function easeInOutBack(value) {
    var s = 1.70158;
    if ((value /= 0.5) < 1) return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));
    return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
  },
  getEasing: function getEasing(ease) {
    if (typeof ease === "function") return ease;else return this[ease] || this.easeLinear;
  }
};

var Vector2D = function () {
  function Vector2D(x, y) {
    classCallCheck(this, Vector2D);

    this.x = x || 0;
    this.y = y || 0;
  }

  createClass(Vector2D, [{
    key: "set",
    value: function set$$1(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.x = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
      return this;
    }
  }, {
    key: "getGradient",
    value: function getGradient() {
      if (this.x !== 0) return Math.atan2(this.y, this.x);else if (this.y > 0) return MathUtil.PI_2;else if (this.y < 0) return -MathUtil.PI_2;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;

      return this;
    }
  }, {
    key: "add",
    value: function add(v, w) {
      if (w !== undefined) {
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;

      return this;
    }
  }, {
    key: "addXY",
    value: function addXY(a, b) {
      this.x += a;
      this.y += b;

      return this;
    }
  }, {
    key: "addVectors",
    value: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;

      return this;
    }
  }, {
    key: "sub",
    value: function sub(v, w) {
      if (w !== undefined) {
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;

      return this;
    }
  }, {
    key: "subVectors",
    value: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;

      return this;
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(s) {
      if (s !== 0) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }

      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      this.x *= s;
      this.y *= s;

      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      return this.multiplyScalar(-1);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "lengthSq",
    value: function lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divideScalar(this.length());
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
  }, {
    key: "rotate",
    value: function rotate(tha) {
      var x = this.x;
      var y = this.y;

      this.x = x * Math.cos(tha) + y * Math.sin(tha);
      this.y = -x * Math.sin(tha) + y * Math.cos(tha);

      return this;
    }
  }, {
    key: "distanceToSquared",
    value: function distanceToSquared(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;

      return dx * dx + dy * dy;
    }
  }, {
    key: "lerp",
    value: function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;

      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.x === this.x && v.y === this.y;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.x = 0.0;
      this.y = 0.0;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector2D(this.x, this.y);
    }
  }]);
  return Vector2D;
}();

/** @typedef {import('../behaviour/Behaviour')} Behaviour */
/** @typedef {import('../math/Vector2D')} Vector2D */
/** @typedef {import('../utils/Rgb')} Rgb */
var Particle = function () {

  /**
   * the Particle class
   *
   * @class Proton.Particle
   * @constructor
   * @param {Object} pObj the parameters object;
   * for example {life:3,dead:false}
   */


  /** @type {Vector2D} */


  /** @type {Vector2D} */


  /** @type {object} */

  /** @type string */
  function Particle(conf) {
    classCallCheck(this, Particle);
    this.id = "";
    this.old = {};
    this.data = {};
    this.behaviours = [];
    this.p = [];
    this.v = [];
    this.a = [];
    this.rgb = {};

    /**
     * The particle's id;
     * @property id
     * @type {string}
     */
    this.name = "Particle";
    this.id = Puid.id(this.name);
    this.old = {};
    this.data = {};
    this.behaviours = [];

    this.p = new Vector2D();
    this.v = new Vector2D();
    this.a = new Vector2D();
    this.old.p = new Vector2D();
    this.old.v = new Vector2D();
    this.old.a = new Vector2D();

    this.rgb = new Rgb();
    this.reset();
    conf && Util.setProp(this, conf);
  }

  /** @type {Rgb} */


  /** @type {Vector2D} */


  /** @type {Behaviour[]} */


  /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} */


  createClass(Particle, [{
    key: "getDirection",
    value: function getDirection() {
      return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.life = Infinity;
      this.age = 0;

      this.dead = false;
      this.sleep = false;
      this.body = null;
      this.sprite = null;
      this.parent = null;

      this.energy = 1; // Energy Loss
      this.mass = 1;
      this.radius = 10;
      this.alpha = 1;
      this.scale = 1;
      this.rotation = 0;
      this.color = null;

      this.p.set(0, 0);
      this.v.set(0, 0);
      this.a.set(0, 0);
      this.old.p.set(0, 0);
      this.old.v.set(0, 0);
      this.old.a.set(0, 0);
      this.easing = ease.easeLinear;

      this.rgb.reset();
      Util.emptyObject(this.data);
      this.removeAllBehaviours();

      return this;
    }
  }, {
    key: "update",
    value: function update(time, index) {
      if (!this.sleep) {
        this.age += time;
        this.applyBehaviours(time, index);
      }

      if (this.age < this.life) {
        var scale = this.easing(this.age / this.life);
        this.energy = Math.max(1 - scale, 0);
      } else {
        this.destroy();
      }
    }
  }, {
    key: "applyBehaviours",
    value: function applyBehaviours(time, index) {
      var length = this.behaviours.length;
      var i = void 0;

      for (i = 0; i < length; i++) {
        this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
      }
    }

    /**
     * @param {Behaviour} behaviour
     */

  }, {
    key: "addBehaviour",
    value: function addBehaviour(behaviour) {
      this.behaviours.push(behaviour);

      if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
      behaviour.initialize(this);
    }

    /**
     * @param {Behaviour[]} behaviours
     */

  }, {
    key: "addBehaviours",
    value: function addBehaviours(behaviours) {
      var length = behaviours.length;
      var i = void 0;

      for (i = 0; i < length; i++) {
        this.addBehaviour(behaviours[i]);
      }
    }
  }, {
    key: "removeBehaviour",
    value: function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);

      if (index > -1) {
        var _behaviour = this.behaviours.splice(index, 1);
        _behaviour.parents = null;
      }
    }
  }, {
    key: "removeAllBehaviours",
    value: function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }

    /**
     * Destory this particle
     * @method destroy
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.removeAllBehaviours();
      this.energy = 0;
      this.dead = true;
      this.parent = null;
    }
  }]);
  return Particle;
}();

var ColorUtil = {
  /**
   * @typedef  {Object} rgbObject
   * @property {Number} r red value
   * @property {Number} g green value
   * @property {Number} b blue value
   */
  /**
   * converts a hex value to a rgb object
   *
   * @memberof Proton#Proton.Util
   * @method hexToRgb
   *
   * @param {String} h any hex value, e.g. #000000 or 000000 for black
   *
   * @return {rgbObject}
   */
  hexToRgb: function hexToRgb(h) {
    var hex16 = h.charAt(0) === "#" ? h.substring(1, 7) : h;
    var r = parseInt(hex16.substring(0, 2), 16);
    var g = parseInt(hex16.substring(2, 4), 16);
    var b = parseInt(hex16.substring(4, 6), 16);

    return { r: r, g: g, b: b };
  },


  /**
   * converts a rgb value to a rgb string
   *
   * @memberof Proton#Proton.Util
   * @method rgbToHex
   *
   * @param {Object | Proton.hexToRgb} rgb a rgb object like in {@link Proton#Proton.}
   *
   * @return {String} rgb()
   */
  rgbToHex: function rgbToHex(rbg) {
    return "rgb(" + rbg.r + ", " + rbg.g + ", " + rbg.b + ")";
  },
  getHex16FromParticle: function getHex16FromParticle(p) {
    return Number(p.rgb.r) * 65536 + Number(p.rgb.g) * 256 + Number(p.rgb.b);
  }
};

var Polar2D = function () {
  function Polar2D(r, tha) {
    classCallCheck(this, Polar2D);

    this.r = Math.abs(r) || 0;
    this.tha = tha || 0;
  }

  createClass(Polar2D, [{
    key: "set",
    value: function set$$1(r, tha) {
      this.r = r;
      this.tha = tha;
      return this;
    }
  }, {
    key: "setR",
    value: function setR(r) {
      this.r = r;
      return this;
    }
  }, {
    key: "setTha",
    value: function setTha(tha) {
      this.tha = tha;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(p) {
      this.r = p.r;
      this.tha = p.tha;
      return this;
    }
  }, {
    key: "toVector",
    value: function toVector() {
      return new Vector2D(this.getX(), this.getY());
    }
  }, {
    key: "getX",
    value: function getX() {
      return this.r * Math.sin(this.tha);
    }
  }, {
    key: "getY",
    value: function getY() {
      return -this.r * Math.cos(this.tha);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      this.r = 1;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.r === this.r && v.tha === this.tha;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.r = 0.0;
      this.tha = 0.0;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Polar2D(this.r, this.tha);
    }
  }]);
  return Polar2D;
}();

var Mat3 = {
  create: function create(mat3) {
    var mat = new Float32Array(9);
    if (mat3) this.set(mat3, mat);

    return mat;
  },
  set: function set(mat1, mat2) {
    for (var i = 0; i < 9; i++) {
      mat2[i] = mat1[i];
    }return mat2;
  },
  multiply: function multiply(mat, mat2, mat3) {
    var a00 = mat[0],
        a01 = mat[1],
        a02 = mat[2],
        a10 = mat[3],
        a11 = mat[4],
        a20 = mat[6],
        a21 = mat[7],
        b00 = mat2[0],
        b01 = mat2[1],
        b02 = mat2[2],
        b10 = mat2[3],
        b11 = mat2[4],
        b20 = mat2[6],
        b21 = mat2[7];

    mat3[0] = b00 * a00 + b01 * a10;
    mat3[1] = b00 * a01 + b01 * a11;
    mat3[2] = a02 * b02;
    mat3[3] = b10 * a00 + b11 * a10;
    mat3[4] = b10 * a01 + b11 * a11;
    mat3[6] = b20 * a00 + b21 * a10 + a20;
    mat3[7] = b20 * a01 + b21 * a11 + a21;

    return mat3;
  },
  inverse: function inverse(mat, mat3) {
    var a00 = mat[0],
        a01 = mat[1],
        a10 = mat[3],
        a11 = mat[4],
        a20 = mat[6],
        a21 = mat[7],
        b01 = a11,
        b11 = -a10,
        b21 = a21 * a10 - a11 * a20,
        d = a00 * b01 + a01 * b11,
        id = void 0;

    id = 1 / d;
    mat3[0] = b01 * id;
    mat3[1] = -a01 * id;
    mat3[3] = b11 * id;
    mat3[4] = a00 * id;
    mat3[6] = b21 * id;
    mat3[7] = (-a21 * a00 + a01 * a20) * id;

    return mat3;
  },
  multiplyVec2: function multiplyVec2(m, vec, mat3) {
    var x = vec[0],
        y = vec[1];

    mat3[0] = x * m[0] + y * m[3] + m[6];
    mat3[1] = x * m[1] + y * m[4] + m[7];

    return mat3;
  }
};

var ArraySpan = function (_Span) {
  inherits(ArraySpan, _Span);

  function ArraySpan(color) {
    classCallCheck(this, ArraySpan);

    var _this = possibleConstructorReturn(this, (ArraySpan.__proto__ || Object.getPrototypeOf(ArraySpan)).call(this));

    _this._arr = Util.toArray(color);
    return _this;
  }

  createClass(ArraySpan, [{
    key: "getValue",
    value: function getValue() {
      var val = Util.getRandFromArray(this._arr);
      return val === "random" || val === "Random" ? MathUtil.randomColor() : val;
    }

    /**
     * Make sure that the color is an instance of Proton.ArraySpan, if not it makes a new instance
     *
     * @method setSpanValue
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */

  }], [{
    key: "createArraySpan",
    value: function createArraySpan(arr) {
      if (!arr) return null;

      if (arr instanceof ArraySpan) return arr;else return new ArraySpan(arr);
    }
  }]);
  return ArraySpan;
}(Span);

var Rectangle = function () {
  function Rectangle(x, y, w, h) {
    classCallCheck(this, Rectangle);

    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
  }

  createClass(Rectangle, [{
    key: "contains",
    value: function contains(x, y) {
      if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y) return true;else return false;
    }
  }]);
  return Rectangle;
}();

var Rate = function () {
  /**
   * The number of particles per second emission (a [particle]/b [s]);
   * @namespace
   * @memberof! Proton#
   * @constructor
   * @alias Rate
   *
   * @param {Array | Number | Span} numpan the number of each emission;
   * @param {Array | Number | Span} timepan the time of each emission;
   * for example: new Rate(new Span(10, 20), new Span(.1, .25));
   */
  function Rate(numpan, timepan) {
    classCallCheck(this, Rate);

    this.numPan = Span.setSpanValue(Util.initValue(numpan, 1));
    this.timePan = Span.setSpanValue(Util.initValue(timepan, 1));

    this.startTime = 0;
    this.nextTime = 0;
    this.init();
  }

  createClass(Rate, [{
    key: "init",
    value: function init() {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();
    }
  }, {
    key: "getValue",
    value: function getValue(time) {
      this.startTime += time;

      if (this.startTime >= this.nextTime) {
        this.startTime = 0;
        this.nextTime = this.timePan.getValue();

        if (this.numPan.b === 1) {
          if (this.numPan.getValue(false) > 0.5) return 1;else return 0;
        } else {
          return this.numPan.getValue(true);
        }
      }

      return 0;
    }
  }]);
  return Rate;
}();

var Initialize = function () {
  function Initialize() {
    classCallCheck(this, Initialize);
  }

  createClass(Initialize, [{
    key: "reset",
    value: function reset() {}
  }, {
    key: "init",
    value: function init(emitter, particle) {
      if (particle) {
        this.initialize(particle);
      } else {
        this.initialize(emitter);
      }
    }

    // sub class init

  }, {
    key: "initialize",
    value: function initialize(target) {}
  }]);
  return Initialize;
}();

var Life = function (_Initialize) {
  inherits(Life, _Initialize);

  function Life(a, b, c) {
    classCallCheck(this, Life);

    var _this = possibleConstructorReturn(this, (Life.__proto__ || Object.getPrototypeOf(Life)).call(this));

    _this.lifePan = Span.setSpanValue(a, b, c);
    _this.name = "Life";
    return _this;
  }

  createClass(Life, [{
    key: "initialize",
    value: function initialize(target) {
      if (this.lifePan.a === Infinity) target.life = Infinity;else target.life = this.lifePan.getValue();
    }
  }]);
  return Life;
}(Initialize);

var Zone = function () {
  function Zone() {
    classCallCheck(this, Zone);

    this.vector = new Vector2D(0, 0);
    this.random = 0;
    this.crossType = "dead";
    this.alert = true;
  }

  createClass(Zone, [{
    key: "getPosition",
    value: function getPosition() {}
  }, {
    key: "crossing",
    value: function crossing(particle) {}
  }, {
    key: "destroy",
    value: function destroy() {
      this.vector = null;
    }
  }]);
  return Zone;
}();

var PointZone = function (_Zone) {
  inherits(PointZone, _Zone);

  function PointZone(x, y) {
    classCallCheck(this, PointZone);

    var _this = possibleConstructorReturn(this, (PointZone.__proto__ || Object.getPrototypeOf(PointZone)).call(this));

    _this.x = x;
    _this.y = y;
    return _this;
  }

  createClass(PointZone, [{
    key: "getPosition",
    value: function getPosition() {
      this.vector.x = this.x;
      this.vector.y = this.y;

      return this.vector;
    }
  }, {
    key: "crossing",
    value: function crossing(particle) {
      if (this.alert) {
        console.error("Sorry, PointZone does not support crossing method!");
        this.alert = false;
      }
    }
  }]);
  return PointZone;
}(Zone);

var Position = function (_Initialize) {
  inherits(Position, _Initialize);

  function Position(zone) {
    classCallCheck(this, Position);

    var _this = possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).call(this));

    _this.zone = Util.initValue(zone, new PointZone());
    _this.name = "Position";
    return _this;
  }

  createClass(Position, [{
    key: "reset",
    value: function reset(zone) {
      this.zone = Util.initValue(zone, new PointZone());
    }
  }, {
    key: "initialize",
    value: function initialize(target) {
      this.zone.getPosition();

      target.p.x = this.zone.vector.x;
      target.p.y = this.zone.vector.y;
    }
  }]);
  return Position;
}(Initialize);

var Velocity = function (_Initialize) {
  inherits(Velocity, _Initialize);

  function Velocity(rpan, thapan, type) {
    classCallCheck(this, Velocity);

    var _this = possibleConstructorReturn(this, (Velocity.__proto__ || Object.getPrototypeOf(Velocity)).call(this));

    _this.rPan = Span.setSpanValue(rpan);
    _this.thaPan = Span.setSpanValue(thapan);
    _this.type = Util.initValue(type, "vector");

    _this.name = "Velocity";
    return _this;
  }

  createClass(Velocity, [{
    key: "reset",
    value: function reset(rpan, thapan, type) {
      this.rPan = Span.setSpanValue(rpan);
      this.thaPan = Span.setSpanValue(thapan);
      this.type = Util.initValue(type, "vector");
    }
  }, {
    key: "normalizeVelocity",
    value: function normalizeVelocity(vr) {
      return vr * Proton.MEASURE;
    }
  }, {
    key: "initialize",
    value: function initialize(target) {
      if (this.type === "p" || this.type === "P" || this.type === "polar") {
        var polar2d = new Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * MathUtil.PI_180);

        target.v.x = polar2d.getX();
        target.v.y = polar2d.getY();
      } else {
        target.v.x = this.normalizeVelocity(this.rPan.getValue());
        target.v.y = this.normalizeVelocity(this.thaPan.getValue());
      }
    }
  }]);
  return Velocity;
}(Initialize);

var Mass = function (_Initialize) {
  inherits(Mass, _Initialize);

  function Mass(a, b, c) {
    classCallCheck(this, Mass);

    var _this = possibleConstructorReturn(this, (Mass.__proto__ || Object.getPrototypeOf(Mass)).call(this));

    _this.massPan = Span.setSpanValue(a, b, c);
    _this.name = "Mass";
    return _this;
  }

  createClass(Mass, [{
    key: "initialize",
    value: function initialize(target) {
      target.mass = this.massPan.getValue();
    }
  }]);
  return Mass;
}(Initialize);

var Radius = function (_Initialize) {
  inherits(Radius, _Initialize);

  function Radius(a, b, c) {
    classCallCheck(this, Radius);

    var _this = possibleConstructorReturn(this, (Radius.__proto__ || Object.getPrototypeOf(Radius)).call(this));

    _this.radius = Span.setSpanValue(a, b, c);

    _this.name = "Radius";
    return _this;
  }

  createClass(Radius, [{
    key: "reset",
    value: function reset(a, b, c) {
      this.radius = Span.setSpanValue(a, b, c);
    }
  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.radius = this.radius.getValue();
      particle.data.oldRadius = particle.radius;
    }
  }]);
  return Radius;
}(Initialize);

var Body = function (_Initialize) {
  inherits(Body, _Initialize);

  function Body(image, w, h) {
    classCallCheck(this, Body);

    var _this = possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this));

    _this.image = _this.setSpanValue(image);
    _this.w = Util.initValue(w, 20);
    _this.h = Util.initValue(h, _this.w);
    _this.name = "Body";
    return _this;
  }

  createClass(Body, [{
    key: "initialize",
    value: function initialize(particle) {
      var imageTarget = this.image.getValue();

      if (typeof imageTarget === "string") {
        particle.body = {
          width: this.w,
          height: this.h,
          src: imageTarget,
          isInner: true,
          inner: true
        };
      } else {
        particle.body = imageTarget;
      }
    }
  }, {
    key: "setSpanValue",
    value: function setSpanValue(image) {
      return image instanceof ArraySpan ? image : new ArraySpan(image);
    }
  }]);
  return Body;
}(Initialize);

var Behaviour = function () {

  /**
   * The Behaviour class is the base for the other Behaviour
   *
   * @memberof! -
   * @interface
   * @alias Proton.Behaviour
   *
   * @param {Number} life 	the behaviours life
   * @param {String} easing 	The behaviour's decaying trend, for example ease.easeOutQuart
   *
   * @property {String}  id 		The behaviours id
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   * @property {Number}  age=0 	How long the particle should be 'alife'
   * @property {Number}  energy=1
   * @property {Boolean} dead=false The particle is dead at first
   * @property {Array}   parents 	The behaviour's parents array
   * @property {String}  name 	The behaviour name
   */
  function Behaviour(life, easing) {
    classCallCheck(this, Behaviour);

    this.life = Util.initValue(life, Infinity);
    this.easing = ease.getEasing(easing);

    this.age = 0;
    this.energy = 1;
    this.dead = false;
    this.parents = [];

    this.id = "Behaviour_" + Behaviour.id++;
    this.name = "Behaviour";
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton.Behaviour
   * @instance
   *
   * @param {Number} [life=Infinity] 		this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   */


  createClass(Behaviour, [{
    key: "reset",
    value: function reset(life, easing) {
      this.life = Util.initValue(life, Infinity);
      this.easing = ease.getEasing(easing);
    }

    /**
     * Normalize a force by 1:100;
     *
     * @method normalizeForce
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Vector2D} force
     */

  }, {
    key: "normalizeForce",
    value: function normalizeForce(force) {
      return force.multiplyScalar(Proton.MEASURE);
    }

    /**
     * Normalize a value by 1:100;
     *
     * @method normalizeValue
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Number} value
     */

  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      return value * Proton.MEASURE;
    }

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {}

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */

  }, {
    key: "calculate",
    value: function calculate(particle, time, index) {
      this.age += time;

      if (this.age >= this.life || this.dead) {
        this.energy = 0;
        this.dead = true;
        this.destroy();
      } else {
        var scale = this.easing(particle.age / particle.life);
        this.energy = Math.max(1 - scale, 0);
      }
    }

    /**
     * Destory this behaviour
     *
     * @method destroy
     * @memberof Proton.Behaviour
     * @instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var i = this.parents.length;
      while (i--) {
        this.parents[i].removeBehaviour(this);
      }

      this.parents.length = 0;
    }
  }]);
  return Behaviour;
}();

Behaviour.id = 0;

var Force = function (_Behaviour) {
  inherits(Force, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Force
   *
   * @param {Number} fx
   * @param {Number} fy
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Force(fx, fy, life, easing) {
    classCallCheck(this, Force);

    var _this = possibleConstructorReturn(this, (Force.__proto__ || Object.getPrototypeOf(Force)).call(this, life, easing));

    _this.force = _this.normalizeForce(new Vector2D(fx, fy));
    _this.name = "Force";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Force
   * @instance
   *
   * @param {Number} fx
   * @param {Number} fy
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Force, [{
    key: "reset",
    value: function reset(fx, fy, life, easing) {
      this.force = this.normalizeForce(new Vector2D(fx, fy));

      life && get(Force.prototype.__proto__ || Object.getPrototypeOf(Force.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Force
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.a.add(this.force);
    }
  }]);
  return Force;
}(Behaviour);

var Attraction = function (_Behaviour) {
  inherits(Attraction, _Behaviour);

  /**
   * This behaviour let the particles follow one specific Proton.Vector2D
   *
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Attraction
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {Proton.Vector2D} targetPosition
   * @property {Number} radius
   * @property {Number} force
   * @property {Number} radiusSq
   * @property {Proton.Vector2D} attractionForce
   * @property {Number} lengthSq
   * @property {String} name The Behaviour name
   */
  function Attraction(targetPosition, force, radius, life, easing) {
    classCallCheck(this, Attraction);

    var _this = possibleConstructorReturn(this, (Attraction.__proto__ || Object.getPrototypeOf(Attraction)).call(this, life, easing));

    _this.targetPosition = Util.initValue(targetPosition, new Vector2D());
    _this.radius = Util.initValue(radius, 1000);
    _this.force = Util.initValue(_this.normalizeValue(force), 100);

    _this.radiusSq = _this.radius * _this.radius;
    _this.attractionForce = new Vector2D();
    _this.lengthSq = 0;

    _this.name = "Attraction";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Attraction
   * @instance
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Attraction, [{
    key: "reset",
    value: function reset(targetPosition, force, radius, life, easing) {
      this.targetPosition = Util.initValue(targetPosition, new Vector2D());
      this.radius = Util.initValue(radius, 1000);
      this.force = Util.initValue(this.normalizeValue(force), 100);

      this.radiusSq = this.radius * this.radius;
      this.attractionForce = new Vector2D();
      this.lengthSq = 0;

      life && get(Attraction.prototype.__proto__ || Object.getPrototypeOf(Attraction.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @memberof Proton#Proton.Attraction
     * @method applyBehaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);

      this.attractionForce.copy(this.targetPosition);
      this.attractionForce.sub(particle.p);
      this.lengthSq = this.attractionForce.lengthSq();

      if (this.lengthSq > 0.00004 && this.lengthSq < this.radiusSq) {
        this.attractionForce.normalize();
        this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq);
        this.attractionForce.multiplyScalar(this.force);

        particle.a.add(this.attractionForce);
      }
    }
  }]);
  return Attraction;
}(Behaviour);

var RandomDrift = function (_Behaviour) {
  inherits(RandomDrift, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Behaviour
   * @constructor
   * @alias RandomDrift
   *
   * @param {Number} driftX 				X value of the new Vector2D
   * @param {Number} driftY  				Y value of the new Vector2D
   * @param {Number} delay 				How much delay the drift should have
   * @param {Number} [life=Infinity] 		this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   *
   * @property {Number} time The time of the drift
   * @property {String} name The Behaviour name
   */
  function RandomDrift(driftX, driftY, delay, life, easing) {
    classCallCheck(this, RandomDrift);

    var _this = possibleConstructorReturn(this, (RandomDrift.__proto__ || Object.getPrototypeOf(RandomDrift)).call(this, life, easing));

    _this.reset(driftX, driftY, delay);
    _this.time = 0;
    _this.name = "RandomDrift";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#RandomDrift
   * @instance
   *
   * @param {Number} driftX 				X value of the new Vector2D
   * @param {Number} driftY  				Y value of the new Vector2D
   * @param {Number} delay 				How much delay the drift should have
   * @param {Number} [life=Infinity] 		this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   */


  createClass(RandomDrift, [{
    key: "reset",
    value: function reset(driftX, driftY, delay, life, easing) {
      this.panFoce = new Vector2D(driftX, driftY);
      this.panFoce = this.normalizeForce(this.panFoce);
      this.delay = delay;

      life && get(RandomDrift.prototype.__proto__ || Object.getPrototypeOf(RandomDrift.prototype), "reset", this).call(this, life, easing);
    }
  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.data.time = 0;
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#RandomDrift
     * @instance
     *
     * @param {Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.data.time += time;

      if (particle.data.time >= this.delay) {
        particle.a.addXY(MathUtil.randomAToB(-this.panFoce.x, this.panFoce.x), MathUtil.randomAToB(-this.panFoce.y, this.panFoce.y));

        particle.data.time = 0;
      }
    }
  }]);
  return RandomDrift;
}(Behaviour);

var Gravity = function (_Force) {
  inherits(Gravity, _Force);

  /**
   * @memberof! Proton#
   * @augments Proton#Proton.Force
   * @constructor
   * @alias Proton.Gravity
   *
   * @param {Number} g 							Gravity
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Gravity(g, life, easing) {
    classCallCheck(this, Gravity);

    var _this = possibleConstructorReturn(this, (Gravity.__proto__ || Object.getPrototypeOf(Gravity)).call(this, 0, g, life, easing));

    _this.name = "Gravity";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Gravity
   * @instance
   *
   * @param {Number} g 							Gravity
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Gravity, [{
    key: "reset",
    value: function reset(g, life, easing) {
      get(Gravity.prototype.__proto__ || Object.getPrototypeOf(Gravity.prototype), "reset", this).call(this, 0, g, life, easing);
    }
  }]);
  return Gravity;
}(Force);

var Collision = function (_Behaviour) {
  inherits(Collision, _Behaviour);

  /**
   * The callback after collision
   *
   * @callback Callback
   *
   * @param {Proton.Particle} particle
   * @param {Proton.Paritcle} otherParticle
   */
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Collision
   *
   * @todo add description to mass
   *
   * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
   * @param {Boolean} 		[mass=true]
   * @param {Callback}	 	[callback=null]		the callback after the collision
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Collision(emitter, mass, callback, life, easing) {
    classCallCheck(this, Collision);

    var _this = possibleConstructorReturn(this, (Collision.__proto__ || Object.getPrototypeOf(Collision)).call(this, life, easing));

    _this.reset(emitter, mass, callback);
    _this.name = "Collision";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @memberof Proton#Proton.Collision
   * @method reset
   * @instance
   *
   * @todo add description to mass
   *
   * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
   * @param {Boolean} 		[mass=true]
   * @param {Callback}	 	[callback=null]		the callback after the collision
   * @param {Number} 			[life=Infinity] 	this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Collision, [{
    key: "reset",
    value: function reset(emitter, mass, callback, life, easing) {
      this.emitter = Util.initValue(emitter, null);
      this.mass = Util.initValue(mass, true);
      this.callback = Util.initValue(callback, null);

      this.collisionPool = [];
      this.delta = new Vector2D();

      life && get(Collision.prototype.__proto__ || Object.getPrototypeOf(Collision.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @memberof Proton#Proton.Collision
     * @method applyBehaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      var newPool = this.emitter ? this.emitter.particles.slice(index) : this.pool.slice(index);
      var length = newPool.length;

      var otherParticle = void 0;
      var lengthSq = void 0;
      var overlap = void 0;
      var totalMass = void 0;
      var averageMass1 = void 0,
          averageMass2 = void 0;
      var i = void 0;

      for (i = 0; i < length; i++) {
        otherParticle = newPool[i];

        if (otherParticle !== particle) {
          this.delta.copy(otherParticle.p);
          this.delta.sub(particle.p);

          lengthSq = this.delta.lengthSq();
          var distance = particle.radius + otherParticle.radius;

          if (lengthSq <= distance * distance) {
            overlap = distance - Math.sqrt(lengthSq);
            overlap += 0.5;

            totalMass = particle.mass + otherParticle.mass;
            averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
            averageMass2 = this.mass ? particle.mass / totalMass : 0.5;

            particle.p.add(this.delta.clone().normalize().multiplyScalar(overlap * -averageMass1));
            otherParticle.p.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));

            this.callback && this.callback(particle, otherParticle);
          }
        }
      }
    }
  }]);
  return Collision;
}(Behaviour);

var CrossZone = function (_Behaviour) {
  inherits(CrossZone, _Behaviour);

  /**
   * Defines what happens if the particles come to the end of the specified zone
   *
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.CrossZone
   *
   * @param {Proton.Zone} zone 						can be any Proton.Zone - e.g. Proton.RectZone()
   * @param {String} 		[crossType=dead] 			what happens if the particles pass the zone - allowed strings: dead | bound | cross
   * @param {Number} 		[life=Infinity] 			this behaviour's life
   * @param {String} 		[easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function CrossZone(zone, crossType, life, easing) {
    classCallCheck(this, CrossZone);

    var _this = possibleConstructorReturn(this, (CrossZone.__proto__ || Object.getPrototypeOf(CrossZone)).call(this, life, easing));

    _this.reset(zone, crossType);
    _this.name = "CrossZone";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.CrossZone
   * @instance
   *
   * @param {Proton.Zone} zone 				can be any Proton.Zone - e.g. Proton.RectZone()
   * @param {String} 		[crossType=dead] 	what happens if the particles pass the zone - allowed strings: dead | bound | cross
   * @param {Number} 		[life=Infinity] 	this behaviour's life
   * @param {String} 		[easing=easeLinear]	this behaviour's easing
   */


  createClass(CrossZone, [{
    key: "reset",
    value: function reset(zone, crossType, life, easing) {
      this.zone = zone;
      this.zone.crossType = Util.initValue(crossType, "dead");

      life && get(CrossZone.prototype.__proto__ || Object.getPrototypeOf(CrossZone.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.CrossZone
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      this.zone.crossing(particle);
    }
  }]);
  return CrossZone;
}(Behaviour);

var Alpha = function (_Behaviour) {
  inherits(Alpha, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Alpha
   *
   * @todo add description for 'a' and 'b'
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Alpha(a, b, life, easing) {
    classCallCheck(this, Alpha);

    var _this = possibleConstructorReturn(this, (Alpha.__proto__ || Object.getPrototypeOf(Alpha)).call(this, life, easing));

    _this.reset(a, b);
    _this.name = "Alpha";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Alpha
   * @instance
   *
   * @todo add description for 'a' and 'b'
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Alpha, [{
    key: "reset",
    value: function reset(a, b, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);

      life && get(Alpha.prototype.__proto__ || Object.getPrototypeOf(Alpha.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Sets the new alpha value of the particle
     *
     * @method initialize
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @param {Proton.Particle} particle A single Proton generated particle
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.data.alphaA = this.a.getValue();

      if (this.same) particle.data.alphaB = particle.data.alphaA;else particle.data.alphaB = this.b.getValue();
    }

    /**
     * @method applyBehaviour
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);

      particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;

      if (particle.alpha < 0.001) particle.alpha = 0;
    }
  }]);
  return Alpha;
}(Behaviour);

var Scale = function (_Behaviour) {
  inherits(Scale, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Scale
   *
   * @todo add description for 'a' and 'b'
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Scale(a, b, life, easing) {
    classCallCheck(this, Scale);

    var _this = possibleConstructorReturn(this, (Scale.__proto__ || Object.getPrototypeOf(Scale)).call(this, life, easing));

    _this.reset(a, b);
    _this.name = "Scale";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Scale
   * @instance
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Scale, [{
    key: "reset",
    value: function reset(a, b, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);

      life && get(Scale.prototype.__proto__ || Object.getPrototypeOf(Scale.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Scale
     * @instance
     *
     * @param {Proton.Particle} particle
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.data.scaleA = this.a.getValue();
      particle.data.oldRadius = particle.radius;
      particle.data.scaleB = this.same ? particle.data.scaleA : this.b.getValue();
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Scale
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.scale = particle.data.scaleB + (particle.data.scaleA - particle.data.scaleB) * this.energy;

      if (particle.scale < 0.0001) particle.scale = 0;
      particle.radius = particle.data.oldRadius * particle.scale;
    }
  }]);
  return Scale;
}(Behaviour);

var Rotate = function (_Behaviour) {
  inherits(Rotate, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Rotate
   *
   * @todo add description for 'a', 'b' and 'style'
   *
   * @param {String} [influence=Velocity] The rotation's influence
   * @param {String} b
   * @param {String} [style=to]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Rotate(influence, b, style, life, easing) {
    classCallCheck(this, Rotate);

    var _this = possibleConstructorReturn(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).call(this, life, easing));

    _this.reset(influence, b, style);
    _this.name = "Rotate";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Rotate
   * @instance
   *
   * @todo add description for 'a', 'b' and 'style'
   *
   * @param {String} a
   * @param {String} b
   * @param {String} [style=to]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Rotate, [{
    key: "reset",
    value: function reset(a, b, style, life, easing) {
      this.same = b === null || b === undefined ? true : false;

      this.a = Span.setSpanValue(Util.initValue(a, "Velocity"));
      this.b = Span.setSpanValue(Util.initValue(b, 0));
      this.style = Util.initValue(style, "to");

      life && get(Rotate.prototype.__proto__ || Object.getPrototypeOf(Rotate.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Rotate
     * @instance
     *
     * @param {Proton.Particle} particle
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.rotation = this.a.getValue();
      particle.data.rotationA = this.a.getValue();

      if (!this.same) particle.data.rotationB = this.b.getValue();
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Rotate
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);

      if (!this.same) {
        if (this.style === "to" || this.style === "TO" || this.style === "_") {
          particle.rotation += particle.data.rotationB + (particle.data.rotationA - particle.data.rotationB) * this.energy;
        } else {
          particle.rotation += particle.data.rotationB;
        }
      } else if (this.a.a === "V" || this.a.a === "Velocity" || this.a.a === "v") {
        // beta...
        particle.rotation = particle.getDirection();
      }
    }
  }]);
  return Rotate;
}(Behaviour);

var Color = function (_Behaviour) {
  inherits(Color, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Color
   *
   * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
   * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
   * @param {Number} [life=Infinity] 	this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Color(a, b, life, easing) {
    classCallCheck(this, Color);

    var _this = possibleConstructorReturn(this, (Color.__proto__ || Object.getPrototypeOf(Color)).call(this, life, easing));

    _this.reset(a, b);
    _this.name = "Color";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
   * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
   * @param {Number} [life=Infinity] 	this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   */


  createClass(Color, [{
    key: "reset",
    value: function reset(a, b, life, easing) {
      this.a = ArraySpan.createArraySpan(a);
      this.b = ArraySpan.createArraySpan(b);
      life && get(Color.prototype.__proto__ || Object.getPrototypeOf(Color.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.color = this.a.getValue();
      particle.data.colorA = ColorUtil.hexToRgb(particle.color);

      if (this.b) particle.data.colorB = ColorUtil.hexToRgb(this.b.getValue());
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      if (this.b) {
        this.calculate(particle, time, index);

        particle.rgb.r = particle.data.colorB.r + (particle.data.colorA.r - particle.data.colorB.r) * this.energy;
        particle.rgb.g = particle.data.colorB.g + (particle.data.colorA.g - particle.data.colorB.g) * this.energy;
        particle.rgb.b = particle.data.colorB.b + (particle.data.colorA.b - particle.data.colorB.b) * this.energy;

        particle.rgb.r = Math.floor(particle.rgb.r);
        particle.rgb.g = Math.floor(particle.rgb.g);
        particle.rgb.b = Math.floor(particle.rgb.b);
      } else {
        particle.rgb.r = particle.data.colorA.r;
        particle.rgb.g = particle.data.colorA.g;
        particle.rgb.b = particle.data.colorA.b;
      }
    }
  }]);
  return Color;
}(Behaviour);

var CHANGING = "changing";

var Cyclone = function (_Behaviour) {
  inherits(Cyclone, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Cyclone
   *
   * @param {Number} angle
   * @param {Number} force
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function Cyclone(angle, force, life, easing) {
    classCallCheck(this, Cyclone);

    var _this = possibleConstructorReturn(this, (Cyclone.__proto__ || Object.getPrototypeOf(Cyclone)).call(this, life, easing));

    _this.setAngleAndForce(angle, force);
    _this.name = "Cyclone";
    return _this;
  }

  createClass(Cyclone, [{
    key: "setAngleAndForce",
    value: function setAngleAndForce(angle, force) {
      this.force = CHANGING;
      this.angle = MathUtil.PI / 2;

      if (angle === "right") {
        this.angle = MathUtil.PI / 2;
      } else if (angle === "left") {
        this.angle = -MathUtil.PI / 2;
      } else if (angle === "random") {
        this.angle = "random";
      } else if (angle instanceof Span) {
        this.angle = "span";
        this.span = angle;
      } else if (angle) {
        this.angle = angle;
      }

      if (String(force).toLowerCase() === "changing" || String(force).toLowerCase() === "chang" || String(force).toLowerCase() === "auto") {
        this.force = CHANGING;
      } else if (force) {
        this.force = force;
      }
    }

    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Cyclone
     * @instance
     *
     * @param {Number} angle
     * @param {Number} force
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */

  }, {
    key: "reset",
    value: function reset(angle, force, life, easing) {
      this.angle = MathUtil.PI / 2;
      this.setAngleAndForce(angle, force);
      life && get(Cyclone.prototype.__proto__ || Object.getPrototypeOf(Cyclone.prototype), "reset", this).call(this, life, easing);
    }
  }, {
    key: "initialize",
    value: function initialize(particle) {
      if (this.angle === "random") {
        particle.data.cangle = MathUtil.randomAToB(-MathUtil.PI, MathUtil.PI);
      } else if (this.angle === "span") {
        particle.data.cangle = this.span.getValue();
      }

      particle.data.cyclone = new Vector2D(0, 0);
    }

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Cyclone
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);

      var length = void 0;
      var gradient = particle.v.getGradient();
      if (this.angle === "random" || this.angle === "span") {
        gradient += particle.data.cangle;
      } else {
        gradient += this.angle;
      }

      if (this.force === CHANGING) {
        length = particle.v.length() / 100;
      } else {
        length = this.force;
      }

      particle.data.cyclone.x = length * Math.cos(gradient);
      particle.data.cyclone.y = length * Math.sin(gradient);
      particle.data.cyclone = this.normalizeForce(particle.data.cyclone);
      particle.a.add(particle.data.cyclone);
    }
  }]);
  return Cyclone;
}(Behaviour);

var Repulsion = function (_Attraction) {
  inherits(Repulsion, _Attraction);

  /**
   * The oppisite of Proton.Attraction - turns the force
   *
   * @memberof! Proton#
   * @augments Proton#Proton.Attraction
   * @constructor
   * @alias Proton.Repulsion
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {Number} force
   * @property {String} name The Behaviour name
   */
  function Repulsion(targetPosition, force, radius, life, easing) {
    classCallCheck(this, Repulsion);

    var _this = possibleConstructorReturn(this, (Repulsion.__proto__ || Object.getPrototypeOf(Repulsion)).call(this, targetPosition, force, radius, life, easing));

    _this.force *= -1;
    _this.name = "Repulsion";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Repulsion
   * @instance
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  createClass(Repulsion, [{
    key: "reset",
    value: function reset(targetPosition, force, radius, life, easing) {
      get(Repulsion.prototype.__proto__ || Object.getPrototypeOf(Repulsion.prototype), "reset", this).call(this, targetPosition, force, radius, life, easing);
      this.force *= -1;
    }
  }]);
  return Repulsion;
}(Attraction);

var GravityWell = function (_Behaviour) {
  inherits(GravityWell, _Behaviour);

  /**
   * @memberof! Proton#
   * @augments Behaviour
   * @constructor
   * @alias GravityWell
   *
   * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
   * @param {Number} [force=100]					The force
   * @param {Number} [life=Infinity]				this behaviour's life
   * @param {String} [easing=easeLinear]	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  function GravityWell(centerPoint, force, life, easing) {
    classCallCheck(this, GravityWell);

    var _this = possibleConstructorReturn(this, (GravityWell.__proto__ || Object.getPrototypeOf(GravityWell)).call(this, life, easing));

    _this.distanceVec = new Vector2D();
    _this.centerPoint = Util.initValue(centerPoint, new Vector2D());
    _this.force = Util.initValue(_this.normalizeValue(force), 100);

    _this.name = "GravityWell";
    return _this;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#GravityWell
   * @instance
   *
   * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
   * @param {Number} [force=100]					The force
   * @param {Number} [life=Infinity]				this behaviour's life
   * @param {String} [easing=easeLinear]	this behaviour's easing
   */


  createClass(GravityWell, [{
    key: "reset",
    value: function reset(centerPoint, force, life, easing) {
      this.distanceVec = new Vector2D();
      this.centerPoint = Util.initValue(centerPoint, new Vector2D());
      this.force = Util.initValue(this.normalizeValue(force), 100);

      life && get(GravityWell.prototype.__proto__ || Object.getPrototypeOf(GravityWell.prototype), "reset", this).call(this, life, easing);
    }

    /**
     * @inheritdoc
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {}

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#GravityWell
     * @instance
     *
     * @param {Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(particle, time, index) {
      this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
      var distanceSq = this.distanceVec.lengthSq();

      if (distanceSq !== 0) {
        var distance = this.distanceVec.length();
        var factor = this.force * time / (distanceSq * distance);

        particle.v.x += factor * this.distanceVec.x;
        particle.v.y += factor * this.distanceVec.y;
      }
    }
  }]);
  return GravityWell;
}(Behaviour);

var InitializeUtil = {
  initialize: function initialize(emitter, particle, initializes) {
    var length = initializes.length;
    var i = void 0;

    for (i = 0; i < length; i++) {
      if (initializes[i] instanceof Initialize) {
        initializes[i].init(emitter, particle);
      } else {
        this.init(emitter, particle, initializes[i]);
      }
    }

    this.bindEmitter(emitter, particle);
  },


  // init
  init: function init(emitter, particle, initialize) {
    Util.setProp(particle, initialize);
    Util.setVectorVal(particle, initialize);
  },
  bindEmitter: function bindEmitter(emitter, particle) {
    if (emitter.bindEmitter) {
      particle.p.add(emitter.p);
      particle.v.add(emitter.v);
      particle.a.add(emitter.a);

      particle.v.rotate(MathUtil.degreeTransform(emitter.rotation));
    }
  }
};

var Emitter = function (_Particle) {
  inherits(Emitter, _Particle);

  /**
   * You can use this emit particles.
   *
   * It will dispatch follow events:
   * PARTICLE_CREATED
   * PARTICLE_UPDATA
   * PARTICLE_DEAD
   *
   * @class Emitter
   * @constructor
   * @param {Object} conf the parameters object;
   * for example {damping:0.01,bindEmitter:false}
   */
  function Emitter() {
    var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Emitter);

    var _this = possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this, conf));

    _this.particles = [];
    _this.behaviours = [];
    _this.initializes = [];

    _this.emitTime = 0;
    _this.emitSpeed = 0;
    _this.totalTime = -1;

    /**
     * The friction coefficient for all particle emit by This;
     * @property damping
     * @type {Number}
     * @default 0.006
     */
    _this.damping = 0.006;

    /**
     * If bindEmitter the particles can bind this emitter's property;
     * @property bindEmitter
     * @type {Boolean}
     * @default true
     */
    _this.bindEmitter = true;

    /**
     * The number of particles per second emit (a [particle]/b [s]);
     * @property rate
     * @type {Rate}
     * @default Rate(1, .1)
     */
    _this.rate = new Rate(1, 0.1);

    _this.name = "Emitter";
    _this.id = Puid.id(_this.name);
    return _this;
  }

  /**
   * start emit particle
   * @method emit
   * @param {Number} emitTime begin emit time;
   * @param {String} life the life of this emitter
   */


  createClass(Emitter, [{
    key: "emit",
    value: function emit(totalTime, life) {
      this.stoped = false;
      this.emitTime = 0;
      this.totalTime = Util.initValue(totalTime, Infinity);

      if (life === true || life === "life" || life === "destroy") {
        this.life = totalTime === "once" ? 1 : this.totalTime;
      } else if (!isNaN(life)) {
        this.life = life;
      }

      this.rate.init();
    }

    /**
     * stop emiting
     * @method stop
     */

  }, {
    key: "stop",
    value: function stop() {
      this.totalTime = -1;
      this.emitTime = 0;
      this.stoped = true;
    }
  }, {
    key: "preEmit",
    value: function preEmit(time) {
      var oldStoped = this.stoped;
      var oldEmitTime = this.emitTime;
      var oldTotalTime = this.totalTime;

      this.stoped = false;
      this.emitTime = 0;
      this.totalTime = time;
      this.rate.init();

      var step = 0.0167;
      while (time > step) {
        time -= step;
        this.update(step);
      }

      this.stoped = oldStoped;
      this.emitTime = oldEmitTime + Math.max(time, 0);
      this.totalTime = oldTotalTime;
    }

    /**
     * remove current all particles
     * @method removeAllParticles
     */

  }, {
    key: "removeAllParticles",
    value: function removeAllParticles() {
      var i = this.particles.length;
      while (i--) {
        this.particles[i].dead = true;
      }
    }

    /**
     * add initialize to this emitter
     * @method addSelfInitialize
     */

  }, {
    key: "addSelfInitialize",
    value: function addSelfInitialize(initialize) {
      if (initialize["init"]) {
        initialize.init(this);
      } else {
        this.initAll();
      }
    }

    /**
     * add the Initialize to particles;
     *
     * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
     * @method addInitialize
     * @param {Initialize} initialize like this new Radius(1, 12)
     */

  }, {
    key: "addInitialize",
    value: function addInitialize() {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var i = rest.length;
      while (i--) {
        this.initializes.push(rest[i]);
      }
    }

    /**
     * remove the Initialize
     * @method removeInitialize
     * @param {Initialize} initialize a initialize
     */

  }, {
    key: "removeInitialize",
    value: function removeInitialize(initializer) {
      var index = this.initializes.indexOf(initializer);
      if (index > -1) this.initializes.splice(index, 1);
    }

    /**
     * remove all Initializes
     * @method removeInitializers
     */

  }, {
    key: "removeAllInitializers",
    value: function removeAllInitializers() {
      Util.emptyArray(this.initializes);
    }

    /**
     * add the Behaviour to particles;
     *
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */

  }, {
    key: "addBehaviour",
    value: function addBehaviour() {
      for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rest[_key2] = arguments[_key2];
      }

      var i = arguments.length;
      while (i--) {
        var behaviour = rest[i];
        this.behaviours.push(behaviour);
        if (behaviour.parents) behaviour.parents.push(this);
      }
    }

    /**
     * remove the Behaviour
     * @method removeBehaviour
     * @param {Behaviour} behaviour a behaviour
     */

  }, {
    key: "removeBehaviour",
    value: function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);
      this.behaviours.splice(index, 1);

      if (behaviour.parents) {
        index = behaviour.parents.indexOf(behaviour);
        behaviour.parents.splice(index, 1);
      }

      return index;
    }

    /**
     * remove all behaviours
     * @method removeAllBehaviours
     */

  }, {
    key: "removeAllBehaviours",
    value: function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }

    // emitter update

  }, {
    key: "update",
    value: function update(time) {
      this.age += time;
      if (this.age >= this.life || this.dead) this.destroy();

      this.emitting(time);
      this.integrate(time);
    }
  }, {
    key: "integrate",
    value: function integrate(time) {
      if (!this.parent) return;

      var damping = 1 - this.damping;
      this.parent.integrator.calculate(this, time, damping);

      var length = this.particles.length;
      var i = void 0,
          particle = void 0;

      for (i = length - 1; i >= 0; i--) {
        particle = this.particles[i];

        // particle update
        particle.update(time, i);
        this.parent.integrator.calculate(particle, time, damping);
        this.dispatch("PARTICLE_UPDATE", particle);

        // check dead
        if (particle.dead) {
          this.dispatch("PARTICLE_DEAD", particle);

          this.parent.pool.expire(particle);
          this.particles.splice(i, 1);
        }
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch(event, target) {
      this.parent && this.parent.dispatchEvent(event, target);
      this.bindEvent && this.dispatchEvent(event, target);
    }
  }, {
    key: "emitting",
    value: function emitting(time) {
      if (this.totalTime === "once") {
        var i = void 0;
        var length = this.rate.getValue(99999);

        if (length > 0) this.emitSpeed = length;
        for (i = 0; i < length; i++) {
          this.createParticle();
        }this.totalTime = "none";
      } else {
        this.emitTime += time;

        if (this.emitTime < this.totalTime) {
          var _length = this.rate.getValue(time);
          var _i = void 0;

          if (_length > 0) this.emitSpeed = _length;
          for (_i = 0; _i < _length; _i++) {
            this.createParticle();
          }
        }
      }
    }

    /**
     * create single particle;
     *
     * can use emit({x:10},new Gravity(10),{'particleUpdate',fun}) or emit([{x:10},new Initialize],new Gravity(10),{'particleUpdate',fun})
     * @method removeAllParticles
     */

  }, {
    key: "createParticle",
    value: function createParticle(initialize, behaviour) {
      var particle = this.parent.pool.get(Particle);
      this.setupParticle(particle, initialize, behaviour);
      this.dispatch("PARTICLE_CREATED", particle);

      return particle;
    }
  }, {
    key: "setupParticle",
    value: function setupParticle(particle, initialize, behaviour) {
      var initializes = this.initializes;
      var behaviours = this.behaviours;

      if (initialize) initializes = Util.toArray(initialize);
      if (behaviour) behaviours = Util.toArray(behaviour);

      particle.reset();
      InitializeUtil.initialize(this, particle, initializes);
      particle.addBehaviours(behaviours);
      particle.parent = this;

      this.particles.push(particle);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.stop();
      Util.destroyAll(this.particles);
    }

    /**
     * Destory this Emitter
     * @method destroy
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.dead = true;
      this.remove();
      this.removeAllInitializers();
      this.removeAllBehaviours();
      this.parent && this.parent.removeEmitter(this);
    }
  }]);
  return Emitter;
}(Particle);

EventDispatcher.bind(Emitter);

var BehaviourEmitter = function (_Emitter) {
  inherits(BehaviourEmitter, _Emitter);

  /**
   * The BehaviourEmitter class inherits from Proton.Emitter
   *
   * use the BehaviourEmitter you can add behaviours to self;
   * @class Proton.BehaviourEmitter
   * @constructor
   * @param {Object} conf the parameters object;
   */
  function BehaviourEmitter(conf) {
    classCallCheck(this, BehaviourEmitter);

    var _this = possibleConstructorReturn(this, (BehaviourEmitter.__proto__ || Object.getPrototypeOf(BehaviourEmitter)).call(this, conf));

    _this.selfBehaviours = [];
    return _this;
  }

  /**
   * add the Behaviour to emitter;
   *
   * you can use Behaviours array:emitter.addSelfBehaviour(Behaviour1,Behaviour2,Behaviour3);
   * @method addSelfBehaviour
   * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
   */


  createClass(BehaviourEmitter, [{
    key: "addSelfBehaviour",
    value: function addSelfBehaviour() {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var i = void 0,
          length = rest.length;

      for (i = 0; i < length; i++) {
        var behaviour = rest[i];
        this.selfBehaviours.push(behaviour);
        behaviour.initialize(this);
      }
    }

    /**
     * remove the Behaviour for self
     * @method removeSelfBehaviour
     * @param {Proton.Behaviour} behaviour a behaviour
     */

  }, {
    key: "removeSelfBehaviour",
    value: function removeSelfBehaviour(behaviour) {
      var index = this.selfBehaviours.indexOf(behaviour);
      if (index > -1) this.selfBehaviours.splice(index, 1);
    }
  }, {
    key: "update",
    value: function update(time) {
      get(BehaviourEmitter.prototype.__proto__ || Object.getPrototypeOf(BehaviourEmitter.prototype), "update", this).call(this, time);

      if (!this.sleep) {
        var length = this.selfBehaviours.length;
        var i = void 0;

        for (i = 0; i < length; i++) {
          this.selfBehaviours[i].applyBehaviour(this, time, i);
        }
      }
    }
  }]);
  return BehaviourEmitter;
}(Emitter);

var FollowEmitter = function (_Emitter) {
  inherits(FollowEmitter, _Emitter);

  /**
   * The FollowEmitter class inherits from Proton.Emitter
   *
   * use the FollowEmitter will emit particle when mousemoving
   *
   * @class Proton.FollowEmitter
   * @constructor
   * @param {Element} mouseTarget mouseevent's target;
   * @param {Number} ease the easing of following speed;
   * @default 0.7
   * @param {Object} conf the parameters object;
   */
  function FollowEmitter(mouseTarget, ease, conf) {
    classCallCheck(this, FollowEmitter);

    var _this = possibleConstructorReturn(this, (FollowEmitter.__proto__ || Object.getPrototypeOf(FollowEmitter)).call(this, conf));

    _this.mouseTarget = Util.initValue(mouseTarget, window);
    _this.ease = Util.initValue(ease, 0.7);

    _this._allowEmitting = false;
    _this.initEventHandler();
    return _this;
  }

  createClass(FollowEmitter, [{
    key: "initEventHandler",
    value: function initEventHandler() {
      var _this2 = this;

      this.mousemoveHandler = function (e) {
        return _this2.mousemove.call(_this2, e);
      };
      this.mousedownHandler = function (e) {
        return _this2.mousedown.call(_this2, e);
      };
      this.mouseupHandler = function (e) {
        return _this2.mouseup.call(_this2, e);
      };
      this.mouseTarget.addEventListener("mousemove", this.mousemoveHandler, false);
    }

    /**
     * start emit particle
     * @method emit
     */

  }, {
    key: "emit",
    value: function emit() {
      this._allowEmitting = true;
    }

    /**
     * stop emiting
     * @method stop
     */

  }, {
    key: "stop",
    value: function stop() {
      this._allowEmitting = false;
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      if (e.layerX || e.layerX === 0) {
        this.p.x += (e.layerX - this.p.x) * this.ease;
        this.p.y += (e.layerY - this.p.y) * this.ease;
      } else if (e.offsetX || e.offsetX === 0) {
        this.p.x += (e.offsetX - this.p.x) * this.ease;
        this.p.y += (e.offsetY - this.p.y) * this.ease;
      }

      if (this._allowEmitting) get(FollowEmitter.prototype.__proto__ || Object.getPrototypeOf(FollowEmitter.prototype), "emit", this).call(this, "once");
    }

    /**
     * Destory this Emitter
     * @method destroy
     */

  }, {
    key: "destroy",
    value: function destroy() {
      get(FollowEmitter.prototype.__proto__ || Object.getPrototypeOf(FollowEmitter.prototype), "destroy", this).call(this);
      this.mouseTarget.removeEventListener("mousemove", this.mousemoveHandler, false);
    }
  }]);
  return FollowEmitter;
}(Emitter);

var BaseRenderer = function () {
  function BaseRenderer(element, stroke) {
    classCallCheck(this, BaseRenderer);

    this.pool = new Pool();
    this.element = element;
    this.stroke = stroke;
    this.circleConf = { isCircle: true };

    this.initHandler();
    this.name = "BaseRenderer";
  }

  createClass(BaseRenderer, [{
    key: "setStroke",
    value: function setStroke() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#000000";
      var thinkness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      this.stroke = { color: color, thinkness: thinkness };
    }
  }, {
    key: "initHandler",
    value: function initHandler() {
      var _this = this;

      this._protonUpdateHandler = function () {
        _this.onProtonUpdate.call(_this);
      };

      this._protonUpdateAfterHandler = function () {
        _this.onProtonUpdateAfter.call(_this);
      };

      this._emitterAddedHandler = function (emitter) {
        _this.onEmitterAdded.call(_this, emitter);
      };

      this._emitterRemovedHandler = function (emitter) {
        _this.onEmitterRemoved.call(_this, emitter);
      };

      this._particleCreatedHandler = function (particle) {
        _this.onParticleCreated.call(_this, particle);
      };

      this._particleUpdateHandler = function (particle) {
        _this.onParticleUpdate.call(_this, particle);
      };

      this._particleDeadHandler = function (particle) {
        _this.onParticleDead.call(_this, particle);
      };
    }
  }, {
    key: "init",
    value: function init(proton) {
      this.parent = proton;

      proton.addEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      proton.addEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);

      proton.addEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      proton.addEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);

      proton.addEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      proton.addEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      proton.addEventListener("PARTICLE_DEAD", this._particleDeadHandler);
    }
  }, {
    key: "resize",
    value: function resize(width, height) {}
  }, {
    key: "destroy",
    value: function destroy() {
      this.remove();
      this.pool.destroy();
      this.element = null;
    }
  }, {
    key: "remove",
    value: function remove(proton) {
      this.parent.removeEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      this.parent.removeEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);

      this.parent.removeEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      this.parent.removeEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);

      this.parent.removeEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      this.parent.removeEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      this.parent.removeEventListener("PARTICLE_DEAD", this._particleDeadHandler);

      this.parent = null;
    }
  }, {
    key: "onProtonUpdate",
    value: function onProtonUpdate() {}
  }, {
    key: "onProtonUpdateAfter",
    value: function onProtonUpdateAfter() {}
  }, {
    key: "onEmitterAdded",
    value: function onEmitterAdded(emitter) {}
  }, {
    key: "onEmitterRemoved",
    value: function onEmitterRemoved(emitter) {}
  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {}
  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {}
  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {}
  }]);
  return BaseRenderer;
}();

var CanvasRenderer = function (_BaseRenderer) {
  inherits(CanvasRenderer, _BaseRenderer);

  function CanvasRenderer(element) {
    classCallCheck(this, CanvasRenderer);

    var _this = possibleConstructorReturn(this, (CanvasRenderer.__proto__ || Object.getPrototypeOf(CanvasRenderer)).call(this, element));

    _this.stroke = null;
    _this.context = _this.element.getContext("2d");
    _this.bufferCache = {};
    _this.name = "CanvasRenderer";
    return _this;
  }

  createClass(CanvasRenderer, [{
    key: "resize",
    value: function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    }
  }, {
    key: "onProtonUpdate",
    value: function onProtonUpdate() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.color = particle.color || "#ff0000";
      }
    }
  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      if (particle.body) {
        if (particle.body instanceof Image) this.drawImage(particle);
      } else {
        this.drawCircle(particle);
      }
    }
  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {
      particle.body = null;
    }

    // private method

  }, {
    key: "addImg2Body",
    value: function addImg2Body(img, particle) {
      particle.body = img;
    }

    // private drawCircle

  }, {
    key: "drawImage",
    value: function drawImage(particle) {
      var w = particle.body.width * particle.scale | 0;
      var h = particle.body.height * particle.scale | 0;
      var x = particle.p.x - w / 2;
      var y = particle.p.y - h / 2;

      if (!!particle.color) {
        if (!particle.data["buffer"]) particle.data.buffer = this.createBuffer(particle.body);

        var bufContext = particle.data.buffer.getContext("2d");
        bufContext.clearRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
        bufContext.globalAlpha = particle.alpha;
        bufContext.drawImage(particle.body, 0, 0);

        bufContext.globalCompositeOperation = "source-atop";
        bufContext.fillStyle = ColorUtil.rgbToHex(particle.rgb);
        bufContext.fillRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
        bufContext.globalCompositeOperation = "source-over";
        bufContext.globalAlpha = 1;

        this.context.drawImage(particle.data.buffer, 0, 0, particle.data.buffer.width, particle.data.buffer.height, x, y, w, h);
      } else {
        this.context.save();

        this.context.globalAlpha = particle.alpha;
        this.context.translate(particle.p.x, particle.p.y);
        this.context.rotate(MathUtil.degreeTransform(particle.rotation));
        this.context.translate(-particle.p.x, -particle.p.y);
        this.context.drawImage(particle.body, 0, 0, particle.body.width, particle.body.height, x, y, w, h);

        this.context.globalAlpha = 1;
        this.context.restore();
      }
    }

    // private drawCircle --

  }, {
    key: "drawCircle",
    value: function drawCircle(particle) {
      if (particle.rgb) {
        this.context.fillStyle = "rgba(" + particle.rgb.r + "," + particle.rgb.g + "," + particle.rgb.b + "," + particle.alpha + ")";
      } else {
        this.context.fillStyle = particle.color;
      }

      // draw circle
      this.context.beginPath();
      this.context.arc(particle.p.x, particle.p.y, particle.radius, 0, Math.PI * 2, true);

      if (this.stroke) {
        this.context.strokeStyle = this.stroke.color;
        this.context.lineWidth = this.stroke.thinkness;
        this.context.stroke();
      }

      this.context.closePath();
      this.context.fill();
    }

    // private createBuffer

  }, {
    key: "createBuffer",
    value: function createBuffer(image) {
      if (image instanceof Image) {
        var size = image.width + "_" + image.height;
        var canvas = this.bufferCache[size];

        if (!canvas) {
          canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          this.bufferCache[size] = canvas;
        }

        return canvas;
      }
    }
  }]);
  return CanvasRenderer;
}(BaseRenderer);

var DomRenderer = function (_BaseRenderer) {
  inherits(DomRenderer, _BaseRenderer);

  function DomRenderer(element) {
    classCallCheck(this, DomRenderer);

    var _this = possibleConstructorReturn(this, (DomRenderer.__proto__ || Object.getPrototypeOf(DomRenderer)).call(this, element));

    _this.stroke = null;
    _this.transform3d = false;
    _this.pool.create = function (body, particle) {
      return _this.createBody(body, particle);
    };
    _this.addImg2Body = _this.addImg2Body.bind(_this);

    _this.name = "DomRenderer";
    return _this;
  }

  createClass(DomRenderer, [{
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.body = this.pool.get(this.circleConf, particle);
        this.element.appendChild(particle.body);
      }
    }
  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      if (this.bodyReady(particle)) {
        if (this.transform3d) {
          DomUtil.transform3d(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);
        } else {
          DomUtil.transform(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);
        }

        particle.body.style.opacity = particle.alpha;

        if (particle.body.isCircle) {
          particle.body.style.backgroundColor = particle.color || "#ff0000";
        }
      }
    }
  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {
      if (this.bodyReady(particle)) {
        this.element.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }
    }
  }, {
    key: "bodyReady",
    value: function bodyReady(particle) {
      return _typeof(particle.body) === "object" && particle.body && !particle.body.isInner;
    }

    // private method

  }, {
    key: "addImg2Body",
    value: function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = this.pool.get(img, particle);
      DomUtil.resize(particle.body, img.width, img.height);

      this.element.appendChild(particle.body);
    }
  }, {
    key: "createBody",
    value: function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);
      return this.createSprite(body, particle);
    }

    // private methods

  }, {
    key: "createCircle",
    value: function createCircle(particle) {
      var dom = DomUtil.createDiv(particle.id + "_dom", 2 * particle.radius, 2 * particle.radius);
      dom.style.borderRadius = particle.radius + "px";

      if (this.stroke) {
        dom.style.borderColor = this.stroke.color;
        dom.style.borderWidth = this.stroke.thinkness + "px";
      }
      dom.isCircle = true;

      return dom;
    }
  }, {
    key: "createSprite",
    value: function createSprite(body, particle) {
      var url = typeof body === "string" ? body : body.src;
      var dom = DomUtil.createDiv(particle.id + "_dom", body.width, body.height);
      dom.style.backgroundImage = "url(" + url + ")";

      return dom;
    }
  }]);
  return DomRenderer;
}(BaseRenderer);

var EaselRenderer = function (_BaseRenderer) {
  inherits(EaselRenderer, _BaseRenderer);

  function EaselRenderer(element, stroke) {
    classCallCheck(this, EaselRenderer);

    var _this = possibleConstructorReturn(this, (EaselRenderer.__proto__ || Object.getPrototypeOf(EaselRenderer)).call(this, element));

    _this.stroke = stroke;
    _this.name = "EaselRenderer";
    return _this;
  }

  createClass(EaselRenderer, [{
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {
      if (particle.body) {
        this.createSprite(particle);
      } else {
        this.createCircle(particle);
      }

      this.element.addChild(particle.body);
    }
  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      if (particle.body) {
        particle.body.x = particle.p.x;
        particle.body.y = particle.p.y;

        particle.body.alpha = particle.alpha;
        particle.body.scaleX = particle.body.scaleY = particle.scale;
        particle.body.rotation = particle.rotation;
      }
    }
  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {
      if (particle.body) {
        particle.body.parent && particle.body.parent.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }

      if (particle.graphics) this.pool.expire(particle.graphics);
    }

    // private

  }, {
    key: "createSprite",
    value: function createSprite(particle) {
      particle.body = this.pool.get(particle.body);

      if (particle.body.parent) return;
      if (particle.body["image"]) {
        particle.body.regX = particle.body.image.width / 2;
        particle.body.regY = particle.body.image.height / 2;
      }
    }
  }, {
    key: "createCircle",
    value: function createCircle(particle) {
      var graphics = this.pool.get(createjs.Graphics);

      if (this.stroke) {
        if (this.stroke instanceof String) {
          graphics.beginStroke(this.stroke);
        } else {
          graphics.beginStroke("#000000");
        }
      }
      graphics.beginFill(particle.color || "#ff0000").drawCircle(0, 0, particle.radius);
      var shape = this.pool.get(createjs.Shape, [graphics]);

      particle.body = shape;
      particle.graphics = graphics;
    }
  }]);
  return EaselRenderer;
}(BaseRenderer);

var PixelRenderer = function (_BaseRenderer) {
  inherits(PixelRenderer, _BaseRenderer);

  function PixelRenderer(element, rectangle) {
    classCallCheck(this, PixelRenderer);

    var _this = possibleConstructorReturn(this, (PixelRenderer.__proto__ || Object.getPrototypeOf(PixelRenderer)).call(this, element));

    _this.context = _this.element.getContext("2d");
    _this.imageData = null;
    _this.rectangle = null;
    _this.rectangle = rectangle;
    _this.createImageData(rectangle);

    _this.name = "PixelRenderer";
    return _this;
  }

  createClass(PixelRenderer, [{
    key: "resize",
    value: function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    }
  }, {
    key: "createImageData",
    value: function createImageData(rectangle) {
      this.rectangle = rectangle ? rectangle : new Rectangle(0, 0, this.element.width, this.element.height);
      this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height);
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    }
  }, {
    key: "onProtonUpdate",
    value: function onProtonUpdate() {
      this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
      this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    }
  }, {
    key: "onProtonUpdateAfter",
    value: function onProtonUpdateAfter() {
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    }
  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {}
  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      if (this.imageData) {
        this.setPixel(this.imageData, particle.p.x - this.rectangle.x >> 0, particle.p.y - this.rectangle.y >> 0, particle);
      }
    }
  }, {
    key: "setPixel",
    value: function setPixel(imagedata, x, y, particle) {
      var rgb = particle.rgb;
      if (x < 0 || x > this.element.width || y < 0 || y > this.elementwidth) return;

      var i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;
      imagedata.data[i] = rgb.r;
      imagedata.data[i + 1] = rgb.g;
      imagedata.data[i + 2] = rgb.b;
      imagedata.data[i + 3] = particle.alpha * 255;
    }
  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {}
  }]);
  return PixelRenderer;
}(BaseRenderer);

var PIXIClass = void 0;

var PixiRenderer = function (_BaseRenderer) {
  inherits(PixiRenderer, _BaseRenderer);

  function PixiRenderer(element, stroke) {
    classCallCheck(this, PixiRenderer);

    var _this = possibleConstructorReturn(this, (PixiRenderer.__proto__ || Object.getPrototypeOf(PixiRenderer)).call(this, element));

    _this.stroke = stroke;
    _this.color = false;
    _this.setColor = false;
    _this.blendMode = null;
    _this.pool.create = function (body, particle) {
      return _this.createBody(body, particle);
    };
    _this.setPIXI(window.PIXI);

    _this.name = "PixiRenderer";
    return _this;
  }

  createClass(PixiRenderer, [{
    key: "setPIXI",
    value: function setPIXI(PIXI) {
      try {
        PIXIClass = PIXI || { Sprite: {} };
        this.createFromImage = PIXIClass.Sprite.from || PIXIClass.Sprite.fromImage;
      } catch (e) {}
    }
  }, {
    key: "onProtonUpdate",
    value: function onProtonUpdate() {}

    /**
     * @param particle
     */

  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {
      if (particle.body) {
        particle.body = this.pool.get(particle.body, particle);
      } else {
        particle.body = this.pool.get(this.circleConf, particle);
      }

      if (this.blendMode) {
        particle.body.blendMode = this.blendMode;
      }

      this.element.addChild(particle.body);
    }

    /**
     * @param particle
     */

  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      this.transform(particle, particle.body);

      if (this.setColor === true || this.color === true) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      }
    }

    /**
     * @param particle
     */

  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {
      this.element.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    }
  }, {
    key: "transform",
    value: function transform(particle, target) {
      target.x = particle.p.x;
      target.y = particle.p.y;

      target.alpha = particle.alpha;

      target.scale.x = particle.scale;
      target.scale.y = particle.scale;

      // using cached version of MathUtil.PI_180 for slight performance increase.
      target.rotation = particle.rotation * MathUtil.PI_180; // MathUtil.PI_180;
    }
  }, {
    key: "createBody",
    value: function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);else return this.createSprite(body);
    }
  }, {
    key: "createSprite",
    value: function createSprite(body) {
      var sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);

      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;

      return sprite;
    }
  }, {
    key: "createCircle",
    value: function createCircle(particle) {
      var graphics = new PIXIClass.Graphics();

      if (this.stroke) {
        var stroke = this.stroke instanceof String ? this.stroke : 0x000000;
        graphics.beginStroke(stroke);
      }

      graphics.beginFill(particle.color || 0x008ced);
      graphics.drawCircle(0, 0, particle.radius);
      graphics.endFill();

      return graphics;
    }
  }, {
    key: "destroy",
    value: function destroy(particles) {
      get(PixiRenderer.prototype.__proto__ || Object.getPrototypeOf(PixiRenderer.prototype), "destroy", this).call(this);
      this.pool.destroy();

      var i = particles.length;
      while (i--) {
        var particle = particles[i];
        if (particle.body) {
          this.element.removeChild(particle.body);
        }
      }
    }
  }]);
  return PixiRenderer;
}(BaseRenderer);

var MStack = function () {
  function MStack() {
    classCallCheck(this, MStack);

    this.mats = [];
    this.size = 0;

    for (var i = 0; i < 20; i++) {
      this.mats.push(Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
    }
  }

  createClass(MStack, [{
    key: "set",
    value: function set$$1(m, i) {
      if (i === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[i - 1], m, this.mats[i]);

      this.size = Math.max(this.size, i + 1);
    }
  }, {
    key: "push",
    value: function push(m) {
      if (this.size === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);

      this.size++;
    }
  }, {
    key: "pop",
    value: function pop() {
      if (this.size > 0) this.size--;
    }
  }, {
    key: "top",
    value: function top() {
      return this.mats[this.size - 1];
    }
  }]);
  return MStack;
}();

var WebGLRenderer = function (_BaseRenderer) {
  inherits(WebGLRenderer, _BaseRenderer);

  function WebGLRenderer(element) {
    classCallCheck(this, WebGLRenderer);

    var _this = possibleConstructorReturn(this, (WebGLRenderer.__proto__ || Object.getPrototypeOf(WebGLRenderer)).call(this, element));

    _this.gl = _this.element.getContext("experimental-webgl", { antialias: true, stencil: false, depth: false });
    if (!_this.gl) alert("Sorry your browser do not suppest WebGL!");

    _this.initVar();
    _this.setMaxRadius();
    _this.initShaders();
    _this.initBuffers();

    _this.gl.blendEquation(_this.gl.FUNC_ADD);
    _this.gl.blendFunc(_this.gl.SRC_ALPHA, _this.gl.ONE_MINUS_SRC_ALPHA);
    _this.gl.enable(_this.gl.BLEND);
    _this.addImg2Body = _this.addImg2Body.bind(_this);

    _this.name = "WebGLRenderer";
    return _this;
  }

  createClass(WebGLRenderer, [{
    key: "init",
    value: function init(proton) {
      get(WebGLRenderer.prototype.__proto__ || Object.getPrototypeOf(WebGLRenderer.prototype), "init", this).call(this, proton);
      this.resize(this.element.width, this.element.height);
    }
  }, {
    key: "resize",
    value: function resize(width, height) {
      this.umat[4] = -2;
      this.umat[7] = 1;

      this.smat[0] = 1 / width;
      this.smat[4] = 1 / height;

      this.mstack.set(this.umat, 0);
      this.mstack.set(this.smat, 1);

      this.gl.viewport(0, 0, width, height);
      this.element.width = width;
      this.element.height = height;
    }
  }, {
    key: "setMaxRadius",
    value: function setMaxRadius(radius) {
      this.circleCanvasURL = this.createCircle(radius);
    }
  }, {
    key: "getVertexShader",
    value: function getVertexShader() {
      var vsSource = ["uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}"].join("\n");
      return vsSource;
    }
  }, {
    key: "getFragmentShader",
    value: function getFragmentShader() {
      var fsSource = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}"].join("\n");
      return fsSource;
    }
  }, {
    key: "initVar",
    value: function initVar() {
      this.mstack = new MStack();
      this.umat = Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
      this.smat = Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
      this.texturebuffers = {};
    }
  }, {
    key: "blendEquation",
    value: function blendEquation(A) {
      this.gl.blendEquation(this.gl[A]);
    }
  }, {
    key: "blendFunc",
    value: function blendFunc(A, B) {
      this.gl.blendFunc(this.gl[A], this.gl[B]);
    }
  }, {
    key: "getShader",
    value: function getShader(gl, str, fs) {
      var shader = fs ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER);

      gl.shaderSource(shader, str);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      }

      return shader;
    }
  }, {
    key: "initShaders",
    value: function initShaders() {
      var fragmentShader = this.getShader(this.gl, this.getFragmentShader(), true);
      var vertexShader = this.getShader(this.gl, this.getVertexShader(), false);

      this.sprogram = this.gl.createProgram();
      this.gl.attachShader(this.sprogram, vertexShader);
      this.gl.attachShader(this.sprogram, fragmentShader);
      this.gl.linkProgram(this.sprogram);

      if (!this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS)) alert("Could not initialise shaders");

      this.gl.useProgram(this.sprogram);
      this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, "aVertexPosition");
      this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, "aTextureCoord");
      this.gl.enableVertexAttribArray(this.sprogram.tca);
      this.gl.enableVertexAttribArray(this.sprogram.vpa);

      this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, "tMat");
      this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, "uSampler");
      this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, "useTexture");
      this.sprogram.color = this.gl.getUniformLocation(this.sprogram, "uColor");
      this.gl.uniform1i(this.sprogram.useTex, 1);
    }
  }, {
    key: "initBuffers",
    value: function initBuffers() {
      var vs = [0, 3, 1, 0, 2, 3];
      var idx = void 0;

      this.unitIBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);

      var i = void 0;
      var ids = [];
      for (i = 0; i < 100; i++) {
        ids.push(i);
      }idx = new Uint16Array(ids);

      this.unitI33 = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);

      ids = [];
      for (i = 0; i < 100; i++) {
        ids.push(i, i + 1, i + 2);
      }idx = new Uint16Array(ids);

      this.stripBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
    }
  }, {
    key: "createCircle",
    value: function createCircle(raidus) {
      this.circleCanvasRadius = WebGLUtil.nhpot(Util.initValue(raidus, 32));
      var canvas = DomUtil.createCanvas("circle_canvas", this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
      var context = canvas.getContext("2d");

      context.beginPath();
      context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
      context.closePath();
      context.fillStyle = "#FFF";
      context.fill();

      return canvas.toDataURL();
    }
  }, {
    key: "drawImg2Canvas",
    value: function drawImg2Canvas(particle) {
      var _w = particle.body.width;
      var _h = particle.body.height;

      var _width = WebGLUtil.nhpot(particle.body.width);
      var _height = WebGLUtil.nhpot(particle.body.height);

      var _scaleX = particle.body.width / _width;
      var _scaleY = particle.body.height / _height;

      if (!this.texturebuffers[particle.data.src]) this.texturebuffers[particle.data.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()];

      particle.data.texture = this.texturebuffers[particle.data.src][0];
      particle.data.vcBuffer = this.texturebuffers[particle.data.src][1];
      particle.data.tcBuffer = this.texturebuffers[particle.data.src][2];

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _scaleX, 0.0, 0.0, _scaleY, _scaleY, _scaleY]), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _w, 0.0, 0.0, _h, _w, _h]), this.gl.STATIC_DRAW);

      var context = particle.data.canvas.getContext("2d");
      var data = context.getImageData(0, 0, _width, _height);

      this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
      this.gl.generateMipmap(this.gl.TEXTURE_2D);

      particle.data.textureLoaded = true;
      particle.data.textureWidth = _w;
      particle.data.textureHeight = _h;
    }
  }, {
    key: "onProtonUpdate",
    value: function onProtonUpdate() {
      // this.gl.clearColor(0, 0, 0, 1);
      // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {
      particle.data.textureLoaded = false;
      particle.data.tmat = Mat3.create();
      particle.data.tmat[8] = 1;
      particle.data.imat = Mat3.create();
      particle.data.imat[8] = 1;

      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        ImgUtil.getImgFromCache(this.circleCanvasURL, this.addImg2Body, particle);
        particle.data.oldScale = particle.radius / this.circleCanvasRadius;
      }
    }

    // private

  }, {
    key: "addImg2Body",
    value: function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = img;
      particle.data.src = img.src;
      particle.data.canvas = ImgUtil.getCanvasFromCache(img);
      particle.data.oldScale = 1;

      this.drawImg2Canvas(particle);
    }
  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      if (particle.data.textureLoaded) {
        this.updateMatrix(particle);

        this.gl.uniform3f(this.sprogram.color, particle.rgb.r / 255, particle.rgb.g / 255, particle.rgb.b / 255);
        this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, false, this.mstack.top());

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
        this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
        this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
        this.gl.uniform1i(this.sprogram.samplerUniform, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);

        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        this.mstack.pop();
      }
    }
  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {}
  }, {
    key: "updateMatrix",
    value: function updateMatrix(particle) {
      var moveOriginMatrix = WebGLUtil.makeTranslation(-particle.data.textureWidth / 2, -particle.data.textureHeight / 2);
      var translationMatrix = WebGLUtil.makeTranslation(particle.p.x, particle.p.y);

      var angel = particle.rotation * MathUtil.PI_180;
      var rotationMatrix = WebGLUtil.makeRotation(angel);

      var scale = particle.scale * particle.data.oldScale;
      var scaleMatrix = WebGLUtil.makeScale(scale, scale);
      var matrix = WebGLUtil.matrixMultiply(moveOriginMatrix, scaleMatrix);

      matrix = WebGLUtil.matrixMultiply(matrix, rotationMatrix);
      matrix = WebGLUtil.matrixMultiply(matrix, translationMatrix);

      Mat3.inverse(matrix, particle.data.imat);
      matrix[2] = particle.alpha;

      this.mstack.push(matrix);
    }
  }]);
  return WebGLRenderer;
}(BaseRenderer);

var CustomRenderer = function (_BaseRenderer) {
  inherits(CustomRenderer, _BaseRenderer);

  function CustomRenderer(element) {
    classCallCheck(this, CustomRenderer);

    var _this = possibleConstructorReturn(this, (CustomRenderer.__proto__ || Object.getPrototypeOf(CustomRenderer)).call(this, element));

    _this.name = "CustomRenderer";
    return _this;
  }

  return CustomRenderer;
}(BaseRenderer);

var LineZone = function (_Zone) {
  inherits(LineZone, _Zone);

  function LineZone(x1, y1, x2, y2, direction) {
    classCallCheck(this, LineZone);

    var _this = possibleConstructorReturn(this, (LineZone.__proto__ || Object.getPrototypeOf(LineZone)).call(this));

    if (x2 - x1 >= 0) {
      _this.x1 = x1;
      _this.y1 = y1;
      _this.x2 = x2;
      _this.y2 = y2;
    } else {
      _this.x1 = x2;
      _this.y1 = y2;
      _this.x2 = x1;
      _this.y2 = y1;
    }

    _this.dx = _this.x2 - _this.x1;
    _this.dy = _this.y2 - _this.y1;

    _this.minx = Math.min(_this.x1, _this.x2);
    _this.miny = Math.min(_this.y1, _this.y2);
    _this.maxx = Math.max(_this.x1, _this.x2);
    _this.maxy = Math.max(_this.y1, _this.y2);

    _this.dot = _this.x2 * _this.y1 - _this.x1 * _this.y2;
    _this.xxyy = _this.dx * _this.dx + _this.dy * _this.dy;

    _this.gradient = _this.getGradient();
    _this.length = _this.getLength();
    _this.direction = Util.initValue(direction, ">");
    return _this;
  }

  createClass(LineZone, [{
    key: "getPosition",
    value: function getPosition() {
      this.random = Math.random();
      this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
      this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);

      return this.vector;
    }
  }, {
    key: "getDirection",
    value: function getDirection(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = B === 0 ? 1 : B;

      if ((A * x + B * y + C) * D > 0) return true;else return false;
    }
  }, {
    key: "getDistance",
    value: function getDistance(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = A * x + B * y + C;

      return D / Math.sqrt(this.xxyy);
    }
  }, {
    key: "getSymmetric",
    value: function getSymmetric(v) {
      var tha2 = v.getGradient();
      var tha1 = this.getGradient();
      var tha = 2 * (tha1 - tha2);

      var oldx = v.x;
      var oldy = v.y;

      v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);

      return v;
    }
  }, {
    key: "getGradient",
    value: function getGradient() {
      return Math.atan2(this.dy, this.dx);
    }
  }, {
    key: "rangeOut",
    value: function rangeOut(particle) {
      var angle = Math.abs(this.getGradient());

      if (angle <= MathUtil.PI / 4) {
        if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
      } else {
        if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
      }

      return false;
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }
  }, {
    key: "crossing",
    value: function crossing(particle) {
      if (this.crossType === "dead") {
        if (this.direction === ">" || this.direction === "R" || this.direction === "right" || this.direction === "down") {
          if (!this.rangeOut(particle)) return;
          if (this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
        } else {
          if (!this.rangeOut(particle)) return;
          if (!this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
        }
      } else if (this.crossType === "bound") {
        if (!this.rangeOut(particle)) return;

        if (this.getDistance(particle.p.x, particle.p.y) <= particle.radius) {
          if (this.dx === 0) {
            particle.v.x *= -1;
          } else if (this.dy === 0) {
            particle.v.y *= -1;
          } else {
            this.getSymmetric(particle.v);
          }
        }
      } else if (this.crossType === "cross") {
        if (this.alert) {
          console.error("Sorry, LineZone does not support cross method!");
          this.alert = false;
        }
      }
    }
  }]);
  return LineZone;
}(Zone);

var CircleZone = function (_Zone) {
  inherits(CircleZone, _Zone);

  function CircleZone(x, y, radius) {
    classCallCheck(this, CircleZone);

    var _this = possibleConstructorReturn(this, (CircleZone.__proto__ || Object.getPrototypeOf(CircleZone)).call(this));

    _this.x = x;
    _this.y = y;
    _this.radius = radius;
    _this.angle = 0;
    _this.center = { x: x, y: y };
    return _this;
  }

  createClass(CircleZone, [{
    key: "getPosition",
    value: function getPosition() {
      this.angle = MathUtil.PIx2 * Math.random();
      this.randomRadius = Math.random() * this.radius;
      this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
      this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);

      return this.vector;
    }
  }, {
    key: "setCenter",
    value: function setCenter(x, y) {
      this.center.x = x;
      this.center.y = y;
    }
  }, {
    key: "crossing",
    value: function crossing(particle) {
      var d = particle.p.distanceTo(this.center);

      if (this.crossType === "dead") {
        if (d - particle.radius > this.radius) particle.dead = true;
      } else if (this.crossType === "bound") {
        if (d + particle.radius >= this.radius) this.getSymmetric(particle);
      } else if (this.crossType === "cross") {
        if (this.alert) {
          console.error("Sorry, CircleZone does not support cross method!");
          this.alert = false;
        }
      }
    }
  }, {
    key: "getSymmetric",
    value: function getSymmetric(particle) {
      var tha2 = particle.v.getGradient();
      var tha1 = this.getGradient(particle);

      var tha = 2 * (tha1 - tha2);
      var oldx = particle.v.x;
      var oldy = particle.v.y;

      particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
    }
  }, {
    key: "getGradient",
    value: function getGradient(particle) {
      return -MathUtil.PI_2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
    }
  }]);
  return CircleZone;
}(Zone);

var RectZone = function (_Zone) {
  inherits(RectZone, _Zone);

  function RectZone(x, y, width, height) {
    classCallCheck(this, RectZone);

    var _this = possibleConstructorReturn(this, (RectZone.__proto__ || Object.getPrototypeOf(RectZone)).call(this));

    _this.x = x;
    _this.y = y;
    _this.width = width;
    _this.height = height;
    return _this;
  }

  createClass(RectZone, [{
    key: "getPosition",
    value: function getPosition() {
      this.vector.x = this.x + Math.random() * this.width;
      this.vector.y = this.y + Math.random() * this.height;

      return this.vector;
    }
  }, {
    key: "crossing",
    value: function crossing(particle) {
      // particle dead zone
      if (this.crossType === "dead") {
        if (particle.p.x + particle.radius < this.x) particle.dead = true;else if (particle.p.x - particle.radius > this.x + this.width) particle.dead = true;

        if (particle.p.y + particle.radius < this.y) particle.dead = true;else if (particle.p.y - particle.radius > this.y + this.height) particle.dead = true;
      }

      // particle bound zone
      else if (this.crossType === "bound") {
          if (particle.p.x - particle.radius < this.x) {
            particle.p.x = this.x + particle.radius;
            particle.v.x *= -1;
          } else if (particle.p.x + particle.radius > this.x + this.width) {
            particle.p.x = this.x + this.width - particle.radius;
            particle.v.x *= -1;
          }

          if (particle.p.y - particle.radius < this.y) {
            particle.p.y = this.y + particle.radius;
            particle.v.y *= -1;
          } else if (particle.p.y + particle.radius > this.y + this.height) {
            particle.p.y = this.y + this.height - particle.radius;
            particle.v.y *= -1;
          }
        }

        // particle cross zone
        else if (this.crossType === "cross") {
            if (particle.p.x + particle.radius < this.x && particle.v.x <= 0) {
              particle.p.x = this.x + this.width + particle.radius;
            } else if (particle.p.x - particle.radius > this.x + this.width && particle.v.x >= 0) {
              particle.p.x = this.x - particle.radius;
            }

            if (particle.p.y + particle.radius < this.y && particle.v.y <= 0) {
              particle.p.y = this.y + this.height + particle.radius;
            } else if (particle.p.y - particle.radius > this.y + this.height && particle.v.y >= 0) {
              particle.p.y = this.y - particle.radius;
            }
          }
    }
  }]);
  return RectZone;
}(Zone);

var ImageZone = function (_Zone) {
  inherits(ImageZone, _Zone);

  function ImageZone(imageData, x, y, d) {
    classCallCheck(this, ImageZone);

    var _this = possibleConstructorReturn(this, (ImageZone.__proto__ || Object.getPrototypeOf(ImageZone)).call(this));

    _this.reset(imageData, x, y, d);
    return _this;
  }

  createClass(ImageZone, [{
    key: "reset",
    value: function reset(imageData, x, y, d) {
      this.imageData = imageData;
      this.x = Util.initValue(x, 0);
      this.y = Util.initValue(y, 0);
      this.d = Util.initValue(d, 2);

      this.vectors = [];
      this.setVectors();
    }
  }, {
    key: "setVectors",
    value: function setVectors() {
      var i = void 0,
          j = void 0;
      var length1 = this.imageData.width;
      var length2 = this.imageData.height;

      for (i = 0; i < length1; i += this.d) {
        for (j = 0; j < length2; j += this.d) {
          var index = ((j >> 0) * length1 + (i >> 0)) * 4;

          if (this.imageData.data[index + 3] > 0) {
            this.vectors.push({ x: i + this.x, y: j + this.y });
          }
        }
      }

      return this.vector;
    }
  }, {
    key: "getBound",
    value: function getBound(x, y) {
      var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      if (this.imageData.data[index + 3] > 0) return true;else return false;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      var vector = Util.getRandFromArray(this.vectors);
      return this.vector.copy(vector);
    }
  }, {
    key: "getColor",
    value: function getColor(x, y) {
      x -= this.x;
      y -= this.y;
      var i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;

      return {
        r: this.imageData.data[i],
        g: this.imageData.data[i + 1],
        b: this.imageData.data[i + 2],
        a: this.imageData.data[i + 3]
      };
    }
  }, {
    key: "crossing",
    value: function crossing(particle) {
      if (this.crossType === "dead") {
        if (this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.dead = true;else particle.dead = false;
      } else if (this.crossType === "bound") {
        if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.v.negate();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      get(ImageZone.prototype.__proto__ || Object.getPrototypeOf(ImageZone.prototype), "destroy", this).call(this);
      this.imageData = null;
    }
  }]);
  return ImageZone;
}(Zone);

var Debug = {
  addEventListener: function addEventListener(proton, func) {
    proton.addEventListener("PROTON_UPDATE_AFTER", function () {
      return func();
    });
  },
  getStyle: function getStyle() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#ff0000";

    var rgb = ColorUtil.hexToRgb(color);
    return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.5)";
  },
  drawZone: function drawZone(proton, canvas, zone, clear) {
    var context = canvas.getContext("2d");
    var style = this.getStyle();

    this.addEventListener(proton, function () {
      if (clear) context.clearRect(0, 0, canvas.width, canvas.height);

      if (zone instanceof PointZone) {
        context.beginPath();
        context.fillStyle = style;
        context.arc(zone.x, zone.y, 10, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      } else if (zone instanceof LineZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.moveTo(zone.x1, zone.y1);
        context.lineTo(zone.x2, zone.y2);
        context.stroke();
        context.closePath();
      } else if (zone instanceof RectZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.drawRect(zone.x, zone.y, zone.width, zone.height);
        context.stroke();
        context.closePath();
      } else if (zone instanceof CircleZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2, true);
        context.stroke();
        context.closePath();
      }
    });
  },
  drawEmitter: function drawEmitter(proton, canvas, emitter, clear) {
    var context = canvas.getContext("2d");
    var style = this.getStyle();

    this.addEventListener(proton, function () {
      if (clear) context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.fillStyle = style;
      context.arc(emitter.p.x, emitter.p.y, 10, 0, Math.PI * 2, true);
      context.fill();
      context.closePath();
    });
  }
};

// namespace
Proton.Particle = Particle;
Proton.Pool = Pool;

Proton.Util = Util;
Proton.ColorUtil = ColorUtil;
Proton.MathUtil = MathUtil;
Proton.Vector2D = Proton.Vector = Vector2D;
Proton.Polar2D = Proton.Polar = Polar2D;
Proton.ArraySpan = ArraySpan;
Proton.Rectangle = Rectangle;
Proton.Rate = Rate;
Proton.ease = ease;
Proton.Span = Span;
Proton.Mat3 = Mat3;
Proton.getSpan = function (a, b, center) {
  return new Span(a, b, center);
};
Proton.createArraySpan = ArraySpan.createArraySpan;

Proton.Initialize = Proton.Init = Initialize;
Proton.Life = Proton.L = Life;
Proton.Position = Proton.P = Position;
Proton.Velocity = Proton.V = Velocity;
Proton.Mass = Proton.M = Mass;
Proton.Radius = Proton.R = Radius;
Proton.Body = Proton.B = Body;

Proton.Behaviour = Behaviour;
Proton.Force = Proton.F = Force;
Proton.Attraction = Proton.A = Attraction;
Proton.RandomDrift = Proton.RD = RandomDrift;
Proton.Gravity = Proton.G = Gravity;
Proton.Collision = Collision;
Proton.CrossZone = CrossZone;
Proton.Alpha = Alpha;
Proton.Scale = Proton.S = Scale;
Proton.Rotate = Rotate;
Proton.Color = Color;
Proton.Repulsion = Repulsion;
Proton.Cyclone = Cyclone;
Proton.GravityWell = GravityWell;

Proton.Emitter = Emitter;
Proton.BehaviourEmitter = BehaviourEmitter;
Proton.FollowEmitter = FollowEmitter;

Proton.Zone = Zone;
Proton.LineZone = LineZone;
Proton.CircleZone = CircleZone;
Proton.PointZone = PointZone;
Proton.RectZone = RectZone;
Proton.ImageZone = ImageZone;

Proton.CanvasRenderer = CanvasRenderer;
Proton.DomRenderer = DomRenderer;
Proton.EaselRenderer = EaselRenderer;
Proton.PixiRenderer = PixiRenderer;
Proton.PixelRenderer = PixelRenderer;
Proton.WebGLRenderer = Proton.WebGlRenderer = WebGLRenderer;
Proton.CustomRenderer = CustomRenderer;

Proton.Debug = Debug;
Util.assign(Proton, ease);

return Proton;

})));
//# sourceMappingURL=proton.js.map
