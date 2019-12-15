/**

MIT License

Copyright (c) 2012 - 2017 jonobr1 / http://jonobr1.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

(this || window).Two = (function(previousTwo) {

  var root = typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : null;
  var toString = Object.prototype.toString;
  /**
   * @name _
   * @interface
   * @private
   * @description A collection of useful functions borrowed and repurposed from Underscore.js.
   * @see {@link http://underscorejs.org/}
   */
  var _ = {
    // http://underscorejs.org/ • 1.8.3
    _indexAmount: 0,
    natural: {
      slice: Array.prototype.slice,
      indexOf: Array.prototype.indexOf,
      keys: Object.keys,
      bind: Function.prototype.bind,
      create: Object.create
    },
    identity: function(value) {
      return value;
    },
    isArguments: function(obj) {
      return toString.call(obj) === '[object Arguments]';
    },
    isFunction: function(obj) {
      return toString.call(obj) === '[object Function]';
    },
    isString: function(obj) {
      return toString.call(obj) === '[object String]';
    },
    isNumber: function(obj) {
      return toString.call(obj) === '[object Number]';
    },
    isDate: function(obj) {
      return toString.call(obj) === '[object Date]';
    },
    isRegExp: function(obj) {
      return toString.call(obj) === '[object RegExp]';
    },
    isError: function(obj) {
      return toString.call(obj) === '[object Error]';
    },
    isFinite: function(obj) {
      return isFinite(obj) && !isNaN(parseFloat(obj));
    },
    isNaN: function(obj) {
      return _.isNumber(obj) && obj !== +obj;
    },
    isBoolean: function(obj) {
      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    },
    isNull: function(obj) {
      return obj === null;
    },
    isUndefined: function(obj) {
      return obj === void 0;
    },
    isEmpty: function(obj) {
      if (obj == null) return true;
      if (isArrayLike && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
      return _.keys(obj).length === 0;
    },
    isElement: function(obj) {
      return !!(obj && obj.nodeType === 1);
    },
    isArray: Array.isArray || function(obj) {
      return toString.call(obj) === '[object Array]';
    },
    isObject: function(obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    },
    toArray: function(obj) {
      if (!obj) {
        return [];
      }
      if (_.isArray(obj)) {
        return slice.call(obj);
      }
      if (isArrayLike(obj)) {
        return _.map(obj, _.identity);
      }
      return _.values(obj);
    },
    range: function(start, stop, step) {
      if (stop == null) {
        stop = start || 0;
        start = 0;
      }
      step = step || 1;

      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var range = Array(length);

      for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
      }

      return range;
    },
    indexOf: function(list, item) {
      if (!!_.natural.indexOf) {
        return _.natural.indexOf.call(list, item);
      }
      for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
          return i;
        }
      }
      return -1;
    },
    has: function(obj, key) {
      return obj != null && hasOwnProperty.call(obj, key);
    },
    bind: function(func, ctx) {
      var natural = _.natural.bind;
      if (natural && func.bind === natural) {
        return natural.apply(func, slice.call(arguments, 1));
      }
      var args = slice.call(arguments, 2);
      return function() {
        func.apply(ctx, args);
      };
    },
    extend: function(base) {
      var sources = slice.call(arguments, 1);
      for (var i = 0; i < sources.length; i++) {
        var obj = sources[i];
        for (var k in obj) {
          base[k] = obj[k];
        }
      }
      return base;
    },
    defaults: function(base) {
      var sources = slice.call(arguments, 1);
      for (var i = 0; i < sources.length; i++) {
        var obj = sources[i];
        for (var k in obj) {
          if (base[k] === void 0) {
            base[k] = obj[k];
          }
        }
      }
      return base;
    },
    keys: function(obj) {
      if (!_.isObject(obj)) {
        return [];
      }
      if (_.natural.keys) {
        return _.natural.keys(obj);
      }
      var keys = [];
      for (var k in obj) {
        if (_.has(obj, k)) {
          keys.push(k);
        }
      }
      return keys;
    },
    values: function(obj) {
      var keys = _.keys(obj);
      var values = [];
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        values.push(obj[k]);
      }
      return values;
    },
    each: function(obj, iteratee, context) {
      var ctx = context || this;
      var keys = !isArrayLike(obj) && _.keys(obj);
      var length = (keys || obj).length;
      for (var i = 0; i < length; i++) {
        var k = keys ? keys[i] : i;
        iteratee.call(ctx, obj[k], k, obj);
      }
      return obj;
    },
    map: function(obj, iteratee, context) {
      var ctx = context || this;
      var keys = !isArrayLike(obj) && _.keys(obj);
      var length = (keys || obj).length;
      var result = [];
      for (var i = 0; i < length; i++) {
        var k = keys ? keys[i] : i;
        result[i] = iteratee.call(ctx, obj[k], k, obj);
      }
      return result;
    },
    once: function(func) {
      var init = false;
      return function() {
        if (!!init) {
          return func;
        }
        init = true;
        return func.apply(this, arguments);
      }
    },
    after: function(times, func) {
      return function() {
        while (--times < 1) {
          return func.apply(this, arguments);
        }
      }
    },
    uniqueId: function(prefix) {
      var id = ++_._indexAmount + '';
      return prefix ? prefix + id : id;
    }
  };

  // Constants

  var sin = Math.sin,
    cos = Math.cos,
    acos = Math.acos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    round = Math.round,
    abs = Math.abs,
    PI = Math.PI,
    TWO_PI = PI * 2,
    HALF_PI = PI / 2,
    pow = Math.pow,
    min = Math.min,
    max = Math.max;

  // Localized variables

  var count = 0;
  var slice = _.natural.slice;
  var perf = ((root.performance && root.performance.now) ? root.performance : Date);
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = function(obj) {
    return obj == null ? void 0 : obj['length'];
  };
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Cross browser dom events.

  var dom = {

    temp: (root.document ? root.document.createElement('div') : {}),

    hasEventListeners: _.isFunction(root.addEventListener),

    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent('on' + event, func);
      }
      return dom;
    },

    unbind: function(elem, event, func, bool) {
      if (dom.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent('on' + event, func);
      }
      return dom;
    },

    getRequestAnimationFrame: function() {

      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      var request = root.requestAnimationFrame, cancel;

      if(!request) {
        for (var i = 0; i < vendors.length; i++) {
          request = root[vendors[i] + 'RequestAnimationFrame'] || request;
          cancel = root[vendors[i] + 'CancelAnimationFrame']
            || root[vendors[i] + 'CancelRequestAnimationFrame'] || cancel;
        }

        request = request || function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = root.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
        // cancel = cancel || function(id) {
        //   clearTimeout(id);
        // };
      }

      request.init = _.once(loop);

      return request;

    }

  };

  /**
   * @name Two
   * @class
   * @global
   * @param {Object} [options]
   * @param {Boolean} [options.fullscreen=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`.
   * @param {Number} [options.width=640] - The width of the stage on construction. This can be set at a later time.
   * @param {Number} [options.height=480] - The height of the stage on construction. This can be set at a later time.
   * @param {String} [options.type=Two.Types.svg] - The type of renderer to setup drawing with. See [`Two.Types`]{@link  Two.Types} for available options.
   * @param {Boolean} [options.autostart=false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
   * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
   */
  var Two = root.Two = function(options) {

    // Determine what Renderer to use and setup a scene.

    var params = _.defaults(options || {}, {
      fullscreen: false,
      width: 640,
      height: 480,
      type: Two.Types.svg,
      autostart: false
    });

    _.each(params, function(v, k) {
      if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
        return;
      }
      this[k] = v;
    }, this);

    // Specified domElement overrides type declaration only if the element does not support declared renderer type.
    if (_.isElement(params.domElement)) {
      var tagName = params.domElement.tagName.toLowerCase();
      // TODO: Reconsider this if statement's logic.
      if (!/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type+'-'+tagName)) {
        this.type = Two.Types[tagName];
      }
    }

    this.renderer = new Two[this.type](this);
    Two.Utils.setPlaying.call(this, params.autostart);
    this.frameCount = 0;

    if (params.fullscreen) {

      var fitted = _.bind(fitToWindow, this);
      _.extend(document.body.style, {
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      _.extend(this.renderer.domElement.style, {
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(root, 'resize', fitted);
      fitted();


    } else if (!_.isElement(params.domElement)) {

      this.renderer.setSize(params.width, params.height, this.ratio);
      this.width = params.width;
      this.height = params.height;

    }

    this.renderer.bind(Two.Events.resize, _.bind(updateDimensions, this));
    this.scene = this.renderer.scene;

    Two.Instances.push(this);
    if (params.autostart) {
      raf.init();
    }

  };

  _.extend(Two, {

    // Access to root in other files.

    /**
     * @name Two.root
     * @description The root of the session context. In the browser this is the `window` variable. This varies in headless environments.
     */
    root: root,

    /**
     * @name Two.nextFrameID
     * @property {Integer}
     * @description The id of the next requestAnimationFrame function.
     */
    nextFrameID: null,

    // Primitive

    /**
     * @name Two.Array
     * @description A simple polyfill for Float32Array.
     */
    Array: root.Float32Array || Array,

    /**
     * @name Two.Types
     * @property {Object} - The different rendering types availabe in the library.
     */
    Types: {
      webgl: 'WebGLRenderer',
      svg: 'SVGRenderer',
      canvas: 'CanvasRenderer'
    },

    /**
     * @name Two.Version
     * @property {String} - The current working version of the library.
     */
    Version: 'v0.7.0-beta.3',

    /**
     * @name Two.PublishDate
     * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
     */
    PublishDate: '2018-12-08T22:41:43+01:00',

    /**
     * @name Two.Identifier
     * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
     */
    Identifier: 'two-',

    /**
     * @name Two.Events
     * @property {Object} - Map of possible events in Two.js.
     */
    Events: {
      play: 'play',
      pause: 'pause',
      update: 'update',
      render: 'render',
      resize: 'resize',
      change: 'change',
      remove: 'remove',
      insert: 'insert',
      order: 'order',
      load: 'load'
    },

    /**
     * @name Two.Commands
     * @property {Object} - Map of possible path commands. Taken from the SVG specification.
     */
    Commands: {
      move: 'M',
      line: 'L',
      curve: 'C',
      arc: 'A',
      close: 'Z'
    },

    /**
     * @name Two.Resolution
     * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
     */
    Resolution: 12,

    /**
     * @name Two.Instances
     * @property {Array} - Registered list of all Two.js instances in the current session.
     */
    Instances: [],

    /**
     * @function Two.noConflict
     * @description A function to revert the global namespaced `Two` variable to its previous incarnation.
     * @returns {Two} Returns access to the top-level Two.js library for local use.
     */
    noConflict: function() {
      root.Two = previousTwo;
      return Two;
    },

    /**
     * @function Two.uniqueId
     * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
     * @returns {Number} Ever increasing integer.
     */
    uniqueId: function() {
      var id = count;
      count++;
      return id;
    },

    /**
     * @name Two.Utils
     * @interface
     * @implements {_}
     * @description A hodgepodge of handy functions, math, and properties are stored here.
     */
    Utils: _.extend(_, {

      /**
       * @name Two.Utils.performance
       * @property {Date} - A special `Date` like object to get the current millis of the session. Used internally to calculate time between frames.
       * e.g: `Two.Utils.performance.now() // milliseconds since epoch`
       */
      performance: perf,

      /**
       * @name Two.Utils.defineProperty
       * @function
       * @this Two#
       * @param {String} property - The property to add an enumerable getter / setter to.
       * @description Convenience function to setup the flag based getter / setter that most properties are defined as in Two.js.
       */
      defineProperty: function(property) {

        var object = this;
        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

        Object.defineProperty(object, property, {
          enumerable: true,
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
          }
        });

      },

      Image: null,

      isHeadless: false,

      /**
       * @name Two.Utils.shim
       * @function
       * @param {canvas} canvas - The instanced `Canvas` object provided by `node-canvas`.
       * @param {Image} [Image] - The prototypical `Image` object provided by `node-canvas`. This is only necessary to pass if you're going to load bitmap imagery.
       * @returns {canvas} Returns the instanced canvas object you passed from with additional attributes needed for Two.js.
       * @description Convenience method for defining all the dependencies from the npm package `node-canvas`. See [node-canvas]{@link https://github.com/Automattic/node-canvas} for additional information on setting up HTML5 `<canvas />` drawing in a node.js environment.
       */
      shim: function(canvas, Image) {
        Two.CanvasRenderer.Utils.shim(canvas);
        if (!_.isUndefined(Image)) {
          Two.Utils.Image = Image;
        }
        Two.Utils.isHeadless = true;
        return canvas;
      },

      /**
       * @name Two.Utils.release
       * @function
       * @param {Object} obj
       * @returns {Object} The object passed for event deallocation.
       * @description Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.
       */
      release: function(obj) {

        if (!_.isObject(obj)) {
          return;
        }

        if (_.isFunction(obj.unbind)) {
          obj.unbind();
        }

        if (obj.vertices) {
          if (_.isFunction(obj.vertices.unbind)) {
            obj.vertices.unbind();
          }
          _.each(obj.vertices, function(v) {
            if (_.isFunction(v.unbind)) {
              v.unbind();
            }
          });
        }

        if (obj.children) {
          _.each(obj.children, function(obj) {
            Two.Utils.release(obj);
          });
        }

        return obj;

      },

      /**
       * @name Two.Utils.xhr
       * @function
       * @param {String} path
       * @param {Function} callback
       * @returns {XMLHttpRequest} The constructed and called XHR request.
       * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
       */
      xhr: function(path, callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', path);

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
          }
        };

        xhr.send();
        return xhr;

      },

      /**
       * @name Two.Utils.Curve
       * @property {Object} - Additional utility constant variables related to curve math and calculations.
       */
      Curve: {

        CollinearityEpsilon: pow(10, -30),

        RecursionLimit: 16,

        CuspLimit: 0,

        Tolerance: {
          distance: 0.25,
          angle: 0,
          epsilon: Number.EPSILON
        },

        // Lookup tables for abscissas and weights with values for n = 2 .. 16.
        // As values are symmetric, only store half of them and adapt algorithm
        // to factor in symmetry.
        abscissas: [
          [  0.5773502691896257645091488],
          [0,0.7745966692414833770358531],
          [  0.3399810435848562648026658,0.8611363115940525752239465],
          [0,0.5384693101056830910363144,0.9061798459386639927976269],
          [  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
          [0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
          [  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
          [0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
          [  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
          [0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
          [  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
          [0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
          [  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
          [0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
          [  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
        ],

        weights: [
          [1],
          [0.8888888888888888888888889,0.5555555555555555555555556],
          [0.6521451548625461426269361,0.3478548451374538573730639],
          [0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
          [0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
          [0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
          [0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
          [0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
          [0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
          [0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
          [0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
          [0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
          [0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
          [0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
          [0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
        ]

      },

      devicePixelRatio: root.devicePixelRatio || 1,

      getBackingStoreRatio: function(ctx) {
        return ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;
      },

      /**
       * @name Two.Utils.getRatio
       * @function
       * @param {Canvas.context2D} ctx
       * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
       * @see [High DPI Rendering]{@link http://www.html5rocks.com/en/tutorials/canvas/hidpi/}
       */
      getRatio: function(ctx) {
        return Two.Utils.devicePixelRatio / getBackingStoreRatio(ctx);
      },

      /**
       * @name Two.Utils.setPlaying
       * @function
       * @this Two#
       * @returns {Two} The instance called with for potential chaining.
       * @description Internal convenience method to properly defer play calling until after all objects have been updated with their newest styles.
       */
      setPlaying: function(b) {

        this.playing = !!b;
        return this;

      },

      /**
       * @name Two.Utils.getComputedMatrix
       * @function
       * @param {Two.Shape} object - The Two.js object that has a matrix property to calculate from.
       * @param {Two.Matrix} [matrix] - The matrix to apply calculated transformations to if available.
       * @returns {Two.Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
       * @description Method to get the world space transformation of a given object in a Two.js scene.
       */
      getComputedMatrix: function(object, matrix) {

        matrix = (matrix && matrix.identity()) || new Two.Matrix();
        var parent = object, matrices = [];

        while (parent && parent._matrix) {
          matrices.push(parent._matrix);
          parent = parent.parent;
        }

        matrices.reverse();

        for (var i = 0; i < matrices.length; i++) {

          var m = matrices[i];
          var e = m.elements;
          matrix.multiply(
            e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);

        }

        return matrix;

      },

      /**
       * @name Two.Utils.deltaTransformPoint
       * @function
       * @param {Two.Matrix} matrix
       * @param {Number} x
       * @param {Number} y
       * @returns {Two.Vector}
       * @description Used by {@link Two.Utils.decomposeMatrix}
       */
      deltaTransformPoint: function(matrix, x, y) {

        var dx = x * matrix.a + y * matrix.c + 0;
        var dy = x * matrix.b + y * matrix.d + 0;

        return new Two.Vector(dx, dy);

      },

      /**
       * @name Two.Utils.decomposeMatrix
       * @function
       * @param {Two.Matrix} matrix - The matrix to decompose.
       * @returns {Object} An object containing relevant skew values.
       * @description Decompose a 2D 3x3 Matrix to find the skew.
       * @see {@link https://gist.github.com/2052247}
       */
      decomposeMatrix: function(matrix) {

        // calculate delta transform point
        var px = Two.Utils.deltaTransformPoint(matrix, 0, 1);
        var py = Two.Utils.deltaTransformPoint(matrix, 1, 0);

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {
            translateX: matrix.e,
            translateY: matrix.f,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewX // rotation is the same as skew x
        };

      },

      /**
       * @name Two.Utils.extractCSSText
       * @function
       * @param {String} text - The CSS text body to be parsed and extracted.
       * @param {Object} [styles] - The styles object to apply CSS key values to.
       * @returns {Object} styles
       * @description Parse CSS text body and apply them as key value pairs to a JavaScript object.
       */
      extractCSSText: function(text, styles) {

        var commands, command, name, value;

        if (!styles) {
          styles = {};
        }

        commands = text.split(';');

        for (var i = 0; i < commands.length; i++) {
          command = commands[i].split(':');
          name = command[0];
          value = command[1];
          if (_.isUndefined(name) || _.isUndefined(value)) {
            continue;
          }
          styles[name] = value.replace(/\s/, '');
        }

        return styles;

      },

      /**
       * @name Two.Utils.getSvgStyles
       * @function
       * @param {SvgNode} node - The SVG node to parse.
       * @returns {Object} styles
       * @description Get the CSS comands from the `style` attribute of an SVG node and apply them as key value pairs to a JavaScript object.
       */
      getSvgStyles: function(node) {

        var styles = {};

        for (var i = 0; i < node.style.length; i++) {
          var command = node.style[i];
          styles[command] = node.style[command];
        }

        return styles;

      },

      /**
       * @name Two.Utils.applySvgViewBox
       * @function
       * @param {Two.Shape} node - The Two.js object to apply viewbox matrix to
       * @param {String} value - The viewBox value from the SVG attribute
       * @returns {Two.Shape} node
       @ @description
       */
      applySvgViewBox: function(node, value) {

        var elements = value.split(/\s/);

        var x = parseFloat(elements[0]);
        var y = parseFloat(elements[1]);
        var width = parseFloat(elements[2]);
        var height = parseFloat(elements[3]);

        var s = Math.min(this.width / width, this.height / height);

        node.translation.x -= x * s;
        node.translation.y -= y * s;
        node.scale = s;

        return node;

      },

      /**
       * @name Two.Utils.applySvgAttributes
       * @function
       * @param {SvgNode} node - An SVG Node to extrapolate attributes from.
       * @param {Two.Shape} elem - The Two.js object to apply extrapolated attributes to.
       * @returns {Two.Shape} The Two.js object passed now with applied attributes.
       * @description This function iterates through an SVG Node's properties and stores ones of interest. It tries to resolve styles applied via CSS as well.
       * @TODO Reverse calculate `Two.Gradient`s for fill / stroke of any given path.
       */
      applySvgAttributes: function(node, elem, parentStyles) {

        var  styles = {}, attributes = {}, extracted = {}, i, key, value, attr;

        // Not available in non browser environments
        if (root.getComputedStyle) {
          // Convert CSSStyleDeclaration to a normal object
          var computedStyles = root.getComputedStyle(node);
          i = computedStyles.length;

          while (i--) {
            key = computedStyles[i];
            value = computedStyles[key];
            // Gecko returns undefined for unset properties
            // Webkit returns the default value
            if (!_.isUndefined(value)) {
              styles[key] = value;
            }
          }
        }

        // Convert NodeMap to a normal object
        for (i = 0; i < node.attributes.length; i++) {
          attr = node.attributes[i];
          if (/style/i.test(attr.nodeName)) {
            Two.Utils.extractCSSText(attr.value, extracted);
          } else {
            attributes[attr.nodeName] = attr.value;
          }
        }

        // Getting the correct opacity is a bit tricky, since SVG path elements don't
        // support opacity as an attribute, but you can apply it via CSS.
        // So we take the opacity and set (stroke/fill)-opacity to the same value.
        if (!_.isUndefined(styles.opacity)) {
          styles['stroke-opacity'] = styles.opacity;
          styles['fill-opacity'] = styles.opacity;
          delete styles.opacity;
        }

        // Merge attributes and applied styles (attributes take precedence)
        if (parentStyles) {
          _.defaults(styles, parentStyles);
        }
        _.extend(styles, attributes, extracted);

        // Similarly visibility is influenced by the value of both display and visibility.
        // Calculate a unified value here which defaults to `true`.
        styles.visible = !(_.isUndefined(styles.display) && /none/i.test(styles.display))
          || (_.isUndefined(styles.visibility) && /hidden/i.test(styles.visibility));

        // Now iterate the whole thing
        for (key in styles) {
          value = styles[key];

          switch (key) {
            case 'transform':
              // TODO: Check this out https://github.com/paperjs/paper.js/blob/develop/src/svg/SvgImport.js#L315
              if (/none/i.test(value)) break;
              var m = (node.transform && node.transform.baseVal && node.transform.baseVal.length > 0)
                ? node.transform.baseVal[0].matrix
                : (node.getCTM ? node.getCTM() : null);

              // Might happen when transform string is empty or not valid.
              if (_.isNull(m)) break;

              // // Option 1: edit the underlying matrix and don't force an auto calc.
              // var m = node.getCTM();
              // elem._matrix.manual = true;
              // elem._matrix.set(m.a, m.b, m.c, m.d, m.e, m.f);

              // Option 2: Decompose and infer Two.js related properties.
              var transforms = Two.Utils.decomposeMatrix(m);

              elem.translation.set(transforms.translateX, transforms.translateY);
              elem.rotation = transforms.rotation;
              elem.scale = new Two.Vector(transforms.scaleX, transforms.scaleY);

              var x = parseFloat((styles.x + '').replace('px'));
              var y = parseFloat((styles.y + '').replace('px'));

              // Override based on attributes.
              if (x) {
                elem.translation.x = x;
              }

              if (y) {
                elem.translation.y = y;
              }

              break;
            case 'viewBox':
              Two.Utils.applySvgViewBox.call(this, elem, value);
              break;
            case 'visible':
              elem.visible = value;
              break;
            case 'stroke-linecap':
              elem.cap = value;
              break;
            case 'stroke-linejoin':
              elem.join = value;
              break;
            case 'stroke-miterlimit':
              elem.miter = value;
              break;
            case 'stroke-width':
              elem.linewidth = parseFloat(value);
              break;
            case 'opacity':
            case 'stroke-opacity':
            case 'fill-opacity':
              // Only apply styles to rendered shapes
              // in the scene.
              if (!(elem instanceof Two.Group)) {
                elem.opacity = parseFloat(value);
              }
              break;
            case 'fill':
            case 'stroke':
              if (/url\(\#.*\)/i.test(value)) {
                elem[key] = this.getById(
                  value.replace(/url\(\#(.*)\)/i, '$1'));
              } else {
                elem[key] = (/none/i.test(value)) ? 'transparent' : value;
              }
              break;
            case 'id':
              elem.id = value;
              break;
            case 'class':
            case 'className':
              elem.classList = value.split(' ');
              break;
          }
        }

        return styles;

      },

      /**
       * @name Two.Utils.read
       * @property {Object} read - A map of functions to read any number of SVG node types and create Two.js equivalents of them. Primarily used by the {@link Two#interpret} method.
       */
      read: {

        svg: function(node) {

          var svg = Two.Utils.read.g.call(this, node);
          var viewBox = node.getAttribute('viewBox');
          // Two.Utils.applySvgViewBox(svg, viewBox);

          return svg;

        },

        g: function(node) {

          var styles, attrs;
          var group = new Two.Group();

          // Switched up order to inherit more specific styles
          styles = Two.Utils.getSvgStyles.call(this, node);

          for (var i = 0, l = node.childNodes.length; i < l; i++) {
            var n = node.childNodes[i];
            var tag = n.nodeName;
            if (!tag) return;

            var tagName = tag.replace(/svg\:/ig, '').toLowerCase();

            if (tagName in Two.Utils.read) {
              var o = Two.Utils.read[tagName].call(group, n, styles);
              group.add(o);
            }
          }

          return group;

        },

        polygon: function(node, parentStyles) {

          var points = node.getAttribute('points');

          var verts = [];
          points.replace(/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g, function(match, p1, p2) {
            verts.push(new Two.Anchor(parseFloat(p1), parseFloat(p2)));
          });

          var poly = new Two.Path(verts, true).noStroke();
          poly.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, poly, parentStyles);

          return poly;

        },

        polyline: function(node, parentStyles) {
          var poly = Two.Utils.read.polygon.call(this, node, parentStyles);
          poly.closed = false;
          return poly;
        },

        path: function(node, parentStyles) {

          var path = node.getAttribute('d');

          // Create a Two.Path from the paths.

          var coord = new Two.Anchor();
          var control, coords;
          var closed = false, relative = false;
          var commands = path.match(/[a-df-z][^a-df-z]*/ig);
          var last = commands.length - 1;

          // Split up polybeziers

          _.each(commands.slice(0), function(command, i) {

            var number, fid, lid, numbers, first, s;
            var j, k, ct, l, times;

            var type = command[0];
            var lower = type.toLowerCase();
            var items = command.slice(1).trim().split(/[\s,]+|(?=\s?[+\-])/);
            var pre, post, result = [], bin;
            var hasDoubleDecimals = false;

            // Handle double decimal values e.g: 48.6037.71.8
            // Like: https://m.abcsofchinese.com/images/svg/亼ji2.svg
            for (j = 0; j < items.length; j++) {

              number = items[j];
              fid = number.indexOf('.');
              lid = number.lastIndexOf('.');

              if (fid !== lid) {

                numbers = number.split('.');
                first = numbers[0] + '.' + numbers[1];

                items.splice(j, 1, first);

                for (s = 2; s < numbers.length; s++) {
                  items.splice(j + s - 1, 0, '0.' + numbers[s]);
                }

                hasDoubleDecimals = true;

              }

            }

            if (hasDoubleDecimals) {
              command = type + items.join(',');
            }

            if (i <= 0) {
              commands = [];
            }

            switch (lower) {
              case 'h':
              case 'v':
                if (items.length > 1) {
                  bin = 1;
                }
                break;
              case 'm':
              case 'l':
              case 't':
                if (items.length > 2) {
                  bin = 2;
                }
                break;
              case 's':
              case 'q':
                if (items.length > 4) {
                  bin = 4;
                }
                break;
              case 'c':
                if (items.length > 6) {
                  bin = 6;
                }
                break;
              case 'a':
                if (items.length > 7) {
                  bin = 7;
                }
                break;
            }

            // This means we have a polybezier.
            if (bin) {

              for (j = 0, l = items.length, times = 0; j < l; j+=bin) {

                ct = type;
                if (times > 0) {

                  switch (type) {
                    case 'm':
                      ct = 'l';
                      break;
                    case 'M':
                      ct = 'L';
                      break;
                  }

                }

                result.push(ct + items.slice(j, j + bin).join(' '));
                times++;

              }

              commands = Array.prototype.concat.apply(commands, result);

            } else {

              commands.push(command);

            }

          });

          // Create the vertices for our Two.Path

          var points = [];
          _.each(commands, function(command, i) {

            var result, x, y;
            var type = command[0];
            var lower = type.toLowerCase();

            coords = command.slice(1).trim();
            coords = coords.replace(/(-?\d+(?:\.\d*)?)[eE]([+\-]?\d+)/g, function(match, n1, n2) {
              return parseFloat(n1) * pow(10, n2);
            });
            coords = coords.split(/[\s,]+|(?=\s?[+\-])/);
            relative = type === lower;

            var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

            switch (lower) {

              case 'z':
                if (i >= last) {
                  closed = true;
                } else {
                  x = coord.x;
                  y = coord.y;
                  result = new Two.Anchor(
                    x, y,
                    undefined, undefined,
                    undefined, undefined,
                    Two.Commands.close
                  );
                  // Make coord be the last `m` command
                  for (var i = points.length - 1; i >= 0; i--) {
                    var point = points[i];
                    if (/m/i.test(point.command)) {
                      coord = point;
                      break;
                    }
                  }
                }
                break;

              case 'm':
              case 'l':

                control = undefined;

                x = parseFloat(coords[0]);
                y = parseFloat(coords[1]);

                result = new Two.Anchor(
                  x, y,
                  undefined, undefined,
                  undefined, undefined,
                  /m/i.test(lower) ? Two.Commands.move : Two.Commands.line
                );

                if (relative) {
                  result.addSelf(coord);
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 'h':
              case 'v':

                var a = /h/i.test(lower) ? 'x' : 'y';
                var b = /x/i.test(a) ? 'y' : 'x';

                result = new Two.Anchor(
                  undefined, undefined,
                  undefined, undefined,
                  undefined, undefined,
                  Two.Commands.line
                );
                result[a] = parseFloat(coords[0]);
                result[b] = coord[b];

                if (relative) {
                  result[a] += coord[a];
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 'c':
              case 's':

                x1 = coord.x;
                y1 = coord.y;

                if (!control) {
                  control = new Two.Vector();//.copy(coord);
                }

                if (/c/i.test(lower)) {

                  x2 = parseFloat(coords[0]);
                  y2 = parseFloat(coords[1]);
                  x3 = parseFloat(coords[2]);
                  y3 = parseFloat(coords[3]);
                  x4 = parseFloat(coords[4]);
                  y4 = parseFloat(coords[5]);

                } else {

                  // Calculate reflection control point for proper x2, y2
                  // inclusion.

                  reflection = getReflection(coord, control, relative);

                  x2 = reflection.x;
                  y2 = reflection.y;
                  x3 = parseFloat(coords[0]);
                  y3 = parseFloat(coords[1]);
                  x4 = parseFloat(coords[2]);
                  y4 = parseFloat(coords[3]);

                }

                if (relative) {
                  x2 += x1;
                  y2 += y1;
                  x3 += x1;
                  y3 += y1;
                  x4 += x1;
                  y4 += y1;
                }

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 't':
              case 'q':

                x1 = coord.x;
                y1 = coord.y;

                if (!control) {
                  control = new Two.Vector();//.copy(coord);
                }

                if (control.isZero()) {
                  x2 = x1;
                  y2 = y1;
                } else {
                  x2 = control.x;
                  y2 = control.y;
                }

                if (/q/i.test(lower)) {

                  x3 = parseFloat(coords[0]);
                  y3 = parseFloat(coords[1]);
                  x4 = parseFloat(coords[2]);
                  y4 = parseFloat(coords[3]);

                } else {

                  reflection = getReflection(coord, control, relative);

                  x3 = reflection.x;
                  y3 = reflection.y;
                  x4 = parseFloat(coords[0]);
                  y4 = parseFloat(coords[1]);

                }

                if (relative) {
                  x2 += x1;
                  y2 += y1;
                  x3 += x1;
                  y3 += y1;
                  x4 += x1;
                  y4 += y1;
                }

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 'a':

                x1 = coord.x;
                y1 = coord.y;

                var rx = parseFloat(coords[0]);
                var ry = parseFloat(coords[1]);
                var xAxisRotation = parseFloat(coords[2]);// * PI / 180;
                var largeArcFlag = parseFloat(coords[3]);
                var sweepFlag = parseFloat(coords[4]);

                x4 = parseFloat(coords[5]);
                y4 = parseFloat(coords[6]);

                if (relative) {
                  x4 += x1;
                  y4 += y1;
                }

                var anchor = new Two.Anchor(x4, y4);
                anchor.command = Two.Commands.arc;
                anchor.rx = rx;
                anchor.ry = ry;
                anchor.xAxisRotation = xAxisRotation;
                anchor.largeArcFlag = largeArcFlag;
                anchor.sweepFlag = sweepFlag;

                result = anchor;

                coord = anchor;
                control = undefined;

                break;

            }

            if (result) {
              if (_.isArray(result)) {
                points = points.concat(result);
              } else {
                points.push(result);
              }
            }

          });

          if (points.length <= 1) {
            return;
          }

          var path = new Two.Path(points, closed, undefined, true).noStroke();
          path.fill = 'black';

          var rect = path.getBoundingClientRect(true);

          // Center objects to stay consistent
          // with the rest of the Two.js API.
          rect.centroid = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };

          _.each(path.vertices, function(v) {
            v.subSelf(rect.centroid);
          });

          path.translation.addSelf(rect.centroid);

          Two.Utils.applySvgAttributes.call(this, node, path, parentStyles);

          return path;

        },

        circle: function(node, parentStyles) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var r = parseFloat(node.getAttribute('r'));

          var circle = new Two.Circle(x, y, r).noStroke();
          circle.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, circle, parentStyles);

          return circle;

        },

        ellipse: function(node, parentStyles) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var width = parseFloat(node.getAttribute('rx'));
          var height = parseFloat(node.getAttribute('ry'));

          var ellipse = new Two.Ellipse(x, y, width, height).noStroke();
          ellipse.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, ellipse, parentStyles);

          return ellipse;

        },

        rect: function(node, parentStyles) {

          var rx = parseFloat(node.getAttribute('rx'));
          var ry = parseFloat(node.getAttribute('ry'));

          if (!_.isNaN(rx) || !_.isNaN(ry)) {
            return Two.Utils.read['rounded-rect'](node);
          }

          var x = parseFloat(node.getAttribute('x')) || 0;
          var y = parseFloat(node.getAttribute('y')) || 0;
          var width = parseFloat(node.getAttribute('width'));
          var height = parseFloat(node.getAttribute('height'));

          var w2 = width / 2;
          var h2 = height / 2;

          var rect = new Two.Rectangle(x + w2, y + h2, width, height)
            .noStroke();
          rect.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, rect, parentStyles);

          return rect;

        },

        'rounded-rect': function(node, parentStyles) {

          var x = parseFloat(node.getAttribute('x')) || 0;
          var y = parseFloat(node.getAttribute('y')) || 0;
          var rx = parseFloat(node.getAttribute('rx')) || 0;
          var ry = parseFloat(node.getAttribute('ry')) || 0;

          var width = parseFloat(node.getAttribute('width'));
          var height = parseFloat(node.getAttribute('height'));

          var w2 = width / 2;
          var h2 = height / 2;
          var radius = new Two.Vector(rx, ry);

          var rect = new Two.RoundedRectangle(x + w2, y + h2, width, height, radius)
            .noStroke();
          rect.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, rect, parentStyles);

          return rect;

        },

        line: function(node, parentStyles) {

          var x1 = parseFloat(node.getAttribute('x1'));
          var y1 = parseFloat(node.getAttribute('y1'));
          var x2 = parseFloat(node.getAttribute('x2'));
          var y2 = parseFloat(node.getAttribute('y2'));

          var line = new Two.Line(x1, y1, x2, y2).noFill();

          Two.Utils.applySvgAttributes.call(this, node, line, parentStyles);

          return line;

        },

        lineargradient: function(node, parentStyles) {

          var x1 = parseFloat(node.getAttribute('x1'));
          var y1 = parseFloat(node.getAttribute('y1'));
          var x2 = parseFloat(node.getAttribute('x2'));
          var y2 = parseFloat(node.getAttribute('y2'));

          var ox = (x2 + x1) / 2;
          var oy = (y2 + y1) / 2;

          var stops = [];
          for (var i = 0; i < node.children.length; i++) {

            var child = node.children[i];

            var offset = parseFloat(child.getAttribute('offset'));
            var color = child.getAttribute('stop-color');
            var opacity = child.getAttribute('stop-opacity');
            var style = child.getAttribute('style');

            if (_.isNull(color)) {
              var matches = style ? style.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/) : false;
              color = matches && matches.length > 1 ? matches[1] : undefined;
            }

            if (_.isNull(opacity)) {
              var matches = style ? style.match(/stop\-opacity\:\s?([0-9\.\-]*)/) : false;
              opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
            }

            stops.push(new Two.Gradient.Stop(offset, color, opacity));

          }

          var gradient = new Two.LinearGradient(x1 - ox, y1 - oy, x2 - ox,
            y2 - oy, stops);

          Two.Utils.applySvgAttributes.call(this, node, gradient, parentStyles);

          return gradient;

        },

        radialgradient: function(node, parentStyles) {

          var cx = parseFloat(node.getAttribute('cx')) || 0;
          var cy = parseFloat(node.getAttribute('cy')) || 0;
          var r = parseFloat(node.getAttribute('r'));

          var fx = parseFloat(node.getAttribute('fx'));
          var fy = parseFloat(node.getAttribute('fy'));

          if (_.isNaN(fx)) {
            fx = cx;
          }

          if (_.isNaN(fy)) {
            fy = cy;
          }

          var ox = abs(cx + fx) / 2;
          var oy = abs(cy + fy) / 2;

          var stops = [];
          for (var i = 0; i < node.children.length; i++) {

            var child = node.children[i];

            var offset = parseFloat(child.getAttribute('offset'));
            var color = child.getAttribute('stop-color');
            var opacity = child.getAttribute('stop-opacity');
            var style = child.getAttribute('style');

            if (_.isNull(color)) {
              var matches = style ? style.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/) : false;
              color = matches && matches.length > 1 ? matches[1] : undefined;
            }

            if (_.isNull(opacity)) {
              var matches = style ? style.match(/stop\-opacity\:\s?([0-9\.\-]*)/) : false;
              opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
            }

            stops.push(new Two.Gradient.Stop(offset, color, opacity));

          }

          var gradient = new Two.RadialGradient(cx - ox, cy - oy, r,
            stops, fx - ox, fy - oy);

          Two.Utils.applySvgAttributes.call(this, node, gradient, parentStyles);

          return gradient;

        }

      },

      /**
       * @name Two.Utils.subdivide
       * @function
       * @param {Number} x1 - x position of first anchor point.
       * @param {Number} y1 - y position of first anchor point.
       * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
       * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
       * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
       * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
       * @param {Number} x4 - x position of second anchor point.
       * @param {Number} y4 - y position of second anchor point.
       * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
       * @returns {Two.Anchor[]} A list of anchor points ordered in between `x1`, `y1` and `x4`, `y4`
       * @description Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

        limit = limit || Two.Utils.Curve.RecursionLimit;
        var amount = limit + 1;

        // TODO: Abstract 0.001 to a limiting variable
        // Don't recurse if the end points are identical
        if (abs(x1 - x4) < 0.001 && abs(y1 - y4) < 0.001) {
          return [new Two.Anchor(x4, y4)];
        }

        var result = [];

        for (var i = 0; i < amount; i++) {
          var t = i / amount;
          var x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
          var y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
          result.push(new Two.Anchor(x, y));
        }

        return result;

      },

      /**
       * @name Two.Utils.getComponentOnCubicBezier
       * @function
       * @param {Number} t - Zero-to-one value describing what percentage to calculate.
       * @param {Number} a - The firt point's component value.
       * @param {Number} b - The first point's bezier component value.
       * @param {Number} c - The second point's bezier component value.
       * @param {Number} d - The second point's component value.
       * @returns {Number} The coordinate value for a specific component along a cubic bezier curve by `t`.
       */
      getComponentOnCubicBezier: function(t, a, b, c, d) {
        var k = 1 - t;
        return (k * k * k * a) + (3 * k * k * t * b) + (3 * k * t * t * c) +
           (t * t * t * d);
      },

      /**
       * @name Two.Utils.getCurveLength
       * @function
       * @param {Number} x1 - x position of first anchor point.
       * @param {Number} y1 - y position of first anchor point.
       * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
       * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
       * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
       * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
       * @param {Number} x4 - x position of second anchor point.
       * @param {Number} y4 - y position of second anchor point.
       * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
       * @returns {Number} The length of a curve.
       * @description Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
       */
      getCurveLength: function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

        // TODO: Better / fuzzier equality check
        // Linear calculation
        if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
          var dx = x4 - x1;
          var dy = y4 - y1;
          return sqrt(dx * dx + dy * dy);
        }

        // Calculate the coefficients of a Bezier derivative.
        var ax = 9 * (x2 - x3) + 3 * (x4 - x1),
          bx = 6 * (x1 + x3) - 12 * x2,
          cx = 3 * (x2 - x1),

          ay = 9 * (y2 - y3) + 3 * (y4 - y1),
          by = 6 * (y1 + y3) - 12 * y2,
          cy = 3 * (y2 - y1);

        var integrand = function(t) {
          // Calculate quadratic equations of derivatives for x and y
          var dx = (ax * t + bx) * t + cx,
            dy = (ay * t + by) * t + cy;
          return sqrt(dx * dx + dy * dy);
        };

        return integrate(
          integrand, 0, 1, limit || Two.Utils.Curve.RecursionLimit
        );

      },

      /**
       * @name Two.Utils.getCurveBoundingBox
       * @function
       * @param {Number} x1 - x position of first anchor point.
       * @param {Number} y1 - y position of first anchor point.
       * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
       * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
       * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
       * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
       * @param {Number} x4 - x position of second anchor point.
       * @param {Number} y4 - y position of second anchor point.
       * @returns {Object} Object contains min and max `x` / `y` bounds.
       * @see {@link https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js#L856}
       */
      getCurveBoundingBox: function(x1, y1, x2, y2, x3, y3, x4, y4) {

        var tvalues = [];
        var bounds = [[], []];
        var a, b, c, t, t1, t2, b2ac, sqrtb2ac;

        for (var i = 0; i < 2; ++i) {
            if (i == 0) {
              b = 6 * x1 - 12 * x2 + 6 * x3;
              a = -3 * x1 + 9 * x2 - 9 * x3 + 3 * x4;
              c = 3 * x2 - 3 * x1;
            } else {
              b = 6 * y1 - 12 * y2 + 6 * y3;
              a = -3 * y1 + 9 * y2 - 9 * y3 + 3 * y4;
              c = 3 * y2 - 3 * y1;
            }
            if (abs(a) < 1e-12) {
              if (abs(b) < 1e-12) {
                continue;
              }
              t = -c / b;
              if (0 < t && t < 1) {
                tvalues.push(t);
              }
              continue;
            }
            b2ac = b * b - 4 * c * a;
            sqrtb2ac = Math.sqrt(b2ac);
            if (b2ac < 0) {
              continue;
            }
            t1 = (-b + sqrtb2ac) / (2 * a);
            if (0 < t1 && t1 < 1) {
              tvalues.push(t1);
            }
            t2 = (-b - sqrtb2ac) / (2 * a);
            if (0 < t2 && t2 < 1) {
              tvalues.push(t2);
            }
        }

        var x, y, j = tvalues.length;
        var jlen = j;
        var mt;

        while (j--) {
          t = tvalues[j];
          mt = 1 - t;
          bounds[0][j] = mt * mt * mt * x1 + 3 * mt * mt * t * x2 + 3 * mt * t * t * x3 + t * t * t * x4;
          bounds[1][j] = mt * mt * mt * y1 + 3 * mt * mt * t * y2 + 3 * mt * t * t * y3 + t * t * t * y4;
        }

        bounds[0][jlen] = x1;
        bounds[1][jlen] = y1;
        bounds[0][jlen + 1] = x4;
        bounds[1][jlen + 1] = y4;
        bounds[0].length = bounds[1].length = jlen + 2;

        return {
          min: { x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1]) },
          max: { x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1]) }
        };

      },

      /**
       * @name Two.Utils.integrate
       * @function
       * @param {Function} f
       * @param {Number} a
       * @param {Number} b
       * @param {Integer} n
       * @description Integration for `getCurveLength` calculations.
       * @see [Paper.js]{@link https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101}
       */
      integrate: function(f, a, b, n) {
        var x = Two.Utils.Curve.abscissas[n - 2],
          w = Two.Utils.Curve.weights[n - 2],
          A = 0.5 * (b - a),
          B = A + a,
          i = 0,
          m = (n + 1) >> 1,
          sum = n & 1 ? w[i++] * f(B) : 0; // Handle odd n
        while (i < m) {
          var Ax = A * x[i];
          sum += w[i++] * (f(B + Ax) + f(B - Ax));
        }
        return A * sum;
      },

      /**
       * @name Two.Utils.getCurveFromPoints
       * @function
       * @param {Two.Anchor[]} points
       * @param {Boolean} closed
       * @description Sets the bezier handles on `Two.Anchor`s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.
       */
      getCurveFromPoints: function(points, closed) {

        var l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var point = points[i];

          if (!_.isObject(point.controls)) {
            Two.Anchor.AppendCurveProperties(point);
          }

          var prev = closed ? mod(i - 1, l) : max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          b.command = i === 0 ? Two.Commands.move : Two.Commands.curve;

        }

      },

      /**
       * @name Two.Utils.getControlPoints
       * @function
       * @param {Two.Anchor} a
       * @param {Two.Anchor} b
       * @param {Two.Anchor} c
       * @returns {Two.Anchor} Returns the passed middle point `b`.
       * @description Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
       */
      getControlPoints: function(a, b, c) {

        var a1 = Two.Vector.angleBetween(a, b);
        var a2 = Two.Vector.angleBetween(c, b);

        var d1 = Two.Vector.distanceBetween(a, b);
        var d2 = Two.Vector.distanceBetween(c, b);

        var mid = (a1 + a2) / 2;

        // TODO: Issue 73
        if (d1 < 0.0001 || d2 < 0.0001) {
          if (_.isBoolean(b.relative) && !b.relative) {
            b.controls.left.copy(b);
            b.controls.right.copy(b);
          }
          return b;
        }

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        b.controls.left.x = cos(mid) * d1;
        b.controls.left.y = sin(mid) * d1;

        mid -= PI;

        b.controls.right.x = cos(mid) * d2;
        b.controls.right.y = sin(mid) * d2;

        if (_.isBoolean(b.relative) && !b.relative) {
          b.controls.left.x += b.x;
          b.controls.left.y += b.y;
          b.controls.right.x += b.x;
          b.controls.right.y += b.y;
        }

        return b;

      },

      /**
       * @name Two.Utils.getReflection
       * @function
       * @param {Two.Vector} a
       * @param {Two.Vector} b
       * @param {Boolean} [relative=false]
       * @returns {Two.Vector} New `Two.Vector` that represents the reflection point.
       * @description Get the reflection of a point `b` about point `a`. Where `a` is in absolute space and `b` is relative to `a`.
       * @see {@link http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes}
       */
      getReflection: function(a, b, relative) {

        return new Two.Vector(
          2 * a.x - (b.x + a.x) - (relative ? a.x : 0),
          2 * a.y - (b.y + a.y) - (relative ? a.y : 0)
        );

      },

      /**
       * @name Two.Utils.getAnchorsFromArcData
       * @function
       * @param {Two.Vector} center
       * @param {Radians} xAxisRotation
       * @param {Number} rx - x radius
       * @param {Number} ry - y radius
       * @param {Radians} ts
       * @param {Radians} td
       * @param {Boolean} [ccw=false] - Set path traversal to counter-clockwise
       */
      getAnchorsFromArcData: function(center, xAxisRotation, rx, ry, ts, td, ccw) {

        var matrix = new Two.Matrix()
          .translate(center.x, center.y)
          .rotate(xAxisRotation);

        var l = Two.Resolution;

        return _.map(_.range(l), function(i) {

          var pct = (i + 1) / l;
          if (!!ccw) {
            pct = 1 - pct;
          }

          var theta = pct * td + ts;
          var x = rx * Math.cos(theta);
          var y = ry * Math.sin(theta);

          // x += center.x;
          // y += center.y;

          var anchor = new Two.Anchor(x, y);
          Two.Anchor.AppendCurveProperties(anchor);
          anchor.command = Two.Commands.line;

          // TODO: Calculate control points here...

          return anchor;

        });

      },

      /**
       * @name Two.Utils.lerp
       * @function
       * @param {Number} a - Start value.
       * @param {Number} b - End value.
       * @param {Number} t - Zero-to-one value describing percentage between a and b.
       * @returns {Number}
       * @description Linear interpolation between two values `a` and `b` by an amount `t`.
       */
      lerp: function(a, b, t) {
        return t * (b - a) + a;
      },

      /**
       * @name Two.Utils.toFixed
       * @function
       * @param {Number} v - Any float
       * @returns {Number} That float trimmed to the third decimal place.
       * @description A pretty fast toFixed(3) alternative.
       * @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
       */
      toFixed: function(v) {
        return Math.floor(v * 1000) / 1000;
      },

      /**
       * @name Two.Utils.mod
       * @param {Number} v - The value to modulo
       * @param {Number} l - The value to modulo by
       * @returns {Number}
       * @description Modulo with added functionality to handle negative values in a positive manner.
       */
      mod: function(v, l) {

        while (v < 0) {
          v += l;
        }

        return v % l;

      },

      /**
       * @name Two.Utils.Collection
       * @class
       * @extends Two.Utils.Events
       * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
       */
      Collection: function() {

        Array.call(this);

        if (arguments.length > 1) {
          Array.prototype.push.apply(this, arguments);
        } else if (arguments[0] && Array.isArray(arguments[0])) {
          Array.prototype.push.apply(this, arguments[0]);
        }

      },

      /**
       * @name Two.Utils.Error
       * @class
       * @description Custom error throwing for Two.js specific identification.
       */
      Error: function(message) {
        this.name = 'two.js';
        this.message = message;
      },

      /**
       * @name Two.Utils.Events
       * @interface
       * @description Object inherited by many Two.js objects in order to facilitate custom events.
       */
      Events: {

        /**
         * @name Two.Utils.Events.on
         * @function
         * @param {String} name - The name of the event to bind a function to.
         * @param {Function} handler - The function to be invoked when the event is dispatched.
         * @description Call to add a listener to a specific event name.
         */
        on: function(name, handler) {

          this._events || (this._events = {});
          var list = this._events[name] || (this._events[name] = []);

          list.push(handler);

          return this;

        },

        /**
         * @name Two.Utils.Events.off
         * @function
         * @param {String} [name] - The name of the event intended to be removed.
         * @param {Function} [handler] - The handler intended to be reomved.
         * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
         */
        off: function(name, handler) {

          if (!this._events) {
            return this;
          }
          if (!name && !handler) {
            this._events = {};
            return this;
          }

          var names = name ? [name] : _.keys(this._events);
          for (var i = 0, l = names.length; i < l; i++) {

            var name = names[i];
            var list = this._events[name];

            if (!!list) {
              var events = [];
              if (handler) {
                for (var j = 0, k = list.length; j < k; j++) {
                  var ev = list[j];
                  ev = ev.handler ? ev.handler : ev;
                  if (handler && handler !== ev) {
                    events.push(ev);
                  }
                }
              }
              this._events[name] = events;
            }
          }

          return this;
        },

        /**
         * @name Two.Utils.Events.trigger
         * @function
         * @param {String} name - The name of the event to dispatch.
         * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
         * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
         */
        trigger: function(name) {
          if (!this._events) return this;
          var args = slice.call(arguments, 1);
          var events = this._events[name];
          if (events) trigger(this, events, args);
          return this;
        },

        listen: function(obj, name, handler) {

          var bound = this;

          if (obj) {

            var event = function () {
              handler.apply(bound, arguments);
            };

            // Add references about the object that assigned this listener
            event.obj = obj;
            event.name = name;
            event.handler = handler;

            obj.on(name, ev);

          }

          return this;

        },

        ignore: function(obj, name, handler) {

          obj.off(name, handler);
          return this;

        }

      }

    })

  });

  /**
   * @name Two.Utils.Events.bind
   * @borrows Two.Utils.Events.on as Two.Utils.Events.bind
   */
  Two.Utils.Events.bind = Two.Utils.Events.on;

  /**
   * @name Two.Utils.Events.unbind
   * @borrows Two.Utils.Events.off as Two.Utils.Events.unbind
   */
  Two.Utils.Events.unbind = Two.Utils.Events.off;

  var trigger = function(obj, events, args) {
    var method;
    switch (args.length) {
    case 0:
      method = function(i) {
        events[i].call(obj, args[0]);
      };
      break;
    case 1:
      method = function(i) {
        events[i].call(obj, args[0], args[1]);
      };
      break;
    case 2:
      method = function(i) {
        events[i].call(obj, args[0], args[1], args[2]);
      };
      break;
    case 3:
      method = function(i) {
        events[i].call(obj, args[0], args[1], args[2], args[3]);
      };
      break;
    default:
      method = function(i) {
        events[i].apply(obj, args);
      };
    }
    for (var i = 0; i < events.length; i++) {
      method(i);
    }
  };

  Two.Utils.Error.prototype = new Error();
  Two.Utils.Error.prototype.constructor = Two.Utils.Error;

  Two.Utils.Collection.prototype = new Array();
  Two.Utils.Collection.prototype.constructor = Two.Utils.Collection;

  _.extend(Two.Utils.Collection.prototype, Two.Utils.Events, {

    pop: function() {
      var popped = Array.prototype.pop.apply(this, arguments);
      this.trigger(Two.Events.remove, [popped]);
      return popped;
    },

    shift: function() {
      var shifted = Array.prototype.shift.apply(this, arguments);
      this.trigger(Two.Events.remove, [shifted]);
      return shifted;
    },

    push: function() {
      var pushed = Array.prototype.push.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return pushed;
    },

    unshift: function() {
      var unshifted = Array.prototype.unshift.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return unshifted;
    },

    splice: function() {
      var spliced = Array.prototype.splice.apply(this, arguments);
      var inserted;

      this.trigger(Two.Events.remove, spliced);

      if (arguments.length > 2) {
        inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
        this.trigger(Two.Events.insert, inserted);
        this.trigger(Two.Events.order);
      }
      return spliced;
    },

    sort: function() {
      Array.prototype.sort.apply(this, arguments);
      this.trigger(Two.Events.order);
      return this;
    },

    reverse: function() {
      Array.prototype.reverse.apply(this, arguments);
      this.trigger(Two.Events.order);
      return this;
    }

  });

  // Localize utils

  var getAnchorsFromArcData = Two.Utils.getAnchorsFromArcData,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    solveSegmentIntersection = Two.Utils.solveSegmentIntersection,
    decoupleShapes = Two.Utils.decoupleShapes,
    mod = Two.Utils.mod,
    getBackingStoreRatio = Two.Utils.getBackingStoreRatio,
    getComponentOnCubicBezier = Two.Utils.getComponentOnCubicBezier,
    getCurveLength = Two.Utils.getCurveLength,
    integrate = Two.Utils.integrate,
    getReflection = Two.Utils.getReflection;

  _.extend(Two.prototype, Two.Utils.Events, {

    constructor: Two,

    /**
     * @name Two#appendTo
     * @function
     * @param {Element} elem - The DOM element to append the Two.js stage to.
     * @description Shorthand method to append your instance of Two.js to the `document`.
     */
    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    /**
     * @name Two#play
     * @function
     * @fires `Two.Events.play` event
     * @description Call to start an internal animation loop.
     * @nota-bene This function initiates a `requestAnimationFrame` loop.
     */
    play: function() {

      Two.Utils.setPlaying.call(this, true);
      raf.init();
      return this.trigger(Two.Events.play);

    },

    /**
     * @name Two#pause
     * @function
     * @fires `Two.Events.pause` event
     * @description Call to stop the internal animation loop for a specific instance of Two.js.
     */
    pause: function() {

      this.playing = false;
      return this.trigger(Two.Events.pause);

    },

    /**
     * @name Two#update
     * @fires `Two.Events.update` event
     * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
     * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
     */
    update: function() {

      var animated = !!this._lastFrame;
      var now = perf.now();

      if (animated) {
        this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
      }
      this._lastFrame = now;

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height, this.ratio);
      }

      this.trigger(Two.Events.update, this.frameCount, this.timeDelta);

      return this.render();

    },

    /**
     * @name Two#render
     * @fires `Two.Events.render` event
     * @description Render all drawable and visible objects of the scene.
     */
    render: function() {

      this.renderer.render();
      return this.trigger(Two.Events.render, this.frameCount++);

    },

    // Convenience Methods

    /**
     * @name Two#add
     * @function
     * @param {(Two.Shape[]|...Two.Shape)}} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
     * @description A shorthand method to add specific Two.js objects to the scene.
     */
    add: function(o) {

      var objects = o;
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      }

      this.scene.add(objects);
      return this;

    },

    /**
     * @name Two#remove
     * @function
     * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects.
     * @description A shorthand method to remove specific Two.js objects from the scene.
     */
    remove: function(o) {

      var objects = o;
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      }

      this.scene.remove(objects);

      return this;

    },

    /**
     * @name Two#clear
     * @function
     * @description Remove all all Two.js objects from the scene.
     */
    clear: function() {

      this.scene.remove(this.scene.children);
      return this;

    },

    /**
     * @name Two#makeLine
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Two.Line}
     * @description Creates a Two.js line and adds it to the scene.
     */
    makeLine: function(x1, y1, x2, y2) {

      var line = new Two.Line(x1, y1, x2, y2);
      this.scene.add(line);

      return line;

    },

    /**
     * @name Two#makeRectangle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @returns {Two.Rectangle}
     * @description Creates a Two.js rectangle and adds it to the scene.
     */
    makeRectangle: function(x, y, width, height) {

      var rect = new Two.Rectangle(x, y, width, height);
      this.scene.add(rect);

      return rect;

    },

    /**
     * @name Two#makeRoundedRectangle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {Number} sides
     * @returns {Two.Rectangle}
     * @description Creates a Two.js rounded rectangle and adds it to the scene.
     */
    makeRoundedRectangle: function(x, y, width, height, sides) {

      var rect = new Two.RoundedRectangle(x, y, width, height, sides);
      this.scene.add(rect);

      return rect;

    },

    /**
     * @name Two#makeCircle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @returns {Two.Circle}
     * @description Creates a Two.js circle and adds it to the scene.
     */
    makeCircle: function(x, y, radius) {

      var circle = new Two.Circle(x, y, radius);
      this.scene.add(circle);

      return circle;

    },

    /**
     * @name Two#makeEllipse
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} rx
     * @param {Number} ry
     * @returns {Two.Ellipse}
     * @description Creates a Two.js ellipse and adds it to the scene.
     */
    makeEllipse: function(x, y, rx, ry) {

      var ellipse = new Two.Ellipse(x, y, rx, ry);
      this.scene.add(ellipse);

      return ellipse;

    },

    /**
     * @name Two#makeStar
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} outerRadius
     * @param {Number} innerRadius
     * @param {Number} sides
     * @returns {Two.Star}
     * @description Creates a Two.js star and adds it to the scene.
     */
    makeStar: function(ox, oy, outerRadius, innerRadius, sides) {

      var star = new Two.Star(ox, oy, outerRadius, innerRadius, sides);
      this.scene.add(star);

      return star;

    },

    /**
     * @name Two#makeCurve
     * @function
     * @param {Two.Anchor[]} [points] - An array of `Two.Anchor` points.
     * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into `Two.Anchor`s for use in the path.
     * @returns {Two.Path} - Where `path.curved` is set to `true`.
     * @description Creates a Two.js path that is curved and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makeCurve: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Anchor(x, y));
        }
      }

      var last = arguments[l - 1];
      var curve = new Two.Path(points, !(_.isBoolean(last) ? last : undefined), true);
      var rect = curve.getBoundingClientRect();
      curve.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

      this.scene.add(curve);

      return curve;

    },

    /**
     * @name Two#makePolygon
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @param {Number} sides
     * @returns {Two.Polygon}
     * @description Creates a Two.js polygon and adds it to the scene.
     */
    makePolygon: function(x, y, radius, sides) {

      var poly = new Two.Polygon(x, y, radius, sides);
      this.scene.add(poly);

      return poly;

    },

    /**
     * @name Two#makeArcSegment
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} innerRadius
     * @param {Number} outerRadius
     * @param {Number} startAngle
     * @param {Number} endAngle
     * @param {Number} [resolution=Two.Resolution] - The number of vertices that should comprise the arc segment.
     */
    makeArcSegment: function(ox, oy, ir, or, sa, ea, res) {
      var arcSegment = new Two.ArcSegment(ox, oy, ir, or, sa, ea, res);
      this.scene.add(arcSegment);
      return arcSegment;
    },

    /**
     * @name Two#makePath
     * @function
     * @param {Two.Anchor[]} [points] - An array of `Two.Anchor` points.
     * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into `Two.Anchor`s for use in the path.
     * @returns {Two.Path}
     * @description Creates a Two.js path and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makePath: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Anchor(x, y));
        }
      }

      var last = arguments[l - 1];
      var path = new Two.Path(points, !(_.isBoolean(last) ? last : undefined));
      var rect = path.getBoundingClientRect();
      path.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

      this.scene.add(path);

      return path;

    },

    /**
     * @name Two#makeText
     * @function
     * @param {String} message
     * @param {Number} x
     * @param {Number} y
     * @param {Object} [styles] - An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc..
     * @returns {Two.Text}
     * @description Creates a Two.js text object and adds it to the scene.
     */
    makeText: function(message, x, y, styles) {
      var text = new Two.Text(message, x, y, styles);
      this.add(text);
      return text;
    },

    /**
     * @name Two#makeLinearGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {...Two.Stop} [stops] - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {Two.LinearGradient}
     * @description Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeLinearGradient: function(x1, y1, x2, y2 /* stops */) {

      var stops = slice.call(arguments, 4);
      var gradient = new Two.LinearGradient(x1, y1, x2, y2, stops);

      this.add(gradient);

      return gradient;

    },

    /**
     * @name Two#makeRadialGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} radius
     * @param {...Two.Stop} [stops] - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {Two.RadialGradient}
     * @description Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeRadialGradient: function(x1, y1, r /* stops */) {

      var stops = slice.call(arguments, 3);
      var gradient = new Two.RadialGradient(x1, y1, r, stops);

      this.add(gradient);

      return gradient;

    },

    /**
     * @name Two#makeSprite
     * @function
     * @param {(String|Two.Texture)} pathOrTexture - The URL path to an image or an already created `Two.Texture`.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [columns=1]
     * @param {Number} [rows=1]
     * @param {Integer} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {Two.Sprite}
     * @description Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
     */
    makeSprite: function(path, x, y, cols, rows, frameRate, autostart) {

      var sprite = new Two.Sprite(path, x, y, cols, rows, frameRate);
      if (!!autostart) {
        sprite.play();
      }
      this.add(sprite);

      return sprite;

    },

    /**
     * @name Two#makeImageSequence
     * @function
     * @param {(String[]|Two.Texture[])} pathsOrTextures - An array of paths or of `Two.Textures`.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {Two.ImageSequence}
     * @description Creates a Two.js image sequence object and adds it to the scene.
     */
    makeImageSequence: function(paths, x, y, frameRate, autostart) {

      var imageSequence = new Two.ImageSequence(paths, x, y, frameRate);
      if (!!autostart) {
        imageSequence.play();
      }
      this.add(imageSequence);

      return imageSequence;

    },

    /**
     * @name Two#makeTexture
     * @function
     * @param {(String|Image|Canvas|Video)} [pathOrSource] - The URL path to an image or a DOM image-like element.
     * @param {Function} [callback] - Function to be invoked when the image is loaded.
     * @returns {Two.Texture}
     * @description Creates a Two.js texture object.
     */
    makeTexture: function(path, callback) {

      var texture = new Two.Texture(path, callback);
      return texture;

    },

    /**
     * @name Two#makeGroup
     * @function
     * @param {(Two.Shape[]|...Two.Shape)} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
     * @returns {Two.Group}
     * @description Creates a Two.js group object and adds it to the scene.
     */
    makeGroup: function(o) {

      var objects = o;
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      }

      var group = new Two.Group();
      this.scene.add(group);
      group.add(objects);

      return group;

    },

    /**
     * @name Two#interpret
     * @function
     * @param {SvgNode} svgNode - The SVG node to be parsed.
     * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
     * @param {Boolean} add – Automatically add the reconstructed SVG node to scene.
     * @returns {Two.Group}
     * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js — this is slightly different than a direct transcription.
     */
    interpret: function(svgNode, shallow, add) {

      var tag = svgNode.tagName.toLowerCase(),
          add = (typeof add !== 'undefined') ? add : true;

      if (!(tag in Two.Utils.read)) {
        return null;
      }

      var node = Two.Utils.read[tag].call(this, svgNode);

      if (!!add) {
        this.add(shallow && node instanceof Two.Group ? node.children : node);
      }

      return node;

    },

    /**
     * @name Two#load
     * @function
     * @param {String} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
     * @param {Function} callback - Function to call once loading has completed.
     * @returns {Two.Group}
     * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
     */
    load: function(text, callback) {

      var group = new Two.Group();
      var elem, i, j;

      var attach = _.bind(function(data) {

        dom.temp.innerHTML = data;

        for (i = 0; i < dom.temp.children.length; i++) {
          elem = dom.temp.children[i];
          if (/svg/i.test(elem.nodeName)) {
            // Two.Utils.applySvgViewBox.call(this, group, elem.getAttribute('viewBox'));
            for (j = 0; j < elem.children.length; j++) {
              group.add(this.interpret(elem.children[j]));
            }
          } else {
            group.add(this.interpret(elem));
          }
        }

        if (_.isFunction(callback)) {
          var svg = dom.temp.children.length <= 1
            ? dom.temp.children[0] : dom.temp.children;
          callback(group, svg);
        }

      }, this);

      if (/.*\.svg$/ig.test(text)) {

        Two.Utils.xhr(text, attach);

        return group;

      }

      attach(text);

      return group;

    }

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height, this.ratio);

  }

  function updateDimensions(width, height) {
    this.width = width;
    this.height = height;
    this.trigger(Two.Events.resize, width, height);
  }

  // Request Animation Frame

  var raf = dom.getRequestAnimationFrame();

  function loop() {

    for (var i = 0; i < Two.Instances.length; i++) {
      var t = Two.Instances[i];
      if (t.playing) {
        t.update();
      }
    }

    Two.nextFrameID = raf(loop);

  }

  if (typeof define === 'function' && define.amd) {
    define('two', [], function() {
      return Two;
    });
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Two;
  }

  return Two;

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;

  /**
   * @name Two.Registry
   * @class
   * @description An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
   */
  var Registry = Two.Registry = function() {

    this.map = {};

  };

  _.extend(Registry.prototype, {

    constructor: Registry,

    /**
     * @name Two.Registry#add
     * @function
     * @param {String} id - A unique identifier.
     * @param value - Any type of variable to be registered to the directory.
     * @description Adds any value to the directory. Assigned by the `id`.
     */
    add: function(id, obj) {
      this.map[id] = obj;
      return this;
    },

    /**
     * @name Two.Registry#remove
     * @function
     * @param {String} id - A unique identifier.
     * @description Remove any value from the directory by its `id`.
     */
    remove: function(id) {
      delete this.map[id];
      return this;
    },

    /**
     * @name Two.Registry#get
     * @function
     * @param {String} id - A unique identifier.
     * @returns value - The associated value. If unavailable then `undefined` is returned.
     * @description Get a registered value by its `id`.
     */
    get: function(id) {
      return this.map[id];
    },

    /**
     * @name Two.Registry#contains
     * @function
     * @param {String} id - A unique identifier.
     * @returns {Boolean}
     * @description Convenience method to see if a value is registered to an `id` already.
     */
    contains: function(id) {
      return id in this.map;
    }

  });

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;

  /**
   * @name Two.Vector
   * @class
   * @param {Number} [x=0] - Any number to represent the horizontal x-component of the vector.
   * @param {Number} [y=0] - Any number to represent the vertical y-component of the vector.
   * @description A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
   */
  var Vector = Two.Vector = function(x, y) {

    /**
     * @name Two.Vector#x
     * @property {Number} - The horizontal x-component of the vector.
     */
    this.x = x || 0;

    /**
     * @name Two.Vector#y
     * @property {Number} - The vertical y-component of the vector.
     */
    this.y = y || 0;

  };

  _.extend(Vector, {

    /**
     * @name Two.Vector.zero
     * @readonly
     * @property {Two.Vector} - Handy reference to a vector with component values 0, 0 at all times.
     */
    zero: new Two.Vector(),

    /**
     * @name Two.Vector.add
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Two.Vector}
     * @description Add two vectors together.
     */
    add: function(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    },

    /**
     * @name Two.Vector.sub
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Two.Vector}
     * @description Subtract two vectors: `v2` from `v1`.
     */
    sub: function(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    },

    /**
     * @name Two.Vector.subtract
     * @borrows Two.Vector.sub as Two.Vector.subtract
     */
    subtract: function(v1, v2) {
      return Vector.sub(v1, v2);
    },

    /**
     * @name Two.Vector.ratioBetween
     * @function
     * @param {Two.Vector} A
     * @param {Two.Vector} B
     * @returns {Number} The ratio betwen two points `v1` and `v2`.
     */
    ratioBetween: function(v1, v2) {

      return (v1.x * v2.x + v1.y * v2.y) / (v1.length() * v2.length());

    },

    /**
     * @name Two.Vector.angleBetween
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Radians} The angle between points `v1` and `v2`.
     */
    angleBetween: function(v1, v2) {

      var dx, dy;

      if (arguments.length >= 4) {

        dx = arguments[0] - arguments[2];
        dy = arguments[1] - arguments[3];

        return Math.atan2(dy, dx);

      }

      dx = v1.x - v2.x;
      dy = v1.y - v2.y;

      return Math.atan2(dy, dx);

    },

    /**
     * @name Two.Vector.distanceBetween
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Number} The distance between points `v1` and `v2`. Distance is always positive.
     */
    distanceBetween: function(v1, v2) {

      return Math.sqrt(Vector.distanceBetweenSquared(v1, v2));

    },

    /**
     * @name Two.Vector.distanceBetweenSquared
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Number} The squared distance between points `v1` and `v2`.
     */
    distanceBetweenSquared: function(v1, v2) {

      var dx = v1.x - v2.x;
      var dy = v1.y - v2.y;

      return dx * dx + dy * dy;

    },

    /**
     * @name Two.Vector.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a `Two.Vector` to any object. Handy if you'd like to extend the `Two.Vector` class on a custom class.
     */
    MakeObservable: function(object) {

      // /**
      //  * Override Backbone bind / on in order to add properly broadcasting.
      //  * This allows Two.Vector to not broadcast events unless event listeners
      //  * are explicity bound to it.
      //  */

      object.bind = object.on = function() {

        if (!this._bound) {
          this._x = this.x;
          this._y = this.y;
          Object.defineProperty(this, 'x', xgs);
          Object.defineProperty(this, 'y', ygs);
          _.extend(this, BoundProto);
          this._bound = true; // Reserved for event initialization check
        }

        Two.Utils.Events.bind.apply(this, arguments);

        return this;

      };

    }

  });

  _.extend(Vector.prototype, Two.Utils.Events, {

    constructor: Vector,

    /**
     * @name Two.Vector#set
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Set the x / y components of a vector to specific number values.
     */
    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    /**
     * @name Two.Vector#copy
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Copy the x / y components of another object `v`.
     */
    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },

    /**
     * @name Two.Vector#clear
     * @function
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Set the x / y component values of the vector to zero.
     */
    clear: function() {
      this.x = 0;
      this.y = 0;
      return this;
    },

    /**
     * @name Two.Vector#clone
     * @function
     * @returns {Two.Vector} - A new instance of `Two.Vector`.
     * @description Create a new vector and copy the existing values onto the newly created instance.
     */
    clone: function() {
      return new Vector(this.x, this.y);
    },

    /**
     * @name Two.Vector#add
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Add an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Add the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Add `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    add: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x += x;
          this.y += x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x += x.x;
          this.y += x.y;
        }
      } else {
        this.x += x;
        this.y += y;
      }
      return this;
    },

    /**
     * @name Two.Vector#addSelf
     * @borrows Two.Vector#add as Two.Vector#addSelf
     */
    addSelf: function(v) {
      return this.add.apply(this, arguments);
    },

    /**
     * @name Two.Vector#sub
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Subtract an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Subtract the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Subtract `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    sub: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x -= x;
          this.y -= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x -= x.x;
          this.y -= x.y;
        }
      } else {
        this.x -= x;
        this.y -= y;
      }
      return this;
    },

    /**
     * @name Two.Vector#subtract
     * @borrows Two.Vector#sub as Two.Vector#subtract
     */
    subtract: function() {
      return this.sub.apply(this, arguments);
    },

    /**
     * @name Two.Vector#subSelf
     * @borrows Two.Vector#sub as Two.Vector#subSelf
     */
    subSelf: function(v) {
      return this.sub.apply(this, arguments);
    },

    /**
     * @name Two.Vector#subtractSelf
     * @borrows Two.Vector#sub as Two.Vector#subtractSelf
     */
    subtractSelf: function(v) {
      return this.sub.apply(this, arguments);
    },

    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Multiply an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Multiply the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Multiply `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    multiply: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x *= x;
          this.y *= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x *= x.x;
          this.y *= x.y;
        }
      } else {
        this.x *= x;
        this.y *= y;
      }
      return this;
    },

    /**
     * @name Two.Vector#multiplySelf
     * @borrows Two.Vector#multiply as Two.Vector#multiplySelf
     */
    multiplySelf: function(v) {
      return this.multiply.apply(this, arguments);
    },

    /**
     * @name Two.Vector#multiplyScalar
     * @function
     * @param {Number} s - The scalar to multiply by.
     * @description Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
     */
    multiplyScalar: function(s) {
      return this.multiply(s);
    },

    /**
     * @name Two.Vector#divide
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Divide an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Divide the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Divide `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    divide: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x /= x;
          this.y /= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x /= x.x;
          this.y /= x.y;
        }
      } else {
        this.x /= x;
        this.y /= y;
      }
      if (_.isNaN(this.x)) {
        this.x = 0;
      }
      if (_.isNaN(this.y)) {
        this.y = 0;
      }
      return this;
    },

    /**
     * @name Two.Vector#divideSelf
     * @borrows Two.Vector#divide as Two.Vector#divideSelf
     */
    divideSelf: function(v) {
      return this.divide.apply(this, arguments);
    },

    /**
     * @name Two.Vector#divideScalar
     * @function
     * @param {Number} s - The scalar to divide by.
     * @description Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
     */
    divideScalar: function(s) {
      return this.divide(s);
    },

    /**
     * @name Two.Vector#negate
     * @function
     * @description Invert each component's sign value.
     */
    negate: function() {
      return this.multiply(-1);
    },

    /**
     * @name Two.Vector#negate
     * @function
     * @returns {Number}
     * @description Get the [dot product]{@link https://en.wikipedia.org/wiki/Dot_product} of the vector.
     */
    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    /**
     * @name Two.Vector#length
     * @function
     * @returns {Number}
     * @description Get the length of a vector.
     */
    length: function() {
      return Math.sqrt(this.lengthSquared());
    },

    /**
     * @name Two.Vector#lengthSquared
     * @function
     * @returns {Number}
     * @description Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length}, because it isn't square-rooting any numbers.
     */
    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },

    /**
     * @name Two.Vector#normalize
     * @function
     * @description Normalize the vector from negative one to one.
     */
    normalize: function() {
      return this.divideScalar(this.length());
    },

    /**
     * @name Two.Vector#distanceTo
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors.
     */
    distanceTo: function(v) {
      return Math.sqrt(this.distanceToSquared(v));
    },

    /**
     * @name Two.Vector#distanceToSquared
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo}, because it isn't square-rooting any numbers.
     */
    distanceToSquared: function(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y;
      return dx * dx + dy * dy;
    },

    /**
     * @name Two.Vector#setLength
     * @function
     * @param {Number} l - length to set vector to.
     * @description Set the length of a vector.
     */
    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    /**
     * @name Two.Vector#equals
     * @function
     * @param {Two.Vector} v - The vector to compare against.
     * @param {Number} [eps=0.0001] - An options epsilon for precision.
     * @returns {Boolean}
     * @description Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
     */
    equals: function(v, eps) {
      eps = (typeof eps === 'undefined') ?  0.0001 : eps;
      return (this.distanceTo(v) < eps);
    },

    /**
     * @name Two.Vector#lerp
     * @function
     * @param {Two.Vector} v - The destination vector to step towards.
     * @param {Number} t - The zero to one value of how close the current vector gets to the destination vector.
     * @description Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
     * @see [Matt DesLauriers]{@link https://twitter.com/mattdesl/status/1031305279227478016} has a good thread about this.
     */
    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },

    /**
     * @name Two.Vector#isZero
     * @function
     * @param {Number} [eps=0.0001] - Optional precision amount to check against.
     * @returns {Boolean}
     * @description Check to see if vector is roughly zero, based on the `epsilon` precision value.
     */
    isZero: function(eps) {
      eps = (typeof eps === 'undefined') ?  0.0001 : eps;
      return (this.length() < eps);
    },

    /**
     * @name Two.Vector#toString
     * @function
     * @returns {String}
     * @description Return a comma-separated string of x, y value. Great for storing in a database.
     */
    toString: function() {
      return this.x + ', ' + this.y;
    },

    /**
     * @name Two.Vector#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the vector.
     */
    toObject: function() {
      return { x: this.x, y: this.y };
    },

    /**
     * @name Two.Vector#rotate
     * @function
     * @param {Radians} radians - The amoun to rotate the vector by.
     * @description Rotate a vector.
     */
    rotate: function(radians) {
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      this.x = this.x * cos - this.y * sin;
      this.y = this.x * sin + this.y * cos;
      return this;
    }

  });

  // The same set of prototypical functions, but using the underlying
  // getter or setter for `x` and `y` values. This set of functions
  // is used instead of the previously documented ones above when
  // Two.Vector#bind is invoked and there is event dispatching processed
  // on x / y property changes.
  var BoundProto = {

    constructor: Vector,

    set: function(x, y) {
      this._x = x;
      this._y = y;
      return this.trigger(Two.Events.change);
    },

    copy: function(v) {
      this._x = v.x;
      this._y = v.y;
      return this.trigger(Two.Events.change);
    },

    clear: function() {
      this._x = 0;
      this._y = 0;
      return this.trigger(Two.Events.change);
    },

    clone: function() {
      return new Vector(this._x, this._y);
    },

    add: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x += x;
          this._y += x;
        }  else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x += x.x;
          this._y += x.y;
        }
      } else {
        this._x += x;
        this._y += y;
      }
      return this.trigger(Two.Events.change);
    },

    sub: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x -= x;
          this._y -= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x -= x.x;
          this._y -= x.y;
        }
      } else {
        this._x -= x;
        this._y -= y;
      }
      return this.trigger(Two.Events.change);
    },

    multiply: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x *= x;
          this._y *= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x *= x.x;
          this._y *= x.y;
        }
      } else {
        this._x *= x;
        this._y *= y;
      }
      return this.trigger(Two.Events.change);
    },

    divide: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x /= x;
          this._y /= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x /= x.x;
          this._y /= x.y;
        }
      } else {
        this._x /= x;
        this._y /= y;
      }
      if (_.isNaN(this._x)) {
        this._x = 0;
      }
      if (_.isNaN(this._y)) {
        this._y = 0;
      }
      return this.trigger(Two.Events.change);
    },

    dot: function(v) {
      return this._x * v.x + this._y * v.y;
    },

    lengthSquared: function() {
      return this._x * this._x + this._y * this._y;
    },

    distanceToSquared: function(v) {
      var dx = this._x - v.x,
          dy = this._y - v.y;
      return dx * dx + dy * dy;
    },

    lerp: function(v, t) {
      var x = (v.x - this._x) * t + this._x;
      var y = (v.y - this._y) * t + this._y;
      return this.set(x, y);
    },

    toString: function() {
      return this._x + ', ' + this._y;
    },

    toObject: function() {
      return { x: this._x, y: this._y };
    },

    rotate: function (radians) {
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      this._x = this._x * cos - this._y * sin;
      this._y = this._x * sin + this._y * cos;
      return this;
    }

  };

  var xgs = {
    enumerable: true,
    get: function() {
      return this._x;
    },
    set: function(v) {
      this._x = v;
      this.trigger(Two.Events.change, 'x');
    }
  };

  var ygs = {
    enumerable: true,
    get: function() {
      return this._y;
    },
    set: function(v) {
      this._y = v;
      this.trigger(Two.Events.change, 'y');
    }
  };

  Vector.MakeObservable(Vector.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  // Localized variables
  var commands = Two.Commands;
  var _ = Two.Utils;

  /**
   * @class
   * @name Two.Anchor
   * @param {Number} [x=0] - The x position of the root anchor point.
   * @param {Number} [y=0] - The y position of the root anchor point.
   * @param {Number} [lx=0] - The x position of the left handle point.
   * @param {Number} [ly=0] - The y position of the left handle point.
   * @param {Number} [rx=0] - The x position of the right handle point.
   * @param {Number} [ry=0] - The y position of the right handle point.
   * @param {String} [command=Two.Commands.move] - The command to describe how to render. Applicable commands are {@link Two.Commands}
   * @extends Two.Vector
   * @description An object that holds 3 `Two.Vector`s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.
   */
  var Anchor = Two.Anchor = function(x, y, lx, ly, rx, ry, command) {

    Two.Vector.call(this, x, y);

    this._broadcast = _.bind(function() {
      this.trigger(Two.Events.change);
    }, this);

    this._command = command || commands.move;
    this._relative = true;

    var ilx = _.isNumber(lx);
    var ily = _.isNumber(ly);
    var irx = _.isNumber(rx);
    var iry = _.isNumber(ry);

    // Append the `controls` object only if control points are specified,
    // keeping the Two.Anchor inline with a Two.Vector until it needs to
    // evolve beyond those functions — e.g: a simple 2 component vector.
    if (ilx || ily || irx || iry) {
      Two.Anchor.AppendCurveProperties(this);
    }

    if (ilx) {
      this.controls.left.x = lx;
    }
    if (ily) {
      this.controls.left.y = ly;
    }
    if (irx) {
      this.controls.right.x = rx;
    }
    if (iry) {
      this.controls.right.y = ry;
    }

  };

  _.extend(Two.Anchor, {

    /**
     * @name Two.Anchor.AppendCurveProperties
     * @function
     * @param {Two.Anchor} anchor - The instance to append the `control`object to.
     * @description Adds the `controls` property as an object with `left` and `right` properties to access the bezier control handles that define how the curve is drawn. It also sets the `relative` property to `true` making vectors in the `controls` object relative to their corresponding root anchor point.
     */
    AppendCurveProperties: function(anchor) {

      anchor.relative = true;

      /**
       * @name Two.Anchor#controls
       * @property {Object} controls
       * @description An plain object that holds the controls handles for a {@link Two.Anchor}.
       */
      anchor.controls = {};

      /**
       * @name Two.Anchor#controls#left
       * @property {Two.Vector} left
       * @description The "left" control point to define handles on a bezier curve.
       */
      anchor.controls.left = new Two.Vector(0, 0);

      /**
       * @name Two.Anchor#controls#right
       * @property {Two.Vector} right
       * @description The "left" control point to define handles on a bezier curve.
       */
      anchor.controls.right = new Two.Vector(0, 0);

    },

    /**
     * @name Two.Anchor.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a `Two.Anchor` to any object. Handy if you'd like to extend the `Two.Anchor` class on a custom class.
     */
    MakeObservable: function(object) {

      /**
       * @name Two.Anchor#command
       * @property {Two.Commands}
       * @description A draw command associated with the anchor point.
       */
      Object.defineProperty(object, 'command', {

        enumerable: true,

        get: function() {
          return this._command;
        },

        set: function(c) {
          this._command = c;
          if (this._command === commands.curve && !_.isObject(this.controls)) {
            Anchor.AppendCurveProperties(this);
          }
          return this.trigger(Two.Events.change);
        }

      });

      /**
       * @name Two.Anchor#relative
       * @property {Boolean}
       * @description A boolean to render control points relative to the root anchor point or in global coordinate-space to the rest of the scene.
       */
      Object.defineProperty(object, 'relative', {

        enumerable: true,

        get: function() {
          return this._relative;
        },

        set: function(b) {
          if (this._relative == b) {
            return this;
          }
          this._relative = !!b;
          return this.trigger(Two.Events.change);
        }

      });

      _.extend(object, Two.Vector.prototype, AnchorProto);

      // Make it possible to bind and still have the Anchor specific
      // inheritance from Two.Vector. In this case relying on `Two.Vector`
      // to do much of the heavy event-listener binding / unbinding.
      object.bind = object.on = function() {
        var bound = this._bound;
        Two.Vector.prototype.bind.apply(this, arguments);
        if (!bound) {
          _.extend(this, AnchorProto);
        }
      };

    }

  });

  var AnchorProto = {

    constructor: Two.Anchor,

    /**
     * @name Two.Anchor#listen
     * @function
     * @description Convenience method used mainly by {@link Two.Path#vertices} to listen and propagate changes from control points up to their respective anchors and further if necessary.
     */
    listen: function() {

      if (!_.isObject(this.controls)) {
        Two.Anchor.AppendCurveProperties(this);
      }

      this.controls.left.bind(Two.Events.change, this._broadcast);
      this.controls.right.bind(Two.Events.change, this._broadcast);

      return this;

    },

    /**
     * @name Two.Anchor#ignore
     * @function
     * @description Convenience method used mainly by {@link Two.Path#vertices} to ignore changes from a specific anchor's control points.
     */
    ignore: function() {

      this.controls.left.unbind(Two.Events.change, this._broadcast);
      this.controls.right.unbind(Two.Events.change, this._broadcast);

      return this;

    },

    /**
     * @name Two.Anchor#copy
     * @function
     * @param {Two.Anchor} v - The anchor to apply values to.
     * @description Copy the properties of one {@link Two.Anchor} onto another.
     */
    copy: function(v) {

      this.x = v.x;
      this.y = v.y;

      if (_.isString(v.command)) {
        this.command = v.command;
      }
      if (_.isObject(v.controls)) {
        if (!_.isObject(this.controls)) {
          Two.Anchor.AppendCurveProperties(this);
        }
        // TODO: Do we need to listen here?
        this.controls.left.copy(v.controls.left);
        this.controls.right.copy(v.controls.right);
      }
      if (_.isBoolean(v.relative)) {
        this.relative = v.relative;
      }

      // TODO: Hack for `Two.Commands.arc`
      if (this.command === Two.Commands.arc) {
        this.rx = v.rx;
        this.ry = v.ry;
        this.xAxisRotation = v.xAxisRotation;
        this.largeArcFlag = v.largeArcFlag;
        this.sweepFlag = v.sweepFlag;
      }

      return this;

    },

    /**
     * @name Two.Anchor#clone
     * @function
     * @returns {Two.Anchor}
     * @description Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
     */
    clone: function() {

      var controls = this.controls;

      var clone = new Two.Anchor(
        this.x,
        this.y,
        controls && controls.left.x,
        controls && controls.left.y,
        controls && controls.right.x,
        controls && controls.right.y,
        this.command
      );
      clone.relative = this._relative;
      return clone;

    },

    /**
     * @name Two.Anchor#toObject
     * @function
     * @returns {Object} - An object with properties filled out to mirror {@link Two.Anchor}.
     * @description Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
     */
    toObject: function() {
      var o = {
        x: this.x,
        y: this.y
      };
      if (this._command) {
        o.command = this._command;
      }
      if (this._relative) {
        o.relative = this._relative;
      }
      if (this.controls) {
        o.controls = {
          left: this.controls.left.toObject(),
          right: this.controls.right.toObject()
        };
      }
      return o;
    },

    /**
     * @name Two.Anchor#toString
     * @function
     * @returns {String} - A String with comma-separated values reflecting the various values on the current instance.
     * @description Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
     */
    toString: function() {
      if (!this.controls) {
        return [this._x, this._y].join(', ');
      }
      return [this._x, this._y, this.controls.left.x, this.controls.left.y,
        this.controls.right.x, this.controls.right.y, this._command,
        this._relative ? 1 : 0].join(', ');
    }

  };

  Two.Anchor.MakeObservable(Two.Anchor.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  // Constants

  var cos = Math.cos, sin = Math.sin, tan = Math.tan;
  var _ = Two.Utils, fix = _.toFixed;
  var array = [];

  /**
   * @name Two.Matrix
   * @class
   * @param {Number} [a=1] - The value for element at the first column and first row.
   * @param {Number} [b=0] - The value for element at the second column and first row.
   * @param {Number} [c=0] - The value for element at the third column and first row.
   * @param {Number} [d=0] - The value for element at the first column and second row.
   * @param {Number} [e=1] - The value for element at the second column and second row.
   * @param {Number} [f=0] - The value for element at the third column and second row.
   * @param {Number} [g=0] - The value for element at the first column and third row.
   * @param {Number} [h=0] - The value for element at the second column and third row.
   * @param {Number} [i=1] - The value for element at the third column and third row.
   * @description A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.
   * @nota-bene Order is based on how to construct transformation strings for the browser.
   */
  var Matrix = Two.Matrix = function(a, b, c, d, e, f) {

    /**
     * @name Two.Matrix#elements
     * @property {Array} - The underlying data stored as an array.
     */
    this.elements = new Two.Array(9);

    var elements = a;
    if (!_.isArray(elements)) {
      elements = _.toArray(arguments);
    }

    // initialize the elements with default values.
    this.identity();

    if (elements.length > 0) {
      this.set(elements);
    }

  };

  _.extend(Matrix, {

    /**
     * @name Two.Matrix.Identity
     * @property {Array} - A stored reference to the default value of a 3 x 3 matrix.
     */
    Identity: [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ],

    /**
     * @name Two.Matrix.Multiply
     * @function
     * @param {Two.Matrix} A
     * @param {Two.Matrix} B
     * @param {Two.Matrix} [C] - An optional matrix to apply the multiplication to.
     * @returns {Two.Matrix} - If an optional `C` matrix isn't passed then a new one is created and returned.
     * @description Multiply two matrices together and return the result.
     */
    Multiply: function(A, B, C) {

      if (B.length <= 3) { // Multiply Vector

        var x, y, z, e = A;

        var a = B[0] || 0,
            b = B[1] || 0,
            c = B[2] || 0;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      C = C || new Two.Array(9);

      C[0] = A0 * B0 + A1 * B3 + A2 * B6;
      C[1] = A0 * B1 + A1 * B4 + A2 * B7;
      C[2] = A0 * B2 + A1 * B5 + A2 * B8;
      C[3] = A3 * B0 + A4 * B3 + A5 * B6;
      C[4] = A3 * B1 + A4 * B4 + A5 * B7;
      C[5] = A3 * B2 + A4 * B5 + A5 * B8;
      C[6] = A6 * B0 + A7 * B3 + A8 * B6;
      C[7] = A6 * B1 + A7 * B4 + A8 * B7;
      C[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return C;

    }

  });

  _.extend(Matrix.prototype, Two.Utils.Events, {

    constructor: Matrix,

    /**
     * @name Two.Matrix#manual
     * @property {Boolean} - Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.
     * @nota-bene - Setting to `true` nullifies {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale}.
     */
    manual: false,

    /**
     * @name Two.Matrix#set
     * @function
     * @param {Number} a - The value for element at the first column and first row.
     * @param {Number} b - The value for element at the second column and first row.
     * @param {Number} c - The value for element at the third column and first row.
     * @param {Number} d - The value for element at the first column and second row.
     * @param {Number} e - The value for element at the second column and second row.
     * @param {Number} f - The value for element at the third column and second row.
     * @param {Number} g - The value for element at the first column and third row.
     * @param {Number} h - The value for element at the second column and third row.
     * @param {Number} i - The value for element at the third column and third row.
     * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
     */

     /**
      * @name Two.Matrix#set
      * @function
      * @param {Number[]} a - The array of elements to apply.
      * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
      */
    set: function(a) {

      var elements = a;
      if (arguments.length > 1) {
        elements = _.toArray(arguments);
      }

      this.elements[0] = elements[0];
      this.elements[1] = elements[1];
      this.elements[2] = elements[2];
      this.elements[3] = elements[3];
      this.elements[4] = elements[4];
      this.elements[5] = elements[5];
      this.elements[6] = elements[6];
      this.elements[7] = elements[7];
      this.elements[8] = elements[8];

      return this.trigger(Two.Events.change);

    },

    /**
     * @name Two.Matrix#identity
     * @function
     * @description Turn matrix to the identity, like resetting.
     */
    identity: function() {

      this.elements[0] = Matrix.Identity[0];
      this.elements[1] = Matrix.Identity[1];
      this.elements[2] = Matrix.Identity[2];
      this.elements[3] = Matrix.Identity[3];
      this.elements[4] = Matrix.Identity[4];
      this.elements[5] = Matrix.Identity[5];
      this.elements[6] = Matrix.Identity[6];
      this.elements[7] = Matrix.Identity[7];
      this.elements[8] = Matrix.Identity[8];

      return this.trigger(Two.Events.change);

    },

    /**
     * @name Two.Matrix.multiply
     * @function
     * @param {Number} a - The scalar to be multiplied.
     * @description Multiply all components of the matrix against a single scalar value.
     */

    /**
     * @name Two.Matrix.multiply
     * @function
     * @param {Number} a - The x component to be multiplied.
     * @param {Number} b - The y component to be multiplied.
     * @param {Number} c - The z component to be multiplied.
     * @description Multiply all components of a matrix against a 3 component vector.
     */

    /**
     * @name Two.Matrix.multiply
     * @function
     * @param {Number} a - The value at the first column and first row of the matrix to be multiplied.
     * @param {Number} b - The value at the second column and first row of the matrix to be multiplied.
     * @param {Number} c - The value at the third column and first row of the matrix to be multiplied.
     * @param {Number} d - The value at the first column and second row of the matrix to be multiplied.
     * @param {Number} e - The value at the second column and second row of the matrix to be multiplied.
     * @param {Number} f - The value at the third column and second row of the matrix to be multiplied.
     * @param {Number} g - The value at the first column and third row of the matrix to be multiplied.
     * @param {Number} h - The value at the second column and third row of the matrix to be multiplied.
     * @param {Number} i - The value at the third column and third row of the matrix to be multiplied.
     * @description Multiply all components of a matrix against another matrix.
     */
    multiply: function(a, b, c, d, e, f, g, h, i) {

      var elements = arguments, l = elements.length;

      // Multiply scalar

      if (l <= 1) {

        this.elements[0] *= a;
        this.elements[1] *= a;
        this.elements[2] *= a;
        this.elements[3] *= a;
        this.elements[4] *= a;
        this.elements[5] *= a;
        this.elements[6] *= a;
        this.elements[7] *= a;
        this.elements[8] *= a;

        return this.trigger(Two.Events.change);

      }

      if (l <= 3) { // Multiply Vector

        var x, y, z;
        a = a || 0;
        b = b || 0;
        c = c || 0;
        e = this.elements;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      // Multiple matrix

      var A = this.elements;
      var B = elements;

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;

      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;

      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return this.trigger(Two.Events.change);

    },

    /**
     * @name Two.Matrix#inverse
     * @function
     * @param {Two.Matrix} [out] - The optional matrix to apply the inversion to.
     * @description Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
     */
    inverse: function(out) {

      var a = this.elements;
      out = out || new Two.Matrix();

      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];

      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20;

      // Calculate the determinant
      var det = a00 * b01 + a01 * b11 + a02 * b21;

      if (!det) {
        return null;
      }

      det = 1.0 / det;

      out.elements[0] = b01 * det;
      out.elements[1] = (-a22 * a01 + a02 * a21) * det;
      out.elements[2] = (a12 * a01 - a02 * a11) * det;
      out.elements[3] = b11 * det;
      out.elements[4] = (a22 * a00 - a02 * a20) * det;
      out.elements[5] = (-a12 * a00 + a02 * a10) * det;
      out.elements[6] = b21 * det;
      out.elements[7] = (-a21 * a00 + a01 * a20) * det;
      out.elements[8] = (a11 * a00 - a01 * a10) * det;

      return out;

    },

    /**
     * @name Two.Matrix#scale
     * @function
     * @param {Number} scale - The one dimensional scale to apply to the matrix.
     * @description Uniformly scale the transformation matrix.
     */

    /**
     * @name Two.Matrix#scale
     * @function
     * @param {Number} sx - The horizontal scale factor.
     * @param {Number} sy - The vertical scale factor
     * @description Scale the transformation matrix in two dimensions.
     */
    scale: function(sx, sy) {

      var l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }

      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#rotate
     * @function
     * @param {Radians} radians - The amount to rotate in radians.
     * @description Rotate the matrix.
     */
    rotate: function(radians) {

      var c = cos(radians);
      var s = sin(radians);

      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#translate
     * @function
     * @param {Number} x - The horizontal translation value to apply.
     * @param {Number} y - The vertical translation value to apply.
     * @description Translate the matrix.
     */
    translate: function(x, y) {

      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#skewX
     * @function
     * @param {Radians} radians - The amount to skew in radians.
     * @description Skew the matrix by an angle in the x axis direction.
     */
    skewX: function(radians) {

      var a = tan(radians);

      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#skewY
     * @function
     * @param {Radians} radians - The amount to skew in radians.
     * @description Skew the matrix by an angle in the y axis direction.
     */
    skewY: function(radians) {

      var a = tan(radians);

      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#toString
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @returns {String} - The transformation matrix as a 6 component string separated by spaces.
     * @description Create a transform string. Used for the Two.js rendering APIs.
     */
    toString: function(fullMatrix) {

      array.length = 0;
      this.toArray(fullMatrix, array);

      return array.join(' ');

    },

    /**
     * @name Two.Matrix#toArray
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
     * @description Create a transform array. Used for the Two.js rendering APIs.
     */
    toArray: function(fullMatrix, output) {

     var elements = this.elements;
     var hasOutput = !!output;

     var a = fix(elements[0]);
     var b = fix(elements[1]);
     var c = fix(elements[2]);
     var d = fix(elements[3]);
     var e = fix(elements[4]);
     var f = fix(elements[5]);

      if (!!fullMatrix) {

        var g = fix(elements[6]);
        var h = fix(elements[7]);
        var i = fix(elements[8]);

        if (hasOutput) {
          output[0] = a;
          output[1] = d;
          output[2] = g;
          output[3] = b;
          output[4] = e;
          output[5] = h;
          output[6] = c;
          output[7] = f;
          output[8] = i;
          return;
        }

        return [
          a, d, g, b, e, h, c, f, i
        ];
      }

      if (hasOutput) {
        output[0] = a;
        output[1] = d;
        output[2] = b;
        output[3] = e;
        output[4] = c;
        output[5] = f;
        return;
      }

      return [
        a, d, b, e, c, f  // Specific format see LN:19
      ];

    },

    /**
     * @name Two.Matrix#clone
     * @function
     * @description Clone the current matrix.
     */
    clone: function() {
      var a, b, c, d, e, f, g, h, i;

      a = this.elements[0];
      b = this.elements[1];
      c = this.elements[2];
      d = this.elements[3];
      e = this.elements[4];
      f = this.elements[5];
      g = this.elements[6];
      h = this.elements[7];
      i = this.elements[8];

      var matrix = new Two.Matrix(a, b, c, d, e, f, g, h, i);
      matrix.manual = this.manual;

      return matrix;

    }

  });

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  // Localize variables
  var mod = Two.Utils.mod, toFixed = Two.Utils.toFixed;
  var _ = Two.Utils;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    alignments: {
      left: 'start',
      center: 'middle',
      right: 'end'
    },

    /**
     * Create an svg namespaced element.
     */
    createElement: function(name, attrs) {
      var tag = name;
      var elem = document.createElementNS(svg.ns, tag);
      if (tag === 'svg') {
        attrs = _.defaults(attrs || {}, {
          version: svg.version
        });
      }
      if (!_.isEmpty(attrs)) {
        svg.setAttributes(elem, attrs);
      }
      return elem;
    },

    /**
     * Add attributes from an svg element.
     */
    setAttributes: function(elem, attrs) {
      var keys = Object.keys(attrs);
      for (var i = 0; i < keys.length; i++) {
        if (/href/.test(keys[i])) {
          elem.setAttributeNS(svg.xlink, keys[i], attrs[keys[i]]);
        } else {
          elem.setAttribute(keys[i], attrs[keys[i]]);
        }
      }
      return this;
    },

    /**
     * Remove attributes from an svg element.
     */
    removeAttributes: function(elem, attrs) {
      for (var key in attrs) {
        elem.removeAttribute(key);
      }
      return this;
    },

    /**
     * Turn a set of vertices into a string for the d property of a path
     * element. It is imperative that the string collation is as fast as
     * possible, because this call will be happening multiple times a
     * second.
     */
    toString: function(points, closed) {

      var l = points.length,
        last = l - 1,
        d, // The elusive last Two.Commands.move point
        string = '';

      for (var i = 0; i < l; i++) {
        var b = points[i];
        var command;
        var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

        var a = points[prev];
        var c = points[next];

        var vx, vy, ux, uy, ar, bl, br, cl;
        var rx, ry, xAxisRotation, largeArcFlag, sweepFlag;

        // Access x and y directly,
        // bypassing the getter
        var x = toFixed(b.x);
        var y = toFixed(b.y);

        switch (b.command) {

          case Two.Commands.close:
            command = Two.Commands.close;
            break;

          case Two.Commands.arc:

            rx = b.rx;
            ry = b.ry;
            xAxisRotation = b.xAxisRotation;
            largeArcFlag = b.largeArcFlag;
            sweepFlag = b.sweepFlag;

            command = Two.Commands.arc + ' ' + rx + ' ' + ry + ' '
              + xAxisRotation + ' ' + largeArcFlag + ' ' + sweepFlag + ' '
              + x + ' ' + y;
            break;

          case Two.Commands.curve:

            ar = (a.controls && a.controls.right) || Two.Vector.zero;
            bl = (b.controls && b.controls.left) || Two.Vector.zero;

            if (a.relative) {
              vx = toFixed((ar.x + a.x));
              vy = toFixed((ar.y + a.y));
            } else {
              vx = toFixed(ar.x);
              vy = toFixed(ar.y);
            }

            if (b.relative) {
              ux = toFixed((bl.x + b.x));
              uy = toFixed((bl.y + b.y));
            } else {
              ux = toFixed(bl.x);
              uy = toFixed(bl.y);
            }

            command = ((i === 0) ? Two.Commands.move : Two.Commands.curve) +
              ' ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
            break;

          case Two.Commands.move:
            d = b;
            command = Two.Commands.move + ' ' + x + ' ' + y;
            break;

          default:
            command = b.command + ' ' + x + ' ' + y;

        }

        // Add a final point and close it off

        if (i >= last && closed) {

          if (b.command === Two.Commands.curve) {

            // Make sure we close to the most previous Two.Commands.move
            c = d;

            br = (b.controls && b.controls.right) || b;
            cl = (c.controls && c.controls.left) || c;

            if (b.relative) {
              vx = toFixed((br.x + b.x));
              vy = toFixed((br.y + b.y));
            } else {
              vx = toFixed(br.x);
              vy = toFixed(br.y);
            }

            if (c.relative) {
              ux = toFixed((cl.x + c.x));
              uy = toFixed((cl.y + c.y));
            } else {
              ux = toFixed(cl.x);
              uy = toFixed(cl.y);
            }

            x = toFixed(c.x);
            y = toFixed(c.y);

            command +=
              ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;

          }

          if (b.command !== Two.Commands.close) {
            command += ' Z';
          }

        }

        string += command + ' ';

      }

      return string;

    },

    getClip: function(shape) {

      var clip = shape._renderer.clip;

      if (!clip) {

        var root = shape;

        while (root.parent) {
          root = root.parent;
        }

        clip = shape._renderer.clip = svg.createElement('clipPath');
        root.defs.appendChild(clip);

      }

      return clip;

    },

    group: {

      // TODO: Can speed up.
      // TODO: How does this effect a f
      appendChild: function(object) {

        var elem = object._renderer.elem;

        if (!elem) {
          return;
        }

        var tag = elem.nodeName;

        if (!tag || /(radial|linear)gradient/i.test(tag) || object._clip) {
          return;
        }

        this.elem.appendChild(elem);

      },

      removeChild: function(object) {

        var elem = object._renderer.elem;

        if (!elem || elem.parentNode != this.elem) {
          return;
        }

        var tag = elem.nodeName;

        if (!tag) {
          return;
        }

        // Defer subtractions while clipping.
        if (object._clip) {
          return;
        }

        this.elem.removeChild(elem);

      },

      orderChild: function(object) {
        this.elem.appendChild(object._renderer.elem);
      },

      renderChild: function(child) {
        svg[child._renderer.type].render.call(child, this);
      },

      render: function(domElement) {

        this._update();

        // Shortcut for hidden objects.
        // Doesn't reset the flags, so changes are stored and
        // applied once the object is visible again
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }

        if (!this._renderer.elem) {
          this._renderer.elem = svg.createElement('g', {
            id: this.id
          });
          domElement.appendChild(this._renderer.elem);
        }

        // _Update styles for the <g>
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var context = {
          domElement: domElement,
          elem: this._renderer.elem
        };

        if (flagMatrix) {
          this._renderer.elem.setAttribute('transform', 'matrix(' + this._matrix.toString() + ')');
        }

        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];
          svg[child._renderer.type].render.call(child, domElement);
        }

        if (this._flagOpacity) {
          this._renderer.elem.setAttribute('opacity', this._opacity);
        }

        if (this._flagClassName) {
          this._renderer.elem.setAttribute('class', this._className);
        }

        if (this._flagAdditions) {
          this.additions.forEach(svg.group.appendChild, context);
        }

        if (this._flagSubtractions) {
          this.subtractions.forEach(svg.group.removeChild, context);
        }

        if (this._flagOrder) {
          this.children.forEach(svg.group.orderChild, context);
        }

        /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (this._flagClip) {

        //   clip = svg.getClip(this);
        //   elem = this._renderer.elem;

        //   if (this._clip) {
        //     elem.removeAttribute('id');
        //     clip.setAttribute('id', this.id);
        //     clip.appendChild(elem);
        //   } else {
        //     clip.removeAttribute('id');
        //     elem.setAttribute('id', this.id);
        //     this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
        //   }

        // }

        if (this._flagMask) {
          if (this._mask) {
            this._renderer.elem.setAttribute('clip-path', 'url(#' + this._mask.id + ')');
          } else {
            this._renderer.elem.removeAttribute('clip-path');
          }
        }

        return this.flagReset();

      }

    },

    path: {

      render: function(domElement) {

        this._update();

        // Shortcut for hidden objects.
        // Doesn't reset the flags, so changes are stored and
        // applied once the object is visible again
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }

        // Collect any attribute that needs to be changed here
        var changed = {};

        var flagMatrix = this._matrix.manual || this._flagMatrix;

        if (flagMatrix) {
          changed.transform = 'matrix(' + this._matrix.toString() + ')';
        }

        if (this._flagVertices) {
          var vertices = svg.toString(this._renderer.vertices, this._closed);
          changed.d = vertices;
        }

        if (this._fill && this._fill._renderer) {
          this._fill._update();
          svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
        }

        if (this._flagFill) {
          changed.fill = this._fill && this._fill.id
            ? 'url(#' + this._fill.id + ')' : this._fill;
        }

        if (this._stroke && this._stroke._renderer) {
          this._stroke._update();
          svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
        }

        if (this._flagStroke) {
          changed.stroke = this._stroke && this._stroke.id
            ? 'url(#' + this._stroke.id + ')' : this._stroke;
        }

        if (this._flagLinewidth) {
          changed['stroke-width'] = this._linewidth;
        }

        if (this._flagOpacity) {
          changed['stroke-opacity'] = this._opacity;
          changed['fill-opacity'] = this._opacity;
        }

        if (this._flagClassName) {
          changed['class'] = this._className;
        }

        if (this._flagVisible) {
          changed.visibility = this._visible ? 'visible' : 'hidden';
        }

        if (this._flagCap) {
          changed['stroke-linecap'] = this._cap;
        }

        if (this._flagJoin) {
          changed['stroke-linejoin'] = this._join;
        }

        if (this._flagMiter) {
          changed['stroke-miterlimit'] = this._miter;
        }

        if (this.dashes && this.dashes.length > 0) {
          changed['stroke-dasharray'] = this.dashes.join(' ');
        }

        // If there is no attached DOM element yet,
        // create it with all necessary attributes.
        if (!this._renderer.elem) {

          changed.id = this.id;
          this._renderer.elem = svg.createElement('path', changed);
          domElement.appendChild(this._renderer.elem);

        // Otherwise apply all pending attributes
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }

        if (this._flagClip) {

          var clip = svg.getClip(this);
          var elem = this._renderer.elem;

          if (this._clip) {
            elem.removeAttribute('id');
            clip.setAttribute('id', this.id);
            clip.appendChild(elem);
          } else {
            clip.removeAttribute('id');
            elem.setAttribute('id', this.id);
            this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
          }

        }

        /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (this._flagMask) {
        //   if (this._mask) {
        //     elem.setAttribute('clip-path', 'url(#' + this._mask.id + ')');
        //   } else {
        //     elem.removeAttribute('clip-path');
        //   }
        // }

        return this.flagReset();

      }

    },

    text: {

      render: function(domElement) {

        this._update();

        var changed = {};

        var flagMatrix = this._matrix.manual || this._flagMatrix;

        if (flagMatrix) {
          changed.transform = 'matrix(' + this._matrix.toString() + ')';
        }

        if (this._flagFamily) {
          changed['font-family'] = this._family;
        }
        if (this._flagSize) {
          changed['font-size'] = this._size;
        }
        if (this._flagLeading) {
          changed['line-height'] = this._leading;
        }
        if (this._flagAlignment) {
          changed['text-anchor'] = svg.alignments[this._alignment] || this._alignment;
        }
        if (this._flagBaseline) {
          changed['alignment-baseline'] = changed['dominant-baseline'] = this._baseline;
        }
        if (this._flagStyle) {
          changed['font-style'] = this._style;
        }
        if (this._flagWeight) {
          changed['font-weight'] = this._weight;
        }
        if (this._flagDecoration) {
          changed['text-decoration'] = this._decoration;
        }
        if (this._fill && this._fill._renderer) {
          this._fill._update();
          svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
        }
        if (this._flagFill) {
          changed.fill = this._fill && this._fill.id
            ? 'url(#' + this._fill.id + ')' : this._fill;
        }
        if (this._stroke && this._stroke._renderer) {
          this._stroke._update();
          svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
        }
        if (this._flagStroke) {
          changed.stroke = this._stroke && this._stroke.id
            ? 'url(#' + this._stroke.id + ')' : this._stroke;
        }
        if (this._flagLinewidth) {
          changed['stroke-width'] = this._linewidth;
        }
        if (this._flagOpacity) {
          changed.opacity = this._opacity;
        }
        if (this._flagClassName) {
          changed['class'] = this._className;
        }
        if (this._flagVisible) {
          changed.visibility = this._visible ? 'visible' : 'hidden';
        }
        if (this.dashes && this.dashes.length > 0) {
          changed['stroke-dasharray'] = this.dashes.join(' ');
        }

        if (!this._renderer.elem) {

          changed.id = this.id;

          this._renderer.elem = svg.createElement('text', changed);
          domElement.defs.appendChild(this._renderer.elem);

        } else {

          svg.setAttributes(this._renderer.elem, changed);

        }

        if (this._flagClip) {

          var clip = svg.getClip(this);
          var elem = this._renderer.elem;

          if (this._clip) {
            elem.removeAttribute('id');
            clip.setAttribute('id', this.id);
            clip.appendChild(elem);
          } else {
            clip.removeAttribute('id');
            elem.setAttribute('id', this.id);
            this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
          }

        }

        if (this._flagValue) {
          this._renderer.elem.textContent = this._value;
        }

        return this.flagReset();

      }

    },

    'linear-gradient': {

      render: function(domElement, silent) {

        if (!silent) {
          this._update();
        }

        var changed = {};

        if (this._flagEndPoints) {
          changed.x1 = this.left._x;
          changed.y1 = this.left._y;
          changed.x2 = this.right._x;
          changed.y2 = this.right._y;
        }

        if (this._flagSpread) {
          changed.spreadMethod = this._spread;
        }

        // If there is no attached DOM element yet,
        // create it with all necessary attributes.
        if (!this._renderer.elem) {

          changed.id = this.id;
          changed.gradientUnits = 'userSpaceOnUse';
          this._renderer.elem = svg.createElement('linearGradient', changed);
          domElement.defs.appendChild(this._renderer.elem);

        // Otherwise apply all pending attributes
        } else {

          svg.setAttributes(this._renderer.elem, changed);

        }

        if (this._flagStops) {

          var lengthChanged = this._renderer.elem.childNodes.length
            !== this.stops.length;

          if (lengthChanged) {
            this._renderer.elem.childNodes.length = 0;
          }

          for (var i = 0; i < this.stops.length; i++) {

            var stop = this.stops[i];
            var attrs = {};

            if (stop._flagOffset) {
              attrs.offset = 100 * stop._offset + '%';
            }
            if (stop._flagColor) {
              attrs['stop-color'] = stop._color;
            }
            if (stop._flagOpacity) {
              attrs['stop-opacity'] = stop._opacity;
            }

            if (!stop._renderer.elem) {
              stop._renderer.elem = svg.createElement('stop', attrs);
            } else {
              svg.setAttributes(stop._renderer.elem, attrs);
            }

            if (lengthChanged) {
              this._renderer.elem.appendChild(stop._renderer.elem);
            }
            stop.flagReset();

          }

        }

        return this.flagReset();

      }

    },

    'radial-gradient': {

      render: function(domElement, silent) {

        if (!silent) {
          this._update();
        }

        var changed = {};

        if (this._flagCenter) {
          changed.cx = this.center._x;
          changed.cy = this.center._y;
        }
        if (this._flagFocal) {
          changed.fx = this.focal._x;
          changed.fy = this.focal._y;
        }

        if (this._flagRadius) {
          changed.r = this._radius;
        }

        if (this._flagSpread) {
          changed.spreadMethod = this._spread;
        }

        // If there is no attached DOM element yet,
        // create it with all necessary attributes.
        if (!this._renderer.elem) {

          changed.id = this.id;
          changed.gradientUnits = 'userSpaceOnUse';
          this._renderer.elem = svg.createElement('radialGradient', changed);
          domElement.defs.appendChild(this._renderer.elem);

        // Otherwise apply all pending attributes
        } else {

          svg.setAttributes(this._renderer.elem, changed);

        }

        if (this._flagStops) {

          var lengthChanged = this._renderer.elem.childNodes.length
            !== this.stops.length;

          if (lengthChanged) {
            this._renderer.elem.childNodes.length = 0;
          }

          for (var i = 0; i < this.stops.length; i++) {

            var stop = this.stops[i];
            var attrs = {};

            if (stop._flagOffset) {
              attrs.offset = 100 * stop._offset + '%';
            }
            if (stop._flagColor) {
              attrs['stop-color'] = stop._color;
            }
            if (stop._flagOpacity) {
              attrs['stop-opacity'] = stop._opacity;
            }

            if (!stop._renderer.elem) {
              stop._renderer.elem = svg.createElement('stop', attrs);
            } else {
              svg.setAttributes(stop._renderer.elem, attrs);
            }

            if (lengthChanged) {
              this._renderer.elem.appendChild(stop._renderer.elem);
            }
            stop.flagReset();

          }

        }

        return this.flagReset();

      }

    },

    texture: {

      render: function(domElement, silent) {

        if (!silent) {
          this._update();
        }

        var changed = {};
        var styles = { x: 0, y: 0 };
        var image = this.image;

        if (this._flagLoaded && this.loaded) {

          switch (image.nodeName.toLowerCase()) {

            case 'canvas':
              styles.href = styles['xlink:href'] = image.toDataURL('image/png');
              break;
            case 'img':
            case 'image':
              styles.href = styles['xlink:href'] = this.src;
              break;

          }

        }

        if (this._flagOffset || this._flagLoaded || this._flagScale) {

          changed.x = this._offset.x;
          changed.y = this._offset.y;

          if (image) {

            changed.x -= image.width / 2;
            changed.y -= image.height / 2;

            if (this._scale instanceof Two.Vector) {
              changed.x *= this._scale.x;
              changed.y *= this._scale.y;
            } else {
              changed.x *= this._scale;
              changed.y *= this._scale;
            }
          }

          if (changed.x > 0) {
            changed.x *= - 1;
          }
          if (changed.y > 0) {
            changed.y *= - 1;
          }

        }

        if (this._flagScale || this._flagLoaded || this._flagRepeat) {

          changed.width = 0;
          changed.height = 0;

          if (image) {

            styles.width = changed.width = image.width;
            styles.height = changed.height = image.height;

            // TODO: Hack / Bandaid
            switch (this._repeat) {
              case 'no-repeat':
                changed.width += 1;
                changed.height += 1;
                break;
            }

            if (this._scale instanceof Two.Vector) {
              changed.width *= this._scale.x;
              changed.height *= this._scale.y;
            } else {
              changed.width *= this._scale;
              changed.height *= this._scale;
            }
          }

        }

        if (this._flagScale || this._flagLoaded) {
          if (!this._renderer.image) {
            this._renderer.image = svg.createElement('image', styles);
          } else if (!_.isEmpty(styles)) {
            svg.setAttributes(this._renderer.image, styles);
          }
        }

        if (!this._renderer.elem) {

          changed.id = this.id;
          changed.patternUnits = 'userSpaceOnUse';
          this._renderer.elem = svg.createElement('pattern', changed);
          domElement.defs.appendChild(this._renderer.elem);

        } else if (!_.isEmpty(changed)) {

          svg.setAttributes(this._renderer.elem, changed);

        }

        if (this._renderer.elem && this._renderer.image && !this._renderer.appended) {
          this._renderer.elem.appendChild(this._renderer.image);
          this._renderer.appended = true;
        }

        return this.flagReset();

      }

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.Types.svg] = function(params) {

    this.domElement = params.domElement || svg.createElement('svg');

    this.scene = new Two.Group();
    this.scene.parent = this;

    this.defs = svg.createElement('defs');
    this.domElement.appendChild(this.defs);
    this.domElement.defs = this.defs;
    this.domElement.style.overflow = 'hidden';

  };

  _.extend(Renderer, {

    Utils: svg

  });

  _.extend(Renderer.prototype, Two.Utils.Events, {

    constructor: Renderer,

    setSize: function(width, height) {

      this.width = width;
      this.height = height;

      svg.setAttributes(this.domElement, {
        width: width,
        height: height
      });

      return this.trigger(Two.Events.resize, width, height);

    },

    render: function() {

      svg.group.render.call(this.scene, this.domElement);

      return this;

    }

  });

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  /**
   * Constants
   */
  var mod = Two.Utils.mod, toFixed = Two.Utils.toFixed;
  var getRatio = Two.Utils.getRatio;
  var _ = Two.Utils;
  var emptyArray = [];
  var TWO_PI = Math.PI * 2,
    max = Math.max,
    min = Math.min,
    abs = Math.abs,
    sin = Math.sin,
    cos = Math.cos,
    acos = Math.acos,
    sqrt = Math.sqrt;

  // Returns true if this is a non-transforming matrix
  var isDefaultMatrix = function (m) {
    return (m[0] == 1 && m[3] == 0 && m[1] == 0 && m[4] == 1 && m[2] == 0 && m[5] == 0);
  };

  var canvas = {

    isHidden: /(none|transparent)/i,

    alignments: {
      left: 'start',
      middle: 'center',
      right: 'end'
    },

    shim: function(elem, name) {
      elem.tagName = elem.nodeName = name || 'canvas';
      elem.nodeType = 1;
      elem.getAttribute = function(prop) {
        return this[prop];
      };
      elem.setAttribute = function(prop, val) {
        this[prop] = val;
        return this;
      };
      return elem;
    },

    group: {

      renderChild: function(child) {
        canvas[child._renderer.type].render.call(child, this.ctx, true, this.clip);
      },

      render: function(ctx) {

        // TODO: Add a check here to only invoke _update if need be.
        this._update();

        var matrix = this._matrix.elements;
        var parent = this.parent;
        this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);

        var defaultMatrix = isDefaultMatrix(matrix);

        var mask = this._mask;
        // var clip = this._clip;

        if (!this._renderer.context) {
          this._renderer.context = {};
        }

        this._renderer.context.ctx = ctx;
        // this._renderer.context.clip = clip;

        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
        }

        if (mask) {
          canvas[mask._renderer.type].render.call(mask, ctx, true);
        }

        if (this.opacity > 0 && this.scale !== 0) {
          for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            canvas[child._renderer.type].render.call(child, ctx);
          }
        }

        if (!defaultMatrix) {
          ctx.restore();
        }

       /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (clip) {
        //   ctx.clip();
        // }

        return this.flagReset();

      }

    },

    path: {

      render: function(ctx, forced, parentClipped) {

        var matrix, stroke, linewidth, fill, opacity, visible, cap, join, miter,
            closed, commands, length, last, next, prev, a, b, c, d, ux, uy, vx, vy,
            ar, bl, br, cl, x, y, mask, clip, defaultMatrix, isOffset, dashes;

        // TODO: Add a check here to only invoke _update if need be.
        this._update();

        matrix = this._matrix.elements;
        stroke = this._stroke;
        linewidth = this._linewidth;
        fill = this._fill;
        opacity = this._opacity * this.parent._renderer.opacity;
        visible = this._visible;
        cap = this._cap;
        join = this._join;
        miter = this._miter;
        closed = this._closed;
        commands = this._renderer.vertices; // Commands
        length = commands.length;
        last = length - 1;
        defaultMatrix = isDefaultMatrix(matrix);
        dashes = this.dashes;

        // mask = this._mask;
        clip = this._clip;

        if (!forced && (!visible || clip)) {
          return this;
        }

        // Transform
        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
        }

       /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (mask) {
        //   canvas[mask._renderer.type].render.call(mask, ctx, true);
        // }

        // Styles
        if (fill) {
          if (_.isString(fill)) {
            ctx.fillStyle = fill;
          } else {
            canvas[fill._renderer.type].render.call(fill, ctx);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (_.isString(stroke)) {
            ctx.strokeStyle = stroke;
          } else {
            canvas[stroke._renderer.type].render.call(stroke, ctx);
            ctx.strokeStyle = stroke._renderer.effect;
          }
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (miter) {
          ctx.miterLimit = miter;
        }
        if (join) {
          ctx.lineJoin = join;
        }
        if (cap) {
          ctx.lineCap = cap;
        }
        if (_.isNumber(opacity)) {
          ctx.globalAlpha = opacity;
        }

        if (dashes && dashes.length > 0) {
          ctx.setLineDash(dashes);
        }

        ctx.beginPath();

        for (var i = 0; i < commands.length; i++) {

          b = commands[i];

          x = toFixed(b.x);
          y = toFixed(b.y);

          switch (b.command) {

            case Two.Commands.close:
              ctx.closePath();
              break;

            case Two.Commands.arc:

              var rx = b.rx;
              var ry = b.ry;
              var xAxisRotation = b.xAxisRotation;
              var largeArcFlag = b.largeArcFlag;
              var sweepFlag = b.sweepFlag;

              prev = closed ? mod(i - 1, length) : max(i - 1, 0);
              a = commands[prev];

              var ax = toFixed(a.x);
              var ay = toFixed(a.y);

              canvas.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
              break;

            case Two.Commands.curve:

              prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
              next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

              a = commands[prev];
              c = commands[next];
              ar = (a.controls && a.controls.right) || Two.Vector.zero;
              bl = (b.controls && b.controls.left) || Two.Vector.zero;

              if (a._relative) {
                vx = (ar.x + toFixed(a.x));
                vy = (ar.y + toFixed(a.y));
              } else {
                vx = toFixed(ar.x);
                vy = toFixed(ar.y);
              }

              if (b._relative) {
                ux = (bl.x + toFixed(b.x));
                uy = (bl.y + toFixed(b.y));
              } else {
                ux = toFixed(bl.x);
                uy = toFixed(bl.y);
              }

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              if (i >= last && closed) {

                c = d;

                br = (b.controls && b.controls.right) || Two.Vector.zero;
                cl = (c.controls && c.controls.left) || Two.Vector.zero;

                if (b._relative) {
                  vx = (br.x + toFixed(b.x));
                  vy = (br.y + toFixed(b.y));
                } else {
                  vx = toFixed(br.x);
                  vy = toFixed(br.y);
                }

                if (c._relative) {
                  ux = (cl.x + toFixed(c.x));
                  uy = (cl.y + toFixed(c.y));
                } else {
                  ux = toFixed(cl.x);
                  uy = toFixed(cl.y);
                }

                x = toFixed(c.x);
                y = toFixed(c.y);

                ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              }

              break;

            case Two.Commands.line:
              ctx.lineTo(x, y);
              break;

            case Two.Commands.move:
              d = b;
              ctx.moveTo(x, y);
              break;

          }
        }

        // Loose ends

        if (closed) {
          ctx.closePath();
        }

        if (dashes && dashes.length > 0) {
          ctx.setLineDash(emptyArray);
        }

        if (!clip && !parentClipped) {
          if (!canvas.isHidden.test(fill)) {
            isOffset = fill._renderer && fill._renderer.offset
            if (isOffset) {
              ctx.save();
              ctx.translate(
                - fill._renderer.offset.x, - fill._renderer.offset.y);
              ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
            }
            ctx.fill();
            if (isOffset) {
              ctx.restore();
            }
          }
          if (!canvas.isHidden.test(stroke)) {
            isOffset = stroke._renderer && stroke._renderer.offset;
            if (isOffset) {
              ctx.save();
              ctx.translate(
                - stroke._renderer.offset.x, - stroke._renderer.offset.y);
              ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
              ctx.lineWidth = linewidth / stroke._renderer.scale.x;
            }
            ctx.stroke();
            if (isOffset) {
              ctx.restore();
            }
          }
        }

        if (!defaultMatrix) {
          ctx.restore();
        }

        if (clip && !parentClipped) {
          ctx.clip();
        }

        return this.flagReset();

      }

    },

    text: {

      render: function(ctx, forced, parentClipped) {

        // TODO: Add a check here to only invoke _update if need be.
        this._update();

        var matrix = this._matrix.elements;
        var stroke = this._stroke;
        var linewidth = this._linewidth;
        var fill = this._fill;
        var opacity = this._opacity * this.parent._renderer.opacity;
        var visible = this._visible;
        var defaultMatrix = isDefaultMatrix(matrix);
        var isOffset = fill._renderer && fill._renderer.offset
          && stroke._renderer && stroke._renderer.offset;
        var dashes = this.dashes;

        var a, b, c, d, e, sx, sy;

        // mask = this._mask;
        var clip = this._clip;

        if (!forced && (!visible || clip)) {
          return this;
        }

        // Transform
        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
        }

       /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (mask) {
        //   canvas[mask._renderer.type].render.call(mask, ctx, true);
        // }

        if (!isOffset) {
          ctx.font = [this._style, this._weight, this._size + 'px/' +
            this._leading + 'px', this._family].join(' ');
        }

        ctx.textAlign = canvas.alignments[this._alignment] || this._alignment;
        ctx.textBaseline = this._baseline;

        // Styles
        if (fill) {
          if (_.isString(fill)) {
            ctx.fillStyle = fill;
          } else {
            canvas[fill._renderer.type].render.call(fill, ctx);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (_.isString(stroke)) {
            ctx.strokeStyle = stroke;
          } else {
            canvas[stroke._renderer.type].render.call(stroke, ctx);
            ctx.strokeStyle = stroke._renderer.effect;
          }
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (_.isNumber(opacity)) {
          ctx.globalAlpha = opacity;
        }
        if (dashes && dashes.length > 0) {
          ctx.setLineDash(dashes);
        }

        if (!clip && !parentClipped) {

          if (!canvas.isHidden.test(fill)) {

            if (fill._renderer && fill._renderer.offset) {

              sx = toFixed(fill._renderer.scale.x);
              sy = toFixed(fill._renderer.scale.y);

              ctx.save();
              ctx.translate( - toFixed(fill._renderer.offset.x),
                - toFixed(fill._renderer.offset.y));
              ctx.scale(sx, sy);

              a = this._size / fill._renderer.scale.y;
              b = this._leading / fill._renderer.scale.y;
              ctx.font = [this._style, this._weight, toFixed(a) + 'px/',
                toFixed(b) + 'px', this._family].join(' ');

              c = fill._renderer.offset.x / fill._renderer.scale.x;
              d = fill._renderer.offset.y / fill._renderer.scale.y;

              ctx.fillText(this.value, toFixed(c), toFixed(d));
              ctx.restore();

            } else {
              ctx.fillText(this.value, 0, 0);
            }

          }

          if (!canvas.isHidden.test(stroke)) {

            if (stroke._renderer && stroke._renderer.offset) {

              sx = toFixed(stroke._renderer.scale.x);
              sy = toFixed(stroke._renderer.scale.y);

              ctx.save();
              ctx.translate(- toFixed(stroke._renderer.offset.x),
                - toFixed(stroke._renderer.offset.y));
              ctx.scale(sx, sy);

              a = this._size / stroke._renderer.scale.y;
              b = this._leading / stroke._renderer.scale.y;
              ctx.font = [this._style, this._weight, toFixed(a) + 'px/',
                toFixed(b) + 'px', this._family].join(' ');

              c = stroke._renderer.offset.x / stroke._renderer.scale.x;
              d = stroke._renderer.offset.y / stroke._renderer.scale.y;
              e = linewidth / stroke._renderer.scale.x;

              ctx.lineWidth = toFixed(e);
              ctx.strokeText(this.value, toFixed(c), toFixed(d));
              ctx.restore();

            } else {
              ctx.strokeText(this.value, 0, 0);
            }
          }
        }

        if (!defaultMatrix) {
          ctx.restore();
        }

        // TODO: Test for text
        if (clip && !parentClipped) {
          ctx.clip();
        }

        return this.flagReset();

      }

    },

    'linear-gradient': {

      render: function(ctx) {

        this._update();

        if (!this._renderer.effect || this._flagEndPoints || this._flagStops) {

          this._renderer.effect = ctx.createLinearGradient(
            this.left._x, this.left._y,
            this.right._x, this.right._y
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }

    },

    'radial-gradient': {

      render: function(ctx) {

        this._update();

        if (!this._renderer.effect || this._flagCenter || this._flagFocal
            || this._flagRadius || this._flagStops) {

          this._renderer.effect = ctx.createRadialGradient(
            this.center._x, this.center._y, 0,
            this.focal._x, this.focal._y, this._radius
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }

    },

    texture: {

      render: function(ctx) {

        this._update();

        var image = this.image;
        var repeat;

        if (!this._renderer.effect || ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded)) {
          this._renderer.effect = ctx.createPattern(this.image, this._repeat);
        }

        if (this._flagOffset || this._flagLoaded || this._flagScale) {

          if (!(this._renderer.offset instanceof Two.Vector)) {
            this._renderer.offset = new Two.Vector();
          }

          this._renderer.offset.x = - this._offset.x;
          this._renderer.offset.y = - this._offset.y;

          if (image) {

            this._renderer.offset.x += image.width / 2;
            this._renderer.offset.y += image.height / 2;

            if (this._scale instanceof Two.Vector) {
              this._renderer.offset.x *= this._scale.x;
              this._renderer.offset.y *= this._scale.y;
            } else {
              this._renderer.offset.x *= this._scale;
              this._renderer.offset.y *= this._scale;
            }
          }

        }

        if (this._flagScale || this._flagLoaded) {

          if (!(this._renderer.scale instanceof Two.Vector)) {
            this._renderer.scale = new Two.Vector();
          }

          if (this._scale instanceof Two.Vector) {
            this._renderer.scale.copy(this._scale);
          } else {
            this._renderer.scale.set(this._scale, this._scale);
          }

        }

        return this.flagReset();

      }

    },

    renderSvgArcCommand: function(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y) {

      xAxisRotation = xAxisRotation * Math.PI / 180;

      // Ensure radii are positive
      rx = abs(rx);
      ry = abs(ry);

      // Compute (x1′, y1′)
      var dx2 = (ax - x) / 2.0;
      var dy2 = (ay - y) / 2.0;
      var x1p = cos(xAxisRotation) * dx2 + sin(xAxisRotation) * dy2;
      var y1p = - sin(xAxisRotation) * dx2 + cos(xAxisRotation) * dy2;

      // Compute (cx′, cy′)
      var rxs = rx * rx;
      var rys = ry * ry;
      var x1ps = x1p * x1p;
      var y1ps = y1p * y1p;

      // Ensure radii are large enough
      var cr = x1ps / rxs + y1ps / rys;

      if (cr > 1) {

        // scale up rx,ry equally so cr == 1
        var s = sqrt(cr);
        rx = s * rx;
        ry = s * ry;
        rxs = rx * rx;
        rys = ry * ry;

      }

      var dq = (rxs * y1ps + rys * x1ps);
      var pq = (rxs * rys - dq) / dq;
      var q = sqrt(max(0, pq));
      if (largeArcFlag === sweepFlag) q = - q;
      var cxp = q * rx * y1p / ry;
      var cyp = - q * ry * x1p / rx;

      // Step 3: Compute (cx, cy) from (cx′, cy′)
      var cx = cos(xAxisRotation) * cxp
        - sin(xAxisRotation) * cyp + (ax + x) / 2;
      var cy = sin(xAxisRotation) * cxp
        + cos(xAxisRotation) * cyp + (ay + y) / 2;

      // Step 4: Compute θ1 and Δθ
      var startAngle = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
      var delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry,
        (- x1p - cxp) / rx, (- y1p - cyp) / ry) % TWO_PI;

      var endAngle = startAngle + delta;

      var clockwise = sweepFlag === 0;

      renderArcEstimate(ctx, cx, cy, rx, ry, startAngle, endAngle,
        clockwise, xAxisRotation);

    }

  };

  var Renderer = Two[Two.Types.canvas] = function(params) {
    // Smoothing property. Defaults to true
    // Set it to false when working with pixel art.
    // false can lead to better performance, since it would use a cheaper interpolation algorithm.
    // It might not make a big difference on GPU backed canvases.
    var smoothing = (params.smoothing !== false);
    this.domElement = params.domElement || document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');
    this.overdraw = params.overdraw || false;

    if (!_.isUndefined(this.ctx.imageSmoothingEnabled)) {
      this.ctx.imageSmoothingEnabled = smoothing;
    }

    // Everything drawn on the canvas needs to be added to the scene.
    this.scene = new Two.Group();
    this.scene.parent = this;
  };


  _.extend(Renderer, {

    Utils: canvas

  });

  _.extend(Renderer.prototype, Two.Utils.Events, {

    constructor: Renderer,

    setSize: function(width, height, ratio) {

      this.width = width;
      this.height = height;

      this.ratio = _.isUndefined(ratio) ? getRatio(this.ctx) : ratio;

      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;

      if (this.domElement.style) {
        _.extend(this.domElement.style, {
          width: width + 'px',
          height: height + 'px'
        });
      }

      return this.trigger(Two.Events.resize, width, height, ratio);

    },

    render: function() {

      var isOne = this.ratio === 1;

      if (!isOne) {
        this.ctx.save();
        this.ctx.scale(this.ratio, this.ratio);
      }

      if (!this.overdraw) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }

      canvas.group.render.call(this.scene, this.ctx);

      if (!isOne) {
        this.ctx.restore();
      }

      return this;

    }

  });

  function renderArcEstimate(ctx, ox, oy, rx, ry, startAngle, endAngle, clockwise, xAxisRotation) {

    var epsilon = Two.Utils.Curve.Tolerance.epsilon;
    var deltaAngle = endAngle - startAngle;
    var samePoints = Math.abs(deltaAngle) < epsilon;

    // ensures that deltaAngle is 0 .. 2 PI
    deltaAngle = mod(deltaAngle, TWO_PI);

    if (deltaAngle < epsilon) {

      if (samePoints) {

        deltaAngle = 0;

      } else {

        deltaAngle = TWO_PI;

      }

    }

    if (clockwise === true && ! samePoints) {

      if (deltaAngle === TWO_PI) {

        deltaAngle = - TWO_PI;

      } else {

        deltaAngle = deltaAngle - TWO_PI;

      }

    }

    for (var i = 0; i < Two.Resolution; i++) {

      var t = i / (Two.Resolution - 1);

      var angle = startAngle + t * deltaAngle;
      var x = ox + rx * Math.cos(angle);
      var y = oy + ry * Math.sin(angle);

      if (xAxisRotation !== 0) {

        var cos = Math.cos(xAxisRotation);
        var sin = Math.sin(xAxisRotation);

        var tx = x - ox;
        var ty = y - oy;

        // Rotate the point about the center of the ellipse.
        x = tx * cos - ty * sin + ox;
        y = tx * sin + ty * cos + oy;

      }

      ctx.lineTo(x, y);

    }

  }

  function svgAngle(ux, uy, vx, vy) {

    var dot = ux * vx + uy * vy;
    var len = sqrt(ux * ux + uy * uy) *  sqrt(vx * vx + vy * vy);
    // floating point precision, slightly over values appear
    var ang = acos(max(-1, min(1, dot / len)));
    if ((ux * vy - uy * vx) < 0) {
      ang = - ang;
    }

    return ang;

  }

  function resetTransform(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  /**
   * Constants
   */

  var root = Two.root,
    multiplyMatrix = Two.Matrix.Multiply,
    mod = Two.Utils.mod,
    identity = [1, 0, 0, 0, 1, 0, 0, 0, 1],
    transformation = new Two.Array(9),
    getRatio = Two.Utils.getRatio,
    getComputedMatrix = Two.Utils.getComputedMatrix,
    toFixed = Two.Utils.toFixed,
    CanvasUtils = Two[Two.Types.canvas].Utils,
    _ = Two.Utils;

  var webgl = {

    isHidden: /(none|transparent)/i,

    canvas: (root.document ? root.document.createElement('canvas') : { getContext: _.identity }),

    alignments: {
      left: 'start',
      middle: 'center',
      right: 'end'
    },

    matrix: new Two.Matrix(),

    uv: new Two.Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    ]),

    group: {

      removeChild: function(child, gl) {
        if (child.children) {
          for (var i = 0; i < child.children.length; i++) {
            webgl.group.removeChild(child.children[i], gl);
          }
          return;
        }
        // Deallocate texture to free up gl memory.
        gl.deleteTexture(child._renderer.texture);
        delete child._renderer.texture;
      },

      renderChild: function(child) {
        webgl[child._renderer.type].render.call(child, this.gl, this.program);
      },

      render: function(gl, program) {

        this._update();

        var parent = this.parent;
        var flagParentMatrix = (parent._matrix && parent._matrix.manual) || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion
          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

          if (flagParentMatrix) {
            this._flagMatrix = true;
          }

        }

        if (this._mask) {

          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 1);

          gl.colorMask(false, false, false, true);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);

          webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

          gl.colorMask(true, true, true, true);
          gl.stencilFunc(gl.NOTEQUAL, 0, 1);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

        }

        this._flagOpacity = parent._flagOpacity || this._flagOpacity;

        this._renderer.opacity = this._opacity
          * (parent && parent._renderer ? parent._renderer.opacity : 1);

        if (this._flagSubtractions) {
          for (var i = 0; i < this.subtractions.length; i++) {
            webgl.group.removeChild(this.subtractions[i], gl);
          }
        }

        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];
          webgl[child._renderer.type].render.call(child, gl, program);
        }

        this.children.forEach(webgl.group.renderChild, {
          gl: gl,
          program: program
        });

        if (this._mask) {

          gl.colorMask(false, false, false, false);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);

          webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

          gl.colorMask(true, true, true, true);
          gl.stencilFunc(gl.NOTEQUAL, 0, 1);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

          gl.disable(gl.STENCIL_TEST);

        }

        return this.flagReset();

      }

    },

    path: {

      updateCanvas: function(elem) {

        var next, prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;
        var isOffset;

        var commands = elem._renderer.vertices;
        var canvas = this.canvas;
        var ctx = this.ctx;

        // Styles
        var scale = elem._renderer.scale;
        var stroke = elem._stroke;
        var linewidth = elem._linewidth;
        var fill = elem._fill;
        var opacity = elem._renderer.opacity || elem._opacity;
        var cap = elem._cap;
        var join = elem._join;
        var miter = elem._miter;
        var closed = elem._closed;
        var dashes = elem.dashes;
        var length = commands.length;
        var last = length - 1;

        canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale), 1);
        canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale), 1);

        var centroid = elem._renderer.rect.centroid;
        var cx = centroid.x;
        var cy = centroid.y;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (fill) {
          if (_.isString(fill)) {
            ctx.fillStyle = fill;
          } else {
            webgl[fill._renderer.type].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (_.isString(stroke)) {
            ctx.strokeStyle = stroke;
          } else {
            webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (miter) {
          ctx.miterLimit = miter;
        }
        if (join) {
          ctx.lineJoin = join;
        }
        if (cap) {
          ctx.lineCap = cap;
        }
        if (_.isNumber(opacity)) {
          ctx.globalAlpha = opacity;
        }

        if (dashes && dashes.length > 0) {
          ctx.setLineDash(dashes);
        }

        var d;
        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(cx, cy);

        ctx.beginPath();
        for (var i = 0; i < commands.length; i++) {

          var b = commands[i];

          x = toFixed(b.x);
          y = toFixed(b.y);

          switch (b.command) {

            case Two.Commands.close:
              ctx.closePath();
              break;

            case Two.Commands.arc:

              var rx = b.rx;
              var ry = b.ry;
              var xAxisRotation = b.xAxisRotation;
              var largeArcFlag = b.largeArcFlag;
              var sweepFlag = b.sweepFlag;

              prev = closed ? mod(i - 1, length) : max(i - 1, 0);
              a = commands[prev];

              var ax = toFixed(a.x);
              var ay = toFixed(a.y);

              CanvasUtils.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
              break;

            case Two.Commands.curve:

              prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
              next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

              a = commands[prev];
              c = commands[next];
              ar = (a.controls && a.controls.right) || Two.Vector.zero;
              bl = (b.controls && b.controls.left) || Two.Vector.zero;

              if (a._relative) {
                vx = toFixed((ar.x + a.x));
                vy = toFixed((ar.y + a.y));
              } else {
                vx = toFixed(ar.x);
                vy = toFixed(ar.y);
              }

              if (b._relative) {
                ux = toFixed((bl.x + b.x));
                uy = toFixed((bl.y + b.y));
              } else {
                ux = toFixed(bl.x);
                uy = toFixed(bl.y);
              }

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              if (i >= last && closed) {

                c = d;

                br = (b.controls && b.controls.right) || Two.Vector.zero;
                cl = (c.controls && c.controls.left) || Two.Vector.zero;

                if (b._relative) {
                  vx = toFixed((br.x + b.x));
                  vy = toFixed((br.y + b.y));
                } else {
                  vx = toFixed(br.x);
                  vy = toFixed(br.y);
                }

                if (c._relative) {
                  ux = toFixed((cl.x + c.x));
                  uy = toFixed((cl.y + c.y));
                } else {
                  ux = toFixed(cl.x);
                  uy = toFixed(cl.y);
                }

                x = toFixed(c.x);
                y = toFixed(c.y);

                ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              }

              break;

            case Two.Commands.line:
              ctx.lineTo(x, y);
              break;

            case Two.Commands.move:
              d = b;
              ctx.moveTo(x, y);
              break;

          }

        }

        // Loose ends

        if (closed) {
          ctx.closePath();
        }

        if (!webgl.isHidden.test(fill)) {
          isOffset = fill._renderer && fill._renderer.offset
          if (isOffset) {
            ctx.save();
            ctx.translate(
              - fill._renderer.offset.x, - fill._renderer.offset.y);
            ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
          }
          ctx.fill();
          if (isOffset) {
            ctx.restore();
          }
        }

        if (!webgl.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(
              - stroke._renderer.offset.x, - stroke._renderer.offset.y);
            ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
            ctx.lineWidth = linewidth / stroke._renderer.scale.x;
          }
          ctx.stroke();
          if (isOffset) {
            ctx.restore();
          }
        }

        ctx.restore();

      },

      /**
       * Returns the rect of a set of verts. Typically takes vertices that are
       * "centered" around 0 and returns them to be anchored upper-left.
       */
      getBoundingClientRect: function(vertices, border, rect) {

        var left = Infinity, right = -Infinity,
            top = Infinity, bottom = -Infinity,
            width, height;

        vertices.forEach(function(v) {

          var x = v.x, y = v.y, controls = v.controls;
          var a, b, c, d, cl, cr;

          top = Math.min(y, top);
          left = Math.min(x, left);
          right = Math.max(x, right);
          bottom = Math.max(y, bottom);

          if (!v.controls) {
            return;
          }

          cl = controls.left;
          cr = controls.right;

          if (!cl || !cr) {
            return;
          }

          a = v._relative ? cl.x + x : cl.x;
          b = v._relative ? cl.y + y : cl.y;
          c = v._relative ? cr.x + x : cr.x;
          d = v._relative ? cr.y + y : cr.y;

          if (!a || !b || !c || !d) {
            return;
          }

          top = Math.min(b, d, top);
          left = Math.min(a, c, left);
          right = Math.max(a, c, right);
          bottom = Math.max(b, d, bottom);

        });

        // Expand borders

        if (_.isNumber(border)) {
          top -= border;
          left -= border;
          right += border;
          bottom += border;
        }

        width = right - left;
        height = bottom - top;

        rect.top = top;
        rect.left = left;
        rect.right = right;
        rect.bottom = bottom;
        rect.width = width;
        rect.height = height;

        if (!rect.centroid) {
          rect.centroid = {};
        }

        rect.centroid.x = - left;
        rect.centroid.y = - top;

      },

      render: function(gl, program, forcedParent) {

        if (!this._visible || !this._opacity) {
          return this;
        }

        this._update();

        // Calculate what changed

        var parent = this.parent;
        var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var flagTexture = this._flagVertices || this._flagFill
          || (this._fill instanceof Two.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
          || (this._fill instanceof Two.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
          || (this._fill instanceof Two.Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale))
          || (this._stroke instanceof Two.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
          || (this._stroke instanceof Two.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
          || (this._stroke instanceof Two.Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale))
          || this._flagStroke || this._flagLinewidth || this._flagOpacity
          || parent._flagOpacity || this._flagVisible || this._flagCap
          || this._flagJoin || this._flagMiter || this._flagScale
          || (this.dashes && this.dashes.length > 0)
          || !this._renderer.texture;

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion

          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

        }

        if (flagTexture) {

          if (!this._renderer.rect) {
            this._renderer.rect = {};
          }

          if (!this._renderer.triangles) {
            this._renderer.triangles = new Two.Array(12);
          }

          this._renderer.opacity = this._opacity * parent._renderer.opacity;

          webgl.path.getBoundingClientRect(this._renderer.vertices, this._linewidth, this._renderer.rect);
          webgl.getTriangles(this._renderer.rect, this._renderer.triangles);

          webgl.updateBuffer.call(webgl, gl, this, program);
          webgl.updateTexture.call(webgl, gl, this);

        } else {

          // We still need to update child Two elements on the fill and
          // stroke properties.
          if (!_.isString(this._fill)) {
            this._fill._update();
          }
          if (!_.isString(this._stroke)) {
            this._stroke._update();
          }

        }

        // if (this._mask) {
        //   webgl[this._mask._renderer.type].render.call(mask, gl, program, this);
        // }

        if (this._clip && !forcedParent) {
          return;
        }

        // Draw Texture

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.textureCoordsBuffer);

        gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);


        // Draw Rect

        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.buffer);

        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        return this.flagReset();

      }

    },

    text: {

      updateCanvas: function(elem) {

        var canvas = this.canvas;
        var ctx = this.ctx;

        // Styles
        var scale = elem._renderer.scale;
        var stroke = elem._stroke;
        var linewidth = elem._linewidth * scale;
        var fill = elem._fill;
        var opacity = elem._renderer.opacity || elem._opacity;
        var dashes = elem.dashes;

        canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale), 1);
        canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale), 1);

        var centroid = elem._renderer.rect.centroid;
        var cx = centroid.x;
        var cy = centroid.y;

        var a, b, c, d, e, sx, sy;
        var isOffset = fill._renderer && fill._renderer.offset
          && stroke._renderer && stroke._renderer.offset;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isOffset) {
          ctx.font = [elem._style, elem._weight, elem._size + 'px/' +
            elem._leading + 'px', elem._family].join(' ');
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Styles
        if (fill) {
          if (_.isString(fill)) {
            ctx.fillStyle = fill;
          } else {
            webgl[fill._renderer.type].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (_.isString(stroke)) {
            ctx.strokeStyle = stroke;
          } else {
            webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (_.isNumber(opacity)) {
          ctx.globalAlpha = opacity;
        }
        if (dashes && dashes.length > 0) {
          ctx.setLineDash(dashes);
        }

        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(cx, cy);

        if (!webgl.isHidden.test(fill)) {

          if (fill._renderer && fill._renderer.offset) {

            sx = toFixed(fill._renderer.scale.x);
            sy = toFixed(fill._renderer.scale.y);

            ctx.save();
            ctx.translate( - toFixed(fill._renderer.offset.x),
              - toFixed(fill._renderer.offset.y));
            ctx.scale(sx, sy);

            a = elem._size / fill._renderer.scale.y;
            b = elem._leading / fill._renderer.scale.y;
            ctx.font = [elem._style, elem._weight, toFixed(a) + 'px/',
              toFixed(b) + 'px', elem._family].join(' ');

            c = fill._renderer.offset.x / fill._renderer.scale.x;
            d = fill._renderer.offset.y / fill._renderer.scale.y;

            ctx.fillText(elem.value, toFixed(c), toFixed(d));
            ctx.restore();

          } else {
            ctx.fillText(elem.value, 0, 0);
          }

        }

        if (!webgl.isHidden.test(stroke)) {

          if (stroke._renderer && stroke._renderer.offset) {

            sx = toFixed(stroke._renderer.scale.x);
            sy = toFixed(stroke._renderer.scale.y);

            ctx.save();
            ctx.translate(- toFixed(stroke._renderer.offset.x),
              - toFixed(stroke._renderer.offset.y));
            ctx.scale(sx, sy);

            a = elem._size / stroke._renderer.scale.y;
            b = elem._leading / stroke._renderer.scale.y;
            ctx.font = [elem._style, elem._weight, toFixed(a) + 'px/',
              toFixed(b) + 'px', elem._family].join(' ');

            c = stroke._renderer.offset.x / stroke._renderer.scale.x;
            d = stroke._renderer.offset.y / stroke._renderer.scale.y;
            e = linewidth / stroke._renderer.scale.x;

            ctx.lineWidth = toFixed(e);
            ctx.strokeText(elem.value, toFixed(c), toFixed(d));
            ctx.restore();

          } else {
            ctx.strokeText(elem.value, 0, 0);
          }

        }

        ctx.restore();

      },

      getBoundingClientRect: function(elem, rect) {

        var ctx = webgl.ctx;

        ctx.font = [elem._style, elem._weight, elem._size + 'px/' +
          elem._leading + 'px', elem._family].join(' ');

        ctx.textAlign = 'center';
        ctx.textBaseline = elem._baseline;

        // TODO: Estimate this better
        var width = ctx.measureText(elem._value).width;
        var height = Math.max(elem._size || elem._leading);

        if (this._linewidth && !webgl.isHidden.test(this._stroke)) {
          // width += this._linewidth; // TODO: Not sure if the `measure` calcs this.
          height += this._linewidth;
        }

        var w = width / 2;
        var h = height / 2;

        switch (webgl.alignments[elem._alignment] || elem._alignment) {

          case webgl.alignments.left:
            rect.left = 0;
            rect.right = width;
            break;
          case webgl.alignments.right:
            rect.left = - width;
            rect.right = 0;
            break;
          default:
            rect.left = - w;
            rect.right = w;
        }

        // TODO: Gradients aren't inherited...
        switch (elem._baseline) {
          case 'bottom':
            rect.top = - height;
            rect.bottom = 0;
            break;
          case 'top':
            rect.top = 0;
            rect.bottom = height;
            break;
          default:
            rect.top = - h;
            rect.bottom = h;
        }

        rect.width = width;
        rect.height = height;

        if (!rect.centroid) {
          rect.centroid = {};
        }

        // TODO:
        rect.centroid.x = w;
        rect.centroid.y = h;

      },

      render: function(gl, program, forcedParent) {

        if (!this._visible || !this._opacity) {
          return this;
        }

        this._update();

        // Calculate what changed

        var parent = this.parent;
        var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var flagTexture = this._flagVertices || this._flagFill
          || (this._fill instanceof Two.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
          || (this._fill instanceof Two.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
          || (this._fill instanceof Two.Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale))
          || (this._stroke instanceof Two.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
          || (this._stroke instanceof Two.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
          || (this._stroke instanceof Two.Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale))
          || this._flagStroke || this._flagLinewidth || this._flagOpacity
          || parent._flagOpacity || this._flagVisible || this._flagScale
          || this._flagValue || this._flagFamily || this._flagSize
          || this._flagLeading || this._flagAlignment || this._flagBaseline
          || this._flagStyle || this._flagWeight || this._flagDecoration
          || (this.dashes && this.dashes.length > 0)
          || !this._renderer.texture;

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion

          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

        }

        if (flagTexture) {

          if (!this._renderer.rect) {
            this._renderer.rect = {};
          }

          if (!this._renderer.triangles) {
            this._renderer.triangles = new Two.Array(12);
          }

          this._renderer.opacity = this._opacity * parent._renderer.opacity;

          webgl.text.getBoundingClientRect(this, this._renderer.rect);
          webgl.getTriangles(this._renderer.rect, this._renderer.triangles);

          webgl.updateBuffer.call(webgl, gl, this, program);
          webgl.updateTexture.call(webgl, gl, this);

        } else {

          // We still need to update child Two elements on the fill and
          // stroke properties.
          if (!_.isString(this._fill)) {
            this._fill._update();
          }
          if (!_.isString(this._stroke)) {
            this._stroke._update();
          }

        }

        // if (this._mask) {
        //   webgl[this._mask._renderer.type].render.call(mask, gl, program, this);
        // }

        if (this._clip && !forcedParent) {
          return;
        }

        // Draw Texture

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.textureCoordsBuffer);

        gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);


        // Draw Rect

        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.buffer);

        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        return this.flagReset();

      }

    },

    'linear-gradient': {

      render: function(ctx, elem) {

        if (!ctx.canvas.getContext('2d')) {
          return;
        }

        this._update();

        if (!this._renderer.effect || this._flagEndPoints || this._flagStops) {

          this._renderer.effect = ctx.createLinearGradient(
            this.left._x, this.left._y,
            this.right._x, this.right._y
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }

    },

    'radial-gradient': {

      render: function(ctx, elem) {

        if (!ctx.canvas.getContext('2d')) {
          return;
        }

        this._update();

        if (!this._renderer.effect || this._flagCenter || this._flagFocal
            || this._flagRadius || this._flagStops) {

          this._renderer.effect = ctx.createRadialGradient(
            this.center._x, this.center._y, 0,
            this.focal._x, this.focal._y, this._radius
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }

    },

    texture: {

      render: function(ctx, elem) {

        if (!ctx.canvas.getContext('2d')) {
          return;
        }

        this._update();

        var image = this.image;
        var repeat;

        if (((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded)) {
          this._renderer.effect = ctx.createPattern(image, this._repeat);
        } else if (!this._renderer.effect) {
          return this.flagReset();
        }

        if (this._flagOffset || this._flagLoaded || this._flagScale) {

          if (!(this._renderer.offset instanceof Two.Vector)) {
            this._renderer.offset = new Two.Vector();
          }

          this._renderer.offset.x = - this._offset.x;
          this._renderer.offset.y = - this._offset.y;

          if (image) {

            this._renderer.offset.x += image.width / 2;
            this._renderer.offset.y += image.height / 2;

            if (this._scale instanceof Two.Vector) {
              this._renderer.offset.x *= this._scale.x;
              this._renderer.offset.y *= this._scale.y;
            } else {
              this._renderer.offset.x *= this._scale;
              this._renderer.offset.y *= this._scale;
            }
          }

        }

        if (this._flagScale || this._flagLoaded) {

          if (!(this._renderer.scale instanceof Two.Vector)) {
            this._renderer.scale = new Two.Vector();
          }

          if (this._scale instanceof Two.Vector) {
            this._renderer.scale.copy(this._scale);
          } else {
            this._renderer.scale.set(this._scale, this._scale);
          }

        }

        return this.flagReset();

      }

    },

    getTriangles: function(rect, triangles) {

      var top = rect.top,
          left = rect.left,
          right = rect.right,
          bottom = rect.bottom;

      // First Triangle

      triangles[0] = left;
      triangles[1] = top;

      triangles[2] = right;
      triangles[3] = top;

      triangles[4] = left;
      triangles[5] = bottom;

      // Second Triangle

      triangles[6] = left;
      triangles[7] = bottom;

      triangles[8] = right;
      triangles[9] = top;

      triangles[10] = right;
      triangles[11] = bottom;

    },

    updateTexture: function(gl, elem) {

      this[elem._renderer.type].updateCanvas.call(webgl, elem);

      if (elem._renderer.texture) {
        gl.deleteTexture(elem._renderer.texture);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.textureCoordsBuffer);

      // TODO: Is this necessary every time or can we do once?
      // TODO: Create a registry for textures
      elem._renderer.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, elem._renderer.texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      if (this.canvas.width <= 0 || this.canvas.height <= 0) {
        return;
      }

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

    },

    updateBuffer: function(gl, elem, program) {

      if (_.isObject(elem._renderer.buffer)) {
        gl.deleteBuffer(elem._renderer.buffer);
      }

      elem._renderer.buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.buffer);
      gl.enableVertexAttribArray(program.position);

      gl.bufferData(gl.ARRAY_BUFFER, elem._renderer.triangles, gl.STATIC_DRAW);

      if (_.isObject(elem._renderer.textureCoordsBuffer)) {
        gl.deleteBuffer(elem._renderer.textureCoordsBuffer);
      }

      elem._renderer.textureCoordsBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.textureCoordsBuffer);
      gl.enableVertexAttribArray(program.textureCoords);

      gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.STATIC_DRAW);

    },

    program: {

      create: function(gl, shaders) {
        var program, linked, error;
        program = gl.createProgram();
        _.each(shaders, function(s) {
          gl.attachShader(program, s);
        });

        gl.linkProgram(program);
        linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          gl.deleteProgram(program);
          throw new Two.Utils.Error('unable to link program: ' + error);
        }

        return program;

      }

    },

    shaders: {

      create: function(gl, source, type) {
        var shader, compiled, error;
        shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
          error = gl.getShaderInfoLog(shader);
          gl.deleteShader(shader);
          throw new Two.Utils.Error('unable to compile shader ' + shader + ': ' + error);
        }

        return shader;

      },

      types: {
        vertex: 'VERTEX_SHADER',
        fragment: 'FRAGMENT_SHADER'
      },

      vertex: [
        'attribute vec2 a_position;',
        'attribute vec2 a_textureCoords;',
        '',
        'uniform mat3 u_matrix;',
        'uniform vec2 u_resolution;',
        '',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '   vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;',
        '   vec2 normal = projected / u_resolution;',
        '   vec2 clipspace = (normal * 2.0) - 1.0;',
        '',
        '   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);',
        '   v_textureCoords = a_textureCoords;',
        '}'
      ].join('\n'),

      fragment: [
        'precision mediump float;',
        '',
        'uniform sampler2D u_image;',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '  gl_FragColor = texture2D(u_image, v_textureCoords);',
        '}'
      ].join('\n')

    },

    TextureRegistry: new Two.Registry()

  };

  webgl.ctx = webgl.canvas.getContext('2d');

  var Renderer = Two[Two.Types.webgl] = function(options) {

    var params, gl, vs, fs;
    this.domElement = options.domElement || document.createElement('canvas');

    // Everything drawn on the canvas needs to come from the stage.
    this.scene = new Two.Group();
    this.scene.parent = this;

    this._renderer = {
      matrix: new Two.Array(identity),
      scale: 1,
      opacity: 1
    };
    this._flagMatrix = true;

    // http://games.greggman.com/game/webgl-and-alpha/
    // http://www.khronos.org/registry/webgl/specs/latest/#5.2
    params = _.defaults(options || {}, {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      stencil: true,
      preserveDrawingBuffer: true,
      overdraw: false
    });

    this.overdraw = params.overdraw;

    gl = this.ctx = this.domElement.getContext('webgl', params) ||
      this.domElement.getContext('experimental-webgl', params);

    if (!this.ctx) {
      throw new Two.Utils.Error(
        'unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    vs = webgl.shaders.create(
      gl, webgl.shaders.vertex, webgl.shaders.types.vertex);
    fs = webgl.shaders.create(
      gl, webgl.shaders.fragment, webgl.shaders.types.fragment);

    this.program = webgl.program.create(gl, [vs, fs]);
    gl.useProgram(this.program);

    // Create and bind the drawing buffer

    // look up where the vertex data needs to go.
    this.program.position = gl.getAttribLocation(this.program, 'a_position');
    this.program.matrix = gl.getUniformLocation(this.program, 'u_matrix');
    this.program.textureCoords = gl.getAttribLocation(this.program, 'a_textureCoords');

    // Copied from Three.js WebGLRenderer
    gl.disable(gl.DEPTH_TEST);

    // Setup some initial statements of the gl context
    gl.enable(gl.BLEND);

    // https://code.google.com/p/chromium/issues/detail?id=316393
    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, gl.TRUE);

    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE, gl.ONE_MINUS_SRC_ALPHA );

  };

  _.extend(Renderer, {

    Utils: webgl

  });

  _.extend(Renderer.prototype, Two.Utils.Events, {

    constructor: Renderer,

    setSize: function(width, height, ratio) {

      this.width = width;
      this.height = height;

      this.ratio = _.isUndefined(ratio) ? getRatio(this.ctx) : ratio;

      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;

      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px'
      });

      width *= this.ratio;
      height *= this.ratio;

      // Set for this.stage parent scaling to account for HDPI
      this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio;

      this._flagMatrix = true;

      this.ctx.viewport(0, 0, width, height);

      var resolutionLocation = this.ctx.getUniformLocation(
        this.program, 'u_resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this.trigger(Two.Events.resize, width, height, ratio);

    },

    render: function() {

      var gl = this.ctx;

      if (!this.overdraw) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }

      webgl.group.render.call(this.scene, gl, this.program);
      this._flagMatrix = false;

      return this;

    }

  });

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;

  /**
   * @name Two.Shape
   * @class
   * @extends Two.Utils.Events
   * @description The foundational transformation object for the Two.js scenegraph.
   */
  var Shape = Two.Shape = function() {

    /**
     * @name Two.Shape#_renderer
     * @property {Object}
     * @private
     * @description A private object to store relevant renderer specific variables.
     * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape._renderer.elem`.
     */
    this._renderer = {};
    this._renderer.flagMatrix = _.bind(Shape.FlagMatrix, this);
    this.isShape = true;

    /**
     * @name Two.Shape#id
     * @property {String} - Session specific unique identifier.
     * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
     */
    this.id = Two.Identifier + Two.uniqueId();

    /**
     * @name Two.Shape#classList
     * @property {Array}
     * @description A list of class strings stored if imported / interpreted  from an SVG element.
     */
    this.classList = [];

    /**
     * @name Two.Shape#_matrix
     * @property
     * @description The transformation matrix of the shape.
     * @nota-bene {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
     */
    this._matrix = new Two.Matrix();

    /**
     * @name Two.Shape#translation
     * @property {Two.Vector} - The x and y value for where the shape is placed relative to its parent.
     */
    this.translation = new Two.Vector();

    /**
     * @name Two.Shape#rotation
     * @property {Radians} - The value in radians for how much the shape is rotated relative to its parent.
     */
    this.rotation = 0;

    /**
     * @name Two.Shape#scale
     * @property {Number} - The value for how much the shape is scaled relative to its parent.
     * @nota-bene This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
     */
    this.scale = 1;

  };

  _.extend(Shape, {

    /**
     * @name Two.Shape.FlagMatrix
     * @function
     * @description Utility function used in conjunction with event handlers to update the flagMatrix of a shape.
     */
    FlagMatrix: function() {
      this._flagMatrix = true;
    },

    /**
     * @name Two.Shape.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a `Two.Shape` to any object. Handy if you'd like to extend the `Two.Shape` class on a custom class.
     */
    MakeObservable: function(object) {

      Object.defineProperty(object, 'translation', {
        enumerable: true,
        get: function() {
          return this._translation;
        },
        set: function(v) {
          if (this._translation) {
            this._translation.unbind(Two.Events.change, this._renderer.flagMatrix);
          }
          this._translation = v;
          this._translation.bind(Two.Events.change, this._renderer.flagMatrix);
          Shape.FlagMatrix.call(this);
        }
      });

      Object.defineProperty(object, 'rotation', {
        enumerable: true,
        get: function() {
          return this._rotation;
        },
        set: function(v) {
          this._rotation = v;
          this._flagMatrix = true;
        }
      });

      Object.defineProperty(object, 'scale', {
        enumerable: true,
        get: function() {
          return this._scale;
        },
        set: function(v) {

          if (this._scale instanceof Two.Vector) {
            this._scale.unbind(Two.Events.change, this._renderer.flagMatrix);
          }

          this._scale = v;

          if (this._scale instanceof Two.Vector) {
            this._scale.bind(Two.Events.change, this._renderer.flagMatrix);
          }

          this._flagMatrix = true;
          this._flagScale = true;

        }
      });

    }

  });

  _.extend(Shape.prototype, Two.Utils.Events, {

    // Flags

    /**
     * @name Two.Shape#_flagMatrix
     * @private
     * @property {Boolean} - Determines whether the matrix needs updating.
     */
    _flagMatrix: true,

    /**
     * @name Two.Shape#_flagScale
     * @private
     * @property {Boolean} - Determines whether the scale needs updating.
     */
    _flagScale: false,

    // _flagMask: false,
    // _flagClip: false,

    // Underlying Properties

    /**
     * @name Two.Shape#_translation
     * @private
     * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
     */
    _translation: null,

    /**
     * @name Two.Shape#_rotation
     * @private
     * @property {Radians} - The rotation value in radians.
     */
    _rotation: 0,

    /**
     * @name Two.Shape#_translation
     * @private
     * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
     */
    _scale: 1,

    // _mask: null,
    // _clip: false,

    constructor: Shape,

    /**
     * @name Two.Shape#addTo
     * @function
     * @param {Two.Group} group - The parent the shape adds itself to.
     * @description Convenience method to add itself to the scenegraph.
     */
    addTo: function(group) {
      group.add(this);
      return this;
    },

    /**
     * @name Two.Shape#clone
     * @function
     * @param {Two.Group} [parent] - Optional argument to automatically add the shape to a scenegraph.
     * @returns {Two.Shape}
     * @description Create a new `Two.Shape` with the same values as the current shape.
     */
    clone: function(parent) {

      var clone = new Shape();

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      if (parent) {
        parent.add(clone);
      }

      return clone._update();

    },

    /**
     * @name Two.Shape#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function(bubbles) {

      if (!this._matrix.manual && this._flagMatrix) {

        this._matrix
          .identity()
          .translate(this.translation.x, this.translation.y);

          if (this._scale instanceof Two.Vector) {
            this._matrix.scale(this._scale.x, this._scale.y);
          } else {
            this._matrix.scale(this._scale);
          }

          this._matrix.rotate(this.rotation);

      }

      if (bubbles) {
        if (this.parent && this.parent._update) {
          this.parent._update();
        }
      }

      return this;

    },

    /**
     * @name Two.Shape#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      this._flagMatrix = this._flagScale = false;

      return this;

    }

  });

  Shape.MakeObservable(Shape.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  // Constants

  var min = Math.min, max = Math.max, round = Math.round,
    ceil = Math.ceil, floor = Math.floor,
    getComputedMatrix = Two.Utils.getComputedMatrix;

  var commands = {};
  var _ = Two.Utils;

  _.each(Two.Commands, function(v, k) {
    commands[k] = new RegExp(v);
  });

  /**
   * @name Two.Path
   * @class
   * @extends Two.Shape
   * @param {Two#Anchor[]} [vertices] - A list of Two.Anchors that represent the order and coordinates to construct the rendered shape.
   * @param {Boolean} [closed=false] - Describes whether the shape is closed or open.
   * @param {Boolean} [curved=false] - Describes whether the shape automatically calculates bezier handles for each vertex.
   * @param {Boolean} [manual=false] - Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans.
   * @description This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.
   */
  var Path = Two.Path = function(vertices, closed, curved, manual) {

    Two.Shape.call(this);

    this._renderer.type = 'path';
    this._renderer.flagVertices = _.bind(Path.FlagVertices, this);
    this._renderer.bindVertices = _.bind(Path.BindVertices, this);
    this._renderer.unbindVertices = _.bind(Path.UnbindVertices, this);

    this._renderer.flagFill = _.bind(Path.FlagFill, this);
    this._renderer.flagStroke = _.bind(Path.FlagStroke, this);
    this._renderer.vertices = [];
    this._renderer.collection = [];

    /**
     * @name Two.Path#closed
     * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
     */
    this._closed = !!closed;

    /**
     * @name Two.Path#curved
     * @property {Boolean} - When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
     */
    this._curved = !!curved;

    /**
     * @name Two.Path#beginning
     * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
     * @description `Two.Path.beginning` is a percentage value that represents at what percentage into the path should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#ending}.
     */
    this.beginning = 0;

    /**
     * @name Two.Path#ending
     * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
     * @description `Two.Path.ending` is a percentage value that represents at what percentage into the path should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#beginning}.
     */
    this.ending = 1;

    // Style properties

    /**
     * @name Two.Path#fill
     * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
     */
    this.fill = '#fff';

    /**
     * @name Two.Path#stroke
     * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
     */
    this.stroke = '#000';

    /**
     * @name Two.Path#linewidth
     * @property {Number} - The thickness in pixels of the stroke.
     */
    this.linewidth = 1.0;

    /**
     * @name Two.Path#opacity
     * @property {Number} - The opaqueness of the path.
     * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
     */
    this.opacity = 1.0;

    /**
     * @name Two.Path#className
     * @property {String} - A class name to be searched by in {@link Two.Group}s.
     */
    this.className = '';

    /**
     * @name Two.Path#visible
     * @property {Boolean} - Display the path or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    this.visible = true;

    /**
     * @name Two.Path#cap
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
     */
    this.cap = 'butt';      // Default of Adobe Illustrator

    /**
     * @name Two.Path#join
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
     */
    this.join = 'miter';    // Default of Adobe Illustrator

    /**
     * @name Two.Path#miter
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
     */
    this.miter = 4;         // Default of Adobe Illustrator

    /**
     * @name Two.Path#vertices
     * @property {Two.Anchor[]} - An ordered list of anchor points for rendering the path.
     * @description An of `Two.Anchor` objects that consist of what form the path takes.
     * @nota-bene The array when manipulating is actually a {@link Two.Utils.Collection}.
     */
    this.vertices = vertices;

    /**
     * @name Two.Path#automatic
     * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
     */
    this.automatic = !manual;

    /**
     * @name Two.Path#dashes
     * @property {String} - List of dash and gap values.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    this.dashes = [];

  };

  _.extend(Path, {

    /**
     * @name Two.Path.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Path}.
     */
    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'className',
      'visible',
      'cap',
      'join',
      'miter',

      'closed',
      'curved',
      'automatic',
      'beginning',
      'ending'
    ],

    Utils: {
      getCurveLength: getCurveLength
    },

    /**
     * @name Two.Path.FlagVertices
     * @function
     * @description Cached method to let renderers know vertices have been updated on a {@link Two.Path}.
     */
    FlagVertices: function() {
      this._flagVertices = true;
      this._flagLength = true;
      if (this.parent) {
        this.parent._flagLength = true;
      }
    },

    /**
     * @name Two.Path.BindVertices
     * @function
     * @description Cached method to let {@link Two.Path} know vertices have been added to the instance.
     */
    BindVertices: function(items) {

      // This function is called a lot
      // when importing a large SVG
      var i = items.length;
      while (i--) {
        items[i].bind(Two.Events.change, this._renderer.flagVertices);
      }

      this._renderer.flagVertices();

    },

    /**
     * @name Two.Path.BindVertices
     * @function
     * @description Cached method to let {@link Two.Path} know vertices have been removed from the instance.
     */
    UnbindVertices: function(items) {

      var i = items.length;
      while (i--) {
        items[i].unbind(Two.Events.change, this._renderer.flagVertices);
      }

      this._renderer.flagVertices();

    },

    /**
     * @name Two.Path.FlagFill
     * @function
     * @description Cached method to let {@link Two.Path} know the fill has changed.
     */
    FlagFill: function() {
      this._flagFill = true;
    },

    /**
     * @name Two.Path.FlagFill
     * @function
     * @description Cached method to let {@link Two.Path} know the stroke has changed.
     */
    FlagStroke: function() {
      this._flagStroke = true;
    },

    /**
     * @name Two.Path.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a `Two.Path` to any object. Handy if you'd like to extend the `Two.Path` class on a custom class.
     */
    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      // Only the 7 defined properties are flagged like this. The subsequent
      // properties behave differently and need to be hand written.
      _.each(Path.Properties.slice(2, 9), Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'fill', {
        enumerable: true,
        get: function() {
          return this._fill;
        },
        set: function(f) {

          if (this._fill instanceof Two.Gradient
            || this._fill instanceof Two.LinearGradient
            || this._fill instanceof Two.RadialGradient
            || this._fill instanceof Two.Texture) {
            this._fill.unbind(Two.Events.change, this._renderer.flagFill);
          }

          this._fill = f;
          this._flagFill = true;

          if (this._fill instanceof Two.Gradient
            || this._fill instanceof Two.LinearGradient
            || this._fill instanceof Two.RadialGradient
            || this._fill instanceof Two.Texture) {
            this._fill.bind(Two.Events.change, this._renderer.flagFill);
          }

        }
      });

      Object.defineProperty(object, 'stroke', {
        enumerable: true,
        get: function() {
          return this._stroke;
        },
        set: function(f) {

          if (this._stroke instanceof Two.Gradient
            || this._stroke instanceof Two.LinearGradient
            || this._stroke instanceof Two.RadialGradient
            || this._stroke instanceof Two.Texture) {
            this._stroke.unbind(Two.Events.change, this._renderer.flagStroke);
          }

          this._stroke = f;
          this._flagStroke = true;

          if (this._stroke instanceof Two.Gradient
            || this._stroke instanceof Two.LinearGradient
            || this._stroke instanceof Two.RadialGradient
            || this._stroke instanceof Two.Texture) {
            this._stroke.bind(Two.Events.change, this._renderer.flagStroke);
          }

        }
      });

      /**
       * @name Two.Path#length
       * @property {Number} - The sum of distances between all {@link Two.Path#vertices}.
       */
      Object.defineProperty(object, 'length', {
        get: function() {
          if (this._flagLength) {
            this._updateLength();
          }
          return this._length;
        }
      });

      Object.defineProperty(object, 'closed', {
        enumerable: true,
        get: function() {
          return this._closed;
        },
        set: function(v) {
          this._closed = !!v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'curved', {
        enumerable: true,
        get: function() {
          return this._curved;
        },
        set: function(v) {
          this._curved = !!v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'automatic', {
        enumerable: true,
        get: function() {
          return this._automatic;
        },
        set: function(v) {
          if (v === this._automatic) {
            return;
          }
          this._automatic = !!v;
          var method = this._automatic ? 'ignore' : 'listen';
          _.each(this.vertices, function(v) {
            v[method]();
          });
        }
      });

      Object.defineProperty(object, 'beginning', {
        enumerable: true,
        get: function() {
          return this._beginning;
        },
        set: function(v) {
          this._beginning = v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'ending', {
        enumerable: true,
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._ending = v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'vertices', {

        enumerable: true,

        get: function() {
          return this._collection;
        },

        set: function(vertices) {

          var updateVertices = this._renderer.flagVertices;
          var bindVertices = this._renderer.bindVertices;
          var unbindVertices = this._renderer.unbindVertices;

          // Remove previous listeners
          if (this._collection) {
            this._collection
              .unbind(Two.Events.insert, bindVertices)
              .unbind(Two.Events.remove, unbindVertices);
          }

          // Create new Collection with copy of vertices
          if (vertices instanceof Two.Utils.Collection) {
            this._collection = vertices;
          } else {
            this._collection = new Two.Utils.Collection(vertices || []);
          }


          // Listen for Collection changes and bind / unbind
          this._collection
            .bind(Two.Events.insert, bindVertices)
            .bind(Two.Events.remove, unbindVertices);

          // Bind Initial Vertices
          bindVertices(this._collection);

        }

      });

      /**
       * @name Two.Path#clip
       * @property {Two.Shape} - Object to define clipping area.
       * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
       */
      Object.defineProperty(object, 'clip', {
        enumerable: true,
        get: function() {
          return this._clip;
        },
        set: function(v) {
          this._clip = v;
          this._flagClip = true;
        }
      });

    }

  });

  _.extend(Path.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    /**
     * @name Two.Path#_flagVertices
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#vertices} need updating.
     */
    _flagVertices: true,

    /**
     * @name Two.Path#_flagLength
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#length} needs updating.
     */
    _flagLength: true,

    /**
     * @name Two.Path#_flagFill
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#fill} needs updating.
     */
    _flagFill: true,

    /**
     * @name Two.Path#_flagStroke
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#stroke} needs updating.
     */
    _flagStroke: true,

    /**
     * @name Two.Path#_flagLinewidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#linewidth} needs updating.
     */
    _flagLinewidth: true,

    /**
     * @name Two.Path#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#opacity} needs updating.
     */
    _flagOpacity: true,

    /**
     * @name Two.Path#_flagVisible
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#visible} needs updating.
     */
    _flagVisible: true,

    /**
     * @name Two.Path#_flagClassName
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#className} needs updating.
     */
    _flagClassName: true,

    /**
     * @name Two.Path#_flagCap
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#cap} needs updating.
     */
    _flagCap: true,

    /**
     * @name Two.Path#_flagJoin
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#join} needs updating.
     */
    _flagJoin: true,

    /**
     * @name Two.Path#_flagMiter
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#miter} needs updating.
     */
    _flagMiter: true,

    /**
     * @name Two.Path#_flagClip
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#clip} needs updating.
     */
    _flagClip: false,

    // Underlying Properties

    /**
     * @name Two.Path#_length
     * @private
     * @see {@link Two.Path#length}
     */
    _length: 0,

    /**
     * @name Two.Path#_fill
     * @private
     * @see {@link Two.Path#fill}
     */
    _fill: '#fff',

    /**
     * @name Two.Path#_stroke
     * @private
     * @see {@link Two.Path#stroke}
     */
    _stroke: '#000',

    /**
     * @name Two.Path#_linewidth
     * @private
     * @see {@link Two.Path#linewidth}
     */
    _linewidth: 1.0,

    /**
     * @name Two.Path#_opacity
     * @private
     * @see {@link Two.Path#opacity}
     */
    _opacity: 1.0,

    /**
     * @name Two.Path#_className
     * @private
     * @see {@link Two.Path#className}
     */
    _className: '',

    /**
     * @name Two.Path#_visible
     * @private
     * @see {@link Two.Path#visible}
     */
    _visible: true,

    /**
     * @name Two.Path#_cap
     * @private
     * @see {@link Two.Path#cap}
     */
    _cap: 'round',

    /**
     * @name Two.Path#_join
     * @private
     * @see {@link Two.Path#join}
     */
    _join: 'round',

    /**
     * @name Two.Path#_miter
     * @private
     * @see {@link Two.Path#miter}
     */
    _miter: 4,

    /**
     * @name Two.Path#_closed
     * @private
     * @see {@link Two.Path#closed}
     */
    _closed: true,

    /**
     * @name Two.Path#_curved
     * @private
     * @see {@link Two.Path#curved}
     */
    _curved: false,

    /**
     * @name Two.Path#_automatic
     * @private
     * @see {@link Two.Path#automatic}
     */
    _automatic: true,

    /**
     * @name Two.Path#_beginning
     * @private
     * @see {@link Two.Path#beginning}
     */
    _beginning: 0,

    /**
     * @name Two.Path#_ending
     * @private
     * @see {@link Two.Path#ending}
     */
    _ending: 1.0,

    /**
     * @name Two.Path#_clip
     * @private
     * @see {@link Two.Path#clip}
     */
    _clip: false,

    constructor: Path,

    /**
     * @name Two.Path#clone
     * @function
     * @param {Two.Group} parent - The parent group or scene to add the clone to.
     * @returns {Two.Path}
     * @description Create a new instance of {@link Two.Path} with the same properties of the current path.
     */
    clone: function(parent) {

      var clone = new Path();

      clone.vertices = this.vertices;

      for (var i = 0; i < Path.Properties.length; i++) {
        var k = Path.Properties[i];
        clone[k] = this[k];
      }

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      if (parent) {
        parent.add(clone);
      }

      return clone._update();

    },

    /**
     * @name Two.Path#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject: function() {

      var result = {
        vertices: _.map(this.vertices, function(v) {
          return v.toObject();
        })
      };

      _.each(Two.Shape.Properties, function(k) {
        result[k] = this[k];
      }, this);

      result.translation = this.translation.toObject();
      result.rotation = this.rotation;
      result.scale = this.scale instanceof Two.Vector ? this.scale.toObject() : this.scale;

      return result;

    },

    /**
     * @name Two.Path#noFill
     * @function
     * @description Short hand method to set fill to `transparent`.
     */
    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    /**
     * @name Two.Path#noStroke
     * @function
     * @description Short hand method to set stroke to `transparent`.
     */
    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    /**
     * @name Two.Path#corner
     * @function
     * @description Orient the vertices of the shape to the upper left-hand corner of the path.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.addSelf(rect.centroid);
      });

      return this;

    },

    /**
     * @name Two.Path#center
     * @function
     * @description Orient the vertices of the shape to the center of the path.
     */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.subSelf(rect.centroid);
      });

      // this.translation.addSelf(rect.centroid);

      return this;

    },

    /**
     * @name Two.Path#remove
     * @function
     * @description Remove self from the scene / parent.
     */
    remove: function() {

      if (!this.parent) {
        return this;
      }

      this.parent.remove(this);

      return this;

    },

    /**
     * @name Two.Path#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
     */
    getBoundingClientRect: function(shallow) {
      var matrix, border, l, x, y, i, v0, c0, c1, v1;

      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity;

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      matrix = !!shallow ? this._matrix : getComputedMatrix(this);

      border = this.linewidth / 2;
      l = this._renderer.vertices.length;

      if (l <= 0) {
        v = matrix.multiply(0, 0, 1);
        return {
          top: v.y,
          left: v.x,
          right: v.x,
          bottom: v.y,
          width: 0,
          height: 0
        };
      }

      for (i = 1; i < l; i++) {

        v1 = this._renderer.vertices[i];
        v0 = this._renderer.vertices[i - 1];

        if (v0.controls && v1.controls) {

          if (v0.relative) {
            c0 = matrix.multiply(
              v0.controls.right.x + v0.x, v0.controls.right.y + v0.y, 1);
          } else {
            c0 = matrix.multiply(
              v0.controls.right.x, v0.controls.right.y, 1);
          }
          v0 = matrix.multiply(v0.x, v0.y, 1);

          if (v1.relative) {
            c1 = matrix.multiply(
              v1.controls.left.x + v1.x, v1.controls.left.y + v1.y, 1);
          } else {
            c1 = matrix.multiply(
              v1.controls.left.x, v1.controls.left.y, 1);
          }
          v1 = matrix.multiply(v1.x, v1.y, 1);

          var bb = Two.Utils.getCurveBoundingBox(
            v0.x, v0.y, c0.x, c0.y, c1.x, c1.y, v1.x, v1.y);

          top = min(bb.min.y - border, top);
          left = min(bb.min.x - border, left);
          right = max(bb.max.x + border, right);
          bottom = max(bb.max.y + border, bottom);

        } else {

          if (i <= 1) {

            v0 = matrix.multiply(v0.x, v0.y, 1);

            top = min(v0.y - border, top);
            left = min(v0.x - border, left);
            right = max(v0.x + border, right);
            bottom = max(v0.y + border, bottom);

          }

          v1 = matrix.multiply(v1.x, v1.y, 1);

          top = min(v1.y - border, top);
          left = min(v1.x - border, left);
          right = max(v1.x + border, right);
          bottom = max(v1.y + border, bottom);

        }

      }

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
      };

    },

    /**
     * @name Two.Path#getPointAt
     * @function
     * @param {Boolean} t - Percentage value describing where on the Two.Path to estimate and assign coordinate values.
     * @param {Two.Vector} [obj=undefined] - Object to apply calculated x, y to. If none available returns new Object.
     * @returns {Object}
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this Two.Path's curve.
     */
    getPointAt: function(t, obj) {

      var ia, ib, result;
      var x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
      var target = this.length * Math.min(Math.max(t, 0), 1);
      var length = this.vertices.length;
      var last = length - 1;

      var a = null;
      var b = null;

      for (var i = 0, l = this._lengths.length, sum = 0; i < l; i++) {

        if (sum + this._lengths[i] >= target) {

          if (this._closed) {
            ia = Two.Utils.mod(i, length);
            ib = Two.Utils.mod(i - 1, length);
            if (i === 0) {
              ia = ib;
              ib = i;
            }
          } else {
            ia = i;
            ib = Math.min(Math.max(i - 1, 0), last);
          }

          a = this.vertices[ia];
          b = this.vertices[ib];
          target -= sum;
          if (this._lengths[i] !== 0) {
            t = target / this._lengths[i];
          } else {
            t = 0;
          }

          break;

        }

        sum += this._lengths[i];

      }

      if (_.isNull(a) || _.isNull(b)) {
        return null;
      }

      if (!a) {
        return b;
      } else if (!b) {
        return a;
      }

      right = b.controls && b.controls.right;
      left = a.controls && a.controls.left;

      x1 = b.x;
      y1 = b.y;
      x2 = (right || b).x;
      y2 = (right || b).y;
      x3 = (left || a).x;
      y3 = (left || a).y;
      x4 = a.x;
      y4 = a.y;

      if (right && b.relative) {
        x2 += b.x;
        y2 += b.y;
      }

      if (left && a.relative) {
        x3 += a.x;
        y3 += a.y;
      }

      x = Two.Utils.getComponentOnCubicBezier(t, x1, x2, x3, x4);
      y = Two.Utils.getComponentOnCubicBezier(t, y1, y2, y3, y4);

      // Higher order points for control calculation.
      var t1x = Two.Utils.lerp(x1, x2, t);
      var t1y = Two.Utils.lerp(y1, y2, t);
      var t2x = Two.Utils.lerp(x2, x3, t);
      var t2y = Two.Utils.lerp(y2, y3, t);
      var t3x = Two.Utils.lerp(x3, x4, t);
      var t3y = Two.Utils.lerp(y3, y4, t);

      // Calculate the returned points control points.
      var brx = Two.Utils.lerp(t1x, t2x, t);
      var bry = Two.Utils.lerp(t1y, t2y, t);
      var alx = Two.Utils.lerp(t2x, t3x, t);
      var aly = Two.Utils.lerp(t2y, t3y, t);

      if (_.isObject(obj)) {

        obj.x = x;
        obj.y = y;

        if (!_.isObject(obj.controls)) {
          Two.Anchor.AppendCurveProperties(obj);
        }

        obj.controls.left.x = brx;
        obj.controls.left.y = bry;
        obj.controls.right.x = alx;
        obj.controls.right.y = aly;

        if (!_.isBoolean(obj.relative) || obj.relative) {
          obj.controls.left.x -= x;
          obj.controls.left.y -= y;
          obj.controls.right.x -= x;
          obj.controls.right.y -= y;
        }

        obj.t = t;

        return obj;

      }

      result = new Two.Anchor(
        x, y, brx - x, bry - y, alx - x, aly - y,
        this._curved ? Two.Commands.curve : Two.Commands.line
      );

      result.t = t;

      return result;

    },

    /**
     * @name Two.Path#plot
     * @function
     * @description Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     * @nota-bene While this method is public it is internally called by {@link Two.Path#_update} when `automatic = true`.
     */
    plot: function() {

      if (this.curved) {
        Two.Utils.getCurveFromPoints(this._collection, this.closed);
        return this;
      }

      for (var i = 0; i < this._collection.length; i++) {
        this._collection[i].command = i === 0 ? Two.Commands.move : Two.Commands.line;
      }

      return this;

    },

    /**
     * @name Two.Path#subdivide
     * @function
     * @param {Integer} limit - How many times to recurse subdivisions.
     * @description Insert a {@link Two.Anchor} at the midpoint between every item in {@link Two.Path#vertices}.
     */
    subdivide: function(limit) {
      //TODO: DRYness (function below)
      this._update();

      var last = this.vertices.length - 1;
      var b = this.vertices[last];
      var closed = this._closed || this.vertices[last]._command === Two.Commands.close;
      var points = [];
      _.each(this.vertices, function(a, i) {

        if (i <= 0 && !closed) {
          b = a;
          return;
        }

        if (a.command === Two.Commands.move) {
          points.push(new Two.Anchor(b.x, b.y));
          if (i > 0) {
            points[points.length - 1].command = Two.Commands.line;
          }
          b = a;
          return;
        }

        var verts = getSubdivisions(a, b, limit);
        points = points.concat(verts);

        // Assign commands to all the verts
        _.each(verts, function(v, i) {
          if (i <= 0 && b.command === Two.Commands.move) {
            v.command = Two.Commands.move;
          } else {
            v.command = Two.Commands.line;
          }
        });

        if (i >= last) {

          // TODO: Add check if the two vectors in question are the same values.
          if (this._closed && this._automatic) {

            b = a;

            verts = getSubdivisions(a, b, limit);
            points = points.concat(verts);

            // Assign commands to all the verts
            _.each(verts, function(v, i) {
              if (i <= 0 && b.command === Two.Commands.move) {
                v.command = Two.Commands.move;
              } else {
                v.command = Two.Commands.line;
              }
            });

          } else if (closed) {
            points.push(new Two.Anchor(a.x, a.y));
          }

          points[points.length - 1].command = closed
            ? Two.Commands.close : Two.Commands.line;

        }

        b = a;

      }, this);

      this._automatic = false;
      this._curved = false;
      this.vertices = points;

      return this;

    },

    /**
     * @name Two.Path#_updateLength
     * @function
     * @private
     * @param {Integer} [limit=] -
     * @param {Boolean} [silent=false] - If set to `true` then the path isn't updated before calculation. Useful for internal use.
     * @description Recalculate the {@link Two.Path#length} value.
     */
    _updateLength: function(limit, silent) {
      //TODO: DRYness (function above)
      if (!silent) {
        this._update();
      }

      var length = this.vertices.length;
      var last = length - 1;
      var b = this.vertices[last];
      var closed = false;//this._closed || this.vertices[last]._command === Two.Commands.close;
      var sum = 0;

      if (_.isUndefined(this._lengths)) {
        this._lengths = [];
      }

      _.each(this.vertices, function(a, i) {

        if ((i <= 0 && !closed) || a.command === Two.Commands.move) {
          b = a;
          this._lengths[i] = 0;
          return;
        }

        this._lengths[i] = getCurveLength(a, b, limit);
        this._lengths[i] = Two.Utils.toFixed(this._lengths[i]);
        sum += this._lengths[i];

        if (i >= last && closed) {

          b = this.vertices[(i + 1) % length];

          this._lengths[i + 1] = getCurveLength(a, b, limit);
          this._lengths[i + 1] = Two.Utils.toFixed(this._lengths[i + 1]);
          sum += this._lengths[i + 1];

        }

        b = a;

      }, this);

      this._length = sum;
      this._flagLength = false;

      return this;

    },

    /**
     * @name Two.Path#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      if (this._flagVertices) {

        if (this._automatic) {
          this.plot();
        }

        if (this._flagLength) {
          this._updateLength(undefined, true);
        }

        var l = this._collection.length;
        var last = l - 1;
        var closed = this._closed;

        var beginning = Math.min(this._beginning, this._ending);
        var ending = Math.max(this._beginning, this._ending);

        var bid = getIdByLength(this, beginning * this._length);
        var eid = getIdByLength(this, ending * this._length);

        var low = ceil(bid);
        var high = floor(eid);

        var left, right, prev, next, v;

        this._renderer.vertices.length = 0;

        for (var i = 0; i < l; i++) {

          if (this._renderer.collection.length <= i) {
            // Expected to be `relative` anchor points.
            this._renderer.collection.push(new Two.Anchor());
          }

          if (i > high && !right) {

            v = this._renderer.collection[i];
            v.copy(this._collection[i]);
            this.getPointAt(ending, v);
            v.command = this._renderer.collection[i].command;
            this._renderer.vertices.push(v);

            right = v;
            prev = this._collection[i - 1];

            // Project control over the percentage `t`
            // of the in-between point
            if (prev && prev.controls) {

              v.controls.right.clear();

              this._renderer.collection[i - 1].controls.right
                .clear()
                .lerp(prev.controls.right, v.t);

            }

          } else if (i >= low && i <= high) {

            v = this._renderer.collection[i]
              .copy(this._collection[i]);
            this._renderer.vertices.push(v);

            if (i === high && contains(this, ending)) {
              right = v;
              if (!closed && right.controls) {
                right.controls.right.clear();
              }
            } else if (i === low && contains(this, beginning)) {
              left = v;
              left.command = Two.Commands.move;
              if (!closed && left.controls) {
                left.controls.left.clear();
              }
            }

          }

        }

        // Prepend the trimmed point if necessary.
        if (low > 0 && !left) {

          i = low - 1;

          v = this._renderer.collection[i];
          v.copy(this._collection[i]);
          this.getPointAt(beginning, v);
          v.command = Two.Commands.move;
          this._renderer.vertices.unshift(v);

          left = v;
          next = this._collection[i + 1];

          // Project control over the percentage `t`
          // of the in-between point
          if (next && next.controls) {

            v.controls.left.clear();

            this._renderer.collection[i + 1].controls.left
              .copy(next.controls.left)
              .lerp(Two.Vector.zero, v.t);

          }

        }

      }

      Two.Shape.prototype._update.apply(this, arguments);

      return this;

    },

    /**
     * @name Two.Path#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      this._flagVertices =  this._flagFill =  this._flagStroke =
         this._flagLinewidth = this._flagOpacity = this._flagVisible =
         this._flagCap = this._flagJoin = this._flagMiter =
         this._flagClassName = this._flagClip = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Path.MakeObservable(Path.prototype);

   // Utility functions

  function contains(path, t) {

    if (t === 0 || t === 1) {
      return true;
    }

    var length = path._length;
    var target = length * t;
    var elapsed = 0;

    for (var i = 0; i < path._lengths.length; i++) {
      var dist = path._lengths[i];
      if (elapsed >= target) {
        return target - elapsed >= 0;
      }
      elapsed += dist;
    }

    return false;

  }

  /**
   * @protected
   * @param {Two.Path} path - The path to analyze against.
   * @param {Number} target - The target length at which to find an anchor.
   * @returns {Integer}
   * @description Return the id of an anchor based on a target length.
   */
  function getIdByLength(path, target) {

    var total = path._length;

    if (target <= 0) {
      return 0;
    } else if (target >= total) {
      return path._lengths.length - 1;
    }

    for (var i = 0, sum = 0; i < path._lengths.length; i++) {

      if (sum + path._lengths[i] >= target) {
        target -= sum;
        return Math.max(i - 1, 0) + target / path._lengths[i];
      }

      sum += path._lengths[i];

    }

    return - 1;

  }

  function getCurveLength(a, b, limit) {
    // TODO: DRYness
    var x1, x2, x3, x4, y1, y2, y3, y4;

    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;

    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;

    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }

    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }

    return Two.Utils.getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit);

  }

  function getSubdivisions(a, b, limit) {
    // TODO: DRYness
    var x1, x2, x3, x4, y1, y2, y3, y4;

    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;

    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;

    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }

    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }

    return Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);

  }

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var Line = Two.Line = function(x1, y1, x2, y2) {

    var width = x2 - x1;
    var height = y2 - y1;

    var w2 = width / 2;
    var h2 = height / 2;

    Path.call(this, [
        new Two.Anchor(x1, y1),
        new Two.Anchor(x2, y2)
    ]);

    this.vertices[0].command = Two.Commands.move;
    this.vertices[1].command = Two.Commands.line;

    this.automatic = false;

  };

  _.extend(Line.prototype, Path.prototype);
  Line.prototype.constructor = Line;

  Path.MakeObservable(Line.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var Rectangle = Two.Rectangle = function(x, y, width, height) {

    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
      // new Two.Anchor() // TODO: Figure out how to handle this for `beginning` / `ending` animations
    ], true, false, true);

    this.width = width;
    this.height = height;

    this.origin = new Two.Vector();
    this.translation.set(x, y);

    this._update();

  };

  _.extend(Rectangle, {

    Properties: ['width', 'height'],

    MakeObservable: function(object) {

      Path.MakeObservable(object);
      _.each(Rectangle.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'origin', {
        enumerable: true,
        get: function() {
          return this._origin;
        },
        set: function(v) {
          if (this._origin) {
            this._origin.unbind(Two.Events.change, this._renderer.flagVertices);
          }
          this._origin = v;
          this._origin.bind(Two.Events.change, this._renderer.flagVertices);
          this._renderer.flagVertices();
        }
      });

    }

  });

  _.extend(Rectangle.prototype, Path.prototype, {

    _width: 0,
    _height: 0,

    _flagWidth: 0,
    _flagHeight: 0,

    _origin: null,

    constructor: Rectangle,

    _update: function() {

      if (this._flagWidth || this._flagHeight) {

        var xr = this._width / 2;
        var yr = this._height / 2;

        this.vertices[0].set(-xr, -yr).add(this._origin).command = Two.Commands.move;
        this.vertices[1].set(xr, -yr).add(this._origin).command = Two.Commands.line;
        this.vertices[2].set(xr, yr).add(this._origin).command = Two.Commands.line;
        this.vertices[3].set(-xr, yr).add(this._origin).command = Two.Commands.line;
        // FYI: Two.Sprite and Two.ImageSequence have 4 verts
        if (this.vertices[4]) {
          this.vertices[4].set(-xr, -yr).add(this._origin).command = Two.Commands.line;
        }

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    clone: function(parent) {

      var clone = new Rectangle(0, 0, this.width, this.height);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  Rectangle.MakeObservable(Rectangle.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2;
  var cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  // Circular coefficient
  var c = (4 / 3) * Math.tan(Math.PI / 8);

  var Ellipse = Two.Ellipse = function(ox, oy, rx, ry, resolution) {

    if (!_.isNumber(ry)) {
      ry = rx;
    }

    var amount = resolution || 5;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor();
    }, this);

    Path.call(this, points, true, true, true);

    this.width = rx * 2;
    this.height = ry * 2;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Ellipse, {

    Properties: ['width', 'height'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Ellipse.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Ellipse.prototype, Path.prototype, {

    _width: 0,
    _height: 0,

    _flagWidth: false,
    _flagHeight: false,

    constructor: Ellipse,

    _update: function() {

      if (this._flagWidth || this._flagHeight) {
        for (var i = 0, l = this.vertices.length, last = l - 1; i < l; i++) {

          var pct = i / last;
          var theta = pct * TWO_PI;

          var rx = this._width / 2;
          var ry = this._height / 2;
          var ct = cos(theta);
          var st = sin(theta);

          var x = rx * cos(theta);
          var y = ry * sin(theta);

          var lx = i === 0 ? 0 : rx * c * cos(theta - HALF_PI);
          var ly = i === 0 ? 0 : ry * c * sin(theta - HALF_PI);

          var rx = i === last ? 0 : rx * c * cos(theta + HALF_PI);
          var ry = i === last ? 0 : ry * c * sin(theta + HALF_PI);

          var v = this.vertices[i];

          v.command = i === 0 ? Two.Commands.move : Two.Commands.curve;
          v.set(x, y);
          v.controls.left.set(lx, ly);
          v.controls.right.set(rx, ry);

        }
      }

      Path.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = false;

      Path.prototype.flagReset.call(this);
      return this;

    },

    clone: function(parent) {

      var rx = this.width / 2;
      var ry = this.height / 2;
      var resolution = this.vertices.length;
      var clone = new Ellipse(0, 0, rx, ry, resolution);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  Ellipse.MakeObservable(Ellipse.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2;
  var cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  // Circular coefficient
  var c = (4 / 3) * Math.tan(Math.PI / 8);

  var Circle = Two.Circle = function(ox, oy, r, res) {

    var amount = res || 5;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor();
    }, this);

    Path.call(this, points, true, true, true);

    this.radius = r;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Circle, {

    Properties: ['radius'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Circle.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Circle.prototype, Path.prototype, {

    _radius: 0,
    _flagRadius: false,

    constructor: Circle,

    _update: function() {

      if (this._flagRadius) {
        for (var i = 0, l = this.vertices.length, last = l - 1; i < l; i++) {

          var pct = i / last;
          var theta = pct * TWO_PI;

          var radius = this._radius;
          var ct = cos(theta);
          var st = sin(theta);
          var rc = radius * c;

          var x = radius * cos(theta);
          var y = radius * sin(theta);

          var lx = i === 0 ? 0 : rc * cos(theta - HALF_PI);
          var ly = i === 0 ? 0 : rc * sin(theta - HALF_PI);

          var rx = i === last ? 0 : rc * cos(theta + HALF_PI);
          var ry = i === last ? 0 : rc * sin(theta + HALF_PI);

          var v = this.vertices[i];

          v.command = i === 0 ? Two.Commands.move : Two.Commands.curve;
          v.set(x, y);
          v.controls.left.set(lx, ly);
          v.controls.right.set(rx, ry);

        }
      }

      Path.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagRadius = false;

      Path.prototype.flagReset.call(this);
      return this;

    },

    clone: function(parent) {

      var clone = new Circle(0, 0, this.radius, this.vertices.length);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  Circle.MakeObservable(Circle.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  var Polygon = Two.Polygon = function(ox, oy, r, sides) {

    sides = Math.max(sides || 0, 3);

    Path.call(this);

    this.closed = true;
    this.automatic = false;

    this.width = r * 2;
    this.height = r * 2;
    this.sides = sides;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Polygon, {

    Properties: ['width', 'height', 'sides'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Polygon.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Polygon.prototype, Path.prototype, {

    _width: 0,
    _height: 0,
    _sides: 0,

    _flagWidth: false,
    _flagHeight: false,
    _flagSides: false,

    constructor: Polygon,

    _update: function() {

      if (this._flagWidth || this._flagHeight || this._flagSides) {

        var sides = this._sides;
        var amount = sides + 1;
        var length = this.vertices.length;

        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }

        for (var i = 0; i < amount; i++) {

          var pct = (i + 0.5) / sides;
          var theta = TWO_PI * pct + Math.PI / 2;
          var x = this._width * cos(theta) / 2;
          var y = this._height * sin(theta) / 2;

          if (i >= length) {
            this.vertices.push(new Two.Anchor(x, y));
          } else {
            this.vertices[i].set(x, y);
          }

          this.vertices[i].command = i === 0
            ? Two.Commands.move : Two.Commands.line;

        }

      }

      Path.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = this._flagSides = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    clone: function(parent) {

      var clone = new Polygon(0, 0, this.radius, this.sides);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  Polygon.MakeObservable(Polygon.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path, PI = Math.PI, TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2,
    cos = Math.cos, sin = Math.sin, abs = Math.abs, _ = Two.Utils;

  var ArcSegment = Two.ArcSegment = function(ox, oy, ir, or, sa, ea, res) {

    var amount = res || (Two.Resolution * 3);
    var points = _.map(_.range(amount), function() {
      return new Two.Anchor();
    });

    Path.call(this, points, true, false, true);

    this.innerRadius = ir;
    this.outerRadius = or;

    this.startAngle = sa;
    this.endAngle = ea;

    this._update();
    this.translation.set(ox, oy);

  }

  _.extend(ArcSegment, {

    Properties: ['startAngle', 'endAngle', 'innerRadius', 'outerRadius'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(ArcSegment.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(ArcSegment.prototype, Path.prototype, {

    _flagStartAngle: false,
    _flagEndAngle: false,
    _flagInnerRadius: false,
    _flagOuterRadius: false,

    _startAngle: 0,
    _endAngle: TWO_PI,
    _innerRadius: 0,
    _outerRadius: 0,

    constructor: ArcSegment,

    _update: function() {

      if (this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius
        || this._flagOuterRadius) {

        var sa = this._startAngle;
        var ea = this._endAngle;

        var ir = this._innerRadius;
        var or = this._outerRadius;

        var connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
        var punctured = ir > 0;

        var vertices = this.vertices;
        var length = (punctured ? vertices.length / 2 : vertices.length);
        var command, id = 0;

        if (connected) {
          length--;
        } else if (!punctured) {
          length -= 2;
        }

        /**
         * Outer Circle
         */
        for (var i = 0, last = length - 1; i < length; i++) {

          var pct = i / last;
          var v = vertices[id];
          var theta = pct * (ea - sa) + sa;
          var step = (ea - sa) / length;

          var x = or * Math.cos(theta);
          var y = or * Math.sin(theta);

          switch (i) {
            case 0:
              command = Two.Commands.move;
              break;
            default:
              command = Two.Commands.curve;
          }

          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.left.clear();
          v.controls.right.clear();

          if (v.command === Two.Commands.curve) {
            var amp = or * step / Math.PI;
            v.controls.left.x = amp * Math.cos(theta - HALF_PI);
            v.controls.left.y = amp * Math.sin(theta - HALF_PI);
            v.controls.right.x = amp * Math.cos(theta + HALF_PI);
            v.controls.right.y = amp * Math.sin(theta + HALF_PI);
            if (i === 1) {
              v.controls.left.multiplyScalar(2);
            }
            if (i === last) {
              v.controls.right.multiplyScalar(2);
            }
          }

          id++;

        }

        if (punctured) {

          if (connected) {
            vertices[id].command = Two.Commands.close;
            id++;
          } else {
            length--;
            last = length - 1;
          }

          /**
           * Inner Circle
           */
          for (i = 0; i < length; i++) {

            pct = i / last;
            v = vertices[id];
            theta = (1 - pct) * (ea - sa) + sa;
            step = (ea - sa) / length;

            x = ir * Math.cos(theta);
            y = ir * Math.sin(theta);
            command = Two.Commands.curve;
            if (i <= 0) {
              command = connected ? Two.Commands.move : Two.Commands.line;
            }

            v.command = command;
            v.x = x;
            v.y = y;
            v.controls.left.clear();
            v.controls.right.clear();

            if (v.command === Two.Commands.curve) {
              amp = ir * step / Math.PI;
              v.controls.left.x = amp * Math.cos(theta + HALF_PI);
              v.controls.left.y = amp * Math.sin(theta + HALF_PI);
              v.controls.right.x = amp * Math.cos(theta - HALF_PI);
              v.controls.right.y = amp * Math.sin(theta - HALF_PI);
              if (i === 1) {
                v.controls.left.multiplyScalar(2);
              }
              if (i === last) {
                v.controls.right.multiplyScalar(2);
              }
            }

            id++;

          }

          // Final Point
          vertices[id].copy(vertices[0]);
          vertices[id].command = Two.Commands.line;

        } else if (!connected) {

          vertices[id].command = Two.Commands.line;
          vertices[id].x = 0;
          vertices[id].y = 0;
          id++;

          // Final Point
          vertices[id].copy(vertices[0]);
          vertices[id].command = Two.Commands.line;

        }

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      Path.prototype.flagReset.call(this);

      this._flagStartAngle = this._flagEndAngle
        = this._flagInnerRadius = this._flagOuterRadius = false;

      return this;

    },

    clone: function(parent) {

      var ir = this.innerRadius;
      var or = this.outerradius;
      var sa = this.startAngle;
      var ea = this.endAngle;
      var resolution = this.vertices.length;

      var clone = new ArcSegment(0, 0, ir, or, sa, ea, resolution);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  ArcSegment.MakeObservable(ArcSegment.prototype);

  function mod(v, l) {
    while (v < 0) {
      v += l;
    }
    return v % l;
  }

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  var Star = Two.Star = function(ox, oy, ir, or, sides) {

    if (arguments.length <= 3) {
      or = ir;
      ir = or / 2;
    }

    if (!_.isNumber(sides) || sides <= 0) {
      sides = 5;
    }

    var length = sides * 2;

    Path.call(this);
    this.closed = true;
    this.automatic = false;

    this.innerRadius = ir;
    this.outerRadius = or;
    this.sides = sides;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Star, {

    Properties: ['innerRadius', 'outerRadius', 'sides'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Star.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Star.prototype, Path.prototype, {

    _innerRadius: 0,
    _outerRadius: 0,
    _sides: 0,

    _flagInnerRadius: false,
    _flagOuterRadius: false,
    _flagSides: false,

    constructor: Star,

    _update: function() {

      if (this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {

        var sides = this._sides * 2;
        var amount = sides + 1;
        var length = this.vertices.length;

        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }

        for (var i = 0; i < amount; i++) {

          var pct = (i + 0.5) / sides;
          var theta = TWO_PI * pct;
          var r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
          var x = r * cos(theta);
          var y = r * sin(theta);

          if (i >= length) {
            this.vertices.push(new Two.Anchor(x, y));
          } else {
            this.vertices[i].set(x, y);
          }

          this.vertices[i].command = i === 0
            ? Two.Commands.move : Two.Commands.line;

        }

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    clone: function(parent) {

      var ir = this.innerRadius;
      var or = this.outerRadius;
      var sides = this.sides;

      var clone = new Star(0, 0, ir, or, sides);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  Star.MakeObservable(Star.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var RoundedRectangle = Two.RoundedRectangle = function(ox, oy, width, height, radius) {

    if (_.isUndefined(radius)) {
      radius = Math.floor(Math.min(width, height) / 12);
    }

    var amount = 10;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor(0, 0, 0, 0, 0, 0,
        i === 0 ? Two.Commands.move : Two.Commands.curve);
    });

    // points[points.length - 1].command = Two.Commands.close;

    Path.call(this, points);

    this.closed = true;
    this.automatic = false;

    this._renderer.flagRadius = _.bind(RoundedRectangle.FlagRadius, this);

    this.width = width;
    this.height = height;
    this.radius = radius;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(RoundedRectangle, {

    Properties: ['width', 'height'],

    FlagRadius: function() {
      this._flagRadius = true;
    },

    MakeObservable: function(object) {

      Path.MakeObservable(object);
      _.each(RoundedRectangle.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'radius', {
        enumerable: true,
        get: function() {
          return this._radius;
        },
        set: function(v) {

          if (this._radius instanceof Two.Vector) {
            this._radius.unbind(Two.Events.change, this._renderer.flagRadius);
          }

          this._radius = v;

          if (this._radius instanceof Two.Vector) {
            this._radius.bind(Two.Events.change, this._renderer.flagRadius);
          }

          this._flagRadius = true;

        }
      });

    }

  });

  _.extend(RoundedRectangle.prototype, Path.prototype, {

    _width: 0,
    _height: 0,
    _radius: 0,

    _flagWidth: false,
    _flagHeight: false,
    _flagRadius: false,

    constructor: RoundedRectangle,

    _update: function() {

      if (this._flagWidth || this._flagHeight || this._flagRadius) {

        var width = this._width;
        var height = this._height;

        var rx, ry;

        if (this._radius instanceof Two.Vector) {
          rx = this._radius.x;
          ry = this._radius.y;
        } else {
          rx = this._radius;
          ry = this._radius;
        }

        var v;
        var w = width / 2;
        var h = height / 2;

        v = this.vertices[0];
        v.x = - (w - rx);
        v.y = - h;

        // Upper Right Corner

        v = this.vertices[1];
        v.x = (w - rx);
        v.y = - h;
        v.controls.left.clear();
        v.controls.right.x = rx;
        v.controls.right.y = 0;

        v = this.vertices[2];
        v.x = w;
        v.y = - (h - ry);
        v.controls.right.clear();
        v.controls.left.clear();

        // Bottom Right Corner

        v = this.vertices[3];
        v.x = w;
        v.y = (h - ry);
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = ry;

        v = this.vertices[4];
        v.x = (w - rx);
        v.y = h;
        v.controls.right.clear();
        v.controls.left.clear();

        // Bottom Left Corner

        v = this.vertices[5];
        v.x = - (w - rx);
        v.y = h;
        v.controls.left.clear();
        v.controls.right.x = - rx;
        v.controls.right.y = 0;

        v = this.vertices[6];
        v.x = - w;
        v.y = (h - ry);
        v.controls.left.clear();
        v.controls.right.clear();

        // Upper Left Corner

        v = this.vertices[7];
        v.x = - w;
        v.y = - (h - ry);
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = - ry;

        v = this.vertices[8];
        v.x = - (w - rx);
        v.y = - h;
        v.controls.left.clear();
        v.controls.right.clear();

        v = this.vertices[9];
        v.copy(this.vertices[8]);

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = this._flagRadius = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    clone: function(parent) {

      var width = this.width;
      var height = this.height;
      var radius = this.radius;

      var clone = new RoundedRectangle(0, 0, width, height, radius);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  RoundedRectangle.MakeObservable(RoundedRectangle.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var root = Two.root;
  var getComputedMatrix = Two.Utils.getComputedMatrix;
  var _ = Two.Utils;

  var canvas = getCanvas();
  var ctx = canvas.getContext('2d');

  /**
   * @class
   * @name Two.Text
   * @param {String} message - The String to be rendered to the scene.
   * @param {Number} [x=0] - The position in the x direction for the object.
   * @param {Number} [y=0] - The position in the y direction for the object.
   * @param {Object} [styles] - An object where styles are applied. Attribute must exist in Two.Text.Properties.
   */
  var Text = Two.Text = function(message, x, y, styles) {

    Two.Shape.call(this);

    this._renderer.type = 'text';
    this._renderer.flagFill = _.bind(Two.Text.FlagFill, this);
    this._renderer.flagStroke = _.bind(Two.Text.FlagStroke, this);

    this.value = message;

    if (_.isNumber(x)) {
        this.translation.x = x;
    }
    if (_.isNumber(y)) {
        this.translation.y = y;
    }

    this.dashes = [];

    if (!_.isObject(styles)) {
      return this;
    }

    _.each(Two.Text.Properties, function(property) {

      if (property in styles) {
        this[property] = styles[property];
      }

    }, this);

  };

  _.extend(Two.Text, {

    Ratio: 0.6,

    Properties: [
      'value', 'family', 'size', 'leading', 'alignment', 'linewidth', 'style',
      'className', 'weight', 'decoration', 'baseline', 'opacity', 'visible',
      'fill', 'stroke',
    ],

    FlagFill: function() {
      this._flagFill = true;
    },

    FlagStroke: function() {
      this._flagStroke = true;
    },

    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      _.each(Two.Text.Properties.slice(0, 13), Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'fill', {
        enumerable: true,
        get: function() {
          return this._fill;
        },
        set: function(f) {

          if (this._fill instanceof Two.Gradient
            || this._fill instanceof Two.LinearGradient
            || this._fill instanceof Two.RadialGradient
            || this._fill instanceof Two.Texture) {
            this._fill.unbind(Two.Events.change, this._renderer.flagFill);
          }

          this._fill = f;
          this._flagFill = true;

          if (this._fill instanceof Two.Gradient
            || this._fill instanceof Two.LinearGradient
            || this._fill instanceof Two.RadialGradient
            || this._fill instanceof Two.Texture) {
            this._fill.bind(Two.Events.change, this._renderer.flagFill);
          }

        }
      });

      Object.defineProperty(object, 'stroke', {
        enumerable: true,
        get: function() {
          return this._stroke;
        },
        set: function(f) {

          if (this._stroke instanceof Two.Gradient
            || this._stroke instanceof Two.LinearGradient
            || this._stroke instanceof Two.RadialGradient
            || this._stroke instanceof Two.Texture) {
            this._stroke.unbind(Two.Events.change, this._renderer.flagStroke);
          }

          this._stroke = f;
          this._flagStroke = true;

          if (this._stroke instanceof Two.Gradient
            || this._stroke instanceof Two.LinearGradient
            || this._stroke instanceof Two.RadialGradient
            || this._stroke instanceof Two.Texture) {
            this._stroke.bind(Two.Events.change, this._renderer.flagStroke);
          }

        }
      });

      Object.defineProperty(object, 'clip', {
        enumerable: true,
        get: function() {
          return this._clip;
        },
        set: function(v) {
          this._clip = v;
          this._flagClip = true;
        }
      });

    }

  });

  _.extend(Two.Text.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagValue: true,
    _flagFamily: true,
    _flagSize: true,
    _flagLeading: true,
    _flagAlignment: true,
    _flagBaseline: true,
    _flagStyle: true,
    _flagWeight: true,
    _flagDecoration: true,

    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagClassName: true,
    _flagVisible: true,

    _flagClip: false,

    // Underlying Properties

    _value: '',
    _family: 'sans-serif',
    _size: 13,
    _leading: 17,
    _alignment: 'center',
    _baseline: 'middle',
    _style: 'normal',
    _weight: 500,
    _decoration: 'none',

    _fill: '#000',
    _stroke: 'transparent',
    _linewidth: 1,
    _opacity: 1,
    _className: '',
    _visible: true,

    _clip: false,

    constructor: Two.Text,

    remove: function() {

      if (!this.parent) {
        return this;
      }

      this.parent.remove(this);

      return this;

    },

    clone: function(parent) {

      var clone = new Two.Text(this.value);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Text.Properties, function(property) {
        clone[property] = this[property];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone._update();

    },

    toObject: function() {

      var result = {
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale
      };

      _.each(Two.Text.Properties, function(property) {
        result[property] = this[property];
      }, this);

      return result;

    },

    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    // /**
    //  * A shim to not break `getBoundingClientRect` calls. TODO: Implement a
    //  * way to calculate proper bounding boxes of `Two.Text`.
    //  */
    getBoundingClientRect: function(shallow) {

      var matrix, border, l, x, y, i, v;
      var left, right, top, bottom;

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      matrix = !!shallow ? this._matrix : getComputedMatrix(this);

      var height = this.leading;
      var width = this.value.length * this.size * Text.Ratio;

      switch (this.alignment) {
        case 'left':
          left = 0;
          right = width;
          break;
        case 'right':
          left = - width;
          right = 0;
          break;
        default:
          left = - width / 2;
          right = width / 2;
      }

      switch (this.baseline) {
        case 'top':
          top = 0;
          bottom = height;
          break;
        case 'bottom':
          top = - height;
          bottom = 0;
          break;
        default:
          top = - height / 2;
          bottom = height / 2;
      }

      v = matrix.multiply(left, top, 1);

      top = v.y;
      left = v.x;

      v = matrix.multiply(right, bottom, 1);

      right = v.x;
      bottom = v.y;

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
      };

    },

    flagReset: function() {

      this._flagValue = this._flagFamily = this._flagSize =
        this._flagLeading = this._flagAlignment = this._flagFill =
        this._flagStroke = this._flagLinewidth = this._flagOpacity =
        this._flagVisible = this._flagClip = this._flagDecoration =
        this._flagClassName = this._flagBaseline = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Two.Text.MakeObservable(Two.Text.prototype);

  function getCanvas() {
    if (root.document) {
      return root.document.createElement('canvas');
    } else {
      console.warn('Two.js: Unable to create canvas for Two.Text measurements.');
      return {
        getContext: _.identity
      }
    }
  }

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;

  var Stop = Two.Stop = function(offset, color, opacity) {

    this._renderer = {};
    this._renderer.type = 'stop';

    this.offset = _.isNumber(offset) ? offset
      : Stop.Index <= 0 ? 0 : 1;

    this.opacity = _.isNumber(opacity) ? opacity : 1;

    this.color = _.isString(color) ? color
      : Stop.Index <= 0 ? '#fff' : '#000';

    Stop.Index = (Stop.Index + 1) % 2;

  };

  _.extend(Stop, {

    Index: 0,

    Properties: [
      'offset',
      'opacity',
      'color'
    ],

    MakeObservable: function(object) {

      _.each(Stop.Properties, function(property) {

        var object = this;
        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

        Object.defineProperty(object, property, {
          enumerable: true,
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
            if (this.parent) {
              this.parent._flagStops = true;
            }
          }
        });

      }, object);

    }

  });

  _.extend(Stop.prototype, Two.Utils.Events, {

    constructor: Stop,

    clone: function() {

      var clone = new Stop();

      _.each(Stop.Properties, function(property) {
        clone[property] = this[property];
      }, this);

      return clone;

    },

    toObject: function() {

      var result = {};

      _.each(Stop.Properties, function(k) {
        result[k] = this[k];
      }, this);

      return result;

    },

    flagReset: function() {

      this._flagOffset = this._flagColor = this._flagOpacity = false;

      return this;

    }

  });

  Stop.MakeObservable(Stop.prototype);
  Stop.prototype.constructor = Stop;

  var Gradient = Two.Gradient = function(stops) {

    this._renderer = {};
    this._renderer.type = 'gradient';

    this.id = Two.Identifier + Two.uniqueId();
    this.classList = [];

    this._renderer.flagStops = _.bind(Gradient.FlagStops, this);
    this._renderer.bindStops = _.bind(Gradient.BindStops, this);
    this._renderer.unbindStops = _.bind(Gradient.UnbindStops, this);

    this.spread = 'pad';

    this.stops = stops;

  };

  _.extend(Gradient, {

    Stop: Stop,

    Properties: [
      'spread'
    ],

    MakeObservable: function(object) {

      _.each(Gradient.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'stops', {

        enumerable: true,

        get: function() {
          return this._stops;
        },

        set: function(stops) {

          var updateStops = this._renderer.flagStops;
          var bindStops = this._renderer.bindStops;
          var unbindStops = this._renderer.unbindStops;

          // Remove previous listeners
          if (this._stops) {
            this._stops
              .unbind(Two.Events.insert, bindStops)
              .unbind(Two.Events.remove, unbindStops);
          }

          // Create new Collection with copy of Stops
          this._stops = new Two.Utils.Collection((stops || []).slice(0));

          // Listen for Collection changes and bind / unbind
          this._stops
            .bind(Two.Events.insert, bindStops)
            .bind(Two.Events.remove, unbindStops);

          // Bind Initial Stops
          bindStops(this._stops);

        }

      });

    },

    FlagStops: function() {
      this._flagStops = true;
    },

    BindStops: function(items) {

      // This function is called a lot
      // when importing a large SVG
      var i = items.length;
      while(i--) {
        items[i].bind(Two.Events.change, this._renderer.flagStops);
        items[i].parent = this;
      }

      this._renderer.flagStops();

    },

    UnbindStops: function(items) {

      var i = items.length;
      while(i--) {
        items[i].unbind(Two.Events.change, this._renderer.flagStops);
        delete items[i].parent;
      }

      this._renderer.flagStops();

    }

  });

  _.extend(Gradient.prototype, Two.Utils.Events, {

    _flagStops: false,
    _flagSpread: false,

    clone: function(parent) {

      var stops = _.map(this.stops, function(s) {
        return s.clone();
      });

      var clone = new Gradient(stops);

      _.each(Two.Gradient.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    toObject: function() {

      var result = {
        stops: _.map(this.stops, function(s) {
          return s.toObject();
        })
      };

      _.each(Gradient.Properties, function(k) {
        result[k] = this[k];
      }, this);

      return result;

    },

    _update: function() {

      if (this._flagSpread || this._flagStops) {
        this.trigger(Two.Events.change);
      }

      return this;

    },

    flagReset: function() {

      this._flagSpread = this._flagStops = false;

      return this;

    }

  });

  Gradient.MakeObservable(Gradient.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;

  var LinearGradient = Two.LinearGradient = function(x1, y1, x2, y2, stops) {

    Two.Gradient.call(this, stops);

    this._renderer.type = 'linear-gradient';

    var flagEndPoints = _.bind(LinearGradient.FlagEndPoints, this);
    this.left = new Two.Vector().bind(Two.Events.change, flagEndPoints);
    this.right = new Two.Vector().bind(Two.Events.change, flagEndPoints);

    if (_.isNumber(x1)) {
      this.left.x = x1;
    }
    if (_.isNumber(y1)) {
      this.left.y = y1;
    }
    if (_.isNumber(x2)) {
      this.right.x = x2;
    }
    if (_.isNumber(y2)) {
      this.right.y = y2;
    }

  };

  _.extend(LinearGradient, {

    Stop: Two.Gradient.Stop,

    MakeObservable: function(object) {
      Two.Gradient.MakeObservable(object);
    },

    FlagEndPoints: function() {
      this._flagEndPoints = true;
    }

  });

  _.extend(LinearGradient.prototype, Two.Gradient.prototype, {

    _flagEndPoints: false,

    constructor: LinearGradient,

    clone: function(parent) {

      var stops = _.map(this.stops, function(stop) {
        return stop.clone();
      });

      var clone = new LinearGradient(this.left._x, this.left._y,
        this.right._x, this.right._y, stops);

      _.each(Two.Gradient.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    toObject: function() {

      var result = Two.Gradient.prototype.toObject.call(this);

      result.left = this.left.toObject();
      result.right = this.right.toObject();

      return result;

    },

    _update: function() {

      if (this._flagEndPoints || this._flagSpread || this._flagStops) {
        this.trigger(Two.Events.change);
      }

      return this;

    },

    flagReset: function() {

      this._flagEndPoints = false;

      Two.Gradient.prototype.flagReset.call(this);

      return this;

    }

  });

  LinearGradient.MakeObservable(LinearGradient.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;

  var RadialGradient = Two.RadialGradient = function(cx, cy, r, stops, fx, fy) {

    Two.Gradient.call(this, stops);

    this._renderer.type = 'radial-gradient';

    this.center = new Two.Vector()
      .bind(Two.Events.change, _.bind(function() {
        this._flagCenter = true;
      }, this));

    this.radius = _.isNumber(r) ? r : 20;

    this.focal = new Two.Vector()
      .bind(Two.Events.change, _.bind(function() {
        this._flagFocal = true;
      }, this));

    if (_.isNumber(cx)) {
      this.center.x = cx;
    }
    if (_.isNumber(cy)) {
      this.center.y = cy;
    }

    this.focal.copy(this.center);

    if (_.isNumber(fx)) {
      this.focal.x = fx;
    }
    if (_.isNumber(fy)) {
      this.focal.y = fy;
    }

  };

  _.extend(RadialGradient, {

    Stop: Two.Gradient.Stop,

    Properties: [
      'radius'
    ],

    MakeObservable: function(object) {

      Two.Gradient.MakeObservable(object);

      _.each(RadialGradient.Properties, Two.Utils.defineProperty, object);

    }

  });

  _.extend(RadialGradient.prototype, Two.Gradient.prototype, {

    _flagRadius: false,
    _flagCenter: false,
    _flagFocal: false,

    constructor: RadialGradient,

    clone: function(parent) {

      var stops = _.map(this.stops, function(stop) {
        return stop.clone();
      });

      var clone = new RadialGradient(this.center._x, this.center._y,
          this._radius, stops, this.focal._x, this.focal._y);

      _.each(Two.Gradient.Properties.concat(RadialGradient.Properties), function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    toObject: function() {

      var result = Two.Gradient.prototype.toObject.call(this);

      _.each(RadialGradient.Properties, function(k) {
        result[k] = this[k];
      }, this);

      result.center = this.center.toObject();
      result.focal = this.focal.toObject();

      return result;

    },

    _update: function() {

      if (this._flagRadius || this._flatCenter || this._flagFocal
        || this._flagSpread || this._flagStops) {
        this.trigger(Two.Events.change);
      }

      return this;

    },

    flagReset: function() {

      this._flagRadius = this._flagCenter = this._flagFocal = false;

      Two.Gradient.prototype.flagReset.call(this);

      return this;

    }

  });

  RadialGradient.MakeObservable(RadialGradient.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var root = Two.root;
  var _ = Two.Utils;
  var anchor;
  var regex = {
    video: /\.(mp4|webm|ogg)$/i,
    image: /\.(jpe?g|png|gif|tiff)$/i,
    effect: /texture|gradient/i
  };

  if (root.document) {
    anchor = document.createElement('a');
  }

  var Texture = Two.Texture = function(src, callback) {

    this._renderer = {};
    this._renderer.type = 'texture';
    this._renderer.flagOffset = _.bind(Texture.FlagOffset, this);
    this._renderer.flagScale = _.bind(Texture.FlagScale, this);

    this.id = Two.Identifier + Two.uniqueId();
    this.classList = [];

    this.offset = new Two.Vector();

    if (_.isFunction(callback)) {
      var loaded = _.bind(function() {
        this.unbind(Two.Events.load, loaded);
        if (_.isFunction(callback)) {
          callback();
        }
      }, this);
      this.bind(Two.Events.load, loaded);
    }

    if (_.isString(src)) {
      this.src = src;
    } else if (_.isElement(src)) {
      this.image = src;
    }

    this._update();

  };

  _.extend(Texture, {

    Properties: [
      'src',
      'loaded',
      'repeat'
    ],

    RegularExpressions: regex,

    ImageRegistry: new Two.Registry(),

    getAbsoluteURL: function(path) {
      if (!anchor) {
        // TODO: Fix for headless environments
        return path;
      }
      anchor.href = path;
      return anchor.href;
    },

    loadHeadlessBuffer: new Function('texture', 'loaded', [
      'var fs = require("fs");',
      'var buffer = fs.readFileSync(texture.src);',

      'texture.image.src = buffer;',
      'loaded();'
    ].join('\n')),

    getImage: function(src) {

      var absoluteSrc = Texture.getAbsoluteURL(src);

      if (Texture.ImageRegistry.contains(absoluteSrc)) {
        return Texture.ImageRegistry.get(absoluteSrc);
      }

      var image;

      if (Two.Utils.Image) {

        // TODO: Fix for headless environments
        image = new Two.Utils.Image();
        Two.CanvasRenderer.Utils.shim(image, 'img');

      } else if (root.document) {

        if (regex.video.test(absoluteSrc)) {
          image = document.createElement('video');
        } else {
          image = document.createElement('img');
        }

      } else {

        console.warn('Two.js: no prototypical image defined for Two.Texture');

      }

      image.crossOrigin = 'anonymous';

      return image;

    },

    Register: {
      canvas: function(texture, callback) {
        texture._src = '#' + texture.id;
        Texture.ImageRegistry.add(texture.src, texture.image);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      img: function(texture, callback) {

        var loaded = function(e) {
          if (_.isFunction(texture.image.removeEventListener)) {
            texture.image.removeEventListener('load', loaded, false);
            texture.image.removeEventListener('error', error, false);
          }
          if (_.isFunction(callback)) {
            callback();
          }
        };
        var error = function(e) {
          if (_.isFunction(texture.image.removeEventListener)) {
            texture.image.removeEventListener('load', loaded, false);
            texture.image.removeEventListener('error', error, false);
          }
          throw new Two.Utils.Error('unable to load ' + texture.src);
        };

        if (_.isNumber(texture.image.width) && texture.image.width > 0
          && _.isNumber(texture.image.height) && texture.image.height > 0) {
            loaded();
        } else if (_.isFunction(texture.image.addEventListener)) {
          texture.image.addEventListener('load', loaded, false);
          texture.image.addEventListener('error', error, false);
        }

        texture._src = Texture.getAbsoluteURL(texture._src);

        if (texture.image && texture.image.getAttribute('two-src')) {
          return;
        }

        texture.image.setAttribute('two-src', texture.src);
        Texture.ImageRegistry.add(texture.src, texture.image);

        if (Two.Utils.isHeadless) {

          Texture.loadHeadlessBuffer(texture, loaded);

        } else {

          texture.image.src = texture.src;

        }

      },
      video: function(texture, callback) {

        var loaded = function(e) {
          texture.image.removeEventListener('canplaythrough', loaded, false);
          texture.image.removeEventListener('error', error, false);
          texture.image.width = texture.image.videoWidth;
          texture.image.height = texture.image.videoHeight;
          texture.image.play();
          if (_.isFunction(callback)) {
            callback();
          }
        };
        var error = function(e) {
          texture.image.removeEventListener('canplaythrough', loaded, false);
          texture.image.removeEventListener('error', error, false);
          throw new Two.Utils.Error('unable to load ' + texture.src);
        };

        texture._src = Texture.getAbsoluteURL(texture._src);
        texture.image.addEventListener('canplaythrough', loaded, false);
        texture.image.addEventListener('error', error, false);

        if (texture.image && texture.image.getAttribute('two-src')) {
          return;
        }

        if (Two.Utils.isHeadless) {
          throw new Two.Utils.Error('video textures are not implemented in headless environments.');
          return;
        }

        texture.image.setAttribute('two-src', texture.src);
        Texture.ImageRegistry.add(texture.src, texture.image);
        texture.image.src = texture.src;
        texture.image.loop = true;
        texture.image.load();

      }
    },

    load: function(texture, callback) {

      var src = texture.src;
      var image = texture.image;
      var tag = image && image.nodeName.toLowerCase();

      if (texture._flagImage) {
        if (/canvas/i.test(tag)) {
          Texture.Register.canvas(texture, callback);
        } else {
          texture._src = image.getAttribute('two-src') || image.src;
          Texture.Register[tag](texture, callback);
        }
      }

      if (texture._flagSrc) {
        if (!image) {
          texture.image = Texture.getImage(texture.src);
        }
        tag = texture.image.nodeName.toLowerCase();
        Texture.Register[tag](texture, callback);
      }

    },

    FlagOffset: function() {
      this._flagOffset = true;
    },

    FlagScale: function() {
      this._flagScale = true;
    },

    MakeObservable: function(object) {

      _.each(Texture.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'image', {
        enumerable: true,
        get: function() {
          return this._image;
        },
        set: function(image) {

          var tag = image && image.nodeName.toLowerCase();
          var index;

          switch (tag) {
            case 'canvas':
              index = '#' + image.id;
              break;
            default:
              index = image.src;
          }

          if (Texture.ImageRegistry.contains(index)) {
            this._image = Texture.ImageRegistry.get(image.src);
          } else {
            this._image = image;
          }

          this._flagImage = true;

        }

      });

      Object.defineProperty(object, 'offset', {
        enumerable: true,
        get: function() {
          return this._offset;
        },
        set: function(v) {
          if (this._offset) {
            this._offset.unbind(Two.Events.change, this._renderer.flagOffset);
          }
          this._offset = v;
          this._offset.bind(Two.Events.change, this._renderer.flagOffset);
          this._flagOffset = true;
        }
      });

      Object.defineProperty(object, 'scale', {
        enumerable: true,
        get: function() {
          return this._scale;
        },
        set: function(v) {

          if (this._scale instanceof Two.Vector) {
            this._scale.unbind(Two.Events.change, this._renderer.flagScale);
          }

          this._scale = v;

          if (this._scale instanceof Two.Vector) {
            this._scale.bind(Two.Events.change, this._renderer.flagScale);
          }

          this._flagScale = true;

        }
      });

    }

  });

  _.extend(Texture.prototype, Two.Utils.Events, Two.Shape.prototype, {

    _flagSrc: false,
    _flagImage: false,
    _flagVideo: false,
    _flagLoaded: false,
    _flagRepeat: false,

    _flagOffset: false,
    _flagScale: false,

    _src: '',
    _image: null,
    _loaded: false,
    _repeat: 'no-repeat',

    _scale: 1,
    _offset: null,

    constructor: Texture,

    clone: function() {
      return new Texture(this.src);
    },

    toObject: function() {
      return {
        src: this.src,
        image: this.image
      }
    },

    _update: function() {

      if (this._flagSrc || this._flagImage) {

        this.trigger(Two.Events.change);

        if (this._flagSrc || this._flagImage) {
          this.loaded = false;
          Texture.load(this, _.bind(function() {
            this.loaded = true;
            this
              .trigger(Two.Events.change)
              .trigger(Two.Events.load);
          }, this));
        }

      }

      if (this._image && this._image.readyState >= 4) {
        this._flagVideo = true;
      }

      return this;

    },

    flagReset: function() {

      this._flagSrc = this._flagImage = this._flagLoaded
        = this._flagVideo = this._flagScale = this._flagOffset = false;

      return this;

    }

  });

  Texture.MakeObservable(Texture.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;
  var Path = Two.Path;
  var Rectangle = Two.Rectangle;

  var Sprite = Two.Sprite = function(path, ox, oy, cols, rows, frameRate) {

    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
    ], true);

    this.noStroke();
    this.noFill();

    if (path instanceof Two.Texture) {
      this.texture = path;
    } else if (_.isString(path)) {
      this.texture = new Two.Texture(path);
    }

    this.origin = new Two.Vector();

    this._update();
    this.translation.set(ox || 0, oy || 0);

    if (_.isNumber(cols)) {
      this.columns = cols;
    }
    if (_.isNumber(rows)) {
      this.rows = rows;
    }
    if (_.isNumber(frameRate)) {
      this.frameRate = frameRate;
    }

  };

  _.extend(Sprite, {

    Properties: [
      'texture', 'columns', 'rows', 'frameRate', 'index'
    ],

    MakeObservable: function(obj) {

      Rectangle.MakeObservable(obj);
      _.each(Sprite.Properties, Two.Utils.defineProperty, obj);

    }

  })

  _.extend(Sprite.prototype, Rectangle.prototype, {

    _flagTexture: false,
    _flagColumns: false,
    _flagRows: false,
    _flagFrameRate: false,
    flagIndex: false,

    // Private variables
    _amount: 1,
    _duration: 0,
    _startTime: 0,
    _playing: false,
    _firstFrame: 0,
    _lastFrame: 0,
    _loop: true,

    // Exposed through getter-setter
    _texture: null,
    _columns: 1,
    _rows: 1,
    _frameRate: 0,
    _index: 0,
    _origin: null,

    constructor: Sprite,

    play: function(firstFrame, lastFrame, onLastFrame) {

      this._playing = true;
      this._firstFrame = 0;
      this._lastFrame = this.amount - 1;
      this._startTime = _.performance.now();

      if (_.isNumber(firstFrame)) {
        this._firstFrame = firstFrame;
      }
      if (_.isNumber(lastFrame)) {
        this._lastFrame = lastFrame;
      }
      if (_.isFunction(onLastFrame)) {
        this._onLastFrame = onLastFrame;
      } else {
        delete this._onLastFrame;
      }

      if (this._index !== this._firstFrame) {
        this._startTime -= 1000 * Math.abs(this._index - this._firstFrame)
          / this._frameRate;
      }

      return this;

    },

    pause: function() {

      this._playing = false;
      return this;

    },

    stop: function() {

      this._playing = false;
      this._index = 0;

      return this;

    },

    clone: function(parent) {

      var clone = new Sprite(
        this.texture, this.translation.x, this.translation.y,
        this.columns, this.rows, this.frameRate
      );

      if (this.playing) {
        clone.play(this._firstFrame, this._lastFrame);
        clone._loop = this._loop;
      }

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    _update: function() {

      var effect = this._texture;
      var cols = this._columns;
      var rows = this._rows;

      var width, height, elapsed, amount, duration;
      var index, iw, ih, isRange, frames;

      if (this._flagColumns || this._flagRows) {
        this._amount = this._columns * this._rows;
      }

      if (this._flagFrameRate) {
        this._duration = 1000 * this._amount / this._frameRate;
      }

      if (this._flagTexture) {
        this.fill = this._texture;
      }

      if (this._texture.loaded) {

        iw = effect.image.width;
        ih = effect.image.height;

        width = iw / cols;
        height = ih / rows;
        amount = this._amount;

        if (this.width !== width) {
          this.width = width;
        }
        if (this.height !== height) {
          this.height = height;
        }

        if (this._playing && this._frameRate > 0) {

          if (_.isNaN(this._lastFrame)) {
            this._lastFrame = amount - 1;
          }

          // TODO: Offload perf logic to instance of `Two`.
          elapsed = _.performance.now() - this._startTime;
          frames = this._lastFrame + 1;
          duration = 1000 * (frames - this._firstFrame) / this._frameRate;

          if (this._loop) {
            elapsed = elapsed % duration;
          } else {
            elapsed = Math.min(elapsed, duration);
          }

          index = _.lerp(this._firstFrame, frames, elapsed / duration);
          index = Math.floor(index);

          if (index !== this._index) {
            this._index = index;
            if (index >= this._lastFrame - 1 && this._onLastFrame) {
              this._onLastFrame();  // Shortcut for chainable sprite animations
            }
          }

        }

        var col = this._index % cols;
        var row = Math.floor(this._index / cols);

        var ox = - width * col + (iw - width) / 2;
        var oy = - height * row + (ih - height) / 2;

        // TODO: Improve performance
        if (ox !== effect.offset.x) {
          effect.offset.x = ox;
        }
        if (oy !== effect.offset.y) {
          effect.offset.y = oy;
        }

      }

      Rectangle.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagTexture = this._flagColumns = this._flagRows
        = this._flagFrameRate = false;

      Rectangle.prototype.flagReset.call(this);

      return this;
    }


  });

  Sprite.MakeObservable(Sprite.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  var _ = Two.Utils;
  var Path = Two.Path;
  var Rectangle = Two.Rectangle;

  var ImageSequence = Two.ImageSequence = function(paths, ox, oy, frameRate) {

    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
    ], true);

    this._renderer.flagTextures = _.bind(ImageSequence.FlagTextures, this);
    this._renderer.bindTextures = _.bind(ImageSequence.BindTextures, this);
    this._renderer.unbindTextures = _.bind(ImageSequence.UnbindTextures, this);

    this.noStroke();
    this.noFill();

    this.textures = _.map(paths, ImageSequence.GenerateTexture, this);
    this.origin = new Two.Vector();

    this._update();
    this.translation.set(ox || 0, oy || 0);

    if (_.isNumber(frameRate)) {
      this.frameRate = frameRate;
    } else {
      this.frameRate = ImageSequence.DefaultFrameRate;
    }

  };

  _.extend(ImageSequence, {

    Properties: [
      'frameRate',
      'index'
    ],

    DefaultFrameRate: 30,

    FlagTextures: function() {
      this._flagTextures = true;
    },

    BindTextures: function(items) {

      var i = items.length;
      while (i--) {
        items[i].bind(Two.Events.change, this._renderer.flagTextures);
      }

      this._renderer.flagTextures();

    },

    UnbindTextures: function(items) {

      var i = items.length;
      while (i--) {
        items[i].unbind(Two.Events.change, this._renderer.flagTextures);
      }

      this._renderer.flagTextures();

    },

    MakeObservable: function(obj) {

      Rectangle.MakeObservable(obj);
      _.each(ImageSequence.Properties, Two.Utils.defineProperty, obj);

      Object.defineProperty(obj, 'textures', {

        enumerable: true,

        get: function() {
          return this._textures;
        },

        set: function(textures) {

          var updateTextures = this._renderer.flagTextures;
          var bindTextures = this._renderer.bindTextures;
          var unbindTextures = this._renderer.unbindTextures;

          // Remove previous listeners
          if (this._textures) {
            this._textures
              .unbind(Two.Events.insert, bindTextures)
              .unbind(Two.Events.remove, unbindTextures);
          }

          // Create new Collection with copy of vertices
          this._textures = new Two.Utils.Collection((textures || []).slice(0));

          // Listen for Collection changes and bind / unbind
          this._textures
            .bind(Two.Events.insert, bindTextures)
            .bind(Two.Events.remove, unbindTextures);

          // Bind Initial Textures
          bindTextures(this._textures);

        }

      });

    },

    GenerateTexture: function(obj) {
      if (obj instanceof Two.Texture) {
        return obj;
      } else if (_.isString(obj)) {
        return new Two.Texture(obj);
      }
    }

  });

  _.extend(ImageSequence.prototype, Rectangle.prototype, {

    _flagTextures: false,
    _flagFrameRate: false,
    _flagIndex: false,

    // Private variables
    _amount: 1,
    _duration: 0,
    _index: 0,
    _startTime: 0,
    _playing: false,
    _firstFrame: 0,
    _lastFrame: 0,
    _loop: true,

    // Exposed through getter-setter
    _textures: null,
    _frameRate: 0,
    _origin: null,

    constructor: ImageSequence,

    play: function(firstFrame, lastFrame, onLastFrame) {

      this._playing = true;
      this._firstFrame = 0;
      this._lastFrame = this.amount - 1;
      this._startTime = _.performance.now();

      if (_.isNumber(firstFrame)) {
        this._firstFrame = firstFrame;
      }
      if (_.isNumber(lastFrame)) {
        this._lastFrame = lastFrame;
      }
      if (_.isFunction(onLastFrame)) {
        this._onLastFrame = onLastFrame;
      } else {
        delete this._onLastFrame;
      }

      if (this._index !== this._firstFrame) {
        this._startTime -= 1000 * Math.abs(this._index - this._firstFrame)
          / this._frameRate;
      }

      return this;

    },

    pause: function() {

      this._playing = false;
      return this;

    },

    stop: function() {

      this._playing = false;
      this._index = 0;

      return this;

    },

    clone: function(parent) {

      var clone = new ImageSequence(this.textures, this.translation.x,
        this.translation.y, this.frameRate)

      clone._loop = this._loop;

      if (this._playing) {
        clone.play();
      }

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    _update: function() {

      var effects = this._textures;
      var width, height, elapsed, amount, duration, texture;
      var index, frames;

      if (this._flagTextures) {
        this._amount = effects.length;
      }

      if (this._flagFrameRate) {
        this._duration = 1000 * this._amount / this._frameRate;
      }

      if (this._playing && this._frameRate > 0) {

        amount = this._amount;

        if (_.isNaN(this._lastFrame)) {
          this._lastFrame = amount - 1;
        }

        // TODO: Offload perf logic to instance of `Two`.
        elapsed = _.performance.now() - this._startTime;
        frames = this._lastFrame + 1;
        duration = 1000 * (frames - this._firstFrame) / this._frameRate;

        if (this._loop) {
          elapsed = elapsed % duration;
        } else {
          elapsed = Math.min(elapsed, duration);
        }

        index = _.lerp(this._firstFrame, frames, elapsed / duration);
        index = Math.floor(index);

        if (index !== this._index) {

          this._index = index;
          texture = effects[this._index];

          if (texture.loaded) {

            width = texture.image.width;
            height = texture.image.height;

            if (this.width !== width) {
              this.width = width;
            }
            if (this.height !== height) {
              this.height = height;
            }

            this.fill = texture;

            if (index >= this._lastFrame - 1 && this._onLastFrame) {
              this._onLastFrame();  // Shortcut for chainable sprite animations
            }

          }

        }

      } else if (this._flagIndex || !(this.fill instanceof Two.Texture)) {

        texture = effects[this._index];

        if (texture.loaded) {

          width = texture.image.width;
          height = texture.image.height;

          if (this.width !== width) {
            this.width = width;
          }
          if (this.height !== height) {
            this.height = height;
          }

        }

        this.fill = texture;

      }

      Rectangle.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagTextures = this._flagFrameRate = false;
      Rectangle.prototype.flagReset.call(this);

      return this;

    }

  });

  ImageSequence.MakeObservable(ImageSequence.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);

(function(Two) {

  // Constants

  var min = Math.min, max = Math.max;
  var _ = Two.Utils;

  /**
   * @class
   * @name Two.Group.Children
   * @extends Two.Utils.Collection
   * @description A children collection which is accesible both by index and by object id
   */
  var Children = function() {

    Two.Utils.Collection.apply(this, arguments);

    Object.defineProperty(this, '_events', {
      value : {},
      enumerable: false
    });

    this.ids = {};

    this.on(Two.Events.insert, this.attach);
    this.on(Two.Events.remove, this.detach);
    Children.prototype.attach.apply(this, arguments);

  };

  Children.prototype = new Two.Utils.Collection();

  _.extend(Children.prototype, {

    constructor: Children,

    attach: function(children) {
      for (var i = 0; i < children.length; i++) {
        this.ids[children[i].id] = children[i];
      }
      return this;
    },

    detach: function(children) {
      for (var i = 0; i < children.length; i++) {
        delete this.ids[children[i].id];
      }
      return this;
    }

  });

  /**
   * @class
   * @name Two.Group
   */
  var Group = Two.Group = function(children) {

    Two.Shape.call(this, true);

    this._renderer.type = 'group';

    this.additions = [];
    this.subtractions = [];

    this.children = _.isArray(children) ? children : arguments;

  };

  _.extend(Group, {

    Children: Children,

    InsertChildren: function(children) {
      for (var i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i], this);
      }
    },

    RemoveChildren: function(children) {
      for (var i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i]);
      }
    },

    OrderChildren: function(children) {
      this._flagOrder = true;
    },

    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'visible',
      'cap',
      'join',
      'miter',
    ],

    MakeObservable: function(object) {

      var properties = Two.Group.Properties;

      Object.defineProperty(object, 'opacity', {

        enumerable: true,

        get: function() {
          return this._opacity;
        },

        set: function(v) {
          this._flagOpacity = this._opacity !== v;
          this._opacity = v;
        }

      });

      Object.defineProperty(object, 'className', {

        enumerable: true,

        get: function() {
          return this._className;
        },

        set: function(v) {
          this._flagClassName  = this._className !== v;
          this._className = v;
        }

      });

      Object.defineProperty(object, 'beginning', {

        enumerable: true,

        get: function() {
          return this._beginning;
        },

        set: function(v) {
          this._flagBeginning = this._beginning !== v;
          this._beginning = v;
        }

      });

      Object.defineProperty(object, 'ending', {

        enumerable: true,

        get: function() {
          return this._ending;
        },

        set: function(v) {
          this._flagEnding = this._ending !== v;
          this._ending = v;
        }

      });

      Object.defineProperty(object, 'length', {

        enumerable: true,

        get: function() {
          if (this._flagLength || this._length <= 0) {
            this._length = 0;
            for (var i = 0; i < this.children.length; i++) {
              var child = this.children[i];
              this._length += child.length;
            }
          }
          return this._length;
        }

      });

      Two.Shape.MakeObservable(object);
      Group.MakeGetterSetters(object, properties);

      Object.defineProperty(object, 'children', {

        enumerable: true,

        get: function() {
          return this._children;
        },

        set: function(children) {

          var insertChildren = _.bind(Group.InsertChildren, this);
          var removeChildren = _.bind(Group.RemoveChildren, this);
          var orderChildren = _.bind(Group.OrderChildren, this);

          if (this._children) {
            this._children.unbind();
          }

          this._children = new Children(children);
          this._children.bind(Two.Events.insert, insertChildren);
          this._children.bind(Two.Events.remove, removeChildren);
          this._children.bind(Two.Events.order, orderChildren);

        }

      });

      Object.defineProperty(object, 'mask', {

        enumerable: true,

        get: function() {
          return this._mask;
        },

        set: function(v) {
          this._mask = v;
          this._flagMask = true;
          if (!v.clip) {
            v.clip = true;
          }
        }

      });

    },

    MakeGetterSetters: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {
        Group.MakeGetterSetter(group, k);
      });

    },

    MakeGetterSetter: function(group, k) {

      var secret = '_' + k;

      Object.defineProperty(group, k, {

        enumerable: true,

        get: function() {
          return this[secret];
        },

        set: function(v) {
          this[secret] = v;
          _.each(this.children, function(child) { // Trickle down styles
            child[k] = v;
          });
        }

      });

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagAdditions: false,
    _flagSubtractions: false,
    _flagOrder: false,
    _flagOpacity: true,
    _flagClassName: false,
    _flagBeginning: false,
    _flagEnding: false,

    _flagLength: false,
    _flagMask: false,

    // Underlying Properties

    _fill: '#fff',
    _stroke: '#000',
    _linewidth: 1.0,
    _opacity: 1.0,
    _className: '',
    _visible: true,

    _cap: 'round',
    _join: 'round',
    _miter: 4,

    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1.0,

    _length: 0,
    _mask: null,

    constructor: Group,

    // /**
    //  * TODO: Group has a gotcha in that it's at the moment required to be bound to
    //  * an instance of two in order to add elements correctly. This needs to
    //  * be rethought and fixed.
    //  */
    clone: function(parent) {

      var group = new Group();
      var children = _.map(this.children, function(child) {
        return child.clone();
      });

      group.add(children);

      group.opacity = this.opacity;

      if (this.mask) {
        group.mask = this.mask;
      }

      group.translation.copy(this.translation);
      group.rotation = this.rotation;
      group.scale = this.scale;
      group.className = this.className;

      if (parent) {
        parent.add(group);
      }

      return group._update();

    },

    // /**
    //  * Export the data from the instance of Two.Group into a plain JavaScript
    //  * object. This also makes all children plain JavaScript objects. Great
    //  * for turning into JSON and storing in a database.
    //  */
    toObject: function() {

      var result = {
        children: [],
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale instanceof Two.Vector ? this.scale.toObject() : this.scale,
        opacity: this.opacity,
        className: this.className,
        mask: (this.mask ? this.mask.toObject() : null)
      };

      _.each(this.children, function(child, i) {
        result.children[i] = child.toObject();
      }, this);

      return result;

    },

    // /**
    //  * Anchor all children to the upper left hand corner
    //  * of the group.
    //  */
    corner: function() {

      var rect = this.getBoundingClientRect(true),
       corner = { x: rect.left, y: rect.top };

      this.children.forEach(function(child) {
        child.translation.sub(corner);
      });

      return this;

    },

    // /**
    //  * Anchors all children around the center of the group,
    //  * effectively placing the shape around the unit circle.
    //  */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      this.children.forEach(function(child) {
        if (child.isShape) {
          child.translation.sub(rect.centroid);
        }
      });

      // this.translation.copy(rect.centroid);

      return this;

    },

    // /**
    //  * Recursively search for id. Returns the first element found.
    //  * Returns null if none found.
    //  */
    getById: function (id) {
      var search = function (node, id) {
        if (node.id === id) {
          return node;
        } else if (node.children) {
          var i = node.children.length;
          while (i--) {
            var found = search(node.children[i], id);
            if (found) return found;
          }
        }

      };
      return search(this, id) || null;
    },

    // /**
    //  * Recursively search for classes. Returns an array of matching elements.
    //  * Empty array if none found.
    //  */
    getByClassName: function (cl) {
      var found = [];
      var search = function (node, cl) {
        if (node.classList.indexOf(cl) != -1) {
          found.push(node);
        } else if (node.children) {
          node.children.forEach(function (child) {
            search(child, cl);
          });
        }
        return found;
      };
      return search(this, cl);
    },

    // /**
    //  * Recursively search for children of a specific type,
    //  * e.g. Two.Polygon. Pass a reference to this type as the param.
    //  * Returns an empty array if none found.
    //  */
    getByType: function(type) {
      var found = [];
      var search = function (node, type) {
        for (var id in node.children) {
          if (node.children[id] instanceof type) {
            found.push(node.children[id]);
          } else if (node.children[id] instanceof Two.Group) {
            search(node.children[id], type);
          }
        }
        return found;
      };
      return search(this, type);
    },

    // /**
    //  * Add objects to the group.
    //  */
    add: function(objects) {

      // Allow to pass multiple objects either as array or as multiple arguments
      // If it's an array also create copy of it in case we're getting passed
      // a childrens array directly.
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      } else {
        objects = objects.slice();
      }

      // Add the objects
      for (var i = 0; i < objects.length; i++) {
        if (!(objects[i] && objects[i].id)) continue;
        this.children.push(objects[i]);
      }

      return this;

    },

    // /**
    //  * Remove objects from the group.
    //  */
    remove: function(objects) {

      var l = arguments.length,
        grandparent = this.parent;

      // Allow to call remove without arguments
      // This will detach the object from its own parent.
      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }

      // Allow to pass multiple objects either as array or as multiple arguments
      // If it's an array also create copy of it in case we're getting passed
      // a childrens array directly.
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      } else {
        objects = objects.slice();
      }

      // Remove the objects
      for (var i = 0; i < objects.length; i++) {
        if (!objects[i] || !(this.children.ids[objects[i].id])) continue;
        this.children.splice(_.indexOf(this.children, objects[i]), 1);
      }

      return this;

    },

    // /**
    //  * Return an object with top, left, right, bottom, width, and height
    //  * parameters of the group.
    //  */
    getBoundingClientRect: function(shallow) {
      var rect;

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      // Variables need to be defined here, because of nested nature of groups.
      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity;

      var regex = Two.Texture.RegularExpressions.effect;

      for (var i = 0; i < this.children.length; i++) {

        var child = this.children[i];

        if (!child.visible || regex.test(child._renderer.type)) {
          continue;
        }

        rect = child.getBoundingClientRect(shallow);

        if (!_.isNumber(rect.top)   || !_.isNumber(rect.left)   ||
            !_.isNumber(rect.right) || !_.isNumber(rect.bottom)) {
          continue;
        }

        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);

      }

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
      };

    },

    // /**
    //  * Trickle down of noFill
    //  */
    noFill: function() {
      this.children.forEach(function(child) {
        child.noFill();
      });
      return this;
    },

    // /**
    //  * Trickle down of noStroke
    //  */
    noStroke: function() {
      this.children.forEach(function(child) {
        child.noStroke();
      });
      return this;
    },

    // /**
    //  * Trickle down subdivide
    //  */
    subdivide: function() {
      var args = arguments;
      this.children.forEach(function(child) {
        child.subdivide.apply(child, args);
      });
      return this;
    },

    _update: function() {

      if (this._flagBeginning || this._flagEnding) {

        var beginning = Math.min(this._beginning, this._ending);
        var ending = Math.max(this._beginning, this._ending);
        var length = this.length;
        var sum = 0;

        var bd = beginning * length;
        var ed = ending * length;
        var distance = (ed - bd);

        for (var i = 0; i < this.children.length; i++) {

          var child = this.children[i];
          var l = child.length;

          if (bd > sum + l) {
            child.beginning = 1;
            child.ending = 1;
          } else if (ed < sum) {
            child.beginning = 0;
            child.ending = 0;
          } else if (bd > sum && bd < sum + l) {
            child.beginning = (bd - sum) / l;
            child.ending = 1;
          } else if (ed > sum && ed < sum + l) {
            child.beginning = 0;
            child.ending = (ed - sum) / l;
          } else {
            child.beginning = 0;
            child.ending = 1;
          }

          sum += l;

        }

      }

      return Two.Shape.prototype._update.apply(this, arguments);

    },

    flagReset: function() {

      if (this._flagAdditions) {
        this.additions.length = 0;
        this._flagAdditions = false;
      }

      if (this._flagSubtractions) {
        this.subtractions.length = 0;
        this._flagSubtractions = false;
      }

      this._flagOrder = this._flagMask = this._flagOpacity = this._flagClassName
        this._flagBeginning = this._flagEnding = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Group.MakeObservable(Group.prototype);

  // /**
  //  * Helper function used to sync parent-child relationship within the
  //  * `Two.Group.children` object.
  //  *
  //  * Set the parent of the passed object to another object
  //  * and updates parent-child relationships
  //  * Calling with one arguments will simply remove the parenting
  //  */
  function replaceParent(child, newParent) {

    var parent = child.parent;
    var index;

    if (parent === newParent) {
      this.additions.push(child);
      this._flagAdditions = true;
      return;
    }

    if (parent && parent.children.ids[child.id]) {

      index = _.indexOf(parent.children, child);
      parent.children.splice(index, 1);

      // If we're passing from one parent to another...
      index = _.indexOf(parent.additions, child);

      if (index >= 0) {
        parent.additions.splice(index, 1);
      } else {
        parent.subtractions.push(child);
        parent._flagSubtractions = true;
      }

    }

    if (newParent) {
      child.parent = newParent;
      this.additions.push(child);
      this._flagAdditions = true;
      return;
    }

    // If we're passing from one parent to another...
    index = _.indexOf(this.additions, child);

    if (index >= 0) {
      this.additions.splice(index, 1);
    } else {
      this.subtractions.push(child);
      this._flagSubtractions = true;
    }

    delete child.parent;

  }

})((typeof global !== 'undefined' ? global : (this || window)).Two);
