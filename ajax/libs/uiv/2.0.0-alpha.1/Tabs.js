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
import { createVNode, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, Fragment, renderList, withDirectives, createBlock, withCtx, withModifiers, toDisplayString, vShow, createTextVNode, renderSlot, createCommentVNode } from "vue";
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
function on(element, event, handler) {
  element.addEventListener(event, handler);
}
function off(element, event, handler) {
  element.removeEventListener(event, handler);
}
function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
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
function focus(el) {
  if (!isElement(el)) {
    return;
  }
  el.getAttribute("tabindex") ? null : el.setAttribute("tabindex", "-1");
  el.focus();
}
const DEFAULT_TAG = "div";
var _sfc_main$1 = {
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
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  components: { Dropdown: _sfc_main$1 },
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
const _hoisted_1 = /* @__PURE__ */ createElementVNode("span", { class: "caret" }, null, -1);
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["id", "onClick"];
const _hoisted_4 = ["onClick", "textContent"];
const _hoisted_5 = {
  key: 0,
  class: "pull-right"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
                  }, toDisplayString(subTab.title), 9, _hoisted_2)
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
                _hoisted_1
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
            }, null, 8, _hoisted_3)) : (openBlock(), createElementBlock("a", {
              key: 1,
              role: "tab",
              href: "#",
              onClick: withModifiers(($event) => $options.select($data.tabs.indexOf(tab)), ["prevent"]),
              textContent: toDisplayString(tab.title)
            }, null, 8, _hoisted_4))
          ], 2)), [
            [vShow, !tab.hidden]
          ])
        ], 64);
      }), 128)),
      !$props.justified && _ctx.$slots["nav-right"] ? (openBlock(), createElementBlock("li", _hoisted_5, [
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
var Tabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Tabs as default };
