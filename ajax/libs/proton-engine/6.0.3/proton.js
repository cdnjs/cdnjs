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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy9tYXRoL1NwYW4uanMiLCIuLi9zcmMvdXRpbHMvUHJvcFV0aWwuanMiLCIuLi9zcmMvbWF0aC9lYXNlLmpzIiwiLi4vc3JjL21hdGgvVmVjdG9yMkQuanMiLCIuLi9zcmMvY29yZS9QYXJ0aWNsZS5qcyIsIi4uL3NyYy91dGlscy9Db2xvclV0aWwuanMiLCIuLi9zcmMvbWF0aC9Qb2xhcjJELmpzIiwiLi4vc3JjL21hdGgvTWF0My5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIHNsaWNlQXJyYXkoYXJyMSwgaW5kZXgsIGFycjIpIHtcbiAgICB0aGlzLmVtcHR5QXJyYXkoYXJyMik7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMi5wdXNoKGFycjFbaV0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRSYW5kRnJvbUFycmF5KGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoYXJyLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGVtcHR5T2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW55IG9iamVjdFxuICAgKi9cbiAgZW1wdHlPYmplY3Qob2JqLCBpZ25vcmUgPSBudWxsKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIGNvbnRpbnVlO1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWFrZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBhbmQgYmluZHMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBjbGFzc0FwcGx5XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIEEgY2xhc3MgdG8gbWFrZSBhbiBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBBbnkgYXJyYXkgdG8gYmluZCBpdCB0byB0aGUgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgaW5zdGFuY2Ugb2YgY29uc3RydWN0b3IsIG9wdGlvbmFsbHkgYmluZCB3aXRoIGFyZ3NcbiAgICovXG4gIGNsYXNzQXBwbHkoY29uc3RydWN0b3IsIGFyZ3MgPSBudWxsKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IEZhY3RvcnlGdW5jID0gY29uc3RydWN0b3IuYmluZC5hcHBseShjb25zdHJ1Y3RvciwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IEZhY3RvcnlGdW5jKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICByZXR1cm4gSW1nVXRpbC5nZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpO1xuICB9LFxuXG4gIGRlc3Ryb3lBbGwoYXJyLCBwYXJhbSA9IG51bGwpIHtcbiAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJbaV0uZGVzdHJveShwYXJhbSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBkZWxldGUgYXJyW2ldO1xuICAgIH1cblxuICAgIGFyci5sZW5ndGggPSAwO1xuICB9LFxuXG4gIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgaWRzTWFwID0ge307XG5cbmNvbnN0IFB1aWQgPSB7XG4gIF9pbmRleDogMCxcbiAgX2NhY2hlOiB7fSxcblxuICBpZCh0eXBlKSB7XG4gICAgaWYgKGlkc01hcFt0eXBlXSA9PT0gdW5kZWZpbmVkIHx8IGlkc01hcFt0eXBlXSA9PT0gbnVsbCkgaWRzTWFwW3R5cGVdID0gMDtcbiAgICByZXR1cm4gYCR7dHlwZX1fJHtpZHNNYXBbdHlwZV0rK31gO1xuICB9LFxuXG4gIGdldElkKHRhcmdldCkge1xuICAgIGxldCB1aWQgPSB0aGlzLmdldElkRnJvbUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKHVpZCkgcmV0dXJuIHVpZDtcblxuICAgIHVpZCA9IGBQVUlEXyR7dGhpcy5faW5kZXgrK31gO1xuICAgIHRoaXMuX2NhY2hlW3VpZF0gPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHVpZDtcbiAgfSxcblxuICBnZXRJZEZyb21DYWNoZSh0YXJnZXQpIHtcbiAgICBsZXQgb2JqLCBpZDtcblxuICAgIGZvciAoaWQgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIG9iaiA9IHRoaXMuX2NhY2hlW2lkXTtcblxuICAgICAgaWYgKG9iaiA9PT0gdGFyZ2V0KSByZXR1cm4gaWQ7XG4gICAgICBpZiAodGhpcy5pc0JvZHkob2JqLCB0YXJnZXQpICYmIG9iai5zcmMgPT09IHRhcmdldC5zcmMpIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpc0JvZHkob2JqLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIG9iai5pc0lubmVyICYmIHRhcmdldC5pc0lubmVyO1xuICB9LFxuXG4gIGdldFRhcmdldCh1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbdWlkXTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVpZDtcbiIsIi8qKlxuICogUG9vbCBpcyB0aGUgY2FjaGUgcG9vbCBvZiB0aGUgcHJvdG9uIGVuZ2luZSwgaXQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gKlxuICogZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpXG4gKiAgQ2xhc3NcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICogICAgdGFyZ2V0Ll9fcHVpZCA9IHVpZFxuICpcbiAqICBib2R5XG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqXG4gKlxuICogZXhwaXJlKHRhcmdldClcbiAqICBjYWNoZVt0YXJnZXQuX19wdWlkXSBwdXNoIHRhcmdldFxuICpcbiAqL1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBvZiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3RhbFxuICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FjaGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKSB7XG4gICAgbGV0IHA7XG4gICAgdWlkID0gdWlkIHx8IHRhcmdldC5fX3B1aWQgfHwgUHVpZC5nZXRJZCh0YXJnZXQpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVbdWlkXSAmJiB0aGlzLmNhY2hlW3VpZF0ubGVuZ3RoID4gMCkge1xuICAgICAgcCA9IHRoaXMuY2FjaGVbdWlkXS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHRoaXMuY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcC5fX3B1aWQgPSB0YXJnZXQuX19wdWlkIHx8IHVpZDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGV4cGlyZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZSh0YXJnZXQuX19wdWlkKS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldCBhbnkgT2JqZWN0IG9yIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpIHtcbiAgICB0aGlzLnRvdGFsKys7XG5cbiAgICBpZiAodGhpcy5jcmVhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBVdGlsLmNsYXNzQXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiAtIHdoYXQgaXMgaW4gdGhlIGNhY2hlP1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSBjb3VudCArPSB0aGlzLmNhY2hlW2lkXS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveWVzIGFsbCBpdGVtcyBmcm9tIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZVtpZF0ubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q2FjaGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdWlkIHRoZSB1bmlxdWUgaWRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2FjaGUodWlkID0gXCJkZWZhdWx0XCIpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVbdWlkXSkgdGhpcy5jYWNoZVt1aWRdID0gW107XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdWlkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMge1xuICBjb25zdHJ1Y3Rvcihwcm90b24pIHtcbiAgICB0aGlzLnByb3RvbiA9IHByb3RvbjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50eXBlID0gMTtcblxuICAgIHRoaXMuZW1pdHRlckluZGV4ID0gMDtcbiAgICB0aGlzLnJlbmRlcmVySW5kZXggPSAwO1xuICB9XG5cbiAgdXBkYXRlKHN0eWxlLCBib2R5KSB7XG4gICAgdGhpcy5hZGQoc3R5bGUsIGJvZHkpO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZ2V0RW1pdHRlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgIGxldCBzdHIgPSBcIlwiO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3RyICs9IFwiZW1pdHRlcjpcIiArIHRoaXMucHJvdG9uLmVtaXR0ZXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiZW0gc3BlZWQ6XCIgKyBlbWl0dGVyLmVtaXRTcGVlZCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwicG9zOlwiICsgdGhpcy5nZXRFbWl0dGVyUG9zKGVtaXR0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiaW5pdGlhbGl6ZXM6XCIgKyBlbWl0dGVyLmluaXRpYWxpemVzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcilcbiAgICAgICAgICBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuaW5pdGlhbGl6ZXMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiYmVoYXZpb3VyczpcIiArIGVtaXR0ZXIuYmVoYXZpb3Vycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5iZWhhdmlvdXJzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gcmVuZGVyZXIubmFtZSArIFwiPGJyPlwiO1xuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSBcImJvZHk6XCIgKyB0aGlzLmdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpICsgXCI8YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHIgKz0gXCJwYXJ0aWNsZXM6XCIgKyB0aGlzLnByb3Rvbi5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInBvb2w6XCIgKyB0aGlzLnByb3Rvbi5wb29sLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwidG90YWw6XCIgKyB0aGlzLnByb3Rvbi5wb29sLnRvdGFsO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHN0cjtcbiAgfVxuXG4gIGFkZChzdHlsZSwgYm9keSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7XCIsXG4gICAgICAgIFwib3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMDtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XCIsXG4gICAgICAgIFwid2lkdGg6MTIwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZC1jb2xvcjojMDAyO2NvbG9yOiMwZmY7XCJcbiAgICAgIF0uam9pbihcIlwiKTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICB0aGlzLnR5cGUrKztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID4gNCkgdGhpcy50eXBlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIGxldCBiZywgY29sb3I7XG4gICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBiZyA9IFwiIzIwMVwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjZjA4XCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGJnID0gXCIjMDIwXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZjBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJnID0gXCIjMDAyXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZmZcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gYmc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImNvbG9yXCJdID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBib2R5ID0gYm9keSB8fCB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLmVtaXR0ZXJzW3RoaXMuZW1pdHRlckluZGV4XTtcbiAgfVxuXG4gIGdldFJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5yZW5kZXJlcnNbdGhpcy5yZW5kZXJlckluZGV4XTtcbiAgfVxuXG4gIGNvbmNhdEFycihhcnIpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBpZiAoIWFyciB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gKGFycltpXS5uYW1lIHx8IFwiXCIpLnN1YnN0cigwLCAxKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSB7XG4gICAgcmV0dXJuIHJlbmRlcmVyLnBvb2wudG90YWwgfHwgKHJlbmRlcmVyLmNwb29sICYmIHJlbmRlcmVyLmNwb29sLnRvdGFsKSB8fCAwO1xuICB9XG5cbiAgZ2V0RW1pdHRlclBvcyhlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoZS5wLngpICsgXCIsXCIgKyBNYXRoLnJvdW5kKGUucC55KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdG9uID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qXG4gKiBFdmVudERpc3BhdGNoZXJcbiAqIFRoaXMgY29kZSByZWZlcmVuY2Ugc2luY2UgaHR0cDovL2NyZWF0ZWpzLmNvbS8uXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGJpbmQodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuICAgIHRhcmdldC5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIGNvbnN0IGFyciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIGZhc3RlciBjaGVja3MuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIGVsc2UgaWYgKHRoaXMuX2xpc3RlbmVycykgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG5cbiAgICBpZiAodHlwZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIGxldCBhcnIgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgICBpZiAoIWFycikgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgLy8gYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAvLyB0byBhdm9pZCBpc3N1ZXMgd2l0aCBpdGVtcyBiZWluZyByZW1vdmVkIG9yIGFkZGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcblxuICAgICAgbGV0IGhhbmRsZXI7XG4gICAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGhhbmRsZXIgPSBhcnJbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBoYW5kbGVyKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfVxuXG4gIGhhc0V2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiIsImNvbnN0IFBJID0gMy4xNDE1OTI2O1xuY29uc3QgSU5GSU5JVFkgPSBJbmZpbml0eTtcblxuY29uc3QgTWF0aFV0aWwgPSB7XG4gIFBJOiBQSSxcbiAgUEl4MjogUEkgKiAyLFxuICBQSV8yOiBQSSAvIDIsXG4gIFBJXzE4MDogUEkgLyAxODAsXG4gIE4xODBfUEk6IDE4MCAvIFBJLFxuICBJbmZpbml0eTogLTk5OSxcblxuICBpc0luZmluaXR5KG51bSkge1xuICAgIHJldHVybiBudW0gPT09IHRoaXMuSW5maW5pdHkgfHwgbnVtID09PSBJTkZJTklUWTtcbiAgfSxcblxuICByYW5kb21BVG9CKGEsIGIsIGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzSW50KSByZXR1cm4gYSArIE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpO1xuICAgIGVsc2UgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpID4+IDApICsgYTtcbiAgfSxcblxuICByYW5kb21GbG9hdGluZyhjZW50ZXIsIGYsIGlzSW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tQVRvQihjZW50ZXIgLSBmLCBjZW50ZXIgKyBmLCBpc0ludCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICgoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCkgPDwgMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XG4gIH0sXG5cbiAgcmFuZG9tWm9uZShkaXNwbGF5KSB7fSxcblxuICBmbG9vcihudW0sIGsgPSA0KSB7XG4gICAgY29uc3QgZGlnaXRzID0gTWF0aC5wb3coMTAsIGspO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRpZ2l0cykgLyBkaWdpdHM7XG4gIH0sXG5cbiAgZGVncmVlVHJhbnNmb3JtKGEpIHtcbiAgICByZXR1cm4gKGEgKiBQSSkgLyAxODA7XG4gIH0sXG5cbiAgdG9Db2xvcjE2KG51bSkge1xuICAgIHJldHVybiBgIyR7bnVtLnRvU3RyaW5nKDE2KX1gO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVncmF0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBjYWxjdWxhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgdGhpcy5ldWxlckludGVncmF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpO1xuICB9XG5cbiAgLy8gRXVsZXIgSW50ZWdyYXRlXG4gIC8vIGh0dHBzOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4gIGV1bGVySW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zbGVlcCkge1xuICAgICAgcGFydGljbGUub2xkLnAuY29weShwYXJ0aWNsZS5wKTtcbiAgICAgIHBhcnRpY2xlLm9sZC52LmNvcHkocGFydGljbGUudik7XG5cbiAgICAgIHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIoMSAvIHBhcnRpY2xlLm1hc3MpO1xuICAgICAgcGFydGljbGUudi5hZGQocGFydGljbGUuYS5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChwYXJ0aWNsZS5vbGQudi5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG5cbiAgICAgIGlmIChkYW1waW5nKSBwYXJ0aWNsZS52Lm11bHRpcGx5U2NhbGFyKGRhbXBpbmcpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9vbCBmcm9tIFwiLi9Qb29sXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFN0YXRzIGZyb20gXCIuLi9kZWJ1Zy9TdGF0c1wiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgSW50ZWdyYXRpb24gZnJvbSBcIi4uL21hdGgvSW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdG9uIHtcbiAgc3RhdGljIFVTRV9DTE9DSyA9IGZhbHNlO1xuXG4gIC8vIG1lYXN1cmUgMToxMDBcbiAgc3RhdGljIE1FQVNVUkUgPSAxMDA7XG4gIHN0YXRpYyBFVUxFUiA9IFwiZXVsZXJcIjtcbiAgc3RhdGljIFJLMiA9IFwicnVuZ2Uta3V0dGEyXCI7XG5cbiAgLy8gZXZlbnQgbmFtZVxuICBzdGF0aWMgUEFSVElDTEVfQ1JFQVRFRCA9IFwiUEFSVElDTEVfQ1JFQVRFRFwiO1xuICBzdGF0aWMgUEFSVElDTEVfVVBEQVRFID0gXCJQQVJUSUNMRV9VUERBVEVcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1NMRUVQID0gXCJQQVJUSUNMRV9TTEVFUFwiO1xuICBzdGF0aWMgUEFSVElDTEVfREVBRCA9IFwiUEFSVElDTEVfREVBRFwiO1xuXG4gIHN0YXRpYyBFTUlUVEVSX0FEREVEID0gXCJFTUlUVEVSX0FEREVEXCI7XG4gIHN0YXRpYyBFTUlUVEVSX1JFTU9WRUQgPSBcIkVNSVRURVJfUkVNT1ZFRFwiO1xuXG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFID0gXCJQUk9UT05fVVBEQVRFXCI7XG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFX0FGVEVSID0gXCJQUk9UT05fVVBEQVRFX0FGVEVSXCI7XG4gIHN0YXRpYyBERUZBVUxUX0lOVEVSVkFMID0gMC4wMTY3O1xuXG4gIHN0YXRpYyBhbWVuZENoYW5nZVRhYnNCdWcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdG8gYWRkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvciBQcm90b25cbiAgICpcbiAgICogQHRvZG8gcHJvUGFydGljbGVDb3VudCBpcyBub3QgaW4gdXNlXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb24gb2YgdGhlIHNpbmdsZSBwcm9wZXJ0aWVzIGFuZCBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcHJvUGFydGljbGVDb3VudF0gbm90IGluIHVzZT9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGVtaXR0ZXJzICAgQWxsIGFkZGVkIGVtaXR0ZXJcbiAgICogQHByb3BlcnR5IHtBcnJheX0gcmVuZGVyZXJzICBBbGwgYWRkZWQgcmVuZGVyZXJcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgICAgICBUaGUgYWN0aXZlIHRpbWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9sZHRpbWUgICBUaGUgb2xkIHRpbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVncmF0aW9uVHlwZSkge1xuICAgIHRoaXMuZW1pdHRlcnMgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVycyA9IFtdO1xuXG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5vdyA9IDA7XG4gICAgdGhpcy50aGVuID0gMDtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cyh0aGlzKTtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCg4MCk7XG5cbiAgICB0aGlzLmludGVncmF0aW9uVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGludGVncmF0aW9uVHlwZSwgUHJvdG9uLkVVTEVSKTtcbiAgICB0aGlzLmludGVncmF0b3IgPSBuZXcgSW50ZWdyYXRpb24odGhpcy5pbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgdGhpcy5fZnBzID0gXCJhdXRvXCI7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBQcm90b24uREVGQVVMVF9JTlRFUlZBTDtcbiAgfVxuXG4gIHNldCBmcHMoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX2ludGVydmFsID0gZnBzID09PSBcImF1dG9cIiA/IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMIDogTWF0aFV0aWwuZmxvb3IoMSAvIGZwcywgNyk7XG4gIH1cblxuICBnZXQgZnBzKCkge1xuICAgIHJldHVybiB0aGlzLl9mcHM7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgYWRkUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgcmVuZGVyLmluaXQodGhpcyk7XG4gICAgdGhpcy5yZW5kZXJlcnMucHVzaChyZW5kZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIHJlbW92ZVJlbmRlcmVyKHJlbmRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZW5kZXJlcnMuaW5kZXhPZihyZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmVuZGVyLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgYWRkRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9BRERFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgcmVtb3ZlRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICByZW1vdmVFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZW1pdHRlcnMuaW5kZXhPZihlbWl0dGVyKTtcbiAgICB0aGlzLmVtaXR0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgZW1pdHRlci5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX1JFTU9WRUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWxsIGFkZGVkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgLy8gJ2F1dG8nIGlzIHRoZSBkZWZhdWx0IGJyb3dzZXIgcmVmcmVzaCByYXRlLCB0aGUgdmFzdCBtYWpvcml0eSBpcyA2MGZwc1xuICAgIGlmICh0aGlzLl9mcHMgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuXG4gICAgICBpZiAoUHJvdG9uLlVTRV9DTE9DSykge1xuICAgICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcbiAgICAgICAgLy8gRml4IGJ1Z3Mgc3VjaCBhcyBjaHJvbWUgYnJvd3NlciBzd2l0Y2hpbmcgdGFicyBjYXVzaW5nIGV4Y2Vzc2l2ZSB0aW1lIGRpZmZlcmVuY2VcbiAgICAgICAgdGhpcy5hbWVuZENoYW5nZVRhYnNCdWcoKTtcblxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkID4gMCkgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLmVsYXBzZWQpO1xuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUoUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmcHMgZnJhbWUgcmF0ZSBpcyBzZXRcbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG5cbiAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk3NjQwMTgvY29udHJvbGxpbmctZnBzLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lXG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93IC0gKHRoaXMuZWxhcHNlZCAlIHRoaXMuX2ludGVydmFsKSAqIDEwMDA7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW1pdHRlcnNVcGRhdGUoZWxhcHNlZCkge1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5lbWl0dGVyc1tpXS51cGRhdGUoZWxhcHNlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgYW1lbmRDaGFuZ2VUYWJzQnVnXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBhbWVuZENoYW5nZVRhYnNCdWcoKSB7XG4gICAgaWYgKCFQcm90b24uYW1lbmRDaGFuZ2VUYWJzQnVnKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZWxhcHNlZCA+IDAuNSkge1xuICAgICAgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgYWxsIHBhcnRpY2xlcyBmcm9tIGFsbCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB0b3RhbCArPSB0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgZ2V0QWxsUGFydGljbGVzKCkge1xuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgcGFydGljbGVzID0gcGFydGljbGVzLmNvbmNhdCh0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcyk7XG4gICAgcmV0dXJuIHBhcnRpY2xlcztcbiAgfVxuXG4gIGRlc3Ryb3lBbGxFbWl0dGVycygpIHtcbiAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoaXMgUHJvdG9uIGluc3RhbmNlLiBUaGlzIGluY2x1ZGVzIGFsbCBlbWl0dGVycywgYW5kIGFsbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveShyZW1vdmUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRlc3Ryb3lPdGhlciA9ICgpID0+IHtcbiAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICB0aGlzLnRoZW4gPSAwO1xuICAgICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc3RhdHMuZGVzdHJveSgpO1xuXG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5yZW5kZXJlcnMsIHRoaXMuZ2V0QWxsUGFydGljbGVzKCkpO1xuXG4gICAgICB0aGlzLmludGVncmF0b3IgPSBudWxsO1xuICAgICAgdGhpcy5yZW5kZXJlcnMgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0dGVycyA9IG51bGw7XG4gICAgICB0aGlzLnN0YXRzID0gbnVsbDtcbiAgICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoZGVzdHJveU90aGVyLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95T3RoZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoUHJvdG9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJnYiB7XG4gIGNvbnN0cnVjdG9yKHIgPSAyNTUsIGcgPSAyNTUsIGIgPSAyNTUpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuciA9IDI1NTtcbiAgICB0aGlzLmcgPSAyNTU7XG4gICAgdGhpcy5iID0gMjU1O1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYW4ge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjZW50ZXIpIHtcbiAgICBpZiAoVXRpbC5pc0FycmF5KGEpKSB7XG4gICAgICB0aGlzLmlzQXJyYXkgPSB0cnVlO1xuICAgICAgdGhpcy5hID0gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0FycmF5ID0gZmFsc2U7XG4gICAgICB0aGlzLmEgPSBVdGlsLmluaXRWYWx1ZShhLCAxKTtcbiAgICAgIHRoaXMuYiA9IFV0aWwuaW5pdFZhbHVlKGIsIHRoaXMuYSk7XG4gICAgICB0aGlzLmNlbnRlciA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlciwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlKGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5pc0FycmF5KSB7XG4gICAgICByZXR1cm4gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5jZW50ZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlsLnJhbmRvbUFUb0IodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21GbG9hdGluZyh0aGlzLmEsIHRoaXMuYiwgaXNJbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IFNwYW4gb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRTcGFuVmFsdWVcbiAgICpcbiAgICogQHRvZG8gYSwgYiBhbmQgYyBzaG91bGQgYmUgJ01peGVkJyBvciAnTnVtYmVyJz9cbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZCB8IFNwYW59IGFcbiAgICogQHBhcmFtIHtNaXhlZH0gICAgICAgICAgICAgICBiXG4gICAqIEBwYXJhbSB7TWl4ZWR9ICAgICAgICAgICAgICAgY1xuICAgKlxuICAgKiBAcmV0dXJuIHtTcGFufVxuICAgKi9cbiAgc3RhdGljIHNldFNwYW5WYWx1ZShhLCBiLCBjKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmV3IFNwYW4oYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IFNwYW4oYSwgYik7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTcGFuKGEsIGIsIGMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmcm9tIGEgU3BhbiwgaWYgdGhlIHBhcmFtIGlzIG5vdCBhIFNwYW4gaXQgd2lsbCByZXR1cm4gdGhlIGdpdmVuIHBhcmFtZXRlclxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZ2V0VmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZCB8IFNwYW59IHBhblxuICAgKlxuICAgKiBAcmV0dXJuIHtNaXhlZH0gdGhlIHZhbHVlIG9mIFNwYW4gT1IgdGhlIHBhcmFtZXRlciBpZiBpdCBpcyBub3QgYSBTcGFuXG4gICAqL1xuICBzdGF0aWMgZ2V0U3BhblZhbHVlKHBhbikge1xuICAgIHJldHVybiBwYW4gaW5zdGFuY2VvZiBTcGFuID8gcGFuLmdldFZhbHVlKCkgOiBwYW47XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBoYXNQcm9wKHRhcmdldCwga2V5KSB7XG4gICAgaWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KGtleSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNldCB0aGUgcHJvdG90eXBlIGluIGEgZ2l2ZW4gcHJvdG90eXBlT2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRQcm9wXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gdHJhbnNsYXRlIGRlc3JpcHRpb24gZnJvbSBjaGluZXNlIHRvIGVuZ2xpc2hcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlT2JqZWN0IEFuIG9iamVjdCBvZiBzaW5nbGUgcHJvdG90eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHRhcmdldFxuICAgKi9cbiAgc2V0UHJvcCh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSBTcGFuLmdldFNwYW5WYWx1ZShwcm9wc1twcm9wXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFZlY3RvclZhbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYGNvbmZgXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZlxuICAgKi9cbiAgc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBjb25mID0gbnVsbCkge1xuICAgIGlmICghY29uZikgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInhcIikpIHBhcnRpY2xlLnAueCA9IGNvbmZbXCJ4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ5XCIpKSBwYXJ0aWNsZS5wLnkgPSBjb25mW1wieVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2eFwiKSkgcGFydGljbGUudi54ID0gY29uZltcInZ4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2eVwiKSkgcGFydGljbGUudi55ID0gY29uZltcInZ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImF4XCIpKSBwYXJ0aWNsZS5hLnggPSBjb25mW1wiYXhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImF5XCIpKSBwYXJ0aWNsZS5hLnkgPSBjb25mW1wiYXlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicFwiKSkgcGFydGljbGUucC5jb3B5KGNvbmZbXCJwXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidlwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2XCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYVwiKSkgcGFydGljbGUuYS5jb3B5KGNvbmZbXCJhXCJdKTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwb3NpdGlvblwiKSkgcGFydGljbGUucC5jb3B5KGNvbmZbXCJwb3NpdGlvblwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZlbG9jaXR5XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZlbG9jaXR5XCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYWNjZWxlcmF0ZVwiKSkgcGFydGljbGUuYS5jb3B5KGNvbmZbXCJhY2NlbGVyYXRlXCJdKTtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVhc2VMaW5lYXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG5cbiAgZWFzZUluUXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMik7XG4gIH0sXG5cbiAgZWFzZU91dFF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDIpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhZCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMik7XG5cbiAgICByZXR1cm4gLTAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJbkN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAzKTtcbiAgfSxcblxuICBlYXNlT3V0Q3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUgLSAxLCAzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q3ViaWModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDMpO1xuXG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdyh2YWx1ZSAtIDIsIDMpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluUXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDQpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgNCkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFydCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG5cbiAgICByZXR1cm4gLTAuNSAqICgodmFsdWUgLT0gMikgKiBNYXRoLnBvdyh2YWx1ZSwgMykgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5TaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC1NYXRoLmNvcyh2YWx1ZSAqIE1hdGhVdGlsLlBJXzIpICsgMTtcbiAgfSxcblxuICBlYXNlT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNpbih2YWx1ZSAqIE1hdGhVdGlsLlBJXzIpO1xuICB9LFxuXG4gIGVhc2VJbk91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLTAuNSAqIChNYXRoLmNvcyhNYXRoLlBJICogdmFsdWUpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluRXhwbyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcbiAgfSxcblxuICBlYXNlT3V0RXhwbyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdmFsdWUpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRFeHBvKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKSByZXR1cm4gMDtcblxuICAgIGlmICh2YWx1ZSA9PT0gMSkgcmV0dXJuIDE7XG5cbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG5cbiAgICByZXR1cm4gMC41ICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXZhbHVlKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJbkNpcmModmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZU91dENpcmModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdyh2YWx1ZSAtIDEsIDIpKTtcbiAgfSxcblxuICBlYXNlSW5PdXRDaXJjKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAodmFsdWUgLT0gMikgKiB2YWx1ZSkgKyAxKTtcbiAgfSxcblxuICBlYXNlSW5CYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiB2YWx1ZSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSAtIHMpO1xuICB9LFxuXG4gIGVhc2VPdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiAodmFsdWUgPSB2YWx1ZSAtIDEpICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlICsgcykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqICh2YWx1ZSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlIC0gcykpO1xuICAgIHJldHVybiAwLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgKyBzKSArIDIpO1xuICB9LFxuXG4gIGdldEVhc2luZyhlYXNlKSB7XG4gICAgaWYgKHR5cGVvZiBlYXNlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBlYXNlO1xuICAgIGVsc2UgcmV0dXJuIHRoaXNbZWFzZV0gfHwgdGhpcy5lYXNlTGluZWFyO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjJEIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICB0aGlzLnkgPSB5IHx8IDA7XG4gIH1cblxuICBzZXQoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFgoeCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRZKHkpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0R3JhZGllbnQoKSB7XG4gICAgaWYgKHRoaXMueCAhPT0gMCkgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIGVsc2UgaWYgKHRoaXMueSA+IDApIHJldHVybiBNYXRoVXRpbC5QSV8yO1xuICAgIGVsc2UgaWYgKHRoaXMueSA8IDApIHJldHVybiAtTWF0aFV0aWwuUElfMjtcbiAgfVxuXG4gIGNvcHkodikge1xuICAgIHRoaXMueCA9IHYueDtcbiAgICB0aGlzLnkgPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZCh2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggKz0gdi54O1xuICAgIHRoaXMueSArPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFhZKGEsIGIpIHtcbiAgICB0aGlzLnggKz0gYTtcbiAgICB0aGlzLnkgKz0gYjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkVmVjdG9ycyhhLCBiKSB7XG4gICAgdGhpcy54ID0gYS54ICsgYi54O1xuICAgIHRoaXMueSA9IGEueSArIGIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3ViKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3ViVmVjdG9ycyhhLCBiKSB7XG4gICAgdGhpcy54ID0gYS54IC0gYi54O1xuICAgIHRoaXMueSA9IGEueSAtIGIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGl2aWRlU2NhbGFyKHMpIHtcbiAgICBpZiAocyAhPT0gMCkge1xuICAgICAgdGhpcy54IC89IHM7XG4gICAgICB0aGlzLnkgLz0gcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQoMCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtdWx0aXBseVNjYWxhcihzKSB7XG4gICAgdGhpcy54ICo9IHM7XG4gICAgdGhpcy55ICo9IHM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5lZ2F0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcigtMSk7XG4gIH1cblxuICBkb3Qodikge1xuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG4gIH1cblxuICBsZW5ndGhTcSgpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuICB9XG5cbiAgbGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgoKSk7XG4gIH1cblxuICBkaXN0YW5jZVRvKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQodikpO1xuICB9XG5cbiAgcm90YXRlKHRoYSkge1xuICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgY29uc3QgeSA9IHRoaXMueTtcblxuICAgIHRoaXMueCA9IHggKiBNYXRoLmNvcyh0aGEpICsgeSAqIE1hdGguc2luKHRoYSk7XG4gICAgdGhpcy55ID0gLXggKiBNYXRoLnNpbih0aGEpICsgeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc3RhbmNlVG9TcXVhcmVkKHYpIHtcbiAgICBjb25zdCBkeCA9IHRoaXMueCAtIHYueDtcbiAgICBjb25zdCBkeSA9IHRoaXMueSAtIHYueTtcblxuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgfVxuXG4gIGxlcnAodiwgYWxwaGEpIHtcbiAgICB0aGlzLnggKz0gKHYueCAtIHRoaXMueCkgKiBhbHBoYTtcbiAgICB0aGlzLnkgKz0gKHYueSAtIHRoaXMueSkgKiBhbHBoYTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi54ID09PSB0aGlzLnggJiYgdi55ID09PSB0aGlzLnk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnggPSAwLjA7XG4gICAgdGhpcy55ID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSk7XG4gIH1cbn1cbiIsIi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuLi9iZWhhdmlvdXIvQmVoYXZpb3VyJyl9IEJlaGF2aW91ciAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL21hdGgvVmVjdG9yMkQnKX0gVmVjdG9yMkQgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuLi91dGlscy9SZ2InKX0gUmdiICovXG5pbXBvcnQgUmdiIGZyb20gXCIuLi91dGlscy9SZ2JcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFByb3BVdGlsIGZyb20gXCIuLi91dGlscy9Qcm9wVXRpbFwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4uL21hdGgvZWFzZVwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xuICAvKiogQHR5cGUgc3RyaW5nICovXG4gIGlkID0gXCJcIjtcblxuICAvKiogQHR5cGUge3twOlZlY3RvcjJELHY6VmVjdG9yMkQsYTpWZWN0b3IyRH19ICovXG4gIG9sZCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gIGRhdGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7QmVoYXZpb3VyW119ICovXG4gIGJlaGF2aW91cnMgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIHAgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIHYgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7UmdifSAqL1xuICByZ2IgPSBudWxsO1xuXG4gIC8qKlxuICAgKiB0aGUgUGFydGljbGUgY2xhc3NcbiAgICpcbiAgICogQGNsYXNzIFByb3Rvbi5QYXJ0aWNsZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHBPYmogdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7bGlmZTozLGRlYWQ6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHBhcnRpY2xlJ3MgaWQ7XG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIlBhcnRpY2xlXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgICB0aGlzLm9sZCA9IHt9O1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuXG4gICAgdGhpcy5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5hID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5hID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICB0aGlzLnJnYiA9IG5ldyBSZ2IoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgY29uZiAmJiBQcm9wVXRpbC5zZXRQcm9wKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMudi54LCAtdGhpcy52LnkpICogTWF0aFV0aWwuTjE4MF9QSTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubGlmZSA9IEluZmluaXR5O1xuICAgIHRoaXMuYWdlID0gMDtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuc2xlZXAgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkgPSBudWxsO1xuICAgIHRoaXMuc3ByaXRlID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmVuZXJneSA9IDE7IC8vIEVuZXJneSBMb3NzXG4gICAgdGhpcy5tYXNzID0gMTtcbiAgICB0aGlzLnJhZGl1cyA9IDEwO1xuICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMuY29sb3IgPSBudWxsO1xuXG4gICAgdGhpcy5wLnNldCgwLCAwKTtcbiAgICB0aGlzLnYuc2V0KDAsIDApO1xuICAgIHRoaXMuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQucC5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmVhc2VMaW5lYXI7XG5cbiAgICB0aGlzLnJnYi5yZXNldCgpO1xuICAgIFV0aWwuZW1wdHlPYmplY3QodGhpcy5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgICAgdGhpcy5hcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFnZSA8IHRoaXMubGlmZSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyh0aGlzLmFnZSAvIHRoaXMubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vyc1tpXSAmJiB0aGlzLmJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyXG4gICAqL1xuICBhZGRCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcblxuICAgIGlmIChiZWhhdmlvdXIuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRzXCIpKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyW119IGJlaGF2aW91cnNcbiAgICovXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJlaGF2aW91cnMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZEJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGNvbnN0IGJlaGF2aW91ciA9IHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuYmVoYXZpb3Vycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcbiAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmICB7T2JqZWN0fSByZ2JPYmplY3RcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHIgcmVkIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBnIGdyZWVuIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBiIGJsdWUgdmFsdWVcbiAgICovXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIHJnYiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGhleFRvUmdiXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoIGFueSBoZXggdmFsdWUsIGUuZy4gIzAwMDAwMCBvciAwMDAwMDAgZm9yIGJsYWNrXG4gICAqXG4gICAqIEByZXR1cm4ge3JnYk9iamVjdH1cbiAgICovXG4gIGhleFRvUmdiKGgpIHtcbiAgICBjb25zdCBoZXgxNiA9IGguY2hhckF0KDApID09PSBcIiNcIiA/IGguc3Vic3RyaW5nKDEsIDcpIDogaDtcbiAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoNCwgNiksIDE2KTtcblxuICAgIHJldHVybiB7IHIsIGcsIGIgfTtcbiAgfSxcblxuICAvKipcbiAgICogY29udmVydHMgYSByZ2IgdmFsdWUgdG8gYSByZ2Igc3RyaW5nXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCByZ2JUb0hleFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdCB8IFByb3Rvbi5oZXhUb1JnYn0gcmdiIGEgcmdiIG9iamVjdCBsaWtlIGluIHtAbGluayBQcm90b24jUHJvdG9uLn1cbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfSByZ2IoKVxuICAgKi9cbiAgcmdiVG9IZXgocmJnKSB7XG4gICAgcmV0dXJuIGByZ2IoJHtyYmcucn0sICR7cmJnLmd9LCAke3JiZy5ifSlgO1xuICB9LFxuXG4gIGdldEhleDE2RnJvbVBhcnRpY2xlKHApIHtcbiAgICByZXR1cm4gTnVtYmVyKHAucmdiLnIpICogNjU1MzYgKyBOdW1iZXIocC5yZ2IuZykgKiAyNTYgKyBOdW1iZXIocC5yZ2IuYik7XG4gIH1cbn07XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sYXIyRCB7XG4gIGNvbnN0cnVjdG9yKHIsIHRoYSkge1xuICAgIHRoaXMuciA9IE1hdGguYWJzKHIpIHx8IDA7XG4gICAgdGhpcy50aGEgPSB0aGEgfHwgMDtcbiAgfVxuXG4gIHNldChyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UihyKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRoYSh0aGEpIHtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvcHkocCkge1xuICAgIHRoaXMuciA9IHAucjtcbiAgICB0aGlzLnRoYSA9IHAudGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9WZWN0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLmdldFgoKSwgdGhpcy5nZXRZKCkpO1xuICB9XG5cbiAgZ2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5yICogTWF0aC5zaW4odGhpcy50aGEpO1xuICB9XG5cbiAgZ2V0WSgpIHtcbiAgICByZXR1cm4gLXRoaXMuciAqIE1hdGguY29zKHRoaXMudGhhKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICB0aGlzLnIgPSAxO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi5yID09PSB0aGlzLnIgJiYgdi50aGEgPT09IHRoaXMudGhhO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yID0gMC4wO1xuICAgIHRoaXMudGhhID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2xhcjJEKHRoaXMuciwgdGhpcy50aGEpO1xuICB9XG59XG4iLCJjb25zdCBNYXQzID0ge1xuICBjcmVhdGUobWF0Mykge1xuICAgIGNvbnN0IG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoOSk7XG4gICAgaWYgKG1hdDMpIHRoaXMuc2V0KG1hdDMsIG1hdCk7XG5cbiAgICByZXR1cm4gbWF0O1xuICB9LFxuXG4gIHNldChtYXQxLCBtYXQyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIG1hdDJbaV0gPSBtYXQxW2ldO1xuXG4gICAgcmV0dXJuIG1hdDI7XG4gIH0sXG5cbiAgbXVsdGlwbHkobWF0LCBtYXQyLCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGEwMiA9IG1hdFsyXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMCA9IG1hdDJbMF0sXG4gICAgICBiMDEgPSBtYXQyWzFdLFxuICAgICAgYjAyID0gbWF0MlsyXSxcbiAgICAgIGIxMCA9IG1hdDJbM10sXG4gICAgICBiMTEgPSBtYXQyWzRdLFxuICAgICAgYjIwID0gbWF0Mls2XSxcbiAgICAgIGIyMSA9IG1hdDJbN107XG5cbiAgICBtYXQzWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwO1xuICAgIG1hdDNbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTE7XG4gICAgbWF0M1syXSA9IGEwMiAqIGIwMjtcbiAgICBtYXQzWzNdID0gYjEwICogYTAwICsgYjExICogYTEwO1xuICAgIG1hdDNbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTE7XG4gICAgbWF0M1s2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGEyMDtcbiAgICBtYXQzWzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYTIxO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgaW52ZXJzZShtYXQsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAxID0gYTExLFxuICAgICAgYjExID0gLWExMCxcbiAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcbiAgICAgIGQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEsXG4gICAgICBpZDtcblxuICAgIGlkID0gMSAvIGQ7XG4gICAgbWF0M1swXSA9IGIwMSAqIGlkO1xuICAgIG1hdDNbMV0gPSAtYTAxICogaWQ7XG4gICAgbWF0M1szXSA9IGIxMSAqIGlkO1xuICAgIG1hdDNbNF0gPSBhMDAgKiBpZDtcbiAgICBtYXQzWzZdID0gYjIxICogaWQ7XG4gICAgbWF0M1s3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGlkO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgbXVsdGlwbHlWZWMyKG0sIHZlYywgbWF0Mykge1xuICAgIGxldCB4ID0gdmVjWzBdLFxuICAgICAgeSA9IHZlY1sxXTtcblxuICAgIG1hdDNbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgbVs2XTtcbiAgICBtYXQzWzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIG1bN107XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0MztcbiIsImltcG9ydCBTcGFuIGZyb20gXCIuL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXlTcGFuIGV4dGVuZHMgU3BhbiB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9hcnIgPSBVdGlsLnRvQXJyYXkoY29sb3IpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgY29uc3QgdmFsID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuX2Fycik7XG4gICAgcmV0dXJuIHZhbCA9PT0gXCJyYW5kb21cIiB8fCB2YWwgPT09IFwiUmFuZG9tXCIgPyBNYXRoVXRpbC5yYW5kb21Db2xvcigpIDogdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSB0aGF0IHRoZSBjb2xvciBpcyBhbiBpbnN0YW5jZSBvZiBQcm90b24uQXJyYXlTcGFuLCBpZiBub3QgaXQgbWFrZXMgYSBuZXcgaW5zdGFuY2VcbiAgICpcbiAgICogQG1ldGhvZCBzZXRTcGFuVmFsdWVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFycmF5U3BhbihhcnIpIHtcbiAgICBpZiAoIWFycikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoYXJyIGluc3RhbmNlb2YgQXJyYXlTcGFuKSByZXR1cm4gYXJyO1xuICAgIGVsc2UgcmV0dXJuIG5ldyBBcnJheVNwYW4oYXJyKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMud2lkdGggPSB3O1xuICAgIHRoaXMuaGVpZ2h0ID0gaDtcblxuICAgIHRoaXMuYm90dG9tID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gIH1cblxuICBjb250YWlucyh4LCB5KSB7XG4gICAgaWYgKHggPD0gdGhpcy5yaWdodCAmJiB4ID49IHRoaXMueCAmJiB5IDw9IHRoaXMuYm90dG9tICYmIHkgPj0gdGhpcy55KSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0ZSB7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXNzaW9uIChhIFtwYXJ0aWNsZV0vYiBbc10pO1xuICAgKiBAbmFtZXNwYWNlXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFJhdGVcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheSB8IE51bWJlciB8IFNwYW59IG51bXBhbiB0aGUgbnVtYmVyIG9mIGVhY2ggZW1pc3Npb247XG4gICAqIEBwYXJhbSB7QXJyYXkgfCBOdW1iZXIgfCBTcGFufSB0aW1lcGFuIHRoZSB0aW1lIG9mIGVhY2ggZW1pc3Npb247XG4gICAqIGZvciBleGFtcGxlOiBuZXcgUmF0ZShuZXcgU3BhbigxMCwgMjApLCBuZXcgU3BhbiguMSwgLjI1KSk7XG4gICAqL1xuICBjb25zdHJ1Y3RvcihudW1wYW4sIHRpbWVwYW4pIHtcbiAgICB0aGlzLm51bVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKG51bXBhbiwgMSkpO1xuICAgIHRoaXMudGltZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKHRpbWVwYW4sIDEpKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gMDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIGdldFZhbHVlKHRpbWUpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lID49IHRoaXMubmV4dFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcblxuICAgICAgaWYgKHRoaXMubnVtUGFuLmIgPT09IDEpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtUGFuLmdldFZhbHVlKGZhbHNlKSA+IDAuNSkgcmV0dXJuIDE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1QYW4uZ2V0VmFsdWUodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEluaXRpYWxpemUge1xuICByZXNldCgpIHt9XG5cbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplKHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplKGVtaXR0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN1YiBjbGFzcyBpbml0XG4gIGluaXRpYWxpemUodGFyZ2V0KSB7fVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5saWZlUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJMaWZlXCI7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLmxpZmVQYW4uYSA9PT0gSW5maW5pdHkpIHRhcmdldC5saWZlID0gSW5maW5pdHk7XG4gICAgZWxzZSB0YXJnZXQubGlmZSA9IHRoaXMubGlmZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVjdG9yID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICAgIHRoaXMucmFuZG9tID0gMDtcbiAgICB0aGlzLmNyb3NzVHlwZSA9IFwiZGVhZFwiO1xuICAgIHRoaXMuYWxlcnQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7fVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50Wm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLng7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgUG9pbnRab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3NpbmcgbWV0aG9kIVwiKTtcbiAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbiBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3Rvcih6b25lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICAgIHRoaXMubmFtZSA9IFwiUG9zaXRpb25cIjtcbiAgfVxuXG4gIHJlc2V0KHpvbmUpIHtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0aGlzLnpvbmUuZ2V0UG9zaXRpb24oKTtcblxuICAgIHRhcmdldC5wLnggPSB0aGlzLnpvbmUudmVjdG9yLng7XG4gICAgdGFyZ2V0LnAueSA9IHRoaXMuem9uZS52ZWN0b3IueTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVsb2NpdHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IocnBhbiwgdGhhcGFuLCB0eXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcblxuICAgIHRoaXMubmFtZSA9IFwiVmVsb2NpdHlcIjtcbiAgfVxuXG4gIHJlc2V0KHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZVZlbG9jaXR5KHZyKSB7XG4gICAgcmV0dXJuIHZyICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwicFwiIHx8IHRoaXMudHlwZSA9PT0gXCJQXCIgfHwgdGhpcy50eXBlID09PSBcInBvbGFyXCIpIHtcbiAgICAgIGNvbnN0IHBvbGFyMmQgPSBuZXcgUG9sYXIyRChcbiAgICAgICAgdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSksXG4gICAgICAgIHRoaXMudGhhUGFuLmdldFZhbHVlKCkgKiBNYXRoVXRpbC5QSV8xODBcbiAgICAgICk7XG5cbiAgICAgIHRhcmdldC52LnggPSBwb2xhcjJkLmdldFgoKTtcbiAgICAgIHRhcmdldC52LnkgPSBwb2xhcjJkLmdldFkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnYueCA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpO1xuICAgICAgdGFyZ2V0LnYueSA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy50aGFQYW4uZ2V0VmFsdWUoKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3MgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXNzUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJNYXNzXCI7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIHRhcmdldC5tYXNzID0gdGhpcy5tYXNzUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaXVzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlJhZGl1c1wiO1xuICB9XG5cbiAgcmVzZXQoYSwgYiwgYykge1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucmFkaXVzID0gdGhpcy5yYWRpdXMuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4uL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoaW1hZ2UsIHcsIGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMuc2V0U3BhblZhbHVlKGltYWdlKTtcbiAgICB0aGlzLncgPSBVdGlsLmluaXRWYWx1ZSh3LCAyMCk7XG4gICAgdGhpcy5oID0gVXRpbC5pbml0VmFsdWUoaCwgdGhpcy53KTtcbiAgICB0aGlzLm5hbWUgPSBcIkJvZHlcIjtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBjb25zdCBpbWFnZVRhcmdldCA9IHRoaXMuaW1hZ2UuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0eXBlb2YgaW1hZ2VUYXJnZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLncsXG4gICAgICAgIGhlaWdodDogdGhpcy5oLFxuICAgICAgICBzcmM6IGltYWdlVGFyZ2V0LFxuICAgICAgICBpc0lubmVyOiB0cnVlLFxuICAgICAgICBpbm5lcjogdHJ1ZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IGltYWdlVGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIHNldFNwYW5WYWx1ZShpbWFnZSkge1xuICAgIHJldHVybiBpbWFnZSBpbnN0YW5jZW9mIEFycmF5U3BhbiA/IGltYWdlIDogbmV3IEFycmF5U3BhbihpbWFnZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4uL21hdGgvZWFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWhhdmlvdXIge1xuICBzdGF0aWMgaWQgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgQmVoYXZpb3VyIGNsYXNzIGlzIHRoZSBiYXNlIGZvciB0aGUgb3RoZXIgQmVoYXZpb3VyXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgLVxuICAgKiBAaW50ZXJmYWNlXG4gICAqIEBhbGlhcyBQcm90b24uQmVoYXZpb3VyXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsaWZlIFx0dGhlIGJlaGF2aW91cnMgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZWFzaW5nIFx0VGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kLCBmb3IgZXhhbXBsZSBlYXNlLmVhc2VPdXRRdWFydFxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gIGlkIFx0XHRUaGUgYmVoYXZpb3VycyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gIGFnZT0wIFx0SG93IGxvbmcgdGhlIHBhcnRpY2xlIHNob3VsZCBiZSAnYWxpZmUnXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgZW5lcmd5PTFcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWFkPWZhbHNlIFRoZSBwYXJ0aWNsZSBpcyBkZWFkIGF0IGZpcnN0XG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9ICAgcGFyZW50cyBcdFRoZSBiZWhhdmlvdXIncyBwYXJlbnRzIGFycmF5XG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAgbmFtZSBcdFRoZSBiZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IobGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcblxuICAgIHRoaXMuYWdlID0gMDtcbiAgICB0aGlzLmVuZXJneSA9IDE7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnRzID0gW107XG5cbiAgICB0aGlzLmlkID0gYEJlaGF2aW91cl8ke0JlaGF2aW91ci5pZCsrfWA7XG4gICAgdGhpcy5uYW1lID0gXCJCZWhhdmlvdXJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgZm9yY2UgYnkgMToxMDA7XG4gICAqXG4gICAqIEBtZXRob2Qgbm9ybWFsaXplRm9yY2VcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSBmb3JjZVxuICAgKi9cbiAgbm9ybWFsaXplRm9yY2UoZm9yY2UpIHtcbiAgICByZXR1cm4gZm9yY2UubXVsdGlwbHlTY2FsYXIoUHJvdG9uLk1FQVNVUkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHZhbHVlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICovXG4gIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogY29tcHV0aW5nIGxpZmUgY3ljbGVcbiAgICpcbiAgICogQG1ldGhvZCBjYWxjdWxhdGVcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBjYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB7XG4gICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBiZWhhdmlvdXJcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFyZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5wYXJlbnRzW2ldLnJlbW92ZUJlaGF2aW91cih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudHMubGVuZ3RoID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uRm9yY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG4gICAgdGhpcy5uYW1lID0gXCJGb3JjZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuYS5hZGQodGhpcy5mb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJhY3Rpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhpcyBiZWhhdmlvdXIgbGV0IHRoZSBwYXJ0aWNsZXMgZm9sbG93IG9uZSBzcGVjaWZpYyBQcm90b24uVmVjdG9yMkRcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkF0dHJhY3Rpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvblxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzU3FcbiAgICogQHByb3BlcnR5IHtQcm90b24uVmVjdG9yMkR9IGF0dHJhY3Rpb25Gb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gbGVuZ3RoU3FcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgdGhpcy5uYW1lID0gXCJBdHRyYWN0aW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UuY29weSh0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zdWIocGFydGljbGUucCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IHRoaXMuYXR0cmFjdGlvbkZvcmNlLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGhTcSA+IDAuMDAwMDQgJiYgdGhpcy5sZW5ndGhTcSA8IHRoaXMucmFkaXVzU3EpIHtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMubGVuZ3RoU3EgLyB0aGlzLnJhZGl1c1NxKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKHRoaXMuZm9yY2UpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmF0dHJhY3Rpb25Gb3JjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tRHJpZnQgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYW5kb21EcmlmdFxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSBUaGUgdGltZSBvZiB0aGUgZHJpZnRcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSk7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5hbWUgPSBcIlJhbmRvbURyaWZ0XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5wYW5Gb2NlID0gbmV3IFZlY3RvcjJEKGRyaWZ0WCwgZHJpZnRZKTtcbiAgICB0aGlzLnBhbkZvY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHRoaXMucGFuRm9jZSk7XG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuZGF0YS50aW1lICs9IHRpbWU7XG5cbiAgICBpZiAocGFydGljbGUuZGF0YS50aW1lID49IHRoaXMuZGVsYXkpIHtcbiAgICAgIHBhcnRpY2xlLmEuYWRkWFkoXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS54LCB0aGlzLnBhbkZvY2UueCksXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS55LCB0aGlzLnBhbkZvY2UueSlcbiAgICAgICk7XG5cbiAgICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRm9yY2UgZnJvbSBcIi4vRm9yY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eSBleHRlbmRzIEZvcmNlIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5HcmF2aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uR3Jhdml0eVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCgwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGFmdGVyIGNvbGxpc2lvblxuICAgKlxuICAgKiBAY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcml0Y2xlfSBvdGhlclBhcnRpY2xlXG4gICAqL1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbGxpc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5yZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjayk7XG4gICAgdGhpcy5uZXdQb29sID0gW107XG4gICAgdGhpcy5wb29sID0gW107XG4gICAgdGhpcy5uYW1lID0gXCJDb2xsaXNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBVdGlsLmluaXRWYWx1ZShlbWl0dGVyLCBudWxsKTtcbiAgICB0aGlzLm1hc3MgPSBVdGlsLmluaXRWYWx1ZShtYXNzLCB0cnVlKTtcbiAgICB0aGlzLmNhbGxiYWNrID0gVXRpbC5pbml0VmFsdWUoY2FsbGJhY2ssIG51bGwpO1xuXG4gICAgdGhpcy5jb2xsaXNpb25Qb29sID0gW107XG4gICAgdGhpcy5kZWx0YSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5lbWl0dGVyKSB7XG4gICAgICBVdGlsLnNsaWNlQXJyYXkodGhpcy5lbWl0dGVyLnBhcnRpY2xlcywgaW5kZXgsIHRoaXMubmV3UG9vbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFV0aWwuc2xpY2VBcnJheSh0aGlzLnBvb2wsIGluZGV4LCB0aGlzLm5ld1Bvb2wpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubmV3UG9vbC5sZW5ndGg7XG4gICAgbGV0IG90aGVyUGFydGljbGU7XG4gICAgbGV0IGxlbmd0aFNxO1xuICAgIGxldCBvdmVybGFwO1xuICAgIGxldCB0b3RhbE1hc3M7XG4gICAgbGV0IGF2ZXJhZ2VNYXNzMSwgYXZlcmFnZU1hc3MyO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBvdGhlclBhcnRpY2xlID0gdGhpcy5uZXdQb29sW2ldO1xuXG4gICAgICBpZiAob3RoZXJQYXJ0aWNsZSAhPT0gcGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5kZWx0YS5jb3B5KG90aGVyUGFydGljbGUucCk7XG4gICAgICAgIHRoaXMuZGVsdGEuc3ViKHBhcnRpY2xlLnApO1xuXG4gICAgICAgIGxlbmd0aFNxID0gdGhpcy5kZWx0YS5sZW5ndGhTcSgpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHBhcnRpY2xlLnJhZGl1cyArIG90aGVyUGFydGljbGUucmFkaXVzO1xuXG4gICAgICAgIGlmIChsZW5ndGhTcSA8PSBkaXN0YW5jZSAqIGRpc3RhbmNlKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IGRpc3RhbmNlIC0gTWF0aC5zcXJ0KGxlbmd0aFNxKTtcbiAgICAgICAgICBvdmVybGFwICs9IDAuNTtcblxuICAgICAgICAgIHRvdGFsTWFzcyA9IHBhcnRpY2xlLm1hc3MgKyBvdGhlclBhcnRpY2xlLm1hc3M7XG4gICAgICAgICAgYXZlcmFnZU1hc3MxID0gdGhpcy5tYXNzID8gb3RoZXJQYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMubWFzcyA/IHBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG5cbiAgICAgICAgICBwYXJ0aWNsZS5wLmFkZChcbiAgICAgICAgICAgIHRoaXMuZGVsdGFcbiAgICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG90aGVyUGFydGljbGUucC5hZGQodGhpcy5kZWx0YS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihvdmVybGFwICogYXZlcmFnZU1hc3MyKSk7XG5cbiAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2socGFydGljbGUsIG90aGVyUGFydGljbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3Nab25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIERlZmluZXMgd2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgY29tZSB0byB0aGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgem9uZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3Jvc3Nab25lXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0XHRcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3Jvc3Nab25lXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBVdGlsLmluaXRWYWx1ZShjcm9zc1R5cGUsIFwiZGVhZFwiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgdGhpcy56b25lLmNyb3NzaW5nKHBhcnRpY2xlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFscGhhIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5BbHBoYVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJBbHBoYVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmV3IGFscGhhIHZhbHVlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSBBIHNpbmdsZSBQcm90b24gZ2VuZXJhdGVkIHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5hbHBoYUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gcGFydGljbGUuZGF0YS5hbHBoYUE7XG4gICAgZWxzZSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgcGFydGljbGUuYWxwaGEgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQiArIChwYXJ0aWNsZS5kYXRhLmFscGhhQSAtIHBhcnRpY2xlLmRhdGEuYWxwaGFCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLmFscGhhIDwgMC4wMDEpIHBhcnRpY2xlLmFscGhhID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5TY2FsZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJTY2FsZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVCID0gdGhpcy5zYW1lID8gcGFydGljbGUuZGF0YS5zY2FsZUEgOiB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLnNjYWxlID0gcGFydGljbGUuZGF0YS5zY2FsZUIgKyAocGFydGljbGUuZGF0YS5zY2FsZUEgLSBwYXJ0aWNsZS5kYXRhLnNjYWxlQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA8IDAuMDAwMSkgcGFydGljbGUuc2NhbGUgPSAwO1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzICogcGFydGljbGUuc2NhbGU7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlJvdGF0ZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJywgJ2InIGFuZCAnc3R5bGUnXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbaW5mbHVlbmNlPVZlbG9jaXR5XSBUaGUgcm90YXRpb24ncyBpbmZsdWVuY2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHlsZT10b11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbmZsdWVuY2UsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChpbmZsdWVuY2UsIGIsIHN0eWxlKTtcbiAgICB0aGlzLm5hbWUgPSBcIlJvdGF0ZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScsICdiJyBhbmQgJ3N0eWxlJ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3N0eWxlPXRvXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgXCJWZWxvY2l0eVwiKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYiwgMCkpO1xuICAgIHRoaXMuc3R5bGUgPSBVdGlsLmluaXRWYWx1ZShzdHlsZSwgXCJ0b1wiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICghdGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHtcbiAgICAgIGlmICh0aGlzLnN0eWxlID09PSBcInRvXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJUT1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiX1wiKSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9XG4gICAgICAgICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgKyAocGFydGljbGUuZGF0YS5yb3RhdGlvbkEgLSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQikgKiB0aGlzLmVuZXJneTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHBhcnRpY2xlLmRhdGEucm90YXRpb25CO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hLmEgPT09IFwiVlwiIHx8IHRoaXMuYS5hID09PSBcIlZlbG9jaXR5XCIgfHwgdGhpcy5hLmEgPT09IFwidlwiKSB7XG4gICAgICAvLyBiZXRhLi4uXG4gICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlLmdldERpcmVjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sb3JcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBhIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBiIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmEgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGEpO1xuICAgIHRoaXMuYiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYik7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5jb2xvciA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuY29sb3JBID0gQ29sb3JVdGlsLmhleFRvUmdiKHBhcnRpY2xlLmNvbG9yKTtcblxuICAgIGlmICh0aGlzLmIpIHBhcnRpY2xlLmRhdGEuY29sb3JCID0gQ29sb3JVdGlsLmhleFRvUmdiKHRoaXMuYi5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuYikge1xuICAgICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLnIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmcgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLnJnYi5yIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLnJnYi5nIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLnJnYi5iIDw8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckEucjtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckEuZztcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckEuYjtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5jb25zdCBDSEFOR0lORyA9IFwiY2hhbmdpbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ljbG9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3ljbG9uZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkN5Y2xvbmVcIjtcbiAgfVxuXG4gIHNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG5cbiAgICBpZiAoYW5nbGUgPT09IFwicmlnaHRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcImxlZnRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IC1NYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwicmFuZG9tXCI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInNwYW5cIjtcbiAgICAgIHRoaXMuc3BhbiA9IGFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdpbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJhdXRvXCJcbiAgICApIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB9IGVsc2UgaWYgKGZvcmNlKSB7XG4gICAgICB0aGlzLmZvcmNlID0gZm9yY2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IE1hdGhVdGlsLnJhbmRvbUFUb0IoLU1hdGhVdGlsLlBJLCBNYXRoVXRpbC5QSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSB0aGlzLnNwYW4uZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGdyYWRpZW50ID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiIHx8IHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBncmFkaWVudCArPSBwYXJ0aWNsZS5kYXRhLmNhbmdsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JhZGllbnQgKz0gdGhpcy5hbmdsZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JjZSA9PT0gQ0hBTkdJTkcpIHtcbiAgICAgIGxlbmd0aCA9IHBhcnRpY2xlLnYubGVuZ3RoKCkgLyAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRoaXMuZm9yY2U7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnggPSBsZW5ndGggKiBNYXRoLmNvcyhncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnkgPSBsZW5ndGggKiBNYXRoLnNpbihncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gdGhpcy5ub3JtYWxpemVGb3JjZShwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gIH1cbn1cbiIsImltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL0F0dHJhY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwdWxzaW9uIGV4dGVuZHMgQXR0cmFjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgb3BwaXNpdGUgb2YgUHJvdG9uLkF0dHJhY3Rpb24gLSB0dXJucyB0aGUgZm9yY2VcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUmVwdWxzaW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9yY2VcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICAgIHRoaXMubmFtZSA9IFwiUmVwdWxzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUmVwdWxzaW9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5V2VsbCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIEdyYXZpdHlXZWxsXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlXZWxsXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXRkb2NcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYy5zZXQodGhpcy5jZW50ZXJQb2ludC54IC0gcGFydGljbGUucC54LCB0aGlzLmNlbnRlclBvaW50LnkgLSBwYXJ0aWNsZS5wLnkpO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAoZGlzdGFuY2VTcSAhPT0gMCkge1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aCgpO1xuICAgICAgY29uc3QgZmFjdG9yID0gKHRoaXMuZm9yY2UgKiB0aW1lKSAvIChkaXN0YW5jZVNxICogZGlzdGFuY2UpO1xuXG4gICAgICBwYXJ0aWNsZS52LnggKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy54O1xuICAgICAgcGFydGljbGUudi55ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRpYWxpemUoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gaW5pdGlhbGl6ZXMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5pdGlhbGl6ZXNbaV0gaW5zdGFuY2VvZiBJbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemVzW2ldLmluaXQoZW1pdHRlciwgcGFydGljbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gIH0sXG5cbiAgLy8gaW5pdFxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplKSB7XG4gICAgUHJvcFV0aWwuc2V0UHJvcChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gICAgUHJvcFV0aWwuc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgfSxcblxuICBiaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChlbWl0dGVyLmJpbmRFbWl0dGVyKSB7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChlbWl0dGVyLnApO1xuICAgICAgcGFydGljbGUudi5hZGQoZW1pdHRlci52KTtcbiAgICAgIHBhcnRpY2xlLmEuYWRkKGVtaXR0ZXIuYSk7XG4gICAgICBwYXJ0aWNsZS52LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0oZW1pdHRlci5yb3RhdGlvbikpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuLi9pbml0aWFsaXplL1JhdGVcIjtcbmltcG9ydCBJbml0aWFsaXplVXRpbCBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0dGVyIGV4dGVuZHMgUGFydGljbGUge1xuICAvKipcbiAgICogWW91IGNhbiB1c2UgdGhpcyBlbWl0IHBhcnRpY2xlcy5cbiAgICpcbiAgICogSXQgd2lsbCBkaXNwYXRjaCBmb2xsb3cgZXZlbnRzOlxuICAgKiBQQVJUSUNMRV9DUkVBVEVEXG4gICAqIFBBUlRJQ0xFX1VQREFUQVxuICAgKiBQQVJUSUNMRV9ERUFEXG4gICAqXG4gICAqIEBjbGFzcyBFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtkYW1waW5nOjAuMDEsYmluZEVtaXR0ZXI6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mID0ge30pIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMucGFydGljbGVzID0gW107XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG4gICAgdGhpcy5pbml0aWFsaXplcyA9IFtdO1xuXG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy5lbWl0U3BlZWQgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnJpY3Rpb24gY29lZmZpY2llbnQgZm9yIGFsbCBwYXJ0aWNsZSBlbWl0IGJ5IFRoaXM7XG4gICAgICogQHByb3BlcnR5IGRhbXBpbmdcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDAuMDA2XG4gICAgICovXG4gICAgdGhpcy5kYW1waW5nID0gMC4wMDY7XG5cbiAgICAvKipcbiAgICAgKiBJZiBiaW5kRW1pdHRlciB0aGUgcGFydGljbGVzIGNhbiBiaW5kIHRoaXMgZW1pdHRlcidzIHByb3BlcnR5O1xuICAgICAqIEBwcm9wZXJ0eSBiaW5kRW1pdHRlclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICB0aGlzLmJpbmRFbWl0dGVyID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHBlciBzZWNvbmQgZW1pdCAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICAgKiBAcHJvcGVydHkgcmF0ZVxuICAgICAqIEB0eXBlIHtSYXRlfVxuICAgICAqIEBkZWZhdWx0IFJhdGUoMSwgLjEpXG4gICAgICovXG4gICAgdGhpcy5yYXRlID0gbmV3IFJhdGUoMSwgMC4xKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRW1pdHRlclwiO1xuICAgIHRoaXMuaWQgPSBQdWlkLmlkKHRoaXMubmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVtaXRUaW1lIGJlZ2luIGVtaXQgdGltZTtcbiAgICogQHBhcmFtIHtTdHJpbmd9IGxpZmUgdGhlIGxpZmUgb2YgdGhpcyBlbWl0dGVyXG4gICAqL1xuICBlbWl0KHRvdGFsVGltZSwgbGlmZSkge1xuICAgIHRoaXMuc3RvcGVkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSBVdGlsLmluaXRWYWx1ZSh0b3RhbFRpbWUsIEluZmluaXR5KTtcblxuICAgIGlmIChsaWZlID09PSB0cnVlIHx8IGxpZmUgPT09IFwibGlmZVwiIHx8IGxpZmUgPT09IFwiZGVzdHJveVwiKSB7XG4gICAgICB0aGlzLmxpZmUgPSB0b3RhbFRpbWUgPT09IFwib25jZVwiID8gMSA6IHRoaXMudG90YWxUaW1lO1xuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGxpZmUpKSB7XG4gICAgICB0aGlzLmxpZmUgPSBsaWZlO1xuICAgIH1cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnN0b3BlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMudG90YWxUaW1lID09PSBcIm5vbmVcIikge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFRpbWUgPT09IFwib25jZVwiKSB7XG4gICAgICBsZXQgaTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSg5OTk5OSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAwKSB0aGlzLmVtaXRTcGVlZCA9IGxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgdGhpcy50b3RhbFRpbWUgPSBcIm5vbmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuXG4gICAgICBpZiAodGhpcy5lbWl0VGltZSA8IHRoaXMudG90YWxUaW1lKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSh0aW1lKTtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIHNpbmdsZSBwYXJ0aWNsZTtcbiAgICpcbiAgICogY2FuIHVzZSBlbWl0KHt4OjEwfSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSkgb3IgZW1pdChbe3g6MTB9LG5ldyBJbml0aWFsaXplXSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSlcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIGNyZWF0ZVBhcnRpY2xlKGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJlbnQucG9vbC5nZXQoUGFydGljbGUpO1xuICAgIHRoaXMuc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKTtcbiAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICByZXR1cm4gcGFydGljbGU7XG4gIH1cblxuICBzZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpIHtcbiAgICBsZXQgaW5pdGlhbGl6ZXMgPSB0aGlzLmluaXRpYWxpemVzO1xuICAgIGxldCBiZWhhdmlvdXJzID0gdGhpcy5iZWhhdmlvdXJzO1xuXG4gICAgaWYgKGluaXRpYWxpemUpIGluaXRpYWxpemVzID0gVXRpbC50b0FycmF5KGluaXRpYWxpemUpO1xuICAgIGlmIChiZWhhdmlvdXIpIGJlaGF2aW91cnMgPSBVdGlsLnRvQXJyYXkoYmVoYXZpb3VyKTtcblxuICAgIHBhcnRpY2xlLnJlc2V0KCk7XG4gICAgSW5pdGlhbGl6ZVV0aWwuaW5pdGlhbGl6ZSh0aGlzLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpO1xuICAgIHBhcnRpY2xlLmFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycyk7XG4gICAgcGFydGljbGUucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMucGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnBhcnRpY2xlcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIEVtaXR0ZXJcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnJlbW92ZUFsbEluaXRpYWxpemVycygpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnJlbW92ZUVtaXR0ZXIodGhpcyk7XG5cbiAgICB0aGlzLnJhdGUgPSBudWxsO1xuICAgIHRoaXMub2xkID0gbnVsbDtcbiAgICB0aGlzLnJnYiA9IG51bGw7XG4gICAgdGhpcy52ID0gbnVsbDtcbiAgICB0aGlzLmEgPSBudWxsO1xuICAgIHRoaXMucCA9IG51bGw7XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoRW1pdHRlcik7XG4iLCJpbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ckVtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBCZWhhdmlvdXJFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBCZWhhdmlvdXJFbWl0dGVyIHlvdSBjYW4gYWRkIGJlaGF2aW91cnMgdG8gc2VsZjtcbiAgICogQGNsYXNzIFByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnNlbGZCZWhhdmlvdXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gZW1pdHRlcjtcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZFNlbGZCZWhhdmlvdXIoQmVoYXZpb3VyMSxCZWhhdmlvdXIyLEJlaGF2aW91cjMpO1xuICAgKiBAbWV0aG9kIGFkZFNlbGZCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtQcm90b24uQmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBQcm90b24uQ29sb3IoJ3JhbmRvbScpXG4gICAqL1xuICBhZGRTZWxmQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSxcbiAgICAgIGxlbmd0aCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmVoYXZpb3VyID0gcmVzdFtpXTtcbiAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgQmVoYXZpb3VyIGZvciBzZWxmXG4gICAqIEBtZXRob2QgcmVtb3ZlU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlU2VsZkJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZkJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLnNlbGZCZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICB1cGRhdGUodGltZSkge1xuICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcblxuICAgIGlmICghdGhpcy5zbGVlcCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgICBsZXQgaTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vRW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dFbWl0dGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gIC8qKlxuICAgKiBUaGUgRm9sbG93RW1pdHRlciBjbGFzcyBpbmhlcml0cyBmcm9tIFByb3Rvbi5FbWl0dGVyXG4gICAqXG4gICAqIHVzZSB0aGUgRm9sbG93RW1pdHRlciB3aWxsIGVtaXQgcGFydGljbGUgd2hlbiBtb3VzZW1vdmluZ1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLkZvbGxvd0VtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gbW91c2VUYXJnZXQgbW91c2VldmVudCdzIHRhcmdldDtcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVhc2UgdGhlIGVhc2luZyBvZiBmb2xsb3dpbmcgc3BlZWQ7XG4gICAqIEBkZWZhdWx0IDAuN1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihtb3VzZVRhcmdldCwgZWFzZSwgY29uZikge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5tb3VzZVRhcmdldCA9IFV0aWwuaW5pdFZhbHVlKG1vdXNlVGFyZ2V0LCB3aW5kb3cpO1xuICAgIHRoaXMuZWFzZSA9IFV0aWwuaW5pdFZhbHVlKGVhc2UsIDAuNyk7XG5cbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMubW91c2Vtb3ZlSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZW1vdmUuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlZG93bkhhbmRsZXIgPSBlID0+IHRoaXMubW91c2Vkb3duLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZXVwSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZXVwLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqL1xuICBlbWl0KCkge1xuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IGZhbHNlO1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgICBpZiAoZS5sYXllclggfHwgZS5sYXllclggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLmxheWVyWCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLmxheWVyWSAtIHRoaXMucC55KSAqIHRoaXMuZWFzZTtcbiAgICB9IGVsc2UgaWYgKGUub2Zmc2V0WCB8fCBlLm9mZnNldFggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLm9mZnNldFggLSB0aGlzLnAueCkgKiB0aGlzLmVhc2U7XG4gICAgICB0aGlzLnAueSArPSAoZS5vZmZzZXRZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbGxvd0VtaXR0aW5nKSBzdXBlci5lbWl0KFwib25jZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMubW91c2VUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBwaWN0dXJlIG9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBpcyBvciBub1xuICAgKi9cbiAgaXNJbWFnZShvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvYmouX19pc0ltYWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IHRhZ05hbWUgPSBgJHtvYmoudGFnTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBgJHtvYmoubm9kZU5hbWV9YC50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChub2RlTmFtZSA9PT0gXCJJTUdcIiB8fCB0YWdOYW1lID09PSBcIklNR1wiKSB7XG4gICAgICBvYmouX19pc0ltYWdlID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBzdHJpbmcgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgfVxufTtcbiIsImltcG9ydCBQb29sIGZyb20gXCIuLi9jb3JlL1Bvb2xcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMuY2lyY2xlQ29uZiA9IHsgaXNDaXJjbGU6IHRydWUgfTtcblxuICAgIHRoaXMuaW5pdEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMubmFtZSA9IFwiQmFzZVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRTdHJva2UoY29sb3IgPSBcIiMwMDAwMDBcIiwgdGhpbmtuZXNzID0gMSkge1xuICAgIHRoaXMuc3Ryb2tlID0geyBjb2xvciwgdGhpbmtuZXNzIH07XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9uUHJvdG9uVXBkYXRlLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGVBZnRlci5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlckFkZGVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciA9IGVtaXR0ZXIgPT4ge1xuICAgICAgdGhpcy5vbkVtaXR0ZXJSZW1vdmVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVDcmVhdGVkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVVcGRhdGUuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlRGVhZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVEZWFkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG4gIH1cblxuICBpbml0KHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50ID0gcHJvdG9uO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCB0aGlzLl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIpO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0NSRUFURURcIiwgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBvb2wgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG5cbiAgcmVtb3ZlKHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9BRERFRFwiLCB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfVVBEQVRFXCIsIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHt9XG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7fVxuXG4gIG9uRW1pdHRlckFkZGVkKGVtaXR0ZXIpIHt9XG4gIG9uRW1pdHRlclJlbW92ZWQoZW1pdHRlcikge31cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1JlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5idWZmZXJDYWNoZSA9IHt9O1xuICAgIHRoaXMubmFtZSA9IFwiQ2FudmFzUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuY29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIGlmIChUeXBlcy5pc0ltYWdlKHBhcnRpY2xlLmJvZHkpKSB7XG4gICAgICAgIHRoaXMuZHJhd0ltYWdlKHBhcnRpY2xlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmF3Q2lyY2xlKHBhcnRpY2xlKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gIH1cblxuICAvLyBwcml2YXRlIGRyYXdJbWFnZSBtZXRob2RcbiAgZHJhd0ltYWdlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdyA9IChwYXJ0aWNsZS5ib2R5LndpZHRoICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCBoID0gKHBhcnRpY2xlLmJvZHkuaGVpZ2h0ICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCB4ID0gcGFydGljbGUucC54IC0gdyAvIDI7XG4gICAgY29uc3QgeSA9IHBhcnRpY2xlLnAueSAtIGggLyAyO1xuXG4gICAgaWYgKCEhcGFydGljbGUuY29sb3IpIHtcbiAgICAgIGlmICghcGFydGljbGUuZGF0YVtcImJ1ZmZlclwiXSkgcGFydGljbGUuZGF0YS5idWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcihwYXJ0aWNsZS5ib2R5KTtcblxuICAgICAgY29uc3QgYnVmQ29udGV4dCA9IHBhcnRpY2xlLmRhdGEuYnVmZmVyLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGJ1ZkNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLndpZHRoLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci5oZWlnaHQpO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgYnVmQ29udGV4dC5kcmF3SW1hZ2UocGFydGljbGUuYm9keSwgMCwgMCk7XG5cbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgYnVmQ29udGV4dC5maWxsU3R5bGUgPSBDb2xvclV0aWwucmdiVG9IZXgocGFydGljbGUucmdiKTtcbiAgICAgIGJ1ZkNvbnRleHQuZmlsbFJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlcixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdyxcbiAgICAgICAgaFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKHBhcnRpY2xlLnJvdGF0aW9uKSk7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKC1wYXJ0aWNsZS5wLngsIC1wYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwLCBwYXJ0aWNsZS5ib2R5LndpZHRoLCBwYXJ0aWNsZS5ib2R5LmhlaWdodCwgeCwgeSwgdywgaCk7XG5cbiAgICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0NpcmNsZSAtLVxuICBkcmF3Q2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLnJnYikge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7cGFydGljbGUucmdiLnJ9LCR7cGFydGljbGUucmdiLmd9LCR7cGFydGljbGUucmdiLmJ9LCR7cGFydGljbGUuYWxwaGF9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBwYXJ0aWNsZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvLyBkcmF3IGNpcmNsZVxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5zdHJva2UudGhpbmtuZXNzO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBjcmVhdGVCdWZmZXJcbiAgY3JlYXRlQnVmZmVyKGltYWdlKSB7XG4gICAgaWYgKFR5cGVzLmlzSW1hZ2UoaW1hZ2UpKSB7XG4gICAgICBjb25zdCBzaXplID0gaW1hZ2Uud2lkdGggKyBcIl9cIiArIGltYWdlLmhlaWdodDtcbiAgICAgIGxldCBjYW52YXMgPSB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdO1xuXG4gICAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgdGhpcy5idWZmZXJDYWNoZVtzaXplXSA9IGNhbnZhcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zZm9ybTNkID0gZmFsc2U7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLmFkZEltZzJCb2R5ID0gdGhpcy5hZGRJbWcyQm9keS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEb21SZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldCh0aGlzLmNpcmNsZUNvbmYsIHBhcnRpY2xlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgaWYgKHRoaXMudHJhbnNmb3JtM2QpIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0zZChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSwgcGFydGljbGUuc2NhbGUsIHBhcnRpY2xlLnJvdGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERvbVV0aWwudHJhbnNmb3JtKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfVxuXG4gICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLm9wYWNpdHkgPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkuaXNDaXJjbGUpIHtcbiAgICAgICAgcGFydGljbGUuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmJvZHlSZWFkeShwYXJ0aWNsZSkpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBib2R5UmVhZHkocGFydGljbGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHBhcnRpY2xlLmJvZHkgPT09IFwib2JqZWN0XCIgJiYgcGFydGljbGUuYm9keSAmJiAhcGFydGljbGUuYm9keS5pc0lubmVyO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQoaW1nLCBwYXJ0aWNsZSk7XG4gICAgRG9tVXRpbC5yZXNpemUocGFydGljbGUuYm9keSwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVTcHJpdGUoYm9keSwgcGFydGljbGUpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCAyICogcGFydGljbGUucmFkaXVzLCAyICogcGFydGljbGUucmFkaXVzKTtcbiAgICBkb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gYCR7cGFydGljbGUucmFkaXVzfXB4YDtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgZG9tLnN0eWxlLmJvcmRlckNvbG9yID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyV2lkdGggPSBgJHt0aGlzLnN0cm9rZS50aGlua25lc3N9cHhgO1xuICAgIH1cbiAgICBkb20uaXNDaXJjbGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHVybCA9IHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiID8gYm9keSA6IGJvZHkuc3JjO1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCBib2R5LndpZHRoLCBib2R5LmhlaWdodCk7XG4gICAgZG9tLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt1cmx9KWA7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFYXNlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLm5hbWUgPSBcIkVhc2VsUmVuZGVyZXJcIjtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHRoaXMuY3JlYXRlU3ByaXRlKHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keS54ID0gcGFydGljbGUucC54O1xuICAgICAgcGFydGljbGUuYm9keS55ID0gcGFydGljbGUucC55O1xuXG4gICAgICBwYXJ0aWNsZS5ib2R5LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnNjYWxlWCA9IHBhcnRpY2xlLmJvZHkuc2NhbGVZID0gcGFydGljbGUuc2NhbGU7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJvdGF0aW9uID0gcGFydGljbGUucm90YXRpb247XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keS5wYXJlbnQgJiYgcGFydGljbGUuYm9keS5wYXJlbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHBhcnRpY2xlLmdyYXBoaWNzKSB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmdyYXBoaWNzKTtcbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgY3JlYXRlU3ByaXRlKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQocGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAocGFydGljbGUuYm9keS5wYXJlbnQpIHJldHVybjtcbiAgICBpZiAocGFydGljbGUuYm9keVtcImltYWdlXCJdKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJlZ1ggPSBwYXJ0aWNsZS5ib2R5LmltYWdlLndpZHRoIC8gMjtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWSA9IHBhcnRpY2xlLmJvZHkuaW1hZ2UuaGVpZ2h0IC8gMjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBncmFwaGljcyA9IHRoaXMucG9vbC5nZXQod2luZG93LmNyZWF0ZWpzLkdyYXBoaWNzKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgaWYgKFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSkge1xuICAgICAgICBncmFwaGljcy5iZWdpblN0cm9rZSh0aGlzLnN0cm9rZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncmFwaGljcy5iZWdpblN0cm9rZShcIiMwMDAwMDBcIik7XG4gICAgICB9XG4gICAgfVxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIikuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5wb29sLmdldCh3aW5kb3cuY3JlYXRlanMuU2hhcGUsIFtncmFwaGljc10pO1xuXG4gICAgcGFydGljbGUuYm9keSA9IHNoYXBlO1xuICAgIHBhcnRpY2xlLmdyYXBoaWNzID0gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgcmVjdGFuZ2xlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLmNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhlbFJlbmRlcmVyXCI7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBjcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGUgPyByZWN0YW5nbGUgOiBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCh0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55LCB0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICB0aGlzLnJlY3RhbmdsZS54LFxuICAgICAgdGhpcy5yZWN0YW5nbGUueSxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLndpZHRoLFxuICAgICAgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhKSB7XG4gICAgICB0aGlzLnNldFBpeGVsKFxuICAgICAgICB0aGlzLmltYWdlRGF0YSxcbiAgICAgICAgKHBhcnRpY2xlLnAueCAtIHRoaXMucmVjdGFuZ2xlLngpID4+IDAsXG4gICAgICAgIChwYXJ0aWNsZS5wLnkgLSB0aGlzLnJlY3RhbmdsZS55KSA+PiAwLFxuICAgICAgICBwYXJ0aWNsZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQaXhlbChpbWFnZWRhdGEsIHgsIHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgcmdiID0gcGFydGljbGUucmdiO1xuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5lbGVtZW50LndpZHRoIHx8IHkgPCAwIHx8IHkgPiB0aGlzLmVsZW1lbnQuaGVpZ2h0KSByZXR1cm47XG5cbiAgICBjb25zdCBpID0gKCh5ID4+IDApICogaW1hZ2VkYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpbWFnZWRhdGEuZGF0YVtpXSA9IHJnYi5yO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAxXSA9IHJnYi5nO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAyXSA9IHJnYi5iO1xuICAgIGltYWdlZGF0YS5kYXRhW2kgKyAzXSA9IHBhcnRpY2xlLmFscGhhICogMjU1O1xuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICAgIHRoaXMucmVjdGFuZ2xlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFR5cGVzIGZyb20gXCIuLi91dGlscy9UeXBlc1wiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmxldCBQSVhJQ2xhc3M7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhpUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMuY29sb3IgPSBmYWxzZTtcbiAgICB0aGlzLnNldENvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5ibGVuZE1vZGUgPSBudWxsO1xuICAgIHRoaXMucG9vbC5jcmVhdGUgPSAoYm9keSwgcGFydGljbGUpID0+IHRoaXMuY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXRQSVhJKHdpbmRvdy5QSVhJKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUGl4aVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRQSVhJKFBJWEkpIHtcbiAgICB0cnkge1xuICAgICAgUElYSUNsYXNzID0gUElYSSB8fCB7IFNwcml0ZToge30gfTtcbiAgICAgIHRoaXMuY3JlYXRlRnJvbUltYWdlID0gUElYSUNsYXNzLlNwcml0ZS5mcm9tIHx8IFBJWElDbGFzcy5TcHJpdGUuZnJvbUltYWdlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQocGFydGljbGUuYm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldCh0aGlzLmNpcmNsZUNvbmYsIHBhcnRpY2xlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ibGVuZE1vZGUpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkuYmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIHRoaXMudHJhbnNmb3JtKHBhcnRpY2xlLCBwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmICh0aGlzLnNldENvbG9yID09PSB0cnVlIHx8IHRoaXMuY29sb3IgPT09IHRydWUpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkudGludCA9IENvbG9yVXRpbC5nZXRIZXgxNkZyb21QYXJ0aWNsZShwYXJ0aWNsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgKi9cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgfVxuXG4gIHRyYW5zZm9ybShwYXJ0aWNsZSwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgdGFyZ2V0LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICB0YXJnZXQuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgIHRhcmdldC5zY2FsZS54ID0gcGFydGljbGUuc2NhbGU7XG4gICAgdGFyZ2V0LnNjYWxlLnkgPSBwYXJ0aWNsZS5zY2FsZTtcblxuICAgIC8vIHVzaW5nIGNhY2hlZCB2ZXJzaW9uIG9mIE1hdGhVdGlsLlBJXzE4MCBmb3Igc2xpZ2h0IHBlcmZvcm1hbmNlIGluY3JlYXNlLlxuICAgIHRhcmdldC5yb3RhdGlvbiA9IHBhcnRpY2xlLnJvdGF0aW9uICogTWF0aFV0aWwuUElfMTgwOyAvLyBNYXRoVXRpbC5QSV8xODA7XG4gIH1cblxuICBjcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKSB7XG4gICAgaWYgKGJvZHkuaXNDaXJjbGUpIHJldHVybiB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5jcmVhdGVTcHJpdGUoYm9keSk7XG4gIH1cblxuICBjcmVhdGVTcHJpdGUoYm9keSkge1xuICAgIGNvbnN0IHNwcml0ZSA9IGJvZHkuaXNJbm5lciA/IHRoaXMuY3JlYXRlRnJvbUltYWdlKGJvZHkuc3JjKSA6IG5ldyBQSVhJQ2xhc3MuU3ByaXRlKGJvZHkpO1xuXG4gICAgc3ByaXRlLmFuY2hvci54ID0gMC41O1xuICAgIHNwcml0ZS5hbmNob3IueSA9IDAuNTtcblxuICAgIHJldHVybiBzcHJpdGU7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBncmFwaGljcyA9IG5ldyBQSVhJQ2xhc3MuR3JhcGhpY3MoKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgY29uc3Qgc3Ryb2tlID0gVHlwZXMuaXNTdHJpbmcodGhpcy5zdHJva2UpID8gdGhpcy5zdHJva2UgOiAweDAwMDAwMDtcbiAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKHN0cm9rZSk7XG4gICAgfVxuXG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHBhcnRpY2xlLmNvbG9yIHx8IDB4MDA4Y2VkKTtcbiAgICBncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xuXG4gICAgcmV0dXJuIGdyYXBoaWNzO1xuICB9XG5cbiAgZGVzdHJveShwYXJ0aWNsZXMpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG5cbiAgICBsZXQgaSA9IHBhcnRpY2xlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IHBhcnRpY2xlID0gcGFydGljbGVzW2ldO1xuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdDMgZnJvbSBcIi4uL21hdGgvTWF0M1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNU3RhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hdHMgPSBbXTtcbiAgICB0aGlzLnNpemUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB0aGlzLm1hdHMucHVzaChNYXQzLmNyZWF0ZShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKTtcbiAgfVxuXG4gIHNldChtLCBpKSB7XG4gICAgaWYgKGkgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1tpIC0gMV0sIG0sIHRoaXMubWF0c1tpXSk7XG5cbiAgICB0aGlzLnNpemUgPSBNYXRoLm1heCh0aGlzLnNpemUsIGkgKyAxKTtcbiAgfVxuXG4gIHB1c2gobSkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1t0aGlzLnNpemUgLSAxXSwgbSwgdGhpcy5tYXRzW3RoaXMuc2l6ZV0pO1xuXG4gICAgdGhpcy5zaXplKys7XG4gIH1cblxuICBwb3AoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA+IDApIHRoaXMuc2l6ZS0tO1xuICB9XG5cbiAgdG9wKCkge1xuICAgIHJldHVybiB0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV07XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IE1TdGFjayBmcm9tIFwiLi4vdXRpbHMvTVN0YWNrXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IFdlYkdMVXRpbCBmcm9tIFwiLi4vdXRpbHMvV2ViR0xVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViR0xSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuZ2wgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiLCB7IGFudGlhbGlhczogdHJ1ZSwgc3RlbmNpbDogZmFsc2UsIGRlcHRoOiBmYWxzZSB9KTtcbiAgICBpZiAoIXRoaXMuZ2wpIGFsZXJ0KFwiU29ycnkgeW91ciBicm93c2VyIGRvIG5vdCBzdXBwZXN0IFdlYkdMIVwiKTtcblxuICAgIHRoaXMuaW5pdFZhcigpO1xuICAgIHRoaXMuc2V0TWF4UmFkaXVzKCk7XG4gICAgdGhpcy5pbml0U2hhZGVycygpO1xuICAgIHRoaXMuaW5pdEJ1ZmZlcnMoKTtcblxuICAgIHRoaXMuZ2wuYmxlbmRFcXVhdGlvbih0aGlzLmdsLkZVTkNfQUREKTtcbiAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICB0aGlzLmFkZEltZzJCb2R5ID0gdGhpcy5hZGRJbWcyQm9keS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJXZWJHTFJlbmRlcmVyXCI7XG4gIH1cblxuICBpbml0KHByb3Rvbikge1xuICAgIHN1cGVyLmluaXQocHJvdG9uKTtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnVtYXRbNF0gPSAtMjtcbiAgICB0aGlzLnVtYXRbN10gPSAxO1xuXG4gICAgdGhpcy5zbWF0WzBdID0gMSAvIHdpZHRoO1xuICAgIHRoaXMuc21hdFs0XSA9IDEgLyBoZWlnaHQ7XG5cbiAgICB0aGlzLm1zdGFjay5zZXQodGhpcy51bWF0LCAwKTtcbiAgICB0aGlzLm1zdGFjay5zZXQodGhpcy5zbWF0LCAxKTtcblxuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHNldE1heFJhZGl1cyhyYWRpdXMpIHtcbiAgICB0aGlzLmNpcmNsZUNhbnZhc1VSTCA9IHRoaXMuY3JlYXRlQ2lyY2xlKHJhZGl1cyk7XG4gIH1cblxuICBnZXRWZXJ0ZXhTaGFkZXIoKSB7XG4gICAgY29uc3QgdnNTb3VyY2UgPSBbXG4gICAgICBcInVuaWZvcm0gdmVjMiB2aWV3cG9ydDtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFxuICAgICAgXCJhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ1bmlmb3JtIG1hdDMgdE1hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInZvaWQgbWFpbigpIHtcIixcbiAgICAgIFwidmVjMyB2ID0gdE1hdCAqIHZlYzMoYVZlcnRleFBvc2l0aW9uLCAxLjApO1wiLFxuICAgICAgXCJnbF9Qb3NpdGlvbiA9IHZlYzQodi54LCB2LnksIDAsIDEpO1wiLFxuICAgICAgXCJ2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwiYWxwaGEgPSB0TWF0WzBdWzJdO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHZzU291cmNlO1xuICB9XG5cbiAgZ2V0RnJhZ21lbnRTaGFkZXIoKSB7XG4gICAgY29uc3QgZnNTb3VyY2UgPSBbXG4gICAgICBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFxuICAgICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidmFyeWluZyBmbG9hdCBhbHBoYTtcIixcbiAgICAgIFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXG4gICAgICBcInVuaWZvcm0gdmVjNCBjb2xvcjtcIixcbiAgICAgIFwidW5pZm9ybSBib29sIHVzZVRleHR1cmU7XCIsXG4gICAgICBcInVuaWZvcm0gdmVjMyB1Q29sb3I7XCIsXG4gICAgICBcInZvaWQgbWFpbigpIHtcIixcbiAgICAgIFwidmVjNCB0ZXh0dXJlQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFxuICAgICAgXCJnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlQ29sb3IgKiB2ZWM0KHVDb2xvciwgMS4wKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yLncgKj0gYWxwaGE7XCIsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gZnNTb3VyY2U7XG4gIH1cblxuICBpbml0VmFyKCkge1xuICAgIHRoaXMubXN0YWNrID0gbmV3IE1TdGFjaygpO1xuICAgIHRoaXMudW1hdCA9IE1hdDMuY3JlYXRlKFsyLCAwLCAxLCAwLCAtMiwgMCwgLTEsIDEsIDFdKTtcbiAgICB0aGlzLnNtYXQgPSBNYXQzLmNyZWF0ZShbMSAvIDEwMCwgMCwgMSwgMCwgMSAvIDEwMCwgMCwgMCwgMCwgMV0pO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSB7fTtcbiAgfVxuXG4gIGJsZW5kRXF1YXRpb24oQSkge1xuICAgIHRoaXMuZ2wuYmxlbmRFcXVhdGlvbih0aGlzLmdsW0FdKTtcbiAgfVxuXG4gIGJsZW5kRnVuYyhBLCBCKSB7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbFtBXSwgdGhpcy5nbFtCXSk7XG4gIH1cblxuICBnZXRTaGFkZXIoZ2wsIHN0ciwgZnMpIHtcbiAgICBjb25zdCBzaGFkZXIgPSBmcyA/IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpIDogZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc3RyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgYWxlcnQoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBpbml0U2hhZGVycygpIHtcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0RnJhZ21lbnRTaGFkZXIoKSwgdHJ1ZSk7XG4gICAgY29uc3QgdmVydGV4U2hhZGVyID0gdGhpcy5nZXRTaGFkZXIodGhpcy5nbCwgdGhpcy5nZXRWZXJ0ZXhTaGFkZXIoKSwgZmFsc2UpO1xuXG4gICAgdGhpcy5zcHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5zcHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIHRoaXMuZ2wubGlua1Byb2dyYW0odGhpcy5zcHJvZ3JhbSk7XG5cbiAgICBpZiAoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnNwcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkgYWxlcnQoXCJDb3VsZCBub3QgaW5pdGlhbGlzZSBzaGFkZXJzXCIpO1xuXG4gICAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuICAgIHRoaXMuc3Byb2dyYW0udnBhID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcImFWZXJ0ZXhQb3NpdGlvblwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnRjYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVGV4dHVyZUNvb3JkXCIpO1xuICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zcHJvZ3JhbS50Y2EpO1xuICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zcHJvZ3JhbS52cGEpO1xuXG4gICAgdGhpcy5zcHJvZ3JhbS50TWF0VW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidE1hdFwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnNhbXBsZXJVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1U2FtcGxlclwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnVzZVRleCA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidXNlVGV4dHVyZVwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLmNvbG9yID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1Q29sb3JcIik7XG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zcHJvZ3JhbS51c2VUZXgsIDEpO1xuICB9XG5cbiAgaW5pdEJ1ZmZlcnMoKSB7XG4gICAgY29uc3QgdnMgPSBbMCwgMywgMSwgMCwgMiwgM107XG4gICAgbGV0IGlkeDtcblxuICAgIHRoaXMudW5pdElCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KHZzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBsZXQgaTtcbiAgICBsZXQgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpKTtcbiAgICBpZHggPSBuZXcgVWludDE2QXJyYXkoaWRzKTtcblxuICAgIHRoaXMudW5pdEkzMyA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdEkzMyk7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGlkeCwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBpZHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTAwOyBpKyspIGlkcy5wdXNoKGksIGkgKyAxLCBpICsgMik7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnN0cmlwQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5zdHJpcEJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGlkeCwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocmFpZHVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgPSBXZWJHTFV0aWwubmhwb3QoVXRpbC5pbml0VmFsdWUocmFpZHVzLCAzMikpO1xuICAgIGNvbnN0IGNhbnZhcyA9IERvbVV0aWwuY3JlYXRlQ2FudmFzKFwiY2lyY2xlX2NhbnZhc1wiLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzICogMik7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuYXJjKHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgY29udGV4dC5maWxsKCk7XG5cbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgpO1xuICB9XG5cbiAgZHJhd0ltZzJDYW52YXMocGFydGljbGUpIHtcbiAgICBjb25zdCBfdyA9IHBhcnRpY2xlLmJvZHkud2lkdGg7XG4gICAgY29uc3QgX2ggPSBwYXJ0aWNsZS5ib2R5LmhlaWdodDtcblxuICAgIGNvbnN0IF93aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LndpZHRoKTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KHBhcnRpY2xlLmJvZHkuaGVpZ2h0KTtcblxuICAgIGNvbnN0IF9zY2FsZVggPSBwYXJ0aWNsZS5ib2R5LndpZHRoIC8gX3dpZHRoO1xuICAgIGNvbnN0IF9zY2FsZVkgPSBwYXJ0aWNsZS5ib2R5LmhlaWdodCAvIF9oZWlnaHQ7XG5cbiAgICBpZiAoIXRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdKVxuICAgICAgdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY10gPSBbXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpLFxuICAgICAgICB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpLFxuICAgICAgICB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgICBdO1xuXG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMF07XG4gICAgcGFydGljbGUuZGF0YS52Y0J1ZmZlciA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzFdO1xuICAgIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsyXTtcblxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS50Y0J1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKFxuICAgICAgdGhpcy5nbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgX3NjYWxlWCwgMC4wLCAwLjAsIF9zY2FsZVksIF9zY2FsZVksIF9zY2FsZVldKSxcbiAgICAgIHRoaXMuZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS52Y0J1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKFxuICAgICAgdGhpcy5nbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgX3csIDAuMCwgMC4wLCBfaCwgX3csIF9oXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBwYXJ0aWNsZS5kYXRhLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIF93aWR0aCwgX2hlaWdodCk7XG5cbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVIpO1xuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCk7XG4gICAgdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLmdsLlRFWFRVUkVfMkQpO1xuXG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkID0gdHJ1ZTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCA9IF93O1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUhlaWdodCA9IF9oO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgLy8gdGhpcy5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDEpO1xuICAgIC8vIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkID0gZmFsc2U7XG4gICAgcGFydGljbGUuZGF0YS50bWF0ID0gTWF0My5jcmVhdGUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRtYXRbOF0gPSAxO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS5pbWF0WzhdID0gMTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHRoaXMuY2lyY2xlQ2FudmFzVVJMLCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgICBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlID0gcGFydGljbGUucmFkaXVzIC8gdGhpcy5jaXJjbGVDYW52YXNSYWRpdXM7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gaW1nO1xuICAgIHBhcnRpY2xlLmRhdGEuc3JjID0gaW1nLnNyYztcbiAgICBwYXJ0aWNsZS5kYXRhLmNhbnZhcyA9IEltZ1V0aWwuZ2V0Q2FudmFzRnJvbUNhY2hlKGltZyk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IDE7XG5cbiAgICB0aGlzLmRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKTtcbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkKSB7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeChwYXJ0aWNsZSk7XG5cbiAgICAgIHRoaXMuZ2wudW5pZm9ybTNmKHRoaXMuc3Byb2dyYW0uY29sb3IsIHBhcnRpY2xlLnJnYi5yIC8gMjU1LCBwYXJ0aWNsZS5yZ2IuZyAvIDI1NSwgcGFydGljbGUucmdiLmIgLyAyNTUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4M2Z2KHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0sIGZhbHNlLCB0aGlzLm1zdGFjay50b3AoKSk7XG5cbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS52Y0J1ZmZlcik7XG4gICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zcHJvZ3JhbS52cGEsIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS50Y0J1ZmZlcik7XG4gICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zcHJvZ3JhbS50Y2EsIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBwYXJ0aWNsZS5kYXRhLnRleHR1cmUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG5cbiAgICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuZ2wuVFJJQU5HTEVTLCA2LCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKTtcbiAgICAgIHRoaXMubXN0YWNrLnBvcCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIHVwZGF0ZU1hdHJpeChwYXJ0aWNsZSkge1xuICAgIGNvbnN0IG1vdmVPcmlnaW5NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKFxuICAgICAgLXBhcnRpY2xlLmRhdGEudGV4dHVyZVdpZHRoIC8gMixcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgLyAyXG4gICAgKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlVHJhbnNsYXRpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuXG4gICAgY29uc3QgYW5nZWwgPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDtcbiAgICBjb25zdCByb3RhdGlvbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlUm90YXRpb24oYW5nZWwpO1xuXG4gICAgY29uc3Qgc2NhbGUgPSBwYXJ0aWNsZS5zY2FsZSAqIHBhcnRpY2xlLmRhdGEub2xkU2NhbGU7XG4gICAgY29uc3Qgc2NhbGVNYXRyaXggPSBXZWJHTFV0aWwubWFrZVNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgbGV0IG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtb3ZlT3JpZ2luTWF0cml4LCBzY2FsZU1hdHJpeCk7XG5cbiAgICBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobWF0cml4LCByb3RhdGlvbk1hdHJpeCk7XG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgdHJhbnNsYXRpb25NYXRyaXgpO1xuXG4gICAgTWF0My5pbnZlcnNlKG1hdHJpeCwgcGFydGljbGUuZGF0YS5pbWF0KTtcbiAgICBtYXRyaXhbMl0gPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgIHRoaXMubXN0YWNrLnB1c2gobWF0cml4KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuZ2wgPSBudWxsO1xuICAgIHRoaXMubXN0YWNrID0gbnVsbDtcbiAgICB0aGlzLnVtYXQgPSBudWxsO1xuICAgIHRoaXMuc21hdCA9IG51bGw7XG4gICAgdGhpcy50ZXh0dXJlYnVmZmVycyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJDdXN0b21SZW5kZXJlclwiO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgxLCB5MSwgeDIsIHkyLCBkaXJlY3Rpb24pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHgyIC0geDEgPj0gMCkge1xuICAgICAgdGhpcy54MSA9IHgxO1xuICAgICAgdGhpcy55MSA9IHkxO1xuICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgdGhpcy55MiA9IHkyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLngxID0geDI7XG4gICAgICB0aGlzLnkxID0geTI7XG4gICAgICB0aGlzLngyID0geDE7XG4gICAgICB0aGlzLnkyID0geTE7XG4gICAgfVxuXG4gICAgdGhpcy5keCA9IHRoaXMueDIgLSB0aGlzLngxO1xuICAgIHRoaXMuZHkgPSB0aGlzLnkyIC0gdGhpcy55MTtcblxuICAgIHRoaXMubWlueCA9IE1hdGgubWluKHRoaXMueDEsIHRoaXMueDIpO1xuICAgIHRoaXMubWlueSA9IE1hdGgubWluKHRoaXMueTEsIHRoaXMueTIpO1xuICAgIHRoaXMubWF4eCA9IE1hdGgubWF4KHRoaXMueDEsIHRoaXMueDIpO1xuICAgIHRoaXMubWF4eSA9IE1hdGgubWF4KHRoaXMueTEsIHRoaXMueTIpO1xuXG4gICAgdGhpcy5kb3QgPSB0aGlzLngyICogdGhpcy55MSAtIHRoaXMueDEgKiB0aGlzLnkyO1xuICAgIHRoaXMueHh5eSA9IHRoaXMuZHggKiB0aGlzLmR4ICsgdGhpcy5keSAqIHRoaXMuZHk7XG5cbiAgICB0aGlzLmdyYWRpZW50ID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5nZXRMZW5ndGgoKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IFV0aWwuaW5pdFZhbHVlKGRpcmVjdGlvbiwgXCI+XCIpO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5yYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLngxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguY29zKHRoaXMuZ3JhZGllbnQpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguc2luKHRoaXMuZ3JhZGllbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uKHgsIHkpIHtcbiAgICBjb25zdCBBID0gdGhpcy5keTtcbiAgICBjb25zdCBCID0gLXRoaXMuZHg7XG4gICAgY29uc3QgQyA9IHRoaXMuZG90O1xuICAgIGNvbnN0IEQgPSBCID09PSAwID8gMSA6IEI7XG5cbiAgICBpZiAoKEEgKiB4ICsgQiAqIHkgKyBDKSAqIEQgPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldERpc3RhbmNlKHgsIHkpIHtcbiAgICBjb25zdCBBID0gdGhpcy5keTtcbiAgICBjb25zdCBCID0gLXRoaXMuZHg7XG4gICAgY29uc3QgQyA9IHRoaXMuZG90O1xuICAgIGNvbnN0IEQgPSBBICogeCArIEIgKiB5ICsgQztcblxuICAgIHJldHVybiBEIC8gTWF0aC5zcXJ0KHRoaXMueHh5eSk7XG4gIH1cblxuICBnZXRTeW1tZXRyaWModikge1xuICAgIGNvbnN0IHRoYTIgPSB2LmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhMSA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcblxuICAgIGNvbnN0IG9sZHggPSB2Lng7XG4gICAgY29uc3Qgb2xkeSA9IHYueTtcblxuICAgIHYueCA9IG9sZHggKiBNYXRoLmNvcyh0aGEpIC0gb2xkeSAqIE1hdGguc2luKHRoYSk7XG4gICAgdi55ID0gb2xkeCAqIE1hdGguc2luKHRoYSkgKyBvbGR5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgZ2V0R3JhZGllbnQoKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy5keSwgdGhpcy5keCk7XG4gIH1cblxuICByYW5nZU91dChwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hYnModGhpcy5nZXRHcmFkaWVudCgpKTtcblxuICAgIGlmIChhbmdsZSA8PSBNYXRoVXRpbC5QSSAvIDQpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggPD0gdGhpcy5tYXh4ICYmIHBhcnRpY2xlLnAueCA+PSB0aGlzLm1pbngpIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFydGljbGUucC55IDw9IHRoaXMubWF4eSAmJiBwYXJ0aWNsZS5wLnkgPj0gdGhpcy5taW55KSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5KTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcIj5cIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJSXCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwicmlnaHRcIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJkb3duXCIpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLmdldERpcmVjdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuXG4gICAgICBpZiAodGhpcy5nZXREaXN0YW5jZShwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkgPD0gcGFydGljbGUucmFkaXVzKSB7XG4gICAgICAgIGlmICh0aGlzLmR4ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHkgPT09IDApIHtcbiAgICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nZXRTeW1tZXRyaWMocGFydGljbGUudik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgTGluZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCByYWRpdXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgIHRoaXMuY2VudGVyID0geyB4LCB5IH07XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEl4MiAqIE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy5yYW5kb21SYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIHRoaXMucmFuZG9tUmFkaXVzICogTWF0aC5jb3ModGhpcy5hbmdsZSk7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueSArIHRoaXMucmFuZG9tUmFkaXVzICogTWF0aC5zaW4odGhpcy5hbmdsZSk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBzZXRDZW50ZXIoeCwgeSkge1xuICAgIHRoaXMuY2VudGVyLnggPSB4O1xuICAgIHRoaXMuY2VudGVyLnkgPSB5O1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBjb25zdCBkID0gcGFydGljbGUucC5kaXN0YW5jZVRvKHRoaXMuY2VudGVyKTtcblxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChkIC0gcGFydGljbGUucmFkaXVzID4gdGhpcy5yYWRpdXMpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKGQgKyBwYXJ0aWNsZS5yYWRpdXMgPj0gdGhpcy5yYWRpdXMpIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgQ2lyY2xlWm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzIG1ldGhvZCFcIik7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRTeW1tZXRyaWMocGFydGljbGUpIHtcbiAgICBjb25zdCB0aGEyID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KHBhcnRpY2xlKTtcblxuICAgIGNvbnN0IHRoYSA9IDIgKiAodGhhMSAtIHRoYTIpO1xuICAgIGNvbnN0IG9sZHggPSBwYXJ0aWNsZS52Lng7XG4gICAgY29uc3Qgb2xkeSA9IHBhcnRpY2xlLnYueTtcblxuICAgIHBhcnRpY2xlLnYueCA9IG9sZHggKiBNYXRoLmNvcyh0aGEpIC0gb2xkeSAqIE1hdGguc2luKHRoYSk7XG4gICAgcGFydGljbGUudi55ID0gb2xkeCAqIE1hdGguc2luKHRoYSkgKyBvbGR5ICogTWF0aC5jb3ModGhhKTtcbiAgfVxuXG4gIGdldEdyYWRpZW50KHBhcnRpY2xlKSB7XG4gICAgcmV0dXJuIC1NYXRoVXRpbC5QSV8yICsgTWF0aC5hdGFuMihwYXJ0aWNsZS5wLnkgLSB0aGlzLmNlbnRlci55LCBwYXJ0aWNsZS5wLnggLSB0aGlzLmNlbnRlci54KTtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0Wm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGg7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodDtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgLy8gcGFydGljbGUgZGVhZCB6b25lXG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gcGFydGljbGUgYm91bmQgem9uZVxuICAgIGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGgpIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgdGhpcy53aWR0aCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy55KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGNyb3NzIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54ICYmIHBhcnRpY2xlLnYueCA8PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGggJiYgcGFydGljbGUudi54ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55ICYmIHBhcnRpY2xlLnYueSA8PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCAmJiBwYXJ0aWNsZS52LnkgPj0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlc2V0KGltYWdlRGF0YSwgeCwgeSwgZCk7XG4gIH1cblxuICByZXNldChpbWFnZURhdGEsIHgsIHksIGQpIHtcbiAgICB0aGlzLmltYWdlRGF0YSA9IGltYWdlRGF0YTtcbiAgICB0aGlzLnggPSBVdGlsLmluaXRWYWx1ZSh4LCAwKTtcbiAgICB0aGlzLnkgPSBVdGlsLmluaXRWYWx1ZSh5LCAwKTtcbiAgICB0aGlzLmQgPSBVdGlsLmluaXRWYWx1ZShkLCAyKTtcblxuICAgIHRoaXMudmVjdG9ycyA9IFtdO1xuICAgIHRoaXMuc2V0VmVjdG9ycygpO1xuICB9XG5cbiAgc2V0VmVjdG9ycygpIHtcbiAgICBsZXQgaSwgajtcbiAgICBjb25zdCBsZW5ndGgxID0gdGhpcy5pbWFnZURhdGEud2lkdGg7XG4gICAgY29uc3QgbGVuZ3RoMiA9IHRoaXMuaW1hZ2VEYXRhLmhlaWdodDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgxOyBpICs9IHRoaXMuZCkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGxlbmd0aDI7IGogKz0gdGhpcy5kKSB7XG4gICAgICAgIGxldCBpbmRleCA9ICgoaiA+PiAwKSAqIGxlbmd0aDEgKyAoaSA+PiAwKSkgKiA0O1xuXG4gICAgICAgIGlmICh0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPiAwKSB7XG4gICAgICAgICAgdGhpcy52ZWN0b3JzLnB1c2goeyB4OiBpICsgdGhpcy54LCB5OiBqICsgdGhpcy55IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgZ2V0Qm91bmQoeCwgeSkge1xuICAgIGNvbnN0IGluZGV4ID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIGlmICh0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHZlY3RvciA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLnZlY3RvcnMpO1xuICAgIHJldHVybiB0aGlzLnZlY3Rvci5jb3B5KHZlY3Rvcik7XG4gIH1cblxuICBnZXRDb2xvcih4LCB5KSB7XG4gICAgeCAtPSB0aGlzLng7XG4gICAgeSAtPSB0aGlzLnk7XG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcblxuICAgIHJldHVybiB7XG4gICAgICByOiB0aGlzLmltYWdlRGF0YS5kYXRhW2ldLFxuICAgICAgZzogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMV0sXG4gICAgICBiOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAyXSxcbiAgICAgIGE6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDNdXG4gICAgfTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHRoaXMuZ2V0Qm91bmQocGFydGljbGUucC54IC0gdGhpcy54LCBwYXJ0aWNsZS5wLnkgLSB0aGlzLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgcGFydGljbGUuZGVhZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKCF0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUudi5uZWdhdGUoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4uL3pvbmUvQ2lyY2xlWm9uZVwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IFJlY3Rab25lIGZyb20gXCIuLi96b25lL1JlY3Rab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sIGZ1bmMpIHtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgKCkgPT4gZnVuYygpKTtcbiAgfSxcblxuICBnZXRTdHlsZShjb2xvciA9IFwiI2ZmMDAwMFwiKSB7XG4gICAgY29uc3QgcmdiID0gQ29sb3JVdGlsLmhleFRvUmdiKGNvbG9yKTtcbiAgICByZXR1cm4gYHJnYmEoJHtyZ2Iucn0sICR7cmdiLmd9LCAke3JnYi5ifSwgMC41KWA7XG4gIH0sXG5cbiAgZHJhd1pvbmUocHJvdG9uLCBjYW52YXMsIHpvbmUsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGlmICh6b25lIGluc3RhbmNlb2YgUG9pbnRab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIExpbmVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oem9uZS54MSwgem9uZS55MSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHpvbmUueDIsIHpvbmUueTIpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgUmVjdFpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmRyYXdSZWN0KHpvbmUueCwgem9uZS55LCB6b25lLndpZHRoLCB6b25lLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBDaXJjbGVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5hcmMoem9uZS54LCB6b25lLnksIHpvbmUucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZHJhd0VtaXR0ZXIocHJvdG9uLCBjYW52YXMsIGVtaXR0ZXIsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgY29udGV4dC5hcmMoZW1pdHRlci5wLngsIGVtaXR0ZXIucC55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuL2NvcmUvUGFydGljbGVcIjtcbmltcG9ydCBQb29sIGZyb20gXCIuL2NvcmUvUG9vbFwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi9tYXRoL1BvbGFyMkRcIjtcbmltcG9ydCBNYXQzIGZyb20gXCIuL21hdGgvTWF0M1wiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi9tYXRoL2Vhc2VcIjtcblxuaW1wb3J0IFJhdGUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9pbml0aWFsaXplL0luaXRpYWxpemVcIjtcbmltcG9ydCBMaWZlIGZyb20gXCIuL2luaXRpYWxpemUvTGlmZVwiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL2luaXRpYWxpemUvUG9zaXRpb25cIjtcbmltcG9ydCBWZWxvY2l0eSBmcm9tIFwiLi9pbml0aWFsaXplL1ZlbG9jaXR5XCI7XG5pbXBvcnQgTWFzcyBmcm9tIFwiLi9pbml0aWFsaXplL01hc3NcIjtcbmltcG9ydCBSYWRpdXMgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYWRpdXNcIjtcbmltcG9ydCBCb2R5IGZyb20gXCIuL2luaXRpYWxpemUvQm9keVwiO1xuXG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL2JlaGF2aW91ci9CZWhhdmlvdXJcIjtcbmltcG9ydCBGb3JjZSBmcm9tIFwiLi9iZWhhdmlvdXIvRm9yY2VcIjtcbmltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL2JlaGF2aW91ci9BdHRyYWN0aW9uXCI7XG5pbXBvcnQgUmFuZG9tRHJpZnQgZnJvbSBcIi4vYmVoYXZpb3VyL1JhbmRvbURyaWZ0XCI7XG5pbXBvcnQgR3Jhdml0eSBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVwiO1xuaW1wb3J0IENvbGxpc2lvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sbGlzaW9uXCI7XG5pbXBvcnQgQ3Jvc3Nab25lIGZyb20gXCIuL2JlaGF2aW91ci9Dcm9zc1pvbmVcIjtcbmltcG9ydCBBbHBoYSBmcm9tIFwiLi9iZWhhdmlvdXIvQWxwaGFcIjtcbmltcG9ydCBTY2FsZSBmcm9tIFwiLi9iZWhhdmlvdXIvU2NhbGVcIjtcbmltcG9ydCBSb3RhdGUgZnJvbSBcIi4vYmVoYXZpb3VyL1JvdGF0ZVwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuL2JlaGF2aW91ci9Db2xvclwiO1xuaW1wb3J0IEN5Y2xvbmUgZnJvbSBcIi4vYmVoYXZpb3VyL0N5Y2xvbmVcIjtcbmltcG9ydCBSZXB1bHNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL1JlcHVsc2lvblwiO1xuaW1wb3J0IEdyYXZpdHlXZWxsIGZyb20gXCIuL2JlaGF2aW91ci9HcmF2aXR5V2VsbFwiO1xuXG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0VtaXR0ZXJcIjtcbmltcG9ydCBCZWhhdmlvdXJFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlclwiO1xuaW1wb3J0IEZvbGxvd0VtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9Gb2xsb3dFbWl0dGVyXCI7XG5cbmltcG9ydCBDYW52YXNSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ2FudmFzUmVuZGVyZXJcIjtcbmltcG9ydCBEb21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRG9tUmVuZGVyZXJcIjtcbmltcG9ydCBFYXNlbFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9FYXNlbFJlbmRlcmVyXCI7XG5pbXBvcnQgUGl4ZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4ZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGlSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4aVJlbmRlcmVyXCI7XG5pbXBvcnQgV2ViR0xSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvV2ViR0xSZW5kZXJlclwiO1xuaW1wb3J0IEN1c3RvbVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9DdXN0b21SZW5kZXJlclwiO1xuXG5pbXBvcnQgWm9uZSBmcm9tIFwiLi96b25lL1pvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi96b25lL0xpbmVab25lXCI7XG5pbXBvcnQgQ2lyY2xlWm9uZSBmcm9tIFwiLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi96b25lL1JlY3Rab25lXCI7XG5pbXBvcnQgSW1hZ2Vab25lIGZyb20gXCIuL3pvbmUvSW1hZ2Vab25lXCI7XG5cbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi9kZWJ1Zy9EZWJ1Z1wiO1xuXG4vLyBuYW1lc3BhY2VcblByb3Rvbi5QYXJ0aWNsZSA9IFBhcnRpY2xlO1xuUHJvdG9uLlBvb2wgPSBQb29sO1xuXG5Qcm90b24uVXRpbCA9IFV0aWw7XG5Qcm90b24uQ29sb3JVdGlsID0gQ29sb3JVdGlsO1xuUHJvdG9uLk1hdGhVdGlsID0gTWF0aFV0aWw7XG5Qcm90b24uVmVjdG9yMkQgPSBQcm90b24uVmVjdG9yID0gVmVjdG9yMkQ7XG5Qcm90b24uUG9sYXIyRCA9IFByb3Rvbi5Qb2xhciA9IFBvbGFyMkQ7XG5Qcm90b24uQXJyYXlTcGFuID0gQXJyYXlTcGFuO1xuUHJvdG9uLlJlY3RhbmdsZSA9IFJlY3RhbmdsZTtcblByb3Rvbi5SYXRlID0gUmF0ZTtcblByb3Rvbi5lYXNlID0gZWFzZTtcblByb3Rvbi5TcGFuID0gU3BhbjtcblByb3Rvbi5NYXQzID0gTWF0MztcblByb3Rvbi5nZXRTcGFuID0gKGEsIGIsIGNlbnRlcikgPT4gbmV3IFNwYW4oYSwgYiwgY2VudGVyKTtcblByb3Rvbi5jcmVhdGVBcnJheVNwYW4gPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuO1xuXG5Qcm90b24uSW5pdGlhbGl6ZSA9IFByb3Rvbi5Jbml0ID0gSW5pdGlhbGl6ZTtcblByb3Rvbi5MaWZlID0gUHJvdG9uLkwgPSBMaWZlO1xuUHJvdG9uLlBvc2l0aW9uID0gUHJvdG9uLlAgPSBQb3NpdGlvbjtcblByb3Rvbi5WZWxvY2l0eSA9IFByb3Rvbi5WID0gVmVsb2NpdHk7XG5Qcm90b24uTWFzcyA9IFByb3Rvbi5NID0gTWFzcztcblByb3Rvbi5SYWRpdXMgPSBQcm90b24uUiA9IFJhZGl1cztcblByb3Rvbi5Cb2R5ID0gUHJvdG9uLkIgPSBCb2R5O1xuXG5Qcm90b24uQmVoYXZpb3VyID0gQmVoYXZpb3VyO1xuUHJvdG9uLkZvcmNlID0gUHJvdG9uLkYgPSBGb3JjZTtcblByb3Rvbi5BdHRyYWN0aW9uID0gUHJvdG9uLkEgPSBBdHRyYWN0aW9uO1xuUHJvdG9uLlJhbmRvbURyaWZ0ID0gUHJvdG9uLlJEID0gUmFuZG9tRHJpZnQ7XG5Qcm90b24uR3Jhdml0eSA9IFByb3Rvbi5HID0gR3Jhdml0eTtcblByb3Rvbi5Db2xsaXNpb24gPSBDb2xsaXNpb247XG5Qcm90b24uQ3Jvc3Nab25lID0gQ3Jvc3Nab25lO1xuUHJvdG9uLkFscGhhID0gQWxwaGE7XG5Qcm90b24uU2NhbGUgPSBQcm90b24uUyA9IFNjYWxlO1xuUHJvdG9uLlJvdGF0ZSA9IFJvdGF0ZTtcblByb3Rvbi5Db2xvciA9IENvbG9yO1xuUHJvdG9uLlJlcHVsc2lvbiA9IFJlcHVsc2lvbjtcblByb3Rvbi5DeWNsb25lID0gQ3ljbG9uZTtcblByb3Rvbi5HcmF2aXR5V2VsbCA9IEdyYXZpdHlXZWxsO1xuXG5Qcm90b24uRW1pdHRlciA9IEVtaXR0ZXI7XG5Qcm90b24uQmVoYXZpb3VyRW1pdHRlciA9IEJlaGF2aW91ckVtaXR0ZXI7XG5Qcm90b24uRm9sbG93RW1pdHRlciA9IEZvbGxvd0VtaXR0ZXI7XG5cblByb3Rvbi5ab25lID0gWm9uZTtcblByb3Rvbi5MaW5lWm9uZSA9IExpbmVab25lO1xuUHJvdG9uLkNpcmNsZVpvbmUgPSBDaXJjbGVab25lO1xuUHJvdG9uLlBvaW50Wm9uZSA9IFBvaW50Wm9uZTtcblByb3Rvbi5SZWN0Wm9uZSA9IFJlY3Rab25lO1xuUHJvdG9uLkltYWdlWm9uZSA9IEltYWdlWm9uZTtcblxuUHJvdG9uLkNhbnZhc1JlbmRlcmVyID0gQ2FudmFzUmVuZGVyZXI7XG5Qcm90b24uRG9tUmVuZGVyZXIgPSBEb21SZW5kZXJlcjtcblByb3Rvbi5FYXNlbFJlbmRlcmVyID0gRWFzZWxSZW5kZXJlcjtcblByb3Rvbi5QaXhpUmVuZGVyZXIgPSBQaXhpUmVuZGVyZXI7XG5Qcm90b24uUGl4ZWxSZW5kZXJlciA9IFBpeGVsUmVuZGVyZXI7XG5Qcm90b24uV2ViR0xSZW5kZXJlciA9IFByb3Rvbi5XZWJHbFJlbmRlcmVyID0gV2ViR0xSZW5kZXJlcjtcblByb3Rvbi5DdXN0b21SZW5kZXJlciA9IEN1c3RvbVJlbmRlcmVyO1xuXG5Qcm90b24uRGVidWcgPSBEZWJ1ZztcblV0aWwuYXNzaWduKFByb3RvbiwgZWFzZSk7XG5cbi8vIGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgUHJvdG9uO1xuIl0sIm5hbWVzIjpbImlwb3QiLCJsZW5ndGgiLCJuaHBvdCIsImkiLCJtYWtlVHJhbnNsYXRpb24iLCJ0eCIsInR5IiwibWFrZVJvdGF0aW9uIiwiYW5nbGVJblJhZGlhbnMiLCJjIiwiTWF0aCIsImNvcyIsInMiLCJzaW4iLCJtYWtlU2NhbGUiLCJzeCIsInN5IiwibWF0cml4TXVsdGlwbHkiLCJhIiwiYiIsImEwMCIsImEwMSIsImEwMiIsImExMCIsImExMSIsImExMiIsImEyMCIsImEyMSIsImEyMiIsImIwMCIsImIwMSIsImIwMiIsImIxMCIsImIxMSIsImIxMiIsImIyMCIsImIyMSIsImIyMiIsImNyZWF0ZUNhbnZhcyIsImlkIiwid2lkdGgiLCJoZWlnaHQiLCJwb3NpdGlvbiIsImRvbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwib3BhY2l0eSIsInRyYW5zZm9ybSIsImNyZWF0ZURpdiIsInJlc2l6ZSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJkaXYiLCJ4IiwieSIsInNjYWxlIiwicm90YXRlIiwid2lsbENoYW5nZSIsImNzczMiLCJ0cmFuc2Zvcm0zZCIsImtleSIsInZhbCIsImJrZXkiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImltZ3NDYWNoZSIsImNhbnZhc0NhY2hlIiwiY2FudmFzSWQiLCJnZXRJbWFnZURhdGEiLCJjb250ZXh0IiwiaW1hZ2UiLCJyZWN0IiwiZHJhd0ltYWdlIiwiaW1hZ2VkYXRhIiwiY2xlYXJSZWN0IiwiZ2V0SW1nRnJvbUNhY2hlIiwiaW1nIiwiY2FsbGJhY2siLCJwYXJhbSIsInNyYyIsIkltYWdlIiwib25sb2FkIiwiZSIsInRhcmdldCIsImdldENhbnZhc0Zyb21DYWNoZSIsIldlYkdMVXRpbCIsImNhbnZhcyIsIkRvbVV0aWwiLCJnZXRDb250ZXh0IiwiaW5pdFZhbHVlIiwidmFsdWUiLCJkZWZhdWx0cyIsInVuZGVmaW5lZCIsImlzQXJyYXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJlbXB0eUFycmF5IiwiYXJyIiwidG9BcnJheSIsInNsaWNlQXJyYXkiLCJhcnIxIiwiaW5kZXgiLCJhcnIyIiwicHVzaCIsImdldFJhbmRGcm9tQXJyYXkiLCJmbG9vciIsInJhbmRvbSIsImVtcHR5T2JqZWN0Iiwib2JqIiwiaWdub3JlIiwiaW5kZXhPZiIsImNsYXNzQXBwbHkiLCJjb25zdHJ1Y3RvciIsImFyZ3MiLCJGYWN0b3J5RnVuYyIsImJpbmQiLCJhcHBseSIsImNvbmNhdCIsIkltZ1V0aWwiLCJkZXN0cm95QWxsIiwiZGVzdHJveSIsImFzc2lnbiIsInNvdXJjZSIsImhhc093blByb3BlcnR5IiwiaWRzTWFwIiwiUHVpZCIsIl9pbmRleCIsIl9jYWNoZSIsInR5cGUiLCJnZXRJZCIsInVpZCIsImdldElkRnJvbUNhY2hlIiwiaXNCb2R5IiwiaXNJbm5lciIsImdldFRhcmdldCIsIlBvb2wiLCJudW0iLCJ0b3RhbCIsImNhY2hlIiwiZ2V0IiwicGFyYW1zIiwicCIsIl9fcHVpZCIsInBvcCIsImNyZWF0ZU9yQ2xvbmUiLCJleHBpcmUiLCJnZXRDYWNoZSIsImNyZWF0ZSIsIlV0aWwiLCJjbG9uZSIsImdldENvdW50IiwiY291bnQiLCJTdGF0cyIsInByb3RvbiIsImNvbnRhaW5lciIsImVtaXR0ZXJJbmRleCIsInJlbmRlcmVySW5kZXgiLCJ1cGRhdGUiLCJib2R5IiwiYWRkIiwiZW1pdHRlciIsImdldEVtaXR0ZXIiLCJyZW5kZXJlciIsImdldFJlbmRlcmVyIiwic3RyIiwiZW1pdHRlcnMiLCJlbWl0U3BlZWQiLCJnZXRFbWl0dGVyUG9zIiwiaW5pdGlhbGl6ZXMiLCJjb25jYXRBcnIiLCJiZWhhdmlvdXJzIiwibmFtZSIsImdldENyZWF0ZWROdW1iZXIiLCJwb29sIiwiaW5uZXJIVE1MIiwiY3NzVGV4dCIsImpvaW4iLCJhZGRFdmVudExpc3RlbmVyIiwiYmciLCJjb2xvciIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsInJlbmRlcmVycyIsInJlc3VsdCIsImNwb29sIiwicm91bmQiLCJyZW1vdmVDaGlsZCIsIkV2ZW50RGlzcGF0Y2hlciIsIl9saXN0ZW5lcnMiLCJkaXNwYXRjaEV2ZW50IiwiaGFzRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBbGxFdmVudExpc3RlbmVycyIsImxpc3RlbmVyIiwic3BsaWNlIiwibGlzdGVuZXJzIiwiaGFuZGxlciIsIlBJIiwiSU5GSU5JVFkiLCJJbmZpbml0eSIsIk1hdGhVdGlsIiwiUEl4MiIsIlBJXzIiLCJQSV8xODAiLCJOMTgwX1BJIiwiaXNJbmZpbml0eSIsInJhbmRvbUFUb0IiLCJpc0ludCIsInJhbmRvbUZsb2F0aW5nIiwiY2VudGVyIiwiZiIsInJhbmRvbUNvbG9yIiwic2xpY2UiLCJyYW5kb21ab25lIiwiZGlzcGxheSIsImsiLCJkaWdpdHMiLCJwb3ciLCJkZWdyZWVUcmFuc2Zvcm0iLCJ0b0NvbG9yMTYiLCJJbnRlZ3JhdGlvbiIsImNhbGN1bGF0ZSIsInBhcnRpY2xlcyIsInRpbWUiLCJkYW1waW5nIiwiZXVsZXJJbnRlZ3JhdGUiLCJwYXJ0aWNsZSIsInNsZWVwIiwib2xkIiwiY29weSIsInYiLCJtdWx0aXBseVNjYWxhciIsIm1hc3MiLCJjbGVhciIsIlByb3RvbiIsImludGVncmF0aW9uVHlwZSIsIm5vdyIsInRoZW4iLCJlbGFwc2VkIiwic3RhdHMiLCJFVUxFUiIsImludGVncmF0b3IiLCJfZnBzIiwiX2ludGVydmFsIiwiREVGQVVMVF9JTlRFUlZBTCIsImFkZFJlbmRlcmVyIiwicmVuZGVyIiwiaW5pdCIsInJlbW92ZVJlbmRlcmVyIiwicmVtb3ZlIiwiYWRkRW1pdHRlciIsInBhcmVudCIsIkVNSVRURVJfQURERUQiLCJyZW1vdmVFbWl0dGVyIiwiRU1JVFRFUl9SRU1PVkVEIiwiUFJPVE9OX1VQREFURSIsIlVTRV9DTE9DSyIsIkRhdGUiLCJnZXRUaW1lIiwiYW1lbmRDaGFuZ2VUYWJzQnVnIiwiZW1pdHRlcnNVcGRhdGUiLCJQUk9UT05fVVBEQVRFX0FGVEVSIiwiZ2V0QWxsUGFydGljbGVzIiwiZGVzdHJveUFsbEVtaXR0ZXJzIiwiZGVzdHJveU90aGVyIiwic2V0VGltZW91dCIsImZwcyIsIk1FQVNVUkUiLCJSSzIiLCJQQVJUSUNMRV9DUkVBVEVEIiwiUEFSVElDTEVfVVBEQVRFIiwiUEFSVElDTEVfU0xFRVAiLCJQQVJUSUNMRV9ERUFEIiwiUmdiIiwiciIsImciLCJyZXNldCIsIlNwYW4iLCJnZXRWYWx1ZSIsInNldFNwYW5WYWx1ZSIsImdldFNwYW5WYWx1ZSIsInBhbiIsImhhc1Byb3AiLCJzZXRQcm9wIiwicHJvcHMiLCJwcm9wIiwic2V0VmVjdG9yVmFsIiwiY29uZiIsImVhc2VMaW5lYXIiLCJlYXNlSW5RdWFkIiwiZWFzZU91dFF1YWQiLCJlYXNlSW5PdXRRdWFkIiwiZWFzZUluQ3ViaWMiLCJlYXNlT3V0Q3ViaWMiLCJlYXNlSW5PdXRDdWJpYyIsImVhc2VJblF1YXJ0IiwiZWFzZU91dFF1YXJ0IiwiZWFzZUluT3V0UXVhcnQiLCJlYXNlSW5TaW5lIiwiZWFzZU91dFNpbmUiLCJlYXNlSW5PdXRTaW5lIiwiZWFzZUluRXhwbyIsImVhc2VPdXRFeHBvIiwiZWFzZUluT3V0RXhwbyIsImVhc2VJbkNpcmMiLCJzcXJ0IiwiZWFzZU91dENpcmMiLCJlYXNlSW5PdXRDaXJjIiwiZWFzZUluQmFjayIsImVhc2VPdXRCYWNrIiwiZWFzZUluT3V0QmFjayIsImdldEVhc2luZyIsImVhc2UiLCJWZWN0b3IyRCIsInNldCIsInNldFgiLCJzZXRZIiwiZ2V0R3JhZGllbnQiLCJhdGFuMiIsInciLCJhZGRWZWN0b3JzIiwiYWRkWFkiLCJzdWIiLCJzdWJWZWN0b3JzIiwiZGl2aWRlU2NhbGFyIiwibmVnYXRlIiwiZG90IiwibGVuZ3RoU3EiLCJub3JtYWxpemUiLCJkaXN0YW5jZVRvIiwiZGlzdGFuY2VUb1NxdWFyZWQiLCJ0aGEiLCJkeCIsImR5IiwibGVycCIsImFscGhhIiwiZXF1YWxzIiwiUGFydGljbGUiLCJkYXRhIiwicmdiIiwiUHJvcFV0aWwiLCJnZXREaXJlY3Rpb24iLCJsaWZlIiwiYWdlIiwiZGVhZCIsInNwcml0ZSIsImVuZXJneSIsInJhZGl1cyIsInJvdGF0aW9uIiwiZWFzaW5nIiwicmVtb3ZlQWxsQmVoYXZpb3VycyIsImFwcGx5QmVoYXZpb3VycyIsIm1heCIsImFwcGx5QmVoYXZpb3VyIiwiYWRkQmVoYXZpb3VyIiwiYmVoYXZpb3VyIiwicGFyZW50cyIsImluaXRpYWxpemUiLCJhZGRCZWhhdmlvdXJzIiwicmVtb3ZlQmVoYXZpb3VyIiwiaGV4VG9SZ2IiLCJoIiwiaGV4MTYiLCJzdWJzdHJpbmciLCJwYXJzZUludCIsInJnYlRvSGV4IiwicmJnIiwiZ2V0SGV4MTZGcm9tUGFydGljbGUiLCJOdW1iZXIiLCJQb2xhcjJEIiwiYWJzIiwic2V0UiIsInNldFRoYSIsInRvVmVjdG9yIiwiZ2V0WCIsImdldFkiLCJNYXQzIiwibWF0MyIsIm1hdCIsIkZsb2F0MzJBcnJheSIsIm1hdDEiLCJtYXQyIiwibXVsdGlwbHkiLCJpbnZlcnNlIiwiZCIsIm11bHRpcGx5VmVjMiIsIm0iLCJ2ZWMiLCJBcnJheVNwYW4iLCJfYXJyIiwiY3JlYXRlQXJyYXlTcGFuIiwiUmVjdGFuZ2xlIiwiYm90dG9tIiwicmlnaHQiLCJjb250YWlucyIsIlJhdGUiLCJudW1wYW4iLCJ0aW1lcGFuIiwibnVtUGFuIiwidGltZVBhbiIsInN0YXJ0VGltZSIsIm5leHRUaW1lIiwiSW5pdGlhbGl6ZSIsIkxpZmUiLCJsaWZlUGFuIiwiWm9uZSIsInZlY3RvciIsImNyb3NzVHlwZSIsImFsZXJ0IiwiZ2V0UG9zaXRpb24iLCJjcm9zc2luZyIsIlBvaW50Wm9uZSIsImNvbnNvbGUiLCJlcnJvciIsIlBvc2l0aW9uIiwiem9uZSIsIlZlbG9jaXR5IiwicnBhbiIsInRoYXBhbiIsInJQYW4iLCJ0aGFQYW4iLCJub3JtYWxpemVWZWxvY2l0eSIsInZyIiwicG9sYXIyZCIsIk1hc3MiLCJtYXNzUGFuIiwiUmFkaXVzIiwib2xkUmFkaXVzIiwiQm9keSIsImltYWdlVGFyZ2V0IiwiaW5uZXIiLCJCZWhhdmlvdXIiLCJub3JtYWxpemVGb3JjZSIsImZvcmNlIiwibm9ybWFsaXplVmFsdWUiLCJGb3JjZSIsImZ4IiwiZnkiLCJBdHRyYWN0aW9uIiwidGFyZ2V0UG9zaXRpb24iLCJyYWRpdXNTcSIsImF0dHJhY3Rpb25Gb3JjZSIsIlJhbmRvbURyaWZ0IiwiZHJpZnRYIiwiZHJpZnRZIiwiZGVsYXkiLCJwYW5Gb2NlIiwiR3Jhdml0eSIsIkNvbGxpc2lvbiIsIm5ld1Bvb2wiLCJjb2xsaXNpb25Qb29sIiwiZGVsdGEiLCJvdGhlclBhcnRpY2xlIiwib3ZlcmxhcCIsInRvdGFsTWFzcyIsImF2ZXJhZ2VNYXNzMSIsImF2ZXJhZ2VNYXNzMiIsImRpc3RhbmNlIiwiQ3Jvc3Nab25lIiwiQWxwaGEiLCJzYW1lIiwiYWxwaGFBIiwiYWxwaGFCIiwiU2NhbGUiLCJzY2FsZUEiLCJzY2FsZUIiLCJSb3RhdGUiLCJpbmZsdWVuY2UiLCJyb3RhdGlvbkEiLCJyb3RhdGlvbkIiLCJDb2xvciIsImNvbG9yQSIsIkNvbG9yVXRpbCIsImNvbG9yQiIsIkNIQU5HSU5HIiwiQ3ljbG9uZSIsImFuZ2xlIiwic2V0QW5nbGVBbmRGb3JjZSIsInNwYW4iLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImNhbmdsZSIsImN5Y2xvbmUiLCJncmFkaWVudCIsIlJlcHVsc2lvbiIsIkdyYXZpdHlXZWxsIiwiY2VudGVyUG9pbnQiLCJkaXN0YW5jZVZlYyIsImRpc3RhbmNlU3EiLCJmYWN0b3IiLCJiaW5kRW1pdHRlciIsIkVtaXR0ZXIiLCJlbWl0VGltZSIsInRvdGFsVGltZSIsInJhdGUiLCJlbWl0Iiwic3RvcGVkIiwiaXNOYU4iLCJzdG9wIiwicHJlRW1pdCIsIm9sZFN0b3BlZCIsIm9sZEVtaXRUaW1lIiwib2xkVG90YWxUaW1lIiwic3RlcCIsInJlbW92ZUFsbFBhcnRpY2xlcyIsImFkZFNlbGZJbml0aWFsaXplIiwiYWRkSW5pdGlhbGl6ZSIsInJlc3QiLCJyZW1vdmVJbml0aWFsaXplIiwiaW5pdGlhbGl6ZXIiLCJyZW1vdmVBbGxJbml0aWFsaXplcnMiLCJhcmd1bWVudHMiLCJlbWl0dGluZyIsImludGVncmF0ZSIsImRpc3BhdGNoIiwiZXZlbnQiLCJiaW5kRXZlbnQiLCJjcmVhdGVQYXJ0aWNsZSIsInNldHVwUGFydGljbGUiLCJJbml0aWFsaXplVXRpbCIsIkJlaGF2aW91ckVtaXR0ZXIiLCJzZWxmQmVoYXZpb3VycyIsImFkZFNlbGZCZWhhdmlvdXIiLCJyZW1vdmVTZWxmQmVoYXZpb3VyIiwiRm9sbG93RW1pdHRlciIsIm1vdXNlVGFyZ2V0Iiwid2luZG93IiwiX2FsbG93RW1pdHRpbmciLCJpbml0RXZlbnRIYW5kbGVyIiwibW91c2Vtb3ZlSGFuZGxlciIsIm1vdXNlbW92ZSIsIm1vdXNlZG93bkhhbmRsZXIiLCJtb3VzZWRvd24iLCJtb3VzZXVwSGFuZGxlciIsIm1vdXNldXAiLCJsYXllclgiLCJsYXllclkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImlzSW1hZ2UiLCJfX2lzSW1hZ2UiLCJ0YWdOYW1lIiwibm9kZU5hbWUiLCJpc1N0cmluZyIsIkJhc2VSZW5kZXJlciIsImVsZW1lbnQiLCJzdHJva2UiLCJjaXJjbGVDb25mIiwiaXNDaXJjbGUiLCJzZXRTdHJva2UiLCJ0aGlua25lc3MiLCJfcHJvdG9uVXBkYXRlSGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlIiwiX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlQWZ0ZXIiLCJfZW1pdHRlckFkZGVkSGFuZGxlciIsIm9uRW1pdHRlckFkZGVkIiwiX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciIsIm9uRW1pdHRlclJlbW92ZWQiLCJfcGFydGljbGVDcmVhdGVkSGFuZGxlciIsIm9uUGFydGljbGVDcmVhdGVkIiwiX3BhcnRpY2xlVXBkYXRlSGFuZGxlciIsIm9uUGFydGljbGVVcGRhdGUiLCJfcGFydGljbGVEZWFkSGFuZGxlciIsIm9uUGFydGljbGVEZWFkIiwiQ2FudmFzUmVuZGVyZXIiLCJidWZmZXJDYWNoZSIsImFkZEltZzJCb2R5IiwiVHlwZXMiLCJkcmF3Q2lyY2xlIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYnVmQ29udGV4dCIsImdsb2JhbEFscGhhIiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzYXZlIiwidHJhbnNsYXRlIiwicmVzdG9yZSIsImJlZ2luUGF0aCIsImFyYyIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwiY2xvc2VQYXRoIiwiZmlsbCIsInNpemUiLCJEb21SZW5kZXJlciIsImNyZWF0ZUJvZHkiLCJib2R5UmVhZHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjcmVhdGVDaXJjbGUiLCJjcmVhdGVTcHJpdGUiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwidXJsIiwiYmFja2dyb3VuZEltYWdlIiwiRWFzZWxSZW5kZXJlciIsImFkZENoaWxkIiwic2NhbGVYIiwic2NhbGVZIiwiZ3JhcGhpY3MiLCJyZWdYIiwicmVnWSIsImNyZWF0ZWpzIiwiR3JhcGhpY3MiLCJiZWdpblN0cm9rZSIsImJlZ2luRmlsbCIsInNoYXBlIiwiU2hhcGUiLCJQaXhlbFJlbmRlcmVyIiwicmVjdGFuZ2xlIiwiaW1hZ2VEYXRhIiwiY3JlYXRlSW1hZ2VEYXRhIiwicHV0SW1hZ2VEYXRhIiwic2V0UGl4ZWwiLCJQSVhJQ2xhc3MiLCJQaXhpUmVuZGVyZXIiLCJzZXRDb2xvciIsImJsZW5kTW9kZSIsInNldFBJWEkiLCJQSVhJIiwiU3ByaXRlIiwiY3JlYXRlRnJvbUltYWdlIiwiZnJvbSIsImZyb21JbWFnZSIsInRpbnQiLCJhbmNob3IiLCJlbmRGaWxsIiwiTVN0YWNrIiwibWF0cyIsInRvcCIsIldlYkdMUmVuZGVyZXIiLCJnbCIsImFudGlhbGlhcyIsInN0ZW5jaWwiLCJkZXB0aCIsImluaXRWYXIiLCJzZXRNYXhSYWRpdXMiLCJpbml0U2hhZGVycyIsImluaXRCdWZmZXJzIiwiYmxlbmRFcXVhdGlvbiIsIkZVTkNfQUREIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FX01JTlVTX1NSQ19BTFBIQSIsImVuYWJsZSIsIkJMRU5EIiwidW1hdCIsInNtYXQiLCJtc3RhY2siLCJ2aWV3cG9ydCIsImNpcmNsZUNhbnZhc1VSTCIsImdldFZlcnRleFNoYWRlciIsInZzU291cmNlIiwiZ2V0RnJhZ21lbnRTaGFkZXIiLCJmc1NvdXJjZSIsInRleHR1cmVidWZmZXJzIiwiQSIsIkIiLCJnZXRTaGFkZXIiLCJmcyIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwiZnJhZ21lbnRTaGFkZXIiLCJ2ZXJ0ZXhTaGFkZXIiLCJzcHJvZ3JhbSIsImNyZWF0ZVByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsInVzZVByb2dyYW0iLCJ2cGEiLCJnZXRBdHRyaWJMb2NhdGlvbiIsInRjYSIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidE1hdFVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJzYW1wbGVyVW5pZm9ybSIsInVzZVRleCIsInVuaWZvcm0xaSIsInZzIiwiaWR4IiwidW5pdElCdWZmZXIiLCJiaW5kQnVmZmVyIiwiRUxFTUVOVF9BUlJBWV9CVUZGRVIiLCJidWZmZXJEYXRhIiwiVWludDE2QXJyYXkiLCJTVEFUSUNfRFJBVyIsImlkcyIsInVuaXRJMzMiLCJzdHJpcEJ1ZmZlciIsInJhaWR1cyIsImNpcmNsZUNhbnZhc1JhZGl1cyIsInRvRGF0YVVSTCIsImRyYXdJbWcyQ2FudmFzIiwiX3ciLCJfaCIsIl93aWR0aCIsIl9oZWlnaHQiLCJfc2NhbGVYIiwiX3NjYWxlWSIsImNyZWF0ZVRleHR1cmUiLCJ0ZXh0dXJlIiwidmNCdWZmZXIiLCJ0Y0J1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJpbmRUZXh0dXJlIiwiVEVYVFVSRV8yRCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsInRleFBhcmFtZXRlcmkiLCJURVhUVVJFX01BR19GSUxURVIiLCJMSU5FQVIiLCJURVhUVVJFX01JTl9GSUxURVIiLCJMSU5FQVJfTUlQTUFQX05FQVJFU1QiLCJnZW5lcmF0ZU1pcG1hcCIsInRleHR1cmVMb2FkZWQiLCJ0ZXh0dXJlV2lkdGgiLCJ0ZXh0dXJlSGVpZ2h0IiwidG1hdCIsImltYXQiLCJvbGRTY2FsZSIsInVwZGF0ZU1hdHJpeCIsInVuaWZvcm0zZiIsInVuaWZvcm1NYXRyaXgzZnYiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsIm1vdmVPcmlnaW5NYXRyaXgiLCJ0cmFuc2xhdGlvbk1hdHJpeCIsImFuZ2VsIiwicm90YXRpb25NYXRyaXgiLCJzY2FsZU1hdHJpeCIsIm1hdHJpeCIsIkN1c3RvbVJlbmRlcmVyIiwiTGluZVpvbmUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsImRpcmVjdGlvbiIsIm1pbngiLCJtaW4iLCJtaW55IiwibWF4eCIsIm1heHkiLCJ4eHl5IiwiZ2V0TGVuZ3RoIiwiQyIsIkQiLCJnZXREaXN0YW5jZSIsImdldFN5bW1ldHJpYyIsInRoYTIiLCJ0aGExIiwib2xkeCIsIm9sZHkiLCJyYW5nZU91dCIsIkNpcmNsZVpvbmUiLCJyYW5kb21SYWRpdXMiLCJzZXRDZW50ZXIiLCJSZWN0Wm9uZSIsIkltYWdlWm9uZSIsInZlY3RvcnMiLCJzZXRWZWN0b3JzIiwiaiIsImxlbmd0aDEiLCJsZW5ndGgyIiwiZ2V0Qm91bmQiLCJnZXRDb2xvciIsImZ1bmMiLCJnZXRTdHlsZSIsImRyYXdab25lIiwibW92ZVRvIiwibGluZVRvIiwiZHJhd1JlY3QiLCJkcmF3RW1pdHRlciIsIlZlY3RvciIsIlBvbGFyIiwiZ2V0U3BhbiIsIkluaXQiLCJMIiwiUCIsIlYiLCJNIiwiUiIsIkYiLCJSRCIsIkciLCJTIiwiV2ViR2xSZW5kZXJlciIsIkRlYnVnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWU7RUFDYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VBLEVBQUFBLElBWmEsZ0JBWVJDLE1BWlEsRUFZQTtFQUNYLFdBQU8sQ0FBQ0EsTUFBTSxHQUFJQSxNQUFNLEdBQUcsQ0FBcEIsTUFBNEIsQ0FBbkM7RUFDRCxHQWRZOztFQWdCYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLEtBM0JhLGlCQTJCUEQsTUEzQk8sRUEyQkM7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
