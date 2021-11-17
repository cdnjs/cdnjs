var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList || []);
}
const EVENTS = {
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  FOCUS: "focus",
  BLUR: "blur",
  CLICK: "click",
  INPUT: "input",
  KEY_DOWN: "keydown",
  KEY_UP: "keyup",
  KEY_PRESS: "keypress",
  RESIZE: "resize",
  SCROLL: "scroll",
  TOUCH_START: "touchstart",
  TOUCH_END: "touchend"
};
function getViewportSize() {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth) || 0;
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;
  return { width, height };
}
function on(element, event, handler) {
  element.addEventListener(event, handler);
}
function off(element, event, handler) {
  element.removeEventListener(event, handler);
}
function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
}
function addClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  if (el.className) {
    const classes = el.className.split(" ");
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      el.className = classes.join(" ");
    }
  } else {
    el.className = className;
  }
}
function removeClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  if (el.className) {
    const classes = el.className.split(" ");
    const newClasses = [];
    for (let i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    el.className = newClasses.join(" ");
  }
}
function getClosest(el, selector) {
  let parent;
  let _el = el;
  while (_el) {
    parent = _el.parentElement;
    if (parent && parent.matches(selector)) {
      return parent;
    }
    _el = parent;
  }
  return null;
}
function getParents(el, selector, until = null) {
  const parents = [];
  let parent = el.parentElement;
  while (parent) {
    if (parent.matches(selector)) {
      parents.push(parent);
    } else if (until && (until === parent || parent.matches(until))) {
      break;
    }
    parent = parent.parentElement;
  }
  return parents;
}
function ScrollSpy(element, target = "body", options = {}) {
  this.el = element;
  this.opts = __spreadValues(__spreadValues({}, ScrollSpy.DEFAULTS), options);
  this.opts.target = target;
  if (target === "body") {
    this.scrollElement = window;
  } else {
    this.scrollElement = document.querySelector(`[id=${target}]`);
  }
  this.selector = "li > a";
  this.offsets = [];
  this.targets = [];
  this.activeTarget = null;
  this.scrollHeight = 0;
  if (this.scrollElement) {
    this.refresh();
    this.process();
  }
}
ScrollSpy.DEFAULTS = {
  offset: 10,
  callback: (ele) => 0
};
ScrollSpy.prototype.getScrollHeight = function() {
  return this.scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
};
ScrollSpy.prototype.refresh = function() {
  this.offsets = [];
  this.targets = [];
  this.scrollHeight = this.getScrollHeight();
  const list = nodeListToArray(this.el.querySelectorAll(this.selector));
  const isWindow = this.scrollElement === window;
  list.map((ele) => {
    const href = ele.getAttribute("href");
    if (/^#./.test(href)) {
      const rootEl = isWindow ? document : this.scrollElement;
      const hrefEl = rootEl.querySelector(`[id='${href.slice(1)}']`);
      const offset = isWindow ? hrefEl.getBoundingClientRect().top : hrefEl.offsetTop;
      return [offset, href];
    } else {
      return null;
    }
  }).filter((item) => item).sort((a, b) => a[0] - b[0]).forEach((item) => {
    this.offsets.push(item[0]);
    this.targets.push(item[1]);
  });
};
ScrollSpy.prototype.process = function() {
  const isWindow = this.scrollElement === window;
  const scrollTop = (isWindow ? window.pageYOffset : this.scrollElement.scrollTop) + this.opts.offset;
  const scrollHeight = this.getScrollHeight();
  const scrollElementHeight = isWindow ? getViewportSize().height : this.scrollElement.getBoundingClientRect().height;
  const maxScroll = this.opts.offset + scrollHeight - scrollElementHeight;
  const offsets = this.offsets;
  const targets = this.targets;
  const activeTarget = this.activeTarget;
  let i;
  if (this.scrollHeight !== scrollHeight) {
    this.refresh();
  }
  if (scrollTop >= maxScroll) {
    return activeTarget !== (i = targets[targets.length - 1]) && this.activate(i);
  }
  if (activeTarget && scrollTop < offsets[0]) {
    this.activeTarget = null;
    return this.clear();
  }
  for (i = offsets.length; i--; ) {
    activeTarget !== targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === void 0 || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
  }
};
ScrollSpy.prototype.activate = function(target) {
  this.activeTarget = target;
  this.clear();
  const selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
  const activeCallback = this.opts.callback;
  const active = nodeListToArray(this.el.querySelectorAll(selector));
  active.forEach((ele) => {
    getParents(ele, "li").forEach((item) => {
      addClass(item, "active");
      activeCallback(item);
    });
    if (getParents(ele, ".dropdown-menu").length) {
      addClass(getClosest(ele, "li.dropdown"), "active");
    }
  });
};
ScrollSpy.prototype.clear = function() {
  const list = nodeListToArray(this.el.querySelectorAll(this.selector));
  list.forEach((ele) => {
    getParents(ele, ".active", this.opts.target).forEach((item) => {
      removeClass(item, "active");
    });
  });
};
const INSTANCE = "_uiv_scrollspy_instance";
const events = [EVENTS.RESIZE, EVENTS.SCROLL];
const bind = (el, binding) => {
  unbind(el);
};
const inserted = (el, binding) => {
  const scrollSpy = new ScrollSpy(el, binding.arg, binding.value);
  if (scrollSpy.scrollElement) {
    scrollSpy.handler = () => {
      scrollSpy.process();
    };
    events.forEach((event) => {
      on(scrollSpy.scrollElement, event, scrollSpy.handler);
    });
  }
  el[INSTANCE] = scrollSpy;
};
const unbind = (el) => {
  const instance = el[INSTANCE];
  if (instance && instance.scrollElement) {
    events.forEach((event) => {
      off(instance.scrollElement, event, instance.handler);
    });
    delete el[INSTANCE];
  }
};
const update = (el, binding) => {
  const isArgUpdated = binding.arg !== binding.oldArg;
  const isValueUpdated = binding.value !== binding.oldValue;
  if (isArgUpdated || isValueUpdated) {
    bind(el);
    inserted(el, binding);
  }
};
var scrollspy = {
  beforeMount: bind,
  unmounted: unbind,
  updated: update,
  mounted: inserted
};
export { scrollspy as default };
