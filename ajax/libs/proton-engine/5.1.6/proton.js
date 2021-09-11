(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Proton = factory());
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

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
    createCanvas: function createCanvas(id, width, height, position) {
      if (position === void 0) {
        position = "absolute";
      }

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
    emptyObject: function emptyObject(obj, ignore) {
      if (ignore === void 0) {
        ignore = null;
      }

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
    classApply: function classApply(constructor, args) {
      if (args === void 0) {
        args = null;
      }

      if (!args) {
        return new constructor();
      } else {
        var FactoryFunc = constructor.bind.apply(constructor, [null].concat(args));
        return new FactoryFunc();
      }
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
    destroyAll: function destroyAll(arr, param) {
      if (param === void 0) {
        param = null;
      }

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
      var obj, id;

      for (id in this._cache) {
        obj = this._cache[id];
        if (obj === target) return id;
        if (this.isBody(obj, target) && obj.src === target.src) return id;
      }

      return null;
    },
    isBody: function isBody(obj, target) {
      return typeof obj === "object" && typeof target === "object" && obj.isInner && target.isInner;
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

  var Pool = /*#__PURE__*/function () {
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


    var _proto = Pool.prototype;

    _proto.get = function get(target, params, uid) {
      var p;
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
    ;

    _proto.expire = function expire(target) {
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
    ;

    _proto.createOrClone = function createOrClone(target, params) {
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
    ;

    _proto.getCount = function getCount() {
      var count = 0;

      for (var id in this.cache) {
        count += this.cache[id].length;
      }

      return count++;
    }
    /**
     * Destroyes all items from Pool.cache
     *
     * @method destroy
     * @memberof Proton#Proton.Pool
     */
    ;

    _proto.destroy = function destroy() {
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
    ;

    _proto.getCache = function getCache(uid) {
      if (uid === void 0) {
        uid = "default";
      }

      if (!this.cache[uid]) this.cache[uid] = [];
      return this.cache[uid];
    };

    return Pool;
  }();

  var Stats = /*#__PURE__*/function () {
    function Stats(proton) {
      this.proton = proton;
      this.container = null;
      this.type = 1;
      this.emitterIndex = 0;
      this.rendererIndex = 0;
    }

    var _proto = Stats.prototype;

    _proto.update = function update(style, body) {
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
    };

    _proto.add = function add(style, body) {
      var _this = this;

      if (!this.container) {
        this.type = 1;
        this.container = document.createElement("div");
        this.container.style.cssText = ["position:absolute;bottom:0px;left:0;cursor:pointer;", "opacity:0.9;z-index:10000;padding:10px;font-size:12px;font-family:Helvetica,Arial,sans-serif;", "width:120px;height:50px;background-color:#002;color:#0ff;"].join("");
        this.container.addEventListener("click", function (e) {
          _this.type++;
          if (_this.type > 4) _this.type = 1;
        }, false);
        var bg, color;

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
    };

    _proto.getEmitter = function getEmitter() {
      return this.proton.emitters[this.emitterIndex];
    };

    _proto.getRenderer = function getRenderer() {
      return this.proton.renderers[this.rendererIndex];
    };

    _proto.concatArr = function concatArr(arr) {
      var result = "";
      if (!arr || !arr.length) return result;

      for (var i = 0; i < arr.length; i++) {
        result += (arr[i].name || "").substr(0, 1) + ".";
      }

      return result;
    };

    _proto.getCreatedNumber = function getCreatedNumber(renderer) {
      return renderer.pool.total || renderer.cpool && renderer.cpool.total || 0;
    };

    _proto.getEmitterPos = function getEmitterPos(e) {
      return Math.round(e.p.x) + "," + Math.round(e.p.y);
    };

    return Stats;
  }();

  /*
   * EventDispatcher
   * This code reference since http://createjs.com/.
   *
   **/
  var EventDispatcher = /*#__PURE__*/function () {
    function EventDispatcher() {
      this._listeners = null;
    }

    EventDispatcher.bind = function bind(target) {
      target.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
      target.prototype.hasEventListener = EventDispatcher.prototype.hasEventListener;
      target.prototype.addEventListener = EventDispatcher.prototype.addEventListener;
      target.prototype.removeEventListener = EventDispatcher.prototype.removeEventListener;
      target.prototype.removeAllEventListeners = EventDispatcher.prototype.removeAllEventListeners;
    };

    var _proto = EventDispatcher.prototype;

    _proto.addEventListener = function addEventListener(type, listener) {
      if (!this._listeners) {
        this._listeners = {};
      } else {
        this.removeEventListener(type, listener);
      }

      if (!this._listeners[type]) this._listeners[type] = [];

      this._listeners[type].push(listener);

      return listener;
    };

    _proto.removeEventListener = function removeEventListener(type, listener) {
      if (!this._listeners) return;
      if (!this._listeners[type]) return;
      var arr = this._listeners[type];
      var length = arr.length;

      for (var i = 0; i < length; i++) {
        if (arr[i] === listener) {
          if (length === 1) {
            delete this._listeners[type];
          } // allows for faster checks.
          else {
            arr.splice(i, 1);
          }

          break;
        }
      }
    };

    _proto.removeAllEventListeners = function removeAllEventListeners(type) {
      if (!type) this._listeners = null;else if (this._listeners) delete this._listeners[type];
    };

    _proto.dispatchEvent = function dispatchEvent(type, args) {
      var result = false;
      var listeners = this._listeners;

      if (type && listeners) {
        var arr = listeners[type];
        if (!arr) return result; // arr = arr.slice();
        // to avoid issues with items being removed or added during the dispatch

        var handler;
        var i = arr.length;

        while (i--) {
          handler = arr[i];
          result = result || handler(args);
        }
      }

      return !!result;
    };

    _proto.hasEventListener = function hasEventListener(type) {
      var listeners = this._listeners;
      return !!(listeners && listeners[type]);
    };

    return EventDispatcher;
  }();

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
    randomAToB: function randomAToB(a, b, isInt) {
      if (isInt === void 0) {
        isInt = false;
      }

      if (!isInt) return a + Math.random() * (b - a);else return Math.floor(Math.random() * (b - a)) + a;
    },
    randomFloating: function randomFloating(center, f, isInt) {
      return this.randomAToB(center - f, center + f, isInt);
    },
    randomColor: function randomColor() {
      return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    },
    randomZone: function randomZone(display) {},
    floor: function floor(num, k) {
      if (k === void 0) {
        k = 4;
      }

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

  var Integration = /*#__PURE__*/function () {
    function Integration(type) {
      this.type = type;
    }

    var _proto = Integration.prototype;

    _proto.calculate = function calculate(particles, time, damping) {
      this.eulerIntegrate(particles, time, damping);
    } // Euler Integrate
    // https://rosettacode.org/wiki/Euler_method
    ;

    _proto.eulerIntegrate = function eulerIntegrate(particle, time, damping) {
      if (!particle.sleep) {
        particle.old.p.copy(particle.p);
        particle.old.v.copy(particle.v);
        particle.a.multiplyScalar(1 / particle.mass);
        particle.v.add(particle.a.multiplyScalar(time));
        particle.p.add(particle.old.v.multiplyScalar(time));
        if (damping) particle.v.multiplyScalar(damping);
        particle.a.clear();
      }
    };

    return Integration;
  }();

  var Proton = /*#__PURE__*/function () {
    // measure 1:100
    // event name

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
    function Proton(integrationType) {
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

    var _proto = Proton.prototype;

    /**
     * add a type of Renderer
     *
     * @method addRenderer
     * @memberof Proton
     * @instance
     *
     * @param {Renderer} render
     */
    _proto.addRenderer = function addRenderer(render) {
      render.init(this);
      this.renderers.push(render);
    }
    /**
     * @name add a type of Renderer
     *
     * @method addRenderer
     * @param {Renderer} render
     */
    ;

    _proto.removeRenderer = function removeRenderer(render) {
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
    ;

    _proto.addEmitter = function addEmitter(emitter) {
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
    ;

    _proto.removeEmitter = function removeEmitter(emitter) {
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
    ;

    _proto.update = function update() {
      // 'auto' is the default browser refresh rate, the vast majority is 60fps
      if (this._fps === "auto") {
        this.dispatchEvent(Proton.PROTON_UPDATE);

        if (Proton.USE_CLOCK) {
          if (!this.then) this.then = new Date().getTime();
          this.now = new Date().getTime();
          this.elapsed = (this.now - this.then) * 0.001; // Fix bugs such as chrome browser switching tabs causing excessive time difference

          this.amendChangeTabsBug();
          if (this.elapsed > 0) this.emittersUpdate(this.elapsed);
          this.then = this.now;
        } else {
          this.emittersUpdate(Proton.DEFAULT_INTERVAL);
        }

        this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
      } // If the fps frame rate is set
      else {
        if (!this.then) this.then = new Date().getTime();
        this.now = new Date().getTime();
        this.elapsed = (this.now - this.then) * 0.001;

        if (this.elapsed > this._interval) {
          this.dispatchEvent(Proton.PROTON_UPDATE);
          this.emittersUpdate(this._interval); // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

          this.then = this.now - this.elapsed % this._interval * 1000;
          this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
        }
      }
    };

    _proto.emittersUpdate = function emittersUpdate(elapsed) {
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
    ;

    _proto.amendChangeTabsBug = function amendChangeTabsBug() {
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
    ;

    _proto.getCount = function getCount() {
      var total = 0;
      var i = this.emitters.length;

      while (i--) {
        total += this.emitters[i].particles.length;
      }

      return total;
    };

    _proto.getAllParticles = function getAllParticles() {
      var particles = [];
      var i = this.emitters.length;

      while (i--) {
        particles = particles.concat(this.emitters[i].particles);
      }

      return particles;
    };

    _proto.destroyAllEmitters = function destroyAllEmitters() {
      Util.destroyAll(this.emitters);
    }
    /**
     * Destroys everything related to this Proton instance. This includes all emitters, and all properties
     *
     * @method destroy
     * @memberof Proton
     * @instance
     */
    ;

    _proto.destroy = function destroy(remove) {
      var _this = this;

      if (remove === void 0) {
        remove = false;
      }

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
    };

    _createClass(Proton, [{
      key: "fps",
      get: function get() {
        return this._fps;
      },
      set: function set(fps) {
        this._fps = fps;
        this._interval = fps === "auto" ? Proton.DEFAULT_INTERVAL : MathUtil.floor(1 / fps, 7);
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

  var Rgb = /*#__PURE__*/function () {
    function Rgb(r, g, b) {
      if (r === void 0) {
        r = 255;
      }

      if (g === void 0) {
        g = 255;
      }

      if (b === void 0) {
        b = 255;
      }

      this.r = r;
      this.g = g;
      this.b = b;
    }

    var _proto = Rgb.prototype;

    _proto.reset = function reset() {
      this.r = 255;
      this.g = 255;
      this.b = 255;
    };

    return Rgb;
  }();

  var PropUtil = {
    hasProp: function hasProp(target, key) {
      if (!target) return false;
      return target[key] !== undefined; // return obj.hasOwnProperty(key);
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
    setVectorVal: function setVectorVal(particle, conf) {
      if (conf === void 0) {
        conf = null;
      }

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
    }
  };

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

  var Vector2D = /*#__PURE__*/function () {
    function Vector2D(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }

    var _proto = Vector2D.prototype;

    _proto.set = function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    };

    _proto.setX = function setX(x) {
      this.x = x;
      return this;
    };

    _proto.setY = function setY(y) {
      this.y = y;
      return this;
    };

    _proto.getGradient = function getGradient() {
      if (this.x !== 0) return Math.atan2(this.y, this.x);else if (this.y > 0) return MathUtil.PI_2;else if (this.y < 0) return -MathUtil.PI_2;
    };

    _proto.copy = function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    };

    _proto.add = function add(v, w) {
      if (w !== undefined) {
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      return this;
    };

    _proto.addXY = function addXY(a, b) {
      this.x += a;
      this.y += b;
      return this;
    };

    _proto.addVectors = function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
    };

    _proto.sub = function sub(v, w) {
      if (w !== undefined) {
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      return this;
    };

    _proto.subVectors = function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    };

    _proto.divideScalar = function divideScalar(s) {
      if (s !== 0) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }

      return this;
    };

    _proto.multiplyScalar = function multiplyScalar(s) {
      this.x *= s;
      this.y *= s;
      return this;
    };

    _proto.negate = function negate() {
      return this.multiplyScalar(-1);
    };

    _proto.dot = function dot(v) {
      return this.x * v.x + this.y * v.y;
    };

    _proto.lengthSq = function lengthSq() {
      return this.x * this.x + this.y * this.y;
    };

    _proto.length = function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    _proto.normalize = function normalize() {
      return this.divideScalar(this.length());
    };

    _proto.distanceTo = function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    };

    _proto.rotate = function rotate(tha) {
      var x = this.x;
      var y = this.y;
      this.x = x * Math.cos(tha) + y * Math.sin(tha);
      this.y = -x * Math.sin(tha) + y * Math.cos(tha);
      return this;
    };

    _proto.distanceToSquared = function distanceToSquared(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      return dx * dx + dy * dy;
    };

    _proto.lerp = function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
    };

    _proto.equals = function equals(v) {
      return v.x === this.x && v.y === this.y;
    };

    _proto.clear = function clear() {
      this.x = 0.0;
      this.y = 0.0;
      return this;
    };

    _proto.clone = function clone() {
      return new Vector2D(this.x, this.y);
    };

    return Vector2D;
  }();

  /** @typedef {import('../behaviour/Behaviour')} Behaviour */

  var Particle = /*#__PURE__*/function () {
    /** @type string */

    /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} */

    /** @type {object} */

    /** @type {Behaviour[]} */

    /** @type {Vector2D} */

    /** @type {Vector2D} */

    /** @type {Vector2D} */

    /** @type {Rgb} */

    /**
     * the Particle class
     *
     * @class Proton.Particle
     * @constructor
     * @param {Object} pObj the parameters object;
     * for example {life:3,dead:false}
     */
    function Particle(conf) {
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
      conf && PropUtil.setProp(this, conf);
    }

    var _proto = Particle.prototype;

    _proto.getDirection = function getDirection() {
      return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
    };

    _proto.reset = function reset() {
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
    };

    _proto.update = function update(time, index) {
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
    };

    _proto.applyBehaviours = function applyBehaviours(time, index) {
      var length = this.behaviours.length;
      var i;

      for (i = 0; i < length; i++) {
        this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
      }
    }
    /**
     * @param {Behaviour} behaviour
     */
    ;

    _proto.addBehaviour = function addBehaviour(behaviour) {
      this.behaviours.push(behaviour);
      if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
      behaviour.initialize(this);
    }
    /**
     * @param {Behaviour[]} behaviours
     */
    ;

    _proto.addBehaviours = function addBehaviours(behaviours) {
      var length = behaviours.length;
      var i;

      for (i = 0; i < length; i++) {
        this.addBehaviour(behaviours[i]);
      }
    };

    _proto.removeBehaviour = function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);

      if (index > -1) {
        var _behaviour = this.behaviours.splice(index, 1);

        _behaviour.parents = null;
      }
    };

    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }
    /**
     * Destory this particle
     * @method destroy
     */
    ;

    _proto.destroy = function destroy() {
      this.removeAllBehaviours();
      this.energy = 0;
      this.dead = true;
      this.parent = null;
    };

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
      return {
        r: r,
        g: g,
        b: b
      };
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

  var Polar2D = /*#__PURE__*/function () {
    function Polar2D(r, tha) {
      this.r = Math.abs(r) || 0;
      this.tha = tha || 0;
    }

    var _proto = Polar2D.prototype;

    _proto.set = function set(r, tha) {
      this.r = r;
      this.tha = tha;
      return this;
    };

    _proto.setR = function setR(r) {
      this.r = r;
      return this;
    };

    _proto.setTha = function setTha(tha) {
      this.tha = tha;
      return this;
    };

    _proto.copy = function copy(p) {
      this.r = p.r;
      this.tha = p.tha;
      return this;
    };

    _proto.toVector = function toVector() {
      return new Vector2D(this.getX(), this.getY());
    };

    _proto.getX = function getX() {
      return this.r * Math.sin(this.tha);
    };

    _proto.getY = function getY() {
      return -this.r * Math.cos(this.tha);
    };

    _proto.normalize = function normalize() {
      this.r = 1;
      return this;
    };

    _proto.equals = function equals(v) {
      return v.r === this.r && v.tha === this.tha;
    };

    _proto.clear = function clear() {
      this.r = 0.0;
      this.tha = 0.0;
      return this;
    };

    _proto.clone = function clone() {
      return new Polar2D(this.r, this.tha);
    };

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
      }

      return mat2;
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
          id;
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

  var Span$1 = /*#__PURE__*/function () {
    function Span(a, b, center) {
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

    var _proto = Span.prototype;

    _proto.getValue = function getValue(isInt) {
      if (isInt === void 0) {
        isInt = false;
      }

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
    ;

    Span.setSpanValue = function setSpanValue(a, b, c) {
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
    ;

    Span.getSpanValue = function getSpanValue(pan) {
      return pan instanceof Span ? pan.getValue() : pan;
    };

    return Span;
  }();

  var ArraySpan = /*#__PURE__*/function (_Span) {
    _inheritsLoose(ArraySpan, _Span);

    function ArraySpan(color) {
      var _this;

      _this = _Span.call(this) || this;
      _this._arr = Util.toArray(color);
      return _this;
    }

    var _proto = ArraySpan.prototype;

    _proto.getValue = function getValue() {
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
    ;

    ArraySpan.createArraySpan = function createArraySpan(arr) {
      if (!arr) return null;
      if (arr instanceof ArraySpan) return arr;else return new ArraySpan(arr);
    };

    return ArraySpan;
  }(Span$1);

  var Rectangle = /*#__PURE__*/function () {
    function Rectangle(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.bottom = this.y + this.height;
      this.right = this.x + this.width;
    }

    var _proto = Rectangle.prototype;

    _proto.contains = function contains(x, y) {
      if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y) return true;else return false;
    };

    return Rectangle;
  }();

  var Rate = /*#__PURE__*/function () {
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
      this.numPan = Span$1.setSpanValue(Util.initValue(numpan, 1));
      this.timePan = Span$1.setSpanValue(Util.initValue(timepan, 1));
      this.startTime = 0;
      this.nextTime = 0;
      this.init();
    }

    var _proto = Rate.prototype;

    _proto.init = function init() {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();
    };

    _proto.getValue = function getValue(time) {
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
    };

    return Rate;
  }();

  var Initialize = /*#__PURE__*/function () {
    function Initialize() {}

    var _proto = Initialize.prototype;

    _proto.reset = function reset() {};

    _proto.init = function init(emitter, particle) {
      if (particle) {
        this.initialize(particle);
      } else {
        this.initialize(emitter);
      }
    } // sub class init
    ;

    _proto.initialize = function initialize(target) {};

    return Initialize;
  }();

  var Life = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Life, _Initialize);

    function Life(a, b, c) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.lifePan = Span$1.setSpanValue(a, b, c);
      _this.name = "Life";
      return _this;
    }

    var _proto = Life.prototype;

    _proto.initialize = function initialize(target) {
      if (this.lifePan.a === Infinity) target.life = Infinity;else target.life = this.lifePan.getValue();
    };

    return Life;
  }(Initialize);

  var Zone = /*#__PURE__*/function () {
    function Zone() {
      this.vector = new Vector2D(0, 0);
      this.random = 0;
      this.crossType = "dead";
      this.alert = true;
    }

    var _proto = Zone.prototype;

    _proto.getPosition = function getPosition() {};

    _proto.crossing = function crossing(particle) {};

    _proto.destroy = function destroy() {
      this.vector = null;
    };

    return Zone;
  }();

  var PointZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(PointZone, _Zone);

    function PointZone(x, y) {
      var _this;

      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      return _this;
    }

    var _proto = PointZone.prototype;

    _proto.getPosition = function getPosition() {
      this.vector.x = this.x;
      this.vector.y = this.y;
      return this.vector;
    };

    _proto.crossing = function crossing(particle) {
      if (this.alert) {
        console.error("Sorry, PointZone does not support crossing method!");
        this.alert = false;
      }
    };

    return PointZone;
  }(Zone);

  var Position = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Position, _Initialize);

    function Position(zone) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.zone = Util.initValue(zone, new PointZone());
      _this.name = "Position";
      return _this;
    }

    var _proto = Position.prototype;

    _proto.reset = function reset(zone) {
      this.zone = Util.initValue(zone, new PointZone());
    };

    _proto.initialize = function initialize(target) {
      this.zone.getPosition();
      target.p.x = this.zone.vector.x;
      target.p.y = this.zone.vector.y;
    };

    return Position;
  }(Initialize);

  var Velocity = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Velocity, _Initialize);

    function Velocity(rpan, thapan, type) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.rPan = Span$1.setSpanValue(rpan);
      _this.thaPan = Span$1.setSpanValue(thapan);
      _this.type = Util.initValue(type, "vector");
      _this.name = "Velocity";
      return _this;
    }

    var _proto = Velocity.prototype;

    _proto.reset = function reset(rpan, thapan, type) {
      this.rPan = Span$1.setSpanValue(rpan);
      this.thaPan = Span$1.setSpanValue(thapan);
      this.type = Util.initValue(type, "vector");
    };

    _proto.normalizeVelocity = function normalizeVelocity(vr) {
      return vr * Proton.MEASURE;
    };

    _proto.initialize = function initialize(target) {
      if (this.type === "p" || this.type === "P" || this.type === "polar") {
        var polar2d = new Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * MathUtil.PI_180);
        target.v.x = polar2d.getX();
        target.v.y = polar2d.getY();
      } else {
        target.v.x = this.normalizeVelocity(this.rPan.getValue());
        target.v.y = this.normalizeVelocity(this.thaPan.getValue());
      }
    };

    return Velocity;
  }(Initialize);

  var Mass = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Mass, _Initialize);

    function Mass(a, b, c) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.massPan = Span$1.setSpanValue(a, b, c);
      _this.name = "Mass";
      return _this;
    }

    var _proto = Mass.prototype;

    _proto.initialize = function initialize(target) {
      target.mass = this.massPan.getValue();
    };

    return Mass;
  }(Initialize);

  var Radius = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Radius, _Initialize);

    function Radius(a, b, c) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.radius = Span$1.setSpanValue(a, b, c);
      _this.name = "Radius";
      return _this;
    }

    var _proto = Radius.prototype;

    _proto.reset = function reset(a, b, c) {
      this.radius = Span$1.setSpanValue(a, b, c);
    };

    _proto.initialize = function initialize(particle) {
      particle.radius = this.radius.getValue();
      particle.data.oldRadius = particle.radius;
    };

    return Radius;
  }(Initialize);

  var Body = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Body, _Initialize);

    function Body(image, w, h) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.image = _this.setSpanValue(image);
      _this.w = Util.initValue(w, 20);
      _this.h = Util.initValue(h, _this.w);
      _this.name = "Body";
      return _this;
    }

    var _proto = Body.prototype;

    _proto.initialize = function initialize(particle) {
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
    };

    _proto.setSpanValue = function setSpanValue(image) {
      return image instanceof ArraySpan ? image : new ArraySpan(image);
    };

    return Body;
  }(Initialize);

  var Behaviour = /*#__PURE__*/function () {
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


    var _proto = Behaviour.prototype;

    _proto.reset = function reset(life, easing) {
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
    ;

    _proto.normalizeForce = function normalizeForce(force) {
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
    ;

    _proto.normalizeValue = function normalizeValue(value) {
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
    ;

    _proto.initialize = function initialize(particle) {}
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
    ;

    _proto.calculate = function calculate(particle, time, index) {
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
    ;

    _proto.destroy = function destroy() {
      var i = this.parents.length;

      while (i--) {
        this.parents[i].removeBehaviour(this);
      }

      this.parents.length = 0;
    };

    return Behaviour;
  }();

  Behaviour.id = 0;

  var Force = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Force, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;
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


    var _proto = Force.prototype;

    _proto.reset = function reset(fx, fy, life, easing) {
      this.force = this.normalizeForce(new Vector2D(fx, fy));
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.a.add(this.force);
    };

    return Force;
  }(Behaviour);

  var Attraction = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Attraction, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;
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


    var _proto = Attraction.prototype;

    _proto.reset = function reset(targetPosition, force, radius, life, easing) {
      this.targetPosition = Util.initValue(targetPosition, new Vector2D());
      this.radius = Util.initValue(radius, 1000);
      this.force = Util.initValue(this.normalizeValue(force), 100);
      this.radiusSq = this.radius * this.radius;
      this.attractionForce = new Vector2D();
      this.lengthSq = 0;
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
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
    };

    return Attraction;
  }(Behaviour);

  var RandomDrift = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(RandomDrift, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

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


    var _proto = RandomDrift.prototype;

    _proto.reset = function reset(driftX, driftY, delay, life, easing) {
      this.panFoce = new Vector2D(driftX, driftY);
      this.panFoce = this.normalizeForce(this.panFoce);
      this.delay = delay;
      life && _Behaviour.prototype.reset.call(this, life, easing);
    };

    _proto.initialize = function initialize(particle) {
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.data.time += time;

      if (particle.data.time >= this.delay) {
        particle.a.addXY(MathUtil.randomAToB(-this.panFoce.x, this.panFoce.x), MathUtil.randomAToB(-this.panFoce.y, this.panFoce.y));
        particle.data.time = 0;
      }
    };

    return RandomDrift;
  }(Behaviour);

  var Gravity = /*#__PURE__*/function (_Force) {
    _inheritsLoose(Gravity, _Force);

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
      var _this;

      _this = _Force.call(this, 0, g, life, easing) || this;
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


    var _proto = Gravity.prototype;

    _proto.reset = function reset(g, life, easing) {
      _Force.prototype.reset.call(this, 0, g, life, easing);
    };

    return Gravity;
  }(Force);

  var Collision = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Collision, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

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


    var _proto = Collision.prototype;

    _proto.reset = function reset(emitter, mass, callback, life, easing) {
      this.emitter = Util.initValue(emitter, null);
      this.mass = Util.initValue(mass, true);
      this.callback = Util.initValue(callback, null);
      this.collisionPool = [];
      this.delta = new Vector2D();
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      var newPool = this.emitter ? this.emitter.particles.slice(index) : this.pool.slice(index);
      var length = newPool.length;
      var otherParticle;
      var lengthSq;
      var overlap;
      var totalMass;
      var averageMass1, averageMass2;
      var i;

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
    };

    return Collision;
  }(Behaviour);

  var CrossZone = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(CrossZone, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

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


    var _proto = CrossZone.prototype;

    _proto.reset = function reset(zone, crossType, life, easing) {
      this.zone = zone;
      this.zone.crossType = Util.initValue(crossType, "dead");
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      this.zone.crossing(particle);
    };

    return CrossZone;
  }(Behaviour);

  var Alpha = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Alpha, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

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


    var _proto = Alpha.prototype;

    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span$1.setSpanValue(Util.initValue(a, 1));
      this.b = Span$1.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.initialize = function initialize(particle) {
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;
      if (particle.alpha < 0.001) particle.alpha = 0;
    };

    return Alpha;
  }(Behaviour);

  var Scale = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Scale, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

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


    var _proto = Scale.prototype;

    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span$1.setSpanValue(Util.initValue(a, 1));
      this.b = Span$1.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.initialize = function initialize(particle) {
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.scale = particle.data.scaleB + (particle.data.scaleA - particle.data.scaleB) * this.energy;
      if (particle.scale < 0.0001) particle.scale = 0;
      particle.radius = particle.data.oldRadius * particle.scale;
    };

    return Scale;
  }(Behaviour);

  var Rotate = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Rotate, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

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


    var _proto = Rotate.prototype;

    _proto.reset = function reset(a, b, style, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span$1.setSpanValue(Util.initValue(a, "Velocity"));
      this.b = Span$1.setSpanValue(Util.initValue(b, 0));
      this.style = Util.initValue(style, "to");
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.initialize = function initialize(particle) {
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
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
    };

    return Rotate;
  }(Behaviour);

  var Color = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Color, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

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


    var _proto = Color.prototype;

    _proto.reset = function reset(a, b, life, easing) {
      this.a = ArraySpan.createArraySpan(a);
      this.b = ArraySpan.createArraySpan(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
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
    ;

    _proto.initialize = function initialize(particle) {
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
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
    };

    return Color;
  }(Behaviour);

  var CHANGING = "changing";

  var Cyclone = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Cyclone, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.setAngleAndForce(angle, force);

      _this.name = "Cyclone";
      return _this;
    }

    var _proto = Cyclone.prototype;

    _proto.setAngleAndForce = function setAngleAndForce(angle, force) {
      this.force = CHANGING;
      this.angle = MathUtil.PI / 2;

      if (angle === "right") {
        this.angle = MathUtil.PI / 2;
      } else if (angle === "left") {
        this.angle = -MathUtil.PI / 2;
      } else if (angle === "random") {
        this.angle = "random";
      } else if (angle instanceof Span$1) {
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
    ;

    _proto.reset = function reset(angle, force, life, easing) {
      this.angle = MathUtil.PI / 2;
      this.setAngleAndForce(angle, force);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    };

    _proto.initialize = function initialize(particle) {
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      var length;
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
    };

    return Cyclone;
  }(Behaviour);

  var Repulsion = /*#__PURE__*/function (_Attraction) {
    _inheritsLoose(Repulsion, _Attraction);

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
      var _this;

      _this = _Attraction.call(this, targetPosition, force, radius, life, easing) || this;
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


    var _proto = Repulsion.prototype;

    _proto.reset = function reset(targetPosition, force, radius, life, easing) {
      _Attraction.prototype.reset.call(this, targetPosition, force, radius, life, easing);

      this.force *= -1;
    };

    return Repulsion;
  }(Attraction);

  var GravityWell = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(GravityWell, _Behaviour);

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
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;
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


    var _proto = GravityWell.prototype;

    _proto.reset = function reset(centerPoint, force, life, easing) {
      this.distanceVec = new Vector2D();
      this.centerPoint = Util.initValue(centerPoint, new Vector2D());
      this.force = Util.initValue(this.normalizeValue(force), 100);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * @inheritdoc
     */
    ;

    _proto.initialize = function initialize(particle) {}
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
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
      var distanceSq = this.distanceVec.lengthSq();

      if (distanceSq !== 0) {
        var distance = this.distanceVec.length();
        var factor = this.force * time / (distanceSq * distance);
        particle.v.x += factor * this.distanceVec.x;
        particle.v.y += factor * this.distanceVec.y;
      }
    };

    return GravityWell;
  }(Behaviour);

  var InitializeUtil = {
    initialize: function initialize(emitter, particle, initializes) {
      var length = initializes.length;
      var i;

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
      PropUtil.setProp(particle, initialize);
      PropUtil.setVectorVal(particle, initialize);
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

  var Emitter = /*#__PURE__*/function (_Particle) {
    _inheritsLoose(Emitter, _Particle);

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
    function Emitter(conf) {
      var _this;

      if (conf === void 0) {
        conf = {};
      }

      _this = _Particle.call(this, conf) || this;
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


    var _proto = Emitter.prototype;

    _proto.emit = function emit(totalTime, life) {
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
    ;

    _proto.stop = function stop() {
      this.totalTime = -1;
      this.emitTime = 0;
      this.stoped = true;
    };

    _proto.preEmit = function preEmit(time) {
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
    ;

    _proto.removeAllParticles = function removeAllParticles() {
      var i = this.particles.length;

      while (i--) {
        this.particles[i].dead = true;
      }
    }
    /**
     * add initialize to this emitter
     * @method addSelfInitialize
     */
    ;

    _proto.addSelfInitialize = function addSelfInitialize(initialize) {
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
    ;

    _proto.addInitialize = function addInitialize() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
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
    ;

    _proto.removeInitialize = function removeInitialize(initializer) {
      var index = this.initializes.indexOf(initializer);
      if (index > -1) this.initializes.splice(index, 1);
    }
    /**
     * remove all Initializes
     * @method removeInitializers
     */
    ;

    _proto.removeAllInitializers = function removeAllInitializers() {
      Util.emptyArray(this.initializes);
    }
    /**
     * add the Behaviour to particles;
     *
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */
    ;

    _proto.addBehaviour = function addBehaviour() {
      for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
    ;

    _proto.removeBehaviour = function removeBehaviour(behaviour) {
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
    ;

    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    } // emitter update
    ;

    _proto.update = function update(time) {
      this.age += time;
      if (this.age >= this.life || this.dead) this.destroy();
      this.emitting(time);
      this.integrate(time);
    };

    _proto.integrate = function integrate(time) {
      if (!this.parent) return;
      var damping = 1 - this.damping;
      this.parent.integrator.calculate(this, time, damping);
      var length = this.particles.length;
      var i, particle;

      for (i = length - 1; i >= 0; i--) {
        particle = this.particles[i]; // particle update

        particle.update(time, i);
        this.parent.integrator.calculate(particle, time, damping);
        this.dispatch("PARTICLE_UPDATE", particle); // check dead

        if (particle.dead) {
          this.dispatch("PARTICLE_DEAD", particle);
          this.parent.pool.expire(particle);
          this.particles.splice(i, 1);
        }
      }
    };

    _proto.dispatch = function dispatch(event, target) {
      this.parent && this.parent.dispatchEvent(event, target);
      this.bindEvent && this.dispatchEvent(event, target);
    };

    _proto.emitting = function emitting(time) {
      if (this.totalTime === "once") {
        var i;
        var length = this.rate.getValue(99999);
        if (length > 0) this.emitSpeed = length;

        for (i = 0; i < length; i++) {
          this.createParticle();
        }

        this.totalTime = "none";
      } else {
        this.emitTime += time;

        if (this.emitTime < this.totalTime) {
          var _length = this.rate.getValue(time);

          var _i;

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
    ;

    _proto.createParticle = function createParticle(initialize, behaviour) {
      var particle = this.parent.pool.get(Particle);
      this.setupParticle(particle, initialize, behaviour);
      this.dispatch("PARTICLE_CREATED", particle);
      return particle;
    };

    _proto.setupParticle = function setupParticle(particle, initialize, behaviour) {
      var initializes = this.initializes;
      var behaviours = this.behaviours;
      if (initialize) initializes = Util.toArray(initialize);
      if (behaviour) behaviours = Util.toArray(behaviour);
      particle.reset();
      InitializeUtil.initialize(this, particle, initializes);
      particle.addBehaviours(behaviours);
      particle.parent = this;
      this.particles.push(particle);
    };

    _proto.remove = function remove() {
      this.stop();
      Util.destroyAll(this.particles);
    }
    /**
     * Destory this Emitter
     * @method destroy
     */
    ;

    _proto.destroy = function destroy() {
      this.dead = true;
      this.remove();
      this.removeAllInitializers();
      this.removeAllBehaviours();
      this.parent && this.parent.removeEmitter(this);
    };

    return Emitter;
  }(Particle);
  EventDispatcher.bind(Emitter);

  var BehaviourEmitter = /*#__PURE__*/function (_Emitter) {
    _inheritsLoose(BehaviourEmitter, _Emitter);

    /**
     * The BehaviourEmitter class inherits from Proton.Emitter
     *
     * use the BehaviourEmitter you can add behaviours to self;
     * @class Proton.BehaviourEmitter
     * @constructor
     * @param {Object} conf the parameters object;
     */
    function BehaviourEmitter(conf) {
      var _this;

      _this = _Emitter.call(this, conf) || this;
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


    var _proto = BehaviourEmitter.prototype;

    _proto.addSelfBehaviour = function addSelfBehaviour() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var i,
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
    ;

    _proto.removeSelfBehaviour = function removeSelfBehaviour(behaviour) {
      var index = this.selfBehaviours.indexOf(behaviour);
      if (index > -1) this.selfBehaviours.splice(index, 1);
    };

    _proto.update = function update(time) {
      _Emitter.prototype.update.call(this, time);

      if (!this.sleep) {
        var length = this.selfBehaviours.length;
        var i;

        for (i = 0; i < length; i++) {
          this.selfBehaviours[i].applyBehaviour(this, time, i);
        }
      }
    };

    return BehaviourEmitter;
  }(Emitter);

  var FollowEmitter = /*#__PURE__*/function (_Emitter) {
    _inheritsLoose(FollowEmitter, _Emitter);

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
      var _this;

      _this = _Emitter.call(this, conf) || this;
      _this.mouseTarget = Util.initValue(mouseTarget, window);
      _this.ease = Util.initValue(ease, 0.7);
      _this._allowEmitting = false;

      _this.initEventHandler();

      return _this;
    }

    var _proto = FollowEmitter.prototype;

    _proto.initEventHandler = function initEventHandler() {
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
    ;

    _proto.emit = function emit() {
      this._allowEmitting = true;
    }
    /**
     * stop emiting
     * @method stop
     */
    ;

    _proto.stop = function stop() {
      this._allowEmitting = false;
    };

    _proto.mousemove = function mousemove(e) {
      if (e.layerX || e.layerX === 0) {
        this.p.x += (e.layerX - this.p.x) * this.ease;
        this.p.y += (e.layerY - this.p.y) * this.ease;
      } else if (e.offsetX || e.offsetX === 0) {
        this.p.x += (e.offsetX - this.p.x) * this.ease;
        this.p.y += (e.offsetY - this.p.y) * this.ease;
      }

      if (this._allowEmitting) _Emitter.prototype.emit.call(this, "once");
    }
    /**
     * Destory this Emitter
     * @method destroy
     */
    ;

    _proto.destroy = function destroy() {
      _Emitter.prototype.destroy.call(this);

      this.mouseTarget.removeEventListener("mousemove", this.mousemoveHandler, false);
    };

    return FollowEmitter;
  }(Emitter);

  var BaseRenderer = /*#__PURE__*/function () {
    function BaseRenderer(element, stroke) {
      this.pool = new Pool();
      this.element = element;
      this.stroke = stroke;
      this.circleConf = {
        isCircle: true
      };
      this.initHandler();
      this.name = "BaseRenderer";
    }

    var _proto = BaseRenderer.prototype;

    _proto.setStroke = function setStroke(color, thinkness) {
      if (color === void 0) {
        color = "#000000";
      }

      if (thinkness === void 0) {
        thinkness = 1;
      }

      this.stroke = {
        color: color,
        thinkness: thinkness
      };
    };

    _proto.initHandler = function initHandler() {
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
    };

    _proto.init = function init(proton) {
      this.parent = proton;
      proton.addEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      proton.addEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
      proton.addEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      proton.addEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
      proton.addEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      proton.addEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      proton.addEventListener("PARTICLE_DEAD", this._particleDeadHandler);
    };

    _proto.resize = function resize(width, height) {};

    _proto.destroy = function destroy() {
      this.remove();
      this.pool.destroy();
      this.pool = null;
      this.element = null;
      this.element = null;
    };

    _proto.remove = function remove(proton) {
      this.parent.removeEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      this.parent.removeEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
      this.parent.removeEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      this.parent.removeEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
      this.parent.removeEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      this.parent.removeEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      this.parent.removeEventListener("PARTICLE_DEAD", this._particleDeadHandler);
      this.parent = null;
    };

    _proto.onProtonUpdate = function onProtonUpdate() {};

    _proto.onProtonUpdateAfter = function onProtonUpdateAfter() {};

    _proto.onEmitterAdded = function onEmitterAdded(emitter) {};

    _proto.onEmitterRemoved = function onEmitterRemoved(emitter) {};

    _proto.onParticleCreated = function onParticleCreated(particle) {};

    _proto.onParticleUpdate = function onParticleUpdate(particle) {};

    _proto.onParticleDead = function onParticleDead(particle) {};

    return BaseRenderer;
  }();

  var CanvasRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CanvasRenderer, _BaseRenderer);

    function CanvasRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = null;
      _this.context = _this.element.getContext("2d");
      _this.bufferCache = {};
      _this.name = "CanvasRenderer";
      return _this;
    }

    var _proto = CanvasRenderer.prototype;

    _proto.resize = function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    };

    _proto.onProtonUpdate = function onProtonUpdate() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
    };

    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.color = particle.color || "#ff0000";
      }
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.body) {
        if (particle.body instanceof Image) this.drawImage(particle);
      } else {
        this.drawCircle(particle);
      }
    };

    _proto.onParticleDead = function onParticleDead(particle) {
      particle.body = null;
    } // private method
    ;

    _proto.addImg2Body = function addImg2Body(img, particle) {
      particle.body = img;
    } // private drawCircle
    ;

    _proto.drawImage = function drawImage(particle) {
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
    } // private drawCircle --
    ;

    _proto.drawCircle = function drawCircle(particle) {
      if (particle.rgb) {
        this.context.fillStyle = "rgba(" + particle.rgb.r + "," + particle.rgb.g + "," + particle.rgb.b + "," + particle.alpha + ")";
      } else {
        this.context.fillStyle = particle.color;
      } // draw circle


      this.context.beginPath();
      this.context.arc(particle.p.x, particle.p.y, particle.radius, 0, Math.PI * 2, true);

      if (this.stroke) {
        this.context.strokeStyle = this.stroke.color;
        this.context.lineWidth = this.stroke.thinkness;
        this.context.stroke();
      }

      this.context.closePath();
      this.context.fill();
    } // private createBuffer
    ;

    _proto.createBuffer = function createBuffer(image) {
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
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
      this.context = null;
      this.bufferCache = null;
    };

    return CanvasRenderer;
  }(BaseRenderer);

  var DomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(DomRenderer, _BaseRenderer);

    function DomRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = null;
      _this.transform3d = false;

      _this.pool.create = function (body, particle) {
        return _this.createBody(body, particle);
      };

      _this.addImg2Body = _this.addImg2Body.bind(_assertThisInitialized(_this));
      _this.name = "DomRenderer";
      return _this;
    }

    var _proto = DomRenderer.prototype;

    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.body = this.pool.get(this.circleConf, particle);
        this.element.appendChild(particle.body);
      }
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
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
    };

    _proto.onParticleDead = function onParticleDead(particle) {
      if (this.bodyReady(particle)) {
        this.element.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }
    };

    _proto.bodyReady = function bodyReady(particle) {
      return typeof particle.body === "object" && particle.body && !particle.body.isInner;
    } // private method
    ;

    _proto.addImg2Body = function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = this.pool.get(img, particle);
      DomUtil.resize(particle.body, img.width, img.height);
      this.element.appendChild(particle.body);
    };

    _proto.createBody = function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);
      return this.createSprite(body, particle);
    } // private methods
    ;

    _proto.createCircle = function createCircle(particle) {
      var dom = DomUtil.createDiv(particle.id + "_dom", 2 * particle.radius, 2 * particle.radius);
      dom.style.borderRadius = particle.radius + "px";

      if (this.stroke) {
        dom.style.borderColor = this.stroke.color;
        dom.style.borderWidth = this.stroke.thinkness + "px";
      }

      dom.isCircle = true;
      return dom;
    };

    _proto.createSprite = function createSprite(body, particle) {
      var url = typeof body === "string" ? body : body.src;
      var dom = DomUtil.createDiv(particle.id + "_dom", body.width, body.height);
      dom.style.backgroundImage = "url(" + url + ")";
      return dom;
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
    };

    return DomRenderer;
  }(BaseRenderer);

  var EaselRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(EaselRenderer, _BaseRenderer);

    function EaselRenderer(element, stroke) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = stroke;
      _this.name = "EaselRenderer";
      return _this;
    }

    var _proto = EaselRenderer.prototype;

    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        this.createSprite(particle);
      } else {
        this.createCircle(particle);
      }

      this.element.addChild(particle.body);
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.body) {
        particle.body.x = particle.p.x;
        particle.body.y = particle.p.y;
        particle.body.alpha = particle.alpha;
        particle.body.scaleX = particle.body.scaleY = particle.scale;
        particle.body.rotation = particle.rotation;
      }
    };

    _proto.onParticleDead = function onParticleDead(particle) {
      if (particle.body) {
        particle.body.parent && particle.body.parent.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }

      if (particle.graphics) this.pool.expire(particle.graphics);
    } // private
    ;

    _proto.createSprite = function createSprite(particle) {
      particle.body = this.pool.get(particle.body);
      if (particle.body.parent) return;

      if (particle.body["image"]) {
        particle.body.regX = particle.body.image.width / 2;
        particle.body.regY = particle.body.image.height / 2;
      }
    };

    _proto.createCircle = function createCircle(particle) {
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
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
    };

    return EaselRenderer;
  }(BaseRenderer);

  var PixelRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixelRenderer, _BaseRenderer);

    function PixelRenderer(element, rectangle) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.context = _this.element.getContext("2d");
      _this.imageData = null;
      _this.rectangle = rectangle;

      _this.createImageData(rectangle);

      _this.name = "PixelRenderer";
      return _this;
    }

    var _proto = PixelRenderer.prototype;

    _proto.resize = function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    };

    _proto.createImageData = function createImageData(rectangle) {
      this.rectangle = rectangle ? rectangle : new Rectangle(0, 0, this.element.width, this.element.height);
      this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height);
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    };

    _proto.onProtonUpdate = function onProtonUpdate() {
      this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
      this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    };

    _proto.onProtonUpdateAfter = function onProtonUpdateAfter() {
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    };

    _proto.onParticleCreated = function onParticleCreated(particle) {};

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (this.imageData) {
        this.setPixel(this.imageData, particle.p.x - this.rectangle.x >> 0, particle.p.y - this.rectangle.y >> 0, particle);
      }
    };

    _proto.setPixel = function setPixel(imagedata, x, y, particle) {
      var rgb = particle.rgb;
      if (x < 0 || x > this.element.width || y < 0 || y > this.elementwidth) return;
      var i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;
      imagedata.data[i] = rgb.r;
      imagedata.data[i + 1] = rgb.g;
      imagedata.data[i + 2] = rgb.b;
      imagedata.data[i + 3] = particle.alpha * 255;
    };

    _proto.onParticleDead = function onParticleDead(particle) {};

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
      this.context = null;
      this.imageData = null;
      this.rectangle = null;
    };

    return PixelRenderer;
  }(BaseRenderer);

  var PIXIClass;

  var PixiRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixiRenderer, _BaseRenderer);

    function PixiRenderer(element, stroke) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
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

    var _proto = PixiRenderer.prototype;

    _proto.setPIXI = function setPIXI(PIXI) {
      try {
        PIXIClass = PIXI || {
          Sprite: {}
        };
        this.createFromImage = PIXIClass.Sprite.from || PIXIClass.Sprite.fromImage;
      } catch (e) {}
    };

    _proto.onProtonUpdate = function onProtonUpdate() {}
    /**
     * @param particle
     */
    ;

    _proto.onParticleCreated = function onParticleCreated(particle) {
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
    ;

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      this.transform(particle, particle.body);

      if (this.setColor === true || this.color === true) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      }
    }
    /**
     * @param particle
     */
    ;

    _proto.onParticleDead = function onParticleDead(particle) {
      this.element.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    };

    _proto.transform = function transform(particle, target) {
      target.x = particle.p.x;
      target.y = particle.p.y;
      target.alpha = particle.alpha;
      target.scale.x = particle.scale;
      target.scale.y = particle.scale; // using cached version of MathUtil.PI_180 for slight performance increase.

      target.rotation = particle.rotation * MathUtil.PI_180; // MathUtil.PI_180;
    };

    _proto.createBody = function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);else return this.createSprite(body);
    };

    _proto.createSprite = function createSprite(body) {
      var sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      return sprite;
    };

    _proto.createCircle = function createCircle(particle) {
      var graphics = new PIXIClass.Graphics();

      if (this.stroke) {
        var stroke = this.stroke instanceof String ? this.stroke : 0x000000;
        graphics.beginStroke(stroke);
      }

      graphics.beginFill(particle.color || 0x008ced);
      graphics.drawCircle(0, 0, particle.radius);
      graphics.endFill();
      return graphics;
    };

    _proto.destroy = function destroy(particles) {
      _BaseRenderer.prototype.destroy.call(this);

      var i = particles.length;

      while (i--) {
        var particle = particles[i];

        if (particle.body) {
          this.element.removeChild(particle.body);
        }
      }
    };

    return PixiRenderer;
  }(BaseRenderer);

  var MStack = /*#__PURE__*/function () {
    function MStack() {
      this.mats = [];
      this.size = 0;

      for (var i = 0; i < 20; i++) {
        this.mats.push(Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
      }
    }

    var _proto = MStack.prototype;

    _proto.set = function set(m, i) {
      if (i === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[i - 1], m, this.mats[i]);
      this.size = Math.max(this.size, i + 1);
    };

    _proto.push = function push(m) {
      if (this.size === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);
      this.size++;
    };

    _proto.pop = function pop() {
      if (this.size > 0) this.size--;
    };

    _proto.top = function top() {
      return this.mats[this.size - 1];
    };

    return MStack;
  }();

  var WebGLRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(WebGLRenderer, _BaseRenderer);

    function WebGLRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.gl = _this.element.getContext("experimental-webgl", {
        antialias: true,
        stencil: false,
        depth: false
      });
      if (!_this.gl) alert("Sorry your browser do not suppest WebGL!");

      _this.initVar();

      _this.setMaxRadius();

      _this.initShaders();

      _this.initBuffers();

      _this.gl.blendEquation(_this.gl.FUNC_ADD);

      _this.gl.blendFunc(_this.gl.SRC_ALPHA, _this.gl.ONE_MINUS_SRC_ALPHA);

      _this.gl.enable(_this.gl.BLEND);

      _this.addImg2Body = _this.addImg2Body.bind(_assertThisInitialized(_this));
      _this.name = "WebGLRenderer";
      return _this;
    }

    var _proto = WebGLRenderer.prototype;

    _proto.init = function init(proton) {
      _BaseRenderer.prototype.init.call(this, proton);

      this.resize(this.element.width, this.element.height);
    };

    _proto.resize = function resize(width, height) {
      this.umat[4] = -2;
      this.umat[7] = 1;
      this.smat[0] = 1 / width;
      this.smat[4] = 1 / height;
      this.mstack.set(this.umat, 0);
      this.mstack.set(this.smat, 1);
      this.gl.viewport(0, 0, width, height);
      this.element.width = width;
      this.element.height = height;
    };

    _proto.setMaxRadius = function setMaxRadius(radius) {
      this.circleCanvasURL = this.createCircle(radius);
    };

    _proto.getVertexShader = function getVertexShader() {
      var vsSource = ["uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}"].join("\n");
      return vsSource;
    };

    _proto.getFragmentShader = function getFragmentShader() {
      var fsSource = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}"].join("\n");
      return fsSource;
    };

    _proto.initVar = function initVar() {
      this.mstack = new MStack();
      this.umat = Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
      this.smat = Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
      this.texturebuffers = {};
    };

    _proto.blendEquation = function blendEquation(A) {
      this.gl.blendEquation(this.gl[A]);
    };

    _proto.blendFunc = function blendFunc(A, B) {
      this.gl.blendFunc(this.gl[A], this.gl[B]);
    };

    _proto.getShader = function getShader(gl, str, fs) {
      var shader = fs ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(shader, str);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      }

      return shader;
    };

    _proto.initShaders = function initShaders() {
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
    };

    _proto.initBuffers = function initBuffers() {
      var vs = [0, 3, 1, 0, 2, 3];
      var idx;
      this.unitIBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);
      var i;
      var ids = [];

      for (i = 0; i < 100; i++) {
        ids.push(i);
      }

      idx = new Uint16Array(ids);
      this.unitI33 = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
      ids = [];

      for (i = 0; i < 100; i++) {
        ids.push(i, i + 1, i + 2);
      }

      idx = new Uint16Array(ids);
      this.stripBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
    };

    _proto.createCircle = function createCircle(raidus) {
      this.circleCanvasRadius = WebGLUtil.nhpot(Util.initValue(raidus, 32));
      var canvas = DomUtil.createCanvas("circle_canvas", this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
      var context = canvas.getContext("2d");
      context.beginPath();
      context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
      context.closePath();
      context.fillStyle = "#FFF";
      context.fill();
      return canvas.toDataURL();
    };

    _proto.drawImg2Canvas = function drawImg2Canvas(particle) {
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
    };

    _proto.onProtonUpdate = function onProtonUpdate() {// this.gl.clearColor(0, 0, 0, 1);
      // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    };

    _proto.onParticleCreated = function onParticleCreated(particle) {
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
    } // private
    ;

    _proto.addImg2Body = function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = img;
      particle.data.src = img.src;
      particle.data.canvas = ImgUtil.getCanvasFromCache(img);
      particle.data.oldScale = 1;
      this.drawImg2Canvas(particle);
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
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
    };

    _proto.onParticleDead = function onParticleDead(particle) {};

    _proto.updateMatrix = function updateMatrix(particle) {
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
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.gl = null;
      this.mstack = null;
      this.umat = null;
      this.smat = null;
      this.texturebuffers = null;
    };

    return WebGLRenderer;
  }(BaseRenderer);

  var CustomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CustomRenderer, _BaseRenderer);

    function CustomRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.name = "CustomRenderer";
      return _this;
    }

    return CustomRenderer;
  }(BaseRenderer);

  var LineZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(LineZone, _Zone);

    function LineZone(x1, y1, x2, y2, direction) {
      var _this;

      _this = _Zone.call(this) || this;

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

    var _proto = LineZone.prototype;

    _proto.getPosition = function getPosition() {
      this.random = Math.random();
      this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
      this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);
      return this.vector;
    };

    _proto.getDirection = function getDirection(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = B === 0 ? 1 : B;
      if ((A * x + B * y + C) * D > 0) return true;else return false;
    };

    _proto.getDistance = function getDistance(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = A * x + B * y + C;
      return D / Math.sqrt(this.xxyy);
    };

    _proto.getSymmetric = function getSymmetric(v) {
      var tha2 = v.getGradient();
      var tha1 = this.getGradient();
      var tha = 2 * (tha1 - tha2);
      var oldx = v.x;
      var oldy = v.y;
      v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
      return v;
    };

    _proto.getGradient = function getGradient() {
      return Math.atan2(this.dy, this.dx);
    };

    _proto.rangeOut = function rangeOut(particle) {
      var angle = Math.abs(this.getGradient());

      if (angle <= MathUtil.PI / 4) {
        if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
      } else {
        if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
      }

      return false;
    };

    _proto.getLength = function getLength() {
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };

    _proto.crossing = function crossing(particle) {
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
    };

    return LineZone;
  }(Zone);

  var CircleZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(CircleZone, _Zone);

    function CircleZone(x, y, radius) {
      var _this;

      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this.radius = radius;
      _this.angle = 0;
      _this.center = {
        x: x,
        y: y
      };
      return _this;
    }

    var _proto = CircleZone.prototype;

    _proto.getPosition = function getPosition() {
      this.angle = MathUtil.PIx2 * Math.random();
      this.randomRadius = Math.random() * this.radius;
      this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
      this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);
      return this.vector;
    };

    _proto.setCenter = function setCenter(x, y) {
      this.center.x = x;
      this.center.y = y;
    };

    _proto.crossing = function crossing(particle) {
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
    };

    _proto.getSymmetric = function getSymmetric(particle) {
      var tha2 = particle.v.getGradient();
      var tha1 = this.getGradient(particle);
      var tha = 2 * (tha1 - tha2);
      var oldx = particle.v.x;
      var oldy = particle.v.y;
      particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
    };

    _proto.getGradient = function getGradient(particle) {
      return -MathUtil.PI_2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
    };

    return CircleZone;
  }(Zone);

  var RectZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(RectZone, _Zone);

    function RectZone(x, y, width, height) {
      var _this;

      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this.width = width;
      _this.height = height;
      return _this;
    }

    var _proto = RectZone.prototype;

    _proto.getPosition = function getPosition() {
      this.vector.x = this.x + Math.random() * this.width;
      this.vector.y = this.y + Math.random() * this.height;
      return this.vector;
    };

    _proto.crossing = function crossing(particle) {
      // particle dead zone
      if (this.crossType === "dead") {
        if (particle.p.x + particle.radius < this.x) particle.dead = true;else if (particle.p.x - particle.radius > this.x + this.width) particle.dead = true;
        if (particle.p.y + particle.radius < this.y) particle.dead = true;else if (particle.p.y - particle.radius > this.y + this.height) particle.dead = true;
      } // particle bound zone
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
      } // particle cross zone
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
    };

    return RectZone;
  }(Zone);

  var ImageZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(ImageZone, _Zone);

    function ImageZone(imageData, x, y, d) {
      var _this;

      _this = _Zone.call(this) || this;

      _this.reset(imageData, x, y, d);

      return _this;
    }

    var _proto = ImageZone.prototype;

    _proto.reset = function reset(imageData, x, y, d) {
      this.imageData = imageData;
      this.x = Util.initValue(x, 0);
      this.y = Util.initValue(y, 0);
      this.d = Util.initValue(d, 2);
      this.vectors = [];
      this.setVectors();
    };

    _proto.setVectors = function setVectors() {
      var i, j;
      var length1 = this.imageData.width;
      var length2 = this.imageData.height;

      for (i = 0; i < length1; i += this.d) {
        for (j = 0; j < length2; j += this.d) {
          var index = ((j >> 0) * length1 + (i >> 0)) * 4;

          if (this.imageData.data[index + 3] > 0) {
            this.vectors.push({
              x: i + this.x,
              y: j + this.y
            });
          }
        }
      }

      return this.vector;
    };

    _proto.getBound = function getBound(x, y) {
      var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      if (this.imageData.data[index + 3] > 0) return true;else return false;
    };

    _proto.getPosition = function getPosition() {
      var vector = Util.getRandFromArray(this.vectors);
      return this.vector.copy(vector);
    };

    _proto.getColor = function getColor(x, y) {
      x -= this.x;
      y -= this.y;
      var i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      return {
        r: this.imageData.data[i],
        g: this.imageData.data[i + 1],
        b: this.imageData.data[i + 2],
        a: this.imageData.data[i + 3]
      };
    };

    _proto.crossing = function crossing(particle) {
      if (this.crossType === "dead") {
        if (this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.dead = true;else particle.dead = false;
      } else if (this.crossType === "bound") {
        if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.v.negate();
      }
    };

    _proto.destroy = function destroy() {
      _Zone.prototype.destroy.call(this);

      this.imageData = null;
    };

    return ImageZone;
  }(Zone);

  var Debug = {
    addEventListener: function addEventListener(proton, func) {
      proton.addEventListener("PROTON_UPDATE_AFTER", function () {
        return func();
      });
    },
    getStyle: function getStyle(color) {
      if (color === void 0) {
        color = "#ff0000";
      }

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
  Proton.Span = Span$1;
  Proton.Mat3 = Mat3;

  Proton.getSpan = function (a, b, center) {
    return new Span$1(a, b, center);
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
  Util.assign(Proton, ease); // export

  return Proton;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy91dGlscy9Qcm9wVXRpbC5qcyIsIi4uL3NyYy9tYXRoL2Vhc2UuanMiLCIuLi9zcmMvbWF0aC9WZWN0b3IyRC5qcyIsIi4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIiwiLi4vc3JjL3V0aWxzL0NvbG9yVXRpbC5qcyIsIi4uL3NyYy9tYXRoL1BvbGFyMkQuanMiLCIuLi9zcmMvbWF0aC9NYXQzLmpzIiwiLi4vc3JjL21hdGgvU3Bhbi5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIGdldFJhbmRGcm9tQXJyYXkoYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihhcnIubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZW1wdHlPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbnkgb2JqZWN0XG4gICAqL1xuICBlbXB0eU9iamVjdChvYmosIGlnbm9yZSA9IG51bGwpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKGtleSkgPiAtMSkgY29udGludWU7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzIGFuZCBiaW5kcyB0aGUgZ2l2ZW4gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGNsYXNzQXBwbHlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQSBjbGFzcyB0byBtYWtlIGFuIGluc3RhbmNlIGZyb21cbiAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIEFueSBhcnJheSB0byBiaW5kIGl0IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBpbnN0YW5jZSBvZiBjb25zdHJ1Y3Rvciwgb3B0aW9uYWxseSBiaW5kIHdpdGggYXJnc1xuICAgKi9cbiAgY2xhc3NBcHBseShjb25zdHJ1Y3RvciwgYXJncyA9IG51bGwpIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgRmFjdG9yeUZ1bmMgPSBjb25zdHJ1Y3Rvci5iaW5kLmFwcGx5KGNvbnN0cnVjdG9yLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgRmFjdG9yeUZ1bmMoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIHJldHVybiBJbWdVdGlsLmdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCk7XG4gIH0sXG5cbiAgZGVzdHJveUFsbChhcnIsIHBhcmFtID0gbnVsbCkge1xuICAgIGxldCBpID0gYXJyLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycltpXS5kZXN0cm95KHBhcmFtKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGRlbGV0ZSBhcnJbaV07XG4gICAgfVxuXG4gICAgYXJyLmxlbmd0aCA9IDA7XG4gIH0sXG5cbiAgYXNzaWduKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBpZHNNYXAgPSB7fTtcblxuY29uc3QgUHVpZCA9IHtcbiAgX2luZGV4OiAwLFxuICBfY2FjaGU6IHt9LFxuXG4gIGlkKHR5cGUpIHtcbiAgICBpZiAoaWRzTWFwW3R5cGVdID09PSB1bmRlZmluZWQgfHwgaWRzTWFwW3R5cGVdID09PSBudWxsKSBpZHNNYXBbdHlwZV0gPSAwO1xuICAgIHJldHVybiBgJHt0eXBlfV8ke2lkc01hcFt0eXBlXSsrfWA7XG4gIH0sXG5cbiAgZ2V0SWQodGFyZ2V0KSB7XG4gICAgbGV0IHVpZCA9IHRoaXMuZ2V0SWRGcm9tQ2FjaGUodGFyZ2V0KTtcbiAgICBpZiAodWlkKSByZXR1cm4gdWlkO1xuXG4gICAgdWlkID0gYFBVSURfJHt0aGlzLl9pbmRleCsrfWA7XG4gICAgdGhpcy5fY2FjaGVbdWlkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdWlkO1xuICB9LFxuXG4gIGdldElkRnJvbUNhY2hlKHRhcmdldCkge1xuICAgIGxldCBvYmosIGlkO1xuXG4gICAgZm9yIChpZCBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgb2JqID0gdGhpcy5fY2FjaGVbaWRdO1xuXG4gICAgICBpZiAob2JqID09PSB0YXJnZXQpIHJldHVybiBpZDtcbiAgICAgIGlmICh0aGlzLmlzQm9keShvYmosIHRhcmdldCkgJiYgb2JqLnNyYyA9PT0gdGFyZ2V0LnNyYykgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGlzQm9keShvYmosIHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgb2JqLmlzSW5uZXIgJiYgdGFyZ2V0LmlzSW5uZXI7XG4gIH0sXG5cbiAgZ2V0VGFyZ2V0KHVpZCkge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZVt1aWRdO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWlkO1xuIiwiLyoqXG4gKiBQb29sIGlzIHRoZSBjYWNoZSBwb29sIG9mIHRoZSBwcm90b24gZW5naW5lLCBpdCBpcyB2ZXJ5IGltcG9ydGFudC5cbiAqXG4gKiBnZXQodGFyZ2V0LCBwYXJhbXMsIHVpZClcbiAqICBDbGFzc1xuICogICAgdWlkID0gUHVpZC5nZXRJZCAtPiBQdWlkIHNhdmUgdGFyZ2V0IGNhY2hlXG4gKiAgICB0YXJnZXQuX19wdWlkID0gdWlkXG4gKlxuICogIGJvZHlcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICpcbiAqXG4gKiBleHBpcmUodGFyZ2V0KVxuICogIGNhY2hlW3RhcmdldC5fX3B1aWRdIHB1c2ggdGFyZ2V0XG4gKlxuICovXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUG9vbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIG9mIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvdGFsXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjYWNoZVxuICAgKi9cbiAgY29uc3RydWN0b3IobnVtKSB7XG4gICAgdGhpcy50b3RhbCA9IDA7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpIHtcbiAgICBsZXQgcDtcbiAgICB1aWQgPSB1aWQgfHwgdGFyZ2V0Ll9fcHVpZCB8fCBQdWlkLmdldElkKHRhcmdldCk7XG5cbiAgICBpZiAodGhpcy5jYWNoZVt1aWRdICYmIHRoaXMuY2FjaGVbdWlkXS5sZW5ndGggPiAwKSB7XG4gICAgICBwID0gdGhpcy5jYWNoZVt1aWRdLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0gdGhpcy5jcmVhdGVPckNsb25lKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBwLl9fcHVpZCA9IHRhcmdldC5fX3B1aWQgfHwgdWlkO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZXhwaXJlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlKHRhcmdldC5fX3B1aWQpLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNsYXNzIGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb25cbiAgICpcbiAgICogQG1ldGhvZCBjcmVhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0IGFueSBPYmplY3Qgb3IgRnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcykge1xuICAgIHRoaXMudG90YWwrKztcblxuICAgIGlmICh0aGlzLmNyZWF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIFV0aWwuY2xhc3NBcHBseSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIC0gd2hhdCBpcyBpbiB0aGUgY2FjaGU/XG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGlkIGluIHRoaXMuY2FjaGUpIGNvdW50ICs9IHRoaXMuY2FjaGVbaWRdLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgYWxsIGl0ZW1zIGZyb20gUG9vbC5jYWNoZVxuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlW2lkXS5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbaWRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDYWNoZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB1aWQgdGhlIHVuaXF1ZSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXRDYWNoZSh1aWQgPSBcImRlZmF1bHRcIikge1xuICAgIGlmICghdGhpcy5jYWNoZVt1aWRdKSB0aGlzLmNhY2hlW3VpZF0gPSBbXTtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVt1aWRdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyB7XG4gIGNvbnN0cnVjdG9yKHByb3Rvbikge1xuICAgIHRoaXMucHJvdG9uID0gcHJvdG9uO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnR5cGUgPSAxO1xuXG4gICAgdGhpcy5lbWl0dGVySW5kZXggPSAwO1xuICAgIHRoaXMucmVuZGVyZXJJbmRleCA9IDA7XG4gIH1cblxuICB1cGRhdGUoc3R5bGUsIGJvZHkpIHtcbiAgICB0aGlzLmFkZChzdHlsZSwgYm9keSk7XG5cbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5nZXRFbWl0dGVyKCk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKCk7XG4gICAgbGV0IHN0ciA9IFwiXCI7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHIgKz0gXCJlbWl0dGVyOlwiICsgdGhpcy5wcm90b24uZW1pdHRlcnMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJlbSBzcGVlZDpcIiArIGVtaXR0ZXIuZW1pdFNwZWVkICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJwb3M6XCIgKyB0aGlzLmdldEVtaXR0ZXJQb3MoZW1pdHRlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJpbml0aWFsaXplczpcIiArIGVtaXR0ZXIuaW5pdGlhbGl6ZXMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKVxuICAgICAgICAgIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5pbml0aWFsaXplcykgKyBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJiZWhhdmlvdXJzOlwiICsgZW1pdHRlci5iZWhhdmlvdXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9ICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPicgKyB0aGlzLmNvbmNhdEFycihlbWl0dGVyLmJlaGF2aW91cnMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSByZW5kZXJlci5uYW1lICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChyZW5kZXJlcikgc3RyICs9IFwiYm9keTpcIiArIHRoaXMuZ2V0Q3JlYXRlZE51bWJlcihyZW5kZXJlcikgKyBcIjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN0ciArPSBcInBhcnRpY2xlczpcIiArIHRoaXMucHJvdG9uLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwicG9vbDpcIiArIHRoaXMucHJvdG9uLnBvb2wuZ2V0Q291bnQoKSArIFwiPGJyPlwiO1xuICAgICAgICBzdHIgKz0gXCJ0b3RhbDpcIiArIHRoaXMucHJvdG9uLnBvb2wudG90YWw7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gc3RyO1xuICB9XG5cbiAgYWRkKHN0eWxlLCBib2R5KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy50eXBlID0gMTtcblxuICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MHB4O2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtcIixcbiAgICAgICAgXCJvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwO3BhZGRpbmc6MTBweDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcIixcbiAgICAgICAgXCJ3aWR0aDoxMjBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDI7Y29sb3I6IzBmZjtcIlxuICAgICAgXS5qb2luKFwiXCIpO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHRoaXMudHlwZSsrO1xuICAgICAgICAgIGlmICh0aGlzLnR5cGUgPiA0KSB0aGlzLnR5cGUgPSAxO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcblxuICAgICAgbGV0IGJnLCBjb2xvcjtcbiAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGJnID0gXCIjMjAxXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiNmMDhcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgYmcgPSBcIiMwMjBcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmMFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYmcgPSBcIiMwMDJcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmZlwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBiZztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlW1wiY29sb3JcIl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGJvZHkgPSBib2R5IHx8IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW1pdHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm90b24uZW1pdHRlcnNbdGhpcy5lbWl0dGVySW5kZXhdO1xuICB9XG5cbiAgZ2V0UmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLnJlbmRlcmVyc1t0aGlzLnJlbmRlcmVySW5kZXhdO1xuICB9XG5cbiAgY29uY2F0QXJyKGFycikge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGlmICghYXJyIHx8ICFhcnIubGVuZ3RoKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSAoYXJyW2ldLm5hbWUgfHwgXCJcIikuc3Vic3RyKDAsIDEpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpIHtcbiAgICByZXR1cm4gcmVuZGVyZXIucG9vbC50b3RhbCB8fCAocmVuZGVyZXIuY3Bvb2wgJiYgcmVuZGVyZXIuY3Bvb2wudG90YWwpIHx8IDA7XG4gIH1cblxuICBnZXRFbWl0dGVyUG9zKGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChlLnAueCkgKyBcIixcIiArIE1hdGgucm91bmQoZS5wLnkpO1xuICB9XG59XG4iLCIvKlxuICogRXZlbnREaXNwYXRjaGVyXG4gKiBUaGlzIGNvZGUgcmVmZXJlbmNlIHNpbmNlIGh0dHA6Ly9jcmVhdGVqcy5jb20vLlxuICpcbiAqKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBiaW5kKHRhcmdldCkge1xuICAgIHRhcmdldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudDtcbiAgICB0YXJnZXQucHJvdG90eXBlLmhhc0V2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmhhc0V2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVBbGxFdmVudExpc3RlbmVycztcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykgcmV0dXJuO1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSByZXR1cm47XG5cbiAgICBjb25zdCBhcnIgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgY29uc3QgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWxsb3dzIGZvciBmYXN0ZXIgY2hlY2tzLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnModHlwZSkge1xuICAgIGlmICghdHlwZSkgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICBlbHNlIGlmICh0aGlzLl9saXN0ZW5lcnMpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KHR5cGUsIGFyZ3MpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuXG4gICAgaWYgKHR5cGUgJiYgbGlzdGVuZXJzKSB7XG4gICAgICBsZXQgYXJyID0gbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgaWYgKCFhcnIpIHJldHVybiByZXN1bHQ7XG5cbiAgICAgIC8vIGFyciA9IGFyci5zbGljZSgpO1xuICAgICAgLy8gdG8gYXZvaWQgaXNzdWVzIHdpdGggaXRlbXMgYmVpbmcgcmVtb3ZlZCBvciBhZGRlZCBkdXJpbmcgdGhlIGRpc3BhdGNoXG5cbiAgICAgIGxldCBoYW5kbGVyO1xuICAgICAgbGV0IGkgPSBhcnIubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBoYW5kbGVyID0gYXJyW2ldO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgaGFuZGxlcihhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH1cblxuICBoYXNFdmVudExpc3RlbmVyKHR5cGUpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgcmV0dXJuICEhKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnNbdHlwZV0pO1xuICB9XG59XG4iLCJjb25zdCBQSSA9IDMuMTQxNTkyNjtcbmNvbnN0IElORklOSVRZID0gSW5maW5pdHk7XG5cbmNvbnN0IE1hdGhVdGlsID0ge1xuICBQSTogUEksXG4gIFBJeDI6IFBJICogMixcbiAgUElfMjogUEkgLyAyLFxuICBQSV8xODA6IFBJIC8gMTgwLFxuICBOMTgwX1BJOiAxODAgLyBQSSxcbiAgSW5maW5pdHk6IC05OTksXG5cbiAgaXNJbmZpbml0eShudW0pIHtcbiAgICByZXR1cm4gbnVtID09PSB0aGlzLkluZmluaXR5IHx8IG51bSA9PT0gSU5GSU5JVFk7XG4gIH0sXG5cbiAgcmFuZG9tQVRvQihhLCBiLCBpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKCFpc0ludCkgcmV0dXJuIGEgKyBNYXRoLnJhbmRvbSgpICogKGIgLSBhKTtcbiAgICBlbHNlIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpKSArIGE7XG4gIH0sXG5cbiAgcmFuZG9tRmxvYXRpbmcoY2VudGVyLCBmLCBpc0ludCkge1xuICAgIHJldHVybiB0aGlzLnJhbmRvbUFUb0IoY2VudGVyIC0gZiwgY2VudGVyICsgZiwgaXNJbnQpO1xuICB9LFxuXG4gIHJhbmRvbUNvbG9yKCkge1xuICAgIHJldHVybiBcIiNcIiArIChcIjAwMDAwXCIgKyAoKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDApIDw8IDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTYpO1xuICB9LFxuXG4gIHJhbmRvbVpvbmUoZGlzcGxheSkge30sXG5cbiAgZmxvb3IobnVtLCBrID0gNCkge1xuICAgIGNvbnN0IGRpZ2l0cyA9IE1hdGgucG93KDEwLCBrKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihudW0gKiBkaWdpdHMpIC8gZGlnaXRzO1xuICB9LFxuXG4gIGRlZ3JlZVRyYW5zZm9ybShhKSB7XG4gICAgcmV0dXJuIChhICogUEkpIC8gMTgwO1xuICB9LFxuXG4gIHRvQ29sb3IxNihudW0pIHtcbiAgICByZXR1cm4gYCMke251bS50b1N0cmluZygxNil9YDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0aFV0aWw7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ3JhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgY2FsY3VsYXRlKHBhcnRpY2xlcywgdGltZSwgZGFtcGluZykge1xuICAgIHRoaXMuZXVsZXJJbnRlZ3JhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKTtcbiAgfVxuXG4gIC8vIEV1bGVyIEludGVncmF0ZVxuICAvLyBodHRwczovL3Jvc2V0dGFjb2RlLm9yZy93aWtpL0V1bGVyX21ldGhvZFxuICBldWxlckludGVncmF0ZShwYXJ0aWNsZSwgdGltZSwgZGFtcGluZykge1xuICAgIGlmICghcGFydGljbGUuc2xlZXApIHtcbiAgICAgIHBhcnRpY2xlLm9sZC5wLmNvcHkocGFydGljbGUucCk7XG4gICAgICBwYXJ0aWNsZS5vbGQudi5jb3B5KHBhcnRpY2xlLnYpO1xuXG4gICAgICBwYXJ0aWNsZS5hLm11bHRpcGx5U2NhbGFyKDEgLyBwYXJ0aWNsZS5tYXNzKTtcbiAgICAgIHBhcnRpY2xlLnYuYWRkKHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIodGltZSkpO1xuICAgICAgcGFydGljbGUucC5hZGQocGFydGljbGUub2xkLnYubXVsdGlwbHlTY2FsYXIodGltZSkpO1xuXG4gICAgICBpZiAoZGFtcGluZykgcGFydGljbGUudi5tdWx0aXBseVNjYWxhcihkYW1waW5nKTtcblxuICAgICAgcGFydGljbGUuYS5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4vUG9vbFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTdGF0cyBmcm9tIFwiLi4vZGVidWcvU3RhdHNcIjtcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEludGVncmF0aW9uIGZyb20gXCIuLi9tYXRoL0ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3RvbiB7XG4gIHN0YXRpYyBVU0VfQ0xPQ0sgPSBmYWxzZTtcblxuICAvLyBtZWFzdXJlIDE6MTAwXG4gIHN0YXRpYyBNRUFTVVJFID0gMTAwO1xuICBzdGF0aWMgRVVMRVIgPSBcImV1bGVyXCI7XG4gIHN0YXRpYyBSSzIgPSBcInJ1bmdlLWt1dHRhMlwiO1xuXG4gIC8vIGV2ZW50IG5hbWVcbiAgc3RhdGljIFBBUlRJQ0xFX0NSRUFURUQgPSBcIlBBUlRJQ0xFX0NSRUFURURcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1VQREFURSA9IFwiUEFSVElDTEVfVVBEQVRFXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9TTEVFUCA9IFwiUEFSVElDTEVfU0xFRVBcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX0RFQUQgPSBcIlBBUlRJQ0xFX0RFQURcIjtcblxuICBzdGF0aWMgRU1JVFRFUl9BRERFRCA9IFwiRU1JVFRFUl9BRERFRFwiO1xuICBzdGF0aWMgRU1JVFRFUl9SRU1PVkVEID0gXCJFTUlUVEVSX1JFTU9WRURcIjtcblxuICBzdGF0aWMgUFJPVE9OX1VQREFURSA9IFwiUFJPVE9OX1VQREFURVwiO1xuICBzdGF0aWMgUFJPVE9OX1VQREFURV9BRlRFUiA9IFwiUFJPVE9OX1VQREFURV9BRlRFUlwiO1xuICBzdGF0aWMgREVGQVVMVF9JTlRFUlZBTCA9IDAuMDE2NztcblxuICBzdGF0aWMgYW1lbmRDaGFuZ2VUYWJzQnVnID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHRvIGFkZCBlbWl0dGVyc1xuICAgKlxuICAgKiBAY29uc3RydWN0b3IgUHJvdG9uXG4gICAqXG4gICAqIEB0b2RvIHByb1BhcnRpY2xlQ291bnQgaXMgbm90IGluIHVzZVxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uIG9mIHRoZSBzaW5nbGUgcHJvcGVydGllcyBhbmQgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gW3Byb1BhcnRpY2xlQ291bnRdIG5vdCBpbiB1c2U/XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbaW50ZWdyYXRpb25UeXBlPVByb3Rvbi5FVUxFUl1cbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKiBAcHJvcGVydHkge0FycmF5fSBlbWl0dGVycyAgIEFsbCBhZGRlZCBlbWl0dGVyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHJlbmRlcmVycyAgQWxsIGFkZGVkIHJlbmRlcmVyXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lICAgICAgVGhlIGFjdGl2ZSB0aW1lXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvbGR0aW1lICAgVGhlIG9sZCB0aW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbnRlZ3JhdGlvblR5cGUpIHtcbiAgICB0aGlzLmVtaXR0ZXJzID0gW107XG4gICAgdGhpcy5yZW5kZXJlcnMgPSBbXTtcblxuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5ub3cgPSAwO1xuICAgIHRoaXMudGhlbiA9IDA7XG4gICAgdGhpcy5lbGFwc2VkID0gMDtcblxuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHModGhpcyk7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woODApO1xuXG4gICAgdGhpcy5pbnRlZ3JhdGlvblR5cGUgPSBVdGlsLmluaXRWYWx1ZShpbnRlZ3JhdGlvblR5cGUsIFByb3Rvbi5FVUxFUik7XG4gICAgdGhpcy5pbnRlZ3JhdG9yID0gbmV3IEludGVncmF0aW9uKHRoaXMuaW50ZWdyYXRpb25UeXBlKTtcblxuICAgIHRoaXMuX2ZwcyA9IFwiYXV0b1wiO1xuICAgIHRoaXMuX2ludGVydmFsID0gUHJvdG9uLkRFRkFVTFRfSU5URVJWQUw7XG4gIH1cblxuICBzZXQgZnBzKGZwcykge1xuICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICB0aGlzLl9pbnRlcnZhbCA9IGZwcyA9PT0gXCJhdXRvXCIgPyBQcm90b24uREVGQVVMVF9JTlRFUlZBTCA6IE1hdGhVdGlsLmZsb29yKDEgLyBmcHMsIDcpO1xuICB9XG5cbiAgZ2V0IGZwcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZnBzO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIGFkZFJlbmRlcmVyKHJlbmRlcikge1xuICAgIHJlbmRlci5pbml0KHRoaXMpO1xuICAgIHRoaXMucmVuZGVyZXJzLnB1c2gocmVuZGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICByZW1vdmVSZW5kZXJlcihyZW5kZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucmVuZGVyZXJzLmluZGV4T2YocmVuZGVyKTtcbiAgICB0aGlzLnJlbmRlcmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJlbmRlci5yZW1vdmUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge0VtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIGFkZEVtaXR0ZXIoZW1pdHRlcikge1xuICAgIHRoaXMuZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IHRoaXM7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfQURERUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIHJlbW92ZUVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgcmVtb3ZlRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmVtaXR0ZXJzLmluZGV4T2YoZW1pdHRlcik7XG4gICAgdGhpcy5lbWl0dGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9SRU1PVkVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFsbCBhZGRlZCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIC8vICdhdXRvJyBpcyB0aGUgZGVmYXVsdCBicm93c2VyIHJlZnJlc2ggcmF0ZSwgdGhlIHZhc3QgbWFqb3JpdHkgaXMgNjBmcHNcbiAgICBpZiAodGhpcy5fZnBzID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcblxuICAgICAgaWYgKFByb3Rvbi5VU0VfQ0xPQ0spIHtcbiAgICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG4gICAgICAgIC8vIEZpeCBidWdzIHN1Y2ggYXMgY2hyb21lIGJyb3dzZXIgc3dpdGNoaW5nIHRhYnMgY2F1c2luZyBleGNlc3NpdmUgdGltZSBkaWZmZXJlbmNlXG4gICAgICAgIHRoaXMuYW1lbmRDaGFuZ2VUYWJzQnVnKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IDApIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5lbGFwc2VkKTtcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZnBzIGZyYW1lIHJhdGUgaXMgc2V0XG4gICAgZWxzZSB7XG4gICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuXG4gICAgICBpZiAodGhpcy5lbGFwc2VkID4gdGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NzY0MDE4L2NvbnRyb2xsaW5nLWZwcy13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZVxuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdyAtICh0aGlzLmVsYXBzZWQgJSB0aGlzLl9pbnRlcnZhbCkgKiAxMDAwO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVtaXR0ZXJzVXBkYXRlKGVsYXBzZWQpIHtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMuZW1pdHRlcnNbaV0udXBkYXRlKGVsYXBzZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGFtZW5kQ2hhbmdlVGFic0J1Z1xuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgYW1lbmRDaGFuZ2VUYWJzQnVnKCkge1xuICAgIGlmICghUHJvdG9uLmFtZW5kQ2hhbmdlVGFic0J1ZykgcmV0dXJuO1xuICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwLjUpIHtcbiAgICAgIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIGFsbCBwYXJ0aWNsZXMgZnJvbSBhbGwgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDb3VudFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgdG90YWwgKz0gdGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHJldHVybiB0b3RhbDtcbiAgfVxuXG4gIGdldEFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgcGFydGljbGVzID0gW107XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHBhcnRpY2xlcyA9IHBhcnRpY2xlcy5jb25jYXQodGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMpO1xuICAgIHJldHVybiBwYXJ0aWNsZXM7XG4gIH1cblxuICBkZXN0cm95QWxsRW1pdHRlcnMoKSB7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMuZW1pdHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byB0aGlzIFByb3RvbiBpbnN0YW5jZS4gVGhpcyBpbmNsdWRlcyBhbGwgZW1pdHRlcnMsIGFuZCBhbGwgcHJvcGVydGllc1xuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGRlc3Ryb3kocmVtb3ZlID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZXN0cm95T3RoZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgdGhpcy50aGVuID0gMDtcbiAgICAgIHRoaXMucG9vbC5kZXN0cm95KCk7XG5cbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnJlbmRlcmVycywgdGhpcy5nZXRBbGxQYXJ0aWNsZXMoKSk7XG4gICAgfTtcblxuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoZGVzdHJveU90aGVyLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95T3RoZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoUHJvdG9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJnYiB7XG4gIGNvbnN0cnVjdG9yKHIgPSAyNTUsIGcgPSAyNTUsIGIgPSAyNTUpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuciA9IDI1NTtcbiAgICB0aGlzLmcgPSAyNTU7XG4gICAgdGhpcy5iID0gMjU1O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGhhc1Byb3AodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfSxcblxuICAvKipcbiAgICogc2V0IHRoZSBwcm90b3R5cGUgaW4gYSBnaXZlbiBwcm90b3R5cGVPYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFByb3BcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyB0cmFuc2xhdGUgZGVzcmlwdGlvbiBmcm9tIGNoaW5lc2UgdG8gZW5nbGlzaFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGVPYmplY3QgQW4gb2JqZWN0IG9mIHNpbmdsZSBwcm90b3R5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gdGFyZ2V0XG4gICAqL1xuICBzZXRQcm9wKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IFNwYW4uZ2V0U3BhblZhbHVlKHByb3BzW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0VmVjdG9yVmFsXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgY29uZmBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mXG4gICAqL1xuICBzZXRWZWN0b3JWYWwocGFydGljbGUsIGNvbmYgPSBudWxsKSB7XG4gICAgaWYgKCFjb25mKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieFwiKSkgcGFydGljbGUucC54ID0gY29uZltcInhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInlcIikpIHBhcnRpY2xlLnAueSA9IGNvbmZbXCJ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ4XCIpKSBwYXJ0aWNsZS52LnggPSBjb25mW1widnhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ5XCIpKSBwYXJ0aWNsZS52LnkgPSBjb25mW1widnlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXhcIikpIHBhcnRpY2xlLmEueCA9IGNvbmZbXCJheFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXlcIikpIHBhcnRpY2xlLmEueSA9IGNvbmZbXCJheVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFcIl0pO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBvc2l0aW9uXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBvc2l0aW9uXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidmVsb2NpdHlcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widmVsb2NpdHlcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhY2NlbGVyYXRlXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFjY2VsZXJhdGVcIl0pO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZWFzZUxpbmVhcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICBlYXNlSW5RdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAyKTtcbiAgfSxcblxuICBlYXNlT3V0UXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgMikgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFkKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAyKTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluQ3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDMpO1xuICB9LFxuXG4gIGVhc2VPdXRDdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSAtIDEsIDMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRDdWJpYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG5cbiAgICByZXR1cm4gMC41ICogKE1hdGgucG93KHZhbHVlIC0gMiwgMykgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5RdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG4gIH0sXG5cbiAgZWFzZU91dFF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCA0KSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YXJ0KHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCA0KTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIE1hdGgucG93KHZhbHVlLCAzKSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJblNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLU1hdGguY29zKHZhbHVlICogTWF0aFV0aWwuUElfMikgKyAxO1xuICB9LFxuXG4gIGVhc2VPdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc2luKHZhbHVlICogTWF0aFV0aWwuUElfMik7XG4gIH0sXG5cbiAgZWFzZUluT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5FeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuICB9LFxuXG4gIGVhc2VPdXRFeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAxID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiB2YWx1ZSkgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEV4cG8odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApIHJldHVybiAwO1xuXG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gMTtcblxuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcblxuICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdmFsdWUpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluQ2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlT3V0Q2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KHZhbHVlIC0gMSwgMikpO1xuICB9LFxuXG4gIGVhc2VJbk91dENpcmModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh2YWx1ZSAtPSAyKSAqIHZhbHVlKSArIDEpO1xuICB9LFxuXG4gIGVhc2VJbkJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuIHZhbHVlICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlIC0gcyk7XG4gIH0sXG5cbiAgZWFzZU91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuICh2YWx1ZSA9IHZhbHVlIC0gMSkgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgKyBzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogKHZhbHVlICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgLSBzKSk7XG4gICAgcmV0dXJuIDAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSArIHMpICsgMik7XG4gIH0sXG5cbiAgZ2V0RWFzaW5nKGVhc2UpIHtcbiAgICBpZiAodHlwZW9mIGVhc2UgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGVhc2U7XG4gICAgZWxzZSByZXR1cm4gdGhpc1tlYXNlXSB8fCB0aGlzLmVhc2VMaW5lYXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMkQge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geCB8fCAwO1xuICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgfVxuXG4gIHNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0WCh4KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFkoeSkge1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRHcmFkaWVudCgpIHtcbiAgICBpZiAodGhpcy54ICE9PSAwKSByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgZWxzZSBpZiAodGhpcy55ID4gMCkgcmV0dXJuIE1hdGhVdGlsLlBJXzI7XG4gICAgZWxzZSBpZiAodGhpcy55IDwgMCkgcmV0dXJuIC1NYXRoVXRpbC5QSV8yO1xuICB9XG5cbiAgY29weSh2KSB7XG4gICAgdGhpcy54ID0gdi54O1xuICAgIHRoaXMueSA9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkWFkoYSwgYikge1xuICAgIHRoaXMueCArPSBhO1xuICAgIHRoaXMueSArPSBiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggKyBiLng7XG4gICAgdGhpcy55ID0gYS55ICsgYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWIodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YlZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54IC09IHYueDtcbiAgICB0aGlzLnkgLT0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWJWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggLSBiLng7XG4gICAgdGhpcy55ID0gYS55IC0gYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXZpZGVTY2FsYXIocykge1xuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gcztcbiAgICAgIHRoaXMueSAvPSBzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCgwLCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bHRpcGx5U2NhbGFyKHMpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmVnYXRlKCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKC0xKTtcbiAgfVxuXG4gIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbiAgfVxuXG4gIGxlbmd0aFNxKCkge1xuICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gIH1cblxuICBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpKTtcbiAgfVxuXG4gIGRpc3RhbmNlVG8odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVRvU3F1YXJlZCh2KSk7XG4gIH1cblxuICByb3RhdGUodGhhKSB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKHRoYSkgKyB5ICogTWF0aC5zaW4odGhhKTtcbiAgICB0aGlzLnkgPSAteCAqIE1hdGguc2luKHRoYSkgKyB5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdGFuY2VUb1NxdWFyZWQodikge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gdi54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gdi55O1xuXG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICB9XG5cbiAgbGVycCh2LCBhbHBoYSkge1xuICAgIHRoaXMueCArPSAodi54IC0gdGhpcy54KSAqIGFscGhhO1xuICAgIHRoaXMueSArPSAodi55IC0gdGhpcy55KSAqIGFscGhhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMueCA9IDAuMDtcbiAgICB0aGlzLnkgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55KTtcbiAgfVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL2JlaGF2aW91ci9CZWhhdmlvdXInKX0gQmVoYXZpb3VyICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vbWF0aC9WZWN0b3IyRCcpfSBWZWN0b3IyRCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL3V0aWxzL1JnYicpfSBSZ2IgKi9cbmltcG9ydCBSZ2IgZnJvbSBcIi4uL3V0aWxzL1JnYlwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gIC8qKiBAdHlwZSBzdHJpbmcgKi9cbiAgaWQgPSBcIlwiO1xuXG4gIC8qKiBAdHlwZSB7e3A6VmVjdG9yMkQsdjpWZWN0b3IyRCxhOlZlY3RvcjJEfX0gKi9cbiAgb2xkID0ge307XG5cbiAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gIGRhdGEgPSB7fTtcblxuICAvKiogQHR5cGUge0JlaGF2aW91cltdfSAqL1xuICBiZWhhdmlvdXJzID0gW107XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgcCA9IFtdO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIHYgPSBbXTtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICBhID0gW107XG5cbiAgLyoqIEB0eXBlIHtSZ2J9ICovXG4gIHJnYiA9IHt9O1xuXG4gIC8qKlxuICAgKiB0aGUgUGFydGljbGUgY2xhc3NcbiAgICpcbiAgICogQGNsYXNzIFByb3Rvbi5QYXJ0aWNsZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHBPYmogdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7bGlmZTozLGRlYWQ6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHBhcnRpY2xlJ3MgaWQ7XG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIlBhcnRpY2xlXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgICB0aGlzLm9sZCA9IHt9O1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuXG4gICAgdGhpcy5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5hID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5hID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICB0aGlzLnJnYiA9IG5ldyBSZ2IoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgY29uZiAmJiBQcm9wVXRpbC5zZXRQcm9wKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMudi54LCAtdGhpcy52LnkpICogTWF0aFV0aWwuTjE4MF9QSTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubGlmZSA9IEluZmluaXR5O1xuICAgIHRoaXMuYWdlID0gMDtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuc2xlZXAgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkgPSBudWxsO1xuICAgIHRoaXMuc3ByaXRlID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmVuZXJneSA9IDE7IC8vIEVuZXJneSBMb3NzXG4gICAgdGhpcy5tYXNzID0gMTtcbiAgICB0aGlzLnJhZGl1cyA9IDEwO1xuICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMuY29sb3IgPSBudWxsO1xuXG4gICAgdGhpcy5wLnNldCgwLCAwKTtcbiAgICB0aGlzLnYuc2V0KDAsIDApO1xuICAgIHRoaXMuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQucC5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmVhc2VMaW5lYXI7XG5cbiAgICB0aGlzLnJnYi5yZXNldCgpO1xuICAgIFV0aWwuZW1wdHlPYmplY3QodGhpcy5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgICAgdGhpcy5hcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFnZSA8IHRoaXMubGlmZSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyh0aGlzLmFnZSAvIHRoaXMubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vyc1tpXSAmJiB0aGlzLmJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyXG4gICAqL1xuICBhZGRCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcblxuICAgIGlmIChiZWhhdmlvdXIuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRzXCIpKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyW119IGJlaGF2aW91cnNcbiAgICovXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJlaGF2aW91cnMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZEJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGNvbnN0IGJlaGF2aW91ciA9IHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuYmVoYXZpb3Vycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcbiAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmICB7T2JqZWN0fSByZ2JPYmplY3RcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHIgcmVkIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBnIGdyZWVuIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBiIGJsdWUgdmFsdWVcbiAgICovXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIHJnYiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGhleFRvUmdiXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoIGFueSBoZXggdmFsdWUsIGUuZy4gIzAwMDAwMCBvciAwMDAwMDAgZm9yIGJsYWNrXG4gICAqXG4gICAqIEByZXR1cm4ge3JnYk9iamVjdH1cbiAgICovXG4gIGhleFRvUmdiKGgpIHtcbiAgICBjb25zdCBoZXgxNiA9IGguY2hhckF0KDApID09PSBcIiNcIiA/IGguc3Vic3RyaW5nKDEsIDcpIDogaDtcbiAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoNCwgNiksIDE2KTtcblxuICAgIHJldHVybiB7IHIsIGcsIGIgfTtcbiAgfSxcblxuICAvKipcbiAgICogY29udmVydHMgYSByZ2IgdmFsdWUgdG8gYSByZ2Igc3RyaW5nXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCByZ2JUb0hleFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdCB8IFByb3Rvbi5oZXhUb1JnYn0gcmdiIGEgcmdiIG9iamVjdCBsaWtlIGluIHtAbGluayBQcm90b24jUHJvdG9uLn1cbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfSByZ2IoKVxuICAgKi9cbiAgcmdiVG9IZXgocmJnKSB7XG4gICAgcmV0dXJuIGByZ2IoJHtyYmcucn0sICR7cmJnLmd9LCAke3JiZy5ifSlgO1xuICB9LFxuXG4gIGdldEhleDE2RnJvbVBhcnRpY2xlKHApIHtcbiAgICByZXR1cm4gTnVtYmVyKHAucmdiLnIpICogNjU1MzYgKyBOdW1iZXIocC5yZ2IuZykgKiAyNTYgKyBOdW1iZXIocC5yZ2IuYik7XG4gIH1cbn07XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sYXIyRCB7XG4gIGNvbnN0cnVjdG9yKHIsIHRoYSkge1xuICAgIHRoaXMuciA9IE1hdGguYWJzKHIpIHx8IDA7XG4gICAgdGhpcy50aGEgPSB0aGEgfHwgMDtcbiAgfVxuXG4gIHNldChyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UihyKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRoYSh0aGEpIHtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvcHkocCkge1xuICAgIHRoaXMuciA9IHAucjtcbiAgICB0aGlzLnRoYSA9IHAudGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9WZWN0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLmdldFgoKSwgdGhpcy5nZXRZKCkpO1xuICB9XG5cbiAgZ2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5yICogTWF0aC5zaW4odGhpcy50aGEpO1xuICB9XG5cbiAgZ2V0WSgpIHtcbiAgICByZXR1cm4gLXRoaXMuciAqIE1hdGguY29zKHRoaXMudGhhKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICB0aGlzLnIgPSAxO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi5yID09PSB0aGlzLnIgJiYgdi50aGEgPT09IHRoaXMudGhhO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yID0gMC4wO1xuICAgIHRoaXMudGhhID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2xhcjJEKHRoaXMuciwgdGhpcy50aGEpO1xuICB9XG59XG4iLCJjb25zdCBNYXQzID0ge1xuICBjcmVhdGUobWF0Mykge1xuICAgIGNvbnN0IG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoOSk7XG4gICAgaWYgKG1hdDMpIHRoaXMuc2V0KG1hdDMsIG1hdCk7XG5cbiAgICByZXR1cm4gbWF0O1xuICB9LFxuXG4gIHNldChtYXQxLCBtYXQyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIG1hdDJbaV0gPSBtYXQxW2ldO1xuXG4gICAgcmV0dXJuIG1hdDI7XG4gIH0sXG5cbiAgbXVsdGlwbHkobWF0LCBtYXQyLCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGEwMiA9IG1hdFsyXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMCA9IG1hdDJbMF0sXG4gICAgICBiMDEgPSBtYXQyWzFdLFxuICAgICAgYjAyID0gbWF0MlsyXSxcbiAgICAgIGIxMCA9IG1hdDJbM10sXG4gICAgICBiMTEgPSBtYXQyWzRdLFxuICAgICAgYjIwID0gbWF0Mls2XSxcbiAgICAgIGIyMSA9IG1hdDJbN107XG5cbiAgICBtYXQzWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwO1xuICAgIG1hdDNbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTE7XG4gICAgbWF0M1syXSA9IGEwMiAqIGIwMjtcbiAgICBtYXQzWzNdID0gYjEwICogYTAwICsgYjExICogYTEwO1xuICAgIG1hdDNbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTE7XG4gICAgbWF0M1s2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGEyMDtcbiAgICBtYXQzWzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYTIxO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgaW52ZXJzZShtYXQsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAxID0gYTExLFxuICAgICAgYjExID0gLWExMCxcbiAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcbiAgICAgIGQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEsXG4gICAgICBpZDtcblxuICAgIGlkID0gMSAvIGQ7XG4gICAgbWF0M1swXSA9IGIwMSAqIGlkO1xuICAgIG1hdDNbMV0gPSAtYTAxICogaWQ7XG4gICAgbWF0M1szXSA9IGIxMSAqIGlkO1xuICAgIG1hdDNbNF0gPSBhMDAgKiBpZDtcbiAgICBtYXQzWzZdID0gYjIxICogaWQ7XG4gICAgbWF0M1s3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGlkO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgbXVsdGlwbHlWZWMyKG0sIHZlYywgbWF0Mykge1xuICAgIGxldCB4ID0gdmVjWzBdLFxuICAgICAgeSA9IHZlY1sxXTtcblxuICAgIG1hdDNbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgbVs2XTtcbiAgICBtYXQzWzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIG1bN107XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0MztcbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhbiB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGNlbnRlcikge1xuICAgIGlmIChVdGlsLmlzQXJyYXkoYSkpIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IHRydWU7XG4gICAgICB0aGlzLmEgPSBhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzQXJyYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuYSA9IFV0aWwuaW5pdFZhbHVlKGEsIDEpO1xuICAgICAgdGhpcy5iID0gVXRpbC5pbml0VmFsdWUoYiwgdGhpcy5hKTtcbiAgICAgIHRoaXMuY2VudGVyID0gVXRpbC5pbml0VmFsdWUoY2VudGVyLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWUoaXNJbnQgPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmlzQXJyYXkpIHtcbiAgICAgIHJldHVybiBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy5hKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmNlbnRlcikge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tQVRvQih0aGlzLmEsIHRoaXMuYiwgaXNJbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlsLnJhbmRvbUZsb2F0aW5nKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgU3BhbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFNwYW5WYWx1ZVxuICAgKlxuICAgKiBAdG9kbyBhLCBiIGFuZCBjIHNob3VsZCBiZSAnTWl4ZWQnIG9yICdOdW1iZXInP1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkIHwgU3Bhbn0gYVxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGJcbiAgICogQHBhcmFtIHtNaXhlZH0gICAgICAgICAgICAgICBjXG4gICAqXG4gICAqIEByZXR1cm4ge1NwYW59XG4gICAqL1xuICBzdGF0aWMgc2V0U3BhblZhbHVlKGEsIGIsIGMpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3BhbihhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHJldHVybiBuZXcgU3BhbihhLCBiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNwYW4oYSwgYiwgYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGZyb20gYSBTcGFuLCBpZiB0aGUgcGFyYW0gaXMgbm90IGEgU3BhbiBpdCB3aWxsIHJldHVybiB0aGUgZ2l2ZW4gcGFyYW1ldGVyXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkIHwgU3Bhbn0gcGFuXG4gICAqXG4gICAqIEByZXR1cm4ge01peGVkfSB0aGUgdmFsdWUgb2YgU3BhbiBPUiB0aGUgcGFyYW1ldGVyIGlmIGl0IGlzIG5vdCBhIFNwYW5cbiAgICovXG4gIHN0YXRpYyBnZXRTcGFuVmFsdWUocGFuKSB7XG4gICAgcmV0dXJuIHBhbiBpbnN0YW5jZW9mIFNwYW4gPyBwYW4uZ2V0VmFsdWUoKSA6IHBhbjtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4vU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheVNwYW4gZXh0ZW5kcyBTcGFuIHtcbiAgY29uc3RydWN0b3IoY29sb3IpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2FyciA9IFV0aWwudG9BcnJheShjb2xvcik7XG4gIH1cblxuICBnZXRWYWx1ZSgpIHtcbiAgICBjb25zdCB2YWwgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy5fYXJyKTtcbiAgICByZXR1cm4gdmFsID09PSBcInJhbmRvbVwiIHx8IHZhbCA9PT0gXCJSYW5kb21cIiA/IE1hdGhVdGlsLnJhbmRvbUNvbG9yKCkgOiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBzdXJlIHRoYXQgdGhlIGNvbG9yIGlzIGFuIGluc3RhbmNlIG9mIFByb3Rvbi5BcnJheVNwYW4sIGlmIG5vdCBpdCBtYWtlcyBhIG5ldyBpbnN0YW5jZVxuICAgKlxuICAgKiBAbWV0aG9kIHNldFNwYW5WYWx1ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQXJyYXlTcGFuKGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChhcnIgaW5zdGFuY2VvZiBBcnJheVNwYW4pIHJldHVybiBhcnI7XG4gICAgZWxzZSByZXR1cm4gbmV3IEFycmF5U3BhbihhcnIpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgdGhpcy53aWR0aCA9IHc7XG4gICAgdGhpcy5oZWlnaHQgPSBoO1xuXG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgfVxuXG4gIGNvbnRhaW5zKHgsIHkpIHtcbiAgICBpZiAoeCA8PSB0aGlzLnJpZ2h0ICYmIHggPj0gdGhpcy54ICYmIHkgPD0gdGhpcy5ib3R0b20gJiYgeSA+PSB0aGlzLnkpIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRlIHtcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHBlciBzZWNvbmQgZW1pc3Npb24gKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAqIEBuYW1lc3BhY2VcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5IHwgTnVtYmVyIHwgU3Bhbn0gbnVtcGFuIHRoZSBudW1iZXIgb2YgZWFjaCBlbWlzc2lvbjtcbiAgICogQHBhcmFtIHtBcnJheSB8IE51bWJlciB8IFNwYW59IHRpbWVwYW4gdGhlIHRpbWUgb2YgZWFjaCBlbWlzc2lvbjtcbiAgICogZm9yIGV4YW1wbGU6IG5ldyBSYXRlKG5ldyBTcGFuKDEwLCAyMCksIG5ldyBTcGFuKC4xLCAuMjUpKTtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bXBhbiwgdGltZXBhbikge1xuICAgIHRoaXMubnVtUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUobnVtcGFuLCAxKSk7XG4gICAgdGhpcy50aW1lUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUodGltZXBhbiwgMSkpO1xuXG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSAwO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgZ2V0VmFsdWUodGltZSkge1xuICAgIHRoaXMuc3RhcnRUaW1lICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPj0gdGhpcy5uZXh0VGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBpZiAodGhpcy5udW1QYW4uYiA9PT0gMSkge1xuICAgICAgICBpZiAodGhpcy5udW1QYW4uZ2V0VmFsdWUoZmFsc2UpID4gMC41KSByZXR1cm4gMTtcbiAgICAgICAgZWxzZSByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm51bVBhbi5nZXRWYWx1ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGl6ZSB7XG4gIHJlc2V0KCkge31cblxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUoZW1pdHRlcik7XG4gICAgfVxuICB9XG5cbiAgLy8gc3ViIGNsYXNzIGluaXRcbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHt9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZmUgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxpZmVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgICB0aGlzLm5hbWUgPSBcIkxpZmVcIjtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMubGlmZVBhbi5hID09PSBJbmZpbml0eSkgdGFyZ2V0LmxpZmUgPSBJbmZpbml0eTtcbiAgICBlbHNlIHRhcmdldC5saWZlID0gdGhpcy5saWZlUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gICAgdGhpcy5yYW5kb20gPSAwO1xuICAgIHRoaXMuY3Jvc3NUeXBlID0gXCJkZWFkXCI7XG4gICAgdGhpcy5hbGVydCA9IHRydWU7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHt9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnZlY3RvciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueDtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBQb2ludFpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zc2luZyBtZXRob2QhXCIpO1xuICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKHpvbmUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuem9uZSA9IFV0aWwuaW5pdFZhbHVlKHpvbmUsIG5ldyBQb2ludFpvbmUoKSk7XG4gICAgdGhpcy5uYW1lID0gXCJQb3NpdGlvblwiO1xuICB9XG5cbiAgcmVzZXQoem9uZSkge1xuICAgIHRoaXMuem9uZSA9IFV0aWwuaW5pdFZhbHVlKHpvbmUsIG5ldyBQb2ludFpvbmUoKSk7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIHRoaXMuem9uZS5nZXRQb3NpdGlvbigpO1xuXG4gICAgdGFyZ2V0LnAueCA9IHRoaXMuem9uZS52ZWN0b3IueDtcbiAgICB0YXJnZXQucC55ID0gdGhpcy56b25lLnZlY3Rvci55O1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBQb2xhcjJEIGZyb20gXCIuLi9tYXRoL1BvbGFyMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWxvY2l0eSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUocnBhbik7XG4gICAgdGhpcy50aGFQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZSh0aGFwYW4pO1xuICAgIHRoaXMudHlwZSA9IFV0aWwuaW5pdFZhbHVlKHR5cGUsIFwidmVjdG9yXCIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJWZWxvY2l0eVwiO1xuICB9XG5cbiAgcmVzZXQocnBhbiwgdGhhcGFuLCB0eXBlKSB7XG4gICAgdGhpcy5yUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUocnBhbik7XG4gICAgdGhpcy50aGFQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZSh0aGFwYW4pO1xuICAgIHRoaXMudHlwZSA9IFV0aWwuaW5pdFZhbHVlKHR5cGUsIFwidmVjdG9yXCIpO1xuICB9XG5cbiAgbm9ybWFsaXplVmVsb2NpdHkodnIpIHtcbiAgICByZXR1cm4gdnIgKiBQcm90b24uTUVBU1VSRTtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJwXCIgfHwgdGhpcy50eXBlID09PSBcIlBcIiB8fCB0aGlzLnR5cGUgPT09IFwicG9sYXJcIikge1xuICAgICAgY29uc3QgcG9sYXIyZCA9IG5ldyBQb2xhcjJEKFxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKSxcbiAgICAgICAgdGhpcy50aGFQYW4uZ2V0VmFsdWUoKSAqIE1hdGhVdGlsLlBJXzE4MFxuICAgICAgKTtcblxuICAgICAgdGFyZ2V0LnYueCA9IHBvbGFyMmQuZ2V0WCgpO1xuICAgICAgdGFyZ2V0LnYueSA9IHBvbGFyMmQuZ2V0WSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQudi54ID0gdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSk7XG4gICAgICB0YXJnZXQudi55ID0gdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFzcyBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hc3NQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgICB0aGlzLm5hbWUgPSBcIk1hc3NcIjtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1hc3MgPSB0aGlzLm1hc3NQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpdXMgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yYWRpdXMgPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUmFkaXVzXCI7XG4gIH1cblxuICByZXNldChhLCBiLCBjKSB7XG4gICAgdGhpcy5yYWRpdXMgPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSB0aGlzLnJhZGl1cy5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihpbWFnZSwgdywgaCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltYWdlID0gdGhpcy5zZXRTcGFuVmFsdWUoaW1hZ2UpO1xuICAgIHRoaXMudyA9IFV0aWwuaW5pdFZhbHVlKHcsIDIwKTtcbiAgICB0aGlzLmggPSBVdGlsLmluaXRWYWx1ZShoLCB0aGlzLncpO1xuICAgIHRoaXMubmFtZSA9IFwiQm9keVwiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGltYWdlVGFyZ2V0ID0gdGhpcy5pbWFnZS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHR5cGVvZiBpbWFnZVRhcmdldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcGFydGljbGUuYm9keSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMudyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmgsXG4gICAgICAgIHNyYzogaW1hZ2VUYXJnZXQsXG4gICAgICAgIGlzSW5uZXI6IHRydWUsXG4gICAgICAgIGlubmVyOiB0cnVlXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gaW1hZ2VUYXJnZXQ7XG4gICAgfVxuICB9XG5cbiAgc2V0U3BhblZhbHVlKGltYWdlKSB7XG4gICAgcmV0dXJuIGltYWdlIGluc3RhbmNlb2YgQXJyYXlTcGFuID8gaW1hZ2UgOiBuZXcgQXJyYXlTcGFuKGltYWdlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ciB7XG4gIHN0YXRpYyBpZCA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBCZWhhdmlvdXIgY2xhc3MgaXMgdGhlIGJhc2UgZm9yIHRoZSBvdGhlciBCZWhhdmlvdXJcbiAgICpcbiAgICogQG1lbWJlcm9mISAtXG4gICAqIEBpbnRlcmZhY2VcbiAgICogQGFsaWFzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxpZmUgXHR0aGUgYmVoYXZpb3VycyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlYXNpbmcgXHRUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmQsIGZvciBleGFtcGxlIGVhc2UuZWFzZU91dFF1YXJ0XG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAgaWQgXHRcdFRoZSBiZWhhdmlvdXJzIGlkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgYWdlPTAgXHRIb3cgbG9uZyB0aGUgcGFydGljbGUgc2hvdWxkIGJlICdhbGlmZSdcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9ICBlbmVyZ3k9MVxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlYWQ9ZmFsc2UgVGhlIHBhcnRpY2xlIGlzIGRlYWQgYXQgZmlyc3RcbiAgICogQHByb3BlcnR5IHtBcnJheX0gICBwYXJlbnRzIFx0VGhlIGJlaGF2aW91cidzIHBhcmVudHMgYXJyYXlcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9ICBuYW1lIFx0VGhlIGJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuXG4gICAgdGhpcy5hZ2UgPSAwO1xuICAgIHRoaXMuZW5lcmd5ID0gMTtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhcmVudHMgPSBbXTtcblxuICAgIHRoaXMuaWQgPSBgQmVoYXZpb3VyXyR7QmVoYXZpb3VyLmlkKyt9YDtcbiAgICB0aGlzLm5hbWUgPSBcIkJlaGF2aW91clwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQobGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSBmb3JjZSBieSAxOjEwMDtcbiAgICpcbiAgICogQG1ldGhvZCBub3JtYWxpemVGb3JjZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IGZvcmNlXG4gICAqL1xuICBub3JtYWxpemVGb3JjZShmb3JjZSkge1xuICAgIHJldHVybiBmb3JjZS5tdWx0aXBseVNjYWxhcihQcm90b24uTUVBU1VSRSk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgdmFsdWUgYnkgMToxMDA7XG4gICAqXG4gICAqIEBtZXRob2Qgbm9ybWFsaXplVmFsdWVcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKi9cbiAgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgKiBQcm90b24uTUVBU1VSRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBjYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB7XG4gICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBiZWhhdmlvdXJcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFyZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5wYXJlbnRzW2ldLnJlbW92ZUJlaGF2aW91cih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudHMubGVuZ3RoID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uRm9yY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG4gICAgdGhpcy5uYW1lID0gXCJGb3JjZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuYS5hZGQodGhpcy5mb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJhY3Rpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhpcyBiZWhhdmlvdXIgbGV0IHRoZSBwYXJ0aWNsZXMgZm9sbG93IG9uZSBzcGVjaWZpYyBQcm90b24uVmVjdG9yMkRcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkF0dHJhY3Rpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvblxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzU3FcbiAgICogQHByb3BlcnR5IHtQcm90b24uVmVjdG9yMkR9IGF0dHJhY3Rpb25Gb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gbGVuZ3RoU3FcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgdGhpcy5uYW1lID0gXCJBdHRyYWN0aW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UuY29weSh0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zdWIocGFydGljbGUucCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IHRoaXMuYXR0cmFjdGlvbkZvcmNlLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGhTcSA+IDAuMDAwMDQgJiYgdGhpcy5sZW5ndGhTcSA8IHRoaXMucmFkaXVzU3EpIHtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMubGVuZ3RoU3EgLyB0aGlzLnJhZGl1c1NxKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKHRoaXMuZm9yY2UpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmF0dHJhY3Rpb25Gb3JjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tRHJpZnQgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYW5kb21EcmlmdFxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSBUaGUgdGltZSBvZiB0aGUgZHJpZnRcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSk7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5hbWUgPSBcIlJhbmRvbURyaWZ0XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5wYW5Gb2NlID0gbmV3IFZlY3RvcjJEKGRyaWZ0WCwgZHJpZnRZKTtcbiAgICB0aGlzLnBhbkZvY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHRoaXMucGFuRm9jZSk7XG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuZGF0YS50aW1lICs9IHRpbWU7XG5cbiAgICBpZiAocGFydGljbGUuZGF0YS50aW1lID49IHRoaXMuZGVsYXkpIHtcbiAgICAgIHBhcnRpY2xlLmEuYWRkWFkoXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS54LCB0aGlzLnBhbkZvY2UueCksXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS55LCB0aGlzLnBhbkZvY2UueSlcbiAgICAgICk7XG5cbiAgICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRm9yY2UgZnJvbSBcIi4vRm9yY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eSBleHRlbmRzIEZvcmNlIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5HcmF2aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uR3Jhdml0eVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCgwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGFmdGVyIGNvbGxpc2lvblxuICAgKlxuICAgKiBAY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcml0Y2xlfSBvdGhlclBhcnRpY2xlXG4gICAqL1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbGxpc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNvbGxpc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xsaXNpb25cbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIHRvIG1hc3NcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gXHRbZW1pdHRlcj1udWxsXSBcdFx0dGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBcdFx0W21hc3M9dHJ1ZV1cbiAgICogQHBhcmFtIHtDYWxsYmFja31cdCBcdFtjYWxsYmFjaz1udWxsXVx0XHR0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIGNvbGxpc2lvblxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0W2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZW1pdHRlciA9IFV0aWwuaW5pdFZhbHVlKGVtaXR0ZXIsIG51bGwpO1xuICAgIHRoaXMubWFzcyA9IFV0aWwuaW5pdFZhbHVlKG1hc3MsIHRydWUpO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBVdGlsLmluaXRWYWx1ZShjYWxsYmFjaywgbnVsbCk7XG5cbiAgICB0aGlzLmNvbGxpc2lvblBvb2wgPSBbXTtcbiAgICB0aGlzLmRlbHRhID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xsaXNpb25cbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5ld1Bvb2wgPSB0aGlzLmVtaXR0ZXIgPyB0aGlzLmVtaXR0ZXIucGFydGljbGVzLnNsaWNlKGluZGV4KSA6IHRoaXMucG9vbC5zbGljZShpbmRleCk7XG4gICAgY29uc3QgbGVuZ3RoID0gbmV3UG9vbC5sZW5ndGg7XG5cbiAgICBsZXQgb3RoZXJQYXJ0aWNsZTtcbiAgICBsZXQgbGVuZ3RoU3E7XG4gICAgbGV0IG92ZXJsYXA7XG4gICAgbGV0IHRvdGFsTWFzcztcbiAgICBsZXQgYXZlcmFnZU1hc3MxLCBhdmVyYWdlTWFzczI7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG90aGVyUGFydGljbGUgPSBuZXdQb29sW2ldO1xuXG4gICAgICBpZiAob3RoZXJQYXJ0aWNsZSAhPT0gcGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5kZWx0YS5jb3B5KG90aGVyUGFydGljbGUucCk7XG4gICAgICAgIHRoaXMuZGVsdGEuc3ViKHBhcnRpY2xlLnApO1xuXG4gICAgICAgIGxlbmd0aFNxID0gdGhpcy5kZWx0YS5sZW5ndGhTcSgpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHBhcnRpY2xlLnJhZGl1cyArIG90aGVyUGFydGljbGUucmFkaXVzO1xuXG4gICAgICAgIGlmIChsZW5ndGhTcSA8PSBkaXN0YW5jZSAqIGRpc3RhbmNlKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IGRpc3RhbmNlIC0gTWF0aC5zcXJ0KGxlbmd0aFNxKTtcbiAgICAgICAgICBvdmVybGFwICs9IDAuNTtcblxuICAgICAgICAgIHRvdGFsTWFzcyA9IHBhcnRpY2xlLm1hc3MgKyBvdGhlclBhcnRpY2xlLm1hc3M7XG4gICAgICAgICAgYXZlcmFnZU1hc3MxID0gdGhpcy5tYXNzID8gb3RoZXJQYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMubWFzcyA/IHBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG5cbiAgICAgICAgICBwYXJ0aWNsZS5wLmFkZChcbiAgICAgICAgICAgIHRoaXMuZGVsdGFcbiAgICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG90aGVyUGFydGljbGUucC5hZGQodGhpcy5kZWx0YS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihvdmVybGFwICogYXZlcmFnZU1hc3MyKSk7XG5cbiAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2socGFydGljbGUsIG90aGVyUGFydGljbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3Nab25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIERlZmluZXMgd2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgY29tZSB0byB0aGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgem9uZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3Jvc3Nab25lXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0XHRcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3Jvc3Nab25lXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBVdGlsLmluaXRWYWx1ZShjcm9zc1R5cGUsIFwiZGVhZFwiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgdGhpcy56b25lLmNyb3NzaW5nKHBhcnRpY2xlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFscGhhIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5BbHBoYVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJBbHBoYVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmV3IGFscGhhIHZhbHVlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSBBIHNpbmdsZSBQcm90b24gZ2VuZXJhdGVkIHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5hbHBoYUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gcGFydGljbGUuZGF0YS5hbHBoYUE7XG4gICAgZWxzZSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgcGFydGljbGUuYWxwaGEgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQiArIChwYXJ0aWNsZS5kYXRhLmFscGhhQSAtIHBhcnRpY2xlLmRhdGEuYWxwaGFCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLmFscGhhIDwgMC4wMDEpIHBhcnRpY2xlLmFscGhhID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5TY2FsZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJTY2FsZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVCID0gdGhpcy5zYW1lID8gcGFydGljbGUuZGF0YS5zY2FsZUEgOiB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLnNjYWxlID0gcGFydGljbGUuZGF0YS5zY2FsZUIgKyAocGFydGljbGUuZGF0YS5zY2FsZUEgLSBwYXJ0aWNsZS5kYXRhLnNjYWxlQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA8IDAuMDAwMSkgcGFydGljbGUuc2NhbGUgPSAwO1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzICogcGFydGljbGUuc2NhbGU7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlJvdGF0ZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJywgJ2InIGFuZCAnc3R5bGUnXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbaW5mbHVlbmNlPVZlbG9jaXR5XSBUaGUgcm90YXRpb24ncyBpbmZsdWVuY2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHlsZT10b11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbmZsdWVuY2UsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChpbmZsdWVuY2UsIGIsIHN0eWxlKTtcbiAgICB0aGlzLm5hbWUgPSBcIlJvdGF0ZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScsICdiJyBhbmQgJ3N0eWxlJ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3N0eWxlPXRvXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgXCJWZWxvY2l0eVwiKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYiwgMCkpO1xuICAgIHRoaXMuc3R5bGUgPSBVdGlsLmluaXRWYWx1ZShzdHlsZSwgXCJ0b1wiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICghdGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHtcbiAgICAgIGlmICh0aGlzLnN0eWxlID09PSBcInRvXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJUT1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiX1wiKSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9XG4gICAgICAgICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgKyAocGFydGljbGUuZGF0YS5yb3RhdGlvbkEgLSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQikgKiB0aGlzLmVuZXJneTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHBhcnRpY2xlLmRhdGEucm90YXRpb25CO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hLmEgPT09IFwiVlwiIHx8IHRoaXMuYS5hID09PSBcIlZlbG9jaXR5XCIgfHwgdGhpcy5hLmEgPT09IFwidlwiKSB7XG4gICAgICAvLyBiZXRhLi4uXG4gICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlLmdldERpcmVjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sb3JcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBhIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBiIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmEgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGEpO1xuICAgIHRoaXMuYiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYik7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5jb2xvciA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuY29sb3JBID0gQ29sb3JVdGlsLmhleFRvUmdiKHBhcnRpY2xlLmNvbG9yKTtcblxuICAgIGlmICh0aGlzLmIpIHBhcnRpY2xlLmRhdGEuY29sb3JCID0gQ29sb3JVdGlsLmhleFRvUmdiKHRoaXMuYi5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuYikge1xuICAgICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLnIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmcgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IE1hdGguZmxvb3IocGFydGljbGUucmdiLnIpO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBNYXRoLmZsb29yKHBhcnRpY2xlLnJnYi5nKTtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gTWF0aC5mbG9vcihwYXJ0aWNsZS5yZ2IuYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckEucjtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckEuZztcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckEuYjtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5jb25zdCBDSEFOR0lORyA9IFwiY2hhbmdpbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ljbG9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3ljbG9uZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkN5Y2xvbmVcIjtcbiAgfVxuXG4gIHNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG5cbiAgICBpZiAoYW5nbGUgPT09IFwicmlnaHRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcImxlZnRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IC1NYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwicmFuZG9tXCI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInNwYW5cIjtcbiAgICAgIHRoaXMuc3BhbiA9IGFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdpbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJhdXRvXCJcbiAgICApIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB9IGVsc2UgaWYgKGZvcmNlKSB7XG4gICAgICB0aGlzLmZvcmNlID0gZm9yY2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IE1hdGhVdGlsLnJhbmRvbUFUb0IoLU1hdGhVdGlsLlBJLCBNYXRoVXRpbC5QSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSB0aGlzLnNwYW4uZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGdyYWRpZW50ID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiIHx8IHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBncmFkaWVudCArPSBwYXJ0aWNsZS5kYXRhLmNhbmdsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JhZGllbnQgKz0gdGhpcy5hbmdsZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JjZSA9PT0gQ0hBTkdJTkcpIHtcbiAgICAgIGxlbmd0aCA9IHBhcnRpY2xlLnYubGVuZ3RoKCkgLyAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRoaXMuZm9yY2U7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnggPSBsZW5ndGggKiBNYXRoLmNvcyhncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnkgPSBsZW5ndGggKiBNYXRoLnNpbihncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gdGhpcy5ub3JtYWxpemVGb3JjZShwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gIH1cbn1cbiIsImltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL0F0dHJhY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwdWxzaW9uIGV4dGVuZHMgQXR0cmFjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgb3BwaXNpdGUgb2YgUHJvdG9uLkF0dHJhY3Rpb24gLSB0dXJucyB0aGUgZm9yY2VcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUmVwdWxzaW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9yY2VcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICAgIHRoaXMubmFtZSA9IFwiUmVwdWxzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUmVwdWxzaW9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5V2VsbCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIEdyYXZpdHlXZWxsXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlXZWxsXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXRkb2NcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYy5zZXQodGhpcy5jZW50ZXJQb2ludC54IC0gcGFydGljbGUucC54LCB0aGlzLmNlbnRlclBvaW50LnkgLSBwYXJ0aWNsZS5wLnkpO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAoZGlzdGFuY2VTcSAhPT0gMCkge1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aCgpO1xuICAgICAgY29uc3QgZmFjdG9yID0gKHRoaXMuZm9yY2UgKiB0aW1lKSAvIChkaXN0YW5jZVNxICogZGlzdGFuY2UpO1xuXG4gICAgICBwYXJ0aWNsZS52LnggKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy54O1xuICAgICAgcGFydGljbGUudi55ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRpYWxpemUoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gaW5pdGlhbGl6ZXMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5pdGlhbGl6ZXNbaV0gaW5zdGFuY2VvZiBJbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemVzW2ldLmluaXQoZW1pdHRlciwgcGFydGljbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gIH0sXG5cbiAgLy8gaW5pdFxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplKSB7XG4gICAgUHJvcFV0aWwuc2V0UHJvcChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gICAgUHJvcFV0aWwuc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgfSxcblxuICBiaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChlbWl0dGVyLmJpbmRFbWl0dGVyKSB7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChlbWl0dGVyLnApO1xuICAgICAgcGFydGljbGUudi5hZGQoZW1pdHRlci52KTtcbiAgICAgIHBhcnRpY2xlLmEuYWRkKGVtaXR0ZXIuYSk7XG5cbiAgICAgIHBhcnRpY2xlLnYucm90YXRlKE1hdGhVdGlsLmRlZ3JlZVRyYW5zZm9ybShlbWl0dGVyLnJvdGF0aW9uKSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5pbXBvcnQgUGFydGljbGUgZnJvbSBcIi4uL2NvcmUvUGFydGljbGVcIjtcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIjtcblxuaW1wb3J0IFJhdGUgZnJvbSBcIi4uL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemVVdGlsIGZyb20gXCIuLi9pbml0aWFsaXplL0luaXRpYWxpemVVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXIgZXh0ZW5kcyBQYXJ0aWNsZSB7XG4gIC8qKlxuICAgKiBZb3UgY2FuIHVzZSB0aGlzIGVtaXQgcGFydGljbGVzLlxuICAgKlxuICAgKiBJdCB3aWxsIGRpc3BhdGNoIGZvbGxvdyBldmVudHM6XG4gICAqIFBBUlRJQ0xFX0NSRUFURURcbiAgICogUEFSVElDTEVfVVBEQVRBXG4gICAqIFBBUlRJQ0xFX0RFQURcbiAgICpcbiAgICogQGNsYXNzIEVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICogZm9yIGV4YW1wbGUge2RhbXBpbmc6MC4wMSxiaW5kRW1pdHRlcjpmYWxzZX1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYgPSB7fSkge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcbiAgICB0aGlzLmluaXRpYWxpemVzID0gW107XG5cbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLmVtaXRTcGVlZCA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmcmljdGlvbiBjb2VmZmljaWVudCBmb3IgYWxsIHBhcnRpY2xlIGVtaXQgYnkgVGhpcztcbiAgICAgKiBAcHJvcGVydHkgZGFtcGluZ1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMC4wMDZcbiAgICAgKi9cbiAgICB0aGlzLmRhbXBpbmcgPSAwLjAwNjtcblxuICAgIC8qKlxuICAgICAqIElmIGJpbmRFbWl0dGVyIHRoZSBwYXJ0aWNsZXMgY2FuIGJpbmQgdGhpcyBlbWl0dGVyJ3MgcHJvcGVydHk7XG4gICAgICogQHByb3BlcnR5IGJpbmRFbWl0dGVyXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHRoaXMuYmluZEVtaXR0ZXIgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWl0IChhIFtwYXJ0aWNsZV0vYiBbc10pO1xuICAgICAqIEBwcm9wZXJ0eSByYXRlXG4gICAgICogQHR5cGUge1JhdGV9XG4gICAgICogQGRlZmF1bHQgUmF0ZSgxLCAuMSlcbiAgICAgKi9cbiAgICB0aGlzLnJhdGUgPSBuZXcgUmF0ZSgxLCAwLjEpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJFbWl0dGVyXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydCBlbWl0IHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZW1pdFxuICAgKiBAcGFyYW0ge051bWJlcn0gZW1pdFRpbWUgYmVnaW4gZW1pdCB0aW1lO1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbGlmZSB0aGUgbGlmZSBvZiB0aGlzIGVtaXR0ZXJcbiAgICovXG4gIGVtaXQodG90YWxUaW1lLCBsaWZlKSB7XG4gICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IFV0aWwuaW5pdFZhbHVlKHRvdGFsVGltZSwgSW5maW5pdHkpO1xuXG4gICAgaWYgKGxpZmUgPT09IHRydWUgfHwgbGlmZSA9PT0gXCJsaWZlXCIgfHwgbGlmZSA9PT0gXCJkZXN0cm95XCIpIHtcbiAgICAgIHRoaXMubGlmZSA9IHRvdGFsVGltZSA9PT0gXCJvbmNlXCIgPyAxIDogdGhpcy50b3RhbFRpbWU7XG4gICAgfSBlbHNlIGlmICghaXNOYU4obGlmZSkpIHtcbiAgICAgIHRoaXMubGlmZSA9IGxpZmU7XG4gICAgfVxuXG4gICAgdGhpcy5yYXRlLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdG9wIGVtaXRpbmdcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMudG90YWxUaW1lID0gLTE7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy5zdG9wZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJlRW1pdCh0aW1lKSB7XG4gICAgbGV0IG9sZFN0b3BlZCA9IHRoaXMuc3RvcGVkO1xuICAgIGxldCBvbGRFbWl0VGltZSA9IHRoaXMuZW1pdFRpbWU7XG4gICAgbGV0IG9sZFRvdGFsVGltZSA9IHRoaXMudG90YWxUaW1lO1xuXG4gICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IHRpbWU7XG4gICAgdGhpcy5yYXRlLmluaXQoKTtcblxuICAgIGNvbnN0IHN0ZXAgPSAwLjAxNjc7XG4gICAgd2hpbGUgKHRpbWUgPiBzdGVwKSB7XG4gICAgICB0aW1lIC09IHN0ZXA7XG4gICAgICB0aGlzLnVwZGF0ZShzdGVwKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3BlZCA9IG9sZFN0b3BlZDtcbiAgICB0aGlzLmVtaXRUaW1lID0gb2xkRW1pdFRpbWUgKyBNYXRoLm1heCh0aW1lLCAwKTtcbiAgICB0aGlzLnRvdGFsVGltZSA9IG9sZFRvdGFsVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgY3VycmVudCBhbGwgcGFydGljbGVzXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsUGFydGljbGVzXG4gICAqL1xuICByZW1vdmVBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5wYXJ0aWNsZXNbaV0uZGVhZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGluaXRpYWxpemUgdG8gdGhpcyBlbWl0dGVyXG4gICAqIEBtZXRob2QgYWRkU2VsZkluaXRpYWxpemVcbiAgICovXG4gIGFkZFNlbGZJbml0aWFsaXplKGluaXRpYWxpemUpIHtcbiAgICBpZiAoaW5pdGlhbGl6ZVtcImluaXRcIl0pIHtcbiAgICAgIGluaXRpYWxpemUuaW5pdCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgSW5pdGlhbGl6ZSB0byBwYXJ0aWNsZXM7XG4gICAqXG4gICAqIHlvdSBjYW4gdXNlIGluaXRpYWxpemVzIGFycmF5OmZvciBleGFtcGxlIGVtaXR0ZXIuYWRkSW5pdGlhbGl6ZShpbml0aWFsaXplMSxpbml0aWFsaXplMixpbml0aWFsaXplMyk7XG4gICAqIEBtZXRob2QgYWRkSW5pdGlhbGl6ZVxuICAgKiBAcGFyYW0ge0luaXRpYWxpemV9IGluaXRpYWxpemUgbGlrZSB0aGlzIG5ldyBSYWRpdXMoMSwgMTIpXG4gICAqL1xuICBhZGRJbml0aWFsaXplKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IHJlc3QubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMuaW5pdGlhbGl6ZXMucHVzaChyZXN0W2ldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEluaXRpYWxpemVcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBhIGluaXRpYWxpemVcbiAgICovXG4gIHJlbW92ZUluaXRpYWxpemUoaW5pdGlhbGl6ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5pdGlhbGl6ZXMuaW5kZXhPZihpbml0aWFsaXplcik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuaW5pdGlhbGl6ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIEluaXRpYWxpemVzXG4gICAqIEBtZXRob2QgcmVtb3ZlSW5pdGlhbGl6ZXJzXG4gICAqL1xuICByZW1vdmVBbGxJbml0aWFsaXplcnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuaW5pdGlhbGl6ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgQmVoYXZpb3VyIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZEJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBDb2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZEJlaGF2aW91ciguLi5yZXN0KSB7XG4gICAgbGV0IGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcbiAgICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykgYmVoYXZpb3VyLnBhcmVudHMucHVzaCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXJcbiAgICogQG1ldGhvZCByZW1vdmVCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGxldCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBpZiAoYmVoYXZpb3VyLnBhcmVudHMpIHtcbiAgICAgIGluZGV4ID0gYmVoYXZpb3VyLnBhcmVudHMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGFsbCBiZWhhdmlvdXJzXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsQmVoYXZpb3Vyc1xuICAgKi9cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8vIGVtaXR0ZXIgdXBkYXRlXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlIHx8IHRoaXMuZGVhZCkgdGhpcy5kZXN0cm95KCk7XG5cbiAgICB0aGlzLmVtaXR0aW5nKHRpbWUpO1xuICAgIHRoaXMuaW50ZWdyYXRlKHRpbWUpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHRpbWUpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBkYW1waW5nID0gMSAtIHRoaXMuZGFtcGluZztcbiAgICB0aGlzLnBhcmVudC5pbnRlZ3JhdG9yLmNhbGN1bGF0ZSh0aGlzLCB0aW1lLCBkYW1waW5nKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICBsZXQgaSwgcGFydGljbGU7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXTtcblxuICAgICAgLy8gcGFydGljbGUgdXBkYXRlXG4gICAgICBwYXJ0aWNsZS51cGRhdGUodGltZSwgaSk7XG4gICAgICB0aGlzLnBhcmVudC5pbnRlZ3JhdG9yLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgZGFtcGluZyk7XG4gICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfVVBEQVRFXCIsIHBhcnRpY2xlKTtcblxuICAgICAgLy8gY2hlY2sgZGVhZFxuICAgICAgaWYgKHBhcnRpY2xlLmRlYWQpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChcIlBBUlRJQ0xFX0RFQURcIiwgcGFydGljbGUpO1xuXG4gICAgICAgIHRoaXMucGFyZW50LnBvb2wuZXhwaXJlKHBhcnRpY2xlKTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoKGV2ZW50LCB0YXJnZXQpIHtcbiAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICAgIHRoaXMuYmluZEV2ZW50ICYmIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCwgdGFyZ2V0KTtcbiAgfVxuXG4gIGVtaXR0aW5nKHRpbWUpIHtcbiAgICBpZiAodGhpcy50b3RhbFRpbWUgPT09IFwib25jZVwiKSB7XG4gICAgICBsZXQgaTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSg5OTk5OSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAwKSB0aGlzLmVtaXRTcGVlZCA9IGxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgdGhpcy50b3RhbFRpbWUgPSBcIm5vbmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuXG4gICAgICBpZiAodGhpcy5lbWl0VGltZSA8IHRoaXMudG90YWxUaW1lKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSh0aW1lKTtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIHNpbmdsZSBwYXJ0aWNsZTtcbiAgICpcbiAgICogY2FuIHVzZSBlbWl0KHt4OjEwfSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSkgb3IgZW1pdChbe3g6MTB9LG5ldyBJbml0aWFsaXplXSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSlcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIGNyZWF0ZVBhcnRpY2xlKGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJlbnQucG9vbC5nZXQoUGFydGljbGUpO1xuICAgIHRoaXMuc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKTtcbiAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICByZXR1cm4gcGFydGljbGU7XG4gIH1cblxuICBzZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpIHtcbiAgICBsZXQgaW5pdGlhbGl6ZXMgPSB0aGlzLmluaXRpYWxpemVzO1xuICAgIGxldCBiZWhhdmlvdXJzID0gdGhpcy5iZWhhdmlvdXJzO1xuXG4gICAgaWYgKGluaXRpYWxpemUpIGluaXRpYWxpemVzID0gVXRpbC50b0FycmF5KGluaXRpYWxpemUpO1xuICAgIGlmIChiZWhhdmlvdXIpIGJlaGF2aW91cnMgPSBVdGlsLnRvQXJyYXkoYmVoYXZpb3VyKTtcblxuICAgIHBhcnRpY2xlLnJlc2V0KCk7XG4gICAgSW5pdGlhbGl6ZVV0aWwuaW5pdGlhbGl6ZSh0aGlzLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpO1xuICAgIHBhcnRpY2xlLmFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycyk7XG4gICAgcGFydGljbGUucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMucGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnBhcnRpY2xlcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIEVtaXR0ZXJcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnJlbW92ZUFsbEluaXRpYWxpemVycygpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnJlbW92ZUVtaXR0ZXIodGhpcyk7XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoRW1pdHRlcik7XG4iLCJpbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ckVtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBCZWhhdmlvdXJFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBCZWhhdmlvdXJFbWl0dGVyIHlvdSBjYW4gYWRkIGJlaGF2aW91cnMgdG8gc2VsZjtcbiAgICogQGNsYXNzIFByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnNlbGZCZWhhdmlvdXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gZW1pdHRlcjtcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZFNlbGZCZWhhdmlvdXIoQmVoYXZpb3VyMSxCZWhhdmlvdXIyLEJlaGF2aW91cjMpO1xuICAgKiBAbWV0aG9kIGFkZFNlbGZCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtQcm90b24uQmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBQcm90b24uQ29sb3IoJ3JhbmRvbScpXG4gICAqL1xuICBhZGRTZWxmQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSxcbiAgICAgIGxlbmd0aCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmVoYXZpb3VyID0gcmVzdFtpXTtcbiAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgQmVoYXZpb3VyIGZvciBzZWxmXG4gICAqIEBtZXRob2QgcmVtb3ZlU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlU2VsZkJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZkJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLnNlbGZCZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICB1cGRhdGUodGltZSkge1xuICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcblxuICAgIGlmICghdGhpcy5zbGVlcCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgICBsZXQgaTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vRW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dFbWl0dGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gIC8qKlxuICAgKiBUaGUgRm9sbG93RW1pdHRlciBjbGFzcyBpbmhlcml0cyBmcm9tIFByb3Rvbi5FbWl0dGVyXG4gICAqXG4gICAqIHVzZSB0aGUgRm9sbG93RW1pdHRlciB3aWxsIGVtaXQgcGFydGljbGUgd2hlbiBtb3VzZW1vdmluZ1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLkZvbGxvd0VtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gbW91c2VUYXJnZXQgbW91c2VldmVudCdzIHRhcmdldDtcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVhc2UgdGhlIGVhc2luZyBvZiBmb2xsb3dpbmcgc3BlZWQ7XG4gICAqIEBkZWZhdWx0IDAuN1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihtb3VzZVRhcmdldCwgZWFzZSwgY29uZikge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5tb3VzZVRhcmdldCA9IFV0aWwuaW5pdFZhbHVlKG1vdXNlVGFyZ2V0LCB3aW5kb3cpO1xuICAgIHRoaXMuZWFzZSA9IFV0aWwuaW5pdFZhbHVlKGVhc2UsIDAuNyk7XG5cbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMubW91c2Vtb3ZlSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZW1vdmUuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlZG93bkhhbmRsZXIgPSBlID0+IHRoaXMubW91c2Vkb3duLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZXVwSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZXVwLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqL1xuICBlbWl0KCkge1xuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IGZhbHNlO1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgICBpZiAoZS5sYXllclggfHwgZS5sYXllclggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLmxheWVyWCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLmxheWVyWSAtIHRoaXMucC55KSAqIHRoaXMuZWFzZTtcbiAgICB9IGVsc2UgaWYgKGUub2Zmc2V0WCB8fCBlLm9mZnNldFggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLm9mZnNldFggLSB0aGlzLnAueCkgKiB0aGlzLmVhc2U7XG4gICAgICB0aGlzLnAueSArPSAoZS5vZmZzZXRZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbGxvd0VtaXR0aW5nKSBzdXBlci5lbWl0KFwib25jZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMubW91c2VUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0SGFuZGxlcigpO1xuICAgIHRoaXMubmFtZSA9IFwiQmFzZVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRTdHJva2UoY29sb3IgPSBcIiMwMDAwMDBcIiwgdGhpbmtuZXNzID0gMSkge1xuICAgIHRoaXMuc3Ryb2tlID0geyBjb2xvciwgdGhpbmtuZXNzIH07XG4gIH1cblxuICBpbml0SGFuZGxlcigpIHtcbiAgICB0aGlzLl9wcm90b25VcGRhdGVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9uUHJvdG9uVXBkYXRlQWZ0ZXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlciA9IGVtaXR0ZXIgPT4ge1xuICAgICAgdGhpcy5vbkVtaXR0ZXJBZGRlZC5jYWxsKHRoaXMsIGVtaXR0ZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyUmVtb3ZlZC5jYWxsKHRoaXMsIGVtaXR0ZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyID0gcGFydGljbGUgPT4ge1xuICAgICAgdGhpcy5vblBhcnRpY2xlQ3JlYXRlZC5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyID0gcGFydGljbGUgPT4ge1xuICAgICAgdGhpcy5vblBhcnRpY2xlVXBkYXRlLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyID0gcGFydGljbGUgPT4ge1xuICAgICAgdGhpcy5vblBhcnRpY2xlRGVhZC5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICB0aGlzLnBhcmVudCA9IHByb3RvbjtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURVwiLCB0aGlzLl9wcm90b25VcGRhdGVIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9BRERFRFwiLCB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfUkVNT1ZFRFwiLCB0aGlzLl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIpO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfVVBEQVRFXCIsIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9ERUFEXCIsIHRoaXMuX3BhcnRpY2xlRGVhZEhhbmRsZXIpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucG9vbC5kZXN0cm95KCk7XG4gICAgdGhpcy5wb29sID0gbnVsbDtcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkgaW5zdGFuY2VvZiBJbWFnZSkgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0NpcmNsZVxuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZSBkcmF3Q2lyY2xlIC0tXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY2lyY2xlXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvLyBwcml2YXRlIGNyZWF0ZUJ1ZmZlclxuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZSkge1xuICAgICAgY29uc3Qgc2l6ZSA9IGltYWdlLndpZHRoICsgXCJfXCIgKyBpbWFnZS5oZWlnaHQ7XG4gICAgICBsZXQgY2FudmFzID0gdGhpcy5idWZmZXJDYWNoZVtzaXplXTtcblxuICAgICAgaWYgKCFjYW52YXMpIHtcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV0gPSBjYW52YXM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5idWZmZXJDYWNoZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBEb21VdGlsIGZyb20gXCIuLi91dGlscy9Eb21VdGlsXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy50cmFuc2Zvcm0zZCA9IGZhbHNlO1xuICAgIHRoaXMucG9vbC5jcmVhdGUgPSAoYm9keSwgcGFydGljbGUpID0+IHRoaXMuY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRG9tUmVuZGVyZXJcIjtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmJvZHlSZWFkeShwYXJ0aWNsZSkpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zZm9ybTNkKSB7XG4gICAgICAgIERvbVV0aWwudHJhbnNmb3JtM2QocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybShwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSwgcGFydGljbGUuc2NhbGUsIHBhcnRpY2xlLnJvdGF0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcGFydGljbGUuYm9keS5zdHlsZS5vcGFjaXR5ID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5LmlzQ2lyY2xlKSB7XG4gICAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgYm9keVJlYWR5KHBhcnRpY2xlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwYXJ0aWNsZS5ib2R5ID09PSBcIm9iamVjdFwiICYmIHBhcnRpY2xlLmJvZHkgJiYgIXBhcnRpY2xlLmJvZHkuaXNJbm5lcjtcbiAgfVxuXG4gIC8vIHByaXZhdGUgbWV0aG9kXG4gIGFkZEltZzJCb2R5KGltZywgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGVhZCkgcmV0dXJuO1xuICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KGltZywgcGFydGljbGUpO1xuICAgIERvbVV0aWwucmVzaXplKHBhcnRpY2xlLmJvZHksIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICBjcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKSB7XG4gICAgaWYgKGJvZHkuaXNDaXJjbGUpIHJldHVybiB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKTtcbiAgfVxuXG4gIC8vIHByaXZhdGUgbWV0aG9kc1xuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBkb20gPSBEb21VdGlsLmNyZWF0ZURpdihgJHtwYXJ0aWNsZS5pZH1fZG9tYCwgMiAqIHBhcnRpY2xlLnJhZGl1cywgMiAqIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9IGAke3BhcnRpY2xlLnJhZGl1c31weGA7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJDb2xvciA9IHRoaXMuc3Ryb2tlLmNvbG9yO1xuICAgICAgZG9tLnN0eWxlLmJvcmRlcldpZHRoID0gYCR7dGhpcy5zdHJva2UudGhpbmtuZXNzfXB4YDtcbiAgICB9XG4gICAgZG9tLmlzQ2lyY2xlID0gdHJ1ZTtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBjcmVhdGVTcHJpdGUoYm9keSwgcGFydGljbGUpIHtcbiAgICBjb25zdCB1cmwgPSB0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIiA/IGJvZHkgOiBib2R5LnNyYztcbiAgICBjb25zdCBkb20gPSBEb21VdGlsLmNyZWF0ZURpdihgJHtwYXJ0aWNsZS5pZH1fZG9tYCwgYm9keS53aWR0aCwgYm9keS5oZWlnaHQpO1xuICAgIGRvbS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7dXJsfSlgO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWFzZWxSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5uYW1lID0gXCJFYXNlbFJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICB0aGlzLmNyZWF0ZVNwcml0ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkueCA9IHBhcnRpY2xlLnAueDtcbiAgICAgIHBhcnRpY2xlLmJvZHkueSA9IHBhcnRpY2xlLnAueTtcblxuICAgICAgcGFydGljbGUuYm9keS5hbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgcGFydGljbGUuYm9keS5zY2FsZVggPSBwYXJ0aWNsZS5ib2R5LnNjYWxlWSA9IHBhcnRpY2xlLnNjYWxlO1xuICAgICAgcGFydGljbGUuYm9keS5yb3RhdGlvbiA9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucGFyZW50ICYmIHBhcnRpY2xlLmJvZHkucGFyZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChwYXJ0aWNsZS5ncmFwaGljcykgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ncmFwaGljcyk7XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIGNyZWF0ZVNwcml0ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgaWYgKHBhcnRpY2xlLmJvZHkucGFyZW50KSByZXR1cm47XG4gICAgaWYgKHBhcnRpY2xlLmJvZHlbXCJpbWFnZVwiXSkge1xuICAgICAgcGFydGljbGUuYm9keS5yZWdYID0gcGFydGljbGUuYm9keS5pbWFnZS53aWR0aCAvIDI7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJlZ1kgPSBwYXJ0aWNsZS5ib2R5LmltYWdlLmhlaWdodCAvIDI7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSB0aGlzLnBvb2wuZ2V0KGNyZWF0ZWpzLkdyYXBoaWNzKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgaWYgKHRoaXMuc3Ryb2tlIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKHRoaXMuc3Ryb2tlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKFwiIzAwMDAwMFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiKS5kcmF3Q2lyY2xlKDAsIDAsIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLnBvb2wuZ2V0KGNyZWF0ZWpzLlNoYXBlLCBbZ3JhcGhpY3NdKTtcblxuICAgIHBhcnRpY2xlLmJvZHkgPSBzaGFwZTtcbiAgICBwYXJ0aWNsZS5ncmFwaGljcyA9IGdyYXBoaWNzO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4ZWxSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHJlY3RhbmdsZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gICAgdGhpcy5jcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUGl4ZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgY3JlYXRlSW1hZ2VEYXRhKHJlY3RhbmdsZSkge1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlID8gcmVjdGFuZ2xlIDogbmV3IFJlY3RhbmdsZSgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCB0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55KTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QodGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSwgdGhpcy5yZWN0YW5nbGUud2lkdGgsIHRoaXMucmVjdGFuZ2xlLmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKFxuICAgICAgdGhpcy5yZWN0YW5nbGUueCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLnksXG4gICAgICB0aGlzLnJlY3RhbmdsZS53aWR0aCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZUFmdGVyKCkge1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHt9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmltYWdlRGF0YSkge1xuICAgICAgdGhpcy5zZXRQaXhlbChcbiAgICAgICAgdGhpcy5pbWFnZURhdGEsXG4gICAgICAgIChwYXJ0aWNsZS5wLnggLSB0aGlzLnJlY3RhbmdsZS54KSA+PiAwLFxuICAgICAgICAocGFydGljbGUucC55IC0gdGhpcy5yZWN0YW5nbGUueSkgPj4gMCxcbiAgICAgICAgcGFydGljbGVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0UGl4ZWwoaW1hZ2VkYXRhLCB4LCB5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHJnYiA9IHBhcnRpY2xlLnJnYjtcbiAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuZWxlbWVudC53aWR0aCB8fCB5IDwgMCB8fCB5ID4gdGhpcy5lbGVtZW50d2lkdGgpIHJldHVybjtcblxuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiBpbWFnZWRhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIGltYWdlZGF0YS5kYXRhW2ldID0gcmdiLnI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDFdID0gcmdiLmc7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDJdID0gcmdiLmI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDNdID0gcGFydGljbGUuYWxwaGEgKiAyNTU7XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxubGV0IFBJWElDbGFzcztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpeGlSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q29sb3IgPSBmYWxzZTtcbiAgICB0aGlzLmJsZW5kTW9kZSA9IG51bGw7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLnNldFBJWEkod2luZG93LlBJWEkpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhpUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFBJWEkoUElYSSkge1xuICAgIHRyeSB7XG4gICAgICBQSVhJQ2xhc3MgPSBQSVhJIHx8IHsgU3ByaXRlOiB7fSB9O1xuICAgICAgdGhpcy5jcmVhdGVGcm9tSW1hZ2UgPSBQSVhJQ2xhc3MuU3ByaXRlLmZyb20gfHwgUElYSUNsYXNzLlNwcml0ZS5mcm9tSW1hZ2U7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSkge1xuICAgICAgcGFydGljbGUuYm9keS5ibGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgdGhpcy50cmFuc2Zvcm0ocGFydGljbGUsIHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgaWYgKHRoaXMuc2V0Q29sb3IgPT09IHRydWUgfHwgdGhpcy5jb2xvciA9PT0gdHJ1ZSkge1xuICAgICAgcGFydGljbGUuYm9keS50aW50ID0gQ29sb3JVdGlsLmdldEhleDE2RnJvbVBhcnRpY2xlKHBhcnRpY2xlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICB9XG5cbiAgdHJhbnNmb3JtKHBhcnRpY2xlLCB0YXJnZXQpIHtcbiAgICB0YXJnZXQueCA9IHBhcnRpY2xlLnAueDtcbiAgICB0YXJnZXQueSA9IHBhcnRpY2xlLnAueTtcblxuICAgIHRhcmdldC5hbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGFyZ2V0LnNjYWxlLnggPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICB0YXJnZXQuc2NhbGUueSA9IHBhcnRpY2xlLnNjYWxlO1xuXG4gICAgLy8gdXNpbmcgY2FjaGVkIHZlcnNpb24gb2YgTWF0aFV0aWwuUElfMTgwIGZvciBzbGlnaHQgcGVyZm9ybWFuY2UgaW5jcmVhc2UuXG4gICAgdGFyZ2V0LnJvdGF0aW9uID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7IC8vIE1hdGhVdGlsLlBJXzE4MDtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICBlbHNlIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5KSB7XG4gICAgY29uc3Qgc3ByaXRlID0gYm9keS5pc0lubmVyID8gdGhpcy5jcmVhdGVGcm9tSW1hZ2UoYm9keS5zcmMpIDogbmV3IFBJWElDbGFzcy5TcHJpdGUoYm9keSk7XG5cbiAgICBzcHJpdGUuYW5jaG9yLnggPSAwLjU7XG4gICAgc3ByaXRlLmFuY2hvci55ID0gMC41O1xuXG4gICAgcmV0dXJuIHNwcml0ZTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gbmV3IFBJWElDbGFzcy5HcmFwaGljcygpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBjb25zdCBzdHJva2UgPSB0aGlzLnN0cm9rZSBpbnN0YW5jZW9mIFN0cmluZyA/IHRoaXMuc3Ryb2tlIDogMHgwMDAwMDA7XG4gICAgICBncmFwaGljcy5iZWdpblN0cm9rZShzdHJva2UpO1xuICAgIH1cblxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCAweDAwOGNlZCk7XG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcblxuICAgIHJldHVybiBncmFwaGljcztcbiAgfVxuXG4gIGRlc3Ryb3kocGFydGljbGVzKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgbGV0IGkgPSBwYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXTtcbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTVN0YWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXRzID0gW107XG4gICAgdGhpcy5zaXplID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykgdGhpcy5tYXRzLnB1c2goTWF0My5jcmVhdGUoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XG4gIH1cblxuICBzZXQobSwgaSkge1xuICAgIGlmIChpID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbaSAtIDFdLCBtLCB0aGlzLm1hdHNbaV0pO1xuXG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgodGhpcy5zaXplLCBpICsgMSk7XG4gIH1cblxuICBwdXNoKG0pIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV0sIG0sIHRoaXMubWF0c1t0aGlzLnNpemVdKTtcblxuICAgIHRoaXMuc2l6ZSsrO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIGlmICh0aGlzLnNpemUgPiAwKSB0aGlzLnNpemUtLTtcbiAgfVxuXG4gIHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBNU3RhY2sgZnJvbSBcIi4uL3V0aWxzL01TdGFja1wiO1xuaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4uL3V0aWxzL1dlYkdMVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmdsID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgeyBhbnRpYWxpYXM6IHRydWUsIHN0ZW5jaWw6IGZhbHNlLCBkZXB0aDogZmFsc2UgfSk7XG4gICAgaWYgKCF0aGlzLmdsKSBhbGVydChcIlNvcnJ5IHlvdXIgYnJvd3NlciBkbyBub3Qgc3VwcGVzdCBXZWJHTCFcIik7XG5cbiAgICB0aGlzLmluaXRWYXIoKTtcbiAgICB0aGlzLnNldE1heFJhZGl1cygpO1xuICAgIHRoaXMuaW5pdFNoYWRlcnMoKTtcbiAgICB0aGlzLmluaXRCdWZmZXJzKCk7XG5cbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbC5GVU5DX0FERCk7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiV2ViR0xSZW5kZXJlclwiO1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICBzdXBlci5pbml0KHByb3Rvbik7XG4gICAgdGhpcy5yZXNpemUodGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy51bWF0WzRdID0gLTI7XG4gICAgdGhpcy51bWF0WzddID0gMTtcblxuICAgIHRoaXMuc21hdFswXSA9IDEgLyB3aWR0aDtcbiAgICB0aGlzLnNtYXRbNF0gPSAxIC8gaGVpZ2h0O1xuXG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMudW1hdCwgMCk7XG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMuc21hdCwgMSk7XG5cbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRNYXhSYWRpdXMocmFkaXVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNVUkwgPSB0aGlzLmNyZWF0ZUNpcmNsZShyYWRpdXMpO1xuICB9XG5cbiAgZ2V0VmVydGV4U2hhZGVyKCkge1xuICAgIGNvbnN0IHZzU291cmNlID0gW1xuICAgICAgXCJ1bmlmb3JtIHZlYzIgdmlld3BvcnQ7XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidW5pZm9ybSBtYXQzIHRNYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzMgdiA9IHRNYXQgKiB2ZWMzKGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcIixcbiAgICAgIFwiZ2xfUG9zaXRpb24gPSB2ZWM0KHYueCwgdi55LCAwLCAxKTtcIixcbiAgICAgIFwidlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcImFscGhhID0gdE1hdFswXVsyXTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiB2c1NvdXJjZTtcbiAgfVxuXG4gIGdldEZyYWdtZW50U2hhZGVyKCkge1xuICAgIGNvbnN0IGZzU291cmNlID0gW1xuICAgICAgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzQgY29sb3I7XCIsXG4gICAgICBcInVuaWZvcm0gYm9vbCB1c2VUZXh0dXJlO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzMgdUNvbG9yO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZUNvbG9yICogdmVjNCh1Q29sb3IsIDEuMCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvci53ICo9IGFscGhhO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIGZzU291cmNlO1xuICB9XG5cbiAgaW5pdFZhcigpIHtcbiAgICB0aGlzLm1zdGFjayA9IG5ldyBNU3RhY2soKTtcbiAgICB0aGlzLnVtYXQgPSBNYXQzLmNyZWF0ZShbMiwgMCwgMSwgMCwgLTIsIDAsIC0xLCAxLCAxXSk7XG4gICAgdGhpcy5zbWF0ID0gTWF0My5jcmVhdGUoWzEgLyAxMDAsIDAsIDEsIDAsIDEgLyAxMDAsIDAsIDAsIDAsIDFdKTtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0ge307XG4gIH1cblxuICBibGVuZEVxdWF0aW9uKEEpIHtcbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbFtBXSk7XG4gIH1cblxuICBibGVuZEZ1bmMoQSwgQikge1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2xbQV0sIHRoaXMuZ2xbQl0pO1xuICB9XG5cbiAgZ2V0U2hhZGVyKGdsLCBzdHIsIGZzKSB7XG4gICAgY29uc3Qgc2hhZGVyID0gZnMgPyBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKSA6IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcblxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHN0cik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgaW5pdFNoYWRlcnMoKSB7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyKCksIHRydWUpO1xuICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0VmVydGV4U2hhZGVyKCksIGZhbHNlKTtcblxuICAgIHRoaXMuc3Byb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5zcHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIGFsZXJ0KFwiQ291bGQgbm90IGluaXRpYWxpc2Ugc2hhZGVyc1wiKTtcblxuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcbiAgICB0aGlzLnNwcm9ncmFtLnZwYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVmVydGV4UG9zaXRpb25cIik7XG4gICAgdGhpcy5zcHJvZ3JhbS50Y2EgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVRleHR1cmVDb29yZFwiKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udGNhKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udnBhKTtcblxuICAgIHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInRNYXRcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidVNhbXBsZXJcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS51c2VUZXggPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVzZVRleHR1cmVcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5jb2xvciA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidUNvbG9yXCIpO1xuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0udXNlVGV4LCAxKTtcbiAgfVxuXG4gIGluaXRCdWZmZXJzKCkge1xuICAgIGNvbnN0IHZzID0gWzAsIDMsIDEsIDAsIDIsIDNdO1xuICAgIGxldCBpZHg7XG5cbiAgICB0aGlzLnVuaXRJQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh2cyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgbGV0IGk7XG4gICAgbGV0IGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSk7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnVuaXRJMzMgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJMzMpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpLCBpICsgMSwgaSArIDIpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy5zdHJpcEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuc3RyaXBCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHJhaWR1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzID0gV2ViR0xVdGlsLm5ocG90KFV0aWwuaW5pdFZhbHVlKHJhaWR1cywgMzIpKTtcbiAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhcImNpcmNsZV9jYW52YXNcIiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfVxuXG4gIGRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgX3cgPSBwYXJ0aWNsZS5ib2R5LndpZHRoO1xuICAgIGNvbnN0IF9oID0gcGFydGljbGUuYm9keS5oZWlnaHQ7XG5cbiAgICBjb25zdCBfd2lkdGggPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS53aWR0aCk7XG4gICAgY29uc3QgX2hlaWdodCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LmhlaWdodCk7XG5cbiAgICBjb25zdCBfc2NhbGVYID0gcGFydGljbGUuYm9keS53aWR0aCAvIF93aWR0aDtcbiAgICBjb25zdCBfc2NhbGVZID0gcGFydGljbGUuYm9keS5oZWlnaHQgLyBfaGVpZ2h0O1xuXG4gICAgaWYgKCF0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSlcbiAgICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdID0gW1xuICAgICAgICB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKVxuICAgICAgXTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZSA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzBdO1xuICAgIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsxXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMl07XG5cbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF9zY2FsZVgsIDAuMCwgMC4wLCBfc2NhbGVZLCBfc2NhbGVZLCBfc2NhbGVZXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF93LCAwLjAsIDAuMCwgX2gsIF93LCBfaF0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gcGFydGljbGUuZGF0YS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xuXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpO1xuICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggPSBfdztcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgPSBfaDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIC8vIHRoaXMuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAxKTtcbiAgICAvLyB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IGZhbHNlO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS50bWF0WzhdID0gMTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdFs4XSA9IDE7XG5cbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZSh0aGlzLmNpcmNsZUNhbnZhc1VSTCwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IHBhcnRpY2xlLnJhZGl1cyAvIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgICBwYXJ0aWNsZS5kYXRhLnNyYyA9IGltZy5zcmM7XG4gICAgcGFydGljbGUuZGF0YS5jYW52YXMgPSBJbWdVdGlsLmdldENhbnZhc0Zyb21DYWNoZShpbWcpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSAxO1xuXG4gICAgdGhpcy5kcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCkge1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgocGFydGljbGUpO1xuXG4gICAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNwcm9ncmFtLmNvbG9yLCBwYXJ0aWNsZS5yZ2IuciAvIDI1NSwgcGFydGljbGUucmdiLmcgLyAyNTUsIHBhcnRpY2xlLnJnYi5iIC8gMjU1KTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtLCBmYWxzZSwgdGhpcy5tc3RhY2sudG9wKCkpO1xuXG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udnBhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udGNhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0sIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuXG4gICAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgNiwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICB0aGlzLm1zdGFjay5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICB1cGRhdGVNYXRyaXgocGFydGljbGUpIHtcbiAgICBjb25zdCBtb3ZlT3JpZ2luTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCAvIDIsXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcblxuICAgIGNvbnN0IGFuZ2VsID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7XG4gICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVJvdGF0aW9uKGFuZ2VsKTtcblxuICAgIGNvbnN0IHNjYWxlID0gcGFydGljbGUuc2NhbGUgKiBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlO1xuICAgIGNvbnN0IHNjYWxlTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgIGxldCBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobW92ZU9yaWdpbk1hdHJpeCwgc2NhbGVNYXRyaXgpO1xuXG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgcm90YXRpb25NYXRyaXgpO1xuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHRyYW5zbGF0aW9uTWF0cml4KTtcblxuICAgIE1hdDMuaW52ZXJzZShtYXRyaXgsIHBhcnRpY2xlLmRhdGEuaW1hdCk7XG4gICAgbWF0cml4WzJdID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0aGlzLm1zdGFjay5wdXNoKG1hdHJpeCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdsID0gbnVsbDtcbiAgICB0aGlzLm1zdGFjayA9IG51bGw7XG4gICAgdGhpcy51bWF0ID0gbnVsbDtcbiAgICB0aGlzLnNtYXQgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tUmVuZGVyZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZGlyZWN0aW9uKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh4MiAtIHgxID49IDApIHtcbiAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54MSA9IHgyO1xuICAgICAgdGhpcy55MSA9IHkyO1xuICAgICAgdGhpcy54MiA9IHgxO1xuICAgICAgdGhpcy55MiA9IHkxO1xuICAgIH1cblxuICAgIHRoaXMuZHggPSB0aGlzLngyIC0gdGhpcy54MTtcbiAgICB0aGlzLmR5ID0gdGhpcy55MiAtIHRoaXMueTE7XG5cbiAgICB0aGlzLm1pbnggPSBNYXRoLm1pbih0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1pbnkgPSBNYXRoLm1pbih0aGlzLnkxLCB0aGlzLnkyKTtcbiAgICB0aGlzLm1heHggPSBNYXRoLm1heCh0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1heHkgPSBNYXRoLm1heCh0aGlzLnkxLCB0aGlzLnkyKTtcblxuICAgIHRoaXMuZG90ID0gdGhpcy54MiAqIHRoaXMueTEgLSB0aGlzLngxICogdGhpcy55MjtcbiAgICB0aGlzLnh4eXkgPSB0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5O1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlsLmluaXRWYWx1ZShkaXJlY3Rpb24sIFwiPlwiKTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLmNvcyh0aGlzLmdyYWRpZW50KTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLnNpbih0aGlzLmdyYWRpZW50KTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQiA9PT0gMCA/IDEgOiBCO1xuXG4gICAgaWYgKChBICogeCArIEIgKiB5ICsgQykgKiBEID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXREaXN0YW5jZSh4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQSAqIHggKyBCICogeSArIEM7XG5cbiAgICByZXR1cm4gRCAvIE1hdGguc3FydCh0aGlzLnh4eXkpO1xuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHYpIHtcbiAgICBjb25zdCB0aGEyID0gdi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG5cbiAgICBjb25zdCBvbGR4ID0gdi54O1xuICAgIGNvbnN0IG9sZHkgPSB2Lnk7XG5cbiAgICB2LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMuZHksIHRoaXMuZHgpO1xuICB9XG5cbiAgcmFuZ2VPdXQocGFydGljbGUpIHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYWJzKHRoaXMuZ2V0R3JhZGllbnQoKSk7XG5cbiAgICBpZiAoYW5nbGUgPD0gTWF0aFV0aWwuUEkgLyA0KSB7XG4gICAgICBpZiAocGFydGljbGUucC54IDw9IHRoaXMubWF4eCAmJiBwYXJ0aWNsZS5wLnggPj0gdGhpcy5taW54KSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueSA8PSB0aGlzLm1heHkgJiYgcGFydGljbGUucC55ID49IHRoaXMubWlueSkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keSk7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCI+XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiUlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcblxuICAgICAgaWYgKHRoaXMuZ2V0RGlzdGFuY2UocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpIDw9IHBhcnRpY2xlLnJhZGl1cykge1xuICAgICAgICBpZiAodGhpcy5keCA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR5ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlLnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIExpbmVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLmNlbnRlciA9IHsgeCwgeSB9O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJeDIgKiBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMucmFuZG9tUmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgc2V0Q2VudGVyKHgsIHkpIHtcbiAgICB0aGlzLmNlbnRlci54ID0geDtcbiAgICB0aGlzLmNlbnRlci55ID0geTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZCA9IHBhcnRpY2xlLnAuZGlzdGFuY2VUbyh0aGlzLmNlbnRlcik7XG5cbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAoZCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMucmFkaXVzKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChkICsgcGFydGljbGUucmFkaXVzID49IHRoaXMucmFkaXVzKSB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIENpcmNsZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdGhhMiA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudChwYXJ0aWNsZSk7XG5cbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcbiAgICBjb25zdCBvbGR4ID0gcGFydGljbGUudi54O1xuICAgIGNvbnN0IG9sZHkgPSBwYXJ0aWNsZS52Lnk7XG5cbiAgICBwYXJ0aWNsZS52LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHBhcnRpY2xlLnYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG4gIH1cblxuICBnZXRHcmFkaWVudChwYXJ0aWNsZSkge1xuICAgIHJldHVybiAtTWF0aFV0aWwuUElfMiArIE1hdGguYXRhbjIocGFydGljbGUucC55IC0gdGhpcy5jZW50ZXIueSwgcGFydGljbGUucC54IC0gdGhpcy5jZW50ZXIueCk7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIC8vIHBhcnRpY2xlIGRlYWQgem9uZVxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGJvdW5kIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBjcm9zcyB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCAmJiBwYXJ0aWNsZS52LnggPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoICYmIHBhcnRpY2xlLnYueCA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAmJiBwYXJ0aWNsZS52LnkgPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQgJiYgcGFydGljbGUudi55ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXNldChpbWFnZURhdGEsIHgsIHksIGQpO1xuICB9XG5cbiAgcmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBpbWFnZURhdGE7XG4gICAgdGhpcy54ID0gVXRpbC5pbml0VmFsdWUoeCwgMCk7XG4gICAgdGhpcy55ID0gVXRpbC5pbml0VmFsdWUoeSwgMCk7XG4gICAgdGhpcy5kID0gVXRpbC5pbml0VmFsdWUoZCwgMik7XG5cbiAgICB0aGlzLnZlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNldFZlY3RvcnMoKTtcbiAgfVxuXG4gIHNldFZlY3RvcnMoKSB7XG4gICAgbGV0IGksIGo7XG4gICAgY29uc3QgbGVuZ3RoMSA9IHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGxlbmd0aDIgPSB0aGlzLmltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSArPSB0aGlzLmQpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGgyOyBqICs9IHRoaXMuZCkge1xuICAgICAgICBsZXQgaW5kZXggPSAoKGogPj4gMCkgKiBsZW5ndGgxICsgKGkgPj4gMCkpICogNDtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkge1xuICAgICAgICAgIHRoaXMudmVjdG9ycy5wdXNoKHsgeDogaSArIHRoaXMueCwgeTogaiArIHRoaXMueSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldEJvdW5kKHgsIHkpIHtcbiAgICBjb25zdCBpbmRleCA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB2ZWN0b3IgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy52ZWN0b3JzKTtcbiAgICByZXR1cm4gdGhpcy52ZWN0b3IuY29weSh2ZWN0b3IpO1xuICB9XG5cbiAgZ2V0Q29sb3IoeCwgeSkge1xuICAgIHggLT0gdGhpcy54O1xuICAgIHkgLT0gdGhpcy55O1xuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogdGhpcy5pbWFnZURhdGEuZGF0YVtpXSxcbiAgICAgIGc6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDFdLFxuICAgICAgYjogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMl0sXG4gICAgICBhOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAzXVxuICAgIH07XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIHBhcnRpY2xlLmRlYWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLnYubmVnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4uL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi4vem9uZS9SZWN0Wm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCBmdW5jKSB7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsICgpID0+IGZ1bmMoKSk7XG4gIH0sXG5cbiAgZ2V0U3R5bGUoY29sb3IgPSBcIiNmZjAwMDBcIikge1xuICAgIGNvbnN0IHJnYiA9IENvbG9yVXRpbC5oZXhUb1JnYihjb2xvcik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cmdiLnJ9LCAke3JnYi5nfSwgJHtyZ2IuYn0sIDAuNSlgO1xuICB9LFxuXG4gIGRyYXdab25lKHByb3RvbiwgY2FudmFzLCB6b25lLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBpZiAoem9uZSBpbnN0YW5jZW9mIFBvaW50Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBMaW5lWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHpvbmUueDEsIHpvbmUueTEpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyh6b25lLngyLCB6b25lLnkyKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIFJlY3Rab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5kcmF3UmVjdCh6b25lLngsIHpvbmUueSwgem9uZS53aWR0aCwgem9uZS5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgQ2lyY2xlWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCB6b25lLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRyYXdFbWl0dGVyKHByb3RvbiwgY2FudmFzLCBlbWl0dGVyLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgIGNvbnRleHQuYXJjKGVtaXR0ZXIucC54LCBlbWl0dGVyLnAueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgUG9vbCBmcm9tIFwiLi9jb3JlL1Bvb2xcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0MyBmcm9tIFwiLi9tYXRoL01hdDNcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuL21hdGgvU3BhblwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4vbWF0aC9lYXNlXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTGlmZSBmcm9tIFwiLi9pbml0aWFsaXplL0xpZmVcIjtcbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi9pbml0aWFsaXplL1Bvc2l0aW9uXCI7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9WZWxvY2l0eVwiO1xuaW1wb3J0IE1hc3MgZnJvbSBcIi4vaW5pdGlhbGl6ZS9NYXNzXCI7XG5pbXBvcnQgUmFkaXVzIGZyb20gXCIuL2luaXRpYWxpemUvUmFkaXVzXCI7XG5pbXBvcnQgQm9keSBmcm9tIFwiLi9pbml0aWFsaXplL0JvZHlcIjtcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9iZWhhdmlvdXIvQmVoYXZpb3VyXCI7XG5pbXBvcnQgRm9yY2UgZnJvbSBcIi4vYmVoYXZpb3VyL0ZvcmNlXCI7XG5pbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQXR0cmFjdGlvblwiO1xuaW1wb3J0IFJhbmRvbURyaWZ0IGZyb20gXCIuL2JlaGF2aW91ci9SYW5kb21EcmlmdFwiO1xuaW1wb3J0IEdyYXZpdHkgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlcIjtcbmltcG9ydCBDb2xsaXNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0NvbGxpc2lvblwiO1xuaW1wb3J0IENyb3NzWm9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3Jvc3Nab25lXCI7XG5pbXBvcnQgQWxwaGEgZnJvbSBcIi4vYmVoYXZpb3VyL0FscGhhXCI7XG5pbXBvcnQgU2NhbGUgZnJvbSBcIi4vYmVoYXZpb3VyL1NjYWxlXCI7XG5pbXBvcnQgUm90YXRlIGZyb20gXCIuL2JlaGF2aW91ci9Sb3RhdGVcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sb3JcIjtcbmltcG9ydCBDeWNsb25lIGZyb20gXCIuL2JlaGF2aW91ci9DeWNsb25lXCI7XG5pbXBvcnQgUmVwdWxzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9SZXB1bHNpb25cIjtcbmltcG9ydCBHcmF2aXR5V2VsbCBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVdlbGxcIjtcblxuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9FbWl0dGVyXCI7XG5pbXBvcnQgQmVoYXZpb3VyRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0JlaGF2aW91ckVtaXR0ZXJcIjtcbmltcG9ydCBGb2xsb3dFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRm9sbG93RW1pdHRlclwiO1xuXG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0NhbnZhc1JlbmRlcmVyXCI7XG5pbXBvcnQgRG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0RvbVJlbmRlcmVyXCI7XG5pbXBvcnQgRWFzZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRWFzZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGVsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGVsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhpUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGlSZW5kZXJlclwiO1xuaW1wb3J0IFdlYkdMUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1dlYkdMUmVuZGVyZXJcIjtcbmltcG9ydCBDdXN0b21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ3VzdG9tUmVuZGVyZXJcIjtcblxuaW1wb3J0IFpvbmUgZnJvbSBcIi4vem9uZS9ab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4vem9uZS9SZWN0Wm9uZVwiO1xuaW1wb3J0IEltYWdlWm9uZSBmcm9tIFwiLi96b25lL0ltYWdlWm9uZVwiO1xuXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4vZGVidWcvRGVidWdcIjtcblxuLy8gbmFtZXNwYWNlXG5Qcm90b24uUGFydGljbGUgPSBQYXJ0aWNsZTtcblByb3Rvbi5Qb29sID0gUG9vbDtcblxuUHJvdG9uLlV0aWwgPSBVdGlsO1xuUHJvdG9uLkNvbG9yVXRpbCA9IENvbG9yVXRpbDtcblByb3Rvbi5NYXRoVXRpbCA9IE1hdGhVdGlsO1xuUHJvdG9uLlZlY3RvcjJEID0gUHJvdG9uLlZlY3RvciA9IFZlY3RvcjJEO1xuUHJvdG9uLlBvbGFyMkQgPSBQcm90b24uUG9sYXIgPSBQb2xhcjJEO1xuUHJvdG9uLkFycmF5U3BhbiA9IEFycmF5U3BhbjtcblByb3Rvbi5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG5Qcm90b24uUmF0ZSA9IFJhdGU7XG5Qcm90b24uZWFzZSA9IGVhc2U7XG5Qcm90b24uU3BhbiA9IFNwYW47XG5Qcm90b24uTWF0MyA9IE1hdDM7XG5Qcm90b24uZ2V0U3BhbiA9IChhLCBiLCBjZW50ZXIpID0+IG5ldyBTcGFuKGEsIGIsIGNlbnRlcik7XG5Qcm90b24uY3JlYXRlQXJyYXlTcGFuID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbjtcblxuUHJvdG9uLkluaXRpYWxpemUgPSBQcm90b24uSW5pdCA9IEluaXRpYWxpemU7XG5Qcm90b24uTGlmZSA9IFByb3Rvbi5MID0gTGlmZTtcblByb3Rvbi5Qb3NpdGlvbiA9IFByb3Rvbi5QID0gUG9zaXRpb247XG5Qcm90b24uVmVsb2NpdHkgPSBQcm90b24uViA9IFZlbG9jaXR5O1xuUHJvdG9uLk1hc3MgPSBQcm90b24uTSA9IE1hc3M7XG5Qcm90b24uUmFkaXVzID0gUHJvdG9uLlIgPSBSYWRpdXM7XG5Qcm90b24uQm9keSA9IFByb3Rvbi5CID0gQm9keTtcblxuUHJvdG9uLkJlaGF2aW91ciA9IEJlaGF2aW91cjtcblByb3Rvbi5Gb3JjZSA9IFByb3Rvbi5GID0gRm9yY2U7XG5Qcm90b24uQXR0cmFjdGlvbiA9IFByb3Rvbi5BID0gQXR0cmFjdGlvbjtcblByb3Rvbi5SYW5kb21EcmlmdCA9IFByb3Rvbi5SRCA9IFJhbmRvbURyaWZ0O1xuUHJvdG9uLkdyYXZpdHkgPSBQcm90b24uRyA9IEdyYXZpdHk7XG5Qcm90b24uQ29sbGlzaW9uID0gQ29sbGlzaW9uO1xuUHJvdG9uLkNyb3NzWm9uZSA9IENyb3NzWm9uZTtcblByb3Rvbi5BbHBoYSA9IEFscGhhO1xuUHJvdG9uLlNjYWxlID0gUHJvdG9uLlMgPSBTY2FsZTtcblByb3Rvbi5Sb3RhdGUgPSBSb3RhdGU7XG5Qcm90b24uQ29sb3IgPSBDb2xvcjtcblByb3Rvbi5SZXB1bHNpb24gPSBSZXB1bHNpb247XG5Qcm90b24uQ3ljbG9uZSA9IEN5Y2xvbmU7XG5Qcm90b24uR3Jhdml0eVdlbGwgPSBHcmF2aXR5V2VsbDtcblxuUHJvdG9uLkVtaXR0ZXIgPSBFbWl0dGVyO1xuUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXIgPSBCZWhhdmlvdXJFbWl0dGVyO1xuUHJvdG9uLkZvbGxvd0VtaXR0ZXIgPSBGb2xsb3dFbWl0dGVyO1xuXG5Qcm90b24uWm9uZSA9IFpvbmU7XG5Qcm90b24uTGluZVpvbmUgPSBMaW5lWm9uZTtcblByb3Rvbi5DaXJjbGVab25lID0gQ2lyY2xlWm9uZTtcblByb3Rvbi5Qb2ludFpvbmUgPSBQb2ludFpvbmU7XG5Qcm90b24uUmVjdFpvbmUgPSBSZWN0Wm9uZTtcblByb3Rvbi5JbWFnZVpvbmUgPSBJbWFnZVpvbmU7XG5cblByb3Rvbi5DYW52YXNSZW5kZXJlciA9IENhbnZhc1JlbmRlcmVyO1xuUHJvdG9uLkRvbVJlbmRlcmVyID0gRG9tUmVuZGVyZXI7XG5Qcm90b24uRWFzZWxSZW5kZXJlciA9IEVhc2VsUmVuZGVyZXI7XG5Qcm90b24uUGl4aVJlbmRlcmVyID0gUGl4aVJlbmRlcmVyO1xuUHJvdG9uLlBpeGVsUmVuZGVyZXIgPSBQaXhlbFJlbmRlcmVyO1xuUHJvdG9uLldlYkdMUmVuZGVyZXIgPSBQcm90b24uV2ViR2xSZW5kZXJlciA9IFdlYkdMUmVuZGVyZXI7XG5Qcm90b24uQ3VzdG9tUmVuZGVyZXIgPSBDdXN0b21SZW5kZXJlcjtcblxuUHJvdG9uLkRlYnVnID0gRGVidWc7XG5VdGlsLmFzc2lnbihQcm90b24sIGVhc2UpO1xuXG4vLyBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IFByb3RvbjtcbiJdLCJuYW1lcyI6WyJpcG90IiwibGVuZ3RoIiwibmhwb3QiLCJpIiwibWFrZVRyYW5zbGF0aW9uIiwidHgiLCJ0eSIsIm1ha2VSb3RhdGlvbiIsImFuZ2xlSW5SYWRpYW5zIiwiYyIsIk1hdGgiLCJjb3MiLCJzIiwic2luIiwibWFrZVNjYWxlIiwic3giLCJzeSIsIm1hdHJpeE11bHRpcGx5IiwiYSIsImIiLCJhMDAiLCJhMDEiLCJhMDIiLCJhMTAiLCJhMTEiLCJhMTIiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMTAiLCJiMTEiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJjcmVhdGVDYW52YXMiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJjcmVhdGVEaXYiLCJyZXNpemUiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiZGl2IiwieCIsInkiLCJzY2FsZSIsInJvdGF0ZSIsIndpbGxDaGFuZ2UiLCJjc3MzIiwidHJhbnNmb3JtM2QiLCJrZXkiLCJ2YWwiLCJia2V5IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpbWdzQ2FjaGUiLCJjYW52YXNDYWNoZSIsImNhbnZhc0lkIiwiZ2V0SW1hZ2VEYXRhIiwiY29udGV4dCIsImltYWdlIiwicmVjdCIsImRyYXdJbWFnZSIsImltYWdlZGF0YSIsImNsZWFyUmVjdCIsImdldEltZ0Zyb21DYWNoZSIsImltZyIsImNhbGxiYWNrIiwicGFyYW0iLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJnZXRDYW52YXNGcm9tQ2FjaGUiLCJXZWJHTFV0aWwiLCJjYW52YXMiLCJEb21VdGlsIiwiZ2V0Q29udGV4dCIsImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZW1wdHlBcnJheSIsImFyciIsInRvQXJyYXkiLCJnZXRSYW5kRnJvbUFycmF5IiwiZmxvb3IiLCJyYW5kb20iLCJlbXB0eU9iamVjdCIsIm9iaiIsImlnbm9yZSIsImluZGV4T2YiLCJjbGFzc0FwcGx5IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiRmFjdG9yeUZ1bmMiLCJiaW5kIiwiYXBwbHkiLCJjb25jYXQiLCJJbWdVdGlsIiwiZGVzdHJveUFsbCIsImRlc3Ryb3kiLCJhc3NpZ24iLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkc01hcCIsIlB1aWQiLCJfaW5kZXgiLCJfY2FjaGUiLCJ0eXBlIiwiZ2V0SWQiLCJ1aWQiLCJnZXRJZEZyb21DYWNoZSIsImlzQm9keSIsImlzSW5uZXIiLCJnZXRUYXJnZXQiLCJQb29sIiwibnVtIiwidG90YWwiLCJjYWNoZSIsImdldCIsInBhcmFtcyIsInAiLCJfX3B1aWQiLCJwb3AiLCJjcmVhdGVPckNsb25lIiwiZXhwaXJlIiwiZ2V0Q2FjaGUiLCJwdXNoIiwiY3JlYXRlIiwiVXRpbCIsImNsb25lIiwiZ2V0Q291bnQiLCJjb3VudCIsIlN0YXRzIiwicHJvdG9uIiwiY29udGFpbmVyIiwiZW1pdHRlckluZGV4IiwicmVuZGVyZXJJbmRleCIsInVwZGF0ZSIsImJvZHkiLCJhZGQiLCJlbWl0dGVyIiwiZ2V0RW1pdHRlciIsInJlbmRlcmVyIiwiZ2V0UmVuZGVyZXIiLCJzdHIiLCJlbWl0dGVycyIsImVtaXRTcGVlZCIsImdldEVtaXR0ZXJQb3MiLCJpbml0aWFsaXplcyIsImNvbmNhdEFyciIsImJlaGF2aW91cnMiLCJuYW1lIiwiZ2V0Q3JlYXRlZE51bWJlciIsInBvb2wiLCJpbm5lckhUTUwiLCJjc3NUZXh0Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZyIsImNvbG9yIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwicmVuZGVyZXJzIiwicmVzdWx0IiwiY3Bvb2wiLCJyb3VuZCIsIkV2ZW50RGlzcGF0Y2hlciIsIl9saXN0ZW5lcnMiLCJkaXNwYXRjaEV2ZW50IiwiaGFzRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBbGxFdmVudExpc3RlbmVycyIsImxpc3RlbmVyIiwic3BsaWNlIiwibGlzdGVuZXJzIiwiaGFuZGxlciIsIlBJIiwiSU5GSU5JVFkiLCJJbmZpbml0eSIsIk1hdGhVdGlsIiwiUEl4MiIsIlBJXzIiLCJQSV8xODAiLCJOMTgwX1BJIiwiaXNJbmZpbml0eSIsInJhbmRvbUFUb0IiLCJpc0ludCIsInJhbmRvbUZsb2F0aW5nIiwiY2VudGVyIiwiZiIsInJhbmRvbUNvbG9yIiwic2xpY2UiLCJyYW5kb21ab25lIiwiZGlzcGxheSIsImsiLCJkaWdpdHMiLCJwb3ciLCJkZWdyZWVUcmFuc2Zvcm0iLCJ0b0NvbG9yMTYiLCJJbnRlZ3JhdGlvbiIsImNhbGN1bGF0ZSIsInBhcnRpY2xlcyIsInRpbWUiLCJkYW1waW5nIiwiZXVsZXJJbnRlZ3JhdGUiLCJwYXJ0aWNsZSIsInNsZWVwIiwib2xkIiwiY29weSIsInYiLCJtdWx0aXBseVNjYWxhciIsIm1hc3MiLCJjbGVhciIsIlByb3RvbiIsImludGVncmF0aW9uVHlwZSIsIm5vdyIsInRoZW4iLCJlbGFwc2VkIiwic3RhdHMiLCJFVUxFUiIsImludGVncmF0b3IiLCJfZnBzIiwiX2ludGVydmFsIiwiREVGQVVMVF9JTlRFUlZBTCIsImFkZFJlbmRlcmVyIiwicmVuZGVyIiwiaW5pdCIsInJlbW92ZVJlbmRlcmVyIiwiaW5kZXgiLCJyZW1vdmUiLCJhZGRFbWl0dGVyIiwicGFyZW50IiwiRU1JVFRFUl9BRERFRCIsInJlbW92ZUVtaXR0ZXIiLCJFTUlUVEVSX1JFTU9WRUQiLCJQUk9UT05fVVBEQVRFIiwiVVNFX0NMT0NLIiwiRGF0ZSIsImdldFRpbWUiLCJhbWVuZENoYW5nZVRhYnNCdWciLCJlbWl0dGVyc1VwZGF0ZSIsIlBST1RPTl9VUERBVEVfQUZURVIiLCJnZXRBbGxQYXJ0aWNsZXMiLCJkZXN0cm95QWxsRW1pdHRlcnMiLCJkZXN0cm95T3RoZXIiLCJzZXRUaW1lb3V0IiwiZnBzIiwiTUVBU1VSRSIsIlJLMiIsIlBBUlRJQ0xFX0NSRUFURUQiLCJQQVJUSUNMRV9VUERBVEUiLCJQQVJUSUNMRV9TTEVFUCIsIlBBUlRJQ0xFX0RFQUQiLCJSZ2IiLCJyIiwiZyIsInJlc2V0IiwiaGFzUHJvcCIsInNldFByb3AiLCJwcm9wcyIsInByb3AiLCJTcGFuIiwiZ2V0U3BhblZhbHVlIiwic2V0VmVjdG9yVmFsIiwiY29uZiIsImVhc2VMaW5lYXIiLCJlYXNlSW5RdWFkIiwiZWFzZU91dFF1YWQiLCJlYXNlSW5PdXRRdWFkIiwiZWFzZUluQ3ViaWMiLCJlYXNlT3V0Q3ViaWMiLCJlYXNlSW5PdXRDdWJpYyIsImVhc2VJblF1YXJ0IiwiZWFzZU91dFF1YXJ0IiwiZWFzZUluT3V0UXVhcnQiLCJlYXNlSW5TaW5lIiwiZWFzZU91dFNpbmUiLCJlYXNlSW5PdXRTaW5lIiwiZWFzZUluRXhwbyIsImVhc2VPdXRFeHBvIiwiZWFzZUluT3V0RXhwbyIsImVhc2VJbkNpcmMiLCJzcXJ0IiwiZWFzZU91dENpcmMiLCJlYXNlSW5PdXRDaXJjIiwiZWFzZUluQmFjayIsImVhc2VPdXRCYWNrIiwiZWFzZUluT3V0QmFjayIsImdldEVhc2luZyIsImVhc2UiLCJWZWN0b3IyRCIsInNldCIsInNldFgiLCJzZXRZIiwiZ2V0R3JhZGllbnQiLCJhdGFuMiIsInciLCJhZGRWZWN0b3JzIiwiYWRkWFkiLCJzdWIiLCJzdWJWZWN0b3JzIiwiZGl2aWRlU2NhbGFyIiwibmVnYXRlIiwiZG90IiwibGVuZ3RoU3EiLCJub3JtYWxpemUiLCJkaXN0YW5jZVRvIiwiZGlzdGFuY2VUb1NxdWFyZWQiLCJ0aGEiLCJkeCIsImR5IiwibGVycCIsImFscGhhIiwiZXF1YWxzIiwiUGFydGljbGUiLCJkYXRhIiwicmdiIiwiUHJvcFV0aWwiLCJnZXREaXJlY3Rpb24iLCJsaWZlIiwiYWdlIiwiZGVhZCIsInNwcml0ZSIsImVuZXJneSIsInJhZGl1cyIsInJvdGF0aW9uIiwiZWFzaW5nIiwicmVtb3ZlQWxsQmVoYXZpb3VycyIsImFwcGx5QmVoYXZpb3VycyIsIm1heCIsImFwcGx5QmVoYXZpb3VyIiwiYWRkQmVoYXZpb3VyIiwiYmVoYXZpb3VyIiwicGFyZW50cyIsImluaXRpYWxpemUiLCJhZGRCZWhhdmlvdXJzIiwicmVtb3ZlQmVoYXZpb3VyIiwiaGV4VG9SZ2IiLCJoIiwiaGV4MTYiLCJzdWJzdHJpbmciLCJwYXJzZUludCIsInJnYlRvSGV4IiwicmJnIiwiZ2V0SGV4MTZGcm9tUGFydGljbGUiLCJOdW1iZXIiLCJQb2xhcjJEIiwiYWJzIiwic2V0UiIsInNldFRoYSIsInRvVmVjdG9yIiwiZ2V0WCIsImdldFkiLCJNYXQzIiwibWF0MyIsIm1hdCIsIkZsb2F0MzJBcnJheSIsIm1hdDEiLCJtYXQyIiwibXVsdGlwbHkiLCJpbnZlcnNlIiwiZCIsIm11bHRpcGx5VmVjMiIsIm0iLCJ2ZWMiLCJnZXRWYWx1ZSIsInNldFNwYW5WYWx1ZSIsInBhbiIsIkFycmF5U3BhbiIsIl9hcnIiLCJjcmVhdGVBcnJheVNwYW4iLCJSZWN0YW5nbGUiLCJib3R0b20iLCJyaWdodCIsImNvbnRhaW5zIiwiUmF0ZSIsIm51bXBhbiIsInRpbWVwYW4iLCJudW1QYW4iLCJ0aW1lUGFuIiwic3RhcnRUaW1lIiwibmV4dFRpbWUiLCJJbml0aWFsaXplIiwiTGlmZSIsImxpZmVQYW4iLCJab25lIiwidmVjdG9yIiwiY3Jvc3NUeXBlIiwiYWxlcnQiLCJnZXRQb3NpdGlvbiIsImNyb3NzaW5nIiwiUG9pbnRab25lIiwiY29uc29sZSIsImVycm9yIiwiUG9zaXRpb24iLCJ6b25lIiwiVmVsb2NpdHkiLCJycGFuIiwidGhhcGFuIiwiclBhbiIsInRoYVBhbiIsIm5vcm1hbGl6ZVZlbG9jaXR5IiwidnIiLCJwb2xhcjJkIiwiTWFzcyIsIm1hc3NQYW4iLCJSYWRpdXMiLCJvbGRSYWRpdXMiLCJCb2R5IiwiaW1hZ2VUYXJnZXQiLCJpbm5lciIsIkJlaGF2aW91ciIsIm5vcm1hbGl6ZUZvcmNlIiwiZm9yY2UiLCJub3JtYWxpemVWYWx1ZSIsIkZvcmNlIiwiZngiLCJmeSIsIkF0dHJhY3Rpb24iLCJ0YXJnZXRQb3NpdGlvbiIsInJhZGl1c1NxIiwiYXR0cmFjdGlvbkZvcmNlIiwiUmFuZG9tRHJpZnQiLCJkcmlmdFgiLCJkcmlmdFkiLCJkZWxheSIsInBhbkZvY2UiLCJHcmF2aXR5IiwiQ29sbGlzaW9uIiwiY29sbGlzaW9uUG9vbCIsImRlbHRhIiwibmV3UG9vbCIsIm90aGVyUGFydGljbGUiLCJvdmVybGFwIiwidG90YWxNYXNzIiwiYXZlcmFnZU1hc3MxIiwiYXZlcmFnZU1hc3MyIiwiZGlzdGFuY2UiLCJDcm9zc1pvbmUiLCJBbHBoYSIsInNhbWUiLCJhbHBoYUEiLCJhbHBoYUIiLCJTY2FsZSIsInNjYWxlQSIsInNjYWxlQiIsIlJvdGF0ZSIsImluZmx1ZW5jZSIsInJvdGF0aW9uQSIsInJvdGF0aW9uQiIsIkNvbG9yIiwiY29sb3JBIiwiQ29sb3JVdGlsIiwiY29sb3JCIiwiQ0hBTkdJTkciLCJDeWNsb25lIiwiYW5nbGUiLCJzZXRBbmdsZUFuZEZvcmNlIiwic3BhbiIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwiY2FuZ2xlIiwiY3ljbG9uZSIsImdyYWRpZW50IiwiUmVwdWxzaW9uIiwiR3Jhdml0eVdlbGwiLCJjZW50ZXJQb2ludCIsImRpc3RhbmNlVmVjIiwiZGlzdGFuY2VTcSIsImZhY3RvciIsImJpbmRFbWl0dGVyIiwiRW1pdHRlciIsImVtaXRUaW1lIiwidG90YWxUaW1lIiwicmF0ZSIsImVtaXQiLCJzdG9wZWQiLCJpc05hTiIsInN0b3AiLCJwcmVFbWl0Iiwib2xkU3RvcGVkIiwib2xkRW1pdFRpbWUiLCJvbGRUb3RhbFRpbWUiLCJzdGVwIiwicmVtb3ZlQWxsUGFydGljbGVzIiwiYWRkU2VsZkluaXRpYWxpemUiLCJpbml0QWxsIiwiYWRkSW5pdGlhbGl6ZSIsInJlc3QiLCJyZW1vdmVJbml0aWFsaXplIiwiaW5pdGlhbGl6ZXIiLCJyZW1vdmVBbGxJbml0aWFsaXplcnMiLCJhcmd1bWVudHMiLCJlbWl0dGluZyIsImludGVncmF0ZSIsImRpc3BhdGNoIiwiZXZlbnQiLCJiaW5kRXZlbnQiLCJjcmVhdGVQYXJ0aWNsZSIsInNldHVwUGFydGljbGUiLCJJbml0aWFsaXplVXRpbCIsIkJlaGF2aW91ckVtaXR0ZXIiLCJzZWxmQmVoYXZpb3VycyIsImFkZFNlbGZCZWhhdmlvdXIiLCJyZW1vdmVTZWxmQmVoYXZpb3VyIiwiRm9sbG93RW1pdHRlciIsIm1vdXNlVGFyZ2V0Iiwid2luZG93IiwiX2FsbG93RW1pdHRpbmciLCJpbml0RXZlbnRIYW5kbGVyIiwibW91c2Vtb3ZlSGFuZGxlciIsIm1vdXNlbW92ZSIsIm1vdXNlZG93bkhhbmRsZXIiLCJtb3VzZWRvd24iLCJtb3VzZXVwSGFuZGxlciIsIm1vdXNldXAiLCJsYXllclgiLCJsYXllclkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsIkJhc2VSZW5kZXJlciIsImVsZW1lbnQiLCJzdHJva2UiLCJjaXJjbGVDb25mIiwiaXNDaXJjbGUiLCJpbml0SGFuZGxlciIsInNldFN0cm9rZSIsInRoaW5rbmVzcyIsIl9wcm90b25VcGRhdGVIYW5kbGVyIiwib25Qcm90b25VcGRhdGUiLCJfcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyIiwib25Qcm90b25VcGRhdGVBZnRlciIsIl9lbWl0dGVyQWRkZWRIYW5kbGVyIiwib25FbWl0dGVyQWRkZWQiLCJfZW1pdHRlclJlbW92ZWRIYW5kbGVyIiwib25FbWl0dGVyUmVtb3ZlZCIsIl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyIiwib25QYXJ0aWNsZUNyZWF0ZWQiLCJfcGFydGljbGVVcGRhdGVIYW5kbGVyIiwib25QYXJ0aWNsZVVwZGF0ZSIsIl9wYXJ0aWNsZURlYWRIYW5kbGVyIiwib25QYXJ0aWNsZURlYWQiLCJDYW52YXNSZW5kZXJlciIsImJ1ZmZlckNhY2hlIiwiYWRkSW1nMkJvZHkiLCJkcmF3Q2lyY2xlIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYnVmQ29udGV4dCIsImdsb2JhbEFscGhhIiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzYXZlIiwidHJhbnNsYXRlIiwicmVzdG9yZSIsImJlZ2luUGF0aCIsImFyYyIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwiY2xvc2VQYXRoIiwiZmlsbCIsInNpemUiLCJEb21SZW5kZXJlciIsImNyZWF0ZUJvZHkiLCJib2R5UmVhZHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJyZW1vdmVDaGlsZCIsImNyZWF0ZUNpcmNsZSIsImNyZWF0ZVNwcml0ZSIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJ1cmwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJFYXNlbFJlbmRlcmVyIiwiYWRkQ2hpbGQiLCJzY2FsZVgiLCJzY2FsZVkiLCJncmFwaGljcyIsInJlZ1giLCJyZWdZIiwiY3JlYXRlanMiLCJHcmFwaGljcyIsImJlZ2luU3Ryb2tlIiwiYmVnaW5GaWxsIiwic2hhcGUiLCJTaGFwZSIsIlBpeGVsUmVuZGVyZXIiLCJyZWN0YW5nbGUiLCJpbWFnZURhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJwdXRJbWFnZURhdGEiLCJzZXRQaXhlbCIsImVsZW1lbnR3aWR0aCIsIlBJWElDbGFzcyIsIlBpeGlSZW5kZXJlciIsInNldENvbG9yIiwiYmxlbmRNb2RlIiwic2V0UElYSSIsIlBJWEkiLCJTcHJpdGUiLCJjcmVhdGVGcm9tSW1hZ2UiLCJmcm9tIiwiZnJvbUltYWdlIiwidGludCIsImFuY2hvciIsImVuZEZpbGwiLCJNU3RhY2siLCJtYXRzIiwidG9wIiwiV2ViR0xSZW5kZXJlciIsImdsIiwiYW50aWFsaWFzIiwic3RlbmNpbCIsImRlcHRoIiwiaW5pdFZhciIsInNldE1heFJhZGl1cyIsImluaXRTaGFkZXJzIiwiaW5pdEJ1ZmZlcnMiLCJibGVuZEVxdWF0aW9uIiwiRlVOQ19BREQiLCJibGVuZEZ1bmMiLCJTUkNfQUxQSEEiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiZW5hYmxlIiwiQkxFTkQiLCJ1bWF0Iiwic21hdCIsIm1zdGFjayIsInZpZXdwb3J0IiwiY2lyY2xlQ2FudmFzVVJMIiwiZ2V0VmVydGV4U2hhZGVyIiwidnNTb3VyY2UiLCJnZXRGcmFnbWVudFNoYWRlciIsImZzU291cmNlIiwidGV4dHVyZWJ1ZmZlcnMiLCJBIiwiQiIsImdldFNoYWRlciIsImZzIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJmcmFnbWVudFNoYWRlciIsInZlcnRleFNoYWRlciIsInNwcm9ncmFtIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwidXNlUHJvZ3JhbSIsInZwYSIsImdldEF0dHJpYkxvY2F0aW9uIiwidGNhIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ0TWF0VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInNhbXBsZXJVbmlmb3JtIiwidXNlVGV4IiwidW5pZm9ybTFpIiwidnMiLCJpZHgiLCJ1bml0SUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJVaW50MTZBcnJheSIsIlNUQVRJQ19EUkFXIiwiaWRzIiwidW5pdEkzMyIsInN0cmlwQnVmZmVyIiwicmFpZHVzIiwiY2lyY2xlQ2FudmFzUmFkaXVzIiwidG9EYXRhVVJMIiwiZHJhd0ltZzJDYW52YXMiLCJfdyIsIl9oIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiY3JlYXRlVGV4dHVyZSIsInRleHR1cmUiLCJ2Y0J1ZmZlciIsInRjQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4SW1hZ2UyRCIsIlJHQkEiLCJVTlNJR05FRF9CWVRFIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIkxJTkVBUiIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIiwidGV4dHVyZUxvYWRlZCIsInRleHR1cmVXaWR0aCIsInRleHR1cmVIZWlnaHQiLCJ0bWF0IiwiaW1hdCIsIm9sZFNjYWxlIiwidXBkYXRlTWF0cml4IiwidW5pZm9ybTNmIiwidW5pZm9ybU1hdHJpeDNmdiIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsImRyYXdFbGVtZW50cyIsIlRSSUFOR0xFUyIsIlVOU0lHTkVEX1NIT1JUIiwibW92ZU9yaWdpbk1hdHJpeCIsInRyYW5zbGF0aW9uTWF0cml4IiwiYW5nZWwiLCJyb3RhdGlvbk1hdHJpeCIsInNjYWxlTWF0cml4IiwibWF0cml4IiwiQ3VzdG9tUmVuZGVyZXIiLCJMaW5lWm9uZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiZGlyZWN0aW9uIiwibWlueCIsIm1pbiIsIm1pbnkiLCJtYXh4IiwibWF4eSIsInh4eXkiLCJnZXRMZW5ndGgiLCJDIiwiRCIsImdldERpc3RhbmNlIiwiZ2V0U3ltbWV0cmljIiwidGhhMiIsInRoYTEiLCJvbGR4Iiwib2xkeSIsInJhbmdlT3V0IiwiQ2lyY2xlWm9uZSIsInJhbmRvbVJhZGl1cyIsInNldENlbnRlciIsIlJlY3Rab25lIiwiSW1hZ2Vab25lIiwidmVjdG9ycyIsInNldFZlY3RvcnMiLCJqIiwibGVuZ3RoMSIsImxlbmd0aDIiLCJnZXRCb3VuZCIsImdldENvbG9yIiwiZnVuYyIsImdldFN0eWxlIiwiZHJhd1pvbmUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJkcmF3UmVjdCIsImRyYXdFbWl0dGVyIiwiVmVjdG9yIiwiUG9sYXIiLCJnZXRTcGFuIiwiSW5pdCIsIkwiLCJQIiwiViIsIk0iLCJSIiwiRiIsIlJEIiwiRyIsIlMiLCJXZWJHbFJlbmRlcmVyIiwiRGVidWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUEsRUFBQUEsSUFaYSxnQkFZUkMsTUFaUSxFQVlBO0VBQ1gsV0FBTyxDQUFDQSxNQUFNLEdBQUlBLE1BQU0sR0FBRyxDQUFwQixNQUE0QixDQUFuQztFQUNELEdBZFk7O0VBZ0JiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUMsRUFBQUEsS0EzQmEsaUJBMkJQRCxNQTNCTyxFQTJCQztFQUNaLE1BQUVBLE1BQUY7O0VBQ0EsU0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEtBQUssQ0FBOUIsRUFBaUM7RUFDL0JGLE1BQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFJQSxNQUFNLElBQUlFLENBQTdCO0VBQ0Q7O0VBRUQsV0FBT0YsTUFBTSxHQUFHLENBQWhCO0VBQ0QsR0FsQ1k7O0VBb0NiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VHLEVBQUFBLGVBakRhLDJCQWlER0MsRUFqREgsRUFpRE9DLEVBakRQLEVBaURXO0VBQ3RCLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFP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
