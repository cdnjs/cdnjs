import { defineComponent, ref, onMounted, onBeforeUnmount, watch, createVNode, Teleport, useSlots, computed, nextTick, openBlock, createBlock, withCtx, renderSlot, createElementBlock, Fragment, renderList, normalizeClass, createElementVNode, withModifiers, createCommentVNode } from "vue";
function request(url, method = "GET") {
  return fetch(url, { method }).then((res) => res.json());
}
function isString(obj) {
  return typeof obj === "string";
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
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["innerHTML"];
const _sfc_main = {
  props: {
    modelValue: { type: null, required: true },
    data: { type: Array, default: void 0 },
    itemKey: { type: String, default: void 0 },
    appendToBody: { type: Boolean, default: false },
    ignoreCase: { type: Boolean, default: true },
    matchStart: { type: Boolean, default: false },
    forceSelect: { type: Boolean, default: false },
    forceClear: { type: Boolean, default: false },
    limit: { type: Number, default: 10 },
    asyncSrc: { type: String, default: void 0 },
    asyncKey: { type: String, default: void 0 },
    asyncFunction: { type: Function, default: void 0 },
    debounce: { type: Number, default: 200 },
    openOnFocus: { type: Boolean, default: true },
    openOnEmpty: { type: Boolean, default: false },
    target: { required: true, type: null },
    preselect: { type: Boolean, default: true }
  },
  emits: [
    "update:modelValue",
    "loading",
    "loaded",
    "loaded-error",
    "selected-item-changed"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const slots = useSlots();
    const inputEl = ref(null);
    const items = ref([]);
    const activeIndex = ref(0);
    const elements = ref([]);
    const open = ref(false);
    const dropdown = ref(null);
    let dropdownMenuEl = null;
    let timeoutID = 0;
    const regexOptions = computed(() => {
      let options = "";
      if (props.ignoreCase) {
        options += "i";
      }
      if (!props.matchStart) {
        options += "g";
      }
      return options;
    });
    watch(() => props.target, (el) => {
      removeListeners();
      initInputElByTarget(el);
      initListeners();
    });
    watch(() => props.modelValue, (value) => {
      setInputTextByValue(value);
    });
    watch(() => activeIndex.value, (index) => {
      index >= 0 && emit("selected-item-changed", index);
    });
    onMounted(async () => {
      await nextTick();
      initInputElByTarget(props.target);
      initListeners();
      dropdownMenuEl = dropdown.value.$el.querySelector(".dropdown-menu");
      if (props.modelValue) {
        setInputTextByValue(props.modelValue);
      }
    });
    onBeforeUnmount(() => {
      removeListeners();
    });
    function setInputTextByValue(value) {
      if (isString(value)) {
        inputEl.value.value = value;
      } else if (value) {
        inputEl.value.value = props.itemKey ? value[props.itemKey] : value;
      } else if (value === null) {
        inputEl.value.value = "";
      }
    }
    function hasEmptySlot() {
      return !!slots.empty;
    }
    function initInputElByTarget(target) {
      if (!target) {
        return;
      }
      inputEl.value = getElementBySelectorOrRef(target);
    }
    function initListeners() {
      if (inputEl.value) {
        elements.value = [inputEl.value];
        on(inputEl.value, EVENTS.FOCUS, inputFocused);
        on(inputEl.value, EVENTS.BLUR, inputBlured);
        on(inputEl.value, EVENTS.INPUT, inputChanged);
        on(inputEl.value, EVENTS.KEY_DOWN, inputKeyPressed);
      }
    }
    function removeListeners() {
      elements.value = [];
      if (inputEl.value) {
        off(inputEl.value, EVENTS.FOCUS, inputFocused);
        off(inputEl.value, EVENTS.BLUR, inputBlured);
        off(inputEl.value, EVENTS.INPUT, inputChanged);
        off(inputEl.value, EVENTS.KEY_DOWN, inputKeyPressed);
      }
    }
    function prepareItems(data, disableFilters = false) {
      if (disableFilters) {
        items.value = data.slice(0, props.limit);
        return;
      }
      items.value = [];
      activeIndex.value = props.preselect ? 0 : -1;
      for (let i = 0, l = data.length; i < l; i++) {
        const item = data[i];
        let key = props.itemKey ? item[props.itemKey] : item;
        key = key.toString();
        let index = -1;
        if (props.ignoreCase) {
          index = key.toLowerCase().indexOf(inputEl.value.value.toLowerCase());
        } else {
          index = key.indexOf(inputEl.value.value);
        }
        if (props.matchStart ? index === 0 : index >= 0) {
          items.value.push(item);
        }
        if (items.value.length >= props.limit) {
          break;
        }
      }
    }
    function fetchItems(value, debounce) {
      clearTimeout(timeoutID);
      if (value === "" && !props.openOnEmpty) {
        open.value = false;
      } else if (props.data) {
        prepareItems(props.data);
        open.value = hasEmptySlot() || !!items.value.length;
      } else if (props.asyncSrc) {
        timeoutID = setTimeout(() => {
          emit("loading");
          request(props.asyncSrc + encodeURIComponent(value)).then((data) => {
            if (inputEl.value.matches(":focus")) {
              prepareItems(props.asyncKey ? data[props.asyncKey] : data, true);
              open.value = hasEmptySlot() || !!items.value.length;
            }
            emit("loaded");
          }).catch((err) => {
            console.error(err);
            emit("loaded-error");
          });
        }, debounce);
      } else if (props.asyncFunction) {
        const cb = (data) => {
          if (inputEl.value.matches(":focus")) {
            prepareItems(data, true);
            open.value = hasEmptySlot() || !!items.value.length;
          }
          emit("loaded");
        };
        timeoutID = setTimeout(() => {
          emit("loading");
          props.asyncFunction(value, cb);
        }, debounce);
      }
    }
    function inputChanged() {
      const value = inputEl.value.value;
      fetchItems(value, props.debounce);
      emit("update:modelValue", props.forceSelect ? void 0 : value);
    }
    function inputFocused() {
      if (props.openOnFocus) {
        const value = inputEl.value.value;
        fetchItems(value, 0);
      }
    }
    async function inputBlured() {
      if (!dropdownMenuEl.matches(":hover")) {
        open.value = false;
      }
      if (inputEl.value && props.forceClear) {
        await nextTick();
        if (typeof props.modelValue === "undefined") {
          inputEl.value.value = "";
        }
      }
    }
    function inputKeyPressed(event) {
      event.stopPropagation();
      if (open.value) {
        switch (event.keyCode) {
          case 13:
            if (activeIndex.value >= 0) {
              selectItem(items.value[activeIndex.value]);
            } else {
              open.value = false;
            }
            event.preventDefault();
            break;
          case 27:
            open.value = false;
            break;
          case 38:
            activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : 0;
            break;
          case 40: {
            const maxIndex = items.value.length - 1;
            activeIndex.value = activeIndex.value < maxIndex ? activeIndex.value + 1 : maxIndex;
            break;
          }
        }
      }
    }
    function selectItem(item) {
      emit("update:modelValue", item);
      open.value = false;
    }
    function highlight(item) {
      const value = props.itemKey ? item[props.itemKey] : item;
      const inputValue = inputEl.value.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      return value.replace(new RegExp(`${inputValue}`, regexOptions.value), "<b>$&</b>");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        ref_key: "dropdown",
        ref: dropdown,
        modelValue: open.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => open.value = $event),
        tag: "section",
        "append-to-body": __props.appendToBody,
        "not-close-elements": elements.value,
        "position-element": inputEl.value
      }, {
        dropdown: withCtx(() => [
          renderSlot(_ctx.$slots, "item", {
            items: items.value,
            activeIndex: activeIndex.value,
            select: selectItem,
            highlight
          }, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item, index) => {
              return openBlock(), createElementBlock("li", {
                key: index,
                class: normalizeClass({ active: activeIndex.value === index })
              }, [
                createElementVNode("a", {
                  href: "#",
                  onClick: withModifiers(($event) => selectItem(item), ["prevent"])
                }, [
                  createElementVNode("span", {
                    innerHTML: highlight(item)
                  }, null, 8, _hoisted_2)
                ], 8, _hoisted_1)
              ], 2);
            }), 128))
          ]),
          !items.value || items.value.length === 0 ? renderSlot(_ctx.$slots, "empty", { key: 0 }) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["modelValue", "append-to-body", "not-close-elements", "position-element"]);
    };
  }
};
export { _sfc_main as default };
