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
import { createVNode, resolveComponent, openBlock, createBlock, normalizeStyle, withKeys, withCtx, createElementBlock, withDirectives, createElementVNode, withModifiers, vModelText, createCommentVNode, Fragment, renderList, toDisplayString, normalizeClass, renderSlot } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isBoolean(obj) {
  return typeof obj === "boolean";
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
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
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
const _hoisted_1 = ["disabled"];
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", {
  class: "pull-right",
  style: { "display": "inline-block", "vertical-align": "middle" }
}, [
  /* @__PURE__ */ createElementVNode("span", null, "\xA0"),
  /* @__PURE__ */ createElementVNode("span", { class: "caret" })
], -1);
const _hoisted_3 = ["textContent"];
const _hoisted_4 = {
  key: 0,
  style: { "padding": "4px 8px" }
};
const _hoisted_5 = ["placeholder"];
const _hoisted_6 = ["textContent"];
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
      $props.filterable ? (openBlock(), createElementBlock("li", _hoisted_4, [
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
        }, null, 40, _hoisted_5), [
          [vModelText, $data.filterInput]
        ])
      ])) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.groupedOptions, (item, i) => {
        return openBlock(), createElementBlock(Fragment, null, [
          item.$group ? (openBlock(), createElementBlock("li", {
            key: i,
            class: "dropdown-header",
            textContent: toDisplayString(item.$group)
          }, null, 8, _hoisted_6)) : createCommentVNode("", true),
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
        _hoisted_2,
        createElementVNode("div", {
          class: normalizeClass($options.selectTextClasses),
          style: { "overflow-x": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" },
          textContent: toDisplayString($options.selectedText)
        }, null, 10, _hoisted_3)
      ], 42, _hoisted_1)
    ]),
    _: 3
  }, 8, ["modelValue", "not-close-elements", "append-to-body", "disabled", "style"]);
}
var MultiSelect = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { MultiSelect as default };
