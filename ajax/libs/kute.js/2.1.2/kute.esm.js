/*!
* KUTE.js Standard v2.1.2 (http://thednp.github.io/kute.js)
* Copyright 2015-2021 © thednp
* Licensed under MIT (https://github.com/thednp/kute.js/blob/master/LICENSE)
*/
class CubicBezier {
  constructor(p1x, p1y, p2x, p2y, functionName) {
    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0,0) and (1.0, 1.0)
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx - this.bx;

    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;

    const BezierEasing = (t) => this.sampleCurveY(this.solveCurveX(t));

    // this function needs a name
    Object.defineProperty(BezierEasing, 'name', { writable: true });
    BezierEasing.name = functionName || `cubic-bezier(${[p1x, p1y, p2x, p2y]})`;

    return BezierEasing;
  }

  sampleCurveX(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  }

  sampleCurveY(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  }

  sampleCurveDerivativeX(t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  }

  solveCurveX(x) {
    let t0;
    let t1;
    let t2;
    let x2;
    let d2;
    let i;
    const epsilon = 1e-5; // Precision

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 32; i += 1) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) return t2;
      d2 = this.sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < epsilon) break;
      t2 -= x2 / d2;
    }

    // No solution found - use bi-section
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;

      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Give up
    return t2;
  }
}

var KUTE = {};

var Tweens = [];

let globalObject;

if (typeof (global) !== 'undefined') globalObject = global;
else if (typeof (window.self) !== 'undefined') globalObject = window.self;
else if (typeof (window) !== 'undefined') globalObject = window;
else globalObject = {};

var globalObject$1 = globalObject;

// KUTE.js INTERPOLATE FUNCTIONS
// =============================
var Interpolate = {};

// schedule property specific function on animation start
// link property update function to KUTE.js execution context
var onStart = {};

const Time = {};
const that = window.self || window || {};
Time.now = that.performance.now.bind(that.performance);

let Tick = 0;

const Ticker = (time) => {
  let i = 0;
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
  setTimeout(() => { // re-added for #81
    if (!Tweens.length && Tick) {
      cancelAnimationFrame(Tick);
      Tick = null;
      Object.keys(onStart).forEach((obj) => {
        if (typeof (onStart[obj]) === 'function') {
          if (KUTE[obj]) delete KUTE[obj];
        } else {
          Object.keys(onStart[obj]).forEach((prop) => {
            if (KUTE[prop]) delete KUTE[prop];
          });
        }
      });

      Object.keys(Interpolate).forEach((i) => {
        if (KUTE[i]) delete KUTE[i];
      });
    }
  }, 64);
}

// KUTE.js render update functions
// ===============================
const Render = {
  Tick, Ticker, Tweens, Time,
};
Object.keys(Render).forEach((blob) => {
  if (!KUTE[blob]) {
    KUTE[blob] = blob === 'Time' ? Time.now : Render[blob];
  }
});

globalObject$1._KUTE = KUTE;

var supportedProperties = {};

var defaultValues = {};

