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
import { openBlock, createElementBlock, normalizeClass, renderSlot, computed, resolveComponent, unref, createBlock, withCtx, createElementVNode, withModifiers, createCommentVNode, createTextVNode, toDisplayString, createVNode, ref, createSlots, withDirectives, withKeys, vModelDynamic, vShow, Fragment, h, render } from "vue";
const TYPES = {
  ALERT: 0,
  CONFIRM: 1,
  PROMPT: 2
};
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isString(obj) {
  return typeof obj === "string";
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
const _sfc_main$3 = {
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: false },
    justified: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "btn-group": !__props.vertical,
          "btn-group-vertical": __props.vertical,
          "btn-group-justified": __props.justified,
          [`btn-group-${__props.size}`]: __props.size
        }),
        role: "group",
        "data-toggle": "buttons"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
};
const linkProps = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  exact: { type: Boolean, default: false }
};
const _hoisted_1$2 = ["href", "target"];
const _hoisted_2$2 = ["type", "checked", "disabled"];
const _hoisted_3$2 = ["type", "disabled"];
const _hoisted_4$2 = ["type", "disabled"];
const _sfc_main$2 = {
  props: __spreadProps(__spreadValues({}, linkProps), {
    justified: { type: Boolean, default: false },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    modelValue: { type: null, default: null },
    inputValue: { type: null, default: null },
    inputType: {
      type: String,
      validator(value) {
        return value === "checkbox" || value === "radio";
      },
      default: void 0
    }
  }),
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const isInputActive = computed(() => props.inputType === "checkbox" ? props.modelValue.indexOf(props.inputValue) >= 0 : props.modelValue === props.inputValue);
    const classes = computed(() => ({
      btn: true,
      active: props.inputType ? isInputActive.value : props.active,
      disabled: props.disabled,
      "btn-block": props.block,
      [`btn-${props.type}`]: !!props.type,
      [`btn-${props.size}`]: !!props.size
    }));
    function onClick(e) {
      if (props.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    function onInputChange() {
      if (props.inputType === "checkbox") {
        const valueCopied = props.modelValue.slice();
        if (isInputActive.value) {
          valueCopied.splice(valueCopied.indexOf(props.inputValue), 1);
        } else {
          valueCopied.push(props.inputValue);
        }
        emit("update:modelValue", valueCopied);
      } else {
        emit("update:modelValue", props.inputValue);
      }
    }
    return (_ctx, _cache) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      return _ctx.href ? (openBlock(), createElementBlock("a", {
        key: 0,
        href: _ctx.href,
        target: _ctx.target,
        role: "button",
        class: normalizeClass(unref(classes)),
        onClick
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1$2)) : _ctx.to ? (openBlock(), createBlock(_component_RouterLink, {
        key: 1,
        to: _ctx.to,
        class: normalizeClass(unref(classes)),
        event: __props.disabled ? "" : "click",
        replace: _ctx.replace,
        append: _ctx.append,
        exact: _ctx.exact,
        role: "button",
        onClick
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : __props.inputType ? (openBlock(), createElementBlock("label", {
        key: 2,
        class: normalizeClass(unref(classes)),
        onClick
      }, [
        createElementVNode("input", {
          autocomplete: "off",
          type: __props.inputType,
          checked: unref(isInputActive),
          disabled: __props.disabled,
          onInput: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"])),
          onChange: onInputChange
        }, null, 40, _hoisted_2$2),
        renderSlot(_ctx.$slots, "default")
      ], 2)) : __props.justified ? (openBlock(), createBlock(_sfc_main$3, { key: 3 }, {
        default: withCtx(() => [
          createElementVNode("button", {
            class: normalizeClass(unref(classes)),
            type: __props.nativeType,
            disabled: __props.disabled,
            onClick
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_3$2)
        ]),
        _: 3
      })) : (openBlock(), createElementBlock("button", {
        key: 4,
        class: normalizeClass(unref(classes)),
        type: __props.nativeType,
        disabled: __props.disabled,
        onClick
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_4$2));
    };
  }
};
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
function getComputedStyle(el) {
  return window.getComputedStyle(el);
}
function getViewportSize() {
  const width = window.innerWidth || 0;
  const height = window.innerHeight || 0;
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
  el.classList.add(className);
}
function removeClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  el.classList.remove(className);
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
    [...document.querySelectorAll(FIXED_CONTENT)].forEach((node) => {
      node.style.paddingRight = null;
    });
  } else {
    const documentHasScrollbar = hasScrollbar(document.documentElement) || hasScrollbar(document.body);
    if (documentHasScrollbar) {
      const scrollbarWidth2 = getScrollbarWidth();
      body.style.paddingRight = `${scrollbarWidth2}px`;
      [...document.querySelectorAll(FIXED_CONTENT)].forEach((node) => {
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
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const IN = "in";
const _sfc_main$1 = {
  components: { Btn: _sfc_main$2 },
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: void 0 },
    size: { type: String, default: void 0 },
    backdrop: { type: Boolean, default: true },
    footer: { type: Boolean, default: true },
    header: { type: Boolean, default: true },
    cancelText: { type: String, default: void 0 },
    cancelType: { type: String, default: "default" },
    okText: { type: String, default: void 0 },
    okType: { type: String, default: "primary" },
    dismissBtn: { type: Boolean, default: true },
    transition: { type: Number, default: 150 },
    autoFocus: { type: Boolean, default: false },
    keyboard: { type: Boolean, default: true },
    beforeClose: { type: Function, default: void 0 },
    zOffset: { type: Number, default: 20 },
    appendToBody: { type: Boolean, default: false },
    displayStyle: { type: String, default: "block" }
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
        [`modal-${this.size}`]: !!this.size
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
    t,
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
        this.hideModal();
      }
    },
    hideModal(msg) {
      const shouldClose = isFunction(this.beforeClose) ? this.beforeClose(msg) : true;
      Promise.resolve(shouldClose).then((_shouldClose) => {
        if (!_shouldClose) {
          return;
        }
        this.msg = msg;
        this.$emit("update:modelValue", false);
      });
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
    backdropClicked() {
      if (this.backdrop && !this.isCloseSuppressed) {
        this.hideModal();
      }
    }
  }
};
const _hoisted_1$1 = { class: "modal-content" };
const _hoisted_2$1 = {
  key: 0,
  class: "modal-header"
};
const _hoisted_3$1 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xD7", -1);
const _hoisted_4$1 = [
  _hoisted_3$1
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
      createElementVNode("div", _hoisted_1$1, [
        $props.header ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            $props.dismissBtn ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "close",
              "aria-label": "Close",
              style: { "position": "relative", "z-index": "1060" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.hideModal())
            }, _hoisted_4$1)) : createCommentVNode("", true),
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
              onClick: _cache[1] || (_cache[1] = ($event) => $options.hideModal("cancel"))
            }, {
              default: withCtx(() => [
                createElementVNode("span", null, toDisplayString($props.cancelText || $options.t("uiv.modal.cancel")), 1)
              ]),
              _: 1
            }, 8, ["type"]),
            createVNode(_component_btn, {
              type: $props.okType,
              "data-action": "auto-focus",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.hideModal("ok"))
            }, {
              default: withCtx(() => [
                createElementVNode("span", null, toDisplayString($props.okText || $options.t("uiv.modal.ok")), 1)
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
var Modal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 2 };
const _hoisted_4 = ["type", "onKeyup"];
const _sfc_main = {
  props: {
    backdrop: { type: null, default: void 0 },
    title: { type: String, default: void 0 },
    content: { type: String, default: void 0 },
    html: { type: Boolean, default: false },
    okText: { type: String, default: void 0 },
    okType: { type: String, default: "primary" },
    cancelText: { type: String, default: void 0 },
    cancelType: { type: String, default: "default" },
    type: { type: Number, default: 0 },
    size: { type: String, default: "sm" },
    cb: { type: Function, required: true },
    validator: {
      type: Function,
      default: () => null
    },
    customClass: { type: null, default: void 0 },
    defaultValue: { type: String, default: void 0 },
    inputType: { type: String, default: "text" },
    autoFocus: { type: String, default: "ok" },
    reverseButtons: { type: Boolean, default: false }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const show = ref(true);
    const input = ref((_a = props.defaultValue) != null ? _a : "");
    const dirty = ref(false);
    const modal = ref(null);
    const closeOnBackdropClick = computed(() => isExist(props.backdrop) ? !!props.backdrop : props.type !== TYPES.ALERT);
    const inputError = computed(() => props.validator(input.value));
    const inputNotValid = computed(() => dirty.value && inputError.value);
    const okBtnText = computed(() => props.okText || t("uiv.modal.ok"));
    const cancelBtnText = computed(() => props.cancelText || t("uiv.modal.cancel"));
    function hide(msg) {
      var _a2;
      (_a2 = modal.value) == null ? void 0 : _a2.hideModal(msg);
    }
    function validate() {
      dirty.value = true;
      if (!isExist(inputError.value)) {
        hide({ value: input.value });
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Modal, {
        ref_key: "modal",
        ref: modal,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => show.value = $event),
        "auto-focus": "",
        size: __props.size,
        title: __props.title,
        header: !!__props.title,
        backdrop: unref(closeOnBackdropClick),
        "cancel-text": __props.cancelText,
        "ok-text": __props.okText,
        class: normalizeClass(__props.customClass),
        onHide: __props.cb
      }, createSlots({
        default: withCtx(() => [
          __props.html ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: __props.content
          }, null, 8, _hoisted_1)) : (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(__props.content), 1)),
          __props.type === unref(TYPES).PROMPT ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createElementVNode("div", {
              class: normalizeClass(["form-group", { "has-error": unref(inputNotValid) }])
            }, [
              withDirectives(createElementVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
                type: __props.inputType,
                class: "form-control",
                required: "",
                "data-action": "auto-focus",
                onChange: _cache[1] || (_cache[1] = ($event) => dirty.value = true),
                onKeyup: withKeys(validate, ["enter"])
              }, null, 40, _hoisted_4), [
                [vModelDynamic, input.value]
              ]),
              withDirectives(createElementVNode("span", { class: "help-block" }, toDisplayString(unref(inputError)), 513), [
                [vShow, unref(inputNotValid)]
              ])
            ], 2)
          ])) : createCommentVNode("", true)
        ]),
        _: 2
      }, [
        __props.type === unref(TYPES).ALERT ? {
          name: "footer",
          fn: withCtx(() => [
            createVNode(_sfc_main$2, {
              type: __props.okType,
              "data-action": __props.autoFocus === "ok" ? "auto-focus" : "",
              onClick: _cache[2] || (_cache[2] = ($event) => hide("ok")),
              textContent: toDisplayString(unref(okBtnText))
            }, null, 8, ["type", "data-action", "textContent"])
          ])
        } : {
          name: "footer",
          fn: withCtx(() => [
            __props.reverseButtons ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              __props.type === unref(TYPES).CONFIRM ? (openBlock(), createBlock(_sfc_main$2, {
                key: 0,
                type: __props.okType,
                "data-action": __props.autoFocus === "ok" ? "auto-focus" : "",
                onClick: _cache[3] || (_cache[3] = ($event) => hide("ok")),
                textContent: toDisplayString(unref(okBtnText))
              }, null, 8, ["type", "data-action", "textContent"])) : (openBlock(), createBlock(_sfc_main$2, {
                key: 1,
                type: __props.okType,
                onClick: validate,
                textContent: toDisplayString(unref(okBtnText))
              }, null, 8, ["type", "textContent"])),
              createVNode(_sfc_main$2, {
                type: __props.cancelType,
                "data-action": __props.autoFocus === "cancel" ? "auto-focus" : "",
                onClick: _cache[4] || (_cache[4] = ($event) => hide("cancel")),
                textContent: toDisplayString(unref(cancelBtnText))
              }, null, 8, ["type", "data-action", "textContent"])
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createVNode(_sfc_main$2, {
                type: __props.cancelType,
                "data-action": __props.autoFocus === "cancel" ? "auto-focus" : "",
                onClick: _cache[5] || (_cache[5] = ($event) => hide("cancel")),
                textContent: toDisplayString(unref(cancelBtnText))
              }, null, 8, ["type", "data-action", "textContent"]),
              __props.type === unref(TYPES).CONFIRM ? (openBlock(), createBlock(_sfc_main$2, {
                key: 0,
                type: __props.okType,
                "data-action": __props.autoFocus === "ok" ? "auto-focus" : "",
                onClick: _cache[6] || (_cache[6] = ($event) => hide("ok")),
                textContent: toDisplayString(unref(okBtnText))
              }, null, 8, ["type", "data-action", "textContent"])) : (openBlock(), createBlock(_sfc_main$2, {
                key: 1,
                type: __props.okType,
                onClick: validate,
                textContent: toDisplayString(unref(okBtnText))
              }, null, 8, ["type", "textContent"]))
            ], 64))
          ])
        }
      ]), 1032, ["modelValue", "size", "title", "header", "backdrop", "cancel-text", "ok-text", "class", "onHide"]);
    };
  }
};
const destroy = (container) => {
  render(null, container);
};
const shallResolve = (type, msg) => {
  if (type === TYPES.CONFIRM) {
    return msg === "ok";
  } else {
    return isExist(msg) && isString(msg.value);
  }
};
const init = function(type, options, cb, resolve = null, reject = null) {
  const container = document.createElement("div");
  const vNode = h(_sfc_main, __spreadProps(__spreadValues({
    type
  }, options), {
    cb(msg) {
      destroy(container);
      if (isFunction(cb)) {
        if (type === TYPES.CONFIRM) {
          shallResolve(type, msg) ? cb(null, msg) : cb(msg);
        } else if (type === TYPES.PROMPT) {
          shallResolve(type, msg) ? cb(null, msg.value) : cb(msg);
        } else {
          cb(msg);
        }
      } else if (resolve && reject) {
        if (type === TYPES.CONFIRM) {
          shallResolve(type, msg) ? resolve(msg) : reject(msg);
        } else if (type === TYPES.PROMPT) {
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
  return new Promise((resolve, reject) => {
    init.apply(this, [type, options, cb, resolve, reject]);
  });
};
const alert = function(options, cb) {
  return initModal.apply(this, [TYPES.ALERT, options, cb]);
};
const confirm = function(options, cb) {
  return initModal.apply(this, [TYPES.CONFIRM, options, cb]);
};
const prompt = function(options, cb) {
  return initModal.apply(this, [TYPES.PROMPT, options, cb]);
};
var MessageBox = { alert, confirm, prompt };
export { MessageBox as default };
