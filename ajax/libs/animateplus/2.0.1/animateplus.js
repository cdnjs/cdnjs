/*
 * Animate Plus v2.0.1
 * Copyright (c) 2017-2018 Benjamin De Cock
 * http://animateplus.com/license
 */


// logic
// =====

const first = ([item]) => item;

const isFunction = operand => typeof operand == "function";


// dom
// ===

const getElements = elements => {
  if (Array.isArray(elements))
    return elements;
  if (!elements || elements.nodeType)
    return [elements];
  return Array.from(typeof elements == "string" ? document.querySelectorAll(elements) : elements);
};

const accelerate = (element, keyframes) =>
  element.style.willChange = keyframes
    ? keyframes.map(({property}) => property).join()
    : "auto";


// color conversion
// ================

const hexPairs = color => {
  const split = color.split("");
  const pairs = color.length < 5
    ? split.map(string => string + string)
    : split.reduce((array, string, index) => {
      if (index % 2)
        array.push(split[index - 1] + string);
      return array;
    }, []);
  if (pairs.length < 4)
    pairs.push("ff");
  return pairs;
};

const convert = color =>
  hexPairs(color).map(string => parseInt(string, 16));

const rgba = hex => {
  const color = hex.slice(1);
  const [r, g, b, a] = convert(color);
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
};


// easing equations
// ================

const pi2 = Math.PI * 2;

const getOffset = (strength, period) =>
  period / pi2 * Math.asin(1 / strength);

const easings = {
  "linear": progress => progress,

  "in-cubic": progress => progress ** 3,
  "in-quartic": progress => progress ** 4,
  "in-quintic": progress => progress ** 5,
  "in-exponential": progress => 1024 ** (progress - 1),
  "in-circular": progress => 1 - Math.sqrt(1 - progress ** 2),
  "in-elastic": (progress, amplitude, period) => {
    const strength = Math.max(amplitude, 1);
    const offset = getOffset(strength, period);
    return -(strength * 2 ** (10 * (progress -= 1)) * Math.sin((progress - offset) * pi2 / period));
  },

  "out-cubic": progress => --progress ** 3 + 1,
  "out-quartic": progress => 1 - --progress ** 4,
  "out-quintic": progress => --progress ** 5 + 1,
  "out-exponential": progress => 1 - 2 ** (-10 * progress),
  "out-circular": progress => Math.sqrt(1 - --progress ** 2),
  "out-elastic": (progress, amplitude, period) => {
    const strength = Math.max(amplitude, 1);
    const offset = getOffset(strength, period);
    return strength * 2 ** (-10 * progress) * Math.sin((progress - offset) * pi2 / period) + 1;
  },

  "in-out-cubic": progress =>
    (progress *= 2) < 1
      ? .5 * progress ** 3
      : .5 * ((progress -= 2) * progress ** 2 + 2),
  "in-out-quartic": progress =>
    (progress *= 2) < 1
      ? .5 * progress ** 4
      : -.5 * ((progress -= 2) * progress ** 3 - 2),
  "in-out-quintic": progress =>
    (progress *= 2) < 1
      ? .5 * progress ** 5
      : .5 * ((progress -= 2) * progress ** 4 + 2),
  "in-out-exponential": progress =>
    (progress *= 2) < 1
      ? .5 * 1024 ** (progress - 1)
      : .5 * (-(2 ** (-10 * (progress - 1))) + 2),
  "in-out-circular": progress =>
    (progress *= 2) < 1
      ? -.5 * (Math.sqrt(1 - progress ** 2) - 1)
      : .5 * (Math.sqrt(1 - (progress -= 2) * progress) + 1),
  "in-out-elastic": (progress, amplitude, period) => {
    const strength = Math.max(amplitude, 1);
    const offset = getOffset(strength, period);
    return (progress *= 2) < 1
      ? -.5 * (strength * 2 ** (10 * (progress -= 1)) * Math.sin((progress - offset) * pi2 / period))
      : strength * 2 ** (-10 * (progress -= 1)) * Math.sin((progress - offset) * pi2 / period) * .5 + 1;
  }
};

const decomposeEasing = string => {
  const [easing, amplitude = 1, period = .4] = string.trim().split(" ");
  return {easing, amplitude, period};
};

const ease = ({easing, amplitude, period}, progress) =>
  easings[easing](progress, amplitude, period);


// keyframes composition
// =====================

const extractRegExp = /-?\d*\.?\d+/g;

const extractStrings = value =>
  value.split(extractRegExp);

const extractNumbers = value =>
  value.match(extractRegExp).map(Number);

const sanitize = values =>
  values.map(value => {
    const string = String(value);
    return string.startsWith("#") ? rgba(string) : string;
  });

