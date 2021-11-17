import { createVNode } from "vue";
function isBoolean(obj) {
  return typeof obj === "boolean";
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
var _sfc_main = {
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
export { _sfc_main as default };
