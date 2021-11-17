import { createVNode, h, render } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isString(obj) {
  return typeof obj === "string";
}
function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
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
const TRIGGERS = {
  CLICK: "click",
  HOVER: "hover",
  FOCUS: "focus",
  HOVER_FOCUS: "hover-focus",
  OUTSIDE_CLICK: "outside-click",
  MANUAL: "manual"
};
const PLACEMENTS = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
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
function isAvailableAtPosition(trigger, popup, placement) {
  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const viewPortSize = getViewportSize();
  let top = true;
  let right = true;
  let bottom = true;
  let left = true;
  switch (placement) {
    case PLACEMENTS.TOP:
      top = triggerRect.top >= popupRect.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break;
    case PLACEMENTS.BOTTOM:
      bottom = triggerRect.bottom + popupRect.height <= viewPortSize.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break;
    case PLACEMENTS.RIGHT:
      right = triggerRect.right + popupRect.width <= viewPortSize.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height;
      break;
    case PLACEMENTS.LEFT:
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
      PLACEMENTS.RIGHT,
      PLACEMENTS.BOTTOM,
      PLACEMENTS.LEFT,
      PLACEMENTS.TOP
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
  if (placement === PLACEMENTS.BOTTOM) {
    top = containerScrollTop + rect.top + rect.height;
    left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  } else if (placement === PLACEMENTS.LEFT) {
    top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    left = containerScrollLeft + rect.left - tooltipRect.width;
  } else if (placement === PLACEMENTS.RIGHT) {
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
    if (placement === PLACEMENTS.BOTTOM) {
      top -= popoverFix;
    } else if (placement === PLACEMENTS.LEFT) {
      left += popoverFix;
    } else if (placement === PLACEMENTS.RIGHT) {
      left -= popoverFix;
    } else {
      top += popoverFix;
    }
  }
  tooltip2.style.top = `${top}px`;
  tooltip2.style.left = `${left}px`;
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
      default: PLACEMENTS.TOP
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
var _sfc_main = {
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
const INSTANCE = "_uiv_tooltip_instance";
const bind = (el, binding) => {
  unbind(el);
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
  const vNode = h(_sfc_main, {
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
  el[INSTANCE] = { container, vNode };
};
const unbind = (el) => {
  const instance = el[INSTANCE];
  if (instance) {
    try {
      removeFromDom(instance.vNode.component.ctx.$refs.popup);
    } catch (_) {
    }
    render(null, instance.container);
  }
  delete el[INSTANCE];
};
const update = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    bind(el, binding);
  }
};
var tooltip = { mounted: bind, unmounted: unbind, updated: update };
export { tooltip as default };
