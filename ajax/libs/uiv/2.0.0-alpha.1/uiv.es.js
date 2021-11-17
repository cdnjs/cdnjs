var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { openBlock, createElementBlock, renderSlot, createElementVNode, Fragment, renderList, normalizeClass, createCommentVNode, withModifiers, createVNode, resolveComponent, createBlock, withCtx, createTextVNode, toDisplayString, Teleport, withDirectives, vShow, normalizeStyle, resolveDirective, withKeys, vModelText, normalizeProps, mergeProps, h, render, createSlots, vModelDynamic, reactive } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isNumber(obj) {
  return typeof obj === "number";
}
function isString(obj) {
  return typeof obj === "string";
}
function isBoolean(obj) {
  return typeof obj === "boolean";
}
function isPromiseSupported() {
  return typeof window !== "undefined" && isExist(window.Promise);
}
function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
}
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$v = {
  props: {
    modelValue: {
      type: Number,
      default: void 0
    },
    indicators: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5e3
    },
    iconControlLeft: {
      type: String,
      default: "glyphicon glyphicon-chevron-left"
    },
    iconControlRight: {
      type: String,
      default: "glyphicon glyphicon-chevron-right"
    }
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      slides: [],
      activeIndex: 0,
      timeoutId: 0,
      intervalId: 0
    };
  },
  watch: {
    interval() {
      this.startInterval();
    },
    modelValue(index, oldValue) {
      this.run(index, oldValue);
      this.activeIndex = index;
    }
  },
  mounted() {
    if (isExist(this.modelValue)) {
      this.activeIndex = this.modelValue;
    }
    if (this.slides.length > 0) {
      this.$select(this.activeIndex);
    }
    this.startInterval();
  },
  beforeUnmount() {
    this.stopInterval();
  },
  methods: {
    run(newIndex, oldIndex) {
      const currentActiveIndex = oldIndex || 0;
      let direction;
      if (newIndex > currentActiveIndex) {
        direction = ["next", "left"];
      } else {
        direction = ["prev", "right"];
      }
      this.slides[newIndex].slideClass[direction[0]] = true;
      this.$nextTick(() => {
        this.slides[newIndex].$el.offsetHeight;
        this.slides.forEach((slide, i) => {
          if (i === currentActiveIndex) {
            slide.slideClass.active = true;
            slide.slideClass[direction[1]] = true;
          } else if (i === newIndex) {
            slide.slideClass[direction[1]] = true;
          }
        });
        this.timeoutId = setTimeout(() => {
          this.$select(newIndex);
          this.$emit("change", newIndex);
          this.timeoutId = 0;
        }, 600);
      });
    },
    startInterval() {
      this.stopInterval();
      if (this.interval > 0) {
        this.intervalId = setInterval(() => {
          this.next();
        }, this.interval);
      }
    },
    stopInterval() {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    },
    resetAllSlideClass() {
      this.slides.forEach((slide) => {
        slide.slideClass.active = false;
        slide.slideClass.left = false;
        slide.slideClass.right = false;
        slide.slideClass.next = false;
        slide.slideClass.prev = false;
      });
    },
    $select(index) {
      this.resetAllSlideClass();
      this.slides[index].slideClass.active = true;
    },
    select(index) {
      if (this.timeoutId !== 0 || index === this.activeIndex) {
        return;
      }
      if (isExist(this.modelValue)) {
        this.$emit("update:modelValue", index);
      } else {
        this.run(index, this.activeIndex);
        this.activeIndex = index;
      }
    },
    prev() {
      this.select(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1);
    },
    next() {
      this.select(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1);
    }
  }
};
const _hoisted_1$l = { class: "carousel-indicators" };
const _hoisted_2$f = ["onClick"];
const _hoisted_3$b = {
  class: "carousel-inner",
  role: "listbox"
};
const _hoisted_4$a = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Previous", -1);
const _hoisted_5$8 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Next", -1);
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "carousel slide",
    "data-ride": "carousel",
    onMouseenter: _cache[2] || (_cache[2] = (...args) => $options.stopInterval && $options.stopInterval(...args)),
    onMouseleave: _cache[3] || (_cache[3] = (...args) => $options.startInterval && $options.startInterval(...args))
  }, [
    $props.indicators ? renderSlot(_ctx.$slots, "indicators", {
      key: 0,
      select: $options.select,
      activeIndex: $data.activeIndex
    }, () => [
      createElementVNode("ol", _hoisted_1$l, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.slides, (slide, index) => {
          return openBlock(), createElementBlock("li", {
            key: index,
            class: normalizeClass({ active: index === $data.activeIndex }),
            onClick: ($event) => $options.select(index)
          }, null, 10, _hoisted_2$f);
        }), 128))
      ])
    ]) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_3$b, [
      renderSlot(_ctx.$slots, "default")
    ]),
    $props.controls ? (openBlock(), createElementBlock("a", {
      key: 1,
      class: "left carousel-control",
      href: "#",
      role: "button",
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $options.prev(), ["prevent"]))
    }, [
      createElementVNode("span", {
        class: normalizeClass($props.iconControlLeft),
        "aria-hidden": "true"
      }, null, 2),
      _hoisted_4$a
    ])) : createCommentVNode("", true),
    $props.controls ? (openBlock(), createElementBlock("a", {
      key: 2,
      class: "right carousel-control",
      href: "#",
      role: "button",
      onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $options.next(), ["prevent"]))
    }, [
      createElementVNode("span", {
        class: normalizeClass($props.iconControlRight),
        "aria-hidden": "true"
      }, null, 2),
      _hoisted_5$8
    ])) : createCommentVNode("", true)
  ], 32);
}
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$r]]);
function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    const index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}
function range(end, start = 0, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}
function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList || []);
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const _sfc_main$u = {
  data() {
    return {
      slideClass: {
        active: false,
        prev: false,
        next: false,
        left: false,
        right: false
      }
    };
  },
  created() {
    try {
      this.$parent.slides.push(this);
    } catch (e) {
      throw new Error("Slide parent must be Carousel.");
    }
  },
  beforeUnmount() {
    const slides = this.$parent && this.$parent.slides;
    spliceIfExist(slides, this);
  }
};
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["item", $data.slideClass])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Slide = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$q]]);
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
const TRIGGERS = {
  CLICK: "click",
  HOVER: "hover",
  FOCUS: "focus",
  HOVER_FOCUS: "hover-focus",
  OUTSIDE_CLICK: "outside-click",
  MANUAL: "manual"
};
const PLACEMENTS$1 = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
};
function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}
function isIE10() {
  return window.navigator.appVersion.indexOf("MSIE 10") !== -1;
}
function getComputedStyle(el) {
  return window.getComputedStyle(el);
}
function getViewportSize() {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth) || 0;
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;
  return { width, height };
}
let scrollbarWidth = null;
let savedScreenSize = null;
function getScrollbarWidth(recalculate = false) {
  const screenSize = getViewportSize();
  if (scrollbarWidth !== null && !recalculate && screenSize.height === savedScreenSize.height && screenSize.width === savedScreenSize.width) {
    return scrollbarWidth;
  }
  if (document.readyState === "loading") {
    return null;
  }
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  div1.style.width = div2.style.width = div1.style.height = div2.style.height = "100px";
  div1.style.overflow = "scroll";
  div2.style.overflow = "hidden";
  document.body.appendChild(div1);
  document.body.appendChild(div2);
  scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);
  document.body.removeChild(div1);
  document.body.removeChild(div2);
  savedScreenSize = screenSize;
  return scrollbarWidth;
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
function removeFromDom(el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
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
function hasClass(el, className) {
  if (!isElement(el)) {
    return false;
  }
  const classes = el.className.split(" ");
  for (let i = 0, l = classes.length; i < l; i++) {
    if (classes[i] === className) {
      return true;
    }
  }
  return false;
}
function setDropdownPosition(dropdown, trigger, options = {}) {
  const doc = document.documentElement;
  const containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  const containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  const rect = trigger.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  dropdown.style.right = "auto";
  dropdown.style.bottom = "auto";
  if (options.menuRight) {
    dropdown.style.left = containerScrollLeft + rect.left + rect.width - dropdownRect.width + "px";
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + "px";
  }
  if (options.dropup) {
    dropdown.style.top = containerScrollTop + rect.top - dropdownRect.height - 4 + "px";
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + "px";
  }
}
function isAvailableAtPosition(trigger, popup, placement) {
  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const viewPortSize = getViewportSize();
  let top = true;
  let right = true;
  let bottom = true;
  let left = true;
  switch (placement) {
    case PLACEMENTS$1.TOP:
      top = triggerRect.top >= popupRect.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break;
    case PLACEMENTS$1.BOTTOM:
      bottom = triggerRect.bottom + popupRect.height <= viewPortSize.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break;
    case PLACEMENTS$1.RIGHT:
      right = triggerRect.right + popupRect.width <= viewPortSize.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height;
      break;
    case PLACEMENTS$1.LEFT:
      left = triggerRect.left >= popupRect.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height;
      break;
  }
  return top && right && bottom && left;
}
function setTooltipPosition(tooltip2, trigger, placement, auto, appendTo, positionBy, viewport) {
  if (!isElement(tooltip2) || !isElement(trigger)) {
    return;
  }
  const isPopover = tooltip2 && tooltip2.className && tooltip2.className.indexOf("popover") >= 0;
  let containerScrollTop;
  let containerScrollLeft;
  if (!isExist(appendTo) || appendTo === "body" || positionBy === "body") {
    const doc = document.documentElement;
    containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  } else {
    const container = getElementBySelectorOrRef(positionBy || appendTo);
    containerScrollLeft = container.scrollLeft;
    containerScrollTop = container.scrollTop;
  }
  if (auto) {
    const placements = [
      PLACEMENTS$1.RIGHT,
      PLACEMENTS$1.BOTTOM,
      PLACEMENTS$1.LEFT,
      PLACEMENTS$1.TOP
    ];
    const changePlacementClass = (placement2) => {
      placements.forEach((placement3) => {
        removeClass(tooltip2, placement3);
      });
      addClass(tooltip2, placement2);
    };
    if (!isAvailableAtPosition(trigger, tooltip2, placement)) {
      for (let i = 0, l = placements.length; i < l; i++) {
        changePlacementClass(placements[i]);
        if (isAvailableAtPosition(trigger, tooltip2, placements[i])) {
          placement = placements[i];
          break;
        }
      }
      changePlacementClass(placement);
    }
  }
  const rect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip2.getBoundingClientRect();
  let top;
  let left;
  if (placement === PLACEMENTS$1.BOTTOM) {
    top = containerScrollTop + rect.top + rect.height;
    left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  } else if (placement === PLACEMENTS$1.LEFT) {
    top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    left = containerScrollLeft + rect.left - tooltipRect.width;
  } else if (placement === PLACEMENTS$1.RIGHT) {
    top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    left = containerScrollLeft + rect.left + rect.width + 1;
  } else {
    top = containerScrollTop + rect.top - tooltipRect.height;
    left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  }
  let viewportEl;
  if (isString(viewport)) {
    viewportEl = document.querySelector(viewport);
  } else if (isFunction(viewport)) {
    viewportEl = viewport(trigger);
  }
  if (isElement(viewportEl)) {
    const popoverFix = isPopover ? 11 : 0;
    const viewportReact = viewportEl.getBoundingClientRect();
    const viewportTop = containerScrollTop + viewportReact.top;
    const viewportLeft = containerScrollLeft + viewportReact.left;
    const viewportBottom = viewportTop + viewportReact.height;
    const viewportRight = viewportLeft + viewportReact.width;
    if (top < viewportTop) {
      top = viewportTop;
    } else if (top + tooltipRect.height > viewportBottom) {
      top = viewportBottom - tooltipRect.height;
    }
    if (left < viewportLeft) {
      left = viewportLeft;
    } else if (left + tooltipRect.width > viewportRight) {
      left = viewportRight - tooltipRect.width;
    }
    if (placement === PLACEMENTS$1.BOTTOM) {
      top -= popoverFix;
    } else if (placement === PLACEMENTS$1.LEFT) {
      left += popoverFix;
    } else if (placement === PLACEMENTS$1.RIGHT) {
      left -= popoverFix;
    } else {
      top += popoverFix;
    }
  }
  tooltip2.style.top = `${top}px`;
  tooltip2.style.left = `${left}px`;
}
function hasScrollbar(el) {
  const SCROLL = "scroll";
  const hasVScroll = el.scrollHeight > el.clientHeight;
  const style = getComputedStyle(el);
  return hasVScroll || style.overflow === SCROLL || style.overflowY === SCROLL;
}
function toggleBodyOverflow(enable) {
  const MODAL_OPEN = "modal-open";
  const FIXED_CONTENT = ".navbar-fixed-top, .navbar-fixed-bottom";
  const body = document.body;
  if (enable) {
    removeClass(body, MODAL_OPEN);
    body.style.paddingRight = null;
    nodeListToArray(document.querySelectorAll(FIXED_CONTENT)).forEach((node) => {
      node.style.paddingRight = null;
    });
  } else {
    const browsersWithFloatingScrollbar = isIE10() || isIE11();
    const documentHasScrollbar = hasScrollbar(document.documentElement) || hasScrollbar(document.body);
    if (documentHasScrollbar && !browsersWithFloatingScrollbar) {
      const scrollbarWidth2 = getScrollbarWidth();
      body.style.paddingRight = `${scrollbarWidth2}px`;
      nodeListToArray(document.querySelectorAll(FIXED_CONTENT)).forEach((node) => {
        node.style.paddingRight = `${scrollbarWidth2}px`;
      });
    }
    addClass(body, MODAL_OPEN);
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
function focus(el) {
  if (!isElement(el)) {
    return;
  }
  el.getAttribute("tabindex") ? null : el.setAttribute("tabindex", "-1");
  el.focus();
}
const MODAL_BACKDROP = "modal-backdrop";
function getOpenModals() {
  return document.querySelectorAll(`.${MODAL_BACKDROP}`);
}
function getOpenModalNum() {
  return getOpenModals().length;
}
function getElementBySelectorOrRef(q) {
  if (isString(q)) {
    return document.querySelector(q);
  } else if (isElement(q)) {
    return q;
  } else if (isElement(q.$el)) {
    return q.$el;
  } else {
    return null;
  }
}
const COLLAPSE = "collapse";
const IN$1 = "in";
const COLLAPSING = "collapsing";
var _sfc_main$t = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    transition: {
      type: Number,
      default: 350
    }
  },
  emits: ["show", "shown", "hide", "hidden"],
  data() {
    return {
      timeoutId: 0
    };
  },
  watch: {
    modelValue(show) {
      this.toggle(show);
    }
  },
  mounted() {
    const el = this.$el;
    addClass(el, COLLAPSE);
    if (this.modelValue) {
      addClass(el, IN$1);
    }
  },
  methods: {
    toggle(show) {
      clearTimeout(this.timeoutId);
      const el = this.$el;
      if (show) {
        this.$emit("show");
        removeClass(el, COLLAPSE);
        el.style.height = "auto";
        const height = window.getComputedStyle(el).height;
        el.style.height = null;
        addClass(el, COLLAPSING);
        el.offsetHeight;
        el.style.height = height;
        this.timeoutId = setTimeout(() => {
          removeClass(el, COLLAPSING);
          addClass(el, COLLAPSE);
          addClass(el, IN$1);
          el.style.height = null;
          this.timeoutId = 0;
          this.$emit("shown");
        }, this.transition);
      } else {
        this.$emit("hide");
        el.style.height = window.getComputedStyle(el).height;
        removeClass(el, IN$1);
        removeClass(el, COLLAPSE);
        el.offsetHeight;
        el.style.height = null;
        addClass(el, COLLAPSING);
        this.timeoutId = setTimeout(() => {
          addClass(el, COLLAPSE);
          removeClass(el, COLLAPSING);
          el.style.height = null;
          this.timeoutId = 0;
          this.$emit("hidden");
        }, this.transition);
      }
    }
  },
  render() {
    const Tag = this.tag;
    return createVNode(Tag, null, {
      default: () => {
        var _a, _b;
        return [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)];
      }
    });
  }
};
const DEFAULT_TAG = "div";
var _sfc_main$s = {
  props: {
    tag: {
      type: String,
      default: DEFAULT_TAG
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    modelValue: Boolean,
    dropup: {
      type: Boolean,
      default: false
    },
    menuRight: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    notCloseElements: {
      type: Array,
      default: () => []
    },
    positionElement: {
      type: null,
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      show: false,
      triggerEl: void 0
    };
  },
  watch: {
    modelValue(v) {
      this.toggle(v);
    }
  },
  mounted() {
    this.initTrigger();
    if (this.triggerEl) {
      on(this.triggerEl, EVENTS.CLICK, this.toggle);
      on(this.triggerEl, EVENTS.KEY_DOWN, this.onKeyPress);
    }
    on(this.$refs.dropdown, EVENTS.KEY_DOWN, this.onKeyPress);
    on(window, EVENTS.CLICK, this.windowClicked);
    on(window, EVENTS.TOUCH_END, this.windowClicked);
    if (this.modelValue) {
      this.toggle(true);
    }
  },
  beforeUnmount() {
    this.removeDropdownFromBody();
    if (this.triggerEl) {
      off(this.triggerEl, EVENTS.CLICK, this.toggle);
      off(this.triggerEl, EVENTS.KEY_DOWN, this.onKeyPress);
    }
    off(this.$refs.dropdown, EVENTS.KEY_DOWN, this.onKeyPress);
    off(window, EVENTS.CLICK, this.windowClicked);
    off(window, EVENTS.TOUCH_END, this.windowClicked);
  },
  methods: {
    getFocusItem() {
      const dropdownEl = this.$refs.dropdown;
      return dropdownEl.querySelector("li > a:focus");
    },
    onKeyPress(event) {
      if (this.show) {
        const dropdownEl = this.$refs.dropdown;
        const keyCode = event.keyCode;
        if (keyCode === 27) {
          this.toggle(false);
          this.triggerEl && this.triggerEl.focus();
        } else if (keyCode === 13) {
          const currentFocus = this.getFocusItem();
          currentFocus && currentFocus.click();
        } else if (keyCode === 38 || keyCode === 40) {
          event.preventDefault();
          event.stopPropagation();
          const currentFocus = this.getFocusItem();
          const items = dropdownEl.querySelectorAll("li:not(.disabled) > a");
          if (!currentFocus) {
            focus(items[0]);
          } else {
            for (let i = 0; i < items.length; i++) {
              if (currentFocus === items[i]) {
                if (keyCode === 38 && i < items.length > 0) {
                  focus(items[i - 1]);
                } else if (keyCode === 40 && i < items.length - 1) {
                  focus(items[i + 1]);
                }
                break;
              }
            }
          }
        }
      }
    },
    initTrigger() {
      const trigger = this.$el.querySelector('[data-role="trigger"]') || this.$el.querySelector(".dropdown-toggle") || this.$el.firstChild;
      this.triggerEl = trigger && trigger !== this.$refs.dropdown ? trigger : null;
    },
    toggle(show) {
      if (this.disabled) {
        return;
      }
      if (isBoolean(show)) {
        this.show = show;
      } else {
        this.show = !this.show;
      }
      if (this.appendToBody) {
        this.show ? this.appendDropdownToBody() : this.removeDropdownFromBody();
      }
      this.$emit("update:modelValue", this.show);
    },
    windowClicked(event) {
      const target = event.target;
      if (this.show && target) {
        let targetInNotCloseElements = false;
        if (this.notCloseElements) {
          for (let i = 0, l = this.notCloseElements.length; i < l; i++) {
            const isTargetInElement = this.notCloseElements[i].contains(target);
            let shouldBreak = isTargetInElement;
            if (this.appendToBody) {
              const isTargetInDropdown = this.$refs.dropdown.contains(target);
              const isElInElements = this.notCloseElements.indexOf(this.$el) >= 0;
              shouldBreak = isTargetInElement || isTargetInDropdown && isElInElements;
            }
            if (shouldBreak) {
              targetInNotCloseElements = true;
              break;
            }
          }
        }
        const targetInDropdownBody = this.$refs.dropdown.contains(target);
        const targetInTrigger = this.$el.contains(target) && !targetInDropdownBody;
        const targetInDropdownAndIsTouchEvent = targetInDropdownBody && event.type === "touchend";
        if (!targetInTrigger && !targetInNotCloseElements && !targetInDropdownAndIsTouchEvent) {
          this.toggle(false);
        }
      }
    },
    appendDropdownToBody() {
      try {
        const el = this.$refs.dropdown;
        el.style.display = "block";
        document.body.appendChild(el);
        const positionElement = this.positionElement || this.$el;
        setDropdownPosition(el, positionElement, this);
      } catch (e) {
      }
    },
    removeDropdownFromBody() {
      try {
        const el = this.$refs.dropdown;
        el.removeAttribute("style");
        this.$el.appendChild(el);
      } catch (e) {
      }
    }
  },
  render() {
    const Tag = this.tag;
    return createVNode(Tag, {
      "class": {
        "btn-group": this.tag === DEFAULT_TAG,
        dropdown: !this.dropup,
        dropup: this.dropup,
        open: this.show
      }
    }, {
      default: () => {
        var _a, _b, _c, _d;
        return [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a), createVNode("ul", {
          "ref": "dropdown",
          "class": {
            "dropdown-menu": true,
            "dropdown-menu-right": this.menuRight
          }
        }, [(_d = (_c = this.$slots).dropdown) == null ? void 0 : _d.call(_c)])];
      }
    });
  }
};
var defaultLang = {
  uiv: {
    datePicker: {
      clear: "Clear",
      today: "Today",
      month: "Month",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      year: "Year",
      week1: "Mon",
      week2: "Tue",
      week3: "Wed",
      week4: "Thu",
      week5: "Fri",
      week6: "Sat",
      week7: "Sun"
    },
    timePicker: {
      am: "AM",
      pm: "PM"
    },
    modal: {
      cancel: "Cancel",
      ok: "OK"
    },
    multiSelect: {
      placeholder: "Select...",
      filterPlaceholder: "Search..."
    }
  }
};
let lang = defaultLang;
let i18nHandler = function() {
  if ("$t" in this) {
    return this.$t.apply(this, arguments);
  }
  return null;
};
const t = function(path, options) {
  options = options || {};
  let value;
  try {
    value = i18nHandler.apply(this, arguments);
    if (isExist(value) && !options.$$locale) {
      return value;
    }
  } catch (e) {
  }
  const array = path.split(".");
  let current = options.$$locale || lang;
  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1)
      return value;
    if (!value)
      return "";
    current = value;
  }
  return "";
};
const use = function(l) {
  lang = l || lang;
};
const i18n = function(fn) {
  i18nHandler = fn || i18nHandler;
};
var locale = { use, t, i18n };
var Local = {
  methods: {
    t() {
      const args = [];
      for (let i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
      }
      args[1] = __spreadValues({ $$locale: this.locale }, args[1]);
      return t.apply(this, args);
    }
  },
  props: {
    locale: Object
  }
};
var linkMixin = {
  props: {
    href: String,
    target: String,
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};
const _sfc_main$r = {
  props: {
    size: { type: String, default: void 0 },
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "btn-group": !$props.vertical,
      "btn-group-vertical": $props.vertical,
      "btn-group-justified": $props.justified,
      [`btn-group-${$props.size}`]: $props.size
    }),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BtnGroup = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$p]]);
