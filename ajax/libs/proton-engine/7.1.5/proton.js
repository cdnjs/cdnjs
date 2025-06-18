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

    /**
     * Sets the frames per second (FPS) for the Proton system.
     * @param {number|string} fps - The desired FPS. Use "auto" for default behavior, or a number for a specific FPS.
     */
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
      get:
      /**
       * Gets the current frames per second (FPS) setting.
       * @returns {number|string} The current FPS setting. Returns "auto" if set to default, or a number representing the specific FPS.
       */
      function get() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy9tYXRoL1NwYW4uanMiLCIuLi9zcmMvdXRpbHMvUHJvcFV0aWwuanMiLCIuLi9zcmMvbWF0aC9lYXNlLmpzIiwiLi4vc3JjL21hdGgvVmVjdG9yMkQuanMiLCIuLi9zcmMvY29yZS9QYXJ0aWNsZS5qcyIsIi4uL3NyYy91dGlscy9Db2xvclV0aWwuanMiLCIuLi9zcmMvbWF0aC9Qb2xhcjJELmpzIiwiLi4vc3JjL21hdGgvTWF0My5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIHNsaWNlQXJyYXkoYXJyMSwgaW5kZXgsIGFycjIpIHtcbiAgICB0aGlzLmVtcHR5QXJyYXkoYXJyMik7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMi5wdXNoKGFycjFbaV0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRSYW5kRnJvbUFycmF5KGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoYXJyLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGVtcHR5T2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW55IG9iamVjdFxuICAgKi9cbiAgZW1wdHlPYmplY3Qob2JqLCBpZ25vcmUgPSBudWxsKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIGNvbnRpbnVlO1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWFrZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBhbmQgYmluZHMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBjbGFzc0FwcGx5XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIEEgY2xhc3MgdG8gbWFrZSBhbiBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBBbnkgYXJyYXkgdG8gYmluZCBpdCB0byB0aGUgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgaW5zdGFuY2Ugb2YgY29uc3RydWN0b3IsIG9wdGlvbmFsbHkgYmluZCB3aXRoIGFyZ3NcbiAgICovXG4gIGNsYXNzQXBwbHkoY29uc3RydWN0b3IsIGFyZ3MgPSBudWxsKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IEZhY3RvcnlGdW5jID0gY29uc3RydWN0b3IuYmluZC5hcHBseShjb25zdHJ1Y3RvciwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IEZhY3RvcnlGdW5jKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICByZXR1cm4gSW1nVXRpbC5nZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpO1xuICB9LFxuXG4gIGRlc3Ryb3lBbGwoYXJyLCBwYXJhbSA9IG51bGwpIHtcbiAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJbaV0uZGVzdHJveShwYXJhbSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBkZWxldGUgYXJyW2ldO1xuICAgIH1cblxuICAgIGFyci5sZW5ndGggPSAwO1xuICB9LFxuXG4gIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgaWRzTWFwID0ge307XG5cbmNvbnN0IFB1aWQgPSB7XG4gIF9pbmRleDogMCxcbiAgX2NhY2hlOiB7fSxcblxuICBpZCh0eXBlKSB7XG4gICAgaWYgKGlkc01hcFt0eXBlXSA9PT0gdW5kZWZpbmVkIHx8IGlkc01hcFt0eXBlXSA9PT0gbnVsbCkgaWRzTWFwW3R5cGVdID0gMDtcbiAgICByZXR1cm4gYCR7dHlwZX1fJHtpZHNNYXBbdHlwZV0rK31gO1xuICB9LFxuXG4gIGdldElkKHRhcmdldCkge1xuICAgIGxldCB1aWQgPSB0aGlzLmdldElkRnJvbUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKHVpZCkgcmV0dXJuIHVpZDtcblxuICAgIHVpZCA9IGBQVUlEXyR7dGhpcy5faW5kZXgrK31gO1xuICAgIHRoaXMuX2NhY2hlW3VpZF0gPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHVpZDtcbiAgfSxcblxuICBnZXRJZEZyb21DYWNoZSh0YXJnZXQpIHtcbiAgICBsZXQgb2JqLCBpZDtcblxuICAgIGZvciAoaWQgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIG9iaiA9IHRoaXMuX2NhY2hlW2lkXTtcblxuICAgICAgaWYgKG9iaiA9PT0gdGFyZ2V0KSByZXR1cm4gaWQ7XG4gICAgICBpZiAodGhpcy5pc0JvZHkob2JqLCB0YXJnZXQpICYmIG9iai5zcmMgPT09IHRhcmdldC5zcmMpIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpc0JvZHkob2JqLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIG9iai5pc0lubmVyICYmIHRhcmdldC5pc0lubmVyO1xuICB9LFxuXG4gIGdldFRhcmdldCh1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbdWlkXTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVpZDtcbiIsIi8qKlxuICogUG9vbCBpcyB0aGUgY2FjaGUgcG9vbCBvZiB0aGUgcHJvdG9uIGVuZ2luZSwgaXQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gKlxuICogZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpXG4gKiAgQ2xhc3NcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICogICAgdGFyZ2V0Ll9fcHVpZCA9IHVpZFxuICpcbiAqICBib2R5XG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqXG4gKlxuICogZXhwaXJlKHRhcmdldClcbiAqICBjYWNoZVt0YXJnZXQuX19wdWlkXSBwdXNoIHRhcmdldFxuICpcbiAqL1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBvZiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3RhbFxuICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FjaGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKSB7XG4gICAgbGV0IHA7XG4gICAgdWlkID0gdWlkIHx8IHRhcmdldC5fX3B1aWQgfHwgUHVpZC5nZXRJZCh0YXJnZXQpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVbdWlkXSAmJiB0aGlzLmNhY2hlW3VpZF0ubGVuZ3RoID4gMCkge1xuICAgICAgcCA9IHRoaXMuY2FjaGVbdWlkXS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHRoaXMuY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcC5fX3B1aWQgPSB0YXJnZXQuX19wdWlkIHx8IHVpZDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGV4cGlyZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZSh0YXJnZXQuX19wdWlkKS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldCBhbnkgT2JqZWN0IG9yIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpIHtcbiAgICB0aGlzLnRvdGFsKys7XG5cbiAgICBpZiAodGhpcy5jcmVhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBVdGlsLmNsYXNzQXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiAtIHdoYXQgaXMgaW4gdGhlIGNhY2hlP1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSBjb3VudCArPSB0aGlzLmNhY2hlW2lkXS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveWVzIGFsbCBpdGVtcyBmcm9tIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZVtpZF0ubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q2FjaGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdWlkIHRoZSB1bmlxdWUgaWRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2FjaGUodWlkID0gXCJkZWZhdWx0XCIpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVbdWlkXSkgdGhpcy5jYWNoZVt1aWRdID0gW107XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdWlkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMge1xuICBjb25zdHJ1Y3Rvcihwcm90b24pIHtcbiAgICB0aGlzLnByb3RvbiA9IHByb3RvbjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50eXBlID0gMTtcblxuICAgIHRoaXMuZW1pdHRlckluZGV4ID0gMDtcbiAgICB0aGlzLnJlbmRlcmVySW5kZXggPSAwO1xuICB9XG5cbiAgdXBkYXRlKHN0eWxlLCBib2R5KSB7XG4gICAgdGhpcy5hZGQoc3R5bGUsIGJvZHkpO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZ2V0RW1pdHRlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgIGxldCBzdHIgPSBcIlwiO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3RyICs9IFwiZW1pdHRlcjpcIiArIHRoaXMucHJvdG9uLmVtaXR0ZXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiZW0gc3BlZWQ6XCIgKyBlbWl0dGVyLmVtaXRTcGVlZCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwicG9zOlwiICsgdGhpcy5nZXRFbWl0dGVyUG9zKGVtaXR0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiaW5pdGlhbGl6ZXM6XCIgKyBlbWl0dGVyLmluaXRpYWxpemVzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcilcbiAgICAgICAgICBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuaW5pdGlhbGl6ZXMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiYmVoYXZpb3VyczpcIiArIGVtaXR0ZXIuYmVoYXZpb3Vycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5iZWhhdmlvdXJzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gcmVuZGVyZXIubmFtZSArIFwiPGJyPlwiO1xuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSBcImJvZHk6XCIgKyB0aGlzLmdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpICsgXCI8YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHIgKz0gXCJwYXJ0aWNsZXM6XCIgKyB0aGlzLnByb3Rvbi5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInBvb2w6XCIgKyB0aGlzLnByb3Rvbi5wb29sLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwidG90YWw6XCIgKyB0aGlzLnByb3Rvbi5wb29sLnRvdGFsO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHN0cjtcbiAgfVxuXG4gIGFkZChzdHlsZSwgYm9keSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7XCIsXG4gICAgICAgIFwib3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMDtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XCIsXG4gICAgICAgIFwid2lkdGg6MTIwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZC1jb2xvcjojMDAyO2NvbG9yOiMwZmY7XCJcbiAgICAgIF0uam9pbihcIlwiKTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICB0aGlzLnR5cGUrKztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID4gNCkgdGhpcy50eXBlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIGxldCBiZywgY29sb3I7XG4gICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBiZyA9IFwiIzIwMVwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjZjA4XCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGJnID0gXCIjMDIwXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZjBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJnID0gXCIjMDAyXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZmZcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gYmc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImNvbG9yXCJdID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBib2R5ID0gYm9keSB8fCB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLmVtaXR0ZXJzW3RoaXMuZW1pdHRlckluZGV4XTtcbiAgfVxuXG4gIGdldFJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5yZW5kZXJlcnNbdGhpcy5yZW5kZXJlckluZGV4XTtcbiAgfVxuXG4gIGNvbmNhdEFycihhcnIpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBpZiAoIWFyciB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gKGFycltpXS5uYW1lIHx8IFwiXCIpLnN1YnN0cigwLCAxKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSB7XG4gICAgcmV0dXJuIHJlbmRlcmVyLnBvb2wudG90YWwgfHwgKHJlbmRlcmVyLmNwb29sICYmIHJlbmRlcmVyLmNwb29sLnRvdGFsKSB8fCAwO1xuICB9XG5cbiAgZ2V0RW1pdHRlclBvcyhlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoZS5wLngpICsgXCIsXCIgKyBNYXRoLnJvdW5kKGUucC55KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdG9uID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qXG4gKiBFdmVudERpc3BhdGNoZXJcbiAqIFRoaXMgY29kZSByZWZlcmVuY2Ugc2luY2UgaHR0cDovL2NyZWF0ZWpzLmNvbS8uXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGJpbmQodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuICAgIHRhcmdldC5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIGNvbnN0IGFyciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIGZhc3RlciBjaGVja3MuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIGVsc2UgaWYgKHRoaXMuX2xpc3RlbmVycykgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG5cbiAgICBpZiAodHlwZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIGxldCBhcnIgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgICBpZiAoIWFycikgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgLy8gYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAvLyB0byBhdm9pZCBpc3N1ZXMgd2l0aCBpdGVtcyBiZWluZyByZW1vdmVkIG9yIGFkZGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcblxuICAgICAgbGV0IGhhbmRsZXI7XG4gICAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGhhbmRsZXIgPSBhcnJbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBoYW5kbGVyKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfVxuXG4gIGhhc0V2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiIsImNvbnN0IFBJID0gMy4xNDE1OTI2O1xuY29uc3QgSU5GSU5JVFkgPSBJbmZpbml0eTtcblxuY29uc3QgTWF0aFV0aWwgPSB7XG4gIFBJOiBQSSxcbiAgUEl4MjogUEkgKiAyLFxuICBQSV8yOiBQSSAvIDIsXG4gIFBJXzE4MDogUEkgLyAxODAsXG4gIE4xODBfUEk6IDE4MCAvIFBJLFxuICBJbmZpbml0eTogLTk5OSxcblxuICBpc0luZmluaXR5KG51bSkge1xuICAgIHJldHVybiBudW0gPT09IHRoaXMuSW5maW5pdHkgfHwgbnVtID09PSBJTkZJTklUWTtcbiAgfSxcblxuICByYW5kb21BVG9CKGEsIGIsIGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzSW50KSByZXR1cm4gYSArIE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpO1xuICAgIGVsc2UgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpID4+IDApICsgYTtcbiAgfSxcblxuICByYW5kb21GbG9hdGluZyhjZW50ZXIsIGYsIGlzSW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tQVRvQihjZW50ZXIgLSBmLCBjZW50ZXIgKyBmLCBpc0ludCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICgoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCkgPDwgMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XG4gIH0sXG5cbiAgcmFuZG9tWm9uZShkaXNwbGF5KSB7fSxcblxuICBmbG9vcihudW0sIGsgPSA0KSB7XG4gICAgY29uc3QgZGlnaXRzID0gTWF0aC5wb3coMTAsIGspO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRpZ2l0cykgLyBkaWdpdHM7XG4gIH0sXG5cbiAgZGVncmVlVHJhbnNmb3JtKGEpIHtcbiAgICByZXR1cm4gKGEgKiBQSSkgLyAxODA7XG4gIH0sXG5cbiAgdG9Db2xvcjE2KG51bSkge1xuICAgIHJldHVybiBgIyR7bnVtLnRvU3RyaW5nKDE2KX1gO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVncmF0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBjYWxjdWxhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgdGhpcy5ldWxlckludGVncmF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpO1xuICB9XG5cbiAgLy8gRXVsZXIgSW50ZWdyYXRlXG4gIC8vIGh0dHBzOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4gIGV1bGVySW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zbGVlcCkge1xuICAgICAgcGFydGljbGUub2xkLnAuY29weShwYXJ0aWNsZS5wKTtcbiAgICAgIHBhcnRpY2xlLm9sZC52LmNvcHkocGFydGljbGUudik7XG5cbiAgICAgIHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIoMSAvIHBhcnRpY2xlLm1hc3MpO1xuICAgICAgcGFydGljbGUudi5hZGQocGFydGljbGUuYS5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChwYXJ0aWNsZS5vbGQudi5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG5cbiAgICAgIGlmIChkYW1waW5nKSBwYXJ0aWNsZS52Lm11bHRpcGx5U2NhbGFyKGRhbXBpbmcpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9vbCBmcm9tIFwiLi9Qb29sXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFN0YXRzIGZyb20gXCIuLi9kZWJ1Zy9TdGF0c1wiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgSW50ZWdyYXRpb24gZnJvbSBcIi4uL21hdGgvSW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdG9uIHtcbiAgc3RhdGljIFVTRV9DTE9DSyA9IGZhbHNlO1xuXG4gIC8vIG1lYXN1cmUgMToxMDBcbiAgc3RhdGljIE1FQVNVUkUgPSAxMDA7XG4gIHN0YXRpYyBFVUxFUiA9IFwiZXVsZXJcIjtcbiAgc3RhdGljIFJLMiA9IFwicnVuZ2Uta3V0dGEyXCI7XG5cbiAgLy8gZXZlbnQgbmFtZVxuICBzdGF0aWMgUEFSVElDTEVfQ1JFQVRFRCA9IFwiUEFSVElDTEVfQ1JFQVRFRFwiO1xuICBzdGF0aWMgUEFSVElDTEVfVVBEQVRFID0gXCJQQVJUSUNMRV9VUERBVEVcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1NMRUVQID0gXCJQQVJUSUNMRV9TTEVFUFwiO1xuICBzdGF0aWMgUEFSVElDTEVfREVBRCA9IFwiUEFSVElDTEVfREVBRFwiO1xuXG4gIHN0YXRpYyBFTUlUVEVSX0FEREVEID0gXCJFTUlUVEVSX0FEREVEXCI7XG4gIHN0YXRpYyBFTUlUVEVSX1JFTU9WRUQgPSBcIkVNSVRURVJfUkVNT1ZFRFwiO1xuXG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFID0gXCJQUk9UT05fVVBEQVRFXCI7XG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFX0FGVEVSID0gXCJQUk9UT05fVVBEQVRFX0FGVEVSXCI7XG4gIHN0YXRpYyBERUZBVUxUX0lOVEVSVkFMID0gMC4wMTY3O1xuXG4gIHN0YXRpYyBhbWVuZENoYW5nZVRhYnNCdWcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdG8gYWRkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvciBQcm90b25cbiAgICpcbiAgICogQHRvZG8gYWRkIG1vcmUgZG9jdW1lbnRhdGlvbiBvZiB0aGUgc2luZ2xlIHByb3BlcnRpZXMgYW5kIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXIgfCB1bmRlZmluZWR9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGVtaXR0ZXJzICAgQWxsIGFkZGVkIGVtaXR0ZXJcbiAgICogQHByb3BlcnR5IHtBcnJheX0gcmVuZGVyZXJzICBBbGwgYWRkZWQgcmVuZGVyZXJcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgICAgICBUaGUgYWN0aXZlIHRpbWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9sZHRpbWUgICBUaGUgb2xkIHRpbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVncmF0aW9uVHlwZSkge1xuICAgIHRoaXMuZW1pdHRlcnMgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVycyA9IFtdO1xuXG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5vdyA9IDA7XG4gICAgdGhpcy50aGVuID0gMDtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cyh0aGlzKTtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCg4MCk7XG5cbiAgICB0aGlzLmludGVncmF0aW9uVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGludGVncmF0aW9uVHlwZSwgUHJvdG9uLkVVTEVSKTtcbiAgICB0aGlzLmludGVncmF0b3IgPSBuZXcgSW50ZWdyYXRpb24odGhpcy5pbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgdGhpcy5fZnBzID0gXCJhdXRvXCI7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBQcm90b24uREVGQVVMVF9JTlRFUlZBTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBmcmFtZXMgcGVyIHNlY29uZCAoRlBTKSBmb3IgdGhlIFByb3RvbiBzeXN0ZW0uXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZnBzIC0gVGhlIGRlc2lyZWQgRlBTLiBVc2UgXCJhdXRvXCIgZm9yIGRlZmF1bHQgYmVoYXZpb3IsIG9yIGEgbnVtYmVyIGZvciBhIHNwZWNpZmljIEZQUy5cbiAgICovXG4gIHNldCBmcHMoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX2ludGVydmFsID0gZnBzID09PSBcImF1dG9cIiA/IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMIDogTWF0aFV0aWwuZmxvb3IoMSAvIGZwcywgNyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBmcmFtZXMgcGVyIHNlY29uZCAoRlBTKSBzZXR0aW5nLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ30gVGhlIGN1cnJlbnQgRlBTIHNldHRpbmcuIFJldHVybnMgXCJhdXRvXCIgaWYgc2V0IHRvIGRlZmF1bHQsIG9yIGEgbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgc3BlY2lmaWMgRlBTLlxuICAgKi9cbiAgZ2V0IGZwcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZnBzO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIGFkZFJlbmRlcmVyKHJlbmRlcikge1xuICAgIHJlbmRlci5pbml0KHRoaXMpO1xuICAgIHRoaXMucmVuZGVyZXJzLnB1c2gocmVuZGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICByZW1vdmVSZW5kZXJlcihyZW5kZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucmVuZGVyZXJzLmluZGV4T2YocmVuZGVyKTtcbiAgICB0aGlzLnJlbmRlcmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJlbmRlci5yZW1vdmUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge0VtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIGFkZEVtaXR0ZXIoZW1pdHRlcikge1xuICAgIHRoaXMuZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IHRoaXM7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfQURERUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIHJlbW92ZUVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgcmVtb3ZlRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmVtaXR0ZXJzLmluZGV4T2YoZW1pdHRlcik7XG4gICAgdGhpcy5lbWl0dGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9SRU1PVkVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFsbCBhZGRlZCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIC8vICdhdXRvJyBpcyB0aGUgZGVmYXVsdCBicm93c2VyIHJlZnJlc2ggcmF0ZSwgdGhlIHZhc3QgbWFqb3JpdHkgaXMgNjBmcHNcbiAgICBpZiAodGhpcy5fZnBzID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcblxuICAgICAgaWYgKFByb3Rvbi5VU0VfQ0xPQ0spIHtcbiAgICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG4gICAgICAgIC8vIEZpeCBidWdzIHN1Y2ggYXMgY2hyb21lIGJyb3dzZXIgc3dpdGNoaW5nIHRhYnMgY2F1c2luZyBleGNlc3NpdmUgdGltZSBkaWZmZXJlbmNlXG4gICAgICAgIHRoaXMuYW1lbmRDaGFuZ2VUYWJzQnVnKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IDApIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5lbGFwc2VkKTtcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZnBzIGZyYW1lIHJhdGUgaXMgc2V0XG4gICAgZWxzZSB7XG4gICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuXG4gICAgICBpZiAodGhpcy5lbGFwc2VkID4gdGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NzY0MDE4L2NvbnRyb2xsaW5nLWZwcy13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZVxuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdyAtICh0aGlzLmVsYXBzZWQgJSB0aGlzLl9pbnRlcnZhbCkgKiAxMDAwO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVtaXR0ZXJzVXBkYXRlKGVsYXBzZWQpIHtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMuZW1pdHRlcnNbaV0udXBkYXRlKGVsYXBzZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGFtZW5kQ2hhbmdlVGFic0J1Z1xuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgYW1lbmRDaGFuZ2VUYWJzQnVnKCkge1xuICAgIGlmICghUHJvdG9uLmFtZW5kQ2hhbmdlVGFic0J1ZykgcmV0dXJuO1xuICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwLjUpIHtcbiAgICAgIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIGFsbCBwYXJ0aWNsZXMgZnJvbSBhbGwgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDb3VudFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgdG90YWwgKz0gdGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHJldHVybiB0b3RhbDtcbiAgfVxuXG4gIGdldEFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgcGFydGljbGVzID0gW107XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHBhcnRpY2xlcyA9IHBhcnRpY2xlcy5jb25jYXQodGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMpO1xuICAgIHJldHVybiBwYXJ0aWNsZXM7XG4gIH1cblxuICBkZXN0cm95QWxsRW1pdHRlcnMoKSB7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMuZW1pdHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byB0aGlzIFByb3RvbiBpbnN0YW5jZS4gVGhpcyBpbmNsdWRlcyBhbGwgZW1pdHRlcnMsIGFuZCBhbGwgcHJvcGVydGllc1xuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGRlc3Ryb3kocmVtb3ZlID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZXN0cm95T3RoZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgdGhpcy50aGVuID0gMDtcbiAgICAgIHRoaXMucG9vbC5kZXN0cm95KCk7XG4gICAgICB0aGlzLnN0YXRzLmRlc3Ryb3koKTtcblxuICAgICAgVXRpbC5kZXN0cm95QWxsKHRoaXMuZW1pdHRlcnMpO1xuICAgICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucmVuZGVyZXJzLCB0aGlzLmdldEFsbFBhcnRpY2xlcygpKTtcblxuICAgICAgdGhpcy5pbnRlZ3JhdG9yID0gbnVsbDtcbiAgICAgIHRoaXMucmVuZGVyZXJzID0gbnVsbDtcbiAgICAgIHRoaXMuZW1pdHRlcnMgPSBudWxsO1xuICAgICAgdGhpcy5zdGF0cyA9IG51bGw7XG4gICAgICB0aGlzLnBvb2wgPSBudWxsO1xuICAgIH07XG5cbiAgICBpZiAocmVtb3ZlKSB7XG4gICAgICBzZXRUaW1lb3V0KGRlc3Ryb3lPdGhlciwgMjAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveU90aGVyKCk7XG4gICAgfVxuICB9XG59XG5cbkV2ZW50RGlzcGF0Y2hlci5iaW5kKFByb3Rvbik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZ2Ige1xuICBjb25zdHJ1Y3RvcihyID0gMjU1LCBnID0gMjU1LCBiID0gMjU1KSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLmcgPSBnO1xuICAgIHRoaXMuYiA9IGI7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnIgPSAyNTU7XG4gICAgdGhpcy5nID0gMjU1O1xuICAgIHRoaXMuYiA9IDI1NTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzcGFuIG9mIHZhbHVlcyBvciBhbiBhcnJheS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhbiB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzQXJyYXk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ8bnVtYmVyW119XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYjtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjZW50ZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgU3BhbiBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8bnVtYmVyW119IGEgLSBUaGUgZmlyc3QgdmFsdWUgb3IgYW4gYXJyYXkgb2YgdmFsdWVzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JdIC0gVGhlIHNlY29uZCB2YWx1ZSAoaWYgYSBpcyBub3QgYW4gYXJyYXkpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjZW50ZXI9ZmFsc2VdIC0gV2hldGhlciB0byB1c2UgY2VudGVyLWJhc2VkIGNhbGN1bGF0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgY2VudGVyKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5pc0FycmF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYSA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuICAgICAgdGhpcy5hID0gVXRpbC5pbml0VmFsdWUoYSwgMSk7XG4gICAgICB0aGlzLmIgPSBVdGlsLmluaXRWYWx1ZShiLCB0aGlzLmEpO1xuICAgICAgdGhpcy5jZW50ZXIgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHZhbHVlIGZyb20gdGhlIHNwYW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzSW50PWZhbHNlXSAtIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGludGVnZXIgdmFsdWUuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIHNwYW4uXG4gICAqL1xuICBnZXRWYWx1ZShpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNBcnJheSkge1xuICAgICAgcmV0dXJuIFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY2VudGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21BVG9CKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tRmxvYXRpbmcodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBTcGFuIG9iamVjdC5cbiAgICogQHBhcmFtIHsqfFNwYW59IGEgLSBUaGUgZmlyc3QgdmFsdWUgb3IgYSBTcGFuIG9iamVjdC5cbiAgICogQHBhcmFtIHsqfSBbYl0gLSBUaGUgc2Vjb25kIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IFtjXSAtIFRoZSB0aGlyZCB2YWx1ZS5cbiAgICogQHJldHVybnMge1NwYW59IEEgbmV3IFNwYW4gaW5zdGFuY2UuXG4gICAqL1xuICBzdGF0aWMgc2V0U3BhblZhbHVlKGEsIGIsIGMpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3BhbihhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHJldHVybiBuZXcgU3BhbihhLCBiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNwYW4oYSwgYiwgYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGZyb20gYSBTcGFuLCBpZiB0aGUgcGFyYW0gaXMgbm90IGEgU3BhbiBpdCB3aWxsIHJldHVybiB0aGUgZ2l2ZW4gcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0geyp8U3Bhbn0gcGFuIC0gVGhlIHZhbHVlIG9yIFNwYW4gdG8gZ2V0IHRoZSB2YWx1ZSBmcm9tLlxuICAgKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIG9mIFNwYW4gT1IgdGhlIHBhcmFtZXRlciBpZiBpdCBpcyBub3QgYSBTcGFuLlxuICAgKi9cbiAgc3RhdGljIGdldFNwYW5WYWx1ZShwYW4pIHtcbiAgICByZXR1cm4gcGFuIGluc3RhbmNlb2YgU3BhbiA/IHBhbi5nZXRWYWx1ZSgpIDogcGFuO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaGFzUHJvcCh0YXJnZXQsIGtleSkge1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHByb3RvdHlwZSBpbiBhIGdpdmVuIHByb3RvdHlwZU9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0UHJvcFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIHRyYW5zbGF0ZSBkZXNyaXB0aW9uIGZyb20gY2hpbmVzZSB0byBlbmdsaXNoXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZU9iamVjdCBBbiBvYmplY3Qgb2Ygc2luZ2xlIHByb3RvdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSB0YXJnZXRcbiAgICovXG4gIHNldFByb3AodGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gU3Bhbi5nZXRTcGFuVmFsdWUocHJvcHNbcHJvcF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRWZWN0b3JWYWxcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGBjb25mYFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZcbiAgICovXG4gIHNldFZlY3RvclZhbChwYXJ0aWNsZSwgY29uZiA9IG51bGwpIHtcbiAgICBpZiAoIWNvbmYpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ4XCIpKSBwYXJ0aWNsZS5wLnggPSBjb25mW1wieFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieVwiKSkgcGFydGljbGUucC55ID0gY29uZltcInlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnhcIikpIHBhcnRpY2xlLnYueCA9IGNvbmZbXCJ2eFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnlcIikpIHBhcnRpY2xlLnYueSA9IGNvbmZbXCJ2eVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheFwiKSkgcGFydGljbGUuYS54ID0gY29uZltcImF4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheVwiKSkgcGFydGljbGUuYS55ID0gY29uZltcImF5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBcIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicFwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widlwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYVwiXSk7XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicG9zaXRpb25cIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicG9zaXRpb25cIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2ZWxvY2l0eVwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2ZWxvY2l0eVwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFjY2VsZXJhdGVcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYWNjZWxlcmF0ZVwiXSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBlYXNlTGluZWFyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGVhc2VJblF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDIpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCAyKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YWQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDIpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5DdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG4gIH0sXG5cbiAgZWFzZU91dEN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlIC0gMSwgMykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEN1YmljKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAzKTtcblxuICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3codmFsdWUgLSAyLCAzKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJblF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCA0KTtcbiAgfSxcblxuICBlYXNlT3V0UXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDQpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhcnQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDQpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogTWF0aC5wb3codmFsdWUsIDMpIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluU2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtTWF0aC5jb3ModmFsdWUgKiBNYXRoVXRpbC5QSV8yKSArIDE7XG4gIH0sXG5cbiAgZWFzZU91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zaW4odmFsdWUgKiBNYXRoVXRpbC5QSV8yKTtcbiAgfSxcblxuICBlYXNlSW5PdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbkV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG4gIH0sXG5cbiAgZWFzZU91dEV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHZhbHVlKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0RXhwbyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIDA7XG5cbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiAxO1xuXG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuXG4gICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS12YWx1ZSkgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5DaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VPdXRDaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgxIC0gTWF0aC5wb3codmFsdWUgLSAxLCAyKSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q2lyYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHZhbHVlIC09IDIpICogdmFsdWUpICsgMSk7XG4gIH0sXG5cbiAgZWFzZUluQmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gdmFsdWUgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgLSBzKTtcbiAgfSxcblxuICBlYXNlT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gKHZhbHVlID0gdmFsdWUgLSAxKSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSArIHMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiAodmFsdWUgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSAtIHMpKTtcbiAgICByZXR1cm4gMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlICsgcykgKyAyKTtcbiAgfSxcblxuICBnZXRFYXNpbmcoZWFzZSkge1xuICAgIGlmICh0eXBlb2YgZWFzZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZWFzZTtcbiAgICBlbHNlIHJldHVybiB0aGlzW2Vhc2VdIHx8IHRoaXMuZWFzZUxpbmVhcjtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyRCB7XG4gIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICB4O1xuXG4gIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICB5O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFZlY3RvcjJEIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gLSBUaGUgeCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gLSBUaGUgeSBjb29yZGluYXRlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICB0aGlzLnkgPSB5IHx8IDA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgeCBhbmQgeSBjb21wb25lbnRzIG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgY29vcmRpbmF0ZS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHggY29tcG9uZW50IG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzZXRYKHgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHkgY29tcG9uZW50IG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IGNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzZXRZKHkpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGdyYWRpZW50IChhbmdsZSkgb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBncmFkaWVudCBpbiByYWRpYW5zLlxuICAgKi9cbiAgZ2V0R3JhZGllbnQoKSB7XG4gICAgaWYgKHRoaXMueCAhPT0gMCkgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIGVsc2UgaWYgKHRoaXMueSA+IDApIHJldHVybiBNYXRoVXRpbC5QSV8yO1xuICAgIGVsc2UgaWYgKHRoaXMueSA8IDApIHJldHVybiAtTWF0aFV0aWwuUElfMjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSB2ZWN0b3IgdG8gY29weSBmcm9tLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgY29weSh2KSB7XG4gICAgdGhpcy54ID0gdi54O1xuICAgIHRoaXMueSA9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgdmVjdG9yIHRvIGFkZC5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW3ddIC0gQW4gb3B0aW9uYWwgc2Vjb25kIHZlY3RvciB0byBhZGQuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBhZGQodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBzY2FsYXIgdmFsdWVzIHRvIHRoaXMgdmVjdG9yJ3MgY29tcG9uZW50cy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGEgLSBWYWx1ZSB0byBhZGQgdG8geC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGIgLSBWYWx1ZSB0byBhZGQgdG8geS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGFkZFhZKGEsIGIpIHtcbiAgICB0aGlzLnggKz0gYTtcbiAgICB0aGlzLnkgKz0gYjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdHdvIHZlY3RvcnMgYW5kIHNldHMgdGhlIHJlc3VsdCB0byB0aGlzIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gYSAtIFRoZSBmaXJzdCB2ZWN0b3IgdG8gYWRkLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBiIC0gVGhlIHNlY29uZCB2ZWN0b3IgdG8gYWRkLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgYWRkVmVjdG9ycyhhLCBiKSB7XG4gICAgdGhpcy54ID0gYS54ICsgYi54O1xuICAgIHRoaXMueSA9IGEueSArIGIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIHZlY3RvciB0byBzdWJ0cmFjdC5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW3ddIC0gQW4gb3B0aW9uYWwgc2Vjb25kIHZlY3RvciB0byBzdWJ0cmFjdC5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHN1Yih2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIGFub3RoZXIgYW5kIHNldHMgdGhlIHJlc3VsdCB0byB0aGlzIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gYSAtIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbS5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gYiAtIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzdWJWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggLSBiLng7XG4gICAgdGhpcy55ID0gYS55IC0gYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyB0aGlzIHZlY3RvciBieSBhIHNjYWxhci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgLSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGRpdmlkZVNjYWxhcihzKSB7XG4gICAgaWYgKHMgIT09IDApIHtcbiAgICAgIHRoaXMueCAvPSBzO1xuICAgICAgdGhpcy55IC89IHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KDAsIDApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdGhpcyB2ZWN0b3IgYnkgYSBzY2FsYXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzIC0gVGhlIHNjYWxhciB0byBtdWx0aXBseSBieS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIG11bHRpcGx5U2NhbGFyKHMpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE5lZ2F0ZXMgdGhpcyB2ZWN0b3IgKGludmVydHMgaXRzIGRpcmVjdGlvbikuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBuZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoLTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSBvdGhlciB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdC5cbiAgICovXG4gIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIHNxdWFyZWQgbGVuZ3RoLlxuICAgKi9cbiAgbGVuZ3RoU3EoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBsZW5ndGguXG4gICAqL1xuICBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhpcyB2ZWN0b3IgKG1ha2VzIGl0IHVuaXQgbGVuZ3RoKS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgdG8gYW5vdGhlciB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgb3RoZXIgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZGlzdGFuY2UuXG4gICAqL1xuICBkaXN0YW5jZVRvKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQodikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgdGhpcyB2ZWN0b3IgYnkgYW4gYW5nbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aGEgLSBUaGUgYW5nbGUgdG8gcm90YXRlIGJ5IChpbiByYWRpYW5zKS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHJvdGF0ZSh0aGEpIHtcbiAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnk7XG5cbiAgICB0aGlzLnggPSB4ICogTWF0aC5jb3ModGhhKSArIHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHRoaXMueSA9IC14ICogTWF0aC5zaW4odGhhKSArIHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBkaXN0YW5jZSB0byBhbm90aGVyIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSBvdGhlciB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBzcXVhcmVkIGRpc3RhbmNlLlxuICAgKi9cbiAgZGlzdGFuY2VUb1NxdWFyZWQodikge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gdi54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gdi55O1xuXG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmVhcmx5IGludGVycG9sYXRlcyB0aGlzIHZlY3RvciB0b3dhcmQgYW5vdGhlciB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgdGFyZ2V0IHZlY3Rvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGFscGhhIC0gVGhlIGludGVycG9sYXRpb24gZmFjdG9yICgwLTEpLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgbGVycCh2LCBhbHBoYSkge1xuICAgIHRoaXMueCArPSAodi54IC0gdGhpcy54KSAqIGFscGhhO1xuICAgIHRoaXMueSArPSAodi55IC0gdGhpcy55KSAqIGFscGhhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoaXMgdmVjdG9yIGlzIGVxdWFsIHRvIGFub3RoZXIgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIG90aGVyIHZlY3Rvci5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoaXMgdmVjdG9yIHRvIHplcm8uXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICB0aGlzLnggPSAwLjA7XG4gICAgdGhpcy55ID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdmVjdG9yIHdpdGggdGhlIHNhbWUgeCBhbmQgeSB2YWx1ZXMgYXMgdGhpcyBvbmUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gQSBuZXcgVmVjdG9yMkQgaW5zdGFuY2UuXG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55KTtcbiAgfVxufVxuIiwiaW1wb3J0IFJnYiBmcm9tIFwiLi4vdXRpbHMvUmdiXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnRpY2xlIGluIGEgcGFydGljbGUgc3lzdGVtLlxuICogQGNsYXNzIFBhcnRpY2xlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlIHtcbiAgLyoqIEB0eXBlIHtzdHJpbmd9IFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgcGFydGljbGUgKi9cbiAgaWQgPSBcIlwiO1xuXG4gIC8qKiBAdHlwZSB7e3A6VmVjdG9yMkQsdjpWZWN0b3IyRCxhOlZlY3RvcjJEfX0gT2xkIHN0YXRlIG9mIHRoZSBwYXJ0aWNsZSAqL1xuICBvbGQgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7b2JqZWN0fSBDdXN0b20gZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIHBhcnRpY2xlICovXG4gIGRhdGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7QmVoYXZpb3VyW119IEFycmF5IG9mIGJlaGF2aW91cnMgYXBwbGllZCB0byB0aGUgcGFydGljbGUgKi9cbiAgYmVoYXZpb3VycyA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gQ3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcGFydGljbGUgKi9cbiAgcCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gQ3VycmVudCB2ZWxvY2l0eSBvZiB0aGUgcGFydGljbGUgKi9cbiAgdiA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gQ3VycmVudCBhY2NlbGVyYXRpb24gb2YgdGhlIHBhcnRpY2xlICovXG4gIGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7UmdifSBDb2xvciBvZiB0aGUgcGFydGljbGUgKi9cbiAgcmdiID0gbnVsbDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQYXJ0aWNsZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25mXSBDb25maWd1cmF0aW9uIG9iamVjdCBmb3IgdGhlIHBhcnRpY2xlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgdGhpcy5uYW1lID0gXCJQYXJ0aWNsZVwiO1xuICAgIHRoaXMuaWQgPSBQdWlkLmlkKHRoaXMubmFtZSk7XG4gICAgdGhpcy5vbGQgPSB7fTtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcblxuICAgIHRoaXMucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuYSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQuYSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgdGhpcy5yZ2IgPSBuZXcgUmdiKCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIGNvbmYgJiYgUHJvcFV0aWwuc2V0UHJvcCh0aGlzLCBjb25mKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHBhcnRpY2xlJ3MgbW92ZW1lbnQgaW4gZGVncmVlcy5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGRpcmVjdGlvbiBpbiBkZWdyZWVzXG4gICAqL1xuICBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52LngsIC10aGlzLnYueSkgKiBNYXRoVXRpbC5OMTgwX1BJO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgcGFydGljbGUgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG4gICAqIEByZXR1cm5zIHtQYXJ0aWNsZX0gVGhlIHBhcnRpY2xlIGluc3RhbmNlXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmxpZmUgPSBJbmZpbml0eTtcbiAgICB0aGlzLmFnZSA9IDA7XG5cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnNsZWVwID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5ID0gbnVsbDtcbiAgICB0aGlzLnNwcml0ZSA9IG51bGw7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5lbmVyZ3kgPSAxOyAvLyBFbmVyZ3kgTG9zc1xuICAgIHRoaXMubWFzcyA9IDE7XG4gICAgdGhpcy5yYWRpdXMgPSAxMDtcbiAgICB0aGlzLmFscGhhID0gMTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICB0aGlzLmNvbG9yID0gbnVsbDtcblxuICAgIHRoaXMucC5zZXQoMCwgMCk7XG4gICAgdGhpcy52LnNldCgwLCAwKTtcbiAgICB0aGlzLmEuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLnAuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLnYuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLmEuc2V0KDAsIDApO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5lYXNlTGluZWFyO1xuXG4gICAgdGhpcy5yZ2IucmVzZXQoKTtcbiAgICBVdGlsLmVtcHR5T2JqZWN0KHRoaXMuZGF0YSk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwYXJ0aWNsZSdzIHN0YXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHVwZGF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBwYXJ0aWNsZSBpbiBpdHMgcGFyZW50IHN5c3RlbVxuICAgKi9cbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgICAgdGhpcy5hcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFnZSA8IHRoaXMubGlmZSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyh0aGlzLmFnZSAvIHRoaXMubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGFsbCBiZWhhdmlvdXJzIGF0dGFjaGVkIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB1cGRhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgcGFydGljbGUgaW4gaXRzIHBhcmVudCBzeXN0ZW1cbiAgICovXG4gIGFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vyc1tpXSAmJiB0aGlzLmJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBUaGUgYmVoYXZpb3VyIHRvIGFkZFxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIHRoaXMuYmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG5cbiAgICBpZiAoYmVoYXZpb3VyLmhhc093blByb3BlcnR5KFwicGFyZW50c1wiKSkgYmVoYXZpb3VyLnBhcmVudHMucHVzaCh0aGlzKTtcbiAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG11bHRpcGxlIGJlaGF2aW91cnMgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cltdfSBiZWhhdmlvdXJzIEFuIGFycmF5IG9mIGJlaGF2aW91cnMgdG8gYWRkXG4gICAqL1xuICBhZGRCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICBjb25zdCBsZW5ndGggPSBiZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hZGRCZWhhdmlvdXIoYmVoYXZpb3Vyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBzcGVjaWZpYyBiZWhhdmlvdXIgZnJvbSB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgVGhlIGJlaGF2aW91ciB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGJlaGF2aW91cnMgZnJvbSB0aGUgcGFydGljbGUuXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBwYXJ0aWNsZSwgcmVtb3ZpbmcgYWxsIGJlaGF2aW91cnMgYW5kIHNldHRpbmcgaXQgYXMgZGVhZC5cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAdHlwZWRlZiAge09iamVjdH0gcmdiT2JqZWN0XG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByIHJlZCB2YWx1ZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gZyBncmVlbiB2YWx1ZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gYiBibHVlIHZhbHVlXG4gICAqL1xuICAvKipcbiAgICogY29udmVydHMgYSBoZXggdmFsdWUgdG8gYSByZ2Igb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBoZXhUb1JnYlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaCBhbnkgaGV4IHZhbHVlLCBlLmcuICMwMDAwMDAgb3IgMDAwMDAwIGZvciBibGFja1xuICAgKlxuICAgKiBAcmV0dXJuIHtyZ2JPYmplY3R9XG4gICAqL1xuICBoZXhUb1JnYihoKSB7XG4gICAgY29uc3QgaGV4MTYgPSBoLmNoYXJBdCgwKSA9PT0gXCIjXCIgPyBoLnN1YnN0cmluZygxLCA3KSA6IGg7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygwLCAyKSwgMTYpO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMiwgNCksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDQsIDYpLCAxNik7XG5cbiAgICByZXR1cm4geyByLCBnLCBiIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgcmdiIHZhbHVlIHRvIGEgcmdiIHN0cmluZ1xuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgcmdiVG9IZXhcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3QgfCBQcm90b24uaGV4VG9SZ2J9IHJnYiBhIHJnYiBvYmplY3QgbGlrZSBpbiB7QGxpbmsgUHJvdG9uI1Byb3Rvbi59XG4gICAqXG4gICAqIEByZXR1cm4ge1N0cmluZ30gcmdiKClcbiAgICovXG4gIHJnYlRvSGV4KHJiZykge1xuICAgIHJldHVybiBgcmdiKCR7cmJnLnJ9LCAke3JiZy5nfSwgJHtyYmcuYn0pYDtcbiAgfSxcblxuICBnZXRIZXgxNkZyb21QYXJ0aWNsZShwKSB7XG4gICAgcmV0dXJuIE51bWJlcihwLnJnYi5yKSAqIDY1NTM2ICsgTnVtYmVyKHAucmdiLmcpICogMjU2ICsgTnVtYmVyKHAucmdiLmIpO1xuICB9XG59O1xuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbGFyMkQge1xuICBjb25zdHJ1Y3RvcihyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSBNYXRoLmFicyhyKSB8fCAwO1xuICAgIHRoaXMudGhhID0gdGhhIHx8IDA7XG4gIH1cblxuICBzZXQociwgdGhhKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFIocikge1xuICAgIHRoaXMuciA9IHI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRUaGEodGhhKSB7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb3B5KHApIHtcbiAgICB0aGlzLnIgPSBwLnI7XG4gICAgdGhpcy50aGEgPSBwLnRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvVmVjdG9yKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy5nZXRYKCksIHRoaXMuZ2V0WSgpKTtcbiAgfVxuXG4gIGdldFgoKSB7XG4gICAgcmV0dXJuIHRoaXMuciAqIE1hdGguc2luKHRoaXMudGhhKTtcbiAgfVxuXG4gIGdldFkoKSB7XG4gICAgcmV0dXJuIC10aGlzLnIgKiBNYXRoLmNvcyh0aGlzLnRoYSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgdGhpcy5yID0gMTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYuciA9PT0gdGhpcy5yICYmIHYudGhhID09PSB0aGlzLnRoYTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuciA9IDAuMDtcbiAgICB0aGlzLnRoYSA9IDAuMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgUG9sYXIyRCh0aGlzLnIsIHRoaXMudGhhKTtcbiAgfVxufVxuIiwiY29uc3QgTWF0MyA9IHtcbiAgY3JlYXRlKG1hdDMpIHtcbiAgICBjb25zdCBtYXQgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xuICAgIGlmIChtYXQzKSB0aGlzLnNldChtYXQzLCBtYXQpO1xuXG4gICAgcmV0dXJuIG1hdDtcbiAgfSxcblxuICBzZXQobWF0MSwgbWF0Mikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSBtYXQyW2ldID0gbWF0MVtpXTtcblxuICAgIHJldHVybiBtYXQyO1xuICB9LFxuXG4gIG11bHRpcGx5KG1hdCwgbWF0MiwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMDIgPSBtYXRbMl0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDAgPSBtYXQyWzBdLFxuICAgICAgYjAxID0gbWF0MlsxXSxcbiAgICAgIGIwMiA9IG1hdDJbMl0sXG4gICAgICBiMTAgPSBtYXQyWzNdLFxuICAgICAgYjExID0gbWF0Mls0XSxcbiAgICAgIGIyMCA9IG1hdDJbNl0sXG4gICAgICBiMjEgPSBtYXQyWzddO1xuXG4gICAgbWF0M1swXSA9IGIwMCAqIGEwMCArIGIwMSAqIGExMDtcbiAgICBtYXQzWzFdID0gYjAwICogYTAxICsgYjAxICogYTExO1xuICAgIG1hdDNbMl0gPSBhMDIgKiBiMDI7XG4gICAgbWF0M1szXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMDtcbiAgICBtYXQzWzRdID0gYjEwICogYTAxICsgYjExICogYTExO1xuICAgIG1hdDNbNl0gPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBhMjA7XG4gICAgbWF0M1s3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGEyMTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9LFxuXG4gIGludmVyc2UobWF0LCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMSA9IGExMSxcbiAgICAgIGIxMSA9IC1hMTAsXG4gICAgICBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjAsXG4gICAgICBkID0gYTAwICogYjAxICsgYTAxICogYjExLFxuICAgICAgaWQ7XG5cbiAgICBpZCA9IDEgLyBkO1xuICAgIG1hdDNbMF0gPSBiMDEgKiBpZDtcbiAgICBtYXQzWzFdID0gLWEwMSAqIGlkO1xuICAgIG1hdDNbM10gPSBiMTEgKiBpZDtcbiAgICBtYXQzWzRdID0gYTAwICogaWQ7XG4gICAgbWF0M1s2XSA9IGIyMSAqIGlkO1xuICAgIG1hdDNbN10gPSAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgKiBpZDtcblxuICAgIHJldHVybiBtYXQzO1xuICB9LFxuXG4gIG11bHRpcGx5VmVjMihtLCB2ZWMsIG1hdDMpIHtcbiAgICBsZXQgeCA9IHZlY1swXSxcbiAgICAgIHkgPSB2ZWNbMV07XG5cbiAgICBtYXQzWzBdID0geCAqIG1bMF0gKyB5ICogbVszXSArIG1bNl07XG4gICAgbWF0M1sxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyBtWzddO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdDM7XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5U3BhbiBleHRlbmRzIFNwYW4ge1xuICBjb25zdHJ1Y3Rvcihjb2xvcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYXJyID0gVXRpbC50b0FycmF5KGNvbG9yKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIGNvbnN0IHZhbCA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLl9hcnIpO1xuICAgIHJldHVybiB2YWwgPT09IFwicmFuZG9tXCIgfHwgdmFsID09PSBcIlJhbmRvbVwiID8gTWF0aFV0aWwucmFuZG9tQ29sb3IoKSA6IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHN1cmUgdGhhdCB0aGUgY29sb3IgaXMgYW4gaW5zdGFuY2Ugb2YgUHJvdG9uLkFycmF5U3BhbiwgaWYgbm90IGl0IG1ha2VzIGEgbmV3IGluc3RhbmNlXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBcnJheVNwYW4oYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5U3BhbikgcmV0dXJuIGFycjtcbiAgICBlbHNlIHJldHVybiBuZXcgQXJyYXlTcGFuKGFycik7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLndpZHRoID0gdztcbiAgICB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuICB9XG5cbiAgY29udGFpbnMoeCwgeSkge1xuICAgIGlmICh4IDw9IHRoaXMucmlnaHQgJiYgeCA+PSB0aGlzLnggJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMueSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbi8qKlxuICogUmF0ZSBjbGFzcyBmb3IgY29udHJvbGxpbmcgcGFydGljbGUgZW1pc3Npb24gcmF0ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG51bVBhbjtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aW1lUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnRUaW1lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbmV4dFRpbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUmF0ZSBpbnN0YW5jZS5cbiAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWlzc2lvbiAoYSBbcGFydGljbGVdL2IgW3NdKS5cbiAgICogQHBhcmFtIHtBcnJheXxudW1iZXJ8U3Bhbn0gW251bXBhbj0xXSAtIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIGZvciBlYWNoIGVtaXNzaW9uLlxuICAgKiBAcGFyYW0ge0FycmF5fG51bWJlcnxTcGFufSBbdGltZXBhbj0xXSAtIFRoZSB0aW1lIGludGVydmFsIGJldHdlZW4gZWFjaCBlbWlzc2lvbi5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gQ3JlYXRlIGEgcmF0ZSBvZiAxMC0yMCBwYXJ0aWNsZXMgZXZlcnkgMC4xLTAuMjUgc2Vjb25kc1xuICAgKiBuZXcgUmF0ZShuZXcgU3BhbigxMCwgMjApLCBuZXcgU3BhbigwLjEsIDAuMjUpKTtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bXBhbiwgdGltZXBhbikge1xuICAgIHRoaXMubnVtUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUobnVtcGFuLCAxKSk7XG4gICAgdGhpcy50aW1lUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUodGltZXBhbiwgMSkpO1xuXG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSAwO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSByYXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdCBiYXNlZCBvbiB0aGUgZWxhcHNlZCB0aW1lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBlbGFwc2VkIHRpbWUgc2luY2UgdGhlIGxhc3QgdXBkYXRlLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBlbWl0LlxuICAgKi9cbiAgZ2V0VmFsdWUodGltZSkge1xuICAgIHRoaXMuc3RhcnRUaW1lICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPj0gdGhpcy5uZXh0VGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBpZiAodGhpcy5udW1QYW4uYiA9PT0gMSkge1xuICAgICAgICBpZiAodGhpcy5udW1QYW4uZ2V0VmFsdWUoZmFsc2UpID4gMC41KSByZXR1cm4gMTtcbiAgICAgICAgZWxzZSByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm51bVBhbi5nZXRWYWx1ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGl6ZSB7XG4gIHJlc2V0KCkge31cblxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUoZW1pdHRlcik7XG4gICAgfVxuICB9XG5cbiAgLy8gc3ViIGNsYXNzIGluaXRcbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHt9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogTGlmZSBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIGxpZmV0aW1lLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxpZmVQYW47XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IExpZmUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IGEgLSBUaGUgbGlmZXRpbWUgdmFsdWUgb3IgdGhlIGxvd2VyIGJvdW5kIG9mIHRoZSBsaWZldGltZSByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSB1cHBlciBib3VuZCBvZiB0aGUgbGlmZXRpbWUgcmFuZ2UgKGlmIGEgaXMgYSBudW1iZXIpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjXSAtIFdoZXRoZXIgdG8gdXNlIGNlbnRlci1iYXNlZCBjYWxjdWxhdGlvbiAoaWYgYSBhbmQgYiBhcmUgbnVtYmVycykuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGlmZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTGlmZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBsaWZldGltZSBvZiBhIHRhcmdldCBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCAtIFRoZSB0YXJnZXQgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMubGlmZVBhbi5hID09PSBJbmZpbml0eSkgdGFyZ2V0LmxpZmUgPSBJbmZpbml0eTtcbiAgICBlbHNlIHRhcmdldC5saWZlID0gdGhpcy5saWZlUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gICAgdGhpcy5yYW5kb20gPSAwO1xuICAgIHRoaXMuY3Jvc3NUeXBlID0gXCJkZWFkXCI7XG4gICAgdGhpcy5hbGVydCA9IHRydWU7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHt9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnZlY3RvciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgem9uZSBpbiBhIDJEIHNwYWNlLlxuICogQGV4dGVuZHMgWm9uZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUG9pbnRab25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMueCA9IHg7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwb3NpdGlvbiB2ZWN0b3IuXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54O1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBmb3IgUG9pbnRab25lLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgb2JqZWN0ICh1bnVzZWQpLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBQb2ludFpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zc2luZyBtZXRob2QhXCIpO1xuICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogUG9zaXRpb24gY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSBwb3NpdGlvbnMuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7UG9pbnRab25lfGFueX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHpvbmU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBvc2l0aW9uIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge1BvaW50Wm9uZXxhbnl9IFt6b25lXSAtIFRoZSB6b25lIHRvIHVzZSBmb3IgcG9zaXRpb25pbmcuIERlZmF1bHRzIHRvIGEgbmV3IFBvaW50Wm9uZSBpZiBub3QgcHJvdmlkZWQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih6b25lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICAgIHRoaXMubmFtZSA9IFwiUG9zaXRpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhpcyBpbml0aWFsaXplcidzIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7UG9pbnRab25lfGFueX0gW3pvbmVdIC0gVGhlIG5ldyB6b25lIHRvIHVzZSBmb3IgcG9zaXRpb25pbmcuIERlZmF1bHRzIHRvIGEgbmV3IFBvaW50Wm9uZSBpZiBub3QgcHJvdmlkZWQuXG4gICAqL1xuICByZXNldCh6b25lKSB7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0LnAgLSBUaGUgcGFydGljbGUncyBwb3NpdGlvbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXQucC54IC0gVGhlIHBhcnRpY2xlJ3MgeCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0LnAueSAtIFRoZSBwYXJ0aWNsZSdzIHkgY29vcmRpbmF0ZS5cbiAgICovXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGhpcy56b25lLmdldFBvc2l0aW9uKCk7XG5cbiAgICB0YXJnZXQucC54ID0gdGhpcy56b25lLnZlY3Rvci54O1xuICAgIHRhcmdldC5wLnkgPSB0aGlzLnpvbmUudmVjdG9yLnk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4uL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbi8qKlxuICogVmVsb2NpdHkgY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSB2ZWxvY2l0aWVzLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWxvY2l0eSBleHRlbmRzIEluaXRpYWxpemUge1xuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoYVBhbjtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgVmVsb2NpdHkgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFtycGFuXSAtIFRoZSByYWRpYWwgY29tcG9uZW50IG9mIHRoZSB2ZWxvY2l0eSBvciBpdHMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFt0aGFwYW5dIC0gVGhlIGFuZ3VsYXIgY29tcG9uZW50IG9mIHRoZSB2ZWxvY2l0eSBvciBpdHMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT0ndmVjdG9yJ10gLSBUaGUgdHlwZSBvZiB2ZWxvY2l0eSAoJ3ZlY3Rvcicgb3IgJ3BvbGFyJykuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUocnBhbik7XG4gICAgdGhpcy50aGFQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZSh0aGFwYW4pO1xuICAgIHRoaXMudHlwZSA9IFV0aWwuaW5pdFZhbHVlKHR5cGUsIFwidmVjdG9yXCIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJWZWxvY2l0eVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgdmVsb2NpdHkgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW3JwYW5dIC0gVGhlIHJhZGlhbCBjb21wb25lbnQgb2YgdGhlIHZlbG9jaXR5IG9yIGl0cyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW3RoYXBhbl0gLSBUaGUgYW5ndWxhciBjb21wb25lbnQgb2YgdGhlIHZlbG9jaXR5IG9yIGl0cyByYW5nZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPSd2ZWN0b3InXSAtIFRoZSB0eXBlIG9mIHZlbG9jaXR5ICgndmVjdG9yJyBvciAncG9sYXInKS5cbiAgICovXG4gIHJlc2V0KHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoZSB2ZWxvY2l0eSB2YWx1ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHZyIC0gVGhlIHZlbG9jaXR5IHZhbHVlIHRvIG5vcm1hbGl6ZS5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5vcm1hbGl6ZWQgdmVsb2NpdHkgdmFsdWUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBub3JtYWxpemVWZWxvY2l0eSh2cikge1xuICAgIHJldHVybiB2ciAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIHZlbG9jaXR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwicFwiIHx8IHRoaXMudHlwZSA9PT0gXCJQXCIgfHwgdGhpcy50eXBlID09PSBcInBvbGFyXCIpIHtcbiAgICAgIGNvbnN0IHBvbGFyMmQgPSBuZXcgUG9sYXIyRChcbiAgICAgICAgdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSksXG4gICAgICAgIHRoaXMudGhhUGFuLmdldFZhbHVlKCkgKiBNYXRoVXRpbC5QSV8xODBcbiAgICAgICk7XG5cbiAgICAgIHRhcmdldC52LnggPSBwb2xhcjJkLmdldFgoKTtcbiAgICAgIHRhcmdldC52LnkgPSBwb2xhcjJkLmdldFkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnYueCA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpO1xuICAgICAgdGFyZ2V0LnYueSA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy50aGFQYW4uZ2V0VmFsdWUoKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogTWFzcyBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIG1hc3MuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3MgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbWFzc1BhbjtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTWFzcyBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gYSAtIFRoZSBtYXNzIHZhbHVlIG9yIHRoZSBsb3dlciBib3VuZCBvZiB0aGUgbWFzcyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSB1cHBlciBib3VuZCBvZiB0aGUgbWFzcyByYW5nZSAoaWYgYSBpcyBhIG51bWJlcikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NdIC0gV2hldGhlciB0byB1c2UgY2VudGVyLWJhc2VkIGNhbGN1bGF0aW9uIChpZiBhIGFuZCBiIGFyZSBudW1iZXJzKS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFzc1BhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTWFzc1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtYXNzIG9mIGEgdGFyZ2V0IHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gVGhlIHRhcmdldCBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0YXJnZXQubWFzcyA9IHRoaXMubWFzc1Bhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogUmFkaXVzIGNsYXNzIGZvciBpbml0aWFsaXppbmcgcGFydGljbGUgcmFkaXVzLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpdXMgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKi9cbiAgcmFkaXVzO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBSYWRpdXMgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IGEgLSBUaGUgcmFkaXVzIHZhbHVlIG9yIHRoZSBsb3dlciBib3VuZCBvZiB0aGUgcmFkaXVzIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JdIC0gVGhlIHVwcGVyIGJvdW5kIG9mIHRoZSByYWRpdXMgcmFuZ2UgKGlmIGEgaXMgYSBudW1iZXIpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjXSAtIFdoZXRoZXIgdG8gdXNlIGNlbnRlci1iYXNlZCBjYWxjdWxhdGlvbiAoaWYgYSBhbmQgYiBhcmUgbnVtYmVycykuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiUmFkaXVzXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgaW5pdGlhbGl6ZXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBhIC0gVGhlIHJhZGl1cyB2YWx1ZSBvciB0aGUgbG93ZXIgYm91bmQgb2YgdGhlIHJhZGl1cyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSB1cHBlciBib3VuZCBvZiB0aGUgcmFkaXVzIHJhbmdlIChpZiBhIGlzIGEgbnVtYmVyKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbY10gLSBXaGV0aGVyIHRvIHVzZSBjZW50ZXItYmFzZWQgY2FsY3VsYXRpb24gKGlmIGEgYW5kIGIgYXJlIG51bWJlcnMpLlxuICAgKi9cbiAgcmVzZXQoYSwgYiwgYykge1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3MgcmFkaXVzLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHRoaXMucmFkaXVzLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG4vKipcbiAqIEJvZHkgY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSBib2RpZXMuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheVNwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpbWFnZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQm9keSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fEFycmF5U3Bhbn0gaW1hZ2UgLSBUaGUgaW1hZ2Ugc291cmNlIG9yIG9iamVjdCB0byB1c2UgZm9yIHRoZSBwYXJ0aWNsZSBib2R5LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3c9MjBdIC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSBib2R5LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2hdIC0gVGhlIGhlaWdodCBvZiB0aGUgcGFydGljbGUgYm9keS4gRGVmYXVsdHMgdG8gdGhlIHdpZHRoIGlmIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGltYWdlLCB3LCBoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNldFNwYW5WYWx1ZShpbWFnZSk7XG4gICAgdGhpcy53ID0gVXRpbC5pbml0VmFsdWUodywgMjApO1xuICAgIHRoaXMuaCA9IFV0aWwuaW5pdFZhbHVlKGgsIHRoaXMudyk7XG4gICAgdGhpcy5uYW1lID0gXCJCb2R5XCI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3MgYm9keS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSB0aGlzLmltYWdlLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlVGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0ge1xuICAgICAgICB3aWR0aDogdGhpcy53LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaCxcbiAgICAgICAgc3JjOiBpbWFnZVRhcmdldCxcbiAgICAgICAgaXNJbm5lcjogdHJ1ZSxcbiAgICAgICAgaW5uZXI6IHRydWVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBpbWFnZVRhcmdldDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc3BhbiB2YWx1ZSBmb3IgdGhlIGltYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R8QXJyYXlTcGFufSBpbWFnZSAtIFRoZSBpbWFnZSBzb3VyY2Ugb3Igb2JqZWN0IHRvIHNldCBhcyBzcGFuIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7QXJyYXlTcGFufSBUaGUgQXJyYXlTcGFuIGluc3RhbmNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0U3BhblZhbHVlKGltYWdlKSB7XG4gICAgcmV0dXJuIGltYWdlIGluc3RhbmNlb2YgQXJyYXlTcGFuID8gaW1hZ2UgOiBuZXcgQXJyYXlTcGFuKGltYWdlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5cbi8qKlxuICogVGhlIEJlaGF2aW91ciBjbGFzcyBpcyB0aGUgYmFzZSBmb3IgdGhlIG90aGVyIEJlaGF2aW91clxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ciB7XG4gIHN0YXRpYyBpZCA9IDA7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBCZWhhdmlvdXIgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmQsIGZvciBleGFtcGxlIGVhc2UuZWFzZU91dFF1YXJ0XG4gICAqL1xuICBjb25zdHJ1Y3RvcihsaWZlLCBlYXNpbmcpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgbGlmZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvblxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgY3VycmVudCBhZ2VcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuYWdlID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBjdXJyZW50IGVuZXJneVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5lbmVyZ3kgPSAxO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYmVoYXZpb3VyIGlzIGRlYWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBwYXJlbnQgZW1pdHRlcnNcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5wYXJlbnRzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgdW5pcXVlIGlkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmlkID0gYEJlaGF2aW91cl8ke0JlaGF2aW91ci5pZCsrfWA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgbmFtZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJCZWhhdmlvdXJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoaXMgYmVoYXZpb3VyJ3MgbmV3IGxpZmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoaXMgYmVoYXZpb3VyJ3MgbmV3IGVhc2luZ1xuICAgKi9cbiAgcmVzZXQobGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSBmb3JjZSBieSAxOjEwMFxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gZm9yY2UgLSBUaGUgZm9yY2UgdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm5zIHtQcm90b24uVmVjdG9yMkR9IFRoZSBub3JtYWxpemVkIGZvcmNlXG4gICAqL1xuICBub3JtYWxpemVGb3JjZShmb3JjZSkge1xuICAgIHJldHVybiBmb3JjZS5tdWx0aXBseVNjYWxhcihQcm90b24uTUVBU1VSRSk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgdmFsdWUgYnkgMToxMDBcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIG5vcm1hbGl6ZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbm9ybWFsaXplZCB2YWx1ZVxuICAgKi9cbiAgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgKiBQcm90b24uTUVBU1VSRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBiZWhhdmlvdXIncyBsaWZlIGN5Y2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjYWxjdWxhdGUgZm9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBjYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB7XG4gICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIHRvIGEgcGFydGljbGVcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGlzIGJlaGF2aW91clxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFyZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5wYXJlbnRzW2ldLnJlbW92ZUJlaGF2aW91cih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudHMubGVuZ3RoID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uRm9yY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG4gICAgdGhpcy5uYW1lID0gXCJGb3JjZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuYS5hZGQodGhpcy5mb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbi8qKlxuICogQXR0cmFjdGlvbiBiZWhhdmlvciBmb3IgcGFydGljbGVzLlxuICogVGhpcyBiZWhhdmlvdXIgbWFrZXMgcGFydGljbGVzIGZvbGxvdyBhIHNwZWNpZmljIHRhcmdldCBwb3NpdGlvbi5cbiAqIEBleHRlbmRzIEJlaGF2aW91clxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0aW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQXR0cmFjdGlvbi5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtmb3JjZT0xMDBdIC0gVGhlIHN0cmVuZ3RoIG9mIHRoZSBhdHRyYWN0aW9uIGZvcmNlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1cz0xMDAwXSAtIFRoZSByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgYXR0cmFjdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBsaWZlIHNwYW4gb2YgdGhpcyBiZWhhdmlvdXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlLmVhc2VMaW5lYXInXSAtIFRoZSBlYXNpbmcgZnVuY3Rpb24gZm9yIHRoaXMgYmVoYXZpb3VyLlxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHBvc2l0aW9uIGZvciBhdHRyYWN0aW9uLlxuICAgICAqIEB0eXBlIHtWZWN0b3IyRH1cbiAgICAgKi9cbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgYXR0cmFjdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJlbmd0aCBvZiB0aGUgYXR0cmFjdGlvbiBmb3JjZS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzcXVhcmVkIHJhZGl1cyAoZm9yIG9wdGltaXphdGlvbikuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcblxuICAgIC8qKlxuICAgICAqIFRoZSBhdHRyYWN0aW9uIGZvcmNlIHZlY3Rvci5cbiAgICAgKiBAdHlwZSB7VmVjdG9yMkR9XG4gICAgICovXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGUgYXR0cmFjdGlvbiBmb3JjZS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGJlaGF2aW91ci5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiQXR0cmFjdGlvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgbmV3IGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZm9yY2U9MTAwXSAtIFRoZSBuZXcgc3RyZW5ndGggb2YgdGhlIGF0dHJhY3Rpb24gZm9yY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXVzPTEwMDBdIC0gVGhlIG5ldyByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgYXR0cmFjdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBuZXcgbGlmZSBzcGFuIG9mIHRoaXMgYmVoYXZpb3VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZS5lYXNlTGluZWFyJ10gLSBUaGUgbmV3IGVhc2luZyBmdW5jdGlvbiBmb3IgdGhpcyBiZWhhdmlvdXIuXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhpcyBiZWhhdmlvdXIgdG8gYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0by5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgY3VycmVudCBzaW11bGF0aW9uIHRpbWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcGFydGljbGUuXG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UuY29weSh0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zdWIocGFydGljbGUucCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IHRoaXMuYXR0cmFjdGlvbkZvcmNlLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGhTcSA+IDAuMDAwMDQgJiYgdGhpcy5sZW5ndGhTcSA8IHRoaXMucmFkaXVzU3EpIHtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMubGVuZ3RoU3EgLyB0aGlzLnJhZGl1c1NxKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKHRoaXMuZm9yY2UpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmF0dHJhY3Rpb25Gb3JjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tRHJpZnQgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYW5kb21EcmlmdFxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSBUaGUgdGltZSBvZiB0aGUgZHJpZnRcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSk7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5hbWUgPSBcIlJhbmRvbURyaWZ0XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5wYW5Gb2NlID0gbmV3IFZlY3RvcjJEKGRyaWZ0WCwgZHJpZnRZKTtcbiAgICB0aGlzLnBhbkZvY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHRoaXMucGFuRm9jZSk7XG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuZGF0YS50aW1lICs9IHRpbWU7XG5cbiAgICBpZiAocGFydGljbGUuZGF0YS50aW1lID49IHRoaXMuZGVsYXkpIHtcbiAgICAgIHBhcnRpY2xlLmEuYWRkWFkoXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS54LCB0aGlzLnBhbkZvY2UueCksXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS55LCB0aGlzLnBhbkZvY2UueSlcbiAgICAgICk7XG5cbiAgICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRm9yY2UgZnJvbSBcIi4vRm9yY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eSBleHRlbmRzIEZvcmNlIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5HcmF2aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uR3Jhdml0eVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCgwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGFmdGVyIGNvbGxpc2lvblxuICAgKlxuICAgKiBAY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcml0Y2xlfSBvdGhlclBhcnRpY2xlXG4gICAqL1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbGxpc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5yZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjayk7XG4gICAgdGhpcy5uZXdQb29sID0gW107XG4gICAgdGhpcy5wb29sID0gW107XG4gICAgdGhpcy5uYW1lID0gXCJDb2xsaXNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBVdGlsLmluaXRWYWx1ZShlbWl0dGVyLCBudWxsKTtcbiAgICB0aGlzLm1hc3MgPSBVdGlsLmluaXRWYWx1ZShtYXNzLCB0cnVlKTtcbiAgICB0aGlzLmNhbGxiYWNrID0gVXRpbC5pbml0VmFsdWUoY2FsbGJhY2ssIG51bGwpO1xuXG4gICAgdGhpcy5jb2xsaXNpb25Qb29sID0gW107XG4gICAgdGhpcy5kZWx0YSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5lbWl0dGVyKSB7XG4gICAgICBVdGlsLnNsaWNlQXJyYXkodGhpcy5lbWl0dGVyLnBhcnRpY2xlcywgaW5kZXgsIHRoaXMubmV3UG9vbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFV0aWwuc2xpY2VBcnJheSh0aGlzLnBvb2wsIGluZGV4LCB0aGlzLm5ld1Bvb2wpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubmV3UG9vbC5sZW5ndGg7XG4gICAgbGV0IG90aGVyUGFydGljbGU7XG4gICAgbGV0IGxlbmd0aFNxO1xuICAgIGxldCBvdmVybGFwO1xuICAgIGxldCB0b3RhbE1hc3M7XG4gICAgbGV0IGF2ZXJhZ2VNYXNzMSwgYXZlcmFnZU1hc3MyO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBvdGhlclBhcnRpY2xlID0gdGhpcy5uZXdQb29sW2ldO1xuXG4gICAgICBpZiAob3RoZXJQYXJ0aWNsZSAhPT0gcGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5kZWx0YS5jb3B5KG90aGVyUGFydGljbGUucCk7XG4gICAgICAgIHRoaXMuZGVsdGEuc3ViKHBhcnRpY2xlLnApO1xuXG4gICAgICAgIGxlbmd0aFNxID0gdGhpcy5kZWx0YS5sZW5ndGhTcSgpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHBhcnRpY2xlLnJhZGl1cyArIG90aGVyUGFydGljbGUucmFkaXVzO1xuXG4gICAgICAgIGlmIChsZW5ndGhTcSA8PSBkaXN0YW5jZSAqIGRpc3RhbmNlKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IGRpc3RhbmNlIC0gTWF0aC5zcXJ0KGxlbmd0aFNxKTtcbiAgICAgICAgICBvdmVybGFwICs9IDAuNTtcblxuICAgICAgICAgIHRvdGFsTWFzcyA9IHBhcnRpY2xlLm1hc3MgKyBvdGhlclBhcnRpY2xlLm1hc3M7XG4gICAgICAgICAgYXZlcmFnZU1hc3MxID0gdGhpcy5tYXNzID8gb3RoZXJQYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMubWFzcyA/IHBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG5cbiAgICAgICAgICBwYXJ0aWNsZS5wLmFkZChcbiAgICAgICAgICAgIHRoaXMuZGVsdGFcbiAgICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG90aGVyUGFydGljbGUucC5hZGQodGhpcy5kZWx0YS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihvdmVybGFwICogYXZlcmFnZU1hc3MyKSk7XG5cbiAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2socGFydGljbGUsIG90aGVyUGFydGljbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3Nab25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIERlZmluZXMgd2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgY29tZSB0byB0aGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgem9uZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3Jvc3Nab25lXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0XHRcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3Jvc3Nab25lXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBVdGlsLmluaXRWYWx1ZShjcm9zc1R5cGUsIFwiZGVhZFwiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgdGhpcy56b25lLmNyb3NzaW5nKHBhcnRpY2xlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbi8qKlxuICogQWxwaGEgYmVoYXZpb3VyIGZvciBjb250cm9sbGluZyBwYXJ0aWNsZSBvcGFjaXR5IG92ZXIgdGltZS5cbiAqIEBleHRlbmRzIEJlaGF2aW91clxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHBoYSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNhbWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYTtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBiO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBBbHBoYSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2E9MV0gLSBUaGUgaW5pdGlhbCBhbHBoYSB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIGFscGhhIHZhbHVlIG9yIHJhbmdlLiBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgJ2EnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkFscGhhXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2E9MV0gLSBUaGUgaW5pdGlhbCBhbHBoYSB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIGFscGhhIHZhbHVlIG9yIHJhbmdlLiBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgJ2EnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmVdIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZ10gLSBUaGlzIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvbi5cbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyBhbHBoYSB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5hbHBoYUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gcGFydGljbGUuZGF0YS5hbHBoYUE7XG4gICAgZWxzZSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGFscGhhIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGN1cnJlbnQgc2ltdWxhdGlvbiB0aW1lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHBhcnRpY2xlLlxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHBhcnRpY2xlLmFscGhhID0gcGFydGljbGUuZGF0YS5hbHBoYUIgKyAocGFydGljbGUuZGF0YS5hbHBoYUEgLSBwYXJ0aWNsZS5kYXRhLmFscGhhQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5hbHBoYSA8IDAuMDAxKSBwYXJ0aWNsZS5hbHBoYSA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG4vKipcbiAqIFNjYWxlIGJlaGF2aW91ciBmb3IgY29udHJvbGxpbmcgcGFydGljbGUgc2l6ZSBvdmVyIHRpbWUuXG4gKiBAZXh0ZW5kcyBCZWhhdmlvdXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhbGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzYW1lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBTY2FsZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2E9MV0gLSBUaGUgaW5pdGlhbCBzY2FsZSB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIHNjYWxlIHZhbHVlIG9yIHJhbmdlLiBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgJ2EnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIlNjYWxlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gYSAtIFRoZSBpbml0aWFsIHNjYWxlIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYl0gLSBUaGUgZmluYWwgc2NhbGUgdmFsdWUgb3IgcmFuZ2UuIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSB0aGUgc2FtZSBhcyAnYScuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIHNjYWxlIHZhbHVlcy5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVCID0gdGhpcy5zYW1lID8gcGFydGljbGUuZGF0YS5zY2FsZUEgOiB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBzY2FsZSBiZWhhdmlvdXIgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBjdXJyZW50IHNpbXVsYXRpb24gdGltZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBwYXJ0aWNsZS5cbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuc2NhbGUgPSBwYXJ0aWNsZS5kYXRhLnNjYWxlQiArIChwYXJ0aWNsZS5kYXRhLnNjYWxlQSAtIHBhcnRpY2xlLmRhdGEuc2NhbGVCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLnNjYWxlIDwgMC4wMDAxKSBwYXJ0aWNsZS5zY2FsZSA9IDA7XG4gICAgcGFydGljbGUucmFkaXVzID0gcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgKiBwYXJ0aWNsZS5zY2FsZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbi8qKlxuICogUm90YXRlIGJlaGF2aW91ciBmb3IgY29udHJvbGxpbmcgcGFydGljbGUgcm90YXRpb24uXG4gKiBAZXh0ZW5kcyBCZWhhdmlvdXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2FtZTtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHlsZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUm90YXRlIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8U3Bhbn0gW2luZmx1ZW5jZT0nVmVsb2NpdHknXSAtIFRoZSByb3RhdGlvbidzIGluZmx1ZW5jZSBvciBpbml0aWFsIHJvdGF0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIHJvdGF0aW9uIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0eWxlPSd0byddIC0gVGhlIHN0eWxlIG9mIHJvdGF0aW9uICgndG8nIG9yICdhZGQnKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoaXMgYmVoYXZpb3VyJ3MgbGlmZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5mbHVlbmNlLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoaW5mbHVlbmNlLCBiLCBzdHlsZSk7XG4gICAgdGhpcy5uYW1lID0gXCJSb3RhdGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8U3Bhbn0gW2E9J1ZlbG9jaXR5J10gLSBUaGUgcm90YXRpb24ncyBpbmZsdWVuY2Ugb3IgaW5pdGlhbCByb3RhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfFNwYW59IFtiXSAtIFRoZSBmaW5hbCByb3RhdGlvbiB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdHlsZT0ndG8nXSAtIFRoZSBzdHlsZSBvZiByb3RhdGlvbiAoJ3RvJyBvciAnYWRkJykuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgcmVzZXQoYSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgXCJWZWxvY2l0eVwiKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYiwgMCkpO1xuICAgIHRoaXMuc3R5bGUgPSBVdGlsLmluaXRWYWx1ZShzdHlsZSwgXCJ0b1wiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYXJ0aWNsZS5yb3RhdGlvbiAtIFRoZSBwYXJ0aWNsZSdzIHJvdGF0aW9uLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUuZGF0YSAtIFRoZSBwYXJ0aWNsZSdzIGRhdGEgb2JqZWN0LlxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICghdGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhpcyBiZWhhdmlvdXIgdG8gYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGludGVncmF0ZSB0aW1lICgxL21zKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHBhcnRpY2xlIGluZGV4LlxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGlmICghdGhpcy5zYW1lKSB7XG4gICAgICBpZiAodGhpcy5zdHlsZSA9PT0gXCJ0b1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiVE9cIiB8fCB0aGlzLnN0eWxlID09PSBcIl9cIikge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPVxuICAgICAgICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25CICsgKHBhcnRpY2xlLmRhdGEucm90YXRpb25BIC0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkIpICogdGhpcy5lbmVyZ3k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuYS5hID09PSBcIlZcIiB8fCB0aGlzLmEuYSA9PT0gXCJWZWxvY2l0eVwiIHx8IHRoaXMuYS5hID09PSBcInZcIikge1xuICAgICAgLy8gYmV0YS4uLlxuICAgICAgcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZS5nZXREaXJlY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xvclxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IFthXSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gW2JdIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJDb2xvclwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGEgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGIgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYSA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYSk7XG4gICAgdGhpcy5iID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihiKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmNvbG9yID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5jb2xvckEgPSBDb2xvclV0aWwuaGV4VG9SZ2IocGFydGljbGUuY29sb3IpO1xuXG4gICAgaWYgKHRoaXMuYikgcGFydGljbGUuZGF0YS5jb2xvckIgPSBDb2xvclV0aWwuaGV4VG9SZ2IodGhpcy5iLmdldFZhbHVlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5iKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLnIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuciAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLnIpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmcgKyAocGFydGljbGUuZGF0YS5jb2xvckEuZyAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmcpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuYiAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUucmdiLnIgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUucmdiLmcgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUucmdiLmIgPDwgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmNvbnN0IENIQU5HSU5HID0gXCJjaGFuZ2luZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDeWNsb25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5DeWNsb25lXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3ljbG9uZVwiO1xuICB9XG5cbiAgc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcblxuICAgIGlmIChhbmdsZSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwibGVmdFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gLU1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJyYW5kb21cIjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwic3BhblwiO1xuICAgICAgdGhpcy5zcGFuID0gYW5nbGU7XG4gICAgfSBlbHNlIGlmIChhbmdsZSkge1xuICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ2luZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImF1dG9cIlxuICAgICkge1xuICAgICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIH0gZWxzZSBpZiAoZm9yY2UpIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBmb3JjZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gTWF0aFV0aWwucmFuZG9tQVRvQigtTWF0aFV0aWwuUEksIE1hdGhVdGlsLlBJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IHRoaXMuc3Bhbi5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgbGV0IGxlbmd0aDtcbiAgICBsZXQgZ3JhZGllbnQgPSBwYXJ0aWNsZS52LmdldEdyYWRpZW50KCk7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIgfHwgdGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIGdyYWRpZW50ICs9IHBhcnRpY2xlLmRhdGEuY2FuZ2xlO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmFkaWVudCArPSB0aGlzLmFuZ2xlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcmNlID09PSBDSEFOR0lORykge1xuICAgICAgbGVuZ3RoID0gcGFydGljbGUudi5sZW5ndGgoKSAvIDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdGhpcy5mb3JjZTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueCA9IGxlbmd0aCAqIE1hdGguY29zKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueSA9IGxlbmd0aCAqIE1hdGguc2luKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gICAgcGFydGljbGUuYS5hZGQocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgfVxufVxuIiwiaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSBcIi4vQXR0cmFjdGlvblwiO1xuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBBdHRyYWN0aW9uIC0gdHVybnMgdGhlIGZvcmNlXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBQcm90b24uQXR0cmFjdGlvblxuICogQG1lbWJlcm9mISBQcm90b24jXG4gKiBAYWxpYXMgUHJvdG9uLlJlcHVsc2lvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXB1bHNpb24gZXh0ZW5kcyBBdHRyYWN0aW9uIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUmVwdWxzaW9uIGJlaGF2aW91ciBpbnN0YW5jZVxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIC0gVGhlIHJlcHVsc2lvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW2ZvcmNlPTEwMF0gLSBUaGUgc3RyZW5ndGggb2YgdGhlIHJlcHVsc2lvbiBmb3JjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1cz0xMDAwXSAtIFRoZSByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgcmVwdWxzaW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhlIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cmVuZ3RoIG9mIHRoZSByZXB1bHNpb24gZm9yY2VcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZm9yY2UgKj0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIlJlcHVsc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgbmV3IHJlcHVsc2lvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW2ZvcmNlPTEwMF0gLSBUaGUgbmV3IHN0cmVuZ3RoIG9mIHRoZSByZXB1bHNpb24gZm9yY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXM9MTAwMF0gLSBUaGUgbmV3IHJhZGl1cyBvZiBpbmZsdWVuY2UgZm9yIHRoZSByZXB1bHNpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBuZXcgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhlIG5ldyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb25cbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5V2VsbCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIEdyYXZpdHlXZWxsXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlXZWxsXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXRkb2NcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYy5zZXQodGhpcy5jZW50ZXJQb2ludC54IC0gcGFydGljbGUucC54LCB0aGlzLmNlbnRlclBvaW50LnkgLSBwYXJ0aWNsZS5wLnkpO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAoZGlzdGFuY2VTcSAhPT0gMCkge1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aCgpO1xuICAgICAgY29uc3QgZmFjdG9yID0gKHRoaXMuZm9yY2UgKiB0aW1lKSAvIChkaXN0YW5jZVNxICogZGlzdGFuY2UpO1xuXG4gICAgICBwYXJ0aWNsZS52LnggKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy54O1xuICAgICAgcGFydGljbGUudi55ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRpYWxpemUoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gaW5pdGlhbGl6ZXMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5pdGlhbGl6ZXNbaV0gaW5zdGFuY2VvZiBJbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemVzW2ldLmluaXQoZW1pdHRlciwgcGFydGljbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gIH0sXG5cbiAgLy8gaW5pdFxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplKSB7XG4gICAgUHJvcFV0aWwuc2V0UHJvcChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gICAgUHJvcFV0aWwuc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgfSxcblxuICBiaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChlbWl0dGVyLmJpbmRFbWl0dGVyKSB7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChlbWl0dGVyLnApO1xuICAgICAgcGFydGljbGUudi5hZGQoZW1pdHRlci52KTtcbiAgICAgIHBhcnRpY2xlLmEuYWRkKGVtaXR0ZXIuYSk7XG4gICAgICBwYXJ0aWNsZS52LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0oZW1pdHRlci5yb3RhdGlvbikpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuLi9pbml0aWFsaXplL1JhdGVcIjtcbmltcG9ydCBJbml0aWFsaXplVXRpbCBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0dGVyIGV4dGVuZHMgUGFydGljbGUge1xuICAvKipcbiAgICogWW91IGNhbiB1c2UgdGhpcyBlbWl0IHBhcnRpY2xlcy5cbiAgICpcbiAgICogSXQgd2lsbCBkaXNwYXRjaCBmb2xsb3cgZXZlbnRzOlxuICAgKiBQQVJUSUNMRV9DUkVBVEVEXG4gICAqIFBBUlRJQ0xFX1VQREFUQVxuICAgKiBQQVJUSUNMRV9ERUFEXG4gICAqXG4gICAqIEBjbGFzcyBFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtkYW1waW5nOjAuMDEsYmluZEVtaXR0ZXI6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mID0ge30pIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMucGFydGljbGVzID0gW107XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG4gICAgdGhpcy5pbml0aWFsaXplcyA9IFtdO1xuXG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy5lbWl0U3BlZWQgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnJpY3Rpb24gY29lZmZpY2llbnQgZm9yIGFsbCBwYXJ0aWNsZSBlbWl0IGJ5IFRoaXM7XG4gICAgICogQHByb3BlcnR5IGRhbXBpbmdcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDAuMDA2XG4gICAgICovXG4gICAgdGhpcy5kYW1waW5nID0gMC4wMDY7XG5cbiAgICAvKipcbiAgICAgKiBJZiBiaW5kRW1pdHRlciB0aGUgcGFydGljbGVzIGNhbiBiaW5kIHRoaXMgZW1pdHRlcidzIHByb3BlcnR5O1xuICAgICAqIEBwcm9wZXJ0eSBiaW5kRW1pdHRlclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICB0aGlzLmJpbmRFbWl0dGVyID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHBlciBzZWNvbmQgZW1pdCAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICAgKiBAcHJvcGVydHkgcmF0ZVxuICAgICAqIEB0eXBlIHtSYXRlfVxuICAgICAqIEBkZWZhdWx0IFJhdGUoMSwgLjEpXG4gICAgICovXG4gICAgdGhpcy5yYXRlID0gbmV3IFJhdGUoMSwgMC4xKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRW1pdHRlclwiO1xuICAgIHRoaXMuaWQgPSBQdWlkLmlkKHRoaXMubmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICogQHBhcmFtIHtOdW1iZXIgfCBTdHJpbmd9IFt0b3RhbFRpbWVdIGJlZ2luIGVtaXQgdGltZTtcbiAgICogQHBhcmFtIHtTdHJpbmcgfCBib29sZWFufSBbbGlmZV0gdGhlIGxpZmUgb2YgdGhpcyBlbWl0dGVyXG4gICAqL1xuICBlbWl0KHRvdGFsVGltZSwgbGlmZSkge1xuICAgIHRoaXMuc3RvcGVkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSBVdGlsLmluaXRWYWx1ZSh0b3RhbFRpbWUsIEluZmluaXR5KTtcblxuICAgIGlmIChsaWZlID09PSB0cnVlIHx8IGxpZmUgPT09IFwibGlmZVwiIHx8IGxpZmUgPT09IFwiZGVzdHJveVwiKSB7XG4gICAgICB0aGlzLmxpZmUgPSB0b3RhbFRpbWUgPT09IFwib25jZVwiID8gMSA6IHRoaXMudG90YWxUaW1lO1xuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGxpZmUpKSB7XG4gICAgICB0aGlzLmxpZmUgPSBsaWZlO1xuICAgIH1cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnN0b3BlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMudG90YWxUaW1lID09PSBcIm5vbmVcIikge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFRpbWUgPT09IFwib25jZVwiKSB7XG4gICAgICBsZXQgaTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSg5OTk5OSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAwKSB0aGlzLmVtaXRTcGVlZCA9IGxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgdGhpcy50b3RhbFRpbWUgPSBcIm5vbmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuXG4gICAgICBpZiAodGhpcy5lbWl0VGltZSA8IHRoaXMudG90YWxUaW1lKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSh0aW1lKTtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIHNpbmdsZSBwYXJ0aWNsZTtcbiAgICpcbiAgICogY2FuIHVzZSBlbWl0KHt4OjEwfSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSkgb3IgZW1pdChbe3g6MTB9LG5ldyBJbml0aWFsaXplXSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSlcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIGNyZWF0ZVBhcnRpY2xlKGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJlbnQucG9vbC5nZXQoUGFydGljbGUpO1xuICAgIHRoaXMuc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKTtcbiAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICByZXR1cm4gcGFydGljbGU7XG4gIH1cblxuICBzZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpIHtcbiAgICBsZXQgaW5pdGlhbGl6ZXMgPSB0aGlzLmluaXRpYWxpemVzO1xuICAgIGxldCBiZWhhdmlvdXJzID0gdGhpcy5iZWhhdmlvdXJzO1xuXG4gICAgaWYgKGluaXRpYWxpemUpIGluaXRpYWxpemVzID0gVXRpbC50b0FycmF5KGluaXRpYWxpemUpO1xuICAgIGlmIChiZWhhdmlvdXIpIGJlaGF2aW91cnMgPSBVdGlsLnRvQXJyYXkoYmVoYXZpb3VyKTtcblxuICAgIHBhcnRpY2xlLnJlc2V0KCk7XG4gICAgSW5pdGlhbGl6ZVV0aWwuaW5pdGlhbGl6ZSh0aGlzLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpO1xuICAgIHBhcnRpY2xlLmFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycyk7XG4gICAgcGFydGljbGUucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMucGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnBhcnRpY2xlcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIEVtaXR0ZXJcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnJlbW92ZUFsbEluaXRpYWxpemVycygpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnJlbW92ZUVtaXR0ZXIodGhpcyk7XG5cbiAgICB0aGlzLnJhdGUgPSBudWxsO1xuICAgIHRoaXMub2xkID0gbnVsbDtcbiAgICB0aGlzLnJnYiA9IG51bGw7XG4gICAgdGhpcy52ID0gbnVsbDtcbiAgICB0aGlzLmEgPSBudWxsO1xuICAgIHRoaXMucCA9IG51bGw7XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoRW1pdHRlcik7XG4iLCJpbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ckVtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBCZWhhdmlvdXJFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBCZWhhdmlvdXJFbWl0dGVyIHlvdSBjYW4gYWRkIGJlaGF2aW91cnMgdG8gc2VsZjtcbiAgICogQGNsYXNzIFByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnNlbGZCZWhhdmlvdXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gZW1pdHRlcjtcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZFNlbGZCZWhhdmlvdXIoQmVoYXZpb3VyMSxCZWhhdmlvdXIyLEJlaGF2aW91cjMpO1xuICAgKiBAbWV0aG9kIGFkZFNlbGZCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtQcm90b24uQmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBQcm90b24uQ29sb3IoJ3JhbmRvbScpXG4gICAqL1xuICBhZGRTZWxmQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSxcbiAgICAgIGxlbmd0aCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmVoYXZpb3VyID0gcmVzdFtpXTtcbiAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgQmVoYXZpb3VyIGZvciBzZWxmXG4gICAqIEBtZXRob2QgcmVtb3ZlU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlU2VsZkJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZkJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLnNlbGZCZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICB1cGRhdGUodGltZSkge1xuICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcblxuICAgIGlmICghdGhpcy5zbGVlcCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgICBsZXQgaTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vRW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dFbWl0dGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gIC8qKlxuICAgKiBUaGUgRm9sbG93RW1pdHRlciBjbGFzcyBpbmhlcml0cyBmcm9tIFByb3Rvbi5FbWl0dGVyXG4gICAqXG4gICAqIHVzZSB0aGUgRm9sbG93RW1pdHRlciB3aWxsIGVtaXQgcGFydGljbGUgd2hlbiBtb3VzZW1vdmluZ1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLkZvbGxvd0VtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gbW91c2VUYXJnZXQgbW91c2VldmVudCdzIHRhcmdldDtcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVhc2UgdGhlIGVhc2luZyBvZiBmb2xsb3dpbmcgc3BlZWQ7XG4gICAqIEBkZWZhdWx0IDAuN1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihtb3VzZVRhcmdldCwgZWFzZSwgY29uZikge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5tb3VzZVRhcmdldCA9IFV0aWwuaW5pdFZhbHVlKG1vdXNlVGFyZ2V0LCB3aW5kb3cpO1xuICAgIHRoaXMuZWFzZSA9IFV0aWwuaW5pdFZhbHVlKGVhc2UsIDAuNyk7XG5cbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMubW91c2Vtb3ZlSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZW1vdmUuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlZG93bkhhbmRsZXIgPSBlID0+IHRoaXMubW91c2Vkb3duLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZXVwSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZXVwLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqL1xuICBlbWl0KCkge1xuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IGZhbHNlO1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgICBpZiAoZS5sYXllclggfHwgZS5sYXllclggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLmxheWVyWCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLmxheWVyWSAtIHRoaXMucC55KSAqIHRoaXMuZWFzZTtcbiAgICB9IGVsc2UgaWYgKGUub2Zmc2V0WCB8fCBlLm9mZnNldFggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLm9mZnNldFggLSB0aGlzLnAueCkgKiB0aGlzLmVhc2U7XG4gICAgICB0aGlzLnAueSArPSAoZS5vZmZzZXRZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbGxvd0VtaXR0aW5nKSBzdXBlci5lbWl0KFwib25jZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMubW91c2VUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBwaWN0dXJlIG9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBpcyBvciBub1xuICAgKi9cbiAgaXNJbWFnZShvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvYmouX19pc0ltYWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IHRhZ05hbWUgPSBgJHtvYmoudGFnTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBgJHtvYmoubm9kZU5hbWV9YC50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChub2RlTmFtZSA9PT0gXCJJTUdcIiB8fCB0YWdOYW1lID09PSBcIklNR1wiKSB7XG4gICAgICBvYmouX19pc0ltYWdlID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBzdHJpbmcgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgfVxufTtcbiIsImltcG9ydCBQb29sIGZyb20gXCIuLi9jb3JlL1Bvb2xcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMuY2lyY2xlQ29uZiA9IHsgaXNDaXJjbGU6IHRydWUgfTtcblxuICAgIHRoaXMuaW5pdEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMubmFtZSA9IFwiQmFzZVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRTdHJva2UoY29sb3IgPSBcIiMwMDAwMDBcIiwgdGhpbmtuZXNzID0gMSkge1xuICAgIHRoaXMuc3Ryb2tlID0geyBjb2xvciwgdGhpbmtuZXNzIH07XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9uUHJvdG9uVXBkYXRlLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGVBZnRlci5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlckFkZGVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciA9IGVtaXR0ZXIgPT4ge1xuICAgICAgdGhpcy5vbkVtaXR0ZXJSZW1vdmVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVDcmVhdGVkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVVcGRhdGUuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlRGVhZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVEZWFkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG4gIH1cblxuICBpbml0KHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50ID0gcHJvdG9uO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCB0aGlzLl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIpO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0NSRUFURURcIiwgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBvb2wgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG5cbiAgcmVtb3ZlKHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9BRERFRFwiLCB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfVVBEQVRFXCIsIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHt9XG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7fVxuXG4gIG9uRW1pdHRlckFkZGVkKGVtaXR0ZXIpIHt9XG4gIG9uRW1pdHRlclJlbW92ZWQoZW1pdHRlcikge31cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbi8qKlxuICogQ2FudmFzUmVuZGVyZXIgY2xhc3MgZm9yIHJlbmRlcmluZyBwYXJ0aWNsZXMgb24gYSBjYW52YXMgZWxlbWVudC5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBAdHlwZSB7b2JqZWN0fG51bGx9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHJva2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb250ZXh0O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYnVmZmVyQ2FjaGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IENhbnZhc1JlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBlbGVtZW50IC0gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHJlbmRlciBvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSB7fTtcbiAgICB0aGlzLm5hbWUgPSBcIkNhbnZhc1JlbmRlcmVyXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplcyB0aGUgY2FudmFzIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFRoZSBuZXcgd2lkdGggb2YgdGhlIGNhbnZhcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFRoZSBuZXcgaGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gICAqL1xuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjYW52YXMgb24gUHJvdG9uIHVwZGF0ZS5cbiAgICovXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGNyZWF0aW9uLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgY3JlYXRlZCBwYXJ0aWNsZS5cbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuY29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSB1cGRhdGVzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgdXBkYXRlZCBwYXJ0aWNsZS5cbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGRlc3RydWN0aW9uLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgZGVzdHJveWVkIHBhcnRpY2xlLlxuICAgKi9cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGltYWdlIHRvIHRoZSBwYXJ0aWNsZSBib2R5LlxuICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIFRoZSBpbWFnZSB0byBhZGQuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhZGQgdGhlIGltYWdlIHRvLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYW4gaW1hZ2UgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBkcmF3LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZHJhd0ltYWdlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdyA9IChwYXJ0aWNsZS5ib2R5LndpZHRoICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCBoID0gKHBhcnRpY2xlLmJvZHkuaGVpZ2h0ICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCB4ID0gcGFydGljbGUucC54IC0gdyAvIDI7XG4gICAgY29uc3QgeSA9IHBhcnRpY2xlLnAueSAtIGggLyAyO1xuXG4gICAgaWYgKCEhcGFydGljbGUuY29sb3IpIHtcbiAgICAgIGlmICghcGFydGljbGUuZGF0YVtcImJ1ZmZlclwiXSkgcGFydGljbGUuZGF0YS5idWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcihwYXJ0aWNsZS5ib2R5KTtcblxuICAgICAgY29uc3QgYnVmQ29udGV4dCA9IHBhcnRpY2xlLmRhdGEuYnVmZmVyLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGJ1ZkNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLndpZHRoLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci5oZWlnaHQpO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgYnVmQ29udGV4dC5kcmF3SW1hZ2UocGFydGljbGUuYm9keSwgMCwgMCk7XG5cbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgYnVmQ29udGV4dC5maWxsU3R5bGUgPSBDb2xvclV0aWwucmdiVG9IZXgocGFydGljbGUucmdiKTtcbiAgICAgIGJ1ZkNvbnRleHQuZmlsbFJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlcixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdyxcbiAgICAgICAgaFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKHBhcnRpY2xlLnJvdGF0aW9uKSk7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKC1wYXJ0aWNsZS5wLngsIC1wYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwLCBwYXJ0aWNsZS5ib2R5LndpZHRoLCBwYXJ0aWNsZS5ib2R5LmhlaWdodCwgeCwgeSwgdywgaCk7XG5cbiAgICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhIGNpcmN1bGFyIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gZHJhdy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5zdHJva2UudGhpbmtuZXNzO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBidWZmZXIgZm9yIGltYWdlIHBhcnRpY2xlcy5cbiAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWFnZSAtIFRoZSBpbWFnZSB0byBjcmVhdGUgYSBidWZmZXIgZm9yLlxuICAgKiBAcmV0dXJucyB7SFRNTENhbnZhc0VsZW1lbnR8dW5kZWZpbmVkfSBUaGUgY3JlYXRlZCBidWZmZXIgY2FudmFzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY3JlYXRlQnVmZmVyKGltYWdlKSB7XG4gICAgaWYgKFR5cGVzLmlzSW1hZ2UoaW1hZ2UpKSB7XG4gICAgICBjb25zdCBzaXplID0gaW1hZ2Uud2lkdGggKyBcIl9cIiArIGltYWdlLmhlaWdodDtcbiAgICAgIGxldCBjYW52YXMgPSB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdO1xuXG4gICAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgdGhpcy5idWZmZXJDYWNoZVtzaXplXSA9IGNhbnZhcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHJlbmRlcmVyIGFuZCBjbGVhbnMgdXAgcmVzb3VyY2VzLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5idWZmZXJDYWNoZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBEb21VdGlsIGZyb20gXCIuLi91dGlscy9Eb21VdGlsXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgRE9NLWJhc2VkIHJlbmRlcmVyIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgRG9tUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgSFRNTCBlbGVtZW50IHRvIHJlbmRlciB0by5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zZm9ybTNkID0gZmFsc2U7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLmFkZEltZzJCb2R5ID0gdGhpcy5hZGRJbWcyQm9keS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEb21SZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldCh0aGlzLmNpcmNsZUNvbmYsIHBhcnRpY2xlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgaWYgKHRoaXMudHJhbnNmb3JtM2QpIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0zZChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSwgcGFydGljbGUuc2NhbGUsIHBhcnRpY2xlLnJvdGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERvbVV0aWwudHJhbnNmb3JtKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfVxuXG4gICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLm9wYWNpdHkgPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkuaXNDaXJjbGUpIHtcbiAgICAgICAgcGFydGljbGUuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmJvZHlSZWFkeShwYXJ0aWNsZSkpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBib2R5UmVhZHkocGFydGljbGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHBhcnRpY2xlLmJvZHkgPT09IFwib2JqZWN0XCIgJiYgcGFydGljbGUuYm9keSAmJiAhcGFydGljbGUuYm9keS5pc0lubmVyO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQoaW1nLCBwYXJ0aWNsZSk7XG4gICAgRG9tVXRpbC5yZXNpemUocGFydGljbGUuYm9keSwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVTcHJpdGUoYm9keSwgcGFydGljbGUpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCAyICogcGFydGljbGUucmFkaXVzLCAyICogcGFydGljbGUucmFkaXVzKTtcbiAgICBkb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gYCR7cGFydGljbGUucmFkaXVzfXB4YDtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgZG9tLnN0eWxlLmJvcmRlckNvbG9yID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyV2lkdGggPSBgJHt0aGlzLnN0cm9rZS50aGlua25lc3N9cHhgO1xuICAgIH1cbiAgICBkb20uaXNDaXJjbGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHVybCA9IHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiID8gYm9keSA6IGJvZHkuc3JjO1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCBib2R5LndpZHRoLCBib2R5LmhlaWdodCk7XG4gICAgZG9tLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt1cmx9KWA7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSByZW5kZXJlciBhbmQgY2xlYW5zIHVwIHJlc291cmNlcy5cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFR5cGVzIGZyb20gXCIuLi91dGlscy9UeXBlc1wiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWFzZWxSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5uYW1lID0gXCJFYXNlbFJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICB0aGlzLmNyZWF0ZVNwcml0ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkueCA9IHBhcnRpY2xlLnAueDtcbiAgICAgIHBhcnRpY2xlLmJvZHkueSA9IHBhcnRpY2xlLnAueTtcblxuICAgICAgcGFydGljbGUuYm9keS5hbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgcGFydGljbGUuYm9keS5zY2FsZVggPSBwYXJ0aWNsZS5ib2R5LnNjYWxlWSA9IHBhcnRpY2xlLnNjYWxlO1xuICAgICAgcGFydGljbGUuYm9keS5yb3RhdGlvbiA9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucGFyZW50ICYmIHBhcnRpY2xlLmJvZHkucGFyZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChwYXJ0aWNsZS5ncmFwaGljcykgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ncmFwaGljcyk7XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIGNyZWF0ZVNwcml0ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgaWYgKHBhcnRpY2xlLmJvZHkucGFyZW50KSByZXR1cm47XG4gICAgaWYgKHBhcnRpY2xlLmJvZHlbXCJpbWFnZVwiXSkge1xuICAgICAgcGFydGljbGUuYm9keS5yZWdYID0gcGFydGljbGUuYm9keS5pbWFnZS53aWR0aCAvIDI7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJlZ1kgPSBwYXJ0aWNsZS5ib2R5LmltYWdlLmhlaWdodCAvIDI7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSB0aGlzLnBvb2wuZ2V0KHdpbmRvdy5jcmVhdGVqcy5HcmFwaGljcyk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkpIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UodGhpcy5zdHJva2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UoXCIjMDAwMDAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCIpLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMucG9vbC5nZXQod2luZG93LmNyZWF0ZWpzLlNoYXBlLCBbZ3JhcGhpY3NdKTtcblxuICAgIHBhcnRpY2xlLmJvZHkgPSBzaGFwZTtcbiAgICBwYXJ0aWNsZS5ncmFwaGljcyA9IGdyYXBoaWNzO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGl4ZWwtYmFzZWQgcmVuZGVyZXIgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4ZWxSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBpeGVsUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gcmVuZGVyIHRvLlxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gW3JlY3RhbmdsZV0gLSBUaGUgcmVjdGFuZ2xlIGRlZmluaW5nIHRoZSByZW5kZXJpbmcgYXJlYS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHJlY3RhbmdsZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gICAgdGhpcy5jcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUGl4ZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgY3JlYXRlSW1hZ2VEYXRhKHJlY3RhbmdsZSkge1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlID8gcmVjdGFuZ2xlIDogbmV3IFJlY3RhbmdsZSgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCB0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55KTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QodGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSwgdGhpcy5yZWN0YW5nbGUud2lkdGgsIHRoaXMucmVjdGFuZ2xlLmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKFxuICAgICAgdGhpcy5yZWN0YW5nbGUueCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLnksXG4gICAgICB0aGlzLnJlY3RhbmdsZS53aWR0aCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZUFmdGVyKCkge1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHt9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmltYWdlRGF0YSkge1xuICAgICAgdGhpcy5zZXRQaXhlbChcbiAgICAgICAgdGhpcy5pbWFnZURhdGEsXG4gICAgICAgIChwYXJ0aWNsZS5wLnggLSB0aGlzLnJlY3RhbmdsZS54KSA+PiAwLFxuICAgICAgICAocGFydGljbGUucC55IC0gdGhpcy5yZWN0YW5nbGUueSkgPj4gMCxcbiAgICAgICAgcGFydGljbGVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0UGl4ZWwoaW1hZ2VkYXRhLCB4LCB5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHJnYiA9IHBhcnRpY2xlLnJnYjtcbiAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuZWxlbWVudC53aWR0aCB8fCB5IDwgMCB8fCB5ID4gdGhpcy5lbGVtZW50LmhlaWdodCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIGltYWdlZGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaV0gPSByZ2IucjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMV0gPSByZ2IuZztcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMl0gPSByZ2IuYjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgM10gPSBwYXJ0aWNsZS5hbHBoYSAqIDI1NTtcbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcmVuZGVyZXIgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxubGV0IFBJWElDbGFzcztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgUElYSS1iYXNlZCByZW5kZXJlciBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhpUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQaXhpUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7UElYSS5Db250YWluZXJ9IGVsZW1lbnQgLSBUaGUgUElYSSBjb250YWluZXIgdG8gcmVuZGVyIHRvLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtzdHJva2VdIC0gVGhlIHN0cm9rZSBjb2xvciBmb3IgcGFydGljbGVzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLmNvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuYmxlbmRNb2RlID0gbnVsbDtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuc2V0UElYSSh3aW5kb3cuUElYSSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGlSZW5kZXJlclwiO1xuICB9XG5cbiAgc2V0UElYSShQSVhJKSB7XG4gICAgdHJ5IHtcbiAgICAgIFBJWElDbGFzcyA9IFBJWEkgfHwgeyBTcHJpdGU6IHt9IH07XG4gICAgICB0aGlzLmNyZWF0ZUZyb21JbWFnZSA9IFBJWElDbGFzcy5TcHJpdGUuZnJvbSB8fCBQSVhJQ2xhc3MuU3ByaXRlLmZyb21JbWFnZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICB0aGlzLnRyYW5zZm9ybShwYXJ0aWNsZSwgcGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAodGhpcy5zZXRDb2xvciA9PT0gdHJ1ZSB8fCB0aGlzLmNvbG9yID09PSB0cnVlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnRpbnQgPSBDb2xvclV0aWwuZ2V0SGV4MTZGcm9tUGFydGljbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICB0cmFuc2Zvcm0ocGFydGljbGUsIHRhcmdldCkge1xuICAgIHRhcmdldC54ID0gcGFydGljbGUucC54O1xuICAgIHRhcmdldC55ID0gcGFydGljbGUucC55O1xuXG4gICAgdGFyZ2V0LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0YXJnZXQuc2NhbGUueCA9IHBhcnRpY2xlLnNjYWxlO1xuICAgIHRhcmdldC5zY2FsZS55ID0gcGFydGljbGUuc2NhbGU7XG5cbiAgICAvLyB1c2luZyBjYWNoZWQgdmVyc2lvbiBvZiBNYXRoVXRpbC5QSV8xODAgZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZS5cbiAgICB0YXJnZXQucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDsgLy8gTWF0aFV0aWwuUElfMTgwO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHkpO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHkpIHtcbiAgICBjb25zdCBzcHJpdGUgPSBib2R5LmlzSW5uZXIgPyB0aGlzLmNyZWF0ZUZyb21JbWFnZShib2R5LnNyYykgOiBuZXcgUElYSUNsYXNzLlNwcml0ZShib2R5KTtcblxuICAgIHNwcml0ZS5hbmNob3IueCA9IDAuNTtcbiAgICBzcHJpdGUuYW5jaG9yLnkgPSAwLjU7XG5cbiAgICByZXR1cm4gc3ByaXRlO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSUNsYXNzLkdyYXBoaWNzKCk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGNvbnN0IHN0cm9rZSA9IFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSA/IHRoaXMuc3Ryb2tlIDogMHgwMDAwMDA7XG4gICAgICBncmFwaGljcy5iZWdpblN0cm9rZShzdHJva2UpO1xuICAgIH1cblxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCAweDAwOGNlZCk7XG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcblxuICAgIHJldHVybiBncmFwaGljcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcmVuZGVyZXIgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8UGFydGljbGU+fSBwYXJ0aWNsZXMgLSBUaGUgcGFydGljbGVzIHRvIGNsZWFuIHVwLlxuICAgKi9cbiAgZGVzdHJveShwYXJ0aWNsZXMpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG5cbiAgICBsZXQgaSA9IHBhcnRpY2xlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IHBhcnRpY2xlID0gcGFydGljbGVzW2ldO1xuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdDMgZnJvbSBcIi4uL21hdGgvTWF0M1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNU3RhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hdHMgPSBbXTtcbiAgICB0aGlzLnNpemUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB0aGlzLm1hdHMucHVzaChNYXQzLmNyZWF0ZShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKTtcbiAgfVxuXG4gIHNldChtLCBpKSB7XG4gICAgaWYgKGkgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1tpIC0gMV0sIG0sIHRoaXMubWF0c1tpXSk7XG5cbiAgICB0aGlzLnNpemUgPSBNYXRoLm1heCh0aGlzLnNpemUsIGkgKyAxKTtcbiAgfVxuXG4gIHB1c2gobSkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1t0aGlzLnNpemUgLSAxXSwgbSwgdGhpcy5tYXRzW3RoaXMuc2l6ZV0pO1xuXG4gICAgdGhpcy5zaXplKys7XG4gIH1cblxuICBwb3AoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA+IDApIHRoaXMuc2l6ZS0tO1xuICB9XG5cbiAgdG9wKCkge1xuICAgIHJldHVybiB0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV07XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IE1TdGFjayBmcm9tIFwiLi4vdXRpbHMvTVN0YWNrXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IFdlYkdMVXRpbCBmcm9tIFwiLi4vdXRpbHMvV2ViR0xVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgV2ViR0wtYmFzZWQgcmVuZGVyZXIgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViR0xSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFdlYkdMUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gcmVuZGVyIHRvLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5nbCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIsIHsgYW50aWFsaWFzOiB0cnVlLCBzdGVuY2lsOiBmYWxzZSwgZGVwdGg6IGZhbHNlIH0pO1xuICAgIGlmICghdGhpcy5nbCkgYWxlcnQoXCJTb3JyeSB5b3VyIGJyb3dzZXIgZG8gbm90IHN1cHBlc3QgV2ViR0whXCIpO1xuXG4gICAgdGhpcy5pbml0VmFyKCk7XG4gICAgdGhpcy5zZXRNYXhSYWRpdXMoKTtcbiAgICB0aGlzLmluaXRTaGFkZXJzKCk7XG4gICAgdGhpcy5pbml0QnVmZmVycygpO1xuXG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2wuRlVOQ19BREQpO1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIldlYkdMUmVuZGVyZXJcIjtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgc3VwZXIuaW5pdChwcm90b24pO1xuICAgIHRoaXMucmVzaXplKHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMudW1hdFs0XSA9IC0yO1xuICAgIHRoaXMudW1hdFs3XSA9IDE7XG5cbiAgICB0aGlzLnNtYXRbMF0gPSAxIC8gd2lkdGg7XG4gICAgdGhpcy5zbWF0WzRdID0gMSAvIGhlaWdodDtcblxuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnVtYXQsIDApO1xuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnNtYXQsIDEpO1xuXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0TWF4UmFkaXVzKHJhZGl1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzVVJMID0gdGhpcy5jcmVhdGVDaXJjbGUocmFkaXVzKTtcbiAgfVxuXG4gIGdldFZlcnRleFNoYWRlcigpIHtcbiAgICBjb25zdCB2c1NvdXJjZSA9IFtcbiAgICAgIFwidW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1wiLFxuICAgICAgXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInVuaWZvcm0gbWF0MyB0TWF0O1wiLFxuICAgICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidmFyeWluZyBmbG9hdCBhbHBoYTtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWMzIHYgPSB0TWF0ICogdmVjMyhhVmVydGV4UG9zaXRpb24sIDEuMCk7XCIsXG4gICAgICBcImdsX1Bvc2l0aW9uID0gdmVjNCh2LngsIHYueSwgMCwgMSk7XCIsXG4gICAgICBcInZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJhbHBoYSA9IHRNYXRbMF1bMl07XCIsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gdnNTb3VyY2U7XG4gIH1cblxuICBnZXRGcmFnbWVudFNoYWRlcigpIHtcbiAgICBjb25zdCBmc1NvdXJjZSA9IFtcbiAgICAgIFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWM0IGNvbG9yO1wiLFxuICAgICAgXCJ1bmlmb3JtIGJvb2wgdXNlVGV4dHVyZTtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWMzIHVDb2xvcjtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWM0IHRleHR1cmVDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvciA9IHRleHR1cmVDb2xvciAqIHZlYzQodUNvbG9yLCAxLjApO1wiLFxuICAgICAgXCJnbF9GcmFnQ29sb3IudyAqPSBhbHBoYTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiBmc1NvdXJjZTtcbiAgfVxuXG4gIGluaXRWYXIoKSB7XG4gICAgdGhpcy5tc3RhY2sgPSBuZXcgTVN0YWNrKCk7XG4gICAgdGhpcy51bWF0ID0gTWF0My5jcmVhdGUoWzIsIDAsIDEsIDAsIC0yLCAwLCAtMSwgMSwgMV0pO1xuICAgIHRoaXMuc21hdCA9IE1hdDMuY3JlYXRlKFsxIC8gMTAwLCAwLCAxLCAwLCAxIC8gMTAwLCAwLCAwLCAwLCAxXSk7XG4gICAgdGhpcy50ZXh0dXJlYnVmZmVycyA9IHt9O1xuICB9XG5cbiAgYmxlbmRFcXVhdGlvbihBKSB7XG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2xbQV0pO1xuICB9XG5cbiAgYmxlbmRGdW5jKEEsIEIpIHtcbiAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsW0FdLCB0aGlzLmdsW0JdKTtcbiAgfVxuXG4gIGdldFNoYWRlcihnbCwgc3RyLCBmcykge1xuICAgIGNvbnN0IHNoYWRlciA9IGZzID8gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUikgOiBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzdHIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBhbGVydChnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfVxuXG4gIGluaXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5nZXRTaGFkZXIodGhpcy5nbCwgdGhpcy5nZXRGcmFnbWVudFNoYWRlcigpLCB0cnVlKTtcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldFZlcnRleFNoYWRlcigpLCBmYWxzZSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5zcHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgdGhpcy5nbC5saW5rUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcblxuICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuc3Byb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSBhbGVydChcIkNvdWxkIG5vdCBpbml0aWFsaXNlIHNoYWRlcnNcIik7XG5cbiAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5zcHJvZ3JhbSk7XG4gICAgdGhpcy5zcHJvZ3JhbS52cGEgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVZlcnRleFBvc2l0aW9uXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udGNhID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcImFUZXh0dXJlQ29vcmRcIik7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnRjYSk7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnZwYSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ0TWF0XCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVTYW1wbGVyXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udXNlVGV4ID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1c2VUZXh0dXJlXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uY29sb3IgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVDb2xvclwiKTtcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnVzZVRleCwgMSk7XG4gIH1cblxuICBpbml0QnVmZmVycygpIHtcbiAgICBjb25zdCB2cyA9IFswLCAzLCAxLCAwLCAyLCAzXTtcbiAgICBsZXQgaWR4O1xuXG4gICAgdGhpcy51bml0SUJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodnMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGxldCBpO1xuICAgIGxldCBpZHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTAwOyBpKyspIGlkcy5wdXNoKGkpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy51bml0STMzID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0STMzKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcbiAgICBpZHggPSBuZXcgVWludDE2QXJyYXkoaWRzKTtcblxuICAgIHRoaXMuc3RyaXBCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnN0cmlwQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShyYWlkdXMpIHtcbiAgICB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyA9IFdlYkdMVXRpbC5uaHBvdChVdGlsLmluaXRWYWx1ZShyYWlkdXMsIDMyKSk7XG4gICAgY29uc3QgY2FudmFzID0gRG9tVXRpbC5jcmVhdGVDYW52YXMoXCJjaXJjbGVfY2FudmFzXCIsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzICogMiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyKTtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcblxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gIH1cblxuICBkcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IF93ID0gcGFydGljbGUuYm9keS53aWR0aDtcbiAgICBjb25zdCBfaCA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0O1xuXG4gICAgY29uc3QgX3dpZHRoID0gV2ViR0xVdGlsLm5ocG90KHBhcnRpY2xlLmJvZHkud2lkdGgpO1xuICAgIGNvbnN0IF9oZWlnaHQgPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS5oZWlnaHQpO1xuXG4gICAgY29uc3QgX3NjYWxlWCA9IHBhcnRpY2xlLmJvZHkud2lkdGggLyBfd2lkdGg7XG4gICAgY29uc3QgX3NjYWxlWSA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0IC8gX2hlaWdodDtcblxuICAgIGlmICghdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY10pXG4gICAgICB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSA9IFtcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKClcbiAgICAgIF07XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmUgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVswXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMV07XG4gICAgcGFydGljbGUuZGF0YS50Y0J1ZmZlciA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzJdO1xuXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfc2NhbGVYLCAwLjAsIDAuMCwgX3NjYWxlWSwgX3NjYWxlWSwgX3NjYWxlWV0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfdywgMC4wLCAwLjAsIF9oLCBfdywgX2hdKSxcbiAgICAgIHRoaXMuZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuXG4gICAgY29uc3QgY29udGV4dCA9IHBhcnRpY2xlLmRhdGEuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcblxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBwYXJ0aWNsZS5kYXRhLnRleHR1cmUpO1xuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLkxJTkVBUik7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKTtcbiAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSB0cnVlO1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZVdpZHRoID0gX3c7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0ID0gX2g7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHtcbiAgICAvLyB0aGlzLmdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSk7XG4gICAgLy8gdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSBmYWxzZTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRtYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdFs4XSA9IDE7XG4gICAgcGFydGljbGUuZGF0YS5pbWF0ID0gTWF0My5jcmVhdGUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXRbOF0gPSAxO1xuXG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUodGhpcy5jaXJjbGVDYW52YXNVUkwsIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSBwYXJ0aWNsZS5yYWRpdXMgLyB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cztcbiAgICB9XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIGFkZEltZzJCb2R5KGltZywgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGVhZCkgcmV0dXJuO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gICAgcGFydGljbGUuZGF0YS5zcmMgPSBpbWcuc3JjO1xuICAgIHBhcnRpY2xlLmRhdGEuY2FudmFzID0gSW1nVXRpbC5nZXRDYW52YXNGcm9tQ2FjaGUoaW1nKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlID0gMTtcblxuICAgIHRoaXMuZHJhd0ltZzJDYW52YXMocGFydGljbGUpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KHBhcnRpY2xlKTtcblxuICAgICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zcHJvZ3JhbS5jb2xvciwgcGFydGljbGUucmdiLnIgLyAyNTUsIHBhcnRpY2xlLnJnYi5nIC8gMjU1LCBwYXJ0aWNsZS5yZ2IuYiAvIDI1NSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zcHJvZ3JhbS50TWF0VW5pZm9ybSwgZmFsc2UsIHRoaXMubXN0YWNrLnRvcCgpKTtcblxuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnZwYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnRjYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnNhbXBsZXJVbmlmb3JtLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJQnVmZmVyKTtcblxuICAgICAgdGhpcy5nbC5kcmF3RWxlbWVudHModGhpcy5nbC5UUklBTkdMRVMsIDYsIHRoaXMuZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuICAgICAgdGhpcy5tc3RhY2sucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG5cbiAgdXBkYXRlTWF0cml4KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgbW92ZU9yaWdpbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlVHJhbnNsYXRpb24oXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggLyAyLFxuICAgICAgLXBhcnRpY2xlLmRhdGEudGV4dHVyZUhlaWdodCAvIDJcbiAgICApO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSk7XG5cbiAgICBjb25zdCBhbmdlbCA9IHBhcnRpY2xlLnJvdGF0aW9uICogTWF0aFV0aWwuUElfMTgwO1xuICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VSb3RhdGlvbihhbmdlbCk7XG5cbiAgICBjb25zdCBzY2FsZSA9IHBhcnRpY2xlLnNjYWxlICogcGFydGljbGUuZGF0YS5vbGRTY2FsZTtcbiAgICBjb25zdCBzY2FsZU1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlU2NhbGUoc2NhbGUsIHNjYWxlKTtcbiAgICBsZXQgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1vdmVPcmlnaW5NYXRyaXgsIHNjYWxlTWF0cml4KTtcblxuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHJvdGF0aW9uTWF0cml4KTtcbiAgICBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobWF0cml4LCB0cmFuc2xhdGlvbk1hdHJpeCk7XG5cbiAgICBNYXQzLmludmVyc2UobWF0cml4LCBwYXJ0aWNsZS5kYXRhLmltYXQpO1xuICAgIG1hdHJpeFsyXSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGhpcy5tc3RhY2sucHVzaChtYXRyaXgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5nbCA9IG51bGw7XG4gICAgdGhpcy5tc3RhY2sgPSBudWxsO1xuICAgIHRoaXMudW1hdCA9IG51bGw7XG4gICAgdGhpcy5zbWF0ID0gbnVsbDtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY3VzdG9tIHJlbmRlcmVyIHRoYXQgZXh0ZW5kcyB0aGUgQmFzZVJlbmRlcmVyLlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQ3VzdG9tUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgSFRNTCBlbGVtZW50IHRvIHJlbmRlciB0by5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSByZW5kZXJlci5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tUmVuZGVyZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpbmUgem9uZSBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIFpvbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTGluZVpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4MSAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIGZpcnN0IHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geTEgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBmaXJzdCBwb2ludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4Ml0gLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBzZWNvbmQgcG9pbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeTJdIC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgc2Vjb25kIHBvaW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2RpcmVjdGlvbj1cIj5cIl0gLSBUaGUgZGlyZWN0aW9uIG9mIHRoZSBsaW5lLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeDEsIHkxLCB4MiwgeTIsIGRpcmVjdGlvbiA9IFwiPlwiKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh4MiAtIHgxID49IDApIHtcbiAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54MSA9IHgyO1xuICAgICAgdGhpcy55MSA9IHkyO1xuICAgICAgdGhpcy54MiA9IHgxO1xuICAgICAgdGhpcy55MiA9IHkxO1xuICAgIH1cblxuICAgIHRoaXMuZHggPSB0aGlzLngyIC0gdGhpcy54MTtcbiAgICB0aGlzLmR5ID0gdGhpcy55MiAtIHRoaXMueTE7XG5cbiAgICB0aGlzLm1pbnggPSBNYXRoLm1pbih0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1pbnkgPSBNYXRoLm1pbih0aGlzLnkxLCB0aGlzLnkyKTtcbiAgICB0aGlzLm1heHggPSBNYXRoLm1heCh0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1heHkgPSBNYXRoLm1heCh0aGlzLnkxLCB0aGlzLnkyKTtcblxuICAgIHRoaXMuZG90ID0gdGhpcy54MiAqIHRoaXMueTEgLSB0aGlzLngxICogdGhpcy55MjtcbiAgICB0aGlzLnh4eXkgPSB0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5O1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlsLmluaXRWYWx1ZShkaXJlY3Rpb24sIFwiPlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmFuZG9tIHBvc2l0aW9uIG9uIHRoZSBsaW5lLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcmFuZG9tIHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5yYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLngxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguY29zKHRoaXMuZ3JhZGllbnQpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguc2luKHRoaXMuZ3JhZGllbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hpY2ggc2lkZSBvZiB0aGUgbGluZSBhIHBvaW50IGlzIG9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcG9pbnQgaXMgb24gdGhlIHBvc2l0aXZlIHNpZGUgb2YgdGhlIGxpbmUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQiA9PT0gMCA/IDEgOiBCO1xuXG4gICAgaWYgKChBICogeCArIEIgKiB5ICsgQykgKiBEID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2Ugb2YgYSBwb2ludCBmcm9tIHRoZSBsaW5lLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgZnJvbSB0aGUgcG9pbnQgdG8gdGhlIGxpbmUuXG4gICAqL1xuICBnZXREaXN0YW5jZSh4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQSAqIHggKyBCICogeSArIEM7XG5cbiAgICByZXR1cm4gRCAvIE1hdGguc3FydCh0aGlzLnh4eXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHN5bW1ldHJpYyB2ZWN0b3Igb2YgYSBnaXZlbiB2ZWN0b3Igd2l0aCByZXNwZWN0IHRvIHRoZSBsaW5lLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIHZlY3RvciB0byByZWZsZWN0LlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoZSByZWZsZWN0ZWQgdmVjdG9yLlxuICAgKi9cbiAgZ2V0U3ltbWV0cmljKHYpIHtcbiAgICBjb25zdCB0aGEyID0gdi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG5cbiAgICBjb25zdCBvbGR4ID0gdi54O1xuICAgIGNvbnN0IG9sZHkgPSB2Lnk7XG5cbiAgICB2LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBncmFkaWVudCAoYW5nbGUpIG9mIHRoZSBsaW5lLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZ3JhZGllbnQgb2YgdGhlIGxpbmUgaW4gcmFkaWFucy5cbiAgICovXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMuZHksIHRoaXMuZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIHBhcnRpY2xlIGlzIG91dHNpZGUgdGhlIHJhbmdlIG9mIHRoZSBsaW5lLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBhcnRpY2xlIGlzIHdpdGhpbiByYW5nZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgcmFuZ2VPdXQocGFydGljbGUpIHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYWJzKHRoaXMuZ2V0R3JhZGllbnQoKSk7XG5cbiAgICBpZiAoYW5nbGUgPD0gTWF0aFV0aWwuUEkgLyA0KSB7XG4gICAgICBpZiAocGFydGljbGUucC54IDw9IHRoaXMubWF4eCAmJiBwYXJ0aWNsZS5wLnggPj0gdGhpcy5taW54KSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueSA8PSB0aGlzLm1heHkgJiYgcGFydGljbGUucC55ID49IHRoaXMubWlueSkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxlbmd0aCBvZiB0aGUgbGluZS5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgbGluZS5cbiAgICovXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZHggKiB0aGlzLmR4ICsgdGhpcy5keSAqIHRoaXMuZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IgYmFzZWQgb24gdGhlIGNyb3NzVHlwZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2hlY2sgZm9yIGNyb3NzaW5nLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IFwiPlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcIlJcIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJyaWdodFwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcImRvd25cIikge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG5cbiAgICAgIGlmICh0aGlzLmdldERpc3RhbmNlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSA8PSBwYXJ0aWNsZS5yYWRpdXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZHggPT09IDApIHtcbiAgICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keSA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZS52KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBMaW5lWm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzIG1ldGhvZCFcIik7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjaXJjdWxhciB6b25lIGluIGEgMkQgc3BhY2UuXG4gKiBAZXh0ZW5kcyBab25lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQ2lyY2xlWm9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBjaXJjbGUncyBjZW50ZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgY2lyY2xlJ3MgY2VudGVyLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1c10gLSBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5LCByYWRpdXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgIHRoaXMuY2VudGVyID0geyB4LCB5IH07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJhbmRvbSBwb3NpdGlvbiB3aXRoaW4gdGhlIGNpcmNsZS5cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlcy5cbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSXgyICogTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnJhbmRvbVJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLnNpbih0aGlzLmFuZ2xlKTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgbmV3IHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VudGVyLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSBuZXcgeS1jb29yZGluYXRlIG9mIHRoZSBjZW50ZXIuXG4gICAqL1xuICBzZXRDZW50ZXIoeCwgeSkge1xuICAgIHRoaXMuY2VudGVyLnggPSB4O1xuICAgIHRoaXMuY2VudGVyLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjayBmb3IgY3Jvc3NpbmcuXG4gICAqL1xuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGQgPSBwYXJ0aWNsZS5wLmRpc3RhbmNlVG8odGhpcy5jZW50ZXIpO1xuXG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKGQgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnJhZGl1cykgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoZCArIHBhcnRpY2xlLnJhZGl1cyA+PSB0aGlzLnJhZGl1cykgdGhpcy5nZXRTeW1tZXRyaWMocGFydGljbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBDaXJjbGVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzeW1tZXRyaWMgcG9zaXRpb24gb2YgYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNhbGN1bGF0ZSBzeW1tZXRyeSBmb3IuXG4gICAqL1xuICBnZXRTeW1tZXRyaWMocGFydGljbGUpIHtcbiAgICBjb25zdCB0aGEyID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KHBhcnRpY2xlKTtcblxuICAgIGNvbnN0IHRoYSA9IDIgKiAodGhhMSAtIHRoYTIpO1xuICAgIGNvbnN0IG9sZHggPSBwYXJ0aWNsZS52Lng7XG4gICAgY29uc3Qgb2xkeSA9IHBhcnRpY2xlLnYueTtcblxuICAgIHBhcnRpY2xlLnYueCA9IG9sZHggKiBNYXRoLmNvcyh0aGEpIC0gb2xkeSAqIE1hdGguc2luKHRoYSk7XG4gICAgcGFydGljbGUudi55ID0gb2xkeCAqIE1hdGguc2luKHRoYSkgKyBvbGR5ICogTWF0aC5jb3ModGhhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBncmFkaWVudCBmb3IgYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNhbGN1bGF0ZSB0aGUgZ3JhZGllbnQgZm9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY2FsY3VsYXRlZCBncmFkaWVudC5cbiAgICovXG4gIGdldEdyYWRpZW50KHBhcnRpY2xlKSB7XG4gICAgcmV0dXJuIC1NYXRoVXRpbC5QSV8yICsgTWF0aC5hdGFuMihwYXJ0aWNsZS5wLnkgLSB0aGlzLmNlbnRlci55LCBwYXJ0aWNsZS5wLnggLSB0aGlzLmNlbnRlci54KTtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZWN0YW5ndWxhciB6b25lIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgWm9uZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0Wm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBSZWN0Wm9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3aWR0aF0gLSBUaGUgd2lkdGggb2YgdGhlIHJlY3RhbmdsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoZWlnaHRdIC0gVGhlIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGggPSAyMDAsIGhlaWdodCA9IDIwMCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByYW5kb20gcG9zaXRpb24gd2l0aGluIHRoZSByZWN0YW5ndWxhciB6b25lLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcmFuZG9tIHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IgYmFzZWQgb24gdGhlIGNyb3NzVHlwZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2hlY2sgZm9yIGNyb3NzaW5nLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICAvLyBwYXJ0aWNsZSBkZWFkIHpvbmVcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGgpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuXG4gICAgICBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBib3VuZCB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoIC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFydGljbGUgY3Jvc3Mgem9uZVxuICAgIGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnggJiYgcGFydGljbGUudi54IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgdGhpcy53aWR0aCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCAmJiBwYXJ0aWNsZS52LnggPj0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkgJiYgcGFydGljbGUudi55IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0ICYmIHBhcnRpY2xlLnYueSA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHpvbmUgYmFzZWQgb24gaW1hZ2UgZGF0YS5cbiAqIEBleHRlbmRzIFpvbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIEltYWdlWm9uZS5cbiAgICogQHBhcmFtIHtJbWFnZURhdGF9IGltYWdlRGF0YSAtIFRoZSBpbWFnZSBkYXRhIHRvIHVzZSBmb3IgdGhlIHpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSAtIFRoZSB4LWNvb3JkaW5hdGUgb2Zmc2V0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gLSBUaGUgeS1jb29yZGluYXRlIG9mZnNldC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtkPTJdIC0gVGhlIHNhbXBsaW5nIGRlbnNpdHkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbWFnZURhdGEsIHgsIHksIGQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIEltYWdlWm9uZSB3aXRoIG5ldyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge0ltYWdlRGF0YX0gaW1hZ2VEYXRhIC0gVGhlIGltYWdlIGRhdGEgdG8gdXNlIGZvciB0aGUgem9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdIC0gVGhlIHgtY29vcmRpbmF0ZSBvZmZzZXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSAtIFRoZSB5LWNvb3JkaW5hdGUgb2Zmc2V0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2Q9Ml0gLSBUaGUgc2FtcGxpbmcgZGVuc2l0eS5cbiAgICovXG4gIHJlc2V0KGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gaW1hZ2VEYXRhO1xuICAgIHRoaXMueCA9IFV0aWwuaW5pdFZhbHVlKHgsIDApO1xuICAgIHRoaXMueSA9IFV0aWwuaW5pdFZhbHVlKHksIDApO1xuICAgIHRoaXMuZCA9IFV0aWwuaW5pdFZhbHVlKGQsIDIpO1xuXG4gICAgdGhpcy52ZWN0b3JzID0gW107XG4gICAgdGhpcy5zZXRWZWN0b3JzKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB2ZWN0b3JzIGJhc2VkIG9uIHRoZSBpbWFnZSBkYXRhLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgdmVjdG9yIG9iamVjdC5cbiAgICovXG4gIHNldFZlY3RvcnMoKSB7XG4gICAgbGV0IGksIGo7XG4gICAgY29uc3QgbGVuZ3RoMSA9IHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGxlbmd0aDIgPSB0aGlzLmltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSArPSB0aGlzLmQpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGgyOyBqICs9IHRoaXMuZCkge1xuICAgICAgICBsZXQgaW5kZXggPSAoKGogPj4gMCkgKiBsZW5ndGgxICsgKGkgPj4gMCkpICogNDtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkge1xuICAgICAgICAgIHRoaXMudmVjdG9ycy5wdXNoKHsgeDogaSArIHRoaXMueCwgeTogaiArIHRoaXMueSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBwb2ludCBpcyB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgaW1hZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZSB0byBjaGVjay5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcG9pbnQgaXMgd2l0aGluIGJvdW5kcywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ2V0Qm91bmQoeCwgeSkge1xuICAgIGNvbnN0IGluZGV4ID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIHJldHVybiB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByYW5kb20gcG9zaXRpb24gd2l0aGluIHRoZSBpbWFnZSB6b25lLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgY29uc3QgdmVjdG9yID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMudmVjdG9ycyk7XG4gICAgcmV0dXJuIHRoaXMudmVjdG9yLmNvcHkodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb2xvciBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRoZSBpbWFnZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHIsIGcsIGIsIGFuZCBhIHZhbHVlcy5cbiAgICovXG4gIGdldENvbG9yKHgsIHkpIHtcbiAgICB4IC09IHRoaXMueDtcbiAgICB5IC09IHRoaXMueTtcbiAgICBjb25zdCBpID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaV0sXG4gICAgICBnOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAxXSxcbiAgICAgIGI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDJdLFxuICAgICAgYTogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgM11cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjayBmb3IgY3Jvc3NpbmcuXG4gICAqL1xuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRlYWQgPSB0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLnYubmVnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBJbWFnZVpvbmUgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4uL3pvbmUvQ2lyY2xlWm9uZVwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IFJlY3Rab25lIGZyb20gXCIuLi96b25lL1JlY3Rab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sIGZ1bmMpIHtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgKCkgPT4gZnVuYygpKTtcbiAgfSxcblxuICBnZXRTdHlsZShjb2xvciA9IFwiI2ZmMDAwMFwiKSB7XG4gICAgY29uc3QgcmdiID0gQ29sb3JVdGlsLmhleFRvUmdiKGNvbG9yKTtcbiAgICByZXR1cm4gYHJnYmEoJHtyZ2Iucn0sICR7cmdiLmd9LCAke3JnYi5ifSwgMC41KWA7XG4gIH0sXG5cbiAgZHJhd1pvbmUocHJvdG9uLCBjYW52YXMsIHpvbmUsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGlmICh6b25lIGluc3RhbmNlb2YgUG9pbnRab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIExpbmVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oem9uZS54MSwgem9uZS55MSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHpvbmUueDIsIHpvbmUueTIpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgUmVjdFpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmRyYXdSZWN0KHpvbmUueCwgem9uZS55LCB6b25lLndpZHRoLCB6b25lLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBDaXJjbGVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5hcmMoem9uZS54LCB6b25lLnksIHpvbmUucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZHJhd0VtaXR0ZXIocHJvdG9uLCBjYW52YXMsIGVtaXR0ZXIsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgY29udGV4dC5hcmMoZW1pdHRlci5wLngsIGVtaXR0ZXIucC55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuL2NvcmUvUGFydGljbGVcIjtcbmltcG9ydCBQb29sIGZyb20gXCIuL2NvcmUvUG9vbFwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi9tYXRoL1BvbGFyMkRcIjtcbmltcG9ydCBNYXQzIGZyb20gXCIuL21hdGgvTWF0M1wiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi9tYXRoL2Vhc2VcIjtcblxuaW1wb3J0IFJhdGUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9pbml0aWFsaXplL0luaXRpYWxpemVcIjtcbmltcG9ydCBMaWZlIGZyb20gXCIuL2luaXRpYWxpemUvTGlmZVwiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL2luaXRpYWxpemUvUG9zaXRpb25cIjtcbmltcG9ydCBWZWxvY2l0eSBmcm9tIFwiLi9pbml0aWFsaXplL1ZlbG9jaXR5XCI7XG5pbXBvcnQgTWFzcyBmcm9tIFwiLi9pbml0aWFsaXplL01hc3NcIjtcbmltcG9ydCBSYWRpdXMgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYWRpdXNcIjtcbmltcG9ydCBCb2R5IGZyb20gXCIuL2luaXRpYWxpemUvQm9keVwiO1xuXG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL2JlaGF2aW91ci9CZWhhdmlvdXJcIjtcbmltcG9ydCBGb3JjZSBmcm9tIFwiLi9iZWhhdmlvdXIvRm9yY2VcIjtcbmltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL2JlaGF2aW91ci9BdHRyYWN0aW9uXCI7XG5pbXBvcnQgUmFuZG9tRHJpZnQgZnJvbSBcIi4vYmVoYXZpb3VyL1JhbmRvbURyaWZ0XCI7XG5pbXBvcnQgR3Jhdml0eSBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVwiO1xuaW1wb3J0IENvbGxpc2lvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sbGlzaW9uXCI7XG5pbXBvcnQgQ3Jvc3Nab25lIGZyb20gXCIuL2JlaGF2aW91ci9Dcm9zc1pvbmVcIjtcbmltcG9ydCBBbHBoYSBmcm9tIFwiLi9iZWhhdmlvdXIvQWxwaGFcIjtcbmltcG9ydCBTY2FsZSBmcm9tIFwiLi9iZWhhdmlvdXIvU2NhbGVcIjtcbmltcG9ydCBSb3RhdGUgZnJvbSBcIi4vYmVoYXZpb3VyL1JvdGF0ZVwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuL2JlaGF2aW91ci9Db2xvclwiO1xuaW1wb3J0IEN5Y2xvbmUgZnJvbSBcIi4vYmVoYXZpb3VyL0N5Y2xvbmVcIjtcbmltcG9ydCBSZXB1bHNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL1JlcHVsc2lvblwiO1xuaW1wb3J0IEdyYXZpdHlXZWxsIGZyb20gXCIuL2JlaGF2aW91ci9HcmF2aXR5V2VsbFwiO1xuXG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0VtaXR0ZXJcIjtcbmltcG9ydCBCZWhhdmlvdXJFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlclwiO1xuaW1wb3J0IEZvbGxvd0VtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9Gb2xsb3dFbWl0dGVyXCI7XG5cbmltcG9ydCBDYW52YXNSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ2FudmFzUmVuZGVyZXJcIjtcbmltcG9ydCBEb21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRG9tUmVuZGVyZXJcIjtcbmltcG9ydCBFYXNlbFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9FYXNlbFJlbmRlcmVyXCI7XG5pbXBvcnQgUGl4ZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4ZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGlSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4aVJlbmRlcmVyXCI7XG5pbXBvcnQgV2ViR0xSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvV2ViR0xSZW5kZXJlclwiO1xuaW1wb3J0IEN1c3RvbVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9DdXN0b21SZW5kZXJlclwiO1xuXG5pbXBvcnQgWm9uZSBmcm9tIFwiLi96b25lL1pvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi96b25lL0xpbmVab25lXCI7XG5pbXBvcnQgQ2lyY2xlWm9uZSBmcm9tIFwiLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi96b25lL1JlY3Rab25lXCI7XG5pbXBvcnQgSW1hZ2Vab25lIGZyb20gXCIuL3pvbmUvSW1hZ2Vab25lXCI7XG5cbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi9kZWJ1Zy9EZWJ1Z1wiO1xuXG4vLyBuYW1lc3BhY2VcblByb3Rvbi5QYXJ0aWNsZSA9IFBhcnRpY2xlO1xuUHJvdG9uLlBvb2wgPSBQb29sO1xuXG5Qcm90b24uVXRpbCA9IFV0aWw7XG5Qcm90b24uQ29sb3JVdGlsID0gQ29sb3JVdGlsO1xuUHJvdG9uLk1hdGhVdGlsID0gTWF0aFV0aWw7XG5Qcm90b24uVmVjdG9yMkQgPSBQcm90b24uVmVjdG9yID0gVmVjdG9yMkQ7XG5Qcm90b24uUG9sYXIyRCA9IFByb3Rvbi5Qb2xhciA9IFBvbGFyMkQ7XG5Qcm90b24uQXJyYXlTcGFuID0gQXJyYXlTcGFuO1xuUHJvdG9uLlJlY3RhbmdsZSA9IFJlY3RhbmdsZTtcblByb3Rvbi5SYXRlID0gUmF0ZTtcblByb3Rvbi5lYXNlID0gZWFzZTtcblByb3Rvbi5TcGFuID0gU3BhbjtcblByb3Rvbi5NYXQzID0gTWF0MztcblByb3Rvbi5nZXRTcGFuID0gKGEsIGIsIGNlbnRlcikgPT4gbmV3IFNwYW4oYSwgYiwgY2VudGVyKTtcblByb3Rvbi5jcmVhdGVBcnJheVNwYW4gPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuO1xuXG5Qcm90b24uSW5pdGlhbGl6ZSA9IFByb3Rvbi5Jbml0ID0gSW5pdGlhbGl6ZTtcblByb3Rvbi5MaWZlID0gUHJvdG9uLkwgPSBMaWZlO1xuUHJvdG9uLlBvc2l0aW9uID0gUHJvdG9uLlAgPSBQb3NpdGlvbjtcblByb3Rvbi5WZWxvY2l0eSA9IFByb3Rvbi5WID0gVmVsb2NpdHk7XG5Qcm90b24uTWFzcyA9IFByb3Rvbi5NID0gTWFzcztcblByb3Rvbi5SYWRpdXMgPSBQcm90b24uUiA9IFJhZGl1cztcblByb3Rvbi5Cb2R5ID0gUHJvdG9uLkIgPSBCb2R5O1xuXG5Qcm90b24uQmVoYXZpb3VyID0gQmVoYXZpb3VyO1xuUHJvdG9uLkZvcmNlID0gUHJvdG9uLkYgPSBGb3JjZTtcblByb3Rvbi5BdHRyYWN0aW9uID0gUHJvdG9uLkEgPSBBdHRyYWN0aW9uO1xuUHJvdG9uLlJhbmRvbURyaWZ0ID0gUHJvdG9uLlJEID0gUmFuZG9tRHJpZnQ7XG5Qcm90b24uR3Jhdml0eSA9IFByb3Rvbi5HID0gR3Jhdml0eTtcblByb3Rvbi5Db2xsaXNpb24gPSBDb2xsaXNpb247XG5Qcm90b24uQ3Jvc3Nab25lID0gQ3Jvc3Nab25lO1xuUHJvdG9uLkFscGhhID0gQWxwaGE7XG5Qcm90b24uU2NhbGUgPSBQcm90b24uUyA9IFNjYWxlO1xuUHJvdG9uLlJvdGF0ZSA9IFJvdGF0ZTtcblByb3Rvbi5Db2xvciA9IENvbG9yO1xuUHJvdG9uLlJlcHVsc2lvbiA9IFJlcHVsc2lvbjtcblByb3Rvbi5DeWNsb25lID0gQ3ljbG9uZTtcblByb3Rvbi5HcmF2aXR5V2VsbCA9IEdyYXZpdHlXZWxsO1xuXG5Qcm90b24uRW1pdHRlciA9IEVtaXR0ZXI7XG5Qcm90b24uQmVoYXZpb3VyRW1pdHRlciA9IEJlaGF2aW91ckVtaXR0ZXI7XG5Qcm90b24uRm9sbG93RW1pdHRlciA9IEZvbGxvd0VtaXR0ZXI7XG5cblByb3Rvbi5ab25lID0gWm9uZTtcblByb3Rvbi5MaW5lWm9uZSA9IExpbmVab25lO1xuUHJvdG9uLkNpcmNsZVpvbmUgPSBDaXJjbGVab25lO1xuUHJvdG9uLlBvaW50Wm9uZSA9IFBvaW50Wm9uZTtcblByb3Rvbi5SZWN0Wm9uZSA9IFJlY3Rab25lO1xuUHJvdG9uLkltYWdlWm9uZSA9IEltYWdlWm9uZTtcblxuUHJvdG9uLkNhbnZhc1JlbmRlcmVyID0gQ2FudmFzUmVuZGVyZXI7XG5Qcm90b24uRG9tUmVuZGVyZXIgPSBEb21SZW5kZXJlcjtcblByb3Rvbi5FYXNlbFJlbmRlcmVyID0gRWFzZWxSZW5kZXJlcjtcblByb3Rvbi5QaXhpUmVuZGVyZXIgPSBQaXhpUmVuZGVyZXI7XG5Qcm90b24uUGl4ZWxSZW5kZXJlciA9IFBpeGVsUmVuZGVyZXI7XG5Qcm90b24uV2ViR0xSZW5kZXJlciA9IFByb3Rvbi5XZWJHbFJlbmRlcmVyID0gV2ViR0xSZW5kZXJlcjtcblByb3Rvbi5DdXN0b21SZW5kZXJlciA9IEN1c3RvbVJlbmRlcmVyO1xuXG5Qcm90b24uRGVidWcgPSBEZWJ1ZztcblV0aWwuYXNzaWduKFByb3RvbiwgZWFzZSk7XG5cbi8vIGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgUHJvdG9uO1xuZXhwb3J0IHtcbiAgUGFydGljbGUsXG4gIFBvb2wsXG4gIFV0aWwsXG4gIENvbG9yVXRpbCxcbiAgTWF0aFV0aWwsXG4gIFZlY3RvcjJELFxuICBQb2xhcjJELFxuICBNYXQzLFxuICBTcGFuLFxuICBBcnJheVNwYW4sXG4gIFJlY3RhbmdsZSxcbiAgZWFzZSxcbiAgUmF0ZSxcbiAgSW5pdGlhbGl6ZSxcbiAgTGlmZSxcbiAgUG9zaXRpb24sXG4gIFZlbG9jaXR5LFxuICBNYXNzLFxuICBSYWRpdXMsXG4gIEJvZHksXG4gIEJlaGF2aW91cixcbiAgRm9yY2UsXG4gIEF0dHJhY3Rpb24sXG4gIFJhbmRvbURyaWZ0LFxuICBHcmF2aXR5LFxuICBDb2xsaXNpb24sXG4gIENyb3NzWm9uZSxcbiAgQWxwaGEsXG4gIFNjYWxlLFxuICBSb3RhdGUsXG4gIENvbG9yLFxuICBDeWNsb25lLFxuICBSZXB1bHNpb24sXG4gIEdyYXZpdHlXZWxsLFxuICBFbWl0dGVyLFxuICBCZWhhdmlvdXJFbWl0dGVyLFxuICBGb2xsb3dFbWl0dGVyLFxuICBDYW52YXNSZW5kZXJlcixcbiAgRG9tUmVuZGVyZXIsXG4gIEVhc2VsUmVuZGVyZXIsXG4gIFBpeGVsUmVuZGVyZXIsXG4gIFBpeGlSZW5kZXJlcixcbiAgV2ViR0xSZW5kZXJlcixcbiAgQ3VzdG9tUmVuZGVyZXIsXG4gIFpvbmUsXG4gIExpbmVab25lLFxuICBDaXJjbGVab25lLFxuICBQb2ludFpvbmUsXG4gIFJlY3Rab25lLFxuICBJbWFnZVpvbmUsXG4gIERlYnVnXG59O1xuIl0sIm5hbWVzIjpbImlwb3QiLCJsZW5ndGgiLCJuaHBvdCIsImkiLCJtYWtlVHJhbnNsYXRpb24iLCJ0eCIsInR5IiwibWFrZVJvdGF0aW9uIiwiYW5nbGVJblJhZGlhbnMiLCJjIiwiTWF0aCIsImNvcyIsInMiLCJzaW4iLCJtYWtlU2NhbGUiLCJzeCIsInN5IiwibWF0cml4TXVsdGlwbHkiLCJhIiwiYiIsImEwMCIsImEwMSIsImEwMiIsImExMCIsImExMSIsImExMiIsImEyMCIsImEyMSIsImEyMiIsImIwMCIsImIwMSIsImIwMiIsImIxMCIsImIxMSIsImIxMiIsImIyMCIsImIyMSIsImIyMiIsImNyZWF0ZUNhbnZhcyIsImlkIiwid2lkdGgiLCJoZWlnaHQiLCJwb3NpdGlvbiIsImRvbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwib3BhY2l0eSIsInRyYW5zZm9ybSIsImNyZWF0ZURpdiIsInJlc2l6ZSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJkaXYiLCJ4IiwieSIsInNjYWxlIiwicm90YXRlIiwid2lsbENoYW5nZSIsImNzczMiLCJ0cmFuc2Zvcm0zZCIsImtleSIsInZhbCIsImJrZXkiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImltZ3NDYWNoZSIsImNhbnZhc0NhY2hlIiwiY2FudmFzSWQiLCJnZXRJbWFnZURhdGEiLCJjb250ZXh0IiwiaW1hZ2UiLCJyZWN0IiwiZHJhd0ltYWdlIiwiaW1hZ2VkYXRhIiwiY2xlYXJSZWN0IiwiZ2V0SW1nRnJvbUNhY2hlIiwiaW1nIiwiY2FsbGJhY2siLCJwYXJhbSIsInNyYyIsIkltYWdlIiwib25sb2FkIiwiZSIsInRhcmdldCIsImdldENhbnZhc0Zyb21DYWNoZSIsIldlYkdMVXRpbCIsImNhbnZhcyIsIkRvbVV0aWwiLCJnZXRDb250ZXh0IiwiaW5pdFZhbHVlIiwidmFsdWUiLCJkZWZhdWx0cyIsInVuZGVmaW5lZCIsImlzQXJyYXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJlbXB0eUFycmF5IiwiYXJyIiwidG9BcnJheSIsInNsaWNlQXJyYXkiLCJhcnIxIiwiaW5kZXgiLCJhcnIyIiwicHVzaCIsImdldFJhbmRGcm9tQXJyYXkiLCJmbG9vciIsInJhbmRvbSIsImVtcHR5T2JqZWN0Iiwib2JqIiwiaWdub3JlIiwiaW5kZXhPZiIsImNsYXNzQXBwbHkiLCJjb25zdHJ1Y3RvciIsImFyZ3MiLCJGYWN0b3J5RnVuYyIsImJpbmQiLCJhcHBseSIsImNvbmNhdCIsIkltZ1V0aWwiLCJkZXN0cm95QWxsIiwiZGVzdHJveSIsImFzc2lnbiIsInNvdXJjZSIsImhhc093blByb3BlcnR5IiwiaWRzTWFwIiwiUHVpZCIsIl9pbmRleCIsIl9jYWNoZSIsInR5cGUiLCJnZXRJZCIsInVpZCIsImdldElkRnJvbUNhY2hlIiwiaXNCb2R5IiwiaXNJbm5lciIsImdldFRhcmdldCIsIlBvb2wiLCJudW0iLCJ0b3RhbCIsImNhY2hlIiwiX3Byb3RvIiwiZ2V0IiwicGFyYW1zIiwicCIsIl9fcHVpZCIsInBvcCIsImNyZWF0ZU9yQ2xvbmUiLCJleHBpcmUiLCJnZXRDYWNoZSIsImNyZWF0ZSIsIlV0aWwiLCJjbG9uZSIsImdldENvdW50IiwiY291bnQiLCJTdGF0cyIsInByb3RvbiIsImNvbnRhaW5lciIsImVtaXR0ZXJJbmRleCIsInJlbmRlcmVySW5kZXgiLCJ1cGRhdGUiLCJib2R5IiwiYWRkIiwiZW1pdHRlciIsImdldEVtaXR0ZXIiLCJyZW5kZXJlciIsImdldFJlbmRlcmVyIiwic3RyIiwiZW1pdHRlcnMiLCJlbWl0U3BlZWQiLCJnZXRFbWl0dGVyUG9zIiwiaW5pdGlhbGl6ZXMiLCJjb25jYXRBcnIiLCJiZWhhdmlvdXJzIiwibmFtZSIsImdldENyZWF0ZWROdW1iZXIiLCJwb29sIiwiaW5uZXJIVE1MIiwiX3RoaXMiLCJjc3NUZXh0Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZyIsImNvbG9yIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwicmVuZGVyZXJzIiwicmVzdWx0IiwiY3Bvb2wiLCJyb3VuZCIsInJlbW92ZUNoaWxkIiwiRXZlbnREaXNwYXRjaGVyIiwiX2xpc3RlbmVycyIsImRpc3BhdGNoRXZlbnQiLCJoYXNFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzIiwibGlzdGVuZXIiLCJzcGxpY2UiLCJsaXN0ZW5lcnMiLCJoYW5kbGVyIiwiUEkiLCJJTkZJTklUWSIsIkluZmluaXR5IiwiTWF0aFV0aWwiLCJQSXgyIiwiUElfMiIsIlBJXzE4MCIsIk4xODBfUEkiLCJpc0luZmluaXR5IiwicmFuZG9tQVRvQiIsImlzSW50IiwicmFuZG9tRmxvYXRpbmciLCJjZW50ZXIiLCJmIiwicmFuZG9tQ29sb3IiLCJzbGljZSIsInJhbmRvbVpvbmUiLCJkaXNwbGF5IiwiayIsImRpZ2l0cyIsInBvdyIsImRlZ3JlZVRyYW5zZm9ybSIsInRvQ29sb3IxNiIsIkludGVncmF0aW9uIiwiY2FsY3VsYXRlIiwicGFydGljbGVzIiwidGltZSIsImRhbXBpbmciLCJldWxlckludGVncmF0ZSIsInBhcnRpY2xlIiwic2xlZXAiLCJvbGQiLCJjb3B5IiwidiIsIm11bHRpcGx5U2NhbGFyIiwibWFzcyIsImNsZWFyIiwiUHJvdG9uIiwiaW50ZWdyYXRpb25UeXBlIiwibm93IiwidGhlbiIsImVsYXBzZWQiLCJzdGF0cyIsIkVVTEVSIiwiaW50ZWdyYXRvciIsIl9mcHMiLCJfaW50ZXJ2YWwiLCJERUZBVUxUX0lOVEVSVkFMIiwiYWRkUmVuZGVyZXIiLCJyZW5kZXIiLCJpbml0IiwicmVtb3ZlUmVuZGVyZXIiLCJyZW1vdmUiLCJhZGRFbWl0dGVyIiwicGFyZW50IiwiRU1JVFRFUl9BRERFRCIsInJlbW92ZUVtaXR0ZXIiLCJFTUlUVEVSX1JFTU9WRUQiLCJQUk9UT05fVVBEQVRFIiwiVVNFX0NMT0NLIiwiRGF0ZSIsImdldFRpbWUiLCJhbWVuZENoYW5nZVRhYnNCdWciLCJlbWl0dGVyc1VwZGF0ZSIsIlBST1RPTl9VUERBVEVfQUZURVIiLCJnZXRBbGxQYXJ0aWNsZXMiLCJkZXN0cm95QWxsRW1pdHRlcnMiLCJkZXN0cm95T3RoZXIiLCJzZXRUaW1lb3V0IiwiX2NyZWF0ZUNsYXNzIiwic2V0IiwiZnBzIiwiTUVBU1VSRSIsIlJLMiIsIlBBUlRJQ0xFX0NSRUFURUQiLCJQQVJUSUNMRV9VUERBVEUiLCJQQVJUSUNMRV9TTEVFUCIsIlBBUlRJQ0xFX0RFQUQiLCJSZ2IiLCJyIiwiZyIsInJlc2V0IiwiU3BhbiIsImdldFZhbHVlIiwic2V0U3BhblZhbHVlIiwiZ2V0U3BhblZhbHVlIiwicGFuIiwiaGFzUHJvcCIsInNldFByb3AiLCJwcm9wcyIsInByb3AiLCJzZXRWZWN0b3JWYWwiLCJjb25mIiwiZWFzZUxpbmVhciIsImVhc2VJblF1YWQiLCJlYXNlT3V0UXVhZCIsImVhc2VJbk91dFF1YWQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblNpbmUiLCJlYXNlT3V0U2luZSIsImVhc2VJbk91dFNpbmUiLCJlYXNlSW5FeHBvIiwiZWFzZU91dEV4cG8iLCJlYXNlSW5PdXRFeHBvIiwiZWFzZUluQ2lyYyIsInNxcnQiLCJlYXNlT3V0Q2lyYyIsImVhc2VJbk91dENpcmMiLCJlYXNlSW5CYWNrIiwiZWFzZU91dEJhY2siLCJlYXNlSW5PdXRCYWNrIiwiZ2V0RWFzaW5nIiwiZWFzZSIsIlZlY3RvcjJEIiwic2V0WCIsInNldFkiLCJnZXRHcmFkaWVudCIsImF0YW4yIiwidyIsImFkZFZlY3RvcnMiLCJhZGRYWSIsInN1YiIsInN1YlZlY3RvcnMiLCJkaXZpZGVTY2FsYXIiLCJuZWdhdGUiLCJkb3QiLCJsZW5ndGhTcSIsIm5vcm1hbGl6ZSIsImRpc3RhbmNlVG8iLCJkaXN0YW5jZVRvU3F1YXJlZCIsInRoYSIsImR4IiwiZHkiLCJsZXJwIiwiYWxwaGEiLCJlcXVhbHMiLCJQYXJ0aWNsZSIsImRhdGEiLCJyZ2IiLCJQcm9wVXRpbCIsImdldERpcmVjdGlvbiIsImxpZmUiLCJhZ2UiLCJkZWFkIiwic3ByaXRlIiwiZW5lcmd5IiwicmFkaXVzIiwicm90YXRpb24iLCJlYXNpbmciLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwiYXBwbHlCZWhhdmlvdXJzIiwibWF4IiwiYXBwbHlCZWhhdmlvdXIiLCJhZGRCZWhhdmlvdXIiLCJiZWhhdmlvdXIiLCJwYXJlbnRzIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJoZXhUb1JnYiIsImgiLCJoZXgxNiIsInN1YnN0cmluZyIsInBhcnNlSW50IiwicmdiVG9IZXgiLCJyYmciLCJnZXRIZXgxNkZyb21QYXJ0aWNsZSIsIk51bWJlciIsIlBvbGFyMkQiLCJhYnMiLCJzZXRSIiwic2V0VGhhIiwidG9WZWN0b3IiLCJnZXRYIiwiZ2V0WSIsIk1hdDMiLCJtYXQzIiwibWF0IiwiRmxvYXQzMkFycmF5IiwibWF0MSIsIm1hdDIiLCJtdWx0aXBseSIsImludmVyc2UiLCJkIiwibXVsdGlwbHlWZWMyIiwibSIsInZlYyIsIkFycmF5U3BhbiIsIl9TcGFuIiwiX2luaGVyaXRzTG9vc2UiLCJfYXJyIiwiY3JlYXRlQXJyYXlTcGFuIiwiUmVjdGFuZ2xlIiwiYm90dG9tIiwicmlnaHQiLCJjb250YWlucyIsIlJhdGUiLCJudW1wYW4iLCJ0aW1lcGFuIiwibnVtUGFuIiwidGltZVBhbiIsInN0YXJ0VGltZSIsIm5leHRUaW1lIiwiSW5pdGlhbGl6ZSIsIkxpZmUiLCJfSW5pdGlhbGl6ZSIsImxpZmVQYW4iLCJab25lIiwidmVjdG9yIiwiY3Jvc3NUeXBlIiwiYWxlcnQiLCJnZXRQb3NpdGlvbiIsImNyb3NzaW5nIiwiUG9pbnRab25lIiwiX1pvbmUiLCJjb25zb2xlIiwiZXJyb3IiLCJQb3NpdGlvbiIsInpvbmUiLCJWZWxvY2l0eSIsInJwYW4iLCJ0aGFwYW4iLCJyUGFuIiwidGhhUGFuIiwibm9ybWFsaXplVmVsb2NpdHkiLCJ2ciIsInBvbGFyMmQiLCJNYXNzIiwibWFzc1BhbiIsIlJhZGl1cyIsIm9sZFJhZGl1cyIsIkJvZHkiLCJpbWFnZVRhcmdldCIsImlubmVyIiwiQmVoYXZpb3VyIiwibm9ybWFsaXplRm9yY2UiLCJmb3JjZSIsIm5vcm1hbGl6ZVZhbHVlIiwiRm9yY2UiLCJfQmVoYXZpb3VyIiwiZngiLCJmeSIsIkF0dHJhY3Rpb24iLCJ0YXJnZXRQb3NpdGlvbiIsInJhZGl1c1NxIiwiYXR0cmFjdGlvbkZvcmNlIiwiUmFuZG9tRHJpZnQiLCJkcmlmdFgiLCJkcmlmdFkiLCJkZWxheSIsInBhbkZvY2UiLCJHcmF2aXR5IiwiX0ZvcmNlIiwiQ29sbGlzaW9uIiwibmV3UG9vbCIsImNvbGxpc2lvblBvb2wiLCJkZWx0YSIsIm90aGVyUGFydGljbGUiLCJvdmVybGFwIiwidG90YWxNYXNzIiwiYXZlcmFnZU1hc3MxIiwiYXZlcmFnZU1hc3MyIiwiZGlzdGFuY2UiLCJDcm9zc1pvbmUiLCJBbHBoYSIsInNhbWUiLCJhbHBoYUEiLCJhbHBoYUIiLCJTY2FsZSIsInNjYWxlQSIsInNjYWxlQiIsIlJvdGF0ZSIsImluZmx1ZW5jZSIsInJvdGF0aW9uQSIsInJvdGF0aW9uQiIsIkNvbG9yIiwiY29sb3JBIiwiQ29sb3JVdGlsIiwiY29sb3JCIiwiQ0hBTkdJTkciLCJDeWNsb25lIiwiYW5nbGUiLCJzZXRBbmdsZUFuZEZvcmNlIiwic3BhbiIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwiY2FuZ2xlIiwiY3ljbG9uZSIsImdyYWRpZW50IiwiUmVwdWxzaW9uIiwiX0F0dHJhY3Rpb24iLCJHcmF2aXR5V2VsbCIsImNlbnRlclBvaW50IiwiZGlzdGFuY2VWZWMiLCJkaXN0YW5jZVNxIiwiZmFjdG9yIiwiYmluZEVtaXR0ZXIiLCJFbWl0dGVyIiwiX1BhcnRpY2xlIiwiZW1pdFRpbWUiLCJ0b3RhbFRpbWUiLCJyYXRlIiwiZW1pdCIsInN0b3BlZCIsImlzTmFOIiwic3RvcCIsInByZUVtaXQiLCJvbGRTdG9wZWQiLCJvbGRFbWl0VGltZSIsIm9sZFRvdGFsVGltZSIsInN0ZXAiLCJyZW1vdmVBbGxQYXJ0aWNsZXMiLCJhZGRTZWxmSW5pdGlhbGl6ZSIsImFkZEluaXRpYWxpemUiLCJfbGVuIiwiYXJndW1lbnRzIiwicmVzdCIsIkFycmF5IiwiX2tleSIsInJlbW92ZUluaXRpYWxpemUiLCJpbml0aWFsaXplciIsInJlbW92ZUFsbEluaXRpYWxpemVycyIsIl9sZW4yIiwiX2tleTIiLCJlbWl0dGluZyIsImludGVncmF0ZSIsImRpc3BhdGNoIiwiZXZlbnQiLCJiaW5kRXZlbnQiLCJjcmVhdGVQYXJ0aWNsZSIsInNldHVwUGFydGljbGUiLCJJbml0aWFsaXplVXRpbCIsIkJlaGF2aW91ckVtaXR0ZXIiLCJfRW1pdHRlciIsInNlbGZCZWhhdmlvdXJzIiwiYWRkU2VsZkJlaGF2aW91ciIsInJlbW92ZVNlbGZCZWhhdmlvdXIiLCJGb2xsb3dFbWl0dGVyIiwibW91c2VUYXJnZXQiLCJ3aW5kb3ciLCJfYWxsb3dFbWl0dGluZyIsImluaXRFdmVudEhhbmRsZXIiLCJfdGhpczIiLCJtb3VzZW1vdmVIYW5kbGVyIiwibW91c2Vtb3ZlIiwibW91c2Vkb3duSGFuZGxlciIsIm1vdXNlZG93biIsIm1vdXNldXBIYW5kbGVyIiwibW91c2V1cCIsImxheWVyWCIsImxheWVyWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiaXNJbWFnZSIsIl9faXNJbWFnZSIsInRhZ05hbWUiLCJub2RlTmFtZSIsImlzU3RyaW5nIiwiQmFzZVJlbmRlcmVyIiwiZWxlbWVudCIsInN0cm9rZSIsImNpcmNsZUNvbmYiLCJpc0NpcmNsZSIsInNldFN0cm9rZSIsInRoaW5rbmVzcyIsIl9wcm90b25VcGRhdGVIYW5kbGVyIiwib25Qcm90b25VcGRhdGUiLCJfcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyIiwib25Qcm90b25VcGRhdGVBZnRlciIsIl9lbWl0dGVyQWRkZWRIYW5kbGVyIiwib25FbWl0dGVyQWRkZWQiLCJfZW1pdHRlclJlbW92ZWRIYW5kbGVyIiwib25FbWl0dGVyUmVtb3ZlZCIsIl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyIiwib25QYXJ0aWNsZUNyZWF0ZWQiLCJfcGFydGljbGVVcGRhdGVIYW5kbGVyIiwib25QYXJ0aWNsZVVwZGF0ZSIsIl9wYXJ0aWNsZURlYWRIYW5kbGVyIiwib25QYXJ0aWNsZURlYWQiLCJDYW52YXNSZW5kZXJlciIsIl9CYXNlUmVuZGVyZXIiLCJidWZmZXJDYWNoZSIsImFkZEltZzJCb2R5IiwiVHlwZXMiLCJkcmF3Q2lyY2xlIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYnVmQ29udGV4dCIsImdsb2JhbEFscGhhIiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzYXZlIiwidHJhbnNsYXRlIiwicmVzdG9yZSIsImJlZ2luUGF0aCIsImFyYyIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwiY2xvc2VQYXRoIiwiZmlsbCIsInNpemUiLCJEb21SZW5kZXJlciIsImNyZWF0ZUJvZHkiLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiYm9keVJlYWR5IiwiYmFja2dyb3VuZENvbG9yIiwiY3JlYXRlQ2lyY2xlIiwiY3JlYXRlU3ByaXRlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsInVybCIsImJhY2tncm91bmRJbWFnZSIsIkVhc2VsUmVuZGVyZXIiLCJhZGRDaGlsZCIsInNjYWxlWCIsInNjYWxlWSIsImdyYXBoaWNzIiwicmVnWCIsInJlZ1kiLCJjcmVhdGVqcyIsIkdyYXBoaWNzIiwiYmVnaW5TdHJva2UiLCJiZWdpbkZpbGwiLCJzaGFwZSIsIlNoYXBlIiwiUGl4ZWxSZW5kZXJlciIsInJlY3RhbmdsZSIsImltYWdlRGF0YSIsImNyZWF0ZUltYWdlRGF0YSIsInB1dEltYWdlRGF0YSIsInNldFBpeGVsIiwiUElYSUNsYXNzIiwiUGl4aVJlbmRlcmVyIiwic2V0Q29sb3IiLCJibGVuZE1vZGUiLCJzZXRQSVhJIiwiUElYSSIsIlNwcml0ZSIsImNyZWF0ZUZyb21JbWFnZSIsImZyb20iLCJmcm9tSW1hZ2UiLCJ0aW50IiwiYW5jaG9yIiwiZW5kRmlsbCIsIk1TdGFjayIsIm1hdHMiLCJ0b3AiLCJXZWJHTFJlbmRlcmVyIiwiZ2wiLCJhbnRpYWxpYXMiLCJzdGVuY2lsIiwiZGVwdGgiLCJpbml0VmFyIiwic2V0TWF4UmFkaXVzIiwiaW5pdFNoYWRlcnMiLCJpbml0QnVmZmVycyIsImJsZW5kRXF1YXRpb24iLCJGVU5DX0FERCIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJlbmFibGUiLCJCTEVORCIsInVtYXQiLCJzbWF0IiwibXN0YWNrIiwidmlld3BvcnQiLCJjaXJjbGVDYW52YXNVUkwiLCJnZXRWZXJ0ZXhTaGFkZXIiLCJ2c1NvdXJjZSIsImdldEZyYWdtZW50U2hhZGVyIiwiZnNTb3VyY2UiLCJ0ZXh0dXJlYnVmZmVycyIsIkEiLCJCIiwiZ2V0U2hhZGVyIiwiZnMiLCJzaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwidmVydGV4U2hhZGVyIiwic3Byb2dyYW0iLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJ1c2VQcm9ncmFtIiwidnBhIiwiZ2V0QXR0cmliTG9jYXRpb24iLCJ0Y2EiLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInRNYXRVbmlmb3JtIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwic2FtcGxlclVuaWZvcm0iLCJ1c2VUZXgiLCJ1bmlmb3JtMWkiLCJ2cyIsImlkeCIsInVuaXRJQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiYnVmZmVyRGF0YSIsIlVpbnQxNkFycmF5IiwiU1RBVElDX0RSQVciLCJpZHMiLCJ1bml0STMzIiwic3RyaXBCdWZmZXIiLCJyYWlkdXMiLCJjaXJjbGVDYW52YXNSYWRpdXMiLCJ0b0RhdGFVUkwiLCJkcmF3SW1nMkNhbnZhcyIsIl93IiwiX2giLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX3NjYWxlWCIsIl9zY2FsZVkiLCJjcmVhdGVUZXh0dXJlIiwidGV4dHVyZSIsInZjQnVmZmVyIiwidGNCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTElORUFSIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiTElORUFSX01JUE1BUF9ORUFSRVNUIiwiZ2VuZXJhdGVNaXBtYXAiLCJ0ZXh0dXJlTG9hZGVkIiwidGV4dHVyZVdpZHRoIiwidGV4dHVyZUhlaWdodCIsInRtYXQiLCJpbWF0Iiwib2xkU2NhbGUiLCJ1cGRhdGVNYXRyaXgiLCJ1bmlmb3JtM2YiLCJ1bmlmb3JtTWF0cml4M2Z2IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwiZHJhd0VsZW1lbnRzIiwiVFJJQU5HTEVTIiwiVU5TSUdORURfU0hPUlQiLCJtb3ZlT3JpZ2luTWF0cml4IiwidHJhbnNsYXRpb25NYXRyaXgiLCJhbmdlbCIsInJvdGF0aW9uTWF0cml4Iiwic2NhbGVNYXRyaXgiLCJtYXRyaXgiLCJDdXN0b21SZW5kZXJlciIsIkxpbmVab25lIiwieDEiLCJ5MSIsIngyIiwieTIiLCJkaXJlY3Rpb24iLCJtaW54IiwibWluIiwibWlueSIsIm1heHgiLCJtYXh5IiwieHh5eSIsImdldExlbmd0aCIsIkMiLCJEIiwiZ2V0RGlzdGFuY2UiLCJnZXRTeW1tZXRyaWMiLCJ0aGEyIiwidGhhMSIsIm9sZHgiLCJvbGR5IiwicmFuZ2VPdXQiLCJDaXJjbGVab25lIiwicmFuZG9tUmFkaXVzIiwic2V0Q2VudGVyIiwiUmVjdFpvbmUiLCJJbWFnZVpvbmUiLCJ2ZWN0b3JzIiwic2V0VmVjdG9ycyIsImoiLCJsZW5ndGgxIiwibGVuZ3RoMiIsImdldEJvdW5kIiwiZ2V0Q29sb3IiLCJmdW5jIiwiZ2V0U3R5bGUiLCJkcmF3Wm9uZSIsIm1vdmVUbyIsImxpbmVUbyIsImRyYXdSZWN0IiwiZHJhd0VtaXR0ZXIiLCJWZWN0b3IiLCJQb2xhciIsImdldFNwYW4iLCJJbml0IiwiTCIsIlAiLCJWIiwiTSIsIlIiLCJGIiwiUkQiLCJHIiwiUyIsIldlYkdsUmVuZGVyZXIiLCJEZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWU7RUFDYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0lBQ0VBLElBQUksRUFBQSxTQUFBQSxJQUFDQyxDQUFBQSxNQUFNLEVBQUU7RUFDWCxJQUFBLE9BQU8sQ0FBQ0EsTUFBTSxHQUFJQSxNQUFNLEdBQUcsQ0FBRSxNQUFNLENBQUMsQ0FBQTtLQUNyQztFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7SUFDRUMsS0FBSyxFQUFBLFNBQUFBLEtBQUNELENBQUFBLE1BQU0sRUFBRTtFQUNaLElBQUEsRUFBRUEsTUFBTSxDQUFBO0VBQ1IsSUFBQSxLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsS0FBSyxD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
