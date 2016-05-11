/*
 * Animate Plus JavaScript Library v1.4.0
 * http://animateplus.com
 *
 * Copyright (c) 2015 Benjamin De Cock
 * Released under the MIT license
 * http://animateplus.com/license
 */

const animate = (() => {

  "use strict";


  // func utils
  // ===============================================================================================

  const curry = fn => {
    const arity = fn.length;
    const curried = (...args) =>
      args.length < arity ? (...more) => curried(...args, ...more) : fn(...args);
    return curried;
  };

  const compose = (...funcs) => value => funcs.reduce((a, b) => b(a), value);

  const not = fn => (...args) => !fn(...args);

  const easing = {
    linear(t, b, c, d) {
      return b + (t / d * c);
    },
    easeInQuad(t, b, c, d) {
      return c*(t/=d)*t + b;
    },
    easeInCubic(t, b, c, d) {
      return c*(t/=d)*t*t + b;
    },
    easeInQuart(t, b, c, d) {
      return c*(t/=d)*t*t*t + b;
    },
    easeInQuint(t, b, c, d) {
      return c*(t/=d)*t*t*t*t + b;
    },
    easeInSine(t, b, c, d) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeInExpo(t, b, c, d) {
      return t==0 ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeInCirc(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeInElastic(t, b, c, d, frequency = 500) {
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      const a = c;
      const p = d * (1 - Math.min(frequency, 999) / 1000);
      const s = a < Math.abs(c) ? p / 4 : p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeInBack(t, b, c, d) {
      const s = 1.70158;
      return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutQuad(t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
    },
    easeOutCubic(t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeOutQuart(t, b, c, d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeOutQuint(t, b, c, d) {
      return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeOutSine(t, b, c, d) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeOutExpo(t, b, c, d) {
      return t==d ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeOutCirc(t, b, c, d) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeOutElastic(t, b, c, d, frequency = 500) {
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      const a = c;
      const p = d * (1 - Math.min(frequency, 999) / 1000);
      const s = a < Math.abs(c) ? p / 4 : p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeOutBack(t, b, c, d) {
      const s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeOutBounce(t, b, c, d) {
      if ((t/=d) < (1/2.75))
        return c*(7.5625*t*t) + b;
      if (t < (2/2.75))
        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      if (t < (2.5/2.75))
        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    },
    easeInOutQuad(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInOutCubic(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInOutQuart(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInOutQuint(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInOutSine(t, b, c, d) {
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInOutExpo(t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInOutCirc(t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInOutElastic(t, b, c, d, frequency = 500) {
      if (t == 0) return b;
      if ((t /= d/2) == 2) return b + c;
      const a = c;
      const p = d * (1 - Math.min(frequency, 999) / 1000) * 1.5;
      const s = a < Math.abs(c) ? p / 4 : p / (2 * Math.PI) * Math.asin(c / a);
      return t < 1
      ? -.5 * (a * Math.pow(2, 10 * (t-=1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
      : a * Math.pow(2, -10 * (t-=1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInOutBack(t, b, c, d) {
      let s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }
  };


  // array utils
  // ===============================================================================================

  const first = arr => arr[0];
  const last = arr => first(arr.slice(-1));
  const flatten = arr => arr.reduce((a, b) => a.concat(b));

  const contains = (() =>
    Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
  )();

  const difference = (arr, ...others) => {
    const combined = flatten(others);
    return arr.filter(el => not(contains)(combined, el));
  };


  // map utils
  // ===============================================================================================

  const getKeys = map => Array.from(map.keys());

  const toMap = (() => {
    const convert = obj => {
      const map = new Map();
      const add = key => map.set(key, obj[key]);
      Object.keys(obj).forEach(add);
      return map;
    };
    return obj => obj instanceof Map ? obj : convert(obj);
  })();


  // colors
  // ===============================================================================================

  const isHex = val => /^#/.test(val);
  const isRGB = val => /^rgb/.test(val);

  const toRGB = (() => {
    const expand = hex =>
      hex.length < 7 ? hex.split("").reduce((a, b) => a + b + b) : hex;
    const convert = hex =>
      hex.match(/[\d\w]{2}/g).map(val => parseInt(val, 16));
    return hex => {
      if (isRGB(hex)) return hex;
      const [r, g, b] = compose(expand, convert)(hex);
      return `rgb(${r}, ${g}, ${b})`;
    };
  })();


  // dom
  // ===============================================================================================

  const getElements = el =>
    domArray(typeof el == "string" ? document.querySelectorAll(el) : el);

  const domArray = (() => {
    const collections = [NodeList, HTMLCollection, Set];
    return obj => {
      if (Array.isArray(obj))
        return obj;
      if (collections.some(collection => obj instanceof collection))
        return Array.from(obj);
      if (obj.nodeType)
        return [obj];
      return obj.get();
    };
  })();


  // params
  // ===============================================================================================

  const defaults = new Map();
  ["el", "delay", "begin", "complete", "loop", "direction"].forEach(key => defaults.set(key, null));
  defaults.set("duration", 1000);
  defaults.set("easing", "easeOutElastic");

  const fillBlankParams = (() => {
    const required = getKeys(defaults).filter(key => defaults.get(key));
    const isFilled = params => required.every(param => params.has(param));
    const fill = params => {
      const map = new Map(params);
      required.forEach(param => {
        if (!map.has(param)) map.set(param, defaults.get(param));
      });
      return map;
    };
    return params => isFilled(params) ? params : fill(params);
  })();

  const buildMissingArrays = (() => {
    const propIsArray = curry((params, prop) => Array.isArray(params.get(prop)));
    const isValid = params => getCSSprops(params).every(propIsArray(params));
    const missingArrays = params => getCSSprops(params).filter(not(propIsArray(params)));
    return params => {
      if (isValid(params)) return params;
      const map = new Map(params);
      missingArrays(map).forEach(key => map.set(key, [defaultCSSvalues.get(key), map.get(key)]));
      return map;
    };
  })();

  const addUnits = (() => {
    const hasUnit = value => /\D$/.test(value);
    const addUnit = curry((transformFunction, value) => {
      if (hasUnit(value) || /scale/.test(transformFunction))
        return value;
      if (/rotate|skew/.test(transformFunction))
        return `${value}deg`;
      return `${value}px`;
    });
    const isValid = (params, transformFunctions) =>
      transformFunctions.every(transform => params.get(transform).every(hasUnit));
    return params => {
      const transformFunctions = getCSSprops(params).filter(isTransformFunction);
      if (isValid(params, transformFunctions)) return params;
      const map = new Map(params);
      transformFunctions.forEach(transform =>
        map.set(transform, params.get(transform).map(addUnit(transform))));
      return map;
    };
  })();

  const ensureRGB = (() => {
    const hasHex = curry((params, prop) => params.get(prop).some(isHex));
    const isValid = params => !getSVGprops(params).some(hasHex(params));
    const needConvert = params => getSVGprops(params).filter(hasHex(params));
    return params => {
      if (isValid(params)) return params;
      const map = new Map(params);
      needConvert(params).forEach(key => map.set(key, map.get(key).map(toRGB)));
      return map;
    };
  })();

  const setElements = params =>
    new Map(params).set("el", getElements(params.get("el")));

  const reverseDirection = params => {
    const map = new Map(params);
    getAnimatedProps(params).forEach(prop => map.set(prop, map.get(prop).slice().reverse()));
    return map;
  };

  const setInitialDirection = params =>
    params.get("direction") == "reverse" ? reverseDirection(params) : params;

  const validateParams = compose(
    toMap,
    fillBlankParams,
    buildMissingArrays,
    addUnits,
    ensureRGB,
    setElements,
    setInitialDirection
  );


  // params filters
  // ===============================================================================================

  const getAnimatedProps = (() => {
    const excluded = getKeys(defaults);
    const isProp = param => not(contains)(excluded, param);
    return params => getKeys(params).filter(isProp);
  })();

  const getAnimatedPropsMaps = (() => {
    const isColor = compose(first, isRGB);
    const createPropMap = curry((params, prop) => {
      const [from, to] = params.get(prop).map(splitDigits);
      const map = new Map();
      map.set("prop", prop);
      map.set("from", from);
      map.set("to", to);
      map.set("isTransformFunction", isTransformFunction(prop));
      map.set("isColor", isColor(params.get(prop)));
      if (/\d$/.test(params.get("easing"))) {
        const [easing, frequency] = params.get("easing").split(" ");
        map.set("easing", easing);
        map.set("frequency", frequency);
      }
      else
        map.set("easing", params.get("easing"));
      return map;
    });
    return (params, animatedProps) => getAnimatedProps(params).map(createPropMap(params));
  })();

  const getCSSprops = (() => {
    const isCSSprop = prop => contains(supportedCSSprops, prop);
    return params => getKeys(params).filter(isCSSprop);
  })();

  const getSVGprops = params =>
    difference(getAnimatedProps(params), getCSSprops(params));


  // CSS props
  // ===============================================================================================

  const supportedCSSprops = [
    "opacity",
    "translateX",
    "translateY",
    "scale",
    "rotate",
    "scaleX",
    "scaleY",
    "rotateX",
    "rotateY",
    "perspective",
    "skewX",
    "skewY",
    "translateZ",
    "rotateZ",
    "scaleZ"
  ];

  const defaultCSSvalues = new Map();
  {
    const ones = ["opacity", "scale", "scaleX", "scaleY"];
    const setValue = prop => defaultCSSvalues.set(prop, contains(ones, prop) ? 1 : 0);
    supportedCSSprops.forEach(setValue);
  }

  const isTransformFunction = (() => {
    const transformFunctions = supportedCSSprops.filter(prop => prop != "opacity");
    return str => contains(transformFunctions, str);
  })();

  const hardwareAccelerate = params => {
    const css = getCSSprops(params);
    if (!css.length) return;
    const willChange = [];
    if (css.some(isTransformFunction)) willChange.push("transform");
    if (contains(css, "opacity")) willChange.push("opacity");
    const value = willChange.join();
    params.get("el").forEach(el => {
      if (el.style.willChange) return;
      el.style.willChange = value;
    });
  };


  // value manipulation
  // ===============================================================================================

  const recomposeValue = (digits, others) =>
    others.reduce((a, b, i) => a + digits[i-1] + b);

  const splitDigits = (() => {
    const re = /-?\d*\.?\d+/g;
    const toStr = value => typeof value == "string" ? value : String(value);
    return value => {
      const split = new Map();
      split.set("digits", toStr(value).match(re).map(Number));
      split.set("others", toStr(value).split(re));
      return split;
    };
  })();


  // progress
  // ===============================================================================================

  const getProgress = curry((params, elapsed, prop) => {
    const progress = prop.get("to").get("digits").map((digit, i) => {
      const start = prop.get("from").get("digits")[i];
      if (start == digit) return start;
      const end = digit - start;
      const result = easing[prop.get("easing")](
        elapsed, start, end, params.get("duration"), prop.get("frequency")
      );
      return prop.get("isColor") ? Math.round(result) : result;
    });
    return recomposeValue(progress, prop.get("to").get("others"));
  });

  const getFinalValues = curry((params, prop) => last(params.get(prop.get("prop"))));

  const setProgress = curry((props, progress, el) => {
    let transforms;
    props.forEach((prop, i) => {
      if (prop.get("isTransformFunction")) {
        if (!transforms) transforms = [];
        transforms.push(`${prop.get("prop")}(${progress[i]})`);
        return;
      }
      if (prop.get("prop") == "opacity") {
        el.style.opacity = progress[i];
        return;
      }
      el.setAttribute(prop.get("prop"), progress[i]);
    });
    if (!transforms) return;
    el.style.transform = transforms.join(" ");
  });


  // start / end
  // ===============================================================================================

  const begin = (() => {
    const start = (callback, params) => {
      if (params.get("begin")) params.get("begin")(params.get("el"));
      requestAnimationFrame(callback);
    };
    return (callback, params) =>
      params.get("delay")
      ? setTimeout(() => start(callback, params), params.get("delay"))
      : start(callback, params);
  })();

  const complete = (id, params) => {
    untrack(id);
    if (params.get("complete")) params.get("complete")(params.get("el"));
    if (params.get("loop")) loop(params);
  };

  const loop = params =>
    animate((() => {
      if (params.get("direction") == "alternate")
        return reverseDirection(params);
      if (params.get("direction") == "reverse") {
        const map = new Map(params);
        map.delete("direction");
        return map;
      }
      return params;
    })());


  // animation tracking
  // ===============================================================================================

  let animations = new Map();

  const track = (() => {
    let count = 0;
    return elements => {
      const id = count++;
      animations = new Map(animations).set(id, elements);
      return id;
    };
  })();

  const untrack = id => {
    const map = new Map(animations);
    map.delete(id);
    animations = map;
  };


  // public
  // ===============================================================================================

  const animate = params => {
    const validatedParams = validateParams(params);
    const animatedProps = getAnimatedPropsMaps(validatedParams);
    const id = track(validatedParams.get("el"));
    const time = new Map();

    const step = now => {
      if (!animations.has(id)) return;
      if (!time.has("start")) time.set("start", now);
      time.set("elapsed", now - time.get("start"));

      const running = time.get("elapsed") < validatedParams.get("duration");
      const progress = animatedProps.map(
        running
        ? getProgress(validatedParams, time.get("elapsed"))
        : getFinalValues(validatedParams));

      animations.get(id).forEach(setProgress(animatedProps, progress));
      running ? requestAnimationFrame(step) : complete(id, validatedParams);
    };

    hardwareAccelerate(validatedParams);
    begin(step, validatedParams);
  };

  animate.stop = el => {
    const stopped = getElements(el);
    const map = new Map(animations);
    map.forEach((elements, id) => {
      const remaining = difference(elements, stopped);
      remaining.length ? map.set(id, remaining) : map.delete(id);
    });
    animations = map;
  };

  return animate;
})();


if (typeof module != "undefined" && module.exports)
  module.exports = animate;
