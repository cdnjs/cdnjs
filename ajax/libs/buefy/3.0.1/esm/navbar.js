import { defineComponent, createElementBlock, openBlock, mergeProps, createElementVNode, h, resolveComponent, withDirectives, resolveDirective, createBlock, resolveDynamicComponent, withCtx, renderSlot, withKeys, withModifiers, Fragment, createTextVNode, toDisplayString, normalizeClass } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './config-CKuo-p6e.js';

var _sfc_main$3 = defineComponent({
  name: "NavbarBurger",
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  }
});

const _hoisted_1 = ["aria-expanded"];
const _hoisted_2 = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3 = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_4 = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", mergeProps({
    role: "button",
    class: ["navbar-burger burger", { "is-active": _ctx.isOpened }],
    "aria-label": "menu",
    "aria-expanded": _ctx.isOpened || void 0
  }, _ctx.$attrs, { tabindex: "0" }), [..._hoisted_6], 16, _hoisted_1);
}
var NavbarBurger = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);

const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
const events = isTouch ? ["touchstart", "click"] : ["click"];
const instances = [];
function processArgs(bindingValue) {
  const isFunction = typeof bindingValue === "function";
  if (!isFunction && typeof bindingValue !== "object") {
    throw new Error(`v-click-outside: Binding value should be a function or an object, ${typeof bindingValue} given`);
  }
  return {
    handler: isFunction ? bindingValue : bindingValue.handler,
    middleware: !isFunction && bindingValue.middleware || ((isClickOutside) => !!isClickOutside),
    events: !isFunction && bindingValue.events || events
  };
}
function onEvent({ el, event, handler, middleware }) {
  const isClickOutside = event.target !== el && !el.contains(event.target);
  if (!isClickOutside || !middleware(event, el)) {
    return;
  }
  handler(event, el);
}
function toggleEventListeners({ eventHandlers }, action) {
  eventHandlers.forEach(({ event, handler }) => {
    document[`${action}EventListener`](event, handler);
  });
}
function beforeMount(el, { value }) {
  const { handler, middleware, events: events2 } = processArgs(value);
  const instance = {
    el,
    eventHandlers: events2.map((eventName) => ({
      event: eventName,
      handler: (event) => onEvent({ event, el, handler, middleware })
    }))
  };
  toggleEventListeners(instance, "add");
  instances.push(instance);
}
function updated(el, { value }) {
  const { handler, middleware, events: events2 } = processArgs(value);
  const instance = instances.filter((instance2) => instance2.el === el)[0];
  toggleEventListeners(instance, "remove");
  instance.eventHandlers = events2.map((eventName) => ({
    event: eventName,
    handler: (event) => onEvent({ event, el, handler, middleware })
  }));
  toggleEventListeners(instance, "add");
}
function unmounted(el) {
  const instance = instances.filter((instance2) => instance2.el === el)[0];
  toggleEventListeners(instance, "remove");
}
const directive = {
  beforeMount,
  updated,
  unmounted
};

