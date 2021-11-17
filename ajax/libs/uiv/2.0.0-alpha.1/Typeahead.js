import { createVNode, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createElementBlock, Fragment, renderList, normalizeClass, createElementVNode, withModifiers, createCommentVNode } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isFunction(obj) {
  return typeof obj === "function";
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
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
              }, null, 8, _hoisted_2)
            ], 8, _hoisted_1)
          ], 2);
        }), 128))
      ]),
      !$data.items || $data.items.length === 0 ? renderSlot(_ctx.$slots, "empty", { key: 0 }) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["modelValue", "append-to-body", "not-close-elements", "position-element"]);
}
var Typeahead = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Typeahead as default };
