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
      this.old = null;
      this.data = null;
      this.behaviours = null;
      this.p = null;
      this.v = null;
      this.a = null;
      this.rgb = null;

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
     * computing life cycle
     *
     * @method calculate
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
      this.calculate(particle, time, index);
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
     */
    ;

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
      if (x < 0 || x > this.element.width || y < 0 || y > this.element.height) return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy91dGlscy9Qcm9wVXRpbC5qcyIsIi4uL3NyYy9tYXRoL2Vhc2UuanMiLCIuLi9zcmMvbWF0aC9WZWN0b3IyRC5qcyIsIi4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIiwiLi4vc3JjL3V0aWxzL0NvbG9yVXRpbC5qcyIsIi4uL3NyYy9tYXRoL1BvbGFyMkQuanMiLCIuLi9zcmMvbWF0aC9NYXQzLmpzIiwiLi4vc3JjL21hdGgvU3Bhbi5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIHNsaWNlQXJyYXkoYXJyMSwgaW5kZXgsIGFycjIpIHtcbiAgICB0aGlzLmVtcHR5QXJyYXkoYXJyMik7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMi5wdXNoKGFycjFbaV0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRSYW5kRnJvbUFycmF5KGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoYXJyLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGVtcHR5T2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW55IG9iamVjdFxuICAgKi9cbiAgZW1wdHlPYmplY3Qob2JqLCBpZ25vcmUgPSBudWxsKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIGNvbnRpbnVlO1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWFrZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBhbmQgYmluZHMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBjbGFzc0FwcGx5XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIEEgY2xhc3MgdG8gbWFrZSBhbiBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBBbnkgYXJyYXkgdG8gYmluZCBpdCB0byB0aGUgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgaW5zdGFuY2Ugb2YgY29uc3RydWN0b3IsIG9wdGlvbmFsbHkgYmluZCB3aXRoIGFyZ3NcbiAgICovXG4gIGNsYXNzQXBwbHkoY29uc3RydWN0b3IsIGFyZ3MgPSBudWxsKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IEZhY3RvcnlGdW5jID0gY29uc3RydWN0b3IuYmluZC5hcHBseShjb25zdHJ1Y3RvciwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IEZhY3RvcnlGdW5jKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICByZXR1cm4gSW1nVXRpbC5nZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpO1xuICB9LFxuXG4gIGRlc3Ryb3lBbGwoYXJyLCBwYXJhbSA9IG51bGwpIHtcbiAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJbaV0uZGVzdHJveShwYXJhbSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBkZWxldGUgYXJyW2ldO1xuICAgIH1cblxuICAgIGFyci5sZW5ndGggPSAwO1xuICB9LFxuXG4gIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgaWRzTWFwID0ge307XG5cbmNvbnN0IFB1aWQgPSB7XG4gIF9pbmRleDogMCxcbiAgX2NhY2hlOiB7fSxcblxuICBpZCh0eXBlKSB7XG4gICAgaWYgKGlkc01hcFt0eXBlXSA9PT0gdW5kZWZpbmVkIHx8IGlkc01hcFt0eXBlXSA9PT0gbnVsbCkgaWRzTWFwW3R5cGVdID0gMDtcbiAgICByZXR1cm4gYCR7dHlwZX1fJHtpZHNNYXBbdHlwZV0rK31gO1xuICB9LFxuXG4gIGdldElkKHRhcmdldCkge1xuICAgIGxldCB1aWQgPSB0aGlzLmdldElkRnJvbUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKHVpZCkgcmV0dXJuIHVpZDtcblxuICAgIHVpZCA9IGBQVUlEXyR7dGhpcy5faW5kZXgrK31gO1xuICAgIHRoaXMuX2NhY2hlW3VpZF0gPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHVpZDtcbiAgfSxcblxuICBnZXRJZEZyb21DYWNoZSh0YXJnZXQpIHtcbiAgICBsZXQgb2JqLCBpZDtcblxuICAgIGZvciAoaWQgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIG9iaiA9IHRoaXMuX2NhY2hlW2lkXTtcblxuICAgICAgaWYgKG9iaiA9PT0gdGFyZ2V0KSByZXR1cm4gaWQ7XG4gICAgICBpZiAodGhpcy5pc0JvZHkob2JqLCB0YXJnZXQpICYmIG9iai5zcmMgPT09IHRhcmdldC5zcmMpIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpc0JvZHkob2JqLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIG9iai5pc0lubmVyICYmIHRhcmdldC5pc0lubmVyO1xuICB9LFxuXG4gIGdldFRhcmdldCh1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbdWlkXTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVpZDtcbiIsIi8qKlxuICogUG9vbCBpcyB0aGUgY2FjaGUgcG9vbCBvZiB0aGUgcHJvdG9uIGVuZ2luZSwgaXQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gKlxuICogZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpXG4gKiAgQ2xhc3NcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICogICAgdGFyZ2V0Ll9fcHVpZCA9IHVpZFxuICpcbiAqICBib2R5XG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqXG4gKlxuICogZXhwaXJlKHRhcmdldClcbiAqICBjYWNoZVt0YXJnZXQuX19wdWlkXSBwdXNoIHRhcmdldFxuICpcbiAqL1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBvZiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3RhbFxuICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FjaGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKSB7XG4gICAgbGV0IHA7XG4gICAgdWlkID0gdWlkIHx8IHRhcmdldC5fX3B1aWQgfHwgUHVpZC5nZXRJZCh0YXJnZXQpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVbdWlkXSAmJiB0aGlzLmNhY2hlW3VpZF0ubGVuZ3RoID4gMCkge1xuICAgICAgcCA9IHRoaXMuY2FjaGVbdWlkXS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHRoaXMuY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcC5fX3B1aWQgPSB0YXJnZXQuX19wdWlkIHx8IHVpZDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGV4cGlyZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZSh0YXJnZXQuX19wdWlkKS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldCBhbnkgT2JqZWN0IG9yIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpIHtcbiAgICB0aGlzLnRvdGFsKys7XG5cbiAgICBpZiAodGhpcy5jcmVhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBVdGlsLmNsYXNzQXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiAtIHdoYXQgaXMgaW4gdGhlIGNhY2hlP1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSBjb3VudCArPSB0aGlzLmNhY2hlW2lkXS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveWVzIGFsbCBpdGVtcyBmcm9tIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZVtpZF0ubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q2FjaGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdWlkIHRoZSB1bmlxdWUgaWRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2FjaGUodWlkID0gXCJkZWZhdWx0XCIpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVbdWlkXSkgdGhpcy5jYWNoZVt1aWRdID0gW107XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdWlkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMge1xuICBjb25zdHJ1Y3Rvcihwcm90b24pIHtcbiAgICB0aGlzLnByb3RvbiA9IHByb3RvbjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50eXBlID0gMTtcblxuICAgIHRoaXMuZW1pdHRlckluZGV4ID0gMDtcbiAgICB0aGlzLnJlbmRlcmVySW5kZXggPSAwO1xuICB9XG5cbiAgdXBkYXRlKHN0eWxlLCBib2R5KSB7XG4gICAgdGhpcy5hZGQoc3R5bGUsIGJvZHkpO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZ2V0RW1pdHRlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgIGxldCBzdHIgPSBcIlwiO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3RyICs9IFwiZW1pdHRlcjpcIiArIHRoaXMucHJvdG9uLmVtaXR0ZXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiZW0gc3BlZWQ6XCIgKyBlbWl0dGVyLmVtaXRTcGVlZCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwicG9zOlwiICsgdGhpcy5nZXRFbWl0dGVyUG9zKGVtaXR0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiaW5pdGlhbGl6ZXM6XCIgKyBlbWl0dGVyLmluaXRpYWxpemVzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcilcbiAgICAgICAgICBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuaW5pdGlhbGl6ZXMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiYmVoYXZpb3VyczpcIiArIGVtaXR0ZXIuYmVoYXZpb3Vycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5iZWhhdmlvdXJzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gcmVuZGVyZXIubmFtZSArIFwiPGJyPlwiO1xuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSBcImJvZHk6XCIgKyB0aGlzLmdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpICsgXCI8YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHIgKz0gXCJwYXJ0aWNsZXM6XCIgKyB0aGlzLnByb3Rvbi5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInBvb2w6XCIgKyB0aGlzLnByb3Rvbi5wb29sLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwidG90YWw6XCIgKyB0aGlzLnByb3Rvbi5wb29sLnRvdGFsO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHN0cjtcbiAgfVxuXG4gIGFkZChzdHlsZSwgYm9keSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7XCIsXG4gICAgICAgIFwib3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMDtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XCIsXG4gICAgICAgIFwid2lkdGg6MTIwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZC1jb2xvcjojMDAyO2NvbG9yOiMwZmY7XCJcbiAgICAgIF0uam9pbihcIlwiKTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICB0aGlzLnR5cGUrKztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID4gNCkgdGhpcy50eXBlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIGxldCBiZywgY29sb3I7XG4gICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBiZyA9IFwiIzIwMVwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjZjA4XCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGJnID0gXCIjMDIwXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZjBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJnID0gXCIjMDAyXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZmZcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gYmc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImNvbG9yXCJdID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBib2R5ID0gYm9keSB8fCB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLmVtaXR0ZXJzW3RoaXMuZW1pdHRlckluZGV4XTtcbiAgfVxuXG4gIGdldFJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5yZW5kZXJlcnNbdGhpcy5yZW5kZXJlckluZGV4XTtcbiAgfVxuXG4gIGNvbmNhdEFycihhcnIpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBpZiAoIWFyciB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gKGFycltpXS5uYW1lIHx8IFwiXCIpLnN1YnN0cigwLCAxKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSB7XG4gICAgcmV0dXJuIHJlbmRlcmVyLnBvb2wudG90YWwgfHwgKHJlbmRlcmVyLmNwb29sICYmIHJlbmRlcmVyLmNwb29sLnRvdGFsKSB8fCAwO1xuICB9XG5cbiAgZ2V0RW1pdHRlclBvcyhlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoZS5wLngpICsgXCIsXCIgKyBNYXRoLnJvdW5kKGUucC55KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdG9uID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qXG4gKiBFdmVudERpc3BhdGNoZXJcbiAqIFRoaXMgY29kZSByZWZlcmVuY2Ugc2luY2UgaHR0cDovL2NyZWF0ZWpzLmNvbS8uXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGJpbmQodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuICAgIHRhcmdldC5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIGNvbnN0IGFyciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIGZhc3RlciBjaGVja3MuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIGVsc2UgaWYgKHRoaXMuX2xpc3RlbmVycykgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG5cbiAgICBpZiAodHlwZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIGxldCBhcnIgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgICBpZiAoIWFycikgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgLy8gYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAvLyB0byBhdm9pZCBpc3N1ZXMgd2l0aCBpdGVtcyBiZWluZyByZW1vdmVkIG9yIGFkZGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcblxuICAgICAgbGV0IGhhbmRsZXI7XG4gICAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGhhbmRsZXIgPSBhcnJbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBoYW5kbGVyKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfVxuXG4gIGhhc0V2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiIsImNvbnN0IFBJID0gMy4xNDE1OTI2O1xuY29uc3QgSU5GSU5JVFkgPSBJbmZpbml0eTtcblxuY29uc3QgTWF0aFV0aWwgPSB7XG4gIFBJOiBQSSxcbiAgUEl4MjogUEkgKiAyLFxuICBQSV8yOiBQSSAvIDIsXG4gIFBJXzE4MDogUEkgLyAxODAsXG4gIE4xODBfUEk6IDE4MCAvIFBJLFxuICBJbmZpbml0eTogLTk5OSxcblxuICBpc0luZmluaXR5KG51bSkge1xuICAgIHJldHVybiBudW0gPT09IHRoaXMuSW5maW5pdHkgfHwgbnVtID09PSBJTkZJTklUWTtcbiAgfSxcblxuICByYW5kb21BVG9CKGEsIGIsIGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzSW50KSByZXR1cm4gYSArIE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpO1xuICAgIGVsc2UgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpID4+IDApICsgYTtcbiAgfSxcblxuICByYW5kb21GbG9hdGluZyhjZW50ZXIsIGYsIGlzSW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tQVRvQihjZW50ZXIgLSBmLCBjZW50ZXIgKyBmLCBpc0ludCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICgoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCkgPDwgMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XG4gIH0sXG5cbiAgcmFuZG9tWm9uZShkaXNwbGF5KSB7fSxcblxuICBmbG9vcihudW0sIGsgPSA0KSB7XG4gICAgY29uc3QgZGlnaXRzID0gTWF0aC5wb3coMTAsIGspO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRpZ2l0cykgLyBkaWdpdHM7XG4gIH0sXG5cbiAgZGVncmVlVHJhbnNmb3JtKGEpIHtcbiAgICByZXR1cm4gKGEgKiBQSSkgLyAxODA7XG4gIH0sXG5cbiAgdG9Db2xvcjE2KG51bSkge1xuICAgIHJldHVybiBgIyR7bnVtLnRvU3RyaW5nKDE2KX1gO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVncmF0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBjYWxjdWxhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgdGhpcy5ldWxlckludGVncmF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpO1xuICB9XG5cbiAgLy8gRXVsZXIgSW50ZWdyYXRlXG4gIC8vIGh0dHBzOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4gIGV1bGVySW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zbGVlcCkge1xuICAgICAgcGFydGljbGUub2xkLnAuY29weShwYXJ0aWNsZS5wKTtcbiAgICAgIHBhcnRpY2xlLm9sZC52LmNvcHkocGFydGljbGUudik7XG5cbiAgICAgIHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIoMSAvIHBhcnRpY2xlLm1hc3MpO1xuICAgICAgcGFydGljbGUudi5hZGQocGFydGljbGUuYS5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChwYXJ0aWNsZS5vbGQudi5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG5cbiAgICAgIGlmIChkYW1waW5nKSBwYXJ0aWNsZS52Lm11bHRpcGx5U2NhbGFyKGRhbXBpbmcpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9vbCBmcm9tIFwiLi9Qb29sXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFN0YXRzIGZyb20gXCIuLi9kZWJ1Zy9TdGF0c1wiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgSW50ZWdyYXRpb24gZnJvbSBcIi4uL21hdGgvSW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdG9uIHtcbiAgc3RhdGljIFVTRV9DTE9DSyA9IGZhbHNlO1xuXG4gIC8vIG1lYXN1cmUgMToxMDBcbiAgc3RhdGljIE1FQVNVUkUgPSAxMDA7XG4gIHN0YXRpYyBFVUxFUiA9IFwiZXVsZXJcIjtcbiAgc3RhdGljIFJLMiA9IFwicnVuZ2Uta3V0dGEyXCI7XG5cbiAgLy8gZXZlbnQgbmFtZVxuICBzdGF0aWMgUEFSVElDTEVfQ1JFQVRFRCA9IFwiUEFSVElDTEVfQ1JFQVRFRFwiO1xuICBzdGF0aWMgUEFSVElDTEVfVVBEQVRFID0gXCJQQVJUSUNMRV9VUERBVEVcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1NMRUVQID0gXCJQQVJUSUNMRV9TTEVFUFwiO1xuICBzdGF0aWMgUEFSVElDTEVfREVBRCA9IFwiUEFSVElDTEVfREVBRFwiO1xuXG4gIHN0YXRpYyBFTUlUVEVSX0FEREVEID0gXCJFTUlUVEVSX0FEREVEXCI7XG4gIHN0YXRpYyBFTUlUVEVSX1JFTU9WRUQgPSBcIkVNSVRURVJfUkVNT1ZFRFwiO1xuXG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFID0gXCJQUk9UT05fVVBEQVRFXCI7XG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFX0FGVEVSID0gXCJQUk9UT05fVVBEQVRFX0FGVEVSXCI7XG4gIHN0YXRpYyBERUZBVUxUX0lOVEVSVkFMID0gMC4wMTY3O1xuXG4gIHN0YXRpYyBhbWVuZENoYW5nZVRhYnNCdWcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdG8gYWRkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvciBQcm90b25cbiAgICpcbiAgICogQHRvZG8gcHJvUGFydGljbGVDb3VudCBpcyBub3QgaW4gdXNlXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb24gb2YgdGhlIHNpbmdsZSBwcm9wZXJ0aWVzIGFuZCBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcHJvUGFydGljbGVDb3VudF0gbm90IGluIHVzZT9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGVtaXR0ZXJzICAgQWxsIGFkZGVkIGVtaXR0ZXJcbiAgICogQHByb3BlcnR5IHtBcnJheX0gcmVuZGVyZXJzICBBbGwgYWRkZWQgcmVuZGVyZXJcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgICAgICBUaGUgYWN0aXZlIHRpbWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9sZHRpbWUgICBUaGUgb2xkIHRpbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVncmF0aW9uVHlwZSkge1xuICAgIHRoaXMuZW1pdHRlcnMgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVycyA9IFtdO1xuXG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5vdyA9IDA7XG4gICAgdGhpcy50aGVuID0gMDtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cyh0aGlzKTtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCg4MCk7XG5cbiAgICB0aGlzLmludGVncmF0aW9uVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGludGVncmF0aW9uVHlwZSwgUHJvdG9uLkVVTEVSKTtcbiAgICB0aGlzLmludGVncmF0b3IgPSBuZXcgSW50ZWdyYXRpb24odGhpcy5pbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgdGhpcy5fZnBzID0gXCJhdXRvXCI7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBQcm90b24uREVGQVVMVF9JTlRFUlZBTDtcbiAgfVxuXG4gIHNldCBmcHMoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX2ludGVydmFsID0gZnBzID09PSBcImF1dG9cIiA/IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMIDogTWF0aFV0aWwuZmxvb3IoMSAvIGZwcywgNyk7XG4gIH1cblxuICBnZXQgZnBzKCkge1xuICAgIHJldHVybiB0aGlzLl9mcHM7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgYWRkUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgcmVuZGVyLmluaXQodGhpcyk7XG4gICAgdGhpcy5yZW5kZXJlcnMucHVzaChyZW5kZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIHJlbW92ZVJlbmRlcmVyKHJlbmRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZW5kZXJlcnMuaW5kZXhPZihyZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmVuZGVyLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgYWRkRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9BRERFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgcmVtb3ZlRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICByZW1vdmVFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZW1pdHRlcnMuaW5kZXhPZihlbWl0dGVyKTtcbiAgICB0aGlzLmVtaXR0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgZW1pdHRlci5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX1JFTU9WRUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWxsIGFkZGVkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgLy8gJ2F1dG8nIGlzIHRoZSBkZWZhdWx0IGJyb3dzZXIgcmVmcmVzaCByYXRlLCB0aGUgdmFzdCBtYWpvcml0eSBpcyA2MGZwc1xuICAgIGlmICh0aGlzLl9mcHMgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuXG4gICAgICBpZiAoUHJvdG9uLlVTRV9DTE9DSykge1xuICAgICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcbiAgICAgICAgLy8gRml4IGJ1Z3Mgc3VjaCBhcyBjaHJvbWUgYnJvd3NlciBzd2l0Y2hpbmcgdGFicyBjYXVzaW5nIGV4Y2Vzc2l2ZSB0aW1lIGRpZmZlcmVuY2VcbiAgICAgICAgdGhpcy5hbWVuZENoYW5nZVRhYnNCdWcoKTtcblxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkID4gMCkgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLmVsYXBzZWQpO1xuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUoUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmcHMgZnJhbWUgcmF0ZSBpcyBzZXRcbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG5cbiAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk3NjQwMTgvY29udHJvbGxpbmctZnBzLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lXG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93IC0gKHRoaXMuZWxhcHNlZCAlIHRoaXMuX2ludGVydmFsKSAqIDEwMDA7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW1pdHRlcnNVcGRhdGUoZWxhcHNlZCkge1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5lbWl0dGVyc1tpXS51cGRhdGUoZWxhcHNlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgYW1lbmRDaGFuZ2VUYWJzQnVnXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBhbWVuZENoYW5nZVRhYnNCdWcoKSB7XG4gICAgaWYgKCFQcm90b24uYW1lbmRDaGFuZ2VUYWJzQnVnKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZWxhcHNlZCA+IDAuNSkge1xuICAgICAgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgYWxsIHBhcnRpY2xlcyBmcm9tIGFsbCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB0b3RhbCArPSB0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgZ2V0QWxsUGFydGljbGVzKCkge1xuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgcGFydGljbGVzID0gcGFydGljbGVzLmNvbmNhdCh0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcyk7XG4gICAgcmV0dXJuIHBhcnRpY2xlcztcbiAgfVxuXG4gIGRlc3Ryb3lBbGxFbWl0dGVycygpIHtcbiAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoaXMgUHJvdG9uIGluc3RhbmNlLiBUaGlzIGluY2x1ZGVzIGFsbCBlbWl0dGVycywgYW5kIGFsbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveShyZW1vdmUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRlc3Ryb3lPdGhlciA9ICgpID0+IHtcbiAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICB0aGlzLnRoZW4gPSAwO1xuICAgICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc3RhdHMuZGVzdHJveSgpO1xuXG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5yZW5kZXJlcnMsIHRoaXMuZ2V0QWxsUGFydGljbGVzKCkpO1xuXG4gICAgICB0aGlzLmludGVncmF0b3IgPSBudWxsO1xuICAgICAgdGhpcy5yZW5kZXJlcnMgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0dGVycyA9IG51bGw7XG4gICAgICB0aGlzLnN0YXRzID0gbnVsbDtcbiAgICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoZGVzdHJveU90aGVyLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95T3RoZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoUHJvdG9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJnYiB7XG4gIGNvbnN0cnVjdG9yKHIgPSAyNTUsIGcgPSAyNTUsIGIgPSAyNTUpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuciA9IDI1NTtcbiAgICB0aGlzLmcgPSAyNTU7XG4gICAgdGhpcy5iID0gMjU1O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGhhc1Byb3AodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfSxcblxuICAvKipcbiAgICogc2V0IHRoZSBwcm90b3R5cGUgaW4gYSBnaXZlbiBwcm90b3R5cGVPYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFByb3BcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyB0cmFuc2xhdGUgZGVzcmlwdGlvbiBmcm9tIGNoaW5lc2UgdG8gZW5nbGlzaFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGVPYmplY3QgQW4gb2JqZWN0IG9mIHNpbmdsZSBwcm90b3R5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gdGFyZ2V0XG4gICAqL1xuICBzZXRQcm9wKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IFNwYW4uZ2V0U3BhblZhbHVlKHByb3BzW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0VmVjdG9yVmFsXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgY29uZmBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mXG4gICAqL1xuICBzZXRWZWN0b3JWYWwocGFydGljbGUsIGNvbmYgPSBudWxsKSB7XG4gICAgaWYgKCFjb25mKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieFwiKSkgcGFydGljbGUucC54ID0gY29uZltcInhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInlcIikpIHBhcnRpY2xlLnAueSA9IGNvbmZbXCJ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ4XCIpKSBwYXJ0aWNsZS52LnggPSBjb25mW1widnhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ5XCIpKSBwYXJ0aWNsZS52LnkgPSBjb25mW1widnlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXhcIikpIHBhcnRpY2xlLmEueCA9IGNvbmZbXCJheFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXlcIikpIHBhcnRpY2xlLmEueSA9IGNvbmZbXCJheVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFcIl0pO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBvc2l0aW9uXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBvc2l0aW9uXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidmVsb2NpdHlcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widmVsb2NpdHlcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhY2NlbGVyYXRlXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFjY2VsZXJhdGVcIl0pO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZWFzZUxpbmVhcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICBlYXNlSW5RdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAyKTtcbiAgfSxcblxuICBlYXNlT3V0UXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgMikgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFkKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAyKTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluQ3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDMpO1xuICB9LFxuXG4gIGVhc2VPdXRDdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSAtIDEsIDMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRDdWJpYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG5cbiAgICByZXR1cm4gMC41ICogKE1hdGgucG93KHZhbHVlIC0gMiwgMykgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5RdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG4gIH0sXG5cbiAgZWFzZU91dFF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCA0KSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YXJ0KHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCA0KTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIE1hdGgucG93KHZhbHVlLCAzKSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJblNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLU1hdGguY29zKHZhbHVlICogTWF0aFV0aWwuUElfMikgKyAxO1xuICB9LFxuXG4gIGVhc2VPdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc2luKHZhbHVlICogTWF0aFV0aWwuUElfMik7XG4gIH0sXG5cbiAgZWFzZUluT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5FeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuICB9LFxuXG4gIGVhc2VPdXRFeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAxID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiB2YWx1ZSkgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEV4cG8odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApIHJldHVybiAwO1xuXG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gMTtcblxuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcblxuICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdmFsdWUpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluQ2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlT3V0Q2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KHZhbHVlIC0gMSwgMikpO1xuICB9LFxuXG4gIGVhc2VJbk91dENpcmModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh2YWx1ZSAtPSAyKSAqIHZhbHVlKSArIDEpO1xuICB9LFxuXG4gIGVhc2VJbkJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuIHZhbHVlICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlIC0gcyk7XG4gIH0sXG5cbiAgZWFzZU91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuICh2YWx1ZSA9IHZhbHVlIC0gMSkgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgKyBzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogKHZhbHVlICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgLSBzKSk7XG4gICAgcmV0dXJuIDAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSArIHMpICsgMik7XG4gIH0sXG5cbiAgZ2V0RWFzaW5nKGVhc2UpIHtcbiAgICBpZiAodHlwZW9mIGVhc2UgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGVhc2U7XG4gICAgZWxzZSByZXR1cm4gdGhpc1tlYXNlXSB8fCB0aGlzLmVhc2VMaW5lYXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMkQge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geCB8fCAwO1xuICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgfVxuXG4gIHNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0WCh4KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFkoeSkge1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRHcmFkaWVudCgpIHtcbiAgICBpZiAodGhpcy54ICE9PSAwKSByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgZWxzZSBpZiAodGhpcy55ID4gMCkgcmV0dXJuIE1hdGhVdGlsLlBJXzI7XG4gICAgZWxzZSBpZiAodGhpcy55IDwgMCkgcmV0dXJuIC1NYXRoVXRpbC5QSV8yO1xuICB9XG5cbiAgY29weSh2KSB7XG4gICAgdGhpcy54ID0gdi54O1xuICAgIHRoaXMueSA9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkWFkoYSwgYikge1xuICAgIHRoaXMueCArPSBhO1xuICAgIHRoaXMueSArPSBiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggKyBiLng7XG4gICAgdGhpcy55ID0gYS55ICsgYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWIodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YlZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54IC09IHYueDtcbiAgICB0aGlzLnkgLT0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWJWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggLSBiLng7XG4gICAgdGhpcy55ID0gYS55IC0gYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXZpZGVTY2FsYXIocykge1xuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gcztcbiAgICAgIHRoaXMueSAvPSBzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCgwLCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bHRpcGx5U2NhbGFyKHMpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmVnYXRlKCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKC0xKTtcbiAgfVxuXG4gIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbiAgfVxuXG4gIGxlbmd0aFNxKCkge1xuICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gIH1cblxuICBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpKTtcbiAgfVxuXG4gIGRpc3RhbmNlVG8odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVRvU3F1YXJlZCh2KSk7XG4gIH1cblxuICByb3RhdGUodGhhKSB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKHRoYSkgKyB5ICogTWF0aC5zaW4odGhhKTtcbiAgICB0aGlzLnkgPSAteCAqIE1hdGguc2luKHRoYSkgKyB5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdGFuY2VUb1NxdWFyZWQodikge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gdi54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gdi55O1xuXG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICB9XG5cbiAgbGVycCh2LCBhbHBoYSkge1xuICAgIHRoaXMueCArPSAodi54IC0gdGhpcy54KSAqIGFscGhhO1xuICAgIHRoaXMueSArPSAodi55IC0gdGhpcy55KSAqIGFscGhhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMueCA9IDAuMDtcbiAgICB0aGlzLnkgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55KTtcbiAgfVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL2JlaGF2aW91ci9CZWhhdmlvdXInKX0gQmVoYXZpb3VyICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vbWF0aC9WZWN0b3IyRCcpfSBWZWN0b3IyRCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL3V0aWxzL1JnYicpfSBSZ2IgKi9cbmltcG9ydCBSZ2IgZnJvbSBcIi4uL3V0aWxzL1JnYlwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gIC8qKiBAdHlwZSBzdHJpbmcgKi9cbiAgaWQgPSBcIlwiO1xuXG4gIC8qKiBAdHlwZSB7e3A6VmVjdG9yMkQsdjpWZWN0b3IyRCxhOlZlY3RvcjJEfX0gKi9cbiAgb2xkID0gbnVsbDtcblxuICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgZGF0YSA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtCZWhhdmlvdXJbXX0gKi9cbiAgYmVoYXZpb3VycyA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgcCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgdiA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgYSA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtSZ2J9ICovXG4gIHJnYiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIHRoZSBQYXJ0aWNsZSBjbGFzc1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLlBhcnRpY2xlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gcE9iaiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtsaWZlOjMsZGVhZDpmYWxzZX1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgcGFydGljbGUncyBpZDtcbiAgICAgKiBAcHJvcGVydHkgaWRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiUGFydGljbGVcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICAgIHRoaXMub2xkID0ge307XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG5cbiAgICB0aGlzLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmEgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLmEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIHRoaXMucmdiID0gbmV3IFJnYigpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBjb25mICYmIFByb3BVdGlsLnNldFByb3AodGhpcywgY29uZik7XG4gIH1cblxuICBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52LngsIC10aGlzLnYueSkgKiBNYXRoVXRpbC5OMTgwX1BJO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5saWZlID0gSW5maW5pdHk7XG4gICAgdGhpcy5hZ2UgPSAwO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5zbGVlcCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keSA9IG51bGw7XG4gICAgdGhpcy5zcHJpdGUgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZW5lcmd5ID0gMTsgLy8gRW5lcmd5IExvc3NcbiAgICB0aGlzLm1hc3MgPSAxO1xuICAgIHRoaXMucmFkaXVzID0gMTA7XG4gICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgdGhpcy5jb2xvciA9IG51bGw7XG5cbiAgICB0aGlzLnAuc2V0KDAsIDApO1xuICAgIHRoaXMudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5hLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5wLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC52LnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5hLnNldCgwLCAwKTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZWFzZUxpbmVhcjtcblxuICAgIHRoaXMucmdiLnJlc2V0KCk7XG4gICAgVXRpbC5lbXB0eU9iamVjdCh0aGlzLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGUodGltZSwgaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcbiAgICAgIHRoaXMuYWdlICs9IHRpbWU7XG4gICAgICB0aGlzLmFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWdlIDwgdGhpcy5saWZlKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHRoaXMuYWdlIC8gdGhpcy5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlCZWhhdmlvdXJzKHRpbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5iZWhhdmlvdXJzW2ldICYmIHRoaXMuYmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXJcbiAgICovXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGJlaGF2aW91ci5oYXNPd25Qcm9wZXJ0eShcInBhcmVudHNcIikpIGJlaGF2aW91ci5wYXJlbnRzLnB1c2godGhpcyk7XG4gICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJbXX0gYmVoYXZpb3Vyc1xuICAgKi9cbiAgYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWRkQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgcGFydGljbGVcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHR5cGVkZWYgIHtPYmplY3R9IHJnYk9iamVjdFxuICAgKiBAcHJvcGVydHkge051bWJlcn0gciByZWQgdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGcgZ3JlZW4gdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGIgYmx1ZSB2YWx1ZVxuICAgKi9cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgaGV4IHZhbHVlIHRvIGEgcmdiIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgaGV4VG9SZ2JcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGggYW55IGhleCB2YWx1ZSwgZS5nLiAjMDAwMDAwIG9yIDAwMDAwMCBmb3IgYmxhY2tcbiAgICpcbiAgICogQHJldHVybiB7cmdiT2JqZWN0fVxuICAgKi9cbiAgaGV4VG9SZ2IoaCkge1xuICAgIGNvbnN0IGhleDE2ID0gaC5jaGFyQXQoMCkgPT09IFwiI1wiID8gaC5zdWJzdHJpbmcoMSwgNykgOiBoO1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuXG4gICAgcmV0dXJuIHsgciwgZywgYiB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIHJnYiB2YWx1ZSB0byBhIHJnYiBzdHJpbmdcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHJnYlRvSGV4XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgUHJvdG9uLmhleFRvUmdifSByZ2IgYSByZ2Igb2JqZWN0IGxpa2UgaW4ge0BsaW5rIFByb3RvbiNQcm90b24ufVxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHJnYigpXG4gICAqL1xuICByZ2JUb0hleChyYmcpIHtcbiAgICByZXR1cm4gYHJnYigke3JiZy5yfSwgJHtyYmcuZ30sICR7cmJnLmJ9KWA7XG4gIH0sXG5cbiAgZ2V0SGV4MTZGcm9tUGFydGljbGUocCkge1xuICAgIHJldHVybiBOdW1iZXIocC5yZ2IucikgKiA2NTUzNiArIE51bWJlcihwLnJnYi5nKSAqIDI1NiArIE51bWJlcihwLnJnYi5iKTtcbiAgfVxufTtcbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2xhcjJEIHtcbiAgY29uc3RydWN0b3IociwgdGhhKSB7XG4gICAgdGhpcy5yID0gTWF0aC5hYnMocikgfHwgMDtcbiAgICB0aGlzLnRoYSA9IHRoYSB8fCAwO1xuICB9XG5cbiAgc2V0KHIsIHRoYSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRSKHIpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VGhhKHRoYSkge1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29weShwKSB7XG4gICAgdGhpcy5yID0gcC5yO1xuICAgIHRoaXMudGhhID0gcC50aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1ZlY3RvcigpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMuZ2V0WCgpLCB0aGlzLmdldFkoKSk7XG4gIH1cblxuICBnZXRYKCkge1xuICAgIHJldHVybiB0aGlzLnIgKiBNYXRoLnNpbih0aGlzLnRoYSk7XG4gIH1cblxuICBnZXRZKCkge1xuICAgIHJldHVybiAtdGhpcy5yICogTWF0aC5jb3ModGhpcy50aGEpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuciA9IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnIgPT09IHRoaXMuciAmJiB2LnRoYSA9PT0gdGhpcy50aGE7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnIgPSAwLjA7XG4gICAgdGhpcy50aGEgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFBvbGFyMkQodGhpcy5yLCB0aGlzLnRoYSk7XG4gIH1cbn1cbiIsImNvbnN0IE1hdDMgPSB7XG4gIGNyZWF0ZShtYXQzKSB7XG4gICAgY29uc3QgbWF0ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcbiAgICBpZiAobWF0MykgdGhpcy5zZXQobWF0MywgbWF0KTtcblxuICAgIHJldHVybiBtYXQ7XG4gIH0sXG5cbiAgc2V0KG1hdDEsIG1hdDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykgbWF0MltpXSA9IG1hdDFbaV07XG5cbiAgICByZXR1cm4gbWF0MjtcbiAgfSxcblxuICBtdWx0aXBseShtYXQsIG1hdDIsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTAyID0gbWF0WzJdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAwID0gbWF0MlswXSxcbiAgICAgIGIwMSA9IG1hdDJbMV0sXG4gICAgICBiMDIgPSBtYXQyWzJdLFxuICAgICAgYjEwID0gbWF0MlszXSxcbiAgICAgIGIxMSA9IG1hdDJbNF0sXG4gICAgICBiMjAgPSBtYXQyWzZdLFxuICAgICAgYjIxID0gbWF0Mls3XTtcblxuICAgIG1hdDNbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTA7XG4gICAgbWF0M1sxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMTtcbiAgICBtYXQzWzJdID0gYTAyICogYjAyO1xuICAgIG1hdDNbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTA7XG4gICAgbWF0M1s0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMTtcbiAgICBtYXQzWzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYTIwO1xuICAgIG1hdDNbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBhMjE7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBpbnZlcnNlKG1hdCwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDEgPSBhMTEsXG4gICAgICBiMTEgPSAtYTEwLFxuICAgICAgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwLFxuICAgICAgZCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSxcbiAgICAgIGlkO1xuXG4gICAgaWQgPSAxIC8gZDtcbiAgICBtYXQzWzBdID0gYjAxICogaWQ7XG4gICAgbWF0M1sxXSA9IC1hMDEgKiBpZDtcbiAgICBtYXQzWzNdID0gYjExICogaWQ7XG4gICAgbWF0M1s0XSA9IGEwMCAqIGlkO1xuICAgIG1hdDNbNl0gPSBiMjEgKiBpZDtcbiAgICBtYXQzWzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogaWQ7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBtdWx0aXBseVZlYzIobSwgdmVjLCBtYXQzKSB7XG4gICAgbGV0IHggPSB2ZWNbMF0sXG4gICAgICB5ID0gdmVjWzFdO1xuXG4gICAgbWF0M1swXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyBtWzZdO1xuICAgIG1hdDNbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgbVs3XTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXQzO1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgY2VudGVyKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5pc0FycmF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYSA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuICAgICAgdGhpcy5hID0gVXRpbC5pbml0VmFsdWUoYSwgMSk7XG4gICAgICB0aGlzLmIgPSBVdGlsLmluaXRWYWx1ZShiLCB0aGlzLmEpO1xuICAgICAgdGhpcy5jZW50ZXIgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNBcnJheSkge1xuICAgICAgcmV0dXJuIFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY2VudGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21BVG9CKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tRmxvYXRpbmcodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBTcGFuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqXG4gICAqIEB0b2RvIGEsIGIgYW5kIGMgc2hvdWxkIGJlICdNaXhlZCcgb3IgJ051bWJlcic/XG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBhXG4gICAqIEBwYXJhbSB7TWl4ZWR9ICAgICAgICAgICAgICAgYlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGNcbiAgICpcbiAgICogQHJldHVybiB7U3Bhbn1cbiAgICovXG4gIHN0YXRpYyBzZXRTcGFuVmFsdWUoYSwgYiwgYykge1xuICAgIGlmIChhIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcGFuKGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTcGFuKGEsIGIpO1xuICAgICAgICBlbHNlIHJldHVybiBuZXcgU3BhbihhLCBiLCBjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgZnJvbSBhIFNwYW4sIGlmIHRoZSBwYXJhbSBpcyBub3QgYSBTcGFuIGl0IHdpbGwgcmV0dXJuIHRoZSBnaXZlbiBwYXJhbWV0ZXJcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldFZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBwYW5cbiAgICpcbiAgICogQHJldHVybiB7TWl4ZWR9IHRoZSB2YWx1ZSBvZiBTcGFuIE9SIHRoZSBwYXJhbWV0ZXIgaWYgaXQgaXMgbm90IGEgU3BhblxuICAgKi9cbiAgc3RhdGljIGdldFNwYW5WYWx1ZShwYW4pIHtcbiAgICByZXR1cm4gcGFuIGluc3RhbmNlb2YgU3BhbiA/IHBhbi5nZXRWYWx1ZSgpIDogcGFuO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5U3BhbiBleHRlbmRzIFNwYW4ge1xuICBjb25zdHJ1Y3Rvcihjb2xvcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYXJyID0gVXRpbC50b0FycmF5KGNvbG9yKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIGNvbnN0IHZhbCA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLl9hcnIpO1xuICAgIHJldHVybiB2YWwgPT09IFwicmFuZG9tXCIgfHwgdmFsID09PSBcIlJhbmRvbVwiID8gTWF0aFV0aWwucmFuZG9tQ29sb3IoKSA6IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHN1cmUgdGhhdCB0aGUgY29sb3IgaXMgYW4gaW5zdGFuY2Ugb2YgUHJvdG9uLkFycmF5U3BhbiwgaWYgbm90IGl0IG1ha2VzIGEgbmV3IGluc3RhbmNlXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBcnJheVNwYW4oYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5U3BhbikgcmV0dXJuIGFycjtcbiAgICBlbHNlIHJldHVybiBuZXcgQXJyYXlTcGFuKGFycik7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLndpZHRoID0gdztcbiAgICB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuICB9XG5cbiAgY29udGFpbnMoeCwgeSkge1xuICAgIGlmICh4IDw9IHRoaXMucmlnaHQgJiYgeCA+PSB0aGlzLnggJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMueSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUge1xuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWlzc2lvbiAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYXRlXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkgfCBOdW1iZXIgfCBTcGFufSBudW1wYW4gdGhlIG51bWJlciBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBAcGFyYW0ge0FycmF5IHwgTnVtYmVyIHwgU3Bhbn0gdGltZXBhbiB0aGUgdGltZSBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBmb3IgZXhhbXBsZTogbmV3IFJhdGUobmV3IFNwYW4oMTAsIDIwKSwgbmV3IFNwYW4oLjEsIC4yNSkpO1xuICAgKi9cbiAgY29uc3RydWN0b3IobnVtcGFuLCB0aW1lcGFuKSB7XG4gICAgdGhpcy5udW1QYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShudW1wYW4sIDEpKTtcbiAgICB0aGlzLnRpbWVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZSh0aW1lcGFuLCAxKSk7XG5cbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IDA7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG4gIH1cblxuICBnZXRWYWx1ZSh0aW1lKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA+PSB0aGlzLm5leHRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG5cbiAgICAgIGlmICh0aGlzLm51bVBhbi5iID09PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLm51bVBhbi5nZXRWYWx1ZShmYWxzZSkgPiAwLjUpIHJldHVybiAxO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtUGFuLmdldFZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXplIHtcbiAgcmVzZXQoKSB7fVxuXG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShlbWl0dGVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBzdWIgY2xhc3MgaW5pdFxuICBpbml0aWFsaXplKHRhcmdldCkge31cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlmZSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGlmZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTGlmZVwiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5saWZlUGFuLmEgPT09IEluZmluaXR5KSB0YXJnZXQubGlmZSA9IEluZmluaXR5O1xuICAgIGVsc2UgdGFyZ2V0LmxpZmUgPSB0aGlzLmxpZmVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgICB0aGlzLnJhbmRvbSA9IDA7XG4gICAgdGhpcy5jcm9zc1R5cGUgPSBcImRlYWRcIjtcbiAgICB0aGlzLmFsZXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge31cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudmVjdG9yID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54O1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIFBvaW50Wm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzaW5nIG1ldGhvZCFcIik7XG4gICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3Ioem9uZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgICB0aGlzLm5hbWUgPSBcIlBvc2l0aW9uXCI7XG4gIH1cblxuICByZXNldCh6b25lKSB7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGhpcy56b25lLmdldFBvc2l0aW9uKCk7XG5cbiAgICB0YXJnZXQucC54ID0gdGhpcy56b25lLnZlY3Rvci54O1xuICAgIHRhcmdldC5wLnkgPSB0aGlzLnpvbmUudmVjdG9yLnk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4uL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbG9jaXR5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlZlbG9jaXR5XCI7XG4gIH1cblxuICByZXNldChycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG4gIH1cblxuICBub3JtYWxpemVWZWxvY2l0eSh2cikge1xuICAgIHJldHVybiB2ciAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInBcIiB8fCB0aGlzLnR5cGUgPT09IFwiUFwiIHx8IHRoaXMudHlwZSA9PT0gXCJwb2xhclwiKSB7XG4gICAgICBjb25zdCBwb2xhcjJkID0gbmV3IFBvbGFyMkQoXG4gICAgICAgIHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpLFxuICAgICAgICB0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpICogTWF0aFV0aWwuUElfMTgwXG4gICAgICApO1xuXG4gICAgICB0YXJnZXQudi54ID0gcG9sYXIyZC5nZXRYKCk7XG4gICAgICB0YXJnZXQudi55ID0gcG9sYXIyZC5nZXRZKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC52LnggPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKTtcbiAgICAgIHRhcmdldC52LnkgPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMudGhhUGFuLmdldFZhbHVlKCkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFzc1BhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTWFzc1wiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0YXJnZXQubWFzcyA9IHRoaXMubWFzc1Bhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGl1cyBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJSYWRpdXNcIjtcbiAgfVxuXG4gIHJlc2V0KGEsIGIsIGMpIHtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHRoaXMucmFkaXVzLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2R5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlLCB3LCBoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNldFNwYW5WYWx1ZShpbWFnZSk7XG4gICAgdGhpcy53ID0gVXRpbC5pbml0VmFsdWUodywgMjApO1xuICAgIHRoaXMuaCA9IFV0aWwuaW5pdFZhbHVlKGgsIHRoaXMudyk7XG4gICAgdGhpcy5uYW1lID0gXCJCb2R5XCI7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSB0aGlzLmltYWdlLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlVGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0ge1xuICAgICAgICB3aWR0aDogdGhpcy53LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaCxcbiAgICAgICAgc3JjOiBpbWFnZVRhcmdldCxcbiAgICAgICAgaXNJbm5lcjogdHJ1ZSxcbiAgICAgICAgaW5uZXI6IHRydWVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBpbWFnZVRhcmdldDtcbiAgICB9XG4gIH1cblxuICBzZXRTcGFuVmFsdWUoaW1hZ2UpIHtcbiAgICByZXR1cm4gaW1hZ2UgaW5zdGFuY2VvZiBBcnJheVNwYW4gPyBpbWFnZSA6IG5ldyBBcnJheVNwYW4oaW1hZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyIHtcbiAgc3RhdGljIGlkID0gMDtcblxuICAvKipcbiAgICogVGhlIEJlaGF2aW91ciBjbGFzcyBpcyB0aGUgYmFzZSBmb3IgdGhlIG90aGVyIEJlaGF2aW91clxuICAgKlxuICAgKiBAbWVtYmVyb2YhIC1cbiAgICogQGludGVyZmFjZVxuICAgKiBAYWxpYXMgUHJvdG9uLkJlaGF2aW91clxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbGlmZSBcdHRoZSBiZWhhdmlvdXJzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVhc2luZyBcdFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZCwgZm9yIGV4YW1wbGUgZWFzZS5lYXNlT3V0UXVhcnRcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9ICBpZCBcdFx0VGhlIGJlaGF2aW91cnMgaWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9ICBhZ2U9MCBcdEhvdyBsb25nIHRoZSBwYXJ0aWNsZSBzaG91bGQgYmUgJ2FsaWZlJ1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gIGVuZXJneT0xXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVhZD1mYWxzZSBUaGUgcGFydGljbGUgaXMgZGVhZCBhdCBmaXJzdFxuICAgKiBAcHJvcGVydHkge0FycmF5fSAgIHBhcmVudHMgXHRUaGUgYmVoYXZpb3VyJ3MgcGFyZW50cyBhcnJheVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gIG5hbWUgXHRUaGUgYmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG5cbiAgICB0aGlzLmFnZSA9IDA7XG4gICAgdGhpcy5lbmVyZ3kgPSAxO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyZW50cyA9IFtdO1xuXG4gICAgdGhpcy5pZCA9IGBCZWhhdmlvdXJfJHtCZWhhdmlvdXIuaWQrK31gO1xuICAgIHRoaXMubmFtZSA9IFwiQmVoYXZpb3VyXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIGZvcmNlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAbWV0aG9kIG5vcm1hbGl6ZUZvcmNlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gZm9yY2VcbiAgICovXG4gIG5vcm1hbGl6ZUZvcmNlKGZvcmNlKSB7XG4gICAgcmV0dXJuIGZvcmNlLm11bHRpcGx5U2NhbGFyKFByb3Rvbi5NRUFTVVJFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2YWx1ZSBieSAxOjEwMDtcbiAgICpcbiAgICogQG1ldGhvZCBub3JtYWxpemVWYWx1ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAqL1xuICBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIGNvbXB1dGluZyBsaWZlIGN5Y2xlXG4gICAqXG4gICAqIEBtZXRob2QgY2FsY3VsYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuYWdlICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlIHx8IHRoaXMuZGVhZCkge1xuICAgICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHBhcnRpY2xlLmFnZSAvIHBhcnRpY2xlLmxpZmUpO1xuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgYmVoYXZpb3VyXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcmVudHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMucGFyZW50c1tpXS5yZW1vdmVCZWhhdmlvdXIodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnRzLmxlbmd0aCA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yY2UgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkZvcmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeFxuICAgKiBAcGFyYW0ge051bWJlcn0gZnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuICAgIHRoaXMubmFtZSA9IFwiRm9yY2VcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGZ4LCBmeSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHRoaXMuZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0aW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIFRoaXMgYmVoYXZpb3VyIGxldCB0aGUgcGFydGljbGVzIGZvbGxvdyBvbmUgc3BlY2lmaWMgUHJvdG9uLlZlY3RvcjJEXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5BdHRyYWN0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb25cbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGl1c1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9yY2VcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGl1c1NxXG4gICAqIEBwcm9wZXJ0eSB7UHJvdG9uLlZlY3RvcjJEfSBhdHRyYWN0aW9uRm9yY2VcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxlbmd0aFNxXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLnJhZGl1cyA9IFV0aWwuaW5pdFZhbHVlKHJhZGl1cywgMTAwMCk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIHRoaXMubmFtZSA9IFwiQXR0cmFjdGlvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLmNvcHkodGhpcy50YXJnZXRQb3NpdGlvbik7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uuc3ViKHBhcnRpY2xlLnApO1xuICAgIHRoaXMubGVuZ3RoU3EgPSB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoU3EgPiAwLjAwMDA0ICYmIHRoaXMubGVuZ3RoU3EgPCB0aGlzLnJhZGl1c1NxKSB7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5ub3JtYWxpemUoKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKDEgLSB0aGlzLmxlbmd0aFNxIC8gdGhpcy5yYWRpdXNTcSk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5tdWx0aXBseVNjYWxhcih0aGlzLmZvcmNlKTtcblxuICAgICAgcGFydGljbGUuYS5hZGQodGhpcy5hdHRyYWN0aW9uRm9yY2UpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbURyaWZ0IGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUmFuZG9tRHJpZnRcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgVGhlIHRpbWUgb2YgdGhlIGRyaWZ0XG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZHJpZnRYLCBkcmlmdFksIGRlbGF5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXkpO1xuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5uYW1lID0gXCJSYW5kb21EcmlmdFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFggXHRcdFx0XHRYIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WSAgXHRcdFx0XHRZIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IFx0XHRcdFx0SG93IG11Y2ggZGVsYXkgdGhlIGRyaWZ0IHNob3VsZCBoYXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMucGFuRm9jZSA9IG5ldyBWZWN0b3IyRChkcmlmdFgsIGRyaWZ0WSk7XG4gICAgdGhpcy5wYW5Gb2NlID0gdGhpcy5ub3JtYWxpemVGb3JjZSh0aGlzLnBhbkZvY2UpO1xuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1JhbmRvbURyaWZ0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGltZSA+PSB0aGlzLmRlbGF5KSB7XG4gICAgICBwYXJ0aWNsZS5hLmFkZFhZKFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueCwgdGhpcy5wYW5Gb2NlLngpLFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueSwgdGhpcy5wYW5Gb2NlLnkpXG4gICAgICApO1xuXG4gICAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEZvcmNlIGZyb20gXCIuL0ZvcmNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHkgZXh0ZW5kcyBGb3JjZSB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uR3Jhdml0eVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZyBcdFx0XHRcdFx0XHRcdEdyYXZpdHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcigwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMubmFtZSA9IFwiR3Jhdml0eVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkdyYXZpdHlcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQoMCwgZywgbGlmZSwgZWFzaW5nKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayBhZnRlciBjb2xsaXNpb25cbiAgICpcbiAgICogQGNhbGxiYWNrIENhbGxiYWNrXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJpdGNsZX0gb3RoZXJQYXJ0aWNsZVxuICAgKi9cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xsaXNpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIHRvIG1hc3NcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gXHRbZW1pdHRlcj1udWxsXSBcdFx0dGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBcdFx0W21hc3M9dHJ1ZV1cbiAgICogQHBhcmFtIHtDYWxsYmFja31cdCBcdFtjYWxsYmFjaz1udWxsXVx0XHR0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIGNvbGxpc2lvblxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMucmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2spO1xuICAgIHRoaXMubmV3UG9vbCA9IFtdO1xuICAgIHRoaXMucG9vbCA9IFtdO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sbGlzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gVXRpbC5pbml0VmFsdWUoZW1pdHRlciwgbnVsbCk7XG4gICAgdGhpcy5tYXNzID0gVXRpbC5pbml0VmFsdWUobWFzcywgdHJ1ZSk7XG4gICAgdGhpcy5jYWxsYmFjayA9IFV0aWwuaW5pdFZhbHVlKGNhbGxiYWNrLCBudWxsKTtcblxuICAgIHRoaXMuY29sbGlzaW9uUG9vbCA9IFtdO1xuICAgIHRoaXMuZGVsdGEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuZW1pdHRlcikge1xuICAgICAgVXRpbC5zbGljZUFycmF5KHRoaXMuZW1pdHRlci5wYXJ0aWNsZXMsIGluZGV4LCB0aGlzLm5ld1Bvb2wpO1xuICAgIH0gZWxzZSB7XG4gICAgICBVdGlsLnNsaWNlQXJyYXkodGhpcy5wb29sLCBpbmRleCwgdGhpcy5uZXdQb29sKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLm5ld1Bvb2wubGVuZ3RoO1xuICAgIGxldCBvdGhlclBhcnRpY2xlO1xuICAgIGxldCBsZW5ndGhTcTtcbiAgICBsZXQgb3ZlcmxhcDtcbiAgICBsZXQgdG90YWxNYXNzO1xuICAgIGxldCBhdmVyYWdlTWFzczEsIGF2ZXJhZ2VNYXNzMjtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgb3RoZXJQYXJ0aWNsZSA9IHRoaXMubmV3UG9vbFtpXTtcblxuICAgICAgaWYgKG90aGVyUGFydGljbGUgIT09IHBhcnRpY2xlKSB7XG4gICAgICAgIHRoaXMuZGVsdGEuY29weShvdGhlclBhcnRpY2xlLnApO1xuICAgICAgICB0aGlzLmRlbHRhLnN1YihwYXJ0aWNsZS5wKTtcblxuICAgICAgICBsZW5ndGhTcSA9IHRoaXMuZGVsdGEubGVuZ3RoU3EoKTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBwYXJ0aWNsZS5yYWRpdXMgKyBvdGhlclBhcnRpY2xlLnJhZGl1cztcblxuICAgICAgICBpZiAobGVuZ3RoU3EgPD0gZGlzdGFuY2UgKiBkaXN0YW5jZSkge1xuICAgICAgICAgIG92ZXJsYXAgPSBkaXN0YW5jZSAtIE1hdGguc3FydChsZW5ndGhTcSk7XG4gICAgICAgICAgb3ZlcmxhcCArPSAwLjU7XG5cbiAgICAgICAgICB0b3RhbE1hc3MgPSBwYXJ0aWNsZS5tYXNzICsgb3RoZXJQYXJ0aWNsZS5tYXNzO1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMSA9IHRoaXMubWFzcyA/IG90aGVyUGFydGljbGUubWFzcyAvIHRvdGFsTWFzcyA6IDAuNTtcbiAgICAgICAgICBhdmVyYWdlTWFzczIgPSB0aGlzLm1hc3MgPyBwYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuXG4gICAgICAgICAgcGFydGljbGUucC5hZGQoXG4gICAgICAgICAgICB0aGlzLmRlbHRhXG4gICAgICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIC1hdmVyYWdlTWFzczEpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBvdGhlclBhcnRpY2xlLnAuYWRkKHRoaXMuZGVsdGEubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIGF2ZXJhZ2VNYXNzMikpO1xuXG4gICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHBhcnRpY2xlLCBvdGhlclBhcnRpY2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3NzWm9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIGNvbWUgdG8gdGhlIGVuZCBvZiB0aGUgc3BlY2lmaWVkIHpvbmVcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNyb3NzWm9uZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdFx0XHR3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBwYXNzIHRoZSB6b25lIC0gYWxsb3dlZCBzdHJpbmdzOiBkZWFkIHwgYm91bmQgfCBjcm9zc1xuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoem9uZSwgY3Jvc3NUeXBlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNyb3NzWm9uZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uWm9uZX0gem9uZSBcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy56b25lID0gem9uZTtcbiAgICB0aGlzLnpvbmUuY3Jvc3NUeXBlID0gVXRpbC5pbml0VmFsdWUoY3Jvc3NUeXBlLCBcImRlYWRcIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHRoaXMuem9uZS5jcm9zc2luZyhwYXJ0aWNsZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHBoYSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQWxwaGFcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQWxwaGFcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BbHBoYVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5ldyBhbHBoYSB2YWx1ZSBvZiB0aGUgcGFydGljbGVcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGUgQSBzaW5nbGUgUHJvdG9uIGdlbmVyYXRlZCBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEuYWxwaGFBID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHBhcnRpY2xlLmRhdGEuYWxwaGFBO1xuICAgIGVsc2UgcGFydGljbGUuZGF0YS5hbHBoYUIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHBhcnRpY2xlLmFscGhhID0gcGFydGljbGUuZGF0YS5hbHBoYUIgKyAocGFydGljbGUuZGF0YS5hbHBoYUEgLSBwYXJ0aWNsZS5kYXRhLmFscGhhQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5hbHBoYSA8IDAuMDAxKSBwYXJ0aWNsZS5hbHBoYSA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2FsZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiU2NhbGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5zY2FsZUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQiA9IHRoaXMuc2FtZSA/IHBhcnRpY2xlLmRhdGEuc2NhbGVBIDogdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5zY2FsZSA9IHBhcnRpY2xlLmRhdGEuc2NhbGVCICsgKHBhcnRpY2xlLmRhdGEuc2NhbGVBIC0gcGFydGljbGUuZGF0YS5zY2FsZUIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICBpZiAocGFydGljbGUuc2NhbGUgPCAwLjAwMDEpIHBhcnRpY2xlLnNjYWxlID0gMDtcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyAqIHBhcnRpY2xlLnNjYWxlO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Sb3RhdGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScsICdiJyBhbmQgJ3N0eWxlJ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2luZmx1ZW5jZT1WZWxvY2l0eV0gVGhlIHJvdGF0aW9uJ3MgaW5mbHVlbmNlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbc3R5bGU9dG9dXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5mbHVlbmNlLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoaW5mbHVlbmNlLCBiLCBzdHlsZSk7XG4gICAgdGhpcy5uYW1lID0gXCJSb3RhdGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnLCAnYicgYW5kICdzdHlsZSdcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHlsZT10b11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIFwiVmVsb2NpdHlcIikpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGIsIDApKTtcbiAgICB0aGlzLnN0eWxlID0gVXRpbC5pbml0VmFsdWUoc3R5bGUsIFwidG9cIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25BID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoIXRoaXMuc2FtZSkgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGlmICghdGhpcy5zYW1lKSB7XG4gICAgICBpZiAodGhpcy5zdHlsZSA9PT0gXCJ0b1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiVE9cIiB8fCB0aGlzLnN0eWxlID09PSBcIl9cIikge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPVxuICAgICAgICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25CICsgKHBhcnRpY2xlLmRhdGEucm90YXRpb25BIC0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkIpICogdGhpcy5lbmVyZ3k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuYS5hID09PSBcIlZcIiB8fCB0aGlzLmEuYSA9PT0gXCJWZWxvY2l0eVwiIHx8IHRoaXMuYS5hID09PSBcInZcIikge1xuICAgICAgLy8gYmV0YS4uLlxuICAgICAgcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZS5nZXREaXJlY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xvclxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGEgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGIgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNvbG9yXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihhKTtcbiAgICB0aGlzLmIgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGIpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuY29sb3IgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmNvbG9yQSA9IENvbG9yVXRpbC5oZXhUb1JnYihwYXJ0aWNsZS5jb2xvcik7XG5cbiAgICBpZiAodGhpcy5iKSBwYXJ0aWNsZS5kYXRhLmNvbG9yQiA9IENvbG9yVXRpbC5oZXhUb1JnYih0aGlzLmIuZ2V0VmFsdWUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGlmICh0aGlzLmIpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckIuciArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yIC0gcGFydGljbGUuZGF0YS5jb2xvckIucikgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckIuZyArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nIC0gcGFydGljbGUuZGF0YS5jb2xvckIuZykgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckIuYiArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iIC0gcGFydGljbGUuZGF0YS5jb2xvckIuYikgKiB0aGlzLmVuZXJneTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5yZ2IuciA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5yZ2IuZyA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5yZ2IuYiA8PCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLnI7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmc7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmI7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuY29uc3QgQ0hBTkdJTkcgPSBcImNoYW5naW5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN5Y2xvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkN5Y2xvbmVcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDeWNsb25lXCI7XG4gIH1cblxuICBzZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuXG4gICAgaWYgKGFuZ2xlID09PSBcInJpZ2h0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSAtTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInJhbmRvbVwiO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJzcGFuXCI7XG4gICAgICB0aGlzLnNwYW4gPSBhbmdsZTtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5naW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiYXV0b1wiXG4gICAgKSB7XG4gICAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgfSBlbHNlIGlmIChmb3JjZSkge1xuICAgICAgdGhpcy5mb3JjZSA9IGZvcmNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSBNYXRoVXRpbC5yYW5kb21BVG9CKC1NYXRoVXRpbC5QSSwgTWF0aFV0aWwuUEkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gdGhpcy5zcGFuLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBsZXQgbGVuZ3RoO1xuICAgIGxldCBncmFkaWVudCA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIiB8fCB0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgZ3JhZGllbnQgKz0gcGFydGljbGUuZGF0YS5jYW5nbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyYWRpZW50ICs9IHRoaXMuYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9yY2UgPT09IENIQU5HSU5HKSB7XG4gICAgICBsZW5ndGggPSBwYXJ0aWNsZS52Lmxlbmd0aCgpIC8gMTAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0aGlzLmZvcmNlO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS54ID0gbGVuZ3RoICogTWF0aC5jb3MoZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS55ID0gbGVuZ3RoICogTWF0aC5zaW4oZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IHRoaXMubm9ybWFsaXplRm9yY2UocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgICBwYXJ0aWNsZS5hLmFkZChwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICB9XG59XG4iLCJpbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9BdHRyYWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcHVsc2lvbiBleHRlbmRzIEF0dHJhY3Rpb24ge1xuICAvKipcbiAgICogVGhlIG9wcGlzaXRlIG9mIFByb3Rvbi5BdHRyYWN0aW9uIC0gdHVybnMgdGhlIGZvcmNlXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlJlcHVsc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcbiAgICB0aGlzLm5hbWUgPSBcIlJlcHVsc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJlcHVsc2lvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eVdlbGwgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBHcmF2aXR5V2VsbFxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbY2VudGVyUG9pbnQ9bmV3IFZlY3RvcjJEXSBUaGUgcG9pbnQgaW4gdGhlIGNlbnRlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cdFx0XHRcdFx0VGhlIGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV1cdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5V2VsbFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jR3Jhdml0eVdlbGxcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoY2VudGVyUG9pbnQsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbmhlcml0ZG9jXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMuc2V0KHRoaXMuY2VudGVyUG9pbnQueCAtIHBhcnRpY2xlLnAueCwgdGhpcy5jZW50ZXJQb2ludC55IC0gcGFydGljbGUucC55KTtcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKGRpc3RhbmNlU3EgIT09IDApIHtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGgoKTtcbiAgICAgIGNvbnN0IGZhY3RvciA9ICh0aGlzLmZvcmNlICogdGltZSkgLyAoZGlzdGFuY2VTcSAqIGRpc3RhbmNlKTtcblxuICAgICAgcGFydGljbGUudi54ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueDtcbiAgICAgIHBhcnRpY2xlLnYueSArPSBmYWN0b3IgKiB0aGlzLmRpc3RhbmNlVmVjLnk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0aWFsaXplKGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplcykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGluaXRpYWxpemVzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGluaXRpYWxpemVzW2ldIGluc3RhbmNlb2YgSW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplc1tpXS5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpO1xuICB9LFxuXG4gIC8vIGluaXRcbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZSkge1xuICAgIFByb3BVdGlsLnNldFByb3AocGFydGljbGUsIGluaXRpYWxpemUpO1xuICAgIFByb3BVdGlsLnNldFZlY3RvclZhbChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gIH0sXG5cbiAgYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAoZW1pdHRlci5iaW5kRW1pdHRlcikge1xuICAgICAgcGFydGljbGUucC5hZGQoZW1pdHRlci5wKTtcbiAgICAgIHBhcnRpY2xlLnYuYWRkKGVtaXR0ZXIudik7XG4gICAgICBwYXJ0aWNsZS5hLmFkZChlbWl0dGVyLmEpO1xuICAgICAgcGFydGljbGUudi5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKGVtaXR0ZXIucm90YXRpb24pKTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZVV0aWwgZnJvbSBcIi4uL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlciBleHRlbmRzIFBhcnRpY2xlIHtcbiAgLyoqXG4gICAqIFlvdSBjYW4gdXNlIHRoaXMgZW1pdCBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEl0IHdpbGwgZGlzcGF0Y2ggZm9sbG93IGV2ZW50czpcbiAgICogUEFSVElDTEVfQ1JFQVRFRFxuICAgKiBQQVJUSUNMRV9VUERBVEFcbiAgICogUEFSVElDTEVfREVBRFxuICAgKlxuICAgKiBAY2xhc3MgRW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7ZGFtcGluZzowLjAxLGJpbmRFbWl0dGVyOmZhbHNlfVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZiA9IHt9KSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuICAgIHRoaXMuaW5pdGlhbGl6ZXMgPSBbXTtcblxuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuZW1pdFNwZWVkID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyaWN0aW9uIGNvZWZmaWNpZW50IGZvciBhbGwgcGFydGljbGUgZW1pdCBieSBUaGlzO1xuICAgICAqIEBwcm9wZXJ0eSBkYW1waW5nXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwLjAwNlxuICAgICAqL1xuICAgIHRoaXMuZGFtcGluZyA9IDAuMDA2O1xuXG4gICAgLyoqXG4gICAgICogSWYgYmluZEVtaXR0ZXIgdGhlIHBhcnRpY2xlcyBjYW4gYmluZCB0aGlzIGVtaXR0ZXIncyBwcm9wZXJ0eTtcbiAgICAgKiBAcHJvcGVydHkgYmluZEVtaXR0ZXJcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgdGhpcy5iaW5kRW1pdHRlciA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXQgKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAgICogQHByb3BlcnR5IHJhdGVcbiAgICAgKiBAdHlwZSB7UmF0ZX1cbiAgICAgKiBAZGVmYXVsdCBSYXRlKDEsIC4xKVxuICAgICAqL1xuICAgIHRoaXMucmF0ZSA9IG5ldyBSYXRlKDEsIDAuMSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkVtaXR0ZXJcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbWl0VGltZSBiZWdpbiBlbWl0IHRpbWU7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsaWZlIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlclxuICAgKi9cbiAgZW1pdCh0b3RhbFRpbWUsIGxpZmUpIHtcbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gVXRpbC5pbml0VmFsdWUodG90YWxUaW1lLCBJbmZpbml0eSk7XG5cbiAgICBpZiAobGlmZSA9PT0gdHJ1ZSB8fCBsaWZlID09PSBcImxpZmVcIiB8fCBsaWZlID09PSBcImRlc3Ryb3lcIikge1xuICAgICAgdGhpcy5saWZlID0gdG90YWxUaW1lID09PSBcIm9uY2VcIiA/IDEgOiB0aGlzLnRvdGFsVGltZTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihsaWZlKSkge1xuICAgICAgdGhpcy5saWZlID0gbGlmZTtcbiAgICB9XG5cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJvbmNlXCIpIHtcbiAgICAgIGxldCBpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB0aGlzLnRvdGFsVGltZSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG5cbiAgICAgIGlmICh0aGlzLmVtaXRUaW1lIDwgdGhpcy50b3RhbFRpbWUpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgc2luZ2xlIHBhcnRpY2xlO1xuICAgKlxuICAgKiBjYW4gdXNlIGVtaXQoe3g6MTB9LG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KSBvciBlbWl0KFt7eDoxMH0sbmV3IEluaXRpYWxpemVdLG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KVxuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGxldCBpbml0aWFsaXplcyA9IHRoaXMuaW5pdGlhbGl6ZXM7XG4gICAgbGV0IGJlaGF2aW91cnMgPSB0aGlzLmJlaGF2aW91cnM7XG5cbiAgICBpZiAoaW5pdGlhbGl6ZSkgaW5pdGlhbGl6ZXMgPSBVdGlsLnRvQXJyYXkoaW5pdGlhbGl6ZSk7XG4gICAgaWYgKGJlaGF2aW91cikgYmVoYXZpb3VycyA9IFV0aWwudG9BcnJheShiZWhhdmlvdXIpO1xuXG4gICAgcGFydGljbGUucmVzZXQoKTtcbiAgICBJbml0aWFsaXplVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcyk7XG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucGFydGljbGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcblxuICAgIHRoaXMucmF0ZSA9IG51bGw7XG4gICAgdGhpcy5vbGQgPSBudWxsO1xuICAgIHRoaXMucmdiID0gbnVsbDtcbiAgICB0aGlzLnYgPSBudWxsO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdGhpcy5wID0gbnVsbDtcbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChFbWl0dGVyKTtcbiIsImltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyRW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEJlaGF2aW91ckVtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEJlaGF2aW91ckVtaXR0ZXIgeW91IGNhbiBhZGQgYmVoYXZpb3VycyB0byBzZWxmO1xuICAgKiBAY2xhc3MgUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMuc2VsZkJlaGF2aW91cnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBlbWl0dGVyO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IFByb3Rvbi5Db2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZFNlbGZCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpLFxuICAgICAgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXIgZm9yIHNlbGZcbiAgICogQG1ldGhvZCByZW1vdmVTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVTZWxmQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuc2VsZkJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgc3VwZXIudXBkYXRlKHRpbWUpO1xuXG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmxlbmd0aDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd0VtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBGb2xsb3dFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBGb2xsb3dFbWl0dGVyIHdpbGwgZW1pdCBwYXJ0aWNsZSB3aGVuIG1vdXNlbW92aW5nXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uRm9sbG93RW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtFbGVtZW50fSBtb3VzZVRhcmdldCBtb3VzZWV2ZW50J3MgdGFyZ2V0O1xuICAgKiBAcGFyYW0ge051bWJlcn0gZWFzZSB0aGUgZWFzaW5nIG9mIGZvbGxvd2luZyBzcGVlZDtcbiAgICogQGRlZmF1bHQgMC43XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1vdXNlVGFyZ2V0LCBlYXNlLCBjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcblxuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlbW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZWRvd24uY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNldXBIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNldXAuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZW1vdmUoZSkge1xuICAgIGlmIChlLmxheWVyWCB8fCBlLmxheWVyWCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUubGF5ZXJYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH0gZWxzZSBpZiAoZS5vZmZzZXRYIHx8IGUub2Zmc2V0WCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUub2Zmc2V0WCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLm9mZnNldFkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoXCJvbmNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHBpY3R1cmUgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc0ltYWdlKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5fX2lzSW1hZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIG9iai5fX2lzSW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHN0cmluZyBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICB9XG59O1xuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5uYW1lID0gXCJCYXNlUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFN0cm9rZShjb2xvciA9IFwiIzAwMDAwMFwiLCB0aGlua25lc3MgPSAxKSB7XG4gICAgdGhpcy5zdHJva2UgPSB7IGNvbG9yLCB0aGlua25lc3MgfTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZUFmdGVyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyQWRkZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlclJlbW92ZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZURlYWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwcm90b247XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0ltYWdlIG1ldGhvZFxuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZSBkcmF3Q2lyY2xlIC0tXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY2lyY2xlXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvLyBwcml2YXRlIGNyZWF0ZUJ1ZmZlclxuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoVHlwZXMuaXNJbWFnZShpbWFnZSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBpbWFnZS53aWR0aCArIFwiX1wiICsgaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV07XG5cbiAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdID0gY2FudmFzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtM2QgPSBmYWxzZTtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRvbVJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zZCkge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybTNkKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0ocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUub3BhY2l0eSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgICBpZiAocGFydGljbGUuYm9keS5pc0NpcmNsZSkge1xuICAgICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGJvZHlSZWFkeShwYXJ0aWNsZSkge1xuICAgIHJldHVybiB0eXBlb2YgcGFydGljbGUuYm9keSA9PT0gXCJvYmplY3RcIiAmJiBwYXJ0aWNsZS5ib2R5ICYmICFwYXJ0aWNsZS5ib2R5LmlzSW5uZXI7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChpbWcsIHBhcnRpY2xlKTtcbiAgICBEb21VdGlsLnJlc2l6ZShwYXJ0aWNsZS5ib2R5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIDIgKiBwYXJ0aWNsZS5yYWRpdXMsIDIgKiBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHtwYXJ0aWNsZS5yYWRpdXN9cHhgO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJXaWR0aCA9IGAke3RoaXMuc3Ryb2tlLnRoaW5rbmVzc31weGA7XG4gICAgfVxuICAgIGRvbS5pc0NpcmNsZSA9IHRydWU7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdXJsID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIgPyBib2R5IDogYm9keS5zcmM7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIGJvZHkud2lkdGgsIGJvZHkuaGVpZ2h0KTtcbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3VybH0pYDtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc2VsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMubmFtZSA9IFwiRWFzZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgdGhpcy5jcmVhdGVTcHJpdGUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHBhcnRpY2xlLmJvZHkuc2NhbGVYID0gcGFydGljbGUuYm9keS5zY2FsZVkgPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICAgIHBhcnRpY2xlLmJvZHkucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnBhcmVudCAmJiBwYXJ0aWNsZS5ib2R5LnBhcmVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUuZ3JhcGhpY3MpIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuZ3JhcGhpY3MpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBjcmVhdGVTcHJpdGUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5LnBhcmVudCkgcmV0dXJuO1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5W1wiaW1hZ2VcIl0pIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWCA9IHBhcnRpY2xlLmJvZHkuaW1hZ2Uud2lkdGggLyAyO1xuICAgICAgcGFydGljbGUuYm9keS5yZWdZID0gcGFydGljbGUuYm9keS5pbWFnZS5oZWlnaHQgLyAyO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gdGhpcy5wb29sLmdldChjcmVhdGVqcy5HcmFwaGljcyk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkpIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UodGhpcy5zdHJva2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UoXCIjMDAwMDAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCIpLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMucG9vbC5nZXQoY3JlYXRlanMuU2hhcGUsIFtncmFwaGljc10pO1xuXG4gICAgcGFydGljbGUuYm9keSA9IHNoYXBlO1xuICAgIHBhcnRpY2xlLmdyYXBoaWNzID0gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgcmVjdGFuZ2xlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLmNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhlbFJlbmRlcmVyXCI7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBjcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGUgPyByZWN0YW5nbGUgOiBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCh0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55LCB0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICB0aGlzLnJlY3RhbmdsZS54LFxuICAgICAgdGhpcy5yZWN0YW5nbGUueSxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLndpZHRoLFxuICAgICAgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhKSB7XG4gICAgICB0aGlzLnNldFBpeGVsKFxuICAgICAgICB0aGlzLmltYWdlRGF0YSxcbiAgICAgICAgKHBhcnRpY2xlLnAueCAtIHRoaXMucmVjdGFuZ2xlLngpID4+IDAsXG4gICAgICAgIChwYXJ0aWNsZS5wLnkgLSB0aGlzLnJlY3RhbmdsZS55KSA+PiAwLFxuICAgICAgICBwYXJ0aWNsZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQaXhlbChpbWFnZWRhdGEsIHgsIHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgcmdiID0gcGFydGljbGUucmdiO1xuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5lbGVtZW50LndpZHRoIHx8IHkgPCAwIHx8IHkgPiB0aGlzLmVsZW1lbnQuaGVpZ2h0KSByZXR1cm47XG5cbiAgICBjb25zdCBpID0gKCh5ID4+IDApICogaW1hZ2VkYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpbWFnZWRhdGEuZGF0YVtpXSA9IHJnYi5yO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAxXSA9IHJnYi5nO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAyXSA9IHJnYi5iO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAzXSA9IHBhcnRpY2xlLmFscGhhICogMjU1O1xuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICAgIHRoaXMucmVjdGFuZ2xlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFR5cGVzIGZyb20gXCIuLi91dGlscy9UeXBlc1wiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmxldCBQSVhJQ2xhc3M7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhpUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMuY29sb3IgPSBmYWxzZTtcbiAgICB0aGlzLnNldENvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5ibGVuZE1vZGUgPSBudWxsO1xuICAgIHRoaXMucG9vbC5jcmVhdGUgPSAoYm9keSwgcGFydGljbGUpID0+IHRoaXMuY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXRQSVhJKHdpbmRvdy5QSVhJKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUGl4aVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRQSVhJKFBJWEkpIHtcbiAgICB0cnkge1xuICAgICAgUElYSUNsYXNzID0gUElYSSB8fCB7IFNwcml0ZToge30gfTtcbiAgICAgIHRoaXMuY3JlYXRlRnJvbUltYWdlID0gUElYSUNsYXNzLlNwcml0ZS5mcm9tIHx8IFBJWElDbGFzcy5TcHJpdGUuZnJvbUltYWdlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQocGFydGljbGUuYm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldCh0aGlzLmNpcmNsZUNvbmYsIHBhcnRpY2xlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ibGVuZE1vZGUpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkuYmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIHRoaXMudHJhbnNmb3JtKHBhcnRpY2xlLCBwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmICh0aGlzLnNldENvbG9yID09PSB0cnVlIHx8IHRoaXMuY29sb3IgPT09IHRydWUpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkudGludCA9IENvbG9yVXRpbC5nZXRIZXgxNkZyb21QYXJ0aWNsZShwYXJ0aWNsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgfVxuXG4gIHRyYW5zZm9ybShwYXJ0aWNsZSwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgdGFyZ2V0LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICB0YXJnZXQuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgIHRhcmdldC5zY2FsZS54ID0gcGFydGljbGUuc2NhbGU7XG4gICAgdGFyZ2V0LnNjYWxlLnkgPSBwYXJ0aWNsZS5zY2FsZTtcblxuICAgIC8vIHVzaW5nIGNhY2hlZCB2ZXJzaW9uIG9mIE1hdGhVdGlsLlBJXzE4MCBmb3Igc2xpZ2h0IHBlcmZvcm1hbmNlIGluY3JlYXNlLlxuICAgIHRhcmdldC5yb3RhdGlvbiA9IHBhcnRpY2xlLnJvdGF0aW9uICogTWF0aFV0aWwuUElfMTgwOyAvLyBNYXRoVXRpbC5QSV8xODA7XG4gIH1cblxuICBjcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKSB7XG4gICAgaWYgKGJvZHkuaXNDaXJjbGUpIHJldHVybiB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5jcmVhdGVTcHJpdGUoYm9keSk7XG4gIH1cblxuICBjcmVhdGVTcHJpdGUoYm9keSkge1xuICAgIGNvbnN0IHNwcml0ZSA9IGJvZHkuaXNJbm5lciA/IHRoaXMuY3JlYXRlRnJvbUltYWdlKGJvZHkuc3JjKSA6IG5ldyBQSVhJQ2xhc3MuU3ByaXRlKGJvZHkpO1xuXG4gICAgc3ByaXRlLmFuY2hvci54ID0gMC41O1xuICAgIHNwcml0ZS5hbmNob3IueSA9IDAuNTtcblxuICAgIHJldHVybiBzcHJpdGU7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBncmFwaGljcyA9IG5ldyBQSVhJQ2xhc3MuR3JhcGhpY3MoKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgY29uc3Qgc3Ryb2tlID0gVHlwZXMuaXNTdHJpbmcodGhpcy5zdHJva2UpID8gdGhpcy5zdHJva2UgOiAweDAwMDAwMDtcbiAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKHN0cm9rZSk7XG4gICAgfVxuXG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHBhcnRpY2xlLmNvbG9yIHx8IDB4MDA4Y2VkKTtcbiAgICBncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xuXG4gICAgcmV0dXJuIGdyYXBoaWNzO1xuICB9XG5cbiAgZGVzdHJveShwYXJ0aWNsZXMpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG5cbiAgICBsZXQgaSA9IHBhcnRpY2xlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IHBhcnRpY2xlID0gcGFydGljbGVzW2ldO1xuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdDMgZnJvbSBcIi4uL21hdGgvTWF0M1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNU3RhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hdHMgPSBbXTtcbiAgICB0aGlzLnNpemUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB0aGlzLm1hdHMucHVzaChNYXQzLmNyZWF0ZShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKTtcbiAgfVxuXG4gIHNldChtLCBpKSB7XG4gICAgaWYgKGkgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1tpIC0gMV0sIG0sIHRoaXMubWF0c1tpXSk7XG5cbiAgICB0aGlzLnNpemUgPSBNYXRoLm1heCh0aGlzLnNpemUsIGkgKyAxKTtcbiAgfVxuXG4gIHB1c2gobSkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1t0aGlzLnNpemUgLSAxXSwgbSwgdGhpcy5tYXRzW3RoaXMuc2l6ZV0pO1xuXG4gICAgdGhpcy5zaXplKys7XG4gIH1cblxuICBwb3AoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA+IDApIHRoaXMuc2l6ZS0tO1xuICB9XG5cbiAgdG9wKCkge1xuICAgIHJldHVybiB0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV07XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IE1TdGFjayBmcm9tIFwiLi4vdXRpbHMvTVN0YWNrXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IFdlYkdMVXRpbCBmcm9tIFwiLi4vdXRpbHMvV2ViR0xVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViR0xSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuZ2wgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiLCB7IGFudGlhbGlhczogdHJ1ZSwgc3RlbmNpbDogZmFsc2UsIGRlcHRoOiBmYWxzZSB9KTtcbiAgICBpZiAoIXRoaXMuZ2wpIGFsZXJ0KFwiU29ycnkgeW91ciBicm93c2VyIGRvIG5vdCBzdXBwZXN0IFdlYkdMIVwiKTtcblxuICAgIHRoaXMuaW5pdFZhcigpO1xuICAgIHRoaXMuc2V0TWF4UmFkaXVzKCk7XG4gICAgdGhpcy5pbml0U2hhZGVycygpO1xuICAgIHRoaXMuaW5pdEJ1ZmZlcnMoKTtcblxuICAgIHRoaXMuZ2wuYmxlbmRFcXVhdGlvbih0aGlzLmdsLkZVTkNfQUREKTtcbiAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICB0aGlzLmFkZEltZzJCb2R5ID0gdGhpcy5hZGRJbWcyQm9keS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJXZWJHTFJlbmRlcmVyXCI7XG4gIH1cblxuICBpbml0KHByb3Rvbikge1xuICAgIHN1cGVyLmluaXQocHJvdG9uKTtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnVtYXRbNF0gPSAtMjtcbiAgICB0aGlzLnVtYXRbN10gPSAxO1xuXG4gICAgdGhpcy5zbWF0WzBdID0gMSAvIHdpZHRoO1xuICAgIHRoaXMuc21hdFs0XSA9IDEgLyBoZWlnaHQ7XG5cbiAgICB0aGlzLm1zdGFjay5zZXQodGhpcy51bWF0LCAwKTtcbiAgICB0aGlzLm1zdGFjay5zZXQodGhpcy5zbWF0LCAxKTtcblxuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHNldE1heFJhZGl1cyhyYWRpdXMpIHtcbiAgICB0aGlzLmNpcmNsZUNhbnZhc1VSTCA9IHRoaXMuY3JlYXRlQ2lyY2xlKHJhZGl1cyk7XG4gIH1cblxuICBnZXRWZXJ0ZXhTaGFkZXIoKSB7XG4gICAgY29uc3QgdnNTb3VyY2UgPSBbXG4gICAgICBcInVuaWZvcm0gdmVjMiB2aWV3cG9ydDtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFxuICAgICAgXCJhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ1bmlmb3JtIG1hdDMgdE1hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInZvaWQgbWFpbigpIHtcIixcbiAgICAgIFwidmVjMyB2ID0gdE1hdCAqIHZlYzMoYVZlcnRleFBvc2l0aW9uLCAxLjApO1wiLFxuICAgICAgXCJnbF9Qb3NpdGlvbiA9IHZlYzQodi54LCB2LnksIDAsIDEpO1wiLFxuICAgICAgXCJ2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwiYWxwaGEgPSB0TWF0WzBdWzJdO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHZzU291cmNlO1xuICB9XG5cbiAgZ2V0RnJhZ21lbnRTaGFkZXIoKSB7XG4gICAgY29uc3QgZnNTb3VyY2UgPSBbXG4gICAgICBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFxuICAgICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidmFyeWluZyBmbG9hdCBhbHBoYTtcIixcbiAgICAgIFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXG4gICAgICBcInVuaWZvcm0gdmVjNCBjb2xvcjtcIixcbiAgICAgIFwidW5pZm9ybSBib29sIHVzZVRleHR1cmU7XCIsXG4gICAgICBcInVuaWZvcm0gdmVjMyB1Q29sb3I7XCIsXG4gICAgICBcInZvaWQgbWFpbigpIHtcIixcbiAgICAgIFwidmVjNCB0ZXh0dXJlQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFxuICAgICAgXCJnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlQ29sb3IgKiB2ZWM0KHVDb2xvciwgMS4wKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yLncgKj0gYWxwaGE7XCIsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gZnNTb3VyY2U7XG4gIH1cblxuICBpbml0VmFyKCkge1xuICAgIHRoaXMubXN0YWNrID0gbmV3IE1TdGFjaygpO1xuICAgIHRoaXMudW1hdCA9IE1hdDMuY3JlYXRlKFsyLCAwLCAxLCAwLCAtMiwgMCwgLTEsIDEsIDFdKTtcbiAgICB0aGlzLnNtYXQgPSBNYXQzLmNyZWF0ZShbMSAvIDEwMCwgMCwgMSwgMCwgMSAvIDEwMCwgMCwgMCwgMCwgMV0pO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSB7fTtcbiAgfVxuXG4gIGJsZW5kRXF1YXRpb24oQSkge1xuICAgIHRoaXMuZ2wuYmxlbmRFcXVhdGlvbih0aGlzLmdsW0FdKTtcbiAgfVxuXG4gIGJsZW5kRnVuYyhBLCBCKSB7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbFtBXSwgdGhpcy5nbFtCXSk7XG4gIH1cblxuICBnZXRTaGFkZXIoZ2wsIHN0ciwgZnMpIHtcbiAgICBjb25zdCBzaGFkZXIgPSBmcyA/IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpIDogZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc3RyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgYWxlcnQoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBpbml0U2hhZGVycygpIHtcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0RnJhZ21lbnRTaGFkZXIoKSwgdHJ1ZSk7XG4gICAgY29uc3QgdmVydGV4U2hhZGVyID0gdGhpcy5nZXRTaGFkZXIodGhpcy5nbCwgdGhpcy5nZXRWZXJ0ZXhTaGFkZXIoKSwgZmFsc2UpO1xuXG4gICAgdGhpcy5zcHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5zcHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIHRoaXMuZ2wubGlua1Byb2dyYW0odGhpcy5zcHJvZ3JhbSk7XG5cbiAgICBpZiAoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnNwcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkgYWxlcnQoXCJDb3VsZCBub3QgaW5pdGlhbGlzZSBzaGFkZXJzXCIpO1xuXG4gICAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuICAgIHRoaXMuc3Byb2dyYW0udnBhID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcImFWZXJ0ZXhQb3NpdGlvblwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnRjYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVGV4dHVyZUNvb3JkXCIpO1xuICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zcHJvZ3JhbS50Y2EpO1xuICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zcHJvZ3JhbS52cGEpO1xuXG4gICAgdGhpcy5zcHJvZ3JhbS50TWF0VW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidE1hdFwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnNhbXBsZXJVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1U2FtcGxlclwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnVzZVRleCA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidXNlVGV4dHVyZVwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLmNvbG9yID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1Q29sb3JcIik7XG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zcHJvZ3JhbS51c2VUZXgsIDEpO1xuICB9XG5cbiAgaW5pdEJ1ZmZlcnMoKSB7XG4gICAgY29uc3QgdnMgPSBbMCwgMywgMSwgMCwgMiwgM107XG4gICAgbGV0IGlkeDtcblxuICAgIHRoaXMudW5pdElCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KHZzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBsZXQgaTtcbiAgICBsZXQgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpKTtcbiAgICBpZHggPSBuZXcgVWludDE2QXJyYXkoaWRzKTtcblxuICAgIHRoaXMudW5pdEkzMyA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdEkzMyk7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGlkeCwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBpZHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTAwOyBpKyspIGlkcy5wdXNoKGksIGkgKyAxLCBpICsgMik7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnN0cmlwQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5zdHJpcEJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGlkeCwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocmFpZHVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgPSBXZWJHTFV0aWwubmhwb3QoVXRpbC5pbml0VmFsdWUocmFpZHVzLCAzMikpO1xuICAgIGNvbnN0IGNhbnZhcyA9IERvbVV0aWwuY3JlYXRlQ2FudmFzKFwiY2lyY2xlX2NhbnZhc1wiLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzICogMik7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuYXJjKHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgY29udGV4dC5maWxsKCk7XG5cbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgpO1xuICB9XG5cbiAgZHJhd0ltZzJDYW52YXMocGFydGljbGUpIHtcbiAgICBjb25zdCBfdyA9IHBhcnRpY2xlLmJvZHkud2lkdGg7XG4gICAgY29uc3QgX2ggPSBwYXJ0aWNsZS5ib2R5LmhlaWdodDtcblxuICAgIGNvbnN0IF93aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LndpZHRoKTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KHBhcnRpY2xlLmJvZHkuaGVpZ2h0KTtcblxuICAgIGNvbnN0IF9zY2FsZVggPSBwYXJ0aWNsZS5ib2R5LndpZHRoIC8gX3dpZHRoO1xuICAgIGNvbnN0IF9zY2FsZVkgPSBwYXJ0aWNsZS5ib2R5LmhlaWdodCAvIF9oZWlnaHQ7XG5cbiAgICBpZiAoIXRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdKVxuICAgICAgdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY10gPSBbXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpLFxuICAgICAgICB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpLFxuICAgICAgICB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgICBdO1xuXG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMF07XG4gICAgcGFydGljbGUuZGF0YS52Y0J1ZmZlciA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzFdO1xuICAgIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsyXTtcblxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS50Y0J1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKFxuICAgICAgdGhpcy5nbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgX3NjYWxlWCwgMC4wLCAwLjAsIF9zY2FsZVksIF9zY2FsZVksIF9zY2FsZVldKSxcbiAgICAgIHRoaXMuZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS52Y0J1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKFxuICAgICAgdGhpcy5nbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgX3csIDAuMCwgMC4wLCBfaCwgX3csIF9oXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBwYXJ0aWNsZS5kYXRhLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIF93aWR0aCwgX2hlaWdodCk7XG5cbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVIpO1xuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCk7XG4gICAgdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLmdsLlRFWFRVUkVfMkQpO1xuXG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkID0gdHJ1ZTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCA9IF93O1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUhlaWdodCA9IF9oO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgLy8gdGhpcy5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDEpO1xuICAgIC8vIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkID0gZmFsc2U7XG4gICAgcGFydGljbGUuZGF0YS50bWF0ID0gTWF0My5jcmVhdGUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRtYXRbOF0gPSAxO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS5pbWF0WzhdID0gMTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHRoaXMuY2lyY2xlQ2FudmFzVVJMLCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgICBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlID0gcGFydGljbGUucmFkaXVzIC8gdGhpcy5jaXJjbGVDYW52YXNSYWRpdXM7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gaW1nO1xuICAgIHBhcnRpY2xlLmRhdGEuc3JjID0gaW1nLnNyYztcbiAgICBwYXJ0aWNsZS5kYXRhLmNhbnZhcyA9IEltZ1V0aWwuZ2V0Q2FudmFzRnJvbUNhY2hlKGltZyk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IDE7XG5cbiAgICB0aGlzLmRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKTtcbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkKSB7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeChwYXJ0aWNsZSk7XG5cbiAgICAgIHRoaXMuZ2wudW5pZm9ybTNmKHRoaXMuc3Byb2dyYW0uY29sb3IsIHBhcnRpY2xlLnJnYi5yIC8gMjU1LCBwYXJ0aWNsZS5yZ2IuZyAvIDI1NSwgcGFydGljbGUucmdiLmIgLyAyNTUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4M2Z2KHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0sIGZhbHNlLCB0aGlzLm1zdGFjay50b3AoKSk7XG5cbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS52Y0J1ZmZlcik7XG4gICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zcHJvZ3JhbS52cGEsIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS50Y0J1ZmZlcik7XG4gICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zcHJvZ3JhbS50Y2EsIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBwYXJ0aWNsZS5kYXRhLnRleHR1cmUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG5cbiAgICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuZ2wuVFJJQU5HTEVTLCA2LCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKTtcbiAgICAgIHRoaXMubXN0YWNrLnBvcCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIHVwZGF0ZU1hdHJpeChwYXJ0aWNsZSkge1xuICAgIGNvbnN0IG1vdmVPcmlnaW5NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKFxuICAgICAgLXBhcnRpY2xlLmRhdGEudGV4dHVyZVdpZHRoIC8gMixcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgLyAyXG4gICAgKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlVHJhbnNsYXRpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuXG4gICAgY29uc3QgYW5nZWwgPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDtcbiAgICBjb25zdCByb3RhdGlvbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlUm90YXRpb24oYW5nZWwpO1xuXG4gICAgY29uc3Qgc2NhbGUgPSBwYXJ0aWNsZS5zY2FsZSAqIHBhcnRpY2xlLmRhdGEub2xkU2NhbGU7XG4gICAgY29uc3Qgc2NhbGVNYXRyaXggPSBXZWJHTFV0aWwubWFrZVNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgbGV0IG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtb3ZlT3JpZ2luTWF0cml4LCBzY2FsZU1hdHJpeCk7XG5cbiAgICBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobWF0cml4LCByb3RhdGlvbk1hdHJpeCk7XG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgdHJhbnNsYXRpb25NYXRyaXgpO1xuXG4gICAgTWF0My5pbnZlcnNlKG1hdHJpeCwgcGFydGljbGUuZGF0YS5pbWF0KTtcbiAgICBtYXRyaXhbMl0gPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgIHRoaXMubXN0YWNrLnB1c2gobWF0cml4KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuZ2wgPSBudWxsO1xuICAgIHRoaXMubXN0YWNrID0gbnVsbDtcbiAgICB0aGlzLnVtYXQgPSBudWxsO1xuICAgIHRoaXMuc21hdCA9IG51bGw7XG4gICAgdGhpcy50ZXh0dXJlYnVmZmVycyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJDdXN0b21SZW5kZXJlclwiO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgxLCB5MSwgeDIsIHkyLCBkaXJlY3Rpb24pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHgyIC0geDEgPj0gMCkge1xuICAgICAgdGhpcy54MSA9IHgxO1xuICAgICAgdGhpcy55MSA9IHkxO1xuICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgdGhpcy55MiA9IHkyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLngxID0geDI7XG4gICAgICB0aGlzLnkxID0geTI7XG4gICAgICB0aGlzLngyID0geDE7XG4gICAgICB0aGlzLnkyID0geTE7XG4gICAgfVxuXG4gICAgdGhpcy5keCA9IHRoaXMueDIgLSB0aGlzLngxO1xuICAgIHRoaXMuZHkgPSB0aGlzLnkyIC0gdGhpcy55MTtcblxuICAgIHRoaXMubWlueCA9IE1hdGgubWluKHRoaXMueDEsIHRoaXMueDIpO1xuICAgIHRoaXMubWlueSA9IE1hdGgubWluKHRoaXMueTEsIHRoaXMueTIpO1xuICAgIHRoaXMubWF4eCA9IE1hdGgubWF4KHRoaXMueDEsIHRoaXMueDIpO1xuICAgIHRoaXMubWF4eSA9IE1hdGgubWF4KHRoaXMueTEsIHRoaXMueTIpO1xuXG4gICAgdGhpcy5kb3QgPSB0aGlzLngyICogdGhpcy55MSAtIHRoaXMueDEgKiB0aGlzLnkyO1xuICAgIHRoaXMueHh5eSA9IHRoaXMuZHggKiB0aGlzLmR4ICsgdGhpcy5keSAqIHRoaXMuZHk7XG5cbiAgICB0aGlzLmdyYWRpZW50ID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5nZXRMZW5ndGgoKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IFV0aWwuaW5pdFZhbHVlKGRpcmVjdGlvbiwgXCI+XCIpO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5yYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLngxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguY29zKHRoaXMuZ3JhZGllbnQpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguc2luKHRoaXMuZ3JhZGllbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uKHgsIHkpIHtcbiAgICBjb25zdCBBID0gdGhpcy5keTtcbiAgICBjb25zdCBCID0gLXRoaXMuZHg7XG4gICAgY29uc3QgQyA9IHRoaXMuZG90O1xuICAgIGNvbnN0IEQgPSBCID09PSAwID8gMSA6IEI7XG5cbiAgICBpZiAoKEEgKiB4ICsgQiAqIHkgKyBDKSAqIEQgPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldERpc3RhbmNlKHgsIHkpIHtcbiAgICBjb25zdCBBID0gdGhpcy5keTtcbiAgICBjb25zdCBCID0gLXRoaXMuZHg7XG4gICAgY29uc3QgQyA9IHRoaXMuZG90O1xuICAgIGNvbnN0IEQgPSBBICogeCArIEIgKiB5ICsgQztcblxuICAgIHJldHVybiBEIC8gTWF0aC5zcXJ0KHRoaXMueHh5eSk7XG4gIH1cblxuICBnZXRTeW1tZXRyaWModikge1xuICAgIGNvbnN0IHRoYTIgPSB2LmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhMSA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcblxuICAgIGNvbnN0IG9sZHggPSB2Lng7XG4gICAgY29uc3Qgb2xkeSA9IHYueTtcblxuICAgIHYueCA9IG9sZHggKiBNYXRoLmNvcyh0aGEpIC0gb2xkeSAqIE1hdGguc2luKHRoYSk7XG4gICAgdi55ID0gb2xkeCAqIE1hdGguc2luKHRoYSkgKyBvbGR5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgZ2V0R3JhZGllbnQoKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy5keSwgdGhpcy5keCk7XG4gIH1cblxuICByYW5nZU91dChwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hYnModGhpcy5nZXRHcmFkaWVudCgpKTtcblxuICAgIGlmIChhbmdsZSA8PSBNYXRoVXRpbC5QSSAvIDQpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggPD0gdGhpcy5tYXh4ICYmIHBhcnRpY2xlLnAueCA+PSB0aGlzLm1pbngpIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFydGljbGUucC55IDw9IHRoaXMubWF4eSAmJiBwYXJ0aWNsZS5wLnkgPj0gdGhpcy5taW55KSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5KTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcIj5cIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJSXCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwicmlnaHRcIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJkb3duXCIpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLmdldERpcmVjdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuXG4gICAgICBpZiAodGhpcy5nZXREaXN0YW5jZShwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkgPD0gcGFydGljbGUucmFkaXVzKSB7XG4gICAgICAgIGlmICh0aGlzLmR4ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHkgPT09IDApIHtcbiAgICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nZXRTeW1tZXRyaWMocGFydGljbGUudik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgTGluZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCByYWRpdXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgIHRoaXMuY2VudGVyID0geyB4LCB5IH07XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEl4MiAqIE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy5yYW5kb21SYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIHRoaXMucmFuZG9tUmFkaXVzICogTWF0aC5jb3ModGhpcy5hbmdsZSk7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueSArIHRoaXMucmFuZG9tUmFkaXVzICogTWF0aC5zaW4odGhpcy5hbmdsZSk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBzZXRDZW50ZXIoeCwgeSkge1xuICAgIHRoaXMuY2VudGVyLnggPSB4O1xuICAgIHRoaXMuY2VudGVyLnkgPSB5O1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBjb25zdCBkID0gcGFydGljbGUucC5kaXN0YW5jZVRvKHRoaXMuY2VudGVyKTtcblxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChkIC0gcGFydGljbGUucmFkaXVzID4gdGhpcy5yYWRpdXMpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKGQgKyBwYXJ0aWNsZS5yYWRpdXMgPj0gdGhpcy5yYWRpdXMpIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgQ2lyY2xlWm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzIG1ldGhvZCFcIik7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRTeW1tZXRyaWMocGFydGljbGUpIHtcbiAgICBjb25zdCB0aGEyID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KHBhcnRpY2xlKTtcblxuICAgIGNvbnN0IHRoYSA9IDIgKiAodGhhMSAtIHRoYTIpO1xuICAgIGNvbnN0IG9sZHggPSBwYXJ0aWNsZS52Lng7XG4gICAgY29uc3Qgb2xkeSA9IHBhcnRpY2xlLnYueTtcblxuICAgIHBhcnRpY2xlLnYueCA9IG9sZHggKiBNYXRoLmNvcyh0aGEpIC0gb2xkeSAqIE1hdGguc2luKHRoYSk7XG4gICAgcGFydGljbGUudi55ID0gb2xkeCAqIE1hdGguc2luKHRoYSkgKyBvbGR5ICogTWF0aC5jb3ModGhhKTtcbiAgfVxuXG4gIGdldEdyYWRpZW50KHBhcnRpY2xlKSB7XG4gICAgcmV0dXJuIC1NYXRoVXRpbC5QSV8yICsgTWF0aC5hdGFuMihwYXJ0aWNsZS5wLnkgLSB0aGlzLmNlbnRlci55LCBwYXJ0aWNsZS5wLnggLSB0aGlzLmNlbnRlci54KTtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0Wm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGg7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodDtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgLy8gcGFydGljbGUgZGVhZCB6b25lXG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gcGFydGljbGUgYm91bmQgem9uZVxuICAgIGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGgpIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgdGhpcy53aWR0aCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy55KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGNyb3NzIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54ICYmIHBhcnRpY2xlLnYueCA8PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGggJiYgcGFydGljbGUudi54ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55ICYmIHBhcnRpY2xlLnYueSA8PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCAmJiBwYXJ0aWNsZS52LnkgPj0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlc2V0KGltYWdlRGF0YSwgeCwgeSwgZCk7XG4gIH1cblxuICByZXNldChpbWFnZURhdGEsIHgsIHksIGQpIHtcbiAgICB0aGlzLmltYWdlRGF0YSA9IGltYWdlRGF0YTtcbiAgICB0aGlzLnggPSBVdGlsLmluaXRWYWx1ZSh4LCAwKTtcbiAgICB0aGlzLnkgPSBVdGlsLmluaXRWYWx1ZSh5LCAwKTtcbiAgICB0aGlzLmQgPSBVdGlsLmluaXRWYWx1ZShkLCAyKTtcblxuICAgIHRoaXMudmVjdG9ycyA9IFtdO1xuICAgIHRoaXMuc2V0VmVjdG9ycygpO1xuICB9XG5cbiAgc2V0VmVjdG9ycygpIHtcbiAgICBsZXQgaSwgajtcbiAgICBjb25zdCBsZW5ndGgxID0gdGhpcy5pbWFnZURhdGEud2lkdGg7XG4gICAgY29uc3QgbGVuZ3RoMiA9IHRoaXMuaW1hZ2VEYXRhLmhlaWdodDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgxOyBpICs9IHRoaXMuZCkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGxlbmd0aDI7IGogKz0gdGhpcy5kKSB7XG4gICAgICAgIGxldCBpbmRleCA9ICgoaiA+PiAwKSAqIGxlbmd0aDEgKyAoaSA+PiAwKSkgKiA0O1xuXG4gICAgICAgIGlmICh0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPiAwKSB7XG4gICAgICAgICAgdGhpcy52ZWN0b3JzLnB1c2goeyB4OiBpICsgdGhpcy54LCB5OiBqICsgdGhpcy55IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgZ2V0Qm91bmQoeCwgeSkge1xuICAgIGNvbnN0IGluZGV4ID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIGlmICh0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHZlY3RvciA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLnZlY3RvcnMpO1xuICAgIHJldHVybiB0aGlzLnZlY3Rvci5jb3B5KHZlY3Rvcik7XG4gIH1cblxuICBnZXRDb2xvcih4LCB5KSB7XG4gICAgeCAtPSB0aGlzLng7XG4gICAgeSAtPSB0aGlzLnk7XG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcblxuICAgIHJldHVybiB7XG4gICAgICByOiB0aGlzLmltYWdlRGF0YS5kYXRhW2ldLFxuICAgICAgZzogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMV0sXG4gICAgICBiOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAyXSxcbiAgICAgIGE6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDNdXG4gICAgfTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHRoaXMuZ2V0Qm91bmQocGFydGljbGUucC54IC0gdGhpcy54LCBwYXJ0aWNsZS5wLnkgLSB0aGlzLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgcGFydGljbGUuZGVhZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKCF0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUudi5uZWdhdGUoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4uL3pvbmUvQ2lyY2xlWm9uZVwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IFJlY3Rab25lIGZyb20gXCIuLi96b25lL1JlY3Rab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sIGZ1bmMpIHtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgKCkgPT4gZnVuYygpKTtcbiAgfSxcblxuICBnZXRTdHlsZShjb2xvciA9IFwiI2ZmMDAwMFwiKSB7XG4gICAgY29uc3QgcmdiID0gQ29sb3JVdGlsLmhleFRvUmdiKGNvbG9yKTtcbiAgICByZXR1cm4gYHJnYmEoJHtyZ2Iucn0sICR7cmdiLmd9LCAke3JnYi5ifSwgMC41KWA7XG4gIH0sXG5cbiAgZHJhd1pvbmUocHJvdG9uLCBjYW52YXMsIHpvbmUsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGlmICh6b25lIGluc3RhbmNlb2YgUG9pbnRab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIExpbmVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oem9uZS54MSwgem9uZS55MSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHpvbmUueDIsIHpvbmUueTIpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgUmVjdFpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmRyYXdSZWN0KHpvbmUueCwgem9uZS55LCB6b25lLndpZHRoLCB6b25lLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBDaXJjbGVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5hcmMoem9uZS54LCB6b25lLnksIHpvbmUucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZHJhd0VtaXR0ZXIocHJvdG9uLCBjYW52YXMsIGVtaXR0ZXIsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgY29udGV4dC5hcmMoZW1pdHRlci5wLngsIGVtaXR0ZXIucC55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuL2NvcmUvUGFydGljbGVcIjtcbmltcG9ydCBQb29sIGZyb20gXCIuL2NvcmUvUG9vbFwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi9tYXRoL1BvbGFyMkRcIjtcbmltcG9ydCBNYXQzIGZyb20gXCIuL21hdGgvTWF0M1wiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi9tYXRoL2Vhc2VcIjtcblxuaW1wb3J0IFJhdGUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9pbml0aWFsaXplL0luaXRpYWxpemVcIjtcbmltcG9ydCBMaWZlIGZyb20gXCIuL2luaXRpYWxpemUvTGlmZVwiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL2luaXRpYWxpemUvUG9zaXRpb25cIjtcbmltcG9ydCBWZWxvY2l0eSBmcm9tIFwiLi9pbml0aWFsaXplL1ZlbG9jaXR5XCI7XG5pbXBvcnQgTWFzcyBmcm9tIFwiLi9pbml0aWFsaXplL01hc3NcIjtcbmltcG9ydCBSYWRpdXMgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYWRpdXNcIjtcbmltcG9ydCBCb2R5IGZyb20gXCIuL2luaXRpYWxpemUvQm9keVwiO1xuXG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL2JlaGF2aW91ci9CZWhhdmlvdXJcIjtcbmltcG9ydCBGb3JjZSBmcm9tIFwiLi9iZWhhdmlvdXIvRm9yY2VcIjtcbmltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL2JlaGF2aW91ci9BdHRyYWN0aW9uXCI7XG5pbXBvcnQgUmFuZG9tRHJpZnQgZnJvbSBcIi4vYmVoYXZpb3VyL1JhbmRvbURyaWZ0XCI7XG5pbXBvcnQgR3Jhdml0eSBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVwiO1xuaW1wb3J0IENvbGxpc2lvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sbGlzaW9uXCI7XG5pbXBvcnQgQ3Jvc3Nab25lIGZyb20gXCIuL2JlaGF2aW91ci9Dcm9zc1pvbmVcIjtcbmltcG9ydCBBbHBoYSBmcm9tIFwiLi9iZWhhdmlvdXIvQWxwaGFcIjtcbmltcG9ydCBTY2FsZSBmcm9tIFwiLi9iZWhhdmlvdXIvU2NhbGVcIjtcbmltcG9ydCBSb3RhdGUgZnJvbSBcIi4vYmVoYXZpb3VyL1JvdGF0ZVwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuL2JlaGF2aW91ci9Db2xvclwiO1xuaW1wb3J0IEN5Y2xvbmUgZnJvbSBcIi4vYmVoYXZpb3VyL0N5Y2xvbmVcIjtcbmltcG9ydCBSZXB1bHNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL1JlcHVsc2lvblwiO1xuaW1wb3J0IEdyYXZpdHlXZWxsIGZyb20gXCIuL2JlaGF2aW91ci9HcmF2aXR5V2VsbFwiO1xuXG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0VtaXR0ZXJcIjtcbmltcG9ydCBCZWhhdmlvdXJFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlclwiO1xuaW1wb3J0IEZvbGxvd0VtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9Gb2xsb3dFbWl0dGVyXCI7XG5cbmltcG9ydCBDYW52YXNSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ2FudmFzUmVuZGVyZXJcIjtcbmltcG9ydCBEb21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRG9tUmVuZGVyZXJcIjtcbmltcG9ydCBFYXNlbFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9FYXNlbFJlbmRlcmVyXCI7XG5pbXBvcnQgUGl4ZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4ZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGlSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4aVJlbmRlcmVyXCI7XG5pbXBvcnQgV2ViR0xSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvV2ViR0xSZW5kZXJlclwiO1xuaW1wb3J0IEN1c3RvbVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9DdXN0b21SZW5kZXJlclwiO1xuXG5pbXBvcnQgWm9uZSBmcm9tIFwiLi96b25lL1pvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi96b25lL0xpbmVab25lXCI7XG5pbXBvcnQgQ2lyY2xlWm9uZSBmcm9tIFwiLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi96b25lL1JlY3Rab25lXCI7XG5pbXBvcnQgSW1hZ2Vab25lIGZyb20gXCIuL3pvbmUvSW1hZ2Vab25lXCI7XG5cbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi9kZWJ1Zy9EZWJ1Z1wiO1xuXG4vLyBuYW1lc3BhY2VcblByb3Rvbi5QYXJ0aWNsZSA9IFBhcnRpY2xlO1xuUHJvdG9uLlBvb2wgPSBQb29sO1xuXG5Qcm90b24uVXRpbCA9IFV0aWw7XG5Qcm90b24uQ29sb3JVdGlsID0gQ29sb3JVdGlsO1xuUHJvdG9uLk1hdGhVdGlsID0gTWF0aFV0aWw7XG5Qcm90b24uVmVjdG9yMkQgPSBQcm90b24uVmVjdG9yID0gVmVjdG9yMkQ7XG5Qcm90b24uUG9sYXIyRCA9IFByb3Rvbi5Qb2xhciA9IFBvbGFyMkQ7XG5Qcm90b24uQXJyYXlTcGFuID0gQXJyYXlTcGFuO1xuUHJvdG9uLlJlY3RhbmdsZSA9IFJlY3RhbmdsZTtcblByb3Rvbi5SYXRlID0gUmF0ZTtcblByb3Rvbi5lYXNlID0gZWFzZTtcblByb3Rvbi5TcGFuID0gU3BhbjtcblByb3Rvbi5NYXQzID0gTWF0MztcblByb3Rvbi5nZXRTcGFuID0gKGEsIGIsIGNlbnRlcikgPT4gbmV3IFNwYW4oYSwgYiwgY2VudGVyKTtcblByb3Rvbi5jcmVhdGVBcnJheVNwYW4gPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuO1xuXG5Qcm90b24uSW5pdGlhbGl6ZSA9IFByb3Rvbi5Jbml0ID0gSW5pdGlhbGl6ZTtcblByb3Rvbi5MaWZlID0gUHJvdG9uLkwgPSBMaWZlO1xuUHJvdG9uLlBvc2l0aW9uID0gUHJvdG9uLlAgPSBQb3NpdGlvbjtcblByb3Rvbi5WZWxvY2l0eSA9IFByb3Rvbi5WID0gVmVsb2NpdHk7XG5Qcm90b24uTWFzcyA9IFByb3Rvbi5NID0gTWFzcztcblByb3Rvbi5SYWRpdXMgPSBQcm90b24uUiA9IFJhZGl1cztcblByb3Rvbi5Cb2R5ID0gUHJvdG9uLkIgPSBCb2R5O1xuXG5Qcm90b24uQmVoYXZpb3VyID0gQmVoYXZpb3VyO1xuUHJvdG9uLkZvcmNlID0gUHJvdG9uLkYgPSBGb3JjZTtcblByb3Rvbi5BdHRyYWN0aW9uID0gUHJvdG9uLkEgPSBBdHRyYWN0aW9uO1xuUHJvdG9uLlJhbmRvbURyaWZ0ID0gUHJvdG9uLlJEID0gUmFuZG9tRHJpZnQ7XG5Qcm90b24uR3Jhdml0eSA9IFByb3Rvbi5HID0gR3Jhdml0eTtcblByb3Rvbi5Db2xsaXNpb24gPSBDb2xsaXNpb247XG5Qcm90b24uQ3Jvc3Nab25lID0gQ3Jvc3Nab25lO1xuUHJvdG9uLkFscGhhID0gQWxwaGE7XG5Qcm90b24uU2NhbGUgPSBQcm90b24uUyA9IFNjYWxlO1xuUHJvdG9uLlJvdGF0ZSA9IFJvdGF0ZTtcblByb3Rvbi5Db2xvciA9IENvbG9yO1xuUHJvdG9uLlJlcHVsc2lvbiA9IFJlcHVsc2lvbjtcblByb3Rvbi5DeWNsb25lID0gQ3ljbG9uZTtcblByb3Rvbi5HcmF2aXR5V2VsbCA9IEdyYXZpdHlXZWxsO1xuXG5Qcm90b24uRW1pdHRlciA9IEVtaXR0ZXI7XG5Qcm90b24uQmVoYXZpb3VyRW1pdHRlciA9IEJlaGF2aW91ckVtaXR0ZXI7XG5Qcm90b24uRm9sbG93RW1pdHRlciA9IEZvbGxvd0VtaXR0ZXI7XG5cblByb3Rvbi5ab25lID0gWm9uZTtcblByb3Rvbi5MaW5lWm9uZSA9IExpbmVab25lO1xuUHJvdG9uLkNpcmNsZVpvbmUgPSBDaXJjbGVab25lO1xuUHJvdG9uLlBvaW50Wm9uZSA9IFBvaW50Wm9uZTtcblByb3Rvbi5SZWN0Wm9uZSA9IFJlY3Rab25lO1xuUHJvdG9uLkltYWdlWm9uZSA9IEltYWdlWm9uZTtcblxuUHJvdG9uLkNhbnZhc1JlbmRlcmVyID0gQ2FudmFzUmVuZGVyZXI7XG5Qcm90b24uRG9tUmVuZGVyZXIgPSBEb21SZW5kZXJlcjtcblByb3Rvbi5FYXNlbFJlbmRlcmVyID0gRWFzZWxSZW5kZXJlcjtcblByb3Rvbi5QaXhpUmVuZGVyZXIgPSBQaXhpUmVuZGVyZXI7XG5Qcm90b24uUGl4ZWxSZW5kZXJlciA9IFBpeGVsUmVuZGVyZXI7XG5Qcm90b24uV2ViR0xSZW5kZXJlciA9IFByb3Rvbi5XZWJHbFJlbmRlcmVyID0gV2ViR0xSZW5kZXJlcjtcblByb3Rvbi5DdXN0b21SZW5kZXJlciA9IEN1c3RvbVJlbmRlcmVyO1xuXG5Qcm90b24uRGVidWcgPSBEZWJ1ZztcblV0aWwuYXNzaWduKFByb3RvbiwgZWFzZSk7XG5cbi8vIGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgUHJvdG9uO1xuIl0sIm5hbWVzIjpbImlwb3QiLCJsZW5ndGgiLCJuaHBvdCIsImkiLCJtYWtlVHJhbnNsYXRpb24iLCJ0eCIsInR5IiwibWFrZVJvdGF0aW9uIiwiYW5nbGVJblJhZGlhbnMiLCJjIiwiTWF0aCIsImNvcyIsInMiLCJzaW4iLCJtYWtlU2NhbGUiLCJzeCIsInN5IiwibWF0cml4TXVsdGlwbHkiLCJhIiwiYiIsImEwMCIsImEwMSIsImEwMiIsImExMCIsImExMSIsImExMiIsImEyMCIsImEyMSIsImEyMiIsImIwMCIsImIwMSIsImIwMiIsImIxMCIsImIxMSIsImIxMiIsImIyMCIsImIyMSIsImIyMiIsImNyZWF0ZUNhbnZhcyIsImlkIiwid2lkdGgiLCJoZWlnaHQiLCJwb3NpdGlvbiIsImRvbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwib3BhY2l0eSIsInRyYW5zZm9ybSIsImNyZWF0ZURpdiIsInJlc2l6ZSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJkaXYiLCJ4IiwieSIsInNjYWxlIiwicm90YXRlIiwid2lsbENoYW5nZSIsImNzczMiLCJ0cmFuc2Zvcm0zZCIsImtleSIsInZhbCIsImJrZXkiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImltZ3NDYWNoZSIsImNhbnZhc0NhY2hlIiwiY2FudmFzSWQiLCJnZXRJbWFnZURhdGEiLCJjb250ZXh0IiwiaW1hZ2UiLCJyZWN0IiwiZHJhd0ltYWdlIiwiaW1hZ2VkYXRhIiwiY2xlYXJSZWN0IiwiZ2V0SW1nRnJvbUNhY2hlIiwiaW1nIiwiY2FsbGJhY2siLCJwYXJhbSIsInNyYyIsIkltYWdlIiwib25sb2FkIiwiZSIsInRhcmdldCIsImdldENhbnZhc0Zyb21DYWNoZSIsIldlYkdMVXRpbCIsImNhbnZhcyIsIkRvbVV0aWwiLCJnZXRDb250ZXh0IiwiaW5pdFZhbHVlIiwidmFsdWUiLCJkZWZhdWx0cyIsInVuZGVmaW5lZCIsImlzQXJyYXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJlbXB0eUFycmF5IiwiYXJyIiwidG9BcnJheSIsInNsaWNlQXJyYXkiLCJhcnIxIiwiaW5kZXgiLCJhcnIyIiwicHVzaCIsImdldFJhbmRGcm9tQXJyYXkiLCJmbG9vciIsInJhbmRvbSIsImVtcHR5T2JqZWN0Iiwib2JqIiwiaWdub3JlIiwiaW5kZXhPZiIsImNsYXNzQXBwbHkiLCJjb25zdHJ1Y3RvciIsImFyZ3MiLCJGYWN0b3J5RnVuYyIsImJpbmQiLCJhcHBseSIsImNvbmNhdCIsIkltZ1V0aWwiLCJkZXN0cm95QWxsIiwiZGVzdHJveSIsImFzc2lnbiIsInNvdXJjZSIsImhhc093blByb3BlcnR5IiwiaWRzTWFwIiwiUHVpZCIsIl9pbmRleCIsIl9jYWNoZSIsInR5cGUiLCJnZXRJZCIsInVpZCIsImdldElkRnJvbUNhY2hlIiwiaXNCb2R5IiwiaXNJbm5lciIsImdldFRhcmdldCIsIlBvb2wiLCJudW0iLCJ0b3RhbCIsImNhY2hlIiwiZ2V0IiwicGFyYW1zIiwicCIsIl9fcHVpZCIsInBvcCIsImNyZWF0ZU9yQ2xvbmUiLCJleHBpcmUiLCJnZXRDYWNoZSIsImNyZWF0ZSIsIlV0aWwiLCJjbG9uZSIsImdldENvdW50IiwiY291bnQiLCJTdGF0cyIsInByb3RvbiIsImNvbnRhaW5lciIsImVtaXR0ZXJJbmRleCIsInJlbmRlcmVySW5kZXgiLCJ1cGRhdGUiLCJib2R5IiwiYWRkIiwiZW1pdHRlciIsImdldEVtaXR0ZXIiLCJyZW5kZXJlciIsImdldFJlbmRlcmVyIiwic3RyIiwiZW1pdHRlcnMiLCJlbWl0U3BlZWQiLCJnZXRFbWl0dGVyUG9zIiwiaW5pdGlhbGl6ZXMiLCJjb25jYXRBcnIiLCJiZWhhdmlvdXJzIiwibmFtZSIsImdldENyZWF0ZWROdW1iZXIiLCJwb29sIiwiaW5uZXJIVE1MIiwiY3NzVGV4dCIsImpvaW4iLCJhZGRFdmVudExpc3RlbmVyIiwiYmciLCJjb2xvciIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsInJlbmRlcmVycyIsInJlc3VsdCIsImNwb29sIiwicm91bmQiLCJyZW1vdmVDaGlsZCIsIkV2ZW50RGlzcGF0Y2hlciIsIl9saXN0ZW5lcnMiLCJkaXNwYXRjaEV2ZW50IiwiaGFzRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBbGxFdmVudExpc3RlbmVycyIsImxpc3RlbmVyIiwic3BsaWNlIiwibGlzdGVuZXJzIiwiaGFuZGxlciIsIlBJIiwiSU5GSU5JVFkiLCJJbmZpbml0eSIsIk1hdGhVdGlsIiwiUEl4MiIsIlBJXzIiLCJQSV8xODAiLCJOMTgwX1BJIiwiaXNJbmZpbml0eSIsInJhbmRvbUFUb0IiLCJpc0ludCIsInJhbmRvbUZsb2F0aW5nIiwiY2VudGVyIiwiZiIsInJhbmRvbUNvbG9yIiwic2xpY2UiLCJyYW5kb21ab25lIiwiZGlzcGxheSIsImsiLCJkaWdpdHMiLCJwb3ciLCJkZWdyZWVUcmFuc2Zvcm0iLCJ0b0NvbG9yMTYiLCJJbnRlZ3JhdGlvbiIsImNhbGN1bGF0ZSIsInBhcnRpY2xlcyIsInRpbWUiLCJkYW1waW5nIiwiZXVsZXJJbnRlZ3JhdGUiLCJwYXJ0aWNsZSIsInNsZWVwIiwib2xkIiwiY29weSIsInYiLCJtdWx0aXBseVNjYWxhciIsIm1hc3MiLCJjbGVhciIsIlByb3RvbiIsImludGVncmF0aW9uVHlwZSIsIm5vdyIsInRoZW4iLCJlbGFwc2VkIiwic3RhdHMiLCJFVUxFUiIsImludGVncmF0b3IiLCJfZnBzIiwiX2ludGVydmFsIiwiREVGQVVMVF9JTlRFUlZBTCIsImFkZFJlbmRlcmVyIiwicmVuZGVyIiwiaW5pdCIsInJlbW92ZVJlbmRlcmVyIiwicmVtb3ZlIiwiYWRkRW1pdHRlciIsInBhcmVudCIsIkVNSVRURVJfQURERUQiLCJyZW1vdmVFbWl0dGVyIiwiRU1JVFRFUl9SRU1PVkVEIiwiUFJPVE9OX1VQREFURSIsIlVTRV9DTE9DSyIsIkRhdGUiLCJnZXRUaW1lIiwiYW1lbmRDaGFuZ2VUYWJzQnVnIiwiZW1pdHRlcnNVcGRhdGUiLCJQUk9UT05fVVBEQVRFX0FGVEVSIiwiZ2V0QWxsUGFydGljbGVzIiwiZGVzdHJveUFsbEVtaXR0ZXJzIiwiZGVzdHJveU90aGVyIiwic2V0VGltZW91dCIsImZwcyIsIk1FQVNVUkUiLCJSSzIiLCJQQVJUSUNMRV9DUkVBVEVEIiwiUEFSVElDTEVfVVBEQVRFIiwiUEFSVElDTEVfU0xFRVAiLCJQQVJUSUNMRV9ERUFEIiwiUmdiIiwiciIsImciLCJyZXNldCIsImhhc1Byb3AiLCJzZXRQcm9wIiwicHJvcHMiLCJwcm9wIiwiU3BhbiIsImdldFNwYW5WYWx1ZSIsInNldFZlY3RvclZhbCIsImNvbmYiLCJlYXNlTGluZWFyIiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbkN1YmljIiwiZWFzZU91dEN1YmljIiwiZWFzZUluT3V0Q3ViaWMiLCJlYXNlSW5RdWFydCIsImVhc2VPdXRRdWFydCIsImVhc2VJbk91dFF1YXJ0IiwiZWFzZUluU2luZSIsImVhc2VPdXRTaW5lIiwiZWFzZUluT3V0U2luZSIsImVhc2VJbkV4cG8iLCJlYXNlT3V0RXhwbyIsImVhc2VJbk91dEV4cG8iLCJlYXNlSW5DaXJjIiwic3FydCIsImVhc2VPdXRDaXJjIiwiZWFzZUluT3V0Q2lyYyIsImVhc2VJbkJhY2siLCJlYXNlT3V0QmFjayIsImVhc2VJbk91dEJhY2siLCJnZXRFYXNpbmciLCJlYXNlIiwiVmVjdG9yMkQiLCJzZXQiLCJzZXRYIiwic2V0WSIsImdldEdyYWRpZW50IiwiYXRhbjIiLCJ3IiwiYWRkVmVjdG9ycyIsImFkZFhZIiwic3ViIiwic3ViVmVjdG9ycyIsImRpdmlkZVNjYWxhciIsIm5lZ2F0ZSIsImRvdCIsImxlbmd0aFNxIiwibm9ybWFsaXplIiwiZGlzdGFuY2VUbyIsImRpc3RhbmNlVG9TcXVhcmVkIiwidGhhIiwiZHgiLCJkeSIsImxlcnAiLCJhbHBoYSIsImVxdWFscyIsIlBhcnRpY2xlIiwiZGF0YSIsInJnYiIsIlByb3BVdGlsIiwiZ2V0RGlyZWN0aW9uIiwibGlmZSIsImFnZSIsImRlYWQiLCJzcHJpdGUiLCJlbmVyZ3kiLCJyYWRpdXMiLCJyb3RhdGlvbiIsImVhc2luZyIsInJlbW92ZUFsbEJlaGF2aW91cnMiLCJhcHBseUJlaGF2aW91cnMiLCJtYXgiLCJhcHBseUJlaGF2aW91ciIsImFkZEJlaGF2aW91ciIsImJlaGF2aW91ciIsInBhcmVudHMiLCJpbml0aWFsaXplIiwiYWRkQmVoYXZpb3VycyIsInJlbW92ZUJlaGF2aW91ciIsImhleFRvUmdiIiwiaCIsImhleDE2Iiwic3Vic3RyaW5nIiwicGFyc2VJbnQiLCJyZ2JUb0hleCIsInJiZyIsImdldEhleDE2RnJvbVBhcnRpY2xlIiwiTnVtYmVyIiwiUG9sYXIyRCIsImFicyIsInNldFIiLCJzZXRUaGEiLCJ0b1ZlY3RvciIsImdldFgiLCJnZXRZIiwiTWF0MyIsIm1hdDMiLCJtYXQiLCJGbG9hdDMyQXJyYXkiLCJtYXQxIiwibWF0MiIsIm11bHRpcGx5IiwiaW52ZXJzZSIsImQiLCJtdWx0aXBseVZlYzIiLCJtIiwidmVjIiwiZ2V0VmFsdWUiLCJzZXRTcGFuVmFsdWUiLCJwYW4iLCJBcnJheVNwYW4iLCJfYXJyIiwiY3JlYXRlQXJyYXlTcGFuIiwiUmVjdGFuZ2xlIiwiYm90dG9tIiwicmlnaHQiLCJjb250YWlucyIsIlJhdGUiLCJudW1wYW4iLCJ0aW1lcGFuIiwibnVtUGFuIiwidGltZVBhbiIsInN0YXJ0VGltZSIsIm5leHRUaW1lIiwiSW5pdGlhbGl6ZSIsIkxpZmUiLCJsaWZlUGFuIiwiWm9uZSIsInZlY3RvciIsImNyb3NzVHlwZSIsImFsZXJ0IiwiZ2V0UG9zaXRpb24iLCJjcm9zc2luZyIsIlBvaW50Wm9uZSIsImNvbnNvbGUiLCJlcnJvciIsIlBvc2l0aW9uIiwiem9uZSIsIlZlbG9jaXR5IiwicnBhbiIsInRoYXBhbiIsInJQYW4iLCJ0aGFQYW4iLCJub3JtYWxpemVWZWxvY2l0eSIsInZyIiwicG9sYXIyZCIsIk1hc3MiLCJtYXNzUGFuIiwiUmFkaXVzIiwib2xkUmFkaXVzIiwiQm9keSIsImltYWdlVGFyZ2V0IiwiaW5uZXIiLCJCZWhhdmlvdXIiLCJub3JtYWxpemVGb3JjZSIsImZvcmNlIiwibm9ybWFsaXplVmFsdWUiLCJGb3JjZSIsImZ4IiwiZnkiLCJBdHRyYWN0aW9uIiwidGFyZ2V0UG9zaXRpb24iLCJyYWRpdXNTcSIsImF0dHJhY3Rpb25Gb3JjZSIsIlJhbmRvbURyaWZ0IiwiZHJpZnRYIiwiZHJpZnRZIiwiZGVsYXkiLCJwYW5Gb2NlIiwiR3Jhdml0eSIsIkNvbGxpc2lvbiIsIm5ld1Bvb2wiLCJjb2xsaXNpb25Qb29sIiwiZGVsdGEiLCJvdGhlclBhcnRpY2xlIiwib3ZlcmxhcCIsInRvdGFsTWFzcyIsImF2ZXJhZ2VNYXNzMSIsImF2ZXJhZ2VNYXNzMiIsImRpc3RhbmNlIiwiQ3Jvc3Nab25lIiwiQWxwaGEiLCJzYW1lIiwiYWxwaGFBIiwiYWxwaGFCIiwiU2NhbGUiLCJzY2FsZUEiLCJzY2FsZUIiLCJSb3RhdGUiLCJpbmZsdWVuY2UiLCJyb3RhdGlvbkEiLCJyb3RhdGlvbkIiLCJDb2xvciIsImNvbG9yQSIsIkNvbG9yVXRpbCIsImNvbG9yQiIsIkNIQU5HSU5HIiwiQ3ljbG9uZSIsImFuZ2xlIiwic2V0QW5nbGVBbmRGb3JjZSIsInNwYW4iLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImNhbmdsZSIsImN5Y2xvbmUiLCJncmFkaWVudCIsIlJlcHVsc2lvbiIsIkdyYXZpdHlXZWxsIiwiY2VudGVyUG9pbnQiLCJkaXN0YW5jZVZlYyIsImRpc3RhbmNlU3EiLCJmYWN0b3IiLCJiaW5kRW1pdHRlciIsIkVtaXR0ZXIiLCJlbWl0VGltZSIsInRvdGFsVGltZSIsInJhdGUiLCJlbWl0Iiwic3RvcGVkIiwiaXNOYU4iLCJzdG9wIiwicHJlRW1pdCIsIm9sZFN0b3BlZCIsIm9sZEVtaXRUaW1lIiwib2xkVG90YWxUaW1lIiwic3RlcCIsInJlbW92ZUFsbFBhcnRpY2xlcyIsImFkZFNlbGZJbml0aWFsaXplIiwiYWRkSW5pdGlhbGl6ZSIsInJlc3QiLCJyZW1vdmVJbml0aWFsaXplIiwiaW5pdGlhbGl6ZXIiLCJyZW1vdmVBbGxJbml0aWFsaXplcnMiLCJhcmd1bWVudHMiLCJlbWl0dGluZyIsImludGVncmF0ZSIsImRpc3BhdGNoIiwiZXZlbnQiLCJiaW5kRXZlbnQiLCJjcmVhdGVQYXJ0aWNsZSIsInNldHVwUGFydGljbGUiLCJJbml0aWFsaXplVXRpbCIsIkJlaGF2aW91ckVtaXR0ZXIiLCJzZWxmQmVoYXZpb3VycyIsImFkZFNlbGZCZWhhdmlvdXIiLCJyZW1vdmVTZWxmQmVoYXZpb3VyIiwiRm9sbG93RW1pdHRlciIsIm1vdXNlVGFyZ2V0Iiwid2luZG93IiwiX2FsbG93RW1pdHRpbmciLCJpbml0RXZlbnRIYW5kbGVyIiwibW91c2Vtb3ZlSGFuZGxlciIsIm1vdXNlbW92ZSIsIm1vdXNlZG93bkhhbmRsZXIiLCJtb3VzZWRvd24iLCJtb3VzZXVwSGFuZGxlciIsIm1vdXNldXAiLCJsYXllclgiLCJsYXllclkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImlzSW1hZ2UiLCJfX2lzSW1hZ2UiLCJ0YWdOYW1lIiwibm9kZU5hbWUiLCJpc1N0cmluZyIsIkJhc2VSZW5kZXJlciIsImVsZW1lbnQiLCJzdHJva2UiLCJjaXJjbGVDb25mIiwiaXNDaXJjbGUiLCJzZXRTdHJva2UiLCJ0aGlua25lc3MiLCJfcHJvdG9uVXBkYXRlSGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlIiwiX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlQWZ0ZXIiLCJfZW1pdHRlckFkZGVkSGFuZGxlciIsIm9uRW1pdHRlckFkZGVkIiwiX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciIsIm9uRW1pdHRlclJlbW92ZWQiLCJfcGFydGljbGVDcmVhdGVkSGFuZGxlciIsIm9uUGFydGljbGVDcmVhdGVkIiwiX3BhcnRpY2xlVXBkYXRlSGFuZGxlciIsIm9uUGFydGljbGVVcGRhdGUiLCJfcGFydGljbGVEZWFkSGFuZGxlciIsIm9uUGFydGljbGVEZWFkIiwiQ2FudmFzUmVuZGVyZXIiLCJidWZmZXJDYWNoZSIsImFkZEltZzJCb2R5IiwiVHlwZXMiLCJkcmF3Q2lyY2xlIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYnVmQ29udGV4dCIsImdsb2JhbEFscGhhIiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzYXZlIiwidHJhbnNsYXRlIiwicmVzdG9yZSIsImJlZ2luUGF0aCIsImFyYyIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwiY2xvc2VQYXRoIiwiZmlsbCIsInNpemUiLCJEb21SZW5kZXJlciIsImNyZWF0ZUJvZHkiLCJib2R5UmVhZHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjcmVhdGVDaXJjbGUiLCJjcmVhdGVTcHJpdGUiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwidXJsIiwiYmFja2dyb3VuZEltYWdlIiwiRWFzZWxSZW5kZXJlciIsImFkZENoaWxkIiwic2NhbGVYIiwic2NhbGVZIiwiZ3JhcGhpY3MiLCJyZWdYIiwicmVnWSIsImNyZWF0ZWpzIiwiR3JhcGhpY3MiLCJiZWdpblN0cm9rZSIsImJlZ2luRmlsbCIsInNoYXBlIiwiU2hhcGUiLCJQaXhlbFJlbmRlcmVyIiwicmVjdGFuZ2xlIiwiaW1hZ2VEYXRhIiwiY3JlYXRlSW1hZ2VEYXRhIiwicHV0SW1hZ2VEYXRhIiwic2V0UGl4ZWwiLCJQSVhJQ2xhc3MiLCJQaXhpUmVuZGVyZXIiLCJzZXRDb2xvciIsImJsZW5kTW9kZSIsInNldFBJWEkiLCJQSVhJIiwiU3ByaXRlIiwiY3JlYXRlRnJvbUltYWdlIiwiZnJvbSIsImZyb21JbWFnZSIsInRpbnQiLCJhbmNob3IiLCJlbmRGaWxsIiwiTVN0YWNrIiwibWF0cyIsInRvcCIsIldlYkdMUmVuZGVyZXIiLCJnbCIsImFudGlhbGlhcyIsInN0ZW5jaWwiLCJkZXB0aCIsImluaXRWYXIiLCJzZXRNYXhSYWRpdXMiLCJpbml0U2hhZGVycyIsImluaXRCdWZmZXJzIiwiYmxlbmRFcXVhdGlvbiIsIkZVTkNfQUREIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FX01JTlVTX1NSQ19BTFBIQSIsImVuYWJsZSIsIkJMRU5EIiwidW1hdCIsInNtYXQiLCJtc3RhY2siLCJ2aWV3cG9ydCIsImNpcmNsZUNhbnZhc1VSTCIsImdldFZlcnRleFNoYWRlciIsInZzU291cmNlIiwiZ2V0RnJhZ21lbnRTaGFkZXIiLCJmc1NvdXJjZSIsInRleHR1cmVidWZmZXJzIiwiQSIsIkIiLCJnZXRTaGFkZXIiLCJmcyIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwiZnJhZ21lbnRTaGFkZXIiLCJ2ZXJ0ZXhTaGFkZXIiLCJzcHJvZ3JhbSIsImNyZWF0ZVByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsInVzZVByb2dyYW0iLCJ2cGEiLCJnZXRBdHRyaWJMb2NhdGlvbiIsInRjYSIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidE1hdFVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJzYW1wbGVyVW5pZm9ybSIsInVzZVRleCIsInVuaWZvcm0xaSIsInZzIiwiaWR4IiwidW5pdElCdWZmZXIiLCJiaW5kQnVmZmVyIiwiRUxFTUVOVF9BUlJBWV9CVUZGRVIiLCJidWZmZXJEYXRhIiwiVWludDE2QXJyYXkiLCJTVEFUSUNfRFJBVyIsImlkcyIsInVuaXRJMzMiLCJzdHJpcEJ1ZmZlciIsInJhaWR1cyIsImNpcmNsZUNhbnZhc1JhZGl1cyIsInRvRGF0YVVSTCIsImRyYXdJbWcyQ2FudmFzIiwiX3ciLCJfaCIsIl93aWR0aCIsIl9oZWlnaHQiLCJfc2NhbGVYIiwiX3NjYWxlWSIsImNyZWF0ZVRleHR1cmUiLCJ0ZXh0dXJlIiwidmNCdWZmZXIiLCJ0Y0J1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJpbmRUZXh0dXJlIiwiVEVYVFVSRV8yRCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsInRleFBhcmFtZXRlcmkiLCJURVhUVVJFX01BR19GSUxURVIiLCJMSU5FQVIiLCJURVhUVVJFX01JTl9GSUxURVIiLCJMSU5FQVJfTUlQTUFQX05FQVJFU1QiLCJnZW5lcmF0ZU1pcG1hcCIsInRleHR1cmVMb2FkZWQiLCJ0ZXh0dXJlV2lkdGgiLCJ0ZXh0dXJlSGVpZ2h0IiwidG1hdCIsImltYXQiLCJvbGRTY2FsZSIsInVwZGF0ZU1hdHJpeCIsInVuaWZvcm0zZiIsInVuaWZvcm1NYXRyaXgzZnYiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsIm1vdmVPcmlnaW5NYXRyaXgiLCJ0cmFuc2xhdGlvbk1hdHJpeCIsImFuZ2VsIiwicm90YXRpb25NYXRyaXgiLCJzY2FsZU1hdHJpeCIsIm1hdHJpeCIsIkN1c3RvbVJlbmRlcmVyIiwiTGluZVpvbmUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsImRpcmVjdGlvbiIsIm1pbngiLCJtaW4iLCJtaW55IiwibWF4eCIsIm1heHkiLCJ4eHl5IiwiZ2V0TGVuZ3RoIiwiQyIsIkQiLCJnZXREaXN0YW5jZSIsImdldFN5bW1ldHJpYyIsInRoYTIiLCJ0aGExIiwib2xkeCIsIm9sZHkiLCJyYW5nZU91dCIsIkNpcmNsZVpvbmUiLCJyYW5kb21SYWRpdXMiLCJzZXRDZW50ZXIiLCJSZWN0Wm9uZSIsIkltYWdlWm9uZSIsInZlY3RvcnMiLCJzZXRWZWN0b3JzIiwiaiIsImxlbmd0aDEiLCJsZW5ndGgyIiwiZ2V0Qm91bmQiLCJnZXRDb2xvciIsImZ1bmMiLCJnZXRTdHlsZSIsImRyYXdab25lIiwibW92ZVRvIiwibGluZVRvIiwiZHJhd1JlY3QiLCJkcmF3RW1pdHRlciIsIlZlY3RvciIsIlBvbGFyIiwiZ2V0U3BhbiIsIkluaXQiLCJMIiwiUCIsIlYiLCJNIiwiUiIsIkYiLCJSRCIsIkciLCJTIiwiV2ViR2xSZW5kZXJlciIsIkRlYnVnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWU7RUFDYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VBLEVBQUFBLElBWmEsZ0JBWVJDLE1BWlEsRUFZQTtFQUNYLFdBQU8sQ0FBQ0EsTUFBTSxHQUFJQSxNQUFNLEdBQUcsQ0FBcEIsTUFBNEIsQ0FBbkM7RUFDRCxHQWRZOztFQWdCYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLEtBM0JhLGlCQTJCUEQsTUEzQk8sRUEyQkM7RUFDWixNQUFFQSxNQUFGOztFQUNBLFNBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxLQUFLLENBQTlCLEVBQWlDO0VBQy9CRixNQUFBQSxNQUFNLEdBQUdBLE1BQU0sR0FBSUEsTUFBTSxJQUFJRSxDQUE3QjtFQUNEOztF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
