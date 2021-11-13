import { h, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, Fragment, renderList, withDirectives, createBlock, withCtx, withModifiers, toDisplayString, vShow, createTextVNode, renderSlot, createCommentVNode } from 'vue';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign(target, varArgs) {
  var arguments$1 = arguments;

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var to = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments$1[index];
    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to
}

function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction(obj) {
  return typeof obj === 'function'
}

function isNumber(obj) {
  return typeof obj === 'number'
}

function isString(obj) {
  return typeof obj === 'string'
}

function isBoolean(obj) {
  return typeof obj === 'boolean'
}

function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
}

var EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress',
  RESIZE: 'resize',
  SCROLL: 'scroll',
  TOUCH_START: 'touchstart',
  TOUCH_END: 'touchend',
};

function on(element, event, handler) {
  /* istanbul ignore next */
  element.addEventListener(event, handler);
}

function off(element, event, handler) {
  /* istanbul ignore next */
  element.removeEventListener(event, handler);
}

function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function setDropdownPosition(dropdown, trigger, options) {
  if ( options === void 0 ) options = {};

  var doc = document.documentElement;
  var containerScrollLeft =
    (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var containerScrollTop =
    (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  var rect = trigger.getBoundingClientRect();
  var dropdownRect = dropdown.getBoundingClientRect();
  dropdown.style.right = 'auto';
  dropdown.style.bottom = 'auto';
  if (options.menuRight) {
    dropdown.style.left =
      containerScrollLeft + rect.left + rect.width - dropdownRect.width + 'px';
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + 'px';
  }
  if (options.dropup) {
    dropdown.style.top =
      containerScrollTop + rect.top - dropdownRect.height - 4 + 'px';
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px';
  }
}

function focus(el) {
  if (!isElement(el)) {
    return
  }
  el.getAttribute('tabindex') ? null : el.setAttribute('tabindex', '-1');
  el.focus();
}

var DEFAULT_TAG = 'div';

var script$1 = {
  props: {
    tag: {
      type: String,
      default: DEFAULT_TAG,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    modelValue: Boolean,
    dropup: {
      type: Boolean,
      default: false,
    },
    menuRight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    notCloseElements: { type: Array, default: function () { return []; } },
    positionElement: { type: null, default: undefined },
  },
  emits: ['update:modelValue'],
  data: function data() {
    return {
      show: false,
      triggerEl: undefined,
    }
  },
  watch: {
    modelValue: function modelValue(v) {
      this.toggle(v);
    },
  },
  mounted: function mounted() {
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
  beforeUnmount: function beforeUnmount() {
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
    getFocusItem: function getFocusItem() {
      var dropdownEl = this.$refs.dropdown;
      return dropdownEl.querySelector('li > a:focus')
    },
    onKeyPress: function onKeyPress(event) {
      if (this.show) {
        var dropdownEl = this.$refs.dropdown;
        var keyCode = event.keyCode;
        if (keyCode === 27) {
          // esc
          this.toggle(false);
          this.triggerEl && this.triggerEl.focus();
        } else if (keyCode === 13) {
          // enter
          var currentFocus = this.getFocusItem();
          currentFocus && currentFocus.click();
        } else if (keyCode === 38 || keyCode === 40) {
          // up || down
          event.preventDefault();
          event.stopPropagation();
          var currentFocus$1 = this.getFocusItem();
          var items = dropdownEl.querySelectorAll('li:not(.disabled) > a');
          if (!currentFocus$1) {
            focus(items[0]);
          } else {
            for (var i = 0; i < items.length; i++) {
              if (currentFocus$1 === items[i]) {
                if (keyCode === 38 && i < items.length > 0) {
                  focus(items[i - 1]);
                } else if (keyCode === 40 && i < items.length - 1) {
                  focus(items[i + 1]);
                }
                break
              }
            }
          }
        }
      }
    },
    initTrigger: function initTrigger() {
      var trigger =
        this.$el.querySelector('[data-role="trigger"]') ||
        this.$el.querySelector('.dropdown-toggle') ||
        this.$el.firstChild;
      this.triggerEl =
        trigger && trigger !== this.$refs.dropdown ? trigger : null;
    },
    toggle: function toggle(show) {
      if (this.disabled) {
        return
      }
      if (isBoolean(show)) {
        this.show = show;
      } else {
        this.show = !this.show;
      }
      if (this.appendToBody) {
        this.show ? this.appendDropdownToBody() : this.removeDropdownFromBody();
      }
      this.$emit('update:modelValue', this.show);
    },
    windowClicked: function windowClicked(event) {
      var target = event.target;
      if (this.show && target) {
        var targetInNotCloseElements = false;
        if (this.notCloseElements) {
          for (var i = 0, l = this.notCloseElements.length; i < l; i++) {
            var isTargetInElement = this.notCloseElements[i].contains(target);
            var shouldBreak = isTargetInElement;
            /* istanbul ignore else */
            if (this.appendToBody) {
              var isTargetInDropdown = this.$refs.dropdown.contains(target);
              var isElInElements =
                this.notCloseElements.indexOf(this.$el) >= 0;
              shouldBreak =
                isTargetInElement || (isTargetInDropdown && isElInElements);
            }
            if (shouldBreak) {
              targetInNotCloseElements = true;
              break
            }
          }
        }
        var targetInDropdownBody = this.$refs.dropdown.contains(target);
        var targetInTrigger =
          this.$el.contains(target) && !targetInDropdownBody;
        // normally, a dropdown select event is handled by @click that trigger after @touchend
        // then @touchend event have to be ignore in this case
        var targetInDropdownAndIsTouchEvent =
          targetInDropdownBody && event.type === 'touchend';
        if (
          !targetInTrigger &&
          !targetInNotCloseElements &&
          !targetInDropdownAndIsTouchEvent
        ) {
          this.toggle(false);
        }
      }
    },
    appendDropdownToBody: function appendDropdownToBody() {
      try {
        var el = this.$refs.dropdown;
        el.style.display = 'block';
        document.body.appendChild(el);
        var positionElement = this.positionElement || this.$el;
        setDropdownPosition(el, positionElement, this);
      } catch (e) {
        // Silent
      }
    },
    removeDropdownFromBody: function removeDropdownFromBody() {
      try {
        var el = this.$refs.dropdown;
        el.removeAttribute('style');
        this.$el.appendChild(el);
      } catch (e) {
        // Silent
      }
    },
  },
  render: function render() {
    return h(
      this.tag,
      {
        class: {
          'btn-group': this.tag === DEFAULT_TAG,
          dropdown: !this.dropup,
          dropup: this.dropup,
          open: this.show,
        },
      },
      [
        this.$slots.default && this.$slots.default(),
        h(
          'ul',
          {
            class: {
              'dropdown-menu': true,
              'dropdown-menu-right': this.menuRight,
            },
            ref: 'dropdown',
          },
          [this.$slots.dropdown && this.$slots.dropdown()]
        ) ]
    )
  },
};

script$1.__file = "src/components/dropdown/Dropdown.vue";

var script = {
  components: { Dropdown: script$1 },
  props: {
    modelValue: {
      type: Number,
      validator: function (v) { return v >= 0; },
      default: undefined,
    },
    transition: {
      type: Number,
      default: 150,
    },
    justified: Boolean,
    pills: Boolean,
    stacked: Boolean,
    customNavClass: { type: null, default: undefined },
    customContentClass: { type: null, default: undefined },
    beforeChange: { type: Function, default: undefined },
  },
  emits: ['update:modelValue', 'change', 'changed'],
  data: function data() {
    return {
      tabs: [],
      activeIndex: 0, // Make v-model not required
    }
  },
  computed: {
    navClasses: function navClasses() {
      var obj;

      var tabClasses = {
        nav: true,
        'nav-justified': this.justified,
        'nav-tabs': !this.pills,
        'nav-pills': this.pills,
        'nav-stacked': this.stacked && this.pills,
      };
      var customNavClass = this.customNavClass;
      if (isExist(customNavClass)) {
        if (isString(customNavClass)) {
          return assign({}, tabClasses, ( obj = {}, obj[customNavClass] = true, obj ))
        } else {
          return assign({}, tabClasses, customNavClass)
        }
      } else {
        return tabClasses
      }
    },
    contentClasses: function contentClasses() {
      var obj;

      var contentClasses = {
        'tab-content': true,
      };
      var customContentClass = this.customContentClass;
      if (isExist(customContentClass)) {
        if (isString(customContentClass)) {
          return assign({}, contentClasses, ( obj = {}, obj[customContentClass] = true, obj ))
        } else {
          return assign({}, contentClasses, customContentClass)
        }
      } else {
        return contentClasses
      }
    },
    groupedTabs: function groupedTabs() {
      var tabs = [];
      var hash = {};
      this.tabs.forEach(function (tab) {
        if (tab.group) {
          if (hasOwnProperty(hash, tab.group)) {
            tabs[hash[tab.group]].tabs.push(tab);
          } else {
            tabs.push({
              tabs: [tab],
              group: tab.group,
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
      tabs = tabs.map(function (tab) {
        if (Array.isArray(tab.tabs)) {
          tab.hidden =
            tab.tabs.filter(function (v) { return v.hidden; }).length === tab.tabs.length;
        }
        return tab
      });
      return tabs
    },
  },
  watch: {
    modelValue: function modelValue(value) {
      if (isNumber(value)) {
        this.activeIndex = value;
        this.selectCurrent();
      }
    },
    tabs: function tabs(tabs$1) {
      var this$1$1 = this;

      tabs$1.forEach(function (tab, index) {
        tab.transition = this$1$1.transition;
        if (index === this$1$1.activeIndex) {
          tab.show();
        }
      });
      this.selectCurrent();
    },
  },
  mounted: function mounted() {
    this.selectCurrent();
  },
  methods: {
    getTabClasses: function getTabClasses(tab, isSubTab) {
      if ( isSubTab === void 0 ) isSubTab = false;

      var defaultClasses = {
        active: tab.active,
        disabled: tab.disabled,
        'pull-right': tab.pullRight && !isSubTab,
      };

      // return with new classes added to tab
      return assign(defaultClasses, tab.tabClasses)
    },
    selectCurrent: function selectCurrent() {
      var this$1$1 = this;

      var found = false;
      this.tabs.forEach(function (tab, index) {
        if (index === this$1$1.activeIndex) {
          found = !tab.active;
          tab.active = true;
        } else {
          tab.active = false;
        }
      });
      if (found) {
        this.$emit('change', this.activeIndex);
      }
    },
    selectValidate: function selectValidate(index) {
      var this$1$1 = this;

      if (isFunction(this.beforeChange)) {
        this.beforeChange(this.activeIndex, index, function (result) {
          if (!isExist(result)) {
            this$1$1.$select(index);
          }
        });
      } else {
        this.$select(index);
      }
    },
    select: function select(index) {
      if (!this.tabs[index].disabled && index !== this.activeIndex) {
        this.selectValidate(index);
      }
    },
    $select: function $select(index) {
      if (isNumber(this.modelValue)) {
        this.$emit('update:modelValue', index);
      } else {
        this.activeIndex = index;
        this.selectCurrent();
      }
    },
  },
};

var _hoisted_1 = /*#__PURE__*/createElementVNode("span", { class: "caret" }, null, -1 /* HOISTED */);
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["id", "onClick"];
var _hoisted_4 = ["onClick", "textContent"];
var _hoisted_5 = {
  key: 0,
  class: "pull-right"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dropdown = resolveComponent("dropdown");

  return (openBlock(), createElementBlock("section", null, [
    createElementVNode("ul", {
      class: normalizeClass($options.navClasses),
      role: "tablist"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.groupedTabs, function (tab, i) {
        return (openBlock(), createElementBlock(Fragment, { key: i }, [
          (tab.tabs)
            ? withDirectives((openBlock(), createBlock(_component_dropdown, {
                key: 0,
                role: "presentation",
                tag: "li",
                class: normalizeClass($options.getTabClasses(tab))
              }, {
                dropdown: withCtx(function () { return [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(tab.tabs, function (subTab, j) {
                    return withDirectives((openBlock(), createElementBlock("li", {
                      key: (i + "_" + j),
                      class: normalizeClass($options.getTabClasses(subTab, true))
                    }, [
                      createElementVNode("a", {
                        href: "#",
                        onClick: withModifiers(function ($event) { return ($options.select($data.tabs.indexOf(subTab))); }, ["prevent"])
                      }, toDisplayString(subTab.title), 9 /* TEXT, PROPS */, _hoisted_2)
                    ], 2 /* CLASS */)), [
                      [vShow, !subTab.hidden]
                    ])
                  }), 128 /* KEYED_FRAGMENT */))
                ]; }),
                default: withCtx(function () { return [
                  createElementVNode("a", {
                    class: "dropdown-toggle",
                    role: "tab",
                    href: "#",
                    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["prevent"]))
                  }, [
                    createTextVNode(toDisplayString(tab.group) + " ", 1 /* TEXT */),
                    _hoisted_1
                  ])
                ]; }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"])), [
                [vShow, !tab.hidden]
              ])
            : withDirectives((openBlock(), createElementBlock("li", {
                key: 1,
                role: "presentation",
                class: normalizeClass($options.getTabClasses(tab))
              }, [
                (tab.$slots.title)
                  ? (openBlock(), createElementBlock("a", {
                      key: 0,
                      id: tab.uid,
                      role: "tab",
                      href: "#",
                      onClick: withModifiers(function ($event) { return ($options.select($data.tabs.indexOf(tab))); }, ["prevent"])
                    }, null, 8 /* PROPS */, _hoisted_3))
                  : (openBlock(), createElementBlock("a", {
                      key: 1,
                      role: "tab",
                      href: "#",
                      onClick: withModifiers(function ($event) { return ($options.select($data.tabs.indexOf(tab))); }, ["prevent"]),
                      textContent: toDisplayString(tab.title)
                    }, null, 8 /* PROPS */, _hoisted_4))
              ], 2 /* CLASS */)), [
                [vShow, !tab.hidden]
              ])
        ], 64 /* STABLE_FRAGMENT */))
      }), 128 /* KEYED_FRAGMENT */)),
      (!$props.justified && _ctx.$slots['nav-right'])
        ? (openBlock(), createElementBlock("li", _hoisted_5, [
            renderSlot(_ctx.$slots, "nav-right")
          ]))
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    createElementVNode("div", {
      class: normalizeClass($options.contentClasses)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */)
  ]))
}

script.render = render;
script.__file = "src/components/tabs/Tabs.vue";

export { script as default };
//# sourceMappingURL=Tabs.js.map
