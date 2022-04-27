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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy91dGlscy9Qcm9wVXRpbC5qcyIsIi4uL3NyYy9tYXRoL2Vhc2UuanMiLCIuLi9zcmMvbWF0aC9WZWN0b3IyRC5qcyIsIi4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIiwiLi4vc3JjL3V0aWxzL0NvbG9yVXRpbC5qcyIsIi4uL3NyYy9tYXRoL1BvbGFyMkQuanMiLCIuLi9zcmMvbWF0aC9NYXQzLmpzIiwiLi4vc3JjL21hdGgvU3Bhbi5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIHNsaWNlQXJyYXkoYXJyMSwgaW5kZXgsIGFycjIpIHtcbiAgICB0aGlzLmVtcHR5QXJyYXkoYXJyMik7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMi5wdXNoKGFycjFbaV0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRSYW5kRnJvbUFycmF5KGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoYXJyLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGVtcHR5T2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW55IG9iamVjdFxuICAgKi9cbiAgZW1wdHlPYmplY3Qob2JqLCBpZ25vcmUgPSBudWxsKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIGNvbnRpbnVlO1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWFrZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBhbmQgYmluZHMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBjbGFzc0FwcGx5XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIEEgY2xhc3MgdG8gbWFrZSBhbiBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBBbnkgYXJyYXkgdG8gYmluZCBpdCB0byB0aGUgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgaW5zdGFuY2Ugb2YgY29uc3RydWN0b3IsIG9wdGlvbmFsbHkgYmluZCB3aXRoIGFyZ3NcbiAgICovXG4gIGNsYXNzQXBwbHkoY29uc3RydWN0b3IsIGFyZ3MgPSBudWxsKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IEZhY3RvcnlGdW5jID0gY29uc3RydWN0b3IuYmluZC5hcHBseShjb25zdHJ1Y3RvciwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IEZhY3RvcnlGdW5jKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICByZXR1cm4gSW1nVXRpbC5nZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpO1xuICB9LFxuXG4gIGRlc3Ryb3lBbGwoYXJyLCBwYXJhbSA9IG51bGwpIHtcbiAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJbaV0uZGVzdHJveShwYXJhbSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBkZWxldGUgYXJyW2ldO1xuICAgIH1cblxuICAgIGFyci5sZW5ndGggPSAwO1xuICB9LFxuXG4gIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgaWRzTWFwID0ge307XG5cbmNvbnN0IFB1aWQgPSB7XG4gIF9pbmRleDogMCxcbiAgX2NhY2hlOiB7fSxcblxuICBpZCh0eXBlKSB7XG4gICAgaWYgKGlkc01hcFt0eXBlXSA9PT0gdW5kZWZpbmVkIHx8IGlkc01hcFt0eXBlXSA9PT0gbnVsbCkgaWRzTWFwW3R5cGVdID0gMDtcbiAgICByZXR1cm4gYCR7dHlwZX1fJHtpZHNNYXBbdHlwZV0rK31gO1xuICB9LFxuXG4gIGdldElkKHRhcmdldCkge1xuICAgIGxldCB1aWQgPSB0aGlzLmdldElkRnJvbUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKHVpZCkgcmV0dXJuIHVpZDtcblxuICAgIHVpZCA9IGBQVUlEXyR7dGhpcy5faW5kZXgrK31gO1xuICAgIHRoaXMuX2NhY2hlW3VpZF0gPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHVpZDtcbiAgfSxcblxuICBnZXRJZEZyb21DYWNoZSh0YXJnZXQpIHtcbiAgICBsZXQgb2JqLCBpZDtcblxuICAgIGZvciAoaWQgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIG9iaiA9IHRoaXMuX2NhY2hlW2lkXTtcblxuICAgICAgaWYgKG9iaiA9PT0gdGFyZ2V0KSByZXR1cm4gaWQ7XG4gICAgICBpZiAodGhpcy5pc0JvZHkob2JqLCB0YXJnZXQpICYmIG9iai5zcmMgPT09IHRhcmdldC5zcmMpIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpc0JvZHkob2JqLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIG9iai5pc0lubmVyICYmIHRhcmdldC5pc0lubmVyO1xuICB9LFxuXG4gIGdldFRhcmdldCh1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbdWlkXTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVpZDtcbiIsIi8qKlxuICogUG9vbCBpcyB0aGUgY2FjaGUgcG9vbCBvZiB0aGUgcHJvdG9uIGVuZ2luZSwgaXQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gKlxuICogZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpXG4gKiAgQ2xhc3NcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICogICAgdGFyZ2V0Ll9fcHVpZCA9IHVpZFxuICpcbiAqICBib2R5XG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqXG4gKlxuICogZXhwaXJlKHRhcmdldClcbiAqICBjYWNoZVt0YXJnZXQuX19wdWlkXSBwdXNoIHRhcmdldFxuICpcbiAqL1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBvZiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3RhbFxuICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FjaGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKSB7XG4gICAgbGV0IHA7XG4gICAgdWlkID0gdWlkIHx8IHRhcmdldC5fX3B1aWQgfHwgUHVpZC5nZXRJZCh0YXJnZXQpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVbdWlkXSAmJiB0aGlzLmNhY2hlW3VpZF0ubGVuZ3RoID4gMCkge1xuICAgICAgcCA9IHRoaXMuY2FjaGVbdWlkXS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHRoaXMuY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcC5fX3B1aWQgPSB0YXJnZXQuX19wdWlkIHx8IHVpZDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGV4cGlyZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZSh0YXJnZXQuX19wdWlkKS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldCBhbnkgT2JqZWN0IG9yIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpIHtcbiAgICB0aGlzLnRvdGFsKys7XG5cbiAgICBpZiAodGhpcy5jcmVhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBVdGlsLmNsYXNzQXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiAtIHdoYXQgaXMgaW4gdGhlIGNhY2hlP1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSBjb3VudCArPSB0aGlzLmNhY2hlW2lkXS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveWVzIGFsbCBpdGVtcyBmcm9tIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZVtpZF0ubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q2FjaGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdWlkIHRoZSB1bmlxdWUgaWRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2FjaGUodWlkID0gXCJkZWZhdWx0XCIpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVbdWlkXSkgdGhpcy5jYWNoZVt1aWRdID0gW107XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdWlkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMge1xuICBjb25zdHJ1Y3Rvcihwcm90b24pIHtcbiAgICB0aGlzLnByb3RvbiA9IHByb3RvbjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50eXBlID0gMTtcblxuICAgIHRoaXMuZW1pdHRlckluZGV4ID0gMDtcbiAgICB0aGlzLnJlbmRlcmVySW5kZXggPSAwO1xuICB9XG5cbiAgdXBkYXRlKHN0eWxlLCBib2R5KSB7XG4gICAgdGhpcy5hZGQoc3R5bGUsIGJvZHkpO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZ2V0RW1pdHRlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgIGxldCBzdHIgPSBcIlwiO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3RyICs9IFwiZW1pdHRlcjpcIiArIHRoaXMucHJvdG9uLmVtaXR0ZXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiZW0gc3BlZWQ6XCIgKyBlbWl0dGVyLmVtaXRTcGVlZCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwicG9zOlwiICsgdGhpcy5nZXRFbWl0dGVyUG9zKGVtaXR0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiaW5pdGlhbGl6ZXM6XCIgKyBlbWl0dGVyLmluaXRpYWxpemVzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcilcbiAgICAgICAgICBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuaW5pdGlhbGl6ZXMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiYmVoYXZpb3VyczpcIiArIGVtaXR0ZXIuYmVoYXZpb3Vycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5iZWhhdmlvdXJzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gcmVuZGVyZXIubmFtZSArIFwiPGJyPlwiO1xuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSBcImJvZHk6XCIgKyB0aGlzLmdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpICsgXCI8YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHIgKz0gXCJwYXJ0aWNsZXM6XCIgKyB0aGlzLnByb3Rvbi5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInBvb2w6XCIgKyB0aGlzLnByb3Rvbi5wb29sLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwidG90YWw6XCIgKyB0aGlzLnByb3Rvbi5wb29sLnRvdGFsO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHN0cjtcbiAgfVxuXG4gIGFkZChzdHlsZSwgYm9keSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7XCIsXG4gICAgICAgIFwib3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMDtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XCIsXG4gICAgICAgIFwid2lkdGg6MTIwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZC1jb2xvcjojMDAyO2NvbG9yOiMwZmY7XCJcbiAgICAgIF0uam9pbihcIlwiKTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICB0aGlzLnR5cGUrKztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID4gNCkgdGhpcy50eXBlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIGxldCBiZywgY29sb3I7XG4gICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBiZyA9IFwiIzIwMVwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjZjA4XCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGJnID0gXCIjMDIwXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZjBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJnID0gXCIjMDAyXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZmZcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gYmc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImNvbG9yXCJdID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBib2R5ID0gYm9keSB8fCB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLmVtaXR0ZXJzW3RoaXMuZW1pdHRlckluZGV4XTtcbiAgfVxuXG4gIGdldFJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5yZW5kZXJlcnNbdGhpcy5yZW5kZXJlckluZGV4XTtcbiAgfVxuXG4gIGNvbmNhdEFycihhcnIpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBpZiAoIWFyciB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gKGFycltpXS5uYW1lIHx8IFwiXCIpLnN1YnN0cigwLCAxKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSB7XG4gICAgcmV0dXJuIHJlbmRlcmVyLnBvb2wudG90YWwgfHwgKHJlbmRlcmVyLmNwb29sICYmIHJlbmRlcmVyLmNwb29sLnRvdGFsKSB8fCAwO1xuICB9XG5cbiAgZ2V0RW1pdHRlclBvcyhlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoZS5wLngpICsgXCIsXCIgKyBNYXRoLnJvdW5kKGUucC55KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdG9uID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qXG4gKiBFdmVudERpc3BhdGNoZXJcbiAqIFRoaXMgY29kZSByZWZlcmVuY2Ugc2luY2UgaHR0cDovL2NyZWF0ZWpzLmNvbS8uXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGJpbmQodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuICAgIHRhcmdldC5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIGNvbnN0IGFyciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIGZhc3RlciBjaGVja3MuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIGVsc2UgaWYgKHRoaXMuX2xpc3RlbmVycykgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG5cbiAgICBpZiAodHlwZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIGxldCBhcnIgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgICBpZiAoIWFycikgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgLy8gYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAvLyB0byBhdm9pZCBpc3N1ZXMgd2l0aCBpdGVtcyBiZWluZyByZW1vdmVkIG9yIGFkZGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcblxuICAgICAgbGV0IGhhbmRsZXI7XG4gICAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGhhbmRsZXIgPSBhcnJbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBoYW5kbGVyKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfVxuXG4gIGhhc0V2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiIsImNvbnN0IFBJID0gMy4xNDE1OTI2O1xuY29uc3QgSU5GSU5JVFkgPSBJbmZpbml0eTtcblxuY29uc3QgTWF0aFV0aWwgPSB7XG4gIFBJOiBQSSxcbiAgUEl4MjogUEkgKiAyLFxuICBQSV8yOiBQSSAvIDIsXG4gIFBJXzE4MDogUEkgLyAxODAsXG4gIE4xODBfUEk6IDE4MCAvIFBJLFxuICBJbmZpbml0eTogLTk5OSxcblxuICBpc0luZmluaXR5KG51bSkge1xuICAgIHJldHVybiBudW0gPT09IHRoaXMuSW5maW5pdHkgfHwgbnVtID09PSBJTkZJTklUWTtcbiAgfSxcblxuICByYW5kb21BVG9CKGEsIGIsIGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzSW50KSByZXR1cm4gYSArIE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpO1xuICAgIGVsc2UgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpID4+IDApICsgYTtcbiAgfSxcblxuICByYW5kb21GbG9hdGluZyhjZW50ZXIsIGYsIGlzSW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tQVRvQihjZW50ZXIgLSBmLCBjZW50ZXIgKyBmLCBpc0ludCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICgoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCkgPDwgMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XG4gIH0sXG5cbiAgcmFuZG9tWm9uZShkaXNwbGF5KSB7fSxcblxuICBmbG9vcihudW0sIGsgPSA0KSB7XG4gICAgY29uc3QgZGlnaXRzID0gTWF0aC5wb3coMTAsIGspO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRpZ2l0cykgLyBkaWdpdHM7XG4gIH0sXG5cbiAgZGVncmVlVHJhbnNmb3JtKGEpIHtcbiAgICByZXR1cm4gKGEgKiBQSSkgLyAxODA7XG4gIH0sXG5cbiAgdG9Db2xvcjE2KG51bSkge1xuICAgIHJldHVybiBgIyR7bnVtLnRvU3RyaW5nKDE2KX1gO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVncmF0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBjYWxjdWxhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgdGhpcy5ldWxlckludGVncmF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpO1xuICB9XG5cbiAgLy8gRXVsZXIgSW50ZWdyYXRlXG4gIC8vIGh0dHBzOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4gIGV1bGVySW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zbGVlcCkge1xuICAgICAgcGFydGljbGUub2xkLnAuY29weShwYXJ0aWNsZS5wKTtcbiAgICAgIHBhcnRpY2xlLm9sZC52LmNvcHkocGFydGljbGUudik7XG5cbiAgICAgIHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIoMSAvIHBhcnRpY2xlLm1hc3MpO1xuICAgICAgcGFydGljbGUudi5hZGQocGFydGljbGUuYS5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChwYXJ0aWNsZS5vbGQudi5tdWx0aXBseVNjYWxhcih0aW1lKSk7XG5cbiAgICAgIGlmIChkYW1waW5nKSBwYXJ0aWNsZS52Lm11bHRpcGx5U2NhbGFyKGRhbXBpbmcpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9vbCBmcm9tIFwiLi9Qb29sXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFN0YXRzIGZyb20gXCIuLi9kZWJ1Zy9TdGF0c1wiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgSW50ZWdyYXRpb24gZnJvbSBcIi4uL21hdGgvSW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdG9uIHtcbiAgc3RhdGljIFVTRV9DTE9DSyA9IGZhbHNlO1xuXG4gIC8vIG1lYXN1cmUgMToxMDBcbiAgc3RhdGljIE1FQVNVUkUgPSAxMDA7XG4gIHN0YXRpYyBFVUxFUiA9IFwiZXVsZXJcIjtcbiAgc3RhdGljIFJLMiA9IFwicnVuZ2Uta3V0dGEyXCI7XG5cbiAgLy8gZXZlbnQgbmFtZVxuICBzdGF0aWMgUEFSVElDTEVfQ1JFQVRFRCA9IFwiUEFSVElDTEVfQ1JFQVRFRFwiO1xuICBzdGF0aWMgUEFSVElDTEVfVVBEQVRFID0gXCJQQVJUSUNMRV9VUERBVEVcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1NMRUVQID0gXCJQQVJUSUNMRV9TTEVFUFwiO1xuICBzdGF0aWMgUEFSVElDTEVfREVBRCA9IFwiUEFSVElDTEVfREVBRFwiO1xuXG4gIHN0YXRpYyBFTUlUVEVSX0FEREVEID0gXCJFTUlUVEVSX0FEREVEXCI7XG4gIHN0YXRpYyBFTUlUVEVSX1JFTU9WRUQgPSBcIkVNSVRURVJfUkVNT1ZFRFwiO1xuXG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFID0gXCJQUk9UT05fVVBEQVRFXCI7XG4gIHN0YXRpYyBQUk9UT05fVVBEQVRFX0FGVEVSID0gXCJQUk9UT05fVVBEQVRFX0FGVEVSXCI7XG4gIHN0YXRpYyBERUZBVUxUX0lOVEVSVkFMID0gMC4wMTY3O1xuXG4gIHN0YXRpYyBhbWVuZENoYW5nZVRhYnNCdWcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdG8gYWRkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvciBQcm90b25cbiAgICpcbiAgICogQHRvZG8gcHJvUGFydGljbGVDb3VudCBpcyBub3QgaW4gdXNlXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb24gb2YgdGhlIHNpbmdsZSBwcm9wZXJ0aWVzIGFuZCBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcHJvUGFydGljbGVDb3VudF0gbm90IGluIHVzZT9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGVtaXR0ZXJzICAgQWxsIGFkZGVkIGVtaXR0ZXJcbiAgICogQHByb3BlcnR5IHtBcnJheX0gcmVuZGVyZXJzICBBbGwgYWRkZWQgcmVuZGVyZXJcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgICAgICBUaGUgYWN0aXZlIHRpbWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9sZHRpbWUgICBUaGUgb2xkIHRpbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVncmF0aW9uVHlwZSkge1xuICAgIHRoaXMuZW1pdHRlcnMgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVycyA9IFtdO1xuXG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5vdyA9IDA7XG4gICAgdGhpcy50aGVuID0gMDtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cyh0aGlzKTtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCg4MCk7XG5cbiAgICB0aGlzLmludGVncmF0aW9uVHlwZSA9IFV0aWwuaW5pdFZhbHVlKGludGVncmF0aW9uVHlwZSwgUHJvdG9uLkVVTEVSKTtcbiAgICB0aGlzLmludGVncmF0b3IgPSBuZXcgSW50ZWdyYXRpb24odGhpcy5pbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgdGhpcy5fZnBzID0gXCJhdXRvXCI7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBQcm90b24uREVGQVVMVF9JTlRFUlZBTDtcbiAgfVxuXG4gIHNldCBmcHMoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX2ludGVydmFsID0gZnBzID09PSBcImF1dG9cIiA/IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMIDogTWF0aFV0aWwuZmxvb3IoMSAvIGZwcywgNyk7XG4gIH1cblxuICBnZXQgZnBzKCkge1xuICAgIHJldHVybiB0aGlzLl9mcHM7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgYWRkUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgcmVuZGVyLmluaXQodGhpcyk7XG4gICAgdGhpcy5yZW5kZXJlcnMucHVzaChyZW5kZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIHJlbW92ZVJlbmRlcmVyKHJlbmRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZW5kZXJlcnMuaW5kZXhPZihyZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmVuZGVyLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgYWRkRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9BRERFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgcmVtb3ZlRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICByZW1vdmVFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZW1pdHRlcnMuaW5kZXhPZihlbWl0dGVyKTtcbiAgICB0aGlzLmVtaXR0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgZW1pdHRlci5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX1JFTU9WRUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWxsIGFkZGVkIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgLy8gJ2F1dG8nIGlzIHRoZSBkZWZhdWx0IGJyb3dzZXIgcmVmcmVzaCByYXRlLCB0aGUgdmFzdCBtYWpvcml0eSBpcyA2MGZwc1xuICAgIGlmICh0aGlzLl9mcHMgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuXG4gICAgICBpZiAoUHJvdG9uLlVTRV9DTE9DSykge1xuICAgICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcbiAgICAgICAgLy8gRml4IGJ1Z3Mgc3VjaCBhcyBjaHJvbWUgYnJvd3NlciBzd2l0Y2hpbmcgdGFicyBjYXVzaW5nIGV4Y2Vzc2l2ZSB0aW1lIGRpZmZlcmVuY2VcbiAgICAgICAgdGhpcy5hbWVuZENoYW5nZVRhYnNCdWcoKTtcblxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkID4gMCkgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLmVsYXBzZWQpO1xuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUoUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmcHMgZnJhbWUgcmF0ZSBpcyBzZXRcbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMubm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG5cbiAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEUpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk3NjQwMTgvY29udHJvbGxpbmctZnBzLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lXG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93IC0gKHRoaXMuZWxhcHNlZCAlIHRoaXMuX2ludGVydmFsKSAqIDEwMDA7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW1pdHRlcnNVcGRhdGUoZWxhcHNlZCkge1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5lbWl0dGVyc1tpXS51cGRhdGUoZWxhcHNlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgYW1lbmRDaGFuZ2VUYWJzQnVnXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBhbWVuZENoYW5nZVRhYnNCdWcoKSB7XG4gICAgaWYgKCFQcm90b24uYW1lbmRDaGFuZ2VUYWJzQnVnKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZWxhcHNlZCA+IDAuNSkge1xuICAgICAgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgYWxsIHBhcnRpY2xlcyBmcm9tIGFsbCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB0b3RhbCArPSB0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgZ2V0QWxsUGFydGljbGVzKCkge1xuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgcGFydGljbGVzID0gcGFydGljbGVzLmNvbmNhdCh0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcyk7XG4gICAgcmV0dXJuIHBhcnRpY2xlcztcbiAgfVxuXG4gIGRlc3Ryb3lBbGxFbWl0dGVycygpIHtcbiAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoaXMgUHJvdG9uIGluc3RhbmNlLiBUaGlzIGluY2x1ZGVzIGFsbCBlbWl0dGVycywgYW5kIGFsbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveShyZW1vdmUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRlc3Ryb3lPdGhlciA9ICgpID0+IHtcbiAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICB0aGlzLnRoZW4gPSAwO1xuICAgICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc3RhdHMuZGVzdHJveSgpO1xuXG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5lbWl0dGVycyk7XG4gICAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5yZW5kZXJlcnMsIHRoaXMuZ2V0QWxsUGFydGljbGVzKCkpO1xuXG4gICAgICB0aGlzLmludGVncmF0b3IgPSBudWxsO1xuICAgICAgdGhpcy5yZW5kZXJlcnMgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0dGVycyA9IG51bGw7XG4gICAgICB0aGlzLnN0YXRzID0gbnVsbDtcbiAgICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoZGVzdHJveU90aGVyLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95T3RoZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoUHJvdG9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJnYiB7XG4gIGNvbnN0cnVjdG9yKHIgPSAyNTUsIGcgPSAyNTUsIGIgPSAyNTUpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuciA9IDI1NTtcbiAgICB0aGlzLmcgPSAyNTU7XG4gICAgdGhpcy5iID0gMjU1O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGhhc1Byb3AodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfSxcblxuICAvKipcbiAgICogc2V0IHRoZSBwcm90b3R5cGUgaW4gYSBnaXZlbiBwcm90b3R5cGVPYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFByb3BcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyB0cmFuc2xhdGUgZGVzcmlwdGlvbiBmcm9tIGNoaW5lc2UgdG8gZW5nbGlzaFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGVPYmplY3QgQW4gb2JqZWN0IG9mIHNpbmdsZSBwcm90b3R5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gdGFyZ2V0XG4gICAqL1xuICBzZXRQcm9wKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IFNwYW4uZ2V0U3BhblZhbHVlKHByb3BzW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0VmVjdG9yVmFsXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgY29uZmBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mXG4gICAqL1xuICBzZXRWZWN0b3JWYWwocGFydGljbGUsIGNvbmYgPSBudWxsKSB7XG4gICAgaWYgKCFjb25mKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieFwiKSkgcGFydGljbGUucC54ID0gY29uZltcInhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInlcIikpIHBhcnRpY2xlLnAueSA9IGNvbmZbXCJ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ4XCIpKSBwYXJ0aWNsZS52LnggPSBjb25mW1widnhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ5XCIpKSBwYXJ0aWNsZS52LnkgPSBjb25mW1widnlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXhcIikpIHBhcnRpY2xlLmEueCA9IGNvbmZbXCJheFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXlcIikpIHBhcnRpY2xlLmEueSA9IGNvbmZbXCJheVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFcIl0pO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBvc2l0aW9uXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBvc2l0aW9uXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidmVsb2NpdHlcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widmVsb2NpdHlcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhY2NlbGVyYXRlXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFjY2VsZXJhdGVcIl0pO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZWFzZUxpbmVhcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICBlYXNlSW5RdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAyKTtcbiAgfSxcblxuICBlYXNlT3V0UXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgMikgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFkKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAyKTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluQ3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDMpO1xuICB9LFxuXG4gIGVhc2VPdXRDdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSAtIDEsIDMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRDdWJpYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG5cbiAgICByZXR1cm4gMC41ICogKE1hdGgucG93KHZhbHVlIC0gMiwgMykgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5RdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG4gIH0sXG5cbiAgZWFzZU91dFF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCA0KSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YXJ0KHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCA0KTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIE1hdGgucG93KHZhbHVlLCAzKSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJblNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLU1hdGguY29zKHZhbHVlICogTWF0aFV0aWwuUElfMikgKyAxO1xuICB9LFxuXG4gIGVhc2VPdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc2luKHZhbHVlICogTWF0aFV0aWwuUElfMik7XG4gIH0sXG5cbiAgZWFzZUluT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5FeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuICB9LFxuXG4gIGVhc2VPdXRFeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAxID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiB2YWx1ZSkgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEV4cG8odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApIHJldHVybiAwO1xuXG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gMTtcblxuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcblxuICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdmFsdWUpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluQ2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlT3V0Q2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KHZhbHVlIC0gMSwgMikpO1xuICB9LFxuXG4gIGVhc2VJbk91dENpcmModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh2YWx1ZSAtPSAyKSAqIHZhbHVlKSArIDEpO1xuICB9LFxuXG4gIGVhc2VJbkJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuIHZhbHVlICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlIC0gcyk7XG4gIH0sXG5cbiAgZWFzZU91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuICh2YWx1ZSA9IHZhbHVlIC0gMSkgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgKyBzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogKHZhbHVlICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgLSBzKSk7XG4gICAgcmV0dXJuIDAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSArIHMpICsgMik7XG4gIH0sXG5cbiAgZ2V0RWFzaW5nKGVhc2UpIHtcbiAgICBpZiAodHlwZW9mIGVhc2UgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGVhc2U7XG4gICAgZWxzZSByZXR1cm4gdGhpc1tlYXNlXSB8fCB0aGlzLmVhc2VMaW5lYXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMkQge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geCB8fCAwO1xuICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgfVxuXG4gIHNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0WCh4KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFkoeSkge1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRHcmFkaWVudCgpIHtcbiAgICBpZiAodGhpcy54ICE9PSAwKSByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgZWxzZSBpZiAodGhpcy55ID4gMCkgcmV0dXJuIE1hdGhVdGlsLlBJXzI7XG4gICAgZWxzZSBpZiAodGhpcy55IDwgMCkgcmV0dXJuIC1NYXRoVXRpbC5QSV8yO1xuICB9XG5cbiAgY29weSh2KSB7XG4gICAgdGhpcy54ID0gdi54O1xuICAgIHRoaXMueSA9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkWFkoYSwgYikge1xuICAgIHRoaXMueCArPSBhO1xuICAgIHRoaXMueSArPSBiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggKyBiLng7XG4gICAgdGhpcy55ID0gYS55ICsgYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWIodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YlZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54IC09IHYueDtcbiAgICB0aGlzLnkgLT0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWJWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggLSBiLng7XG4gICAgdGhpcy55ID0gYS55IC0gYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXZpZGVTY2FsYXIocykge1xuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gcztcbiAgICAgIHRoaXMueSAvPSBzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCgwLCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bHRpcGx5U2NhbGFyKHMpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmVnYXRlKCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKC0xKTtcbiAgfVxuXG4gIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbiAgfVxuXG4gIGxlbmd0aFNxKCkge1xuICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gIH1cblxuICBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpKTtcbiAgfVxuXG4gIGRpc3RhbmNlVG8odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVRvU3F1YXJlZCh2KSk7XG4gIH1cblxuICByb3RhdGUodGhhKSB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKHRoYSkgKyB5ICogTWF0aC5zaW4odGhhKTtcbiAgICB0aGlzLnkgPSAteCAqIE1hdGguc2luKHRoYSkgKyB5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdGFuY2VUb1NxdWFyZWQodikge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gdi54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gdi55O1xuXG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICB9XG5cbiAgbGVycCh2LCBhbHBoYSkge1xuICAgIHRoaXMueCArPSAodi54IC0gdGhpcy54KSAqIGFscGhhO1xuICAgIHRoaXMueSArPSAodi55IC0gdGhpcy55KSAqIGFscGhhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMueCA9IDAuMDtcbiAgICB0aGlzLnkgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55KTtcbiAgfVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL2JlaGF2aW91ci9CZWhhdmlvdXInKX0gQmVoYXZpb3VyICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vbWF0aC9WZWN0b3IyRCcpfSBWZWN0b3IyRCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL3V0aWxzL1JnYicpfSBSZ2IgKi9cbmltcG9ydCBSZ2IgZnJvbSBcIi4uL3V0aWxzL1JnYlwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gIC8qKiBAdHlwZSBzdHJpbmcgKi9cbiAgaWQgPSBcIlwiO1xuXG4gIC8qKiBAdHlwZSB7e3A6VmVjdG9yMkQsdjpWZWN0b3IyRCxhOlZlY3RvcjJEfX0gKi9cbiAgb2xkID0gbnVsbDtcblxuICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgZGF0YSA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtCZWhhdmlvdXJbXX0gKi9cbiAgYmVoYXZpb3VycyA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgcCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgdiA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgYSA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtSZ2J9ICovXG4gIHJnYiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIHRoZSBQYXJ0aWNsZSBjbGFzc1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLlBhcnRpY2xlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gcE9iaiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtsaWZlOjMsZGVhZDpmYWxzZX1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgcGFydGljbGUncyBpZDtcbiAgICAgKiBAcHJvcGVydHkgaWRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiUGFydGljbGVcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICAgIHRoaXMub2xkID0ge307XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG5cbiAgICB0aGlzLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmEgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLmEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIHRoaXMucmdiID0gbmV3IFJnYigpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBjb25mICYmIFByb3BVdGlsLnNldFByb3AodGhpcywgY29uZik7XG4gIH1cblxuICBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52LngsIC10aGlzLnYueSkgKiBNYXRoVXRpbC5OMTgwX1BJO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5saWZlID0gSW5maW5pdHk7XG4gICAgdGhpcy5hZ2UgPSAwO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5zbGVlcCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keSA9IG51bGw7XG4gICAgdGhpcy5zcHJpdGUgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZW5lcmd5ID0gMTsgLy8gRW5lcmd5IExvc3NcbiAgICB0aGlzLm1hc3MgPSAxO1xuICAgIHRoaXMucmFkaXVzID0gMTA7XG4gICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgdGhpcy5jb2xvciA9IG51bGw7XG5cbiAgICB0aGlzLnAuc2V0KDAsIDApO1xuICAgIHRoaXMudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5hLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5wLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC52LnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5hLnNldCgwLCAwKTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZWFzZUxpbmVhcjtcblxuICAgIHRoaXMucmdiLnJlc2V0KCk7XG4gICAgVXRpbC5lbXB0eU9iamVjdCh0aGlzLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGUodGltZSwgaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcbiAgICAgIHRoaXMuYWdlICs9IHRpbWU7XG4gICAgICB0aGlzLmFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWdlIDwgdGhpcy5saWZlKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHRoaXMuYWdlIC8gdGhpcy5saWZlKTtcbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlCZWhhdmlvdXJzKHRpbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5iZWhhdmlvdXJzW2ldICYmIHRoaXMuYmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXJcbiAgICovXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGJlaGF2aW91ci5oYXNPd25Qcm9wZXJ0eShcInBhcmVudHNcIikpIGJlaGF2aW91ci5wYXJlbnRzLnB1c2godGhpcyk7XG4gICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJbXX0gYmVoYXZpb3Vyc1xuICAgKi9cbiAgYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWRkQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgcGFydGljbGVcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHR5cGVkZWYgIHtPYmplY3R9IHJnYk9iamVjdFxuICAgKiBAcHJvcGVydHkge051bWJlcn0gciByZWQgdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGcgZ3JlZW4gdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGIgYmx1ZSB2YWx1ZVxuICAgKi9cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgaGV4IHZhbHVlIHRvIGEgcmdiIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgaGV4VG9SZ2JcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGggYW55IGhleCB2YWx1ZSwgZS5nLiAjMDAwMDAwIG9yIDAwMDAwMCBmb3IgYmxhY2tcbiAgICpcbiAgICogQHJldHVybiB7cmdiT2JqZWN0fVxuICAgKi9cbiAgaGV4VG9SZ2IoaCkge1xuICAgIGNvbnN0IGhleDE2ID0gaC5jaGFyQXQoMCkgPT09IFwiI1wiID8gaC5zdWJzdHJpbmcoMSwgNykgOiBoO1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuXG4gICAgcmV0dXJuIHsgciwgZywgYiB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIHJnYiB2YWx1ZSB0byBhIHJnYiBzdHJpbmdcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHJnYlRvSGV4XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgUHJvdG9uLmhleFRvUmdifSByZ2IgYSByZ2Igb2JqZWN0IGxpa2UgaW4ge0BsaW5rIFByb3RvbiNQcm90b24ufVxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHJnYigpXG4gICAqL1xuICByZ2JUb0hleChyYmcpIHtcbiAgICByZXR1cm4gYHJnYigke3JiZy5yfSwgJHtyYmcuZ30sICR7cmJnLmJ9KWA7XG4gIH0sXG5cbiAgZ2V0SGV4MTZGcm9tUGFydGljbGUocCkge1xuICAgIHJldHVybiBOdW1iZXIocC5yZ2IucikgKiA2NTUzNiArIE51bWJlcihwLnJnYi5nKSAqIDI1NiArIE51bWJlcihwLnJnYi5iKTtcbiAgfVxufTtcbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2xhcjJEIHtcbiAgY29uc3RydWN0b3IociwgdGhhKSB7XG4gICAgdGhpcy5yID0gTWF0aC5hYnMocikgfHwgMDtcbiAgICB0aGlzLnRoYSA9IHRoYSB8fCAwO1xuICB9XG5cbiAgc2V0KHIsIHRoYSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRSKHIpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VGhhKHRoYSkge1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29weShwKSB7XG4gICAgdGhpcy5yID0gcC5yO1xuICAgIHRoaXMudGhhID0gcC50aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1ZlY3RvcigpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMuZ2V0WCgpLCB0aGlzLmdldFkoKSk7XG4gIH1cblxuICBnZXRYKCkge1xuICAgIHJldHVybiB0aGlzLnIgKiBNYXRoLnNpbih0aGlzLnRoYSk7XG4gIH1cblxuICBnZXRZKCkge1xuICAgIHJldHVybiAtdGhpcy5yICogTWF0aC5jb3ModGhpcy50aGEpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuciA9IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnIgPT09IHRoaXMuciAmJiB2LnRoYSA9PT0gdGhpcy50aGE7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnIgPSAwLjA7XG4gICAgdGhpcy50aGEgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFBvbGFyMkQodGhpcy5yLCB0aGlzLnRoYSk7XG4gIH1cbn1cbiIsImNvbnN0IE1hdDMgPSB7XG4gIGNyZWF0ZShtYXQzKSB7XG4gICAgY29uc3QgbWF0ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcbiAgICBpZiAobWF0MykgdGhpcy5zZXQobWF0MywgbWF0KTtcblxuICAgIHJldHVybiBtYXQ7XG4gIH0sXG5cbiAgc2V0KG1hdDEsIG1hdDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykgbWF0MltpXSA9IG1hdDFbaV07XG5cbiAgICByZXR1cm4gbWF0MjtcbiAgfSxcblxuICBtdWx0aXBseShtYXQsIG1hdDIsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTAyID0gbWF0WzJdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAwID0gbWF0MlswXSxcbiAgICAgIGIwMSA9IG1hdDJbMV0sXG4gICAgICBiMDIgPSBtYXQyWzJdLFxuICAgICAgYjEwID0gbWF0MlszXSxcbiAgICAgIGIxMSA9IG1hdDJbNF0sXG4gICAgICBiMjAgPSBtYXQyWzZdLFxuICAgICAgYjIxID0gbWF0Mls3XTtcblxuICAgIG1hdDNbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTA7XG4gICAgbWF0M1sxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMTtcbiAgICBtYXQzWzJdID0gYTAyICogYjAyO1xuICAgIG1hdDNbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTA7XG4gICAgbWF0M1s0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMTtcbiAgICBtYXQzWzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYTIwO1xuICAgIG1hdDNbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBhMjE7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBpbnZlcnNlKG1hdCwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDEgPSBhMTEsXG4gICAgICBiMTEgPSAtYTEwLFxuICAgICAgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwLFxuICAgICAgZCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSxcbiAgICAgIGlkO1xuXG4gICAgaWQgPSAxIC8gZDtcbiAgICBtYXQzWzBdID0gYjAxICogaWQ7XG4gICAgbWF0M1sxXSA9IC1hMDEgKiBpZDtcbiAgICBtYXQzWzNdID0gYjExICogaWQ7XG4gICAgbWF0M1s0XSA9IGEwMCAqIGlkO1xuICAgIG1hdDNbNl0gPSBiMjEgKiBpZDtcbiAgICBtYXQzWzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogaWQ7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBtdWx0aXBseVZlYzIobSwgdmVjLCBtYXQzKSB7XG4gICAgbGV0IHggPSB2ZWNbMF0sXG4gICAgICB5ID0gdmVjWzFdO1xuXG4gICAgbWF0M1swXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyBtWzZdO1xuICAgIG1hdDNbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgbVs3XTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXQzO1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgY2VudGVyKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5pc0FycmF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYSA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuICAgICAgdGhpcy5hID0gVXRpbC5pbml0VmFsdWUoYSwgMSk7XG4gICAgICB0aGlzLmIgPSBVdGlsLmluaXRWYWx1ZShiLCB0aGlzLmEpO1xuICAgICAgdGhpcy5jZW50ZXIgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNBcnJheSkge1xuICAgICAgcmV0dXJuIFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY2VudGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21BVG9CKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tRmxvYXRpbmcodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBTcGFuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqXG4gICAqIEB0b2RvIGEsIGIgYW5kIGMgc2hvdWxkIGJlICdNaXhlZCcgb3IgJ051bWJlcic/XG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBhXG4gICAqIEBwYXJhbSB7TWl4ZWR9ICAgICAgICAgICAgICAgYlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGNcbiAgICpcbiAgICogQHJldHVybiB7U3Bhbn1cbiAgICovXG4gIHN0YXRpYyBzZXRTcGFuVmFsdWUoYSwgYiwgYykge1xuICAgIGlmIChhIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcGFuKGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTcGFuKGEsIGIpO1xuICAgICAgICBlbHNlIHJldHVybiBuZXcgU3BhbihhLCBiLCBjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgZnJvbSBhIFNwYW4sIGlmIHRoZSBwYXJhbSBpcyBub3QgYSBTcGFuIGl0IHdpbGwgcmV0dXJuIHRoZSBnaXZlbiBwYXJhbWV0ZXJcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldFZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWQgfCBTcGFufSBwYW5cbiAgICpcbiAgICogQHJldHVybiB7TWl4ZWR9IHRoZSB2YWx1ZSBvZiBTcGFuIE9SIHRoZSBwYXJhbWV0ZXIgaWYgaXQgaXMgbm90IGEgU3BhblxuICAgKi9cbiAgc3RhdGljIGdldFNwYW5WYWx1ZShwYW4pIHtcbiAgICByZXR1cm4gcGFuIGluc3RhbmNlb2YgU3BhbiA/IHBhbi5nZXRWYWx1ZSgpIDogcGFuO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5U3BhbiBleHRlbmRzIFNwYW4ge1xuICBjb25zdHJ1Y3Rvcihjb2xvcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYXJyID0gVXRpbC50b0FycmF5KGNvbG9yKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIGNvbnN0IHZhbCA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLl9hcnIpO1xuICAgIHJldHVybiB2YWwgPT09IFwicmFuZG9tXCIgfHwgdmFsID09PSBcIlJhbmRvbVwiID8gTWF0aFV0aWwucmFuZG9tQ29sb3IoKSA6IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHN1cmUgdGhhdCB0aGUgY29sb3IgaXMgYW4gaW5zdGFuY2Ugb2YgUHJvdG9uLkFycmF5U3BhbiwgaWYgbm90IGl0IG1ha2VzIGEgbmV3IGluc3RhbmNlXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBcnJheVNwYW4oYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5U3BhbikgcmV0dXJuIGFycjtcbiAgICBlbHNlIHJldHVybiBuZXcgQXJyYXlTcGFuKGFycik7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLndpZHRoID0gdztcbiAgICB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuICB9XG5cbiAgY29udGFpbnMoeCwgeSkge1xuICAgIGlmICh4IDw9IHRoaXMucmlnaHQgJiYgeCA+PSB0aGlzLnggJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMueSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUge1xuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWlzc2lvbiAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYXRlXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkgfCBOdW1iZXIgfCBTcGFufSBudW1wYW4gdGhlIG51bWJlciBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBAcGFyYW0ge0FycmF5IHwgTnVtYmVyIHwgU3Bhbn0gdGltZXBhbiB0aGUgdGltZSBvZiBlYWNoIGVtaXNzaW9uO1xuICAgKiBmb3IgZXhhbXBsZTogbmV3IFJhdGUobmV3IFNwYW4oMTAsIDIwKSwgbmV3IFNwYW4oLjEsIC4yNSkpO1xuICAgKi9cbiAgY29uc3RydWN0b3IobnVtcGFuLCB0aW1lcGFuKSB7XG4gICAgdGhpcy5udW1QYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShudW1wYW4sIDEpKTtcbiAgICB0aGlzLnRpbWVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZSh0aW1lcGFuLCAxKSk7XG5cbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IDA7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG4gIH1cblxuICBnZXRWYWx1ZSh0aW1lKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA+PSB0aGlzLm5leHRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICB0aGlzLm5leHRUaW1lID0gdGhpcy50aW1lUGFuLmdldFZhbHVlKCk7XG5cbiAgICAgIGlmICh0aGlzLm51bVBhbi5iID09PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLm51bVBhbi5nZXRWYWx1ZShmYWxzZSkgPiAwLjUpIHJldHVybiAxO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtUGFuLmdldFZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXplIHtcbiAgcmVzZXQoKSB7fVxuXG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShlbWl0dGVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBzdWIgY2xhc3MgaW5pdFxuICBpbml0aWFsaXplKHRhcmdldCkge31cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlmZSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGlmZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTGlmZVwiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5saWZlUGFuLmEgPT09IEluZmluaXR5KSB0YXJnZXQubGlmZSA9IEluZmluaXR5O1xuICAgIGVsc2UgdGFyZ2V0LmxpZmUgPSB0aGlzLmxpZmVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgICB0aGlzLnJhbmRvbSA9IDA7XG4gICAgdGhpcy5jcm9zc1R5cGUgPSBcImRlYWRcIjtcbiAgICB0aGlzLmFsZXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge31cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudmVjdG9yID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54O1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIFBvaW50Wm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzaW5nIG1ldGhvZCFcIik7XG4gICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3Ioem9uZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgICB0aGlzLm5hbWUgPSBcIlBvc2l0aW9uXCI7XG4gIH1cblxuICByZXNldCh6b25lKSB7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGhpcy56b25lLmdldFBvc2l0aW9uKCk7XG5cbiAgICB0YXJnZXQucC54ID0gdGhpcy56b25lLnZlY3Rvci54O1xuICAgIHRhcmdldC5wLnkgPSB0aGlzLnpvbmUudmVjdG9yLnk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4uL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbG9jaXR5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlZlbG9jaXR5XCI7XG4gIH1cblxuICByZXNldChycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG4gIH1cblxuICBub3JtYWxpemVWZWxvY2l0eSh2cikge1xuICAgIHJldHVybiB2ciAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInBcIiB8fCB0aGlzLnR5cGUgPT09IFwiUFwiIHx8IHRoaXMudHlwZSA9PT0gXCJwb2xhclwiKSB7XG4gICAgICBjb25zdCBwb2xhcjJkID0gbmV3IFBvbGFyMkQoXG4gICAgICAgIHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpLFxuICAgICAgICB0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpICogTWF0aFV0aWwuUElfMTgwXG4gICAgICApO1xuXG4gICAgICB0YXJnZXQudi54ID0gcG9sYXIyZC5nZXRYKCk7XG4gICAgICB0YXJnZXQudi55ID0gcG9sYXIyZC5nZXRZKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC52LnggPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKTtcbiAgICAgIHRhcmdldC52LnkgPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMudGhhUGFuLmdldFZhbHVlKCkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFzc1BhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTWFzc1wiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0YXJnZXQubWFzcyA9IHRoaXMubWFzc1Bhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGl1cyBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJSYWRpdXNcIjtcbiAgfVxuXG4gIHJlc2V0KGEsIGIsIGMpIHtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHRoaXMucmFkaXVzLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2R5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlLCB3LCBoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNldFNwYW5WYWx1ZShpbWFnZSk7XG4gICAgdGhpcy53ID0gVXRpbC5pbml0VmFsdWUodywgMjApO1xuICAgIHRoaXMuaCA9IFV0aWwuaW5pdFZhbHVlKGgsIHRoaXMudyk7XG4gICAgdGhpcy5uYW1lID0gXCJCb2R5XCI7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSB0aGlzLmltYWdlLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlVGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0ge1xuICAgICAgICB3aWR0aDogdGhpcy53LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaCxcbiAgICAgICAgc3JjOiBpbWFnZVRhcmdldCxcbiAgICAgICAgaXNJbm5lcjogdHJ1ZSxcbiAgICAgICAgaW5uZXI6IHRydWVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBpbWFnZVRhcmdldDtcbiAgICB9XG4gIH1cblxuICBzZXRTcGFuVmFsdWUoaW1hZ2UpIHtcbiAgICByZXR1cm4gaW1hZ2UgaW5zdGFuY2VvZiBBcnJheVNwYW4gPyBpbWFnZSA6IG5ldyBBcnJheVNwYW4oaW1hZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyIHtcbiAgc3RhdGljIGlkID0gMDtcblxuICAvKipcbiAgICogVGhlIEJlaGF2aW91ciBjbGFzcyBpcyB0aGUgYmFzZSBmb3IgdGhlIG90aGVyIEJlaGF2aW91clxuICAgKlxuICAgKiBAbWVtYmVyb2YhIC1cbiAgICogQGludGVyZmFjZVxuICAgKiBAYWxpYXMgUHJvdG9uLkJlaGF2aW91clxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbGlmZSBcdHRoZSBiZWhhdmlvdXJzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVhc2luZyBcdFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZCwgZm9yIGV4YW1wbGUgZWFzZS5lYXNlT3V0UXVhcnRcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9ICBpZCBcdFx0VGhlIGJlaGF2aW91cnMgaWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9ICBhZ2U9MCBcdEhvdyBsb25nIHRoZSBwYXJ0aWNsZSBzaG91bGQgYmUgJ2FsaWZlJ1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gIGVuZXJneT0xXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVhZD1mYWxzZSBUaGUgcGFydGljbGUgaXMgZGVhZCBhdCBmaXJzdFxuICAgKiBAcHJvcGVydHkge0FycmF5fSAgIHBhcmVudHMgXHRUaGUgYmVoYXZpb3VyJ3MgcGFyZW50cyBhcnJheVxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gIG5hbWUgXHRUaGUgYmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG5cbiAgICB0aGlzLmFnZSA9IDA7XG4gICAgdGhpcy5lbmVyZ3kgPSAxO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyZW50cyA9IFtdO1xuXG4gICAgdGhpcy5pZCA9IGBCZWhhdmlvdXJfJHtCZWhhdmlvdXIuaWQrK31gO1xuICAgIHRoaXMubmFtZSA9IFwiQmVoYXZpb3VyXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIGZvcmNlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAbWV0aG9kIG5vcm1hbGl6ZUZvcmNlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gZm9yY2VcbiAgICovXG4gIG5vcm1hbGl6ZUZvcmNlKGZvcmNlKSB7XG4gICAgcmV0dXJuIGZvcmNlLm11bHRpcGx5U2NhbGFyKFByb3Rvbi5NRUFTVVJFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2YWx1ZSBieSAxOjEwMDtcbiAgICpcbiAgICogQG1ldGhvZCBub3JtYWxpemVWYWx1ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAqL1xuICBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIGNvbXB1dGluZyBsaWZlIGN5Y2xlXG4gICAqXG4gICAqIEBtZXRob2QgY2FsY3VsYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuYWdlICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlIHx8IHRoaXMuZGVhZCkge1xuICAgICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHBhcnRpY2xlLmFnZSAvIHBhcnRpY2xlLmxpZmUpO1xuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgYmVoYXZpb3VyXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcmVudHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMucGFyZW50c1tpXS5yZW1vdmVCZWhhdmlvdXIodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnRzLmxlbmd0aCA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yY2UgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkZvcmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeFxuICAgKiBAcGFyYW0ge051bWJlcn0gZnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuICAgIHRoaXMubmFtZSA9IFwiRm9yY2VcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGZ4LCBmeSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHRoaXMuZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0aW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIFRoaXMgYmVoYXZpb3VyIGxldCB0aGUgcGFydGljbGVzIGZvbGxvdyBvbmUgc3BlY2lmaWMgUHJvdG9uLlZlY3RvcjJEXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5BdHRyYWN0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb25cbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGl1c1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9yY2VcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGl1c1NxXG4gICAqIEBwcm9wZXJ0eSB7UHJvdG9uLlZlY3RvcjJEfSBhdHRyYWN0aW9uRm9yY2VcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxlbmd0aFNxXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLnJhZGl1cyA9IFV0aWwuaW5pdFZhbHVlKHJhZGl1cywgMTAwMCk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIHRoaXMubmFtZSA9IFwiQXR0cmFjdGlvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLmNvcHkodGhpcy50YXJnZXRQb3NpdGlvbik7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uuc3ViKHBhcnRpY2xlLnApO1xuICAgIHRoaXMubGVuZ3RoU3EgPSB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoU3EgPiAwLjAwMDA0ICYmIHRoaXMubGVuZ3RoU3EgPCB0aGlzLnJhZGl1c1NxKSB7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5ub3JtYWxpemUoKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKDEgLSB0aGlzLmxlbmd0aFNxIC8gdGhpcy5yYWRpdXNTcSk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5tdWx0aXBseVNjYWxhcih0aGlzLmZvcmNlKTtcblxuICAgICAgcGFydGljbGUuYS5hZGQodGhpcy5hdHRyYWN0aW9uRm9yY2UpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbURyaWZ0IGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUmFuZG9tRHJpZnRcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgVGhlIHRpbWUgb2YgdGhlIGRyaWZ0XG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZHJpZnRYLCBkcmlmdFksIGRlbGF5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXkpO1xuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5uYW1lID0gXCJSYW5kb21EcmlmdFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFggXHRcdFx0XHRYIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WSAgXHRcdFx0XHRZIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IFx0XHRcdFx0SG93IG11Y2ggZGVsYXkgdGhlIGRyaWZ0IHNob3VsZCBoYXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMucGFuRm9jZSA9IG5ldyBWZWN0b3IyRChkcmlmdFgsIGRyaWZ0WSk7XG4gICAgdGhpcy5wYW5Gb2NlID0gdGhpcy5ub3JtYWxpemVGb3JjZSh0aGlzLnBhbkZvY2UpO1xuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1JhbmRvbURyaWZ0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGltZSA+PSB0aGlzLmRlbGF5KSB7XG4gICAgICBwYXJ0aWNsZS5hLmFkZFhZKFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueCwgdGhpcy5wYW5Gb2NlLngpLFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueSwgdGhpcy5wYW5Gb2NlLnkpXG4gICAgICApO1xuXG4gICAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEZvcmNlIGZyb20gXCIuL0ZvcmNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHkgZXh0ZW5kcyBGb3JjZSB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uR3Jhdml0eVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZyBcdFx0XHRcdFx0XHRcdEdyYXZpdHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcigwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMubmFtZSA9IFwiR3Jhdml0eVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkdyYXZpdHlcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQoMCwgZywgbGlmZSwgZWFzaW5nKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayBhZnRlciBjb2xsaXNpb25cbiAgICpcbiAgICogQGNhbGxiYWNrIENhbGxiYWNrXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJpdGNsZX0gb3RoZXJQYXJ0aWNsZVxuICAgKi9cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xsaXNpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIHRvIG1hc3NcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gXHRbZW1pdHRlcj1udWxsXSBcdFx0dGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBcdFx0W21hc3M9dHJ1ZV1cbiAgICogQHBhcmFtIHtDYWxsYmFja31cdCBcdFtjYWxsYmFjaz1udWxsXVx0XHR0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIGNvbGxpc2lvblxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMucmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2spO1xuICAgIHRoaXMubmV3UG9vbCA9IFtdO1xuICAgIHRoaXMucG9vbCA9IFtdO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sbGlzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gVXRpbC5pbml0VmFsdWUoZW1pdHRlciwgbnVsbCk7XG4gICAgdGhpcy5tYXNzID0gVXRpbC5pbml0VmFsdWUobWFzcywgdHJ1ZSk7XG4gICAgdGhpcy5jYWxsYmFjayA9IFV0aWwuaW5pdFZhbHVlKGNhbGxiYWNrLCBudWxsKTtcblxuICAgIHRoaXMuY29sbGlzaW9uUG9vbCA9IFtdO1xuICAgIHRoaXMuZGVsdGEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuZW1pdHRlcikge1xuICAgICAgVXRpbC5zbGljZUFycmF5KHRoaXMuZW1pdHRlci5wYXJ0aWNsZXMsIGluZGV4LCB0aGlzLm5ld1Bvb2wpO1xuICAgIH0gZWxzZSB7XG4gICAgICBVdGlsLnNsaWNlQXJyYXkodGhpcy5wb29sLCBpbmRleCwgdGhpcy5uZXdQb29sKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLm5ld1Bvb2wubGVuZ3RoO1xuICAgIGxldCBvdGhlclBhcnRpY2xlO1xuICAgIGxldCBsZW5ndGhTcTtcbiAgICBsZXQgb3ZlcmxhcDtcbiAgICBsZXQgdG90YWxNYXNzO1xuICAgIGxldCBhdmVyYWdlTWFzczEsIGF2ZXJhZ2VNYXNzMjtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgb3RoZXJQYXJ0aWNsZSA9IHRoaXMubmV3UG9vbFtpXTtcblxuICAgICAgaWYgKG90aGVyUGFydGljbGUgIT09IHBhcnRpY2xlKSB7XG4gICAgICAgIHRoaXMuZGVsdGEuY29weShvdGhlclBhcnRpY2xlLnApO1xuICAgICAgICB0aGlzLmRlbHRhLnN1YihwYXJ0aWNsZS5wKTtcblxuICAgICAgICBsZW5ndGhTcSA9IHRoaXMuZGVsdGEubGVuZ3RoU3EoKTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBwYXJ0aWNsZS5yYWRpdXMgKyBvdGhlclBhcnRpY2xlLnJhZGl1cztcblxuICAgICAgICBpZiAobGVuZ3RoU3EgPD0gZGlzdGFuY2UgKiBkaXN0YW5jZSkge1xuICAgICAgICAgIG92ZXJsYXAgPSBkaXN0YW5jZSAtIE1hdGguc3FydChsZW5ndGhTcSk7XG4gICAgICAgICAgb3ZlcmxhcCArPSAwLjU7XG5cbiAgICAgICAgICB0b3RhbE1hc3MgPSBwYXJ0aWNsZS5tYXNzICsgb3RoZXJQYXJ0aWNsZS5tYXNzO1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMSA9IHRoaXMubWFzcyA/IG90aGVyUGFydGljbGUubWFzcyAvIHRvdGFsTWFzcyA6IDAuNTtcbiAgICAgICAgICBhdmVyYWdlTWFzczIgPSB0aGlzLm1hc3MgPyBwYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuXG4gICAgICAgICAgcGFydGljbGUucC5hZGQoXG4gICAgICAgICAgICB0aGlzLmRlbHRhXG4gICAgICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIC1hdmVyYWdlTWFzczEpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBvdGhlclBhcnRpY2xlLnAuYWRkKHRoaXMuZGVsdGEubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIGF2ZXJhZ2VNYXNzMikpO1xuXG4gICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHBhcnRpY2xlLCBvdGhlclBhcnRpY2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3NzWm9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIGNvbWUgdG8gdGhlIGVuZCBvZiB0aGUgc3BlY2lmaWVkIHpvbmVcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNyb3NzWm9uZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdFx0XHR3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBwYXNzIHRoZSB6b25lIC0gYWxsb3dlZCBzdHJpbmdzOiBkZWFkIHwgYm91bmQgfCBjcm9zc1xuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoem9uZSwgY3Jvc3NUeXBlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNyb3NzWm9uZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uWm9uZX0gem9uZSBcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy56b25lID0gem9uZTtcbiAgICB0aGlzLnpvbmUuY3Jvc3NUeXBlID0gVXRpbC5pbml0VmFsdWUoY3Jvc3NUeXBlLCBcImRlYWRcIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHRoaXMuem9uZS5jcm9zc2luZyhwYXJ0aWNsZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHBoYSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQWxwaGFcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQWxwaGFcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BbHBoYVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5ldyBhbHBoYSB2YWx1ZSBvZiB0aGUgcGFydGljbGVcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGUgQSBzaW5nbGUgUHJvdG9uIGdlbmVyYXRlZCBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEuYWxwaGFBID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHBhcnRpY2xlLmRhdGEuYWxwaGFBO1xuICAgIGVsc2UgcGFydGljbGUuZGF0YS5hbHBoYUIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHBhcnRpY2xlLmFscGhhID0gcGFydGljbGUuZGF0YS5hbHBoYUIgKyAocGFydGljbGUuZGF0YS5hbHBoYUEgLSBwYXJ0aWNsZS5kYXRhLmFscGhhQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5hbHBoYSA8IDAuMDAxKSBwYXJ0aWNsZS5hbHBoYSA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2FsZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScgYW5kICdiJ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiU2NhbGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5TY2FsZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5zY2FsZUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQiA9IHRoaXMuc2FtZSA/IHBhcnRpY2xlLmRhdGEuc2NhbGVBIDogdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcbiAgICBwYXJ0aWNsZS5zY2FsZSA9IHBhcnRpY2xlLmRhdGEuc2NhbGVCICsgKHBhcnRpY2xlLmRhdGEuc2NhbGVBIC0gcGFydGljbGUuZGF0YS5zY2FsZUIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICBpZiAocGFydGljbGUuc2NhbGUgPCAwLjAwMDEpIHBhcnRpY2xlLnNjYWxlID0gMDtcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyAqIHBhcnRpY2xlLnNjYWxlO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Sb3RhdGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScsICdiJyBhbmQgJ3N0eWxlJ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2luZmx1ZW5jZT1WZWxvY2l0eV0gVGhlIHJvdGF0aW9uJ3MgaW5mbHVlbmNlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbc3R5bGU9dG9dXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5mbHVlbmNlLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoaW5mbHVlbmNlLCBiLCBzdHlsZSk7XG4gICAgdGhpcy5uYW1lID0gXCJSb3RhdGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2EnLCAnYicgYW5kICdzdHlsZSdcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHlsZT10b11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIFwiVmVsb2NpdHlcIikpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGIsIDApKTtcbiAgICB0aGlzLnN0eWxlID0gVXRpbC5pbml0VmFsdWUoc3R5bGUsIFwidG9cIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25BID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoIXRoaXMuc2FtZSkgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUm90YXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGlmICghdGhpcy5zYW1lKSB7XG4gICAgICBpZiAodGhpcy5zdHlsZSA9PT0gXCJ0b1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiVE9cIiB8fCB0aGlzLnN0eWxlID09PSBcIl9cIikge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPVxuICAgICAgICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25CICsgKHBhcnRpY2xlLmRhdGEucm90YXRpb25BIC0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkIpICogdGhpcy5lbmVyZ3k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuYS5hID09PSBcIlZcIiB8fCB0aGlzLmEuYSA9PT0gXCJWZWxvY2l0eVwiIHx8IHRoaXMuYS5hID09PSBcInZcIikge1xuICAgICAgLy8gYmV0YS4uLlxuICAgICAgcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZS5nZXREaXJlY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xvclxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGEgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGIgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNvbG9yXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihhKTtcbiAgICB0aGlzLmIgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGIpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuY29sb3IgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmNvbG9yQSA9IENvbG9yVXRpbC5oZXhUb1JnYihwYXJ0aWNsZS5jb2xvcik7XG5cbiAgICBpZiAodGhpcy5iKSBwYXJ0aWNsZS5kYXRhLmNvbG9yQiA9IENvbG9yVXRpbC5oZXhUb1JnYih0aGlzLmIuZ2V0VmFsdWUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGlmICh0aGlzLmIpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckIuciArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yIC0gcGFydGljbGUuZGF0YS5jb2xvckIucikgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckIuZyArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nIC0gcGFydGljbGUuZGF0YS5jb2xvckIuZykgKiB0aGlzLmVuZXJneTtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckIuYiArIChwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iIC0gcGFydGljbGUuZGF0YS5jb2xvckIuYikgKiB0aGlzLmVuZXJneTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5yZ2IuciA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5yZ2IuZyA8PCAwO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5yZ2IuYiA8PCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLnI7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmc7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JBLmI7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuY29uc3QgQ0hBTkdJTkcgPSBcImNoYW5naW5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN5Y2xvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkN5Y2xvbmVcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDeWNsb25lXCI7XG4gIH1cblxuICBzZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuXG4gICAgaWYgKGFuZ2xlID09PSBcInJpZ2h0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSAtTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInJhbmRvbVwiO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJzcGFuXCI7XG4gICAgICB0aGlzLnNwYW4gPSBhbmdsZTtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5naW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiYXV0b1wiXG4gICAgKSB7XG4gICAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgfSBlbHNlIGlmIChmb3JjZSkge1xuICAgICAgdGhpcy5mb3JjZSA9IGZvcmNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSBNYXRoVXRpbC5yYW5kb21BVG9CKC1NYXRoVXRpbC5QSSwgTWF0aFV0aWwuUEkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gdGhpcy5zcGFuLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5DeWNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBsZXQgbGVuZ3RoO1xuICAgIGxldCBncmFkaWVudCA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBpZiAodGhpcy5hbmdsZSA9PT0gXCJyYW5kb21cIiB8fCB0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgZ3JhZGllbnQgKz0gcGFydGljbGUuZGF0YS5jYW5nbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyYWRpZW50ICs9IHRoaXMuYW5nbGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9yY2UgPT09IENIQU5HSU5HKSB7XG4gICAgICBsZW5ndGggPSBwYXJ0aWNsZS52Lmxlbmd0aCgpIC8gMTAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0aGlzLmZvcmNlO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS54ID0gbGVuZ3RoICogTWF0aC5jb3MoZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZS55ID0gbGVuZ3RoICogTWF0aC5zaW4oZ3JhZGllbnQpO1xuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IHRoaXMubm9ybWFsaXplRm9yY2UocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgICBwYXJ0aWNsZS5hLmFkZChwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICB9XG59XG4iLCJpbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9BdHRyYWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcHVsc2lvbiBleHRlbmRzIEF0dHJhY3Rpb24ge1xuICAvKipcbiAgICogVGhlIG9wcGlzaXRlIG9mIFByb3Rvbi5BdHRyYWN0aW9uIC0gdHVybnMgdGhlIGZvcmNlXG4gICAqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlJlcHVsc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcbiAgICB0aGlzLm5hbWUgPSBcIlJlcHVsc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJlcHVsc2lvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eVdlbGwgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBHcmF2aXR5V2VsbFxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbY2VudGVyUG9pbnQ9bmV3IFZlY3RvcjJEXSBUaGUgcG9pbnQgaW4gdGhlIGNlbnRlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cdFx0XHRcdFx0VGhlIGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV1cdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5V2VsbFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jR3Jhdml0eVdlbGxcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoY2VudGVyUG9pbnQsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbmhlcml0ZG9jXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMuc2V0KHRoaXMuY2VudGVyUG9pbnQueCAtIHBhcnRpY2xlLnAueCwgdGhpcy5jZW50ZXJQb2ludC55IC0gcGFydGljbGUucC55KTtcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKGRpc3RhbmNlU3EgIT09IDApIHtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGgoKTtcbiAgICAgIGNvbnN0IGZhY3RvciA9ICh0aGlzLmZvcmNlICogdGltZSkgLyAoZGlzdGFuY2VTcSAqIGRpc3RhbmNlKTtcblxuICAgICAgcGFydGljbGUudi54ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueDtcbiAgICAgIHBhcnRpY2xlLnYueSArPSBmYWN0b3IgKiB0aGlzLmRpc3RhbmNlVmVjLnk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0aWFsaXplKGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplcykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGluaXRpYWxpemVzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGluaXRpYWxpemVzW2ldIGluc3RhbmNlb2YgSW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplc1tpXS5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpO1xuICB9LFxuXG4gIC8vIGluaXRcbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZSkge1xuICAgIFByb3BVdGlsLnNldFByb3AocGFydGljbGUsIGluaXRpYWxpemUpO1xuICAgIFByb3BVdGlsLnNldFZlY3RvclZhbChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gIH0sXG5cbiAgYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAoZW1pdHRlci5iaW5kRW1pdHRlcikge1xuICAgICAgcGFydGljbGUucC5hZGQoZW1pdHRlci5wKTtcbiAgICAgIHBhcnRpY2xlLnYuYWRkKGVtaXR0ZXIudik7XG4gICAgICBwYXJ0aWNsZS5hLmFkZChlbWl0dGVyLmEpO1xuICAgICAgcGFydGljbGUudi5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKGVtaXR0ZXIucm90YXRpb24pKTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZVV0aWwgZnJvbSBcIi4uL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlciBleHRlbmRzIFBhcnRpY2xlIHtcbiAgLyoqXG4gICAqIFlvdSBjYW4gdXNlIHRoaXMgZW1pdCBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEl0IHdpbGwgZGlzcGF0Y2ggZm9sbG93IGV2ZW50czpcbiAgICogUEFSVElDTEVfQ1JFQVRFRFxuICAgKiBQQVJUSUNMRV9VUERBVEFcbiAgICogUEFSVElDTEVfREVBRFxuICAgKlxuICAgKiBAY2xhc3MgRW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7ZGFtcGluZzowLjAxLGJpbmRFbWl0dGVyOmZhbHNlfVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZiA9IHt9KSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuICAgIHRoaXMuaW5pdGlhbGl6ZXMgPSBbXTtcblxuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuZW1pdFNwZWVkID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyaWN0aW9uIGNvZWZmaWNpZW50IGZvciBhbGwgcGFydGljbGUgZW1pdCBieSBUaGlzO1xuICAgICAqIEBwcm9wZXJ0eSBkYW1waW5nXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwLjAwNlxuICAgICAqL1xuICAgIHRoaXMuZGFtcGluZyA9IDAuMDA2O1xuXG4gICAgLyoqXG4gICAgICogSWYgYmluZEVtaXR0ZXIgdGhlIHBhcnRpY2xlcyBjYW4gYmluZCB0aGlzIGVtaXR0ZXIncyBwcm9wZXJ0eTtcbiAgICAgKiBAcHJvcGVydHkgYmluZEVtaXR0ZXJcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgdGhpcy5iaW5kRW1pdHRlciA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXQgKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAgICogQHByb3BlcnR5IHJhdGVcbiAgICAgKiBAdHlwZSB7UmF0ZX1cbiAgICAgKiBAZGVmYXVsdCBSYXRlKDEsIC4xKVxuICAgICAqL1xuICAgIHRoaXMucmF0ZSA9IG5ldyBSYXRlKDEsIDAuMSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkVtaXR0ZXJcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbWl0VGltZSBiZWdpbiBlbWl0IHRpbWU7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsaWZlIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlclxuICAgKi9cbiAgZW1pdCh0b3RhbFRpbWUsIGxpZmUpIHtcbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gVXRpbC5pbml0VmFsdWUodG90YWxUaW1lLCBJbmZpbml0eSk7XG5cbiAgICBpZiAobGlmZSA9PT0gdHJ1ZSB8fCBsaWZlID09PSBcImxpZmVcIiB8fCBsaWZlID09PSBcImRlc3Ryb3lcIikge1xuICAgICAgdGhpcy5saWZlID0gdG90YWxUaW1lID09PSBcIm9uY2VcIiA/IDEgOiB0aGlzLnRvdGFsVGltZTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihsaWZlKSkge1xuICAgICAgdGhpcy5saWZlID0gbGlmZTtcbiAgICB9XG5cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJvbmNlXCIpIHtcbiAgICAgIGxldCBpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB0aGlzLnRvdGFsVGltZSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXRUaW1lICs9IHRpbWU7XG5cbiAgICAgIGlmICh0aGlzLmVtaXRUaW1lIDwgdGhpcy50b3RhbFRpbWUpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgc2luZ2xlIHBhcnRpY2xlO1xuICAgKlxuICAgKiBjYW4gdXNlIGVtaXQoe3g6MTB9LG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KSBvciBlbWl0KFt7eDoxMH0sbmV3IEluaXRpYWxpemVdLG5ldyBHcmF2aXR5KDEwKSx7J3BhcnRpY2xlVXBkYXRlJyxmdW59KVxuICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhcnRpY2xlc1xuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGxldCBpbml0aWFsaXplcyA9IHRoaXMuaW5pdGlhbGl6ZXM7XG4gICAgbGV0IGJlaGF2aW91cnMgPSB0aGlzLmJlaGF2aW91cnM7XG5cbiAgICBpZiAoaW5pdGlhbGl6ZSkgaW5pdGlhbGl6ZXMgPSBVdGlsLnRvQXJyYXkoaW5pdGlhbGl6ZSk7XG4gICAgaWYgKGJlaGF2aW91cikgYmVoYXZpb3VycyA9IFV0aWwudG9BcnJheShiZWhhdmlvdXIpO1xuXG4gICAgcGFydGljbGUucmVzZXQoKTtcbiAgICBJbml0aWFsaXplVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcyk7XG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucGFydGljbGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcblxuICAgIHRoaXMucmF0ZSA9IG51bGw7XG4gICAgdGhpcy5vbGQgPSBudWxsO1xuICAgIHRoaXMucmdiID0gbnVsbDtcbiAgICB0aGlzLnYgPSBudWxsO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdGhpcy5wID0gbnVsbDtcbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChFbWl0dGVyKTtcbiIsImltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyRW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEJlaGF2aW91ckVtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEJlaGF2aW91ckVtaXR0ZXIgeW91IGNhbiBhZGQgYmVoYXZpb3VycyB0byBzZWxmO1xuICAgKiBAY2xhc3MgUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMuc2VsZkJlaGF2aW91cnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIEJlaGF2aW91ciB0byBlbWl0dGVyO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IFByb3Rvbi5Db2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZFNlbGZCZWhhdmlvdXIoLi4ucmVzdCkge1xuICAgIGxldCBpLFxuICAgICAgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXIgZm9yIHNlbGZcbiAgICogQG1ldGhvZCByZW1vdmVTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVTZWxmQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuc2VsZkJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgc3VwZXIudXBkYXRlKHRpbWUpO1xuXG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmxlbmd0aDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxmQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd0VtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBGb2xsb3dFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBGb2xsb3dFbWl0dGVyIHdpbGwgZW1pdCBwYXJ0aWNsZSB3aGVuIG1vdXNlbW92aW5nXG4gICAqXG4gICAqIEBjbGFzcyBQcm90b24uRm9sbG93RW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtFbGVtZW50fSBtb3VzZVRhcmdldCBtb3VzZWV2ZW50J3MgdGFyZ2V0O1xuICAgKiBAcGFyYW0ge051bWJlcn0gZWFzZSB0aGUgZWFzaW5nIG9mIGZvbGxvd2luZyBzcGVlZDtcbiAgICogQGRlZmF1bHQgMC43XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1vdXNlVGFyZ2V0LCBlYXNlLCBjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcblxuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlbW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZWRvd24uY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNldXBIYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNldXAuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZW1vdmUoZSkge1xuICAgIGlmIChlLmxheWVyWCB8fCBlLmxheWVyWCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUubGF5ZXJYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH0gZWxzZSBpZiAoZS5vZmZzZXRYIHx8IGUub2Zmc2V0WCA9PT0gMCkge1xuICAgICAgdGhpcy5wLnggKz0gKGUub2Zmc2V0WCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLm9mZnNldFkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoXCJvbmNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHBpY3R1cmUgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc0ltYWdlKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5fX2lzSW1hZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIG9iai5fX2lzSW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCBpcyBhIHN0cmluZyBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICB9XG59O1xuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4uL2NvcmUvUG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jaXJjbGVDb25mID0geyBpc0NpcmNsZTogdHJ1ZSB9O1xuXG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5uYW1lID0gXCJCYXNlUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFN0cm9rZShjb2xvciA9IFwiIzAwMDAwMFwiLCB0aGlua25lc3MgPSAxKSB7XG4gICAgdGhpcy5zdHJva2UgPSB7IGNvbG9yLCB0aGlua25lc3MgfTtcbiAgfVxuXG4gIGluaXRFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZUFmdGVyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyQWRkZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlclJlbW92ZWQuY2FsbCh0aGlzLCBlbWl0dGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlciA9IHBhcnRpY2xlID0+IHtcbiAgICAgIHRoaXMub25QYXJ0aWNsZURlYWQuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwcm90b247XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMucG9vbCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cblxuICByZW1vdmUocHJvdG9uKSB7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVcIiwgdGhpcy5fcHJvdG9uVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX1JFTU9WRURcIiwgdGhpcy5fZW1pdHRlclJlbW92ZWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfREVBRFwiLCB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyKTtcblxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHt9XG5cbiAgb25FbWl0dGVyQWRkZWQoZW1pdHRlcikge31cbiAgb25FbWl0dGVyUmVtb3ZlZChlbWl0dGVyKSB7fVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fVxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0ltYWdlIG1ldGhvZFxuICBkcmF3SW1hZ2UocGFydGljbGUpIHtcbiAgICBjb25zdCB3ID0gKHBhcnRpY2xlLmJvZHkud2lkdGggKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IGggPSAocGFydGljbGUuYm9keS5oZWlnaHQgKiBwYXJ0aWNsZS5zY2FsZSkgfCAwO1xuICAgIGNvbnN0IHggPSBwYXJ0aWNsZS5wLnggLSB3IC8gMjtcbiAgICBjb25zdCB5ID0gcGFydGljbGUucC55IC0gaCAvIDI7XG5cbiAgICBpZiAoISFwYXJ0aWNsZS5jb2xvcikge1xuICAgICAgaWYgKCFwYXJ0aWNsZS5kYXRhW1wiYnVmZmVyXCJdKSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgICBjb25zdCBidWZDb250ZXh0ID0gcGFydGljbGUuZGF0YS5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgYnVmQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBidWZDb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwKTtcblxuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICBidWZDb250ZXh0LmZpbGxTdHlsZSA9IENvbG9yVXRpbC5yZ2JUb0hleChwYXJ0aWNsZS5yZ2IpO1xuICAgICAgYnVmQ29udGV4dC5maWxsUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0LFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3LFxuICAgICAgICBoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0ocGFydGljbGUucm90YXRpb24pKTtcbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoLXBhcnRpY2xlLnAueCwgLXBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDAsIHBhcnRpY2xlLmJvZHkud2lkdGgsIHBhcnRpY2xlLmJvZHkuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZSBkcmF3Q2lyY2xlIC0tXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY2lyY2xlXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZS50aGlua25lc3M7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICAvLyBwcml2YXRlIGNyZWF0ZUJ1ZmZlclxuICBjcmVhdGVCdWZmZXIoaW1hZ2UpIHtcbiAgICBpZiAoVHlwZXMuaXNJbWFnZShpbWFnZSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBpbWFnZS53aWR0aCArIFwiX1wiICsgaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV07XG5cbiAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdID0gY2FudmFzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtM2QgPSBmYWxzZTtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRvbVJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zZCkge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybTNkKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0ocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUub3BhY2l0eSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgICBpZiAocGFydGljbGUuYm9keS5pc0NpcmNsZSkge1xuICAgICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGJvZHlSZWFkeShwYXJ0aWNsZSkge1xuICAgIHJldHVybiB0eXBlb2YgcGFydGljbGUuYm9keSA9PT0gXCJvYmplY3RcIiAmJiBwYXJ0aWNsZS5ib2R5ICYmICFwYXJ0aWNsZS5ib2R5LmlzSW5uZXI7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZFxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChpbWcsIHBhcnRpY2xlKTtcbiAgICBEb21VdGlsLnJlc2l6ZShwYXJ0aWNsZS5ib2R5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIDIgKiBwYXJ0aWNsZS5yYWRpdXMsIDIgKiBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHtwYXJ0aWNsZS5yYWRpdXN9cHhgO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJXaWR0aCA9IGAke3RoaXMuc3Ryb2tlLnRoaW5rbmVzc31weGA7XG4gICAgfVxuICAgIGRvbS5pc0NpcmNsZSA9IHRydWU7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdXJsID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIgPyBib2R5IDogYm9keS5zcmM7XG4gICAgY29uc3QgZG9tID0gRG9tVXRpbC5jcmVhdGVEaXYoYCR7cGFydGljbGUuaWR9X2RvbWAsIGJvZHkud2lkdGgsIGJvZHkuaGVpZ2h0KTtcbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3VybH0pYDtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc2VsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMubmFtZSA9IFwiRWFzZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgdGhpcy5jcmVhdGVTcHJpdGUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHBhcnRpY2xlLmJvZHkuc2NhbGVYID0gcGFydGljbGUuYm9keS5zY2FsZVkgPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICAgIHBhcnRpY2xlLmJvZHkucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnBhcmVudCAmJiBwYXJ0aWNsZS5ib2R5LnBhcmVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUuZ3JhcGhpY3MpIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuZ3JhcGhpY3MpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBjcmVhdGVTcHJpdGUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5LnBhcmVudCkgcmV0dXJuO1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5W1wiaW1hZ2VcIl0pIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWCA9IHBhcnRpY2xlLmJvZHkuaW1hZ2Uud2lkdGggLyAyO1xuICAgICAgcGFydGljbGUuYm9keS5yZWdZID0gcGFydGljbGUuYm9keS5pbWFnZS5oZWlnaHQgLyAyO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gdGhpcy5wb29sLmdldChjcmVhdGVqcy5HcmFwaGljcyk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkpIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UodGhpcy5zdHJva2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UoXCIjMDAwMDAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCIpLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMucG9vbC5nZXQoY3JlYXRlanMuU2hhcGUsIFtncmFwaGljc10pO1xuXG4gICAgcGFydGljbGUuYm9keSA9IHNoYXBlO1xuICAgIHBhcnRpY2xlLmdyYXBoaWNzID0gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgcmVjdGFuZ2xlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLmNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhlbFJlbmRlcmVyXCI7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBjcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGUgPyByZWN0YW5nbGUgOiBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCh0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55LCB0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICB0aGlzLnJlY3RhbmdsZS54LFxuICAgICAgdGhpcy5yZWN0YW5nbGUueSxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLndpZHRoLFxuICAgICAgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhKSB7XG4gICAgICB0aGlzLnNldFBpeGVsKFxuICAgICAgICB0aGlzLmltYWdlRGF0YSxcbiAgICAgICAgKHBhcnRpY2xlLnAueCAtIHRoaXMucmVjdGFuZ2xlLngpID4+IDAsXG4gICAgICAgIChwYXJ0aWNsZS5wLnkgLSB0aGlzLnJlY3RhbmdsZS55KSA+PiAwLFxuICAgICAgICBwYXJ0aWNsZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQaXhlbChpbWFnZWRhdGEsIHgsIHksIHBhcnRpY2xlKSB7XG4gICAgY29uc3QgcmdiID0gcGFydGljbGUucmdiO1xuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5lbGVtZW50LndpZHRoIHx8IHkgPCAwIHx8IHkgPiB0aGlzLmVsZW1lbnR3aWR0aCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIGltYWdlZGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaV0gPSByZ2IucjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMV0gPSByZ2IuZztcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMl0gPSByZ2IuYjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgM10gPSBwYXJ0aWNsZS5hbHBoYSAqIDI1NTtcbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5sZXQgUElYSUNsYXNzO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4aVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLmNvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuYmxlbmRNb2RlID0gbnVsbDtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuc2V0UElYSSh3aW5kb3cuUElYSSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGlSZW5kZXJlclwiO1xuICB9XG5cbiAgc2V0UElYSShQSVhJKSB7XG4gICAgdHJ5IHtcbiAgICAgIFBJWElDbGFzcyA9IFBJWEkgfHwgeyBTcHJpdGU6IHt9IH07XG4gICAgICB0aGlzLmNyZWF0ZUZyb21JbWFnZSA9IFBJWElDbGFzcy5TcHJpdGUuZnJvbSB8fCBQSVhJQ2xhc3MuU3ByaXRlLmZyb21JbWFnZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICB0aGlzLnRyYW5zZm9ybShwYXJ0aWNsZSwgcGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAodGhpcy5zZXRDb2xvciA9PT0gdHJ1ZSB8fCB0aGlzLmNvbG9yID09PSB0cnVlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnRpbnQgPSBDb2xvclV0aWwuZ2V0SGV4MTZGcm9tUGFydGljbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICB0cmFuc2Zvcm0ocGFydGljbGUsIHRhcmdldCkge1xuICAgIHRhcmdldC54ID0gcGFydGljbGUucC54O1xuICAgIHRhcmdldC55ID0gcGFydGljbGUucC55O1xuXG4gICAgdGFyZ2V0LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0YXJnZXQuc2NhbGUueCA9IHBhcnRpY2xlLnNjYWxlO1xuICAgIHRhcmdldC5zY2FsZS55ID0gcGFydGljbGUuc2NhbGU7XG5cbiAgICAvLyB1c2luZyBjYWNoZWQgdmVyc2lvbiBvZiBNYXRoVXRpbC5QSV8xODAgZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZS5cbiAgICB0YXJnZXQucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDsgLy8gTWF0aFV0aWwuUElfMTgwO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHkpO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHkpIHtcbiAgICBjb25zdCBzcHJpdGUgPSBib2R5LmlzSW5uZXIgPyB0aGlzLmNyZWF0ZUZyb21JbWFnZShib2R5LnNyYykgOiBuZXcgUElYSUNsYXNzLlNwcml0ZShib2R5KTtcblxuICAgIHNwcml0ZS5hbmNob3IueCA9IDAuNTtcbiAgICBzcHJpdGUuYW5jaG9yLnkgPSAwLjU7XG5cbiAgICByZXR1cm4gc3ByaXRlO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSUNsYXNzLkdyYXBoaWNzKCk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGNvbnN0IHN0cm9rZSA9IFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSA/IHRoaXMuc3Ryb2tlIDogMHgwMDAwMDA7XG4gICAgICBncmFwaGljcy5iZWdpblN0cm9rZShzdHJva2UpO1xuICAgIH1cblxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCAweDAwOGNlZCk7XG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcblxuICAgIHJldHVybiBncmFwaGljcztcbiAgfVxuXG4gIGRlc3Ryb3kocGFydGljbGVzKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgbGV0IGkgPSBwYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXTtcbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTVN0YWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXRzID0gW107XG4gICAgdGhpcy5zaXplID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykgdGhpcy5tYXRzLnB1c2goTWF0My5jcmVhdGUoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XG4gIH1cblxuICBzZXQobSwgaSkge1xuICAgIGlmIChpID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbaSAtIDFdLCBtLCB0aGlzLm1hdHNbaV0pO1xuXG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgodGhpcy5zaXplLCBpICsgMSk7XG4gIH1cblxuICBwdXNoKG0pIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV0sIG0sIHRoaXMubWF0c1t0aGlzLnNpemVdKTtcblxuICAgIHRoaXMuc2l6ZSsrO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIGlmICh0aGlzLnNpemUgPiAwKSB0aGlzLnNpemUtLTtcbiAgfVxuXG4gIHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBNU3RhY2sgZnJvbSBcIi4uL3V0aWxzL01TdGFja1wiO1xuaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4uL3V0aWxzL1dlYkdMVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLmdsID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgeyBhbnRpYWxpYXM6IHRydWUsIHN0ZW5jaWw6IGZhbHNlLCBkZXB0aDogZmFsc2UgfSk7XG4gICAgaWYgKCF0aGlzLmdsKSBhbGVydChcIlNvcnJ5IHlvdXIgYnJvd3NlciBkbyBub3Qgc3VwcGVzdCBXZWJHTCFcIik7XG5cbiAgICB0aGlzLmluaXRWYXIoKTtcbiAgICB0aGlzLnNldE1heFJhZGl1cygpO1xuICAgIHRoaXMuaW5pdFNoYWRlcnMoKTtcbiAgICB0aGlzLmluaXRCdWZmZXJzKCk7XG5cbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbC5GVU5DX0FERCk7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiV2ViR0xSZW5kZXJlclwiO1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICBzdXBlci5pbml0KHByb3Rvbik7XG4gICAgdGhpcy5yZXNpemUodGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy51bWF0WzRdID0gLTI7XG4gICAgdGhpcy51bWF0WzddID0gMTtcblxuICAgIHRoaXMuc21hdFswXSA9IDEgLyB3aWR0aDtcbiAgICB0aGlzLnNtYXRbNF0gPSAxIC8gaGVpZ2h0O1xuXG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMudW1hdCwgMCk7XG4gICAgdGhpcy5tc3RhY2suc2V0KHRoaXMuc21hdCwgMSk7XG5cbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRNYXhSYWRpdXMocmFkaXVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNVUkwgPSB0aGlzLmNyZWF0ZUNpcmNsZShyYWRpdXMpO1xuICB9XG5cbiAgZ2V0VmVydGV4U2hhZGVyKCkge1xuICAgIGNvbnN0IHZzU291cmNlID0gW1xuICAgICAgXCJ1bmlmb3JtIHZlYzIgdmlld3BvcnQ7XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidW5pZm9ybSBtYXQzIHRNYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzMgdiA9IHRNYXQgKiB2ZWMzKGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcIixcbiAgICAgIFwiZ2xfUG9zaXRpb24gPSB2ZWM0KHYueCwgdi55LCAwLCAxKTtcIixcbiAgICAgIFwidlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcImFscGhhID0gdE1hdFswXVsyXTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiB2c1NvdXJjZTtcbiAgfVxuXG4gIGdldEZyYWdtZW50U2hhZGVyKCkge1xuICAgIGNvbnN0IGZzU291cmNlID0gW1xuICAgICAgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzQgY29sb3I7XCIsXG4gICAgICBcInVuaWZvcm0gYm9vbCB1c2VUZXh0dXJlO1wiLFxuICAgICAgXCJ1bmlmb3JtIHZlYzMgdUNvbG9yO1wiLFxuICAgICAgXCJ2b2lkIG1haW4oKSB7XCIsXG4gICAgICBcInZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZUNvbG9yICogdmVjNCh1Q29sb3IsIDEuMCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvci53ICo9IGFscGhhO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIGZzU291cmNlO1xuICB9XG5cbiAgaW5pdFZhcigpIHtcbiAgICB0aGlzLm1zdGFjayA9IG5ldyBNU3RhY2soKTtcbiAgICB0aGlzLnVtYXQgPSBNYXQzLmNyZWF0ZShbMiwgMCwgMSwgMCwgLTIsIDAsIC0xLCAxLCAxXSk7XG4gICAgdGhpcy5zbWF0ID0gTWF0My5jcmVhdGUoWzEgLyAxMDAsIDAsIDEsIDAsIDEgLyAxMDAsIDAsIDAsIDAsIDFdKTtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0ge307XG4gIH1cblxuICBibGVuZEVxdWF0aW9uKEEpIHtcbiAgICB0aGlzLmdsLmJsZW5kRXF1YXRpb24odGhpcy5nbFtBXSk7XG4gIH1cblxuICBibGVuZEZ1bmMoQSwgQikge1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2xbQV0sIHRoaXMuZ2xbQl0pO1xuICB9XG5cbiAgZ2V0U2hhZGVyKGdsLCBzdHIsIGZzKSB7XG4gICAgY29uc3Qgc2hhZGVyID0gZnMgPyBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKSA6IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcblxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHN0cik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgaW5pdFNoYWRlcnMoKSB7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyKCksIHRydWUpO1xuICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0VmVydGV4U2hhZGVyKCksIGZhbHNlKTtcblxuICAgIHRoaXMuc3Byb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5zcHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIGFsZXJ0KFwiQ291bGQgbm90IGluaXRpYWxpc2Ugc2hhZGVyc1wiKTtcblxuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcbiAgICB0aGlzLnNwcm9ncmFtLnZwYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVmVydGV4UG9zaXRpb25cIik7XG4gICAgdGhpcy5zcHJvZ3JhbS50Y2EgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVRleHR1cmVDb29yZFwiKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udGNhKTtcbiAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3Byb2dyYW0udnBhKTtcblxuICAgIHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInRNYXRcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidVNhbXBsZXJcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS51c2VUZXggPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVzZVRleHR1cmVcIik7XG4gICAgdGhpcy5zcHJvZ3JhbS5jb2xvciA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidUNvbG9yXCIpO1xuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0udXNlVGV4LCAxKTtcbiAgfVxuXG4gIGluaXRCdWZmZXJzKCkge1xuICAgIGNvbnN0IHZzID0gWzAsIDMsIDEsIDAsIDIsIDNdO1xuICAgIGxldCBpZHg7XG5cbiAgICB0aGlzLnVuaXRJQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh2cyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgbGV0IGk7XG4gICAgbGV0IGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSk7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnVuaXRJMzMgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJMzMpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpLCBpICsgMSwgaSArIDIpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy5zdHJpcEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuc3RyaXBCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpZHgsIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHJhaWR1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzID0gV2ViR0xVdGlsLm5ocG90KFV0aWwuaW5pdFZhbHVlKHJhaWR1cywgMzIpKTtcbiAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhcImNpcmNsZV9jYW52YXNcIiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfVxuXG4gIGRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgX3cgPSBwYXJ0aWNsZS5ib2R5LndpZHRoO1xuICAgIGNvbnN0IF9oID0gcGFydGljbGUuYm9keS5oZWlnaHQ7XG5cbiAgICBjb25zdCBfd2lkdGggPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS53aWR0aCk7XG4gICAgY29uc3QgX2hlaWdodCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LmhlaWdodCk7XG5cbiAgICBjb25zdCBfc2NhbGVYID0gcGFydGljbGUuYm9keS53aWR0aCAvIF93aWR0aDtcbiAgICBjb25zdCBfc2NhbGVZID0gcGFydGljbGUuYm9keS5oZWlnaHQgLyBfaGVpZ2h0O1xuXG4gICAgaWYgKCF0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSlcbiAgICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdID0gW1xuICAgICAgICB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVCdWZmZXIoKVxuICAgICAgXTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZSA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzBdO1xuICAgIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsxXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMl07XG5cbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF9zY2FsZVgsIDAuMCwgMC4wLCBfc2NhbGVZLCBfc2NhbGVZLCBfc2NhbGVZXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShcbiAgICAgIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjAsIF93LCAwLjAsIDAuMCwgX2gsIF93LCBfaF0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gcGFydGljbGUuZGF0YS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xuXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpO1xuICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKTtcblxuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IHRydWU7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggPSBfdztcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgPSBfaDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIC8vIHRoaXMuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAxKTtcbiAgICAvLyB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCA9IGZhbHNlO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS50bWF0WzhdID0gMTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdFs4XSA9IDE7XG5cbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZSh0aGlzLmNpcmNsZUNhbnZhc1VSTCwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IHBhcnRpY2xlLnJhZGl1cyAvIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IGltZztcbiAgICBwYXJ0aWNsZS5kYXRhLnNyYyA9IGltZy5zcmM7XG4gICAgcGFydGljbGUuZGF0YS5jYW52YXMgPSBJbWdVdGlsLmdldENhbnZhc0Zyb21DYWNoZShpbWcpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSAxO1xuXG4gICAgdGhpcy5kcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGV4dHVyZUxvYWRlZCkge1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgocGFydGljbGUpO1xuXG4gICAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNwcm9ncmFtLmNvbG9yLCBwYXJ0aWNsZS5yZ2IuciAvIDI1NSwgcGFydGljbGUucmdiLmcgLyAyNTUsIHBhcnRpY2xlLnJnYi5iIC8gMjU1KTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtLCBmYWxzZSwgdGhpcy5tc3RhY2sudG9wKCkpO1xuXG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudmNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udnBhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIpO1xuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc3Byb2dyYW0udGNhLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0sIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuXG4gICAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgNiwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICB0aGlzLm1zdGFjay5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICB1cGRhdGVNYXRyaXgocGFydGljbGUpIHtcbiAgICBjb25zdCBtb3ZlT3JpZ2luTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCAvIDIsXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcblxuICAgIGNvbnN0IGFuZ2VsID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7XG4gICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBXZWJHTFV0aWwubWFrZVJvdGF0aW9uKGFuZ2VsKTtcblxuICAgIGNvbnN0IHNjYWxlID0gcGFydGljbGUuc2NhbGUgKiBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlO1xuICAgIGNvbnN0IHNjYWxlTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgIGxldCBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobW92ZU9yaWdpbk1hdHJpeCwgc2NhbGVNYXRyaXgpO1xuXG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgcm90YXRpb25NYXRyaXgpO1xuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHRyYW5zbGF0aW9uTWF0cml4KTtcblxuICAgIE1hdDMuaW52ZXJzZShtYXRyaXgsIHBhcnRpY2xlLmRhdGEuaW1hdCk7XG4gICAgbWF0cml4WzJdID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0aGlzLm1zdGFjay5wdXNoKG1hdHJpeCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdsID0gbnVsbDtcbiAgICB0aGlzLm1zdGFjayA9IG51bGw7XG4gICAgdGhpcy51bWF0ID0gbnVsbDtcbiAgICB0aGlzLnNtYXQgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tUmVuZGVyZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZGlyZWN0aW9uKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh4MiAtIHgxID49IDApIHtcbiAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54MSA9IHgyO1xuICAgICAgdGhpcy55MSA9IHkyO1xuICAgICAgdGhpcy54MiA9IHgxO1xuICAgICAgdGhpcy55MiA9IHkxO1xuICAgIH1cblxuICAgIHRoaXMuZHggPSB0aGlzLngyIC0gdGhpcy54MTtcbiAgICB0aGlzLmR5ID0gdGhpcy55MiAtIHRoaXMueTE7XG5cbiAgICB0aGlzLm1pbnggPSBNYXRoLm1pbih0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1pbnkgPSBNYXRoLm1pbih0aGlzLnkxLCB0aGlzLnkyKTtcbiAgICB0aGlzLm1heHggPSBNYXRoLm1heCh0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1heHkgPSBNYXRoLm1heCh0aGlzLnkxLCB0aGlzLnkyKTtcblxuICAgIHRoaXMuZG90ID0gdGhpcy54MiAqIHRoaXMueTEgLSB0aGlzLngxICogdGhpcy55MjtcbiAgICB0aGlzLnh4eXkgPSB0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5O1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlsLmluaXRWYWx1ZShkaXJlY3Rpb24sIFwiPlwiKTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLmNvcyh0aGlzLmdyYWRpZW50KTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLnNpbih0aGlzLmdyYWRpZW50KTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQiA9PT0gMCA/IDEgOiBCO1xuXG4gICAgaWYgKChBICogeCArIEIgKiB5ICsgQykgKiBEID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXREaXN0YW5jZSh4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQSAqIHggKyBCICogeSArIEM7XG5cbiAgICByZXR1cm4gRCAvIE1hdGguc3FydCh0aGlzLnh4eXkpO1xuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHYpIHtcbiAgICBjb25zdCB0aGEyID0gdi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG5cbiAgICBjb25zdCBvbGR4ID0gdi54O1xuICAgIGNvbnN0IG9sZHkgPSB2Lnk7XG5cbiAgICB2LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMuZHksIHRoaXMuZHgpO1xuICB9XG5cbiAgcmFuZ2VPdXQocGFydGljbGUpIHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYWJzKHRoaXMuZ2V0R3JhZGllbnQoKSk7XG5cbiAgICBpZiAoYW5nbGUgPD0gTWF0aFV0aWwuUEkgLyA0KSB7XG4gICAgICBpZiAocGFydGljbGUucC54IDw9IHRoaXMubWF4eCAmJiBwYXJ0aWNsZS5wLnggPj0gdGhpcy5taW54KSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueSA8PSB0aGlzLm1heHkgJiYgcGFydGljbGUucC55ID49IHRoaXMubWlueSkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keSk7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCI+XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiUlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcblxuICAgICAgaWYgKHRoaXMuZ2V0RGlzdGFuY2UocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpIDw9IHBhcnRpY2xlLnJhZGl1cykge1xuICAgICAgICBpZiAodGhpcy5keCA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR5ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlLnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIExpbmVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLmNlbnRlciA9IHsgeCwgeSB9O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJeDIgKiBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMucmFuZG9tUmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyB0aGlzLnJhbmRvbVJhZGl1cyAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgc2V0Q2VudGVyKHgsIHkpIHtcbiAgICB0aGlzLmNlbnRlci54ID0geDtcbiAgICB0aGlzLmNlbnRlci55ID0geTtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZCA9IHBhcnRpY2xlLnAuZGlzdGFuY2VUbyh0aGlzLmNlbnRlcik7XG5cbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAoZCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMucmFkaXVzKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChkICsgcGFydGljbGUucmFkaXVzID49IHRoaXMucmFkaXVzKSB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29ycnksIENpcmNsZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3ltbWV0cmljKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdGhhMiA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudChwYXJ0aWNsZSk7XG5cbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcbiAgICBjb25zdCBvbGR4ID0gcGFydGljbGUudi54O1xuICAgIGNvbnN0IG9sZHkgPSBwYXJ0aWNsZS52Lnk7XG5cbiAgICBwYXJ0aWNsZS52LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHBhcnRpY2xlLnYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG4gIH1cblxuICBnZXRHcmFkaWVudChwYXJ0aWNsZSkge1xuICAgIHJldHVybiAtTWF0aFV0aWwuUElfMiArIE1hdGguYXRhbjIocGFydGljbGUucC55IC0gdGhpcy5jZW50ZXIueSwgcGFydGljbGUucC54IC0gdGhpcy5jZW50ZXIueCk7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIC8vIHBhcnRpY2xlIGRlYWQgem9uZVxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGJvdW5kIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBjcm9zcyB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCAmJiBwYXJ0aWNsZS52LnggPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoICYmIHBhcnRpY2xlLnYueCA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAmJiBwYXJ0aWNsZS52LnkgPD0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQgJiYgcGFydGljbGUudi55ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXNldChpbWFnZURhdGEsIHgsIHksIGQpO1xuICB9XG5cbiAgcmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBpbWFnZURhdGE7XG4gICAgdGhpcy54ID0gVXRpbC5pbml0VmFsdWUoeCwgMCk7XG4gICAgdGhpcy55ID0gVXRpbC5pbml0VmFsdWUoeSwgMCk7XG4gICAgdGhpcy5kID0gVXRpbC5pbml0VmFsdWUoZCwgMik7XG5cbiAgICB0aGlzLnZlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNldFZlY3RvcnMoKTtcbiAgfVxuXG4gIHNldFZlY3RvcnMoKSB7XG4gICAgbGV0IGksIGo7XG4gICAgY29uc3QgbGVuZ3RoMSA9IHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGxlbmd0aDIgPSB0aGlzLmltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSArPSB0aGlzLmQpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGgyOyBqICs9IHRoaXMuZCkge1xuICAgICAgICBsZXQgaW5kZXggPSAoKGogPj4gMCkgKiBsZW5ndGgxICsgKGkgPj4gMCkpICogNDtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkge1xuICAgICAgICAgIHRoaXMudmVjdG9ycy5wdXNoKHsgeDogaSArIHRoaXMueCwgeTogaiArIHRoaXMueSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIGdldEJvdW5kKHgsIHkpIHtcbiAgICBjb25zdCBpbmRleCA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB2ZWN0b3IgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy52ZWN0b3JzKTtcbiAgICByZXR1cm4gdGhpcy52ZWN0b3IuY29weSh2ZWN0b3IpO1xuICB9XG5cbiAgZ2V0Q29sb3IoeCwgeSkge1xuICAgIHggLT0gdGhpcy54O1xuICAgIHkgLT0gdGhpcy55O1xuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogdGhpcy5pbWFnZURhdGEuZGF0YVtpXSxcbiAgICAgIGc6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDFdLFxuICAgICAgYjogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMl0sXG4gICAgICBhOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAzXVxuICAgIH07XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmICh0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIHBhcnRpY2xlLmRlYWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLnYubmVnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4uL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi4vem9uZS9SZWN0Wm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCBmdW5jKSB7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsICgpID0+IGZ1bmMoKSk7XG4gIH0sXG5cbiAgZ2V0U3R5bGUoY29sb3IgPSBcIiNmZjAwMDBcIikge1xuICAgIGNvbnN0IHJnYiA9IENvbG9yVXRpbC5oZXhUb1JnYihjb2xvcik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cmdiLnJ9LCAke3JnYi5nfSwgJHtyZ2IuYn0sIDAuNSlgO1xuICB9LFxuXG4gIGRyYXdab25lKHByb3RvbiwgY2FudmFzLCB6b25lLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBpZiAoem9uZSBpbnN0YW5jZW9mIFBvaW50Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBMaW5lWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHpvbmUueDEsIHpvbmUueTEpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyh6b25lLngyLCB6b25lLnkyKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIFJlY3Rab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5kcmF3UmVjdCh6b25lLngsIHpvbmUueSwgem9uZS53aWR0aCwgem9uZS5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgQ2lyY2xlWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCB6b25lLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRyYXdFbWl0dGVyKHByb3RvbiwgY2FudmFzLCBlbWl0dGVyLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgIGNvbnRleHQuYXJjKGVtaXR0ZXIucC54LCBlbWl0dGVyLnAueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgUG9vbCBmcm9tIFwiLi9jb3JlL1Bvb2xcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4vbWF0aC9Qb2xhcjJEXCI7XG5pbXBvcnQgTWF0MyBmcm9tIFwiLi9tYXRoL01hdDNcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuL21hdGgvU3BhblwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4vbWF0aC9lYXNlXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTGlmZSBmcm9tIFwiLi9pbml0aWFsaXplL0xpZmVcIjtcbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi9pbml0aWFsaXplL1Bvc2l0aW9uXCI7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9WZWxvY2l0eVwiO1xuaW1wb3J0IE1hc3MgZnJvbSBcIi4vaW5pdGlhbGl6ZS9NYXNzXCI7XG5pbXBvcnQgUmFkaXVzIGZyb20gXCIuL2luaXRpYWxpemUvUmFkaXVzXCI7XG5pbXBvcnQgQm9keSBmcm9tIFwiLi9pbml0aWFsaXplL0JvZHlcIjtcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9iZWhhdmlvdXIvQmVoYXZpb3VyXCI7XG5pbXBvcnQgRm9yY2UgZnJvbSBcIi4vYmVoYXZpb3VyL0ZvcmNlXCI7XG5pbXBvcnQgQXR0cmFjdGlvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQXR0cmFjdGlvblwiO1xuaW1wb3J0IFJhbmRvbURyaWZ0IGZyb20gXCIuL2JlaGF2aW91ci9SYW5kb21EcmlmdFwiO1xuaW1wb3J0IEdyYXZpdHkgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlcIjtcbmltcG9ydCBDb2xsaXNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0NvbGxpc2lvblwiO1xuaW1wb3J0IENyb3NzWm9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3Jvc3Nab25lXCI7XG5pbXBvcnQgQWxwaGEgZnJvbSBcIi4vYmVoYXZpb3VyL0FscGhhXCI7XG5pbXBvcnQgU2NhbGUgZnJvbSBcIi4vYmVoYXZpb3VyL1NjYWxlXCI7XG5pbXBvcnQgUm90YXRlIGZyb20gXCIuL2JlaGF2aW91ci9Sb3RhdGVcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sb3JcIjtcbmltcG9ydCBDeWNsb25lIGZyb20gXCIuL2JlaGF2aW91ci9DeWNsb25lXCI7XG5pbXBvcnQgUmVwdWxzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9SZXB1bHNpb25cIjtcbmltcG9ydCBHcmF2aXR5V2VsbCBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVdlbGxcIjtcblxuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9FbWl0dGVyXCI7XG5pbXBvcnQgQmVoYXZpb3VyRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0JlaGF2aW91ckVtaXR0ZXJcIjtcbmltcG9ydCBGb2xsb3dFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRm9sbG93RW1pdHRlclwiO1xuXG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0NhbnZhc1JlbmRlcmVyXCI7XG5pbXBvcnQgRG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0RvbVJlbmRlcmVyXCI7XG5pbXBvcnQgRWFzZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRWFzZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGVsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGVsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhpUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1BpeGlSZW5kZXJlclwiO1xuaW1wb3J0IFdlYkdMUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL1dlYkdMUmVuZGVyZXJcIjtcbmltcG9ydCBDdXN0b21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ3VzdG9tUmVuZGVyZXJcIjtcblxuaW1wb3J0IFpvbmUgZnJvbSBcIi4vem9uZS9ab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4vem9uZS9SZWN0Wm9uZVwiO1xuaW1wb3J0IEltYWdlWm9uZSBmcm9tIFwiLi96b25lL0ltYWdlWm9uZVwiO1xuXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4vZGVidWcvRGVidWdcIjtcblxuLy8gbmFtZXNwYWNlXG5Qcm90b24uUGFydGljbGUgPSBQYXJ0aWNsZTtcblByb3Rvbi5Qb29sID0gUG9vbDtcblxuUHJvdG9uLlV0aWwgPSBVdGlsO1xuUHJvdG9uLkNvbG9yVXRpbCA9IENvbG9yVXRpbDtcblByb3Rvbi5NYXRoVXRpbCA9IE1hdGhVdGlsO1xuUHJvdG9uLlZlY3RvcjJEID0gUHJvdG9uLlZlY3RvciA9IFZlY3RvcjJEO1xuUHJvdG9uLlBvbGFyMkQgPSBQcm90b24uUG9sYXIgPSBQb2xhcjJEO1xuUHJvdG9uLkFycmF5U3BhbiA9IEFycmF5U3BhbjtcblByb3Rvbi5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG5Qcm90b24uUmF0ZSA9IFJhdGU7XG5Qcm90b24uZWFzZSA9IGVhc2U7XG5Qcm90b24uU3BhbiA9IFNwYW47XG5Qcm90b24uTWF0MyA9IE1hdDM7XG5Qcm90b24uZ2V0U3BhbiA9IChhLCBiLCBjZW50ZXIpID0+IG5ldyBTcGFuKGEsIGIsIGNlbnRlcik7XG5Qcm90b24uY3JlYXRlQXJyYXlTcGFuID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbjtcblxuUHJvdG9uLkluaXRpYWxpemUgPSBQcm90b24uSW5pdCA9IEluaXRpYWxpemU7XG5Qcm90b24uTGlmZSA9IFByb3Rvbi5MID0gTGlmZTtcblByb3Rvbi5Qb3NpdGlvbiA9IFByb3Rvbi5QID0gUG9zaXRpb247XG5Qcm90b24uVmVsb2NpdHkgPSBQcm90b24uViA9IFZlbG9jaXR5O1xuUHJvdG9uLk1hc3MgPSBQcm90b24uTSA9IE1hc3M7XG5Qcm90b24uUmFkaXVzID0gUHJvdG9uLlIgPSBSYWRpdXM7XG5Qcm90b24uQm9keSA9IFByb3Rvbi5CID0gQm9keTtcblxuUHJvdG9uLkJlaGF2aW91ciA9IEJlaGF2aW91cjtcblByb3Rvbi5Gb3JjZSA9IFByb3Rvbi5GID0gRm9yY2U7XG5Qcm90b24uQXR0cmFjdGlvbiA9IFByb3Rvbi5BID0gQXR0cmFjdGlvbjtcblByb3Rvbi5SYW5kb21EcmlmdCA9IFByb3Rvbi5SRCA9IFJhbmRvbURyaWZ0O1xuUHJvdG9uLkdyYXZpdHkgPSBQcm90b24uRyA9IEdyYXZpdHk7XG5Qcm90b24uQ29sbGlzaW9uID0gQ29sbGlzaW9uO1xuUHJvdG9uLkNyb3NzWm9uZSA9IENyb3NzWm9uZTtcblByb3Rvbi5BbHBoYSA9IEFscGhhO1xuUHJvdG9uLlNjYWxlID0gUHJvdG9uLlMgPSBTY2FsZTtcblByb3Rvbi5Sb3RhdGUgPSBSb3RhdGU7XG5Qcm90b24uQ29sb3IgPSBDb2xvcjtcblByb3Rvbi5SZXB1bHNpb24gPSBSZXB1bHNpb247XG5Qcm90b24uQ3ljbG9uZSA9IEN5Y2xvbmU7XG5Qcm90b24uR3Jhdml0eVdlbGwgPSBHcmF2aXR5V2VsbDtcblxuUHJvdG9uLkVtaXR0ZXIgPSBFbWl0dGVyO1xuUHJvdG9uLkJlaGF2aW91ckVtaXR0ZXIgPSBCZWhhdmlvdXJFbWl0dGVyO1xuUHJvdG9uLkZvbGxvd0VtaXR0ZXIgPSBGb2xsb3dFbWl0dGVyO1xuXG5Qcm90b24uWm9uZSA9IFpvbmU7XG5Qcm90b24uTGluZVpvbmUgPSBMaW5lWm9uZTtcblByb3Rvbi5DaXJjbGVab25lID0gQ2lyY2xlWm9uZTtcblByb3Rvbi5Qb2ludFpvbmUgPSBQb2ludFpvbmU7XG5Qcm90b24uUmVjdFpvbmUgPSBSZWN0Wm9uZTtcblByb3Rvbi5JbWFnZVpvbmUgPSBJbWFnZVpvbmU7XG5cblByb3Rvbi5DYW52YXNSZW5kZXJlciA9IENhbnZhc1JlbmRlcmVyO1xuUHJvdG9uLkRvbVJlbmRlcmVyID0gRG9tUmVuZGVyZXI7XG5Qcm90b24uRWFzZWxSZW5kZXJlciA9IEVhc2VsUmVuZGVyZXI7XG5Qcm90b24uUGl4aVJlbmRlcmVyID0gUGl4aVJlbmRlcmVyO1xuUHJvdG9uLlBpeGVsUmVuZGVyZXIgPSBQaXhlbFJlbmRlcmVyO1xuUHJvdG9uLldlYkdMUmVuZGVyZXIgPSBQcm90b24uV2ViR2xSZW5kZXJlciA9IFdlYkdMUmVuZGVyZXI7XG5Qcm90b24uQ3VzdG9tUmVuZGVyZXIgPSBDdXN0b21SZW5kZXJlcjtcblxuUHJvdG9uLkRlYnVnID0gRGVidWc7XG5VdGlsLmFzc2lnbihQcm90b24sIGVhc2UpO1xuXG4vLyBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IFByb3RvbjtcbiJdLCJuYW1lcyI6WyJpcG90IiwibGVuZ3RoIiwibmhwb3QiLCJpIiwibWFrZVRyYW5zbGF0aW9uIiwidHgiLCJ0eSIsIm1ha2VSb3RhdGlvbiIsImFuZ2xlSW5SYWRpYW5zIiwiYyIsIk1hdGgiLCJjb3MiLCJzIiwic2luIiwibWFrZVNjYWxlIiwic3giLCJzeSIsIm1hdHJpeE11bHRpcGx5IiwiYSIsImIiLCJhMDAiLCJhMDEiLCJhMDIiLCJhMTAiLCJhMTEiLCJhMTIiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMTAiLCJiMTEiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJjcmVhdGVDYW52YXMiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJjcmVhdGVEaXYiLCJyZXNpemUiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiZGl2IiwieCIsInkiLCJzY2FsZSIsInJvdGF0ZSIsIndpbGxDaGFuZ2UiLCJjc3MzIiwidHJhbnNmb3JtM2QiLCJrZXkiLCJ2YWwiLCJia2V5IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpbWdzQ2FjaGUiLCJjYW52YXNDYWNoZSIsImNhbnZhc0lkIiwiZ2V0SW1hZ2VEYXRhIiwiY29udGV4dCIsImltYWdlIiwicmVjdCIsImRyYXdJbWFnZSIsImltYWdlZGF0YSIsImNsZWFyUmVjdCIsImdldEltZ0Zyb21DYWNoZSIsImltZyIsImNhbGxiYWNrIiwicGFyYW0iLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJnZXRDYW52YXNGcm9tQ2FjaGUiLCJXZWJHTFV0aWwiLCJjYW52YXMiLCJEb21VdGlsIiwiZ2V0Q29udGV4dCIsImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZW1wdHlBcnJheSIsImFyciIsInRvQXJyYXkiLCJzbGljZUFycmF5IiwiYXJyMSIsImluZGV4IiwiYXJyMiIsInB1c2giLCJnZXRSYW5kRnJvbUFycmF5IiwiZmxvb3IiLCJyYW5kb20iLCJlbXB0eU9iamVjdCIsIm9iaiIsImlnbm9yZSIsImluZGV4T2YiLCJjbGFzc0FwcGx5IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiRmFjdG9yeUZ1bmMiLCJiaW5kIiwiYXBwbHkiLCJjb25jYXQiLCJJbWdVdGlsIiwiZGVzdHJveUFsbCIsImRlc3Ryb3kiLCJhc3NpZ24iLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkc01hcCIsIlB1aWQiLCJfaW5kZXgiLCJfY2FjaGUiLCJ0eXBlIiwiZ2V0SWQiLCJ1aWQiLCJnZXRJZEZyb21DYWNoZSIsImlzQm9keSIsImlzSW5uZXIiLCJnZXRUYXJnZXQiLCJQb29sIiwibnVtIiwidG90YWwiLCJjYWNoZSIsImdldCIsInBhcmFtcyIsInAiLCJfX3B1aWQiLCJwb3AiLCJjcmVhdGVPckNsb25lIiwiZXhwaXJlIiwiZ2V0Q2FjaGUiLCJjcmVhdGUiLCJVdGlsIiwiY2xvbmUiLCJnZXRDb3VudCIsImNvdW50IiwiU3RhdHMiLCJwcm90b24iLCJjb250YWluZXIiLCJlbWl0dGVySW5kZXgiLCJyZW5kZXJlckluZGV4IiwidXBkYXRlIiwiYm9keSIsImFkZCIsImVtaXR0ZXIiLCJnZXRFbWl0dGVyIiwicmVuZGVyZXIiLCJnZXRSZW5kZXJlciIsInN0ciIsImVtaXR0ZXJzIiwiZW1pdFNwZWVkIiwiZ2V0RW1pdHRlclBvcyIsImluaXRpYWxpemVzIiwiY29uY2F0QXJyIiwiYmVoYXZpb3VycyIsIm5hbWUiLCJnZXRDcmVhdGVkTnVtYmVyIiwicG9vbCIsImlubmVySFRNTCIsImNzc1RleHQiLCJqb2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJnIiwiY29sb3IiLCJwYXJlbnROb2RlIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJlcnMiLCJyZXN1bHQiLCJjcG9vbCIsInJvdW5kIiwicmVtb3ZlQ2hpbGQiLCJFdmVudERpc3BhdGNoZXIiLCJfbGlzdGVuZXJzIiwiZGlzcGF0Y2hFdmVudCIsImhhc0V2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMiLCJsaXN0ZW5lciIsInNwbGljZSIsImxpc3RlbmVycyIsImhhbmRsZXIiLCJQSSIsIklORklOSVRZIiwiSW5maW5pdHkiLCJNYXRoVXRpbCIsIlBJeDIiLCJQSV8yIiwiUElfMTgwIiwiTjE4MF9QSSIsImlzSW5maW5pdHkiLCJyYW5kb21BVG9CIiwiaXNJbnQiLCJyYW5kb21GbG9hdGluZyIsImNlbnRlciIsImYiLCJyYW5kb21Db2xvciIsInNsaWNlIiwicmFuZG9tWm9uZSIsImRpc3BsYXkiLCJrIiwiZGlnaXRzIiwicG93IiwiZGVncmVlVHJhbnNmb3JtIiwidG9Db2xvcjE2IiwiSW50ZWdyYXRpb24iLCJjYWxjdWxhdGUiLCJwYXJ0aWNsZXMiLCJ0aW1lIiwiZGFtcGluZyIsImV1bGVySW50ZWdyYXRlIiwicGFydGljbGUiLCJzbGVlcCIsIm9sZCIsImNvcHkiLCJ2IiwibXVsdGlwbHlTY2FsYXIiLCJtYXNzIiwiY2xlYXIiLCJQcm90b24iLCJpbnRlZ3JhdGlvblR5cGUiLCJub3ciLCJ0aGVuIiwiZWxhcHNlZCIsInN0YXRzIiwiRVVMRVIiLCJpbnRlZ3JhdG9yIiwiX2ZwcyIsIl9pbnRlcnZhbCIsIkRFRkFVTFRfSU5URVJWQUwiLCJhZGRSZW5kZXJlciIsInJlbmRlciIsImluaXQiLCJyZW1vdmVSZW5kZXJlciIsInJlbW92ZSIsImFkZEVtaXR0ZXIiLCJwYXJlbnQiLCJFTUlUVEVSX0FEREVEIiwicmVtb3ZlRW1pdHRlciIsIkVNSVRURVJfUkVNT1ZFRCIsIlBST1RPTl9VUERBVEUiLCJVU0VfQ0xPQ0siLCJEYXRlIiwiZ2V0VGltZSIsImFtZW5kQ2hhbmdlVGFic0J1ZyIsImVtaXR0ZXJzVXBkYXRlIiwiUFJPVE9OX1VQREFURV9BRlRFUiIsImdldEFsbFBhcnRpY2xlcyIsImRlc3Ryb3lBbGxFbWl0dGVycyIsImRlc3Ryb3lPdGhlciIsInNldFRpbWVvdXQiLCJmcHMiLCJNRUFTVVJFIiwiUksyIiwiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX1VQREFURSIsIlBBUlRJQ0xFX1NMRUVQIiwiUEFSVElDTEVfREVBRCIsIlJnYiIsInIiLCJnIiwicmVzZXQiLCJoYXNQcm9wIiwic2V0UHJvcCIsInByb3BzIiwicHJvcCIsIlNwYW4iLCJnZXRTcGFuVmFsdWUiLCJzZXRWZWN0b3JWYWwiLCJjb25mIiwiZWFzZUxpbmVhciIsImVhc2VJblF1YWQiLCJlYXNlT3V0UXVhZCIsImVhc2VJbk91dFF1YWQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblNpbmUiLCJlYXNlT3V0U2luZSIsImVhc2VJbk91dFNpbmUiLCJlYXNlSW5FeHBvIiwiZWFzZU91dEV4cG8iLCJlYXNlSW5PdXRFeHBvIiwiZWFzZUluQ2lyYyIsInNxcnQiLCJlYXNlT3V0Q2lyYyIsImVhc2VJbk91dENpcmMiLCJlYXNlSW5CYWNrIiwiZWFzZU91dEJhY2siLCJlYXNlSW5PdXRCYWNrIiwiZ2V0RWFzaW5nIiwiZWFzZSIsIlZlY3RvcjJEIiwic2V0Iiwic2V0WCIsInNldFkiLCJnZXRHcmFkaWVudCIsImF0YW4yIiwidyIsImFkZFZlY3RvcnMiLCJhZGRYWSIsInN1YiIsInN1YlZlY3RvcnMiLCJkaXZpZGVTY2FsYXIiLCJuZWdhdGUiLCJkb3QiLCJsZW5ndGhTcSIsIm5vcm1hbGl6ZSIsImRpc3RhbmNlVG8iLCJkaXN0YW5jZVRvU3F1YXJlZCIsInRoYSIsImR4IiwiZHkiLCJsZXJwIiwiYWxwaGEiLCJlcXVhbHMiLCJQYXJ0aWNsZSIsImRhdGEiLCJyZ2IiLCJQcm9wVXRpbCIsImdldERpcmVjdGlvbiIsImxpZmUiLCJhZ2UiLCJkZWFkIiwic3ByaXRlIiwiZW5lcmd5IiwicmFkaXVzIiwicm90YXRpb24iLCJlYXNpbmciLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwiYXBwbHlCZWhhdmlvdXJzIiwibWF4IiwiYXBwbHlCZWhhdmlvdXIiLCJhZGRCZWhhdmlvdXIiLCJiZWhhdmlvdXIiLCJwYXJlbnRzIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJoZXhUb1JnYiIsImgiLCJoZXgxNiIsInN1YnN0cmluZyIsInBhcnNlSW50IiwicmdiVG9IZXgiLCJyYmciLCJnZXRIZXgxNkZyb21QYXJ0aWNsZSIsIk51bWJlciIsIlBvbGFyMkQiLCJhYnMiLCJzZXRSIiwic2V0VGhhIiwidG9WZWN0b3IiLCJnZXRYIiwiZ2V0WSIsIk1hdDMiLCJtYXQzIiwibWF0IiwiRmxvYXQzMkFycmF5IiwibWF0MSIsIm1hdDIiLCJtdWx0aXBseSIsImludmVyc2UiLCJkIiwibXVsdGlwbHlWZWMyIiwibSIsInZlYyIsImdldFZhbHVlIiwic2V0U3BhblZhbHVlIiwicGFuIiwiQXJyYXlTcGFuIiwiX2FyciIsImNyZWF0ZUFycmF5U3BhbiIsIlJlY3RhbmdsZSIsImJvdHRvbSIsInJpZ2h0IiwiY29udGFpbnMiLCJSYXRlIiwibnVtcGFuIiwidGltZXBhbiIsIm51bVBhbiIsInRpbWVQYW4iLCJzdGFydFRpbWUiLCJuZXh0VGltZSIsIkluaXRpYWxpemUiLCJMaWZlIiwibGlmZVBhbiIsIlpvbmUiLCJ2ZWN0b3IiLCJjcm9zc1R5cGUiLCJhbGVydCIsImdldFBvc2l0aW9uIiwiY3Jvc3NpbmciLCJQb2ludFpvbmUiLCJjb25zb2xlIiwiZXJyb3IiLCJQb3NpdGlvbiIsInpvbmUiLCJWZWxvY2l0eSIsInJwYW4iLCJ0aGFwYW4iLCJyUGFuIiwidGhhUGFuIiwibm9ybWFsaXplVmVsb2NpdHkiLCJ2ciIsInBvbGFyMmQiLCJNYXNzIiwibWFzc1BhbiIsIlJhZGl1cyIsIm9sZFJhZGl1cyIsIkJvZHkiLCJpbWFnZVRhcmdldCIsImlubmVyIiwiQmVoYXZpb3VyIiwibm9ybWFsaXplRm9yY2UiLCJmb3JjZSIsIm5vcm1hbGl6ZVZhbHVlIiwiRm9yY2UiLCJmeCIsImZ5IiwiQXR0cmFjdGlvbiIsInRhcmdldFBvc2l0aW9uIiwicmFkaXVzU3EiLCJhdHRyYWN0aW9uRm9yY2UiLCJSYW5kb21EcmlmdCIsImRyaWZ0WCIsImRyaWZ0WSIsImRlbGF5IiwicGFuRm9jZSIsIkdyYXZpdHkiLCJDb2xsaXNpb24iLCJuZXdQb29sIiwiY29sbGlzaW9uUG9vbCIsImRlbHRhIiwib3RoZXJQYXJ0aWNsZSIsIm92ZXJsYXAiLCJ0b3RhbE1hc3MiLCJhdmVyYWdlTWFzczEiLCJhdmVyYWdlTWFzczIiLCJkaXN0YW5jZSIsIkNyb3NzWm9uZSIsIkFscGhhIiwic2FtZSIsImFscGhhQSIsImFscGhhQiIsIlNjYWxlIiwic2NhbGVBIiwic2NhbGVCIiwiUm90YXRlIiwiaW5mbHVlbmNlIiwicm90YXRpb25BIiwicm90YXRpb25CIiwiQ29sb3IiLCJjb2xvckEiLCJDb2xvclV0aWwiLCJjb2xvckIiLCJDSEFOR0lORyIsIkN5Y2xvbmUiLCJhbmdsZSIsInNldEFuZ2xlQW5kRm9yY2UiLCJzcGFuIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJjYW5nbGUiLCJjeWNsb25lIiwiZ3JhZGllbnQiLCJSZXB1bHNpb24iLCJHcmF2aXR5V2VsbCIsImNlbnRlclBvaW50IiwiZGlzdGFuY2VWZWMiLCJkaXN0YW5jZVNxIiwiZmFjdG9yIiwiYmluZEVtaXR0ZXIiLCJFbWl0dGVyIiwiZW1pdFRpbWUiLCJ0b3RhbFRpbWUiLCJyYXRlIiwiZW1pdCIsInN0b3BlZCIsImlzTmFOIiwic3RvcCIsInByZUVtaXQiLCJvbGRTdG9wZWQiLCJvbGRFbWl0VGltZSIsIm9sZFRvdGFsVGltZSIsInN0ZXAiLCJyZW1vdmVBbGxQYXJ0aWNsZXMiLCJhZGRTZWxmSW5pdGlhbGl6ZSIsImFkZEluaXRpYWxpemUiLCJyZXN0IiwicmVtb3ZlSW5pdGlhbGl6ZSIsImluaXRpYWxpemVyIiwicmVtb3ZlQWxsSW5pdGlhbGl6ZXJzIiwiYXJndW1lbnRzIiwiZW1pdHRpbmciLCJpbnRlZ3JhdGUiLCJkaXNwYXRjaCIsImV2ZW50IiwiYmluZEV2ZW50IiwiY3JlYXRlUGFydGljbGUiLCJzZXR1cFBhcnRpY2xlIiwiSW5pdGlhbGl6ZVV0aWwiLCJCZWhhdmlvdXJFbWl0dGVyIiwic2VsZkJlaGF2aW91cnMiLCJhZGRTZWxmQmVoYXZpb3VyIiwicmVtb3ZlU2VsZkJlaGF2aW91ciIsIkZvbGxvd0VtaXR0ZXIiLCJtb3VzZVRhcmdldCIsIndpbmRvdyIsIl9hbGxvd0VtaXR0aW5nIiwiaW5pdEV2ZW50SGFuZGxlciIsIm1vdXNlbW92ZUhhbmRsZXIiLCJtb3VzZW1vdmUiLCJtb3VzZWRvd25IYW5kbGVyIiwibW91c2Vkb3duIiwibW91c2V1cEhhbmRsZXIiLCJtb3VzZXVwIiwibGF5ZXJYIiwibGF5ZXJZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJpc0ltYWdlIiwiX19pc0ltYWdlIiwidGFnTmFtZSIsIm5vZGVOYW1lIiwiaXNTdHJpbmciLCJCYXNlUmVuZGVyZXIiLCJlbGVtZW50Iiwic3Ryb2tlIiwiY2lyY2xlQ29uZiIsImlzQ2lyY2xlIiwic2V0U3Ryb2tlIiwidGhpbmtuZXNzIiwiX3Byb3RvblVwZGF0ZUhhbmRsZXIiLCJvblByb3RvblVwZGF0ZSIsIl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIiLCJvblByb3RvblVwZGF0ZUFmdGVyIiwiX2VtaXR0ZXJBZGRlZEhhbmRsZXIiLCJvbkVtaXR0ZXJBZGRlZCIsIl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIiLCJvbkVtaXR0ZXJSZW1vdmVkIiwiX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIiLCJvblBhcnRpY2xlQ3JlYXRlZCIsIl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIiLCJvblBhcnRpY2xlVXBkYXRlIiwiX3BhcnRpY2xlRGVhZEhhbmRsZXIiLCJvblBhcnRpY2xlRGVhZCIsIkNhbnZhc1JlbmRlcmVyIiwiYnVmZmVyQ2FjaGUiLCJhZGRJbWcyQm9keSIsIlR5cGVzIiwiZHJhd0NpcmNsZSIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJ1ZkNvbnRleHQiLCJnbG9iYWxBbHBoYSIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic2F2ZSIsInRyYW5zbGF0ZSIsInJlc3RvcmUiLCJiZWdpblBhdGgiLCJhcmMiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImNsb3NlUGF0aCIsImZpbGwiLCJzaXplIiwiRG9tUmVuZGVyZXIiLCJjcmVhdGVCb2R5IiwiYm9keVJlYWR5IiwiYmFja2dyb3VuZENvbG9yIiwiY3JlYXRlQ2lyY2xlIiwiY3JlYXRlU3ByaXRlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsInVybCIsImJhY2tncm91bmRJbWFnZSIsIkVhc2VsUmVuZGVyZXIiLCJhZGRDaGlsZCIsInNjYWxlWCIsInNjYWxlWSIsImdyYXBoaWNzIiwicmVnWCIsInJlZ1kiLCJjcmVhdGVqcyIsIkdyYXBoaWNzIiwiYmVnaW5TdHJva2UiLCJiZWdpbkZpbGwiLCJzaGFwZSIsIlNoYXBlIiwiUGl4ZWxSZW5kZXJlciIsInJlY3RhbmdsZSIsImltYWdlRGF0YSIsImNyZWF0ZUltYWdlRGF0YSIsInB1dEltYWdlRGF0YSIsInNldFBpeGVsIiwiZWxlbWVudHdpZHRoIiwiUElYSUNsYXNzIiwiUGl4aVJlbmRlcmVyIiwic2V0Q29sb3IiLCJibGVuZE1vZGUiLCJzZXRQSVhJIiwiUElYSSIsIlNwcml0ZSIsImNyZWF0ZUZyb21JbWFnZSIsImZyb20iLCJmcm9tSW1hZ2UiLCJ0aW50IiwiYW5jaG9yIiwiZW5kRmlsbCIsIk1TdGFjayIsIm1hdHMiLCJ0b3AiLCJXZWJHTFJlbmRlcmVyIiwiZ2wiLCJhbnRpYWxpYXMiLCJzdGVuY2lsIiwiZGVwdGgiLCJpbml0VmFyIiwic2V0TWF4UmFkaXVzIiwiaW5pdFNoYWRlcnMiLCJpbml0QnVmZmVycyIsImJsZW5kRXF1YXRpb24iLCJGVU5DX0FERCIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJlbmFibGUiLCJCTEVORCIsInVtYXQiLCJzbWF0IiwibXN0YWNrIiwidmlld3BvcnQiLCJjaXJjbGVDYW52YXNVUkwiLCJnZXRWZXJ0ZXhTaGFkZXIiLCJ2c1NvdXJjZSIsImdldEZyYWdtZW50U2hhZGVyIiwiZnNTb3VyY2UiLCJ0ZXh0dXJlYnVmZmVycyIsIkEiLCJCIiwiZ2V0U2hhZGVyIiwiZnMiLCJzaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwidmVydGV4U2hhZGVyIiwic3Byb2dyYW0iLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJ1c2VQcm9ncmFtIiwidnBhIiwiZ2V0QXR0cmliTG9jYXRpb24iLCJ0Y2EiLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInRNYXRVbmlmb3JtIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwic2FtcGxlclVuaWZvcm0iLCJ1c2VUZXgiLCJ1bmlmb3JtMWkiLCJ2cyIsImlkeCIsInVuaXRJQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiYnVmZmVyRGF0YSIsIlVpbnQxNkFycmF5IiwiU1RBVElDX0RSQVciLCJpZHMiLCJ1bml0STMzIiwic3RyaXBCdWZmZXIiLCJyYWlkdXMiLCJjaXJjbGVDYW52YXNSYWRpdXMiLCJ0b0RhdGFVUkwiLCJkcmF3SW1nMkNhbnZhcyIsIl93IiwiX2giLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX3NjYWxlWCIsIl9zY2FsZVkiLCJjcmVhdGVUZXh0dXJlIiwidGV4dHVyZSIsInZjQnVmZmVyIiwidGNCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTElORUFSIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiTElORUFSX01JUE1BUF9ORUFSRVNUIiwiZ2VuZXJhdGVNaXBtYXAiLCJ0ZXh0dXJlTG9hZGVkIiwidGV4dHVyZVdpZHRoIiwidGV4dHVyZUhlaWdodCIsInRtYXQiLCJpbWF0Iiwib2xkU2NhbGUiLCJ1cGRhdGVNYXRyaXgiLCJ1bmlmb3JtM2YiLCJ1bmlmb3JtTWF0cml4M2Z2IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwiZHJhd0VsZW1lbnRzIiwiVFJJQU5HTEVTIiwiVU5TSUdORURfU0hPUlQiLCJtb3ZlT3JpZ2luTWF0cml4IiwidHJhbnNsYXRpb25NYXRyaXgiLCJhbmdlbCIsInJvdGF0aW9uTWF0cml4Iiwic2NhbGVNYXRyaXgiLCJtYXRyaXgiLCJDdXN0b21SZW5kZXJlciIsIkxpbmVab25lIiwieDEiLCJ5MSIsIngyIiwieTIiLCJkaXJlY3Rpb24iLCJtaW54IiwibWluIiwibWlueSIsIm1heHgiLCJtYXh5IiwieHh5eSIsImdldExlbmd0aCIsIkMiLCJEIiwiZ2V0RGlzdGFuY2UiLCJnZXRTeW1tZXRyaWMiLCJ0aGEyIiwidGhhMSIsIm9sZHgiLCJvbGR5IiwicmFuZ2VPdXQiLCJDaXJjbGVab25lIiwicmFuZG9tUmFkaXVzIiwic2V0Q2VudGVyIiwiUmVjdFpvbmUiLCJJbWFnZVpvbmUiLCJ2ZWN0b3JzIiwic2V0VmVjdG9ycyIsImoiLCJsZW5ndGgxIiwibGVuZ3RoMiIsImdldEJvdW5kIiwiZ2V0Q29sb3IiLCJmdW5jIiwiZ2V0U3R5bGUiLCJkcmF3Wm9uZSIsIm1vdmVUbyIsImxpbmVUbyIsImRyYXdSZWN0IiwiZHJhd0VtaXR0ZXIiLCJWZWN0b3IiLCJQb2xhciIsImdldFNwYW4iLCJJbml0IiwiTCIsIlAiLCJWIiwiTSIsIlIiLCJGIiwiUkQiLCJHIiwiUyIsIldlYkdsUmVuZGVyZXIiLCJEZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFlO0VBQ2I7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFQSxFQUFBQSxJQVphLEVBWVJDLFNBQUFBLElBQUFBLENBQUFBLE1BWlEsRUFZQTtFQUNYLElBQUEsT0FBTyxDQUFDQSxNQUFNLEdBQUlBLE1BQU0sR0FBRyxDQUFwQixNQUE0QixDQUFuQyxDQUFBO0VBQ0QsR0FkWTs7RUFnQmI7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFQyxFQUFBQSxLQTNCYSxFQTJCUEQsU0FBQUEsS0FBQUEsQ0FBQUEsTUEzQk8sRUEyQkM7RUFDWixJQUFBLEVBQUVBLE1BQUYsQ0FBQTs7RUFDQSxJQUFBLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxL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
