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
import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers, createCommentVNode, createTextVNode, toDisplayString, createVNode } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isPromiseSupported() {
  return typeof window !== "undefined" && isExist(window.Promise);
}
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
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$2 = {
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
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
var BtnGroup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const INPUT_TYPE_CHECKBOX = "checkbox";
const INPUT_TYPE_RADIO = "radio";
const _sfc_main$1 = {
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
const _hoisted_1$1 = ["href", "target"];
const _hoisted_2$1 = ["type", "checked", "disabled"];
const _hoisted_3$1 = ["type", "disabled"];
const _hoisted_4$1 = ["type", "disabled"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
  ], 10, _hoisted_1$1)) : _ctx.to ? (openBlock(), createBlock(_component_router_link, {
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
    }, null, 40, _hoisted_2$1),
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
      ], 10, _hoisted_3$1)
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
  ], 10, _hoisted_4$1));
}
var Btn = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
const MODAL_BACKDROP = "modal-backdrop";
function getOpenModals() {
  return document.querySelectorAll(`.${MODAL_BACKDROP}`);
}
function getOpenModalNum() {
  return getOpenModals().length;
}
const IN = "in";
const _sfc_main = {
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
const _hoisted_1 = { class: "modal-content" };
const _hoisted_2 = {
  key: 0,
  class: "modal-header"
};
const _hoisted_3 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xD7", -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = { class: "modal-title" };
const _hoisted_6 = { class: "modal-body" };
const _hoisted_7 = {
  key: 1,
  class: "modal-footer"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
      createElementVNode("div", _hoisted_1, [
        $props.header ? (openBlock(), createElementBlock("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            $props.dismissBtn ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "close",
              "aria-label": "Close",
              style: { "position": "relative", "z-index": "1060" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.toggle(false))
            }, _hoisted_4)) : createCommentVNode("", true),
            createElementVNode("h4", _hoisted_5, [
              renderSlot(_ctx.$slots, "title", {}, () => [
                createTextVNode(toDisplayString($props.title), 1)
              ])
            ])
          ])
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_6, [
          renderSlot(_ctx.$slots, "default")
        ]),
        $props.footer ? (openBlock(), createElementBlock("div", _hoisted_7, [
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
var Modal = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Modal as default };