const FIXED_TOP_CLASS = "is-fixed-top";
const BODY_FIXED_TOP_CLASS = "has-navbar-fixed-top";
const BODY_SPACED_FIXED_TOP_CLASS = "has-spaced-navbar-fixed-top";
const FIXED_BOTTOM_CLASS = "is-fixed-bottom";
const BODY_FIXED_BOTTOM_CLASS = "has-navbar-fixed-bottom";
const BODY_SPACED_FIXED_BOTTOM_CLASS = "has-spaced-navbar-fixed-bottom";
const BODY_CENTERED_CLASS = "has-navbar-centered";
const isFilled = (str) => !!str;
var _sfc_main$2 = defineComponent({
  name: "BNavbar",
  components: {
    NavbarBurger
  },
  directives: {
    clickOutside: directive
  },
  props: {
    type: [String, Object],
    transparent: {
      type: Boolean,
      default: false
    },
    fixedTop: {
      type: Boolean,
      default: false
    },
    fixedBottom: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: [String, Array, Object]
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    mobileBurger: {
      type: Boolean,
      default: true
    },
    spaced: Boolean,
    shadow: Boolean
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      internalIsActive: this.modelValue,
      _isNavBar: true
      // Used internally by NavbarItem
    };
  },
  computed: {
    isOpened() {
      return this.internalIsActive;
    },
    computedClasses() {
      return [
        this.type,
        {
          [FIXED_TOP_CLASS]: this.fixedTop,
          [FIXED_BOTTOM_CLASS]: this.fixedBottom,
          [BODY_CENTERED_CLASS]: this.centered,
          "is-spaced": this.spaced,
          "has-shadow": this.shadow,
          "is-transparent": this.transparent
        }
      ];
    }
  },
  watch: {
    modelValue: {
      handler(active) {
        this.internalIsActive = active;
      },
      immediate: true
    },
    fixedTop(isSet) {
      this.setBodyFixedTopClass(isSet);
    },
    bottomTop(isSet) {
      this.setBodyFixedBottomClass(isSet);
    }
  },
  methods: {
    toggleActive() {
      this.internalIsActive = !this.internalIsActive;
      this.emitUpdateParentEvent();
    },
    closeMenu() {
      if (this.closeOnClick && this.internalIsActive) {
        this.internalIsActive = false;
        this.emitUpdateParentEvent();
      }
    },
    emitUpdateParentEvent() {
      this.$emit("update:modelValue", this.internalIsActive);
    },
    setBodyClass(className) {
      if (typeof window !== "undefined") {
        document.body.classList.add(className);
      }
    },
    removeBodyClass(className) {
      if (typeof window !== "undefined") {
        document.body.classList.remove(className);
      }
    },
    checkIfFixedPropertiesAreColliding() {
      const areColliding = this.fixedTop && this.fixedBottom;
      if (areColliding) {
        throw new Error("You should choose if the BNavbar is fixed bottom or fixed top, but not both");
      }
    },
    genNavbar() {
      const navBarSlots = [
        this.genNavbarBrandNode(),
        this.genNavbarSlotsNode()
      ];
      if (!isFilled(this.wrapperClass)) {
        return this.genNavbarSlots(navBarSlots);
      }
      const navWrapper = h(
        "div",
        { class: this.wrapperClass },
        navBarSlots
      );
      return this.genNavbarSlots([navWrapper]);
    },
    genNavbarSlots(slots) {
      const vnode = h(
        "nav",
        {
          class: ["navbar", this.computedClasses],
          role: "navigation",
          "aria-label": "main navigation"
        },
        slots
      );
      return withDirectives(vnode, [
        [resolveDirective("click-outside"), this.closeMenu]
      ]);
    },
    genNavbarBrandNode() {
      const children = this.$slots.brand != null ? [this.$slots.brand(), this.genBurgerNode()] : this.genBurgerNode();
      return h(
        "div",
        { class: "navbar-brand" },
        children
      );
    },
    genBurgerNode() {
      if (this.mobileBurger) {
        const defaultBurgerNode = h(
          resolveComponent("navbar-burger"),
          {
            isOpened: this.isOpened,
            onClick: this.toggleActive,
            onKeyup: (event) => {
              if (event.keyCode !== 13) return;
              this.toggleActive();
            }
          }
        );
        const hasBurgerSlot = !!this.$slots.burger;
        return hasBurgerSlot ? this.$slots.burger({
          isOpened: this.isOpened,
          toggleActive: this.toggleActive
        }) : defaultBurgerNode;
      }
    },
    genNavbarSlotsNode() {
      return h(
        "div",
        { class: ["navbar-menu", { "is-active": this.isOpened }] },
        [
          this.genMenuPosition("start"),
          this.genMenuPosition("end")
        ]
      );
    },
    genMenuPosition(positionName) {
      return h(
        "div",
        { class: `navbar-${positionName}` },
        this.$slots[positionName] != null ? this.$slots[positionName]() : []
      );
    },
    setBodyFixedTopClass(isSet) {
      this.checkIfFixedPropertiesAreColliding();
      if (isSet) {
        this.setBodyClass(BODY_FIXED_TOP_CLASS);
        this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
      } else {
        this.removeBodyClass(BODY_FIXED_TOP_CLASS);
        this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
      }
    },
    setBodyFixedBottomClass(isSet) {
      this.checkIfFixedPropertiesAreColliding();
      if (isSet) {
        this.setBodyClass(BODY_FIXED_BOTTOM_CLASS);
        this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
      } else {
        this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS);
        this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
      }
    }
  },
  beforeMount() {
    this.fixedTop && this.setBodyFixedTopClass(true);
    this.fixedBottom && this.setBodyFixedBottomClass(true);
  },
  beforeUnmount() {
    if (this.fixedTop) {
      const className = this.spaced ? BODY_SPACED_FIXED_TOP_CLASS : BODY_FIXED_TOP_CLASS;
      this.removeBodyClass(className);
    } else if (this.fixedBottom) {
      const className = this.spaced ? BODY_SPACED_FIXED_BOTTOM_CLASS : BODY_FIXED_BOTTOM_CLASS;
      this.removeBodyClass(className);
    }
  },
  render() {
    return this.genNavbar();
  }
});

