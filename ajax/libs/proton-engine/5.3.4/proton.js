(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Proton = factory());
})(this, (function () { 'use strict';

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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
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
      this.p = null;
      this.v = null;
      this.a = null;
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

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy91dGlscy9Qcm9wVXRpbC5qcyIsIi4uL3NyYy9tYXRoL2Vhc2UuanMiLCIuLi9zcmMvbWF0aC9WZWN0b3IyRC5qcyIsIi4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIiwiLi4vc3JjL3V0aWxzL0NvbG9yVXRpbC5qcyIsIi4uL3NyYy9tYXRoL1BvbGFyMkQuanMiLCIuLi9zcmMvbWF0aC9NYXQzLmpzIiwiLi4vc3JjL21hdGgvU3Bhbi5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIGdldFJhbmRGcm9tQXJyYXkoYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihhcnIubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZW1wdHlPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbnkgb2JqZWN0XG4gICAqL1xuICBlbXB0eU9iamVjdChvYmosIGlnbm9yZSA9IG51bGwpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKGtleSkgPiAtMSkgY29udGludWU7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzIGFuZCBiaW5kcyB0aGUgZ2l2ZW4gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGNsYXNzQXBwbHlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQSBjbGFzcyB0byBtYWtlIGFuIGluc3RhbmNlIGZyb21cbiAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIEFueSBhcnJheSB0byBiaW5kIGl0IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBpbnN0YW5jZSBvZiBjb25zdHJ1Y3Rvciwgb3B0aW9uYWxseSBiaW5kIHdpdGggYXJnc1xuICAgKi9cbiAgY2xhc3NBcHBseShjb25zdHJ1Y3RvciwgYXJncyA9IG51bGwpIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgRmFjdG9yeUZ1bmMgPSBjb25zdHJ1Y3Rvci5iaW5kLmFwcGx5KGNvbnN0cnVjdG9yLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgRmFjdG9yeUZ1bmMoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIHJldHVybiBJbWdVdGlsLmdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCk7XG4gIH0sXG5cbiAgZGVzdHJveUFsbChhcnIsIHBhcmFtID0gbnVsbCkge1xuICAgIGxldCBpID0gYXJyLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycltpXS5kZXN0cm95KHBhcmFtKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGRlbGV0ZSBhcnJbaV07XG4gICAgfVxuXG4gICAgYXJyLmxlbmd0aCA9IDA7XG4gIH0sXG5cbiAgYXNzaWduKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBpZHNNYXAgPSB7fTtcblxuY29uc3QgUHVpZCA9IHtcbiAgX2luZGV4OiAwLFxuICBfY2FjaGU6IHt9LFxuXG4gIGlkKHR5cGUpIHtcbiAgICBpZiAoaWRzTWFwW3R5cGVdID09PSB1bmRlZmluZWQgfHwgaWRzTWFwW3R5cGVdID09PSBudWxsKSBpZHNNYXBbdHlwZV0gPSAwO1xuICAgIHJldHVybiBgJHt0eXBlfV8ke2lkc01hcFt0eXBlXSsrfWA7XG4gIH0sXG5cbiAgZ2V0SWQodGFyZ2V0KSB7XG4gICAgbGV0IHVpZCA9IHRoaXMuZ2V0SWRGcm9tQ2FjaGUodGFyZ2V0KTtcbiAgICBpZiAodWlkKSByZXR1cm4gdWlkO1xuXG4gICAgdWlkID0gYFBVSURfJHt0aGlzLl9pbmRleCsrfWA7XG4gICAgdGhpcy5fY2FjaGVbdWlkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdWlkO1xuICB9LFxuXG4gIGdldElkRnJvbUNhY2hlKHRhcmdldCkge1xuICAgIGxldCBvYmosIGlkO1xuXG4gICAgZm9yIChpZCBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgb2JqID0gdGhpcy5fY2FjaGVbaWRdO1xuXG4gICAgICBpZiAob2JqID09PSB0YXJnZXQpIHJldHVybiBpZDtcbiAgICAgIGlmICh0aGlzLmlzQm9keShvYmosIHRhcmdldCkgJiYgb2JqLnNyYyA9PT0gdGFyZ2V0LnNyYykgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGlzQm9keShvYmosIHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgb2JqLmlzSW5uZXIgJiYgdGFyZ2V0LmlzSW5uZXI7XG4gIH0sXG5cbiAgZ2V0VGFyZ2V0KHVpZCkge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZVt1aWRdO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWlkO1xuIiwiLyoqXG4gKiBQb29sIGlzIHRoZSBjYWNoZSBwb29sIG9mIHRoZSBwcm90b24gZW5naW5lLCBpdCBpcyB2ZXJ5IGltcG9ydGFudC5cbiAqXG4gKiBnZXQodGFyZ2V0LCBwYXJhbXMsIHVpZClcbiAqICBDbGFzc1xuICogICAgdWlkID0gUHVpZC5nZXRJZCAtPiBQdWlkIHNhdmUgdGFyZ2V0IGNhY2hlXG4gKiAgICB0YXJnZXQuX19wdWlkID0gdWlkXG4gKlxuICogIGJvZHlcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICpcbiAqXG4gKiBleHBpcmUodGFyZ2V0KVxuICogIGNhY2hlW3RhcmdldC5fX3B1aWRdIHB1c2ggdGFyZ2V0XG4gKlxuICovXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUG9vbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIG9mIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvdGFsXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjYWNoZVxuICAgKi9cbiAgY29uc3RydWN0b3IobnVtKSB7XG4gICAgdGhpcy50b3RhbCA9IDA7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpIHtcbiAgICBsZXQgcDtcbiAgICB1aWQgPSB1aWQgfHwgdGFyZ2V0Ll9fcHVpZCB8fCBQdWlkLmdldElkKHRhcmdldCk7XG5cbiAgICBpZiAodGhpcy5jYWNoZVt1aWRdICYmIHRoaXMuY2FjaGVbdWlkXS5sZW5ndGggPiAwKSB7XG4gICAgICBwID0gdGhpcy5jYWNoZVt1aWRdLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0gdGhpcy5jcmVhdGVPckNsb25lKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBwLl9fcHVpZCA9IHRhcmdldC5fX3B1aWQgfHwgdWlkO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZXhwaXJlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlKHRhcmdldC5fX3B1aWQpLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNsYXNzIGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb25cbiAgICpcbiAgICogQG1ldGhvZCBjcmVhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0IGFueSBPYmplY3Qgb3IgRnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcykge1xuICAgIHRoaXMudG90YWwrKztcblxuICAgIGlmICh0aGlzLmNyZWF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIFV0aWwuY2xhc3NBcHBseSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIC0gd2hhdCBpcyBpbiB0aGUgY2FjaGU/XG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGlkIGluIHRoaXMuY2FjaGUpIGNvdW50ICs9IHRoaXMuY2FjaGVbaWRdLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgYWxsIGl0ZW1zIGZyb20gUG9vbC5jYWNoZVxuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlW2lkXS5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbaWRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDYWNoZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB1aWQgdGhlIHVuaXF1ZSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXRDYWNoZSh1aWQgPSBcImRlZmF1bHRcIikge1xuICAgIGlmICghdGhpcy5jYWNoZVt1aWRdKSB0aGlzLmNhY2hlW3VpZF0gPSBbXTtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVt1aWRdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyB7XG4gIGNvbnN0cnVjdG9yKHByb3Rvbikge1xuICAgIHRoaXMucHJvdG9uID0gcHJvdG9uO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnR5cGUgPSAxO1xuXG4gICAgdGhpcy5lbWl0dGVySW5kZXggPSAwO1xuICAgIHRoaXMucmVuZGVyZXJJbmRleCA9IDA7XG4gIH1cblxuICB1cGRhdGUoc3R5bGUsIGJvZHkpIHtcbiAgICB0aGlzLmFkZChzdHlsZSwgYm9keSk7XG5cbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5nZXRFbWl0dGVyKCk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKCk7XG4gICAgbGV0IHN0ciA9IFwiXCI7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHIgKz0gXCJlbWl0dGVyOlwiICsgdGhpcy5wcm90b24uZW1pdHRlcnMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJlbSBzcGVlZDpcIiArIGVtaXR0ZXIuZW1pdFNwZWVkICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJwb3M6XCIgKyB0aGlzLmdldEVtaXR0ZXJQb3MoZW1pdHRlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJpbml0aWFsaXplczpcIiArIGVtaXR0ZXIuaW5pdGlhbGl6ZXMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKVxuICAgICAgICAgIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5pbml0aWFsaXplcykgKyBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJiZWhhdmlvdXJzOlwiICsgZW1pdHRlci5iZWhhdmlvdXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9ICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPicgKyB0aGlzLmNvbmNhdEFycihlbWl0dGVyLmJlaGF2aW91cnMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSByZW5kZXJlci5uYW1lICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChyZW5kZXJlcikgc3RyICs9IFwiYm9keTpcIiArIHRoaXMuZ2V0Q3JlYXRlZE51bWJlcihyZW5kZXJlcikgKyBcIjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN0ciArPSBcInBhcnRpY2xlczpcIiArIHRoaXMucHJvdG9uLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwicG9vbDpcIiArIHRoaXMucHJvdG9uLnBvb2wuZ2V0Q291bnQoKSArIFwiPGJyPlwiO1xuICAgICAgICBzdHIgKz0gXCJ0b3RhbDpcIiArIHRoaXMucHJvdG9uLnBvb2wudG90YWw7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gc3RyO1xuICB9XG5cbiAgYWRkKHN0eWxlLCBib2R5KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy50eXBlID0gMTtcblxuICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MHB4O2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtcIixcbiAgICAgICAgXCJvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwO3BhZGRpbmc6MTBweDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcIixcbiAgICAgICAgXCJ3aWR0aDoxMjBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDI7Y29sb3I6IzBmZjtcIlxuICAgICAgXS5qb2luKFwiXCIpO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHRoaXMudHlwZSsrO1xuICAgICAgICAgIGlmICh0aGlzLnR5cGUgPiA0KSB0aGlzLnR5cGUgPSAxO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcblxuICAgICAgbGV0IGJnLCBjb2xvcjtcbiAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGJnID0gXCIjMjAxXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiNmMDhcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgYmcgPSBcIiMwMjBcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmMFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYmcgPSBcIiMwMDJcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmZlwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBiZztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlW1wiY29sb3JcIl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGJvZHkgPSBib2R5IHx8IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW1pdHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm90b24uZW1pdHRlcnNbdGhpcy5lbWl0dGVySW5kZXhdO1xuICB9XG5cbiAgZ2V0UmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLnJlbmRlcmVyc1t0aGlzLnJlbmRlcmVySW5kZXhdO1xuICB9XG5cbiAgY29uY2F0QXJyKGFycikge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGlmICghYXJyIHx8ICFhcnIubGVuZ3RoKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSAoYXJyW2ldLm5hbWUgfHwgXCJcIikuc3Vic3RyKDAsIDEpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpIHtcbiAgICByZXR1cm4gcmVuZGVyZXIucG9vbC50b3RhbCB8fCAocmVuZGVyZXIuY3Bvb2wgJiYgcmVuZGVyZXIuY3Bvb2wudG90YWwpIHx8IDA7XG4gIH1cblxuICBnZXRFbWl0dGVyUG9zKGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChlLnAueCkgKyBcIixcIiArIE1hdGgucm91bmQoZS5wLnkpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSkge1xuICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgdGhpcy5wcm90b24gPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgfVxufVxuIiwiLypcbiAqIEV2ZW50RGlzcGF0Y2hlclxuICogVGhpcyBjb2RlIHJlZmVyZW5jZSBzaW5jZSBodHRwOi8vY3JlYXRlanMuY29tLy5cbiAqXG4gKiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgYmluZCh0YXJnZXQpIHtcbiAgICB0YXJnZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVBbGxFdmVudExpc3RlbmVycyA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnM7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgcmV0dXJuO1xuXG4gICAgY29uc3QgYXJyID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgIGNvbnN0IGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsbG93cyBmb3IgZmFzdGVyIGNoZWNrcy5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKHR5cGUpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgZWxzZSBpZiAodGhpcy5fbGlzdGVuZXJzKSBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudCh0eXBlLCBhcmdzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcblxuICAgIGlmICh0eXBlICYmIGxpc3RlbmVycykge1xuICAgICAgbGV0IGFyciA9IGxpc3RlbmVyc1t0eXBlXTtcbiAgICAgIGlmICghYXJyKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAvLyBhcnIgPSBhcnIuc2xpY2UoKTtcbiAgICAgIC8vIHRvIGF2b2lkIGlzc3VlcyB3aXRoIGl0ZW1zIGJlaW5nIHJlbW92ZWQgb3IgYWRkZWQgZHVyaW5nIHRoZSBkaXNwYXRjaFxuXG4gICAgICBsZXQgaGFuZGxlcjtcbiAgICAgIGxldCBpID0gYXJyLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaGFuZGxlciA9IGFycltpXTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IGhhbmRsZXIoYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICEhcmVzdWx0O1xuICB9XG5cbiAgaGFzRXZlbnRMaXN0ZW5lcih0eXBlKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuICAgIHJldHVybiAhIShsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzW3R5cGVdKTtcbiAgfVxufVxuIiwiY29uc3QgUEkgPSAzLjE0MTU5MjY7XG5jb25zdCBJTkZJTklUWSA9IEluZmluaXR5O1xuXG5jb25zdCBNYXRoVXRpbCA9IHtcbiAgUEk6IFBJLFxuICBQSXgyOiBQSSAqIDIsXG4gIFBJXzI6IFBJIC8gMixcbiAgUElfMTgwOiBQSSAvIDE4MCxcbiAgTjE4MF9QSTogMTgwIC8gUEksXG4gIEluZmluaXR5OiAtOTk5LFxuXG4gIGlzSW5maW5pdHkobnVtKSB7XG4gICAgcmV0dXJuIG51bSA9PT0gdGhpcy5JbmZpbml0eSB8fCBudW0gPT09IElORklOSVRZO1xuICB9LFxuXG4gIHJhbmRvbUFUb0IoYSwgYiwgaXNJbnQgPSBmYWxzZSkge1xuICAgIGlmICghaXNJbnQpIHJldHVybiBhICsgTWF0aC5yYW5kb20oKSAqIChiIC0gYSk7XG4gICAgZWxzZSByZXR1cm4gKChNYXRoLnJhbmRvbSgpICogKGIgLSBhKSkgPj4gMCkgKyBhO1xuICB9LFxuXG4gIHJhbmRvbUZsb2F0aW5nKGNlbnRlciwgZiwgaXNJbnQpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5kb21BVG9CKGNlbnRlciAtIGYsIGNlbnRlciArIGYsIGlzSW50KTtcbiAgfSxcblxuICByYW5kb21Db2xvcigpIHtcbiAgICByZXR1cm4gXCIjXCIgKyAoXCIwMDAwMFwiICsgKChNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwKSA8PCAwKS50b1N0cmluZygxNikpLnNsaWNlKC02KTtcbiAgfSxcblxuICByYW5kb21ab25lKGRpc3BsYXkpIHt9LFxuXG4gIGZsb29yKG51bSwgayA9IDQpIHtcbiAgICBjb25zdCBkaWdpdHMgPSBNYXRoLnBvdygxMCwgayk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogZGlnaXRzKSAvIGRpZ2l0cztcbiAgfSxcblxuICBkZWdyZWVUcmFuc2Zvcm0oYSkge1xuICAgIHJldHVybiAoYSAqIFBJKSAvIDE4MDtcbiAgfSxcblxuICB0b0NvbG9yMTYobnVtKSB7XG4gICAgcmV0dXJuIGAjJHtudW0udG9TdHJpbmcoMTYpfWA7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGhVdGlsO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdyYXRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICB0aGlzLmV1bGVySW50ZWdyYXRlKHBhcnRpY2xlcywgdGltZSwgZGFtcGluZyk7XG4gIH1cblxuICAvLyBFdWxlciBJbnRlZ3JhdGVcbiAgLy8gaHR0cHM6Ly9yb3NldHRhY29kZS5vcmcvd2lraS9FdWxlcl9tZXRob2RcbiAgZXVsZXJJbnRlZ3JhdGUocGFydGljbGUsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICBpZiAoIXBhcnRpY2xlLnNsZWVwKSB7XG4gICAgICBwYXJ0aWNsZS5vbGQucC5jb3B5KHBhcnRpY2xlLnApO1xuICAgICAgcGFydGljbGUub2xkLnYuY29weShwYXJ0aWNsZS52KTtcblxuICAgICAgcGFydGljbGUuYS5tdWx0aXBseVNjYWxhcigxIC8gcGFydGljbGUubWFzcyk7XG4gICAgICBwYXJ0aWNsZS52LmFkZChwYXJ0aWNsZS5hLm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcbiAgICAgIHBhcnRpY2xlLnAuYWRkKHBhcnRpY2xlLm9sZC52Lm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcblxuICAgICAgaWYgKGRhbXBpbmcpIHBhcnRpY2xlLnYubXVsdGlwbHlTY2FsYXIoZGFtcGluZyk7XG5cbiAgICAgIHBhcnRpY2xlLmEuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb29sIGZyb20gXCIuL1Bvb2xcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3RhdHMgZnJvbSBcIi4uL2RlYnVnL1N0YXRzXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBJbnRlZ3JhdGlvbiBmcm9tIFwiLi4vbWF0aC9JbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm90b24ge1xuICBzdGF0aWMgVVNFX0NMT0NLID0gZmFsc2U7XG5cbiAgLy8gbWVhc3VyZSAxOjEwMFxuICBzdGF0aWMgTUVBU1VSRSA9IDEwMDtcbiAgc3RhdGljIEVVTEVSID0gXCJldWxlclwiO1xuICBzdGF0aWMgUksyID0gXCJydW5nZS1rdXR0YTJcIjtcblxuICAvLyBldmVudCBuYW1lXG4gIHN0YXRpYyBQQVJUSUNMRV9DUkVBVEVEID0gXCJQQVJUSUNMRV9DUkVBVEVEXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9VUERBVEUgPSBcIlBBUlRJQ0xFX1VQREFURVwiO1xuICBzdGF0aWMgUEFSVElDTEVfU0xFRVAgPSBcIlBBUlRJQ0xFX1NMRUVQXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9ERUFEID0gXCJQQVJUSUNMRV9ERUFEXCI7XG5cbiAgc3RhdGljIEVNSVRURVJfQURERUQgPSBcIkVNSVRURVJfQURERURcIjtcbiAgc3RhdGljIEVNSVRURVJfUkVNT1ZFRCA9IFwiRU1JVFRFUl9SRU1PVkVEXCI7XG5cbiAgc3RhdGljIFBST1RPTl9VUERBVEUgPSBcIlBST1RPTl9VUERBVEVcIjtcbiAgc3RhdGljIFBST1RPTl9VUERBVEVfQUZURVIgPSBcIlBST1RPTl9VUERBVEVfQUZURVJcIjtcbiAgc3RhdGljIERFRkFVTFRfSU5URVJWQUwgPSAwLjAxNjc7XG5cbiAgc3RhdGljIGFtZW5kQ2hhbmdlVGFic0J1ZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciB0byBhZGQgZW1pdHRlcnNcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yIFByb3RvblxuICAgKlxuICAgKiBAdG9kbyBwcm9QYXJ0aWNsZUNvdW50IGlzIG5vdCBpbiB1c2VcbiAgICogQHRvZG8gYWRkIG1vcmUgZG9jdW1lbnRhdGlvbiBvZiB0aGUgc2luZ2xlIHByb3BlcnRpZXMgYW5kIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwcm9QYXJ0aWNsZUNvdW50XSBub3QgaW4gdXNlP1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbaW50ZWdyYXRpb25UeXBlPVByb3Rvbi5FVUxFUl1cbiAgICogQHByb3BlcnR5IHtBcnJheX0gZW1pdHRlcnMgICBBbGwgYWRkZWQgZW1pdHRlclxuICAgKiBAcHJvcGVydHkge0FycmF5fSByZW5kZXJlcnMgIEFsbCBhZGRlZCByZW5kZXJlclxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSAgICAgIFRoZSBhY3RpdmUgdGltZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gb2xkdGltZSAgIFRoZSBvbGQgdGltZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW50ZWdyYXRpb25UeXBlKSB7XG4gICAgdGhpcy5lbWl0dGVycyA9IFtdO1xuICAgIHRoaXMucmVuZGVyZXJzID0gW107XG5cbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMubm93ID0gMDtcbiAgICB0aGlzLnRoZW4gPSAwO1xuICAgIHRoaXMuZWxhcHNlZCA9IDA7XG5cbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKHRoaXMpO1xuICAgIHRoaXMucG9vbCA9IG5ldyBQb29sKDgwKTtcblxuICAgIHRoaXMuaW50ZWdyYXRpb25UeXBlID0gVXRpbC5pbml0VmFsdWUoaW50ZWdyYXRpb25UeXBlLCBQcm90b24uRVVMRVIpO1xuICAgIHRoaXMuaW50ZWdyYXRvciA9IG5ldyBJbnRlZ3JhdGlvbih0aGlzLmludGVncmF0aW9uVHlwZSk7XG5cbiAgICB0aGlzLl9mcHMgPSBcImF1dG9cIjtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMO1xuICB9XG5cbiAgc2V0IGZwcyhmcHMpIHtcbiAgICB0aGlzLl9mcHMgPSBmcHM7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBmcHMgPT09IFwiYXV0b1wiID8gUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwgOiBNYXRoVXRpbC5mbG9vcigxIC8gZnBzLCA3KTtcbiAgfVxuXG4gIGdldCBmcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICBhZGRSZW5kZXJlcihyZW5kZXIpIHtcbiAgICByZW5kZXIuaW5pdCh0aGlzKTtcbiAgICB0aGlzLnJlbmRlcmVycy5wdXNoKHJlbmRlcik7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgcmVtb3ZlUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJlbmRlcmVycy5pbmRleE9mKHJlbmRlcik7XG4gICAgdGhpcy5yZW5kZXJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZW5kZXIucmVtb3ZlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZEVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICBhZGRFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICB0aGlzLmVtaXR0ZXJzLnB1c2goZW1pdHRlcik7XG4gICAgZW1pdHRlci5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX0FEREVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCByZW1vdmVFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIHJlbW92ZUVtaXR0ZXIoZW1pdHRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpO1xuICAgIHRoaXMuZW1pdHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfUkVNT1ZFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgYWRkZWQgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICAvLyAnYXV0bycgaXMgdGhlIGRlZmF1bHQgYnJvd3NlciByZWZyZXNoIHJhdGUsIHRoZSB2YXN0IG1ham9yaXR5IGlzIDYwZnBzXG4gICAgaWYgKHRoaXMuX2ZwcyA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG5cbiAgICAgIGlmIChQcm90b24uVVNFX0NMT0NLKSB7XG4gICAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuICAgICAgICAvLyBGaXggYnVncyBzdWNoIGFzIGNocm9tZSBicm93c2VyIHN3aXRjaGluZyB0YWJzIGNhdXNpbmcgZXhjZXNzaXZlIHRpbWUgZGlmZmVyZW5jZVxuICAgICAgICB0aGlzLmFtZW5kQ2hhbmdlVGFic0J1ZygpO1xuXG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwKSB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuZWxhcHNlZCk7XG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZShQcm90b24uREVGQVVMVF9JTlRFUlZBTCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZwcyBmcmFtZSByYXRlIGlzIHNldFxuICAgIGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcblxuICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTc2NDAxOC9jb250cm9sbGluZy1mcHMtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWVcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3cgLSAodGhpcy5lbGFwc2VkICUgdGhpcy5faW50ZXJ2YWwpICogMTAwMDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbWl0dGVyc1VwZGF0ZShlbGFwc2VkKSB7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLmVtaXR0ZXJzW2ldLnVwZGF0ZShlbGFwc2VkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBhbWVuZENoYW5nZVRhYnNCdWdcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGFtZW5kQ2hhbmdlVGFic0J1ZygpIHtcbiAgICBpZiAoIVByb3Rvbi5hbWVuZENoYW5nZVRhYnNCdWcpIHJldHVybjtcbiAgICBpZiAodGhpcy5lbGFwc2VkID4gMC41KSB7XG4gICAgICB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvdW50cyBhbGwgcGFydGljbGVzIGZyb20gYWxsIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGdldENvdW50KCkge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHRvdGFsICs9IHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzLmxlbmd0aDtcbiAgICByZXR1cm4gdG90YWw7XG4gIH1cblxuICBnZXRBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IHBhcnRpY2xlcyA9IFtdO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSBwYXJ0aWNsZXMgPSBwYXJ0aWNsZXMuY29uY2F0KHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzKTtcbiAgICByZXR1cm4gcGFydGljbGVzO1xuICB9XG5cbiAgZGVzdHJveUFsbEVtaXR0ZXJzKCkge1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhpcyBQcm90b24gaW5zdGFuY2UuIFRoaXMgaW5jbHVkZXMgYWxsIGVtaXR0ZXJzLCBhbmQgYWxsIHByb3BlcnRpZXNcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBkZXN0cm95KHJlbW92ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGVzdHJveU90aGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgIHRoaXMudGhlbiA9IDA7XG4gICAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgICAgdGhpcy5zdGF0cy5kZXN0cm95KCk7XG5cbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnJlbmRlcmVycywgdGhpcy5nZXRBbGxQYXJ0aWNsZXMoKSk7XG5cbiAgICAgIHRoaXMuaW50ZWdyYXRvciA9IG51bGw7XG4gICAgICB0aGlzLnJlbmRlcmVycyA9IG51bGw7XG4gICAgICB0aGlzLmVtaXR0ZXJzID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhdHMgPSBudWxsO1xuICAgICAgdGhpcy5wb29sID0gbnVsbDtcbiAgICB9O1xuXG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAgc2V0VGltZW91dChkZXN0cm95T3RoZXIsIDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3lPdGhlcigpO1xuICAgIH1cbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChQcm90b24pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmdiIHtcbiAgY29uc3RydWN0b3IociA9IDI1NSwgZyA9IDI1NSwgYiA9IDI1NSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy5nID0gZztcbiAgICB0aGlzLmIgPSBiO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5yID0gMjU1O1xuICAgIHRoaXMuZyA9IDI1NTtcbiAgICB0aGlzLmIgPSAyNTU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgaGFzUHJvcCh0YXJnZXQsIGtleSkge1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHByb3RvdHlwZSBpbiBhIGdpdmVuIHByb3RvdHlwZU9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0UHJvcFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIHRyYW5zbGF0ZSBkZXNyaXB0aW9uIGZyb20gY2hpbmVzZSB0byBlbmdsaXNoXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZU9iamVjdCBBbiBvYmplY3Qgb2Ygc2luZ2xlIHByb3RvdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSB0YXJnZXRcbiAgICovXG4gIHNldFByb3AodGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gU3Bhbi5nZXRTcGFuVmFsdWUocHJvcHNbcHJvcF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRWZWN0b3JWYWxcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGBjb25mYFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZcbiAgICovXG4gIHNldFZlY3RvclZhbChwYXJ0aWNsZSwgY29uZiA9IG51bGwpIHtcbiAgICBpZiAoIWNvbmYpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ4XCIpKSBwYXJ0aWNsZS5wLnggPSBjb25mW1wieFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieVwiKSkgcGFydGljbGUucC55ID0gY29uZltcInlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnhcIikpIHBhcnRpY2xlLnYueCA9IGNvbmZbXCJ2eFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnlcIikpIHBhcnRpY2xlLnYueSA9IGNvbmZbXCJ2eVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheFwiKSkgcGFydGljbGUuYS54ID0gY29uZltcImF4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheVwiKSkgcGFydGljbGUuYS55ID0gY29uZltcImF5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBcIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicFwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widlwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYVwiXSk7XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicG9zaXRpb25cIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicG9zaXRpb25cIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2ZWxvY2l0eVwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2ZWxvY2l0eVwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFjY2VsZXJhdGVcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYWNjZWxlcmF0ZVwiXSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBlYXNlTGluZWFyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGVhc2VJblF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDIpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCAyKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YWQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDIpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5DdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG4gIH0sXG5cbiAgZWFzZU91dEN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlIC0gMSwgMykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEN1YmljKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAzKTtcblxuICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3codmFsdWUgLSAyLCAzKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJblF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCA0KTtcbiAgfSxcblxuICBlYXNlT3V0UXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDQpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhcnQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDQpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogTWF0aC5wb3codmFsdWUsIDMpIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluU2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtTWF0aC5jb3ModmFsdWUgKiBNYXRoVXRpbC5QSV8yKSArIDE7XG4gIH0sXG5cbiAgZWFzZU91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zaW4odmFsdWUgKiBNYXRoVXRpbC5QSV8yKTtcbiAgfSxcblxuICBlYXNlSW5PdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbkV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG4gIH0sXG5cbiAgZWFzZU91dEV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHZhbHVlKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0RXhwbyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIDA7XG5cbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiAxO1xuXG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuXG4gICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS12YWx1ZSkgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5DaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VPdXRDaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgxIC0gTWF0aC5wb3codmFsdWUgLSAxLCAyKSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q2lyYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHZhbHVlIC09IDIpICogdmFsdWUpICsgMSk7XG4gIH0sXG5cbiAgZWFzZUluQmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gdmFsdWUgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgLSBzKTtcbiAgfSxcblxuICBlYXNlT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gKHZhbHVlID0gdmFsdWUgLSAxKSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSArIHMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiAodmFsdWUgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSAtIHMpKTtcbiAgICByZXR1cm4gMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlICsgcykgKyAyKTtcbiAgfSxcblxuICBnZXRFYXNpbmcoZWFzZSkge1xuICAgIGlmICh0eXBlb2YgZWFzZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZWFzZTtcbiAgICBlbHNlIHJldHVybiB0aGlzW2Vhc2VdIHx8IHRoaXMuZWFzZUxpbmVhcjtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyRCB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgdGhpcy55ID0geSB8fCAwO1xuICB9XG5cbiAgc2V0KHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRYKHgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0WSh5KSB7XG4gICAgdGhpcy55ID0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIGlmICh0aGlzLnggIT09IDApIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgICBlbHNlIGlmICh0aGlzLnkgPiAwKSByZXR1cm4gTWF0aFV0aWwuUElfMjtcbiAgICBlbHNlIGlmICh0aGlzLnkgPCAwKSByZXR1cm4gLU1hdGhVdGlsLlBJXzI7XG4gIH1cblxuICBjb3B5KHYpIHtcbiAgICB0aGlzLnggPSB2Lng7XG4gICAgdGhpcy55ID0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGQodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRYWShhLCBiKSB7XG4gICAgdGhpcy54ICs9IGE7XG4gICAgdGhpcy55ICs9IGI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCArIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgKyBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1Yih2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1YlZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCAtIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgLSBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpdmlkZVNjYWxhcihzKSB7XG4gICAgaWYgKHMgIT09IDApIHtcbiAgICAgIHRoaXMueCAvPSBzO1xuICAgICAgdGhpcy55IC89IHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KDAsIDApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbXVsdGlwbHlTY2FsYXIocykge1xuICAgIHRoaXMueCAqPSBzO1xuICAgIHRoaXMueSAqPSBzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoLTEpO1xuICB9XG5cbiAgZG90KHYpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55O1xuICB9XG5cbiAgbGVuZ3RoU3EoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKHRoaXMubGVuZ3RoKCkpO1xuICB9XG5cbiAgZGlzdGFuY2VUbyh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKHYpKTtcbiAgfVxuXG4gIHJvdGF0ZSh0aGEpIHtcbiAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnk7XG5cbiAgICB0aGlzLnggPSB4ICogTWF0aC5jb3ModGhhKSArIHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHRoaXMueSA9IC14ICogTWF0aC5zaW4odGhhKSArIHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXN0YW5jZVRvU3F1YXJlZCh2KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSB2Lng7XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSB2Lnk7XG5cbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gIH1cblxuICBsZXJwKHYsIGFscGhhKSB7XG4gICAgdGhpcy54ICs9ICh2LnggLSB0aGlzLngpICogYWxwaGE7XG4gICAgdGhpcy55ICs9ICh2LnkgLSB0aGlzLnkpICogYWxwaGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYueCA9PT0gdGhpcy54ICYmIHYueSA9PT0gdGhpcy55O1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy54ID0gMC4wO1xuICAgIHRoaXMueSA9IDAuMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xuICB9XG59XG4iLCIvKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vYmVoYXZpb3VyL0JlaGF2aW91cicpfSBCZWhhdmlvdXIgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuLi9tYXRoL1ZlY3RvcjJEJyl9IFZlY3RvcjJEICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vdXRpbHMvUmdiJyl9IFJnYiAqL1xuaW1wb3J0IFJnYiBmcm9tIFwiLi4vdXRpbHMvUmdiXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlIHtcbiAgLyoqIEB0eXBlIHN0cmluZyAqL1xuICBpZCA9IFwiXCI7XG5cbiAgLyoqIEB0eXBlIHt7cDpWZWN0b3IyRCx2OlZlY3RvcjJELGE6VmVjdG9yMkR9fSAqL1xuICBvbGQgPSB7fTtcblxuICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgZGF0YSA9IHt9O1xuXG4gIC8qKiBAdHlwZSB7QmVoYXZpb3VyW119ICovXG4gIGJlaGF2aW91cnMgPSBbXTtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICBwID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICB2ID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICBhID0gbnVsbDtcblxuICAvKiogQHR5cGUge1JnYn0gKi9cbiAgcmdiID0ge307XG5cbiAgLyoqXG4gICAqIHRoZSBQYXJ0aWNsZSBjbGFzc1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLlBhcnRpY2xlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gcE9iaiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtsaWZlOjMsZGVhZDpmYWxzZX1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgcGFydGljbGUncyBpZDtcbiAgICAgKiBAcHJvcGVydHkgaWRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiUGFydGljbGVcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICAgIHRoaXMub2xkID0ge307XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG5cbiAgICB0aGlzLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmEgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLmEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIHRoaXMucmdiID0gbmV3IFJnYigpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBjb25mICYmIFByb3BVdGlsLnNldFByb3AodGhpcywgY29uZik7XG4gIH1cblxuICBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52LngsIC10aGlzLnYueSkgKiBNYXRoVXRpbC5OMTgwX1BJO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5saWZlID0gSW5maW5pdHk7XG4gICAgdGhpcy5hZ2UgPSAwO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5zbGVlcCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keSA9IG51bGw7XG4gICAgdGhpcy5zcHJpdGUgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZW5lcmd5ID0gMTsgLy8gRW5lcmd5IExvc3NcbiAgICB0aGlzLm1hc3MgPSAxO1xuICAgIHRoaXMucmFkaXVzID0gMTA7XG4gICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgdGhpcy5jb2xvciA9IG51bGw7XG5cbiAgICB0aGlzLnAuc2V0KDAsIDApO1xuICAgIHRoaXMudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5hLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5wLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC52LnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5hLnNldCgwLCAwKTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZWFzZUxpbmVhcjtcblxuICAgIHRoaXMucmdiLnJlc2V0KCk7XG4gICAgVXRpbC5lbXB0eU9iamVjdCh0aGlzLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGUodGltZSwgaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcbiAgICAgIHRoaXMuYWdlICs9IHRpbWU7XG4gICAgICB0aGlzLmFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWdlIDwgdGhpcy5saWZlKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHRoaXMuYWdlIC8gdGhpcy5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlCZWhhdmlvdXJzKHRpbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5iZWhhdmlvdXJzW2ldICYmIHRoaXMuYmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXJcbiAgICovXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGJlaGF2aW91ci5oYXNPd25Qcm9wZXJ0eShcInBhcmVudHNcIikpIGJlaGF2aW91ci5wYXJlbnRzLnB1c2godGhpcyk7XG4gICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJbXX0gYmVoYXZpb3Vyc1xuICAgKi9cbiAgYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWRkQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgcGFydGljbGVcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHR5cGVkZWYgIHtPYmplY3R9IHJnYk9iamVjdFxuICAgKiBAcHJvcGVydHkge051bWJlcn0gciByZWQgdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGcgZ3JlZW4gdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGIgYmx1ZSB2YWx1ZVxuICAgKi9cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgaGV4IHZhbHVlIHRvIGEgcmdiIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgaGV4VG9SZ2JcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGggYW55IGhleCB2YWx1ZSwgZS5nLiAjMDAwMDAwIG9yIDAwMDAwMCBmb3IgYmxhY2tcbiAgICpcbiAgICogQHJldHVybiB7cmdiT2JqZWN0fVxuICAgKi9cbiAgaGV4VG9SZ2IoaCkge1xuICAgIGNvbnN0IGhleDE2ID0gaC5jaGFyQXQoMCkgPT09IFwiI1wiID8gaC5zdWJzdHJpbmcoMSwgNykgOiBoO1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuXG4gICAgcmV0dXJuIHsgciwgZywgYiB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIHJnYiB2YWx1ZSB0byBhIHJnYiBzdHJpbmdcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHJnYlRvSGV4XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgUHJvdG9uLmhleFRvUmdifSByZ2IgYSByZ2Igb2JqZWN0IGxpa2UgaW4ge0BsaW5rIFByb3RvbiNQcm90b24ufVxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHJnYigpXG4gICAqL1xuICByZ2JUb0hleChyYmcpIHtcbiAgICByZXR1cm4gYHJnYigke3JiZy5yfSwgJHtyYmcuZ30sICR7cmJnLmJ9KWA7XG4gIH0sXG5cbiAgZ2V0SGV4MTZGcm9tUGFydGljbGUocCkge1xuICAgIHJldHVybiBOdW1iZXIocC5yZ2IucikgKiA2NTUzNiArIE51bWJlcihwLnJnYi5nKSAqIDI1NiArIE51bWJlcihwLnJnYi5iKTtcbiAgfVxufTtcbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2xhcjJEIHtcbiAgY29uc3RydWN0b3IociwgdGhhKSB7XG4gICAgdGhpcy5yID0gTWF0aC5hYnMocikgfHwgMDtcbiAgICB0aGlzLnRoYSA9IHRoYSB8fCAwO1xuICB9XG5cbiAgc2V0KHIsIHRoYSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRSKHIpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VGhhKHRoYSkge1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29weShwKSB7XG4gICAgdGhpcy5yID0gcC5yO1xuICAgIHRoaXMudGhhID0gcC50aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1ZlY3RvcigpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMuZ2V0WCgpLCB0aGlzLmdldFkoKSk7XG4gIH1cblxuICBnZXRYKCkge1xuICAgIHJldHVybiB0aGlzLnIgKiBNYXRoLnNpbih0aGlzLnRoYSk7XG4gIH1cblxuICBnZXRZKCkge1xuICAgIHJldHVybiAtdGhpcy5yICogTWF0aC5jb3ModGhpcy50aGEpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuciA9IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnIgPT09IHRoaXMuciAmJiB2LnRoYSA9PT0gdGhpcy50aGE7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnIgPSAwLjA7XG4gICAgdGhpcy50aGEgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFBvbGFyMkQodGhpcy5yLCB0aGlzLnRoYSk7XG4gIH1cbn1cbiIsImNvbnN0IE1hdDMgPSB7XG4gIGNyZWF0ZShtYXQzKSB7XG4gICAgY29uc3QgbWF0ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcbiAgICBpZiAobWF0MykgdGhpcy5zZXQobWF0MywgbWF0KTtcblxuICAgIHJldHVybiBtYXQ7XG4gIH0sXG5cbiAgc2V0KG1hdDEsIG1hdDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykgbWF0MltpXSA9IG1hdDFbaV07XG5cbiAgICByZXR1cm4gbWF0MjtcbiAgfSxcblxuICBtdWx0aXBseShtYXQsIG1hdDIsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTAyID0gbWF0WzJdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAwID0gbWF0MlswXSxcbiAgICAgIGIwMSA9IG1hdDJbMV0sXG4gICAgICBiMDIgPSBtYXQyWzJdLFxuICAgICAgYjEwID0gbWF0MlszXSxcbiAgICAgIGIxMSA9IG1hdDJbNF0sXG4gICAgICBiMjAgPSBtYXQyWzZdLFxuICAgICAgYjIxID0gbWF0Mls3XTtcblxuICAgIG1hdDNbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTA7XG4gICAgbWF0M1sxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMTtcbiAgICBtYXQzWzJdID0gYTAyICogYjAyO1xuICAgIG1hdDNbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTA7XG4gICAgbWF0M1s0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMTtcbiAgICBtYXQzWzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYTIwO1xuICAgIG1hdDNbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBhMjE7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBpbnZlcnNlKG1hdCwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDEgPSBhMTEsXG4gICAgICBiMTEgPSAtYTEwLFxuICAgICAgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwLFxuICAgICAgZCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSxcbiAgICAgIGlkO1xuXG4gICAgaWQgPSAxIC8gZDtcbiAgICBtYXQzWzBdID0gYjAxICogaWQ7XG4gICAgbWF0M1sxXSA9IC1hMDEgKiBpZDtcbiAgICBtYXQzWzNdID0gYjExICogaWQ7XG4gICAgbWF0M1s0XSA9IGEwMCAqIGlkO1xuICAgIG1hdDNbNl0gPSBiMjEgKiBpZDtcbiAgICBtYXQzWzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogaWQ7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBtdWx0aXBseVZlYzIobSwgdmVjLCBtYXQzKSB7XG4gICAgbGV0IHggPSB2ZWNbMF0sXG4gICAgICB5ID0gdmVjWzFdO1xuXG4gICAgbWF0M1swXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyBtWzZdO1xuICAgIG1hdDNbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgbVs3XTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXQzO1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgY2VudGVyKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5pc0FycmF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYSA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuICAgICAgdGhpcy5hID0gVXRpbC5pbml0VmFsdWUoYSwgMSk7XG4gICAgICB0aGlzLmIgPSBVdGlsLmluaXRWYWx1ZShiLCB0aGlzLmEpO1xuICAgICAgdGhpcy5jZW50ZXIgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNBcnJheSkge1xuICAgICAgcmV0dXJuIFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY2VudGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21BVG9CKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tRmxvYXRpbmcodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBTcGFuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqXG4gICAqIEB0b2RvIGEsIGIgYW5kIGMgc2hvdWxkIGJlICdNaXhlZCcgb3IgJ051bWJlcic/XG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBhXG4gICAqIEBwYXJhbSB7TWl4ZWR9ICAgICAgICAgICAgICAgYlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGNcbiAgICpcbiAgICogQHJldHVybiB7U3Bhbn1cbiAgICovXG4gIHN0YXRpYyBzZXRTcGFuVmFsdWUoYSwgYiwgYykge1xuICAgIGlmIChhIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcGFuKGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTcGFuKGEsIGIpO1xuICAgICAgICBlbHNlIHJldHVybiBuZXcgU3BhbihhLCBiLCBjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgZnJvbSBhIFNwYW4sIGlmIHRoZSBwYXJhbSBpcyBub3QgYSBTcGFuIGl0IHdpbGwgcmV0dXJuIHRoZSBnaXZlbiBwYXJhbWV0ZXJcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldFZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBwYW5cbiAgICpcbiAgICogQHJldHVybiB7TWl4ZWR9IHRoZSB2YWx1ZSBvZiBTcGFuIE9SIHRoZSBwYXJhbWV0ZXIgaWYgaXQgaXMgbm90IGEgU3BhblxuICAgKi9cbiAgc3RhdGljIGdldFNwYW5WYWx1ZShwYW4pIHtcbiAgICByZXR1cm4gcGFuIGluc3RhbmNlb2YgU3BhbiA/IHBhbi5nZXRWYWx1ZSgpIDogcGFuO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5U3BhbiBleHRlbmRzIFNwYW4ge1xuICBjb25zdHJ1Y3Rvcihjb2xvcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYXJyID0gVXRpbC50b0FycmF5KGNvbG9yKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIGNvbnN0IHZhbCA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLl9hcnIpO1xuICAgIHJldHVybiB2YWwgPT09IFwicmFuZG9tXCIgfHwgdmFsID09PSBcIlJhbmRvbVwiID8gTWF0aFV0aWwucmFuZG9tQ29sb3IoKSA6IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHN1cmUgdGhhdCB0aGUgY29sb3IgaXMgYW4gaW5zdGFuY2Ugb2YgUHJvdG9uLkFycmF5U3BhbiwgaWYgbm90IGl0IG1ha2VzIGEgbmV3IGluc3RhbmNlXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBcnJheVNwYW4oYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5U3BhbikgcmV0dXJuIGFycjtcbiAgICBlbHNlIHJldHVybiBuZXcgQXJyYXlTcGFuKGFycik7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLndpZHRoID0gdztcbiAgICB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuICB9XG5cbiAgY29udGFpbnMoeCwgeSkge1xuICAgIGlmICh4IDw9IHRoaXMucmlnaHQgJiYgeCA+PSB0aGlzLnggJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMueSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUge1xuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWlzc2lvbiAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYXRlXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkgfCBOdW1iZXIgfCBTcGFufSBudW1wYW4gdGhlIG51bWJlciBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBAcGFyYW0ge0FycmF5IHwgTnVtYmVyIHwgU3Bhbn0gdGltZXBhbiB0aGUgdGltZSBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBmb3IgZXhhbXBsZTogbmV3IFJhdGUobmV3IFNwYW4oMTAsIDIwKSwgbmV3IFNwYW4oLjEsIC4yNSkpO1xuICAgKi9cbiAgY29uc3RydWN0b3IobnVtcGFuLCB0aW1lcGFuKSB7XG4gICAgdGhpcy5udW1QYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShudW1wYW4sIDEpKTtcbiAgICB0aGlzLnRpbWVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZSh0aW1lcGFuLCAxKSk7XG5cbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IDA7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG4gIH1cblxuICBnZXRWYWx1ZSh0aW1lKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA+PSB0aGlzLm5leHRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG5cbiAgICAgIGlmICh0aGlzLm51bVBhbi5iID09PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLm51bVBhbi5nZXRWYWx1ZShmYWxzZSkgPiAwLjUpIHJldHVybiAxO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtUGFuLmdldFZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXplIHtcbiAgcmVzZXQoKSB7fVxuXG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShlbWl0dGVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBzdWIgY2xhc3MgaW5pdFxuICBpbml0aWFsaXplKHRhcmdldCkge31cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlmZSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGlmZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTGlmZVwiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5saWZlUGFuLmEgPT09IEluZmluaXR5KSB0YXJnZXQubGlmZSA9IEluZmluaXR5O1xuICAgIGVsc2UgdGFyZ2V0LmxpZmUgPSB0aGlzLmxpZmVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgICB0aGlzLnJhbmRvbSA9IDA7XG4gICAgdGhpcy5jcm9zc1R5cGUgPSBcImRlYWRcIjtcbiAgICB0aGlzLmFsZXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge31cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudmVjdG9yID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54O1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIFBvaW50Wm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzaW5nIG1ldGhvZCFcIik7XG4gICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3Ioem9uZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgICB0aGlzLm5hbWUgPSBcIlBvc2l0aW9uXCI7XG4gIH1cblxuICByZXNldCh6b25lKSB7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGhpcy56b25lLmdldFBvc2l0aW9uKCk7XG5cbiAgICB0YXJnZXQucC54ID0gdGhpcy56b25lLnZlY3Rvci54O1xuICAgIHRhcmdldC5wLnkgPSB0aGlzLnpvbmUudmVjdG9yLnk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4uL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbG9jaXR5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlZlbG9jaXR5XCI7XG4gIH1cblxuICByZXNldChycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG4gIH1cblxuICBub3JtYWxpemVWZWxvY2l0eSh2cikge1xuICAgIHJldHVybiB2ciAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInBcIiB8fCB0aGlzLnR5cGUgPT09IFwiUFwiIHx8IHRoaXMudHlwZSA9PT0gXCJwb2xhclwiKSB7XG4gICAgICBjb25zdCBwb2xhcjJkID0gbmV3IFBvbGFyMkQoXG4gICAgICAgIHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpLFxuICAgICAgICB0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpICogTWF0aFV0aWwuUElfMTgwXG4gICAgICApO1xuXG4gICAgICB0YXJnZXQudi54ID0gcG9sYXIyZC5nZXRYKCk7XG4gICAgICB0YXJnZXQudi55ID0gcG9sYXIyZC5nZXRZKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC52LnggPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKTtcbiAgICAgIHRhcmdldC52LnkgPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMudGhhUGFuLmdldFZhbHVlKCkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFzc1BhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTWFzc1wiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0YXJnZXQubWFzcyA9IHRoaXMubWFzc1Bhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGl1cyBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJSYWRpdXNcIjtcbiAgfVxuXG4gIHJlc2V0KGEsIGIsIGMpIHtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHRoaXMucmFkaXVzLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2R5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlLCB3LCBoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNldFNwYW5WYWx1ZShpbWFnZSk7XG4gICAgdGhpcy53ID0gVXRpbC5pbml0VmFsdWUodywgMjApO1xuICAgIHRoaXMuaCA9IFV0aWwuaW5pdFZhbHVlKGgsIHRoaXMudyk7XG4gICAgdGhpcy5uYW1lID0gXCJCb2R5XCI7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSB0aGlzLmltYWdlLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlVGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0ge1xuICAgICAgICB3aWR0aDogdGhpcy53LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaCxcbiAgICAgICAgc3JjOiBpbWFnZVRhcmdldCxcbiAgICAgICAgaXNJbm5lcjogdHJ1ZSxcbiAgICAgICAgaW5uZXI6IHRydWVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBpbWFnZVRhcmdldDtcbiAgICB9XG4gIH1cblxuICBzZXRTcGFuVmFsdWUoaW1hZ2UpIHtcbiAgICByZXR1cm4gaW1hZ2UgaW5zdGFuY2VvZiBBcnJheVNwYW4gPyBpbWFnZSA6IG5ldyBBcnJheVNwYW4oaW1hZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyIHtcbiAgc3RhdGljIGlkID0gMDtcblxuICAvKipcbiAgICogVGhlIEJlaGF2aW91ciBjbGFzcyBpcyB0aGUgYmFzZSBmb3IgdGhlIG90aGVyIEJlaGF2aW91clxuICAgKlxuICAgKiBAbWVtYmVyb2YhIC1cbiAgICogQGludGVyZmFjZVxuICAgKiBAYWxpYXMgUHJvdG9uLkJlaGF2aW91clxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbGlmZSBcdHRoZSBiZWhhdmlvdXJzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVhc2luZyBcdFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZCwgZm9yIGV4YW1wbGUgZWFzZS5lYXNlT3V0UXVhcnRcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9ICBpZCBcdFx0VGhlIGJlaGF2aW91cnMgaWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9ICBhZ2U9MCBcdEhvdyBsb25nIHRoZSBwYXJ0aWNsZSBzaG91bGQgYmUgJ2FsaWZlJ1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gIGVuZXJneT0xXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVhZD1mYWxzZSBUaGUgcGFydGljbGUgaXMgZGVhZCBhdCBmaXJzdFxuICAgKiBAcHJvcGVydHkge0FycmF5fSAgIHBhcmVudHMgXHRUaGUgYmVoYXZpb3VyJ3MgcGFyZW50cyBhcnJheVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gIG5hbWUgXHRUaGUgYmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG5cbiAgICB0aGlzLmFnZSA9IDA7XG4gICAgdGhpcy5lbmVyZ3kgPSAxO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyZW50cyA9IFtdO1xuXG4gICAgdGhpcy5pZCA9IGBCZWhhdmlvdXJfJHtCZWhhdmlvdXIuaWQrK31gO1xuICAgIHRoaXMubmFtZSA9IFwiQmVoYXZpb3VyXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIGZvcmNlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAbWV0aG9kIG5vcm1hbGl6ZUZvcmNlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gZm9yY2VcbiAgICovXG4gIG5vcm1hbGl6ZUZvcmNlKGZvcmNlKSB7XG4gICAgcmV0dXJuIGZvcmNlLm11bHRpcGx5U2NhbGFyKFByb3Rvbi5NRUFTVVJFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2YWx1ZSBieSAxOjEwMDtcbiAgICpcbiAgICogQG1ldGhvZCBub3JtYWxpemVWYWx1ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAqL1xuICBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuYWdlID49IHRoaXMubGlmZSB8fCB0aGlzLmRlYWQpIHtcbiAgICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyhwYXJ0aWNsZS5hZ2UgLyBwYXJ0aWNsZS5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIGJlaGF2aW91clxuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGxldCBpID0gdGhpcy5wYXJlbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLnBhcmVudHNbaV0ucmVtb3ZlQmVoYXZpb3VyKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMucGFyZW50cy5sZW5ndGggPSAwO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmNlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Gb3JjZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZ4LCBmeSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKG5ldyBWZWN0b3IyRChmeCwgZnkpKTtcbiAgICB0aGlzLm5hbWUgPSBcIkZvcmNlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeFxuICAgKiBAcGFyYW0ge051bWJlcn0gZnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKG5ldyBWZWN0b3IyRChmeCwgZnkpKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmZvcmNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0cmFjdGlvbiBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBUaGlzIGJlaGF2aW91ciBsZXQgdGhlIHBhcnRpY2xlcyBmb2xsb3cgb25lIHNwZWNpZmljIFByb3Rvbi5WZWN0b3IyRFxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQXR0cmFjdGlvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNTcVxuICAgKiBAcHJvcGVydHkge1Byb3Rvbi5WZWN0b3IyRH0gYXR0cmFjdGlvbkZvcmNlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBsZW5ndGhTcVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkF0dHJhY3Rpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLnJhZGl1cyA9IFV0aWwuaW5pdFZhbHVlKHJhZGl1cywgMTAwMCk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5jb3B5KHRoaXMudGFyZ2V0UG9zaXRpb24pO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLnN1YihwYXJ0aWNsZS5wKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gdGhpcy5hdHRyYWN0aW9uRm9yY2UubGVuZ3RoU3EoKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aFNxID4gMC4wMDAwNCAmJiB0aGlzLmxlbmd0aFNxIDwgdGhpcy5yYWRpdXNTcSkge1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uubm9ybWFsaXplKCk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5sZW5ndGhTcSAvIHRoaXMucmFkaXVzU3EpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIodGhpcy5mb3JjZSk7XG5cbiAgICAgIHBhcnRpY2xlLmEuYWRkKHRoaXMuYXR0cmFjdGlvbkZvcmNlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5kb21EcmlmdCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFJhbmRvbURyaWZ0XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFggXHRcdFx0XHRYIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WSAgXHRcdFx0XHRZIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IFx0XHRcdFx0SG93IG11Y2ggZGVsYXkgdGhlIGRyaWZ0IHNob3VsZCBoYXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lIFRoZSB0aW1lIG9mIHRoZSBkcmlmdFxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoZHJpZnRYLCBkcmlmdFksIGRlbGF5KTtcbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMubmFtZSA9IFwiUmFuZG9tRHJpZnRcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1JhbmRvbURyaWZ0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZHJpZnRYLCBkcmlmdFksIGRlbGF5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnBhbkZvY2UgPSBuZXcgVmVjdG9yMkQoZHJpZnRYLCBkcmlmdFkpO1xuICAgIHRoaXMucGFuRm9jZSA9IHRoaXMubm9ybWFsaXplRm9yY2UodGhpcy5wYW5Gb2NlKTtcbiAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS50aW1lID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgKz0gdGltZTtcblxuICAgIGlmIChwYXJ0aWNsZS5kYXRhLnRpbWUgPj0gdGhpcy5kZWxheSkge1xuICAgICAgcGFydGljbGUuYS5hZGRYWShcbiAgICAgICAgTWF0aFV0aWwucmFuZG9tQVRvQigtdGhpcy5wYW5Gb2NlLngsIHRoaXMucGFuRm9jZS54KSxcbiAgICAgICAgTWF0aFV0aWwucmFuZG9tQVRvQigtdGhpcy5wYW5Gb2NlLnksIHRoaXMucGFuRm9jZS55KVxuICAgICAgKTtcblxuICAgICAgcGFydGljbGUuZGF0YS50aW1lID0gMDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBGb3JjZSBmcm9tIFwiLi9Gb3JjZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5IGV4dGVuZHMgRm9yY2Uge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkdyYXZpdHlcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIoMCwgZywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5HcmF2aXR5XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZyBcdFx0XHRcdFx0XHRcdEdyYXZpdHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyLnJlc2V0KDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpc2lvbiBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgYWZ0ZXIgY29sbGlzaW9uXG4gICAqXG4gICAqIEBjYWxsYmFjayBDYWxsYmFja1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtQcm90b24uUGFyaXRjbGV9IG90aGVyUGFydGljbGVcbiAgICovXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ29sbGlzaW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2spO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sbGlzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gVXRpbC5pbml0VmFsdWUoZW1pdHRlciwgbnVsbCk7XG4gICAgdGhpcy5tYXNzID0gVXRpbC5pbml0VmFsdWUobWFzcywgdHJ1ZSk7XG4gICAgdGhpcy5jYWxsYmFjayA9IFV0aWwuaW5pdFZhbHVlKGNhbGxiYWNrLCBudWxsKTtcblxuICAgIHRoaXMuY29sbGlzaW9uUG9vbCA9IFtdO1xuICAgIHRoaXMuZGVsdGEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbmV3UG9vbCA9IHRoaXMuZW1pdHRlciA/IHRoaXMuZW1pdHRlci5wYXJ0aWNsZXMuc2xpY2UoaW5kZXgpIDogdGhpcy5wb29sLnNsaWNlKGluZGV4KTtcbiAgICBjb25zdCBsZW5ndGggPSBuZXdQb29sLmxlbmd0aDtcblxuICAgIGxldCBvdGhlclBhcnRpY2xlO1xuICAgIGxldCBsZW5ndGhTcTtcbiAgICBsZXQgb3ZlcmxhcDtcbiAgICBsZXQgdG90YWxNYXNzO1xuICAgIGxldCBhdmVyYWdlTWFzczEsIGF2ZXJhZ2VNYXNzMjtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgb3RoZXJQYXJ0aWNsZSA9IG5ld1Bvb2xbaV07XG5cbiAgICAgIGlmIChvdGhlclBhcnRpY2xlICE9PSBwYXJ0aWNsZSkge1xuICAgICAgICB0aGlzLmRlbHRhLmNvcHkob3RoZXJQYXJ0aWNsZS5wKTtcbiAgICAgICAgdGhpcy5kZWx0YS5zdWIocGFydGljbGUucCk7XG5cbiAgICAgICAgbGVuZ3RoU3EgPSB0aGlzLmRlbHRhLmxlbmd0aFNxKCk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gcGFydGljbGUucmFkaXVzICsgb3RoZXJQYXJ0aWNsZS5yYWRpdXM7XG5cbiAgICAgICAgaWYgKGxlbmd0aFNxIDw9IGRpc3RhbmNlICogZGlzdGFuY2UpIHtcbiAgICAgICAgICBvdmVybGFwID0gZGlzdGFuY2UgLSBNYXRoLnNxcnQobGVuZ3RoU3EpO1xuICAgICAgICAgIG92ZXJsYXAgKz0gMC41O1xuXG4gICAgICAgICAgdG90YWxNYXNzID0gcGFydGljbGUubWFzcyArIG90aGVyUGFydGljbGUubWFzcztcbiAgICAgICAgICBhdmVyYWdlTWFzczEgPSB0aGlzLm1hc3MgPyBvdGhlclBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG4gICAgICAgICAgYXZlcmFnZU1hc3MyID0gdGhpcy5tYXNzID8gcGFydGljbGUubWFzcyAvIHRvdGFsTWFzcyA6IDAuNTtcblxuICAgICAgICAgIHBhcnRpY2xlLnAuYWRkKFxuICAgICAgICAgICAgdGhpcy5kZWx0YVxuICAgICAgICAgICAgICAuY2xvbmUoKVxuICAgICAgICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgICAgICAgLm11bHRpcGx5U2NhbGFyKG92ZXJsYXAgKiAtYXZlcmFnZU1hc3MxKVxuICAgICAgICAgICk7XG4gICAgICAgICAgb3RoZXJQYXJ0aWNsZS5wLmFkZCh0aGlzLmRlbHRhLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKG92ZXJsYXAgKiBhdmVyYWdlTWFzczIpKTtcblxuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjayhwYXJ0aWNsZSwgb3RoZXJQYXJ0aWNsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm9zc1pvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogRGVmaW5lcyB3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBjb21lIHRvIHRoZSBlbmQgb2YgdGhlIHNwZWNpZmllZCB6b25lXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Dcm9zc1pvbmVcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uWm9uZX0gem9uZSBcdFx0XHRcdFx0XHRjYW4gYmUgYW55IFByb3Rvbi5ab25lIC0gZS5nLiBQcm90b24uUmVjdFpvbmUoKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtjcm9zc1R5cGU9ZGVhZF0gXHRcdFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KHpvbmUsIGNyb3NzVHlwZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDcm9zc1pvbmVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Dcm9zc1pvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRjYW4gYmUgYW55IFByb3Rvbi5ab25lIC0gZS5nLiBQcm90b24uUmVjdFpvbmUoKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtjcm9zc1R5cGU9ZGVhZF0gXHR3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBwYXNzIHRoZSB6b25lIC0gYWxsb3dlZCBzdHJpbmdzOiBkZWFkIHwgYm91bmQgfCBjcm9zc1xuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuem9uZSA9IHpvbmU7XG4gICAgdGhpcy56b25lLmNyb3NzVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGNyb3NzVHlwZSwgXCJkZWFkXCIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Dcm9zc1pvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICB0aGlzLnpvbmUuY3Jvc3NpbmcocGFydGljbGUpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxwaGEgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkFscGhhXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnIGFuZCAnYidcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkFscGhhXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnIGFuZCAnYidcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBuZXcgYWxwaGEgdmFsdWUgb2YgdGhlIHBhcnRpY2xlXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BbHBoYVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlIEEgc2luZ2xlIFByb3RvbiBnZW5lcmF0ZWQgcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLmFscGhhQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHRoaXMuc2FtZSkgcGFydGljbGUuZGF0YS5hbHBoYUIgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQTtcbiAgICBlbHNlIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BbHBoYVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS5hbHBoYSA9IHBhcnRpY2xlLmRhdGEuYWxwaGFCICsgKHBhcnRpY2xlLmRhdGEuYWxwaGFBIC0gcGFydGljbGUuZGF0YS5hbHBoYUIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICBpZiAocGFydGljbGUuYWxwaGEgPCAwLjAwMSkgcGFydGljbGUuYWxwaGEgPSAwO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhbGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlNjYWxlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnIGFuZCAnYidcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIlNjYWxlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVBID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgcGFydGljbGUuZGF0YS5zY2FsZUIgPSB0aGlzLnNhbWUgPyBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA6IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuc2NhbGUgPSBwYXJ0aWNsZS5kYXRhLnNjYWxlQiArIChwYXJ0aWNsZS5kYXRhLnNjYWxlQSAtIHBhcnRpY2xlLmRhdGEuc2NhbGVCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLnNjYWxlIDwgMC4wMDAxKSBwYXJ0aWNsZS5zY2FsZSA9IDA7XG4gICAgcGFydGljbGUucmFkaXVzID0gcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgKiBwYXJ0aWNsZS5zY2FsZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdGF0ZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUm90YXRlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnLCAnYicgYW5kICdzdHlsZSdcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtpbmZsdWVuY2U9VmVsb2NpdHldIFRoZSByb3RhdGlvbidzIGluZmx1ZW5jZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3N0eWxlPXRvXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZmx1ZW5jZSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGluZmx1ZW5jZSwgYiwgc3R5bGUpO1xuICAgIHRoaXMubmFtZSA9IFwiUm90YXRlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJywgJ2InIGFuZCAnc3R5bGUnXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbc3R5bGU9dG9dXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCBcIlZlbG9jaXR5XCIpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShiLCAwKSk7XG4gICAgdGhpcy5zdHlsZSA9IFV0aWwuaW5pdFZhbHVlKHN0eWxlLCBcInRvXCIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucm90YXRpb24gPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEucm90YXRpb25CID0gdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuc2FtZSkge1xuICAgICAgaWYgKHRoaXMuc3R5bGUgPT09IFwidG9cIiB8fCB0aGlzLnN0eWxlID09PSBcIlRPXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJfXCIpIHtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24gKz1cbiAgICAgICAgICBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiArIChwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQSAtIHBhcnRpY2xlLmRhdGEucm90YXRpb25CKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24gKz0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmEuYSA9PT0gXCJWXCIgfHwgdGhpcy5hLmEgPT09IFwiVmVsb2NpdHlcIiB8fCB0aGlzLmEuYSA9PT0gXCJ2XCIpIHtcbiAgICAgIC8vIGJldGEuLi5cbiAgICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gcGFydGljbGUuZ2V0RGlyZWN0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4uL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ29sb3JcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBhIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBiIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJDb2xvclwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGEgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGIgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYSA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYSk7XG4gICAgdGhpcy5iID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihiKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmNvbG9yID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5jb2xvckEgPSBDb2xvclV0aWwuaGV4VG9SZ2IocGFydGljbGUuY29sb3IpO1xuXG4gICAgaWYgKHRoaXMuYikgcGFydGljbGUuZGF0YS5jb2xvckIgPSBDb2xvclV0aWwuaGV4VG9SZ2IodGhpcy5iLmdldFZhbHVlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5iKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLnIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuciAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLnIpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmcgKyAocGFydGljbGUuZGF0YS5jb2xvckEuZyAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmcpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuYiAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUucmdiLnIgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUucmdiLmcgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUucmdiLmIgPDwgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmNvbnN0IENIQU5HSU5HID0gXCJjaGFuZ2luZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDeWNsb25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5DeWNsb25lXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3ljbG9uZVwiO1xuICB9XG5cbiAgc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcblxuICAgIGlmIChhbmdsZSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwibGVmdFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gLU1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJyYW5kb21cIjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwic3BhblwiO1xuICAgICAgdGhpcy5zcGFuID0gYW5nbGU7XG4gICAgfSBlbHNlIGlmIChhbmdsZSkge1xuICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ2luZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImF1dG9cIlxuICAgICkge1xuICAgICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIH0gZWxzZSBpZiAoZm9yY2UpIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBmb3JjZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gTWF0aFV0aWwucmFuZG9tQVRvQigtTWF0aFV0aWwuUEksIE1hdGhVdGlsLlBJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IHRoaXMuc3Bhbi5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgbGV0IGxlbmd0aDtcbiAgICBsZXQgZ3JhZGllbnQgPSBwYXJ0aWNsZS52LmdldEdyYWRpZW50KCk7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIgfHwgdGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIGdyYWRpZW50ICs9IHBhcnRpY2xlLmRhdGEuY2FuZ2xlO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmFkaWVudCArPSB0aGlzLmFuZ2xlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcmNlID09PSBDSEFOR0lORykge1xuICAgICAgbGVuZ3RoID0gcGFydGljbGUudi5sZW5ndGgoKSAvIDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdGhpcy5mb3JjZTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueCA9IGxlbmd0aCAqIE1hdGguY29zKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueSA9IGxlbmd0aCAqIE1hdGguc2luKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gICAgcGFydGljbGUuYS5hZGQocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgfVxufVxuIiwiaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSBcIi4vQXR0cmFjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXB1bHNpb24gZXh0ZW5kcyBBdHRyYWN0aW9uIHtcbiAgLyoqXG4gICAqIFRoZSBvcHBpc2l0ZSBvZiBQcm90b24uQXR0cmFjdGlvbiAtIHR1cm5zIHRoZSBmb3JjZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5SZXB1bHNpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZm9yY2UgKj0gLTE7XG4gICAgdGhpcy5uYW1lID0gXCJSZXB1bHNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5SZXB1bHNpb25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyLnJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMuZm9yY2UgKj0gLTE7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHlXZWxsIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgR3Jhdml0eVdlbGxcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY2VudGVyUG9pbnQsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5kaXN0YW5jZVZlYyA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuY2VudGVyUG9pbnQgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXJQb2ludCwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMubmFtZSA9IFwiR3Jhdml0eVdlbGxcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbY2VudGVyUG9pbnQ9bmV3IFZlY3RvcjJEXSBUaGUgcG9pbnQgaW4gdGhlIGNlbnRlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cdFx0XHRcdFx0VGhlIGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV1cdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYyA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuY2VudGVyUG9pbnQgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXJQb2ludCwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW5oZXJpdGRvY1xuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jR3Jhdml0eVdlbGxcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmRpc3RhbmNlVmVjLnNldCh0aGlzLmNlbnRlclBvaW50LnggLSBwYXJ0aWNsZS5wLngsIHRoaXMuY2VudGVyUG9pbnQueSAtIHBhcnRpY2xlLnAueSk7XG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IHRoaXMuZGlzdGFuY2VWZWMubGVuZ3RoU3EoKTtcblxuICAgIGlmIChkaXN0YW5jZVNxICE9PSAwKSB7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2VWZWMubGVuZ3RoKCk7XG4gICAgICBjb25zdCBmYWN0b3IgPSAodGhpcy5mb3JjZSAqIHRpbWUpIC8gKGRpc3RhbmNlU3EgKiBkaXN0YW5jZSk7XG5cbiAgICAgIHBhcnRpY2xlLnYueCArPSBmYWN0b3IgKiB0aGlzLmRpc3RhbmNlVmVjLng7XG4gICAgICBwYXJ0aWNsZS52LnkgKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFByb3BVdGlsIGZyb20gXCIuLi91dGlscy9Qcm9wVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdGlhbGl6ZShlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpIHtcbiAgICBjb25zdCBsZW5ndGggPSBpbml0aWFsaXplcy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpbml0aWFsaXplc1tpXSBpbnN0YW5jZW9mIEluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZXNbaV0uaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluaXQoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFbWl0dGVyKGVtaXR0ZXIsIHBhcnRpY2xlKTtcbiAgfSxcblxuICAvLyBpbml0XG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemUpIHtcbiAgICBQcm9wVXRpbC5zZXRQcm9wKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgICBQcm9wVXRpbC5zZXRWZWN0b3JWYWwocGFydGljbGUsIGluaXRpYWxpemUpO1xuICB9LFxuXG4gIGJpbmRFbWl0dGVyKGVtaXR0ZXIsIHBhcnRpY2xlKSB7XG4gICAgaWYgKGVtaXR0ZXIuYmluZEVtaXR0ZXIpIHtcbiAgICAgIHBhcnRpY2xlLnAuYWRkKGVtaXR0ZXIucCk7XG4gICAgICBwYXJ0aWNsZS52LmFkZChlbWl0dGVyLnYpO1xuICAgICAgcGFydGljbGUuYS5hZGQoZW1pdHRlci5hKTtcblxuICAgICAgcGFydGljbGUudi5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKGVtaXR0ZXIucm90YXRpb24pKTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZVV0aWwgZnJvbSBcIi4uL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlciBleHRlbmRzIFBhcnRpY2xlIHtcbiAgLyoqXG4gICAqIFlvdSBjYW4gdXNlIHRoaXMgZW1pdCBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEl0IHdpbGwgZGlzcGF0Y2ggZm9sbG93IGV2ZW50czpcbiAgICogUEFSVElDTEVfQ1JFQVRFRFxuICAgKiBQQVJUSUNMRV9VUERBVEFcbiAgICogUEFSVElDTEVfREVBRFxuICAgKlxuICAgKiBAY2xhc3MgRW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7ZGFtcGluZzowLjAxLGJpbmRFbWl0dGVyOmZhbHNlfVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZiA9IHt9KSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuICAgIHRoaXMuaW5pdGlhbGl6ZXMgPSBbXTtcblxuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuZW1pdFNwZWVkID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyaWN0aW9uIGNvZWZmaWNpZW50IGZvciBhbGwgcGFydGljbGUgZW1pdCBieSBUaGlzO1xuICAgICAqIEBwcm9wZXJ0eSBkYW1waW5nXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwLjAwNlxuICAgICAqL1xuICAgIHRoaXMuZGFtcGluZyA9IDAuMDA2O1xuXG4gICAgLyoqXG4gICAgICogSWYgYmluZEVtaXR0ZXIgdGhlIHBhcnRpY2xlcyBjYW4gYmluZCB0aGlzIGVtaXR0ZXIncyBwcm9wZXJ0eTtcbiAgICAgKiBAcHJvcGVydHkgYmluZEVtaXR0ZXJcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgdGhpcy5iaW5kRW1pdHRlciA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXQgKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAgICogQHByb3BlcnR5IHJhdGVcbiAgICAgKiBAdHlwZSB7UmF0ZX1cbiAgICAgKiBAZGVmYXVsdCBSYXRlKDEsIC4xKVxuICAgICAqL1xuICAgIHRoaXMucmF0ZSA9IG5ldyBSYXRlKDEsIDAuMSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkVtaXR0ZXJcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbWl0VGltZSBiZWdpbiBlbWl0IHRpbWU7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsaWZlIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlclxuICAgKi9cbiAgZW1pdCh0b3RhbFRpbWUsIGxpZmUpIHtcbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gVXRpbC5pbml0VmFsdWUodG90YWxUaW1lLCBJbmZpbml0eSk7XG5cbiAgICBpZiAobGlmZSA9PT0gdHJ1ZSB8fCBsaWZlID09PSBcImxpZmVcIiB8fCBsaWZlID09PSBcImRlc3Ryb3lcIikge1xuICAgICAgdGhpcy5saWZlID0gdG90YWxUaW1lID09PSBcIm9uY2VcIiA/IDEgOiB0aGlzLnRvdGFsVGltZTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihsaWZlKSkge1xuICAgICAgdGhpcy5saWZlID0gbGlmZTtcbiAgICB9XG5cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJvbmNlXCIpIHtcbiAgICAgIGxldCBpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB0aGlzLnRvdGFsVGltZSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG5cbiAgICAgIGlmICh0aGlzLmVtaXRUaW1lIDwgdGhpcy50b3RhbFRpbWUpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgc2luZ2xlIHBhcnRpY2xlO1xuICAgKlxuICAgKiBjYW4gdXNlIGVtaXQoe3g6MTB9LG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KSBvciBlbWl0KFt7eDoxMH0sbmV3IEluaXRpYWxpemVdLG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KVxuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGxldCBpbml0aWFsaXplcyA9IHRoaXMuaW5pdGlhbGl6ZXM7XG4gICAgbGV0IGJlaGF2aW91cnMgPSB0aGlzLmJlaGF2aW91cnM7XG5cbiAgICBpZiAoaW5pdGlhbGl6ZSkgaW5pdGlhbGl6ZXMgPSBVdGlsLnRvQXJyYXkoaW5pdGlhbGl6ZSk7XG4gICAgaWYgKGJlaGF2aW91cikgYmVoYXZpb3VycyA9IFV0aWwudG9BcnJheShiZWhhdmlvdXIpO1xuXG4gICAgcGFydGljbGUucmVzZXQoKTtcbiAgICBJbml0aWFsaXplVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcyk7XG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucGFydGljbGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcblxuICAgIHRoaXMucmF0ZSA9IG51bGw7XG4gICAgdGhpcy5vbGQgPSBudWxsO1xuICAgIHRoaXMucmdiID0gbnVsbDtcbiAgICB0aGlzLnYgPSBudWxsO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdGhpcy5wID0gbnVsbDtcbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChFbWl0dGVyKTtcbiIsImltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyRW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEJlaGF2aW91ckVtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEJlaGF2aW91ckVtaXR0ZXIgeW91IGNhbiBhZGQgYmVoYXZpb3VycyB0byBzZWxmO1xuICAgKiBAY2xhc3MgUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMuc2VsZkJlaGF2aW91cnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBlbWl0dGVyO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IFByb3Rvbi5Db2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZFNlbGZCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpLFxuICAgICAgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXIgZm9yIHNlbGZcbiAgICogQG1ldGhvZCByZW1vdmVTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVTZWxmQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuc2VsZkJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgc3VwZXIudXBkYXRlKHRpbWUpO1xuXG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmxlbmd0aDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd0VtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBGb2xsb3dFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBGb2xsb3dFbWl0dGVyIHdpbGwgZW1pdCBwYXJ0aWNsZSB3aGVuIG1vdXNlbW92aW5nXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uRm9sbG93RW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtFbGVtZW50fSBtb3VzZVRhcmdldCBtb3VzZWV2ZW50J3MgdGFyZ2V0O1xuICAgKiBAcGFyYW0ge051bWJlcn0gZWFzZSB0aGUgZWFzaW5nIG9mIGZvbGxvd2luZyBzcGVlZDtcbiAgICogQGRlZmF1bHQgMC43XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1vdXNlVGFyZ2V0LCBlYXNlLCBjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcblxuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlbW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZWRvd24uY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNldXBIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNldXAuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZW1vdmUoZSkge1xuICAgIGlmIChlLmxheWVyWCB8fCBlLmxheWVyWCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUubGF5ZXJYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH0gZWxzZSBpZiAoZS5vZmZzZXRYIHx8IGUub2Zmc2V0WCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUub2Zmc2V0WCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLm9mZnNldFkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoXCJvbmNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHBpY3R1cmUgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc0ltYWdlKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5fX2lzSW1hZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIG9iai5fX2lzSW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHN0cmluZyBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICB9XG59O1xuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5uYW1lID0gXCJCYXNlUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFN0cm9rZShjb2xvciA9IFwiIzAwMDAwMFwiLCB0aGlua25lc3MgPSAxKSB7XG4gICAgdGhpcy5zdHJva2UgPSB7IGNvbG9yLCB0aGlua25lc3MgfTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZUFmdGVyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyQWRkZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlclJlbW92ZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZURlYWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwcm90b247XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0ltYWdlIG1ldGhvZFxuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZSBkcmF3Q2lyY2xlIC0tXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY2lyY2xlXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvLyBwcml2YXRlIGNyZWF0ZUJ1ZmZlclxuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoVHlwZXMuaXNJbWFnZShpbWFnZSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBpbWFnZS53aWR0aCArIFwiX1wiICsgaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV07XG5cbiAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdID0gY2FudmFzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtM2QgPSBmYWxzZTtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRvbVJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zZCkge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybTNkKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0ocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUub3BhY2l0eSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgICBpZiAocGFydGljbGUuYm9keS5pc0NpcmNsZSkge1xuICAgICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGJvZHlSZWFkeShwYXJ0aWNsZSkge1xuICAgIHJldHVybiB0eXBlb2YgcGFydGljbGUuYm9keSA9PT0gXCJvYmplY3RcIiAmJiBwYXJ0aWNsZS5ib2R5ICYmICFwYXJ0aWNsZS5ib2R5LmlzSW5uZXI7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChpbWcsIHBhcnRpY2xlKTtcbiAgICBEb21VdGlsLnJlc2l6ZShwYXJ0aWNsZS5ib2R5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIDIgKiBwYXJ0aWNsZS5yYWRpdXMsIDIgKiBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHtwYXJ0aWNsZS5yYWRpdXN9cHhgO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJXaWR0aCA9IGAke3RoaXMuc3Ryb2tlLnRoaW5rbmVzc31weGA7XG4gICAgfVxuICAgIGRvbS5pc0NpcmNsZSA9IHRydWU7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdXJsID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIgPyBib2R5IDogYm9keS5zcmM7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIGJvZHkud2lkdGgsIGJvZHkuaGVpZ2h0KTtcbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3VybH0pYDtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc2VsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMubmFtZSA9IFwiRWFzZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgdGhpcy5jcmVhdGVTcHJpdGUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHBhcnRpY2xlLmJvZHkuc2NhbGVYID0gcGFydGljbGUuYm9keS5zY2FsZVkgPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICAgIHBhcnRpY2xlLmJvZHkucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnBhcmVudCAmJiBwYXJ0aWNsZS5ib2R5LnBhcmVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUuZ3JhcGhpY3MpIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuZ3JhcGhpY3MpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBjcmVhdGVTcHJpdGUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5LnBhcmVudCkgcmV0dXJuO1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5W1wiaW1hZ2VcIl0pIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWCA9IHBhcnRpY2xlLmJvZHkuaW1hZ2Uud2lkdGggLyAyO1xuICAgICAgcGFydGljbGUuYm9keS5yZWdZID0gcGFydGljbGUuYm9keS5pbWFnZS5oZWlnaHQgLyAyO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gdGhpcy5wb29sLmdldChjcmVhdGVqcy5HcmFwaGljcyk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkpIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UodGhpcy5zdHJva2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UoXCIjMDAwMDAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCIpLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMucG9vbC5nZXQoY3JlYXRlanMuU2hhcGUsIFtncmFwaGljc10pO1xuXG4gICAgcGFydGljbGUuYm9keSA9IHNoYXBlO1xuICAgIHBhcnRpY2xlLmdyYXBoaWNzID0gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgcmVjdGFuZ2xlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLmNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhlbFJlbmRlcmVyXCI7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBjcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGUgPyByZWN0YW5nbGUgOiBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCh0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55LCB0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICB0aGlzLnJlY3RhbmdsZS54LFxuICAgICAgdGhpcy5yZWN0YW5nbGUueSxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLndpZHRoLFxuICAgICAgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhKSB7XG4gICAgICB0aGlzLnNldFBpeGVsKFxuICAgICAgICB0aGlzLmltYWdlRGF0YSxcbiAgICAgICAgKHBhcnRpY2xlLnAueCAtIHRoaXMucmVjdGFuZ2xlLngpID4+IDAsXG4gICAgICAgIChwYXJ0aWNsZS5wLnkgLSB0aGlzLnJlY3RhbmdsZS55KSA+PiAwLFxuICAgICAgICBwYXJ0aWNsZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQaXhlbChpbWFnZWRhdGEsIHgsIHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgcmdiID0gcGFydGljbGUucmdiO1xuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5lbGVtZW50LndpZHRoIHx8IHkgPCAwIHx8IHkgPiB0aGlzLmVsZW1lbnR3aWR0aCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIGltYWdlZGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaV0gPSByZ2IucjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMV0gPSByZ2IuZztcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMl0gPSByZ2IuYjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgM10gPSBwYXJ0aWNsZS5hbHBoYSAqIDI1NTtcbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5sZXQgUElYSUNsYXNzO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4aVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLmNvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuYmxlbmRNb2RlID0gbnVsbDtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuc2V0UElYSSh3aW5kb3cuUElYSSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGlSZW5kZXJlclwiO1xuICB9XG5cbiAgc2V0UElYSShQSVhJKSB7XG4gICAgdHJ5IHtcbiAgICAgIFBJWElDbGFzcyA9IFBJWEkgfHwgeyBTcHJpdGU6IHt9IH07XG4gICAgICB0aGlzLmNyZWF0ZUZyb21JbWFnZSA9IFBJWElDbGFzcy5TcHJpdGUuZnJvbSB8fCBQSVhJQ2xhc3MuU3ByaXRlLmZyb21JbWFnZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICB0aGlzLnRyYW5zZm9ybShwYXJ0aWNsZSwgcGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAodGhpcy5zZXRDb2xvciA9PT0gdHJ1ZSB8fCB0aGlzLmNvbG9yID09PSB0cnVlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnRpbnQgPSBDb2xvclV0aWwuZ2V0SGV4MTZGcm9tUGFydGljbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICB0cmFuc2Zvcm0ocGFydGljbGUsIHRhcmdldCkge1xuICAgIHRhcmdldC54ID0gcGFydGljbGUucC54O1xuICAgIHRhcmdldC55ID0gcGFydGljbGUucC55O1xuXG4gICAgdGFyZ2V0LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0YXJnZXQuc2NhbGUueCA9IHBhcnRpY2xlLnNjYWxlO1xuICAgIHRhcmdldC5zY2FsZS55ID0gcGFydGljbGUuc2NhbGU7XG5cbiAgICAvLyB1c2luZyBjYWNoZWQgdmVyc2lvbiBvZiBNYXRoVXRpbC5QSV8xODAgZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZS5cbiAgICB0YXJnZXQucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDsgLy8gTWF0aFV0aWwuUElfMTgwO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHkpO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHkpIHtcbiAgICBjb25zdCBzcHJpdGUgPSBib2R5LmlzSW5uZXIgPyB0aGlzLmNyZWF0ZUZyb21JbWFnZShib2R5LnNyYykgOiBuZXcgUElYSUNsYXNzLlNwcml0ZShib2R5KTtcblxuICAgIHNwcml0ZS5hbmNob3IueCA9IDAuNTtcbiAgICBzcHJpdGUuYW5jaG9yLnkgPSAwLjU7XG5cbiAgICByZXR1cm4gc3ByaXRlO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSUNsYXNzLkdyYXBoaWNzKCk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGNvbnN0IHN0cm9rZSA9IFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSA/IHRoaXMuc3Ryb2tlIDogMHgwMDAwMDA7XG4gICAgICBncmFwaGljcy5iZWdpblN0cm9rZShzdHJva2UpO1xuICAgIH1cblxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCAweDAwOGNlZCk7XG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcblxuICAgIHJldHVybiBncmFwaGljcztcbiAgfVxuXG4gIGRlc3Ryb3kocGFydGljbGVzKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgbGV0IGkgPSBwYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXTtcbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTVN0YWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXRzID0gW107XG4gICAgdGhpcy5zaXplID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykgdGhpcy5tYXRzLnB1c2goTWF0My5jcmVhdGUoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XG4gIH1cblxuICBzZXQobSwgaSkge1xuICAgIGlmIChpID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbaSAtIDFdLCBtLCB0aGlzLm1hdHNbaV0pO1xuXG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgodGhpcy5zaXplLCBpICsgMSk7XG4gIH1cblxuICBwdXNoKG0pIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV0sIG0sIHRoaXMubWF0c1t0aGlzLnNpemVdKTtcblxuICAgIHRoaXMuc2l6ZSsrO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIGlmICh0aGlzLnNpemUgPiAwKSB0aGlzLnNpemUtLTtcbiAgfVxuXG4gIHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBNU3RhY2sgZnJvbSBcIi4uL3V0aWxzL01TdGFja1wiO1xuaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4uL3V0aWxzL1dlYkdMVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmdsID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgeyBhbnRpYWxpYXM6IHRydWUsIHN0ZW5jaWw6IGZhbHNlLCBkZXB0aDogZmFsc2UgfSk7XG4gICAgaWYgKCF0aGlzLmdsKSBhbGVydChcIlNvcnJ5IHlvdXIgYnJvd3NlciBkbyBub3Qgc3VwcGVzdCBXZWJHTCFcIik7XG5cbiAgICB0aGlzLmluaXRWYXIoKTtcbiAgICB0aGlzLnNldE1heFJhZGl1cygpO1xuICAgIHRoaXMuaW5pdFNoYWRlcnMoKTtcbiAgICB0aGlzLmluaXRCdWZmZXJzKCk7XG5cbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbC5GVU5DX0FERCk7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiV2ViR0xSZW5kZXJlclwiO1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICBzdXBlci5pbml0KHByb3Rvbik7XG4gICAgdGhpcy5yZXNpemUodGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy51bWF0WzRdID0gLTI7XG4gICAgdGhpcy51bWF0WzddID0gMTtcblxuICAgIHRoaXMuc21hdFswXSA9IDEgLyB3aWR0aDtcbiAgICB0aGlzLnNtYXRbNF0gPSAxIC8gaGVpZ2h0O1xuXG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMudW1hdCwgMCk7XG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMuc21hdCwgMSk7XG5cbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRNYXhSYWRpdXMocmFkaXVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNVUkwgPSB0aGlzLmNyZWF0ZUNpcmNsZShyYWRpdXMpO1xuICB9XG5cbiAgZ2V0VmVydGV4U2hhZGVyKCkge1xuICAgIGNvbnN0IHZzU291cmNlID0gW1xuICAgICAgXCJ1bmlmb3JtIHZlYzIgdmlld3BvcnQ7XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidW5pZm9ybSBtYXQzIHRNYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzMgdiA9IHRNYXQgKiB2ZWMzKGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcIixcbiAgICAgIFwiZ2xfUG9zaXRpb24gPSB2ZWM0KHYueCwgdi55LCAwLCAxKTtcIixcbiAgICAgIFwidlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcImFscGhhID0gdE1hdFswXVsyXTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiB2c1NvdXJjZTtcbiAgfVxuXG4gIGdldEZyYWdtZW50U2hhZGVyKCkge1xuICAgIGNvbnN0IGZzU291cmNlID0gW1xuICAgICAgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzQgY29sb3I7XCIsXG4gICAgICBcInVuaWZvcm0gYm9vbCB1c2VUZXh0dXJlO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzMgdUNvbG9yO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZUNvbG9yICogdmVjNCh1Q29sb3IsIDEuMCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvci53ICo9IGFscGhhO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIGZzU291cmNlO1xuICB9XG5cbiAgaW5pdFZhcigpIHtcbiAgICB0aGlzLm1zdGFjayA9IG5ldyBNU3RhY2soKTtcbiAgICB0aGlzLnVtYXQgPSBNYXQzLmNyZWF0ZShbMiwgMCwgMSwgMCwgLTIsIDAsIC0xLCAxLCAxXSk7XG4gICAgdGhpcy5zbWF0ID0gTWF0My5jcmVhdGUoWzEgLyAxMDAsIDAsIDEsIDAsIDEgLyAxMDAsIDAsIDAsIDAsIDFdKTtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0ge307XG4gIH1cblxuICBibGVuZEVxdWF0aW9uKEEpIHtcbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbFtBXSk7XG4gIH1cblxuICBibGVuZEZ1bmMoQSwgQikge1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2xbQV0sIHRoaXMuZ2xbQl0pO1xuICB9XG5cbiAgZ2V0U2hhZGVyKGdsLCBzdHIsIGZzKSB7XG4gICAgY29uc3Qgc2hhZGVyID0gZnMgPyBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKSA6IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcblxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHN0cik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgaW5pdFNoYWRlcnMoKSB7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyKCksIHRydWUpO1xuICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0VmVydGV4U2hhZGVyKCksIGZhbHNlKTtcblxuICAgIHRoaXMuc3Byb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5zcHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIGFsZXJ0KFwiQ291bGQgbm90IGluaXRpYWxpc2Ugc2hhZGVyc1wiKTtcblxuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcbiAgICB0aGlzLnNwcm9ncmFtLnZwYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVmVydGV4UG9zaXRpb25cIik7XG4gICAgdGhpcy5zcHJvZ3JhbS50Y2EgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVRleHR1cmVDb29yZFwiKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udGNhKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udnBhKTtcblxuICAgIHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInRNYXRcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidVNhbXBsZXJcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS51c2VUZXggPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVzZVRleHR1cmVcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5jb2xvciA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidUNvbG9yXCIpO1xuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0udXNlVGV4LCAxKTtcbiAgfVxuXG4gIGluaXRCdWZmZXJzKCkge1xuICAgIGNvbnN0IHZzID0gWzAsIDMsIDEsIDAsIDIsIDNdO1xuICAgIGxldCBpZHg7XG5cbiAgICB0aGlzLnVuaXRJQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh2cyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgbGV0IGk7XG4gICAgbGV0IGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSk7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnVuaXRJMzMgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJMzMpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpLCBpICsgMSwgaSArIDIpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy5zdHJpcEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuc3RyaXBCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHJhaWR1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzID0gV2ViR0xVdGlsLm5ocG90KFV0aWwuaW5pdFZhbHVlKHJhaWR1cywgMzIpKTtcbiAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhcImNpcmNsZV9jYW52YXNcIiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfVxuXG4gIGRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgX3cgPSBwYXJ0aWNsZS5ib2R5LndpZHRoO1xuICAgIGNvbnN0IF9oID0gcGFydGljbGUuYm9keS5oZWlnaHQ7XG5cbiAgICBjb25zdCBfd2lkdGggPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS53aWR0aCk7XG4gICAgY29uc3QgX2hlaWdodCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LmhlaWdodCk7XG5cbiAgICBjb25zdCBfc2NhbGVYID0gcGFydGljbGUuYm9keS53aWR0aCAvIF93aWR0aDtcbiAgICBjb25zdCBfc2NhbGVZID0gcGFydGljbGUuYm9keS5oZWlnaHQgLyBfaGVpZ2h0O1xuXG4gICAgaWYgKCF0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSlcbiAgICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdID0gW1xuICAgICAgICB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKVxuICAgICAgXTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZSA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzBdO1xuICAgIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsxXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMl07XG5cbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF9zY2FsZVgsIDAuMCwgMC4wLCBfc2NhbGVZLCBfc2NhbGVZLCBfc2NhbGVZXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF93LCAwLjAsIDAuMCwgX2gsIF93LCBfaF0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gcGFydGljbGUuZGF0YS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xuXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpO1xuICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggPSBfdztcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgPSBfaDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIC8vIHRoaXMuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAxKTtcbiAgICAvLyB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IGZhbHNlO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS50bWF0WzhdID0gMTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdFs4XSA9IDE7XG5cbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZSh0aGlzLmNpcmNsZUNhbnZhc1VSTCwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IHBhcnRpY2xlLnJhZGl1cyAvIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgICBwYXJ0aWNsZS5kYXRhLnNyYyA9IGltZy5zcmM7XG4gICAgcGFydGljbGUuZGF0YS5jYW52YXMgPSBJbWdVdGlsLmdldENhbnZhc0Zyb21DYWNoZShpbWcpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSAxO1xuXG4gICAgdGhpcy5kcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCkge1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgocGFydGljbGUpO1xuXG4gICAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNwcm9ncmFtLmNvbG9yLCBwYXJ0aWNsZS5yZ2IuciAvIDI1NSwgcGFydGljbGUucmdiLmcgLyAyNTUsIHBhcnRpY2xlLnJnYi5iIC8gMjU1KTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtLCBmYWxzZSwgdGhpcy5tc3RhY2sudG9wKCkpO1xuXG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udnBhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udGNhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0sIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuXG4gICAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgNiwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICB0aGlzLm1zdGFjay5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICB1cGRhdGVNYXRyaXgocGFydGljbGUpIHtcbiAgICBjb25zdCBtb3ZlT3JpZ2luTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCAvIDIsXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcblxuICAgIGNvbnN0IGFuZ2VsID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7XG4gICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVJvdGF0aW9uKGFuZ2VsKTtcblxuICAgIGNvbnN0IHNjYWxlID0gcGFydGljbGUuc2NhbGUgKiBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlO1xuICAgIGNvbnN0IHNjYWxlTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgIGxldCBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobW92ZU9yaWdpbk1hdHJpeCwgc2NhbGVNYXRyaXgpO1xuXG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgcm90YXRpb25NYXRyaXgpO1xuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHRyYW5zbGF0aW9uTWF0cml4KTtcblxuICAgIE1hdDMuaW52ZXJzZShtYXRyaXgsIHBhcnRpY2xlLmRhdGEuaW1hdCk7XG4gICAgbWF0cml4WzJdID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0aGlzLm1zdGFjay5wdXNoKG1hdHJpeCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdsID0gbnVsbDtcbiAgICB0aGlzLm1zdGFjayA9IG51bGw7XG4gICAgdGhpcy51bWF0ID0gbnVsbDtcbiAgICB0aGlzLnNtYXQgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tUmVuZGVyZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZGlyZWN0aW9uKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh4MiAtIHgxID49IDApIHtcbiAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54MSA9IHgyO1xuICAgICAgdGhpcy55MSA9IHkyO1xuICAgICAgdGhpcy54MiA9IHgxO1xuICAgICAgdGhpcy55MiA9IHkxO1xuICAgIH1cblxuICAgIHRoaXMuZHggPSB0aGlzLngyIC0gdGhpcy54MTtcbiAgICB0aGlzLmR5ID0gdGhpcy55MiAtIHRoaXMueTE7XG5cbiAgICB0aGlzLm1pbnggPSBNYXRoLm1pbih0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1pbnkgPSBNYXRoLm1pbih0aGlzLnkxLCB0aGlzLnkyKTtcbiAgICB0aGlzLm1heHggPSBNYXRoLm1heCh0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1heHkgPSBNYXRoLm1heCh0aGlzLnkxLCB0aGlzLnkyKTtcblxuICAgIHRoaXMuZG90ID0gdGhpcy54MiAqIHRoaXMueTEgLSB0aGlzLngxICogdGhpcy55MjtcbiAgICB0aGlzLnh4eXkgPSB0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5O1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlsLmluaXRWYWx1ZShkaXJlY3Rpb24sIFwiPlwiKTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLmNvcyh0aGlzLmdyYWRpZW50KTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLnNpbih0aGlzLmdyYWRpZW50KTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQiA9PT0gMCA/IDEgOiBCO1xuXG4gICAgaWYgKChBICogeCArIEIgKiB5ICsgQykgKiBEID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXREaXN0YW5jZSh4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQSAqIHggKyBCICogeSArIEM7XG5cbiAgICByZXR1cm4gRCAvIE1hdGguc3FydCh0aGlzLnh4eXkpO1xuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHYpIHtcbiAgICBjb25zdCB0aGEyID0gdi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG5cbiAgICBjb25zdCBvbGR4ID0gdi54O1xuICAgIGNvbnN0IG9sZHkgPSB2Lnk7XG5cbiAgICB2LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMuZHksIHRoaXMuZHgpO1xuICB9XG5cbiAgcmFuZ2VPdXQocGFydGljbGUpIHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYWJzKHRoaXMuZ2V0R3JhZGllbnQoKSk7XG5cbiAgICBpZiAoYW5nbGUgPD0gTWF0aFV0aWwuUEkgLyA0KSB7XG4gICAgICBpZiAocGFydGljbGUucC54IDw9IHRoaXMubWF4eCAmJiBwYXJ0aWNsZS5wLnggPj0gdGhpcy5taW54KSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueSA8PSB0aGlzLm1heHkgJiYgcGFydGljbGUucC55ID49IHRoaXMubWlueSkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keSk7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCI+XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiUlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcblxuICAgICAgaWYgKHRoaXMuZ2V0RGlzdGFuY2UocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpIDw9IHBhcnRpY2xlLnJhZGl1cykge1xuICAgICAgICBpZiAodGhpcy5keCA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR5ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlLnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIExpbmVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLmNlbnRlciA9IHsgeCwgeSB9O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJeDIgKiBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMucmFuZG9tUmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgc2V0Q2VudGVyKHgsIHkpIHtcbiAgICB0aGlzLmNlbnRlci54ID0geDtcbiAgICB0aGlzLmNlbnRlci55ID0geTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZCA9IHBhcnRpY2xlLnAuZGlzdGFuY2VUbyh0aGlzLmNlbnRlcik7XG5cbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAoZCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMucmFkaXVzKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChkICsgcGFydGljbGUucmFkaXVzID49IHRoaXMucmFkaXVzKSB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIENpcmNsZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdGhhMiA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudChwYXJ0aWNsZSk7XG5cbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcbiAgICBjb25zdCBvbGR4ID0gcGFydGljbGUudi54O1xuICAgIGNvbnN0IG9sZHkgPSBwYXJ0aWNsZS52Lnk7XG5cbiAgICBwYXJ0aWNsZS52LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHBhcnRpY2xlLnYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG4gIH1cblxuICBnZXRHcmFkaWVudChwYXJ0aWNsZSkge1xuICAgIHJldHVybiAtTWF0aFV0aWwuUElfMiArIE1hdGguYXRhbjIocGFydGljbGUucC55IC0gdGhpcy5jZW50ZXIueSwgcGFydGljbGUucC54IC0gdGhpcy5jZW50ZXIueCk7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIC8vIHBhcnRpY2xlIGRlYWQgem9uZVxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGJvdW5kIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBjcm9zcyB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCAmJiBwYXJ0aWNsZS52LnggPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoICYmIHBhcnRpY2xlLnYueCA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAmJiBwYXJ0aWNsZS52LnkgPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQgJiYgcGFydGljbGUudi55ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXNldChpbWFnZURhdGEsIHgsIHksIGQpO1xuICB9XG5cbiAgcmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBpbWFnZURhdGE7XG4gICAgdGhpcy54ID0gVXRpbC5pbml0VmFsdWUoeCwgMCk7XG4gICAgdGhpcy55ID0gVXRpbC5pbml0VmFsdWUoeSwgMCk7XG4gICAgdGhpcy5kID0gVXRpbC5pbml0VmFsdWUoZCwgMik7XG5cbiAgICB0aGlzLnZlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNldFZlY3RvcnMoKTtcbiAgfVxuXG4gIHNldFZlY3RvcnMoKSB7XG4gICAgbGV0IGksIGo7XG4gICAgY29uc3QgbGVuZ3RoMSA9IHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGxlbmd0aDIgPSB0aGlzLmltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSArPSB0aGlzLmQpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGgyOyBqICs9IHRoaXMuZCkge1xuICAgICAgICBsZXQgaW5kZXggPSAoKGogPj4gMCkgKiBsZW5ndGgxICsgKGkgPj4gMCkpICogNDtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkge1xuICAgICAgICAgIHRoaXMudmVjdG9ycy5wdXNoKHsgeDogaSArIHRoaXMueCwgeTogaiArIHRoaXMueSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldEJvdW5kKHgsIHkpIHtcbiAgICBjb25zdCBpbmRleCA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB2ZWN0b3IgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy52ZWN0b3JzKTtcbiAgICByZXR1cm4gdGhpcy52ZWN0b3IuY29weSh2ZWN0b3IpO1xuICB9XG5cbiAgZ2V0Q29sb3IoeCwgeSkge1xuICAgIHggLT0gdGhpcy54O1xuICAgIHkgLT0gdGhpcy55O1xuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogdGhpcy5pbWFnZURhdGEuZGF0YVtpXSxcbiAgICAgIGc6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDFdLFxuICAgICAgYjogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMl0sXG4gICAgICBhOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAzXVxuICAgIH07XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIHBhcnRpY2xlLmRlYWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLnYubmVnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4uL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi4vem9uZS9SZWN0Wm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCBmdW5jKSB7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsICgpID0+IGZ1bmMoKSk7XG4gIH0sXG5cbiAgZ2V0U3R5bGUoY29sb3IgPSBcIiNmZjAwMDBcIikge1xuICAgIGNvbnN0IHJnYiA9IENvbG9yVXRpbC5oZXhUb1JnYihjb2xvcik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cmdiLnJ9LCAke3JnYi5nfSwgJHtyZ2IuYn0sIDAuNSlgO1xuICB9LFxuXG4gIGRyYXdab25lKHByb3RvbiwgY2FudmFzLCB6b25lLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBpZiAoem9uZSBpbnN0YW5jZW9mIFBvaW50Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBMaW5lWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHpvbmUueDEsIHpvbmUueTEpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyh6b25lLngyLCB6b25lLnkyKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIFJlY3Rab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5kcmF3UmVjdCh6b25lLngsIHpvbmUueSwgem9uZS53aWR0aCwgem9uZS5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgQ2lyY2xlWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCB6b25lLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRyYXdFbWl0dGVyKHByb3RvbiwgY2FudmFzLCBlbWl0dGVyLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgIGNvbnRleHQuYXJjKGVtaXR0ZXIucC54LCBlbWl0dGVyLnAueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgUG9vbCBmcm9tIFwiLi9jb3JlL1Bvb2xcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0MyBmcm9tIFwiLi9tYXRoL01hdDNcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuL21hdGgvU3BhblwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4vbWF0aC9lYXNlXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTGlmZSBmcm9tIFwiLi9pbml0aWFsaXplL0xpZmVcIjtcbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi9pbml0aWFsaXplL1Bvc2l0aW9uXCI7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9WZWxvY2l0eVwiO1xuaW1wb3J0IE1hc3MgZnJvbSBcIi4vaW5pdGlhbGl6ZS9NYXNzXCI7XG5pbXBvcnQgUmFkaXVzIGZyb20gXCIuL2luaXRpYWxpemUvUmFkaXVzXCI7XG5pbXBvcnQgQm9keSBmcm9tIFwiLi9pbml0aWFsaXplL0JvZHlcIjtcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9iZWhhdmlvdXIvQmVoYXZpb3VyXCI7XG5pbXBvcnQgRm9yY2UgZnJvbSBcIi4vYmVoYXZpb3VyL0ZvcmNlXCI7XG5pbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQXR0cmFjdGlvblwiO1xuaW1wb3J0IFJhbmRvbURyaWZ0IGZyb20gXCIuL2JlaGF2aW91ci9SYW5kb21EcmlmdFwiO1xuaW1wb3J0IEdyYXZpdHkgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlcIjtcbmltcG9ydCBDb2xsaXNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0NvbGxpc2lvblwiO1xuaW1wb3J0IENyb3NzWm9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3Jvc3Nab25lXCI7XG5pbXBvcnQgQWxwaGEgZnJvbSBcIi4vYmVoYXZpb3VyL0FscGhhXCI7XG5pbXBvcnQgU2NhbGUgZnJvbSBcIi4vYmVoYXZpb3VyL1NjYWxlXCI7XG5pbXBvcnQgUm90YXRlIGZyb20gXCIuL2JlaGF2aW91ci9Sb3RhdGVcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sb3JcIjtcbmltcG9ydCBDeWNsb25lIGZyb20gXCIuL2JlaGF2aW91ci9DeWNsb25lXCI7XG5pbXBvcnQgUmVwdWxzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9SZXB1bHNpb25cIjtcbmltcG9ydCBHcmF2aXR5V2VsbCBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVdlbGxcIjtcblxuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9FbWl0dGVyXCI7XG5pbXBvcnQgQmVoYXZpb3VyRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0JlaGF2aW91ckVtaXR0ZXJcIjtcbmltcG9ydCBGb2xsb3dFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRm9sbG93RW1pdHRlclwiO1xuXG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0NhbnZhc1JlbmRlcmVyXCI7XG5pbXBvcnQgRG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0RvbVJlbmRlcmVyXCI7XG5pbXBvcnQgRWFzZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRWFzZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGVsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGVsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhpUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGlSZW5kZXJlclwiO1xuaW1wb3J0IFdlYkdMUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1dlYkdMUmVuZGVyZXJcIjtcbmltcG9ydCBDdXN0b21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ3VzdG9tUmVuZGVyZXJcIjtcblxuaW1wb3J0IFpvbmUgZnJvbSBcIi4vem9uZS9ab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4vem9uZS9SZWN0Wm9uZVwiO1xuaW1wb3J0IEltYWdlWm9uZSBmcm9tIFwiLi96b25lL0ltYWdlWm9uZVwiO1xuXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4vZGVidWcvRGVidWdcIjtcblxuLy8gbmFtZXNwYWNlXG5Qcm90b24uUGFydGljbGUgPSBQYXJ0aWNsZTtcblByb3Rvbi5Qb29sID0gUG9vbDtcblxuUHJvdG9uLlV0aWwgPSBVdGlsO1xuUHJvdG9uLkNvbG9yVXRpbCA9IENvbG9yVXRpbDtcblByb3Rvbi5NYXRoVXRpbCA9IE1hdGhVdGlsO1xuUHJvdG9uLlZlY3RvcjJEID0gUHJvdG9uLlZlY3RvciA9IFZlY3RvcjJEO1xuUHJvdG9uLlBvbGFyMkQgPSBQcm90b24uUG9sYXIgPSBQb2xhcjJEO1xuUHJvdG9uLkFycmF5U3BhbiA9IEFycmF5U3BhbjtcblByb3Rvbi5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG5Qcm90b24uUmF0ZSA9IFJhdGU7XG5Qcm90b24uZWFzZSA9IGVhc2U7XG5Qcm90b24uU3BhbiA9IFNwYW47XG5Qcm90b24uTWF0MyA9IE1hdDM7XG5Qcm90b24uZ2V0U3BhbiA9IChhLCBiLCBjZW50ZXIpID0+IG5ldyBTcGFuKGEsIGIsIGNlbnRlcik7XG5Qcm90b24uY3JlYXRlQXJyYXlTcGFuID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbjtcblxuUHJvdG9uLkluaXRpYWxpemUgPSBQcm90b24uSW5pdCA9IEluaXRpYWxpemU7XG5Qcm90b24uTGlmZSA9IFByb3Rvbi5MID0gTGlmZTtcblByb3Rvbi5Qb3NpdGlvbiA9IFByb3Rvbi5QID0gUG9zaXRpb247XG5Qcm90b24uVmVsb2NpdHkgPSBQcm90b24uViA9IFZlbG9jaXR5O1xuUHJvdG9uLk1hc3MgPSBQcm90b24uTSA9IE1hc3M7XG5Qcm90b24uUmFkaXVzID0gUHJvdG9uLlIgPSBSYWRpdXM7XG5Qcm90b24uQm9keSA9IFByb3Rvbi5CID0gQm9keTtcblxuUHJvdG9uLkJlaGF2aW91ciA9IEJlaGF2aW91cjtcblByb3Rvbi5Gb3JjZSA9IFByb3Rvbi5GID0gRm9yY2U7XG5Qcm90b24uQXR0cmFjdGlvbiA9IFByb3Rvbi5BID0gQXR0cmFjdGlvbjtcblByb3Rvbi5SYW5kb21EcmlmdCA9IFByb3Rvbi5SRCA9IFJhbmRvbURyaWZ0O1xuUHJvdG9uLkdyYXZpdHkgPSBQcm90b24uRyA9IEdyYXZpdHk7XG5Qcm90b24uQ29sbGlzaW9uID0gQ29sbGlzaW9uO1xuUHJvdG9uLkNyb3NzWm9uZSA9IENyb3NzWm9uZTtcblByb3Rvbi5BbHBoYSA9IEFscGhhO1xuUHJvdG9uLlNjYWxlID0gUHJvdG9uLlMgPSBTY2FsZTtcblByb3Rvbi5Sb3RhdGUgPSBSb3RhdGU7XG5Qcm90b24uQ29sb3IgPSBDb2xvcjtcblByb3Rvbi5SZXB1bHNpb24gPSBSZXB1bHNpb247XG5Qcm90b24uQ3ljbG9uZSA9IEN5Y2xvbmU7XG5Qcm90b24uR3Jhdml0eVdlbGwgPSBHcmF2aXR5V2VsbDtcblxuUHJvdG9uLkVtaXR0ZXIgPSBFbWl0dGVyO1xuUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXIgPSBCZWhhdmlvdXJFbWl0dGVyO1xuUHJvdG9uLkZvbGxvd0VtaXR0ZXIgPSBGb2xsb3dFbWl0dGVyO1xuXG5Qcm90b24uWm9uZSA9IFpvbmU7XG5Qcm90b24uTGluZVpvbmUgPSBMaW5lWm9uZTtcblByb3Rvbi5DaXJjbGVab25lID0gQ2lyY2xlWm9uZTtcblByb3Rvbi5Qb2ludFpvbmUgPSBQb2ludFpvbmU7XG5Qcm90b24uUmVjdFpvbmUgPSBSZWN0Wm9uZTtcblByb3Rvbi5JbWFnZVpvbmUgPSBJbWFnZVpvbmU7XG5cblByb3Rvbi5DYW52YXNSZW5kZXJlciA9IENhbnZhc1JlbmRlcmVyO1xuUHJvdG9uLkRvbVJlbmRlcmVyID0gRG9tUmVuZGVyZXI7XG5Qcm90b24uRWFzZWxSZW5kZXJlciA9IEVhc2VsUmVuZGVyZXI7XG5Qcm90b24uUGl4aVJlbmRlcmVyID0gUGl4aVJlbmRlcmVyO1xuUHJvdG9uLlBpeGVsUmVuZGVyZXIgPSBQaXhlbFJlbmRlcmVyO1xuUHJvdG9uLldlYkdMUmVuZGVyZXIgPSBQcm90b24uV2ViR2xSZW5kZXJlciA9IFdlYkdMUmVuZGVyZXI7XG5Qcm90b24uQ3VzdG9tUmVuZGVyZXIgPSBDdXN0b21SZW5kZXJlcjtcblxuUHJvdG9uLkRlYnVnID0gRGVidWc7XG5VdGlsLmFzc2lnbihQcm90b24sIGVhc2UpO1xuXG4vLyBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IFByb3RvbjtcbiJdLCJuYW1lcyI6WyJpcG90IiwibGVuZ3RoIiwibmhwb3QiLCJpIiwibWFrZVRyYW5zbGF0aW9uIiwidHgiLCJ0eSIsIm1ha2VSb3RhdGlvbiIsImFuZ2xlSW5SYWRpYW5zIiwiYyIsIk1hdGgiLCJjb3MiLCJzIiwic2luIiwibWFrZVNjYWxlIiwic3giLCJzeSIsIm1hdHJpeE11bHRpcGx5IiwiYSIsImIiLCJhMDAiLCJhMDEiLCJhMDIiLCJhMTAiLCJhMTEiLCJhMTIiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMTAiLCJiMTEiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJjcmVhdGVDYW52YXMiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJjcmVhdGVEaXYiLCJyZXNpemUiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiZGl2IiwieCIsInkiLCJzY2FsZSIsInJvdGF0ZSIsIndpbGxDaGFuZ2UiLCJjc3MzIiwidHJhbnNmb3JtM2QiLCJrZXkiLCJ2YWwiLCJia2V5IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpbWdzQ2FjaGUiLCJjYW52YXNDYWNoZSIsImNhbnZhc0lkIiwiZ2V0SW1hZ2VEYXRhIiwiY29udGV4dCIsImltYWdlIiwicmVjdCIsImRyYXdJbWFnZSIsImltYWdlZGF0YSIsImNsZWFyUmVjdCIsImdldEltZ0Zyb21DYWNoZSIsImltZyIsImNhbGxiYWNrIiwicGFyYW0iLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJnZXRDYW52YXNGcm9tQ2FjaGUiLCJXZWJHTFV0aWwiLCJjYW52YXMiLCJEb21VdGlsIiwiZ2V0Q29udGV4dCIsImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZW1wdHlBcnJheSIsImFyciIsInRvQXJyYXkiLCJnZXRSYW5kRnJvbUFycmF5IiwiZmxvb3IiLCJyYW5kb20iLCJlbXB0eU9iamVjdCIsIm9iaiIsImlnbm9yZSIsImluZGV4T2YiLCJjbGFzc0FwcGx5IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiRmFjdG9yeUZ1bmMiLCJiaW5kIiwiYXBwbHkiLCJjb25jYXQiLCJJbWdVdGlsIiwiZGVzdHJveUFsbCIsImRlc3Ryb3kiLCJhc3NpZ24iLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkc01hcCIsIlB1aWQiLCJfaW5kZXgiLCJfY2FjaGUiLCJ0eXBlIiwiZ2V0SWQiLCJ1aWQiLCJnZXRJZEZyb21DYWNoZSIsImlzQm9keSIsImlzSW5uZXIiLCJnZXRUYXJnZXQiLCJQb29sIiwibnVtIiwidG90YWwiLCJjYWNoZSIsImdldCIsInBhcmFtcyIsInAiLCJfX3B1aWQiLCJwb3AiLCJjcmVhdGVPckNsb25lIiwiZXhwaXJlIiwiZ2V0Q2FjaGUiLCJwdXNoIiwiY3JlYXRlIiwiVXRpbCIsImNsb25lIiwiZ2V0Q291bnQiLCJjb3VudCIsIlN0YXRzIiwicHJvdG9uIiwiY29udGFpbmVyIiwiZW1pdHRlckluZGV4IiwicmVuZGVyZXJJbmRleCIsInVwZGF0ZSIsImJvZHkiLCJhZGQiLCJlbWl0dGVyIiwiZ2V0RW1pdHRlciIsInJlbmRlcmVyIiwiZ2V0UmVuZGVyZXIiLCJzdHIiLCJlbWl0dGVycyIsImVtaXRTcGVlZCIsImdldEVtaXR0ZXJQb3MiLCJpbml0aWFsaXplcyIsImNvbmNhdEFyciIsImJlaGF2aW91cnMiLCJuYW1lIiwiZ2V0Q3JlYXRlZE51bWJlciIsInBvb2wiLCJpbm5lckhUTUwiLCJjc3NUZXh0Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZyIsImNvbG9yIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwicmVuZGVyZXJzIiwicmVzdWx0IiwiY3Bvb2wiLCJyb3VuZCIsInJlbW92ZUNoaWxkIiwiRXZlbnREaXNwYXRjaGVyIiwiX2xpc3RlbmVycyIsImRpc3BhdGNoRXZlbnQiLCJoYXNFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzIiwibGlzdGVuZXIiLCJzcGxpY2UiLCJsaXN0ZW5lcnMiLCJoYW5kbGVyIiwiUEkiLCJJTkZJTklUWSIsIkluZmluaXR5IiwiTWF0aFV0aWwiLCJQSXgyIiwiUElfMiIsIlBJXzE4MCIsIk4xODBfUEkiLCJpc0luZmluaXR5IiwicmFuZG9tQVRvQiIsImlzSW50IiwicmFuZG9tRmxvYXRpbmciLCJjZW50ZXIiLCJmIiwicmFuZG9tQ29sb3IiLCJzbGljZSIsInJhbmRvbVpvbmUiLCJkaXNwbGF5IiwiayIsImRpZ2l0cyIsInBvdyIsImRlZ3JlZVRyYW5zZm9ybSIsInRvQ29sb3IxNiIsIkludGVncmF0aW9uIiwiY2FsY3VsYXRlIiwicGFydGljbGVzIiwidGltZSIsImRhbXBpbmciLCJldWxlckludGVncmF0ZSIsInBhcnRpY2xlIiwic2xlZXAiLCJvbGQiLCJjb3B5IiwidiIsIm11bHRpcGx5U2NhbGFyIiwibWFzcyIsImNsZWFyIiwiUHJvdG9uIiwiaW50ZWdyYXRpb25UeXBlIiwibm93IiwidGhlbiIsImVsYXBzZWQiLCJzdGF0cyIsIkVVTEVSIiwiaW50ZWdyYXRvciIsIl9mcHMiLCJfaW50ZXJ2YWwiLCJERUZBVUxUX0lOVEVSVkFMIiwiYWRkUmVuZGVyZXIiLCJyZW5kZXIiLCJpbml0IiwicmVtb3ZlUmVuZGVyZXIiLCJpbmRleCIsInJlbW92ZSIsImFkZEVtaXR0ZXIiLCJwYXJlbnQiLCJFTUlUVEVSX0FEREVEIiwicmVtb3ZlRW1pdHRlciIsIkVNSVRURVJfUkVNT1ZFRCIsIlBST1RPTl9VUERBVEUiLCJVU0VfQ0xPQ0siLCJEYXRlIiwiZ2V0VGltZSIsImFtZW5kQ2hhbmdlVGFic0J1ZyIsImVtaXR0ZXJzVXBkYXRlIiwiUFJPVE9OX1VQREFURV9BRlRFUiIsImdldEFsbFBhcnRpY2xlcyIsImRlc3Ryb3lBbGxFbWl0dGVycyIsImRlc3Ryb3lPdGhlciIsInNldFRpbWVvdXQiLCJmcHMiLCJNRUFTVVJFIiwiUksyIiwiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX1VQREFURSIsIlBBUlRJQ0xFX1NMRUVQIiwiUEFSVElDTEVfREVBRCIsIlJnYiIsInIiLCJnIiwicmVzZXQiLCJoYXNQcm9wIiwic2V0UHJvcCIsInByb3BzIiwicHJvcCIsIlNwYW4iLCJnZXRTcGFuVmFsdWUiLCJzZXRWZWN0b3JWYWwiLCJjb25mIiwiZWFzZUxpbmVhciIsImVhc2VJblF1YWQiLCJlYXNlT3V0UXVhZCIsImVhc2VJbk91dFF1YWQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblNpbmUiLCJlYXNlT3V0U2luZSIsImVhc2VJbk91dFNpbmUiLCJlYXNlSW5FeHBvIiwiZWFzZU91dEV4cG8iLCJlYXNlSW5PdXRFeHBvIiwiZWFzZUluQ2lyYyIsInNxcnQiLCJlYXNlT3V0Q2lyYyIsImVhc2VJbk91dENpcmMiLCJlYXNlSW5CYWNrIiwiZWFzZU91dEJhY2siLCJlYXNlSW5PdXRCYWNrIiwiZ2V0RWFzaW5nIiwiZWFzZSIsIlZlY3RvcjJEIiwic2V0Iiwic2V0WCIsInNldFkiLCJnZXRHcmFkaWVudCIsImF0YW4yIiwidyIsImFkZFZlY3RvcnMiLCJhZGRYWSIsInN1YiIsInN1YlZlY3RvcnMiLCJkaXZpZGVTY2FsYXIiLCJuZWdhdGUiLCJkb3QiLCJsZW5ndGhTcSIsIm5vcm1hbGl6ZSIsImRpc3RhbmNlVG8iLCJkaXN0YW5jZVRvU3F1YXJlZCIsInRoYSIsImR4IiwiZHkiLCJsZXJwIiwiYWxwaGEiLCJlcXVhbHMiLCJQYXJ0aWNsZSIsImRhdGEiLCJyZ2IiLCJQcm9wVXRpbCIsImdldERpcmVjdGlvbiIsImxpZmUiLCJhZ2UiLCJkZWFkIiwic3ByaXRlIiwiZW5lcmd5IiwicmFkaXVzIiwicm90YXRpb24iLCJlYXNpbmciLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwiYXBwbHlCZWhhdmlvdXJzIiwibWF4IiwiYXBwbHlCZWhhdmlvdXIiLCJhZGRCZWhhdmlvdXIiLCJiZWhhdmlvdXIiLCJwYXJlbnRzIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJoZXhUb1JnYiIsImgiLCJoZXgxNiIsInN1YnN0cmluZyIsInBhcnNlSW50IiwicmdiVG9IZXgiLCJyYmciLCJnZXRIZXgxNkZyb21QYXJ0aWNsZSIsIk51bWJlciIsIlBvbGFyMkQiLCJhYnMiLCJzZXRSIiwic2V0VGhhIiwidG9WZWN0b3IiLCJnZXRYIiwiZ2V0WSIsIk1hdDMiLCJtYXQzIiwibWF0IiwiRmxvYXQzMkFycmF5IiwibWF0MSIsIm1hdDIiLCJtdWx0aXBseSIsImludmVyc2UiLCJkIiwibXVsdGlwbHlWZWMyIiwibSIsInZlYyIsImdldFZhbHVlIiwic2V0U3BhblZhbHVlIiwicGFuIiwiQXJyYXlTcGFuIiwiX2FyciIsImNyZWF0ZUFycmF5U3BhbiIsIlJlY3RhbmdsZSIsImJvdHRvbSIsInJpZ2h0IiwiY29udGFpbnMiLCJSYXRlIiwibnVtcGFuIiwidGltZXBhbiIsIm51bVBhbiIsInRpbWVQYW4iLCJzdGFydFRpbWUiLCJuZXh0VGltZSIsIkluaXRpYWxpemUiLCJMaWZlIiwibGlmZVBhbiIsIlpvbmUiLCJ2ZWN0b3IiLCJjcm9zc1R5cGUiLCJhbGVydCIsImdldFBvc2l0aW9uIiwiY3Jvc3NpbmciLCJQb2ludFpvbmUiLCJjb25zb2xlIiwiZXJyb3IiLCJQb3NpdGlvbiIsInpvbmUiLCJWZWxvY2l0eSIsInJwYW4iLCJ0aGFwYW4iLCJyUGFuIiwidGhhUGFuIiwibm9ybWFsaXplVmVsb2NpdHkiLCJ2ciIsInBvbGFyMmQiLCJNYXNzIiwibWFzc1BhbiIsIlJhZGl1cyIsIm9sZFJhZGl1cyIsIkJvZHkiLCJpbWFnZVRhcmdldCIsImlubmVyIiwiQmVoYXZpb3VyIiwibm9ybWFsaXplRm9yY2UiLCJmb3JjZSIsIm5vcm1hbGl6ZVZhbHVlIiwiRm9yY2UiLCJmeCIsImZ5IiwiQXR0cmFjdGlvbiIsInRhcmdldFBvc2l0aW9uIiwicmFkaXVzU3EiLCJhdHRyYWN0aW9uRm9yY2UiLCJSYW5kb21EcmlmdCIsImRyaWZ0WCIsImRyaWZ0WSIsImRlbGF5IiwicGFuRm9jZSIsIkdyYXZpdHkiLCJDb2xsaXNpb24iLCJjb2xsaXNpb25Qb29sIiwiZGVsdGEiLCJuZXdQb29sIiwib3RoZXJQYXJ0aWNsZSIsIm92ZXJsYXAiLCJ0b3RhbE1hc3MiLCJhdmVyYWdlTWFzczEiLCJhdmVyYWdlTWFzczIiLCJkaXN0YW5jZSIsIkNyb3NzWm9uZSIsIkFscGhhIiwic2FtZSIsImFscGhhQSIsImFscGhhQiIsIlNjYWxlIiwic2NhbGVBIiwic2NhbGVCIiwiUm90YXRlIiwiaW5mbHVlbmNlIiwicm90YXRpb25BIiwicm90YXRpb25CIiwiQ29sb3IiLCJjb2xvckEiLCJDb2xvclV0aWwiLCJjb2xvckIiLCJDSEFOR0lORyIsIkN5Y2xvbmUiLCJhbmdsZSIsInNldEFuZ2xlQW5kRm9yY2UiLCJzcGFuIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJjYW5nbGUiLCJjeWNsb25lIiwiZ3JhZGllbnQiLCJSZXB1bHNpb24iLCJHcmF2aXR5V2VsbCIsImNlbnRlclBvaW50IiwiZGlzdGFuY2VWZWMiLCJkaXN0YW5jZVNxIiwiZmFjdG9yIiwiYmluZEVtaXR0ZXIiLCJFbWl0dGVyIiwiZW1pdFRpbWUiLCJ0b3RhbFRpbWUiLCJyYXRlIiwiZW1pdCIsInN0b3BlZCIsImlzTmFOIiwic3RvcCIsInByZUVtaXQiLCJvbGRTdG9wZWQiLCJvbGRFbWl0VGltZSIsIm9sZFRvdGFsVGltZSIsInN0ZXAiLCJyZW1vdmVBbGxQYXJ0aWNsZXMiLCJhZGRTZWxmSW5pdGlhbGl6ZSIsImluaXRBbGwiLCJhZGRJbml0aWFsaXplIiwicmVzdCIsInJlbW92ZUluaXRpYWxpemUiLCJpbml0aWFsaXplciIsInJlbW92ZUFsbEluaXRpYWxpemVycyIsImFyZ3VtZW50cyIsImVtaXR0aW5nIiwiaW50ZWdyYXRlIiwiZGlzcGF0Y2giLCJldmVudCIsImJpbmRFdmVudCIsImNyZWF0ZVBhcnRpY2xlIiwic2V0dXBQYXJ0aWNsZSIsIkluaXRpYWxpemVVdGlsIiwiQmVoYXZpb3VyRW1pdHRlciIsInNlbGZCZWhhdmlvdXJzIiwiYWRkU2VsZkJlaGF2aW91ciIsInJlbW92ZVNlbGZCZWhhdmlvdXIiLCJGb2xsb3dFbWl0dGVyIiwibW91c2VUYXJnZXQiLCJ3aW5kb3ciLCJfYWxsb3dFbWl0dGluZyIsImluaXRFdmVudEhhbmRsZXIiLCJtb3VzZW1vdmVIYW5kbGVyIiwibW91c2Vtb3ZlIiwibW91c2Vkb3duSGFuZGxlciIsIm1vdXNlZG93biIsIm1vdXNldXBIYW5kbGVyIiwibW91c2V1cCIsImxheWVyWCIsImxheWVyWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiaXNJbWFnZSIsIl9faXNJbWFnZSIsInRhZ05hbWUiLCJub2RlTmFtZSIsImlzU3RyaW5nIiwiQmFzZVJlbmRlcmVyIiwiZWxlbWVudCIsInN0cm9rZSIsImNpcmNsZUNvbmYiLCJpc0NpcmNsZSIsInNldFN0cm9rZSIsInRoaW5rbmVzcyIsIl9wcm90b25VcGRhdGVIYW5kbGVyIiwib25Qcm90b25VcGRhdGUiLCJfcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyIiwib25Qcm90b25VcGRhdGVBZnRlciIsIl9lbWl0dGVyQWRkZWRIYW5kbGVyIiwib25FbWl0dGVyQWRkZWQiLCJfZW1pdHRlclJlbW92ZWRIYW5kbGVyIiwib25FbWl0dGVyUmVtb3ZlZCIsIl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyIiwib25QYXJ0aWNsZUNyZWF0ZWQiLCJfcGFydGljbGVVcGRhdGVIYW5kbGVyIiwib25QYXJ0aWNsZVVwZGF0ZSIsIl9wYXJ0aWNsZURlYWRIYW5kbGVyIiwib25QYXJ0aWNsZURlYWQiLCJDYW52YXNSZW5kZXJlciIsImJ1ZmZlckNhY2hlIiwiYWRkSW1nMkJvZHkiLCJUeXBlcyIsImRyYXdDaXJjbGUiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJidWZDb250ZXh0IiwiZ2xvYmFsQWxwaGEiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyZXN0b3JlIiwiYmVnaW5QYXRoIiwiYXJjIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJjbG9zZVBhdGgiLCJmaWxsIiwic2l6ZSIsIkRvbVJlbmRlcmVyIiwiY3JlYXRlQm9keSIsImJvZHlSZWFkeSIsImJhY2tncm91bmRDb2xvciIsImNyZWF0ZUNpcmNsZSIsImNyZWF0ZVNwcml0ZSIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJ1cmwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJFYXNlbFJlbmRlcmVyIiwiYWRkQ2hpbGQiLCJzY2FsZVgiLCJzY2FsZVkiLCJncmFwaGljcyIsInJlZ1giLCJyZWdZIiwiY3JlYXRlanMiLCJHcmFwaGljcyIsImJlZ2luU3Ryb2tlIiwiYmVnaW5GaWxsIiwic2hhcGUiLCJTaGFwZSIsIlBpeGVsUmVuZGVyZXIiLCJyZWN0YW5nbGUiLCJpbWFnZURhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJwdXRJbWFnZURhdGEiLCJzZXRQaXhlbCIsImVsZW1lbnR3aWR0aCIsIlBJWElDbGFzcyIsIlBpeGlSZW5kZXJlciIsInNldENvbG9yIiwiYmxlbmRNb2RlIiwic2V0UElYSSIsIlBJWEkiLCJTcHJpdGUiLCJjcmVhdGVGcm9tSW1hZ2UiLCJmcm9tIiwiZnJvbUltYWdlIiwidGludCIsImFuY2hvciIsImVuZEZpbGwiLCJNU3RhY2siLCJtYXRzIiwidG9wIiwiV2ViR0xSZW5kZXJlciIsImdsIiwiYW50aWFsaWFzIiwic3RlbmNpbCIsImRlcHRoIiwiaW5pdFZhciIsInNldE1heFJhZGl1cyIsImluaXRTaGFkZXJzIiwiaW5pdEJ1ZmZlcnMiLCJibGVuZEVxdWF0aW9uIiwiRlVOQ19BREQiLCJibGVuZEZ1bmMiLCJTUkNfQUxQSEEiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiZW5hYmxlIiwiQkxFTkQiLCJ1bWF0Iiwic21hdCIsIm1zdGFjayIsInZpZXdwb3J0IiwiY2lyY2xlQ2FudmFzVVJMIiwiZ2V0VmVydGV4U2hhZGVyIiwidnNTb3VyY2UiLCJnZXRGcmFnbWVudFNoYWRlciIsImZzU291cmNlIiwidGV4dHVyZWJ1ZmZlcnMiLCJBIiwiQiIsImdldFNoYWRlciIsImZzIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJmcmFnbWVudFNoYWRlciIsInZlcnRleFNoYWRlciIsInNwcm9ncmFtIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwidXNlUHJvZ3JhbSIsInZwYSIsImdldEF0dHJpYkxvY2F0aW9uIiwidGNhIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ0TWF0VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInNhbXBsZXJVbmlmb3JtIiwidXNlVGV4IiwidW5pZm9ybTFpIiwidnMiLCJpZHgiLCJ1bml0SUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJVaW50MTZBcnJheSIsIlNUQVRJQ19EUkFXIiwiaWRzIiwidW5pdEkzMyIsInN0cmlwQnVmZmVyIiwicmFpZHVzIiwiY2lyY2xlQ2FudmFzUmFkaXVzIiwidG9EYXRhVVJMIiwiZHJhd0ltZzJDYW52YXMiLCJfdyIsIl9oIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiY3JlYXRlVGV4dHVyZSIsInRleHR1cmUiLCJ2Y0J1ZmZlciIsInRjQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4SW1hZ2UyRCIsIlJHQkEiLCJVTlNJR05FRF9CWVRFIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIkxJTkVBUiIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIiwidGV4dHVyZUxvYWRlZCIsInRleHR1cmVXaWR0aCIsInRleHR1cmVIZWlnaHQiLCJ0bWF0IiwiaW1hdCIsIm9sZFNjYWxlIiwidXBkYXRlTWF0cml4IiwidW5pZm9ybTNmIiwidW5pZm9ybU1hdHJpeDNmdiIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsImRyYXdFbGVtZW50cyIsIlRSSUFOR0xFUyIsIlVOU0lHTkVEX1NIT1JUIiwibW92ZU9yaWdpbk1hdHJpeCIsInRyYW5zbGF0aW9uTWF0cml4IiwiYW5nZWwiLCJyb3RhdGlvbk1hdHJpeCIsInNjYWxlTWF0cml4IiwibWF0cml4IiwiQ3VzdG9tUmVuZGVyZXIiLCJMaW5lWm9uZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiZGlyZWN0aW9uIiwibWlueCIsIm1pbiIsIm1pbnkiLCJtYXh4IiwibWF4eSIsInh4eXkiLCJnZXRMZW5ndGgiLCJDIiwiRCIsImdldERpc3RhbmNlIiwiZ2V0U3ltbWV0cmljIiwidGhhMiIsInRoYTEiLCJvbGR4Iiwib2xkeSIsInJhbmdlT3V0IiwiQ2lyY2xlWm9uZSIsInJhbmRvbVJhZGl1cyIsInNldENlbnRlciIsIlJlY3Rab25lIiwiSW1hZ2Vab25lIiwidmVjdG9ycyIsInNldFZlY3RvcnMiLCJqIiwibGVuZ3RoMSIsImxlbmd0aDIiLCJnZXRCb3VuZCIsImdldENvbG9yIiwiZnVuYyIsImdldFN0eWxlIiwiZHJhd1pvbmUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJkcmF3UmVjdCIsImRyYXdFbWl0dGVyIiwiVmVjdG9yIiwiUG9sYXIiLCJnZXRTcGFuIiwiSW5pdCIsIkwiLCJQIiwiViIsIk0iLCJSIiwiRiIsIlJEIiwiRyIsIlMiLCJXZWJHbFJlbmRlcmVyIiwiRGVidWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUEsRUFBQUEsSUFaYSxFQVlSQyxTQUFBQSxJQUFBQSxDQUFBQSxNQVpRLEVBWUE7RUFDWCxJQUFBLE9BQU8sQ0FBQ0EsTUFBTSxHQUFJQSxNQUFNLEdB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
