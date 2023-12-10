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

  var Span = /*#__PURE__*/function () {
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
      this.numPan = Span.setSpanValue(Util.initValue(numpan, 1));
      this.timePan = Span.setSpanValue(Util.initValue(timepan, 1));
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
      _this.lifePan = Span.setSpanValue(a, b, c);
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
      _this.rPan = Span.setSpanValue(rpan);
      _this.thaPan = Span.setSpanValue(thapan);
      _this.type = Util.initValue(type, "vector");
      _this.name = "Velocity";
      return _this;
    }

    var _proto = Velocity.prototype;

    _proto.reset = function reset(rpan, thapan, type) {
      this.rPan = Span.setSpanValue(rpan);
      this.thaPan = Span.setSpanValue(thapan);
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
      _this.massPan = Span.setSpanValue(a, b, c);
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
      _this.radius = Span.setSpanValue(a, b, c);
      _this.name = "Radius";
      return _this;
    }

    var _proto = Radius.prototype;

    _proto.reset = function reset(a, b, c) {
      this.radius = Span.setSpanValue(a, b, c);
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
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);
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
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);
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
      this.a = Span.setSpanValue(Util.initValue(a, "Velocity"));
      this.b = Span.setSpanValue(Util.initValue(b, 0));
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
  Util.assign(Proton, ease); // export

  return Proton;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy9tYXRoL1NwYW4uanMiLCIuLi9zcmMvdXRpbHMvUHJvcFV0aWwuanMiLCIuLi9zcmMvbWF0aC9lYXNlLmpzIiwiLi4vc3JjL21hdGgvVmVjdG9yMkQuanMiLCIuLi9zcmMvY29yZS9QYXJ0aWNsZS5qcyIsIi4uL3NyYy91dGlscy9Db2xvclV0aWwuanMiLCIuLi9zcmMvbWF0aC9Qb2xhcjJELmpzIiwiLi4vc3JjL21hdGgvTWF0My5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIHNsaWNlQXJyYXkoYXJyMSwgaW5kZXgsIGFycjIpIHtcbiAgICB0aGlzLmVtcHR5QXJyYXkoYXJyMik7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMi5wdXNoKGFycjFbaV0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRSYW5kRnJvbUFycmF5KGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoYXJyLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGVtcHR5T2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW55IG9iamVjdFxuICAgKi9cbiAgZW1wdHlPYmplY3Qob2JqLCBpZ25vcmUgPSBudWxsKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIGNvbnRpbnVlO1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWFrZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBhbmQgYmluZHMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBjbGFzc0FwcGx5XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIEEgY2xhc3MgdG8gbWFrZSBhbiBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBBbnkgYXJyYXkgdG8gYmluZCBpdCB0byB0aGUgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgaW5zdGFuY2Ugb2YgY29uc3RydWN0b3IsIG9wdGlvbmFsbHkgYmluZCB3aXRoIGFyZ3NcbiAgICovXG4gIGNsYXNzQXBwbHkoY29uc3RydWN0b3IsIGFyZ3MgPSBudWxsKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IEZhY3RvcnlGdW5jID0gY29uc3RydWN0b3IuYmluZC5hcHBseShjb25zdHJ1Y3RvciwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IEZhY3RvcnlGdW5jKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICByZXR1cm4gSW1nVXRpbC5nZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpO1xuICB9LFxuXG4gIGRlc3Ryb3lBbGwoYXJyLCBwYXJhbSA9IG51bGwpIHtcbiAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJbaV0uZGVzdHJveShwYXJhbSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBkZWxldGUgYXJyW2ldO1xuICAgIH1cblxuICAgIGFyci5sZW5ndGggPSAwO1xuICB9LFxuXG4gIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgaWRzTWFwID0ge307XG5cbmNvbnN0IFB1aWQgPSB7XG4gIF9pbmRleDogMCxcbiAgX2NhY2hlOiB7fSxcblxuICBpZCh0eXBlKSB7XG4gICAgaWYgKGlkc01hcFt0eXBlXSA9PT0gdW5kZWZpbmVkIHx8IGlkc01hcFt0eXBlXSA9PT0gbnVsbCkgaWRzTWFwW3R5cGVdID0gMDtcbiAgICByZXR1cm4gYCR7dHlwZX1fJHtpZHNNYXBbdHlwZV0rK31gO1xuICB9LFxuXG4gIGdldElkKHRhcmdldCkge1xuICAgIGxldCB1aWQgPSB0aGlzLmdldElkRnJvbUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKHVpZCkgcmV0dXJuIHVpZDtcblxuICAgIHVpZCA9IGBQVUlEXyR7dGhpcy5faW5kZXgrK31gO1xuICAgIHRoaXMuX2NhY2hlW3VpZF0gPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHVpZDtcbiAgfSxcblxuICBnZXRJZEZyb21DYWNoZSh0YXJnZXQpIHtcbiAgICBsZXQgb2JqLCBpZDtcblxuICAgIGZvciAoaWQgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIG9iaiA9IHRoaXMuX2NhY2hlW2lkXTtcblxuICAgICAgaWYgKG9iaiA9PT0gdGFyZ2V0KSByZXR1cm4gaWQ7XG4gICAgICBpZiAodGhpcy5pc0JvZHkob2JqLCB0YXJnZXQpICYmIG9iai5zcmMgPT09IHRhcmdldC5zcmMpIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpc0JvZHkob2JqLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIG9iai5pc0lubmVyICYmIHRhcmdldC5pc0lubmVyO1xuICB9LFxuXG4gIGdldFRhcmdldCh1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbdWlkXTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVpZDtcbiIsIi8qKlxuICogUG9vbCBpcyB0aGUgY2FjaGUgcG9vbCBvZiB0aGUgcHJvdG9uIGVuZ2luZSwgaXQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gKlxuICogZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpXG4gKiAgQ2xhc3NcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICogICAgdGFyZ2V0Ll9fcHVpZCA9IHVpZFxuICpcbiAqICBib2R5XG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqXG4gKlxuICogZXhwaXJlKHRhcmdldClcbiAqICBjYWNoZVt0YXJnZXQuX19wdWlkXSBwdXNoIHRhcmdldFxuICpcbiAqL1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBvZiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3RhbFxuICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FjaGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKSB7XG4gICAgbGV0IHA7XG4gICAgdWlkID0gdWlkIHx8IHRhcmdldC5fX3B1aWQgfHwgUHVpZC5nZXRJZCh0YXJnZXQpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVbdWlkXSAmJiB0aGlzLmNhY2hlW3VpZF0ubGVuZ3RoID4gMCkge1xuICAgICAgcCA9IHRoaXMuY2FjaGVbdWlkXS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHRoaXMuY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcC5fX3B1aWQgPSB0YXJnZXQuX19wdWlkIHx8IHVpZDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGV4cGlyZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZSh0YXJnZXQuX19wdWlkKS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldCBhbnkgT2JqZWN0IG9yIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpIHtcbiAgICB0aGlzLnRvdGFsKys7XG5cbiAgICBpZiAodGhpcy5jcmVhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBVdGlsLmNsYXNzQXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiAtIHdoYXQgaXMgaW4gdGhlIGNhY2hlP1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSBjb3VudCArPSB0aGlzLmNhY2hlW2lkXS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveWVzIGFsbCBpdGVtcyBmcm9tIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZVtpZF0ubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q2FjaGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdWlkIHRoZSB1bmlxdWUgaWRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2FjaGUodWlkID0gXCJkZWZhdWx0XCIpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVbdWlkXSkgdGhpcy5jYWNoZVt1aWRdID0gW107XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdWlkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMge1xuICBjb25zdHJ1Y3Rvcihwcm90b24pIHtcbiAgICB0aGlzLnByb3RvbiA9IHByb3RvbjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50eXBlID0gMTtcblxuICAgIHRoaXMuZW1pdHRlckluZGV4ID0gMDtcbiAgICB0aGlzLnJlbmRlcmVySW5kZXggPSAwO1xuICB9XG5cbiAgdXBkYXRlKHN0eWxlLCBib2R5KSB7XG4gICAgdGhpcy5hZGQoc3R5bGUsIGJvZHkpO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZ2V0RW1pdHRlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgIGxldCBzdHIgPSBcIlwiO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3RyICs9IFwiZW1pdHRlcjpcIiArIHRoaXMucHJvdG9uLmVtaXR0ZXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiZW0gc3BlZWQ6XCIgKyBlbWl0dGVyLmVtaXRTcGVlZCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwicG9zOlwiICsgdGhpcy5nZXRFbWl0dGVyUG9zKGVtaXR0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiaW5pdGlhbGl6ZXM6XCIgKyBlbWl0dGVyLmluaXRpYWxpemVzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcilcbiAgICAgICAgICBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuaW5pdGlhbGl6ZXMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiYmVoYXZpb3VyczpcIiArIGVtaXR0ZXIuYmVoYXZpb3Vycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5iZWhhdmlvdXJzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gcmVuZGVyZXIubmFtZSArIFwiPGJyPlwiO1xuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSBcImJvZHk6XCIgKyB0aGlzLmdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpICsgXCI8YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHIgKz0gXCJwYXJ0aWNsZXM6XCIgKyB0aGlzLnByb3Rvbi5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInBvb2w6XCIgKyB0aGlzLnByb3Rvbi5wb29sLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwidG90YWw6XCIgKyB0aGlzLnByb3Rvbi5wb29sLnRvdGFsO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHN0cjtcbiAgfVxuXG4gIGFkZChzdHlsZSwgYm9keSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7XCIsXG4gICAgICAgIFwib3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMDtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XCIsXG4gICAgICAgIFwid2lkdGg6MTIwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZC1jb2xvcjojMDAyO2NvbG9yOiMwZmY7XCJcbiAgICAgIF0uam9pbihcIlwiKTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICB0aGlzLnR5cGUrKztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID4gNCkgdGhpcy50eXBlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIGxldCBiZywgY29sb3I7XG4gICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBiZyA9IFwiIzIwMVwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjZjA4XCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGJnID0gXCIjMDIwXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZjBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJnID0gXCIjMDAyXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZmZcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gYmc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImNvbG9yXCJdID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBib2R5ID0gYm9keSB8fCB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLmVtaXR0ZXJzW3RoaXMuZW1pdHRlckluZGV4XTtcbiAgfVxuXG4gIGdldFJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5yZW5kZXJlcnNbdGhpcy5yZW5kZXJlckluZGV4XTtcbiAgfVxuXG4gIGNvbmNhdEFycihhcnIpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBpZiAoIWFyciB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gKGFycltpXS5uYW1lIHx8IFwiXCIpLnN1YnN0cigwLCAxKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSB7XG4gICAgcmV0dXJuIHJlbmRlcmVyLnBvb2wudG90YWwgfHwgKHJlbmRlcmVyLmNwb29sICYmIHJlbmRlcmVyLmNwb29sLnRvdGFsKSB8fCAwO1xuICB9XG5cbiAgZ2V0RW1pdHRlclBvcyhlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoZS5wLngpICsgXCIsXCIgKyBNYXRoLnJvdW5kKGUucC55KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdG9uID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qXG4gKiBFdmVudERpc3BhdGNoZXJcbiAqIFRoaXMgY29kZSByZWZlcmVuY2Ugc2luY2UgaHR0cDovL2NyZWF0ZWpzLmNvbS8uXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGJpbmQodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuICAgIHRhcmdldC5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIGNvbnN0IGFyciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIGZhc3RlciBjaGVja3MuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIGVsc2UgaWYgKHRoaXMuX2xpc3RlbmVycykgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG5cbiAgICBpZiAodHlwZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIGxldCBhcnIgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgICBpZiAoIWFycikgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgLy8gYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAvLyB0byBhdm9pZCBpc3N1ZXMgd2l0aCBpdGVtcyBiZWluZyByZW1vdmVkIG9yIGFkZGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcblxuICAgICAgbGV0IGhhbmRsZXI7XG4gICAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGhhbmRsZXIgPSBhcnJbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBoYW5kbGVyKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfVxuXG4gIGhhc0V2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiIsImNvbnN0IFBJID0gMy4xNDE1OTI2O1xuY29uc3QgSU5GSU5JVFkgPSBJbmZpbml0eTtcblxuY29uc3QgTWF0aFV0aWwgPSB7XG4gIFBJOiBQSSxcbiAgUEl4MjogUEkgKiAyLFxuICBQSV8yOiBQSSAvIDIsXG4gIFBJXzE4MDogUEkgLyAxODAsXG4gIE4xODBfUEk6IDE4MCAvIFBJLFxuICBJbmZpbml0eTogLTk5OSxcblxuICBpc0luZmluaXR5KG51bSkge1xuICAgIHJldHVybiBudW0gPT09IHRoaXMuSW5maW5pdHkgfHwgbnVtID09PSBJTkZJTklUWTtcbiAgfSxcblxuICByYW5kb21BVG9CKGEsIGIsIGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzSW50KSByZXR1cm4gYSArIE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpO1xuICAgIGVsc2UgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpID4+IDApICsgYTtcbiAgfSxcblxuICByYW5kb21GbG9hdGluZyhjZW50ZXIsIGYsIGlzSW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tQVRvQihjZW50ZXIgLSBmLCBjZW50ZXIgKyBmLCBpc0ludCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICgoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCkgPDwgMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XG4gIH0sXG5cbiAgcmFuZG9tWm9uZShkaXNwbGF5KSB7fSxcblxuICBmbG9vcihudW0sIGsgPSA0KSB7XG4gICAgY29uc3QgZGlnaXRzID0gTWF0aC5wb3coMTAsIGspO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRpZ2l0cykgLyBkaWdpdHM7XG4gIH0sXG5cbiAgZGVncmVlVHJhbnNmb3JtKGEpIHtcbiAgICByZXR1cm4gKGEgKiBQSSkgLyAxODA7XG4gIH0sXG5cbiAgdG9Db2xvcjE2KG51bSkge1xuICAgIHJldHVybiBgIyR7bnVtLnRvU3RyaW5nKDE2KX1gO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVncmF0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBjYWxjdWxhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgdGhpcy5ldWxlckludGVncmF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpO1xuICB9XG5cbiAgLy8gRXVsZXIgSW50ZWdyYXRlXG4gIC8vIGh0dHBzOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4gIGV1bGVySW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zbGVlcCkge1xuICAgICAgcGFydGljbGUub2xkLnAuY29weShwYXJ0aWNsZS5wKTtcbiAgICAgIHBhcnRpY2xlLm9sZC52LmNvcHkocGFydGljbGUudik7XG5cbiAgICAgIHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIoMSAvIHBhcnRpY2xlLm1hc3MpO1xuICAgICAgcGFydGljbGUudi5hZGQocGFydGljbGUuYS5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChwYXJ0aWNsZS5vbGQudi5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG5cbiAgICAgIGlmIChkYW1waW5nKSBwYXJ0aWNsZS52Lm11bHRpcGx5U2NhbGFyKGRhbXBpbmcpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9vbCBmcm9tIFwiLi9Qb29sXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFN0YXRzIGZyb20gXCIuLi9kZWJ1Zy9TdGF0c1wiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgSW50ZWdyYXRpb24gZnJvbSBcIi4uL21hdGgvSW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdG9uIHtcbiAgc3RhdGljIFVTRV9DTE9DSyA9IGZhbHNlO1xuXG4gIC8vIG1lYXN1cmUgMToxMDBcbiAgc3RhdGljIE1FQVNVUkUgPSAxMDA7XG4gIHN0YXRpYyBFVUxFUiA9IFwiZXVsZXJcIjtcbiAgc3RhdGljIFJLMiA9IFwicnVuZ2Uta3V0dGEyXCI7XG5cbiAgLy8gZXZlbnQgbmFtZVxuICBzdGF0aWMgUEFSVElDTEVfQ1JFQVRFRCA9IFwiUEFSVElDTEVfQ1JFQVRFRFwiO1xuICBzdGF0aWMgUEFSVElDTEVfVVBEQVRFID0gXCJQQVJUSUNMRV9VUERBVEVcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1NMRUVQID0gXCJQQVJUSUNMRV9TTEVFUFwiO1xuICBzdGF0aWMgUEFSVElDTEVfREVBRCA9IFwiUEFSVElDTEVfREVBRFwiO1xuXG4gIHN0YXRpYyBFTUlUVEVSX0FEREVEID0gXCJFTUlUVEVSX0FEREVEXCI7XG4gIHN0YXRpYyBFTUlUVEVSX1JFTU9WRUQgPSBcIkVNSVRURVJfUkVNT1ZFRFwiO1xuXG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFID0gXCJQUk9UT05fVVBEQVRFXCI7XG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFX0FGVEVSID0gXCJQUk9UT05fVVBEQVRFX0FGVEVSXCI7XG4gIHN0YXRpYyBERUZBVUxUX0lOVEVSVkFMID0gMC4wMTY3O1xuXG4gIHN0YXRpYyBhbWVuZENoYW5nZVRhYnNCdWcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdG8gYWRkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvciBQcm90b25cbiAgICpcbiAgICogQHRvZG8gcHJvUGFydGljbGVDb3VudCBpcyBub3QgaW4gdXNlXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb24gb2YgdGhlIHNpbmdsZSBwcm9wZXJ0aWVzIGFuZCBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcHJvUGFydGljbGVDb3VudF0gbm90IGluIHVzZT9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGVtaXR0ZXJzICAgQWxsIGFkZGVkIGVtaXR0ZXJcbiAgICogQHByb3BlcnR5IHtBcnJheX0gcmVuZGVyZXJzICBBbGwgYWRkZWQgcmVuZGVyZXJcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgICAgICBUaGUgYWN0aXZlIHRpbWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9sZHRpbWUgICBUaGUgb2xkIHRpbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVncmF0aW9uVHlwZSkge1xuICAgIHRoaXMuZW1pdHRlcnMgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVycyA9IFtdO1xuXG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5vdyA9IDA7XG4gICAgdGhpcy50aGVuID0gMDtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cyh0aGlzKTtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCg4MCk7XG5cbiAgICB0aGlzLmludGVncmF0aW9uVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGludGVncmF0aW9uVHlwZSwgUHJvdG9uLkVVTEVSKTtcbiAgICB0aGlzLmludGVncmF0b3IgPSBuZXcgSW50ZWdyYXRpb24odGhpcy5pbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgdGhpcy5fZnBzID0gXCJhdXRvXCI7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBQcm90b24uREVGQVVMVF9JTlRFUlZBTDtcbiAgfVxuXG4gIHNldCBmcHMoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX2ludGVydmFsID0gZnBzID09PSBcImF1dG9cIiA/IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMIDogTWF0aFV0aWwuZmxvb3IoMSAvIGZwcywgNyk7XG4gIH1cblxuICBnZXQgZnBzKCkge1xuICAgIHJldHVybiB0aGlzLl9mcHM7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgYWRkUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgcmVuZGVyLmluaXQodGhpcyk7XG4gICAgdGhpcy5yZW5kZXJlcnMucHVzaChyZW5kZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIHJlbW92ZVJlbmRlcmVyKHJlbmRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZW5kZXJlcnMuaW5kZXhPZihyZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmVuZGVyLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgYWRkRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9BRERFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgcmVtb3ZlRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICByZW1vdmVFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZW1pdHRlcnMuaW5kZXhPZihlbWl0dGVyKTtcbiAgICB0aGlzLmVtaXR0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgZW1pdHRlci5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX1JFTU9WRUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWxsIGFkZGVkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgLy8gJ2F1dG8nIGlzIHRoZSBkZWZhdWx0IGJyb3dzZXIgcmVmcmVzaCByYXRlLCB0aGUgdmFzdCBtYWpvcml0eSBpcyA2MGZwc1xuICAgIGlmICh0aGlzLl9mcHMgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuXG4gICAgICBpZiAoUHJvdG9uLlVTRV9DTE9DSykge1xuICAgICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcbiAgICAgICAgLy8gRml4IGJ1Z3Mgc3VjaCBhcyBjaHJvbWUgYnJvd3NlciBzd2l0Y2hpbmcgdGFicyBjYXVzaW5nIGV4Y2Vzc2l2ZSB0aW1lIGRpZmZlcmVuY2VcbiAgICAgICAgdGhpcy5hbWVuZENoYW5nZVRhYnNCdWcoKTtcblxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkID4gMCkgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLmVsYXBzZWQpO1xuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUoUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmcHMgZnJhbWUgcmF0ZSBpcyBzZXRcbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG5cbiAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk3NjQwMTgvY29udHJvbGxpbmctZnBzLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lXG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93IC0gKHRoaXMuZWxhcHNlZCAlIHRoaXMuX2ludGVydmFsKSAqIDEwMDA7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW1pdHRlcnNVcGRhdGUoZWxhcHNlZCkge1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5lbWl0dGVyc1tpXS51cGRhdGUoZWxhcHNlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgYW1lbmRDaGFuZ2VUYWJzQnVnXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBhbWVuZENoYW5nZVRhYnNCdWcoKSB7XG4gICAgaWYgKCFQcm90b24uYW1lbmRDaGFuZ2VUYWJzQnVnKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZWxhcHNlZCA+IDAuNSkge1xuICAgICAgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgYWxsIHBhcnRpY2xlcyBmcm9tIGFsbCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB0b3RhbCArPSB0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgZ2V0QWxsUGFydGljbGVzKCkge1xuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgcGFydGljbGVzID0gcGFydGljbGVzLmNvbmNhdCh0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcyk7XG4gICAgcmV0dXJuIHBhcnRpY2xlcztcbiAgfVxuXG4gIGRlc3Ryb3lBbGxFbWl0dGVycygpIHtcbiAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoaXMgUHJvdG9uIGluc3RhbmNlLiBUaGlzIGluY2x1ZGVzIGFsbCBlbWl0dGVycywgYW5kIGFsbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveShyZW1vdmUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRlc3Ryb3lPdGhlciA9ICgpID0+IHtcbiAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICB0aGlzLnRoZW4gPSAwO1xuICAgICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc3RhdHMuZGVzdHJveSgpO1xuXG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5yZW5kZXJlcnMsIHRoaXMuZ2V0QWxsUGFydGljbGVzKCkpO1xuXG4gICAgICB0aGlzLmludGVncmF0b3IgPSBudWxsO1xuICAgICAgdGhpcy5yZW5kZXJlcnMgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0dGVycyA9IG51bGw7XG4gICAgICB0aGlzLnN0YXRzID0gbnVsbDtcbiAgICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoZGVzdHJveU90aGVyLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95T3RoZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoUHJvdG9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJnYiB7XG4gIGNvbnN0cnVjdG9yKHIgPSAyNTUsIGcgPSAyNTUsIGIgPSAyNTUpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuciA9IDI1NTtcbiAgICB0aGlzLmcgPSAyNTU7XG4gICAgdGhpcy5iID0gMjU1O1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYW4ge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjZW50ZXIpIHtcbiAgICBpZiAoVXRpbC5pc0FycmF5KGEpKSB7XG4gICAgICB0aGlzLmlzQXJyYXkgPSB0cnVlO1xuICAgICAgdGhpcy5hID0gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0FycmF5ID0gZmFsc2U7XG4gICAgICB0aGlzLmEgPSBVdGlsLmluaXRWYWx1ZShhLCAxKTtcbiAgICAgIHRoaXMuYiA9IFV0aWwuaW5pdFZhbHVlKGIsIHRoaXMuYSk7XG4gICAgICB0aGlzLmNlbnRlciA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlciwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlKGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5pc0FycmF5KSB7XG4gICAgICByZXR1cm4gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5jZW50ZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlsLnJhbmRvbUFUb0IodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21GbG9hdGluZyh0aGlzLmEsIHRoaXMuYiwgaXNJbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IFNwYW4gb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRTcGFuVmFsdWVcbiAgICpcbiAgICogQHRvZG8gYSwgYiBhbmQgYyBzaG91bGQgYmUgJ01peGVkJyBvciAnTnVtYmVyJz9cbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZCB8IFNwYW59IGFcbiAgICogQHBhcmFtIHtNaXhlZH0gICAgICAgICAgICAgICBiXG4gICAqIEBwYXJhbSB7TWl4ZWR9ICAgICAgICAgICAgICAgY1xuICAgKlxuICAgKiBAcmV0dXJuIHtTcGFufVxuICAgKi9cbiAgc3RhdGljIHNldFNwYW5WYWx1ZShhLCBiLCBjKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmV3IFNwYW4oYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IFNwYW4oYSwgYik7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTcGFuKGEsIGIsIGMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmcm9tIGEgU3BhbiwgaWYgdGhlIHBhcmFtIGlzIG5vdCBhIFNwYW4gaXQgd2lsbCByZXR1cm4gdGhlIGdpdmVuIHBhcmFtZXRlclxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZ2V0VmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZCB8IFNwYW59IHBhblxuICAgKlxuICAgKiBAcmV0dXJuIHtNaXhlZH0gdGhlIHZhbHVlIG9mIFNwYW4gT1IgdGhlIHBhcmFtZXRlciBpZiBpdCBpcyBub3QgYSBTcGFuXG4gICAqL1xuICBzdGF0aWMgZ2V0U3BhblZhbHVlKHBhbikge1xuICAgIHJldHVybiBwYW4gaW5zdGFuY2VvZiBTcGFuID8gcGFuLmdldFZhbHVlKCkgOiBwYW47XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBoYXNQcm9wKHRhcmdldCwga2V5KSB7XG4gICAgaWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KGtleSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNldCB0aGUgcHJvdG90eXBlIGluIGEgZ2l2ZW4gcHJvdG90eXBlT2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRQcm9wXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gdHJhbnNsYXRlIGRlc3JpcHRpb24gZnJvbSBjaGluZXNlIHRvIGVuZ2xpc2hcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlT2JqZWN0IEFuIG9iamVjdCBvZiBzaW5nbGUgcHJvdG90eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHRhcmdldFxuICAgKi9cbiAgc2V0UHJvcCh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSBTcGFuLmdldFNwYW5WYWx1ZShwcm9wc1twcm9wXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFZlY3RvclZhbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYGNvbmZgXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZlxuICAgKi9cbiAgc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBjb25mID0gbnVsbCkge1xuICAgIGlmICghY29uZikgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInhcIikpIHBhcnRpY2xlLnAueCA9IGNvbmZbXCJ4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ5XCIpKSBwYXJ0aWNsZS5wLnkgPSBjb25mW1wieVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2eFwiKSkgcGFydGljbGUudi54ID0gY29uZltcInZ4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2eVwiKSkgcGFydGljbGUudi55ID0gY29uZltcInZ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImF4XCIpKSBwYXJ0aWNsZS5hLnggPSBjb25mW1wiYXhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImF5XCIpKSBwYXJ0aWNsZS5hLnkgPSBjb25mW1wiYXlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicFwiKSkgcGFydGljbGUucC5jb3B5KGNvbmZbXCJwXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidlwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2XCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYVwiKSkgcGFydGljbGUuYS5jb3B5KGNvbmZbXCJhXCJdKTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwb3NpdGlvblwiKSkgcGFydGljbGUucC5jb3B5KGNvbmZbXCJwb3NpdGlvblwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZlbG9jaXR5XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZlbG9jaXR5XCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYWNjZWxlcmF0ZVwiKSkgcGFydGljbGUuYS5jb3B5KGNvbmZbXCJhY2NlbGVyYXRlXCJdKTtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVhc2VMaW5lYXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG5cbiAgZWFzZUluUXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMik7XG4gIH0sXG5cbiAgZWFzZU91dFF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDIpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhZCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMik7XG5cbiAgICByZXR1cm4gLTAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJbkN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAzKTtcbiAgfSxcblxuICBlYXNlT3V0Q3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUgLSAxLCAzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q3ViaWModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDMpO1xuXG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdyh2YWx1ZSAtIDIsIDMpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluUXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDQpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgNCkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFydCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG5cbiAgICByZXR1cm4gLTAuNSAqICgodmFsdWUgLT0gMikgKiBNYXRoLnBvdyh2YWx1ZSwgMykgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5TaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC1NYXRoLmNvcyh2YWx1ZSAqIE1hdGhVdGlsLlBJXzIpICsgMTtcbiAgfSxcblxuICBlYXNlT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNpbih2YWx1ZSAqIE1hdGhVdGlsLlBJXzIpO1xuICB9LFxuXG4gIGVhc2VJbk91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLTAuNSAqIChNYXRoLmNvcyhNYXRoLlBJICogdmFsdWUpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluRXhwbyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcbiAgfSxcblxuICBlYXNlT3V0RXhwbyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdmFsdWUpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRFeHBvKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKSByZXR1cm4gMDtcblxuICAgIGlmICh2YWx1ZSA9PT0gMSkgcmV0dXJuIDE7XG5cbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG5cbiAgICByZXR1cm4gMC41ICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXZhbHVlKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJbkNpcmModmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZU91dENpcmModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdyh2YWx1ZSAtIDEsIDIpKTtcbiAgfSxcblxuICBlYXNlSW5PdXRDaXJjKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAodmFsdWUgLT0gMikgKiB2YWx1ZSkgKyAxKTtcbiAgfSxcblxuICBlYXNlSW5CYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiB2YWx1ZSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSAtIHMpO1xuICB9LFxuXG4gIGVhc2VPdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiAodmFsdWUgPSB2YWx1ZSAtIDEpICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlICsgcykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqICh2YWx1ZSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlIC0gcykpO1xuICAgIHJldHVybiAwLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgKyBzKSArIDIpO1xuICB9LFxuXG4gIGdldEVhc2luZyhlYXNlKSB7XG4gICAgaWYgKHR5cGVvZiBlYXNlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBlYXNlO1xuICAgIGVsc2UgcmV0dXJuIHRoaXNbZWFzZV0gfHwgdGhpcy5lYXNlTGluZWFyO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjJEIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICB0aGlzLnkgPSB5IHx8IDA7XG4gIH1cblxuICBzZXQoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFgoeCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRZKHkpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0R3JhZGllbnQoKSB7XG4gICAgaWYgKHRoaXMueCAhPT0gMCkgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIGVsc2UgaWYgKHRoaXMueSA+IDApIHJldHVybiBNYXRoVXRpbC5QSV8yO1xuICAgIGVsc2UgaWYgKHRoaXMueSA8IDApIHJldHVybiAtTWF0aFV0aWwuUElfMjtcbiAgfVxuXG4gIGNvcHkodikge1xuICAgIHRoaXMueCA9IHYueDtcbiAgICB0aGlzLnkgPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZCh2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggKz0gdi54O1xuICAgIHRoaXMueSArPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFhZKGEsIGIpIHtcbiAgICB0aGlzLnggKz0gYTtcbiAgICB0aGlzLnkgKz0gYjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkVmVjdG9ycyhhLCBiKSB7XG4gICAgdGhpcy54ID0gYS54ICsgYi54O1xuICAgIHRoaXMueSA9IGEueSArIGIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3ViKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3ViVmVjdG9ycyhhLCBiKSB7XG4gICAgdGhpcy54ID0gYS54IC0gYi54O1xuICAgIHRoaXMueSA9IGEueSAtIGIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGl2aWRlU2NhbGFyKHMpIHtcbiAgICBpZiAocyAhPT0gMCkge1xuICAgICAgdGhpcy54IC89IHM7XG4gICAgICB0aGlzLnkgLz0gcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQoMCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtdWx0aXBseVNjYWxhcihzKSB7XG4gICAgdGhpcy54ICo9IHM7XG4gICAgdGhpcy55ICo9IHM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5lZ2F0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcigtMSk7XG4gIH1cblxuICBkb3Qodikge1xuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG4gIH1cblxuICBsZW5ndGhTcSgpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuICB9XG5cbiAgbGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgoKSk7XG4gIH1cblxuICBkaXN0YW5jZVRvKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQodikpO1xuICB9XG5cbiAgcm90YXRlKHRoYSkge1xuICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgY29uc3QgeSA9IHRoaXMueTtcblxuICAgIHRoaXMueCA9IHggKiBNYXRoLmNvcyh0aGEpICsgeSAqIE1hdGguc2luKHRoYSk7XG4gICAgdGhpcy55ID0gLXggKiBNYXRoLnNpbih0aGEpICsgeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc3RhbmNlVG9TcXVhcmVkKHYpIHtcbiAgICBjb25zdCBkeCA9IHRoaXMueCAtIHYueDtcbiAgICBjb25zdCBkeSA9IHRoaXMueSAtIHYueTtcblxuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgfVxuXG4gIGxlcnAodiwgYWxwaGEpIHtcbiAgICB0aGlzLnggKz0gKHYueCAtIHRoaXMueCkgKiBhbHBoYTtcbiAgICB0aGlzLnkgKz0gKHYueSAtIHRoaXMueSkgKiBhbHBoYTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi54ID09PSB0aGlzLnggJiYgdi55ID09PSB0aGlzLnk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnggPSAwLjA7XG4gICAgdGhpcy55ID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSk7XG4gIH1cbn1cbiIsIi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuLi9iZWhhdmlvdXIvQmVoYXZpb3VyJyl9IEJlaGF2aW91ciAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL21hdGgvVmVjdG9yMkQnKX0gVmVjdG9yMkQgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuLi91dGlscy9SZ2InKX0gUmdiICovXG5pbXBvcnQgUmdiIGZyb20gXCIuLi91dGlscy9SZ2JcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFByb3BVdGlsIGZyb20gXCIuLi91dGlscy9Qcm9wVXRpbFwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4uL21hdGgvZWFzZVwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xuICAvKiogQHR5cGUgc3RyaW5nICovXG4gIGlkID0gXCJcIjtcblxuICAvKiogQHR5cGUge3twOlZlY3RvcjJELHY6VmVjdG9yMkQsYTpWZWN0b3IyRH19ICovXG4gIG9sZCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gIGRhdGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7QmVoYXZpb3VyW119ICovXG4gIGJlaGF2aW91cnMgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIHAgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIHYgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7UmdifSAqL1xuICByZ2IgPSBudWxsO1xuXG4gIC8qKlxuICAgKiB0aGUgUGFydGljbGUgY2xhc3NcbiAgICpcbiAgICogQGNsYXNzIFByb3Rvbi5QYXJ0aWNsZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHBPYmogdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7bGlmZTozLGRlYWQ6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHBhcnRpY2xlJ3MgaWQ7XG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIlBhcnRpY2xlXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgICB0aGlzLm9sZCA9IHt9O1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuXG4gICAgdGhpcy5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5hID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5hID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICB0aGlzLnJnYiA9IG5ldyBSZ2IoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgY29uZiAmJiBQcm9wVXRpbC5zZXRQcm9wKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMudi54LCAtdGhpcy52LnkpICogTWF0aFV0aWwuTjE4MF9QSTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubGlmZSA9IEluZmluaXR5O1xuICAgIHRoaXMuYWdlID0gMDtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuc2xlZXAgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkgPSBudWxsO1xuICAgIHRoaXMuc3ByaXRlID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmVuZXJneSA9IDE7IC8vIEVuZXJneSBMb3NzXG4gICAgdGhpcy5tYXNzID0gMTtcbiAgICB0aGlzLnJhZGl1cyA9IDEwO1xuICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMuY29sb3IgPSBudWxsO1xuXG4gICAgdGhpcy5wLnNldCgwLCAwKTtcbiAgICB0aGlzLnYuc2V0KDAsIDApO1xuICAgIHRoaXMuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQucC5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmVhc2VMaW5lYXI7XG5cbiAgICB0aGlzLnJnYi5yZXNldCgpO1xuICAgIFV0aWwuZW1wdHlPYmplY3QodGhpcy5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgICAgdGhpcy5hcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFnZSA8IHRoaXMubGlmZSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyh0aGlzLmFnZSAvIHRoaXMubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vyc1tpXSAmJiB0aGlzLmJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyXG4gICAqL1xuICBhZGRCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcblxuICAgIGlmIChiZWhhdmlvdXIuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRzXCIpKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyW119IGJlaGF2aW91cnNcbiAgICovXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJlaGF2aW91cnMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZEJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGNvbnN0IGJlaGF2aW91ciA9IHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuYmVoYXZpb3Vycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcbiAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmICB7T2JqZWN0fSByZ2JPYmplY3RcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHIgcmVkIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBnIGdyZWVuIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBiIGJsdWUgdmFsdWVcbiAgICovXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIHJnYiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGhleFRvUmdiXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoIGFueSBoZXggdmFsdWUsIGUuZy4gIzAwMDAwMCBvciAwMDAwMDAgZm9yIGJsYWNrXG4gICAqXG4gICAqIEByZXR1cm4ge3JnYk9iamVjdH1cbiAgICovXG4gIGhleFRvUmdiKGgpIHtcbiAgICBjb25zdCBoZXgxNiA9IGguY2hhckF0KDApID09PSBcIiNcIiA/IGguc3Vic3RyaW5nKDEsIDcpIDogaDtcbiAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoNCwgNiksIDE2KTtcblxuICAgIHJldHVybiB7IHIsIGcsIGIgfTtcbiAgfSxcblxuICAvKipcbiAgICogY29udmVydHMgYSByZ2IgdmFsdWUgdG8gYSByZ2Igc3RyaW5nXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCByZ2JUb0hleFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdCB8IFByb3Rvbi5oZXhUb1JnYn0gcmdiIGEgcmdiIG9iamVjdCBsaWtlIGluIHtAbGluayBQcm90b24jUHJvdG9uLn1cbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfSByZ2IoKVxuICAgKi9cbiAgcmdiVG9IZXgocmJnKSB7XG4gICAgcmV0dXJuIGByZ2IoJHtyYmcucn0sICR7cmJnLmd9LCAke3JiZy5ifSlgO1xuICB9LFxuXG4gIGdldEhleDE2RnJvbVBhcnRpY2xlKHApIHtcbiAgICByZXR1cm4gTnVtYmVyKHAucmdiLnIpICogNjU1MzYgKyBOdW1iZXIocC5yZ2IuZykgKiAyNTYgKyBOdW1iZXIocC5yZ2IuYik7XG4gIH1cbn07XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sYXIyRCB7XG4gIGNvbnN0cnVjdG9yKHIsIHRoYSkge1xuICAgIHRoaXMuciA9IE1hdGguYWJzKHIpIHx8IDA7XG4gICAgdGhpcy50aGEgPSB0aGEgfHwgMDtcbiAgfVxuXG4gIHNldChyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UihyKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRoYSh0aGEpIHtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvcHkocCkge1xuICAgIHRoaXMuciA9IHAucjtcbiAgICB0aGlzLnRoYSA9IHAudGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9WZWN0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLmdldFgoKSwgdGhpcy5nZXRZKCkpO1xuICB9XG5cbiAgZ2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5yICogTWF0aC5zaW4odGhpcy50aGEpO1xuICB9XG5cbiAgZ2V0WSgpIHtcbiAgICByZXR1cm4gLXRoaXMuciAqIE1hdGguY29zKHRoaXMudGhhKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICB0aGlzLnIgPSAxO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi5yID09PSB0aGlzLnIgJiYgdi50aGEgPT09IHRoaXMudGhhO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yID0gMC4wO1xuICAgIHRoaXMudGhhID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2xhcjJEKHRoaXMuciwgdGhpcy50aGEpO1xuICB9XG59XG4iLCJjb25zdCBNYXQzID0ge1xuICBjcmVhdGUobWF0Mykge1xuICAgIGNvbnN0IG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoOSk7XG4gICAgaWYgKG1hdDMpIHRoaXMuc2V0KG1hdDMsIG1hdCk7XG5cbiAgICByZXR1cm4gbWF0O1xuICB9LFxuXG4gIHNldChtYXQxLCBtYXQyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIG1hdDJbaV0gPSBtYXQxW2ldO1xuXG4gICAgcmV0dXJuIG1hdDI7XG4gIH0sXG5cbiAgbXVsdGlwbHkobWF0LCBtYXQyLCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGEwMiA9IG1hdFsyXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMCA9IG1hdDJbMF0sXG4gICAgICBiMDEgPSBtYXQyWzFdLFxuICAgICAgYjAyID0gbWF0MlsyXSxcbiAgICAgIGIxMCA9IG1hdDJbM10sXG4gICAgICBiMTEgPSBtYXQyWzRdLFxuICAgICAgYjIwID0gbWF0Mls2XSxcbiAgICAgIGIyMSA9IG1hdDJbN107XG5cbiAgICBtYXQzWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwO1xuICAgIG1hdDNbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTE7XG4gICAgbWF0M1syXSA9IGEwMiAqIGIwMjtcbiAgICBtYXQzWzNdID0gYjEwICogYTAwICsgYjExICogYTEwO1xuICAgIG1hdDNbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTE7XG4gICAgbWF0M1s2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGEyMDtcbiAgICBtYXQzWzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYTIxO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgaW52ZXJzZShtYXQsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAxID0gYTExLFxuICAgICAgYjExID0gLWExMCxcbiAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcbiAgICAgIGQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEsXG4gICAgICBpZDtcblxuICAgIGlkID0gMSAvIGQ7XG4gICAgbWF0M1swXSA9IGIwMSAqIGlkO1xuICAgIG1hdDNbMV0gPSAtYTAxICogaWQ7XG4gICAgbWF0M1szXSA9IGIxMSAqIGlkO1xuICAgIG1hdDNbNF0gPSBhMDAgKiBpZDtcbiAgICBtYXQzWzZdID0gYjIxICogaWQ7XG4gICAgbWF0M1s3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGlkO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgbXVsdGlwbHlWZWMyKG0sIHZlYywgbWF0Mykge1xuICAgIGxldCB4ID0gdmVjWzBdLFxuICAgICAgeSA9IHZlY1sxXTtcblxuICAgIG1hdDNbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgbVs2XTtcbiAgICBtYXQzWzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIG1bN107XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0MztcbiIsImltcG9ydCBTcGFuIGZyb20gXCIuL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXlTcGFuIGV4dGVuZHMgU3BhbiB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9hcnIgPSBVdGlsLnRvQXJyYXkoY29sb3IpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgY29uc3QgdmFsID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuX2Fycik7XG4gICAgcmV0dXJuIHZhbCA9PT0gXCJyYW5kb21cIiB8fCB2YWwgPT09IFwiUmFuZG9tXCIgPyBNYXRoVXRpbC5yYW5kb21Db2xvcigpIDogdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSB0aGF0IHRoZSBjb2xvciBpcyBhbiBpbnN0YW5jZSBvZiBQcm90b24uQXJyYXlTcGFuLCBpZiBub3QgaXQgbWFrZXMgYSBuZXcgaW5zdGFuY2VcbiAgICpcbiAgICogQG1ldGhvZCBzZXRTcGFuVmFsdWVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFycmF5U3BhbihhcnIpIHtcbiAgICBpZiAoIWFycikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoYXJyIGluc3RhbmNlb2YgQXJyYXlTcGFuKSByZXR1cm4gYXJyO1xuICAgIGVsc2UgcmV0dXJuIG5ldyBBcnJheVNwYW4oYXJyKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMud2lkdGggPSB3O1xuICAgIHRoaXMuaGVpZ2h0ID0gaDtcblxuICAgIHRoaXMuYm90dG9tID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gIH1cblxuICBjb250YWlucyh4LCB5KSB7XG4gICAgaWYgKHggPD0gdGhpcy5yaWdodCAmJiB4ID49IHRoaXMueCAmJiB5IDw9IHRoaXMuYm90dG9tICYmIHkgPj0gdGhpcy55KSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0ZSB7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXNzaW9uIChhIFtwYXJ0aWNsZV0vYiBbc10pO1xuICAgKiBAbmFtZXNwYWNlXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFJhdGVcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheSB8IE51bWJlciB8IFNwYW59IG51bXBhbiB0aGUgbnVtYmVyIG9mIGVhY2ggZW1pc3Npb247XG4gICAqIEBwYXJhbSB7QXJyYXkgfCBOdW1iZXIgfCBTcGFufSB0aW1lcGFuIHRoZSB0aW1lIG9mIGVhY2ggZW1pc3Npb247XG4gICAqIGZvciBleGFtcGxlOiBuZXcgUmF0ZShuZXcgU3BhbigxMCwgMjApLCBuZXcgU3BhbiguMSwgLjI1KSk7XG4gICAqL1xuICBjb25zdHJ1Y3RvcihudW1wYW4sIHRpbWVwYW4pIHtcbiAgICB0aGlzLm51bVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKG51bXBhbiwgMSkpO1xuICAgIHRoaXMudGltZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKHRpbWVwYW4sIDEpKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gMDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIGdldFZhbHVlKHRpbWUpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lID49IHRoaXMubmV4dFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcblxuICAgICAgaWYgKHRoaXMubnVtUGFuLmIgPT09IDEpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtUGFuLmdldFZhbHVlKGZhbHNlKSA+IDAuNSkgcmV0dXJuIDE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1QYW4uZ2V0VmFsdWUodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEluaXRpYWxpemUge1xuICByZXNldCgpIHt9XG5cbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplKHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplKGVtaXR0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN1YiBjbGFzcyBpbml0XG4gIGluaXRpYWxpemUodGFyZ2V0KSB7fVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5saWZlUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJMaWZlXCI7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLmxpZmVQYW4uYSA9PT0gSW5maW5pdHkpIHRhcmdldC5saWZlID0gSW5maW5pdHk7XG4gICAgZWxzZSB0YXJnZXQubGlmZSA9IHRoaXMubGlmZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVjdG9yID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICAgIHRoaXMucmFuZG9tID0gMDtcbiAgICB0aGlzLmNyb3NzVHlwZSA9IFwiZGVhZFwiO1xuICAgIHRoaXMuYWxlcnQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7fVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50Wm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLng7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgUG9pbnRab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3NpbmcgbWV0aG9kIVwiKTtcbiAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbiBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3Rvcih6b25lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICAgIHRoaXMubmFtZSA9IFwiUG9zaXRpb25cIjtcbiAgfVxuXG4gIHJlc2V0KHpvbmUpIHtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0aGlzLnpvbmUuZ2V0UG9zaXRpb24oKTtcblxuICAgIHRhcmdldC5wLnggPSB0aGlzLnpvbmUudmVjdG9yLng7XG4gICAgdGFyZ2V0LnAueSA9IHRoaXMuem9uZS52ZWN0b3IueTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVsb2NpdHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IocnBhbiwgdGhhcGFuLCB0eXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcblxuICAgIHRoaXMubmFtZSA9IFwiVmVsb2NpdHlcIjtcbiAgfVxuXG4gIHJlc2V0KHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZVZlbG9jaXR5KHZyKSB7XG4gICAgcmV0dXJuIHZyICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwicFwiIHx8IHRoaXMudHlwZSA9PT0gXCJQXCIgfHwgdGhpcy50eXBlID09PSBcInBvbGFyXCIpIHtcbiAgICAgIGNvbnN0IHBvbGFyMmQgPSBuZXcgUG9sYXIyRChcbiAgICAgICAgdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSksXG4gICAgICAgIHRoaXMudGhhUGFuLmdldFZhbHVlKCkgKiBNYXRoVXRpbC5QSV8xODBcbiAgICAgICk7XG5cbiAgICAgIHRhcmdldC52LnggPSBwb2xhcjJkLmdldFgoKTtcbiAgICAgIHRhcmdldC52LnkgPSBwb2xhcjJkLmdldFkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnYueCA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpO1xuICAgICAgdGFyZ2V0LnYueSA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy50aGFQYW4uZ2V0VmFsdWUoKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3MgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXNzUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJNYXNzXCI7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIHRhcmdldC5tYXNzID0gdGhpcy5tYXNzUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaXVzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlJhZGl1c1wiO1xuICB9XG5cbiAgcmVzZXQoYSwgYiwgYykge1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucmFkaXVzID0gdGhpcy5yYWRpdXMuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4uL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoaW1hZ2UsIHcsIGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMuc2V0U3BhblZhbHVlKGltYWdlKTtcbiAgICB0aGlzLncgPSBVdGlsLmluaXRWYWx1ZSh3LCAyMCk7XG4gICAgdGhpcy5oID0gVXRpbC5pbml0VmFsdWUoaCwgdGhpcy53KTtcbiAgICB0aGlzLm5hbWUgPSBcIkJvZHlcIjtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBjb25zdCBpbWFnZVRhcmdldCA9IHRoaXMuaW1hZ2UuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0eXBlb2YgaW1hZ2VUYXJnZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLncsXG4gICAgICAgIGhlaWdodDogdGhpcy5oLFxuICAgICAgICBzcmM6IGltYWdlVGFyZ2V0LFxuICAgICAgICBpc0lubmVyOiB0cnVlLFxuICAgICAgICBpbm5lcjogdHJ1ZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IGltYWdlVGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIHNldFNwYW5WYWx1ZShpbWFnZSkge1xuICAgIHJldHVybiBpbWFnZSBpbnN0YW5jZW9mIEFycmF5U3BhbiA/IGltYWdlIDogbmV3IEFycmF5U3BhbihpbWFnZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4uL21hdGgvZWFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWhhdmlvdXIge1xuICBzdGF0aWMgaWQgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgQmVoYXZpb3VyIGNsYXNzIGlzIHRoZSBiYXNlIGZvciB0aGUgb3RoZXIgQmVoYXZpb3VyXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgLVxuICAgKiBAaW50ZXJmYWNlXG4gICAqIEBhbGlhcyBQcm90b24uQmVoYXZpb3VyXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsaWZlIFx0dGhlIGJlaGF2aW91cnMgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZWFzaW5nIFx0VGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kLCBmb3IgZXhhbXBsZSBlYXNlLmVhc2VPdXRRdWFydFxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gIGlkIFx0XHRUaGUgYmVoYXZpb3VycyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gIGFnZT0wIFx0SG93IGxvbmcgdGhlIHBhcnRpY2xlIHNob3VsZCBiZSAnYWxpZmUnXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgZW5lcmd5PTFcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWFkPWZhbHNlIFRoZSBwYXJ0aWNsZSBpcyBkZWFkIGF0IGZpcnN0XG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9ICAgcGFyZW50cyBcdFRoZSBiZWhhdmlvdXIncyBwYXJlbnRzIGFycmF5XG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAgbmFtZSBcdFRoZSBiZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IobGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcblxuICAgIHRoaXMuYWdlID0gMDtcbiAgICB0aGlzLmVuZXJneSA9IDE7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnRzID0gW107XG5cbiAgICB0aGlzLmlkID0gYEJlaGF2aW91cl8ke0JlaGF2aW91ci5pZCsrfWA7XG4gICAgdGhpcy5uYW1lID0gXCJCZWhhdmlvdXJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgZm9yY2UgYnkgMToxMDA7XG4gICAqXG4gICAqIEBtZXRob2Qgbm9ybWFsaXplRm9yY2VcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSBmb3JjZVxuICAgKi9cbiAgbm9ybWFsaXplRm9yY2UoZm9yY2UpIHtcbiAgICByZXR1cm4gZm9yY2UubXVsdGlwbHlTY2FsYXIoUHJvdG9uLk1FQVNVUkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHZhbHVlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICovXG4gIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogY29tcHV0aW5nIGxpZmUgY3ljbGVcbiAgICpcbiAgICogQG1ldGhvZCBjYWxjdWxhdGVcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBjYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB7XG4gICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBiZWhhdmlvdXJcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFyZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5wYXJlbnRzW2ldLnJlbW92ZUJlaGF2aW91cih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudHMubGVuZ3RoID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uRm9yY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG4gICAgdGhpcy5uYW1lID0gXCJGb3JjZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuYS5hZGQodGhpcy5mb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJhY3Rpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhpcyBiZWhhdmlvdXIgbGV0IHRoZSBwYXJ0aWNsZXMgZm9sbG93IG9uZSBzcGVjaWZpYyBQcm90b24uVmVjdG9yMkRcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkF0dHJhY3Rpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvblxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzU3FcbiAgICogQHByb3BlcnR5IHtQcm90b24uVmVjdG9yMkR9IGF0dHJhY3Rpb25Gb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gbGVuZ3RoU3FcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgdGhpcy5uYW1lID0gXCJBdHRyYWN0aW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UuY29weSh0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zdWIocGFydGljbGUucCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IHRoaXMuYXR0cmFjdGlvbkZvcmNlLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGhTcSA+IDAuMDAwMDQgJiYgdGhpcy5sZW5ndGhTcSA8IHRoaXMucmFkaXVzU3EpIHtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMubGVuZ3RoU3EgLyB0aGlzLnJhZGl1c1NxKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKHRoaXMuZm9yY2UpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmF0dHJhY3Rpb25Gb3JjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tRHJpZnQgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYW5kb21EcmlmdFxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSBUaGUgdGltZSBvZiB0aGUgZHJpZnRcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSk7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5hbWUgPSBcIlJhbmRvbURyaWZ0XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5wYW5Gb2NlID0gbmV3IFZlY3RvcjJEKGRyaWZ0WCwgZHJpZnRZKTtcbiAgICB0aGlzLnBhbkZvY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHRoaXMucGFuRm9jZSk7XG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuZGF0YS50aW1lICs9IHRpbWU7XG5cbiAgICBpZiAocGFydGljbGUuZGF0YS50aW1lID49IHRoaXMuZGVsYXkpIHtcbiAgICAgIHBhcnRpY2xlLmEuYWRkWFkoXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS54LCB0aGlzLnBhbkZvY2UueCksXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS55LCB0aGlzLnBhbkZvY2UueSlcbiAgICAgICk7XG5cbiAgICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRm9yY2UgZnJvbSBcIi4vRm9yY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eSBleHRlbmRzIEZvcmNlIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5HcmF2aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uR3Jhdml0eVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCgwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGFmdGVyIGNvbGxpc2lvblxuICAgKlxuICAgKiBAY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcml0Y2xlfSBvdGhlclBhcnRpY2xlXG4gICAqL1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbGxpc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5yZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjayk7XG4gICAgdGhpcy5uZXdQb29sID0gW107XG4gICAgdGhpcy5wb29sID0gW107XG4gICAgdGhpcy5uYW1lID0gXCJDb2xsaXNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBVdGlsLmluaXRWYWx1ZShlbWl0dGVyLCBudWxsKTtcbiAgICB0aGlzLm1hc3MgPSBVdGlsLmluaXRWYWx1ZShtYXNzLCB0cnVlKTtcbiAgICB0aGlzLmNhbGxiYWNrID0gVXRpbC5pbml0VmFsdWUoY2FsbGJhY2ssIG51bGwpO1xuXG4gICAgdGhpcy5jb2xsaXNpb25Qb29sID0gW107XG4gICAgdGhpcy5kZWx0YSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5lbWl0dGVyKSB7XG4gICAgICBVdGlsLnNsaWNlQXJyYXkodGhpcy5lbWl0dGVyLnBhcnRpY2xlcywgaW5kZXgsIHRoaXMubmV3UG9vbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFV0aWwuc2xpY2VBcnJheSh0aGlzLnBvb2wsIGluZGV4LCB0aGlzLm5ld1Bvb2wpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubmV3UG9vbC5sZW5ndGg7XG4gICAgbGV0IG90aGVyUGFydGljbGU7XG4gICAgbGV0IGxlbmd0aFNxO1xuICAgIGxldCBvdmVybGFwO1xuICAgIGxldCB0b3RhbE1hc3M7XG4gICAgbGV0IGF2ZXJhZ2VNYXNzMSwgYXZlcmFnZU1hc3MyO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBvdGhlclBhcnRpY2xlID0gdGhpcy5uZXdQb29sW2ldO1xuXG4gICAgICBpZiAob3RoZXJQYXJ0aWNsZSAhPT0gcGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5kZWx0YS5jb3B5KG90aGVyUGFydGljbGUucCk7XG4gICAgICAgIHRoaXMuZGVsdGEuc3ViKHBhcnRpY2xlLnApO1xuXG4gICAgICAgIGxlbmd0aFNxID0gdGhpcy5kZWx0YS5sZW5ndGhTcSgpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHBhcnRpY2xlLnJhZGl1cyArIG90aGVyUGFydGljbGUucmFkaXVzO1xuXG4gICAgICAgIGlmIChsZW5ndGhTcSA8PSBkaXN0YW5jZSAqIGRpc3RhbmNlKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IGRpc3RhbmNlIC0gTWF0aC5zcXJ0KGxlbmd0aFNxKTtcbiAgICAgICAgICBvdmVybGFwICs9IDAuNTtcblxuICAgICAgICAgIHRvdGFsTWFzcyA9IHBhcnRpY2xlLm1hc3MgKyBvdGhlclBhcnRpY2xlLm1hc3M7XG4gICAgICAgICAgYXZlcmFnZU1hc3MxID0gdGhpcy5tYXNzID8gb3RoZXJQYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMubWFzcyA/IHBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG5cbiAgICAgICAgICBwYXJ0aWNsZS5wLmFkZChcbiAgICAgICAgICAgIHRoaXMuZGVsdGFcbiAgICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG90aGVyUGFydGljbGUucC5hZGQodGhpcy5kZWx0YS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihvdmVybGFwICogYXZlcmFnZU1hc3MyKSk7XG5cbiAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2socGFydGljbGUsIG90aGVyUGFydGljbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3Nab25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIERlZmluZXMgd2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgY29tZSB0byB0aGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgem9uZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3Jvc3Nab25lXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0XHRcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3Jvc3Nab25lXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBVdGlsLmluaXRWYWx1ZShjcm9zc1R5cGUsIFwiZGVhZFwiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgdGhpcy56b25lLmNyb3NzaW5nKHBhcnRpY2xlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFscGhhIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5BbHBoYVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJBbHBoYVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmV3IGFscGhhIHZhbHVlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSBBIHNpbmdsZSBQcm90b24gZ2VuZXJhdGVkIHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5hbHBoYUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gcGFydGljbGUuZGF0YS5hbHBoYUE7XG4gICAgZWxzZSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgcGFydGljbGUuYWxwaGEgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQiArIChwYXJ0aWNsZS5kYXRhLmFscGhhQSAtIHBhcnRpY2xlLmRhdGEuYWxwaGFCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLmFscGhhIDwgMC4wMDEpIHBhcnRpY2xlLmFscGhhID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5TY2FsZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJTY2FsZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVCID0gdGhpcy5zYW1lID8gcGFydGljbGUuZGF0YS5zY2FsZUEgOiB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLnNjYWxlID0gcGFydGljbGUuZGF0YS5zY2FsZUIgKyAocGFydGljbGUuZGF0YS5zY2FsZUEgLSBwYXJ0aWNsZS5kYXRhLnNjYWxlQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA8IDAuMDAwMSkgcGFydGljbGUuc2NhbGUgPSAwO1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzICogcGFydGljbGUuc2NhbGU7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlJvdGF0ZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJywgJ2InIGFuZCAnc3R5bGUnXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbaW5mbHVlbmNlPVZlbG9jaXR5XSBUaGUgcm90YXRpb24ncyBpbmZsdWVuY2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHlsZT10b11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbmZsdWVuY2UsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChpbmZsdWVuY2UsIGIsIHN0eWxlKTtcbiAgICB0aGlzLm5hbWUgPSBcIlJvdGF0ZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScsICdiJyBhbmQgJ3N0eWxlJ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3N0eWxlPXRvXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgXCJWZWxvY2l0eVwiKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYiwgMCkpO1xuICAgIHRoaXMuc3R5bGUgPSBVdGlsLmluaXRWYWx1ZShzdHlsZSwgXCJ0b1wiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICghdGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHtcbiAgICAgIGlmICh0aGlzLnN0eWxlID09PSBcInRvXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJUT1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiX1wiKSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9XG4gICAgICAgICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgKyAocGFydGljbGUuZGF0YS5yb3RhdGlvbkEgLSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQikgKiB0aGlzLmVuZXJneTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHBhcnRpY2xlLmRhdGEucm90YXRpb25CO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hLmEgPT09IFwiVlwiIHx8IHRoaXMuYS5hID09PSBcIlZlbG9jaXR5XCIgfHwgdGhpcy5hLmEgPT09IFwidlwiKSB7XG4gICAgICAvLyBiZXRhLi4uXG4gICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlLmdldERpcmVjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sb3JcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBhIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBiIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmEgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGEpO1xuICAgIHRoaXMuYiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYik7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5jb2xvciA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuY29sb3JBID0gQ29sb3JVdGlsLmhleFRvUmdiKHBhcnRpY2xlLmNvbG9yKTtcblxuICAgIGlmICh0aGlzLmIpIHBhcnRpY2xlLmRhdGEuY29sb3JCID0gQ29sb3JVdGlsLmhleFRvUmdiKHRoaXMuYi5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuYikge1xuICAgICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLnIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmcgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLnJnYi5yIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLnJnYi5nIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLnJnYi5iIDw8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckEucjtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckEuZztcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckEuYjtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5jb25zdCBDSEFOR0lORyA9IFwiY2hhbmdpbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ljbG9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3ljbG9uZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkN5Y2xvbmVcIjtcbiAgfVxuXG4gIHNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG5cbiAgICBpZiAoYW5nbGUgPT09IFwicmlnaHRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcImxlZnRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IC1NYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwicmFuZG9tXCI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInNwYW5cIjtcbiAgICAgIHRoaXMuc3BhbiA9IGFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdpbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJhdXRvXCJcbiAgICApIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB9IGVsc2UgaWYgKGZvcmNlKSB7XG4gICAgICB0aGlzLmZvcmNlID0gZm9yY2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IE1hdGhVdGlsLnJhbmRvbUFUb0IoLU1hdGhVdGlsLlBJLCBNYXRoVXRpbC5QSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSB0aGlzLnNwYW4uZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGdyYWRpZW50ID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiIHx8IHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBncmFkaWVudCArPSBwYXJ0aWNsZS5kYXRhLmNhbmdsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JhZGllbnQgKz0gdGhpcy5hbmdsZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JjZSA9PT0gQ0hBTkdJTkcpIHtcbiAgICAgIGxlbmd0aCA9IHBhcnRpY2xlLnYubGVuZ3RoKCkgLyAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRoaXMuZm9yY2U7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnggPSBsZW5ndGggKiBNYXRoLmNvcyhncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnkgPSBsZW5ndGggKiBNYXRoLnNpbihncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gdGhpcy5ub3JtYWxpemVGb3JjZShwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gIH1cbn1cbiIsImltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL0F0dHJhY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwdWxzaW9uIGV4dGVuZHMgQXR0cmFjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgb3BwaXNpdGUgb2YgUHJvdG9uLkF0dHJhY3Rpb24gLSB0dXJucyB0aGUgZm9yY2VcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUmVwdWxzaW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9yY2VcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICAgIHRoaXMubmFtZSA9IFwiUmVwdWxzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUmVwdWxzaW9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5V2VsbCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIEdyYXZpdHlXZWxsXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlXZWxsXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXRkb2NcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYy5zZXQodGhpcy5jZW50ZXJQb2ludC54IC0gcGFydGljbGUucC54LCB0aGlzLmNlbnRlclBvaW50LnkgLSBwYXJ0aWNsZS5wLnkpO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAoZGlzdGFuY2VTcSAhPT0gMCkge1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aCgpO1xuICAgICAgY29uc3QgZmFjdG9yID0gKHRoaXMuZm9yY2UgKiB0aW1lKSAvIChkaXN0YW5jZVNxICogZGlzdGFuY2UpO1xuXG4gICAgICBwYXJ0aWNsZS52LnggKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy54O1xuICAgICAgcGFydGljbGUudi55ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRpYWxpemUoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gaW5pdGlhbGl6ZXMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5pdGlhbGl6ZXNbaV0gaW5zdGFuY2VvZiBJbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemVzW2ldLmluaXQoZW1pdHRlciwgcGFydGljbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gIH0sXG5cbiAgLy8gaW5pdFxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplKSB7XG4gICAgUHJvcFV0aWwuc2V0UHJvcChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gICAgUHJvcFV0aWwuc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgfSxcblxuICBiaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChlbWl0dGVyLmJpbmRFbWl0dGVyKSB7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChlbWl0dGVyLnApO1xuICAgICAgcGFydGljbGUudi5hZGQoZW1pdHRlci52KTtcbiAgICAgIHBhcnRpY2xlLmEuYWRkKGVtaXR0ZXIuYSk7XG4gICAgICBwYXJ0aWNsZS52LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0oZW1pdHRlci5yb3RhdGlvbikpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuLi9pbml0aWFsaXplL1JhdGVcIjtcbmltcG9ydCBJbml0aWFsaXplVXRpbCBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0dGVyIGV4dGVuZHMgUGFydGljbGUge1xuICAvKipcbiAgICogWW91IGNhbiB1c2UgdGhpcyBlbWl0IHBhcnRpY2xlcy5cbiAgICpcbiAgICogSXQgd2lsbCBkaXNwYXRjaCBmb2xsb3cgZXZlbnRzOlxuICAgKiBQQVJUSUNMRV9DUkVBVEVEXG4gICAqIFBBUlRJQ0xFX1VQREFUQVxuICAgKiBQQVJUSUNMRV9ERUFEXG4gICAqXG4gICAqIEBjbGFzcyBFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtkYW1waW5nOjAuMDEsYmluZEVtaXR0ZXI6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mID0ge30pIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMucGFydGljbGVzID0gW107XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG4gICAgdGhpcy5pbml0aWFsaXplcyA9IFtdO1xuXG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy5lbWl0U3BlZWQgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnJpY3Rpb24gY29lZmZpY2llbnQgZm9yIGFsbCBwYXJ0aWNsZSBlbWl0IGJ5IFRoaXM7XG4gICAgICogQHByb3BlcnR5IGRhbXBpbmdcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDAuMDA2XG4gICAgICovXG4gICAgdGhpcy5kYW1waW5nID0gMC4wMDY7XG5cbiAgICAvKipcbiAgICAgKiBJZiBiaW5kRW1pdHRlciB0aGUgcGFydGljbGVzIGNhbiBiaW5kIHRoaXMgZW1pdHRlcidzIHByb3BlcnR5O1xuICAgICAqIEBwcm9wZXJ0eSBiaW5kRW1pdHRlclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICB0aGlzLmJpbmRFbWl0dGVyID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHBlciBzZWNvbmQgZW1pdCAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICAgKiBAcHJvcGVydHkgcmF0ZVxuICAgICAqIEB0eXBlIHtSYXRlfVxuICAgICAqIEBkZWZhdWx0IFJhdGUoMSwgLjEpXG4gICAgICovXG4gICAgdGhpcy5yYXRlID0gbmV3IFJhdGUoMSwgMC4xKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRW1pdHRlclwiO1xuICAgIHRoaXMuaWQgPSBQdWlkLmlkKHRoaXMubmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVtaXRUaW1lIGJlZ2luIGVtaXQgdGltZTtcbiAgICogQHBhcmFtIHtTdHJpbmd9IGxpZmUgdGhlIGxpZmUgb2YgdGhpcyBlbWl0dGVyXG4gICAqL1xuICBlbWl0KHRvdGFsVGltZSwgbGlmZSkge1xuICAgIHRoaXMuc3RvcGVkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSBVdGlsLmluaXRWYWx1ZSh0b3RhbFRpbWUsIEluZmluaXR5KTtcblxuICAgIGlmIChsaWZlID09PSB0cnVlIHx8IGxpZmUgPT09IFwibGlmZVwiIHx8IGxpZmUgPT09IFwiZGVzdHJveVwiKSB7XG4gICAgICB0aGlzLmxpZmUgPSB0b3RhbFRpbWUgPT09IFwib25jZVwiID8gMSA6IHRoaXMudG90YWxUaW1lO1xuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGxpZmUpKSB7XG4gICAgICB0aGlzLmxpZmUgPSBsaWZlO1xuICAgIH1cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmKHRoaXMuc3RvcGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy50b3RhbFRpbWUgPT09IFwibm9uZVwiKSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJvbmNlXCIpIHtcbiAgICAgIGxldCBpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB0aGlzLnRvdGFsVGltZSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG5cbiAgICAgIGlmICh0aGlzLmVtaXRUaW1lIDwgdGhpcy50b3RhbFRpbWUpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgc2luZ2xlIHBhcnRpY2xlO1xuICAgKlxuICAgKiBjYW4gdXNlIGVtaXQoe3g6MTB9LG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KSBvciBlbWl0KFt7eDoxMH0sbmV3IEluaXRpYWxpemVdLG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KVxuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGxldCBpbml0aWFsaXplcyA9IHRoaXMuaW5pdGlhbGl6ZXM7XG4gICAgbGV0IGJlaGF2aW91cnMgPSB0aGlzLmJlaGF2aW91cnM7XG5cbiAgICBpZiAoaW5pdGlhbGl6ZSkgaW5pdGlhbGl6ZXMgPSBVdGlsLnRvQXJyYXkoaW5pdGlhbGl6ZSk7XG4gICAgaWYgKGJlaGF2aW91cikgYmVoYXZpb3VycyA9IFV0aWwudG9BcnJheShiZWhhdmlvdXIpO1xuXG4gICAgcGFydGljbGUucmVzZXQoKTtcbiAgICBJbml0aWFsaXplVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcyk7XG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucGFydGljbGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcblxuICAgIHRoaXMucmF0ZSA9IG51bGw7XG4gICAgdGhpcy5vbGQgPSBudWxsO1xuICAgIHRoaXMucmdiID0gbnVsbDtcbiAgICB0aGlzLnYgPSBudWxsO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdGhpcy5wID0gbnVsbDtcbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChFbWl0dGVyKTtcbiIsImltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyRW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEJlaGF2aW91ckVtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEJlaGF2aW91ckVtaXR0ZXIgeW91IGNhbiBhZGQgYmVoYXZpb3VycyB0byBzZWxmO1xuICAgKiBAY2xhc3MgUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMuc2VsZkJlaGF2aW91cnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBlbWl0dGVyO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IFByb3Rvbi5Db2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZFNlbGZCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpLFxuICAgICAgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXIgZm9yIHNlbGZcbiAgICogQG1ldGhvZCByZW1vdmVTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVTZWxmQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuc2VsZkJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgc3VwZXIudXBkYXRlKHRpbWUpO1xuXG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmxlbmd0aDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd0VtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBGb2xsb3dFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBGb2xsb3dFbWl0dGVyIHdpbGwgZW1pdCBwYXJ0aWNsZSB3aGVuIG1vdXNlbW92aW5nXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uRm9sbG93RW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtFbGVtZW50fSBtb3VzZVRhcmdldCBtb3VzZWV2ZW50J3MgdGFyZ2V0O1xuICAgKiBAcGFyYW0ge051bWJlcn0gZWFzZSB0aGUgZWFzaW5nIG9mIGZvbGxvd2luZyBzcGVlZDtcbiAgICogQGRlZmF1bHQgMC43XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1vdXNlVGFyZ2V0LCBlYXNlLCBjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcblxuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlbW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZWRvd24uY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNldXBIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNldXAuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZW1vdmUoZSkge1xuICAgIGlmIChlLmxheWVyWCB8fCBlLmxheWVyWCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUubGF5ZXJYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH0gZWxzZSBpZiAoZS5vZmZzZXRYIHx8IGUub2Zmc2V0WCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUub2Zmc2V0WCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLm9mZnNldFkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoXCJvbmNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHBpY3R1cmUgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc0ltYWdlKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5fX2lzSW1hZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIG9iai5fX2lzSW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHN0cmluZyBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICB9XG59O1xuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5uYW1lID0gXCJCYXNlUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFN0cm9rZShjb2xvciA9IFwiIzAwMDAwMFwiLCB0aGlua25lc3MgPSAxKSB7XG4gICAgdGhpcy5zdHJva2UgPSB7IGNvbG9yLCB0aGlua25lc3MgfTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZUFmdGVyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyQWRkZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlclJlbW92ZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZURlYWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwcm90b247XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0ltYWdlIG1ldGhvZFxuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZSBkcmF3Q2lyY2xlIC0tXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY2lyY2xlXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvLyBwcml2YXRlIGNyZWF0ZUJ1ZmZlclxuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoVHlwZXMuaXNJbWFnZShpbWFnZSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBpbWFnZS53aWR0aCArIFwiX1wiICsgaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV07XG5cbiAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdID0gY2FudmFzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtM2QgPSBmYWxzZTtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRvbVJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zZCkge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybTNkKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0ocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUub3BhY2l0eSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgICBpZiAocGFydGljbGUuYm9keS5pc0NpcmNsZSkge1xuICAgICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGJvZHlSZWFkeShwYXJ0aWNsZSkge1xuICAgIHJldHVybiB0eXBlb2YgcGFydGljbGUuYm9keSA9PT0gXCJvYmplY3RcIiAmJiBwYXJ0aWNsZS5ib2R5ICYmICFwYXJ0aWNsZS5ib2R5LmlzSW5uZXI7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChpbWcsIHBhcnRpY2xlKTtcbiAgICBEb21VdGlsLnJlc2l6ZShwYXJ0aWNsZS5ib2R5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIDIgKiBwYXJ0aWNsZS5yYWRpdXMsIDIgKiBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHtwYXJ0aWNsZS5yYWRpdXN9cHhgO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJXaWR0aCA9IGAke3RoaXMuc3Ryb2tlLnRoaW5rbmVzc31weGA7XG4gICAgfVxuICAgIGRvbS5pc0NpcmNsZSA9IHRydWU7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdXJsID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIgPyBib2R5IDogYm9keS5zcmM7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIGJvZHkud2lkdGgsIGJvZHkuaGVpZ2h0KTtcbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3VybH0pYDtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc2VsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMubmFtZSA9IFwiRWFzZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgdGhpcy5jcmVhdGVTcHJpdGUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHBhcnRpY2xlLmJvZHkuc2NhbGVYID0gcGFydGljbGUuYm9keS5zY2FsZVkgPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICAgIHBhcnRpY2xlLmJvZHkucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnBhcmVudCAmJiBwYXJ0aWNsZS5ib2R5LnBhcmVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUuZ3JhcGhpY3MpIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuZ3JhcGhpY3MpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBjcmVhdGVTcHJpdGUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5LnBhcmVudCkgcmV0dXJuO1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5W1wiaW1hZ2VcIl0pIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWCA9IHBhcnRpY2xlLmJvZHkuaW1hZ2Uud2lkdGggLyAyO1xuICAgICAgcGFydGljbGUuYm9keS5yZWdZID0gcGFydGljbGUuYm9keS5pbWFnZS5oZWlnaHQgLyAyO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gdGhpcy5wb29sLmdldCh3aW5kb3cuY3JlYXRlanMuR3JhcGhpY3MpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBpZiAoVHlwZXMuaXNTdHJpbmcodGhpcy5zdHJva2UpKSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKHRoaXMuc3Ryb2tlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKFwiIzAwMDAwMFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiKS5kcmF3Q2lyY2xlKDAsIDAsIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLnBvb2wuZ2V0KHdpbmRvdy5jcmVhdGVqcy5TaGFwZSwgW2dyYXBoaWNzXSk7XG5cbiAgICBwYXJ0aWNsZS5ib2R5ID0gc2hhcGU7XG4gICAgcGFydGljbGUuZ3JhcGhpY3MgPSBncmFwaGljcztcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi4vbWF0aC9SZWN0YW5nbGVcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpeGVsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCByZWN0YW5nbGUpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlO1xuICAgIHRoaXMuY3JlYXRlSW1hZ2VEYXRhKHJlY3RhbmdsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGVsUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIGNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpIHtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZSA/IHJlY3RhbmdsZSA6IG5ldyBSZWN0YW5nbGUoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGhpcy5yZWN0YW5nbGUud2lkdGgsIHRoaXMucmVjdGFuZ2xlLmhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnksIHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YShcbiAgICAgIHRoaXMucmVjdGFuZ2xlLngsXG4gICAgICB0aGlzLnJlY3RhbmdsZS55LFxuICAgICAgdGhpcy5yZWN0YW5nbGUud2lkdGgsXG4gICAgICB0aGlzLnJlY3RhbmdsZS5oZWlnaHRcbiAgICApO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHtcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCB0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55KTtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEpIHtcbiAgICAgIHRoaXMuc2V0UGl4ZWwoXG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhLFxuICAgICAgICAocGFydGljbGUucC54IC0gdGhpcy5yZWN0YW5nbGUueCkgPj4gMCxcbiAgICAgICAgKHBhcnRpY2xlLnAueSAtIHRoaXMucmVjdGFuZ2xlLnkpID4+IDAsXG4gICAgICAgIHBhcnRpY2xlXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldFBpeGVsKGltYWdlZGF0YSwgeCwgeSwgcGFydGljbGUpIHtcbiAgICBjb25zdCByZ2IgPSBwYXJ0aWNsZS5yZ2I7XG4gICAgaWYgKHggPCAwIHx8IHggPiB0aGlzLmVsZW1lbnQud2lkdGggfHwgeSA8IDAgfHwgeSA+IHRoaXMuZWxlbWVudC5oZWlnaHQpIHJldHVybjtcblxuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiBpbWFnZWRhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIGltYWdlZGF0YS5kYXRhW2ldID0gcmdiLnI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDFdID0gcmdiLmc7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDJdID0gcmdiLmI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDNdID0gcGFydGljbGUuYWxwaGEgKiAyNTU7XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxubGV0IFBJWElDbGFzcztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpeGlSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q29sb3IgPSBmYWxzZTtcbiAgICB0aGlzLmJsZW5kTW9kZSA9IG51bGw7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLnNldFBJWEkod2luZG93LlBJWEkpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhpUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFBJWEkoUElYSSkge1xuICAgIHRyeSB7XG4gICAgICBQSVhJQ2xhc3MgPSBQSVhJIHx8IHsgU3ByaXRlOiB7fSB9O1xuICAgICAgdGhpcy5jcmVhdGVGcm9tSW1hZ2UgPSBQSVhJQ2xhc3MuU3ByaXRlLmZyb20gfHwgUElYSUNsYXNzLlNwcml0ZS5mcm9tSW1hZ2U7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSkge1xuICAgICAgcGFydGljbGUuYm9keS5ibGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgdGhpcy50cmFuc2Zvcm0ocGFydGljbGUsIHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgaWYgKHRoaXMuc2V0Q29sb3IgPT09IHRydWUgfHwgdGhpcy5jb2xvciA9PT0gdHJ1ZSkge1xuICAgICAgcGFydGljbGUuYm9keS50aW50ID0gQ29sb3JVdGlsLmdldEhleDE2RnJvbVBhcnRpY2xlKHBhcnRpY2xlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICB9XG5cbiAgdHJhbnNmb3JtKHBhcnRpY2xlLCB0YXJnZXQpIHtcbiAgICB0YXJnZXQueCA9IHBhcnRpY2xlLnAueDtcbiAgICB0YXJnZXQueSA9IHBhcnRpY2xlLnAueTtcblxuICAgIHRhcmdldC5hbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGFyZ2V0LnNjYWxlLnggPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICB0YXJnZXQuc2NhbGUueSA9IHBhcnRpY2xlLnNjYWxlO1xuXG4gICAgLy8gdXNpbmcgY2FjaGVkIHZlcnNpb24gb2YgTWF0aFV0aWwuUElfMTgwIGZvciBzbGlnaHQgcGVyZm9ybWFuY2UgaW5jcmVhc2UuXG4gICAgdGFyZ2V0LnJvdGF0aW9uID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7IC8vIE1hdGhVdGlsLlBJXzE4MDtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICBlbHNlIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5KSB7XG4gICAgY29uc3Qgc3ByaXRlID0gYm9keS5pc0lubmVyID8gdGhpcy5jcmVhdGVGcm9tSW1hZ2UoYm9keS5zcmMpIDogbmV3IFBJWElDbGFzcy5TcHJpdGUoYm9keSk7XG5cbiAgICBzcHJpdGUuYW5jaG9yLnggPSAwLjU7XG4gICAgc3ByaXRlLmFuY2hvci55ID0gMC41O1xuXG4gICAgcmV0dXJuIHNwcml0ZTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gbmV3IFBJWElDbGFzcy5HcmFwaGljcygpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBjb25zdCBzdHJva2UgPSBUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkgPyB0aGlzLnN0cm9rZSA6IDB4MDAwMDAwO1xuICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2Uoc3Ryb2tlKTtcbiAgICB9XG5cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgMHgwMDhjZWQpO1xuICAgIGdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBncmFwaGljcy5lbmRGaWxsKCk7XG5cbiAgICByZXR1cm4gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KHBhcnRpY2xlcykge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcblxuICAgIGxldCBpID0gcGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBsZXQgcGFydGljbGUgPSBwYXJ0aWNsZXNbaV07XG4gICAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1TdGFjayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWF0cyA9IFtdO1xuICAgIHRoaXMuc2l6ZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHRoaXMubWF0cy5wdXNoKE1hdDMuY3JlYXRlKFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSkpO1xuICB9XG5cbiAgc2V0KG0sIGkpIHtcbiAgICBpZiAoaSA9PT0gMCkgTWF0My5zZXQobSwgdGhpcy5tYXRzWzBdKTtcbiAgICBlbHNlIE1hdDMubXVsdGlwbHkodGhpcy5tYXRzW2kgLSAxXSwgbSwgdGhpcy5tYXRzW2ldKTtcblxuICAgIHRoaXMuc2l6ZSA9IE1hdGgubWF4KHRoaXMuc2l6ZSwgaSArIDEpO1xuICB9XG5cbiAgcHVzaChtKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkgTWF0My5zZXQobSwgdGhpcy5tYXRzWzBdKTtcbiAgICBlbHNlIE1hdDMubXVsdGlwbHkodGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdLCBtLCB0aGlzLm1hdHNbdGhpcy5zaXplXSk7XG5cbiAgICB0aGlzLnNpemUrKztcbiAgfVxuXG4gIHBvcCgpIHtcbiAgICBpZiAodGhpcy5zaXplID4gMCkgdGhpcy5zaXplLS07XG4gIH1cblxuICB0b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0c1t0aGlzLnNpemUgLSAxXTtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdDMgZnJvbSBcIi4uL21hdGgvTWF0M1wiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgTVN0YWNrIGZyb20gXCIuLi91dGlscy9NU3RhY2tcIjtcbmltcG9ydCBEb21VdGlsIGZyb20gXCIuLi91dGlscy9Eb21VdGlsXCI7XG5pbXBvcnQgV2ViR0xVdGlsIGZyb20gXCIuLi91dGlscy9XZWJHTFV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJHTFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5nbCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIsIHsgYW50aWFsaWFzOiB0cnVlLCBzdGVuY2lsOiBmYWxzZSwgZGVwdGg6IGZhbHNlIH0pO1xuICAgIGlmICghdGhpcy5nbCkgYWxlcnQoXCJTb3JyeSB5b3VyIGJyb3dzZXIgZG8gbm90IHN1cHBlc3QgV2ViR0whXCIpO1xuXG4gICAgdGhpcy5pbml0VmFyKCk7XG4gICAgdGhpcy5zZXRNYXhSYWRpdXMoKTtcbiAgICB0aGlzLmluaXRTaGFkZXJzKCk7XG4gICAgdGhpcy5pbml0QnVmZmVycygpO1xuXG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2wuRlVOQ19BREQpO1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIldlYkdMUmVuZGVyZXJcIjtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgc3VwZXIuaW5pdChwcm90b24pO1xuICAgIHRoaXMucmVzaXplKHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMudW1hdFs0XSA9IC0yO1xuICAgIHRoaXMudW1hdFs3XSA9IDE7XG5cbiAgICB0aGlzLnNtYXRbMF0gPSAxIC8gd2lkdGg7XG4gICAgdGhpcy5zbWF0WzRdID0gMSAvIGhlaWdodDtcblxuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnVtYXQsIDApO1xuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnNtYXQsIDEpO1xuXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0TWF4UmFkaXVzKHJhZGl1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzVVJMID0gdGhpcy5jcmVhdGVDaXJjbGUocmFkaXVzKTtcbiAgfVxuXG4gIGdldFZlcnRleFNoYWRlcigpIHtcbiAgICBjb25zdCB2c1NvdXJjZSA9IFtcbiAgICAgIFwidW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1wiLFxuICAgICAgXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInVuaWZvcm0gbWF0MyB0TWF0O1wiLFxuICAgICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidmFyeWluZyBmbG9hdCBhbHBoYTtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWMzIHYgPSB0TWF0ICogdmVjMyhhVmVydGV4UG9zaXRpb24sIDEuMCk7XCIsXG4gICAgICBcImdsX1Bvc2l0aW9uID0gdmVjNCh2LngsIHYueSwgMCwgMSk7XCIsXG4gICAgICBcInZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJhbHBoYSA9IHRNYXRbMF1bMl07XCIsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gdnNTb3VyY2U7XG4gIH1cblxuICBnZXRGcmFnbWVudFNoYWRlcigpIHtcbiAgICBjb25zdCBmc1NvdXJjZSA9IFtcbiAgICAgIFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWM0IGNvbG9yO1wiLFxuICAgICAgXCJ1bmlmb3JtIGJvb2wgdXNlVGV4dHVyZTtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWMzIHVDb2xvcjtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWM0IHRleHR1cmVDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvciA9IHRleHR1cmVDb2xvciAqIHZlYzQodUNvbG9yLCAxLjApO1wiLFxuICAgICAgXCJnbF9GcmFnQ29sb3IudyAqPSBhbHBoYTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiBmc1NvdXJjZTtcbiAgfVxuXG4gIGluaXRWYXIoKSB7XG4gICAgdGhpcy5tc3RhY2sgPSBuZXcgTVN0YWNrKCk7XG4gICAgdGhpcy51bWF0ID0gTWF0My5jcmVhdGUoWzIsIDAsIDEsIDAsIC0yLCAwLCAtMSwgMSwgMV0pO1xuICAgIHRoaXMuc21hdCA9IE1hdDMuY3JlYXRlKFsxIC8gMTAwLCAwLCAxLCAwLCAxIC8gMTAwLCAwLCAwLCAwLCAxXSk7XG4gICAgdGhpcy50ZXh0dXJlYnVmZmVycyA9IHt9O1xuICB9XG5cbiAgYmxlbmRFcXVhdGlvbihBKSB7XG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2xbQV0pO1xuICB9XG5cbiAgYmxlbmRGdW5jKEEsIEIpIHtcbiAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsW0FdLCB0aGlzLmdsW0JdKTtcbiAgfVxuXG4gIGdldFNoYWRlcihnbCwgc3RyLCBmcykge1xuICAgIGNvbnN0IHNoYWRlciA9IGZzID8gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUikgOiBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzdHIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBhbGVydChnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfVxuXG4gIGluaXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5nZXRTaGFkZXIodGhpcy5nbCwgdGhpcy5nZXRGcmFnbWVudFNoYWRlcigpLCB0cnVlKTtcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldFZlcnRleFNoYWRlcigpLCBmYWxzZSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5zcHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgdGhpcy5nbC5saW5rUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcblxuICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuc3Byb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSBhbGVydChcIkNvdWxkIG5vdCBpbml0aWFsaXNlIHNoYWRlcnNcIik7XG5cbiAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5zcHJvZ3JhbSk7XG4gICAgdGhpcy5zcHJvZ3JhbS52cGEgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVZlcnRleFBvc2l0aW9uXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udGNhID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcImFUZXh0dXJlQ29vcmRcIik7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnRjYSk7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnZwYSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ0TWF0XCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVTYW1wbGVyXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udXNlVGV4ID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1c2VUZXh0dXJlXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uY29sb3IgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVDb2xvclwiKTtcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnVzZVRleCwgMSk7XG4gIH1cblxuICBpbml0QnVmZmVycygpIHtcbiAgICBjb25zdCB2cyA9IFswLCAzLCAxLCAwLCAyLCAzXTtcbiAgICBsZXQgaWR4O1xuXG4gICAgdGhpcy51bml0SUJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodnMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGxldCBpO1xuICAgIGxldCBpZHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTAwOyBpKyspIGlkcy5wdXNoKGkpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy51bml0STMzID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0STMzKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcbiAgICBpZHggPSBuZXcgVWludDE2QXJyYXkoaWRzKTtcblxuICAgIHRoaXMuc3RyaXBCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnN0cmlwQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShyYWlkdXMpIHtcbiAgICB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyA9IFdlYkdMVXRpbC5uaHBvdChVdGlsLmluaXRWYWx1ZShyYWlkdXMsIDMyKSk7XG4gICAgY29uc3QgY2FudmFzID0gRG9tVXRpbC5jcmVhdGVDYW52YXMoXCJjaXJjbGVfY2FudmFzXCIsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzICogMiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyKTtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcblxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gIH1cblxuICBkcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IF93ID0gcGFydGljbGUuYm9keS53aWR0aDtcbiAgICBjb25zdCBfaCA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0O1xuXG4gICAgY29uc3QgX3dpZHRoID0gV2ViR0xVdGlsLm5ocG90KHBhcnRpY2xlLmJvZHkud2lkdGgpO1xuICAgIGNvbnN0IF9oZWlnaHQgPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS5oZWlnaHQpO1xuXG4gICAgY29uc3QgX3NjYWxlWCA9IHBhcnRpY2xlLmJvZHkud2lkdGggLyBfd2lkdGg7XG4gICAgY29uc3QgX3NjYWxlWSA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0IC8gX2hlaWdodDtcblxuICAgIGlmICghdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY10pXG4gICAgICB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSA9IFtcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKClcbiAgICAgIF07XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmUgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVswXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMV07XG4gICAgcGFydGljbGUuZGF0YS50Y0J1ZmZlciA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzJdO1xuXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfc2NhbGVYLCAwLjAsIDAuMCwgX3NjYWxlWSwgX3NjYWxlWSwgX3NjYWxlWV0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfdywgMC4wLCAwLjAsIF9oLCBfdywgX2hdKSxcbiAgICAgIHRoaXMuZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuXG4gICAgY29uc3QgY29udGV4dCA9IHBhcnRpY2xlLmRhdGEuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcblxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBwYXJ0aWNsZS5kYXRhLnRleHR1cmUpO1xuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLkxJTkVBUik7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKTtcbiAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSB0cnVlO1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZVdpZHRoID0gX3c7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0ID0gX2g7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHtcbiAgICAvLyB0aGlzLmdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSk7XG4gICAgLy8gdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSBmYWxzZTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRtYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdFs4XSA9IDE7XG4gICAgcGFydGljbGUuZGF0YS5pbWF0ID0gTWF0My5jcmVhdGUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXRbOF0gPSAxO1xuXG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUodGhpcy5jaXJjbGVDYW52YXNVUkwsIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSBwYXJ0aWNsZS5yYWRpdXMgLyB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cztcbiAgICB9XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIGFkZEltZzJCb2R5KGltZywgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGVhZCkgcmV0dXJuO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gICAgcGFydGljbGUuZGF0YS5zcmMgPSBpbWcuc3JjO1xuICAgIHBhcnRpY2xlLmRhdGEuY2FudmFzID0gSW1nVXRpbC5nZXRDYW52YXNGcm9tQ2FjaGUoaW1nKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlID0gMTtcblxuICAgIHRoaXMuZHJhd0ltZzJDYW52YXMocGFydGljbGUpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KHBhcnRpY2xlKTtcblxuICAgICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zcHJvZ3JhbS5jb2xvciwgcGFydGljbGUucmdiLnIgLyAyNTUsIHBhcnRpY2xlLnJnYi5nIC8gMjU1LCBwYXJ0aWNsZS5yZ2IuYiAvIDI1NSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zcHJvZ3JhbS50TWF0VW5pZm9ybSwgZmFsc2UsIHRoaXMubXN0YWNrLnRvcCgpKTtcblxuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnZwYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnRjYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnNhbXBsZXJVbmlmb3JtLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJQnVmZmVyKTtcblxuICAgICAgdGhpcy5nbC5kcmF3RWxlbWVudHModGhpcy5nbC5UUklBTkdMRVMsIDYsIHRoaXMuZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuICAgICAgdGhpcy5tc3RhY2sucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG5cbiAgdXBkYXRlTWF0cml4KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgbW92ZU9yaWdpbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlVHJhbnNsYXRpb24oXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggLyAyLFxuICAgICAgLXBhcnRpY2xlLmRhdGEudGV4dHVyZUhlaWdodCAvIDJcbiAgICApO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSk7XG5cbiAgICBjb25zdCBhbmdlbCA9IHBhcnRpY2xlLnJvdGF0aW9uICogTWF0aFV0aWwuUElfMTgwO1xuICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VSb3RhdGlvbihhbmdlbCk7XG5cbiAgICBjb25zdCBzY2FsZSA9IHBhcnRpY2xlLnNjYWxlICogcGFydGljbGUuZGF0YS5vbGRTY2FsZTtcbiAgICBjb25zdCBzY2FsZU1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlU2NhbGUoc2NhbGUsIHNjYWxlKTtcbiAgICBsZXQgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1vdmVPcmlnaW5NYXRyaXgsIHNjYWxlTWF0cml4KTtcblxuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHJvdGF0aW9uTWF0cml4KTtcbiAgICBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobWF0cml4LCB0cmFuc2xhdGlvbk1hdHJpeCk7XG5cbiAgICBNYXQzLmludmVyc2UobWF0cml4LCBwYXJ0aWNsZS5kYXRhLmltYXQpO1xuICAgIG1hdHJpeFsyXSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGhpcy5tc3RhY2sucHVzaChtYXRyaXgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5nbCA9IG51bGw7XG4gICAgdGhpcy5tc3RhY2sgPSBudWxsO1xuICAgIHRoaXMudW1hdCA9IG51bGw7XG4gICAgdGhpcy5zbWF0ID0gbnVsbDtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkN1c3RvbVJlbmRlcmVyXCI7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeDEsIHkxLCB4MiwgeTIsIGRpcmVjdGlvbikge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoeDIgLSB4MSA+PSAwKSB7XG4gICAgICB0aGlzLngxID0geDE7XG4gICAgICB0aGlzLnkxID0geTE7XG4gICAgICB0aGlzLngyID0geDI7XG4gICAgICB0aGlzLnkyID0geTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueDEgPSB4MjtcbiAgICAgIHRoaXMueTEgPSB5MjtcbiAgICAgIHRoaXMueDIgPSB4MTtcbiAgICAgIHRoaXMueTIgPSB5MTtcbiAgICB9XG5cbiAgICB0aGlzLmR4ID0gdGhpcy54MiAtIHRoaXMueDE7XG4gICAgdGhpcy5keSA9IHRoaXMueTIgLSB0aGlzLnkxO1xuXG4gICAgdGhpcy5taW54ID0gTWF0aC5taW4odGhpcy54MSwgdGhpcy54Mik7XG4gICAgdGhpcy5taW55ID0gTWF0aC5taW4odGhpcy55MSwgdGhpcy55Mik7XG4gICAgdGhpcy5tYXh4ID0gTWF0aC5tYXgodGhpcy54MSwgdGhpcy54Mik7XG4gICAgdGhpcy5tYXh5ID0gTWF0aC5tYXgodGhpcy55MSwgdGhpcy55Mik7XG5cbiAgICB0aGlzLmRvdCA9IHRoaXMueDIgKiB0aGlzLnkxIC0gdGhpcy54MSAqIHRoaXMueTI7XG4gICAgdGhpcy54eHl5ID0gdGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keTtcblxuICAgIHRoaXMuZ3JhZGllbnQgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLmdldExlbmd0aCgpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gVXRpbC5pbml0VmFsdWUoZGlyZWN0aW9uLCBcIj5cIik7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueDEgKyB0aGlzLnJhbmRvbSAqIHRoaXMubGVuZ3RoICogTWF0aC5jb3ModGhpcy5ncmFkaWVudCk7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTEgKyB0aGlzLnJhbmRvbSAqIHRoaXMubGVuZ3RoICogTWF0aC5zaW4odGhpcy5ncmFkaWVudCk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGNvbnN0IEEgPSB0aGlzLmR5O1xuICAgIGNvbnN0IEIgPSAtdGhpcy5keDtcbiAgICBjb25zdCBDID0gdGhpcy5kb3Q7XG4gICAgY29uc3QgRCA9IEIgPT09IDAgPyAxIDogQjtcblxuICAgIGlmICgoQSAqIHggKyBCICogeSArIEMpICogRCA+IDApIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0RGlzdGFuY2UoeCwgeSkge1xuICAgIGNvbnN0IEEgPSB0aGlzLmR5O1xuICAgIGNvbnN0IEIgPSAtdGhpcy5keDtcbiAgICBjb25zdCBDID0gdGhpcy5kb3Q7XG4gICAgY29uc3QgRCA9IEEgKiB4ICsgQiAqIHkgKyBDO1xuXG4gICAgcmV0dXJuIEQgLyBNYXRoLnNxcnQodGhpcy54eHl5KTtcbiAgfVxuXG4gIGdldFN5bW1ldHJpYyh2KSB7XG4gICAgY29uc3QgdGhhMiA9IHYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYSA9IDIgKiAodGhhMSAtIHRoYTIpO1xuXG4gICAgY29uc3Qgb2xkeCA9IHYueDtcbiAgICBjb25zdCBvbGR5ID0gdi55O1xuXG4gICAgdi54ID0gb2xkeCAqIE1hdGguY29zKHRoYSkgLSBvbGR5ICogTWF0aC5zaW4odGhhKTtcbiAgICB2LnkgPSBvbGR4ICogTWF0aC5zaW4odGhhKSArIG9sZHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBnZXRHcmFkaWVudCgpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLmR5LCB0aGlzLmR4KTtcbiAgfVxuXG4gIHJhbmdlT3V0KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmFicyh0aGlzLmdldEdyYWRpZW50KCkpO1xuXG4gICAgaWYgKGFuZ2xlIDw9IE1hdGhVdGlsLlBJIC8gNCkge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCA8PSB0aGlzLm1heHggJiYgcGFydGljbGUucC54ID49IHRoaXMubWlueCkgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgPD0gdGhpcy5tYXh5ICYmIHBhcnRpY2xlLnAueSA+PSB0aGlzLm1pbnkpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZHggKiB0aGlzLmR4ICsgdGhpcy5keSAqIHRoaXMuZHkpO1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IFwiPlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcIlJcIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJyaWdodFwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcImRvd25cIikge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG5cbiAgICAgIGlmICh0aGlzLmdldERpc3RhbmNlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSA8PSBwYXJ0aWNsZS5yYWRpdXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZHggPT09IDApIHtcbiAgICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keSA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZS52KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBMaW5lWm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzIG1ldGhvZCFcIik7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHJhZGl1cykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgdGhpcy5jZW50ZXIgPSB7IHgsIHkgfTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSXgyICogTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnJhbmRvbVJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLnNpbih0aGlzLmFuZ2xlKTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIHNldENlbnRlcih4LCB5KSB7XG4gICAgdGhpcy5jZW50ZXIueCA9IHg7XG4gICAgdGhpcy5jZW50ZXIueSA9IHk7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGQgPSBwYXJ0aWNsZS5wLmRpc3RhbmNlVG8odGhpcy5jZW50ZXIpO1xuXG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKGQgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnJhZGl1cykgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoZCArIHBhcnRpY2xlLnJhZGl1cyA+PSB0aGlzLnJhZGl1cykgdGhpcy5nZXRTeW1tZXRyaWMocGFydGljbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBDaXJjbGVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFN5bW1ldHJpYyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHRoYTIgPSBwYXJ0aWNsZS52LmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhMSA9IHRoaXMuZ2V0R3JhZGllbnQocGFydGljbGUpO1xuXG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG4gICAgY29uc3Qgb2xkeCA9IHBhcnRpY2xlLnYueDtcbiAgICBjb25zdCBvbGR5ID0gcGFydGljbGUudi55O1xuXG4gICAgcGFydGljbGUudi54ID0gb2xkeCAqIE1hdGguY29zKHRoYSkgLSBvbGR5ICogTWF0aC5zaW4odGhhKTtcbiAgICBwYXJ0aWNsZS52LnkgPSBvbGR4ICogTWF0aC5zaW4odGhhKSArIG9sZHkgKiBNYXRoLmNvcyh0aGEpO1xuICB9XG5cbiAgZ2V0R3JhZGllbnQocGFydGljbGUpIHtcbiAgICByZXR1cm4gLU1hdGhVdGlsLlBJXzIgKyBNYXRoLmF0YW4yKHBhcnRpY2xlLnAueSAtIHRoaXMuY2VudGVyLnksIHBhcnRpY2xlLnAueCAtIHRoaXMuY2VudGVyLngpO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3Rab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aDtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0O1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICAvLyBwYXJ0aWNsZSBkZWFkIHpvbmVcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGgpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuXG4gICAgICBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBib3VuZCB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoIC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFydGljbGUgY3Jvc3Mgem9uZVxuICAgIGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnggJiYgcGFydGljbGUudi54IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgdGhpcy53aWR0aCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCAmJiBwYXJ0aWNsZS52LnggPj0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkgJiYgcGFydGljbGUudi55IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0ICYmIHBhcnRpY2xlLnYueSA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3RvcihpbWFnZURhdGEsIHgsIHksIGQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKTtcbiAgfVxuXG4gIHJlc2V0KGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gaW1hZ2VEYXRhO1xuICAgIHRoaXMueCA9IFV0aWwuaW5pdFZhbHVlKHgsIDApO1xuICAgIHRoaXMueSA9IFV0aWwuaW5pdFZhbHVlKHksIDApO1xuICAgIHRoaXMuZCA9IFV0aWwuaW5pdFZhbHVlKGQsIDIpO1xuXG4gICAgdGhpcy52ZWN0b3JzID0gW107XG4gICAgdGhpcy5zZXRWZWN0b3JzKCk7XG4gIH1cblxuICBzZXRWZWN0b3JzKCkge1xuICAgIGxldCBpLCBqO1xuICAgIGNvbnN0IGxlbmd0aDEgPSB0aGlzLmltYWdlRGF0YS53aWR0aDtcbiAgICBjb25zdCBsZW5ndGgyID0gdGhpcy5pbWFnZURhdGEuaGVpZ2h0O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDE7IGkgKz0gdGhpcy5kKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbGVuZ3RoMjsgaiArPSB0aGlzLmQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gKChqID4+IDApICogbGVuZ3RoMSArIChpID4+IDApKSAqIDQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA+IDApIHtcbiAgICAgICAgICB0aGlzLnZlY3RvcnMucHVzaCh7IHg6IGkgKyB0aGlzLngsIHk6IGogKyB0aGlzLnkgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBnZXRCb3VuZCh4LCB5KSB7XG4gICAgY29uc3QgaW5kZXggPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA+IDApIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgY29uc3QgdmVjdG9yID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMudmVjdG9ycyk7XG4gICAgcmV0dXJuIHRoaXMudmVjdG9yLmNvcHkodmVjdG9yKTtcbiAgfVxuXG4gIGdldENvbG9yKHgsIHkpIHtcbiAgICB4IC09IHRoaXMueDtcbiAgICB5IC09IHRoaXMueTtcbiAgICBjb25zdCBpID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaV0sXG4gICAgICBnOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAxXSxcbiAgICAgIGI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDJdLFxuICAgICAgYTogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgM11cbiAgICB9O1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAodGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBwYXJ0aWNsZS5kZWFkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoIXRoaXMuZ2V0Qm91bmQocGFydGljbGUucC54IC0gdGhpcy54LCBwYXJ0aWNsZS5wLnkgLSB0aGlzLnkpKSBwYXJ0aWNsZS52Lm5lZ2F0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQ2lyY2xlWm9uZSBmcm9tIFwiLi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IExpbmVab25lIGZyb20gXCIuLi96b25lL0xpbmVab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4uL3pvbmUvUmVjdFpvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhZGRFdmVudExpc3RlbmVyKHByb3RvbiwgZnVuYykge1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCAoKSA9PiBmdW5jKCkpO1xuICB9LFxuXG4gIGdldFN0eWxlKGNvbG9yID0gXCIjZmYwMDAwXCIpIHtcbiAgICBjb25zdCByZ2IgPSBDb2xvclV0aWwuaGV4VG9SZ2IoY29sb3IpO1xuICAgIHJldHVybiBgcmdiYSgke3JnYi5yfSwgJHtyZ2IuZ30sICR7cmdiLmJ9LCAwLjUpYDtcbiAgfSxcblxuICBkcmF3Wm9uZShwcm90b24sIGNhbnZhcywgem9uZSwgY2xlYXIpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0U3R5bGUoKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sICgpID0+IHtcbiAgICAgIGlmIChjbGVhcikgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgaWYgKHpvbmUgaW5zdGFuY2VvZiBQb2ludFpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5hcmMoem9uZS54LCB6b25lLnksIDEwLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgTGluZVpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyh6b25lLngxLCB6b25lLnkxKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oem9uZS54Miwgem9uZS55Mik7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBSZWN0Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuZHJhd1JlY3Qoem9uZS54LCB6b25lLnksIHpvbmUud2lkdGgsIHpvbmUuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIENpcmNsZVpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgem9uZS5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBkcmF3RW1pdHRlcihwcm90b24sIGNhbnZhcywgZW1pdHRlciwgY2xlYXIpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0U3R5bGUoKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sICgpID0+IHtcbiAgICAgIGlmIChjbGVhcikgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3R5bGU7XG4gICAgICBjb250ZXh0LmFyYyhlbWl0dGVyLnAueCwgZW1pdHRlci5wLnksIDEwLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgUGFydGljbGUgZnJvbSBcIi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IFBvb2wgZnJvbSBcIi4vY29yZS9Qb29sXCI7XG5cbmltcG9ydCBVdGlsIGZyb20gXCIuL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBQb2xhcjJEIGZyb20gXCIuL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdDMgZnJvbSBcIi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4vbWF0aC9SZWN0YW5nbGVcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuL21hdGgvZWFzZVwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi9pbml0aWFsaXplL1JhdGVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL2luaXRpYWxpemUvSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IExpZmUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9MaWZlXCI7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSBcIi4vaW5pdGlhbGl6ZS9Qb3NpdGlvblwiO1xuaW1wb3J0IFZlbG9jaXR5IGZyb20gXCIuL2luaXRpYWxpemUvVmVsb2NpdHlcIjtcbmltcG9ydCBNYXNzIGZyb20gXCIuL2luaXRpYWxpemUvTWFzc1wiO1xuaW1wb3J0IFJhZGl1cyBmcm9tIFwiLi9pbml0aWFsaXplL1JhZGl1c1wiO1xuaW1wb3J0IEJvZHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Cb2R5XCI7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vYmVoYXZpb3VyL0JlaGF2aW91clwiO1xuaW1wb3J0IEZvcmNlIGZyb20gXCIuL2JlaGF2aW91ci9Gb3JjZVwiO1xuaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0F0dHJhY3Rpb25cIjtcbmltcG9ydCBSYW5kb21EcmlmdCBmcm9tIFwiLi9iZWhhdmlvdXIvUmFuZG9tRHJpZnRcIjtcbmltcG9ydCBHcmF2aXR5IGZyb20gXCIuL2JlaGF2aW91ci9HcmF2aXR5XCI7XG5pbXBvcnQgQ29sbGlzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9Db2xsaXNpb25cIjtcbmltcG9ydCBDcm9zc1pvbmUgZnJvbSBcIi4vYmVoYXZpb3VyL0Nyb3NzWm9uZVwiO1xuaW1wb3J0IEFscGhhIGZyb20gXCIuL2JlaGF2aW91ci9BbHBoYVwiO1xuaW1wb3J0IFNjYWxlIGZyb20gXCIuL2JlaGF2aW91ci9TY2FsZVwiO1xuaW1wb3J0IFJvdGF0ZSBmcm9tIFwiLi9iZWhhdmlvdXIvUm90YXRlXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4vYmVoYXZpb3VyL0NvbG9yXCI7XG5pbXBvcnQgQ3ljbG9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3ljbG9uZVwiO1xuaW1wb3J0IFJlcHVsc2lvbiBmcm9tIFwiLi9iZWhhdmlvdXIvUmVwdWxzaW9uXCI7XG5pbXBvcnQgR3Jhdml0eVdlbGwgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlXZWxsXCI7XG5cbmltcG9ydCBFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRW1pdHRlclwiO1xuaW1wb3J0IEJlaGF2aW91ckVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9CZWhhdmlvdXJFbWl0dGVyXCI7XG5pbXBvcnQgRm9sbG93RW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXJcIjtcblxuaW1wb3J0IENhbnZhc1JlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9DYW52YXNSZW5kZXJlclwiO1xuaW1wb3J0IERvbVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9Eb21SZW5kZXJlclwiO1xuaW1wb3J0IEVhc2VsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0Vhc2VsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhlbFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9QaXhlbFJlbmRlcmVyXCI7XG5pbXBvcnQgUGl4aVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9QaXhpUmVuZGVyZXJcIjtcbmltcG9ydCBXZWJHTFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9XZWJHTFJlbmRlcmVyXCI7XG5pbXBvcnQgQ3VzdG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0N1c3RvbVJlbmRlcmVyXCI7XG5cbmltcG9ydCBab25lIGZyb20gXCIuL3pvbmUvWm9uZVwiO1xuaW1wb3J0IExpbmVab25lIGZyb20gXCIuL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuL3pvbmUvQ2lyY2xlWm9uZVwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IFJlY3Rab25lIGZyb20gXCIuL3pvbmUvUmVjdFpvbmVcIjtcbmltcG9ydCBJbWFnZVpvbmUgZnJvbSBcIi4vem9uZS9JbWFnZVpvbmVcIjtcblxuaW1wb3J0IERlYnVnIGZyb20gXCIuL2RlYnVnL0RlYnVnXCI7XG5cbi8vIG5hbWVzcGFjZVxuUHJvdG9uLlBhcnRpY2xlID0gUGFydGljbGU7XG5Qcm90b24uUG9vbCA9IFBvb2w7XG5cblByb3Rvbi5VdGlsID0gVXRpbDtcblByb3Rvbi5Db2xvclV0aWwgPSBDb2xvclV0aWw7XG5Qcm90b24uTWF0aFV0aWwgPSBNYXRoVXRpbDtcblByb3Rvbi5WZWN0b3IyRCA9IFByb3Rvbi5WZWN0b3IgPSBWZWN0b3IyRDtcblByb3Rvbi5Qb2xhcjJEID0gUHJvdG9uLlBvbGFyID0gUG9sYXIyRDtcblByb3Rvbi5BcnJheVNwYW4gPSBBcnJheVNwYW47XG5Qcm90b24uUmVjdGFuZ2xlID0gUmVjdGFuZ2xlO1xuUHJvdG9uLlJhdGUgPSBSYXRlO1xuUHJvdG9uLmVhc2UgPSBlYXNlO1xuUHJvdG9uLlNwYW4gPSBTcGFuO1xuUHJvdG9uLk1hdDMgPSBNYXQzO1xuUHJvdG9uLmdldFNwYW4gPSAoYSwgYiwgY2VudGVyKSA9PiBuZXcgU3BhbihhLCBiLCBjZW50ZXIpO1xuUHJvdG9uLmNyZWF0ZUFycmF5U3BhbiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW47XG5cblByb3Rvbi5Jbml0aWFsaXplID0gUHJvdG9uLkluaXQgPSBJbml0aWFsaXplO1xuUHJvdG9uLkxpZmUgPSBQcm90b24uTCA9IExpZmU7XG5Qcm90b24uUG9zaXRpb24gPSBQcm90b24uUCA9IFBvc2l0aW9uO1xuUHJvdG9uLlZlbG9jaXR5ID0gUHJvdG9uLlYgPSBWZWxvY2l0eTtcblByb3Rvbi5NYXNzID0gUHJvdG9uLk0gPSBNYXNzO1xuUHJvdG9uLlJhZGl1cyA9IFByb3Rvbi5SID0gUmFkaXVzO1xuUHJvdG9uLkJvZHkgPSBQcm90b24uQiA9IEJvZHk7XG5cblByb3Rvbi5CZWhhdmlvdXIgPSBCZWhhdmlvdXI7XG5Qcm90b24uRm9yY2UgPSBQcm90b24uRiA9IEZvcmNlO1xuUHJvdG9uLkF0dHJhY3Rpb24gPSBQcm90b24uQSA9IEF0dHJhY3Rpb247XG5Qcm90b24uUmFuZG9tRHJpZnQgPSBQcm90b24uUkQgPSBSYW5kb21EcmlmdDtcblByb3Rvbi5HcmF2aXR5ID0gUHJvdG9uLkcgPSBHcmF2aXR5O1xuUHJvdG9uLkNvbGxpc2lvbiA9IENvbGxpc2lvbjtcblByb3Rvbi5Dcm9zc1pvbmUgPSBDcm9zc1pvbmU7XG5Qcm90b24uQWxwaGEgPSBBbHBoYTtcblByb3Rvbi5TY2FsZSA9IFByb3Rvbi5TID0gU2NhbGU7XG5Qcm90b24uUm90YXRlID0gUm90YXRlO1xuUHJvdG9uLkNvbG9yID0gQ29sb3I7XG5Qcm90b24uUmVwdWxzaW9uID0gUmVwdWxzaW9uO1xuUHJvdG9uLkN5Y2xvbmUgPSBDeWNsb25lO1xuUHJvdG9uLkdyYXZpdHlXZWxsID0gR3Jhdml0eVdlbGw7XG5cblByb3Rvbi5FbWl0dGVyID0gRW1pdHRlcjtcblByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyID0gQmVoYXZpb3VyRW1pdHRlcjtcblByb3Rvbi5Gb2xsb3dFbWl0dGVyID0gRm9sbG93RW1pdHRlcjtcblxuUHJvdG9uLlpvbmUgPSBab25lO1xuUHJvdG9uLkxpbmVab25lID0gTGluZVpvbmU7XG5Qcm90b24uQ2lyY2xlWm9uZSA9IENpcmNsZVpvbmU7XG5Qcm90b24uUG9pbnRab25lID0gUG9pbnRab25lO1xuUHJvdG9uLlJlY3Rab25lID0gUmVjdFpvbmU7XG5Qcm90b24uSW1hZ2Vab25lID0gSW1hZ2Vab25lO1xuXG5Qcm90b24uQ2FudmFzUmVuZGVyZXIgPSBDYW52YXNSZW5kZXJlcjtcblByb3Rvbi5Eb21SZW5kZXJlciA9IERvbVJlbmRlcmVyO1xuUHJvdG9uLkVhc2VsUmVuZGVyZXIgPSBFYXNlbFJlbmRlcmVyO1xuUHJvdG9uLlBpeGlSZW5kZXJlciA9IFBpeGlSZW5kZXJlcjtcblByb3Rvbi5QaXhlbFJlbmRlcmVyID0gUGl4ZWxSZW5kZXJlcjtcblByb3Rvbi5XZWJHTFJlbmRlcmVyID0gUHJvdG9uLldlYkdsUmVuZGVyZXIgPSBXZWJHTFJlbmRlcmVyO1xuUHJvdG9uLkN1c3RvbVJlbmRlcmVyID0gQ3VzdG9tUmVuZGVyZXI7XG5cblByb3Rvbi5EZWJ1ZyA9IERlYnVnO1xuVXRpbC5hc3NpZ24oUHJvdG9uLCBlYXNlKTtcblxuLy8gZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBQcm90b247XG4iXSwibmFtZXMiOlsiaXBvdCIsImxlbmd0aCIsIm5ocG90IiwiaSIsIm1ha2VUcmFuc2xhdGlvbiIsInR4IiwidHkiLCJtYWtlUm90YXRpb24iLCJhbmdsZUluUmFkaWFucyIsImMiLCJNYXRoIiwiY29zIiwicyIsInNpbiIsIm1ha2VTY2FsZSIsInN4Iiwic3kiLCJtYXRyaXhNdWx0aXBseSIsImEiLCJiIiwiYTAwIiwiYTAxIiwiYTAyIiwiYTEwIiwiYTExIiwiYTEyIiwiYTIwIiwiYTIxIiwiYTIyIiwiYjAwIiwiYjAxIiwiYjAyIiwiYjEwIiwiYjExIiwiYjEyIiwiYjIwIiwiYjIxIiwiYjIyIiwiY3JlYXRlQ2FudmFzIiwiaWQiLCJ3aWR0aCIsImhlaWdodCIsInBvc2l0aW9uIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJvcGFjaXR5IiwidHJhbnNmb3JtIiwiY3JlYXRlRGl2IiwicmVzaXplIiwibWFyZ2luTGVmdCIsIm1hcmdpblRvcCIsImRpdiIsIngiLCJ5Iiwic2NhbGUiLCJyb3RhdGUiLCJ3aWxsQ2hhbmdlIiwiY3NzMyIsInRyYW5zZm9ybTNkIiwia2V5IiwidmFsIiwiYmtleSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaW1nc0NhY2hlIiwiY2FudmFzQ2FjaGUiLCJjYW52YXNJZCIsImdldEltYWdlRGF0YSIsImNvbnRleHQiLCJpbWFnZSIsInJlY3QiLCJkcmF3SW1hZ2UiLCJpbWFnZWRhdGEiLCJjbGVhclJlY3QiLCJnZXRJbWdGcm9tQ2FjaGUiLCJpbWciLCJjYWxsYmFjayIsInBhcmFtIiwic3JjIiwiSW1hZ2UiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwiZ2V0Q2FudmFzRnJvbUNhY2hlIiwiV2ViR0xVdGlsIiwiY2FudmFzIiwiRG9tVXRpbCIsImdldENvbnRleHQiLCJpbml0VmFsdWUiLCJ2YWx1ZSIsImRlZmF1bHRzIiwidW5kZWZpbmVkIiwiaXNBcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImVtcHR5QXJyYXkiLCJhcnIiLCJ0b0FycmF5Iiwic2xpY2VBcnJheSIsImFycjEiLCJpbmRleCIsImFycjIiLCJwdXNoIiwiZ2V0UmFuZEZyb21BcnJheSIsImZsb29yIiwicmFuZG9tIiwiZW1wdHlPYmplY3QiLCJvYmoiLCJpZ25vcmUiLCJpbmRleE9mIiwiY2xhc3NBcHBseSIsImNvbnN0cnVjdG9yIiwiYXJncyIsIkZhY3RvcnlGdW5jIiwiYmluZCIsImFwcGx5IiwiY29uY2F0IiwiSW1nVXRpbCIsImRlc3Ryb3lBbGwiLCJkZXN0cm95IiwiYXNzaWduIiwic291cmNlIiwiaGFzT3duUHJvcGVydHkiLCJpZHNNYXAiLCJQdWlkIiwiX2luZGV4IiwiX2NhY2hlIiwidHlwZSIsImdldElkIiwidWlkIiwiZ2V0SWRGcm9tQ2FjaGUiLCJpc0JvZHkiLCJpc0lubmVyIiwiZ2V0VGFyZ2V0IiwiUG9vbCIsIm51bSIsInRvdGFsIiwiY2FjaGUiLCJnZXQiLCJwYXJhbXMiLCJwIiwiX19wdWlkIiwicG9wIiwiY3JlYXRlT3JDbG9uZSIsImV4cGlyZSIsImdldENhY2hlIiwiY3JlYXRlIiwiVXRpbCIsImNsb25lIiwiZ2V0Q291bnQiLCJjb3VudCIsIlN0YXRzIiwicHJvdG9uIiwiY29udGFpbmVyIiwiZW1pdHRlckluZGV4IiwicmVuZGVyZXJJbmRleCIsInVwZGF0ZSIsImJvZHkiLCJhZGQiLCJlbWl0dGVyIiwiZ2V0RW1pdHRlciIsInJlbmRlcmVyIiwiZ2V0UmVuZGVyZXIiLCJzdHIiLCJlbWl0dGVycyIsImVtaXRTcGVlZCIsImdldEVtaXR0ZXJQb3MiLCJpbml0aWFsaXplcyIsImNvbmNhdEFyciIsImJlaGF2aW91cnMiLCJuYW1lIiwiZ2V0Q3JlYXRlZE51bWJlciIsInBvb2wiLCJpbm5lckhUTUwiLCJjc3NUZXh0Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZyIsImNvbG9yIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwicmVuZGVyZXJzIiwicmVzdWx0IiwiY3Bvb2wiLCJyb3VuZCIsInJlbW92ZUNoaWxkIiwiRXZlbnREaXNwYXRjaGVyIiwiX2xpc3RlbmVycyIsImRpc3BhdGNoRXZlbnQiLCJoYXNFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzIiwibGlzdGVuZXIiLCJzcGxpY2UiLCJsaXN0ZW5lcnMiLCJoYW5kbGVyIiwiUEkiLCJJTkZJTklUWSIsIkluZmluaXR5IiwiTWF0aFV0aWwiLCJQSXgyIiwiUElfMiIsIlBJXzE4MCIsIk4xODBfUEkiLCJpc0luZmluaXR5IiwicmFuZG9tQVRvQiIsImlzSW50IiwicmFuZG9tRmxvYXRpbmciLCJjZW50ZXIiLCJmIiwicmFuZG9tQ29sb3IiLCJzbGljZSIsInJhbmRvbVpvbmUiLCJkaXNwbGF5IiwiayIsImRpZ2l0cyIsInBvdyIsImRlZ3JlZVRyYW5zZm9ybSIsInRvQ29sb3IxNiIsIkludGVncmF0aW9uIiwiY2FsY3VsYXRlIiwicGFydGljbGVzIiwidGltZSIsImRhbXBpbmciLCJldWxlckludGVncmF0ZSIsInBhcnRpY2xlIiwic2xlZXAiLCJvbGQiLCJjb3B5IiwidiIsIm11bHRpcGx5U2NhbGFyIiwibWFzcyIsImNsZWFyIiwiUHJvdG9uIiwiaW50ZWdyYXRpb25UeXBlIiwibm93IiwidGhlbiIsImVsYXBzZWQiLCJzdGF0cyIsIkVVTEVSIiwiaW50ZWdyYXRvciIsIl9mcHMiLCJfaW50ZXJ2YWwiLCJERUZBVUxUX0lOVEVSVkFMIiwiYWRkUmVuZGVyZXIiLCJyZW5kZXIiLCJpbml0IiwicmVtb3ZlUmVuZGVyZXIiLCJyZW1vdmUiLCJhZGRFbWl0dGVyIiwicGFyZW50IiwiRU1JVFRFUl9BRERFRCIsInJlbW92ZUVtaXR0ZXIiLCJFTUlUVEVSX1JFTU9WRUQiLCJQUk9UT05fVVBEQVRFIiwiVVNFX0NMT0NLIiwiRGF0ZSIsImdldFRpbWUiLCJhbWVuZENoYW5nZVRhYnNCdWciLCJlbWl0dGVyc1VwZGF0ZSIsIlBST1RPTl9VUERBVEVfQUZURVIiLCJnZXRBbGxQYXJ0aWNsZXMiLCJkZXN0cm95QWxsRW1pdHRlcnMiLCJkZXN0cm95T3RoZXIiLCJzZXRUaW1lb3V0IiwiZnBzIiwiTUVBU1VSRSIsIlJLMiIsIlBBUlRJQ0xFX0NSRUFURUQiLCJQQVJUSUNMRV9VUERBVEUiLCJQQVJUSUNMRV9TTEVFUCIsIlBBUlRJQ0xFX0RFQUQiLCJSZ2IiLCJyIiwiZyIsInJlc2V0IiwiU3BhbiIsImdldFZhbHVlIiwic2V0U3BhblZhbHVlIiwiZ2V0U3BhblZhbHVlIiwicGFuIiwiaGFzUHJvcCIsInNldFByb3AiLCJwcm9wcyIsInByb3AiLCJzZXRWZWN0b3JWYWwiLCJjb25mIiwiZWFzZUxpbmVhciIsImVhc2VJblF1YWQiLCJlYXNlT3V0UXVhZCIsImVhc2VJbk91dFF1YWQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblNpbmUiLCJlYXNlT3V0U2luZSIsImVhc2VJbk91dFNpbmUiLCJlYXNlSW5FeHBvIiwiZWFzZU91dEV4cG8iLCJlYXNlSW5PdXRFeHBvIiwiZWFzZUluQ2lyYyIsInNxcnQiLCJlYXNlT3V0Q2lyYyIsImVhc2VJbk91dENpcmMiLCJlYXNlSW5CYWNrIiwiZWFzZU91dEJhY2siLCJlYXNlSW5PdXRCYWNrIiwiZ2V0RWFzaW5nIiwiZWFzZSIsIlZlY3RvcjJEIiwic2V0Iiwic2V0WCIsInNldFkiLCJnZXRHcmFkaWVudCIsImF0YW4yIiwidyIsImFkZFZlY3RvcnMiLCJhZGRYWSIsInN1YiIsInN1YlZlY3RvcnMiLCJkaXZpZGVTY2FsYXIiLCJuZWdhdGUiLCJkb3QiLCJsZW5ndGhTcSIsIm5vcm1hbGl6ZSIsImRpc3RhbmNlVG8iLCJkaXN0YW5jZVRvU3F1YXJlZCIsInRoYSIsImR4IiwiZHkiLCJsZXJwIiwiYWxwaGEiLCJlcXVhbHMiLCJQYXJ0aWNsZSIsImRhdGEiLCJyZ2IiLCJQcm9wVXRpbCIsImdldERpcmVjdGlvbiIsImxpZmUiLCJhZ2UiLCJkZWFkIiwic3ByaXRlIiwiZW5lcmd5IiwicmFkaXVzIiwicm90YXRpb24iLCJlYXNpbmciLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwiYXBwbHlCZWhhdmlvdXJzIiwibWF4IiwiYXBwbHlCZWhhdmlvdXIiLCJhZGRCZWhhdmlvdXIiLCJiZWhhdmlvdXIiLCJwYXJlbnRzIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJoZXhUb1JnYiIsImgiLCJoZXgxNiIsInN1YnN0cmluZyIsInBhcnNlSW50IiwicmdiVG9IZXgiLCJyYmciLCJnZXRIZXgxNkZyb21QYXJ0aWNsZSIsIk51bWJlciIsIlBvbGFyMkQiLCJhYnMiLCJzZXRSIiwic2V0VGhhIiwidG9WZWN0b3IiLCJnZXRYIiwiZ2V0WSIsIk1hdDMiLCJtYXQzIiwibWF0IiwiRmxvYXQzMkFycmF5IiwibWF0MSIsIm1hdDIiLCJtdWx0aXBseSIsImludmVyc2UiLCJkIiwibXVsdGlwbHlWZWMyIiwibSIsInZlYyIsIkFycmF5U3BhbiIsIl9hcnIiLCJjcmVhdGVBcnJheVNwYW4iLCJSZWN0YW5nbGUiLCJib3R0b20iLCJyaWdodCIsImNvbnRhaW5zIiwiUmF0ZSIsIm51bXBhbiIsInRpbWVwYW4iLCJudW1QYW4iLCJ0aW1lUGFuIiwic3RhcnRUaW1lIiwibmV4dFRpbWUiLCJJbml0aWFsaXplIiwiTGlmZSIsImxpZmVQYW4iLCJab25lIiwidmVjdG9yIiwiY3Jvc3NUeXBlIiwiYWxlcnQiLCJnZXRQb3NpdGlvbiIsImNyb3NzaW5nIiwiUG9pbnRab25lIiwiY29uc29sZSIsImVycm9yIiwiUG9zaXRpb24iLCJ6b25lIiwiVmVsb2NpdHkiLCJycGFuIiwidGhhcGFuIiwiclBhbiIsInRoYVBhbiIsIm5vcm1hbGl6ZVZlbG9jaXR5IiwidnIiLCJwb2xhcjJkIiwiTWFzcyIsIm1hc3NQYW4iLCJSYWRpdXMiLCJvbGRSYWRpdXMiLCJCb2R5IiwiaW1hZ2VUYXJnZXQiLCJpbm5lciIsIkJlaGF2aW91ciIsIm5vcm1hbGl6ZUZvcmNlIiwiZm9yY2UiLCJub3JtYWxpemVWYWx1ZSIsIkZvcmNlIiwiZngiLCJmeSIsIkF0dHJhY3Rpb24iLCJ0YXJnZXRQb3NpdGlvbiIsInJhZGl1c1NxIiwiYXR0cmFjdGlvbkZvcmNlIiwiUmFuZG9tRHJpZnQiLCJkcmlmdFgiLCJkcmlmdFkiLCJkZWxheSIsInBhbkZvY2UiLCJHcmF2aXR5IiwiQ29sbGlzaW9uIiwibmV3UG9vbCIsImNvbGxpc2lvblBvb2wiLCJkZWx0YSIsIm90aGVyUGFydGljbGUiLCJvdmVybGFwIiwidG90YWxNYXNzIiwiYXZlcmFnZU1hc3MxIiwiYXZlcmFnZU1hc3MyIiwiZGlzdGFuY2UiLCJDcm9zc1pvbmUiLCJBbHBoYSIsInNhbWUiLCJhbHBoYUEiLCJhbHBoYUIiLCJTY2FsZSIsInNjYWxlQSIsInNjYWxlQiIsIlJvdGF0ZSIsImluZmx1ZW5jZSIsInJvdGF0aW9uQSIsInJvdGF0aW9uQiIsIkNvbG9yIiwiY29sb3JBIiwiQ29sb3JVdGlsIiwiY29sb3JCIiwiQ0hBTkdJTkciLCJDeWNsb25lIiwiYW5nbGUiLCJzZXRBbmdsZUFuZEZvcmNlIiwic3BhbiIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwiY2FuZ2xlIiwiY3ljbG9uZSIsImdyYWRpZW50IiwiUmVwdWxzaW9uIiwiR3Jhdml0eVdlbGwiLCJjZW50ZXJQb2ludCIsImRpc3RhbmNlVmVjIiwiZGlzdGFuY2VTcSIsImZhY3RvciIsImJpbmRFbWl0dGVyIiwiRW1pdHRlciIsImVtaXRUaW1lIiwidG90YWxUaW1lIiwicmF0ZSIsImVtaXQiLCJzdG9wZWQiLCJpc05hTiIsInN0b3AiLCJwcmVFbWl0Iiwib2xkU3RvcGVkIiwib2xkRW1pdFRpbWUiLCJvbGRUb3RhbFRpbWUiLCJzdGVwIiwicmVtb3ZlQWxsUGFydGljbGVzIiwiYWRkU2VsZkluaXRpYWxpemUiLCJhZGRJbml0aWFsaXplIiwicmVzdCIsInJlbW92ZUluaXRpYWxpemUiLCJpbml0aWFsaXplciIsInJlbW92ZUFsbEluaXRpYWxpemVycyIsImFyZ3VtZW50cyIsImVtaXR0aW5nIiwiaW50ZWdyYXRlIiwiZGlzcGF0Y2giLCJldmVudCIsImJpbmRFdmVudCIsImNyZWF0ZVBhcnRpY2xlIiwic2V0dXBQYXJ0aWNsZSIsIkluaXRpYWxpemVVdGlsIiwiQmVoYXZpb3VyRW1pdHRlciIsInNlbGZCZWhhdmlvdXJzIiwiYWRkU2VsZkJlaGF2aW91ciIsInJlbW92ZVNlbGZCZWhhdmlvdXIiLCJGb2xsb3dFbWl0dGVyIiwibW91c2VUYXJnZXQiLCJ3aW5kb3ciLCJfYWxsb3dFbWl0dGluZyIsImluaXRFdmVudEhhbmRsZXIiLCJtb3VzZW1vdmVIYW5kbGVyIiwibW91c2Vtb3ZlIiwibW91c2Vkb3duSGFuZGxlciIsIm1vdXNlZG93biIsIm1vdXNldXBIYW5kbGVyIiwibW91c2V1cCIsImxheWVyWCIsImxheWVyWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiaXNJbWFnZSIsIl9faXNJbWFnZSIsInRhZ05hbWUiLCJub2RlTmFtZSIsImlzU3RyaW5nIiwiQmFzZVJlbmRlcmVyIiwiZWxlbWVudCIsInN0cm9rZSIsImNpcmNsZUNvbmYiLCJpc0NpcmNsZSIsInNldFN0cm9rZSIsInRoaW5rbmVzcyIsIl9wcm90b25VcGRhdGVIYW5kbGVyIiwib25Qcm90b25VcGRhdGUiLCJfcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyIiwib25Qcm90b25VcGRhdGVBZnRlciIsIl9lbWl0dGVyQWRkZWRIYW5kbGVyIiwib25FbWl0dGVyQWRkZWQiLCJfZW1pdHRlclJlbW92ZWRIYW5kbGVyIiwib25FbWl0dGVyUmVtb3ZlZCIsIl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyIiwib25QYXJ0aWNsZUNyZWF0ZWQiLCJfcGFydGljbGVVcGRhdGVIYW5kbGVyIiwib25QYXJ0aWNsZVVwZGF0ZSIsIl9wYXJ0aWNsZURlYWRIYW5kbGVyIiwib25QYXJ0aWNsZURlYWQiLCJDYW52YXNSZW5kZXJlciIsImJ1ZmZlckNhY2hlIiwiYWRkSW1nMkJvZHkiLCJUeXBlcyIsImRyYXdDaXJjbGUiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJidWZDb250ZXh0IiwiZ2xvYmFsQWxwaGEiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyZXN0b3JlIiwiYmVnaW5QYXRoIiwiYXJjIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJjbG9zZVBhdGgiLCJmaWxsIiwic2l6ZSIsIkRvbVJlbmRlcmVyIiwiY3JlYXRlQm9keSIsImJvZHlSZWFkeSIsImJhY2tncm91bmRDb2xvciIsImNyZWF0ZUNpcmNsZSIsImNyZWF0ZVNwcml0ZSIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJ1cmwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJFYXNlbFJlbmRlcmVyIiwiYWRkQ2hpbGQiLCJzY2FsZVgiLCJzY2FsZVkiLCJncmFwaGljcyIsInJlZ1giLCJyZWdZIiwiY3JlYXRlanMiLCJHcmFwaGljcyIsImJlZ2luU3Ryb2tlIiwiYmVnaW5GaWxsIiwic2hhcGUiLCJTaGFwZSIsIlBpeGVsUmVuZGVyZXIiLCJyZWN0YW5nbGUiLCJpbWFnZURhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJwdXRJbWFnZURhdGEiLCJzZXRQaXhlbCIsIlBJWElDbGFzcyIsIlBpeGlSZW5kZXJlciIsInNldENvbG9yIiwiYmxlbmRNb2RlIiwic2V0UElYSSIsIlBJWEkiLCJTcHJpdGUiLCJjcmVhdGVGcm9tSW1hZ2UiLCJmcm9tIiwiZnJvbUltYWdlIiwidGludCIsImFuY2hvciIsImVuZEZpbGwiLCJNU3RhY2siLCJtYXRzIiwidG9wIiwiV2ViR0xSZW5kZXJlciIsImdsIiwiYW50aWFsaWFzIiwic3RlbmNpbCIsImRlcHRoIiwiaW5pdFZhciIsInNldE1heFJhZGl1cyIsImluaXRTaGFkZXJzIiwiaW5pdEJ1ZmZlcnMiLCJibGVuZEVxdWF0aW9uIiwiRlVOQ19BREQiLCJibGVuZEZ1bmMiLCJTUkNfQUxQSEEiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiZW5hYmxlIiwiQkxFTkQiLCJ1bWF0Iiwic21hdCIsIm1zdGFjayIsInZpZXdwb3J0IiwiY2lyY2xlQ2FudmFzVVJMIiwiZ2V0VmVydGV4U2hhZGVyIiwidnNTb3VyY2UiLCJnZXRGcmFnbWVudFNoYWRlciIsImZzU291cmNlIiwidGV4dHVyZWJ1ZmZlcnMiLCJBIiwiQiIsImdldFNoYWRlciIsImZzIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJmcmFnbWVudFNoYWRlciIsInZlcnRleFNoYWRlciIsInNwcm9ncmFtIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwidXNlUHJvZ3JhbSIsInZwYSIsImdldEF0dHJpYkxvY2F0aW9uIiwidGNhIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ0TWF0VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInNhbXBsZXJVbmlmb3JtIiwidXNlVGV4IiwidW5pZm9ybTFpIiwidnMiLCJpZHgiLCJ1bml0SUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJVaW50MTZBcnJheSIsIlNUQVRJQ19EUkFXIiwiaWRzIiwidW5pdEkzMyIsInN0cmlwQnVmZmVyIiwicmFpZHVzIiwiY2lyY2xlQ2FudmFzUmFkaXVzIiwidG9EYXRhVVJMIiwiZHJhd0ltZzJDYW52YXMiLCJfdyIsIl9oIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiY3JlYXRlVGV4dHVyZSIsInRleHR1cmUiLCJ2Y0J1ZmZlciIsInRjQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4SW1hZ2UyRCIsIlJHQkEiLCJVTlNJR05FRF9CWVRFIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIkxJTkVBUiIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIiwidGV4dHVyZUxvYWRlZCIsInRleHR1cmVXaWR0aCIsInRleHR1cmVIZWlnaHQiLCJ0bWF0IiwiaW1hdCIsIm9sZFNjYWxlIiwidXBkYXRlTWF0cml4IiwidW5pZm9ybTNmIiwidW5pZm9ybU1hdHJpeDNmdiIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsImRyYXdFbGVtZW50cyIsIlRSSUFOR0xFUyIsIlVOU0lHTkVEX1NIT1JUIiwibW92ZU9yaWdpbk1hdHJpeCIsInRyYW5zbGF0aW9uTWF0cml4IiwiYW5nZWwiLCJyb3RhdGlvbk1hdHJpeCIsInNjYWxlTWF0cml4IiwibWF0cml4IiwiQ3VzdG9tUmVuZGVyZXIiLCJMaW5lWm9uZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiZGlyZWN0aW9uIiwibWlueCIsIm1pbiIsIm1pbnkiLCJtYXh4IiwibWF4eSIsInh4eXkiLCJnZXRMZW5ndGgiLCJDIiwiRCIsImdldERpc3RhbmNlIiwiZ2V0U3ltbWV0cmljIiwidGhhMiIsInRoYTEiLCJvbGR4Iiwib2xkeSIsInJhbmdlT3V0IiwiQ2lyY2xlWm9uZSIsInJhbmRvbVJhZGl1cyIsInNldENlbnRlciIsIlJlY3Rab25lIiwiSW1hZ2Vab25lIiwidmVjdG9ycyIsInNldFZlY3RvcnMiLCJqIiwibGVuZ3RoMSIsImxlbmd0aDIiLCJnZXRCb3VuZCIsImdldENvbG9yIiwiZnVuYyIsImdldFN0eWxlIiwiZHJhd1pvbmUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJkcmF3UmVjdCIsImRyYXdFbWl0dGVyIiwiVmVjdG9yIiwiUG9sYXIiLCJnZXRTcGFuIiwiSW5pdCIsIkwiLCJQIiwiViIsIk0iLCJSIiwiRiIsIlJEIiwiRyIsIlMiLCJXZWJHbFJlbmRlcmVyIiwiRGVidWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUEsRUFBQUEsSUFaYSxnQkFZUkMsTUFaUSxFQVlBO0VBQ1gsV0FBTyxDQUFDQSxNQUFNLEdBQUlBLE1BQU0sR0FBRyxDQUFwQixNQUE0QixDQUFuQztFQUNELEdBZFk7O0VBZ0JiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUMsRUFBQUEsS0EzQmEsaUJBMkJQRCxNQTNCTyxFQTJCQztF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
