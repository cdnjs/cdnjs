(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.scrollama = factory());
}(this, (function () { 'use strict';

  // DOM helper functions

  // public
  function selectAll(selector, parent = document) {
    if (typeof selector === 'string') {
      return Array.from(parent.querySelectorAll(selector));
    } else if (selector instanceof Element) {
      return [selector];
    } else if (selector instanceof NodeList) {
      return Array.from(selector);
    } else if (selector instanceof Array) {
      return selector;
    }
    return [];
  }

  function err$1(msg) {
  	console.error(`scrollama error: ${msg}`);
  }

  function getIndex(node) {
  	return +node.getAttribute("data-scrollama-index");
  }

  function createProgressThreshold(height, threshold) {
      const count = Math.ceil(height / threshold);
      const t = [];
      const ratio = 1 / count;
      for (let i = 0; i < count + 1; i += 1) {
        t.push(i * ratio);
      }
      return t;
    }

  function parseOffset(x) {
  	if (typeof x === "string" && x.indexOf("px") > 0) {
  		const v = +x.replace("px", "");
  		if (!isNaN(v)) return { format: "pixels", value: v };
  		else {
  			err("offset value must be in 'px' format. Fallback to 0.5.");
  			return { format: "percent", value: 0.5 };
  		}
  	} else if (typeof x === "number" || !isNaN(+x)) {
  		if (x > 1) err("offset value is greater than 1. Fallback to 1.");
  		if (x < 0) err("offset value is lower than 0. Fallback to 0.");
  		return { format: "percent", value: Math.min(Math.max(0, x), 1) };
  	}
  	return null;
  }

  function indexSteps(steps) {
  	steps.forEach((step) =>
  		step.node.setAttribute("data-scrollama-index", step.index)
  	);
  }

  function getOffsetTop(node) {
    const { top } = node.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const clientTop = document.body.clientTop || 0;
    return top + scrollTop - clientTop;
  }

  let currentScrollY = 0;
  let comparisonScrollY = 0;
  let direction;

  function onScroll() {
    if (currentScrollY === window.pageYOffset) return;
    currentScrollY = window.pageYOffset;
    if (currentScrollY > comparisonScrollY) direction = "down";
    else if (currentScrollY < comparisonScrollY) direction = "up";
    comparisonScrollY = currentScrollY;
  }

  function setupScroll() {
    document.addEventListener("scroll", onScroll);
  }

  function scrollama() {
    let cb = {};
    let steps = [];
    let globalOffset;

    let progressThreshold = 0;

    let isEnabled = false;
    let isProgressMode = false;
    let isTriggerOnce = false;

    let exclude = [];

    /* HELPERS */
    function reset() {
      cb = {
        stepEnter: () => {},
        stepExit: () => {},
        stepProgress: () => {},
      };
      exclude = [];
    }

    function handleEnable(shouldEnable) {
      if (shouldEnable && !isEnabled) updateObservers();
      if (!shouldEnable && isEnabled) disconnectObservers();
      isEnabled = shouldEnable;
    }

    /* NOTIFY CALLBACKS */
    function notifyProgress(element, progress) {
      const index = getIndex(element);
      const step = steps[index];
      if (progress !== undefined) step.progress = progress;
      const response = { element, index, progress, direction };
      if (step.state === "enter") cb.stepProgress(response);
    }

    function notifyStepEnter(element, check = true) {
      const index = getIndex(element);
      const step = steps[index];
      const response = { element, index, direction };

      step.direction = direction;
      step.state = "enter";

      // if (isPreserveOrder && check && direction !== "up")
      //   notifyOthers(index, "above");
      // if (isPreserveOrder && check && direction === "up")
      //   notifyOthers(index, "below");

      if (!exclude[index]) cb.stepEnter(response);
      if (isTriggerOnce) exclude[index] = true;
    }

    function notifyStepExit(element, check = true) {
      const index = getIndex(element);
      const step = steps[index];

      if (!step.state) return false;

      const response = { element, index, direction };

      if (isProgressMode) {
        if (direction === "down" && step.progress < 1) notifyProgress(element, 1);
        else if (direction === "up" && step.progress > 0)
          notifyProgress(element, 0);
      }

      step.direction = direction;
      step.state = "exit";

      // if (isPreserveOrder && check && direction !== "up")
      //   notifyOthers(index, "below");
      // if (isPreserveOrder && check && direction === "up")
      //   notifyOthers(index, "above");

      cb.stepExit(response);
    }

    /* OBSERVERS - HANDLING */
    function resizeStep([entry]) {
      const index = getIndex(entry.target);
      const step = steps[index];
      const h = entry.target.offsetHeight;
      if (h !== step.height) {
        step.height = h;
        disconnectObserver(step);
        updateStepObserver(step);
        updateResizeObserver(step);
      }
    }

    function intersectStep([entry]) {
      onScroll();

      const { isIntersecting, target } = entry;
      if (isIntersecting) notifyStepEnter(target);
      else notifyStepExit(target);
    }

    function intersectProgress([entry]) {
      const index = getIndex(entry.target);
      const step = steps[index];
      const { isIntersecting, intersectionRatio, target } = entry;
      if (isIntersecting && step.state === "enter")
        notifyProgress(target, intersectionRatio);
    }

    /*  OBSERVERS - CREATION */
    function disconnectObserver({ observers }) {
      Object.keys(observers).map((name) => {
        observers[name].disconnect();
      });
    }

    function disconnectObservers() {
      steps.forEach(disconnectObserver);
    }

    function updateResizeObserver(step) {
      const observer = new ResizeObserver(resizeStep);
      observer.observe(step.node);
      step.observers.resize = observer;
    }

    function updateResizeObservers() {
      steps.forEach(updateResizeObserver);
    }

    function updateStepObserver(step) {
      const h = window.innerHeight;
      const off = step.offset || globalOffset;
      const factor = off.format === "pixels" ? 1 : h;
      const offset = off.value * factor;
      const marginTop = step.height / 2 - offset;
      const marginBottom = step.height / 2 - (h - offset);
      const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;

      const threshold = 0.5;
      const options = { rootMargin, threshold };
      const observer = new IntersectionObserver(intersectStep, options);

      observer.observe(step.node);
      step.observers.step = observer;
    }

    function updateStepObservers() {
      steps.forEach(updateStepObserver);
    }

    function updateProgressObserver(step) {
      const h = window.innerHeight;
      const off = step.offset || globalOffset;
      const factor = off.format === "pixels" ? 1 : h;
      const offset = off.value * factor;
      const marginTop = -offset + step.height;
      const marginBottom = offset - h;
      const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;

      const threshold = createProgressThreshold(step.height, progressThreshold);
      const options = { rootMargin, threshold };
      const observer = new IntersectionObserver(intersectProgress, options);

      observer.observe(step.node);
      step.observers.progress = observer;
    }

    function updateProgressObservers() {
      steps.forEach(updateProgressObserver);
    }

    function updateObservers() {
      disconnectObservers();
      updateResizeObservers();
      updateStepObservers();
      if (isProgressMode) updateProgressObservers();
    }

    /* SETUP */
    const S = {};

    S.setup = ({
      step,
      parent,
      offset = 0.5,
      threshold = 4,
      progress = false,
      order = false,
      once = false,
      debug = false,
    }) => {
      steps = selectAll(step, parent).map((node, index) => ({
        index,
        direction: undefined,
        height: node.offsetHeight,
        node,
        observers: {},
        offset: parseOffset(node.dataset.offset),
        top: getOffsetTop(node),
        progress: 0,
        state: undefined,
      }));

      if (!steps.length) {
        err$1("no step elements");
        return S;
      }

      isProgressMode = progress;
      isTriggerOnce = once;
      progressThreshold = Math.max(1, +threshold);
      globalOffset = parseOffset(offset);
      reset();
      indexSteps(steps);
      handleEnable(true);
      return S;
    };

    S.enable = () => {
      handleEnable(true);
      return S;
    };

    S.disable = () => {
      handleEnable(false);
      return S;
    };

    S.destroy = () => {
      handleEnable(false);
      reset();
      return S;
    };

    S.offset = (x) => {
      if (x === null || x === undefined) return globalOffset.value;
      globalOffset = parseOffset(x);
      updateObservers();
      return S;
    };

    S.onStepEnter = (f) => {
      if (typeof f === "function") cb.stepEnter = f;
      else err$1("onStepEnter requires a function");
      return S;
    };

    S.onStepExit = (f) => {
      if (typeof f === "function") cb.stepExit = f;
      else err$1("onStepExit requires a function");
      return S;
    };

    S.onStepProgress = (f) => {
      if (typeof f === "function") cb.stepProgress = f;
      else err$1("onStepProgress requires a function");
      return S;
    };
    return S;
  }

  setupScroll();

  return scrollama;

})));
