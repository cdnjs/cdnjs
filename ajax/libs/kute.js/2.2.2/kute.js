/*!
* KUTE.js Standard v2.2.2 (http://thednp.github.io/kute.js)
* Copyright 2015-2021 © thednp
* Licensed under MIT (https://github.com/thednp/kute.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.KUTE = factory());
})(this, (function () { 'use strict';

  /**
   * Creates cubic-bezier easing functions.
   *
   * @class
   */
  var CubicBezier = function CubicBezier(p1x, p1y, p2x, p2y, functionName) {
    var this$1$1 = this;

    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0,0) and (1.0, 1.0)
    
    /** @type {number} */
    this.cx = 3.0 * p1x;
    
    /** @type {number} */
    this.bx = 3.0 * (p2x - p1x) - this.cx;

    /** @type {number} */
    this.ax = 1.0 - this.cx - this.bx;
      
    /** @type {number} */
    this.cy = 3.0 * p1y;
    
    /** @type {number} */
    this.by = 3.0 * (p2y - p1y) - this.cy;
    
    /** @type {number} */
    this.ay = 1.0 - this.cy - this.by;
      
    /** @type {(t: number) => number} */
    var BezierEasing = function (t) { return this$1$1.sampleCurveY(this$1$1.solveCurveX(t)); };

    // this function needs a name
    Object.defineProperty(BezierEasing, 'name', { writable: true });
    BezierEasing.name = functionName || ("cubic-bezier(" + ([p1x, p1y, p2x, p2y]) + ")");

    return BezierEasing;
  };

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled X value
   */
  CubicBezier.prototype.sampleCurveX = function sampleCurveX (t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  };

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled Y value
   */
  CubicBezier.prototype.sampleCurveY = function sampleCurveY (t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  };

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled curve derivative X value
   */
  CubicBezier.prototype.sampleCurveDerivativeX = function sampleCurveDerivativeX (t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  };

  /**
   * @param {number} x - progress [0-1]
   * @return {number} - solved curve X value
   */
  CubicBezier.prototype.solveCurveX = function solveCurveX (x) {
    var t0;
    var t1;
    var t2;
    var x2;
    var d2;
    var i;
    var epsilon = 1e-5; // Precision

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 32; i += 1) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) { return t2; }
      d2 = this.sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < epsilon) { break; }
      t2 -= x2 / d2;
    }

    // No solution found - use bi-section
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) { return t0; }
    if (t2 > t1) { return t1; }

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) { return t2; }
      if (x > x2) { t0 = t2; }
      else { t1 = t2; }

      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Give up
    return t2;
  };

  var version$1 = "1.0.18";

  // @ts-ignore

  /**
   * A global namespace for library version.
   * @type {string}
   */
  var Version$1 = version$1;

  Object.assign(CubicBezier, { Version: Version$1 });

  /**
   * The KUTE.js Execution Context
   */
  var KEC = {};

  var Tweens = [];

  var gl0bal;

  if (typeof global !== 'undefined') { gl0bal = global; }
  else if (typeof window !== 'undefined') { gl0bal = window.self; }
  else { gl0bal = {}; }

  var globalObject = gl0bal;

  // KUTE.js INTERPOLATE FUNCTIONS
  // =============================
  var interpolate = {};

  // schedule property specific function on animation start
  // link property update function to KUTE.js execution context
  var onStart = {};

  // Include a performance.now polyfill.
  // source https://github.com/tweenjs/tween.js/blob/master/src/Now.ts
  var performanceNow;

  // In node.js, use process.hrtime.
  // eslint-disable-next-line
  // @ts-ignore
  if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
    performanceNow = function () {
      // eslint-disable-next-line
  		// @ts-ignore
      var time = process.hrtime();

      // Convert [seconds, nanoseconds] to milliseconds.
      return time[0] * 1000 + time[1] / 1000000;
    };
  } else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
    // In a browser, use self.performance.now if it is available.
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    performanceNow = self.performance.now.bind(self.performance);
  } else if (typeof Date !== 'undefined' && Date.now) {
    // Use Date.now if it is available.
    performanceNow = Date.now;
  } else {
    // Otherwise, use 'new Date().getTime()'.
    performanceNow = function () { return new Date().getTime(); };
  }

  var now = performanceNow;

  var Time = {};
  Time.now = now;

  // eslint-disable-next-line import/no-mutable-exports -- impossible to satisfy
  var Tick = 0;

  /**
   *
   * @param {number | Date} time
   */
  var Ticker = function (time) {
    var i = 0;
    while (i < Tweens.length) {
      if (Tweens[i].update(time)) {
        i += 1;
      } else {
        Tweens.splice(i, 1);
      }
    }
    Tick = requestAnimationFrame(Ticker);
  };

  // stop requesting animation frame
  function stop() {
    setTimeout(function () { // re-added for #81
      if (!Tweens.length && Tick) {
        cancelAnimationFrame(Tick);
        Tick = null;
        Object.keys(onStart).forEach(function (obj) {
          if (typeof (onStart[obj]) === 'function') {
            if (KEC[obj]) { delete KEC[obj]; }
          } else {
            Object.keys(onStart[obj]).forEach(function (prop) {
              if (KEC[prop]) { delete KEC[prop]; }
            });
          }
        });

        Object.keys(interpolate).forEach(function (i) {
          if (KEC[i]) { delete KEC[i]; }
        });
      }
    }, 64);
  }

  // render update functions
  // =======================
  var Render = {
    Tick: Tick, Ticker: Ticker, Tweens: Tweens, Time: Time,
  };
  Object.keys(Render).forEach(function (blob) {
    if (!KEC[blob]) {
      KEC[blob] = blob === 'Time' ? Time.now : Render[blob];
    }
  });

  globalObject._KUTE = KEC;

  // all supported properties
  var supportedProperties = {};

  var defaultValues = {};

  var defaultOptions$1 = {
    duration: 700,
    delay: 0,
    easing: 'linear',
    repeat: 0,
    repeatDelay: 0,
    yoyo: false,
    resetStart: false,
    offset: 0,
  };

  // used in preparePropertiesObject
  var prepareProperty = {};

  // check current property value when .to() method is used
  var prepareStart = {};

  // checks for differences between the processed start and end values,
  // can be set to make sure start unit and end unit are same,
  // stack transforms, process SVG paths,
  // any type of post processing the component needs
  var crossCheck = {};

  // schedule property specific function on animation complete
  var onComplete = {};

  // link properties to interpolate functions
  var linkProperty = {};

  var Objects = {
    supportedProperties: supportedProperties,
    defaultValues: defaultValues,
    defaultOptions: defaultOptions$1,
    prepareProperty: prepareProperty,
    prepareStart: prepareStart,
    crossCheck: crossCheck,
    onStart: onStart,
    onComplete: onComplete,
    linkProperty: linkProperty,
  };

  // util - a general object for utils like rgbToHex, processEasing
  var Util = {};

  /**
   * KUTE.add(Tween)
   *
   * @param {KUTE.Tween} tw a new tween to add
   */
  var add = function (tw) { return Tweens.push(tw); };

  /**
   * KUTE.remove(Tween)
   *
   * @param {KUTE.Tween} tw a new tween to add
   */
  var remove = function (tw) {
    var i = Tweens.indexOf(tw);
    if (i !== -1) { Tweens.splice(i, 1); }
  };

  /**
   * KUTE.add(Tween)
   *
   * @return {KUTE.Tween[]} tw a new tween to add
   */
  var getAll = function () { return Tweens; };

  /**
   * KUTE.removeAll()
   */
  var removeAll = function () { Tweens.length = 0; };

  /**
   * linkInterpolation
   * @this {KUTE.Tween}
   */
  function linkInterpolation() {
    var this$1$1 = this;
   // DON'T change
    Object.keys(linkProperty).forEach(function (component) {
      var componentLink = linkProperty[component];
      var componentProps = supportedProperties[component];

      Object.keys(componentLink).forEach(function (fnObj) {
        if (typeof (componentLink[fnObj]) === 'function' // ATTR, colors, scroll, boxModel, borderRadius
            && Object.keys(this$1$1.valuesEnd).some(function (i) { return (componentProps && componentProps.includes(i))
            || (i === 'attr' && Object.keys(this$1$1.valuesEnd[i]).some(function (j) { return componentProps && componentProps.includes(j); })); })) {
          if (!KEC[fnObj]) { KEC[fnObj] = componentLink[fnObj]; }
        } else {
          Object.keys(this$1$1.valuesEnd).forEach(function (prop) {
            var propObject = this$1$1.valuesEnd[prop];
            if (propObject instanceof Object) {
              Object.keys(propObject).forEach(function (i) {
                if (typeof (componentLink[i]) === 'function') { // transformCSS3
                  if (!KEC[i]) { KEC[i] = componentLink[i]; }
                } else {
                  Object.keys(componentLink[fnObj]).forEach(function (j) {
                    if (componentLink[i] && typeof (componentLink[i][j]) === 'function') { // transformMatrix
                      if (!KEC[j]) { KEC[j] = componentLink[i][j]; }
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  var internals = {
    add: add,
    remove: remove,
    getAll: getAll,
    removeAll: removeAll,
    stop: stop,
    linkInterpolation: linkInterpolation,
  };

  /**
   * getInlineStyle
   * Returns the transform style for element from
   * cssText. Used by for the `.to()` static method.
   *
   * @param {Element} el target element
   * @returns {object}
   */
  function getInlineStyle(el) {
    // if the scroll applies to `window` it returns as it has no styling
    if (!el.style) { return false; }
    // the cssText | the resulting transform object
    var css = el.style.cssText.replace(/\s/g, '').split(';');
    var transformObject = {};
    var arrayFn = ['translate3d', 'translate', 'scale3d', 'skew'];

    css.forEach(function (cs) {
      if (/transform/i.test(cs)) {
        // all transform properties
        var tps = cs.split(':')[1].split(')');
        tps.forEach(function (tpi) {
          var tpv = tpi.split('(');
          var tp = tpv[0];
          // each transform property
          var tv = tpv[1];
          if (!/matrix/.test(tp)) {
            transformObject[tp] = arrayFn.includes(tp) ? tv.split(',') : tv;
          }
        });
      }
    });

    return transformObject;
  }

  /**
   * getStyleForProperty
   *
   * Returns the computed style property for element for .to() method.
   * Used by for the `.to()` static method.
   *
   * @param {Element} elem
   * @param {string} propertyName
   * @returns {string}
   */
  function getStyleForProperty(elem, propertyName) {
    var result = defaultValues[propertyName];
    var styleAttribute = elem.style;
    var computedStyle = getComputedStyle(elem) || elem.currentStyle;
    var styleValue = styleAttribute[propertyName] && !/auto|initial|none|unset/.test(styleAttribute[propertyName])
      ? styleAttribute[propertyName]
      : computedStyle[propertyName];

    if (propertyName !== 'transform' && (propertyName in computedStyle || propertyName in styleAttribute)) {
      result = styleValue;
    }

    return result;
  }

  /**
   * prepareObject
   *
   * Returns all processed valuesStart / valuesEnd.
   *
   * @param {Element} obj the values start/end object
   * @param {string} fn toggles between the two
   */
  function prepareObject(obj, fn) {
    var this$1$1 = this;
   // this, props object, type: start/end
    var propertiesObject = fn === 'start' ? this.valuesStart : this.valuesEnd;

    Object.keys(prepareProperty).forEach(function (component) {
      var prepareComponent = prepareProperty[component];
      var supportComponent = supportedProperties[component];

      Object.keys(prepareComponent).forEach(function (tweenCategory) {
        var transformObject = {};

        Object.keys(obj).forEach(function (tweenProp) {
          // scroll, opacity, other components
          if (defaultValues[tweenProp] && prepareComponent[tweenProp]) {
            propertiesObject[tweenProp] = prepareComponent[tweenProp]
              .call(this$1$1, tweenProp, obj[tweenProp]);

          // transform
          } else if (!defaultValues[tweenCategory] && tweenCategory === 'transform'
            && supportComponent.includes(tweenProp)) {
            transformObject[tweenProp] = obj[tweenProp];

          // allow transformFunctions to work with preprocessed input values
          } else if (!defaultValues[tweenProp] && tweenProp === 'transform') {
            propertiesObject[tweenProp] = obj[tweenProp];

          // colors, boxModel, category
          } else if (!defaultValues[tweenCategory]
            && supportComponent && supportComponent.includes(tweenProp)) {
            propertiesObject[tweenProp] = prepareComponent[tweenCategory]
              .call(this$1$1, tweenProp, obj[tweenProp]);
          }
        });

        // we filter out older browsers by checking Object.keys
        if (Object.keys(transformObject).length) {
          propertiesObject[tweenCategory] = prepareComponent[tweenCategory]
            .call(this$1$1, tweenCategory, transformObject);
        }
      });
    });
  }

  /**
   * getStartValues
   *
   * Returns the start values for to() method.
   * Used by for the `.to()` static method.
   *
   * @this {KUTE.Tween} the tween instance
   */
  function getStartValues() {
    var this$1$1 = this;

    var startValues = {};
    var currentStyle = getInlineStyle(this.element);

    Object.keys(this.valuesStart).forEach(function (tweenProp) {
      Object.keys(prepareStart).forEach(function (component) {
        var componentStart = prepareStart[component];

        Object.keys(componentStart).forEach(function (tweenCategory) {
          // clip, opacity, scroll
          if (tweenCategory === tweenProp && componentStart[tweenProp]) {
            startValues[tweenProp] = componentStart[tweenCategory]
              .call(this$1$1, tweenProp, this$1$1.valuesStart[tweenProp]);
          // find in an array of properties
          } else if (supportedProperties[component]
            && supportedProperties[component].includes(tweenProp)) {
            startValues[tweenProp] = componentStart[tweenCategory]
              .call(this$1$1, tweenProp, this$1$1.valuesStart[tweenProp]);
          }
        });
      });
    });

    // stack transformCSS props for .to() chains
    // also add to startValues values from previous tweens
    Object.keys(currentStyle).forEach(function (current) {
      if (!(current in this$1$1.valuesStart)) {
        startValues[current] = currentStyle[current] || defaultValues[current];
      }
    });

    this.valuesStart = {};
    prepareObject.call(this, startValues, 'start');
  }

  var Process = {
    getInlineStyle: getInlineStyle,
    getStyleForProperty: getStyleForProperty,
    getStartValues: getStartValues,
    prepareObject: prepareObject,
  };

  var connect = {};
  /** @type {KUTE.TweenBase | KUTE.Tween | KUTE.TweenExtra} */
  connect.tween = null;
  connect.processEasing = null;

  var Easing = {
    linear: new CubicBezier(0, 0, 1, 1, 'linear'),
    easingSinusoidalIn: new CubicBezier(0.47, 0, 0.745, 0.715, 'easingSinusoidalIn'),
    easingSinusoidalOut: new CubicBezier(0.39, 0.575, 0.565, 1, 'easingSinusoidalOut'),
    easingSinusoidalInOut: new CubicBezier(0.445, 0.05, 0.55, 0.95, 'easingSinusoidalInOut'),

    easingQuadraticIn: new CubicBezier(0.550, 0.085, 0.680, 0.530, 'easingQuadraticIn'),
    easingQuadraticOut: new CubicBezier(0.250, 0.460, 0.450, 0.940, 'easingQuadraticOut'),
    easingQuadraticInOut: new CubicBezier(0.455, 0.030, 0.515, 0.955, 'easingQuadraticInOut'),

    easingCubicIn: new CubicBezier(0.55, 0.055, 0.675, 0.19, 'easingCubicIn'),
    easingCubicOut: new CubicBezier(0.215, 0.61, 0.355, 1, 'easingCubicOut'),
    easingCubicInOut: new CubicBezier(0.645, 0.045, 0.355, 1, 'easingCubicInOut'),

    easingQuarticIn: new CubicBezier(0.895, 0.03, 0.685, 0.22, 'easingQuarticIn'),
    easingQuarticOut: new CubicBezier(0.165, 0.84, 0.44, 1, 'easingQuarticOut'),
    easingQuarticInOut: new CubicBezier(0.77, 0, 0.175, 1, 'easingQuarticInOut'),

    easingQuinticIn: new CubicBezier(0.755, 0.05, 0.855, 0.06, 'easingQuinticIn'),
    easingQuinticOut: new CubicBezier(0.23, 1, 0.32, 1, 'easingQuinticOut'),
    easingQuinticInOut: new CubicBezier(0.86, 0, 0.07, 1, 'easingQuinticInOut'),

    easingExponentialIn: new CubicBezier(0.95, 0.05, 0.795, 0.035, 'easingExponentialIn'),
    easingExponentialOut: new CubicBezier(0.19, 1, 0.22, 1, 'easingExponentialOut'),
    easingExponentialInOut: new CubicBezier(1, 0, 0, 1, 'easingExponentialInOut'),

    easingCircularIn: new CubicBezier(0.6, 0.04, 0.98, 0.335, 'easingCircularIn'),
    easingCircularOut: new CubicBezier(0.075, 0.82, 0.165, 1, 'easingCircularOut'),
    easingCircularInOut: new CubicBezier(0.785, 0.135, 0.15, 0.86, 'easingCircularInOut'),

    easingBackIn: new CubicBezier(0.6, -0.28, 0.735, 0.045, 'easingBackIn'),
    easingBackOut: new CubicBezier(0.175, 0.885, 0.32, 1.275, 'easingBackOut'),
    easingBackInOut: new CubicBezier(0.68, -0.55, 0.265, 1.55, 'easingBackInOut'),
  };

  /**
   * Returns a valid `easingFunction`.
   *
   * @param {KUTE.easingFunction | string} fn function name or constructor name
   * @returns {KUTE.easingFunction} a valid easingfunction
   */
  function processBezierEasing(fn) {
    if (typeof fn === 'function') {
      return fn;
    } if (typeof (Easing[fn]) === 'function') {
      return Easing[fn];
    } if (/bezier/.test(fn)) {
      var bz = fn.replace(/bezier|\s|\(|\)/g, '').split(',');
      return new CubicBezier(bz[0] * 1, bz[1] * 1, bz[2] * 1, bz[3] * 1); // bezier easing
    }
    // if (/elastic|bounce/i.test(fn)) {
    //   throw TypeError(`KUTE - CubicBezier doesn't support ${fn} easing.`);
    // }
    return Easing.linear;
  }

  connect.processEasing = processBezierEasing;

  /**
   * selector
   *
   * A selector utility for KUTE.js.
   *
   * @param {KUTE.selectorType} el target(s) or string selector
   * @param {boolean | number} multi when true returns an array/collection of elements
   * @returns {Element | Element[] | null}
   */
  function selector(el, multi) {
    try {
      var requestedElem;
      var itemsArray;
      if (multi) {
        itemsArray = el instanceof Array && el.every(function (x) { return x instanceof Element; });
        requestedElem = el instanceof HTMLCollection || el instanceof NodeList || itemsArray
          ? el : document.querySelectorAll(el);
      } else {
        requestedElem = el instanceof Element || el === window // scroll
          ? el : document.querySelector(el);
      }
      return requestedElem;
    } catch (e) {
      throw TypeError(("KUTE.js - Element(s) not found: " + el + "."));
    }
  }

  function queueStart() {
    var this$1$1 = this;

    // fire onStart actions
    Object.keys(onStart).forEach(function (obj) {
      if (typeof (onStart[obj]) === 'function') {
        onStart[obj].call(this$1$1, obj); // easing functions
      } else {
        Object.keys(onStart[obj]).forEach(function (prop) {
          onStart[obj][prop].call(this$1$1, prop);
        });
      }
    });

    // add interpolations
    linkInterpolation.call(this);
  }

  /**
   * The `TweenBase` constructor creates a new `Tween` object
   * for a single `HTMLElement` and returns it.
   *
   * `TweenBase` is meant to be used with pre-processed values.
   */
  var TweenBase = function TweenBase(targetElement, startObject, endObject, opsObject) {
    var this$1$1 = this;

    // element animation is applied to
    this.element = targetElement;

    /** @type {boolean} */
    this.playing = false;
    /** @type {number?} */
    this._startTime = null;
    /** @type {boolean} */
    this._startFired = false;

    // type is set via KUTE.tweenProps
    this.valuesEnd = endObject;
    this.valuesStart = startObject;

    // OPTIONS
    var options = opsObject || {};
    // internal option to process inline/computed style at start instead of init
    // used by to() method and expects object : {} / false
    this._resetStart = options.resetStart || 0;
    // you can only set a core easing function as default
    /** @type {KUTE.easingOption} */
    this._easing = typeof (options.easing) === 'function' ? options.easing : connect.processEasing(options.easing);
    /** @type {number} */
    this._duration = options.duration || defaultOptions$1.duration; // duration option | default
    /** @type {number} */
    this._delay = options.delay || defaultOptions$1.delay; // delay option | default

    // set other options
    Object.keys(options).forEach(function (op) {
      var internalOption = "_" + op;
      if (!(internalOption in this$1$1)) { this$1$1[internalOption] = options[op]; }
    });

    // callbacks should not be set as undefined
    // this._onStart = options.onStart
    // this._onUpdate = options.onUpdate
    // this._onStop = options.onStop
    // this._onComplete = options.onComplete

    // queue the easing
    var easingFnName = this._easing.name;
    if (!onStart[easingFnName]) {
      onStart[easingFnName] = function easingFn(prop) {
        if (!KEC[prop] && prop === this._easing.name) { KEC[prop] = this._easing; }
      };
    }

    return this;
  };

  /**
   * Starts tweening
   * @param {number?} time the tween start time
   * @returns {TweenBase} this instance
   */
  TweenBase.prototype.start = function start (time) {
    // now it's a good time to start
    add(this);
    this.playing = true;

    this._startTime = typeof time !== 'undefined' ? time : KEC.Time();
    this._startTime += this._delay;

    if (!this._startFired) {
      if (this._onStart) {
        this._onStart.call(this);
      }

      queueStart.call(this);

      this._startFired = true;
    }

    if (!Tick) { Ticker(); }
    return this;
  };

  /**
   * Stops tweening
   * @returns {TweenBase} this instance
   */
  TweenBase.prototype.stop = function stop () {
    if (this.playing) {
      remove(this);
      this.playing = false;

      if (this._onStop) {
        this._onStop.call(this);
      }
      this.close();
    }
    return this;
  };

  /**
   * Trigger internal completion callbacks.
   */
  TweenBase.prototype.close = function close () {
      var this$1$1 = this;

    // scroll|transformMatrix need this
    Object.keys(onComplete).forEach(function (component) {
      Object.keys(onComplete[component]).forEach(function (toClose) {
        onComplete[component][toClose].call(this$1$1, toClose);
      });
    });
    // when all animations are finished, stop ticking after ~3 frames
    this._startFired = false;
    stop.call(this);
  };

  /**
   * Schedule another tween instance to start once this one completes.
   * @param {KUTE.chainOption} args the tween animation start time
   * @returns {TweenBase} this instance
   */
  TweenBase.prototype.chain = function chain (args) {
    this._chain = [];
    this._chain = args.length ? args : this._chain.concat(args);
    return this;
  };

  /**
   * Stop tweening the chained tween instances.
   */
  TweenBase.prototype.stopChainedTweens = function stopChainedTweens () {
    if (this._chain && this._chain.length) { this._chain.forEach(function (tw) { return tw.stop(); }); }
  };

  /**
   * Update the tween on each tick.
   * @param {number} time the tick time
   * @returns {boolean} this instance
   */
  TweenBase.prototype.update = function update (time) {
      var this$1$1 = this;

    var T = time !== undefined ? time : KEC.Time();

    var elapsed;

    if (T < this._startTime && this.playing) { return true; }

    elapsed = (T - this._startTime) / this._duration;
    elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

    // calculate progress
    var progress = this._easing(elapsed);

    // render the update
    Object.keys(this.valuesEnd).forEach(function (tweenProp) {
      KEC[tweenProp](this$1$1.element,
        this$1$1.valuesStart[tweenProp],
        this$1$1.valuesEnd[tweenProp],
        progress);
    });

    // fire the updateCallback
    if (this._onUpdate) {
      this._onUpdate.call(this);
    }

    if (elapsed === 1) {
      // fire the complete callback
      if (this._onComplete) {
        this._onComplete.call(this);
      }

      // now we're sure no animation is running
      this.playing = false;

      // stop ticking when finished
      this.close();

      // start animating chained tweens
      if (this._chain !== undefined && this._chain.length) {
        this._chain.map(function (tw) { return tw.start(); });
      }

      return false;
    }

    return true;
  };

  // Update Tween Interface
  connect.tween = TweenBase;

  /**
   * The `KUTE.Tween()` constructor creates a new `Tween` object
   * for a single `HTMLElement` and returns it.
   *
   * This constructor adds additional functionality and is the default
   * Tween object constructor in KUTE.js.
   */
  var Tween = /*@__PURE__*/(function (TweenBase) {
    function Tween() {
      var this$1$1 = this;
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      TweenBase.apply(this, args); // this calls the constructor of TweenBase

      // reset interpolation values
      this.valuesStart = {};
      this.valuesEnd = {};

      // const startObject = args[1];
      // const endObject = args[2];
      var ref = args.slice(1);
      var startObject = ref[0];
      var endObject = ref[1];
      var options = ref[2];

      // set valuesEnd
      prepareObject.call(this, endObject, 'end');

      // set valuesStart
      if (this._resetStart) {
        this.valuesStart = startObject;
      } else {
        prepareObject.call(this, startObject, 'start');
      }

      // ready for crossCheck
      if (!this._resetStart) {
        Object.keys(crossCheck).forEach(function (component) {
          Object.keys(crossCheck[component]).forEach(function (checkProp) {
            crossCheck[component][checkProp].call(this$1$1, checkProp);
          });
        });
      }

      // set paused state
      /** @type {boolean} */
      this.paused = false;
      /** @type {number?} */
      this._pauseTime = null;

      // additional properties and options
      /** @type {number?} */
      this._repeat = options.repeat || defaultOptions$1.repeat;
      /** @type {number?} */
      this._repeatDelay = options.repeatDelay || defaultOptions$1.repeatDelay;
      // we cache the number of repeats to be able to put it back after all cycles finish
      /** @type {number?} */
      this._repeatOption = this._repeat;

      // yoyo needs at least repeat: 1
      /** @type {KUTE.tweenProps} */
      this.valuesRepeat = {}; // valuesRepeat
      /** @type {boolean} */
      this._yoyo = options.yoyo || defaultOptions$1.yoyo;
      /** @type {boolean} */
      this._reversed = false;

      // don't load extra callbacks
      // this._onPause = options.onPause || defaultOptions.onPause
      // this._onResume = options.onResume || defaultOptions.onResume

      // chained Tweens
      // this._chain = options.chain || defaultOptions.chain;
      return this;
    }

    if ( TweenBase ) Tween.__proto__ = TweenBase;
    Tween.prototype = Object.create( TweenBase && TweenBase.prototype );
    Tween.prototype.constructor = Tween;

    /**
     * Starts tweening, extended method
     * @param {number?} time the tween start time
     * @returns {Tween} this instance
     */
    Tween.prototype.start = function start (time) {
      var this$1$1 = this;

      // on start we reprocess the valuesStart for TO() method
      if (this._resetStart) {
        this.valuesStart = this._resetStart;
        getStartValues.call(this);

        // this is where we do the valuesStart and valuesEnd check for fromTo() method
        Object.keys(crossCheck).forEach(function (component) {
          Object.keys(crossCheck[component]).forEach(function (checkProp) {
            crossCheck[component][checkProp].call(this$1$1, checkProp);
          });
        });
      }
      // still not paused
      this.paused = false;

      // set yoyo values
      if (this._yoyo) {
        Object.keys(this.valuesEnd).forEach(function (endProp) {
          this$1$1.valuesRepeat[endProp] = this$1$1.valuesStart[endProp];
        });
      }

      TweenBase.prototype.start.call(this, time);

      return this;
    };

    /**
     * Stops tweening, extended method
     * @returns {Tween} this instance
     */
    Tween.prototype.stop = function stop () {
      TweenBase.prototype.stop.call(this);
      if (!this.paused && this.playing) {
        this.paused = false;
        this.stopChainedTweens();
      }
      return this;
    };

    /**
     * Trigger internal completion callbacks.
     */
    Tween.prototype.close = function close () {
      TweenBase.prototype.close.call(this);

      if (this._repeatOption > 0) {
        this._repeat = this._repeatOption;
      }
      if (this._yoyo && this._reversed === true) {
        this.reverse();
        this._reversed = false;
      }

      return this;
    };

    /**
     * Resume tweening
     * @returns {Tween} this instance
     */
    Tween.prototype.resume = function resume () {
      if (this.paused && this.playing) {
        this.paused = false;
        if (this._onResume !== undefined) {
          this._onResume.call(this);
        }
        // re-queue execution context
        queueStart.call(this);
        // update time and let it roll
        this._startTime += KEC.Time() - this._pauseTime;
        add(this);
        // restart ticker if stopped
        if (!Tick) { Ticker(); }
      }
      return this;
    };

    /**
     * Pause tweening
     * @returns {Tween} this instance
     */
    Tween.prototype.pause = function pause () {
      if (!this.paused && this.playing) {
        remove(this);
        this.paused = true;
        this._pauseTime = KEC.Time();
        if (this._onPause !== undefined) {
          this._onPause.call(this);
        }
      }
      return this;
    };

    /**
     * Reverses start values with end values
     */
    Tween.prototype.reverse = function reverse () {
      var this$1$1 = this;

      Object.keys(this.valuesEnd).forEach(function (reverseProp) {
        var tmp = this$1$1.valuesRepeat[reverseProp];
        this$1$1.valuesRepeat[reverseProp] = this$1$1.valuesEnd[reverseProp];
        this$1$1.valuesEnd[reverseProp] = tmp;
        this$1$1.valuesStart[reverseProp] = this$1$1.valuesRepeat[reverseProp];
      });
    };

    /**
     * Update the tween on each tick.
     * @param {number} time the tick time
     * @returns {boolean} this instance
     */
    Tween.prototype.update = function update (time) {
      var this$1$1 = this;

      var T = time !== undefined ? time : KEC.Time();

      var elapsed;

      if (T < this._startTime && this.playing) { return true; }

      elapsed = (T - this._startTime) / this._duration;
      elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

      // calculate progress
      var progress = this._easing(elapsed);

      // render the update
      Object.keys(this.valuesEnd).forEach(function (tweenProp) {
        KEC[tweenProp](this$1$1.element,
          this$1$1.valuesStart[tweenProp],
          this$1$1.valuesEnd[tweenProp],
          progress);
      });

      // fire the updateCallback
      if (this._onUpdate) {
        this._onUpdate.call(this);
      }

      if (elapsed === 1) {
        if (this._repeat > 0) {
          if (Number.isFinite(this._repeat)) { this._repeat -= 1; }

          // set the right time for delay
          this._startTime = T;
          if (Number.isFinite(this._repeat) && this._yoyo && !this._reversed) {
            this._startTime += this._repeatDelay;
          }

          if (this._yoyo) { // handle yoyo
            this._reversed = !this._reversed;
            this.reverse();
          }

          return true;
        }

        // fire the complete callback
        if (this._onComplete) {
          this._onComplete.call(this);
        }

        // now we're sure no animation is running
        this.playing = false;

        // stop ticking when finished
        this.close();

        // start animating chained tweens
        if (this._chain !== undefined && this._chain.length) {
          this._chain.forEach(function (tw) { return tw.start(); });
        }

        return false;
      }
      return true;
    };

    return Tween;
  }(TweenBase));

  // Update Tween Interface Update
  connect.tween = Tween;

  /**
   * The static method creates a new `Tween` object for each `HTMLElement`
   * from and `Array`, `HTMLCollection` or `NodeList`.
   */
  var TweenCollection = function TweenCollection(els, vS, vE, Options) {
    var this$1$1 = this;

    var TweenConstructor = connect.tween;
    /** @type {KUTE.twCollection[]} */
    this.tweens = [];

    var Ops = Options || {};
    /** @type {number?} */
    Ops.delay = Ops.delay || defaultOptions$1.delay;

    // set all options
    var options = [];

    Array.from(els).forEach(function (el, i) {
      options[i] = Ops || {};
      options[i].delay = i > 0 ? Ops.delay + (Ops.offset || defaultOptions$1.offset) : Ops.delay;
      if (el instanceof Element) {
        this$1$1.tweens.push(new TweenConstructor(el, vS, vE, options[i]));
      } else {
        throw Error(("KUTE - " + el + " is not instanceof Element"));
      }
    });

    /** @type {number?} */
    this.length = this.tweens.length;
    return this;
  };

  /**
   * Starts tweening, all targets
   * @param {number?} time the tween start time
   * @returns {TweenCollection} this instance
   */
  TweenCollection.prototype.start = function start (time) {
    var T = time === undefined ? KEC.Time() : time;
    this.tweens.map(function (tween) { return tween.start(T); });
    return this;
  };

  /**
   * Stops tweening, all targets and their chains
   * @returns {TweenCollection} this instance
   */
  TweenCollection.prototype.stop = function stop () {
    this.tweens.map(function (tween) { return tween.stop(); });
    return this;
  };

  /**
   * Pause tweening, all targets
   * @returns {TweenCollection} this instance
   */
  TweenCollection.prototype.pause = function pause () {
    this.tweens.map(function (tween) { return tween.pause(); });
    return this;
  };

  /**
   * Resume tweening, all targets
   * @returns {TweenCollection} this instance
   */
  TweenCollection.prototype.resume = function resume () {
    this.tweens.map(function (tween) { return tween.resume(); });
    return this;
  };

  /**
   * Schedule another tween or collection to start after
   * this one is complete.
   * @param {number?} args the tween start time
   * @returns {TweenCollection} this instance
   */
  TweenCollection.prototype.chain = function chain (args) {
    var lastTween = this.tweens[this.length - 1];
    if (args instanceof TweenCollection) {
      lastTween.chain(args.tweens);
    } else if (args instanceof connect.tween) {
      lastTween.chain(args);
    } else {
      throw new TypeError('KUTE.js - invalid chain value');
    }
    return this;
  };

  /**
   * Check if any tween instance is playing
   * @param {number?} time the tween start time
   * @returns {TweenCollection} this instance
   */
  TweenCollection.prototype.playing = function playing () {
    return this.tweens.some(function (tw) { return tw.playing; });
  };

  /**
   * Remove all tweens in the collection
   */
  TweenCollection.prototype.removeTweens = function removeTweens () {
    this.tweens = [];
  };

  /**
   * Returns the maximum animation duration
   * @returns {number} this instance
   */
  TweenCollection.prototype.getMaxDuration = function getMaxDuration () {
    var durations = [];
    this.tweens.forEach(function (tw) {
      durations.push(tw._duration + tw._delay + tw._repeat * tw._repeatDelay);
    });
    return Math.max(durations);
  };

  var TweenConstructor$1 = connect.tween;

  /**
   * The `KUTE.to()` static method returns a new Tween object
   * for a single `HTMLElement` at its current state.
   *
   * @param {Element} element target element
   * @param {KUTE.tweenProps} endObject
   * @param {KUTE.tweenOptions} optionsObj tween options
   * @returns {KUTE.Tween} the resulting Tween object
   */
  function to(element, endObject, optionsObj) {
    var options = optionsObj || {};
    options.resetStart = endObject;
    return new TweenConstructor$1(selector(element), endObject, endObject, options);
  }

  var TweenConstructor = connect.tween;

  /**
   * The `KUTE.fromTo()` static method returns a new Tween object
   * for a single `HTMLElement` at a given state.
   *
   * @param {Element} element target element
   * @param {KUTE.tweenProps} startObject
   * @param {KUTE.tweenProps} endObject
   * @param {KUTE.tweenOptions} optionsObj tween options
   * @returns {KUTE.Tween} the resulting Tween object
   */
  function fromTo(element, startObject, endObject, optionsObj) {
    var options = optionsObj || {};
    return new TweenConstructor(selector(element), startObject, endObject, options);
  }

  /**
   * The `KUTE.allTo()` static method creates a new Tween object
   * for multiple `HTMLElement`s, `HTMLCollection` or `NodeListat`
   * at their current state.
   *
   * @param {Element[] | HTMLCollection | NodeList} elements target elements
   * @param {KUTE.tweenProps} endObject
   * @param {KUTE.tweenProps} optionsObj progress
   * @returns {TweenCollection} the Tween object collection
   */
  function allTo(elements, endObject, optionsObj) {
    var options = optionsObj || {};
    options.resetStart = endObject;
    return new TweenCollection(selector(elements, true), endObject, endObject, options);
  }

  /**
   * The `KUTE.allFromTo()` static method creates a new Tween object
   * for multiple `HTMLElement`s, `HTMLCollection` or `NodeListat`
   * at a given state.
   *
   * @param {Element[] | HTMLCollection | NodeList} elements target elements
   * @param {KUTE.tweenProps} startObject
   * @param {KUTE.tweenProps} endObject
   * @param {KUTE.tweenOptions} optionsObj tween options
   * @returns {TweenCollection} the Tween object collection
   */
  function allFromTo(elements, startObject, endObject, optionsObj) {
    var options = optionsObj || {};
    return new TweenCollection(selector(elements, true), startObject, endObject, options);
  }

  /**
   * Animation Class
   *
   * Registers components by populating KUTE.js objects and makes sure
   * no duplicate component / property is allowed.
   */
  var Animation = function Animation(Component) {
    try {
      if (Component.component in supportedProperties) {
        throw Error(("KUTE - " + (Component.component) + " already registered"));
      } else if (Component.property in defaultValues) {
        throw Error(("KUTE - " + (Component.property) + " already registered"));
      }
    } catch (e) {
      throw Error(e);
    }

    var propertyInfo = this;
    var ComponentName = Component.component;
    // const Objects = { defaultValues, defaultOptions, Interpolate, linkProperty, Util }
    var Functions = {
      prepareProperty: prepareProperty, prepareStart: prepareStart, onStart: onStart, onComplete: onComplete, crossCheck: crossCheck,
    };
    var Category = Component.category;
    var Property = Component.property;
    var Length = (Component.properties && Component.properties.length)
      || (Component.subProperties && Component.subProperties.length);

    // single property
    // {property,defaultvalue,defaultOptions,Interpolate,functions}

    // category colors, boxModel, borderRadius
    // {category,properties,defaultvalues,defaultOptions,Interpolate,functions}

    // property with multiple sub properties. Eg transform, filter
    // {property,subProperties,defaultvalues,defaultOptions,Interpolate,functions}

    // property with multiple sub properties. Eg htmlAttributes
    // {category,subProperties,defaultvalues,defaultOptions,Interpolate,functions}

    // set supported category/property
    supportedProperties[ComponentName] = Component.properties
      || Component.subProperties || Component.property;

    // set defaultValues
    if ('defaultValue' in Component) { // value 0 will invalidate
      defaultValues[Property] = Component.defaultValue;

      // minimal info
      propertyInfo.supports = Property + " property";
    } else if (Component.defaultValues) {
      Object.keys(Component.defaultValues).forEach(function (dv) {
        defaultValues[dv] = Component.defaultValues[dv];
      });

      // minimal info
      propertyInfo.supports = (Length || Property) + " " + (Property || Category) + " properties";
    }

    // set additional options
    if (Component.defaultOptions) {
      // Object.keys(Component.defaultOptions).forEach((op) => {
      // defaultOptions[op] = Component.defaultOptions[op];
      // });
      Object.assign(defaultOptions$1, Component.defaultOptions);
    }

    // set functions
    if (Component.functions) {
      Object.keys(Functions).forEach(function (fn) {
        if (fn in Component.functions) {
          if (typeof (Component.functions[fn]) === 'function') {
            // if (!Functions[fn][ Category||Property ]) {
            // Functions[fn][ Category||Property ] = Component.functions[fn];
            // }
            if (!Functions[fn][ComponentName]) { Functions[fn][ComponentName] = {}; }
            if (!Functions[fn][ComponentName][Category || Property]) {
              Functions[fn][ComponentName][Category || Property] = Component.functions[fn];
            }
          } else {
            Object.keys(Component.functions[fn]).forEach(function (ofn) {
              // !Functions[fn][ofn] && (Functions[fn][ofn] = Component.functions[fn][ofn])
              if (!Functions[fn][ComponentName]) { Functions[fn][ComponentName] = {}; }
              if (!Functions[fn][ComponentName][ofn]) {
                Functions[fn][ComponentName][ofn] = Component.functions[fn][ofn];
              }
            });
          }
        }
      });
    }

    // set component interpolation functions
    if (Component.Interpolate) {
      Object.keys(Component.Interpolate).forEach(function (fni) {
        var compIntObj = Component.Interpolate[fni];
        if (typeof (compIntObj) === 'function' && !interpolate[fni]) {
          interpolate[fni] = compIntObj;
        } else {
          Object.keys(compIntObj).forEach(function (sfn) {
            if (typeof (compIntObj[sfn]) === 'function' && !interpolate[fni]) {
              interpolate[fni] = compIntObj[sfn];
            }
          });
        }
      });

      linkProperty[ComponentName] = Component.Interpolate;
    }

    // set component util
    if (Component.Util) {
      Object.keys(Component.Util).forEach(function (fnu) {
        if (!Util[fnu]) { Util[fnu] = Component.Util[fnu]; }
      });
    }

    return propertyInfo;
  };

  /**
   * trueDimension
   *
   * Returns the string value of a specific CSS property converted into a nice
   * { v = value, u = unit } object.
   *
   * @param {string} dimValue the property string value
   * @param {boolean | number} isAngle sets the utility to investigate angles
   * @returns {{v: number, u: string}} the true {value, unit} tuple
   */
  var trueDimension = function (dimValue, isAngle) {
    var intValue = parseInt(dimValue, 10) || 0;
    var mUnits = ['px', '%', 'deg', 'rad', 'em', 'rem', 'vh', 'vw'];
    var theUnit;

    for (var mIndex = 0; mIndex < mUnits.length; mIndex += 1) {
      if (typeof dimValue === 'string' && dimValue.includes(mUnits[mIndex])) {
        theUnit = mUnits[mIndex]; break;
      }
    }
    if (theUnit === undefined) {
      theUnit = isAngle ? 'deg' : 'px';
    }

    return { v: intValue, u: theUnit };
  };

  /**
   * Numbers Interpolation Function.
   *
   * @param {number} a start value
   * @param {number} b end value
   * @param {number} v progress
   * @returns {number} the interpolated number
   */
  function numbers(a, b, v) {
    var A = +a;
    var B = b - a;
    // a = +a; b -= a;
    return A + B * v;
  }

  // Component Functions
  /**
   * Sets the update function for the property.
   * @param {string} tweenProp the property name
   */
  function boxModelOnStart(tweenProp) {
    if (tweenProp in this.valuesEnd && !KEC[tweenProp]) {
      KEC[tweenProp] = function (elem, a, b, v) {
        /* eslint-disable no-param-reassign -- impossible to satisfy */
        /* eslint-disable no-bitwise -- impossible to satisfy */
        elem.style[tweenProp] = (v > 0.99 || v < 0.01
          ? ((numbers(a, b, v) * 10) >> 0) / 10
          : (numbers(a, b, v)) >> 0) + "px";
        /* eslint-enable no-bitwise */
        /* eslint-enable no-param-reassign */
      };
    }
  }

  // Component Base Props
  var baseBoxProps = ['top', 'left', 'width', 'height'];
  var baseBoxOnStart = {};
  baseBoxProps.forEach(function (x) { baseBoxOnStart[x] = boxModelOnStart; });

  // Component Functions
  /**
   * Returns the current property computed style.
   * @param {string} tweenProp the property name
   * @returns {string} computed style for property
   */
  function getBoxModel(tweenProp) {
    return getStyleForProperty(this.element, tweenProp) || defaultValues[tweenProp];
  }

  /**
   * Returns the property tween object.
   * @param {string} tweenProp the property name
   * @param {string} value the property name
   * @returns {number} the property tween object
   */
  function prepareBoxModel(tweenProp, value) {
    var boxValue = trueDimension(value);
    var offsetProp = tweenProp === 'height' ? 'offsetHeight' : 'offsetWidth';
    return boxValue.u === '%' ? (boxValue.v * this.element[offsetProp]) / 100 : boxValue.v;
  }

  // Component Base Props
  var essentialBoxProps = ['top', 'left', 'width', 'height'];
  var essentialBoxPropsValues = {
    top: 0, left: 0, width: 0, height: 0,
  };

  var essentialBoxOnStart = {};
  essentialBoxProps.forEach(function (x) { essentialBoxOnStart[x] = boxModelOnStart; });

  // All Component Functions
  var essentialBoxModelFunctions = {
    prepareStart: getBoxModel,
    prepareProperty: prepareBoxModel,
    onStart: essentialBoxOnStart,
  };

  // Component Essential
  var BoxModelEssential = {
    component: 'essentialBoxModel',
    category: 'boxModel',
    properties: essentialBoxProps,
    defaultValues: essentialBoxPropsValues,
    Interpolate: { numbers: numbers },
    functions: essentialBoxModelFunctions,
    Util: { trueDimension: trueDimension },
  };

  /**
   * hexToRGB
   *
   * Converts a #HEX color format into RGB
   * and returns a color object {r,g,b}.
   *
   * @param {string} hex the degree angle
   * @returns {KUTE.colorObject | null} the radian angle
   */
  var hexToRGB = function (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var hexShorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var HEX = hex.replace(hexShorthand, function (_, r, g, b) { return r + r + g + g + b + b; });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(HEX);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  /**
   * trueColor
   *
   * Transform any color to rgba()/rgb() and return a nice RGB(a) object.
   *
   * @param {string} colorString the color input
   * @returns {KUTE.colorObject} the {r,g,b,a} color object
   */
  var trueColor = function (colorString) {
    var result;
    if (/rgb|rgba/.test(colorString)) { // first check if it's a rgb string
      var vrgb = colorString.replace(/\s|\)/, '').split('(')[1].split(',');
      var colorAlpha = vrgb[3] ? vrgb[3] : null;
      if (!colorAlpha) {
        result = { r: parseInt(vrgb[0], 10), g: parseInt(vrgb[1], 10), b: parseInt(vrgb[2], 10) };
      }
      result = {
        r: parseInt(vrgb[0], 10),
        g: parseInt(vrgb[1], 10),
        b: parseInt(vrgb[2], 10),
        a: parseFloat(colorAlpha),
      };
    } if (/^#/.test(colorString)) {
      var fromHex = hexToRGB(colorString);
      result = { r: fromHex.r, g: fromHex.g, b: fromHex.b };
    } if (/transparent|none|initial|inherit/.test(colorString)) {
      result = {
        r: 0, g: 0, b: 0, a: 0,
      };
    }
    // maybe we can check for web safe colors
    // only works in a browser
    if (!/^#|^rgb/.test(colorString)) {
      var siteHead = document.getElementsByTagName('head')[0];
      siteHead.style.color = colorString;
      var webColor = getComputedStyle(siteHead, null).color;
      webColor = /rgb/.test(webColor) ? webColor.replace(/[^\d,]/g, '').split(',') : [0, 0, 0];
      siteHead.style.color = '';
      result = {
        r: parseInt(webColor[0], 10),
        g: parseInt(webColor[1], 10),
        b: parseInt(webColor[2], 10),
      };
    }
    return result;
  };

  /**
   * Color Interpolation Function.
   *
   * @param {KUTE.colorObject} a start color
   * @param {KUTE.colorObject} b end color
   * @param {number} v progress
   * @returns {string} the resulting color
   */
  function colors(a, b, v) {
    var _c = {};
    var ep = ')';
    var cm = ',';
    var rgb = 'rgb(';
    var rgba = 'rgba(';

    Object.keys(b).forEach(function (c) {
      if (c !== 'a') {
        _c[c] = numbers(a[c], b[c], v) >> 0 || 0; // eslint-disable-line no-bitwise
      } else if (a[c] && b[c]) {
        _c[c] = (numbers(a[c], b[c], v) * 100 >> 0) / 100; // eslint-disable-line no-bitwise
      }
    });

    return !_c.a
      ? rgb + _c.r + cm + _c.g + cm + _c.b + ep
      : rgba + _c.r + cm + _c.g + cm + _c.b + cm + _c.a + ep;
  }

  // Component Interpolation
  // rgba1, rgba2, progress

  // Component Properties
  // supported formats
  // 'hex', 'rgb', 'rgba' '#fff' 'rgb(0,0,0)' / 'rgba(0,0,0,0)' 'red' (IE9+)
  var supportedColors$1 = [
    'color', 'backgroundColor', 'outlineColor',
    'borderColor',
    'borderTopColor', 'borderRightColor',
    'borderBottomColor', 'borderLeftColor' ];

  // Component Functions
  /**
   * Sets the property update function.
   * @param {string} tweenProp the property name
   */
  function onStartColors(tweenProp) {
    if (this.valuesEnd[tweenProp] && !KEC[tweenProp]) {
      KEC[tweenProp] = function (elem, a, b, v) {
        // eslint-disable-next-line no-param-reassign
        elem.style[tweenProp] = colors(a, b, v);
      };
    }
  }

  var colorsOnStart$1 = {};
  supportedColors$1.forEach(function (x) { colorsOnStart$1[x] = onStartColors; });

  // Component Properties
  // supported formats
  // 'hex', 'rgb', 'rgba' '#fff' 'rgb(0,0,0)' / 'rgba(0,0,0,0)' 'red' (IE9+)
  var supportedColors = [
    'color', 'backgroundColor', 'outlineColor',
    'borderColor', 'borderTopColor', 'borderRightColor',
    'borderBottomColor', 'borderLeftColor' ];

  var defaultColors = {};
  supportedColors.forEach(function (tweenProp) {
    defaultColors[tweenProp] = '#000';
  });

  // Component Functions
  var colorsOnStart = {};
  supportedColors.forEach(function (x) {
    colorsOnStart[x] = onStartColors;
  });

  /**
   * Returns the current property computed style.
   * @param {string} prop the property name
   * @returns {string} property computed style
   */
  function getColor(prop/* , value */) {
    return getStyleForProperty(this.element, prop) || defaultValues[prop];
  }

  /**
   * Returns the property tween object.
   * @param {string} _ the property name
   * @param {string} value the property value
   * @returns {KUTE.colorObject} the property tween object
   */
  function prepareColor(/* prop, */_, value) {
    return trueColor(value);
  }

  // All Component Functions
  var colorFunctions = {
    prepareStart: getColor,
    prepareProperty: prepareColor,
    onStart: colorsOnStart,
  };

  // Component Full
  var colorProperties = {
    component: 'colorProperties',
    category: 'colors',
    properties: supportedColors,
    defaultValues: defaultColors,
    Interpolate: { numbers: numbers, colors: colors },
    functions: colorFunctions,
    Util: { trueColor: trueColor },
  };

  // Component Special
  var attributes = {};

  var onStartAttr = {
    /**
     * onStartAttr.attr
     *
     * Sets the sub-property update function.
     * @param {string} tweenProp the property name
     */
    attr: function attr(tweenProp) {
      if (!KEC[tweenProp] && this.valuesEnd[tweenProp]) {
        KEC[tweenProp] = function (elem, vS, vE, v) {
          Object.keys(vE).forEach(function (oneAttr) {
            KEC.attributes[oneAttr](elem, oneAttr, vS[oneAttr], vE[oneAttr], v);
          });
        };
      }
    },
    /**
     * onStartAttr.attributes
     *
     * Sets the update function for the property.
     * @param {string} tweenProp the property name
     */
    attributes: function attributes$1(tweenProp) {
      if (!KEC[tweenProp] && this.valuesEnd.attr) {
        KEC[tweenProp] = attributes;
      }
    },
  };

  // Component Name
  var ComponentName = 'htmlAttributes';

  // Component Properties
  var svgColors = ['fill', 'stroke', 'stop-color'];

  // Component Util
  /**
   * Returns non-camelcase property name.
   * @param {string} a the camelcase property name
   * @returns {string} the non-camelcase property name
   */
  function replaceUppercase(a) { return a.replace(/[A-Z]/g, '-$&').toLowerCase(); }

  // Component Functions
  /**
   * Returns the current attribute value.
   * @param {string} _ the property name
   * @param {string} value the property value
   * @returns {{[x:string]: string}} attribute value
   */
  function getAttr(/* tweenProp, */_, value) {
    var this$1$1 = this;

    var attrStartValues = {};
    Object.keys(value).forEach(function (attr) {
      // get the value for 'fill-opacity' not fillOpacity
      // also 'width' not the internal 'width_px'
      var attribute = replaceUppercase(attr).replace(/_+[a-z]+/, '');
      var currentValue = this$1$1.element.getAttribute(attribute);
      attrStartValues[attribute] = svgColors.includes(attribute)
        ? (currentValue || 'rgba(0,0,0,0)')
        : (currentValue || (/opacity/i.test(attr) ? 1 : 0));
    });

    return attrStartValues;
  }

  /**
   * Returns the property tween object.
   * @param {string} tweenProp the property name
   * @param {string} attrObj the property value
   * @returns {number} the property tween object
   */
  function prepareAttr(tweenProp, attrObj) {
    var this$1$1 = this;
   // attr (string),attrObj (object)
    var attributesObject = {};

    Object.keys(attrObj).forEach(function (p) {
      var prop = replaceUppercase(p);
      var regex = /(%|[a-z]+)$/;
      var currentValue = this$1$1.element.getAttribute(prop.replace(/_+[a-z]+/, ''));

      if (!svgColors.includes(prop)) {
        // attributes set with unit suffixes
        if (currentValue !== null && regex.test(currentValue)) {
          var unit = trueDimension(currentValue).u || trueDimension(attrObj[p]).u;
          var suffix = /%/.test(unit) ? '_percent' : ("_" + unit);

          // most "unknown" attributes cannot register into onStart, so we manually add them
          onStart[ComponentName][prop + suffix] = function (tp) {
            if (this$1$1.valuesEnd[tweenProp] && this$1$1.valuesEnd[tweenProp][tp] && !(tp in attributes)) {
              attributes[tp] = function (elem, oneAttr, a, b, v) {
                var _p = oneAttr.replace(suffix, '');
                /* eslint no-bitwise: ["error", { "allow": [">>"] }] */
                elem.setAttribute(_p, ((numbers(a.v, b.v, v) * 1000 >> 0) / 1000) + b.u);
              };
            }
          };
          attributesObject[prop + suffix] = trueDimension(attrObj[p]);
        } else if (!regex.test(attrObj[p]) || currentValue === null
          || (currentValue !== null && !regex.test(currentValue))) {
          // most "unknown" attributes cannot register into onStart, so we manually add them
          onStart[ComponentName][prop] = function (tp) {
            if (this$1$1.valuesEnd[tweenProp] && this$1$1.valuesEnd[tweenProp][tp] && !(tp in attributes)) {
              attributes[tp] = function (elem, oneAttr, a, b, v) {
                elem.setAttribute(oneAttr, (numbers(a, b, v) * 1000 >> 0) / 1000);
              };
            }
          };
          attributesObject[prop] = parseFloat(attrObj[p]);
        }
      } else { // colors
        // most "unknown" attributes cannot register into onStart, so we manually add them
        onStart[ComponentName][prop] = function (tp) {
          if (this$1$1.valuesEnd[tweenProp] && this$1$1.valuesEnd[tweenProp][tp] && !(tp in attributes)) {
            attributes[tp] = function (elem, oneAttr, a, b, v) {
              elem.setAttribute(oneAttr, colors(a, b, v));
            };
          }
        };
        attributesObject[prop] = trueColor(attrObj[p]) || defaultValues.htmlAttributes[p];
      }
    });

    return attributesObject;
  }

  // All Component Functions
  var attrFunctions = {
    prepareStart: getAttr,
    prepareProperty: prepareAttr,
    onStart: onStartAttr,
  };

  // Component Full
  var htmlAttributes = {
    component: ComponentName,
    property: 'attr',
    // the Animation class will need some values to validate this Object attribute
    subProperties: ['fill', 'stroke', 'stop-color', 'fill-opacity', 'stroke-opacity'],
    defaultValue: {
      fill: 'rgb(0,0,0)',
      stroke: 'rgb(0,0,0)',
      'stop-color': 'rgb(0,0,0)',
      opacity: 1,
      'stroke-opacity': 1,
      'fill-opacity': 1, // same here
    },
    Interpolate: { numbers: numbers, colors: colors },
    functions: attrFunctions,
    // export to global for faster execution
    Util: { replaceUppercase: replaceUppercase, trueColor: trueColor, trueDimension: trueDimension },
  };

  /* opacityProperty = {
    property: 'opacity',
    defaultValue: 1,
    interpolators: {numbers},
    functions = { prepareStart, prepareProperty, onStart }
  } */

  // Component Functions
  /**
   * Sets the property update function.
   * @param {string} tweenProp the property name
   */
  function onStartOpacity(tweenProp/* , value */) {
    // opacity could be 0 sometimes, we need to check regardless
    if (tweenProp in this.valuesEnd && !KEC[tweenProp]) {
      KEC[tweenProp] = function (elem, a, b, v) {
        /* eslint-disable */
        elem.style[tweenProp] = ((numbers(a, b, v) * 1000) >> 0) / 1000;
        /* eslint-enable */
      };
    }
  }

  // Component Functions
  /**
   * Returns the current property computed style.
   * @param {string} tweenProp the property name
   * @returns {string} computed style for property
   */
  function getOpacity(tweenProp/* , value */) {
    return getStyleForProperty(this.element, tweenProp);
  }

  /**
   * Returns the property tween object.
   * @param {string} _ the property name
   * @param {string} value the property value
   * @returns {number} the property tween object
   */
  function prepareOpacity(/* tweenProp, */_, value) {
    return parseFloat(value); // opacity always FLOAT
  }

  // All Component Functions
  var opacityFunctions = {
    prepareStart: getOpacity,
    prepareProperty: prepareOpacity,
    onStart: onStartOpacity,
  };

  // Full Component
  var OpacityProperty = {
    component: 'opacityProperty',
    property: 'opacity',
    defaultValue: 1,
    Interpolate: { numbers: numbers },
    functions: opacityFunctions,
  };

  // Component Values
  var lowerCaseAlpha = String('abcdefghijklmnopqrstuvwxyz').split(''); // lowercase
  var upperCaseAlpha = String('abcdefghijklmnopqrstuvwxyz').toUpperCase().split(''); // uppercase
  var nonAlpha = String("~!@#$%^&*()_+{}[];'<>,./?=-").split(''); // symbols
  var numeric = String('0123456789').split(''); // numeric
  var alphaNumeric = lowerCaseAlpha.concat(upperCaseAlpha, numeric); // alpha numeric
  var allTypes = alphaNumeric.concat(nonAlpha); // all caracters

  var charSet = {
    alpha: lowerCaseAlpha, // lowercase
    upper: upperCaseAlpha, // uppercase
    symbols: nonAlpha, // symbols
    numeric: numeric,
    alphanumeric: alphaNumeric,
    all: allTypes,
  };

  // Component Functions
  var onStartWrite = {
    /**
     * onStartWrite.text
     *
     * Sets the property update function.
     * @param {string} tweenProp the property name
     */
    text: function text(tweenProp) {
      if (!KEC[tweenProp] && this.valuesEnd[tweenProp]) {
        var chars = this._textChars;
        var charsets = charSet[defaultOptions$1.textChars];

        if (chars in charSet) {
          charsets = charSet[chars];
        } else if (chars && chars.length) {
          charsets = chars;
        }

        KEC[tweenProp] = function (elem, a, b, v) {
          var initialText = '';
          var endText = '';
          var finalText = b === '' ? ' ' : b;
          var firstLetterA = a.substring(0);
          var firstLetterB = b.substring(0);
          /* eslint-disable */
          var pointer = charsets[(Math.random() * charsets.length) >> 0];

          if (a === ' ') {
            endText = firstLetterB
              .substring(Math.min(v * firstLetterB.length, firstLetterB.length) >> 0, 0);
            elem.innerHTML = v < 1 ? ((endText + pointer)) : finalText;
          } else if (b === ' ') {
            initialText = firstLetterA
              .substring(0, Math.min((1 - v) * firstLetterA.length, firstLetterA.length) >> 0);
            elem.innerHTML = v < 1 ? ((initialText + pointer)) : finalText;
          } else {
            initialText = firstLetterA
              .substring(firstLetterA.length,
                Math.min(v * firstLetterA.length, firstLetterA.length) >> 0);
            endText = firstLetterB
              .substring(0, Math.min(v * firstLetterB.length, firstLetterB.length) >> 0);
            elem.innerHTML = v < 1 ? ((endText + pointer + initialText)) : finalText;
          }
          /* eslint-enable */
        };
      }
    },
    /**
     * onStartWrite.number
     *
     * Sets the property update function.
     * @param {string} tweenProp the property name
     */
    number: function number(tweenProp) {
      if (tweenProp in this.valuesEnd && !KEC[tweenProp]) { // numbers can be 0
        KEC[tweenProp] = function (elem, a, b, v) {
          /* eslint-disable */
          elem.innerHTML = numbers(a, b, v) >> 0;
          /* eslint-enable */
        };
      }
    },
  };

  // Component Util
  // utility for multi-child targets
  // wrapContentsSpan returns an [Element] with the SPAN.tagName and a desired class
  function wrapContentsSpan(el, classNAME) {
    var assign;

    var textWriteWrapper;
    var newElem;
    if (typeof (el) === 'string') {
      newElem = document.createElement('SPAN');
      newElem.innerHTML = el;
      newElem.className = classNAME;
      return newElem;
    }
    if (!el.children.length || (el.children.length && el.children[0].className !== classNAME)) {
      var elementInnerHTML = el.innerHTML;
      textWriteWrapper = document.createElement('SPAN');
      textWriteWrapper.className = classNAME;
      textWriteWrapper.innerHTML = elementInnerHTML;
      /* eslint-disable no-param-reassign -- impossible to satisfy */
      el.appendChild(textWriteWrapper);
      el.innerHTML = textWriteWrapper.outerHTML;
      /* eslint-enable no-param-reassign -- impossible to satisfy */
    } else if (el.children.length && el.children[0].className === classNAME) {
      (assign = el.children, textWriteWrapper = assign[0]);
    }
    return textWriteWrapper;
  }

  function getTextPartsArray(el, classNAME) {
    var elementsArray = [];
    var len = el.children.length;
    if (len) {
      var textParts = [];
      var remainingMarkup = el.innerHTML;
      var wrapperParts;

      for (var i = 0, currentChild = (void 0), childOuter = (void 0), unTaggedContent = (void 0); i < len; i += 1) {
        currentChild = el.children[i];
        childOuter = currentChild.outerHTML;
        wrapperParts = remainingMarkup.split(childOuter);

        if (wrapperParts[0] !== '') {
          unTaggedContent = wrapContentsSpan(wrapperParts[0], classNAME);
          textParts.push(unTaggedContent);
          remainingMarkup = remainingMarkup.replace(wrapperParts[0], '');
        } else if (wrapperParts[1] !== '') {
          unTaggedContent = wrapContentsSpan(wrapperParts[1].split('<')[0], classNAME);
          textParts.push(unTaggedContent);
          remainingMarkup = remainingMarkup.replace(wrapperParts[0].split('<')[0], '');
        }

        if (!currentChild.classList.contains(classNAME)) { currentChild.classList.add(classNAME); }
        textParts.push(currentChild);
        remainingMarkup = remainingMarkup.replace(childOuter, '');
      }

      if (remainingMarkup !== '') {
        var unTaggedRemaining = wrapContentsSpan(remainingMarkup, classNAME);
        textParts.push(unTaggedRemaining);
      }

      elementsArray = elementsArray.concat(textParts);
    } else {
      elementsArray = elementsArray.concat([wrapContentsSpan(el, classNAME)]);
    }
    return elementsArray;
  }

  function setSegments(target, newText) {
    var oldTargetSegs = getTextPartsArray(target, 'text-part');
    var newTargetSegs = getTextPartsArray(wrapContentsSpan(newText), 'text-part');

    /* eslint-disable no-param-reassign */
    target.innerHTML = '';
    target.innerHTML += oldTargetSegs.map(function (s) { s.className += ' oldText'; return s.outerHTML; }).join('');
    target.innerHTML += newTargetSegs.map(function (s) { s.className += ' newText'; return s.outerHTML.replace(s.innerHTML, ''); }).join('');
    /* eslint-enable no-param-reassign */

    return [oldTargetSegs, newTargetSegs];
  }

  function createTextTweens(target, newText, ops) {
    if (target.playing) { return false; }

    var options = ops || {};
    options.duration = 1000;

    if (ops.duration === 'auto') {
      options.duration = 'auto';
    } else if (Number.isFinite(ops.duration * 1)) {
      options.duration = ops.duration * 1;
    }

    var TweenContructor = connect.tween;
    var segs = setSegments(target, newText);
    var oldTargetSegs = segs[0];
    var newTargetSegs = segs[1];
    var oldTargets = [].slice.call(target.getElementsByClassName('oldText')).reverse();
    var newTargets = [].slice.call(target.getElementsByClassName('newText'));

    var textTween = [];
    var totalDelay = 0;

    textTween = textTween.concat(oldTargets.map(function (el, i) {
      options.duration = options.duration === 'auto'
        ? oldTargetSegs[i].innerHTML.length * 75
        : options.duration;
      options.delay = totalDelay;
      options.onComplete = null;

      totalDelay += options.duration;
      return new TweenContructor(el, { text: el.innerHTML }, { text: '' }, options);
    }));
    textTween = textTween.concat(newTargets.map(function (el, i) {
      function onComplete() {
        /* eslint-disable no-param-reassign */
        target.innerHTML = newText;
        target.playing = false;
        /* eslint-enable no-param-reassign */
      }

      options.duration = options.duration === 'auto' ? newTargetSegs[i].innerHTML.length * 75 : options.duration;
      options.delay = totalDelay;
      options.onComplete = i === newTargetSegs.length - 1 ? onComplete : null;
      totalDelay += options.duration;

      return new TweenContructor(el, { text: '' }, { text: newTargetSegs[i].innerHTML }, options);
    }));

    textTween.start = function startTweens() {
      if (!target.playing) {
        textTween.forEach(function (tw) { return tw.start(); });
        // eslint-disable-next-line no-param-reassign
        target.playing = true;
      }
    };

    return textTween;
  }

  // Component Functions
  /**
   * Returns the current element `innerHTML`.
   * @returns {string} computed style for property
   */
  function getWrite(/* tweenProp, value */) {
    return this.element.innerHTML;
  }

  /**
   * Returns the property tween object.
   * @param {string} tweenProp the property name
   * @param {string} value the property value
   * @returns {number | string} the property tween object
   */
  function prepareText(tweenProp, value) {
    if (tweenProp === 'number') {
      return parseFloat(value);
    }
    // empty strings crash the update function
    return value === '' ? ' ' : value;
  }

  // All Component Functions
  var textWriteFunctions = {
    prepareStart: getWrite,
    prepareProperty: prepareText,
    onStart: onStartWrite,
  };

  // Full Component
  var TextWrite = {
    component: 'textWriteProperties',
    category: 'textWrite',
    properties: ['text', 'number'],
    defaultValues: { text: ' ', number: '0' },
    defaultOptions: { textChars: 'alpha' },
    Interpolate: { numbers: numbers },
    functions: textWriteFunctions,
    // export to global for faster execution
    Util: { charSet: charSet, createTextTweens: createTextTweens },
  };

  /**
   * Perspective Interpolation Function.
   *
   * @param {number} a start value
   * @param {number} b end value
   * @param {string} u unit
   * @param {number} v progress
   * @returns {string} the perspective function in string format
   */
  function perspective(a, b, u, v) {
    // eslint-disable-next-line no-bitwise
    return ("perspective(" + (((a + (b - a) * v) * 1000 >> 0) / 1000) + u + ")");
  }

  /**
   * Translate 3D Interpolation Function.
   *
   * @param {number[]} a start [x,y,z] position
   * @param {number[]} b end [x,y,z] position
   * @param {string} u unit, usually `px` degrees
   * @param {number} v progress
   * @returns {string} the interpolated 3D translation string
   */
  function translate3d(a, b, u, v) {
    var translateArray = [];
    for (var ax = 0; ax < 3; ax += 1) {
      translateArray[ax] = (a[ax] || b[ax]
        // eslint-disable-next-line no-bitwise
        ? ((a[ax] + (b[ax] - a[ax]) * v) * 1000 >> 0) / 1000 : 0) + u;
    }
    return ("translate3d(" + (translateArray.join(',')) + ")");
  }

  /**
   * 3D Rotation Interpolation Function.
   *
   * @param {number} a start [x,y,z] angles
   * @param {number} b end [x,y,z] angles
   * @param {string} u unit, usually `deg` degrees
   * @param {number} v progress
   * @returns {string} the interpolated 3D rotation string
   */
  function rotate3d(a, b, u, v) {
    var rotateStr = '';
    // eslint-disable-next-line no-bitwise
    rotateStr += a[0] || b[0] ? ("rotateX(" + (((a[0] + (b[0] - a[0]) * v) * 1000 >> 0) / 1000) + u + ")") : '';
    // eslint-disable-next-line no-bitwise
    rotateStr += a[1] || b[1] ? ("rotateY(" + (((a[1] + (b[1] - a[1]) * v) * 1000 >> 0) / 1000) + u + ")") : '';
    // eslint-disable-next-line no-bitwise
    rotateStr += a[2] || b[2] ? ("rotateZ(" + (((a[2] + (b[2] - a[2]) * v) * 1000 >> 0) / 1000) + u + ")") : '';
    return rotateStr;
  }

  /**
   * Translate 2D Interpolation Function.
   *
   * @param {number[]} a start [x,y] position
   * @param {number[]} b end [x,y] position
   * @param {string} u unit, usually `px` degrees
   * @param {number} v progress
   * @returns {string} the interpolated 2D translation string
   */
  function translate(a, b, u, v) {
    var translateArray = [];
    // eslint-disable-next-line no-bitwise
    translateArray[0] = (a[0] === b[0] ? b[0] : ((a[0] + (b[0] - a[0]) * v) * 1000 >> 0) / 1000) + u;
    // eslint-disable-next-line no-bitwise
    translateArray[1] = a[1] || b[1] ? ((a[1] === b[1] ? b[1] : ((a[1] + (b[1] - a[1]) * v) * 1000 >> 0) / 1000) + u) : '0';
    return ("translate(" + (translateArray.join(',')) + ")");
  }

  /**
   * 2D Rotation Interpolation Function.
   *
   * @param {number} a start angle
   * @param {number} b end angle
   * @param {string} u unit, usually `deg` degrees
   * @param {number} v progress
   * @returns {string} the interpolated rotation
   */
  function rotate(a, b, u, v) {
    // eslint-disable-next-line no-bitwise
    return ("rotate(" + (((a + (b - a) * v) * 1000 >> 0) / 1000) + u + ")");
  }

  /**
   * Scale Interpolation Function.
   *
   * @param {number} a start scale
   * @param {number} b end scale
   * @param {number} v progress
   * @returns {string} the interpolated scale
   */
  function scale(a, b, v) {
    // eslint-disable-next-line no-bitwise
    return ("scale(" + (((a + (b - a) * v) * 1000 >> 0) / 1000) + ")");
  }

  /**
   * Skew Interpolation Function.
   *
   * @param {number} a start {x,y} angles
   * @param {number} b end {x,y} angles
   * @param {string} u unit, usually `deg` degrees
   * @param {number} v progress
   * @returns {string} the interpolated string value of skew(s)
   */
  function skew(a, b, u, v) {
    var skewArray = [];
    // eslint-disable-next-line no-bitwise
    skewArray[0] = (a[0] === b[0] ? b[0] : ((a[0] + (b[0] - a[0]) * v) * 1000 >> 0) / 1000) + u;
    // eslint-disable-next-line no-bitwise
    skewArray[1] = a[1] || b[1] ? ((a[1] === b[1] ? b[1] : ((a[1] + (b[1] - a[1]) * v) * 1000 >> 0) / 1000) + u) : '0';
    return ("skew(" + (skewArray.join(',')) + ")");
  }

  // Component Functions
  /**
   * Sets the property update function.
   * * same to svgTransform, htmlAttributes
   * @param {string} tweenProp the property name
   */
  function onStartTransform(tweenProp) {
    if (!KEC[tweenProp] && this.valuesEnd[tweenProp]) {
      KEC[tweenProp] = function (elem, a, b, v) {
        // eslint-disable-next-line no-param-reassign
        elem.style[tweenProp] = (a.perspective || b.perspective ? perspective(a.perspective, b.perspective, 'px', v) : '') // one side might be 0
          + (a.translate3d ? translate3d(a.translate3d, b.translate3d, 'px', v) : '') // array [x,y,z]
          + (a.rotate3d ? rotate3d(a.rotate3d, b.rotate3d, 'deg', v) : '') // array [x,y,z]
          + (a.skew ? skew(a.skew, b.skew, 'deg', v) : '') // array [x,y]
          + (a.scale || b.scale ? scale(a.scale, b.scale, v) : ''); // one side might be 0
      };
    }
  }

  // same to svg transform, attr
  // the component developed for modern browsers supporting non-prefixed transform

  // Component Functions
  /**
   * Returns the current property inline style.
   * @param {string} tweenProp the property name
   * @returns {string} inline style for property
   */
  function getTransform(tweenProp/* , value */) {
    var currentStyle = getInlineStyle(this.element);
    return currentStyle[tweenProp] ? currentStyle[tweenProp] : defaultValues[tweenProp];
  }

  /**
   * Returns the property tween object.
   * @param {string} _ the property name
   * @param {Object<string, string | number | (string | number)[]>} obj the property value
   * @returns {KUTE.transformFObject} the property tween object
   */
  function prepareTransform(/* prop, */_, obj) {
    var prepAxis = ['X', 'Y', 'Z']; // coordinates
    var transformObject = {};
    var translateArray = []; var rotateArray = []; var skewArray = [];
    var arrayFunctions = ['translate3d', 'translate', 'rotate3d', 'skew'];

    Object.keys(obj).forEach(function (x) {
      var pv = typeof obj[x] === 'object' && obj[x].length
        ? obj[x].map(function (v) { return parseInt(v, 10); })
        : parseInt(obj[x], 10);

      if (arrayFunctions.includes(x)) {
        var propId = x === 'translate' || x === 'rotate' ? (x + "3d") : x;

        if (x === 'skew') {
          transformObject[propId] = pv.length
            ? [pv[0] || 0, pv[1] || 0]
            : [pv || 0, 0];
        } else if (x === 'translate') {
          transformObject[propId] = pv.length
            ? [pv[0] || 0, pv[1] || 0, pv[2] || 0]
            : [pv || 0, 0, 0];
        } else { // translate3d | rotate3d
          transformObject[propId] = [pv[0] || 0, pv[1] || 0, pv[2] || 0];
        }
      } else if (/[XYZ]/.test(x)) {
        var fn = x.replace(/[XYZ]/, '');
        var fnId = fn === 'skew' ? fn : (fn + "3d");
        var fnLen = fn === 'skew' ? 2 : 3;
        var fnArray = [];

        if (fn === 'translate') {
          fnArray = translateArray;
        } else if (fn === 'rotate') {
          fnArray = rotateArray;
        } else if (fn === 'skew') {
          fnArray = skewArray;
        }

        for (var fnIndex = 0; fnIndex < fnLen; fnIndex += 1) {
          var fnAxis = prepAxis[fnIndex];
          fnArray[fnIndex] = (("" + fn + fnAxis) in obj) ? parseInt(obj[("" + fn + fnAxis)], 10) : 0;
        }
        transformObject[fnId] = fnArray;
      } else if (x === 'rotate') { //  rotate
        transformObject.rotate3d = [0, 0, pv];
      } else { // scale | perspective
        transformObject[x] = x === 'scale' ? parseFloat(obj[x]) : pv;
      }
    });

    return transformObject;
  }

  /**
   * Prepare tween object in advance for `to()` method.
   * @param {string} tweenProp the property name
   */
  function crossCheckTransform(tweenProp) {
    if (this.valuesEnd[tweenProp]) {
      if (this.valuesEnd[tweenProp]) {
        if (this.valuesEnd[tweenProp].perspective && !this.valuesStart[tweenProp].perspective) {
          this.valuesStart[tweenProp].perspective = this.valuesEnd[tweenProp].perspective;
        }
      }
    }
  }

  // All Component Functions
  var transformFunctions = {
    prepareStart: getTransform,
    prepareProperty: prepareTransform,
    onStart: onStartTransform,
    crossCheck: crossCheckTransform,
  };

  var supportedTransformProperties = [
    'perspective',
    'translate3d', 'translateX', 'translateY', 'translateZ', 'translate',
    'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'rotate',
    'skewX', 'skewY', 'skew',
    'scale' ];

  var defaultTransformValues = {
    perspective: 400,
    translate3d: [0, 0, 0],
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    translate: [0, 0],
    rotate3d: [0, 0, 0],
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    rotate: 0,
    skewX: 0,
    skewY: 0,
    skew: [0, 0],
    scale: 1,
  };

  // Full Component
  var TransformFunctions = {
    component: 'transformFunctions',
    property: 'transform',
    subProperties: supportedTransformProperties,
    defaultValues: defaultTransformValues,
    functions: transformFunctions,
    Interpolate: {
      perspective: perspective,
      translate3d: translate3d,
      rotate3d: rotate3d,
      translate: translate,
      rotate: rotate,
      scale: scale,
      skew: skew,
    },
  };

  // Component Functions
  /**
   * Sets the property update function.
   * @param {string} tweenProp the property name
   */
  function onStartDraw(tweenProp) {
    if (tweenProp in this.valuesEnd && !KEC[tweenProp]) {
      KEC[tweenProp] = function (elem, a, b, v) {
        /* eslint-disable no-bitwise -- impossible to satisfy */
        var pathLength = (a.l * 100 >> 0) / 100;
        var start = (numbers(a.s, b.s, v) * 100 >> 0) / 100;
        var end = (numbers(a.e, b.e, v) * 100 >> 0) / 100;
        var offset = 0 - start;
        var dashOne = end + offset;
        // eslint-disable-next-line no-param-reassign -- impossible to satisfy
        elem.style.strokeDashoffset = offset + "px";
        // eslint-disable-next-line no-param-reassign -- impossible to satisfy
        elem.style.strokeDasharray = (((dashOne < 1 ? 0 : dashOne) * 100 >> 0) / 100) + "px, " + pathLength + "px";
        /* eslint-disable no-bitwise -- impossible to satisfy */
      };
    }
  }

  // Component Util
  /**
   * Convert a `<path>` length percent value to absolute.
   * @param {string} v raw value
   * @param {number} l length value
   * @returns {number} the absolute value
   */
  function percent(v, l) {
    return (parseFloat(v) / 100) * l;
  }

  /**
   * Returns the `<rect>` length.
   * It doesn't compute `rx` and / or `ry` of the element.
   * @see http://stackoverflow.com/a/30376660
   * @param {SVGRectElement} el target element
   * @returns {number} the `<rect>` length
   */
  function getRectLength(el) {
    var w = el.getAttribute('width');
    var h = el.getAttribute('height');
    return (w * 2) + (h * 2);
  }

  /**
   * Returns the `<polyline>` / `<polygon>` length.
   * @param {SVGPolylineElement | SVGPolygonElement} el target element
   * @returns {number} the element length
   */
  function getPolyLength(el) {
    var points = el.getAttribute('points').split(' ');

    var len = 0;
    if (points.length > 1) {
      var coord = function (p) {
        var c = p.split(',');
        if (c.length !== 2) { return 0; } // return undefined
        if (Number.isNaN(c[0] * 1) || Number.isNaN(c[1] * 1)) { return 0; }
        return [parseFloat(c[0]), parseFloat(c[1])];
      };

      var dist = function (c1, c2) {
        if (c1 !== undefined && c2 !== undefined) {
          return Math.sqrt(Math.pow( (c2[0] - c1[0]), 2 ) + Math.pow( (c2[1] - c1[1]), 2 ));
        }
        return 0;
      };

      if (points.length > 2) {
        for (var i = 0; i < points.length - 1; i += 1) {
          len += dist(coord(points[i]), coord(points[i + 1]));
        }
      }
      len += el.tagName === 'polygon'
        ? dist(coord(points[0]), coord(points[points.length - 1])) : 0;
    }
    return len;
  }

  /**
   * Returns the `<line>` length.
   * @param {SVGLineElement} el target element
   * @returns {number} the element length
   */
  function getLineLength(el) {
    var x1 = el.getAttribute('x1');
    var x2 = el.getAttribute('x2');
    var y1 = el.getAttribute('y1');
    var y2 = el.getAttribute('y2');
    return Math.sqrt(Math.pow( (x2 - x1), 2 ) + Math.pow( (y2 - y1), 2 ));
  }

  /**
   * Returns the `<circle>` length.
   * @param {SVGCircleElement} el target element
   * @returns {number} the element length
   */
  function getCircleLength(el) {
    var r = el.getAttribute('r');
    return 2 * Math.PI * r;
  }

  // returns the length of an ellipse
  /**
   * Returns the `<ellipse>` length.
   * @param {SVGEllipseElement} el target element
   * @returns {number} the element length
   */
  function getEllipseLength(el) {
    var rx = el.getAttribute('rx');
    var ry = el.getAttribute('ry');
    var len = 2 * rx;
    var wid = 2 * ry;
    return ((Math.sqrt(0.5 * ((len * len) + (wid * wid)))) * (Math.PI * 2)) / 2;
  }

  /**
   * Returns the shape length.
   * @param {SVGPathCommander.shapeTypes} el target element
   * @returns {number} the element length
   */
  function getTotalLength$1(el) {
    if (el.tagName === 'rect') {
      return getRectLength(el);
    } if (el.tagName === 'circle') {
      return getCircleLength(el);
    } if (el.tagName === 'ellipse') {
      return getEllipseLength(el);
    } if (['polygon', 'polyline'].includes(el.tagName)) {
      return getPolyLength(el);
    } if (el.tagName === 'line') {
      return getLineLength(el);
    }
    // ESLint
    return 0;
  }

  /**
   * Returns the property tween object.
   * @param {SVGPathCommander.shapeTypes} element the target element
   * @param {string | KUTE.drawObject} value the property value
   * @returns {KUTE.drawObject} the property tween object
   */
  function getDraw(element, value) {
    var length = /path|glyph/.test(element.tagName)
      ? element.getTotalLength()
      : getTotalLength$1(element);
    var start;
    var end;
    var dasharray;
    var offset;

    if (value instanceof Object && Object.keys(value).every(function (v) { return ['s', 'e', 'l'].includes(v); })) {
      return value;
    } if (typeof value === 'string') {
      var v = value.split(/,|\s/);
      start = /%/.test(v[0]) ? percent(v[0].trim(), length) : parseFloat(v[0]);
      end = /%/.test(v[1]) ? percent(v[1].trim(), length) : parseFloat(v[1]);
    } else if (typeof value === 'undefined') {
      offset = parseFloat(getStyleForProperty(element, 'stroke-dashoffset'));
      dasharray = getStyleForProperty(element, 'stroke-dasharray').split(',');

      start = 0 - offset;
      end = parseFloat(dasharray[0]) + start || length;
    }
    return { s: start, e: end, l: length };
  }

  /**
   * Reset CSS properties associated with the `draw` property.
   * @param {SVGPathCommander.shapeTypes} element target
   */
  function resetDraw(elem) {
    /* eslint-disable no-param-reassign -- impossible to satisfy */
    elem.style.strokeDashoffset = '';
    elem.style.strokeDasharray = '';
    /* eslint-disable no-param-reassign -- impossible to satisfy */
  }

  // Component Functions
  /**
   * Returns the property tween object.
   * @returns {KUTE.drawObject} the property tween object
   */
  function getDrawValue(/* prop, value */) {
    return getDraw(this.element);
  }
  /**
   * Returns the property tween object.
   * @param {string} _ the property name
   * @param {string | KUTE.drawObject} value the property value
   * @returns {KUTE.drawObject} the property tween object
   */
  function prepareDraw(_, value) {
    return getDraw(this.element, value);
  }

  // All Component Functions
  var svgDrawFunctions = {
    prepareStart: getDrawValue,
    prepareProperty: prepareDraw,
    onStart: onStartDraw,
  };

  // Component Full
  var SvgDrawProperty = {
    component: 'svgDraw',
    property: 'draw',
    defaultValue: '0% 0%',
    Interpolate: { numbers: numbers },
    functions: svgDrawFunctions,
    // Export to global for faster execution
    Util: {
      getRectLength: getRectLength,
      getPolyLength: getPolyLength,
      getLineLength: getLineLength,
      getCircleLength: getCircleLength,
      getEllipseLength: getEllipseLength,
      getTotalLength: getTotalLength$1,
      resetDraw: resetDraw,
      getDraw: getDraw,
      percent: percent,
    },
  };

  /**
   * Splits an extended A (arc-to) segment into two cubic-bezier segments.
   *
   * @param {SVGPathCommander.pathArray} path the `pathArray` this segment belongs to
   * @param {string[]} allPathCommands all previous path commands
   * @param {number} i the segment index
   */

  function fixArc(path, allPathCommands, i) {
    if (path[i].length > 7) {
      path[i].shift();
      var segment = path[i];
      var ni = i; // ESLint
      while (segment.length) {
        // if created multiple C:s, their original seg is saved
        allPathCommands[i] = 'A';
        // @ts-ignore
        path.splice(ni += 1, 0, ['C' ].concat( segment.splice(0, 6)));
      }
      path.splice(i, 1);
    }
  }

  /**
   * Segment params length
   * @type {Record<string, number>}
   */
  var paramsCount = {
    a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0,
  };

  /**
   * Breaks the parsing of a pathString once a segment is finalized.
   *
   * @param {SVGPathCommander.PathParser} path the `PathParser` instance
   */
  function finalizeSegment(path) {
    var pathCommand = path.pathValue[path.segmentStart];
    var LK = pathCommand.toLowerCase();
    var data = path.data;

    // Process duplicated commands (without comand name)
    if (LK === 'm' && data.length > 2) {
      // @ts-ignore
      path.segments.push([pathCommand, data[0], data[1]]);
      data = data.slice(2);
      LK = 'l';
      pathCommand = pathCommand === 'm' ? 'l' : 'L';
    }

    // @ts-ignore
    while (data.length >= paramsCount[LK]) {
      // path.segments.push([pathCommand].concat(data.splice(0, paramsCount[LK])));
      // @ts-ignore
      path.segments.push([pathCommand ].concat( data.splice(0, paramsCount[LK])));
      // @ts-ignore
      if (!paramsCount[LK]) {
        break;
      }
    }
  }

  var invalidPathValue = 'Invalid path value';

  /**
   * Validates an A (arc-to) specific path command value.
   * Usually a `large-arc-flag` or `sweep-flag`.
   *
   * @param {SVGPathCommander.PathParser} path the `PathParser` instance
   */
  function scanFlag(path) {
    var index = path.index;
    var ch = path.pathValue.charCodeAt(index);

    if (ch === 0x30/* 0 */) {
      path.param = 0;
      path.index += 1;
      return;
    }

    if (ch === 0x31/* 1 */) {
      path.param = 1;
      path.index += 1;
      return;
    }

    path.err = invalidPathValue + ": invalid Arc flag \"" + ch + "\", expecting 0 or 1 at index " + index;
  }

  /**
   * Checks if a character is a digit.
   *
   * @param {number} code the character to check
   * @returns {boolean} check result
   */
  function isDigit(code) {
    return (code >= 48 && code <= 57); // 0..9
  }

  /**
   * Validates every character of the path string,
   * every path command, negative numbers or floating point numbers.
   *
   * @param {SVGPathCommander.PathParser} path the `PathParser` instance
   */
  function scanParam(path) {
    var max = path.max;
    var pathValue = path.pathValue;
    var start = path.index;
    var index = start;
    var zeroFirst = false;
    var hasCeiling = false;
    var hasDecimal = false;
    var hasDot = false;
    var ch;

    if (index >= max) {
      // path.err = 'SvgPath: missed param (at pos ' + index + ')';
      path.err = invalidPathValue + " at " + index + ": missing param " + (pathValue[index]);
      return;
    }
    ch = pathValue.charCodeAt(index);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      index += 1;
      ch = (index < max) ? pathValue.charCodeAt(index) : 0;
    }

    // This logic is shamelessly borrowed from Esprima
    // https://github.com/ariya/esprimas
    if (!isDigit(ch) && ch !== 0x2E/* . */) {
      // path.err = 'SvgPath: param should start with 0..9 or `.` (at pos ' + index + ')';
      path.err = invalidPathValue + " at index " + index + ": " + (pathValue[index]) + " is not a number";
      return;
    }

    if (ch !== 0x2E/* . */) {
      zeroFirst = (ch === 0x30/* 0 */);
      index += 1;

      ch = (index < max) ? pathValue.charCodeAt(index) : 0;

      if (zeroFirst && index < max) {
        // decimal number starts with '0' such as '09' is illegal.
        if (ch && isDigit(ch)) {
          // path.err = 'SvgPath: numbers started with `0` such as `09`
          // are illegal (at pos ' + start + ')';
          path.err = invalidPathValue + " at index " + start + ": " + (pathValue[start]) + " illegal number";
          return;
        }
      }

      while (index < max && isDigit(pathValue.charCodeAt(index))) {
        index += 1;
        hasCeiling = true;
      }
      ch = (index < max) ? pathValue.charCodeAt(index) : 0;
    }

    if (ch === 0x2E/* . */) {
      hasDot = true;
      index += 1;
      while (isDigit(pathValue.charCodeAt(index))) {
        index += 1;
        hasDecimal = true;
      }
      ch = (index < max) ? pathValue.charCodeAt(index) : 0;
    }

    if (ch === 0x65/* e */ || ch === 0x45/* E */) {
      if (hasDot && !hasCeiling && !hasDecimal) {
        path.err = invalidPathValue + " at index " + index + ": " + (pathValue[index]) + " invalid float exponent";
        return;
      }

      index += 1;

      ch = (index < max) ? pathValue.charCodeAt(index) : 0;
      if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
        index += 1;
      }
      if (index < max && isDigit(pathValue.charCodeAt(index))) {
        while (index < max && isDigit(pathValue.charCodeAt(index))) {
          index += 1;
        }
      } else {
        // path.err = 'SvgPath: invalid float exponent (at pos ' + index + ')';
        path.err = invalidPathValue + " at index " + index + ": " + (pathValue[index]) + " invalid float exponent";
        return;
      }
    }

    path.index = index;
    path.param = +path.pathValue.slice(start, index);
  }

  /**
   * Checks if the character is a space.
   *
   * @param {number} ch the character to check
   * @returns {boolean} check result
   */
  function isSpace(ch) {
    var specialSpaces = [
      0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006,
      0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF];
    return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029) // Line terminators
      // White spaces
      || (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0)
      || (ch >= 0x1680 && specialSpaces.indexOf(ch) >= 0);
  }

  /**
   * Points the parser to the next character in the
   * path string every time it encounters any kind of
   * space character.
   *
   * @param {SVGPathCommander.PathParser} path the `PathParser` instance
   */
  function skipSpaces(path) {
    var pathValue = path.pathValue;
    var max = path.max;
    while (path.index < max && isSpace(pathValue.charCodeAt(path.index))) {
      path.index += 1;
    }
  }

  /**
   * Checks if the character is a path command.
   *
   * @param {any} code the character to check
   * @returns {boolean} check result
   */
  function isPathCommand(code) {
    // eslint-disable-next-line no-bitwise -- Impossible to satisfy
    switch (code | 0x20) {
      case 0x6D/* m */:
      case 0x7A/* z */:
      case 0x6C/* l */:
      case 0x68/* h */:
      case 0x76/* v */:
      case 0x63/* c */:
      case 0x73/* s */:
      case 0x71/* q */:
      case 0x74/* t */:
      case 0x61/* a */:
      // case 0x72/* r */:
        return true;
      default:
        return false;
    }
  }

  /**
   * Checks if the character is or belongs to a number.
   * [0-9]|+|-|.
   *
   * @param {number} code the character to check
   * @returns {boolean} check result
   */
  function isDigitStart(code) {
    return (code >= 48 && code <= 57) /* 0..9 */
      || code === 0x2B /* + */
      || code === 0x2D /* - */
      || code === 0x2E; /* . */
  }

  /**
   * Checks if the character is an A (arc-to) path command.
   *
   * @param {number} code the character to check
   * @returns {boolean} check result
   */
  function isArcCommand(code) {
    // eslint-disable-next-line no-bitwise -- Impossible to satisfy
    return (code | 0x20) === 0x61;
  }

  /**
   * Scans every character in the path string to determine
   * where a segment starts and where it ends.
   *
   * @param {SVGPathCommander.PathParser} path the `PathParser` instance
   */
  function scanSegment(path) {
    var max = path.max;
    var pathValue = path.pathValue;
    var index = path.index;
    var cmdCode = pathValue.charCodeAt(index);
    var reqParams = paramsCount[pathValue[index].toLowerCase()];

    path.segmentStart = index;

    if (!isPathCommand(cmdCode)) {
      path.err = invalidPathValue + ": " + (pathValue[index]) + " not a path command";
      return;
    }

    path.index += 1;
    skipSpaces(path);

    path.data = [];

    if (!reqParams) {
      // Z
      finalizeSegment(path);
      return;
    }

    for (;;) {
      for (var i = reqParams; i > 0; i -= 1) {
        if (isArcCommand(cmdCode) && (i === 3 || i === 4)) { scanFlag(path); }
        else { scanParam(path); }

        if (path.err.length) {
          return;
        }
        path.data.push(path.param);

        skipSpaces(path);

        // after ',' param is mandatory
        if (path.index < max && pathValue.charCodeAt(path.index) === 0x2C/* , */) {
          path.index += 1;
          skipSpaces(path);
        }
      }

      if (path.index >= path.max) {
        break;
      }

      // Stop on next segment
      if (!isDigitStart(pathValue.charCodeAt(path.index))) {
        break;
      }
    }

    finalizeSegment(path);
  }

  /**
   * Returns a clone of an existing `pathArray`.
   *
   * @param {SVGPathCommander.pathArray | SVGPathCommander.pathSegment} path the source `pathArray`
   * @returns {any} the cloned `pathArray`
   */
  function clonePath(path) {
    return path.map(function (x) { return (Array.isArray(x) ? [].concat( x ) : x); });
  }

  /**
   * The `PathParser` is used by the `parsePathString` static method
   * to generate a `pathArray`.
   *
   * @param {string} pathString
   */
  function PathParser(pathString) {
    /** @type {SVGPathCommander.pathArray} */
    // @ts-ignore
    this.segments = [];
    /** @type {string} */
    this.pathValue = pathString;
    /** @type {number} */
    this.max = pathString.length;
    /** @type {number} */
    this.index = 0;
    /** @type {number} */
    this.param = 0.0;
    /** @type {number} */
    this.segmentStart = 0;
    /** @type {any} */
    this.data = [];
    /** @type {string} */
    this.err = '';
  }

  /**
   * Iterates an array to check if it's an actual `pathArray`.
   *
   * @param {string | SVGPathCommander.pathArray} path the `pathArray` to be checked
   * @returns {boolean} iteration result
   */
  function isPathArray(path) {
    return Array.isArray(path) && path.every(function (seg) {
      var lk = seg[0].toLowerCase();
      return paramsCount[lk] === seg.length - 1 && 'achlmqstvz'.includes(lk);
    });
  }

  /**
   * Parses a path string value and returns an array
   * of segments we like to call `pathArray`.
   *
   * @param {SVGPathCommander.pathArray | string} pathInput the string to be parsed
   * @returns {SVGPathCommander.pathArray} the resulted `pathArray`
   */
  function parsePathString(pathInput) {
    if (isPathArray(pathInput)) {
      // @ts-ignore -- isPathArray also checks if it's an `Array`
      return clonePath(pathInput);
    }

    // @ts-ignore -- pathInput is now string
    var path = new PathParser(pathInput);

    skipSpaces(path);

    while (path.index < path.max && !path.err.length) {
      scanSegment(path);
    }

    if (path.err.length) {
      // @ts-ignore
      path.segments = [];
    } else if (path.segments.length) {
      if (!'mM'.includes(path.segments[0][0])) {
        path.err = invalidPathValue + ": missing M/m";
        // @ts-ignore
        path.segments = [];
      } else {
        path.segments[0][0] = 'M';
      }
    }

    return path.segments;
  }

  /**
   * Iterates an array to check if it's a `pathArray`
   * with all absolute values.
   *
   * @param {string | SVGPathCommander.pathArray} path the `pathArray` to be checked
   * @returns {boolean} iteration result
   */
  function isAbsoluteArray(path) {
    return isPathArray(path)
      // @ts-ignore -- `isPathArray` also checks if it's `Array`
      && path.every(function (x) { return x[0] === x[0].toUpperCase(); });
  }

  /**
   * Parses a path string value or object and returns an array
   * of segments, all converted to absolute values.
   *
   * @param {string | SVGPathCommander.pathArray} pathInput the path string | object
   * @returns {SVGPathCommander.absoluteArray} the resulted `pathArray` with absolute values
   */
  function pathToAbsolute(pathInput) {
    if (isAbsoluteArray(pathInput)) {
      // @ts-ignore -- `isAbsoluteArray` checks if it's `pathArray`
      return clonePath(pathInput);
    }

    var path = parsePathString(pathInput);
    var x = 0; var y = 0;
    var mx = 0; var my = 0;

    // @ts-ignore -- the `absoluteSegment[]` is for sure an `absolutePath`
    return path.map(function (segment) {
      var assign, assign$1, assign$2;

      var values = segment.slice(1).map(Number);
      var pathCommand = segment[0];
      /** @type {SVGPathCommander.absoluteCommand} */
      // @ts-ignore
      var absCommand = pathCommand.toUpperCase();

      if (pathCommand === 'M') {
        (assign = values, x = assign[0], y = assign[1]);
        mx = x;
        my = y;
        return ['M', x, y];
      }
      /** @type {SVGPathCommander.absoluteSegment} */
      // @ts-ignore
      var absoluteSegment = [];

      if (pathCommand !== absCommand) {
        switch (absCommand) {
          case 'A':
            absoluteSegment = [
              absCommand, values[0], values[1], values[2],
              values[3], values[4], values[5] + x, values[6] + y];
            break;
          case 'V':
            absoluteSegment = [absCommand, values[0] + y];
            break;
          case 'H':
            absoluteSegment = [absCommand, values[0] + x];
            break;
          default: {
            // use brakets for `eslint: no-case-declaration`
            // https://stackoverflow.com/a/50753272/803358
            var absValues = values.map(function (n, j) { return n + (j % 2 ? y : x); });
            // @ts-ignore for n, l, c, s, q, t
            absoluteSegment = [absCommand ].concat( absValues);
          }
        }
      } else {
        // @ts-ignore
        absoluteSegment = [absCommand ].concat( values);
      }

      var segLength = absoluteSegment.length;
      switch (absCommand) {
        case 'Z':
          x = mx;
          y = my;
          break;
        case 'H':
          // @ts-ignore
          (assign$1 = absoluteSegment, x = assign$1[1]);
          break;
        case 'V':
          // @ts-ignore
          (assign$2 = absoluteSegment, y = assign$2[1]);
          break;
        default:
          // @ts-ignore
          x = absoluteSegment[segLength - 2];
          // @ts-ignore
          y = absoluteSegment[segLength - 1];

          if (absCommand === 'M') {
            mx = x;
            my = y;
          }
      }
      return absoluteSegment;
    });
  }

  /**
   * Returns the missing control point from an
   * T (shorthand quadratic bezier) segment.
   *
   * @param {number} x1 curve start x
   * @param {number} y1 curve start y
   * @param {number} qx control point x
   * @param {number} qy control point y
   * @param {string} prevCommand the previous path command
   * @returns {{qx: number, qy: number}}} the missing control point
   */
  function shorthandToQuad(x1, y1, qx, qy, prevCommand) {
    return 'QT'.includes(prevCommand)
      ? { qx: x1 * 2 - qx, qy: y1 * 2 - qy }
      : { qx: x1, qy: y1 };
  }

  /**
   * Returns the missing control point from an
   * S (shorthand cubic bezier) segment.
   *
   * @param {number} x1 curve start x
   * @param {number} y1 curve start y
   * @param {number} x2 curve end x
   * @param {number} y2 curve end y
   * @param {string} prevCommand the previous path command
   * @returns {{x1: number, y1: number}}} the missing control point
   */
  function shorthandToCubic(x1, y1, x2, y2, prevCommand) {
    return 'CS'.includes(prevCommand)
      ? { x1: x1 * 2 - x2, y1: y1 * 2 - y2 }
      : { x1: x1, y1: y1 };
  }

  /**
   * Normalizes a single segment of a `pathArray` object.
   *
   * @param {SVGPathCommander.pathSegment} segment the segment object
   * @param {any} params the coordinates of the previous segment
   * @param {string} prevCommand the path command of the previous segment
   * @returns {SVGPathCommander.normalSegment} the normalized segment
   */
  function normalizeSegment(segment, params, prevCommand) {
    var pathCommand = segment[0];
    var px1 = params.x1;
    var py1 = params.y1;
    var px2 = params.x2;
    var py2 = params.y2;
    var values = segment.slice(1).map(Number);
    var result = segment;

    if (!'TQ'.includes(pathCommand)) {
      // optional but good to be cautious
      params.qx = null;
      params.qy = null;
    }

    if (pathCommand === 'H') {
      result = ['L', segment[1], py1];
    } else if (pathCommand === 'V') {
      result = ['L', px1, segment[1]];
    } else if (pathCommand === 'S') {
      var ref = shorthandToCubic(px1, py1, px2, py2, prevCommand);
      var x1 = ref.x1;
      var y1 = ref.y1;
      params.x1 = x1;
      params.y1 = y1;
      // @ts-ignore
      result = ['C', x1, y1 ].concat( values);
    } else if (pathCommand === 'T') {
      var ref$1 = shorthandToQuad(px1, py1, params.qx, params.qy, prevCommand);
      var qx = ref$1.qx;
      var qy = ref$1.qy;
      params.qx = qx;
      params.qy = qy;
      // @ts-ignore
      result = ['Q', qx, qy ].concat( values);
    } else if (pathCommand === 'Q') {
      var nqx = values[0];
      var nqy = values[1];
      params.qx = nqx;
      params.qy = nqy;
    }

    // @ts-ignore -- we-re switching `pathSegment` type
    return result;
  }

  /**
   * Iterates an array to check if it's a `pathArray`
   * with all segments are in non-shorthand notation
   * with absolute values.
   *
   * @param {string | SVGPathCommander.pathArray} path the `pathArray` to be checked
   * @returns {boolean} iteration result
   */
  function isNormalizedArray(path) {
    // @ts-ignore -- `isAbsoluteArray` also checks if it's `Array`
    return isAbsoluteArray(path) && path.every(function (seg) { return 'ACLMQZ'.includes(seg[0]); });
  }

  /**
   * @type {SVGPathCommander.parserParams}
   */
  var paramsParser = {
    x1: 0, y1: 0, x2: 0, y2: 0, x: 0, y: 0, qx: null, qy: null,
  };

  /**
   * Normalizes a `path` object for further processing:
   * * convert segments to absolute values
   * * convert shorthand path commands to their non-shorthand notation
   *
   * @param {string | SVGPathCommander.pathArray} pathInput the string to be parsed or 'pathArray'
   * @returns {SVGPathCommander.normalArray} the normalized `pathArray`
   */
  function normalizePath(pathInput) {
    var assign;

    if (isNormalizedArray(pathInput)) {
      // @ts-ignore -- `isNormalizedArray` checks if it's `pathArray`
      return clonePath(pathInput);
    }

    /** @type {SVGPathCommander.normalArray} */
    // @ts-ignore -- `absoluteArray` will become a `normalArray`
    var path = pathToAbsolute(pathInput);
    var params = Object.assign({}, paramsParser);
    var allPathCommands = [];
    var ii = path.length;
    var pathCommand = '';
    var prevCommand = '';

    for (var i = 0; i < ii; i += 1) {
      (assign = path[i], pathCommand = assign[0]);

      // Save current path command
      allPathCommands[i] = pathCommand;
      // Get previous path command
      if (i) { prevCommand = allPathCommands[i - 1]; }
      // Previous path command is used to normalizeSegment
      // @ts-ignore -- expected on normalization
      path[i] = normalizeSegment(path[i], params, prevCommand);

      var segment = path[i];
      var seglen = segment.length;

      params.x1 = +segment[seglen - 2];
      params.y1 = +segment[seglen - 1];
      params.x2 = +(segment[seglen - 4]) || params.x1;
      params.y2 = +(segment[seglen - 3]) || params.y1;
    }

    return path;
  }

  /**
   * Checks a `pathArray` for an unnecessary `Z` segment
   * and returns a new `pathArray` without it.
   *
   * The `pathInput` must be a single path, without
   * sub-paths. For multi-path `<path>` elements,
   * use `splitPath` first and apply this utility on each
   * sub-path separately.
   *
   * @param {SVGPathCommander.pathArray | string} pathInput the `pathArray` source
   * @return {SVGPathCommander.pathArray} a fixed `pathArray`
   */
  function fixPath(pathInput) {
    var pathArray = parsePathString(pathInput);
    var normalArray = normalizePath(pathArray);
    var length = pathArray.length;
    var isClosed = normalArray.slice(-1)[0][0] === 'Z';
    var segBeforeZ = isClosed ? length - 2 : length - 1;

    var ref = normalArray[0].slice(1);
    var mx = ref[0];
    var my = ref[1];
    var ref$1 = normalArray[segBeforeZ].slice(-2);
    var x = ref$1[0];
    var y = ref$1[1];

    if (isClosed && mx === x && my === y) {
      // @ts-ignore -- `pathSegment[]` is quite a `pathArray`
      return pathArray.slice(0, -1);
    }
    return pathArray;
  }

  /**
   * Iterates an array to check if it's a `pathArray`
   * with all C (cubic bezier) segments.
   *
   * @param {string | SVGPathCommander.pathArray} path the `Array` to be checked
   * @returns {boolean} iteration result
   */
  function isCurveArray(path) {
    // @ts-ignore -- `isPathArray` also checks if it's `Array`
    return isPathArray(path) && path.every(function (seg) { return 'MC'.includes(seg[0]); });
  }

  /**
   * Returns an {x,y} vector rotated by a given
   * angle in radian.
   *
   * @param {number} x the initial vector x
   * @param {number} y the initial vector y
   * @param {number} rad the radian vector angle
   * @returns {{x: number, y: number}} the rotated vector
   */
  function rotateVector(x, y, rad) {
    var X = x * Math.cos(rad) - y * Math.sin(rad);
    var Y = x * Math.sin(rad) + y * Math.cos(rad);
    return { x: X, y: Y };
  }

  /**
   * Converts A (arc-to) segments to C (cubic-bezier-to).
   *
   * For more information of where this math came from visit:
   * http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
   *
   * @param {number} X1 the starting x position
   * @param {number} Y1 the starting y position
   * @param {number} RX x-radius of the arc
   * @param {number} RY y-radius of the arc
   * @param {number} angle x-axis-rotation of the arc
   * @param {number} LAF large-arc-flag of the arc
   * @param {number} SF sweep-flag of the arc
   * @param {number} X2 the ending x position
   * @param {number} Y2 the ending y position
   * @param {number[]=} recursive the parameters needed to split arc into 2 segments
   * @return {number[]} the resulting cubic-bezier segment(s)
   */
  function arcToCubic(X1, Y1, RX, RY, angle, LAF, SF, X2, Y2, recursive) {
    var assign;

    var x1 = X1; var y1 = Y1; var rx = RX; var ry = RY; var x2 = X2; var y2 = Y2;
    // for more information of where this Math came from visit:
    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    var d120 = (Math.PI * 120) / 180;

    var rad = (Math.PI / 180) * (+angle || 0);
    /** @type {number[]} */
    var res = [];
    var xy;
    var f1;
    var f2;
    var cx;
    var cy;

    if (!recursive) {
      xy = rotateVector(x1, y1, -rad);
      x1 = xy.x;
      y1 = xy.y;
      xy = rotateVector(x2, y2, -rad);
      x2 = xy.x;
      y2 = xy.y;

      var x = (x1 - x2) / 2;
      var y = (y1 - y2) / 2;
      var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
      if (h > 1) {
        h = Math.sqrt(h);
        rx *= h;
        ry *= h;
      }
      var rx2 = rx * rx;
      var ry2 = ry * ry;

      var k = (LAF === SF ? -1 : 1)
              * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x)
                  / (rx2 * y * y + ry2 * x * x)));

      cx = ((k * rx * y) / ry) + ((x1 + x2) / 2);
      cy = ((k * -ry * x) / rx) + ((y1 + y2) / 2);
      // eslint-disable-next-line no-bitwise -- Impossible to satisfy no-bitwise
      f1 = (Math.asin((((y1 - cy) / ry))) * (Math.pow( 10, 9 )) >> 0) / (Math.pow( 10, 9 ));
      // eslint-disable-next-line no-bitwise -- Impossible to satisfy no-bitwise
      f2 = (Math.asin((((y2 - cy) / ry))) * (Math.pow( 10, 9 )) >> 0) / (Math.pow( 10, 9 ));

      f1 = x1 < cx ? Math.PI - f1 : f1;
      f2 = x2 < cx ? Math.PI - f2 : f2;
      if (f1 < 0) { (f1 = Math.PI * 2 + f1); }
      if (f2 < 0) { (f2 = Math.PI * 2 + f2); }
      if (SF && f1 > f2) {
        f1 -= Math.PI * 2;
      }
      if (!SF && f2 > f1) {
        f2 -= Math.PI * 2;
      }
    } else {
      (assign = recursive, f1 = assign[0], f2 = assign[1], cx = assign[2], cy = assign[3]);
    }
    var df = f2 - f1;
    if (Math.abs(df) > d120) {
      var f2old = f2;
      var x2old = x2;
      var y2old = y2;
      f2 = f1 + d120 * (SF && f2 > f1 ? 1 : -1);
      x2 = cx + rx * Math.cos(f2);
      y2 = cy + ry * Math.sin(f2);
      res = arcToCubic(x2, y2, rx, ry, angle, 0, SF, x2old, y2old, [f2, f2old, cx, cy]);
    }
    df = f2 - f1;
    var c1 = Math.cos(f1);
    var s1 = Math.sin(f1);
    var c2 = Math.cos(f2);
    var s2 = Math.sin(f2);
    var t = Math.tan(df / 4);
    var hx = (4 / 3) * rx * t;
    var hy = (4 / 3) * ry * t;
    var m1 = [x1, y1];
    var m2 = [x1 + hx * s1, y1 - hy * c1];
    var m3 = [x2 + hx * s2, y2 - hy * c2];
    var m4 = [x2, y2];
    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];
    if (recursive) {
      return m2.concat( m3, m4, res);
    }
    res = m2.concat( m3, m4, res);
    var newres = [];
    for (var i = 0, ii = res.length; i < ii; i += 1) {
      newres[i] = i % 2
        ? rotateVector(res[i - 1], res[i], rad).y
        : rotateVector(res[i], res[i + 1], rad).x;
    }
    return newres;
  }

  /**
   * Converts a Q (quadratic-bezier) segment to C (cubic-bezier).
   *
   * @param {number} x1 curve start x
   * @param {number} y1 curve start y
   * @param {number} qx control point x
   * @param {number} qy control point y
   * @param {number} x2 curve end x
   * @param {number} y2 curve end y
   * @returns {number[]} the cubic-bezier segment
   */
  function quadToCubic(x1, y1, qx, qy, x2, y2) {
    var r13 = 1 / 3;
    var r23 = 2 / 3;
    return [
      r13 * x1 + r23 * qx, // cpx1
      r13 * y1 + r23 * qy, // cpy1
      r13 * x2 + r23 * qx, // cpx2
      r13 * y2 + r23 * qy, // cpy2
      x2, y2 ];
  }

  /**
   * Returns the coordinates of a specified distance
   * ratio between two points.
   *
   * @param {[number, number]} a the first point coordinates
   * @param {[number, number]} b the second point coordinates
   * @param {number} t the ratio
   * @returns {[number, number]} the midpoint coordinates
   */
  function midPoint(a, b, t) {
    var ax = a[0];
    var ay = a[1]; var bx = b[0];
    var by = b[1];
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  }

  /**
   * Returns the square root of the distance
   * between two given points.
   *
   * @param {[number, number]} a the first point coordinates
   * @param {[number, number]} b the second point coordinates
   * @returns {number} the distance value
   */
  function distanceSquareRoot(a, b) {
    return Math.sqrt(
      (a[0] - b[0]) * (a[0] - b[0])
      + (a[1] - b[1]) * (a[1] - b[1])
    );
  }

  /**
   * Returns the length of a line (L,V,H,Z) segment,
   * or a point at a given length.
   *
   * @param {number} x1 the starting point X
   * @param {number} y1 the starting point Y
   * @param {number} x2 the ending point X
   * @param {number} y2 the ending point Y
   * @param {number=} distance the distance to point
   * @returns {{x: number, y: number} | number} the segment length or point
   */
  function segmentLineFactory(x1, y1, x2, y2, distance) {
    var length = distanceSquareRoot([x1, y1], [x2, y2]);
    var margin = 0.001;

    if (typeof distance === 'number') {
      if (distance < margin) {
        return { x: x1, y: y1 };
      }
      if (distance > length + margin) {
        return { x: x2, y: y2 };
      }
      var ref = midPoint([x1, y1], [x2, y2], distance / length);
      var x = ref[0];
      var y = ref[1];
      return { x: x, y: y };
    }
    return length;
  }

  /**
   * Converts an L (line-to) segment to C (cubic-bezier).
   *
   * @param {number} x1 line start x
   * @param {number} y1 line start y
   * @param {number} x2 line end x
   * @param {number} y2 line end y
   * @returns {number[]} the cubic-bezier segment
   */
  function lineToCubic(x1, y1, x2, y2) {
    var t = 0.5;
    /** @type {[number, number]} */
    var p0 = [x1, y1];
    /** @type {[number, number]} */
    var p1 = [x2, y2];
    var p2 = midPoint(p0, p1, t);
    var p3 = midPoint(p1, p2, t);
    var p4 = midPoint(p2, p3, t);
    var p5 = midPoint(p3, p4, t);
    var p6 = midPoint(p4, p5, t);
    var seg1 = p0.concat( p2, p4, p6, [t]);
    // @ts-ignore
    var cp1 = segmentLineFactory.apply(void 0, seg1);
    var seg2 = p6.concat( p5, p3, p1, [0]);
    // @ts-ignore
    var cp2 = segmentLineFactory.apply(void 0, seg2);

    // @ts-ignore
    return [cp1.x, cp1.y, cp2.x, cp2.y, x2, y2];
  }

  /**
   * Converts any segment to C (cubic-bezier).
   *
   * @param {SVGPathCommander.pathSegment} segment the source segment
   * @param {SVGPathCommander.parserParams} params the source segment parameters
   * @returns {SVGPathCommander.cubicSegment | SVGPathCommander.MSegment} the cubic-bezier segment
   */
  function segmentToCubic(segment, params) {
    var pathCommand = segment[0];
    var values = segment.slice(1).map(function (n) { return +n; });
    var x = values[0];
    var y = values[1];
    var args;
    var px1 = params.x1;
    var py1 = params.y1;
    var px = params.x;
    var py = params.y;

    if (!'TQ'.includes(pathCommand)) {
      params.qx = null;
      params.qy = null;
    }

    switch (pathCommand) {
      case 'M':
        params.x = x;
        params.y = y;
        return segment;
      case 'A':
        args = [px1, py1 ].concat( values);
        // @ts-ignore -- relax, the utility will return 6 numbers
        return ['C' ].concat( arcToCubic.apply(void 0, args));
      case 'Q':
        params.qx = x;
        params.qy = y;
        args = [px1, py1 ].concat( values);
        // @ts-ignore -- also returning 6 numbers
        return ['C' ].concat( quadToCubic.apply(void 0, args));
      case 'L':
        // @ts-ignore -- also returning 6 numbers
        return ['C' ].concat( lineToCubic(px1, py1, x, y));
      case 'Z':
        // @ts-ignore -- also returning 6 numbers
        return ['C' ].concat( lineToCubic(px1, py1, px, py));
    }
    // @ts-ignore -- we're switching `pathSegment` type
    return segment;
  }

  /**
   * Parses a path string value or 'pathArray' and returns a new one
   * in which all segments are converted to cubic-bezier.
   *
   * In addition, un-necessary `Z` segment is removed if previous segment
   * extends to the `M` segment.
   *
   * @param {string | SVGPathCommander.pathArray} pathInput the string to be parsed or 'pathArray'
   * @returns {SVGPathCommander.curveArray} the resulted `pathArray` converted to cubic-bezier
   */
  function pathToCurve(pathInput) {
    var assign;

    if (isCurveArray(pathInput)) {
      // @ts-ignore -- `isCurveArray` checks if it's `pathArray`
      return clonePath(pathInput);
    }

    var path = fixPath(normalizePath(pathInput));
    var params = Object.assign({}, paramsParser);
    var allPathCommands = [];
    var pathCommand = ''; // ts-lint
    var ii = path.length;

    for (var i = 0; i < ii; i += 1) {
      (assign = path[i], pathCommand = assign[0]);
      allPathCommands[i] = pathCommand;

      path[i] = segmentToCubic(path[i], params);

      fixArc(path, allPathCommands, i);
      ii = path.length;

      var segment = path[i];
      var seglen = segment.length;
      params.x1 = +segment[seglen - 2];
      params.y1 = +segment[seglen - 1];
      params.x2 = +(segment[seglen - 4]) || params.x1;
      params.y2 = +(segment[seglen - 3]) || params.y1;
    }

    // @ts-ignore
    return path;
  }

  /**
   * SVGPathCommander default options
   * @type {SVGPathCommander.options}
   */
  var defaultOptions = {
    origin: [0, 0, 0],
    round: 4,
  };

  /**
   * Rounds the values of a `pathArray` instance to
   * a specified amount of decimals and returns it.
   *
   * @param {SVGPathCommander.pathArray} path the source `pathArray`
   * @param {number | boolean} roundOption the amount of decimals to round numbers to
   * @returns {SVGPathCommander.pathArray} the resulted `pathArray` with rounded values
   */
  function roundPath(path, roundOption) {
    var round = defaultOptions.round;
    if (roundOption === false || round === false) { return clonePath(path); }
    round = roundOption >= 1 ? roundOption : round;
    // to round values to the power
    // the `round` value must be integer
    // @ts-ignore
    var pow = round >= 1 ? (Math.pow( 10, round )) : 1;

    // @ts-ignore -- `pathSegment[]` is `pathArray`
    return path.map(function (pi) {
      var values = pi.slice(1).map(Number)
        .map(function (n) { return (n % 1 === 0 ? n : Math.round(n * pow) / pow); });
      return [pi[0] ].concat( values);
    });
  }

  /**
   * Returns a valid `d` attribute string value created
   * by rounding values and concatenating the `pathArray` segments.
   *
   * @param {SVGPathCommander.pathArray} path the `pathArray` object
   * @param {any} round amount of decimals to round values to
   * @returns {string} the concatenated path string
   */
  function pathToString(path, round) {
    return roundPath(path, round)
      .map(function (x) { return x[0] + x.slice(1).join(' '); }).join('');
  }

  /**
   * Split a path into an `Array` of sub-path strings.
   *
   * In the process, values are converted to absolute
   * for visual consistency.
   *
   * @param {SVGPathCommander.pathArray | string} pathInput the source `pathArray`
   * @return {string[]} an array with all sub-path strings
   */
  function splitPath(pathInput) {
    return pathToString(pathToAbsolute(pathInput), 0)
      .replace(/(m|M)/g, '|$1')
      .split('|')
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s; });
  }

  /**
   * Returns a point at a given length of a C (cubic-bezier) segment.
   *
   * @param {number} x1 the starting point X
   * @param {number} y1 the starting point Y
   * @param {number} c1x the first control point X
   * @param {number} c1y the first control point Y
   * @param {number} c2x the second control point X
   * @param {number} c2y the second control point Y
   * @param {number} x2 the ending point X
   * @param {number} y2 the ending point Y
   * @param {number} t a [0-1] ratio
   * @returns {{x: number, y: number}} the cubic-bezier segment length
   */
  function getPointAtCubicSegmentLength(x1, y1, c1x, c1y, c2x, c2y, x2, y2, t) {
    var t1 = 1 - t;
    return {
      x: (Math.pow( t1, 3 )) * x1
        + 3 * (Math.pow( t1, 2 )) * t * c1x
        + 3 * t1 * (Math.pow( t, 2 )) * c2x
        + (Math.pow( t, 3 )) * x2,
      y: (Math.pow( t1, 3 )) * y1
        + 3 * (Math.pow( t1, 2 )) * t * c1y
        + 3 * t1 * (Math.pow( t, 2 )) * c2y
        + (Math.pow( t, 3 )) * y2,
    };
  }

  /**
   * Returns the length of a C (cubic-bezier) segment,
   * or an {x,y} point at a given length.
   *
   * @param {number} x1 the starting point X
   * @param {number} y1 the starting point Y
   * @param {number} c1x the first control point X
   * @param {number} c1y the first control point Y
   * @param {number} c2x the second control point X
   * @param {number} c2y the second control point Y
   * @param {number} x2 the ending point X
   * @param {number} y2 the ending point Y
   * @param {number=} distance the point distance
   * @returns {{x: number, y: number} | number} the segment length or point
   */
  function segmentCubicFactory(x1, y1, c1x, c1y, c2x, c2y, x2, y2, distance) {
    var assign;

    var x = x1; var y = y1;
    var lengthMargin = 0.001;
    var totalLength = 0;
    var prev = [x1, y1, totalLength];
    /** @type {[number, number]} */
    var cur = [x1, y1];
    var t = 0;

    if (typeof distance === 'number' && distance < lengthMargin) {
      return { x: x, y: y };
    }

    var n = 100;
    for (var j = 0; j <= n; j += 1) {
      t = j / n;

      ((assign = getPointAtCubicSegmentLength(x1, y1, c1x, c1y, c2x, c2y, x2, y2, t), x = assign.x, y = assign.y));
      totalLength += distanceSquareRoot(cur, [x, y]);
      cur = [x, y];

      if (typeof distance === 'number' && totalLength >= distance) {
        var dv = (totalLength - distance) / (totalLength - prev[2]);

        return {
          x: cur[0] * (1 - dv) + prev[0] * dv,
          y: cur[1] * (1 - dv) + prev[1] * dv,
        };
      }
      prev = [x, y, totalLength];
    }

    if (typeof distance === 'number' && distance >= totalLength) {
      return { x: x2, y: y2 };
    }
    return totalLength;
  }

  /**
   * Returns the length of a A (arc-to) segment,
   * or an {x,y} point at a given length.
   *
   * @param {number} X1 the starting x position
   * @param {number} Y1 the starting y position
   * @param {number} RX x-radius of the arc
   * @param {number} RY y-radius of the arc
   * @param {number} angle x-axis-rotation of the arc
   * @param {number} LAF large-arc-flag of the arc
   * @param {number} SF sweep-flag of the arc
   * @param {number} X2 the ending x position
   * @param {number} Y2 the ending y position
   * @param {number} distance the point distance
   * @returns {{x: number, y: number} | number} the segment length or point
   */
  function segmentArcFactory(X1, Y1, RX, RY, angle, LAF, SF, X2, Y2, distance) {
    var assign;

    var ref = [X1, Y1];
    var x = ref[0];
    var y = ref[1];
    var cubicSeg = arcToCubic(X1, Y1, RX, RY, angle, LAF, SF, X2, Y2);
    var lengthMargin = 0.001;
    var totalLength = 0;
    var cubicSubseg = [];
    var argsc = [];
    var segLen = 0;

    if (typeof distance === 'number' && distance < lengthMargin) {
      return { x: x, y: y };
    }

    for (var i = 0, ii = cubicSeg.length; i < ii; i += 6) {
      cubicSubseg = cubicSeg.slice(i, i + 6);
      argsc = [x, y ].concat( cubicSubseg);
      // @ts-ignore
      segLen = segmentCubicFactory.apply(void 0, argsc);
      if (typeof distance === 'number' && totalLength + segLen >= distance) {
        // @ts-ignore -- this is a `cubicSegment`
        return segmentCubicFactory.apply(void 0, argsc.concat( [distance - totalLength] ));
      }
      totalLength += segLen;
      (assign = cubicSubseg.slice(-2), x = assign[0], y = assign[1]);
    }

    if (typeof distance === 'number' && distance >= totalLength) {
      return { x: X2, y: Y2 };
    }

    return totalLength;
  }

  /**
   * Returns the {x,y} coordinates of a point at a
   * given length of a quad-bezier segment.
   *
   * @see https://github.com/substack/point-at-length
   *
   * @param {number} x1 the starting point X
   * @param {number} y1 the starting point Y
   * @param {number} cx the control point X
   * @param {number} cy the control point Y
   * @param {number} x2 the ending point X
   * @param {number} y2 the ending point Y
   * @param {number} t a [0-1] ratio
   * @returns {{x: number, y: number}} the requested {x,y} coordinates
   */
  function getPointAtQuadSegmentLength(x1, y1, cx, cy, x2, y2, t) {
    var t1 = 1 - t;
    return {
      x: (Math.pow( t1, 2 )) * x1
        + 2 * t1 * t * cx
        + (Math.pow( t, 2 )) * x2,
      y: (Math.pow( t1, 2 )) * y1
        + 2 * t1 * t * cy
        + (Math.pow( t, 2 )) * y2,
    };
  }

  /**
   * Returns the Q (quadratic-bezier) segment length,
   * or an {x,y} point at a given length.
   *
   * @param {number} x1 the starting point X
   * @param {number} y1 the starting point Y
   * @param {number} qx the control point X
   * @param {number} qy the control point Y
   * @param {number} x2 the ending point X
   * @param {number} y2 the ending point Y
   * @param {number=} distance the distance to point
   * @returns {{x: number, y: number} | number} the segment length or point
   */
  function segmentQuadFactory(x1, y1, qx, qy, x2, y2, distance) {
    var assign;

    var x = x1; var y = y1;
    var lengthMargin = 0.001;
    var totalLength = 0;
    var prev = [x1, y1, totalLength];
    /** @type {[number, number]} */
    var cur = [x1, y1];
    var t = 0;

    if (typeof distance === 'number' && distance < lengthMargin) {
      return { x: x, y: y };
    }

    var n = 100;
    for (var j = 0; j <= n; j += 1) {
      t = j / n;

      ((assign = getPointAtQuadSegmentLength(x1, y1, qx, qy, x2, y2, t), x = assign.x, y = assign.y));
      totalLength += distanceSquareRoot(cur, [x, y]);
      cur = [x, y];

      if (typeof distance === 'number' && totalLength >= distance) {
        var dv = (totalLength - distance) / (totalLength - prev[2]);

        return {
          x: cur[0] * (1 - dv) + prev[0] * dv,
          y: cur[1] * (1 - dv) + prev[1] * dv,
        };
      }
      prev = [x, y, totalLength];
    }
    if (typeof distance === 'number' && distance >= totalLength) {
      return { x: x2, y: y2 };
    }
    return totalLength;
  }

  /**
   * Returns a {x,y} point at a given length of a shape or the shape total length.
   *
   * @param {string | SVGPathCommander.pathArray} pathInput the `pathArray` to look into
   * @param {number=} distance the length of the shape to look at
   * @returns {{x: number, y: number} | number} the total length or point
   */
  function pathLengthFactory(pathInput, distance) {
    var assign, assign$1, assign$2;

    var totalLength = 0;
    var isM = true;
    /** @type {number[]} */
    var data = [];
    var pathCommand = 'M';
    var segLen = 0;
    var x = 0;
    var y = 0;
    var mx = 0;
    var my = 0;
    var seg;
    var path = fixPath(normalizePath(pathInput));

    for (var i = 0, ll = path.length; i < ll; i += 1) {
      seg = path[i];
      (assign = seg, pathCommand = assign[0]);
      isM = pathCommand === 'M';
      // @ts-ignore
      data = !isM ? [x, y ].concat( seg.slice(1)) : data;

      // this segment is always ZERO
      if (isM) {
        // remember mx, my for Z
        // @ts-ignore
        (assign$1 = seg, mx = assign$1[1], my = assign$1[2]);
        if (typeof distance === 'number' && distance < 0.001) {
          return { x: mx, y: my };
        }
      } else if (pathCommand === 'L') {
        // @ts-ignore
        segLen = segmentLineFactory.apply(void 0, data);
        if (distance && totalLength + segLen >= distance) {
          // @ts-ignore
          return segmentLineFactory.apply(void 0, data.concat( [distance - totalLength] ));
        }
        totalLength += segLen;
      } else if (pathCommand === 'A') {
        // @ts-ignore
        segLen = segmentArcFactory.apply(void 0, data);
        if (distance && totalLength + segLen >= distance) {
          // @ts-ignore
          return segmentArcFactory.apply(void 0, data.concat( [distance - totalLength] ));
        }
        totalLength += segLen;
      } else if (pathCommand === 'C') {
        // @ts-ignore
        segLen = segmentCubicFactory.apply(void 0, data);
        if (distance && totalLength + segLen >= distance) {
          // @ts-ignore
          return segmentCubicFactory.apply(void 0, data.concat( [distance - totalLength] ));
        }
        totalLength += segLen;
      } else if (pathCommand === 'Q') {
        // @ts-ignore
        segLen = segmentQuadFactory.apply(void 0, data);
        if (distance && totalLength + segLen >= distance) {
          // @ts-ignore
          return segmentQuadFactory.apply(void 0, data.concat( [distance - totalLength] ));
        }
        totalLength += segLen;
      } else if (pathCommand === 'Z') {
        data = [x, y, mx, my];
        // @ts-ignore
        segLen = segmentLineFactory.apply(void 0, data);
        if (distance && totalLength + segLen >= distance) {
          // @ts-ignore
          return segmentLineFactory.apply(void 0, data.concat( [distance - totalLength] ));
        }
        totalLength += segLen;
      }

      // @ts-ignore -- needed for the below
      (assign$2 = pathCommand !== 'Z' ? seg.slice(-2) : [mx, my], x = assign$2[0], y = assign$2[1]);
    }

    // native `getPointAtLength` behavior when the given distance
    // is higher than total length
    if (distance && distance >= totalLength) {
      return { x: x, y: y };
    }

    return totalLength;
  }

  /**
   * Returns the shape total length, or the equivalent to `shape.getTotalLength()`.
   *
   * The `normalizePath` version is lighter, faster, more efficient and more accurate
   * with paths that are not `curveArray`.
   *
   * @param {string | SVGPathCommander.pathArray} pathInput the target `pathArray`
   * @returns {number} the shape total length
   */
  function getTotalLength(pathInput) {
    // @ts-ignore - it's fine
    return pathLengthFactory(pathInput);
  }

  /**
   * Returns [x,y] coordinates of a point at a given length of a shape.
   *
   * @param {string | SVGPathCommander.pathArray} pathInput the `pathArray` to look into
   * @param {number} distance the length of the shape to look at
   * @returns {{x: number, y: number}} the requested {x, y} point coordinates
   */
  function getPointAtLength(pathInput, distance) {
    // @ts-ignore
    return pathLengthFactory(pathInput, distance);
  }

  /**
   * d3-polygon-area
   * https://github.com/d3/d3-polygon
   *
   * Returns the area of a polygon.
   *
   * @param {number[][]} polygon an array of coordinates
   * @returns {number} the polygon area
   */
  function polygonArea(polygon) {
    var n = polygon.length;
    var i = -1;
    var a;
    var b = polygon[n - 1];
    var area = 0;

    /* eslint-disable-next-line */
    while (++i < n) {
      a = b;
      b = polygon[i];
      area += a[1] * b[0] - a[0] * b[1];
    }

    return area / 2;
  }

  /**
   * d3-polygon-length
   * https://github.com/d3/d3-polygon
   *
   * Returns the perimeter of a polygon.
   *
   * @param {number[][]} polygon an array of coordinates
   * @returns {number} the polygon length
   */
  function polygonLength(polygon) {
    return polygon.reduce(function (length, point, i) {
      if (i) {
        // @ts-ignore
        return length + distanceSquareRoot(polygon[i - 1], point);
      }
      return 0;
    }, 0);
  }

  /**
   * A global namespace for epsilon.
   *
   * @type {number}
   */
  var epsilon = 1e-9;

  /**
   * Coordinates Interpolation Function.
   *
   * @param {number[][]} a start coordinates
   * @param {number[][]} b end coordinates
   * @param {string} l amount of coordinates
   * @param {number} v progress
   * @returns {number[][]} the interpolated coordinates
   */
  function coords(a, b, l, v) {
    var points = [];
    for (var i = 0; i < l; i += 1) { // for each point
      points[i] = [];
      for (var j = 0; j < 2; j += 1) { // each point coordinate
        // eslint-disable-next-line no-bitwise
        points[i].push(((a[i][j] + (b[i][j] - a[i][j]) * v) * 1000 >> 0) / 1000);
      }
    }
    return points;
  }

  /* SVGMorph = {
    property: 'path',
    defaultValue: [],
    interpolators: {numbers,coords} },
    functions = { prepareStart, prepareProperty, onStart, crossCheck }
  } */

  // Component functions
  /**
   * Sets the property update function.
   * @param {string} tweenProp the property name
   */
  function onStartSVGMorph(tweenProp) {
    if (!KEC[tweenProp] && this.valuesEnd[tweenProp]) {
      KEC[tweenProp] = function (elem, a, b, v) {
        var path1 = a.polygon; var path2 = b.polygon;
        var len = path2.length;
        elem.setAttribute('d', (v === 1 ? b.original : ("M" + (coords(path1, path2, len, v).join('L')) + "Z")));
      };
    }
  }

  // Component Util
  // original script flubber
  // https://github.com/veltman/flubber

  /**
   * Returns an existing polygin and its length or false if not polygon.
   * @param {SVGPathCommander.pathArray} pathArray target polygon
   * @returns {KUTE.exactPolygon} length
   */
  function exactPolygon(pathArray) {
    var assign;

    var polygon = [];
    var pathlen = pathArray.length;
    var segment = [];
    var pathCommand = '';

    if (!pathArray.length || pathArray[0][0] !== 'M') {
      return false;
    }

    for (var i = 0; i < pathlen; i += 1) {
      segment = pathArray[i];
      (assign = segment, pathCommand = assign[0]);

      if ((pathCommand === 'M' && i) || pathCommand === 'Z') {
        break; // !!
      } else if ('ML'.includes(pathCommand)) {
        polygon.push([segment[1], segment[2]]);
      } else {
        return false;
      }
    }

    return pathlen ? { polygon: polygon } : false;
  }

  /**
   * Returns polygon length.
   * @param {SVGPathCommander.pathArray} parsed target polygon
   * @param {number} maxLength the maximum segment length
   * @returns {KUTE.exactPolygon} length
   */
  function approximatePolygon(parsed, maxLength) {
    var ringPath = splitPath(pathToString(parsed))[0];
    var normalPath = normalizePath(ringPath);
    var pathLength = getTotalLength(normalPath);
    var polygon = [];
    var numPoints = 3;
    var point;

    if (maxLength && !Number.isNaN(maxLength) && +maxLength > 0) {
      numPoints = Math.max(numPoints, Math.ceil(pathLength / maxLength));
    }

    for (var i = 0; i < numPoints; i += 1) {
      point = getPointAtLength(normalPath, (pathLength * i) / numPoints);
      polygon.push([point.x, point.y]);
    }

    // Make all rings clockwise
    if (polygonArea(polygon) > 0) {
      polygon.reverse();
    }

    return {
      polygon: polygon,
      skipBisect: true,
    };
  }

  /**
   * Parses a path string and returns a polygon array.
   * @param {string} str path string
   * @param {number} maxLength maximum amount of points
   * @returns {KUTE.exactPolygon} the polygon array we need
   */
  function pathStringToPolygon(str, maxLength) {
    var parsed = normalizePath(str);
    return exactPolygon(parsed) || approximatePolygon(parsed, maxLength);
  }

  /**
   * Rotates a polygon to better match its pair.
   * @param {KUTE.polygonMorph} polygon the target polygon
   * @param {KUTE.polygonMorph} vs the reference polygon
   */
  function rotatePolygon(polygon, vs) {
    var len = polygon.length;
    var min = Infinity;
    var bestOffset;
    var sumOfSquares = 0;
    var spliced;
    var d;
    var p;

    for (var offset = 0; offset < len; offset += 1) {
      sumOfSquares = 0;

      for (var i = 0; i < vs.length; i += 1) {
        p = vs[i];
        d = distanceSquareRoot(polygon[(offset + i) % len], p);
        sumOfSquares += d * d;
      }

      if (sumOfSquares < min) {
        min = sumOfSquares;
        bestOffset = offset;
      }
    }

    if (bestOffset) {
      spliced = polygon.splice(0, bestOffset);
      polygon.splice.apply(polygon, [ polygon.length, 0 ].concat( spliced ));
    }
  }

  /**
   * Sample additional points for a polygon to better match its pair.
   * @param {KUTE.polygonObject} polygon the target polygon
   * @param {number} numPoints the amount of points needed
   */
  function addPoints(polygon, numPoints) {
    var desiredLength = polygon.length + numPoints;
    var step = polygonLength(polygon) / numPoints;

    var i = 0;
    var cursor = 0;
    var insertAt = step / 2;
    var a;
    var b;
    var segment;

    while (polygon.length < desiredLength) {
      a = polygon[i];
      b = polygon[(i + 1) % polygon.length];

      segment = distanceSquareRoot(a, b);

      if (insertAt <= cursor + segment) {
        polygon.splice(i + 1, 0, segment
          ? midPoint(a, b, (insertAt - cursor) / segment)
          : a.slice(0));
        insertAt += step;
      } else {
        cursor += segment;
        i += 1;
      }
    }
  }

  /**
   * Split segments of a polygon until it reaches a certain
   * amount of points.
   * @param {number[][]} polygon the target polygon
   * @param {number} maxSegmentLength the maximum amount of points
   */
  function bisect(polygon, maxSegmentLength) {
    if ( maxSegmentLength === void 0 ) maxSegmentLength = Infinity;

    var a = [];
    var b = [];

    for (var i = 0; i < polygon.length; i += 1) {
      a = polygon[i];
      b = i === polygon.length - 1 ? polygon[0] : polygon[i + 1];

      // Could splice the whole set for a segment instead, but a bit messy
      while (distanceSquareRoot(a, b) > maxSegmentLength) {
        b = midPoint(a, b, 0.5);
        polygon.splice(i + 1, 0, b);
      }
    }
  }

  /**
   * Checks the validity of a polygon.
   * @param {KUTE.polygonMorph} polygon the target polygon
   * @returns {boolean} the result of the check
   */
  function validPolygon(polygon) {
    return Array.isArray(polygon)
      && polygon.every(function (point) { return Array.isArray(point)
        && point.length === 2
        && !Number.isNaN(point[0])
        && !Number.isNaN(point[1]); });
  }

  /**
   * Returns a new polygon and its length from string or another `Array`.
   * @param {KUTE.polygonMorph | string} input the target polygon
   * @param {number} maxSegmentLength the maximum amount of points
   * @returns {KUTE.polygonMorph} normalized polygon
   */
  function getPolygon(input, maxSegmentLength) {
    var assign;

    var skipBisect;
    var polygon;

    if (typeof (input) === 'string') {
      var converted = pathStringToPolygon(input, maxSegmentLength);
      ((assign = converted, polygon = assign.polygon, skipBisect = assign.skipBisect));
    } else if (!Array.isArray(input)) {
      throw Error((invalidPathValue + ": " + input));
    }

    /** @type {KUTE.polygonMorph} */
    var points = [].concat( polygon );

    if (!validPolygon(points)) {
      throw Error((invalidPathValue + ": " + points));
    }

    // TODO skip this test to avoid scale issues?
    // Chosen epsilon (1e-6) is problematic for small coordinate range, we now use 1e-9
    if (points.length > 1 && distanceSquareRoot(points[0], points[points.length - 1]) < epsilon) {
      points.pop();
    }

    if (!skipBisect && maxSegmentLength
      && !Number.isNaN(maxSegmentLength) && (+maxSegmentLength) > 0) {
      bisect(points, maxSegmentLength);
    }

    return points;
  }

  /**
   * Returns two new polygons ready to tween.
   * @param {string} path1 the first path string
   * @param {string} path2 the second path string
   * @param {number} precision the morphPrecision option value
   * @returns {KUTE.polygonMorph[]} the two polygons
   */
  function getInterpolationPoints(path1, path2, precision) {
    var morphPrecision = precision || defaultOptions$1.morphPrecision;
    var fromRing = getPolygon(path1, morphPrecision);
    var toRing = getPolygon(path2, morphPrecision);
    var diff = fromRing.length - toRing.length;

    addPoints(fromRing, diff < 0 ? diff * -1 : 0);
    addPoints(toRing, diff > 0 ? diff : 0);

    rotatePolygon(fromRing, toRing);

    return [roundPath(fromRing), roundPath(toRing)];
  }

  // Component functions
  /**
   * Returns the current `d` attribute value.
   * @returns {string} the `d` attribute value
   */
  function getSVGMorph(/* tweenProp */) {
    return this.element.getAttribute('d');
  }

  /**
   * Returns the property tween object.
   * @param {string} _ the property name
   * @param {string | KUTE.polygonObject} value the property value
   * @returns {KUTE.polygonObject} the property tween object
   */
  function prepareSVGMorph(/* tweenProp */_, value) {
    var pathObject = {};
    // remove newlines, they brake JSON strings sometimes
    var pathReg = new RegExp('\\n', 'ig');
    var elem = null;

    if (value instanceof SVGPathElement) {
      elem = value;
    } else if (/^\.|^#/.test(value)) {
      elem = selector(value);
    }

    // first make sure we return pre-processed values
    if (typeof (value) === 'object' && value.polygon) {
      return value;
    } if (elem && ['path', 'glyph'].includes(elem.tagName)) {
      pathObject.original = elem.getAttribute('d').replace(pathReg, '');
    // maybe it's a string path already
    } else if (!elem && typeof (value) === 'string') {
      pathObject.original = value.replace(pathReg, '');
    }

    return pathObject;
  }

  /**
   * Enables the `to()` method by preparing the tween object in advance.
   * @param {string} prop the `path` property name
   */
  function crossCheckSVGMorph(prop) {
    if (this.valuesEnd[prop]) {
      var pathArray1 = this.valuesStart[prop].polygon;
      var pathArray2 = this.valuesEnd[prop].polygon;
      // skip already processed paths
      // allow the component to work with pre-processed values
      if (!pathArray1 || !pathArray2
        || (pathArray1 && pathArray2 && pathArray1.length !== pathArray2.length)) {
        var p1 = this.valuesStart[prop].original;
        var p2 = this.valuesEnd[prop].original;
        // process morphPrecision
        var morphPrecision = this._morphPrecision
          ? parseInt(this._morphPrecision, 10)
          : defaultOptions$1.morphPrecision;

        var ref = getInterpolationPoints(p1, p2, morphPrecision);
        var path1 = ref[0];
        var path2 = ref[1];
        this.valuesStart[prop].polygon = path1;
        this.valuesEnd[prop].polygon = path2;
      }
    }
  }

  // All Component Functions
  var svgMorphFunctions = {
    prepareStart: getSVGMorph,
    prepareProperty: prepareSVGMorph,
    onStart: onStartSVGMorph,
    crossCheck: crossCheckSVGMorph,
  };

  // Component Full
  var SVGMorph = {
    component: 'svgMorph',
    property: 'path',
    defaultValue: [],
    Interpolate: coords,
    defaultOptions: { morphPrecision: 10 },
    functions: svgMorphFunctions,
    // Export utils to global for faster execution
    Util: {
      // component
      addPoints: addPoints,
      bisect: bisect,
      getPolygon: getPolygon,
      validPolygon: validPolygon,
      getInterpolationPoints: getInterpolationPoints,
      pathStringToPolygon: pathStringToPolygon,
      distanceSquareRoot: distanceSquareRoot,
      midPoint: midPoint,
      approximatePolygon: approximatePolygon,
      rotatePolygon: rotatePolygon,
      // svg-path-commander
      pathToString: pathToString,
      pathToCurve: pathToCurve,
      getTotalLength: getTotalLength,
      getPointAtLength: getPointAtLength,
      polygonArea: polygonArea,
      roundPath: roundPath,
    },
  };

  var Components = {
    EssentialBoxModel: BoxModelEssential,
    ColorsProperties: colorProperties,
    HTMLAttributes: htmlAttributes,
    OpacityProperty: OpacityProperty,
    TextWriteProp: TextWrite,
    TransformFunctions: TransformFunctions,
    SVGDraw: SvgDrawProperty,
    SVGMorph: SVGMorph,
  };

  // init components
  Object.keys(Components).forEach(function (component) {
    var compOps = Components[component];
    Components[component] = new Animation(compOps);
  });

  var version = "2.2.2";

  // @ts-ignore

  /**
   * A global namespace for library version.
   * @type {string}
   */
  var Version = version;

  // KUTE.js standard distribution version

  var KUTE = {
    Animation: Animation,
    Components: Components,

    // Tween Interface
    Tween: Tween,
    fromTo: fromTo,
    to: to,
    // Tween Collection
    TweenCollection: TweenCollection,
    allFromTo: allFromTo,
    allTo: allTo,
    // Tween Interface

    Objects: Objects,
    Util: Util,
    Easing: Easing,
    CubicBezier: CubicBezier,
    Render: Render,
    Interpolate: interpolate,
    Process: Process,
    Internals: internals,
    Selector: selector,
    Version: Version,
  };

  return KUTE;

}));
