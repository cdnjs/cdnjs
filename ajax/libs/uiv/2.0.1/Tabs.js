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
import { defineComponent, ref, onMounted, onBeforeUnmount, watch, createVNode, Teleport, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, Fragment, renderList, withDirectives, createBlock, withCtx, withModifiers, toDisplayString, vShow, createTextVNode, renderSlot, createCommentVNode } from "vue";
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
  if (!el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
  }
  el.focus();
}
const DEFAULT_TAG = "div";
var _sfc_main$1 = defineComponent({
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
  setup(props, {
    emit,
    slots
  }) {
    const show = ref(false);
    const triggerEl = ref(void 0);
    const dropdown = ref(null);
    const element = ref(null);
    function getFocusItem() {
      var _a;
      return (_a = dropdown.value) == null ? void 0 : _a.querySelector("li > a:focus");
    }
    function onKeyPress(event) {
      var _a, _b;
      if (show.value) {
        const dropdownEl = dropdown.value;
        const keyCode = event.keyCode;
        if (keyCode === 27) {
          toggle(false);
          (_a = triggerEl.value) == null ? void 0 : _a.focus();
        } else if (keyCode === 13) {
          (_b = getFocusItem()) == null ? void 0 : _b.click();
        } else if (keyCode === 38 || keyCode === 40) {
          event.preventDefault();
          event.stopPropagation();
          const currentFocus = getFocusItem();
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
    }
    function initTrigger() {
      var _a, _b, _c;
      const trigger = ((_a = element.value) == null ? void 0 : _a.querySelector('[data-role="trigger"]')) || ((_b = element.value) == null ? void 0 : _b.querySelector(".dropdown-toggle")) || ((_c = element.value) == null ? void 0 : _c.firstChild);
      triggerEl.value = trigger && trigger !== dropdown.value ? trigger : null;
    }
    function toggle(s) {
      var _a;
      if (props.disabled) {
        return;
      }
      if (typeof s === "boolean") {
        show.value = s;
      } else {
        show.value = !show.value;
      }
      if (props.appendToBody) {
        if (show.value) {
          dropdown.value.style.display = "block";
          const positionElement = props.positionElement || element.value;
          setDropdownPosition(dropdown.value, positionElement, props);
        } else {
          (_a = dropdown.value) == null ? void 0 : _a.removeAttribute("style");
        }
      }
      emit("update:modelValue", show.value);
    }
    function windowClicked(event) {
      var _a, _b, _c;
      const target = event.target;
      if (show.value && target) {
        let targetInNotCloseElements = false;
        if (props.notCloseElements) {
          for (let i = 0, l = props.notCloseElements.length; i < l; i++) {
            const isTargetInElement = props.notCloseElements[i].contains(target);
            let shouldBreak = isTargetInElement;
            if (props.appendToBody) {
              const isTargetInDropdown = (_a = dropdown.value) == null ? void 0 : _a.contains(target);
              const isElInElements = props.notCloseElements.indexOf(element.value) >= 0;
              shouldBreak = isTargetInElement || isTargetInDropdown && isElInElements;
            }
            if (shouldBreak) {
              targetInNotCloseElements = true;
              break;
            }
          }
        }
        const targetInDropdownBody = (_b = dropdown.value) == null ? void 0 : _b.contains(target);
        const targetInTrigger = ((_c = element.value) == null ? void 0 : _c.contains(target)) && !targetInDropdownBody;
        const targetInDropdownAndIsTouchEvent = targetInDropdownBody && event.type === "touchend";
        if (!targetInTrigger && !targetInNotCloseElements && !targetInDropdownAndIsTouchEvent) {
          toggle(false);
        }
      }
    }
    onMounted(() => {
      initTrigger();
      if (triggerEl.value) {
        on(triggerEl.value, EVENTS.CLICK, toggle);
        on(triggerEl.value, EVENTS.KEY_DOWN, onKeyPress);
      }
      on(dropdown.value, EVENTS.KEY_DOWN, onKeyPress);
      on(window, EVENTS.CLICK, windowClicked);
      on(window, EVENTS.TOUCH_END, windowClicked);
      if (props.modelValue) {
        toggle(true);
      }
    });
    onBeforeUnmount(() => {
      if (triggerEl.value) {
        off(triggerEl.value, EVENTS.CLICK, toggle);
        off(triggerEl.value, EVENTS.KEY_DOWN, onKeyPress);
      }
      off(dropdown.value, EVENTS.KEY_DOWN, onKeyPress);
      off(window, EVENTS.CLICK, windowClicked);
      off(window, EVENTS.TOUCH_END, windowClicked);
    });
    watch(() => props.modelValue, (value) => {
      toggle(value);
    });
    return () => {
      const Tag = props.tag;
      return createVNode(Tag, {
        "ref": element,
        "class": {
          "btn-group": props.tag === DEFAULT_TAG,
          dropdown: !props.dropup,
          dropup: props.dropup,
          open: show.value
        }
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots), createVNode(Teleport, {
            "to": "body",
            "disabled": !props.appendToBody || !show.value
          }, {
            default: () => {
              var _a2;
              return [createVNode("ul", {
                "ref": dropdown,
                "class": {
                  "dropdown-menu": true,
                  "dropdown-menu-right": props.menuRight
                }
              }, [(_a2 = slots.dropdown) == null ? void 0 : _a2.call(slots)])];
            }
          })];
        }
      });
    };
  }
});
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
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
