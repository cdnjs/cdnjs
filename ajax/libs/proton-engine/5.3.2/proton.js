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

    _proto.destroy = function destroy() {
      if (this.container && this.container.parentNode) {
        var body = this.body || document.body;
        body.removeChild(this.container);
      }

      this.proton = null;
      this.container = null;
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

      if (!isInt) return a + Math.random() * (b - a);else return (Math.random() * (b - a) >> 0) + a;
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

        _this.stats.destroy();

        Util.destroyAll(_this.emitters);
        Util.destroyAll(_this.renderers, _this.getAllParticles());
        _this.integrator = null;
        _this.renderers = null;
        _this.emitters = null;
        _this.stats = null;
        _this.pool = null;
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
        particle.rgb.r = particle.rgb.r << 0;
        particle.rgb.g = particle.rgb.g << 0;
        particle.rgb.b = particle.rgb.b << 0;
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
      this.rate = null;
      this.old = null;
      this.rgb = null;
      this.v = null;
      this.a = null;
      this.p = null;
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

  var Types = {
    /**
     * Determine whether it is a picture object
     *
     * @return {boolean} is or no
     */
    isImage: function isImage(obj) {
      if (!obj) return false;
      if (obj.__isImage) return true;
      var tagName = ("" + obj.tagName).toUpperCase();
      var nodeName = ("" + obj.nodeName).toUpperCase();

      if (nodeName === "IMG" || tagName === "IMG") {
        obj.__isImage = true;
        return true;
      }

      return false;
    },

    /**
     * Determine whether it is a string object
     *
     * @return {boolean} is or no
     */
    isString: function isString(obj) {
      return typeof obj === "string";
    }
  };

  var BaseRenderer = /*#__PURE__*/function () {
    function BaseRenderer(element, stroke) {
      this.pool = new Pool();
      this.element = element;
      this.stroke = stroke;
      this.circleConf = {
        isCircle: true
      };
      this.initEventHandler();
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

    _proto.initEventHandler = function initEventHandler() {
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
      this.stroke = null;
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
        if (Types.isImage(particle.body)) {
          this.drawImage(particle);
        }
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
    } // private drawImage method
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
      if (Types.isImage(image)) {
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
        if (Types.isString(this.stroke)) {
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
        var stroke = Types.isString(this.stroke) ? this.stroke : 0x000000;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy91dGlscy9Qcm9wVXRpbC5qcyIsIi4uL3NyYy9tYXRoL2Vhc2UuanMiLCIuLi9zcmMvbWF0aC9WZWN0b3IyRC5qcyIsIi4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIiwiLi4vc3JjL3V0aWxzL0NvbG9yVXRpbC5qcyIsIi4uL3NyYy9tYXRoL1BvbGFyMkQuanMiLCIuLi9zcmMvbWF0aC9NYXQzLmpzIiwiLi4vc3JjL21hdGgvU3Bhbi5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIGdldFJhbmRGcm9tQXJyYXkoYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihhcnIubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZW1wdHlPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbnkgb2JqZWN0XG4gICAqL1xuICBlbXB0eU9iamVjdChvYmosIGlnbm9yZSA9IG51bGwpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKGtleSkgPiAtMSkgY29udGludWU7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzIGFuZCBiaW5kcyB0aGUgZ2l2ZW4gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGNsYXNzQXBwbHlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQSBjbGFzcyB0byBtYWtlIGFuIGluc3RhbmNlIGZyb21cbiAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIEFueSBhcnJheSB0byBiaW5kIGl0IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBpbnN0YW5jZSBvZiBjb25zdHJ1Y3Rvciwgb3B0aW9uYWxseSBiaW5kIHdpdGggYXJnc1xuICAgKi9cbiAgY2xhc3NBcHBseShjb25zdHJ1Y3RvciwgYXJncyA9IG51bGwpIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgRmFjdG9yeUZ1bmMgPSBjb25zdHJ1Y3Rvci5iaW5kLmFwcGx5KGNvbnN0cnVjdG9yLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgRmFjdG9yeUZ1bmMoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIHJldHVybiBJbWdVdGlsLmdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCk7XG4gIH0sXG5cbiAgZGVzdHJveUFsbChhcnIsIHBhcmFtID0gbnVsbCkge1xuICAgIGxldCBpID0gYXJyLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycltpXS5kZXN0cm95KHBhcmFtKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGRlbGV0ZSBhcnJbaV07XG4gICAgfVxuXG4gICAgYXJyLmxlbmd0aCA9IDA7XG4gIH0sXG5cbiAgYXNzaWduKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBpZHNNYXAgPSB7fTtcblxuY29uc3QgUHVpZCA9IHtcbiAgX2luZGV4OiAwLFxuICBfY2FjaGU6IHt9LFxuXG4gIGlkKHR5cGUpIHtcbiAgICBpZiAoaWRzTWFwW3R5cGVdID09PSB1bmRlZmluZWQgfHwgaWRzTWFwW3R5cGVdID09PSBudWxsKSBpZHNNYXBbdHlwZV0gPSAwO1xuICAgIHJldHVybiBgJHt0eXBlfV8ke2lkc01hcFt0eXBlXSsrfWA7XG4gIH0sXG5cbiAgZ2V0SWQodGFyZ2V0KSB7XG4gICAgbGV0IHVpZCA9IHRoaXMuZ2V0SWRGcm9tQ2FjaGUodGFyZ2V0KTtcbiAgICBpZiAodWlkKSByZXR1cm4gdWlkO1xuXG4gICAgdWlkID0gYFBVSURfJHt0aGlzLl9pbmRleCsrfWA7XG4gICAgdGhpcy5fY2FjaGVbdWlkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdWlkO1xuICB9LFxuXG4gIGdldElkRnJvbUNhY2hlKHRhcmdldCkge1xuICAgIGxldCBvYmosIGlkO1xuXG4gICAgZm9yIChpZCBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgb2JqID0gdGhpcy5fY2FjaGVbaWRdO1xuXG4gICAgICBpZiAob2JqID09PSB0YXJnZXQpIHJldHVybiBpZDtcbiAgICAgIGlmICh0aGlzLmlzQm9keShvYmosIHRhcmdldCkgJiYgb2JqLnNyYyA9PT0gdGFyZ2V0LnNyYykgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGlzQm9keShvYmosIHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgb2JqLmlzSW5uZXIgJiYgdGFyZ2V0LmlzSW5uZXI7XG4gIH0sXG5cbiAgZ2V0VGFyZ2V0KHVpZCkge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZVt1aWRdO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWlkO1xuIiwiLyoqXG4gKiBQb29sIGlzIHRoZSBjYWNoZSBwb29sIG9mIHRoZSBwcm90b24gZW5naW5lLCBpdCBpcyB2ZXJ5IGltcG9ydGFudC5cbiAqXG4gKiBnZXQodGFyZ2V0LCBwYXJhbXMsIHVpZClcbiAqICBDbGFzc1xuICogICAgdWlkID0gUHVpZC5nZXRJZCAtPiBQdWlkIHNhdmUgdGFyZ2V0IGNhY2hlXG4gKiAgICB0YXJnZXQuX19wdWlkID0gdWlkXG4gKlxuICogIGJvZHlcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICpcbiAqXG4gKiBleHBpcmUodGFyZ2V0KVxuICogIGNhY2hlW3RhcmdldC5fX3B1aWRdIHB1c2ggdGFyZ2V0XG4gKlxuICovXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUG9vbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIG9mIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvdGFsXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjYWNoZVxuICAgKi9cbiAgY29uc3RydWN0b3IobnVtKSB7XG4gICAgdGhpcy50b3RhbCA9IDA7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpIHtcbiAgICBsZXQgcDtcbiAgICB1aWQgPSB1aWQgfHwgdGFyZ2V0Ll9fcHVpZCB8fCBQdWlkLmdldElkKHRhcmdldCk7XG5cbiAgICBpZiAodGhpcy5jYWNoZVt1aWRdICYmIHRoaXMuY2FjaGVbdWlkXS5sZW5ndGggPiAwKSB7XG4gICAgICBwID0gdGhpcy5jYWNoZVt1aWRdLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0gdGhpcy5jcmVhdGVPckNsb25lKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBwLl9fcHVpZCA9IHRhcmdldC5fX3B1aWQgfHwgdWlkO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZXhwaXJlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlKHRhcmdldC5fX3B1aWQpLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNsYXNzIGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb25cbiAgICpcbiAgICogQG1ldGhvZCBjcmVhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0IGFueSBPYmplY3Qgb3IgRnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcykge1xuICAgIHRoaXMudG90YWwrKztcblxuICAgIGlmICh0aGlzLmNyZWF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIFV0aWwuY2xhc3NBcHBseSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIC0gd2hhdCBpcyBpbiB0aGUgY2FjaGU/XG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGlkIGluIHRoaXMuY2FjaGUpIGNvdW50ICs9IHRoaXMuY2FjaGVbaWRdLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgYWxsIGl0ZW1zIGZyb20gUG9vbC5jYWNoZVxuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlW2lkXS5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbaWRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDYWNoZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB1aWQgdGhlIHVuaXF1ZSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXRDYWNoZSh1aWQgPSBcImRlZmF1bHRcIikge1xuICAgIGlmICghdGhpcy5jYWNoZVt1aWRdKSB0aGlzLmNhY2hlW3VpZF0gPSBbXTtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVt1aWRdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyB7XG4gIGNvbnN0cnVjdG9yKHByb3Rvbikge1xuICAgIHRoaXMucHJvdG9uID0gcHJvdG9uO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnR5cGUgPSAxO1xuXG4gICAgdGhpcy5lbWl0dGVySW5kZXggPSAwO1xuICAgIHRoaXMucmVuZGVyZXJJbmRleCA9IDA7XG4gIH1cblxuICB1cGRhdGUoc3R5bGUsIGJvZHkpIHtcbiAgICB0aGlzLmFkZChzdHlsZSwgYm9keSk7XG5cbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5nZXRFbWl0dGVyKCk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKCk7XG4gICAgbGV0IHN0ciA9IFwiXCI7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHIgKz0gXCJlbWl0dGVyOlwiICsgdGhpcy5wcm90b24uZW1pdHRlcnMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJlbSBzcGVlZDpcIiArIGVtaXR0ZXIuZW1pdFNwZWVkICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJwb3M6XCIgKyB0aGlzLmdldEVtaXR0ZXJQb3MoZW1pdHRlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJpbml0aWFsaXplczpcIiArIGVtaXR0ZXIuaW5pdGlhbGl6ZXMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKVxuICAgICAgICAgIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5pbml0aWFsaXplcykgKyBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJiZWhhdmlvdXJzOlwiICsgZW1pdHRlci5iZWhhdmlvdXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9ICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPicgKyB0aGlzLmNvbmNhdEFycihlbWl0dGVyLmJlaGF2aW91cnMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSByZW5kZXJlci5uYW1lICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChyZW5kZXJlcikgc3RyICs9IFwiYm9keTpcIiArIHRoaXMuZ2V0Q3JlYXRlZE51bWJlcihyZW5kZXJlcikgKyBcIjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN0ciArPSBcInBhcnRpY2xlczpcIiArIHRoaXMucHJvdG9uLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwicG9vbDpcIiArIHRoaXMucHJvdG9uLnBvb2wuZ2V0Q291bnQoKSArIFwiPGJyPlwiO1xuICAgICAgICBzdHIgKz0gXCJ0b3RhbDpcIiArIHRoaXMucHJvdG9uLnBvb2wudG90YWw7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gc3RyO1xuICB9XG5cbiAgYWRkKHN0eWxlLCBib2R5KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy50eXBlID0gMTtcblxuICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MHB4O2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtcIixcbiAgICAgICAgXCJvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwO3BhZGRpbmc6MTBweDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcIixcbiAgICAgICAgXCJ3aWR0aDoxMjBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDI7Y29sb3I6IzBmZjtcIlxuICAgICAgXS5qb2luKFwiXCIpO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHRoaXMudHlwZSsrO1xuICAgICAgICAgIGlmICh0aGlzLnR5cGUgPiA0KSB0aGlzLnR5cGUgPSAxO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcblxuICAgICAgbGV0IGJnLCBjb2xvcjtcbiAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGJnID0gXCIjMjAxXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiNmMDhcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgYmcgPSBcIiMwMjBcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmMFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYmcgPSBcIiMwMDJcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmZlwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBiZztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlW1wiY29sb3JcIl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGJvZHkgPSBib2R5IHx8IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW1pdHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm90b24uZW1pdHRlcnNbdGhpcy5lbWl0dGVySW5kZXhdO1xuICB9XG5cbiAgZ2V0UmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLnJlbmRlcmVyc1t0aGlzLnJlbmRlcmVySW5kZXhdO1xuICB9XG5cbiAgY29uY2F0QXJyKGFycikge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGlmICghYXJyIHx8ICFhcnIubGVuZ3RoKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSAoYXJyW2ldLm5hbWUgfHwgXCJcIikuc3Vic3RyKDAsIDEpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpIHtcbiAgICByZXR1cm4gcmVuZGVyZXIucG9vbC50b3RhbCB8fCAocmVuZGVyZXIuY3Bvb2wgJiYgcmVuZGVyZXIuY3Bvb2wudG90YWwpIHx8IDA7XG4gIH1cblxuICBnZXRFbWl0dGVyUG9zKGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChlLnAueCkgKyBcIixcIiArIE1hdGgucm91bmQoZS5wLnkpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSkge1xuICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgdGhpcy5wcm90b24gPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgfVxufVxuIiwiLypcbiAqIEV2ZW50RGlzcGF0Y2hlclxuICogVGhpcyBjb2RlIHJlZmVyZW5jZSBzaW5jZSBodHRwOi8vY3JlYXRlanMuY29tLy5cbiAqXG4gKiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgYmluZCh0YXJnZXQpIHtcbiAgICB0YXJnZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVBbGxFdmVudExpc3RlbmVycyA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnM7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgcmV0dXJuO1xuXG4gICAgY29uc3QgYXJyID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgIGNvbnN0IGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsbG93cyBmb3IgZmFzdGVyIGNoZWNrcy5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKHR5cGUpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgZWxzZSBpZiAodGhpcy5fbGlzdGVuZXJzKSBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudCh0eXBlLCBhcmdzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcblxuICAgIGlmICh0eXBlICYmIGxpc3RlbmVycykge1xuICAgICAgbGV0IGFyciA9IGxpc3RlbmVyc1t0eXBlXTtcbiAgICAgIGlmICghYXJyKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAvLyBhcnIgPSBhcnIuc2xpY2UoKTtcbiAgICAgIC8vIHRvIGF2b2lkIGlzc3VlcyB3aXRoIGl0ZW1zIGJlaW5nIHJlbW92ZWQgb3IgYWRkZWQgZHVyaW5nIHRoZSBkaXNwYXRjaFxuXG4gICAgICBsZXQgaGFuZGxlcjtcbiAgICAgIGxldCBpID0gYXJyLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaGFuZGxlciA9IGFycltpXTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IGhhbmRsZXIoYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICEhcmVzdWx0O1xuICB9XG5cbiAgaGFzRXZlbnRMaXN0ZW5lcih0eXBlKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuICAgIHJldHVybiAhIShsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzW3R5cGVdKTtcbiAgfVxufVxuIiwiY29uc3QgUEkgPSAzLjE0MTU5MjY7XG5jb25zdCBJTkZJTklUWSA9IEluZmluaXR5O1xuXG5jb25zdCBNYXRoVXRpbCA9IHtcbiAgUEk6IFBJLFxuICBQSXgyOiBQSSAqIDIsXG4gIFBJXzI6IFBJIC8gMixcbiAgUElfMTgwOiBQSSAvIDE4MCxcbiAgTjE4MF9QSTogMTgwIC8gUEksXG4gIEluZmluaXR5OiAtOTk5LFxuXG4gIGlzSW5maW5pdHkobnVtKSB7XG4gICAgcmV0dXJuIG51bSA9PT0gdGhpcy5JbmZpbml0eSB8fCBudW0gPT09IElORklOSVRZO1xuICB9LFxuXG4gIHJhbmRvbUFUb0IoYSwgYiwgaXNJbnQgPSBmYWxzZSkge1xuICAgIGlmICghaXNJbnQpIHJldHVybiBhICsgTWF0aC5yYW5kb20oKSAqIChiIC0gYSk7XG4gICAgZWxzZSByZXR1cm4gKChNYXRoLnJhbmRvbSgpICogKGIgLSBhKSkgPj4gMCkgKyBhO1xuICB9LFxuXG4gIHJhbmRvbUZsb2F0aW5nKGNlbnRlciwgZiwgaXNJbnQpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5kb21BVG9CKGNlbnRlciAtIGYsIGNlbnRlciArIGYsIGlzSW50KTtcbiAgfSxcblxuICByYW5kb21Db2xvcigpIHtcbiAgICByZXR1cm4gXCIjXCIgKyAoXCIwMDAwMFwiICsgKChNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwKSA8PCAwKS50b1N0cmluZygxNikpLnNsaWNlKC02KTtcbiAgfSxcblxuICByYW5kb21ab25lKGRpc3BsYXkpIHt9LFxuXG4gIGZsb29yKG51bSwgayA9IDQpIHtcbiAgICBjb25zdCBkaWdpdHMgPSBNYXRoLnBvdygxMCwgayk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogZGlnaXRzKSAvIGRpZ2l0cztcbiAgfSxcblxuICBkZWdyZWVUcmFuc2Zvcm0oYSkge1xuICAgIHJldHVybiAoYSAqIFBJKSAvIDE4MDtcbiAgfSxcblxuICB0b0NvbG9yMTYobnVtKSB7XG4gICAgcmV0dXJuIGAjJHtudW0udG9TdHJpbmcoMTYpfWA7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGhVdGlsO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdyYXRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICB0aGlzLmV1bGVySW50ZWdyYXRlKHBhcnRpY2xlcywgdGltZSwgZGFtcGluZyk7XG4gIH1cblxuICAvLyBFdWxlciBJbnRlZ3JhdGVcbiAgLy8gaHR0cHM6Ly9yb3NldHRhY29kZS5vcmcvd2lraS9FdWxlcl9tZXRob2RcbiAgZXVsZXJJbnRlZ3JhdGUocGFydGljbGUsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICBpZiAoIXBhcnRpY2xlLnNsZWVwKSB7XG4gICAgICBwYXJ0aWNsZS5vbGQucC5jb3B5KHBhcnRpY2xlLnApO1xuICAgICAgcGFydGljbGUub2xkLnYuY29weShwYXJ0aWNsZS52KTtcblxuICAgICAgcGFydGljbGUuYS5tdWx0aXBseVNjYWxhcigxIC8gcGFydGljbGUubWFzcyk7XG4gICAgICBwYXJ0aWNsZS52LmFkZChwYXJ0aWNsZS5hLm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcbiAgICAgIHBhcnRpY2xlLnAuYWRkKHBhcnRpY2xlLm9sZC52Lm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcblxuICAgICAgaWYgKGRhbXBpbmcpIHBhcnRpY2xlLnYubXVsdGlwbHlTY2FsYXIoZGFtcGluZyk7XG5cbiAgICAgIHBhcnRpY2xlLmEuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb29sIGZyb20gXCIuL1Bvb2xcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3RhdHMgZnJvbSBcIi4uL2RlYnVnL1N0YXRzXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBJbnRlZ3JhdGlvbiBmcm9tIFwiLi4vbWF0aC9JbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm90b24ge1xuICBzdGF0aWMgVVNFX0NMT0NLID0gZmFsc2U7XG5cbiAgLy8gbWVhc3VyZSAxOjEwMFxuICBzdGF0aWMgTUVBU1VSRSA9IDEwMDtcbiAgc3RhdGljIEVVTEVSID0gXCJldWxlclwiO1xuICBzdGF0aWMgUksyID0gXCJydW5nZS1rdXR0YTJcIjtcblxuICAvLyBldmVudCBuYW1lXG4gIHN0YXRpYyBQQVJUSUNMRV9DUkVBVEVEID0gXCJQQVJUSUNMRV9DUkVBVEVEXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9VUERBVEUgPSBcIlBBUlRJQ0xFX1VQREFURVwiO1xuICBzdGF0aWMgUEFSVElDTEVfU0xFRVAgPSBcIlBBUlRJQ0xFX1NMRUVQXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9ERUFEID0gXCJQQVJUSUNMRV9ERUFEXCI7XG5cbiAgc3RhdGljIEVNSVRURVJfQURERUQgPSBcIkVNSVRURVJfQURERURcIjtcbiAgc3RhdGljIEVNSVRURVJfUkVNT1ZFRCA9IFwiRU1JVFRFUl9SRU1PVkVEXCI7XG5cbiAgc3RhdGljIFBST1RPTl9VUERBVEUgPSBcIlBST1RPTl9VUERBVEVcIjtcbiAgc3RhdGljIFBST1RPTl9VUERBVEVfQUZURVIgPSBcIlBST1RPTl9VUERBVEVfQUZURVJcIjtcbiAgc3RhdGljIERFRkFVTFRfSU5URVJWQUwgPSAwLjAxNjc7XG5cbiAgc3RhdGljIGFtZW5kQ2hhbmdlVGFic0J1ZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciB0byBhZGQgZW1pdHRlcnNcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yIFByb3RvblxuICAgKlxuICAgKiBAdG9kbyBwcm9QYXJ0aWNsZUNvdW50IGlzIG5vdCBpbiB1c2VcbiAgICogQHRvZG8gYWRkIG1vcmUgZG9jdW1lbnRhdGlvbiBvZiB0aGUgc2luZ2xlIHByb3BlcnRpZXMgYW5kIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwcm9QYXJ0aWNsZUNvdW50XSBub3QgaW4gdXNlP1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbaW50ZWdyYXRpb25UeXBlPVByb3Rvbi5FVUxFUl1cbiAgICogQHByb3BlcnR5IHtBcnJheX0gZW1pdHRlcnMgICBBbGwgYWRkZWQgZW1pdHRlclxuICAgKiBAcHJvcGVydHkge0FycmF5fSByZW5kZXJlcnMgIEFsbCBhZGRlZCByZW5kZXJlclxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSAgICAgIFRoZSBhY3RpdmUgdGltZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gb2xkdGltZSAgIFRoZSBvbGQgdGltZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW50ZWdyYXRpb25UeXBlKSB7XG4gICAgdGhpcy5lbWl0dGVycyA9IFtdO1xuICAgIHRoaXMucmVuZGVyZXJzID0gW107XG5cbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMubm93ID0gMDtcbiAgICB0aGlzLnRoZW4gPSAwO1xuICAgIHRoaXMuZWxhcHNlZCA9IDA7XG5cbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKHRoaXMpO1xuICAgIHRoaXMucG9vbCA9IG5ldyBQb29sKDgwKTtcblxuICAgIHRoaXMuaW50ZWdyYXRpb25UeXBlID0gVXRpbC5pbml0VmFsdWUoaW50ZWdyYXRpb25UeXBlLCBQcm90b24uRVVMRVIpO1xuICAgIHRoaXMuaW50ZWdyYXRvciA9IG5ldyBJbnRlZ3JhdGlvbih0aGlzLmludGVncmF0aW9uVHlwZSk7XG5cbiAgICB0aGlzLl9mcHMgPSBcImF1dG9cIjtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMO1xuICB9XG5cbiAgc2V0IGZwcyhmcHMpIHtcbiAgICB0aGlzLl9mcHMgPSBmcHM7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBmcHMgPT09IFwiYXV0b1wiID8gUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwgOiBNYXRoVXRpbC5mbG9vcigxIC8gZnBzLCA3KTtcbiAgfVxuXG4gIGdldCBmcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICBhZGRSZW5kZXJlcihyZW5kZXIpIHtcbiAgICByZW5kZXIuaW5pdCh0aGlzKTtcbiAgICB0aGlzLnJlbmRlcmVycy5wdXNoKHJlbmRlcik7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgcmVtb3ZlUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJlbmRlcmVycy5pbmRleE9mKHJlbmRlcik7XG4gICAgdGhpcy5yZW5kZXJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZW5kZXIucmVtb3ZlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZEVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICBhZGRFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICB0aGlzLmVtaXR0ZXJzLnB1c2goZW1pdHRlcik7XG4gICAgZW1pdHRlci5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX0FEREVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCByZW1vdmVFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIHJlbW92ZUVtaXR0ZXIoZW1pdHRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpO1xuICAgIHRoaXMuZW1pdHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfUkVNT1ZFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgYWRkZWQgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICAvLyAnYXV0bycgaXMgdGhlIGRlZmF1bHQgYnJvd3NlciByZWZyZXNoIHJhdGUsIHRoZSB2YXN0IG1ham9yaXR5IGlzIDYwZnBzXG4gICAgaWYgKHRoaXMuX2ZwcyA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG5cbiAgICAgIGlmIChQcm90b24uVVNFX0NMT0NLKSB7XG4gICAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuICAgICAgICAvLyBGaXggYnVncyBzdWNoIGFzIGNocm9tZSBicm93c2VyIHN3aXRjaGluZyB0YWJzIGNhdXNpbmcgZXhjZXNzaXZlIHRpbWUgZGlmZmVyZW5jZVxuICAgICAgICB0aGlzLmFtZW5kQ2hhbmdlVGFic0J1ZygpO1xuXG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwKSB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuZWxhcHNlZCk7XG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZShQcm90b24uREVGQVVMVF9JTlRFUlZBTCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZwcyBmcmFtZSByYXRlIGlzIHNldFxuICAgIGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcblxuICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTc2NDAxOC9jb250cm9sbGluZy1mcHMtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWVcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3cgLSAodGhpcy5lbGFwc2VkICUgdGhpcy5faW50ZXJ2YWwpICogMTAwMDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbWl0dGVyc1VwZGF0ZShlbGFwc2VkKSB7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLmVtaXR0ZXJzW2ldLnVwZGF0ZShlbGFwc2VkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBhbWVuZENoYW5nZVRhYnNCdWdcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGFtZW5kQ2hhbmdlVGFic0J1ZygpIHtcbiAgICBpZiAoIVByb3Rvbi5hbWVuZENoYW5nZVRhYnNCdWcpIHJldHVybjtcbiAgICBpZiAodGhpcy5lbGFwc2VkID4gMC41KSB7XG4gICAgICB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvdW50cyBhbGwgcGFydGljbGVzIGZyb20gYWxsIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGdldENvdW50KCkge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHRvdGFsICs9IHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzLmxlbmd0aDtcbiAgICByZXR1cm4gdG90YWw7XG4gIH1cblxuICBnZXRBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IHBhcnRpY2xlcyA9IFtdO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSBwYXJ0aWNsZXMgPSBwYXJ0aWNsZXMuY29uY2F0KHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzKTtcbiAgICByZXR1cm4gcGFydGljbGVzO1xuICB9XG5cbiAgZGVzdHJveUFsbEVtaXR0ZXJzKCkge1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhpcyBQcm90b24gaW5zdGFuY2UuIFRoaXMgaW5jbHVkZXMgYWxsIGVtaXR0ZXJzLCBhbmQgYWxsIHByb3BlcnRpZXNcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBkZXN0cm95KHJlbW92ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGVzdHJveU90aGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgIHRoaXMudGhlbiA9IDA7XG4gICAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgICAgdGhpcy5zdGF0cy5kZXN0cm95KCk7XG5cbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnJlbmRlcmVycywgdGhpcy5nZXRBbGxQYXJ0aWNsZXMoKSk7XG5cbiAgICAgIHRoaXMuaW50ZWdyYXRvciA9IG51bGw7XG4gICAgICB0aGlzLnJlbmRlcmVycyA9IG51bGw7XG4gICAgICB0aGlzLmVtaXR0ZXJzID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhdHMgPSBudWxsO1xuICAgICAgdGhpcy5wb29sID0gbnVsbDtcbiAgICB9O1xuXG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAgc2V0VGltZW91dChkZXN0cm95T3RoZXIsIDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3lPdGhlcigpO1xuICAgIH1cbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChQcm90b24pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmdiIHtcbiAgY29uc3RydWN0b3IociA9IDI1NSwgZyA9IDI1NSwgYiA9IDI1NSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy5nID0gZztcbiAgICB0aGlzLmIgPSBiO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5yID0gMjU1O1xuICAgIHRoaXMuZyA9IDI1NTtcbiAgICB0aGlzLmIgPSAyNTU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgaGFzUHJvcCh0YXJnZXQsIGtleSkge1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHByb3RvdHlwZSBpbiBhIGdpdmVuIHByb3RvdHlwZU9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0UHJvcFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIHRyYW5zbGF0ZSBkZXNyaXB0aW9uIGZyb20gY2hpbmVzZSB0byBlbmdsaXNoXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZU9iamVjdCBBbiBvYmplY3Qgb2Ygc2luZ2xlIHByb3RvdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSB0YXJnZXRcbiAgICovXG4gIHNldFByb3AodGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gU3Bhbi5nZXRTcGFuVmFsdWUocHJvcHNbcHJvcF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRWZWN0b3JWYWxcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGBjb25mYFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZcbiAgICovXG4gIHNldFZlY3RvclZhbChwYXJ0aWNsZSwgY29uZiA9IG51bGwpIHtcbiAgICBpZiAoIWNvbmYpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ4XCIpKSBwYXJ0aWNsZS5wLnggPSBjb25mW1wieFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieVwiKSkgcGFydGljbGUucC55ID0gY29uZltcInlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnhcIikpIHBhcnRpY2xlLnYueCA9IGNvbmZbXCJ2eFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnlcIikpIHBhcnRpY2xlLnYueSA9IGNvbmZbXCJ2eVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheFwiKSkgcGFydGljbGUuYS54ID0gY29uZltcImF4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheVwiKSkgcGFydGljbGUuYS55ID0gY29uZltcImF5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBcIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicFwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widlwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYVwiXSk7XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicG9zaXRpb25cIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicG9zaXRpb25cIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2ZWxvY2l0eVwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2ZWxvY2l0eVwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFjY2VsZXJhdGVcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYWNjZWxlcmF0ZVwiXSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBlYXNlTGluZWFyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGVhc2VJblF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDIpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCAyKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YWQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDIpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5DdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG4gIH0sXG5cbiAgZWFzZU91dEN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlIC0gMSwgMykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEN1YmljKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAzKTtcblxuICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3codmFsdWUgLSAyLCAzKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJblF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCA0KTtcbiAgfSxcblxuICBlYXNlT3V0UXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDQpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhcnQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDQpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogTWF0aC5wb3codmFsdWUsIDMpIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluU2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtTWF0aC5jb3ModmFsdWUgKiBNYXRoVXRpbC5QSV8yKSArIDE7XG4gIH0sXG5cbiAgZWFzZU91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zaW4odmFsdWUgKiBNYXRoVXRpbC5QSV8yKTtcbiAgfSxcblxuICBlYXNlSW5PdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbkV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG4gIH0sXG5cbiAgZWFzZU91dEV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHZhbHVlKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0RXhwbyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIDA7XG5cbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiAxO1xuXG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuXG4gICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS12YWx1ZSkgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5DaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VPdXRDaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgxIC0gTWF0aC5wb3codmFsdWUgLSAxLCAyKSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q2lyYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHZhbHVlIC09IDIpICogdmFsdWUpICsgMSk7XG4gIH0sXG5cbiAgZWFzZUluQmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gdmFsdWUgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgLSBzKTtcbiAgfSxcblxuICBlYXNlT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gKHZhbHVlID0gdmFsdWUgLSAxKSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSArIHMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiAodmFsdWUgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSAtIHMpKTtcbiAgICByZXR1cm4gMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlICsgcykgKyAyKTtcbiAgfSxcblxuICBnZXRFYXNpbmcoZWFzZSkge1xuICAgIGlmICh0eXBlb2YgZWFzZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZWFzZTtcbiAgICBlbHNlIHJldHVybiB0aGlzW2Vhc2VdIHx8IHRoaXMuZWFzZUxpbmVhcjtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyRCB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgdGhpcy55ID0geSB8fCAwO1xuICB9XG5cbiAgc2V0KHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRYKHgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0WSh5KSB7XG4gICAgdGhpcy55ID0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIGlmICh0aGlzLnggIT09IDApIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgICBlbHNlIGlmICh0aGlzLnkgPiAwKSByZXR1cm4gTWF0aFV0aWwuUElfMjtcbiAgICBlbHNlIGlmICh0aGlzLnkgPCAwKSByZXR1cm4gLU1hdGhVdGlsLlBJXzI7XG4gIH1cblxuICBjb3B5KHYpIHtcbiAgICB0aGlzLnggPSB2Lng7XG4gICAgdGhpcy55ID0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGQodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRYWShhLCBiKSB7XG4gICAgdGhpcy54ICs9IGE7XG4gICAgdGhpcy55ICs9IGI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCArIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgKyBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1Yih2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1YlZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCAtIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgLSBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpdmlkZVNjYWxhcihzKSB7XG4gICAgaWYgKHMgIT09IDApIHtcbiAgICAgIHRoaXMueCAvPSBzO1xuICAgICAgdGhpcy55IC89IHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KDAsIDApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbXVsdGlwbHlTY2FsYXIocykge1xuICAgIHRoaXMueCAqPSBzO1xuICAgIHRoaXMueSAqPSBzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoLTEpO1xuICB9XG5cbiAgZG90KHYpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55O1xuICB9XG5cbiAgbGVuZ3RoU3EoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKHRoaXMubGVuZ3RoKCkpO1xuICB9XG5cbiAgZGlzdGFuY2VUbyh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKHYpKTtcbiAgfVxuXG4gIHJvdGF0ZSh0aGEpIHtcbiAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnk7XG5cbiAgICB0aGlzLnggPSB4ICogTWF0aC5jb3ModGhhKSArIHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHRoaXMueSA9IC14ICogTWF0aC5zaW4odGhhKSArIHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXN0YW5jZVRvU3F1YXJlZCh2KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSB2Lng7XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSB2Lnk7XG5cbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gIH1cblxuICBsZXJwKHYsIGFscGhhKSB7XG4gICAgdGhpcy54ICs9ICh2LnggLSB0aGlzLngpICogYWxwaGE7XG4gICAgdGhpcy55ICs9ICh2LnkgLSB0aGlzLnkpICogYWxwaGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYueCA9PT0gdGhpcy54ICYmIHYueSA9PT0gdGhpcy55O1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy54ID0gMC4wO1xuICAgIHRoaXMueSA9IDAuMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xuICB9XG59XG4iLCIvKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vYmVoYXZpb3VyL0JlaGF2aW91cicpfSBCZWhhdmlvdXIgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuLi9tYXRoL1ZlY3RvcjJEJyl9IFZlY3RvcjJEICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vdXRpbHMvUmdiJyl9IFJnYiAqL1xuaW1wb3J0IFJnYiBmcm9tIFwiLi4vdXRpbHMvUmdiXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlIHtcbiAgLyoqIEB0eXBlIHN0cmluZyAqL1xuICBpZCA9IFwiXCI7XG5cbiAgLyoqIEB0eXBlIHt7cDpWZWN0b3IyRCx2OlZlY3RvcjJELGE6VmVjdG9yMkR9fSAqL1xuICBvbGQgPSB7fTtcblxuICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgZGF0YSA9IHt9O1xuXG4gIC8qKiBAdHlwZSB7QmVoYXZpb3VyW119ICovXG4gIGJlaGF2aW91cnMgPSBbXTtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICBwID0gW107XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgdiA9IFtdO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIGEgPSBbXTtcblxuICAvKiogQHR5cGUge1JnYn0gKi9cbiAgcmdiID0ge307XG5cbiAgLyoqXG4gICAqIHRoZSBQYXJ0aWNsZSBjbGFzc1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLlBhcnRpY2xlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gcE9iaiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtsaWZlOjMsZGVhZDpmYWxzZX1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgcGFydGljbGUncyBpZDtcbiAgICAgKiBAcHJvcGVydHkgaWRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiUGFydGljbGVcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICAgIHRoaXMub2xkID0ge307XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG5cbiAgICB0aGlzLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmEgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLmEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIHRoaXMucmdiID0gbmV3IFJnYigpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBjb25mICYmIFByb3BVdGlsLnNldFByb3AodGhpcywgY29uZik7XG4gIH1cblxuICBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52LngsIC10aGlzLnYueSkgKiBNYXRoVXRpbC5OMTgwX1BJO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5saWZlID0gSW5maW5pdHk7XG4gICAgdGhpcy5hZ2UgPSAwO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5zbGVlcCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keSA9IG51bGw7XG4gICAgdGhpcy5zcHJpdGUgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZW5lcmd5ID0gMTsgLy8gRW5lcmd5IExvc3NcbiAgICB0aGlzLm1hc3MgPSAxO1xuICAgIHRoaXMucmFkaXVzID0gMTA7XG4gICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgdGhpcy5jb2xvciA9IG51bGw7XG5cbiAgICB0aGlzLnAuc2V0KDAsIDApO1xuICAgIHRoaXMudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5hLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5wLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC52LnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5hLnNldCgwLCAwKTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZWFzZUxpbmVhcjtcblxuICAgIHRoaXMucmdiLnJlc2V0KCk7XG4gICAgVXRpbC5lbXB0eU9iamVjdCh0aGlzLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGUodGltZSwgaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcbiAgICAgIHRoaXMuYWdlICs9IHRpbWU7XG4gICAgICB0aGlzLmFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWdlIDwgdGhpcy5saWZlKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHRoaXMuYWdlIC8gdGhpcy5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlCZWhhdmlvdXJzKHRpbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5iZWhhdmlvdXJzW2ldICYmIHRoaXMuYmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXJcbiAgICovXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGJlaGF2aW91ci5oYXNPd25Qcm9wZXJ0eShcInBhcmVudHNcIikpIGJlaGF2aW91ci5wYXJlbnRzLnB1c2godGhpcyk7XG4gICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJbXX0gYmVoYXZpb3Vyc1xuICAgKi9cbiAgYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWRkQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgcGFydGljbGVcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHR5cGVkZWYgIHtPYmplY3R9IHJnYk9iamVjdFxuICAgKiBAcHJvcGVydHkge051bWJlcn0gciByZWQgdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGcgZ3JlZW4gdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGIgYmx1ZSB2YWx1ZVxuICAgKi9cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgaGV4IHZhbHVlIHRvIGEgcmdiIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgaGV4VG9SZ2JcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGggYW55IGhleCB2YWx1ZSwgZS5nLiAjMDAwMDAwIG9yIDAwMDAwMCBmb3IgYmxhY2tcbiAgICpcbiAgICogQHJldHVybiB7cmdiT2JqZWN0fVxuICAgKi9cbiAgaGV4VG9SZ2IoaCkge1xuICAgIGNvbnN0IGhleDE2ID0gaC5jaGFyQXQoMCkgPT09IFwiI1wiID8gaC5zdWJzdHJpbmcoMSwgNykgOiBoO1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuXG4gICAgcmV0dXJuIHsgciwgZywgYiB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIHJnYiB2YWx1ZSB0byBhIHJnYiBzdHJpbmdcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHJnYlRvSGV4XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgUHJvdG9uLmhleFRvUmdifSByZ2IgYSByZ2Igb2JqZWN0IGxpa2UgaW4ge0BsaW5rIFByb3RvbiNQcm90b24ufVxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHJnYigpXG4gICAqL1xuICByZ2JUb0hleChyYmcpIHtcbiAgICByZXR1cm4gYHJnYigke3JiZy5yfSwgJHtyYmcuZ30sICR7cmJnLmJ9KWA7XG4gIH0sXG5cbiAgZ2V0SGV4MTZGcm9tUGFydGljbGUocCkge1xuICAgIHJldHVybiBOdW1iZXIocC5yZ2IucikgKiA2NTUzNiArIE51bWJlcihwLnJnYi5nKSAqIDI1NiArIE51bWJlcihwLnJnYi5iKTtcbiAgfVxufTtcbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2xhcjJEIHtcbiAgY29uc3RydWN0b3IociwgdGhhKSB7XG4gICAgdGhpcy5yID0gTWF0aC5hYnMocikgfHwgMDtcbiAgICB0aGlzLnRoYSA9IHRoYSB8fCAwO1xuICB9XG5cbiAgc2V0KHIsIHRoYSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRSKHIpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VGhhKHRoYSkge1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29weShwKSB7XG4gICAgdGhpcy5yID0gcC5yO1xuICAgIHRoaXMudGhhID0gcC50aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1ZlY3RvcigpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMuZ2V0WCgpLCB0aGlzLmdldFkoKSk7XG4gIH1cblxuICBnZXRYKCkge1xuICAgIHJldHVybiB0aGlzLnIgKiBNYXRoLnNpbih0aGlzLnRoYSk7XG4gIH1cblxuICBnZXRZKCkge1xuICAgIHJldHVybiAtdGhpcy5yICogTWF0aC5jb3ModGhpcy50aGEpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuciA9IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnIgPT09IHRoaXMuciAmJiB2LnRoYSA9PT0gdGhpcy50aGE7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnIgPSAwLjA7XG4gICAgdGhpcy50aGEgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFBvbGFyMkQodGhpcy5yLCB0aGlzLnRoYSk7XG4gIH1cbn1cbiIsImNvbnN0IE1hdDMgPSB7XG4gIGNyZWF0ZShtYXQzKSB7XG4gICAgY29uc3QgbWF0ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcbiAgICBpZiAobWF0MykgdGhpcy5zZXQobWF0MywgbWF0KTtcblxuICAgIHJldHVybiBtYXQ7XG4gIH0sXG5cbiAgc2V0KG1hdDEsIG1hdDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykgbWF0MltpXSA9IG1hdDFbaV07XG5cbiAgICByZXR1cm4gbWF0MjtcbiAgfSxcblxuICBtdWx0aXBseShtYXQsIG1hdDIsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTAyID0gbWF0WzJdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAwID0gbWF0MlswXSxcbiAgICAgIGIwMSA9IG1hdDJbMV0sXG4gICAgICBiMDIgPSBtYXQyWzJdLFxuICAgICAgYjEwID0gbWF0MlszXSxcbiAgICAgIGIxMSA9IG1hdDJbNF0sXG4gICAgICBiMjAgPSBtYXQyWzZdLFxuICAgICAgYjIxID0gbWF0Mls3XTtcblxuICAgIG1hdDNbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTA7XG4gICAgbWF0M1sxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMTtcbiAgICBtYXQzWzJdID0gYTAyICogYjAyO1xuICAgIG1hdDNbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTA7XG4gICAgbWF0M1s0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMTtcbiAgICBtYXQzWzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYTIwO1xuICAgIG1hdDNbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBhMjE7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBpbnZlcnNlKG1hdCwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDEgPSBhMTEsXG4gICAgICBiMTEgPSAtYTEwLFxuICAgICAgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwLFxuICAgICAgZCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSxcbiAgICAgIGlkO1xuXG4gICAgaWQgPSAxIC8gZDtcbiAgICBtYXQzWzBdID0gYjAxICogaWQ7XG4gICAgbWF0M1sxXSA9IC1hMDEgKiBpZDtcbiAgICBtYXQzWzNdID0gYjExICogaWQ7XG4gICAgbWF0M1s0XSA9IGEwMCAqIGlkO1xuICAgIG1hdDNbNl0gPSBiMjEgKiBpZDtcbiAgICBtYXQzWzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogaWQ7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBtdWx0aXBseVZlYzIobSwgdmVjLCBtYXQzKSB7XG4gICAgbGV0IHggPSB2ZWNbMF0sXG4gICAgICB5ID0gdmVjWzFdO1xuXG4gICAgbWF0M1swXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyBtWzZdO1xuICAgIG1hdDNbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgbVs3XTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXQzO1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgY2VudGVyKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5pc0FycmF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYSA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuICAgICAgdGhpcy5hID0gVXRpbC5pbml0VmFsdWUoYSwgMSk7XG4gICAgICB0aGlzLmIgPSBVdGlsLmluaXRWYWx1ZShiLCB0aGlzLmEpO1xuICAgICAgdGhpcy5jZW50ZXIgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNBcnJheSkge1xuICAgICAgcmV0dXJuIFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY2VudGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21BVG9CKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tRmxvYXRpbmcodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBTcGFuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqXG4gICAqIEB0b2RvIGEsIGIgYW5kIGMgc2hvdWxkIGJlICdNaXhlZCcgb3IgJ051bWJlcic/XG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBhXG4gICAqIEBwYXJhbSB7TWl4ZWR9ICAgICAgICAgICAgICAgYlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGNcbiAgICpcbiAgICogQHJldHVybiB7U3Bhbn1cbiAgICovXG4gIHN0YXRpYyBzZXRTcGFuVmFsdWUoYSwgYiwgYykge1xuICAgIGlmIChhIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcGFuKGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTcGFuKGEsIGIpO1xuICAgICAgICBlbHNlIHJldHVybiBuZXcgU3BhbihhLCBiLCBjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgZnJvbSBhIFNwYW4sIGlmIHRoZSBwYXJhbSBpcyBub3QgYSBTcGFuIGl0IHdpbGwgcmV0dXJuIHRoZSBnaXZlbiBwYXJhbWV0ZXJcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldFZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBwYW5cbiAgICpcbiAgICogQHJldHVybiB7TWl4ZWR9IHRoZSB2YWx1ZSBvZiBTcGFuIE9SIHRoZSBwYXJhbWV0ZXIgaWYgaXQgaXMgbm90IGEgU3BhblxuICAgKi9cbiAgc3RhdGljIGdldFNwYW5WYWx1ZShwYW4pIHtcbiAgICByZXR1cm4gcGFuIGluc3RhbmNlb2YgU3BhbiA/IHBhbi5nZXRWYWx1ZSgpIDogcGFuO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5U3BhbiBleHRlbmRzIFNwYW4ge1xuICBjb25zdHJ1Y3Rvcihjb2xvcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYXJyID0gVXRpbC50b0FycmF5KGNvbG9yKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIGNvbnN0IHZhbCA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLl9hcnIpO1xuICAgIHJldHVybiB2YWwgPT09IFwicmFuZG9tXCIgfHwgdmFsID09PSBcIlJhbmRvbVwiID8gTWF0aFV0aWwucmFuZG9tQ29sb3IoKSA6IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHN1cmUgdGhhdCB0aGUgY29sb3IgaXMgYW4gaW5zdGFuY2Ugb2YgUHJvdG9uLkFycmF5U3BhbiwgaWYgbm90IGl0IG1ha2VzIGEgbmV3IGluc3RhbmNlXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBcnJheVNwYW4oYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5U3BhbikgcmV0dXJuIGFycjtcbiAgICBlbHNlIHJldHVybiBuZXcgQXJyYXlTcGFuKGFycik7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLndpZHRoID0gdztcbiAgICB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuICB9XG5cbiAgY29udGFpbnMoeCwgeSkge1xuICAgIGlmICh4IDw9IHRoaXMucmlnaHQgJiYgeCA+PSB0aGlzLnggJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMueSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUge1xuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWlzc2lvbiAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYXRlXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkgfCBOdW1iZXIgfCBTcGFufSBudW1wYW4gdGhlIG51bWJlciBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBAcGFyYW0ge0FycmF5IHwgTnVtYmVyIHwgU3Bhbn0gdGltZXBhbiB0aGUgdGltZSBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBmb3IgZXhhbXBsZTogbmV3IFJhdGUobmV3IFNwYW4oMTAsIDIwKSwgbmV3IFNwYW4oLjEsIC4yNSkpO1xuICAgKi9cbiAgY29uc3RydWN0b3IobnVtcGFuLCB0aW1lcGFuKSB7XG4gICAgdGhpcy5udW1QYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShudW1wYW4sIDEpKTtcbiAgICB0aGlzLnRpbWVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZSh0aW1lcGFuLCAxKSk7XG5cbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IDA7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG4gIH1cblxuICBnZXRWYWx1ZSh0aW1lKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA+PSB0aGlzLm5leHRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG5cbiAgICAgIGlmICh0aGlzLm51bVBhbi5iID09PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLm51bVBhbi5nZXRWYWx1ZShmYWxzZSkgPiAwLjUpIHJldHVybiAxO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtUGFuLmdldFZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXplIHtcbiAgcmVzZXQoKSB7fVxuXG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShlbWl0dGVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBzdWIgY2xhc3MgaW5pdFxuICBpbml0aWFsaXplKHRhcmdldCkge31cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlmZSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGlmZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTGlmZVwiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5saWZlUGFuLmEgPT09IEluZmluaXR5KSB0YXJnZXQubGlmZSA9IEluZmluaXR5O1xuICAgIGVsc2UgdGFyZ2V0LmxpZmUgPSB0aGlzLmxpZmVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgICB0aGlzLnJhbmRvbSA9IDA7XG4gICAgdGhpcy5jcm9zc1R5cGUgPSBcImRlYWRcIjtcbiAgICB0aGlzLmFsZXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge31cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudmVjdG9yID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54O1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIFBvaW50Wm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzaW5nIG1ldGhvZCFcIik7XG4gICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3Ioem9uZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgICB0aGlzLm5hbWUgPSBcIlBvc2l0aW9uXCI7XG4gIH1cblxuICByZXNldCh6b25lKSB7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGhpcy56b25lLmdldFBvc2l0aW9uKCk7XG5cbiAgICB0YXJnZXQucC54ID0gdGhpcy56b25lLnZlY3Rvci54O1xuICAgIHRhcmdldC5wLnkgPSB0aGlzLnpvbmUudmVjdG9yLnk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4uL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbG9jaXR5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlZlbG9jaXR5XCI7XG4gIH1cblxuICByZXNldChycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG4gIH1cblxuICBub3JtYWxpemVWZWxvY2l0eSh2cikge1xuICAgIHJldHVybiB2ciAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInBcIiB8fCB0aGlzLnR5cGUgPT09IFwiUFwiIHx8IHRoaXMudHlwZSA9PT0gXCJwb2xhclwiKSB7XG4gICAgICBjb25zdCBwb2xhcjJkID0gbmV3IFBvbGFyMkQoXG4gICAgICAgIHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpLFxuICAgICAgICB0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpICogTWF0aFV0aWwuUElfMTgwXG4gICAgICApO1xuXG4gICAgICB0YXJnZXQudi54ID0gcG9sYXIyZC5nZXRYKCk7XG4gICAgICB0YXJnZXQudi55ID0gcG9sYXIyZC5nZXRZKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC52LnggPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKTtcbiAgICAgIHRhcmdldC52LnkgPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMudGhhUGFuLmdldFZhbHVlKCkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFzc1BhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTWFzc1wiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0YXJnZXQubWFzcyA9IHRoaXMubWFzc1Bhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGl1cyBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJSYWRpdXNcIjtcbiAgfVxuXG4gIHJlc2V0KGEsIGIsIGMpIHtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHRoaXMucmFkaXVzLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2R5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlLCB3LCBoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNldFNwYW5WYWx1ZShpbWFnZSk7XG4gICAgdGhpcy53ID0gVXRpbC5pbml0VmFsdWUodywgMjApO1xuICAgIHRoaXMuaCA9IFV0aWwuaW5pdFZhbHVlKGgsIHRoaXMudyk7XG4gICAgdGhpcy5uYW1lID0gXCJCb2R5XCI7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSB0aGlzLmltYWdlLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlVGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0ge1xuICAgICAgICB3aWR0aDogdGhpcy53LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaCxcbiAgICAgICAgc3JjOiBpbWFnZVRhcmdldCxcbiAgICAgICAgaXNJbm5lcjogdHJ1ZSxcbiAgICAgICAgaW5uZXI6IHRydWVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBpbWFnZVRhcmdldDtcbiAgICB9XG4gIH1cblxuICBzZXRTcGFuVmFsdWUoaW1hZ2UpIHtcbiAgICByZXR1cm4gaW1hZ2UgaW5zdGFuY2VvZiBBcnJheVNwYW4gPyBpbWFnZSA6IG5ldyBBcnJheVNwYW4oaW1hZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyIHtcbiAgc3RhdGljIGlkID0gMDtcblxuICAvKipcbiAgICogVGhlIEJlaGF2aW91ciBjbGFzcyBpcyB0aGUgYmFzZSBmb3IgdGhlIG90aGVyIEJlaGF2aW91clxuICAgKlxuICAgKiBAbWVtYmVyb2YhIC1cbiAgICogQGludGVyZmFjZVxuICAgKiBAYWxpYXMgUHJvdG9uLkJlaGF2aW91clxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbGlmZSBcdHRoZSBiZWhhdmlvdXJzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVhc2luZyBcdFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZCwgZm9yIGV4YW1wbGUgZWFzZS5lYXNlT3V0UXVhcnRcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9ICBpZCBcdFx0VGhlIGJlaGF2aW91cnMgaWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9ICBhZ2U9MCBcdEhvdyBsb25nIHRoZSBwYXJ0aWNsZSBzaG91bGQgYmUgJ2FsaWZlJ1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gIGVuZXJneT0xXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVhZD1mYWxzZSBUaGUgcGFydGljbGUgaXMgZGVhZCBhdCBmaXJzdFxuICAgKiBAcHJvcGVydHkge0FycmF5fSAgIHBhcmVudHMgXHRUaGUgYmVoYXZpb3VyJ3MgcGFyZW50cyBhcnJheVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gIG5hbWUgXHRUaGUgYmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG5cbiAgICB0aGlzLmFnZSA9IDA7XG4gICAgdGhpcy5lbmVyZ3kgPSAxO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyZW50cyA9IFtdO1xuXG4gICAgdGhpcy5pZCA9IGBCZWhhdmlvdXJfJHtCZWhhdmlvdXIuaWQrK31gO1xuICAgIHRoaXMubmFtZSA9IFwiQmVoYXZpb3VyXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIGZvcmNlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAbWV0aG9kIG5vcm1hbGl6ZUZvcmNlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gZm9yY2VcbiAgICovXG4gIG5vcm1hbGl6ZUZvcmNlKGZvcmNlKSB7XG4gICAgcmV0dXJuIGZvcmNlLm11bHRpcGx5U2NhbGFyKFByb3Rvbi5NRUFTVVJFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2YWx1ZSBieSAxOjEwMDtcbiAgICpcbiAgICogQG1ldGhvZCBub3JtYWxpemVWYWx1ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAqL1xuICBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuYWdlID49IHRoaXMubGlmZSB8fCB0aGlzLmRlYWQpIHtcbiAgICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyhwYXJ0aWNsZS5hZ2UgLyBwYXJ0aWNsZS5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIGJlaGF2aW91clxuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGxldCBpID0gdGhpcy5wYXJlbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLnBhcmVudHNbaV0ucmVtb3ZlQmVoYXZpb3VyKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMucGFyZW50cy5sZW5ndGggPSAwO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmNlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Gb3JjZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZ4LCBmeSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKG5ldyBWZWN0b3IyRChmeCwgZnkpKTtcbiAgICB0aGlzLm5hbWUgPSBcIkZvcmNlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeFxuICAgKiBAcGFyYW0ge051bWJlcn0gZnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKG5ldyBWZWN0b3IyRChmeCwgZnkpKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmZvcmNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0cmFjdGlvbiBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBUaGlzIGJlaGF2aW91ciBsZXQgdGhlIHBhcnRpY2xlcyBmb2xsb3cgb25lIHNwZWNpZmljIFByb3Rvbi5WZWN0b3IyRFxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQXR0cmFjdGlvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNTcVxuICAgKiBAcHJvcGVydHkge1Byb3Rvbi5WZWN0b3IyRH0gYXR0cmFjdGlvbkZvcmNlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBsZW5ndGhTcVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkF0dHJhY3Rpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLnJhZGl1cyA9IFV0aWwuaW5pdFZhbHVlKHJhZGl1cywgMTAwMCk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5jb3B5KHRoaXMudGFyZ2V0UG9zaXRpb24pO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLnN1YihwYXJ0aWNsZS5wKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gdGhpcy5hdHRyYWN0aW9uRm9yY2UubGVuZ3RoU3EoKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aFNxID4gMC4wMDAwNCAmJiB0aGlzLmxlbmd0aFNxIDwgdGhpcy5yYWRpdXNTcSkge1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uubm9ybWFsaXplKCk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5sZW5ndGhTcSAvIHRoaXMucmFkaXVzU3EpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIodGhpcy5mb3JjZSk7XG5cbiAgICAgIHBhcnRpY2xlLmEuYWRkKHRoaXMuYXR0cmFjdGlvbkZvcmNlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5kb21EcmlmdCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFJhbmRvbURyaWZ0XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFggXHRcdFx0XHRYIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WSAgXHRcdFx0XHRZIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IFx0XHRcdFx0SG93IG11Y2ggZGVsYXkgdGhlIGRyaWZ0IHNob3VsZCBoYXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lIFRoZSB0aW1lIG9mIHRoZSBkcmlmdFxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoZHJpZnRYLCBkcmlmdFksIGRlbGF5KTtcbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMubmFtZSA9IFwiUmFuZG9tRHJpZnRcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1JhbmRvbURyaWZ0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZHJpZnRYLCBkcmlmdFksIGRlbGF5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnBhbkZvY2UgPSBuZXcgVmVjdG9yMkQoZHJpZnRYLCBkcmlmdFkpO1xuICAgIHRoaXMucGFuRm9jZSA9IHRoaXMubm9ybWFsaXplRm9yY2UodGhpcy5wYW5Gb2NlKTtcbiAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS50aW1lID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgKz0gdGltZTtcblxuICAgIGlmIChwYXJ0aWNsZS5kYXRhLnRpbWUgPj0gdGhpcy5kZWxheSkge1xuICAgICAgcGFydGljbGUuYS5hZGRYWShcbiAgICAgICAgTWF0aFV0aWwucmFuZG9tQVRvQigtdGhpcy5wYW5Gb2NlLngsIHRoaXMucGFuRm9jZS54KSxcbiAgICAgICAgTWF0aFV0aWwucmFuZG9tQVRvQigtdGhpcy5wYW5Gb2NlLnksIHRoaXMucGFuRm9jZS55KVxuICAgICAgKTtcblxuICAgICAgcGFydGljbGUuZGF0YS50aW1lID0gMDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBGb3JjZSBmcm9tIFwiLi9Gb3JjZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5IGV4dGVuZHMgRm9yY2Uge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkdyYXZpdHlcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIoMCwgZywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5HcmF2aXR5XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZyBcdFx0XHRcdFx0XHRcdEdyYXZpdHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyLnJlc2V0KDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpc2lvbiBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgYWZ0ZXIgY29sbGlzaW9uXG4gICAqXG4gICAqIEBjYWxsYmFjayBDYWxsYmFja1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtQcm90b24uUGFyaXRjbGV9IG90aGVyUGFydGljbGVcbiAgICovXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ29sbGlzaW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2spO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sbGlzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gVXRpbC5pbml0VmFsdWUoZW1pdHRlciwgbnVsbCk7XG4gICAgdGhpcy5tYXNzID0gVXRpbC5pbml0VmFsdWUobWFzcywgdHJ1ZSk7XG4gICAgdGhpcy5jYWxsYmFjayA9IFV0aWwuaW5pdFZhbHVlKGNhbGxiYWNrLCBudWxsKTtcblxuICAgIHRoaXMuY29sbGlzaW9uUG9vbCA9IFtdO1xuICAgIHRoaXMuZGVsdGEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbmV3UG9vbCA9IHRoaXMuZW1pdHRlciA/IHRoaXMuZW1pdHRlci5wYXJ0aWNsZXMuc2xpY2UoaW5kZXgpIDogdGhpcy5wb29sLnNsaWNlKGluZGV4KTtcbiAgICBjb25zdCBsZW5ndGggPSBuZXdQb29sLmxlbmd0aDtcblxuICAgIGxldCBvdGhlclBhcnRpY2xlO1xuICAgIGxldCBsZW5ndGhTcTtcbiAgICBsZXQgb3ZlcmxhcDtcbiAgICBsZXQgdG90YWxNYXNzO1xuICAgIGxldCBhdmVyYWdlTWFzczEsIGF2ZXJhZ2VNYXNzMjtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgb3RoZXJQYXJ0aWNsZSA9IG5ld1Bvb2xbaV07XG5cbiAgICAgIGlmIChvdGhlclBhcnRpY2xlICE9PSBwYXJ0aWNsZSkge1xuICAgICAgICB0aGlzLmRlbHRhLmNvcHkob3RoZXJQYXJ0aWNsZS5wKTtcbiAgICAgICAgdGhpcy5kZWx0YS5zdWIocGFydGljbGUucCk7XG5cbiAgICAgICAgbGVuZ3RoU3EgPSB0aGlzLmRlbHRhLmxlbmd0aFNxKCk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gcGFydGljbGUucmFkaXVzICsgb3RoZXJQYXJ0aWNsZS5yYWRpdXM7XG5cbiAgICAgICAgaWYgKGxlbmd0aFNxIDw9IGRpc3RhbmNlICogZGlzdGFuY2UpIHtcbiAgICAgICAgICBvdmVybGFwID0gZGlzdGFuY2UgLSBNYXRoLnNxcnQobGVuZ3RoU3EpO1xuICAgICAgICAgIG92ZXJsYXAgKz0gMC41O1xuXG4gICAgICAgICAgdG90YWxNYXNzID0gcGFydGljbGUubWFzcyArIG90aGVyUGFydGljbGUubWFzcztcbiAgICAgICAgICBhdmVyYWdlTWFzczEgPSB0aGlzLm1hc3MgPyBvdGhlclBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG4gICAgICAgICAgYXZlcmFnZU1hc3MyID0gdGhpcy5tYXNzID8gcGFydGljbGUubWFzcyAvIHRvdGFsTWFzcyA6IDAuNTtcblxuICAgICAgICAgIHBhcnRpY2xlLnAuYWRkKFxuICAgICAgICAgICAgdGhpcy5kZWx0YVxuICAgICAgICAgICAgICAuY2xvbmUoKVxuICAgICAgICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgICAgICAgLm11bHRpcGx5U2NhbGFyKG92ZXJsYXAgKiAtYXZlcmFnZU1hc3MxKVxuICAgICAgICAgICk7XG4gICAgICAgICAgb3RoZXJQYXJ0aWNsZS5wLmFkZCh0aGlzLmRlbHRhLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKG92ZXJsYXAgKiBhdmVyYWdlTWFzczIpKTtcblxuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjayhwYXJ0aWNsZSwgb3RoZXJQYXJ0aWNsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm9zc1pvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogRGVmaW5lcyB3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBjb21lIHRvIHRoZSBlbmQgb2YgdGhlIHNwZWNpZmllZCB6b25lXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Dcm9zc1pvbmVcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uWm9uZX0gem9uZSBcdFx0XHRcdFx0XHRjYW4gYmUgYW55IFByb3Rvbi5ab25lIC0gZS5nLiBQcm90b24uUmVjdFpvbmUoKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtjcm9zc1R5cGU9ZGVhZF0gXHRcdFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KHpvbmUsIGNyb3NzVHlwZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDcm9zc1pvbmVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Dcm9zc1pvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRjYW4gYmUgYW55IFByb3Rvbi5ab25lIC0gZS5nLiBQcm90b24uUmVjdFpvbmUoKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtjcm9zc1R5cGU9ZGVhZF0gXHR3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBwYXNzIHRoZSB6b25lIC0gYWxsb3dlZCBzdHJpbmdzOiBkZWFkIHwgYm91bmQgfCBjcm9zc1xuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuem9uZSA9IHpvbmU7XG4gICAgdGhpcy56b25lLmNyb3NzVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGNyb3NzVHlwZSwgXCJkZWFkXCIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Dcm9zc1pvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICB0aGlzLnpvbmUuY3Jvc3NpbmcocGFydGljbGUpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxwaGEgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkFscGhhXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnIGFuZCAnYidcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkFscGhhXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnIGFuZCAnYidcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBuZXcgYWxwaGEgdmFsdWUgb2YgdGhlIHBhcnRpY2xlXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BbHBoYVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlIEEgc2luZ2xlIFByb3RvbiBnZW5lcmF0ZWQgcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLmFscGhhQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHRoaXMuc2FtZSkgcGFydGljbGUuZGF0YS5hbHBoYUIgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQTtcbiAgICBlbHNlIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BbHBoYVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS5hbHBoYSA9IHBhcnRpY2xlLmRhdGEuYWxwaGFCICsgKHBhcnRpY2xlLmRhdGEuYWxwaGFBIC0gcGFydGljbGUuZGF0YS5hbHBoYUIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICBpZiAocGFydGljbGUuYWxwaGEgPCAwLjAwMSkgcGFydGljbGUuYWxwaGEgPSAwO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhbGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlNjYWxlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnIGFuZCAnYidcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIlNjYWxlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVBID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgcGFydGljbGUuZGF0YS5zY2FsZUIgPSB0aGlzLnNhbWUgPyBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA6IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuc2NhbGUgPSBwYXJ0aWNsZS5kYXRhLnNjYWxlQiArIChwYXJ0aWNsZS5kYXRhLnNjYWxlQSAtIHBhcnRpY2xlLmRhdGEuc2NhbGVCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLnNjYWxlIDwgMC4wMDAxKSBwYXJ0aWNsZS5zY2FsZSA9IDA7XG4gICAgcGFydGljbGUucmFkaXVzID0gcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgKiBwYXJ0aWNsZS5zY2FsZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdGF0ZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUm90YXRlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnLCAnYicgYW5kICdzdHlsZSdcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtpbmZsdWVuY2U9VmVsb2NpdHldIFRoZSByb3RhdGlvbidzIGluZmx1ZW5jZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3N0eWxlPXRvXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZmx1ZW5jZSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGluZmx1ZW5jZSwgYiwgc3R5bGUpO1xuICAgIHRoaXMubmFtZSA9IFwiUm90YXRlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJywgJ2InIGFuZCAnc3R5bGUnXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbc3R5bGU9dG9dXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCBcIlZlbG9jaXR5XCIpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShiLCAwKSk7XG4gICAgdGhpcy5zdHlsZSA9IFV0aWwuaW5pdFZhbHVlKHN0eWxlLCBcInRvXCIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucm90YXRpb24gPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEucm90YXRpb25CID0gdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuc2FtZSkge1xuICAgICAgaWYgKHRoaXMuc3R5bGUgPT09IFwidG9cIiB8fCB0aGlzLnN0eWxlID09PSBcIlRPXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJfXCIpIHtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24gKz1cbiAgICAgICAgICBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiArIChwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQSAtIHBhcnRpY2xlLmRhdGEucm90YXRpb25CKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24gKz0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmEuYSA9PT0gXCJWXCIgfHwgdGhpcy5hLmEgPT09IFwiVmVsb2NpdHlcIiB8fCB0aGlzLmEuYSA9PT0gXCJ2XCIpIHtcbiAgICAgIC8vIGJldGEuLi5cbiAgICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gcGFydGljbGUuZ2V0RGlyZWN0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4uL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ29sb3JcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBhIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBiIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJDb2xvclwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGEgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGIgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYSA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYSk7XG4gICAgdGhpcy5iID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihiKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmNvbG9yID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5jb2xvckEgPSBDb2xvclV0aWwuaGV4VG9SZ2IocGFydGljbGUuY29sb3IpO1xuXG4gICAgaWYgKHRoaXMuYikgcGFydGljbGUuZGF0YS5jb2xvckIgPSBDb2xvclV0aWwuaGV4VG9SZ2IodGhpcy5iLmdldFZhbHVlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5iKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLnIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuciAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLnIpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmcgKyAocGFydGljbGUuZGF0YS5jb2xvckEuZyAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmcpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuYiAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUucmdiLnIgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUucmdiLmcgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUucmdiLmIgPDwgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmNvbnN0IENIQU5HSU5HID0gXCJjaGFuZ2luZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDeWNsb25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5DeWNsb25lXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3ljbG9uZVwiO1xuICB9XG5cbiAgc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcblxuICAgIGlmIChhbmdsZSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwibGVmdFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gLU1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJyYW5kb21cIjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwic3BhblwiO1xuICAgICAgdGhpcy5zcGFuID0gYW5nbGU7XG4gICAgfSBlbHNlIGlmIChhbmdsZSkge1xuICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ2luZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImF1dG9cIlxuICAgICkge1xuICAgICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIH0gZWxzZSBpZiAoZm9yY2UpIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBmb3JjZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gTWF0aFV0aWwucmFuZG9tQVRvQigtTWF0aFV0aWwuUEksIE1hdGhVdGlsLlBJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IHRoaXMuc3Bhbi5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgbGV0IGxlbmd0aDtcbiAgICBsZXQgZ3JhZGllbnQgPSBwYXJ0aWNsZS52LmdldEdyYWRpZW50KCk7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIgfHwgdGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIGdyYWRpZW50ICs9IHBhcnRpY2xlLmRhdGEuY2FuZ2xlO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmFkaWVudCArPSB0aGlzLmFuZ2xlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcmNlID09PSBDSEFOR0lORykge1xuICAgICAgbGVuZ3RoID0gcGFydGljbGUudi5sZW5ndGgoKSAvIDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdGhpcy5mb3JjZTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueCA9IGxlbmd0aCAqIE1hdGguY29zKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueSA9IGxlbmd0aCAqIE1hdGguc2luKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gICAgcGFydGljbGUuYS5hZGQocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgfVxufVxuIiwiaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSBcIi4vQXR0cmFjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXB1bHNpb24gZXh0ZW5kcyBBdHRyYWN0aW9uIHtcbiAgLyoqXG4gICAqIFRoZSBvcHBpc2l0ZSBvZiBQcm90b24uQXR0cmFjdGlvbiAtIHR1cm5zIHRoZSBmb3JjZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5SZXB1bHNpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZm9yY2UgKj0gLTE7XG4gICAgdGhpcy5uYW1lID0gXCJSZXB1bHNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5SZXB1bHNpb25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyLnJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMuZm9yY2UgKj0gLTE7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHlXZWxsIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgR3Jhdml0eVdlbGxcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY2VudGVyUG9pbnQsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5kaXN0YW5jZVZlYyA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuY2VudGVyUG9pbnQgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXJQb2ludCwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMubmFtZSA9IFwiR3Jhdml0eVdlbGxcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbY2VudGVyUG9pbnQ9bmV3IFZlY3RvcjJEXSBUaGUgcG9pbnQgaW4gdGhlIGNlbnRlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cdFx0XHRcdFx0VGhlIGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV1cdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYyA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuY2VudGVyUG9pbnQgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXJQb2ludCwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW5oZXJpdGRvY1xuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jR3Jhdml0eVdlbGxcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmRpc3RhbmNlVmVjLnNldCh0aGlzLmNlbnRlclBvaW50LnggLSBwYXJ0aWNsZS5wLngsIHRoaXMuY2VudGVyUG9pbnQueSAtIHBhcnRpY2xlLnAueSk7XG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IHRoaXMuZGlzdGFuY2VWZWMubGVuZ3RoU3EoKTtcblxuICAgIGlmIChkaXN0YW5jZVNxICE9PSAwKSB7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2VWZWMubGVuZ3RoKCk7XG4gICAgICBjb25zdCBmYWN0b3IgPSAodGhpcy5mb3JjZSAqIHRpbWUpIC8gKGRpc3RhbmNlU3EgKiBkaXN0YW5jZSk7XG5cbiAgICAgIHBhcnRpY2xlLnYueCArPSBmYWN0b3IgKiB0aGlzLmRpc3RhbmNlVmVjLng7XG4gICAgICBwYXJ0aWNsZS52LnkgKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFByb3BVdGlsIGZyb20gXCIuLi91dGlscy9Qcm9wVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdGlhbGl6ZShlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpIHtcbiAgICBjb25zdCBsZW5ndGggPSBpbml0aWFsaXplcy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpbml0aWFsaXplc1tpXSBpbnN0YW5jZW9mIEluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZXNbaV0uaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluaXQoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFbWl0dGVyKGVtaXR0ZXIsIHBhcnRpY2xlKTtcbiAgfSxcblxuICAvLyBpbml0XG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemUpIHtcbiAgICBQcm9wVXRpbC5zZXRQcm9wKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgICBQcm9wVXRpbC5zZXRWZWN0b3JWYWwocGFydGljbGUsIGluaXRpYWxpemUpO1xuICB9LFxuXG4gIGJpbmRFbWl0dGVyKGVtaXR0ZXIsIHBhcnRpY2xlKSB7XG4gICAgaWYgKGVtaXR0ZXIuYmluZEVtaXR0ZXIpIHtcbiAgICAgIHBhcnRpY2xlLnAuYWRkKGVtaXR0ZXIucCk7XG4gICAgICBwYXJ0aWNsZS52LmFkZChlbWl0dGVyLnYpO1xuICAgICAgcGFydGljbGUuYS5hZGQoZW1pdHRlci5hKTtcblxuICAgICAgcGFydGljbGUudi5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKGVtaXR0ZXIucm90YXRpb24pKTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZVV0aWwgZnJvbSBcIi4uL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlciBleHRlbmRzIFBhcnRpY2xlIHtcbiAgLyoqXG4gICAqIFlvdSBjYW4gdXNlIHRoaXMgZW1pdCBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEl0IHdpbGwgZGlzcGF0Y2ggZm9sbG93IGV2ZW50czpcbiAgICogUEFSVElDTEVfQ1JFQVRFRFxuICAgKiBQQVJUSUNMRV9VUERBVEFcbiAgICogUEFSVElDTEVfREVBRFxuICAgKlxuICAgKiBAY2xhc3MgRW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7ZGFtcGluZzowLjAxLGJpbmRFbWl0dGVyOmZhbHNlfVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZiA9IHt9KSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuICAgIHRoaXMuaW5pdGlhbGl6ZXMgPSBbXTtcblxuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuZW1pdFNwZWVkID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyaWN0aW9uIGNvZWZmaWNpZW50IGZvciBhbGwgcGFydGljbGUgZW1pdCBieSBUaGlzO1xuICAgICAqIEBwcm9wZXJ0eSBkYW1waW5nXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwLjAwNlxuICAgICAqL1xuICAgIHRoaXMuZGFtcGluZyA9IDAuMDA2O1xuXG4gICAgLyoqXG4gICAgICogSWYgYmluZEVtaXR0ZXIgdGhlIHBhcnRpY2xlcyBjYW4gYmluZCB0aGlzIGVtaXR0ZXIncyBwcm9wZXJ0eTtcbiAgICAgKiBAcHJvcGVydHkgYmluZEVtaXR0ZXJcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgdGhpcy5iaW5kRW1pdHRlciA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXQgKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAgICogQHByb3BlcnR5IHJhdGVcbiAgICAgKiBAdHlwZSB7UmF0ZX1cbiAgICAgKiBAZGVmYXVsdCBSYXRlKDEsIC4xKVxuICAgICAqL1xuICAgIHRoaXMucmF0ZSA9IG5ldyBSYXRlKDEsIDAuMSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkVtaXR0ZXJcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbWl0VGltZSBiZWdpbiBlbWl0IHRpbWU7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsaWZlIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlclxuICAgKi9cbiAgZW1pdCh0b3RhbFRpbWUsIGxpZmUpIHtcbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gVXRpbC5pbml0VmFsdWUodG90YWxUaW1lLCBJbmZpbml0eSk7XG5cbiAgICBpZiAobGlmZSA9PT0gdHJ1ZSB8fCBsaWZlID09PSBcImxpZmVcIiB8fCBsaWZlID09PSBcImRlc3Ryb3lcIikge1xuICAgICAgdGhpcy5saWZlID0gdG90YWxUaW1lID09PSBcIm9uY2VcIiA/IDEgOiB0aGlzLnRvdGFsVGltZTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihsaWZlKSkge1xuICAgICAgdGhpcy5saWZlID0gbGlmZTtcbiAgICB9XG5cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJvbmNlXCIpIHtcbiAgICAgIGxldCBpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB0aGlzLnRvdGFsVGltZSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG5cbiAgICAgIGlmICh0aGlzLmVtaXRUaW1lIDwgdGhpcy50b3RhbFRpbWUpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgc2luZ2xlIHBhcnRpY2xlO1xuICAgKlxuICAgKiBjYW4gdXNlIGVtaXQoe3g6MTB9LG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KSBvciBlbWl0KFt7eDoxMH0sbmV3IEluaXRpYWxpemVdLG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KVxuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGxldCBpbml0aWFsaXplcyA9IHRoaXMuaW5pdGlhbGl6ZXM7XG4gICAgbGV0IGJlaGF2aW91cnMgPSB0aGlzLmJlaGF2aW91cnM7XG5cbiAgICBpZiAoaW5pdGlhbGl6ZSkgaW5pdGlhbGl6ZXMgPSBVdGlsLnRvQXJyYXkoaW5pdGlhbGl6ZSk7XG4gICAgaWYgKGJlaGF2aW91cikgYmVoYXZpb3VycyA9IFV0aWwudG9BcnJheShiZWhhdmlvdXIpO1xuXG4gICAgcGFydGljbGUucmVzZXQoKTtcbiAgICBJbml0aWFsaXplVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcyk7XG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucGFydGljbGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcblxuICAgIHRoaXMucmF0ZSA9IG51bGw7XG4gICAgdGhpcy5vbGQgPSBudWxsO1xuICAgIHRoaXMucmdiID0gbnVsbDtcbiAgICB0aGlzLnYgPSBudWxsO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdGhpcy5wID0gbnVsbDtcbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChFbWl0dGVyKTtcbiIsImltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyRW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEJlaGF2aW91ckVtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEJlaGF2aW91ckVtaXR0ZXIgeW91IGNhbiBhZGQgYmVoYXZpb3VycyB0byBzZWxmO1xuICAgKiBAY2xhc3MgUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMuc2VsZkJlaGF2aW91cnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBlbWl0dGVyO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IFByb3Rvbi5Db2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZFNlbGZCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpLFxuICAgICAgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXIgZm9yIHNlbGZcbiAgICogQG1ldGhvZCByZW1vdmVTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVTZWxmQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuc2VsZkJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgc3VwZXIudXBkYXRlKHRpbWUpO1xuXG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmxlbmd0aDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd0VtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBGb2xsb3dFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBGb2xsb3dFbWl0dGVyIHdpbGwgZW1pdCBwYXJ0aWNsZSB3aGVuIG1vdXNlbW92aW5nXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uRm9sbG93RW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtFbGVtZW50fSBtb3VzZVRhcmdldCBtb3VzZWV2ZW50J3MgdGFyZ2V0O1xuICAgKiBAcGFyYW0ge051bWJlcn0gZWFzZSB0aGUgZWFzaW5nIG9mIGZvbGxvd2luZyBzcGVlZDtcbiAgICogQGRlZmF1bHQgMC43XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1vdXNlVGFyZ2V0LCBlYXNlLCBjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcblxuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlbW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZWRvd24uY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNldXBIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNldXAuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZW1vdmUoZSkge1xuICAgIGlmIChlLmxheWVyWCB8fCBlLmxheWVyWCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUubGF5ZXJYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH0gZWxzZSBpZiAoZS5vZmZzZXRYIHx8IGUub2Zmc2V0WCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUub2Zmc2V0WCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLm9mZnNldFkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoXCJvbmNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHBpY3R1cmUgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc0ltYWdlKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5fX2lzSW1hZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIG9iai5fX2lzSW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHN0cmluZyBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICB9XG59O1xuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5uYW1lID0gXCJCYXNlUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFN0cm9rZShjb2xvciA9IFwiIzAwMDAwMFwiLCB0aGlua25lc3MgPSAxKSB7XG4gICAgdGhpcy5zdHJva2UgPSB7IGNvbG9yLCB0aGlua25lc3MgfTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZUFmdGVyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyQWRkZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlclJlbW92ZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZURlYWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwcm90b247XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0ltYWdlIG1ldGhvZFxuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZSBkcmF3Q2lyY2xlIC0tXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY2lyY2xlXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvLyBwcml2YXRlIGNyZWF0ZUJ1ZmZlclxuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoVHlwZXMuaXNJbWFnZShpbWFnZSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBpbWFnZS53aWR0aCArIFwiX1wiICsgaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV07XG5cbiAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdID0gY2FudmFzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtM2QgPSBmYWxzZTtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRvbVJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zZCkge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybTNkKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0ocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUub3BhY2l0eSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgICBpZiAocGFydGljbGUuYm9keS5pc0NpcmNsZSkge1xuICAgICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGJvZHlSZWFkeShwYXJ0aWNsZSkge1xuICAgIHJldHVybiB0eXBlb2YgcGFydGljbGUuYm9keSA9PT0gXCJvYmplY3RcIiAmJiBwYXJ0aWNsZS5ib2R5ICYmICFwYXJ0aWNsZS5ib2R5LmlzSW5uZXI7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChpbWcsIHBhcnRpY2xlKTtcbiAgICBEb21VdGlsLnJlc2l6ZShwYXJ0aWNsZS5ib2R5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIDIgKiBwYXJ0aWNsZS5yYWRpdXMsIDIgKiBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHtwYXJ0aWNsZS5yYWRpdXN9cHhgO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJXaWR0aCA9IGAke3RoaXMuc3Ryb2tlLnRoaW5rbmVzc31weGA7XG4gICAgfVxuICAgIGRvbS5pc0NpcmNsZSA9IHRydWU7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdXJsID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIgPyBib2R5IDogYm9keS5zcmM7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIGJvZHkud2lkdGgsIGJvZHkuaGVpZ2h0KTtcbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3VybH0pYDtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc2VsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMubmFtZSA9IFwiRWFzZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgdGhpcy5jcmVhdGVTcHJpdGUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHBhcnRpY2xlLmJvZHkuc2NhbGVYID0gcGFydGljbGUuYm9keS5zY2FsZVkgPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICAgIHBhcnRpY2xlLmJvZHkucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnBhcmVudCAmJiBwYXJ0aWNsZS5ib2R5LnBhcmVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUuZ3JhcGhpY3MpIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuZ3JhcGhpY3MpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBjcmVhdGVTcHJpdGUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5LnBhcmVudCkgcmV0dXJuO1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5W1wiaW1hZ2VcIl0pIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWCA9IHBhcnRpY2xlLmJvZHkuaW1hZ2Uud2lkdGggLyAyO1xuICAgICAgcGFydGljbGUuYm9keS5yZWdZID0gcGFydGljbGUuYm9keS5pbWFnZS5oZWlnaHQgLyAyO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gdGhpcy5wb29sLmdldChjcmVhdGVqcy5HcmFwaGljcyk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkpIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UodGhpcy5zdHJva2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UoXCIjMDAwMDAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCIpLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMucG9vbC5nZXQoY3JlYXRlanMuU2hhcGUsIFtncmFwaGljc10pO1xuXG4gICAgcGFydGljbGUuYm9keSA9IHNoYXBlO1xuICAgIHBhcnRpY2xlLmdyYXBoaWNzID0gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgcmVjdGFuZ2xlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLmNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhlbFJlbmRlcmVyXCI7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBjcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGUgPyByZWN0YW5nbGUgOiBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCh0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55LCB0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICB0aGlzLnJlY3RhbmdsZS54LFxuICAgICAgdGhpcy5yZWN0YW5nbGUueSxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLndpZHRoLFxuICAgICAgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhKSB7XG4gICAgICB0aGlzLnNldFBpeGVsKFxuICAgICAgICB0aGlzLmltYWdlRGF0YSxcbiAgICAgICAgKHBhcnRpY2xlLnAueCAtIHRoaXMucmVjdGFuZ2xlLngpID4+IDAsXG4gICAgICAgIChwYXJ0aWNsZS5wLnkgLSB0aGlzLnJlY3RhbmdsZS55KSA+PiAwLFxuICAgICAgICBwYXJ0aWNsZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQaXhlbChpbWFnZWRhdGEsIHgsIHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgcmdiID0gcGFydGljbGUucmdiO1xuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5lbGVtZW50LndpZHRoIHx8IHkgPCAwIHx8IHkgPiB0aGlzLmVsZW1lbnR3aWR0aCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIGltYWdlZGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaV0gPSByZ2IucjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMV0gPSByZ2IuZztcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMl0gPSByZ2IuYjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgM10gPSBwYXJ0aWNsZS5hbHBoYSAqIDI1NTtcbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5sZXQgUElYSUNsYXNzO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4aVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLmNvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuYmxlbmRNb2RlID0gbnVsbDtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuc2V0UElYSSh3aW5kb3cuUElYSSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGlSZW5kZXJlclwiO1xuICB9XG5cbiAgc2V0UElYSShQSVhJKSB7XG4gICAgdHJ5IHtcbiAgICAgIFBJWElDbGFzcyA9IFBJWEkgfHwgeyBTcHJpdGU6IHt9IH07XG4gICAgICB0aGlzLmNyZWF0ZUZyb21JbWFnZSA9IFBJWElDbGFzcy5TcHJpdGUuZnJvbSB8fCBQSVhJQ2xhc3MuU3ByaXRlLmZyb21JbWFnZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICB0aGlzLnRyYW5zZm9ybShwYXJ0aWNsZSwgcGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAodGhpcy5zZXRDb2xvciA9PT0gdHJ1ZSB8fCB0aGlzLmNvbG9yID09PSB0cnVlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnRpbnQgPSBDb2xvclV0aWwuZ2V0SGV4MTZGcm9tUGFydGljbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICB0cmFuc2Zvcm0ocGFydGljbGUsIHRhcmdldCkge1xuICAgIHRhcmdldC54ID0gcGFydGljbGUucC54O1xuICAgIHRhcmdldC55ID0gcGFydGljbGUucC55O1xuXG4gICAgdGFyZ2V0LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0YXJnZXQuc2NhbGUueCA9IHBhcnRpY2xlLnNjYWxlO1xuICAgIHRhcmdldC5zY2FsZS55ID0gcGFydGljbGUuc2NhbGU7XG5cbiAgICAvLyB1c2luZyBjYWNoZWQgdmVyc2lvbiBvZiBNYXRoVXRpbC5QSV8xODAgZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZS5cbiAgICB0YXJnZXQucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDsgLy8gTWF0aFV0aWwuUElfMTgwO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHkpO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHkpIHtcbiAgICBjb25zdCBzcHJpdGUgPSBib2R5LmlzSW5uZXIgPyB0aGlzLmNyZWF0ZUZyb21JbWFnZShib2R5LnNyYykgOiBuZXcgUElYSUNsYXNzLlNwcml0ZShib2R5KTtcblxuICAgIHNwcml0ZS5hbmNob3IueCA9IDAuNTtcbiAgICBzcHJpdGUuYW5jaG9yLnkgPSAwLjU7XG5cbiAgICByZXR1cm4gc3ByaXRlO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSUNsYXNzLkdyYXBoaWNzKCk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGNvbnN0IHN0cm9rZSA9IFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSA/IHRoaXMuc3Ryb2tlIDogMHgwMDAwMDA7XG4gICAgICBncmFwaGljcy5iZWdpblN0cm9rZShzdHJva2UpO1xuICAgIH1cblxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCAweDAwOGNlZCk7XG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcblxuICAgIHJldHVybiBncmFwaGljcztcbiAgfVxuXG4gIGRlc3Ryb3kocGFydGljbGVzKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgbGV0IGkgPSBwYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXTtcbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTVN0YWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXRzID0gW107XG4gICAgdGhpcy5zaXplID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykgdGhpcy5tYXRzLnB1c2goTWF0My5jcmVhdGUoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XG4gIH1cblxuICBzZXQobSwgaSkge1xuICAgIGlmIChpID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbaSAtIDFdLCBtLCB0aGlzLm1hdHNbaV0pO1xuXG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgodGhpcy5zaXplLCBpICsgMSk7XG4gIH1cblxuICBwdXNoKG0pIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV0sIG0sIHRoaXMubWF0c1t0aGlzLnNpemVdKTtcblxuICAgIHRoaXMuc2l6ZSsrO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIGlmICh0aGlzLnNpemUgPiAwKSB0aGlzLnNpemUtLTtcbiAgfVxuXG4gIHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBNU3RhY2sgZnJvbSBcIi4uL3V0aWxzL01TdGFja1wiO1xuaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4uL3V0aWxzL1dlYkdMVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmdsID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgeyBhbnRpYWxpYXM6IHRydWUsIHN0ZW5jaWw6IGZhbHNlLCBkZXB0aDogZmFsc2UgfSk7XG4gICAgaWYgKCF0aGlzLmdsKSBhbGVydChcIlNvcnJ5IHlvdXIgYnJvd3NlciBkbyBub3Qgc3VwcGVzdCBXZWJHTCFcIik7XG5cbiAgICB0aGlzLmluaXRWYXIoKTtcbiAgICB0aGlzLnNldE1heFJhZGl1cygpO1xuICAgIHRoaXMuaW5pdFNoYWRlcnMoKTtcbiAgICB0aGlzLmluaXRCdWZmZXJzKCk7XG5cbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbC5GVU5DX0FERCk7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiV2ViR0xSZW5kZXJlclwiO1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICBzdXBlci5pbml0KHByb3Rvbik7XG4gICAgdGhpcy5yZXNpemUodGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy51bWF0WzRdID0gLTI7XG4gICAgdGhpcy51bWF0WzddID0gMTtcblxuICAgIHRoaXMuc21hdFswXSA9IDEgLyB3aWR0aDtcbiAgICB0aGlzLnNtYXRbNF0gPSAxIC8gaGVpZ2h0O1xuXG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMudW1hdCwgMCk7XG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMuc21hdCwgMSk7XG5cbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRNYXhSYWRpdXMocmFkaXVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNVUkwgPSB0aGlzLmNyZWF0ZUNpcmNsZShyYWRpdXMpO1xuICB9XG5cbiAgZ2V0VmVydGV4U2hhZGVyKCkge1xuICAgIGNvbnN0IHZzU291cmNlID0gW1xuICAgICAgXCJ1bmlmb3JtIHZlYzIgdmlld3BvcnQ7XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidW5pZm9ybSBtYXQzIHRNYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzMgdiA9IHRNYXQgKiB2ZWMzKGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcIixcbiAgICAgIFwiZ2xfUG9zaXRpb24gPSB2ZWM0KHYueCwgdi55LCAwLCAxKTtcIixcbiAgICAgIFwidlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcImFscGhhID0gdE1hdFswXVsyXTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiB2c1NvdXJjZTtcbiAgfVxuXG4gIGdldEZyYWdtZW50U2hhZGVyKCkge1xuICAgIGNvbnN0IGZzU291cmNlID0gW1xuICAgICAgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzQgY29sb3I7XCIsXG4gICAgICBcInVuaWZvcm0gYm9vbCB1c2VUZXh0dXJlO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzMgdUNvbG9yO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZUNvbG9yICogdmVjNCh1Q29sb3IsIDEuMCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvci53ICo9IGFscGhhO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIGZzU291cmNlO1xuICB9XG5cbiAgaW5pdFZhcigpIHtcbiAgICB0aGlzLm1zdGFjayA9IG5ldyBNU3RhY2soKTtcbiAgICB0aGlzLnVtYXQgPSBNYXQzLmNyZWF0ZShbMiwgMCwgMSwgMCwgLTIsIDAsIC0xLCAxLCAxXSk7XG4gICAgdGhpcy5zbWF0ID0gTWF0My5jcmVhdGUoWzEgLyAxMDAsIDAsIDEsIDAsIDEgLyAxMDAsIDAsIDAsIDAsIDFdKTtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0ge307XG4gIH1cblxuICBibGVuZEVxdWF0aW9uKEEpIHtcbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbFtBXSk7XG4gIH1cblxuICBibGVuZEZ1bmMoQSwgQikge1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2xbQV0sIHRoaXMuZ2xbQl0pO1xuICB9XG5cbiAgZ2V0U2hhZGVyKGdsLCBzdHIsIGZzKSB7XG4gICAgY29uc3Qgc2hhZGVyID0gZnMgPyBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKSA6IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcblxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHN0cik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgaW5pdFNoYWRlcnMoKSB7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyKCksIHRydWUpO1xuICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0VmVydGV4U2hhZGVyKCksIGZhbHNlKTtcblxuICAgIHRoaXMuc3Byb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5zcHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIGFsZXJ0KFwiQ291bGQgbm90IGluaXRpYWxpc2Ugc2hhZGVyc1wiKTtcblxuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcbiAgICB0aGlzLnNwcm9ncmFtLnZwYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVmVydGV4UG9zaXRpb25cIik7XG4gICAgdGhpcy5zcHJvZ3JhbS50Y2EgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVRleHR1cmVDb29yZFwiKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udGNhKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udnBhKTtcblxuICAgIHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInRNYXRcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidVNhbXBsZXJcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS51c2VUZXggPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVzZVRleHR1cmVcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5jb2xvciA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidUNvbG9yXCIpO1xuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0udXNlVGV4LCAxKTtcbiAgfVxuXG4gIGluaXRCdWZmZXJzKCkge1xuICAgIGNvbnN0IHZzID0gWzAsIDMsIDEsIDAsIDIsIDNdO1xuICAgIGxldCBpZHg7XG5cbiAgICB0aGlzLnVuaXRJQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh2cyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgbGV0IGk7XG4gICAgbGV0IGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSk7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnVuaXRJMzMgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJMzMpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpLCBpICsgMSwgaSArIDIpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy5zdHJpcEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuc3RyaXBCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHJhaWR1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzID0gV2ViR0xVdGlsLm5ocG90KFV0aWwuaW5pdFZhbHVlKHJhaWR1cywgMzIpKTtcbiAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhcImNpcmNsZV9jYW52YXNcIiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfVxuXG4gIGRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgX3cgPSBwYXJ0aWNsZS5ib2R5LndpZHRoO1xuICAgIGNvbnN0IF9oID0gcGFydGljbGUuYm9keS5oZWlnaHQ7XG5cbiAgICBjb25zdCBfd2lkdGggPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS53aWR0aCk7XG4gICAgY29uc3QgX2hlaWdodCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LmhlaWdodCk7XG5cbiAgICBjb25zdCBfc2NhbGVYID0gcGFydGljbGUuYm9keS53aWR0aCAvIF93aWR0aDtcbiAgICBjb25zdCBfc2NhbGVZID0gcGFydGljbGUuYm9keS5oZWlnaHQgLyBfaGVpZ2h0O1xuXG4gICAgaWYgKCF0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSlcbiAgICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdID0gW1xuICAgICAgICB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKVxuICAgICAgXTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZSA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzBdO1xuICAgIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsxXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMl07XG5cbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF9zY2FsZVgsIDAuMCwgMC4wLCBfc2NhbGVZLCBfc2NhbGVZLCBfc2NhbGVZXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF93LCAwLjAsIDAuMCwgX2gsIF93LCBfaF0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gcGFydGljbGUuZGF0YS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xuXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpO1xuICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggPSBfdztcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgPSBfaDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIC8vIHRoaXMuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAxKTtcbiAgICAvLyB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IGZhbHNlO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS50bWF0WzhdID0gMTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdFs4XSA9IDE7XG5cbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZSh0aGlzLmNpcmNsZUNhbnZhc1VSTCwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IHBhcnRpY2xlLnJhZGl1cyAvIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgICBwYXJ0aWNsZS5kYXRhLnNyYyA9IGltZy5zcmM7XG4gICAgcGFydGljbGUuZGF0YS5jYW52YXMgPSBJbWdVdGlsLmdldENhbnZhc0Zyb21DYWNoZShpbWcpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSAxO1xuXG4gICAgdGhpcy5kcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCkge1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgocGFydGljbGUpO1xuXG4gICAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNwcm9ncmFtLmNvbG9yLCBwYXJ0aWNsZS5yZ2IuciAvIDI1NSwgcGFydGljbGUucmdiLmcgLyAyNTUsIHBhcnRpY2xlLnJnYi5iIC8gMjU1KTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtLCBmYWxzZSwgdGhpcy5tc3RhY2sudG9wKCkpO1xuXG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udnBhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udGNhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0sIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuXG4gICAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgNiwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICB0aGlzLm1zdGFjay5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICB1cGRhdGVNYXRyaXgocGFydGljbGUpIHtcbiAgICBjb25zdCBtb3ZlT3JpZ2luTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCAvIDIsXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcblxuICAgIGNvbnN0IGFuZ2VsID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7XG4gICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVJvdGF0aW9uKGFuZ2VsKTtcblxuICAgIGNvbnN0IHNjYWxlID0gcGFydGljbGUuc2NhbGUgKiBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlO1xuICAgIGNvbnN0IHNjYWxlTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgIGxldCBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobW92ZU9yaWdpbk1hdHJpeCwgc2NhbGVNYXRyaXgpO1xuXG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgcm90YXRpb25NYXRyaXgpO1xuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHRyYW5zbGF0aW9uTWF0cml4KTtcblxuICAgIE1hdDMuaW52ZXJzZShtYXRyaXgsIHBhcnRpY2xlLmRhdGEuaW1hdCk7XG4gICAgbWF0cml4WzJdID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0aGlzLm1zdGFjay5wdXNoKG1hdHJpeCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdsID0gbnVsbDtcbiAgICB0aGlzLm1zdGFjayA9IG51bGw7XG4gICAgdGhpcy51bWF0ID0gbnVsbDtcbiAgICB0aGlzLnNtYXQgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tUmVuZGVyZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZGlyZWN0aW9uKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh4MiAtIHgxID49IDApIHtcbiAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54MSA9IHgyO1xuICAgICAgdGhpcy55MSA9IHkyO1xuICAgICAgdGhpcy54MiA9IHgxO1xuICAgICAgdGhpcy55MiA9IHkxO1xuICAgIH1cblxuICAgIHRoaXMuZHggPSB0aGlzLngyIC0gdGhpcy54MTtcbiAgICB0aGlzLmR5ID0gdGhpcy55MiAtIHRoaXMueTE7XG5cbiAgICB0aGlzLm1pbnggPSBNYXRoLm1pbih0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1pbnkgPSBNYXRoLm1pbih0aGlzLnkxLCB0aGlzLnkyKTtcbiAgICB0aGlzLm1heHggPSBNYXRoLm1heCh0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1heHkgPSBNYXRoLm1heCh0aGlzLnkxLCB0aGlzLnkyKTtcblxuICAgIHRoaXMuZG90ID0gdGhpcy54MiAqIHRoaXMueTEgLSB0aGlzLngxICogdGhpcy55MjtcbiAgICB0aGlzLnh4eXkgPSB0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5O1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlsLmluaXRWYWx1ZShkaXJlY3Rpb24sIFwiPlwiKTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLmNvcyh0aGlzLmdyYWRpZW50KTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLnNpbih0aGlzLmdyYWRpZW50KTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQiA9PT0gMCA/IDEgOiBCO1xuXG4gICAgaWYgKChBICogeCArIEIgKiB5ICsgQykgKiBEID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXREaXN0YW5jZSh4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQSAqIHggKyBCICogeSArIEM7XG5cbiAgICByZXR1cm4gRCAvIE1hdGguc3FydCh0aGlzLnh4eXkpO1xuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHYpIHtcbiAgICBjb25zdCB0aGEyID0gdi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG5cbiAgICBjb25zdCBvbGR4ID0gdi54O1xuICAgIGNvbnN0IG9sZHkgPSB2Lnk7XG5cbiAgICB2LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMuZHksIHRoaXMuZHgpO1xuICB9XG5cbiAgcmFuZ2VPdXQocGFydGljbGUpIHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYWJzKHRoaXMuZ2V0R3JhZGllbnQoKSk7XG5cbiAgICBpZiAoYW5nbGUgPD0gTWF0aFV0aWwuUEkgLyA0KSB7XG4gICAgICBpZiAocGFydGljbGUucC54IDw9IHRoaXMubWF4eCAmJiBwYXJ0aWNsZS5wLnggPj0gdGhpcy5taW54KSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueSA8PSB0aGlzLm1heHkgJiYgcGFydGljbGUucC55ID49IHRoaXMubWlueSkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keSk7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCI+XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiUlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcblxuICAgICAgaWYgKHRoaXMuZ2V0RGlzdGFuY2UocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpIDw9IHBhcnRpY2xlLnJhZGl1cykge1xuICAgICAgICBpZiAodGhpcy5keCA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR5ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlLnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIExpbmVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLmNlbnRlciA9IHsgeCwgeSB9O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJeDIgKiBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMucmFuZG9tUmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgc2V0Q2VudGVyKHgsIHkpIHtcbiAgICB0aGlzLmNlbnRlci54ID0geDtcbiAgICB0aGlzLmNlbnRlci55ID0geTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZCA9IHBhcnRpY2xlLnAuZGlzdGFuY2VUbyh0aGlzLmNlbnRlcik7XG5cbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAoZCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMucmFkaXVzKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChkICsgcGFydGljbGUucmFkaXVzID49IHRoaXMucmFkaXVzKSB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIENpcmNsZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdGhhMiA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudChwYXJ0aWNsZSk7XG5cbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcbiAgICBjb25zdCBvbGR4ID0gcGFydGljbGUudi54O1xuICAgIGNvbnN0IG9sZHkgPSBwYXJ0aWNsZS52Lnk7XG5cbiAgICBwYXJ0aWNsZS52LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHBhcnRpY2xlLnYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG4gIH1cblxuICBnZXRHcmFkaWVudChwYXJ0aWNsZSkge1xuICAgIHJldHVybiAtTWF0aFV0aWwuUElfMiArIE1hdGguYXRhbjIocGFydGljbGUucC55IC0gdGhpcy5jZW50ZXIueSwgcGFydGljbGUucC54IC0gdGhpcy5jZW50ZXIueCk7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIC8vIHBhcnRpY2xlIGRlYWQgem9uZVxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGJvdW5kIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBjcm9zcyB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCAmJiBwYXJ0aWNsZS52LnggPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoICYmIHBhcnRpY2xlLnYueCA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAmJiBwYXJ0aWNsZS52LnkgPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQgJiYgcGFydGljbGUudi55ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXNldChpbWFnZURhdGEsIHgsIHksIGQpO1xuICB9XG5cbiAgcmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBpbWFnZURhdGE7XG4gICAgdGhpcy54ID0gVXRpbC5pbml0VmFsdWUoeCwgMCk7XG4gICAgdGhpcy55ID0gVXRpbC5pbml0VmFsdWUoeSwgMCk7XG4gICAgdGhpcy5kID0gVXRpbC5pbml0VmFsdWUoZCwgMik7XG5cbiAgICB0aGlzLnZlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNldFZlY3RvcnMoKTtcbiAgfVxuXG4gIHNldFZlY3RvcnMoKSB7XG4gICAgbGV0IGksIGo7XG4gICAgY29uc3QgbGVuZ3RoMSA9IHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGxlbmd0aDIgPSB0aGlzLmltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSArPSB0aGlzLmQpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGgyOyBqICs9IHRoaXMuZCkge1xuICAgICAgICBsZXQgaW5kZXggPSAoKGogPj4gMCkgKiBsZW5ndGgxICsgKGkgPj4gMCkpICogNDtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkge1xuICAgICAgICAgIHRoaXMudmVjdG9ycy5wdXNoKHsgeDogaSArIHRoaXMueCwgeTogaiArIHRoaXMueSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldEJvdW5kKHgsIHkpIHtcbiAgICBjb25zdCBpbmRleCA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB2ZWN0b3IgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy52ZWN0b3JzKTtcbiAgICByZXR1cm4gdGhpcy52ZWN0b3IuY29weSh2ZWN0b3IpO1xuICB9XG5cbiAgZ2V0Q29sb3IoeCwgeSkge1xuICAgIHggLT0gdGhpcy54O1xuICAgIHkgLT0gdGhpcy55O1xuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogdGhpcy5pbWFnZURhdGEuZGF0YVtpXSxcbiAgICAgIGc6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDFdLFxuICAgICAgYjogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMl0sXG4gICAgICBhOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAzXVxuICAgIH07XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIHBhcnRpY2xlLmRlYWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLnYubmVnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4uL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi4vem9uZS9SZWN0Wm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCBmdW5jKSB7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsICgpID0+IGZ1bmMoKSk7XG4gIH0sXG5cbiAgZ2V0U3R5bGUoY29sb3IgPSBcIiNmZjAwMDBcIikge1xuICAgIGNvbnN0IHJnYiA9IENvbG9yVXRpbC5oZXhUb1JnYihjb2xvcik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cmdiLnJ9LCAke3JnYi5nfSwgJHtyZ2IuYn0sIDAuNSlgO1xuICB9LFxuXG4gIGRyYXdab25lKHByb3RvbiwgY2FudmFzLCB6b25lLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBpZiAoem9uZSBpbnN0YW5jZW9mIFBvaW50Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBMaW5lWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHpvbmUueDEsIHpvbmUueTEpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyh6b25lLngyLCB6b25lLnkyKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIFJlY3Rab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5kcmF3UmVjdCh6b25lLngsIHpvbmUueSwgem9uZS53aWR0aCwgem9uZS5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgQ2lyY2xlWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCB6b25lLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRyYXdFbWl0dGVyKHByb3RvbiwgY2FudmFzLCBlbWl0dGVyLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgIGNvbnRleHQuYXJjKGVtaXR0ZXIucC54LCBlbWl0dGVyLnAueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgUG9vbCBmcm9tIFwiLi9jb3JlL1Bvb2xcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0MyBmcm9tIFwiLi9tYXRoL01hdDNcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuL21hdGgvU3BhblwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4vbWF0aC9lYXNlXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTGlmZSBmcm9tIFwiLi9pbml0aWFsaXplL0xpZmVcIjtcbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi9pbml0aWFsaXplL1Bvc2l0aW9uXCI7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9WZWxvY2l0eVwiO1xuaW1wb3J0IE1hc3MgZnJvbSBcIi4vaW5pdGlhbGl6ZS9NYXNzXCI7XG5pbXBvcnQgUmFkaXVzIGZyb20gXCIuL2luaXRpYWxpemUvUmFkaXVzXCI7XG5pbXBvcnQgQm9keSBmcm9tIFwiLi9pbml0aWFsaXplL0JvZHlcIjtcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9iZWhhdmlvdXIvQmVoYXZpb3VyXCI7XG5pbXBvcnQgRm9yY2UgZnJvbSBcIi4vYmVoYXZpb3VyL0ZvcmNlXCI7XG5pbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQXR0cmFjdGlvblwiO1xuaW1wb3J0IFJhbmRvbURyaWZ0IGZyb20gXCIuL2JlaGF2aW91ci9SYW5kb21EcmlmdFwiO1xuaW1wb3J0IEdyYXZpdHkgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlcIjtcbmltcG9ydCBDb2xsaXNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0NvbGxpc2lvblwiO1xuaW1wb3J0IENyb3NzWm9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3Jvc3Nab25lXCI7XG5pbXBvcnQgQWxwaGEgZnJvbSBcIi4vYmVoYXZpb3VyL0FscGhhXCI7XG5pbXBvcnQgU2NhbGUgZnJvbSBcIi4vYmVoYXZpb3VyL1NjYWxlXCI7XG5pbXBvcnQgUm90YXRlIGZyb20gXCIuL2JlaGF2aW91ci9Sb3RhdGVcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sb3JcIjtcbmltcG9ydCBDeWNsb25lIGZyb20gXCIuL2JlaGF2aW91ci9DeWNsb25lXCI7XG5pbXBvcnQgUmVwdWxzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9SZXB1bHNpb25cIjtcbmltcG9ydCBHcmF2aXR5V2VsbCBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVdlbGxcIjtcblxuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9FbWl0dGVyXCI7XG5pbXBvcnQgQmVoYXZpb3VyRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0JlaGF2aW91ckVtaXR0ZXJcIjtcbmltcG9ydCBGb2xsb3dFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRm9sbG93RW1pdHRlclwiO1xuXG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0NhbnZhc1JlbmRlcmVyXCI7XG5pbXBvcnQgRG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0RvbVJlbmRlcmVyXCI7XG5pbXBvcnQgRWFzZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRWFzZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGVsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGVsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhpUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGlSZW5kZXJlclwiO1xuaW1wb3J0IFdlYkdMUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1dlYkdMUmVuZGVyZXJcIjtcbmltcG9ydCBDdXN0b21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ3VzdG9tUmVuZGVyZXJcIjtcblxuaW1wb3J0IFpvbmUgZnJvbSBcIi4vem9uZS9ab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4vem9uZS9SZWN0Wm9uZVwiO1xuaW1wb3J0IEltYWdlWm9uZSBmcm9tIFwiLi96b25lL0ltYWdlWm9uZVwiO1xuXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4vZGVidWcvRGVidWdcIjtcblxuLy8gbmFtZXNwYWNlXG5Qcm90b24uUGFydGljbGUgPSBQYXJ0aWNsZTtcblByb3Rvbi5Qb29sID0gUG9vbDtcblxuUHJvdG9uLlV0aWwgPSBVdGlsO1xuUHJvdG9uLkNvbG9yVXRpbCA9IENvbG9yVXRpbDtcblByb3Rvbi5NYXRoVXRpbCA9IE1hdGhVdGlsO1xuUHJvdG9uLlZlY3RvcjJEID0gUHJvdG9uLlZlY3RvciA9IFZlY3RvcjJEO1xuUHJvdG9uLlBvbGFyMkQgPSBQcm90b24uUG9sYXIgPSBQb2xhcjJEO1xuUHJvdG9uLkFycmF5U3BhbiA9IEFycmF5U3BhbjtcblByb3Rvbi5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG5Qcm90b24uUmF0ZSA9IFJhdGU7XG5Qcm90b24uZWFzZSA9IGVhc2U7XG5Qcm90b24uU3BhbiA9IFNwYW47XG5Qcm90b24uTWF0MyA9IE1hdDM7XG5Qcm90b24uZ2V0U3BhbiA9IChhLCBiLCBjZW50ZXIpID0+IG5ldyBTcGFuKGEsIGIsIGNlbnRlcik7XG5Qcm90b24uY3JlYXRlQXJyYXlTcGFuID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbjtcblxuUHJvdG9uLkluaXRpYWxpemUgPSBQcm90b24uSW5pdCA9IEluaXRpYWxpemU7XG5Qcm90b24uTGlmZSA9IFByb3Rvbi5MID0gTGlmZTtcblByb3Rvbi5Qb3NpdGlvbiA9IFByb3Rvbi5QID0gUG9zaXRpb247XG5Qcm90b24uVmVsb2NpdHkgPSBQcm90b24uViA9IFZlbG9jaXR5O1xuUHJvdG9uLk1hc3MgPSBQcm90b24uTSA9IE1hc3M7XG5Qcm90b24uUmFkaXVzID0gUHJvdG9uLlIgPSBSYWRpdXM7XG5Qcm90b24uQm9keSA9IFByb3Rvbi5CID0gQm9keTtcblxuUHJvdG9uLkJlaGF2aW91ciA9IEJlaGF2aW91cjtcblByb3Rvbi5Gb3JjZSA9IFByb3Rvbi5GID0gRm9yY2U7XG5Qcm90b24uQXR0cmFjdGlvbiA9IFByb3Rvbi5BID0gQXR0cmFjdGlvbjtcblByb3Rvbi5SYW5kb21EcmlmdCA9IFByb3Rvbi5SRCA9IFJhbmRvbURyaWZ0O1xuUHJvdG9uLkdyYXZpdHkgPSBQcm90b24uRyA9IEdyYXZpdHk7XG5Qcm90b24uQ29sbGlzaW9uID0gQ29sbGlzaW9uO1xuUHJvdG9uLkNyb3NzWm9uZSA9IENyb3NzWm9uZTtcblByb3Rvbi5BbHBoYSA9IEFscGhhO1xuUHJvdG9uLlNjYWxlID0gUHJvdG9uLlMgPSBTY2FsZTtcblByb3Rvbi5Sb3RhdGUgPSBSb3RhdGU7XG5Qcm90b24uQ29sb3IgPSBDb2xvcjtcblByb3Rvbi5SZXB1bHNpb24gPSBSZXB1bHNpb247XG5Qcm90b24uQ3ljbG9uZSA9IEN5Y2xvbmU7XG5Qcm90b24uR3Jhdml0eVdlbGwgPSBHcmF2aXR5V2VsbDtcblxuUHJvdG9uLkVtaXR0ZXIgPSBFbWl0dGVyO1xuUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXIgPSBCZWhhdmlvdXJFbWl0dGVyO1xuUHJvdG9uLkZvbGxvd0VtaXR0ZXIgPSBGb2xsb3dFbWl0dGVyO1xuXG5Qcm90b24uWm9uZSA9IFpvbmU7XG5Qcm90b24uTGluZVpvbmUgPSBMaW5lWm9uZTtcblByb3Rvbi5DaXJjbGVab25lID0gQ2lyY2xlWm9uZTtcblByb3Rvbi5Qb2ludFpvbmUgPSBQb2ludFpvbmU7XG5Qcm90b24uUmVjdFpvbmUgPSBSZWN0Wm9uZTtcblByb3Rvbi5JbWFnZVpvbmUgPSBJbWFnZVpvbmU7XG5cblByb3Rvbi5DYW52YXNSZW5kZXJlciA9IENhbnZhc1JlbmRlcmVyO1xuUHJvdG9uLkRvbVJlbmRlcmVyID0gRG9tUmVuZGVyZXI7XG5Qcm90b24uRWFzZWxSZW5kZXJlciA9IEVhc2VsUmVuZGVyZXI7XG5Qcm90b24uUGl4aVJlbmRlcmVyID0gUGl4aVJlbmRlcmVyO1xuUHJvdG9uLlBpeGVsUmVuZGVyZXIgPSBQaXhlbFJlbmRlcmVyO1xuUHJvdG9uLldlYkdMUmVuZGVyZXIgPSBQcm90b24uV2ViR2xSZW5kZXJlciA9IFdlYkdMUmVuZGVyZXI7XG5Qcm90b24uQ3VzdG9tUmVuZGVyZXIgPSBDdXN0b21SZW5kZXJlcjtcblxuUHJvdG9uLkRlYnVnID0gRGVidWc7XG5VdGlsLmFzc2lnbihQcm90b24sIGVhc2UpO1xuXG4vLyBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IFByb3RvbjtcbiJdLCJuYW1lcyI6WyJpcG90IiwibGVuZ3RoIiwibmhwb3QiLCJpIiwibWFrZVRyYW5zbGF0aW9uIiwidHgiLCJ0eSIsIm1ha2VSb3RhdGlvbiIsImFuZ2xlSW5SYWRpYW5zIiwiYyIsIk1hdGgiLCJjb3MiLCJzIiwic2luIiwibWFrZVNjYWxlIiwic3giLCJzeSIsIm1hdHJpeE11bHRpcGx5IiwiYSIsImIiLCJhMDAiLCJhMDEiLCJhMDIiLCJhMTAiLCJhMTEiLCJhMTIiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMTAiLCJiMTEiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJjcmVhdGVDYW52YXMiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJjcmVhdGVEaXYiLCJyZXNpemUiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiZGl2IiwieCIsInkiLCJzY2FsZSIsInJvdGF0ZSIsIndpbGxDaGFuZ2UiLCJjc3MzIiwidHJhbnNmb3JtM2QiLCJrZXkiLCJ2YWwiLCJia2V5IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpbWdzQ2FjaGUiLCJjYW52YXNDYWNoZSIsImNhbnZhc0lkIiwiZ2V0SW1hZ2VEYXRhIiwiY29udGV4dCIsImltYWdlIiwicmVjdCIsImRyYXdJbWFnZSIsImltYWdlZGF0YSIsImNsZWFyUmVjdCIsImdldEltZ0Zyb21DYWNoZSIsImltZyIsImNhbGxiYWNrIiwicGFyYW0iLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJnZXRDYW52YXNGcm9tQ2FjaGUiLCJXZWJHTFV0aWwiLCJjYW52YXMiLCJEb21VdGlsIiwiZ2V0Q29udGV4dCIsImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZW1wdHlBcnJheSIsImFyciIsInRvQXJyYXkiLCJnZXRSYW5kRnJvbUFycmF5IiwiZmxvb3IiLCJyYW5kb20iLCJlbXB0eU9iamVjdCIsIm9iaiIsImlnbm9yZSIsImluZGV4T2YiLCJjbGFzc0FwcGx5IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiRmFjdG9yeUZ1bmMiLCJiaW5kIiwiYXBwbHkiLCJjb25jYXQiLCJJbWdVdGlsIiwiZGVzdHJveUFsbCIsImRlc3Ryb3kiLCJhc3NpZ24iLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkc01hcCIsIlB1aWQiLCJfaW5kZXgiLCJfY2FjaGUiLCJ0eXBlIiwiZ2V0SWQiLCJ1aWQiLCJnZXRJZEZyb21DYWNoZSIsImlzQm9keSIsImlzSW5uZXIiLCJnZXRUYXJnZXQiLCJQb29sIiwibnVtIiwidG90YWwiLCJjYWNoZSIsImdldCIsInBhcmFtcyIsInAiLCJfX3B1aWQiLCJwb3AiLCJjcmVhdGVPckNsb25lIiwiZXhwaXJlIiwiZ2V0Q2FjaGUiLCJwdXNoIiwiY3JlYXRlIiwiVXRpbCIsImNsb25lIiwiZ2V0Q291bnQiLCJjb3VudCIsIlN0YXRzIiwicHJvdG9uIiwiY29udGFpbmVyIiwiZW1pdHRlckluZGV4IiwicmVuZGVyZXJJbmRleCIsInVwZGF0ZSIsImJvZHkiLCJhZGQiLCJlbWl0dGVyIiwiZ2V0RW1pdHRlciIsInJlbmRlcmVyIiwiZ2V0UmVuZGVyZXIiLCJzdHIiLCJlbWl0dGVycyIsImVtaXRTcGVlZCIsImdldEVtaXR0ZXJQb3MiLCJpbml0aWFsaXplcyIsImNvbmNhdEFyciIsImJlaGF2aW91cnMiLCJuYW1lIiwiZ2V0Q3JlYXRlZE51bWJlciIsInBvb2wiLCJpbm5lckhUTUwiLCJjc3NUZXh0Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZyIsImNvbG9yIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwicmVuZGVyZXJzIiwicmVzdWx0IiwiY3Bvb2wiLCJyb3VuZCIsInJlbW92ZUNoaWxkIiwiRXZlbnREaXNwYXRjaGVyIiwiX2xpc3RlbmVycyIsImRpc3BhdGNoRXZlbnQiLCJoYXNFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzIiwibGlzdGVuZXIiLCJzcGxpY2UiLCJsaXN0ZW5lcnMiLCJoYW5kbGVyIiwiUEkiLCJJTkZJTklUWSIsIkluZmluaXR5IiwiTWF0aFV0aWwiLCJQSXgyIiwiUElfMiIsIlBJXzE4MCIsIk4xODBfUEkiLCJpc0luZmluaXR5IiwicmFuZG9tQVRvQiIsImlzSW50IiwicmFuZG9tRmxvYXRpbmciLCJjZW50ZXIiLCJmIiwicmFuZG9tQ29sb3IiLCJzbGljZSIsInJhbmRvbVpvbmUiLCJkaXNwbGF5IiwiayIsImRpZ2l0cyIsInBvdyIsImRlZ3JlZVRyYW5zZm9ybSIsInRvQ29sb3IxNiIsIkludGVncmF0aW9uIiwiY2FsY3VsYXRlIiwicGFydGljbGVzIiwidGltZSIsImRhbXBpbmciLCJldWxlckludGVncmF0ZSIsInBhcnRpY2xlIiwic2xlZXAiLCJvbGQiLCJjb3B5IiwidiIsIm11bHRpcGx5U2NhbGFyIiwibWFzcyIsImNsZWFyIiwiUHJvdG9uIiwiaW50ZWdyYXRpb25UeXBlIiwibm93IiwidGhlbiIsImVsYXBzZWQiLCJzdGF0cyIsIkVVTEVSIiwiaW50ZWdyYXRvciIsIl9mcHMiLCJfaW50ZXJ2YWwiLCJERUZBVUxUX0lOVEVSVkFMIiwiYWRkUmVuZGVyZXIiLCJyZW5kZXIiLCJpbml0IiwicmVtb3ZlUmVuZGVyZXIiLCJpbmRleCIsInJlbW92ZSIsImFkZEVtaXR0ZXIiLCJwYXJlbnQiLCJFTUlUVEVSX0FEREVEIiwicmVtb3ZlRW1pdHRlciIsIkVNSVRURVJfUkVNT1ZFRCIsIlBST1RPTl9VUERBVEUiLCJVU0VfQ0xPQ0siLCJEYXRlIiwiZ2V0VGltZSIsImFtZW5kQ2hhbmdlVGFic0J1ZyIsImVtaXR0ZXJzVXBkYXRlIiwiUFJPVE9OX1VQREFURV9BRlRFUiIsImdldEFsbFBhcnRpY2xlcyIsImRlc3Ryb3lBbGxFbWl0dGVycyIsImRlc3Ryb3lPdGhlciIsInNldFRpbWVvdXQiLCJmcHMiLCJNRUFTVVJFIiwiUksyIiwiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX1VQREFURSIsIlBBUlRJQ0xFX1NMRUVQIiwiUEFSVElDTEVfREVBRCIsIlJnYiIsInIiLCJnIiwicmVzZXQiLCJoYXNQcm9wIiwic2V0UHJvcCIsInByb3BzIiwicHJvcCIsIlNwYW4iLCJnZXRTcGFuVmFsdWUiLCJzZXRWZWN0b3JWYWwiLCJjb25mIiwiZWFzZUxpbmVhciIsImVhc2VJblF1YWQiLCJlYXNlT3V0UXVhZCIsImVhc2VJbk91dFF1YWQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblNpbmUiLCJlYXNlT3V0U2luZSIsImVhc2VJbk91dFNpbmUiLCJlYXNlSW5FeHBvIiwiZWFzZU91dEV4cG8iLCJlYXNlSW5PdXRFeHBvIiwiZWFzZUluQ2lyYyIsInNxcnQiLCJlYXNlT3V0Q2lyYyIsImVhc2VJbk91dENpcmMiLCJlYXNlSW5CYWNrIiwiZWFzZU91dEJhY2siLCJlYXNlSW5PdXRCYWNrIiwiZ2V0RWFzaW5nIiwiZWFzZSIsIlZlY3RvcjJEIiwic2V0Iiwic2V0WCIsInNldFkiLCJnZXRHcmFkaWVudCIsImF0YW4yIiwidyIsImFkZFZlY3RvcnMiLCJhZGRYWSIsInN1YiIsInN1YlZlY3RvcnMiLCJkaXZpZGVTY2FsYXIiLCJuZWdhdGUiLCJkb3QiLCJsZW5ndGhTcSIsIm5vcm1hbGl6ZSIsImRpc3RhbmNlVG8iLCJkaXN0YW5jZVRvU3F1YXJlZCIsInRoYSIsImR4IiwiZHkiLCJsZXJwIiwiYWxwaGEiLCJlcXVhbHMiLCJQYXJ0aWNsZSIsImRhdGEiLCJyZ2IiLCJQcm9wVXRpbCIsImdldERpcmVjdGlvbiIsImxpZmUiLCJhZ2UiLCJkZWFkIiwic3ByaXRlIiwiZW5lcmd5IiwicmFkaXVzIiwicm90YXRpb24iLCJlYXNpbmciLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwiYXBwbHlCZWhhdmlvdXJzIiwibWF4IiwiYXBwbHlCZWhhdmlvdXIiLCJhZGRCZWhhdmlvdXIiLCJiZWhhdmlvdXIiLCJwYXJlbnRzIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJoZXhUb1JnYiIsImgiLCJoZXgxNiIsInN1YnN0cmluZyIsInBhcnNlSW50IiwicmdiVG9IZXgiLCJyYmciLCJnZXRIZXgxNkZyb21QYXJ0aWNsZSIsIk51bWJlciIsIlBvbGFyMkQiLCJhYnMiLCJzZXRSIiwic2V0VGhhIiwidG9WZWN0b3IiLCJnZXRYIiwiZ2V0WSIsIk1hdDMiLCJtYXQzIiwibWF0IiwiRmxvYXQzMkFycmF5IiwibWF0MSIsIm1hdDIiLCJtdWx0aXBseSIsImludmVyc2UiLCJkIiwibXVsdGlwbHlWZWMyIiwibSIsInZlYyIsImdldFZhbHVlIiwic2V0U3BhblZhbHVlIiwicGFuIiwiQXJyYXlTcGFuIiwiX2FyciIsImNyZWF0ZUFycmF5U3BhbiIsIlJlY3RhbmdsZSIsImJvdHRvbSIsInJpZ2h0IiwiY29udGFpbnMiLCJSYXRlIiwibnVtcGFuIiwidGltZXBhbiIsIm51bVBhbiIsInRpbWVQYW4iLCJzdGFydFRpbWUiLCJuZXh0VGltZSIsIkluaXRpYWxpemUiLCJMaWZlIiwibGlmZVBhbiIsIlpvbmUiLCJ2ZWN0b3IiLCJjcm9zc1R5cGUiLCJhbGVydCIsImdldFBvc2l0aW9uIiwiY3Jvc3NpbmciLCJQb2ludFpvbmUiLCJjb25zb2xlIiwiZXJyb3IiLCJQb3NpdGlvbiIsInpvbmUiLCJWZWxvY2l0eSIsInJwYW4iLCJ0aGFwYW4iLCJyUGFuIiwidGhhUGFuIiwibm9ybWFsaXplVmVsb2NpdHkiLCJ2ciIsInBvbGFyMmQiLCJNYXNzIiwibWFzc1BhbiIsIlJhZGl1cyIsIm9sZFJhZGl1cyIsIkJvZHkiLCJpbWFnZVRhcmdldCIsImlubmVyIiwiQmVoYXZpb3VyIiwibm9ybWFsaXplRm9yY2UiLCJmb3JjZSIsIm5vcm1hbGl6ZVZhbHVlIiwiRm9yY2UiLCJmeCIsImZ5IiwiQXR0cmFjdGlvbiIsInRhcmdldFBvc2l0aW9uIiwicmFkaXVzU3EiLCJhdHRyYWN0aW9uRm9yY2UiLCJSYW5kb21EcmlmdCIsImRyaWZ0WCIsImRyaWZ0WSIsImRlbGF5IiwicGFuRm9jZSIsIkdyYXZpdHkiLCJDb2xsaXNpb24iLCJjb2xsaXNpb25Qb29sIiwiZGVsdGEiLCJuZXdQb29sIiwib3RoZXJQYXJ0aWNsZSIsIm92ZXJsYXAiLCJ0b3RhbE1hc3MiLCJhdmVyYWdlTWFzczEiLCJhdmVyYWdlTWFzczIiLCJkaXN0YW5jZSIsIkNyb3NzWm9uZSIsIkFscGhhIiwic2FtZSIsImFscGhhQSIsImFscGhhQiIsIlNjYWxlIiwic2NhbGVBIiwic2NhbGVCIiwiUm90YXRlIiwiaW5mbHVlbmNlIiwicm90YXRpb25BIiwicm90YXRpb25CIiwiQ29sb3IiLCJjb2xvckEiLCJDb2xvclV0aWwiLCJjb2xvckIiLCJDSEFOR0lORyIsIkN5Y2xvbmUiLCJhbmdsZSIsInNldEFuZ2xlQW5kRm9yY2UiLCJzcGFuIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJjYW5nbGUiLCJjeWNsb25lIiwiZ3JhZGllbnQiLCJSZXB1bHNpb24iLCJHcmF2aXR5V2VsbCIsImNlbnRlclBvaW50IiwiZGlzdGFuY2VWZWMiLCJkaXN0YW5jZVNxIiwiZmFjdG9yIiwiYmluZEVtaXR0ZXIiLCJFbWl0dGVyIiwiZW1pdFRpbWUiLCJ0b3RhbFRpbWUiLCJyYXRlIiwiZW1pdCIsInN0b3BlZCIsImlzTmFOIiwic3RvcCIsInByZUVtaXQiLCJvbGRTdG9wZWQiLCJvbGRFbWl0VGltZSIsIm9sZFRvdGFsVGltZSIsInN0ZXAiLCJyZW1vdmVBbGxQYXJ0aWNsZXMiLCJhZGRTZWxmSW5pdGlhbGl6ZSIsImluaXRBbGwiLCJhZGRJbml0aWFsaXplIiwicmVzdCIsInJlbW92ZUluaXRpYWxpemUiLCJpbml0aWFsaXplciIsInJlbW92ZUFsbEluaXRpYWxpemVycyIsImFyZ3VtZW50cyIsImVtaXR0aW5nIiwiaW50ZWdyYXRlIiwiZGlzcGF0Y2giLCJldmVudCIsImJpbmRFdmVudCIsImNyZWF0ZVBhcnRpY2xlIiwic2V0dXBQYXJ0aWNsZSIsIkluaXRpYWxpemVVdGlsIiwiQmVoYXZpb3VyRW1pdHRlciIsInNlbGZCZWhhdmlvdXJzIiwiYWRkU2VsZkJlaGF2aW91ciIsInJlbW92ZVNlbGZCZWhhdmlvdXIiLCJGb2xsb3dFbWl0dGVyIiwibW91c2VUYXJnZXQiLCJ3aW5kb3ciLCJfYWxsb3dFbWl0dGluZyIsImluaXRFdmVudEhhbmRsZXIiLCJtb3VzZW1vdmVIYW5kbGVyIiwibW91c2Vtb3ZlIiwibW91c2Vkb3duSGFuZGxlciIsIm1vdXNlZG93biIsIm1vdXNldXBIYW5kbGVyIiwibW91c2V1cCIsImxheWVyWCIsImxheWVyWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiaXNJbWFnZSIsIl9faXNJbWFnZSIsInRhZ05hbWUiLCJub2RlTmFtZSIsImlzU3RyaW5nIiwiQmFzZVJlbmRlcmVyIiwiZWxlbWVudCIsInN0cm9rZSIsImNpcmNsZUNvbmYiLCJpc0NpcmNsZSIsInNldFN0cm9rZSIsInRoaW5rbmVzcyIsIl9wcm90b25VcGRhdGVIYW5kbGVyIiwib25Qcm90b25VcGRhdGUiLCJfcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyIiwib25Qcm90b25VcGRhdGVBZnRlciIsIl9lbWl0dGVyQWRkZWRIYW5kbGVyIiwib25FbWl0dGVyQWRkZWQiLCJfZW1pdHRlclJlbW92ZWRIYW5kbGVyIiwib25FbWl0dGVyUmVtb3ZlZCIsIl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyIiwib25QYXJ0aWNsZUNyZWF0ZWQiLCJfcGFydGljbGVVcGRhdGVIYW5kbGVyIiwib25QYXJ0aWNsZVVwZGF0ZSIsIl9wYXJ0aWNsZURlYWRIYW5kbGVyIiwib25QYXJ0aWNsZURlYWQiLCJDYW52YXNSZW5kZXJlciIsImJ1ZmZlckNhY2hlIiwiYWRkSW1nMkJvZHkiLCJUeXBlcyIsImRyYXdDaXJjbGUiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJidWZDb250ZXh0IiwiZ2xvYmFsQWxwaGEiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyZXN0b3JlIiwiYmVnaW5QYXRoIiwiYXJjIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJjbG9zZVBhdGgiLCJmaWxsIiwic2l6ZSIsIkRvbVJlbmRlcmVyIiwiY3JlYXRlQm9keSIsImJvZHlSZWFkeSIsImJhY2tncm91bmRDb2xvciIsImNyZWF0ZUNpcmNsZSIsImNyZWF0ZVNwcml0ZSIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJ1cmwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJFYXNlbFJlbmRlcmVyIiwiYWRkQ2hpbGQiLCJzY2FsZVgiLCJzY2FsZVkiLCJncmFwaGljcyIsInJlZ1giLCJyZWdZIiwiY3JlYXRlanMiLCJHcmFwaGljcyIsImJlZ2luU3Ryb2tlIiwiYmVnaW5GaWxsIiwic2hhcGUiLCJTaGFwZSIsIlBpeGVsUmVuZGVyZXIiLCJyZWN0YW5nbGUiLCJpbWFnZURhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJwdXRJbWFnZURhdGEiLCJzZXRQaXhlbCIsImVsZW1lbnR3aWR0aCIsIlBJWElDbGFzcyIsIlBpeGlSZW5kZXJlciIsInNldENvbG9yIiwiYmxlbmRNb2RlIiwic2V0UElYSSIsIlBJWEkiLCJTcHJpdGUiLCJjcmVhdGVGcm9tSW1hZ2UiLCJmcm9tIiwiZnJvbUltYWdlIiwidGludCIsImFuY2hvciIsImVuZEZpbGwiLCJNU3RhY2siLCJtYXRzIiwidG9wIiwiV2ViR0xSZW5kZXJlciIsImdsIiwiYW50aWFsaWFzIiwic3RlbmNpbCIsImRlcHRoIiwiaW5pdFZhciIsInNldE1heFJhZGl1cyIsImluaXRTaGFkZXJzIiwiaW5pdEJ1ZmZlcnMiLCJibGVuZEVxdWF0aW9uIiwiRlVOQ19BREQiLCJibGVuZEZ1bmMiLCJTUkNfQUxQSEEiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiZW5hYmxlIiwiQkxFTkQiLCJ1bWF0Iiwic21hdCIsIm1zdGFjayIsInZpZXdwb3J0IiwiY2lyY2xlQ2FudmFzVVJMIiwiZ2V0VmVydGV4U2hhZGVyIiwidnNTb3VyY2UiLCJnZXRGcmFnbWVudFNoYWRlciIsImZzU291cmNlIiwidGV4dHVyZWJ1ZmZlcnMiLCJBIiwiQiIsImdldFNoYWRlciIsImZzIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJmcmFnbWVudFNoYWRlciIsInZlcnRleFNoYWRlciIsInNwcm9ncmFtIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwidXNlUHJvZ3JhbSIsInZwYSIsImdldEF0dHJpYkxvY2F0aW9uIiwidGNhIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ0TWF0VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInNhbXBsZXJVbmlmb3JtIiwidXNlVGV4IiwidW5pZm9ybTFpIiwidnMiLCJpZHgiLCJ1bml0SUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJVaW50MTZBcnJheSIsIlNUQVRJQ19EUkFXIiwiaWRzIiwidW5pdEkzMyIsInN0cmlwQnVmZmVyIiwicmFpZHVzIiwiY2lyY2xlQ2FudmFzUmFkaXVzIiwidG9EYXRhVVJMIiwiZHJhd0ltZzJDYW52YXMiLCJfdyIsIl9oIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiY3JlYXRlVGV4dHVyZSIsInRleHR1cmUiLCJ2Y0J1ZmZlciIsInRjQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4SW1hZ2UyRCIsIlJHQkEiLCJVTlNJR05FRF9CWVRFIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIkxJTkVBUiIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIiwidGV4dHVyZUxvYWRlZCIsInRleHR1cmVXaWR0aCIsInRleHR1cmVIZWlnaHQiLCJ0bWF0IiwiaW1hdCIsIm9sZFNjYWxlIiwidXBkYXRlTWF0cml4IiwidW5pZm9ybTNmIiwidW5pZm9ybU1hdHJpeDNmdiIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsImRyYXdFbGVtZW50cyIsIlRSSUFOR0xFUyIsIlVOU0lHTkVEX1NIT1JUIiwibW92ZU9yaWdpbk1hdHJpeCIsInRyYW5zbGF0aW9uTWF0cml4IiwiYW5nZWwiLCJyb3RhdGlvbk1hdHJpeCIsInNjYWxlTWF0cml4IiwibWF0cml4IiwiQ3VzdG9tUmVuZGVyZXIiLCJMaW5lWm9uZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiZGlyZWN0aW9uIiwibWlueCIsIm1pbiIsIm1pbnkiLCJtYXh4IiwibWF4eSIsInh4eXkiLCJnZXRMZW5ndGgiLCJDIiwiRCIsImdldERpc3RhbmNlIiwiZ2V0U3ltbWV0cmljIiwidGhhMiIsInRoYTEiLCJvbGR4Iiwib2xkeSIsInJhbmdlT3V0IiwiQ2lyY2xlWm9uZSIsInJhbmRvbVJhZGl1cyIsInNldENlbnRlciIsIlJlY3Rab25lIiwiSW1hZ2Vab25lIiwidmVjdG9ycyIsInNldFZlY3RvcnMiLCJqIiwibGVuZ3RoMSIsImxlbmd0aDIiLCJnZXRCb3VuZCIsImdldENvbG9yIiwiZnVuYyIsImdldFN0eWxlIiwiZHJhd1pvbmUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJkcmF3UmVjdCIsImRyYXdFbWl0dGVyIiwiVmVjdG9yIiwiUG9sYXIiLCJnZXRTcGFuIiwiSW5pdCIsIkwiLCJQIiwiViIsIk0iLCJSIiwiRiIsIlJEIiwiRyIsIlMiLCJXZWJHbFJlbmRlcmVyIiwiRGVidWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUEsRUFBQUEsSUFaYSxnQkFZUkMsTUFaUSxFQVlBO0VBQ1gsV0FBTyxDQUFDQSxNQUFNLEdBQUlBLE1BQU0sR0FBRyxDQUFwQixNQUE0QixDQUFuQztFQUNELEdBZFk7O0VBZ0JiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUMsRUFBQUEsS0EzQmEsaUJBMkJQRCxNQTNCTyxFQTJCQztFQUNaLE1BQUVBLE1BQUY7O0VBQ0EsU0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEtBQUssQ0FBOUIsRUFBaUM7RUFDL0JGLE1BQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFJQSxNQUFNLElBQUlFLENBQTdCO0VBQ0Q7O0VBRUQsV0FBT0YsTUFBTSxHQUFHLENBQWhCO0VBQ0QsR0FsQ1k7O0VBb0NiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VHLEVBQUFBLGVBakRhLDJCQWlER0MsRUFqREgsRUFpRE9DLEVBakRQLEVBaURXO0VBQ3RCLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQkQsRUFBbkIsRUFBdUJDLEVBQXZCLEVBQTJCLENBQTNCLENBQVA7RUFDRCxHQW5EWTs7RUFxRGI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFQyxFQUFBQSxZQWhFYSx3QkFnRUFDLGNBaEVBLEVBZ0VnQjtFQUMzQixRQUFJQyxDQUFDLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxjQUFULENBQVI7RUFDQSxRQUFJSSxDQUFDLEdBQUdGLElBQUksQ0FBQ0csR0FBTCxDQUFTTCxjQUFULENBQVI7RUFFQSxXQUFPLENBQUNDLENBQUQsRUFBSSxDQUFDRyxDQUFMLEVBQVEsQ0FBUixFQUFXQSxDQUFYLEVBQWNILENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBUDtFQUNELEdBckVZOztFQXVFYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFSyxFQUFBQSxTQXBGYSxxQkFvRkhDLEVBcEZHLEVBb0ZDQyxFQXBGRCxFQW9GSztFQUNoQixXQUFPLENBQUNELEVBQUQsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFXLENBQVgsRUFBY0MsRUFBZCxFQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixDQUFQO0VBQ0QsR0F0Rlk7O0VBd0ZiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLGNBckdhLDBCQXFHRUMsQ0FyR0YsRUFxR0tDLENBckdMLEVBcUdRO0VBQ25CLFFBQUlDLEdBQUcsR0FBR0YsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlHLEdBQUcsR0FBR0gsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlJLEdBQUcsR0FBR0osQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlLLEdBQUcsR0FBR0wsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlNLEdBQUcsR0FBR04sQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlPLEdBQUcsR0FBR1AsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlRLEdBQUcsR0FBR1IsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlTLEdBQUcsR0FBR1QsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlVLEdBQUcsR0FBR1YsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlXLEdBQUcsR0FBR1YsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlXLEdBQUcsR0FBR1gsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlZLEdBQUcsR0FBR1osQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlhLEdBQUcsR0FBR2IsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUljLEdBQUcsR0FBR2QsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUllLEdBQUcsR0FBR2YsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUNBLFFBQUlnQixHQUFHLEdBQUdoQixDQUFDLENBQUMsSUFBSSxDQUFKLEdBQVEsQ0FBVCxDQUFYO0VBQ0EsUUFBSWlCLEdBQUcsR0FBR2pCLENBQUMsQ0FBQyxJQUFJLENBQUosR0FBUSxDQUFULENBQVg7RUFDQSxRQUFJa0IsR0FBRyxHQUFHbEIsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWDtFQUVBLFdBQU8sQ0FDTEMsR0FBRyxHQUFHUyxHQUFOLEdBQVlSLEdBQUcsR0FBR1csR0FBbEIsR0FBd0JWLEdBQUcsR0FBR2EsR0FEekIsRUFFTGYsR0FBRyxHQUFHVSxHQUFOLEdBQVlULEdBQUcsR0FBR1ksR0FBbEIsR0FBd0JYLEdBQUcsR0FBR2MsR0FGekIsRUFHTGhCLEdBQUcsR0FBR1csR0FBTixHQUFZVixHQUFHLEdBQUdhLEdBQWxCLEdBQXdCWixHQUFHLEdBQUdlLEdBSHpCLEVBSUxkLEdBQUcsR0FBR00sR0FBTixHQUFZTCxHQUFHLEdBQUdRLEdBQWxCLEdBQXdCUCxHQUFHLEdBQUdVLEdBSnpCLEVBS0xaLEdBQUcsR0FBR08sR0FBTixHQUFZTixHQUFHLEdBQUdTLEdBQWxCLEdBQXdCUixHQUFHLEdBQUdXLEdBTHpCLEVBTUxiLEdBQUcsR0FBR1EsR0FBTixHQUFZUCxHQUFHLEdBQUdVLEdBQWxCLEdBQXdCVCxHQUFHLEdBQUdZLEdBTnpCLEVBT0xYLEdBQUcsR0FBR0csR0FBTixHQUFZRixHQUFHLEdBQUdLLEdBQWxCLEdBQXdCSixHQUFHLEdBQUdPLEdBUHpCLEVBUUxULEdBQUcsR0FBR0ksR0FBTixHQUFZSCxHQUFHLEdBQUdNLEdBQWxCLEdBQXdCTCxHQUFHLEdBQUdRLEdBUnpCLEVBU0xWLEdBQUcsR0FBR0ssR0FBTixHQUFZSixHQUFHLEdBQUdPLEdBQWxCLEdBQXdCTixHQUFHLEdBQUdTLEdBVHpCLENBQVA7RUFXRDtFQXBJWSxDQUFmOztBQ0FBLGdCQUFlO0VBQ2I7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUMsRUFBQUEsWUFkYSx3QkFjQUMsRUFkQSxFQWNJQyxLQWRKLEVBY1dDLE1BZFgsRUFjbUJDLFFBZG5CLEVBYzBDO0VBQUEsUUFBdkJBLFFBQXVCO0VBQXZCQSxNQUFBQSxRQUF1QixHQUFaLFVBQVk7RUFBQTs7RUFDckQsUUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBWjtFQUVBRixJQUFBQSxHQUFHLENBQUNKLEVBQUosR0FBU0EsRUFBVDtFQUNBSSxJQUFBQSxHQUFHLENBQUNILEtBQUosR0FBWUEsS0FBWjtFQUNBRyxJQUFBQSxHQUFHLENBQUNGLE1BQUosR0FBYUEsTUFBYjtFQUNBRSxJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVUMsT0FBVixHQUFvQixDQUFwQjtFQUNBSixJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVUosUUFBVixHQUFxQkEsUUFBckI7RUFDQSxTQUFLTSxTQUFMLENBQWVMLEdBQWYsRUFBb0IsQ0FBQyxHQUFyQixFQUEwQixDQUFDLEdBQTNCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DO0VBRUEsV0FBT0EsR0FBUDtFQUNELEdBekJZO0VBMkJiTSxFQUFBQSxTQTNCYSxxQkEyQkhWLEVBM0JHLEVBMkJDQyxLQTNCRCxFQTJCUUMsTUEzQlIsRUEyQmdCO0VBQzNCLFFBQU1FLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQVo7RUFFQUYsSUFBQUEsR0FBRyxDQUFDSixFQUFKLEdBQVNBLEVBQVQ7RUFDQUksSUFBQUEsR0FBRyxDQUFDRyxLQUFKLENBQVVKLFFBQVYsR0FBcUIsVUFBckI7RUFDQSxTQUFLUSxNQUFMLENBQVlQLEdBQVosRUFBaUJILEtBQWpCLEVBQXdCQyxNQUF4QjtFQUVBLFdBQU9FLEdBQVA7RUFDRCxHQW5DWTtFQXFDYk8sRUFBQUEsTUFyQ2Esa0JBcUNOUCxHQXJDTSxFQXFDREgsS0FyQ0MsRUFxQ01DLE1BckNOLEVBcUNjO0VBQ3pCRSxJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVU4sS0FBVixHQUFrQkEsS0FBSyxHQUFHLElBQTFCO0VBQ0FHLElBQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVTCxNQUFWLEdBQW1CQSxNQUFNLEdBQUcsSUFBNUI7RUFDQUUsSUFBQUEsR0FBRyxDQUFDRyxLQUFKLENBQVVLLFVBQVYsR0FBdUIsQ0FBQ1gsS0FBRCxHQUFTLENBQVQsR0FBYSxJQUFwQztFQUNBRyxJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVU0sU0FBVixHQUFzQixDQUFDWCxNQUFELEdBQVUsQ0FBVixHQUFjLElBQXBDO0VBQ0QsR0ExQ1k7O0VBNENiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFTyxFQUFBQSxTQXhEYSxxQkF3REhLLEdBeERHLEVBd0RFQyxDQXhERixFQXdES0MsQ0F4REwsRUF3RFFDLEtBeERSLEVBd0RlQyxNQXhEZixFQXdEdUI7RUFDbENKLElBQUFBLEdBQUcsQ0FBQ1AsS0FBSixDQUFVWSxVQUFWLEdBQXVCLFdBQXZCO0VBQ0EsUUFBTVYsU0FBUyxrQkFBZ0JNLENBQWhCLFlBQXdCQyxDQUF4QixrQkFBc0NDLEtBQXRDLGlCQUF1REMsTUFBdkQsU0FBZjtFQUNBLFNBQUtFLElBQUwsQ0FBVU4sR0FBVixFQUFlLFdBQWYsRUFBNEJMLFNBQTVCO0VBQ0QsR0E1RFk7RUE4RGJZLEVBQUFBLFdBOURhLHVCQThERFAsR0E5REMsRUE4RElDLENBOURKLEVBOERPQyxDQTlEUCxFQThEVUMsS0E5RFYsRUE4RGlCQyxNQTlEakIsRUE4RHlCO0VBQ3BDSixJQUFBQSxHQUFHLENBQUNQLEtBQUosQ0FBVVksVUFBVixHQUF1QixXQUF2QjtFQUNBLFFBQU1WLFNBQVMsb0JBQWtCTSxDQUFsQixZQUEwQkMsQ0FBMUIscUJBQTJDQyxLQUEzQyxpQkFBNERDLE1BQTVELFNBQWY7RUFDQSxTQUFLRSxJQUFMLENBQVVOLEdBQVYsRUFBZSxvQkFBZixFQUFxQyxRQUFyQztFQUNBLFNBQUtNLElBQUwsQ0FBVU4sR0FBVixFQUFlLFdBQWYsRUFBNEJMLFNBQTVCO0VBQ0QsR0FuRVk7RUFxRWJXLEVBQUFBLElBckVhLGdCQXFFUk4sR0FyRVEsRUFxRUhRLEdBckVHLEVBcUVFQyxHQXJFRixFQXFFTztFQUNsQixRQUFNQyxJQUFJLEdBQUdGLEdBQUcsQ0FBQ0csTUFBSixDQUFXLENBQVgsRUFBY0MsV0FBZCxLQUE4QkosR0FBRyxDQUFDSyxNQUFKLENBQVcsQ0FBWCxDQUEzQztFQUVBYixJQUFBQSxHQUFHLENBQUNQLEtBQUosWUFBbUJpQixJQUFuQixJQUE2QkQsR0FBN0I7RUFDQVQsSUFBQUEsR0FBRyxDQUFDUCxLQUFKLFNBQWdCaUIsSUFBaEIsSUFBMEJELEdBQTFCO0VBQ0FULElBQUFBLEdBQUcsQ0FBQ1AsS0FBSixPQUFjaUIsSUFBZCxJQUF3QkQsR0FBeEI7RUFDQVQsSUFBQUEsR0FBRyxDQUFDUCxLQUFKLFFBQWVpQixJQUFmLElBQXlCRCxHQUF6QjtFQUNBVCxJQUFBQSxHQUFHLENBQUNQLEtBQUosTUFBYWUsR0FBYixJQUFzQkMsR0FBdEI7RUFDRDtFQTdFWSxDQUFmOztFQ0dBLElBQU1LLFNBQVMsR0FBRyxFQUFsQjtFQUNBLElBQU1DLFdBQVcsR0FBRyxFQUFwQjtFQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBRUEsZ0JBQWU7RUFDYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFQyxFQUFBQSxZQVhhLHdCQVdBQyxPQVhBLEVBV1NDLEtBWFQsRUFXZ0JDLElBWGhCLEVBV3NCO0VBQ2pDRixJQUFBQSxPQUFPLENBQUNHLFNBQVIsQ0FBa0JGLEtBQWxCLEVBQXlCQyxJQUFJLENBQUNuQixDQUE5QixFQUFpQ21CLElBQUksQ0FBQ2xCLENBQXRDO0VBQ0EsUUFBTW9CLFNBQVMsR0FBR0osT0FBTyxDQUFDRCxZQUFSLENBQXFCRyxJQUFJLENBQUNuQixDQUExQixFQUE2Qm1CLElBQUksQ0FBQ2xCLENBQWxDLEVBQXFDa0IsSUFBSSxDQUFDakMsS0FBMUMsRUFBaURpQyxJQUFJLENBQUNoQyxNQUF0RCxDQUFsQjtFQUNBOEIsSUFBQUEsT0FBTyxDQUFDSyxTQUFSLENBQWtCSCxJQUFJLENBQUNuQixDQUF2QixFQUEwQm1CLElBQUksQ0FBQ2xCLENBQS9CLEVBQWtDa0IsSUFBSSxDQUFDakMsS0FBdkMsRUFBOENpQyxJQUFJLENBQUNoQyxNQUFuRDtFQUVBLFdBQU9rQyxTQUFQO0VBQ0QsR0FqQlk7O0VBbUJiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFRSxFQUFBQSxlQS9CYSwyQkErQkdDLEdBL0JILEVBK0JRQyxRQS9CUixFQStCa0JDLEtBL0JsQixFQStCeUI7RUFDcEMsUUFBTUMsR0FBRyxHQUFHLE9BQU9ILEdBQVAsS0FBZSxRQUFmLEdBQTBCQSxHQUExQixHQUFnQ0EsR0FBRyxDQUFDRyxHQUFoRDs7RUFFQSxRQUFJZCxTQUFTLENBQUNjLEdBQUQsQ0FBYixFQUFvQjtFQUNsQkYsTUFBQUEsUUFBUSxDQUFDWixTQUFTLENBQUNjLEdBQUQsQ0FBVixFQUFpQkQsS0FBakIsQ0FBUjtFQUNELEtBRkQsTUFFTztFQUNMLFVBQU1SLEtBQUssR0FBRyxJQUFJVSxLQUFKLEVBQWQ7O0VBQ0FWLE1BQUFBLEtBQUssQ0FBQ1csTUFBTixHQUFlLFVBQUFDLENBQUMsRUFBSTtFQUNsQmpCLFFBQUFBLFNBQVMsQ0FBQ2MsR0FBRCxDQUFULEdBQWlCRyxDQUFDLENBQUNDLE1BQW5CO0VBQ0FOLFFBQUFBLFFBQVEsQ0FBQ1osU0FBUyxDQUFDYyxHQUFELENBQVYsRUFBaUJELEtBQWpCLENBQVI7RUFDRCxPQUhEOztFQUtBUixNQUFBQSxLQUFLLENBQUNTLEdBQU4sR0FBWUEsR0FBWjtFQUNEO0VBQ0YsR0E3Q1k7RUErQ2JLLEVBQUFBLGtCQS9DYSw4QkErQ01SLEdBL0NOLEVBK0NXQyxRQS9DWCxFQStDcUJDLEtBL0NyQixFQStDNEI7RUFDdkMsUUFBTUMsR0FBRyxHQUFHSCxHQUFHLENBQUNHLEdBQWhCOztFQUVBLFFBQUksQ0FBQ2IsV0FBVyxDQUFDYSxHQUFELENBQWhCLEVBQXVCO0VBQ3JCLFVBQU16QyxLQUFLLEdBQUcrQyxTQUFTLENBQUNyRixLQUFWLENBQWdCNEUsR0FBRyxDQUFDdEMsS0FBcEIsQ0FBZDtFQUNBLFVBQU1DLE1BQU0sR0FBRzhDLFNBQVMsQ0FBQ3JGLEtBQVYsQ0FBZ0I0RSxHQUFHLENBQUNyQyxNQUFwQixDQUFmO0VBRUEsVUFBTStDLE1BQU0sR0FBR0MsT0FBTyxDQUFDbkQsWUFBUiwwQkFBNEMsRUFBRStCLFFBQTlDLEVBQTBEN0IsS0FBMUQsRUFBaUVDLE1BQWpFLENBQWY7RUFDQSxVQUFNOEIsT0FBTyxHQUFHaUIsTUFBTSxDQUFDRSxVQUFQLENBQWtCLElBQWxCLENBQWhCO0VBQ0FuQixNQUFBQSxPQUFPLENBQUNHLFNBQVIsQ0FBa0JJLEdBQWxCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCQSxHQUFHLENBQUN0QyxLQUFqQyxFQUF3Q3NDLEdBQUcsQ0FBQ3JDLE1BQTVDO0VBRUEyQixNQUFBQSxXQUFXLENBQUNhLEdBQUQsQ0FBWCxHQUFtQk8sTUFBbkI7RUFDRDs7RUFFRFQsSUFBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNYLFdBQVcsQ0FBQ2EsR0FBRCxDQUFaLEVBQW1CRCxLQUFuQixDQUFwQjtFQUVBLFdBQU9aLFdBQVcsQ0FBQ2EsR0FBRCxDQUFsQjtFQUNEO0VBaEVZLENBQWY7O0FDTEEsYUFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFVSxFQUFBQSxTQVZhLHFCQVVIQyxLQVZHLEVBVUlDLFFBVkosRUFVYztFQUN6QkQsSUFBQUEsS0FBSyxHQUFHQSxLQUFLLEtBQUssSUFBVixJQUFrQkEsS0FBSyxLQUFLRSxTQUE1QixHQUF3Q0YsS0FBeEMsR0FBZ0RDLFFBQXhEO0VBQ0EsV0FBT0QsS0FBUDtFQUNELEdBYlk7O0VBZWI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUcsRUFBQUEsT0F6QmEsbUJBeUJMSCxLQXpCSyxFQXlCRTtFQUNiLFdBQU9JLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCUCxLQUEvQixNQUEwQyxnQkFBakQ7RUFDRCxHQTNCWTs7RUE2QmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFUSxFQUFBQSxVQXJDYSxzQkFxQ0ZDLEdBckNFLEVBcUNHO0VBQ2QsUUFBSUEsR0FBSixFQUFTQSxHQUFHLENBQUNwRyxNQUFKLEdBQWEsQ0FBYjtFQUNWLEdBdkNZO0VBeUNicUcsRUFBQUEsT0F6Q2EsbUJBeUNMRCxHQXpDSyxFQXlDQTtFQUNYLFdBQU8sS0FBS04sT0FBTCxDQUFhTSxHQUFiLElBQW9CQSxHQUFwQixHQUEwQixDQUFDQSxHQUFELENBQWpDO0VBQ0QsR0EzQ1k7RUE2Q2JFLEVBQUFBLGdCQTdDYSw0QkE2Q0lGLEdBN0NKLEVBNkNTO0VBQ3BCLFFBQUksQ0FBQ0EsR0FBTCxFQUFVLE9BQU8sSUFBUDtFQUNWLFdBQU9BLEdBQUcsQ0FBQzNGLElBQUksQ0FBQzhGLEtBQUwsQ0FBV0gsR0FBRyxDQUFDcEcsTUFBSixHQUFhUyxJQUFJLENBQUMrRixNQUFMLEVBQXhCLENBQUQsQ0FBVjtFQUNELEdBaERZOztFQWtEYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLFdBMURhLHVCQTBEREMsR0ExREMsRUEwRElDLE1BMURKLEVBMERtQjtFQUFBLFFBQWZBLE1BQWU7RUFBZkEsTUFBQUEsTUFBZSxHQUFOLElBQU07RUFBQTs7RUFDOUIsU0FBSyxJQUFJL0MsR0FBVCxJQUFnQjhDLEdBQWhCLEVBQXFCO0VBQ25CLFVBQUlDLE1BQU0sSUFBSUEsTUFBTSxDQUFDQyxPQUFQLENBQWVoRCxHQUFmLElBQXNCLENBQUMsQ0FBckMsRUFBd0M7RUFDeEMsYUFBTzhDLEdBQUcsQ0FBQzlDLEdBQUQsQ0FBVjtFQUNEO0VBQ0YsR0EvRFk7O0VBaUViO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRWlELEVBQUFBLFVBNUVhLHNCQTRFRkMsV0E1RUUsRUE0RVdDLElBNUVYLEVBNEV3QjtFQUFBLFFBQWJBLElBQWE7RUFBYkEsTUFBQUEsSUFBYSxHQUFOLElBQU07RUFBQTs7RUFDbkMsUUFBSSxDQUFDQSxJQUFMLEVBQVc7RUFDVCxhQUFPLElBQUlELFdBQUosRUFBUDtFQUNELEtBRkQsTUFFTztFQUNMLFVBQU1FLFdBQVcsR0FBR0YsV0FBVyxDQUFDRyxJQUFaLENBQWlCQyxLQUFqQixDQUF1QkosV0FBdkIsRUFBb0MsQ0FBQyxJQUFELEVBQU9LLE1BQVAsQ0FBY0osSUFBZCxDQUFwQyxDQUFwQjtFQUNBLGFBQU8sSUFBSUMsV0FBSixFQUFQO0VBQ0Q7RUFDRixHQW5GWTs7RUFxRmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRTNDLEVBQUFBLFlBL0ZhLHdCQStGQUMsT0EvRkEsRUErRlNDLEtBL0ZULEVBK0ZnQkMsSUEvRmhCLEVBK0ZzQjtFQUNqQyxXQUFPNEMsT0FBTyxDQUFDL0MsWUFBUixDQUFxQkMsT0FBckIsRUFBOEJDLEtBQTlCLEVBQXFDQyxJQUFyQyxDQUFQO0VBQ0QsR0FqR1k7RUFtR2I2QyxFQUFBQSxVQW5HYSxzQkFtR0ZqQixHQW5HRSxFQW1HR3JCLEtBbkdILEVBbUdpQjtFQUFBLFFBQWRBLEtBQWM7RUFBZEEsTUFBQUEsS0FBYyxHQUFOLElBQU07RUFBQTs7RUFDNUIsUUFBSTdFLENBQUMsR0FBR2tHLEdBQUcsQ0FBQ3BHLE1BQVo7O0VBRUEsV0FBT0UsQ0FBQyxFQUFSLEVBQVk7RUFDVixVQUFJO0VBQ0ZrRyxRQUFBQSxHQUFHLENBQUNsRyxDQUFELENBQUgsQ0FBT29ILE9BQVAsQ0FBZXZDLEtBQWY7RUFDRCxPQUZELENBRUUsT0FBT0ksQ0FBUCxFQUFVOztFQUVaLGFBQU9pQixHQUFHLENBQUNsRyxDQUFELENBQVY7RUFDRDs7RUFFRGtHLElBQUFBLEdBQUcsQ0FBQ3BHLE1BQUosR0FBYSxDQUFiO0VBQ0QsR0EvR1k7RUFpSGJ1SCxFQUFBQSxNQWpIYSxrQkFpSE5uQyxNQWpITSxFQWlIRW9DLE1BakhGLEVBaUhVO0VBQ3JCLFFBQUksT0FBT3pCLE1BQU0sQ0FBQ3dCLE1BQWQsS0FBeUIsVUFBN0IsRUFBeUM7RUFDdkMsV0FBSyxJQUFJM0QsR0FBVCxJQUFnQjRELE1BQWhCLEVBQXdCO0VBQ3RCLFlBQUl6QixNQUFNLENBQUNDLFNBQVAsQ0FBaUJ5QixjQUFqQixDQUFnQ3ZCLElBQWhDLENBQXFDc0IsTUFBckMsRUFBNkM1RCxHQUE3QyxDQUFKLEVBQXVEO0VBQ3JEd0IsVUFBQUEsTUFBTSxDQUFDeEIsR0FBRCxDQUFOLEdBQWM0RCxNQUFNLENBQUM1RCxHQUFELENBQXBCO0VBQ0Q7RUFDRjs7RUFFRCxhQUFPd0IsTUFBUDtFQUNELEtBUkQsTUFRTztFQUNMLGFBQU9XLE1BQU0sQ0FBQ3dCLE1BQVAsQ0FBY25DLE1BQWQsRUFBc0JvQyxNQUF0QixDQUFQO0VBQ0Q7RUFDRjtFQTdIWSxDQUFmOztFQ0ZBLElBQU1FLE1BQU0sR0FBRyxFQUFmO0VBRUEsSUFBTUMsSUFBSSxHQUFHO0VBQ1hDLEVBQUFBLE1BQU0sRUFBRSxDQURHO0VBRVhDLEVBQUFBLE1BQU0sRUFBRSxFQUZHO0VBSVh2RixFQUFBQSxFQUpXLGNBSVJ3RixJQUpRLEVBSUY7RUFDUCxRQUFJSixNQUFNLENBQUNJLElBQUQsQ0FBTixLQUFpQmpDLFNBQWpCLElBQThCNkIsTUFBTSxDQUFDSSxJQUFELENBQU4sS0FBaUIsSUFBbkQsRUFBeURKLE1BQU0sQ0FBQ0ksSUFBRCxDQUFOLEdBQWUsQ0FBZjtFQUN6RCxXQUFVQSxJQUFWLFNBQWtCSixNQUFNLENBQUNJLElBQUQsQ0FBTixFQUFsQjtFQUNELEdBUFU7RUFTWEMsRUFBQUEsS0FUVyxpQkFTTDNDLE1BVEssRUFTRztFQUNaLFFBQUk0QyxHQUFHLEdBQUcsS0FBS0MsY0FBTCxDQUFvQjdDLE1BQXBCLENBQVY7RUFDQSxRQUFJNEMsR0FBSixFQUFTLE9BQU9BLEdBQVA7RUFFVEEsSUFBQUEsR0FBRyxhQUFXLEtBQUtKLE1BQUwsRUFBZDtFQUNBLFNBQUtDLE1BQUwsQ0FBWUcsR0FBWixJQUFtQjVDLE1BQW5CO0VBQ0EsV0FBTzRDLEdBQVA7RUFDRCxHQWhCVTtFQWtCWEMsRUFBQUEsY0FsQlcsMEJBa0JJN0MsTUFsQkosRUFrQlk7RUFDckIsUUFBSXNCLEdBQUosRUFBU3BFLEVBQVQ7O0VBRUEsU0FBS0EsRUFBTCxJQUFXLEtBQUt1RixNQUFoQixFQUF3QjtFQUN0Qm5CLE1BQUFBLEdBQUcsR0FBRyxLQUFLbUIsTUFBTCxDQUFZdkYsRUFBWixDQUFOO0VBRUEsVUFBSW9FLEdBQUcsS0FBS3RCLE1BQVosRUFBb0IsT0FBTzlDLEVBQVA7RUFDcEIsVUFBSSxLQUFLNEYsTUFBTCxDQUFZeEIsR0FBWixFQUFpQnRCLE1BQWpCLEtBQTRCc0IsR0FBRyxDQUFDMUIsR0FBSixLQUFZSSxNQUFNLENBQUNKLEdBQW5ELEVBQXdELE9BQU8xQyxFQUFQO0VBQ3pEOztFQUVELFdBQU8sSUFBUDtFQUNELEdBN0JVO0VBK0JYNEYsRUFBQUEsTUEvQlcsa0JBK0JKeEIsR0EvQkksRUErQkN0QixNQS9CRCxFQStCUztFQUNsQixXQUFPLE9BQU9zQixHQUFQLEtBQWUsUUFBZixJQUEyQixPQUFPdEIsTUFBUCxLQUFrQixRQUE3QyxJQUF5RHNCLEdBQUcsQ0FBQ3lCLE9BQTdELElBQXdFL0MsTUFBTSxDQUFDK0MsT0FBdEY7RUFDRCxHQWpDVTtFQW1DWEMsRUFBQUEsU0FuQ1cscUJBbUNESixHQW5DQyxFQW1DSTtFQUNiLFdBQU8sS0FBS0gsTUFBTCxDQUFZRyxHQUFaLENBQVA7RUFDRDtFQXJDVSxDQUFiOztFQ0ZBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztNQUlxQks7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLGdCQUFZQyxHQUFaLEVBQWlCO0VBQ2YsU0FBS0MsS0FBTCxHQUFhLENBQWI7RUFDQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRUMsTUFBQSxhQUFJckQsTUFBSixFQUFZc0QsTUFBWixFQUFvQlYsR0FBcEIsRUFBeUI7RUFDdkIsUUFBSVcsQ0FBSjtFQUNBWCxJQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSTVDLE1BQU0sQ0FBQ3dELE1BQWQsSUFBd0JqQixJQUFJLENBQUNJLEtBQUwsQ0FBVzNDLE1BQVgsQ0FBOUI7O0VBRUEsUUFBSSxLQUFLb0QsS0FBTCxDQUFXUixHQUFYLEtBQW1CLEtBQUtRLEtBQUwsQ0FBV1IsR0FBWCxFQUFnQmhJLE1BQWhCLEdBQXlCLENBQWhELEVBQW1EO0VBQ2pEMkksTUFBQUEsQ0FBQyxHQUFHLEtBQUtILEtBQUwsQ0FBV1IsR0FBWCxFQUFnQmEsR0FBaEIsRUFBSjtFQUNELEtBRkQsTUFFTztFQUNMRixNQUFBQSxDQUFDLEdBQUcsS0FBS0csYUFBTCxDQUFtQjFELE1BQW5CLEVBQTJCc0QsTUFBM0IsQ0FBSjtFQUNEOztFQUVEQyxJQUFBQSxDQUFDLENBQUNDLE1BQUYsR0FBV3hELE1BQU0sQ0FBQ3dELE1BQVAsSUFBaUJaLEdBQTVCO0VBQ0EsV0FBT1csQ0FBUDtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFSSxTQUFBLGdCQUFPM0QsTUFBUCxFQUFlO0VBQ2IsV0FBTyxLQUFLNEQsUUFBTCxDQUFjNUQsTUFBTSxDQUFDd0QsTUFBckIsRUFBNkJLLElBQTdCLENBQWtDN0QsTUFBbEMsQ0FBUDtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFMEQsZ0JBQUEsdUJBQWMxRCxNQUFkLEVBQXNCc0QsTUFBdEIsRUFBOEI7RUFDNUIsU0FBS0gsS0FBTDs7RUFFQSxRQUFJLEtBQUtXLE1BQVQsRUFBaUI7RUFDZixhQUFPLEtBQUtBLE1BQUwsQ0FBWTlELE1BQVosRUFBb0JzRCxNQUFwQixDQUFQO0VBQ0QsS0FGRCxNQUVPLElBQUksT0FBT3RELE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7RUFDdkMsYUFBTytELElBQUksQ0FBQ3RDLFVBQUwsQ0FBZ0J6QixNQUFoQixFQUF3QnNELE1BQXhCLENBQVA7RUFDRCxLQUZNLE1BRUE7RUFDTCxhQUFPdEQsTUFBTSxDQUFDZ0UsS0FBUCxFQUFQO0VBQ0Q7RUFDRjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFQyxXQUFBLG9CQUFXO0VBQ1QsUUFBSUMsS0FBSyxHQUFHLENBQVo7O0VBQ0EsU0FBSyxJQUFJaEgsRUFBVCxJQUFlLEtBQUtrRyxLQUFwQjtFQUEyQmMsTUFBQUEsS0FBSyxJQUFJLEtBQUtkLEtBQUwsQ0FBV2xHLEVBQVgsRUFBZXRDLE1BQXhCO0VBQTNCOztFQUNBLFdBQU9zSixLQUFLLEVBQVo7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VoQyxVQUFBLG1CQUFVO0VBQ1IsU0FBSyxJQUFJaEYsRUFBVCxJQUFlLEtBQUtrRyxLQUFwQixFQUEyQjtFQUN6QixXQUFLQSxLQUFMLENBQVdsRyxFQUFYLEVBQWV0QyxNQUFmLEdBQXdCLENBQXhCO0VBQ0EsYUFBTyxLQUFLd0ksS0FBTCxDQUFXbEcsRUFBWCxDQUFQO0VBQ0Q7RUFDRjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFMEcsV0FBQSxrQkFBU2hCLEdBQVQsRUFBMEI7RUFBQSxRQUFqQkEsR0FBaUI7RUFBakJBLE1BQUFBLEdBQWlCLEdBQVgsU0FBVztFQUFBOztFQUN4QixRQUFJLENBQUMsS0FBS1EsS0FBTCxDQUFXUixHQUFYLENBQUwsRUFBc0IsS0FBS1EsS0FBTCxDQUFXUixHQUFYLElBQWtCLEVBQWxCO0VBQ3RCLFdBQU8sS0FBS1EsS0FBTCxDQUFXUixHQUFYLENBQVA7RUFDRDs7Ozs7TUM3SWtCdUI7RUFDbkIsaUJBQVlDLE1BQVosRUFBb0I7RUFDbEIsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0VBQ0EsU0FBS0MsU0FBTCxHQUFpQixJQUFqQjtFQUNBLFNBQUszQixJQUFMLEdBQVksQ0FBWjtFQUVBLFNBQUs0QixZQUFMLEdBQW9CLENBQXBCO0VBQ0EsU0FBS0MsYUFBTCxHQUFxQixDQUFyQjtFQUNEOzs7O1dBRURDLFNBQUEsZ0JBQU8vRyxLQUFQLEVBQWNnSCxJQUFkLEVBQW9CO0VBQ2xCLFNBQUtDLEdBQUwsQ0FBU2pILEtBQVQsRUFBZ0JnSCxJQUFoQjtFQUVBLFFBQU1FLE9BQU8sR0FBRyxLQUFLQyxVQUFMLEVBQWhCO0VBQ0EsUUFBTUMsUUFBUSxHQUFHLEtBQUtDLFdBQUwsRUFBakI7RUFDQSxRQUFJQyxHQUFHLEdBQUcsRUFBVjs7RUFFQSxZQUFRLEtBQUtyQyxJQUFiO0VBQ0UsV0FBSyxDQUFMO0VBQ0VxQyxRQUFBQSxHQUFHLElBQUksYUFBYSxLQUFLWCxNQUFMLENBQVlZLFFBQVosQ0FBcUJwSyxNQUFsQyxHQUEyQyxNQUFsRDtFQUNBLFlBQUkrSixPQUFKLEVBQWFJLEdBQUcsSUFBSSxjQUFjSixPQUFPLENBQUNNLFNBQXRCLEdBQWtDLE1BQXpDO0VBQ2IsWUFBSU4sT0FBSixFQUFhSSxHQUFHLElBQUksU0FBUyxLQUFLRyxhQUFMLENBQW1CUCxPQUFuQixDQUFoQjtFQUNiOztFQUVGLFdBQUssQ0FBTDtFQUNFLFlBQUlBLE9BQUosRUFBYUksR0FBRyxJQUFJLGlCQUFpQkosT0FBTyxDQUFDUSxXQUFSLENBQW9CdkssTUFBckMsR0FBOEMsTUFBckQ7RUFDYixZQUFJK0osT0FBSixFQUNFSSxHQUFHLElBQUkseUNBQXlDLEtBQUtLLFNBQUwsQ0FBZVQsT0FBTyxDQUFDUSxXQUF2QixDQUF6QyxHQUErRSxhQUF0RjtFQUNGLFlBQUlSLE9BQUosRUFBYUksR0FBRyxJQUFJLGdCQUFnQkosT0FBTyxDQUFDVSxVQUFSLENBQW1CekssTUFBbkMsR0FBNEMsTUFBbkQ7RUFDYixZQUFJK0osT0FBSixFQUFhSSxHQUFHLElBQUkseUNBQXlDLEtBQUtLLFNBQUwsQ0FBZVQsT0FBTyxDQUFDVSxVQUF2QixDQUF6QyxHQUE4RSxhQUFyRjtFQUNiOztFQUVGLFdBQUssQ0FBTDtFQUNFLFlBQUlSLFFBQUosRUFBY0UsR0FBRyxJQUFJRixRQUFRLENBQUNTLElBQVQsR0FBZ0IsTUFBdkI7RUFDZCxZQUFJVCxRQUFKLEVBQWNFLEdBQUcsSUFBSSxVQUFVLEtBQUtRLGdCQUFMLENBQXNCVixRQUF0QixDQUFWLEdBQTRDLE1BQW5EO0VBQ2Q7O0VBRUY7RUFDRUUsUUFBQUEsR0FBRyxJQUFJLGVBQWUsS0FBS1gsTUFBTCxDQUFZSCxRQUFaLEVBQWYsR0FBd0MsTUFBL0M7RUFDQWMsUUFBQUEsR0FBRyxJQUFJLFVBQVUsS0FBS1gsTUFBTCxDQUFZb0IsSUFBWixDQUFpQnZCLFFBQWpCLEVBQVYsR0FBd0MsTUFBL0M7RUFDQWMsUUFBQUEsR0FBRyxJQUFJLFdBQVcsS0FBS1gsTUFBTCxDQUFZb0IsSUFBWixDQUFpQnJDLEtBQW5DO0VBdkJKOztFQTBCQSxTQUFLa0IsU0FBTCxDQUFlb0IsU0FBZixHQUEyQlYsR0FBM0I7RUFDRDs7V0FFREwsTUFBQSxhQUFJakgsS0FBSixFQUFXZ0gsSUFBWCxFQUFpQjtFQUFBOztFQUNmLFFBQUksQ0FBQyxLQUFLSixTQUFWLEVBQXFCO0VBQ25CLFdBQUszQixJQUFMLEdBQVksQ0FBWjtFQUVBLFdBQUsyQixTQUFMLEdBQWlCOUcsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0VBQ0EsV0FBSzZHLFNBQUwsQ0FBZTVHLEtBQWYsQ0FBcUJpSSxPQUFyQixHQUErQixDQUM3QixxREFENkIsRUFFN0IsK0ZBRjZCLEVBRzdCLDJEQUg2QixFQUk3QkMsSUFKNkIsQ0FJeEIsRUFKd0IsQ0FBL0I7RUFNQSxXQUFLdEIsU0FBTCxDQUFldUIsZ0JBQWYsQ0FDRSxPQURGLEVBRUUsVUFBQTdGLENBQUMsRUFBSTtFQUNILFFBQUEsS0FBSSxDQUFDMkMsSUFBTDtFQUNBLFlBQUksS0FBSSxDQUFDQSxJQUFMLEdBQVksQ0FBaEIsRUFBbUIsS0FBSSxDQUFDQSxJQUFMLEdBQVksQ0FBWjtFQUNwQixPQUxILEVBTUUsS0FORjtFQVNBLFVBQUltRCxFQUFKLEVBQVFDLEtBQVI7O0VBQ0EsY0FBUXJJLEtBQVI7RUFDRSxhQUFLLENBQUw7RUFDRW9JLFVBQUFBLEVBQUUsR0FBRyxNQUFMO0VBQ0FDLFVBQUFBLEtBQUssR0FBRyxNQUFSO0VBQ0E7O0VBRUYsYUFBSyxDQUFMO0VBQ0VELFVBQUFBLEVBQUUsR0FBRyxNQUFMO0VBQ0FDLFVBQUFBLEtBQUssR0FBRyxNQUFSO0VBQ0E7O0VBRUY7RUFDRUQsVUFBQUEsRUFBRSxHQUFHLE1BQUw7RUFDQUMsVUFBQUEsS0FBSyxHQUFHLE1BQVI7RUFiSjs7RUFnQkEsV0FBS3pCLFNBQUwsQ0FBZTVHLEtBQWYsQ0FBcUIsa0JBQXJCLElBQTJDb0ksRUFBM0M7RUFDQSxXQUFLeEIsU0FBTCxDQUFlNUcsS0FBZixDQUFxQixPQUFyQixJQUFnQ3FJLEtBQWhDO0VBQ0Q7O0VBRUQsUUFBSSxDQUFDLEtBQUt6QixTQUFMLENBQWUwQixVQUFwQixFQUFnQztFQUM5QnRCLE1BQUFBLElBQUksR0FBR0EsSUFBSSxJQUFJLEtBQUtBLElBQWIsSUFBcUJsSCxRQUFRLENBQUNrSCxJQUFyQztFQUNBQSxNQUFBQSxJQUFJLENBQUN1QixXQUFMLENBQWlCLEtBQUszQixTQUF0QjtFQUNEO0VBQ0Y7O1dBRURPLGFBQUEsc0JBQWE7RUFDWCxXQUFPLEtBQUtSLE1BQUwsQ0FBWVksUUFBWixDQUFxQixLQUFLVixZQUExQixDQUFQO0VBQ0Q7O1dBRURRLGNBQUEsdUJBQWM7RUFDWixXQUFPLEtBQUtWLE1BQUwsQ0FBWTZCLFNBQVosQ0FBc0IsS0FBSzFCLGFBQTNCLENBQVA7RUFDRDs7V0FFRGEsWUFBQSxtQkFBVXBFLEdBQVYsRUFBZTtFQUNiLFFBQUlrRixNQUFNLEdBQUcsRUFBYjtFQUNBLFFBQUksQ0FBQ2xGLEdBQUQsSUFBUSxDQUFDQSxHQUFHLENBQUNwRyxNQUFqQixFQUF5QixPQUFPc0wsTUFBUDs7RUFFekIsU0FBSyxJQUFJcEwsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2tHLEdBQUcsQ0FBQ3BHLE1BQXhCLEVBQWdDRSxDQUFDLEVBQWpDLEVBQXFDO0VBQ25Db0wsTUFBQUEsTUFBTSxJQUFJLENBQUNsRixHQUFHLENBQUNsRyxDQUFELENBQUgsQ0FBT3dLLElBQVAsSUFBZSxFQUFoQixFQUFvQnpHLE1BQXBCLENBQTJCLENBQTNCLEVBQThCLENBQTlCLElBQW1DLEdBQTdDO0VBQ0Q7O0VBRUQsV0FBT3FILE1BQVA7RUFDRDs7V0FFRFgsbUJBQUEsMEJBQWlCVixRQUFqQixFQUEyQjtFQUN6QixXQUFPQSxRQUFRLENBQUNXLElBQVQsQ0FBY3JDLEtBQWQsSUFBd0IwQixRQUFRLENBQUNzQixLQUFULElBQWtCdEIsUUFBUSxDQUFDc0IsS0FBVCxDQUFlaEQsS0FBekQsSUFBbUUsQ0FBMUU7RUFDRDs7V0FFRCtCLGdCQUFBLHVCQUFjbkYsQ0FBZCxFQUFpQjtFQUNmLFdBQU8xRSxJQUFJLENBQUMrSyxLQUFMLENBQVdyRyxDQUFDLENBQUN3RCxDQUFGLENBQUl0RixDQUFmLElBQW9CLEdBQXBCLEdBQTBCNUMsSUFBSSxDQUFDK0ssS0FBTCxDQUFXckcsQ0FBQyxDQUFDd0QsQ0FBRixDQUFJckYsQ0FBZixDQUFqQztFQUNEOztXQUVEZ0UsVUFBQSxtQkFBVTtFQUNSLFFBQUksS0FBS21DLFNBQUwsSUFBa0IsS0FBS0EsU0FBTCxDQUFlMEIsVUFBckMsRUFBaUQ7RUFDL0MsVUFBTXRCLElBQUksR0FBRyxLQUFLQSxJQUFMLElBQWFsSCxRQUFRLENBQUNrSCxJQUFuQztFQUNBQSxNQUFBQSxJQUFJLENBQUM0QixXQUFMLENBQWlCLEtBQUtoQyxTQUF0QjtFQUNEOztFQUVELFNBQUtELE1BQUwsR0FBYyxJQUFkO0VBQ0EsU0FBS0MsU0FBTCxHQUFpQixJQUFqQjtFQUNEOzs7OztFQ2hJSDtFQUNBO0VBQ0E7RUFDQTtFQUNBO01BRXFCaUM7RUFDbkIsNkJBQWM7RUFDWixTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0VBQ0Q7O29CQUVNMUUsT0FBUCxjQUFZN0IsTUFBWixFQUFvQjtFQUNsQkEsSUFBQUEsTUFBTSxDQUFDWSxTQUFQLENBQWlCNEYsYUFBakIsR0FBaUNGLGVBQWUsQ0FBQzFGLFNBQWhCLENBQTBCNEYsYUFBM0Q7RUFDQXhHLElBQUFBLE1BQU0sQ0FBQ1ksU0FBUCxDQUFpQjZGLGdCQUFqQixHQUFvQ0gsZUFBZSxDQUFDMUYsU0FBaEIsQ0FBMEI2RixnQkFBOUQ7RUFDQXpHLElBQUFBLE1BQU0sQ0FBQ1ksU0FBUCxDQUFpQmdGLGdCQUFqQixHQUFvQ1UsZUFBZSxDQUFDMUYsU0FBaEIsQ0FBMEJnRixnQkFBOUQ7RUFDQTVGLElBQUFBLE1BQU0sQ0FBQ1ksU0FBUCxDQUFpQjhGLG1CQUFqQixHQUF1Q0osZUFBZSxDQUFDMUYsU0FBaEIsQ0FBMEI4RixtQkFBakU7RUFDQTFHLElBQUFBLE1BQU0sQ0FBQ1ksU0FBUCxDQUFpQitGLHVCQUFqQixHQUEyQ0wsZUFBZSxDQUFDMUYsU0FBaEIsQ0FBMEIrRix1QkFBckU7RUFDRDs7OztXQUVEZixtQkFBQSwwQkFBaUJsRCxJQUFqQixFQUF1QmtFLFFBQXZCLEVBQWlDO0VBQy9CLFFBQUksQ0FBQyxLQUFLTCxVQUFWLEVBQXNCO0VBQ3BCLFdBQUtBLFVBQUwsR0FBa0IsRUFBbEI7RUFDRCxLQUZELE1BRU87RUFDTCxXQUFLRyxtQkFBTCxDQUF5QmhFLElBQXpCLEVBQStCa0UsUUFBL0I7RUFDRDs7RUFFRCxRQUFJLENBQUMsS0FBS0wsVUFBTCxDQUFnQjdELElBQWhCLENBQUwsRUFBNEIsS0FBSzZELFVBQUwsQ0FBZ0I3RCxJQUFoQixJQUF3QixFQUF4Qjs7RUFDNUIsU0FBSzZELFVBQUwsQ0FBZ0I3RCxJQUFoQixFQUFzQm1CLElBQXRCLENBQTJCK0MsUUFBM0I7O0VBRUEsV0FBT0EsUUFBUDtFQUNEOztXQUVERixzQkFBQSw2QkFBb0JoRSxJQUFwQixFQUEwQmtFLFFBQTFCLEVBQW9DO0VBQ2xDLFFBQUksQ0FBQyxLQUFLTCxVQUFWLEVBQXNCO0VBQ3RCLFFBQUksQ0FBQyxLQUFLQSxVQUFMLENBQWdCN0QsSUFBaEIsQ0FBTCxFQUE0QjtFQUU1QixRQUFNMUIsR0FBRyxHQUFHLEtBQUt1RixVQUFMLENBQWdCN0QsSUFBaEIsQ0FBWjtFQUNBLFFBQU05SCxNQUFNLEdBQUdvRyxHQUFHLENBQUNwRyxNQUFuQjs7RUFFQSxTQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLE1BQXBCLEVBQTRCRSxDQUFDLEVBQTdCLEVBQWlDO0VBQy9CLFVBQUlrRyxHQUFHLENBQUNsRyxDQUFELENBQUgsS0FBVzhMLFFBQWYsRUFBeUI7RUFDdkIsWUFBSWhNLE1BQU0sS0FBSyxDQUFmLEVBQWtCO0VBQ2hCLGlCQUFPLEtBQUsyTCxVQUFMLENBQWdCN0QsSUFBaEIsQ0FBUDtFQUNELFNBRkQ7RUFBQSxhQUtLO0VBQ0gxQixVQUFBQSxHQUFHLENBQUM2RixNQUFKLENBQVcvTCxDQUFYLEVBQWMsQ0FBZDtFQUNEOztFQUVEO0VBQ0Q7RUFDRjtFQUNGOztXQUVENkwsMEJBQUEsaUNBQXdCakUsSUFBeEIsRUFBOEI7RUFDNUIsUUFBSSxDQUFDQSxJQUFMLEVBQVcsS0FBSzZELFVBQUwsR0FBa0IsSUFBbEIsQ0FBWCxLQUNLLElBQUksS0FBS0EsVUFBVCxFQUFxQixPQUFPLEtBQUtBLFVBQUwsQ0FBZ0I3RCxJQUFoQixDQUFQO0VBQzNCOztXQUVEOEQsZ0JBQUEsdUJBQWM5RCxJQUFkLEVBQW9CZixJQUFwQixFQUEwQjtFQUN4QixRQUFJdUUsTUFBTSxHQUFHLEtBQWI7RUFDQSxRQUFNWSxTQUFTLEdBQUcsS0FBS1AsVUFBdkI7O0VBRUEsUUFBSTdELElBQUksSUFBSW9FLFNBQVosRUFBdUI7RUFDckIsVUFBSTlGLEdBQUcsR0FBRzhGLFNBQVMsQ0FBQ3BFLElBQUQsQ0FBbkI7RUFDQSxVQUFJLENBQUMxQixHQUFMLEVBQVUsT0FBT2tGLE1BQVAsQ0FGVztFQUtyQjs7RUFFQSxVQUFJYSxPQUFKO0VBQ0EsVUFBSWpNLENBQUMsR0FBR2tHLEdBQUcsQ0FBQ3BHLE1BQVo7O0VBQ0EsYUFBT0UsQ0FBQyxFQUFSLEVBQVk7RUFDVmlNLFFBQUFBLE9BQU8sR0FBRy9GLEdBQUcsQ0FBQ2xHLENBQUQsQ0FBYjtFQUNBb0wsUUFBQUEsTUFBTSxHQUFHQSxNQUFNLElBQUlhLE9BQU8sQ0FBQ3BGLElBQUQsQ0FBMUI7RUFDRDtFQUNGOztFQUVELFdBQU8sQ0FBQyxDQUFDdUUsTUFBVDtFQUNEOztXQUVETyxtQkFBQSwwQkFBaUIvRCxJQUFqQixFQUF1QjtFQUNyQixRQUFNb0UsU0FBUyxHQUFHLEtBQUtQLFVBQXZCO0VBQ0EsV0FBTyxDQUFDLEVBQUVPLFNBQVMsSUFBSUEsU0FBUyxDQUFDcEUsSUFBRCxDQUF4QixDQUFSO0VBQ0Q7Ozs7O0VDckZILElBQU1zRSxFQUFFLEdBQUcsU0FBWDtFQUNBLElBQU1DLFFBQVEsR0FBR0MsUUFBakI7RUFFQSxJQUFNQyxRQUFRLEdBQUc7RUFDZkgsRUFBQUEsRUFBRSxFQUFFQSxFQURXO0VBRWZJLEVBQUFBLElBQUksRUFBRUosRUFBRSxHQUFHLENBRkk7RUFHZkssRUFBQUEsSUFBSSxFQUFFTCxFQUFFLEdBQUcsQ0FISTtFQUlmTSxFQUFBQSxNQUFNLEVBQUVOLEVBQUUsR0FBRyxHQUpFO0VBS2ZPLEVBQUFBLE9BQU8sRUFBRSxNQUFNUCxFQUxBO0VBTWZFLEVBQUFBLFFBQVEsRUFBRSxDQUFDLEdBTkk7RUFRZk0sRUFBQUEsVUFSZSxzQkFRSnRFLEdBUkksRUFRQztFQUNkLFdBQU9BLEdBQUcsS0FBSyxLQUFLZ0UsUUFBYixJQUF5QmhFLEdBQUcsS0FBSytELFFBQXhDO0VBQ0QsR0FWYztFQVlmUSxFQUFBQSxVQVplLHNCQVlKNUwsQ0FaSSxFQVlEQyxDQVpDLEVBWUU0TCxLQVpGLEVBWWlCO0VBQUEsUUFBZkEsS0FBZTtFQUFmQSxNQUFBQSxLQUFlLEdBQVAsS0FBTztFQUFBOztFQUM5QixRQUFJLENBQUNBLEtBQUwsRUFBWSxPQUFPN0wsQ0FBQyxHQUFHUixJQUFJLENBQUMrRixNQUFMLE1BQWlCdEYsQ0FBQyxHQUFHRCxDQUFyQixDQUFYLENBQVosS0FDSyxPQUFPLENBQUVSLElBQUksQ0FBQytGLE1BQUwsTUFBaUJ0RixDQUFDLEdBQUdELENBQXJCLENBQUQsSUFBNkIsQ0FBOUIsSUFBbUNBLENBQTFDO0VBQ04sR0FmYztFQWlCZjhMLEVBQUFBLGNBakJlLDBCQWlCQUMsTUFqQkEsRUFpQlFDLENBakJSLEVBaUJXSCxLQWpCWCxFQWlCa0I7RUFDL0IsV0FBTyxLQUFLRCxVQUFMLENBQWdCRyxNQUFNLEdBQUdDLENBQXpCLEVBQTRCRCxNQUFNLEdBQUdDLENBQXJDLEVBQXdDSCxLQUF4QyxDQUFQO0VBQ0QsR0FuQmM7RUFxQmZJLEVBQUFBLFdBckJlLHlCQXFCRDtFQUNaLFdBQU8sTUFBTSxDQUFDLFVBQVUsQ0FBRXpNLElBQUksQ0FBQytGLE1BQUwsS0FBZ0IsU0FBakIsSUFBK0IsQ0FBaEMsRUFBbUNQLFFBQW5DLENBQTRDLEVBQTVDLENBQVgsRUFBNERrSCxLQUE1RCxDQUFrRSxDQUFDLENBQW5FLENBQWI7RUFDRCxHQXZCYztFQXlCZkMsRUFBQUEsVUF6QmUsc0JBeUJKQyxPQXpCSSxFQXlCSyxFQXpCTDtFQTJCZjlHLEVBQUFBLEtBM0JlLGlCQTJCVCtCLEdBM0JTLEVBMkJKZ0YsQ0EzQkksRUEyQkc7RUFBQSxRQUFQQSxDQUFPO0VBQVBBLE1BQUFBLENBQU8sR0FBSCxDQUFHO0VBQUE7O0VBQ2hCLFFBQU1DLE1BQU0sR0FBRzlNLElBQUksQ0FBQytNLEdBQUwsQ0FBUyxFQUFULEVBQWFGLENBQWIsQ0FBZjtFQUNBLFdBQU83TSxJQUFJLENBQUM4RixLQUFMLENBQVcrQixHQUFHLEdBQUdpRixNQUFqQixJQUEyQkEsTUFBbEM7RUFDRCxHQTlCYztFQWdDZkUsRUFBQUEsZUFoQ2UsMkJBZ0NDeE0sQ0FoQ0QsRUFnQ0k7RUFDakIsV0FBUUEsQ0FBQyxHQUFHbUwsRUFBTCxHQUFXLEdBQWxCO0VBQ0QsR0FsQ2M7RUFvQ2ZzQixFQUFBQSxTQXBDZSxxQkFvQ0xwRixHQXBDSyxFQW9DQTtFQUNiLGlCQUFXQSxHQUFHLENBQUNyQyxRQUFKLENBQWEsRUFBYixDQUFYO0VBQ0Q7RUF0Q2MsQ0FBakI7O01DSHFCMEg7RUFDbkIsdUJBQVk3RixJQUFaLEVBQWtCO0VBQ2hCLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtFQUNEOzs7O1dBRUQ4RixZQUFBLG1CQUFVQyxTQUFWLEVBQXFCQyxJQUFyQixFQUEyQkMsT0FBM0IsRUFBb0M7RUFDbEMsU0FBS0MsY0FBTCxDQUFvQkgsU0FBcEIsRUFBK0JDLElBQS9CLEVBQXFDQyxPQUFyQztFQUNEO0VBR0Q7OztXQUNBQyxpQkFBQSx3QkFBZUMsUUFBZixFQUF5QkgsSUFBekIsRUFBK0JDLE9BQS9CLEVBQXdDO0VBQ3RDLFFBQUksQ0FBQ0UsUUFBUSxDQUFDQyxLQUFkLEVBQXFCO0VBQ25CRCxNQUFBQSxRQUFRLENBQUNFLEdBQVQsQ0FBYXhGLENBQWIsQ0FBZXlGLElBQWYsQ0FBb0JILFFBQVEsQ0FBQ3RGLENBQTdCO0VBQ0FzRixNQUFBQSxRQUFRLENBQUNFLEdBQVQsQ0FBYUUsQ0FBYixDQUFlRCxJQUFmLENBQW9CSCxRQUFRLENBQUNJLENBQTdCO0VBRUFKLE1BQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBV3FOLGNBQVgsQ0FBMEIsSUFBSUwsUUFBUSxDQUFDTSxJQUF2QztFQUNBTixNQUFBQSxRQUFRLENBQUNJLENBQVQsQ0FBV3ZFLEdBQVgsQ0FBZW1FLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBV3FOLGNBQVgsQ0FBMEJSLElBQTFCLENBQWY7RUFDQUcsTUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXbUIsR0FBWCxDQUFlbUUsUUFBUSxDQUFDRSxHQUFULENBQWFFLENBQWIsQ0FBZUMsY0FBZixDQUE4QlIsSUFBOUIsQ0FBZjtFQUVBLFVBQUlDLE9BQUosRUFBYUUsUUFBUSxDQUFDSSxDQUFULENBQVdDLGNBQVgsQ0FBMEJQLE9BQTFCO0VBRWJFLE1BQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBV3VOLEtBQVg7RUFDRDtFQUNGOzs7OztNQ2pCa0JDO0VBR25CO0VBS0E7O0VBZUE7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLGtCQUFZQyxlQUFaLEVBQTZCO0VBQzNCLFNBQUt0RSxRQUFMLEdBQWdCLEVBQWhCO0VBQ0EsU0FBS2lCLFNBQUwsR0FBaUIsRUFBakI7RUFFQSxTQUFLeUMsSUFBTCxHQUFZLENBQVo7RUFDQSxTQUFLYSxHQUFMLEdBQVcsQ0FBWDtFQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0VBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQWY7RUFFQSxTQUFLQyxLQUFMLEdBQWEsSUFBSXZGLEtBQUosQ0FBVSxJQUFWLENBQWI7RUFDQSxTQUFLcUIsSUFBTCxHQUFZLElBQUl2QyxJQUFKLENBQVMsRUFBVCxDQUFaO0VBRUEsU0FBS3FHLGVBQUwsR0FBdUJ2RixJQUFJLENBQUN6RCxTQUFMLENBQWVnSixlQUFmLEVBQWdDRCxNQUFNLENBQUNNLEtBQXZDLENBQXZCO0VBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFJckIsV0FBSixDQUFnQixLQUFLZSxlQUFyQixDQUFsQjtFQUVBLFNBQUtPLElBQUwsR0FBWSxNQUFaO0VBQ0EsU0FBS0MsU0FBTCxHQUFpQlQsTUFBTSxDQUFDVSxnQkFBeEI7RUFDRDs7OztFQVdEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtXQUNFQyxjQUFBLHFCQUFZQyxNQUFaLEVBQW9CO0VBQ2xCQSxJQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSxJQUFaO0VBQ0EsU0FBS2pFLFNBQUwsQ0FBZXBDLElBQWYsQ0FBb0JvRyxNQUFwQjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRUUsaUJBQUEsd0JBQWVGLE1BQWYsRUFBdUI7RUFDckIsUUFBTUcsS0FBSyxHQUFHLEtBQUtuRSxTQUFMLENBQWV6RSxPQUFmLENBQXVCeUksTUFBdkIsQ0FBZDtFQUNBLFNBQUtoRSxTQUFMLENBQWVZLE1BQWYsQ0FBc0J1RCxLQUF0QixFQUE2QixDQUE3QjtFQUNBSCxJQUFBQSxNQUFNLENBQUNJLE1BQVAsQ0FBYyxJQUFkO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFQyxhQUFBLG9CQUFXM0YsT0FBWCxFQUFvQjtFQUNsQixTQUFLSyxRQUFMLENBQWNuQixJQUFkLENBQW1CYyxPQUFuQjtFQUNBQSxJQUFBQSxPQUFPLENBQUM0RixNQUFSLEdBQWlCLElBQWpCO0VBRUEsU0FBSy9ELGFBQUwsQ0FBbUI2QyxNQUFNLENBQUNtQixhQUExQixFQUF5QzdGLE9BQXpDO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFOEYsZ0JBQUEsdUJBQWM5RixPQUFkLEVBQXVCO0VBQ3JCLFFBQU15RixLQUFLLEdBQUcsS0FBS3BGLFFBQUwsQ0FBY3hELE9BQWQsQ0FBc0JtRCxPQUF0QixDQUFkO0VBQ0EsU0FBS0ssUUFBTCxDQUFjNkIsTUFBZCxDQUFxQnVELEtBQXJCLEVBQTRCLENBQTVCO0VBQ0F6RixJQUFBQSxPQUFPLENBQUM0RixNQUFSLEdBQWlCLElBQWpCO0VBRUEsU0FBSy9ELGFBQUwsQ0FBbUI2QyxNQUFNLENBQUNxQixlQUExQixFQUEyQy9GLE9BQTNDO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VILFNBQUEsa0JBQVM7RUFDUDtFQUNBLFFBQUksS0FBS3FGLElBQUwsS0FBYyxNQUFsQixFQUEwQjtFQUN4QixXQUFLckQsYUFBTCxDQUFtQjZDLE1BQU0sQ0FBQ3NCLGFBQTFCOztFQUVBLFVBQUl0QixNQUFNLENBQUN1QixTQUFYLEVBQXNCO0VBQ3BCLFlBQUksQ0FBQyxLQUFLcEIsSUFBVixFQUFnQixLQUFLQSxJQUFMLEdBQVksSUFBSXFCLElBQUosR0FBV0MsT0FBWCxFQUFaO0VBQ2hCLGFBQUt2QixHQUFMLEdBQVcsSUFBSXNCLElBQUosR0FBV0MsT0FBWCxFQUFYO0VBQ0EsYUFBS3JCLE9BQUwsR0FBZSxDQUFDLEtBQUtGLEdBQUwsR0FBVyxLQUFLQyxJQUFqQixJQUF5QixLQUF4QyxDQUhvQjs7RUFLcEIsYUFBS3VCLGtCQUFMO0VBRUEsWUFBSSxLQUFLdEIsT0FBTCxHQUFlLENBQW5CLEVBQXNCLEtBQUt1QixjQUFMLENBQW9CLEtBQUt2QixPQUF6QjtFQUN0QixhQUFLRCxJQUFMLEdBQVksS0FBS0QsR0FBakI7RUFDRCxPQVRELE1BU087RUFDTCxhQUFLeUIsY0FBTCxDQUFvQjNCLE1BQU0sQ0FBQ1UsZ0JBQTNCO0VBQ0Q7O0VBRUQsV0FBS3ZELGFBQUwsQ0FBbUI2QyxNQUFNLENBQUM0QixtQkFBMUI7RUFDRCxLQWpCRDtFQUFBLFNBb0JLO0VBQ0gsVUFBSSxDQUFDLEtBQUt6QixJQUFWLEVBQWdCLEtBQUtBLElBQUwsR0FBWSxJQUFJcUIsSUFBSixHQUFXQyxPQUFYLEVBQVo7RUFDaEIsV0FBS3ZCLEdBQUwsR0FBVyxJQUFJc0IsSUFBSixHQUFXQyxPQUFYLEVBQVg7RUFDQSxXQUFLckIsT0FBTCxHQUFlLENBQUMsS0FBS0YsR0FBTCxHQUFXLEtBQUtDLElBQWpCLElBQXlCLEtBQXhDOztFQUVBLFVBQUksS0FBS0MsT0FBTCxHQUFlLEtBQUtLLFNBQXhCLEVBQW1DO0VBQ2pDLGFBQUt0RCxhQUFMLENBQW1CNkMsTUFBTSxDQUFDc0IsYUFBMUI7RUFDQSxhQUFLSyxjQUFMLENBQW9CLEtBQUtsQixTQUF6QixFQUZpQzs7RUFJakMsYUFBS04sSUFBTCxHQUFZLEtBQUtELEdBQUwsR0FBWSxLQUFLRSxPQUFMLEdBQWUsS0FBS0ssU0FBckIsR0FBa0MsSUFBekQ7RUFDQSxhQUFLdEQsYUFBTCxDQUFtQjZDLE1BQU0sQ0FBQzRCLG1CQUExQjtFQUNEO0VBQ0Y7RUFDRjs7V0FFREQsaUJBQUEsd0JBQWV2QixPQUFmLEVBQXdCO0VBQ3RCLFFBQUkzTyxDQUFDLEdBQUcsS0FBS2tLLFFBQUwsQ0FBY3BLLE1BQXRCOztFQUNBLFdBQU9FLENBQUMsRUFBUjtFQUFZLFdBQUtrSyxRQUFMLENBQWNsSyxDQUFkLEVBQWlCMEosTUFBakIsQ0FBd0JpRixPQUF4QjtFQUFaO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VzQixxQkFBQSw4QkFBcUI7RUFDbkIsUUFBSSxDQUFDMUIsTUFBTSxDQUFDMEIsa0JBQVosRUFBZ0M7O0VBQ2hDLFFBQUksS0FBS3RCLE9BQUwsR0FBZSxHQUFuQixFQUF3QjtFQUN0QixXQUFLRCxJQUFMLEdBQVksSUFBSXFCLElBQUosR0FBV0MsT0FBWCxFQUFaO0VBQ0EsV0FBS3JCLE9BQUwsR0FBZSxDQUFmO0VBQ0Q7RUFDRjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRXhGLFdBQUEsb0JBQVc7RUFDVCxRQUFJZCxLQUFLLEdBQUcsQ0FBWjtFQUNBLFFBQUlySSxDQUFDLEdBQUcsS0FBS2tLLFFBQUwsQ0FBY3BLLE1BQXRCOztFQUVBLFdBQU9FLENBQUMsRUFBUjtFQUFZcUksTUFBQUEsS0FBSyxJQUFJLEtBQUs2QixRQUFMLENBQWNsSyxDQUFkLEVBQWlCMk4sU0FBakIsQ0FBMkI3TixNQUFwQztFQUFaOztFQUNBLFdBQU91SSxLQUFQO0VBQ0Q7O1dBRUQrSCxrQkFBQSwyQkFBa0I7RUFDaEIsUUFBSXpDLFNBQVMsR0FBRyxFQUFoQjtFQUNBLFFBQUkzTixDQUFDLEdBQUcsS0FBS2tLLFFBQUwsQ0FBY3BLLE1BQXRCOztFQUVBLFdBQU9FLENBQUMsRUFBUjtFQUFZMk4sTUFBQUEsU0FBUyxHQUFHQSxTQUFTLENBQUMxRyxNQUFWLENBQWlCLEtBQUtpRCxRQUFMLENBQWNsSyxDQUFkLEVBQWlCMk4sU0FBbEMsQ0FBWjtFQUFaOztFQUNBLFdBQU9BLFNBQVA7RUFDRDs7V0FFRDBDLHFCQUFBLDhCQUFxQjtFQUNuQnBILElBQUFBLElBQUksQ0FBQzlCLFVBQUwsQ0FBZ0IsS0FBSytDLFFBQXJCO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0U5QyxVQUFBLGlCQUFRbUksTUFBUixFQUF3QjtFQUFBOztFQUFBLFFBQWhCQSxNQUFnQjtFQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPO0VBQUE7O0VBQ3RCLFFBQU1lLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07RUFDekIsTUFBQSxLQUFJLENBQUMxQyxJQUFMLEdBQVksQ0FBWjtFQUNBLE1BQUEsS0FBSSxDQUFDYyxJQUFMLEdBQVksQ0FBWjs7RUFDQSxNQUFBLEtBQUksQ0FBQ2hFLElBQUwsQ0FBVXRELE9BQVY7O0VBQ0EsTUFBQSxLQUFJLENBQUN3SCxLQUFMLENBQVd4SCxPQUFYOztFQUVBNkIsTUFBQUEsSUFBSSxDQUFDOUIsVUFBTCxDQUFnQixLQUFJLENBQUMrQyxRQUFyQjtFQUNBakIsTUFBQUEsSUFBSSxDQUFDOUIsVUFBTCxDQUFnQixLQUFJLENBQUNnRSxTQUFyQixFQUFnQyxLQUFJLENBQUNpRixlQUFMLEVBQWhDO0VBRUEsTUFBQSxLQUFJLENBQUN0QixVQUFMLEdBQWtCLElBQWxCO0VBQ0EsTUFBQSxLQUFJLENBQUMzRCxTQUFMLEdBQWlCLElBQWpCO0VBQ0EsTUFBQSxLQUFJLENBQUNqQixRQUFMLEdBQWdCLElBQWhCO0VBQ0EsTUFBQSxLQUFJLENBQUMwRSxLQUFMLEdBQWEsSUFBYjtFQUNBLE1BQUEsS0FBSSxDQUFDbEUsSUFBTCxHQUFZLElBQVo7RUFDRCxLQWREOztFQWdCQSxRQUFJNkUsTUFBSixFQUFZO0VBQ1ZnQixNQUFBQSxVQUFVLENBQUNELFlBQUQsRUFBZSxHQUFmLENBQVY7RUFDRCxLQUZELE1BRU87RUFDTEEsTUFBQUEsWUFBWTtFQUNiO0VBQ0Y7Ozs7V0F2TEQsZUFBVTtFQUNSLGFBQU8sS0FBS3ZCLElBQVo7RUFDRDtXQVBELGFBQVF5QixHQUFSLEVBQWE7RUFDWCxXQUFLekIsSUFBTCxHQUFZeUIsR0FBWjtFQUNBLFdBQUt4QixTQUFMLEdBQWlCd0IsR0FBRyxLQUFLLE1BQVIsR0FBaUJqQyxNQUFNLENBQUNVLGdCQUF4QixHQUEyQzVDLFFBQVEsQ0FBQ2hHLEtBQVQsQ0FBZSxJQUFJbUssR0FBbkIsRUFBd0IsQ0FBeEIsQ0FBNUQ7RUFDRDs7Ozs7O0VBOURrQmpDLE9BQ1p1QixZQUFZO0VBREF2QixPQUlaa0MsVUFBVTtFQUpFbEMsT0FLWk0sUUFBUTtFQUxJTixPQU1abUMsTUFBTTtFQU5NbkMsT0FTWm9DLG1CQUFtQjtFQVRQcEMsT0FVWnFDLGtCQUFrQjtFQVZOckMsT0FXWnNDLGlCQUFpQjtFQVhMdEMsT0FZWnVDLGdCQUFnQjtFQVpKdkMsT0FjWm1CLGdCQUFnQjtFQWRKbkIsT0FlWnFCLGtCQUFrQjtFQWZOckIsT0FpQlpzQixnQkFBZ0I7RUFqQkp0QixPQWtCWjRCLHNCQUFzQjtFQWxCVjVCLE9BbUJaVSxtQkFBbUI7RUFuQlBWLE9BcUJaMEIscUJBQXFCO0VBcU85QnpFLGVBQWUsQ0FBQ3pFLElBQWhCLENBQXFCd0gsTUFBckI7O01DalFxQndDO0VBQ25CLGVBQVlDLENBQVosRUFBcUJDLENBQXJCLEVBQThCalEsQ0FBOUIsRUFBdUM7RUFBQSxRQUEzQmdRLENBQTJCO0VBQTNCQSxNQUFBQSxDQUEyQixHQUF2QixHQUF1QjtFQUFBOztFQUFBLFFBQWxCQyxDQUFrQjtFQUFsQkEsTUFBQUEsQ0FBa0IsR0FBZCxHQUFjO0VBQUE7O0VBQUEsUUFBVGpRLENBQVM7RUFBVEEsTUFBQUEsQ0FBUyxHQUFMLEdBQUs7RUFBQTs7RUFDckMsU0FBS2dRLENBQUwsR0FBU0EsQ0FBVDtFQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtFQUNBLFNBQUtqUSxDQUFMLEdBQVNBLENBQVQ7RUFDRDs7OztXQUVEa1EsUUFBQSxpQkFBUTtFQUNOLFNBQUtGLENBQUwsR0FBUyxHQUFUO0VBQ0EsU0FBS0MsQ0FBTCxHQUFTLEdBQVQ7RUFDQSxTQUFLalEsQ0FBTCxHQUFTLEdBQVQ7RUFDRDs7Ozs7QUNYSCxpQkFBZTtFQUNibVEsRUFBQUEsT0FEYSxtQkFDTGpNLE1BREssRUFDR3hCLEdBREgsRUFDUTtFQUNuQixRQUFJLENBQUN3QixNQUFMLEVBQWEsT0FBTyxLQUFQO0VBQ2IsV0FBT0EsTUFBTSxDQUFDeEIsR0FBRCxDQUFOLEtBQWdCaUMsU0FBdkIsQ0FGbUI7RUFJcEIsR0FMWTs7RUFPYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0V5TCxFQUFBQSxPQXJCYSxtQkFxQkxsTSxNQXJCSyxFQXFCR21NLEtBckJILEVBcUJVO0VBQ3JCLFNBQUssSUFBSUMsSUFBVCxJQUFpQkQsS0FBakIsRUFBd0I7RUFDdEIsVUFBSW5NLE1BQU0sQ0FBQ3FDLGNBQVAsQ0FBc0IrSixJQUF0QixDQUFKLEVBQWlDO0VBQy9CcE0sUUFBQUEsTUFBTSxDQUFDb00sSUFBRCxDQUFOLEdBQWVDLElBQUksQ0FBQ0MsWUFBTCxDQUFrQkgsS0FBSyxDQUFDQyxJQUFELENBQXZCLENBQWY7RUFDRDtFQUNGOztFQUVELFdBQU9wTSxNQUFQO0VBQ0QsR0E3Qlk7O0VBK0JiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRXVNLEVBQUFBLFlBMUNhLHdCQTBDQTFELFFBMUNBLEVBMENVMkQsSUExQ1YsRUEwQ3VCO0VBQUEsUUFBYkEsSUFBYTtFQUFiQSxNQUFBQSxJQUFhLEdBQU4sSUFBTTtFQUFBOztFQUNsQyxRQUFJLENBQUNBLElBQUwsRUFBVztFQUVYLFFBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLEdBQW5CLENBQUosRUFBNkIzRCxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWV1TyxJQUFJLENBQUMsR0FBRCxDQUFuQjtFQUM3QixRQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixHQUFuQixDQUFKLEVBQTZCM0QsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlc08sSUFBSSxDQUFDLEdBQUQsQ0FBbkI7RUFFN0IsUUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsSUFBbkIsQ0FBSixFQUE4QjNELFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxHQUFldU8sSUFBSSxDQUFDLElBQUQsQ0FBbkI7RUFDOUIsUUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsSUFBbkIsQ0FBSixFQUE4QjNELFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxHQUFlc08sSUFBSSxDQUFDLElBQUQsQ0FBbkI7RUFFOUIsUUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsSUFBbkIsQ0FBSixFQUE4QjNELFFBQVEsQ0FBQ2hOLENBQVQsQ0FBV29DLENBQVgsR0FBZXVPLElBQUksQ0FBQyxJQUFELENBQW5CO0VBQzlCLFFBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLElBQW5CLENBQUosRUFBOEIzRCxRQUFRLENBQUNoTixDQUFULENBQVdxQyxDQUFYLEdBQWVzTyxJQUFJLENBQUMsSUFBRCxDQUFuQjtFQUU5QixRQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixHQUFuQixDQUFKLEVBQTZCM0QsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXeUYsSUFBWCxDQUFnQndELElBQUksQ0FBQyxHQUFELENBQXBCO0VBQzdCLFFBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLEdBQW5CLENBQUosRUFBNkIzRCxRQUFRLENBQUNJLENBQVQsQ0FBV0QsSUFBWCxDQUFnQndELElBQUksQ0FBQyxHQUFELENBQXBCO0VBQzdCLFFBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLEdBQW5CLENBQUosRUFBNkIzRCxRQUFRLENBQUNoTixDQUFULENBQVdtTixJQUFYLENBQWdCd0QsSUFBSSxDQUFDLEdBQUQsQ0FBcEI7RUFFN0IsUUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsVUFBbkIsQ0FBSixFQUFvQzNELFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3lGLElBQVgsQ0FBZ0J3RCxJQUFJLENBQUMsVUFBRCxDQUFwQjtFQUNwQyxRQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixVQUFuQixDQUFKLEVBQW9DM0QsUUFBUSxDQUFDSSxDQUFULENBQVdELElBQVgsQ0FBZ0J3RCxJQUFJLENBQUMsVUFBRCxDQUFwQjtFQUNwQyxRQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixZQUFuQixDQUFKLEVBQXNDM0QsUUFBUSxDQUFDaE4sQ0FBVCxDQUFXbU4sSUFBWCxDQUFnQndELElBQUksQ0FBQyxZQUFELENBQXBCO0VBQ3ZDO0VBN0RZLENBQWY7O0FDRUEsYUFBZTtFQUNiQyxFQUFBQSxVQURhLHNCQUNGbE0sS0FERSxFQUNLO0VBQ2hCLFdBQU9BLEtBQVA7RUFDRCxHQUhZO0VBS2JtTSxFQUFBQSxVQUxhLHNCQUtGbk0sS0FMRSxFQUtLO0VBQ2hCLFdBQU9sRixJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFULEVBQWdCLENBQWhCLENBQVA7RUFDRCxHQVBZO0VBU2JvTSxFQUFBQSxXQVRhLHVCQVNEcE0sS0FUQyxFQVNNO0VBQ2pCLFdBQU8sRUFBRWxGLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQUssR0FBRyxDQUFqQixFQUFvQixDQUFwQixJQUF5QixDQUEzQixDQUFQO0VBQ0QsR0FYWTtFQWFicU0sRUFBQUEsYUFiYSx5QkFhQ3JNLEtBYkQsRUFhUTtFQUNuQixRQUFJLENBQUNBLEtBQUssSUFBSSxHQUFWLElBQWlCLENBQXJCLEVBQXdCLE9BQU8sTUFBTWxGLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBYjtFQUV4QixXQUFPLENBQUMsR0FBRCxJQUFRLENBQUNBLEtBQUssSUFBSSxDQUFWLElBQWVBLEtBQWYsR0FBdUIsQ0FBL0IsQ0FBUDtFQUNELEdBakJZO0VBbUJic00sRUFBQUEsV0FuQmEsdUJBbUJEdE0sS0FuQkMsRUFtQk07RUFDakIsV0FBT2xGLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBUDtFQUNELEdBckJZO0VBdUJidU0sRUFBQUEsWUF2QmEsd0JBdUJBdk0sS0F2QkEsRUF1Qk87RUFDbEIsV0FBT2xGLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQUssR0FBRyxDQUFqQixFQUFvQixDQUFwQixJQUF5QixDQUFoQztFQUNELEdBekJZO0VBMkJid00sRUFBQUEsY0EzQmEsMEJBMkJFeE0sS0EzQkYsRUEyQlM7RUFDcEIsUUFBSSxDQUFDQSxLQUFLLElBQUksR0FBVixJQUFpQixDQUFyQixFQUF3QixPQUFPLE1BQU1sRixJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFULEVBQWdCLENBQWhCLENBQWI7RUFFeEIsV0FBTyxPQUFPbEYsSUFBSSxDQUFDK00sR0FBTCxDQUFTN0gsS0FBSyxHQUFHLENBQWpCLEVBQW9CLENBQXBCLElBQXlCLENBQWhDLENBQVA7RUFDRCxHQS9CWTtFQWlDYnlNLEVBQUFBLFdBakNhLHVCQWlDRHpNLEtBakNDLEVBaUNNO0VBQ2pCLFdBQU9sRixJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFULEVBQWdCLENBQWhCLENBQVA7RUFDRCxHQW5DWTtFQXFDYjBNLEVBQUFBLFlBckNhLHdCQXFDQTFNLEtBckNBLEVBcUNPO0VBQ2xCLFdBQU8sRUFBRWxGLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQUssR0FBRyxDQUFqQixFQUFvQixDQUFwQixJQUF5QixDQUEzQixDQUFQO0VBQ0QsR0F2Q1k7RUF5Q2IyTSxFQUFBQSxjQXpDYSwwQkF5Q0UzTSxLQXpDRixFQXlDUztFQUNwQixRQUFJLENBQUNBLEtBQUssSUFBSSxHQUFWLElBQWlCLENBQXJCLEVBQXdCLE9BQU8sTUFBTWxGLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBYjtFQUV4QixXQUFPLENBQUMsR0FBRCxJQUFRLENBQUNBLEtBQUssSUFBSSxDQUFWLElBQWVsRixJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFULEVBQWdCLENBQWhCLENBQWYsR0FBb0MsQ0FBNUMsQ0FBUDtFQUNELEdBN0NZO0VBK0NiNE0sRUFBQUEsVUEvQ2Esc0JBK0NGNU0sS0EvQ0UsRUErQ0s7RUFDaEIsV0FBTyxDQUFDbEYsSUFBSSxDQUFDQyxHQUFMLENBQVNpRixLQUFLLEdBQUc0RyxRQUFRLENBQUNFLElBQTFCLENBQUQsR0FBbUMsQ0FBMUM7RUFDRCxHQWpEWTtFQW1EYitGLEVBQUFBLFdBbkRhLHVCQW1ERDdNLEtBbkRDLEVBbURNO0VBQ2pCLFdBQU9sRixJQUFJLENBQUNHLEdBQUwsQ0FBUytFLEtBQUssR0FBRzRHLFFBQVEsQ0FBQ0UsSUFBMUIsQ0FBUDtFQUNELEdBckRZO0VBdURiZ0csRUFBQUEsYUF2RGEseUJBdURDOU0sS0F2REQsRUF1RFE7RUFDbkIsV0FBTyxDQUFDLEdBQUQsSUFBUWxGLElBQUksQ0FBQ0MsR0FBTCxDQUFTRCxJQUFJLENBQUMyTCxFQUFMLEdBQVV6RyxLQUFuQixJQUE0QixDQUFwQyxDQUFQO0VBQ0QsR0F6RFk7RUEyRGIrTSxFQUFBQSxVQTNEYSxzQkEyREYvTSxLQTNERSxFQTJESztFQUNoQixXQUFPQSxLQUFLLEtBQUssQ0FBVixHQUFjLENBQWQsR0FBa0JsRixJQUFJLENBQUMrTSxHQUFMLENBQVMsQ0FBVCxFQUFZLE1BQU03SCxLQUFLLEdBQUcsQ0FBZCxDQUFaLENBQXpCO0VBQ0QsR0E3RFk7RUErRGJnTixFQUFBQSxXQS9EYSx1QkErRERoTixLQS9EQyxFQStETTtFQUNqQixXQUFPQSxLQUFLLEtBQUssQ0FBVixHQUFjLENBQWQsR0FBa0IsQ0FBQ2xGLElBQUksQ0FBQytNLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBQyxFQUFELEdBQU03SCxLQUFsQixDQUFELEdBQTRCLENBQXJEO0VBQ0QsR0FqRVk7RUFtRWJpTixFQUFBQSxhQW5FYSx5QkFtRUNqTixLQW5FRCxFQW1FUTtFQUNuQixRQUFJQSxLQUFLLEtBQUssQ0FBZCxFQUFpQixPQUFPLENBQVA7RUFFakIsUUFBSUEsS0FBSyxLQUFLLENBQWQsRUFBaUIsT0FBTyxDQUFQO0VBRWpCLFFBQUksQ0FBQ0EsS0FBSyxJQUFJLEdBQVYsSUFBaUIsQ0FBckIsRUFBd0IsT0FBTyxNQUFNbEYsSUFBSSxDQUFDK00sR0FBTCxDQUFTLENBQVQsRUFBWSxNQUFNN0gsS0FBSyxHQUFHLENBQWQsQ0FBWixDQUFiO0VBRXhCLFdBQU8sT0FBTyxDQUFDbEYsSUFBSSxDQUFDK00sR0FBTCxDQUFTLENBQVQsRUFBWSxDQUFDLEVBQUQsR0FBTSxFQUFFN0gsS0FBcEIsQ0FBRCxHQUE4QixDQUFyQyxDQUFQO0VBQ0QsR0EzRVk7RUE2RWJrTixFQUFBQSxVQTdFYSxzQkE2RUZsTixLQTdFRSxFQTZFSztFQUNoQixXQUFPLEVBQUVsRixJQUFJLENBQUNxUyxJQUFMLENBQVUsSUFBSW5OLEtBQUssR0FBR0EsS0FBdEIsSUFBK0IsQ0FBakMsQ0FBUDtFQUNELEdBL0VZO0VBaUZib04sRUFBQUEsV0FqRmEsdUJBaUZEcE4sS0FqRkMsRUFpRk07RUFDakIsV0FBT2xGLElBQUksQ0FBQ3FTLElBQUwsQ0FBVSxJQUFJclMsSUFBSSxDQUFDK00sR0FBTCxDQUFTN0gsS0FBSyxHQUFHLENBQWpCLEVBQW9CLENBQXBCLENBQWQsQ0FBUDtFQUNELEdBbkZZO0VBcUZicU4sRUFBQUEsYUFyRmEseUJBcUZDck4sS0FyRkQsRUFxRlE7RUFDbkIsUUFBSSxDQUFDQSxLQUFLLElBQUksR0FBVixJQUFpQixDQUFyQixFQUF3QixPQUFPLENBQUMsR0FBRCxJQUFRbEYsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLElBQUluTixLQUFLLEdBQUdBLEtBQXRCLElBQStCLENBQXZDLENBQVA7RUFDeEIsV0FBTyxPQUFPbEYsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLElBQUksQ0FBQ25OLEtBQUssSUFBSSxDQUFWLElBQWVBLEtBQTdCLElBQXNDLENBQTdDLENBQVA7RUFDRCxHQXhGWTtFQTBGYnNOLEVBQUFBLFVBMUZhLHNCQTBGRnROLEtBMUZFLEVBMEZLO0VBQ2hCLFFBQUloRixDQUFDLEdBQUcsT0FBUjtFQUNBLFdBQU9nRixLQUFLLEdBQUdBLEtBQVIsSUFBaUIsQ0FBQ2hGLENBQUMsR0FBRyxDQUFMLElBQVVnRixLQUFWLEdBQWtCaEYsQ0FBbkMsQ0FBUDtFQUNELEdBN0ZZO0VBK0ZidVMsRUFBQUEsV0EvRmEsdUJBK0ZEdk4sS0EvRkMsRUErRk07RUFDakIsUUFBSWhGLENBQUMsR0FBRyxPQUFSO0VBQ0EsV0FBTyxDQUFDZ0YsS0FBSyxHQUFHQSxLQUFLLEdBQUcsQ0FBakIsSUFBc0JBLEtBQXRCLElBQStCLENBQUNoRixDQUFDLEdBQUcsQ0FBTCxJQUFVZ0YsS0FBVixHQUFrQmhGLENBQWpELElBQXNELENBQTdEO0VBQ0QsR0FsR1k7RUFvR2J3UyxFQUFBQSxhQXBHYSx5QkFvR0N4TixLQXBHRCxFQW9HUTtFQUNuQixRQUFJaEYsQ0FBQyxHQUFHLE9BQVI7RUFDQSxRQUFJLENBQUNnRixLQUFLLElBQUksR0FBVixJQUFpQixDQUFyQixFQUF3QixPQUFPLE9BQU9BLEtBQUssR0FBR0EsS0FBUixJQUFpQixDQUFDLENBQUNoRixDQUFDLElBQUksS0FBTixJQUFlLENBQWhCLElBQXFCZ0YsS0FBckIsR0FBNkJoRixDQUE5QyxDQUFQLENBQVA7RUFDeEIsV0FBTyxPQUFPLENBQUNnRixLQUFLLElBQUksQ0FBVixJQUFlQSxLQUFmLElBQXdCLENBQUMsQ0FBQ2hGLENBQUMsSUFBSSxLQUFOLElBQWUsQ0FBaEIsSUFBcUJnRixLQUFyQixHQUE2QmhGLENBQXJELElBQTBELENBQWpFLENBQVA7RUFDRCxHQXhHWTtFQTBHYnlTLEVBQUFBLFNBMUdhLHFCQTBHSEMsSUExR0csRUEwR0c7RUFDZCxRQUFJLE9BQU9BLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0MsT0FBT0EsSUFBUCxDQUFoQyxLQUNLLE9BQU8sS0FBS0EsSUFBTCxLQUFjLEtBQUt4QixVQUExQjtFQUNOO0VBN0dZLENBQWY7O01DQXFCeUI7RUFDbkIsb0JBQVlqUSxDQUFaLEVBQWVDLENBQWYsRUFBa0I7RUFDaEIsU0FBS0QsQ0FBTCxHQUFTQSxDQUFDLElBQUksQ0FBZDtFQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBQyxJQUFJLENBQWQ7RUFDRDs7OztXQUVEaVEsTUFBQSxhQUFJbFEsQ0FBSixFQUFPQyxDQUFQLEVBQVU7RUFDUixTQUFLRCxDQUFMLEdBQVNBLENBQVQ7RUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7RUFDQSxXQUFPLElBQVA7RUFDRDs7V0FFRGtRLE9BQUEsY0FBS25RLENBQUwsRUFBUTtFQUNOLFNBQUtBLENBQUwsR0FBU0EsQ0FBVDtFQUNBLFdBQU8sSUFBUDtFQUNEOztXQUVEb1EsT0FBQSxjQUFLblEsQ0FBTCxFQUFRO0VBQ04sU0FBS0EsQ0FBTCxHQUFTQSxDQUFUO0VBQ0EsV0FBTyxJQUFQO0VBQ0Q7O1dBRURvUSxjQUFBLHVCQUFjO0VBQ1osUUFBSSxLQUFLclEsQ0FBTCxLQUFXLENBQWYsRUFBa0IsT0FBTzVDLElBQUksQ0FBQ2tULEtBQUwsQ0FBVyxLQUFLclEsQ0FBaEIsRUFBbUIsS0FBS0QsQ0FBeEIsQ0FBUCxDQUFsQixLQUNLLElBQUksS0FBS0MsQ0FBTCxHQUFTLENBQWIsRUFBZ0IsT0FBT2lKLFFBQVEsQ0FBQ0UsSUFBaEIsQ0FBaEIsS0FDQSxJQUFJLEtBQUtuSixDQUFMLEdBQVMsQ0FBYixFQUFnQixPQUFPLENBQUNpSixRQUFRLENBQUNFLElBQWpCO0VBQ3RCOztXQUVEMkIsT0FBQSxjQUFLQyxDQUFMLEVBQVE7RUFDTixTQUFLaEwsQ0FBTCxHQUFTZ0wsQ0FBQyxDQUFDaEwsQ0FBWDtFQUNBLFNBQUtDLENBQUwsR0FBUytLLENBQUMsQ0FBQy9LLENBQVg7RUFFQSxXQUFPLElBQVA7RUFDRDs7V0FFRHdHLE1BQUEsYUFBSXVFLENBQUosRUFBT3VGLENBQVAsRUFBVTtFQUNSLFFBQUlBLENBQUMsS0FBSy9OLFNBQVYsRUFBcUI7RUFDbkIsYUFBTyxLQUFLZ08sVUFBTCxDQUFnQnhGLENBQWhCLEVBQW1CdUYsQ0FBbkIsQ0FBUDtFQUNEOztFQUVELFNBQUt2USxDQUFMLElBQVVnTCxDQUFDLENBQUNoTCxDQUFaO0VBQ0EsU0FBS0MsQ0FBTCxJQUFVK0ssQ0FBQyxDQUFDL0ssQ0FBWjtFQUVBLFdBQU8sSUFBUDtFQUNEOztXQUVEd1EsUUFBQSxlQUFNN1MsQ0FBTixFQUFTQyxDQUFULEVBQVk7RUFDVixTQUFLbUMsQ0FBTCxJQUFVcEMsQ0FBVjtFQUNBLFNBQUtxQyxDQUFMLElBQVVwQyxDQUFWO0VBRUEsV0FBTyxJQUFQO0VBQ0Q7O1dBRUQyUyxhQUFBLG9CQUFXNVMsQ0FBWCxFQUFjQyxDQUFkLEVBQWlCO0VBQ2YsU0FBS21DLENBQUwsR0FBU3BDLENBQUMsQ0FBQ29DLENBQUYsR0FBTW5DLENBQUMsQ0FBQ21DLENBQWpCO0VBQ0EsU0FBS0MsQ0FBTCxHQUFTckMsQ0FBQyxDQUFDcUMsQ0FBRixHQUFNcEMsQ0FBQyxDQUFDb0MsQ0FBakI7RUFFQSxXQUFPLElBQVA7RUFDRDs7V0FFRHlRLE1BQUEsYUFBSTFGLENBQUosRUFBT3VGLENBQVAsRUFBVTtFQUNSLFFBQUlBLENBQUMsS0FBSy9OLFNBQVYsRUFBcUI7RUFDbkIsYUFBTyxLQUFLbU8sVUFBTCxDQUFnQjNGLENBQWhCLEVBQW1CdUYsQ0FBbkIsQ0FBUDtFQUNEOztFQUVELFNBQUt2USxDQUFMLElBQVVnTCxDQUFDLENBQUNoTCxDQUFaO0VBQ0EsU0FBS0MsQ0FBTCxJQUFVK0ssQ0FBQyxDQUFDL0ssQ0FBWjtFQUVBLFdBQU8sSUFBUDtFQUNEOztXQUVEMFEsYUFBQSxvQkFBVy9TLENBQVgsRUFBY0MsQ0FBZCxFQUFpQjtFQUNmLFNBQUttQyxDQUFMLEdBQVNwQyxDQUFDLENBQUNvQyxDQUFGLEdBQU1uQyxDQUFDLENBQUNtQyxDQUFqQjtFQUNBLFNBQUtDLENBQUwsR0FBU3JDLENBQUMsQ0FBQ3FDLENBQUYsR0FBTXBDLENBQUMsQ0FBQ29DLENBQWpCO0VBRUEsV0FBTyxJQUFQO0VBQ0Q7O1dBRUQyUSxlQUFBLHNCQUFhdFQsQ0FBYixFQUFnQjtFQUNkLFFBQUlBLENBQUMsS0FBSyxDQUFWLEVBQWE7RUFDWCxXQUFLMEMsQ0FBTCxJQUFVMUMsQ0FBVjtFQUNBLFdBQUsyQyxDQUFMLElBQVUzQyxDQUFWO0VBQ0QsS0FIRCxNQUdPO0VBQ0wsV0FBSzRTLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBWjtFQUNEOztFQUVELFdBQU8sSUFBUDtFQUNEOztXQUVEakYsaUJBQUEsd0JBQWUzTixDQUFmLEVBQWtCO0VBQ2hCLFNBQUswQyxDQUFMLElBQVUxQyxDQUFWO0VBQ0EsU0FBSzJDLENBQUwsSUFBVTNDLENBQVY7RUFFQSxXQUFPLElBQVA7RUFDRDs7V0FFRHVULFNBQUEsa0JBQVM7RUFDUCxXQUFPLEtBQUs1RixjQUFMLENBQW9CLENBQUMsQ0FBckIsQ0FBUDtFQUNEOztXQUVENkYsTUFBQSxhQUFJOUYsQ0FBSixFQUFPO0VBQ0wsV0FBTyxLQUFLaEwsQ0FBTCxHQUFTZ0wsQ0FBQyxDQUFDaEwsQ0FBWCxHQUFlLEtBQUtDLENBQUwsR0FBUytLLENBQUMsQ0FBQy9LLENBQWpDO0VBQ0Q7O1dBRUQ4USxXQUFBLG9CQUFXO0VBQ1QsV0FBTyxLQUFLL1EsQ0FBTCxHQUFTLEtBQUtBLENBQWQsR0FBa0IsS0FBS0MsQ0FBTCxHQUFTLEtBQUtBLENBQXZDO0VBQ0Q7O1dBRUR0RCxTQUFBLGtCQUFTO0VBQ1AsV0FBT1MsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLEtBQUt6UCxDQUFMLEdBQVMsS0FBS0EsQ0FBZCxHQUFrQixLQUFLQyxDQUFMLEdBQVMsS0FBS0EsQ0FBMUMsQ0FBUDtFQUNEOztXQUVEK1EsWUFBQSxxQkFBWTtFQUNWLFdBQU8sS0FBS0osWUFBTCxDQUFrQixLQUFLalUsTUFBTCxFQUFsQixDQUFQO0VBQ0Q7O1dBRURzVSxhQUFBLG9CQUFXakcsQ0FBWCxFQUFjO0VBQ1osV0FBTzVOLElBQUksQ0FBQ3FTLElBQUwsQ0FBVSxLQUFLeUIsaUJBQUwsQ0FBdUJsRyxDQUF2QixDQUFWLENBQVA7RUFDRDs7V0FFRDdLLFNBQUEsZ0JBQU9nUixHQUFQLEVBQVk7RUFDVixRQUFNblIsQ0FBQyxHQUFHLEtBQUtBLENBQWY7RUFDQSxRQUFNQyxDQUFDLEdBQUcsS0FBS0EsQ0FBZjtFQUVBLFNBQUtELENBQUwsR0FBU0EsQ0FBQyxHQUFHNUMsSUFBSSxDQUFDQyxHQUFMLENBQVM4VCxHQUFULENBQUosR0FBb0JsUixDQUFDLEdBQUc3QyxJQUFJLENBQUNHLEdBQUwsQ0FBUzRULEdBQVQsQ0FBakM7RUFDQSxTQUFLbFIsQ0FBTCxHQUFTLENBQUNELENBQUQsR0FBSzVDLElBQUksQ0FBQ0csR0FBTCxDQUFTNFQsR0FBVCxDQUFMLEdBQXFCbFIsQ0FBQyxHQUFHN0MsSUFBSSxDQUFDQyxHQUFMLENBQVM4VCxHQUFULENBQWxDO0VBRUEsV0FBTyxJQUFQO0VBQ0Q7O1dBRURELG9CQUFBLDJCQUFrQmxHLENBQWxCLEVBQXFCO0VBQ25CLFFBQU1vRyxFQUFFLEdBQUcsS0FBS3BSLENBQUwsR0FBU2dMLENBQUMsQ0FBQ2hMLENBQXRCO0VBQ0EsUUFBTXFSLEVBQUUsR0FBRyxLQUFLcFIsQ0FBTCxHQUFTK0ssQ0FBQyxDQUFDL0ssQ0FBdEI7RUFFQSxXQUFPbVIsRUFBRSxHQUFHQSxFQUFMLEdBQVVDLEVBQUUsR0FBR0EsRUFBdEI7RUFDRDs7V0FFREMsT0FBQSxjQUFLdEcsQ0FBTCxFQUFRdUcsS0FBUixFQUFlO0VBQ2IsU0FBS3ZSLENBQUwsSUFBVSxDQUFDZ0wsQ0FBQyxDQUFDaEwsQ0FBRixHQUFNLEtBQUtBLENBQVosSUFBaUJ1UixLQUEzQjtFQUNBLFNBQUt0UixDQUFMLElBQVUsQ0FBQytLLENBQUMsQ0FBQy9LLENBQUYsR0FBTSxLQUFLQSxDQUFaLElBQWlCc1IsS0FBM0I7RUFFQSxXQUFPLElBQVA7RUFDRDs7V0FFREMsU0FBQSxnQkFBT3hHLENBQVAsRUFBVTtFQUNSLFdBQU9BLENBQUMsQ0FBQ2hMLENBQUYsS0FBUSxLQUFLQSxDQUFiLElBQWtCZ0wsQ0FBQyxDQUFDL0ssQ0FBRixLQUFRLEtBQUtBLENBQXRDO0VBQ0Q7O1dBRURrTCxRQUFBLGlCQUFRO0VBQ04sU0FBS25MLENBQUwsR0FBUyxHQUFUO0VBQ0EsU0FBS0MsQ0FBTCxHQUFTLEdBQVQ7RUFDQSxXQUFPLElBQVA7RUFDRDs7V0FFRDhGLFFBQUEsaUJBQVE7RUFDTixXQUFPLElBQUlrSyxRQUFKLENBQWEsS0FBS2pRLENBQWxCLEVBQXFCLEtBQUtDLENBQTFCLENBQVA7RUFDRDs7Ozs7RUM5Skg7O01BV3FCd1I7RUFDbkI7O0VBR0E7O0VBR0E7O0VBR0E7O0VBR0E7O0VBR0E7O0VBR0E7O0VBR0E7O0VBR0E7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLG9CQUFZbEQsSUFBWixFQUFrQjtFQUFBLFNBL0JsQnRQLEVBK0JrQixHQS9CYixFQStCYTtFQUFBLFNBNUJsQjZMLEdBNEJrQixHQTVCWixFQTRCWTtFQUFBLFNBekJsQjRHLElBeUJrQixHQXpCWCxFQXlCVztFQUFBLFNBdEJsQnRLLFVBc0JrQixHQXRCTCxFQXNCSztFQUFBLFNBbkJsQjlCLENBbUJrQixHQW5CZCxFQW1CYztFQUFBLFNBaEJsQjBGLENBZ0JrQixHQWhCZCxFQWdCYztFQUFBLFNBYmxCcE4sQ0Fha0IsR0FiZCxFQWFjO0VBQUEsU0FWbEIrVCxHQVVrQixHQVZaLEVBVVk7O0VBQ2hCO0VBQ0o7RUFDQTtFQUNBO0VBQ0E7RUFDSSxTQUFLdEssSUFBTCxHQUFZLFVBQVo7RUFDQSxTQUFLcEksRUFBTCxHQUFVcUYsSUFBSSxDQUFDckYsRUFBTCxDQUFRLEtBQUtvSSxJQUFiLENBQVY7RUFDQSxTQUFLeUQsR0FBTCxHQUFXLEVBQVg7RUFDQSxTQUFLNEcsSUFBTCxHQUFZLEVBQVo7RUFDQSxTQUFLdEssVUFBTCxHQUFrQixFQUFsQjtFQUVBLFNBQUs5QixDQUFMLEdBQVMsSUFBSTJLLFFBQUosRUFBVDtFQUNBLFNBQUtqRixDQUFMLEdBQVMsSUFBSWlGLFFBQUosRUFBVDtFQUNBLFNBQUtyUyxDQUFMLEdBQVMsSUFBSXFTLFFBQUosRUFBVDtFQUNBLFNBQUtuRixHQUFMLENBQVN4RixDQUFULEdBQWEsSUFBSTJLLFFBQUosRUFBYjtFQUNBLFNBQUtuRixHQUFMLENBQVNFLENBQVQsR0FBYSxJQUFJaUYsUUFBSixFQUFiO0VBQ0EsU0FBS25GLEdBQUwsQ0FBU2xOLENBQVQsR0FBYSxJQUFJcVMsUUFBSixFQUFiO0VBRUEsU0FBSzBCLEdBQUwsR0FBVyxJQUFJL0QsR0FBSixFQUFYO0VBQ0EsU0FBS0csS0FBTDtFQUNBUSxJQUFBQSxJQUFJLElBQUlxRCxRQUFRLENBQUMzRCxPQUFULENBQWlCLElBQWpCLEVBQXVCTSxJQUF2QixDQUFSO0VBQ0Q7Ozs7V0FFRHNELGVBQUEsd0JBQWU7RUFDYixXQUFPelUsSUFBSSxDQUFDa1QsS0FBTCxDQUFXLEtBQUt0RixDQUFMLENBQU9oTCxDQUFsQixFQUFxQixDQUFDLEtBQUtnTCxDQUFMLENBQU8vSyxDQUE3QixJQUFrQ2lKLFFBQVEsQ0FBQ0ksT0FBbEQ7RUFDRDs7V0FFRHlFLFFBQUEsaUJBQVE7RUFDTixTQUFLK0QsSUFBTCxHQUFZN0ksUUFBWjtFQUNBLFNBQUs4SSxHQUFMLEdBQVcsQ0FBWDtFQUVBLFNBQUtDLElBQUwsR0FBWSxLQUFaO0VBQ0EsU0FBS25ILEtBQUwsR0FBYSxLQUFiO0VBQ0EsU0FBS3JFLElBQUwsR0FBWSxJQUFaO0VBQ0EsU0FBS3lMLE1BQUwsR0FBYyxJQUFkO0VBQ0EsU0FBSzNGLE1BQUwsR0FBYyxJQUFkO0VBRUEsU0FBSzRGLE1BQUwsR0FBYyxDQUFkLENBVk07O0VBV04sU0FBS2hILElBQUwsR0FBWSxDQUFaO0VBQ0EsU0FBS2lILE1BQUwsR0FBYyxFQUFkO0VBQ0EsU0FBS1osS0FBTCxHQUFhLENBQWI7RUFDQSxTQUFLclIsS0FBTCxHQUFhLENBQWI7RUFDQSxTQUFLa1MsUUFBTCxHQUFnQixDQUFoQjtFQUNBLFNBQUt2SyxLQUFMLEdBQWEsSUFBYjtFQUVBLFNBQUt2QyxDQUFMLENBQU80SyxHQUFQLENBQVcsQ0FBWCxFQUFjLENBQWQ7RUFDQSxTQUFLbEYsQ0FBTCxDQUFPa0YsR0FBUCxDQUFXLENBQVgsRUFBYyxDQUFkO0VBQ0EsU0FBS3RTLENBQUwsQ0FBT3NTLEdBQVAsQ0FBVyxDQUFYLEVBQWMsQ0FBZDtFQUNBLFNBQUtwRixHQUFMLENBQVN4RixDQUFULENBQVc0SyxHQUFYLENBQWUsQ0FBZixFQUFrQixDQUFsQjtFQUNBLFNBQUtwRixHQUFMLENBQVNFLENBQVQsQ0FBV2tGLEdBQVgsQ0FBZSxDQUFmLEVBQWtCLENBQWxCO0VBQ0EsU0FBS3BGLEdBQUwsQ0FBU2xOLENBQVQsQ0FBV3NTLEdBQVgsQ0FBZSxDQUFmLEVBQWtCLENBQWxCO0VBQ0EsU0FBS21DLE1BQUwsR0FBY3JDLElBQUksQ0FBQ3hCLFVBQW5CO0VBRUEsU0FBS21ELEdBQUwsQ0FBUzVELEtBQVQ7RUFDQWpJLElBQUFBLElBQUksQ0FBQzFDLFdBQUwsQ0FBaUIsS0FBS3NPLElBQXRCO0VBQ0EsU0FBS1ksbUJBQUw7RUFFQSxXQUFPLElBQVA7RUFDRDs7V0FFRC9MLFNBQUEsZ0JBQU9rRSxJQUFQLEVBQWEwQixLQUFiLEVBQW9CO0VBQ2xCLFFBQUksQ0FBQyxLQUFLdEIsS0FBVixFQUFpQjtFQUNmLFdBQUtrSCxHQUFMLElBQVl0SCxJQUFaO0VBQ0EsV0FBSzhILGVBQUwsQ0FBcUI5SCxJQUFyQixFQUEyQjBCLEtBQTNCO0VBQ0Q7O0VBRUQsUUFBSSxLQUFLNEYsR0FBTCxHQUFXLEtBQUtELElBQXBCLEVBQTBCO0VBQ3hCLFVBQU01UixLQUFLLEdBQUcsS0FBS21TLE1BQUwsQ0FBWSxLQUFLTixHQUFMLEdBQVcsS0FBS0QsSUFBNUIsQ0FBZDtFQUNBLFdBQUtJLE1BQUwsR0FBYzlVLElBQUksQ0FBQ29WLEdBQUwsQ0FBUyxJQUFJdFMsS0FBYixFQUFvQixDQUFwQixDQUFkO0VBQ0QsS0FIRCxNQUdPO0VBQ0wsV0FBSytELE9BQUw7RUFDRDtFQUNGOztXQUVEc08sa0JBQUEseUJBQWdCOUgsSUFBaEIsRUFBc0IwQixLQUF0QixFQUE2QjtFQUMzQixRQUFNeFAsTUFBTSxHQUFHLEtBQUt5SyxVQUFMLENBQWdCekssTUFBL0I7RUFDQSxRQUFJRSxDQUFKOztFQUVBLFNBQUtBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0YsTUFBaEIsRUFBd0JFLENBQUMsRUFBekIsRUFBNkI7RUFDM0IsV0FBS3VLLFVBQUwsQ0FBZ0J2SyxDQUFoQixLQUFzQixLQUFLdUssVUFBTCxDQUFnQnZLLENBQWhCLEVBQW1CNFYsY0FBbkIsQ0FBa0MsSUFBbEMsRUFBd0NoSSxJQUF4QyxFQUE4QzBCLEtBQTlDLENBQXRCO0VBQ0Q7RUFDRjtFQUVEO0VBQ0Y7RUFDQTs7O1dBQ0V1RyxlQUFBLHNCQUFhQyxTQUFiLEVBQXdCO0VBQ3RCLFNBQUt2TCxVQUFMLENBQWdCeEIsSUFBaEIsQ0FBcUIrTSxTQUFyQjtFQUVBLFFBQUlBLFNBQVMsQ0FBQ3ZPLGNBQVYsQ0FBeUIsU0FBekIsQ0FBSixFQUF5Q3VPLFNBQVMsQ0FBQ0MsT0FBVixDQUFrQmhOLElBQWxCLENBQXVCLElBQXZCO0VBQ3pDK00sSUFBQUEsU0FBUyxDQUFDRSxVQUFWLENBQXFCLElBQXJCO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7OztXQUNFQyxnQkFBQSx1QkFBYzFMLFVBQWQsRUFBMEI7RUFDeEIsUUFBTXpLLE1BQU0sR0FBR3lLLFVBQVUsQ0FBQ3pLLE1BQTFCO0VBQ0EsUUFBSUUsQ0FBSjs7RUFFQSxTQUFLQSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdGLE1BQWhCLEVBQXdCRSxDQUFDLEVBQXpCLEVBQTZCO0VBQzNCLFdBQUs2VixZQUFMLENBQWtCdEwsVUFBVSxDQUFDdkssQ0FBRCxDQUE1QjtFQUNEO0VBQ0Y7O1dBRURrVyxrQkFBQSx5QkFBZ0JKLFNBQWhCLEVBQTJCO0VBQ3pCLFFBQU14RyxLQUFLLEdBQUcsS0FBSy9FLFVBQUwsQ0FBZ0I3RCxPQUFoQixDQUF3Qm9QLFNBQXhCLENBQWQ7O0VBRUEsUUFBSXhHLEtBQUssR0FBRyxDQUFDLENBQWIsRUFBZ0I7RUFDZCxVQUFNd0csVUFBUyxHQUFHLEtBQUt2TCxVQUFMLENBQWdCd0IsTUFBaEIsQ0FBdUJ1RCxLQUF2QixFQUE4QixDQUE5QixDQUFsQjs7RUFDQXdHLE1BQUFBLFVBQVMsQ0FBQ0MsT0FBVixHQUFvQixJQUFwQjtFQUNEO0VBQ0Y7O1dBRUROLHNCQUFBLCtCQUFzQjtFQUNwQnhNLElBQUFBLElBQUksQ0FBQ2hELFVBQUwsQ0FBZ0IsS0FBS3NFLFVBQXJCO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O1dBQ0VuRCxVQUFBLG1CQUFVO0VBQ1IsU0FBS3FPLG1CQUFMO0VBQ0EsU0FBS0osTUFBTCxHQUFjLENBQWQ7RUFDQSxTQUFLRixJQUFMLEdBQVksSUFBWjtFQUNBLFNBQUsxRixNQUFMLEdBQWMsSUFBZDtFQUNEOzs7OztBQzVLSCxrQkFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFDRTtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFMEcsRUFBQUEsUUFqQmEsb0JBaUJKQyxDQWpCSSxFQWlCRDtFQUNWLFFBQU1DLEtBQUssR0FBR0QsQ0FBQyxDQUFDdlMsTUFBRixDQUFTLENBQVQsTUFBZ0IsR0FBaEIsR0FBc0J1UyxDQUFDLENBQUNFLFNBQUYsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUF0QixHQUEwQ0YsQ0FBeEQ7RUFDQSxRQUFNcEYsQ0FBQyxHQUFHdUYsUUFBUSxDQUFDRixLQUFLLENBQUNDLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBRCxFQUF3QixFQUF4QixDQUFsQjtFQUNBLFFBQU1yRixDQUFDLEdBQUdzRixRQUFRLENBQUNGLEtBQUssQ0FBQ0MsU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFELEVBQXdCLEVBQXhCLENBQWxCO0VBQ0EsUUFBTXRWLENBQUMsR0FBR3VWLFFBQVEsQ0FBQ0YsS0FBSyxDQUFDQyxTQUFOLENBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQUQsRUFBd0IsRUFBeEIsQ0FBbEI7RUFFQSxXQUFPO0VBQUV0RixNQUFBQSxDQUFDLEVBQURBLENBQUY7RUFBS0MsTUFBQUEsQ0FBQyxFQUFEQSxDQUFMO0VBQVFqUSxNQUFBQSxDQUFDLEVBQURBO0VBQVIsS0FBUDtFQUNELEdBeEJZOztFQTBCYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFd1YsRUFBQUEsUUFwQ2Esb0JBb0NKQyxHQXBDSSxFQW9DQztFQUNaLG9CQUFjQSxHQUFHLENBQUN6RixDQUFsQixVQUF3QnlGLEdBQUcsQ0FBQ3hGLENBQTVCLFVBQWtDd0YsR0FBRyxDQUFDelYsQ0FBdEM7RUFDRCxHQXRDWTtFQXdDYjBWLEVBQUFBLG9CQXhDYSxnQ0F3Q1FqTyxDQXhDUixFQXdDVztFQUN0QixXQUFPa08sTUFBTSxDQUFDbE8sQ0FBQyxDQUFDcU0sR0FBRixDQUFNOUQsQ0FBUCxDQUFOLEdBQWtCLEtBQWxCLEdBQTBCMkYsTUFBTSxDQUFDbE8sQ0FBQyxDQUFDcU0sR0FBRixDQUFNN0QsQ0FBUCxDQUFOLEdBQWtCLEdBQTVDLEdBQWtEMEYsTUFBTSxDQUFDbE8sQ0FBQyxDQUFDcU0sR0FBRixDQUFNOVQsQ0FBUCxDQUEvRDtFQUNEO0VBMUNZLENBQWY7O01DRXFCNFY7RUFDbkIsbUJBQVk1RixDQUFaLEVBQWVzRCxHQUFmLEVBQW9CO0VBQ2xCLFNBQUt0RCxDQUFMLEdBQVN6USxJQUFJLENBQUNzVyxHQUFMLENBQVM3RixDQUFULEtBQWUsQ0FBeEI7RUFDQSxTQUFLc0QsR0FBTCxHQUFXQSxHQUFHLElBQUksQ0FBbEI7RUFDRDs7OztXQUVEakIsTUFBQSxhQUFJckMsQ0FBSixFQUFPc0QsR0FBUCxFQUFZO0VBQ1YsU0FBS3RELENBQUwsR0FBU0EsQ0FBVDtFQUNBLFNBQUtzRCxHQUFMLEdBQVdBLEdBQVg7RUFDQSxXQUFPLElBQVA7RUFDRDs7V0FFRHdDLE9BQUEsY0FBSzlGLENBQUwsRUFBUTtFQUNOLFNBQUtBLENBQUwsR0FBU0EsQ0FBVDtFQUNBLFdBQU8sSUFBUDtFQUNEOztXQUVEK0YsU0FBQSxnQkFBT3pDLEdBQVAsRUFBWTtFQUNWLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDtFQUNBLFdBQU8sSUFBUDtFQUNEOztXQUVEcEcsT0FBQSxjQUFLekYsQ0FBTCxFQUFRO0VBQ04sU0FBS3VJLENBQUwsR0FBU3ZJLENBQUMsQ0FBQ3VJLENBQVg7RUFDQSxTQUFLc0QsR0FBTCxHQUFXN0wsQ0FBQyxDQUFDNkwsR0FBYjtFQUNBLFdBQU8sSUFBUDtFQUNEOztXQUVEMEMsV0FBQSxvQkFBVztFQUNULFdBQU8sSUFBSTVELFFBQUosQ0FBYSxLQUFLNkQsSUFBTCxFQUFiLEVBQTBCLEtBQUtDLElBQUwsRUFBMUIsQ0FBUDtFQUNEOztXQUVERCxPQUFBLGdCQUFPO0VBQ0wsV0FBTyxLQUFLakcsQ0FBTCxHQUFTelEsSUFBSSxDQUFDRyxHQUFMLENBQVMsS0FBSzRULEdBQWQsQ0FBaEI7RUFDRDs7V0FFRDRDLE9BQUEsZ0JBQU87RUFDTCxXQUFPLENBQUMsS0FBS2xHLENBQU4sR0FBVXpRLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUs4VCxHQUFkLENBQWpCO0VBQ0Q7O1dBRURILFlBQUEscUJBQVk7RUFDVixTQUFLbkQsQ0FBTCxHQUFTLENBQVQ7RUFDQSxXQUFPLElBQVA7RUFDRDs7V0FFRDJELFNBQUEsZ0JBQU94RyxDQUFQLEVBQVU7RUFDUixXQUFPQSxDQUFDLENBQUM2QyxDQUFGLEtBQVEsS0FBS0EsQ0FBYixJQUFrQjdDLENBQUMsQ0FBQ21HLEdBQUYsS0FBVSxLQUFLQSxHQUF4QztFQUNEOztXQUVEaEcsUUFBQSxpQkFBUTtFQUNOLFNBQUswQyxDQUFMLEdBQVMsR0FBVDtFQUNBLFNBQUtzRCxHQUFMLEdBQVcsR0FBWDtFQUNBLFdBQU8sSUFBUDtFQUNEOztXQUVEcEwsUUFBQSxpQkFBUTtFQUNOLFdBQU8sSUFBSTBOLE9BQUosQ0FBWSxLQUFLNUYsQ0FBakIsRUFBb0IsS0FBS3NELEdBQXpCLENBQVA7RUFDRDs7Ozs7RUMzREgsSUFBTTZDLElBQUksR0FBRztFQUNYbk8sRUFBQUEsTUFEVyxrQkFDSm9PLElBREksRUFDRTtFQUNYLFFBQU1DLEdBQUcsR0FBRyxJQUFJQyxZQUFKLENBQWlCLENBQWpCLENBQVo7RUFDQSxRQUFJRixJQUFKLEVBQVUsS0FBSy9ELEdBQUwsQ0FBUytELElBQVQsRUFBZUMsR0FBZjtFQUVWLFdBQU9BLEdBQVA7RUFDRCxHQU5VO0VBUVhoRSxFQUFBQSxHQVJXLGVBUVBrRSxJQVJPLEVBUURDLElBUkMsRUFRSztFQUNkLFNBQUssSUFBSXhYLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEI7RUFBNEJ3WCxNQUFBQSxJQUFJLENBQUN4WCxDQUFELENBQUosR0FBVXVYLElBQUksQ0FBQ3ZYLENBQUQsQ0FBZDtFQUE1Qjs7RUFFQSxXQUFPd1gsSUFBUDtFQUNELEdBWlU7RUFjWEMsRUFBQUEsUUFkVyxvQkFjRkosR0FkRSxFQWNHRyxJQWRILEVBY1NKLElBZFQsRUFjZTtFQUN4QixRQUFJblcsR0FBRyxHQUFHb1csR0FBRyxDQUFDLENBQUQsQ0FBYjtFQUFBLFFBQ0VuVyxHQUFHLEdBQUdtVyxHQUFHLENBQUMsQ0FBRCxDQURYO0VBQUEsUUFFRWxXLEdBQUcsR0FBR2tXLEdBQUcsQ0FBQyxDQUFELENBRlg7RUFBQSxRQUdFalcsR0FBRyxHQUFHaVcsR0FBRyxDQUFDLENBQUQsQ0FIWDtFQUFBLFFBSUVoVyxHQUFHLEdBQUdnVyxHQUFHLENBQUMsQ0FBRCxDQUpYO0VBQUEsUUFLRTlWLEdBQUcsR0FBRzhWLEdBQUcsQ0FBQyxDQUFELENBTFg7RUFBQSxRQU1FN1YsR0FBRyxHQUFHNlYsR0FBRyxDQUFDLENBQUQsQ0FOWDtFQUFBLFFBT0UzVixHQUFHLEdBQUc4VixJQUFJLENBQUMsQ0FBRCxDQVBaO0VBQUEsUUFRRTdWLEdBQUcsR0FBRzZWLElBQUksQ0FBQyxDQUFELENBUlo7RUFBQSxRQVNFNVYsR0FBRyxHQUFHNFYsSUFBSSxDQUFDLENBQUQsQ0FUWjtFQUFBLFFBVUUzVixHQUFHLEdBQUcyVixJQUFJLENBQUMsQ0FBRCxDQVZaO0VBQUEsUUFXRTFWLEdBQUcsR0FBRzBWLElBQUksQ0FBQyxDQUFELENBWFo7RUFBQSxRQVlFeFYsR0FBRyxHQUFHd1YsSUFBSSxDQUFDLENBQUQsQ0FaWjtFQUFBLFFBYUV2VixHQUFHLEdBQUd1VixJQUFJLENBQUMsQ0FBRCxDQWJaO0VBZUFKLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVTFWLEdBQUcsR0FBR1QsR0FBTixHQUFZVSxHQUFHLEdBQUdQLEdBQTVCO0VBQ0FnVyxJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVUxVixHQUFHLEdBQUdSLEdBQU4sR0FBWVMsR0FBRyxHQUFHTixHQUE1QjtFQUNBK1YsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFValcsR0FBRyxHQUFHUyxHQUFoQjtFQUNBd1YsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVdlYsR0FBRyxHQUFHWixHQUFOLEdBQVlhLEdBQUcsR0FBR1YsR0FBNUI7RUFDQWdXLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVXZWLEdBQUcsR0FBR1gsR0FBTixHQUFZWSxHQUFHLEdBQUdULEdBQTVCO0VBQ0ErVixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVwVixHQUFHLEdBQUdmLEdBQU4sR0FBWWdCLEdBQUcsR0FBR2IsR0FBbEIsR0FBd0JHLEdBQWxDO0VBQ0E2VixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVwVixHQUFHLEdBQUdkLEdBQU4sR0FBWWUsR0FBRyxHQUFHWixHQUFsQixHQUF3QkcsR0FBbEM7RUFFQSxXQUFPNFYsSUFBUDtFQUNELEdBdkNVO0VBeUNYTSxFQUFBQSxPQXpDVyxtQkF5Q0hMLEdBekNHLEVBeUNFRCxJQXpDRixFQXlDUTtFQUNqQixRQUFJblcsR0FBRyxHQUFHb1csR0FBRyxDQUFDLENBQUQsQ0FBYjtFQUFBLFFBQ0VuVyxHQUFHLEdBQUdtVyxHQUFHLENBQUMsQ0FBRCxDQURYO0VBQUEsUUFFRWpXLEdBQUcsR0FBR2lXLEdBQUcsQ0FBQyxDQUFELENBRlg7RUFBQSxRQUdFaFcsR0FBRyxHQUFHZ1csR0FBRyxDQUFDLENBQUQsQ0FIWDtFQUFBLFFBSUU5VixHQUFHLEdBQUc4VixHQUFHLENBQUMsQ0FBRCxDQUpYO0VBQUEsUUFLRTdWLEdBQUcsR0FBRzZWLEdBQUcsQ0FBQyxDQUFELENBTFg7RUFBQSxRQU1FMVYsR0FBRyxHQUFHTixHQU5SO0VBQUEsUUFPRVMsR0FBRyxHQUFHLENBQUNWLEdBUFQ7RUFBQSxRQVFFYSxHQUFHLEdBQUdULEdBQUcsR0FBR0osR0FBTixHQUFZQyxHQUFHLEdBQUdFLEdBUjFCO0VBQUEsUUFTRW9XLENBQUMsR0FBRzFXLEdBQUcsR0FBR1UsR0FBTixHQUFZVCxHQUFHLEdBQUdZLEdBVHhCO0VBQUEsUUFVRU0sRUFWRjtFQVlBQSxJQUFBQSxFQUFFLEdBQUcsSUFBSXVWLENBQVQ7RUFDQVAsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVelYsR0FBRyxHQUFHUyxFQUFoQjtFQUNBZ1YsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVLENBQUNsVyxHQUFELEdBQU9rQixFQUFqQjtFQUNBZ1YsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVdFYsR0FBRyxHQUFHTSxFQUFoQjtFQUNBZ1YsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVblcsR0FBRyxHQUFHbUIsRUFBaEI7RUFDQWdWLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVW5WLEdBQUcsR0FBR0csRUFBaEI7RUFDQWdWLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxDQUFDLENBQUM1VixHQUFELEdBQU9QLEdBQVAsR0FBYUMsR0FBRyxHQUFHSyxHQUFwQixJQUEyQmEsRUFBckM7RUFFQSxXQUFPZ1YsSUFBUDtFQUNELEdBL0RVO0VBaUVYUSxFQUFBQSxZQWpFVyx3QkFpRUVDLENBakVGLEVBaUVLQyxHQWpFTCxFQWlFVVYsSUFqRVYsRUFpRWdCO0VBQ3pCLFFBQUlqVSxDQUFDLEdBQUcyVSxHQUFHLENBQUMsQ0FBRCxDQUFYO0VBQUEsUUFDRTFVLENBQUMsR0FBRzBVLEdBQUcsQ0FBQyxDQUFELENBRFQ7RUFHQVYsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFValUsQ0FBQyxHQUFHMFUsQ0FBQyxDQUFDLENBQUQsQ0FBTCxHQUFXelUsQ0FBQyxHQUFHeVUsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsR0FBc0JBLENBQUMsQ0FBQyxDQUFELENBQWpDO0VBQ0FULElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVWpVLENBQUMsR0FBRzBVLENBQUMsQ0FBQyxDQUFELENBQUwsR0FBV3pVLENBQUMsR0FBR3lVLENBQUMsQ0FBQyxDQUFELENBQWhCLEdBQXNCQSxDQUFDLENBQUMsQ0FBRCxDQUFqQztFQUVBLFdBQU9ULElBQVA7RUFDRDtFQXpFVSxDQUFiOztNQ0dxQjdGO0VBQ25CLGdCQUFZeFEsQ0FBWixFQUFlQyxDQUFmLEVBQWtCOEwsTUFBbEIsRUFBMEI7RUFDeEIsUUFBSTdELElBQUksQ0FBQ3JELE9BQUwsQ0FBYTdFLENBQWIsQ0FBSixFQUFxQjtFQUNuQixXQUFLNkUsT0FBTCxHQUFlLElBQWY7RUFDQSxXQUFLN0UsQ0FBTCxHQUFTQSxDQUFUO0VBQ0QsS0FIRCxNQUdPO0VBQ0wsV0FBSzZFLE9BQUwsR0FBZSxLQUFmO0VBQ0EsV0FBSzdFLENBQUwsR0FBU2tJLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXpFLENBQWYsRUFBa0IsQ0FBbEIsQ0FBVDtFQUNBLFdBQUtDLENBQUwsR0FBU2lJLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXhFLENBQWYsRUFBa0IsS0FBS0QsQ0FBdkIsQ0FBVDtFQUNBLFdBQUsrTCxNQUFMLEdBQWM3RCxJQUFJLENBQUN6RCxTQUFMLENBQWVzSCxNQUFmLEVBQXVCLEtBQXZCLENBQWQ7RUFDRDtFQUNGOzs7O1dBRURpTCxXQUFBLGtCQUFTbkwsS0FBVCxFQUF3QjtFQUFBLFFBQWZBLEtBQWU7RUFBZkEsTUFBQUEsS0FBZSxHQUFQLEtBQU87RUFBQTs7RUFDdEIsUUFBSSxLQUFLaEgsT0FBVCxFQUFrQjtFQUNoQixhQUFPcUQsSUFBSSxDQUFDN0MsZ0JBQUwsQ0FBc0IsS0FBS3JGLENBQTNCLENBQVA7RUFDRCxLQUZELE1BRU87RUFDTCxVQUFJLENBQUMsS0FBSytMLE1BQVYsRUFBa0I7RUFDaEIsZUFBT1QsUUFBUSxDQUFDTSxVQUFULENBQW9CLEtBQUs1TCxDQUF6QixFQUE0QixLQUFLQyxDQUFqQyxFQUFvQzRMLEtBQXBDLENBQVA7RUFDRCxPQUZELE1BRU87RUFDTCxlQUFPUCxRQUFRLENBQUNRLGNBQVQsQ0FBd0IsS0FBSzlMLENBQTdCLEVBQWdDLEtBQUtDLENBQXJDLEVBQXdDNEwsS0FBeEMsQ0FBUDtFQUNEO0VBQ0Y7RUFDRjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztTQUNTb0wsZUFBUCxzQkFBb0JqWCxDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEJWLENBQTFCLEVBQTZCO0VBQzNCLFFBQUlTLENBQUMsWUFBWXdRLElBQWpCLEVBQXVCO0VBQ3JCLGFBQU94USxDQUFQO0VBQ0QsS0FGRCxNQUVPO0VBQ0wsVUFBSUMsQ0FBQyxLQUFLMkUsU0FBVixFQUFxQjtFQUNuQixlQUFPLElBQUk0TCxJQUFKLENBQVN4USxDQUFULENBQVA7RUFDRCxPQUZELE1BRU87RUFDTCxZQUFJVCxDQUFDLEtBQUtxRixTQUFWLEVBQXFCLE9BQU8sSUFBSTRMLElBQUosQ0FBU3hRLENBQVQsRUFBWUMsQ0FBWixDQUFQLENBQXJCLEtBQ0ssT0FBTyxJQUFJdVEsSUFBSixDQUFTeFEsQ0FBVCxFQUFZQyxDQUFaLEVBQWVWLENBQWYsQ0FBUDtFQUNOO0VBQ0Y7RUFDRjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7U0FDU2tSLGVBQVAsc0JBQW9CeUcsR0FBcEIsRUFBeUI7RUFDdkIsV0FBT0EsR0FBRyxZQUFZMUcsSUFBZixHQUFzQjBHLEdBQUcsQ0FBQ0YsUUFBSixFQUF0QixHQUF1Q0UsR0FBOUM7RUFDRDs7Ozs7TUMvRGtCQzs7O0VBQ25CLHFCQUFZbE4sS0FBWixFQUFtQjtFQUFBOztFQUNqQjtFQUNBLFVBQUttTixJQUFMLEdBQVlsUCxJQUFJLENBQUM5QyxPQUFMLENBQWE2RSxLQUFiLENBQVo7RUFGaUI7RUFHbEI7Ozs7V0FFRCtNLFdBQUEsb0JBQVc7RUFDVCxRQUFNcFUsR0FBRyxHQUFHc0YsSUFBSSxDQUFDN0MsZ0JBQUwsQ0FBc0IsS0FBSytSLElBQTNCLENBQVo7RUFDQSxXQUFPeFUsR0FBRyxLQUFLLFFBQVIsSUFBb0JBLEdBQUcsS0FBSyxRQUE1QixHQUF1QzBJLFFBQVEsQ0FBQ1csV0FBVCxFQUF2QyxHQUFnRXJKLEdBQXZFO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7Y0FDU3lVLGtCQUFQLHlCQUF1QmxTLEdBQXZCLEVBQTRCO0VBQzFCLFFBQUksQ0FBQ0EsR0FBTCxFQUFVLE9BQU8sSUFBUDtFQUVWLFFBQUlBLEdBQUcsWUFBWWdTLFNBQW5CLEVBQThCLE9BQU9oUyxHQUFQLENBQTlCLEtBQ0ssT0FBTyxJQUFJZ1MsU0FBSixDQUFjaFMsR0FBZCxDQUFQO0VBQ047OztJQTNCb0NxTDs7TUNKbEI4RztFQUNuQixxQkFBWWxWLENBQVosRUFBZUMsQ0FBZixFQUFrQnNRLENBQWxCLEVBQXFCMEMsQ0FBckIsRUFBd0I7RUFDdEIsU0FBS2pULENBQUwsR0FBU0EsQ0FBVDtFQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtFQUVBLFNBQUtmLEtBQUwsR0FBYXFSLENBQWI7RUFDQSxTQUFLcFIsTUFBTCxHQUFjOFQsQ0FBZDtFQUVBLFNBQUtrQyxNQUFMLEdBQWMsS0FBS2xWLENBQUwsR0FBUyxLQUFLZCxNQUE1QjtFQUNBLFNBQUtpVyxLQUFMLEdBQWEsS0FBS3BWLENBQUwsR0FBUyxLQUFLZCxLQUEzQjtFQUNEOzs7O1dBRURtVyxXQUFBLGtCQUFTclYsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7RUFDYixRQUFJRCxDQUFDLElBQUksS0FBS29WLEtBQVYsSUFBbUJwVixDQUFDLElBQUksS0FBS0EsQ0FBN0IsSUFBa0NDLENBQUMsSUFBSSxLQUFLa1YsTUFBNUMsSUFBc0RsVixDQUFDLElBQUksS0FBS0EsQ0FBcEUsRUFBdUUsT0FBTyxJQUFQLENBQXZFLEtBQ0ssT0FBTyxLQUFQO0VBQ047Ozs7O01DWmtCcVY7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLGdCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QjtFQUMzQixTQUFLQyxNQUFMLEdBQWNySCxNQUFJLENBQUN5RyxZQUFMLENBQWtCL08sSUFBSSxDQUFDekQsU0FBTCxDQUFla1QsTUFBZixFQUF1QixDQUF2QixDQUFsQixDQUFkO0VBQ0EsU0FBS0csT0FBTCxHQUFldEgsTUFBSSxDQUFDeUcsWUFBTCxDQUFrQi9PLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW1ULE9BQWYsRUFBd0IsQ0FBeEIsQ0FBbEIsQ0FBZjtFQUVBLFNBQUtHLFNBQUwsR0FBaUIsQ0FBakI7RUFDQSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0VBQ0EsU0FBSzNKLElBQUw7RUFDRDs7OztXQUVEQSxPQUFBLGdCQUFPO0VBQ0wsU0FBSzBKLFNBQUwsR0FBaUIsQ0FBakI7RUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtGLE9BQUwsQ0FBYWQsUUFBYixFQUFoQjtFQUNEOztXQUVEQSxXQUFBLGtCQUFTbkssSUFBVCxFQUFlO0VBQ2IsU0FBS2tMLFNBQUwsSUFBa0JsTCxJQUFsQjs7RUFFQSxRQUFJLEtBQUtrTCxTQUFMLElBQWtCLEtBQUtDLFFBQTNCLEVBQXFDO0VBQ25DLFdBQUtELFNBQUwsR0FBaUIsQ0FBakI7RUFDQSxXQUFLQyxRQUFMLEdBQWdCLEtBQUtGLE9BQUwsQ0FBYWQsUUFBYixFQUFoQjs7RUFFQSxVQUFJLEtBQUthLE1BQUwsQ0FBWTVYLENBQVosS0FBa0IsQ0FBdEIsRUFBeUI7RUFDdkIsWUFBSSxLQUFLNFgsTUFBTCxDQUFZYixRQUFaLENBQXFCLEtBQXJCLElBQThCLEdBQWxDLEVBQXVDLE9BQU8sQ0FBUCxDQUF2QyxLQUNLLE9BQU8sQ0FBUDtFQUNOLE9BSEQsTUFHTztFQUNMLGVBQU8sS0FBS2EsTUFBTCxDQUFZYixRQUFaLENBQXFCLElBQXJCLENBQVA7RUFDRDtFQUNGOztFQUVELFdBQU8sQ0FBUDtFQUNEOzs7OztNQzdDa0JpQjs7Ozs7V0FDbkI5SCxRQUFBLGlCQUFROztXQUVSOUIsT0FBQSxjQUFLdkYsT0FBTCxFQUFja0UsUUFBZCxFQUF3QjtFQUN0QixRQUFJQSxRQUFKLEVBQWM7RUFDWixXQUFLaUksVUFBTCxDQUFnQmpJLFFBQWhCO0VBQ0QsS0FGRCxNQUVPO0VBQ0wsV0FBS2lJLFVBQUwsQ0FBZ0JuTSxPQUFoQjtFQUNEO0VBQ0Y7OztXQUdEbU0sYUFBQSxvQkFBVzlRLE1BQVgsRUFBbUI7Ozs7O01DVEErVDs7O0VBQ25CLGdCQUFZbFksQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixDQUFsQixFQUFxQjtFQUFBOztFQUNuQjtFQUVBLFVBQUs0WSxPQUFMLEdBQWUzSCxNQUFJLENBQUN5RyxZQUFMLENBQWtCalgsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCVixDQUF4QixDQUFmO0VBQ0EsVUFBS2tLLElBQUwsR0FBWSxNQUFaO0VBSm1CO0VBS3BCOzs7O1dBRUR3TCxhQUFBLG9CQUFXOVEsTUFBWCxFQUFtQjtFQUNqQixRQUFJLEtBQUtnVSxPQUFMLENBQWFuWSxDQUFiLEtBQW1CcUwsUUFBdkIsRUFBaUNsSCxNQUFNLENBQUMrUCxJQUFQLEdBQWM3SSxRQUFkLENBQWpDLEtBQ0tsSCxNQUFNLENBQUMrUCxJQUFQLEdBQWMsS0FBS2lFLE9BQUwsQ0FBYW5CLFFBQWIsRUFBZDtFQUNOOzs7SUFYK0JpQjs7TUNEYkc7RUFDbkIsa0JBQWM7RUFDWixTQUFLQyxNQUFMLEdBQWMsSUFBSWhHLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQWQ7RUFDQSxTQUFLOU0sTUFBTCxHQUFjLENBQWQ7RUFDQSxTQUFLK1MsU0FBTCxHQUFpQixNQUFqQjtFQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFiO0VBQ0Q7Ozs7V0FFREMsY0FBQSx1QkFBYzs7V0FFZEMsV0FBQSxrQkFBU3pMLFFBQVQsRUFBbUI7O1dBRW5CM0csVUFBQSxtQkFBVTtFQUNSLFNBQUtnUyxNQUFMLEdBQWMsSUFBZDtFQUNEOzs7OztNQ2RrQks7OztFQUNuQixxQkFBWXRXLENBQVosRUFBZUMsQ0FBZixFQUFrQjtFQUFBOztFQUNoQjtFQUVBLFVBQUtELENBQUwsR0FBU0EsQ0FBVDtFQUNBLFVBQUtDLENBQUwsR0FBU0EsQ0FBVDtFQUpnQjtFQUtqQjs7OztXQUVEbVcsY0FBQSx1QkFBYztFQUNaLFNBQUtILE1BQUwsQ0FBWWpXLENBQVosR0FBZ0IsS0FBS0EsQ0FBckI7RUFDQSxTQUFLaVcsTUFBTCxDQUFZaFcsQ0FBWixHQUFnQixLQUFLQSxDQUFyQjtFQUVBLFdBQU8sS0FBS2dXLE1BQVo7RUFDRDs7V0FFREksV0FBQSxrQkFBU3pMLFFBQVQsRUFBbUI7RUFDakIsUUFBSSxLQUFLdUwsS0FBVCxFQUFnQjtFQUNkSSxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxvREFBZDtFQUNBLFdBQUtMLEtBQUwsR0FBYSxLQUFiO0VBQ0Q7RUFDRjs7O0lBcEJvQ0g7O01DRWxCUzs7O0VBQ25CLG9CQUFZQyxJQUFaLEVBQWtCO0VBQUE7O0VBQ2hCO0VBQ0EsVUFBS0EsSUFBTCxHQUFZNVEsSUFBSSxDQUFDekQsU0FBTCxDQUFlcVUsSUFBZixFQUFxQixJQUFJSixTQUFKLEVBQXJCLENBQVo7RUFDQSxVQUFLalAsSUFBTCxHQUFZLFVBQVo7RUFIZ0I7RUFJakI7Ozs7V0FFRDBHLFFBQUEsZUFBTTJJLElBQU4sRUFBWTtFQUNWLFNBQUtBLElBQUwsR0FBWTVRLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXFVLElBQWYsRUFBcUIsSUFBSUosU0FBSixFQUFyQixDQUFaO0VBQ0Q7O1dBRUR6RCxhQUFBLG9CQUFXOVEsTUFBWCxFQUFtQjtFQUNqQixTQUFLMlUsSUFBTCxDQUFVTixXQUFWO0VBRUFyVSxJQUFBQSxNQUFNLENBQUN1RCxDQUFQLENBQVN0RixDQUFULEdBQWEsS0FBSzBXLElBQUwsQ0FBVVQsTUFBVixDQUFpQmpXLENBQTlCO0VBQ0ErQixJQUFBQSxNQUFNLENBQUN1RCxDQUFQLENBQVNyRixDQUFULEdBQWEsS0FBS3lXLElBQUwsQ0FBVVQsTUFBVixDQUFpQmhXLENBQTlCO0VBQ0Q7OztJQWhCbUM0Vjs7TUNHakJjOzs7RUFDbkIsb0JBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCcFMsSUFBMUIsRUFBZ0M7RUFBQTs7RUFDOUI7RUFFQSxVQUFLcVMsSUFBTCxHQUFZMUksTUFBSSxDQUFDeUcsWUFBTCxDQUFrQitCLElBQWxCLENBQVo7RUFDQSxVQUFLRyxNQUFMLEdBQWMzSSxNQUFJLENBQUN5RyxZQUFMLENBQWtCZ0MsTUFBbEIsQ0FBZDtFQUNBLFVBQUtwUyxJQUFMLEdBQVlxQixJQUFJLENBQUN6RCxTQUFMLENBQWVvQyxJQUFmLEVBQXFCLFFBQXJCLENBQVo7RUFFQSxVQUFLNEMsSUFBTCxHQUFZLFVBQVo7RUFQOEI7RUFRL0I7Ozs7V0FFRDBHLFFBQUEsZUFBTTZJLElBQU4sRUFBWUMsTUFBWixFQUFvQnBTLElBQXBCLEVBQTBCO0VBQ3hCLFNBQUtxUyxJQUFMLEdBQVkxSSxNQUFJLENBQUN5RyxZQUFMLENBQWtCK0IsSUFBbEIsQ0FBWjtFQUNBLFNBQUtHLE1BQUwsR0FBYzNJLE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0JnQyxNQUFsQixDQUFkO0VBQ0EsU0FBS3BTLElBQUwsR0FBWXFCLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW9DLElBQWYsRUFBcUIsUUFBckIsQ0FBWjtFQUNEOztXQUVEdVMsb0JBQUEsMkJBQWtCQyxFQUFsQixFQUFzQjtFQUNwQixXQUFPQSxFQUFFLEdBQUc3TCxNQUFNLENBQUNrQyxPQUFuQjtFQUNEOztXQUVEdUYsYUFBQSxvQkFBVzlRLE1BQVgsRUFBbUI7RUFDakIsUUFBSSxLQUFLMEMsSUFBTCxLQUFjLEdBQWQsSUFBcUIsS0FBS0EsSUFBTCxLQUFjLEdBQW5DLElBQTBDLEtBQUtBLElBQUwsS0FBYyxPQUE1RCxFQUFxRTtFQUNuRSxVQUFNeVMsT0FBTyxHQUFHLElBQUl6RCxPQUFKLENBQ2QsS0FBS3VELGlCQUFMLENBQXVCLEtBQUtGLElBQUwsQ0FBVWxDLFFBQVYsRUFBdkIsQ0FEYyxFQUVkLEtBQUttQyxNQUFMLENBQVluQyxRQUFaLEtBQXlCMUwsUUFBUSxDQUFDRyxNQUZwQixDQUFoQjtFQUtBdEgsTUFBQUEsTUFBTSxDQUFDaUosQ0FBUCxDQUFTaEwsQ0FBVCxHQUFha1gsT0FBTyxDQUFDcEQsSUFBUixFQUFiO0VBQ0EvUixNQUFBQSxNQUFNLENBQUNpSixDQUFQLENBQVMvSyxDQUFULEdBQWFpWCxPQUFPLENBQUNuRCxJQUFSLEVBQWI7RUFDRCxLQVJELE1BUU87RUFDTGhTLE1BQUFBLE1BQU0sQ0FBQ2lKLENBQVAsQ0FBU2hMLENBQVQsR0FBYSxLQUFLZ1gsaUJBQUwsQ0FBdUIsS0FBS0YsSUFBTCxDQUFVbEMsUUFBVixFQUF2QixDQUFiO0VBQ0E3UyxNQUFBQSxNQUFNLENBQUNpSixDQUFQLENBQVMvSyxDQUFULEdBQWEsS0FBSytXLGlCQUFMLENBQXVCLEtBQUtELE1BQUwsQ0FBWW5DLFFBQVosRUFBdkIsQ0FBYjtFQUNEO0VBQ0Y7OztJQWxDbUNpQjs7TUNKakJzQjs7O0VBQ25CLGdCQUFZdlosQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixDQUFsQixFQUFxQjtFQUFBOztFQUNuQjtFQUNBLFVBQUtpYSxPQUFMLEdBQWVoSixNQUFJLENBQUN5RyxZQUFMLENBQWtCalgsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCVixDQUF4QixDQUFmO0VBQ0EsVUFBS2tLLElBQUwsR0FBWSxNQUFaO0VBSG1CO0VBSXBCOzs7O1dBRUR3TCxhQUFBLG9CQUFXOVEsTUFBWCxFQUFtQjtFQUNqQkEsSUFBQUEsTUFBTSxDQUFDbUosSUFBUCxHQUFjLEtBQUtrTSxPQUFMLENBQWF4QyxRQUFiLEVBQWQ7RUFDRDs7O0lBVCtCaUI7O01DQWJ3Qjs7O0VBQ25CLGtCQUFZelosQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixDQUFsQixFQUFxQjtFQUFBOztFQUNuQjtFQUNBLFVBQUtnVixNQUFMLEdBQWMvRCxNQUFJLENBQUN5RyxZQUFMLENBQWtCalgsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCVixDQUF4QixDQUFkO0VBRUEsVUFBS2tLLElBQUwsR0FBWSxRQUFaO0VBSm1CO0VBS3BCOzs7O1dBRUQwRyxRQUFBLGVBQU1uUSxDQUFOLEVBQVNDLENBQVQsRUFBWVYsQ0FBWixFQUFlO0VBQ2IsU0FBS2dWLE1BQUwsR0FBYy9ELE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0JqWCxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JWLENBQXhCLENBQWQ7RUFDRDs7V0FFRDBWLGFBQUEsb0JBQVdqSSxRQUFYLEVBQXFCO0VBQ25CQSxJQUFBQSxRQUFRLENBQUN1SCxNQUFULEdBQWtCLEtBQUtBLE1BQUwsQ0FBWXlDLFFBQVosRUFBbEI7RUFDQWhLLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRGLFNBQWQsR0FBMEIxTSxRQUFRLENBQUN1SCxNQUFuQztFQUNEOzs7SUFmaUMwRDs7TUNDZjBCOzs7RUFDbkIsZ0JBQVlyVyxLQUFaLEVBQW1CcVAsQ0FBbkIsRUFBc0IwQyxDQUF0QixFQUF5QjtFQUFBOztFQUN2QjtFQUVBLFVBQUsvUixLQUFMLEdBQWEsTUFBSzJULFlBQUwsQ0FBa0IzVCxLQUFsQixDQUFiO0VBQ0EsVUFBS3FQLENBQUwsR0FBU3pLLElBQUksQ0FBQ3pELFNBQUwsQ0FBZWtPLENBQWYsRUFBa0IsRUFBbEIsQ0FBVDtFQUNBLFVBQUswQyxDQUFMLEdBQVNuTixJQUFJLENBQUN6RCxTQUFMLENBQWU0USxDQUFmLEVBQWtCLE1BQUsxQyxDQUF2QixDQUFUO0VBQ0EsVUFBS2xKLElBQUwsR0FBWSxNQUFaO0VBTnVCO0VBT3hCOzs7O1dBRUR3TCxhQUFBLG9CQUFXakksUUFBWCxFQUFxQjtFQUNuQixRQUFNNE0sV0FBVyxHQUFHLEtBQUt0VyxLQUFMLENBQVcwVCxRQUFYLEVBQXBCOztFQUVBLFFBQUksT0FBTzRDLFdBQVAsS0FBdUIsUUFBM0IsRUFBcUM7RUFDbkM1TSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULEdBQWdCO0VBQ2R0SCxRQUFBQSxLQUFLLEVBQUUsS0FBS3FSLENBREU7RUFFZHBSLFFBQUFBLE1BQU0sRUFBRSxLQUFLOFQsQ0FGQztFQUdkdFIsUUFBQUEsR0FBRyxFQUFFNlYsV0FIUztFQUlkMVMsUUFBQUEsT0FBTyxFQUFFLElBSks7RUFLZDJTLFFBQUFBLEtBQUssRUFBRTtFQUxPLE9BQWhCO0VBT0QsS0FSRCxNQVFPO0VBQ0w3TSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULEdBQWdCZ1IsV0FBaEI7RUFDRDtFQUNGOztXQUVEM0MsZUFBQSxzQkFBYTNULEtBQWIsRUFBb0I7RUFDbEIsV0FBT0EsS0FBSyxZQUFZNlQsU0FBakIsR0FBNkI3VCxLQUE3QixHQUFxQyxJQUFJNlQsU0FBSixDQUFjN1QsS0FBZCxDQUE1QztFQUNEOzs7SUE1QitCMlU7O01DQWI2QjtFQUduQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLHFCQUFZNUYsSUFBWixFQUFrQk8sTUFBbEIsRUFBMEI7RUFDeEIsU0FBS1AsSUFBTCxHQUFZaE0sSUFBSSxDQUFDekQsU0FBTCxDQUFleVAsSUFBZixFQUFxQjdJLFFBQXJCLENBQVo7RUFDQSxTQUFLb0osTUFBTCxHQUFjckMsSUFBSSxDQUFDRCxTQUFMLENBQWVzQyxNQUFmLENBQWQ7RUFFQSxTQUFLTixHQUFMLEdBQVcsQ0FBWDtFQUNBLFNBQUtHLE1BQUwsR0FBYyxDQUFkO0VBQ0EsU0FBS0YsSUFBTCxHQUFZLEtBQVo7RUFDQSxTQUFLWSxPQUFMLEdBQWUsRUFBZjtFQUVBLFNBQUszVCxFQUFMLGtCQUF1QnlZLFNBQVMsQ0FBQ3pZLEVBQVYsRUFBdkI7RUFDQSxTQUFLb0ksSUFBTCxHQUFZLFdBQVo7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7OztXQUNFMEcsUUFBQSxlQUFNK0QsSUFBTixFQUFZTyxNQUFaLEVBQW9CO0VBQ2xCLFNBQUtQLElBQUwsR0FBWWhNLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXlQLElBQWYsRUFBcUI3SSxRQUFyQixDQUFaO0VBQ0EsU0FBS29KLE1BQUwsR0FBY3JDLElBQUksQ0FBQ0QsU0FBTCxDQUFlc0MsTUFBZixDQUFkO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFc0YsaUJBQUEsd0JBQWVDLEtBQWYsRUFBc0I7RUFDcEIsV0FBT0EsS0FBSyxDQUFDM00sY0FBTixDQUFxQkcsTUFBTSxDQUFDa0MsT0FBNUIsQ0FBUDtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRXVLLGlCQUFBLHdCQUFldlYsS0FBZixFQUFzQjtFQUNwQixXQUFPQSxLQUFLLEdBQUc4SSxNQUFNLENBQUNrQyxPQUF0QjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRXVGLGFBQUEsb0JBQVdqSSxRQUFYLEVBQXFCO0VBRXJCO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFTCxZQUFBLG1CQUFVSyxRQUFWLEVBQW9CSCxJQUFwQixFQUEwQjBCLEtBQTFCLEVBQWlDO0VBQy9CLFNBQUs0RixHQUFMLElBQVl0SCxJQUFaOztFQUVBLFFBQUksS0FBS3NILEdBQUwsSUFBWSxLQUFLRCxJQUFqQixJQUF5QixLQUFLRSxJQUFsQyxFQUF3QztFQUN0QyxXQUFLRSxNQUFMLEdBQWMsQ0FBZDtFQUNBLFdBQUtGLElBQUwsR0FBWSxJQUFaO0VBQ0EsV0FBSy9OLE9BQUw7RUFDRCxLQUpELE1BSU87RUFDTCxVQUFNL0QsS0FBSyxHQUFHLEtBQUttUyxNQUFMLENBQVl6SCxRQUFRLENBQUNtSCxHQUFULEdBQWVuSCxRQUFRLENBQUNrSCxJQUFwQyxDQUFkO0VBQ0EsV0FBS0ksTUFBTCxHQUFjOVUsSUFBSSxDQUFDb1YsR0FBTCxDQUFTLElBQUl0UyxLQUFiLEVBQW9CLENBQXBCLENBQWQ7RUFDRDtFQUNGO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFK0QsVUFBQSxtQkFBVTtFQUNSLFFBQUlwSCxDQUFDLEdBQUcsS0FBSytWLE9BQUwsQ0FBYWpXLE1BQXJCOztFQUNBLFdBQU9FLENBQUMsRUFBUixFQUFZO0VBQ1YsV0FBSytWLE9BQUwsQ0FBYS9WLENBQWIsRUFBZ0JrVyxlQUFoQixDQUFnQyxJQUFoQztFQUNEOztFQUVELFNBQUtILE9BQUwsQ0FBYWpXLE1BQWIsR0FBc0IsQ0FBdEI7RUFDRDs7Ozs7RUE3SGtCK2EsVUFDWnpZLEtBQUs7O01DRk82WTs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsaUJBQVlDLEVBQVosRUFBZ0JDLEVBQWhCLEVBQW9CbEcsSUFBcEIsRUFBMEJPLE1BQTFCLEVBQWtDO0VBQUE7O0VBQ2hDLGtDQUFNUCxJQUFOLEVBQVlPLE1BQVo7RUFFQSxVQUFLdUYsS0FBTCxHQUFhLE1BQUtELGNBQUwsQ0FBb0IsSUFBSTFILFFBQUosQ0FBYThILEVBQWIsRUFBaUJDLEVBQWpCLENBQXBCLENBQWI7RUFDQSxVQUFLM1EsSUFBTCxHQUFZLE9BQVo7RUFKZ0M7RUFLakM7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1nSyxFQUFOLEVBQVVDLEVBQVYsRUFBY2xHLElBQWQsRUFBb0JPLE1BQXBCLEVBQTRCO0VBQzFCLFNBQUt1RixLQUFMLEdBQWEsS0FBS0QsY0FBTCxDQUFvQixJQUFJMUgsUUFBSixDQUFhOEgsRUFBYixFQUFpQkMsRUFBakIsQ0FBcEIsQ0FBYjtFQUVBbEcsSUFBQUEsSUFBSSx5QkFBVS9ELEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VJLGlCQUFBLHdCQUFlN0gsUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixFQUFzQztFQUNwQyxTQUFLNUIsU0FBTCxDQUFlSyxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CO0VBQ0F2QixJQUFBQSxRQUFRLENBQUNoTixDQUFULENBQVc2SSxHQUFYLENBQWUsS0FBS21SLEtBQXBCO0VBQ0Q7OztJQXJEZ0NGOztNQ0NkTzs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLHNCQUFZQyxjQUFaLEVBQTRCTixLQUE1QixFQUFtQ3pGLE1BQW5DLEVBQTJDTCxJQUEzQyxFQUFpRE8sTUFBakQsRUFBeUQ7RUFBQTs7RUFDdkQsa0NBQU1QLElBQU4sRUFBWU8sTUFBWjtFQUVBLFVBQUs2RixjQUFMLEdBQXNCcFMsSUFBSSxDQUFDekQsU0FBTCxDQUFlNlYsY0FBZixFQUErQixJQUFJakksUUFBSixFQUEvQixDQUF0QjtFQUNBLFVBQUtrQyxNQUFMLEdBQWNyTSxJQUFJLENBQUN6RCxTQUFMLENBQWU4UCxNQUFmLEVBQXVCLElBQXZCLENBQWQ7RUFDQSxVQUFLeUYsS0FBTCxHQUFhOVIsSUFBSSxDQUFDekQsU0FBTCxDQUFlLE1BQUt3VixjQUFMLENBQW9CRCxLQUFwQixDQUFmLEVBQTJDLEdBQTNDLENBQWI7RUFFQSxVQUFLTyxRQUFMLEdBQWdCLE1BQUtoRyxNQUFMLEdBQWMsTUFBS0EsTUFBbkM7RUFDQSxVQUFLaUcsZUFBTCxHQUF1QixJQUFJbkksUUFBSixFQUF2QjtFQUNBLFVBQUtjLFFBQUwsR0FBZ0IsQ0FBaEI7RUFFQSxVQUFLMUosSUFBTCxHQUFZLFlBQVo7RUFYdUQ7RUFZeEQ7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1tSyxjQUFOLEVBQXNCTixLQUF0QixFQUE2QnpGLE1BQTdCLEVBQXFDTCxJQUFyQyxFQUEyQ08sTUFBM0MsRUFBbUQ7RUFDakQsU0FBSzZGLGNBQUwsR0FBc0JwUyxJQUFJLENBQUN6RCxTQUFMLENBQWU2VixjQUFmLEVBQStCLElBQUlqSSxRQUFKLEVBQS9CLENBQXRCO0VBQ0EsU0FBS2tDLE1BQUwsR0FBY3JNLElBQUksQ0FBQ3pELFNBQUwsQ0FBZThQLE1BQWYsRUFBdUIsSUFBdkIsQ0FBZDtFQUNBLFNBQUt5RixLQUFMLEdBQWE5UixJQUFJLENBQUN6RCxTQUFMLENBQWUsS0FBS3dWLGNBQUwsQ0FBb0JELEtBQXBCLENBQWYsRUFBMkMsR0FBM0MsQ0FBYjtFQUVBLFNBQUtPLFFBQUwsR0FBZ0IsS0FBS2hHLE1BQUwsR0FBYyxLQUFLQSxNQUFuQztFQUNBLFNBQUtpRyxlQUFMLEdBQXVCLElBQUluSSxRQUFKLEVBQXZCO0VBQ0EsU0FBS2MsUUFBTCxHQUFnQixDQUFoQjtFQUVBZSxJQUFBQSxJQUFJLHlCQUFVL0QsS0FBVixZQUFnQitELElBQWhCLEVBQXNCTyxNQUF0QixDQUFKO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRUksaUJBQUEsd0JBQWU3SCxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLFNBQUs1QixTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0I7RUFFQSxTQUFLaU0sZUFBTCxDQUFxQnJOLElBQXJCLENBQTBCLEtBQUttTixjQUEvQjtFQUNBLFNBQUtFLGVBQUwsQ0FBcUIxSCxHQUFyQixDQUF5QjlGLFFBQVEsQ0FBQ3RGLENBQWxDO0VBQ0EsU0FBS3lMLFFBQUwsR0FBZ0IsS0FBS3FILGVBQUwsQ0FBcUJySCxRQUFyQixFQUFoQjs7RUFFQSxRQUFJLEtBQUtBLFFBQUwsR0FBZ0IsT0FBaEIsSUFBMkIsS0FBS0EsUUFBTCxHQUFnQixLQUFLb0gsUUFBcEQsRUFBOEQ7RUFDNUQsV0FBS0MsZUFBTCxDQUFxQnBILFNBQXJCO0VBQ0EsV0FBS29ILGVBQUwsQ0FBcUJuTixjQUFyQixDQUFvQyxJQUFJLEtBQUs4RixRQUFMLEdBQWdCLEtBQUtvSCxRQUE3RDtFQUNBLFdBQUtDLGVBQUwsQ0FBcUJuTixjQUFyQixDQUFvQyxLQUFLMk0sS0FBekM7RUFFQWhOLE1BQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBVzZJLEdBQVgsQ0FBZSxLQUFLMlIsZUFBcEI7RUFDRDtFQUNGOzs7SUEzRnFDVjs7TUNBbkJXOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsdUJBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxLQUE1QixFQUFtQzFHLElBQW5DLEVBQXlDTyxNQUF6QyxFQUFpRDtFQUFBOztFQUMvQyxrQ0FBTVAsSUFBTixFQUFZTyxNQUFaOztFQUVBLFVBQUt0RSxLQUFMLENBQVd1SyxNQUFYLEVBQW1CQyxNQUFuQixFQUEyQkMsS0FBM0I7O0VBQ0EsVUFBSy9OLElBQUwsR0FBWSxDQUFaO0VBQ0EsVUFBS3BELElBQUwsR0FBWSxhQUFaO0VBTCtDO0VBTWhEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU11SyxNQUFOLEVBQWNDLE1BQWQsRUFBc0JDLEtBQXRCLEVBQTZCMUcsSUFBN0IsRUFBbUNPLE1BQW5DLEVBQTJDO0VBQ3pDLFNBQUtvRyxPQUFMLEdBQWUsSUFBSXhJLFFBQUosQ0FBYXFJLE1BQWIsRUFBcUJDLE1BQXJCLENBQWY7RUFDQSxTQUFLRSxPQUFMLEdBQWUsS0FBS2QsY0FBTCxDQUFvQixLQUFLYyxPQUF6QixDQUFmO0VBQ0EsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0VBRUExRyxJQUFBQSxJQUFJLHlCQUFVL0QsS0FBVixZQUFnQitELElBQWhCLEVBQXNCTyxNQUF0QixDQUFKO0VBQ0Q7O1dBRURRLGFBQUEsb0JBQVdqSSxRQUFYLEVBQXFCO0VBQ25CQSxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNqSCxJQUFkLEdBQXFCLENBQXJCO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRWdJLGlCQUFBLHdCQUFlN0gsUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixFQUFzQztFQUNwQyxTQUFLNUIsU0FBTCxDQUFlSyxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CO0VBQ0F2QixJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNqSCxJQUFkLElBQXNCQSxJQUF0Qjs7RUFFQSxRQUFJRyxRQUFRLENBQUM4RyxJQUFULENBQWNqSCxJQUFkLElBQXNCLEtBQUsrTixLQUEvQixFQUFzQztFQUNwQzVOLE1BQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBVzZTLEtBQVgsQ0FDRXZILFFBQVEsQ0FBQ00sVUFBVCxDQUFvQixDQUFDLEtBQUtpUCxPQUFMLENBQWF6WSxDQUFsQyxFQUFxQyxLQUFLeVksT0FBTCxDQUFhelksQ0FBbEQsQ0FERixFQUVFa0osUUFBUSxDQUFDTSxVQUFULENBQW9CLENBQUMsS0FBS2lQLE9BQUwsQ0FBYXhZLENBQWxDLEVBQXFDLEtBQUt3WSxPQUFMLENBQWF4WSxDQUFsRCxDQUZGO0VBS0EySyxNQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNqSCxJQUFkLEdBQXFCLENBQXJCO0VBQ0Q7RUFDRjs7O0lBeEVzQ2lOOztNQ0ZwQmdCOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsbUJBQVk1SyxDQUFaLEVBQWVnRSxJQUFmLEVBQXFCTyxNQUFyQixFQUE2QjtFQUFBOztFQUMzQiw4QkFBTSxDQUFOLEVBQVN2RSxDQUFULEVBQVlnRSxJQUFaLEVBQWtCTyxNQUFsQjtFQUNBLFVBQUtoTCxJQUFMLEdBQVksU0FBWjtFQUYyQjtFQUc1QjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1ELENBQU4sRUFBU2dFLElBQVQsRUFBZU8sTUFBZixFQUF1QjtFQUNyQixxQkFBTXRFLEtBQU4sWUFBWSxDQUFaLEVBQWVELENBQWYsRUFBa0JnRSxJQUFsQixFQUF3Qk8sTUFBeEI7RUFDRDs7O0lBL0JrQ3lGOztNQ0VoQmE7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUNFO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UscUJBQVlqUyxPQUFaLEVBQXFCd0UsSUFBckIsRUFBMkJ6SixRQUEzQixFQUFxQ3FRLElBQXJDLEVBQTJDTyxNQUEzQyxFQUFtRDtFQUFBOztFQUNqRCxrQ0FBTVAsSUFBTixFQUFZTyxNQUFaOztFQUVBLFVBQUt0RSxLQUFMLENBQVdySCxPQUFYLEVBQW9Cd0UsSUFBcEIsRUFBMEJ6SixRQUExQjs7RUFDQSxVQUFLNEYsSUFBTCxHQUFZLFdBQVo7RUFKaUQ7RUFLbEQ7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1ySCxPQUFOLEVBQWV3RSxJQUFmLEVBQXFCekosUUFBckIsRUFBK0JxUSxJQUEvQixFQUFxQ08sTUFBckMsRUFBNkM7RUFDM0MsU0FBSzNMLE9BQUwsR0FBZVosSUFBSSxDQUFDekQsU0FBTCxDQUFlcUUsT0FBZixFQUF3QixJQUF4QixDQUFmO0VBQ0EsU0FBS3dFLElBQUwsR0FBWXBGLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTZJLElBQWYsRUFBcUIsSUFBckIsQ0FBWjtFQUNBLFNBQUt6SixRQUFMLEdBQWdCcUUsSUFBSSxDQUFDekQsU0FBTCxDQUFlWixRQUFmLEVBQXlCLElBQXpCLENBQWhCO0VBRUEsU0FBS21YLGFBQUwsR0FBcUIsRUFBckI7RUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBSTVJLFFBQUosRUFBYjtFQUVBNkIsSUFBQUEsSUFBSSx5QkFBVS9ELEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VJLGlCQUFBLHdCQUFlN0gsUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixFQUFzQztFQUNwQyxRQUFNMk0sT0FBTyxHQUFHLEtBQUtwUyxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhOEQsU0FBYixDQUF1QlYsS0FBdkIsQ0FBNkJxQyxLQUE3QixDQUFmLEdBQXFELEtBQUs1RSxJQUFMLENBQVV1QyxLQUFWLENBQWdCcUMsS0FBaEIsQ0FBckU7RUFDQSxRQUFNeFAsTUFBTSxHQUFHbWMsT0FBTyxDQUFDbmMsTUFBdkI7RUFFQSxRQUFJb2MsYUFBSjtFQUNBLFFBQUloSSxRQUFKO0VBQ0EsUUFBSWlJLE9BQUo7RUFDQSxRQUFJQyxTQUFKO0VBQ0EsUUFBSUMsWUFBSixFQUFrQkMsWUFBbEI7RUFDQSxRQUFJdGMsQ0FBSjs7RUFFQSxTQUFLQSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdGLE1BQWhCLEVBQXdCRSxDQUFDLEVBQXpCLEVBQTZCO0VBQzNCa2MsTUFBQUEsYUFBYSxHQUFHRCxPQUFPLENBQUNqYyxDQUFELENBQXZCOztFQUVBLFVBQUlrYyxhQUFhLEtBQUtuTyxRQUF0QixFQUFnQztFQUM5QixhQUFLaU8sS0FBTCxDQUFXOU4sSUFBWCxDQUFnQmdPLGFBQWEsQ0FBQ3pULENBQTlCO0VBQ0EsYUFBS3VULEtBQUwsQ0FBV25JLEdBQVgsQ0FBZTlGLFFBQVEsQ0FBQ3RGLENBQXhCO0VBRUF5TCxRQUFBQSxRQUFRLEdBQUcsS0FBSzhILEtBQUwsQ0FBVzlILFFBQVgsRUFBWDtFQUNBLFlBQU1xSSxRQUFRLEdBQUd4TyxRQUFRLENBQUN1SCxNQUFULEdBQWtCNEcsYUFBYSxDQUFDNUcsTUFBakQ7O0VBRUEsWUFBSXBCLFFBQVEsSUFBSXFJLFFBQVEsR0FBR0EsUUFBM0IsRUFBcUM7RUFDbkNKLFVBQUFBLE9BQU8sR0FBR0ksUUFBUSxHQUFHaGMsSUFBSSxDQUFDcVMsSUFBTCxDQUFVc0IsUUFBVixDQUFyQjtFQUNBaUksVUFBQUEsT0FBTyxJQUFJLEdBQVg7RUFFQUMsVUFBQUEsU0FBUyxHQUFHck8sUUFBUSxDQUFDTSxJQUFULEdBQWdCNk4sYUFBYSxDQUFDN04sSUFBMUM7RUFDQWdPLFVBQUFBLFlBQVksR0FBRyxLQUFLaE8sSUFBTCxHQUFZNk4sYUFBYSxDQUFDN04sSUFBZCxHQUFxQitOLFNBQWpDLEdBQTZDLEdBQTVEO0VBQ0FFLFVBQUFBLFlBQVksR0FBRyxLQUFLak8sSUFBTCxHQUFZTixRQUFRLENBQUNNLElBQVQsR0FBZ0IrTixTQUE1QixHQUF3QyxHQUF2RDtFQUVBck8sVUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXbUIsR0FBWCxDQUNFLEtBQUtvUyxLQUFMLENBQ0c5UyxLQURILEdBRUdpTCxTQUZILEdBR0cvRixjQUhILENBR2tCK04sT0FBTyxHQUFHLENBQUNFLFlBSDdCLENBREY7RUFNQUgsVUFBQUEsYUFBYSxDQUFDelQsQ0FBZCxDQUFnQm1CLEdBQWhCLENBQW9CLEtBQUtvUyxLQUFMLENBQVc3SCxTQUFYLEdBQXVCL0YsY0FBdkIsQ0FBc0MrTixPQUFPLEdBQUdHLFlBQWhELENBQXBCO0VBRUEsZUFBSzFYLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxDQUFjbUosUUFBZCxFQUF3Qm1PLGFBQXhCLENBQWpCO0VBQ0Q7RUFDRjtFQUNGO0VBQ0Y7OztJQTlHb0NyQjs7TUNEbEIyQjs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLHFCQUFZM0MsSUFBWixFQUFrQlIsU0FBbEIsRUFBNkJwRSxJQUE3QixFQUFtQ08sTUFBbkMsRUFBMkM7RUFBQTs7RUFDekMsa0NBQU1QLElBQU4sRUFBWU8sTUFBWjs7RUFFQSxVQUFLdEUsS0FBTCxDQUFXMkksSUFBWCxFQUFpQlIsU0FBakI7O0VBQ0EsVUFBSzdPLElBQUwsR0FBWSxXQUFaO0VBSnlDO0VBSzFDO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7OztXQUNFMEcsUUFBQSxlQUFNMkksSUFBTixFQUFZUixTQUFaLEVBQXVCcEUsSUFBdkIsRUFBNkJPLE1BQTdCLEVBQXFDO0VBQ25DLFNBQUtxRSxJQUFMLEdBQVlBLElBQVo7RUFDQSxTQUFLQSxJQUFMLENBQVVSLFNBQVYsR0FBc0JwUSxJQUFJLENBQUN6RCxTQUFMLENBQWU2VCxTQUFmLEVBQTBCLE1BQTFCLENBQXRCO0VBRUFwRSxJQUFBQSxJQUFJLHlCQUFVL0QsS0FBVixZQUFnQitELElBQWhCLEVBQXNCTyxNQUF0QixDQUFKO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRUksaUJBQUEsd0JBQWU3SCxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLFNBQUs1QixTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0I7RUFDQSxTQUFLdUssSUFBTCxDQUFVTCxRQUFWLENBQW1CekwsUUFBbkI7RUFDRDs7O0lBeERvQzhNOztNQ0NsQjRCOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsaUJBQVkxYixDQUFaLEVBQWVDLENBQWYsRUFBa0JpVSxJQUFsQixFQUF3Qk8sTUFBeEIsRUFBZ0M7RUFBQTs7RUFDOUIsa0NBQU1QLElBQU4sRUFBWU8sTUFBWjs7RUFFQSxVQUFLdEUsS0FBTCxDQUFXblEsQ0FBWCxFQUFjQyxDQUFkOztFQUNBLFVBQUt3SixJQUFMLEdBQVksT0FBWjtFQUo4QjtFQUsvQjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1uUSxDQUFOLEVBQVNDLENBQVQsRUFBWWlVLElBQVosRUFBa0JPLE1BQWxCLEVBQTBCO0VBQ3hCLFNBQUtrSCxJQUFMLEdBQVkxYixDQUFDLEtBQUssSUFBTixJQUFjQSxDQUFDLEtBQUsyRSxTQUFwQixHQUFnQyxJQUFoQyxHQUF1QyxLQUFuRDtFQUNBLFNBQUs1RSxDQUFMLEdBQVN3USxNQUFJLENBQUN5RyxZQUFMLENBQWtCL08sSUFBSSxDQUFDekQsU0FBTCxDQUFlekUsQ0FBZixFQUFrQixDQUFsQixDQUFsQixDQUFUO0VBQ0EsU0FBS0MsQ0FBTCxHQUFTdVEsTUFBSSxDQUFDeUcsWUFBTCxDQUFrQmhYLENBQWxCLENBQVQ7RUFFQWlVLElBQUFBLElBQUkseUJBQVUvRCxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUo7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VRLGFBQUEsb0JBQVdqSSxRQUFYLEVBQXFCO0VBQ25CQSxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWM4SCxNQUFkLEdBQXVCLEtBQUs1YixDQUFMLENBQU9nWCxRQUFQLEVBQXZCO0VBRUEsUUFBSSxLQUFLMkUsSUFBVCxFQUFlM08sUUFBUSxDQUFDOEcsSUFBVCxDQUFjK0gsTUFBZCxHQUF1QjdPLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzhILE1BQXJDLENBQWYsS0FDSzVPLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYytILE1BQWQsR0FBdUIsS0FBSzViLENBQUwsQ0FBTytXLFFBQVAsRUFBdkI7RUFDTjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VuQyxpQkFBQSx3QkFBZTdILFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsRUFBc0M7RUFDcEMsU0FBSzVCLFNBQUwsQ0FBZUssUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQjtFQUVBdkIsSUFBQUEsUUFBUSxDQUFDMkcsS0FBVCxHQUFpQjNHLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYytILE1BQWQsR0FBdUIsQ0FBQzdPLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzhILE1BQWQsR0FBdUI1TyxRQUFRLENBQUM4RyxJQUFULENBQWMrSCxNQUF0QyxJQUFnRCxLQUFLdkgsTUFBN0Y7RUFFQSxRQUFJdEgsUUFBUSxDQUFDMkcsS0FBVCxHQUFpQixLQUFyQixFQUE0QjNHLFFBQVEsQ0FBQzJHLEtBQVQsR0FBaUIsQ0FBakI7RUFDN0I7OztJQTVFZ0NtRzs7TUNBZGdDOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsaUJBQVk5YixDQUFaLEVBQWVDLENBQWYsRUFBa0JpVSxJQUFsQixFQUF3Qk8sTUFBeEIsRUFBZ0M7RUFBQTs7RUFDOUIsa0NBQU1QLElBQU4sRUFBWU8sTUFBWjs7RUFFQSxVQUFLdEUsS0FBTCxDQUFXblEsQ0FBWCxFQUFjQyxDQUFkOztFQUNBLFVBQUt3SixJQUFMLEdBQVksT0FBWjtFQUo4QjtFQUsvQjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsZUFBTW5RLENBQU4sRUFBU0MsQ0FBVCxFQUFZaVUsSUFBWixFQUFrQk8sTUFBbEIsRUFBMEI7RUFDeEIsU0FBS2tILElBQUwsR0FBWTFiLENBQUMsS0FBSyxJQUFOLElBQWNBLENBQUMsS0FBSzJFLFNBQXBCLEdBQWdDLElBQWhDLEdBQXVDLEtBQW5EO0VBQ0EsU0FBSzVFLENBQUwsR0FBU3dRLE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0IvTyxJQUFJLENBQUN6RCxTQUFMLENBQWV6RSxDQUFmLEVBQWtCLENBQWxCLENBQWxCLENBQVQ7RUFDQSxTQUFLQyxDQUFMLEdBQVN1USxNQUFJLENBQUN5RyxZQUFMLENBQWtCaFgsQ0FBbEIsQ0FBVDtFQUVBaVUsSUFBQUEsSUFBSSx5QkFBVS9ELEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRVEsYUFBQSxvQkFBV2pJLFFBQVgsRUFBcUI7RUFDbkJBLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY2lJLE1BQWQsR0FBdUIsS0FBSy9iLENBQUwsQ0FBT2dYLFFBQVAsRUFBdkI7RUFDQWhLLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRGLFNBQWQsR0FBMEIxTSxRQUFRLENBQUN1SCxNQUFuQztFQUNBdkgsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFja0ksTUFBZCxHQUF1QixLQUFLTCxJQUFMLEdBQVkzTyxRQUFRLENBQUM4RyxJQUFULENBQWNpSSxNQUExQixHQUFtQyxLQUFLOWIsQ0FBTCxDQUFPK1csUUFBUCxFQUExRDtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VuQyxpQkFBQSx3QkFBZTdILFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsRUFBc0M7RUFDcEMsU0FBSzVCLFNBQUwsQ0FBZUssUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQjtFQUNBdkIsSUFBQUEsUUFBUSxDQUFDMUssS0FBVCxHQUFpQjBLLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY2tJLE1BQWQsR0FBdUIsQ0FBQ2hQLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY2lJLE1BQWQsR0FBdUIvTyxRQUFRLENBQUM4RyxJQUFULENBQWNrSSxNQUF0QyxJQUFnRCxLQUFLMUgsTUFBN0Y7RUFFQSxRQUFJdEgsUUFBUSxDQUFDMUssS0FBVCxHQUFpQixNQUFyQixFQUE2QjBLLFFBQVEsQ0FBQzFLLEtBQVQsR0FBaUIsQ0FBakI7RUFDN0IwSyxJQUFBQSxRQUFRLENBQUN1SCxNQUFULEdBQWtCdkgsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNEYsU0FBZCxHQUEwQjFNLFFBQVEsQ0FBQzFLLEtBQXJEO0VBQ0Q7OztJQTNFZ0N3WDs7TUNBZG1DOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxrQkFBWUMsU0FBWixFQUF1QmpjLENBQXZCLEVBQTBCMkIsS0FBMUIsRUFBaUNzUyxJQUFqQyxFQUF1Q08sTUFBdkMsRUFBK0M7RUFBQTs7RUFDN0Msa0NBQU1QLElBQU4sRUFBWU8sTUFBWjs7RUFFQSxVQUFLdEUsS0FBTCxDQUFXK0wsU0FBWCxFQUFzQmpjLENBQXRCLEVBQXlCMkIsS0FBekI7O0VBQ0EsVUFBSzZILElBQUwsR0FBWSxRQUFaO0VBSjZDO0VBSzlDO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7OztXQUNFMEcsUUFBQSxlQUFNblEsQ0FBTixFQUFTQyxDQUFULEVBQVkyQixLQUFaLEVBQW1Cc1MsSUFBbkIsRUFBeUJPLE1BQXpCLEVBQWlDO0VBQy9CLFNBQUtrSCxJQUFMLEdBQVkxYixDQUFDLEtBQUssSUFBTixJQUFjQSxDQUFDLEtBQUsyRSxTQUFwQixHQUFnQyxJQUFoQyxHQUF1QyxLQUFuRDtFQUVBLFNBQUs1RSxDQUFMLEdBQVN3USxNQUFJLENBQUN5RyxZQUFMLENBQWtCL08sSUFBSSxDQUFDekQsU0FBTCxDQUFlekUsQ0FBZixFQUFrQixVQUFsQixDQUFsQixDQUFUO0VBQ0EsU0FBS0MsQ0FBTCxHQUFTdVEsTUFBSSxDQUFDeUcsWUFBTCxDQUFrQi9PLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXhFLENBQWYsRUFBa0IsQ0FBbEIsQ0FBbEIsQ0FBVDtFQUNBLFNBQUsyQixLQUFMLEdBQWFzRyxJQUFJLENBQUN6RCxTQUFMLENBQWU3QyxLQUFmLEVBQXNCLElBQXRCLENBQWI7RUFFQXNTLElBQUFBLElBQUkseUJBQVUvRCxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUo7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VRLGFBQUEsb0JBQVdqSSxRQUFYLEVBQXFCO0VBQ25CQSxJQUFBQSxRQUFRLENBQUN3SCxRQUFULEdBQW9CLEtBQUt4VSxDQUFMLENBQU9nWCxRQUFQLEVBQXBCO0VBQ0FoSyxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNxSSxTQUFkLEdBQTBCLEtBQUtuYyxDQUFMLENBQU9nWCxRQUFQLEVBQTFCO0VBRUEsUUFBSSxDQUFDLEtBQUsyRSxJQUFWLEVBQWdCM08sUUFBUSxDQUFDOEcsSUFBVCxDQUFjc0ksU0FBZCxHQUEwQixLQUFLbmMsQ0FBTCxDQUFPK1csUUFBUCxFQUExQjtFQUNqQjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFbkMsaUJBQUEsd0JBQWU3SCxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLFNBQUs1QixTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0I7O0VBRUEsUUFBSSxDQUFDLEtBQUtvTixJQUFWLEVBQWdCO0VBQ2QsVUFBSSxLQUFLL1osS0FBTCxLQUFlLElBQWYsSUFBdUIsS0FBS0EsS0FBTCxLQUFlLElBQXRDLElBQThDLEtBQUtBLEtBQUwsS0FBZSxHQUFqRSxFQUFzRTtFQUNwRW9MLFFBQUFBLFFBQVEsQ0FBQ3dILFFBQVQsSUFDRXhILFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3NJLFNBQWQsR0FBMEIsQ0FBQ3BQLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3FJLFNBQWQsR0FBMEJuUCxRQUFRLENBQUM4RyxJQUFULENBQWNzSSxTQUF6QyxJQUFzRCxLQUFLOUgsTUFEdkY7RUFFRCxPQUhELE1BR087RUFDTHRILFFBQUFBLFFBQVEsQ0FBQ3dILFFBQVQsSUFBcUJ4SCxRQUFRLENBQUM4RyxJQUFULENBQWNzSSxTQUFuQztFQUNEO0VBQ0YsS0FQRCxNQU9PLElBQUksS0FBS3BjLENBQUwsQ0FBT0EsQ0FBUCxLQUFhLEdBQWIsSUFBb0IsS0FBS0EsQ0FBTCxDQUFPQSxDQUFQLEtBQWEsVUFBakMsSUFBK0MsS0FBS0EsQ0FBTCxDQUFPQSxDQUFQLEtBQWEsR0FBaEUsRUFBcUU7RUFDMUU7RUFDQWdOLE1BQUFBLFFBQVEsQ0FBQ3dILFFBQVQsR0FBb0J4SCxRQUFRLENBQUNpSCxZQUFULEVBQXBCO0VBQ0Q7RUFDRjs7O0lBMUZpQzZGOztNQ0FmdUM7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLGlCQUFZcmMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCaVUsSUFBbEIsRUFBd0JPLE1BQXhCLEVBQWdDO0VBQUE7O0VBQzlCLGtDQUFNUCxJQUFOLEVBQVlPLE1BQVo7O0VBRUEsVUFBS3RFLEtBQUwsQ0FBV25RLENBQVgsRUFBY0MsQ0FBZDs7RUFDQSxVQUFLd0osSUFBTCxHQUFZLE9BQVo7RUFKOEI7RUFLL0I7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1uUSxDQUFOLEVBQVNDLENBQVQsRUFBWWlVLElBQVosRUFBa0JPLE1BQWxCLEVBQTBCO0VBQ3hCLFNBQUt6VSxDQUFMLEdBQVNtWCxTQUFTLENBQUNFLGVBQVYsQ0FBMEJyWCxDQUExQixDQUFUO0VBQ0EsU0FBS0MsQ0FBTCxHQUFTa1gsU0FBUyxDQUFDRSxlQUFWLENBQTBCcFgsQ0FBMUIsQ0FBVDtFQUNBaVUsSUFBQUEsSUFBSSx5QkFBVS9ELEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRVEsYUFBQSxvQkFBV2pJLFFBQVgsRUFBcUI7RUFDbkJBLElBQUFBLFFBQVEsQ0FBQy9DLEtBQVQsR0FBaUIsS0FBS2pLLENBQUwsQ0FBT2dYLFFBQVAsRUFBakI7RUFDQWhLLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3dJLE1BQWQsR0FBdUJDLFNBQVMsQ0FBQ25ILFFBQVYsQ0FBbUJwSSxRQUFRLENBQUMvQyxLQUE1QixDQUF2QjtFQUVBLFFBQUksS0FBS2hLLENBQVQsRUFBWStNLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBJLE1BQWQsR0FBdUJELFNBQVMsQ0FBQ25ILFFBQVYsQ0FBbUIsS0FBS25WLENBQUwsQ0FBTytXLFFBQVAsRUFBbkIsQ0FBdkI7RUFDYjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFbkMsaUJBQUEsd0JBQWU3SCxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLFFBQUksS0FBS3RPLENBQVQsRUFBWTtFQUNWLFdBQUswTSxTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0I7RUFFQXZCLE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlELENBQWIsR0FBaUJqRCxRQUFRLENBQUM4RyxJQUFULENBQWMwSSxNQUFkLENBQXFCdk0sQ0FBckIsR0FBeUIsQ0FBQ2pELFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3dJLE1BQWQsQ0FBcUJyTSxDQUFyQixHQUF5QmpELFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBJLE1BQWQsQ0FBcUJ2TSxDQUEvQyxJQUFvRCxLQUFLcUUsTUFBbkc7RUFDQXRILE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTdELENBQWIsR0FBaUJsRCxRQUFRLENBQUM4RyxJQUFULENBQWMwSSxNQUFkLENBQXFCdE0sQ0FBckIsR0FBeUIsQ0FBQ2xELFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3dJLE1BQWQsQ0FBcUJwTSxDQUFyQixHQUF5QmxELFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBJLE1BQWQsQ0FBcUJ0TSxDQUEvQyxJQUFvRCxLQUFLb0UsTUFBbkc7RUFDQXRILE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlULENBQWIsR0FBaUIrTSxRQUFRLENBQUM4RyxJQUFULENBQWMwSSxNQUFkLENBQXFCdmMsQ0FBckIsR0FBeUIsQ0FBQytNLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3dJLE1BQWQsQ0FBcUJyYyxDQUFyQixHQUF5QitNLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBJLE1BQWQsQ0FBcUJ2YyxDQUEvQyxJQUFvRCxLQUFLcVUsTUFBbkc7RUFFQXRILE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlELENBQWIsR0FBaUJqRCxRQUFRLENBQUMrRyxHQUFULENBQWE5RCxDQUFiLElBQWtCLENBQW5DO0VBQ0FqRCxNQUFBQSxRQUFRLENBQUMrRyxHQUFULENBQWE3RCxDQUFiLEdBQWlCbEQsUUFBUSxDQUFDK0csR0FBVCxDQUFhN0QsQ0FBYixJQUFrQixDQUFuQztFQUNBbEQsTUFBQUEsUUFBUSxDQUFDK0csR0FBVCxDQUFhOVQsQ0FBYixHQUFpQitNLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlULENBQWIsSUFBa0IsQ0FBbkM7RUFDRCxLQVZELE1BVU87RUFDTCtNLE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlELENBQWIsR0FBaUJqRCxRQUFRLENBQUM4RyxJQUFULENBQWN3SSxNQUFkLENBQXFCck0sQ0FBdEM7RUFDQWpELE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTdELENBQWIsR0FBaUJsRCxRQUFRLENBQUM4RyxJQUFULENBQWN3SSxNQUFkLENBQXFCcE0sQ0FBdEM7RUFDQWxELE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlULENBQWIsR0FBaUIrTSxRQUFRLENBQUM4RyxJQUFULENBQWN3SSxNQUFkLENBQXFCcmMsQ0FBdEM7RUFDRDtFQUNGOzs7SUFsRmdDNlo7O0VDQ25DLElBQU0yQyxRQUFRLEdBQUcsVUFBakI7O01BRXFCQzs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsbUJBQVlDLEtBQVosRUFBbUIzQyxLQUFuQixFQUEwQjlGLElBQTFCLEVBQWdDTyxNQUFoQyxFQUF3QztFQUFBOztFQUN0QyxrQ0FBTVAsSUFBTixFQUFZTyxNQUFaOztFQUNBLFVBQUttSSxnQkFBTCxDQUFzQkQsS0FBdEIsRUFBNkIzQyxLQUE3Qjs7RUFDQSxVQUFLdlEsSUFBTCxHQUFZLFNBQVo7RUFIc0M7RUFJdkM7Ozs7V0FFRG1ULG1CQUFBLDBCQUFpQkQsS0FBakIsRUFBd0IzQyxLQUF4QixFQUErQjtFQUM3QixTQUFLQSxLQUFMLEdBQWF5QyxRQUFiO0VBQ0EsU0FBS0UsS0FBTCxHQUFhclIsUUFBUSxDQUFDSCxFQUFULEdBQWMsQ0FBM0I7O0VBRUEsUUFBSXdSLEtBQUssS0FBSyxPQUFkLEVBQXVCO0VBQ3JCLFdBQUtBLEtBQUwsR0FBYXJSLFFBQVEsQ0FBQ0gsRUFBVCxHQUFjLENBQTNCO0VBQ0QsS0FGRCxNQUVPLElBQUl3UixLQUFLLEtBQUssTUFBZCxFQUFzQjtFQUMzQixXQUFLQSxLQUFMLEdBQWEsQ0FBQ3JSLFFBQVEsQ0FBQ0gsRUFBVixHQUFlLENBQTVCO0VBQ0QsS0FGTSxNQUVBLElBQUl3UixLQUFLLEtBQUssUUFBZCxFQUF3QjtFQUM3QixXQUFLQSxLQUFMLEdBQWEsUUFBYjtFQUNELEtBRk0sTUFFQSxJQUFJQSxLQUFLLFlBQVluTSxNQUFyQixFQUEyQjtFQUNoQyxXQUFLbU0sS0FBTCxHQUFhLE1BQWI7RUFDQSxXQUFLRSxJQUFMLEdBQVlGLEtBQVo7RUFDRCxLQUhNLE1BR0EsSUFBSUEsS0FBSixFQUFXO0VBQ2hCLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtFQUNEOztFQUVELFFBQ0VHLE1BQU0sQ0FBQzlDLEtBQUQsQ0FBTixDQUFjK0MsV0FBZCxPQUFnQyxVQUFoQyxJQUNBRCxNQUFNLENBQUM5QyxLQUFELENBQU4sQ0FBYytDLFdBQWQsT0FBZ0MsT0FEaEMsSUFFQUQsTUFBTSxDQUFDOUMsS0FBRCxDQUFOLENBQWMrQyxXQUFkLE9BQWdDLE1BSGxDLEVBSUU7RUFDQSxXQUFLL0MsS0FBTCxHQUFheUMsUUFBYjtFQUNELEtBTkQsTUFNTyxJQUFJekMsS0FBSixFQUFXO0VBQ2hCLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtFQUNEO0VBQ0Y7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFN0osUUFBQSxlQUFNd00sS0FBTixFQUFhM0MsS0FBYixFQUFvQjlGLElBQXBCLEVBQTBCTyxNQUExQixFQUFrQztFQUNoQyxTQUFLa0ksS0FBTCxHQUFhclIsUUFBUSxDQUFDSCxFQUFULEdBQWMsQ0FBM0I7RUFDQSxTQUFLeVIsZ0JBQUwsQ0FBc0JELEtBQXRCLEVBQTZCM0MsS0FBN0I7RUFDQTlGLElBQUFBLElBQUkseUJBQVUvRCxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUo7RUFDRDs7V0FFRFEsYUFBQSxvQkFBV2pJLFFBQVgsRUFBcUI7RUFDbkIsUUFBSSxLQUFLMlAsS0FBTCxLQUFlLFFBQW5CLEVBQTZCO0VBQzNCM1AsTUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFja0osTUFBZCxHQUF1QjFSLFFBQVEsQ0FBQ00sVUFBVCxDQUFvQixDQUFDTixRQUFRLENBQUNILEVBQTlCLEVBQWtDRyxRQUFRLENBQUNILEVBQTNDLENBQXZCO0VBQ0QsS0FGRCxNQUVPLElBQUksS0FBS3dSLEtBQUwsS0FBZSxNQUFuQixFQUEyQjtFQUNoQzNQLE1BQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY2tKLE1BQWQsR0FBdUIsS0FBS0gsSUFBTCxDQUFVN0YsUUFBVixFQUF2QjtFQUNEOztFQUVEaEssSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjbUosT0FBZCxHQUF3QixJQUFJNUssUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBeEI7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFd0MsaUJBQUEsd0JBQWU3SCxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLFNBQUs1QixTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0I7RUFFQSxRQUFJeFAsTUFBSjtFQUNBLFFBQUltZSxRQUFRLEdBQUdsUSxRQUFRLENBQUNJLENBQVQsQ0FBV3FGLFdBQVgsRUFBZjs7RUFDQSxRQUFJLEtBQUtrSyxLQUFMLEtBQWUsUUFBZixJQUEyQixLQUFLQSxLQUFMLEtBQWUsTUFBOUMsRUFBc0Q7RUFDcERPLE1BQUFBLFFBQVEsSUFBSWxRLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY2tKLE1BQTFCO0VBQ0QsS0FGRCxNQUVPO0VBQ0xFLE1BQUFBLFFBQVEsSUFBSSxLQUFLUCxLQUFqQjtFQUNEOztFQUVELFFBQUksS0FBSzNDLEtBQUwsS0FBZXlDLFFBQW5CLEVBQTZCO0VBQzNCMWQsTUFBQUEsTUFBTSxHQUFHaU8sUUFBUSxDQUFDSSxDQUFULENBQVdyTyxNQUFYLEtBQXNCLEdBQS9CO0VBQ0QsS0FGRCxNQUVPO0VBQ0xBLE1BQUFBLE1BQU0sR0FBRyxLQUFLaWIsS0FBZDtFQUNEOztFQUVEaE4sSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjbUosT0FBZCxDQUFzQjdhLENBQXRCLEdBQTBCckQsTUFBTSxHQUFHUyxJQUFJLENBQUNDLEdBQUwsQ0FBU3lkLFFBQVQsQ0FBbkM7RUFDQWxRLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY21KLE9BQWQsQ0FBc0I1YSxDQUF0QixHQUEwQnRELE1BQU0sR0FBR1MsSUFBSSxDQUFDRyxHQUFMLENBQVN1ZCxRQUFULENBQW5DO0VBQ0FsUSxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNtSixPQUFkLEdBQXdCLEtBQUtsRCxjQUFMLENBQW9CL00sUUFBUSxDQUFDOEcsSUFBVCxDQUFjbUosT0FBbEMsQ0FBeEI7RUFDQWpRLElBQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBVzZJLEdBQVgsQ0FBZW1FLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY21KLE9BQTdCO0VBQ0Q7OztJQTVHa0NuRDs7TUNMaEJxRDs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UscUJBQVk3QyxjQUFaLEVBQTRCTixLQUE1QixFQUFtQ3pGLE1BQW5DLEVBQTJDTCxJQUEzQyxFQUFpRE8sTUFBakQsRUFBeUQ7RUFBQTs7RUFDdkQsbUNBQU02RixjQUFOLEVBQXNCTixLQUF0QixFQUE2QnpGLE1BQTdCLEVBQXFDTCxJQUFyQyxFQUEyQ08sTUFBM0M7RUFFQSxVQUFLdUYsS0FBTCxJQUFjLENBQUMsQ0FBZjtFQUNBLFVBQUt2USxJQUFMLEdBQVksV0FBWjtFQUp1RDtFQUt4RDtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsZUFBTW1LLGNBQU4sRUFBc0JOLEtBQXRCLEVBQTZCekYsTUFBN0IsRUFBcUNMLElBQXJDLEVBQTJDTyxNQUEzQyxFQUFtRDtFQUNqRCwwQkFBTXRFLEtBQU4sWUFBWW1LLGNBQVosRUFBNEJOLEtBQTVCLEVBQW1DekYsTUFBbkMsRUFBMkNMLElBQTNDLEVBQWlETyxNQUFqRDs7RUFDQSxTQUFLdUYsS0FBTCxJQUFjLENBQUMsQ0FBZjtFQUNEOzs7SUE3Q29DSzs7TUNFbEIrQzs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsdUJBQVlDLFdBQVosRUFBeUJyRCxLQUF6QixFQUFnQzlGLElBQWhDLEVBQXNDTyxNQUF0QyxFQUE4QztFQUFBOztFQUM1QyxrQ0FBTVAsSUFBTixFQUFZTyxNQUFaO0VBRUEsVUFBSzZJLFdBQUwsR0FBbUIsSUFBSWpMLFFBQUosRUFBbkI7RUFDQSxVQUFLZ0wsV0FBTCxHQUFtQm5WLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTRZLFdBQWYsRUFBNEIsSUFBSWhMLFFBQUosRUFBNUIsQ0FBbkI7RUFDQSxVQUFLMkgsS0FBTCxHQUFhOVIsSUFBSSxDQUFDekQsU0FBTCxDQUFlLE1BQUt3VixjQUFMLENBQW9CRCxLQUFwQixDQUFmLEVBQTJDLEdBQTNDLENBQWI7RUFFQSxVQUFLdlEsSUFBTCxHQUFZLGFBQVo7RUFQNEM7RUFRN0M7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1rTixXQUFOLEVBQW1CckQsS0FBbkIsRUFBMEI5RixJQUExQixFQUFnQ08sTUFBaEMsRUFBd0M7RUFDdEMsU0FBSzZJLFdBQUwsR0FBbUIsSUFBSWpMLFFBQUosRUFBbkI7RUFDQSxTQUFLZ0wsV0FBTCxHQUFtQm5WLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTRZLFdBQWYsRUFBNEIsSUFBSWhMLFFBQUosRUFBNUIsQ0FBbkI7RUFDQSxTQUFLMkgsS0FBTCxHQUFhOVIsSUFBSSxDQUFDekQsU0FBTCxDQUFlLEtBQUt3VixjQUFMLENBQW9CRCxLQUFwQixDQUFmLEVBQTJDLEdBQTNDLENBQWI7RUFFQTlGLElBQUFBLElBQUkseUJBQVUvRCxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUo7RUFDRDtFQUVEO0VBQ0Y7RUFDQTs7O1dBQ0VRLGFBQUEsb0JBQVdqSSxRQUFYLEVBQXFCO0VBRXJCO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFNkgsaUJBQUEsd0JBQWU3SCxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLFNBQUsrTyxXQUFMLENBQWlCaEwsR0FBakIsQ0FBcUIsS0FBSytLLFdBQUwsQ0FBaUJqYixDQUFqQixHQUFxQjRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQXJELEVBQXdELEtBQUtpYixXQUFMLENBQWlCaGIsQ0FBakIsR0FBcUIySyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUF4RjtFQUNBLFFBQU1rYixVQUFVLEdBQUcsS0FBS0QsV0FBTCxDQUFpQm5LLFFBQWpCLEVBQW5COztFQUVBLFFBQUlvSyxVQUFVLEtBQUssQ0FBbkIsRUFBc0I7RUFDcEIsVUFBTS9CLFFBQVEsR0FBRyxLQUFLOEIsV0FBTCxDQUFpQnZlLE1BQWpCLEVBQWpCO0VBQ0EsVUFBTXllLE1BQU0sR0FBSSxLQUFLeEQsS0FBTCxHQUFhbk4sSUFBZCxJQUF1QjBRLFVBQVUsR0FBRy9CLFFBQXBDLENBQWY7RUFFQXhPLE1BQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxJQUFnQm9iLE1BQU0sR0FBRyxLQUFLRixXQUFMLENBQWlCbGIsQ0FBMUM7RUFDQTRLLE1BQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxJQUFnQm1iLE1BQU0sR0FBRyxLQUFLRixXQUFMLENBQWlCamIsQ0FBMUM7RUFDRDtFQUNGOzs7SUF2RXNDeVg7O0FDQXpDLHVCQUFlO0VBQ2I3RSxFQUFBQSxVQURhLHNCQUNGbk0sT0FERSxFQUNPa0UsUUFEUCxFQUNpQjFELFdBRGpCLEVBQzhCO0VBQ3pDLFFBQU12SyxNQUFNLEdBQUd1SyxXQUFXLENBQUN2SyxNQUEzQjtFQUNBLFFBQUlFLENBQUo7O0VBRUEsU0FBS0EsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHRixNQUFoQixFQUF3QkUsQ0FBQyxFQUF6QixFQUE2QjtFQUMzQixVQUFJcUssV0FBVyxDQUFDckssQ0FBRCxDQUFYLFlBQTBCZ1osVUFBOUIsRUFBMEM7RUFDeEMzTyxRQUFBQSxXQUFXLENBQUNySyxDQUFELENBQVgsQ0FBZW9QLElBQWYsQ0FBb0J2RixPQUFwQixFQUE2QmtFLFFBQTdCO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsYUFBS3FCLElBQUwsQ0FBVXZGLE9BQVYsRUFBbUJrRSxRQUFuQixFQUE2QjFELFdBQVcsQ0FBQ3JLLENBQUQsQ0FBeEM7RUFDRDtFQUNGOztFQUVELFNBQUt3ZSxXQUFMLENBQWlCM1UsT0FBakIsRUFBMEJrRSxRQUExQjtFQUNELEdBZFk7RUFnQmI7RUFDQXFCLEVBQUFBLElBakJhLGdCQWlCUnZGLE9BakJRLEVBaUJDa0UsUUFqQkQsRUFpQldpSSxVQWpCWCxFQWlCdUI7RUFDbENqQixJQUFBQSxRQUFRLENBQUMzRCxPQUFULENBQWlCckQsUUFBakIsRUFBMkJpSSxVQUEzQjtFQUNBakIsSUFBQUEsUUFBUSxDQUFDdEQsWUFBVCxDQUFzQjFELFFBQXRCLEVBQWdDaUksVUFBaEM7RUFDRCxHQXBCWTtFQXNCYndJLEVBQUFBLFdBdEJhLHVCQXNCRDNVLE9BdEJDLEVBc0JRa0UsUUF0QlIsRUFzQmtCO0VBQzdCLFFBQUlsRSxPQUFPLENBQUMyVSxXQUFaLEVBQXlCO0VBQ3ZCelEsTUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXbUIsR0FBWCxDQUFlQyxPQUFPLENBQUNwQixDQUF2QjtFQUNBc0YsTUFBQUEsUUFBUSxDQUFDSSxDQUFULENBQVd2RSxHQUFYLENBQWVDLE9BQU8sQ0FBQ3NFLENBQXZCO0VBQ0FKLE1BQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBVzZJLEdBQVgsQ0FBZUMsT0FBTyxDQUFDOUksQ0FBdkI7RUFFQWdOLE1BQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXN0ssTUFBWCxDQUFrQitJLFFBQVEsQ0FBQ2tCLGVBQVQsQ0FBeUIxRCxPQUFPLENBQUMwTCxRQUFqQyxDQUFsQjtFQUNEO0VBQ0Y7RUE5QlksQ0FBZjs7TUNJcUJrSjs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsbUJBQVkvTSxJQUFaLEVBQXVCO0VBQUE7O0VBQUEsUUFBWEEsSUFBVztFQUFYQSxNQUFBQSxJQUFXLEdBQUosRUFBSTtFQUFBOztFQUNyQixpQ0FBTUEsSUFBTjtFQUVBLFVBQUsvRCxTQUFMLEdBQWlCLEVBQWpCO0VBQ0EsVUFBS3BELFVBQUwsR0FBa0IsRUFBbEI7RUFDQSxVQUFLRixXQUFMLEdBQW1CLEVBQW5CO0VBRUEsVUFBS3FVLFFBQUwsR0FBZ0IsQ0FBaEI7RUFDQSxVQUFLdlUsU0FBTCxHQUFpQixDQUFqQjtFQUNBLFVBQUt3VSxTQUFMLEdBQWlCLENBQUMsQ0FBbEI7RUFFQTtFQUNKO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBQ0ksVUFBSzlRLE9BQUwsR0FBZSxLQUFmO0VBRUE7RUFDSjtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUNJLFVBQUsyUSxXQUFMLEdBQW1CLElBQW5CO0VBRUE7RUFDSjtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUNJLFVBQUtJLElBQUwsR0FBWSxJQUFJbkcsSUFBSixDQUFTLENBQVQsRUFBWSxHQUFaLENBQVo7RUFFQSxVQUFLak8sSUFBTCxHQUFZLFNBQVo7RUFDQSxVQUFLcEksRUFBTCxHQUFVcUYsSUFBSSxDQUFDckYsRUFBTCxDQUFRLE1BQUtvSSxJQUFiLENBQVY7RUFwQ3FCO0VBcUN0QjtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRXFVLE9BQUEsY0FBS0YsU0FBTCxFQUFnQjFKLElBQWhCLEVBQXNCO0VBQ3BCLFNBQUs2SixNQUFMLEdBQWMsS0FBZDtFQUNBLFNBQUtKLFFBQUwsR0FBZ0IsQ0FBaEI7RUFDQSxTQUFLQyxTQUFMLEdBQWlCMVYsSUFBSSxDQUFDekQsU0FBTCxDQUFlbVosU0FBZixFQUEwQnZTLFFBQTFCLENBQWpCOztFQUVBLFFBQUk2SSxJQUFJLEtBQUssSUFBVCxJQUFpQkEsSUFBSSxLQUFLLE1BQTFCLElBQW9DQSxJQUFJLEtBQUssU0FBakQsRUFBNEQ7RUFDMUQsV0FBS0EsSUFBTCxHQUFZMEosU0FBUyxLQUFLLE1BQWQsR0FBdUIsQ0FBdkIsR0FBMkIsS0FBS0EsU0FBNUM7RUFDRCxLQUZELE1BRU8sSUFBSSxDQUFDSSxLQUFLLENBQUM5SixJQUFELENBQVYsRUFBa0I7RUFDdkIsV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0VBQ0Q7O0VBRUQsU0FBSzJKLElBQUwsQ0FBVXhQLElBQVY7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBOzs7V0FDRTRQLE9BQUEsZ0JBQU87RUFDTCxTQUFLTCxTQUFMLEdBQWlCLENBQUMsQ0FBbEI7RUFDQSxTQUFLRCxRQUFMLEdBQWdCLENBQWhCO0VBQ0EsU0FBS0ksTUFBTCxHQUFjLElBQWQ7RUFDRDs7V0FFREcsVUFBQSxpQkFBUXJSLElBQVIsRUFBYztFQUNaLFFBQUlzUixTQUFTLEdBQUcsS0FBS0osTUFBckI7RUFDQSxRQUFJSyxXQUFXLEdBQUcsS0FBS1QsUUFBdkI7RUFDQSxRQUFJVSxZQUFZLEdBQUcsS0FBS1QsU0FBeEI7RUFFQSxTQUFLRyxNQUFMLEdBQWMsS0FBZDtFQUNBLFNBQUtKLFFBQUwsR0FBZ0IsQ0FBaEI7RUFDQSxTQUFLQyxTQUFMLEdBQWlCL1EsSUFBakI7RUFDQSxTQUFLZ1IsSUFBTCxDQUFVeFAsSUFBVjtFQUVBLFFBQU1pUSxJQUFJLEdBQUcsTUFBYjs7RUFDQSxXQUFPelIsSUFBSSxHQUFHeVIsSUFBZCxFQUFvQjtFQUNsQnpSLE1BQUFBLElBQUksSUFBSXlSLElBQVI7RUFDQSxXQUFLM1YsTUFBTCxDQUFZMlYsSUFBWjtFQUNEOztFQUVELFNBQUtQLE1BQUwsR0FBY0ksU0FBZDtFQUNBLFNBQUtSLFFBQUwsR0FBZ0JTLFdBQVcsR0FBRzVlLElBQUksQ0FBQ29WLEdBQUwsQ0FBUy9ILElBQVQsRUFBZSxDQUFmLENBQTlCO0VBQ0EsU0FBSytRLFNBQUwsR0FBaUJTLFlBQWpCO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O1dBQ0VFLHFCQUFBLDhCQUFxQjtFQUNuQixRQUFJdGYsQ0FBQyxHQUFHLEtBQUsyTixTQUFMLENBQWU3TixNQUF2Qjs7RUFDQSxXQUFPRSxDQUFDLEVBQVI7RUFBWSxXQUFLMk4sU0FBTCxDQUFlM04sQ0FBZixFQUFrQm1WLElBQWxCLEdBQXlCLElBQXpCO0VBQVo7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBOzs7V0FDRW9LLG9CQUFBLDJCQUFrQnZKLFVBQWxCLEVBQThCO0VBQzVCLFFBQUlBLFVBQVUsQ0FBQyxNQUFELENBQWQsRUFBd0I7RUFDdEJBLE1BQUFBLFVBQVUsQ0FBQzVHLElBQVgsQ0FBZ0IsSUFBaEI7RUFDRCxLQUZELE1BRU87RUFDTCxXQUFLb1EsT0FBTDtFQUNEO0VBQ0Y7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VDLGdCQUFBLHlCQUF1QjtFQUFBLHNDQUFOQyxJQUFNO0VBQU5BLE1BQUFBLElBQU07RUFBQTs7RUFDckIsUUFBSTFmLENBQUMsR0FBRzBmLElBQUksQ0FBQzVmLE1BQWI7O0VBQ0EsV0FBT0UsQ0FBQyxFQUFSO0VBQVksV0FBS3FLLFdBQUwsQ0FBaUJ0QixJQUFqQixDQUFzQjJXLElBQUksQ0FBQzFmLENBQUQsQ0FBMUI7RUFBWjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0UyZixtQkFBQSwwQkFBaUJDLFdBQWpCLEVBQThCO0VBQzVCLFFBQU10USxLQUFLLEdBQUcsS0FBS2pGLFdBQUwsQ0FBaUIzRCxPQUFqQixDQUF5QmtaLFdBQXpCLENBQWQ7RUFDQSxRQUFJdFEsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQixLQUFLakYsV0FBTCxDQUFpQjBCLE1BQWpCLENBQXdCdUQsS0FBeEIsRUFBK0IsQ0FBL0I7RUFDakI7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O1dBQ0V1USx3QkFBQSxpQ0FBd0I7RUFDdEI1VyxJQUFBQSxJQUFJLENBQUNoRCxVQUFMLENBQWdCLEtBQUtvRSxXQUFyQjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFd0wsZUFBQSx3QkFBc0I7RUFBQSx1Q0FBTjZKLElBQU07RUFBTkEsTUFBQUEsSUFBTTtFQUFBOztFQUNwQixRQUFJMWYsQ0FBQyxHQUFHOGYsU0FBUyxDQUFDaGdCLE1BQWxCOztFQUNBLFdBQU9FLENBQUMsRUFBUixFQUFZO0VBQ1YsVUFBSThWLFNBQVMsR0FBRzRKLElBQUksQ0FBQzFmLENBQUQsQ0FBcEI7RUFDQSxXQUFLdUssVUFBTCxDQUFnQnhCLElBQWhCLENBQXFCK00sU0FBckI7RUFDQSxVQUFJQSxTQUFTLENBQUNDLE9BQWQsRUFBdUJELFNBQVMsQ0FBQ0MsT0FBVixDQUFrQmhOLElBQWxCLENBQXVCLElBQXZCO0VBQ3hCO0VBQ0Y7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRW1OLGtCQUFBLHlCQUFnQkosU0FBaEIsRUFBMkI7RUFDekIsUUFBSXhHLEtBQUssR0FBRyxLQUFLL0UsVUFBTCxDQUFnQjdELE9BQWhCLENBQXdCb1AsU0FBeEIsQ0FBWjtFQUNBLFNBQUt2TCxVQUFMLENBQWdCd0IsTUFBaEIsQ0FBdUJ1RCxLQUF2QixFQUE4QixDQUE5Qjs7RUFFQSxRQUFJd0csU0FBUyxDQUFDQyxPQUFkLEVBQXVCO0VBQ3JCekcsTUFBQUEsS0FBSyxHQUFHd0csU0FBUyxDQUFDQyxPQUFWLENBQWtCclAsT0FBbEIsQ0FBMEJvUCxTQUExQixDQUFSO0VBQ0FBLE1BQUFBLFNBQVMsQ0FBQ0MsT0FBVixDQUFrQmhLLE1BQWxCLENBQXlCdUQsS0FBekIsRUFBZ0MsQ0FBaEM7RUFDRDs7RUFFRCxXQUFPQSxLQUFQO0VBQ0Q7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O1dBQ0VtRyxzQkFBQSwrQkFBc0I7RUFDcEJ4TSxJQUFBQSxJQUFJLENBQUNoRCxVQUFMLENBQWdCLEtBQUtzRSxVQUFyQjtFQUNEOzs7V0FHRGIsU0FBQSxnQkFBT2tFLElBQVAsRUFBYTtFQUNYLFNBQUtzSCxHQUFMLElBQVl0SCxJQUFaO0VBQ0EsUUFBSSxLQUFLc0gsR0FBTCxJQUFZLEtBQUtELElBQWpCLElBQXlCLEtBQUtFLElBQWxDLEVBQXdDLEtBQUsvTixPQUFMO0VBRXhDLFNBQUsyWSxRQUFMLENBQWNuUyxJQUFkO0VBQ0EsU0FBS29TLFNBQUwsQ0FBZXBTLElBQWY7RUFDRDs7V0FFRG9TLFlBQUEsbUJBQVVwUyxJQUFWLEVBQWdCO0VBQ2QsUUFBSSxDQUFDLEtBQUs2QixNQUFWLEVBQWtCO0VBRWxCLFFBQU01QixPQUFPLEdBQUcsSUFBSSxLQUFLQSxPQUF6QjtFQUNBLFNBQUs0QixNQUFMLENBQVlYLFVBQVosQ0FBdUJwQixTQUF2QixDQUFpQyxJQUFqQyxFQUF1Q0UsSUFBdkMsRUFBNkNDLE9BQTdDO0VBRUEsUUFBTS9OLE1BQU0sR0FBRyxLQUFLNk4sU0FBTCxDQUFlN04sTUFBOUI7RUFDQSxRQUFJRSxDQUFKLEVBQU8rTixRQUFQOztFQUVBLFNBQUsvTixDQUFDLEdBQUdGLE1BQU0sR0FBRyxDQUFsQixFQUFxQkUsQ0FBQyxJQUFJLENBQTFCLEVBQTZCQSxDQUFDLEVBQTlCLEVBQWtDO0VBQ2hDK04sTUFBQUEsUUFBUSxHQUFHLEtBQUtKLFNBQUwsQ0FBZTNOLENBQWYsQ0FBWCxDQURnQzs7RUFJaEMrTixNQUFBQSxRQUFRLENBQUNyRSxNQUFULENBQWdCa0UsSUFBaEIsRUFBc0I1TixDQUF0QjtFQUNBLFdBQUt5UCxNQUFMLENBQVlYLFVBQVosQ0FBdUJwQixTQUF2QixDQUFpQ0ssUUFBakMsRUFBMkNILElBQTNDLEVBQWlEQyxPQUFqRDtFQUNBLFdBQUtvUyxRQUFMLENBQWMsaUJBQWQsRUFBaUNsUyxRQUFqQyxFQU5nQzs7RUFTaEMsVUFBSUEsUUFBUSxDQUFDb0gsSUFBYixFQUFtQjtFQUNqQixhQUFLOEssUUFBTCxDQUFjLGVBQWQsRUFBK0JsUyxRQUEvQjtFQUVBLGFBQUswQixNQUFMLENBQVkvRSxJQUFaLENBQWlCN0IsTUFBakIsQ0FBd0JrRixRQUF4QjtFQUNBLGFBQUtKLFNBQUwsQ0FBZTVCLE1BQWYsQ0FBc0IvTCxDQUF0QixFQUF5QixDQUF6QjtFQUNEO0VBQ0Y7RUFDRjs7V0FFRGlnQixXQUFBLGtCQUFTQyxLQUFULEVBQWdCaGIsTUFBaEIsRUFBd0I7RUFDdEIsU0FBS3VLLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVkvRCxhQUFaLENBQTBCd1UsS0FBMUIsRUFBaUNoYixNQUFqQyxDQUFmO0VBQ0EsU0FBS2liLFNBQUwsSUFBa0IsS0FBS3pVLGFBQUwsQ0FBbUJ3VSxLQUFuQixFQUEwQmhiLE1BQTFCLENBQWxCO0VBQ0Q7O1dBRUQ2YSxXQUFBLGtCQUFTblMsSUFBVCxFQUFlO0VBQ2IsUUFBSSxLQUFLK1EsU0FBTCxLQUFtQixNQUF2QixFQUErQjtFQUM3QixVQUFJM2UsQ0FBSjtFQUNBLFVBQU1GLE1BQU0sR0FBRyxLQUFLOGUsSUFBTCxDQUFVN0csUUFBVixDQUFtQixLQUFuQixDQUFmO0VBRUEsVUFBSWpZLE1BQU0sR0FBRyxDQUFiLEVBQWdCLEtBQUtxSyxTQUFMLEdBQWlCckssTUFBakI7O0VBQ2hCLFdBQUtFLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0YsTUFBaEIsRUFBd0JFLENBQUMsRUFBekI7RUFBNkIsYUFBS29nQixjQUFMO0VBQTdCOztFQUNBLFdBQUt6QixTQUFMLEdBQWlCLE1BQWpCO0VBQ0QsS0FQRCxNQU9PO0VBQ0wsV0FBS0QsUUFBTCxJQUFpQjlRLElBQWpCOztFQUVBLFVBQUksS0FBSzhRLFFBQUwsR0FBZ0IsS0FBS0MsU0FBekIsRUFBb0M7RUFDbEMsWUFBTTdlLE9BQU0sR0FBRyxLQUFLOGUsSUFBTCxDQUFVN0csUUFBVixDQUFtQm5LLElBQW5CLENBQWY7O0VBQ0EsWUFBSTVOLEVBQUo7O0VBRUEsWUFBSUYsT0FBTSxHQUFHLENBQWIsRUFBZ0IsS0FBS3FLLFNBQUwsR0FBaUJySyxPQUFqQjs7RUFDaEIsYUFBS0UsRUFBQyxHQUFHLENBQVQsRUFBWUEsRUFBQyxHQUFHRixPQUFoQixFQUF3QkUsRUFBQyxFQUF6QjtFQUE2QixlQUFLb2dCLGNBQUw7RUFBN0I7RUFDRDtFQUNGO0VBQ0Y7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFQSxpQkFBQSx3QkFBZXBLLFVBQWYsRUFBMkJGLFNBQTNCLEVBQXNDO0VBQ3BDLFFBQU0vSCxRQUFRLEdBQUcsS0FBSzBCLE1BQUwsQ0FBWS9FLElBQVosQ0FBaUJuQyxHQUFqQixDQUFxQnFNLFFBQXJCLENBQWpCO0VBQ0EsU0FBS3lMLGFBQUwsQ0FBbUJ0UyxRQUFuQixFQUE2QmlJLFVBQTdCLEVBQXlDRixTQUF6QztFQUNBLFNBQUttSyxRQUFMLENBQWMsa0JBQWQsRUFBa0NsUyxRQUFsQztFQUVBLFdBQU9BLFFBQVA7RUFDRDs7V0FFRHNTLGdCQUFBLHVCQUFjdFMsUUFBZCxFQUF3QmlJLFVBQXhCLEVBQW9DRixTQUFwQyxFQUErQztFQUM3QyxRQUFJekwsV0FBVyxHQUFHLEtBQUtBLFdBQXZCO0VBQ0EsUUFBSUUsVUFBVSxHQUFHLEtBQUtBLFVBQXRCO0VBRUEsUUFBSXlMLFVBQUosRUFBZ0IzTCxXQUFXLEdBQUdwQixJQUFJLENBQUM5QyxPQUFMLENBQWE2UCxVQUFiLENBQWQ7RUFDaEIsUUFBSUYsU0FBSixFQUFldkwsVUFBVSxHQUFHdEIsSUFBSSxDQUFDOUMsT0FBTCxDQUFhMlAsU0FBYixDQUFiO0VBRWYvSCxJQUFBQSxRQUFRLENBQUNtRCxLQUFUO0VBQ0FvUCxJQUFBQSxjQUFjLENBQUN0SyxVQUFmLENBQTBCLElBQTFCLEVBQWdDakksUUFBaEMsRUFBMEMxRCxXQUExQztFQUNBMEQsSUFBQUEsUUFBUSxDQUFDa0ksYUFBVCxDQUF1QjFMLFVBQXZCO0VBQ0F3RCxJQUFBQSxRQUFRLENBQUMwQixNQUFULEdBQWtCLElBQWxCO0VBRUEsU0FBSzlCLFNBQUwsQ0FBZTVFLElBQWYsQ0FBb0JnRixRQUFwQjtFQUNEOztXQUVEd0IsU0FBQSxrQkFBUztFQUNQLFNBQUt5UCxJQUFMO0VBQ0EvVixJQUFBQSxJQUFJLENBQUM5QixVQUFMLENBQWdCLEtBQUt3RyxTQUFyQjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7OztXQUNFdkcsVUFBQSxtQkFBVTtFQUNSLFNBQUsrTixJQUFMLEdBQVksSUFBWjtFQUNBLFNBQUs1RixNQUFMO0VBQ0EsU0FBS3NRLHFCQUFMO0VBQ0EsU0FBS3BLLG1CQUFMO0VBQ0EsU0FBS2hHLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVlFLGFBQVosQ0FBMEIsSUFBMUIsQ0FBZjtFQUVBLFNBQUtpUCxJQUFMLEdBQVksSUFBWjtFQUNBLFNBQUszUSxHQUFMLEdBQVcsSUFBWDtFQUNBLFNBQUs2RyxHQUFMLEdBQVcsSUFBWDtFQUNBLFNBQUszRyxDQUFMLEdBQVMsSUFBVDtFQUNBLFNBQUtwTixDQUFMLEdBQVMsSUFBVDtFQUNBLFNBQUswSCxDQUFMLEdBQVMsSUFBVDtFQUNEOzs7SUFyVGtDbU07RUF3VHJDcEosZUFBZSxDQUFDekUsSUFBaEIsQ0FBcUIwWCxPQUFyQjs7TUM5VHFCOEI7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsNEJBQVk3TyxJQUFaLEVBQWtCO0VBQUE7O0VBQ2hCLGdDQUFNQSxJQUFOO0VBRUEsVUFBSzhPLGNBQUwsR0FBc0IsRUFBdEI7RUFIZ0I7RUFJakI7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRUMsbUJBQUEsNEJBQTBCO0VBQUEsc0NBQU5mLElBQU07RUFBTkEsTUFBQUEsSUFBTTtFQUFBOztFQUN4QixRQUFJMWYsQ0FBSjtFQUFBLFFBQ0VGLE1BQU0sR0FBRzRmLElBQUksQ0FBQzVmLE1BRGhCOztFQUdBLFNBQUtFLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0YsTUFBaEIsRUFBd0JFLENBQUMsRUFBekIsRUFBNkI7RUFDM0IsVUFBSThWLFNBQVMsR0FBRzRKLElBQUksQ0FBQzFmLENBQUQsQ0FBcEI7RUFDQSxXQUFLd2dCLGNBQUwsQ0FBb0J6WCxJQUFwQixDQUF5QitNLFNBQXpCO0VBQ0FBLE1BQUFBLFNBQVMsQ0FBQ0UsVUFBVixDQUFxQixJQUFyQjtFQUNEO0VBQ0Y7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRTBLLHNCQUFBLDZCQUFvQjVLLFNBQXBCLEVBQStCO0VBQzdCLFFBQU14RyxLQUFLLEdBQUcsS0FBS2tSLGNBQUwsQ0FBb0I5WixPQUFwQixDQUE0Qm9QLFNBQTVCLENBQWQ7RUFDQSxRQUFJeEcsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQixLQUFLa1IsY0FBTCxDQUFvQnpVLE1BQXBCLENBQTJCdUQsS0FBM0IsRUFBa0MsQ0FBbEM7RUFDakI7O1dBRUQ1RixTQUFBLGdCQUFPa0UsSUFBUCxFQUFhO0VBQ1gsdUJBQU1sRSxNQUFOLFlBQWFrRSxJQUFiOztFQUVBLFFBQUksQ0FBQyxLQUFLSSxLQUFWLEVBQWlCO0VBQ2YsVUFBTWxPLE1BQU0sR0FBRyxLQUFLMGdCLGNBQUwsQ0FBb0IxZ0IsTUFBbkM7RUFDQSxVQUFJRSxDQUFKOztFQUVBLFdBQUtBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0YsTUFBaEIsRUFBd0JFLENBQUMsRUFBekIsRUFBNkI7RUFDM0IsYUFBS3dnQixjQUFMLENBQW9CeGdCLENBQXBCLEVBQXVCNFYsY0FBdkIsQ0FBc0MsSUFBdEMsRUFBNENoSSxJQUE1QyxFQUFrRDVOLENBQWxEO0VBQ0Q7RUFDRjtFQUNGOzs7SUF0RDJDeWU7O01DQ3pCa0M7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSx5QkFBWUMsV0FBWixFQUF5QnpOLElBQXpCLEVBQStCekIsSUFBL0IsRUFBcUM7RUFBQTs7RUFDbkMsZ0NBQU1BLElBQU47RUFFQSxVQUFLa1AsV0FBTCxHQUFtQjNYLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW9iLFdBQWYsRUFBNEJDLE1BQTVCLENBQW5CO0VBQ0EsVUFBSzFOLElBQUwsR0FBWWxLLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTJOLElBQWYsRUFBcUIsR0FBckIsQ0FBWjtFQUVBLFVBQUsyTixjQUFMLEdBQXNCLEtBQXRCOztFQUNBLFVBQUtDLGdCQUFMOztFQVBtQztFQVFwQzs7OztXQUVEQSxtQkFBQSw0QkFBbUI7RUFBQTs7RUFDakIsU0FBS0MsZ0JBQUwsR0FBd0IsVUFBQS9iLENBQUM7RUFBQSxhQUFJLE1BQUksQ0FBQ2djLFNBQUwsQ0FBZWpiLElBQWYsQ0FBb0IsTUFBcEIsRUFBMEJmLENBQTFCLENBQUo7RUFBQSxLQUF6Qjs7RUFDQSxTQUFLaWMsZ0JBQUwsR0FBd0IsVUFBQWpjLENBQUM7RUFBQSxhQUFJLE1BQUksQ0FBQ2tjLFNBQUwsQ0FBZW5iLElBQWYsQ0FBb0IsTUFBcEIsRUFBMEJmLENBQTFCLENBQUo7RUFBQSxLQUF6Qjs7RUFDQSxTQUFLbWMsY0FBTCxHQUFzQixVQUFBbmMsQ0FBQztFQUFBLGFBQUksTUFBSSxDQUFDb2MsT0FBTCxDQUFhcmIsSUFBYixDQUFrQixNQUFsQixFQUF3QmYsQ0FBeEIsQ0FBSjtFQUFBLEtBQXZCOztFQUNBLFNBQUsyYixXQUFMLENBQWlCOVYsZ0JBQWpCLENBQWtDLFdBQWxDLEVBQStDLEtBQUtrVyxnQkFBcEQsRUFBc0UsS0FBdEU7RUFDRDtFQUVEO0VBQ0Y7RUFDQTtFQUNBOzs7V0FDRW5DLE9BQUEsZ0JBQU87RUFDTCxTQUFLaUMsY0FBTCxHQUFzQixJQUF0QjtFQUNEO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7OztXQUNFOUIsT0FBQSxnQkFBTztFQUNMLFNBQUs4QixjQUFMLEdBQXNCLEtBQXRCO0VBQ0Q7O1dBRURHLFlBQUEsbUJBQVVoYyxDQUFWLEVBQWE7RUFDWCxRQUFJQSxDQUFDLENBQUNxYyxNQUFGLElBQVlyYyxDQUFDLENBQUNxYyxNQUFGLEtBQWEsQ0FBN0IsRUFBZ0M7RUFDOUIsV0FBSzdZLENBQUwsQ0FBT3RGLENBQVAsSUFBWSxDQUFDOEIsQ0FBQyxDQUFDcWMsTUFBRixHQUFXLEtBQUs3WSxDQUFMLENBQU90RixDQUFuQixJQUF3QixLQUFLZ1EsSUFBekM7RUFDQSxXQUFLMUssQ0FBTCxDQUFPckYsQ0FBUCxJQUFZLENBQUM2QixDQUFDLENBQUNzYyxNQUFGLEdBQVcsS0FBSzlZLENBQUwsQ0FBT3JGLENBQW5CLElBQXdCLEtBQUsrUCxJQUF6QztFQUNELEtBSEQsTUFHTyxJQUFJbE8sQ0FBQyxDQUFDdWMsT0FBRixJQUFhdmMsQ0FBQyxDQUFDdWMsT0FBRixLQUFjLENBQS9CLEVBQWtDO0VBQ3ZDLFdBQUsvWSxDQUFMLENBQU90RixDQUFQLElBQVksQ0FBQzhCLENBQUMsQ0FBQ3VjLE9BQUYsR0FBWSxLQUFLL1ksQ0FBTCxDQUFPdEYsQ0FBcEIsSUFBeUIsS0FBS2dRLElBQTFDO0VBQ0EsV0FBSzFLLENBQUwsQ0FBT3JGLENBQVAsSUFBWSxDQUFDNkIsQ0FBQyxDQUFDd2MsT0FBRixHQUFZLEtBQUtoWixDQUFMLENBQU9yRixDQUFwQixJQUF5QixLQUFLK1AsSUFBMUM7RUFDRDs7RUFFRCxRQUFJLEtBQUsyTixjQUFULEVBQXlCLG1CQUFNakMsSUFBTixZQUFXLE1BQVg7RUFDMUI7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O1dBQ0V6WCxVQUFBLG1CQUFVO0VBQ1IsdUJBQU1BLE9BQU47O0VBQ0EsU0FBS3daLFdBQUwsQ0FBaUJoVixtQkFBakIsQ0FBcUMsV0FBckMsRUFBa0QsS0FBS29WLGdCQUF2RCxFQUF5RSxLQUF6RTtFQUNEOzs7SUFqRXdDdkM7O0FDSDNDLGNBQWU7RUFDYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0VpRCxFQUFBQSxPQU5hLG1CQU1MbGIsR0FOSyxFQU1BO0VBQ1gsUUFBSSxDQUFDQSxHQUFMLEVBQVUsT0FBTyxLQUFQO0VBQ1YsUUFBSUEsR0FBRyxDQUFDbWIsU0FBUixFQUFtQixPQUFPLElBQVA7RUFFbkIsUUFBTUMsT0FBTyxHQUFHLE1BQUdwYixHQUFHLENBQUNvYixPQUFQLEVBQWlCOWQsV0FBakIsRUFBaEI7RUFDQSxRQUFNK2QsUUFBUSxHQUFHLE1BQUdyYixHQUFHLENBQUNxYixRQUFQLEVBQWtCL2QsV0FBbEIsRUFBakI7O0VBQ0EsUUFBSStkLFFBQVEsS0FBSyxLQUFiLElBQXNCRCxPQUFPLEtBQUssS0FBdEMsRUFBNkM7RUFDM0NwYixNQUFBQSxHQUFHLENBQUNtYixTQUFKLEdBQWdCLElBQWhCO0VBQ0EsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQsV0FBTyxLQUFQO0VBQ0QsR0FsQlk7O0VBb0JiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDRUcsRUFBQUEsUUF6QmEsb0JBeUJKdGIsR0F6QkksRUF5QkM7RUFDWixXQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0QjtFQUNEO0VBM0JZLENBQWY7O01DRXFCdWI7RUFDbkIsd0JBQVlDLE9BQVosRUFBcUJDLE1BQXJCLEVBQTZCO0VBQzNCLFNBQUt2WCxJQUFMLEdBQVksSUFBSXZDLElBQUosRUFBWjtFQUNBLFNBQUs2WixPQUFMLEdBQWVBLE9BQWY7RUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7RUFDQSxTQUFLQyxVQUFMLEdBQWtCO0VBQUVDLE1BQUFBLFFBQVEsRUFBRTtFQUFaLEtBQWxCO0VBRUEsU0FBS3BCLGdCQUFMO0VBQ0EsU0FBS3ZXLElBQUwsR0FBWSxjQUFaO0VBQ0Q7Ozs7V0FFRDRYLFlBQUEsbUJBQVVwWCxLQUFWLEVBQTZCcVgsU0FBN0IsRUFBNEM7RUFBQSxRQUFsQ3JYLEtBQWtDO0VBQWxDQSxNQUFBQSxLQUFrQyxHQUExQixTQUEwQjtFQUFBOztFQUFBLFFBQWZxWCxTQUFlO0VBQWZBLE1BQUFBLFNBQWUsR0FBSCxDQUFHO0VBQUE7O0VBQzFDLFNBQUtKLE1BQUwsR0FBYztFQUFFalgsTUFBQUEsS0FBSyxFQUFMQSxLQUFGO0VBQVNxWCxNQUFBQSxTQUFTLEVBQVRBO0VBQVQsS0FBZDtFQUNEOztXQUVEdEIsbUJBQUEsNEJBQW1CO0VBQUE7O0VBQ2pCLFNBQUt1QixvQkFBTCxHQUE0QixZQUFNO0VBQ2hDLE1BQUEsS0FBSSxDQUFDQyxjQUFMLENBQW9CdmMsSUFBcEIsQ0FBeUIsS0FBekI7RUFDRCxLQUZEOztFQUlBLFNBQUt3Yyx5QkFBTCxHQUFpQyxZQUFNO0VBQ3JDLE1BQUEsS0FBSSxDQUFDQyxtQkFBTCxDQUF5QnpjLElBQXpCLENBQThCLEtBQTlCO0VBQ0QsS0FGRDs7RUFJQSxTQUFLMGMsb0JBQUwsR0FBNEIsVUFBQTdZLE9BQU8sRUFBSTtFQUNyQyxNQUFBLEtBQUksQ0FBQzhZLGNBQUwsQ0FBb0IzYyxJQUFwQixDQUF5QixLQUF6QixFQUErQjZELE9BQS9CO0VBQ0QsS0FGRDs7RUFJQSxTQUFLK1ksc0JBQUwsR0FBOEIsVUFBQS9ZLE9BQU8sRUFBSTtFQUN2QyxNQUFBLEtBQUksQ0FBQ2daLGdCQUFMLENBQXNCN2MsSUFBdEIsQ0FBMkIsS0FBM0IsRUFBaUM2RCxPQUFqQztFQUNELEtBRkQ7O0VBSUEsU0FBS2laLHVCQUFMLEdBQStCLFVBQUEvVSxRQUFRLEVBQUk7RUFDekMsTUFBQSxLQUFJLENBQUNnVixpQkFBTCxDQUF1Qi9jLElBQXZCLENBQTRCLEtBQTVCLEVBQWtDK0gsUUFBbEM7RUFDRCxLQUZEOztFQUlBLFNBQUtpVixzQkFBTCxHQUE4QixVQUFBalYsUUFBUSxFQUFJO0VBQ3hDLE1BQUEsS0FBSSxDQUFDa1YsZ0JBQUwsQ0FBc0JqZCxJQUF0QixDQUEyQixLQUEzQixFQUFpQytILFFBQWpDO0VBQ0QsS0FGRDs7RUFJQSxTQUFLbVYsb0JBQUwsR0FBNEIsVUFBQW5WLFFBQVEsRUFBSTtFQUN0QyxNQUFBLEtBQUksQ0FBQ29WLGNBQUwsQ0FBb0JuZCxJQUFwQixDQUF5QixLQUF6QixFQUErQitILFFBQS9CO0VBQ0QsS0FGRDtFQUdEOztXQUVEcUIsT0FBQSxjQUFLOUYsTUFBTCxFQUFhO0VBQ1gsU0FBS21HLE1BQUwsR0FBY25HLE1BQWQ7RUFFQUEsSUFBQUEsTUFBTSxDQUFDd0IsZ0JBQVAsQ0FBd0IsZUFBeEIsRUFBeUMsS0FBS3dYLG9CQUE5QztFQUNBaFosSUFBQUEsTUFBTSxDQUFDd0IsZ0JBQVAsQ0FBd0IscUJBQXhCLEVBQStDLEtBQUswWCx5QkFBcEQ7RUFFQWxaLElBQUFBLE1BQU0sQ0FBQ3dCLGdCQUFQLENBQXdCLGVBQXhCLEVBQXlDLEtBQUs0WCxvQkFBOUM7RUFDQXBaLElBQUFBLE1BQU0sQ0FBQ3dCLGdCQUFQLENBQXdCLGlCQUF4QixFQUEyQyxLQUFLOFgsc0JBQWhEO0VBRUF0WixJQUFBQSxNQUFNLENBQUN3QixnQkFBUCxDQUF3QixrQkFBeEIsRUFBNEMsS0FBS2dZLHVCQUFqRDtFQUNBeFosSUFBQUEsTUFBTSxDQUFDd0IsZ0JBQVAsQ0FBd0IsaUJBQXhCLEVBQTJDLEtBQUtrWSxzQkFBaEQ7RUFDQTFaLElBQUFBLE1BQU0sQ0FBQ3dCLGdCQUFQLENBQXdCLGVBQXhCLEVBQXlDLEtBQUtvWSxvQkFBOUM7RUFDRDs7V0FFRG5nQixTQUFBLGdCQUFPVixLQUFQLEVBQWNDLE1BQWQsRUFBc0I7O1dBRXRCOEUsVUFBQSxtQkFBVTtFQUNSLFNBQUttSSxNQUFMO0VBQ0EsU0FBSzdFLElBQUwsQ0FBVXRELE9BQVY7RUFDQSxTQUFLc0QsSUFBTCxHQUFZLElBQVo7RUFDQSxTQUFLc1gsT0FBTCxHQUFlLElBQWY7RUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtFQUNEOztXQUVEMVMsU0FBQSxnQkFBT2pHLE1BQVAsRUFBZTtFQUNiLFNBQUttRyxNQUFMLENBQVk3RCxtQkFBWixDQUFnQyxlQUFoQyxFQUFpRCxLQUFLMFcsb0JBQXREO0VBQ0EsU0FBSzdTLE1BQUwsQ0FBWTdELG1CQUFaLENBQWdDLHFCQUFoQyxFQUF1RCxLQUFLNFcseUJBQTVEO0VBRUEsU0FBSy9TLE1BQUwsQ0FBWTdELG1CQUFaLENBQWdDLGVBQWhDLEVBQWlELEtBQUs4VyxvQkFBdEQ7RUFDQSxTQUFLalQsTUFBTCxDQUFZN0QsbUJBQVosQ0FBZ0MsaUJBQWhDLEVBQW1ELEtBQUtnWCxzQkFBeEQ7RUFFQSxTQUFLblQsTUFBTCxDQUFZN0QsbUJBQVosQ0FBZ0Msa0JBQWhDLEVBQW9ELEtBQUtrWCx1QkFBekQ7RUFDQSxTQUFLclQsTUFBTCxDQUFZN0QsbUJBQVosQ0FBZ0MsaUJBQWhDLEVBQW1ELEtBQUtvWCxzQkFBeEQ7RUFDQSxTQUFLdlQsTUFBTCxDQUFZN0QsbUJBQVosQ0FBZ0MsZUFBaEMsRUFBaUQsS0FBS3NYLG9CQUF0RDtFQUVBLFNBQUt6VCxNQUFMLEdBQWMsSUFBZDtFQUNEOztXQUVEOFMsaUJBQUEsMEJBQWlCOztXQUNqQkUsc0JBQUEsK0JBQXNCOztXQUV0QkUsaUJBQUEsd0JBQWU5WSxPQUFmLEVBQXdCOztXQUN4QmdaLG1CQUFBLDBCQUFpQmhaLE9BQWpCLEVBQTBCOztXQUUxQmtaLG9CQUFBLDJCQUFrQmhWLFFBQWxCLEVBQTRCOztXQUM1QmtWLG1CQUFBLDBCQUFpQmxWLFFBQWpCLEVBQTJCOztXQUMzQm9WLGlCQUFBLHdCQUFlcFYsUUFBZixFQUF5Qjs7Ozs7TUN2Rk5xVjs7O0VBQ25CLDBCQUFZcEIsT0FBWixFQUFxQjtFQUFBOztFQUNuQixxQ0FBTUEsT0FBTjtFQUVBLFVBQUtDLE1BQUwsR0FBYyxJQUFkO0VBQ0EsVUFBSzdkLE9BQUwsR0FBZSxNQUFLNGQsT0FBTCxDQUFhemMsVUFBYixDQUF3QixJQUF4QixDQUFmO0VBQ0EsVUFBSzhkLFdBQUwsR0FBbUIsRUFBbkI7RUFDQSxVQUFLN1ksSUFBTCxHQUFZLGdCQUFaO0VBTm1CO0VBT3BCOzs7O1dBRUR6SCxTQUFBLGdCQUFPVixLQUFQLEVBQWNDLE1BQWQsRUFBc0I7RUFDcEIsU0FBSzBmLE9BQUwsQ0FBYTNmLEtBQWIsR0FBcUJBLEtBQXJCO0VBQ0EsU0FBSzJmLE9BQUwsQ0FBYTFmLE1BQWIsR0FBc0JBLE1BQXRCO0VBQ0Q7O1dBRURpZ0IsaUJBQUEsMEJBQWlCO0VBQ2YsU0FBS25lLE9BQUwsQ0FBYUssU0FBYixDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixLQUFLdWQsT0FBTCxDQUFhM2YsS0FBMUMsRUFBaUQsS0FBSzJmLE9BQUwsQ0FBYTFmLE1BQTlEO0VBQ0Q7O1dBRUR5Z0Isb0JBQUEsMkJBQWtCaFYsUUFBbEIsRUFBNEI7RUFDMUIsUUFBSUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQnpDLE1BQUFBLE9BQU8sQ0FBQ3hDLGVBQVIsQ0FBd0JxSixRQUFRLENBQUNwRSxJQUFqQyxFQUF1QyxLQUFLMlosV0FBNUMsRUFBeUR2VixRQUF6RDtFQUNELEtBRkQsTUFFTztFQUNMQSxNQUFBQSxRQUFRLENBQUMvQyxLQUFULEdBQWlCK0MsUUFBUSxDQUFDL0MsS0FBVCxJQUFrQixTQUFuQztFQUNEO0VBQ0Y7O1dBRURpWSxtQkFBQSwwQkFBaUJsVixRQUFqQixFQUEyQjtFQUN6QixRQUFJQSxRQUFRLENBQUNwRSxJQUFiLEVBQW1CO0VBQ2pCLFVBQUk0WixLQUFLLENBQUM3QixPQUFOLENBQWMzVCxRQUFRLENBQUNwRSxJQUF2QixDQUFKLEVBQWtDO0VBQ2hDLGFBQUtwRixTQUFMLENBQWV3SixRQUFmO0VBQ0Q7RUFDRixLQUpELE1BSU87RUFDTCxXQUFLeVYsVUFBTCxDQUFnQnpWLFFBQWhCO0VBQ0Q7RUFDRjs7V0FFRG9WLGlCQUFBLHdCQUFlcFYsUUFBZixFQUF5QjtFQUN2QkEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxHQUFnQixJQUFoQjtFQUNEOzs7V0FHRDJaLGNBQUEscUJBQVkzZSxHQUFaLEVBQWlCb0osUUFBakIsRUFBMkI7RUFDekJBLElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0JoRixHQUFoQjtFQUNEOzs7V0FHREosWUFBQSxtQkFBVXdKLFFBQVYsRUFBb0I7RUFDbEIsUUFBTTJGLENBQUMsR0FBSTNGLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3RILEtBQWQsR0FBc0IwTCxRQUFRLENBQUMxSyxLQUFoQyxHQUF5QyxDQUFuRDtFQUNBLFFBQU0rUyxDQUFDLEdBQUlySSxRQUFRLENBQUNwRSxJQUFULENBQWNySCxNQUFkLEdBQXVCeUwsUUFBUSxDQUFDMUssS0FBakMsR0FBMEMsQ0FBcEQ7RUFDQSxRQUFNRixDQUFDLEdBQUc0SyxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWV1USxDQUFDLEdBQUcsQ0FBN0I7RUFDQSxRQUFNdFEsQ0FBQyxHQUFHMkssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlZ1QsQ0FBQyxHQUFHLENBQTdCOztFQUVBLFFBQUksQ0FBQyxDQUFDckksUUFBUSxDQUFDL0MsS0FBZixFQUFzQjtFQUNwQixVQUFJLENBQUMrQyxRQUFRLENBQUM4RyxJQUFULENBQWMsUUFBZCxDQUFMLEVBQThCOUcsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNE8sTUFBZCxHQUF1QixLQUFLQyxZQUFMLENBQWtCM1YsUUFBUSxDQUFDcEUsSUFBM0IsQ0FBdkI7RUFFOUIsVUFBTWdhLFVBQVUsR0FBRzVWLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRPLE1BQWQsQ0FBcUJsZSxVQUFyQixDQUFnQyxJQUFoQyxDQUFuQjtFQUNBb2UsTUFBQUEsVUFBVSxDQUFDbGYsU0FBWCxDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQnNKLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRPLE1BQWQsQ0FBcUJwaEIsS0FBaEQsRUFBdUQwTCxRQUFRLENBQUM4RyxJQUFULENBQWM0TyxNQUFkLENBQXFCbmhCLE1BQTVFO0VBQ0FxaEIsTUFBQUEsVUFBVSxDQUFDQyxXQUFYLEdBQXlCN1YsUUFBUSxDQUFDMkcsS0FBbEM7RUFDQWlQLE1BQUFBLFVBQVUsQ0FBQ3BmLFNBQVgsQ0FBcUJ3SixRQUFRLENBQUNwRSxJQUE5QixFQUFvQyxDQUFwQyxFQUF1QyxDQUF2QztFQUVBZ2EsTUFBQUEsVUFBVSxDQUFDRSx3QkFBWCxHQUFzQyxhQUF0QztFQUNBRixNQUFBQSxVQUFVLENBQUNHLFNBQVgsR0FBdUJ4RyxTQUFTLENBQUM5RyxRQUFWLENBQW1CekksUUFBUSxDQUFDK0csR0FBNUIsQ0FBdkI7RUFDQTZPLE1BQUFBLFVBQVUsQ0FBQ0ksUUFBWCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQmhXLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRPLE1BQWQsQ0FBcUJwaEIsS0FBL0MsRUFBc0QwTCxRQUFRLENBQUM4RyxJQUFULENBQWM0TyxNQUFkLENBQXFCbmhCLE1BQTNFO0VBQ0FxaEIsTUFBQUEsVUFBVSxDQUFDRSx3QkFBWCxHQUFzQyxhQUF0QztFQUNBRixNQUFBQSxVQUFVLENBQUNDLFdBQVgsR0FBeUIsQ0FBekI7RUFFQSxXQUFLeGYsT0FBTCxDQUFhRyxTQUFiLENBQ0V3SixRQUFRLENBQUM4RyxJQUFULENBQWM0TyxNQURoQixFQUVFLENBRkYsRUFHRSxDQUhGLEVBSUUxVixRQUFRLENBQUM4RyxJQUFULENBQWM0TyxNQUFkLENBQXFCcGhCLEtBSnZCLEVBS0UwTCxRQUFRLENBQUM4RyxJQUFULENBQWM0TyxNQUFkLENBQXFCbmhCLE1BTHZCLEVBTUVhLENBTkYsRUFPRUMsQ0FQRixFQVFFc1EsQ0FSRixFQVNFMEMsQ0FURjtFQVdELEtBekJELE1BeUJPO0VBQ0wsV0FBS2hTLE9BQUwsQ0FBYTRmLElBQWI7RUFFQSxXQUFLNWYsT0FBTCxDQUFhd2YsV0FBYixHQUEyQjdWLFFBQVEsQ0FBQzJHLEtBQXBDO0VBQ0EsV0FBS3RRLE9BQUwsQ0FBYTZmLFNBQWIsQ0FBdUJsVyxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFsQyxFQUFxQzRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQWhEO0VBQ0EsV0FBS2dCLE9BQUwsQ0FBYWQsTUFBYixDQUFvQitJLFFBQVEsQ0FBQ2tCLGVBQVQsQ0FBeUJRLFFBQVEsQ0FBQ3dILFFBQWxDLENBQXBCO0VBQ0EsV0FBS25SLE9BQUwsQ0FBYTZmLFNBQWIsQ0FBdUIsQ0FBQ2xXLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQW5DLEVBQXNDLENBQUM0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFsRDtFQUNBLFdBQUtnQixPQUFMLENBQWFHLFNBQWIsQ0FBdUJ3SixRQUFRLENBQUNwRSxJQUFoQyxFQUFzQyxDQUF0QyxFQUF5QyxDQUF6QyxFQUE0Q29FLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3RILEtBQTFELEVBQWlFMEwsUUFBUSxDQUFDcEUsSUFBVCxDQUFjckgsTUFBL0UsRUFBdUZhLENBQXZGLEVBQTBGQyxDQUExRixFQUE2RnNRLENBQTdGLEVBQWdHMEMsQ0FBaEc7RUFFQSxXQUFLaFMsT0FBTCxDQUFhd2YsV0FBYixHQUEyQixDQUEzQjtFQUNBLFdBQUt4ZixPQUFMLENBQWE4ZixPQUFiO0VBQ0Q7RUFDRjs7O1dBR0RWLGFBQUEsb0JBQVd6VixRQUFYLEVBQXFCO0VBQ25CLFFBQUlBLFFBQVEsQ0FBQytHLEdBQWIsRUFBa0I7RUFDaEIsV0FBSzFRLE9BQUwsQ0FBYTBmLFNBQWIsYUFBaUMvVixRQUFRLENBQUMrRyxHQUFULENBQWE5RCxDQUE5QyxTQUFtRGpELFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTdELENBQWhFLFNBQXFFbEQsUUFBUSxDQUFDK0csR0FBVCxDQUFhOVQsQ0FBbEYsU0FBdUYrTSxRQUFRLENBQUMyRyxLQUFoRztFQUNELEtBRkQsTUFFTztFQUNMLFdBQUt0USxPQUFMLENBQWEwZixTQUFiLEdBQXlCL1YsUUFBUSxDQUFDL0MsS0FBbEM7RUFDRCxLQUxrQjs7O0VBUW5CLFNBQUs1RyxPQUFMLENBQWErZixTQUFiO0VBQ0EsU0FBSy9mLE9BQUwsQ0FBYWdnQixHQUFiLENBQWlCclcsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBNUIsRUFBK0I0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUExQyxFQUE2QzJLLFFBQVEsQ0FBQ3VILE1BQXRELEVBQThELENBQTlELEVBQWlFL1UsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQTNFLEVBQThFLElBQTlFOztFQUVBLFFBQUksS0FBSytWLE1BQVQsRUFBaUI7RUFDZixXQUFLN2QsT0FBTCxDQUFhaWdCLFdBQWIsR0FBMkIsS0FBS3BDLE1BQUwsQ0FBWWpYLEtBQXZDO0VBQ0EsV0FBSzVHLE9BQUwsQ0FBYWtnQixTQUFiLEdBQXlCLEtBQUtyQyxNQUFMLENBQVlJLFNBQXJDO0VBQ0EsV0FBS2plLE9BQUwsQ0FBYTZkLE1BQWI7RUFDRDs7RUFFRCxTQUFLN2QsT0FBTCxDQUFhbWdCLFNBQWI7RUFDQSxTQUFLbmdCLE9BQUwsQ0FBYW9nQixJQUFiO0VBQ0Q7OztXQUdEZCxlQUFBLHNCQUFhcmYsS0FBYixFQUFvQjtFQUNsQixRQUFJa2YsS0FBSyxDQUFDN0IsT0FBTixDQUFjcmQsS0FBZCxDQUFKLEVBQTBCO0VBQ3hCLFVBQU1vZ0IsSUFBSSxHQUFHcGdCLEtBQUssQ0FBQ2hDLEtBQU4sR0FBYyxHQUFkLEdBQW9CZ0MsS0FBSyxDQUFDL0IsTUFBdkM7RUFDQSxVQUFJK0MsTUFBTSxHQUFHLEtBQUtnZSxXQUFMLENBQWlCb0IsSUFBakIsQ0FBYjs7RUFFQSxVQUFJLENBQUNwZixNQUFMLEVBQWE7RUFDWEEsUUFBQUEsTUFBTSxHQUFHNUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQVQ7RUFDQTJDLFFBQUFBLE1BQU0sQ0FBQ2hELEtBQVAsR0FBZWdDLEtBQUssQ0FBQ2hDLEtBQXJCO0VBQ0FnRCxRQUFBQSxNQUFNLENBQUMvQyxNQUFQLEdBQWdCK0IsS0FBSyxDQUFDL0IsTUFBdEI7RUFDQSxhQUFLK2dCLFdBQUwsQ0FBaUJvQixJQUFqQixJQUF5QnBmLE1BQXpCO0VBQ0Q7O0VBRUQsYUFBT0EsTUFBUDtFQUNEO0VBQ0Y7O1dBRUQrQixVQUFBLG1CQUFVO0VBQ1IsNEJBQU1BLE9BQU47O0VBQ0EsU0FBSzZhLE1BQUwsR0FBYyxJQUFkO0VBQ0EsU0FBSzdkLE9BQUwsR0FBZSxJQUFmO0VBQ0EsU0FBS2lmLFdBQUwsR0FBbUIsSUFBbkI7RUFDRDs7O0lBeEl5Q3RCOztNQ0Z2QjJDOzs7RUFDbkIsdUJBQVkxQyxPQUFaLEVBQXFCO0VBQUE7O0VBQ25CLHFDQUFNQSxPQUFOO0VBRUEsVUFBS0MsTUFBTCxHQUFjLElBQWQ7RUFDQSxVQUFLeGUsV0FBTCxHQUFtQixLQUFuQjs7RUFDQSxVQUFLaUgsSUFBTCxDQUFVMUIsTUFBVixHQUFtQixVQUFDVyxJQUFELEVBQU9vRSxRQUFQO0VBQUEsYUFBb0IsTUFBSzRXLFVBQUwsQ0FBZ0JoYixJQUFoQixFQUFzQm9FLFFBQXRCLENBQXBCO0VBQUEsS0FBbkI7O0VBQ0EsVUFBS3VWLFdBQUwsR0FBbUIsTUFBS0EsV0FBTCxDQUFpQnZjLElBQWpCLCtCQUFuQjtFQUVBLFVBQUt5RCxJQUFMLEdBQVksYUFBWjtFQVJtQjtFQVNwQjs7OztXQUVEdVksb0JBQUEsMkJBQWtCaFYsUUFBbEIsRUFBNEI7RUFDMUIsUUFBSUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQnpDLE1BQUFBLE9BQU8sQ0FBQ3hDLGVBQVIsQ0FBd0JxSixRQUFRLENBQUNwRSxJQUFqQyxFQUF1QyxLQUFLMlosV0FBNUMsRUFBeUR2VixRQUF6RDtFQUNELEtBRkQsTUFFTztFQUNMQSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULEdBQWdCLEtBQUtlLElBQUwsQ0FBVW5DLEdBQVYsQ0FBYyxLQUFLMlosVUFBbkIsRUFBK0JuVSxRQUEvQixDQUFoQjtFQUNBLFdBQUtpVSxPQUFMLENBQWE5VyxXQUFiLENBQXlCNkMsUUFBUSxDQUFDcEUsSUFBbEM7RUFDRDtFQUNGOztXQUVEc1osbUJBQUEsMEJBQWlCbFYsUUFBakIsRUFBMkI7RUFDekIsUUFBSSxLQUFLNlcsU0FBTCxDQUFlN1csUUFBZixDQUFKLEVBQThCO0VBQzVCLFVBQUksS0FBS3RLLFdBQVQsRUFBc0I7RUFDcEI2QixRQUFBQSxPQUFPLENBQUM3QixXQUFSLENBQW9Cc0ssUUFBUSxDQUFDcEUsSUFBN0IsRUFBbUNvRSxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUE5QyxFQUFpRDRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQTVELEVBQStEMkssUUFBUSxDQUFDMUssS0FBeEUsRUFBK0UwSyxRQUFRLENBQUN3SCxRQUF4RjtFQUNELE9BRkQsTUFFTztFQUNMalEsUUFBQUEsT0FBTyxDQUFDekMsU0FBUixDQUFrQmtMLFFBQVEsQ0FBQ3BFLElBQTNCLEVBQWlDb0UsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBNUMsRUFBK0M0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUExRCxFQUE2RDJLLFFBQVEsQ0FBQzFLLEtBQXRFLEVBQTZFMEssUUFBUSxDQUFDd0gsUUFBdEY7RUFDRDs7RUFFRHhILE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY2hILEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCbUwsUUFBUSxDQUFDMkcsS0FBdkM7O0VBRUEsVUFBSTNHLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3dZLFFBQWxCLEVBQTRCO0VBQzFCcFUsUUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxDQUFjaEgsS0FBZCxDQUFvQmtpQixlQUFwQixHQUFzQzlXLFFBQVEsQ0FBQy9DLEtBQVQsSUFBa0IsU0FBeEQ7RUFDRDtFQUNGO0VBQ0Y7O1dBRURtWSxpQkFBQSx3QkFBZXBWLFFBQWYsRUFBeUI7RUFDdkIsUUFBSSxLQUFLNlcsU0FBTCxDQUFlN1csUUFBZixDQUFKLEVBQThCO0VBQzVCLFdBQUtpVSxPQUFMLENBQWF6VyxXQUFiLENBQXlCd0MsUUFBUSxDQUFDcEUsSUFBbEM7RUFDQSxXQUFLZSxJQUFMLENBQVU3QixNQUFWLENBQWlCa0YsUUFBUSxDQUFDcEUsSUFBMUI7RUFDQW9FLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBaEI7RUFDRDtFQUNGOztXQUVEaWIsWUFBQSxtQkFBVTdXLFFBQVYsRUFBb0I7RUFDbEIsV0FBTyxPQUFPQSxRQUFRLENBQUNwRSxJQUFoQixLQUF5QixRQUF6QixJQUFxQ29FLFFBQVEsQ0FBQ3BFLElBQTlDLElBQXNELENBQUNvRSxRQUFRLENBQUNwRSxJQUFULENBQWMxQixPQUE1RTtFQUNEOzs7V0FHRHFiLGNBQUEscUJBQVkzZSxHQUFaLEVBQWlCb0osUUFBakIsRUFBMkI7RUFDekIsUUFBSUEsUUFBUSxDQUFDb0gsSUFBYixFQUFtQjtFQUNuQnBILElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsS0FBS2UsSUFBTCxDQUFVbkMsR0FBVixDQUFjNUQsR0FBZCxFQUFtQm9KLFFBQW5CLENBQWhCO0VBQ0F6SSxJQUFBQSxPQUFPLENBQUN2QyxNQUFSLENBQWVnTCxRQUFRLENBQUNwRSxJQUF4QixFQUE4QmhGLEdBQUcsQ0FBQ3RDLEtBQWxDLEVBQXlDc0MsR0FBRyxDQUFDckMsTUFBN0M7RUFFQSxTQUFLMGYsT0FBTCxDQUFhOVcsV0FBYixDQUF5QjZDLFFBQVEsQ0FBQ3BFLElBQWxDO0VBQ0Q7O1dBRURnYixhQUFBLG9CQUFXaGIsSUFBWCxFQUFpQm9FLFFBQWpCLEVBQTJCO0VBQ3pCLFFBQUlwRSxJQUFJLENBQUN3WSxRQUFULEVBQW1CLE9BQU8sS0FBSzJDLFlBQUwsQ0FBa0IvVyxRQUFsQixDQUFQO0VBQ25CLFdBQU8sS0FBS2dYLFlBQUwsQ0FBa0JwYixJQUFsQixFQUF3Qm9FLFFBQXhCLENBQVA7RUFDRDs7O1dBR0QrVyxlQUFBLHNCQUFhL1csUUFBYixFQUF1QjtFQUNyQixRQUFNdkwsR0FBRyxHQUFHOEMsT0FBTyxDQUFDeEMsU0FBUixDQUFxQmlMLFFBQVEsQ0FBQzNMLEVBQTlCLFdBQXdDLElBQUkyTCxRQUFRLENBQUN1SCxNQUFyRCxFQUE2RCxJQUFJdkgsUUFBUSxDQUFDdUgsTUFBMUUsQ0FBWjtFQUNBOVMsSUFBQUEsR0FBRyxDQUFDRyxLQUFKLENBQVVxaUIsWUFBVixHQUE0QmpYLFFBQVEsQ0FBQ3VILE1BQXJDOztFQUVBLFFBQUksS0FBSzJNLE1BQVQsRUFBaUI7RUFDZnpmLE1BQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVc2lCLFdBQVYsR0FBd0IsS0FBS2hELE1BQUwsQ0FBWWpYLEtBQXBDO0VBQ0F4SSxNQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVXVpQixXQUFWLEdBQTJCLEtBQUtqRCxNQUFMLENBQVlJLFNBQXZDO0VBQ0Q7O0VBQ0Q3ZixJQUFBQSxHQUFHLENBQUMyZixRQUFKLEdBQWUsSUFBZjtFQUVBLFdBQU8zZixHQUFQO0VBQ0Q7O1dBRUR1aUIsZUFBQSxzQkFBYXBiLElBQWIsRUFBbUJvRSxRQUFuQixFQUE2QjtFQUMzQixRQUFNb1gsR0FBRyxHQUFHLE9BQU94YixJQUFQLEtBQWdCLFFBQWhCLEdBQTJCQSxJQUEzQixHQUFrQ0EsSUFBSSxDQUFDN0UsR0FBbkQ7RUFDQSxRQUFNdEMsR0FBRyxHQUFHOEMsT0FBTyxDQUFDeEMsU0FBUixDQUFxQmlMLFFBQVEsQ0FBQzNMLEVBQTlCLFdBQXdDdUgsSUFBSSxDQUFDdEgsS0FBN0MsRUFBb0RzSCxJQUFJLENBQUNySCxNQUF6RCxDQUFaO0VBQ0FFLElBQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVeWlCLGVBQVYsWUFBbUNELEdBQW5DO0VBRUEsV0FBTzNpQixHQUFQO0VBQ0Q7O1dBRUQ0RSxVQUFBLG1CQUFVO0VBQ1IsNEJBQU1BLE9BQU47O0VBQ0EsU0FBSzZhLE1BQUwsR0FBYyxJQUFkO0VBQ0Q7OztJQXhGc0NGOztNQ0RwQnNEOzs7RUFDbkIseUJBQVlyRCxPQUFaLEVBQXFCQyxNQUFyQixFQUE2QjtFQUFBOztFQUMzQixxQ0FBTUQsT0FBTjtFQUVBLFVBQUtDLE1BQUwsR0FBY0EsTUFBZDtFQUNBLFVBQUt6WCxJQUFMLEdBQVksZUFBWjtFQUoyQjtFQUs1Qjs7OztXQUVEdVksb0JBQUEsMkJBQWtCaFYsUUFBbEIsRUFBNEI7RUFDMUIsUUFBSUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQixXQUFLb2IsWUFBTCxDQUFrQmhYLFFBQWxCO0VBQ0QsS0FGRCxNQUVPO0VBQ0wsV0FBSytXLFlBQUwsQ0FBa0IvVyxRQUFsQjtFQUNEOztFQUVELFNBQUtpVSxPQUFMLENBQWFzRCxRQUFiLENBQXNCdlgsUUFBUSxDQUFDcEUsSUFBL0I7RUFDRDs7V0FFRHNaLG1CQUFBLDBCQUFpQmxWLFFBQWpCLEVBQTJCO0VBQ3pCLFFBQUlBLFFBQVEsQ0FBQ3BFLElBQWIsRUFBbUI7RUFDakJvRSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWN4RyxDQUFkLEdBQWtCNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBN0I7RUFDQTRLLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3ZHLENBQWQsR0FBa0IySyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUE3QjtFQUVBMkssTUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxDQUFjK0ssS0FBZCxHQUFzQjNHLFFBQVEsQ0FBQzJHLEtBQS9CO0VBQ0EzRyxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWM0YixNQUFkLEdBQXVCeFgsUUFBUSxDQUFDcEUsSUFBVCxDQUFjNmIsTUFBZCxHQUF1QnpYLFFBQVEsQ0FBQzFLLEtBQXZEO0VBQ0EwSyxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWM0TCxRQUFkLEdBQXlCeEgsUUFBUSxDQUFDd0gsUUFBbEM7RUFDRDtFQUNGOztXQUVENE4saUJBQUEsd0JBQWVwVixRQUFmLEVBQXlCO0VBQ3ZCLFFBQUlBLFFBQVEsQ0FBQ3BFLElBQWIsRUFBbUI7RUFDakJvRSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWM4RixNQUFkLElBQXdCMUIsUUFBUSxDQUFDcEUsSUFBVCxDQUFjOEYsTUFBZCxDQUFxQmxFLFdBQXJCLENBQWlDd0MsUUFBUSxDQUFDcEUsSUFBMUMsQ0FBeEI7RUFDQSxXQUFLZSxJQUFMLENBQVU3QixNQUFWLENBQWlCa0YsUUFBUSxDQUFDcEUsSUFBMUI7RUFDQW9FLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBaEI7RUFDRDs7RUFFRCxRQUFJb0UsUUFBUSxDQUFDMFgsUUFBYixFQUF1QixLQUFLL2EsSUFBTCxDQUFVN0IsTUFBVixDQUFpQmtGLFFBQVEsQ0FBQzBYLFFBQTFCO0VBQ3hCOzs7V0FHRFYsZUFBQSxzQkFBYWhYLFFBQWIsRUFBdUI7RUFDckJBLElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsS0FBS2UsSUFBTCxDQUFVbkMsR0FBVixDQUFjd0YsUUFBUSxDQUFDcEUsSUFBdkIsQ0FBaEI7RUFFQSxRQUFJb0UsUUFBUSxDQUFDcEUsSUFBVCxDQUFjOEYsTUFBbEIsRUFBMEI7O0VBQzFCLFFBQUkxQixRQUFRLENBQUNwRSxJQUFULENBQWMsT0FBZCxDQUFKLEVBQTRCO0VBQzFCb0UsTUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxDQUFjK2IsSUFBZCxHQUFxQjNYLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3RGLEtBQWQsQ0FBb0JoQyxLQUFwQixHQUE0QixDQUFqRDtFQUNBMEwsTUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxDQUFjZ2MsSUFBZCxHQUFxQjVYLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3RGLEtBQWQsQ0FBb0IvQixNQUFwQixHQUE2QixDQUFsRDtFQUNEO0VBQ0Y7O1dBRUR3aUIsZUFBQSxzQkFBYS9XLFFBQWIsRUFBdUI7RUFDckIsUUFBTTBYLFFBQVEsR0FBRyxLQUFLL2EsSUFBTCxDQUFVbkMsR0FBVixDQUFjcWQsUUFBUSxDQUFDQyxRQUF2QixDQUFqQjs7RUFFQSxRQUFJLEtBQUs1RCxNQUFULEVBQWlCO0VBQ2YsVUFBSXNCLEtBQUssQ0FBQ3pCLFFBQU4sQ0FBZSxLQUFLRyxNQUFwQixDQUFKLEVBQWlDO0VBQy9Cd0QsUUFBQUEsUUFBUSxDQUFDSyxXQUFULENBQXFCLEtBQUs3RCxNQUExQjtFQUNELE9BRkQsTUFFTztFQUNMd0QsUUFBQUEsUUFBUSxDQUFDSyxXQUFULENBQXFCLFNBQXJCO0VBQ0Q7RUFDRjs7RUFDREwsSUFBQUEsUUFBUSxDQUFDTSxTQUFULENBQW1CaFksUUFBUSxDQUFDL0MsS0FBVCxJQUFrQixTQUFyQyxFQUFnRHdZLFVBQWhELENBQTJELENBQTNELEVBQThELENBQTlELEVBQWlFelYsUUFBUSxDQUFDdUgsTUFBMUU7RUFDQSxRQUFNMFEsS0FBSyxHQUFHLEtBQUt0YixJQUFMLENBQVVuQyxHQUFWLENBQWNxZCxRQUFRLENBQUNLLEtBQXZCLEVBQThCLENBQUNSLFFBQUQsQ0FBOUIsQ0FBZDtFQUVBMVgsSUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxHQUFnQnFjLEtBQWhCO0VBQ0FqWSxJQUFBQSxRQUFRLENBQUMwWCxRQUFULEdBQW9CQSxRQUFwQjtFQUNEOztXQUVEcmUsVUFBQSxtQkFBVTtFQUNSLDRCQUFNQSxPQUFOOztFQUNBLFNBQUs2YSxNQUFMLEdBQWMsSUFBZDtFQUNEOzs7SUF0RXdDRjs7TUNBdEJtRTs7O0VBQ25CLHlCQUFZbEUsT0FBWixFQUFxQm1FLFNBQXJCLEVBQWdDO0VBQUE7O0VBQzlCLHFDQUFNbkUsT0FBTjtFQUVBLFVBQUs1ZCxPQUFMLEdBQWUsTUFBSzRkLE9BQUwsQ0FBYXpjLFVBQWIsQ0FBd0IsSUFBeEIsQ0FBZjtFQUNBLFVBQUs2Z0IsU0FBTCxHQUFpQixJQUFqQjtFQUNBLFVBQUtELFNBQUwsR0FBaUJBLFNBQWpCOztFQUNBLFVBQUtFLGVBQUwsQ0FBcUJGLFNBQXJCOztFQUVBLFVBQUszYixJQUFMLEdBQVksZUFBWjtFQVI4QjtFQVMvQjs7OztXQUVEekgsU0FBQSxnQkFBT1YsS0FBUCxFQUFjQyxNQUFkLEVBQXNCO0VBQ3BCLFNBQUswZixPQUFMLENBQWEzZixLQUFiLEdBQXFCQSxLQUFyQjtFQUNBLFNBQUsyZixPQUFMLENBQWExZixNQUFiLEdBQXNCQSxNQUF0QjtFQUNEOztXQUVEK2pCLGtCQUFBLHlCQUFnQkYsU0FBaEIsRUFBMkI7RUFDekIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBUyxHQUFHQSxTQUFILEdBQWUsSUFBSTlOLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLEtBQUsySixPQUFMLENBQWEzZixLQUFqQyxFQUF3QyxLQUFLMmYsT0FBTCxDQUFhMWYsTUFBckQsQ0FBekM7RUFDQSxTQUFLOGpCLFNBQUwsR0FBaUIsS0FBS2hpQixPQUFMLENBQWFpaUIsZUFBYixDQUE2QixLQUFLRixTQUFMLENBQWU5akIsS0FBNUMsRUFBbUQsS0FBSzhqQixTQUFMLENBQWU3akIsTUFBbEUsQ0FBakI7RUFDQSxTQUFLOEIsT0FBTCxDQUFha2lCLFlBQWIsQ0FBMEIsS0FBS0YsU0FBL0IsRUFBMEMsS0FBS0QsU0FBTCxDQUFlaGpCLENBQXpELEVBQTRELEtBQUtnakIsU0FBTCxDQUFlL2lCLENBQTNFO0VBQ0Q7O1dBRURtZixpQkFBQSwwQkFBaUI7RUFDZixTQUFLbmUsT0FBTCxDQUFhSyxTQUFiLENBQXVCLEtBQUswaEIsU0FBTCxDQUFlaGpCLENBQXRDLEVBQXlDLEtBQUtnakIsU0FBTCxDQUFlL2lCLENBQXhELEVBQTJELEtBQUsraUIsU0FBTCxDQUFlOWpCLEtBQTFFLEVBQWlGLEtBQUs4akIsU0FBTCxDQUFlN2pCLE1BQWhHO0VBQ0EsU0FBSzhqQixTQUFMLEdBQWlCLEtBQUtoaUIsT0FBTCxDQUFhRCxZQUFiLENBQ2YsS0FBS2dpQixTQUFMLENBQWVoakIsQ0FEQSxFQUVmLEtBQUtnakIsU0FBTCxDQUFlL2lCLENBRkEsRUFHZixLQUFLK2lCLFNBQUwsQ0FBZTlqQixLQUhBLEVBSWYsS0FBSzhqQixTQUFMLENBQWU3akIsTUFKQSxDQUFqQjtFQU1EOztXQUVEbWdCLHNCQUFBLCtCQUFzQjtFQUNwQixTQUFLcmUsT0FBTCxDQUFha2lCLFlBQWIsQ0FBMEIsS0FBS0YsU0FBL0IsRUFBMEMsS0FBS0QsU0FBTCxDQUFlaGpCLENBQXpELEVBQTRELEtBQUtnakIsU0FBTCxDQUFlL2lCLENBQTNFO0VBQ0Q7O1dBRUQyZixvQkFBQSwyQkFBa0JoVixRQUFsQixFQUE0Qjs7V0FFNUJrVixtQkFBQSwwQkFBaUJsVixRQUFqQixFQUEyQjtFQUN6QixRQUFJLEtBQUtxWSxTQUFULEVBQW9CO0VBQ2xCLFdBQUtHLFFBQUwsQ0FDRSxLQUFLSCxTQURQLEVBRUdyWSxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWUsS0FBS2dqQixTQUFMLENBQWVoakIsQ0FBL0IsSUFBcUMsQ0FGdkMsRUFHRzRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZSxLQUFLK2lCLFNBQUwsQ0FBZS9pQixDQUEvQixJQUFxQyxDQUh2QyxFQUlFMkssUUFKRjtFQU1EO0VBQ0Y7O1dBRUR3WSxXQUFBLGtCQUFTL2hCLFNBQVQsRUFBb0JyQixDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEIySyxRQUExQixFQUFvQztFQUNsQyxRQUFNK0csR0FBRyxHQUFHL0csUUFBUSxDQUFDK0csR0FBckI7RUFDQSxRQUFJM1IsQ0FBQyxHQUFHLENBQUosSUFBU0EsQ0FBQyxHQUFHLEtBQUs2ZSxPQUFMLENBQWEzZixLQUExQixJQUFtQ2UsQ0FBQyxHQUFHLENBQXZDLElBQTRDQSxDQUFDLEdBQUcsS0FBS29qQixZQUF6RCxFQUF1RTtFQUV2RSxRQUFNeG1CLENBQUMsR0FBRyxDQUFDLENBQUNvRCxDQUFDLElBQUksQ0FBTixJQUFXb0IsU0FBUyxDQUFDbkMsS0FBckIsSUFBOEJjLENBQUMsSUFBSSxDQUFuQyxDQUFELElBQTBDLENBQXBEO0VBQ0FxQixJQUFBQSxTQUFTLENBQUNxUSxJQUFWLENBQWU3VSxDQUFmLElBQW9COFUsR0FBRyxDQUFDOUQsQ0FBeEI7RUFDQXhNLElBQUFBLFNBQVMsQ0FBQ3FRLElBQVYsQ0FBZTdVLENBQUMsR0FBRyxDQUFuQixJQUF3QjhVLEdBQUcsQ0FBQzdELENBQTVCO0VBQ0F6TSxJQUFBQSxTQUFTLENBQUNxUSxJQUFWLENBQWU3VSxDQUFDLEdBQUcsQ0FBbkIsSUFBd0I4VSxHQUFHLENBQUM5VCxDQUE1QjtFQUNBd0QsSUFBQUEsU0FBUyxDQUFDcVEsSUFBVixDQUFlN1UsQ0FBQyxHQUFHLENBQW5CLElBQXdCK04sUUFBUSxDQUFDMkcsS0FBVCxHQUFpQixHQUF6QztFQUNEOztXQUVEeU8saUJBQUEsd0JBQWVwVixRQUFmLEVBQXlCOztXQUV6QjNHLFVBQUEsbUJBQVU7RUFDUiw0QkFBTUEsT0FBTjs7RUFDQSxTQUFLNmEsTUFBTCxHQUFjLElBQWQ7RUFDQSxTQUFLN2QsT0FBTCxHQUFlLElBQWY7RUFDQSxTQUFLZ2lCLFNBQUwsR0FBaUIsSUFBakI7RUFDQSxTQUFLRCxTQUFMLEdBQWlCLElBQWpCO0VBQ0Q7OztJQXJFd0NwRTs7RUNFM0MsSUFBSTBFLFNBQUo7O01BQ3FCQzs7O0VBQ25CLHdCQUFZMUUsT0FBWixFQUFxQkMsTUFBckIsRUFBNkI7RUFBQTs7RUFDM0IscUNBQU1ELE9BQU47RUFFQSxVQUFLQyxNQUFMLEdBQWNBLE1BQWQ7RUFDQSxVQUFLalgsS0FBTCxHQUFhLEtBQWI7RUFDQSxVQUFLMmIsUUFBTCxHQUFnQixLQUFoQjtFQUNBLFVBQUtDLFNBQUwsR0FBaUIsSUFBakI7O0VBQ0EsVUFBS2xjLElBQUwsQ0FBVTFCLE1BQVYsR0FBbUIsVUFBQ1csSUFBRCxFQUFPb0UsUUFBUDtFQUFBLGFBQW9CLE1BQUs0VyxVQUFMLENBQWdCaGIsSUFBaEIsRUFBc0JvRSxRQUF0QixDQUFwQjtFQUFBLEtBQW5COztFQUNBLFVBQUs4WSxPQUFMLENBQWFoRyxNQUFNLENBQUNpRyxJQUFwQjs7RUFFQSxVQUFLdGMsSUFBTCxHQUFZLGNBQVo7RUFWMkI7RUFXNUI7Ozs7V0FFRHFjLFVBQUEsaUJBQVFDLElBQVIsRUFBYztFQUNaLFFBQUk7RUFDRkwsTUFBQUEsU0FBUyxHQUFHSyxJQUFJLElBQUk7RUFBRUMsUUFBQUEsTUFBTSxFQUFFO0VBQVYsT0FBcEI7RUFDQSxXQUFLQyxlQUFMLEdBQXVCUCxTQUFTLENBQUNNLE1BQVYsQ0FBaUJFLElBQWpCLElBQXlCUixTQUFTLENBQUNNLE1BQVYsQ0FBaUJHLFNBQWpFO0VBQ0QsS0FIRCxDQUdFLE9BQU9qaUIsQ0FBUCxFQUFVO0VBQ2I7O1dBRURzZCxpQkFBQSwwQkFBaUI7RUFFakI7RUFDRjtFQUNBOzs7V0FDRVEsb0JBQUEsMkJBQWtCaFYsUUFBbEIsRUFBNEI7RUFDMUIsUUFBSUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQm9FLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsS0FBS2UsSUFBTCxDQUFVbkMsR0FBVixDQUFjd0YsUUFBUSxDQUFDcEUsSUFBdkIsRUFBNkJvRSxRQUE3QixDQUFoQjtFQUNELEtBRkQsTUFFTztFQUNMQSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULEdBQWdCLEtBQUtlLElBQUwsQ0FBVW5DLEdBQVYsQ0FBYyxLQUFLMlosVUFBbkIsRUFBK0JuVSxRQUEvQixDQUFoQjtFQUNEOztFQUVELFFBQUksS0FBSzZZLFNBQVQsRUFBb0I7RUFDbEI3WSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWNpZCxTQUFkLEdBQTBCLEtBQUtBLFNBQS9CO0VBQ0Q7O0VBRUQsU0FBSzVFLE9BQUwsQ0FBYXNELFFBQWIsQ0FBc0J2WCxRQUFRLENBQUNwRSxJQUEvQjtFQUNEO0VBRUQ7RUFDRjtFQUNBOzs7V0FDRXNaLG1CQUFBLDBCQUFpQmxWLFFBQWpCLEVBQTJCO0VBQ3pCLFNBQUtsTCxTQUFMLENBQWVrTCxRQUFmLEVBQXlCQSxRQUFRLENBQUNwRSxJQUFsQzs7RUFFQSxRQUFJLEtBQUtnZCxRQUFMLEtBQWtCLElBQWxCLElBQTBCLEtBQUszYixLQUFMLEtBQWUsSUFBN0MsRUFBbUQ7RUFDakQrQyxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWN3ZCxJQUFkLEdBQXFCN0osU0FBUyxDQUFDNUcsb0JBQVYsQ0FBK0IzSSxRQUEvQixDQUFyQjtFQUNEO0VBQ0Y7RUFFRDtFQUNGO0VBQ0E7OztXQUNFb1YsaUJBQUEsd0JBQWVwVixRQUFmLEVBQXlCO0VBQ3ZCLFNBQUtpVSxPQUFMLENBQWF6VyxXQUFiLENBQXlCd0MsUUFBUSxDQUFDcEUsSUFBbEM7RUFDQSxTQUFLZSxJQUFMLENBQVU3QixNQUFWLENBQWlCa0YsUUFBUSxDQUFDcEUsSUFBMUI7RUFDQW9FLElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBaEI7RUFDRDs7V0FFRDlHLFlBQUEsbUJBQVVrTCxRQUFWLEVBQW9CN0ksTUFBcEIsRUFBNEI7RUFDMUJBLElBQUFBLE1BQU0sQ0FBQy9CLENBQVAsR0FBVzRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQXRCO0VBQ0ErQixJQUFBQSxNQUFNLENBQUM5QixDQUFQLEdBQVcySyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUF0QjtFQUVBOEIsSUFBQUEsTUFBTSxDQUFDd1AsS0FBUCxHQUFlM0csUUFBUSxDQUFDMkcsS0FBeEI7RUFFQXhQLElBQUFBLE1BQU0sQ0FBQzdCLEtBQVAsQ0FBYUYsQ0FBYixHQUFpQjRLLFFBQVEsQ0FBQzFLLEtBQTFCO0VBQ0E2QixJQUFBQSxNQUFNLENBQUM3QixLQUFQLENBQWFELENBQWIsR0FBaUIySyxRQUFRLENBQUMxSyxLQUExQixDQVAwQjs7RUFVMUI2QixJQUFBQSxNQUFNLENBQUNxUSxRQUFQLEdBQWtCeEgsUUFBUSxDQUFDd0gsUUFBVCxHQUFvQmxKLFFBQVEsQ0FBQ0csTUFBL0MsQ0FWMEI7RUFXM0I7O1dBRURtWSxhQUFBLG9CQUFXaGIsSUFBWCxFQUFpQm9FLFFBQWpCLEVBQTJCO0VBQ3pCLFFBQUlwRSxJQUFJLENBQUN3WSxRQUFULEVBQW1CLE9BQU8sS0FBSzJDLFlBQUwsQ0FBa0IvVyxRQUFsQixDQUFQLENBQW5CLEtBQ0ssT0FBTyxLQUFLZ1gsWUFBTCxDQUFrQnBiLElBQWxCLENBQVA7RUFDTjs7V0FFRG9iLGVBQUEsc0JBQWFwYixJQUFiLEVBQW1CO0VBQ2pCLFFBQU15TCxNQUFNLEdBQUd6TCxJQUFJLENBQUMxQixPQUFMLEdBQWUsS0FBSytlLGVBQUwsQ0FBcUJyZCxJQUFJLENBQUM3RSxHQUExQixDQUFmLEdBQWdELElBQUkyaEIsU0FBUyxDQUFDTSxNQUFkLENBQXFCcGQsSUFBckIsQ0FBL0Q7RUFFQXlMLElBQUFBLE1BQU0sQ0FBQ2dTLE1BQVAsQ0FBY2prQixDQUFkLEdBQWtCLEdBQWxCO0VBQ0FpUyxJQUFBQSxNQUFNLENBQUNnUyxNQUFQLENBQWNoa0IsQ0FBZCxHQUFrQixHQUFsQjtFQUVBLFdBQU9nUyxNQUFQO0VBQ0Q7O1dBRUQwUCxlQUFBLHNCQUFhL1csUUFBYixFQUF1QjtFQUNyQixRQUFNMFgsUUFBUSxHQUFHLElBQUlnQixTQUFTLENBQUNaLFFBQWQsRUFBakI7O0VBRUEsUUFBSSxLQUFLNUQsTUFBVCxFQUFpQjtFQUNmLFVBQU1BLE1BQU0sR0FBR3NCLEtBQUssQ0FBQ3pCLFFBQU4sQ0FBZSxLQUFLRyxNQUFwQixJQUE4QixLQUFLQSxNQUFuQyxHQUE0QyxRQUEzRDtFQUNBd0QsTUFBQUEsUUFBUSxDQUFDSyxXQUFULENBQXFCN0QsTUFBckI7RUFDRDs7RUFFRHdELElBQUFBLFFBQVEsQ0FBQ00sU0FBVCxDQUFtQmhZLFFBQVEsQ0FBQy9DLEtBQVQsSUFBa0IsUUFBckM7RUFDQXlhLElBQUFBLFFBQVEsQ0FBQ2pDLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEJ6VixRQUFRLENBQUN1SCxNQUFuQztFQUNBbVEsSUFBQUEsUUFBUSxDQUFDNEIsT0FBVDtFQUVBLFdBQU81QixRQUFQO0VBQ0Q7O1dBRURyZSxVQUFBLGlCQUFRdUcsU0FBUixFQUFtQjtFQUNqQiw0QkFBTXZHLE9BQU47O0VBRUEsUUFBSXBILENBQUMsR0FBRzJOLFNBQVMsQ0FBQzdOLE1BQWxCOztFQUNBLFdBQU9FLENBQUMsRUFBUixFQUFZO0VBQ1YsVUFBSStOLFFBQVEsR0FBR0osU0FBUyxDQUFDM04sQ0FBRCxDQUF4Qjs7RUFDQSxVQUFJK04sUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQixhQUFLcVksT0FBTCxDQUFhelcsV0FBYixDQUF5QndDLFFBQVEsQ0FBQ3BFLElBQWxDO0VBQ0Q7RUFDRjtFQUNGOzs7SUFoSHVDb1k7O01DSnJCdUY7RUFDbkIsb0JBQWM7RUFDWixTQUFLQyxJQUFMLEdBQVksRUFBWjtFQUNBLFNBQUs5QyxJQUFMLEdBQVksQ0FBWjs7RUFFQSxTQUFLLElBQUl6a0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QjtFQUE2QixXQUFLdW5CLElBQUwsQ0FBVXhlLElBQVYsQ0FBZW9PLElBQUksQ0FBQ25PLE1BQUwsQ0FBWSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLENBQVosQ0FBZjtFQUE3QjtFQUNEOzs7O1dBRURxSyxNQUFBLGFBQUl3RSxDQUFKLEVBQU83WCxDQUFQLEVBQVU7RUFDUixRQUFJQSxDQUFDLEtBQUssQ0FBVixFQUFhbVgsSUFBSSxDQUFDOUQsR0FBTCxDQUFTd0UsQ0FBVCxFQUFZLEtBQUswUCxJQUFMLENBQVUsQ0FBVixDQUFaLEVBQWIsS0FDS3BRLElBQUksQ0FBQ00sUUFBTCxDQUFjLEtBQUs4UCxJQUFMLENBQVV2bkIsQ0FBQyxHQUFHLENBQWQsQ0FBZCxFQUFnQzZYLENBQWhDLEVBQW1DLEtBQUswUCxJQUFMLENBQVV2bkIsQ0FBVixDQUFuQztFQUVMLFNBQUt5a0IsSUFBTCxHQUFZbGtCLElBQUksQ0FBQ29WLEdBQUwsQ0FBUyxLQUFLOE8sSUFBZCxFQUFvQnprQixDQUFDLEdBQUcsQ0FBeEIsQ0FBWjtFQUNEOztXQUVEK0ksT0FBQSxjQUFLOE8sQ0FBTCxFQUFRO0VBQ04sUUFBSSxLQUFLNE0sSUFBTCxLQUFjLENBQWxCLEVBQXFCdE4sSUFBSSxDQUFDOUQsR0FBTCxDQUFTd0UsQ0FBVCxFQUFZLEtBQUswUCxJQUFMLENBQVUsQ0FBVixDQUFaLEVBQXJCLEtBQ0twUSxJQUFJLENBQUNNLFFBQUwsQ0FBYyxLQUFLOFAsSUFBTCxDQUFVLEtBQUs5QyxJQUFMLEdBQVksQ0FBdEIsQ0FBZCxFQUF3QzVNLENBQXhDLEVBQTJDLEtBQUswUCxJQUFMLENBQVUsS0FBSzlDLElBQWYsQ0FBM0M7RUFFTCxTQUFLQSxJQUFMO0VBQ0Q7O1dBRUQ5YixNQUFBLGVBQU07RUFDSixRQUFJLEtBQUs4YixJQUFMLEdBQVksQ0FBaEIsRUFBbUIsS0FBS0EsSUFBTDtFQUNwQjs7V0FFRCtDLE1BQUEsZUFBTTtFQUNKLFdBQU8sS0FBS0QsSUFBTCxDQUFVLEtBQUs5QyxJQUFMLEdBQVksQ0FBdEIsQ0FBUDtFQUNEOzs7OztNQ3BCa0JnRDs7O0VBQ25CLHlCQUFZekYsT0FBWixFQUFxQjtFQUFBOztFQUNuQixxQ0FBTUEsT0FBTjtFQUVBLFVBQUswRixFQUFMLEdBQVUsTUFBSzFGLE9BQUwsQ0FBYXpjLFVBQWIsQ0FBd0Isb0JBQXhCLEVBQThDO0VBQUVvaUIsTUFBQUEsU0FBUyxFQUFFLElBQWI7RUFBbUJDLE1BQUFBLE9BQU8sRUFBRSxLQUE1QjtFQUFtQ0MsTUFBQUEsS0FBSyxFQUFFO0VBQTFDLEtBQTlDLENBQVY7RUFDQSxRQUFJLENBQUMsTUFBS0gsRUFBVixFQUFjcE8sS0FBSyxDQUFDLDBDQUFELENBQUw7O0VBRWQsVUFBS3dPLE9BQUw7O0VBQ0EsVUFBS0MsWUFBTDs7RUFDQSxVQUFLQyxXQUFMOztFQUNBLFVBQUtDLFdBQUw7O0VBRUEsVUFBS1AsRUFBTCxDQUFRUSxhQUFSLENBQXNCLE1BQUtSLEVBQUwsQ0FBUVMsUUFBOUI7O0VBQ0EsVUFBS1QsRUFBTCxDQUFRVSxTQUFSLENBQWtCLE1BQUtWLEVBQUwsQ0FBUVcsU0FBMUIsRUFBcUMsTUFBS1gsRUFBTCxDQUFRWSxtQkFBN0M7O0VBQ0EsVUFBS1osRUFBTCxDQUFRYSxNQUFSLENBQWUsTUFBS2IsRUFBTCxDQUFRYyxLQUF2Qjs7RUFDQSxVQUFLbEYsV0FBTCxHQUFtQixNQUFLQSxXQUFMLENBQWlCdmMsSUFBakIsK0JBQW5CO0VBRUEsVUFBS3lELElBQUwsR0FBWSxlQUFaO0VBaEJtQjtFQWlCcEI7Ozs7V0FFRDRFLE9BQUEsY0FBSzlGLE1BQUwsRUFBYTtFQUNYLDRCQUFNOEYsSUFBTixZQUFXOUYsTUFBWDs7RUFDQSxTQUFLdkcsTUFBTCxDQUFZLEtBQUtpZixPQUFMLENBQWEzZixLQUF6QixFQUFnQyxLQUFLMmYsT0FBTCxDQUFhMWYsTUFBN0M7RUFDRDs7V0FFRFMsU0FBQSxnQkFBT1YsS0FBUCxFQUFjQyxNQUFkLEVBQXNCO0VBQ3BCLFNBQUttbUIsSUFBTCxDQUFVLENBQVYsSUFBZSxDQUFDLENBQWhCO0VBQ0EsU0FBS0EsSUFBTCxDQUFVLENBQVYsSUFBZSxDQUFmO0VBRUEsU0FBS0MsSUFBTCxDQUFVLENBQVYsSUFBZSxJQUFJcm1CLEtBQW5CO0VBQ0EsU0FBS3FtQixJQUFMLENBQVUsQ0FBVixJQUFlLElBQUlwbUIsTUFBbkI7RUFFQSxTQUFLcW1CLE1BQUwsQ0FBWXRWLEdBQVosQ0FBZ0IsS0FBS29WLElBQXJCLEVBQTJCLENBQTNCO0VBQ0EsU0FBS0UsTUFBTCxDQUFZdFYsR0FBWixDQUFnQixLQUFLcVYsSUFBckIsRUFBMkIsQ0FBM0I7RUFFQSxTQUFLaEIsRUFBTCxDQUFRa0IsUUFBUixDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QnZtQixLQUF2QixFQUE4QkMsTUFBOUI7RUFDQSxTQUFLMGYsT0FBTCxDQUFhM2YsS0FBYixHQUFxQkEsS0FBckI7RUFDQSxTQUFLMmYsT0FBTCxDQUFhMWYsTUFBYixHQUFzQkEsTUFBdEI7RUFDRDs7V0FFRHlsQixlQUFBLHNCQUFhelMsTUFBYixFQUFxQjtFQUNuQixTQUFLdVQsZUFBTCxHQUF1QixLQUFLL0QsWUFBTCxDQUFrQnhQLE1BQWxCLENBQXZCO0VBQ0Q7O1dBRUR3VCxrQkFBQSwyQkFBa0I7RUFDaEIsUUFBTUMsUUFBUSxHQUFHLENBQ2Ysd0JBRGUsRUFFZixpQ0FGZSxFQUdmLCtCQUhlLEVBSWYsb0JBSmUsRUFLZiw2QkFMZSxFQU1mLHNCQU5lLEVBT2YsZUFQZSxFQVFmLDZDQVJlLEVBU2YscUNBVGUsRUFVZixnQ0FWZSxFQVdmLHFCQVhlLEVBWWYsR0FaZSxFQWFmbGUsSUFiZSxDQWFWLElBYlUsQ0FBakI7RUFjQSxXQUFPa2UsUUFBUDtFQUNEOztXQUVEQyxvQkFBQSw2QkFBb0I7RUFDbEIsUUFBTUMsUUFBUSxHQUFHLENBQ2YsMEJBRGUsRUFFZiw2QkFGZSxFQUdmLHNCQUhlLEVBSWYsNkJBSmUsRUFLZixxQkFMZSxFQU1mLDBCQU5lLEVBT2Ysc0JBUGUsRUFRZixlQVJlLEVBU2YseURBVGUsRUFVZixrREFWZSxFQVdmLDBCQVhlLEVBWWYsR0FaZSxFQWFmcGUsSUFiZSxDQWFWLElBYlUsQ0FBakI7RUFjQSxXQUFPb2UsUUFBUDtFQUNEOztXQUVEbkIsVUFBQSxtQkFBVTtFQUNSLFNBQUthLE1BQUwsR0FBYyxJQUFJckIsTUFBSixFQUFkO0VBQ0EsU0FBS21CLElBQUwsR0FBWXRSLElBQUksQ0FBQ25PLE1BQUwsQ0FBWSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFDLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBQyxDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixDQUFaLENBQVo7RUFDQSxTQUFLMGYsSUFBTCxHQUFZdlIsSUFBSSxDQUFDbk8sTUFBTCxDQUFZLENBQUMsSUFBSSxHQUFMLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsSUFBSSxHQUF2QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFaLENBQVo7RUFDQSxTQUFLa2dCLGNBQUwsR0FBc0IsRUFBdEI7RUFDRDs7V0FFRGhCLGdCQUFBLHVCQUFjaUIsQ0FBZCxFQUFpQjtFQUNmLFNBQUt6QixFQUFMLENBQVFRLGFBQVIsQ0FBc0IsS0FBS1IsRUFBTCxDQUFReUIsQ0FBUixDQUF0QjtFQUNEOztXQUVEZixZQUFBLG1CQUFVZSxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7RUFDZCxTQUFLMUIsRUFBTCxDQUFRVSxTQUFSLENBQWtCLEtBQUtWLEVBQUwsQ0FBUXlCLENBQVIsQ0FBbEIsRUFBOEIsS0FBS3pCLEVBQUwsQ0FBUTBCLENBQVIsQ0FBOUI7RUFDRDs7V0FFREMsWUFBQSxtQkFBVTNCLEVBQVYsRUFBY3pkLEdBQWQsRUFBbUJxZixFQUFuQixFQUF1QjtFQUNyQixRQUFNQyxNQUFNLEdBQUdELEVBQUUsR0FBRzVCLEVBQUUsQ0FBQzhCLFlBQUgsQ0FBZ0I5QixFQUFFLENBQUMrQixlQUFuQixDQUFILEdBQXlDL0IsRUFBRSxDQUFDOEIsWUFBSCxDQUFnQjlCLEVBQUUsQ0FBQ2dDLGFBQW5CLENBQTFEO0VBRUFoQyxJQUFBQSxFQUFFLENBQUNpQyxZQUFILENBQWdCSixNQUFoQixFQUF3QnRmLEdBQXhCO0VBQ0F5ZCxJQUFBQSxFQUFFLENBQUNrQyxhQUFILENBQWlCTCxNQUFqQjs7RUFFQSxRQUFJLENBQUM3QixFQUFFLENBQUNtQyxrQkFBSCxDQUFzQk4sTUFBdEIsRUFBOEI3QixFQUFFLENBQUNvQyxjQUFqQyxDQUFMLEVBQXVEO0VBQ3JEeFEsTUFBQUEsS0FBSyxDQUFDb08sRUFBRSxDQUFDcUMsZ0JBQUgsQ0FBb0JSLE1BQXBCLENBQUQsQ0FBTDtFQUNBLGFBQU8sSUFBUDtFQUNEOztFQUVELFdBQU9BLE1BQVA7RUFDRDs7V0FFRHZCLGNBQUEsdUJBQWM7RUFDWixRQUFNZ0MsY0FBYyxHQUFHLEtBQUtYLFNBQUwsQ0FBZSxLQUFLM0IsRUFBcEIsRUFBd0IsS0FBS3NCLGlCQUFMLEVBQXhCLEVBQWtELElBQWxELENBQXZCO0VBQ0EsUUFBTWlCLFlBQVksR0FBRyxLQUFLWixTQUFMLENBQWUsS0FBSzNCLEVBQXBCLEVBQXdCLEtBQUtvQixlQUFMLEVBQXhCLEVBQWdELEtBQWhELENBQXJCO0VBRUEsU0FBS29CLFFBQUwsR0FBZ0IsS0FBS3hDLEVBQUwsQ0FBUXlDLGFBQVIsRUFBaEI7RUFDQSxTQUFLekMsRUFBTCxDQUFRMEMsWUFBUixDQUFxQixLQUFLRixRQUExQixFQUFvQ0QsWUFBcEM7RUFDQSxTQUFLdkMsRUFBTCxDQUFRMEMsWUFBUixDQUFxQixLQUFLRixRQUExQixFQUFvQ0YsY0FBcEM7RUFDQSxTQUFLdEMsRUFBTCxDQUFRMkMsV0FBUixDQUFvQixLQUFLSCxRQUF6QjtFQUVBLFFBQUksQ0FBQyxLQUFLeEMsRUFBTCxDQUFRNEMsbUJBQVIsQ0FBNEIsS0FBS0osUUFBakMsRUFBMkMsS0FBS3hDLEVBQUwsQ0FBUTZDLFdBQW5ELENBQUwsRUFBc0VqUixLQUFLLENBQUMsOEJBQUQsQ0FBTDtFQUV0RSxTQUFLb08sRUFBTCxDQUFROEMsVUFBUixDQUFtQixLQUFLTixRQUF4QjtFQUNBLFNBQUtBLFFBQUwsQ0FBY08sR0FBZCxHQUFvQixLQUFLL0MsRUFBTCxDQUFRZ0QsaUJBQVIsQ0FBMEIsS0FBS1IsUUFBL0IsRUFBeUMsaUJBQXpDLENBQXBCO0VBQ0EsU0FBS0EsUUFBTCxDQUFjUyxHQUFkLEdBQW9CLEtBQUtqRCxFQUFMLENBQVFnRCxpQkFBUixDQUEwQixLQUFLUixRQUEvQixFQUF5QyxlQUF6QyxDQUFwQjtFQUNBLFNBQUt4QyxFQUFMLENBQVFrRCx1QkFBUixDQUFnQyxLQUFLVixRQUFMLENBQWNTLEdBQTlDO0VBQ0EsU0FBS2pELEVBQUwsQ0FBUWtELHVCQUFSLENBQWdDLEtBQUtWLFFBQUwsQ0FBY08sR0FBOUM7RUFFQSxTQUFLUCxRQUFMLENBQWNXLFdBQWQsR0FBNEIsS0FBS25ELEVBQUwsQ0FBUW9ELGtCQUFSLENBQTJCLEtBQUtaLFFBQWhDLEVBQTBDLE1BQTFDLENBQTVCO0VBQ0EsU0FBS0EsUUFBTCxDQUFjYSxjQUFkLEdBQStCLEtBQUtyRCxFQUFMLENBQVFvRCxrQkFBUixDQUEyQixLQUFLWixRQUFoQyxFQUEwQyxVQUExQyxDQUEvQjtFQUNBLFNBQUtBLFFBQUwsQ0FBY2MsTUFBZCxHQUF1QixLQUFLdEQsRUFBTCxDQUFRb0Qsa0JBQVIsQ0FBMkIsS0FBS1osUUFBaEMsRUFBMEMsWUFBMUMsQ0FBdkI7RUFDQSxTQUFLQSxRQUFMLENBQWNsZixLQUFkLEdBQXNCLEtBQUswYyxFQUFMLENBQVFvRCxrQkFBUixDQUEyQixLQUFLWixRQUFoQyxFQUEwQyxRQUExQyxDQUF0QjtFQUNBLFNBQUt4QyxFQUFMLENBQVF1RCxTQUFSLENBQWtCLEtBQUtmLFFBQUwsQ0FBY2MsTUFBaEMsRUFBd0MsQ0FBeEM7RUFDRDs7V0FFRC9DLGNBQUEsdUJBQWM7RUFDWixRQUFNaUQsRUFBRSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBWDtFQUNBLFFBQUlDLEdBQUo7RUFFQSxTQUFLQyxXQUFMLEdBQW1CLEtBQUsxRCxFQUFMLENBQVFoRSxZQUFSLEVBQW5CO0VBQ0EsU0FBS2dFLEVBQUwsQ0FBUTJELFVBQVIsQ0FBbUIsS0FBSzNELEVBQUwsQ0FBUTRELG9CQUEzQixFQUFpRCxLQUFLRixXQUF0RDtFQUNBLFNBQUsxRCxFQUFMLENBQVE2RCxVQUFSLENBQW1CLEtBQUs3RCxFQUFMLENBQVE0RCxvQkFBM0IsRUFBaUQsSUFBSUUsV0FBSixDQUFnQk4sRUFBaEIsQ0FBakQsRUFBc0UsS0FBS3hELEVBQUwsQ0FBUStELFdBQTlFO0VBRUEsUUFBSXpyQixDQUFKO0VBQ0EsUUFBSTByQixHQUFHLEdBQUcsRUFBVjs7RUFDQSxTQUFLMXJCLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRyxHQUFoQixFQUFxQkEsQ0FBQyxFQUF0QjtFQUEwQjByQixNQUFBQSxHQUFHLENBQUMzaUIsSUFBSixDQUFTL0ksQ0FBVDtFQUExQjs7RUFDQW1yQixJQUFBQSxHQUFHLEdBQUcsSUFBSUssV0FBSixDQUFnQkUsR0FBaEIsQ0FBTjtFQUVBLFNBQUtDLE9BQUwsR0FBZSxLQUFLakUsRUFBTCxDQUFRaEUsWUFBUixFQUFmO0VBQ0EsU0FBS2dFLEVBQUwsQ0FBUTJELFVBQVIsQ0FBbUIsS0FBSzNELEVBQUwsQ0FBUTRELG9CQUEzQixFQUFpRCxLQUFLSyxPQUF0RDtFQUNBLFNBQUtqRSxFQUFMLENBQVE2RCxVQUFSLENBQW1CLEtBQUs3RCxFQUFMLENBQVE0RCxvQkFBM0IsRUFBaURILEdBQWpELEVBQXNELEtBQUt6RCxFQUFMLENBQVErRCxXQUE5RDtFQUVBQyxJQUFBQSxHQUFHLEdBQUcsRUFBTjs7RUFDQSxTQUFLMXJCLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRyxHQUFoQixFQUFxQkEsQ0FBQyxFQUF0QjtFQUEwQjByQixNQUFBQSxHQUFHLENBQUMzaUIsSUFBSixDQUFTL0ksQ0FBVCxFQUFZQSxDQUFDLEdBQUcsQ0FBaEIsRUFBbUJBLENBQUMsR0FBRyxDQUF2QjtFQUExQjs7RUFDQW1yQixJQUFBQSxHQUFHLEdBQUcsSUFBSUssV0FBSixDQUFnQkUsR0FBaEIsQ0FBTjtFQUVBLFNBQUtFLFdBQUwsR0FBbUIsS0FBS2xFLEVBQUwsQ0FBUWhFLFlBQVIsRUFBbkI7RUFDQSxTQUFLZ0UsRUFBTCxDQUFRMkQsVUFBUixDQUFtQixLQUFLM0QsRUFBTCxDQUFRNEQsb0JBQTNCLEVBQWlELEtBQUtNLFdBQXREO0VBQ0EsU0FBS2xFLEVBQUwsQ0FBUTZELFVBQVIsQ0FBbUIsS0FBSzdELEVBQUwsQ0FBUTRELG9CQUEzQixFQUFpREgsR0FBakQsRUFBc0QsS0FBS3pELEVBQUwsQ0FBUStELFdBQTlEO0VBQ0Q7O1dBRUQzRyxlQUFBLHNCQUFhK0csTUFBYixFQUFxQjtFQUNuQixTQUFLQyxrQkFBTCxHQUEwQjFtQixTQUFTLENBQUNyRixLQUFWLENBQWdCa0osSUFBSSxDQUFDekQsU0FBTCxDQUFlcW1CLE1BQWYsRUFBdUIsRUFBdkIsQ0FBaEIsQ0FBMUI7RUFDQSxRQUFNeG1CLE1BQU0sR0FBR0MsT0FBTyxDQUFDbkQsWUFBUixDQUFxQixlQUFyQixFQUFzQyxLQUFLMnBCLGtCQUFMLEdBQTBCLENBQWhFLEVBQW1FLEtBQUtBLGtCQUFMLEdBQTBCLENBQTdGLENBQWY7RUFDQSxRQUFNMW5CLE9BQU8sR0FBR2lCLE1BQU0sQ0FBQ0UsVUFBUCxDQUFrQixJQUFsQixDQUFoQjtFQUVBbkIsSUFBQUEsT0FBTyxDQUFDK2YsU0FBUjtFQUNBL2YsSUFBQUEsT0FBTyxDQUFDZ2dCLEdBQVIsQ0FBWSxLQUFLMEgsa0JBQWpCLEVBQXFDLEtBQUtBLGtCQUExQyxFQUE4RCxLQUFLQSxrQkFBbkUsRUFBdUYsQ0FBdkYsRUFBMEZ2ckIsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQXBHLEVBQXVHLElBQXZHO0VBQ0E5SCxJQUFBQSxPQUFPLENBQUNtZ0IsU0FBUjtFQUNBbmdCLElBQUFBLE9BQU8sQ0FBQzBmLFNBQVIsR0FBb0IsTUFBcEI7RUFDQTFmLElBQUFBLE9BQU8sQ0FBQ29nQixJQUFSO0VBRUEsV0FBT25mLE1BQU0sQ0FBQzBtQixTQUFQLEVBQVA7RUFDRDs7V0FFREMsaUJBQUEsd0JBQWVqZSxRQUFmLEVBQXlCO0VBQ3ZCLFFBQU1rZSxFQUFFLEdBQUdsZSxRQUFRLENBQUNwRSxJQUFULENBQWN0SCxLQUF6QjtFQUNBLFFBQU02cEIsRUFBRSxHQUFHbmUsUUFBUSxDQUFDcEUsSUFBVCxDQUFjckgsTUFBekI7O0VBRUEsUUFBTTZwQixNQUFNLEdBQUcvbUIsU0FBUyxDQUFDckYsS0FBVixDQUFnQmdPLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3RILEtBQTlCLENBQWY7O0VBQ0EsUUFBTStwQixPQUFPLEdBQUdobkIsU0FBUyxDQUFDckYsS0FBVixDQUFnQmdPLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3JILE1BQTlCLENBQWhCOztFQUVBLFFBQU0rcEIsT0FBTyxHQUFHdGUsUUFBUSxDQUFDcEUsSUFBVCxDQUFjdEgsS0FBZCxHQUFzQjhwQixNQUF0Qzs7RUFDQSxRQUFNRyxPQUFPLEdBQUd2ZSxRQUFRLENBQUNwRSxJQUFULENBQWNySCxNQUFkLEdBQXVCOHBCLE9BQXZDOztFQUVBLFFBQUksQ0FBQyxLQUFLbEQsY0FBTCxDQUFvQm5iLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYy9QLEdBQWxDLENBQUwsRUFDRSxLQUFLb2tCLGNBQUwsQ0FBb0JuYixRQUFRLENBQUM4RyxJQUFULENBQWMvUCxHQUFsQyxJQUF5QyxDQUN2QyxLQUFLNGlCLEVBQUwsQ0FBUTZFLGFBQVIsRUFEdUMsRUFFdkMsS0FBSzdFLEVBQUwsQ0FBUWhFLFlBQVIsRUFGdUMsRUFHdkMsS0FBS2dFLEVBQUwsQ0FBUWhFLFlBQVIsRUFIdUMsQ0FBekM7RUFNRjNWLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJYLE9BQWQsR0FBd0IsS0FBS3RELGNBQUwsQ0FBb0JuYixRQUFRLENBQUM4RyxJQUFULENBQWMvUCxHQUFsQyxFQUF1QyxDQUF2QyxDQUF4QjtFQUNBaUosSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNFgsUUFBZCxHQUF5QixLQUFLdkQsY0FBTCxDQUFvQm5iLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYy9QLEdBQWxDLEVBQXVDLENBQXZDLENBQXpCO0VBQ0FpSixJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWM2WCxRQUFkLEdBQXlCLEtBQUt4RCxjQUFMLENBQW9CbmIsUUFBUSxDQUFDOEcsSUFBVCxDQUFjL1AsR0FBbEMsRUFBdUMsQ0FBdkMsQ0FBekI7RUFFQSxTQUFLNGlCLEVBQUwsQ0FBUTJELFVBQVIsQ0FBbUIsS0FBSzNELEVBQUwsQ0FBUWlGLFlBQTNCLEVBQXlDNWUsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNlgsUUFBdkQ7RUFDQSxTQUFLaEYsRUFBTCxDQUFRNkQsVUFBUixDQUNFLEtBQUs3RCxFQUFMLENBQVFpRixZQURWLEVBRUUsSUFBSXJWLFlBQUosQ0FBaUIsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXK1UsT0FBWCxFQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QkMsT0FBOUIsRUFBdUNBLE9BQXZDLEVBQWdEQSxPQUFoRCxDQUFqQixDQUZGLEVBR0UsS0FBSzVFLEVBQUwsQ0FBUStELFdBSFY7RUFLQSxTQUFLL0QsRUFBTCxDQUFRMkQsVUFBUixDQUFtQixLQUFLM0QsRUFBTCxDQUFRaUYsWUFBM0IsRUFBeUM1ZSxRQUFRLENBQUM4RyxJQUFULENBQWM0WCxRQUF2RDtFQUNBLFNBQUsvRSxFQUFMLENBQVE2RCxVQUFSLENBQ0UsS0FBSzdELEVBQUwsQ0FBUWlGLFlBRFYsRUFFRSxJQUFJclYsWUFBSixDQUFpQixDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcyVSxFQUFYLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QkMsRUFBekIsRUFBNkJELEVBQTdCLEVBQWlDQyxFQUFqQyxDQUFqQixDQUZGLEVBR0UsS0FBS3hFLEVBQUwsQ0FBUStELFdBSFY7RUFNQSxRQUFNcm5CLE9BQU8sR0FBRzJKLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3hQLE1BQWQsQ0FBcUJFLFVBQXJCLENBQWdDLElBQWhDLENBQWhCO0VBQ0EsUUFBTXNQLElBQUksR0FBR3pRLE9BQU8sQ0FBQ0QsWUFBUixDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQmdvQixNQUEzQixFQUFtQ0MsT0FBbkMsQ0FBYjtFQUVBLFNBQUsxRSxFQUFMLENBQVFrRixXQUFSLENBQW9CLEtBQUtsRixFQUFMLENBQVFtRixVQUE1QixFQUF3QzllLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJYLE9BQXREO0VBQ0EsU0FBSzlFLEVBQUwsQ0FBUW9GLFVBQVIsQ0FBbUIsS0FBS3BGLEVBQUwsQ0FBUW1GLFVBQTNCLEVBQXVDLENBQXZDLEVBQTBDLEtBQUtuRixFQUFMLENBQVFxRixJQUFsRCxFQUF3RCxLQUFLckYsRUFBTCxDQUFRcUYsSUFBaEUsRUFBc0UsS0FBS3JGLEVBQUwsQ0FBUXNGLGFBQTlFLEVBQTZGblksSUFBN0Y7RUFDQSxTQUFLNlMsRUFBTCxDQUFRdUYsYUFBUixDQUFzQixLQUFLdkYsRUFBTCxDQUFRbUYsVUFBOUIsRUFBMEMsS0FBS25GLEVBQUwsQ0FBUXdGLGtCQUFsRCxFQUFzRSxLQUFLeEYsRUFBTCxDQUFReUYsTUFBOUU7RUFDQSxTQUFLekYsRUFBTCxDQUFRdUYsYUFBUixDQUFzQixLQUFLdkYsRUFBTCxDQUFRbUYsVUFBOUIsRUFBMEMsS0FBS25GLEVBQUwsQ0FBUTBGLGtCQUFsRCxFQUFzRSxLQUFLMUYsRUFBTCxDQUFRMkYscUJBQTlFO0VBQ0EsU0FBSzNGLEVBQUwsQ0FBUTRGLGNBQVIsQ0FBdUIsS0FBSzVGLEVBQUwsQ0FBUW1GLFVBQS9CO0VBRUE5ZSxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWMwWSxhQUFkLEdBQThCLElBQTlCO0VBQ0F4ZixJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWMyWSxZQUFkLEdBQTZCdkIsRUFBN0I7RUFDQWxlLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRZLGFBQWQsR0FBOEJ2QixFQUE5QjtFQUNEOztXQUVEM0osaUJBQUEsMEJBQWlCO0VBRWY7RUFDRDs7V0FFRFEsb0JBQUEsMkJBQWtCaFYsUUFBbEIsRUFBNEI7RUFDMUJBLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBZLGFBQWQsR0FBOEIsS0FBOUI7RUFDQXhmLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzZZLElBQWQsR0FBcUJ2VyxJQUFJLENBQUNuTyxNQUFMLEVBQXJCO0VBQ0ErRSxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWM2WSxJQUFkLENBQW1CLENBQW5CLElBQXdCLENBQXhCO0VBQ0EzZixJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWM4WSxJQUFkLEdBQXFCeFcsSUFBSSxDQUFDbk8sTUFBTCxFQUFyQjtFQUNBK0UsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjOFksSUFBZCxDQUFtQixDQUFuQixJQUF3QixDQUF4Qjs7RUFFQSxRQUFJNWYsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQnpDLE1BQUFBLE9BQU8sQ0FBQ3hDLGVBQVIsQ0FBd0JxSixRQUFRLENBQUNwRSxJQUFqQyxFQUF1QyxLQUFLMlosV0FBNUMsRUFBeUR2VixRQUF6RDtFQUNELEtBRkQsTUFFTztFQUNMN0csTUFBQUEsT0FBTyxDQUFDeEMsZUFBUixDQUF3QixLQUFLbWtCLGVBQTdCLEVBQThDLEtBQUt2RixXQUFuRCxFQUFnRXZWLFFBQWhFO0VBQ0FBLE1BQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYytZLFFBQWQsR0FBeUI3ZixRQUFRLENBQUN1SCxNQUFULEdBQWtCLEtBQUt3VyxrQkFBaEQ7RUFDRDtFQUNGOzs7V0FHRHhJLGNBQUEscUJBQVkzZSxHQUFaLEVBQWlCb0osUUFBakIsRUFBMkI7RUFDekIsUUFBSUEsUUFBUSxDQUFDb0gsSUFBYixFQUFtQjtFQUNuQnBILElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0JoRixHQUFoQjtFQUNBb0osSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjL1AsR0FBZCxHQUFvQkgsR0FBRyxDQUFDRyxHQUF4QjtFQUNBaUosSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjeFAsTUFBZCxHQUF1QjZCLE9BQU8sQ0FBQy9CLGtCQUFSLENBQTJCUixHQUEzQixDQUF2QjtFQUNBb0osSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjK1ksUUFBZCxHQUF5QixDQUF6QjtFQUVBLFNBQUs1QixjQUFMLENBQW9CamUsUUFBcEI7RUFDRDs7V0FFRGtWLG1CQUFBLDBCQUFpQmxWLFFBQWpCLEVBQTJCO0VBQ3pCLFFBQUlBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBZLGFBQWxCLEVBQWlDO0VBQy9CLFdBQUtNLFlBQUwsQ0FBa0I5ZixRQUFsQjtFQUVBLFdBQUsyWixFQUFMLENBQVFvRyxTQUFSLENBQWtCLEtBQUs1RCxRQUFMLENBQWNsZixLQUFoQyxFQUF1QytDLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlELENBQWIsR0FBaUIsR0FBeEQsRUFBNkRqRCxRQUFRLENBQUMrRyxHQUFULENBQWE3RCxDQUFiLEdBQWlCLEdBQTlFLEVBQW1GbEQsUUFBUSxDQUFDK0csR0FBVCxDQUFhOVQsQ0FBYixHQUFpQixHQUFwRztFQUNBLFdBQUswbUIsRUFBTCxDQUFRcUcsZ0JBQVIsQ0FBeUIsS0FBSzdELFFBQUwsQ0FBY1csV0FBdkMsRUFBb0QsS0FBcEQsRUFBMkQsS0FBS2xDLE1BQUwsQ0FBWW5CLEdBQVosRUFBM0Q7RUFFQSxXQUFLRSxFQUFMLENBQVEyRCxVQUFSLENBQW1CLEtBQUszRCxFQUFMLENBQVFpRixZQUEzQixFQUF5QzVlLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRYLFFBQXZEO0VBQ0EsV0FBSy9FLEVBQUwsQ0FBUXNHLG1CQUFSLENBQTRCLEtBQUs5RCxRQUFMLENBQWNPLEdBQTFDLEVBQStDLENBQS9DLEVBQWtELEtBQUsvQyxFQUFMLENBQVF1RyxLQUExRCxFQUFpRSxLQUFqRSxFQUF3RSxDQUF4RSxFQUEyRSxDQUEzRTtFQUNBLFdBQUt2RyxFQUFMLENBQVEyRCxVQUFSLENBQW1CLEtBQUszRCxFQUFMLENBQVFpRixZQUEzQixFQUF5QzVlLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzZYLFFBQXZEO0VBQ0EsV0FBS2hGLEVBQUwsQ0FBUXNHLG1CQUFSLENBQTRCLEtBQUs5RCxRQUFMLENBQWNTLEdBQTFDLEVBQStDLENBQS9DLEVBQWtELEtBQUtqRCxFQUFMLENBQVF1RyxLQUExRCxFQUFpRSxLQUFqRSxFQUF3RSxDQUF4RSxFQUEyRSxDQUEzRTtFQUNBLFdBQUt2RyxFQUFMLENBQVFrRixXQUFSLENBQW9CLEtBQUtsRixFQUFMLENBQVFtRixVQUE1QixFQUF3QzllLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJYLE9BQXREO0VBQ0EsV0FBSzlFLEVBQUwsQ0FBUXVELFNBQVIsQ0FBa0IsS0FBS2YsUUFBTCxDQUFjYSxjQUFoQyxFQUFnRCxDQUFoRDtFQUNBLFdBQUtyRCxFQUFMLENBQVEyRCxVQUFSLENBQW1CLEtBQUszRCxFQUFMLENBQVE0RCxvQkFBM0IsRUFBaUQsS0FBS0YsV0FBdEQ7RUFFQSxXQUFLMUQsRUFBTCxDQUFRd0csWUFBUixDQUFxQixLQUFLeEcsRUFBTCxDQUFReUcsU0FBN0IsRUFBd0MsQ0FBeEMsRUFBMkMsS0FBS3pHLEVBQUwsQ0FBUTBHLGNBQW5ELEVBQW1FLENBQW5FO0VBQ0EsV0FBS3pGLE1BQUwsQ0FBWWhnQixHQUFaO0VBQ0Q7RUFDRjs7V0FFRHdhLGlCQUFBLHdCQUFlcFYsUUFBZixFQUF5Qjs7V0FFekI4ZixlQUFBLHNCQUFhOWYsUUFBYixFQUF1QjtFQUNyQixRQUFNc2dCLGdCQUFnQixHQUFHanBCLFNBQVMsQ0FBQ25GLGVBQVYsQ0FDdkIsQ0FBQzhOLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJZLFlBQWYsR0FBOEIsQ0FEUCxFQUV2QixDQUFDemYsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNFksYUFBZixHQUErQixDQUZSLENBQXpCO0VBSUEsUUFBTWEsaUJBQWlCLEdBQUdscEIsU0FBUyxDQUFDbkYsZUFBVixDQUEwQjhOLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQXJDLEVBQXdDNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBbkQsQ0FBMUI7RUFFQSxRQUFNbXJCLEtBQUssR0FBR3hnQixRQUFRLENBQUN3SCxRQUFULEdBQW9CbEosUUFBUSxDQUFDRyxNQUEzQztFQUNBLFFBQU1naUIsY0FBYyxHQUFHcHBCLFNBQVMsQ0FBQ2hGLFlBQVYsQ0FBdUJtdUIsS0FBdkIsQ0FBdkI7RUFFQSxRQUFNbHJCLEtBQUssR0FBRzBLLFFBQVEsQ0FBQzFLLEtBQVQsR0FBaUIwSyxRQUFRLENBQUM4RyxJQUFULENBQWMrWSxRQUE3QztFQUNBLFFBQU1hLFdBQVcsR0FBR3JwQixTQUFTLENBQUN6RSxTQUFWLENBQW9CMEMsS0FBcEIsRUFBMkJBLEtBQTNCLENBQXBCO0VBQ0EsUUFBSXFyQixNQUFNLEdBQUd0cEIsU0FBUyxDQUFDdEUsY0FBVixDQUF5QnV0QixnQkFBekIsRUFBMkNJLFdBQTNDLENBQWI7RUFFQUMsSUFBQUEsTUFBTSxHQUFHdHBCLFNBQVMsQ0FBQ3RFLGNBQVYsQ0FBeUI0dEIsTUFBekIsRUFBaUNGLGNBQWpDLENBQVQ7RUFDQUUsSUFBQUEsTUFBTSxHQUFHdHBCLFNBQVMsQ0FBQ3RFLGNBQVYsQ0FBeUI0dEIsTUFBekIsRUFBaUNKLGlCQUFqQyxDQUFUO0VBRUFuWCxJQUFBQSxJQUFJLENBQUNPLE9BQUwsQ0FBYWdYLE1BQWIsRUFBcUIzZ0IsUUFBUSxDQUFDOEcsSUFBVCxDQUFjOFksSUFBbkM7RUFDQWUsSUFBQUEsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZM2dCLFFBQVEsQ0FBQzJHLEtBQXJCO0VBRUEsU0FBS2lVLE1BQUwsQ0FBWTVmLElBQVosQ0FBaUIybEIsTUFBakI7RUFDRDs7V0FFRHRuQixVQUFBLG1CQUFVO0VBQ1IsNEJBQU1BLE9BQU47O0VBQ0EsU0FBS3NnQixFQUFMLEdBQVUsSUFBVjtFQUNBLFNBQUtpQixNQUFMLEdBQWMsSUFBZDtFQUNBLFNBQUtGLElBQUwsR0FBWSxJQUFaO0VBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQVo7RUFDQSxTQUFLUSxjQUFMLEdBQXNCLElBQXRCO0VBQ0Q7OztJQWhUd0NuSDs7TUNSdEI0TTs7O0VBQ25CLDBCQUFZM00sT0FBWixFQUFxQjtFQUFBOztFQUNuQixxQ0FBTUEsT0FBTjtFQUVBLFVBQUt4WCxJQUFMLEdBQVksZ0JBQVo7RUFIbUI7RUFJcEI7OztJQUx5Q3VYOztNQ0V2QjZNOzs7RUFDbkIsb0JBQVlDLEVBQVosRUFBZ0JDLEVBQWhCLEVBQW9CQyxFQUFwQixFQUF3QkMsRUFBeEIsRUFBNEJDLFNBQTVCLEVBQXVDO0VBQUE7O0VBQ3JDOztFQUVBLFFBQUlGLEVBQUUsR0FBR0YsRUFBTCxJQUFXLENBQWYsRUFBa0I7RUFDaEIsWUFBS0EsRUFBTCxHQUFVQSxFQUFWO0VBQ0EsWUFBS0MsRUFBTCxHQUFVQSxFQUFWO0VBQ0EsWUFBS0MsRUFBTCxHQUFVQSxFQUFWO0VBQ0EsWUFBS0MsRUFBTCxHQUFVQSxFQUFWO0VBQ0QsS0FMRCxNQUtPO0VBQ0wsWUFBS0gsRUFBTCxHQUFVRSxFQUFWO0VBQ0EsWUFBS0QsRUFBTCxHQUFVRSxFQUFWO0VBQ0EsWUFBS0QsRUFBTCxHQUFVRixFQUFWO0VBQ0EsWUFBS0csRUFBTCxHQUFVRixFQUFWO0VBQ0Q7O0VBRUQsVUFBS3ZhLEVBQUwsR0FBVSxNQUFLd2EsRUFBTCxHQUFVLE1BQUtGLEVBQXpCO0VBQ0EsVUFBS3JhLEVBQUwsR0FBVSxNQUFLd2EsRUFBTCxHQUFVLE1BQUtGLEVBQXpCO0VBRUEsVUFBS0ksSUFBTCxHQUFZM3VCLElBQUksQ0FBQzR1QixHQUFMLENBQVMsTUFBS04sRUFBZCxFQUFrQixNQUFLRSxFQUF2QixDQUFaO0VBQ0EsVUFBS0ssSUFBTCxHQUFZN3VCLElBQUksQ0FBQzR1QixHQUFMLENBQVMsTUFBS0wsRUFBZCxFQUFrQixNQUFLRSxFQUF2QixDQUFaO0VBQ0EsVUFBS0ssSUFBTCxHQUFZOXVCLElBQUksQ0FBQ29WLEdBQUwsQ0FBUyxNQUFLa1osRUFBZCxFQUFrQixNQUFLRSxFQUF2QixDQUFaO0VBQ0EsVUFBS08sSUFBTCxHQUFZL3VCLElBQUksQ0FBQ29WLEdBQUwsQ0FBUyxNQUFLbVosRUFBZCxFQUFrQixNQUFLRSxFQUF2QixDQUFaO0VBRUEsVUFBSy9hLEdBQUwsR0FBVyxNQUFLOGEsRUFBTCxHQUFVLE1BQUtELEVBQWYsR0FBb0IsTUFBS0QsRUFBTCxHQUFVLE1BQUtHLEVBQTlDO0VBQ0EsVUFBS08sSUFBTCxHQUFZLE1BQUtoYixFQUFMLEdBQVUsTUFBS0EsRUFBZixHQUFvQixNQUFLQyxFQUFMLEdBQVUsTUFBS0EsRUFBL0M7RUFFQSxVQUFLeUosUUFBTCxHQUFnQixNQUFLekssV0FBTCxFQUFoQjtFQUNBLFVBQUsxVCxNQUFMLEdBQWMsTUFBSzB2QixTQUFMLEVBQWQ7RUFDQSxVQUFLUCxTQUFMLEdBQWlCaG1CLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXlwQixTQUFmLEVBQTBCLEdBQTFCLENBQWpCO0VBNUJxQztFQTZCdEM7Ozs7V0FFRDFWLGNBQUEsdUJBQWM7RUFDWixTQUFLalQsTUFBTCxHQUFjL0YsSUFBSSxDQUFDK0YsTUFBTCxFQUFkO0VBQ0EsU0FBSzhTLE1BQUwsQ0FBWWpXLENBQVosR0FBZ0IsS0FBSzByQixFQUFMLEdBQVUsS0FBS3ZvQixNQUFMLEdBQWMsS0FBS3hHLE1BQW5CLEdBQTRCUyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLeWQsUUFBZCxDQUF0RDtFQUNBLFNBQUs3RSxNQUFMLENBQVloVyxDQUFaLEdBQWdCLEtBQUswckIsRUFBTCxHQUFVLEtBQUt4b0IsTUFBTCxHQUFjLEtBQUt4RyxNQUFuQixHQUE0QlMsSUFBSSxDQUFDRyxHQUFMLENBQVMsS0FBS3VkLFFBQWQsQ0FBdEQ7RUFFQSxXQUFPLEtBQUs3RSxNQUFaO0VBQ0Q7O1dBRURwRSxlQUFBLHNCQUFhN1IsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUI7RUFDakIsUUFBTStsQixDQUFDLEdBQUcsS0FBSzNVLEVBQWY7RUFDQSxRQUFNNFUsQ0FBQyxHQUFHLENBQUMsS0FBSzdVLEVBQWhCO0VBQ0EsUUFBTWtiLENBQUMsR0FBRyxLQUFLeGIsR0FBZjtFQUNBLFFBQU15YixDQUFDLEdBQUd0RyxDQUFDLEtBQUssQ0FBTixHQUFVLENBQVYsR0FBY0EsQ0FBeEI7RUFFQSxRQUFJLENBQUNELENBQUMsR0FBR2htQixDQUFKLEdBQVFpbUIsQ0FBQyxHQUFHaG1CLENBQVosR0FBZ0Jxc0IsQ0FBakIsSUFBc0JDLENBQXRCLEdBQTBCLENBQTlCLEVBQWlDLE9BQU8sSUFBUCxDQUFqQyxLQUNLLE9BQU8sS0FBUDtFQUNOOztXQUVEQyxjQUFBLHFCQUFZeHNCLENBQVosRUFBZUMsQ0FBZixFQUFrQjtFQUNoQixRQUFNK2xCLENBQUMsR0FBRyxLQUFLM1UsRUFBZjtFQUNBLFFBQU00VSxDQUFDLEdBQUcsQ0FBQyxLQUFLN1UsRUFBaEI7RUFDQSxRQUFNa2IsQ0FBQyxHQUFHLEtBQUt4YixHQUFmO0VBQ0EsUUFBTXliLENBQUMsR0FBR3ZHLENBQUMsR0FBR2htQixDQUFKLEdBQVFpbUIsQ0FBQyxHQUFHaG1CLENBQVosR0FBZ0Jxc0IsQ0FBMUI7RUFFQSxXQUFPQyxDQUFDLEdBQUdudkIsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLEtBQUsyYyxJQUFmLENBQVg7RUFDRDs7V0FFREssZUFBQSxzQkFBYXpoQixDQUFiLEVBQWdCO0VBQ2QsUUFBTTBoQixJQUFJLEdBQUcxaEIsQ0FBQyxDQUFDcUYsV0FBRixFQUFiO0VBQ0EsUUFBTXNjLElBQUksR0FBRyxLQUFLdGMsV0FBTCxFQUFiO0VBQ0EsUUFBTWMsR0FBRyxHQUFHLEtBQUt3YixJQUFJLEdBQUdELElBQVosQ0FBWjtFQUVBLFFBQU1FLElBQUksR0FBRzVoQixDQUFDLENBQUNoTCxDQUFmO0VBQ0EsUUFBTTZzQixJQUFJLEdBQUc3aEIsQ0FBQyxDQUFDL0ssQ0FBZjtFQUVBK0ssSUFBQUEsQ0FBQyxDQUFDaEwsQ0FBRixHQUFNNHNCLElBQUksR0FBR3h2QixJQUFJLENBQUNDLEdBQUwsQ0FBUzhULEdBQVQsQ0FBUCxHQUF1QjBiLElBQUksR0FBR3p2QixJQUFJLENBQUNHLEdBQUwsQ0FBUzRULEdBQVQsQ0FBcEM7RUFDQW5HLElBQUFBLENBQUMsQ0FBQy9LLENBQUYsR0FBTTJzQixJQUFJLEdBQUd4dkIsSUFBSSxDQUFDRyxHQUFMLENBQVM0VCxHQUFULENBQVAsR0FBdUIwYixJQUFJLEdBQUd6dkIsSUFBSSxDQUFDQyxHQUFMLENBQVM4VCxHQUFULENBQXBDO0VBRUEsV0FBT25HLENBQVA7RUFDRDs7V0FFRHFGLGNBQUEsdUJBQWM7RUFDWixXQUFPalQsSUFBSSxDQUFDa1QsS0FBTCxDQUFXLEtBQUtlLEVBQWhCLEVBQW9CLEtBQUtELEVBQXpCLENBQVA7RUFDRDs7V0FFRDBiLFdBQUEsa0JBQVNsaUIsUUFBVCxFQUFtQjtFQUNqQixRQUFNMlAsS0FBSyxHQUFHbmQsSUFBSSxDQUFDc1csR0FBTCxDQUFTLEtBQUtyRCxXQUFMLEVBQVQsQ0FBZDs7RUFFQSxRQUFJa0ssS0FBSyxJQUFJclIsUUFBUSxDQUFDSCxFQUFULEdBQWMsQ0FBM0IsRUFBOEI7RUFDNUIsVUFBSTZCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsSUFBZ0IsS0FBS2tzQixJQUFyQixJQUE2QnRoQixRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLElBQWdCLEtBQUsrckIsSUFBdEQsRUFBNEQsT0FBTyxJQUFQO0VBQzdELEtBRkQsTUFFTztFQUNMLFVBQUluaEIsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxJQUFnQixLQUFLa3NCLElBQXJCLElBQTZCdmhCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsSUFBZ0IsS0FBS2dzQixJQUF0RCxFQUE0RCxPQUFPLElBQVA7RUFDN0Q7O0VBRUQsV0FBTyxLQUFQO0VBQ0Q7O1dBRURJLFlBQUEscUJBQVk7RUFDVixXQUFPanZCLElBQUksQ0FBQ3FTLElBQUwsQ0FBVSxLQUFLMkIsRUFBTCxHQUFVLEtBQUtBLEVBQWYsR0FBb0IsS0FBS0MsRUFBTCxHQUFVLEtBQUtBLEVBQTdDLENBQVA7RUFDRDs7V0FFRGdGLFdBQUEsa0JBQVN6TCxRQUFULEVBQW1CO0VBQ2pCLFFBQUksS0FBS3NMLFNBQUwsS0FBbUIsTUFBdkIsRUFBK0I7RUFDN0IsVUFBSSxLQUFLNFYsU0FBTCxLQUFtQixHQUFuQixJQUEwQixLQUFLQSxTQUFMLEtBQW1CLEdBQTdDLElBQW9ELEtBQUtBLFNBQUwsS0FBbUIsT0FBdkUsSUFBa0YsS0FBS0EsU0FBTCxLQUFtQixNQUF6RyxFQUFpSDtFQUMvRyxZQUFJLENBQUMsS0FBS2dCLFFBQUwsQ0FBY2xpQixRQUFkLENBQUwsRUFBOEI7RUFDOUIsWUFBSSxLQUFLaUgsWUFBTCxDQUFrQmpILFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQTdCLEVBQWdDNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBM0MsQ0FBSixFQUFtRDJLLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEI7RUFDcEQsT0FIRCxNQUdPO0VBQ0wsWUFBSSxDQUFDLEtBQUs4YSxRQUFMLENBQWNsaUIsUUFBZCxDQUFMLEVBQThCO0VBQzlCLFlBQUksQ0FBQyxLQUFLaUgsWUFBTCxDQUFrQmpILFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQTdCLEVBQWdDNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBM0MsQ0FBTCxFQUFvRDJLLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEI7RUFDckQ7RUFDRixLQVJELE1BUU8sSUFBSSxLQUFLa0UsU0FBTCxLQUFtQixPQUF2QixFQUFnQztFQUNyQyxVQUFJLENBQUMsS0FBSzRXLFFBQUwsQ0FBY2xpQixRQUFkLENBQUwsRUFBOEI7O0VBRTlCLFVBQUksS0FBSzRoQixXQUFMLENBQWlCNWhCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQTVCLEVBQStCNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBMUMsS0FBZ0QySyxRQUFRLENBQUN1SCxNQUE3RCxFQUFxRTtFQUNuRSxZQUFJLEtBQUtmLEVBQUwsS0FBWSxDQUFoQixFQUFtQjtFQUNqQnhHLFVBQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxJQUFnQixDQUFDLENBQWpCO0VBQ0QsU0FGRCxNQUVPLElBQUksS0FBS3FSLEVBQUwsS0FBWSxDQUFoQixFQUFtQjtFQUN4QnpHLFVBQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxJQUFnQixDQUFDLENBQWpCO0VBQ0QsU0FGTSxNQUVBO0VBQ0wsZUFBS3dzQixZQUFMLENBQWtCN2hCLFFBQVEsQ0FBQ0ksQ0FBM0I7RUFDRDtFQUNGO0VBQ0YsS0FaTSxNQVlBLElBQUksS0FBS2tMLFNBQUwsS0FBbUIsT0FBdkIsRUFBZ0M7RUFDckMsVUFBSSxLQUFLQyxLQUFULEVBQWdCO0VBQ2RJLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGdEQUFkO0VBQ0EsYUFBS0wsS0FBTCxHQUFhLEtBQWI7RUFDRDtFQUNGO0VBQ0Y7OztJQXhIbUNIOztNQ0RqQitXOzs7RUFDbkIsc0JBQVkvc0IsQ0FBWixFQUFlQyxDQUFmLEVBQWtCa1MsTUFBbEIsRUFBMEI7RUFBQTs7RUFDeEI7RUFFQSxVQUFLblMsQ0FBTCxHQUFTQSxDQUFUO0VBQ0EsVUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0VBQ0EsVUFBS2tTLE1BQUwsR0FBY0EsTUFBZDtFQUNBLFVBQUtvSSxLQUFMLEdBQWEsQ0FBYjtFQUNBLFVBQUs1USxNQUFMLEdBQWM7RUFBRTNKLE1BQUFBLENBQUMsRUFBREEsQ0FBRjtFQUFLQyxNQUFBQSxDQUFDLEVBQURBO0VBQUwsS0FBZDtFQVB3QjtFQVF6Qjs7OztXQUVEbVcsY0FBQSx1QkFBYztFQUNaLFNBQUttRSxLQUFMLEdBQWFyUixRQUFRLENBQUNDLElBQVQsR0FBZ0IvTCxJQUFJLENBQUMrRixNQUFMLEVBQTdCO0VBQ0EsU0FBSzZwQixZQUFMLEdBQW9CNXZCLElBQUksQ0FBQytGLE1BQUwsS0FBZ0IsS0FBS2dQLE1BQXpDO0VBQ0EsU0FBSzhELE1BQUwsQ0FBWWpXLENBQVosR0FBZ0IsS0FBS0EsQ0FBTCxHQUFTLEtBQUtndEIsWUFBTCxHQUFvQjV2QixJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLa2QsS0FBZCxDQUE3QztFQUNBLFNBQUt0RSxNQUFMLENBQVloVyxDQUFaLEdBQWdCLEtBQUtBLENBQUwsR0FBUyxLQUFLK3NCLFlBQUwsR0FBb0I1dkIsSUFBSSxDQUFDRyxHQUFMLENBQVMsS0FBS2dkLEtBQWQsQ0FBN0M7RUFFQSxXQUFPLEtBQUt0RSxNQUFaO0VBQ0Q7O1dBRURnWCxZQUFBLG1CQUFVanRCLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtFQUNkLFNBQUswSixNQUFMLENBQVkzSixDQUFaLEdBQWdCQSxDQUFoQjtFQUNBLFNBQUsySixNQUFMLENBQVkxSixDQUFaLEdBQWdCQSxDQUFoQjtFQUNEOztXQUVEb1csV0FBQSxrQkFBU3pMLFFBQVQsRUFBbUI7RUFDakIsUUFBTTRKLENBQUMsR0FBRzVKLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBVzJMLFVBQVgsQ0FBc0IsS0FBS3RILE1BQTNCLENBQVY7O0VBRUEsUUFBSSxLQUFLdU0sU0FBTCxLQUFtQixNQUF2QixFQUErQjtFQUM3QixVQUFJMUIsQ0FBQyxHQUFHNUosUUFBUSxDQUFDdUgsTUFBYixHQUFzQixLQUFLQSxNQUEvQixFQUF1Q3ZILFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEI7RUFDeEMsS0FGRCxNQUVPLElBQUksS0FBS2tFLFNBQUwsS0FBbUIsT0FBdkIsRUFBZ0M7RUFDckMsVUFBSTFCLENBQUMsR0FBRzVKLFFBQVEsQ0FBQ3VILE1BQWIsSUFBdUIsS0FBS0EsTUFBaEMsRUFBd0MsS0FBS3NhLFlBQUwsQ0FBa0I3aEIsUUFBbEI7RUFDekMsS0FGTSxNQUVBLElBQUksS0FBS3NMLFNBQUwsS0FBbUIsT0FBdkIsRUFBZ0M7RUFDckMsVUFBSSxLQUFLQyxLQUFULEVBQWdCO0VBQ2RJLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGtEQUFkO0VBQ0EsYUFBS0wsS0FBTCxHQUFhLEtBQWI7RUFDRDtFQUNGO0VBQ0Y7O1dBRURzVyxlQUFBLHNCQUFhN2hCLFFBQWIsRUFBdUI7RUFDckIsUUFBTThoQixJQUFJLEdBQUc5aEIsUUFBUSxDQUFDSSxDQUFULENBQVdxRixXQUFYLEVBQWI7RUFDQSxRQUFNc2MsSUFBSSxHQUFHLEtBQUt0YyxXQUFMLENBQWlCekYsUUFBakIsQ0FBYjtFQUVBLFFBQU11RyxHQUFHLEdBQUcsS0FBS3diLElBQUksR0FBR0QsSUFBWixDQUFaO0VBQ0EsUUFBTUUsSUFBSSxHQUFHaGlCLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBeEI7RUFDQSxRQUFNNnNCLElBQUksR0FBR2ppQixRQUFRLENBQUNJLENBQVQsQ0FBVy9LLENBQXhCO0VBRUEySyxJQUFBQSxRQUFRLENBQUNJLENBQVQsQ0FBV2hMLENBQVgsR0FBZTRzQixJQUFJLEdBQUd4dkIsSUFBSSxDQUFDQyxHQUFMLENBQVM4VCxHQUFULENBQVAsR0FBdUIwYixJQUFJLEdBQUd6dkIsSUFBSSxDQUFDRyxHQUFMLENBQVM0VCxHQUFULENBQTdDO0VBQ0F2RyxJQUFBQSxRQUFRLENBQUNJLENBQVQsQ0FBVy9LLENBQVgsR0FBZTJzQixJQUFJLEdBQUd4dkIsSUFBSSxDQUFDRyxHQUFMLENBQVM0VCxHQUFULENBQVAsR0FBdUIwYixJQUFJLEdBQUd6dkIsSUFBSSxDQUFDQyxHQUFMLENBQVM4VCxHQUFULENBQTdDO0VBQ0Q7O1dBRURkLGNBQUEscUJBQVl6RixRQUFaLEVBQXNCO0VBQ3BCLFdBQU8sQ0FBQzFCLFFBQVEsQ0FBQ0UsSUFBVixHQUFpQmhNLElBQUksQ0FBQ2tULEtBQUwsQ0FBVzFGLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZSxLQUFLMEosTUFBTCxDQUFZMUosQ0FBdEMsRUFBeUMySyxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWUsS0FBSzJKLE1BQUwsQ0FBWTNKLENBQXBFLENBQXhCO0VBQ0Q7OztJQXREcUNnVzs7TUNEbkJrWDs7O0VBQ25CLG9CQUFZbHRCLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsS0FBbEIsRUFBeUJDLE1BQXpCLEVBQWlDO0VBQUE7O0VBQy9CO0VBRUEsVUFBS2EsQ0FBTCxHQUFTQSxDQUFUO0VBQ0EsVUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0VBQ0EsVUFBS2YsS0FBTCxHQUFhQSxLQUFiO0VBQ0EsVUFBS0MsTUFBTCxHQUFjQSxNQUFkO0VBTitCO0VBT2hDOzs7O1dBRURpWCxjQUFBLHVCQUFjO0VBQ1osU0FBS0gsTUFBTCxDQUFZalcsQ0FBWixHQUFnQixLQUFLQSxDQUFMLEdBQVM1QyxJQUFJLENBQUMrRixNQUFMLEtBQWdCLEtBQUtqRSxLQUE5QztFQUNBLFNBQUsrVyxNQUFMLENBQVloVyxDQUFaLEdBQWdCLEtBQUtBLENBQUwsR0FBUzdDLElBQUksQ0FBQytGLE1BQUwsS0FBZ0IsS0FBS2hFLE1BQTlDO0VBRUEsV0FBTyxLQUFLOFcsTUFBWjtFQUNEOztXQUVESSxXQUFBLGtCQUFTekwsUUFBVCxFQUFtQjtFQUNqQjtFQUNBLFFBQUksS0FBS3NMLFNBQUwsS0FBbUIsTUFBdkIsRUFBK0I7RUFDN0IsVUFBSXRMLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZTRLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLEtBQUtuUyxDQUExQyxFQUE2QzRLLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEIsQ0FBN0MsS0FDSyxJQUFJcEgsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlNEssUUFBUSxDQUFDdUgsTUFBeEIsR0FBaUMsS0FBS25TLENBQUwsR0FBUyxLQUFLZCxLQUFuRCxFQUEwRDBMLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEI7RUFFL0QsVUFBSXBILFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZTJLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLEtBQUtsUyxDQUExQyxFQUE2QzJLLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEIsQ0FBN0MsS0FDSyxJQUFJcEgsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlMkssUUFBUSxDQUFDdUgsTUFBeEIsR0FBaUMsS0FBS2xTLENBQUwsR0FBUyxLQUFLZCxNQUFuRCxFQUEyRHlMLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEI7RUFDakUsS0FORDtFQUFBLFNBU0ssSUFBSSxLQUFLa0UsU0FBTCxLQUFtQixPQUF2QixFQUFnQztFQUNuQyxVQUFJdEwsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlNEssUUFBUSxDQUFDdUgsTUFBeEIsR0FBaUMsS0FBS25TLENBQTFDLEVBQTZDO0VBQzNDNEssUUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlLEtBQUtBLENBQUwsR0FBUzRLLFFBQVEsQ0FBQ3VILE1BQWpDO0VBQ0F2SCxRQUFBQSxRQUFRLENBQUNJLENBQVQsQ0FBV2hMLENBQVgsSUFBZ0IsQ0FBQyxDQUFqQjtFQUNELE9BSEQsTUFHTyxJQUFJNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlNEssUUFBUSxDQUFDdUgsTUFBeEIsR0FBaUMsS0FBS25TLENBQUwsR0FBUyxLQUFLZCxLQUFuRCxFQUEwRDtFQUMvRDBMLFFBQUFBLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZSxLQUFLQSxDQUFMLEdBQVMsS0FBS2QsS0FBZCxHQUFzQjBMLFFBQVEsQ0FBQ3VILE1BQTlDO0VBQ0F2SCxRQUFBQSxRQUFRLENBQUNJLENBQVQsQ0FBV2hMLENBQVgsSUFBZ0IsQ0FBQyxDQUFqQjtFQUNEOztFQUVELFVBQUk0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUySyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxLQUFLbFMsQ0FBMUMsRUFBNkM7RUFDM0MySyxRQUFBQSxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUsS0FBS0EsQ0FBTCxHQUFTMkssUUFBUSxDQUFDdUgsTUFBakM7RUFDQXZILFFBQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxJQUFnQixDQUFDLENBQWpCO0VBQ0QsT0FIRCxNQUdPLElBQUkySyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUySyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxLQUFLbFMsQ0FBTCxHQUFTLEtBQUtkLE1BQW5ELEVBQTJEO0VBQ2hFeUwsUUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlLEtBQUtBLENBQUwsR0FBUyxLQUFLZCxNQUFkLEdBQXVCeUwsUUFBUSxDQUFDdUgsTUFBL0M7RUFDQXZILFFBQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxJQUFnQixDQUFDLENBQWpCO0VBQ0Q7RUFDRixLQWhCSTtFQUFBLFNBbUJBLElBQUksS0FBS2lXLFNBQUwsS0FBbUIsT0FBdkIsRUFBZ0M7RUFDbkMsVUFBSXRMLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZTRLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLEtBQUtuUyxDQUF0QyxJQUEyQzRLLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxJQUFnQixDQUEvRCxFQUFrRTtFQUNoRTRLLFFBQUFBLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZSxLQUFLQSxDQUFMLEdBQVMsS0FBS2QsS0FBZCxHQUFzQjBMLFFBQVEsQ0FBQ3VILE1BQTlDO0VBQ0QsT0FGRCxNQUVPLElBQUl2SCxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWU0SyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxLQUFLblMsQ0FBTCxHQUFTLEtBQUtkLEtBQS9DLElBQXdEMEwsUUFBUSxDQUFDSSxDQUFULENBQVdoTCxDQUFYLElBQWdCLENBQTVFLEVBQStFO0VBQ3BGNEssUUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlLEtBQUtBLENBQUwsR0FBUzRLLFFBQVEsQ0FBQ3VILE1BQWpDO0VBQ0Q7O0VBRUQsVUFBSXZILFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZTJLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLEtBQUtsUyxDQUF0QyxJQUEyQzJLLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxJQUFnQixDQUEvRCxFQUFrRTtFQUNoRTJLLFFBQUFBLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZSxLQUFLQSxDQUFMLEdBQVMsS0FBS2QsTUFBZCxHQUF1QnlMLFFBQVEsQ0FBQ3VILE1BQS9DO0VBQ0QsT0FGRCxNQUVPLElBQUl2SCxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUySyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxLQUFLbFMsQ0FBTCxHQUFTLEtBQUtkLE1BQS9DLElBQXlEeUwsUUFBUSxDQUFDSSxDQUFULENBQVcvSyxDQUFYLElBQWdCLENBQTdFLEVBQWdGO0VBQ3JGMkssUUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlLEtBQUtBLENBQUwsR0FBUzJLLFFBQVEsQ0FBQ3VILE1BQWpDO0VBQ0Q7RUFDRjtFQUNGOzs7SUE1RG1DNkQ7O01DQ2pCbVg7OztFQUNuQixxQkFBWWxLLFNBQVosRUFBdUJqakIsQ0FBdkIsRUFBMEJDLENBQTFCLEVBQTZCdVUsQ0FBN0IsRUFBZ0M7RUFBQTs7RUFDOUI7O0VBQ0EsVUFBS3pHLEtBQUwsQ0FBV2tWLFNBQVgsRUFBc0JqakIsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCdVUsQ0FBNUI7O0VBRjhCO0VBRy9COzs7O1dBRUR6RyxRQUFBLGVBQU1rVixTQUFOLEVBQWlCampCLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QnVVLENBQXZCLEVBQTBCO0VBQ3hCLFNBQUt5TyxTQUFMLEdBQWlCQSxTQUFqQjtFQUNBLFNBQUtqakIsQ0FBTCxHQUFTOEYsSUFBSSxDQUFDekQsU0FBTCxDQUFlckMsQ0FBZixFQUFrQixDQUFsQixDQUFUO0VBQ0EsU0FBS0MsQ0FBTCxHQUFTNkYsSUFBSSxDQUFDekQsU0FBTCxDQUFlcEMsQ0FBZixFQUFrQixDQUFsQixDQUFUO0VBQ0EsU0FBS3VVLENBQUwsR0FBUzFPLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW1TLENBQWYsRUFBa0IsQ0FBbEIsQ0FBVDtFQUVBLFNBQUs0WSxPQUFMLEdBQWUsRUFBZjtFQUNBLFNBQUtDLFVBQUw7RUFDRDs7V0FFREEsYUFBQSxzQkFBYTtFQUNYLFFBQUl4d0IsQ0FBSixFQUFPeXdCLENBQVA7RUFDQSxRQUFNQyxPQUFPLEdBQUcsS0FBS3RLLFNBQUwsQ0FBZS9qQixLQUEvQjtFQUNBLFFBQU1zdUIsT0FBTyxHQUFHLEtBQUt2SyxTQUFMLENBQWU5akIsTUFBL0I7O0VBRUEsU0FBS3RDLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRzB3QixPQUFoQixFQUF5QjF3QixDQUFDLElBQUksS0FBSzJYLENBQW5DLEVBQXNDO0VBQ3BDLFdBQUs4WSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdFLE9BQWhCLEVBQXlCRixDQUFDLElBQUksS0FBSzlZLENBQW5DLEVBQXNDO0VBQ3BDLFlBQUlySSxLQUFLLEdBQUcsQ0FBQyxDQUFDbWhCLENBQUMsSUFBSSxDQUFOLElBQVdDLE9BQVgsSUFBc0Ixd0IsQ0FBQyxJQUFJLENBQTNCLENBQUQsSUFBa0MsQ0FBOUM7O0VBRUEsWUFBSSxLQUFLb21CLFNBQUwsQ0FBZXZSLElBQWYsQ0FBb0J2RixLQUFLLEdBQUcsQ0FBNUIsSUFBaUMsQ0FBckMsRUFBd0M7RUFDdEMsZUFBS2loQixPQUFMLENBQWF4bkIsSUFBYixDQUFrQjtFQUFFNUYsWUFBQUEsQ0FBQyxFQUFFbkQsQ0FBQyxHQUFHLEtBQUttRCxDQUFkO0VBQWlCQyxZQUFBQSxDQUFDLEVBQUVxdEIsQ0FBQyxHQUFHLEtBQUtydEI7RUFBN0IsV0FBbEI7RUFDRDtFQUNGO0VBQ0Y7O0VBRUQsV0FBTyxLQUFLZ1csTUFBWjtFQUNEOztXQUVEd1gsV0FBQSxrQkFBU3p0QixDQUFULEVBQVlDLENBQVosRUFBZTtFQUNiLFFBQU1rTSxLQUFLLEdBQUcsQ0FBQyxDQUFDbE0sQ0FBQyxJQUFJLENBQU4sSUFBVyxLQUFLZ2pCLFNBQUwsQ0FBZS9qQixLQUExQixJQUFtQ2MsQ0FBQyxJQUFJLENBQXhDLENBQUQsSUFBK0MsQ0FBN0Q7RUFDQSxRQUFJLEtBQUtpakIsU0FBTCxDQUFldlIsSUFBZixDQUFvQnZGLEtBQUssR0FBRyxDQUE1QixJQUFpQyxDQUFyQyxFQUF3QyxPQUFPLElBQVAsQ0FBeEMsS0FDSyxPQUFPLEtBQVA7RUFDTjs7V0FFRGlLLGNBQUEsdUJBQWM7RUFDWixRQUFNSCxNQUFNLEdBQUduUSxJQUFJLENBQUM3QyxnQkFBTCxDQUFzQixLQUFLbXFCLE9BQTNCLENBQWY7RUFDQSxXQUFPLEtBQUtuWCxNQUFMLENBQVlsTCxJQUFaLENBQWlCa0wsTUFBakIsQ0FBUDtFQUNEOztXQUVEeVgsV0FBQSxrQkFBUzF0QixDQUFULEVBQVlDLENBQVosRUFBZTtFQUNiRCxJQUFBQSxDQUFDLElBQUksS0FBS0EsQ0FBVjtFQUNBQyxJQUFBQSxDQUFDLElBQUksS0FBS0EsQ0FBVjtFQUNBLFFBQU1wRCxDQUFDLEdBQUcsQ0FBQyxDQUFDb0QsQ0FBQyxJQUFJLENBQU4sSUFBVyxLQUFLZ2pCLFNBQUwsQ0FBZS9qQixLQUExQixJQUFtQ2MsQ0FBQyxJQUFJLENBQXhDLENBQUQsSUFBK0MsQ0FBekQ7RUFFQSxXQUFPO0VBQ0w2TixNQUFBQSxDQUFDLEVBQUUsS0FBS29WLFNBQUwsQ0FBZXZSLElBQWYsQ0FBb0I3VSxDQUFwQixDQURFO0VBRUxpUixNQUFBQSxDQUFDLEVBQUUsS0FBS21WLFNBQUwsQ0FBZXZSLElBQWYsQ0FBb0I3VSxDQUFDLEdBQUcsQ0FBeEIsQ0FGRTtFQUdMZ0IsTUFBQUEsQ0FBQyxFQUFFLEtBQUtvbEIsU0FBTCxDQUFldlIsSUFBZixDQUFvQjdVLENBQUMsR0FBRyxDQUF4QixDQUhFO0VBSUxlLE1BQUFBLENBQUMsRUFBRSxLQUFLcWxCLFNBQUwsQ0FBZXZSLElBQWYsQ0FBb0I3VSxDQUFDLEdBQUcsQ0FBeEI7RUFKRSxLQUFQO0VBTUQ7O1dBRUR3WixXQUFBLGtCQUFTekwsUUFBVCxFQUFtQjtFQUNqQixRQUFJLEtBQUtzTCxTQUFMLEtBQW1CLE1BQXZCLEVBQStCO0VBQzdCLFVBQUksS0FBS3VYLFFBQUwsQ0FBYzdpQixRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWUsS0FBS0EsQ0FBbEMsRUFBcUM0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUsS0FBS0EsQ0FBekQsQ0FBSixFQUFpRTJLLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEIsQ0FBakUsS0FDS3BILFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsS0FBaEI7RUFDTixLQUhELE1BR08sSUFBSSxLQUFLa0UsU0FBTCxLQUFtQixPQUF2QixFQUFnQztFQUNyQyxVQUFJLENBQUMsS0FBS3VYLFFBQUwsQ0FBYzdpQixRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWUsS0FBS0EsQ0FBbEMsRUFBcUM0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUsS0FBS0EsQ0FBekQsQ0FBTCxFQUFrRTJLLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXNkYsTUFBWDtFQUNuRTtFQUNGOztXQUVENU0sVUFBQSxtQkFBVTtFQUNSLG9CQUFNQSxPQUFOOztFQUNBLFNBQUtnZixTQUFMLEdBQWlCLElBQWpCO0VBQ0Q7OztJQXRFb0NqTjs7QUNHdkMsY0FBZTtFQUNick8sRUFBQUEsZ0JBRGEsNEJBQ0l4QixNQURKLEVBQ1l3bkIsSUFEWixFQUNrQjtFQUM3QnhuQixJQUFBQSxNQUFNLENBQUN3QixnQkFBUCxDQUF3QixxQkFBeEIsRUFBK0M7RUFBQSxhQUFNZ21CLElBQUksRUFBVjtFQUFBLEtBQS9DO0VBQ0QsR0FIWTtFQUtiQyxFQUFBQSxRQUxhLG9CQUtKL2xCLEtBTEksRUFLZTtFQUFBLFFBQW5CQSxLQUFtQjtFQUFuQkEsTUFBQUEsS0FBbUIsR0FBWCxTQUFXO0VBQUE7O0VBQzFCLFFBQU04SixHQUFHLEdBQUd3SSxTQUFTLENBQUNuSCxRQUFWLENBQW1CbkwsS0FBbkIsQ0FBWjtFQUNBLHFCQUFlOEosR0FBRyxDQUFDOUQsQ0FBbkIsVUFBeUI4RCxHQUFHLENBQUM3RCxDQUE3QixVQUFtQzZELEdBQUcsQ0FBQzlULENBQXZDO0VBQ0QsR0FSWTtFQVViZ3dCLEVBQUFBLFFBVmEsb0JBVUoxbkIsTUFWSSxFQVVJakUsTUFWSixFQVVZd1UsSUFWWixFQVVrQnZMLEtBVmxCLEVBVXlCO0VBQ3BDLFFBQU1sSyxPQUFPLEdBQUdpQixNQUFNLENBQUNFLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBaEI7RUFDQSxRQUFNNUMsS0FBSyxHQUFHLEtBQUtvdUIsUUFBTCxFQUFkO0VBRUEsU0FBS2ptQixnQkFBTCxDQUFzQnhCLE1BQXRCLEVBQThCLFlBQU07RUFDbEMsVUFBSWdGLEtBQUosRUFBV2xLLE9BQU8sQ0FBQ0ssU0FBUixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QlksTUFBTSxDQUFDaEQsS0FBL0IsRUFBc0NnRCxNQUFNLENBQUMvQyxNQUE3Qzs7RUFFWCxVQUFJdVgsSUFBSSxZQUFZSixTQUFwQixFQUErQjtFQUM3QnJWLFFBQUFBLE9BQU8sQ0FBQytmLFNBQVI7RUFDQS9mLFFBQUFBLE9BQU8sQ0FBQzBmLFNBQVIsR0FBb0JuaEIsS0FBcEI7RUFDQXlCLFFBQUFBLE9BQU8sQ0FBQ2dnQixHQUFSLENBQVl2SyxJQUFJLENBQUMxVyxDQUFqQixFQUFvQjBXLElBQUksQ0FBQ3pXLENBQXpCLEVBQTRCLEVBQTVCLEVBQWdDLENBQWhDLEVBQW1DN0MsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQTdDLEVBQWdELElBQWhEO0VBQ0E5SCxRQUFBQSxPQUFPLENBQUNvZ0IsSUFBUjtFQUNBcGdCLFFBQUFBLE9BQU8sQ0FBQ21nQixTQUFSO0VBQ0QsT0FORCxNQU1PLElBQUkxSyxJQUFJLFlBQVkrVSxRQUFwQixFQUE4QjtFQUNuQ3hxQixRQUFBQSxPQUFPLENBQUMrZixTQUFSO0VBQ0EvZixRQUFBQSxPQUFPLENBQUNpZ0IsV0FBUixHQUFzQjFoQixLQUF0QjtFQUNBeUIsUUFBQUEsT0FBTyxDQUFDNnNCLE1BQVIsQ0FBZXBYLElBQUksQ0FBQ2dWLEVBQXBCLEVBQXdCaFYsSUFBSSxDQUFDaVYsRUFBN0I7RUFDQTFxQixRQUFBQSxPQUFPLENBQUM4c0IsTUFBUixDQUFlclgsSUFBSSxDQUFDa1YsRUFBcEIsRUFBd0JsVixJQUFJLENBQUNtVixFQUE3QjtFQUNBNXFCLFFBQUFBLE9BQU8sQ0FBQzZkLE1BQVI7RUFDQTdkLFFBQUFBLE9BQU8sQ0FBQ21nQixTQUFSO0VBQ0QsT0FQTSxNQU9BLElBQUkxSyxJQUFJLFlBQVl3VyxRQUFwQixFQUE4QjtFQUNuQ2pzQixRQUFBQSxPQUFPLENBQUMrZixTQUFSO0VBQ0EvZixRQUFBQSxPQUFPLENBQUNpZ0IsV0FBUixHQUFzQjFoQixLQUF0QjtFQUNBeUIsUUFBQUEsT0FBTyxDQUFDK3NCLFFBQVIsQ0FBaUJ0WCxJQUFJLENBQUMxVyxDQUF0QixFQUF5QjBXLElBQUksQ0FBQ3pXLENBQTlCLEVBQWlDeVcsSUFBSSxDQUFDeFgsS0FBdEMsRUFBNkN3WCxJQUFJLENBQUN2WCxNQUFsRDtFQUNBOEIsUUFBQUEsT0FBTyxDQUFDNmQsTUFBUjtFQUNBN2QsUUFBQUEsT0FBTyxDQUFDbWdCLFNBQVI7RUFDRCxPQU5NLE1BTUEsSUFBSTFLLElBQUksWUFBWXFXLFVBQXBCLEVBQWdDO0VBQ3JDOXJCLFFBQUFBLE9BQU8sQ0FBQytmLFNBQVI7RUFDQS9mLFFBQUFBLE9BQU8sQ0FBQ2lnQixXQUFSLEdBQXNCMWhCLEtBQXRCO0VBQ0F5QixRQUFBQSxPQUFPLENBQUNnZ0IsR0FBUixDQUFZdkssSUFBSSxDQUFDMVcsQ0FBakIsRUFBb0IwVyxJQUFJLENBQUN6VyxDQUF6QixFQUE0QnlXLElBQUksQ0FBQ3ZFLE1BQWpDLEVBQXlDLENBQXpDLEVBQTRDL1UsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQXRELEVBQXlELElBQXpEO0VBQ0E5SCxRQUFBQSxPQUFPLENBQUM2ZCxNQUFSO0VBQ0E3ZCxRQUFBQSxPQUFPLENBQUNtZ0IsU0FBUjtFQUNEO0VBQ0YsS0E3QkQ7RUE4QkQsR0E1Q1k7RUE4Q2I2TSxFQUFBQSxXQTlDYSx1QkE4Q0Q5bkIsTUE5Q0MsRUE4Q09qRSxNQTlDUCxFQThDZXdFLE9BOUNmLEVBOEN3QnlFLEtBOUN4QixFQThDK0I7RUFDMUMsUUFBTWxLLE9BQU8sR0FBR2lCLE1BQU0sQ0FBQ0UsVUFBUCxDQUFrQixJQUFsQixDQUFoQjtFQUNBLFFBQU01QyxLQUFLLEdBQUcsS0FBS291QixRQUFMLEVBQWQ7RUFFQSxTQUFLam1CLGdCQUFMLENBQXNCeEIsTUFBdEIsRUFBOEIsWUFBTTtFQUNsQyxVQUFJZ0YsS0FBSixFQUFXbEssT0FBTyxDQUFDSyxTQUFSLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCWSxNQUFNLENBQUNoRCxLQUEvQixFQUFzQ2dELE1BQU0sQ0FBQy9DLE1BQTdDO0VBRVg4QixNQUFBQSxPQUFPLENBQUMrZixTQUFSO0VBQ0EvZixNQUFBQSxPQUFPLENBQUMwZixTQUFSLEdBQW9CbmhCLEtBQXBCO0VBQ0F5QixNQUFBQSxPQUFPLENBQUNnZ0IsR0FBUixDQUFZdmEsT0FBTyxDQUFDcEIsQ0FBUixDQUFVdEYsQ0FBdEIsRUFBeUIwRyxPQUFPLENBQUNwQixDQUFSLENBQVVyRixDQUFuQyxFQUFzQyxFQUF0QyxFQUEwQyxDQUExQyxFQUE2QzdDLElBQUksQ0FBQzJMLEVBQUwsR0FBVSxDQUF2RCxFQUEwRCxJQUExRDtFQUNBOUgsTUFBQUEsT0FBTyxDQUFDb2dCLElBQVI7RUFDQXBnQixNQUFBQSxPQUFPLENBQUNtZ0IsU0FBUjtFQUNELEtBUkQ7RUFTRDtFQTNEWSxDQUFmOztFQ3VEQWhXLE1BQU0sQ0FBQ3FHLFFBQVAsR0FBa0JBLFFBQWxCO0VBQ0FyRyxNQUFNLENBQUNwRyxJQUFQLEdBQWNBLElBQWQ7RUFFQW9HLE1BQU0sQ0FBQ3RGLElBQVAsR0FBY0EsSUFBZDtFQUNBc0YsTUFBTSxDQUFDK08sU0FBUCxHQUFtQkEsU0FBbkI7RUFDQS9PLE1BQU0sQ0FBQ2xDLFFBQVAsR0FBa0JBLFFBQWxCO0VBQ0FrQyxNQUFNLENBQUM2RSxRQUFQLEdBQWtCN0UsTUFBTSxDQUFDOGlCLE1BQVAsR0FBZ0JqZSxRQUFsQztFQUNBN0UsTUFBTSxDQUFDcUksT0FBUCxHQUFpQnJJLE1BQU0sQ0FBQytpQixLQUFQLEdBQWUxYSxPQUFoQztFQUNBckksTUFBTSxDQUFDMkosU0FBUCxHQUFtQkEsU0FBbkI7RUFDQTNKLE1BQU0sQ0FBQzhKLFNBQVAsR0FBbUJBLFNBQW5CO0VBQ0E5SixNQUFNLENBQUNrSyxJQUFQLEdBQWNBLElBQWQ7RUFDQWxLLE1BQU0sQ0FBQzRFLElBQVAsR0FBY0EsSUFBZDtFQUNBNUUsTUFBTSxDQUFDZ0QsSUFBUCxHQUFjQSxNQUFkO0VBQ0FoRCxNQUFNLENBQUM0SSxJQUFQLEdBQWNBLElBQWQ7O0VBQ0E1SSxNQUFNLENBQUNnakIsT0FBUCxHQUFpQixVQUFDeHdCLENBQUQsRUFBSUMsQ0FBSixFQUFPOEwsTUFBUDtFQUFBLFNBQWtCLElBQUl5RSxNQUFKLENBQVN4USxDQUFULEVBQVlDLENBQVosRUFBZThMLE1BQWYsQ0FBbEI7RUFBQSxDQUFqQjs7RUFDQXlCLE1BQU0sQ0FBQzZKLGVBQVAsR0FBeUJGLFNBQVMsQ0FBQ0UsZUFBbkM7RUFFQTdKLE1BQU0sQ0FBQ3lLLFVBQVAsR0FBb0J6SyxNQUFNLENBQUNpakIsSUFBUCxHQUFjeFksVUFBbEM7RUFDQXpLLE1BQU0sQ0FBQzBLLElBQVAsR0FBYzFLLE1BQU0sQ0FBQ2tqQixDQUFQLEdBQVd4WSxJQUF6QjtFQUNBMUssTUFBTSxDQUFDcUwsUUFBUCxHQUFrQnJMLE1BQU0sQ0FBQ21qQixDQUFQLEdBQVc5WCxRQUE3QjtFQUNBckwsTUFBTSxDQUFDdUwsUUFBUCxHQUFrQnZMLE1BQU0sQ0FBQ29qQixDQUFQLEdBQVc3WCxRQUE3QjtFQUNBdkwsTUFBTSxDQUFDK0wsSUFBUCxHQUFjL0wsTUFBTSxDQUFDcWpCLENBQVAsR0FBV3RYLElBQXpCO0VBQ0EvTCxNQUFNLENBQUNpTSxNQUFQLEdBQWdCak0sTUFBTSxDQUFDc2pCLENBQVAsR0FBV3JYLE1BQTNCO0VBQ0FqTSxNQUFNLENBQUNtTSxJQUFQLEdBQWNuTSxNQUFNLENBQUM2YSxDQUFQLEdBQVcxTyxJQUF6QjtFQUVBbk0sTUFBTSxDQUFDc00sU0FBUCxHQUFtQkEsU0FBbkI7RUFDQXRNLE1BQU0sQ0FBQzBNLEtBQVAsR0FBZTFNLE1BQU0sQ0FBQ3VqQixDQUFQLEdBQVc3VyxLQUExQjtFQUNBMU0sTUFBTSxDQUFDNk0sVUFBUCxHQUFvQjdNLE1BQU0sQ0FBQzRhLENBQVAsR0FBVy9OLFVBQS9CO0VBQ0E3TSxNQUFNLENBQUNpTixXQUFQLEdBQXFCak4sTUFBTSxDQUFDd2pCLEVBQVAsR0FBWXZXLFdBQWpDO0VBQ0FqTixNQUFNLENBQUNzTixPQUFQLEdBQWlCdE4sTUFBTSxDQUFDeWpCLENBQVAsR0FBV25XLE9BQTVCO0VBQ0F0TixNQUFNLENBQUN1TixTQUFQLEdBQW1CQSxTQUFuQjtFQUNBdk4sTUFBTSxDQUFDaU8sU0FBUCxHQUFtQkEsU0FBbkI7RUFDQWpPLE1BQU0sQ0FBQ2tPLEtBQVAsR0FBZUEsS0FBZjtFQUNBbE8sTUFBTSxDQUFDc08sS0FBUCxHQUFldE8sTUFBTSxDQUFDMGpCLENBQVAsR0FBV3BWLEtBQTFCO0VBQ0F0TyxNQUFNLENBQUN5TyxNQUFQLEdBQWdCQSxNQUFoQjtFQUNBek8sTUFBTSxDQUFDNk8sS0FBUCxHQUFlQSxLQUFmO0VBQ0E3TyxNQUFNLENBQUMyUCxTQUFQLEdBQW1CQSxTQUFuQjtFQUNBM1AsTUFBTSxDQUFDa1AsT0FBUCxHQUFpQkEsT0FBakI7RUFDQWxQLE1BQU0sQ0FBQzRQLFdBQVAsR0FBcUJBLFdBQXJCO0VBRUE1UCxNQUFNLENBQUNrUSxPQUFQLEdBQWlCQSxPQUFqQjtFQUNBbFEsTUFBTSxDQUFDZ1MsZ0JBQVAsR0FBMEJBLGdCQUExQjtFQUNBaFMsTUFBTSxDQUFDb1MsYUFBUCxHQUF1QkEsYUFBdkI7RUFFQXBTLE1BQU0sQ0FBQzRLLElBQVAsR0FBY0EsSUFBZDtFQUNBNUssTUFBTSxDQUFDcWdCLFFBQVAsR0FBa0JBLFFBQWxCO0VBQ0FyZ0IsTUFBTSxDQUFDMmhCLFVBQVAsR0FBb0JBLFVBQXBCO0VBQ0EzaEIsTUFBTSxDQUFDa0wsU0FBUCxHQUFtQkEsU0FBbkI7RUFDQWxMLE1BQU0sQ0FBQzhoQixRQUFQLEdBQWtCQSxRQUFsQjtFQUNBOWhCLE1BQU0sQ0FBQytoQixTQUFQLEdBQW1CQSxTQUFuQjtFQUVBL2hCLE1BQU0sQ0FBQzZVLGNBQVAsR0FBd0JBLGNBQXhCO0VBQ0E3VSxNQUFNLENBQUNtVyxXQUFQLEdBQXFCQSxXQUFyQjtFQUNBblcsTUFBTSxDQUFDOFcsYUFBUCxHQUF1QkEsYUFBdkI7RUFDQTlXLE1BQU0sQ0FBQ21ZLFlBQVAsR0FBc0JBLFlBQXRCO0VBQ0FuWSxNQUFNLENBQUMyWCxhQUFQLEdBQXVCQSxhQUF2QjtFQUNBM1gsTUFBTSxDQUFDa1osYUFBUCxHQUF1QmxaLE1BQU0sQ0FBQzJqQixhQUFQLEdBQXVCekssYUFBOUM7RUFDQWxaLE1BQU0sQ0FBQ29nQixjQUFQLEdBQXdCQSxjQUF4QjtFQUVBcGdCLE1BQU0sQ0FBQzRqQixLQUFQLEdBQWVBLEtBQWY7RUFDQWxwQixJQUFJLENBQUM1QixNQUFMLENBQVlrSCxNQUFaLEVBQW9CNEUsSUFBcEI7Ozs7Ozs7OyJ9
