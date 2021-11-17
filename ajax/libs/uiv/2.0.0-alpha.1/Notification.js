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
import { openBlock, createElementBlock, normalizeClass, createCommentVNode, renderSlot, createElementVNode, resolveComponent, createBlock, normalizeStyle, withCtx, toDisplayString, reactive, h, render } from "vue";
function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    const index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isString(obj) {
  return typeof obj === "string";
}
function isPromiseSupported() {
  return typeof window !== "undefined" && isExist(window.Promise);
}
function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
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
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$1 = {
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
const _hoisted_1$1 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xD7", -1);
const _hoisted_2$1 = [
  _hoisted_1$1
];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
    }, _hoisted_2$1)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Alert = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
export { Notification as default };