const INPUT_TYPE_CHECKBOX = "checkbox";
const INPUT_TYPE_RADIO = "radio";
const _sfc_main$q = {
  components: { BtnGroup },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    nativeType: {
      type: String,
      default: "button"
    },
    size: {
      type: String,
      default: void 0
    },
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: null,
      default: null
    },
    inputValue: {
      type: null,
      default: null
    },
    inputType: {
      type: String,
      validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO;
      },
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  computed: {
    isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX ? this.modelValue.indexOf(this.inputValue) >= 0 : this.modelValue === this.inputValue;
    },
    classes() {
      return {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        "btn-block": this.block,
        [`btn-${this.type}`]: Boolean(this.type),
        [`btn-${this.size}`]: Boolean(this.size)
      };
    }
  },
  methods: {
    onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        const valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit("update:modelValue", valueCopied);
      } else {
        this.$emit("update:modelValue", this.inputValue);
      }
    }
  }
};
const _hoisted_1$k = ["href", "target"];
const _hoisted_2$e = ["type", "checked", "disabled"];
const _hoisted_3$a = ["type", "disabled"];
const _hoisted_4$9 = ["type", "disabled"];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_BtnGroup = resolveComponent("BtnGroup");
  return _ctx.href ? (openBlock(), createElementBlock("a", {
    key: 0,
    href: _ctx.href,
    target: _ctx.target,
    role: "button",
    class: normalizeClass($options.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$k)) : _ctx.to ? (openBlock(), createBlock(_component_router_link, {
    key: 1,
    to: _ctx.to,
    class: normalizeClass($options.classes),
    event: $props.disabled ? "" : "click",
    replace: _ctx.replace,
    append: _ctx.append,
    exact: _ctx.exact,
    role: "button",
    onClick: $options.onClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["to", "class", "event", "replace", "append", "exact", "onClick"])) : $props.inputType ? (openBlock(), createElementBlock("label", {
    key: 2,
    class: normalizeClass($options.classes),
    onClick: _cache[3] || (_cache[3] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    createElementVNode("input", {
      autocomplete: "off",
      type: $props.inputType,
      checked: $options.isInputActive,
      disabled: $props.disabled,
      onInput: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      onChange: _cache[2] || (_cache[2] = (...args) => $options.onInputChange && $options.onInputChange(...args))
    }, null, 40, _hoisted_2$e),
    renderSlot(_ctx.$slots, "default")
  ], 2)) : $props.justified ? (openBlock(), createBlock(_component_BtnGroup, { key: 3 }, {
    default: withCtx(() => [
      createElementVNode("button", {
        class: normalizeClass($options.classes),
        type: $props.nativeType,
        disabled: $props.disabled,
        onClick: _cache[4] || (_cache[4] = (...args) => $options.onClick && $options.onClick(...args))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_3$a)
    ]),
    _: 3
  })) : (openBlock(), createElementBlock("button", {
    key: 4,
    class: normalizeClass($options.classes),
    type: $props.nativeType,
    disabled: $props.disabled,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_4$9));
}
var Btn = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$o]]);
const IN = "in";
const _sfc_main$p = {
  components: { Btn },
  mixins: [Local],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: { type: String, default: void 0 },
    size: { type: String, default: void 0 },
    backdrop: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    cancelText: { type: String, default: void 0 },
    cancelType: {
      type: String,
      default: "default"
    },
    okText: { type: String, default: void 0 },
    okType: {
      type: String,
      default: "primary"
    },
    dismissBtn: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Number,
      default: 150
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    beforeClose: { type: Function, default: void 0 },
    zOffset: {
      type: Number,
      default: 20
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    displayStyle: {
      type: String,
      default: "block"
    }
  },
  emits: ["update:modelValue", "show", "hide"],
  data() {
    return {
      msg: ""
    };
  },
  computed: {
    modalSizeClass() {
      return {
        [`modal-${this.size}`]: Boolean(this.size)
      };
    }
  },
  watch: {
    modelValue(v) {
      this.$toggle(v);
    }
  },
  mounted() {
    removeFromDom(this.$refs.backdrop);
    on(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose);
    on(window, EVENTS.KEY_UP, this.onKeyPress);
    if (this.modelValue) {
      this.$toggle(true);
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeoutId);
    removeFromDom(this.$refs.backdrop);
    removeFromDom(this.$el);
    if (getOpenModalNum() === 0) {
      toggleBodyOverflow(true);
    }
    off(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose);
    off(window, EVENTS.MOUSE_UP, this.unsuppressBackgroundClose);
    off(window, EVENTS.KEY_UP, this.onKeyPress);
  },
  methods: {
    onKeyPress(event) {
      if (this.keyboard && this.modelValue && event.keyCode === 27) {
        const thisModal = this.$refs.backdrop;
        let thisZIndex = thisModal.style.zIndex;
        thisZIndex = thisZIndex && thisZIndex !== "auto" ? parseInt(thisZIndex) : 0;
        const modals = getOpenModals();
        const modalsLength = modals.length;
        for (let i = 0; i < modalsLength; i++) {
          if (modals[i] !== thisModal) {
            let zIndex = modals[i].style.zIndex;
            zIndex = zIndex && zIndex !== "auto" ? parseInt(zIndex) : 0;
            if (zIndex > thisZIndex) {
              return;
            }
          }
        }
        this.toggle(false);
      }
    },
    toggle(show, msg) {
      let shouldClose = true;
      if (isFunction(this.beforeClose)) {
        shouldClose = this.beforeClose(msg);
      }
      if (isPromiseSupported()) {
        Promise.resolve(shouldClose).then((shouldClose2) => {
          if (!show && shouldClose2) {
            this.msg = msg;
            this.$emit("update:modelValue", show);
          }
        });
      } else {
        if (!show && !shouldClose) {
          return;
        }
        this.msg = msg;
        this.$emit("update:modelValue", show);
      }
    },
    $toggle(show) {
      const modal = this.$el;
      const backdrop = this.$refs.backdrop;
      clearTimeout(this.timeoutId);
      if (show) {
        this.$nextTick(() => {
          const alreadyOpenModalNum = getOpenModalNum();
          document.body.appendChild(backdrop);
          if (this.appendToBody) {
            document.body.appendChild(modal);
          }
          modal.style.display = this.displayStyle;
          modal.scrollTop = 0;
          backdrop.offsetHeight;
          toggleBodyOverflow(false);
          addClass(backdrop, IN);
          addClass(modal, IN);
          if (alreadyOpenModalNum > 0) {
            const modalBaseZ = parseInt(getComputedStyle(modal).zIndex) || 1050;
            const backdropBaseZ = parseInt(getComputedStyle(backdrop).zIndex) || 1040;
            const offset = alreadyOpenModalNum * this.zOffset;
            modal.style.zIndex = `${modalBaseZ + offset}`;
            backdrop.style.zIndex = `${backdropBaseZ + offset}`;
          }
          this.timeoutId = setTimeout(() => {
            if (this.autoFocus) {
              const btn = this.$el.querySelector('[data-action="auto-focus"]');
              if (btn) {
                btn.focus();
                btn.setAttribute("data-focused", "true");
              }
            }
            this.$emit("show");
            this.timeoutId = 0;
          }, this.transition);
        });
      } else {
        removeClass(backdrop, IN);
        removeClass(modal, IN);
        this.timeoutId = setTimeout(() => {
          modal.style.display = "none";
          removeFromDom(backdrop);
          if (this.appendToBody) {
            removeFromDom(modal);
          }
          if (getOpenModalNum() === 0) {
            toggleBodyOverflow(true);
          }
          this.$emit("hide", this.msg || "dismiss");
          this.msg = "";
          this.timeoutId = 0;
          modal.style.zIndex = "";
          backdrop.style.zIndex = "";
        }, this.transition);
      }
    },
    suppressBackgroundClose(event) {
      if (event && event.target === this.$el) {
        return;
      }
      this.isCloseSuppressed = true;
      on(window, "mouseup", this.unsuppressBackgroundClose);
    },
    unsuppressBackgroundClose() {
      if (this.isCloseSuppressed) {
        off(window, "mouseup", this.unsuppressBackgroundClose);
        setTimeout(() => {
          this.isCloseSuppressed = false;
        }, 1);
      }
    },
    backdropClicked(event) {
      if (this.backdrop && !this.isCloseSuppressed) {
        this.toggle(false);
      }
    }
  }
};
const _hoisted_1$j = { class: "modal-content" };
const _hoisted_2$d = {
  key: 0,
  class: "modal-header"
};
const _hoisted_3$9 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xD7", -1);
const _hoisted_4$8 = [
  _hoisted_3$9
];
const _hoisted_5$7 = { class: "modal-title" };
const _hoisted_6$6 = { class: "modal-body" };
const _hoisted_7$4 = {
  key: 1,
  class: "modal-footer"
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("div", {
    tabindex: "-1",
    role: "dialog",
    class: normalizeClass(["modal", { fade: $props.transition > 0 }]),
    onClick: _cache[3] || (_cache[3] = withModifiers((...args) => $options.backdropClicked && $options.backdropClicked(...args), ["self"]))
  }, [
    createElementVNode("div", {
      ref: "dialog",
      class: normalizeClass(["modal-dialog", $options.modalSizeClass]),
      role: "document"
    }, [
      createElementVNode("div", _hoisted_1$j, [
        $props.header ? (openBlock(), createElementBlock("div", _hoisted_2$d, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            $props.dismissBtn ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "close",
              "aria-label": "Close",
              style: { "position": "relative", "z-index": "1060" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.toggle(false))
            }, _hoisted_4$8)) : createCommentVNode("", true),
            createElementVNode("h4", _hoisted_5$7, [
              renderSlot(_ctx.$slots, "title", {}, () => [
                createTextVNode(toDisplayString($props.title), 1)
              ])
            ])
          ])
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_6$6, [
          renderSlot(_ctx.$slots, "default")
        ]),
        $props.footer ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
          renderSlot(_ctx.$slots, "footer", {}, () => [
            createVNode(_component_btn, {
              type: $props.cancelType,
              onClick: _cache[1] || (_cache[1] = ($event) => $options.toggle(false, "cancel"))
            }, {
              default: withCtx(() => [
                createElementVNode("span", null, toDisplayString($props.cancelText || _ctx.t("uiv.modal.cancel")), 1)
              ]),
              _: 1
            }, 8, ["type"]),
            createVNode(_component_btn, {
              type: $props.okType,
              "data-action": "auto-focus",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.toggle(false, "ok"))
            }, {
              default: withCtx(() => [
                createElementVNode("span", null, toDisplayString($props.okText || _ctx.t("uiv.modal.ok")), 1)
              ]),
              _: 1
            }, 8, ["type"])
          ])
        ])) : createCommentVNode("", true)
      ])
    ], 2),
    createElementVNode("div", {
      ref: "backdrop",
      class: normalizeClass(["modal-backdrop", { fade: $props.transition > 0 }])
    }, null, 2)
  ], 2);
}
var Modal = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$n]]);
const ACTIVE_CLASS = "active";
const IN_CLASS$1 = "in";
let id = 0;
const _sfc_main$o = {
  props: {
    title: {
      type: String,
      default: "Tab Title"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tabClasses: {
      type: Object,
      default: () => {
        return {};
      }
    },
    group: { type: String, default: void 0 },
    pullRight: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: null,
      transition: 150,
      uid: `tab_${++id}`,
      isMounted: false
    };
  },
  watch: {
    active(active) {
      if (active) {
        setTimeout(() => {
          addClass(this.$el, ACTIVE_CLASS);
          this.$el.offsetHeight;
          addClass(this.$el, IN_CLASS$1);
          try {
            this.$parent.$emit("changed", this.$parent.activeIndex);
          } catch (e) {
            throw new Error("<tab> parent must be <tabs>.");
          }
        }, this.transition);
      } else {
        removeClass(this.$el, IN_CLASS$1);
        setTimeout(() => {
          removeClass(this.$el, ACTIVE_CLASS);
        }, this.transition);
      }
    }
  },
  created() {
    try {
      this.$parent.tabs.push(this);
    } catch (e) {
      throw new Error("<tab> parent must be <tabs>.");
    }
  },
  mounted() {
    this.isMounted = true;
  },
  beforeUnmount() {
    const tabs = this.$parent && this.$parent.tabs;
    spliceIfExist(tabs, this);
  },
  methods: {
    show() {
      this.$nextTick(() => {
        addClass(this.$el, ACTIVE_CLASS);
        addClass(this.$el, IN_CLASS$1);
      });
    }
  }
};
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["tab-pane", { fade: $data.transition > 0 }]),
    role: "tabpanel"
  }, [
    renderSlot(_ctx.$slots, "default"),
    $data.isMounted && _ctx.$slots.title ? (openBlock(), createBlock(Teleport, {
      key: 0,
      to: "#" + $data.uid.toString()
    }, [
      renderSlot(_ctx.$slots, "title")
    ], 8, ["to"])) : createCommentVNode("", true)
  ], 2);
}
var Tab = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$m]]);
const _sfc_main$n = {
  components: { Dropdown: _sfc_main$s },
  props: {
    modelValue: {
      type: Number,
      validator: (v) => v >= 0,
      default: void 0
    },
    transition: {
      type: Number,
      default: 150
    },
    justified: Boolean,
    pills: Boolean,
    stacked: Boolean,
    customNavClass: { type: null, default: void 0 },
    customContentClass: { type: null, default: void 0 },
    beforeChange: { type: Function, default: void 0 }
  },
  emits: ["update:modelValue", "change", "changed"],
  data() {
    return {
      tabs: [],
      activeIndex: 0
    };
  },
  computed: {
    navClasses() {
      const tabClasses = {
        nav: true,
        "nav-justified": this.justified,
        "nav-tabs": !this.pills,
        "nav-pills": this.pills,
        "nav-stacked": this.stacked && this.pills
      };
      const customNavClass = this.customNavClass;
      if (isExist(customNavClass)) {
        if (isString(customNavClass)) {
          return __spreadProps(__spreadValues({}, tabClasses), {
            [customNavClass]: true
          });
        } else {
          return __spreadValues(__spreadValues({}, tabClasses), customNavClass);
        }
      } else {
        return tabClasses;
      }
    },
    contentClasses() {
      const contentClasses = {
        "tab-content": true
      };
      const customContentClass = this.customContentClass;
      if (isExist(customContentClass)) {
        if (isString(customContentClass)) {
          return __spreadProps(__spreadValues({}, contentClasses), { [customContentClass]: true });
        } else {
          return __spreadValues(__spreadValues({}, contentClasses), customContentClass);
        }
      } else {
        return contentClasses;
      }
    },
    groupedTabs() {
      let tabs = [];
      const hash = {};
      this.tabs.forEach((tab) => {
        if (tab.group) {
          if (hasOwnProperty(hash, tab.group)) {
            tabs[hash[tab.group]].tabs.push(tab);
          } else {
            tabs.push({
              tabs: [tab],
              group: tab.group
            });
            hash[tab.group] = tabs.length - 1;
          }
          if (tab.active) {
            tabs[hash[tab.group]].active = true;
          }
          if (tab.pullRight) {
            tabs[hash[tab.group]].pullRight = true;
          }
        } else {
          tabs.push(tab);
        }
      });
      tabs = tabs.map((tab) => {
        if (Array.isArray(tab.tabs)) {
          tab.hidden = tab.tabs.filter((v) => v.hidden).length === tab.tabs.length;
        }
        return tab;
      });
      return tabs;
    }
  },
  watch: {
    modelValue(value) {
      if (isNumber(value)) {
        this.activeIndex = value;
        this.selectCurrent();
      }
    },
    tabs(tabs) {
      tabs.forEach((tab, index) => {
        tab.transition = this.transition;
        if (index === this.activeIndex) {
          tab.show();
        }
      });
      this.selectCurrent();
    }
  },
  mounted() {
    this.selectCurrent();
  },
  methods: {
    getTabClasses(tab, isSubTab = false) {
      const defaultClasses = {
        active: tab.active,
        disabled: tab.disabled,
        "pull-right": tab.pullRight && !isSubTab
      };
      return __spreadValues(__spreadValues({}, defaultClasses), tab.tabClasses);
    },
    selectCurrent() {
      let found = false;
      this.tabs.forEach((tab, index) => {
        if (index === this.activeIndex) {
          found = !tab.active;
          tab.active = true;
        } else {
          tab.active = false;
        }
      });
      if (found) {
        this.$emit("change", this.activeIndex);
      }
    },
    selectValidate(index) {
      if (isFunction(this.beforeChange)) {
        this.beforeChange(this.activeIndex, index, (result) => {
          if (!isExist(result)) {
            this.$select(index);
          }
        });
      } else {
        this.$select(index);
      }
    },
    select(index) {
      if (!this.tabs[index].disabled && index !== this.activeIndex) {
        this.selectValidate(index);
      }
    },
    $select(index) {
      if (isNumber(this.modelValue)) {
        this.$emit("update:modelValue", index);
      } else {
        this.activeIndex = index;
        this.selectCurrent();
      }
    }
  }
};
const _hoisted_1$i = /* @__PURE__ */ createElementVNode("span", { class: "caret" }, null, -1);
const _hoisted_2$c = ["onClick"];
const _hoisted_3$8 = ["id", "onClick"];
const _hoisted_4$7 = ["onClick", "textContent"];
const _hoisted_5$6 = {
  key: 0,
  class: "pull-right"
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dropdown = resolveComponent("dropdown");
  return openBlock(), createElementBlock("section", null, [
    createElementVNode("ul", {
      class: normalizeClass($options.navClasses),
      role: "tablist"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.groupedTabs, (tab, i) => {
        return openBlock(), createElementBlock(Fragment, { key: i }, [
          tab.tabs ? withDirectives((openBlock(), createBlock(_component_dropdown, {
            key: 0,
            role: "presentation",
            tag: "li",
            class: normalizeClass($options.getTabClasses(tab))
          }, {
            dropdown: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(tab.tabs, (subTab, j) => {
                return withDirectives((openBlock(), createElementBlock("li", {
                  key: `${i}_${j}`,
                  class: normalizeClass($options.getTabClasses(subTab, true))
                }, [
                  createElementVNode("a", {
                    href: "#",
                    onClick: withModifiers(($event) => $options.select($data.tabs.indexOf(subTab)), ["prevent"])
                  }, toDisplayString(subTab.title), 9, _hoisted_2$c)
                ], 2)), [
                  [vShow, !subTab.hidden]
                ]);
              }), 128))
            ]),
            default: withCtx(() => [
              createElementVNode("a", {
                class: "dropdown-toggle",
                role: "tab",
                href: "#",
                onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["prevent"]))
              }, [
                createTextVNode(toDisplayString(tab.group) + " ", 1),
                _hoisted_1$i
              ])
            ]),
            _: 2
          }, 1032, ["class"])), [
            [vShow, !tab.hidden]
          ]) : withDirectives((openBlock(), createElementBlock("li", {
            key: 1,
            role: "presentation",
            class: normalizeClass($options.getTabClasses(tab))
          }, [
            tab.$slots.title ? (openBlock(), createElementBlock("a", {
              key: 0,
              id: tab.uid,
              role: "tab",
              href: "#",
              onClick: withModifiers(($event) => $options.select($data.tabs.indexOf(tab)), ["prevent"])
            }, null, 8, _hoisted_3$8)) : (openBlock(), createElementBlock("a", {
              key: 1,
              role: "tab",
              href: "#",
              onClick: withModifiers(($event) => $options.select($data.tabs.indexOf(tab)), ["prevent"]),
              textContent: toDisplayString(tab.title)
            }, null, 8, _hoisted_4$7))
          ], 2)), [
            [vShow, !tab.hidden]
          ])
        ], 64);
      }), 128)),
      !$props.justified && _ctx.$slots["nav-right"] ? (openBlock(), createElementBlock("li", _hoisted_5$6, [
        renderSlot(_ctx.$slots, "nav-right")
      ])) : createCommentVNode("", true)
    ], 2),
    createElementVNode("div", {
      class: normalizeClass($options.contentClasses)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ]);
}
var Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$l]]);
function pad(value, num) {
  value = value + "";
  for (let i = num - value.length; i > 0; i--) {
    value = "0" + value;
  }
  return value;
}
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
function stringify(date, format) {
  try {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const monthName = monthNames[month - 1];
    return format.replace(/yyyy/g, year).replace(/MMMM/g, monthName).replace(/MMM/g, monthName.substring(0, 3)).replace(/MM/g, pad(month, 2)).replace(/dd/g, pad(day, 2)).replace(/yy/g, year).replace(/M(?!a)/g, month).replace(/d/g, day);
  } catch (e) {
    return "";
  }
}
function convertDateToUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
function getWeekNumber(d) {
  const _d = new Date(Date.UTC(d.year, d.month, d.date));
  _d.setUTCDate(_d.getUTCDate() + 4 - (_d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(_d.getUTCFullYear(), 0, 1));
  return Math.ceil(((_d - yearStart) / 864e5 + 1) / 7);
}
const _sfc_main$m = {
  components: { Btn },
  mixins: [Local],
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    date: { type: Date, default: void 0 },
    today: { type: Date, default: void 0 },
    limit: { type: Object, default: void 0 },
    weekStartsWith: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 },
    dateClass: { type: Function, default: void 0 },
    yearMonthFormatter: { type: Function, default: void 0 },
    weekNumbers: Boolean
  },
  emits: ["date-change", "year-change", "month-change", "view-change"],
  computed: {
    weekDays() {
      const days = [];
      let firstDay = this.weekStartsWith;
      while (days.length < 7) {
        days.push(firstDay++);
        if (firstDay > 6) {
          firstDay = 0;
        }
      }
      return days;
    },
    yearMonthStr() {
      if (this.yearMonthFormatter) {
        return this.yearMonthFormatter(this.year, this.month);
      } else {
        return isExist(this.month) ? `${this.year} ${this.t(`uiv.datePicker.month${this.month + 1}`)}` : this.year;
      }
    },
    monthDayRows() {
      const rows = [];
      const firstDay = new Date(this.year, this.month, 1);
      const prevMonthLastDate = new Date(this.year, this.month, 0).getDate();
      const startIndex = firstDay.getDay();
      const daysNum = daysInMonth(this.month, this.year);
      let weekOffset = 0;
      if (this.weekStartsWith > startIndex) {
        weekOffset = 7 - this.weekStartsWith;
      } else {
        weekOffset = 0 - this.weekStartsWith;
      }
      for (let i = 0; i < 6; i++) {
        rows.push([]);
        for (let j = 0 - weekOffset; j < 7 - weekOffset; j++) {
          const currentIndex = i * 7 + j;
          const date = { year: this.year, disabled: false };
          if (currentIndex < startIndex) {
            date.date = prevMonthLastDate - startIndex + currentIndex + 1;
            if (this.month > 0) {
              date.month = this.month - 1;
            } else {
              date.month = 11;
              date.year--;
            }
          } else if (currentIndex < startIndex + daysNum) {
            date.date = currentIndex - startIndex + 1;
            date.month = this.month;
          } else {
            date.date = currentIndex - startIndex - daysNum + 1;
            if (this.month < 11) {
              date.month = this.month + 1;
            } else {
              date.month = 0;
              date.year++;
            }
          }
          const dateObj = new Date(date.year, date.month, date.date);
          let afterFrom = true;
          let beforeTo = true;
          if (this.limit && this.limit.from) {
            afterFrom = dateObj >= this.limit.from;
          }
          if (this.limit && this.limit.to) {
            beforeTo = dateObj < this.limit.to;
          }
          date.disabled = !afterFrom || !beforeTo;
          if (isFunction(this.dateClass)) {
            date.classes = this.dateClass(dateObj, {
              currentMonth: this.month,
              currentYear: this.year
            });
          } else {
            date.classes = "";
          }
          rows[i].push(date);
        }
      }
      return rows;
    }
  },
  methods: {
    getWeekNumber,
    tWeekName(index) {
      return this.t(`uiv.datePicker.week${index}`);
    },
    getBtnType(date) {
      if (this.date && date.date === this.date.getDate() && date.month === this.date.getMonth() && date.year === this.date.getFullYear()) {
        return "primary";
      } else if (date.date === this.today.getDate() && date.month === this.today.getMonth() && date.year === this.today.getFullYear()) {
        return "info";
      } else {
        return "default";
      }
    },
    select(date) {
      this.$emit("date-change", date);
    },
    goPrevMonth() {
      let month = this.month;
      let year = this.year;
      if (this.month > 0) {
        month--;
      } else {
        month = 11;
        year--;
        this.$emit("year-change", year);
      }
      this.$emit("month-change", month);
    },
    goNextMonth() {
      let month = this.month;
      let year = this.year;
      if (this.month < 11) {
        month++;
      } else {
        month = 0;
        year++;
        this.$emit("year-change", year);
      }
      this.$emit("month-change", month);
    },
    changeView() {
      this.$emit("view-change", "m");
    }
  }
};
const _hoisted_1$h = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$b = ["colspan"];
const _hoisted_3$7 = { align: "center" };
const _hoisted_4$6 = { key: 0 };
const _hoisted_5$5 = { class: "uiv-datepicker-week" };
const _hoisted_6$5 = {
  key: 0,
  class: "text-center",
  style: { "border-right": "1px solid #eee" }
};
const _hoisted_7$3 = { class: "text-muted" };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("table", _hoisted_1$h, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goPrevMonth
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        createElementVNode("td", {
          colspan: $props.weekNumbers ? 6 : 5
        }, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.changeView
          }, {
            default: withCtx(() => [
              createElementVNode("b", null, toDisplayString($options.yearMonthStr), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ], 8, _hoisted_2$b),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goNextMonth
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      createElementVNode("tr", _hoisted_3$7, [
        $props.weekNumbers ? (openBlock(), createElementBlock("td", _hoisted_4$6)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.weekDays, (day, index) => {
          return openBlock(), createElementBlock("td", {
            key: index,
            width: "14.2857142857%"
          }, [
            createElementVNode("small", _hoisted_5$5, toDisplayString($options.tWeekName(day === 0 ? 7 : day)), 1)
          ]);
        }), 128))
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.monthDayRows, (row, i) => {
        return openBlock(), createElementBlock("tr", { key: i }, [
          $props.weekNumbers ? (openBlock(), createElementBlock("td", _hoisted_6$5, [
            createElementVNode("small", _hoisted_7$3, toDisplayString($options.getWeekNumber(row[$props.weekStartsWith])), 1)
          ])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, (d, j) => {
            return openBlock(), createElementBlock("td", {
              key: `${i}_${j}`
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: { "border": "none" },
                "data-action": "select",
                class: normalizeClass(d.classes),
                type: $options.getBtnType(d),
                disabled: d.disabled,
                onClick: ($event) => $options.select(d)
              }, {
                default: withCtx(() => [
                  createElementVNode("span", {
                    "data-action": "select",
                    class: normalizeClass({ "text-muted": $props.month !== d.month })
                  }, toDisplayString(d.date), 3)
                ]),
                _: 2
              }, 1032, ["class", "type", "disabled", "onClick"])
            ]);
          }), 128))
        ]);
      }), 128))
    ])
  ]);
}
var DateView = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$k]]);
const _sfc_main$l = {
  components: { Btn },
  mixins: [Local],
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "month-change", "view-change"],
  data() {
    return {
      rows: []
    };
  },
  mounted() {
    for (let i = 0; i < 4; i++) {
      this.rows.push([]);
      for (let j = 0; j < 3; j++) {
        this.rows[i].push(i * 3 + j + 1);
      }
    }
  },
  methods: {
    tCell(cell) {
      return this.t(`uiv.datePicker.month${cell}`);
    },
    getBtnClass(month) {
      if (month === this.month) {
        return "primary";
      } else {
        return "default";
      }
    },
    goPrevYear() {
      this.$emit("year-change", this.year - 1);
    },
    goNextYear() {
      this.$emit("year-change", this.year + 1);
    },
    changeView(monthIndex) {
      if (isExist(monthIndex)) {
        this.$emit("month-change", monthIndex);
        this.$emit("view-change", "d");
      } else {
        this.$emit("view-change", "y");
      }
    }
  }
};
const _hoisted_1$g = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$a = { colspan: "4" };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("table", _hoisted_1$g, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goPrevYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        createElementVNode("td", _hoisted_2$a, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: _cache[0] || (_cache[0] = ($event) => $options.changeView())
          }, {
            default: withCtx(() => [
              createElementVNode("b", null, toDisplayString($props.year), 1)
            ]),
            _: 1
          })
        ]),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goNextYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.rows, (row, i) => {
        return openBlock(), createElementBlock("tr", { key: i }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, (m, j) => {
            return openBlock(), createElementBlock("td", {
              key: `${i}_${j}`,
              colspan: "2",
              width: "33.333333%"
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: { "border": "none" },
                type: $options.getBtnClass(i * 3 + j),
                onClick: ($event) => $options.changeView(i * 3 + j)
              }, {
                default: withCtx(() => [
                  createElementVNode("span", null, toDisplayString($options.tCell(m)), 1)
                ]),
                _: 2
              }, 1032, ["type", "onClick"])
            ]);
          }), 128))
        ]);
      }), 128))
    ])
  ]);
}
var MonthView = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$j]]);
const _sfc_main$k = {
  components: { Btn },
  props: {
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "view-change"],
  computed: {
    rows() {
      const rows = [];
      const yearGroupStart = this.year - this.year % 20;
      for (let i = 0; i < 4; i++) {
        rows.push([]);
        for (let j = 0; j < 5; j++) {
          rows[i].push(yearGroupStart + i * 5 + j);
        }
      }
      return rows;
    },
    yearStr() {
      const start = this.year - this.year % 20;
      return `${start} ~ ${start + 19}`;
    }
  },
  methods: {
    getBtnClass(year) {
      if (year === this.year) {
        return "primary";
      } else {
        return "default";
      }
    },
    goPrevYear() {
      this.$emit("year-change", this.year - 20);
    },
    goNextYear() {
      this.$emit("year-change", this.year + 20);
    },
    changeView(year) {
      this.$emit("year-change", year);
      this.$emit("view-change", "m");
    }
  }
};
const _hoisted_1$f = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$9 = { colspan: "3" };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("table", _hoisted_1$f, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goPrevYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        createElementVNode("td", _hoisted_2$9, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: { "border": "none" }
          }, {
            default: withCtx(() => [
              createElementVNode("b", null, toDisplayString($options.yearStr), 1)
            ]),
            _: 1
          })
        ]),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goNextYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.rows, (row, i) => {
        return openBlock(), createElementBlock("tr", { key: i }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, (y, j) => {
            return openBlock(), createElementBlock("td", {
              key: `${i}_${j}`,
              width: "20%"
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: { "border": "none" },
                type: $options.getBtnClass(y),
                onClick: ($event) => $options.changeView(y)
              }, {
                default: withCtx(() => [
                  createElementVNode("span", null, toDisplayString(y), 1)
                ]),
                _: 2
              }, 1032, ["type", "onClick"])
            ]);
          }), 128))
        ]);
      }), 128))
    ])
  ]);
}
var YearView = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$i]]);
const _sfc_main$j = {
  components: { DateView, MonthView, YearView, Btn },
  mixins: [Local],
  props: {
    modelValue: { type: null, required: true },
    width: {
      type: Number,
      default: 270
    },
    todayBtn: {
      type: Boolean,
      default: true
    },
    clearBtn: {
      type: Boolean,
      default: true
    },
    closeOnSelected: {
      type: Boolean,
      default: true
    },
    limitFrom: { type: null, default: void 0 },
    limitTo: { type: null, default: void 0 },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    initialView: {
      type: String,
      default: "d"
    },
    dateParser: {
      type: Function,
      default: Date.parse
    },
    dateClass: { type: Function, default: void 0 },
    yearMonthFormatter: { type: Function, default: void 0 },
    weekStartsWith: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 6;
      }
    },
    weekNumbers: Boolean,
    iconControlLeft: {
      type: String,
      default: "glyphicon glyphicon-chevron-left"
    },
    iconControlRight: {
      type: String,
      default: "glyphicon glyphicon-chevron-right"
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      show: false,
      now: new Date(),
      currentMonth: 0,
      currentYear: 0,
      view: "d"
    };
  },
  computed: {
    valueDateObj() {
      const ts = this.dateParser(this.modelValue);
      if (isNaN(ts)) {
        return null;
      } else {
        let date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1e3);
        }
        return date;
      }
    },
    pickerStyle() {
      return {
        width: this.width + "px"
      };
    },
    pickerClass() {
      return {
        "uiv-datepicker": true,
        "uiv-datepicker-date": this.view === "d",
        "uiv-datepicker-month": this.view === "m",
        "uiv-datepicker-year": this.view === "y"
      };
    },
    limit() {
      const limit = {};
      if (this.limitFrom) {
        let limitFrom = this.dateParser(this.limitFrom);
        if (!isNaN(limitFrom)) {
          limitFrom = convertDateToUTC(new Date(limitFrom));
          limitFrom.setHours(0, 0, 0, 0);
          limit.from = limitFrom;
        }
      }
      if (this.limitTo) {
        let limitTo = this.dateParser(this.limitTo);
        if (!isNaN(limitTo)) {
          limitTo = convertDateToUTC(new Date(limitTo));
          limitTo.setHours(0, 0, 0, 0);
          limit.to = limitTo;
        }
      }
      return limit;
    }
  },
  watch: {
    modelValue(val, oldVal) {
      this.setMonthAndYearByValue(val, oldVal);
    }
  },
  mounted() {
    if (this.modelValue) {
      this.setMonthAndYearByValue(this.modelValue);
    } else {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
    }
  },
  methods: {
    setMonthAndYearByValue(val, oldVal) {
      const ts = this.dateParser(val);
      if (!isNaN(ts)) {
        let date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1e3);
        }
        if (this.limit && (this.limit.from && date < this.limit.from || this.limit.to && date >= this.limit.to)) {
          this.$emit("update:modelValue", oldVal || "");
        } else {
          this.currentMonth = date.getMonth();
          this.currentYear = date.getFullYear();
        }
      }
    },
    onMonthChange(month) {
      this.currentMonth = month;
    },
    onYearChange(year) {
      this.currentYear = year;
      this.currentMonth = void 0;
    },
    onDateChange(date) {
      if (date && isNumber(date.date) && isNumber(date.month) && isNumber(date.year)) {
        const _date = new Date(date.year, date.month, date.date);
        this.$emit("update:modelValue", this.format ? stringify(_date, this.format) : _date);
        this.currentMonth = date.month;
        this.currentYear = date.year;
      } else {
        this.$emit("update:modelValue", "");
      }
    },
    onViewChange(view) {
      this.view = view;
    },
    selectToday() {
      this.view = "d";
      this.onDateChange({
        date: this.now.getDate(),
        month: this.now.getMonth(),
        year: this.now.getFullYear()
      });
    },
    clearSelect() {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
      this.onDateChange();
    },
    onPickerClick(event) {
      if (event.target.getAttribute("data-action") !== "select" || !this.closeOnSelected) {
        event.stopPropagation();
      }
    }
  }
};
const _hoisted_1$e = { key: 0 };
const _hoisted_2$8 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_3$6 = { class: "text-center" };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_date_view = resolveComponent("date-view");
  const _component_month_view = resolveComponent("month-view");
  const _component_year_view = resolveComponent("year-view");
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.pickerClass),
    style: normalizeStyle($options.pickerStyle),
    "data-role": "date-picker",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onPickerClick && $options.onPickerClick(...args))
  }, [
    withDirectives(createVNode(_component_date_view, {
      month: $data.currentMonth,
      year: $data.currentYear,
      date: $options.valueDateObj,
      today: $data.now,
      limit: $options.limit,
      "week-starts-with": $props.weekStartsWith,
      "icon-control-left": $props.iconControlLeft,
      "icon-control-right": $props.iconControlRight,
      "date-class": $props.dateClass,
      "year-month-formatter": $props.yearMonthFormatter,
      "week-numbers": $props.weekNumbers,
      locale: _ctx.locale,
      onMonthChange: $options.onMonthChange,
      onYearChange: $options.onYearChange,
      onDateChange: $options.onDateChange,
      onViewChange: $options.onViewChange
    }, null, 8, ["month", "year", "date", "today", "limit", "week-starts-with", "icon-control-left", "icon-control-right", "date-class", "year-month-formatter", "week-numbers", "locale", "onMonthChange", "onYearChange", "onDateChange", "onViewChange"]), [
      [vShow, $data.view === "d"]
    ]),
    withDirectives(createVNode(_component_month_view, {
      month: $data.currentMonth,
      year: $data.currentYear,
      "icon-control-left": $props.iconControlLeft,
      "icon-control-right": $props.iconControlRight,
      locale: _ctx.locale,
      onMonthChange: $options.onMonthChange,
      onYearChange: $options.onYearChange,
      onViewChange: $options.onViewChange
    }, null, 8, ["month", "year", "icon-control-left", "icon-control-right", "locale", "onMonthChange", "onYearChange", "onViewChange"]), [
      [vShow, $data.view === "m"]
    ]),
    withDirectives(createVNode(_component_year_view, {
      year: $data.currentYear,
      "icon-control-left": $props.iconControlLeft,
      "icon-control-right": $props.iconControlRight,
      onYearChange: $options.onYearChange,
      onViewChange: $options.onViewChange
    }, null, 8, ["year", "icon-control-left", "icon-control-right", "onYearChange", "onViewChange"]), [
      [vShow, $data.view === "y"]
    ]),
    $props.todayBtn || $props.clearBtn ? (openBlock(), createElementBlock("div", _hoisted_1$e, [
      _hoisted_2$8,
      createElementVNode("div", _hoisted_3$6, [
        $props.todayBtn ? (openBlock(), createBlock(_component_btn, {
          key: 0,
          "data-action": "select",
          "data-type": "today",
          type: "info",
          size: "sm",
          onClick: $options.selectToday,
          textContent: toDisplayString(_ctx.t("uiv.datePicker.today"))
        }, null, 8, ["onClick", "textContent"])) : createCommentVNode("", true),
        $props.clearBtn ? (openBlock(), createBlock(_component_btn, {
          key: 1,
          "data-action": "select",
          "data-type": "clear",
          size: "sm",
          onClick: $options.clearSelect,
          textContent: toDisplayString(_ctx.t("uiv.datePicker.clear"))
        }, null, 8, ["onClick", "textContent"])) : createCommentVNode("", true)
      ])
    ])) : createCommentVNode("", true)
  ], 6);
}
var DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$h]]);
const HANDLER = "_uiv_scroll_handler";
const events$1 = [EVENTS.RESIZE, EVENTS.SCROLL];
const bind$3 = (el, binding) => {
  const callback = binding.value;
  if (!isFunction(callback)) {
    return;
  }
  unbind$3(el);
  el[HANDLER] = callback;
  events$1.forEach((event) => {
    on(window, event, el[HANDLER]);
  });
};
const unbind$3 = (el) => {
  events$1.forEach((event) => {
    off(window, event, el[HANDLER]);
  });
  delete el[HANDLER];
};
const update$3 = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    bind$3(el, binding);
  }
};
var scroll = { mounted: bind$3, unmounted: unbind$3, updated: update$3 };
const _sfc_main$i = {
  directives: {
    scroll
  },
  props: {
    offset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      affixed: false
    };
  },
  computed: {
    classes() {
      return {
        affix: this.affixed
      };
    },
    styles() {
      return {
        top: this.affixed ? this.offset + "px" : null
      };
    }
  },
  methods: {
    onScroll() {
      if (!(this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length)) {
        return;
      }
      const scroll2 = {};
      const element = {};
      const rect = this.$el.getBoundingClientRect();
      const body = document.body;
      const types = ["Top", "Left"];
      types.forEach((type) => {
        const t2 = type.toLowerCase();
        scroll2[t2] = window["page" + (type === "Top" ? "Y" : "X") + "Offset"];
        element[t2] = scroll2[t2] + rect[t2] - (this.$el["client" + type] || body["client" + type] || 0);
      });
      const fix = scroll2.top > element.top - this.offset;
      if (this.affixed !== fix) {
        this.affixed = fix;
        this.$emit(this.affixed ? "affix" : "unfix");
        this.$nextTick(() => {
          this.$emit(this.affixed ? "affixed" : "unfixed");
        });
      }
    }
  }
};
const _hoisted_1$d = { class: "hidden-print" };
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_scroll = resolveDirective("scroll");
  return openBlock(), createElementBlock("div", _hoisted_1$d, [
    withDirectives(createElementVNode("div", {
      class: normalizeClass($options.classes),
      style: normalizeStyle($options.styles)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 6), [
      [_directive_scroll, $options.onScroll]
    ])
  ]);
}
var Affix = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$g]]);
const _sfc_main$h = {
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "info"
    }
  },
  emits: ["dismissed"],
  data() {
    return {
      timeout: 0
    };
  },
  computed: {
    alertClass() {
      return {
        alert: true,
        [`alert-${this.type}`]: Boolean(this.type),
        "alert-dismissible": this.dismissible
      };
    }
  },
  mounted() {
    if (this.duration > 0) {
      this.timeout = setTimeout(this.closeAlert, this.duration);
    }
  },
  unmounted() {
    clearTimeout(this.timeout);
  },
  methods: {
    closeAlert() {
      clearTimeout(this.timeout);
      this.$emit("dismissed");
    }
  }
};
const _hoisted_1$c = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xD7", -1);
const _hoisted_2$7 = [
  _hoisted_1$c
];
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    role: "alert",
    class: normalizeClass($options.alertClass)
  }, [
    $props.dismissible ? (openBlock(), createElementBlock("button", {
      key: 0,
      type: "button",
      class: "close",
      "aria-label": "Close",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.closeAlert && $options.closeAlert(...args))
    }, _hoisted_2$7)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Alert = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$f]]);