const addPropertyKeyframes = (property, values) => {
  const animatable = sanitize(values);
  const strings = extractStrings(first(animatable));
  const numbers = animatable.map(extractNumbers);
  const round = first(strings).startsWith("rgb");
  return {property, strings, numbers, round};
};

const createAnimationKeyframes = (keyframes, index) =>
  Object.entries(keyframes).map(([property, values]) =>
    addPropertyKeyframes(property, isFunction(values) ? values(index) : values));

const getCurrentValue = (from, to, easing) =>
  from + (to - from) * easing;

const recomposeValue = ([from, to], strings, round, easing) =>
  strings.reduce((style, string, index) => {
    const previous = index - 1;
    const value = getCurrentValue(from[previous], to[previous], easing);
    return style + (round && index < 4 ? Math.round(value) : value) + string;
  });

const createStyles = (keyframes, easing) =>
  keyframes.reduce((styles, {property, numbers, strings, round}) => {
    styles[property] = recomposeValue(numbers, strings, round, easing);
    return styles;
  }, {});

const reverseKeyframes = keyframes =>
  keyframes.forEach(({numbers}) => numbers.reverse());


// animation tracking
// ==================

const rAF = {
  all: new Set,
  add(object) {
    if (this.all.add(object).size < 2) requestAnimationFrame(tick);
  }
};

const paused = {};

const trackTime = (timing, now) => {
  if (!timing.startTime) timing.startTime = now;
  timing.elapsed = now - timing.startTime;
};

const resetTime = object =>
  object.startTime = 0;

const getProgress = ({elapsed, duration}) =>
  duration > 0 ? Math.min(elapsed / duration, 1) : 1;

const setSpeed = (speed, value, index) =>
  speed > 0 ? (isFunction(value) ? value(index) : value) / speed : 0;

const addAnimations = (options, resolve) => {
  const {
    elements = null,
    easing = "out-elastic",
    duration = 1000,
    delay: timeout = 0,
    speed = 1,
    loop = false,
    optimize = false,
    direction = "normal",
    change = null,
    ...rest
  } = options;

  const last = {
    totalDuration: -1
  };

  getElements(elements).forEach(async (element, index) => {
    const keyframes = createAnimationKeyframes(rest, index);
    const animation = {
      element,
      keyframes,
      loop,
      optimize,
      direction,
      change,
      easing: decomposeEasing(easing),
      duration: setSpeed(speed, duration, index)
    };

    const animationTimeout = setSpeed(speed, timeout, index);
    const totalDuration = animationTimeout + animation.duration;

    if (direction != "normal")
      reverseKeyframes(keyframes);

    if (optimize)
      accelerate(element, keyframes);

    if (totalDuration > last.totalDuration) {
      last.animation = animation;
      last.totalDuration = totalDuration;
    }

    if (animationTimeout) await delay(animationTimeout);
    rAF.add(animation);
  });

  const {animation} = last;
  if (!animation) return;
  animation.end = resolve;
  animation.options = options;
};

const tick = now => {
  const {all} = rAF;
  all.forEach(object => {
    trackTime(object, now);
    const {element, keyframes, loop, optimize, direction, change, easing, end} = object;
    const progress = getProgress(object);

    // object is an animation
    if (direction) {
      let curve = progress;
      switch (progress) {
        case 0:
          if (direction == "alternate") reverseKeyframes(keyframes);
          break;
        case 1:
          if (loop)
            resetTime(object);
          else {
            all.delete(object);
            if (optimize) accelerate(element);
          }
          if (end) end(object.options);
          break;
        default:
          curve = ease(easing, progress);
      }

      if (change && end) change(curve);
      if (element) Object.assign(element.style, createStyles(keyframes, curve));
      return;
    }

    // object is a delay
    if (progress < 1) return;
    all.delete(object);
    end(object.duration);
  });

  if (all.size) requestAnimationFrame(tick);
};

document.addEventListener("visibilitychange", () => {
  const now = performance.now();

  if (document.hidden) {
    const {all} = rAF;
    paused.time = now;
    paused.all = new Set(all);
    all.clear();
    return;
  }

  const {all, time} = paused;
  if (!all) return;
  const elapsed = now - time;
  requestAnimationFrame(() =>
    all.forEach(object => {
      object.startTime += elapsed;
      rAF.add(object);
    }));
});


// exports
// =======

export default options =>
  new Promise(resolve => addAnimations(options, resolve));

export const delay = duration =>
  new Promise(resolve => rAF.add({
    duration,
    end: resolve
  }));

export const stop = elements => {
  const {all} = rAF;
  const nodes = getElements(elements);
  all.forEach(object => {
    if (nodes.includes(object.element)) all.delete(object);
  });
  return nodes;
};