const defaultOptions = {
  duration: 700,
  delay: 0,
  easing: 'linear',
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

// import connect from './connect.js'

var Objects = {
  supportedProperties,
  defaultValues,
  defaultOptions,
  prepareProperty,
  prepareStart,
  crossCheck,
  onStart,
  onComplete,
  linkProperty,
};

// util - a general object for utils like rgbToHex, processEasing
var Util = {};

var add = (tw) => Tweens.push(tw);

var remove = (tw) => {
  const i = Tweens.indexOf(tw);
  if (i !== -1) Tweens.splice(i, 1);
};

var getAll = () => Tweens;

var removeAll = () => { Tweens.length = 0; };

function linkInterpolation() { // DON'T change
  Object.keys(linkProperty).forEach((component) => {
    const componentLink = linkProperty[component];
    const componentProps = supportedProperties[component];

    Object.keys(componentLink).forEach((fnObj) => {
      if (typeof (componentLink[fnObj]) === 'function' // ATTR, colors, scroll, boxModel, borderRadius
          && Object.keys(this.valuesEnd).some((i) => (componentProps && componentProps.includes(i))
          || (i === 'attr' && Object.keys(this.valuesEnd[i]).some((j) => componentProps && componentProps.includes(j))))) {
        if (!KUTE[fnObj]) KUTE[fnObj] = componentLink[fnObj];
      } else {
        Object.keys(this.valuesEnd).forEach((prop) => {
          const propObject = this.valuesEnd[prop];
          if (propObject instanceof Object) {
            Object.keys(propObject).forEach((i) => {
              if (typeof (componentLink[i]) === 'function') { // transformCSS3
                if (!KUTE[i]) KUTE[i] = componentLink[i];
              } else {
                Object.keys(componentLink[fnObj]).forEach((j) => {
                  if (componentLink[i] && typeof (componentLink[i][j]) === 'function') { // transformMatrix
                    if (!KUTE[j]) KUTE[j] = componentLink[i][j];
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

var Internals = {
  add,
  remove,
  getAll,
  removeAll,
  stop,
  linkInterpolation,
};

// getInlineStyle - get transform style for element from cssText for .to() method
function getInlineStyle(el) {
  // if the scroll applies to `window` it returns as it has no styling
  if (!el.style) return false;
  // the cssText | the resulting transform object
  const css = el.style.cssText.replace(/\s/g, '').split(';');
  const transformObject = {};
  const arrayFn = ['translate3d', 'translate', 'scale3d', 'skew'];

  css.forEach((cs) => {
    if (/transform/i.test(cs)) {
      // all transform properties
      const tps = cs.split(':')[1].split(')');
      tps.forEach((tpi) => {
        const tpv = tpi.split('(');
        const tp = tpv[0];
        // each transform property
        const tv = tpv[1];
        if (!/matrix/.test(tp)) {
          transformObject[tp] = arrayFn.includes(tp) ? tv.split(',') : tv;
        }
      });
    }
  });

  return transformObject;
}

// getStyleForProperty - get computed style property for element for .to() method
function getStyleForProperty(elem, propertyName) {
  const styleAttribute = elem.style;
  const computedStyle = getComputedStyle(elem) || elem.currentStyle;
  const styleValue = styleAttribute[propertyName] && !/auto|initial|none|unset/.test(styleAttribute[propertyName])
    ? styleAttribute[propertyName]
    : computedStyle[propertyName];
  let result = defaultValues[propertyName];

  if (propertyName !== 'transform' && (propertyName in computedStyle || propertyName in styleAttribute)) {
    result = styleValue;
  }

  return result;
}

// prepareObject - returns all processed valuesStart / valuesEnd
function prepareObject(obj, fn) { // this, props object, type: start/end
  const propertiesObject = fn === 'start' ? this.valuesStart : this.valuesEnd;

  Object.keys(prepareProperty).forEach((component) => {
    const prepareComponent = prepareProperty[component];
    const supportComponent = supportedProperties[component];

    Object.keys(prepareComponent).forEach((tweenCategory) => {
      const transformObject = {};

      Object.keys(obj).forEach((tweenProp) => {
        // scroll, opacity, other components
        if (defaultValues[tweenProp] && prepareComponent[tweenProp]) {
          propertiesObject[tweenProp] = prepareComponent[tweenProp]
            .call(this, tweenProp, obj[tweenProp]);

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
            .call(this, tweenProp, obj[tweenProp]);
        }
      });

      // we filter out older browsers by checking Object.keys
      if (Object.keys(transformObject).length) {
        propertiesObject[tweenCategory] = prepareComponent[tweenCategory]
          .call(this, tweenCategory, transformObject);
      }
    });
  });
}

// getStartValues - returns the startValue for to() method
function getStartValues() {
  const startValues = {};
  const currentStyle = getInlineStyle(this.element);

  Object.keys(this.valuesStart).forEach((tweenProp) => {
    Object.keys(prepareStart).forEach((component) => {
      const componentStart = prepareStart[component];

      Object.keys(componentStart).forEach((tweenCategory) => {
        // clip, opacity, scroll
        if (tweenCategory === tweenProp && componentStart[tweenProp]) {
          startValues[tweenProp] = componentStart[tweenCategory]
            .call(this, tweenProp, this.valuesStart[tweenProp]);
        // find in an array of properties
        } else if (supportedProperties[component]
          && supportedProperties[component].includes(tweenProp)) {
          startValues[tweenProp] = componentStart[tweenCategory]
            .call(this, tweenProp, this.valuesStart[tweenProp]);
        }
      });
    });
  });

  // stack transformCSS props for .to() chains
  // also add to startValues values from previous tweens
  Object.keys(currentStyle).forEach((current) => {
    if (!(current in this.valuesStart)) {
      startValues[current] = currentStyle[current] || defaultValues[current];
    }
  });

  this.valuesStart = {};
  prepareObject.call(this, startValues, 'start');
}

var Process = {
  getInlineStyle,
  getStyleForProperty,
  getStartValues,
  prepareObject,
};

var connect = {};

const Easing = {
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

function processBezierEasing(fn) {
  if (typeof fn === 'function') {
    return fn;
  } if (typeof (Easing[fn]) === 'function') {
    return Easing[fn];
  } if (/bezier/.test(fn)) {
    const bz = fn.replace(/bezier|\s|\(|\)/g, '').split(',');
    return new CubicBezier(bz[0] * 1, bz[1] * 1, bz[2] * 1, bz[3] * 1); // bezier easing
  }
  // if (/elastic|bounce/i.test(fn)) {
  //   throw TypeError(`KUTE.js - CubicBezier doesn't support ${fn} easing.`);
  // }
  return Easing.linear;
}

connect.processEasing = processBezierEasing;

// a public selector utility
function selector(el, multi) {
  try {
    let requestedElem;
    let itemsArray;
    if (multi) {
      itemsArray = el instanceof Array && el.every((x) => x instanceof Element);
      requestedElem = el instanceof HTMLCollection || el instanceof NodeList || itemsArray
        ? el : document.querySelectorAll(el);
    } else {
      requestedElem = el instanceof Element || el === window // scroll
        ? el : document.querySelector(el);
    }
    return requestedElem;
  } catch (e) {
    throw TypeError(`KUTE.js - Element(s) not found: ${el}.`);
  }
}

function queueStart() {
  // fire onStart actions
  Object.keys(onStart).forEach((obj) => {
    if (typeof (onStart[obj]) === 'function') {
      onStart[obj].call(this, obj); // easing functions
    } else {
      Object.keys(onStart[obj]).forEach((prop) => {
        onStart[obj][prop].call(this, prop);
      });
    }
  });

  // add interpolations
  linkInterpolation.call(this);
}

// single Tween object construct
// TweenBase is meant to be use for pre-processed values
class TweenBase {
  constructor(targetElement, startObject, endObject, opsObject) {
    // element animation is applied to
    this.element = targetElement;

    this.playing = false;

    this._startTime = null;
    this._startFired = false;

    this.valuesEnd = endObject; // valuesEnd
    this.valuesStart = startObject; // valuesStart

    // OPTIONS
    const options = opsObject || {};
    // internal option to process inline/computed style at start instead of init
    // used by to() method and expects object : {} / false
    this._resetStart = options.resetStart || 0;
    // you can only set a core easing function as default
    this._easing = typeof (options.easing) === 'function' ? options.easing : connect.processEasing(options.easing);
    this._duration = options.duration || defaultOptions.duration; // duration option | default
    this._delay = options.delay || defaultOptions.delay; // delay option | default

    // set other options
    Object.keys(options).forEach((op) => {
      const internalOption = `_${op}`;
      if (!(internalOption in this)) this[internalOption] = options[op];
    });

    // callbacks should not be set as undefined
    // this._onStart = options.onStart
    // this._onUpdate = options.onUpdate
    // this._onStop = options.onStop
    // this._onComplete = options.onComplete

    // queue the easing
    const easingFnName = this._easing.name;
    if (!onStart[easingFnName]) {
      onStart[easingFnName] = function easingFn(prop) {
        if (!KUTE[prop] && prop === this._easing.name) KUTE[prop] = this._easing;
      };
    }

    return this;
  }

  // tween prototype
  // queue tween object to main frame update
  // move functions that use the ticker outside the prototype to be in the same scope with it
  start(time) {
    // now it's a good time to start
    add(this);
    this.playing = true;

    this._startTime = typeof time !== 'undefined' ? time : KUTE.Time();
    this._startTime += this._delay;

    if (!this._startFired) {
      if (this._onStart) {
        this._onStart.call(this);
      }

      queueStart.call(this);

      this._startFired = true;
    }

    if (!Tick) Ticker();
    return this;
  }

  stop() {
    if (this.playing) {
      remove(this);
      this.playing = false;

      if (this._onStop) {
        this._onStop.call(this);
      }
      this.close();
    }
    return this;
  }

  close() {
    // scroll|transformMatrix need this
    Object.keys(onComplete).forEach((component) => {
      Object.keys(onComplete[component]).forEach((toClose) => {
        onComplete[component][toClose].call(this, toClose);
      });
    });
    // when all animations are finished, stop ticking after ~3 frames
    this._startFired = false;
    stop.call(this);
  }

  chain(args) {
    this._chain = [];
    this._chain = args.length ? args : this._chain.concat(args);
    return this;
  }

  stopChainedTweens() {
    if (this._chain && this._chain.length) this._chain.forEach((tw) => tw.stop());
  }

  update(time) {
    const T = time !== undefined ? time : KUTE.Time();

    let elapsed;

    if (T < this._startTime && this.playing) { return true; }

    elapsed = (T - this._startTime) / this._duration;
    elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

    // calculate progress
    const progress = this._easing(elapsed);

    // render the update
    Object.keys(this.valuesEnd).forEach((tweenProp) => {
      KUTE[tweenProp](this.element,
        this.valuesStart[tweenProp],
        this.valuesEnd[tweenProp],
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
        this._chain.map((tw) => tw.start());
      }

      return false;
    }

    return true;
  }
}

// Update Tween Interface
connect.tween = TweenBase;

defaultOptions.repeat = 0;
defaultOptions.repeatDelay = 0;
defaultOptions.yoyo = false;
defaultOptions.resetStart = false;

// no need to set defaults for callbacks
// defaultOptions.onPause = undefined
// defaultOptions.onResume = undefined

// the constructor that supports to, allTo methods
class Tween extends TweenBase {
  constructor(...args) {
    super(...args); // this calls the constructor of TweenBase

    // reset interpolation values
    this.valuesStart = {};
    this.valuesEnd = {};

    const startObject = args[1];
    const endObject = args[2];

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
      Object.keys(crossCheck).forEach((component) => {
        Object.keys(crossCheck[component]).forEach((checkProp) => {
          crossCheck[component][checkProp].call(this, checkProp);
        });
      });
    }

    // set paused state
    this.paused = false;
    this._pauseTime = null;

    // additional properties and options
    const options = args[3];

    this._repeat = options.repeat || defaultOptions.repeat;
    this._repeatDelay = options.repeatDelay || defaultOptions.repeatDelay;
    // we cache the number of repeats to be able to put it back after all cycles finish
    this._repeatOption = this._repeat;

    // yoyo needs at least repeat: 1
    this.valuesRepeat = {}; // valuesRepeat
    this._yoyo = options.yoyo || defaultOptions.yoyo;
    this._reversed = false;

    // don't load extra callbacks
    // this._onPause = options.onPause || defaultOptions.onPause
    // this._onResume = options.onResume || defaultOptions.onResume

    // chained Tweens
    // this._chain = options.chain || defaultOptions.chain;
    return this;
  }

  // additions to start method
  start(time) {
    // on start we reprocess the valuesStart for TO() method
    if (this._resetStart) {
      this.valuesStart = this._resetStart;
      getStartValues.call(this);

      // this is where we do the valuesStart and valuesEnd check for fromTo() method
      Object.keys(crossCheck).forEach((component) => {
        Object.keys(crossCheck[component]).forEach((checkProp) => {
          crossCheck[component][checkProp].call(this, checkProp);
        });
      });
    }
    // still not paused
    this.paused = false;

    // set yoyo values
    if (this._yoyo) {
      Object.keys(this.valuesEnd).forEach((endProp) => {
        this.valuesRepeat[endProp] = this.valuesStart[endProp];
      });
    }

    super.start(time);

    return this;
  }

  // updates to super methods
  stop() {
    super.stop();
    if (!this.paused && this.playing) {
      this.paused = false;
      this.stopChainedTweens();
    }
    return this;
  }

  close() {
    super.close();

    if (this._repeatOption > 0) {
      this._repeat = this._repeatOption;
    }
    if (this._yoyo && this._reversed === true) {
      this.reverse();
      this._reversed = false;
    }

    return this;
  }

  // additions to prototype
  resume() {
    if (this.paused && this.playing) {
      this.paused = false;
      if (this._onResume !== undefined) {
        this._onResume.call(this);
      }
      // re-queue execution context
      queueStart.call(this);
      // update time and let it roll
      this._startTime += KUTE.Time() - this._pauseTime;
      add(this);
      // restart ticker if stopped
      if (!Tick) Ticker();
    }
    return this;
  }

  pause() {
    if (!this.paused && this.playing) {
      remove(this);
      this.paused = true;
      this._pauseTime = KUTE.Time();
      if (this._onPause !== undefined) {
        this._onPause.call(this);
      }
    }
    return this;
  }

  reverse() {
    // if (this._yoyo) {
    Object.keys(this.valuesEnd).forEach((reverseProp) => {
      const tmp = this.valuesRepeat[reverseProp];
      this.valuesRepeat[reverseProp] = this.valuesEnd[reverseProp];
      this.valuesEnd[reverseProp] = tmp;
      this.valuesStart[reverseProp] = this.valuesRepeat[reverseProp];
    });
    // }
  }

  update(time) {
    const T = time !== undefined ? time : KUTE.Time();

    let elapsed;

    if (T < this._startTime && this.playing) { return true; }

    elapsed = (T - this._startTime) / this._duration;
    elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

    // calculate progress
    const progress = this._easing(elapsed);

    // render the update
    Object.keys(this.valuesEnd).forEach((tweenProp) => {
      KUTE[tweenProp](this.element,
        this.valuesStart[tweenProp],
        this.valuesEnd[tweenProp],
        progress);
    });

    // fire the updateCallback
    if (this._onUpdate) {
      this._onUpdate.call(this);
    }

    if (elapsed === 1) {
      if (this._repeat > 0) {
        if (Number.isFinite(this._repeat)) this._repeat -= 1;

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
        this._chain.forEach((tw) => tw.start());
      }

      return false;
    }
    return true;
  }
}

// Update Tween Interface Update
connect.tween = Tween;

// KUTE.js Tween Collection
// ========================

class TweenCollection {
  constructor(els, vS, vE, Options) {
    this.tweens = [];

    // set default offset
    if (!('offset' in defaultOptions)) defaultOptions.offset = 0;

    const Ops = Options || {};
    Ops.delay = Ops.delay || defaultOptions.delay;

    // set all options
    const options = [];

    Array.from(els).forEach((el, i) => {
      const TweenConstructor = connect.tween;
      options[i] = Ops || {};
      options[i].delay = i > 0 ? Ops.delay + (Ops.offset || defaultOptions.offset) : Ops.delay;
      if (el instanceof Element) {
        this.tweens.push(new TweenConstructor(el, vS, vE, options[i]));
      } else {
        throw Error(`KUTE.js - ${el} not instanceof [Element]`);
      }
    });

    this.length = this.tweens.length;
    return this;
  }

  start(time) {
    const T = time === undefined ? KUTE.Time() : time;
    this.tweens.map((tween) => tween.start(T));
    return this;
  }

  stop() {
    this.tweens.map((tween) => tween.stop());
    return this;
  }

  pause(time) {
    const T = time === undefined ? KUTE.Time() : time;
    this.tweens.map((tween) => tween.pause(T));
    return this;
  }

  resume(time) {
    const T = time === undefined ? KUTE.Time() : time;
    this.tweens.map((tween) => tween.resume(T));
    return this;
  }

  chain(args) {
    const lastTween = this.tweens[this.length - 1];
    if (args instanceof TweenCollection) {
      lastTween.chain(args.tweens);
    } else if (args instanceof connect.tween) {
      lastTween.chain(args);
    } else {
      throw new TypeError('KUTE.js - invalid chain value');
    }
    return this;
  }

  playing() {
    return this.tweens.some((tw) => tw.playing);
  }

  removeTweens() {
    this.tweens = [];
  }

  getMaxDuration() {
    const durations = [];
    this.tweens.forEach((tw) => {
      durations.push(tw._duration + tw._delay + tw._repeat * tw._repeatDelay);
    });
    return Math.max(durations);
  }
}

function to(element, endObject, optionsObj) {
  const options = optionsObj || {};
  const TweenConstructor = connect.tween;
  options.resetStart = endObject;
  return new TweenConstructor(selector(element), endObject, endObject, options);
}

function fromTo(element, startObject, endObject, optionsObj) {
  const options = optionsObj || {};
  const TweenConstructor = connect.tween;
  return new TweenConstructor(selector(element), startObject, endObject, options);
}

// multiple elements tween objects
function allTo(elements, endObject, optionsObj) {
  const options = optionsObj || {};
  optionsObj.resetStart = endObject;
  return new TweenCollection(selector(elements, true), endObject, endObject, options);
}

function allFromTo(elements, startObject, endObject, optionsObj) {
  const options = optionsObj || {};
  return new TweenCollection(selector(elements, true), startObject, endObject, options);
}

// Animation class
// * builds KUTE components
// * populate KUTE objects
// * AnimatonBase creates a KUTE.js build for pre-made Tween objects
// * AnimatonDevelopment can help you debug your new components
class Animation {
  constructor(Component) {
    try {
      if (Component.component in supportedProperties) {
        throw Error(`KUTE.js - ${Component.component} already registered`);
      } else if (Component.property in defaultValues) {
        throw Error(`KUTE.js - ${Component.property} already registered`);
      } else {
        this.setComponent(Component);
      }
    } catch (e) {
      throw Error(e);
    }
  }

  setComponent(Component) {
    const propertyInfo = this;
    const ComponentName = Component.component;
    // const Objects = { defaultValues, defaultOptions, Interpolate, linkProperty, Util }
    const Functions = {
      prepareProperty, prepareStart, onStart, onComplete, crossCheck,
    };
    const Category = Component.category;
    const Property = Component.property;
    const Length = (Component.properties && Component.properties.length)
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
      propertyInfo.supports = `${Property} property`;
    } else if (Component.defaultValues) {
      Object.keys(Component.defaultValues).forEach((dv) => {
        defaultValues[dv] = Component.defaultValues[dv];
      });

      // minimal info
      propertyInfo.supports = `${Length || Property} ${Property || Category} properties`;
    }

    // set additional options
    if (Component.defaultOptions) {
      Object.keys(Component.defaultOptions).forEach((op) => {
        defaultOptions[op] = Component.defaultOptions[op];
      });
    }

    // set functions
    if (Component.functions) {
      Object.keys(Functions).forEach((fn) => {
        if (fn in Component.functions) {
          if (typeof (Component.functions[fn]) === 'function') {
            // if (!Functions[fn][ Category||Property ]) {
            //   Functions[fn][ Category||Property ] = Component.functions[fn];
            // }
            if (!Functions[fn][ComponentName]) Functions[fn][ComponentName] = {};
            if (!Functions[fn][ComponentName][Category || Property]) {
              Functions[fn][ComponentName][Category || Property] = Component.functions[fn];
            }
          } else {
            Object.keys(Component.functions[fn]).forEach((ofn) => {
              // !Functions[fn][ofn] && (Functions[fn][ofn] = Component.functions[fn][ofn])
              if (!Functions[fn][ComponentName]) Functions[fn][ComponentName] = {};
              if (!Functions[fn][ComponentName][ofn]) {
                Functions[fn][ComponentName][ofn] = Component.functions[fn][ofn];
              }
            });
          }
        }
      });
    }

    // set component interpolate
    if (Component.Interpolate) {
      Object.keys(Component.Interpolate).forEach((fni) => {
        const compIntObj = Component.Interpolate[fni];
        if (typeof (compIntObj) === 'function' && !Interpolate[fni]) {
          Interpolate[fni] = compIntObj;
        } else {
          Object.keys(compIntObj).forEach((sfn) => {
            if (typeof (compIntObj[sfn]) === 'function' && !Interpolate[fni]) {
              Interpolate[fni] = compIntObj[sfn];
            }
          });
        }
      });

      linkProperty[ComponentName] = Component.Interpolate;
    }

    // set component util
    if (Component.Util) {
      Object.keys(Component.Util).forEach((fnu) => {
        if (!Util[fnu]) Util[fnu] = Component.Util[fnu];
      });
    }

    return propertyInfo;
  }
}

// trueDimension - returns { v = value, u = unit }
function trueDimension(dimValue, isAngle) {
  const intValue = parseInt(dimValue, 10) || 0;
  const mUnits = ['px', '%', 'deg', 'rad', 'em', 'rem', 'vh', 'vw'];
  let theUnit;

  for (let mIndex = 0; mIndex < mUnits.length; mIndex += 1) {
    if (typeof dimValue === 'string' && dimValue.includes(mUnits[mIndex])) {
      theUnit = mUnits[mIndex]; break;
    }
  }
  if (theUnit === undefined) {
    theUnit = isAngle ? 'deg' : 'px';
  }

  return { v: intValue, u: theUnit };
}

function numbers(a, b, v) { // number1, number2, progress
  const A = +a;
  const B = b - a;
  // a = +a; b -= a;
  return A + B * v;
}

// Component Functions
function boxModelOnStart(tweenProp) {
  if (tweenProp in this.valuesEnd && !KUTE[tweenProp]) {
    KUTE[tweenProp] = (elem, a, b, v) => {
      elem.style[tweenProp] = `${v > 0.99 || v < 0.01
        ? ((numbers(a, b, v) * 10) >> 0) / 10
        : (numbers(a, b, v)) >> 0}px`;
    };
  }
}

// Component Base Props
const baseBoxProps = ['top', 'left', 'width', 'height'];
const baseBoxOnStart = {};
baseBoxProps.forEach((x) => { baseBoxOnStart[x] = boxModelOnStart; });

// Component Functions
function getBoxModel(tweenProp) {
  return getStyleForProperty(this.element, tweenProp) || defaultValues[tweenProp];
}
function prepareBoxModel(tweenProp, value) {
  const boxValue = trueDimension(value);
  const offsetProp = tweenProp === 'height' ? 'offsetHeight' : 'offsetWidth';
  return boxValue.u === '%' ? (boxValue.v * this.element[offsetProp]) / 100 : boxValue.v;
}

// Component Base Props
const essentialBoxProps = ['top', 'left', 'width', 'height'];
const essentialBoxPropsValues = {
  top: 0, left: 0, width: 0, height: 0,
};

const essentialBoxOnStart = {};
essentialBoxProps.forEach((x) => { essentialBoxOnStart[x] = boxModelOnStart; });

// All Component Functions
const essentialBoxModelFunctions = {
  prepareStart: getBoxModel,
  prepareProperty: prepareBoxModel,
  onStart: essentialBoxOnStart,
};

// Component Essential
const essentialBoxModel = {
  component: 'essentialBoxModel',
  category: 'boxModel',
  properties: essentialBoxProps,
  defaultValues: essentialBoxPropsValues,
  Interpolate: { numbers },
  functions: essentialBoxModelFunctions,
  Util: { trueDimension },
};

// hexToRGB - returns RGB color object {r,g,b}
var hexToRGB = (hex) => {
  const hexShorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const HEX = hex.replace(hexShorthand, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(HEX);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

// trueColor - replace transparent and transform any color to rgba()/rgb()
function trueColor(colorString) {
  let result;
  if (/rgb|rgba/.test(colorString)) { // first check if it's a rgb string
    const vrgb = colorString.replace(/\s|\)/, '').split('(')[1].split(',');
    const colorAlpha = vrgb[3] ? vrgb[3] : null;
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
    const fromHex = hexToRGB(colorString);
    result = { r: fromHex.r, g: fromHex.g, b: fromHex.b };
  } if (/transparent|none|initial|inherit/.test(colorString)) {
    result = {
      r: 0, g: 0, b: 0, a: 0,
    };
  }
  if (!/^#|^rgb/.test(colorString)) { // maybe we can check for web safe colors
    const siteHead = document.getElementsByTagName('head')[0];
    siteHead.style.color = colorString;
    let webColor = getComputedStyle(siteHead, null).color;
    webColor = /rgb/.test(webColor) ? webColor.replace(/[^\d,]/g, '').split(',') : [0, 0, 0];
    siteHead.style.color = '';
    result = {
      r: parseInt(webColor[0], 10),
      g: parseInt(webColor[1], 10),
      b: parseInt(webColor[2], 10),
    };
  }
  return result;
}

function colors(a, b, v) {
  const _c = {};
  const ep = ')';
  const cm = ',';
  const rgb = 'rgb(';
  const rgba = 'rgba(';

  Object.keys(b).forEach((c) => {
    // _c[c] = c !== 'a' ? (numbers(a[c], b[c], v) >> 0 || 0) : (a[c] && b[c])
    // ? (numbers(a[c], b[c], v) * 100 >> 0) / 100 : null;
    if (c !== 'a') {
      _c[c] = numbers(a[c], b[c], v) >> 0 || 0;
    } else if (a[c] && b[c]) {
      _c[c] = (numbers(a[c], b[c], v) * 100 >> 0) / 100;
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
const supportedColors$1 = ['color', 'backgroundColor', 'borderColor',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor'];

// Component Functions
function onStartColors(tweenProp) {
  if (this.valuesEnd[tweenProp] && !KUTE[tweenProp]) {
    KUTE[tweenProp] = (elem, a, b, v) => {
      elem.style[tweenProp] = colors(a, b, v);
    };
  }
}

const colorsOnStart$1 = {};
supportedColors$1.forEach((x) => { colorsOnStart$1[x] = onStartColors; });

// Component Interpolation
// Component Properties
// supported formats
// 'hex', 'rgb', 'rgba' '#fff' 'rgb(0,0,0)' / 'rgba(0,0,0,0)' 'red' (IE9+)
const supportedColors = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor'];

const defaultColors = {};
supportedColors.forEach((tweenProp) => {
  defaultColors[tweenProp] = '#000';
});

// Component Functions
const colorsOnStart = {};
supportedColors.forEach((x) => {
  colorsOnStart[x] = onStartColors;
});

function getColor(prop/* , value */) {
  return getStyleForProperty(this.element, prop) || defaultValues[prop];
}
function prepareColor(prop, value) {
  return trueColor(value);
}

// All Component Functions
const colorFunctions = {
  prepareStart: getColor,
  prepareProperty: prepareColor,
  onStart: colorsOnStart,
};

// Component Full
const colorProperties = {
  component: 'colorProperties',
  category: 'colors',
  properties: supportedColors,
  defaultValues: defaultColors,
  Interpolate: { numbers, colors },
  functions: colorFunctions,
  Util: { trueColor },
};

// Component Special
const attributes = {};

const onStartAttr = {
  attr(tweenProp) {
    if (!KUTE[tweenProp] && this.valuesEnd[tweenProp]) {
      KUTE[tweenProp] = (elem, vS, vE, v) => {
        Object.keys(vE).forEach((oneAttr) => {
          KUTE.attributes[oneAttr](elem, oneAttr, vS[oneAttr], vE[oneAttr], v);
        });
      };
    }
  },
  attributes(tweenProp) {
    if (!KUTE[tweenProp] && this.valuesEnd.attr) {
      KUTE[tweenProp] = attributes;
    }
  },
};

// Component Name
const ComponentName = 'htmlAttributes';

// Component Properties
const svgColors = ['fill', 'stroke', 'stop-color'];

// Component Util
function replaceUppercase(a) { return a.replace(/[A-Z]/g, '-$&').toLowerCase(); }

// Component Functions
function getAttr(tweenProp, value) {
  const attrStartValues = {};
  Object.keys(value).forEach((attr) => {
    // get the value for 'fill-opacity' not fillOpacity, also 'width' not the internal 'width_px'
    const attribute = replaceUppercase(attr).replace(/_+[a-z]+/, '');
    const currentValue = this.element.getAttribute(attribute);
    attrStartValues[attribute] = svgColors.includes(attribute)
      ? (currentValue || 'rgba(0,0,0,0)')
      : (currentValue || (/opacity/i.test(attr) ? 1 : 0));
  });

  return attrStartValues;
}

function prepareAttr(tweenProp, attrObj) { // attr (string),attrObj (object)
  const attributesObject = {};

  Object.keys(attrObj).forEach((p) => {
    const prop = replaceUppercase(p);
    const regex = /(%|[a-z]+)$/;
    const currentValue = this.element.getAttribute(prop.replace(/_+[a-z]+/, ''));

    if (!svgColors.includes(prop)) {
      // attributes set with unit suffixes
      if (currentValue !== null && regex.test(currentValue)) {
        const unit = trueDimension(currentValue).u || trueDimension(attrObj[p]).u;
        const suffix = /%/.test(unit) ? '_percent' : `_${unit}`;

        // most "unknown" attributes cannot register into onStart, so we manually add them
        onStart[ComponentName][prop + suffix] = (tp) => {
          if (this.valuesEnd[tweenProp] && this.valuesEnd[tweenProp][tp] && !(tp in attributes)) {
            attributes[tp] = (elem, oneAttr, a, b, v) => {
              const _p = oneAttr.replace(suffix, '');
              elem.setAttribute(_p, ((numbers(a.v, b.v, v) * 1000 >> 0) / 1000) + b.u);
            };
          }
        };
        attributesObject[prop + suffix] = trueDimension(attrObj[p]);
      } else if (!regex.test(attrObj[p]) || currentValue === null
        || (currentValue !== null && !regex.test(currentValue))) {
        // most "unknown" attributes cannot register into onStart, so we manually add them
        onStart[ComponentName][prop] = (tp) => {
          if (this.valuesEnd[tweenProp] && this.valuesEnd[tweenProp][tp] && !(tp in attributes)) {
            attributes[tp] = (elem, oneAttr, a, b, v) => {
              elem.setAttribute(oneAttr, (numbers(a, b, v) * 1000 >> 0) / 1000);
            };
          }
        };
        attributesObject[prop] = parseFloat(attrObj[p]);
      }
    } else { // colors
      // most "unknown" attributes cannot register into onStart, so we manually add them
      onStart[ComponentName][prop] = (tp) => {
        if (this.valuesEnd[tweenProp] && this.valuesEnd[tweenProp][tp] && !(tp in attributes)) {
          attributes[tp] = (elem, oneAttr, a, b, v) => {
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
const attrFunctions = {
  prepareStart: getAttr,
  prepareProperty: prepareAttr,
  onStart: onStartAttr,
};

// Component Full
const htmlAttributes = {
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
  Interpolate: { numbers, colors },
  functions: attrFunctions,
  // export to global for faster execution
  Util: { replaceUppercase, trueColor, trueDimension },
};

/* opacityProperty = {
  property: 'opacity',
  defaultValue: 1,
  interpolators: {numbers},
  functions = { prepareStart, prepareProperty, onStart }
} */

// Component Functions
function onStartOpacity(tweenProp/* , value */) {
  // opacity could be 0 sometimes, we need to check regardless
  if (tweenProp in this.valuesEnd && !KUTE[tweenProp]) {
    KUTE[tweenProp] = (elem, a, b, v) => {
      elem.style[tweenProp] = ((numbers(a, b, v) * 1000) >> 0) / 1000;
    };
  }
}

/* opacityProperty = {
  property: 'opacity',
  defaultValue: 1,
  interpolators: {numbers},
  functions = { prepareStart, prepareProperty, onStart }
} */

// Component Functions
function getOpacity(tweenProp/* , value */) {
  return getStyleForProperty(this.element, tweenProp);
}

function prepareOpacity(tweenProp, value) {
  return parseFloat(value); // opacity always FLOAT
}

// All Component Functions
const opacityFunctions = {
  prepareStart: getOpacity,
  prepareProperty: prepareOpacity,
  onStart: onStartOpacity,
};

// Full Component
const opacityProperty = {
  component: 'opacityProperty',
  property: 'opacity',
  defaultValue: 1,
  Interpolate: { numbers },
  functions: opacityFunctions,
};

// Component Values
const lowerCaseAlpha = String('abcdefghijklmnopqrstuvwxyz').split(''); // lowercase
const upperCaseAlpha = String('abcdefghijklmnopqrstuvwxyz').toUpperCase().split(''); // uppercase
const nonAlpha = String("~!@#$%^&*()_+{}[];'<>,./?=-").split(''); // symbols
const numeric = String('0123456789').split(''); // numeric
const alphaNumeric = lowerCaseAlpha.concat(upperCaseAlpha, numeric); // alpha numeric
const allTypes = alphaNumeric.concat(nonAlpha); // all caracters

const charSet = {
  alpha: lowerCaseAlpha, // lowercase
  upper: upperCaseAlpha, // uppercase
  symbols: nonAlpha, // symbols
  numeric,
  alphanumeric: alphaNumeric,
  all: allTypes,
};

// Component Functions
const onStartWrite = {
  text(tweenProp) {
    if (!KUTE[tweenProp] && this.valuesEnd[tweenProp]) {
      const chars = this._textChars;
      let charsets = charSet[defaultOptions.textChars];

      if (chars in charSet) {
        charsets = charSet[chars];
      } else if (chars && chars.length) {
        charsets = chars;
      }

      KUTE[tweenProp] = (elem, a, b, v) => {
        let initialText = '';
        let endText = '';
        const finalText = b === '' ? ' ' : b;
        const firstLetterA = a.substring(0);
        const firstLetterB = b.substring(0);
        const pointer = charsets[(Math.random() * charsets.length) >> 0];

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
      };
    }
  },
  number(tweenProp) {
    if (tweenProp in this.valuesEnd && !KUTE[tweenProp]) { // numbers can be 0
      KUTE[tweenProp] = (elem, a, b, v) => {
        elem.innerHTML = numbers(a, b, v) >> 0;
      };
    }
  },
};

// Component Util
// utility for multi-child targets
// wrapContentsSpan returns an [Element] with the SPAN.tagName and a desired class
function wrapContentsSpan(el, classNAME) {
  let textWriteWrapper;
  let newElem;
  if (typeof (el) === 'string') {
    newElem = document.createElement('SPAN');
    newElem.innerHTML = el;
    newElem.className = classNAME;
    return newElem;
  }
  if (!el.children.length || (el.children.length && el.children[0].className !== classNAME)) {
    const elementInnerHTML = el.innerHTML;
    textWriteWrapper = document.createElement('SPAN');
    textWriteWrapper.className = classNAME;
    textWriteWrapper.innerHTML = elementInnerHTML;
    el.appendChild(textWriteWrapper);
    el.innerHTML = textWriteWrapper.outerHTML;
  } else if (el.children.length && el.children[0].className === classNAME) {
    [textWriteWrapper] = el.children;
  }
  return textWriteWrapper;
}

function getTextPartsArray(el, classNAME) {
  let elementsArray = [];
  const len = el.children.length;
  if (len) {
    const textParts = [];
    let remainingMarkup = el.innerHTML;
    let wrapperParts;

    for (let i = 0, currentChild, childOuter, unTaggedContent; i < len; i += 1) {
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

      if (!currentChild.classList.contains(classNAME)) currentChild.classList.add(classNAME);
      textParts.push(currentChild);
      remainingMarkup = remainingMarkup.replace(childOuter, '');
    }

    if (remainingMarkup !== '') {
      const unTaggedRemaining = wrapContentsSpan(remainingMarkup, classNAME);
      textParts.push(unTaggedRemaining);
    }

    elementsArray = elementsArray.concat(textParts);
  } else {
    elementsArray = elementsArray.concat([wrapContentsSpan(el, classNAME)]);
  }
  return elementsArray;
}

function setSegments(target, newText) {
  const oldTargetSegs = getTextPartsArray(target, 'text-part');
  const newTargetSegs = getTextPartsArray(wrapContentsSpan(newText), 'text-part');

  target.innerHTML = '';
  target.innerHTML += oldTargetSegs.map((s) => { s.className += ' oldText'; return s.outerHTML; }).join('');
  target.innerHTML += newTargetSegs.map((s) => { s.className += ' newText'; return s.outerHTML.replace(s.innerHTML, ''); }).join('');

  return [oldTargetSegs, newTargetSegs];
}

function createTextTweens(target, newText, ops) {
  if (target.playing) return false;

  const options = ops || {};
  options.duration = 1000;

  if (ops.duration === 'auto') {
    options.duration = 'auto';
  } else if (Number.isFinite(ops.duration * 1)) {
    options.duration = ops.duration * 1;
  }

  const TweenContructor = connect.tween;
  const segs = setSegments(target, newText);
  const oldTargetSegs = segs[0];
  const newTargetSegs = segs[1];
  const oldTargets = [].slice.call(target.getElementsByClassName('oldText')).reverse();
  const newTargets = [].slice.call(target.getElementsByClassName('newText'));

  let textTween = [];
  let totalDelay = 0;

  textTween = textTween.concat(oldTargets.map((el, i) => {
    options.duration = options.duration === 'auto'
      ? oldTargetSegs[i].innerHTML.length * 75
      : options.duration;
    options.delay = totalDelay;
    options.onComplete = null;

    totalDelay += options.duration;
    return new TweenContructor(el, { text: el.innerHTML }, { text: '' }, options);
  }));
  textTween = textTween.concat(newTargets.map((el, i) => {
    function onComplete() {
      target.innerHTML = newText;
      target.playing = false;
    }

    options.duration = options.duration === 'auto' ? newTargetSegs[i].innerHTML.length * 75 : options.duration;
    options.delay = totalDelay;
    options.onComplete = i === newTargetSegs.length - 1 ? onComplete : null;
    totalDelay += options.duration;

    return new TweenContructor(el, { text: '' }, { text: newTargetSegs[i].innerHTML }, options);
  }));

  textTween.start = function startTweens() {
    if (!target.playing) {
      textTween.forEach((tw) => tw.start());
      target.playing = true;
    }
  };

  return textTween;
}

// Component Functions
function getWrite(/* tweenProp, value */) {
  return this.element.innerHTML;
}

function prepareText(tweenProp, value) {
  if (tweenProp === 'number') {
    return parseFloat(value);
  }
  // empty strings crash the update function
  return value === '' ? ' ' : value;
}

// All Component Functions
const textWriteFunctions = {
  prepareStart: getWrite,
  prepareProperty: prepareText,
  onStart: onStartWrite,
};

/* textWrite = {
  category: 'textWrite',
  defaultValues: {},
  interpolators: {numbers},
  functions = { prepareStart, prepareProperty, onStart }
} */

// Full Component
const textWrite = {
  component: 'textWriteProperties',
  category: 'textWrite',
  properties: ['text', 'number'],
  defaultValues: { text: ' ', numbers: '0' },
  defaultOptions: { textChars: 'alpha' },
  Interpolate: { numbers },
  functions: textWriteFunctions,
  // export to global for faster execution
  Util: { charSet, createTextTweens },
};

function perspective(a, b, u, v) {
  return `perspective(${((a + (b - a) * v) * 1000 >> 0) / 1000}${u})`;
}

function translate3d(a, b, u, v) {
  const translateArray = [];
  for (let ax = 0; ax < 3; ax += 1) {
    translateArray[ax] = (a[ax] || b[ax]
      ? ((a[ax] + (b[ax] - a[ax]) * v) * 1000 >> 0) / 1000 : 0) + u;
  }
  return `translate3d(${translateArray.join(',')})`;
}

function rotate3d(a, b, u, v) {
  let rotateStr = '';
  rotateStr += a[0] || b[0] ? `rotateX(${((a[0] + (b[0] - a[0]) * v) * 1000 >> 0) / 1000}${u})` : '';
  rotateStr += a[1] || b[1] ? `rotateY(${((a[1] + (b[1] - a[1]) * v) * 1000 >> 0) / 1000}${u})` : '';
  rotateStr += a[2] || b[2] ? `rotateZ(${((a[2] + (b[2] - a[2]) * v) * 1000 >> 0) / 1000}${u})` : '';
  return rotateStr;
}

function translate(a, b, u, v) {
  const translateArray = [];
  translateArray[0] = (a[0] === b[0] ? b[0] : ((a[0] + (b[0] - a[0]) * v) * 1000 >> 0) / 1000) + u;
  translateArray[1] = a[1] || b[1] ? ((a[1] === b[1] ? b[1] : ((a[1] + (b[1] - a[1]) * v) * 1000 >> 0) / 1000) + u) : '0';
  return `translate(${translateArray.join(',')})`;
}

function rotate(a, b, u, v) {
  return `rotate(${((a + (b - a) * v) * 1000 >> 0) / 1000}${u})`;
}

function scale(a, b, v) {
  return `scale(${((a + (b - a) * v) * 1000 >> 0) / 1000})`;
}

function skew(a, b, u, v) {
  const skewArray = [];
  skewArray[0] = (a[0] === b[0] ? b[0] : ((a[0] + (b[0] - a[0]) * v) * 1000 >> 0) / 1000) + u;
  skewArray[1] = a[1] || b[1] ? ((a[1] === b[1] ? b[1] : ((a[1] + (b[1] - a[1]) * v) * 1000 >> 0) / 1000) + u) : '0';
  return `skew(${skewArray.join(',')})`;
}

/* transformFunctions = {
  property: 'transform',
  subProperties,
  defaultValues,
  Interpolate: {translate,rotate,skew,scale},
  functions } */

// same to svg transform, attr

// Component Functions
function onStartTransform(tweenProp) {
  if (!KUTE[tweenProp] && this.valuesEnd[tweenProp]) {
    KUTE[tweenProp] = (elem, a, b, v) => {
      elem.style[tweenProp] = (a.perspective || b.perspective ? perspective(a.perspective, b.perspective, 'px', v) : '') // one side might be 0
        + (a.translate3d ? translate3d(a.translate3d, b.translate3d, 'px', v) : '') // array [x,y,z]
        + (a.rotate3d ? rotate3d(a.rotate3d, b.rotate3d, 'deg', v) : '') // array [x,y,z]
        + (a.skew ? skew(a.skew, b.skew, 'deg', v) : '') // array [x,y]
        + (a.scale || b.scale ? scale(a.scale, b.scale, v) : ''); // one side might be 0
    };
  }
}

/* transformFunctions = {
  property: 'transform',
  subProperties,
  defaultValues,
  Interpolate: {translate,rotate,skew,scale},
  functions } */

// same to svg transform, attr
// the component developed for modern browsers supporting non-prefixed transform

// Component Functions
function getTransform(tweenProperty/* , value */) {
  const currentStyle = getInlineStyle(this.element);
  return currentStyle[tweenProperty] ? currentStyle[tweenProperty] : defaultValues[tweenProperty];
}

function prepareTransform(prop, obj) {
  const prepAxis = ['X', 'Y', 'Z']; // coordinates
  const transformObject = {};
  const translateArray = []; const rotateArray = []; const skewArray = [];
  const arrayFunctions = ['translate3d', 'translate', 'rotate3d', 'skew'];

  Object.keys(obj).forEach((x) => {
    const pv = typeof obj[x] === 'object' && obj[x].length
      ? obj[x].map((v) => parseInt(v, 10))
      : parseInt(obj[x], 10);

    if (arrayFunctions.includes(x)) {
      const propId = x === 'translate' || x === 'rotate' ? `${x}3d` : x;

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
      const fn = x.replace(/[XYZ]/, '');
      const fnId = fn === 'skew' ? fn : `${fn}3d`;
      const fnLen = fn === 'skew' ? 2 : 3;
      let fnArray = [];

      if (fn === 'translate') {
        fnArray = translateArray;
      } else if (fn === 'rotate') {
        fnArray = rotateArray;
      } else if (fn === 'skew') {
        fnArray = skewArray;
      }

      for (let fnIndex = 0; fnIndex < fnLen; fnIndex += 1) {
        const fnAxis = prepAxis[fnIndex];
        fnArray[fnIndex] = (`${fn}${fnAxis}` in obj) ? parseInt(obj[`${fn}${fnAxis}`], 10) : 0;
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
const transformFunctions = {
  prepareStart: getTransform,
  prepareProperty: prepareTransform,
  onStart: onStartTransform,
  crossCheck: crossCheckTransform,
};

const supportedTransformProperties = [
  'perspective',
  'translate3d', 'translateX', 'translateY', 'translateZ', 'translate',
  'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'rotate',
  'skewX', 'skewY', 'skew',
  'scale',
];

const defaultTransformValues = {
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
const transformFunctionsComponent = {
  component: 'transformFunctions',
  property: 'transform',
  subProperties: supportedTransformProperties,
  defaultValues: defaultTransformValues,
  functions: transformFunctions,
  Interpolate: {
    perspective,
    translate3d,
    rotate3d,
    translate,
    rotate,
    scale,
    skew,
  },
};

/* svgDraw = {
  property: 'draw',
  defaultValue,
  Interpolate: {numbers} },
  functions = { prepareStart, prepareProperty, onStart }
} */

// Component Functions
function onStartDraw(tweenProp) {
  if (tweenProp in this.valuesEnd && !KUTE[tweenProp]) {
    KUTE[tweenProp] = (elem, a, b, v) => {
      const pathLength = (a.l * 100 >> 0) / 100;
      const start = (numbers(a.s, b.s, v) * 100 >> 0) / 100;
      const end = (numbers(a.e, b.e, v) * 100 >> 0) / 100;
      const offset = 0 - start;
      const dashOne = end + offset;

      elem.style.strokeDashoffset = `${offset}px`;
      elem.style.strokeDasharray = `${((dashOne < 1 ? 0 : dashOne) * 100 >> 0) / 100}px, ${pathLength}px`;
    };
  }
}

/* svgDraw = {
  property: 'draw',
  defaultValue,
  Interpolate: {numbers} },
  functions = { prepareStart, prepareProperty, onStart }
} */

// Component Util
function percent(v, l) {
  return (parseFloat(v) / 100) * l;
}

// http://stackoverflow.com/a/30376660
// returns the length of a Rect
function getRectLength(el) {
  const w = el.getAttribute('width');
  const h = el.getAttribute('height');
  return (w * 2) + (h * 2);
}

// getPolygonLength / getPolylineLength
// returns the length of the Polygon / Polyline
function getPolyLength(el) {
  const points = el.getAttribute('points').split(' ');

  let len = 0;
  if (points.length > 1) {
    const coord = (p) => {
      const c = p.split(',');
      if (c.length !== 2) { return 0; } // return undefined
      if (Number.isNaN(c[0] * 1) || Number.isNaN(c[1] * 1)) { return 0; }
      return [parseFloat(c[0]), parseFloat(c[1])];
    };

    const dist = (c1, c2) => {
      if (c1 !== undefined && c2 !== undefined) {
        return Math.sqrt((c2[0] - c1[0]) ** 2 + (c2[1] - c1[1]) ** 2);
      }
      return 0;
    };

    if (points.length > 2) {
      for (let i = 0; i < points.length - 1; i += 1) {
        len += dist(coord(points[i]), coord(points[i + 1]));
      }
    }
    len += el.tagName === 'polygon'
      ? dist(coord(points[0]), coord(points[points.length - 1])) : 0;
  }
  return len;
}

// return the length of the line
function getLineLength(el) {
  const x1 = el.getAttribute('x1');
  const x2 = el.getAttribute('x2');
  const y1 = el.getAttribute('y1');
  const y2 = el.getAttribute('y2');
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// return the length of the circle
function getCircleLength(el) {
  const r = el.getAttribute('r');
  return 2 * Math.PI * r;
}

// returns the length of an ellipse
function getEllipseLength(el) {
  const rx = el.getAttribute('rx');
  const ry = el.getAttribute('ry');
  const len = 2 * rx;
  const wid = 2 * ry;
  return ((Math.sqrt(0.5 * ((len * len) + (wid * wid)))) * (Math.PI * 2)) / 2;
}

// returns the result of any of the below functions
function getTotalLength(el) {
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

function getDraw(element, value) {
  const length = /path|glyph/.test(element.tagName)
    ? element.getTotalLength()
    : getTotalLength(element);
  let start;
  let end;
  let dasharray;
  let offset;

  if (value instanceof Object) {
    return value;
  } if (typeof value === 'string') {
    const v = value.split(/,|\s/);
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

function resetDraw(elem) {
  elem.style.strokeDashoffset = '';
  elem.style.strokeDasharray = '';
}

// Component Functions
function getDrawValue(/* prop, value */) {
  return getDraw(this.element);
}
function prepareDraw(a, o) {
  return getDraw(this.element, o);
}

// All Component Functions
const svgDrawFunctions = {
  prepareStart: getDrawValue,
  prepareProperty: prepareDraw,
  onStart: onStartDraw,
};

// Component Full
const svgDraw = {
  component: 'svgDraw',
  property: 'draw',
  defaultValue: '0% 0%',
  Interpolate: { numbers },
  functions: svgDrawFunctions,
  // Export to global for faster execution
  Util: {
    getRectLength,
    getPolyLength,
    getLineLength,
    getCircleLength,
    getEllipseLength,
    getTotalLength,
    resetDraw,
    getDraw,
    percent,
  },
};

const SVGPCO = {
  origin: null,
  decimals: 4,
  round: 1,
};

function clonePath(pathArray) {
  return pathArray.map((x) => {
    if (Array.isArray(x)) {
      return clonePath(x);
    }
    return !Number.isNaN(+x) ? +x : x;
  });
}

function roundPath(pathArray, round) {
  const decimalsOption = !Number.isNaN(+round) ? +round : SVGPCO.decimals;
  let result;

  if (decimalsOption) {
    result = pathArray.map((seg) => seg.map((c) => {
      const nr = +c;
      const dc = 10 ** decimalsOption;
      if (nr) {
        return nr % 1 === 0 ? nr : Math.round(nr * dc) / dc;
      }
      return c;
    }));
  } else {
    result = clonePath(pathArray);
  }
  return result;
}

function fixArc(pathArray, allPathCommands, i) {
  if (pathArray[i].length > 7) {
    pathArray[i].shift();
    const pi = pathArray[i];
    // const ni = i + 1;
    let ni = i;
    while (pi.length) {
      // if created multiple C:s, their original seg is saved
      allPathCommands[i] = 'A';
      pathArray.splice(ni += 1, 0, ['C'].concat(pi.splice(0, 6)));
      // pathArray.splice(i += 1, 0, ['C'].concat(pi.splice(0, 6)));
      // pathArray.splice(i++, 0, ['C'].concat(pi.splice(0, 6)));
    }
    pathArray.splice(i, 1);
  }
}

var paramsCount = {
  a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0,
};

function isPathArray(pathArray) {
  return Array.isArray(pathArray) && pathArray.every((seg) => {
    const pathCommand = seg[0].toLowerCase();
    return paramsCount[pathCommand] === seg.length - 1 && /[achlmrqstvz]/g.test(pathCommand);
  });
}

function isCurveArray(pathArray) {
  return isPathArray(pathArray) && pathArray.slice(1).every((seg) => seg[0] === 'C');
}

function finalizeSegment(state) {
  let pathCommand = state.pathValue[state.segmentStart];
  let pathComLK = pathCommand.toLowerCase();
  let params = state.data;

  // Process duplicated commands (without comand name)
  if (pathComLK === 'm' && params.length > 2) {
    state.segments.push([pathCommand, params[0], params[1]]);
    params = params.slice(2);
    pathComLK = 'l';
    pathCommand = (pathCommand === 'm') ? 'l' : 'L';
  }

  if (pathComLK === 'r') {
    state.segments.push([pathCommand].concat(params));
  } else {
    while (params.length >= paramsCount[pathComLK]) {
      state.segments.push([pathCommand].concat(params.splice(0, paramsCount[pathComLK])));
      if (!paramsCount[pathComLK]) {
        break;
      }
    }
  }
}

var invalidPathValue = 'Invalid path value';

function scanFlag(state) {
  const ch = state.pathValue.charCodeAt(state.index);

  if (ch === 0x30/* 0 */) {
    state.param = 0;
    state.index += 1;
    return;
  }

  if (ch === 0x31/* 1 */) {
    state.param = 1;
    state.index += 1;
    return;
  }

  // state.err = 'SvgPath: arc flag can be 0 or 1 only (at pos ' + state.index + ')';
  state.err = `${invalidPathValue}: invalid Arc flag ${ch}`;
}

function isDigit(code) {
  return (code >= 48 && code <= 57); // 0..9
}

function scanParam(state) {
  const start = state.index;
  const { max } = state;
  let index = start;
  let zeroFirst = false;
  let hasCeiling = false;
  let hasDecimal = false;
  let hasDot = false;
  let ch;

  if (index >= max) {
    // state.err = 'SvgPath: missed param (at pos ' + index + ')';
    state.err = `${invalidPathValue}: missing param ${state.pathValue[index]}`;
    return;
  }
  ch = state.pathValue.charCodeAt(index);

  if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
    index += 1;
    ch = (index < max) ? state.pathValue.charCodeAt(index) : 0;
  }

  // This logic is shamelessly borrowed from Esprima
  // https://github.com/ariya/esprimas
  if (!isDigit(ch) && ch !== 0x2E/* . */) {
    // state.err = 'SvgPath: param should start with 0..9 or `.` (at pos ' + index + ')';
    state.err = `${invalidPathValue} at index ${index}: ${state.pathValue[index]} is not a number`;
    return;
  }

  if (ch !== 0x2E/* . */) {
    zeroFirst = (ch === 0x30/* 0 */);
    index += 1;

    ch = (index < max) ? state.pathValue.charCodeAt(index) : 0;

    if (zeroFirst && index < max) {
      // decimal number starts with '0' such as '09' is illegal.
      if (ch && isDigit(ch)) {
        // state.err = 'SvgPath: numbers started with `0` such as `09`
        // are illegal (at pos ' + start + ')';
        state.err = `${invalidPathValue}: ${state.pathValue[start]} illegal number`;
        return;
      }
    }

    while (index < max && isDigit(state.pathValue.charCodeAt(index))) {
      index += 1;
      hasCeiling = true;
    }
    ch = (index < max) ? state.pathValue.charCodeAt(index) : 0;
  }

  if (ch === 0x2E/* . */) {
    hasDot = true;
    index += 1;
    while (isDigit(state.pathValue.charCodeAt(index))) {
      index += 1;
      hasDecimal = true;
    }
    ch = (index < max) ? state.pathValue.charCodeAt(index) : 0;
  }

  if (ch === 0x65/* e */ || ch === 0x45/* E */) {
    if (hasDot && !hasCeiling && !hasDecimal) {
      // state.err = 'SvgPath: invalid float exponent (at pos ' + index + ')';
      state.err = `${invalidPathValue}: ${state.pathValue[index]} invalid float exponent`;
      return;
    }

    index += 1;

    ch = (index < max) ? state.pathValue.charCodeAt(index) : 0;
    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      index += 1;
    }
    if (index < max && isDigit(state.pathValue.charCodeAt(index))) {
      while (index < max && isDigit(state.pathValue.charCodeAt(index))) {
        index += 1;
      }
    } else {
      // state.err = 'SvgPath: invalid float exponent (at pos ' + index + ')';
      state.err = `${invalidPathValue}: ${state.pathValue[index]} invalid float exponent`;
      return;
    }
  }

  state.index = index;
  state.param = +state.pathValue.slice(start, index);
}

function isSpace(ch) {
  const specialSpaces = [
    0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006,
    0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF];
  return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029) // Line terminators
    // White spaces
    || (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0)
    || (ch >= 0x1680 && specialSpaces.indexOf(ch) >= 0);
}

function skipSpaces(state) {
  while (state.index < state.max && isSpace(state.pathValue.charCodeAt(state.index))) {
    state.index += 1;
  }
}

function isPathCommand(code) {
  // eslint-disable no-bitwise
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
    case 0x72/* r */:
      return true;
    default:
      return false;
  }
}

function isDigitStart(code) {
  return (code >= 48 && code <= 57) /* 0..9 */
    || code === 0x2B /* + */
    || code === 0x2D /* - */
    || code === 0x2E; /* . */
}

function isArcCommand(code) {
  // eslint disable no-bitwise
  return (code | 0x20) === 0x61;
}

function scanSegment(state) {
  const { max } = state;
  const cmdCode = state.pathValue.charCodeAt(state.index);
  const reqParams = paramsCount[state.pathValue[state.index].toLowerCase()];
  // let hasComma;

  state.segmentStart = state.index;

  if (!isPathCommand(cmdCode)) {
    // state.err = 'SvgPath: bad command '
    // + state.pathValue[state.index]
    // + ' (at pos ' + state.index + ')';
    state.err = `${invalidPathValue}: ${state.pathValue[state.index]} not a path command`;
    return;
  }

  state.index += 1;
  skipSpaces(state);

  state.data = [];

  if (!reqParams) {
    // Z
    finalizeSegment(state);
    return;
  }

  // hasComma = false;

  for (;;) {
    for (let i = reqParams; i > 0; i -= 1) {
      if (isArcCommand(cmdCode) && (i === 3 || i === 4)) scanFlag(state);
      else scanParam(state);

      if (state.err.length) {
        return;
      }
      state.data.push(state.param);

      skipSpaces(state);
      // hasComma = false;

      if (state.index < max && state.pathValue.charCodeAt(state.index) === 0x2C/* , */) {
        state.index += 1;
        skipSpaces(state);
        // hasComma = true;
      }
    }

    // after ',' param is mandatory
    // if (hasComma) {
    //   continue;
    // }

    if (state.index >= state.max) {
      break;
    }

    // Stop on next segment
    if (!isDigitStart(state.pathValue.charCodeAt(state.index))) {
      break;
    }
  }

  finalizeSegment(state);
}

function SVGPathArray(pathString) {
  this.segments = [];
  this.pathValue = pathString;
  this.max = pathString.length;
  this.index = 0;
  this.param = 0.0;
  this.segmentStart = 0;
  this.data = [];
  this.err = '';
  return this;
}

// Returns array of segments:
function parsePathString(pathString, round) {
  if (isPathArray(pathString)) {
    return clonePath(pathString);
  }

  const state = new SVGPathArray(pathString);

  skipSpaces(state);

  while (state.index < state.max && !state.err.length) {
    scanSegment(state);
  }

  if (state.err.length) {
    state.segments = [];
  } else if (state.segments.length) {
    if ('mM'.indexOf(state.segments[0][0]) < 0) {
      // state.err = 'Path string should start with `M` or `m`';
      state.err = `${invalidPathValue}: missing M/m`;
      state.segments = [];
    } else {
      state.segments[0][0] = 'M';
    }
  }

  return roundPath(state.segments, round);
}

function isAbsoluteArray(pathInput) {
  return isPathArray(pathInput) && pathInput.every((x) => x[0] === x[0].toUpperCase());
}

function pathToAbsolute(pathInput, round) {
  if (isAbsoluteArray(pathInput)) {
    return clonePath(pathInput);
  }

  const pathArray = parsePathString(pathInput, round);
  const ii = pathArray.length;
  const resultArray = [];
  let x = 0;
  let y = 0;
  let mx = 0;
  let my = 0;
  let start = 0;

  if (pathArray[0][0] === 'M') {
    x = +pathArray[0][1];
    y = +pathArray[0][2];
    mx = x;
    my = y;
    start += 1;
    resultArray.push(['M', x, y]);
  }

  for (let i = start; i < ii; i += 1) {
    const segment = pathArray[i];
    const [pathCommand] = segment;
    const absCommand = pathCommand.toUpperCase();
    const absoluteSegment = [];
    let newSeg = [];
    resultArray.push(absoluteSegment);

    if (pathCommand !== absCommand) {
      absoluteSegment[0] = absCommand;

      switch (absCommand) {
        case 'A':
          newSeg = segment.slice(1, -2).concat([+segment[6] + x, +segment[7] + y]);
          for (let j = 0; j < newSeg.length; j += 1) {
            absoluteSegment.push(newSeg[j]);
          }
          break;
        case 'V':
          absoluteSegment[1] = +segment[1] + y;
          break;
        case 'H':
          absoluteSegment[1] = +segment[1] + x;
          break;
        default:
          if (absCommand === 'M') {
            mx = +segment[1] + x;
            my = +segment[2] + y;
          }
          // for is here to stay for eslint
          for (let j = 1; j < segment.length; j += 1) {
            absoluteSegment.push(+segment[j] + (j % 2 ? x : y));
          }
      }
    } else {
      for (let j = 0; j < segment.length; j += 1) {
        absoluteSegment.push(segment[j]);
      }
    }

    const segLength = absoluteSegment.length;
    switch (absCommand) {
      case 'Z':
        x = mx;
        y = my;
        break;
      case 'H':
        x = +absoluteSegment[1];
        break;
      case 'V':
        y = +absoluteSegment[1];
        break;
      default:
        x = +absoluteSegment[segLength - 2];
        y = +absoluteSegment[segLength - 1];

        if (absCommand === 'M') {
          mx = x;
          my = y;
        }
    }
  }

  return roundPath(resultArray, round);
}

// returns {qx,qy} for shorthand quadratic bezier segments
function shorthandToQuad(x1, y1, qx, qy, prevCommand) {
  return 'QT'.indexOf(prevCommand) > -1
    ? { qx: x1 * 2 - qx, qy: y1 * 2 - qy }
    : { qx: x1, qy: y1 };
}

// returns {x1,x2} for shorthand cubic bezier segments
function shorthandToCubic(x1, y1, x2, y2, prevCommand) {
  return 'CS'.indexOf(prevCommand) > -1
    ? { x1: x1 * 2 - x2, y1: y1 * 2 - y2 }
    : { x1, y1 };
}

function normalizeSegment(segment, params, prevCommand) {
  const [pathCommand] = segment;
  const xy = segment.slice(1);
  let result = segment;

  if ('TQ'.indexOf(segment[0]) < 0) {
    // optional but good to be cautious
    params.qx = null;
    params.qy = null;
  }

  if (pathCommand === 'H') {
    result = ['L', segment[1], params.y1];
  } else if (pathCommand === 'V') {
    result = ['L', params.x1, segment[1]];
  } else if (pathCommand === 'S') {
    const { x1, y1 } = shorthandToCubic(params.x1, params.y1, params.x2, params.y2, prevCommand);
    params.x1 = x1;
    params.y1 = y1;
    result = ['C', x1, y1].concat(xy);
  } else if (pathCommand === 'T') {
    const { qx, qy } = shorthandToQuad(params.x1, params.y1, params.qx, params.qy, prevCommand);
    params.qx = qx;
    params.qy = qy;
    result = ['Q', qx, qy].concat(xy);
  } else if (pathCommand === 'Q') {
    const [nqx, nqy] = xy;
    params.qx = nqx;
    params.qy = nqy;
  }
  return result;
}

function isNormalizedArray(pathArray) {
  return Array.isArray(pathArray) && pathArray.every((seg) => {
    const pathCommand = seg[0].toLowerCase();
    return paramsCount[pathCommand] === seg.length - 1 && /[ACLMQZ]/.test(seg[0]); // achlmrqstvz
  });
}

function normalizePath(pathInput, round) { // pathArray|pathString
  if (isNormalizedArray(pathInput)) {
    return clonePath(pathInput);
  }

  const pathArray = pathToAbsolute(pathInput, round);
  const params = {
    x1: 0, y1: 0, x2: 0, y2: 0, x: 0, y: 0, qx: null, qy: null,
  };
  const allPathCommands = [];
  const ii = pathArray.length;
  let prevCommand = '';
  let segment;
  let seglen;

  for (let i = 0; i < ii; i += 1) {
    // save current path command
    const [pathCommand] = pathArray[i];

    // Save current path command
    allPathCommands[i] = pathCommand;
    // Get previous path command
    if (i) prevCommand = allPathCommands[i - 1];
    // Previous path command is inputted to processSegment
    pathArray[i] = normalizeSegment(pathArray[i], params, prevCommand);

    segment = pathArray[i];
    seglen = segment.length;

    params.x1 = +segment[seglen - 2];
    params.y1 = +segment[seglen - 1];
    params.x2 = +(segment[seglen - 4]) || params.x1;
    params.y2 = +(segment[seglen - 3]) || params.y1;
  }
  return roundPath(pathArray, round);
}

function rotateVector(x, y, rad) {
  const X = x * Math.cos(rad) - y * Math.sin(rad);
  const Y = x * Math.sin(rad) + y * Math.cos(rad);
  return { x: X, y: Y };
}

// for more information of where this math came from visit:
// http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
// LAF = largeArcFlag, SF = sweepFlag

function arcToCubic(x1, y1, rx, ry, angle, LAF, SF, x2, y2, recursive) {
  const d120 = (Math.PI * 120) / 180;
  const rad = (Math.PI / 180) * (angle || 0);
  let res = [];
  let X1 = x1;
  let X2 = x2;
  let Y1 = y1;
  let Y2 = y2;
  let RX = rx;
  let RY = ry;
  let xy;
  let f1;
  let f2;
  let cx;
  let cy;

  if (!recursive) {
    xy = rotateVector(X1, Y1, -rad);
    X1 = xy.x;
    Y1 = xy.y;
    xy = rotateVector(X2, Y2, -rad);
    X2 = xy.x;
    Y2 = xy.y;

    const x = (X1 - X2) / 2;
    const y = (Y1 - Y2) / 2;
    let h = (x * x) / (RX * RY) + (y ** 2) / (RY ** 2);
    if (h > 1) {
      h = Math.sqrt(h);
      RX *= h;
      RY *= h;
    }
    const rx2 = RX ** 2;
    const ry2 = RY ** 2;
    const k = (LAF === SF ? -1 : 1)
          * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x)
          / (rx2 * y * y + ry2 * x * x)));

    cx = ((k * RX * y) / RY) + ((X1 + X2) / 2);
    cy = ((k * -RY * x) / RX) + ((Y1 + Y2) / 2);

    // f1 = Math.asin(((Y1 - cy) / RY).toFixed(9)); // keep toFIxed(9)!
    // f2 = Math.asin(((Y2 - cy) / RY).toFixed(9));
    f1 = Math.asin((((Y1 - cy) / RY) * 10 ** 9 >> 0) / (10 ** 9));
    f2 = Math.asin((((Y2 - cy) / RY) * 10 ** 9 >> 0) / (10 ** 9));

    f1 = X1 < cx ? Math.PI - f1 : f1;
    f2 = X2 < cx ? Math.PI - f2 : f2;

    if (f1 < 0) f1 = Math.PI * 2 + f1;
    if (f2 < 0) f2 = Math.PI * 2 + f2;

    if (SF && f1 > f2) {
      f1 -= Math.PI * 2;
    }
    if (!SF && f2 > f1) {
      f2 -= Math.PI * 2;
    }
  } else {
    const [r1, r2, r3, r4] = recursive;
    f1 = r1;
    f2 = r2;
    cx = r3;
    cy = r4;
  }

  let df = f2 - f1;

  if (Math.abs(df) > d120) {
    const f2old = f2; const x2old = X2; const
      y2old = Y2;

    f2 = f1 + d120 * (SF && f2 > f1 ? 1 : -1);
    X2 = cx + RX * Math.cos(f2);
    Y2 = cy + RY * Math.sin(f2);
    res = arcToCubic(X2, Y2, RX, RY, angle, 0, SF, x2old, y2old, [f2, f2old, cx, cy]);
  }

  df = f2 - f1;
  const c1 = Math.cos(f1);
  const s1 = Math.sin(f1);
  const c2 = Math.cos(f2);
  const s2 = Math.sin(f2);
  const t = Math.tan(df / 4);
  const hx = (4 / 3) * RX * t;
  const hy = (4 / 3) * RY * t;
  const m1 = [X1, Y1];
  const m2 = [X1 + hx * s1, Y1 - hy * c1];
  const m3 = [X2 + hx * s2, Y2 - hy * c2];
  const m4 = [X2, Y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];

  if (recursive) {
    return [m2, m3, m4].concat(res);
  }
  res = [m2, m3, m4].concat(res).join().split(',');
  return res.map((rz, i) => {
    if (i % 2) {
      return rotateVector(res[i - 1], rz, rad).y;
    }
    return rotateVector(rz, res[i + 1], rad).x;
  });
}

function quadToCubic(x1, y1, qx, qy, x2, y2) {
  const r13 = 1 / 3;
  const r23 = 2 / 3;
  return [
    r13 * x1 + r23 * qx, // cpx1
    r13 * y1 + r23 * qy, // cpy1
    r13 * x2 + r23 * qx, // cpx2
    r13 * y2 + r23 * qy, // cpy2
    x2, y2, // x,y
  ];
}

// t = [0-1]
function getPointAtSegLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
  const t1 = 1 - t;
  return {
    x: (t1 ** 3) * p1x
      + t1 * t1 * 3 * t * c1x
      + t1 * 3 * t * t * c2x
      + (t ** 3) * p2x,
    y: (t1 ** 3) * p1y
      + t1 * t1 * 3 * t * c1y
      + t1 * 3 * t * t * c2y
      + (t ** 3) * p2y,
  };
}

function midPoint(a, b, t) {
  const ax = a[0];
  const ay = a[1];
  const bx = b[0];
  const by = b[1];
  return [ax + (bx - ax) * t, ay + (by - ay) * t];
}

function lineToCubic(x1, y1, x2, y2) {
  const t = 0.5;
  const p0 = [x1, y1];
  const p1 = [x2, y2];
  const p2 = midPoint(p0, p1, t);
  const p3 = midPoint(p1, p2, t);
  const p4 = midPoint(p2, p3, t);
  const p5 = midPoint(p3, p4, t);
  const p6 = midPoint(p4, p5, t);
  const cp1 = getPointAtSegLength.apply(0, p0.concat(p2, p4, p6, t));
  const cp2 = getPointAtSegLength.apply(0, p6.concat(p5, p3, p1, 0));

  return [cp1.x, cp1.y, cp2.x, cp2.y, x2, y2];
}

function segmentToCubic(segment, params) {
  if ('TQ'.indexOf(segment[0]) < 0) {
    params.qx = null;
    params.qy = null;
  }

  const [s1, s2] = segment.slice(1);

  switch (segment[0]) {
    case 'M':
      params.x = s1;
      params.y = s2;
      return segment;
    case 'A':
      return ['C'].concat(arcToCubic.apply(0, [params.x1, params.y1].concat(segment.slice(1))));
    case 'Q':
      params.qx = s1;
      params.qy = s2;
      return ['C'].concat(quadToCubic.apply(0, [params.x1, params.y1].concat(segment.slice(1))));
    case 'L':
      return ['C'].concat(lineToCubic(params.x1, params.y1, segment[1], segment[2]));
    case 'Z':
      return ['C'].concat(lineToCubic(params.x1, params.y1, params.x, params.y));
  }
  return segment;
}

function pathToCurve(pathInput, round) { // pathArray|pathString
  if (isCurveArray(pathInput)) {
    return clonePath(pathInput);
  }

  const pathArray = normalizePath(pathInput, round);
  const params = {
    x1: 0, y1: 0, x2: 0, y2: 0, x: 0, y: 0, qx: null, qy: null,
  };
  const allPathCommands = [];
  let pathCommand = '';
  let ii = pathArray.length;
  let segment;
  let seglen;

  for (let i = 0; i < ii; i += 1) {
    if (pathArray[i]) [pathCommand] = pathArray[i];

    allPathCommands[i] = pathCommand;
    pathArray[i] = segmentToCubic(pathArray[i], params);

    fixArc(pathArray, allPathCommands, i);
    ii = pathArray.length; // solves curveArrays ending in Z

    segment = pathArray[i];
    seglen = segment.length;

    params.x1 = +segment[seglen - 2];
    params.y1 = +segment[seglen - 1];
    params.x2 = +(segment[seglen - 4]) || params.x1;
    params.y2 = +(segment[seglen - 3]) || params.y1;
  }
  return roundPath(pathArray, round);
}

function pathToString(pathArray) {
  return pathArray.map((x) => x[0].concat(x.slice(1).join(' '))).join('');
}

function splitPath(pathInput) {
  return pathToString(pathToAbsolute(pathInput, 0))
    .replace(/(m|M)/g, '|$1')
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s);
}

function base3(p1, p2, p3, p4, t) {
  const t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
  const t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
  return t * t2 - 3 * p1 + 3 * p2;
}

// returns the cubic bezier segment length
function getSegCubicLength(x1, y1, x2, y2, x3, y3, x4, y4, z) {
  let Z;
  if (z === null || Number.isNaN(+z)) Z = 1;

  // Z = Z > 1 ? 1 : Z < 0 ? 0 : Z;
  if (Z > 1) Z = 1;
  if (Z < 0) Z = 0;

  const z2 = Z / 2; let ct = 0; let xbase = 0; let ybase = 0; let sum = 0;
  const Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678,
    -0.5873, 0.5873, -0.7699, 0.7699,
    -0.9041, 0.9041, -0.9816, 0.9816];
  const Cvalues = [0.2491, 0.2491, 0.2335, 0.2335,
    0.2032, 0.2032, 0.1601, 0.1601,
    0.1069, 0.1069, 0.0472, 0.0472];

  Tvalues.forEach((T, i) => {
    ct = z2 * T + z2;
    xbase = base3(x1, x2, x3, x4, ct);
    ybase = base3(y1, y2, y3, y4, ct);
    sum += Cvalues[i] * Math.sqrt(xbase * xbase + ybase * ybase);
  });
  return z2 * sum;
}

// calculates the shape total length
// equivalent to shape.getTotalLength()
// pathToCurve version
function getPathLength(pathArray, round) {
  let totalLength = 0;
  pathToCurve(pathArray, round).forEach((s, i, curveArray) => {
    totalLength += s[0] !== 'M' ? getSegCubicLength.apply(0, curveArray[i - 1].slice(-2).concat(s.slice(1))) : 0;
  });
  return totalLength;
}

// calculates the shape total length
// almost equivalent to shape.getTotalLength()
function getPointAtLength(pathArray, length) {
  let totalLength = 0;
  let segLen;
  let data;
  let result;

  return pathToCurve(pathArray, 9).map((seg, i, curveArray) => { // process data
    data = i ? curveArray[i - 1].slice(-2).concat(seg.slice(1)) : seg.slice(1);
    segLen = i ? getSegCubicLength.apply(0, data) : 0;
    totalLength += segLen;

    if (i === 0) {
      result = { x: data[0], y: data[1] };
    } else if (totalLength > length && length > totalLength - segLen) {
      result = getPointAtSegLength.apply(0, data.concat(1 - (totalLength - length) / segLen));
    } else {
      result = null;
    }

    return result;
  }).filter((x) => x).slice(-1)[0]; // isolate last segment
}

// https://github.com/paperjs/paper.js/blob/develop/src/path/Path.js

function getCubicSegArea(x0, y0, x1, y1, x2, y2, x3, y3) {
  // http://objectmix.com/graphics/133553-area-closed-bezier-curve.html
  return (3 * ((y3 - y0) * (x1 + x2) - (x3 - x0) * (y1 + y2)
           + (y1 * (x0 - x2)) - (x1 * (y0 - y2))
           + (y3 * (x2 + x0 / 3)) - (x3 * (y2 + y0 / 3)))) / 20;
}

function getPathArea(pathArray, round) {
  let x = 0; let y = 0; let mx = 0; let my = 0; let
    len = 0;
  return pathToCurve(pathArray, round).map((seg) => {
    switch (seg[0]) {
      case 'M':
      case 'Z':
        mx = seg[0] === 'M' ? seg[1] : mx;
        my = seg[0] === 'M' ? seg[2] : my;
        x = mx;
        y = my;
        return 0;
      default:
        len = getCubicSegArea.apply(0, [x, y].concat(seg.slice(1)));
        [x, y] = seg.slice(-2);
        return len;
    }
  }).reduce((a, b) => a + b, 0);
}

function getDrawDirection(pathArray, round) {
  return getPathArea(pathToCurve(pathArray, round)) >= 0;
}

var epsilon = 1e-9;

function distanceSquareRoot(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) * (a[0] - b[0])
    + (a[1] - b[1]) * (a[1] - b[1]),
  );
}

function coords(a, b, l, v) {
  const points = [];
  for (let i = 0; i < l; i += 1) { // for each point
    points[i] = [];
    for (let j = 0; j < 2; j += 1) { // each point coordinate
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
function onStartSVGMorph(tweenProp) {
  if (!KUTE[tweenProp] && this.valuesEnd[tweenProp]) {
    KUTE[tweenProp] = (elem, a, b, v) => {
      const path1 = a.pathArray; const path2 = b.pathArray; const
        len = path2.length;
      elem.setAttribute('d', (v === 1 ? b.original : `M${coords(path1, path2, len, v).join('L')}Z`));
    };
  }
}

/* SVGMorph = {
  property: 'path',
  defaultValue: [],
  interpolators: {numbers,coords},
  functions = { prepareStart, prepareProperty, onStart, crossCheck }
} */

// Component Interpolation
// function function(array1, array2, length, progress)

// Component Util
// original script flubber
// https://github.com/veltman/flubber

function polygonLength(ring) {
  return ring.reduce((length, point, i) => (i
    ? length + distanceSquareRoot(ring[i - 1], point)
    : 0), 0);
}

function exactRing(pathArray) {
  const ring = [];
  const pathlen = pathArray.length;
  let segment = [];
  let pathCommand = '';
  let pathLength = 0;

  if (!pathArray.length || pathArray[0][0] !== 'M') {
    return false;
  }

  for (let i = 0; i < pathlen; i += 1) {
    segment = pathArray[i];
    [pathCommand] = segment;

    if ((pathCommand === 'M' && i) || pathCommand === 'Z') {
      break; // !!
    } else if ('ML'.indexOf(pathCommand) > -1) {
      ring.push([segment[1], segment[2]]);
    } else {
      return false;
    }
  }

  pathLength = polygonLength(ring);

  return pathlen ? { ring, pathLength } : false;
}

function approximateRing(parsed, maxSegmentLength) {
  const ringPath = splitPath(pathToString(parsed))[0];
  const curvePath = pathToCurve(ringPath, 4);
  const pathLength = getPathLength(curvePath);
  const ring = [];
  let numPoints = 3;
  let point;

  if (maxSegmentLength && !Number.isNaN(maxSegmentLength) && +maxSegmentLength > 0) {
    numPoints = Math.max(numPoints, Math.ceil(pathLength / maxSegmentLength));
  }

  for (let i = 0; i < numPoints; i += 1) {
    point = getPointAtLength(curvePath, (pathLength * i) / numPoints);
    ring.push([point.x, point.y]);
  }

  // Make all rings clockwise
  if (!getDrawDirection(curvePath)) {
    ring.reverse();
  }

  return {
    pathLength,
    ring,
    skipBisect: true,
  };
}

function pathStringToRing(str, maxSegmentLength) {
  const parsed = normalizePath(str, 0);
  return exactRing(parsed) || approximateRing(parsed, maxSegmentLength);
}

function rotateRing(ring, vs) {
  const len = ring.length;
  let min = Infinity;
  let bestOffset;
  let sumOfSquares = 0;
  let spliced;
  let d;
  let p;

  for (let offset = 0; offset < len; offset += 1) {
    sumOfSquares = 0;

    // vs.forEach((p, i) => {
    //   const d = distanceSquareRoot(ring[(offset + i) % len], p);
    //   sumOfSquares += d * d;
    // });
    for (let i = 0; i < vs.length; i += 1) {
      p = vs[i];
      d = distanceSquareRoot(ring[(offset + i) % len], p);
      sumOfSquares += d * d;
    }

    if (sumOfSquares < min) {
      min = sumOfSquares;
      bestOffset = offset;
    }
  }

  if (bestOffset) {
    spliced = ring.splice(0, bestOffset);
    ring.splice(ring.length, 0, ...spliced);
  }
}

function addPoints(ring, numPoints) {
  const desiredLength = ring.length + numPoints;
  // const step = ring.pathLength / numPoints;
  const step = polygonLength(ring) / numPoints;

  let i = 0;
  let cursor = 0;
  let insertAt = step / 2;
  let a;
  let b;
  let segment;

  while (ring.length < desiredLength) {
    a = ring[i];
    b = ring[(i + 1) % ring.length];

    segment = distanceSquareRoot(a, b);

    if (insertAt <= cursor + segment) {
      ring.splice(i + 1, 0, segment
        ? midPoint(a, b, (insertAt - cursor) / segment)
        : a.slice(0));
      insertAt += step;
    } else {
      cursor += segment;
      i += 1;
    }
  }
}

function bisect(ring, maxSegmentLength = Infinity) {
  let a = [];
  let b = [];

  for (let i = 0; i < ring.length; i += 1) {
    a = ring[i];
    b = i === ring.length - 1 ? ring[0] : ring[i + 1];

    // Could splice the whole set for a segment instead, but a bit messy
    while (distanceSquareRoot(a, b) > maxSegmentLength) {
      b = midPoint(a, b, 0.5);
      ring.splice(i + 1, 0, b);
    }
  }
}

function validRing(ring) {
  return Array.isArray(ring)
    && ring.every((point) => Array.isArray(point)
      && point.length === 2
      && !Number.isNaN(point[0])
      && !Number.isNaN(point[1]));
}

function normalizeRing(input, maxSegmentLength) {
  let skipBisect;
  let pathLength;
  let ring = input;

  if (typeof (ring) === 'string') {
    const converted = pathStringToRing(ring, maxSegmentLength);
    ring = converted.ring;
    skipBisect = converted.skipBisect;
    pathLength = converted.pathLength;
  } else if (!Array.isArray(ring)) {
    throw Error(`${invalidPathValue}: ${ring}`);
  }

  const points = ring.slice(0);
  points.pathLength = pathLength;

  if (!validRing(points)) {
    throw Error(`${invalidPathValue}: ${points}`);
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

function getInterpolationPoints(pathArray1, pathArray2, precision) {
  const morphPrecision = precision || defaultOptions.morphPrecision;
  const fromRing = normalizeRing(pathArray1, morphPrecision);
  const toRing = normalizeRing(pathArray2, morphPrecision);
  const diff = fromRing.length - toRing.length;

  addPoints(fromRing, diff < 0 ? diff * -1 : 0);
  addPoints(toRing, diff > 0 ? diff : 0);

  rotateRing(fromRing, toRing);

  return [roundPath(fromRing), roundPath(toRing)];
}

// Component functions
function getSVGMorph(/* tweenProp */) {
  return this.element.getAttribute('d');
}

function prepareSVGMorph(tweenProp, value) {
  const pathObject = {};
  // remove newlines, they brake JSON strings sometimes
  const pathReg = new RegExp('\\n', 'ig');
  let elem = null;

  if (value instanceof SVGElement) {
    elem = value;
  } else if (/^\.|^#/.test(value)) {
    elem = selector(value);
  }

  // first make sure we return pre-processed values
  if (typeof (value) === 'object' && value.pathArray) {
    return value;
  } if (elem && ['path', 'glyph'].includes(elem.tagName)) {
    pathObject.original = elem.getAttribute('d').replace(pathReg, '');
  // maybe it's a string path already
  } else if (!elem && typeof (value) === 'string') {
    pathObject.original = value.replace(pathReg, '');
  }

  return pathObject;
}
function crossCheckSVGMorph(prop) {
  if (this.valuesEnd[prop]) {
    const pathArray1 = this.valuesStart[prop].pathArray;
    const pathArray2 = this.valuesEnd[prop].pathArray;
    // skip already processed paths
    // allow the component to work with pre-processed values
    if (!pathArray1 || !pathArray2
      || (pathArray1 && pathArray2 && pathArray1.length !== pathArray2.length)) {
      const p1 = this.valuesStart[prop].original;
      const p2 = this.valuesEnd[prop].original;
      // process morphPrecision
      const morphPrecision = this._morphPrecision
        ? parseInt(this._morphPrecision, 10)
        : defaultOptions.morphPrecision;

      const [path1, path2] = getInterpolationPoints(p1, p2, morphPrecision);
      this.valuesStart[prop].pathArray = path1;
      this.valuesEnd[prop].pathArray = path2;
    }
  }
}

// All Component Functions
const svgMorphFunctions = {
  prepareStart: getSVGMorph,
  prepareProperty: prepareSVGMorph,
  onStart: onStartSVGMorph,
  crossCheck: crossCheckSVGMorph,
};

// Component Full
const svgMorph = {
  component: 'svgMorph',
  property: 'path',
  defaultValue: [],
  Interpolate: coords,
  defaultOptions: { morphPrecision: 10, morphIndex: 0 },
  functions: svgMorphFunctions,
  // Export utils to global for faster execution
  Util: {
    addPoints,
    bisect,
    normalizeRing,
    validRing, // component
    getInterpolationPoints,
    pathStringToRing,
    distanceSquareRoot,
    midPoint,
    approximateRing,
    rotateRing,
    pathToString,
    pathToCurve, // svg-path-commander
    getPathLength,
    getPointAtLength,
    getDrawDirection,
    roundPath,
  },
};

var version = "2.1.2";

const Components = {
  EssentialBoxModel: essentialBoxModel,
  ColorsProperties: colorProperties,
  HTMLAttributes: htmlAttributes,
  OpacityProperty: opacityProperty,
  TextWrite: textWrite,
  TransformFunctions: transformFunctionsComponent,
  SVGDraw: svgDraw,
  SVGMorph: svgMorph,
};

// init components
Object.keys(Components).forEach((component) => {
  const compOps = Components[component];
  Components[component] = new Animation(compOps);
});

var index = {
  Animation,
  Components,

  // Tween Interface
  Tween,
  fromTo,
  to,
  // Tween Collection
  TweenCollection,
  allFromTo,
  allTo,
  // Tween Interface

  Objects,
  Util,
  Easing,
  CubicBezier,
  Render,
  Interpolate,
  Process,
  Internals,
  Selector: selector,
  Version: version,
};

export default index;