const _sfc_main$g = {
  props: {
    modelValue: {
      type: Number,
      required: true,
      validator: (v) => v >= 1
    },
    boundaryLinks: {
      type: Boolean,
      default: false
    },
    directionLinks: {
      type: Boolean,
      default: true
    },
    size: { type: String, default: void 0 },
    align: { type: String, default: void 0 },
    totalPage: {
      type: Number,
      required: true,
      validator: (v) => v >= 0
    },
    maxSize: {
      type: Number,
      default: 5,
      validator: (v) => v >= 0
    },
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      sliceStart: 0
    };
  },
  computed: {
    navClasses() {
      return {
        [`text-${this.align}`]: Boolean(this.align)
      };
    },
    classes() {
      return {
        [`pagination-${this.size}`]: Boolean(this.size)
      };
    },
    sliceArray() {
      return range(this.totalPage).slice(this.sliceStart, this.sliceStart + this.maxSize);
    }
  },
  created() {
    this.$watch((vm) => [vm.modelValue, vm.maxSize, vm.totalPage].join(), this.calculateSliceStart, {
      immediate: true
    });
  },
  methods: {
    calculateSliceStart() {
      const currentPage = this.modelValue;
      const chunkSize = this.maxSize;
      const currentChunkStart = this.sliceStart;
      const currentChunkEnd = currentChunkStart + chunkSize;
      if (currentPage > currentChunkEnd) {
        const lastChunkStart = this.totalPage - chunkSize;
        if (currentPage > lastChunkStart) {
          this.sliceStart = lastChunkStart;
        } else {
          this.sliceStart = currentPage - 1;
        }
      } else if (currentPage < currentChunkStart + 1) {
        if (currentPage > chunkSize) {
          this.sliceStart = currentPage - chunkSize;
        } else {
          this.sliceStart = 0;
        }
      }
    },
    onPageChange(page) {
      if (!this.disabled && page > 0 && page <= this.totalPage && page !== this.modelValue) {
        this.$emit("update:modelValue", page);
        this.$emit("change", page);
      }
    },
    toPage(pre) {
      if (this.disabled) {
        return;
      }
      const chunkSize = this.maxSize;
      const currentChunkStart = this.sliceStart;
      const lastChunkStart = this.totalPage - chunkSize;
      const start = pre ? currentChunkStart - chunkSize : currentChunkStart + chunkSize;
      if (start < 0) {
        this.sliceStart = 0;
      } else if (start > lastChunkStart) {
        this.sliceStart = lastChunkStart;
      } else {
        this.sliceStart = start;
      }
    }
  }
};
const _hoisted_1$b = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xAB", -1);
const _hoisted_2$6 = [
  _hoisted_1$b
];
const _hoisted_3$5 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u2039", -1);
const _hoisted_4$5 = [
  _hoisted_3$5
];
const _hoisted_5$4 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u2026", -1);
const _hoisted_6$4 = [
  _hoisted_5$4
];
const _hoisted_7$2 = ["onClick"];
const _hoisted_8$2 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u2026", -1);
const _hoisted_9$2 = [
  _hoisted_8$2
];
const _hoisted_10$2 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u203A", -1);
const _hoisted_11$1 = [
  _hoisted_10$2
];
const _hoisted_12$1 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xBB", -1);
const _hoisted_13$1 = [
  _hoisted_12$1
];
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("nav", {
    "aria-label": "Page navigation",
    class: normalizeClass($options.navClasses)
  }, [
    createElementVNode("ul", {
      class: normalizeClass(["pagination", $options.classes])
    }, [
      $props.boundaryLinks ? (openBlock(), createElementBlock("li", {
        key: 0,
        class: normalizeClass({ disabled: $props.modelValue <= 1 || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "First",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $options.onPageChange(1), ["prevent"]))
        }, _hoisted_2$6)
      ], 2)) : createCommentVNode("", true),
      $props.directionLinks ? (openBlock(), createElementBlock("li", {
        key: 1,
        class: normalizeClass({ disabled: $props.modelValue <= 1 || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Previous",
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $options.onPageChange($props.modelValue - 1), ["prevent"]))
        }, _hoisted_4$5)
      ], 2)) : createCommentVNode("", true),
      $data.sliceStart > 0 ? (openBlock(), createElementBlock("li", {
        key: 2,
        class: normalizeClass({ disabled: $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Previous group",
          onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $options.toPage(1), ["prevent"]))
        }, _hoisted_6$4)
      ], 2)) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.sliceArray, (item) => {
        return openBlock(), createElementBlock("li", {
          key: item,
          class: normalizeClass({ active: $props.modelValue === item + 1, disabled: $props.disabled })
        }, [
          createElementVNode("a", {
            href: "#",
            role: "button",
            onClick: withModifiers(($event) => $options.onPageChange(item + 1), ["prevent"])
          }, toDisplayString(item + 1), 9, _hoisted_7$2)
        ], 2);
      }), 128)),
      $data.sliceStart < $props.totalPage - $props.maxSize ? (openBlock(), createElementBlock("li", {
        key: 3,
        class: normalizeClass({ disabled: $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Next group",
          onClick: _cache[3] || (_cache[3] = withModifiers(($event) => $options.toPage(0), ["prevent"]))
        }, _hoisted_9$2)
      ], 2)) : createCommentVNode("", true),
      $props.directionLinks ? (openBlock(), createElementBlock("li", {
        key: 4,
        class: normalizeClass({ disabled: $props.modelValue >= $props.totalPage || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Next",
          onClick: _cache[4] || (_cache[4] = withModifiers(($event) => $options.onPageChange(_ctx.value + 1), ["prevent"]))
        }, _hoisted_11$1)
      ], 2)) : createCommentVNode("", true),
      $props.boundaryLinks ? (openBlock(), createElementBlock("li", {
        key: 5,
        class: normalizeClass({ disabled: $props.modelValue >= $props.totalPage || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Last",
          onClick: _cache[5] || (_cache[5] = withModifiers(($event) => $options.onPageChange($props.totalPage), ["prevent"]))
        }, _hoisted_13$1)
      ], 2)) : createCommentVNode("", true)
    ], 2)
  ], 2);
}
var Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$e]]);
const SHOW_CLASS = "in";
var popupMixin = {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "span"
    },
    placement: {
      type: String,
      default: PLACEMENTS$1.TOP
    },
    autoPlacement: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: null,
      default: "body"
    },
    positionBy: {
      type: null,
      default: null
    },
    transition: {
      type: Number,
      default: 150
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    showDelay: {
      type: Number,
      default: 0
    },
    enable: {
      type: Boolean,
      default: true
    },
    enterable: {
      type: Boolean,
      default: true
    },
    target: null,
    viewport: null,
    customClass: String
  },
  data() {
    return {
      triggerEl: null,
      hideTimeoutId: 0,
      showTimeoutId: 0,
      transitionTimeoutId: 0,
      autoTimeoutId: 0
    };
  },
  watch: {
    modelValue(v) {
      v ? this.show() : this.hide();
    },
    trigger() {
      this.clearListeners();
      this.initListeners();
    },
    target(value) {
      this.clearListeners();
      this.initTriggerElByTarget(value);
      this.initListeners();
    },
    allContent(value) {
      if (this.isNotEmpty()) {
        this.$nextTick(() => {
          if (this.isShown()) {
            this.resetPosition();
          }
        });
      } else {
        this.hide();
      }
    },
    enable(value) {
      if (!value) {
        this.hide();
      }
    }
  },
  mounted() {
    removeFromDom(this.$refs.popup);
    this.$nextTick(() => {
      this.initTriggerElByTarget(this.target);
      this.initListeners();
      if (this.modelValue) {
        this.show();
      }
    });
  },
  beforeDestroy() {
    this.clearListeners();
    removeFromDom(this.$refs.popup);
  },
  methods: {
    initTriggerElByTarget(target) {
      if (target) {
        this.triggerEl = getElementBySelectorOrRef(target);
      } else {
        const trigger = this.$el.querySelector('[data-role="trigger"]');
        if (trigger) {
          this.triggerEl = trigger;
        } else {
          const firstChild = this.$el.querySelector("*");
          this.triggerEl = firstChild === this.$refs.popup ? null : firstChild;
        }
      }
    },
    initListeners() {
      if (this.triggerEl) {
        if (this.trigger === TRIGGERS.HOVER) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.show);
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide);
        } else if (this.trigger === TRIGGERS.FOCUS) {
          on(this.triggerEl, EVENTS.FOCUS, this.show);
          on(this.triggerEl, EVENTS.BLUR, this.hide);
        } else if (this.trigger === TRIGGERS.HOVER_FOCUS) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto);
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto);
          on(this.triggerEl, EVENTS.FOCUS, this.handleAuto);
          on(this.triggerEl, EVENTS.BLUR, this.handleAuto);
        } else if (this.trigger === TRIGGERS.CLICK || this.trigger === TRIGGERS.OUTSIDE_CLICK) {
          on(this.triggerEl, EVENTS.CLICK, this.toggle);
        }
      }
      on(window, EVENTS.CLICK, this.windowClicked);
    },
    clearListeners() {
      if (this.triggerEl) {
        off(this.triggerEl, EVENTS.FOCUS, this.show);
        off(this.triggerEl, EVENTS.BLUR, this.hide);
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.show);
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide);
        off(this.triggerEl, EVENTS.CLICK, this.toggle);
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto);
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto);
        off(this.triggerEl, EVENTS.FOCUS, this.handleAuto);
        off(this.triggerEl, EVENTS.BLUR, this.handleAuto);
      }
      off(window, EVENTS.CLICK, this.windowClicked);
      this.clearTimeouts();
    },
    clearTimeouts() {
      if (this.hideTimeoutId) {
        clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = 0;
      }
      if (this.showTimeoutId) {
        clearTimeout(this.showTimeoutId);
        this.showTimeoutId = 0;
      }
      if (this.transitionTimeoutId) {
        clearTimeout(this.transitionTimeoutId);
        this.transitionTimeoutId = 0;
      }
      if (this.autoTimeoutId) {
        clearTimeout(this.autoTimeoutId);
        this.autoTimeoutId = 0;
      }
    },
    resetPosition() {
      const popup = this.$refs.popup;
      if (popup) {
        setTooltipPosition(popup, this.triggerEl, this.placement, this.autoPlacement, this.appendTo, this.positionBy, this.viewport);
        popup.offsetHeight;
      }
    },
    hideOnLeave() {
      if (this.trigger === TRIGGERS.HOVER || this.trigger === TRIGGERS.HOVER_FOCUS && !this.triggerEl.matches(":focus")) {
        this.$hide();
      }
    },
    toggle() {
      if (this.isShown()) {
        this.hide();
      } else {
        this.show();
      }
    },
    show() {
      if (this.enable && this.triggerEl && this.isNotEmpty() && !this.isShown()) {
        const popUpAppendedContainer = this.hideTimeoutId > 0;
        if (popUpAppendedContainer) {
          clearTimeout(this.hideTimeoutId);
          this.hideTimeoutId = 0;
        }
        if (this.transitionTimeoutId > 0) {
          clearTimeout(this.transitionTimeoutId);
          this.transitionTimeoutId = 0;
        }
        clearTimeout(this.showTimeoutId);
        this.showTimeoutId = setTimeout(() => {
          this.showTimeoutId = 0;
          const popup = this.$refs.popup;
          if (popup) {
            const alreadyOpenModalNum = getOpenModalNum();
            if (alreadyOpenModalNum > 1) {
              const defaultZ = this.name === "popover" ? 1060 : 1070;
              const offset = (alreadyOpenModalNum - 1) * 20;
              popup.style.zIndex = `${defaultZ + offset}`;
            }
            if (!popUpAppendedContainer) {
              popup.className = `${this.name} ${this.placement} ${this.customClass ? this.customClass : ""} fade`;
              const container = getElementBySelectorOrRef(this.appendTo);
              container.appendChild(popup);
              this.resetPosition();
            }
            addClass(popup, SHOW_CLASS);
            this.$emit("update:modelValue", true);
            this.$emit("show");
          }
        }, this.showDelay);
      }
    },
    hide() {
      if (this.showTimeoutId > 0) {
        clearTimeout(this.showTimeoutId);
        this.showTimeoutId = 0;
      }
      if (!this.isShown()) {
        return;
      }
      if (this.enterable && (this.trigger === TRIGGERS.HOVER || this.trigger === TRIGGERS.HOVER_FOCUS)) {
        clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = setTimeout(() => {
          this.hideTimeoutId = 0;
          const popup = this.$refs.popup;
          if (popup && !popup.matches(":hover")) {
            this.$hide();
          }
        }, 100);
      } else {
        this.$hide();
      }
    },
    $hide() {
      if (this.isShown()) {
        clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = setTimeout(() => {
          this.hideTimeoutId = 0;
          removeClass(this.$refs.popup, SHOW_CLASS);
          this.transitionTimeoutId = setTimeout(() => {
            this.transitionTimeoutId = 0;
            removeFromDom(this.$refs.popup);
            this.$emit("update:modelValue", false);
            this.$emit("hide");
          }, this.transition);
        }, this.hideDelay);
      }
    },
    isShown() {
      return hasClass(this.$refs.popup, SHOW_CLASS);
    },
    windowClicked(event) {
      if (this.triggerEl && isFunction(this.triggerEl.contains) && !this.triggerEl.contains(event.target) && this.trigger === TRIGGERS.OUTSIDE_CLICK && !(this.$refs.popup && this.$refs.popup.contains(event.target)) && this.isShown()) {
        this.hide();
      }
    },
    handleAuto() {
      clearTimeout(this.autoTimeoutId);
      this.autoTimeoutId = setTimeout(() => {
        this.autoTimeoutId = 0;
        if (this.triggerEl.matches(":hover, :focus")) {
          this.show();
        } else {
          this.hide();
        }
      }, 20);
    }
  }
};
var _sfc_main$f = {
  mixins: [popupMixin],
  props: {
    text: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: TRIGGERS.HOVER_FOCUS
    }
  },
  data() {
    return {
      name: "tooltip"
    };
  },
  computed: {
    allContent() {
      return this.text;
    }
  },
  methods: {
    isNotEmpty() {
      return this.text;
    }
  },
  render() {
    const Tag = this.tag;
    return createVNode(Tag, null, {
      default: () => {
        var _a, _b;
        return [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a), createVNode("div", {
          "ref": "popup",
          "role": "tooltip",
          "onMouseleave": this.hideOnLeave
        }, [createVNode("div", {
          "class": "tooltip-arrow"
        }, null), createVNode("div", {
          "class": "tooltip-inner"
        }, [this.text])])];
      }
    });
  }
};
var _sfc_main$e = {
  mixins: [popupMixin],
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: TRIGGERS.OUTSIDE_CLICK
    }
  },
  data() {
    return {
      name: "popover"
    };
  },
  computed: {
    allContent() {
      return this.title + this.content;
    }
  },
  methods: {
    isNotEmpty() {
      return this.title || this.content || this.$slots.popover;
    }
  },
  render() {
    const Tag = this.tag;
    return createVNode(Tag, null, {
      default: () => {
        var _a, _b, _c, _d;
        return [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a), createVNode("div", {
          "style": {
            display: "block"
          },
          "ref": "popup",
          "onMouseleave": this.hideOnLeave
        }, [createVNode("div", {
          "class": "arrow"
        }, null), this.title ? createVNode("h3", {
          "class": "popover-title"
        }, [this.title]) : null, createVNode("div", {
          "className": "popover-content"
        }, [this.content || ((_d = (_c = this.$slots).popover) == null ? void 0 : _d.call(_c))])])];
      }
    });
  }
};
const maxHours = 23;
const zero = 0;
const maxMinutes = 59;
const cutUpAmAndPm = 12;
const _sfc_main$d = {
  components: { Btn },
  mixins: [Local],
  props: {
    modelValue: {
      type: Date,
      required: true
    },
    showMeridian: {
      type: Boolean,
      default: true
    },
    min: { type: null, default: void 0 },
    max: { type: null, default: void 0 },
    hourStep: {
      type: Number,
      default: 1
    },
    minStep: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    iconControlUp: {
      type: String,
      default: "glyphicon glyphicon-chevron-up"
    },
    iconControlDown: {
      type: String,
      default: "glyphicon glyphicon-chevron-down"
    },
    inputWidth: {
      type: Number,
      default: 50
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      hours: 0,
      minutes: 0,
      meridian: true,
      hoursText: "",
      minutesText: ""
    };
  },
  computed: {
    inputStyles() {
      return {
        width: `${this.inputWidth}px`
      };
    }
  },
  watch: {
    modelValue(value) {
      this.updateByValue(value);
    },
    showMeridian(value) {
      this.setTime();
    },
    hoursText(value) {
      if (this.hours === 0 && value === "") {
        return;
      }
      const hour = parseInt(value);
      if (this.showMeridian) {
        if (hour >= 1 && hour <= cutUpAmAndPm) {
          if (this.meridian) {
            this.hours = hour === cutUpAmAndPm ? 0 : hour;
          } else {
            this.hours = hour === cutUpAmAndPm ? cutUpAmAndPm : hour + cutUpAmAndPm;
          }
        }
      } else if (hour >= zero && hour <= maxHours) {
        this.hours = hour;
      }
      this.setTime();
    },
    minutesText(value) {
      if (this.minutes === 0 && value === "") {
        return;
      }
      const minutesStr = parseInt(value);
      if (minutesStr >= zero && minutesStr <= maxMinutes) {
        this.minutes = minutesStr;
      }
      this.setTime();
    }
  },
  mounted() {
    this.updateByValue(this.modelValue);
  },
  methods: {
    updateByValue(value) {
      if (isNaN(value.getTime())) {
        this.hours = 0;
        this.minutes = 0;
        this.hoursText = "";
        this.minutesText = "";
        this.meridian = true;
        return;
      }
      this.hours = value.getHours();
      this.minutes = value.getMinutes();
      if (!this.showMeridian) {
        this.hoursText = pad(this.hours, 2);
      } else {
        if (this.hours >= cutUpAmAndPm) {
          if (this.hours === cutUpAmAndPm) {
            this.hoursText = this.hours + "";
          } else {
            this.hoursText = pad(this.hours - cutUpAmAndPm, 2);
          }
          this.meridian = false;
        } else {
          if (this.hours === zero) {
            this.hoursText = cutUpAmAndPm.toString();
          } else {
            this.hoursText = pad(this.hours, 2);
          }
          this.meridian = true;
        }
      }
      this.minutesText = pad(this.minutes, 2);
      this.$refs.hoursInput.value = this.hoursText;
      this.$refs.minutesInput.value = this.minutesText;
    },
    addHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours >= maxHours ? zero : this.hours + step;
    },
    reduceHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours <= zero ? maxHours : this.hours - step;
    },
    addMinute() {
      if (this.minutes >= maxMinutes) {
        this.minutes = zero;
        this.addHour(1);
      } else {
        this.minutes += this.minStep;
      }
    },
    reduceMinute() {
      if (this.minutes <= zero) {
        this.minutes = maxMinutes + 1 - this.minStep;
        this.reduceHour(1);
      } else {
        this.minutes -= this.minStep;
      }
    },
    changeTime(isHour, isPlus) {
      if (!this.readonly) {
        if (isHour && isPlus) {
          this.addHour();
        } else if (isHour && !isPlus) {
          this.reduceHour();
        } else if (!isHour && isPlus) {
          this.addMinute();
        } else {
          this.reduceMinute();
        }
        this.setTime();
      }
    },
    toggleMeridian() {
      this.meridian = !this.meridian;
      if (this.meridian) {
        this.hours -= cutUpAmAndPm;
      } else {
        this.hours += cutUpAmAndPm;
      }
      this.setTime();
    },
    onWheel(e, isHour) {
      if (!this.readonly) {
        e.preventDefault();
        this.changeTime(isHour, e.deltaY < 0);
      }
    },
    setTime() {
      let time = this.modelValue;
      if (isNaN(time.getTime())) {
        time = new Date();
        time.setHours(0);
        time.setMinutes(0);
      }
      time.setHours(this.hours);
      time.setMinutes(this.minutes);
      if (this.max instanceof Date) {
        const max = new Date(time);
        max.setHours(this.max.getHours());
        max.setMinutes(this.max.getMinutes());
        time = time > max ? max : time;
      }
      if (this.min instanceof Date) {
        const min = new Date(time);
        min.setHours(this.min.getHours());
        min.setMinutes(this.min.getMinutes());
        time = time < min ? min : time;
      }
      this.$emit("update:modelValue", new Date(time));
    },
    selectInputValue(e) {
      e.target.setSelectionRange(0, 2);
    }
  }
};
const _hoisted_1$a = {
  key: 0,
  class: "text-center"
};
const _hoisted_2$5 = /* @__PURE__ */ createElementVNode("td", null, "\xA0", -1);
const _hoisted_3$4 = { key: 0 };
const _hoisted_4$4 = { class: "form-group" };
const _hoisted_5$3 = ["readonly"];
const _hoisted_6$3 = /* @__PURE__ */ createElementVNode("td", null, [
  /* @__PURE__ */ createTextVNode("\xA0"),
  /* @__PURE__ */ createElementVNode("b", null, ":"),
  /* @__PURE__ */ createTextVNode("\xA0")
], -1);
const _hoisted_7$1 = { class: "form-group" };
const _hoisted_8$1 = ["readonly"];
const _hoisted_9$1 = { key: 0 };
const _hoisted_10$1 = /* @__PURE__ */ createTextVNode(" \xA0 ");
const _hoisted_11 = {
  key: 1,
  class: "text-center"
};
const _hoisted_12 = /* @__PURE__ */ createElementVNode("td", null, "\xA0", -1);
const _hoisted_13 = { key: 0 };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("section", {
    onClick: _cache[14] || (_cache[14] = withModifiers(() => {
    }, ["stop"]))
  }, [
    createElementVNode("table", null, [
      createElementVNode("tbody", null, [
        $props.controls ? (openBlock(), createElementBlock("tr", _hoisted_1$a, [
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[0] || (_cache[0] = ($event) => $options.changeTime(1, 1))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          _hoisted_2$5,
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[1] || (_cache[1] = ($event) => $options.changeTime(0, 1))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          $props.showMeridian ? (openBlock(), createElementBlock("td", _hoisted_3$4)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createElementVNode("tr", null, [
          createElementVNode("td", _hoisted_4$4, [
            withDirectives(createElementVNode("input", {
              ref: "hoursInput",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.hoursText = $event),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: normalizeStyle($options.inputStyles),
              placeholder: "HH",
              readonly: $props.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: _cache[3] || (_cache[3] = (...args) => $options.selectInputValue && $options.selectInputValue(...args)),
              onKeydown: [
                _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => $options.changeTime(1, 1), ["prevent"]), ["up"])),
                _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => $options.changeTime(1, 0), ["prevent"]), ["down"]))
              ],
              onWheel: _cache[6] || (_cache[6] = ($event) => $options.onWheel($event, true))
            }, null, 44, _hoisted_5$3), [
              [
                vModelText,
                $data.hoursText,
                void 0,
                { lazy: true }
              ]
            ])
          ]),
          _hoisted_6$3,
          createElementVNode("td", _hoisted_7$1, [
            withDirectives(createElementVNode("input", {
              ref: "minutesInput",
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.minutesText = $event),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: normalizeStyle($options.inputStyles),
              placeholder: "MM",
              readonly: $props.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: _cache[8] || (_cache[8] = (...args) => $options.selectInputValue && $options.selectInputValue(...args)),
              onKeydown: [
                _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => $options.changeTime(0, 1), ["prevent"]), ["up"])),
                _cache[10] || (_cache[10] = withKeys(withModifiers(($event) => $options.changeTime(0, 0), ["prevent"]), ["down"]))
              ],
              onWheel: _cache[11] || (_cache[11] = ($event) => $options.onWheel($event, false))
            }, null, 44, _hoisted_8$1), [
              [
                vModelText,
                $data.minutesText,
                void 0,
                { lazy: true }
              ]
            ])
          ]),
          $props.showMeridian ? (openBlock(), createElementBlock("td", _hoisted_9$1, [
            _hoisted_10$1,
            createVNode(_component_btn, {
              "data-action": "toggleMeridian",
              disabled: $props.readonly,
              onClick: $options.toggleMeridian,
              textContent: toDisplayString($data.meridian ? _ctx.t("uiv.timePicker.am") : _ctx.t("uiv.timePicker.pm"))
            }, null, 8, ["disabled", "onClick", "textContent"])
          ])) : createCommentVNode("", true)
        ]),
        $props.controls ? (openBlock(), createElementBlock("tr", _hoisted_11, [
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[12] || (_cache[12] = ($event) => $options.changeTime(1, 0))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          _hoisted_12,
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[13] || (_cache[13] = ($event) => $options.changeTime(0, 0))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          $props.showMeridian ? (openBlock(), createElementBlock("td", _hoisted_13)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ])
    ])
  ]);
}
var TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
function request(url, method = "GET") {
  const request2 = new window.XMLHttpRequest();
  const data = {};
  const p = {
    then: (fn1, fn2) => p.done(fn1).fail(fn2),
    catch: (fn) => p.fail(fn),
    always: (fn) => p.done(fn).fail(fn)
  };
  const statuses = ["done", "fail"];
  statuses.forEach((name) => {
    data[name] = [];
    p[name] = (fn) => {
      if (fn instanceof Function)
        data[name].push(fn);
      return p;
    };
  });
  p.done(JSON.parse);
  request2.onreadystatechange = () => {
    if (request2.readyState === 4) {
      const e = { status: request2.status };
      if (request2.status === 200) {
        let response = request2.responseText;
        for (const i in data.done) {
          if (hasOwnProperty(data.done, i) && isFunction(data.done[i])) {
            const value = data.done[i](response);
            if (isExist(value)) {
              response = value;
            }
          }
        }
      } else {
        data.fail.forEach((fail) => fail(e));
      }
    }
  };
  request2.open(method, url);
  request2.setRequestHeader("Accept", "application/json");
  request2.send();
  return p;
}
const _sfc_main$c = {
  components: { Dropdown: _sfc_main$s },
  props: {
    modelValue: {
      type: null,
      required: true
    },
    data: { type: Array, default: void 0 },
    itemKey: { type: String, default: void 0 },
    appendToBody: {
      type: Boolean,
      default: false
    },
    ignoreCase: {
      type: Boolean,
      default: true
    },
    matchStart: {
      type: Boolean,
      default: false
    },
    forceSelect: {
      type: Boolean,
      default: false
    },
    forceClear: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    asyncSrc: { type: String, default: void 0 },
    asyncKey: { type: String, default: void 0 },
    asyncFunction: { type: Function, default: void 0 },
    debounce: {
      type: Number,
      default: 200
    },
    openOnFocus: {
      type: Boolean,
      default: true
    },
    openOnEmpty: {
      type: Boolean,
      default: false
    },
    target: {
      required: true,
      type: null
    },
    preselect: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    "update:modelValue",
    "loading",
    "loaded",
    "loaded-error",
    "selected-item-changed"
  ],
  data() {
    return {
      inputEl: null,
      items: [],
      activeIndex: 0,
      timeoutID: 0,
      elements: [],
      open: false,
      dropdownMenuEl: null
    };
  },
  computed: {
    regexOptions() {
      let options = "";
      if (this.ignoreCase) {
        options += "i";
      }
      if (!this.matchStart) {
        options += "g";
      }
      return options;
    }
  },
  watch: {
    target(el) {
      this.removeListeners();
      this.initInputElByTarget(el);
      this.initListeners();
    },
    modelValue(value) {
      this.setInputTextByValue(value);
    },
    activeIndex(index) {
      index >= 0 && this.$emit("selected-item-changed", index);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initInputElByTarget(this.target);
      this.initListeners();
      this.dropdownMenuEl = this.$refs.dropdown.$el.querySelector(".dropdown-menu");
      if (this.modelValue) {
        this.setInputTextByValue(this.modelValue);
      }
    });
  },
  beforeUnmount() {
    this.removeListeners();
  },
  methods: {
    setInputTextByValue(value) {
      if (isString(value)) {
        this.inputEl.value = value;
      } else if (value) {
        this.inputEl.value = this.itemKey ? value[this.itemKey] : value;
      } else if (value === null) {
        this.inputEl.value = "";
      }
    },
    hasEmptySlot() {
      return !!this.$slots.empty || !!this.$slots.empty;
    },
    initInputElByTarget(target) {
      if (!target) {
        return;
      }
      this.inputEl = getElementBySelectorOrRef(target);
    },
    initListeners() {
      if (this.inputEl) {
        this.elements = [this.inputEl];
        on(this.inputEl, EVENTS.FOCUS, this.inputFocused);
        on(this.inputEl, EVENTS.BLUR, this.inputBlured);
        on(this.inputEl, EVENTS.INPUT, this.inputChanged);
        on(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed);
      }
    },
    removeListeners() {
      this.elements = [];
      if (this.inputEl) {
        off(this.inputEl, EVENTS.FOCUS, this.inputFocused);
        off(this.inputEl, EVENTS.BLUR, this.inputBlured);
        off(this.inputEl, EVENTS.INPUT, this.inputChanged);
        off(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed);
      }
    },
    prepareItems(data, disableFilters = false) {
      if (disableFilters) {
        this.items = data.slice(0, this.limit);
        return;
      }
      this.items = [];
      this.activeIndex = this.preselect ? 0 : -1;
      for (let i = 0, l = data.length; i < l; i++) {
        const item = data[i];
        let key = this.itemKey ? item[this.itemKey] : item;
        key = key.toString();
        let index = -1;
        if (this.ignoreCase) {
          index = key.toLowerCase().indexOf(this.inputEl.value.toLowerCase());
        } else {
          index = key.indexOf(this.inputEl.value);
        }
        if (this.matchStart ? index === 0 : index >= 0) {
          this.items.push(item);
        }
        if (this.items.length >= this.limit) {
          break;
        }
      }
    },
    fetchItems(value, debounce) {
      clearTimeout(this.timeoutID);
      if (value === "" && !this.openOnEmpty) {
        this.open = false;
      } else if (this.data) {
        this.prepareItems(this.data);
        this.open = this.hasEmptySlot() || Boolean(this.items.length);
      } else if (this.asyncSrc) {
        this.timeoutID = setTimeout(() => {
          this.$emit("loading");
          request(this.asyncSrc + encodeURIComponent(value)).then((data) => {
            if (this.inputEl.matches(":focus")) {
              this.prepareItems(this.asyncKey ? data[this.asyncKey] : data, true);
              this.open = this.hasEmptySlot() || Boolean(this.items.length);
            }
            this.$emit("loaded");
          }).catch((err) => {
            console.error(err);
            this.$emit("loaded-error");
          });
        }, debounce);
      } else if (this.asyncFunction) {
        const cb = (data) => {
          if (this.inputEl.matches(":focus")) {
            this.prepareItems(data, true);
            this.open = this.hasEmptySlot() || Boolean(this.items.length);
          }
          this.$emit("loaded");
        };
        this.timeoutID = setTimeout(() => {
          this.$emit("loading");
          this.asyncFunction(value, cb);
        }, debounce);
      }
    },
    inputChanged() {
      const value = this.inputEl.value;
      this.fetchItems(value, this.debounce);
      this.$emit("update:modelValue", this.forceSelect ? void 0 : value);
    },
    inputFocused() {
      if (this.openOnFocus) {
        const value = this.inputEl.value;
        this.fetchItems(value, 0);
      }
    },
    inputBlured() {
      if (!this.dropdownMenuEl.matches(":hover")) {
        this.open = false;
      }
      if (this.inputEl && this.forceClear) {
        this.$nextTick(() => {
          if (typeof this.modelValue === "undefined") {
            this.inputEl.value = "";
          }
        });
      }
    },
    inputKeyPressed(event) {
      event.stopPropagation();
      if (this.open) {
        switch (event.keyCode) {
          case 13:
            if (this.activeIndex >= 0) {
              this.selectItem(this.items[this.activeIndex]);
            } else {
              this.open = false;
            }
            event.preventDefault();
            break;
          case 27:
            this.open = false;
            break;
          case 38:
            this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0;
            break;
          case 40: {
            const maxIndex = this.items.length - 1;
            this.activeIndex = this.activeIndex < maxIndex ? this.activeIndex + 1 : maxIndex;
            break;
          }
        }
      }
    },
    selectItem(item) {
      this.$emit("update:modelValue", item);
      this.open = false;
    },
    highlight(item) {
      const value = this.itemKey ? item[this.itemKey] : item;
      const inputValue = this.inputEl.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      return value.replace(new RegExp(`${inputValue}`, this.regexOptions), "<b>$&</b>");
    }
  }
};
const _hoisted_1$9 = ["onClick"];
const _hoisted_2$4 = ["innerHTML"];
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dropdown = resolveComponent("dropdown");
  return openBlock(), createBlock(_component_dropdown, {
    ref: "dropdown",
    modelValue: $data.open,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.open = $event),
    tag: "section",
    "append-to-body": $props.appendToBody,
    "not-close-elements": $data.elements,
    "position-element": $data.inputEl
  }, {
    dropdown: withCtx(() => [
      renderSlot(_ctx.$slots, "item", {
        items: $data.items,
        activeIndex: $data.activeIndex,
        select: $options.selectItem,
        highlight: $options.highlight
      }, () => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.items, (item, index) => {
          return openBlock(), createElementBlock("li", {
            key: index,
            class: normalizeClass({ active: $data.activeIndex === index })
          }, [
            createElementVNode("a", {
              href: "#",
              onClick: withModifiers(($event) => $options.selectItem(item), ["prevent"])
            }, [
              createElementVNode("span", {
                innerHTML: $options.highlight(item)
              }, null, 8, _hoisted_2$4)
            ], 8, _hoisted_1$9)
          ], 2);
        }), 128))
      ]),
      !$data.items || $data.items.length === 0 ? renderSlot(_ctx.$slots, "empty", { key: 0 }) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["modelValue", "append-to-body", "not-close-elements", "position-element"]);
}
var Typeahead = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
const _sfc_main$b = {
  props: {
    modelValue: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    labelText: { type: String, default: void 0 },
    type: { type: String, default: void 0 },
    label: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
const _hoisted_1$8 = ["aria-valuenow"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "progress-bar": true,
      "progress-bar-striped": $props.striped,
      active: $props.striped && $props.active,
      [`progress-bar-${$props.type}`]: Boolean($props.type)
    }),
    style: normalizeStyle({
      minWidth: $props.minWidth ? "2em" : null,
      width: `${$props.modelValue}%`
    }),
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuenow": $props.modelValue,
    "aria-valuemax": "100"
  }, toDisplayString($props.label ? $props.labelText ? $props.labelText : `${$props.modelValue}%` : null), 15, _hoisted_1$8);
}
var ProgressBarStack = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
const _sfc_main$a = {
  components: { ProgressBarStack },
  props: {
    modelValue: {
      type: Number,
      validator(value) {
        return value >= 0 && value <= 100;
      },
      default: 0
    },
    labelText: { type: String, default: void 0 },
    type: { type: String, default: void 0 },
    label: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
const _hoisted_1$7 = { class: "progress" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProgressBarStack = resolveComponent("ProgressBarStack");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(_component_ProgressBarStack, normalizeProps(mergeProps({ key: 1 }, _ctx.$props)), null, 16))
  ]);
}
var ProgressBar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const _sfc_main$9 = {
  mixins: [linkMixin],
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
const _hoisted_1$6 = ["href", "target"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass({ active: $props.active })
  }, [
    $props.active ? renderSlot(_ctx.$slots, "default", { key: 0 }) : _ctx.to ? (openBlock(), createBlock(_component_router_link, {
      key: 1,
      to: _ctx.to,
      replace: _ctx.replace,
      append: _ctx.append,
      exact: _ctx.exact
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["to", "replace", "append", "exact"])) : (openBlock(), createElementBlock("a", {
      key: 2,
      href: _ctx.href,
      target: _ctx.target
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_1$6))
  ], 2);
}
var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const _sfc_main$8 = {
  functional: true,
  components: { BreadcrumbItem },
  props: {
    items: { type: Array, default: () => [] }
  },
  methods: {
    hasOwnProperty
  }
};
const _hoisted_1$5 = { class: "breadcrumb" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BreadcrumbItem = resolveComponent("BreadcrumbItem");
  return openBlock(), createElementBlock("ol", _hoisted_1$5, [
    renderSlot(_ctx.$slots, "default"),
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, index) => {
      return openBlock(), createBlock(_component_BreadcrumbItem, {
        key: $options.hasOwnProperty(item, "key") ? item.key : index,
        active: $options.hasOwnProperty(item, "active") ? item.active : index === $props.items.length - 1,
        href: item.href,
        to: item.to,
        replace: item.replace,
        append: item.append,
        exact: item.exact
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(item.text), 1)
        ]),
        _: 2
      }, 1032, ["active", "href", "to", "replace", "append", "exact"]);
    }), 128))
  ]);
}
var Breadcrumbs = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const _sfc_main$7 = {};
const _hoisted_1$4 = {
  class: "btn-toolbar",
  role: "toolbar"
};
function _sfc_render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BtnToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const _sfc_main$6 = {
  components: { Dropdown: _sfc_main$s },
  mixins: [Local],
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey: {
      type: String,
      default: "value"
    },
    limit: {
      type: Number,
      default: 0
    },
    size: { type: String, default: void 0 },
    placeholder: { type: String, default: void 0 },
    split: {
      type: String,
      default: ", "
    },
    disabled: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    collapseSelected: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterAutoFocus: {
      type: Boolean,
      default: true
    },
    filterFunction: { type: Function, default: void 0 },
    filterPlaceholder: { type: String, default: void 0 },
    selectedIcon: {
      type: String,
      default: "glyphicon glyphicon-ok"
    },
    itemSelectedClass: { type: String, default: void 0 }
  },
  emits: [
    "focus",
    "blur",
    "visible-change",
    "update:modelValue",
    "change",
    "limit-exceed",
    "search"
  ],
  data() {
    return {
      showDropdown: false,
      els: [],
      filterInput: "",
      currentActive: -1
    };
  },
  computed: {
    containerStyles() {
      return {
        width: this.block ? "100%" : ""
      };
    },
    filteredOptions() {
      if (this.filterable && this.filterInput) {
        if (this.filterFunction) {
          return this.filterFunction(this.filterInput);
        } else {
          const filterInput = this.filterInput.toLowerCase();
          return this.options.filter((v) => v[this.valueKey].toString().toLowerCase().indexOf(filterInput) >= 0 || v[this.labelKey].toString().toLowerCase().indexOf(filterInput) >= 0);
        }
      } else {
        return this.options;
      }
    },
    groupedOptions() {
      return this.filteredOptions.map((v) => v.group).filter(onlyUnique).map((v) => ({
        options: this.filteredOptions.filter((option) => option.group === v),
        $group: v
      }));
    },
    flattenGroupedOptions() {
      return [].concat(...this.groupedOptions.map((v) => v.options));
    },
    selectClasses() {
      return {
        [`input-${this.size}`]: this.size
      };
    },
    selectedIconClasses() {
      return {
        [this.selectedIcon]: true,
        "pull-right": true
      };
    },
    selectTextClasses() {
      return {
        "text-muted": this.modelValue.length === 0
      };
    },
    labelValue() {
      const optionsByValue = this.options.map((v) => v[this.valueKey]);
      return this.modelValue.map((v) => {
        const index = optionsByValue.indexOf(v);
        return index >= 0 ? this.options[index][this.labelKey] : v;
      });
    },
    selectedText() {
      if (this.modelValue.length) {
        const labelValue = this.labelValue;
        if (this.collapseSelected) {
          let str = labelValue[0];
          str += labelValue.length > 1 ? `${this.split}+${labelValue.length - 1}` : "";
          return str;
        } else {
          return labelValue.join(this.split);
        }
      } else {
        return this.placeholder || this.t("uiv.multiSelect.placeholder");
      }
    },
    customOptionsVisible() {
      return !!this.$slots.option || !!this.$slots.option;
    }
  },
  watch: {
    showDropdown(v) {
      this.filterInput = "";
      this.currentActive = -1;
      this.$emit("visible-change", v);
      if (v && this.filterable && this.filterAutoFocus) {
        this.$nextTick(() => {
          this.$refs.filterInput.focus();
        });
      }
    }
  },
  mounted() {
    this.els = [this.$el];
  },
  methods: {
    goPrevOption() {
      if (!this.showDropdown) {
        return;
      }
      this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.flattenGroupedOptions.length - 1;
    },
    goNextOption() {
      if (!this.showDropdown) {
        return;
      }
      this.currentActive < this.flattenGroupedOptions.length - 1 ? this.currentActive++ : this.currentActive = 0;
    },
    selectOption() {
      const index = this.currentActive;
      const options = this.flattenGroupedOptions;
      if (!this.showDropdown) {
        this.showDropdown = true;
      } else if (index >= 0 && index < options.length) {
        this.toggle(options[index]);
      }
    },
    itemClasses(item) {
      const result = {
        disabled: item.disabled,
        active: this.currentActive === this.flattenGroupedOptions.indexOf(item)
      };
      if (this.itemSelectedClass) {
        result[this.itemSelectedClass] = this.isItemSelected(item);
      }
      return result;
    },
    isItemSelected(item) {
      return this.modelValue.indexOf(item[this.valueKey]) >= 0;
    },
    toggle(item) {
      if (item.disabled) {
        return;
      }
      const value = item[this.valueKey];
      const index = this.modelValue.indexOf(value);
      if (this.limit === 1) {
        const newValue = index >= 0 ? [] : [value];
        this.$emit("update:modelValue", newValue);
        this.$emit("change", newValue);
      } else {
        if (index >= 0) {
          const newVal = this.modelValue.slice();
          newVal.splice(index, 1);
          this.$emit("update:modelValue", newVal);
          this.$emit("change", newVal);
        } else if (this.limit === 0 || this.modelValue.length < this.limit) {
          const newVal = this.modelValue.slice();
          newVal.push(value);
          this.$emit("update:modelValue", newVal);
          this.$emit("change", newVal);
        } else {
          this.$emit("limit-exceed");
        }
      }
    },
    searchClicked() {
      this.$emit("search", this.filterInput);
    }
  }
};
const _hoisted_1$3 = ["disabled"];
const _hoisted_2$3 = /* @__PURE__ */ createElementVNode("div", {
  class: "pull-right",
  style: { "display": "inline-block", "vertical-align": "middle" }
}, [
  /* @__PURE__ */ createElementVNode("span", null, "\xA0"),
  /* @__PURE__ */ createElementVNode("span", { class: "caret" })
], -1);
const _hoisted_3$3 = ["textContent"];
const _hoisted_4$3 = {
  key: 0,
  style: { "padding": "4px 8px" }
};
const _hoisted_5$2 = ["placeholder"];
const _hoisted_6$2 = ["textContent"];
const _hoisted_7 = ["onClick"];
const _hoisted_8 = {
  key: 0,
  role: "button",
  style: { "outline": "0" }
};
const _hoisted_9 = {
  key: 1,
  role: "button",
  style: { "outline": "0" }
};
const _hoisted_10 = {
  key: 2,
  role: "button",
  style: { "outline": "0" }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dropdown = resolveComponent("dropdown");
  return openBlock(), createBlock(_component_dropdown, {
    ref: "dropdown",
    modelValue: $data.showDropdown,
    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.showDropdown = $event),
    "not-close-elements": $data.els,
    "append-to-body": $props.appendToBody,
    disabled: $props.disabled,
    style: normalizeStyle($options.containerStyles),
    onKeydown: _cache[15] || (_cache[15] = withKeys(($event) => $data.showDropdown = false, ["esc"]))
  }, {
    dropdown: withCtx(() => [
      $props.filterable ? (openBlock(), createElementBlock("li", _hoisted_4$3, [
        withDirectives(createElementVNode("input", {
          ref: "filterInput",
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.filterInput = $event),
          "aria-label": "Filter...",
          class: "form-control input-sm",
          type: "text",
          placeholder: $props.filterPlaceholder || _ctx.t("uiv.multiSelect.filterPlaceholder"),
          onKeyup: _cache[6] || (_cache[6] = withKeys((...args) => $options.searchClicked && $options.searchClicked(...args), ["enter"])),
          onKeydown: [
            _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => $options.goNextOption && $options.goNextOption(...args), ["prevent", "stop"]), ["down"])),
            _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => $options.goPrevOption && $options.goPrevOption(...args), ["prevent", "stop"]), ["up"])),
            _cache[9] || (_cache[9] = withKeys(withModifiers((...args) => $options.selectOption && $options.selectOption(...args), ["prevent", "stop"]), ["enter"]))
          ]
        }, null, 40, _hoisted_5$2), [
          [vModelText, $data.filterInput]
        ])
      ])) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.groupedOptions, (item, i) => {
        return openBlock(), createElementBlock(Fragment, null, [
          item.$group ? (openBlock(), createElementBlock("li", {
            key: i,
            class: "dropdown-header",
            textContent: toDisplayString(item.$group)
          }, null, 8, _hoisted_6$2)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(item.options, (_item, j) => {
            return openBlock(), createElementBlock("li", {
              key: `${i}_${j}`,
              class: normalizeClass($options.itemClasses(_item)),
              style: { "outline": "0" },
              onKeydown: [
                _cache[10] || (_cache[10] = withKeys(withModifiers((...args) => $options.goNextOption && $options.goNextOption(...args), ["prevent", "stop"]), ["down"])),
                _cache[11] || (_cache[11] = withKeys(withModifiers((...args) => $options.goPrevOption && $options.goPrevOption(...args), ["prevent", "stop"]), ["up"])),
                _cache[12] || (_cache[12] = withKeys(withModifiers((...args) => $options.selectOption && $options.selectOption(...args), ["prevent", "stop"]), ["enter"]))
              ],
              onClick: withModifiers(($event) => $options.toggle(_item, $event), ["stop"]),
              onMouseenter: _cache[13] || (_cache[13] = ($event) => $data.currentActive = -1)
            }, [
              $options.customOptionsVisible ? (openBlock(), createElementBlock("a", _hoisted_8, [
                renderSlot(_ctx.$slots, "option", { item: _item }),
                $props.selectedIcon && $options.isItemSelected(_item) ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass($options.selectedIconClasses)
                }, null, 2)) : createCommentVNode("", true)
              ])) : $options.isItemSelected(_item) ? (openBlock(), createElementBlock("a", _hoisted_9, [
                createElementVNode("b", null, toDisplayString(_item[$props.labelKey]), 1),
                $props.selectedIcon ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass($options.selectedIconClasses)
                }, null, 2)) : createCommentVNode("", true)
              ])) : (openBlock(), createElementBlock("a", _hoisted_10, [
                createElementVNode("span", null, toDisplayString(_item[$props.labelKey]), 1)
              ]))
            ], 42, _hoisted_7);
          }), 128))
        ], 64);
      }), 256))
    ]),
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass(["form-control dropdown-toggle clearfix", $options.selectClasses]),
        disabled: $props.disabled ? true : void 0,
        tabindex: "0",
        "data-role": "trigger",
        onFocus: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("focus", $event)),
        onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("blur", $event)),
        onKeydown: [
          _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => $options.goNextOption && $options.goNextOption(...args), ["prevent", "stop"]), ["down"])),
          _cache[3] || (_cache[3] = withKeys(withModifiers((...args) => $options.goPrevOption && $options.goPrevOption(...args), ["prevent", "stop"]), ["up"])),
          _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => $options.selectOption && $options.selectOption(...args), ["prevent", "stop"]), ["enter"]))
        ]
      }, [
        _hoisted_2$3,
        createElementVNode("div", {
          class: normalizeClass($options.selectTextClasses),
          style: { "overflow-x": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" },
          textContent: toDisplayString($options.selectedText)
        }, null, 10, _hoisted_3$3)
      ], 42, _hoisted_1$3)
    ]),
    _: 3
  }, 8, ["modelValue", "not-close-elements", "append-to-body", "disabled", "style"]);
}
var MultiSelect = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = {
  components: { Collapse: _sfc_main$t },
  props: {
    modelValue: Boolean,
    fluid: {
      type: Boolean,
      default: true
    },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean
  },
  emits: ["update:modalValue"],
  data() {
    return {
      show: false
    };
  },
  computed: {
    navClasses() {
      return {
        navbar: true,
        "navbar-default": !this.inverse,
        "navbar-inverse": this.inverse,
        "navbar-static-top": this.staticTop,
        "navbar-fixed-bottom": this.fixedBottom,
        "navbar-fixed-top": this.fixedTop
      };
    }
  },
  watch: {
    modelValue(v) {
      this.show = v;
    }
  },
  mounted() {
    this.show = !!this.modelValue;
  },
  methods: {
    toggle() {
      this.show = !this.show;
      this.$emit("update:modalValue", this.show);
    }
  }
};
const _hoisted_1$2 = { class: "navbar-header" };
const _hoisted_2$2 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Toggle navigation", -1);
const _hoisted_3$2 = /* @__PURE__ */ createElementVNode("span", { class: "icon-bar" }, null, -1);
const _hoisted_4$2 = /* @__PURE__ */ createElementVNode("span", { class: "icon-bar" }, null, -1);
const _hoisted_5$1 = /* @__PURE__ */ createElementVNode("span", { class: "icon-bar" }, null, -1);
const _hoisted_6$1 = [
  _hoisted_2$2,
  _hoisted_3$2,
  _hoisted_4$2,
  _hoisted_5$1
];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_collapse = resolveComponent("collapse");
  return openBlock(), createElementBlock("nav", {
    class: normalizeClass($options.navClasses)
  }, [
    createElementVNode("div", {
      class: normalizeClass($props.fluid ? "container-fluid" : "container")
    }, [
      createElementVNode("div", _hoisted_1$2, [
        renderSlot(_ctx.$slots, "collapse-btn", {}, () => [
          createElementVNode("button", {
            type: "button",
            class: "navbar-toggle collapsed",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.toggle && $options.toggle(...args))
          }, _hoisted_6$1)
        ]),
        renderSlot(_ctx.$slots, "brand")
      ]),
      renderSlot(_ctx.$slots, "default"),
      createVNode(_component_collapse, {
        modelValue: $data.show,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.show = $event),
        class: "navbar-collapse"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "collapse")
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 2)
  ], 2);
}
var Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = {
  props: {
    left: Boolean,
    right: Boolean
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    class: normalizeClass({
      nav: true,
      "navbar-nav": true,
      "navbar-left": $props.left,
      "navbar-right": $props.right
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var NavbarNav = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = {
  props: {
    left: Boolean,
    right: Boolean
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("form", {
    class: normalizeClass({
      "navbar-form": true,
      "navbar-left": $props.left,
      "navbar-right": $props.right
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var NavbarForm = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  props: {
    left: Boolean,
    right: Boolean
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("p", {
    class: normalizeClass({
      "navbar-text": true,
      "navbar-left": $props.left,
      "navbar-right": $props.right
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var NavbarText = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
var components = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Carousel,
  Slide,
  Collapse: _sfc_main$t,
  Dropdown: _sfc_main$s,
  Modal,
  Tab,
  Tabs,
  DatePicker,
  Affix,
  Alert,
  Pagination,
  Tooltip: _sfc_main$f,
  Popover: _sfc_main$e,
  TimePicker,
  Typeahead,
  ProgressBar,
  ProgressBarStack,
  Breadcrumbs,
  BreadcrumbItem,
  Btn,
  BtnGroup,
  BtnToolbar,
  MultiSelect,
  Navbar,
  NavbarNav,
  NavbarForm,
  NavbarText
});
const INSTANCE$2 = "_uiv_tooltip_instance";
const bind$2 = (el, binding) => {
  unbind$2(el);
  const options = [];
  for (const key in binding.modifiers) {
    if (hasOwnProperty(binding.modifiers, key) && binding.modifiers[key]) {
      options.push(key);
    }
  }
  let placement, trigger, enterable;
  options.forEach((option) => {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      placement = option;
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      trigger = option;
    } else if (/unenterable/.test(option)) {
      enterable = false;
    }
  });
  const vNode = h(_sfc_main$f, {
    target: el,
    appendTo: binding.arg && "#" + binding.arg,
    text: typeof binding.value === "string" ? binding.value && binding.value.toString() : binding.value && binding.value.text && binding.value.text.toString(),
    positionBy: binding.value && binding.value.positionBy && binding.value.positionBy.toString(),
    viewport: binding.value && binding.value.viewport && binding.value.viewport.toString(),
    customClass: binding.value && binding.value.customClass && binding.value.customClass.toString(),
    showDelay: binding.value && binding.value.showDelay,
    hideDelay: binding.value && binding.value.hideDelay,
    enterable,
    placement,
    trigger
  });
  const container = document.createElement("div");
  render(vNode, container);
  el[INSTANCE$2] = { container, vNode };
};
const unbind$2 = (el) => {
  const instance = el[INSTANCE$2];
  if (instance) {
    try {
      removeFromDom(instance.vNode.component.ctx.$refs.popup);
    } catch (_) {
    }
    render(null, instance.container);
  }
  delete el[INSTANCE$2];
};
const update$2 = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    bind$2(el, binding);
  }
};
var tooltip = { mounted: bind$2, unmounted: unbind$2, updated: update$2 };
const INSTANCE$1 = "_uiv_popover_instance";
const bind$1 = (el, binding) => {
  unbind$1(el);
  const options = [];
  for (const key in binding.modifiers) {
    if (hasOwnProperty(binding.modifiers, key) && binding.modifiers[key]) {
      options.push(key);
    }
  }
  let placement, trigger, enterable;
  options.forEach((option) => {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      placement = option;
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      trigger = option;
    } else if (/unenterable/.test(option)) {
      enterable = false;
    }
  });
  const vNode = h(_sfc_main$e, {
    target: el,
    appendTo: binding.arg && "#" + binding.arg,
    title: binding.value && binding.value.title && binding.value.title.toString(),
    positionBy: binding.value && binding.value.positionBy && binding.value.positionBy.toString(),
    content: binding.value && binding.value.content && binding.value.content.toString(),
    viewport: binding.value && binding.value.viewport && binding.value.viewport.toString(),
    customClass: binding.value && binding.value.customClass && binding.value.customClass.toString(),
    enterable,
    placement,
    trigger
  });
  const container = document.createElement("div");
  render(vNode, container);
  el[INSTANCE$1] = container;
};
const unbind$1 = (el) => {
  const instance = el[INSTANCE$1];
  if (instance) {
    render(null, instance);
  }
  delete el[INSTANCE$1];
};
const update$1 = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    bind$1(el, binding);
  }
};
var popover = { mounted: bind$1, unmounted: unbind$1, updated: update$1 };
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
var directives = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  tooltip,
  popover,
  scrollspy
});
const TYPES$1 = {
  ALERT: 0,
  CONFIRM: 1,
  PROMPT: 2
};
const _sfc_main$1 = {
  components: { Modal, Btn },
  mixins: [Local],
  props: {
    backdrop: { type: null, default: void 0 },
    title: { type: String, default: void 0 },
    content: { type: String, default: void 0 },
    html: {
      type: Boolean,
      default: false
    },
    okText: { type: String, default: void 0 },
    okType: {
      type: String,
      default: "primary"
    },
    cancelText: { type: String, default: void 0 },
    cancelType: {
      type: String,
      default: "default"
    },
    type: {
      type: Number,
      default: TYPES$1.ALERT
    },
    size: {
      type: String,
      default: "sm"
    },
    cb: {
      type: Function,
      required: true
    },
    validator: {
      type: Function,
      default: () => null
    },
    customClass: { type: null, default: void 0 },
    defaultValue: { type: String, default: void 0 },
    inputType: {
      type: String,
      default: "text"
    },
    autoFocus: {
      type: String,
      default: "ok"
    },
    reverseButtons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      TYPES: TYPES$1,
      show: true,
      input: "",
      dirty: false
    };
  },
  computed: {
    closeOnBackdropClick() {
      return isExist(this.backdrop) ? Boolean(this.backdrop) : this.type !== TYPES$1.ALERT;
    },
    inputError() {
      return this.validator(this.input);
    },
    inputNotValid() {
      return this.dirty && this.inputError;
    },
    okBtnText() {
      return this.okText || this.t("uiv.modal.ok");
    },
    cancelBtnText() {
      return this.cancelText || this.t("uiv.modal.cancel");
    }
  },
  mounted() {
    if (this.defaultValue) {
      this.input = this.defaultValue;
    }
  },
  methods: {
    toggle(show, msg) {
      this.$refs.modal.toggle(show, msg);
    },
    validate() {
      this.dirty = true;
      if (!isExist(this.inputError)) {
        this.toggle(false, { value: this.input });
      }
    }
  }
};
const _hoisted_1$1 = ["innerHTML"];
const _hoisted_2$1 = { key: 1 };
const _hoisted_3$1 = { key: 2 };
const _hoisted_4$1 = ["type"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  const _component_modal = resolveComponent("modal");
  return openBlock(), createBlock(_component_modal, {
    ref: "modal",
    modelValue: $data.show,
    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.show = $event),
    "auto-focus": "",
    size: $props.size,
    title: $props.title,
    header: !!$props.title,
    backdrop: $options.closeOnBackdropClick,
    "cancel-text": $props.cancelText,
    "ok-text": $props.okText,
    class: normalizeClass($props.customClass),
    onHide: $props.cb
  }, createSlots({
    default: withCtx(() => [
      $props.html ? (openBlock(), createElementBlock("div", {
        key: 0,
        innerHTML: $props.content
      }, null, 8, _hoisted_1$1)) : (openBlock(), createElementBlock("p", _hoisted_2$1, toDisplayString($props.content), 1)),
      $props.type === $data.TYPES.PROMPT ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
        createElementVNode("div", {
          class: normalizeClass(["form-group", { "has-error": $options.inputNotValid }])
        }, [
          withDirectives(createElementVNode("input", {
            ref: "input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.input = $event),
            type: $props.inputType,
            class: "form-control",
            required: "",
            "data-action": "auto-focus",
            onChange: _cache[1] || (_cache[1] = ($event) => $data.dirty = true),
            onKeyup: _cache[2] || (_cache[2] = withKeys((...args) => $options.validate && $options.validate(...args), ["enter"]))
          }, null, 40, _hoisted_4$1), [
            [vModelDynamic, $data.input]
          ]),
          withDirectives(createElementVNode("span", { class: "help-block" }, toDisplayString($options.inputError), 513), [
            [vShow, $options.inputNotValid]
          ])
        ], 2)
      ])) : createCommentVNode("", true)
    ]),
    _: 2
  }, [
    $props.type === $data.TYPES.ALERT ? {
      name: "footer",
      fn: withCtx(() => [
        createVNode(_component_btn, {
          type: $props.okType,
          "data-action": $props.autoFocus === "ok" ? "auto-focus" : "",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.toggle(false, "ok")),
          textContent: toDisplayString($options.okBtnText)
        }, null, 8, ["type", "data-action", "textContent"])
      ])
    } : {
      name: "footer",
      fn: withCtx(() => [
        $props.reverseButtons ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          $props.type === $data.TYPES.CONFIRM ? (openBlock(), createBlock(_component_btn, {
            key: 0,
            type: $props.okType,
            "data-action": $props.autoFocus === "ok" ? "auto-focus" : "",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.toggle(false, "ok")),
            textContent: toDisplayString($options.okBtnText)
          }, null, 8, ["type", "data-action", "textContent"])) : (openBlock(), createBlock(_component_btn, {
            key: 1,
            type: $props.okType,
            onClick: $options.validate,
            textContent: toDisplayString($options.okBtnText)
          }, null, 8, ["type", "onClick", "textContent"])),
          createVNode(_component_btn, {
            type: $props.cancelType,
            "data-action": $props.autoFocus === "cancel" ? "auto-focus" : "",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.toggle(false, "cancel")),
            textContent: toDisplayString($options.cancelBtnText)
          }, null, 8, ["type", "data-action", "textContent"])
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createVNode(_component_btn, {
            type: $props.cancelType,
            "data-action": $props.autoFocus === "cancel" ? "auto-focus" : "",
            onClick: _cache[6] || (_cache[6] = ($event) => $options.toggle(false, "cancel")),
            textContent: toDisplayString($options.cancelBtnText)
          }, null, 8, ["type", "data-action", "textContent"]),
          $props.type === $data.TYPES.CONFIRM ? (openBlock(), createBlock(_component_btn, {
            key: 0,
            type: $props.okType,
            "data-action": $props.autoFocus === "ok" ? "auto-focus" : "",
            onClick: _cache[7] || (_cache[7] = ($event) => $options.toggle(false, "ok")),
            textContent: toDisplayString($options.okBtnText)
          }, null, 8, ["type", "data-action", "textContent"])) : (openBlock(), createBlock(_component_btn, {
            key: 1,
            type: $props.okType,
            onClick: $options.validate,
            textContent: toDisplayString($options.okBtnText)
          }, null, 8, ["type", "onClick", "textContent"]))
        ], 64))
      ])
    }
  ]), 1032, ["modelValue", "size", "title", "header", "backdrop", "cancel-text", "ok-text", "class", "onHide"]);
}
var MessageBox$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const destroy$1 = (container) => {
  render(null, container);
};
const shallResolve = (type, msg) => {
  if (type === TYPES$1.CONFIRM) {
    return msg === "ok";
  } else {
    return isExist(msg) && isString(msg.value);
  }
};
const init$1 = function(type, options, cb, resolve = null, reject = null) {
  const container = document.createElement("div");
  const vNode = h(MessageBox$1, __spreadProps(__spreadValues({
    type
  }, options), {
    cb(msg) {
      destroy$1(container);
      if (isFunction(cb)) {
        if (type === TYPES$1.CONFIRM) {
          shallResolve(type, msg) ? cb(null, msg) : cb(msg);
        } else if (type === TYPES$1.PROMPT) {
          shallResolve(type, msg) ? cb(null, msg.value) : cb(msg);
        } else {
          cb(msg);
        }
      } else if (resolve && reject) {
        if (type === TYPES$1.CONFIRM) {
          shallResolve(type, msg) ? resolve(msg) : reject(msg);
        } else if (type === TYPES$1.PROMPT) {
          shallResolve(type, msg) ? resolve(msg.value) : reject(msg);
        } else {
          resolve(msg);
        }
      }
    }
  }));
  render(vNode, container);
  document.body.appendChild(container.firstElementChild);
};
const initModal = function(type, options = {}, cb) {
  if (isPromiseSupported()) {
    return new Promise((resolve, reject) => {
      init$1.apply(this, [type, options, cb, resolve, reject]);
    });
  } else {
    init$1.apply(this, [type, options, cb]);
  }
};
const alert = function(options, cb) {
  return initModal.apply(this, [TYPES$1.ALERT, options, cb]);
};
const confirm = function(options, cb) {
  return initModal.apply(this, [TYPES$1.CONFIRM, options, cb]);
};
const prompt = function(options, cb) {
  return initModal.apply(this, [TYPES$1.PROMPT, options, cb]);
};
var MessageBox = { alert, confirm, prompt };
const TYPES = {
  SUCCESS: "success",
  INFO: "info",
  DANGER: "danger",
  WARNING: "warning"
};
const PLACEMENTS = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right"
};
const IN_CLASS = "in";
const ICON = "glyphicon";
const WIDTH = 300;
const TRANSITION_DURATION = 300;
const _sfc_main = {
  components: { Alert },
  props: {
    title: { type: String, default: void 0 },
    content: { type: String, default: void 0 },
    html: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 5e3
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    type: { type: String, default: void 0 },
    placement: { type: String, default: void 0 },
    icon: { type: String, default: void 0 },
    customClass: { type: null, default: void 0 },
    cb: {
      type: Function,
      required: true
    },
    queue: {
      type: Array,
      required: true
    },
    offsetY: {
      type: Number,
      default: 15
    },
    offsetX: {
      type: Number,
      default: 15
    },
    offset: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      height: 0,
      top: 0,
      horizontal: this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.BOTTOM_LEFT ? "left" : "right",
      vertical: this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.TOP_RIGHT ? "top" : "bottom"
    };
  },
  computed: {
    styles() {
      const queue = this.queue;
      const thisIndex = queue.findIndex((vm) => vm._.uid === this._.uid);
      return {
        position: "fixed",
        [this.vertical]: `${this.getTotalHeightOfQueue(queue, thisIndex)}px`,
        width: `${WIDTH}px`,
        transition: `all ${TRANSITION_DURATION / 1e3}s ease-in-out`
      };
    },
    icons() {
      if (isString(this.icon)) {
        return this.icon;
      }
      switch (this.type) {
        case TYPES.INFO:
        case TYPES.WARNING:
          return `${ICON} ${ICON}-info-sign`;
        case TYPES.SUCCESS:
          return `${ICON} ${ICON}-ok-sign`;
        case TYPES.DANGER:
          return `${ICON} ${ICON}-remove-sign`;
        default:
          return null;
      }
    }
  },
  created() {
    this.top = this.getTotalHeightOfQueue(this.queue);
  },
  mounted() {
    const el = this.$el;
    el.style[this.vertical] = this.top + "px";
    this.$nextTick(() => {
      el.style[this.horizontal] = `-${WIDTH}px`;
      this.height = el.offsetHeight;
      el.style[this.horizontal] = `${this.offsetX}px`;
      addClass(el, IN_CLASS);
    });
  },
  methods: {
    getTotalHeightOfQueue(queue, lastIndex = queue.length) {
      let totalHeight = this.offsetY;
      for (let i = 0; i < lastIndex; i++) {
        totalHeight += queue[i].height + this.offset;
      }
      return totalHeight;
    },
    onDismissed() {
      removeClass(this.$el, IN_CLASS);
      setTimeout(this.cb, TRANSITION_DURATION);
    }
  }
};
const _hoisted_1 = {
  class: "media",
  style: { "margin": "0" }
};
const _hoisted_2 = {
  key: 0,
  class: "media-left"
};
const _hoisted_3 = { class: "media-body" };
const _hoisted_4 = {
  key: 0,
  class: "media-heading"
};
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = { key: 2 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_alert = resolveComponent("alert");
  return openBlock(), createBlock(_component_alert, {
    class: normalizeClass(["fade", $props.customClass]),
    style: normalizeStyle($options.styles),
    type: $props.type,
    duration: $props.duration,
    dismissible: $props.dismissible,
    onDismissed: $options.onDismissed
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        $options.icons ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createElementVNode("span", {
            class: normalizeClass($options.icons),
            style: { "font-size": "1.5em" }
          }, null, 2)
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_3, [
          $props.title ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createElementVNode("b", null, toDisplayString($props.title), 1)
          ])) : createCommentVNode("", true),
          $props.html ? (openBlock(), createElementBlock("div", {
            key: 1,
            innerHTML: $props.content
          }, null, 8, _hoisted_5)) : (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString($props.content), 1))
        ])
      ])
    ]),
    _: 1
  }, 8, ["class", "style", "type", "duration", "dismissible", "onDismissed"]);
}
var Notification$1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const queues = reactive({
  [PLACEMENTS.TOP_LEFT]: [],
  [PLACEMENTS.TOP_RIGHT]: [],
  [PLACEMENTS.BOTTOM_LEFT]: [],
  [PLACEMENTS.BOTTOM_RIGHT]: []
});
const destroy = (queue, { vNode, container }) => {
  render(null, container);
  spliceIfExist(queue, vNode.component.ctx);
};
const init = (options, cb, resolve = null, reject = null) => {
  const container = document.createElement("div");
  const placement = options.placement;
  const queue = queues[placement];
  if (!isExist(queue)) {
    return;
  }
  if (options.type === "error") {
    options.type = "danger";
  }
  const vNode = h(Notification$1, __spreadProps(__spreadValues({
    queue,
    placement
  }, options), {
    cb(msg) {
      destroy(queue, { vNode, container });
      if (isFunction(cb)) {
        cb(msg);
      } else if (resolve && reject) {
        resolve(msg);
      }
    }
  }));
  render(vNode, container);
  document.body.appendChild(container.firstElementChild);
  queue.push(vNode.component.ctx);
};
const _notify = (options = {}, cb) => {
  if (isString(options)) {
    options = {
      content: options
    };
  }
  if (!isExist(options.placement)) {
    options.placement = PLACEMENTS.TOP_RIGHT;
  }
  if (isPromiseSupported()) {
    return new Promise((resolve, reject) => {
      init(options, cb, resolve, reject);
    });
  } else {
    init(options, cb);
  }
};
function _notify2(type, args) {
  if (isString(args)) {
    _notify({
      content: args,
      type
    });
  } else {
    _notify(__spreadProps(__spreadValues({}, args), { type }));
  }
}
const notify = Object.defineProperties(_notify, {
  success: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2("success", args);
    }
  },
  info: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2("info", args);
    }
  },
  warning: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2("warning", args);
    }
  },
  danger: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2("danger", args);
    }
  },
  error: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2("danger", args);
    }
  },
  dismissAll: {
    configurable: false,
    writable: false,
    value() {
      for (const key in queues) {
        if (hasOwnProperty(queues, key)) {
          queues[key].forEach((instance) => {
            instance.onDismissed();
          });
        }
      }
    }
  }
});
var Notification = { notify };
var services = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  MessageBox,
  Notification
});
const install = (app, options = {}) => {
  locale.use(options.locale);
  locale.i18n(options.i18n);
  Object.keys(components).forEach((key) => {
    const _key = options.prefix ? options.prefix + key : key;
    app.component(_key, components[key]);
  });
  Object.keys(directives).forEach((key) => {
    const _key = options.prefix ? options.prefix + "-" + key : key;
    app.directive(_key, directives[key]);
  });
  Object.keys(services).forEach((key) => {
    const service = services[key];
    Object.keys(service).forEach((serviceKey) => {
      const _key = options.prefix ? options.prefix + "_" + serviceKey : serviceKey;
      app.config.globalProperties["$" + _key] = service[serviceKey];
    });
  });
};
export { Affix, Alert, BreadcrumbItem, Breadcrumbs, Btn, BtnGroup, BtnToolbar, Carousel, _sfc_main$t as Collapse, DatePicker, _sfc_main$s as Dropdown, MessageBox, Modal, MultiSelect, Navbar, NavbarForm, NavbarNav, NavbarText, Notification, Pagination, _sfc_main$e as Popover, ProgressBar, ProgressBarStack, Slide, Tab, Tabs, TimePicker, _sfc_main$f as Tooltip, Typeahead, install, popover, scrollspy, tooltip };