const clickableWhiteList = ["div", "span", "input"];
var _sfc_main$1 = defineComponent({
  name: "BNavbarItem",
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: "a"
    },
    active: Boolean
  },
  methods: {
    /*
     * Keypress event that is bound to the document
     */
    keyPress({ key }) {
      if (key === "Escape" || key === "Esc") {
        this.closeMenuRecursive(this, ["NavBar"]);
      }
    },
    /*
     * Close parent if clicked outside.
     */
    handleClickEvent(event) {
      const isOnWhiteList = clickableWhiteList.some((item) => item === event.target.localName);
      if (!isOnWhiteList) {
        const parent = this.closeMenuRecursive(this, ["NavbarDropdown", "NavBar"]);
        if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ["NavBar"]);
      }
    },
    /*
     * Close parent recursively
     */
    closeMenuRecursive(current, targetComponents) {
      const parent = current.$parent;
      if (!parent) return null;
      const foundItem = targetComponents.reduce((acc, item) => {
        if (parent.$data[`_is${item}`]) {
          parent.closeMenu();
          return parent;
        }
        return acc;
      }, null);
      return foundItem || this.closeMenuRecursive(parent, targetComponents);
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      this.$el.addEventListener("click", this.handleClickEvent);
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      this.$el.removeEventListener("click", this.handleClickEvent);
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    class: ["navbar-item", {
      "is-active": _ctx.active
    }]
  }, _ctx.$attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["class"]);
}
var NavbarItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

var _sfc_main = defineComponent({
  name: "BNavbarDropdown",
  directives: {
    clickOutside: directive
  },
  mixins: [CompatFallthroughMixin],
  props: {
    label: String,
    hoverable: Boolean,
    active: Boolean,
    right: Boolean,
    arrowless: Boolean,
    boxed: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    collapsible: Boolean,
    tag: {
      type: [String, Object],
      default: "a"
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "active-change": (_active) => true
  },
  data() {
    return {
      newActive: this.active,
      isHoverable: this.hoverable,
      _isNavbarDropdown: true
      // Used internally by NavbarItem
    };
  },
  watch: {
    active(value) {
      this.newActive = value;
    },
    newActive(value) {
      this.$emit("active-change", value);
    }
  },
  methods: {
    toggleMenu() {
      this.newActive = !this.newActive;
    },
    showMenu() {
      this.newActive = true;
    },
    /*
    * See naming convetion of navbaritem
    */
    closeMenu() {
      this.newActive = !this.closeOnClick;
      if (this.hoverable && this.closeOnClick) {
        this.isHoverable = false;
      }
    },
    checkHoverable() {
      if (this.hoverable) {
        this.isHoverable = true;
      }
    }
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_click_outside = resolveDirective("click-outside");
  return withDirectives((openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["navbar-item has-dropdown", {
        "is-hoverable": _ctx.isHoverable,
        "is-active": _ctx.newActive
      }],
      onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.checkHoverable && _ctx.checkHoverable(...args))
    }, _ctx.rootAttrs),
    [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
        class: ["navbar-link", {
          "is-arrowless": _ctx.arrowless,
          "is-active": _ctx.newActive && _ctx.collapsible
        }]
      }, _ctx.fallthroughAttrs, {
        "aria-haspopup": "true",
        onClick: withModifiers(_ctx.toggleMenu, ["prevent"]),
        onKeyup: withKeys(_ctx.toggleMenu, ["enter"]),
        tabindex: "0"
      }), {
        default: withCtx(() => [
          _ctx.label ? (openBlock(), createElementBlock(
            Fragment,
            { key: 0 },
            [
              createTextVNode(
                toDisplayString(_ctx.label),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : renderSlot(_ctx.$slots, "label", { key: 1 })
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["class", "onClick", "onKeyup"])),
      createElementVNode(
        "div",
        {
          class: normalizeClass(["navbar-dropdown", {
            "is-right": _ctx.right,
            "is-boxed": _ctx.boxed,
            "is-hidden-touch": _ctx.collapsible && !_ctx.newActive
          }])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    16
    /* FULL_PROPS */
  )), [
    [_directive_click_outside, _ctx.closeMenu]
  ]);
}
var NavbarDropdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, _sfc_main$2);
    registerComponent(Vue, NavbarItem);
    registerComponent(Vue, NavbarDropdown);
  }
};

export { _sfc_main$2 as BNavbar, NavbarDropdown as BNavbarDropdown, NavbarItem as BNavbarItem, Plugin as default };
