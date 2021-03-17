(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.scrollama = factory());
}(this, (function () { 'use strict';

// DOM helper functions

// public
function selectAll(selector, parent) {
  if ( parent === void 0 ) parent = document;

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

function getOffsetId(id) {
  return ("scrollama__debug-offset--" + id);
}

// SETUP
function setupOffset(ref) {
  var id = ref.id;
  var offsetVal = ref.offsetVal;
  var stepClass = ref.stepClass;

  var el = document.createElement("div");
  el.id = getOffsetId(id);
  el.className = "scrollama__debug-offset";
  el.style.position = "fixed";
  el.style.left = "0";
  el.style.width = "100%";
  el.style.height = "0";
  el.style.borderTop = "2px dashed black";
  el.style.zIndex = "9999";

  var p = document.createElement("p");
  p.innerHTML = "\"." + stepClass + "\" trigger: <span>" + offsetVal + "</span>";
  p.style.fontSize = "12px";
  p.style.fontFamily = "monospace";
  p.style.color = "black";
  p.style.margin = "0";
  p.style.padding = "6px";
  el.appendChild(p);
  document.body.appendChild(el);
}

function setup(ref) {
  var id = ref.id;
  var offsetVal = ref.offsetVal;
  var stepEl = ref.stepEl;

  var stepClass = stepEl[0].className;
  setupOffset({ id: id, offsetVal: offsetVal, stepClass: stepClass });
}

// UPDATE
function update(ref) {
  var id = ref.id;
  var offsetMargin = ref.offsetMargin;
  var offsetVal = ref.offsetVal;
  var format = ref.format;

  var post = format === "pixels" ? "px" : "";
  var idVal = getOffsetId(id);
  var el = document.getElementById(idVal);
  el.style.top = offsetMargin + "px";
  el.querySelector("span").innerText = "" + offsetVal + post;
}

function notifyStep(ref) {
  var id = ref.id;
  var index = ref.index;
  var state = ref.state;

  var prefix = "scrollama__debug-step--" + id + "-" + index;
  var elA = document.getElementById((prefix + "_above"));
  var elB = document.getElementById((prefix + "_below"));
  var display = state === "enter" ? "block" : "none";

  if (elA) { elA.style.display = display; }
  if (elB) { elB.style.display = display; }
}

function scrollama() {
  var OBSERVER_NAMES = [
    "stepAbove",
    "stepBelow",
    "stepProgress",
    "viewportAbove",
    "viewportBelow"
  ];

  var cb = {};
  var io = {};

  var id = null;
  var stepEl = [];
  var stepOffsetHeight = [];
  var stepOffsetTop = [];
  var stepStates = [];

  var offsetVal = 0;
  var offsetMargin = 0;
  var viewH = 0;
  var pageH = 0;
  var previousYOffset = 0;
  var progressThreshold = 0;

  var isReady = false;
  var isEnabled = false;
  var isDebug = false;

  var progressMode = false;
  var preserveOrder = false;
  var triggerOnce = false;

  var direction = "down";
  var format = "percent";

  var exclude = [];

  /* HELPERS */
  function err(msg) {
    console.error(("scrollama error: " + msg));
  }

  function reset() {
    cb = {
      stepEnter: function () {},
      stepExit: function () {},
      stepProgress: function () {}
    };
    io = {};
  }

  function generateInstanceID() {
    var a = "abcdefghijklmnopqrstuv";
    var l = a.length;
    var t = Date.now();
    var r = [0, 0, 0].map(function (d) { return a[Math.floor(Math.random() * l)]; }).join("");
    return ("" + r + t);
  }

  function getOffsetTop(el) {
    var ref = el.getBoundingClientRect();
    var top = ref.top;
    var scrollTop = window.pageYOffset;
    var clientTop = document.body.clientTop || 0;
    return top + scrollTop - clientTop;
  }

  function getPageHeight() {
    var body = document.body;
    var html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  function getIndex(element) {
    return +element.getAttribute("data-scrollama-index");
  }

  function updateDirection() {
    if (window.pageYOffset > previousYOffset) { direction = "down"; }
    else if (window.pageYOffset < previousYOffset) { direction = "up"; }
    previousYOffset = window.pageYOffset;
  }

  function disconnectObserver(name) {
    if (io[name]) { io[name].forEach(function (d) { return d.disconnect(); }); }
  }

  function handleResize() {
    viewH = window.innerHeight;
    pageH = getPageHeight();

    var mult = format === "pixels" ? 1 : viewH;
    offsetMargin = offsetVal * mult;

    if (isReady) {
      stepOffsetHeight = stepEl.map(function (el) { return el.getBoundingClientRect().height; });
      stepOffsetTop = stepEl.map(getOffsetTop);
      if (isEnabled) { updateIO(); }
    }

    if (isDebug) { update({ id: id, offsetMargin: offsetMargin, offsetVal: offsetVal, format: format }); }
  }

  function handleEnable(enable) {
    if (enable && !isEnabled) {
      // enable a disabled scroller
      if (isReady) {
        // enable a ready scroller
        updateIO();
      } else {
        // can't enable an unready scroller
        err("scrollama error: enable() called before scroller was ready");
        isEnabled = false;
        return; // all is not well, don't set the requested state
      }
    }
    if (!enable && isEnabled) {
      // disable an enabled scroller
      OBSERVER_NAMES.forEach(disconnectObserver);
    }
    isEnabled = enable; // all is well, set requested state
  }

  function createThreshold(height) {
    var count = Math.ceil(height / progressThreshold);
    var t = [];
    var ratio = 1 / count;
    for (var i = 0; i < count; i += 1) {
      t.push(i * ratio);
    }
    return t;
  }

  /* NOTIFY CALLBACKS */
  function notifyStepProgress(element, progress) {
    var index = getIndex(element);
    if (progress !== undefined) { stepStates[index].progress = progress; }
    var resp = { element: element, index: index, progress: stepStates[index].progress };

    if (stepStates[index].state === "enter") { cb.stepProgress(resp); }
  }

  function notifyOthers(index, location) {
    if (location === "above") {
      // check if steps above/below were skipped and should be notified first
      for (var i = 0; i < index; i += 1) {
        var ss = stepStates[i];
        if (ss.state !== "enter" && ss.direction !== "down") {
          notifyStepEnter(stepEl[i], "down", false);
          notifyStepExit(stepEl[i], "down");
        } else if (ss.state === "enter") { notifyStepExit(stepEl[i], "down"); }
        // else if (ss.direction === 'up') {
        //   notifyStepEnter(stepEl[i], 'down', false);
        //   notifyStepExit(stepEl[i], 'down');
        // }
      }
    } else if (location === "below") {
      for (var i$1 = stepStates.length - 1; i$1 > index; i$1 -= 1) {
        var ss$1 = stepStates[i$1];
        if (ss$1.state === "enter") {
          notifyStepExit(stepEl[i$1], "up");
        }
        if (ss$1.direction === "down") {
          notifyStepEnter(stepEl[i$1], "up", false);
          notifyStepExit(stepEl[i$1], "up");
        }
      }
    }
  }

  function notifyStepEnter(element, dir, check) {
    if ( check === void 0 ) check = true;

    var index = getIndex(element);
    var resp = { element: element, index: index, direction: dir };

    // store most recent trigger
    stepStates[index].direction = dir;
    stepStates[index].state = "enter";
    if (preserveOrder && check && dir === "down") { notifyOthers(index, "above"); }

    if (preserveOrder && check && dir === "up") { notifyOthers(index, "below"); }

    if (cb.stepEnter && !exclude[index]) {
      cb.stepEnter(resp, stepStates);
      if (isDebug) { notifyStep({ id: id, index: index, state: "enter" }); }
      if (triggerOnce) { exclude[index] = true; }
    }

    if (progressMode) { notifyStepProgress(element); }
  }

  function notifyStepExit(element, dir) {
    var index = getIndex(element);
    var resp = { element: element, index: index, direction: dir };

    if (progressMode) {
      if (dir === "down" && stepStates[index].progress < 1)
        { notifyStepProgress(element, 1); }
      else if (dir === "up" && stepStates[index].progress > 0)
        { notifyStepProgress(element, 0); }
    }

    // store most recent trigger
    stepStates[index].direction = dir;
    stepStates[index].state = "exit";

    cb.stepExit(resp, stepStates);
    if (isDebug) { notifyStep({ id: id, index: index, state: "exit" }); }
  }

  /* OBSERVER - INTERSECT HANDLING */
  // this is good for entering while scrolling down + leaving while scrolling up
  function intersectStepAbove(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var boundingClientRect = entry.boundingClientRect;
    var target = entry.target;

    // bottom = bottom edge of element from top of viewport
    // bottomAdjusted = bottom edge of element from trigger
    var top = boundingClientRect.top;
    var bottom = boundingClientRect.bottom;
    var topAdjusted = top - offsetMargin;
    var bottomAdjusted = bottom - offsetMargin;
    var index = getIndex(target);
    var ss = stepStates[index];

    // entering above is only when topAdjusted is negative
    // and bottomAdjusted is positive
    if (
      isIntersecting &&
      topAdjusted <= 0 &&
      bottomAdjusted >= 0 &&
      direction === "down" &&
      ss.state !== "enter"
    )
      { notifyStepEnter(target, direction); }

    // exiting from above is when topAdjusted is positive and not intersecting
    if (
      !isIntersecting &&
      topAdjusted > 0 &&
      direction === "up" &&
      ss.state === "enter"
    )
      { notifyStepExit(target, direction); }
  }

  // this is good for entering while scrolling up + leaving while scrolling down
  function intersectStepBelow(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var boundingClientRect = entry.boundingClientRect;
    var target = entry.target;

    // bottom = bottom edge of element from top of viewport
    // bottomAdjusted = bottom edge of element from trigger
    var top = boundingClientRect.top;
    var bottom = boundingClientRect.bottom;
    var topAdjusted = top - offsetMargin;
    var bottomAdjusted = bottom - offsetMargin;
    var index = getIndex(target);
    var ss = stepStates[index];

    // entering below is only when bottomAdjusted is positive
    // and topAdjusted is negative
    if (
      isIntersecting &&
      topAdjusted <= 0 &&
      bottomAdjusted >= 0 &&
      direction === "up" &&
      ss.state !== "enter"
    )
      { notifyStepEnter(target, direction); }

    // exiting from above is when bottomAdjusted is negative and not intersecting
    if (
      !isIntersecting &&
      bottomAdjusted < 0 &&
      direction === "down" &&
      ss.state === "enter"
    )
      { notifyStepExit(target, direction); }
  }

  /*
	if there is a scroll event where a step never intersects (therefore
	skipping an enter/exit trigger), use this fallback to detect if it is
	in view
	*/
  function intersectViewportAbove(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var target = entry.target;
    var index = getIndex(target);
    var ss = stepStates[index];

    if (
      isIntersecting &&
      direction === "down" &&
      ss.direction !== "down" &&
      ss.state !== "enter"
    ) {
      notifyStepEnter(target, "down");
      notifyStepExit(target, "down");
    }
  }

  function intersectViewportBelow(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var target = entry.target;
    var index = getIndex(target);
    var ss = stepStates[index];
    if (
      isIntersecting &&
      direction === "up" &&
      ss.direction === "down" &&
      ss.state !== "enter"
    ) {
      notifyStepEnter(target, "up");
      notifyStepExit(target, "up");
    }
  }

  function intersectStepProgress(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var intersectionRatio = entry.intersectionRatio;
    var boundingClientRect = entry.boundingClientRect;
    var target = entry.target;
    var bottom = boundingClientRect.bottom;
    var bottomAdjusted = bottom - offsetMargin;
    if (isIntersecting && bottomAdjusted >= 0) {
      notifyStepProgress(target, +intersectionRatio);
    }
  }

  /*  OBSERVER - CREATION */
  // jump into viewport
  function updateViewportAboveIO() {
    io.viewportAbove = stepEl.map(function (el, i) {
      var marginTop = pageH - stepOffsetTop[i];
      var marginBottom = offsetMargin - viewH - stepOffsetHeight[i];
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectViewportAbove, options);
      obs.observe(el);
      return obs;
    });
  }

  function updateViewportBelowIO() {
    io.viewportBelow = stepEl.map(function (el, i) {
      var marginTop = -offsetMargin - stepOffsetHeight[i];
      var marginBottom = offsetMargin - viewH + stepOffsetHeight[i] + pageH;
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectViewportBelow, options);
      obs.observe(el);
      return obs;
    });
  }

  // look above for intersection
  function updateStepAboveIO() {
    io.stepAbove = stepEl.map(function (el, i) {
      var marginTop = -offsetMargin + stepOffsetHeight[i];
      var marginBottom = offsetMargin - viewH;
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectStepAbove, options);
      obs.observe(el);
      return obs;
    });
  }

  // look below for intersection
  function updateStepBelowIO() {
    io.stepBelow = stepEl.map(function (el, i) {
      var marginTop = -offsetMargin;
      var marginBottom = offsetMargin - viewH + stepOffsetHeight[i];
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectStepBelow, options);
      obs.observe(el);
      return obs;
    });
  }

  // progress progress tracker
  function updateStepProgressIO() {
    io.stepProgress = stepEl.map(function (el, i) {
      var marginTop = stepOffsetHeight[i] - offsetMargin;
      var marginBottom = -viewH + offsetMargin;
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var threshold = createThreshold(stepOffsetHeight[i]);
      var options = { rootMargin: rootMargin, threshold: threshold };
      // console.log(options);
      var obs = new IntersectionObserver(intersectStepProgress, options);
      obs.observe(el);
      return obs;
    });
  }

  function updateIO() {
    OBSERVER_NAMES.forEach(disconnectObserver);

    updateViewportAboveIO();
    updateViewportBelowIO();
    updateStepAboveIO();
    updateStepBelowIO();

    if (progressMode) { updateStepProgressIO(); }
  }

  /* SETUP FUNCTIONS */

  function indexSteps() {
    stepEl.forEach(function (el, i) { return el.setAttribute("data-scrollama-index", i); });
  }

  function setupStates() {
    stepStates = stepEl.map(function () { return ({
      direction: null,
      state: null,
      progress: 0
    }); });
  }

  function addDebug() {
    if (isDebug) { setup({ id: id, stepEl: stepEl, offsetVal: offsetVal }); }
  }

  function isYScrollable(element) {
    var style = window.getComputedStyle(element);
    return (
      (style.overflowY === "scroll" || style.overflowY === "auto") &&
      element.scrollHeight > element.clientHeight
    );
  }

  // recursively search the DOM for a parent container with overflowY: scroll and fixed height
  // ends at document
  function anyScrollableParent(element) {
    if (element && element.nodeType === 1) {
      // check dom elements only, stop at document
      // if a scrollable element is found return the element
      // if not continue to next parent
      return isYScrollable(element)
        ? element
        : anyScrollableParent(element.parentNode);
    }
    return false; // didn't find a scrollable parent
  }

  var S = {};

  S.setup = function (ref) {
    var step = ref.step;
    var parent = ref.parent;
    var offset = ref.offset; if ( offset === void 0 ) offset = 0.5;
    var progress = ref.progress; if ( progress === void 0 ) progress = false;
    var threshold = ref.threshold; if ( threshold === void 0 ) threshold = 4;
    var debug = ref.debug; if ( debug === void 0 ) debug = false;
    var order = ref.order; if ( order === void 0 ) order = true;
    var once = ref.once; if ( once === void 0 ) once = false;

    reset();
    // create id unique to this scrollama instance
    id = generateInstanceID();

    stepEl = selectAll(step, parent);

    if (!stepEl.length) {
      err("no step elements");
      return S;
    }

    // ensure that no step has a scrollable parent element in the dom tree
    // check current step for scrollable parent
    // assume no scrollable parents to start
    var scrollableParent = stepEl.reduce(
      function (foundScrollable, s) { return foundScrollable || anyScrollableParent(s.parentNode); },
      false
    );
    if (scrollableParent) {
      console.error(
        "scrollama error: step elements cannot be children of a scrollable element. Remove any css on the parent element with overflow: scroll; or overflow: auto; on elements with fixed height.",
        scrollableParent
      );
    }

    // options
    isDebug = debug;
    progressMode = progress;
    preserveOrder = order;
    triggerOnce = once;

    S.offsetTrigger(offset);
    progressThreshold = Math.max(1, +threshold);

    isReady = true;

    // customize
    addDebug();
    indexSteps();
    setupStates();
    handleResize();
    S.enable();
    return S;
  };

  S.resize = function () {
    handleResize();
    return S;
  };

  S.enable = function () {
    handleEnable(true);
    return S;
  };

  S.disable = function () {
    handleEnable(false);
    return S;
  };

  S.destroy = function () {
    handleEnable(false);
    reset();
  };

  S.offsetTrigger = function (x) {
    if (x === null) { return offsetVal; }

    if (typeof x === "number") {
      format = "percent";
      if (x > 1) { err("offset value is greater than 1. Fallback to 1."); }
      if (x < 0) { err("offset value is lower than 0. Fallback to 0."); }
      offsetVal = Math.min(Math.max(0, x), 1);
    } else if (typeof x === "string" && x.indexOf("px") > 0) {
      var v = +x.replace("px", "");
      if (!isNaN(v)) {
        format = "pixels";
        offsetVal = v;
      } else {
        err("offset value must be in 'px' format. Fallback to 0.5.");
        offsetVal = 0.5;
      }
    } else {
      err("offset value does not include 'px'. Fallback to 0.5.");
      offsetVal = 0.5;
    }
    return S;
  };

  S.onStepEnter = function (f) {
    if (typeof f === "function") { cb.stepEnter = f; }
    else { err("onStepEnter requires a function"); }
    return S;
  };

  S.onStepExit = function (f) {
    if (typeof f === "function") { cb.stepExit = f; }
    else { err("onStepExit requires a function"); }
    return S;
  };

  S.onStepProgress = function (f) {
    if (typeof f === "function") { cb.stepProgress = f; }
    else { err("onStepProgress requires a function"); }
    return S;
  };

  return S;
}

return scrollama;

})));
