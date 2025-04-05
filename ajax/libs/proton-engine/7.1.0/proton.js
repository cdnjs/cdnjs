(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Proton = {}));
})(this, (function (exports) { 'use strict';

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
    sliceArray: function sliceArray(arr1, index, arr2) {
      this.emptyArray(arr2);
      for (var i = index; i < arr1.length; i++) {
        arr2.push(arr1[i]);
      }
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
     */;
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
     */;
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
     */;
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
     */;
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
     */;
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
          }

          // allows for faster checks.
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
        if (!arr) return result;

        // arr = arr.slice();
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
    }

    // Euler Integrate
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
     * @todo add more documentation of the single properties and parameters
     *
     * @param {Number | undefined} [integrationType=Proton.EULER]
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
     */;
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
     */;
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
     */;
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
     */;
    _proto.update = function update() {
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
     */;
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
     */;
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
     */;
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

  /**
   * Represents a span of values or an array.
   */
  var Span = /*#__PURE__*/function () {
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {number|number[]}
     * @private
     */

    /**
     * @type {number}
     * @private
     */

    /**
     * @type {boolean}
     * @private
     */

    /**
     * Creates a new Span instance.
     * @param {number|number[]} a - The first value or an array of values.
     * @param {number} [b] - The second value (if a is not an array).
     * @param {boolean} [center=false] - Whether to use center-based calculation.
     */
    function Span(a, b, center) {
      this.isArray = void 0;
      this.a = void 0;
      this.b = void 0;
      this.center = void 0;
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

    /**
     * Gets a value from the span.
     * @param {boolean} [isInt=false] - Whether to return an integer value.
     * @returns {number} A random value from the span.
     */
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
     * Returns a new Span object.
     * @param {*|Span} a - The first value or a Span object.
     * @param {*} [b] - The second value.
     * @param {*} [c] - The third value.
     * @returns {Span} A new Span instance.
     */;
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
     * Returns the value from a Span, if the param is not a Span it will return the given parameter.
     * @param {*|Span} pan - The value or Span to get the value from.
     * @returns {*} The value of Span OR the parameter if it is not a Span.
     */;
    Span.getSpanValue = function getSpanValue(pan) {
      return pan instanceof Span ? pan.getValue() : pan;
    };
    return Span;
  }();

  var PropUtil = {
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
    /** @type {number} */

    /** @type {number} */

    /**
     * Creates a new Vector2D instance.
     * @param {number} [x=0] - The x coordinate.
     * @param {number} [y=0] - The y coordinate.
     */
    function Vector2D(x, y) {
      this.x = void 0;
      this.y = void 0;
      this.x = x || 0;
      this.y = y || 0;
    }

    /**
     * Sets the x and y components of this vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {Vector2D} This vector.
     */
    var _proto = Vector2D.prototype;
    _proto.set = function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }

    /**
     * Sets the x component of this vector.
     * @param {number} x - The x coordinate.
     * @returns {Vector2D} This vector.
     */;
    _proto.setX = function setX(x) {
      this.x = x;
      return this;
    }

    /**
     * Sets the y component of this vector.
     * @param {number} y - The y coordinate.
     * @returns {Vector2D} This vector.
     */;
    _proto.setY = function setY(y) {
      this.y = y;
      return this;
    }

    /**
     * Calculates the gradient (angle) of this vector.
     * @returns {number} The gradient in radians.
     */;
    _proto.getGradient = function getGradient() {
      if (this.x !== 0) return Math.atan2(this.y, this.x);else if (this.y > 0) return MathUtil.PI_2;else if (this.y < 0) return -MathUtil.PI_2;
    }

    /**
     * Copies the values of another vector to this one.
     * @param {Vector2D} v - The vector to copy from.
     * @returns {Vector2D} This vector.
     */;
    _proto.copy = function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }

    /**
     * Adds another vector to this one.
     * @param {Vector2D} v - The vector to add.
     * @param {Vector2D} [w] - An optional second vector to add.
     * @returns {Vector2D} This vector.
     */;
    _proto.add = function add(v, w) {
      if (w !== undefined) {
        return this.addVectors(v, w);
      }
      this.x += v.x;
      this.y += v.y;
      return this;
    }

    /**
     * Adds scalar values to this vector's components.
     * @param {number} a - Value to add to x.
     * @param {number} b - Value to add to y.
     * @returns {Vector2D} This vector.
     */;
    _proto.addXY = function addXY(a, b) {
      this.x += a;
      this.y += b;
      return this;
    }

    /**
     * Adds two vectors and sets the result to this vector.
     * @param {Vector2D} a - The first vector to add.
     * @param {Vector2D} b - The second vector to add.
     * @returns {Vector2D} This vector.
     */;
    _proto.addVectors = function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
    }

    /**
     * Subtracts another vector from this one.
     * @param {Vector2D} v - The vector to subtract.
     * @param {Vector2D} [w] - An optional second vector to subtract.
     * @returns {Vector2D} This vector.
     */;
    _proto.sub = function sub(v, w) {
      if (w !== undefined) {
        return this.subVectors(v, w);
      }
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }

    /**
     * Subtracts one vector from another and sets the result to this vector.
     * @param {Vector2D} a - The vector to subtract from.
     * @param {Vector2D} b - The vector to subtract.
     * @returns {Vector2D} This vector.
     */;
    _proto.subVectors = function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} s - The scalar to divide by.
     * @returns {Vector2D} This vector.
     */;
    _proto.divideScalar = function divideScalar(s) {
      if (s !== 0) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }
      return this;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} s - The scalar to multiply by.
     * @returns {Vector2D} This vector.
     */;
    _proto.multiplyScalar = function multiplyScalar(s) {
      this.x *= s;
      this.y *= s;
      return this;
    }

    /**
     * Negates this vector (inverts its direction).
     * @returns {Vector2D} This vector.
     */;
    _proto.negate = function negate() {
      return this.multiplyScalar(-1);
    }

    /**
     * Calculates the dot product of this vector with another.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The dot product.
     */;
    _proto.dot = function dot(v) {
      return this.x * v.x + this.y * v.y;
    }

    /**
     * Calculates the squared length of this vector.
     * @returns {number} The squared length.
     */;
    _proto.lengthSq = function lengthSq() {
      return this.x * this.x + this.y * this.y;
    }

    /**
     * Calculates the length of this vector.
     * @returns {number} The length.
     */;
    _proto.length = function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalizes this vector (makes it unit length).
     * @returns {Vector2D} This vector.
     */;
    _proto.normalize = function normalize() {
      return this.divideScalar(this.length());
    }

    /**
     * Calculates the distance to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The distance.
     */;
    _proto.distanceTo = function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }

    /**
     * Rotates this vector by an angle.
     * @param {number} tha - The angle to rotate by (in radians).
     * @returns {Vector2D} This vector.
     */;
    _proto.rotate = function rotate(tha) {
      var x = this.x;
      var y = this.y;
      this.x = x * Math.cos(tha) + y * Math.sin(tha);
      this.y = -x * Math.sin(tha) + y * Math.cos(tha);
      return this;
    }

    /**
     * Calculates the squared distance to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The squared distance.
     */;
    _proto.distanceToSquared = function distanceToSquared(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      return dx * dx + dy * dy;
    }

    /**
     * Linearly interpolates this vector toward another vector.
     * @param {Vector2D} v - The target vector.
     * @param {number} alpha - The interpolation factor (0-1).
     * @returns {Vector2D} This vector.
     */;
    _proto.lerp = function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
    }

    /**
     * Checks if this vector is equal to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */;
    _proto.equals = function equals(v) {
      return v.x === this.x && v.y === this.y;
    }

    /**
     * Sets this vector to zero.
     * @returns {Vector2D} This vector.
     */;
    _proto.clear = function clear() {
      this.x = 0.0;
      this.y = 0.0;
      return this;
    }

    /**
     * Creates a new vector with the same x and y values as this one.
     * @returns {Vector2D} A new Vector2D instance.
     */;
    _proto.clone = function clone() {
      return new Vector2D(this.x, this.y);
    };
    return Vector2D;
  }();

  /**
   * Represents a particle in a particle system.
   * @class Particle
   */
  var Particle = /*#__PURE__*/function () {
    /** @type {string} The unique identifier of the particle */

    /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} Old state of the particle */

    /** @type {object} Custom data associated with the particle */

    /** @type {Behaviour[]} Array of behaviours applied to the particle */

    /** @type {Vector2D} Current position of the particle */

    /** @type {Vector2D} Current velocity of the particle */

    /** @type {Vector2D} Current acceleration of the particle */

    /** @type {Rgb} Color of the particle */

    /**
     * Creates a new Particle instance.
     * @param {Object} [conf] Configuration object for the particle
     */
    function Particle(conf) {
      this.id = "";
      this.old = null;
      this.data = null;
      this.behaviours = null;
      this.p = null;
      this.v = null;
      this.a = null;
      this.rgb = null;
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

    /**
     * Gets the direction of the particle's movement in degrees.
     * @returns {number} The direction in degrees
     */
    var _proto = Particle.prototype;
    _proto.getDirection = function getDirection() {
      return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
    }

    /**
     * Resets the particle to its initial state.
     * @returns {Particle} The particle instance
     */;
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
    }

    /**
     * Updates the particle's state.
     * @param {number} time The time elapsed since the last update
     * @param {number} index The index of the particle in its parent system
     */;
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
    }

    /**
     * Applies all behaviours attached to the particle.
     * @param {number} time The time elapsed since the last update
     * @param {number} index The index of the particle in its parent system
     */;
    _proto.applyBehaviours = function applyBehaviours(time, index) {
      var length = this.behaviours.length;
      var i;
      for (i = 0; i < length; i++) {
        this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
      }
    }

    /**
     * Adds a behaviour to the particle.
     * @param {Behaviour} behaviour The behaviour to add
     */;
    _proto.addBehaviour = function addBehaviour(behaviour) {
      this.behaviours.push(behaviour);
      if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
      behaviour.initialize(this);
    }

    /**
     * Adds multiple behaviours to the particle.
     * @param {Behaviour[]} behaviours An array of behaviours to add
     */;
    _proto.addBehaviours = function addBehaviours(behaviours) {
      var length = behaviours.length;
      var i;
      for (i = 0; i < length; i++) {
        this.addBehaviour(behaviours[i]);
      }
    }

    /**
     * Removes a specific behaviour from the particle.
     * @param {Behaviour} behaviour The behaviour to remove
     */;
    _proto.removeBehaviour = function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);
      if (index > -1) {
        var _behaviour = this.behaviours.splice(index, 1);
        _behaviour.parents = null;
      }
    }

    /**
     * Removes all behaviours from the particle.
     */;
    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }

    /**
     * Destroys the particle, removing all behaviours and setting it as dead.
     */;
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
     */;
    ArraySpan.createArraySpan = function createArraySpan(arr) {
      if (!arr) return null;
      if (arr instanceof ArraySpan) return arr;else return new ArraySpan(arr);
    };
    return ArraySpan;
  }(Span);

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

  /**
   * Rate class for controlling particle emission rate.
   */
  var Rate = /*#__PURE__*/function () {
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {number}
     * @private
     */

    /**
     * @type {number}
     * @private
     */

    /**
     * Creates a new Rate instance.
     * The number of particles per second emission (a [particle]/b [s]).
     * @param {Array|number|Span} [numpan=1] - The number of particles for each emission.
     * @param {Array|number|Span} [timepan=1] - The time interval between each emission.
     * @example
     * // Create a rate of 10-20 particles every 0.1-0.25 seconds
     * new Rate(new Span(10, 20), new Span(0.1, 0.25));
     */
    function Rate(numpan, timepan) {
      this.numPan = void 0;
      this.timePan = void 0;
      this.startTime = void 0;
      this.nextTime = void 0;
      this.numPan = Span.setSpanValue(Util.initValue(numpan, 1));
      this.timePan = Span.setSpanValue(Util.initValue(timepan, 1));
      this.startTime = 0;
      this.nextTime = 0;
      this.init();
    }

    /**
     * Initializes the rate.
     * @private
     */
    var _proto = Rate.prototype;
    _proto.init = function init() {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();
    }

    /**
     * Gets the number of particles to emit based on the elapsed time.
     * @param {number} time - The elapsed time since the last update.
     * @returns {number} The number of particles to emit.
     */;
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
    }

    // sub class init
    ;
    _proto.initialize = function initialize(target) {};
    return Initialize;
  }();

  /**
   * Life class for initializing particle lifetime.
   * @extends Initialize
   */
  var Life = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Life, _Initialize);
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Life instance.
     * @param {number|Span} a - The lifetime value or the lower bound of the lifetime range.
     * @param {number} [b] - The upper bound of the lifetime range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Life(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.lifePan = void 0;
      _this.name = void 0;
      _this.lifePan = Span.setSpanValue(a, b, c);
      _this.name = "Life";
      return _this;
    }

    /**
     * Initializes the lifetime of a target particle.
     * @param {object} target - The target particle to initialize.
     */
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

  /**
   * Represents a point zone in a 2D space.
   * @extends Zone
   */
  var PointZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(PointZone, _Zone);
    /**
     * Creates a new PointZone.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     */
    function PointZone(x, y) {
      var _this;
      _this = _Zone.call(this) || this;

      /**
       * The x-coordinate of the point.
       * @type {number}
       */
      _this.x = x;

      /**
       * The y-coordinate of the point.
       * @type {number}
       */
      _this.y = y;
      return _this;
    }

    /**
     * Gets the position of the point.
     * @returns {Object} An object representing the position vector.
     */
    var _proto = PointZone.prototype;
    _proto.getPosition = function getPosition() {
      this.vector.x = this.x;
      this.vector.y = this.y;
      return this.vector;
    }

    /**
     * This method is not supported for PointZone.
     * @param {Object} particle - The particle object (unused).
     */;
    _proto.crossing = function crossing(particle) {
      if (this.alert) {
        console.error("Sorry, PointZone does not support crossing method!");
        this.alert = false;
      }
    };
    return PointZone;
  }(Zone);

  /**
   * Position class for initializing particle positions.
   * @extends Initialize
   */
  var Position = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Position, _Initialize);
    /**
     * @type {PointZone|any}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Position instance.
     * @param {PointZone|any} [zone] - The zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    function Position(zone) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.zone = void 0;
      _this.name = void 0;
      _this.zone = Util.initValue(zone, new PointZone());
      _this.name = "Position";
      return _this;
    }

    /**
     * Resets this initializer's parameters.
     * @param {PointZone|any} [zone] - The new zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    var _proto = Position.prototype;
    _proto.reset = function reset(zone) {
      this.zone = Util.initValue(zone, new PointZone());
    }

    /**
     * Initializes the particle's position.
     * @param {object} target - The particle to initialize.
     * @param {object} target.p - The particle's position object.
     * @param {number} target.p.x - The particle's x coordinate.
     * @param {number} target.p.y - The particle's y coordinate.
     */;
    _proto.initialize = function initialize(target) {
      this.zone.getPosition();
      target.p.x = this.zone.vector.x;
      target.p.y = this.zone.vector.y;
    };
    return Position;
  }(Initialize);

  /**
   * Velocity class for initializing particle velocities.
   * @extends Initialize
   */
  var Velocity = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Velocity, _Initialize);
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Velocity instance.
     * @param {number|Span} [rpan] - The radial component of the velocity or its range.
     * @param {number|Span} [thapan] - The angular component of the velocity or its range.
     * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
     */
    function Velocity(rpan, thapan, type) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.rPan = void 0;
      _this.thaPan = void 0;
      _this.name = void 0;
      _this.rPan = Span.setSpanValue(rpan);
      _this.thaPan = Span.setSpanValue(thapan);
      _this.type = Util.initValue(type, "vector");
      _this.name = "Velocity";
      return _this;
    }

    /**
     * Resets the velocity parameters.
     * @param {number|Span} [rpan] - The radial component of the velocity or its range.
     * @param {number|Span} [thapan] - The angular component of the velocity or its range.
     * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
     */
    var _proto = Velocity.prototype;
    _proto.reset = function reset(rpan, thapan, type) {
      this.rPan = Span.setSpanValue(rpan);
      this.thaPan = Span.setSpanValue(thapan);
      this.type = Util.initValue(type, "vector");
    }

    /**
     * Normalizes the velocity value.
     * @param {number} vr - The velocity value to normalize.
     * @returns {number} The normalized velocity value.
     * @private
     */;
    _proto.normalizeVelocity = function normalizeVelocity(vr) {
      return vr * Proton.MEASURE;
    }

    /**
     * Initializes the particle's velocity.
     * @param {object} target - The particle to initialize.
     */;
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

  /**
   * Mass class for initializing particle mass.
   * @extends Initialize
   */
  var Mass = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Mass, _Initialize);
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Mass instance.
     * @param {number|Span} a - The mass value or the lower bound of the mass range.
     * @param {number} [b] - The upper bound of the mass range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Mass(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.massPan = void 0;
      _this.name = void 0;
      _this.massPan = Span.setSpanValue(a, b, c);
      _this.name = "Mass";
      return _this;
    }

    /**
     * Initializes the mass of a target particle.
     * @param {object} target - The target particle to initialize.
     */
    var _proto = Mass.prototype;
    _proto.initialize = function initialize(target) {
      target.mass = this.massPan.getValue();
    };
    return Mass;
  }(Initialize);

  /**
   * Radius class for initializing particle radius.
   * @extends Initialize
   */
  var Radius = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Radius, _Initialize);
    /**
     * @type {Span}
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Radius instance.
     * @param {number|Span} a - The radius value or the lower bound of the radius range.
     * @param {number} [b] - The upper bound of the radius range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Radius(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.radius = void 0;
      _this.name = void 0;
      _this.radius = Span.setSpanValue(a, b, c);
      _this.name = "Radius";
      return _this;
    }

    /**
     * Resets this initializer's parameters.
     * @param {number|Span} a - The radius value or the lower bound of the radius range.
     * @param {number} [b] - The upper bound of the radius range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    var _proto = Radius.prototype;
    _proto.reset = function reset(a, b, c) {
      this.radius = Span.setSpanValue(a, b, c);
    }

    /**
     * Initializes the particle's radius.
     * @param {Particle} particle - The particle to initialize.
     */;
    _proto.initialize = function initialize(particle) {
      particle.radius = this.radius.getValue();
      particle.data.oldRadius = particle.radius;
    };
    return Radius;
  }(Initialize);

  /**
   * Body class for initializing particle bodies.
   * @extends Initialize
   */
  var Body = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Body, _Initialize);
    /**
     * @type {ArraySpan}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Body instance.
     * @param {string|object|ArraySpan} image - The image source or object to use for the particle body.
     * @param {number} [w=20] - The width of the particle body.
     * @param {number} [h] - The height of the particle body. Defaults to the width if not provided.
     */
    function Body(image, w, h) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.image = void 0;
      _this.name = void 0;
      _this.image = _this.setSpanValue(image);
      _this.w = Util.initValue(w, 20);
      _this.h = Util.initValue(h, _this.w);
      _this.name = "Body";
      return _this;
    }

    /**
     * Initializes the particle's body.
     * @param {object} particle - The particle to initialize.
     */
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
    }

    /**
     * Sets the span value for the image.
     * @param {string|object|ArraySpan} image - The image source or object to set as span value.
     * @returns {ArraySpan} The ArraySpan instance.
     * @private
     */;
    _proto.setSpanValue = function setSpanValue(image) {
      return image instanceof ArraySpan ? image : new ArraySpan(image);
    };
    return Body;
  }(Initialize);

  /**
   * The Behaviour class is the base for the other Behaviour
   * @class
   */
  var Behaviour = /*#__PURE__*/function () {
    /**
     * Create a new Behaviour instance
     * @param {number} [life=Infinity] - The behaviour's life
     * @param {string} [easing='easeLinear'] - The behaviour's decaying trend, for example ease.easeOutQuart
     */
    function Behaviour(life, easing) {
      /**
       * The behaviour's life
       * @type {number}
       */
      this.life = Util.initValue(life, Infinity);

      /**
       * The behaviour's easing function
       * @type {function}
       */
      this.easing = ease.getEasing(easing);

      /**
       * The behaviour's current age
       * @type {number}
       */
      this.age = 0;

      /**
       * The behaviour's current energy
       * @type {number}
       */
      this.energy = 1;

      /**
       * Whether the behaviour is dead
       * @type {boolean}
       */
      this.dead = false;

      /**
       * The behaviour's parent emitters
       * @type {Array}
       */
      this.parents = [];

      /**
       * The behaviour's unique id
       * @type {string}
       */
      this.id = "Behaviour_" + Behaviour.id++;

      /**
       * The behaviour's name
       * @type {string}
       */
      this.name = "Behaviour";
    }

    /**
     * Reset this behaviour's parameters
     * @param {number} [life=Infinity] - This behaviour's new life
     * @param {string} [easing='easeLinear'] - This behaviour's new easing
     */
    var _proto = Behaviour.prototype;
    _proto.reset = function reset(life, easing) {
      this.life = Util.initValue(life, Infinity);
      this.easing = ease.getEasing(easing);
    }

    /**
     * Normalize a force by 1:100
     * @param {Proton.Vector2D} force - The force to normalize
     * @returns {Proton.Vector2D} The normalized force
     */;
    _proto.normalizeForce = function normalizeForce(force) {
      return force.multiplyScalar(Proton.MEASURE);
    }

    /**
     * Normalize a value by 1:100
     * @param {number} value - The value to normalize
     * @returns {number} The normalized value
     */;
    _proto.normalizeValue = function normalizeValue(value) {
      return value * Proton.MEASURE;
    }

    /**
     * Initialize the behaviour's parameters for a particle
     * @param {Proton.Particle} particle - The particle to initialize
     */;
    _proto.initialize = function initialize(particle) {}

    /**
     * Compute the behaviour's life cycle
     * @param {Proton.Particle} particle - The particle to calculate for
     * @param {number} time - The integrate time 1/ms
     * @param {number} index - The particle index
     */;
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
     * Apply this behaviour to a particle
     * @param {Proton.Particle} particle - The particle to apply the behaviour to
     * @param {number} time - The integrate time 1/ms
     * @param {number} index - The particle index
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
    }

    /**
     * Destroy this behaviour
     */;
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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.a.add(this.force);
    };
    return Force;
  }(Behaviour);

  /**
   * Attraction behavior for particles.
   * This behaviour makes particles follow a specific target position.
   * @extends Behaviour
   */
  var Attraction = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Attraction, _Behaviour);
    /**
     * Creates an instance of Attraction.
     * @param {Vector2D} targetPosition - The attraction point coordinates.
     * @param {number} [force=100] - The strength of the attraction force.
     * @param {number} [radius=1000] - The radius of influence for the attraction.
     * @param {number} [life=Infinity] - The life span of this behaviour.
     * @param {string} [easing='ease.easeLinear'] - The easing function for this behaviour.
     */
    function Attraction(targetPosition, force, radius, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;

      /**
       * The target position for attraction.
       * @type {Vector2D}
       */
      _this.targetPosition = Util.initValue(targetPosition, new Vector2D());

      /**
       * The radius of influence for the attraction.
       * @type {number}
       */
      _this.radius = Util.initValue(radius, 1000);

      /**
       * The strength of the attraction force.
       * @type {number}
       */
      _this.force = Util.initValue(_this.normalizeValue(force), 100);

      /**
       * The squared radius (for optimization).
       * @type {number}
       */
      _this.radiusSq = _this.radius * _this.radius;

      /**
       * The attraction force vector.
       * @type {Vector2D}
       */
      _this.attractionForce = new Vector2D();

      /**
       * The squared length of the attraction force.
       * @type {number}
       */
      _this.lengthSq = 0;

      /**
       * The name of the behaviour.
       * @type {string}
       */
      _this.name = "Attraction";
      return _this;
    }

    /**
     * Resets the behaviour's parameters.
     * @param {Vector2D} targetPosition - The new attraction point coordinates.
     * @param {number} [force=100] - The new strength of the attraction force.
     * @param {number} [radius=1000] - The new radius of influence for the attraction.
     * @param {number} [life=Infinity] - The new life span of this behaviour.
     * @param {string} [easing='ease.easeLinear'] - The new easing function for this behaviour.
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
     * Applies this behaviour to a particle.
     * @param {Particle} particle - The particle to apply the behaviour to.
     * @param {number} time - The current simulation time.
     * @param {number} index - The index of the particle.
     */;
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
     */;
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
      _this.newPool = [];
      _this.pool = [];
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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      if (this.emitter) {
        Util.sliceArray(this.emitter.particles, index, this.newPool);
      } else {
        Util.sliceArray(this.pool, index, this.newPool);
      }
      var length = this.newPool.length;
      var otherParticle;
      var lengthSq;
      var overlap;
      var totalMass;
      var averageMass1, averageMass2;
      var i;
      for (i = 0; i < length; i++) {
        otherParticle = this.newPool[i];
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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      this.zone.crossing(particle);
    };
    return CrossZone;
  }(Behaviour);

  /**
   * Alpha behaviour for controlling particle opacity over time.
   * @extends Behaviour
   */
  var Alpha = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Alpha, _Behaviour);
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Alpha instance.
     * @param {number|Span} [a=1] - The initial alpha value or range.
     * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    function Alpha(a, b, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.same = void 0;
      _this.a = void 0;
      _this.b = void 0;
      _this.name = void 0;
      _this.reset(a, b);
      _this.name = "Alpha";
      return _this;
    }

    /**
     * Resets this behaviour's parameters.
     * @param {number|Span} [a=1] - The initial alpha value or range.
     * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    var _proto = Alpha.prototype;
    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined;
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Initializes the particle's alpha values.
     * @param {Particle} particle - The particle to initialize.
     */;
    _proto.initialize = function initialize(particle) {
      particle.data.alphaA = this.a.getValue();
      if (this.same) particle.data.alphaB = particle.data.alphaA;else particle.data.alphaB = this.b.getValue();
    }

    /**
     * Applies the alpha behaviour to the particle.
     * @param {Particle} particle - The particle to apply the behaviour to.
     * @param {number} time - The current simulation time.
     * @param {number} index - The index of the particle.
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;
      if (particle.alpha < 0.001) particle.alpha = 0;
    };
    return Alpha;
  }(Behaviour);

  /**
   * Scale behaviour for controlling particle size over time.
   * @extends Behaviour
   */
  var Scale = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Scale, _Behaviour);
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Scale instance.
     * @param {number|Span} [a=1] - The initial scale value or range.
     * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    function Scale(a, b, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.same = void 0;
      _this.name = void 0;
      _this.reset(a, b);
      _this.name = "Scale";
      return _this;
    }

    /**
     * Resets this behaviour's parameters.
     * @param {number|Span} a - The initial scale value or range.
     * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    var _proto = Scale.prototype;
    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined;
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Initializes the particle's scale values.
     * @param {Particle} particle - The particle to initialize.
     */;
    _proto.initialize = function initialize(particle) {
      particle.data.scaleA = this.a.getValue();
      particle.data.oldRadius = particle.radius;
      particle.data.scaleB = this.same ? particle.data.scaleA : this.b.getValue();
    }

    /**
     * Applies the scale behaviour to the particle.
     * @param {Particle} particle - The particle to apply the behaviour to.
     * @param {number} time - The current simulation time.
     * @param {number} index - The index of the particle.
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.scale = particle.data.scaleB + (particle.data.scaleA - particle.data.scaleB) * this.energy;
      if (particle.scale < 0.0001) particle.scale = 0;
      particle.radius = particle.data.oldRadius * particle.scale;
    };
    return Scale;
  }(Behaviour);

  /**
   * Rotate behaviour for controlling particle rotation.
   * @extends Behaviour
   */
  var Rotate = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Rotate, _Behaviour);
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Rotate instance.
     * @param {string|number|Span} [influence='Velocity'] - The rotation's influence or initial rotation.
     * @param {string|number|Span} [b] - The final rotation value or range.
     * @param {string} [style='to'] - The style of rotation ('to' or 'add').
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    function Rotate(influence, b, style, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.same = void 0;
      _this.a = void 0;
      _this.b = void 0;
      _this.style = void 0;
      _this.name = void 0;
      _this.reset(influence, b, style);
      _this.name = "Rotate";
      return _this;
    }

    /**
     * Resets this behaviour's parameters.
     * @param {string|number|Span} [a='Velocity'] - The rotation's influence or initial rotation.
     * @param {string|number|Span} [b] - The final rotation value or range.
     * @param {string} [style='to'] - The style of rotation ('to' or 'add').
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    var _proto = Rotate.prototype;
    _proto.reset = function reset(a, b, style, life, easing) {
      this.same = b === null || b === undefined;
      this.a = Span.setSpanValue(Util.initValue(a, "Velocity"));
      this.b = Span.setSpanValue(Util.initValue(b, 0));
      this.style = Util.initValue(style, "to");
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Initializes the behaviour's parameters for a particle.
     * @param {object} particle - The particle to initialize.
     * @param {number} particle.rotation - The particle's rotation.
     * @param {object} particle.data - The particle's data object.
     */;
    _proto.initialize = function initialize(particle) {
      particle.rotation = this.a.getValue();
      particle.data.rotationA = this.a.getValue();
      if (!this.same) particle.data.rotationB = this.b.getValue();
    }

    /**
     * Applies this behaviour to a particle.
     * @param {object} particle - The particle to apply the behaviour to.
     * @param {number} time - The integrate time (1/ms).
     * @param {number} index - The particle index.
     */;
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
     * @param {Proton.ArraySpan | String} [a] the string should be a hex e.g. #000000 for black
     * @param {Proton.ArraySpan | String} [b] the string should be a hex e.g. #000000 for black
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
     */;
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
     */;
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
     */;
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
     */;
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

  /**
   * The opposite of Attraction - turns the force
   *
   * @class
   * @extends Proton.Attraction
   * @memberof! Proton#
   * @alias Proton.Repulsion
   */
  var Repulsion = /*#__PURE__*/function (_Attraction) {
    _inheritsLoose(Repulsion, _Attraction);
    /**
     * Creates a new Repulsion behaviour instance
     *
     * @constructor
     * @param {Proton.Vector2D} targetPosition - The repulsion point coordinates
     * @param {number} [force=100] - The strength of the repulsion force
     * @param {number} [radius=1000] - The radius of influence for the repulsion
     * @param {number} [life=Infinity] - The behaviour's life
     * @param {string} [easing='easeLinear'] - The behaviour's easing function
     */
    function Repulsion(targetPosition, force, radius, life, easing) {
      var _this;
      _this = _Attraction.call(this, targetPosition, force, radius, life, easing) || this;

      /**
       * The strength of the repulsion force
       * @type {number}
       */
      _this.force *= -1;

      /**
       * The name of the behaviour
       * @type {string}
       */
      _this.name = "Repulsion";
      return _this;
    }

    /**
     * Reset this behaviour's parameters
     *
     * @param {Proton.Vector2D} targetPosition - The new repulsion point coordinates
     * @param {number} [force=100] - The new strength of the repulsion force
     * @param {number} [radius=1000] - The new radius of influence for the repulsion
     * @param {number} [life=Infinity] - The new behaviour's life
     * @param {string} [easing='easeLinear'] - The new behaviour's easing function
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
     */;
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
     */;
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
     * @param {Number | String} [totalTime] begin emit time;
     * @param {String | boolean} [life] the life of this emitter
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
     */;
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
     */;
    _proto.removeAllParticles = function removeAllParticles() {
      var i = this.particles.length;
      while (i--) {
        this.particles[i].dead = true;
      }
    }

    /**
     * add initialize to this emitter
     * @method addSelfInitialize
     */;
    _proto.addSelfInitialize = function addSelfInitialize(initialize) {
      if (initialize["init"]) {
        initialize.init(this);
      }
    }

    /**
     * add the Initialize to particles;
     *
     * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
     * @method addInitialize
     * @param {Initialize} initialize like this new Radius(1, 12)
     */;
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
     */;
    _proto.removeInitialize = function removeInitialize(initializer) {
      var index = this.initializes.indexOf(initializer);
      if (index > -1) this.initializes.splice(index, 1);
    }

    /**
     * remove all Initializes
     * @method removeInitializers
     */;
    _proto.removeAllInitializers = function removeAllInitializers() {
      Util.emptyArray(this.initializes);
    }

    /**
     * add the Behaviour to particles;
     *
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */;
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
     */;
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
     */;
    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }

    // emitter update
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
    };
    _proto.dispatch = function dispatch(event, target) {
      this.parent && this.parent.dispatchEvent(event, target);
      this.bindEvent && this.dispatchEvent(event, target);
    };
    _proto.emitting = function emitting(time) {
      if (this.stoped) return;
      if (this.totalTime === "none") {
        this.emitTime += time;
      } else if (this.totalTime === "once") {
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
     */;
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
     */;
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
     */;
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
     */;
    _proto.emit = function emit() {
      this._allowEmitting = true;
    }

    /**
     * stop emiting
     * @method stop
     */;
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
     */;
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

  /**
   * CanvasRenderer class for rendering particles on a canvas element.
   * @extends BaseRenderer
   */
  var CanvasRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CanvasRenderer, _BaseRenderer);
    /**
     * @type {object|null}
     * @private
     */

    /**
     * @type {CanvasRenderingContext2D}
     * @private
     */

    /**
     * @type {object}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new CanvasRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render on.
     */
    function CanvasRenderer(element) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = void 0;
      _this.context = void 0;
      _this.bufferCache = void 0;
      _this.name = void 0;
      _this.stroke = null;
      _this.context = _this.element.getContext("2d");
      _this.bufferCache = {};
      _this.name = "CanvasRenderer";
      return _this;
    }

    /**
     * Resizes the canvas element.
     * @param {number} width - The new width of the canvas.
     * @param {number} height - The new height of the canvas.
     */
    var _proto = CanvasRenderer.prototype;
    _proto.resize = function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    }

    /**
     * Clears the canvas on Proton update.
     */;
    _proto.onProtonUpdate = function onProtonUpdate() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    /**
     * Handles particle creation.
     * @param {object} particle - The created particle.
     */;
    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.color = particle.color || "#ff0000";
      }
    }

    /**
     * Handles particle updates.
     * @param {object} particle - The updated particle.
     */;
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.body) {
        if (Types.isImage(particle.body)) {
          this.drawImage(particle);
        }
      } else {
        this.drawCircle(particle);
      }
    }

    /**
     * Handles particle destruction.
     * @param {object} particle - The destroyed particle.
     */;
    _proto.onParticleDead = function onParticleDead(particle) {
      particle.body = null;
    }

    /**
     * Adds an image to the particle body.
     * @param {HTMLImageElement} img - The image to add.
     * @param {object} particle - The particle to add the image to.
     * @private
     */;
    _proto.addImg2Body = function addImg2Body(img, particle) {
      particle.body = img;
    }

    /**
     * Draws an image particle.
     * @param {object} particle - The particle to draw.
     * @private
     */;
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
    }

    /**
     * Draws a circular particle.
     * @param {object} particle - The particle to draw.
     * @private
     */;
    _proto.drawCircle = function drawCircle(particle) {
      if (particle.rgb) {
        this.context.fillStyle = "rgba(" + particle.rgb.r + "," + particle.rgb.g + "," + particle.rgb.b + "," + particle.alpha + ")";
      } else {
        this.context.fillStyle = particle.color;
      }
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

    /**
     * Creates a buffer for image particles.
     * @param {HTMLImageElement} image - The image to create a buffer for.
     * @returns {HTMLCanvasElement|undefined} The created buffer canvas.
     * @private
     */;
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
    }

    /**
     * Destroys the renderer and cleans up resources.
     */;
    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);
      this.stroke = null;
      this.context = null;
      this.bufferCache = null;
    };
    return CanvasRenderer;
  }(BaseRenderer);

  /**
   * Represents a DOM-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var DomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(DomRenderer, _BaseRenderer);
    /**
     * Creates a new DomRenderer instance.
     * @param {HTMLElement} element - The HTML element to render to.
     */
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
    }

    // private method
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
    }

    // private methods
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
    }

    /**
     * Destroys the renderer and cleans up resources.
     */;
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
    }

    // private
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
      var graphics = this.pool.get(window.createjs.Graphics);
      if (this.stroke) {
        if (Types.isString(this.stroke)) {
          graphics.beginStroke(this.stroke);
        } else {
          graphics.beginStroke("#000000");
        }
      }
      graphics.beginFill(particle.color || "#ff0000").drawCircle(0, 0, particle.radius);
      var shape = this.pool.get(window.createjs.Shape, [graphics]);
      particle.body = shape;
      particle.graphics = graphics;
    };
    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);
      this.stroke = null;
    };
    return EaselRenderer;
  }(BaseRenderer);

  /**
   * Represents a pixel-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var PixelRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixelRenderer, _BaseRenderer);
    /**
     * Creates a new PixelRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render to.
     * @param {Rectangle} [rectangle] - The rectangle defining the rendering area.
     */
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
      if (x < 0 || x > this.element.width || y < 0 || y > this.element.height) return;
      var i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;
      imagedata.data[i] = rgb.r;
      imagedata.data[i + 1] = rgb.g;
      imagedata.data[i + 2] = rgb.b;
      imagedata.data[i + 3] = particle.alpha * 255;
    };
    _proto.onParticleDead = function onParticleDead(particle) {}

    /**
     * Destroys the renderer and cleans up resources.
     */;
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

  /**
   * Represents a PIXI-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var PixiRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixiRenderer, _BaseRenderer);
    /**
     * Creates a new PixiRenderer instance.
     * @param {PIXI.Container} element - The PIXI container to render to.
     * @param {string|number} [stroke] - The stroke color for particles.
     */
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
     */;
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
     */;
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      this.transform(particle, particle.body);
      if (this.setColor === true || this.color === true) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      }
    }

    /**
     * @param particle
     */;
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
      target.scale.y = particle.scale;

      // using cached version of MathUtil.PI_180 for slight performance increase.
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
    }

    /**
     * Destroys the renderer and cleans up resources.
     * @param {Array<Particle>} particles - The particles to clean up.
     */;
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

  /**
   * Represents a WebGL-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var WebGLRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(WebGLRenderer, _BaseRenderer);
    /**
     * Creates a new WebGLRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render to.
     */
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
    _proto.onProtonUpdate = function onProtonUpdate() {
      // this.gl.clearColor(0, 0, 0, 1);
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
    }

    // private
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

  /**
   * Represents a custom renderer that extends the BaseRenderer.
   * @extends BaseRenderer
   */
  var CustomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CustomRenderer, _BaseRenderer);
    /**
     * Creates a new CustomRenderer instance.
     * @param {HTMLElement} element - The HTML element to render to.
     */
    function CustomRenderer(element) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;

      /**
       * The name of the renderer.
       * @type {string}
       */
      _this.name = "CustomRenderer";
      return _this;
    }
    return CustomRenderer;
  }(BaseRenderer);

  /**
   * Represents a line zone for particle systems.
   * @extends Zone
   */
  var LineZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(LineZone, _Zone);
    /**
     * Creates a new LineZone.
     * @param {number} x1 - The x-coordinate of the first point.
     * @param {number} y1 - The y-coordinate of the first point.
     * @param {number} [x2] - The x-coordinate of the second point.
     * @param {number} [y2] - The y-coordinate of the second point.
     * @param {string} [direction=">"] - The direction of the line.
     */
    function LineZone(x1, y1, x2, y2, direction) {
      var _this;
      if (direction === void 0) {
        direction = ">";
      }
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

    /**
     * Gets a random position on the line.
     * @returns {Vector2D} A vector representing the random position.
     */
    var _proto = LineZone.prototype;
    _proto.getPosition = function getPosition() {
      this.random = Math.random();
      this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
      this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);
      return this.vector;
    }

    /**
     * Determines which side of the line a point is on.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {boolean} True if the point is on the positive side of the line, false otherwise.
     */;
    _proto.getDirection = function getDirection(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = B === 0 ? 1 : B;
      if ((A * x + B * y + C) * D > 0) return true;else return false;
    }

    /**
     * Calculates the distance of a point from the line.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {number} The distance from the point to the line.
     */;
    _proto.getDistance = function getDistance(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = A * x + B * y + C;
      return D / Math.sqrt(this.xxyy);
    }

    /**
     * Calculates the symmetric vector of a given vector with respect to the line.
     * @param {Vector2D} v - The vector to reflect.
     * @returns {Vector2D} The reflected vector.
     */;
    _proto.getSymmetric = function getSymmetric(v) {
      var tha2 = v.getGradient();
      var tha1 = this.getGradient();
      var tha = 2 * (tha1 - tha2);
      var oldx = v.x;
      var oldy = v.y;
      v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
      return v;
    }

    /**
     * Gets the gradient (angle) of the line.
     * @returns {number} The gradient of the line in radians.
     */;
    _proto.getGradient = function getGradient() {
      return Math.atan2(this.dy, this.dx);
    }

    /**
     * Checks if a particle is outside the range of the line.
     * @param {Particle} particle - The particle to check.
     * @returns {boolean} True if the particle is within range, false otherwise.
     */;
    _proto.rangeOut = function rangeOut(particle) {
      var angle = Math.abs(this.getGradient());
      if (angle <= MathUtil.PI / 4) {
        if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
      } else {
        if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
      }
      return false;
    }

    /**
     * Gets the length of the line.
     * @returns {number} The length of the line.
     */;
    _proto.getLength = function getLength() {
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }

    /**
     * Handles particle crossing behavior based on the crossType.
     * @param {Particle} particle - The particle to check for crossing.
     */;
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

  /**
   * Represents a circular zone in a 2D space.
   * @extends Zone
   */
  var CircleZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(CircleZone, _Zone);
    /**
     * Creates a new CircleZone.
     * @param {number} x - The x-coordinate of the circle's center.
     * @param {number} y - The y-coordinate of the circle's center.
     * @param {number} [radius] - The radius of the circle.
     */
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

    /**
     * Gets a random position within the circle.
     * @returns {Object} An object with x and y coordinates.
     */
    var _proto = CircleZone.prototype;
    _proto.getPosition = function getPosition() {
      this.angle = MathUtil.PIx2 * Math.random();
      this.randomRadius = Math.random() * this.radius;
      this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
      this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);
      return this.vector;
    }

    /**
     * Sets the center of the circle.
     * @param {number} x - The new x-coordinate of the center.
     * @param {number} y - The new y-coordinate of the center.
     */;
    _proto.setCenter = function setCenter(x, y) {
      this.center.x = x;
      this.center.y = y;
    }

    /**
     * Handles particle crossing behavior.
     * @param {Object} particle - The particle to check for crossing.
     */;
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
    }

    /**
     * Calculates the symmetric position of a particle.
     * @param {Object} particle - The particle to calculate symmetry for.
     */;
    _proto.getSymmetric = function getSymmetric(particle) {
      var tha2 = particle.v.getGradient();
      var tha1 = this.getGradient(particle);
      var tha = 2 * (tha1 - tha2);
      var oldx = particle.v.x;
      var oldy = particle.v.y;
      particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
    }

    /**
     * Calculates the gradient for a particle.
     * @param {Object} particle - The particle to calculate the gradient for.
     * @returns {number} The calculated gradient.
     */;
    _proto.getGradient = function getGradient(particle) {
      return -MathUtil.PI_2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
    };
    return CircleZone;
  }(Zone);

  /**
   * Represents a rectangular zone for particle systems.
   * @extends Zone
   */
  var RectZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(RectZone, _Zone);
    /**
     * Creates a new RectZone.
     * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
     * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
     * @param {number} [width] - The width of the rectangle.
     * @param {number} [height] - The height of the rectangle.
     */
    function RectZone(x, y, width, height) {
      var _this;
      if (width === void 0) {
        width = 200;
      }
      if (height === void 0) {
        height = 200;
      }
      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this.width = width;
      _this.height = height;
      return _this;
    }

    /**
     * Gets a random position within the rectangular zone.
     * @returns {Vector2D} A vector representing the random position.
     */
    var _proto = RectZone.prototype;
    _proto.getPosition = function getPosition() {
      this.vector.x = this.x + Math.random() * this.width;
      this.vector.y = this.y + Math.random() * this.height;
      return this.vector;
    }

    /**
     * Handles particle crossing behavior based on the crossType.
     * @param {Particle} particle - The particle to check for crossing.
     */;
    _proto.crossing = function crossing(particle) {
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
    };
    return RectZone;
  }(Zone);

  /**
   * Represents a zone based on image data.
   * @extends Zone
   */
  var ImageZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(ImageZone, _Zone);
    /**
     * Creates an ImageZone.
     * @param {ImageData} imageData - The image data to use for the zone.
     * @param {number} [x=0] - The x-coordinate offset.
     * @param {number} [y=0] - The y-coordinate offset.
     * @param {number} [d=2] - The sampling density.
     */
    function ImageZone(imageData, x, y, d) {
      var _this;
      _this = _Zone.call(this) || this;
      _this.reset(imageData, x, y, d);
      return _this;
    }

    /**
     * Resets the ImageZone with new parameters.
     * @param {ImageData} imageData - The image data to use for the zone.
     * @param {number} [x=0] - The x-coordinate offset.
     * @param {number} [y=0] - The y-coordinate offset.
     * @param {number} [d=2] - The sampling density.
     */
    var _proto = ImageZone.prototype;
    _proto.reset = function reset(imageData, x, y, d) {
      this.imageData = imageData;
      this.x = Util.initValue(x, 0);
      this.y = Util.initValue(y, 0);
      this.d = Util.initValue(d, 2);
      this.vectors = [];
      this.setVectors();
    }

    /**
     * Sets up vectors based on the image data.
     * @returns {Object} The vector object.
     */;
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
    }

    /**
     * Checks if a point is within the bounds of the image.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @returns {boolean} True if the point is within bounds, false otherwise.
     */;
    _proto.getBound = function getBound(x, y) {
      var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      return this.imageData.data[index + 3] > 0;
    }

    /**
     * Gets a random position within the image zone.
     * @returns {Object} A vector representing the position.
     */;
    _proto.getPosition = function getPosition() {
      var vector = Util.getRandFromArray(this.vectors);
      return this.vector.copy(vector);
    }

    /**
     * Gets the color at a specific point in the image.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @returns {Object} An object containing r, g, b, and a values.
     */;
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
    }

    /**
     * Handles particle crossing behavior.
     * @param {Object} particle - The particle to check for crossing.
     */;
    _proto.crossing = function crossing(particle) {
      if (this.crossType === "dead") {
        particle.dead = this.getBound(particle.p.x - this.x, particle.p.y - this.y);
      } else if (this.crossType === "bound") {
        if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.v.negate();
      }
    }

    /**
     * Destroys the ImageZone and cleans up resources.
     */;
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

  exports.Alpha = Alpha;
  exports.ArraySpan = ArraySpan;
  exports.Attraction = Attraction;
  exports.Behaviour = Behaviour;
  exports.BehaviourEmitter = BehaviourEmitter;
  exports.Body = Body;
  exports.CanvasRenderer = CanvasRenderer;
  exports.CircleZone = CircleZone;
  exports.Collision = Collision;
  exports.Color = Color;
  exports.ColorUtil = ColorUtil;
  exports.CrossZone = CrossZone;
  exports.CustomRenderer = CustomRenderer;
  exports.Cyclone = Cyclone;
  exports.Debug = Debug;
  exports.DomRenderer = DomRenderer;
  exports.EaselRenderer = EaselRenderer;
  exports.Emitter = Emitter;
  exports.FollowEmitter = FollowEmitter;
  exports.Force = Force;
  exports.Gravity = Gravity;
  exports.GravityWell = GravityWell;
  exports.ImageZone = ImageZone;
  exports.Initialize = Initialize;
  exports.Life = Life;
  exports.LineZone = LineZone;
  exports.Mass = Mass;
  exports.Mat3 = Mat3;
  exports.MathUtil = MathUtil;
  exports.Particle = Particle;
  exports.PixelRenderer = PixelRenderer;
  exports.PixiRenderer = PixiRenderer;
  exports.PointZone = PointZone;
  exports.Polar2D = Polar2D;
  exports.Pool = Pool;
  exports.Position = Position;
  exports.Radius = Radius;
  exports.RandomDrift = RandomDrift;
  exports.Rate = Rate;
  exports.RectZone = RectZone;
  exports.Rectangle = Rectangle;
  exports.Repulsion = Repulsion;
  exports.Rotate = Rotate;
  exports.Scale = Scale;
  exports.Span = Span;
  exports.Util = Util;
  exports.Vector2D = Vector2D;
  exports.Velocity = Velocity;
  exports.WebGLRenderer = WebGLRenderer;
  exports.Zone = Zone;
  exports.default = Proton;
  exports.ease = ease;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy9tYXRoL1NwYW4uanMiLCIuLi9zcmMvdXRpbHMvUHJvcFV0aWwuanMiLCIuLi9zcmMvbWF0aC9lYXNlLmpzIiwiLi4vc3JjL21hdGgvVmVjdG9yMkQuanMiLCIuLi9zcmMvY29yZS9QYXJ0aWNsZS5qcyIsIi4uL3NyYy91dGlscy9Db2xvclV0aWwuanMiLCIuLi9zcmMvbWF0aC9Qb2xhcjJELmpzIiwiLi4vc3JjL21hdGgvTWF0My5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIHNsaWNlQXJyYXkoYXJyMSwgaW5kZXgsIGFycjIpIHtcbiAgICB0aGlzLmVtcHR5QXJyYXkoYXJyMik7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMi5wdXNoKGFycjFbaV0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRSYW5kRnJvbUFycmF5KGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoYXJyLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGVtcHR5T2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW55IG9iamVjdFxuICAgKi9cbiAgZW1wdHlPYmplY3Qob2JqLCBpZ25vcmUgPSBudWxsKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIGNvbnRpbnVlO1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWFrZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBhbmQgYmluZHMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBjbGFzc0FwcGx5XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIEEgY2xhc3MgdG8gbWFrZSBhbiBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBBbnkgYXJyYXkgdG8gYmluZCBpdCB0byB0aGUgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgaW5zdGFuY2Ugb2YgY29uc3RydWN0b3IsIG9wdGlvbmFsbHkgYmluZCB3aXRoIGFyZ3NcbiAgICovXG4gIGNsYXNzQXBwbHkoY29uc3RydWN0b3IsIGFyZ3MgPSBudWxsKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IEZhY3RvcnlGdW5jID0gY29uc3RydWN0b3IuYmluZC5hcHBseShjb25zdHJ1Y3RvciwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IEZhY3RvcnlGdW5jKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICByZXR1cm4gSW1nVXRpbC5nZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpO1xuICB9LFxuXG4gIGRlc3Ryb3lBbGwoYXJyLCBwYXJhbSA9IG51bGwpIHtcbiAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJbaV0uZGVzdHJveShwYXJhbSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBkZWxldGUgYXJyW2ldO1xuICAgIH1cblxuICAgIGFyci5sZW5ndGggPSAwO1xuICB9LFxuXG4gIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgaWRzTWFwID0ge307XG5cbmNvbnN0IFB1aWQgPSB7XG4gIF9pbmRleDogMCxcbiAgX2NhY2hlOiB7fSxcblxuICBpZCh0eXBlKSB7XG4gICAgaWYgKGlkc01hcFt0eXBlXSA9PT0gdW5kZWZpbmVkIHx8IGlkc01hcFt0eXBlXSA9PT0gbnVsbCkgaWRzTWFwW3R5cGVdID0gMDtcbiAgICByZXR1cm4gYCR7dHlwZX1fJHtpZHNNYXBbdHlwZV0rK31gO1xuICB9LFxuXG4gIGdldElkKHRhcmdldCkge1xuICAgIGxldCB1aWQgPSB0aGlzLmdldElkRnJvbUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKHVpZCkgcmV0dXJuIHVpZDtcblxuICAgIHVpZCA9IGBQVUlEXyR7dGhpcy5faW5kZXgrK31gO1xuICAgIHRoaXMuX2NhY2hlW3VpZF0gPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHVpZDtcbiAgfSxcblxuICBnZXRJZEZyb21DYWNoZSh0YXJnZXQpIHtcbiAgICBsZXQgb2JqLCBpZDtcblxuICAgIGZvciAoaWQgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIG9iaiA9IHRoaXMuX2NhY2hlW2lkXTtcblxuICAgICAgaWYgKG9iaiA9PT0gdGFyZ2V0KSByZXR1cm4gaWQ7XG4gICAgICBpZiAodGhpcy5pc0JvZHkob2JqLCB0YXJnZXQpICYmIG9iai5zcmMgPT09IHRhcmdldC5zcmMpIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpc0JvZHkob2JqLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIG9iai5pc0lubmVyICYmIHRhcmdldC5pc0lubmVyO1xuICB9LFxuXG4gIGdldFRhcmdldCh1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbdWlkXTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVpZDtcbiIsIi8qKlxuICogUG9vbCBpcyB0aGUgY2FjaGUgcG9vbCBvZiB0aGUgcHJvdG9uIGVuZ2luZSwgaXQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gKlxuICogZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpXG4gKiAgQ2xhc3NcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICogICAgdGFyZ2V0Ll9fcHVpZCA9IHVpZFxuICpcbiAqICBib2R5XG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqXG4gKlxuICogZXhwaXJlKHRhcmdldClcbiAqICBjYWNoZVt0YXJnZXQuX19wdWlkXSBwdXNoIHRhcmdldFxuICpcbiAqL1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBvZiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3RhbFxuICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FjaGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKSB7XG4gICAgbGV0IHA7XG4gICAgdWlkID0gdWlkIHx8IHRhcmdldC5fX3B1aWQgfHwgUHVpZC5nZXRJZCh0YXJnZXQpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVbdWlkXSAmJiB0aGlzLmNhY2hlW3VpZF0ubGVuZ3RoID4gMCkge1xuICAgICAgcCA9IHRoaXMuY2FjaGVbdWlkXS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHRoaXMuY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcC5fX3B1aWQgPSB0YXJnZXQuX19wdWlkIHx8IHVpZDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGV4cGlyZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZSh0YXJnZXQuX19wdWlkKS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldCBhbnkgT2JqZWN0IG9yIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpIHtcbiAgICB0aGlzLnRvdGFsKys7XG5cbiAgICBpZiAodGhpcy5jcmVhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBVdGlsLmNsYXNzQXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiAtIHdoYXQgaXMgaW4gdGhlIGNhY2hlP1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSBjb3VudCArPSB0aGlzLmNhY2hlW2lkXS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveWVzIGFsbCBpdGVtcyBmcm9tIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZVtpZF0ubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q2FjaGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdWlkIHRoZSB1bmlxdWUgaWRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2FjaGUodWlkID0gXCJkZWZhdWx0XCIpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVbdWlkXSkgdGhpcy5jYWNoZVt1aWRdID0gW107XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdWlkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMge1xuICBjb25zdHJ1Y3Rvcihwcm90b24pIHtcbiAgICB0aGlzLnByb3RvbiA9IHByb3RvbjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50eXBlID0gMTtcblxuICAgIHRoaXMuZW1pdHRlckluZGV4ID0gMDtcbiAgICB0aGlzLnJlbmRlcmVySW5kZXggPSAwO1xuICB9XG5cbiAgdXBkYXRlKHN0eWxlLCBib2R5KSB7XG4gICAgdGhpcy5hZGQoc3R5bGUsIGJvZHkpO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZ2V0RW1pdHRlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgIGxldCBzdHIgPSBcIlwiO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3RyICs9IFwiZW1pdHRlcjpcIiArIHRoaXMucHJvdG9uLmVtaXR0ZXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiZW0gc3BlZWQ6XCIgKyBlbWl0dGVyLmVtaXRTcGVlZCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwicG9zOlwiICsgdGhpcy5nZXRFbWl0dGVyUG9zKGVtaXR0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiaW5pdGlhbGl6ZXM6XCIgKyBlbWl0dGVyLmluaXRpYWxpemVzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcilcbiAgICAgICAgICBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuaW5pdGlhbGl6ZXMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiYmVoYXZpb3VyczpcIiArIGVtaXR0ZXIuYmVoYXZpb3Vycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5iZWhhdmlvdXJzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gcmVuZGVyZXIubmFtZSArIFwiPGJyPlwiO1xuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSBcImJvZHk6XCIgKyB0aGlzLmdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpICsgXCI8YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHIgKz0gXCJwYXJ0aWNsZXM6XCIgKyB0aGlzLnByb3Rvbi5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInBvb2w6XCIgKyB0aGlzLnByb3Rvbi5wb29sLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwidG90YWw6XCIgKyB0aGlzLnByb3Rvbi5wb29sLnRvdGFsO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHN0cjtcbiAgfVxuXG4gIGFkZChzdHlsZSwgYm9keSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7XCIsXG4gICAgICAgIFwib3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMDtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XCIsXG4gICAgICAgIFwid2lkdGg6MTIwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZC1jb2xvcjojMDAyO2NvbG9yOiMwZmY7XCJcbiAgICAgIF0uam9pbihcIlwiKTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICB0aGlzLnR5cGUrKztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID4gNCkgdGhpcy50eXBlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIGxldCBiZywgY29sb3I7XG4gICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBiZyA9IFwiIzIwMVwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjZjA4XCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGJnID0gXCIjMDIwXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZjBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJnID0gXCIjMDAyXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZmZcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gYmc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImNvbG9yXCJdID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBib2R5ID0gYm9keSB8fCB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLmVtaXR0ZXJzW3RoaXMuZW1pdHRlckluZGV4XTtcbiAgfVxuXG4gIGdldFJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5yZW5kZXJlcnNbdGhpcy5yZW5kZXJlckluZGV4XTtcbiAgfVxuXG4gIGNvbmNhdEFycihhcnIpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBpZiAoIWFyciB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gKGFycltpXS5uYW1lIHx8IFwiXCIpLnN1YnN0cigwLCAxKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSB7XG4gICAgcmV0dXJuIHJlbmRlcmVyLnBvb2wudG90YWwgfHwgKHJlbmRlcmVyLmNwb29sICYmIHJlbmRlcmVyLmNwb29sLnRvdGFsKSB8fCAwO1xuICB9XG5cbiAgZ2V0RW1pdHRlclBvcyhlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoZS5wLngpICsgXCIsXCIgKyBNYXRoLnJvdW5kKGUucC55KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdG9uID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qXG4gKiBFdmVudERpc3BhdGNoZXJcbiAqIFRoaXMgY29kZSByZWZlcmVuY2Ugc2luY2UgaHR0cDovL2NyZWF0ZWpzLmNvbS8uXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGJpbmQodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuICAgIHRhcmdldC5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIGNvbnN0IGFyciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIGZhc3RlciBjaGVja3MuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIGVsc2UgaWYgKHRoaXMuX2xpc3RlbmVycykgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG5cbiAgICBpZiAodHlwZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIGxldCBhcnIgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgICBpZiAoIWFycikgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgLy8gYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAvLyB0byBhdm9pZCBpc3N1ZXMgd2l0aCBpdGVtcyBiZWluZyByZW1vdmVkIG9yIGFkZGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcblxuICAgICAgbGV0IGhhbmRsZXI7XG4gICAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGhhbmRsZXIgPSBhcnJbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBoYW5kbGVyKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfVxuXG4gIGhhc0V2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiIsImNvbnN0IFBJID0gMy4xNDE1OTI2O1xuY29uc3QgSU5GSU5JVFkgPSBJbmZpbml0eTtcblxuY29uc3QgTWF0aFV0aWwgPSB7XG4gIFBJOiBQSSxcbiAgUEl4MjogUEkgKiAyLFxuICBQSV8yOiBQSSAvIDIsXG4gIFBJXzE4MDogUEkgLyAxODAsXG4gIE4xODBfUEk6IDE4MCAvIFBJLFxuICBJbmZpbml0eTogLTk5OSxcblxuICBpc0luZmluaXR5KG51bSkge1xuICAgIHJldHVybiBudW0gPT09IHRoaXMuSW5maW5pdHkgfHwgbnVtID09PSBJTkZJTklUWTtcbiAgfSxcblxuICByYW5kb21BVG9CKGEsIGIsIGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzSW50KSByZXR1cm4gYSArIE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpO1xuICAgIGVsc2UgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpID4+IDApICsgYTtcbiAgfSxcblxuICByYW5kb21GbG9hdGluZyhjZW50ZXIsIGYsIGlzSW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tQVRvQihjZW50ZXIgLSBmLCBjZW50ZXIgKyBmLCBpc0ludCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICgoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCkgPDwgMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XG4gIH0sXG5cbiAgcmFuZG9tWm9uZShkaXNwbGF5KSB7fSxcblxuICBmbG9vcihudW0sIGsgPSA0KSB7XG4gICAgY29uc3QgZGlnaXRzID0gTWF0aC5wb3coMTAsIGspO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRpZ2l0cykgLyBkaWdpdHM7XG4gIH0sXG5cbiAgZGVncmVlVHJhbnNmb3JtKGEpIHtcbiAgICByZXR1cm4gKGEgKiBQSSkgLyAxODA7XG4gIH0sXG5cbiAgdG9Db2xvcjE2KG51bSkge1xuICAgIHJldHVybiBgIyR7bnVtLnRvU3RyaW5nKDE2KX1gO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVncmF0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBjYWxjdWxhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgdGhpcy5ldWxlckludGVncmF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpO1xuICB9XG5cbiAgLy8gRXVsZXIgSW50ZWdyYXRlXG4gIC8vIGh0dHBzOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4gIGV1bGVySW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zbGVlcCkge1xuICAgICAgcGFydGljbGUub2xkLnAuY29weShwYXJ0aWNsZS5wKTtcbiAgICAgIHBhcnRpY2xlLm9sZC52LmNvcHkocGFydGljbGUudik7XG5cbiAgICAgIHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIoMSAvIHBhcnRpY2xlLm1hc3MpO1xuICAgICAgcGFydGljbGUudi5hZGQocGFydGljbGUuYS5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChwYXJ0aWNsZS5vbGQudi5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG5cbiAgICAgIGlmIChkYW1waW5nKSBwYXJ0aWNsZS52Lm11bHRpcGx5U2NhbGFyKGRhbXBpbmcpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9vbCBmcm9tIFwiLi9Qb29sXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFN0YXRzIGZyb20gXCIuLi9kZWJ1Zy9TdGF0c1wiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgSW50ZWdyYXRpb24gZnJvbSBcIi4uL21hdGgvSW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdG9uIHtcbiAgc3RhdGljIFVTRV9DTE9DSyA9IGZhbHNlO1xuXG4gIC8vIG1lYXN1cmUgMToxMDBcbiAgc3RhdGljIE1FQVNVUkUgPSAxMDA7XG4gIHN0YXRpYyBFVUxFUiA9IFwiZXVsZXJcIjtcbiAgc3RhdGljIFJLMiA9IFwicnVuZ2Uta3V0dGEyXCI7XG5cbiAgLy8gZXZlbnQgbmFtZVxuICBzdGF0aWMgUEFSVElDTEVfQ1JFQVRFRCA9IFwiUEFSVElDTEVfQ1JFQVRFRFwiO1xuICBzdGF0aWMgUEFSVElDTEVfVVBEQVRFID0gXCJQQVJUSUNMRV9VUERBVEVcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1NMRUVQID0gXCJQQVJUSUNMRV9TTEVFUFwiO1xuICBzdGF0aWMgUEFSVElDTEVfREVBRCA9IFwiUEFSVElDTEVfREVBRFwiO1xuXG4gIHN0YXRpYyBFTUlUVEVSX0FEREVEID0gXCJFTUlUVEVSX0FEREVEXCI7XG4gIHN0YXRpYyBFTUlUVEVSX1JFTU9WRUQgPSBcIkVNSVRURVJfUkVNT1ZFRFwiO1xuXG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFID0gXCJQUk9UT05fVVBEQVRFXCI7XG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFX0FGVEVSID0gXCJQUk9UT05fVVBEQVRFX0FGVEVSXCI7XG4gIHN0YXRpYyBERUZBVUxUX0lOVEVSVkFMID0gMC4wMTY3O1xuXG4gIHN0YXRpYyBhbWVuZENoYW5nZVRhYnNCdWcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdG8gYWRkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvciBQcm90b25cbiAgICpcbiAgICogQHRvZG8gYWRkIG1vcmUgZG9jdW1lbnRhdGlvbiBvZiB0aGUgc2luZ2xlIHByb3BlcnRpZXMgYW5kIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXIgfCB1bmRlZmluZWR9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGVtaXR0ZXJzICAgQWxsIGFkZGVkIGVtaXR0ZXJcbiAgICogQHByb3BlcnR5IHtBcnJheX0gcmVuZGVyZXJzICBBbGwgYWRkZWQgcmVuZGVyZXJcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgICAgICBUaGUgYWN0aXZlIHRpbWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9sZHRpbWUgICBUaGUgb2xkIHRpbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVncmF0aW9uVHlwZSkge1xuICAgIHRoaXMuZW1pdHRlcnMgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVycyA9IFtdO1xuXG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5vdyA9IDA7XG4gICAgdGhpcy50aGVuID0gMDtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cyh0aGlzKTtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCg4MCk7XG5cbiAgICB0aGlzLmludGVncmF0aW9uVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGludGVncmF0aW9uVHlwZSwgUHJvdG9uLkVVTEVSKTtcbiAgICB0aGlzLmludGVncmF0b3IgPSBuZXcgSW50ZWdyYXRpb24odGhpcy5pbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgdGhpcy5fZnBzID0gXCJhdXRvXCI7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBQcm90b24uREVGQVVMVF9JTlRFUlZBTDtcbiAgfVxuXG4gIHNldCBmcHMoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX2ludGVydmFsID0gZnBzID09PSBcImF1dG9cIiA/IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMIDogTWF0aFV0aWwuZmxvb3IoMSAvIGZwcywgNyk7XG4gIH1cblxuICBnZXQgZnBzKCkge1xuICAgIHJldHVybiB0aGlzLl9mcHM7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgYWRkUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgcmVuZGVyLmluaXQodGhpcyk7XG4gICAgdGhpcy5yZW5kZXJlcnMucHVzaChyZW5kZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIHJlbW92ZVJlbmRlcmVyKHJlbmRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZW5kZXJlcnMuaW5kZXhPZihyZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmVuZGVyLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgYWRkRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9BRERFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgcmVtb3ZlRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICByZW1vdmVFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZW1pdHRlcnMuaW5kZXhPZihlbWl0dGVyKTtcbiAgICB0aGlzLmVtaXR0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgZW1pdHRlci5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX1JFTU9WRUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWxsIGFkZGVkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgLy8gJ2F1dG8nIGlzIHRoZSBkZWZhdWx0IGJyb3dzZXIgcmVmcmVzaCByYXRlLCB0aGUgdmFzdCBtYWpvcml0eSBpcyA2MGZwc1xuICAgIGlmICh0aGlzLl9mcHMgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuXG4gICAgICBpZiAoUHJvdG9uLlVTRV9DTE9DSykge1xuICAgICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcbiAgICAgICAgLy8gRml4IGJ1Z3Mgc3VjaCBhcyBjaHJvbWUgYnJvd3NlciBzd2l0Y2hpbmcgdGFicyBjYXVzaW5nIGV4Y2Vzc2l2ZSB0aW1lIGRpZmZlcmVuY2VcbiAgICAgICAgdGhpcy5hbWVuZENoYW5nZVRhYnNCdWcoKTtcblxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkID4gMCkgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLmVsYXBzZWQpO1xuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUoUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmcHMgZnJhbWUgcmF0ZSBpcyBzZXRcbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG5cbiAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk3NjQwMTgvY29udHJvbGxpbmctZnBzLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lXG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93IC0gKHRoaXMuZWxhcHNlZCAlIHRoaXMuX2ludGVydmFsKSAqIDEwMDA7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW1pdHRlcnNVcGRhdGUoZWxhcHNlZCkge1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5lbWl0dGVyc1tpXS51cGRhdGUoZWxhcHNlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgYW1lbmRDaGFuZ2VUYWJzQnVnXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBhbWVuZENoYW5nZVRhYnNCdWcoKSB7XG4gICAgaWYgKCFQcm90b24uYW1lbmRDaGFuZ2VUYWJzQnVnKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZWxhcHNlZCA+IDAuNSkge1xuICAgICAgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgYWxsIHBhcnRpY2xlcyBmcm9tIGFsbCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB0b3RhbCArPSB0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgZ2V0QWxsUGFydGljbGVzKCkge1xuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgcGFydGljbGVzID0gcGFydGljbGVzLmNvbmNhdCh0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcyk7XG4gICAgcmV0dXJuIHBhcnRpY2xlcztcbiAgfVxuXG4gIGRlc3Ryb3lBbGxFbWl0dGVycygpIHtcbiAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoaXMgUHJvdG9uIGluc3RhbmNlLiBUaGlzIGluY2x1ZGVzIGFsbCBlbWl0dGVycywgYW5kIGFsbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveShyZW1vdmUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRlc3Ryb3lPdGhlciA9ICgpID0+IHtcbiAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICB0aGlzLnRoZW4gPSAwO1xuICAgICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc3RhdHMuZGVzdHJveSgpO1xuXG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5yZW5kZXJlcnMsIHRoaXMuZ2V0QWxsUGFydGljbGVzKCkpO1xuXG4gICAgICB0aGlzLmludGVncmF0b3IgPSBudWxsO1xuICAgICAgdGhpcy5yZW5kZXJlcnMgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0dGVycyA9IG51bGw7XG4gICAgICB0aGlzLnN0YXRzID0gbnVsbDtcbiAgICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoZGVzdHJveU90aGVyLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95T3RoZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoUHJvdG9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJnYiB7XG4gIGNvbnN0cnVjdG9yKHIgPSAyNTUsIGcgPSAyNTUsIGIgPSAyNTUpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuciA9IDI1NTtcbiAgICB0aGlzLmcgPSAyNTU7XG4gICAgdGhpcy5iID0gMjU1O1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNwYW4gb2YgdmFsdWVzIG9yIGFuIGFycmF5LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNBcnJheTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcnxudW1iZXJbXX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGE7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBiO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNlbnRlcjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBTcGFuIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcnxudW1iZXJbXX0gYSAtIFRoZSBmaXJzdCB2YWx1ZSBvciBhbiBhcnJheSBvZiB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbYl0gLSBUaGUgc2Vjb25kIHZhbHVlIChpZiBhIGlzIG5vdCBhbiBhcnJheSkuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcj1mYWxzZV0gLSBXaGV0aGVyIHRvIHVzZSBjZW50ZXItYmFzZWQgY2FsY3VsYXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjZW50ZXIpIHtcbiAgICBpZiAoVXRpbC5pc0FycmF5KGEpKSB7XG4gICAgICB0aGlzLmlzQXJyYXkgPSB0cnVlO1xuICAgICAgdGhpcy5hID0gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0FycmF5ID0gZmFsc2U7XG4gICAgICB0aGlzLmEgPSBVdGlsLmluaXRWYWx1ZShhLCAxKTtcbiAgICAgIHRoaXMuYiA9IFV0aWwuaW5pdFZhbHVlKGIsIHRoaXMuYSk7XG4gICAgICB0aGlzLmNlbnRlciA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlciwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgdmFsdWUgZnJvbSB0aGUgc3Bhbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNJbnQ9ZmFsc2VdIC0gV2hldGhlciB0byByZXR1cm4gYW4gaW50ZWdlciB2YWx1ZS5cbiAgICogQHJldHVybnMge251bWJlcn0gQSByYW5kb20gdmFsdWUgZnJvbSB0aGUgc3Bhbi5cbiAgICovXG4gIGdldFZhbHVlKGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5pc0FycmF5KSB7XG4gICAgICByZXR1cm4gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5jZW50ZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlsLnJhbmRvbUFUb0IodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21GbG9hdGluZyh0aGlzLmEsIHRoaXMuYiwgaXNJbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IFNwYW4gb2JqZWN0LlxuICAgKiBAcGFyYW0geyp8U3Bhbn0gYSAtIFRoZSBmaXJzdCB2YWx1ZSBvciBhIFNwYW4gb2JqZWN0LlxuICAgKiBAcGFyYW0geyp9IFtiXSAtIFRoZSBzZWNvbmQgdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gW2NdIC0gVGhlIHRoaXJkIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7U3Bhbn0gQSBuZXcgU3BhbiBpbnN0YW5jZS5cbiAgICovXG4gIHN0YXRpYyBzZXRTcGFuVmFsdWUoYSwgYiwgYykge1xuICAgIGlmIChhIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcGFuKGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTcGFuKGEsIGIpO1xuICAgICAgICBlbHNlIHJldHVybiBuZXcgU3BhbihhLCBiLCBjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgZnJvbSBhIFNwYW4sIGlmIHRoZSBwYXJhbSBpcyBub3QgYSBTcGFuIGl0IHdpbGwgcmV0dXJuIHRoZSBnaXZlbiBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7KnxTcGFufSBwYW4gLSBUaGUgdmFsdWUgb3IgU3BhbiB0byBnZXQgdGhlIHZhbHVlIGZyb20uXG4gICAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgb2YgU3BhbiBPUiB0aGUgcGFyYW1ldGVyIGlmIGl0IGlzIG5vdCBhIFNwYW4uXG4gICAqL1xuICBzdGF0aWMgZ2V0U3BhblZhbHVlKHBhbikge1xuICAgIHJldHVybiBwYW4gaW5zdGFuY2VvZiBTcGFuID8gcGFuLmdldFZhbHVlKCkgOiBwYW47XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBoYXNQcm9wKHRhcmdldCwga2V5KSB7XG4gICAgaWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KGtleSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNldCB0aGUgcHJvdG90eXBlIGluIGEgZ2l2ZW4gcHJvdG90eXBlT2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRQcm9wXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gdHJhbnNsYXRlIGRlc3JpcHRpb24gZnJvbSBjaGluZXNlIHRvIGVuZ2xpc2hcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlT2JqZWN0IEFuIG9iamVjdCBvZiBzaW5nbGUgcHJvdG90eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHRhcmdldFxuICAgKi9cbiAgc2V0UHJvcCh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSBTcGFuLmdldFNwYW5WYWx1ZShwcm9wc1twcm9wXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFZlY3RvclZhbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYGNvbmZgXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZlxuICAgKi9cbiAgc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBjb25mID0gbnVsbCkge1xuICAgIGlmICghY29uZikgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInhcIikpIHBhcnRpY2xlLnAueCA9IGNvbmZbXCJ4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ5XCIpKSBwYXJ0aWNsZS5wLnkgPSBjb25mW1wieVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2eFwiKSkgcGFydGljbGUudi54ID0gY29uZltcInZ4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2eVwiKSkgcGFydGljbGUudi55ID0gY29uZltcInZ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImF4XCIpKSBwYXJ0aWNsZS5hLnggPSBjb25mW1wiYXhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImF5XCIpKSBwYXJ0aWNsZS5hLnkgPSBjb25mW1wiYXlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicFwiKSkgcGFydGljbGUucC5jb3B5KGNvbmZbXCJwXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidlwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2XCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYVwiKSkgcGFydGljbGUuYS5jb3B5KGNvbmZbXCJhXCJdKTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwb3NpdGlvblwiKSkgcGFydGljbGUucC5jb3B5KGNvbmZbXCJwb3NpdGlvblwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZlbG9jaXR5XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZlbG9jaXR5XCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYWNjZWxlcmF0ZVwiKSkgcGFydGljbGUuYS5jb3B5KGNvbmZbXCJhY2NlbGVyYXRlXCJdKTtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVhc2VMaW5lYXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG5cbiAgZWFzZUluUXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMik7XG4gIH0sXG5cbiAgZWFzZU91dFF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDIpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhZCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMik7XG5cbiAgICByZXR1cm4gLTAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJbkN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAzKTtcbiAgfSxcblxuICBlYXNlT3V0Q3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUgLSAxLCAzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q3ViaWModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDMpO1xuXG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdyh2YWx1ZSAtIDIsIDMpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluUXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDQpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgNCkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFydCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG5cbiAgICByZXR1cm4gLTAuNSAqICgodmFsdWUgLT0gMikgKiBNYXRoLnBvdyh2YWx1ZSwgMykgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5TaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC1NYXRoLmNvcyh2YWx1ZSAqIE1hdGhVdGlsLlBJXzIpICsgMTtcbiAgfSxcblxuICBlYXNlT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNpbih2YWx1ZSAqIE1hdGhVdGlsLlBJXzIpO1xuICB9LFxuXG4gIGVhc2VJbk91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLTAuNSAqIChNYXRoLmNvcyhNYXRoLlBJICogdmFsdWUpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluRXhwbyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcbiAgfSxcblxuICBlYXNlT3V0RXhwbyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdmFsdWUpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRFeHBvKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKSByZXR1cm4gMDtcblxuICAgIGlmICh2YWx1ZSA9PT0gMSkgcmV0dXJuIDE7XG5cbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG5cbiAgICByZXR1cm4gMC41ICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXZhbHVlKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJbkNpcmModmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZU91dENpcmModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdyh2YWx1ZSAtIDEsIDIpKTtcbiAgfSxcblxuICBlYXNlSW5PdXRDaXJjKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAodmFsdWUgLT0gMikgKiB2YWx1ZSkgKyAxKTtcbiAgfSxcblxuICBlYXNlSW5CYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiB2YWx1ZSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSAtIHMpO1xuICB9LFxuXG4gIGVhc2VPdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiAodmFsdWUgPSB2YWx1ZSAtIDEpICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlICsgcykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqICh2YWx1ZSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlIC0gcykpO1xuICAgIHJldHVybiAwLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgKyBzKSArIDIpO1xuICB9LFxuXG4gIGdldEVhc2luZyhlYXNlKSB7XG4gICAgaWYgKHR5cGVvZiBlYXNlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBlYXNlO1xuICAgIGVsc2UgcmV0dXJuIHRoaXNbZWFzZV0gfHwgdGhpcy5lYXNlTGluZWFyO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjJEIHtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHg7XG5cbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgVmVjdG9yMkQgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSAtIFRoZSB4IGNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSAtIFRoZSB5IGNvb3JkaW5hdGUuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geCB8fCAwO1xuICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB4IGFuZCB5IGNvbXBvbmVudHMgb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHggY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeSBjb29yZGluYXRlLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgc2V0KHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgeCBjb21wb25lbnQgb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHggY29vcmRpbmF0ZS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHNldFgoeCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgeSBjb21wb25lbnQgb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgY29vcmRpbmF0ZS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHNldFkoeSkge1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZ3JhZGllbnQgKGFuZ2xlKSBvZiB0aGlzIHZlY3Rvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGdyYWRpZW50IGluIHJhZGlhbnMuXG4gICAqL1xuICBnZXRHcmFkaWVudCgpIHtcbiAgICBpZiAodGhpcy54ICE9PSAwKSByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgZWxzZSBpZiAodGhpcy55ID4gMCkgcmV0dXJuIE1hdGhVdGlsLlBJXzI7XG4gICAgZWxzZSBpZiAodGhpcy55IDwgMCkgcmV0dXJuIC1NYXRoVXRpbC5QSV8yO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGFub3RoZXIgdmVjdG9yIHRvIHRoaXMgb25lLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIHZlY3RvciB0byBjb3B5IGZyb20uXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBjb3B5KHYpIHtcbiAgICB0aGlzLnggPSB2Lng7XG4gICAgdGhpcy55ID0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSB2ZWN0b3IgdG8gYWRkLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbd10gLSBBbiBvcHRpb25hbCBzZWNvbmQgdmVjdG9yIHRvIGFkZC5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGFkZCh2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggKz0gdi54O1xuICAgIHRoaXMueSArPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHNjYWxhciB2YWx1ZXMgdG8gdGhpcyB2ZWN0b3IncyBjb21wb25lbnRzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYSAtIFZhbHVlIHRvIGFkZCB0byB4LlxuICAgKiBAcGFyYW0ge251bWJlcn0gYiAtIFZhbHVlIHRvIGFkZCB0byB5LlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgYWRkWFkoYSwgYikge1xuICAgIHRoaXMueCArPSBhO1xuICAgIHRoaXMueSArPSBiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0d28gdmVjdG9ycyBhbmQgc2V0cyB0aGUgcmVzdWx0IHRvIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBhIC0gVGhlIGZpcnN0IHZlY3RvciB0byBhZGQuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IGIgLSBUaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBhZGRWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggKyBiLng7XG4gICAgdGhpcy55ID0gYS55ICsgYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgdmVjdG9yIHRvIHN1YnRyYWN0LlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbd10gLSBBbiBvcHRpb25hbCBzZWNvbmQgdmVjdG9yIHRvIHN1YnRyYWN0LlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgc3ViKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gYW5vdGhlciBhbmQgc2V0cyB0aGUgcmVzdWx0IHRvIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBhIC0gVGhlIHZlY3RvciB0byBzdWJ0cmFjdCBmcm9tLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBiIC0gVGhlIHZlY3RvciB0byBzdWJ0cmFjdC5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHN1YlZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCAtIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgLSBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHRoaXMgdmVjdG9yIGJ5IGEgc2NhbGFyLlxuICAgKiBAcGFyYW0ge251bWJlcn0gcyAtIFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5LlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgZGl2aWRlU2NhbGFyKHMpIHtcbiAgICBpZiAocyAhPT0gMCkge1xuICAgICAgdGhpcy54IC89IHM7XG4gICAgICB0aGlzLnkgLz0gcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQoMCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbGllcyB0aGlzIHZlY3RvciBieSBhIHNjYWxhci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgLSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJ5LlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgbXVsdGlwbHlTY2FsYXIocykge1xuICAgIHRoaXMueCAqPSBzO1xuICAgIHRoaXMueSAqPSBzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTmVnYXRlcyB0aGlzIHZlY3RvciAoaW52ZXJ0cyBpdHMgZGlyZWN0aW9uKS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIG5lZ2F0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcigtMSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3Igd2l0aCBhbm90aGVyLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIG90aGVyIHZlY3Rvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGRvdCBwcm9kdWN0LlxuICAgKi9cbiAgZG90KHYpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgc3F1YXJlZCBsZW5ndGguXG4gICAqL1xuICBsZW5ndGhTcSgpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGxlbmd0aC5cbiAgICovXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGlzIHZlY3RvciAobWFrZXMgaXQgdW5pdCBsZW5ndGgpLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgbm9ybWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSB0byBhbm90aGVyIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSBvdGhlciB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkaXN0YW5jZS5cbiAgICovXG4gIGRpc3RhbmNlVG8odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVRvU3F1YXJlZCh2KSk7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlcyB0aGlzIHZlY3RvciBieSBhbiBhbmdsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRoYSAtIFRoZSBhbmdsZSB0byByb3RhdGUgYnkgKGluIHJhZGlhbnMpLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgcm90YXRlKHRoYSkge1xuICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgY29uc3QgeSA9IHRoaXMueTtcblxuICAgIHRoaXMueCA9IHggKiBNYXRoLmNvcyh0aGEpICsgeSAqIE1hdGguc2luKHRoYSk7XG4gICAgdGhpcy55ID0gLXggKiBNYXRoLnNpbih0aGEpICsgeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGRpc3RhbmNlIHRvIGFub3RoZXIgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIG90aGVyIHZlY3Rvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIHNxdWFyZWQgZGlzdGFuY2UuXG4gICAqL1xuICBkaXN0YW5jZVRvU3F1YXJlZCh2KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSB2Lng7XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSB2Lnk7XG5cbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gIH1cblxuICAvKipcbiAgICogTGluZWFybHkgaW50ZXJwb2xhdGVzIHRoaXMgdmVjdG9yIHRvd2FyZCBhbm90aGVyIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSB0YXJnZXQgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYWxwaGEgLSBUaGUgaW50ZXJwb2xhdGlvbiBmYWN0b3IgKDAtMSkuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBsZXJwKHYsIGFscGhhKSB7XG4gICAgdGhpcy54ICs9ICh2LnggLSB0aGlzLngpICogYWxwaGE7XG4gICAgdGhpcy55ICs9ICh2LnkgLSB0aGlzLnkpICogYWxwaGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhpcyB2ZWN0b3IgaXMgZXF1YWwgdG8gYW5vdGhlciB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgb3RoZXIgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYueCA9PT0gdGhpcy54ICYmIHYueSA9PT0gdGhpcy55O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhpcyB2ZWN0b3IgdG8gemVyby5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMueCA9IDAuMDtcbiAgICB0aGlzLnkgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB2ZWN0b3Igd2l0aCB0aGUgc2FtZSB4IGFuZCB5IHZhbHVlcyBhcyB0aGlzIG9uZS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBBIG5ldyBWZWN0b3IyRCBpbnN0YW5jZS5cbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xuICB9XG59XG4iLCJpbXBvcnQgUmdiIGZyb20gXCIuLi91dGlscy9SZ2JcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFByb3BVdGlsIGZyb20gXCIuLi91dGlscy9Qcm9wVXRpbFwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4uL21hdGgvZWFzZVwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGFydGljbGUgaW4gYSBwYXJ0aWNsZSBzeXN0ZW0uXG4gKiBAY2xhc3MgUGFydGljbGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xuICAvKiogQHR5cGUge3N0cmluZ30gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBwYXJ0aWNsZSAqL1xuICBpZCA9IFwiXCI7XG5cbiAgLyoqIEB0eXBlIHt7cDpWZWN0b3IyRCx2OlZlY3RvcjJELGE6VmVjdG9yMkR9fSBPbGQgc3RhdGUgb2YgdGhlIHBhcnRpY2xlICovXG4gIG9sZCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtvYmplY3R9IEN1c3RvbSBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgcGFydGljbGUgKi9cbiAgZGF0YSA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtCZWhhdmlvdXJbXX0gQXJyYXkgb2YgYmVoYXZpb3VycyBhcHBsaWVkIHRvIHRoZSBwYXJ0aWNsZSAqL1xuICBiZWhhdmlvdXJzID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSBDdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBwYXJ0aWNsZSAqL1xuICBwID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSBDdXJyZW50IHZlbG9jaXR5IG9mIHRoZSBwYXJ0aWNsZSAqL1xuICB2ID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSBDdXJyZW50IGFjY2VsZXJhdGlvbiBvZiB0aGUgcGFydGljbGUgKi9cbiAgYSA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtSZ2J9IENvbG9yIG9mIHRoZSBwYXJ0aWNsZSAqL1xuICByZ2IgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBhcnRpY2xlIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZdIENvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciB0aGUgcGFydGljbGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICB0aGlzLm5hbWUgPSBcIlBhcnRpY2xlXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgICB0aGlzLm9sZCA9IHt9O1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuXG4gICAgdGhpcy5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5hID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5hID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICB0aGlzLnJnYiA9IG5ldyBSZ2IoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgY29uZiAmJiBQcm9wVXRpbC5zZXRQcm9wKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRpcmVjdGlvbiBvZiB0aGUgcGFydGljbGUncyBtb3ZlbWVudCBpbiBkZWdyZWVzLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZGlyZWN0aW9uIGluIGRlZ3JlZXNcbiAgICovXG4gIGdldERpcmVjdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnYueCwgLXRoaXMudi55KSAqIE1hdGhVdGlsLk4xODBfUEk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBwYXJ0aWNsZSB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cbiAgICogQHJldHVybnMge1BhcnRpY2xlfSBUaGUgcGFydGljbGUgaW5zdGFuY2VcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubGlmZSA9IEluZmluaXR5O1xuICAgIHRoaXMuYWdlID0gMDtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuc2xlZXAgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkgPSBudWxsO1xuICAgIHRoaXMuc3ByaXRlID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmVuZXJneSA9IDE7IC8vIEVuZXJneSBMb3NzXG4gICAgdGhpcy5tYXNzID0gMTtcbiAgICB0aGlzLnJhZGl1cyA9IDEwO1xuICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMuY29sb3IgPSBudWxsO1xuXG4gICAgdGhpcy5wLnNldCgwLCAwKTtcbiAgICB0aGlzLnYuc2V0KDAsIDApO1xuICAgIHRoaXMuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQucC5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmVhc2VMaW5lYXI7XG5cbiAgICB0aGlzLnJnYi5yZXNldCgpO1xuICAgIFV0aWwuZW1wdHlPYmplY3QodGhpcy5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBhcnRpY2xlJ3Mgc3RhdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFRoZSB0aW1lIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdXBkYXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIHBhcnRpY2xlIGluIGl0cyBwYXJlbnQgc3lzdGVtXG4gICAqL1xuICB1cGRhdGUodGltZSwgaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcbiAgICAgIHRoaXMuYWdlICs9IHRpbWU7XG4gICAgICB0aGlzLmFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWdlIDwgdGhpcy5saWZlKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHRoaXMuYWdlIC8gdGhpcy5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYWxsIGJlaGF2aW91cnMgYXR0YWNoZWQgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHVwZGF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBwYXJ0aWNsZSBpbiBpdHMgcGFyZW50IHN5c3RlbVxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXJzKHRpbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5iZWhhdmlvdXJzW2ldICYmIHRoaXMuYmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBiZWhhdmlvdXIgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIFRoZSBiZWhhdmlvdXIgdG8gYWRkXG4gICAqL1xuICBhZGRCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcblxuICAgIGlmIChiZWhhdmlvdXIuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRzXCIpKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbXVsdGlwbGUgYmVoYXZpb3VycyB0byB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyW119IGJlaGF2aW91cnMgQW4gYXJyYXkgb2YgYmVoYXZpb3VycyB0byBhZGRcbiAgICovXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJlaGF2aW91cnMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZEJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHNwZWNpZmljIGJlaGF2aW91ciBmcm9tIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBUaGUgYmVoYXZpb3VyIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCBiZWhhdmlvdXIgPSB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGJlaGF2aW91ci5wYXJlbnRzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgYmVoYXZpb3VycyBmcm9tIHRoZSBwYXJ0aWNsZS5cbiAgICovXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuYmVoYXZpb3Vycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHBhcnRpY2xlLCByZW1vdmluZyBhbGwgYmVoYXZpb3VycyBhbmQgc2V0dGluZyBpdCBhcyBkZWFkLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcbiAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmICB7T2JqZWN0fSByZ2JPYmplY3RcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHIgcmVkIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBnIGdyZWVuIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBiIGJsdWUgdmFsdWVcbiAgICovXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIHJnYiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGhleFRvUmdiXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoIGFueSBoZXggdmFsdWUsIGUuZy4gIzAwMDAwMCBvciAwMDAwMDAgZm9yIGJsYWNrXG4gICAqXG4gICAqIEByZXR1cm4ge3JnYk9iamVjdH1cbiAgICovXG4gIGhleFRvUmdiKGgpIHtcbiAgICBjb25zdCBoZXgxNiA9IGguY2hhckF0KDApID09PSBcIiNcIiA/IGguc3Vic3RyaW5nKDEsIDcpIDogaDtcbiAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoNCwgNiksIDE2KTtcblxuICAgIHJldHVybiB7IHIsIGcsIGIgfTtcbiAgfSxcblxuICAvKipcbiAgICogY29udmVydHMgYSByZ2IgdmFsdWUgdG8gYSByZ2Igc3RyaW5nXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCByZ2JUb0hleFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdCB8IFByb3Rvbi5oZXhUb1JnYn0gcmdiIGEgcmdiIG9iamVjdCBsaWtlIGluIHtAbGluayBQcm90b24jUHJvdG9uLn1cbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfSByZ2IoKVxuICAgKi9cbiAgcmdiVG9IZXgocmJnKSB7XG4gICAgcmV0dXJuIGByZ2IoJHtyYmcucn0sICR7cmJnLmd9LCAke3JiZy5ifSlgO1xuICB9LFxuXG4gIGdldEhleDE2RnJvbVBhcnRpY2xlKHApIHtcbiAgICByZXR1cm4gTnVtYmVyKHAucmdiLnIpICogNjU1MzYgKyBOdW1iZXIocC5yZ2IuZykgKiAyNTYgKyBOdW1iZXIocC5yZ2IuYik7XG4gIH1cbn07XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sYXIyRCB7XG4gIGNvbnN0cnVjdG9yKHIsIHRoYSkge1xuICAgIHRoaXMuciA9IE1hdGguYWJzKHIpIHx8IDA7XG4gICAgdGhpcy50aGEgPSB0aGEgfHwgMDtcbiAgfVxuXG4gIHNldChyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UihyKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRoYSh0aGEpIHtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvcHkocCkge1xuICAgIHRoaXMuciA9IHAucjtcbiAgICB0aGlzLnRoYSA9IHAudGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9WZWN0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLmdldFgoKSwgdGhpcy5nZXRZKCkpO1xuICB9XG5cbiAgZ2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5yICogTWF0aC5zaW4odGhpcy50aGEpO1xuICB9XG5cbiAgZ2V0WSgpIHtcbiAgICByZXR1cm4gLXRoaXMuciAqIE1hdGguY29zKHRoaXMudGhhKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICB0aGlzLnIgPSAxO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi5yID09PSB0aGlzLnIgJiYgdi50aGEgPT09IHRoaXMudGhhO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yID0gMC4wO1xuICAgIHRoaXMudGhhID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2xhcjJEKHRoaXMuciwgdGhpcy50aGEpO1xuICB9XG59XG4iLCJjb25zdCBNYXQzID0ge1xuICBjcmVhdGUobWF0Mykge1xuICAgIGNvbnN0IG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoOSk7XG4gICAgaWYgKG1hdDMpIHRoaXMuc2V0KG1hdDMsIG1hdCk7XG5cbiAgICByZXR1cm4gbWF0O1xuICB9LFxuXG4gIHNldChtYXQxLCBtYXQyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIG1hdDJbaV0gPSBtYXQxW2ldO1xuXG4gICAgcmV0dXJuIG1hdDI7XG4gIH0sXG5cbiAgbXVsdGlwbHkobWF0LCBtYXQyLCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGEwMiA9IG1hdFsyXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMCA9IG1hdDJbMF0sXG4gICAgICBiMDEgPSBtYXQyWzFdLFxuICAgICAgYjAyID0gbWF0MlsyXSxcbiAgICAgIGIxMCA9IG1hdDJbM10sXG4gICAgICBiMTEgPSBtYXQyWzRdLFxuICAgICAgYjIwID0gbWF0Mls2XSxcbiAgICAgIGIyMSA9IG1hdDJbN107XG5cbiAgICBtYXQzWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwO1xuICAgIG1hdDNbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTE7XG4gICAgbWF0M1syXSA9IGEwMiAqIGIwMjtcbiAgICBtYXQzWzNdID0gYjEwICogYTAwICsgYjExICogYTEwO1xuICAgIG1hdDNbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTE7XG4gICAgbWF0M1s2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGEyMDtcbiAgICBtYXQzWzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYTIxO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgaW52ZXJzZShtYXQsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAxID0gYTExLFxuICAgICAgYjExID0gLWExMCxcbiAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcbiAgICAgIGQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEsXG4gICAgICBpZDtcblxuICAgIGlkID0gMSAvIGQ7XG4gICAgbWF0M1swXSA9IGIwMSAqIGlkO1xuICAgIG1hdDNbMV0gPSAtYTAxICogaWQ7XG4gICAgbWF0M1szXSA9IGIxMSAqIGlkO1xuICAgIG1hdDNbNF0gPSBhMDAgKiBpZDtcbiAgICBtYXQzWzZdID0gYjIxICogaWQ7XG4gICAgbWF0M1s3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGlkO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgbXVsdGlwbHlWZWMyKG0sIHZlYywgbWF0Mykge1xuICAgIGxldCB4ID0gdmVjWzBdLFxuICAgICAgeSA9IHZlY1sxXTtcblxuICAgIG1hdDNbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgbVs2XTtcbiAgICBtYXQzWzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIG1bN107XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0MztcbiIsImltcG9ydCBTcGFuIGZyb20gXCIuL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXlTcGFuIGV4dGVuZHMgU3BhbiB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9hcnIgPSBVdGlsLnRvQXJyYXkoY29sb3IpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgY29uc3QgdmFsID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuX2Fycik7XG4gICAgcmV0dXJuIHZhbCA9PT0gXCJyYW5kb21cIiB8fCB2YWwgPT09IFwiUmFuZG9tXCIgPyBNYXRoVXRpbC5yYW5kb21Db2xvcigpIDogdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSB0aGF0IHRoZSBjb2xvciBpcyBhbiBpbnN0YW5jZSBvZiBQcm90b24uQXJyYXlTcGFuLCBpZiBub3QgaXQgbWFrZXMgYSBuZXcgaW5zdGFuY2VcbiAgICpcbiAgICogQG1ldGhvZCBzZXRTcGFuVmFsdWVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFycmF5U3BhbihhcnIpIHtcbiAgICBpZiAoIWFycikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoYXJyIGluc3RhbmNlb2YgQXJyYXlTcGFuKSByZXR1cm4gYXJyO1xuICAgIGVsc2UgcmV0dXJuIG5ldyBBcnJheVNwYW4oYXJyKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMud2lkdGggPSB3O1xuICAgIHRoaXMuaGVpZ2h0ID0gaDtcblxuICAgIHRoaXMuYm90dG9tID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gIH1cblxuICBjb250YWlucyh4LCB5KSB7XG4gICAgaWYgKHggPD0gdGhpcy5yaWdodCAmJiB4ID49IHRoaXMueCAmJiB5IDw9IHRoaXMuYm90dG9tICYmIHkgPj0gdGhpcy55KSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuLyoqXG4gKiBSYXRlIGNsYXNzIGZvciBjb250cm9sbGluZyBwYXJ0aWNsZSBlbWlzc2lvbiByYXRlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRlIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbnVtUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRpbWVQYW47XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGFydFRpbWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBuZXh0VGltZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBSYXRlIGluc3RhbmNlLlxuICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXNzaW9uIChhIFtwYXJ0aWNsZV0vYiBbc10pLlxuICAgKiBAcGFyYW0ge0FycmF5fG51bWJlcnxTcGFufSBbbnVtcGFuPTFdIC0gVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgZm9yIGVhY2ggZW1pc3Npb24uXG4gICAqIEBwYXJhbSB7QXJyYXl8bnVtYmVyfFNwYW59IFt0aW1lcGFuPTFdIC0gVGhlIHRpbWUgaW50ZXJ2YWwgYmV0d2VlbiBlYWNoIGVtaXNzaW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBDcmVhdGUgYSByYXRlIG9mIDEwLTIwIHBhcnRpY2xlcyBldmVyeSAwLjEtMC4yNSBzZWNvbmRzXG4gICAqIG5ldyBSYXRlKG5ldyBTcGFuKDEwLCAyMCksIG5ldyBTcGFuKDAuMSwgMC4yNSkpO1xuICAgKi9cbiAgY29uc3RydWN0b3IobnVtcGFuLCB0aW1lcGFuKSB7XG4gICAgdGhpcy5udW1QYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShudW1wYW4sIDEpKTtcbiAgICB0aGlzLnRpbWVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZSh0aW1lcGFuLCAxKSk7XG5cbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IDA7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHJhdGUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBlbWl0IGJhc2VkIG9uIHRoZSBlbGFwc2VkIHRpbWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGVsYXBzZWQgdGltZSBzaW5jZSB0aGUgbGFzdCB1cGRhdGUuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXQuXG4gICAqL1xuICBnZXRWYWx1ZSh0aW1lKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA+PSB0aGlzLm5leHRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG5cbiAgICAgIGlmICh0aGlzLm51bVBhbi5iID09PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLm51bVBhbi5nZXRWYWx1ZShmYWxzZSkgPiAwLjUpIHJldHVybiAxO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtUGFuLmdldFZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXplIHtcbiAgcmVzZXQoKSB7fVxuXG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShlbWl0dGVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBzdWIgY2xhc3MgaW5pdFxuICBpbml0aWFsaXplKHRhcmdldCkge31cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuLyoqXG4gKiBMaWZlIGNsYXNzIGZvciBpbml0aWFsaXppbmcgcGFydGljbGUgbGlmZXRpbWUuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZmUgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGlmZVBhbjtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTGlmZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gYSAtIFRoZSBsaWZldGltZSB2YWx1ZSBvciB0aGUgbG93ZXIgYm91bmQgb2YgdGhlIGxpZmV0aW1lIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JdIC0gVGhlIHVwcGVyIGJvdW5kIG9mIHRoZSBsaWZldGltZSByYW5nZSAoaWYgYSBpcyBhIG51bWJlcikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NdIC0gV2hldGhlciB0byB1c2UgY2VudGVyLWJhc2VkIGNhbGN1bGF0aW9uIChpZiBhIGFuZCBiIGFyZSBudW1iZXJzKS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5saWZlUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJMaWZlXCI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGxpZmV0aW1lIG9mIGEgdGFyZ2V0IHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gVGhlIHRhcmdldCBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5saWZlUGFuLmEgPT09IEluZmluaXR5KSB0YXJnZXQubGlmZSA9IEluZmluaXR5O1xuICAgIGVsc2UgdGFyZ2V0LmxpZmUgPSB0aGlzLmxpZmVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgICB0aGlzLnJhbmRvbSA9IDA7XG4gICAgdGhpcy5jcm9zc1R5cGUgPSBcImRlYWRcIjtcbiAgICB0aGlzLmFsZXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge31cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudmVjdG9yID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCB6b25lIGluIGEgMkQgc3BhY2UuXG4gKiBAZXh0ZW5kcyBab25lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50Wm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQb2ludFpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy54ID0geDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHBvc2l0aW9uIHZlY3Rvci5cbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLng7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIGZvciBQb2ludFpvbmUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSBvYmplY3QgKHVudXNlZCkuXG4gICAqL1xuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIFBvaW50Wm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzaW5nIG1ldGhvZCFcIik7XG4gICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuLyoqXG4gKiBQb3NpdGlvbiBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIHBvc2l0aW9ucy5cbiAqIEBleHRlbmRzIEluaXRpYWxpemVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtQb2ludFpvbmV8YW55fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgem9uZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUG9zaXRpb24gaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7UG9pbnRab25lfGFueX0gW3pvbmVdIC0gVGhlIHpvbmUgdG8gdXNlIGZvciBwb3NpdGlvbmluZy4gRGVmYXVsdHMgdG8gYSBuZXcgUG9pbnRab25lIGlmIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHpvbmUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuem9uZSA9IFV0aWwuaW5pdFZhbHVlKHpvbmUsIG5ldyBQb2ludFpvbmUoKSk7XG4gICAgdGhpcy5uYW1lID0gXCJQb3NpdGlvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGlzIGluaXRpYWxpemVyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtQb2ludFpvbmV8YW55fSBbem9uZV0gLSBUaGUgbmV3IHpvbmUgdG8gdXNlIGZvciBwb3NpdGlvbmluZy4gRGVmYXVsdHMgdG8gYSBuZXcgUG9pbnRab25lIGlmIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIHJlc2V0KHpvbmUpIHtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQucCAtIFRoZSBwYXJ0aWNsZSdzIHBvc2l0aW9uIG9iamVjdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldC5wLnggLSBUaGUgcGFydGljbGUncyB4IGNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXQucC55IC0gVGhlIHBhcnRpY2xlJ3MgeSBjb29yZGluYXRlLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0aGlzLnpvbmUuZ2V0UG9zaXRpb24oKTtcblxuICAgIHRhcmdldC5wLnggPSB0aGlzLnpvbmUudmVjdG9yLng7XG4gICAgdGFyZ2V0LnAueSA9IHRoaXMuem9uZS52ZWN0b3IueTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuLyoqXG4gKiBWZWxvY2l0eSBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIHZlbG9jaXRpZXMuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbG9jaXR5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJQYW47XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhhUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBWZWxvY2l0eSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW3JwYW5dIC0gVGhlIHJhZGlhbCBjb21wb25lbnQgb2YgdGhlIHZlbG9jaXR5IG9yIGl0cyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW3RoYXBhbl0gLSBUaGUgYW5ndWxhciBjb21wb25lbnQgb2YgdGhlIHZlbG9jaXR5IG9yIGl0cyByYW5nZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPSd2ZWN0b3InXSAtIFRoZSB0eXBlIG9mIHZlbG9jaXR5ICgndmVjdG9yJyBvciAncG9sYXInKS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlZlbG9jaXR5XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSB2ZWxvY2l0eSBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbcnBhbl0gLSBUaGUgcmFkaWFsIGNvbXBvbmVudCBvZiB0aGUgdmVsb2NpdHkgb3IgaXRzIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbdGhhcGFuXSAtIFRoZSBhbmd1bGFyIGNvbXBvbmVudCBvZiB0aGUgdmVsb2NpdHkgb3IgaXRzIHJhbmdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGU9J3ZlY3RvciddIC0gVGhlIHR5cGUgb2YgdmVsb2NpdHkgKCd2ZWN0b3InIG9yICdwb2xhcicpLlxuICAgKi9cbiAgcmVzZXQocnBhbiwgdGhhcGFuLCB0eXBlKSB7XG4gICAgdGhpcy5yUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUocnBhbik7XG4gICAgdGhpcy50aGFQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZSh0aGFwYW4pO1xuICAgIHRoaXMudHlwZSA9IFV0aWwuaW5pdFZhbHVlKHR5cGUsIFwidmVjdG9yXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhlIHZlbG9jaXR5IHZhbHVlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdnIgLSBUaGUgdmVsb2NpdHkgdmFsdWUgdG8gbm9ybWFsaXplLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbm9ybWFsaXplZCB2ZWxvY2l0eSB2YWx1ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG5vcm1hbGl6ZVZlbG9jaXR5KHZyKSB7XG4gICAgcmV0dXJuIHZyICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3MgdmVsb2NpdHkuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJwXCIgfHwgdGhpcy50eXBlID09PSBcIlBcIiB8fCB0aGlzLnR5cGUgPT09IFwicG9sYXJcIikge1xuICAgICAgY29uc3QgcG9sYXIyZCA9IG5ldyBQb2xhcjJEKFxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKSxcbiAgICAgICAgdGhpcy50aGFQYW4uZ2V0VmFsdWUoKSAqIE1hdGhVdGlsLlBJXzE4MFxuICAgICAgKTtcblxuICAgICAgdGFyZ2V0LnYueCA9IHBvbGFyMmQuZ2V0WCgpO1xuICAgICAgdGFyZ2V0LnYueSA9IHBvbGFyMmQuZ2V0WSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQudi54ID0gdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSk7XG4gICAgICB0YXJnZXQudi55ID0gdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuLyoqXG4gKiBNYXNzIGNsYXNzIGZvciBpbml0aWFsaXppbmcgcGFydGljbGUgbWFzcy5cbiAqIEBleHRlbmRzIEluaXRpYWxpemVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFzcyBleHRlbmRzIEluaXRpYWxpemUge1xuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYXNzUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBNYXNzIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBhIC0gVGhlIG1hc3MgdmFsdWUgb3IgdGhlIGxvd2VyIGJvdW5kIG9mIHRoZSBtYXNzIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JdIC0gVGhlIHVwcGVyIGJvdW5kIG9mIHRoZSBtYXNzIHJhbmdlIChpZiBhIGlzIGEgbnVtYmVyKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbY10gLSBXaGV0aGVyIHRvIHVzZSBjZW50ZXItYmFzZWQgY2FsY3VsYXRpb24gKGlmIGEgYW5kIGIgYXJlIG51bWJlcnMpLlxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXNzUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJNYXNzXCI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1hc3Mgb2YgYSB0YXJnZXQgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgLSBUaGUgdGFyZ2V0IHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIHRhcmdldC5tYXNzID0gdGhpcy5tYXNzUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuLyoqXG4gKiBSYWRpdXMgY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSByYWRpdXMuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGl1cyBleHRlbmRzIEluaXRpYWxpemUge1xuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqL1xuICByYWRpdXM7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFJhZGl1cyBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gYSAtIFRoZSByYWRpdXMgdmFsdWUgb3IgdGhlIGxvd2VyIGJvdW5kIG9mIHRoZSByYWRpdXMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbYl0gLSBUaGUgdXBwZXIgYm91bmQgb2YgdGhlIHJhZGl1cyByYW5nZSAoaWYgYSBpcyBhIG51bWJlcikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NdIC0gV2hldGhlciB0byB1c2UgY2VudGVyLWJhc2VkIGNhbGN1bGF0aW9uIChpZiBhIGFuZCBiIGFyZSBudW1iZXJzKS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJSYWRpdXNcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhpcyBpbml0aWFsaXplcidzIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IGEgLSBUaGUgcmFkaXVzIHZhbHVlIG9yIHRoZSBsb3dlciBib3VuZCBvZiB0aGUgcmFkaXVzIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JdIC0gVGhlIHVwcGVyIGJvdW5kIG9mIHRoZSByYWRpdXMgcmFuZ2UgKGlmIGEgaXMgYSBudW1iZXIpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjXSAtIFdoZXRoZXIgdG8gdXNlIGNlbnRlci1iYXNlZCBjYWxjdWxhdGlvbiAoaWYgYSBhbmQgYiBhcmUgbnVtYmVycykuXG4gICAqL1xuICByZXNldChhLCBiLCBjKSB7XG4gICAgdGhpcy5yYWRpdXMgPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyByYWRpdXMuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucmFkaXVzID0gdGhpcy5yYWRpdXMuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4uL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogQm9keSBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIGJvZGllcy5cbiAqIEBleHRlbmRzIEluaXRpYWxpemVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSBleHRlbmRzIEluaXRpYWxpemUge1xuICAvKipcbiAgICogQHR5cGUge0FycmF5U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGltYWdlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBCb2R5IGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R8QXJyYXlTcGFufSBpbWFnZSAtIFRoZSBpbWFnZSBzb3VyY2Ugb3Igb2JqZWN0IHRvIHVzZSBmb3IgdGhlIHBhcnRpY2xlIGJvZHkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdz0yMF0gLSBUaGUgd2lkdGggb2YgdGhlIHBhcnRpY2xlIGJvZHkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaF0gLSBUaGUgaGVpZ2h0IG9mIHRoZSBwYXJ0aWNsZSBib2R5LiBEZWZhdWx0cyB0byB0aGUgd2lkdGggaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW1hZ2UsIHcsIGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMuc2V0U3BhblZhbHVlKGltYWdlKTtcbiAgICB0aGlzLncgPSBVdGlsLmluaXRWYWx1ZSh3LCAyMCk7XG4gICAgdGhpcy5oID0gVXRpbC5pbml0VmFsdWUoaCwgdGhpcy53KTtcbiAgICB0aGlzLm5hbWUgPSBcIkJvZHlcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyBib2R5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBjb25zdCBpbWFnZVRhcmdldCA9IHRoaXMuaW1hZ2UuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0eXBlb2YgaW1hZ2VUYXJnZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLncsXG4gICAgICAgIGhlaWdodDogdGhpcy5oLFxuICAgICAgICBzcmM6IGltYWdlVGFyZ2V0LFxuICAgICAgICBpc0lubmVyOiB0cnVlLFxuICAgICAgICBpbm5lcjogdHJ1ZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IGltYWdlVGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzcGFuIHZhbHVlIGZvciB0aGUgaW1hZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdHxBcnJheVNwYW59IGltYWdlIC0gVGhlIGltYWdlIHNvdXJjZSBvciBvYmplY3QgdG8gc2V0IGFzIHNwYW4gdmFsdWUuXG4gICAqIEByZXR1cm5zIHtBcnJheVNwYW59IFRoZSBBcnJheVNwYW4gaW5zdGFuY2UuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRTcGFuVmFsdWUoaW1hZ2UpIHtcbiAgICByZXR1cm4gaW1hZ2UgaW5zdGFuY2VvZiBBcnJheVNwYW4gPyBpbWFnZSA6IG5ldyBBcnJheVNwYW4oaW1hZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcblxuLyoqXG4gKiBUaGUgQmVoYXZpb3VyIGNsYXNzIGlzIHRoZSBiYXNlIGZvciB0aGUgb3RoZXIgQmVoYXZpb3VyXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyIHtcbiAgc3RhdGljIGlkID0gMDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEJlaGF2aW91ciBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhlIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZCwgZm9yIGV4YW1wbGUgZWFzZS5lYXNlT3V0UXVhcnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGxpZmUsIGVhc2luZykge1xuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBsaWZlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uXG4gICAgICogQHR5cGUge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBjdXJyZW50IGFnZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5hZ2UgPSAwO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIGN1cnJlbnQgZW5lcmd5XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmVuZXJneSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBiZWhhdmlvdXIgaXMgZGVhZFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIHBhcmVudCBlbWl0dGVyc1xuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnBhcmVudHMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyB1bmlxdWUgaWRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuaWQgPSBgQmVoYXZpb3VyXyR7QmVoYXZpb3VyLmlkKyt9YDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBuYW1lXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIkJlaGF2aW91clwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhpcyBiZWhhdmlvdXIncyBuZXcgbGlmZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhpcyBiZWhhdmlvdXIncyBuZXcgZWFzaW5nXG4gICAqL1xuICByZXNldChsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIGZvcmNlIGJ5IDE6MTAwXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSBmb3JjZSAtIFRoZSBmb3JjZSB0byBub3JtYWxpemVcbiAgICogQHJldHVybnMge1Byb3Rvbi5WZWN0b3IyRH0gVGhlIG5vcm1hbGl6ZWQgZm9yY2VcbiAgICovXG4gIG5vcm1hbGl6ZUZvcmNlKGZvcmNlKSB7XG4gICAgcmV0dXJuIGZvcmNlLm11bHRpcGx5U2NhbGFyKFByb3Rvbi5NRUFTVVJFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2YWx1ZSBieSAxOjEwMFxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBub3JtYWxpemVkIHZhbHVlXG4gICAqL1xuICBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGEgcGFydGljbGVcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgdGhlIGJlaGF2aW91cidzIGxpZmUgY3ljbGVcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNhbGN1bGF0ZSBmb3JcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuYWdlID49IHRoaXMubGlmZSB8fCB0aGlzLmRlYWQpIHtcbiAgICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyhwYXJ0aWNsZS5hZ2UgLyBwYXJ0aWNsZS5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgdG8gYSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoaXMgYmVoYXZpb3VyXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGxldCBpID0gdGhpcy5wYXJlbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLnBhcmVudHNbaV0ucmVtb3ZlQmVoYXZpb3VyKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMucGFyZW50cy5sZW5ndGggPSAwO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmNlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Gb3JjZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZ4LCBmeSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKG5ldyBWZWN0b3IyRChmeCwgZnkpKTtcbiAgICB0aGlzLm5hbWUgPSBcIkZvcmNlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeFxuICAgKiBAcGFyYW0ge051bWJlcn0gZnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKG5ldyBWZWN0b3IyRChmeCwgZnkpKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmZvcmNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuLyoqXG4gKiBBdHRyYWN0aW9uIGJlaGF2aW9yIGZvciBwYXJ0aWNsZXMuXG4gKiBUaGlzIGJlaGF2aW91ciBtYWtlcyBwYXJ0aWNsZXMgZm9sbG93IGEgc3BlY2lmaWMgdGFyZ2V0IHBvc2l0aW9uLlxuICogQGV4dGVuZHMgQmVoYXZpb3VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJhY3Rpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBBdHRyYWN0aW9uLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiAtIFRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2ZvcmNlPTEwMF0gLSBUaGUgc3RyZW5ndGggb2YgdGhlIGF0dHJhY3Rpb24gZm9yY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXVzPTEwMDBdIC0gVGhlIHJhZGl1cyBvZiBpbmZsdWVuY2UgZm9yIHRoZSBhdHRyYWN0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhlIGxpZmUgc3BhbiBvZiB0aGlzIGJlaGF2aW91ci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2UuZWFzZUxpbmVhciddIC0gVGhlIGVhc2luZyBmdW5jdGlvbiBmb3IgdGhpcyBiZWhhdmlvdXIuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgcG9zaXRpb24gZm9yIGF0dHJhY3Rpb24uXG4gICAgICogQHR5cGUge1ZlY3RvcjJEfVxuICAgICAqL1xuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHJhZGl1cyBvZiBpbmZsdWVuY2UgZm9yIHRoZSBhdHRyYWN0aW9uLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cmVuZ3RoIG9mIHRoZSBhdHRyYWN0aW9uIGZvcmNlLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNxdWFyZWQgcmFkaXVzIChmb3Igb3B0aW1pemF0aW9uKS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGF0dHJhY3Rpb24gZm9yY2UgdmVjdG9yLlxuICAgICAqIEB0eXBlIHtWZWN0b3IyRH1cbiAgICAgKi9cbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoZSBhdHRyYWN0aW9uIGZvcmNlLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYmVoYXZpb3VyLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJBdHRyYWN0aW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiAtIFRoZSBuZXcgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtmb3JjZT0xMDBdIC0gVGhlIG5ldyBzdHJlbmd0aCBvZiB0aGUgYXR0cmFjdGlvbiBmb3JjZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXM9MTAwMF0gLSBUaGUgbmV3IHJhZGl1cyBvZiBpbmZsdWVuY2UgZm9yIHRoZSBhdHRyYWN0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhlIG5ldyBsaWZlIHNwYW4gb2YgdGhpcyBiZWhhdmlvdXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlLmVhc2VMaW5lYXInXSAtIFRoZSBuZXcgZWFzaW5nIGZ1bmN0aW9uIGZvciB0aGlzIGJlaGF2aW91ci5cbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLnJhZGl1cyA9IFV0aWwuaW5pdFZhbHVlKHJhZGl1cywgMTAwMCk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGlzIGJlaGF2aW91ciB0byBhIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBjdXJyZW50IHNpbXVsYXRpb24gdGltZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBwYXJ0aWNsZS5cbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5jb3B5KHRoaXMudGFyZ2V0UG9zaXRpb24pO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLnN1YihwYXJ0aWNsZS5wKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gdGhpcy5hdHRyYWN0aW9uRm9yY2UubGVuZ3RoU3EoKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aFNxID4gMC4wMDAwNCAmJiB0aGlzLmxlbmd0aFNxIDwgdGhpcy5yYWRpdXNTcSkge1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uubm9ybWFsaXplKCk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5sZW5ndGhTcSAvIHRoaXMucmFkaXVzU3EpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIodGhpcy5mb3JjZSk7XG5cbiAgICAgIHBhcnRpY2xlLmEuYWRkKHRoaXMuYXR0cmFjdGlvbkZvcmNlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5kb21EcmlmdCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFJhbmRvbURyaWZ0XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFggXHRcdFx0XHRYIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WSAgXHRcdFx0XHRZIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IFx0XHRcdFx0SG93IG11Y2ggZGVsYXkgdGhlIGRyaWZ0IHNob3VsZCBoYXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lIFRoZSB0aW1lIG9mIHRoZSBkcmlmdFxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoZHJpZnRYLCBkcmlmdFksIGRlbGF5KTtcbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMubmFtZSA9IFwiUmFuZG9tRHJpZnRcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1JhbmRvbURyaWZ0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZHJpZnRYLCBkcmlmdFksIGRlbGF5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnBhbkZvY2UgPSBuZXcgVmVjdG9yMkQoZHJpZnRYLCBkcmlmdFkpO1xuICAgIHRoaXMucGFuRm9jZSA9IHRoaXMubm9ybWFsaXplRm9yY2UodGhpcy5wYW5Gb2NlKTtcbiAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS50aW1lID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgKz0gdGltZTtcblxuICAgIGlmIChwYXJ0aWNsZS5kYXRhLnRpbWUgPj0gdGhpcy5kZWxheSkge1xuICAgICAgcGFydGljbGUuYS5hZGRYWShcbiAgICAgICAgTWF0aFV0aWwucmFuZG9tQVRvQigtdGhpcy5wYW5Gb2NlLngsIHRoaXMucGFuRm9jZS54KSxcbiAgICAgICAgTWF0aFV0aWwucmFuZG9tQVRvQigtdGhpcy5wYW5Gb2NlLnksIHRoaXMucGFuRm9jZS55KVxuICAgICAgKTtcblxuICAgICAgcGFydGljbGUuZGF0YS50aW1lID0gMDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBGb3JjZSBmcm9tIFwiLi9Gb3JjZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5IGV4dGVuZHMgRm9yY2Uge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkdyYXZpdHlcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIoMCwgZywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5HcmF2aXR5XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZyBcdFx0XHRcdFx0XHRcdEdyYXZpdHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyLnJlc2V0KDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpc2lvbiBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgYWZ0ZXIgY29sbGlzaW9uXG4gICAqXG4gICAqIEBjYWxsYmFjayBDYWxsYmFja1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtQcm90b24uUGFyaXRjbGV9IG90aGVyUGFydGljbGVcbiAgICovXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ29sbGlzaW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLnJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrKTtcbiAgICB0aGlzLm5ld1Bvb2wgPSBbXTtcbiAgICB0aGlzLnBvb2wgPSBbXTtcbiAgICB0aGlzLm5hbWUgPSBcIkNvbGxpc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xsaXNpb25cbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIHRvIG1hc3NcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gXHRbZW1pdHRlcj1udWxsXSBcdFx0dGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBcdFx0W21hc3M9dHJ1ZV1cbiAgICogQHBhcmFtIHtDYWxsYmFja31cdCBcdFtjYWxsYmFjaz1udWxsXVx0XHR0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIGNvbGxpc2lvblxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0W2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZW1pdHRlciA9IFV0aWwuaW5pdFZhbHVlKGVtaXR0ZXIsIG51bGwpO1xuICAgIHRoaXMubWFzcyA9IFV0aWwuaW5pdFZhbHVlKG1hc3MsIHRydWUpO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBVdGlsLmluaXRWYWx1ZShjYWxsYmFjaywgbnVsbCk7XG5cbiAgICB0aGlzLmNvbGxpc2lvblBvb2wgPSBbXTtcbiAgICB0aGlzLmRlbHRhID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xsaXNpb25cbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGlmICh0aGlzLmVtaXR0ZXIpIHtcbiAgICAgIFV0aWwuc2xpY2VBcnJheSh0aGlzLmVtaXR0ZXIucGFydGljbGVzLCBpbmRleCwgdGhpcy5uZXdQb29sKTtcbiAgICB9IGVsc2Uge1xuICAgICAgVXRpbC5zbGljZUFycmF5KHRoaXMucG9vbCwgaW5kZXgsIHRoaXMubmV3UG9vbCk7XG4gICAgfVxuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5uZXdQb29sLmxlbmd0aDtcbiAgICBsZXQgb3RoZXJQYXJ0aWNsZTtcbiAgICBsZXQgbGVuZ3RoU3E7XG4gICAgbGV0IG92ZXJsYXA7XG4gICAgbGV0IHRvdGFsTWFzcztcbiAgICBsZXQgYXZlcmFnZU1hc3MxLCBhdmVyYWdlTWFzczI7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG90aGVyUGFydGljbGUgPSB0aGlzLm5ld1Bvb2xbaV07XG5cbiAgICAgIGlmIChvdGhlclBhcnRpY2xlICE9PSBwYXJ0aWNsZSkge1xuICAgICAgICB0aGlzLmRlbHRhLmNvcHkob3RoZXJQYXJ0aWNsZS5wKTtcbiAgICAgICAgdGhpcy5kZWx0YS5zdWIocGFydGljbGUucCk7XG5cbiAgICAgICAgbGVuZ3RoU3EgPSB0aGlzLmRlbHRhLmxlbmd0aFNxKCk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gcGFydGljbGUucmFkaXVzICsgb3RoZXJQYXJ0aWNsZS5yYWRpdXM7XG5cbiAgICAgICAgaWYgKGxlbmd0aFNxIDw9IGRpc3RhbmNlICogZGlzdGFuY2UpIHtcbiAgICAgICAgICBvdmVybGFwID0gZGlzdGFuY2UgLSBNYXRoLnNxcnQobGVuZ3RoU3EpO1xuICAgICAgICAgIG92ZXJsYXAgKz0gMC41O1xuXG4gICAgICAgICAgdG90YWxNYXNzID0gcGFydGljbGUubWFzcyArIG90aGVyUGFydGljbGUubWFzcztcbiAgICAgICAgICBhdmVyYWdlTWFzczEgPSB0aGlzLm1hc3MgPyBvdGhlclBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG4gICAgICAgICAgYXZlcmFnZU1hc3MyID0gdGhpcy5tYXNzID8gcGFydGljbGUubWFzcyAvIHRvdGFsTWFzcyA6IDAuNTtcblxuICAgICAgICAgIHBhcnRpY2xlLnAuYWRkKFxuICAgICAgICAgICAgdGhpcy5kZWx0YVxuICAgICAgICAgICAgICAuY2xvbmUoKVxuICAgICAgICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgICAgICAgLm11bHRpcGx5U2NhbGFyKG92ZXJsYXAgKiAtYXZlcmFnZU1hc3MxKVxuICAgICAgICAgICk7XG4gICAgICAgICAgb3RoZXJQYXJ0aWNsZS5wLmFkZCh0aGlzLmRlbHRhLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKG92ZXJsYXAgKiBhdmVyYWdlTWFzczIpKTtcblxuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjayhwYXJ0aWNsZSwgb3RoZXJQYXJ0aWNsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm9zc1pvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogRGVmaW5lcyB3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBjb21lIHRvIHRoZSBlbmQgb2YgdGhlIHNwZWNpZmllZCB6b25lXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Dcm9zc1pvbmVcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uWm9uZX0gem9uZSBcdFx0XHRcdFx0XHRjYW4gYmUgYW55IFByb3Rvbi5ab25lIC0gZS5nLiBQcm90b24uUmVjdFpvbmUoKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtjcm9zc1R5cGU9ZGVhZF0gXHRcdFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KHpvbmUsIGNyb3NzVHlwZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDcm9zc1pvbmVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Dcm9zc1pvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRjYW4gYmUgYW55IFByb3Rvbi5ab25lIC0gZS5nLiBQcm90b24uUmVjdFpvbmUoKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtjcm9zc1R5cGU9ZGVhZF0gXHR3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBwYXNzIHRoZSB6b25lIC0gYWxsb3dlZCBzdHJpbmdzOiBkZWFkIHwgYm91bmQgfCBjcm9zc1xuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuem9uZSA9IHpvbmU7XG4gICAgdGhpcy56b25lLmNyb3NzVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGNyb3NzVHlwZSwgXCJkZWFkXCIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Dcm9zc1pvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICB0aGlzLnpvbmUuY3Jvc3NpbmcocGFydGljbGUpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuLyoqXG4gKiBBbHBoYSBiZWhhdmlvdXIgZm9yIGNvbnRyb2xsaW5nIHBhcnRpY2xlIG9wYWNpdHkgb3ZlciB0aW1lLlxuICogQGV4dGVuZHMgQmVoYXZpb3VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFscGhhIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2FtZTtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEFscGhhIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYT0xXSAtIFRoZSBpbml0aWFsIGFscGhhIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYl0gLSBUaGUgZmluYWwgYWxwaGEgdmFsdWUgb3IgcmFuZ2UuIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSB0aGUgc2FtZSBhcyAnYScuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGlzIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQWxwaGFcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYT0xXSAtIFRoZSBpbml0aWFsIGFscGhhIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYl0gLSBUaGUgZmluYWwgYWxwaGEgdmFsdWUgb3IgcmFuZ2UuIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSB0aGUgc2FtZSBhcyAnYScuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIGFscGhhIHZhbHVlcy5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLmFscGhhQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHRoaXMuc2FtZSkgcGFydGljbGUuZGF0YS5hbHBoYUIgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQTtcbiAgICBlbHNlIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgYWxwaGEgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0by5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgY3VycmVudCBzaW11bGF0aW9uIHRpbWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcGFydGljbGUuXG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgcGFydGljbGUuYWxwaGEgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQiArIChwYXJ0aWNsZS5kYXRhLmFscGhhQSAtIHBhcnRpY2xlLmRhdGEuYWxwaGFCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLmFscGhhIDwgMC4wMDEpIHBhcnRpY2xlLmFscGhhID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbi8qKlxuICogU2NhbGUgYmVoYXZpb3VyIGZvciBjb250cm9sbGluZyBwYXJ0aWNsZSBzaXplIG92ZXIgdGltZS5cbiAqIEBleHRlbmRzIEJlaGF2aW91clxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2FsZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNhbWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFNjYWxlIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYT0xXSAtIFRoZSBpbml0aWFsIHNjYWxlIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYl0gLSBUaGUgZmluYWwgc2NhbGUgdmFsdWUgb3IgcmFuZ2UuIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSB0aGUgc2FtZSBhcyAnYScuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGlzIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiU2NhbGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBhIC0gVGhlIGluaXRpYWwgc2NhbGUgdmFsdWUgb3IgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFtiXSAtIFRoZSBmaW5hbCBzY2FsZSB2YWx1ZSBvciByYW5nZS4gSWYgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIHRoZSBzYW1lIGFzICdhJy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlXSAtIFRoaXMgYmVoYXZpb3VyJ3MgbGlmZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZDtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3Mgc2NhbGUgdmFsdWVzLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVBID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgcGFydGljbGUuZGF0YS5zY2FsZUIgPSB0aGlzLnNhbWUgPyBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA6IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIHNjYWxlIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGN1cnJlbnQgc2ltdWxhdGlvbiB0aW1lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHBhcnRpY2xlLlxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5zY2FsZSA9IHBhcnRpY2xlLmRhdGEuc2NhbGVCICsgKHBhcnRpY2xlLmRhdGEuc2NhbGVBIC0gcGFydGljbGUuZGF0YS5zY2FsZUIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICBpZiAocGFydGljbGUuc2NhbGUgPCAwLjAwMDEpIHBhcnRpY2xlLnNjYWxlID0gMDtcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyAqIHBhcnRpY2xlLnNjYWxlO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuLyoqXG4gKiBSb3RhdGUgYmVoYXZpb3VyIGZvciBjb250cm9sbGluZyBwYXJ0aWNsZSByb3RhdGlvbi5cbiAqIEBleHRlbmRzIEJlaGF2aW91clxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzYW1lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGE7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYjtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0eWxlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBSb3RhdGUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxTcGFufSBbaW5mbHVlbmNlPSdWZWxvY2l0eSddIC0gVGhlIHJvdGF0aW9uJ3MgaW5mbHVlbmNlIG9yIGluaXRpYWwgcm90YXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxTcGFufSBbYl0gLSBUaGUgZmluYWwgcm90YXRpb24gdmFsdWUgb3IgcmFuZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3R5bGU9J3RvJ10gLSBUaGUgc3R5bGUgb2Ygcm90YXRpb24gKCd0bycgb3IgJ2FkZCcpLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbmZsdWVuY2UsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChpbmZsdWVuY2UsIGIsIHN0eWxlKTtcbiAgICB0aGlzLm5hbWUgPSBcIlJvdGF0ZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxTcGFufSBbYT0nVmVsb2NpdHknXSAtIFRoZSByb3RhdGlvbidzIGluZmx1ZW5jZSBvciBpbml0aWFsIHJvdGF0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIHJvdGF0aW9uIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0eWxlPSd0byddIC0gVGhlIHN0eWxlIG9mIHJvdGF0aW9uICgndG8nIG9yICdhZGQnKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlXSAtIFRoaXMgYmVoYXZpb3VyJ3MgbGlmZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICByZXNldChhLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCBcIlZlbG9jaXR5XCIpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShiLCAwKSk7XG4gICAgdGhpcy5zdHlsZSA9IFV0aWwuaW5pdFZhbHVlKHN0eWxlLCBcInRvXCIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHBhcnRpY2xlLnJvdGF0aW9uIC0gVGhlIHBhcnRpY2xlJ3Mgcm90YXRpb24uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZS5kYXRhIC0gVGhlIHBhcnRpY2xlJ3MgZGF0YSBvYmplY3QuXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucm90YXRpb24gPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEucm90YXRpb25CID0gdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGlzIGJlaGF2aW91ciB0byBhIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0by5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgaW50ZWdyYXRlIHRpbWUgKDEvbXMpLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgcGFydGljbGUgaW5kZXguXG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHtcbiAgICAgIGlmICh0aGlzLnN0eWxlID09PSBcInRvXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJUT1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiX1wiKSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9XG4gICAgICAgICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgKyAocGFydGljbGUuZGF0YS5yb3RhdGlvbkEgLSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQikgKiB0aGlzLmVuZXJneTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHBhcnRpY2xlLmRhdGEucm90YXRpb25CO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hLmEgPT09IFwiVlwiIHx8IHRoaXMuYS5hID09PSBcIlZlbG9jaXR5XCIgfHwgdGhpcy5hLmEgPT09IFwidlwiKSB7XG4gICAgICAvLyBiZXRhLi4uXG4gICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlLmdldERpcmVjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gW2FdIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBbYl0gdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNvbG9yXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihhKTtcbiAgICB0aGlzLmIgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGIpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuY29sb3IgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmNvbG9yQSA9IENvbG9yVXRpbC5oZXhUb1JnYihwYXJ0aWNsZS5jb2xvcik7XG5cbiAgICBpZiAodGhpcy5iKSBwYXJ0aWNsZS5kYXRhLmNvbG9yQiA9IENvbG9yVXRpbC5oZXhUb1JnYih0aGlzLmIuZ2V0VmFsdWUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGlmICh0aGlzLmIpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckIuciArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yIC0gcGFydGljbGUuZGF0YS5jb2xvckIucikgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckIuZyArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nIC0gcGFydGljbGUuZGF0YS5jb2xvckIuZykgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckIuYiArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iIC0gcGFydGljbGUuZGF0YS5jb2xvckIuYikgKiB0aGlzLmVuZXJneTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5yZ2IuciA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5yZ2IuZyA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5yZ2IuYiA8PCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLnI7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmc7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmI7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuY29uc3QgQ0hBTkdJTkcgPSBcImNoYW5naW5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN5Y2xvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkN5Y2xvbmVcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDeWNsb25lXCI7XG4gIH1cblxuICBzZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuXG4gICAgaWYgKGFuZ2xlID09PSBcInJpZ2h0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSAtTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInJhbmRvbVwiO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJzcGFuXCI7XG4gICAgICB0aGlzLnNwYW4gPSBhbmdsZTtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5naW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiYXV0b1wiXG4gICAgKSB7XG4gICAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgfSBlbHNlIGlmIChmb3JjZSkge1xuICAgICAgdGhpcy5mb3JjZSA9IGZvcmNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSBNYXRoVXRpbC5yYW5kb21BVG9CKC1NYXRoVXRpbC5QSSwgTWF0aFV0aWwuUEkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gdGhpcy5zcGFuLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBsZXQgbGVuZ3RoO1xuICAgIGxldCBncmFkaWVudCA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIiB8fCB0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgZ3JhZGllbnQgKz0gcGFydGljbGUuZGF0YS5jYW5nbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyYWRpZW50ICs9IHRoaXMuYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9yY2UgPT09IENIQU5HSU5HKSB7XG4gICAgICBsZW5ndGggPSBwYXJ0aWNsZS52Lmxlbmd0aCgpIC8gMTAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0aGlzLmZvcmNlO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS54ID0gbGVuZ3RoICogTWF0aC5jb3MoZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS55ID0gbGVuZ3RoICogTWF0aC5zaW4oZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IHRoaXMubm9ybWFsaXplRm9yY2UocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgICBwYXJ0aWNsZS5hLmFkZChwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICB9XG59XG4iLCJpbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9BdHRyYWN0aW9uXCI7XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIEF0dHJhY3Rpb24gLSB0dXJucyB0aGUgZm9yY2VcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIFByb3Rvbi5BdHRyYWN0aW9uXG4gKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAqIEBhbGlhcyBQcm90b24uUmVwdWxzaW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcHVsc2lvbiBleHRlbmRzIEF0dHJhY3Rpb24ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBSZXB1bHNpb24gYmVoYXZpb3VyIGluc3RhbmNlXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgcmVwdWxzaW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZm9yY2U9MTAwXSAtIFRoZSBzdHJlbmd0aCBvZiB0aGUgcmVwdWxzaW9uIGZvcmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXVzPTEwMDBdIC0gVGhlIHJhZGl1cyBvZiBpbmZsdWVuY2UgZm9yIHRoZSByZXB1bHNpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGUgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3RyZW5ndGggb2YgdGhlIHJlcHVsc2lvbiBmb3JjZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBiZWhhdmlvdXJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiUmVwdWxzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiAtIFRoZSBuZXcgcmVwdWxzaW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZm9yY2U9MTAwXSAtIFRoZSBuZXcgc3RyZW5ndGggb2YgdGhlIHJlcHVsc2lvbiBmb3JjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1cz0xMDAwXSAtIFRoZSBuZXcgcmFkaXVzIG9mIGluZmx1ZW5jZSBmb3IgdGhlIHJlcHVsc2lvblxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhlIG5ldyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGUgbmV3IGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvblxuICAgKi9cbiAgcmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyLnJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMuZm9yY2UgKj0gLTE7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHlXZWxsIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgR3Jhdml0eVdlbGxcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY2VudGVyUG9pbnQsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5kaXN0YW5jZVZlYyA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuY2VudGVyUG9pbnQgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXJQb2ludCwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMubmFtZSA9IFwiR3Jhdml0eVdlbGxcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbY2VudGVyUG9pbnQ9bmV3IFZlY3RvcjJEXSBUaGUgcG9pbnQgaW4gdGhlIGNlbnRlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cdFx0XHRcdFx0VGhlIGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV1cdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYyA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuY2VudGVyUG9pbnQgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXJQb2ludCwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW5oZXJpdGRvY1xuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jR3Jhdml0eVdlbGxcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmRpc3RhbmNlVmVjLnNldCh0aGlzLmNlbnRlclBvaW50LnggLSBwYXJ0aWNsZS5wLngsIHRoaXMuY2VudGVyUG9pbnQueSAtIHBhcnRpY2xlLnAueSk7XG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IHRoaXMuZGlzdGFuY2VWZWMubGVuZ3RoU3EoKTtcblxuICAgIGlmIChkaXN0YW5jZVNxICE9PSAwKSB7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2VWZWMubGVuZ3RoKCk7XG4gICAgICBjb25zdCBmYWN0b3IgPSAodGhpcy5mb3JjZSAqIHRpbWUpIC8gKGRpc3RhbmNlU3EgKiBkaXN0YW5jZSk7XG5cbiAgICAgIHBhcnRpY2xlLnYueCArPSBmYWN0b3IgKiB0aGlzLmRpc3RhbmNlVmVjLng7XG4gICAgICBwYXJ0aWNsZS52LnkgKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFByb3BVdGlsIGZyb20gXCIuLi91dGlscy9Qcm9wVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdGlhbGl6ZShlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpIHtcbiAgICBjb25zdCBsZW5ndGggPSBpbml0aWFsaXplcy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpbml0aWFsaXplc1tpXSBpbnN0YW5jZW9mIEluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZXNbaV0uaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluaXQoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFbWl0dGVyKGVtaXR0ZXIsIHBhcnRpY2xlKTtcbiAgfSxcblxuICAvLyBpbml0XG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemUpIHtcbiAgICBQcm9wVXRpbC5zZXRQcm9wKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgICBQcm9wVXRpbC5zZXRWZWN0b3JWYWwocGFydGljbGUsIGluaXRpYWxpemUpO1xuICB9LFxuXG4gIGJpbmRFbWl0dGVyKGVtaXR0ZXIsIHBhcnRpY2xlKSB7XG4gICAgaWYgKGVtaXR0ZXIuYmluZEVtaXR0ZXIpIHtcbiAgICAgIHBhcnRpY2xlLnAuYWRkKGVtaXR0ZXIucCk7XG4gICAgICBwYXJ0aWNsZS52LmFkZChlbWl0dGVyLnYpO1xuICAgICAgcGFydGljbGUuYS5hZGQoZW1pdHRlci5hKTtcbiAgICAgIHBhcnRpY2xlLnYucm90YXRlKE1hdGhVdGlsLmRlZ3JlZVRyYW5zZm9ybShlbWl0dGVyLnJvdGF0aW9uKSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5pbXBvcnQgUGFydGljbGUgZnJvbSBcIi4uL2NvcmUvUGFydGljbGVcIjtcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIjtcblxuaW1wb3J0IFJhdGUgZnJvbSBcIi4uL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemVVdGlsIGZyb20gXCIuLi9pbml0aWFsaXplL0luaXRpYWxpemVVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXIgZXh0ZW5kcyBQYXJ0aWNsZSB7XG4gIC8qKlxuICAgKiBZb3UgY2FuIHVzZSB0aGlzIGVtaXQgcGFydGljbGVzLlxuICAgKlxuICAgKiBJdCB3aWxsIGRpc3BhdGNoIGZvbGxvdyBldmVudHM6XG4gICAqIFBBUlRJQ0xFX0NSRUFURURcbiAgICogUEFSVElDTEVfVVBEQVRBXG4gICAqIFBBUlRJQ0xFX0RFQURcbiAgICpcbiAgICogQGNsYXNzIEVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICogZm9yIGV4YW1wbGUge2RhbXBpbmc6MC4wMSxiaW5kRW1pdHRlcjpmYWxzZX1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYgPSB7fSkge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcbiAgICB0aGlzLmluaXRpYWxpemVzID0gW107XG5cbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLmVtaXRTcGVlZCA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmcmljdGlvbiBjb2VmZmljaWVudCBmb3IgYWxsIHBhcnRpY2xlIGVtaXQgYnkgVGhpcztcbiAgICAgKiBAcHJvcGVydHkgZGFtcGluZ1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMC4wMDZcbiAgICAgKi9cbiAgICB0aGlzLmRhbXBpbmcgPSAwLjAwNjtcblxuICAgIC8qKlxuICAgICAqIElmIGJpbmRFbWl0dGVyIHRoZSBwYXJ0aWNsZXMgY2FuIGJpbmQgdGhpcyBlbWl0dGVyJ3MgcHJvcGVydHk7XG4gICAgICogQHByb3BlcnR5IGJpbmRFbWl0dGVyXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHRoaXMuYmluZEVtaXR0ZXIgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWl0IChhIFtwYXJ0aWNsZV0vYiBbc10pO1xuICAgICAqIEBwcm9wZXJ0eSByYXRlXG4gICAgICogQHR5cGUge1JhdGV9XG4gICAgICogQGRlZmF1bHQgUmF0ZSgxLCAuMSlcbiAgICAgKi9cbiAgICB0aGlzLnJhdGUgPSBuZXcgUmF0ZSgxLCAwLjEpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJFbWl0dGVyXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydCBlbWl0IHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZW1pdFxuICAgKiBAcGFyYW0ge051bWJlciB8IFN0cmluZ30gW3RvdGFsVGltZV0gYmVnaW4gZW1pdCB0aW1lO1xuICAgKiBAcGFyYW0ge1N0cmluZyB8IGJvb2xlYW59IFtsaWZlXSB0aGUgbGlmZSBvZiB0aGlzIGVtaXR0ZXJcbiAgICovXG4gIGVtaXQodG90YWxUaW1lLCBsaWZlKSB7XG4gICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IFV0aWwuaW5pdFZhbHVlKHRvdGFsVGltZSwgSW5maW5pdHkpO1xuXG4gICAgaWYgKGxpZmUgPT09IHRydWUgfHwgbGlmZSA9PT0gXCJsaWZlXCIgfHwgbGlmZSA9PT0gXCJkZXN0cm95XCIpIHtcbiAgICAgIHRoaXMubGlmZSA9IHRvdGFsVGltZSA9PT0gXCJvbmNlXCIgPyAxIDogdGhpcy50b3RhbFRpbWU7XG4gICAgfSBlbHNlIGlmICghaXNOYU4obGlmZSkpIHtcbiAgICAgIHRoaXMubGlmZSA9IGxpZmU7XG4gICAgfVxuICAgIHRoaXMucmF0ZS5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnRvdGFsVGltZSA9IC0xO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuc3RvcGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByZUVtaXQodGltZSkge1xuICAgIGxldCBvbGRTdG9wZWQgPSB0aGlzLnN0b3BlZDtcbiAgICBsZXQgb2xkRW1pdFRpbWUgPSB0aGlzLmVtaXRUaW1lO1xuICAgIGxldCBvbGRUb3RhbFRpbWUgPSB0aGlzLnRvdGFsVGltZTtcblxuICAgIHRoaXMuc3RvcGVkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSB0aW1lO1xuICAgIHRoaXMucmF0ZS5pbml0KCk7XG5cbiAgICBjb25zdCBzdGVwID0gMC4wMTY3O1xuICAgIHdoaWxlICh0aW1lID4gc3RlcCkge1xuICAgICAgdGltZSAtPSBzdGVwO1xuICAgICAgdGhpcy51cGRhdGUoc3RlcCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdG9wZWQgPSBvbGRTdG9wZWQ7XG4gICAgdGhpcy5lbWl0VGltZSA9IG9sZEVtaXRUaW1lICsgTWF0aC5tYXgodGltZSwgMCk7XG4gICAgdGhpcy50b3RhbFRpbWUgPSBvbGRUb3RhbFRpbWU7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGN1cnJlbnQgYWxsIHBhcnRpY2xlc1xuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgcmVtb3ZlQWxsUGFydGljbGVzKCkge1xuICAgIGxldCBpID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMucGFydGljbGVzW2ldLmRlYWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBpbml0aWFsaXplIHRvIHRoaXMgZW1pdHRlclxuICAgKiBAbWV0aG9kIGFkZFNlbGZJbml0aWFsaXplXG4gICAqL1xuICBhZGRTZWxmSW5pdGlhbGl6ZShpbml0aWFsaXplKSB7XG4gICAgaWYgKGluaXRpYWxpemVbXCJpbml0XCJdKSB7XG4gICAgICBpbml0aWFsaXplLmluaXQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMuaW5pdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEluaXRpYWxpemUgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBpbml0aWFsaXplcyBhcnJheTpmb3IgZXhhbXBsZSBlbWl0dGVyLmFkZEluaXRpYWxpemUoaW5pdGlhbGl6ZTEsaW5pdGlhbGl6ZTIsaW5pdGlhbGl6ZTMpO1xuICAgKiBAbWV0aG9kIGFkZEluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGxpa2UgdGhpcyBuZXcgUmFkaXVzKDEsIDEyKVxuICAgKi9cbiAgYWRkSW5pdGlhbGl6ZSguLi5yZXN0KSB7XG4gICAgbGV0IGkgPSByZXN0Lmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLmluaXRpYWxpemVzLnB1c2gocmVzdFtpXSk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBJbml0aWFsaXplXG4gICAqIEBtZXRob2QgcmVtb3ZlSW5pdGlhbGl6ZVxuICAgKiBAcGFyYW0ge0luaXRpYWxpemV9IGluaXRpYWxpemUgYSBpbml0aWFsaXplXG4gICAqL1xuICByZW1vdmVJbml0aWFsaXplKGluaXRpYWxpemVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmluaXRpYWxpemVzLmluZGV4T2YoaW5pdGlhbGl6ZXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmluaXRpYWxpemVzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGFsbCBJbml0aWFsaXplc1xuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVyc1xuICAgKi9cbiAgcmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmluaXRpYWxpemVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBwYXJ0aWNsZXM7XG4gICAqXG4gICAqIHlvdSBjYW4gdXNlIEJlaGF2aW91cnMgYXJyYXk6ZW1pdHRlci5hZGRCZWhhdmlvdXIoQmVoYXZpb3VyMSxCZWhhdmlvdXIyLEJlaGF2aW91cjMpO1xuICAgKiBAbWV0aG9kIGFkZEJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGxpa2UgdGhpcyBuZXcgQ29sb3IoJ3JhbmRvbScpXG4gICAqL1xuICBhZGRCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBsZXQgYmVoYXZpb3VyID0gcmVzdFtpXTtcbiAgICAgIHRoaXMuYmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBpZiAoYmVoYXZpb3VyLnBhcmVudHMpIGJlaGF2aW91ci5wYXJlbnRzLnB1c2godGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgQmVoYXZpb3VyXG4gICAqIEBtZXRob2QgcmVtb3ZlQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgYSBiZWhhdmlvdXJcbiAgICovXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgIHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSB7XG4gICAgICBpbmRleCA9IGJlaGF2aW91ci5wYXJlbnRzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICAgIGJlaGF2aW91ci5wYXJlbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgYmVoYXZpb3Vyc1xuICAgKiBAbWV0aG9kIHJlbW92ZUFsbEJlaGF2aW91cnNcbiAgICovXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuYmVoYXZpb3Vycyk7XG4gIH1cblxuICAvLyBlbWl0dGVyIHVwZGF0ZVxuICB1cGRhdGUodGltZSkge1xuICAgIHRoaXMuYWdlICs9IHRpbWU7XG4gICAgaWYgKHRoaXMuYWdlID49IHRoaXMubGlmZSB8fCB0aGlzLmRlYWQpIHRoaXMuZGVzdHJveSgpO1xuXG4gICAgdGhpcy5lbWl0dGluZyh0aW1lKTtcbiAgICB0aGlzLmludGVncmF0ZSh0aW1lKTtcbiAgfVxuXG4gIGludGVncmF0ZSh0aW1lKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZGFtcGluZyA9IDEgLSB0aGlzLmRhbXBpbmc7XG4gICAgdGhpcy5wYXJlbnQuaW50ZWdyYXRvci5jYWxjdWxhdGUodGhpcywgdGltZSwgZGFtcGluZyk7XG5cbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgbGV0IGksIHBhcnRpY2xlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV07XG5cbiAgICAgIC8vIHBhcnRpY2xlIHVwZGF0ZVxuICAgICAgcGFydGljbGUudXBkYXRlKHRpbWUsIGkpO1xuICAgICAgdGhpcy5wYXJlbnQuaW50ZWdyYXRvci5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGRhbXBpbmcpO1xuICAgICAgdGhpcy5kaXNwYXRjaChcIlBBUlRJQ0xFX1VQREFURVwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgIC8vIGNoZWNrIGRlYWRcbiAgICAgIGlmIChwYXJ0aWNsZS5kZWFkKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9ERUFEXCIsIHBhcnRpY2xlKTtcblxuICAgICAgICB0aGlzLnBhcmVudC5wb29sLmV4cGlyZShwYXJ0aWNsZSk7XG4gICAgICAgIHRoaXMucGFydGljbGVzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaChldmVudCwgdGFyZ2V0KSB7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzcGF0Y2hFdmVudChldmVudCwgdGFyZ2V0KTtcbiAgICB0aGlzLmJpbmRFdmVudCAmJiB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gIH1cblxuICBlbWl0dGluZyh0aW1lKSB7XG4gICAgaWYgKHRoaXMuc3RvcGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy50b3RhbFRpbWUgPT09IFwibm9uZVwiKSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJvbmNlXCIpIHtcbiAgICAgIGxldCBpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB0aGlzLnRvdGFsVGltZSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG5cbiAgICAgIGlmICh0aGlzLmVtaXRUaW1lIDwgdGhpcy50b3RhbFRpbWUpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgc2luZ2xlIHBhcnRpY2xlO1xuICAgKlxuICAgKiBjYW4gdXNlIGVtaXQoe3g6MTB9LG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KSBvciBlbWl0KFt7eDoxMH0sbmV3IEluaXRpYWxpemVdLG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KVxuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGxldCBpbml0aWFsaXplcyA9IHRoaXMuaW5pdGlhbGl6ZXM7XG4gICAgbGV0IGJlaGF2aW91cnMgPSB0aGlzLmJlaGF2aW91cnM7XG5cbiAgICBpZiAoaW5pdGlhbGl6ZSkgaW5pdGlhbGl6ZXMgPSBVdGlsLnRvQXJyYXkoaW5pdGlhbGl6ZSk7XG4gICAgaWYgKGJlaGF2aW91cikgYmVoYXZpb3VycyA9IFV0aWwudG9BcnJheShiZWhhdmlvdXIpO1xuXG4gICAgcGFydGljbGUucmVzZXQoKTtcbiAgICBJbml0aWFsaXplVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcyk7XG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucGFydGljbGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcblxuICAgIHRoaXMucmF0ZSA9IG51bGw7XG4gICAgdGhpcy5vbGQgPSBudWxsO1xuICAgIHRoaXMucmdiID0gbnVsbDtcbiAgICB0aGlzLnYgPSBudWxsO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdGhpcy5wID0gbnVsbDtcbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChFbWl0dGVyKTtcbiIsImltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyRW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEJlaGF2aW91ckVtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEJlaGF2aW91ckVtaXR0ZXIgeW91IGNhbiBhZGQgYmVoYXZpb3VycyB0byBzZWxmO1xuICAgKiBAY2xhc3MgUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMuc2VsZkJlaGF2aW91cnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBlbWl0dGVyO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IFByb3Rvbi5Db2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZFNlbGZCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpLFxuICAgICAgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXIgZm9yIHNlbGZcbiAgICogQG1ldGhvZCByZW1vdmVTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVTZWxmQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuc2VsZkJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgc3VwZXIudXBkYXRlKHRpbWUpO1xuXG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmxlbmd0aDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd0VtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBGb2xsb3dFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBGb2xsb3dFbWl0dGVyIHdpbGwgZW1pdCBwYXJ0aWNsZSB3aGVuIG1vdXNlbW92aW5nXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uRm9sbG93RW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtFbGVtZW50fSBtb3VzZVRhcmdldCBtb3VzZWV2ZW50J3MgdGFyZ2V0O1xuICAgKiBAcGFyYW0ge051bWJlcn0gZWFzZSB0aGUgZWFzaW5nIG9mIGZvbGxvd2luZyBzcGVlZDtcbiAgICogQGRlZmF1bHQgMC43XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1vdXNlVGFyZ2V0LCBlYXNlLCBjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcblxuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlbW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZWRvd24uY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNldXBIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNldXAuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZW1vdmUoZSkge1xuICAgIGlmIChlLmxheWVyWCB8fCBlLmxheWVyWCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUubGF5ZXJYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH0gZWxzZSBpZiAoZS5vZmZzZXRYIHx8IGUub2Zmc2V0WCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUub2Zmc2V0WCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLm9mZnNldFkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoXCJvbmNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHBpY3R1cmUgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc0ltYWdlKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5fX2lzSW1hZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIG9iai5fX2lzSW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHN0cmluZyBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICB9XG59O1xuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5uYW1lID0gXCJCYXNlUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFN0cm9rZShjb2xvciA9IFwiIzAwMDAwMFwiLCB0aGlua25lc3MgPSAxKSB7XG4gICAgdGhpcy5zdHJva2UgPSB7IGNvbG9yLCB0aGlua25lc3MgfTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZUFmdGVyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyQWRkZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlclJlbW92ZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZURlYWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwcm90b247XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuLyoqXG4gKiBDYW52YXNSZW5kZXJlciBjbGFzcyBmb3IgcmVuZGVyaW5nIHBhcnRpY2xlcyBvbiBhIGNhbnZhcyBlbGVtZW50LlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1JlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtvYmplY3R8bnVsbH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0cm9rZTtcblxuICAvKipcbiAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbnRleHQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBidWZmZXJDYWNoZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQ2FudmFzUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gcmVuZGVyIG9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5idWZmZXJDYWNoZSA9IHt9O1xuICAgIHRoaXMubmFtZSA9IFwiQ2FudmFzUmVuZGVyZXJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemVzIHRoZSBjYW52YXMgZWxlbWVudC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gVGhlIG5ldyB3aWR0aCBvZiB0aGUgY2FudmFzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gVGhlIG5ldyBoZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAgICovXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhbnZhcyBvbiBQcm90b24gdXBkYXRlLlxuICAgKi9cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3JlYXRpb24uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBjcmVhdGVkIHBhcnRpY2xlLlxuICAgKi9cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIHVwZGF0ZXMuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSB1cGRhdGVkIHBhcnRpY2xlLlxuICAgKi9cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBpZiAoVHlwZXMuaXNJbWFnZShwYXJ0aWNsZS5ib2R5KSkge1xuICAgICAgICB0aGlzLmRyYXdJbWFnZShwYXJ0aWNsZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhd0NpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgZGVzdHJ1Y3Rpb24uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBkZXN0cm95ZWQgcGFydGljbGUuXG4gICAqL1xuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaW1hZ2UgdG8gdGhlIHBhcnRpY2xlIGJvZHkuXG4gICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1nIC0gVGhlIGltYWdlIHRvIGFkZC5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFkZCB0aGUgaW1hZ2UgdG8uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhbiBpbWFnZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGRyYXcuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIGEgY2lyY3VsYXIgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBkcmF3LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZHJhd0NpcmNsZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5yZ2IpIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBgcmdiYSgke3BhcnRpY2xlLnJnYi5yfSwke3BhcnRpY2xlLnJnYi5nfSwke3BhcnRpY2xlLnJnYi5ifSwke3BhcnRpY2xlLmFscGhhfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gcGFydGljbGUuY29sb3I7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGJ1ZmZlciBmb3IgaW1hZ2UgcGFydGljbGVzLlxuICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltYWdlIC0gVGhlIGltYWdlIHRvIGNyZWF0ZSBhIGJ1ZmZlciBmb3IuXG4gICAqIEByZXR1cm5zIHtIVE1MQ2FudmFzRWxlbWVudHx1bmRlZmluZWR9IFRoZSBjcmVhdGVkIGJ1ZmZlciBjYW52YXMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoVHlwZXMuaXNJbWFnZShpbWFnZSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBpbWFnZS53aWR0aCArIFwiX1wiICsgaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV07XG5cbiAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdID0gY2FudmFzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcmVuZGVyZXIgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBET00tYmFzZWQgcmVuZGVyZXIgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBEb21SZW5kZXJlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBIVE1MIGVsZW1lbnQgdG8gcmVuZGVyIHRvLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtM2QgPSBmYWxzZTtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRvbVJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zZCkge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybTNkKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0ocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUub3BhY2l0eSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgICBpZiAocGFydGljbGUuYm9keS5pc0NpcmNsZSkge1xuICAgICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGJvZHlSZWFkeShwYXJ0aWNsZSkge1xuICAgIHJldHVybiB0eXBlb2YgcGFydGljbGUuYm9keSA9PT0gXCJvYmplY3RcIiAmJiBwYXJ0aWNsZS5ib2R5ICYmICFwYXJ0aWNsZS5ib2R5LmlzSW5uZXI7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChpbWcsIHBhcnRpY2xlKTtcbiAgICBEb21VdGlsLnJlc2l6ZShwYXJ0aWNsZS5ib2R5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIDIgKiBwYXJ0aWNsZS5yYWRpdXMsIDIgKiBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHtwYXJ0aWNsZS5yYWRpdXN9cHhgO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJXaWR0aCA9IGAke3RoaXMuc3Ryb2tlLnRoaW5rbmVzc31weGA7XG4gICAgfVxuICAgIGRvbS5pc0NpcmNsZSA9IHRydWU7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdXJsID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIgPyBib2R5IDogYm9keS5zcmM7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIGJvZHkud2lkdGgsIGJvZHkuaGVpZ2h0KTtcbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3VybH0pYDtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHJlbmRlcmVyIGFuZCBjbGVhbnMgdXAgcmVzb3VyY2VzLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFYXNlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLm5hbWUgPSBcIkVhc2VsUmVuZGVyZXJcIjtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHRoaXMuY3JlYXRlU3ByaXRlKHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keS54ID0gcGFydGljbGUucC54O1xuICAgICAgcGFydGljbGUuYm9keS55ID0gcGFydGljbGUucC55O1xuXG4gICAgICBwYXJ0aWNsZS5ib2R5LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnNjYWxlWCA9IHBhcnRpY2xlLmJvZHkuc2NhbGVZID0gcGFydGljbGUuc2NhbGU7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJvdGF0aW9uID0gcGFydGljbGUucm90YXRpb247XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keS5wYXJlbnQgJiYgcGFydGljbGUuYm9keS5wYXJlbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHBhcnRpY2xlLmdyYXBoaWNzKSB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmdyYXBoaWNzKTtcbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgY3JlYXRlU3ByaXRlKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQocGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAocGFydGljbGUuYm9keS5wYXJlbnQpIHJldHVybjtcbiAgICBpZiAocGFydGljbGUuYm9keVtcImltYWdlXCJdKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJlZ1ggPSBwYXJ0aWNsZS5ib2R5LmltYWdlLndpZHRoIC8gMjtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWSA9IHBhcnRpY2xlLmJvZHkuaW1hZ2UuaGVpZ2h0IC8gMjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBncmFwaGljcyA9IHRoaXMucG9vbC5nZXQod2luZG93LmNyZWF0ZWpzLkdyYXBoaWNzKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgaWYgKFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSkge1xuICAgICAgICBncmFwaGljcy5iZWdpblN0cm9rZSh0aGlzLnN0cm9rZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncmFwaGljcy5iZWdpblN0cm9rZShcIiMwMDAwMDBcIik7XG4gICAgICB9XG4gICAgfVxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIikuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5wb29sLmdldCh3aW5kb3cuY3JlYXRlanMuU2hhcGUsIFtncmFwaGljc10pO1xuXG4gICAgcGFydGljbGUuYm9keSA9IHNoYXBlO1xuICAgIHBhcnRpY2xlLmdyYXBoaWNzID0gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwaXhlbC1iYXNlZCByZW5kZXJlciBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUGl4ZWxSZW5kZXJlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gZWxlbWVudCAtIFRoZSBjYW52YXMgZWxlbWVudCB0byByZW5kZXIgdG8uXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBbcmVjdGFuZ2xlXSAtIFRoZSByZWN0YW5nbGUgZGVmaW5pbmcgdGhlIHJlbmRlcmluZyBhcmVhLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgcmVjdGFuZ2xlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLmNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhlbFJlbmRlcmVyXCI7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBjcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGUgPyByZWN0YW5nbGUgOiBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCh0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55LCB0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICB0aGlzLnJlY3RhbmdsZS54LFxuICAgICAgdGhpcy5yZWN0YW5nbGUueSxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLndpZHRoLFxuICAgICAgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhKSB7XG4gICAgICB0aGlzLnNldFBpeGVsKFxuICAgICAgICB0aGlzLmltYWdlRGF0YSxcbiAgICAgICAgKHBhcnRpY2xlLnAueCAtIHRoaXMucmVjdGFuZ2xlLngpID4+IDAsXG4gICAgICAgIChwYXJ0aWNsZS5wLnkgLSB0aGlzLnJlY3RhbmdsZS55KSA+PiAwLFxuICAgICAgICBwYXJ0aWNsZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQaXhlbChpbWFnZWRhdGEsIHgsIHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgcmdiID0gcGFydGljbGUucmdiO1xuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5lbGVtZW50LndpZHRoIHx8IHkgPCAwIHx8IHkgPiB0aGlzLmVsZW1lbnQuaGVpZ2h0KSByZXR1cm47XG5cbiAgICBjb25zdCBpID0gKCh5ID4+IDApICogaW1hZ2VkYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpbWFnZWRhdGEuZGF0YVtpXSA9IHJnYi5yO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAxXSA9IHJnYi5nO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAyXSA9IHJnYi5iO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAzXSA9IHBhcnRpY2xlLmFscGhhICogMjU1O1xuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSByZW5kZXJlciBhbmQgY2xlYW5zIHVwIHJlc291cmNlcy5cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5sZXQgUElYSUNsYXNzO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBQSVhJLWJhc2VkIHJlbmRlcmVyIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpeGlSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBpeGlSZW5kZXJlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtQSVhJLkNvbnRhaW5lcn0gZWxlbWVudCAtIFRoZSBQSVhJIGNvbnRhaW5lciB0byByZW5kZXIgdG8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW3N0cm9rZV0gLSBUaGUgc3Ryb2tlIGNvbG9yIGZvciBwYXJ0aWNsZXMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMuY29sb3IgPSBmYWxzZTtcbiAgICB0aGlzLnNldENvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5ibGVuZE1vZGUgPSBudWxsO1xuICAgIHRoaXMucG9vbC5jcmVhdGUgPSAoYm9keSwgcGFydGljbGUpID0+IHRoaXMuY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXRQSVhJKHdpbmRvdy5QSVhJKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUGl4aVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRQSVhJKFBJWEkpIHtcbiAgICB0cnkge1xuICAgICAgUElYSUNsYXNzID0gUElYSSB8fCB7IFNwcml0ZToge30gfTtcbiAgICAgIHRoaXMuY3JlYXRlRnJvbUltYWdlID0gUElYSUNsYXNzLlNwcml0ZS5mcm9tIHx8IFBJWElDbGFzcy5TcHJpdGUuZnJvbUltYWdlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQocGFydGljbGUuYm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldCh0aGlzLmNpcmNsZUNvbmYsIHBhcnRpY2xlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ibGVuZE1vZGUpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkuYmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIHRoaXMudHJhbnNmb3JtKHBhcnRpY2xlLCBwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmICh0aGlzLnNldENvbG9yID09PSB0cnVlIHx8IHRoaXMuY29sb3IgPT09IHRydWUpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkudGludCA9IENvbG9yVXRpbC5nZXRIZXgxNkZyb21QYXJ0aWNsZShwYXJ0aWNsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgfVxuXG4gIHRyYW5zZm9ybShwYXJ0aWNsZSwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgdGFyZ2V0LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICB0YXJnZXQuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgIHRhcmdldC5zY2FsZS54ID0gcGFydGljbGUuc2NhbGU7XG4gICAgdGFyZ2V0LnNjYWxlLnkgPSBwYXJ0aWNsZS5zY2FsZTtcblxuICAgIC8vIHVzaW5nIGNhY2hlZCB2ZXJzaW9uIG9mIE1hdGhVdGlsLlBJXzE4MCBmb3Igc2xpZ2h0IHBlcmZvcm1hbmNlIGluY3JlYXNlLlxuICAgIHRhcmdldC5yb3RhdGlvbiA9IHBhcnRpY2xlLnJvdGF0aW9uICogTWF0aFV0aWwuUElfMTgwOyAvLyBNYXRoVXRpbC5QSV8xODA7XG4gIH1cblxuICBjcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKSB7XG4gICAgaWYgKGJvZHkuaXNDaXJjbGUpIHJldHVybiB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5jcmVhdGVTcHJpdGUoYm9keSk7XG4gIH1cblxuICBjcmVhdGVTcHJpdGUoYm9keSkge1xuICAgIGNvbnN0IHNwcml0ZSA9IGJvZHkuaXNJbm5lciA/IHRoaXMuY3JlYXRlRnJvbUltYWdlKGJvZHkuc3JjKSA6IG5ldyBQSVhJQ2xhc3MuU3ByaXRlKGJvZHkpO1xuXG4gICAgc3ByaXRlLmFuY2hvci54ID0gMC41O1xuICAgIHNwcml0ZS5hbmNob3IueSA9IDAuNTtcblxuICAgIHJldHVybiBzcHJpdGU7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBncmFwaGljcyA9IG5ldyBQSVhJQ2xhc3MuR3JhcGhpY3MoKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgY29uc3Qgc3Ryb2tlID0gVHlwZXMuaXNTdHJpbmcodGhpcy5zdHJva2UpID8gdGhpcy5zdHJva2UgOiAweDAwMDAwMDtcbiAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKHN0cm9rZSk7XG4gICAgfVxuXG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHBhcnRpY2xlLmNvbG9yIHx8IDB4MDA4Y2VkKTtcbiAgICBncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xuXG4gICAgcmV0dXJuIGdyYXBoaWNzO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSByZW5kZXJlciBhbmQgY2xlYW5zIHVwIHJlc291cmNlcy5cbiAgICogQHBhcmFtIHtBcnJheTxQYXJ0aWNsZT59IHBhcnRpY2xlcyAtIFRoZSBwYXJ0aWNsZXMgdG8gY2xlYW4gdXAuXG4gICAqL1xuICBkZXN0cm95KHBhcnRpY2xlcykge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcblxuICAgIGxldCBpID0gcGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBsZXQgcGFydGljbGUgPSBwYXJ0aWNsZXNbaV07XG4gICAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1TdGFjayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWF0cyA9IFtdO1xuICAgIHRoaXMuc2l6ZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHRoaXMubWF0cy5wdXNoKE1hdDMuY3JlYXRlKFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSkpO1xuICB9XG5cbiAgc2V0KG0sIGkpIHtcbiAgICBpZiAoaSA9PT0gMCkgTWF0My5zZXQobSwgdGhpcy5tYXRzWzBdKTtcbiAgICBlbHNlIE1hdDMubXVsdGlwbHkodGhpcy5tYXRzW2kgLSAxXSwgbSwgdGhpcy5tYXRzW2ldKTtcblxuICAgIHRoaXMuc2l6ZSA9IE1hdGgubWF4KHRoaXMuc2l6ZSwgaSArIDEpO1xuICB9XG5cbiAgcHVzaChtKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkgTWF0My5zZXQobSwgdGhpcy5tYXRzWzBdKTtcbiAgICBlbHNlIE1hdDMubXVsdGlwbHkodGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdLCBtLCB0aGlzLm1hdHNbdGhpcy5zaXplXSk7XG5cbiAgICB0aGlzLnNpemUrKztcbiAgfVxuXG4gIHBvcCgpIHtcbiAgICBpZiAodGhpcy5zaXplID4gMCkgdGhpcy5zaXplLS07XG4gIH1cblxuICB0b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0c1t0aGlzLnNpemUgLSAxXTtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdDMgZnJvbSBcIi4uL21hdGgvTWF0M1wiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgTVN0YWNrIGZyb20gXCIuLi91dGlscy9NU3RhY2tcIjtcbmltcG9ydCBEb21VdGlsIGZyb20gXCIuLi91dGlscy9Eb21VdGlsXCI7XG5pbXBvcnQgV2ViR0xVdGlsIGZyb20gXCIuLi91dGlscy9XZWJHTFV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBXZWJHTC1iYXNlZCByZW5kZXJlciBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJHTFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgV2ViR0xSZW5kZXJlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gZWxlbWVudCAtIFRoZSBjYW52YXMgZWxlbWVudCB0byByZW5kZXIgdG8uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmdsID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgeyBhbnRpYWxpYXM6IHRydWUsIHN0ZW5jaWw6IGZhbHNlLCBkZXB0aDogZmFsc2UgfSk7XG4gICAgaWYgKCF0aGlzLmdsKSBhbGVydChcIlNvcnJ5IHlvdXIgYnJvd3NlciBkbyBub3Qgc3VwcGVzdCBXZWJHTCFcIik7XG5cbiAgICB0aGlzLmluaXRWYXIoKTtcbiAgICB0aGlzLnNldE1heFJhZGl1cygpO1xuICAgIHRoaXMuaW5pdFNoYWRlcnMoKTtcbiAgICB0aGlzLmluaXRCdWZmZXJzKCk7XG5cbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbC5GVU5DX0FERCk7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiV2ViR0xSZW5kZXJlclwiO1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICBzdXBlci5pbml0KHByb3Rvbik7XG4gICAgdGhpcy5yZXNpemUodGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy51bWF0WzRdID0gLTI7XG4gICAgdGhpcy51bWF0WzddID0gMTtcblxuICAgIHRoaXMuc21hdFswXSA9IDEgLyB3aWR0aDtcbiAgICB0aGlzLnNtYXRbNF0gPSAxIC8gaGVpZ2h0O1xuXG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMudW1hdCwgMCk7XG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMuc21hdCwgMSk7XG5cbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRNYXhSYWRpdXMocmFkaXVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNVUkwgPSB0aGlzLmNyZWF0ZUNpcmNsZShyYWRpdXMpO1xuICB9XG5cbiAgZ2V0VmVydGV4U2hhZGVyKCkge1xuICAgIGNvbnN0IHZzU291cmNlID0gW1xuICAgICAgXCJ1bmlmb3JtIHZlYzIgdmlld3BvcnQ7XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidW5pZm9ybSBtYXQzIHRNYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzMgdiA9IHRNYXQgKiB2ZWMzKGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcIixcbiAgICAgIFwiZ2xfUG9zaXRpb24gPSB2ZWM0KHYueCwgdi55LCAwLCAxKTtcIixcbiAgICAgIFwidlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcImFscGhhID0gdE1hdFswXVsyXTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiB2c1NvdXJjZTtcbiAgfVxuXG4gIGdldEZyYWdtZW50U2hhZGVyKCkge1xuICAgIGNvbnN0IGZzU291cmNlID0gW1xuICAgICAgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzQgY29sb3I7XCIsXG4gICAgICBcInVuaWZvcm0gYm9vbCB1c2VUZXh0dXJlO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzMgdUNvbG9yO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZUNvbG9yICogdmVjNCh1Q29sb3IsIDEuMCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvci53ICo9IGFscGhhO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIGZzU291cmNlO1xuICB9XG5cbiAgaW5pdFZhcigpIHtcbiAgICB0aGlzLm1zdGFjayA9IG5ldyBNU3RhY2soKTtcbiAgICB0aGlzLnVtYXQgPSBNYXQzLmNyZWF0ZShbMiwgMCwgMSwgMCwgLTIsIDAsIC0xLCAxLCAxXSk7XG4gICAgdGhpcy5zbWF0ID0gTWF0My5jcmVhdGUoWzEgLyAxMDAsIDAsIDEsIDAsIDEgLyAxMDAsIDAsIDAsIDAsIDFdKTtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0ge307XG4gIH1cblxuICBibGVuZEVxdWF0aW9uKEEpIHtcbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbFtBXSk7XG4gIH1cblxuICBibGVuZEZ1bmMoQSwgQikge1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2xbQV0sIHRoaXMuZ2xbQl0pO1xuICB9XG5cbiAgZ2V0U2hhZGVyKGdsLCBzdHIsIGZzKSB7XG4gICAgY29uc3Qgc2hhZGVyID0gZnMgPyBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKSA6IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcblxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHN0cik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgaW5pdFNoYWRlcnMoKSB7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyKCksIHRydWUpO1xuICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0VmVydGV4U2hhZGVyKCksIGZhbHNlKTtcblxuICAgIHRoaXMuc3Byb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5zcHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIGFsZXJ0KFwiQ291bGQgbm90IGluaXRpYWxpc2Ugc2hhZGVyc1wiKTtcblxuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcbiAgICB0aGlzLnNwcm9ncmFtLnZwYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVmVydGV4UG9zaXRpb25cIik7XG4gICAgdGhpcy5zcHJvZ3JhbS50Y2EgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVRleHR1cmVDb29yZFwiKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udGNhKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udnBhKTtcblxuICAgIHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInRNYXRcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidVNhbXBsZXJcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS51c2VUZXggPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVzZVRleHR1cmVcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5jb2xvciA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidUNvbG9yXCIpO1xuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0udXNlVGV4LCAxKTtcbiAgfVxuXG4gIGluaXRCdWZmZXJzKCkge1xuICAgIGNvbnN0IHZzID0gWzAsIDMsIDEsIDAsIDIsIDNdO1xuICAgIGxldCBpZHg7XG5cbiAgICB0aGlzLnVuaXRJQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh2cyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgbGV0IGk7XG4gICAgbGV0IGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSk7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnVuaXRJMzMgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJMzMpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpLCBpICsgMSwgaSArIDIpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy5zdHJpcEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuc3RyaXBCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHJhaWR1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzID0gV2ViR0xVdGlsLm5ocG90KFV0aWwuaW5pdFZhbHVlKHJhaWR1cywgMzIpKTtcbiAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhcImNpcmNsZV9jYW52YXNcIiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfVxuXG4gIGRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgX3cgPSBwYXJ0aWNsZS5ib2R5LndpZHRoO1xuICAgIGNvbnN0IF9oID0gcGFydGljbGUuYm9keS5oZWlnaHQ7XG5cbiAgICBjb25zdCBfd2lkdGggPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS53aWR0aCk7XG4gICAgY29uc3QgX2hlaWdodCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LmhlaWdodCk7XG5cbiAgICBjb25zdCBfc2NhbGVYID0gcGFydGljbGUuYm9keS53aWR0aCAvIF93aWR0aDtcbiAgICBjb25zdCBfc2NhbGVZID0gcGFydGljbGUuYm9keS5oZWlnaHQgLyBfaGVpZ2h0O1xuXG4gICAgaWYgKCF0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSlcbiAgICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdID0gW1xuICAgICAgICB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKVxuICAgICAgXTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZSA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzBdO1xuICAgIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsxXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMl07XG5cbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF9zY2FsZVgsIDAuMCwgMC4wLCBfc2NhbGVZLCBfc2NhbGVZLCBfc2NhbGVZXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF93LCAwLjAsIDAuMCwgX2gsIF93LCBfaF0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gcGFydGljbGUuZGF0YS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xuXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpO1xuICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggPSBfdztcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgPSBfaDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIC8vIHRoaXMuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAxKTtcbiAgICAvLyB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IGZhbHNlO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS50bWF0WzhdID0gMTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdFs4XSA9IDE7XG5cbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZSh0aGlzLmNpcmNsZUNhbnZhc1VSTCwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IHBhcnRpY2xlLnJhZGl1cyAvIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgICBwYXJ0aWNsZS5kYXRhLnNyYyA9IGltZy5zcmM7XG4gICAgcGFydGljbGUuZGF0YS5jYW52YXMgPSBJbWdVdGlsLmdldENhbnZhc0Zyb21DYWNoZShpbWcpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSAxO1xuXG4gICAgdGhpcy5kcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCkge1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgocGFydGljbGUpO1xuXG4gICAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNwcm9ncmFtLmNvbG9yLCBwYXJ0aWNsZS5yZ2IuciAvIDI1NSwgcGFydGljbGUucmdiLmcgLyAyNTUsIHBhcnRpY2xlLnJnYi5iIC8gMjU1KTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtLCBmYWxzZSwgdGhpcy5tc3RhY2sudG9wKCkpO1xuXG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udnBhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udGNhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0sIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuXG4gICAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgNiwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICB0aGlzLm1zdGFjay5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICB1cGRhdGVNYXRyaXgocGFydGljbGUpIHtcbiAgICBjb25zdCBtb3ZlT3JpZ2luTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCAvIDIsXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcblxuICAgIGNvbnN0IGFuZ2VsID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7XG4gICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVJvdGF0aW9uKGFuZ2VsKTtcblxuICAgIGNvbnN0IHNjYWxlID0gcGFydGljbGUuc2NhbGUgKiBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlO1xuICAgIGNvbnN0IHNjYWxlTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgIGxldCBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobW92ZU9yaWdpbk1hdHJpeCwgc2NhbGVNYXRyaXgpO1xuXG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgcm90YXRpb25NYXRyaXgpO1xuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHRyYW5zbGF0aW9uTWF0cml4KTtcblxuICAgIE1hdDMuaW52ZXJzZShtYXRyaXgsIHBhcnRpY2xlLmRhdGEuaW1hdCk7XG4gICAgbWF0cml4WzJdID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0aGlzLm1zdGFjay5wdXNoKG1hdHJpeCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdsID0gbnVsbDtcbiAgICB0aGlzLm1zdGFjayA9IG51bGw7XG4gICAgdGhpcy51bWF0ID0gbnVsbDtcbiAgICB0aGlzLnNtYXQgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjdXN0b20gcmVuZGVyZXIgdGhhdCBleHRlbmRzIHRoZSBCYXNlUmVuZGVyZXIuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBDdXN0b21SZW5kZXJlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBIVE1MIGVsZW1lbnQgdG8gcmVuZGVyIHRvLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHJlbmRlcmVyLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJDdXN0b21SZW5kZXJlclwiO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbGluZSB6b25lIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgWm9uZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lWm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBMaW5lWm9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHgxIC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgZmlyc3QgcG9pbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5MSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIGZpcnN0IHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3gyXSAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHNlY29uZCBwb2ludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5Ml0gLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBzZWNvbmQgcG9pbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGlyZWN0aW9uPVwiPlwiXSAtIFRoZSBkaXJlY3Rpb24gb2YgdGhlIGxpbmUuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZGlyZWN0aW9uID0gXCI+XCIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHgyIC0geDEgPj0gMCkge1xuICAgICAgdGhpcy54MSA9IHgxO1xuICAgICAgdGhpcy55MSA9IHkxO1xuICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgdGhpcy55MiA9IHkyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLngxID0geDI7XG4gICAgICB0aGlzLnkxID0geTI7XG4gICAgICB0aGlzLngyID0geDE7XG4gICAgICB0aGlzLnkyID0geTE7XG4gICAgfVxuXG4gICAgdGhpcy5keCA9IHRoaXMueDIgLSB0aGlzLngxO1xuICAgIHRoaXMuZHkgPSB0aGlzLnkyIC0gdGhpcy55MTtcblxuICAgIHRoaXMubWlueCA9IE1hdGgubWluKHRoaXMueDEsIHRoaXMueDIpO1xuICAgIHRoaXMubWlueSA9IE1hdGgubWluKHRoaXMueTEsIHRoaXMueTIpO1xuICAgIHRoaXMubWF4eCA9IE1hdGgubWF4KHRoaXMueDEsIHRoaXMueDIpO1xuICAgIHRoaXMubWF4eSA9IE1hdGgubWF4KHRoaXMueTEsIHRoaXMueTIpO1xuXG4gICAgdGhpcy5kb3QgPSB0aGlzLngyICogdGhpcy55MSAtIHRoaXMueDEgKiB0aGlzLnkyO1xuICAgIHRoaXMueHh5eSA9IHRoaXMuZHggKiB0aGlzLmR4ICsgdGhpcy5keSAqIHRoaXMuZHk7XG5cbiAgICB0aGlzLmdyYWRpZW50ID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5nZXRMZW5ndGgoKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IFV0aWwuaW5pdFZhbHVlKGRpcmVjdGlvbiwgXCI+XCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByYW5kb20gcG9zaXRpb24gb24gdGhlIGxpbmUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSByYW5kb20gcG9zaXRpb24uXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueDEgKyB0aGlzLnJhbmRvbSAqIHRoaXMubGVuZ3RoICogTWF0aC5jb3ModGhpcy5ncmFkaWVudCk7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTEgKyB0aGlzLnJhbmRvbSAqIHRoaXMubGVuZ3RoICogTWF0aC5zaW4odGhpcy5ncmFkaWVudCk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGljaCBzaWRlIG9mIHRoZSBsaW5lIGEgcG9pbnQgaXMgb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwb2ludCBpcyBvbiB0aGUgcG9zaXRpdmUgc2lkZSBvZiB0aGUgbGluZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ2V0RGlyZWN0aW9uKHgsIHkpIHtcbiAgICBjb25zdCBBID0gdGhpcy5keTtcbiAgICBjb25zdCBCID0gLXRoaXMuZHg7XG4gICAgY29uc3QgQyA9IHRoaXMuZG90O1xuICAgIGNvbnN0IEQgPSBCID09PSAwID8gMSA6IEI7XG5cbiAgICBpZiAoKEEgKiB4ICsgQiAqIHkgKyBDKSAqIEQgPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBvZiBhIHBvaW50IGZyb20gdGhlIGxpbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkaXN0YW5jZSBmcm9tIHRoZSBwb2ludCB0byB0aGUgbGluZS5cbiAgICovXG4gIGdldERpc3RhbmNlKHgsIHkpIHtcbiAgICBjb25zdCBBID0gdGhpcy5keTtcbiAgICBjb25zdCBCID0gLXRoaXMuZHg7XG4gICAgY29uc3QgQyA9IHRoaXMuZG90O1xuICAgIGNvbnN0IEQgPSBBICogeCArIEIgKiB5ICsgQztcblxuICAgIHJldHVybiBEIC8gTWF0aC5zcXJ0KHRoaXMueHh5eSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3ltbWV0cmljIHZlY3RvciBvZiBhIGdpdmVuIHZlY3RvciB3aXRoIHJlc3BlY3QgdG8gdGhlIGxpbmUuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgdmVjdG9yIHRvIHJlZmxlY3QuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhlIHJlZmxlY3RlZCB2ZWN0b3IuXG4gICAqL1xuICBnZXRTeW1tZXRyaWModikge1xuICAgIGNvbnN0IHRoYTIgPSB2LmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhMSA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcblxuICAgIGNvbnN0IG9sZHggPSB2Lng7XG4gICAgY29uc3Qgb2xkeSA9IHYueTtcblxuICAgIHYueCA9IG9sZHggKiBNYXRoLmNvcyh0aGEpIC0gb2xkeSAqIE1hdGguc2luKHRoYSk7XG4gICAgdi55ID0gb2xkeCAqIE1hdGguc2luKHRoYSkgKyBvbGR5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGdyYWRpZW50IChhbmdsZSkgb2YgdGhlIGxpbmUuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBncmFkaWVudCBvZiB0aGUgbGluZSBpbiByYWRpYW5zLlxuICAgKi9cbiAgZ2V0R3JhZGllbnQoKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy5keSwgdGhpcy5keCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgcGFydGljbGUgaXMgb3V0c2lkZSB0aGUgcmFuZ2Ugb2YgdGhlIGxpbmUuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGFydGljbGUgaXMgd2l0aGluIHJhbmdlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICByYW5nZU91dChwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hYnModGhpcy5nZXRHcmFkaWVudCgpKTtcblxuICAgIGlmIChhbmdsZSA8PSBNYXRoVXRpbC5QSSAvIDQpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggPD0gdGhpcy5tYXh4ICYmIHBhcnRpY2xlLnAueCA+PSB0aGlzLm1pbngpIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFydGljbGUucC55IDw9IHRoaXMubWF4eSAmJiBwYXJ0aWNsZS5wLnkgPj0gdGhpcy5taW55KSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGVuZ3RoIG9mIHRoZSBsaW5lLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbGVuZ3RoIG9mIHRoZSBsaW5lLlxuICAgKi9cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSBjcm9zc2luZyBiZWhhdmlvciBiYXNlZCBvbiB0aGUgY3Jvc3NUeXBlLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjayBmb3IgY3Jvc3NpbmcuXG4gICAqL1xuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCI+XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiUlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcblxuICAgICAgaWYgKHRoaXMuZ2V0RGlzdGFuY2UocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpIDw9IHBhcnRpY2xlLnJhZGl1cykge1xuICAgICAgICBpZiAodGhpcy5keCA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR5ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlLnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIExpbmVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNpcmN1bGFyIHpvbmUgaW4gYSAyRCBzcGFjZS5cbiAqIEBleHRlbmRzIFpvbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlWm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBDaXJjbGVab25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIGNpcmNsZSdzIGNlbnRlci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBjaXJjbGUncyBjZW50ZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXVzXSAtIFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHgsIHksIHJhZGl1cykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgdGhpcy5jZW50ZXIgPSB7IHgsIHkgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmFuZG9tIHBvc2l0aW9uIHdpdGhpbiB0aGUgY2lyY2xlLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJeDIgKiBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMucmFuZG9tUmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSBuZXcgeC1jb29yZGluYXRlIG9mIHRoZSBjZW50ZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIG5ldyB5LWNvb3JkaW5hdGUgb2YgdGhlIGNlbnRlci5cbiAgICovXG4gIHNldENlbnRlcih4LCB5KSB7XG4gICAgdGhpcy5jZW50ZXIueCA9IHg7XG4gICAgdGhpcy5jZW50ZXIueSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSBjcm9zc2luZyBiZWhhdmlvci5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNoZWNrIGZvciBjcm9zc2luZy5cbiAgICovXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZCA9IHBhcnRpY2xlLnAuZGlzdGFuY2VUbyh0aGlzLmNlbnRlcik7XG5cbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAoZCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMucmFkaXVzKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChkICsgcGFydGljbGUucmFkaXVzID49IHRoaXMucmFkaXVzKSB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIENpcmNsZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHN5bW1ldHJpYyBwb3NpdGlvbiBvZiBhIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2FsY3VsYXRlIHN5bW1ldHJ5IGZvci5cbiAgICovXG4gIGdldFN5bW1ldHJpYyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHRoYTIgPSBwYXJ0aWNsZS52LmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhMSA9IHRoaXMuZ2V0R3JhZGllbnQocGFydGljbGUpO1xuXG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG4gICAgY29uc3Qgb2xkeCA9IHBhcnRpY2xlLnYueDtcbiAgICBjb25zdCBvbGR5ID0gcGFydGljbGUudi55O1xuXG4gICAgcGFydGljbGUudi54ID0gb2xkeCAqIE1hdGguY29zKHRoYSkgLSBvbGR5ICogTWF0aC5zaW4odGhhKTtcbiAgICBwYXJ0aWNsZS52LnkgPSBvbGR4ICogTWF0aC5zaW4odGhhKSArIG9sZHkgKiBNYXRoLmNvcyh0aGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGdyYWRpZW50IGZvciBhIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2FsY3VsYXRlIHRoZSBncmFkaWVudCBmb3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjYWxjdWxhdGVkIGdyYWRpZW50LlxuICAgKi9cbiAgZ2V0R3JhZGllbnQocGFydGljbGUpIHtcbiAgICByZXR1cm4gLU1hdGhVdGlsLlBJXzIgKyBNYXRoLmF0YW4yKHBhcnRpY2xlLnAueSAtIHRoaXMuY2VudGVyLnksIHBhcnRpY2xlLnAueCAtIHRoaXMuY2VudGVyLngpO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlY3Rhbmd1bGFyIHpvbmUgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBab25lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3Rab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFJlY3Rab25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3dpZHRoXSAtIFRoZSB3aWR0aCBvZiB0aGUgcmVjdGFuZ2xlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2hlaWdodF0gLSBUaGUgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCA9IDIwMCwgaGVpZ2h0ID0gMjAwKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJhbmRvbSBwb3NpdGlvbiB3aXRoaW4gdGhlIHJlY3Rhbmd1bGFyIHpvbmUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSByYW5kb20gcG9zaXRpb24uXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGg7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodDtcbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSBjcm9zc2luZyBiZWhhdmlvciBiYXNlZCBvbiB0aGUgY3Jvc3NUeXBlLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjayBmb3IgY3Jvc3NpbmcuXG4gICAqL1xuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIC8vIHBhcnRpY2xlIGRlYWQgem9uZVxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGJvdW5kIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBjcm9zcyB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCAmJiBwYXJ0aWNsZS52LnggPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoICYmIHBhcnRpY2xlLnYueCA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAmJiBwYXJ0aWNsZS52LnkgPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQgJiYgcGFydGljbGUudi55ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgem9uZSBiYXNlZCBvbiBpbWFnZSBkYXRhLlxuICogQGV4dGVuZHMgWm9uZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gSW1hZ2Vab25lLlxuICAgKiBAcGFyYW0ge0ltYWdlRGF0YX0gaW1hZ2VEYXRhIC0gVGhlIGltYWdlIGRhdGEgdG8gdXNlIGZvciB0aGUgem9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdIC0gVGhlIHgtY29vcmRpbmF0ZSBvZmZzZXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSAtIFRoZSB5LWNvb3JkaW5hdGUgb2Zmc2V0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2Q9Ml0gLSBUaGUgc2FtcGxpbmcgZGVuc2l0eS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXNldChpbWFnZURhdGEsIHgsIHksIGQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgSW1hZ2Vab25lIHdpdGggbmV3IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7SW1hZ2VEYXRhfSBpbWFnZURhdGEgLSBUaGUgaW1hZ2UgZGF0YSB0byB1c2UgZm9yIHRoZSB6b25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gLSBUaGUgeC1jb29yZGluYXRlIG9mZnNldC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdIC0gVGhlIHktY29vcmRpbmF0ZSBvZmZzZXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZD0yXSAtIFRoZSBzYW1wbGluZyBkZW5zaXR5LlxuICAgKi9cbiAgcmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBpbWFnZURhdGE7XG4gICAgdGhpcy54ID0gVXRpbC5pbml0VmFsdWUoeCwgMCk7XG4gICAgdGhpcy55ID0gVXRpbC5pbml0VmFsdWUoeSwgMCk7XG4gICAgdGhpcy5kID0gVXRpbC5pbml0VmFsdWUoZCwgMik7XG5cbiAgICB0aGlzLnZlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNldFZlY3RvcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHZlY3RvcnMgYmFzZWQgb24gdGhlIGltYWdlIGRhdGEuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSB2ZWN0b3Igb2JqZWN0LlxuICAgKi9cbiAgc2V0VmVjdG9ycygpIHtcbiAgICBsZXQgaSwgajtcbiAgICBjb25zdCBsZW5ndGgxID0gdGhpcy5pbWFnZURhdGEud2lkdGg7XG4gICAgY29uc3QgbGVuZ3RoMiA9IHRoaXMuaW1hZ2VEYXRhLmhlaWdodDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgxOyBpICs9IHRoaXMuZCkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGxlbmd0aDI7IGogKz0gdGhpcy5kKSB7XG4gICAgICAgIGxldCBpbmRleCA9ICgoaiA+PiAwKSAqIGxlbmd0aDEgKyAoaSA+PiAwKSkgKiA0O1xuXG4gICAgICAgIGlmICh0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPiAwKSB7XG4gICAgICAgICAgdGhpcy52ZWN0b3JzLnB1c2goeyB4OiBpICsgdGhpcy54LCB5OiBqICsgdGhpcy55IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIHBvaW50IGlzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBpbWFnZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIHRvIGNoZWNrLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwb2ludCBpcyB3aXRoaW4gYm91bmRzLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBnZXRCb3VuZCh4LCB5KSB7XG4gICAgY29uc3QgaW5kZXggPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA+IDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJhbmRvbSBwb3NpdGlvbiB3aXRoaW4gdGhlIGltYWdlIHpvbmUuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcG9zaXRpb24uXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB2ZWN0b3IgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy52ZWN0b3JzKTtcbiAgICByZXR1cm4gdGhpcy52ZWN0b3IuY29weSh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGNvbG9yIGF0IGEgc3BlY2lmaWMgcG9pbnQgaW4gdGhlIGltYWdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZS5cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgciwgZywgYiwgYW5kIGEgdmFsdWVzLlxuICAgKi9cbiAgZ2V0Q29sb3IoeCwgeSkge1xuICAgIHggLT0gdGhpcy54O1xuICAgIHkgLT0gdGhpcy55O1xuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogdGhpcy5pbWFnZURhdGEuZGF0YVtpXSxcbiAgICAgIGc6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDFdLFxuICAgICAgYjogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMl0sXG4gICAgICBhOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAzXVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSBjcm9zc2luZyBiZWhhdmlvci5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNoZWNrIGZvciBjcm9zc2luZy5cbiAgICovXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgcGFydGljbGUuZGVhZCA9IHRoaXMuZ2V0Qm91bmQocGFydGljbGUucC54IC0gdGhpcy54LCBwYXJ0aWNsZS5wLnkgLSB0aGlzLnkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKCF0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUudi5uZWdhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIEltYWdlWm9uZSBhbmQgY2xlYW5zIHVwIHJlc291cmNlcy5cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQ2lyY2xlWm9uZSBmcm9tIFwiLi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IExpbmVab25lIGZyb20gXCIuLi96b25lL0xpbmVab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4uL3pvbmUvUmVjdFpvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhZGRFdmVudExpc3RlbmVyKHByb3RvbiwgZnVuYykge1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCAoKSA9PiBmdW5jKCkpO1xuICB9LFxuXG4gIGdldFN0eWxlKGNvbG9yID0gXCIjZmYwMDAwXCIpIHtcbiAgICBjb25zdCByZ2IgPSBDb2xvclV0aWwuaGV4VG9SZ2IoY29sb3IpO1xuICAgIHJldHVybiBgcmdiYSgke3JnYi5yfSwgJHtyZ2IuZ30sICR7cmdiLmJ9LCAwLjUpYDtcbiAgfSxcblxuICBkcmF3Wm9uZShwcm90b24sIGNhbnZhcywgem9uZSwgY2xlYXIpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0U3R5bGUoKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sICgpID0+IHtcbiAgICAgIGlmIChjbGVhcikgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgaWYgKHpvbmUgaW5zdGFuY2VvZiBQb2ludFpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5hcmMoem9uZS54LCB6b25lLnksIDEwLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgTGluZVpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyh6b25lLngxLCB6b25lLnkxKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oem9uZS54Miwgem9uZS55Mik7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBSZWN0Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuZHJhd1JlY3Qoem9uZS54LCB6b25lLnksIHpvbmUud2lkdGgsIHpvbmUuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIENpcmNsZVpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgem9uZS5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBkcmF3RW1pdHRlcihwcm90b24sIGNhbnZhcywgZW1pdHRlciwgY2xlYXIpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0U3R5bGUoKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sICgpID0+IHtcbiAgICAgIGlmIChjbGVhcikgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3R5bGU7XG4gICAgICBjb250ZXh0LmFyYyhlbWl0dGVyLnAueCwgZW1pdHRlci5wLnksIDEwLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgUGFydGljbGUgZnJvbSBcIi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IFBvb2wgZnJvbSBcIi4vY29yZS9Qb29sXCI7XG5cbmltcG9ydCBVdGlsIGZyb20gXCIuL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBQb2xhcjJEIGZyb20gXCIuL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdDMgZnJvbSBcIi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4vbWF0aC9SZWN0YW5nbGVcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuL21hdGgvZWFzZVwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi9pbml0aWFsaXplL1JhdGVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL2luaXRpYWxpemUvSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IExpZmUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9MaWZlXCI7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSBcIi4vaW5pdGlhbGl6ZS9Qb3NpdGlvblwiO1xuaW1wb3J0IFZlbG9jaXR5IGZyb20gXCIuL2luaXRpYWxpemUvVmVsb2NpdHlcIjtcbmltcG9ydCBNYXNzIGZyb20gXCIuL2luaXRpYWxpemUvTWFzc1wiO1xuaW1wb3J0IFJhZGl1cyBmcm9tIFwiLi9pbml0aWFsaXplL1JhZGl1c1wiO1xuaW1wb3J0IEJvZHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Cb2R5XCI7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vYmVoYXZpb3VyL0JlaGF2aW91clwiO1xuaW1wb3J0IEZvcmNlIGZyb20gXCIuL2JlaGF2aW91ci9Gb3JjZVwiO1xuaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0F0dHJhY3Rpb25cIjtcbmltcG9ydCBSYW5kb21EcmlmdCBmcm9tIFwiLi9iZWhhdmlvdXIvUmFuZG9tRHJpZnRcIjtcbmltcG9ydCBHcmF2aXR5IGZyb20gXCIuL2JlaGF2aW91ci9HcmF2aXR5XCI7XG5pbXBvcnQgQ29sbGlzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9Db2xsaXNpb25cIjtcbmltcG9ydCBDcm9zc1pvbmUgZnJvbSBcIi4vYmVoYXZpb3VyL0Nyb3NzWm9uZVwiO1xuaW1wb3J0IEFscGhhIGZyb20gXCIuL2JlaGF2aW91ci9BbHBoYVwiO1xuaW1wb3J0IFNjYWxlIGZyb20gXCIuL2JlaGF2aW91ci9TY2FsZVwiO1xuaW1wb3J0IFJvdGF0ZSBmcm9tIFwiLi9iZWhhdmlvdXIvUm90YXRlXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4vYmVoYXZpb3VyL0NvbG9yXCI7XG5pbXBvcnQgQ3ljbG9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3ljbG9uZVwiO1xuaW1wb3J0IFJlcHVsc2lvbiBmcm9tIFwiLi9iZWhhdmlvdXIvUmVwdWxzaW9uXCI7XG5pbXBvcnQgR3Jhdml0eVdlbGwgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlXZWxsXCI7XG5cbmltcG9ydCBFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRW1pdHRlclwiO1xuaW1wb3J0IEJlaGF2aW91ckVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9CZWhhdmlvdXJFbWl0dGVyXCI7XG5pbXBvcnQgRm9sbG93RW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXJcIjtcblxuaW1wb3J0IENhbnZhc1JlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9DYW52YXNSZW5kZXJlclwiO1xuaW1wb3J0IERvbVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9Eb21SZW5kZXJlclwiO1xuaW1wb3J0IEVhc2VsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0Vhc2VsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhlbFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9QaXhlbFJlbmRlcmVyXCI7XG5pbXBvcnQgUGl4aVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9QaXhpUmVuZGVyZXJcIjtcbmltcG9ydCBXZWJHTFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9XZWJHTFJlbmRlcmVyXCI7XG5pbXBvcnQgQ3VzdG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0N1c3RvbVJlbmRlcmVyXCI7XG5cbmltcG9ydCBab25lIGZyb20gXCIuL3pvbmUvWm9uZVwiO1xuaW1wb3J0IExpbmVab25lIGZyb20gXCIuL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuL3pvbmUvQ2lyY2xlWm9uZVwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IFJlY3Rab25lIGZyb20gXCIuL3pvbmUvUmVjdFpvbmVcIjtcbmltcG9ydCBJbWFnZVpvbmUgZnJvbSBcIi4vem9uZS9JbWFnZVpvbmVcIjtcblxuaW1wb3J0IERlYnVnIGZyb20gXCIuL2RlYnVnL0RlYnVnXCI7XG5cbi8vIG5hbWVzcGFjZVxuUHJvdG9uLlBhcnRpY2xlID0gUGFydGljbGU7XG5Qcm90b24uUG9vbCA9IFBvb2w7XG5cblByb3Rvbi5VdGlsID0gVXRpbDtcblByb3Rvbi5Db2xvclV0aWwgPSBDb2xvclV0aWw7XG5Qcm90b24uTWF0aFV0aWwgPSBNYXRoVXRpbDtcblByb3Rvbi5WZWN0b3IyRCA9IFByb3Rvbi5WZWN0b3IgPSBWZWN0b3IyRDtcblByb3Rvbi5Qb2xhcjJEID0gUHJvdG9uLlBvbGFyID0gUG9sYXIyRDtcblByb3Rvbi5BcnJheVNwYW4gPSBBcnJheVNwYW47XG5Qcm90b24uUmVjdGFuZ2xlID0gUmVjdGFuZ2xlO1xuUHJvdG9uLlJhdGUgPSBSYXRlO1xuUHJvdG9uLmVhc2UgPSBlYXNlO1xuUHJvdG9uLlNwYW4gPSBTcGFuO1xuUHJvdG9uLk1hdDMgPSBNYXQzO1xuUHJvdG9uLmdldFNwYW4gPSAoYSwgYiwgY2VudGVyKSA9PiBuZXcgU3BhbihhLCBiLCBjZW50ZXIpO1xuUHJvdG9uLmNyZWF0ZUFycmF5U3BhbiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW47XG5cblByb3Rvbi5Jbml0aWFsaXplID0gUHJvdG9uLkluaXQgPSBJbml0aWFsaXplO1xuUHJvdG9uLkxpZmUgPSBQcm90b24uTCA9IExpZmU7XG5Qcm90b24uUG9zaXRpb24gPSBQcm90b24uUCA9IFBvc2l0aW9uO1xuUHJvdG9uLlZlbG9jaXR5ID0gUHJvdG9uLlYgPSBWZWxvY2l0eTtcblByb3Rvbi5NYXNzID0gUHJvdG9uLk0gPSBNYXNzO1xuUHJvdG9uLlJhZGl1cyA9IFByb3Rvbi5SID0gUmFkaXVzO1xuUHJvdG9uLkJvZHkgPSBQcm90b24uQiA9IEJvZHk7XG5cblByb3Rvbi5CZWhhdmlvdXIgPSBCZWhhdmlvdXI7XG5Qcm90b24uRm9yY2UgPSBQcm90b24uRiA9IEZvcmNlO1xuUHJvdG9uLkF0dHJhY3Rpb24gPSBQcm90b24uQSA9IEF0dHJhY3Rpb247XG5Qcm90b24uUmFuZG9tRHJpZnQgPSBQcm90b24uUkQgPSBSYW5kb21EcmlmdDtcblByb3Rvbi5HcmF2aXR5ID0gUHJvdG9uLkcgPSBHcmF2aXR5O1xuUHJvdG9uLkNvbGxpc2lvbiA9IENvbGxpc2lvbjtcblByb3Rvbi5Dcm9zc1pvbmUgPSBDcm9zc1pvbmU7XG5Qcm90b24uQWxwaGEgPSBBbHBoYTtcblByb3Rvbi5TY2FsZSA9IFByb3Rvbi5TID0gU2NhbGU7XG5Qcm90b24uUm90YXRlID0gUm90YXRlO1xuUHJvdG9uLkNvbG9yID0gQ29sb3I7XG5Qcm90b24uUmVwdWxzaW9uID0gUmVwdWxzaW9uO1xuUHJvdG9uLkN5Y2xvbmUgPSBDeWNsb25lO1xuUHJvdG9uLkdyYXZpdHlXZWxsID0gR3Jhdml0eVdlbGw7XG5cblByb3Rvbi5FbWl0dGVyID0gRW1pdHRlcjtcblByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyID0gQmVoYXZpb3VyRW1pdHRlcjtcblByb3Rvbi5Gb2xsb3dFbWl0dGVyID0gRm9sbG93RW1pdHRlcjtcblxuUHJvdG9uLlpvbmUgPSBab25lO1xuUHJvdG9uLkxpbmVab25lID0gTGluZVpvbmU7XG5Qcm90b24uQ2lyY2xlWm9uZSA9IENpcmNsZVpvbmU7XG5Qcm90b24uUG9pbnRab25lID0gUG9pbnRab25lO1xuUHJvdG9uLlJlY3Rab25lID0gUmVjdFpvbmU7XG5Qcm90b24uSW1hZ2Vab25lID0gSW1hZ2Vab25lO1xuXG5Qcm90b24uQ2FudmFzUmVuZGVyZXIgPSBDYW52YXNSZW5kZXJlcjtcblByb3Rvbi5Eb21SZW5kZXJlciA9IERvbVJlbmRlcmVyO1xuUHJvdG9uLkVhc2VsUmVuZGVyZXIgPSBFYXNlbFJlbmRlcmVyO1xuUHJvdG9uLlBpeGlSZW5kZXJlciA9IFBpeGlSZW5kZXJlcjtcblByb3Rvbi5QaXhlbFJlbmRlcmVyID0gUGl4ZWxSZW5kZXJlcjtcblByb3Rvbi5XZWJHTFJlbmRlcmVyID0gUHJvdG9uLldlYkdsUmVuZGVyZXIgPSBXZWJHTFJlbmRlcmVyO1xuUHJvdG9uLkN1c3RvbVJlbmRlcmVyID0gQ3VzdG9tUmVuZGVyZXI7XG5cblByb3Rvbi5EZWJ1ZyA9IERlYnVnO1xuVXRpbC5hc3NpZ24oUHJvdG9uLCBlYXNlKTtcblxuLy8gZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBQcm90b247XG5leHBvcnQge1xuICBQYXJ0aWNsZSxcbiAgUG9vbCxcbiAgVXRpbCxcbiAgQ29sb3JVdGlsLFxuICBNYXRoVXRpbCxcbiAgVmVjdG9yMkQsXG4gIFBvbGFyMkQsXG4gIE1hdDMsXG4gIFNwYW4sXG4gIEFycmF5U3BhbixcbiAgUmVjdGFuZ2xlLFxuICBlYXNlLFxuICBSYXRlLFxuICBJbml0aWFsaXplLFxuICBMaWZlLFxuICBQb3NpdGlvbixcbiAgVmVsb2NpdHksXG4gIE1hc3MsXG4gIFJhZGl1cyxcbiAgQm9keSxcbiAgQmVoYXZpb3VyLFxuICBGb3JjZSxcbiAgQXR0cmFjdGlvbixcbiAgUmFuZG9tRHJpZnQsXG4gIEdyYXZpdHksXG4gIENvbGxpc2lvbixcbiAgQ3Jvc3Nab25lLFxuICBBbHBoYSxcbiAgU2NhbGUsXG4gIFJvdGF0ZSxcbiAgQ29sb3IsXG4gIEN5Y2xvbmUsXG4gIFJlcHVsc2lvbixcbiAgR3Jhdml0eVdlbGwsXG4gIEVtaXR0ZXIsXG4gIEJlaGF2aW91ckVtaXR0ZXIsXG4gIEZvbGxvd0VtaXR0ZXIsXG4gIENhbnZhc1JlbmRlcmVyLFxuICBEb21SZW5kZXJlcixcbiAgRWFzZWxSZW5kZXJlcixcbiAgUGl4ZWxSZW5kZXJlcixcbiAgUGl4aVJlbmRlcmVyLFxuICBXZWJHTFJlbmRlcmVyLFxuICBDdXN0b21SZW5kZXJlcixcbiAgWm9uZSxcbiAgTGluZVpvbmUsXG4gIENpcmNsZVpvbmUsXG4gIFBvaW50Wm9uZSxcbiAgUmVjdFpvbmUsXG4gIEltYWdlWm9uZSxcbiAgRGVidWdcbn07XG4iXSwibmFtZXMiOlsiaXBvdCIsImxlbmd0aCIsIm5ocG90IiwiaSIsIm1ha2VUcmFuc2xhdGlvbiIsInR4IiwidHkiLCJtYWtlUm90YXRpb24iLCJhbmdsZUluUmFkaWFucyIsImMiLCJNYXRoIiwiY29zIiwicyIsInNpbiIsIm1ha2VTY2FsZSIsInN4Iiwic3kiLCJtYXRyaXhNdWx0aXBseSIsImEiLCJiIiwiYTAwIiwiYTAxIiwiYTAyIiwiYTEwIiwiYTExIiwiYTEyIiwiYTIwIiwiYTIxIiwiYTIyIiwiYjAwIiwiYjAxIiwiYjAyIiwiYjEwIiwiYjExIiwiYjEyIiwiYjIwIiwiYjIxIiwiYjIyIiwiY3JlYXRlQ2FudmFzIiwiaWQiLCJ3aWR0aCIsImhlaWdodCIsInBvc2l0aW9uIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJvcGFjaXR5IiwidHJhbnNmb3JtIiwiY3JlYXRlRGl2IiwicmVzaXplIiwibWFyZ2luTGVmdCIsIm1hcmdpblRvcCIsImRpdiIsIngiLCJ5Iiwic2NhbGUiLCJyb3RhdGUiLCJ3aWxsQ2hhbmdlIiwiY3NzMyIsInRyYW5zZm9ybTNkIiwia2V5IiwidmFsIiwiYmtleSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaW1nc0NhY2hlIiwiY2FudmFzQ2FjaGUiLCJjYW52YXNJZCIsImdldEltYWdlRGF0YSIsImNvbnRleHQiLCJpbWFnZSIsInJlY3QiLCJkcmF3SW1hZ2UiLCJpbWFnZWRhdGEiLCJjbGVhclJlY3QiLCJnZXRJbWdGcm9tQ2FjaGUiLCJpbWciLCJjYWxsYmFjayIsInBhcmFtIiwic3JjIiwiSW1hZ2UiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwiZ2V0Q2FudmFzRnJvbUNhY2hlIiwiV2ViR0xVdGlsIiwiY2FudmFzIiwiRG9tVXRpbCIsImdldENvbnRleHQiLCJpbml0VmFsdWUiLCJ2YWx1ZSIsImRlZmF1bHRzIiwidW5kZWZpbmVkIiwiaXNBcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImVtcHR5QXJyYXkiLCJhcnIiLCJ0b0FycmF5Iiwic2xpY2VBcnJheSIsImFycjEiLCJpbmRleCIsImFycjIiLCJwdXNoIiwiZ2V0UmFuZEZyb21BcnJheSIsImZsb29yIiwicmFuZG9tIiwiZW1wdHlPYmplY3QiLCJvYmoiLCJpZ25vcmUiLCJpbmRleE9mIiwiY2xhc3NBcHBseSIsImNvbnN0cnVjdG9yIiwiYXJncyIsIkZhY3RvcnlGdW5jIiwiYmluZCIsImFwcGx5IiwiY29uY2F0IiwiSW1nVXRpbCIsImRlc3Ryb3lBbGwiLCJkZXN0cm95IiwiYXNzaWduIiwic291cmNlIiwiaGFzT3duUHJvcGVydHkiLCJpZHNNYXAiLCJQdWlkIiwiX2luZGV4IiwiX2NhY2hlIiwidHlwZSIsImdldElkIiwidWlkIiwiZ2V0SWRGcm9tQ2FjaGUiLCJpc0JvZHkiLCJpc0lubmVyIiwiZ2V0VGFyZ2V0IiwiUG9vbCIsIm51bSIsInRvdGFsIiwiY2FjaGUiLCJfcHJvdG8iLCJnZXQiLCJwYXJhbXMiLCJwIiwiX19wdWlkIiwicG9wIiwiY3JlYXRlT3JDbG9uZSIsImV4cGlyZSIsImdldENhY2hlIiwiY3JlYXRlIiwiVXRpbCIsImNsb25lIiwiZ2V0Q291bnQiLCJjb3VudCIsIlN0YXRzIiwicHJvdG9uIiwiY29udGFpbmVyIiwiZW1pdHRlckluZGV4IiwicmVuZGVyZXJJbmRleCIsInVwZGF0ZSIsImJvZHkiLCJhZGQiLCJlbWl0dGVyIiwiZ2V0RW1pdHRlciIsInJlbmRlcmVyIiwiZ2V0UmVuZGVyZXIiLCJzdHIiLCJlbWl0dGVycyIsImVtaXRTcGVlZCIsImdldEVtaXR0ZXJQb3MiLCJpbml0aWFsaXplcyIsImNvbmNhdEFyciIsImJlaGF2aW91cnMiLCJuYW1lIiwiZ2V0Q3JlYXRlZE51bWJlciIsInBvb2wiLCJpbm5lckhUTUwiLCJfdGhpcyIsImNzc1RleHQiLCJqb2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJnIiwiY29sb3IiLCJwYXJlbnROb2RlIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJlcnMiLCJyZXN1bHQiLCJjcG9vbCIsInJvdW5kIiwicmVtb3ZlQ2hpbGQiLCJFdmVudERpc3BhdGNoZXIiLCJfbGlzdGVuZXJzIiwiZGlzcGF0Y2hFdmVudCIsImhhc0V2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMiLCJsaXN0ZW5lciIsInNwbGljZSIsImxpc3RlbmVycyIsImhhbmRsZXIiLCJQSSIsIklORklOSVRZIiwiSW5maW5pdHkiLCJNYXRoVXRpbCIsIlBJeDIiLCJQSV8yIiwiUElfMTgwIiwiTjE4MF9QSSIsImlzSW5maW5pdHkiLCJyYW5kb21BVG9CIiwiaXNJbnQiLCJyYW5kb21GbG9hdGluZyIsImNlbnRlciIsImYiLCJyYW5kb21Db2xvciIsInNsaWNlIiwicmFuZG9tWm9uZSIsImRpc3BsYXkiLCJrIiwiZGlnaXRzIiwicG93IiwiZGVncmVlVHJhbnNmb3JtIiwidG9Db2xvcjE2IiwiSW50ZWdyYXRpb24iLCJjYWxjdWxhdGUiLCJwYXJ0aWNsZXMiLCJ0aW1lIiwiZGFtcGluZyIsImV1bGVySW50ZWdyYXRlIiwicGFydGljbGUiLCJzbGVlcCIsIm9sZCIsImNvcHkiLCJ2IiwibXVsdGlwbHlTY2FsYXIiLCJtYXNzIiwiY2xlYXIiLCJQcm90b24iLCJpbnRlZ3JhdGlvblR5cGUiLCJub3ciLCJ0aGVuIiwiZWxhcHNlZCIsInN0YXRzIiwiRVVMRVIiLCJpbnRlZ3JhdG9yIiwiX2ZwcyIsIl9pbnRlcnZhbCIsIkRFRkFVTFRfSU5URVJWQUwiLCJhZGRSZW5kZXJlciIsInJlbmRlciIsImluaXQiLCJyZW1vdmVSZW5kZXJlciIsInJlbW92ZSIsImFkZEVtaXR0ZXIiLCJwYXJlbnQiLCJFTUlUVEVSX0FEREVEIiwicmVtb3ZlRW1pdHRlciIsIkVNSVRURVJfUkVNT1ZFRCIsIlBST1RPTl9VUERBVEUiLCJVU0VfQ0xPQ0siLCJEYXRlIiwiZ2V0VGltZSIsImFtZW5kQ2hhbmdlVGFic0J1ZyIsImVtaXR0ZXJzVXBkYXRlIiwiUFJPVE9OX1VQREFURV9BRlRFUiIsImdldEFsbFBhcnRpY2xlcyIsImRlc3Ryb3lBbGxFbWl0dGVycyIsImRlc3Ryb3lPdGhlciIsInNldFRpbWVvdXQiLCJfY3JlYXRlQ2xhc3MiLCJzZXQiLCJmcHMiLCJNRUFTVVJFIiwiUksyIiwiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX1VQREFURSIsIlBBUlRJQ0xFX1NMRUVQIiwiUEFSVElDTEVfREVBRCIsIlJnYiIsInIiLCJnIiwicmVzZXQiLCJTcGFuIiwiZ2V0VmFsdWUiLCJzZXRTcGFuVmFsdWUiLCJnZXRTcGFuVmFsdWUiLCJwYW4iLCJoYXNQcm9wIiwic2V0UHJvcCIsInByb3BzIiwicHJvcCIsInNldFZlY3RvclZhbCIsImNvbmYiLCJlYXNlTGluZWFyIiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbkN1YmljIiwiZWFzZU91dEN1YmljIiwiZWFzZUluT3V0Q3ViaWMiLCJlYXNlSW5RdWFydCIsImVhc2VPdXRRdWFydCIsImVhc2VJbk91dFF1YXJ0IiwiZWFzZUluU2luZSIsImVhc2VPdXRTaW5lIiwiZWFzZUluT3V0U2luZSIsImVhc2VJbkV4cG8iLCJlYXNlT3V0RXhwbyIsImVhc2VJbk91dEV4cG8iLCJlYXNlSW5DaXJjIiwic3FydCIsImVhc2VPdXRDaXJjIiwiZWFzZUluT3V0Q2lyYyIsImVhc2VJbkJhY2siLCJlYXNlT3V0QmFjayIsImVhc2VJbk91dEJhY2siLCJnZXRFYXNpbmciLCJlYXNlIiwiVmVjdG9yMkQiLCJzZXRYIiwic2V0WSIsImdldEdyYWRpZW50IiwiYXRhbjIiLCJ3IiwiYWRkVmVjdG9ycyIsImFkZFhZIiwic3ViIiwic3ViVmVjdG9ycyIsImRpdmlkZVNjYWxhciIsIm5lZ2F0ZSIsImRvdCIsImxlbmd0aFNxIiwibm9ybWFsaXplIiwiZGlzdGFuY2VUbyIsImRpc3RhbmNlVG9TcXVhcmVkIiwidGhhIiwiZHgiLCJkeSIsImxlcnAiLCJhbHBoYSIsImVxdWFscyIsIlBhcnRpY2xlIiwiZGF0YSIsInJnYiIsIlByb3BVdGlsIiwiZ2V0RGlyZWN0aW9uIiwibGlmZSIsImFnZSIsImRlYWQiLCJzcHJpdGUiLCJlbmVyZ3kiLCJyYWRpdXMiLCJyb3RhdGlvbiIsImVhc2luZyIsInJlbW92ZUFsbEJlaGF2aW91cnMiLCJhcHBseUJlaGF2aW91cnMiLCJtYXgiLCJhcHBseUJlaGF2aW91ciIsImFkZEJlaGF2aW91ciIsImJlaGF2aW91ciIsInBhcmVudHMiLCJpbml0aWFsaXplIiwiYWRkQmVoYXZpb3VycyIsInJlbW92ZUJlaGF2aW91ciIsImhleFRvUmdiIiwiaCIsImhleDE2Iiwic3Vic3RyaW5nIiwicGFyc2VJbnQiLCJyZ2JUb0hleCIsInJiZyIsImdldEhleDE2RnJvbVBhcnRpY2xlIiwiTnVtYmVyIiwiUG9sYXIyRCIsImFicyIsInNldFIiLCJzZXRUaGEiLCJ0b1ZlY3RvciIsImdldFgiLCJnZXRZIiwiTWF0MyIsIm1hdDMiLCJtYXQiLCJGbG9hdDMyQXJyYXkiLCJtYXQxIiwibWF0MiIsIm11bHRpcGx5IiwiaW52ZXJzZSIsImQiLCJtdWx0aXBseVZlYzIiLCJtIiwidmVjIiwiQXJyYXlTcGFuIiwiX1NwYW4iLCJfaW5oZXJpdHNMb29zZSIsIl9hcnIiLCJjcmVhdGVBcnJheVNwYW4iLCJSZWN0YW5nbGUiLCJib3R0b20iLCJyaWdodCIsImNvbnRhaW5zIiwiUmF0ZSIsIm51bXBhbiIsInRpbWVwYW4iLCJudW1QYW4iLCJ0aW1lUGFuIiwic3RhcnRUaW1lIiwibmV4dFRpbWUiLCJJbml0aWFsaXplIiwiTGlmZSIsIl9Jbml0aWFsaXplIiwibGlmZVBhbiIsIlpvbmUiLCJ2ZWN0b3IiLCJjcm9zc1R5cGUiLCJhbGVydCIsImdldFBvc2l0aW9uIiwiY3Jvc3NpbmciLCJQb2ludFpvbmUiLCJfWm9uZSIsImNvbnNvbGUiLCJlcnJvciIsIlBvc2l0aW9uIiwiem9uZSIsIlZlbG9jaXR5IiwicnBhbiIsInRoYXBhbiIsInJQYW4iLCJ0aGFQYW4iLCJub3JtYWxpemVWZWxvY2l0eSIsInZyIiwicG9sYXIyZCIsIk1hc3MiLCJtYXNzUGFuIiwiUmFkaXVzIiwib2xkUmFkaXVzIiwiQm9keSIsImltYWdlVGFyZ2V0IiwiaW5uZXIiLCJCZWhhdmlvdXIiLCJub3JtYWxpemVGb3JjZSIsImZvcmNlIiwibm9ybWFsaXplVmFsdWUiLCJGb3JjZSIsIl9CZWhhdmlvdXIiLCJmeCIsImZ5IiwiQXR0cmFjdGlvbiIsInRhcmdldFBvc2l0aW9uIiwicmFkaXVzU3EiLCJhdHRyYWN0aW9uRm9yY2UiLCJSYW5kb21EcmlmdCIsImRyaWZ0WCIsImRyaWZ0WSIsImRlbGF5IiwicGFuRm9jZSIsIkdyYXZpdHkiLCJfRm9yY2UiLCJDb2xsaXNpb24iLCJuZXdQb29sIiwiY29sbGlzaW9uUG9vbCIsImRlbHRhIiwib3RoZXJQYXJ0aWNsZSIsIm92ZXJsYXAiLCJ0b3RhbE1hc3MiLCJhdmVyYWdlTWFzczEiLCJhdmVyYWdlTWFzczIiLCJkaXN0YW5jZSIsIkNyb3NzWm9uZSIsIkFscGhhIiwic2FtZSIsImFscGhhQSIsImFscGhhQiIsIlNjYWxlIiwic2NhbGVBIiwic2NhbGVCIiwiUm90YXRlIiwiaW5mbHVlbmNlIiwicm90YXRpb25BIiwicm90YXRpb25CIiwiQ29sb3IiLCJjb2xvckEiLCJDb2xvclV0aWwiLCJjb2xvckIiLCJDSEFOR0lORyIsIkN5Y2xvbmUiLCJhbmdsZSIsInNldEFuZ2xlQW5kRm9yY2UiLCJzcGFuIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJjYW5nbGUiLCJjeWNsb25lIiwiZ3JhZGllbnQiLCJSZXB1bHNpb24iLCJfQXR0cmFjdGlvbiIsIkdyYXZpdHlXZWxsIiwiY2VudGVyUG9pbnQiLCJkaXN0YW5jZVZlYyIsImRpc3RhbmNlU3EiLCJmYWN0b3IiLCJiaW5kRW1pdHRlciIsIkVtaXR0ZXIiLCJfUGFydGljbGUiLCJlbWl0VGltZSIsInRvdGFsVGltZSIsInJhdGUiLCJlbWl0Iiwic3RvcGVkIiwiaXNOYU4iLCJzdG9wIiwicHJlRW1pdCIsIm9sZFN0b3BlZCIsIm9sZEVtaXRUaW1lIiwib2xkVG90YWxUaW1lIiwic3RlcCIsInJlbW92ZUFsbFBhcnRpY2xlcyIsImFkZFNlbGZJbml0aWFsaXplIiwiYWRkSW5pdGlhbGl6ZSIsIl9sZW4iLCJhcmd1bWVudHMiLCJyZXN0IiwiQXJyYXkiLCJfa2V5IiwicmVtb3ZlSW5pdGlhbGl6ZSIsImluaXRpYWxpemVyIiwicmVtb3ZlQWxsSW5pdGlhbGl6ZXJzIiwiX2xlbjIiLCJfa2V5MiIsImVtaXR0aW5nIiwiaW50ZWdyYXRlIiwiZGlzcGF0Y2giLCJldmVudCIsImJpbmRFdmVudCIsImNyZWF0ZVBhcnRpY2xlIiwic2V0dXBQYXJ0aWNsZSIsIkluaXRpYWxpemVVdGlsIiwiQmVoYXZpb3VyRW1pdHRlciIsIl9FbWl0dGVyIiwic2VsZkJlaGF2aW91cnMiLCJhZGRTZWxmQmVoYXZpb3VyIiwicmVtb3ZlU2VsZkJlaGF2aW91ciIsIkZvbGxvd0VtaXR0ZXIiLCJtb3VzZVRhcmdldCIsIndpbmRvdyIsIl9hbGxvd0VtaXR0aW5nIiwiaW5pdEV2ZW50SGFuZGxlciIsIl90aGlzMiIsIm1vdXNlbW92ZUhhbmRsZXIiLCJtb3VzZW1vdmUiLCJtb3VzZWRvd25IYW5kbGVyIiwibW91c2Vkb3duIiwibW91c2V1cEhhbmRsZXIiLCJtb3VzZXVwIiwibGF5ZXJYIiwibGF5ZXJZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJpc0ltYWdlIiwiX19pc0ltYWdlIiwidGFnTmFtZSIsIm5vZGVOYW1lIiwiaXNTdHJpbmciLCJCYXNlUmVuZGVyZXIiLCJlbGVtZW50Iiwic3Ryb2tlIiwiY2lyY2xlQ29uZiIsImlzQ2lyY2xlIiwic2V0U3Ryb2tlIiwidGhpbmtuZXNzIiwiX3Byb3RvblVwZGF0ZUhhbmRsZXIiLCJvblByb3RvblVwZGF0ZSIsIl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIiLCJvblByb3RvblVwZGF0ZUFmdGVyIiwiX2VtaXR0ZXJBZGRlZEhhbmRsZXIiLCJvbkVtaXR0ZXJBZGRlZCIsIl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIiLCJvbkVtaXR0ZXJSZW1vdmVkIiwiX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIiLCJvblBhcnRpY2xlQ3JlYXRlZCIsIl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIiLCJvblBhcnRpY2xlVXBkYXRlIiwiX3BhcnRpY2xlRGVhZEhhbmRsZXIiLCJvblBhcnRpY2xlRGVhZCIsIkNhbnZhc1JlbmRlcmVyIiwiX0Jhc2VSZW5kZXJlciIsImJ1ZmZlckNhY2hlIiwiYWRkSW1nMkJvZHkiLCJUeXBlcyIsImRyYXdDaXJjbGUiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJidWZDb250ZXh0IiwiZ2xvYmFsQWxwaGEiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyZXN0b3JlIiwiYmVnaW5QYXRoIiwiYXJjIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJjbG9zZVBhdGgiLCJmaWxsIiwic2l6ZSIsIkRvbVJlbmRlcmVyIiwiY3JlYXRlQm9keSIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJib2R5UmVhZHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjcmVhdGVDaXJjbGUiLCJjcmVhdGVTcHJpdGUiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwidXJsIiwiYmFja2dyb3VuZEltYWdlIiwiRWFzZWxSZW5kZXJlciIsImFkZENoaWxkIiwic2NhbGVYIiwic2NhbGVZIiwiZ3JhcGhpY3MiLCJyZWdYIiwicmVnWSIsImNyZWF0ZWpzIiwiR3JhcGhpY3MiLCJiZWdpblN0cm9rZSIsImJlZ2luRmlsbCIsInNoYXBlIiwiU2hhcGUiLCJQaXhlbFJlbmRlcmVyIiwicmVjdGFuZ2xlIiwiaW1hZ2VEYXRhIiwiY3JlYXRlSW1hZ2VEYXRhIiwicHV0SW1hZ2VEYXRhIiwic2V0UGl4ZWwiLCJQSVhJQ2xhc3MiLCJQaXhpUmVuZGVyZXIiLCJzZXRDb2xvciIsImJsZW5kTW9kZSIsInNldFBJWEkiLCJQSVhJIiwiU3ByaXRlIiwiY3JlYXRlRnJvbUltYWdlIiwiZnJvbSIsImZyb21JbWFnZSIsInRpbnQiLCJhbmNob3IiLCJlbmRGaWxsIiwiTVN0YWNrIiwibWF0cyIsInRvcCIsIldlYkdMUmVuZGVyZXIiLCJnbCIsImFudGlhbGlhcyIsInN0ZW5jaWwiLCJkZXB0aCIsImluaXRWYXIiLCJzZXRNYXhSYWRpdXMiLCJpbml0U2hhZGVycyIsImluaXRCdWZmZXJzIiwiYmxlbmRFcXVhdGlvbiIsIkZVTkNfQUREIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FX01JTlVTX1NSQ19BTFBIQSIsImVuYWJsZSIsIkJMRU5EIiwidW1hdCIsInNtYXQiLCJtc3RhY2siLCJ2aWV3cG9ydCIsImNpcmNsZUNhbnZhc1VSTCIsImdldFZlcnRleFNoYWRlciIsInZzU291cmNlIiwiZ2V0RnJhZ21lbnRTaGFkZXIiLCJmc1NvdXJjZSIsInRleHR1cmVidWZmZXJzIiwiQSIsIkIiLCJnZXRTaGFkZXIiLCJmcyIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwiZnJhZ21lbnRTaGFkZXIiLCJ2ZXJ0ZXhTaGFkZXIiLCJzcHJvZ3JhbSIsImNyZWF0ZVByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsInVzZVByb2dyYW0iLCJ2cGEiLCJnZXRBdHRyaWJMb2NhdGlvbiIsInRjYSIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidE1hdFVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJzYW1wbGVyVW5pZm9ybSIsInVzZVRleCIsInVuaWZvcm0xaSIsInZzIiwiaWR4IiwidW5pdElCdWZmZXIiLCJiaW5kQnVmZmVyIiwiRUxFTUVOVF9BUlJBWV9CVUZGRVIiLCJidWZmZXJEYXRhIiwiVWludDE2QXJyYXkiLCJTVEFUSUNfRFJBVyIsImlkcyIsInVuaXRJMzMiLCJzdHJpcEJ1ZmZlciIsInJhaWR1cyIsImNpcmNsZUNhbnZhc1JhZGl1cyIsInRvRGF0YVVSTCIsImRyYXdJbWcyQ2FudmFzIiwiX3ciLCJfaCIsIl93aWR0aCIsIl9oZWlnaHQiLCJfc2NhbGVYIiwiX3NjYWxlWSIsImNyZWF0ZVRleHR1cmUiLCJ0ZXh0dXJlIiwidmNCdWZmZXIiLCJ0Y0J1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJpbmRUZXh0dXJlIiwiVEVYVFVSRV8yRCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsInRleFBhcmFtZXRlcmkiLCJURVhUVVJFX01BR19GSUxURVIiLCJMSU5FQVIiLCJURVhUVVJFX01JTl9GSUxURVIiLCJMSU5FQVJfTUlQTUFQX05FQVJFU1QiLCJnZW5lcmF0ZU1pcG1hcCIsInRleHR1cmVMb2FkZWQiLCJ0ZXh0dXJlV2lkdGgiLCJ0ZXh0dXJlSGVpZ2h0IiwidG1hdCIsImltYXQiLCJvbGRTY2FsZSIsInVwZGF0ZU1hdHJpeCIsInVuaWZvcm0zZiIsInVuaWZvcm1NYXRyaXgzZnYiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsIm1vdmVPcmlnaW5NYXRyaXgiLCJ0cmFuc2xhdGlvbk1hdHJpeCIsImFuZ2VsIiwicm90YXRpb25NYXRyaXgiLCJzY2FsZU1hdHJpeCIsIm1hdHJpeCIsIkN1c3RvbVJlbmRlcmVyIiwiTGluZVpvbmUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsImRpcmVjdGlvbiIsIm1pbngiLCJtaW4iLCJtaW55IiwibWF4eCIsIm1heHkiLCJ4eHl5IiwiZ2V0TGVuZ3RoIiwiQyIsIkQiLCJnZXREaXN0YW5jZSIsImdldFN5bW1ldHJpYyIsInRoYTIiLCJ0aGExIiwib2xkeCIsIm9sZHkiLCJyYW5nZU91dCIsIkNpcmNsZVpvbmUiLCJyYW5kb21SYWRpdXMiLCJzZXRDZW50ZXIiLCJSZWN0Wm9uZSIsIkltYWdlWm9uZSIsInZlY3RvcnMiLCJzZXRWZWN0b3JzIiwiaiIsImxlbmd0aDEiLCJsZW5ndGgyIiwiZ2V0Qm91bmQiLCJnZXRDb2xvciIsImZ1bmMiLCJnZXRTdHlsZSIsImRyYXdab25lIiwibW92ZVRvIiwibGluZVRvIiwiZHJhd1JlY3QiLCJkcmF3RW1pdHRlciIsIlZlY3RvciIsIlBvbGFyIiwiZ2V0U3BhbiIsIkluaXQiLCJMIiwiUCIsIlYiLCJNIiwiUiIsIkYiLCJSRCIsIkciLCJTIiwiV2ViR2xSZW5kZXJlciIsIkRlYnVnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7SUFDRUEsSUFBSSxFQUFBLFNBQUFBLElBQUNDLENBQUFBLE1BQU0sRUFBRTtFQUNYLElBQUEsT0FBTyxDQUFDQSxNQUFNLEdBQUlBLE1BQU0sR0FBRyxDQUFFLE1BQU0sQ0FBQyxDQUFBO0tBQ3JDO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtJQUNFQyxLQUFLLEVBQUEsU0FBQUEsS0FBQ0QsQ0FBQUEsTUFBTSxFQUFFO0VBQ1osSUFBQSxFQUFFQSxNQUFNLENBQUE7RUFDUixJQUFBLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxLQUFLLENBQUMsRUFBRTtFQUMvQkYsTUFBQUEsTUFBTSxHQUFHQSxNQUFNLEdBQUlBLE1BQU0sSUFBSUUsQ0FBRSxDQUFBO0VBQ2pDLEtBQUE7TUFFQSxPQUFPRixNQUFNLEdBQUcsQ0FBQyxDQUFBO0tBQ2xCO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUcsRUFBQUEsZUFBZSxFQUFBQSxTQUFBQSxlQUFBQSxDQUFDQyxFQUFFLEVBQUVDLEVBQUUsRUFBRTtFQUN0QixJQUFBLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRUQsRUFBRSxFQUFFQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDckM7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0lBQ0VDLFlBQVksRUFBQSxTQUFBQSxZQUFDQyxDQUFBQSxjQUFjLEVBQUU7RUFDM0IsSUFBQSxJQUFJQyxDQUFDLEdBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFDSCxjQUFjLENBQUMsQ0FBQTtFQUNoQyxJQUFBLElBQUlJLENBQUMsR0FBR0YsSUFBSSxDQUFDRyxHQUFHLENBQUNMLGNBQWMsQ0FBQyxDQUFBO0VBRWhDLElBQUEsT0FBTyxDQUFDQyxDQUFDLEVBQUUsQ0FBQ0csQ0FBQyxFQUFFLENBQUMsRUFBRUEsQ0FBQyxFQUFFSCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDcEM7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFSyxFQUFBQSxTQUFTLEVBQUFBLFNBQUFBLFNBQUFBLENBQUNDLEVBQUUsRUFBRUMsRUFBRSxFQUFFO0VBQ2hCLElBQUEsT0FBTyxDQUFDRCxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUVDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNyQztFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLGNBQWMsRUFBQUEsU0FBQUEsY0FBQUEsQ0FBQ0MsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFDbkIsSUFBSUMsR0FBRyxHQUFHRixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJRyxHQUFHLEdBQUdILENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlJLEdBQUcsR0FBR0osQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSUssR0FBRyxHQUFHTCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJTSxHQUFHLEdBQUdOLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlPLEdBQUcsR0FBR1AsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSVEsR0FBRyxHQUFHUixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJUyxHQUFHLEdBQUdULENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlVLEdBQUcsR0FBR1YsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSVcsR0FBRyxHQUFHVixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJVyxHQUFHLEdBQUdYLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlZLEdBQUcsR0FBR1osQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSWEsR0FBRyxHQUFHYixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJYyxHQUFHLEdBQUdkLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUllLEdBQUcsR0FBR2YsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSWdCLEdBQUcsR0FBR2hCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElB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
