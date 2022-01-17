import { defineComponent, ref, onMounted, onBeforeUnmount, watch, createVNode, Teleport } from "vue";
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
var _sfc_main = defineComponent({
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
export { _sfc_main as default };
