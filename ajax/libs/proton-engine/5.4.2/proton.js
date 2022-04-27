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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy91dGlscy9Qcm9wVXRpbC5qcyIsIi4uL3NyYy9tYXRoL2Vhc2UuanMiLCIuLi9zcmMvbWF0aC9WZWN0b3IyRC5qcyIsIi4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIiwiLi4vc3JjL3V0aWxzL0NvbG9yVXRpbC5qcyIsIi4uL3NyYy9tYXRoL1BvbGFyMkQuanMiLCIuLi9zcmMvbWF0aC9NYXQzLmpzIiwiLi4vc3JjL21hdGgvU3Bhbi5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIGdldFJhbmRGcm9tQXJyYXkoYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihhcnIubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZW1wdHlPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbnkgb2JqZWN0XG4gICAqL1xuICBlbXB0eU9iamVjdChvYmosIGlnbm9yZSA9IG51bGwpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKGtleSkgPiAtMSkgY29udGludWU7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzIGFuZCBiaW5kcyB0aGUgZ2l2ZW4gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGNsYXNzQXBwbHlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQSBjbGFzcyB0byBtYWtlIGFuIGluc3RhbmNlIGZyb21cbiAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIEFueSBhcnJheSB0byBiaW5kIGl0IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBpbnN0YW5jZSBvZiBjb25zdHJ1Y3Rvciwgb3B0aW9uYWxseSBiaW5kIHdpdGggYXJnc1xuICAgKi9cbiAgY2xhc3NBcHBseShjb25zdHJ1Y3RvciwgYXJncyA9IG51bGwpIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgRmFjdG9yeUZ1bmMgPSBjb25zdHJ1Y3Rvci5iaW5kLmFwcGx5KGNvbnN0cnVjdG9yLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgRmFjdG9yeUZ1bmMoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIHJldHVybiBJbWdVdGlsLmdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCk7XG4gIH0sXG5cbiAgZGVzdHJveUFsbChhcnIsIHBhcmFtID0gbnVsbCkge1xuICAgIGxldCBpID0gYXJyLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycltpXS5kZXN0cm95KHBhcmFtKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGRlbGV0ZSBhcnJbaV07XG4gICAgfVxuXG4gICAgYXJyLmxlbmd0aCA9IDA7XG4gIH0sXG5cbiAgYXNzaWduKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBpZHNNYXAgPSB7fTtcblxuY29uc3QgUHVpZCA9IHtcbiAgX2luZGV4OiAwLFxuICBfY2FjaGU6IHt9LFxuXG4gIGlkKHR5cGUpIHtcbiAgICBpZiAoaWRzTWFwW3R5cGVdID09PSB1bmRlZmluZWQgfHwgaWRzTWFwW3R5cGVdID09PSBudWxsKSBpZHNNYXBbdHlwZV0gPSAwO1xuICAgIHJldHVybiBgJHt0eXBlfV8ke2lkc01hcFt0eXBlXSsrfWA7XG4gIH0sXG5cbiAgZ2V0SWQodGFyZ2V0KSB7XG4gICAgbGV0IHVpZCA9IHRoaXMuZ2V0SWRGcm9tQ2FjaGUodGFyZ2V0KTtcbiAgICBpZiAodWlkKSByZXR1cm4gdWlkO1xuXG4gICAgdWlkID0gYFBVSURfJHt0aGlzLl9pbmRleCsrfWA7XG4gICAgdGhpcy5fY2FjaGVbdWlkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdWlkO1xuICB9LFxuXG4gIGdldElkRnJvbUNhY2hlKHRhcmdldCkge1xuICAgIGxldCBvYmosIGlkO1xuXG4gICAgZm9yIChpZCBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgb2JqID0gdGhpcy5fY2FjaGVbaWRdO1xuXG4gICAgICBpZiAob2JqID09PSB0YXJnZXQpIHJldHVybiBpZDtcbiAgICAgIGlmICh0aGlzLmlzQm9keShvYmosIHRhcmdldCkgJiYgb2JqLnNyYyA9PT0gdGFyZ2V0LnNyYykgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGlzQm9keShvYmosIHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgb2JqLmlzSW5uZXIgJiYgdGFyZ2V0LmlzSW5uZXI7XG4gIH0sXG5cbiAgZ2V0VGFyZ2V0KHVpZCkge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZVt1aWRdO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWlkO1xuIiwiLyoqXG4gKiBQb29sIGlzIHRoZSBjYWNoZSBwb29sIG9mIHRoZSBwcm90b24gZW5naW5lLCBpdCBpcyB2ZXJ5IGltcG9ydGFudC5cbiAqXG4gKiBnZXQodGFyZ2V0LCBwYXJhbXMsIHVpZClcbiAqICBDbGFzc1xuICogICAgdWlkID0gUHVpZC5nZXRJZCAtPiBQdWlkIHNhdmUgdGFyZ2V0IGNhY2hlXG4gKiAgICB0YXJnZXQuX19wdWlkID0gdWlkXG4gKlxuICogIGJvZHlcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICpcbiAqXG4gKiBleHBpcmUodGFyZ2V0KVxuICogIGNhY2hlW3RhcmdldC5fX3B1aWRdIHB1c2ggdGFyZ2V0XG4gKlxuICovXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUG9vbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIG9mIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvdGFsXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjYWNoZVxuICAgKi9cbiAgY29uc3RydWN0b3IobnVtKSB7XG4gICAgdGhpcy50b3RhbCA9IDA7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpIHtcbiAgICBsZXQgcDtcbiAgICB1aWQgPSB1aWQgfHwgdGFyZ2V0Ll9fcHVpZCB8fCBQdWlkLmdldElkKHRhcmdldCk7XG5cbiAgICBpZiAodGhpcy5jYWNoZVt1aWRdICYmIHRoaXMuY2FjaGVbdWlkXS5sZW5ndGggPiAwKSB7XG4gICAgICBwID0gdGhpcy5jYWNoZVt1aWRdLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0gdGhpcy5jcmVhdGVPckNsb25lKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBwLl9fcHVpZCA9IHRhcmdldC5fX3B1aWQgfHwgdWlkO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZXhwaXJlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlKHRhcmdldC5fX3B1aWQpLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNsYXNzIGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb25cbiAgICpcbiAgICogQG1ldGhvZCBjcmVhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0IGFueSBPYmplY3Qgb3IgRnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcykge1xuICAgIHRoaXMudG90YWwrKztcblxuICAgIGlmICh0aGlzLmNyZWF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIFV0aWwuY2xhc3NBcHBseSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIC0gd2hhdCBpcyBpbiB0aGUgY2FjaGU/XG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGlkIGluIHRoaXMuY2FjaGUpIGNvdW50ICs9IHRoaXMuY2FjaGVbaWRdLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgYWxsIGl0ZW1zIGZyb20gUG9vbC5jYWNoZVxuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlW2lkXS5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbaWRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDYWNoZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB1aWQgdGhlIHVuaXF1ZSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXRDYWNoZSh1aWQgPSBcImRlZmF1bHRcIikge1xuICAgIGlmICghdGhpcy5jYWNoZVt1aWRdKSB0aGlzLmNhY2hlW3VpZF0gPSBbXTtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVt1aWRdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyB7XG4gIGNvbnN0cnVjdG9yKHByb3Rvbikge1xuICAgIHRoaXMucHJvdG9uID0gcHJvdG9uO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnR5cGUgPSAxO1xuXG4gICAgdGhpcy5lbWl0dGVySW5kZXggPSAwO1xuICAgIHRoaXMucmVuZGVyZXJJbmRleCA9IDA7XG4gIH1cblxuICB1cGRhdGUoc3R5bGUsIGJvZHkpIHtcbiAgICB0aGlzLmFkZChzdHlsZSwgYm9keSk7XG5cbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5nZXRFbWl0dGVyKCk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKCk7XG4gICAgbGV0IHN0ciA9IFwiXCI7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHIgKz0gXCJlbWl0dGVyOlwiICsgdGhpcy5wcm90b24uZW1pdHRlcnMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJlbSBzcGVlZDpcIiArIGVtaXR0ZXIuZW1pdFNwZWVkICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJwb3M6XCIgKyB0aGlzLmdldEVtaXR0ZXJQb3MoZW1pdHRlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJpbml0aWFsaXplczpcIiArIGVtaXR0ZXIuaW5pdGlhbGl6ZXMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKVxuICAgICAgICAgIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5pbml0aWFsaXplcykgKyBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJiZWhhdmlvdXJzOlwiICsgZW1pdHRlci5iZWhhdmlvdXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9ICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPicgKyB0aGlzLmNvbmNhdEFycihlbWl0dGVyLmJlaGF2aW91cnMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSByZW5kZXJlci5uYW1lICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChyZW5kZXJlcikgc3RyICs9IFwiYm9keTpcIiArIHRoaXMuZ2V0Q3JlYXRlZE51bWJlcihyZW5kZXJlcikgKyBcIjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN0ciArPSBcInBhcnRpY2xlczpcIiArIHRoaXMucHJvdG9uLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwicG9vbDpcIiArIHRoaXMucHJvdG9uLnBvb2wuZ2V0Q291bnQoKSArIFwiPGJyPlwiO1xuICAgICAgICBzdHIgKz0gXCJ0b3RhbDpcIiArIHRoaXMucHJvdG9uLnBvb2wudG90YWw7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gc3RyO1xuICB9XG5cbiAgYWRkKHN0eWxlLCBib2R5KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy50eXBlID0gMTtcblxuICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MHB4O2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtcIixcbiAgICAgICAgXCJvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwO3BhZGRpbmc6MTBweDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcIixcbiAgICAgICAgXCJ3aWR0aDoxMjBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDI7Y29sb3I6IzBmZjtcIlxuICAgICAgXS5qb2luKFwiXCIpO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHRoaXMudHlwZSsrO1xuICAgICAgICAgIGlmICh0aGlzLnR5cGUgPiA0KSB0aGlzLnR5cGUgPSAxO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcblxuICAgICAgbGV0IGJnLCBjb2xvcjtcbiAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGJnID0gXCIjMjAxXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiNmMDhcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgYmcgPSBcIiMwMjBcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmMFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYmcgPSBcIiMwMDJcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmZlwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBiZztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlW1wiY29sb3JcIl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGJvZHkgPSBib2R5IHx8IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW1pdHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm90b24uZW1pdHRlcnNbdGhpcy5lbWl0dGVySW5kZXhdO1xuICB9XG5cbiAgZ2V0UmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLnJlbmRlcmVyc1t0aGlzLnJlbmRlcmVySW5kZXhdO1xuICB9XG5cbiAgY29uY2F0QXJyKGFycikge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGlmICghYXJyIHx8ICFhcnIubGVuZ3RoKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSAoYXJyW2ldLm5hbWUgfHwgXCJcIikuc3Vic3RyKDAsIDEpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpIHtcbiAgICByZXR1cm4gcmVuZGVyZXIucG9vbC50b3RhbCB8fCAocmVuZGVyZXIuY3Bvb2wgJiYgcmVuZGVyZXIuY3Bvb2wudG90YWwpIHx8IDA7XG4gIH1cblxuICBnZXRFbWl0dGVyUG9zKGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChlLnAueCkgKyBcIixcIiArIE1hdGgucm91bmQoZS5wLnkpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSkge1xuICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgdGhpcy5wcm90b24gPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgfVxufVxuIiwiLypcbiAqIEV2ZW50RGlzcGF0Y2hlclxuICogVGhpcyBjb2RlIHJlZmVyZW5jZSBzaW5jZSBodHRwOi8vY3JlYXRlanMuY29tLy5cbiAqXG4gKiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgYmluZCh0YXJnZXQpIHtcbiAgICB0YXJnZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVBbGxFdmVudExpc3RlbmVycyA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnM7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgcmV0dXJuO1xuXG4gICAgY29uc3QgYXJyID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgIGNvbnN0IGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsbG93cyBmb3IgZmFzdGVyIGNoZWNrcy5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKHR5cGUpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgZWxzZSBpZiAodGhpcy5fbGlzdGVuZXJzKSBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudCh0eXBlLCBhcmdzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcblxuICAgIGlmICh0eXBlICYmIGxpc3RlbmVycykge1xuICAgICAgbGV0IGFyciA9IGxpc3RlbmVyc1t0eXBlXTtcbiAgICAgIGlmICghYXJyKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAvLyBhcnIgPSBhcnIuc2xpY2UoKTtcbiAgICAgIC8vIHRvIGF2b2lkIGlzc3VlcyB3aXRoIGl0ZW1zIGJlaW5nIHJlbW92ZWQgb3IgYWRkZWQgZHVyaW5nIHRoZSBkaXNwYXRjaFxuXG4gICAgICBsZXQgaGFuZGxlcjtcbiAgICAgIGxldCBpID0gYXJyLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaGFuZGxlciA9IGFycltpXTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IGhhbmRsZXIoYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICEhcmVzdWx0O1xuICB9XG5cbiAgaGFzRXZlbnRMaXN0ZW5lcih0eXBlKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuICAgIHJldHVybiAhIShsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzW3R5cGVdKTtcbiAgfVxufVxuIiwiY29uc3QgUEkgPSAzLjE0MTU5MjY7XG5jb25zdCBJTkZJTklUWSA9IEluZmluaXR5O1xuXG5jb25zdCBNYXRoVXRpbCA9IHtcbiAgUEk6IFBJLFxuICBQSXgyOiBQSSAqIDIsXG4gIFBJXzI6IFBJIC8gMixcbiAgUElfMTgwOiBQSSAvIDE4MCxcbiAgTjE4MF9QSTogMTgwIC8gUEksXG4gIEluZmluaXR5OiAtOTk5LFxuXG4gIGlzSW5maW5pdHkobnVtKSB7XG4gICAgcmV0dXJuIG51bSA9PT0gdGhpcy5JbmZpbml0eSB8fCBudW0gPT09IElORklOSVRZO1xuICB9LFxuXG4gIHJhbmRvbUFUb0IoYSwgYiwgaXNJbnQgPSBmYWxzZSkge1xuICAgIGlmICghaXNJbnQpIHJldHVybiBhICsgTWF0aC5yYW5kb20oKSAqIChiIC0gYSk7XG4gICAgZWxzZSByZXR1cm4gKChNYXRoLnJhbmRvbSgpICogKGIgLSBhKSkgPj4gMCkgKyBhO1xuICB9LFxuXG4gIHJhbmRvbUZsb2F0aW5nKGNlbnRlciwgZiwgaXNJbnQpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5kb21BVG9CKGNlbnRlciAtIGYsIGNlbnRlciArIGYsIGlzSW50KTtcbiAgfSxcblxuICByYW5kb21Db2xvcigpIHtcbiAgICByZXR1cm4gXCIjXCIgKyAoXCIwMDAwMFwiICsgKChNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwKSA8PCAwKS50b1N0cmluZygxNikpLnNsaWNlKC02KTtcbiAgfSxcblxuICByYW5kb21ab25lKGRpc3BsYXkpIHt9LFxuXG4gIGZsb29yKG51bSwgayA9IDQpIHtcbiAgICBjb25zdCBkaWdpdHMgPSBNYXRoLnBvdygxMCwgayk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogZGlnaXRzKSAvIGRpZ2l0cztcbiAgfSxcblxuICBkZWdyZWVUcmFuc2Zvcm0oYSkge1xuICAgIHJldHVybiAoYSAqIFBJKSAvIDE4MDtcbiAgfSxcblxuICB0b0NvbG9yMTYobnVtKSB7XG4gICAgcmV0dXJuIGAjJHtudW0udG9TdHJpbmcoMTYpfWA7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGhVdGlsO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdyYXRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICB0aGlzLmV1bGVySW50ZWdyYXRlKHBhcnRpY2xlcywgdGltZSwgZGFtcGluZyk7XG4gIH1cblxuICAvLyBFdWxlciBJbnRlZ3JhdGVcbiAgLy8gaHR0cHM6Ly9yb3NldHRhY29kZS5vcmcvd2lraS9FdWxlcl9tZXRob2RcbiAgZXVsZXJJbnRlZ3JhdGUocGFydGljbGUsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICBpZiAoIXBhcnRpY2xlLnNsZWVwKSB7XG4gICAgICBwYXJ0aWNsZS5vbGQucC5jb3B5KHBhcnRpY2xlLnApO1xuICAgICAgcGFydGljbGUub2xkLnYuY29weShwYXJ0aWNsZS52KTtcblxuICAgICAgcGFydGljbGUuYS5tdWx0aXBseVNjYWxhcigxIC8gcGFydGljbGUubWFzcyk7XG4gICAgICBwYXJ0aWNsZS52LmFkZChwYXJ0aWNsZS5hLm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcbiAgICAgIHBhcnRpY2xlLnAuYWRkKHBhcnRpY2xlLm9sZC52Lm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcblxuICAgICAgaWYgKGRhbXBpbmcpIHBhcnRpY2xlLnYubXVsdGlwbHlTY2FsYXIoZGFtcGluZyk7XG5cbiAgICAgIHBhcnRpY2xlLmEuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb29sIGZyb20gXCIuL1Bvb2xcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3RhdHMgZnJvbSBcIi4uL2RlYnVnL1N0YXRzXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBJbnRlZ3JhdGlvbiBmcm9tIFwiLi4vbWF0aC9JbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm90b24ge1xuICBzdGF0aWMgVVNFX0NMT0NLID0gZmFsc2U7XG5cbiAgLy8gbWVhc3VyZSAxOjEwMFxuICBzdGF0aWMgTUVBU1VSRSA9IDEwMDtcbiAgc3RhdGljIEVVTEVSID0gXCJldWxlclwiO1xuICBzdGF0aWMgUksyID0gXCJydW5nZS1rdXR0YTJcIjtcblxuICAvLyBldmVudCBuYW1lXG4gIHN0YXRpYyBQQVJUSUNMRV9DUkVBVEVEID0gXCJQQVJUSUNMRV9DUkVBVEVEXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9VUERBVEUgPSBcIlBBUlRJQ0xFX1VQREFURVwiO1xuICBzdGF0aWMgUEFSVElDTEVfU0xFRVAgPSBcIlBBUlRJQ0xFX1NMRUVQXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9ERUFEID0gXCJQQVJUSUNMRV9ERUFEXCI7XG5cbiAgc3RhdGljIEVNSVRURVJfQURERUQgPSBcIkVNSVRURVJfQURERURcIjtcbiAgc3RhdGljIEVNSVRURVJfUkVNT1ZFRCA9IFwiRU1JVFRFUl9SRU1PVkVEXCI7XG5cbiAgc3RhdGljIFBST1RPTl9VUERBVEUgPSBcIlBST1RPTl9VUERBVEVcIjtcbiAgc3RhdGljIFBST1RPTl9VUERBVEVfQUZURVIgPSBcIlBST1RPTl9VUERBVEVfQUZURVJcIjtcbiAgc3RhdGljIERFRkFVTFRfSU5URVJWQUwgPSAwLjAxNjc7XG5cbiAgc3RhdGljIGFtZW5kQ2hhbmdlVGFic0J1ZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciB0byBhZGQgZW1pdHRlcnNcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yIFByb3RvblxuICAgKlxuICAgKiBAdG9kbyBwcm9QYXJ0aWNsZUNvdW50IGlzIG5vdCBpbiB1c2VcbiAgICogQHRvZG8gYWRkIG1vcmUgZG9jdW1lbnRhdGlvbiBvZiB0aGUgc2luZ2xlIHByb3BlcnRpZXMgYW5kIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwcm9QYXJ0aWNsZUNvdW50XSBub3QgaW4gdXNlP1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbaW50ZWdyYXRpb25UeXBlPVByb3Rvbi5FVUxFUl1cbiAgICogQHByb3BlcnR5IHtBcnJheX0gZW1pdHRlcnMgICBBbGwgYWRkZWQgZW1pdHRlclxuICAgKiBAcHJvcGVydHkge0FycmF5fSByZW5kZXJlcnMgIEFsbCBhZGRlZCByZW5kZXJlclxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSAgICAgIFRoZSBhY3RpdmUgdGltZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gb2xkdGltZSAgIFRoZSBvbGQgdGltZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW50ZWdyYXRpb25UeXBlKSB7XG4gICAgdGhpcy5lbWl0dGVycyA9IFtdO1xuICAgIHRoaXMucmVuZGVyZXJzID0gW107XG5cbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMubm93ID0gMDtcbiAgICB0aGlzLnRoZW4gPSAwO1xuICAgIHRoaXMuZWxhcHNlZCA9IDA7XG5cbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKHRoaXMpO1xuICAgIHRoaXMucG9vbCA9IG5ldyBQb29sKDgwKTtcblxuICAgIHRoaXMuaW50ZWdyYXRpb25UeXBlID0gVXRpbC5pbml0VmFsdWUoaW50ZWdyYXRpb25UeXBlLCBQcm90b24uRVVMRVIpO1xuICAgIHRoaXMuaW50ZWdyYXRvciA9IG5ldyBJbnRlZ3JhdGlvbih0aGlzLmludGVncmF0aW9uVHlwZSk7XG5cbiAgICB0aGlzLl9mcHMgPSBcImF1dG9cIjtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMO1xuICB9XG5cbiAgc2V0IGZwcyhmcHMpIHtcbiAgICB0aGlzLl9mcHMgPSBmcHM7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBmcHMgPT09IFwiYXV0b1wiID8gUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwgOiBNYXRoVXRpbC5mbG9vcigxIC8gZnBzLCA3KTtcbiAgfVxuXG4gIGdldCBmcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICBhZGRSZW5kZXJlcihyZW5kZXIpIHtcbiAgICByZW5kZXIuaW5pdCh0aGlzKTtcbiAgICB0aGlzLnJlbmRlcmVycy5wdXNoKHJlbmRlcik7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgcmVtb3ZlUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJlbmRlcmVycy5pbmRleE9mKHJlbmRlcik7XG4gICAgdGhpcy5yZW5kZXJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZW5kZXIucmVtb3ZlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZEVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICBhZGRFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICB0aGlzLmVtaXR0ZXJzLnB1c2goZW1pdHRlcik7XG4gICAgZW1pdHRlci5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX0FEREVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCByZW1vdmVFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIHJlbW92ZUVtaXR0ZXIoZW1pdHRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpO1xuICAgIHRoaXMuZW1pdHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfUkVNT1ZFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgYWRkZWQgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICAvLyAnYXV0bycgaXMgdGhlIGRlZmF1bHQgYnJvd3NlciByZWZyZXNoIHJhdGUsIHRoZSB2YXN0IG1ham9yaXR5IGlzIDYwZnBzXG4gICAgaWYgKHRoaXMuX2ZwcyA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG5cbiAgICAgIGlmIChQcm90b24uVVNFX0NMT0NLKSB7XG4gICAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuICAgICAgICAvLyBGaXggYnVncyBzdWNoIGFzIGNocm9tZSBicm93c2VyIHN3aXRjaGluZyB0YWJzIGNhdXNpbmcgZXhjZXNzaXZlIHRpbWUgZGlmZmVyZW5jZVxuICAgICAgICB0aGlzLmFtZW5kQ2hhbmdlVGFic0J1ZygpO1xuXG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwKSB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuZWxhcHNlZCk7XG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZShQcm90b24uREVGQVVMVF9JTlRFUlZBTCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZwcyBmcmFtZSByYXRlIGlzIHNldFxuICAgIGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcblxuICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTc2NDAxOC9jb250cm9sbGluZy1mcHMtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWVcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3cgLSAodGhpcy5lbGFwc2VkICUgdGhpcy5faW50ZXJ2YWwpICogMTAwMDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbWl0dGVyc1VwZGF0ZShlbGFwc2VkKSB7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLmVtaXR0ZXJzW2ldLnVwZGF0ZShlbGFwc2VkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBhbWVuZENoYW5nZVRhYnNCdWdcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGFtZW5kQ2hhbmdlVGFic0J1ZygpIHtcbiAgICBpZiAoIVByb3Rvbi5hbWVuZENoYW5nZVRhYnNCdWcpIHJldHVybjtcbiAgICBpZiAodGhpcy5lbGFwc2VkID4gMC41KSB7XG4gICAgICB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvdW50cyBhbGwgcGFydGljbGVzIGZyb20gYWxsIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGdldENvdW50KCkge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHRvdGFsICs9IHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzLmxlbmd0aDtcbiAgICByZXR1cm4gdG90YWw7XG4gIH1cblxuICBnZXRBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IHBhcnRpY2xlcyA9IFtdO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSBwYXJ0aWNsZXMgPSBwYXJ0aWNsZXMuY29uY2F0KHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzKTtcbiAgICByZXR1cm4gcGFydGljbGVzO1xuICB9XG5cbiAgZGVzdHJveUFsbEVtaXR0ZXJzKCkge1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhpcyBQcm90b24gaW5zdGFuY2UuIFRoaXMgaW5jbHVkZXMgYWxsIGVtaXR0ZXJzLCBhbmQgYWxsIHByb3BlcnRpZXNcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBkZXN0cm95KHJlbW92ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGVzdHJveU90aGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgIHRoaXMudGhlbiA9IDA7XG4gICAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgICAgdGhpcy5zdGF0cy5kZXN0cm95KCk7XG5cbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnJlbmRlcmVycywgdGhpcy5nZXRBbGxQYXJ0aWNsZXMoKSk7XG5cbiAgICAgIHRoaXMuaW50ZWdyYXRvciA9IG51bGw7XG4gICAgICB0aGlzLnJlbmRlcmVycyA9IG51bGw7XG4gICAgICB0aGlzLmVtaXR0ZXJzID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhdHMgPSBudWxsO1xuICAgICAgdGhpcy5wb29sID0gbnVsbDtcbiAgICB9O1xuXG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAgc2V0VGltZW91dChkZXN0cm95T3RoZXIsIDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3lPdGhlcigpO1xuICAgIH1cbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChQcm90b24pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmdiIHtcbiAgY29uc3RydWN0b3IociA9IDI1NSwgZyA9IDI1NSwgYiA9IDI1NSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy5nID0gZztcbiAgICB0aGlzLmIgPSBiO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5yID0gMjU1O1xuICAgIHRoaXMuZyA9IDI1NTtcbiAgICB0aGlzLmIgPSAyNTU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgaGFzUHJvcCh0YXJnZXQsIGtleSkge1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHByb3RvdHlwZSBpbiBhIGdpdmVuIHByb3RvdHlwZU9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0UHJvcFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIHRyYW5zbGF0ZSBkZXNyaXB0aW9uIGZyb20gY2hpbmVzZSB0byBlbmdsaXNoXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZU9iamVjdCBBbiBvYmplY3Qgb2Ygc2luZ2xlIHByb3RvdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSB0YXJnZXRcbiAgICovXG4gIHNldFByb3AodGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gU3Bhbi5nZXRTcGFuVmFsdWUocHJvcHNbcHJvcF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRWZWN0b3JWYWxcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGBjb25mYFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZcbiAgICovXG4gIHNldFZlY3RvclZhbChwYXJ0aWNsZSwgY29uZiA9IG51bGwpIHtcbiAgICBpZiAoIWNvbmYpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ4XCIpKSBwYXJ0aWNsZS5wLnggPSBjb25mW1wieFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieVwiKSkgcGFydGljbGUucC55ID0gY29uZltcInlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnhcIikpIHBhcnRpY2xlLnYueCA9IGNvbmZbXCJ2eFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnlcIikpIHBhcnRpY2xlLnYueSA9IGNvbmZbXCJ2eVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheFwiKSkgcGFydGljbGUuYS54ID0gY29uZltcImF4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheVwiKSkgcGFydGljbGUuYS55ID0gY29uZltcImF5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBcIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicFwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widlwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYVwiXSk7XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicG9zaXRpb25cIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicG9zaXRpb25cIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2ZWxvY2l0eVwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2ZWxvY2l0eVwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFjY2VsZXJhdGVcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYWNjZWxlcmF0ZVwiXSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBlYXNlTGluZWFyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGVhc2VJblF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDIpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCAyKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YWQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDIpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5DdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG4gIH0sXG5cbiAgZWFzZU91dEN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlIC0gMSwgMykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEN1YmljKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAzKTtcblxuICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3codmFsdWUgLSAyLCAzKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJblF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCA0KTtcbiAgfSxcblxuICBlYXNlT3V0UXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDQpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhcnQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDQpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogTWF0aC5wb3codmFsdWUsIDMpIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluU2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtTWF0aC5jb3ModmFsdWUgKiBNYXRoVXRpbC5QSV8yKSArIDE7XG4gIH0sXG5cbiAgZWFzZU91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zaW4odmFsdWUgKiBNYXRoVXRpbC5QSV8yKTtcbiAgfSxcblxuICBlYXNlSW5PdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbkV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG4gIH0sXG5cbiAgZWFzZU91dEV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHZhbHVlKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0RXhwbyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIDA7XG5cbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiAxO1xuXG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuXG4gICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS12YWx1ZSkgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5DaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VPdXRDaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgxIC0gTWF0aC5wb3codmFsdWUgLSAxLCAyKSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q2lyYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHZhbHVlIC09IDIpICogdmFsdWUpICsgMSk7XG4gIH0sXG5cbiAgZWFzZUluQmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gdmFsdWUgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgLSBzKTtcbiAgfSxcblxuICBlYXNlT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gKHZhbHVlID0gdmFsdWUgLSAxKSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSArIHMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiAodmFsdWUgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSAtIHMpKTtcbiAgICByZXR1cm4gMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlICsgcykgKyAyKTtcbiAgfSxcblxuICBnZXRFYXNpbmcoZWFzZSkge1xuICAgIGlmICh0eXBlb2YgZWFzZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZWFzZTtcbiAgICBlbHNlIHJldHVybiB0aGlzW2Vhc2VdIHx8IHRoaXMuZWFzZUxpbmVhcjtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyRCB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgdGhpcy55ID0geSB8fCAwO1xuICB9XG5cbiAgc2V0KHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRYKHgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0WSh5KSB7XG4gICAgdGhpcy55ID0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIGlmICh0aGlzLnggIT09IDApIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgICBlbHNlIGlmICh0aGlzLnkgPiAwKSByZXR1cm4gTWF0aFV0aWwuUElfMjtcbiAgICBlbHNlIGlmICh0aGlzLnkgPCAwKSByZXR1cm4gLU1hdGhVdGlsLlBJXzI7XG4gIH1cblxuICBjb3B5KHYpIHtcbiAgICB0aGlzLnggPSB2Lng7XG4gICAgdGhpcy55ID0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGQodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRYWShhLCBiKSB7XG4gICAgdGhpcy54ICs9IGE7XG4gICAgdGhpcy55ICs9IGI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCArIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgKyBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1Yih2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1YlZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCAtIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgLSBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpdmlkZVNjYWxhcihzKSB7XG4gICAgaWYgKHMgIT09IDApIHtcbiAgICAgIHRoaXMueCAvPSBzO1xuICAgICAgdGhpcy55IC89IHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KDAsIDApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbXVsdGlwbHlTY2FsYXIocykge1xuICAgIHRoaXMueCAqPSBzO1xuICAgIHRoaXMueSAqPSBzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoLTEpO1xuICB9XG5cbiAgZG90KHYpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55O1xuICB9XG5cbiAgbGVuZ3RoU3EoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKHRoaXMubGVuZ3RoKCkpO1xuICB9XG5cbiAgZGlzdGFuY2VUbyh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKHYpKTtcbiAgfVxuXG4gIHJvdGF0ZSh0aGEpIHtcbiAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnk7XG5cbiAgICB0aGlzLnggPSB4ICogTWF0aC5jb3ModGhhKSArIHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHRoaXMueSA9IC14ICogTWF0aC5zaW4odGhhKSArIHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXN0YW5jZVRvU3F1YXJlZCh2KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSB2Lng7XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSB2Lnk7XG5cbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gIH1cblxuICBsZXJwKHYsIGFscGhhKSB7XG4gICAgdGhpcy54ICs9ICh2LnggLSB0aGlzLngpICogYWxwaGE7XG4gICAgdGhpcy55ICs9ICh2LnkgLSB0aGlzLnkpICogYWxwaGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYueCA9PT0gdGhpcy54ICYmIHYueSA9PT0gdGhpcy55O1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy54ID0gMC4wO1xuICAgIHRoaXMueSA9IDAuMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xuICB9XG59XG4iLCIvKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vYmVoYXZpb3VyL0JlaGF2aW91cicpfSBCZWhhdmlvdXIgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuLi9tYXRoL1ZlY3RvcjJEJyl9IFZlY3RvcjJEICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vdXRpbHMvUmdiJyl9IFJnYiAqL1xuaW1wb3J0IFJnYiBmcm9tIFwiLi4vdXRpbHMvUmdiXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlIHtcbiAgLyoqIEB0eXBlIHN0cmluZyAqL1xuICBpZCA9IFwiXCI7XG5cbiAgLyoqIEB0eXBlIHt7cDpWZWN0b3IyRCx2OlZlY3RvcjJELGE6VmVjdG9yMkR9fSAqL1xuICBvbGQgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICBkYXRhID0gbnVsbDtcblxuICAvKiogQHR5cGUge0JlaGF2aW91cltdfSAqL1xuICBiZWhhdmlvdXJzID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICBwID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICB2ID0gbnVsbDtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICBhID0gbnVsbDtcblxuICAvKiogQHR5cGUge1JnYn0gKi9cbiAgcmdiID0gbnVsbDtcblxuICAvKipcbiAgICogdGhlIFBhcnRpY2xlIGNsYXNzXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uUGFydGljbGVcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwT2JqIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICogZm9yIGV4YW1wbGUge2xpZmU6MyxkZWFkOmZhbHNlfVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZikge1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXJ0aWNsZSdzIGlkO1xuICAgICAqIEBwcm9wZXJ0eSBpZFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJQYXJ0aWNsZVwiO1xuICAgIHRoaXMuaWQgPSBQdWlkLmlkKHRoaXMubmFtZSk7XG4gICAgdGhpcy5vbGQgPSB7fTtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcblxuICAgIHRoaXMucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuYSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQuYSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgdGhpcy5yZ2IgPSBuZXcgUmdiKCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIGNvbmYgJiYgUHJvcFV0aWwuc2V0UHJvcCh0aGlzLCBjb25mKTtcbiAgfVxuXG4gIGdldERpcmVjdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnYueCwgLXRoaXMudi55KSAqIE1hdGhVdGlsLk4xODBfUEk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmxpZmUgPSBJbmZpbml0eTtcbiAgICB0aGlzLmFnZSA9IDA7XG5cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnNsZWVwID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5ID0gbnVsbDtcbiAgICB0aGlzLnNwcml0ZSA9IG51bGw7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5lbmVyZ3kgPSAxOyAvLyBFbmVyZ3kgTG9zc1xuICAgIHRoaXMubWFzcyA9IDE7XG4gICAgdGhpcy5yYWRpdXMgPSAxMDtcbiAgICB0aGlzLmFscGhhID0gMTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICB0aGlzLmNvbG9yID0gbnVsbDtcblxuICAgIHRoaXMucC5zZXQoMCwgMCk7XG4gICAgdGhpcy52LnNldCgwLCAwKTtcbiAgICB0aGlzLmEuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLnAuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLnYuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLmEuc2V0KDAsIDApO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5lYXNlTGluZWFyO1xuXG4gICAgdGhpcy5yZ2IucmVzZXQoKTtcbiAgICBVdGlsLmVtcHR5T2JqZWN0KHRoaXMuZGF0YSk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lLCBpbmRleCkge1xuICAgIGlmICghdGhpcy5zbGVlcCkge1xuICAgICAgdGhpcy5hZ2UgKz0gdGltZTtcbiAgICAgIHRoaXMuYXBwbHlCZWhhdmlvdXJzKHRpbWUsIGluZGV4KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hZ2UgPCB0aGlzLmxpZmUpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcodGhpcy5hZ2UgLyB0aGlzLmxpZmUpO1xuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBhcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmJlaGF2aW91cnMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJlaGF2aW91cnNbaV0gJiYgdGhpcy5iZWhhdmlvdXJzW2ldLmFwcGx5QmVoYXZpb3VyKHRoaXMsIHRpbWUsIGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91clxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIHRoaXMuYmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG5cbiAgICBpZiAoYmVoYXZpb3VyLmhhc093blByb3BlcnR5KFwicGFyZW50c1wiKSkgYmVoYXZpb3VyLnBhcmVudHMucHVzaCh0aGlzKTtcbiAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cltdfSBiZWhhdmlvdXJzXG4gICAqL1xuICBhZGRCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICBjb25zdCBsZW5ndGggPSBiZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hZGRCZWhhdmlvdXIoYmVoYXZpb3Vyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCBiZWhhdmlvdXIgPSB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGJlaGF2aW91ci5wYXJlbnRzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAdHlwZWRlZiAge09iamVjdH0gcmdiT2JqZWN0XG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByIHJlZCB2YWx1ZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gZyBncmVlbiB2YWx1ZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gYiBibHVlIHZhbHVlXG4gICAqL1xuICAvKipcbiAgICogY29udmVydHMgYSBoZXggdmFsdWUgdG8gYSByZ2Igb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBoZXhUb1JnYlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaCBhbnkgaGV4IHZhbHVlLCBlLmcuICMwMDAwMDAgb3IgMDAwMDAwIGZvciBibGFja1xuICAgKlxuICAgKiBAcmV0dXJuIHtyZ2JPYmplY3R9XG4gICAqL1xuICBoZXhUb1JnYihoKSB7XG4gICAgY29uc3QgaGV4MTYgPSBoLmNoYXJBdCgwKSA9PT0gXCIjXCIgPyBoLnN1YnN0cmluZygxLCA3KSA6IGg7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygwLCAyKSwgMTYpO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMiwgNCksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDQsIDYpLCAxNik7XG5cbiAgICByZXR1cm4geyByLCBnLCBiIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgcmdiIHZhbHVlIHRvIGEgcmdiIHN0cmluZ1xuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgcmdiVG9IZXhcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3QgfCBQcm90b24uaGV4VG9SZ2J9IHJnYiBhIHJnYiBvYmplY3QgbGlrZSBpbiB7QGxpbmsgUHJvdG9uI1Byb3Rvbi59XG4gICAqXG4gICAqIEByZXR1cm4ge1N0cmluZ30gcmdiKClcbiAgICovXG4gIHJnYlRvSGV4KHJiZykge1xuICAgIHJldHVybiBgcmdiKCR7cmJnLnJ9LCAke3JiZy5nfSwgJHtyYmcuYn0pYDtcbiAgfSxcblxuICBnZXRIZXgxNkZyb21QYXJ0aWNsZShwKSB7XG4gICAgcmV0dXJuIE51bWJlcihwLnJnYi5yKSAqIDY1NTM2ICsgTnVtYmVyKHAucmdiLmcpICogMjU2ICsgTnVtYmVyKHAucmdiLmIpO1xuICB9XG59O1xuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbGFyMkQge1xuICBjb25zdHJ1Y3RvcihyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSBNYXRoLmFicyhyKSB8fCAwO1xuICAgIHRoaXMudGhhID0gdGhhIHx8IDA7XG4gIH1cblxuICBzZXQociwgdGhhKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFIocikge1xuICAgIHRoaXMuciA9IHI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRUaGEodGhhKSB7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb3B5KHApIHtcbiAgICB0aGlzLnIgPSBwLnI7XG4gICAgdGhpcy50aGEgPSBwLnRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvVmVjdG9yKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy5nZXRYKCksIHRoaXMuZ2V0WSgpKTtcbiAgfVxuXG4gIGdldFgoKSB7XG4gICAgcmV0dXJuIHRoaXMuciAqIE1hdGguc2luKHRoaXMudGhhKTtcbiAgfVxuXG4gIGdldFkoKSB7XG4gICAgcmV0dXJuIC10aGlzLnIgKiBNYXRoLmNvcyh0aGlzLnRoYSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgdGhpcy5yID0gMTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYuciA9PT0gdGhpcy5yICYmIHYudGhhID09PSB0aGlzLnRoYTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuciA9IDAuMDtcbiAgICB0aGlzLnRoYSA9IDAuMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgUG9sYXIyRCh0aGlzLnIsIHRoaXMudGhhKTtcbiAgfVxufVxuIiwiY29uc3QgTWF0MyA9IHtcbiAgY3JlYXRlKG1hdDMpIHtcbiAgICBjb25zdCBtYXQgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xuICAgIGlmIChtYXQzKSB0aGlzLnNldChtYXQzLCBtYXQpO1xuXG4gICAgcmV0dXJuIG1hdDtcbiAgfSxcblxuICBzZXQobWF0MSwgbWF0Mikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSBtYXQyW2ldID0gbWF0MVtpXTtcblxuICAgIHJldHVybiBtYXQyO1xuICB9LFxuXG4gIG11bHRpcGx5KG1hdCwgbWF0MiwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMDIgPSBtYXRbMl0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDAgPSBtYXQyWzBdLFxuICAgICAgYjAxID0gbWF0MlsxXSxcbiAgICAgIGIwMiA9IG1hdDJbMl0sXG4gICAgICBiMTAgPSBtYXQyWzNdLFxuICAgICAgYjExID0gbWF0Mls0XSxcbiAgICAgIGIyMCA9IG1hdDJbNl0sXG4gICAgICBiMjEgPSBtYXQyWzddO1xuXG4gICAgbWF0M1swXSA9IGIwMCAqIGEwMCArIGIwMSAqIGExMDtcbiAgICBtYXQzWzFdID0gYjAwICogYTAxICsgYjAxICogYTExO1xuICAgIG1hdDNbMl0gPSBhMDIgKiBiMDI7XG4gICAgbWF0M1szXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMDtcbiAgICBtYXQzWzRdID0gYjEwICogYTAxICsgYjExICogYTExO1xuICAgIG1hdDNbNl0gPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBhMjA7XG4gICAgbWF0M1s3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGEyMTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9LFxuXG4gIGludmVyc2UobWF0LCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMSA9IGExMSxcbiAgICAgIGIxMSA9IC1hMTAsXG4gICAgICBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjAsXG4gICAgICBkID0gYTAwICogYjAxICsgYTAxICogYjExLFxuICAgICAgaWQ7XG5cbiAgICBpZCA9IDEgLyBkO1xuICAgIG1hdDNbMF0gPSBiMDEgKiBpZDtcbiAgICBtYXQzWzFdID0gLWEwMSAqIGlkO1xuICAgIG1hdDNbM10gPSBiMTEgKiBpZDtcbiAgICBtYXQzWzRdID0gYTAwICogaWQ7XG4gICAgbWF0M1s2XSA9IGIyMSAqIGlkO1xuICAgIG1hdDNbN10gPSAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgKiBpZDtcblxuICAgIHJldHVybiBtYXQzO1xuICB9LFxuXG4gIG11bHRpcGx5VmVjMihtLCB2ZWMsIG1hdDMpIHtcbiAgICBsZXQgeCA9IHZlY1swXSxcbiAgICAgIHkgPSB2ZWNbMV07XG5cbiAgICBtYXQzWzBdID0geCAqIG1bMF0gKyB5ICogbVszXSArIG1bNl07XG4gICAgbWF0M1sxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyBtWzddO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdDM7XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYW4ge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjZW50ZXIpIHtcbiAgICBpZiAoVXRpbC5pc0FycmF5KGEpKSB7XG4gICAgICB0aGlzLmlzQXJyYXkgPSB0cnVlO1xuICAgICAgdGhpcy5hID0gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0FycmF5ID0gZmFsc2U7XG4gICAgICB0aGlzLmEgPSBVdGlsLmluaXRWYWx1ZShhLCAxKTtcbiAgICAgIHRoaXMuYiA9IFV0aWwuaW5pdFZhbHVlKGIsIHRoaXMuYSk7XG4gICAgICB0aGlzLmNlbnRlciA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlciwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlKGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5pc0FycmF5KSB7XG4gICAgICByZXR1cm4gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5jZW50ZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlsLnJhbmRvbUFUb0IodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21GbG9hdGluZyh0aGlzLmEsIHRoaXMuYiwgaXNJbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IFNwYW4gb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRTcGFuVmFsdWVcbiAgICpcbiAgICogQHRvZG8gYSwgYiBhbmQgYyBzaG91bGQgYmUgJ01peGVkJyBvciAnTnVtYmVyJz9cbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZCB8IFNwYW59IGFcbiAgICogQHBhcmFtIHtNaXhlZH0gICAgICAgICAgICAgICBiXG4gICAqIEBwYXJhbSB7TWl4ZWR9ICAgICAgICAgICAgICAgY1xuICAgKlxuICAgKiBAcmV0dXJuIHtTcGFufVxuICAgKi9cbiAgc3RhdGljIHNldFNwYW5WYWx1ZShhLCBiLCBjKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmV3IFNwYW4oYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IFNwYW4oYSwgYik7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTcGFuKGEsIGIsIGMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmcm9tIGEgU3BhbiwgaWYgdGhlIHBhcmFtIGlzIG5vdCBhIFNwYW4gaXQgd2lsbCByZXR1cm4gdGhlIGdpdmVuIHBhcmFtZXRlclxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZ2V0VmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZCB8IFNwYW59IHBhblxuICAgKlxuICAgKiBAcmV0dXJuIHtNaXhlZH0gdGhlIHZhbHVlIG9mIFNwYW4gT1IgdGhlIHBhcmFtZXRlciBpZiBpdCBpcyBub3QgYSBTcGFuXG4gICAqL1xuICBzdGF0aWMgZ2V0U3BhblZhbHVlKHBhbikge1xuICAgIHJldHVybiBwYW4gaW5zdGFuY2VvZiBTcGFuID8gcGFuLmdldFZhbHVlKCkgOiBwYW47XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXlTcGFuIGV4dGVuZHMgU3BhbiB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9hcnIgPSBVdGlsLnRvQXJyYXkoY29sb3IpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgY29uc3QgdmFsID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMuX2Fycik7XG4gICAgcmV0dXJuIHZhbCA9PT0gXCJyYW5kb21cIiB8fCB2YWwgPT09IFwiUmFuZG9tXCIgPyBNYXRoVXRpbC5yYW5kb21Db2xvcigpIDogdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSB0aGF0IHRoZSBjb2xvciBpcyBhbiBpbnN0YW5jZSBvZiBQcm90b24uQXJyYXlTcGFuLCBpZiBub3QgaXQgbWFrZXMgYSBuZXcgaW5zdGFuY2VcbiAgICpcbiAgICogQG1ldGhvZCBzZXRTcGFuVmFsdWVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFycmF5U3BhbihhcnIpIHtcbiAgICBpZiAoIWFycikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoYXJyIGluc3RhbmNlb2YgQXJyYXlTcGFuKSByZXR1cm4gYXJyO1xuICAgIGVsc2UgcmV0dXJuIG5ldyBBcnJheVNwYW4oYXJyKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMud2lkdGggPSB3O1xuICAgIHRoaXMuaGVpZ2h0ID0gaDtcblxuICAgIHRoaXMuYm90dG9tID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gIH1cblxuICBjb250YWlucyh4LCB5KSB7XG4gICAgaWYgKHggPD0gdGhpcy5yaWdodCAmJiB4ID49IHRoaXMueCAmJiB5IDw9IHRoaXMuYm90dG9tICYmIHkgPj0gdGhpcy55KSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0ZSB7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXNzaW9uIChhIFtwYXJ0aWNsZV0vYiBbc10pO1xuICAgKiBAbmFtZXNwYWNlXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFJhdGVcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheSB8IE51bWJlciB8IFNwYW59IG51bXBhbiB0aGUgbnVtYmVyIG9mIGVhY2ggZW1pc3Npb247XG4gICAqIEBwYXJhbSB7QXJyYXkgfCBOdW1iZXIgfCBTcGFufSB0aW1lcGFuIHRoZSB0aW1lIG9mIGVhY2ggZW1pc3Npb247XG4gICAqIGZvciBleGFtcGxlOiBuZXcgUmF0ZShuZXcgU3BhbigxMCwgMjApLCBuZXcgU3BhbiguMSwgLjI1KSk7XG4gICAqL1xuICBjb25zdHJ1Y3RvcihudW1wYW4sIHRpbWVwYW4pIHtcbiAgICB0aGlzLm51bVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKG51bXBhbiwgMSkpO1xuICAgIHRoaXMudGltZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKHRpbWVwYW4sIDEpKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gMDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIGdldFZhbHVlKHRpbWUpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lID49IHRoaXMubmV4dFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcblxuICAgICAgaWYgKHRoaXMubnVtUGFuLmIgPT09IDEpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtUGFuLmdldFZhbHVlKGZhbHNlKSA+IDAuNSkgcmV0dXJuIDE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1QYW4uZ2V0VmFsdWUodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEluaXRpYWxpemUge1xuICByZXNldCgpIHt9XG5cbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplKHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplKGVtaXR0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN1YiBjbGFzcyBpbml0XG4gIGluaXRpYWxpemUodGFyZ2V0KSB7fVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5saWZlUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJMaWZlXCI7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLmxpZmVQYW4uYSA9PT0gSW5maW5pdHkpIHRhcmdldC5saWZlID0gSW5maW5pdHk7XG4gICAgZWxzZSB0YXJnZXQubGlmZSA9IHRoaXMubGlmZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVjdG9yID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICAgIHRoaXMucmFuZG9tID0gMDtcbiAgICB0aGlzLmNyb3NzVHlwZSA9IFwiZGVhZFwiO1xuICAgIHRoaXMuYWxlcnQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7fVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50Wm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLng7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgUG9pbnRab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3NpbmcgbWV0aG9kIVwiKTtcbiAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbiBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3Rvcih6b25lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICAgIHRoaXMubmFtZSA9IFwiUG9zaXRpb25cIjtcbiAgfVxuXG4gIHJlc2V0KHpvbmUpIHtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0aGlzLnpvbmUuZ2V0UG9zaXRpb24oKTtcblxuICAgIHRhcmdldC5wLnggPSB0aGlzLnpvbmUudmVjdG9yLng7XG4gICAgdGFyZ2V0LnAueSA9IHRoaXMuem9uZS52ZWN0b3IueTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVsb2NpdHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IocnBhbiwgdGhhcGFuLCB0eXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcblxuICAgIHRoaXMubmFtZSA9IFwiVmVsb2NpdHlcIjtcbiAgfVxuXG4gIHJlc2V0KHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZVZlbG9jaXR5KHZyKSB7XG4gICAgcmV0dXJuIHZyICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwicFwiIHx8IHRoaXMudHlwZSA9PT0gXCJQXCIgfHwgdGhpcy50eXBlID09PSBcInBvbGFyXCIpIHtcbiAgICAgIGNvbnN0IHBvbGFyMmQgPSBuZXcgUG9sYXIyRChcbiAgICAgICAgdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSksXG4gICAgICAgIHRoaXMudGhhUGFuLmdldFZhbHVlKCkgKiBNYXRoVXRpbC5QSV8xODBcbiAgICAgICk7XG5cbiAgICAgIHRhcmdldC52LnggPSBwb2xhcjJkLmdldFgoKTtcbiAgICAgIHRhcmdldC52LnkgPSBwb2xhcjJkLmdldFkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnYueCA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpO1xuICAgICAgdGFyZ2V0LnYueSA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy50aGFQYW4uZ2V0VmFsdWUoKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3MgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXNzUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gICAgdGhpcy5uYW1lID0gXCJNYXNzXCI7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIHRhcmdldC5tYXNzID0gdGhpcy5tYXNzUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaXVzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlJhZGl1c1wiO1xuICB9XG5cbiAgcmVzZXQoYSwgYiwgYykge1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucmFkaXVzID0gdGhpcy5yYWRpdXMuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4uL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoaW1hZ2UsIHcsIGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMuc2V0U3BhblZhbHVlKGltYWdlKTtcbiAgICB0aGlzLncgPSBVdGlsLmluaXRWYWx1ZSh3LCAyMCk7XG4gICAgdGhpcy5oID0gVXRpbC5pbml0VmFsdWUoaCwgdGhpcy53KTtcbiAgICB0aGlzLm5hbWUgPSBcIkJvZHlcIjtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBjb25zdCBpbWFnZVRhcmdldCA9IHRoaXMuaW1hZ2UuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0eXBlb2YgaW1hZ2VUYXJnZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLncsXG4gICAgICAgIGhlaWdodDogdGhpcy5oLFxuICAgICAgICBzcmM6IGltYWdlVGFyZ2V0LFxuICAgICAgICBpc0lubmVyOiB0cnVlLFxuICAgICAgICBpbm5lcjogdHJ1ZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IGltYWdlVGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIHNldFNwYW5WYWx1ZShpbWFnZSkge1xuICAgIHJldHVybiBpbWFnZSBpbnN0YW5jZW9mIEFycmF5U3BhbiA/IGltYWdlIDogbmV3IEFycmF5U3BhbihpbWFnZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4uL21hdGgvZWFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWhhdmlvdXIge1xuICBzdGF0aWMgaWQgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgQmVoYXZpb3VyIGNsYXNzIGlzIHRoZSBiYXNlIGZvciB0aGUgb3RoZXIgQmVoYXZpb3VyXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgLVxuICAgKiBAaW50ZXJmYWNlXG4gICAqIEBhbGlhcyBQcm90b24uQmVoYXZpb3VyXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsaWZlIFx0dGhlIGJlaGF2aW91cnMgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZWFzaW5nIFx0VGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kLCBmb3IgZXhhbXBsZSBlYXNlLmVhc2VPdXRRdWFydFxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gIGlkIFx0XHRUaGUgYmVoYXZpb3VycyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gIGFnZT0wIFx0SG93IGxvbmcgdGhlIHBhcnRpY2xlIHNob3VsZCBiZSAnYWxpZmUnXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgZW5lcmd5PTFcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWFkPWZhbHNlIFRoZSBwYXJ0aWNsZSBpcyBkZWFkIGF0IGZpcnN0XG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9ICAgcGFyZW50cyBcdFRoZSBiZWhhdmlvdXIncyBwYXJlbnRzIGFycmF5XG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAgbmFtZSBcdFRoZSBiZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IobGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcblxuICAgIHRoaXMuYWdlID0gMDtcbiAgICB0aGlzLmVuZXJneSA9IDE7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnRzID0gW107XG5cbiAgICB0aGlzLmlkID0gYEJlaGF2aW91cl8ke0JlaGF2aW91ci5pZCsrfWA7XG4gICAgdGhpcy5uYW1lID0gXCJCZWhhdmlvdXJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgZm9yY2UgYnkgMToxMDA7XG4gICAqXG4gICAqIEBtZXRob2Qgbm9ybWFsaXplRm9yY2VcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSBmb3JjZVxuICAgKi9cbiAgbm9ybWFsaXplRm9yY2UoZm9yY2UpIHtcbiAgICByZXR1cm4gZm9yY2UubXVsdGlwbHlTY2FsYXIoUHJvdG9uLk1FQVNVUkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHZhbHVlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICovXG4gIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuYWdlICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlIHx8IHRoaXMuZGVhZCkge1xuICAgICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHBhcnRpY2xlLmFnZSAvIHBhcnRpY2xlLmxpZmUpO1xuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgYmVoYXZpb3VyXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcmVudHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMucGFyZW50c1tpXS5yZW1vdmVCZWhhdmlvdXIodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnRzLmxlbmd0aCA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yY2UgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkZvcmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeFxuICAgKiBAcGFyYW0ge051bWJlcn0gZnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuICAgIHRoaXMubmFtZSA9IFwiRm9yY2VcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGZ4LCBmeSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHRoaXMuZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0aW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIFRoaXMgYmVoYXZpb3VyIGxldCB0aGUgcGFydGljbGVzIGZvbGxvdyBvbmUgc3BlY2lmaWMgUHJvdG9uLlZlY3RvcjJEXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5BdHRyYWN0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb25cbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGl1c1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9yY2VcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGl1c1NxXG4gICAqIEBwcm9wZXJ0eSB7UHJvdG9uLlZlY3RvcjJEfSBhdHRyYWN0aW9uRm9yY2VcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxlbmd0aFNxXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLnJhZGl1cyA9IFV0aWwuaW5pdFZhbHVlKHJhZGl1cywgMTAwMCk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIHRoaXMubmFtZSA9IFwiQXR0cmFjdGlvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLmNvcHkodGhpcy50YXJnZXRQb3NpdGlvbik7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uuc3ViKHBhcnRpY2xlLnApO1xuICAgIHRoaXMubGVuZ3RoU3EgPSB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoU3EgPiAwLjAwMDA0ICYmIHRoaXMubGVuZ3RoU3EgPCB0aGlzLnJhZGl1c1NxKSB7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5ub3JtYWxpemUoKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKDEgLSB0aGlzLmxlbmd0aFNxIC8gdGhpcy5yYWRpdXNTcSk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5tdWx0aXBseVNjYWxhcih0aGlzLmZvcmNlKTtcblxuICAgICAgcGFydGljbGUuYS5hZGQodGhpcy5hdHRyYWN0aW9uRm9yY2UpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbURyaWZ0IGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUmFuZG9tRHJpZnRcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgVGhlIHRpbWUgb2YgdGhlIGRyaWZ0XG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZHJpZnRYLCBkcmlmdFksIGRlbGF5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXkpO1xuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5uYW1lID0gXCJSYW5kb21EcmlmdFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFggXHRcdFx0XHRYIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WSAgXHRcdFx0XHRZIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IFx0XHRcdFx0SG93IG11Y2ggZGVsYXkgdGhlIGRyaWZ0IHNob3VsZCBoYXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMucGFuRm9jZSA9IG5ldyBWZWN0b3IyRChkcmlmdFgsIGRyaWZ0WSk7XG4gICAgdGhpcy5wYW5Gb2NlID0gdGhpcy5ub3JtYWxpemVGb3JjZSh0aGlzLnBhbkZvY2UpO1xuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1JhbmRvbURyaWZ0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGltZSA+PSB0aGlzLmRlbGF5KSB7XG4gICAgICBwYXJ0aWNsZS5hLmFkZFhZKFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueCwgdGhpcy5wYW5Gb2NlLngpLFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueSwgdGhpcy5wYW5Gb2NlLnkpXG4gICAgICApO1xuXG4gICAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEZvcmNlIGZyb20gXCIuL0ZvcmNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHkgZXh0ZW5kcyBGb3JjZSB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uR3Jhdml0eVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZyBcdFx0XHRcdFx0XHRcdEdyYXZpdHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcigwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMubmFtZSA9IFwiR3Jhdml0eVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkdyYXZpdHlcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQoMCwgZywgbGlmZSwgZWFzaW5nKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayBhZnRlciBjb2xsaXNpb25cbiAgICpcbiAgICogQGNhbGxiYWNrIENhbGxiYWNrXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJpdGNsZX0gb3RoZXJQYXJ0aWNsZVxuICAgKi9cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xsaXNpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIHRvIG1hc3NcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gXHRbZW1pdHRlcj1udWxsXSBcdFx0dGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBcdFx0W21hc3M9dHJ1ZV1cbiAgICogQHBhcmFtIHtDYWxsYmFja31cdCBcdFtjYWxsYmFjaz1udWxsXVx0XHR0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIGNvbGxpc2lvblxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjayk7XG4gICAgdGhpcy5uYW1lID0gXCJDb2xsaXNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBVdGlsLmluaXRWYWx1ZShlbWl0dGVyLCBudWxsKTtcbiAgICB0aGlzLm1hc3MgPSBVdGlsLmluaXRWYWx1ZShtYXNzLCB0cnVlKTtcbiAgICB0aGlzLmNhbGxiYWNrID0gVXRpbC5pbml0VmFsdWUoY2FsbGJhY2ssIG51bGwpO1xuXG4gICAgdGhpcy5jb2xsaXNpb25Qb29sID0gW107XG4gICAgdGhpcy5kZWx0YSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBjb25zdCBuZXdQb29sID0gdGhpcy5lbWl0dGVyID8gdGhpcy5lbWl0dGVyLnBhcnRpY2xlcy5zbGljZShpbmRleCkgOiB0aGlzLnBvb2wuc2xpY2UoaW5kZXgpO1xuICAgIGNvbnN0IGxlbmd0aCA9IG5ld1Bvb2wubGVuZ3RoO1xuXG4gICAgbGV0IG90aGVyUGFydGljbGU7XG4gICAgbGV0IGxlbmd0aFNxO1xuICAgIGxldCBvdmVybGFwO1xuICAgIGxldCB0b3RhbE1hc3M7XG4gICAgbGV0IGF2ZXJhZ2VNYXNzMSwgYXZlcmFnZU1hc3MyO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBvdGhlclBhcnRpY2xlID0gbmV3UG9vbFtpXTtcblxuICAgICAgaWYgKG90aGVyUGFydGljbGUgIT09IHBhcnRpY2xlKSB7XG4gICAgICAgIHRoaXMuZGVsdGEuY29weShvdGhlclBhcnRpY2xlLnApO1xuICAgICAgICB0aGlzLmRlbHRhLnN1YihwYXJ0aWNsZS5wKTtcblxuICAgICAgICBsZW5ndGhTcSA9IHRoaXMuZGVsdGEubGVuZ3RoU3EoKTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBwYXJ0aWNsZS5yYWRpdXMgKyBvdGhlclBhcnRpY2xlLnJhZGl1cztcblxuICAgICAgICBpZiAobGVuZ3RoU3EgPD0gZGlzdGFuY2UgKiBkaXN0YW5jZSkge1xuICAgICAgICAgIG92ZXJsYXAgPSBkaXN0YW5jZSAtIE1hdGguc3FydChsZW5ndGhTcSk7XG4gICAgICAgICAgb3ZlcmxhcCArPSAwLjU7XG5cbiAgICAgICAgICB0b3RhbE1hc3MgPSBwYXJ0aWNsZS5tYXNzICsgb3RoZXJQYXJ0aWNsZS5tYXNzO1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMSA9IHRoaXMubWFzcyA/IG90aGVyUGFydGljbGUubWFzcyAvIHRvdGFsTWFzcyA6IDAuNTtcbiAgICAgICAgICBhdmVyYWdlTWFzczIgPSB0aGlzLm1hc3MgPyBwYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuXG4gICAgICAgICAgcGFydGljbGUucC5hZGQoXG4gICAgICAgICAgICB0aGlzLmRlbHRhXG4gICAgICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIC1hdmVyYWdlTWFzczEpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBvdGhlclBhcnRpY2xlLnAuYWRkKHRoaXMuZGVsdGEubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIGF2ZXJhZ2VNYXNzMikpO1xuXG4gICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHBhcnRpY2xlLCBvdGhlclBhcnRpY2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3NzWm9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIGNvbWUgdG8gdGhlIGVuZCBvZiB0aGUgc3BlY2lmaWVkIHpvbmVcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNyb3NzWm9uZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdFx0XHR3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBwYXNzIHRoZSB6b25lIC0gYWxsb3dlZCBzdHJpbmdzOiBkZWFkIHwgYm91bmQgfCBjcm9zc1xuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoem9uZSwgY3Jvc3NUeXBlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNyb3NzWm9uZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uWm9uZX0gem9uZSBcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy56b25lID0gem9uZTtcbiAgICB0aGlzLnpvbmUuY3Jvc3NUeXBlID0gVXRpbC5pbml0VmFsdWUoY3Jvc3NUeXBlLCBcImRlYWRcIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHRoaXMuem9uZS5jcm9zc2luZyhwYXJ0aWNsZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHBoYSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQWxwaGFcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQWxwaGFcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BbHBoYVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5ldyBhbHBoYSB2YWx1ZSBvZiB0aGUgcGFydGljbGVcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGUgQSBzaW5nbGUgUHJvdG9uIGdlbmVyYXRlZCBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEuYWxwaGFBID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHBhcnRpY2xlLmRhdGEuYWxwaGFBO1xuICAgIGVsc2UgcGFydGljbGUuZGF0YS5hbHBoYUIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHBhcnRpY2xlLmFscGhhID0gcGFydGljbGUuZGF0YS5hbHBoYUIgKyAocGFydGljbGUuZGF0YS5hbHBoYUEgLSBwYXJ0aWNsZS5kYXRhLmFscGhhQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5hbHBoYSA8IDAuMDAxKSBwYXJ0aWNsZS5hbHBoYSA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2FsZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiU2NhbGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5zY2FsZUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQiA9IHRoaXMuc2FtZSA/IHBhcnRpY2xlLmRhdGEuc2NhbGVBIDogdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5zY2FsZSA9IHBhcnRpY2xlLmRhdGEuc2NhbGVCICsgKHBhcnRpY2xlLmRhdGEuc2NhbGVBIC0gcGFydGljbGUuZGF0YS5zY2FsZUIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICBpZiAocGFydGljbGUuc2NhbGUgPCAwLjAwMDEpIHBhcnRpY2xlLnNjYWxlID0gMDtcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyAqIHBhcnRpY2xlLnNjYWxlO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Sb3RhdGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScsICdiJyBhbmQgJ3N0eWxlJ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2luZmx1ZW5jZT1WZWxvY2l0eV0gVGhlIHJvdGF0aW9uJ3MgaW5mbHVlbmNlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbc3R5bGU9dG9dXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5mbHVlbmNlLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoaW5mbHVlbmNlLCBiLCBzdHlsZSk7XG4gICAgdGhpcy5uYW1lID0gXCJSb3RhdGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnLCAnYicgYW5kICdzdHlsZSdcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHlsZT10b11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIFwiVmVsb2NpdHlcIikpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGIsIDApKTtcbiAgICB0aGlzLnN0eWxlID0gVXRpbC5pbml0VmFsdWUoc3R5bGUsIFwidG9cIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25BID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoIXRoaXMuc2FtZSkgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGlmICghdGhpcy5zYW1lKSB7XG4gICAgICBpZiAodGhpcy5zdHlsZSA9PT0gXCJ0b1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiVE9cIiB8fCB0aGlzLnN0eWxlID09PSBcIl9cIikge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPVxuICAgICAgICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25CICsgKHBhcnRpY2xlLmRhdGEucm90YXRpb25BIC0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkIpICogdGhpcy5lbmVyZ3k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuYS5hID09PSBcIlZcIiB8fCB0aGlzLmEuYSA9PT0gXCJWZWxvY2l0eVwiIHx8IHRoaXMuYS5hID09PSBcInZcIikge1xuICAgICAgLy8gYmV0YS4uLlxuICAgICAgcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZS5nZXREaXJlY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xvclxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGEgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGIgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNvbG9yXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihhKTtcbiAgICB0aGlzLmIgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGIpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuY29sb3IgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmNvbG9yQSA9IENvbG9yVXRpbC5oZXhUb1JnYihwYXJ0aWNsZS5jb2xvcik7XG5cbiAgICBpZiAodGhpcy5iKSBwYXJ0aWNsZS5kYXRhLmNvbG9yQiA9IENvbG9yVXRpbC5oZXhUb1JnYih0aGlzLmIuZ2V0VmFsdWUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGlmICh0aGlzLmIpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckIuciArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yIC0gcGFydGljbGUuZGF0YS5jb2xvckIucikgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckIuZyArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nIC0gcGFydGljbGUuZGF0YS5jb2xvckIuZykgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckIuYiArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iIC0gcGFydGljbGUuZGF0YS5jb2xvckIuYikgKiB0aGlzLmVuZXJneTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5yZ2IuciA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5yZ2IuZyA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5yZ2IuYiA8PCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLnI7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmc7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmI7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuY29uc3QgQ0hBTkdJTkcgPSBcImNoYW5naW5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN5Y2xvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkN5Y2xvbmVcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDeWNsb25lXCI7XG4gIH1cblxuICBzZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuXG4gICAgaWYgKGFuZ2xlID09PSBcInJpZ2h0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSAtTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInJhbmRvbVwiO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJzcGFuXCI7XG4gICAgICB0aGlzLnNwYW4gPSBhbmdsZTtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5naW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiYXV0b1wiXG4gICAgKSB7XG4gICAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgfSBlbHNlIGlmIChmb3JjZSkge1xuICAgICAgdGhpcy5mb3JjZSA9IGZvcmNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSBNYXRoVXRpbC5yYW5kb21BVG9CKC1NYXRoVXRpbC5QSSwgTWF0aFV0aWwuUEkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gdGhpcy5zcGFuLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBsZXQgbGVuZ3RoO1xuICAgIGxldCBncmFkaWVudCA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIiB8fCB0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgZ3JhZGllbnQgKz0gcGFydGljbGUuZGF0YS5jYW5nbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyYWRpZW50ICs9IHRoaXMuYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9yY2UgPT09IENIQU5HSU5HKSB7XG4gICAgICBsZW5ndGggPSBwYXJ0aWNsZS52Lmxlbmd0aCgpIC8gMTAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0aGlzLmZvcmNlO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS54ID0gbGVuZ3RoICogTWF0aC5jb3MoZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS55ID0gbGVuZ3RoICogTWF0aC5zaW4oZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IHRoaXMubm9ybWFsaXplRm9yY2UocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgICBwYXJ0aWNsZS5hLmFkZChwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICB9XG59XG4iLCJpbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9BdHRyYWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcHVsc2lvbiBleHRlbmRzIEF0dHJhY3Rpb24ge1xuICAvKipcbiAgICogVGhlIG9wcGlzaXRlIG9mIFByb3Rvbi5BdHRyYWN0aW9uIC0gdHVybnMgdGhlIGZvcmNlXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlJlcHVsc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcbiAgICB0aGlzLm5hbWUgPSBcIlJlcHVsc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJlcHVsc2lvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eVdlbGwgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBHcmF2aXR5V2VsbFxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbY2VudGVyUG9pbnQ9bmV3IFZlY3RvcjJEXSBUaGUgcG9pbnQgaW4gdGhlIGNlbnRlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cdFx0XHRcdFx0VGhlIGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV1cdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5V2VsbFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jR3Jhdml0eVdlbGxcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoY2VudGVyUG9pbnQsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbmhlcml0ZG9jXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMuc2V0KHRoaXMuY2VudGVyUG9pbnQueCAtIHBhcnRpY2xlLnAueCwgdGhpcy5jZW50ZXJQb2ludC55IC0gcGFydGljbGUucC55KTtcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKGRpc3RhbmNlU3EgIT09IDApIHtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGgoKTtcbiAgICAgIGNvbnN0IGZhY3RvciA9ICh0aGlzLmZvcmNlICogdGltZSkgLyAoZGlzdGFuY2VTcSAqIGRpc3RhbmNlKTtcblxuICAgICAgcGFydGljbGUudi54ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueDtcbiAgICAgIHBhcnRpY2xlLnYueSArPSBmYWN0b3IgKiB0aGlzLmRpc3RhbmNlVmVjLnk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0aWFsaXplKGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplcykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGluaXRpYWxpemVzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGluaXRpYWxpemVzW2ldIGluc3RhbmNlb2YgSW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplc1tpXS5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpO1xuICB9LFxuXG4gIC8vIGluaXRcbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZSkge1xuICAgIFByb3BVdGlsLnNldFByb3AocGFydGljbGUsIGluaXRpYWxpemUpO1xuICAgIFByb3BVdGlsLnNldFZlY3RvclZhbChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gIH0sXG5cbiAgYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAoZW1pdHRlci5iaW5kRW1pdHRlcikge1xuICAgICAgcGFydGljbGUucC5hZGQoZW1pdHRlci5wKTtcbiAgICAgIHBhcnRpY2xlLnYuYWRkKGVtaXR0ZXIudik7XG4gICAgICBwYXJ0aWNsZS5hLmFkZChlbWl0dGVyLmEpO1xuICAgICAgcGFydGljbGUudi5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKGVtaXR0ZXIucm90YXRpb24pKTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZVV0aWwgZnJvbSBcIi4uL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlciBleHRlbmRzIFBhcnRpY2xlIHtcbiAgLyoqXG4gICAqIFlvdSBjYW4gdXNlIHRoaXMgZW1pdCBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEl0IHdpbGwgZGlzcGF0Y2ggZm9sbG93IGV2ZW50czpcbiAgICogUEFSVElDTEVfQ1JFQVRFRFxuICAgKiBQQVJUSUNMRV9VUERBVEFcbiAgICogUEFSVElDTEVfREVBRFxuICAgKlxuICAgKiBAY2xhc3MgRW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7ZGFtcGluZzowLjAxLGJpbmRFbWl0dGVyOmZhbHNlfVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZiA9IHt9KSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuICAgIHRoaXMuaW5pdGlhbGl6ZXMgPSBbXTtcblxuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuZW1pdFNwZWVkID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyaWN0aW9uIGNvZWZmaWNpZW50IGZvciBhbGwgcGFydGljbGUgZW1pdCBieSBUaGlzO1xuICAgICAqIEBwcm9wZXJ0eSBkYW1waW5nXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwLjAwNlxuICAgICAqL1xuICAgIHRoaXMuZGFtcGluZyA9IDAuMDA2O1xuXG4gICAgLyoqXG4gICAgICogSWYgYmluZEVtaXR0ZXIgdGhlIHBhcnRpY2xlcyBjYW4gYmluZCB0aGlzIGVtaXR0ZXIncyBwcm9wZXJ0eTtcbiAgICAgKiBAcHJvcGVydHkgYmluZEVtaXR0ZXJcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgdGhpcy5iaW5kRW1pdHRlciA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXQgKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAgICogQHByb3BlcnR5IHJhdGVcbiAgICAgKiBAdHlwZSB7UmF0ZX1cbiAgICAgKiBAZGVmYXVsdCBSYXRlKDEsIC4xKVxuICAgICAqL1xuICAgIHRoaXMucmF0ZSA9IG5ldyBSYXRlKDEsIDAuMSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkVtaXR0ZXJcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbWl0VGltZSBiZWdpbiBlbWl0IHRpbWU7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsaWZlIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlclxuICAgKi9cbiAgZW1pdCh0b3RhbFRpbWUsIGxpZmUpIHtcbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gVXRpbC5pbml0VmFsdWUodG90YWxUaW1lLCBJbmZpbml0eSk7XG5cbiAgICBpZiAobGlmZSA9PT0gdHJ1ZSB8fCBsaWZlID09PSBcImxpZmVcIiB8fCBsaWZlID09PSBcImRlc3Ryb3lcIikge1xuICAgICAgdGhpcy5saWZlID0gdG90YWxUaW1lID09PSBcIm9uY2VcIiA/IDEgOiB0aGlzLnRvdGFsVGltZTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihsaWZlKSkge1xuICAgICAgdGhpcy5saWZlID0gbGlmZTtcbiAgICB9XG5cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJvbmNlXCIpIHtcbiAgICAgIGxldCBpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB0aGlzLnRvdGFsVGltZSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG5cbiAgICAgIGlmICh0aGlzLmVtaXRUaW1lIDwgdGhpcy50b3RhbFRpbWUpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgc2luZ2xlIHBhcnRpY2xlO1xuICAgKlxuICAgKiBjYW4gdXNlIGVtaXQoe3g6MTB9LG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KSBvciBlbWl0KFt7eDoxMH0sbmV3IEluaXRpYWxpemVdLG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KVxuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGxldCBpbml0aWFsaXplcyA9IHRoaXMuaW5pdGlhbGl6ZXM7XG4gICAgbGV0IGJlaGF2aW91cnMgPSB0aGlzLmJlaGF2aW91cnM7XG5cbiAgICBpZiAoaW5pdGlhbGl6ZSkgaW5pdGlhbGl6ZXMgPSBVdGlsLnRvQXJyYXkoaW5pdGlhbGl6ZSk7XG4gICAgaWYgKGJlaGF2aW91cikgYmVoYXZpb3VycyA9IFV0aWwudG9BcnJheShiZWhhdmlvdXIpO1xuXG4gICAgcGFydGljbGUucmVzZXQoKTtcbiAgICBJbml0aWFsaXplVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcyk7XG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucGFydGljbGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcblxuICAgIHRoaXMucmF0ZSA9IG51bGw7XG4gICAgdGhpcy5vbGQgPSBudWxsO1xuICAgIHRoaXMucmdiID0gbnVsbDtcbiAgICB0aGlzLnYgPSBudWxsO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdGhpcy5wID0gbnVsbDtcbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChFbWl0dGVyKTtcbiIsImltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyRW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEJlaGF2aW91ckVtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEJlaGF2aW91ckVtaXR0ZXIgeW91IGNhbiBhZGQgYmVoYXZpb3VycyB0byBzZWxmO1xuICAgKiBAY2xhc3MgUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMuc2VsZkJlaGF2aW91cnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBlbWl0dGVyO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IFByb3Rvbi5Db2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZFNlbGZCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpLFxuICAgICAgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXIgZm9yIHNlbGZcbiAgICogQG1ldGhvZCByZW1vdmVTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVTZWxmQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuc2VsZkJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgc3VwZXIudXBkYXRlKHRpbWUpO1xuXG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmxlbmd0aDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd0VtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBGb2xsb3dFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBGb2xsb3dFbWl0dGVyIHdpbGwgZW1pdCBwYXJ0aWNsZSB3aGVuIG1vdXNlbW92aW5nXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uRm9sbG93RW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtFbGVtZW50fSBtb3VzZVRhcmdldCBtb3VzZWV2ZW50J3MgdGFyZ2V0O1xuICAgKiBAcGFyYW0ge051bWJlcn0gZWFzZSB0aGUgZWFzaW5nIG9mIGZvbGxvd2luZyBzcGVlZDtcbiAgICogQGRlZmF1bHQgMC43XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1vdXNlVGFyZ2V0LCBlYXNlLCBjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcblxuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlbW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZWRvd24uY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNldXBIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNldXAuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZW1vdmUoZSkge1xuICAgIGlmIChlLmxheWVyWCB8fCBlLmxheWVyWCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUubGF5ZXJYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH0gZWxzZSBpZiAoZS5vZmZzZXRYIHx8IGUub2Zmc2V0WCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUub2Zmc2V0WCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLm9mZnNldFkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoXCJvbmNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHBpY3R1cmUgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc0ltYWdlKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5fX2lzSW1hZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIG9iai5fX2lzSW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHN0cmluZyBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICB9XG59O1xuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5uYW1lID0gXCJCYXNlUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFN0cm9rZShjb2xvciA9IFwiIzAwMDAwMFwiLCB0aGlua25lc3MgPSAxKSB7XG4gICAgdGhpcy5zdHJva2UgPSB7IGNvbG9yLCB0aGlua25lc3MgfTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZUFmdGVyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyQWRkZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlclJlbW92ZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZURlYWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwcm90b247XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0ltYWdlIG1ldGhvZFxuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZSBkcmF3Q2lyY2xlIC0tXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY2lyY2xlXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvLyBwcml2YXRlIGNyZWF0ZUJ1ZmZlclxuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoVHlwZXMuaXNJbWFnZShpbWFnZSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBpbWFnZS53aWR0aCArIFwiX1wiICsgaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV07XG5cbiAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdID0gY2FudmFzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtM2QgPSBmYWxzZTtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRvbVJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zZCkge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybTNkKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0ocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUub3BhY2l0eSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgICBpZiAocGFydGljbGUuYm9keS5pc0NpcmNsZSkge1xuICAgICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGJvZHlSZWFkeShwYXJ0aWNsZSkge1xuICAgIHJldHVybiB0eXBlb2YgcGFydGljbGUuYm9keSA9PT0gXCJvYmplY3RcIiAmJiBwYXJ0aWNsZS5ib2R5ICYmICFwYXJ0aWNsZS5ib2R5LmlzSW5uZXI7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChpbWcsIHBhcnRpY2xlKTtcbiAgICBEb21VdGlsLnJlc2l6ZShwYXJ0aWNsZS5ib2R5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIDIgKiBwYXJ0aWNsZS5yYWRpdXMsIDIgKiBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHtwYXJ0aWNsZS5yYWRpdXN9cHhgO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJXaWR0aCA9IGAke3RoaXMuc3Ryb2tlLnRoaW5rbmVzc31weGA7XG4gICAgfVxuICAgIGRvbS5pc0NpcmNsZSA9IHRydWU7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdXJsID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIgPyBib2R5IDogYm9keS5zcmM7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIGJvZHkud2lkdGgsIGJvZHkuaGVpZ2h0KTtcbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3VybH0pYDtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc2VsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMubmFtZSA9IFwiRWFzZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgdGhpcy5jcmVhdGVTcHJpdGUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHBhcnRpY2xlLmJvZHkuc2NhbGVYID0gcGFydGljbGUuYm9keS5zY2FsZVkgPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICAgIHBhcnRpY2xlLmJvZHkucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnBhcmVudCAmJiBwYXJ0aWNsZS5ib2R5LnBhcmVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUuZ3JhcGhpY3MpIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuZ3JhcGhpY3MpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBjcmVhdGVTcHJpdGUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5LnBhcmVudCkgcmV0dXJuO1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5W1wiaW1hZ2VcIl0pIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWCA9IHBhcnRpY2xlLmJvZHkuaW1hZ2Uud2lkdGggLyAyO1xuICAgICAgcGFydGljbGUuYm9keS5yZWdZID0gcGFydGljbGUuYm9keS5pbWFnZS5oZWlnaHQgLyAyO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gdGhpcy5wb29sLmdldChjcmVhdGVqcy5HcmFwaGljcyk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkpIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UodGhpcy5zdHJva2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UoXCIjMDAwMDAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCIpLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMucG9vbC5nZXQoY3JlYXRlanMuU2hhcGUsIFtncmFwaGljc10pO1xuXG4gICAgcGFydGljbGUuYm9keSA9IHNoYXBlO1xuICAgIHBhcnRpY2xlLmdyYXBoaWNzID0gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgcmVjdGFuZ2xlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLmNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhlbFJlbmRlcmVyXCI7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBjcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGUgPyByZWN0YW5nbGUgOiBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCh0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55LCB0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICB0aGlzLnJlY3RhbmdsZS54LFxuICAgICAgdGhpcy5yZWN0YW5nbGUueSxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLndpZHRoLFxuICAgICAgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhKSB7XG4gICAgICB0aGlzLnNldFBpeGVsKFxuICAgICAgICB0aGlzLmltYWdlRGF0YSxcbiAgICAgICAgKHBhcnRpY2xlLnAueCAtIHRoaXMucmVjdGFuZ2xlLngpID4+IDAsXG4gICAgICAgIChwYXJ0aWNsZS5wLnkgLSB0aGlzLnJlY3RhbmdsZS55KSA+PiAwLFxuICAgICAgICBwYXJ0aWNsZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQaXhlbChpbWFnZWRhdGEsIHgsIHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgcmdiID0gcGFydGljbGUucmdiO1xuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5lbGVtZW50LndpZHRoIHx8IHkgPCAwIHx8IHkgPiB0aGlzLmVsZW1lbnR3aWR0aCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIGltYWdlZGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaV0gPSByZ2IucjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMV0gPSByZ2IuZztcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMl0gPSByZ2IuYjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgM10gPSBwYXJ0aWNsZS5hbHBoYSAqIDI1NTtcbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5sZXQgUElYSUNsYXNzO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4aVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLmNvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuYmxlbmRNb2RlID0gbnVsbDtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuc2V0UElYSSh3aW5kb3cuUElYSSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGlSZW5kZXJlclwiO1xuICB9XG5cbiAgc2V0UElYSShQSVhJKSB7XG4gICAgdHJ5IHtcbiAgICAgIFBJWElDbGFzcyA9IFBJWEkgfHwgeyBTcHJpdGU6IHt9IH07XG4gICAgICB0aGlzLmNyZWF0ZUZyb21JbWFnZSA9IFBJWElDbGFzcy5TcHJpdGUuZnJvbSB8fCBQSVhJQ2xhc3MuU3ByaXRlLmZyb21JbWFnZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICB0aGlzLnRyYW5zZm9ybShwYXJ0aWNsZSwgcGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAodGhpcy5zZXRDb2xvciA9PT0gdHJ1ZSB8fCB0aGlzLmNvbG9yID09PSB0cnVlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnRpbnQgPSBDb2xvclV0aWwuZ2V0SGV4MTZGcm9tUGFydGljbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICB0cmFuc2Zvcm0ocGFydGljbGUsIHRhcmdldCkge1xuICAgIHRhcmdldC54ID0gcGFydGljbGUucC54O1xuICAgIHRhcmdldC55ID0gcGFydGljbGUucC55O1xuXG4gICAgdGFyZ2V0LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0YXJnZXQuc2NhbGUueCA9IHBhcnRpY2xlLnNjYWxlO1xuICAgIHRhcmdldC5zY2FsZS55ID0gcGFydGljbGUuc2NhbGU7XG5cbiAgICAvLyB1c2luZyBjYWNoZWQgdmVyc2lvbiBvZiBNYXRoVXRpbC5QSV8xODAgZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZS5cbiAgICB0YXJnZXQucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDsgLy8gTWF0aFV0aWwuUElfMTgwO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHkpO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHkpIHtcbiAgICBjb25zdCBzcHJpdGUgPSBib2R5LmlzSW5uZXIgPyB0aGlzLmNyZWF0ZUZyb21JbWFnZShib2R5LnNyYykgOiBuZXcgUElYSUNsYXNzLlNwcml0ZShib2R5KTtcblxuICAgIHNwcml0ZS5hbmNob3IueCA9IDAuNTtcbiAgICBzcHJpdGUuYW5jaG9yLnkgPSAwLjU7XG5cbiAgICByZXR1cm4gc3ByaXRlO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSUNsYXNzLkdyYXBoaWNzKCk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGNvbnN0IHN0cm9rZSA9IFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSA/IHRoaXMuc3Ryb2tlIDogMHgwMDAwMDA7XG4gICAgICBncmFwaGljcy5iZWdpblN0cm9rZShzdHJva2UpO1xuICAgIH1cblxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCAweDAwOGNlZCk7XG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcblxuICAgIHJldHVybiBncmFwaGljcztcbiAgfVxuXG4gIGRlc3Ryb3kocGFydGljbGVzKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgbGV0IGkgPSBwYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXTtcbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTVN0YWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXRzID0gW107XG4gICAgdGhpcy5zaXplID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykgdGhpcy5tYXRzLnB1c2goTWF0My5jcmVhdGUoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XG4gIH1cblxuICBzZXQobSwgaSkge1xuICAgIGlmIChpID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbaSAtIDFdLCBtLCB0aGlzLm1hdHNbaV0pO1xuXG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgodGhpcy5zaXplLCBpICsgMSk7XG4gIH1cblxuICBwdXNoKG0pIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV0sIG0sIHRoaXMubWF0c1t0aGlzLnNpemVdKTtcblxuICAgIHRoaXMuc2l6ZSsrO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIGlmICh0aGlzLnNpemUgPiAwKSB0aGlzLnNpemUtLTtcbiAgfVxuXG4gIHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBNU3RhY2sgZnJvbSBcIi4uL3V0aWxzL01TdGFja1wiO1xuaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4uL3V0aWxzL1dlYkdMVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmdsID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgeyBhbnRpYWxpYXM6IHRydWUsIHN0ZW5jaWw6IGZhbHNlLCBkZXB0aDogZmFsc2UgfSk7XG4gICAgaWYgKCF0aGlzLmdsKSBhbGVydChcIlNvcnJ5IHlvdXIgYnJvd3NlciBkbyBub3Qgc3VwcGVzdCBXZWJHTCFcIik7XG5cbiAgICB0aGlzLmluaXRWYXIoKTtcbiAgICB0aGlzLnNldE1heFJhZGl1cygpO1xuICAgIHRoaXMuaW5pdFNoYWRlcnMoKTtcbiAgICB0aGlzLmluaXRCdWZmZXJzKCk7XG5cbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbC5GVU5DX0FERCk7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiV2ViR0xSZW5kZXJlclwiO1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICBzdXBlci5pbml0KHByb3Rvbik7XG4gICAgdGhpcy5yZXNpemUodGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy51bWF0WzRdID0gLTI7XG4gICAgdGhpcy51bWF0WzddID0gMTtcblxuICAgIHRoaXMuc21hdFswXSA9IDEgLyB3aWR0aDtcbiAgICB0aGlzLnNtYXRbNF0gPSAxIC8gaGVpZ2h0O1xuXG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMudW1hdCwgMCk7XG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMuc21hdCwgMSk7XG5cbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRNYXhSYWRpdXMocmFkaXVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNVUkwgPSB0aGlzLmNyZWF0ZUNpcmNsZShyYWRpdXMpO1xuICB9XG5cbiAgZ2V0VmVydGV4U2hhZGVyKCkge1xuICAgIGNvbnN0IHZzU291cmNlID0gW1xuICAgICAgXCJ1bmlmb3JtIHZlYzIgdmlld3BvcnQ7XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidW5pZm9ybSBtYXQzIHRNYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzMgdiA9IHRNYXQgKiB2ZWMzKGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcIixcbiAgICAgIFwiZ2xfUG9zaXRpb24gPSB2ZWM0KHYueCwgdi55LCAwLCAxKTtcIixcbiAgICAgIFwidlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcImFscGhhID0gdE1hdFswXVsyXTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiB2c1NvdXJjZTtcbiAgfVxuXG4gIGdldEZyYWdtZW50U2hhZGVyKCkge1xuICAgIGNvbnN0IGZzU291cmNlID0gW1xuICAgICAgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzQgY29sb3I7XCIsXG4gICAgICBcInVuaWZvcm0gYm9vbCB1c2VUZXh0dXJlO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzMgdUNvbG9yO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZUNvbG9yICogdmVjNCh1Q29sb3IsIDEuMCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvci53ICo9IGFscGhhO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIGZzU291cmNlO1xuICB9XG5cbiAgaW5pdFZhcigpIHtcbiAgICB0aGlzLm1zdGFjayA9IG5ldyBNU3RhY2soKTtcbiAgICB0aGlzLnVtYXQgPSBNYXQzLmNyZWF0ZShbMiwgMCwgMSwgMCwgLTIsIDAsIC0xLCAxLCAxXSk7XG4gICAgdGhpcy5zbWF0ID0gTWF0My5jcmVhdGUoWzEgLyAxMDAsIDAsIDEsIDAsIDEgLyAxMDAsIDAsIDAsIDAsIDFdKTtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0ge307XG4gIH1cblxuICBibGVuZEVxdWF0aW9uKEEpIHtcbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbFtBXSk7XG4gIH1cblxuICBibGVuZEZ1bmMoQSwgQikge1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2xbQV0sIHRoaXMuZ2xbQl0pO1xuICB9XG5cbiAgZ2V0U2hhZGVyKGdsLCBzdHIsIGZzKSB7XG4gICAgY29uc3Qgc2hhZGVyID0gZnMgPyBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKSA6IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcblxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHN0cik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgaW5pdFNoYWRlcnMoKSB7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyKCksIHRydWUpO1xuICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0VmVydGV4U2hhZGVyKCksIGZhbHNlKTtcblxuICAgIHRoaXMuc3Byb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5zcHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIGFsZXJ0KFwiQ291bGQgbm90IGluaXRpYWxpc2Ugc2hhZGVyc1wiKTtcblxuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcbiAgICB0aGlzLnNwcm9ncmFtLnZwYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVmVydGV4UG9zaXRpb25cIik7XG4gICAgdGhpcy5zcHJvZ3JhbS50Y2EgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVRleHR1cmVDb29yZFwiKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udGNhKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udnBhKTtcblxuICAgIHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInRNYXRcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidVNhbXBsZXJcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS51c2VUZXggPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVzZVRleHR1cmVcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5jb2xvciA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidUNvbG9yXCIpO1xuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0udXNlVGV4LCAxKTtcbiAgfVxuXG4gIGluaXRCdWZmZXJzKCkge1xuICAgIGNvbnN0IHZzID0gWzAsIDMsIDEsIDAsIDIsIDNdO1xuICAgIGxldCBpZHg7XG5cbiAgICB0aGlzLnVuaXRJQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh2cyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgbGV0IGk7XG4gICAgbGV0IGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSk7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnVuaXRJMzMgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJMzMpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpLCBpICsgMSwgaSArIDIpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy5zdHJpcEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuc3RyaXBCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHJhaWR1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzID0gV2ViR0xVdGlsLm5ocG90KFV0aWwuaW5pdFZhbHVlKHJhaWR1cywgMzIpKTtcbiAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhcImNpcmNsZV9jYW52YXNcIiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfVxuXG4gIGRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgX3cgPSBwYXJ0aWNsZS5ib2R5LndpZHRoO1xuICAgIGNvbnN0IF9oID0gcGFydGljbGUuYm9keS5oZWlnaHQ7XG5cbiAgICBjb25zdCBfd2lkdGggPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS53aWR0aCk7XG4gICAgY29uc3QgX2hlaWdodCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LmhlaWdodCk7XG5cbiAgICBjb25zdCBfc2NhbGVYID0gcGFydGljbGUuYm9keS53aWR0aCAvIF93aWR0aDtcbiAgICBjb25zdCBfc2NhbGVZID0gcGFydGljbGUuYm9keS5oZWlnaHQgLyBfaGVpZ2h0O1xuXG4gICAgaWYgKCF0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSlcbiAgICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdID0gW1xuICAgICAgICB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKVxuICAgICAgXTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZSA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzBdO1xuICAgIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsxXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMl07XG5cbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF9zY2FsZVgsIDAuMCwgMC4wLCBfc2NhbGVZLCBfc2NhbGVZLCBfc2NhbGVZXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF93LCAwLjAsIDAuMCwgX2gsIF93LCBfaF0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gcGFydGljbGUuZGF0YS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xuXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpO1xuICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggPSBfdztcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgPSBfaDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIC8vIHRoaXMuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAxKTtcbiAgICAvLyB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IGZhbHNlO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS50bWF0WzhdID0gMTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdFs4XSA9IDE7XG5cbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZSh0aGlzLmNpcmNsZUNhbnZhc1VSTCwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IHBhcnRpY2xlLnJhZGl1cyAvIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgICBwYXJ0aWNsZS5kYXRhLnNyYyA9IGltZy5zcmM7XG4gICAgcGFydGljbGUuZGF0YS5jYW52YXMgPSBJbWdVdGlsLmdldENhbnZhc0Zyb21DYWNoZShpbWcpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSAxO1xuXG4gICAgdGhpcy5kcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCkge1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgocGFydGljbGUpO1xuXG4gICAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNwcm9ncmFtLmNvbG9yLCBwYXJ0aWNsZS5yZ2IuciAvIDI1NSwgcGFydGljbGUucmdiLmcgLyAyNTUsIHBhcnRpY2xlLnJnYi5iIC8gMjU1KTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtLCBmYWxzZSwgdGhpcy5tc3RhY2sudG9wKCkpO1xuXG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udnBhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udGNhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0sIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuXG4gICAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgNiwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICB0aGlzLm1zdGFjay5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICB1cGRhdGVNYXRyaXgocGFydGljbGUpIHtcbiAgICBjb25zdCBtb3ZlT3JpZ2luTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCAvIDIsXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcblxuICAgIGNvbnN0IGFuZ2VsID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7XG4gICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVJvdGF0aW9uKGFuZ2VsKTtcblxuICAgIGNvbnN0IHNjYWxlID0gcGFydGljbGUuc2NhbGUgKiBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlO1xuICAgIGNvbnN0IHNjYWxlTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgIGxldCBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobW92ZU9yaWdpbk1hdHJpeCwgc2NhbGVNYXRyaXgpO1xuXG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgcm90YXRpb25NYXRyaXgpO1xuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHRyYW5zbGF0aW9uTWF0cml4KTtcblxuICAgIE1hdDMuaW52ZXJzZShtYXRyaXgsIHBhcnRpY2xlLmRhdGEuaW1hdCk7XG4gICAgbWF0cml4WzJdID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0aGlzLm1zdGFjay5wdXNoKG1hdHJpeCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdsID0gbnVsbDtcbiAgICB0aGlzLm1zdGFjayA9IG51bGw7XG4gICAgdGhpcy51bWF0ID0gbnVsbDtcbiAgICB0aGlzLnNtYXQgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tUmVuZGVyZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZGlyZWN0aW9uKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh4MiAtIHgxID49IDApIHtcbiAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54MSA9IHgyO1xuICAgICAgdGhpcy55MSA9IHkyO1xuICAgICAgdGhpcy54MiA9IHgxO1xuICAgICAgdGhpcy55MiA9IHkxO1xuICAgIH1cblxuICAgIHRoaXMuZHggPSB0aGlzLngyIC0gdGhpcy54MTtcbiAgICB0aGlzLmR5ID0gdGhpcy55MiAtIHRoaXMueTE7XG5cbiAgICB0aGlzLm1pbnggPSBNYXRoLm1pbih0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1pbnkgPSBNYXRoLm1pbih0aGlzLnkxLCB0aGlzLnkyKTtcbiAgICB0aGlzLm1heHggPSBNYXRoLm1heCh0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1heHkgPSBNYXRoLm1heCh0aGlzLnkxLCB0aGlzLnkyKTtcblxuICAgIHRoaXMuZG90ID0gdGhpcy54MiAqIHRoaXMueTEgLSB0aGlzLngxICogdGhpcy55MjtcbiAgICB0aGlzLnh4eXkgPSB0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5O1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlsLmluaXRWYWx1ZShkaXJlY3Rpb24sIFwiPlwiKTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLmNvcyh0aGlzLmdyYWRpZW50KTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLnNpbih0aGlzLmdyYWRpZW50KTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQiA9PT0gMCA/IDEgOiBCO1xuXG4gICAgaWYgKChBICogeCArIEIgKiB5ICsgQykgKiBEID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXREaXN0YW5jZSh4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQSAqIHggKyBCICogeSArIEM7XG5cbiAgICByZXR1cm4gRCAvIE1hdGguc3FydCh0aGlzLnh4eXkpO1xuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHYpIHtcbiAgICBjb25zdCB0aGEyID0gdi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG5cbiAgICBjb25zdCBvbGR4ID0gdi54O1xuICAgIGNvbnN0IG9sZHkgPSB2Lnk7XG5cbiAgICB2LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMuZHksIHRoaXMuZHgpO1xuICB9XG5cbiAgcmFuZ2VPdXQocGFydGljbGUpIHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYWJzKHRoaXMuZ2V0R3JhZGllbnQoKSk7XG5cbiAgICBpZiAoYW5nbGUgPD0gTWF0aFV0aWwuUEkgLyA0KSB7XG4gICAgICBpZiAocGFydGljbGUucC54IDw9IHRoaXMubWF4eCAmJiBwYXJ0aWNsZS5wLnggPj0gdGhpcy5taW54KSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueSA8PSB0aGlzLm1heHkgJiYgcGFydGljbGUucC55ID49IHRoaXMubWlueSkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keSk7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCI+XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiUlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcblxuICAgICAgaWYgKHRoaXMuZ2V0RGlzdGFuY2UocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpIDw9IHBhcnRpY2xlLnJhZGl1cykge1xuICAgICAgICBpZiAodGhpcy5keCA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR5ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlLnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIExpbmVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLmNlbnRlciA9IHsgeCwgeSB9O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJeDIgKiBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMucmFuZG9tUmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgc2V0Q2VudGVyKHgsIHkpIHtcbiAgICB0aGlzLmNlbnRlci54ID0geDtcbiAgICB0aGlzLmNlbnRlci55ID0geTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZCA9IHBhcnRpY2xlLnAuZGlzdGFuY2VUbyh0aGlzLmNlbnRlcik7XG5cbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAoZCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMucmFkaXVzKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChkICsgcGFydGljbGUucmFkaXVzID49IHRoaXMucmFkaXVzKSB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIENpcmNsZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdGhhMiA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudChwYXJ0aWNsZSk7XG5cbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcbiAgICBjb25zdCBvbGR4ID0gcGFydGljbGUudi54O1xuICAgIGNvbnN0IG9sZHkgPSBwYXJ0aWNsZS52Lnk7XG5cbiAgICBwYXJ0aWNsZS52LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHBhcnRpY2xlLnYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG4gIH1cblxuICBnZXRHcmFkaWVudChwYXJ0aWNsZSkge1xuICAgIHJldHVybiAtTWF0aFV0aWwuUElfMiArIE1hdGguYXRhbjIocGFydGljbGUucC55IC0gdGhpcy5jZW50ZXIueSwgcGFydGljbGUucC54IC0gdGhpcy5jZW50ZXIueCk7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIC8vIHBhcnRpY2xlIGRlYWQgem9uZVxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGJvdW5kIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBjcm9zcyB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCAmJiBwYXJ0aWNsZS52LnggPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoICYmIHBhcnRpY2xlLnYueCA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAmJiBwYXJ0aWNsZS52LnkgPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQgJiYgcGFydGljbGUudi55ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXNldChpbWFnZURhdGEsIHgsIHksIGQpO1xuICB9XG5cbiAgcmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBpbWFnZURhdGE7XG4gICAgdGhpcy54ID0gVXRpbC5pbml0VmFsdWUoeCwgMCk7XG4gICAgdGhpcy55ID0gVXRpbC5pbml0VmFsdWUoeSwgMCk7XG4gICAgdGhpcy5kID0gVXRpbC5pbml0VmFsdWUoZCwgMik7XG5cbiAgICB0aGlzLnZlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNldFZlY3RvcnMoKTtcbiAgfVxuXG4gIHNldFZlY3RvcnMoKSB7XG4gICAgbGV0IGksIGo7XG4gICAgY29uc3QgbGVuZ3RoMSA9IHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGxlbmd0aDIgPSB0aGlzLmltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSArPSB0aGlzLmQpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGgyOyBqICs9IHRoaXMuZCkge1xuICAgICAgICBsZXQgaW5kZXggPSAoKGogPj4gMCkgKiBsZW5ndGgxICsgKGkgPj4gMCkpICogNDtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkge1xuICAgICAgICAgIHRoaXMudmVjdG9ycy5wdXNoKHsgeDogaSArIHRoaXMueCwgeTogaiArIHRoaXMueSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldEJvdW5kKHgsIHkpIHtcbiAgICBjb25zdCBpbmRleCA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB2ZWN0b3IgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy52ZWN0b3JzKTtcbiAgICByZXR1cm4gdGhpcy52ZWN0b3IuY29weSh2ZWN0b3IpO1xuICB9XG5cbiAgZ2V0Q29sb3IoeCwgeSkge1xuICAgIHggLT0gdGhpcy54O1xuICAgIHkgLT0gdGhpcy55O1xuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogdGhpcy5pbWFnZURhdGEuZGF0YVtpXSxcbiAgICAgIGc6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDFdLFxuICAgICAgYjogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMl0sXG4gICAgICBhOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAzXVxuICAgIH07XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIHBhcnRpY2xlLmRlYWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLnYubmVnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4uL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi4vem9uZS9SZWN0Wm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCBmdW5jKSB7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsICgpID0+IGZ1bmMoKSk7XG4gIH0sXG5cbiAgZ2V0U3R5bGUoY29sb3IgPSBcIiNmZjAwMDBcIikge1xuICAgIGNvbnN0IHJnYiA9IENvbG9yVXRpbC5oZXhUb1JnYihjb2xvcik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cmdiLnJ9LCAke3JnYi5nfSwgJHtyZ2IuYn0sIDAuNSlgO1xuICB9LFxuXG4gIGRyYXdab25lKHByb3RvbiwgY2FudmFzLCB6b25lLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBpZiAoem9uZSBpbnN0YW5jZW9mIFBvaW50Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBMaW5lWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHpvbmUueDEsIHpvbmUueTEpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyh6b25lLngyLCB6b25lLnkyKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIFJlY3Rab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5kcmF3UmVjdCh6b25lLngsIHpvbmUueSwgem9uZS53aWR0aCwgem9uZS5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgQ2lyY2xlWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCB6b25lLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRyYXdFbWl0dGVyKHByb3RvbiwgY2FudmFzLCBlbWl0dGVyLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgIGNvbnRleHQuYXJjKGVtaXR0ZXIucC54LCBlbWl0dGVyLnAueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgUG9vbCBmcm9tIFwiLi9jb3JlL1Bvb2xcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0MyBmcm9tIFwiLi9tYXRoL01hdDNcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuL21hdGgvU3BhblwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4vbWF0aC9lYXNlXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTGlmZSBmcm9tIFwiLi9pbml0aWFsaXplL0xpZmVcIjtcbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi9pbml0aWFsaXplL1Bvc2l0aW9uXCI7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9WZWxvY2l0eVwiO1xuaW1wb3J0IE1hc3MgZnJvbSBcIi4vaW5pdGlhbGl6ZS9NYXNzXCI7XG5pbXBvcnQgUmFkaXVzIGZyb20gXCIuL2luaXRpYWxpemUvUmFkaXVzXCI7XG5pbXBvcnQgQm9keSBmcm9tIFwiLi9pbml0aWFsaXplL0JvZHlcIjtcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9iZWhhdmlvdXIvQmVoYXZpb3VyXCI7XG5pbXBvcnQgRm9yY2UgZnJvbSBcIi4vYmVoYXZpb3VyL0ZvcmNlXCI7XG5pbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQXR0cmFjdGlvblwiO1xuaW1wb3J0IFJhbmRvbURyaWZ0IGZyb20gXCIuL2JlaGF2aW91ci9SYW5kb21EcmlmdFwiO1xuaW1wb3J0IEdyYXZpdHkgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlcIjtcbmltcG9ydCBDb2xsaXNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0NvbGxpc2lvblwiO1xuaW1wb3J0IENyb3NzWm9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3Jvc3Nab25lXCI7XG5pbXBvcnQgQWxwaGEgZnJvbSBcIi4vYmVoYXZpb3VyL0FscGhhXCI7XG5pbXBvcnQgU2NhbGUgZnJvbSBcIi4vYmVoYXZpb3VyL1NjYWxlXCI7XG5pbXBvcnQgUm90YXRlIGZyb20gXCIuL2JlaGF2aW91ci9Sb3RhdGVcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sb3JcIjtcbmltcG9ydCBDeWNsb25lIGZyb20gXCIuL2JlaGF2aW91ci9DeWNsb25lXCI7XG5pbXBvcnQgUmVwdWxzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9SZXB1bHNpb25cIjtcbmltcG9ydCBHcmF2aXR5V2VsbCBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVdlbGxcIjtcblxuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9FbWl0dGVyXCI7XG5pbXBvcnQgQmVoYXZpb3VyRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0JlaGF2aW91ckVtaXR0ZXJcIjtcbmltcG9ydCBGb2xsb3dFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRm9sbG93RW1pdHRlclwiO1xuXG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0NhbnZhc1JlbmRlcmVyXCI7XG5pbXBvcnQgRG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0RvbVJlbmRlcmVyXCI7XG5pbXBvcnQgRWFzZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRWFzZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGVsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGVsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhpUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGlSZW5kZXJlclwiO1xuaW1wb3J0IFdlYkdMUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1dlYkdMUmVuZGVyZXJcIjtcbmltcG9ydCBDdXN0b21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ3VzdG9tUmVuZGVyZXJcIjtcblxuaW1wb3J0IFpvbmUgZnJvbSBcIi4vem9uZS9ab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4vem9uZS9SZWN0Wm9uZVwiO1xuaW1wb3J0IEltYWdlWm9uZSBmcm9tIFwiLi96b25lL0ltYWdlWm9uZVwiO1xuXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4vZGVidWcvRGVidWdcIjtcblxuLy8gbmFtZXNwYWNlXG5Qcm90b24uUGFydGljbGUgPSBQYXJ0aWNsZTtcblByb3Rvbi5Qb29sID0gUG9vbDtcblxuUHJvdG9uLlV0aWwgPSBVdGlsO1xuUHJvdG9uLkNvbG9yVXRpbCA9IENvbG9yVXRpbDtcblByb3Rvbi5NYXRoVXRpbCA9IE1hdGhVdGlsO1xuUHJvdG9uLlZlY3RvcjJEID0gUHJvdG9uLlZlY3RvciA9IFZlY3RvcjJEO1xuUHJvdG9uLlBvbGFyMkQgPSBQcm90b24uUG9sYXIgPSBQb2xhcjJEO1xuUHJvdG9uLkFycmF5U3BhbiA9IEFycmF5U3BhbjtcblByb3Rvbi5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG5Qcm90b24uUmF0ZSA9IFJhdGU7XG5Qcm90b24uZWFzZSA9IGVhc2U7XG5Qcm90b24uU3BhbiA9IFNwYW47XG5Qcm90b24uTWF0MyA9IE1hdDM7XG5Qcm90b24uZ2V0U3BhbiA9IChhLCBiLCBjZW50ZXIpID0+IG5ldyBTcGFuKGEsIGIsIGNlbnRlcik7XG5Qcm90b24uY3JlYXRlQXJyYXlTcGFuID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbjtcblxuUHJvdG9uLkluaXRpYWxpemUgPSBQcm90b24uSW5pdCA9IEluaXRpYWxpemU7XG5Qcm90b24uTGlmZSA9IFByb3Rvbi5MID0gTGlmZTtcblByb3Rvbi5Qb3NpdGlvbiA9IFByb3Rvbi5QID0gUG9zaXRpb247XG5Qcm90b24uVmVsb2NpdHkgPSBQcm90b24uViA9IFZlbG9jaXR5O1xuUHJvdG9uLk1hc3MgPSBQcm90b24uTSA9IE1hc3M7XG5Qcm90b24uUmFkaXVzID0gUHJvdG9uLlIgPSBSYWRpdXM7XG5Qcm90b24uQm9keSA9IFByb3Rvbi5CID0gQm9keTtcblxuUHJvdG9uLkJlaGF2aW91ciA9IEJlaGF2aW91cjtcblByb3Rvbi5Gb3JjZSA9IFByb3Rvbi5GID0gRm9yY2U7XG5Qcm90b24uQXR0cmFjdGlvbiA9IFByb3Rvbi5BID0gQXR0cmFjdGlvbjtcblByb3Rvbi5SYW5kb21EcmlmdCA9IFByb3Rvbi5SRCA9IFJhbmRvbURyaWZ0O1xuUHJvdG9uLkdyYXZpdHkgPSBQcm90b24uRyA9IEdyYXZpdHk7XG5Qcm90b24uQ29sbGlzaW9uID0gQ29sbGlzaW9uO1xuUHJvdG9uLkNyb3NzWm9uZSA9IENyb3NzWm9uZTtcblByb3Rvbi5BbHBoYSA9IEFscGhhO1xuUHJvdG9uLlNjYWxlID0gUHJvdG9uLlMgPSBTY2FsZTtcblByb3Rvbi5Sb3RhdGUgPSBSb3RhdGU7XG5Qcm90b24uQ29sb3IgPSBDb2xvcjtcblByb3Rvbi5SZXB1bHNpb24gPSBSZXB1bHNpb247XG5Qcm90b24uQ3ljbG9uZSA9IEN5Y2xvbmU7XG5Qcm90b24uR3Jhdml0eVdlbGwgPSBHcmF2aXR5V2VsbDtcblxuUHJvdG9uLkVtaXR0ZXIgPSBFbWl0dGVyO1xuUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXIgPSBCZWhhdmlvdXJFbWl0dGVyO1xuUHJvdG9uLkZvbGxvd0VtaXR0ZXIgPSBGb2xsb3dFbWl0dGVyO1xuXG5Qcm90b24uWm9uZSA9IFpvbmU7XG5Qcm90b24uTGluZVpvbmUgPSBMaW5lWm9uZTtcblByb3Rvbi5DaXJjbGVab25lID0gQ2lyY2xlWm9uZTtcblByb3Rvbi5Qb2ludFpvbmUgPSBQb2ludFpvbmU7XG5Qcm90b24uUmVjdFpvbmUgPSBSZWN0Wm9uZTtcblByb3Rvbi5JbWFnZVpvbmUgPSBJbWFnZVpvbmU7XG5cblByb3Rvbi5DYW52YXNSZW5kZXJlciA9IENhbnZhc1JlbmRlcmVyO1xuUHJvdG9uLkRvbVJlbmRlcmVyID0gRG9tUmVuZGVyZXI7XG5Qcm90b24uRWFzZWxSZW5kZXJlciA9IEVhc2VsUmVuZGVyZXI7XG5Qcm90b24uUGl4aVJlbmRlcmVyID0gUGl4aVJlbmRlcmVyO1xuUHJvdG9uLlBpeGVsUmVuZGVyZXIgPSBQaXhlbFJlbmRlcmVyO1xuUHJvdG9uLldlYkdMUmVuZGVyZXIgPSBQcm90b24uV2ViR2xSZW5kZXJlciA9IFdlYkdMUmVuZGVyZXI7XG5Qcm90b24uQ3VzdG9tUmVuZGVyZXIgPSBDdXN0b21SZW5kZXJlcjtcblxuUHJvdG9uLkRlYnVnID0gRGVidWc7XG5VdGlsLmFzc2lnbihQcm90b24sIGVhc2UpO1xuXG4vLyBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IFByb3RvbjtcbiJdLCJuYW1lcyI6WyJpcG90IiwibGVuZ3RoIiwibmhwb3QiLCJpIiwibWFrZVRyYW5zbGF0aW9uIiwidHgiLCJ0eSIsIm1ha2VSb3RhdGlvbiIsImFuZ2xlSW5SYWRpYW5zIiwiYyIsIk1hdGgiLCJjb3MiLCJzIiwic2luIiwibWFrZVNjYWxlIiwic3giLCJzeSIsIm1hdHJpeE11bHRpcGx5IiwiYSIsImIiLCJhMDAiLCJhMDEiLCJhMDIiLCJhMTAiLCJhMTEiLCJhMTIiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMTAiLCJiMTEiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJjcmVhdGVDYW52YXMiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJjcmVhdGVEaXYiLCJyZXNpemUiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiZGl2IiwieCIsInkiLCJzY2FsZSIsInJvdGF0ZSIsIndpbGxDaGFuZ2UiLCJjc3MzIiwidHJhbnNmb3JtM2QiLCJrZXkiLCJ2YWwiLCJia2V5IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpbWdzQ2FjaGUiLCJjYW52YXNDYWNoZSIsImNhbnZhc0lkIiwiZ2V0SW1hZ2VEYXRhIiwiY29udGV4dCIsImltYWdlIiwicmVjdCIsImRyYXdJbWFnZSIsImltYWdlZGF0YSIsImNsZWFyUmVjdCIsImdldEltZ0Zyb21DYWNoZSIsImltZyIsImNhbGxiYWNrIiwicGFyYW0iLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJnZXRDYW52YXNGcm9tQ2FjaGUiLCJXZWJHTFV0aWwiLCJjYW52YXMiLCJEb21VdGlsIiwiZ2V0Q29udGV4dCIsImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZW1wdHlBcnJheSIsImFyciIsInRvQXJyYXkiLCJnZXRSYW5kRnJvbUFycmF5IiwiZmxvb3IiLCJyYW5kb20iLCJlbXB0eU9iamVjdCIsIm9iaiIsImlnbm9yZSIsImluZGV4T2YiLCJjbGFzc0FwcGx5IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiRmFjdG9yeUZ1bmMiLCJiaW5kIiwiYXBwbHkiLCJjb25jYXQiLCJJbWdVdGlsIiwiZGVzdHJveUFsbCIsImRlc3Ryb3kiLCJhc3NpZ24iLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkc01hcCIsIlB1aWQiLCJfaW5kZXgiLCJfY2FjaGUiLCJ0eXBlIiwiZ2V0SWQiLCJ1aWQiLCJnZXRJZEZyb21DYWNoZSIsImlzQm9keSIsImlzSW5uZXIiLCJnZXRUYXJnZXQiLCJQb29sIiwibnVtIiwidG90YWwiLCJjYWNoZSIsImdldCIsInBhcmFtcyIsInAiLCJfX3B1aWQiLCJwb3AiLCJjcmVhdGVPckNsb25lIiwiZXhwaXJlIiwiZ2V0Q2FjaGUiLCJwdXNoIiwiY3JlYXRlIiwiVXRpbCIsImNsb25lIiwiZ2V0Q291bnQiLCJjb3VudCIsIlN0YXRzIiwicHJvdG9uIiwiY29udGFpbmVyIiwiZW1pdHRlckluZGV4IiwicmVuZGVyZXJJbmRleCIsInVwZGF0ZSIsImJvZHkiLCJhZGQiLCJlbWl0dGVyIiwiZ2V0RW1pdHRlciIsInJlbmRlcmVyIiwiZ2V0UmVuZGVyZXIiLCJzdHIiLCJlbWl0dGVycyIsImVtaXRTcGVlZCIsImdldEVtaXR0ZXJQb3MiLCJpbml0aWFsaXplcyIsImNvbmNhdEFyciIsImJlaGF2aW91cnMiLCJuYW1lIiwiZ2V0Q3JlYXRlZE51bWJlciIsInBvb2wiLCJpbm5lckhUTUwiLCJjc3NUZXh0Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZyIsImNvbG9yIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwicmVuZGVyZXJzIiwicmVzdWx0IiwiY3Bvb2wiLCJyb3VuZCIsInJlbW92ZUNoaWxkIiwiRXZlbnREaXNwYXRjaGVyIiwiX2xpc3RlbmVycyIsImRpc3BhdGNoRXZlbnQiLCJoYXNFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzIiwibGlzdGVuZXIiLCJzcGxpY2UiLCJsaXN0ZW5lcnMiLCJoYW5kbGVyIiwiUEkiLCJJTkZJTklUWSIsIkluZmluaXR5IiwiTWF0aFV0aWwiLCJQSXgyIiwiUElfMiIsIlBJXzE4MCIsIk4xODBfUEkiLCJpc0luZmluaXR5IiwicmFuZG9tQVRvQiIsImlzSW50IiwicmFuZG9tRmxvYXRpbmciLCJjZW50ZXIiLCJmIiwicmFuZG9tQ29sb3IiLCJzbGljZSIsInJhbmRvbVpvbmUiLCJkaXNwbGF5IiwiayIsImRpZ2l0cyIsInBvdyIsImRlZ3JlZVRyYW5zZm9ybSIsInRvQ29sb3IxNiIsIkludGVncmF0aW9uIiwiY2FsY3VsYXRlIiwicGFydGljbGVzIiwidGltZSIsImRhbXBpbmciLCJldWxlckludGVncmF0ZSIsInBhcnRpY2xlIiwic2xlZXAiLCJvbGQiLCJjb3B5IiwidiIsIm11bHRpcGx5U2NhbGFyIiwibWFzcyIsImNsZWFyIiwiUHJvdG9uIiwiaW50ZWdyYXRpb25UeXBlIiwibm93IiwidGhlbiIsImVsYXBzZWQiLCJzdGF0cyIsIkVVTEVSIiwiaW50ZWdyYXRvciIsIl9mcHMiLCJfaW50ZXJ2YWwiLCJERUZBVUxUX0lOVEVSVkFMIiwiYWRkUmVuZGVyZXIiLCJyZW5kZXIiLCJpbml0IiwicmVtb3ZlUmVuZGVyZXIiLCJpbmRleCIsInJlbW92ZSIsImFkZEVtaXR0ZXIiLCJwYXJlbnQiLCJFTUlUVEVSX0FEREVEIiwicmVtb3ZlRW1pdHRlciIsIkVNSVRURVJfUkVNT1ZFRCIsIlBST1RPTl9VUERBVEUiLCJVU0VfQ0xPQ0siLCJEYXRlIiwiZ2V0VGltZSIsImFtZW5kQ2hhbmdlVGFic0J1ZyIsImVtaXR0ZXJzVXBkYXRlIiwiUFJPVE9OX1VQREFURV9BRlRFUiIsImdldEFsbFBhcnRpY2xlcyIsImRlc3Ryb3lBbGxFbWl0dGVycyIsImRlc3Ryb3lPdGhlciIsInNldFRpbWVvdXQiLCJmcHMiLCJNRUFTVVJFIiwiUksyIiwiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX1VQREFURSIsIlBBUlRJQ0xFX1NMRUVQIiwiUEFSVElDTEVfREVBRCIsIlJnYiIsInIiLCJnIiwicmVzZXQiLCJoYXNQcm9wIiwic2V0UHJvcCIsInByb3BzIiwicHJvcCIsIlNwYW4iLCJnZXRTcGFuVmFsdWUiLCJzZXRWZWN0b3JWYWwiLCJjb25mIiwiZWFzZUxpbmVhciIsImVhc2VJblF1YWQiLCJlYXNlT3V0UXVhZCIsImVhc2VJbk91dFF1YWQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblNpbmUiLCJlYXNlT3V0U2luZSIsImVhc2VJbk91dFNpbmUiLCJlYXNlSW5FeHBvIiwiZWFzZU91dEV4cG8iLCJlYXNlSW5PdXRFeHBvIiwiZWFzZUluQ2lyYyIsInNxcnQiLCJlYXNlT3V0Q2lyYyIsImVhc2VJbk91dENpcmMiLCJlYXNlSW5CYWNrIiwiZWFzZU91dEJhY2siLCJlYXNlSW5PdXRCYWNrIiwiZ2V0RWFzaW5nIiwiZWFzZSIsIlZlY3RvcjJEIiwic2V0Iiwic2V0WCIsInNldFkiLCJnZXRHcmFkaWVudCIsImF0YW4yIiwidyIsImFkZFZlY3RvcnMiLCJhZGRYWSIsInN1YiIsInN1YlZlY3RvcnMiLCJkaXZpZGVTY2FsYXIiLCJuZWdhdGUiLCJkb3QiLCJsZW5ndGhTcSIsIm5vcm1hbGl6ZSIsImRpc3RhbmNlVG8iLCJkaXN0YW5jZVRvU3F1YXJlZCIsInRoYSIsImR4IiwiZHkiLCJsZXJwIiwiYWxwaGEiLCJlcXVhbHMiLCJQYXJ0aWNsZSIsImRhdGEiLCJyZ2IiLCJQcm9wVXRpbCIsImdldERpcmVjdGlvbiIsImxpZmUiLCJhZ2UiLCJkZWFkIiwic3ByaXRlIiwiZW5lcmd5IiwicmFkaXVzIiwicm90YXRpb24iLCJlYXNpbmciLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwiYXBwbHlCZWhhdmlvdXJzIiwibWF4IiwiYXBwbHlCZWhhdmlvdXIiLCJhZGRCZWhhdmlvdXIiLCJiZWhhdmlvdXIiLCJwYXJlbnRzIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJoZXhUb1JnYiIsImgiLCJoZXgxNiIsInN1YnN0cmluZyIsInBhcnNlSW50IiwicmdiVG9IZXgiLCJyYmciLCJnZXRIZXgxNkZyb21QYXJ0aWNsZSIsIk51bWJlciIsIlBvbGFyMkQiLCJhYnMiLCJzZXRSIiwic2V0VGhhIiwidG9WZWN0b3IiLCJnZXRYIiwiZ2V0WSIsIk1hdDMiLCJtYXQzIiwibWF0IiwiRmxvYXQzMkFycmF5IiwibWF0MSIsIm1hdDIiLCJtdWx0aXBseSIsImludmVyc2UiLCJkIiwibXVsdGlwbHlWZWMyIiwibSIsInZlYyIsImdldFZhbHVlIiwic2V0U3BhblZhbHVlIiwicGFuIiwiQXJyYXlTcGFuIiwiX2FyciIsImNyZWF0ZUFycmF5U3BhbiIsIlJlY3RhbmdsZSIsImJvdHRvbSIsInJpZ2h0IiwiY29udGFpbnMiLCJSYXRlIiwibnVtcGFuIiwidGltZXBhbiIsIm51bVBhbiIsInRpbWVQYW4iLCJzdGFydFRpbWUiLCJuZXh0VGltZSIsIkluaXRpYWxpemUiLCJMaWZlIiwibGlmZVBhbiIsIlpvbmUiLCJ2ZWN0b3IiLCJjcm9zc1R5cGUiLCJhbGVydCIsImdldFBvc2l0aW9uIiwiY3Jvc3NpbmciLCJQb2ludFpvbmUiLCJjb25zb2xlIiwiZXJyb3IiLCJQb3NpdGlvbiIsInpvbmUiLCJWZWxvY2l0eSIsInJwYW4iLCJ0aGFwYW4iLCJyUGFuIiwidGhhUGFuIiwibm9ybWFsaXplVmVsb2NpdHkiLCJ2ciIsInBvbGFyMmQiLCJNYXNzIiwibWFzc1BhbiIsIlJhZGl1cyIsIm9sZFJhZGl1cyIsIkJvZHkiLCJpbWFnZVRhcmdldCIsImlubmVyIiwiQmVoYXZpb3VyIiwibm9ybWFsaXplRm9yY2UiLCJmb3JjZSIsIm5vcm1hbGl6ZVZhbHVlIiwiRm9yY2UiLCJmeCIsImZ5IiwiQXR0cmFjdGlvbiIsInRhcmdldFBvc2l0aW9uIiwicmFkaXVzU3EiLCJhdHRyYWN0aW9uRm9yY2UiLCJSYW5kb21EcmlmdCIsImRyaWZ0WCIsImRyaWZ0WSIsImRlbGF5IiwicGFuRm9jZSIsIkdyYXZpdHkiLCJDb2xsaXNpb24iLCJjb2xsaXNpb25Qb29sIiwiZGVsdGEiLCJuZXdQb29sIiwib3RoZXJQYXJ0aWNsZSIsIm92ZXJsYXAiLCJ0b3RhbE1hc3MiLCJhdmVyYWdlTWFzczEiLCJhdmVyYWdlTWFzczIiLCJkaXN0YW5jZSIsIkNyb3NzWm9uZSIsIkFscGhhIiwic2FtZSIsImFscGhhQSIsImFscGhhQiIsIlNjYWxlIiwic2NhbGVBIiwic2NhbGVCIiwiUm90YXRlIiwiaW5mbHVlbmNlIiwicm90YXRpb25BIiwicm90YXRpb25CIiwiQ29sb3IiLCJjb2xvckEiLCJDb2xvclV0aWwiLCJjb2xvckIiLCJDSEFOR0lORyIsIkN5Y2xvbmUiLCJhbmdsZSIsInNldEFuZ2xlQW5kRm9yY2UiLCJzcGFuIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJjYW5nbGUiLCJjeWNsb25lIiwiZ3JhZGllbnQiLCJSZXB1bHNpb24iLCJHcmF2aXR5V2VsbCIsImNlbnRlclBvaW50IiwiZGlzdGFuY2VWZWMiLCJkaXN0YW5jZVNxIiwiZmFjdG9yIiwiYmluZEVtaXR0ZXIiLCJFbWl0dGVyIiwiZW1pdFRpbWUiLCJ0b3RhbFRpbWUiLCJyYXRlIiwiZW1pdCIsInN0b3BlZCIsImlzTmFOIiwic3RvcCIsInByZUVtaXQiLCJvbGRTdG9wZWQiLCJvbGRFbWl0VGltZSIsIm9sZFRvdGFsVGltZSIsInN0ZXAiLCJyZW1vdmVBbGxQYXJ0aWNsZXMiLCJhZGRTZWxmSW5pdGlhbGl6ZSIsImFkZEluaXRpYWxpemUiLCJyZXN0IiwicmVtb3ZlSW5pdGlhbGl6ZSIsImluaXRpYWxpemVyIiwicmVtb3ZlQWxsSW5pdGlhbGl6ZXJzIiwiYXJndW1lbnRzIiwiZW1pdHRpbmciLCJpbnRlZ3JhdGUiLCJkaXNwYXRjaCIsImV2ZW50IiwiYmluZEV2ZW50IiwiY3JlYXRlUGFydGljbGUiLCJzZXR1cFBhcnRpY2xlIiwiSW5pdGlhbGl6ZVV0aWwiLCJCZWhhdmlvdXJFbWl0dGVyIiwic2VsZkJlaGF2aW91cnMiLCJhZGRTZWxmQmVoYXZpb3VyIiwicmVtb3ZlU2VsZkJlaGF2aW91ciIsIkZvbGxvd0VtaXR0ZXIiLCJtb3VzZVRhcmdldCIsIndpbmRvdyIsIl9hbGxvd0VtaXR0aW5nIiwiaW5pdEV2ZW50SGFuZGxlciIsIm1vdXNlbW92ZUhhbmRsZXIiLCJtb3VzZW1vdmUiLCJtb3VzZWRvd25IYW5kbGVyIiwibW91c2Vkb3duIiwibW91c2V1cEhhbmRsZXIiLCJtb3VzZXVwIiwibGF5ZXJYIiwibGF5ZXJZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJpc0ltYWdlIiwiX19pc0ltYWdlIiwidGFnTmFtZSIsIm5vZGVOYW1lIiwiaXNTdHJpbmciLCJCYXNlUmVuZGVyZXIiLCJlbGVtZW50Iiwic3Ryb2tlIiwiY2lyY2xlQ29uZiIsImlzQ2lyY2xlIiwic2V0U3Ryb2tlIiwidGhpbmtuZXNzIiwiX3Byb3RvblVwZGF0ZUhhbmRsZXIiLCJvblByb3RvblVwZGF0ZSIsIl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIiLCJvblByb3RvblVwZGF0ZUFmdGVyIiwiX2VtaXR0ZXJBZGRlZEhhbmRsZXIiLCJvbkVtaXR0ZXJBZGRlZCIsIl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIiLCJvbkVtaXR0ZXJSZW1vdmVkIiwiX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIiLCJvblBhcnRpY2xlQ3JlYXRlZCIsIl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIiLCJvblBhcnRpY2xlVXBkYXRlIiwiX3BhcnRpY2xlRGVhZEhhbmRsZXIiLCJvblBhcnRpY2xlRGVhZCIsIkNhbnZhc1JlbmRlcmVyIiwiYnVmZmVyQ2FjaGUiLCJhZGRJbWcyQm9keSIsIlR5cGVzIiwiZHJhd0NpcmNsZSIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJ1ZkNvbnRleHQiLCJnbG9iYWxBbHBoYSIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic2F2ZSIsInRyYW5zbGF0ZSIsInJlc3RvcmUiLCJiZWdpblBhdGgiLCJhcmMiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImNsb3NlUGF0aCIsImZpbGwiLCJzaXplIiwiRG9tUmVuZGVyZXIiLCJjcmVhdGVCb2R5IiwiYm9keVJlYWR5IiwiYmFja2dyb3VuZENvbG9yIiwiY3JlYXRlQ2lyY2xlIiwiY3JlYXRlU3ByaXRlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsInVybCIsImJhY2tncm91bmRJbWFnZSIsIkVhc2VsUmVuZGVyZXIiLCJhZGRDaGlsZCIsInNjYWxlWCIsInNjYWxlWSIsImdyYXBoaWNzIiwicmVnWCIsInJlZ1kiLCJjcmVhdGVqcyIsIkdyYXBoaWNzIiwiYmVnaW5TdHJva2UiLCJiZWdpbkZpbGwiLCJzaGFwZSIsIlNoYXBlIiwiUGl4ZWxSZW5kZXJlciIsInJlY3RhbmdsZSIsImltYWdlRGF0YSIsImNyZWF0ZUltYWdlRGF0YSIsInB1dEltYWdlRGF0YSIsInNldFBpeGVsIiwiZWxlbWVudHdpZHRoIiwiUElYSUNsYXNzIiwiUGl4aVJlbmRlcmVyIiwic2V0Q29sb3IiLCJibGVuZE1vZGUiLCJzZXRQSVhJIiwiUElYSSIsIlNwcml0ZSIsImNyZWF0ZUZyb21JbWFnZSIsImZyb20iLCJmcm9tSW1hZ2UiLCJ0aW50IiwiYW5jaG9yIiwiZW5kRmlsbCIsIk1TdGFjayIsIm1hdHMiLCJ0b3AiLCJXZWJHTFJlbmRlcmVyIiwiZ2wiLCJhbnRpYWxpYXMiLCJzdGVuY2lsIiwiZGVwdGgiLCJpbml0VmFyIiwic2V0TWF4UmFkaXVzIiwiaW5pdFNoYWRlcnMiLCJpbml0QnVmZmVycyIsImJsZW5kRXF1YXRpb24iLCJGVU5DX0FERCIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJlbmFibGUiLCJCTEVORCIsInVtYXQiLCJzbWF0IiwibXN0YWNrIiwidmlld3BvcnQiLCJjaXJjbGVDYW52YXNVUkwiLCJnZXRWZXJ0ZXhTaGFkZXIiLCJ2c1NvdXJjZSIsImdldEZyYWdtZW50U2hhZGVyIiwiZnNTb3VyY2UiLCJ0ZXh0dXJlYnVmZmVycyIsIkEiLCJCIiwiZ2V0U2hhZGVyIiwiZnMiLCJzaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwidmVydGV4U2hhZGVyIiwic3Byb2dyYW0iLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJ1c2VQcm9ncmFtIiwidnBhIiwiZ2V0QXR0cmliTG9jYXRpb24iLCJ0Y2EiLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInRNYXRVbmlmb3JtIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwic2FtcGxlclVuaWZvcm0iLCJ1c2VUZXgiLCJ1bmlmb3JtMWkiLCJ2cyIsImlkeCIsInVuaXRJQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiYnVmZmVyRGF0YSIsIlVpbnQxNkFycmF5IiwiU1RBVElDX0RSQVciLCJpZHMiLCJ1bml0STMzIiwic3RyaXBCdWZmZXIiLCJyYWlkdXMiLCJjaXJjbGVDYW52YXNSYWRpdXMiLCJ0b0RhdGFVUkwiLCJkcmF3SW1nMkNhbnZhcyIsIl93IiwiX2giLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX3NjYWxlWCIsIl9zY2FsZVkiLCJjcmVhdGVUZXh0dXJlIiwidGV4dHVyZSIsInZjQnVmZmVyIiwidGNCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTElORUFSIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiTElORUFSX01JUE1BUF9ORUFSRVNUIiwiZ2VuZXJhdGVNaXBtYXAiLCJ0ZXh0dXJlTG9hZGVkIiwidGV4dHVyZVdpZHRoIiwidGV4dHVyZUhlaWdodCIsInRtYXQiLCJpbWF0Iiwib2xkU2NhbGUiLCJ1cGRhdGVNYXRyaXgiLCJ1bmlmb3JtM2YiLCJ1bmlmb3JtTWF0cml4M2Z2IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwiZHJhd0VsZW1lbnRzIiwiVFJJQU5HTEVTIiwiVU5TSUdORURfU0hPUlQiLCJtb3ZlT3JpZ2luTWF0cml4IiwidHJhbnNsYXRpb25NYXRyaXgiLCJhbmdlbCIsInJvdGF0aW9uTWF0cml4Iiwic2NhbGVNYXRyaXgiLCJtYXRyaXgiLCJDdXN0b21SZW5kZXJlciIsIkxpbmVab25lIiwieDEiLCJ5MSIsIngyIiwieTIiLCJkaXJlY3Rpb24iLCJtaW54IiwibWluIiwibWlueSIsIm1heHgiLCJtYXh5IiwieHh5eSIsImdldExlbmd0aCIsIkMiLCJEIiwiZ2V0RGlzdGFuY2UiLCJnZXRTeW1tZXRyaWMiLCJ0aGEyIiwidGhhMSIsIm9sZHgiLCJvbGR5IiwicmFuZ2VPdXQiLCJDaXJjbGVab25lIiwicmFuZG9tUmFkaXVzIiwic2V0Q2VudGVyIiwiUmVjdFpvbmUiLCJJbWFnZVpvbmUiLCJ2ZWN0b3JzIiwic2V0VmVjdG9ycyIsImoiLCJsZW5ndGgxIiwibGVuZ3RoMiIsImdldEJvdW5kIiwiZ2V0Q29sb3IiLCJmdW5jIiwiZ2V0U3R5bGUiLCJkcmF3Wm9uZSIsIm1vdmVUbyIsImxpbmVUbyIsImRyYXdSZWN0IiwiZHJhd0VtaXR0ZXIiLCJWZWN0b3IiLCJQb2xhciIsImdldFNwYW4iLCJJbml0IiwiTCIsIlAiLCJWIiwiTSIsIlIiLCJGIiwiUkQiLCJHIiwiUyIsIldlYkdsUmVuZGVyZXIiLCJEZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFlO0VBQ2I7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFQSxFQUFBQSxJQVphLEVBWVJDLFNBQUFBLElBQUFBLENBQUFBLE1BWlEsRUFZQTtFQUNYLElBQUEsT0FBTyxDQUFDQSxNQUFNLEdBQUlBLE1BQU0sR0FBRyxDQUFwQixNQUE0QixDQUFuQyxDQUFBO0VBQ0QsR0FkWTs7RUFnQmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFQyxFQUFBQSxLQTNCYSxFQTJCUEQsU0FBQUEsS0FBQUEsQ0FBQUEsTUEzQk8sRUEyQkM7RUFDWixJQUFBLEVBQUVBLE1BQUYsQ0FBQTs7RUFDQSxJQUFBLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxLQUFLLENBQTlCLEVBQWlDO0VBQy9CRixNQUFBQSxNQUFNLEdBQUdBLE1BQU0sR0FBSUEsTUFBTSxJQUFJRSxDQUE3QixDQUFBO0VBQ0QsS0FBQTs7RUFFRCxJQUFPRixPQUFBQSxNQUFNLEdBQUcsQ0FBaEIsQ0FBQTtFQUNELEdBbENZOztFQW9DYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFRyxFQUFBQSxlQWpEYSxFQUFBLFNBQUEsZUFBQSxDQWlER0MsRUFqREgsRUFpRE9DLEVBakRQLEVBaURXO0VBQ3RCLElBQUEsT0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CRCxFQUFuQixFQUF1QkMsRUFBdkIsRUFBMkIsQ0FBM0IsQ0FBUCxDQUFBO0VBQ0QsR0FuRFk7O0VBcURiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUMsRUFBQUEsWUFoRWEsRUFnRUFDLFNBQUFBLFlBQUFBLENBQUFBLGNBaEVBLEVBZ0VnQjtFQUMzQixJQUFBLElBQUlDLENBQUMsR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNILGNBQVQsQ0FBUixDQUFBO0VBQ0EsSUFBQSxJQUFJSSxDQUFDLEdBQUdGLElBQUksQ0FBQ0csR0FBTCxDQUFTTCxjQUFULENBQVIsQ0FBQTtFQUVBLElBQUEsT0FBTyxDQUFDQyxDQUFELEVBQUksQ0FBQ0csQ0FBTCxFQUFRLENBQVIsRUFBV0EsQ0FBWCxFQUFjSCxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQVAsQ0FBQTtFQUNELEdBckVZOztFQXVFYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFSyxFQUFBQSxTQXBGYSxFQUFBLFNBQUEsU0FBQSxDQW9GSEMsRUFwRkcsRUFvRkNDLEVBcEZELEVBb0ZLO0VBQ2hCLElBQUEsT0FBTyxDQUFDRCxFQUFELEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBVyxDQUFYLEVBQWNDLEVBQWQsRUFBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBUCxDQUFBO0VBQ0QsR0F0Rlk7O0VBd0ZiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLGNBckdhLEVBQUEsU0FBQSxjQUFBLENBcUdFQyxDQXJHRixFQXFHS0MsQ0FyR0wsRUFxR1E7RUFDbkIsSUFBSUMsSUFBQUEsR0FBRyxHQUFHRixDQUFDLENBQUMsSUFBSSxDQUFKLEdBQVEsQ0FBVCxDQUFYLENBQUE7RUFDQSxJQUFJRyxJQUFBQSxHQUFHLEdBQUdILENBQUMsQ0FBQyxJQUFJLENBQUosR0FBUSxDQUFULENBQVgsQ0FBQTtFQUNBLElBQUlJLElBQUFBLEdBQUcsR0FBR0osQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWCxDQUFBO0VBQ0EsSUFBSUssSUFBQUEsR0FBRyxHQUFHTCxDQUFDLENBQUMsSUFBSSxDQUFKLEdBQVEsQ0FBVCxDQUFYLENBQUE7RUFDQSxJQUFJTSxJQUFBQSxHQUFHLEdBQUdOLENBQUMsQ0FBQyxJQUFJLENBQUosR0FBUSxDQUFULENBQVgsQ0FBQTtFQUNBLElBQUlPLElBQUFBLEdBQUcsR0FBR1AsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWCxDQUFBO0VBQ0EsSUFBSVEsSUFBQUEsR0FBRyxHQUFHUixDQUFDLENBQUMsSUFBSSxDQUFKLEdBQVEsQ0FBVCxDQUFYLENBQUE7RUFDQSxJQUFJUyxJQUFBQSxHQUFHLEdBQUdULENBQUMsQ0FBQyxJQUFJLENBQUosR0FBUSxDQUFULENBQVgsQ0FBQTtFQUNBLElBQUlVLElBQUFBLEdBQUcsR0FBR1YsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWCxDQUFBO0VBQ0EsSUFBSVcsSUFBQUEsR0FBRyxHQUFHVixDQUFDLENBQUMsSUFBSSxDQUFKLEdBQVEsQ0FBVCxDQUFYLENBQUE7RUFDQSxJQUFJVyxJQUFBQSxHQUFHLEdBQUdYLENBQUMsQ0FBQyxJQUFJLENBQUosR0FBUSxDQUFULENBQVgsQ0FBQTtFQUNBLElBQUlZLElBQUFBLEdBQUcsR0FBR1osQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWCxDQUFBO0VBQ0EsSUFBSWEsSUFBQUEsR0FBRyxHQUFHYixDQUFDLENBQUMsSUFBSSxDQUFKLEdBQVEsQ0FBVCxDQUFYLENBQUE7RUFDQSxJQUFJYyxJQUFBQSxHQUFHLEdBQUdkLENBQUMsQ0FBQyxJQUFJLENBQUosR0FBUSxDQUFULENBQVgsQ0FBQTtFQUNBLElBQUllLElBQUFBLEdBQUcsR0FBR2YsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWCxDQUFBO0VBQ0EsSUFBSWdCLElBQUFBLEdBQUcsR0FBR2hCLENBQUMsQ0FBQyxJQUFJLENBQUosR0FBUSxDQUFULENBQVgsQ0FBQTtFQUNBLElBQUlpQixJQUFBQSxHQUFHLEdBQUdqQixDQUFDLENBQUMsSUFBSSxDQUFKLEdBQVEsQ0FBVCxDQUFYLENBQUE7RUFDQSxJQUFJa0IsSUFBQUEsR0FBRyxHQUFHbEIsQ0FBQyxDQUFDLElBQUksQ0FBSixHQUFRLENBQVQsQ0FBWCxDQUFBO0VBRUEsSUFBTyxPQUFBLENBQ0xDLEdBQUcsR0FBR1MsR0FBTixHQUFZUixHQUFHLEdBQUdXLEdBQWxCLEdBQXdCVixHQUFHLEdBQUdhLEdBRHpCLEVBRUxmLEdBQUcsR0FBR1UsR0FBTixHQUFZVCxHQUFHLEdBQUdZLEdBQWxCLEdBQXdCWCxHQUFHLEdBQUdjLEdBRnpCLEVBR0xoQixHQUFHLEdBQUdXLEdBQU4sR0FBWVYsR0FBRyxHQUFHYSxHQUFsQixHQUF3QlosR0FBRyxHQUFHZSxHQUh6QixFQUlMZCxHQUFHLEdBQUdNLEdBQU4sR0FBWUwsR0FBRyxHQUFHUSxHQUFsQixHQUF3QlAsR0FBRyxHQUFHVSxHQUp6QixFQUtMWixHQUFHLEdBQUdPLEdBQU4sR0FBWU4sR0FBRyxHQUFHUyxHQUFsQixHQUF3QlIsR0FBRyxHQUFHVyxHQUx6QixFQU1MYixHQUFHLEdBQUdRLEdBQU4sR0FBWVAsR0FBRyxHQUFHVSxHQUFsQixHQUF3QlQsR0FBRyxHQUFHWSxHQU56QixFQU9MWCxHQUFHLEdBQUdHLEdBQU4sR0FBWUYsR0FBRyxHQUFHSyxHQUFsQixHQUF3QkosR0FBRyxHQUFHTyxHQVB6QixFQVFMVCxHQUFHLEdBQUdJLEdBQU4sR0FBWUgsR0FBRyxHQUFHTSxHQUFsQixHQUF3QkwsR0FBRyxHQUFHUSxHQVJ6QixFQVNMVixHQUFHLEdBQUdLLEdBQU4sR0FBWUosR0FBRyxHQUFHTyxHQUFsQixHQUF3Qk4sR0FBRyxHQUFHUyxHQVR6QixDQUFQLENBQUE7RUFXRCxHQUFBO0VBcElZLENBQWY7O0FDQUEsZ0JBQWU7RUFDYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFQyxFQUFBQSxZQWRhLHdCQWNBQyxFQWRBLEVBY0lDLEtBZEosRUFjV0MsTUFkWCxFQWNtQkMsUUFkbkIsRUFjMEM7RUFBQSxJQUFBLElBQXZCQSxRQUF1QixLQUFBLEtBQUEsQ0FBQSxFQUFBO0VBQXZCQSxNQUFBQSxRQUF1QixHQUFaLFVBQVksQ0FBQTtFQUFBLEtBQUE7O0VBQ3JELElBQUEsSUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBWixDQUFBO0VBRUFGLElBQUFBLEdBQUcsQ0FBQ0osRUFBSixHQUFTQSxFQUFULENBQUE7RUFDQUksSUFBQUEsR0FBRyxDQUFDSCxLQUFKLEdBQVlBLEtBQVosQ0FBQTtFQUNBRyxJQUFBQSxHQUFHLENBQUNGLE1BQUosR0FBYUEsTUFBYixDQUFBO0VBQ0FFLElBQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVQyxPQUFWLEdBQW9CLENBQXBCLENBQUE7RUFDQUosSUFBQUEsR0FBRyxDQUFDRyxLQUFKLENBQVVKLFFBQVYsR0FBcUJBLFFBQXJCLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS00sU0FBTCxDQUFlTCxHQUFmLEVBQW9CLENBQUMsR0FBckIsRUFBMEIsQ0FBQyxHQUEzQixFQUFnQyxDQUFoQyxFQUFtQyxDQUFuQyxDQUFBLENBQUE7RUFFQSxJQUFBLE9BQU9BLEdBQVAsQ0FBQTtFQUNELEdBekJZO0VBMkJiTSxFQUFBQSxTQTNCYSxFQTJCSFYsU0FBQUEsU0FBQUEsQ0FBQUEsRUEzQkcsRUEyQkNDLEtBM0JELEVBMkJRQyxNQTNCUixFQTJCZ0I7RUFDM0IsSUFBQSxJQUFNRSxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFaLENBQUE7RUFFQUYsSUFBQUEsR0FBRyxDQUFDSixFQUFKLEdBQVNBLEVBQVQsQ0FBQTtFQUNBSSxJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVUosUUFBVixHQUFxQixVQUFyQixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtRLE1BQUwsQ0FBWVAsR0FBWixFQUFpQkgsS0FBakIsRUFBd0JDLE1BQXhCLENBQUEsQ0FBQTtFQUVBLElBQUEsT0FBT0UsR0FBUCxDQUFBO0VBQ0QsR0FuQ1k7RUFxQ2JPLEVBQUFBLE1BckNhLEVBcUNOUCxTQUFBQSxNQUFBQSxDQUFBQSxHQXJDTSxFQXFDREgsS0FyQ0MsRUFxQ01DLE1BckNOLEVBcUNjO0VBQ3pCRSxJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVU4sS0FBVixHQUFrQkEsS0FBSyxHQUFHLElBQTFCLENBQUE7RUFDQUcsSUFBQUEsR0FBRyxDQUFDRyxLQUFKLENBQVVMLE1BQVYsR0FBbUJBLE1BQU0sR0FBRyxJQUE1QixDQUFBO0VBQ0FFLElBQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVSyxVQUFWLEdBQXVCLENBQUNYLEtBQUQsR0FBUyxDQUFULEdBQWEsSUFBcEMsQ0FBQTtFQUNBRyxJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVU0sU0FBVixHQUFzQixDQUFDWCxNQUFELEdBQVUsQ0FBVixHQUFjLElBQXBDLENBQUE7RUFDRCxHQTFDWTs7RUE0Q2I7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VPLEVBQUFBLFNBeERhLEVBd0RISyxTQUFBQSxTQUFBQSxDQUFBQSxHQXhERyxFQXdERUMsQ0F4REYsRUF3REtDLENBeERMLEVBd0RRQyxLQXhEUixFQXdEZUMsTUF4RGYsRUF3RHVCO0VBQ2xDSixJQUFBQSxHQUFHLENBQUNQLEtBQUosQ0FBVVksVUFBVixHQUF1QixXQUF2QixDQUFBO0VBQ0EsSUFBTVYsSUFBQUEsU0FBUyxrQkFBZ0JNLENBQWhCLEdBQUEsTUFBQSxHQUF3QkMsQ0FBeEIsR0FBc0NDLFlBQUFBLEdBQUFBLEtBQXRDLEdBQXVEQyxXQUFBQSxHQUFBQSxNQUF2RCxHQUFmLE1BQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLRSxJQUFMLENBQVVOLEdBQVYsRUFBZSxXQUFmLEVBQTRCTCxTQUE1QixDQUFBLENBQUE7RUFDRCxHQTVEWTtFQThEYlksRUFBQUEsV0E5RGEsRUE4RERQLFNBQUFBLFdBQUFBLENBQUFBLEdBOURDLEVBOERJQyxDQTlESixFQThET0MsQ0E5RFAsRUE4RFVDLEtBOURWLEVBOERpQkMsTUE5RGpCLEVBOER5QjtFQUNwQ0osSUFBQUEsR0FBRyxDQUFDUCxLQUFKLENBQVVZLFVBQVYsR0FBdUIsV0FBdkIsQ0FBQTtFQUNBLElBQU1WLElBQUFBLFNBQVMsb0JBQWtCTSxDQUFsQixHQUFBLE1BQUEsR0FBMEJDLENBQTFCLEdBQTJDQyxlQUFBQSxHQUFBQSxLQUEzQyxHQUE0REMsV0FBQUEsR0FBQUEsTUFBNUQsR0FBZixNQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0UsSUFBTCxDQUFVTixHQUFWLEVBQWUsb0JBQWYsRUFBcUMsUUFBckMsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtNLElBQUwsQ0FBVU4sR0FBVixFQUFlLFdBQWYsRUFBNEJMLFNBQTVCLENBQUEsQ0FBQTtFQUNELEdBbkVZO0VBcUViVyxFQUFBQSxJQXJFYSxFQXFFUk4sU0FBQUEsSUFBQUEsQ0FBQUEsR0FyRVEsRUFxRUhRLEdBckVHLEVBcUVFQyxHQXJFRixFQXFFTztFQUNsQixJQUFBLElBQU1DLElBQUksR0FBR0YsR0FBRyxDQUFDRyxNQUFKLENBQVcsQ0FBWCxDQUFjQyxDQUFBQSxXQUFkLEtBQThCSixHQUFHLENBQUNLLE1BQUosQ0FBVyxDQUFYLENBQTNDLENBQUE7RUFFQWIsSUFBQUEsR0FBRyxDQUFDUCxLQUFKLENBQW1CaUIsUUFBQUEsR0FBQUEsSUFBbkIsSUFBNkJELEdBQTdCLENBQUE7RUFDQVQsSUFBQUEsR0FBRyxDQUFDUCxLQUFKLENBQWdCaUIsS0FBQUEsR0FBQUEsSUFBaEIsSUFBMEJELEdBQTFCLENBQUE7RUFDQVQsSUFBQUEsR0FBRyxDQUFDUCxLQUFKLENBQWNpQixHQUFBQSxHQUFBQSxJQUFkLElBQXdCRCxHQUF4QixDQUFBO0VBQ0FULElBQUFBLEdBQUcsQ0FBQ1AsS0FBSixDQUFlaUIsSUFBQUEsR0FBQUEsSUFBZixJQUF5QkQsR0FBekIsQ0FBQTtFQUNBVCxJQUFBQSxHQUFHLENBQUNQLEtBQUosQ0FBYWUsRUFBQUEsR0FBQUEsR0FBYixJQUFzQkMsR0FBdEIsQ0FBQTtFQUNELEdBQUE7RUE3RVksQ0FBZjs7RUNHQSxJQUFNSyxTQUFTLEdBQUcsRUFBbEIsQ0FBQTtFQUNBLElBQU1DLFdBQVcsR0FBRyxFQUFwQixDQUFBO0VBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWYsQ0FBQTtBQUVBLGdCQUFlO0VBQ2I7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUMsRUFBQUEsWUFYYSxFQVdBQyxTQUFBQSxZQUFBQSxDQUFBQSxPQVhBLEVBV1NDLEtBWFQsRUFXZ0JDLElBWGhCLEVBV3NCO0VBQ2pDRixJQUFBQSxPQUFPLENBQUNHLFNBQVIsQ0FBa0JGLEtBQWxCLEVBQXlCQyxJQUFJLENBQUNuQixDQUE5QixFQUFpQ21CLElBQUksQ0FBQ2xCLENBQXRDLENBQUEsQ0FBQTtFQUNBLElBQU1vQixJQUFBQSxTQUFTLEdBQUdKLE9BQU8sQ0FBQ0QsWUFBUixDQUFxQkcsSUFBSSxDQUFDbkIsQ0FBMUIsRUFBNkJtQixJQUFJLENBQUNsQixDQUFsQyxFQUFxQ2tCLElBQUksQ0FBQ2pDLEtBQTFDLEVBQWlEaUMsSUFBSSxDQUFDaEMsTUFBdEQsQ0FBbEIsQ0FBQTtFQUNBOEIsSUFBQUEsT0FBTyxDQUFDSyxTQUFSLENBQWtCSCxJQUFJLENBQUNuQixDQUF2QixFQUEwQm1CLElBQUksQ0FBQ2xCLENBQS9CLEVBQWtDa0IsSUFBSSxDQUFDakMsS0FBdkMsRUFBOENpQyxJQUFJLENBQUNoQyxNQUFuRCxDQUFBLENBQUE7RUFFQSxJQUFBLE9BQU9rQyxTQUFQLENBQUE7RUFDRCxHQWpCWTs7RUFtQmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VFLEVBQUFBLGVBL0JhLEVBK0JHQyxTQUFBQSxlQUFBQSxDQUFBQSxHQS9CSCxFQStCUUMsUUEvQlIsRUErQmtCQyxLQS9CbEIsRUErQnlCO0VBQ3BDLElBQU1DLElBQUFBLEdBQUcsR0FBRyxPQUFPSCxHQUFQLEtBQWUsUUFBZixHQUEwQkEsR0FBMUIsR0FBZ0NBLEdBQUcsQ0FBQ0csR0FBaEQsQ0FBQTs7RUFFQSxJQUFBLElBQUlkLFNBQVMsQ0FBQ2MsR0FBRCxDQUFiLEVBQW9CO0VBQ2xCRixNQUFBQSxRQUFRLENBQUNaLFNBQVMsQ0FBQ2MsR0FBRCxDQUFWLEVBQWlCRCxLQUFqQixDQUFSLENBQUE7RUFDRCxLQUZELE1BRU87RUFDTCxNQUFBLElBQU1SLEtBQUssR0FBRyxJQUFJVSxLQUFKLEVBQWQsQ0FBQTs7RUFDQVYsTUFBQUEsS0FBSyxDQUFDVyxNQUFOLEdBQWUsVUFBQUMsQ0FBQyxFQUFJO0VBQ2xCakIsUUFBQUEsU0FBUyxDQUFDYyxHQUFELENBQVQsR0FBaUJHLENBQUMsQ0FBQ0MsTUFBbkIsQ0FBQTtFQUNBTixRQUFBQSxRQUFRLENBQUNaLFNBQVMsQ0FBQ2MsR0FBRCxDQUFWLEVBQWlCRCxLQUFqQixDQUFSLENBQUE7RUFDRCxPQUhELENBQUE7O0VBS0FSLE1BQUFBLEtBQUssQ0FBQ1MsR0FBTixHQUFZQSxHQUFaLENBQUE7RUFDRCxLQUFBO0VBQ0YsR0E3Q1k7RUErQ2JLLEVBQUFBLGtCQS9DYSxFQStDTVIsU0FBQUEsa0JBQUFBLENBQUFBLEdBL0NOLEVBK0NXQyxRQS9DWCxFQStDcUJDLEtBL0NyQixFQStDNEI7RUFDdkMsSUFBQSxJQUFNQyxHQUFHLEdBQUdILEdBQUcsQ0FBQ0csR0FBaEIsQ0FBQTs7RUFFQSxJQUFBLElBQUksQ0FBQ2IsV0FBVyxDQUFDYSxHQUFELENBQWhCLEVBQXVCO0VBQ3JCLE1BQU16QyxJQUFBQSxLQUFLLEdBQUcrQyxTQUFTLENBQUNyRixLQUFWLENBQWdCNEUsR0FBRyxDQUFDdEMsS0FBcEIsQ0FBZCxDQUFBO0VBQ0EsTUFBTUMsSUFBQUEsTUFBTSxHQUFHOEMsU0FBUyxDQUFDckYsS0FBVixDQUFnQjRFLEdBQUcsQ0FBQ3JDLE1BQXBCLENBQWYsQ0FBQTtFQUVBLE1BQUEsSUFBTStDLE1BQU0sR0FBR0MsT0FBTyxDQUFDbkQsWUFBUixDQUFBLHNCQUFBLEdBQTRDLEVBQUUrQixRQUE5QyxFQUEwRDdCLEtBQTFELEVBQWlFQyxNQUFqRSxDQUFmLENBQUE7RUFDQSxNQUFBLElBQU04QixPQUFPLEdBQUdpQixNQUFNLENBQUNFLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBaEIsQ0FBQTtFQUNBbkIsTUFBQUEsT0FBTyxDQUFDRyxTQUFSLENBQWtCSSxHQUFsQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QkEsR0FBRyxDQUFDdEMsS0FBakMsRUFBd0NzQyxHQUFHLENBQUNyQyxNQUE1QyxDQUFBLENBQUE7RUFFQTJCLE1BQUFBLFdBQVcsQ0FBQ2EsR0FBRCxDQUFYLEdBQW1CTyxNQUFuQixDQUFBO0VBQ0QsS0FBQTs7RUFFRFQsSUFBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNYLFdBQVcsQ0FBQ2EsR0FBRCxDQUFaLEVBQW1CRCxLQUFuQixDQUFwQixDQUFBO0VBRUEsSUFBT1osT0FBQUEsV0FBVyxDQUFDYSxHQUFELENBQWxCLENBQUE7RUFDRCxHQUFBO0VBaEVZLENBQWY7O0FDTEEsYUFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFVSxFQUFBQSxTQVZhLEVBQUEsU0FBQSxTQUFBLENBVUhDLEtBVkcsRUFVSUMsUUFWSixFQVVjO0VBQ3pCRCxJQUFBQSxLQUFLLEdBQUdBLEtBQUssS0FBSyxJQUFWLElBQWtCQSxLQUFLLEtBQUtFLFNBQTVCLEdBQXdDRixLQUF4QyxHQUFnREMsUUFBeEQsQ0FBQTtFQUNBLElBQUEsT0FBT0QsS0FBUCxDQUFBO0VBQ0QsR0FiWTs7RUFlYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFRyxFQUFBQSxPQXpCYSxFQXlCTEgsU0FBQUEsT0FBQUEsQ0FBQUEsS0F6QkssRUF5QkU7RUFDYixJQUFPSSxPQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQlAsS0FBL0IsQ0FBQSxLQUEwQyxnQkFBakQsQ0FBQTtFQUNELEdBM0JZOztFQTZCYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VRLEVBQUFBLFVBckNhLEVBcUNGQyxTQUFBQSxVQUFBQSxDQUFBQSxHQXJDRSxFQXFDRztFQUNkLElBQUEsSUFBSUEsR0FBSixFQUFTQSxHQUFHLENBQUNwRyxNQUFKLEdBQWEsQ0FBYixDQUFBO0VBQ1YsR0F2Q1k7RUF5Q2JxRyxFQUFBQSxPQXpDYSxFQXlDTEQsU0FBQUEsT0FBQUEsQ0FBQUEsR0F6Q0ssRUF5Q0E7RUFDWCxJQUFPLE9BQUEsSUFBQSxDQUFLTixPQUFMLENBQWFNLEdBQWIsSUFBb0JBLEdBQXBCLEdBQTBCLENBQUNBLEdBQUQsQ0FBakMsQ0FBQTtFQUNELEdBM0NZO0VBNkNiRSxFQUFBQSxnQkE3Q2EsRUE2Q0lGLFNBQUFBLGdCQUFBQSxDQUFBQSxHQTdDSixFQTZDUztFQUNwQixJQUFBLElBQUksQ0FBQ0EsR0FBTCxFQUFVLE9BQU8sSUFBUCxDQUFBO0VBQ1YsSUFBQSxPQUFPQSxHQUFHLENBQUMzRixJQUFJLENBQUM4RixLQUFMLENBQVdILEdBQUcsQ0FBQ3BHLE1BQUosR0FBYVMsSUFBSSxDQUFDK0YsTUFBTCxFQUF4QixDQUFELENBQVYsQ0FBQTtFQUNELEdBaERZOztFQWtEYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLFdBMURhLEVBQUEsU0FBQSxXQUFBLENBMEREQyxHQTFEQyxFQTBESUMsTUExREosRUEwRG1CO0VBQUEsSUFBQSxJQUFmQSxNQUFlLEtBQUEsS0FBQSxDQUFBLEVBQUE7RUFBZkEsTUFBQUEsTUFBZSxHQUFOLElBQU0sQ0FBQTtFQUFBLEtBQUE7O0VBQzlCLElBQUEsS0FBSyxJQUFJL0MsR0FBVCxJQUFnQjhDLEdBQWhCLEVBQXFCO0VBQ25CLE1BQUlDLElBQUFBLE1BQU0sSUFBSUEsTUFBTSxDQUFDQyxPQUFQLENBQWVoRCxHQUFmLENBQUEsR0FBc0IsQ0FBQyxDQUFyQyxFQUF3QyxTQUFBO0VBQ3hDLE1BQU84QyxPQUFBQSxHQUFHLENBQUM5QyxHQUFELENBQVYsQ0FBQTtFQUNELEtBQUE7RUFDRixHQS9EWTs7RUFpRWI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFaUQsRUFBQUEsVUE1RWEsRUFBQSxTQUFBLFVBQUEsQ0E0RUZDLFdBNUVFLEVBNEVXQyxJQTVFWCxFQTRFd0I7RUFBQSxJQUFBLElBQWJBLElBQWEsS0FBQSxLQUFBLENBQUEsRUFBQTtFQUFiQSxNQUFBQSxJQUFhLEdBQU4sSUFBTSxDQUFBO0VBQUEsS0FBQTs7RUFDbkMsSUFBSSxJQUFBLENBQUNBLElBQUwsRUFBVztFQUNULE1BQU8sT0FBQSxJQUFJRCxXQUFKLEVBQVAsQ0FBQTtFQUNELEtBRkQsTUFFTztFQUNMLE1BQUEsSUFBTUUsV0FBVyxHQUFHRixXQUFXLENBQUNHLElBQVosQ0FBaUJDLEtBQWpCLENBQXVCSixXQUF2QixFQUFvQyxDQUFDLElBQUQsQ0FBQSxDQUFPSyxNQUFQLENBQWNKLElBQWQsQ0FBcEMsQ0FBcEIsQ0FBQTtFQUNBLE1BQU8sT0FBQSxJQUFJQyxXQUFKLEVBQVAsQ0FBQTtFQUNELEtBQUE7RUFDRixHQW5GWTs7RUFxRmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRTNDLEVBQUFBLFlBL0ZhLEVBK0ZBQyxTQUFBQSxZQUFBQSxDQUFBQSxPQS9GQSxFQStGU0MsS0EvRlQsRUErRmdCQyxJQS9GaEIsRUErRnNCO0VBQ2pDLElBQU80QyxPQUFBQSxPQUFPLENBQUMvQyxZQUFSLENBQXFCQyxPQUFyQixFQUE4QkMsS0FBOUIsRUFBcUNDLElBQXJDLENBQVAsQ0FBQTtFQUNELEdBakdZO0VBbUdiNkMsRUFBQUEsVUFuR2EsRUFBQSxTQUFBLFVBQUEsQ0FtR0ZqQixHQW5HRSxFQW1HR3JCLEtBbkdILEVBbUdpQjtFQUFBLElBQUEsSUFBZEEsS0FBYyxLQUFBLEtBQUEsQ0FBQSxFQUFBO0VBQWRBLE1BQUFBLEtBQWMsR0FBTixJQUFNLENBQUE7RUFBQSxLQUFBOztFQUM1QixJQUFBLElBQUk3RSxDQUFDLEdBQUdrRyxHQUFHLENBQUNwRyxNQUFaLENBQUE7O0VBRUEsSUFBT0UsT0FBQUEsQ0FBQyxFQUFSLEVBQVk7RUFDVixNQUFJLElBQUE7RUFDRmtHLFFBQUFBLEdBQUcsQ0FBQ2xHLENBQUQsQ0FBSCxDQUFPb0gsT0FBUCxDQUFldkMsS0FBZixDQUFBLENBQUE7RUFDRCxPQUZELENBRUUsT0FBT0ksQ0FBUCxFQUFVLEVBQUU7O0VBRWQsTUFBT2lCLE9BQUFBLEdBQUcsQ0FBQ2xHLENBQUQsQ0FBVixDQUFBO0VBQ0QsS0FBQTs7RUFFRGtHLElBQUFBLEdBQUcsQ0FBQ3BHLE1BQUosR0FBYSxDQUFiLENBQUE7RUFDRCxHQS9HWTtFQWlIYnVILEVBQUFBLE1BakhhLEVBQUEsU0FBQSxNQUFBLENBaUhObkMsTUFqSE0sRUFpSEVvQyxNQWpIRixFQWlIVTtFQUNyQixJQUFBLElBQUksT0FBT3pCLE1BQU0sQ0FBQ3dCLE1BQWQsS0FBeUIsVUFBN0IsRUFBeUM7RUFDdkMsTUFBQSxLQUFLLElBQUkzRCxHQUFULElBQWdCNEQsTUFBaEIsRUFBd0I7RUFDdEIsUUFBQSxJQUFJekIsTUFBTSxDQUFDQyxTQUFQLENBQWlCeUIsY0FBakIsQ0FBZ0N2QixJQUFoQyxDQUFxQ3NCLE1BQXJDLEVBQTZDNUQsR0FBN0MsQ0FBSixFQUF1RDtFQUNyRHdCLFVBQUFBLE1BQU0sQ0FBQ3hCLEdBQUQsQ0FBTixHQUFjNEQsTUFBTSxDQUFDNUQsR0FBRCxDQUFwQixDQUFBO0VBQ0QsU0FBQTtFQUNGLE9BQUE7O0VBRUQsTUFBQSxPQUFPd0IsTUFBUCxDQUFBO0VBQ0QsS0FSRCxNQVFPO0VBQ0wsTUFBQSxPQUFPVyxNQUFNLENBQUN3QixNQUFQLENBQWNuQyxNQUFkLEVBQXNCb0MsTUFBdEIsQ0FBUCxDQUFBO0VBQ0QsS0FBQTtFQUNGLEdBQUE7RUE3SFksQ0FBZjs7RUNGQSxJQUFNRSxNQUFNLEdBQUcsRUFBZixDQUFBO0VBRUEsSUFBTUMsSUFBSSxHQUFHO0VBQ1hDLEVBQUFBLE1BQU0sRUFBRSxDQURHO0VBRVhDLEVBQUFBLE1BQU0sRUFBRSxFQUZHO0VBSVh2RixFQUFBQSxFQUpXLEVBSVJ3RixTQUFBQSxFQUFBQSxDQUFBQSxJQUpRLEVBSUY7RUFDUCxJQUFBLElBQUlKLE1BQU0sQ0FBQ0ksSUFBRCxDQUFOLEtBQWlCakMsU0FBakIsSUFBOEI2QixNQUFNLENBQUNJLElBQUQsQ0FBTixLQUFpQixJQUFuRCxFQUF5REosTUFBTSxDQUFDSSxJQUFELENBQU4sR0FBZSxDQUFmLENBQUE7RUFDekQsSUFBQSxPQUFVQSxJQUFWLEdBQWtCSixHQUFBQSxHQUFBQSxNQUFNLENBQUNJLElBQUQsQ0FBTixFQUFsQixDQUFBO0VBQ0QsR0FQVTtFQVNYQyxFQUFBQSxLQVRXLEVBU0wzQyxTQUFBQSxLQUFBQSxDQUFBQSxNQVRLLEVBU0c7RUFDWixJQUFBLElBQUk0QyxHQUFHLEdBQUcsSUFBQSxDQUFLQyxjQUFMLENBQW9CN0MsTUFBcEIsQ0FBVixDQUFBO0VBQ0EsSUFBSTRDLElBQUFBLEdBQUosRUFBUyxPQUFPQSxHQUFQLENBQUE7RUFFVEEsSUFBQUEsR0FBRyxHQUFBLE9BQUEsR0FBVyxJQUFLSixDQUFBQSxNQUFMLEVBQWQsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLQyxNQUFMLENBQVlHLEdBQVosQ0FBQSxHQUFtQjVDLE1BQW5CLENBQUE7RUFDQSxJQUFBLE9BQU80QyxHQUFQLENBQUE7RUFDRCxHQWhCVTtFQWtCWEMsRUFBQUEsY0FsQlcsRUFrQkk3QyxTQUFBQSxjQUFBQSxDQUFBQSxNQWxCSixFQWtCWTtFQUNyQixJQUFJc0IsSUFBQUEsR0FBSixFQUFTcEUsRUFBVCxDQUFBOztFQUVBLElBQUEsS0FBS0EsRUFBTCxJQUFXLElBQUt1RixDQUFBQSxNQUFoQixFQUF3QjtFQUN0Qm5CLE1BQUFBLEdBQUcsR0FBRyxJQUFBLENBQUttQixNQUFMLENBQVl2RixFQUFaLENBQU4sQ0FBQTtFQUVBLE1BQUEsSUFBSW9FLEdBQUcsS0FBS3RCLE1BQVosRUFBb0IsT0FBTzlDLEVBQVAsQ0FBQTtFQUNwQixNQUFBLElBQUksS0FBSzRGLE1BQUwsQ0FBWXhCLEdBQVosRUFBaUJ0QixNQUFqQixDQUE0QnNCLElBQUFBLEdBQUcsQ0FBQzFCLEdBQUosS0FBWUksTUFBTSxDQUFDSixHQUFuRCxFQUF3RCxPQUFPMUMsRUFBUCxDQUFBO0VBQ3pELEtBQUE7O0VBRUQsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNELEdBN0JVO0VBK0JYNEYsRUFBQUEsTUEvQlcsRUFBQSxTQUFBLE1BQUEsQ0ErQkp4QixHQS9CSSxFQStCQ3RCLE1BL0JELEVBK0JTO0VBQ2xCLElBQUEsT0FBTyxPQUFPc0IsR0FBUCxLQUFlLFFBQWYsSUFBMkIsT0FBT3RCLE1BQVAsS0FBa0IsUUFBN0MsSUFBeURzQixHQUFHLENBQUN5QixPQUE3RCxJQUF3RS9DLE1BQU0sQ0FBQytDLE9BQXRGLENBQUE7RUFDRCxHQWpDVTtFQW1DWEMsRUFBQUEsU0FuQ1csRUFtQ0RKLFNBQUFBLFNBQUFBLENBQUFBLEdBbkNDLEVBbUNJO0VBQ2IsSUFBQSxPQUFPLElBQUtILENBQUFBLE1BQUwsQ0FBWUcsR0FBWixDQUFQLENBQUE7RUFDRCxHQUFBO0VBckNVLENBQWI7O0VDRkE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O01BSXFCSztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsRUFBQSxTQUFBLElBQUEsQ0FBWUMsR0FBWixFQUFpQjtFQUNmLElBQUtDLElBQUFBLENBQUFBLEtBQUwsR0FBYSxDQUFiLENBQUE7RUFDQSxJQUFLQyxJQUFBQSxDQUFBQSxLQUFMLEdBQWEsRUFBYixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O0VBQ0VDLEVBQUFBLE1BQUFBLENBQUFBLE1BQUEsU0FBSXJELEdBQUFBLENBQUFBLE1BQUosRUFBWXNELE1BQVosRUFBb0JWLEdBQXBCLEVBQXlCO0VBQ3ZCLElBQUEsSUFBSVcsQ0FBSixDQUFBO0VBQ0FYLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJNUMsTUFBTSxDQUFDd0QsTUFBZCxJQUF3QmpCLElBQUksQ0FBQ0ksS0FBTCxDQUFXM0MsTUFBWCxDQUE5QixDQUFBOztFQUVBLElBQUEsSUFBSSxJQUFLb0QsQ0FBQUEsS0FBTCxDQUFXUixHQUFYLENBQW1CLElBQUEsSUFBQSxDQUFLUSxLQUFMLENBQVdSLEdBQVgsQ0FBQSxDQUFnQmhJLE1BQWhCLEdBQXlCLENBQWhELEVBQW1EO0VBQ2pEMkksTUFBQUEsQ0FBQyxHQUFHLElBQUtILENBQUFBLEtBQUwsQ0FBV1IsR0FBWCxDQUFBLENBQWdCYSxHQUFoQixFQUFKLENBQUE7RUFDRCxLQUZELE1BRU87RUFDTEYsTUFBQUEsQ0FBQyxHQUFHLElBQUtHLENBQUFBLGFBQUwsQ0FBbUIxRCxNQUFuQixFQUEyQnNELE1BQTNCLENBQUosQ0FBQTtFQUNELEtBQUE7O0VBRURDLElBQUFBLENBQUMsQ0FBQ0MsTUFBRixHQUFXeEQsTUFBTSxDQUFDd0QsTUFBUCxJQUFpQlosR0FBNUIsQ0FBQTtFQUNBLElBQUEsT0FBT1csQ0FBUCxDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRUksU0FBQSxTQUFPM0QsTUFBQUEsQ0FBQUEsTUFBUCxFQUFlO0VBQ2IsSUFBTyxPQUFBLElBQUEsQ0FBSzRELFFBQUwsQ0FBYzVELE1BQU0sQ0FBQ3dELE1BQXJCLENBQTZCSyxDQUFBQSxJQUE3QixDQUFrQzdELE1BQWxDLENBQVAsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0UwRCxFQUFBQSxNQUFBQSxDQUFBQSxnQkFBQSxTQUFBLGFBQUEsQ0FBYzFELE1BQWQsRUFBc0JzRCxNQUF0QixFQUE4QjtFQUM1QixJQUFBLElBQUEsQ0FBS0gsS0FBTCxFQUFBLENBQUE7O0VBRUEsSUFBSSxJQUFBLElBQUEsQ0FBS1csTUFBVCxFQUFpQjtFQUNmLE1BQUEsT0FBTyxLQUFLQSxNQUFMLENBQVk5RCxNQUFaLEVBQW9Cc0QsTUFBcEIsQ0FBUCxDQUFBO0VBQ0QsS0FGRCxNQUVPLElBQUksT0FBT3RELE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7RUFDdkMsTUFBQSxPQUFPK0QsSUFBSSxDQUFDdEMsVUFBTCxDQUFnQnpCLE1BQWhCLEVBQXdCc0QsTUFBeEIsQ0FBUCxDQUFBO0VBQ0QsS0FGTSxNQUVBO0VBQ0wsTUFBT3RELE9BQUFBLE1BQU0sQ0FBQ2dFLEtBQVAsRUFBUCxDQUFBO0VBQ0QsS0FBQTtFQUNGLEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRUMsRUFBQUEsTUFBQUEsQ0FBQUEsV0FBQSxTQUFXLFFBQUEsR0FBQTtFQUNULElBQUlDLElBQUFBLEtBQUssR0FBRyxDQUFaLENBQUE7O0VBQ0EsSUFBQSxLQUFLLElBQUloSCxFQUFULElBQWUsSUFBQSxDQUFLa0csS0FBcEIsRUFBQTtFQUEyQmMsTUFBQUEsS0FBSyxJQUFJLElBQUEsQ0FBS2QsS0FBTCxDQUFXbEcsRUFBWCxFQUFldEMsTUFBeEIsQ0FBQTtFQUEzQixLQUFBOztFQUNBLElBQUEsT0FBT3NKLEtBQUssRUFBWixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0VoQyxFQUFBQSxNQUFBQSxDQUFBQSxVQUFBLFNBQVUsT0FBQSxHQUFBO0VBQ1IsSUFBQSxLQUFLLElBQUloRixFQUFULElBQWUsSUFBQSxDQUFLa0csS0FBcEIsRUFBMkI7RUFDekIsTUFBQSxJQUFBLENBQUtBLEtBQUwsQ0FBV2xHLEVBQVgsQ0FBZXRDLENBQUFBLE1BQWYsR0FBd0IsQ0FBeEIsQ0FBQTtFQUNBLE1BQUEsT0FBTyxJQUFLd0ksQ0FBQUEsS0FBTCxDQUFXbEcsRUFBWCxDQUFQLENBQUE7RUFDRCxLQUFBO0VBQ0YsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFMEcsV0FBQSxTQUFTaEIsUUFBQUEsQ0FBQUEsR0FBVCxFQUEwQjtFQUFBLElBQUEsSUFBakJBLEdBQWlCLEtBQUEsS0FBQSxDQUFBLEVBQUE7RUFBakJBLE1BQUFBLEdBQWlCLEdBQVgsU0FBVyxDQUFBO0VBQUEsS0FBQTs7RUFDeEIsSUFBQSxJQUFJLENBQUMsSUFBQSxDQUFLUSxLQUFMLENBQVdSLEdBQVgsQ0FBTCxFQUFzQixJQUFBLENBQUtRLEtBQUwsQ0FBV1IsR0FBWCxDQUFBLEdBQWtCLEVBQWxCLENBQUE7RUFDdEIsSUFBQSxPQUFPLElBQUtRLENBQUFBLEtBQUwsQ0FBV1IsR0FBWCxDQUFQLENBQUE7RUFDRDs7Ozs7TUM3SWtCdUI7RUFDbkIsRUFBQSxTQUFBLEtBQUEsQ0FBWUMsTUFBWixFQUFvQjtFQUNsQixJQUFLQSxJQUFBQSxDQUFBQSxNQUFMLEdBQWNBLE1BQWQsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBakIsQ0FBQTtFQUNBLElBQUszQixJQUFBQSxDQUFBQSxJQUFMLEdBQVksQ0FBWixDQUFBO0VBRUEsSUFBSzRCLElBQUFBLENBQUFBLFlBQUwsR0FBb0IsQ0FBcEIsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLGFBQUwsR0FBcUIsQ0FBckIsQ0FBQTtFQUNELEdBQUE7Ozs7RUFFREMsRUFBQUEsTUFBQUEsQ0FBQUEsU0FBQSxTQUFBLE1BQUEsQ0FBTy9HLEtBQVAsRUFBY2dILElBQWQsRUFBb0I7RUFDbEIsSUFBQSxJQUFBLENBQUtDLEdBQUwsQ0FBU2pILEtBQVQsRUFBZ0JnSCxJQUFoQixDQUFBLENBQUE7RUFFQSxJQUFBLElBQU1FLE9BQU8sR0FBRyxJQUFLQyxDQUFBQSxVQUFMLEVBQWhCLENBQUE7RUFDQSxJQUFBLElBQU1DLFFBQVEsR0FBRyxJQUFLQyxDQUFBQSxXQUFMLEVBQWpCLENBQUE7RUFDQSxJQUFJQyxJQUFBQSxHQUFHLEdBQUcsRUFBVixDQUFBOztFQUVBLElBQUEsUUFBUSxLQUFLckMsSUFBYjtFQUNFLE1BQUEsS0FBSyxDQUFMO0VBQ0VxQyxRQUFBQSxHQUFHLElBQUksVUFBQSxHQUFhLElBQUtYLENBQUFBLE1BQUwsQ0FBWVksUUFBWixDQUFxQnBLLE1BQWxDLEdBQTJDLE1BQWxELENBQUE7RUFDQSxRQUFJK0osSUFBQUEsT0FBSixFQUFhSSxHQUFHLElBQUksY0FBY0osT0FBTyxDQUFDTSxTQUF0QixHQUFrQyxNQUF6QyxDQUFBO0VBQ2IsUUFBSU4sSUFBQUEsT0FBSixFQUFhSSxHQUFHLElBQUksU0FBUyxJQUFLRyxDQUFBQSxhQUFMLENBQW1CUCxPQUFuQixDQUFoQixDQUFBO0VBQ2IsUUFBQSxNQUFBOztFQUVGLE1BQUEsS0FBSyxDQUFMO0VBQ0UsUUFBSUEsSUFBQUEsT0FBSixFQUFhSSxHQUFHLElBQUksY0FBQSxHQUFpQkosT0FBTyxDQUFDUSxXQUFSLENBQW9CdkssTUFBckMsR0FBOEMsTUFBckQsQ0FBQTtFQUNiLFFBQUEsSUFBSStKLE9BQUosRUFDRUksR0FBRyxJQUFJLHNDQUF5QyxHQUFBLElBQUEsQ0FBS0ssU0FBTCxDQUFlVCxPQUFPLENBQUNRLFdBQXZCLENBQXpDLEdBQStFLGFBQXRGLENBQUE7RUFDRixRQUFJUixJQUFBQSxPQUFKLEVBQWFJLEdBQUcsSUFBSSxhQUFBLEdBQWdCSixPQUFPLENBQUNVLFVBQVIsQ0FBbUJ6SyxNQUFuQyxHQUE0QyxNQUFuRCxDQUFBO0VBQ2IsUUFBQSxJQUFJK0osT0FBSixFQUFhSSxHQUFHLElBQUksc0NBQXlDLEdBQUEsSUFBQSxDQUFLSyxTQUFMLENBQWVULE9BQU8sQ0FBQ1UsVUFBdkIsQ0FBekMsR0FBOEUsYUFBckYsQ0FBQTtFQUNiLFFBQUEsTUFBQTs7RUFFRixNQUFBLEtBQUssQ0FBTDtFQUNFLFFBQUlSLElBQUFBLFFBQUosRUFBY0UsR0FBRyxJQUFJRixRQUFRLENBQUNTLElBQVQsR0FBZ0IsTUFBdkIsQ0FBQTtFQUNkLFFBQUlULElBQUFBLFFBQUosRUFBY0UsR0FBRyxJQUFJLE9BQUEsR0FBVSxJQUFLUSxDQUFBQSxnQkFBTCxDQUFzQlYsUUFBdEIsQ0FBVixHQUE0QyxNQUFuRCxDQUFBO0VBQ2QsUUFBQSxNQUFBOztFQUVGLE1BQUE7RUFDRUUsUUFBQUEsR0FBRyxJQUFJLFlBQWUsR0FBQSxJQUFBLENBQUtYLE1BQUwsQ0FBWUgsUUFBWixFQUFmLEdBQXdDLE1BQS9DLENBQUE7RUFDQWMsUUFBQUEsR0FBRyxJQUFJLE9BQUEsR0FBVSxJQUFLWCxDQUFBQSxNQUFMLENBQVlvQixJQUFaLENBQWlCdkIsUUFBakIsRUFBVixHQUF3QyxNQUEvQyxDQUFBO0VBQ0FjLFFBQUFBLEdBQUcsSUFBSSxRQUFXLEdBQUEsSUFBQSxDQUFLWCxNQUFMLENBQVlvQixJQUFaLENBQWlCckMsS0FBbkMsQ0FBQTtFQXZCSixLQUFBOztFQTBCQSxJQUFBLElBQUEsQ0FBS2tCLFNBQUwsQ0FBZW9CLFNBQWYsR0FBMkJWLEdBQTNCLENBQUE7RUFDRDs7RUFFREwsRUFBQUEsTUFBQUEsQ0FBQUEsTUFBQSxTQUFBLEdBQUEsQ0FBSWpILEtBQUosRUFBV2dILElBQVgsRUFBaUI7RUFBQSxJQUFBLElBQUEsS0FBQSxHQUFBLElBQUEsQ0FBQTs7RUFDZixJQUFJLElBQUEsQ0FBQyxJQUFLSixDQUFBQSxTQUFWLEVBQXFCO0VBQ25CLE1BQUszQixJQUFBQSxDQUFBQSxJQUFMLEdBQVksQ0FBWixDQUFBO0VBRUEsTUFBQSxJQUFBLENBQUsyQixTQUFMLEdBQWlCOUcsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWpCLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBSzZHLFNBQUwsQ0FBZTVHLEtBQWYsQ0FBcUJpSSxPQUFyQixHQUErQixDQUM3QixxREFENkIsRUFFN0IsK0ZBRjZCLEVBRzdCLDJEQUg2QixDQUFBLENBSTdCQyxJQUo2QixDQUl4QixFQUp3QixDQUEvQixDQUFBO0VBTUEsTUFBS3RCLElBQUFBLENBQUFBLFNBQUwsQ0FBZXVCLGdCQUFmLENBQ0UsT0FERixFQUVFLFVBQUE3RixDQUFDLEVBQUk7RUFDSCxRQUFBLEtBQUksQ0FBQzJDLElBQUwsRUFBQSxDQUFBO0VBQ0EsUUFBSSxJQUFBLEtBQUksQ0FBQ0EsSUFBTCxHQUFZLENBQWhCLEVBQW1CLEtBQUksQ0FBQ0EsSUFBTCxHQUFZLENBQVosQ0FBQTtFQUNwQixPQUxILEVBTUUsS0FORixDQUFBLENBQUE7RUFTQSxNQUFJbUQsSUFBQUEsRUFBSixFQUFRQyxLQUFSLENBQUE7O0VBQ0EsTUFBQSxRQUFRckksS0FBUjtFQUNFLFFBQUEsS0FBSyxDQUFMO0VBQ0VvSSxVQUFBQSxFQUFFLEdBQUcsTUFBTCxDQUFBO0VBQ0FDLFVBQUFBLEtBQUssR0FBRyxNQUFSLENBQUE7RUFDQSxVQUFBLE1BQUE7O0VBRUYsUUFBQSxLQUFLLENBQUw7RUFDRUQsVUFBQUEsRUFBRSxHQUFHLE1BQUwsQ0FBQTtFQUNBQyxVQUFBQSxLQUFLLEdBQUcsTUFBUixDQUFBO0VBQ0EsVUFBQSxNQUFBOztFQUVGLFFBQUE7RUFDRUQsVUFBQUEsRUFBRSxHQUFHLE1BQUwsQ0FBQTtFQUNBQyxVQUFBQSxLQUFLLEdBQUcsTUFBUixDQUFBO0VBYkosT0FBQTs7RUFnQkEsTUFBQSxJQUFBLENBQUt6QixTQUFMLENBQWU1RyxLQUFmLENBQXFCLGtCQUFyQixJQUEyQ29JLEVBQTNDLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS3hCLFNBQUwsQ0FBZTVHLEtBQWYsQ0FBcUIsT0FBckIsSUFBZ0NxSSxLQUFoQyxDQUFBO0VBQ0QsS0FBQTs7RUFFRCxJQUFBLElBQUksQ0FBQyxJQUFBLENBQUt6QixTQUFMLENBQWUwQixVQUFwQixFQUFnQztFQUM5QnRCLE1BQUFBLElBQUksR0FBR0EsSUFBSSxJQUFJLEtBQUtBLElBQWIsSUFBcUJsSCxRQUFRLENBQUNrSCxJQUFyQyxDQUFBO0VBQ0FBLE1BQUFBLElBQUksQ0FBQ3VCLFdBQUwsQ0FBaUIsS0FBSzNCLFNBQXRCLENBQUEsQ0FBQTtFQUNELEtBQUE7RUFDRjs7RUFFRE8sRUFBQUEsTUFBQUEsQ0FBQUEsYUFBQSxTQUFhLFVBQUEsR0FBQTtFQUNYLElBQUEsT0FBTyxLQUFLUixNQUFMLENBQVlZLFFBQVosQ0FBcUIsSUFBQSxDQUFLVixZQUExQixDQUFQLENBQUE7RUFDRDs7RUFFRFEsRUFBQUEsTUFBQUEsQ0FBQUEsY0FBQSxTQUFjLFdBQUEsR0FBQTtFQUNaLElBQUEsT0FBTyxLQUFLVixNQUFMLENBQVk2QixTQUFaLENBQXNCLElBQUEsQ0FBSzFCLGFBQTNCLENBQVAsQ0FBQTtFQUNEOztXQUVEYSxZQUFBLFNBQVVwRSxTQUFBQSxDQUFBQSxHQUFWLEVBQWU7RUFDYixJQUFJa0YsSUFBQUEsTUFBTSxHQUFHLEVBQWIsQ0FBQTtFQUNBLElBQUksSUFBQSxDQUFDbEYsR0FBRCxJQUFRLENBQUNBLEdBQUcsQ0FBQ3BHLE1BQWpCLEVBQXlCLE9BQU9zTCxNQUFQLENBQUE7O0VBRXpCLElBQUEsS0FBSyxJQUFJcEwsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2tHLEdBQUcsQ0FBQ3BHLE1BQXhCLEVBQWdDRSxDQUFDLEVBQWpDLEVBQXFDO0VBQ25Db0wsTUFBQUEsTUFBTSxJQUFJLENBQUNsRixHQUFHLENBQUNsRyxDQUFELENBQUgsQ0FBT3dLLElBQVAsSUFBZSxFQUFoQixFQUFvQnpHLE1BQXBCLENBQTJCLENBQTNCLEVBQThCLENBQTlCLElBQW1DLEdBQTdDLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUEsT0FBT3FILE1BQVAsQ0FBQTtFQUNEOztXQUVEWCxtQkFBQSxTQUFpQlYsZ0JBQUFBLENBQUFBLFFBQWpCLEVBQTJCO0VBQ3pCLElBQUEsT0FBT0EsUUFBUSxDQUFDVyxJQUFULENBQWNyQyxLQUFkLElBQXdCMEIsUUFBUSxDQUFDc0IsS0FBVCxJQUFrQnRCLFFBQVEsQ0FBQ3NCLEtBQVQsQ0FBZWhELEtBQXpELElBQW1FLENBQTFFLENBQUE7RUFDRDs7V0FFRCtCLGdCQUFBLFNBQWNuRixhQUFBQSxDQUFBQSxDQUFkLEVBQWlCO0VBQ2YsSUFBTzFFLE9BQUFBLElBQUksQ0FBQytLLEtBQUwsQ0FBV3JHLENBQUMsQ0FBQ3dELENBQUYsQ0FBSXRGLENBQWYsQ0FBQSxHQUFvQixHQUFwQixHQUEwQjVDLElBQUksQ0FBQytLLEtBQUwsQ0FBV3JHLENBQUMsQ0FBQ3dELENBQUYsQ0FBSXJGLENBQWYsQ0FBakMsQ0FBQTtFQUNEOztFQUVEZ0UsRUFBQUEsTUFBQUEsQ0FBQUEsVUFBQSxTQUFVLE9BQUEsR0FBQTtFQUNSLElBQUEsSUFBSSxLQUFLbUMsU0FBTCxJQUFrQixLQUFLQSxTQUFMLENBQWUwQixVQUFyQyxFQUFpRDtFQUMvQyxNQUFBLElBQU10QixJQUFJLEdBQUcsSUFBQSxDQUFLQSxJQUFMLElBQWFsSCxRQUFRLENBQUNrSCxJQUFuQyxDQUFBO0VBQ0FBLE1BQUFBLElBQUksQ0FBQzRCLFdBQUwsQ0FBaUIsS0FBS2hDLFNBQXRCLENBQUEsQ0FBQTtFQUNELEtBQUE7O0VBRUQsSUFBS0QsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBakIsQ0FBQTtFQUNEOzs7OztFQ2hJSDtFQUNBO0VBQ0E7RUFDQTtFQUNBO01BRXFCaUM7RUFDbkIsRUFBYyxTQUFBLGVBQUEsR0FBQTtFQUNaLElBQUtDLElBQUFBLENBQUFBLFVBQUwsR0FBa0IsSUFBbEIsQ0FBQTtFQUNELEdBQUE7O29CQUVNMUUsT0FBUCxTQUFZN0IsSUFBQUEsQ0FBQUEsTUFBWixFQUFvQjtFQUNsQkEsSUFBQUEsTUFBTSxDQUFDWSxTQUFQLENBQWlCNEYsYUFBakIsR0FBaUNGLGVBQWUsQ0FBQzFGLFNBQWhCLENBQTBCNEYsYUFBM0QsQ0FBQTtFQUNBeEcsSUFBQUEsTUFBTSxDQUFDWSxTQUFQLENBQWlCNkYsZ0JBQWpCLEdBQW9DSCxlQUFlLENBQUMxRixTQUFoQixDQUEwQjZGLGdCQUE5RCxDQUFBO0VBQ0F6RyxJQUFBQSxNQUFNLENBQUNZLFNBQVAsQ0FBaUJnRixnQkFBakIsR0FBb0NVLGVBQWUsQ0FBQzFGLFNBQWhCLENBQTBCZ0YsZ0JBQTlELENBQUE7RUFDQTVGLElBQUFBLE1BQU0sQ0FBQ1ksU0FBUCxDQUFpQjhGLG1CQUFqQixHQUF1Q0osZUFBZSxDQUFDMUYsU0FBaEIsQ0FBMEI4RixtQkFBakUsQ0FBQTtFQUNBMUcsSUFBQUEsTUFBTSxDQUFDWSxTQUFQLENBQWlCK0YsdUJBQWpCLEdBQTJDTCxlQUFlLENBQUMxRixTQUFoQixDQUEwQitGLHVCQUFyRSxDQUFBO0VBQ0Q7Ozs7RUFFRGYsRUFBQUEsTUFBQUEsQ0FBQUEsbUJBQUEsU0FBQSxnQkFBQSxDQUFpQmxELElBQWpCLEVBQXVCa0UsUUFBdkIsRUFBaUM7RUFDL0IsSUFBSSxJQUFBLENBQUMsSUFBS0wsQ0FBQUEsVUFBVixFQUFzQjtFQUNwQixNQUFLQSxJQUFBQSxDQUFBQSxVQUFMLEdBQWtCLEVBQWxCLENBQUE7RUFDRCxLQUZELE1BRU87RUFDTCxNQUFBLElBQUEsQ0FBS0csbUJBQUwsQ0FBeUJoRSxJQUF6QixFQUErQmtFLFFBQS9CLENBQUEsQ0FBQTtFQUNELEtBQUE7O0VBRUQsSUFBQSxJQUFJLENBQUMsSUFBQSxDQUFLTCxVQUFMLENBQWdCN0QsSUFBaEIsQ0FBTCxFQUE0QixJQUFBLENBQUs2RCxVQUFMLENBQWdCN0QsSUFBaEIsQ0FBQSxHQUF3QixFQUF4QixDQUFBOztFQUM1QixJQUFBLElBQUEsQ0FBSzZELFVBQUwsQ0FBZ0I3RCxJQUFoQixDQUFzQm1CLENBQUFBLElBQXRCLENBQTJCK0MsUUFBM0IsQ0FBQSxDQUFBOztFQUVBLElBQUEsT0FBT0EsUUFBUCxDQUFBO0VBQ0Q7O0VBRURGLEVBQUFBLE1BQUFBLENBQUFBLHNCQUFBLFNBQUEsbUJBQUEsQ0FBb0JoRSxJQUFwQixFQUEwQmtFLFFBQTFCLEVBQW9DO0VBQ2xDLElBQUksSUFBQSxDQUFDLElBQUtMLENBQUFBLFVBQVYsRUFBc0IsT0FBQTtFQUN0QixJQUFBLElBQUksQ0FBQyxJQUFLQSxDQUFBQSxVQUFMLENBQWdCN0QsSUFBaEIsQ0FBTCxFQUE0QixPQUFBO0VBRTVCLElBQUEsSUFBTTFCLEdBQUcsR0FBRyxJQUFBLENBQUt1RixVQUFMLENBQWdCN0QsSUFBaEIsQ0FBWixDQUFBO0VBQ0EsSUFBQSxJQUFNOUgsTUFBTSxHQUFHb0csR0FBRyxDQUFDcEcsTUFBbkIsQ0FBQTs7RUFFQSxJQUFLLEtBQUEsSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsTUFBcEIsRUFBNEJFLENBQUMsRUFBN0IsRUFBaUM7RUFDL0IsTUFBQSxJQUFJa0csR0FBRyxDQUFDbEcsQ0FBRCxDQUFILEtBQVc4TCxRQUFmLEVBQXlCO0VBQ3ZCLFFBQUloTSxJQUFBQSxNQUFNLEtBQUssQ0FBZixFQUFrQjtFQUNoQixVQUFBLE9BQU8sSUFBSzJMLENBQUFBLFVBQUwsQ0FBZ0I3RCxJQUFoQixDQUFQLENBQUE7RUFDRCxTQUZEO0VBQUEsYUFLSztFQUNIMUIsVUFBQUEsR0FBRyxDQUFDNkYsTUFBSixDQUFXL0wsQ0FBWCxFQUFjLENBQWQsQ0FBQSxDQUFBO0VBQ0QsU0FBQTs7RUFFRCxRQUFBLE1BQUE7RUFDRCxPQUFBO0VBQ0YsS0FBQTtFQUNGOztXQUVENkwsMEJBQUEsU0FBd0JqRSx1QkFBQUEsQ0FBQUEsSUFBeEIsRUFBOEI7RUFDNUIsSUFBQSxJQUFJLENBQUNBLElBQUwsRUFBVyxLQUFLNkQsVUFBTCxHQUFrQixJQUFsQixDQUFYLEtBQ0ssSUFBSSxJQUFBLENBQUtBLFVBQVQsRUFBcUIsT0FBTyxLQUFLQSxVQUFMLENBQWdCN0QsSUFBaEIsQ0FBUCxDQUFBO0VBQzNCOztFQUVEOEQsRUFBQUEsTUFBQUEsQ0FBQUEsZ0JBQUEsU0FBQSxhQUFBLENBQWM5RCxJQUFkLEVBQW9CZixJQUFwQixFQUEwQjtFQUN4QixJQUFJdUUsSUFBQUEsTUFBTSxHQUFHLEtBQWIsQ0FBQTtFQUNBLElBQU1ZLElBQUFBLFNBQVMsR0FBRyxJQUFBLENBQUtQLFVBQXZCLENBQUE7O0VBRUEsSUFBSTdELElBQUFBLElBQUksSUFBSW9FLFNBQVosRUFBdUI7RUFDckIsTUFBQSxJQUFJOUYsR0FBRyxHQUFHOEYsU0FBUyxDQUFDcEUsSUFBRCxDQUFuQixDQUFBO0VBQ0EsTUFBQSxJQUFJLENBQUMxQixHQUFMLEVBQVUsT0FBT2tGLE1BQVAsQ0FGVztFQUtyQjs7RUFFQSxNQUFBLElBQUlhLE9BQUosQ0FBQTtFQUNBLE1BQUEsSUFBSWpNLENBQUMsR0FBR2tHLEdBQUcsQ0FBQ3BHLE1BQVosQ0FBQTs7RUFDQSxNQUFPRSxPQUFBQSxDQUFDLEVBQVIsRUFBWTtFQUNWaU0sUUFBQUEsT0FBTyxHQUFHL0YsR0FBRyxDQUFDbEcsQ0FBRCxDQUFiLENBQUE7RUFDQW9MLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxJQUFJYSxPQUFPLENBQUNwRixJQUFELENBQTFCLENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FBQTs7RUFFRCxJQUFPLE9BQUEsQ0FBQyxDQUFDdUUsTUFBVCxDQUFBO0VBQ0Q7O1dBRURPLG1CQUFBLFNBQWlCL0QsZ0JBQUFBLENBQUFBLElBQWpCLEVBQXVCO0VBQ3JCLElBQU1vRSxJQUFBQSxTQUFTLEdBQUcsSUFBQSxDQUFLUCxVQUF2QixDQUFBO0VBQ0EsSUFBTyxPQUFBLENBQUMsRUFBRU8sU0FBUyxJQUFJQSxTQUFTLENBQUNwRSxJQUFELENBQXhCLENBQVIsQ0FBQTtFQUNEOzs7OztFQ3JGSCxJQUFNc0UsRUFBRSxHQUFHLFNBQVgsQ0FBQTtFQUNBLElBQU1DLFFBQVEsR0FBR0MsUUFBakIsQ0FBQTtFQUVBLElBQU1DLFFBQVEsR0FBRztFQUNmSCxFQUFBQSxFQUFFLEVBQUVBLEVBRFc7RUFFZkksRUFBQUEsSUFBSSxFQUFFSixFQUFFLEdBQUcsQ0FGSTtFQUdmSyxFQUFBQSxJQUFJLEVBQUVMLEVBQUUsR0FBRyxDQUhJO0VBSWZNLEVBQUFBLE1BQU0sRUFBRU4sRUFBRSxHQUFHLEdBSkU7RUFLZk8sRUFBQUEsT0FBTyxFQUFFLEdBQUEsR0FBTVAsRUFMQTtFQU1mRSxFQUFBQSxRQUFRLEVBQUUsQ0FBQyxHQU5JO0VBUWZNLEVBQUFBLFVBUmUsRUFRSnRFLFNBQUFBLFVBQUFBLENBQUFBLEdBUkksRUFRQztFQUNkLElBQUEsT0FBT0EsR0FBRyxLQUFLLElBQUEsQ0FBS2dFLFFBQWIsSUFBeUJoRSxHQUFHLEtBQUsrRCxRQUF4QyxDQUFBO0VBQ0QsR0FWYztFQVlmUSxFQUFBQSxVQVplLEVBWUo1TCxTQUFBQSxVQUFBQSxDQUFBQSxDQVpJLEVBWURDLENBWkMsRUFZRTRMLEtBWkYsRUFZaUI7RUFBQSxJQUFBLElBQWZBLEtBQWUsS0FBQSxLQUFBLENBQUEsRUFBQTtFQUFmQSxNQUFBQSxLQUFlLEdBQVAsS0FBTyxDQUFBO0VBQUEsS0FBQTs7RUFDOUIsSUFBQSxJQUFJLENBQUNBLEtBQUwsRUFBWSxPQUFPN0wsQ0FBQyxHQUFHUixJQUFJLENBQUMrRixNQUFMLEVBQUEsSUFBaUJ0RixDQUFDLEdBQUdELENBQXJCLENBQVgsQ0FBWixLQUNLLE9BQU8sQ0FBRVIsSUFBSSxDQUFDK0YsTUFBTCxFQUFBLElBQWlCdEYsQ0FBQyxHQUFHRCxDQUFyQixDQUFELElBQTZCLENBQTlCLElBQW1DQSxDQUExQyxDQUFBO0VBQ04sR0FmYztFQWlCZjhMLEVBQUFBLGNBakJlLEVBaUJBQyxTQUFBQSxjQUFBQSxDQUFBQSxNQWpCQSxFQWlCUUMsQ0FqQlIsRUFpQldILEtBakJYLEVBaUJrQjtFQUMvQixJQUFBLE9BQU8sSUFBS0QsQ0FBQUEsVUFBTCxDQUFnQkcsTUFBTSxHQUFHQyxDQUF6QixFQUE0QkQsTUFBTSxHQUFHQyxDQUFyQyxFQUF3Q0gsS0FBeEMsQ0FBUCxDQUFBO0VBQ0QsR0FuQmM7RUFxQmZJLEVBQUFBLFdBckJlLEVBcUJELFNBQUEsV0FBQSxHQUFBO0VBQ1osSUFBTyxPQUFBLEdBQUEsR0FBTSxDQUFDLE9BQVUsR0FBQSxDQUFFek0sSUFBSSxDQUFDK0YsTUFBTCxLQUFnQixTQUFqQixJQUErQixDQUFoQyxFQUFtQ1AsUUFBbkMsQ0FBNEMsRUFBNUMsQ0FBWCxFQUE0RGtILEtBQTVELENBQWtFLENBQUMsQ0FBbkUsQ0FBYixDQUFBO0VBQ0QsR0F2QmM7RUF5QmZDLEVBQUFBLFVBekJlLEVBQUEsU0FBQSxVQUFBLENBeUJKQyxPQXpCSSxFQXlCSyxFQXpCTDtFQTJCZjlHLEVBQUFBLEtBM0JlLEVBQUEsU0FBQSxLQUFBLENBMkJUK0IsR0EzQlMsRUEyQkpnRixDQTNCSSxFQTJCRztFQUFBLElBQUEsSUFBUEEsQ0FBTyxLQUFBLEtBQUEsQ0FBQSxFQUFBO0VBQVBBLE1BQUFBLENBQU8sR0FBSCxDQUFHLENBQUE7RUFBQSxLQUFBOztFQUNoQixJQUFNQyxJQUFBQSxNQUFNLEdBQUc5TSxJQUFJLENBQUMrTSxHQUFMLENBQVMsRUFBVCxFQUFhRixDQUFiLENBQWYsQ0FBQTtFQUNBLElBQU83TSxPQUFBQSxJQUFJLENBQUM4RixLQUFMLENBQVcrQixHQUFHLEdBQUdpRixNQUFqQixJQUEyQkEsTUFBbEMsQ0FBQTtFQUNELEdBOUJjO0VBZ0NmRSxFQUFBQSxlQWhDZSxFQWdDQ3hNLFNBQUFBLGVBQUFBLENBQUFBLENBaENELEVBZ0NJO0VBQ2pCLElBQUEsT0FBUUEsQ0FBQyxHQUFHbUwsRUFBTCxHQUFXLEdBQWxCLENBQUE7RUFDRCxHQWxDYztFQW9DZnNCLEVBQUFBLFNBcENlLEVBb0NMcEYsU0FBQUEsU0FBQUEsQ0FBQUEsR0FwQ0ssRUFvQ0E7RUFDYixJQUFBLE9BQUEsR0FBQSxHQUFXQSxHQUFHLENBQUNyQyxRQUFKLENBQWEsRUFBYixDQUFYLENBQUE7RUFDRCxHQUFBO0VBdENjLENBQWpCOztNQ0hxQjBIO0VBQ25CLEVBQUEsU0FBQSxXQUFBLENBQVk3RixJQUFaLEVBQWtCO0VBQ2hCLElBQUtBLElBQUFBLENBQUFBLElBQUwsR0FBWUEsSUFBWixDQUFBO0VBQ0QsR0FBQTs7OztFQUVEOEYsRUFBQUEsTUFBQUEsQ0FBQUEsWUFBQSxTQUFVQyxTQUFBQSxDQUFBQSxTQUFWLEVBQXFCQyxJQUFyQixFQUEyQkMsT0FBM0IsRUFBb0M7RUFDbEMsSUFBQSxJQUFBLENBQUtDLGNBQUwsQ0FBb0JILFNBQXBCLEVBQStCQyxJQUEvQixFQUFxQ0MsT0FBckMsQ0FBQSxDQUFBO0VBQ0Q7RUFHRDs7O0VBQ0FDLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQWVDLGNBQUFBLENBQUFBLFFBQWYsRUFBeUJILElBQXpCLEVBQStCQyxPQUEvQixFQUF3QztFQUN0QyxJQUFBLElBQUksQ0FBQ0UsUUFBUSxDQUFDQyxLQUFkLEVBQXFCO0VBQ25CRCxNQUFBQSxRQUFRLENBQUNFLEdBQVQsQ0FBYXhGLENBQWIsQ0FBZXlGLElBQWYsQ0FBb0JILFFBQVEsQ0FBQ3RGLENBQTdCLENBQUEsQ0FBQTtFQUNBc0YsTUFBQUEsUUFBUSxDQUFDRSxHQUFULENBQWFFLENBQWIsQ0FBZUQsSUFBZixDQUFvQkgsUUFBUSxDQUFDSSxDQUE3QixDQUFBLENBQUE7RUFFQUosTUFBQUEsUUFBUSxDQUFDaE4sQ0FBVCxDQUFXcU4sY0FBWCxDQUEwQixDQUFBLEdBQUlMLFFBQVEsQ0FBQ00sSUFBdkMsQ0FBQSxDQUFBO0VBQ0FOLE1BQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXdkUsR0FBWCxDQUFlbUUsUUFBUSxDQUFDaE4sQ0FBVCxDQUFXcU4sY0FBWCxDQUEwQlIsSUFBMUIsQ0FBZixDQUFBLENBQUE7RUFDQUcsTUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXbUIsR0FBWCxDQUFlbUUsUUFBUSxDQUFDRSxHQUFULENBQWFFLENBQWIsQ0FBZUMsY0FBZixDQUE4QlIsSUFBOUIsQ0FBZixDQUFBLENBQUE7RUFFQSxNQUFJQyxJQUFBQSxPQUFKLEVBQWFFLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXQyxjQUFYLENBQTBCUCxPQUExQixDQUFBLENBQUE7RUFFYkUsTUFBQUEsUUFBUSxDQUFDaE4sQ0FBVCxDQUFXdU4sS0FBWCxFQUFBLENBQUE7RUFDRCxLQUFBO0VBQ0Y7Ozs7O01DakJrQkM7RUFHbkI7RUFLQTs7RUFlQTtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsRUFBQSxTQUFBLE1BQUEsQ0FBWUMsZUFBWixFQUE2QjtFQUMzQixJQUFLdEUsSUFBQUEsQ0FBQUEsUUFBTCxHQUFnQixFQUFoQixDQUFBO0VBQ0EsSUFBS2lCLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsRUFBakIsQ0FBQTtFQUVBLElBQUt5QyxJQUFBQSxDQUFBQSxJQUFMLEdBQVksQ0FBWixDQUFBO0VBQ0EsSUFBS2EsSUFBQUEsQ0FBQUEsR0FBTCxHQUFXLENBQVgsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLElBQUwsR0FBWSxDQUFaLENBQUE7RUFDQSxJQUFLQyxJQUFBQSxDQUFBQSxPQUFMLEdBQWUsQ0FBZixDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUtDLEtBQUwsR0FBYSxJQUFJdkYsS0FBSixDQUFVLElBQVYsQ0FBYixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtxQixJQUFMLEdBQVksSUFBSXZDLElBQUosQ0FBUyxFQUFULENBQVosQ0FBQTtFQUVBLElBQUtxRyxJQUFBQSxDQUFBQSxlQUFMLEdBQXVCdkYsSUFBSSxDQUFDekQsU0FBTCxDQUFlZ0osZUFBZixFQUFnQ0QsTUFBTSxDQUFDTSxLQUF2QyxDQUF2QixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtDLFVBQUwsR0FBa0IsSUFBSXJCLFdBQUosQ0FBZ0IsSUFBQSxDQUFLZSxlQUFyQixDQUFsQixDQUFBO0VBRUEsSUFBS08sSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLE1BQVosQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLQyxTQUFMLEdBQWlCVCxNQUFNLENBQUNVLGdCQUF4QixDQUFBO0VBQ0QsR0FBQTs7OztFQVdEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtXQUNFQyxjQUFBLFNBQVlDLFdBQUFBLENBQUFBLE1BQVosRUFBb0I7RUFDbEJBLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLElBQVosQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtqRSxTQUFMLENBQWVwQyxJQUFmLENBQW9Cb0csTUFBcEIsQ0FBQSxDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VFLGlCQUFBLFNBQWVGLGNBQUFBLENBQUFBLE1BQWYsRUFBdUI7RUFDckIsSUFBTUcsSUFBQUEsS0FBSyxHQUFHLElBQUtuRSxDQUFBQSxTQUFMLENBQWV6RSxPQUFmLENBQXVCeUksTUFBdkIsQ0FBZCxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtoRSxTQUFMLENBQWVZLE1BQWYsQ0FBc0J1RCxLQUF0QixFQUE2QixDQUE3QixDQUFBLENBQUE7RUFDQUgsSUFBQUEsTUFBTSxDQUFDSSxNQUFQLENBQWMsSUFBZCxDQUFBLENBQUE7RUFDRCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRUMsYUFBQSxTQUFXM0YsVUFBQUEsQ0FBQUEsT0FBWCxFQUFvQjtFQUNsQixJQUFBLElBQUEsQ0FBS0ssUUFBTCxDQUFjbkIsSUFBZCxDQUFtQmMsT0FBbkIsQ0FBQSxDQUFBO0VBQ0FBLElBQUFBLE9BQU8sQ0FBQzRGLE1BQVIsR0FBaUIsSUFBakIsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLL0QsYUFBTCxDQUFtQjZDLE1BQU0sQ0FBQ21CLGFBQTFCLEVBQXlDN0YsT0FBekMsQ0FBQSxDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0U4RixnQkFBQSxTQUFjOUYsYUFBQUEsQ0FBQUEsT0FBZCxFQUF1QjtFQUNyQixJQUFNeUYsSUFBQUEsS0FBSyxHQUFHLElBQUtwRixDQUFBQSxRQUFMLENBQWN4RCxPQUFkLENBQXNCbUQsT0FBdEIsQ0FBZCxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtLLFFBQUwsQ0FBYzZCLE1BQWQsQ0FBcUJ1RCxLQUFyQixFQUE0QixDQUE1QixDQUFBLENBQUE7RUFDQXpGLElBQUFBLE9BQU8sQ0FBQzRGLE1BQVIsR0FBaUIsSUFBakIsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLL0QsYUFBTCxDQUFtQjZDLE1BQU0sQ0FBQ3FCLGVBQTFCLEVBQTJDL0YsT0FBM0MsQ0FBQSxDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRUgsRUFBQUEsTUFBQUEsQ0FBQUEsU0FBQSxTQUFTLE1BQUEsR0FBQTtFQUNQO0VBQ0EsSUFBQSxJQUFJLElBQUtxRixDQUFBQSxJQUFMLEtBQWMsTUFBbEIsRUFBMEI7RUFDeEIsTUFBQSxJQUFBLENBQUtyRCxhQUFMLENBQW1CNkMsTUFBTSxDQUFDc0IsYUFBMUIsQ0FBQSxDQUFBOztFQUVBLE1BQUl0QixJQUFBQSxNQUFNLENBQUN1QixTQUFYLEVBQXNCO0VBQ3BCLFFBQUksSUFBQSxDQUFDLElBQUtwQixDQUFBQSxJQUFWLEVBQWdCLElBQUEsQ0FBS0EsSUFBTCxHQUFZLElBQUlxQixJQUFKLEVBQVdDLENBQUFBLE9BQVgsRUFBWixDQUFBO0VBQ2hCLFFBQUEsSUFBQSxDQUFLdkIsR0FBTCxHQUFXLElBQUlzQixJQUFKLEVBQUEsQ0FBV0MsT0FBWCxFQUFYLENBQUE7RUFDQSxRQUFLckIsSUFBQUEsQ0FBQUEsT0FBTCxHQUFlLENBQUMsSUFBS0YsQ0FBQUEsR0FBTCxHQUFXLElBQUEsQ0FBS0MsSUFBakIsSUFBeUIsS0FBeEMsQ0FIb0I7O0VBS3BCLFFBQUEsSUFBQSxDQUFLdUIsa0JBQUwsRUFBQSxDQUFBO0VBRUEsUUFBSSxJQUFBLElBQUEsQ0FBS3RCLE9BQUwsR0FBZSxDQUFuQixFQUFzQixJQUFLdUIsQ0FBQUEsY0FBTCxDQUFvQixJQUFBLENBQUt2QixPQUF6QixDQUFBLENBQUE7RUFDdEIsUUFBS0QsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLElBQUEsQ0FBS0QsR0FBakIsQ0FBQTtFQUNELE9BVEQsTUFTTztFQUNMLFFBQUEsSUFBQSxDQUFLeUIsY0FBTCxDQUFvQjNCLE1BQU0sQ0FBQ1UsZ0JBQTNCLENBQUEsQ0FBQTtFQUNELE9BQUE7O0VBRUQsTUFBQSxJQUFBLENBQUt2RCxhQUFMLENBQW1CNkMsTUFBTSxDQUFDNEIsbUJBQTFCLENBQUEsQ0FBQTtFQUNELEtBakJEO0VBQUEsU0FvQks7RUFDSCxNQUFJLElBQUEsQ0FBQyxJQUFLekIsQ0FBQUEsSUFBVixFQUFnQixJQUFBLENBQUtBLElBQUwsR0FBWSxJQUFJcUIsSUFBSixFQUFXQyxDQUFBQSxPQUFYLEVBQVosQ0FBQTtFQUNoQixNQUFBLElBQUEsQ0FBS3ZCLEdBQUwsR0FBVyxJQUFJc0IsSUFBSixFQUFBLENBQVdDLE9BQVgsRUFBWCxDQUFBO0VBQ0EsTUFBS3JCLElBQUFBLENBQUFBLE9BQUwsR0FBZSxDQUFDLElBQUEsQ0FBS0YsR0FBTCxHQUFXLElBQUEsQ0FBS0MsSUFBakIsSUFBeUIsS0FBeEMsQ0FBQTs7RUFFQSxNQUFBLElBQUksSUFBS0MsQ0FBQUEsT0FBTCxHQUFlLElBQUEsQ0FBS0ssU0FBeEIsRUFBbUM7RUFDakMsUUFBQSxJQUFBLENBQUt0RCxhQUFMLENBQW1CNkMsTUFBTSxDQUFDc0IsYUFBMUIsQ0FBQSxDQUFBO0VBQ0EsUUFBQSxJQUFBLENBQUtLLGNBQUwsQ0FBb0IsSUFBS2xCLENBQUFBLFNBQXpCLEVBRmlDOztFQUlqQyxRQUFLTixJQUFBQSxDQUFBQSxJQUFMLEdBQVksSUFBQSxDQUFLRCxHQUFMLEdBQVksSUFBS0UsQ0FBQUEsT0FBTCxHQUFlLElBQUEsQ0FBS0ssU0FBckIsR0FBa0MsSUFBekQsQ0FBQTtFQUNBLFFBQUEsSUFBQSxDQUFLdEQsYUFBTCxDQUFtQjZDLE1BQU0sQ0FBQzRCLG1CQUExQixDQUFBLENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FBQTtFQUNGOztXQUVERCxpQkFBQSxTQUFldkIsY0FBQUEsQ0FBQUEsT0FBZixFQUF3QjtFQUN0QixJQUFBLElBQUkzTyxDQUFDLEdBQUcsSUFBS2tLLENBQUFBLFFBQUwsQ0FBY3BLLE1BQXRCLENBQUE7O0VBQ0EsSUFBQSxPQUFPRSxDQUFDLEVBQVIsRUFBQTtFQUFZLE1BQUEsSUFBQSxDQUFLa0ssUUFBTCxDQUFjbEssQ0FBZCxDQUFpQjBKLENBQUFBLE1BQWpCLENBQXdCaUYsT0FBeEIsQ0FBQSxDQUFBO0VBQVosS0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0VzQixFQUFBQSxNQUFBQSxDQUFBQSxxQkFBQSxTQUFxQixrQkFBQSxHQUFBO0VBQ25CLElBQUEsSUFBSSxDQUFDMUIsTUFBTSxDQUFDMEIsa0JBQVosRUFBZ0MsT0FBQTs7RUFDaEMsSUFBQSxJQUFJLElBQUt0QixDQUFBQSxPQUFMLEdBQWUsR0FBbkIsRUFBd0I7RUFDdEIsTUFBQSxJQUFBLENBQUtELElBQUwsR0FBWSxJQUFJcUIsSUFBSixFQUFBLENBQVdDLE9BQVgsRUFBWixDQUFBO0VBQ0EsTUFBS3JCLElBQUFBLENBQUFBLE9BQUwsR0FBZSxDQUFmLENBQUE7RUFDRCxLQUFBO0VBQ0YsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRXhGLEVBQUFBLE1BQUFBLENBQUFBLFdBQUEsU0FBVyxRQUFBLEdBQUE7RUFDVCxJQUFJZCxJQUFBQSxLQUFLLEdBQUcsQ0FBWixDQUFBO0VBQ0EsSUFBQSxJQUFJckksQ0FBQyxHQUFHLElBQUtrSyxDQUFBQSxRQUFMLENBQWNwSyxNQUF0QixDQUFBOztFQUVBLElBQUEsT0FBT0UsQ0FBQyxFQUFSLEVBQUE7RUFBWXFJLE1BQUFBLEtBQUssSUFBSSxJQUFLNkIsQ0FBQUEsUUFBTCxDQUFjbEssQ0FBZCxDQUFBLENBQWlCMk4sU0FBakIsQ0FBMkI3TixNQUFwQyxDQUFBO0VBQVosS0FBQTs7RUFDQSxJQUFBLE9BQU91SSxLQUFQLENBQUE7RUFDRDs7RUFFRCtILEVBQUFBLE1BQUFBLENBQUFBLGtCQUFBLFNBQWtCLGVBQUEsR0FBQTtFQUNoQixJQUFJekMsSUFBQUEsU0FBUyxHQUFHLEVBQWhCLENBQUE7RUFDQSxJQUFBLElBQUkzTixDQUFDLEdBQUcsSUFBS2tLLENBQUFBLFFBQUwsQ0FBY3BLLE1BQXRCLENBQUE7O0VBRUEsSUFBQSxPQUFPRSxDQUFDLEVBQVIsRUFBQTtFQUFZMk4sTUFBQUEsU0FBUyxHQUFHQSxTQUFTLENBQUMxRyxNQUFWLENBQWlCLElBQUtpRCxDQUFBQSxRQUFMLENBQWNsSyxDQUFkLENBQWlCMk4sQ0FBQUEsU0FBbEMsQ0FBWixDQUFBO0VBQVosS0FBQTs7RUFDQSxJQUFBLE9BQU9BLFNBQVAsQ0FBQTtFQUNEOztFQUVEMEMsRUFBQUEsTUFBQUEsQ0FBQUEscUJBQUEsU0FBcUIsa0JBQUEsR0FBQTtFQUNuQnBILElBQUFBLElBQUksQ0FBQzlCLFVBQUwsQ0FBZ0IsS0FBSytDLFFBQXJCLENBQUEsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0U5QyxVQUFBLFNBQVFtSSxPQUFBQSxDQUFBQSxNQUFSLEVBQXdCO0VBQUEsSUFBQSxJQUFBLEtBQUEsR0FBQSxJQUFBLENBQUE7O0VBQUEsSUFBQSxJQUFoQkEsTUFBZ0IsS0FBQSxLQUFBLENBQUEsRUFBQTtFQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPLENBQUE7RUFBQSxLQUFBOztFQUN0QixJQUFBLElBQU1lLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07RUFDekIsTUFBQSxLQUFJLENBQUMxQyxJQUFMLEdBQVksQ0FBWixDQUFBO0VBQ0EsTUFBQSxLQUFJLENBQUNjLElBQUwsR0FBWSxDQUFaLENBQUE7O0VBQ0EsTUFBQSxLQUFJLENBQUNoRSxJQUFMLENBQVV0RCxPQUFWLEVBQUEsQ0FBQTs7RUFDQSxNQUFBLEtBQUksQ0FBQ3dILEtBQUwsQ0FBV3hILE9BQVgsRUFBQSxDQUFBOztFQUVBNkIsTUFBQUEsSUFBSSxDQUFDOUIsVUFBTCxDQUFnQixLQUFJLENBQUMrQyxRQUFyQixDQUFBLENBQUE7RUFDQWpCLE1BQUFBLElBQUksQ0FBQzlCLFVBQUwsQ0FBZ0IsS0FBSSxDQUFDZ0UsU0FBckIsRUFBZ0MsS0FBSSxDQUFDaUYsZUFBTCxFQUFoQyxDQUFBLENBQUE7RUFFQSxNQUFBLEtBQUksQ0FBQ3RCLFVBQUwsR0FBa0IsSUFBbEIsQ0FBQTtFQUNBLE1BQUEsS0FBSSxDQUFDM0QsU0FBTCxHQUFpQixJQUFqQixDQUFBO0VBQ0EsTUFBQSxLQUFJLENBQUNqQixRQUFMLEdBQWdCLElBQWhCLENBQUE7RUFDQSxNQUFBLEtBQUksQ0FBQzBFLEtBQUwsR0FBYSxJQUFiLENBQUE7RUFDQSxNQUFBLEtBQUksQ0FBQ2xFLElBQUwsR0FBWSxJQUFaLENBQUE7RUFDRCxLQWRELENBQUE7O0VBZ0JBLElBQUEsSUFBSTZFLE1BQUosRUFBWTtFQUNWZ0IsTUFBQUEsVUFBVSxDQUFDRCxZQUFELEVBQWUsR0FBZixDQUFWLENBQUE7RUFDRCxLQUZELE1BRU87RUFDTEEsTUFBQUEsWUFBWSxFQUFBLENBQUE7RUFDYixLQUFBO0VBQ0Y7Ozs7V0F2TEQsU0FBVSxHQUFBLEdBQUE7RUFDUixNQUFBLE9BQU8sS0FBS3ZCLElBQVosQ0FBQTtFQUNEO0VBUEQsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLENBQVF5QixHQUFSLEVBQWE7RUFDWCxNQUFLekIsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZeUIsR0FBWixDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUt4QixTQUFMLEdBQWlCd0IsR0FBRyxLQUFLLE1BQVIsR0FBaUJqQyxNQUFNLENBQUNVLGdCQUF4QixHQUEyQzVDLFFBQVEsQ0FBQ2hHLEtBQVQsQ0FBZSxJQUFJbUssR0FBbkIsRUFBd0IsQ0FBeEIsQ0FBNUQsQ0FBQTtFQUNELEtBQUE7Ozs7OztFQTlEa0JqQyxPQUNadUIsWUFBWTtFQURBdkIsT0FJWmtDLFVBQVU7RUFKRWxDLE9BS1pNLFFBQVE7RUFMSU4sT0FNWm1DLE1BQU07RUFOTW5DLE9BU1pvQyxtQkFBbUI7RUFUUHBDLE9BVVpxQyxrQkFBa0I7RUFWTnJDLE9BV1pzQyxpQkFBaUI7RUFYTHRDLE9BWVp1QyxnQkFBZ0I7RUFaSnZDLE9BY1ptQixnQkFBZ0I7RUFkSm5CLE9BZVpxQixrQkFBa0I7RUFmTnJCLE9BaUJac0IsZ0JBQWdCO0VBakJKdEIsT0FrQlo0QixzQkFBc0I7RUFsQlY1QixPQW1CWlUsbUJBQW1CO0VBbkJQVixPQXFCWjBCLHFCQUFxQjtFQXFPOUJ6RSxlQUFlLENBQUN6RSxJQUFoQixDQUFxQndILE1BQXJCLENBQUE7O01DalFxQndDO0VBQ25CLEVBQUEsU0FBQSxHQUFBLENBQVlDLENBQVosRUFBcUJDLENBQXJCLEVBQThCalEsQ0FBOUIsRUFBdUM7RUFBQSxJQUFBLElBQTNCZ1EsQ0FBMkIsS0FBQSxLQUFBLENBQUEsRUFBQTtFQUEzQkEsTUFBQUEsQ0FBMkIsR0FBdkIsR0FBdUIsQ0FBQTtFQUFBLEtBQUE7O0VBQUEsSUFBQSxJQUFsQkMsQ0FBa0IsS0FBQSxLQUFBLENBQUEsRUFBQTtFQUFsQkEsTUFBQUEsQ0FBa0IsR0FBZCxHQUFjLENBQUE7RUFBQSxLQUFBOztFQUFBLElBQUEsSUFBVGpRLENBQVMsS0FBQSxLQUFBLENBQUEsRUFBQTtFQUFUQSxNQUFBQSxDQUFTLEdBQUwsR0FBSyxDQUFBO0VBQUEsS0FBQTs7RUFDckMsSUFBS2dRLElBQUFBLENBQUFBLENBQUwsR0FBU0EsQ0FBVCxDQUFBO0VBQ0EsSUFBS0MsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTQSxDQUFULENBQUE7RUFDQSxJQUFLalEsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTQSxDQUFULENBQUE7RUFDRCxHQUFBOzs7O0VBRURrUSxFQUFBQSxNQUFBQSxDQUFBQSxRQUFBLFNBQVEsS0FBQSxHQUFBO0VBQ04sSUFBS0YsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTLEdBQVQsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLENBQUwsR0FBUyxHQUFULENBQUE7RUFDQSxJQUFLalEsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTLEdBQVQsQ0FBQTtFQUNEOzs7OztBQ1hILGlCQUFlO0VBQ2JtUSxFQUFBQSxPQURhLEVBQUEsU0FBQSxPQUFBLENBQ0xqTSxNQURLLEVBQ0d4QixHQURILEVBQ1E7RUFDbkIsSUFBQSxJQUFJLENBQUN3QixNQUFMLEVBQWEsT0FBTyxLQUFQLENBQUE7RUFDYixJQUFBLE9BQU9BLE1BQU0sQ0FBQ3hCLEdBQUQsQ0FBTixLQUFnQmlDLFNBQXZCLENBRm1CO0VBSXBCLEdBTFk7O0VBT2I7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFeUwsRUFBQUEsT0FyQmEsRUFBQSxTQUFBLE9BQUEsQ0FxQkxsTSxNQXJCSyxFQXFCR21NLEtBckJILEVBcUJVO0VBQ3JCLElBQUEsS0FBSyxJQUFJQyxJQUFULElBQWlCRCxLQUFqQixFQUF3QjtFQUN0QixNQUFBLElBQUluTSxNQUFNLENBQUNxQyxjQUFQLENBQXNCK0osSUFBdEIsQ0FBSixFQUFpQztFQUMvQnBNLFFBQUFBLE1BQU0sQ0FBQ29NLElBQUQsQ0FBTixHQUFlQyxJQUFJLENBQUNDLFlBQUwsQ0FBa0JILEtBQUssQ0FBQ0MsSUFBRCxDQUF2QixDQUFmLENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FBQTs7RUFFRCxJQUFBLE9BQU9wTSxNQUFQLENBQUE7RUFDRCxHQTdCWTs7RUErQmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFdU0sRUFBQUEsWUExQ2EsRUFBQSxTQUFBLFlBQUEsQ0EwQ0ExRCxRQTFDQSxFQTBDVTJELElBMUNWLEVBMEN1QjtFQUFBLElBQUEsSUFBYkEsSUFBYSxLQUFBLEtBQUEsQ0FBQSxFQUFBO0VBQWJBLE1BQUFBLElBQWEsR0FBTixJQUFNLENBQUE7RUFBQSxLQUFBOztFQUNsQyxJQUFJLElBQUEsQ0FBQ0EsSUFBTCxFQUFXLE9BQUE7RUFFWCxJQUFBLElBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLEdBQW5CLENBQUosRUFBNkIzRCxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWV1TyxJQUFJLENBQUMsR0FBRCxDQUFuQixDQUFBO0VBQzdCLElBQUEsSUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsR0FBbkIsQ0FBSixFQUE2QjNELFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZXNPLElBQUksQ0FBQyxHQUFELENBQW5CLENBQUE7RUFFN0IsSUFBQSxJQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixJQUFuQixDQUFKLEVBQThCM0QsUUFBUSxDQUFDSSxDQUFULENBQVdoTCxDQUFYLEdBQWV1TyxJQUFJLENBQUMsSUFBRCxDQUFuQixDQUFBO0VBQzlCLElBQUEsSUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsSUFBbkIsQ0FBSixFQUE4QjNELFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxHQUFlc08sSUFBSSxDQUFDLElBQUQsQ0FBbkIsQ0FBQTtFQUU5QixJQUFBLElBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLElBQW5CLENBQUosRUFBOEIzRCxRQUFRLENBQUNoTixDQUFULENBQVdvQyxDQUFYLEdBQWV1TyxJQUFJLENBQUMsSUFBRCxDQUFuQixDQUFBO0VBQzlCLElBQUEsSUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsSUFBbkIsQ0FBSixFQUE4QjNELFFBQVEsQ0FBQ2hOLENBQVQsQ0FBV3FDLENBQVgsR0FBZXNPLElBQUksQ0FBQyxJQUFELENBQW5CLENBQUE7RUFFOUIsSUFBQSxJQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixHQUFuQixDQUFKLEVBQTZCM0QsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXeUYsSUFBWCxDQUFnQndELElBQUksQ0FBQyxHQUFELENBQXBCLENBQUEsQ0FBQTtFQUM3QixJQUFBLElBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLEdBQW5CLENBQUosRUFBNkIzRCxRQUFRLENBQUNJLENBQVQsQ0FBV0QsSUFBWCxDQUFnQndELElBQUksQ0FBQyxHQUFELENBQXBCLENBQUEsQ0FBQTtFQUM3QixJQUFBLElBQUksS0FBS1AsT0FBTCxDQUFhTyxJQUFiLEVBQW1CLEdBQW5CLENBQUosRUFBNkIzRCxRQUFRLENBQUNoTixDQUFULENBQVdtTixJQUFYLENBQWdCd0QsSUFBSSxDQUFDLEdBQUQsQ0FBcEIsQ0FBQSxDQUFBO0VBRTdCLElBQUEsSUFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsRUFBbUIsVUFBbkIsQ0FBSixFQUFvQzNELFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3lGLElBQVgsQ0FBZ0J3RCxJQUFJLENBQUMsVUFBRCxDQUFwQixDQUFBLENBQUE7RUFDcEMsSUFBQSxJQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixVQUFuQixDQUFKLEVBQW9DM0QsUUFBUSxDQUFDSSxDQUFULENBQVdELElBQVgsQ0FBZ0J3RCxJQUFJLENBQUMsVUFBRCxDQUFwQixDQUFBLENBQUE7RUFDcEMsSUFBQSxJQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixFQUFtQixZQUFuQixDQUFKLEVBQXNDM0QsUUFBUSxDQUFDaE4sQ0FBVCxDQUFXbU4sSUFBWCxDQUFnQndELElBQUksQ0FBQyxZQUFELENBQXBCLENBQUEsQ0FBQTtFQUN2QyxHQUFBO0VBN0RZLENBQWY7O0FDRUEsYUFBZTtFQUNiQyxFQUFBQSxVQURhLEVBQ0ZsTSxTQUFBQSxVQUFBQSxDQUFBQSxLQURFLEVBQ0s7RUFDaEIsSUFBQSxPQUFPQSxLQUFQLENBQUE7RUFDRCxHQUhZO0VBS2JtTSxFQUFBQSxVQUxhLEVBS0ZuTSxTQUFBQSxVQUFBQSxDQUFBQSxLQUxFLEVBS0s7RUFDaEIsSUFBQSxPQUFPbEYsSUFBSSxDQUFDK00sR0FBTCxDQUFTN0gsS0FBVCxFQUFnQixDQUFoQixDQUFQLENBQUE7RUFDRCxHQVBZO0VBU2JvTSxFQUFBQSxXQVRhLEVBU0RwTSxTQUFBQSxXQUFBQSxDQUFBQSxLQVRDLEVBU007RUFDakIsSUFBQSxPQUFPLEVBQUVsRixJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFLLEdBQUcsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBeUIsR0FBQSxDQUEzQixDQUFQLENBQUE7RUFDRCxHQVhZO0VBYWJxTSxFQUFBQSxhQWJhLEVBYUNyTSxTQUFBQSxhQUFBQSxDQUFBQSxLQWJELEVBYVE7RUFDbkIsSUFBQSxJQUFJLENBQUNBLEtBQUssSUFBSSxHQUFWLElBQWlCLENBQXJCLEVBQXdCLE9BQU8sR0FBTWxGLEdBQUFBLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBYixDQUFBO0VBRXhCLElBQU8sT0FBQSxDQUFDLEdBQUQsSUFBUSxDQUFDQSxLQUFLLElBQUksQ0FBVixJQUFlQSxLQUFmLEdBQXVCLENBQS9CLENBQVAsQ0FBQTtFQUNELEdBakJZO0VBbUJic00sRUFBQUEsV0FuQmEsRUFtQkR0TSxTQUFBQSxXQUFBQSxDQUFBQSxLQW5CQyxFQW1CTTtFQUNqQixJQUFBLE9BQU9sRixJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFULEVBQWdCLENBQWhCLENBQVAsQ0FBQTtFQUNELEdBckJZO0VBdUJidU0sRUFBQUEsWUF2QmEsRUF1QkF2TSxTQUFBQSxZQUFBQSxDQUFBQSxLQXZCQSxFQXVCTztFQUNsQixJQUFPbEYsT0FBQUEsSUFBSSxDQUFDK00sR0FBTCxDQUFTN0gsS0FBSyxHQUFHLENBQWpCLEVBQW9CLENBQXBCLENBQUEsR0FBeUIsQ0FBaEMsQ0FBQTtFQUNELEdBekJZO0VBMkJid00sRUFBQUEsY0EzQmEsRUEyQkV4TSxTQUFBQSxjQUFBQSxDQUFBQSxLQTNCRixFQTJCUztFQUNwQixJQUFBLElBQUksQ0FBQ0EsS0FBSyxJQUFJLEdBQVYsSUFBaUIsQ0FBckIsRUFBd0IsT0FBTyxHQUFNbEYsR0FBQUEsSUFBSSxDQUFDK00sR0FBTCxDQUFTN0gsS0FBVCxFQUFnQixDQUFoQixDQUFiLENBQUE7RUFFeEIsSUFBQSxPQUFPLEdBQU9sRixJQUFBQSxJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFLLEdBQUcsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBeUIsR0FBQSxDQUFoQyxDQUFQLENBQUE7RUFDRCxHQS9CWTtFQWlDYnlNLEVBQUFBLFdBakNhLEVBaUNEek0sU0FBQUEsV0FBQUEsQ0FBQUEsS0FqQ0MsRUFpQ007RUFDakIsSUFBQSxPQUFPbEYsSUFBSSxDQUFDK00sR0FBTCxDQUFTN0gsS0FBVCxFQUFnQixDQUFoQixDQUFQLENBQUE7RUFDRCxHQW5DWTtFQXFDYjBNLEVBQUFBLFlBckNhLEVBcUNBMU0sU0FBQUEsWUFBQUEsQ0FBQUEsS0FyQ0EsRUFxQ087RUFDbEIsSUFBQSxPQUFPLEVBQUVsRixJQUFJLENBQUMrTSxHQUFMLENBQVM3SCxLQUFLLEdBQUcsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBeUIsR0FBQSxDQUEzQixDQUFQLENBQUE7RUFDRCxHQXZDWTtFQXlDYjJNLEVBQUFBLGNBekNhLEVBeUNFM00sU0FBQUEsY0FBQUEsQ0FBQUEsS0F6Q0YsRUF5Q1M7RUFDcEIsSUFBQSxJQUFJLENBQUNBLEtBQUssSUFBSSxHQUFWLElBQWlCLENBQXJCLEVBQXdCLE9BQU8sR0FBTWxGLEdBQUFBLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBYixDQUFBO0VBRXhCLElBQUEsT0FBTyxDQUFDLEdBQUQsSUFBUSxDQUFDQSxLQUFLLElBQUksQ0FBVixJQUFlbEYsSUFBSSxDQUFDK00sR0FBTCxDQUFTN0gsS0FBVCxFQUFnQixDQUFoQixDQUFmLEdBQW9DLENBQTVDLENBQVAsQ0FBQTtFQUNELEdBN0NZO0VBK0NiNE0sRUFBQUEsVUEvQ2EsRUErQ0Y1TSxTQUFBQSxVQUFBQSxDQUFBQSxLQS9DRSxFQStDSztFQUNoQixJQUFBLE9BQU8sQ0FBQ2xGLElBQUksQ0FBQ0MsR0FBTCxDQUFTaUYsS0FBSyxHQUFHNEcsUUFBUSxDQUFDRSxJQUExQixDQUFELEdBQW1DLENBQTFDLENBQUE7RUFDRCxHQWpEWTtFQW1EYitGLEVBQUFBLFdBbkRhLEVBbUREN00sU0FBQUEsV0FBQUEsQ0FBQUEsS0FuREMsRUFtRE07RUFDakIsSUFBT2xGLE9BQUFBLElBQUksQ0FBQ0csR0FBTCxDQUFTK0UsS0FBSyxHQUFHNEcsUUFBUSxDQUFDRSxJQUExQixDQUFQLENBQUE7RUFDRCxHQXJEWTtFQXVEYmdHLEVBQUFBLGFBdkRhLEVBdURDOU0sU0FBQUEsYUFBQUEsQ0FBQUEsS0F2REQsRUF1RFE7RUFDbkIsSUFBQSxPQUFPLENBQUMsR0FBRCxJQUFRbEYsSUFBSSxDQUFDQyxHQUFMLENBQVNELElBQUksQ0FBQzJMLEVBQUwsR0FBVXpHLEtBQW5CLENBQUEsR0FBNEIsQ0FBcEMsQ0FBUCxDQUFBO0VBQ0QsR0F6RFk7RUEyRGIrTSxFQUFBQSxVQTNEYSxFQTJERi9NLFNBQUFBLFVBQUFBLENBQUFBLEtBM0RFLEVBMkRLO0VBQ2hCLElBQUEsT0FBT0EsS0FBSyxLQUFLLENBQVYsR0FBYyxDQUFkLEdBQWtCbEYsSUFBSSxDQUFDK00sR0FBTCxDQUFTLENBQVQsRUFBWSxFQUFBLElBQU03SCxLQUFLLEdBQUcsQ0FBZCxDQUFaLENBQXpCLENBQUE7RUFDRCxHQTdEWTtFQStEYmdOLEVBQUFBLFdBL0RhLEVBK0REaE4sU0FBQUEsV0FBQUEsQ0FBQUEsS0EvREMsRUErRE07RUFDakIsSUFBQSxPQUFPQSxLQUFLLEtBQUssQ0FBVixHQUFjLENBQWQsR0FBa0IsQ0FBQ2xGLElBQUksQ0FBQytNLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBQyxFQUFELEdBQU03SCxLQUFsQixDQUFELEdBQTRCLENBQXJELENBQUE7RUFDRCxHQWpFWTtFQW1FYmlOLEVBQUFBLGFBbkVhLEVBbUVDak4sU0FBQUEsYUFBQUEsQ0FBQUEsS0FuRUQsRUFtRVE7RUFDbkIsSUFBQSxJQUFJQSxLQUFLLEtBQUssQ0FBZCxFQUFpQixPQUFPLENBQVAsQ0FBQTtFQUVqQixJQUFBLElBQUlBLEtBQUssS0FBSyxDQUFkLEVBQWlCLE9BQU8sQ0FBUCxDQUFBO0VBRWpCLElBQUksSUFBQSxDQUFDQSxLQUFLLElBQUksR0FBVixJQUFpQixDQUFyQixFQUF3QixPQUFPLEdBQU1sRixHQUFBQSxJQUFJLENBQUMrTSxHQUFMLENBQVMsQ0FBVCxFQUFZLEVBQUEsSUFBTTdILEtBQUssR0FBRyxDQUFkLENBQVosQ0FBYixDQUFBO0VBRXhCLElBQUEsT0FBTyxPQUFPLENBQUNsRixJQUFJLENBQUMrTSxHQUFMLENBQVMsQ0FBVCxFQUFZLENBQUMsRUFBRCxHQUFNLEVBQUU3SCxLQUFwQixDQUFELEdBQThCLENBQXJDLENBQVAsQ0FBQTtFQUNELEdBM0VZO0VBNkVia04sRUFBQUEsVUE3RWEsRUE2RUZsTixTQUFBQSxVQUFBQSxDQUFBQSxLQTdFRSxFQTZFSztFQUNoQixJQUFPLE9BQUEsRUFBRWxGLElBQUksQ0FBQ3FTLElBQUwsQ0FBVSxDQUFJbk4sR0FBQUEsS0FBSyxHQUFHQSxLQUF0QixDQUErQixHQUFBLENBQWpDLENBQVAsQ0FBQTtFQUNELEdBL0VZO0VBaUZib04sRUFBQUEsV0FqRmEsRUFpRkRwTixTQUFBQSxXQUFBQSxDQUFBQSxLQWpGQyxFQWlGTTtFQUNqQixJQUFBLE9BQU9sRixJQUFJLENBQUNxUyxJQUFMLENBQVUsSUFBSXJTLElBQUksQ0FBQytNLEdBQUwsQ0FBUzdILEtBQUssR0FBRyxDQUFqQixFQUFvQixDQUFwQixDQUFkLENBQVAsQ0FBQTtFQUNELEdBbkZZO0VBcUZicU4sRUFBQUEsYUFyRmEsRUFxRkNyTixTQUFBQSxhQUFBQSxDQUFBQSxLQXJGRCxFQXFGUTtFQUNuQixJQUFJLElBQUEsQ0FBQ0EsS0FBSyxJQUFJLEdBQVYsSUFBaUIsQ0FBckIsRUFBd0IsT0FBTyxDQUFDLEdBQUQsSUFBUWxGLElBQUksQ0FBQ3FTLElBQUwsQ0FBVSxDQUFBLEdBQUluTixLQUFLLEdBQUdBLEtBQXRCLENBQStCLEdBQUEsQ0FBdkMsQ0FBUCxDQUFBO0VBQ3hCLElBQUEsT0FBTyxHQUFPbEYsSUFBQUEsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLENBQUksR0FBQSxDQUFDbk4sS0FBSyxJQUFJLENBQVYsSUFBZUEsS0FBN0IsQ0FBQSxHQUFzQyxDQUE3QyxDQUFQLENBQUE7RUFDRCxHQXhGWTtFQTBGYnNOLEVBQUFBLFVBMUZhLEVBMEZGdE4sU0FBQUEsVUFBQUEsQ0FBQUEsS0ExRkUsRUEwRks7RUFDaEIsSUFBSWhGLElBQUFBLENBQUMsR0FBRyxPQUFSLENBQUE7RUFDQSxJQUFBLE9BQU9nRixLQUFLLEdBQUdBLEtBQVIsSUFBaUIsQ0FBQ2hGLENBQUMsR0FBRyxDQUFMLElBQVVnRixLQUFWLEdBQWtCaEYsQ0FBbkMsQ0FBUCxDQUFBO0VBQ0QsR0E3Rlk7RUErRmJ1UyxFQUFBQSxXQS9GYSxFQStGRHZOLFNBQUFBLFdBQUFBLENBQUFBLEtBL0ZDLEVBK0ZNO0VBQ2pCLElBQUloRixJQUFBQSxDQUFDLEdBQUcsT0FBUixDQUFBO0VBQ0EsSUFBQSxPQUFPLENBQUNnRixLQUFLLEdBQUdBLEtBQUssR0FBRyxDQUFqQixJQUFzQkEsS0FBdEIsSUFBK0IsQ0FBQ2hGLENBQUMsR0FBRyxDQUFMLElBQVVnRixLQUFWLEdBQWtCaEYsQ0FBakQsSUFBc0QsQ0FBN0QsQ0FBQTtFQUNELEdBbEdZO0VBb0did1MsRUFBQUEsYUFwR2EsRUFvR0N4TixTQUFBQSxhQUFBQSxDQUFBQSxLQXBHRCxFQW9HUTtFQUNuQixJQUFJaEYsSUFBQUEsQ0FBQyxHQUFHLE9BQVIsQ0FBQTtFQUNBLElBQUksSUFBQSxDQUFDZ0YsS0FBSyxJQUFJLEdBQVYsSUFBaUIsQ0FBckIsRUFBd0IsT0FBTyxHQUFPQSxJQUFBQSxLQUFLLEdBQUdBLEtBQVIsSUFBaUIsQ0FBQyxDQUFDaEYsQ0FBQyxJQUFJLEtBQU4sSUFBZSxDQUFoQixJQUFxQmdGLEtBQXJCLEdBQTZCaEYsQ0FBOUMsQ0FBUCxDQUFQLENBQUE7RUFDeEIsSUFBTyxPQUFBLEdBQUEsSUFBTyxDQUFDZ0YsS0FBSyxJQUFJLENBQVYsSUFBZUEsS0FBZixJQUF3QixDQUFDLENBQUNoRixDQUFDLElBQUksS0FBTixJQUFlLENBQWhCLElBQXFCZ0YsS0FBckIsR0FBNkJoRixDQUFyRCxDQUEwRCxHQUFBLENBQWpFLENBQVAsQ0FBQTtFQUNELEdBeEdZO0VBMEdieVMsRUFBQUEsU0ExR2EsRUEwR0hDLFNBQUFBLFNBQUFBLENBQUFBLElBMUdHLEVBMEdHO0VBQ2QsSUFBQSxJQUFJLE9BQU9BLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0MsT0FBT0EsSUFBUCxDQUFoQyxLQUNLLE9BQU8sSUFBQSxDQUFLQSxJQUFMLENBQUEsSUFBYyxLQUFLeEIsVUFBMUIsQ0FBQTtFQUNOLEdBQUE7RUE3R1ksQ0FBZjs7TUNBcUJ5QjtFQUNuQixFQUFZalEsU0FBQUEsUUFBQUEsQ0FBQUEsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0VBQ2hCLElBQUEsSUFBQSxDQUFLRCxDQUFMLEdBQVNBLENBQUMsSUFBSSxDQUFkLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0MsQ0FBTCxHQUFTQSxDQUFDLElBQUksQ0FBZCxDQUFBO0VBQ0QsR0FBQTs7OztFQUVEaVEsRUFBQUEsTUFBQUEsQ0FBQUEsTUFBQSxTQUFBLEdBQUEsQ0FBSWxRLENBQUosRUFBT0MsQ0FBUCxFQUFVO0VBQ1IsSUFBS0QsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTQSxDQUFULENBQUE7RUFDQSxJQUFLQyxJQUFBQSxDQUFBQSxDQUFMLEdBQVNBLENBQVQsQ0FBQTtFQUNBLElBQUEsT0FBTyxJQUFQLENBQUE7RUFDRDs7V0FFRGtRLE9BQUEsU0FBS25RLElBQUFBLENBQUFBLENBQUwsRUFBUTtFQUNOLElBQUtBLElBQUFBLENBQUFBLENBQUwsR0FBU0EsQ0FBVCxDQUFBO0VBQ0EsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztXQUVEb1EsT0FBQSxTQUFLblEsSUFBQUEsQ0FBQUEsQ0FBTCxFQUFRO0VBQ04sSUFBS0EsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTQSxDQUFULENBQUE7RUFDQSxJQUFBLE9BQU8sSUFBUCxDQUFBO0VBQ0Q7O0VBRURvUSxFQUFBQSxNQUFBQSxDQUFBQSxjQUFBLFNBQWMsV0FBQSxHQUFBO0VBQ1osSUFBQSxJQUFJLEtBQUtyUSxDQUFMLEtBQVcsQ0FBZixFQUFrQixPQUFPNUMsSUFBSSxDQUFDa1QsS0FBTCxDQUFXLElBQUEsQ0FBS3JRLENBQWhCLEVBQW1CLElBQUEsQ0FBS0QsQ0FBeEIsQ0FBUCxDQUFsQixLQUNLLElBQUksSUFBQSxDQUFLQyxDQUFMLEdBQVMsQ0FBYixFQUFnQixPQUFPaUosUUFBUSxDQUFDRSxJQUFoQixDQUFoQixLQUNBLElBQUksSUFBS25KLENBQUFBLENBQUwsR0FBUyxDQUFiLEVBQWdCLE9BQU8sQ0FBQ2lKLFFBQVEsQ0FBQ0UsSUFBakIsQ0FBQTtFQUN0Qjs7V0FFRDJCLE9BQUEsU0FBS0MsSUFBQUEsQ0FBQUEsQ0FBTCxFQUFRO0VBQ04sSUFBQSxJQUFBLENBQUtoTCxDQUFMLEdBQVNnTCxDQUFDLENBQUNoTCxDQUFYLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0MsQ0FBTCxHQUFTK0ssQ0FBQyxDQUFDL0ssQ0FBWCxDQUFBO0VBRUEsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztFQUVEd0csRUFBQUEsTUFBQUEsQ0FBQUEsTUFBQSxTQUFBLEdBQUEsQ0FBSXVFLENBQUosRUFBT3VGLENBQVAsRUFBVTtFQUNSLElBQUlBLElBQUFBLENBQUMsS0FBSy9OLFNBQVYsRUFBcUI7RUFDbkIsTUFBQSxPQUFPLEtBQUtnTyxVQUFMLENBQWdCeEYsQ0FBaEIsRUFBbUJ1RixDQUFuQixDQUFQLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUEsSUFBQSxDQUFLdlEsQ0FBTCxJQUFVZ0wsQ0FBQyxDQUFDaEwsQ0FBWixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtDLENBQUwsSUFBVStLLENBQUMsQ0FBQy9LLENBQVosQ0FBQTtFQUVBLElBQUEsT0FBTyxJQUFQLENBQUE7RUFDRDs7RUFFRHdRLEVBQUFBLE1BQUFBLENBQUFBLFFBQUEsU0FBQSxLQUFBLENBQU03UyxDQUFOLEVBQVNDLENBQVQsRUFBWTtFQUNWLElBQUttQyxJQUFBQSxDQUFBQSxDQUFMLElBQVVwQyxDQUFWLENBQUE7RUFDQSxJQUFLcUMsSUFBQUEsQ0FBQUEsQ0FBTCxJQUFVcEMsQ0FBVixDQUFBO0VBRUEsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztFQUVEMlMsRUFBQUEsTUFBQUEsQ0FBQUEsYUFBQSxTQUFBLFVBQUEsQ0FBVzVTLENBQVgsRUFBY0MsQ0FBZCxFQUFpQjtFQUNmLElBQUttQyxJQUFBQSxDQUFBQSxDQUFMLEdBQVNwQyxDQUFDLENBQUNvQyxDQUFGLEdBQU1uQyxDQUFDLENBQUNtQyxDQUFqQixDQUFBO0VBQ0EsSUFBS0MsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTckMsQ0FBQyxDQUFDcUMsQ0FBRixHQUFNcEMsQ0FBQyxDQUFDb0MsQ0FBakIsQ0FBQTtFQUVBLElBQUEsT0FBTyxJQUFQLENBQUE7RUFDRDs7RUFFRHlRLEVBQUFBLE1BQUFBLENBQUFBLE1BQUEsU0FBQSxHQUFBLENBQUkxRixDQUFKLEVBQU91RixDQUFQLEVBQVU7RUFDUixJQUFJQSxJQUFBQSxDQUFDLEtBQUsvTixTQUFWLEVBQXFCO0VBQ25CLE1BQUEsT0FBTyxLQUFLbU8sVUFBTCxDQUFnQjNGLENBQWhCLEVBQW1CdUYsQ0FBbkIsQ0FBUCxDQUFBO0VBQ0QsS0FBQTs7RUFFRCxJQUFBLElBQUEsQ0FBS3ZRLENBQUwsSUFBVWdMLENBQUMsQ0FBQ2hMLENBQVosQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLQyxDQUFMLElBQVUrSyxDQUFDLENBQUMvSyxDQUFaLENBQUE7RUFFQSxJQUFBLE9BQU8sSUFBUCxDQUFBO0VBQ0Q7O0VBRUQwUSxFQUFBQSxNQUFBQSxDQUFBQSxhQUFBLFNBQUEsVUFBQSxDQUFXL1MsQ0FBWCxFQUFjQyxDQUFkLEVBQWlCO0VBQ2YsSUFBS21DLElBQUFBLENBQUFBLENBQUwsR0FBU3BDLENBQUMsQ0FBQ29DLENBQUYsR0FBTW5DLENBQUMsQ0FBQ21DLENBQWpCLENBQUE7RUFDQSxJQUFLQyxJQUFBQSxDQUFBQSxDQUFMLEdBQVNyQyxDQUFDLENBQUNxQyxDQUFGLEdBQU1wQyxDQUFDLENBQUNvQyxDQUFqQixDQUFBO0VBRUEsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztXQUVEMlEsZUFBQSxTQUFhdFQsWUFBQUEsQ0FBQUEsQ0FBYixFQUFnQjtFQUNkLElBQUlBLElBQUFBLENBQUMsS0FBSyxDQUFWLEVBQWE7RUFDWCxNQUFLMEMsSUFBQUEsQ0FBQUEsQ0FBTCxJQUFVMUMsQ0FBVixDQUFBO0VBQ0EsTUFBSzJDLElBQUFBLENBQUFBLENBQUwsSUFBVTNDLENBQVYsQ0FBQTtFQUNELEtBSEQsTUFHTztFQUNMLE1BQUEsSUFBQSxDQUFLNFMsR0FBTCxDQUFTLENBQVQsRUFBWSxDQUFaLENBQUEsQ0FBQTtFQUNELEtBQUE7O0VBRUQsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztXQUVEakYsaUJBQUEsU0FBZTNOLGNBQUFBLENBQUFBLENBQWYsRUFBa0I7RUFDaEIsSUFBSzBDLElBQUFBLENBQUFBLENBQUwsSUFBVTFDLENBQVYsQ0FBQTtFQUNBLElBQUsyQyxJQUFBQSxDQUFBQSxDQUFMLElBQVUzQyxDQUFWLENBQUE7RUFFQSxJQUFBLE9BQU8sSUFBUCxDQUFBO0VBQ0Q7O0VBRUR1VCxFQUFBQSxNQUFBQSxDQUFBQSxTQUFBLFNBQVMsTUFBQSxHQUFBO0VBQ1AsSUFBQSxPQUFPLElBQUs1RixDQUFBQSxjQUFMLENBQW9CLENBQUMsQ0FBckIsQ0FBUCxDQUFBO0VBQ0Q7O1dBRUQ2RixNQUFBLFNBQUk5RixHQUFBQSxDQUFBQSxDQUFKLEVBQU87RUFDTCxJQUFBLE9BQU8sSUFBS2hMLENBQUFBLENBQUwsR0FBU2dMLENBQUMsQ0FBQ2hMLENBQVgsR0FBZSxJQUFBLENBQUtDLENBQUwsR0FBUytLLENBQUMsQ0FBQy9LLENBQWpDLENBQUE7RUFDRDs7RUFFRDhRLEVBQUFBLE1BQUFBLENBQUFBLFdBQUEsU0FBVyxRQUFBLEdBQUE7RUFDVCxJQUFPLE9BQUEsSUFBQSxDQUFLL1EsQ0FBTCxHQUFTLElBQUtBLENBQUFBLENBQWQsR0FBa0IsSUFBS0MsQ0FBQUEsQ0FBTCxHQUFTLElBQUEsQ0FBS0EsQ0FBdkMsQ0FBQTtFQUNEOztFQUVEdEQsRUFBQUEsTUFBQUEsQ0FBQUEsU0FBQSxTQUFTLE1BQUEsR0FBQTtFQUNQLElBQUEsT0FBT1MsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLEtBQUt6UCxDQUFMLEdBQVMsSUFBS0EsQ0FBQUEsQ0FBZCxHQUFrQixJQUFLQyxDQUFBQSxDQUFMLEdBQVMsSUFBQSxDQUFLQSxDQUExQyxDQUFQLENBQUE7RUFDRDs7RUFFRCtRLEVBQUFBLE1BQUFBLENBQUFBLFlBQUEsU0FBWSxTQUFBLEdBQUE7RUFDVixJQUFBLE9BQU8sS0FBS0osWUFBTCxDQUFrQixJQUFLalUsQ0FBQUEsTUFBTCxFQUFsQixDQUFQLENBQUE7RUFDRDs7V0FFRHNVLGFBQUEsU0FBV2pHLFVBQUFBLENBQUFBLENBQVgsRUFBYztFQUNaLElBQU81TixPQUFBQSxJQUFJLENBQUNxUyxJQUFMLENBQVUsS0FBS3lCLGlCQUFMLENBQXVCbEcsQ0FBdkIsQ0FBVixDQUFQLENBQUE7RUFDRDs7V0FFRDdLLFNBQUEsU0FBT2dSLE1BQUFBLENBQUFBLEdBQVAsRUFBWTtFQUNWLElBQU1uUixJQUFBQSxDQUFDLEdBQUcsSUFBQSxDQUFLQSxDQUFmLENBQUE7RUFDQSxJQUFNQyxJQUFBQSxDQUFDLEdBQUcsSUFBQSxDQUFLQSxDQUFmLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBS0QsQ0FBTCxHQUFTQSxDQUFDLEdBQUc1QyxJQUFJLENBQUNDLEdBQUwsQ0FBUzhULEdBQVQsQ0FBSixHQUFvQmxSLENBQUMsR0FBRzdDLElBQUksQ0FBQ0csR0FBTCxDQUFTNFQsR0FBVCxDQUFqQyxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtsUixDQUFMLEdBQVMsQ0FBQ0QsQ0FBRCxHQUFLNUMsSUFBSSxDQUFDRyxHQUFMLENBQVM0VCxHQUFULENBQUwsR0FBcUJsUixDQUFDLEdBQUc3QyxJQUFJLENBQUNDLEdBQUwsQ0FBUzhULEdBQVQsQ0FBbEMsQ0FBQTtFQUVBLElBQUEsT0FBTyxJQUFQLENBQUE7RUFDRDs7V0FFREQsb0JBQUEsU0FBa0JsRyxpQkFBQUEsQ0FBQUEsQ0FBbEIsRUFBcUI7RUFDbkIsSUFBQSxJQUFNb0csRUFBRSxHQUFHLElBQUEsQ0FBS3BSLENBQUwsR0FBU2dMLENBQUMsQ0FBQ2hMLENBQXRCLENBQUE7RUFDQSxJQUFBLElBQU1xUixFQUFFLEdBQUcsSUFBQSxDQUFLcFIsQ0FBTCxHQUFTK0ssQ0FBQyxDQUFDL0ssQ0FBdEIsQ0FBQTtFQUVBLElBQUEsT0FBT21SLEVBQUUsR0FBR0EsRUFBTCxHQUFVQyxFQUFFLEdBQUdBLEVBQXRCLENBQUE7RUFDRDs7RUFFREMsRUFBQUEsTUFBQUEsQ0FBQUEsT0FBQSxTQUFBLElBQUEsQ0FBS3RHLENBQUwsRUFBUXVHLEtBQVIsRUFBZTtFQUNiLElBQUt2UixJQUFBQSxDQUFBQSxDQUFMLElBQVUsQ0FBQ2dMLENBQUMsQ0FBQ2hMLENBQUYsR0FBTSxJQUFBLENBQUtBLENBQVosSUFBaUJ1UixLQUEzQixDQUFBO0VBQ0EsSUFBS3RSLElBQUFBLENBQUFBLENBQUwsSUFBVSxDQUFDK0ssQ0FBQyxDQUFDL0ssQ0FBRixHQUFNLElBQUEsQ0FBS0EsQ0FBWixJQUFpQnNSLEtBQTNCLENBQUE7RUFFQSxJQUFBLE9BQU8sSUFBUCxDQUFBO0VBQ0Q7O1dBRURDLFNBQUEsU0FBT3hHLE1BQUFBLENBQUFBLENBQVAsRUFBVTtFQUNSLElBQUEsT0FBT0EsQ0FBQyxDQUFDaEwsQ0FBRixLQUFRLElBQUtBLENBQUFBLENBQWIsSUFBa0JnTCxDQUFDLENBQUMvSyxDQUFGLEtBQVEsSUFBQSxDQUFLQSxDQUF0QyxDQUFBO0VBQ0Q7O0VBRURrTCxFQUFBQSxNQUFBQSxDQUFBQSxRQUFBLFNBQVEsS0FBQSxHQUFBO0VBQ04sSUFBS25MLElBQUFBLENBQUFBLENBQUwsR0FBUyxHQUFULENBQUE7RUFDQSxJQUFLQyxJQUFBQSxDQUFBQSxDQUFMLEdBQVMsR0FBVCxDQUFBO0VBQ0EsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztFQUVEOEYsRUFBQUEsTUFBQUEsQ0FBQUEsUUFBQSxTQUFRLEtBQUEsR0FBQTtFQUNOLElBQU8sT0FBQSxJQUFJa0ssUUFBSixDQUFhLElBQUEsQ0FBS2pRLENBQWxCLEVBQXFCLElBQUEsQ0FBS0MsQ0FBMUIsQ0FBUCxDQUFBO0VBQ0Q7Ozs7O0VDOUpIOztNQVdxQndSO0VBQ25COztFQUdBOztFQUdBOztFQUdBOztFQUdBOztFQUdBOztFQUdBOztFQUdBOztFQUdBO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFBLFNBQUEsUUFBQSxDQUFZbEQsSUFBWixFQUFrQjtFQUFBLElBL0JsQnRQLElBQUFBLENBQUFBLEVBK0JrQixHQS9CYixFQStCYSxDQUFBO0VBQUEsSUE1QmxCNkwsSUFBQUEsQ0FBQUEsR0E0QmtCLEdBNUJaLElBNEJZLENBQUE7RUFBQSxJQXpCbEI0RyxJQUFBQSxDQUFBQSxJQXlCa0IsR0F6QlgsSUF5QlcsQ0FBQTtFQUFBLElBdEJsQnRLLElBQUFBLENBQUFBLFVBc0JrQixHQXRCTCxJQXNCSyxDQUFBO0VBQUEsSUFuQmxCOUIsSUFBQUEsQ0FBQUEsQ0FtQmtCLEdBbkJkLElBbUJjLENBQUE7RUFBQSxJQWhCbEIwRixJQUFBQSxDQUFBQSxDQWdCa0IsR0FoQmQsSUFnQmMsQ0FBQTtFQUFBLElBYmxCcE4sSUFBQUEsQ0FBQUEsQ0Fha0IsR0FiZCxJQWFjLENBQUE7RUFBQSxJQVZsQitULElBQUFBLENBQUFBLEdBVWtCLEdBVlosSUFVWSxDQUFBOztFQUNoQjtFQUNKO0VBQ0E7RUFDQTtFQUNBO0VBQ0ksSUFBS3RLLElBQUFBLENBQUFBLElBQUwsR0FBWSxVQUFaLENBQUE7RUFDQSxJQUFLcEksSUFBQUEsQ0FBQUEsRUFBTCxHQUFVcUYsSUFBSSxDQUFDckYsRUFBTCxDQUFRLElBQUEsQ0FBS29JLElBQWIsQ0FBVixDQUFBO0VBQ0EsSUFBS3lELElBQUFBLENBQUFBLEdBQUwsR0FBVyxFQUFYLENBQUE7RUFDQSxJQUFLNEcsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLEVBQVosQ0FBQTtFQUNBLElBQUt0SyxJQUFBQSxDQUFBQSxVQUFMLEdBQWtCLEVBQWxCLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBSzlCLENBQUwsR0FBUyxJQUFJMkssUUFBSixFQUFULENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS2pGLENBQUwsR0FBUyxJQUFJaUYsUUFBSixFQUFULENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS3JTLENBQUwsR0FBUyxJQUFJcVMsUUFBSixFQUFULENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS25GLEdBQUwsQ0FBU3hGLENBQVQsR0FBYSxJQUFJMkssUUFBSixFQUFiLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS25GLEdBQUwsQ0FBU0UsQ0FBVCxHQUFhLElBQUlpRixRQUFKLEVBQWIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLbkYsR0FBTCxDQUFTbE4sQ0FBVCxHQUFhLElBQUlxUyxRQUFKLEVBQWIsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLMEIsR0FBTCxHQUFXLElBQUkvRCxHQUFKLEVBQVgsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLRyxLQUFMLEVBQUEsQ0FBQTtFQUNBUSxJQUFBQSxJQUFJLElBQUlxRCxRQUFRLENBQUMzRCxPQUFULENBQWlCLElBQWpCLEVBQXVCTSxJQUF2QixDQUFSLENBQUE7RUFDRCxHQUFBOzs7O0VBRURzRCxFQUFBQSxNQUFBQSxDQUFBQSxlQUFBLFNBQWUsWUFBQSxHQUFBO0VBQ2IsSUFBQSxPQUFPelUsSUFBSSxDQUFDa1QsS0FBTCxDQUFXLElBQUEsQ0FBS3RGLENBQUwsQ0FBT2hMLENBQWxCLEVBQXFCLENBQUMsS0FBS2dMLENBQUwsQ0FBTy9LLENBQTdCLENBQWtDaUosR0FBQUEsUUFBUSxDQUFDSSxPQUFsRCxDQUFBO0VBQ0Q7O0VBRUR5RSxFQUFBQSxNQUFBQSxDQUFBQSxRQUFBLFNBQVEsS0FBQSxHQUFBO0VBQ04sSUFBSytELElBQUFBLENBQUFBLElBQUwsR0FBWTdJLFFBQVosQ0FBQTtFQUNBLElBQUs4SSxJQUFBQSxDQUFBQSxHQUFMLEdBQVcsQ0FBWCxDQUFBO0VBRUEsSUFBS0MsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLEtBQVosQ0FBQTtFQUNBLElBQUtuSCxJQUFBQSxDQUFBQSxLQUFMLEdBQWEsS0FBYixDQUFBO0VBQ0EsSUFBS3JFLElBQUFBLENBQUFBLElBQUwsR0FBWSxJQUFaLENBQUE7RUFDQSxJQUFLeUwsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNBLElBQUszRixJQUFBQSxDQUFBQSxNQUFMLEdBQWMsSUFBZCxDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUs0RixNQUFMLEdBQWMsQ0FBZCxDQVZNOztFQVdOLElBQUtoSCxJQUFBQSxDQUFBQSxJQUFMLEdBQVksQ0FBWixDQUFBO0VBQ0EsSUFBS2lILElBQUFBLENBQUFBLE1BQUwsR0FBYyxFQUFkLENBQUE7RUFDQSxJQUFLWixJQUFBQSxDQUFBQSxLQUFMLEdBQWEsQ0FBYixDQUFBO0VBQ0EsSUFBS3JSLElBQUFBLENBQUFBLEtBQUwsR0FBYSxDQUFiLENBQUE7RUFDQSxJQUFLa1MsSUFBQUEsQ0FBQUEsUUFBTCxHQUFnQixDQUFoQixDQUFBO0VBQ0EsSUFBS3ZLLElBQUFBLENBQUFBLEtBQUwsR0FBYSxJQUFiLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBS3ZDLENBQUwsQ0FBTzRLLEdBQVAsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS2xGLENBQUwsQ0FBT2tGLEdBQVAsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS3RTLENBQUwsQ0FBT3NTLEdBQVAsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxDQUFBLENBQUE7RUFDQSxJQUFLcEYsSUFBQUEsQ0FBQUEsR0FBTCxDQUFTeEYsQ0FBVCxDQUFXNEssR0FBWCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBQSxDQUFBO0VBQ0EsSUFBS3BGLElBQUFBLENBQUFBLEdBQUwsQ0FBU0UsQ0FBVCxDQUFXa0YsR0FBWCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBQSxDQUFBO0VBQ0EsSUFBS3BGLElBQUFBLENBQUFBLEdBQUwsQ0FBU2xOLENBQVQsQ0FBV3NTLEdBQVgsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLbUMsTUFBTCxHQUFjckMsSUFBSSxDQUFDeEIsVUFBbkIsQ0FBQTtFQUVBLElBQUttRCxJQUFBQSxDQUFBQSxHQUFMLENBQVM1RCxLQUFULEVBQUEsQ0FBQTtFQUNBakksSUFBQUEsSUFBSSxDQUFDMUMsV0FBTCxDQUFpQixLQUFLc08sSUFBdEIsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtZLG1CQUFMLEVBQUEsQ0FBQTtFQUVBLElBQUEsT0FBTyxJQUFQLENBQUE7RUFDRDs7RUFFRC9MLEVBQUFBLE1BQUFBLENBQUFBLFNBQUEsU0FBQSxNQUFBLENBQU9rRSxJQUFQLEVBQWEwQixLQUFiLEVBQW9CO0VBQ2xCLElBQUksSUFBQSxDQUFDLElBQUt0QixDQUFBQSxLQUFWLEVBQWlCO0VBQ2YsTUFBS2tILElBQUFBLENBQUFBLEdBQUwsSUFBWXRILElBQVosQ0FBQTtFQUNBLE1BQUEsSUFBQSxDQUFLOEgsZUFBTCxDQUFxQjlILElBQXJCLEVBQTJCMEIsS0FBM0IsQ0FBQSxDQUFBO0VBQ0QsS0FBQTs7RUFFRCxJQUFBLElBQUksSUFBSzRGLENBQUFBLEdBQUwsR0FBVyxJQUFBLENBQUtELElBQXBCLEVBQTBCO0VBQ3hCLE1BQU01UixJQUFBQSxLQUFLLEdBQUcsSUFBQSxDQUFLbVMsTUFBTCxDQUFZLEtBQUtOLEdBQUwsR0FBVyxJQUFLRCxDQUFBQSxJQUE1QixDQUFkLENBQUE7RUFDQSxNQUFLSSxJQUFBQSxDQUFBQSxNQUFMLEdBQWM5VSxJQUFJLENBQUNvVixHQUFMLENBQVMsQ0FBSXRTLEdBQUFBLEtBQWIsRUFBb0IsQ0FBcEIsQ0FBZCxDQUFBO0VBQ0QsS0FIRCxNQUdPO0VBQ0wsTUFBQSxJQUFBLENBQUsrRCxPQUFMLEVBQUEsQ0FBQTtFQUNELEtBQUE7RUFDRjs7RUFFRHNPLEVBQUFBLE1BQUFBLENBQUFBLGtCQUFBLFNBQUEsZUFBQSxDQUFnQjlILElBQWhCLEVBQXNCMEIsS0FBdEIsRUFBNkI7RUFDM0IsSUFBQSxJQUFNeFAsTUFBTSxHQUFHLElBQUt5SyxDQUFBQSxVQUFMLENBQWdCekssTUFBL0IsQ0FBQTtFQUNBLElBQUEsSUFBSUUsQ0FBSixDQUFBOztFQUVBLElBQUtBLEtBQUFBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0YsTUFBaEIsRUFBd0JFLENBQUMsRUFBekIsRUFBNkI7RUFDM0IsTUFBQSxJQUFBLENBQUt1SyxVQUFMLENBQWdCdkssQ0FBaEIsQ0FBc0IsSUFBQSxJQUFBLENBQUt1SyxVQUFMLENBQWdCdkssQ0FBaEIsQ0FBbUI0VixDQUFBQSxjQUFuQixDQUFrQyxJQUFsQyxFQUF3Q2hJLElBQXhDLEVBQThDMEIsS0FBOUMsQ0FBdEIsQ0FBQTtFQUNELEtBQUE7RUFDRixHQUFBO0VBRUQ7RUFDRjtFQUNBOzs7V0FDRXVHLGVBQUEsU0FBYUMsWUFBQUEsQ0FBQUEsU0FBYixFQUF3QjtFQUN0QixJQUFBLElBQUEsQ0FBS3ZMLFVBQUwsQ0FBZ0J4QixJQUFoQixDQUFxQitNLFNBQXJCLENBQUEsQ0FBQTtFQUVBLElBQUEsSUFBSUEsU0FBUyxDQUFDdk8sY0FBVixDQUF5QixTQUF6QixDQUFKLEVBQXlDdU8sU0FBUyxDQUFDQyxPQUFWLENBQWtCaE4sSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBQSxDQUFBO0VBQ3pDK00sSUFBQUEsU0FBUyxDQUFDRSxVQUFWLENBQXFCLElBQXJCLENBQUEsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7OztXQUNFQyxnQkFBQSxTQUFjMUwsYUFBQUEsQ0FBQUEsVUFBZCxFQUEwQjtFQUN4QixJQUFBLElBQU16SyxNQUFNLEdBQUd5SyxVQUFVLENBQUN6SyxNQUExQixDQUFBO0VBQ0EsSUFBQSxJQUFJRSxDQUFKLENBQUE7O0VBRUEsSUFBS0EsS0FBQUEsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHRixNQUFoQixFQUF3QkUsQ0FBQyxFQUF6QixFQUE2QjtFQUMzQixNQUFBLElBQUEsQ0FBSzZWLFlBQUwsQ0FBa0J0TCxVQUFVLENBQUN2SyxDQUFELENBQTVCLENBQUEsQ0FBQTtFQUNELEtBQUE7RUFDRjs7V0FFRGtXLGtCQUFBLFNBQWdCSixlQUFBQSxDQUFBQSxTQUFoQixFQUEyQjtFQUN6QixJQUFNeEcsSUFBQUEsS0FBSyxHQUFHLElBQUsvRSxDQUFBQSxVQUFMLENBQWdCN0QsT0FBaEIsQ0FBd0JvUCxTQUF4QixDQUFkLENBQUE7O0VBRUEsSUFBQSxJQUFJeEcsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQjtFQUNkLE1BQU13RyxJQUFBQSxVQUFTLEdBQUcsSUFBQSxDQUFLdkwsVUFBTCxDQUFnQndCLE1BQWhCLENBQXVCdUQsS0FBdkIsRUFBOEIsQ0FBOUIsQ0FBbEIsQ0FBQTs7RUFDQXdHLE1BQUFBLFVBQVMsQ0FBQ0MsT0FBVixHQUFvQixJQUFwQixDQUFBO0VBQ0QsS0FBQTtFQUNGOztFQUVETixFQUFBQSxNQUFBQSxDQUFBQSxzQkFBQSxTQUFzQixtQkFBQSxHQUFBO0VBQ3BCeE0sSUFBQUEsSUFBSSxDQUFDaEQsVUFBTCxDQUFnQixLQUFLc0UsVUFBckIsQ0FBQSxDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBOzs7RUFDRW5ELEVBQUFBLE1BQUFBLENBQUFBLFVBQUEsU0FBVSxPQUFBLEdBQUE7RUFDUixJQUFBLElBQUEsQ0FBS3FPLG1CQUFMLEVBQUEsQ0FBQTtFQUNBLElBQUtKLElBQUFBLENBQUFBLE1BQUwsR0FBYyxDQUFkLENBQUE7RUFDQSxJQUFLRixJQUFBQSxDQUFBQSxJQUFMLEdBQVksSUFBWixDQUFBO0VBQ0EsSUFBSzFGLElBQUFBLENBQUFBLE1BQUwsR0FBYyxJQUFkLENBQUE7RUFDRDs7Ozs7QUM1S0gsa0JBQWU7RUFDYjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBQ0U7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRTBHLEVBQUFBLFFBakJhLEVBaUJKQyxTQUFBQSxRQUFBQSxDQUFBQSxDQWpCSSxFQWlCRDtFQUNWLElBQUEsSUFBTUMsS0FBSyxHQUFHRCxDQUFDLENBQUN2UyxNQUFGLENBQVMsQ0FBVCxDQUFnQixLQUFBLEdBQWhCLEdBQXNCdVMsQ0FBQyxDQUFDRSxTQUFGLENBQVksQ0FBWixFQUFlLENBQWYsQ0FBdEIsR0FBMENGLENBQXhELENBQUE7RUFDQSxJQUFBLElBQU1wRixDQUFDLEdBQUd1RixRQUFRLENBQUNGLEtBQUssQ0FBQ0MsU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFELEVBQXdCLEVBQXhCLENBQWxCLENBQUE7RUFDQSxJQUFBLElBQU1yRixDQUFDLEdBQUdzRixRQUFRLENBQUNGLEtBQUssQ0FBQ0MsU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFELEVBQXdCLEVBQXhCLENBQWxCLENBQUE7RUFDQSxJQUFBLElBQU10VixDQUFDLEdBQUd1VixRQUFRLENBQUNGLEtBQUssQ0FBQ0MsU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFELEVBQXdCLEVBQXhCLENBQWxCLENBQUE7RUFFQSxJQUFPLE9BQUE7RUFBRXRGLE1BQUFBLENBQUMsRUFBREEsQ0FBRjtFQUFLQyxNQUFBQSxDQUFDLEVBQURBLENBQUw7RUFBUWpRLE1BQUFBLENBQUMsRUFBREEsQ0FBQUE7RUFBUixLQUFQLENBQUE7RUFDRCxHQXhCWTs7RUEwQmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRXdWLEVBQUFBLFFBcENhLEVBb0NKQyxTQUFBQSxRQUFBQSxDQUFBQSxHQXBDSSxFQW9DQztFQUNaLElBQWNBLE9BQUFBLE1BQUFBLEdBQUFBLEdBQUcsQ0FBQ3pGLENBQWxCLEdBQXdCeUYsSUFBQUEsR0FBQUEsR0FBRyxDQUFDeEYsQ0FBNUIsR0FBQSxJQUFBLEdBQWtDd0YsR0FBRyxDQUFDelYsQ0FBdEMsR0FBQSxHQUFBLENBQUE7RUFDRCxHQXRDWTtFQXdDYjBWLEVBQUFBLG9CQXhDYSxFQXdDUWpPLFNBQUFBLG9CQUFBQSxDQUFBQSxDQXhDUixFQXdDVztFQUN0QixJQUFBLE9BQU9rTyxNQUFNLENBQUNsTyxDQUFDLENBQUNxTSxHQUFGLENBQU05RCxDQUFQLENBQU4sR0FBa0IsS0FBbEIsR0FBMEIyRixNQUFNLENBQUNsTyxDQUFDLENBQUNxTSxHQUFGLENBQU03RCxDQUFQLENBQU4sR0FBa0IsR0FBNUMsR0FBa0QwRixNQUFNLENBQUNsTyxDQUFDLENBQUNxTSxHQUFGLENBQU05VCxDQUFQLENBQS9ELENBQUE7RUFDRCxHQUFBO0VBMUNZLENBQWY7O01DRXFCNFY7RUFDbkIsRUFBWTVGLFNBQUFBLE9BQUFBLENBQUFBLENBQVosRUFBZXNELEdBQWYsRUFBb0I7RUFDbEIsSUFBS3RELElBQUFBLENBQUFBLENBQUwsR0FBU3pRLElBQUksQ0FBQ3NXLEdBQUwsQ0FBUzdGLENBQVQsS0FBZSxDQUF4QixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtzRCxHQUFMLEdBQVdBLEdBQUcsSUFBSSxDQUFsQixDQUFBO0VBQ0QsR0FBQTs7OztFQUVEakIsRUFBQUEsTUFBQUEsQ0FBQUEsTUFBQSxTQUFBLEdBQUEsQ0FBSXJDLENBQUosRUFBT3NELEdBQVAsRUFBWTtFQUNWLElBQUt0RCxJQUFBQSxDQUFBQSxDQUFMLEdBQVNBLENBQVQsQ0FBQTtFQUNBLElBQUtzRCxJQUFBQSxDQUFBQSxHQUFMLEdBQVdBLEdBQVgsQ0FBQTtFQUNBLElBQUEsT0FBTyxJQUFQLENBQUE7RUFDRDs7V0FFRHdDLE9BQUEsU0FBSzlGLElBQUFBLENBQUFBLENBQUwsRUFBUTtFQUNOLElBQUtBLElBQUFBLENBQUFBLENBQUwsR0FBU0EsQ0FBVCxDQUFBO0VBQ0EsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztXQUVEK0YsU0FBQSxTQUFPekMsTUFBQUEsQ0FBQUEsR0FBUCxFQUFZO0VBQ1YsSUFBS0EsSUFBQUEsQ0FBQUEsR0FBTCxHQUFXQSxHQUFYLENBQUE7RUFDQSxJQUFBLE9BQU8sSUFBUCxDQUFBO0VBQ0Q7O1dBRURwRyxPQUFBLFNBQUt6RixJQUFBQSxDQUFBQSxDQUFMLEVBQVE7RUFDTixJQUFBLElBQUEsQ0FBS3VJLENBQUwsR0FBU3ZJLENBQUMsQ0FBQ3VJLENBQVgsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLc0QsR0FBTCxHQUFXN0wsQ0FBQyxDQUFDNkwsR0FBYixDQUFBO0VBQ0EsSUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNEOztFQUVEMEMsRUFBQUEsTUFBQUEsQ0FBQUEsV0FBQSxTQUFXLFFBQUEsR0FBQTtFQUNULElBQU8sT0FBQSxJQUFJNUQsUUFBSixDQUFhLElBQUs2RCxDQUFBQSxJQUFMLEVBQWIsRUFBMEIsSUFBQSxDQUFLQyxJQUFMLEVBQTFCLENBQVAsQ0FBQTtFQUNEOztFQUVERCxFQUFBQSxNQUFBQSxDQUFBQSxPQUFBLFNBQU8sSUFBQSxHQUFBO0VBQ0wsSUFBTyxPQUFBLElBQUEsQ0FBS2pHLENBQUwsR0FBU3pRLElBQUksQ0FBQ0csR0FBTCxDQUFTLElBQUs0VCxDQUFBQSxHQUFkLENBQWhCLENBQUE7RUFDRDs7RUFFRDRDLEVBQUFBLE1BQUFBLENBQUFBLE9BQUEsU0FBTyxJQUFBLEdBQUE7RUFDTCxJQUFPLE9BQUEsQ0FBQyxJQUFLbEcsQ0FBQUEsQ0FBTixHQUFVelEsSUFBSSxDQUFDQyxHQUFMLENBQVMsSUFBSzhULENBQUFBLEdBQWQsQ0FBakIsQ0FBQTtFQUNEOztFQUVESCxFQUFBQSxNQUFBQSxDQUFBQSxZQUFBLFNBQVksU0FBQSxHQUFBO0VBQ1YsSUFBS25ELElBQUFBLENBQUFBLENBQUwsR0FBUyxDQUFULENBQUE7RUFDQSxJQUFBLE9BQU8sSUFBUCxDQUFBO0VBQ0Q7O1dBRUQyRCxTQUFBLFNBQU94RyxNQUFBQSxDQUFBQSxDQUFQLEVBQVU7RUFDUixJQUFBLE9BQU9BLENBQUMsQ0FBQzZDLENBQUYsS0FBUSxJQUFLQSxDQUFBQSxDQUFiLElBQWtCN0MsQ0FBQyxDQUFDbUcsR0FBRixLQUFVLElBQUEsQ0FBS0EsR0FBeEMsQ0FBQTtFQUNEOztFQUVEaEcsRUFBQUEsTUFBQUEsQ0FBQUEsUUFBQSxTQUFRLEtBQUEsR0FBQTtFQUNOLElBQUswQyxJQUFBQSxDQUFBQSxDQUFMLEdBQVMsR0FBVCxDQUFBO0VBQ0EsSUFBS3NELElBQUFBLENBQUFBLEdBQUwsR0FBVyxHQUFYLENBQUE7RUFDQSxJQUFBLE9BQU8sSUFBUCxDQUFBO0VBQ0Q7O0VBRURwTCxFQUFBQSxNQUFBQSxDQUFBQSxRQUFBLFNBQVEsS0FBQSxHQUFBO0VBQ04sSUFBTyxPQUFBLElBQUkwTixPQUFKLENBQVksSUFBQSxDQUFLNUYsQ0FBakIsRUFBb0IsSUFBQSxDQUFLc0QsR0FBekIsQ0FBUCxDQUFBO0VBQ0Q7Ozs7O0VDM0RILElBQU02QyxJQUFJLEdBQUc7RUFDWG5PLEVBQUFBLE1BRFcsRUFDSm9PLFNBQUFBLE1BQUFBLENBQUFBLElBREksRUFDRTtFQUNYLElBQUEsSUFBTUMsR0FBRyxHQUFHLElBQUlDLFlBQUosQ0FBaUIsQ0FBakIsQ0FBWixDQUFBO0VBQ0EsSUFBQSxJQUFJRixJQUFKLEVBQVUsSUFBQSxDQUFLL0QsR0FBTCxDQUFTK0QsSUFBVCxFQUFlQyxHQUFmLENBQUEsQ0FBQTtFQUVWLElBQUEsT0FBT0EsR0FBUCxDQUFBO0VBQ0QsR0FOVTtFQVFYaEUsRUFBQUEsR0FSVyxFQUFBLFNBQUEsR0FBQSxDQVFQa0UsSUFSTyxFQVFEQyxJQVJDLEVBUUs7RUFDZCxJQUFLLEtBQUEsSUFBSXhYLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBQTtFQUE0QndYLE1BQUFBLElBQUksQ0FBQ3hYLENBQUQsQ0FBSixHQUFVdVgsSUFBSSxDQUFDdlgsQ0FBRCxDQUFkLENBQUE7RUFBNUIsS0FBQTs7RUFFQSxJQUFBLE9BQU93WCxJQUFQLENBQUE7RUFDRCxHQVpVO0VBY1hDLEVBQUFBLFFBZFcsRUFjRkosU0FBQUEsUUFBQUEsQ0FBQUEsR0FkRSxFQWNHRyxJQWRILEVBY1NKLElBZFQsRUFjZTtFQUN4QixJQUFBLElBQUluVyxHQUFHLEdBQUdvVyxHQUFHLENBQUMsQ0FBRCxDQUFiO0VBQUEsUUFDRW5XLEdBQUcsR0FBR21XLEdBQUcsQ0FBQyxDQUFELENBRFg7RUFBQSxRQUVFbFcsR0FBRyxHQUFHa1csR0FBRyxDQUFDLENBQUQsQ0FGWDtFQUFBLFFBR0VqVyxHQUFHLEdBQUdpVyxHQUFHLENBQUMsQ0FBRCxDQUhYO0VBQUEsUUFJRWhXLEdBQUcsR0FBR2dXLEdBQUcsQ0FBQyxDQUFELENBSlg7RUFBQSxRQUtFOVYsR0FBRyxHQUFHOFYsR0FBRyxDQUFDLENBQUQsQ0FMWDtFQUFBLFFBTUU3VixHQUFHLEdBQUc2VixHQUFHLENBQUMsQ0FBRCxDQU5YO0VBQUEsUUFPRTNWLEdBQUcsR0FBRzhWLElBQUksQ0FBQyxDQUFELENBUFo7RUFBQSxRQVFFN1YsR0FBRyxHQUFHNlYsSUFBSSxDQUFDLENBQUQsQ0FSWjtFQUFBLFFBU0U1VixHQUFHLEdBQUc0VixJQUFJLENBQUMsQ0FBRCxDQVRaO0VBQUEsUUFVRTNWLEdBQUcsR0FBRzJWLElBQUksQ0FBQyxDQUFELENBVlo7RUFBQSxRQVdFMVYsR0FBRyxHQUFHMFYsSUFBSSxDQUFDLENBQUQsQ0FYWjtFQUFBLFFBWUV4VixHQUFHLEdBQUd3VixJQUFJLENBQUMsQ0FBRCxDQVpaO0VBQUEsUUFhRXZWLEdBQUcsR0FBR3VWLElBQUksQ0FBQyxDQUFELENBYlosQ0FBQTtFQWVBSixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVUxVixHQUFHLEdBQUdULEdBQU4sR0FBWVUsR0FBRyxHQUFHUCxHQUE1QixDQUFBO0VBQ0FnVyxJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVUxVixHQUFHLEdBQUdSLEdBQU4sR0FBWVMsR0FBRyxHQUFHTixHQUE1QixDQUFBO0VBQ0ErVixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVqVyxHQUFHLEdBQUdTLEdBQWhCLENBQUE7RUFDQXdWLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVXZWLEdBQUcsR0FBR1osR0FBTixHQUFZYSxHQUFHLEdBQUdWLEdBQTVCLENBQUE7RUFDQWdXLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVXZWLEdBQUcsR0FBR1gsR0FBTixHQUFZWSxHQUFHLEdBQUdULEdBQTVCLENBQUE7RUFDQStWLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVXBWLEdBQUcsR0FBR2YsR0FBTixHQUFZZ0IsR0FBRyxHQUFHYixHQUFsQixHQUF3QkcsR0FBbEMsQ0FBQTtFQUNBNlYsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVcFYsR0FBRyxHQUFHZCxHQUFOLEdBQVllLEdBQUcsR0FBR1osR0FBbEIsR0FBd0JHLEdBQWxDLENBQUE7RUFFQSxJQUFBLE9BQU80VixJQUFQLENBQUE7RUFDRCxHQXZDVTtFQXlDWE0sRUFBQUEsT0F6Q1csRUFBQSxTQUFBLE9BQUEsQ0F5Q0hMLEdBekNHLEVBeUNFRCxJQXpDRixFQXlDUTtFQUNqQixJQUFBLElBQUluVyxHQUFHLEdBQUdvVyxHQUFHLENBQUMsQ0FBRCxDQUFiO0VBQUEsUUFDRW5XLEdBQUcsR0FBR21XLEdBQUcsQ0FBQyxDQUFELENBRFg7RUFBQSxRQUVFalcsR0FBRyxHQUFHaVcsR0FBRyxDQUFDLENBQUQsQ0FGWDtFQUFBLFFBR0VoVyxHQUFHLEdBQUdnVyxHQUFHLENBQUMsQ0FBRCxDQUhYO0VBQUEsUUFJRTlWLEdBQUcsR0FBRzhWLEdBQUcsQ0FBQyxDQUFELENBSlg7RUFBQSxRQUtFN1YsR0FBRyxHQUFHNlYsR0FBRyxDQUFDLENBQUQsQ0FMWDtFQUFBLFFBTUUxVixHQUFHLEdBQUdOLEdBTlI7RUFBQSxRQU9FUyxHQUFHLEdBQUcsQ0FBQ1YsR0FQVDtFQUFBLFFBUUVhLEdBQUcsR0FBR1QsR0FBRyxHQUFHSixHQUFOLEdBQVlDLEdBQUcsR0FBR0UsR0FSMUI7RUFBQSxRQVNFb1csQ0FBQyxHQUFHMVcsR0FBRyxHQUFHVSxHQUFOLEdBQVlULEdBQUcsR0FBR1ksR0FUeEI7RUFBQSxRQVVFTSxFQVZGLENBQUE7RUFZQUEsSUFBQUEsRUFBRSxHQUFHLENBQUEsR0FBSXVWLENBQVQsQ0FBQTtFQUNBUCxJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVV6VixHQUFHLEdBQUdTLEVBQWhCLENBQUE7RUFDQWdWLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxDQUFDbFcsR0FBRCxHQUFPa0IsRUFBakIsQ0FBQTtFQUNBZ1YsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVdFYsR0FBRyxHQUFHTSxFQUFoQixDQUFBO0VBQ0FnVixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVuVyxHQUFHLEdBQUdtQixFQUFoQixDQUFBO0VBQ0FnVixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVuVixHQUFHLEdBQUdHLEVBQWhCLENBQUE7RUFDQWdWLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxDQUFDLENBQUM1VixHQUFELEdBQU9QLEdBQVAsR0FBYUMsR0FBRyxHQUFHSyxHQUFwQixJQUEyQmEsRUFBckMsQ0FBQTtFQUVBLElBQUEsT0FBT2dWLElBQVAsQ0FBQTtFQUNELEdBL0RVO0VBaUVYUSxFQUFBQSxZQWpFVyxFQWlFRUMsU0FBQUEsWUFBQUEsQ0FBQUEsQ0FqRUYsRUFpRUtDLEdBakVMLEVBaUVVVixJQWpFVixFQWlFZ0I7RUFDekIsSUFBQSxJQUFJalUsQ0FBQyxHQUFHMlUsR0FBRyxDQUFDLENBQUQsQ0FBWDtFQUFBLFFBQ0UxVSxDQUFDLEdBQUcwVSxHQUFHLENBQUMsQ0FBRCxDQURULENBQUE7RUFHQVYsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFValUsQ0FBQyxHQUFHMFUsQ0FBQyxDQUFDLENBQUQsQ0FBTCxHQUFXelUsQ0FBQyxHQUFHeVUsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsR0FBc0JBLENBQUMsQ0FBQyxDQUFELENBQWpDLENBQUE7RUFDQVQsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFValUsQ0FBQyxHQUFHMFUsQ0FBQyxDQUFDLENBQUQsQ0FBTCxHQUFXelUsQ0FBQyxHQUFHeVUsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsR0FBc0JBLENBQUMsQ0FBQyxDQUFELENBQWpDLENBQUE7RUFFQSxJQUFBLE9BQU9ULElBQVAsQ0FBQTtFQUNELEdBQUE7RUF6RVUsQ0FBYjs7TUNHcUI3RjtFQUNuQixFQUFBLFNBQUEsSUFBQSxDQUFZeFEsQ0FBWixFQUFlQyxDQUFmLEVBQWtCOEwsTUFBbEIsRUFBMEI7RUFDeEIsSUFBQSxJQUFJN0QsSUFBSSxDQUFDckQsT0FBTCxDQUFhN0UsQ0FBYixDQUFKLEVBQXFCO0VBQ25CLE1BQUs2RSxJQUFBQSxDQUFBQSxPQUFMLEdBQWUsSUFBZixDQUFBO0VBQ0EsTUFBSzdFLElBQUFBLENBQUFBLENBQUwsR0FBU0EsQ0FBVCxDQUFBO0VBQ0QsS0FIRCxNQUdPO0VBQ0wsTUFBSzZFLElBQUFBLENBQUFBLE9BQUwsR0FBZSxLQUFmLENBQUE7RUFDQSxNQUFLN0UsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTa0ksSUFBSSxDQUFDekQsU0FBTCxDQUFlekUsQ0FBZixFQUFrQixDQUFsQixDQUFULENBQUE7RUFDQSxNQUFLQyxJQUFBQSxDQUFBQSxDQUFMLEdBQVNpSSxJQUFJLENBQUN6RCxTQUFMLENBQWV4RSxDQUFmLEVBQWtCLElBQUtELENBQUFBLENBQXZCLENBQVQsQ0FBQTtFQUNBLE1BQUsrTCxJQUFBQSxDQUFBQSxNQUFMLEdBQWM3RCxJQUFJLENBQUN6RCxTQUFMLENBQWVzSCxNQUFmLEVBQXVCLEtBQXZCLENBQWQsQ0FBQTtFQUNELEtBQUE7RUFDRixHQUFBOzs7O1dBRURpTCxXQUFBLFNBQVNuTCxRQUFBQSxDQUFBQSxLQUFULEVBQXdCO0VBQUEsSUFBQSxJQUFmQSxLQUFlLEtBQUEsS0FBQSxDQUFBLEVBQUE7RUFBZkEsTUFBQUEsS0FBZSxHQUFQLEtBQU8sQ0FBQTtFQUFBLEtBQUE7O0VBQ3RCLElBQUksSUFBQSxJQUFBLENBQUtoSCxPQUFULEVBQWtCO0VBQ2hCLE1BQUEsT0FBT3FELElBQUksQ0FBQzdDLGdCQUFMLENBQXNCLElBQUEsQ0FBS3JGLENBQTNCLENBQVAsQ0FBQTtFQUNELEtBRkQsTUFFTztFQUNMLE1BQUksSUFBQSxDQUFDLElBQUsrTCxDQUFBQSxNQUFWLEVBQWtCO0VBQ2hCLFFBQU9ULE9BQUFBLFFBQVEsQ0FBQ00sVUFBVCxDQUFvQixJQUFBLENBQUs1TCxDQUF6QixFQUE0QixJQUFLQyxDQUFBQSxDQUFqQyxFQUFvQzRMLEtBQXBDLENBQVAsQ0FBQTtFQUNELE9BRkQsTUFFTztFQUNMLFFBQU9QLE9BQUFBLFFBQVEsQ0FBQ1EsY0FBVCxDQUF3QixJQUFBLENBQUs5TCxDQUE3QixFQUFnQyxJQUFLQyxDQUFBQSxDQUFyQyxFQUF3QzRMLEtBQXhDLENBQVAsQ0FBQTtFQUNELE9BQUE7RUFDRixLQUFBO0VBQ0YsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztFQUNTb0wsRUFBQUEsSUFBQUEsQ0FBQUEsZUFBUCxTQUFvQmpYLFlBQUFBLENBQUFBLENBQXBCLEVBQXVCQyxDQUF2QixFQUEwQlYsQ0FBMUIsRUFBNkI7RUFDM0IsSUFBSVMsSUFBQUEsQ0FBQyxZQUFZd1EsSUFBakIsRUFBdUI7RUFDckIsTUFBQSxPQUFPeFEsQ0FBUCxDQUFBO0VBQ0QsS0FGRCxNQUVPO0VBQ0wsTUFBSUMsSUFBQUEsQ0FBQyxLQUFLMkUsU0FBVixFQUFxQjtFQUNuQixRQUFBLE9BQU8sSUFBSTRMLElBQUosQ0FBU3hRLENBQVQsQ0FBUCxDQUFBO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsUUFBSVQsSUFBQUEsQ0FBQyxLQUFLcUYsU0FBVixFQUFxQixPQUFPLElBQUk0TCxJQUFKLENBQVN4USxDQUFULEVBQVlDLENBQVosQ0FBUCxDQUFyQixLQUNLLE9BQU8sSUFBSXVRLElBQUosQ0FBU3hRLENBQVQsRUFBWUMsQ0FBWixFQUFlVixDQUFmLENBQVAsQ0FBQTtFQUNOLE9BQUE7RUFDRixLQUFBO0VBQ0YsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7U0FDU2tSLGVBQVAsU0FBb0J5RyxZQUFBQSxDQUFBQSxHQUFwQixFQUF5QjtFQUN2QixJQUFPQSxPQUFBQSxHQUFHLFlBQVkxRyxJQUFmLEdBQXNCMEcsR0FBRyxDQUFDRixRQUFKLEVBQXRCLEdBQXVDRSxHQUE5QyxDQUFBO0VBQ0Q7Ozs7O01DL0RrQkM7OztFQUNuQixFQUFBLFNBQUEsU0FBQSxDQUFZbE4sS0FBWixFQUFtQjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ2pCLElBQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBO0VBQ0EsSUFBQSxLQUFBLENBQUttTixJQUFMLEdBQVlsUCxJQUFJLENBQUM5QyxPQUFMLENBQWE2RSxLQUFiLENBQVosQ0FBQTtFQUZpQixJQUFBLE9BQUEsS0FBQSxDQUFBO0VBR2xCLEdBQUE7Ozs7RUFFRCtNLEVBQUFBLE1BQUFBLENBQUFBLFdBQUEsU0FBVyxRQUFBLEdBQUE7RUFDVCxJQUFNcFUsSUFBQUEsR0FBRyxHQUFHc0YsSUFBSSxDQUFDN0MsZ0JBQUwsQ0FBc0IsSUFBQSxDQUFLK1IsSUFBM0IsQ0FBWixDQUFBO0VBQ0EsSUFBQSxPQUFPeFUsR0FBRyxLQUFLLFFBQVIsSUFBb0JBLEdBQUcsS0FBSyxRQUE1QixHQUF1QzBJLFFBQVEsQ0FBQ1csV0FBVCxFQUF2QyxHQUFnRXJKLEdBQXZFLENBQUE7RUFDRCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O2NBQ1N5VSxrQkFBUCxTQUF1QmxTLGVBQUFBLENBQUFBLEdBQXZCLEVBQTRCO0VBQzFCLElBQUEsSUFBSSxDQUFDQSxHQUFMLEVBQVUsT0FBTyxJQUFQLENBQUE7RUFFVixJQUFBLElBQUlBLEdBQUcsWUFBWWdTLFNBQW5CLEVBQThCLE9BQU9oUyxHQUFQLENBQTlCLEtBQ0ssT0FBTyxJQUFJZ1MsU0FBSixDQUFjaFMsR0FBZCxDQUFQLENBQUE7RUFDTjs7O0lBM0JvQ3FMOztNQ0psQjhHO0VBQ25CLEVBQUEsU0FBQSxTQUFBLENBQVlsVixDQUFaLEVBQWVDLENBQWYsRUFBa0JzUSxDQUFsQixFQUFxQjBDLENBQXJCLEVBQXdCO0VBQ3RCLElBQUtqVCxJQUFBQSxDQUFBQSxDQUFMLEdBQVNBLENBQVQsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLENBQUwsR0FBU0EsQ0FBVCxDQUFBO0VBRUEsSUFBS2YsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhcVIsQ0FBYixDQUFBO0VBQ0EsSUFBS3BSLElBQUFBLENBQUFBLE1BQUwsR0FBYzhULENBQWQsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLa0MsTUFBTCxHQUFjLElBQUEsQ0FBS2xWLENBQUwsR0FBUyxLQUFLZCxNQUE1QixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtpVyxLQUFMLEdBQWEsSUFBQSxDQUFLcFYsQ0FBTCxHQUFTLEtBQUtkLEtBQTNCLENBQUE7RUFDRCxHQUFBOzs7O0VBRURtVyxFQUFBQSxNQUFBQSxDQUFBQSxXQUFBLFNBQUEsUUFBQSxDQUFTclYsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7RUFDYixJQUFJRCxJQUFBQSxDQUFDLElBQUksSUFBQSxDQUFLb1YsS0FBVixJQUFtQnBWLENBQUMsSUFBSSxJQUFBLENBQUtBLENBQTdCLElBQWtDQyxDQUFDLElBQUksS0FBS2tWLE1BQTVDLElBQXNEbFYsQ0FBQyxJQUFJLElBQUtBLENBQUFBLENBQXBFLEVBQXVFLE9BQU8sSUFBUCxDQUF2RSxLQUNLLE9BQU8sS0FBUCxDQUFBO0VBQ047Ozs7O01DWmtCcVY7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLEVBQVlDLFNBQUFBLElBQUFBLENBQUFBLE1BQVosRUFBb0JDLE9BQXBCLEVBQTZCO0VBQzNCLElBQUEsSUFBQSxDQUFLQyxNQUFMLEdBQWNySCxNQUFJLENBQUN5RyxZQUFMLENBQWtCL08sSUFBSSxDQUFDekQsU0FBTCxDQUFla1QsTUFBZixFQUF1QixDQUF2QixDQUFsQixDQUFkLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0csT0FBTCxHQUFldEgsTUFBSSxDQUFDeUcsWUFBTCxDQUFrQi9PLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW1ULE9BQWYsRUFBd0IsQ0FBeEIsQ0FBbEIsQ0FBZixDQUFBO0VBRUEsSUFBS0csSUFBQUEsQ0FBQUEsU0FBTCxHQUFpQixDQUFqQixDQUFBO0VBQ0EsSUFBS0MsSUFBQUEsQ0FBQUEsUUFBTCxHQUFnQixDQUFoQixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUszSixJQUFMLEVBQUEsQ0FBQTtFQUNELEdBQUE7Ozs7RUFFREEsRUFBQUEsTUFBQUEsQ0FBQUEsT0FBQSxTQUFPLElBQUEsR0FBQTtFQUNMLElBQUswSixJQUFBQSxDQUFBQSxTQUFMLEdBQWlCLENBQWpCLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0MsUUFBTCxHQUFnQixJQUFBLENBQUtGLE9BQUwsQ0FBYWQsUUFBYixFQUFoQixDQUFBO0VBQ0Q7O1dBRURBLFdBQUEsU0FBU25LLFFBQUFBLENBQUFBLElBQVQsRUFBZTtFQUNiLElBQUtrTCxJQUFBQSxDQUFBQSxTQUFMLElBQWtCbEwsSUFBbEIsQ0FBQTs7RUFFQSxJQUFBLElBQUksSUFBS2tMLENBQUFBLFNBQUwsSUFBa0IsSUFBQSxDQUFLQyxRQUEzQixFQUFxQztFQUNuQyxNQUFLRCxJQUFBQSxDQUFBQSxTQUFMLEdBQWlCLENBQWpCLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS0MsUUFBTCxHQUFnQixJQUFBLENBQUtGLE9BQUwsQ0FBYWQsUUFBYixFQUFoQixDQUFBOztFQUVBLE1BQUEsSUFBSSxLQUFLYSxNQUFMLENBQVk1WCxDQUFaLEtBQWtCLENBQXRCLEVBQXlCO0VBQ3ZCLFFBQUEsSUFBSSxJQUFLNFgsQ0FBQUEsTUFBTCxDQUFZYixRQUFaLENBQXFCLEtBQXJCLENBQUEsR0FBOEIsR0FBbEMsRUFBdUMsT0FBTyxDQUFQLENBQXZDLEtBQ0ssT0FBTyxDQUFQLENBQUE7RUFDTixPQUhELE1BR087RUFDTCxRQUFBLE9BQU8sS0FBS2EsTUFBTCxDQUFZYixRQUFaLENBQXFCLElBQXJCLENBQVAsQ0FBQTtFQUNELE9BQUE7RUFDRixLQUFBOztFQUVELElBQUEsT0FBTyxDQUFQLENBQUE7RUFDRDs7Ozs7TUM3Q2tCaUI7Ozs7O1dBQ25COUgsUUFBQSxTQUFRLEtBQUEsR0FBQTs7RUFFUjlCLEVBQUFBLE1BQUFBLENBQUFBLE9BQUEsU0FBQSxJQUFBLENBQUt2RixPQUFMLEVBQWNrRSxRQUFkLEVBQXdCO0VBQ3RCLElBQUEsSUFBSUEsUUFBSixFQUFjO0VBQ1osTUFBS2lJLElBQUFBLENBQUFBLFVBQUwsQ0FBZ0JqSSxRQUFoQixDQUFBLENBQUE7RUFDRCxLQUZELE1BRU87RUFDTCxNQUFLaUksSUFBQUEsQ0FBQUEsVUFBTCxDQUFnQm5NLE9BQWhCLENBQUEsQ0FBQTtFQUNELEtBQUE7RUFDRjs7O0VBR0RtTSxFQUFBQSxNQUFBQSxDQUFBQSxhQUFBLFNBQUEsVUFBQSxDQUFXOVEsTUFBWCxFQUFtQjs7Ozs7TUNUQStUOzs7RUFDbkIsRUFBQSxTQUFBLElBQUEsQ0FBWWxZLENBQVosRUFBZUMsQ0FBZixFQUFrQlYsQ0FBbEIsRUFBcUI7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUNuQixJQUFBLEtBQUEsR0FBQSxXQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQTtFQUVBLElBQUs0WSxLQUFBQSxDQUFBQSxPQUFMLEdBQWUzSCxNQUFJLENBQUN5RyxZQUFMLENBQWtCalgsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCVixDQUF4QixDQUFmLENBQUE7RUFDQSxJQUFLa0ssS0FBQUEsQ0FBQUEsSUFBTCxHQUFZLE1BQVosQ0FBQTtFQUptQixJQUFBLE9BQUEsS0FBQSxDQUFBO0VBS3BCLEdBQUE7Ozs7V0FFRHdMLGFBQUEsU0FBVzlRLFVBQUFBLENBQUFBLE1BQVgsRUFBbUI7RUFDakIsSUFBSSxJQUFBLElBQUEsQ0FBS2dVLE9BQUwsQ0FBYW5ZLENBQWIsS0FBbUJxTCxRQUF2QixFQUFpQ2xILE1BQU0sQ0FBQytQLElBQVAsR0FBYzdJLFFBQWQsQ0FBakMsS0FDS2xILE1BQU0sQ0FBQytQLElBQVAsR0FBYyxJQUFLaUUsQ0FBQUEsT0FBTCxDQUFhbkIsUUFBYixFQUFkLENBQUE7RUFDTjs7O0lBWCtCaUI7O01DRGJHO0VBQ25CLEVBQWMsU0FBQSxJQUFBLEdBQUE7RUFDWixJQUFLQyxJQUFBQSxDQUFBQSxNQUFMLEdBQWMsSUFBSWhHLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQWQsQ0FBQTtFQUNBLElBQUs5TSxJQUFBQSxDQUFBQSxNQUFMLEdBQWMsQ0FBZCxDQUFBO0VBQ0EsSUFBSytTLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsTUFBakIsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLEtBQUwsR0FBYSxJQUFiLENBQUE7RUFDRCxHQUFBOzs7O1dBRURDLGNBQUEsU0FBYyxXQUFBLEdBQUE7O0VBRWRDLEVBQUFBLE1BQUFBLENBQUFBLFdBQUEsU0FBQSxRQUFBLENBQVN6TCxRQUFULEVBQW1COztFQUVuQjNHLEVBQUFBLE1BQUFBLENBQUFBLFVBQUEsU0FBVSxPQUFBLEdBQUE7RUFDUixJQUFLZ1MsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNEOzs7OztNQ2RrQks7OztFQUNuQixFQUFZdFcsU0FBQUEsU0FBQUEsQ0FBQUEsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDaEIsSUFBQSxLQUFBLEdBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLRCxLQUFBQSxDQUFBQSxDQUFMLEdBQVNBLENBQVQsQ0FBQTtFQUNBLElBQUtDLEtBQUFBLENBQUFBLENBQUwsR0FBU0EsQ0FBVCxDQUFBO0VBSmdCLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLakIsR0FBQTs7OztFQUVEbVcsRUFBQUEsTUFBQUEsQ0FBQUEsY0FBQSxTQUFjLFdBQUEsR0FBQTtFQUNaLElBQUEsSUFBQSxDQUFLSCxNQUFMLENBQVlqVyxDQUFaLEdBQWdCLEtBQUtBLENBQXJCLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS2lXLE1BQUwsQ0FBWWhXLENBQVosR0FBZ0IsS0FBS0EsQ0FBckIsQ0FBQTtFQUVBLElBQUEsT0FBTyxLQUFLZ1csTUFBWixDQUFBO0VBQ0Q7O1dBRURJLFdBQUEsU0FBU3pMLFFBQUFBLENBQUFBLFFBQVQsRUFBbUI7RUFDakIsSUFBSSxJQUFBLElBQUEsQ0FBS3VMLEtBQVQsRUFBZ0I7RUFDZEksTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsb0RBQWQsQ0FBQSxDQUFBO0VBQ0EsTUFBS0wsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhLEtBQWIsQ0FBQTtFQUNELEtBQUE7RUFDRjs7O0lBcEJvQ0g7O01DRWxCUzs7O0VBQ25CLEVBQUEsU0FBQSxRQUFBLENBQVlDLElBQVosRUFBa0I7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUNoQixJQUFBLEtBQUEsR0FBQSxXQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQTtFQUNBLElBQUtBLEtBQUFBLENBQUFBLElBQUwsR0FBWTVRLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXFVLElBQWYsRUFBcUIsSUFBSUosU0FBSixFQUFyQixDQUFaLENBQUE7RUFDQSxJQUFLalAsS0FBQUEsQ0FBQUEsSUFBTCxHQUFZLFVBQVosQ0FBQTtFQUhnQixJQUFBLE9BQUEsS0FBQSxDQUFBO0VBSWpCLEdBQUE7Ozs7V0FFRDBHLFFBQUEsU0FBTTJJLEtBQUFBLENBQUFBLElBQU4sRUFBWTtFQUNWLElBQUtBLElBQUFBLENBQUFBLElBQUwsR0FBWTVRLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXFVLElBQWYsRUFBcUIsSUFBSUosU0FBSixFQUFyQixDQUFaLENBQUE7RUFDRDs7V0FFRHpELGFBQUEsU0FBVzlRLFVBQUFBLENBQUFBLE1BQVgsRUFBbUI7RUFDakIsSUFBSzJVLElBQUFBLENBQUFBLElBQUwsQ0FBVU4sV0FBVixFQUFBLENBQUE7RUFFQXJVLElBQUFBLE1BQU0sQ0FBQ3VELENBQVAsQ0FBU3RGLENBQVQsR0FBYSxJQUFBLENBQUswVyxJQUFMLENBQVVULE1BQVYsQ0FBaUJqVyxDQUE5QixDQUFBO0VBQ0ErQixJQUFBQSxNQUFNLENBQUN1RCxDQUFQLENBQVNyRixDQUFULEdBQWEsSUFBQSxDQUFLeVcsSUFBTCxDQUFVVCxNQUFWLENBQWlCaFcsQ0FBOUIsQ0FBQTtFQUNEOzs7SUFoQm1DNFY7O01DR2pCYzs7O0VBQ25CLEVBQUEsU0FBQSxRQUFBLENBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCcFMsSUFBMUIsRUFBZ0M7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUM5QixJQUFBLEtBQUEsR0FBQSxXQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQTtFQUVBLElBQUEsS0FBQSxDQUFLcVMsSUFBTCxHQUFZMUksTUFBSSxDQUFDeUcsWUFBTCxDQUFrQitCLElBQWxCLENBQVosQ0FBQTtFQUNBLElBQUEsS0FBQSxDQUFLRyxNQUFMLEdBQWMzSSxNQUFJLENBQUN5RyxZQUFMLENBQWtCZ0MsTUFBbEIsQ0FBZCxDQUFBO0VBQ0EsSUFBS3BTLEtBQUFBLENBQUFBLElBQUwsR0FBWXFCLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW9DLElBQWYsRUFBcUIsUUFBckIsQ0FBWixDQUFBO0VBRUEsSUFBSzRDLEtBQUFBLENBQUFBLElBQUwsR0FBWSxVQUFaLENBQUE7RUFQOEIsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQVEvQixHQUFBOzs7O0VBRUQwRyxFQUFBQSxNQUFBQSxDQUFBQSxRQUFBLFNBQU02SSxLQUFBQSxDQUFBQSxJQUFOLEVBQVlDLE1BQVosRUFBb0JwUyxJQUFwQixFQUEwQjtFQUN4QixJQUFBLElBQUEsQ0FBS3FTLElBQUwsR0FBWTFJLE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0IrQixJQUFsQixDQUFaLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0csTUFBTCxHQUFjM0ksTUFBSSxDQUFDeUcsWUFBTCxDQUFrQmdDLE1BQWxCLENBQWQsQ0FBQTtFQUNBLElBQUtwUyxJQUFBQSxDQUFBQSxJQUFMLEdBQVlxQixJQUFJLENBQUN6RCxTQUFMLENBQWVvQyxJQUFmLEVBQXFCLFFBQXJCLENBQVosQ0FBQTtFQUNEOztXQUVEdVMsb0JBQUEsU0FBa0JDLGlCQUFBQSxDQUFBQSxFQUFsQixFQUFzQjtFQUNwQixJQUFBLE9BQU9BLEVBQUUsR0FBRzdMLE1BQU0sQ0FBQ2tDLE9BQW5CLENBQUE7RUFDRDs7V0FFRHVGLGFBQUEsU0FBVzlRLFVBQUFBLENBQUFBLE1BQVgsRUFBbUI7RUFDakIsSUFBQSxJQUFJLElBQUswQyxDQUFBQSxJQUFMLEtBQWMsR0FBZCxJQUFxQixJQUFLQSxDQUFBQSxJQUFMLEtBQWMsR0FBbkMsSUFBMEMsSUFBQSxDQUFLQSxJQUFMLEtBQWMsT0FBNUQsRUFBcUU7RUFDbkUsTUFBTXlTLElBQUFBLE9BQU8sR0FBRyxJQUFJekQsT0FBSixDQUNkLElBQUt1RCxDQUFBQSxpQkFBTCxDQUF1QixJQUFBLENBQUtGLElBQUwsQ0FBVWxDLFFBQVYsRUFBdkIsQ0FEYyxFQUVkLElBQUEsQ0FBS21DLE1BQUwsQ0FBWW5DLFFBQVosRUFBeUIxTCxHQUFBQSxRQUFRLENBQUNHLE1BRnBCLENBQWhCLENBQUE7RUFLQXRILE1BQUFBLE1BQU0sQ0FBQ2lKLENBQVAsQ0FBU2hMLENBQVQsR0FBYWtYLE9BQU8sQ0FBQ3BELElBQVIsRUFBYixDQUFBO0VBQ0EvUixNQUFBQSxNQUFNLENBQUNpSixDQUFQLENBQVMvSyxDQUFULEdBQWFpWCxPQUFPLENBQUNuRCxJQUFSLEVBQWIsQ0FBQTtFQUNELEtBUkQsTUFRTztFQUNMaFMsTUFBQUEsTUFBTSxDQUFDaUosQ0FBUCxDQUFTaEwsQ0FBVCxHQUFhLElBQUEsQ0FBS2dYLGlCQUFMLENBQXVCLElBQUtGLENBQUFBLElBQUwsQ0FBVWxDLFFBQVYsRUFBdkIsQ0FBYixDQUFBO0VBQ0E3UyxNQUFBQSxNQUFNLENBQUNpSixDQUFQLENBQVMvSyxDQUFULEdBQWEsSUFBQSxDQUFLK1csaUJBQUwsQ0FBdUIsSUFBS0QsQ0FBQUEsTUFBTCxDQUFZbkMsUUFBWixFQUF2QixDQUFiLENBQUE7RUFDRCxLQUFBO0VBQ0Y7OztJQWxDbUNpQjs7TUNKakJzQjs7O0VBQ25CLEVBQUEsU0FBQSxJQUFBLENBQVl2WixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLENBQWxCLEVBQXFCO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDbkIsSUFBQSxLQUFBLEdBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxJQUFBLENBQUE7RUFDQSxJQUFLaWEsS0FBQUEsQ0FBQUEsT0FBTCxHQUFlaEosTUFBSSxDQUFDeUcsWUFBTCxDQUFrQmpYLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QlYsQ0FBeEIsQ0FBZixDQUFBO0VBQ0EsSUFBS2tLLEtBQUFBLENBQUFBLElBQUwsR0FBWSxNQUFaLENBQUE7RUFIbUIsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQUlwQixHQUFBOzs7O1dBRUR3TCxhQUFBLFNBQVc5USxVQUFBQSxDQUFBQSxNQUFYLEVBQW1CO0VBQ2pCQSxJQUFBQSxNQUFNLENBQUNtSixJQUFQLEdBQWMsS0FBS2tNLE9BQUwsQ0FBYXhDLFFBQWIsRUFBZCxDQUFBO0VBQ0Q7OztJQVQrQmlCOztNQ0Fid0I7OztFQUNuQixFQUFBLFNBQUEsTUFBQSxDQUFZelosQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixDQUFsQixFQUFxQjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ25CLElBQUEsS0FBQSxHQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBO0VBQ0EsSUFBS2dWLEtBQUFBLENBQUFBLE1BQUwsR0FBYy9ELE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0JqWCxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JWLENBQXhCLENBQWQsQ0FBQTtFQUVBLElBQUtrSyxLQUFBQSxDQUFBQSxJQUFMLEdBQVksUUFBWixDQUFBO0VBSm1CLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLcEIsR0FBQTs7OztFQUVEMEcsRUFBQUEsTUFBQUEsQ0FBQUEsUUFBQSxTQUFNblEsS0FBQUEsQ0FBQUEsQ0FBTixFQUFTQyxDQUFULEVBQVlWLENBQVosRUFBZTtFQUNiLElBQUtnVixJQUFBQSxDQUFBQSxNQUFMLEdBQWMvRCxNQUFJLENBQUN5RyxZQUFMLENBQWtCalgsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCVixDQUF4QixDQUFkLENBQUE7RUFDRDs7V0FFRDBWLGFBQUEsU0FBV2pJLFVBQUFBLENBQUFBLFFBQVgsRUFBcUI7RUFDbkJBLElBQUFBLFFBQVEsQ0FBQ3VILE1BQVQsR0FBa0IsS0FBS0EsTUFBTCxDQUFZeUMsUUFBWixFQUFsQixDQUFBO0VBQ0FoSyxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWM0RixTQUFkLEdBQTBCMU0sUUFBUSxDQUFDdUgsTUFBbkMsQ0FBQTtFQUNEOzs7SUFmaUMwRDs7TUNDZjBCOzs7RUFDbkIsRUFBQSxTQUFBLElBQUEsQ0FBWXJXLEtBQVosRUFBbUJxUCxDQUFuQixFQUFzQjBDLENBQXRCLEVBQXlCO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDdkIsSUFBQSxLQUFBLEdBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFBLEtBQUEsQ0FBSy9SLEtBQUwsR0FBYSxLQUFBLENBQUsyVCxZQUFMLENBQWtCM1QsS0FBbEIsQ0FBYixDQUFBO0VBQ0EsSUFBS3FQLEtBQUFBLENBQUFBLENBQUwsR0FBU3pLLElBQUksQ0FBQ3pELFNBQUwsQ0FBZWtPLENBQWYsRUFBa0IsRUFBbEIsQ0FBVCxDQUFBO0VBQ0EsSUFBSzBDLEtBQUFBLENBQUFBLENBQUwsR0FBU25OLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTRRLENBQWYsRUFBa0IsS0FBSzFDLENBQUFBLENBQXZCLENBQVQsQ0FBQTtFQUNBLElBQUtsSixLQUFBQSxDQUFBQSxJQUFMLEdBQVksTUFBWixDQUFBO0VBTnVCLElBQUEsT0FBQSxLQUFBLENBQUE7RUFPeEIsR0FBQTs7OztXQUVEd0wsYUFBQSxTQUFXakksVUFBQUEsQ0FBQUEsUUFBWCxFQUFxQjtFQUNuQixJQUFBLElBQU00TSxXQUFXLEdBQUcsSUFBQSxDQUFLdFcsS0FBTCxDQUFXMFQsUUFBWCxFQUFwQixDQUFBOztFQUVBLElBQUEsSUFBSSxPQUFPNEMsV0FBUCxLQUF1QixRQUEzQixFQUFxQztFQUNuQzVNLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0I7RUFDZHRILFFBQUFBLEtBQUssRUFBRSxJQUFBLENBQUtxUixDQURFO0VBRWRwUixRQUFBQSxNQUFNLEVBQUUsSUFBQSxDQUFLOFQsQ0FGQztFQUdkdFIsUUFBQUEsR0FBRyxFQUFFNlYsV0FIUztFQUlkMVMsUUFBQUEsT0FBTyxFQUFFLElBSks7RUFLZDJTLFFBQUFBLEtBQUssRUFBRSxJQUFBO0VBTE8sT0FBaEIsQ0FBQTtFQU9ELEtBUkQsTUFRTztFQUNMN00sTUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxHQUFnQmdSLFdBQWhCLENBQUE7RUFDRCxLQUFBO0VBQ0Y7O1dBRUQzQyxlQUFBLFNBQWEzVCxZQUFBQSxDQUFBQSxLQUFiLEVBQW9CO0VBQ2xCLElBQU9BLE9BQUFBLEtBQUssWUFBWTZULFNBQWpCLEdBQTZCN1QsS0FBN0IsR0FBcUMsSUFBSTZULFNBQUosQ0FBYzdULEtBQWQsQ0FBNUMsQ0FBQTtFQUNEOzs7SUE1QitCMlU7O01DQWI2QjtFQUduQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLEVBQVk1RixTQUFBQSxTQUFBQSxDQUFBQSxJQUFaLEVBQWtCTyxNQUFsQixFQUEwQjtFQUN4QixJQUFLUCxJQUFBQSxDQUFBQSxJQUFMLEdBQVloTSxJQUFJLENBQUN6RCxTQUFMLENBQWV5UCxJQUFmLEVBQXFCN0ksUUFBckIsQ0FBWixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtvSixNQUFMLEdBQWNyQyxJQUFJLENBQUNELFNBQUwsQ0FBZXNDLE1BQWYsQ0FBZCxDQUFBO0VBRUEsSUFBS04sSUFBQUEsQ0FBQUEsR0FBTCxHQUFXLENBQVgsQ0FBQTtFQUNBLElBQUtHLElBQUFBLENBQUFBLE1BQUwsR0FBYyxDQUFkLENBQUE7RUFDQSxJQUFLRixJQUFBQSxDQUFBQSxJQUFMLEdBQVksS0FBWixDQUFBO0VBQ0EsSUFBS1ksSUFBQUEsQ0FBQUEsT0FBTCxHQUFlLEVBQWYsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLM1QsRUFBTCxHQUFBLFlBQUEsR0FBdUJ5WSxTQUFTLENBQUN6WSxFQUFWLEVBQXZCLENBQUE7RUFDQSxJQUFLb0ksSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLFdBQVosQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7RUFDRTBHLEVBQUFBLE1BQUFBLENBQUFBLFFBQUEsU0FBQSxLQUFBLENBQU0rRCxJQUFOLEVBQVlPLE1BQVosRUFBb0I7RUFDbEIsSUFBS1AsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZaE0sSUFBSSxDQUFDekQsU0FBTCxDQUFleVAsSUFBZixFQUFxQjdJLFFBQXJCLENBQVosQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLb0osTUFBTCxHQUFjckMsSUFBSSxDQUFDRCxTQUFMLENBQWVzQyxNQUFmLENBQWQsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFc0YsaUJBQUEsU0FBZUMsY0FBQUEsQ0FBQUEsS0FBZixFQUFzQjtFQUNwQixJQUFBLE9BQU9BLEtBQUssQ0FBQzNNLGNBQU4sQ0FBcUJHLE1BQU0sQ0FBQ2tDLE9BQTVCLENBQVAsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFdUssaUJBQUEsU0FBZXZWLGNBQUFBLENBQUFBLEtBQWYsRUFBc0I7RUFDcEIsSUFBQSxPQUFPQSxLQUFLLEdBQUc4SSxNQUFNLENBQUNrQyxPQUF0QixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0V1RixFQUFBQSxNQUFBQSxDQUFBQSxhQUFBLFNBQUEsVUFBQSxDQUFXakksUUFBWCxFQUFxQixFQUFFO0VBRXZCO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztFQUNFTCxFQUFBQSxNQUFBQSxDQUFBQSxZQUFBLFNBQVVLLFNBQUFBLENBQUFBLFFBQVYsRUFBb0JILElBQXBCLEVBQTBCMEIsS0FBMUIsRUFBaUM7RUFDL0IsSUFBSzRGLElBQUFBLENBQUFBLEdBQUwsSUFBWXRILElBQVosQ0FBQTs7RUFFQSxJQUFJLElBQUEsSUFBQSxDQUFLc0gsR0FBTCxJQUFZLElBQUEsQ0FBS0QsSUFBakIsSUFBeUIsSUFBQSxDQUFLRSxJQUFsQyxFQUF3QztFQUN0QyxNQUFLRSxJQUFBQSxDQUFBQSxNQUFMLEdBQWMsQ0FBZCxDQUFBO0VBQ0EsTUFBS0YsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLElBQVosQ0FBQTtFQUNBLE1BQUEsSUFBQSxDQUFLL04sT0FBTCxFQUFBLENBQUE7RUFDRCxLQUpELE1BSU87RUFDTCxNQUFBLElBQU0vRCxLQUFLLEdBQUcsSUFBS21TLENBQUFBLE1BQUwsQ0FBWXpILFFBQVEsQ0FBQ21ILEdBQVQsR0FBZW5ILFFBQVEsQ0FBQ2tILElBQXBDLENBQWQsQ0FBQTtFQUNBLE1BQUtJLElBQUFBLENBQUFBLE1BQUwsR0FBYzlVLElBQUksQ0FBQ29WLEdBQUwsQ0FBUyxDQUFJdFMsR0FBQUEsS0FBYixFQUFvQixDQUFwQixDQUFkLENBQUE7RUFDRCxLQUFBO0VBQ0YsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztFQUNFdVMsRUFBQUEsTUFBQUEsQ0FBQUEsaUJBQUEsU0FBZTdILGNBQUFBLENBQUFBLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsRUFBc0M7RUFDcEMsSUFBQSxJQUFBLENBQUs1QixTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsQ0FBQSxDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRWxJLEVBQUFBLE1BQUFBLENBQUFBLFVBQUEsU0FBVSxPQUFBLEdBQUE7RUFDUixJQUFBLElBQUlwSCxDQUFDLEdBQUcsSUFBSytWLENBQUFBLE9BQUwsQ0FBYWpXLE1BQXJCLENBQUE7O0VBQ0EsSUFBT0UsT0FBQUEsQ0FBQyxFQUFSLEVBQVk7RUFDVixNQUFBLElBQUEsQ0FBSytWLE9BQUwsQ0FBYS9WLENBQWIsQ0FBZ0JrVyxDQUFBQSxlQUFoQixDQUFnQyxJQUFoQyxDQUFBLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUEsSUFBQSxDQUFLSCxPQUFMLENBQWFqVyxNQUFiLEdBQXNCLENBQXRCLENBQUE7RUFDRDs7Ozs7RUE1SWtCK2EsVUFDWnpZLEtBQUs7O01DRk82WTs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsRUFBQSxTQUFBLEtBQUEsQ0FBWUMsRUFBWixFQUFnQkMsRUFBaEIsRUFBb0JsRyxJQUFwQixFQUEwQk8sTUFBMUIsRUFBa0M7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUNoQyxJQUFNUCxLQUFBQSxHQUFBQSxVQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxJQUFBQSxFQUFBQSxJQUFOLEVBQVlPLE1BQVosQ0FBQSxJQUFBLElBQUEsQ0FBQTtFQUVBLElBQUEsS0FBQSxDQUFLdUYsS0FBTCxHQUFhLEtBQUtELENBQUFBLGNBQUwsQ0FBb0IsSUFBSTFILFFBQUosQ0FBYThILEVBQWIsRUFBaUJDLEVBQWpCLENBQXBCLENBQWIsQ0FBQTtFQUNBLElBQUszUSxLQUFBQSxDQUFBQSxJQUFMLEdBQVksT0FBWixDQUFBO0VBSmdDLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLakMsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsZUFBTWdLLEVBQU4sRUFBVUMsRUFBVixFQUFjbEcsSUFBZCxFQUFvQk8sTUFBcEIsRUFBNEI7RUFDMUIsSUFBQSxJQUFBLENBQUt1RixLQUFMLEdBQWEsSUFBS0QsQ0FBQUEsY0FBTCxDQUFvQixJQUFJMUgsUUFBSixDQUFhOEgsRUFBYixFQUFpQkMsRUFBakIsQ0FBcEIsQ0FBYixDQUFBO0VBRUFsRyxJQUFBQSxJQUFJLElBQVUvRCxVQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUosQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRUksRUFBQUEsTUFBQUEsQ0FBQUEsaUJBQUEsU0FBZTdILGNBQUFBLENBQUFBLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsRUFBc0M7RUFDcEMsSUFBQSxJQUFBLENBQUs1QixTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsQ0FBQSxDQUFBO0VBQ0F2QixJQUFBQSxRQUFRLENBQUNoTixDQUFULENBQVc2SSxHQUFYLENBQWUsS0FBS21SLEtBQXBCLENBQUEsQ0FBQTtFQUNEOzs7SUFyRGdDRjs7TUNDZE87OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFZQyxTQUFBQSxVQUFBQSxDQUFBQSxjQUFaLEVBQTRCTixLQUE1QixFQUFtQ3pGLE1BQW5DLEVBQTJDTCxJQUEzQyxFQUFpRE8sTUFBakQsRUFBeUQ7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUN2RCxJQUFNUCxLQUFBQSxHQUFBQSxVQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxJQUFBQSxFQUFBQSxJQUFOLEVBQVlPLE1BQVosQ0FBQSxJQUFBLElBQUEsQ0FBQTtFQUVBLElBQUs2RixLQUFBQSxDQUFBQSxjQUFMLEdBQXNCcFMsSUFBSSxDQUFDekQsU0FBTCxDQUFlNlYsY0FBZixFQUErQixJQUFJakksUUFBSixFQUEvQixDQUF0QixDQUFBO0VBQ0EsSUFBS2tDLEtBQUFBLENBQUFBLE1BQUwsR0FBY3JNLElBQUksQ0FBQ3pELFNBQUwsQ0FBZThQLE1BQWYsRUFBdUIsSUFBdkIsQ0FBZCxDQUFBO0VBQ0EsSUFBQSxLQUFBLENBQUt5RixLQUFMLEdBQWE5UixJQUFJLENBQUN6RCxTQUFMLENBQWUsS0FBS3dWLENBQUFBLGNBQUwsQ0FBb0JELEtBQXBCLENBQWYsRUFBMkMsR0FBM0MsQ0FBYixDQUFBO0VBRUEsSUFBQSxLQUFBLENBQUtPLFFBQUwsR0FBZ0IsS0FBQSxDQUFLaEcsTUFBTCxHQUFjLE1BQUtBLE1BQW5DLENBQUE7RUFDQSxJQUFBLEtBQUEsQ0FBS2lHLGVBQUwsR0FBdUIsSUFBSW5JLFFBQUosRUFBdkIsQ0FBQTtFQUNBLElBQUtjLEtBQUFBLENBQUFBLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FBQTtFQUVBLElBQUsxSixLQUFBQSxDQUFBQSxJQUFMLEdBQVksWUFBWixDQUFBO0VBWHVELElBQUEsT0FBQSxLQUFBLENBQUE7RUFZeEQsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsU0FBTW1LLEtBQUFBLENBQUFBLGNBQU4sRUFBc0JOLEtBQXRCLEVBQTZCekYsTUFBN0IsRUFBcUNMLElBQXJDLEVBQTJDTyxNQUEzQyxFQUFtRDtFQUNqRCxJQUFLNkYsSUFBQUEsQ0FBQUEsY0FBTCxHQUFzQnBTLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTZWLGNBQWYsRUFBK0IsSUFBSWpJLFFBQUosRUFBL0IsQ0FBdEIsQ0FBQTtFQUNBLElBQUtrQyxJQUFBQSxDQUFBQSxNQUFMLEdBQWNyTSxJQUFJLENBQUN6RCxTQUFMLENBQWU4UCxNQUFmLEVBQXVCLElBQXZCLENBQWQsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLeUYsS0FBTCxHQUFhOVIsSUFBSSxDQUFDekQsU0FBTCxDQUFlLElBQUt3VixDQUFBQSxjQUFMLENBQW9CRCxLQUFwQixDQUFmLEVBQTJDLEdBQTNDLENBQWIsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLTyxRQUFMLEdBQWdCLElBQUEsQ0FBS2hHLE1BQUwsR0FBYyxLQUFLQSxNQUFuQyxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtpRyxlQUFMLEdBQXVCLElBQUluSSxRQUFKLEVBQXZCLENBQUE7RUFDQSxJQUFLYyxJQUFBQSxDQUFBQSxRQUFMLEdBQWdCLENBQWhCLENBQUE7RUFFQWUsSUFBQUEsSUFBSSxJQUFVL0QsVUFBQUEsQ0FBQUEsU0FBQUEsQ0FBQUEsS0FBVixZQUFnQitELElBQWhCLEVBQXNCTyxNQUF0QixDQUFKLENBQUE7RUFDRCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0VJLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQWU3SCxjQUFBQSxDQUFBQSxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLElBQUEsSUFBQSxDQUFLNUIsU0FBTCxDQUFlSyxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLENBQUEsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLaU0sZUFBTCxDQUFxQnJOLElBQXJCLENBQTBCLEtBQUttTixjQUEvQixDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0UsZUFBTCxDQUFxQjFILEdBQXJCLENBQXlCOUYsUUFBUSxDQUFDdEYsQ0FBbEMsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUt5TCxRQUFMLEdBQWdCLElBQUEsQ0FBS3FILGVBQUwsQ0FBcUJySCxRQUFyQixFQUFoQixDQUFBOztFQUVBLElBQUksSUFBQSxJQUFBLENBQUtBLFFBQUwsR0FBZ0IsT0FBaEIsSUFBMkIsS0FBS0EsUUFBTCxHQUFnQixJQUFLb0gsQ0FBQUEsUUFBcEQsRUFBOEQ7RUFDNUQsTUFBS0MsSUFBQUEsQ0FBQUEsZUFBTCxDQUFxQnBILFNBQXJCLEVBQUEsQ0FBQTtFQUNBLE1BQUtvSCxJQUFBQSxDQUFBQSxlQUFMLENBQXFCbk4sY0FBckIsQ0FBb0MsSUFBSSxJQUFLOEYsQ0FBQUEsUUFBTCxHQUFnQixJQUFBLENBQUtvSCxRQUE3RCxDQUFBLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS0MsZUFBTCxDQUFxQm5OLGNBQXJCLENBQW9DLEtBQUsyTSxLQUF6QyxDQUFBLENBQUE7RUFFQWhOLE1BQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBVzZJLEdBQVgsQ0FBZSxLQUFLMlIsZUFBcEIsQ0FBQSxDQUFBO0VBQ0QsS0FBQTtFQUNGOzs7SUEzRnFDVjs7TUNBbkJXOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsRUFBWUMsU0FBQUEsV0FBQUEsQ0FBQUEsTUFBWixFQUFvQkMsTUFBcEIsRUFBNEJDLEtBQTVCLEVBQW1DMUcsSUFBbkMsRUFBeUNPLE1BQXpDLEVBQWlEO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDL0MsSUFBTVAsS0FBQUEsR0FBQUEsVUFBQUEsQ0FBQUEsSUFBQUEsQ0FBQUEsSUFBQUEsRUFBQUEsSUFBTixFQUFZTyxNQUFaLENBQUEsSUFBQSxJQUFBLENBQUE7O0VBRUEsSUFBQSxLQUFBLENBQUt0RSxLQUFMLENBQVd1SyxNQUFYLEVBQW1CQyxNQUFuQixFQUEyQkMsS0FBM0IsQ0FBQSxDQUFBOztFQUNBLElBQUsvTixLQUFBQSxDQUFBQSxJQUFMLEdBQVksQ0FBWixDQUFBO0VBQ0EsSUFBS3BELEtBQUFBLENBQUFBLElBQUwsR0FBWSxhQUFaLENBQUE7RUFMK0MsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQU1oRCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLFNBQU11SyxLQUFBQSxDQUFBQSxNQUFOLEVBQWNDLE1BQWQsRUFBc0JDLEtBQXRCLEVBQTZCMUcsSUFBN0IsRUFBbUNPLE1BQW5DLEVBQTJDO0VBQ3pDLElBQUtvRyxJQUFBQSxDQUFBQSxPQUFMLEdBQWUsSUFBSXhJLFFBQUosQ0FBYXFJLE1BQWIsRUFBcUJDLE1BQXJCLENBQWYsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLRSxPQUFMLEdBQWUsSUFBQSxDQUFLZCxjQUFMLENBQW9CLElBQUEsQ0FBS2MsT0FBekIsQ0FBZixDQUFBO0VBQ0EsSUFBS0QsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhQSxLQUFiLENBQUE7RUFFQTFHLElBQUFBLElBQUksSUFBVS9ELFVBQUFBLENBQUFBLFNBQUFBLENBQUFBLEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSixDQUFBO0VBQ0Q7O1dBRURRLGFBQUEsU0FBV2pJLFVBQUFBLENBQUFBLFFBQVgsRUFBcUI7RUFDbkJBLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY2pILElBQWQsR0FBcUIsQ0FBckIsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRWdJLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQWU3SCxjQUFBQSxDQUFBQSxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLElBQUEsSUFBQSxDQUFLNUIsU0FBTCxDQUFlSyxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLENBQUEsQ0FBQTtFQUNBdkIsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjakgsSUFBZCxJQUFzQkEsSUFBdEIsQ0FBQTs7RUFFQSxJQUFJRyxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNqSCxJQUFkLElBQXNCLElBQUEsQ0FBSytOLEtBQS9CLEVBQXNDO0VBQ3BDNU4sTUFBQUEsUUFBUSxDQUFDaE4sQ0FBVCxDQUFXNlMsS0FBWCxDQUNFdkgsUUFBUSxDQUFDTSxVQUFULENBQW9CLENBQUMsSUFBS2lQLENBQUFBLE9BQUwsQ0FBYXpZLENBQWxDLEVBQXFDLElBQUt5WSxDQUFBQSxPQUFMLENBQWF6WSxDQUFsRCxDQURGLEVBRUVrSixRQUFRLENBQUNNLFVBQVQsQ0FBb0IsQ0FBQyxJQUFBLENBQUtpUCxPQUFMLENBQWF4WSxDQUFsQyxFQUFxQyxJQUFBLENBQUt3WSxPQUFMLENBQWF4WSxDQUFsRCxDQUZGLENBQUEsQ0FBQTtFQUtBMkssTUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjakgsSUFBZCxHQUFxQixDQUFyQixDQUFBO0VBQ0QsS0FBQTtFQUNGOzs7SUF4RXNDaU47O01DRnBCZ0I7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFBLFNBQUEsT0FBQSxDQUFZNUssQ0FBWixFQUFlZ0UsSUFBZixFQUFxQk8sTUFBckIsRUFBNkI7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUMzQixJQUFBLEtBQUEsR0FBQSxNQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBTSxDQUFOLEVBQVN2RSxDQUFULEVBQVlnRSxJQUFaLEVBQWtCTyxNQUFsQixDQUFBLElBQUEsSUFBQSxDQUFBO0VBQ0EsSUFBS2hMLEtBQUFBLENBQUFBLElBQUwsR0FBWSxTQUFaLENBQUE7RUFGMkIsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQUc1QixHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7RUFDRTBHLEVBQUFBLE1BQUFBLENBQUFBLFFBQUEsU0FBTUQsS0FBQUEsQ0FBQUEsQ0FBTixFQUFTZ0UsSUFBVCxFQUFlTyxNQUFmLEVBQXVCO0VBQ3JCLElBQU10RSxNQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFOLFlBQVksQ0FBWixFQUFlRCxDQUFmLEVBQWtCZ0UsSUFBbEIsRUFBd0JPLE1BQXhCLENBQUEsQ0FBQTtFQUNEOzs7SUEvQmtDeUY7O01DRWhCYTs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBQ0U7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFZalMsU0FBQUEsU0FBQUEsQ0FBQUEsT0FBWixFQUFxQndFLElBQXJCLEVBQTJCekosUUFBM0IsRUFBcUNxUSxJQUFyQyxFQUEyQ08sTUFBM0MsRUFBbUQ7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUNqRCxJQUFNUCxLQUFBQSxHQUFBQSxVQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxJQUFBQSxFQUFBQSxJQUFOLEVBQVlPLE1BQVosQ0FBQSxJQUFBLElBQUEsQ0FBQTs7RUFFQSxJQUFBLEtBQUEsQ0FBS3RFLEtBQUwsQ0FBV3JILE9BQVgsRUFBb0J3RSxJQUFwQixFQUEwQnpKLFFBQTFCLENBQUEsQ0FBQTs7RUFDQSxJQUFLNEYsS0FBQUEsQ0FBQUEsSUFBTCxHQUFZLFdBQVosQ0FBQTtFQUppRCxJQUFBLE9BQUEsS0FBQSxDQUFBO0VBS2xELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLFNBQU1ySCxLQUFBQSxDQUFBQSxPQUFOLEVBQWV3RSxJQUFmLEVBQXFCekosUUFBckIsRUFBK0JxUSxJQUEvQixFQUFxQ08sTUFBckMsRUFBNkM7RUFDM0MsSUFBSzNMLElBQUFBLENBQUFBLE9BQUwsR0FBZVosSUFBSSxDQUFDekQsU0FBTCxDQUFlcUUsT0FBZixFQUF3QixJQUF4QixDQUFmLENBQUE7RUFDQSxJQUFLd0UsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZcEYsSUFBSSxDQUFDekQsU0FBTCxDQUFlNkksSUFBZixFQUFxQixJQUFyQixDQUFaLENBQUE7RUFDQSxJQUFLekosSUFBQUEsQ0FBQUEsUUFBTCxHQUFnQnFFLElBQUksQ0FBQ3pELFNBQUwsQ0FBZVosUUFBZixFQUF5QixJQUF6QixDQUFoQixDQUFBO0VBRUEsSUFBS21YLElBQUFBLENBQUFBLGFBQUwsR0FBcUIsRUFBckIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLQyxLQUFMLEdBQWEsSUFBSTVJLFFBQUosRUFBYixDQUFBO0VBRUE2QixJQUFBQSxJQUFJLElBQVUvRCxVQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUosQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRUksRUFBQUEsTUFBQUEsQ0FBQUEsaUJBQUEsU0FBZTdILGNBQUFBLENBQUFBLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsRUFBc0M7RUFDcEMsSUFBTTJNLElBQUFBLE9BQU8sR0FBRyxJQUFLcFMsQ0FBQUEsT0FBTCxHQUFlLElBQUtBLENBQUFBLE9BQUwsQ0FBYThELFNBQWIsQ0FBdUJWLEtBQXZCLENBQTZCcUMsS0FBN0IsQ0FBZixHQUFxRCxJQUFBLENBQUs1RSxJQUFMLENBQVV1QyxLQUFWLENBQWdCcUMsS0FBaEIsQ0FBckUsQ0FBQTtFQUNBLElBQUEsSUFBTXhQLE1BQU0sR0FBR21jLE9BQU8sQ0FBQ25jLE1BQXZCLENBQUE7RUFFQSxJQUFBLElBQUlvYyxhQUFKLENBQUE7RUFDQSxJQUFBLElBQUloSSxRQUFKLENBQUE7RUFDQSxJQUFBLElBQUlpSSxPQUFKLENBQUE7RUFDQSxJQUFBLElBQUlDLFNBQUosQ0FBQTtFQUNBLElBQUlDLElBQUFBLFlBQUosRUFBa0JDLFlBQWxCLENBQUE7RUFDQSxJQUFBLElBQUl0YyxDQUFKLENBQUE7O0VBRUEsSUFBS0EsS0FBQUEsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHRixNQUFoQixFQUF3QkUsQ0FBQyxFQUF6QixFQUE2QjtFQUMzQmtjLE1BQUFBLGFBQWEsR0FBR0QsT0FBTyxDQUFDamMsQ0FBRCxDQUF2QixDQUFBOztFQUVBLE1BQUlrYyxJQUFBQSxhQUFhLEtBQUtuTyxRQUF0QixFQUFnQztFQUM5QixRQUFBLElBQUEsQ0FBS2lPLEtBQUwsQ0FBVzlOLElBQVgsQ0FBZ0JnTyxhQUFhLENBQUN6VCxDQUE5QixDQUFBLENBQUE7RUFDQSxRQUFBLElBQUEsQ0FBS3VULEtBQUwsQ0FBV25JLEdBQVgsQ0FBZTlGLFFBQVEsQ0FBQ3RGLENBQXhCLENBQUEsQ0FBQTtFQUVBeUwsUUFBQUEsUUFBUSxHQUFHLElBQUEsQ0FBSzhILEtBQUwsQ0FBVzlILFFBQVgsRUFBWCxDQUFBO0VBQ0EsUUFBTXFJLElBQUFBLFFBQVEsR0FBR3hPLFFBQVEsQ0FBQ3VILE1BQVQsR0FBa0I0RyxhQUFhLENBQUM1RyxNQUFqRCxDQUFBOztFQUVBLFFBQUEsSUFBSXBCLFFBQVEsSUFBSXFJLFFBQVEsR0FBR0EsUUFBM0IsRUFBcUM7RUFDbkNKLFVBQUFBLE9BQU8sR0FBR0ksUUFBUSxHQUFHaGMsSUFBSSxDQUFDcVMsSUFBTCxDQUFVc0IsUUFBVixDQUFyQixDQUFBO0VBQ0FpSSxVQUFBQSxPQUFPLElBQUksR0FBWCxDQUFBO0VBRUFDLFVBQUFBLFNBQVMsR0FBR3JPLFFBQVEsQ0FBQ00sSUFBVCxHQUFnQjZOLGFBQWEsQ0FBQzdOLElBQTFDLENBQUE7RUFDQWdPLFVBQUFBLFlBQVksR0FBRyxJQUFBLENBQUtoTyxJQUFMLEdBQVk2TixhQUFhLENBQUM3TixJQUFkLEdBQXFCK04sU0FBakMsR0FBNkMsR0FBNUQsQ0FBQTtFQUNBRSxVQUFBQSxZQUFZLEdBQUcsSUFBQSxDQUFLak8sSUFBTCxHQUFZTixRQUFRLENBQUNNLElBQVQsR0FBZ0IrTixTQUE1QixHQUF3QyxHQUF2RCxDQUFBO0VBRUFyTyxVQUFBQSxRQUFRLENBQUN0RixDQUFULENBQVdtQixHQUFYLENBQ0UsS0FBS29TLEtBQUwsQ0FDRzlTLEtBREgsRUFFR2lMLENBQUFBLFNBRkgsR0FHRy9GLGNBSEgsQ0FHa0IrTixPQUFPLEdBQUcsQ0FBQ0UsWUFIN0IsQ0FERixDQUFBLENBQUE7RUFNQUgsVUFBQUEsYUFBYSxDQUFDelQsQ0FBZCxDQUFnQm1CLEdBQWhCLENBQW9CLElBQUtvUyxDQUFBQSxLQUFMLENBQVc3SCxTQUFYLEdBQXVCL0YsY0FBdkIsQ0FBc0MrTixPQUFPLEdBQUdHLFlBQWhELENBQXBCLENBQUEsQ0FBQTtFQUVBLFVBQUsxWCxJQUFBQSxDQUFBQSxRQUFMLElBQWlCLElBQUtBLENBQUFBLFFBQUwsQ0FBY21KLFFBQWQsRUFBd0JtTyxhQUF4QixDQUFqQixDQUFBO0VBQ0QsU0FBQTtFQUNGLE9BQUE7RUFDRixLQUFBO0VBQ0Y7OztJQTlHb0NyQjs7TUNEbEIyQjs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLEVBQUEsU0FBQSxTQUFBLENBQVkzQyxJQUFaLEVBQWtCUixTQUFsQixFQUE2QnBFLElBQTdCLEVBQW1DTyxNQUFuQyxFQUEyQztFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ3pDLElBQU1QLEtBQUFBLEdBQUFBLFVBQUFBLENBQUFBLElBQUFBLENBQUFBLElBQUFBLEVBQUFBLElBQU4sRUFBWU8sTUFBWixDQUFBLElBQUEsSUFBQSxDQUFBOztFQUVBLElBQUEsS0FBQSxDQUFLdEUsS0FBTCxDQUFXMkksSUFBWCxFQUFpQlIsU0FBakIsQ0FBQSxDQUFBOztFQUNBLElBQUs3TyxLQUFBQSxDQUFBQSxJQUFMLEdBQVksV0FBWixDQUFBO0VBSnlDLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLMUMsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsZUFBTTJJLElBQU4sRUFBWVIsU0FBWixFQUF1QnBFLElBQXZCLEVBQTZCTyxNQUE3QixFQUFxQztFQUNuQyxJQUFLcUUsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZQSxJQUFaLENBQUE7RUFDQSxJQUFLQSxJQUFBQSxDQUFBQSxJQUFMLENBQVVSLFNBQVYsR0FBc0JwUSxJQUFJLENBQUN6RCxTQUFMLENBQWU2VCxTQUFmLEVBQTBCLE1BQTFCLENBQXRCLENBQUE7RUFFQXBFLElBQUFBLElBQUksSUFBVS9ELFVBQUFBLENBQUFBLFNBQUFBLENBQUFBLEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztFQUNFSSxFQUFBQSxNQUFBQSxDQUFBQSxpQkFBQSxTQUFlN0gsY0FBQUEsQ0FBQUEsUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixFQUFzQztFQUNwQyxJQUFBLElBQUEsQ0FBSzVCLFNBQUwsQ0FBZUssUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS3VLLElBQUwsQ0FBVUwsUUFBVixDQUFtQnpMLFFBQW5CLENBQUEsQ0FBQTtFQUNEOzs7SUF4RG9DOE07O01DQ2xCNEI7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFBLFNBQUEsS0FBQSxDQUFZMWIsQ0FBWixFQUFlQyxDQUFmLEVBQWtCaVUsSUFBbEIsRUFBd0JPLE1BQXhCLEVBQWdDO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDOUIsSUFBTVAsS0FBQUEsR0FBQUEsVUFBQUEsQ0FBQUEsSUFBQUEsQ0FBQUEsSUFBQUEsRUFBQUEsSUFBTixFQUFZTyxNQUFaLENBQUEsSUFBQSxJQUFBLENBQUE7O0VBRUEsSUFBQSxLQUFBLENBQUt0RSxLQUFMLENBQVduUSxDQUFYLEVBQWNDLENBQWQsQ0FBQSxDQUFBOztFQUNBLElBQUt3SixLQUFBQSxDQUFBQSxJQUFMLEdBQVksT0FBWixDQUFBO0VBSjhCLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLL0IsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O1dBQ0UwRyxRQUFBLGVBQU1uUSxDQUFOLEVBQVNDLENBQVQsRUFBWWlVLElBQVosRUFBa0JPLE1BQWxCLEVBQTBCO0VBQ3hCLElBQUEsSUFBQSxDQUFLa0gsSUFBTCxHQUFZMWIsQ0FBQyxLQUFLLElBQU4sSUFBY0EsQ0FBQyxLQUFLMkUsU0FBcEIsR0FBZ0MsSUFBaEMsR0FBdUMsS0FBbkQsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLNUUsQ0FBTCxHQUFTd1EsTUFBSSxDQUFDeUcsWUFBTCxDQUFrQi9PLElBQUksQ0FBQ3pELFNBQUwsQ0FBZXpFLENBQWYsRUFBa0IsQ0FBbEIsQ0FBbEIsQ0FBVCxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtDLENBQUwsR0FBU3VRLE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0JoWCxDQUFsQixDQUFULENBQUE7RUFFQWlVLElBQUFBLElBQUksSUFBVS9ELFVBQUFBLENBQUFBLFNBQUFBLENBQUFBLEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VRLGFBQUEsU0FBV2pJLFVBQUFBLENBQUFBLFFBQVgsRUFBcUI7RUFDbkJBLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzhILE1BQWQsR0FBdUIsSUFBSzViLENBQUFBLENBQUwsQ0FBT2dYLFFBQVAsRUFBdkIsQ0FBQTtFQUVBLElBQUksSUFBQSxJQUFBLENBQUsyRSxJQUFULEVBQWUzTyxRQUFRLENBQUM4RyxJQUFULENBQWMrSCxNQUFkLEdBQXVCN08sUUFBUSxDQUFDOEcsSUFBVCxDQUFjOEgsTUFBckMsQ0FBZixLQUNLNU8sUUFBUSxDQUFDOEcsSUFBVCxDQUFjK0gsTUFBZCxHQUF1QixJQUFLNWIsQ0FBQUEsQ0FBTCxDQUFPK1csUUFBUCxFQUF2QixDQUFBO0VBQ04sR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0VuQyxFQUFBQSxNQUFBQSxDQUFBQSxpQkFBQSxTQUFlN0gsY0FBQUEsQ0FBQUEsUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixFQUFzQztFQUNwQyxJQUFBLElBQUEsQ0FBSzVCLFNBQUwsQ0FBZUssUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixDQUFBLENBQUE7RUFFQXZCLElBQUFBLFFBQVEsQ0FBQzJHLEtBQVQsR0FBaUIzRyxRQUFRLENBQUM4RyxJQUFULENBQWMrSCxNQUFkLEdBQXVCLENBQUM3TyxRQUFRLENBQUM4RyxJQUFULENBQWM4SCxNQUFkLEdBQXVCNU8sUUFBUSxDQUFDOEcsSUFBVCxDQUFjK0gsTUFBdEMsSUFBZ0QsSUFBQSxDQUFLdkgsTUFBN0YsQ0FBQTtFQUVBLElBQUl0SCxJQUFBQSxRQUFRLENBQUMyRyxLQUFULEdBQWlCLEtBQXJCLEVBQTRCM0csUUFBUSxDQUFDMkcsS0FBVCxHQUFpQixDQUFqQixDQUFBO0VBQzdCOzs7SUE1RWdDbUc7O01DQWRnQzs7O0VBQ25CO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLEVBQUEsU0FBQSxLQUFBLENBQVk5YixDQUFaLEVBQWVDLENBQWYsRUFBa0JpVSxJQUFsQixFQUF3Qk8sTUFBeEIsRUFBZ0M7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUM5QixJQUFNUCxLQUFBQSxHQUFBQSxVQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxJQUFBQSxFQUFBQSxJQUFOLEVBQVlPLE1BQVosQ0FBQSxJQUFBLElBQUEsQ0FBQTs7RUFFQSxJQUFBLEtBQUEsQ0FBS3RFLEtBQUwsQ0FBV25RLENBQVgsRUFBY0MsQ0FBZCxDQUFBLENBQUE7O0VBQ0EsSUFBS3dKLEtBQUFBLENBQUFBLElBQUwsR0FBWSxPQUFaLENBQUE7RUFKOEIsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQUsvQixHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7OztXQUNFMEcsUUFBQSxlQUFNblEsQ0FBTixFQUFTQyxDQUFULEVBQVlpVSxJQUFaLEVBQWtCTyxNQUFsQixFQUEwQjtFQUN4QixJQUFBLElBQUEsQ0FBS2tILElBQUwsR0FBWTFiLENBQUMsS0FBSyxJQUFOLElBQWNBLENBQUMsS0FBSzJFLFNBQXBCLEdBQWdDLElBQWhDLEdBQXVDLEtBQW5ELENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBSzVFLENBQUwsR0FBU3dRLE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0IvTyxJQUFJLENBQUN6RCxTQUFMLENBQWV6RSxDQUFmLEVBQWtCLENBQWxCLENBQWxCLENBQVQsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLQyxDQUFMLEdBQVN1USxNQUFJLENBQUN5RyxZQUFMLENBQWtCaFgsQ0FBbEIsQ0FBVCxDQUFBO0VBRUFpVSxJQUFBQSxJQUFJLElBQVUvRCxVQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUosQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFUSxhQUFBLFNBQVdqSSxVQUFBQSxDQUFBQSxRQUFYLEVBQXFCO0VBQ25CQSxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNpSSxNQUFkLEdBQXVCLElBQUsvYixDQUFBQSxDQUFMLENBQU9nWCxRQUFQLEVBQXZCLENBQUE7RUFDQWhLLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRGLFNBQWQsR0FBMEIxTSxRQUFRLENBQUN1SCxNQUFuQyxDQUFBO0VBQ0F2SCxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNrSSxNQUFkLEdBQXVCLEtBQUtMLElBQUwsR0FBWTNPLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY2lJLE1BQTFCLEdBQW1DLEtBQUs5YixDQUFMLENBQU8rVyxRQUFQLEVBQTFELENBQUE7RUFDRCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0VuQyxFQUFBQSxNQUFBQSxDQUFBQSxpQkFBQSxTQUFlN0gsY0FBQUEsQ0FBQUEsUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixFQUFzQztFQUNwQyxJQUFBLElBQUEsQ0FBSzVCLFNBQUwsQ0FBZUssUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixDQUFBLENBQUE7RUFDQXZCLElBQUFBLFFBQVEsQ0FBQzFLLEtBQVQsR0FBaUIwSyxRQUFRLENBQUM4RyxJQUFULENBQWNrSSxNQUFkLEdBQXVCLENBQUNoUCxRQUFRLENBQUM4RyxJQUFULENBQWNpSSxNQUFkLEdBQXVCL08sUUFBUSxDQUFDOEcsSUFBVCxDQUFja0ksTUFBdEMsSUFBZ0QsSUFBQSxDQUFLMUgsTUFBN0YsQ0FBQTtFQUVBLElBQUl0SCxJQUFBQSxRQUFRLENBQUMxSyxLQUFULEdBQWlCLE1BQXJCLEVBQTZCMEssUUFBUSxDQUFDMUssS0FBVCxHQUFpQixDQUFqQixDQUFBO0VBQzdCMEssSUFBQUEsUUFBUSxDQUFDdUgsTUFBVCxHQUFrQnZILFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRGLFNBQWQsR0FBMEIxTSxRQUFRLENBQUMxSyxLQUFyRCxDQUFBO0VBQ0Q7OztJQTNFZ0N3WDs7TUNBZG1DOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFZQyxTQUFBQSxNQUFBQSxDQUFBQSxTQUFaLEVBQXVCamMsQ0FBdkIsRUFBMEIyQixLQUExQixFQUFpQ3NTLElBQWpDLEVBQXVDTyxNQUF2QyxFQUErQztFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQzdDLElBQU1QLEtBQUFBLEdBQUFBLFVBQUFBLENBQUFBLElBQUFBLENBQUFBLElBQUFBLEVBQUFBLElBQU4sRUFBWU8sTUFBWixDQUFBLElBQUEsSUFBQSxDQUFBOztFQUVBLElBQUEsS0FBQSxDQUFLdEUsS0FBTCxDQUFXK0wsU0FBWCxFQUFzQmpjLENBQXRCLEVBQXlCMkIsS0FBekIsQ0FBQSxDQUFBOztFQUNBLElBQUs2SCxLQUFBQSxDQUFBQSxJQUFMLEdBQVksUUFBWixDQUFBO0VBSjZDLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLOUMsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsU0FBTW5RLEtBQUFBLENBQUFBLENBQU4sRUFBU0MsQ0FBVCxFQUFZMkIsS0FBWixFQUFtQnNTLElBQW5CLEVBQXlCTyxNQUF6QixFQUFpQztFQUMvQixJQUFBLElBQUEsQ0FBS2tILElBQUwsR0FBWTFiLENBQUMsS0FBSyxJQUFOLElBQWNBLENBQUMsS0FBSzJFLFNBQXBCLEdBQWdDLElBQWhDLEdBQXVDLEtBQW5ELENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBSzVFLENBQUwsR0FBU3dRLE1BQUksQ0FBQ3lHLFlBQUwsQ0FBa0IvTyxJQUFJLENBQUN6RCxTQUFMLENBQWV6RSxDQUFmLEVBQWtCLFVBQWxCLENBQWxCLENBQVQsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLQyxDQUFMLEdBQVN1USxNQUFJLENBQUN5RyxZQUFMLENBQWtCL08sSUFBSSxDQUFDekQsU0FBTCxDQUFleEUsQ0FBZixFQUFrQixDQUFsQixDQUFsQixDQUFULENBQUE7RUFDQSxJQUFLMkIsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhc0csSUFBSSxDQUFDekQsU0FBTCxDQUFlN0MsS0FBZixFQUFzQixJQUF0QixDQUFiLENBQUE7RUFFQXNTLElBQUFBLElBQUksSUFBVS9ELFVBQUFBLENBQUFBLFNBQUFBLENBQUFBLEtBQVYsWUFBZ0IrRCxJQUFoQixFQUFzQk8sTUFBdEIsQ0FBSixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0VRLGFBQUEsU0FBV2pJLFVBQUFBLENBQUFBLFFBQVgsRUFBcUI7RUFDbkJBLElBQUFBLFFBQVEsQ0FBQ3dILFFBQVQsR0FBb0IsS0FBS3hVLENBQUwsQ0FBT2dYLFFBQVAsRUFBcEIsQ0FBQTtFQUNBaEssSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjcUksU0FBZCxHQUEwQixJQUFLbmMsQ0FBQUEsQ0FBTCxDQUFPZ1gsUUFBUCxFQUExQixDQUFBO0VBRUEsSUFBQSxJQUFJLENBQUMsSUFBQSxDQUFLMkUsSUFBVixFQUFnQjNPLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3NJLFNBQWQsR0FBMEIsSUFBQSxDQUFLbmMsQ0FBTCxDQUFPK1csUUFBUCxFQUExQixDQUFBO0VBQ2pCLEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRW5DLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQWU3SCxjQUFBQSxDQUFBQSxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLElBQUEsSUFBQSxDQUFLNUIsU0FBTCxDQUFlSyxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLENBQUEsQ0FBQTs7RUFFQSxJQUFJLElBQUEsQ0FBQyxJQUFLb04sQ0FBQUEsSUFBVixFQUFnQjtFQUNkLE1BQUEsSUFBSSxJQUFLL1osQ0FBQUEsS0FBTCxLQUFlLElBQWYsSUFBdUIsSUFBS0EsQ0FBQUEsS0FBTCxLQUFlLElBQXRDLElBQThDLElBQUEsQ0FBS0EsS0FBTCxLQUFlLEdBQWpFLEVBQXNFO0VBQ3BFb0wsUUFBQUEsUUFBUSxDQUFDd0gsUUFBVCxJQUNFeEgsUUFBUSxDQUFDOEcsSUFBVCxDQUFjc0ksU0FBZCxHQUEwQixDQUFDcFAsUUFBUSxDQUFDOEcsSUFBVCxDQUFjcUksU0FBZCxHQUEwQm5QLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3NJLFNBQXpDLElBQXNELElBQUEsQ0FBSzlILE1BRHZGLENBQUE7RUFFRCxPQUhELE1BR087RUFDTHRILFFBQUFBLFFBQVEsQ0FBQ3dILFFBQVQsSUFBcUJ4SCxRQUFRLENBQUM4RyxJQUFULENBQWNzSSxTQUFuQyxDQUFBO0VBQ0QsT0FBQTtFQUNGLEtBUEQsTUFPTyxJQUFJLElBQUtwYyxDQUFBQSxDQUFMLENBQU9BLENBQVAsS0FBYSxHQUFiLElBQW9CLElBQUtBLENBQUFBLENBQUwsQ0FBT0EsQ0FBUCxLQUFhLFVBQWpDLElBQStDLElBQUEsQ0FBS0EsQ0FBTCxDQUFPQSxDQUFQLEtBQWEsR0FBaEUsRUFBcUU7RUFDMUU7RUFDQWdOLE1BQUFBLFFBQVEsQ0FBQ3dILFFBQVQsR0FBb0J4SCxRQUFRLENBQUNpSCxZQUFULEVBQXBCLENBQUE7RUFDRCxLQUFBO0VBQ0Y7OztJQTFGaUM2Rjs7TUNBZnVDOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFBLFNBQUEsS0FBQSxDQUFZcmMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCaVUsSUFBbEIsRUFBd0JPLE1BQXhCLEVBQWdDO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDOUIsSUFBTVAsS0FBQUEsR0FBQUEsVUFBQUEsQ0FBQUEsSUFBQUEsQ0FBQUEsSUFBQUEsRUFBQUEsSUFBTixFQUFZTyxNQUFaLENBQUEsSUFBQSxJQUFBLENBQUE7O0VBRUEsSUFBQSxLQUFBLENBQUt0RSxLQUFMLENBQVduUSxDQUFYLEVBQWNDLENBQWQsQ0FBQSxDQUFBOztFQUNBLElBQUt3SixLQUFBQSxDQUFBQSxJQUFMLEdBQVksT0FBWixDQUFBO0VBSjhCLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLL0IsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsZUFBTW5RLENBQU4sRUFBU0MsQ0FBVCxFQUFZaVUsSUFBWixFQUFrQk8sTUFBbEIsRUFBMEI7RUFDeEIsSUFBQSxJQUFBLENBQUt6VSxDQUFMLEdBQVNtWCxTQUFTLENBQUNFLGVBQVYsQ0FBMEJyWCxDQUExQixDQUFULENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0MsQ0FBTCxHQUFTa1gsU0FBUyxDQUFDRSxlQUFWLENBQTBCcFgsQ0FBMUIsQ0FBVCxDQUFBO0VBQ0FpVSxJQUFBQSxJQUFJLElBQVUvRCxVQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUosQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztXQUNFUSxhQUFBLFNBQVdqSSxVQUFBQSxDQUFBQSxRQUFYLEVBQXFCO0VBQ25CQSxJQUFBQSxRQUFRLENBQUMvQyxLQUFULEdBQWlCLEtBQUtqSyxDQUFMLENBQU9nWCxRQUFQLEVBQWpCLENBQUE7RUFDQWhLLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3dJLE1BQWQsR0FBdUJDLFNBQVMsQ0FBQ25ILFFBQVYsQ0FBbUJwSSxRQUFRLENBQUMvQyxLQUE1QixDQUF2QixDQUFBO0VBRUEsSUFBQSxJQUFJLEtBQUtoSyxDQUFULEVBQVkrTSxRQUFRLENBQUM4RyxJQUFULENBQWMwSSxNQUFkLEdBQXVCRCxTQUFTLENBQUNuSCxRQUFWLENBQW1CLElBQUEsQ0FBS25WLENBQUwsQ0FBTytXLFFBQVAsRUFBbkIsQ0FBdkIsQ0FBQTtFQUNiLEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRW5DLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQWU3SCxjQUFBQSxDQUFBQSxRQUFmLEVBQXlCSCxJQUF6QixFQUErQjBCLEtBQS9CLEVBQXNDO0VBQ3BDLElBQUksSUFBQSxJQUFBLENBQUt0TyxDQUFULEVBQVk7RUFDVixNQUFBLElBQUEsQ0FBSzBNLFNBQUwsQ0FBZUssUUFBZixFQUF5QkgsSUFBekIsRUFBK0IwQixLQUEvQixDQUFBLENBQUE7RUFFQXZCLE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlELENBQWIsR0FBaUJqRCxRQUFRLENBQUM4RyxJQUFULENBQWMwSSxNQUFkLENBQXFCdk0sQ0FBckIsR0FBeUIsQ0FBQ2pELFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3dJLE1BQWQsQ0FBcUJyTSxDQUFyQixHQUF5QmpELFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBJLE1BQWQsQ0FBcUJ2TSxDQUEvQyxJQUFvRCxLQUFLcUUsTUFBbkcsQ0FBQTtFQUNBdEgsTUFBQUEsUUFBUSxDQUFDK0csR0FBVCxDQUFhN0QsQ0FBYixHQUFpQmxELFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzBJLE1BQWQsQ0FBcUJ0TSxDQUFyQixHQUF5QixDQUFDbEQsUUFBUSxDQUFDOEcsSUFBVCxDQUFjd0ksTUFBZCxDQUFxQnBNLENBQXJCLEdBQXlCbEQsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMEksTUFBZCxDQUFxQnRNLENBQS9DLElBQW9ELEtBQUtvRSxNQUFuRyxDQUFBO0VBQ0F0SCxNQUFBQSxRQUFRLENBQUMrRyxHQUFULENBQWE5VCxDQUFiLEdBQWlCK00sUUFBUSxDQUFDOEcsSUFBVCxDQUFjMEksTUFBZCxDQUFxQnZjLENBQXJCLEdBQXlCLENBQUMrTSxRQUFRLENBQUM4RyxJQUFULENBQWN3SSxNQUFkLENBQXFCcmMsQ0FBckIsR0FBeUIrTSxRQUFRLENBQUM4RyxJQUFULENBQWMwSSxNQUFkLENBQXFCdmMsQ0FBL0MsSUFBb0QsS0FBS3FVLE1BQW5HLENBQUE7RUFFQXRILE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlELENBQWIsR0FBaUJqRCxRQUFRLENBQUMrRyxHQUFULENBQWE5RCxDQUFiLElBQWtCLENBQW5DLENBQUE7RUFDQWpELE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTdELENBQWIsR0FBaUJsRCxRQUFRLENBQUMrRyxHQUFULENBQWE3RCxDQUFiLElBQWtCLENBQW5DLENBQUE7RUFDQWxELE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlULENBQWIsR0FBaUIrTSxRQUFRLENBQUMrRyxHQUFULENBQWE5VCxDQUFiLElBQWtCLENBQW5DLENBQUE7RUFDRCxLQVZELE1BVU87RUFDTCtNLE1BQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlELENBQWIsR0FBaUJqRCxRQUFRLENBQUM4RyxJQUFULENBQWN3SSxNQUFkLENBQXFCck0sQ0FBdEMsQ0FBQTtFQUNBakQsTUFBQUEsUUFBUSxDQUFDK0csR0FBVCxDQUFhN0QsQ0FBYixHQUFpQmxELFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3dJLE1BQWQsQ0FBcUJwTSxDQUF0QyxDQUFBO0VBQ0FsRCxNQUFBQSxRQUFRLENBQUMrRyxHQUFULENBQWE5VCxDQUFiLEdBQWlCK00sUUFBUSxDQUFDOEcsSUFBVCxDQUFjd0ksTUFBZCxDQUFxQnJjLENBQXRDLENBQUE7RUFDRCxLQUFBO0VBQ0Y7OztJQWxGZ0M2Wjs7RUNDbkMsSUFBTTJDLFFBQVEsR0FBRyxVQUFqQixDQUFBOztNQUVxQkM7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLEVBQUEsU0FBQSxPQUFBLENBQVlDLEtBQVosRUFBbUIzQyxLQUFuQixFQUEwQjlGLElBQTFCLEVBQWdDTyxNQUFoQyxFQUF3QztFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ3RDLElBQU1QLEtBQUFBLEdBQUFBLFVBQUFBLENBQUFBLElBQUFBLENBQUFBLElBQUFBLEVBQUFBLElBQU4sRUFBWU8sTUFBWixDQUFBLElBQUEsSUFBQSxDQUFBOztFQUNBLElBQUEsS0FBQSxDQUFLbUksZ0JBQUwsQ0FBc0JELEtBQXRCLEVBQTZCM0MsS0FBN0IsQ0FBQSxDQUFBOztFQUNBLElBQUt2USxLQUFBQSxDQUFBQSxJQUFMLEdBQVksU0FBWixDQUFBO0VBSHNDLElBQUEsT0FBQSxLQUFBLENBQUE7RUFJdkMsR0FBQTs7OztFQUVEbVQsRUFBQUEsTUFBQUEsQ0FBQUEsbUJBQUEsU0FBQSxnQkFBQSxDQUFpQkQsS0FBakIsRUFBd0IzQyxLQUF4QixFQUErQjtFQUM3QixJQUFLQSxJQUFBQSxDQUFBQSxLQUFMLEdBQWF5QyxRQUFiLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0UsS0FBTCxHQUFhclIsUUFBUSxDQUFDSCxFQUFULEdBQWMsQ0FBM0IsQ0FBQTs7RUFFQSxJQUFJd1IsSUFBQUEsS0FBSyxLQUFLLE9BQWQsRUFBdUI7RUFDckIsTUFBQSxJQUFBLENBQUtBLEtBQUwsR0FBYXJSLFFBQVEsQ0FBQ0gsRUFBVCxHQUFjLENBQTNCLENBQUE7RUFDRCxLQUZELE1BRU8sSUFBSXdSLEtBQUssS0FBSyxNQUFkLEVBQXNCO0VBQzNCLE1BQUEsSUFBQSxDQUFLQSxLQUFMLEdBQWEsQ0FBQ3JSLFFBQVEsQ0FBQ0gsRUFBVixHQUFlLENBQTVCLENBQUE7RUFDRCxLQUZNLE1BRUEsSUFBSXdSLEtBQUssS0FBSyxRQUFkLEVBQXdCO0VBQzdCLE1BQUtBLElBQUFBLENBQUFBLEtBQUwsR0FBYSxRQUFiLENBQUE7RUFDRCxLQUZNLE1BRUEsSUFBSUEsS0FBSyxZQUFZbk0sTUFBckIsRUFBMkI7RUFDaEMsTUFBS21NLElBQUFBLENBQUFBLEtBQUwsR0FBYSxNQUFiLENBQUE7RUFDQSxNQUFLRSxJQUFBQSxDQUFBQSxJQUFMLEdBQVlGLEtBQVosQ0FBQTtFQUNELEtBSE0sTUFHQSxJQUFJQSxLQUFKLEVBQVc7RUFDaEIsTUFBS0EsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhQSxLQUFiLENBQUE7RUFDRCxLQUFBOztFQUVELElBQ0VHLElBQUFBLE1BQU0sQ0FBQzlDLEtBQUQsQ0FBTixDQUFjK0MsV0FBZCxFQUFBLEtBQWdDLFVBQWhDLElBQ0FELE1BQU0sQ0FBQzlDLEtBQUQsQ0FBTixDQUFjK0MsV0FBZCxFQUFBLEtBQWdDLE9BRGhDLElBRUFELE1BQU0sQ0FBQzlDLEtBQUQsQ0FBTixDQUFjK0MsV0FBZCxFQUFnQyxLQUFBLE1BSGxDLEVBSUU7RUFDQSxNQUFLL0MsSUFBQUEsQ0FBQUEsS0FBTCxHQUFheUMsUUFBYixDQUFBO0VBQ0QsS0FORCxNQU1PLElBQUl6QyxLQUFKLEVBQVc7RUFDaEIsTUFBS0EsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhQSxLQUFiLENBQUE7RUFDRCxLQUFBO0VBQ0YsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0U3SixRQUFBLGVBQU13TSxLQUFOLEVBQWEzQyxLQUFiLEVBQW9COUYsSUFBcEIsRUFBMEJPLE1BQTFCLEVBQWtDO0VBQ2hDLElBQUEsSUFBQSxDQUFLa0ksS0FBTCxHQUFhclIsUUFBUSxDQUFDSCxFQUFULEdBQWMsQ0FBM0IsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLeVIsZ0JBQUwsQ0FBc0JELEtBQXRCLEVBQTZCM0MsS0FBN0IsQ0FBQSxDQUFBO0VBQ0E5RixJQUFBQSxJQUFJLElBQVUvRCxVQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUosQ0FBQTtFQUNEOztXQUVEUSxhQUFBLFNBQVdqSSxVQUFBQSxDQUFBQSxRQUFYLEVBQXFCO0VBQ25CLElBQUEsSUFBSSxJQUFLMlAsQ0FBQUEsS0FBTCxLQUFlLFFBQW5CLEVBQTZCO0VBQzNCM1AsTUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFja0osTUFBZCxHQUF1QjFSLFFBQVEsQ0FBQ00sVUFBVCxDQUFvQixDQUFDTixRQUFRLENBQUNILEVBQTlCLEVBQWtDRyxRQUFRLENBQUNILEVBQTNDLENBQXZCLENBQUE7RUFDRCxLQUZELE1BRU8sSUFBSSxJQUFBLENBQUt3UixLQUFMLEtBQWUsTUFBbkIsRUFBMkI7RUFDaEMzUCxNQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNrSixNQUFkLEdBQXVCLElBQUtILENBQUFBLElBQUwsQ0FBVTdGLFFBQVYsRUFBdkIsQ0FBQTtFQUNELEtBQUE7O0VBRURoSyxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWNtSixPQUFkLEdBQXdCLElBQUk1SyxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUF4QixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztFQUNFd0MsRUFBQUEsTUFBQUEsQ0FBQUEsaUJBQUEsU0FBZTdILGNBQUFBLENBQUFBLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsRUFBc0M7RUFDcEMsSUFBQSxJQUFBLENBQUs1QixTQUFMLENBQWVLLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsQ0FBQSxDQUFBO0VBRUEsSUFBQSxJQUFJeFAsTUFBSixDQUFBO0VBQ0EsSUFBQSxJQUFJbWUsUUFBUSxHQUFHbFEsUUFBUSxDQUFDSSxDQUFULENBQVdxRixXQUFYLEVBQWYsQ0FBQTs7RUFDQSxJQUFJLElBQUEsSUFBQSxDQUFLa0ssS0FBTCxLQUFlLFFBQWYsSUFBMkIsSUFBS0EsQ0FBQUEsS0FBTCxLQUFlLE1BQTlDLEVBQXNEO0VBQ3BETyxNQUFBQSxRQUFRLElBQUlsUSxRQUFRLENBQUM4RyxJQUFULENBQWNrSixNQUExQixDQUFBO0VBQ0QsS0FGRCxNQUVPO0VBQ0xFLE1BQUFBLFFBQVEsSUFBSSxJQUFBLENBQUtQLEtBQWpCLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUEsSUFBSSxJQUFLM0MsQ0FBQUEsS0FBTCxLQUFleUMsUUFBbkIsRUFBNkI7RUFDM0IxZCxNQUFBQSxNQUFNLEdBQUdpTyxRQUFRLENBQUNJLENBQVQsQ0FBV3JPLE1BQVgsS0FBc0IsR0FBL0IsQ0FBQTtFQUNELEtBRkQsTUFFTztFQUNMQSxNQUFBQSxNQUFNLEdBQUcsSUFBQSxDQUFLaWIsS0FBZCxDQUFBO0VBQ0QsS0FBQTs7RUFFRGhOLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY21KLE9BQWQsQ0FBc0I3YSxDQUF0QixHQUEwQnJELE1BQU0sR0FBR1MsSUFBSSxDQUFDQyxHQUFMLENBQVN5ZCxRQUFULENBQW5DLENBQUE7RUFDQWxRLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY21KLE9BQWQsQ0FBc0I1YSxDQUF0QixHQUEwQnRELE1BQU0sR0FBR1MsSUFBSSxDQUFDRyxHQUFMLENBQVN1ZCxRQUFULENBQW5DLENBQUE7RUFDQWxRLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY21KLE9BQWQsR0FBd0IsSUFBQSxDQUFLbEQsY0FBTCxDQUFvQi9NLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY21KLE9BQWxDLENBQXhCLENBQUE7RUFDQWpRLElBQUFBLFFBQVEsQ0FBQ2hOLENBQVQsQ0FBVzZJLEdBQVgsQ0FBZW1FLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY21KLE9BQTdCLENBQUEsQ0FBQTtFQUNEOzs7SUE1R2tDbkQ7O01DTGhCcUQ7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLEVBQVk3QyxTQUFBQSxTQUFBQSxDQUFBQSxjQUFaLEVBQTRCTixLQUE1QixFQUFtQ3pGLE1BQW5DLEVBQTJDTCxJQUEzQyxFQUFpRE8sTUFBakQsRUFBeUQ7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUN2RCxJQUFNNkYsS0FBQUEsR0FBQUEsV0FBQUEsQ0FBQUEsSUFBQUEsQ0FBQUEsSUFBQUEsRUFBQUEsY0FBTixFQUFzQk4sS0FBdEIsRUFBNkJ6RixNQUE3QixFQUFxQ0wsSUFBckMsRUFBMkNPLE1BQTNDLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLdUYsS0FBQUEsQ0FBQUEsS0FBTCxJQUFjLENBQUMsQ0FBZixDQUFBO0VBQ0EsSUFBS3ZRLEtBQUFBLENBQUFBLElBQUwsR0FBWSxXQUFaLENBQUE7RUFKdUQsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQUt4RCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7OztXQUNFMEcsUUFBQSxTQUFNbUssS0FBQUEsQ0FBQUEsY0FBTixFQUFzQk4sS0FBdEIsRUFBNkJ6RixNQUE3QixFQUFxQ0wsSUFBckMsRUFBMkNPLE1BQTNDLEVBQW1EO0VBQ2pELElBQU10RSxXQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFOLENBQVltSyxJQUFBQSxDQUFBQSxJQUFBQSxFQUFBQSxjQUFaLEVBQTRCTixLQUE1QixFQUFtQ3pGLE1BQW5DLEVBQTJDTCxJQUEzQyxFQUFpRE8sTUFBakQsQ0FBQSxDQUFBOztFQUNBLElBQUt1RixJQUFBQSxDQUFBQSxLQUFMLElBQWMsQ0FBQyxDQUFmLENBQUE7RUFDRDs7O0lBN0NvQ0s7O01DRWxCK0M7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFLEVBQUEsU0FBQSxXQUFBLENBQVlDLFdBQVosRUFBeUJyRCxLQUF6QixFQUFnQzlGLElBQWhDLEVBQXNDTyxNQUF0QyxFQUE4QztFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQzVDLElBQU1QLEtBQUFBLEdBQUFBLFVBQUFBLENBQUFBLElBQUFBLENBQUFBLElBQUFBLEVBQUFBLElBQU4sRUFBWU8sTUFBWixDQUFBLElBQUEsSUFBQSxDQUFBO0VBRUEsSUFBQSxLQUFBLENBQUs2SSxXQUFMLEdBQW1CLElBQUlqTCxRQUFKLEVBQW5CLENBQUE7RUFDQSxJQUFLZ0wsS0FBQUEsQ0FBQUEsV0FBTCxHQUFtQm5WLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTRZLFdBQWYsRUFBNEIsSUFBSWhMLFFBQUosRUFBNUIsQ0FBbkIsQ0FBQTtFQUNBLElBQUEsS0FBQSxDQUFLMkgsS0FBTCxHQUFhOVIsSUFBSSxDQUFDekQsU0FBTCxDQUFlLEtBQUt3VixDQUFBQSxjQUFMLENBQW9CRCxLQUFwQixDQUFmLEVBQTJDLEdBQTNDLENBQWIsQ0FBQTtFQUVBLElBQUt2USxLQUFBQSxDQUFBQSxJQUFMLEdBQVksYUFBWixDQUFBO0VBUDRDLElBQUEsT0FBQSxLQUFBLENBQUE7RUFRN0MsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7Ozs7V0FDRTBHLFFBQUEsZUFBTWtOLFdBQU4sRUFBbUJyRCxLQUFuQixFQUEwQjlGLElBQTFCLEVBQWdDTyxNQUFoQyxFQUF3QztFQUN0QyxJQUFBLElBQUEsQ0FBSzZJLFdBQUwsR0FBbUIsSUFBSWpMLFFBQUosRUFBbkIsQ0FBQTtFQUNBLElBQUtnTCxJQUFBQSxDQUFBQSxXQUFMLEdBQW1CblYsSUFBSSxDQUFDekQsU0FBTCxDQUFlNFksV0FBZixFQUE0QixJQUFJaEwsUUFBSixFQUE1QixDQUFuQixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUsySCxLQUFMLEdBQWE5UixJQUFJLENBQUN6RCxTQUFMLENBQWUsSUFBS3dWLENBQUFBLGNBQUwsQ0FBb0JELEtBQXBCLENBQWYsRUFBMkMsR0FBM0MsQ0FBYixDQUFBO0VBRUE5RixJQUFBQSxJQUFJLElBQVUvRCxVQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxLQUFWLFlBQWdCK0QsSUFBaEIsRUFBc0JPLE1BQXRCLENBQUosQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7OztFQUNFUSxFQUFBQSxNQUFBQSxDQUFBQSxhQUFBLFNBQUEsVUFBQSxDQUFXakksUUFBWCxFQUFxQixFQUFFO0VBRXZCO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztFQUNFNkgsRUFBQUEsTUFBQUEsQ0FBQUEsaUJBQUEsU0FBZTdILGNBQUFBLENBQUFBLFFBQWYsRUFBeUJILElBQXpCLEVBQStCMEIsS0FBL0IsRUFBc0M7RUFDcEMsSUFBSytPLElBQUFBLENBQUFBLFdBQUwsQ0FBaUJoTCxHQUFqQixDQUFxQixJQUFBLENBQUsrSyxXQUFMLENBQWlCamIsQ0FBakIsR0FBcUI0SyxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFyRCxFQUF3RCxJQUFLaWIsQ0FBQUEsV0FBTCxDQUFpQmhiLENBQWpCLEdBQXFCMkssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBeEYsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFNa2IsVUFBVSxHQUFHLElBQUEsQ0FBS0QsV0FBTCxDQUFpQm5LLFFBQWpCLEVBQW5CLENBQUE7O0VBRUEsSUFBSW9LLElBQUFBLFVBQVUsS0FBSyxDQUFuQixFQUFzQjtFQUNwQixNQUFBLElBQU0vQixRQUFRLEdBQUcsSUFBQSxDQUFLOEIsV0FBTCxDQUFpQnZlLE1BQWpCLEVBQWpCLENBQUE7RUFDQSxNQUFNeWUsSUFBQUEsTUFBTSxHQUFJLElBQUEsQ0FBS3hELEtBQUwsR0FBYW5OLElBQWQsSUFBdUIwUSxVQUFVLEdBQUcvQixRQUFwQyxDQUFmLENBQUE7RUFFQXhPLE1BQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxJQUFnQm9iLE1BQU0sR0FBRyxJQUFBLENBQUtGLFdBQUwsQ0FBaUJsYixDQUExQyxDQUFBO0VBQ0E0SyxNQUFBQSxRQUFRLENBQUNJLENBQVQsQ0FBVy9LLENBQVgsSUFBZ0JtYixNQUFNLEdBQUcsSUFBQSxDQUFLRixXQUFMLENBQWlCamIsQ0FBMUMsQ0FBQTtFQUNELEtBQUE7RUFDRjs7O0lBdkVzQ3lYOztBQ0F6Qyx1QkFBZTtFQUNiN0UsRUFBQUEsVUFEYSxFQUNGbk0sU0FBQUEsVUFBQUEsQ0FBQUEsT0FERSxFQUNPa0UsUUFEUCxFQUNpQjFELFdBRGpCLEVBQzhCO0VBQ3pDLElBQUEsSUFBTXZLLE1BQU0sR0FBR3VLLFdBQVcsQ0FBQ3ZLLE1BQTNCLENBQUE7RUFDQSxJQUFBLElBQUlFLENBQUosQ0FBQTs7RUFFQSxJQUFLQSxLQUFBQSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdGLE1BQWhCLEVBQXdCRSxDQUFDLEVBQXpCLEVBQTZCO0VBQzNCLE1BQUEsSUFBSXFLLFdBQVcsQ0FBQ3JLLENBQUQsQ0FBWCxZQUEwQmdaLFVBQTlCLEVBQTBDO0VBQ3hDM08sUUFBQUEsV0FBVyxDQUFDckssQ0FBRCxDQUFYLENBQWVvUCxJQUFmLENBQW9CdkYsT0FBcEIsRUFBNkJrRSxRQUE3QixDQUFBLENBQUE7RUFDRCxPQUZELE1BRU87RUFDTCxRQUFLcUIsSUFBQUEsQ0FBQUEsSUFBTCxDQUFVdkYsT0FBVixFQUFtQmtFLFFBQW5CLEVBQTZCMUQsV0FBVyxDQUFDckssQ0FBRCxDQUF4QyxDQUFBLENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FBQTs7RUFFRCxJQUFBLElBQUEsQ0FBS3dlLFdBQUwsQ0FBaUIzVSxPQUFqQixFQUEwQmtFLFFBQTFCLENBQUEsQ0FBQTtFQUNELEdBZFk7RUFnQmI7RUFDQXFCLEVBQUFBLElBakJhLEVBaUJSdkYsU0FBQUEsSUFBQUEsQ0FBQUEsT0FqQlEsRUFpQkNrRSxRQWpCRCxFQWlCV2lJLFVBakJYLEVBaUJ1QjtFQUNsQ2pCLElBQUFBLFFBQVEsQ0FBQzNELE9BQVQsQ0FBaUJyRCxRQUFqQixFQUEyQmlJLFVBQTNCLENBQUEsQ0FBQTtFQUNBakIsSUFBQUEsUUFBUSxDQUFDdEQsWUFBVCxDQUFzQjFELFFBQXRCLEVBQWdDaUksVUFBaEMsQ0FBQSxDQUFBO0VBQ0QsR0FwQlk7RUFzQmJ3SSxFQUFBQSxXQXRCYSxFQUFBLFNBQUEsV0FBQSxDQXNCRDNVLE9BdEJDLEVBc0JRa0UsUUF0QlIsRUFzQmtCO0VBQzdCLElBQUlsRSxJQUFBQSxPQUFPLENBQUMyVSxXQUFaLEVBQXlCO0VBQ3ZCelEsTUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXbUIsR0FBWCxDQUFlQyxPQUFPLENBQUNwQixDQUF2QixDQUFBLENBQUE7RUFDQXNGLE1BQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXdkUsR0FBWCxDQUFlQyxPQUFPLENBQUNzRSxDQUF2QixDQUFBLENBQUE7RUFDQUosTUFBQUEsUUFBUSxDQUFDaE4sQ0FBVCxDQUFXNkksR0FBWCxDQUFlQyxPQUFPLENBQUM5SSxDQUF2QixDQUFBLENBQUE7RUFDQWdOLE1BQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXN0ssTUFBWCxDQUFrQitJLFFBQVEsQ0FBQ2tCLGVBQVQsQ0FBeUIxRCxPQUFPLENBQUMwTCxRQUFqQyxDQUFsQixDQUFBLENBQUE7RUFDRCxLQUFBO0VBQ0YsR0FBQTtFQTdCWSxDQUFmOztNQ0lxQmtKOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRSxFQUFBLFNBQUEsT0FBQSxDQUFZL00sSUFBWixFQUF1QjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQUEsSUFBQSxJQUFYQSxJQUFXLEtBQUEsS0FBQSxDQUFBLEVBQUE7RUFBWEEsTUFBQUEsSUFBVyxHQUFKLEVBQUksQ0FBQTtFQUFBLEtBQUE7O0VBQ3JCLElBQUEsS0FBQSxHQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFNQSxJQUFOLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLL0QsS0FBQUEsQ0FBQUEsU0FBTCxHQUFpQixFQUFqQixDQUFBO0VBQ0EsSUFBS3BELEtBQUFBLENBQUFBLFVBQUwsR0FBa0IsRUFBbEIsQ0FBQTtFQUNBLElBQUtGLEtBQUFBLENBQUFBLFdBQUwsR0FBbUIsRUFBbkIsQ0FBQTtFQUVBLElBQUtxVSxLQUFBQSxDQUFBQSxRQUFMLEdBQWdCLENBQWhCLENBQUE7RUFDQSxJQUFLdlUsS0FBQUEsQ0FBQUEsU0FBTCxHQUFpQixDQUFqQixDQUFBO0VBQ0EsSUFBS3dVLEtBQUFBLENBQUFBLFNBQUwsR0FBaUIsQ0FBQyxDQUFsQixDQUFBO0VBRUE7RUFDSjtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUNJLElBQUs5USxLQUFBQSxDQUFBQSxPQUFMLEdBQWUsS0FBZixDQUFBO0VBRUE7RUFDSjtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUNJLElBQUsyUSxLQUFBQSxDQUFBQSxXQUFMLEdBQW1CLElBQW5CLENBQUE7RUFFQTtFQUNKO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBQ0ksSUFBS0ksS0FBQUEsQ0FBQUEsSUFBTCxHQUFZLElBQUluRyxJQUFKLENBQVMsQ0FBVCxFQUFZLEdBQVosQ0FBWixDQUFBO0VBRUEsSUFBS2pPLEtBQUFBLENBQUFBLElBQUwsR0FBWSxTQUFaLENBQUE7RUFDQSxJQUFLcEksS0FBQUEsQ0FBQUEsRUFBTCxHQUFVcUYsSUFBSSxDQUFDckYsRUFBTCxDQUFRLEtBQUEsQ0FBS29JLElBQWIsQ0FBVixDQUFBO0VBcENxQixJQUFBLE9BQUEsS0FBQSxDQUFBO0VBcUN0QixHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7OztFQUNFcVUsRUFBQUEsTUFBQUEsQ0FBQUEsT0FBQSxTQUFBLElBQUEsQ0FBS0YsU0FBTCxFQUFnQjFKLElBQWhCLEVBQXNCO0VBQ3BCLElBQUs2SixJQUFBQSxDQUFBQSxNQUFMLEdBQWMsS0FBZCxDQUFBO0VBQ0EsSUFBS0osSUFBQUEsQ0FBQUEsUUFBTCxHQUFnQixDQUFoQixDQUFBO0VBQ0EsSUFBS0MsSUFBQUEsQ0FBQUEsU0FBTCxHQUFpQjFWLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW1aLFNBQWYsRUFBMEJ2UyxRQUExQixDQUFqQixDQUFBOztFQUVBLElBQUk2SSxJQUFBQSxJQUFJLEtBQUssSUFBVCxJQUFpQkEsSUFBSSxLQUFLLE1BQTFCLElBQW9DQSxJQUFJLEtBQUssU0FBakQsRUFBNEQ7RUFDMUQsTUFBS0EsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZMEosU0FBUyxLQUFLLE1BQWQsR0FBdUIsQ0FBdkIsR0FBMkIsSUFBQSxDQUFLQSxTQUE1QyxDQUFBO0VBQ0QsS0FGRCxNQUVPLElBQUksQ0FBQ0ksS0FBSyxDQUFDOUosSUFBRCxDQUFWLEVBQWtCO0VBQ3ZCLE1BQUtBLElBQUFBLENBQUFBLElBQUwsR0FBWUEsSUFBWixDQUFBO0VBQ0QsS0FBQTs7RUFFRCxJQUFLMkosSUFBQUEsQ0FBQUEsSUFBTCxDQUFVeFAsSUFBVixFQUFBLENBQUE7RUFDRCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7OztFQUNFNFAsRUFBQUEsTUFBQUEsQ0FBQUEsT0FBQSxTQUFPLElBQUEsR0FBQTtFQUNMLElBQUtMLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsQ0FBQyxDQUFsQixDQUFBO0VBQ0EsSUFBS0QsSUFBQUEsQ0FBQUEsUUFBTCxHQUFnQixDQUFoQixDQUFBO0VBQ0EsSUFBS0ksSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNEOztXQUVERyxVQUFBLFNBQVFyUixPQUFBQSxDQUFBQSxJQUFSLEVBQWM7RUFDWixJQUFJc1IsSUFBQUEsU0FBUyxHQUFHLElBQUEsQ0FBS0osTUFBckIsQ0FBQTtFQUNBLElBQUlLLElBQUFBLFdBQVcsR0FBRyxJQUFBLENBQUtULFFBQXZCLENBQUE7RUFDQSxJQUFJVSxJQUFBQSxZQUFZLEdBQUcsSUFBQSxDQUFLVCxTQUF4QixDQUFBO0VBRUEsSUFBS0csSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLEtBQWQsQ0FBQTtFQUNBLElBQUtKLElBQUFBLENBQUFBLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLFNBQUwsR0FBaUIvUSxJQUFqQixDQUFBO0VBQ0EsSUFBS2dSLElBQUFBLENBQUFBLElBQUwsQ0FBVXhQLElBQVYsRUFBQSxDQUFBO0VBRUEsSUFBTWlRLElBQUFBLElBQUksR0FBRyxNQUFiLENBQUE7O0VBQ0EsSUFBT3pSLE9BQUFBLElBQUksR0FBR3lSLElBQWQsRUFBb0I7RUFDbEJ6UixNQUFBQSxJQUFJLElBQUl5UixJQUFSLENBQUE7RUFDQSxNQUFLM1YsSUFBQUEsQ0FBQUEsTUFBTCxDQUFZMlYsSUFBWixDQUFBLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUtQLElBQUFBLENBQUFBLE1BQUwsR0FBY0ksU0FBZCxDQUFBO0VBQ0EsSUFBS1IsSUFBQUEsQ0FBQUEsUUFBTCxHQUFnQlMsV0FBVyxHQUFHNWUsSUFBSSxDQUFDb1YsR0FBTCxDQUFTL0gsSUFBVCxFQUFlLENBQWYsQ0FBOUIsQ0FBQTtFQUNBLElBQUsrUSxJQUFBQSxDQUFBQSxTQUFMLEdBQWlCUyxZQUFqQixDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBOzs7RUFDRUUsRUFBQUEsTUFBQUEsQ0FBQUEscUJBQUEsU0FBcUIsa0JBQUEsR0FBQTtFQUNuQixJQUFBLElBQUl0ZixDQUFDLEdBQUcsSUFBSzJOLENBQUFBLFNBQUwsQ0FBZTdOLE1BQXZCLENBQUE7O0VBQ0EsSUFBQSxPQUFPRSxDQUFDLEVBQVIsRUFBQTtFQUFZLE1BQUEsSUFBQSxDQUFLMk4sU0FBTCxDQUFlM04sQ0FBZixDQUFrQm1WLENBQUFBLElBQWxCLEdBQXlCLElBQXpCLENBQUE7RUFBWixLQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBOzs7V0FDRW9LLG9CQUFBLFNBQWtCdkosaUJBQUFBLENBQUFBLFVBQWxCLEVBQThCO0VBQzVCLElBQUEsSUFBSUEsVUFBVSxDQUFDLE1BQUQsQ0FBZCxFQUF3QjtFQUN0QkEsTUFBQUEsVUFBVSxDQUFDNUcsSUFBWCxDQUFnQixJQUFoQixDQUFBLENBQUE7RUFDRCxLQUVBO0VBQ0YsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRW9RLEVBQUFBLE1BQUFBLENBQUFBLGdCQUFBLFNBQXVCLGFBQUEsR0FBQTtFQUFBLElBQUEsS0FBQSxJQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsTUFBQSxFQUFOQyxJQUFNLEdBQUEsSUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsSUFBQSxHQUFBLENBQUEsRUFBQSxJQUFBLEdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxFQUFBO0VBQU5BLE1BQUFBLElBQU0sQ0FBQSxJQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBOztFQUNyQixJQUFBLElBQUl6ZixDQUFDLEdBQUd5ZixJQUFJLENBQUMzZixNQUFiLENBQUE7O0VBQ0EsSUFBQSxPQUFPRSxDQUFDLEVBQVIsRUFBQTtFQUFZLE1BQUEsSUFBQSxDQUFLcUssV0FBTCxDQUFpQnRCLElBQWpCLENBQXNCMFcsSUFBSSxDQUFDemYsQ0FBRCxDQUExQixDQUFBLENBQUE7RUFBWixLQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7OztXQUNFMGYsbUJBQUEsU0FBaUJDLGdCQUFBQSxDQUFBQSxXQUFqQixFQUE4QjtFQUM1QixJQUFNclEsSUFBQUEsS0FBSyxHQUFHLElBQUtqRixDQUFBQSxXQUFMLENBQWlCM0QsT0FBakIsQ0FBeUJpWixXQUF6QixDQUFkLENBQUE7RUFDQSxJQUFBLElBQUlyUSxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCLElBQUEsQ0FBS2pGLFdBQUwsQ0FBaUIwQixNQUFqQixDQUF3QnVELEtBQXhCLEVBQStCLENBQS9CLENBQUEsQ0FBQTtFQUNqQixHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7OztFQUNFc1EsRUFBQUEsTUFBQUEsQ0FBQUEsd0JBQUEsU0FBd0IscUJBQUEsR0FBQTtFQUN0QjNXLElBQUFBLElBQUksQ0FBQ2hELFVBQUwsQ0FBZ0IsS0FBS29FLFdBQXJCLENBQUEsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0V3TCxFQUFBQSxNQUFBQSxDQUFBQSxlQUFBLFNBQXNCLFlBQUEsR0FBQTtFQUFBLElBQUEsS0FBQSxJQUFBLEtBQUEsR0FBQSxTQUFBLENBQUEsTUFBQSxFQUFONEosSUFBTSxHQUFBLElBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBLEtBQUEsR0FBQSxDQUFBLEVBQUEsS0FBQSxHQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQTtFQUFOQSxNQUFBQSxJQUFNLENBQUEsS0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUEsS0FBQTs7RUFDcEIsSUFBQSxJQUFJemYsQ0FBQyxHQUFHNmYsU0FBUyxDQUFDL2YsTUFBbEIsQ0FBQTs7RUFDQSxJQUFPRSxPQUFBQSxDQUFDLEVBQVIsRUFBWTtFQUNWLE1BQUEsSUFBSThWLFNBQVMsR0FBRzJKLElBQUksQ0FBQ3pmLENBQUQsQ0FBcEIsQ0FBQTtFQUNBLE1BQUEsSUFBQSxDQUFLdUssVUFBTCxDQUFnQnhCLElBQWhCLENBQXFCK00sU0FBckIsQ0FBQSxDQUFBO0VBQ0EsTUFBSUEsSUFBQUEsU0FBUyxDQUFDQyxPQUFkLEVBQXVCRCxTQUFTLENBQUNDLE9BQVYsQ0FBa0JoTixJQUFsQixDQUF1QixJQUF2QixDQUFBLENBQUE7RUFDeEIsS0FBQTtFQUNGLEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBOzs7V0FDRW1OLGtCQUFBLFNBQWdCSixlQUFBQSxDQUFBQSxTQUFoQixFQUEyQjtFQUN6QixJQUFJeEcsSUFBQUEsS0FBSyxHQUFHLElBQUsvRSxDQUFBQSxVQUFMLENBQWdCN0QsT0FBaEIsQ0FBd0JvUCxTQUF4QixDQUFaLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS3ZMLFVBQUwsQ0FBZ0J3QixNQUFoQixDQUF1QnVELEtBQXZCLEVBQThCLENBQTlCLENBQUEsQ0FBQTs7RUFFQSxJQUFJd0csSUFBQUEsU0FBUyxDQUFDQyxPQUFkLEVBQXVCO0VBQ3JCekcsTUFBQUEsS0FBSyxHQUFHd0csU0FBUyxDQUFDQyxPQUFWLENBQWtCclAsT0FBbEIsQ0FBMEJvUCxTQUExQixDQUFSLENBQUE7RUFDQUEsTUFBQUEsU0FBUyxDQUFDQyxPQUFWLENBQWtCaEssTUFBbEIsQ0FBeUJ1RCxLQUF6QixFQUFnQyxDQUFoQyxDQUFBLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUEsT0FBT0EsS0FBUCxDQUFBO0VBQ0QsR0FBQTtFQUVEO0VBQ0Y7RUFDQTtFQUNBOzs7RUFDRW1HLEVBQUFBLE1BQUFBLENBQUFBLHNCQUFBLFNBQXNCLG1CQUFBLEdBQUE7RUFDcEJ4TSxJQUFBQSxJQUFJLENBQUNoRCxVQUFMLENBQWdCLEtBQUtzRSxVQUFyQixDQUFBLENBQUE7RUFDRDs7O1dBR0RiLFNBQUEsU0FBT2tFLE1BQUFBLENBQUFBLElBQVAsRUFBYTtFQUNYLElBQUtzSCxJQUFBQSxDQUFBQSxHQUFMLElBQVl0SCxJQUFaLENBQUE7RUFDQSxJQUFJLElBQUEsSUFBQSxDQUFLc0gsR0FBTCxJQUFZLElBQUtELENBQUFBLElBQWpCLElBQXlCLElBQUtFLENBQUFBLElBQWxDLEVBQXdDLElBQUEsQ0FBSy9OLE9BQUwsRUFBQSxDQUFBO0VBRXhDLElBQUswWSxJQUFBQSxDQUFBQSxRQUFMLENBQWNsUyxJQUFkLENBQUEsQ0FBQTtFQUNBLElBQUttUyxJQUFBQSxDQUFBQSxTQUFMLENBQWVuUyxJQUFmLENBQUEsQ0FBQTtFQUNEOztXQUVEbVMsWUFBQSxTQUFVblMsU0FBQUEsQ0FBQUEsSUFBVixFQUFnQjtFQUNkLElBQUksSUFBQSxDQUFDLElBQUs2QixDQUFBQSxNQUFWLEVBQWtCLE9BQUE7RUFFbEIsSUFBQSxJQUFNNUIsT0FBTyxHQUFHLENBQUksR0FBQSxJQUFBLENBQUtBLE9BQXpCLENBQUE7RUFDQSxJQUFLNEIsSUFBQUEsQ0FBQUEsTUFBTCxDQUFZWCxVQUFaLENBQXVCcEIsU0FBdkIsQ0FBaUMsSUFBakMsRUFBdUNFLElBQXZDLEVBQTZDQyxPQUE3QyxDQUFBLENBQUE7RUFFQSxJQUFBLElBQU0vTixNQUFNLEdBQUcsSUFBSzZOLENBQUFBLFNBQUwsQ0FBZTdOLE1BQTlCLENBQUE7RUFDQSxJQUFJRSxJQUFBQSxDQUFKLEVBQU8rTixRQUFQLENBQUE7O0VBRUEsSUFBQSxLQUFLL04sQ0FBQyxHQUFHRixNQUFNLEdBQUcsQ0FBbEIsRUFBcUJFLENBQUMsSUFBSSxDQUExQixFQUE2QkEsQ0FBQyxFQUE5QixFQUFrQztFQUNoQytOLE1BQUFBLFFBQVEsR0FBRyxJQUFLSixDQUFBQSxTQUFMLENBQWUzTixDQUFmLENBQVgsQ0FEZ0M7O0VBSWhDK04sTUFBQUEsUUFBUSxDQUFDckUsTUFBVCxDQUFnQmtFLElBQWhCLEVBQXNCNU4sQ0FBdEIsQ0FBQSxDQUFBO0VBQ0EsTUFBS3lQLElBQUFBLENBQUFBLE1BQUwsQ0FBWVgsVUFBWixDQUF1QnBCLFNBQXZCLENBQWlDSyxRQUFqQyxFQUEyQ0gsSUFBM0MsRUFBaURDLE9BQWpELENBQUEsQ0FBQTtFQUNBLE1BQUEsSUFBQSxDQUFLbVMsUUFBTCxDQUFjLGlCQUFkLEVBQWlDalMsUUFBakMsRUFOZ0M7O0VBU2hDLE1BQUlBLElBQUFBLFFBQVEsQ0FBQ29ILElBQWIsRUFBbUI7RUFDakIsUUFBQSxJQUFBLENBQUs2SyxRQUFMLENBQWMsZUFBZCxFQUErQmpTLFFBQS9CLENBQUEsQ0FBQTtFQUVBLFFBQUEsSUFBQSxDQUFLMEIsTUFBTCxDQUFZL0UsSUFBWixDQUFpQjdCLE1BQWpCLENBQXdCa0YsUUFBeEIsQ0FBQSxDQUFBO0VBQ0EsUUFBQSxJQUFBLENBQUtKLFNBQUwsQ0FBZTVCLE1BQWYsQ0FBc0IvTCxDQUF0QixFQUF5QixDQUF6QixDQUFBLENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FBQTtFQUNGOztFQUVEZ2dCLEVBQUFBLE1BQUFBLENBQUFBLFdBQUEsU0FBQSxRQUFBLENBQVNDLEtBQVQsRUFBZ0IvYSxNQUFoQixFQUF3QjtFQUN0QixJQUFLdUssSUFBQUEsQ0FBQUEsTUFBTCxJQUFlLElBQUEsQ0FBS0EsTUFBTCxDQUFZL0QsYUFBWixDQUEwQnVVLEtBQTFCLEVBQWlDL2EsTUFBakMsQ0FBZixDQUFBO0VBQ0EsSUFBS2diLElBQUFBLENBQUFBLFNBQUwsSUFBa0IsSUFBS3hVLENBQUFBLGFBQUwsQ0FBbUJ1VSxLQUFuQixFQUEwQi9hLE1BQTFCLENBQWxCLENBQUE7RUFDRDs7V0FFRDRhLFdBQUEsU0FBU2xTLFFBQUFBLENBQUFBLElBQVQsRUFBZTtFQUNiLElBQUEsSUFBSSxJQUFLK1EsQ0FBQUEsU0FBTCxLQUFtQixNQUF2QixFQUErQjtFQUM3QixNQUFBLElBQUkzZSxDQUFKLENBQUE7RUFDQSxNQUFNRixJQUFBQSxNQUFNLEdBQUcsSUFBSzhlLENBQUFBLElBQUwsQ0FBVTdHLFFBQVYsQ0FBbUIsS0FBbkIsQ0FBZixDQUFBO0VBRUEsTUFBQSxJQUFJalksTUFBTSxHQUFHLENBQWIsRUFBZ0IsSUFBS3FLLENBQUFBLFNBQUwsR0FBaUJySyxNQUFqQixDQUFBOztFQUNoQixNQUFLRSxLQUFBQSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdGLE1BQWhCLEVBQXdCRSxDQUFDLEVBQXpCLEVBQUE7RUFBNkIsUUFBQSxJQUFBLENBQUttZ0IsY0FBTCxFQUFBLENBQUE7RUFBN0IsT0FBQTs7RUFDQSxNQUFLeEIsSUFBQUEsQ0FBQUEsU0FBTCxHQUFpQixNQUFqQixDQUFBO0VBQ0QsS0FQRCxNQU9PO0VBQ0wsTUFBS0QsSUFBQUEsQ0FBQUEsUUFBTCxJQUFpQjlRLElBQWpCLENBQUE7O0VBRUEsTUFBQSxJQUFJLElBQUs4USxDQUFBQSxRQUFMLEdBQWdCLElBQUEsQ0FBS0MsU0FBekIsRUFBb0M7RUFDbEMsUUFBTTdlLElBQUFBLE9BQU0sR0FBRyxJQUFLOGUsQ0FBQUEsSUFBTCxDQUFVN0csUUFBVixDQUFtQm5LLElBQW5CLENBQWYsQ0FBQTs7RUFDQSxRQUFBLElBQUk1TixFQUFKLENBQUE7O0VBRUEsUUFBQSxJQUFJRixPQUFNLEdBQUcsQ0FBYixFQUFnQixJQUFLcUssQ0FBQUEsU0FBTCxHQUFpQnJLLE9BQWpCLENBQUE7O0VBQ2hCLFFBQUtFLEtBQUFBLEVBQUMsR0FBRyxDQUFULEVBQVlBLEVBQUMsR0FBR0YsT0FBaEIsRUFBd0JFLEVBQUMsRUFBekIsRUFBQTtFQUE2QixVQUFBLElBQUEsQ0FBS21nQixjQUFMLEVBQUEsQ0FBQTtFQUE3QixTQUFBO0VBQ0QsT0FBQTtFQUNGLEtBQUE7RUFDRixHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFDRUEsRUFBQUEsTUFBQUEsQ0FBQUEsaUJBQUEsU0FBQSxjQUFBLENBQWVuSyxVQUFmLEVBQTJCRixTQUEzQixFQUFzQztFQUNwQyxJQUFNL0gsSUFBQUEsUUFBUSxHQUFHLElBQUEsQ0FBSzBCLE1BQUwsQ0FBWS9FLElBQVosQ0FBaUJuQyxHQUFqQixDQUFxQnFNLFFBQXJCLENBQWpCLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS3dMLGFBQUwsQ0FBbUJyUyxRQUFuQixFQUE2QmlJLFVBQTdCLEVBQXlDRixTQUF6QyxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS2tLLFFBQUwsQ0FBYyxrQkFBZCxFQUFrQ2pTLFFBQWxDLENBQUEsQ0FBQTtFQUVBLElBQUEsT0FBT0EsUUFBUCxDQUFBO0VBQ0Q7O0VBRURxUyxFQUFBQSxNQUFBQSxDQUFBQSxnQkFBQSxTQUFjclMsYUFBQUEsQ0FBQUEsUUFBZCxFQUF3QmlJLFVBQXhCLEVBQW9DRixTQUFwQyxFQUErQztFQUM3QyxJQUFJekwsSUFBQUEsV0FBVyxHQUFHLElBQUEsQ0FBS0EsV0FBdkIsQ0FBQTtFQUNBLElBQUlFLElBQUFBLFVBQVUsR0FBRyxJQUFBLENBQUtBLFVBQXRCLENBQUE7RUFFQSxJQUFJeUwsSUFBQUEsVUFBSixFQUFnQjNMLFdBQVcsR0FBR3BCLElBQUksQ0FBQzlDLE9BQUwsQ0FBYTZQLFVBQWIsQ0FBZCxDQUFBO0VBQ2hCLElBQUlGLElBQUFBLFNBQUosRUFBZXZMLFVBQVUsR0FBR3RCLElBQUksQ0FBQzlDLE9BQUwsQ0FBYTJQLFNBQWIsQ0FBYixDQUFBO0VBRWYvSCxJQUFBQSxRQUFRLENBQUNtRCxLQUFULEVBQUEsQ0FBQTtFQUNBbVAsSUFBQUEsY0FBYyxDQUFDckssVUFBZixDQUEwQixJQUExQixFQUFnQ2pJLFFBQWhDLEVBQTBDMUQsV0FBMUMsQ0FBQSxDQUFBO0VBQ0EwRCxJQUFBQSxRQUFRLENBQUNrSSxhQUFULENBQXVCMUwsVUFBdkIsQ0FBQSxDQUFBO0VBQ0F3RCxJQUFBQSxRQUFRLENBQUMwQixNQUFULEdBQWtCLElBQWxCLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBSzlCLFNBQUwsQ0FBZTVFLElBQWYsQ0FBb0JnRixRQUFwQixDQUFBLENBQUE7RUFDRDs7RUFFRHdCLEVBQUFBLE1BQUFBLENBQUFBLFNBQUEsU0FBUyxNQUFBLEdBQUE7RUFDUCxJQUFBLElBQUEsQ0FBS3lQLElBQUwsRUFBQSxDQUFBO0VBQ0EvVixJQUFBQSxJQUFJLENBQUM5QixVQUFMLENBQWdCLEtBQUt3RyxTQUFyQixDQUFBLENBQUE7RUFDRCxHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7OztFQUNFdkcsRUFBQUEsTUFBQUEsQ0FBQUEsVUFBQSxTQUFVLE9BQUEsR0FBQTtFQUNSLElBQUsrTixJQUFBQSxDQUFBQSxJQUFMLEdBQVksSUFBWixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUs1RixNQUFMLEVBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLcVEscUJBQUwsRUFBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtuSyxtQkFBTCxFQUFBLENBQUE7RUFDQSxJQUFLaEcsSUFBQUEsQ0FBQUEsTUFBTCxJQUFlLElBQUtBLENBQUFBLE1BQUwsQ0FBWUUsYUFBWixDQUEwQixJQUExQixDQUFmLENBQUE7RUFFQSxJQUFLaVAsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLElBQVosQ0FBQTtFQUNBLElBQUszUSxJQUFBQSxDQUFBQSxHQUFMLEdBQVcsSUFBWCxDQUFBO0VBQ0EsSUFBSzZHLElBQUFBLENBQUFBLEdBQUwsR0FBVyxJQUFYLENBQUE7RUFDQSxJQUFLM0csSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTLElBQVQsQ0FBQTtFQUNBLElBQUtwTixJQUFBQSxDQUFBQSxDQUFMLEdBQVMsSUFBVCxDQUFBO0VBQ0EsSUFBSzBILElBQUFBLENBQUFBLENBQUwsR0FBUyxJQUFULENBQUE7RUFDRDs7O0lBclRrQ21NO0VBd1RyQ3BKLGVBQWUsQ0FBQ3pFLElBQWhCLENBQXFCMFgsT0FBckIsQ0FBQTs7TUM5VHFCNkI7OztFQUNuQjtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsRUFBQSxTQUFBLGdCQUFBLENBQVk1TyxJQUFaLEVBQWtCO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDaEIsSUFBQSxLQUFBLEdBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQU1BLElBQU4sQ0FBQSxJQUFBLElBQUEsQ0FBQTtFQUVBLElBQUs2TyxLQUFBQSxDQUFBQSxjQUFMLEdBQXNCLEVBQXRCLENBQUE7RUFIZ0IsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQUlqQixHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Ozs7O0VBQ0VDLEVBQUFBLE1BQUFBLENBQUFBLG1CQUFBLFNBQTBCLGdCQUFBLEdBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQSxJQUFBLEdBQUEsU0FBQSxDQUFBLE1BQUEsRUFBTmYsSUFBTSxHQUFBLElBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxHQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQTtFQUFOQSxNQUFBQSxJQUFNLENBQUEsSUFBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0VBQUEsS0FBQTs7RUFDeEIsSUFBQSxJQUFJemYsQ0FBSjtFQUFBLFFBQ0VGLE1BQU0sR0FBRzJmLElBQUksQ0FBQzNmLE1BRGhCLENBQUE7O0VBR0EsSUFBS0UsS0FBQUEsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHRixNQUFoQixFQUF3QkUsQ0FBQyxFQUF6QixFQUE2QjtFQUMzQixNQUFBLElBQUk4VixTQUFTLEdBQUcySixJQUFJLENBQUN6ZixDQUFELENBQXBCLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS3VnQixjQUFMLENBQW9CeFgsSUFBcEIsQ0FBeUIrTSxTQUF6QixDQUFBLENBQUE7RUFDQUEsTUFBQUEsU0FBUyxDQUFDRSxVQUFWLENBQXFCLElBQXJCLENBQUEsQ0FBQTtFQUNELEtBQUE7RUFDRixHQUFBO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTs7O1dBQ0V5SyxzQkFBQSxTQUFvQjNLLG1CQUFBQSxDQUFBQSxTQUFwQixFQUErQjtFQUM3QixJQUFNeEcsSUFBQUEsS0FBSyxHQUFHLElBQUtpUixDQUFBQSxjQUFMLENBQW9CN1osT0FBcEIsQ0FBNEJvUCxTQUE1QixDQUFkLENBQUE7RUFDQSxJQUFBLElBQUl4RyxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCLElBQUEsQ0FBS2lSLGNBQUwsQ0FBb0J4VSxNQUFwQixDQUEyQnVELEtBQTNCLEVBQWtDLENBQWxDLENBQUEsQ0FBQTtFQUNqQjs7V0FFRDVGLFNBQUEsU0FBT2tFLE1BQUFBLENBQUFBLElBQVAsRUFBYTtFQUNYLElBQU1sRSxRQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxNQUFOLFlBQWFrRSxJQUFiLENBQUEsQ0FBQTs7RUFFQSxJQUFJLElBQUEsQ0FBQyxJQUFLSSxDQUFBQSxLQUFWLEVBQWlCO0VBQ2YsTUFBQSxJQUFNbE8sTUFBTSxHQUFHLElBQUt5Z0IsQ0FBQUEsY0FBTCxDQUFvQnpnQixNQUFuQyxDQUFBO0VBQ0EsTUFBQSxJQUFJRSxDQUFKLENBQUE7O0VBRUEsTUFBS0EsS0FBQUEsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHRixNQUFoQixFQUF3QkUsQ0FBQyxFQUF6QixFQUE2QjtFQUMzQixRQUFLdWdCLElBQUFBLENBQUFBLGNBQUwsQ0FBb0J2Z0IsQ0FBcEIsQ0FBdUI0VixDQUFBQSxjQUF2QixDQUFzQyxJQUF0QyxFQUE0Q2hJLElBQTVDLEVBQWtENU4sQ0FBbEQsQ0FBQSxDQUFBO0VBQ0QsT0FBQTtFQUNGLEtBQUE7RUFDRjs7O0lBdEQyQ3llOztNQ0N6QmlDOzs7RUFDbkI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsRUFBQSxTQUFBLGFBQUEsQ0FBWUMsV0FBWixFQUF5QnhOLElBQXpCLEVBQStCekIsSUFBL0IsRUFBcUM7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUNuQyxJQUFBLEtBQUEsR0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBTUEsSUFBTixDQUFBLElBQUEsSUFBQSxDQUFBO0VBRUEsSUFBS2lQLEtBQUFBLENBQUFBLFdBQUwsR0FBbUIxWCxJQUFJLENBQUN6RCxTQUFMLENBQWVtYixXQUFmLEVBQTRCQyxNQUE1QixDQUFuQixDQUFBO0VBQ0EsSUFBS3pOLEtBQUFBLENBQUFBLElBQUwsR0FBWWxLLElBQUksQ0FBQ3pELFNBQUwsQ0FBZTJOLElBQWYsRUFBcUIsR0FBckIsQ0FBWixDQUFBO0VBRUEsSUFBSzBOLEtBQUFBLENBQUFBLGNBQUwsR0FBc0IsS0FBdEIsQ0FBQTs7RUFDQSxJQUFBLEtBQUEsQ0FBS0MsZ0JBQUwsRUFBQSxDQUFBOztFQVBtQyxJQUFBLE9BQUEsS0FBQSxDQUFBO0VBUXBDLEdBQUE7Ozs7RUFFREEsRUFBQUEsTUFBQUEsQ0FBQUEsbUJBQUEsU0FBbUIsZ0JBQUEsR0FBQTtFQUFBLElBQUEsSUFBQSxNQUFBLEdBQUEsSUFBQSxDQUFBOztFQUNqQixJQUFLQyxJQUFBQSxDQUFBQSxnQkFBTCxHQUF3QixVQUFBOWIsQ0FBQyxFQUFBO0VBQUEsTUFBSSxPQUFBLE1BQUksQ0FBQytiLFNBQUwsQ0FBZWhiLElBQWYsQ0FBb0IsTUFBcEIsRUFBMEJmLENBQTFCLENBQUosQ0FBQTtFQUFBLEtBQXpCLENBQUE7O0VBQ0EsSUFBS2djLElBQUFBLENBQUFBLGdCQUFMLEdBQXdCLFVBQUFoYyxDQUFDLEVBQUE7RUFBQSxNQUFJLE9BQUEsTUFBSSxDQUFDaWMsU0FBTCxDQUFlbGIsSUFBZixDQUFvQixNQUFwQixFQUEwQmYsQ0FBMUIsQ0FBSixDQUFBO0VBQUEsS0FBekIsQ0FBQTs7RUFDQSxJQUFLa2MsSUFBQUEsQ0FBQUEsY0FBTCxHQUFzQixVQUFBbGMsQ0FBQyxFQUFBO0VBQUEsTUFBSSxPQUFBLE1BQUksQ0FBQ21jLE9BQUwsQ0FBYXBiLElBQWIsQ0FBa0IsTUFBbEIsRUFBd0JmLENBQXhCLENBQUosQ0FBQTtFQUFBLEtBQXZCLENBQUE7O0VBQ0EsSUFBSzBiLElBQUFBLENBQUFBLFdBQUwsQ0FBaUI3VixnQkFBakIsQ0FBa0MsV0FBbEMsRUFBK0MsSUFBQSxDQUFLaVcsZ0JBQXBELEVBQXNFLEtBQXRFLENBQUEsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O0VBQ0VsQyxFQUFBQSxNQUFBQSxDQUFBQSxPQUFBLFNBQU8sSUFBQSxHQUFBO0VBQ0wsSUFBS2dDLElBQUFBLENBQUFBLGNBQUwsR0FBc0IsSUFBdEIsQ0FBQTtFQUNELEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O0VBQ0U3QixFQUFBQSxNQUFBQSxDQUFBQSxPQUFBLFNBQU8sSUFBQSxHQUFBO0VBQ0wsSUFBSzZCLElBQUFBLENBQUFBLGNBQUwsR0FBc0IsS0FBdEIsQ0FBQTtFQUNEOztXQUVERyxZQUFBLFNBQVUvYixTQUFBQSxDQUFBQSxDQUFWLEVBQWE7RUFDWCxJQUFJQSxJQUFBQSxDQUFDLENBQUNvYyxNQUFGLElBQVlwYyxDQUFDLENBQUNvYyxNQUFGLEtBQWEsQ0FBN0IsRUFBZ0M7RUFDOUIsTUFBQSxJQUFBLENBQUs1WSxDQUFMLENBQU90RixDQUFQLElBQVksQ0FBQzhCLENBQUMsQ0FBQ29jLE1BQUYsR0FBVyxLQUFLNVksQ0FBTCxDQUFPdEYsQ0FBbkIsSUFBd0IsS0FBS2dRLElBQXpDLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBSzFLLENBQUwsQ0FBT3JGLENBQVAsSUFBWSxDQUFDNkIsQ0FBQyxDQUFDcWMsTUFBRixHQUFXLEtBQUs3WSxDQUFMLENBQU9yRixDQUFuQixJQUF3QixLQUFLK1AsSUFBekMsQ0FBQTtFQUNELEtBSEQsTUFHTyxJQUFJbE8sQ0FBQyxDQUFDc2MsT0FBRixJQUFhdGMsQ0FBQyxDQUFDc2MsT0FBRixLQUFjLENBQS9CLEVBQWtDO0VBQ3ZDLE1BQUEsSUFBQSxDQUFLOVksQ0FBTCxDQUFPdEYsQ0FBUCxJQUFZLENBQUM4QixDQUFDLENBQUNzYyxPQUFGLEdBQVksS0FBSzlZLENBQUwsQ0FBT3RGLENBQXBCLElBQXlCLEtBQUtnUSxJQUExQyxDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUsxSyxDQUFMLENBQU9yRixDQUFQLElBQVksQ0FBQzZCLENBQUMsQ0FBQ3VjLE9BQUYsR0FBWSxLQUFLL1ksQ0FBTCxDQUFPckYsQ0FBcEIsSUFBeUIsS0FBSytQLElBQTFDLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUEsSUFBSSxLQUFLME4sY0FBVCxFQUF5QixRQUFNaEMsQ0FBQUEsU0FBQUEsQ0FBQUEsSUFBTixZQUFXLE1BQVgsQ0FBQSxDQUFBO0VBQzFCLEdBQUE7RUFFRDtFQUNGO0VBQ0E7RUFDQTs7O0VBQ0V6WCxFQUFBQSxNQUFBQSxDQUFBQSxVQUFBLFNBQVUsT0FBQSxHQUFBO0VBQ1IsSUFBQSxRQUFBLENBQUEsU0FBQSxDQUFNQSxPQUFOLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBOztFQUNBLElBQUt1WixJQUFBQSxDQUFBQSxXQUFMLENBQWlCL1UsbUJBQWpCLENBQXFDLFdBQXJDLEVBQWtELElBQUEsQ0FBS21WLGdCQUF2RCxFQUF5RSxLQUF6RSxDQUFBLENBQUE7RUFDRDs7O0lBakV3Q3RDOztBQ0gzQyxjQUFlO0VBQ2I7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNFZ0QsRUFBQUEsT0FOYSxFQU1MamIsU0FBQUEsT0FBQUEsQ0FBQUEsR0FOSyxFQU1BO0VBQ1gsSUFBQSxJQUFJLENBQUNBLEdBQUwsRUFBVSxPQUFPLEtBQVAsQ0FBQTtFQUNWLElBQUEsSUFBSUEsR0FBRyxDQUFDa2IsU0FBUixFQUFtQixPQUFPLElBQVAsQ0FBQTtFQUVuQixJQUFNQyxJQUFBQSxPQUFPLEdBQUcsQ0FBR25iLEVBQUFBLEdBQUFBLEdBQUcsQ0FBQ21iLE9BQVAsRUFBaUI3ZCxXQUFqQixFQUFoQixDQUFBO0VBQ0EsSUFBTThkLElBQUFBLFFBQVEsR0FBRyxDQUFHcGIsRUFBQUEsR0FBQUEsR0FBRyxDQUFDb2IsUUFBUCxFQUFrQjlkLFdBQWxCLEVBQWpCLENBQUE7O0VBQ0EsSUFBQSxJQUFJOGQsUUFBUSxLQUFLLEtBQWIsSUFBc0JELE9BQU8sS0FBSyxLQUF0QyxFQUE2QztFQUMzQ25iLE1BQUFBLEdBQUcsQ0FBQ2tiLFNBQUosR0FBZ0IsSUFBaEIsQ0FBQTtFQUNBLE1BQUEsT0FBTyxJQUFQLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUEsT0FBTyxLQUFQLENBQUE7RUFDRCxHQWxCWTs7RUFvQmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNFRyxFQUFBQSxRQXpCYSxFQXlCSnJiLFNBQUFBLFFBQUFBLENBQUFBLEdBekJJLEVBeUJDO0VBQ1osSUFBTyxPQUFBLE9BQU9BLEdBQVAsS0FBZSxRQUF0QixDQUFBO0VBQ0QsR0FBQTtFQTNCWSxDQUFmOztNQ0VxQnNiO0VBQ25CLEVBQVlDLFNBQUFBLFlBQUFBLENBQUFBLE9BQVosRUFBcUJDLE1BQXJCLEVBQTZCO0VBQzNCLElBQUEsSUFBQSxDQUFLdFgsSUFBTCxHQUFZLElBQUl2QyxJQUFKLEVBQVosQ0FBQTtFQUNBLElBQUs0WixJQUFBQSxDQUFBQSxPQUFMLEdBQWVBLE9BQWYsQ0FBQTtFQUNBLElBQUtDLElBQUFBLENBQUFBLE1BQUwsR0FBY0EsTUFBZCxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtDLFVBQUwsR0FBa0I7RUFBRUMsTUFBQUEsUUFBUSxFQUFFLElBQUE7RUFBWixLQUFsQixDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUtwQixnQkFBTCxFQUFBLENBQUE7RUFDQSxJQUFLdFcsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLGNBQVosQ0FBQTtFQUNELEdBQUE7Ozs7RUFFRDJYLEVBQUFBLE1BQUFBLENBQUFBLFlBQUEsU0FBQSxTQUFBLENBQVVuWCxLQUFWLEVBQTZCb1gsU0FBN0IsRUFBNEM7RUFBQSxJQUFBLElBQWxDcFgsS0FBa0MsS0FBQSxLQUFBLENBQUEsRUFBQTtFQUFsQ0EsTUFBQUEsS0FBa0MsR0FBMUIsU0FBMEIsQ0FBQTtFQUFBLEtBQUE7O0VBQUEsSUFBQSxJQUFmb1gsU0FBZSxLQUFBLEtBQUEsQ0FBQSxFQUFBO0VBQWZBLE1BQUFBLFNBQWUsR0FBSCxDQUFHLENBQUE7RUFBQSxLQUFBOztFQUMxQyxJQUFBLElBQUEsQ0FBS0osTUFBTCxHQUFjO0VBQUVoWCxNQUFBQSxLQUFLLEVBQUxBLEtBQUY7RUFBU29YLE1BQUFBLFNBQVMsRUFBVEEsU0FBQUE7RUFBVCxLQUFkLENBQUE7RUFDRDs7RUFFRHRCLEVBQUFBLE1BQUFBLENBQUFBLG1CQUFBLFNBQW1CLGdCQUFBLEdBQUE7RUFBQSxJQUFBLElBQUEsS0FBQSxHQUFBLElBQUEsQ0FBQTs7RUFDakIsSUFBS3VCLElBQUFBLENBQUFBLG9CQUFMLEdBQTRCLFlBQU07RUFDaEMsTUFBQSxLQUFJLENBQUNDLGNBQUwsQ0FBb0J0YyxJQUFwQixDQUF5QixLQUF6QixDQUFBLENBQUE7RUFDRCxLQUZELENBQUE7O0VBSUEsSUFBS3VjLElBQUFBLENBQUFBLHlCQUFMLEdBQWlDLFlBQU07RUFDckMsTUFBQSxLQUFJLENBQUNDLG1CQUFMLENBQXlCeGMsSUFBekIsQ0FBOEIsS0FBOUIsQ0FBQSxDQUFBO0VBQ0QsS0FGRCxDQUFBOztFQUlBLElBQUEsSUFBQSxDQUFLeWMsb0JBQUwsR0FBNEIsVUFBQTVZLE9BQU8sRUFBSTtFQUNyQyxNQUFBLEtBQUksQ0FBQzZZLGNBQUwsQ0FBb0IxYyxJQUFwQixDQUF5QixLQUF6QixFQUErQjZELE9BQS9CLENBQUEsQ0FBQTtFQUNELEtBRkQsQ0FBQTs7RUFJQSxJQUFBLElBQUEsQ0FBSzhZLHNCQUFMLEdBQThCLFVBQUE5WSxPQUFPLEVBQUk7RUFDdkMsTUFBQSxLQUFJLENBQUMrWSxnQkFBTCxDQUFzQjVjLElBQXRCLENBQTJCLEtBQTNCLEVBQWlDNkQsT0FBakMsQ0FBQSxDQUFBO0VBQ0QsS0FGRCxDQUFBOztFQUlBLElBQUEsSUFBQSxDQUFLZ1osdUJBQUwsR0FBK0IsVUFBQTlVLFFBQVEsRUFBSTtFQUN6QyxNQUFBLEtBQUksQ0FBQytVLGlCQUFMLENBQXVCOWMsSUFBdkIsQ0FBNEIsS0FBNUIsRUFBa0MrSCxRQUFsQyxDQUFBLENBQUE7RUFDRCxLQUZELENBQUE7O0VBSUEsSUFBQSxJQUFBLENBQUtnVixzQkFBTCxHQUE4QixVQUFBaFYsUUFBUSxFQUFJO0VBQ3hDLE1BQUEsS0FBSSxDQUFDaVYsZ0JBQUwsQ0FBc0JoZCxJQUF0QixDQUEyQixLQUEzQixFQUFpQytILFFBQWpDLENBQUEsQ0FBQTtFQUNELEtBRkQsQ0FBQTs7RUFJQSxJQUFBLElBQUEsQ0FBS2tWLG9CQUFMLEdBQTRCLFVBQUFsVixRQUFRLEVBQUk7RUFDdEMsTUFBQSxLQUFJLENBQUNtVixjQUFMLENBQW9CbGQsSUFBcEIsQ0FBeUIsS0FBekIsRUFBK0IrSCxRQUEvQixDQUFBLENBQUE7RUFDRCxLQUZELENBQUE7RUFHRDs7V0FFRHFCLE9BQUEsU0FBSzlGLElBQUFBLENBQUFBLE1BQUwsRUFBYTtFQUNYLElBQUttRyxJQUFBQSxDQUFBQSxNQUFMLEdBQWNuRyxNQUFkLENBQUE7RUFFQUEsSUFBQUEsTUFBTSxDQUFDd0IsZ0JBQVAsQ0FBd0IsZUFBeEIsRUFBeUMsS0FBS3VYLG9CQUE5QyxDQUFBLENBQUE7RUFDQS9ZLElBQUFBLE1BQU0sQ0FBQ3dCLGdCQUFQLENBQXdCLHFCQUF4QixFQUErQyxLQUFLeVgseUJBQXBELENBQUEsQ0FBQTtFQUVBalosSUFBQUEsTUFBTSxDQUFDd0IsZ0JBQVAsQ0FBd0IsZUFBeEIsRUFBeUMsS0FBSzJYLG9CQUE5QyxDQUFBLENBQUE7RUFDQW5aLElBQUFBLE1BQU0sQ0FBQ3dCLGdCQUFQLENBQXdCLGlCQUF4QixFQUEyQyxLQUFLNlgsc0JBQWhELENBQUEsQ0FBQTtFQUVBclosSUFBQUEsTUFBTSxDQUFDd0IsZ0JBQVAsQ0FBd0Isa0JBQXhCLEVBQTRDLEtBQUsrWCx1QkFBakQsQ0FBQSxDQUFBO0VBQ0F2WixJQUFBQSxNQUFNLENBQUN3QixnQkFBUCxDQUF3QixpQkFBeEIsRUFBMkMsS0FBS2lZLHNCQUFoRCxDQUFBLENBQUE7RUFDQXpaLElBQUFBLE1BQU0sQ0FBQ3dCLGdCQUFQLENBQXdCLGVBQXhCLEVBQXlDLEtBQUttWSxvQkFBOUMsQ0FBQSxDQUFBO0VBQ0Q7O0VBRURsZ0IsRUFBQUEsTUFBQUEsQ0FBQUEsU0FBQSxTQUFPVixNQUFBQSxDQUFBQSxLQUFQLEVBQWNDLE1BQWQsRUFBc0I7O0VBRXRCOEUsRUFBQUEsTUFBQUEsQ0FBQUEsVUFBQSxTQUFVLE9BQUEsR0FBQTtFQUNSLElBQUEsSUFBQSxDQUFLbUksTUFBTCxFQUFBLENBQUE7RUFDQSxJQUFLN0UsSUFBQUEsQ0FBQUEsSUFBTCxDQUFVdEQsT0FBVixFQUFBLENBQUE7RUFDQSxJQUFLc0QsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZLElBQVosQ0FBQTtFQUNBLElBQUtxWCxJQUFBQSxDQUFBQSxPQUFMLEdBQWUsSUFBZixDQUFBO0VBQ0EsSUFBS0MsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNEOztXQUVEelMsU0FBQSxTQUFPakcsTUFBQUEsQ0FBQUEsTUFBUCxFQUFlO0VBQ2IsSUFBQSxJQUFBLENBQUttRyxNQUFMLENBQVk3RCxtQkFBWixDQUFnQyxlQUFoQyxFQUFpRCxLQUFLeVcsb0JBQXRELENBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLNVMsTUFBTCxDQUFZN0QsbUJBQVosQ0FBZ0MscUJBQWhDLEVBQXVELEtBQUsyVyx5QkFBNUQsQ0FBQSxDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUs5UyxNQUFMLENBQVk3RCxtQkFBWixDQUFnQyxlQUFoQyxFQUFpRCxLQUFLNlcsb0JBQXRELENBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLaFQsTUFBTCxDQUFZN0QsbUJBQVosQ0FBZ0MsaUJBQWhDLEVBQW1ELEtBQUsrVyxzQkFBeEQsQ0FBQSxDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUtsVCxNQUFMLENBQVk3RCxtQkFBWixDQUFnQyxrQkFBaEMsRUFBb0QsS0FBS2lYLHVCQUF6RCxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS3BULE1BQUwsQ0FBWTdELG1CQUFaLENBQWdDLGlCQUFoQyxFQUFtRCxLQUFLbVgsc0JBQXhELENBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLdFQsTUFBTCxDQUFZN0QsbUJBQVosQ0FBZ0MsZUFBaEMsRUFBaUQsS0FBS3FYLG9CQUF0RCxDQUFBLENBQUE7RUFFQSxJQUFLeFQsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNEOztXQUVENlMsaUJBQUEsU0FBaUIsY0FBQSxHQUFBOztXQUNqQkUsc0JBQUEsU0FBc0IsbUJBQUEsR0FBQTs7RUFFdEJFLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQUEsY0FBQSxDQUFlN1ksT0FBZixFQUF3Qjs7RUFDeEIrWSxFQUFBQSxNQUFBQSxDQUFBQSxtQkFBQSxTQUFBLGdCQUFBLENBQWlCL1ksT0FBakIsRUFBMEI7O0VBRTFCaVosRUFBQUEsTUFBQUEsQ0FBQUEsb0JBQUEsU0FBQSxpQkFBQSxDQUFrQi9VLFFBQWxCLEVBQTRCOztFQUM1QmlWLEVBQUFBLE1BQUFBLENBQUFBLG1CQUFBLFNBQUEsZ0JBQUEsQ0FBaUJqVixRQUFqQixFQUEyQjs7RUFDM0JtVixFQUFBQSxNQUFBQSxDQUFBQSxpQkFBQSxTQUFBLGNBQUEsQ0FBZW5WLFFBQWYsRUFBeUI7Ozs7O01DdkZOb1Y7OztFQUNuQixFQUFBLFNBQUEsY0FBQSxDQUFZcEIsT0FBWixFQUFxQjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ25CLElBQUEsS0FBQSxHQUFBLGFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFNQSxPQUFOLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLQyxLQUFBQSxDQUFBQSxNQUFMLEdBQWMsSUFBZCxDQUFBO0VBQ0EsSUFBSzVkLEtBQUFBLENBQUFBLE9BQUwsR0FBZSxLQUFLMmQsQ0FBQUEsT0FBTCxDQUFheGMsVUFBYixDQUF3QixJQUF4QixDQUFmLENBQUE7RUFDQSxJQUFLNmQsS0FBQUEsQ0FBQUEsV0FBTCxHQUFtQixFQUFuQixDQUFBO0VBQ0EsSUFBSzVZLEtBQUFBLENBQUFBLElBQUwsR0FBWSxnQkFBWixDQUFBO0VBTm1CLElBQUEsT0FBQSxLQUFBLENBQUE7RUFPcEIsR0FBQTs7OztFQUVEekgsRUFBQUEsTUFBQUEsQ0FBQUEsU0FBQSxTQUFBLE1BQUEsQ0FBT1YsS0FBUCxFQUFjQyxNQUFkLEVBQXNCO0VBQ3BCLElBQUEsSUFBQSxDQUFLeWYsT0FBTCxDQUFhMWYsS0FBYixHQUFxQkEsS0FBckIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLMGYsT0FBTCxDQUFhemYsTUFBYixHQUFzQkEsTUFBdEIsQ0FBQTtFQUNEOztFQUVEZ2dCLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQWlCLGNBQUEsR0FBQTtFQUNmLElBQUEsSUFBQSxDQUFLbGUsT0FBTCxDQUFhSyxTQUFiLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLElBQUtzZCxDQUFBQSxPQUFMLENBQWExZixLQUExQyxFQUFpRCxJQUFLMGYsQ0FBQUEsT0FBTCxDQUFhemYsTUFBOUQsQ0FBQSxDQUFBO0VBQ0Q7O1dBRUR3Z0Isb0JBQUEsU0FBa0IvVSxpQkFBQUEsQ0FBQUEsUUFBbEIsRUFBNEI7RUFDMUIsSUFBSUEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQnpDLE1BQUFBLE9BQU8sQ0FBQ3hDLGVBQVIsQ0FBd0JxSixRQUFRLENBQUNwRSxJQUFqQyxFQUF1QyxJQUFBLENBQUswWixXQUE1QyxFQUF5RHRWLFFBQXpELENBQUEsQ0FBQTtFQUNELEtBRkQsTUFFTztFQUNMQSxNQUFBQSxRQUFRLENBQUMvQyxLQUFULEdBQWlCK0MsUUFBUSxDQUFDL0MsS0FBVCxJQUFrQixTQUFuQyxDQUFBO0VBQ0QsS0FBQTtFQUNGOztXQUVEZ1ksbUJBQUEsU0FBaUJqVixnQkFBQUEsQ0FBQUEsUUFBakIsRUFBMkI7RUFDekIsSUFBSUEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQixNQUFJMlosSUFBQUEsS0FBSyxDQUFDN0IsT0FBTixDQUFjMVQsUUFBUSxDQUFDcEUsSUFBdkIsQ0FBSixFQUFrQztFQUNoQyxRQUFLcEYsSUFBQUEsQ0FBQUEsU0FBTCxDQUFld0osUUFBZixDQUFBLENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FKRCxNQUlPO0VBQ0wsTUFBS3dWLElBQUFBLENBQUFBLFVBQUwsQ0FBZ0J4VixRQUFoQixDQUFBLENBQUE7RUFDRCxLQUFBO0VBQ0Y7O1dBRURtVixpQkFBQSxTQUFlblYsY0FBQUEsQ0FBQUEsUUFBZixFQUF5QjtFQUN2QkEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxHQUFnQixJQUFoQixDQUFBO0VBQ0Q7OztFQUdEMFosRUFBQUEsTUFBQUEsQ0FBQUEsY0FBQSxTQUFBLFdBQUEsQ0FBWTFlLEdBQVosRUFBaUJvSixRQUFqQixFQUEyQjtFQUN6QkEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxHQUFnQmhGLEdBQWhCLENBQUE7RUFDRDs7O1dBR0RKLFlBQUEsU0FBVXdKLFNBQUFBLENBQUFBLFFBQVYsRUFBb0I7RUFDbEIsSUFBQSxJQUFNMkYsQ0FBQyxHQUFJM0YsUUFBUSxDQUFDcEUsSUFBVCxDQUFjdEgsS0FBZCxHQUFzQjBMLFFBQVEsQ0FBQzFLLEtBQWhDLEdBQXlDLENBQW5ELENBQUE7RUFDQSxJQUFBLElBQU0rUyxDQUFDLEdBQUlySSxRQUFRLENBQUNwRSxJQUFULENBQWNySCxNQUFkLEdBQXVCeUwsUUFBUSxDQUFDMUssS0FBakMsR0FBMEMsQ0FBcEQsQ0FBQTtFQUNBLElBQU1GLElBQUFBLENBQUMsR0FBRzRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZXVRLENBQUMsR0FBRyxDQUE3QixDQUFBO0VBQ0EsSUFBTXRRLElBQUFBLENBQUMsR0FBRzJLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZWdULENBQUMsR0FBRyxDQUE3QixDQUFBOztFQUVBLElBQUEsSUFBSSxDQUFDLENBQUNySSxRQUFRLENBQUMvQyxLQUFmLEVBQXNCO0VBQ3BCLE1BQUksSUFBQSxDQUFDK0MsUUFBUSxDQUFDOEcsSUFBVCxDQUFjLFFBQWQsQ0FBTCxFQUE4QjlHLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJPLE1BQWQsR0FBdUIsSUFBS0MsQ0FBQUEsWUFBTCxDQUFrQjFWLFFBQVEsQ0FBQ3BFLElBQTNCLENBQXZCLENBQUE7RUFFOUIsTUFBTStaLElBQUFBLFVBQVUsR0FBRzNWLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJPLE1BQWQsQ0FBcUJqZSxVQUFyQixDQUFnQyxJQUFoQyxDQUFuQixDQUFBO0VBQ0FtZSxNQUFBQSxVQUFVLENBQUNqZixTQUFYLENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCc0osUUFBUSxDQUFDOEcsSUFBVCxDQUFjMk8sTUFBZCxDQUFxQm5oQixLQUFoRCxFQUF1RDBMLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJPLE1BQWQsQ0FBcUJsaEIsTUFBNUUsQ0FBQSxDQUFBO0VBQ0FvaEIsTUFBQUEsVUFBVSxDQUFDQyxXQUFYLEdBQXlCNVYsUUFBUSxDQUFDMkcsS0FBbEMsQ0FBQTtFQUNBZ1AsTUFBQUEsVUFBVSxDQUFDbmYsU0FBWCxDQUFxQndKLFFBQVEsQ0FBQ3BFLElBQTlCLEVBQW9DLENBQXBDLEVBQXVDLENBQXZDLENBQUEsQ0FBQTtFQUVBK1osTUFBQUEsVUFBVSxDQUFDRSx3QkFBWCxHQUFzQyxhQUF0QyxDQUFBO0VBQ0FGLE1BQUFBLFVBQVUsQ0FBQ0csU0FBWCxHQUF1QnZHLFNBQVMsQ0FBQzlHLFFBQVYsQ0FBbUJ6SSxRQUFRLENBQUMrRyxHQUE1QixDQUF2QixDQUFBO0VBQ0E0TyxNQUFBQSxVQUFVLENBQUNJLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIvVixRQUFRLENBQUM4RyxJQUFULENBQWMyTyxNQUFkLENBQXFCbmhCLEtBQS9DLEVBQXNEMEwsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMk8sTUFBZCxDQUFxQmxoQixNQUEzRSxDQUFBLENBQUE7RUFDQW9oQixNQUFBQSxVQUFVLENBQUNFLHdCQUFYLEdBQXNDLGFBQXRDLENBQUE7RUFDQUYsTUFBQUEsVUFBVSxDQUFDQyxXQUFYLEdBQXlCLENBQXpCLENBQUE7RUFFQSxNQUFBLElBQUEsQ0FBS3ZmLE9BQUwsQ0FBYUcsU0FBYixDQUNFd0osUUFBUSxDQUFDOEcsSUFBVCxDQUFjMk8sTUFEaEIsRUFFRSxDQUZGLEVBR0UsQ0FIRixFQUlFelYsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMk8sTUFBZCxDQUFxQm5oQixLQUp2QixFQUtFMEwsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMk8sTUFBZCxDQUFxQmxoQixNQUx2QixFQU1FYSxDQU5GLEVBT0VDLENBUEYsRUFRRXNRLENBUkYsRUFTRTBDLENBVEYsQ0FBQSxDQUFBO0VBV0QsS0F6QkQsTUF5Qk87RUFDTCxNQUFLaFMsSUFBQUEsQ0FBQUEsT0FBTCxDQUFhMmYsSUFBYixFQUFBLENBQUE7RUFFQSxNQUFBLElBQUEsQ0FBSzNmLE9BQUwsQ0FBYXVmLFdBQWIsR0FBMkI1VixRQUFRLENBQUMyRyxLQUFwQyxDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUt0USxPQUFMLENBQWE0ZixTQUFiLENBQXVCalcsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBbEMsRUFBcUM0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFoRCxDQUFBLENBQUE7RUFDQSxNQUFLZ0IsSUFBQUEsQ0FBQUEsT0FBTCxDQUFhZCxNQUFiLENBQW9CK0ksUUFBUSxDQUFDa0IsZUFBVCxDQUF5QlEsUUFBUSxDQUFDd0gsUUFBbEMsQ0FBcEIsQ0FBQSxDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUtuUixPQUFMLENBQWE0ZixTQUFiLENBQXVCLENBQUNqVyxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFuQyxFQUFzQyxDQUFDNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBbEQsQ0FBQSxDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUtnQixPQUFMLENBQWFHLFNBQWIsQ0FBdUJ3SixRQUFRLENBQUNwRSxJQUFoQyxFQUFzQyxDQUF0QyxFQUF5QyxDQUF6QyxFQUE0Q29FLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3RILEtBQTFELEVBQWlFMEwsUUFBUSxDQUFDcEUsSUFBVCxDQUFjckgsTUFBL0UsRUFBdUZhLENBQXZGLEVBQTBGQyxDQUExRixFQUE2RnNRLENBQTdGLEVBQWdHMEMsQ0FBaEcsQ0FBQSxDQUFBO0VBRUEsTUFBQSxJQUFBLENBQUtoUyxPQUFMLENBQWF1ZixXQUFiLEdBQTJCLENBQTNCLENBQUE7RUFDQSxNQUFLdmYsSUFBQUEsQ0FBQUEsT0FBTCxDQUFhNmYsT0FBYixFQUFBLENBQUE7RUFDRCxLQUFBO0VBQ0Y7OztXQUdEVixhQUFBLFNBQVd4VixVQUFBQSxDQUFBQSxRQUFYLEVBQXFCO0VBQ25CLElBQUlBLElBQUFBLFFBQVEsQ0FBQytHLEdBQWIsRUFBa0I7RUFDaEIsTUFBSzFRLElBQUFBLENBQUFBLE9BQUwsQ0FBYXlmLFNBQWIsR0FBaUM5VixPQUFBQSxHQUFBQSxRQUFRLENBQUMrRyxHQUFULENBQWE5RCxDQUE5QyxHQUFBLEdBQUEsR0FBbURqRCxRQUFRLENBQUMrRyxHQUFULENBQWE3RCxDQUFoRSxHQUFxRWxELEdBQUFBLEdBQUFBLFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlULENBQWxGLEdBQUEsR0FBQSxHQUF1RitNLFFBQVEsQ0FBQzJHLEtBQWhHLEdBQUEsR0FBQSxDQUFBO0VBQ0QsS0FGRCxNQUVPO0VBQ0wsTUFBQSxJQUFBLENBQUt0USxPQUFMLENBQWF5ZixTQUFiLEdBQXlCOVYsUUFBUSxDQUFDL0MsS0FBbEMsQ0FBQTtFQUNELEtBTGtCOzs7RUFRbkIsSUFBSzVHLElBQUFBLENBQUFBLE9BQUwsQ0FBYThmLFNBQWIsRUFBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUs5ZixPQUFMLENBQWErZixHQUFiLENBQWlCcFcsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBNUIsRUFBK0I0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUExQyxFQUE2QzJLLFFBQVEsQ0FBQ3VILE1BQXRELEVBQThELENBQTlELEVBQWlFL1UsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQTNFLEVBQThFLElBQTlFLENBQUEsQ0FBQTs7RUFFQSxJQUFJLElBQUEsSUFBQSxDQUFLOFYsTUFBVCxFQUFpQjtFQUNmLE1BQUEsSUFBQSxDQUFLNWQsT0FBTCxDQUFhZ2dCLFdBQWIsR0FBMkIsSUFBS3BDLENBQUFBLE1BQUwsQ0FBWWhYLEtBQXZDLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBSzVHLE9BQUwsQ0FBYWlnQixTQUFiLEdBQXlCLElBQUtyQyxDQUFBQSxNQUFMLENBQVlJLFNBQXJDLENBQUE7RUFDQSxNQUFLaGUsSUFBQUEsQ0FBQUEsT0FBTCxDQUFhNGQsTUFBYixFQUFBLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUs1ZCxJQUFBQSxDQUFBQSxPQUFMLENBQWFrZ0IsU0FBYixFQUFBLENBQUE7RUFDQSxJQUFLbGdCLElBQUFBLENBQUFBLE9BQUwsQ0FBYW1nQixJQUFiLEVBQUEsQ0FBQTtFQUNEOzs7V0FHRGQsZUFBQSxTQUFhcGYsWUFBQUEsQ0FBQUEsS0FBYixFQUFvQjtFQUNsQixJQUFBLElBQUlpZixLQUFLLENBQUM3QixPQUFOLENBQWNwZCxLQUFkLENBQUosRUFBMEI7RUFDeEIsTUFBTW1nQixJQUFBQSxJQUFJLEdBQUduZ0IsS0FBSyxDQUFDaEMsS0FBTixHQUFjLEdBQWQsR0FBb0JnQyxLQUFLLENBQUMvQixNQUF2QyxDQUFBO0VBQ0EsTUFBQSxJQUFJK0MsTUFBTSxHQUFHLElBQUEsQ0FBSytkLFdBQUwsQ0FBaUJvQixJQUFqQixDQUFiLENBQUE7O0VBRUEsTUFBSSxJQUFBLENBQUNuZixNQUFMLEVBQWE7RUFDWEEsUUFBQUEsTUFBTSxHQUFHNUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQVQsQ0FBQTtFQUNBMkMsUUFBQUEsTUFBTSxDQUFDaEQsS0FBUCxHQUFlZ0MsS0FBSyxDQUFDaEMsS0FBckIsQ0FBQTtFQUNBZ0QsUUFBQUEsTUFBTSxDQUFDL0MsTUFBUCxHQUFnQitCLEtBQUssQ0FBQy9CLE1BQXRCLENBQUE7RUFDQSxRQUFBLElBQUEsQ0FBSzhnQixXQUFMLENBQWlCb0IsSUFBakIsQ0FBQSxHQUF5Qm5mLE1BQXpCLENBQUE7RUFDRCxPQUFBOztFQUVELE1BQUEsT0FBT0EsTUFBUCxDQUFBO0VBQ0QsS0FBQTtFQUNGOztFQUVEK0IsRUFBQUEsTUFBQUEsQ0FBQUEsVUFBQSxTQUFVLE9BQUEsR0FBQTtFQUNSLElBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTUEsT0FBTixDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTs7RUFDQSxJQUFLNGEsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNBLElBQUs1ZCxJQUFBQSxDQUFBQSxPQUFMLEdBQWUsSUFBZixDQUFBO0VBQ0EsSUFBS2dmLElBQUFBLENBQUFBLFdBQUwsR0FBbUIsSUFBbkIsQ0FBQTtFQUNEOzs7SUF4SXlDdEI7O01DRnZCMkM7OztFQUNuQixFQUFBLFNBQUEsV0FBQSxDQUFZMUMsT0FBWixFQUFxQjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ25CLElBQUEsS0FBQSxHQUFBLGFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFNQSxPQUFOLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLQyxLQUFBQSxDQUFBQSxNQUFMLEdBQWMsSUFBZCxDQUFBO0VBQ0EsSUFBS3ZlLEtBQUFBLENBQUFBLFdBQUwsR0FBbUIsS0FBbkIsQ0FBQTs7RUFDQSxJQUFBLEtBQUEsQ0FBS2lILElBQUwsQ0FBVTFCLE1BQVYsR0FBbUIsVUFBQ1csSUFBRCxFQUFPb0UsUUFBUCxFQUFBO0VBQUEsTUFBQSxPQUFvQixNQUFLMlcsVUFBTCxDQUFnQi9hLElBQWhCLEVBQXNCb0UsUUFBdEIsQ0FBcEIsQ0FBQTtFQUFBLEtBQW5CLENBQUE7O0VBQ0EsSUFBQSxLQUFBLENBQUtzVixXQUFMLEdBQW1CLEtBQUEsQ0FBS0EsV0FBTCxDQUFpQnRjLElBQWpCLENBQW5CLHNCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtFQUVBLElBQUt5RCxLQUFBQSxDQUFBQSxJQUFMLEdBQVksYUFBWixDQUFBO0VBUm1CLElBQUEsT0FBQSxLQUFBLENBQUE7RUFTcEIsR0FBQTs7OztXQUVEc1ksb0JBQUEsU0FBa0IvVSxpQkFBQUEsQ0FBQUEsUUFBbEIsRUFBNEI7RUFDMUIsSUFBSUEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQnpDLE1BQUFBLE9BQU8sQ0FBQ3hDLGVBQVIsQ0FBd0JxSixRQUFRLENBQUNwRSxJQUFqQyxFQUF1QyxJQUFBLENBQUswWixXQUE1QyxFQUF5RHRWLFFBQXpELENBQUEsQ0FBQTtFQUNELEtBRkQsTUFFTztFQUNMQSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULEdBQWdCLElBQUtlLENBQUFBLElBQUwsQ0FBVW5DLEdBQVYsQ0FBYyxJQUFBLENBQUswWixVQUFuQixFQUErQmxVLFFBQS9CLENBQWhCLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS2dVLE9BQUwsQ0FBYTdXLFdBQWIsQ0FBeUI2QyxRQUFRLENBQUNwRSxJQUFsQyxDQUFBLENBQUE7RUFDRCxLQUFBO0VBQ0Y7O1dBRURxWixtQkFBQSxTQUFpQmpWLGdCQUFBQSxDQUFBQSxRQUFqQixFQUEyQjtFQUN6QixJQUFBLElBQUksSUFBSzRXLENBQUFBLFNBQUwsQ0FBZTVXLFFBQWYsQ0FBSixFQUE4QjtFQUM1QixNQUFJLElBQUEsSUFBQSxDQUFLdEssV0FBVCxFQUFzQjtFQUNwQjZCLFFBQUFBLE9BQU8sQ0FBQzdCLFdBQVIsQ0FBb0JzSyxRQUFRLENBQUNwRSxJQUE3QixFQUFtQ29FLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQTlDLEVBQWlENEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBNUQsRUFBK0QySyxRQUFRLENBQUMxSyxLQUF4RSxFQUErRTBLLFFBQVEsQ0FBQ3dILFFBQXhGLENBQUEsQ0FBQTtFQUNELE9BRkQsTUFFTztFQUNMalEsUUFBQUEsT0FBTyxDQUFDekMsU0FBUixDQUFrQmtMLFFBQVEsQ0FBQ3BFLElBQTNCLEVBQWlDb0UsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBNUMsRUFBK0M0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUExRCxFQUE2RDJLLFFBQVEsQ0FBQzFLLEtBQXRFLEVBQTZFMEssUUFBUSxDQUFDd0gsUUFBdEYsQ0FBQSxDQUFBO0VBQ0QsT0FBQTs7RUFFRHhILE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY2hILEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCbUwsUUFBUSxDQUFDMkcsS0FBdkMsQ0FBQTs7RUFFQSxNQUFBLElBQUkzRyxRQUFRLENBQUNwRSxJQUFULENBQWN1WSxRQUFsQixFQUE0QjtFQUMxQm5VLFFBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY2hILEtBQWQsQ0FBb0JpaUIsZUFBcEIsR0FBc0M3VyxRQUFRLENBQUMvQyxLQUFULElBQWtCLFNBQXhELENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FBQTtFQUNGOztXQUVEa1ksaUJBQUEsU0FBZW5WLGNBQUFBLENBQUFBLFFBQWYsRUFBeUI7RUFDdkIsSUFBQSxJQUFJLElBQUs0VyxDQUFBQSxTQUFMLENBQWU1VyxRQUFmLENBQUosRUFBOEI7RUFDNUIsTUFBQSxJQUFBLENBQUtnVSxPQUFMLENBQWF4VyxXQUFiLENBQXlCd0MsUUFBUSxDQUFDcEUsSUFBbEMsQ0FBQSxDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUtlLElBQUwsQ0FBVTdCLE1BQVYsQ0FBaUJrRixRQUFRLENBQUNwRSxJQUExQixDQUFBLENBQUE7RUFDQW9FLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBaEIsQ0FBQTtFQUNELEtBQUE7RUFDRjs7V0FFRGdiLFlBQUEsU0FBVTVXLFNBQUFBLENBQUFBLFFBQVYsRUFBb0I7RUFDbEIsSUFBQSxPQUFPLE9BQU9BLFFBQVEsQ0FBQ3BFLElBQWhCLEtBQXlCLFFBQXpCLElBQXFDb0UsUUFBUSxDQUFDcEUsSUFBOUMsSUFBc0QsQ0FBQ29FLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBYzFCLE9BQTVFLENBQUE7RUFDRDs7O0VBR0RvYixFQUFBQSxNQUFBQSxDQUFBQSxjQUFBLFNBQUEsV0FBQSxDQUFZMWUsR0FBWixFQUFpQm9KLFFBQWpCLEVBQTJCO0VBQ3pCLElBQUlBLElBQUFBLFFBQVEsQ0FBQ29ILElBQWIsRUFBbUIsT0FBQTtFQUNuQnBILElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBS2UsQ0FBQUEsSUFBTCxDQUFVbkMsR0FBVixDQUFjNUQsR0FBZCxFQUFtQm9KLFFBQW5CLENBQWhCLENBQUE7RUFDQXpJLElBQUFBLE9BQU8sQ0FBQ3ZDLE1BQVIsQ0FBZWdMLFFBQVEsQ0FBQ3BFLElBQXhCLEVBQThCaEYsR0FBRyxDQUFDdEMsS0FBbEMsRUFBeUNzQyxHQUFHLENBQUNyQyxNQUE3QyxDQUFBLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBS3lmLE9BQUwsQ0FBYTdXLFdBQWIsQ0FBeUI2QyxRQUFRLENBQUNwRSxJQUFsQyxDQUFBLENBQUE7RUFDRDs7RUFFRCthLEVBQUFBLE1BQUFBLENBQUFBLGFBQUEsU0FBQSxVQUFBLENBQVcvYSxJQUFYLEVBQWlCb0UsUUFBakIsRUFBMkI7RUFDekIsSUFBSXBFLElBQUFBLElBQUksQ0FBQ3VZLFFBQVQsRUFBbUIsT0FBTyxJQUFLMkMsQ0FBQUEsWUFBTCxDQUFrQjlXLFFBQWxCLENBQVAsQ0FBQTtFQUNuQixJQUFBLE9BQU8sS0FBSytXLFlBQUwsQ0FBa0JuYixJQUFsQixFQUF3Qm9FLFFBQXhCLENBQVAsQ0FBQTtFQUNEOzs7V0FHRDhXLGVBQUEsU0FBYTlXLFlBQUFBLENBQUFBLFFBQWIsRUFBdUI7RUFDckIsSUFBQSxJQUFNdkwsR0FBRyxHQUFHOEMsT0FBTyxDQUFDeEMsU0FBUixDQUFxQmlMLFFBQVEsQ0FBQzNMLEVBQTlCLFdBQXdDLENBQUkyTCxHQUFBQSxRQUFRLENBQUN1SCxNQUFyRCxFQUE2RCxJQUFJdkgsUUFBUSxDQUFDdUgsTUFBMUUsQ0FBWixDQUFBO0VBQ0E5UyxJQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVW9pQixZQUFWLEdBQTRCaFgsUUFBUSxDQUFDdUgsTUFBckMsR0FBQSxJQUFBLENBQUE7O0VBRUEsSUFBSSxJQUFBLElBQUEsQ0FBSzBNLE1BQVQsRUFBaUI7RUFDZnhmLE1BQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVcWlCLFdBQVYsR0FBd0IsSUFBQSxDQUFLaEQsTUFBTCxDQUFZaFgsS0FBcEMsQ0FBQTtFQUNBeEksTUFBQUEsR0FBRyxDQUFDRyxLQUFKLENBQVVzaUIsV0FBVixHQUEyQixJQUFBLENBQUtqRCxNQUFMLENBQVlJLFNBQXZDLEdBQUEsSUFBQSxDQUFBO0VBQ0QsS0FBQTs7RUFDRDVmLElBQUFBLEdBQUcsQ0FBQzBmLFFBQUosR0FBZSxJQUFmLENBQUE7RUFFQSxJQUFBLE9BQU8xZixHQUFQLENBQUE7RUFDRDs7RUFFRHNpQixFQUFBQSxNQUFBQSxDQUFBQSxlQUFBLFNBQUEsWUFBQSxDQUFhbmIsSUFBYixFQUFtQm9FLFFBQW5CLEVBQTZCO0VBQzNCLElBQU1tWCxJQUFBQSxHQUFHLEdBQUcsT0FBT3ZiLElBQVAsS0FBZ0IsUUFBaEIsR0FBMkJBLElBQTNCLEdBQWtDQSxJQUFJLENBQUM3RSxHQUFuRCxDQUFBO0VBQ0EsSUFBQSxJQUFNdEMsR0FBRyxHQUFHOEMsT0FBTyxDQUFDeEMsU0FBUixDQUFxQmlMLFFBQVEsQ0FBQzNMLEVBQTlCLEdBQUEsTUFBQSxFQUF3Q3VILElBQUksQ0FBQ3RILEtBQTdDLEVBQW9Ec0gsSUFBSSxDQUFDckgsTUFBekQsQ0FBWixDQUFBO0VBQ0FFLElBQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVd2lCLGVBQVYsWUFBbUNELEdBQW5DLEdBQUEsR0FBQSxDQUFBO0VBRUEsSUFBQSxPQUFPMWlCLEdBQVAsQ0FBQTtFQUNEOztFQUVENEUsRUFBQUEsTUFBQUEsQ0FBQUEsVUFBQSxTQUFVLE9BQUEsR0FBQTtFQUNSLElBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTUEsT0FBTixDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTs7RUFDQSxJQUFLNGEsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNEOzs7SUF4RnNDRjs7TUNEcEJzRDs7O0VBQ25CLEVBQVlyRCxTQUFBQSxhQUFBQSxDQUFBQSxPQUFaLEVBQXFCQyxNQUFyQixFQUE2QjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQzNCLElBQUEsS0FBQSxHQUFBLGFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFNRCxPQUFOLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLQyxLQUFBQSxDQUFBQSxNQUFMLEdBQWNBLE1BQWQsQ0FBQTtFQUNBLElBQUt4WCxLQUFBQSxDQUFBQSxJQUFMLEdBQVksZUFBWixDQUFBO0VBSjJCLElBQUEsT0FBQSxLQUFBLENBQUE7RUFLNUIsR0FBQTs7OztXQUVEc1ksb0JBQUEsU0FBa0IvVSxpQkFBQUEsQ0FBQUEsUUFBbEIsRUFBNEI7RUFDMUIsSUFBSUEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQixNQUFLbWIsSUFBQUEsQ0FBQUEsWUFBTCxDQUFrQi9XLFFBQWxCLENBQUEsQ0FBQTtFQUNELEtBRkQsTUFFTztFQUNMLE1BQUs4VyxJQUFBQSxDQUFBQSxZQUFMLENBQWtCOVcsUUFBbEIsQ0FBQSxDQUFBO0VBQ0QsS0FBQTs7RUFFRCxJQUFBLElBQUEsQ0FBS2dVLE9BQUwsQ0FBYXNELFFBQWIsQ0FBc0J0WCxRQUFRLENBQUNwRSxJQUEvQixDQUFBLENBQUE7RUFDRDs7V0FFRHFaLG1CQUFBLFNBQWlCalYsZ0JBQUFBLENBQUFBLFFBQWpCLEVBQTJCO0VBQ3pCLElBQUlBLElBQUFBLFFBQVEsQ0FBQ3BFLElBQWIsRUFBbUI7RUFDakJvRSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWN4RyxDQUFkLEdBQWtCNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBN0IsQ0FBQTtFQUNBNEssTUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxDQUFjdkcsQ0FBZCxHQUFrQjJLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQTdCLENBQUE7RUFFQTJLLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBYytLLEtBQWQsR0FBc0IzRyxRQUFRLENBQUMyRyxLQUEvQixDQUFBO0VBQ0EzRyxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWMyYixNQUFkLEdBQXVCdlgsUUFBUSxDQUFDcEUsSUFBVCxDQUFjNGIsTUFBZCxHQUF1QnhYLFFBQVEsQ0FBQzFLLEtBQXZELENBQUE7RUFDQTBLLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBYzRMLFFBQWQsR0FBeUJ4SCxRQUFRLENBQUN3SCxRQUFsQyxDQUFBO0VBQ0QsS0FBQTtFQUNGOztXQUVEMk4saUJBQUEsU0FBZW5WLGNBQUFBLENBQUFBLFFBQWYsRUFBeUI7RUFDdkIsSUFBSUEsSUFBQUEsUUFBUSxDQUFDcEUsSUFBYixFQUFtQjtFQUNqQm9FLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBYzhGLE1BQWQsSUFBd0IxQixRQUFRLENBQUNwRSxJQUFULENBQWM4RixNQUFkLENBQXFCbEUsV0FBckIsQ0FBaUN3QyxRQUFRLENBQUNwRSxJQUExQyxDQUF4QixDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUtlLElBQUwsQ0FBVTdCLE1BQVYsQ0FBaUJrRixRQUFRLENBQUNwRSxJQUExQixDQUFBLENBQUE7RUFDQW9FLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBaEIsQ0FBQTtFQUNELEtBQUE7O0VBRUQsSUFBSW9FLElBQUFBLFFBQVEsQ0FBQ3lYLFFBQWIsRUFBdUIsSUFBQSxDQUFLOWEsSUFBTCxDQUFVN0IsTUFBVixDQUFpQmtGLFFBQVEsQ0FBQ3lYLFFBQTFCLENBQUEsQ0FBQTtFQUN4Qjs7O1dBR0RWLGVBQUEsU0FBYS9XLFlBQUFBLENBQUFBLFFBQWIsRUFBdUI7RUFDckJBLElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBS2UsQ0FBQUEsSUFBTCxDQUFVbkMsR0FBVixDQUFjd0YsUUFBUSxDQUFDcEUsSUFBdkIsQ0FBaEIsQ0FBQTtFQUVBLElBQUEsSUFBSW9FLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBYzhGLE1BQWxCLEVBQTBCLE9BQUE7O0VBQzFCLElBQUEsSUFBSTFCLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBYyxPQUFkLENBQUosRUFBNEI7RUFDMUJvRSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWM4YixJQUFkLEdBQXFCMVgsUUFBUSxDQUFDcEUsSUFBVCxDQUFjdEYsS0FBZCxDQUFvQmhDLEtBQXBCLEdBQTRCLENBQWpELENBQUE7RUFDQTBMLE1BQUFBLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBYytiLElBQWQsR0FBcUIzWCxRQUFRLENBQUNwRSxJQUFULENBQWN0RixLQUFkLENBQW9CL0IsTUFBcEIsR0FBNkIsQ0FBbEQsQ0FBQTtFQUNELEtBQUE7RUFDRjs7V0FFRHVpQixlQUFBLFNBQWE5VyxZQUFBQSxDQUFBQSxRQUFiLEVBQXVCO0VBQ3JCLElBQU15WCxJQUFBQSxRQUFRLEdBQUcsSUFBQSxDQUFLOWEsSUFBTCxDQUFVbkMsR0FBVixDQUFjb2QsUUFBUSxDQUFDQyxRQUF2QixDQUFqQixDQUFBOztFQUVBLElBQUksSUFBQSxJQUFBLENBQUs1RCxNQUFULEVBQWlCO0VBQ2YsTUFBQSxJQUFJc0IsS0FBSyxDQUFDekIsUUFBTixDQUFlLElBQUtHLENBQUFBLE1BQXBCLENBQUosRUFBaUM7RUFDL0J3RCxRQUFBQSxRQUFRLENBQUNLLFdBQVQsQ0FBcUIsS0FBSzdELE1BQTFCLENBQUEsQ0FBQTtFQUNELE9BRkQsTUFFTztFQUNMd0QsUUFBQUEsUUFBUSxDQUFDSyxXQUFULENBQXFCLFNBQXJCLENBQUEsQ0FBQTtFQUNELE9BQUE7RUFDRixLQUFBOztFQUNETCxJQUFBQSxRQUFRLENBQUNNLFNBQVQsQ0FBbUIvWCxRQUFRLENBQUMvQyxLQUFULElBQWtCLFNBQXJDLENBQWdEdVksQ0FBQUEsVUFBaEQsQ0FBMkQsQ0FBM0QsRUFBOEQsQ0FBOUQsRUFBaUV4VixRQUFRLENBQUN1SCxNQUExRSxDQUFBLENBQUE7RUFDQSxJQUFBLElBQU15USxLQUFLLEdBQUcsSUFBS3JiLENBQUFBLElBQUwsQ0FBVW5DLEdBQVYsQ0FBY29kLFFBQVEsQ0FBQ0ssS0FBdkIsRUFBOEIsQ0FBQ1IsUUFBRCxDQUE5QixDQUFkLENBQUE7RUFFQXpYLElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0JvYyxLQUFoQixDQUFBO0VBQ0FoWSxJQUFBQSxRQUFRLENBQUN5WCxRQUFULEdBQW9CQSxRQUFwQixDQUFBO0VBQ0Q7O0VBRURwZSxFQUFBQSxNQUFBQSxDQUFBQSxVQUFBLFNBQVUsT0FBQSxHQUFBO0VBQ1IsSUFBQSxhQUFBLENBQUEsU0FBQSxDQUFNQSxPQUFOLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBOztFQUNBLElBQUs0YSxJQUFBQSxDQUFBQSxNQUFMLEdBQWMsSUFBZCxDQUFBO0VBQ0Q7OztJQXRFd0NGOztNQ0F0Qm1FOzs7RUFDbkIsRUFBWWxFLFNBQUFBLGFBQUFBLENBQUFBLE9BQVosRUFBcUJtRSxTQUFyQixFQUFnQztFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQzlCLElBQUEsS0FBQSxHQUFBLGFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFNbkUsT0FBTixDQUFBLElBQUEsSUFBQSxDQUFBO0VBRUEsSUFBSzNkLEtBQUFBLENBQUFBLE9BQUwsR0FBZSxLQUFLMmQsQ0FBQUEsT0FBTCxDQUFheGMsVUFBYixDQUF3QixJQUF4QixDQUFmLENBQUE7RUFDQSxJQUFLNGdCLEtBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBakIsQ0FBQTtFQUNBLElBQUtELEtBQUFBLENBQUFBLFNBQUwsR0FBaUJBLFNBQWpCLENBQUE7O0VBQ0EsSUFBS0UsS0FBQUEsQ0FBQUEsZUFBTCxDQUFxQkYsU0FBckIsQ0FBQSxDQUFBOztFQUVBLElBQUsxYixLQUFBQSxDQUFBQSxJQUFMLEdBQVksZUFBWixDQUFBO0VBUjhCLElBQUEsT0FBQSxLQUFBLENBQUE7RUFTL0IsR0FBQTs7OztFQUVEekgsRUFBQUEsTUFBQUEsQ0FBQUEsU0FBQSxTQUFBLE1BQUEsQ0FBT1YsS0FBUCxFQUFjQyxNQUFkLEVBQXNCO0VBQ3BCLElBQUEsSUFBQSxDQUFLeWYsT0FBTCxDQUFhMWYsS0FBYixHQUFxQkEsS0FBckIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLMGYsT0FBTCxDQUFhemYsTUFBYixHQUFzQkEsTUFBdEIsQ0FBQTtFQUNEOztXQUVEOGpCLGtCQUFBLFNBQWdCRixlQUFBQSxDQUFBQSxTQUFoQixFQUEyQjtFQUN6QixJQUFLQSxJQUFBQSxDQUFBQSxTQUFMLEdBQWlCQSxTQUFTLEdBQUdBLFNBQUgsR0FBZSxJQUFJN04sU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsSUFBQSxDQUFLMEosT0FBTCxDQUFhMWYsS0FBakMsRUFBd0MsSUFBSzBmLENBQUFBLE9BQUwsQ0FBYXpmLE1BQXJELENBQXpDLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBSzZqQixTQUFMLEdBQWlCLElBQUEsQ0FBSy9oQixPQUFMLENBQWFnaUIsZUFBYixDQUE2QixJQUFBLENBQUtGLFNBQUwsQ0FBZTdqQixLQUE1QyxFQUFtRCxJQUFBLENBQUs2akIsU0FBTCxDQUFlNWpCLE1BQWxFLENBQWpCLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBSzhCLE9BQUwsQ0FBYWlpQixZQUFiLENBQTBCLEtBQUtGLFNBQS9CLEVBQTBDLElBQUtELENBQUFBLFNBQUwsQ0FBZS9pQixDQUF6RCxFQUE0RCxJQUFLK2lCLENBQUFBLFNBQUwsQ0FBZTlpQixDQUEzRSxDQUFBLENBQUE7RUFDRDs7RUFFRGtmLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQWlCLGNBQUEsR0FBQTtFQUNmLElBQUtsZSxJQUFBQSxDQUFBQSxPQUFMLENBQWFLLFNBQWIsQ0FBdUIsS0FBS3loQixTQUFMLENBQWUvaUIsQ0FBdEMsRUFBeUMsSUFBSytpQixDQUFBQSxTQUFMLENBQWU5aUIsQ0FBeEQsRUFBMkQsS0FBSzhpQixTQUFMLENBQWU3akIsS0FBMUUsRUFBaUYsSUFBQSxDQUFLNmpCLFNBQUwsQ0FBZTVqQixNQUFoRyxDQUFBLENBQUE7RUFDQSxJQUFLNmpCLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBQSxDQUFLL2hCLE9BQUwsQ0FBYUQsWUFBYixDQUNmLElBQUsraEIsQ0FBQUEsU0FBTCxDQUFlL2lCLENBREEsRUFFZixJQUFBLENBQUsraUIsU0FBTCxDQUFlOWlCLENBRkEsRUFHZixJQUFBLENBQUs4aUIsU0FBTCxDQUFlN2pCLEtBSEEsRUFJZixJQUFLNmpCLENBQUFBLFNBQUwsQ0FBZTVqQixNQUpBLENBQWpCLENBQUE7RUFNRDs7RUFFRGtnQixFQUFBQSxNQUFBQSxDQUFBQSxzQkFBQSxTQUFzQixtQkFBQSxHQUFBO0VBQ3BCLElBQUEsSUFBQSxDQUFLcGUsT0FBTCxDQUFhaWlCLFlBQWIsQ0FBMEIsS0FBS0YsU0FBL0IsRUFBMEMsSUFBS0QsQ0FBQUEsU0FBTCxDQUFlL2lCLENBQXpELEVBQTRELElBQUsraUIsQ0FBQUEsU0FBTCxDQUFlOWlCLENBQTNFLENBQUEsQ0FBQTtFQUNEOztFQUVEMGYsRUFBQUEsTUFBQUEsQ0FBQUEsb0JBQUEsU0FBQSxpQkFBQSxDQUFrQi9VLFFBQWxCLEVBQTRCOztXQUU1QmlWLG1CQUFBLFNBQWlCalYsZ0JBQUFBLENBQUFBLFFBQWpCLEVBQTJCO0VBQ3pCLElBQUksSUFBQSxJQUFBLENBQUtvWSxTQUFULEVBQW9CO0VBQ2xCLE1BQUEsSUFBQSxDQUFLRyxRQUFMLENBQ0UsSUFBS0gsQ0FBQUEsU0FEUCxFQUVHcFksUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlLElBQUEsQ0FBSytpQixTQUFMLENBQWUvaUIsQ0FBL0IsSUFBcUMsQ0FGdkMsRUFHRzRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZSxJQUFLOGlCLENBQUFBLFNBQUwsQ0FBZTlpQixDQUEvQixJQUFxQyxDQUh2QyxFQUlFMkssUUFKRixDQUFBLENBQUE7RUFNRCxLQUFBO0VBQ0Y7O1dBRUR1WSxXQUFBLGtCQUFTOWhCLFNBQVQsRUFBb0JyQixDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEIySyxRQUExQixFQUFvQztFQUNsQyxJQUFBLElBQU0rRyxHQUFHLEdBQUcvRyxRQUFRLENBQUMrRyxHQUFyQixDQUFBO0VBQ0EsSUFBQSxJQUFJM1IsQ0FBQyxHQUFHLENBQUosSUFBU0EsQ0FBQyxHQUFHLEtBQUs0ZSxPQUFMLENBQWExZixLQUExQixJQUFtQ2UsQ0FBQyxHQUFHLENBQXZDLElBQTRDQSxDQUFDLEdBQUcsSUFBQSxDQUFLbWpCLFlBQXpELEVBQXVFLE9BQUE7RUFFdkUsSUFBQSxJQUFNdm1CLENBQUMsR0FBRyxDQUFDLENBQUNvRCxDQUFDLElBQUksQ0FBTixJQUFXb0IsU0FBUyxDQUFDbkMsS0FBckIsSUFBOEJjLENBQUMsSUFBSSxDQUFuQyxDQUFELElBQTBDLENBQXBELENBQUE7RUFDQXFCLElBQUFBLFNBQVMsQ0FBQ3FRLElBQVYsQ0FBZTdVLENBQWYsQ0FBb0I4VSxHQUFBQSxHQUFHLENBQUM5RCxDQUF4QixDQUFBO0VBQ0F4TSxJQUFBQSxTQUFTLENBQUNxUSxJQUFWLENBQWU3VSxDQUFDLEdBQUcsQ0FBbkIsQ0FBQSxHQUF3QjhVLEdBQUcsQ0FBQzdELENBQTVCLENBQUE7RUFDQXpNLElBQUFBLFNBQVMsQ0FBQ3FRLElBQVYsQ0FBZTdVLENBQUMsR0FBRyxDQUFuQixDQUFBLEdBQXdCOFUsR0FBRyxDQUFDOVQsQ0FBNUIsQ0FBQTtFQUNBd0QsSUFBQUEsU0FBUyxDQUFDcVEsSUFBVixDQUFlN1UsQ0FBQyxHQUFHLENBQW5CLENBQUEsR0FBd0IrTixRQUFRLENBQUMyRyxLQUFULEdBQWlCLEdBQXpDLENBQUE7RUFDRDs7RUFFRHdPLEVBQUFBLE1BQUFBLENBQUFBLGlCQUFBLFNBQUEsY0FBQSxDQUFlblYsUUFBZixFQUF5Qjs7RUFFekIzRyxFQUFBQSxNQUFBQSxDQUFBQSxVQUFBLFNBQVUsT0FBQSxHQUFBO0VBQ1IsSUFBQSxhQUFBLENBQUEsU0FBQSxDQUFNQSxPQUFOLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBOztFQUNBLElBQUs0YSxJQUFBQSxDQUFBQSxNQUFMLEdBQWMsSUFBZCxDQUFBO0VBQ0EsSUFBSzVkLElBQUFBLENBQUFBLE9BQUwsR0FBZSxJQUFmLENBQUE7RUFDQSxJQUFLK2hCLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBakIsQ0FBQTtFQUNBLElBQUtELElBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBakIsQ0FBQTtFQUNEOzs7SUFyRXdDcEU7O0VDRTNDLElBQUkwRSxTQUFKLENBQUE7O01BQ3FCQzs7O0VBQ25CLEVBQVkxRSxTQUFBQSxZQUFBQSxDQUFBQSxPQUFaLEVBQXFCQyxNQUFyQixFQUE2QjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQzNCLElBQUEsS0FBQSxHQUFBLGFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFNRCxPQUFOLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLQyxLQUFBQSxDQUFBQSxNQUFMLEdBQWNBLE1BQWQsQ0FBQTtFQUNBLElBQUtoWCxLQUFBQSxDQUFBQSxLQUFMLEdBQWEsS0FBYixDQUFBO0VBQ0EsSUFBSzBiLEtBQUFBLENBQUFBLFFBQUwsR0FBZ0IsS0FBaEIsQ0FBQTtFQUNBLElBQUtDLEtBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBakIsQ0FBQTs7RUFDQSxJQUFBLEtBQUEsQ0FBS2pjLElBQUwsQ0FBVTFCLE1BQVYsR0FBbUIsVUFBQ1csSUFBRCxFQUFPb0UsUUFBUCxFQUFBO0VBQUEsTUFBQSxPQUFvQixNQUFLMlcsVUFBTCxDQUFnQi9hLElBQWhCLEVBQXNCb0UsUUFBdEIsQ0FBcEIsQ0FBQTtFQUFBLEtBQW5CLENBQUE7O0VBQ0EsSUFBQSxLQUFBLENBQUs2WSxPQUFMLENBQWFoRyxNQUFNLENBQUNpRyxJQUFwQixDQUFBLENBQUE7O0VBRUEsSUFBS3JjLEtBQUFBLENBQUFBLElBQUwsR0FBWSxjQUFaLENBQUE7RUFWMkIsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQVc1QixHQUFBOzs7O1dBRURvYyxVQUFBLFNBQVFDLE9BQUFBLENBQUFBLElBQVIsRUFBYztFQUNaLElBQUksSUFBQTtFQUNGTCxNQUFBQSxTQUFTLEdBQUdLLElBQUksSUFBSTtFQUFFQyxRQUFBQSxNQUFNLEVBQUUsRUFBQTtFQUFWLE9BQXBCLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS0MsZUFBTCxHQUF1QlAsU0FBUyxDQUFDTSxNQUFWLENBQWlCRSxJQUFqQixJQUF5QlIsU0FBUyxDQUFDTSxNQUFWLENBQWlCRyxTQUFqRSxDQUFBO0VBQ0QsS0FIRCxDQUdFLE9BQU9oaUIsQ0FBUCxFQUFVLEVBQUU7RUFDZjs7V0FFRHFkLGlCQUFBLDBCQUFpQixFQUFFO0VBRW5CO0VBQ0Y7RUFDQTs7O1dBQ0VRLG9CQUFBLFNBQWtCL1UsaUJBQUFBLENBQUFBLFFBQWxCLEVBQTRCO0VBQzFCLElBQUlBLElBQUFBLFFBQVEsQ0FBQ3BFLElBQWIsRUFBbUI7RUFDakJvRSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULEdBQWdCLEtBQUtlLElBQUwsQ0FBVW5DLEdBQVYsQ0FBY3dGLFFBQVEsQ0FBQ3BFLElBQXZCLEVBQTZCb0UsUUFBN0IsQ0FBaEIsQ0FBQTtFQUNELEtBRkQsTUFFTztFQUNMQSxNQUFBQSxRQUFRLENBQUNwRSxJQUFULEdBQWdCLElBQUtlLENBQUFBLElBQUwsQ0FBVW5DLEdBQVYsQ0FBYyxJQUFBLENBQUswWixVQUFuQixFQUErQmxVLFFBQS9CLENBQWhCLENBQUE7RUFDRCxLQUFBOztFQUVELElBQUksSUFBQSxJQUFBLENBQUs0WSxTQUFULEVBQW9CO0VBQ2xCNVksTUFBQUEsUUFBUSxDQUFDcEUsSUFBVCxDQUFjZ2QsU0FBZCxHQUEwQixLQUFLQSxTQUEvQixDQUFBO0VBQ0QsS0FBQTs7RUFFRCxJQUFBLElBQUEsQ0FBSzVFLE9BQUwsQ0FBYXNELFFBQWIsQ0FBc0J0WCxRQUFRLENBQUNwRSxJQUEvQixDQUFBLENBQUE7RUFDRCxHQUFBO0VBRUQ7RUFDRjtFQUNBOzs7V0FDRXFaLG1CQUFBLFNBQWlCalYsZ0JBQUFBLENBQUFBLFFBQWpCLEVBQTJCO0VBQ3pCLElBQUEsSUFBQSxDQUFLbEwsU0FBTCxDQUFla0wsUUFBZixFQUF5QkEsUUFBUSxDQUFDcEUsSUFBbEMsQ0FBQSxDQUFBOztFQUVBLElBQUksSUFBQSxJQUFBLENBQUsrYyxRQUFMLEtBQWtCLElBQWxCLElBQTBCLElBQUsxYixDQUFBQSxLQUFMLEtBQWUsSUFBN0MsRUFBbUQ7RUFDakQrQyxNQUFBQSxRQUFRLENBQUNwRSxJQUFULENBQWN1ZCxJQUFkLEdBQXFCNUosU0FBUyxDQUFDNUcsb0JBQVYsQ0FBK0IzSSxRQUEvQixDQUFyQixDQUFBO0VBQ0QsS0FBQTtFQUNGLEdBQUE7RUFFRDtFQUNGO0VBQ0E7OztXQUNFbVYsaUJBQUEsU0FBZW5WLGNBQUFBLENBQUFBLFFBQWYsRUFBeUI7RUFDdkIsSUFBQSxJQUFBLENBQUtnVSxPQUFMLENBQWF4VyxXQUFiLENBQXlCd0MsUUFBUSxDQUFDcEUsSUFBbEMsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtlLElBQUwsQ0FBVTdCLE1BQVYsQ0FBaUJrRixRQUFRLENBQUNwRSxJQUExQixDQUFBLENBQUE7RUFDQW9FLElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0IsSUFBaEIsQ0FBQTtFQUNEOztFQUVEOUcsRUFBQUEsTUFBQUEsQ0FBQUEsWUFBQSxTQUFBLFNBQUEsQ0FBVWtMLFFBQVYsRUFBb0I3SSxNQUFwQixFQUE0QjtFQUMxQkEsSUFBQUEsTUFBTSxDQUFDL0IsQ0FBUCxHQUFXNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBdEIsQ0FBQTtFQUNBK0IsSUFBQUEsTUFBTSxDQUFDOUIsQ0FBUCxHQUFXMkssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBdEIsQ0FBQTtFQUVBOEIsSUFBQUEsTUFBTSxDQUFDd1AsS0FBUCxHQUFlM0csUUFBUSxDQUFDMkcsS0FBeEIsQ0FBQTtFQUVBeFAsSUFBQUEsTUFBTSxDQUFDN0IsS0FBUCxDQUFhRixDQUFiLEdBQWlCNEssUUFBUSxDQUFDMUssS0FBMUIsQ0FBQTtFQUNBNkIsSUFBQUEsTUFBTSxDQUFDN0IsS0FBUCxDQUFhRCxDQUFiLEdBQWlCMkssUUFBUSxDQUFDMUssS0FBMUIsQ0FQMEI7O0VBVTFCNkIsSUFBQUEsTUFBTSxDQUFDcVEsUUFBUCxHQUFrQnhILFFBQVEsQ0FBQ3dILFFBQVQsR0FBb0JsSixRQUFRLENBQUNHLE1BQS9DLENBVjBCO0VBVzNCOztFQUVEa1ksRUFBQUEsTUFBQUEsQ0FBQUEsYUFBQSxTQUFBLFVBQUEsQ0FBVy9hLElBQVgsRUFBaUJvRSxRQUFqQixFQUEyQjtFQUN6QixJQUFBLElBQUlwRSxJQUFJLENBQUN1WSxRQUFULEVBQW1CLE9BQU8sS0FBSzJDLFlBQUwsQ0FBa0I5VyxRQUFsQixDQUFQLENBQW5CLEtBQ0ssT0FBTyxLQUFLK1csWUFBTCxDQUFrQm5iLElBQWxCLENBQVAsQ0FBQTtFQUNOOztXQUVEbWIsZUFBQSxTQUFhbmIsWUFBQUEsQ0FBQUEsSUFBYixFQUFtQjtFQUNqQixJQUFNeUwsSUFBQUEsTUFBTSxHQUFHekwsSUFBSSxDQUFDMUIsT0FBTCxHQUFlLElBQUEsQ0FBSzhlLGVBQUwsQ0FBcUJwZCxJQUFJLENBQUM3RSxHQUExQixDQUFmLEdBQWdELElBQUkwaEIsU0FBUyxDQUFDTSxNQUFkLENBQXFCbmQsSUFBckIsQ0FBL0QsQ0FBQTtFQUVBeUwsSUFBQUEsTUFBTSxDQUFDK1IsTUFBUCxDQUFjaGtCLENBQWQsR0FBa0IsR0FBbEIsQ0FBQTtFQUNBaVMsSUFBQUEsTUFBTSxDQUFDK1IsTUFBUCxDQUFjL2pCLENBQWQsR0FBa0IsR0FBbEIsQ0FBQTtFQUVBLElBQUEsT0FBT2dTLE1BQVAsQ0FBQTtFQUNEOztXQUVEeVAsZUFBQSxTQUFhOVcsWUFBQUEsQ0FBQUEsUUFBYixFQUF1QjtFQUNyQixJQUFBLElBQU15WCxRQUFRLEdBQUcsSUFBSWdCLFNBQVMsQ0FBQ1osUUFBZCxFQUFqQixDQUFBOztFQUVBLElBQUksSUFBQSxJQUFBLENBQUs1RCxNQUFULEVBQWlCO0VBQ2YsTUFBQSxJQUFNQSxNQUFNLEdBQUdzQixLQUFLLENBQUN6QixRQUFOLENBQWUsSUFBS0csQ0FBQUEsTUFBcEIsQ0FBOEIsR0FBQSxJQUFBLENBQUtBLE1BQW5DLEdBQTRDLFFBQTNELENBQUE7RUFDQXdELE1BQUFBLFFBQVEsQ0FBQ0ssV0FBVCxDQUFxQjdELE1BQXJCLENBQUEsQ0FBQTtFQUNELEtBQUE7O0VBRUR3RCxJQUFBQSxRQUFRLENBQUNNLFNBQVQsQ0FBbUIvWCxRQUFRLENBQUMvQyxLQUFULElBQWtCLFFBQXJDLENBQUEsQ0FBQTtFQUNBd2EsSUFBQUEsUUFBUSxDQUFDakMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQnhWLFFBQVEsQ0FBQ3VILE1BQW5DLENBQUEsQ0FBQTtFQUNBa1EsSUFBQUEsUUFBUSxDQUFDNEIsT0FBVCxFQUFBLENBQUE7RUFFQSxJQUFBLE9BQU81QixRQUFQLENBQUE7RUFDRDs7V0FFRHBlLFVBQUEsU0FBUXVHLE9BQUFBLENBQUFBLFNBQVIsRUFBbUI7RUFDakIsSUFBQSxhQUFBLENBQUEsU0FBQSxDQUFNdkcsT0FBTixDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTs7RUFFQSxJQUFBLElBQUlwSCxDQUFDLEdBQUcyTixTQUFTLENBQUM3TixNQUFsQixDQUFBOztFQUNBLElBQU9FLE9BQUFBLENBQUMsRUFBUixFQUFZO0VBQ1YsTUFBQSxJQUFJK04sUUFBUSxHQUFHSixTQUFTLENBQUMzTixDQUFELENBQXhCLENBQUE7O0VBQ0EsTUFBSStOLElBQUFBLFFBQVEsQ0FBQ3BFLElBQWIsRUFBbUI7RUFDakIsUUFBQSxJQUFBLENBQUtvWSxPQUFMLENBQWF4VyxXQUFiLENBQXlCd0MsUUFBUSxDQUFDcEUsSUFBbEMsQ0FBQSxDQUFBO0VBQ0QsT0FBQTtFQUNGLEtBQUE7RUFDRjs7O0lBaEh1Q21ZOztNQ0pyQnVGO0VBQ25CLEVBQWMsU0FBQSxNQUFBLEdBQUE7RUFDWixJQUFLQyxJQUFBQSxDQUFBQSxJQUFMLEdBQVksRUFBWixDQUFBO0VBQ0EsSUFBSzlDLElBQUFBLENBQUFBLElBQUwsR0FBWSxDQUFaLENBQUE7O0VBRUEsSUFBSyxLQUFBLElBQUl4a0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUFBO0VBQTZCLE1BQUtzbkIsSUFBQUEsQ0FBQUEsSUFBTCxDQUFVdmUsSUFBVixDQUFlb08sSUFBSSxDQUFDbk8sTUFBTCxDQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsQ0FBWixDQUFmLENBQUEsQ0FBQTtFQUE3QixLQUFBO0VBQ0QsR0FBQTs7OztFQUVEcUssRUFBQUEsTUFBQUEsQ0FBQUEsTUFBQSxTQUFBLEdBQUEsQ0FBSXdFLENBQUosRUFBTzdYLENBQVAsRUFBVTtFQUNSLElBQUEsSUFBSUEsQ0FBQyxLQUFLLENBQVYsRUFBYW1YLElBQUksQ0FBQzlELEdBQUwsQ0FBU3dFLENBQVQsRUFBWSxJQUFLeVAsQ0FBQUEsSUFBTCxDQUFVLENBQVYsQ0FBWixDQUFiLENBQUEsS0FDS25RLElBQUksQ0FBQ00sUUFBTCxDQUFjLElBQUEsQ0FBSzZQLElBQUwsQ0FBVXRuQixDQUFDLEdBQUcsQ0FBZCxDQUFkLEVBQWdDNlgsQ0FBaEMsRUFBbUMsSUFBQSxDQUFLeVAsSUFBTCxDQUFVdG5CLENBQVYsQ0FBbkMsQ0FBQSxDQUFBO0VBRUwsSUFBQSxJQUFBLENBQUt3a0IsSUFBTCxHQUFZamtCLElBQUksQ0FBQ29WLEdBQUwsQ0FBUyxJQUFLNk8sQ0FBQUEsSUFBZCxFQUFvQnhrQixDQUFDLEdBQUcsQ0FBeEIsQ0FBWixDQUFBO0VBQ0Q7O1dBRUQrSSxPQUFBLFNBQUs4TyxJQUFBQSxDQUFBQSxDQUFMLEVBQVE7RUFDTixJQUFBLElBQUksS0FBSzJNLElBQUwsS0FBYyxDQUFsQixFQUFxQnJOLElBQUksQ0FBQzlELEdBQUwsQ0FBU3dFLENBQVQsRUFBWSxJQUFLeVAsQ0FBQUEsSUFBTCxDQUFVLENBQVYsQ0FBWixFQUFyQixLQUNLblEsSUFBSSxDQUFDTSxRQUFMLENBQWMsSUFBSzZQLENBQUFBLElBQUwsQ0FBVSxJQUFBLENBQUs5QyxJQUFMLEdBQVksQ0FBdEIsQ0FBZCxFQUF3QzNNLENBQXhDLEVBQTJDLElBQUEsQ0FBS3lQLElBQUwsQ0FBVSxJQUFBLENBQUs5QyxJQUFmLENBQTNDLENBQUEsQ0FBQTtFQUVMLElBQUEsSUFBQSxDQUFLQSxJQUFMLEVBQUEsQ0FBQTtFQUNEOztFQUVEN2IsRUFBQUEsTUFBQUEsQ0FBQUEsTUFBQSxTQUFNLEdBQUEsR0FBQTtFQUNKLElBQUEsSUFBSSxLQUFLNmIsSUFBTCxHQUFZLENBQWhCLEVBQW1CLEtBQUtBLElBQUwsRUFBQSxDQUFBO0VBQ3BCOztFQUVEK0MsRUFBQUEsTUFBQUEsQ0FBQUEsTUFBQSxTQUFNLEdBQUEsR0FBQTtFQUNKLElBQUEsT0FBTyxLQUFLRCxJQUFMLENBQVUsS0FBSzlDLElBQUwsR0FBWSxDQUF0QixDQUFQLENBQUE7RUFDRDs7Ozs7TUNwQmtCZ0Q7OztFQUNuQixFQUFBLFNBQUEsYUFBQSxDQUFZekYsT0FBWixFQUFxQjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ25CLElBQUEsS0FBQSxHQUFBLGFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFNQSxPQUFOLENBQUEsSUFBQSxJQUFBLENBQUE7RUFFQSxJQUFLMEYsS0FBQUEsQ0FBQUEsRUFBTCxHQUFVLEtBQUsxRixDQUFBQSxPQUFMLENBQWF4YyxVQUFiLENBQXdCLG9CQUF4QixFQUE4QztFQUFFbWlCLE1BQUFBLFNBQVMsRUFBRSxJQUFiO0VBQW1CQyxNQUFBQSxPQUFPLEVBQUUsS0FBNUI7RUFBbUNDLE1BQUFBLEtBQUssRUFBRSxLQUFBO0VBQTFDLEtBQTlDLENBQVYsQ0FBQTtFQUNBLElBQUEsSUFBSSxDQUFDLEtBQUtILENBQUFBLEVBQVYsRUFBY25PLEtBQUssQ0FBQywwQ0FBRCxDQUFMLENBQUE7O0VBRWQsSUFBQSxLQUFBLENBQUt1TyxPQUFMLEVBQUEsQ0FBQTs7RUFDQSxJQUFBLEtBQUEsQ0FBS0MsWUFBTCxFQUFBLENBQUE7O0VBQ0EsSUFBQSxLQUFBLENBQUtDLFdBQUwsRUFBQSxDQUFBOztFQUNBLElBQUEsS0FBQSxDQUFLQyxXQUFMLEVBQUEsQ0FBQTs7RUFFQSxJQUFBLEtBQUEsQ0FBS1AsRUFBTCxDQUFRUSxhQUFSLENBQXNCLEtBQUtSLENBQUFBLEVBQUwsQ0FBUVMsUUFBOUIsQ0FBQSxDQUFBOztFQUNBLElBQUEsS0FBQSxDQUFLVCxFQUFMLENBQVFVLFNBQVIsQ0FBa0IsS0FBS1YsQ0FBQUEsRUFBTCxDQUFRVyxTQUExQixFQUFxQyxLQUFBLENBQUtYLEVBQUwsQ0FBUVksbUJBQTdDLENBQUEsQ0FBQTs7RUFDQSxJQUFBLEtBQUEsQ0FBS1osRUFBTCxDQUFRYSxNQUFSLENBQWUsS0FBS2IsQ0FBQUEsRUFBTCxDQUFRYyxLQUF2QixDQUFBLENBQUE7O0VBQ0EsSUFBQSxLQUFBLENBQUtsRixXQUFMLEdBQW1CLEtBQUEsQ0FBS0EsV0FBTCxDQUFpQnRjLElBQWpCLENBQW5CLHNCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtFQUVBLElBQUt5RCxLQUFBQSxDQUFBQSxJQUFMLEdBQVksZUFBWixDQUFBO0VBaEJtQixJQUFBLE9BQUEsS0FBQSxDQUFBO0VBaUJwQixHQUFBOzs7O1dBRUQ0RSxPQUFBLFNBQUs5RixJQUFBQSxDQUFBQSxNQUFMLEVBQWE7RUFDWCxJQUFNOEYsYUFBQUEsQ0FBQUEsU0FBQUEsQ0FBQUEsSUFBTixZQUFXOUYsTUFBWCxDQUFBLENBQUE7O0VBQ0EsSUFBS3ZHLElBQUFBLENBQUFBLE1BQUwsQ0FBWSxJQUFBLENBQUtnZixPQUFMLENBQWExZixLQUF6QixFQUFnQyxJQUFBLENBQUswZixPQUFMLENBQWF6ZixNQUE3QyxDQUFBLENBQUE7RUFDRDs7RUFFRFMsRUFBQUEsTUFBQUEsQ0FBQUEsU0FBQSxTQUFBLE1BQUEsQ0FBT1YsS0FBUCxFQUFjQyxNQUFkLEVBQXNCO0VBQ3BCLElBQUEsSUFBQSxDQUFLa21CLElBQUwsQ0FBVSxDQUFWLENBQUEsR0FBZSxDQUFDLENBQWhCLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS0EsSUFBTCxDQUFVLENBQVYsQ0FBQSxHQUFlLENBQWYsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLQyxJQUFMLENBQVUsQ0FBVixDQUFBLEdBQWUsSUFBSXBtQixLQUFuQixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtvbUIsSUFBTCxDQUFVLENBQVYsQ0FBQSxHQUFlLElBQUlubUIsTUFBbkIsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLb21CLE1BQUwsQ0FBWXJWLEdBQVosQ0FBZ0IsSUFBS21WLENBQUFBLElBQXJCLEVBQTJCLENBQTNCLENBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLRSxNQUFMLENBQVlyVixHQUFaLENBQWdCLElBQUtvVixDQUFBQSxJQUFyQixFQUEyQixDQUEzQixDQUFBLENBQUE7RUFFQSxJQUFLaEIsSUFBQUEsQ0FBQUEsRUFBTCxDQUFRa0IsUUFBUixDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QnRtQixLQUF2QixFQUE4QkMsTUFBOUIsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUt5ZixPQUFMLENBQWExZixLQUFiLEdBQXFCQSxLQUFyQixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUswZixPQUFMLENBQWF6ZixNQUFiLEdBQXNCQSxNQUF0QixDQUFBO0VBQ0Q7O1dBRUR3bEIsZUFBQSxTQUFheFMsWUFBQUEsQ0FBQUEsTUFBYixFQUFxQjtFQUNuQixJQUFBLElBQUEsQ0FBS3NULGVBQUwsR0FBdUIsSUFBQSxDQUFLL0QsWUFBTCxDQUFrQnZQLE1BQWxCLENBQXZCLENBQUE7RUFDRDs7RUFFRHVULEVBQUFBLE1BQUFBLENBQUFBLGtCQUFBLFNBQWtCLGVBQUEsR0FBQTtFQUNoQixJQUFBLElBQU1DLFFBQVEsR0FBRyxDQUNmLHdCQURlLEVBRWYsaUNBRmUsRUFHZiwrQkFIZSxFQUlmLG9CQUplLEVBS2YsNkJBTGUsRUFNZixzQkFOZSxFQU9mLGVBUGUsRUFRZiw2Q0FSZSxFQVNmLHFDQVRlLEVBVWYsZ0NBVmUsRUFXZixxQkFYZSxFQVlmLEdBWmUsQ0FBQSxDQWFmamUsSUFiZSxDQWFWLElBYlUsQ0FBakIsQ0FBQTtFQWNBLElBQUEsT0FBT2llLFFBQVAsQ0FBQTtFQUNEOztFQUVEQyxFQUFBQSxNQUFBQSxDQUFBQSxvQkFBQSxTQUFvQixpQkFBQSxHQUFBO0VBQ2xCLElBQUEsSUFBTUMsUUFBUSxHQUFHLENBQ2YsMEJBRGUsRUFFZiw2QkFGZSxFQUdmLHNCQUhlLEVBSWYsNkJBSmUsRUFLZixxQkFMZSxFQU1mLDBCQU5lLEVBT2Ysc0JBUGUsRUFRZixlQVJlLEVBU2YseURBVGUsRUFVZixrREFWZSxFQVdmLDBCQVhlLEVBWWYsR0FaZSxDQUFBLENBYWZuZSxJQWJlLENBYVYsSUFiVSxDQUFqQixDQUFBO0VBY0EsSUFBQSxPQUFPbWUsUUFBUCxDQUFBO0VBQ0Q7O0VBRURuQixFQUFBQSxNQUFBQSxDQUFBQSxVQUFBLFNBQVUsT0FBQSxHQUFBO0VBQ1IsSUFBQSxJQUFBLENBQUthLE1BQUwsR0FBYyxJQUFJckIsTUFBSixFQUFkLENBQUE7RUFDQSxJQUFLbUIsSUFBQUEsQ0FBQUEsSUFBTCxHQUFZclIsSUFBSSxDQUFDbk8sTUFBTCxDQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQUMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFDLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCLENBQVosQ0FBWixDQUFBO0VBQ0EsSUFBS3lmLElBQUFBLENBQUFBLElBQUwsR0FBWXRSLElBQUksQ0FBQ25PLE1BQUwsQ0FBWSxDQUFDLENBQUksR0FBQSxHQUFMLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBQSxHQUFJLEdBQXZCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQVosQ0FBWixDQUFBO0VBQ0EsSUFBS2lnQixJQUFBQSxDQUFBQSxjQUFMLEdBQXNCLEVBQXRCLENBQUE7RUFDRDs7V0FFRGhCLGdCQUFBLFNBQWNpQixhQUFBQSxDQUFBQSxDQUFkLEVBQWlCO0VBQ2YsSUFBS3pCLElBQUFBLENBQUFBLEVBQUwsQ0FBUVEsYUFBUixDQUFzQixLQUFLUixFQUFMLENBQVF5QixDQUFSLENBQXRCLENBQUEsQ0FBQTtFQUNEOztFQUVEZixFQUFBQSxNQUFBQSxDQUFBQSxZQUFBLFNBQUEsU0FBQSxDQUFVZSxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7RUFDZCxJQUFBLElBQUEsQ0FBSzFCLEVBQUwsQ0FBUVUsU0FBUixDQUFrQixLQUFLVixFQUFMLENBQVF5QixDQUFSLENBQWxCLEVBQThCLElBQUEsQ0FBS3pCLEVBQUwsQ0FBUTBCLENBQVIsQ0FBOUIsQ0FBQSxDQUFBO0VBQ0Q7O0VBRURDLEVBQUFBLE1BQUFBLENBQUFBLFlBQUEsU0FBVTNCLFNBQUFBLENBQUFBLEVBQVYsRUFBY3hkLEdBQWQsRUFBbUJvZixFQUFuQixFQUF1QjtFQUNyQixJQUFNQyxJQUFBQSxNQUFNLEdBQUdELEVBQUUsR0FBRzVCLEVBQUUsQ0FBQzhCLFlBQUgsQ0FBZ0I5QixFQUFFLENBQUMrQixlQUFuQixDQUFILEdBQXlDL0IsRUFBRSxDQUFDOEIsWUFBSCxDQUFnQjlCLEVBQUUsQ0FBQ2dDLGFBQW5CLENBQTFELENBQUE7RUFFQWhDLElBQUFBLEVBQUUsQ0FBQ2lDLFlBQUgsQ0FBZ0JKLE1BQWhCLEVBQXdCcmYsR0FBeEIsQ0FBQSxDQUFBO0VBQ0F3ZCxJQUFBQSxFQUFFLENBQUNrQyxhQUFILENBQWlCTCxNQUFqQixDQUFBLENBQUE7O0VBRUEsSUFBSSxJQUFBLENBQUM3QixFQUFFLENBQUNtQyxrQkFBSCxDQUFzQk4sTUFBdEIsRUFBOEI3QixFQUFFLENBQUNvQyxjQUFqQyxDQUFMLEVBQXVEO0VBQ3JEdlEsTUFBQUEsS0FBSyxDQUFDbU8sRUFBRSxDQUFDcUMsZ0JBQUgsQ0FBb0JSLE1BQXBCLENBQUQsQ0FBTCxDQUFBO0VBQ0EsTUFBQSxPQUFPLElBQVAsQ0FBQTtFQUNELEtBQUE7O0VBRUQsSUFBQSxPQUFPQSxNQUFQLENBQUE7RUFDRDs7RUFFRHZCLEVBQUFBLE1BQUFBLENBQUFBLGNBQUEsU0FBYyxXQUFBLEdBQUE7RUFDWixJQUFBLElBQU1nQyxjQUFjLEdBQUcsSUFBS1gsQ0FBQUEsU0FBTCxDQUFlLElBQUEsQ0FBSzNCLEVBQXBCLEVBQXdCLElBQUtzQixDQUFBQSxpQkFBTCxFQUF4QixFQUFrRCxJQUFsRCxDQUF2QixDQUFBO0VBQ0EsSUFBQSxJQUFNaUIsWUFBWSxHQUFHLElBQUtaLENBQUFBLFNBQUwsQ0FBZSxJQUFBLENBQUszQixFQUFwQixFQUF3QixJQUFLb0IsQ0FBQUEsZUFBTCxFQUF4QixFQUFnRCxLQUFoRCxDQUFyQixDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUtvQixRQUFMLEdBQWdCLElBQUEsQ0FBS3hDLEVBQUwsQ0FBUXlDLGFBQVIsRUFBaEIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLekMsRUFBTCxDQUFRMEMsWUFBUixDQUFxQixJQUFLRixDQUFBQSxRQUExQixFQUFvQ0QsWUFBcEMsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUt2QyxFQUFMLENBQVEwQyxZQUFSLENBQXFCLElBQUtGLENBQUFBLFFBQTFCLEVBQW9DRixjQUFwQyxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS3RDLEVBQUwsQ0FBUTJDLFdBQVIsQ0FBb0IsS0FBS0gsUUFBekIsQ0FBQSxDQUFBO0VBRUEsSUFBQSxJQUFJLENBQUMsSUFBS3hDLENBQUFBLEVBQUwsQ0FBUTRDLG1CQUFSLENBQTRCLEtBQUtKLFFBQWpDLEVBQTJDLElBQUt4QyxDQUFBQSxFQUFMLENBQVE2QyxXQUFuRCxDQUFMLEVBQXNFaFIsS0FBSyxDQUFDLDhCQUFELENBQUwsQ0FBQTtFQUV0RSxJQUFBLElBQUEsQ0FBS21PLEVBQUwsQ0FBUThDLFVBQVIsQ0FBbUIsS0FBS04sUUFBeEIsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtBLFFBQUwsQ0FBY08sR0FBZCxHQUFvQixJQUFLL0MsQ0FBQUEsRUFBTCxDQUFRZ0QsaUJBQVIsQ0FBMEIsSUFBQSxDQUFLUixRQUEvQixFQUF5QyxpQkFBekMsQ0FBcEIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLQSxRQUFMLENBQWNTLEdBQWQsR0FBb0IsSUFBS2pELENBQUFBLEVBQUwsQ0FBUWdELGlCQUFSLENBQTBCLElBQUEsQ0FBS1IsUUFBL0IsRUFBeUMsZUFBekMsQ0FBcEIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLeEMsRUFBTCxDQUFRa0QsdUJBQVIsQ0FBZ0MsSUFBS1YsQ0FBQUEsUUFBTCxDQUFjUyxHQUE5QyxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS2pELEVBQUwsQ0FBUWtELHVCQUFSLENBQWdDLElBQUtWLENBQUFBLFFBQUwsQ0FBY08sR0FBOUMsQ0FBQSxDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUtQLFFBQUwsQ0FBY1csV0FBZCxHQUE0QixJQUFLbkQsQ0FBQUEsRUFBTCxDQUFRb0Qsa0JBQVIsQ0FBMkIsSUFBQSxDQUFLWixRQUFoQyxFQUEwQyxNQUExQyxDQUE1QixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtBLFFBQUwsQ0FBY2EsY0FBZCxHQUErQixJQUFLckQsQ0FBQUEsRUFBTCxDQUFRb0Qsa0JBQVIsQ0FBMkIsSUFBQSxDQUFLWixRQUFoQyxFQUEwQyxVQUExQyxDQUEvQixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtBLFFBQUwsQ0FBY2MsTUFBZCxHQUF1QixJQUFLdEQsQ0FBQUEsRUFBTCxDQUFRb0Qsa0JBQVIsQ0FBMkIsSUFBQSxDQUFLWixRQUFoQyxFQUEwQyxZQUExQyxDQUF2QixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtBLFFBQUwsQ0FBY2pmLEtBQWQsR0FBc0IsSUFBS3ljLENBQUFBLEVBQUwsQ0FBUW9ELGtCQUFSLENBQTJCLElBQUEsQ0FBS1osUUFBaEMsRUFBMEMsUUFBMUMsQ0FBdEIsQ0FBQTtFQUNBLElBQUt4QyxJQUFBQSxDQUFBQSxFQUFMLENBQVF1RCxTQUFSLENBQWtCLEtBQUtmLFFBQUwsQ0FBY2MsTUFBaEMsRUFBd0MsQ0FBeEMsQ0FBQSxDQUFBO0VBQ0Q7O0VBRUQvQyxFQUFBQSxNQUFBQSxDQUFBQSxjQUFBLFNBQWMsV0FBQSxHQUFBO0VBQ1osSUFBQSxJQUFNaUQsRUFBRSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBWCxDQUFBO0VBQ0EsSUFBQSxJQUFJQyxHQUFKLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBS0MsV0FBTCxHQUFtQixJQUFBLENBQUsxRCxFQUFMLENBQVFoRSxZQUFSLEVBQW5CLENBQUE7RUFDQSxJQUFLZ0UsSUFBQUEsQ0FBQUEsRUFBTCxDQUFRMkQsVUFBUixDQUFtQixJQUFBLENBQUszRCxFQUFMLENBQVE0RCxvQkFBM0IsRUFBaUQsSUFBQSxDQUFLRixXQUF0RCxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBSzFELEVBQUwsQ0FBUTZELFVBQVIsQ0FBbUIsSUFBSzdELENBQUFBLEVBQUwsQ0FBUTRELG9CQUEzQixFQUFpRCxJQUFJRSxXQUFKLENBQWdCTixFQUFoQixDQUFqRCxFQUFzRSxJQUFLeEQsQ0FBQUEsRUFBTCxDQUFRK0QsV0FBOUUsQ0FBQSxDQUFBO0VBRUEsSUFBQSxJQUFJeHJCLENBQUosQ0FBQTtFQUNBLElBQUl5ckIsSUFBQUEsR0FBRyxHQUFHLEVBQVYsQ0FBQTs7RUFDQSxJQUFLenJCLEtBQUFBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRyxHQUFoQixFQUFxQkEsQ0FBQyxFQUF0QixFQUFBO0VBQTBCeXJCLE1BQUFBLEdBQUcsQ0FBQzFpQixJQUFKLENBQVMvSSxDQUFULENBQUEsQ0FBQTtFQUExQixLQUFBOztFQUNBa3JCLElBQUFBLEdBQUcsR0FBRyxJQUFJSyxXQUFKLENBQWdCRSxHQUFoQixDQUFOLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBS0MsT0FBTCxHQUFlLElBQUEsQ0FBS2pFLEVBQUwsQ0FBUWhFLFlBQVIsRUFBZixDQUFBO0VBQ0EsSUFBS2dFLElBQUFBLENBQUFBLEVBQUwsQ0FBUTJELFVBQVIsQ0FBbUIsSUFBQSxDQUFLM0QsRUFBTCxDQUFRNEQsb0JBQTNCLEVBQWlELElBQUEsQ0FBS0ssT0FBdEQsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtqRSxFQUFMLENBQVE2RCxVQUFSLENBQW1CLEtBQUs3RCxFQUFMLENBQVE0RCxvQkFBM0IsRUFBaURILEdBQWpELEVBQXNELElBQUt6RCxDQUFBQSxFQUFMLENBQVErRCxXQUE5RCxDQUFBLENBQUE7RUFFQUMsSUFBQUEsR0FBRyxHQUFHLEVBQU4sQ0FBQTs7RUFDQSxJQUFLenJCLEtBQUFBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRyxHQUFoQixFQUFxQkEsQ0FBQyxFQUF0QixFQUFBO0VBQTBCeXJCLE1BQUFBLEdBQUcsQ0FBQzFpQixJQUFKLENBQVMvSSxDQUFULEVBQVlBLENBQUMsR0FBRyxDQUFoQixFQUFtQkEsQ0FBQyxHQUFHLENBQXZCLENBQUEsQ0FBQTtFQUExQixLQUFBOztFQUNBa3JCLElBQUFBLEdBQUcsR0FBRyxJQUFJSyxXQUFKLENBQWdCRSxHQUFoQixDQUFOLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBS0UsV0FBTCxHQUFtQixJQUFBLENBQUtsRSxFQUFMLENBQVFoRSxZQUFSLEVBQW5CLENBQUE7RUFDQSxJQUFLZ0UsSUFBQUEsQ0FBQUEsRUFBTCxDQUFRMkQsVUFBUixDQUFtQixJQUFBLENBQUszRCxFQUFMLENBQVE0RCxvQkFBM0IsRUFBaUQsSUFBQSxDQUFLTSxXQUF0RCxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBS2xFLEVBQUwsQ0FBUTZELFVBQVIsQ0FBbUIsS0FBSzdELEVBQUwsQ0FBUTRELG9CQUEzQixFQUFpREgsR0FBakQsRUFBc0QsSUFBS3pELENBQUFBLEVBQUwsQ0FBUStELFdBQTlELENBQUEsQ0FBQTtFQUNEOztXQUVEM0csZUFBQSxTQUFhK0csWUFBQUEsQ0FBQUEsTUFBYixFQUFxQjtFQUNuQixJQUFBLElBQUEsQ0FBS0Msa0JBQUwsR0FBMEJ6bUIsU0FBUyxDQUFDckYsS0FBVixDQUFnQmtKLElBQUksQ0FBQ3pELFNBQUwsQ0FBZW9tQixNQUFmLEVBQXVCLEVBQXZCLENBQWhCLENBQTFCLENBQUE7RUFDQSxJQUFBLElBQU12bUIsTUFBTSxHQUFHQyxPQUFPLENBQUNuRCxZQUFSLENBQXFCLGVBQXJCLEVBQXNDLElBQUswcEIsQ0FBQUEsa0JBQUwsR0FBMEIsQ0FBaEUsRUFBbUUsS0FBS0Esa0JBQUwsR0FBMEIsQ0FBN0YsQ0FBZixDQUFBO0VBQ0EsSUFBQSxJQUFNem5CLE9BQU8sR0FBR2lCLE1BQU0sQ0FBQ0UsVUFBUCxDQUFrQixJQUFsQixDQUFoQixDQUFBO0VBRUFuQixJQUFBQSxPQUFPLENBQUM4ZixTQUFSLEVBQUEsQ0FBQTtFQUNBOWYsSUFBQUEsT0FBTyxDQUFDK2YsR0FBUixDQUFZLEtBQUswSCxrQkFBakIsRUFBcUMsS0FBS0Esa0JBQTFDLEVBQThELEtBQUtBLGtCQUFuRSxFQUF1RixDQUF2RixFQUEwRnRyQixJQUFJLENBQUMyTCxFQUFMLEdBQVUsQ0FBcEcsRUFBdUcsSUFBdkcsQ0FBQSxDQUFBO0VBQ0E5SCxJQUFBQSxPQUFPLENBQUNrZ0IsU0FBUixFQUFBLENBQUE7RUFDQWxnQixJQUFBQSxPQUFPLENBQUN5ZixTQUFSLEdBQW9CLE1BQXBCLENBQUE7RUFDQXpmLElBQUFBLE9BQU8sQ0FBQ21nQixJQUFSLEVBQUEsQ0FBQTtFQUVBLElBQU9sZixPQUFBQSxNQUFNLENBQUN5bUIsU0FBUCxFQUFQLENBQUE7RUFDRDs7V0FFREMsaUJBQUEsU0FBZWhlLGNBQUFBLENBQUFBLFFBQWYsRUFBeUI7RUFDdkIsSUFBQSxJQUFNaWUsRUFBRSxHQUFHamUsUUFBUSxDQUFDcEUsSUFBVCxDQUFjdEgsS0FBekIsQ0FBQTtFQUNBLElBQUEsSUFBTTRwQixFQUFFLEdBQUdsZSxRQUFRLENBQUNwRSxJQUFULENBQWNySCxNQUF6QixDQUFBOztFQUVBLElBQU00cEIsSUFBQUEsTUFBTSxHQUFHOW1CLFNBQVMsQ0FBQ3JGLEtBQVYsQ0FBZ0JnTyxRQUFRLENBQUNwRSxJQUFULENBQWN0SCxLQUE5QixDQUFmLENBQUE7O0VBQ0EsSUFBTThwQixJQUFBQSxPQUFPLEdBQUcvbUIsU0FBUyxDQUFDckYsS0FBVixDQUFnQmdPLFFBQVEsQ0FBQ3BFLElBQVQsQ0FBY3JILE1BQTlCLENBQWhCLENBQUE7O0VBRUEsSUFBTThwQixJQUFBQSxPQUFPLEdBQUdyZSxRQUFRLENBQUNwRSxJQUFULENBQWN0SCxLQUFkLEdBQXNCNnBCLE1BQXRDLENBQUE7O0VBQ0EsSUFBTUcsSUFBQUEsT0FBTyxHQUFHdGUsUUFBUSxDQUFDcEUsSUFBVCxDQUFjckgsTUFBZCxHQUF1QjZwQixPQUF2QyxDQUFBOztFQUVBLElBQUEsSUFBSSxDQUFDLElBQUtsRCxDQUFBQSxjQUFMLENBQW9CbGIsUUFBUSxDQUFDOEcsSUFBVCxDQUFjL1AsR0FBbEMsQ0FBTCxFQUNFLElBQUtta0IsQ0FBQUEsY0FBTCxDQUFvQmxiLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYy9QLEdBQWxDLENBQXlDLEdBQUEsQ0FDdkMsS0FBSzJpQixFQUFMLENBQVE2RSxhQUFSLEVBRHVDLEVBRXZDLElBQUs3RSxDQUFBQSxFQUFMLENBQVFoRSxZQUFSLEVBRnVDLEVBR3ZDLElBQUEsQ0FBS2dFLEVBQUwsQ0FBUWhFLFlBQVIsRUFIdUMsQ0FBekMsQ0FBQTtFQU1GMVYsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMFgsT0FBZCxHQUF3QixJQUFLdEQsQ0FBQUEsY0FBTCxDQUFvQmxiLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYy9QLEdBQWxDLENBQUEsQ0FBdUMsQ0FBdkMsQ0FBeEIsQ0FBQTtFQUNBaUosSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMlgsUUFBZCxHQUF5QixJQUFLdkQsQ0FBQUEsY0FBTCxDQUFvQmxiLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYy9QLEdBQWxDLENBQUEsQ0FBdUMsQ0FBdkMsQ0FBekIsQ0FBQTtFQUNBaUosSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNFgsUUFBZCxHQUF5QixJQUFLeEQsQ0FBQUEsY0FBTCxDQUFvQmxiLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYy9QLEdBQWxDLENBQUEsQ0FBdUMsQ0FBdkMsQ0FBekIsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLMmlCLEVBQUwsQ0FBUTJELFVBQVIsQ0FBbUIsSUFBSzNELENBQUFBLEVBQUwsQ0FBUWlGLFlBQTNCLEVBQXlDM2UsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNFgsUUFBdkQsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtoRixFQUFMLENBQVE2RCxVQUFSLENBQ0UsS0FBSzdELEVBQUwsQ0FBUWlGLFlBRFYsRUFFRSxJQUFJcFYsWUFBSixDQUFpQixDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVc4VSxPQUFYLEVBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCQyxPQUE5QixFQUF1Q0EsT0FBdkMsRUFBZ0RBLE9BQWhELENBQWpCLENBRkYsRUFHRSxJQUFLNUUsQ0FBQUEsRUFBTCxDQUFRK0QsV0FIVixDQUFBLENBQUE7RUFLQSxJQUFBLElBQUEsQ0FBSy9ELEVBQUwsQ0FBUTJELFVBQVIsQ0FBbUIsSUFBSzNELENBQUFBLEVBQUwsQ0FBUWlGLFlBQTNCLEVBQXlDM2UsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMlgsUUFBdkQsQ0FBQSxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUsvRSxFQUFMLENBQVE2RCxVQUFSLENBQ0UsS0FBSzdELEVBQUwsQ0FBUWlGLFlBRFYsRUFFRSxJQUFJcFYsWUFBSixDQUFpQixDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcwVSxFQUFYLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QkMsRUFBekIsRUFBNkJELEVBQTdCLEVBQWlDQyxFQUFqQyxDQUFqQixDQUZGLEVBR0UsSUFBS3hFLENBQUFBLEVBQUwsQ0FBUStELFdBSFYsQ0FBQSxDQUFBO0VBTUEsSUFBTXBuQixJQUFBQSxPQUFPLEdBQUcySixRQUFRLENBQUM4RyxJQUFULENBQWN4UCxNQUFkLENBQXFCRSxVQUFyQixDQUFnQyxJQUFoQyxDQUFoQixDQUFBO0VBQ0EsSUFBQSxJQUFNc1AsSUFBSSxHQUFHelEsT0FBTyxDQUFDRCxZQUFSLENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCK25CLE1BQTNCLEVBQW1DQyxPQUFuQyxDQUFiLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBSzFFLEVBQUwsQ0FBUWtGLFdBQVIsQ0FBb0IsSUFBS2xGLENBQUFBLEVBQUwsQ0FBUW1GLFVBQTVCLEVBQXdDN2UsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMFgsT0FBdEQsQ0FBQSxDQUFBO0VBQ0EsSUFBSzlFLElBQUFBLENBQUFBLEVBQUwsQ0FBUW9GLFVBQVIsQ0FBbUIsSUFBQSxDQUFLcEYsRUFBTCxDQUFRbUYsVUFBM0IsRUFBdUMsQ0FBdkMsRUFBMEMsSUFBS25GLENBQUFBLEVBQUwsQ0FBUXFGLElBQWxELEVBQXdELElBQUtyRixDQUFBQSxFQUFMLENBQVFxRixJQUFoRSxFQUFzRSxJQUFBLENBQUtyRixFQUFMLENBQVFzRixhQUE5RSxFQUE2RmxZLElBQTdGLENBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLNFMsRUFBTCxDQUFRdUYsYUFBUixDQUFzQixJQUFBLENBQUt2RixFQUFMLENBQVFtRixVQUE5QixFQUEwQyxJQUFBLENBQUtuRixFQUFMLENBQVF3RixrQkFBbEQsRUFBc0UsSUFBS3hGLENBQUFBLEVBQUwsQ0FBUXlGLE1BQTlFLENBQUEsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLekYsRUFBTCxDQUFRdUYsYUFBUixDQUFzQixJQUFBLENBQUt2RixFQUFMLENBQVFtRixVQUE5QixFQUEwQyxJQUFBLENBQUtuRixFQUFMLENBQVEwRixrQkFBbEQsRUFBc0UsSUFBSzFGLENBQUFBLEVBQUwsQ0FBUTJGLHFCQUE5RSxDQUFBLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBSzNGLEVBQUwsQ0FBUTRGLGNBQVIsQ0FBdUIsSUFBSzVGLENBQUFBLEVBQUwsQ0FBUW1GLFVBQS9CLENBQUEsQ0FBQTtFQUVBN2UsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjeVksYUFBZCxHQUE4QixJQUE5QixDQUFBO0VBQ0F2ZixJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWMwWSxZQUFkLEdBQTZCdkIsRUFBN0IsQ0FBQTtFQUNBamUsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjMlksYUFBZCxHQUE4QnZCLEVBQTlCLENBQUE7RUFDRDs7V0FFRDNKLGlCQUFBLDBCQUFpQjtFQUVmO0VBQ0Q7O1dBRURRLG9CQUFBLFNBQWtCL1UsaUJBQUFBLENBQUFBLFFBQWxCLEVBQTRCO0VBQzFCQSxJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWN5WSxhQUFkLEdBQThCLEtBQTlCLENBQUE7RUFDQXZmLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRZLElBQWQsR0FBcUJ0VyxJQUFJLENBQUNuTyxNQUFMLEVBQXJCLENBQUE7RUFDQStFLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzRZLElBQWQsQ0FBbUIsQ0FBbkIsSUFBd0IsQ0FBeEIsQ0FBQTtFQUNBMWYsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNlksSUFBZCxHQUFxQnZXLElBQUksQ0FBQ25PLE1BQUwsRUFBckIsQ0FBQTtFQUNBK0UsSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjNlksSUFBZCxDQUFtQixDQUFuQixJQUF3QixDQUF4QixDQUFBOztFQUVBLElBQUkzZixJQUFBQSxRQUFRLENBQUNwRSxJQUFiLEVBQW1CO0VBQ2pCekMsTUFBQUEsT0FBTyxDQUFDeEMsZUFBUixDQUF3QnFKLFFBQVEsQ0FBQ3BFLElBQWpDLEVBQXVDLElBQUEsQ0FBSzBaLFdBQTVDLEVBQXlEdFYsUUFBekQsQ0FBQSxDQUFBO0VBQ0QsS0FGRCxNQUVPO0VBQ0w3RyxNQUFBQSxPQUFPLENBQUN4QyxlQUFSLENBQXdCLElBQUEsQ0FBS2trQixlQUE3QixFQUE4QyxJQUFBLENBQUt2RixXQUFuRCxFQUFnRXRWLFFBQWhFLENBQUEsQ0FBQTtFQUNBQSxNQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWM4WSxRQUFkLEdBQXlCNWYsUUFBUSxDQUFDdUgsTUFBVCxHQUFrQixJQUFBLENBQUt1VyxrQkFBaEQsQ0FBQTtFQUNELEtBQUE7RUFDRjs7O0VBR0R4SSxFQUFBQSxNQUFBQSxDQUFBQSxjQUFBLFNBQUEsV0FBQSxDQUFZMWUsR0FBWixFQUFpQm9KLFFBQWpCLEVBQTJCO0VBQ3pCLElBQUlBLElBQUFBLFFBQVEsQ0FBQ29ILElBQWIsRUFBbUIsT0FBQTtFQUNuQnBILElBQUFBLFFBQVEsQ0FBQ3BFLElBQVQsR0FBZ0JoRixHQUFoQixDQUFBO0VBQ0FvSixJQUFBQSxRQUFRLENBQUM4RyxJQUFULENBQWMvUCxHQUFkLEdBQW9CSCxHQUFHLENBQUNHLEdBQXhCLENBQUE7RUFDQWlKLElBQUFBLFFBQVEsQ0FBQzhHLElBQVQsQ0FBY3hQLE1BQWQsR0FBdUI2QixPQUFPLENBQUMvQixrQkFBUixDQUEyQlIsR0FBM0IsQ0FBdkIsQ0FBQTtFQUNBb0osSUFBQUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjOFksUUFBZCxHQUF5QixDQUF6QixDQUFBO0VBRUEsSUFBSzVCLElBQUFBLENBQUFBLGNBQUwsQ0FBb0JoZSxRQUFwQixDQUFBLENBQUE7RUFDRDs7V0FFRGlWLG1CQUFBLFNBQWlCalYsZ0JBQUFBLENBQUFBLFFBQWpCLEVBQTJCO0VBQ3pCLElBQUEsSUFBSUEsUUFBUSxDQUFDOEcsSUFBVCxDQUFjeVksYUFBbEIsRUFBaUM7RUFDL0IsTUFBS00sSUFBQUEsQ0FBQUEsWUFBTCxDQUFrQjdmLFFBQWxCLENBQUEsQ0FBQTtFQUVBLE1BQUEsSUFBQSxDQUFLMFosRUFBTCxDQUFRb0csU0FBUixDQUFrQixJQUFLNUQsQ0FBQUEsUUFBTCxDQUFjamYsS0FBaEMsRUFBdUMrQyxRQUFRLENBQUMrRyxHQUFULENBQWE5RCxDQUFiLEdBQWlCLEdBQXhELEVBQTZEakQsUUFBUSxDQUFDK0csR0FBVCxDQUFhN0QsQ0FBYixHQUFpQixHQUE5RSxFQUFtRmxELFFBQVEsQ0FBQytHLEdBQVQsQ0FBYTlULENBQWIsR0FBaUIsR0FBcEcsQ0FBQSxDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUt5bUIsRUFBTCxDQUFRcUcsZ0JBQVIsQ0FBeUIsS0FBSzdELFFBQUwsQ0FBY1csV0FBdkMsRUFBb0QsS0FBcEQsRUFBMkQsSUFBQSxDQUFLbEMsTUFBTCxDQUFZbkIsR0FBWixFQUEzRCxDQUFBLENBQUE7RUFFQSxNQUFBLElBQUEsQ0FBS0UsRUFBTCxDQUFRMkQsVUFBUixDQUFtQixJQUFLM0QsQ0FBQUEsRUFBTCxDQUFRaUYsWUFBM0IsRUFBeUMzZSxRQUFRLENBQUM4RyxJQUFULENBQWMyWCxRQUF2RCxDQUFBLENBQUE7RUFDQSxNQUFLL0UsSUFBQUEsQ0FBQUEsRUFBTCxDQUFRc0csbUJBQVIsQ0FBNEIsS0FBSzlELFFBQUwsQ0FBY08sR0FBMUMsRUFBK0MsQ0FBL0MsRUFBa0QsSUFBSy9DLENBQUFBLEVBQUwsQ0FBUXVHLEtBQTFELEVBQWlFLEtBQWpFLEVBQXdFLENBQXhFLEVBQTJFLENBQTNFLENBQUEsQ0FBQTtFQUNBLE1BQUEsSUFBQSxDQUFLdkcsRUFBTCxDQUFRMkQsVUFBUixDQUFtQixJQUFLM0QsQ0FBQUEsRUFBTCxDQUFRaUYsWUFBM0IsRUFBeUMzZSxRQUFRLENBQUM4RyxJQUFULENBQWM0WCxRQUF2RCxDQUFBLENBQUE7RUFDQSxNQUFLaEYsSUFBQUEsQ0FBQUEsRUFBTCxDQUFRc0csbUJBQVIsQ0FBNEIsS0FBSzlELFFBQUwsQ0FBY1MsR0FBMUMsRUFBK0MsQ0FBL0MsRUFBa0QsSUFBS2pELENBQUFBLEVBQUwsQ0FBUXVHLEtBQTFELEVBQWlFLEtBQWpFLEVBQXdFLENBQXhFLEVBQTJFLENBQTNFLENBQUEsQ0FBQTtFQUNBLE1BQUEsSUFBQSxDQUFLdkcsRUFBTCxDQUFRa0YsV0FBUixDQUFvQixJQUFLbEYsQ0FBQUEsRUFBTCxDQUFRbUYsVUFBNUIsRUFBd0M3ZSxRQUFRLENBQUM4RyxJQUFULENBQWMwWCxPQUF0RCxDQUFBLENBQUE7RUFDQSxNQUFLOUUsSUFBQUEsQ0FBQUEsRUFBTCxDQUFRdUQsU0FBUixDQUFrQixLQUFLZixRQUFMLENBQWNhLGNBQWhDLEVBQWdELENBQWhELENBQUEsQ0FBQTtFQUNBLE1BQUtyRCxJQUFBQSxDQUFBQSxFQUFMLENBQVEyRCxVQUFSLENBQW1CLElBQUEsQ0FBSzNELEVBQUwsQ0FBUTRELG9CQUEzQixFQUFpRCxJQUFBLENBQUtGLFdBQXRELENBQUEsQ0FBQTtFQUVBLE1BQUEsSUFBQSxDQUFLMUQsRUFBTCxDQUFRd0csWUFBUixDQUFxQixJQUFBLENBQUt4RyxFQUFMLENBQVF5RyxTQUE3QixFQUF3QyxDQUF4QyxFQUEyQyxJQUFLekcsQ0FBQUEsRUFBTCxDQUFRMEcsY0FBbkQsRUFBbUUsQ0FBbkUsQ0FBQSxDQUFBO0VBQ0EsTUFBS3pGLElBQUFBLENBQUFBLE1BQUwsQ0FBWS9mLEdBQVosRUFBQSxDQUFBO0VBQ0QsS0FBQTtFQUNGOztFQUVEdWEsRUFBQUEsTUFBQUEsQ0FBQUEsaUJBQUEsU0FBQSxjQUFBLENBQWVuVixRQUFmLEVBQXlCOztXQUV6QjZmLGVBQUEsU0FBYTdmLFlBQUFBLENBQUFBLFFBQWIsRUFBdUI7RUFDckIsSUFBTXFnQixJQUFBQSxnQkFBZ0IsR0FBR2hwQixTQUFTLENBQUNuRixlQUFWLENBQ3ZCLENBQUM4TixRQUFRLENBQUM4RyxJQUFULENBQWMwWSxZQUFmLEdBQThCLENBRFAsRUFFdkIsQ0FBQ3hmLFFBQVEsQ0FBQzhHLElBQVQsQ0FBYzJZLGFBQWYsR0FBK0IsQ0FGUixDQUF6QixDQUFBO0VBSUEsSUFBQSxJQUFNYSxpQkFBaUIsR0FBR2pwQixTQUFTLENBQUNuRixlQUFWLENBQTBCOE4sUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBckMsRUFBd0M0SyxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFuRCxDQUExQixDQUFBO0VBRUEsSUFBTWtyQixJQUFBQSxLQUFLLEdBQUd2Z0IsUUFBUSxDQUFDd0gsUUFBVCxHQUFvQmxKLFFBQVEsQ0FBQ0csTUFBM0MsQ0FBQTtFQUNBLElBQUEsSUFBTStoQixjQUFjLEdBQUducEIsU0FBUyxDQUFDaEYsWUFBVixDQUF1Qmt1QixLQUF2QixDQUF2QixDQUFBO0VBRUEsSUFBTWpyQixJQUFBQSxLQUFLLEdBQUcwSyxRQUFRLENBQUMxSyxLQUFULEdBQWlCMEssUUFBUSxDQUFDOEcsSUFBVCxDQUFjOFksUUFBN0MsQ0FBQTtFQUNBLElBQU1hLElBQUFBLFdBQVcsR0FBR3BwQixTQUFTLENBQUN6RSxTQUFWLENBQW9CMEMsS0FBcEIsRUFBMkJBLEtBQTNCLENBQXBCLENBQUE7RUFDQSxJQUFJb3JCLElBQUFBLE1BQU0sR0FBR3JwQixTQUFTLENBQUN0RSxjQUFWLENBQXlCc3RCLGdCQUF6QixFQUEyQ0ksV0FBM0MsQ0FBYixDQUFBO0VBRUFDLElBQUFBLE1BQU0sR0FBR3JwQixTQUFTLENBQUN0RSxjQUFWLENBQXlCMnRCLE1BQXpCLEVBQWlDRixjQUFqQyxDQUFULENBQUE7RUFDQUUsSUFBQUEsTUFBTSxHQUFHcnBCLFNBQVMsQ0FBQ3RFLGNBQVYsQ0FBeUIydEIsTUFBekIsRUFBaUNKLGlCQUFqQyxDQUFULENBQUE7RUFFQWxYLElBQUFBLElBQUksQ0FBQ08sT0FBTCxDQUFhK1csTUFBYixFQUFxQjFnQixRQUFRLENBQUM4RyxJQUFULENBQWM2WSxJQUFuQyxDQUFBLENBQUE7RUFDQWUsSUFBQUEsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZMWdCLFFBQVEsQ0FBQzJHLEtBQXJCLENBQUE7RUFFQSxJQUFBLElBQUEsQ0FBS2dVLE1BQUwsQ0FBWTNmLElBQVosQ0FBaUIwbEIsTUFBakIsQ0FBQSxDQUFBO0VBQ0Q7O0VBRURybkIsRUFBQUEsTUFBQUEsQ0FBQUEsVUFBQSxTQUFVLE9BQUEsR0FBQTtFQUNSLElBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTUEsT0FBTixDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTs7RUFDQSxJQUFLcWdCLElBQUFBLENBQUFBLEVBQUwsR0FBVSxJQUFWLENBQUE7RUFDQSxJQUFLaUIsSUFBQUEsQ0FBQUEsTUFBTCxHQUFjLElBQWQsQ0FBQTtFQUNBLElBQUtGLElBQUFBLENBQUFBLElBQUwsR0FBWSxJQUFaLENBQUE7RUFDQSxJQUFLQyxJQUFBQSxDQUFBQSxJQUFMLEdBQVksSUFBWixDQUFBO0VBQ0EsSUFBS1EsSUFBQUEsQ0FBQUEsY0FBTCxHQUFzQixJQUF0QixDQUFBO0VBQ0Q7OztJQWhUd0NuSDs7TUNSdEI0TTs7O0VBQ25CLEVBQUEsU0FBQSxjQUFBLENBQVkzTSxPQUFaLEVBQXFCO0VBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTs7RUFDbkIsSUFBQSxLQUFBLEdBQUEsYUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQU1BLE9BQU4sQ0FBQSxJQUFBLElBQUEsQ0FBQTtFQUVBLElBQUt2WCxLQUFBQSxDQUFBQSxJQUFMLEdBQVksZ0JBQVosQ0FBQTtFQUhtQixJQUFBLE9BQUEsS0FBQSxDQUFBO0VBSXBCLEdBQUE7OztJQUx5Q3NYOztNQ0V2QjZNOzs7RUFDbkIsRUFBWUMsU0FBQUEsUUFBQUEsQ0FBQUEsRUFBWixFQUFnQkMsRUFBaEIsRUFBb0JDLEVBQXBCLEVBQXdCQyxFQUF4QixFQUE0QkMsU0FBNUIsRUFBdUM7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUNyQyxJQUFBLEtBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQTs7RUFFQSxJQUFBLElBQUlGLEVBQUUsR0FBR0YsRUFBTCxJQUFXLENBQWYsRUFBa0I7RUFDaEIsTUFBS0EsS0FBQUEsQ0FBQUEsRUFBTCxHQUFVQSxFQUFWLENBQUE7RUFDQSxNQUFLQyxLQUFBQSxDQUFBQSxFQUFMLEdBQVVBLEVBQVYsQ0FBQTtFQUNBLE1BQUtDLEtBQUFBLENBQUFBLEVBQUwsR0FBVUEsRUFBVixDQUFBO0VBQ0EsTUFBS0MsS0FBQUEsQ0FBQUEsRUFBTCxHQUFVQSxFQUFWLENBQUE7RUFDRCxLQUxELE1BS087RUFDTCxNQUFLSCxLQUFBQSxDQUFBQSxFQUFMLEdBQVVFLEVBQVYsQ0FBQTtFQUNBLE1BQUtELEtBQUFBLENBQUFBLEVBQUwsR0FBVUUsRUFBVixDQUFBO0VBQ0EsTUFBS0QsS0FBQUEsQ0FBQUEsRUFBTCxHQUFVRixFQUFWLENBQUE7RUFDQSxNQUFLRyxLQUFBQSxDQUFBQSxFQUFMLEdBQVVGLEVBQVYsQ0FBQTtFQUNELEtBQUE7O0VBRUQsSUFBQSxLQUFBLENBQUt0YSxFQUFMLEdBQVUsS0FBQSxDQUFLdWEsRUFBTCxHQUFVLE1BQUtGLEVBQXpCLENBQUE7RUFDQSxJQUFBLEtBQUEsQ0FBS3BhLEVBQUwsR0FBVSxLQUFBLENBQUt1YSxFQUFMLEdBQVUsTUFBS0YsRUFBekIsQ0FBQTtFQUVBLElBQUtJLEtBQUFBLENBQUFBLElBQUwsR0FBWTF1QixJQUFJLENBQUMydUIsR0FBTCxDQUFTLEtBQUEsQ0FBS04sRUFBZCxFQUFrQixLQUFLRSxDQUFBQSxFQUF2QixDQUFaLENBQUE7RUFDQSxJQUFLSyxLQUFBQSxDQUFBQSxJQUFMLEdBQVk1dUIsSUFBSSxDQUFDMnVCLEdBQUwsQ0FBUyxLQUFBLENBQUtMLEVBQWQsRUFBa0IsS0FBS0UsQ0FBQUEsRUFBdkIsQ0FBWixDQUFBO0VBQ0EsSUFBS0ssS0FBQUEsQ0FBQUEsSUFBTCxHQUFZN3VCLElBQUksQ0FBQ29WLEdBQUwsQ0FBUyxLQUFBLENBQUtpWixFQUFkLEVBQWtCLEtBQUtFLENBQUFBLEVBQXZCLENBQVosQ0FBQTtFQUNBLElBQUtPLEtBQUFBLENBQUFBLElBQUwsR0FBWTl1QixJQUFJLENBQUNvVixHQUFMLENBQVMsS0FBQSxDQUFLa1osRUFBZCxFQUFrQixLQUFLRSxDQUFBQSxFQUF2QixDQUFaLENBQUE7RUFFQSxJQUFBLEtBQUEsQ0FBSzlhLEdBQUwsR0FBVyxLQUFLNmEsQ0FBQUEsRUFBTCxHQUFVLEtBQUEsQ0FBS0QsRUFBZixHQUFvQixLQUFLRCxDQUFBQSxFQUFMLEdBQVUsS0FBQSxDQUFLRyxFQUE5QyxDQUFBO0VBQ0EsSUFBQSxLQUFBLENBQUtPLElBQUwsR0FBWSxLQUFLL2EsQ0FBQUEsRUFBTCxHQUFVLEtBQUEsQ0FBS0EsRUFBZixHQUFvQixLQUFLQyxDQUFBQSxFQUFMLEdBQVUsS0FBQSxDQUFLQSxFQUEvQyxDQUFBO0VBRUEsSUFBQSxLQUFBLENBQUt5SixRQUFMLEdBQWdCLEtBQUt6SyxDQUFBQSxXQUFMLEVBQWhCLENBQUE7RUFDQSxJQUFBLEtBQUEsQ0FBSzFULE1BQUwsR0FBYyxLQUFLeXZCLENBQUFBLFNBQUwsRUFBZCxDQUFBO0VBQ0EsSUFBS1AsS0FBQUEsQ0FBQUEsU0FBTCxHQUFpQi9sQixJQUFJLENBQUN6RCxTQUFMLENBQWV3cEIsU0FBZixFQUEwQixHQUExQixDQUFqQixDQUFBO0VBNUJxQyxJQUFBLE9BQUEsS0FBQSxDQUFBO0VBNkJ0QyxHQUFBOzs7O0VBRUR6VixFQUFBQSxNQUFBQSxDQUFBQSxjQUFBLFNBQWMsV0FBQSxHQUFBO0VBQ1osSUFBQSxJQUFBLENBQUtqVCxNQUFMLEdBQWMvRixJQUFJLENBQUMrRixNQUFMLEVBQWQsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLOFMsTUFBTCxDQUFZalcsQ0FBWixHQUFnQixJQUFLeXJCLENBQUFBLEVBQUwsR0FBVSxJQUFLdG9CLENBQUFBLE1BQUwsR0FBYyxJQUFLeEcsQ0FBQUEsTUFBbkIsR0FBNEJTLElBQUksQ0FBQ0MsR0FBTCxDQUFTLElBQUEsQ0FBS3lkLFFBQWQsQ0FBdEQsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLN0UsTUFBTCxDQUFZaFcsQ0FBWixHQUFnQixJQUFLeXJCLENBQUFBLEVBQUwsR0FBVSxJQUFLdm9CLENBQUFBLE1BQUwsR0FBYyxJQUFLeEcsQ0FBQUEsTUFBbkIsR0FBNEJTLElBQUksQ0FBQ0csR0FBTCxDQUFTLElBQUEsQ0FBS3VkLFFBQWQsQ0FBdEQsQ0FBQTtFQUVBLElBQUEsT0FBTyxLQUFLN0UsTUFBWixDQUFBO0VBQ0Q7O0VBRURwRSxFQUFBQSxNQUFBQSxDQUFBQSxlQUFBLFNBQUEsWUFBQSxDQUFhN1IsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUI7RUFDakIsSUFBTThsQixJQUFBQSxDQUFDLEdBQUcsSUFBQSxDQUFLMVUsRUFBZixDQUFBO0VBQ0EsSUFBQSxJQUFNMlUsQ0FBQyxHQUFHLENBQUMsSUFBQSxDQUFLNVUsRUFBaEIsQ0FBQTtFQUNBLElBQU1pYixJQUFBQSxDQUFDLEdBQUcsSUFBQSxDQUFLdmIsR0FBZixDQUFBO0VBQ0EsSUFBTXdiLElBQUFBLENBQUMsR0FBR3RHLENBQUMsS0FBSyxDQUFOLEdBQVUsQ0FBVixHQUFjQSxDQUF4QixDQUFBO0VBRUEsSUFBSSxJQUFBLENBQUNELENBQUMsR0FBRy9sQixDQUFKLEdBQVFnbUIsQ0FBQyxHQUFHL2xCLENBQVosR0FBZ0Jvc0IsQ0FBakIsSUFBc0JDLENBQXRCLEdBQTBCLENBQTlCLEVBQWlDLE9BQU8sSUFBUCxDQUFqQyxLQUNLLE9BQU8sS0FBUCxDQUFBO0VBQ047O0VBRURDLEVBQUFBLE1BQUFBLENBQUFBLGNBQUEsU0FBQSxXQUFBLENBQVl2c0IsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0VBQ2hCLElBQU04bEIsSUFBQUEsQ0FBQyxHQUFHLElBQUEsQ0FBSzFVLEVBQWYsQ0FBQTtFQUNBLElBQUEsSUFBTTJVLENBQUMsR0FBRyxDQUFDLElBQUEsQ0FBSzVVLEVBQWhCLENBQUE7RUFDQSxJQUFNaWIsSUFBQUEsQ0FBQyxHQUFHLElBQUEsQ0FBS3ZiLEdBQWYsQ0FBQTtFQUNBLElBQU13YixJQUFBQSxDQUFDLEdBQUd2RyxDQUFDLEdBQUcvbEIsQ0FBSixHQUFRZ21CLENBQUMsR0FBRy9sQixDQUFaLEdBQWdCb3NCLENBQTFCLENBQUE7RUFFQSxJQUFPQyxPQUFBQSxDQUFDLEdBQUdsdkIsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLElBQUEsQ0FBSzBjLElBQWYsQ0FBWCxDQUFBO0VBQ0Q7O1dBRURLLGVBQUEsU0FBYXhoQixZQUFBQSxDQUFBQSxDQUFiLEVBQWdCO0VBQ2QsSUFBQSxJQUFNeWhCLElBQUksR0FBR3poQixDQUFDLENBQUNxRixXQUFGLEVBQWIsQ0FBQTtFQUNBLElBQUEsSUFBTXFjLElBQUksR0FBRyxJQUFLcmMsQ0FBQUEsV0FBTCxFQUFiLENBQUE7RUFDQSxJQUFBLElBQU1jLEdBQUcsR0FBRyxDQUFBLElBQUt1YixJQUFJLEdBQUdELElBQVosQ0FBWixDQUFBO0VBRUEsSUFBQSxJQUFNRSxJQUFJLEdBQUczaEIsQ0FBQyxDQUFDaEwsQ0FBZixDQUFBO0VBQ0EsSUFBQSxJQUFNNHNCLElBQUksR0FBRzVoQixDQUFDLENBQUMvSyxDQUFmLENBQUE7RUFFQStLLElBQUFBLENBQUMsQ0FBQ2hMLENBQUYsR0FBTTJzQixJQUFJLEdBQUd2dkIsSUFBSSxDQUFDQyxHQUFMLENBQVM4VCxHQUFULENBQVAsR0FBdUJ5YixJQUFJLEdBQUd4dkIsSUFBSSxDQUFDRyxHQUFMLENBQVM0VCxHQUFULENBQXBDLENBQUE7RUFDQW5HLElBQUFBLENBQUMsQ0FBQy9LLENBQUYsR0FBTTBzQixJQUFJLEdBQUd2dkIsSUFBSSxDQUFDRyxHQUFMLENBQVM0VCxHQUFULENBQVAsR0FBdUJ5YixJQUFJLEdBQUd4dkIsSUFBSSxDQUFDQyxHQUFMLENBQVM4VCxHQUFULENBQXBDLENBQUE7RUFFQSxJQUFBLE9BQU9uRyxDQUFQLENBQUE7RUFDRDs7RUFFRHFGLEVBQUFBLE1BQUFBLENBQUFBLGNBQUEsU0FBYyxXQUFBLEdBQUE7RUFDWixJQUFPalQsT0FBQUEsSUFBSSxDQUFDa1QsS0FBTCxDQUFXLEtBQUtlLEVBQWhCLEVBQW9CLElBQUtELENBQUFBLEVBQXpCLENBQVAsQ0FBQTtFQUNEOztXQUVEeWIsV0FBQSxTQUFTamlCLFFBQUFBLENBQUFBLFFBQVQsRUFBbUI7RUFDakIsSUFBTTJQLElBQUFBLEtBQUssR0FBR25kLElBQUksQ0FBQ3NXLEdBQUwsQ0FBUyxJQUFBLENBQUtyRCxXQUFMLEVBQVQsQ0FBZCxDQUFBOztFQUVBLElBQUEsSUFBSWtLLEtBQUssSUFBSXJSLFFBQVEsQ0FBQ0gsRUFBVCxHQUFjLENBQTNCLEVBQThCO0VBQzVCLE1BQUEsSUFBSTZCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsSUFBZ0IsS0FBS2lzQixJQUFyQixJQUE2QnJoQixRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLElBQWdCLEtBQUs4ckIsSUFBdEQsRUFBNEQsT0FBTyxJQUFQLENBQUE7RUFDN0QsS0FGRCxNQUVPO0VBQ0wsTUFBQSxJQUFJbGhCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsSUFBZ0IsS0FBS2lzQixJQUFyQixJQUE2QnRoQixRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLElBQWdCLEtBQUsrckIsSUFBdEQsRUFBNEQsT0FBTyxJQUFQLENBQUE7RUFDN0QsS0FBQTs7RUFFRCxJQUFBLE9BQU8sS0FBUCxDQUFBO0VBQ0Q7O0VBRURJLEVBQUFBLE1BQUFBLENBQUFBLFlBQUEsU0FBWSxTQUFBLEdBQUE7RUFDVixJQUFBLE9BQU9odkIsSUFBSSxDQUFDcVMsSUFBTCxDQUFVLEtBQUsyQixFQUFMLEdBQVUsSUFBS0EsQ0FBQUEsRUFBZixHQUFvQixJQUFLQyxDQUFBQSxFQUFMLEdBQVUsSUFBQSxDQUFLQSxFQUE3QyxDQUFQLENBQUE7RUFDRDs7V0FFRGdGLFdBQUEsU0FBU3pMLFFBQUFBLENBQUFBLFFBQVQsRUFBbUI7RUFDakIsSUFBQSxJQUFJLElBQUtzTCxDQUFBQSxTQUFMLEtBQW1CLE1BQXZCLEVBQStCO0VBQzdCLE1BQUEsSUFBSSxLQUFLMlYsU0FBTCxLQUFtQixHQUFuQixJQUEwQixJQUFBLENBQUtBLFNBQUwsS0FBbUIsR0FBN0MsSUFBb0QsSUFBS0EsQ0FBQUEsU0FBTCxLQUFtQixPQUF2RSxJQUFrRixLQUFLQSxTQUFMLEtBQW1CLE1BQXpHLEVBQWlIO0VBQy9HLFFBQUEsSUFBSSxDQUFDLElBQUtnQixDQUFBQSxRQUFMLENBQWNqaUIsUUFBZCxDQUFMLEVBQThCLE9BQUE7RUFDOUIsUUFBSSxJQUFBLElBQUEsQ0FBS2lILFlBQUwsQ0FBa0JqSCxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUE3QixFQUFnQzRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQTNDLENBQUosRUFBbUQySyxRQUFRLENBQUNvSCxJQUFULEdBQWdCLElBQWhCLENBQUE7RUFDcEQsT0FIRCxNQUdPO0VBQ0wsUUFBQSxJQUFJLENBQUMsSUFBSzZhLENBQUFBLFFBQUwsQ0FBY2ppQixRQUFkLENBQUwsRUFBOEIsT0FBQTtFQUM5QixRQUFJLElBQUEsQ0FBQyxLQUFLaUgsWUFBTCxDQUFrQmpILFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQTdCLEVBQWdDNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBM0MsQ0FBTCxFQUFvRDJLLFFBQVEsQ0FBQ29ILElBQVQsR0FBZ0IsSUFBaEIsQ0FBQTtFQUNyRCxPQUFBO0VBQ0YsS0FSRCxNQVFPLElBQUksSUFBQSxDQUFLa0UsU0FBTCxLQUFtQixPQUF2QixFQUFnQztFQUNyQyxNQUFBLElBQUksQ0FBQyxJQUFLMlcsQ0FBQUEsUUFBTCxDQUFjamlCLFFBQWQsQ0FBTCxFQUE4QixPQUFBOztFQUU5QixNQUFBLElBQUksS0FBSzJoQixXQUFMLENBQWlCM2hCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQTVCLEVBQStCNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBMUMsS0FBZ0QySyxRQUFRLENBQUN1SCxNQUE3RCxFQUFxRTtFQUNuRSxRQUFBLElBQUksSUFBS2YsQ0FBQUEsRUFBTCxLQUFZLENBQWhCLEVBQW1CO0VBQ2pCeEcsVUFBQUEsUUFBUSxDQUFDSSxDQUFULENBQVdoTCxDQUFYLElBQWdCLENBQUMsQ0FBakIsQ0FBQTtFQUNELFNBRkQsTUFFTyxJQUFJLElBQUEsQ0FBS3FSLEVBQUwsS0FBWSxDQUFoQixFQUFtQjtFQUN4QnpHLFVBQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxJQUFnQixDQUFDLENBQWpCLENBQUE7RUFDRCxTQUZNLE1BRUE7RUFDTCxVQUFBLElBQUEsQ0FBS3VzQixZQUFMLENBQWtCNWhCLFFBQVEsQ0FBQ0ksQ0FBM0IsQ0FBQSxDQUFBO0VBQ0QsU0FBQTtFQUNGLE9BQUE7RUFDRixLQVpNLE1BWUEsSUFBSSxJQUFBLENBQUtrTCxTQUFMLEtBQW1CLE9BQXZCLEVBQWdDO0VBQ3JDLE1BQUksSUFBQSxJQUFBLENBQUtDLEtBQVQsRUFBZ0I7RUFDZEksUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsZ0RBQWQsQ0FBQSxDQUFBO0VBQ0EsUUFBS0wsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhLEtBQWIsQ0FBQTtFQUNELE9BQUE7RUFDRixLQUFBO0VBQ0Y7OztJQXhIbUNIOztNQ0RqQjhXOzs7RUFDbkIsRUFBQSxTQUFBLFVBQUEsQ0FBWTlzQixDQUFaLEVBQWVDLENBQWYsRUFBa0JrUyxNQUFsQixFQUEwQjtFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQ3hCLElBQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBO0VBRUEsSUFBS25TLEtBQUFBLENBQUFBLENBQUwsR0FBU0EsQ0FBVCxDQUFBO0VBQ0EsSUFBS0MsS0FBQUEsQ0FBQUEsQ0FBTCxHQUFTQSxDQUFULENBQUE7RUFDQSxJQUFLa1MsS0FBQUEsQ0FBQUEsTUFBTCxHQUFjQSxNQUFkLENBQUE7RUFDQSxJQUFLb0ksS0FBQUEsQ0FBQUEsS0FBTCxHQUFhLENBQWIsQ0FBQTtFQUNBLElBQUEsS0FBQSxDQUFLNVEsTUFBTCxHQUFjO0VBQUUzSixNQUFBQSxDQUFDLEVBQURBLENBQUY7RUFBS0MsTUFBQUEsQ0FBQyxFQUFEQSxDQUFBQTtFQUFMLEtBQWQsQ0FBQTtFQVB3QixJQUFBLE9BQUEsS0FBQSxDQUFBO0VBUXpCLEdBQUE7Ozs7RUFFRG1XLEVBQUFBLE1BQUFBLENBQUFBLGNBQUEsU0FBYyxXQUFBLEdBQUE7RUFDWixJQUFLbUUsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhclIsUUFBUSxDQUFDQyxJQUFULEdBQWdCL0wsSUFBSSxDQUFDK0YsTUFBTCxFQUE3QixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUs0cEIsWUFBTCxHQUFvQjN2QixJQUFJLENBQUMrRixNQUFMLEVBQUEsR0FBZ0IsS0FBS2dQLE1BQXpDLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBSzhELE1BQUwsQ0FBWWpXLENBQVosR0FBZ0IsSUFBQSxDQUFLQSxDQUFMLEdBQVMsSUFBQSxDQUFLK3NCLFlBQUwsR0FBb0IzdkIsSUFBSSxDQUFDQyxHQUFMLENBQVMsSUFBQSxDQUFLa2QsS0FBZCxDQUE3QyxDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUt0RSxNQUFMLENBQVloVyxDQUFaLEdBQWdCLElBQUEsQ0FBS0EsQ0FBTCxHQUFTLElBQUEsQ0FBSzhzQixZQUFMLEdBQW9CM3ZCLElBQUksQ0FBQ0csR0FBTCxDQUFTLElBQUEsQ0FBS2dkLEtBQWQsQ0FBN0MsQ0FBQTtFQUVBLElBQUEsT0FBTyxLQUFLdEUsTUFBWixDQUFBO0VBQ0Q7O0VBRUQrVyxFQUFBQSxNQUFBQSxDQUFBQSxZQUFBLFNBQUEsU0FBQSxDQUFVaHRCLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtFQUNkLElBQUEsSUFBQSxDQUFLMEosTUFBTCxDQUFZM0osQ0FBWixHQUFnQkEsQ0FBaEIsQ0FBQTtFQUNBLElBQUEsSUFBQSxDQUFLMkosTUFBTCxDQUFZMUosQ0FBWixHQUFnQkEsQ0FBaEIsQ0FBQTtFQUNEOztXQUVEb1csV0FBQSxTQUFTekwsUUFBQUEsQ0FBQUEsUUFBVCxFQUFtQjtFQUNqQixJQUFNNEosSUFBQUEsQ0FBQyxHQUFHNUosUUFBUSxDQUFDdEYsQ0FBVCxDQUFXMkwsVUFBWCxDQUFzQixJQUFLdEgsQ0FBQUEsTUFBM0IsQ0FBVixDQUFBOztFQUVBLElBQUEsSUFBSSxJQUFLdU0sQ0FBQUEsU0FBTCxLQUFtQixNQUF2QixFQUErQjtFQUM3QixNQUFBLElBQUkxQixDQUFDLEdBQUc1SixRQUFRLENBQUN1SCxNQUFiLEdBQXNCLElBQUtBLENBQUFBLE1BQS9CLEVBQXVDdkgsUUFBUSxDQUFDb0gsSUFBVCxHQUFnQixJQUFoQixDQUFBO0VBQ3hDLEtBRkQsTUFFTyxJQUFJLElBQUEsQ0FBS2tFLFNBQUwsS0FBbUIsT0FBdkIsRUFBZ0M7RUFDckMsTUFBQSxJQUFJMUIsQ0FBQyxHQUFHNUosUUFBUSxDQUFDdUgsTUFBYixJQUF1QixJQUFLQSxDQUFBQSxNQUFoQyxFQUF3QyxJQUFBLENBQUtxYSxZQUFMLENBQWtCNWhCLFFBQWxCLENBQUEsQ0FBQTtFQUN6QyxLQUZNLE1BRUEsSUFBSSxJQUFBLENBQUtzTCxTQUFMLEtBQW1CLE9BQXZCLEVBQWdDO0VBQ3JDLE1BQUksSUFBQSxJQUFBLENBQUtDLEtBQVQsRUFBZ0I7RUFDZEksUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsa0RBQWQsQ0FBQSxDQUFBO0VBQ0EsUUFBS0wsSUFBQUEsQ0FBQUEsS0FBTCxHQUFhLEtBQWIsQ0FBQTtFQUNELE9BQUE7RUFDRixLQUFBO0VBQ0Y7O1dBRURxVyxlQUFBLFNBQWE1aEIsWUFBQUEsQ0FBQUEsUUFBYixFQUF1QjtFQUNyQixJQUFBLElBQU02aEIsSUFBSSxHQUFHN2hCLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXcUYsV0FBWCxFQUFiLENBQUE7RUFDQSxJQUFBLElBQU1xYyxJQUFJLEdBQUcsSUFBQSxDQUFLcmMsV0FBTCxDQUFpQnpGLFFBQWpCLENBQWIsQ0FBQTtFQUVBLElBQUEsSUFBTXVHLEdBQUcsR0FBRyxDQUFBLElBQUt1YixJQUFJLEdBQUdELElBQVosQ0FBWixDQUFBO0VBQ0EsSUFBQSxJQUFNRSxJQUFJLEdBQUcvaEIsUUFBUSxDQUFDSSxDQUFULENBQVdoTCxDQUF4QixDQUFBO0VBQ0EsSUFBQSxJQUFNNHNCLElBQUksR0FBR2hpQixRQUFRLENBQUNJLENBQVQsQ0FBVy9LLENBQXhCLENBQUE7RUFFQTJLLElBQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxHQUFlMnNCLElBQUksR0FBR3Z2QixJQUFJLENBQUNDLEdBQUwsQ0FBUzhULEdBQVQsQ0FBUCxHQUF1QnliLElBQUksR0FBR3h2QixJQUFJLENBQUNHLEdBQUwsQ0FBUzRULEdBQVQsQ0FBN0MsQ0FBQTtFQUNBdkcsSUFBQUEsUUFBUSxDQUFDSSxDQUFULENBQVcvSyxDQUFYLEdBQWUwc0IsSUFBSSxHQUFHdnZCLElBQUksQ0FBQ0csR0FBTCxDQUFTNFQsR0FBVCxDQUFQLEdBQXVCeWIsSUFBSSxHQUFHeHZCLElBQUksQ0FBQ0MsR0FBTCxDQUFTOFQsR0FBVCxDQUE3QyxDQUFBO0VBQ0Q7O1dBRURkLGNBQUEsU0FBWXpGLFdBQUFBLENBQUFBLFFBQVosRUFBc0I7RUFDcEIsSUFBQSxPQUFPLENBQUMxQixRQUFRLENBQUNFLElBQVYsR0FBaUJoTSxJQUFJLENBQUNrVCxLQUFMLENBQVcxRixRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUsSUFBSzBKLENBQUFBLE1BQUwsQ0FBWTFKLENBQXRDLEVBQXlDMkssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlLElBQUEsQ0FBSzJKLE1BQUwsQ0FBWTNKLENBQXBFLENBQXhCLENBQUE7RUFDRDs7O0lBdERxQ2dXOztNQ0RuQmlYOzs7RUFDbkIsRUFBQSxTQUFBLFFBQUEsQ0FBWWp0QixDQUFaLEVBQWVDLENBQWYsRUFBa0JmLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQztFQUFBLElBQUEsSUFBQSxLQUFBLENBQUE7O0VBQy9CLElBQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBO0VBRUEsSUFBS2EsS0FBQUEsQ0FBQUEsQ0FBTCxHQUFTQSxDQUFULENBQUE7RUFDQSxJQUFLQyxLQUFBQSxDQUFBQSxDQUFMLEdBQVNBLENBQVQsQ0FBQTtFQUNBLElBQUtmLEtBQUFBLENBQUFBLEtBQUwsR0FBYUEsS0FBYixDQUFBO0VBQ0EsSUFBS0MsS0FBQUEsQ0FBQUEsTUFBTCxHQUFjQSxNQUFkLENBQUE7RUFOK0IsSUFBQSxPQUFBLEtBQUEsQ0FBQTtFQU9oQyxHQUFBOzs7O0VBRURpWCxFQUFBQSxNQUFBQSxDQUFBQSxjQUFBLFNBQWMsV0FBQSxHQUFBO0VBQ1osSUFBQSxJQUFBLENBQUtILE1BQUwsQ0FBWWpXLENBQVosR0FBZ0IsSUFBS0EsQ0FBQUEsQ0FBTCxHQUFTNUMsSUFBSSxDQUFDK0YsTUFBTCxFQUFnQixHQUFBLElBQUEsQ0FBS2pFLEtBQTlDLENBQUE7RUFDQSxJQUFBLElBQUEsQ0FBSytXLE1BQUwsQ0FBWWhXLENBQVosR0FBZ0IsSUFBS0EsQ0FBQUEsQ0FBTCxHQUFTN0MsSUFBSSxDQUFDK0YsTUFBTCxFQUFnQixHQUFBLElBQUEsQ0FBS2hFLE1BQTlDLENBQUE7RUFFQSxJQUFBLE9BQU8sS0FBSzhXLE1BQVosQ0FBQTtFQUNEOztXQUVESSxXQUFBLFNBQVN6TCxRQUFBQSxDQUFBQSxRQUFULEVBQW1CO0VBQ2pCO0VBQ0EsSUFBQSxJQUFJLElBQUtzTCxDQUFBQSxTQUFMLEtBQW1CLE1BQXZCLEVBQStCO0VBQzdCLE1BQUEsSUFBSXRMLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZTRLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLElBQUEsQ0FBS25TLENBQTFDLEVBQTZDNEssUUFBUSxDQUFDb0gsSUFBVCxHQUFnQixJQUFoQixDQUE3QyxLQUNLLElBQUlwSCxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWU0SyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxLQUFLblMsQ0FBTCxHQUFTLEtBQUtkLEtBQW5ELEVBQTBEMEwsUUFBUSxDQUFDb0gsSUFBVCxHQUFnQixJQUFoQixDQUFBO0VBRS9ELE1BQUEsSUFBSXBILFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZTJLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLElBQUEsQ0FBS2xTLENBQTFDLEVBQTZDMkssUUFBUSxDQUFDb0gsSUFBVCxHQUFnQixJQUFoQixDQUE3QyxLQUNLLElBQUlwSCxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUySyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxLQUFLbFMsQ0FBTCxHQUFTLEtBQUtkLE1BQW5ELEVBQTJEeUwsUUFBUSxDQUFDb0gsSUFBVCxHQUFnQixJQUFoQixDQUFBO0VBQ2pFLEtBTkQ7RUFBQSxTQVNLLElBQUksSUFBQSxDQUFLa0UsU0FBTCxLQUFtQixPQUF2QixFQUFnQztFQUNuQyxNQUFBLElBQUl0TCxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWU0SyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxJQUFLblMsQ0FBQUEsQ0FBMUMsRUFBNkM7RUFDM0M0SyxRQUFBQSxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWUsSUFBQSxDQUFLQSxDQUFMLEdBQVM0SyxRQUFRLENBQUN1SCxNQUFqQyxDQUFBO0VBQ0F2SCxRQUFBQSxRQUFRLENBQUNJLENBQVQsQ0FBV2hMLENBQVgsSUFBZ0IsQ0FBQyxDQUFqQixDQUFBO0VBQ0QsT0FIRCxNQUdPLElBQUk0SyxRQUFRLENBQUN0RixDQUFULENBQVd0RixDQUFYLEdBQWU0SyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxJQUFBLENBQUtuUyxDQUFMLEdBQVMsSUFBQSxDQUFLZCxLQUFuRCxFQUEwRDtFQUMvRDBMLFFBQUFBLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZSxJQUFBLENBQUtBLENBQUwsR0FBUyxJQUFLZCxDQUFBQSxLQUFkLEdBQXNCMEwsUUFBUSxDQUFDdUgsTUFBOUMsQ0FBQTtFQUNBdkgsUUFBQUEsUUFBUSxDQUFDSSxDQUFULENBQVdoTCxDQUFYLElBQWdCLENBQUMsQ0FBakIsQ0FBQTtFQUNELE9BQUE7O0VBRUQsTUFBQSxJQUFJNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlMkssUUFBUSxDQUFDdUgsTUFBeEIsR0FBaUMsSUFBS2xTLENBQUFBLENBQTFDLEVBQTZDO0VBQzNDMkssUUFBQUEsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlLElBQUEsQ0FBS0EsQ0FBTCxHQUFTMkssUUFBUSxDQUFDdUgsTUFBakMsQ0FBQTtFQUNBdkgsUUFBQUEsUUFBUSxDQUFDSSxDQUFULENBQVcvSyxDQUFYLElBQWdCLENBQUMsQ0FBakIsQ0FBQTtFQUNELE9BSEQsTUFHTyxJQUFJMkssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlMkssUUFBUSxDQUFDdUgsTUFBeEIsR0FBaUMsSUFBQSxDQUFLbFMsQ0FBTCxHQUFTLElBQUEsQ0FBS2QsTUFBbkQsRUFBMkQ7RUFDaEV5TCxRQUFBQSxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUsSUFBQSxDQUFLQSxDQUFMLEdBQVMsSUFBS2QsQ0FBQUEsTUFBZCxHQUF1QnlMLFFBQVEsQ0FBQ3VILE1BQS9DLENBQUE7RUFDQXZILFFBQUFBLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXL0ssQ0FBWCxJQUFnQixDQUFDLENBQWpCLENBQUE7RUFDRCxPQUFBO0VBQ0YsS0FoQkk7RUFBQSxTQW1CQSxJQUFJLElBQUEsQ0FBS2lXLFNBQUwsS0FBbUIsT0FBdkIsRUFBZ0M7RUFDbkMsTUFBSXRMLElBQUFBLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZTRLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLEtBQUtuUyxDQUF0QyxJQUEyQzRLLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxJQUFnQixDQUEvRCxFQUFrRTtFQUNoRTRLLFFBQUFBLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZSxJQUFBLENBQUtBLENBQUwsR0FBUyxJQUFLZCxDQUFBQSxLQUFkLEdBQXNCMEwsUUFBUSxDQUFDdUgsTUFBOUMsQ0FBQTtFQUNELE9BRkQsTUFFTyxJQUFJdkgsUUFBUSxDQUFDdEYsQ0FBVCxDQUFXdEYsQ0FBWCxHQUFlNEssUUFBUSxDQUFDdUgsTUFBeEIsR0FBaUMsS0FBS25TLENBQUwsR0FBUyxJQUFLZCxDQUFBQSxLQUEvQyxJQUF3RDBMLFFBQVEsQ0FBQ0ksQ0FBVCxDQUFXaEwsQ0FBWCxJQUFnQixDQUE1RSxFQUErRTtFQUNwRjRLLFFBQUFBLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZSxJQUFBLENBQUtBLENBQUwsR0FBUzRLLFFBQVEsQ0FBQ3VILE1BQWpDLENBQUE7RUFDRCxPQUFBOztFQUVELE1BQUl2SCxJQUFBQSxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUySyxRQUFRLENBQUN1SCxNQUF4QixHQUFpQyxLQUFLbFMsQ0FBdEMsSUFBMkMySyxRQUFRLENBQUNJLENBQVQsQ0FBVy9LLENBQVgsSUFBZ0IsQ0FBL0QsRUFBa0U7RUFDaEUySyxRQUFBQSxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUsSUFBQSxDQUFLQSxDQUFMLEdBQVMsSUFBS2QsQ0FBQUEsTUFBZCxHQUF1QnlMLFFBQVEsQ0FBQ3VILE1BQS9DLENBQUE7RUFDRCxPQUZELE1BRU8sSUFBSXZILFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZTJLLFFBQVEsQ0FBQ3VILE1BQXhCLEdBQWlDLEtBQUtsUyxDQUFMLEdBQVMsSUFBS2QsQ0FBQUEsTUFBL0MsSUFBeUR5TCxRQUFRLENBQUNJLENBQVQsQ0FBVy9LLENBQVgsSUFBZ0IsQ0FBN0UsRUFBZ0Y7RUFDckYySyxRQUFBQSxRQUFRLENBQUN0RixDQUFULENBQVdyRixDQUFYLEdBQWUsSUFBQSxDQUFLQSxDQUFMLEdBQVMySyxRQUFRLENBQUN1SCxNQUFqQyxDQUFBO0VBQ0QsT0FBQTtFQUNGLEtBQUE7RUFDRjs7O0lBNURtQzZEOztNQ0NqQmtYOzs7RUFDbkIsRUFBQSxTQUFBLFNBQUEsQ0FBWWxLLFNBQVosRUFBdUJoakIsQ0FBdkIsRUFBMEJDLENBQTFCLEVBQTZCdVUsQ0FBN0IsRUFBZ0M7RUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBOztFQUM5QixJQUFBLEtBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQTs7RUFDQSxJQUFLekcsS0FBQUEsQ0FBQUEsS0FBTCxDQUFXaVYsU0FBWCxFQUFzQmhqQixDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJ1VSxDQUE1QixDQUFBLENBQUE7O0VBRjhCLElBQUEsT0FBQSxLQUFBLENBQUE7RUFHL0IsR0FBQTs7OztXQUVEekcsUUFBQSxlQUFNaVYsU0FBTixFQUFpQmhqQixDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJ1VSxDQUF2QixFQUEwQjtFQUN4QixJQUFLd08sSUFBQUEsQ0FBQUEsU0FBTCxHQUFpQkEsU0FBakIsQ0FBQTtFQUNBLElBQUtoakIsSUFBQUEsQ0FBQUEsQ0FBTCxHQUFTOEYsSUFBSSxDQUFDekQsU0FBTCxDQUFlckMsQ0FBZixFQUFrQixDQUFsQixDQUFULENBQUE7RUFDQSxJQUFLQyxJQUFBQSxDQUFBQSxDQUFMLEdBQVM2RixJQUFJLENBQUN6RCxTQUFMLENBQWVwQyxDQUFmLEVBQWtCLENBQWxCLENBQVQsQ0FBQTtFQUNBLElBQUt1VSxJQUFBQSxDQUFBQSxDQUFMLEdBQVMxTyxJQUFJLENBQUN6RCxTQUFMLENBQWVtUyxDQUFmLEVBQWtCLENBQWxCLENBQVQsQ0FBQTtFQUVBLElBQUsyWSxJQUFBQSxDQUFBQSxPQUFMLEdBQWUsRUFBZixDQUFBO0VBQ0EsSUFBQSxJQUFBLENBQUtDLFVBQUwsRUFBQSxDQUFBO0VBQ0Q7O0VBRURBLEVBQUFBLE1BQUFBLENBQUFBLGFBQUEsU0FBYSxVQUFBLEdBQUE7RUFDWCxJQUFJdndCLElBQUFBLENBQUosRUFBT3d3QixDQUFQLENBQUE7RUFDQSxJQUFBLElBQU1DLE9BQU8sR0FBRyxJQUFLdEssQ0FBQUEsU0FBTCxDQUFlOWpCLEtBQS9CLENBQUE7RUFDQSxJQUFBLElBQU1xdUIsT0FBTyxHQUFHLElBQUt2SyxDQUFBQSxTQUFMLENBQWU3akIsTUFBL0IsQ0FBQTs7RUFFQSxJQUFBLEtBQUt0QyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUd5d0IsT0FBaEIsRUFBeUJ6d0IsQ0FBQyxJQUFJLElBQUsyWCxDQUFBQSxDQUFuQyxFQUFzQztFQUNwQyxNQUFBLEtBQUs2WSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdFLE9BQWhCLEVBQXlCRixDQUFDLElBQUksSUFBSzdZLENBQUFBLENBQW5DLEVBQXNDO0VBQ3BDLFFBQUEsSUFBSXJJLEtBQUssR0FBRyxDQUFDLENBQUNraEIsQ0FBQyxJQUFJLENBQU4sSUFBV0MsT0FBWCxJQUFzQnp3QixDQUFDLElBQUksQ0FBM0IsQ0FBRCxJQUFrQyxDQUE5QyxDQUFBOztFQUVBLFFBQUksSUFBQSxJQUFBLENBQUttbUIsU0FBTCxDQUFldFIsSUFBZixDQUFvQnZGLEtBQUssR0FBRyxDQUE1QixDQUFpQyxHQUFBLENBQXJDLEVBQXdDO0VBQ3RDLFVBQUtnaEIsSUFBQUEsQ0FBQUEsT0FBTCxDQUFhdm5CLElBQWIsQ0FBa0I7RUFBRTVGLFlBQUFBLENBQUMsRUFBRW5ELENBQUMsR0FBRyxLQUFLbUQsQ0FBZDtFQUFpQkMsWUFBQUEsQ0FBQyxFQUFFb3RCLENBQUMsR0FBRyxJQUFLcHRCLENBQUFBLENBQUFBO0VBQTdCLFdBQWxCLENBQUEsQ0FBQTtFQUNELFNBQUE7RUFDRixPQUFBO0VBQ0YsS0FBQTs7RUFFRCxJQUFBLE9BQU8sS0FBS2dXLE1BQVosQ0FBQTtFQUNEOztFQUVEdVgsRUFBQUEsTUFBQUEsQ0FBQUEsV0FBQSxTQUFBLFFBQUEsQ0FBU3h0QixDQUFULEVBQVlDLENBQVosRUFBZTtFQUNiLElBQUEsSUFBTWtNLEtBQUssR0FBRyxDQUFDLENBQUNsTSxDQUFDLElBQUksQ0FBTixJQUFXLElBQUEsQ0FBSytpQixTQUFMLENBQWU5akIsS0FBMUIsSUFBbUNjLENBQUMsSUFBSSxDQUF4QyxDQUFELElBQStDLENBQTdELENBQUE7RUFDQSxJQUFBLElBQUksS0FBS2dqQixTQUFMLENBQWV0UixJQUFmLENBQW9CdkYsS0FBSyxHQUFHLENBQTVCLENBQWlDLEdBQUEsQ0FBckMsRUFBd0MsT0FBTyxJQUFQLENBQXhDLEtBQ0ssT0FBTyxLQUFQLENBQUE7RUFDTjs7RUFFRGlLLEVBQUFBLE1BQUFBLENBQUFBLGNBQUEsU0FBYyxXQUFBLEdBQUE7RUFDWixJQUFNSCxJQUFBQSxNQUFNLEdBQUduUSxJQUFJLENBQUM3QyxnQkFBTCxDQUFzQixJQUFBLENBQUtrcUIsT0FBM0IsQ0FBZixDQUFBO0VBQ0EsSUFBQSxPQUFPLEtBQUtsWCxNQUFMLENBQVlsTCxJQUFaLENBQWlCa0wsTUFBakIsQ0FBUCxDQUFBO0VBQ0Q7O0VBRUR3WCxFQUFBQSxNQUFBQSxDQUFBQSxXQUFBLFNBQUEsUUFBQSxDQUFTenRCLENBQVQsRUFBWUMsQ0FBWixFQUFlO0VBQ2JELElBQUFBLENBQUMsSUFBSSxJQUFBLENBQUtBLENBQVYsQ0FBQTtFQUNBQyxJQUFBQSxDQUFDLElBQUksSUFBQSxDQUFLQSxDQUFWLENBQUE7RUFDQSxJQUFBLElBQU1wRCxDQUFDLEdBQUcsQ0FBQyxDQUFDb0QsQ0FBQyxJQUFJLENBQU4sSUFBVyxJQUFBLENBQUsraUIsU0FBTCxDQUFlOWpCLEtBQTFCLElBQW1DYyxDQUFDLElBQUksQ0FBeEMsQ0FBRCxJQUErQyxDQUF6RCxDQUFBO0VBRUEsSUFBTyxPQUFBO0VBQ0w2TixNQUFBQSxDQUFDLEVBQUUsSUFBS21WLENBQUFBLFNBQUwsQ0FBZXRSLElBQWYsQ0FBb0I3VSxDQUFwQixDQURFO0VBRUxpUixNQUFBQSxDQUFDLEVBQUUsSUFBQSxDQUFLa1YsU0FBTCxDQUFldFIsSUFBZixDQUFvQjdVLENBQUMsR0FBRyxDQUF4QixDQUZFO0VBR0xnQixNQUFBQSxDQUFDLEVBQUUsSUFBQSxDQUFLbWxCLFNBQUwsQ0FBZXRSLElBQWYsQ0FBb0I3VSxDQUFDLEdBQUcsQ0FBeEIsQ0FIRTtFQUlMZSxNQUFBQSxDQUFDLEVBQUUsSUFBS29sQixDQUFBQSxTQUFMLENBQWV0UixJQUFmLENBQW9CN1UsQ0FBQyxHQUFHLENBQXhCLENBQUE7RUFKRSxLQUFQLENBQUE7RUFNRDs7V0FFRHdaLFdBQUEsU0FBU3pMLFFBQUFBLENBQUFBLFFBQVQsRUFBbUI7RUFDakIsSUFBQSxJQUFJLElBQUtzTCxDQUFBQSxTQUFMLEtBQW1CLE1BQXZCLEVBQStCO0VBQzdCLE1BQUEsSUFBSSxJQUFLc1gsQ0FBQUEsUUFBTCxDQUFjNWlCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZSxJQUFLQSxDQUFBQSxDQUFsQyxFQUFxQzRLLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3JGLENBQVgsR0FBZSxJQUFLQSxDQUFBQSxDQUF6RCxDQUFKLEVBQWlFMkssUUFBUSxDQUFDb0gsSUFBVCxHQUFnQixJQUFoQixDQUFqRSxLQUNLcEgsUUFBUSxDQUFDb0gsSUFBVCxHQUFnQixLQUFoQixDQUFBO0VBQ04sS0FIRCxNQUdPLElBQUksSUFBQSxDQUFLa0UsU0FBTCxLQUFtQixPQUF2QixFQUFnQztFQUNyQyxNQUFJLElBQUEsQ0FBQyxJQUFLc1gsQ0FBQUEsUUFBTCxDQUFjNWlCLFFBQVEsQ0FBQ3RGLENBQVQsQ0FBV3RGLENBQVgsR0FBZSxJQUFBLENBQUtBLENBQWxDLEVBQXFDNEssUUFBUSxDQUFDdEYsQ0FBVCxDQUFXckYsQ0FBWCxHQUFlLElBQUtBLENBQUFBLENBQXpELENBQUwsRUFBa0UySyxRQUFRLENBQUNJLENBQVQsQ0FBVzZGLE1BQVgsRUFBQSxDQUFBO0VBQ25FLEtBQUE7RUFDRjs7RUFFRDVNLEVBQUFBLE1BQUFBLENBQUFBLFVBQUEsU0FBVSxPQUFBLEdBQUE7RUFDUixJQUFBLEtBQUEsQ0FBQSxTQUFBLENBQU1BLE9BQU4sQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7O0VBQ0EsSUFBSytlLElBQUFBLENBQUFBLFNBQUwsR0FBaUIsSUFBakIsQ0FBQTtFQUNEOzs7SUF0RW9DaE47O0FDR3ZDLGNBQWU7RUFDYnJPLEVBQUFBLGdCQURhLEVBQUEsU0FBQSxnQkFBQSxDQUNJeEIsTUFESixFQUNZdW5CLElBRFosRUFDa0I7RUFDN0J2bkIsSUFBQUEsTUFBTSxDQUFDd0IsZ0JBQVAsQ0FBd0IscUJBQXhCLEVBQStDLFlBQUE7RUFBQSxNQUFBLE9BQU0rbEIsSUFBSSxFQUFWLENBQUE7RUFBQSxLQUEvQyxDQUFBLENBQUE7RUFDRCxHQUhZO0VBS2JDLEVBQUFBLFFBTGEsRUFLSjlsQixTQUFBQSxRQUFBQSxDQUFBQSxLQUxJLEVBS2U7RUFBQSxJQUFBLElBQW5CQSxLQUFtQixLQUFBLEtBQUEsQ0FBQSxFQUFBO0VBQW5CQSxNQUFBQSxLQUFtQixHQUFYLFNBQVcsQ0FBQTtFQUFBLEtBQUE7O0VBQzFCLElBQUEsSUFBTThKLEdBQUcsR0FBR3dJLFNBQVMsQ0FBQ25ILFFBQVYsQ0FBbUJuTCxLQUFuQixDQUFaLENBQUE7RUFDQSxJQUFlOEosT0FBQUEsT0FBQUEsR0FBQUEsR0FBRyxDQUFDOUQsQ0FBbkIsR0FBeUI4RCxJQUFBQSxHQUFBQSxHQUFHLENBQUM3RCxDQUE3QixHQUFBLElBQUEsR0FBbUM2RCxHQUFHLENBQUM5VCxDQUF2QyxHQUFBLFFBQUEsQ0FBQTtFQUNELEdBUlk7RUFVYit2QixFQUFBQSxRQVZhLG9CQVVKem5CLE1BVkksRUFVSWpFLE1BVkosRUFVWXdVLElBVlosRUFVa0J2TCxLQVZsQixFQVV5QjtFQUNwQyxJQUFBLElBQU1sSyxPQUFPLEdBQUdpQixNQUFNLENBQUNFLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBaEIsQ0FBQTtFQUNBLElBQUEsSUFBTTVDLEtBQUssR0FBRyxJQUFLbXVCLENBQUFBLFFBQUwsRUFBZCxDQUFBO0VBRUEsSUFBQSxJQUFBLENBQUtobUIsZ0JBQUwsQ0FBc0J4QixNQUF0QixFQUE4QixZQUFNO0VBQ2xDLE1BQUEsSUFBSWdGLEtBQUosRUFBV2xLLE9BQU8sQ0FBQ0ssU0FBUixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QlksTUFBTSxDQUFDaEQsS0FBL0IsRUFBc0NnRCxNQUFNLENBQUMvQyxNQUE3QyxDQUFBLENBQUE7O0VBRVgsTUFBSXVYLElBQUFBLElBQUksWUFBWUosU0FBcEIsRUFBK0I7RUFDN0JyVixRQUFBQSxPQUFPLENBQUM4ZixTQUFSLEVBQUEsQ0FBQTtFQUNBOWYsUUFBQUEsT0FBTyxDQUFDeWYsU0FBUixHQUFvQmxoQixLQUFwQixDQUFBO0VBQ0F5QixRQUFBQSxPQUFPLENBQUMrZixHQUFSLENBQVl0SyxJQUFJLENBQUMxVyxDQUFqQixFQUFvQjBXLElBQUksQ0FBQ3pXLENBQXpCLEVBQTRCLEVBQTVCLEVBQWdDLENBQWhDLEVBQW1DN0MsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQTdDLEVBQWdELElBQWhELENBQUEsQ0FBQTtFQUNBOUgsUUFBQUEsT0FBTyxDQUFDbWdCLElBQVIsRUFBQSxDQUFBO0VBQ0FuZ0IsUUFBQUEsT0FBTyxDQUFDa2dCLFNBQVIsRUFBQSxDQUFBO0VBQ0QsT0FORCxNQU1PLElBQUl6SyxJQUFJLFlBQVk4VSxRQUFwQixFQUE4QjtFQUNuQ3ZxQixRQUFBQSxPQUFPLENBQUM4ZixTQUFSLEVBQUEsQ0FBQTtFQUNBOWYsUUFBQUEsT0FBTyxDQUFDZ2dCLFdBQVIsR0FBc0J6aEIsS0FBdEIsQ0FBQTtFQUNBeUIsUUFBQUEsT0FBTyxDQUFDNHNCLE1BQVIsQ0FBZW5YLElBQUksQ0FBQytVLEVBQXBCLEVBQXdCL1UsSUFBSSxDQUFDZ1YsRUFBN0IsQ0FBQSxDQUFBO0VBQ0F6cUIsUUFBQUEsT0FBTyxDQUFDNnNCLE1BQVIsQ0FBZXBYLElBQUksQ0FBQ2lWLEVBQXBCLEVBQXdCalYsSUFBSSxDQUFDa1YsRUFBN0IsQ0FBQSxDQUFBO0VBQ0EzcUIsUUFBQUEsT0FBTyxDQUFDNGQsTUFBUixFQUFBLENBQUE7RUFDQTVkLFFBQUFBLE9BQU8sQ0FBQ2tnQixTQUFSLEVBQUEsQ0FBQTtFQUNELE9BUE0sTUFPQSxJQUFJekssSUFBSSxZQUFZdVcsUUFBcEIsRUFBOEI7RUFDbkNoc0IsUUFBQUEsT0FBTyxDQUFDOGYsU0FBUixFQUFBLENBQUE7RUFDQTlmLFFBQUFBLE9BQU8sQ0FBQ2dnQixXQUFSLEdBQXNCemhCLEtBQXRCLENBQUE7RUFDQXlCLFFBQUFBLE9BQU8sQ0FBQzhzQixRQUFSLENBQWlCclgsSUFBSSxDQUFDMVcsQ0FBdEIsRUFBeUIwVyxJQUFJLENBQUN6VyxDQUE5QixFQUFpQ3lXLElBQUksQ0FBQ3hYLEtBQXRDLEVBQTZDd1gsSUFBSSxDQUFDdlgsTUFBbEQsQ0FBQSxDQUFBO0VBQ0E4QixRQUFBQSxPQUFPLENBQUM0ZCxNQUFSLEVBQUEsQ0FBQTtFQUNBNWQsUUFBQUEsT0FBTyxDQUFDa2dCLFNBQVIsRUFBQSxDQUFBO0VBQ0QsT0FOTSxNQU1BLElBQUl6SyxJQUFJLFlBQVlvVyxVQUFwQixFQUFnQztFQUNyQzdyQixRQUFBQSxPQUFPLENBQUM4ZixTQUFSLEVBQUEsQ0FBQTtFQUNBOWYsUUFBQUEsT0FBTyxDQUFDZ2dCLFdBQVIsR0FBc0J6aEIsS0FBdEIsQ0FBQTtFQUNBeUIsUUFBQUEsT0FBTyxDQUFDK2YsR0FBUixDQUFZdEssSUFBSSxDQUFDMVcsQ0FBakIsRUFBb0IwVyxJQUFJLENBQUN6VyxDQUF6QixFQUE0QnlXLElBQUksQ0FBQ3ZFLE1BQWpDLEVBQXlDLENBQXpDLEVBQTRDL1UsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQXRELEVBQXlELElBQXpELENBQUEsQ0FBQTtFQUNBOUgsUUFBQUEsT0FBTyxDQUFDNGQsTUFBUixFQUFBLENBQUE7RUFDQTVkLFFBQUFBLE9BQU8sQ0FBQ2tnQixTQUFSLEVBQUEsQ0FBQTtFQUNELE9BQUE7RUFDRixLQTdCRCxDQUFBLENBQUE7RUE4QkQsR0E1Q1k7RUE4Q2I2TSxFQUFBQSxXQTlDYSx1QkE4Q0Q3bkIsTUE5Q0MsRUE4Q09qRSxNQTlDUCxFQThDZXdFLE9BOUNmLEVBOEN3QnlFLEtBOUN4QixFQThDK0I7RUFDMUMsSUFBQSxJQUFNbEssT0FBTyxHQUFHaUIsTUFBTSxDQUFDRSxVQUFQLENBQWtCLElBQWxCLENBQWhCLENBQUE7RUFDQSxJQUFBLElBQU01QyxLQUFLLEdBQUcsSUFBS211QixDQUFBQSxRQUFMLEVBQWQsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLaG1CLGdCQUFMLENBQXNCeEIsTUFBdEIsRUFBOEIsWUFBTTtFQUNsQyxNQUFBLElBQUlnRixLQUFKLEVBQVdsSyxPQUFPLENBQUNLLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0JZLE1BQU0sQ0FBQ2hELEtBQS9CLEVBQXNDZ0QsTUFBTSxDQUFDL0MsTUFBN0MsQ0FBQSxDQUFBO0VBRVg4QixNQUFBQSxPQUFPLENBQUM4ZixTQUFSLEVBQUEsQ0FBQTtFQUNBOWYsTUFBQUEsT0FBTyxDQUFDeWYsU0FBUixHQUFvQmxoQixLQUFwQixDQUFBO0VBQ0F5QixNQUFBQSxPQUFPLENBQUMrZixHQUFSLENBQVl0YSxPQUFPLENBQUNwQixDQUFSLENBQVV0RixDQUF0QixFQUF5QjBHLE9BQU8sQ0FBQ3BCLENBQVIsQ0FBVXJGLENBQW5DLEVBQXNDLEVBQXRDLEVBQTBDLENBQTFDLEVBQTZDN0MsSUFBSSxDQUFDMkwsRUFBTCxHQUFVLENBQXZELEVBQTBELElBQTFELENBQUEsQ0FBQTtFQUNBOUgsTUFBQUEsT0FBTyxDQUFDbWdCLElBQVIsRUFBQSxDQUFBO0VBQ0FuZ0IsTUFBQUEsT0FBTyxDQUFDa2dCLFNBQVIsRUFBQSxDQUFBO0VBQ0QsS0FSRCxDQUFBLENBQUE7RUFTRCxHQUFBO0VBM0RZLENBQWY7O0VDdURBL1YsTUFBTSxDQUFDcUcsUUFBUCxHQUFrQkEsUUFBbEIsQ0FBQTtFQUNBckcsTUFBTSxDQUFDcEcsSUFBUCxHQUFjQSxJQUFkLENBQUE7RUFFQW9HLE1BQU0sQ0FBQ3RGLElBQVAsR0FBY0EsSUFBZCxDQUFBO0VBQ0FzRixNQUFNLENBQUMrTyxTQUFQLEdBQW1CQSxTQUFuQixDQUFBO0VBQ0EvTyxNQUFNLENBQUNsQyxRQUFQLEdBQWtCQSxRQUFsQixDQUFBO0VBQ0FrQyxNQUFNLENBQUM2RSxRQUFQLEdBQWtCN0UsTUFBTSxDQUFDNmlCLE1BQVAsR0FBZ0JoZSxRQUFsQyxDQUFBO0VBQ0E3RSxNQUFNLENBQUNxSSxPQUFQLEdBQWlCckksTUFBTSxDQUFDOGlCLEtBQVAsR0FBZXphLE9BQWhDLENBQUE7RUFDQXJJLE1BQU0sQ0FBQzJKLFNBQVAsR0FBbUJBLFNBQW5CLENBQUE7RUFDQTNKLE1BQU0sQ0FBQzhKLFNBQVAsR0FBbUJBLFNBQW5CLENBQUE7RUFDQTlKLE1BQU0sQ0FBQ2tLLElBQVAsR0FBY0EsSUFBZCxDQUFBO0VBQ0FsSyxNQUFNLENBQUM0RSxJQUFQLEdBQWNBLElBQWQsQ0FBQTtFQUNBNUUsTUFBTSxDQUFDZ0QsSUFBUCxHQUFjQSxNQUFkLENBQUE7RUFDQWhELE1BQU0sQ0FBQzRJLElBQVAsR0FBY0EsSUFBZCxDQUFBOztFQUNBNUksTUFBTSxDQUFDK2lCLE9BQVAsR0FBaUIsVUFBQ3Z3QixDQUFELEVBQUlDLENBQUosRUFBTzhMLE1BQVAsRUFBQTtFQUFBLEVBQWtCLE9BQUEsSUFBSXlFLE1BQUosQ0FBU3hRLENBQVQsRUFBWUMsQ0FBWixFQUFlOEwsTUFBZixDQUFsQixDQUFBO0VBQUEsQ0FBakIsQ0FBQTs7RUFDQXlCLE1BQU0sQ0FBQzZKLGVBQVAsR0FBeUJGLFNBQVMsQ0FBQ0UsZUFBbkMsQ0FBQTtFQUVBN0osTUFBTSxDQUFDeUssVUFBUCxHQUFvQnpLLE1BQU0sQ0FBQ2dqQixJQUFQLEdBQWN2WSxVQUFsQyxDQUFBO0VBQ0F6SyxNQUFNLENBQUMwSyxJQUFQLEdBQWMxSyxNQUFNLENBQUNpakIsQ0FBUCxHQUFXdlksSUFBekIsQ0FBQTtFQUNBMUssTUFBTSxDQUFDcUwsUUFBUCxHQUFrQnJMLE1BQU0sQ0FBQ2tqQixDQUFQLEdBQVc3WCxRQUE3QixDQUFBO0VBQ0FyTCxNQUFNLENBQUN1TCxRQUFQLEdBQWtCdkwsTUFBTSxDQUFDbWpCLENBQVAsR0FBVzVYLFFBQTdCLENBQUE7RUFDQXZMLE1BQU0sQ0FBQytMLElBQVAsR0FBYy9MLE1BQU0sQ0FBQ29qQixDQUFQLEdBQVdyWCxJQUF6QixDQUFBO0VBQ0EvTCxNQUFNLENBQUNpTSxNQUFQLEdBQWdCak0sTUFBTSxDQUFDcWpCLENBQVAsR0FBV3BYLE1BQTNCLENBQUE7RUFDQWpNLE1BQU0sQ0FBQ21NLElBQVAsR0FBY25NLE1BQU0sQ0FBQzRhLENBQVAsR0FBV3pPLElBQXpCLENBQUE7RUFFQW5NLE1BQU0sQ0FBQ3NNLFNBQVAsR0FBbUJBLFNBQW5CLENBQUE7RUFDQXRNLE1BQU0sQ0FBQzBNLEtBQVAsR0FBZTFNLE1BQU0sQ0FBQ3NqQixDQUFQLEdBQVc1VyxLQUExQixDQUFBO0VBQ0ExTSxNQUFNLENBQUM2TSxVQUFQLEdBQW9CN00sTUFBTSxDQUFDMmEsQ0FBUCxHQUFXOU4sVUFBL0IsQ0FBQTtFQUNBN00sTUFBTSxDQUFDaU4sV0FBUCxHQUFxQmpOLE1BQU0sQ0FBQ3VqQixFQUFQLEdBQVl0VyxXQUFqQyxDQUFBO0VBQ0FqTixNQUFNLENBQUNzTixPQUFQLEdBQWlCdE4sTUFBTSxDQUFDd2pCLENBQVAsR0FBV2xXLE9BQTVCLENBQUE7RUFDQXROLE1BQU0sQ0FBQ3VOLFNBQVAsR0FBbUJBLFNBQW5CLENBQUE7RUFDQXZOLE1BQU0sQ0FBQ2lPLFNBQVAsR0FBbUJBLFNBQW5CLENBQUE7RUFDQWpPLE1BQU0sQ0FBQ2tPLEtBQVAsR0FBZUEsS0FBZixDQUFBO0VBQ0FsTyxNQUFNLENBQUNzTyxLQUFQLEdBQWV0TyxNQUFNLENBQUN5akIsQ0FBUCxHQUFXblYsS0FBMUIsQ0FBQTtFQUNBdE8sTUFBTSxDQUFDeU8sTUFBUCxHQUFnQkEsTUFBaEIsQ0FBQTtFQUNBek8sTUFBTSxDQUFDNk8sS0FBUCxHQUFlQSxLQUFmLENBQUE7RUFDQTdPLE1BQU0sQ0FBQzJQLFNBQVAsR0FBbUJBLFNBQW5CLENBQUE7RUFDQTNQLE1BQU0sQ0FBQ2tQLE9BQVAsR0FBaUJBLE9BQWpCLENBQUE7RUFDQWxQLE1BQU0sQ0FBQzRQLFdBQVAsR0FBcUJBLFdBQXJCLENBQUE7RUFFQTVQLE1BQU0sQ0FBQ2tRLE9BQVAsR0FBaUJBLE9BQWpCLENBQUE7RUFDQWxRLE1BQU0sQ0FBQytSLGdCQUFQLEdBQTBCQSxnQkFBMUIsQ0FBQTtFQUNBL1IsTUFBTSxDQUFDbVMsYUFBUCxHQUF1QkEsYUFBdkIsQ0FBQTtFQUVBblMsTUFBTSxDQUFDNEssSUFBUCxHQUFjQSxJQUFkLENBQUE7RUFDQTVLLE1BQU0sQ0FBQ29nQixRQUFQLEdBQWtCQSxRQUFsQixDQUFBO0VBQ0FwZ0IsTUFBTSxDQUFDMGhCLFVBQVAsR0FBb0JBLFVBQXBCLENBQUE7RUFDQTFoQixNQUFNLENBQUNrTCxTQUFQLEdBQW1CQSxTQUFuQixDQUFBO0VBQ0FsTCxNQUFNLENBQUM2aEIsUUFBUCxHQUFrQkEsUUFBbEIsQ0FBQTtFQUNBN2hCLE1BQU0sQ0FBQzhoQixTQUFQLEdBQW1CQSxTQUFuQixDQUFBO0VBRUE5aEIsTUFBTSxDQUFDNFUsY0FBUCxHQUF3QkEsY0FBeEIsQ0FBQTtFQUNBNVUsTUFBTSxDQUFDa1csV0FBUCxHQUFxQkEsV0FBckIsQ0FBQTtFQUNBbFcsTUFBTSxDQUFDNlcsYUFBUCxHQUF1QkEsYUFBdkIsQ0FBQTtFQUNBN1csTUFBTSxDQUFDa1ksWUFBUCxHQUFzQkEsWUFBdEIsQ0FBQTtFQUNBbFksTUFBTSxDQUFDMFgsYUFBUCxHQUF1QkEsYUFBdkIsQ0FBQTtFQUNBMVgsTUFBTSxDQUFDaVosYUFBUCxHQUF1QmpaLE1BQU0sQ0FBQzBqQixhQUFQLEdBQXVCekssYUFBOUMsQ0FBQTtFQUNBalosTUFBTSxDQUFDbWdCLGNBQVAsR0FBd0JBLGNBQXhCLENBQUE7RUFFQW5nQixNQUFNLENBQUMyakIsS0FBUCxHQUFlQSxLQUFmLENBQUE7RUFDQWpwQixJQUFJLENBQUM1QixNQUFMLENBQVlrSCxNQUFaLEVBQW9CNEUsSUFBcEI7Ozs7Ozs7OyJ9
