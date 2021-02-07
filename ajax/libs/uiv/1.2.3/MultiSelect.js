// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign (target, varArgs) {
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

function isExist (obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction (obj) {
  return typeof obj === 'function'
}

function isBoolean (obj) {
  return typeof obj === 'boolean'
}

var defaultLang = {
  uiv: {
    datePicker: {
      clear: 'Clear',
      today: 'Today',
      month: 'Month',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      year: 'Year',
      week1: 'Mon',
      week2: 'Tue',
      week3: 'Wed',
      week4: 'Thu',
      week5: 'Fri',
      week6: 'Sat',
      week7: 'Sun'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK'
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...'
    }
  }
};

// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js

var lang = defaultLang;

var i18nHandler = function () {
  var vuei18n = Object.getPrototypeOf(this).$t;
  /* istanbul ignore else */
  /* istanbul ignore next */
  if (isFunction(vuei18n)) {
    /* istanbul ignore next */
    try {
      return vuei18n.apply(this, arguments)
    } catch (err) {
      return this.$t.apply(this, arguments)
    }
  }
};

var t = function (path, options) {
  options = options || {};
  var value;
  try {
    value = i18nHandler.apply(this, arguments);
    /* istanbul ignore next */
    if (isExist(value) && !options.$$locale) {
      return value
    }
  } catch (e) {
    // ignore
  }
  var array = path.split('.');
  var current = options.$$locale || lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) { return value }
    if (!value) { return '' }
    current = value;
  }
  /* istanbul ignore next */
  return ''
};

var Local = {
  methods: {
    t: function t$1 () {
      var arguments$1 = arguments;

      var args = [];
      for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments$1[i]);
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1]);
      return t.apply(this, args)
    }
  },
  props: {
    locale: Object
  }
};

function onlyUnique (value, index, self) {
  return self.indexOf(value) === index
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
  TOUCH_END: 'touchend'
};

function on (element, event, handler) {
  /* istanbul ignore next */
  element.addEventListener(event, handler);
}

function off (element, event, handler) {
  /* istanbul ignore next */
  element.removeEventListener(event, handler);
}

function isElement (el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function setDropdownPosition (dropdown, trigger, options) {
  if ( options === void 0 ) options = {};

  var doc = document.documentElement;
  var containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  var rect = trigger.getBoundingClientRect();
  var dropdownRect = dropdown.getBoundingClientRect();
  dropdown.style.right = 'auto';
  dropdown.style.bottom = 'auto';
  if (options.menuRight) {
    dropdown.style.left = containerScrollLeft + rect.left + rect.width - dropdownRect.width + 'px';
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + 'px';
  }
  if (options.dropup) {
    dropdown.style.top = containerScrollTop + rect.top - dropdownRect.height - 4 + 'px';
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px';
  }
}

function focus (el) {
  if (!isElement(el)) {
    return
  }
  el.getAttribute('tabindex') ? null : el.setAttribute('tabindex', '-1');
  el.focus();
}

var DEFAULT_TAG = 'div';

var Dropdown = {
  render: function render (h) {
    return h(
      this.tag,
      {
        class: {
          'btn-group': this.tag === DEFAULT_TAG,
          dropdown: !this.dropup,
          dropup: this.dropup,
          open: this.show
        }
      },
      [
        this.$slots.default,
        h(
          'ul',
          {
            class: {
              'dropdown-menu': true,
              'dropdown-menu-right': this.menuRight
            },
            ref: 'dropdown'
          },
          [this.$slots.dropdown]
        )
      ]
    )
  },
  props: {
    tag: {
      type: String,
      default: DEFAULT_TAG
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    value: Boolean,
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
    notCloseElements: Array,
    positionElement: null
  },
  data: function data () {
    return {
      show: false,
      triggerEl: undefined
    }
  },
  watch: {
    value: function value (v) {
      this.toggle(v);
    }
  },
  mounted: function mounted () {
    this.initTrigger();
    if (this.triggerEl) {
      on(this.triggerEl, EVENTS.CLICK, this.toggle);
      on(this.triggerEl, EVENTS.KEY_DOWN, this.onKeyPress);
    }
    on(this.$refs.dropdown, EVENTS.KEY_DOWN, this.onKeyPress);
    on(window, EVENTS.CLICK, this.windowClicked);
    on(window, EVENTS.TOUCH_END, this.windowClicked);
    if (this.value) {
      this.toggle(true);
    }
  },
  beforeDestroy: function beforeDestroy () {
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
    getFocusItem: function getFocusItem () {
      var dropdownEl = this.$refs.dropdown;
      /* istanbul ignore next */
      return dropdownEl.querySelector('li > a:focus')
    },
    onKeyPress: function onKeyPress (event) {
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
    initTrigger: function initTrigger () {
      var trigger = this.$el.querySelector('[data-role="trigger"]') || this.$el.querySelector('.dropdown-toggle') || this.$el.firstChild;
      this.triggerEl = trigger && trigger !== this.$refs.dropdown ? trigger : null;
    },
    toggle: function toggle (show) {
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
      this.$emit('input', this.show);
    },
    windowClicked: function windowClicked (event) {
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
              var isElInElements = this.notCloseElements.indexOf(this.$el) >= 0;
              shouldBreak = isTargetInElement || (isTargetInDropdown && isElInElements);
            }
            if (shouldBreak) {
              targetInNotCloseElements = true;
              break
            }
          }
        }
        var targetInDropdownBody = this.$refs.dropdown.contains(target);
        var targetInTrigger = this.$el.contains(target) && !targetInDropdownBody;
        // normally, a dropdown select event is handled by @click that trigger after @touchend
        // then @touchend event have to be ignore in this case
        var targetInDropdownAndIsTouchEvent = targetInDropdownBody && event.type === 'touchend';
        if (!targetInTrigger && !targetInNotCloseElements && !targetInDropdownAndIsTouchEvent) {
          this.toggle(false);
        }
      }
    },
    appendDropdownToBody: function appendDropdownToBody () {
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
    removeDropdownFromBody: function removeDropdownFromBody () {
      try {
        var el = this.$refs.dropdown;
        el.removeAttribute('style');
        this.$el.appendChild(el);
      } catch (e) {
        // Silent
      }
    }
  }
};

var script = {
  mixins: [Local],
  components: { Dropdown: Dropdown },
  props: {
    value: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    limit: {
      type: Number,
      default: 0
    },
    size: String,
    placeholder: String,
    split: {
      type: String,
      default: ', '
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
    filterFunction: Function,
    filterPlaceholder: String,
    selectedIcon: {
      type: String,
      default: 'glyphicon glyphicon-ok'
    },
    itemSelectedClass: String
  },
  data: function data () {
    return {
      showDropdown: false,
      els: [],
      filterInput: '',
      currentActive: -1
    }
  },
  computed: {
    containerStyles: function containerStyles () {
      return {
        width: this.block ? '100%' : ''
      }
    },
    filteredOptions: function filteredOptions () {
      var this$1 = this;

      if (this.filterable && this.filterInput) {
        if (this.filterFunction) {
          return this.filterFunction(this.filterInput)
        } else {
          var filterInput = this.filterInput.toLowerCase();
          return this.options.filter(function (v) { return (
            v[this$1.valueKey].toString().toLowerCase().indexOf(filterInput) >= 0 ||
            v[this$1.labelKey].toString().toLowerCase().indexOf(filterInput) >= 0
          ); })
        }
      } else {
        return this.options
      }
    },
    groupedOptions: function groupedOptions () {
      var this$1 = this;

      return this.filteredOptions
        .map(function (v) { return v.group; })
        .filter(onlyUnique)
        .map(function (v) { return ({
          options: this$1.filteredOptions.filter(function (option) { return option.group === v; }),
          $group: v
        }); })
    },
    flattenGroupedOptions: function flattenGroupedOptions () {
      var ref;

      return (ref = []).concat.apply(ref, this.groupedOptions.map(function (v) { return v.options; }))
    },
    selectClasses: function selectClasses () {
      var obj;

      return ( obj = {}, obj[("input-" + (this.size))] = this.size, obj )
    },
    selectedIconClasses: function selectedIconClasses () {
      var obj;

      return ( obj = {}, obj[this.selectedIcon] = true, obj['pull-right'] = true, obj )
    },
    selectTextClasses: function selectTextClasses () {
      return {
        'text-muted': this.value.length === 0
      }
    },
    labelValue: function labelValue () {
      var this$1 = this;

      var optionsByValue = this.options.map(function (v) { return v[this$1.valueKey]; });
      return this.value.map(function (v) {
        var index = optionsByValue.indexOf(v);
        return index >= 0 ? this$1.options[index][this$1.labelKey] : v
      })
    },
    selectedText: function selectedText () {
      if (this.value.length) {
        var labelValue = this.labelValue;
        if (this.collapseSelected) {
          var str = labelValue[0];
          str += labelValue.length > 1 ? ((this.split) + "+" + (labelValue.length - 1)) : '';
          return str
        } else {
          return labelValue.join(this.split)
        }
      } else {
        return this.placeholder || this.t('uiv.multiSelect.placeholder')
      }
    },
    customOptionsVisible: function customOptionsVisible () {
      return !!this.$slots.option || !!this.$scopedSlots.option
    }
  },
  watch: {
    showDropdown: function showDropdown (v) {
      var this$1 = this;

      // clear filter input when dropdown toggles
      this.filterInput = '';
      this.currentActive = -1;
      this.$emit('visible-change', v);
      if (v && this.filterable && this.filterAutoFocus) {
        this.$nextTick(function () {
          this$1.$refs.filterInput.focus();
        });
      }
    }
  },
  mounted: function mounted () {
    this.els = [this.$el];
  },
  methods: {
    goPrevOption: function goPrevOption () {
      if (!this.showDropdown) {
        return
      }
      this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.flattenGroupedOptions.length - 1;
    },
    goNextOption: function goNextOption () {
      if (!this.showDropdown) {
        return
      }
      this.currentActive < this.flattenGroupedOptions.length - 1 ? this.currentActive++ : this.currentActive = 0;
    },
    selectOption: function selectOption () {
      var index = this.currentActive;
      var options = this.flattenGroupedOptions;
      if (!this.showDropdown) {
        this.showDropdown = true;
      } else if (index >= 0 && index < options.length) {
        this.toggle(options[index]);
      }
    },
    itemClasses: function itemClasses (item) {
      var result = {
        disabled: item.disabled,
        active: this.currentActive === this.flattenGroupedOptions.indexOf(item)
      };
      if (this.itemSelectedClass) {
        result[this.itemSelectedClass] = this.isItemSelected(item);
      }
      return result
    },
    isItemSelected: function isItemSelected (item) {
      return this.value.indexOf(item[this.valueKey]) >= 0
    },
    toggle: function toggle (item) {
      if (item.disabled) {
        return
      }
      var value = item[this.valueKey];
      var index = this.value.indexOf(value);
      if (this.limit === 1) {
        var newValue = index >= 0 ? [] : [value];
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      } else {
        if (index >= 0) {
          var newVal = this.value.slice();
          newVal.splice(index, 1);
          this.$emit('input', newVal);
          this.$emit('change', newVal);
        } else if (this.limit === 0 || this.value.length < this.limit) {
          var newVal$1 = this.value.slice();
          newVal$1.push(value);
          this.$emit('input', newVal$1);
          this.$emit('change', newVal$1);
        } else {
          this.$emit('limit-exceed');
        }
      }
    },
    searchClicked: function searchClicked () {
      this.$emit('search', this.filterInput);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "dropdown",
    {
      ref: "dropdown",
      style: _vm.containerStyles,
      attrs: {
        "not-close-elements": _vm.els,
        "append-to-body": _vm.appendToBody,
        disabled: _vm.disabled
      },
      nativeOn: {
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          ) {
            return null
          }
          _vm.showDropdown = false;
        }
      },
      model: {
        value: _vm.showDropdown,
        callback: function($$v) {
          _vm.showDropdown = $$v;
        },
        expression: "showDropdown"
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "form-control dropdown-toggle clearfix",
          class: _vm.selectClasses,
          attrs: {
            disabled: _vm.disabled,
            tabindex: "0",
            "data-role": "trigger"
          },
          on: {
            focus: function($event) {
              return _vm.$emit("focus", $event)
            },
            blur: function($event) {
              return _vm.$emit("blur", $event)
            },
            keydown: [
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown"
                  ])
                ) {
                  return null
                }
                $event.preventDefault();
                $event.stopPropagation();
                return _vm.goNextOption($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp"
                  ])
                ) {
                  return null
                }
                $event.preventDefault();
                $event.stopPropagation();
                return _vm.goPrevOption($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                $event.preventDefault();
                $event.stopPropagation();
                return _vm.selectOption($event)
              }
            ]
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "pull-right",
              staticStyle: {
                display: "inline-block",
                "vertical-align": "middle"
              }
            },
            [
              _c("span", [_vm._v(" ")]),
              _vm._v(" "),
              _c("span", { staticClass: "caret" })
            ]
          ),
          _vm._v(" "),
          _c("div", {
            class: _vm.selectTextClasses,
            staticStyle: {
              "overflow-x": "hidden",
              "text-overflow": "ellipsis",
              "white-space": "nowrap"
            },
            domProps: { textContent: _vm._s(_vm.selectedText) }
          })
        ]
      ),
      _vm._v(" "),
      _c(
        "template",
        { slot: "dropdown" },
        [
          _vm.filterable
            ? _c("li", { staticStyle: { padding: "4px 8px" } }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.filterInput,
                      expression: "filterInput"
                    }
                  ],
                  ref: "filterInput",
                  staticClass: "form-control input-sm",
                  attrs: {
                    "aria-label": "Filter...",
                    type: "text",
                    placeholder:
                      _vm.filterPlaceholder ||
                      _vm.t("uiv.multiSelect.filterPlaceholder")
                  },
                  domProps: { value: _vm.filterInput },
                  on: {
                    keyup: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.searchClicked($event)
                    },
                    keydown: [
                      function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k($event.keyCode, "down", 40, $event.key, [
                            "Down",
                            "ArrowDown"
                          ])
                        ) {
                          return null
                        }
                        $event.preventDefault();
                        $event.stopPropagation();
                        return _vm.goNextOption($event)
                      },
                      function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k($event.keyCode, "up", 38, $event.key, [
                            "Up",
                            "ArrowUp"
                          ])
                        ) {
                          return null
                        }
                        $event.preventDefault();
                        $event.stopPropagation();
                        return _vm.goPrevOption($event)
                      },
                      function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        $event.preventDefault();
                        $event.stopPropagation();
                        return _vm.selectOption($event)
                      }
                    ],
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.filterInput = $event.target.value;
                    }
                  }
                })
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.groupedOptions, function(item) {
            return [
              item.$group
                ? _c("li", {
                    staticClass: "dropdown-header",
                    domProps: { textContent: _vm._s(item.$group) }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(item.options, function(_item) {
                return [
                  _c(
                    "li",
                    {
                      class: _vm.itemClasses(_item),
                      staticStyle: { outline: "0" },
                      on: {
                        keydown: [
                          function($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k($event.keyCode, "down", 40, $event.key, [
                                "Down",
                                "ArrowDown"
                              ])
                            ) {
                              return null
                            }
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.goNextOption($event)
                          },
                          function($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k($event.keyCode, "up", 38, $event.key, [
                                "Up",
                                "ArrowUp"
                              ])
                            ) {
                              return null
                            }
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.goPrevOption($event)
                          },
                          function($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.selectOption($event)
                          }
                        ],
                        click: function($event) {
                          $event.stopPropagation();
                          return _vm.toggle(_item)
                        },
                        mouseenter: function($event) {
                          _vm.currentActive = -1;
                        }
                      }
                    },
                    [
                      _vm.customOptionsVisible
                        ? _c(
                            "a",
                            {
                              staticStyle: { outline: "0" },
                              attrs: { role: "button" }
                            },
                            [
                              _vm._t("option", null, { item: _item }),
                              _vm._v(" "),
                              _vm.selectedIcon && _vm.isItemSelected(_item)
                                ? _c("span", { class: _vm.selectedIconClasses })
                                : _vm._e()
                            ],
                            2
                          )
                        : _vm.isItemSelected(_item)
                        ? _c(
                            "a",
                            {
                              staticStyle: { outline: "0" },
                              attrs: { role: "button" }
                            },
                            [
                              _c("b", [_vm._v(_vm._s(_item[_vm.labelKey]))]),
                              _vm._v(" "),
                              _vm.selectedIcon
                                ? _c("span", { class: _vm.selectedIconClasses })
                                : _vm._e()
                            ]
                          )
                        : _c(
                            "a",
                            {
                              staticStyle: { outline: "0" },
                              attrs: { role: "button" }
                            },
                            [_c("span", [_vm._v(_vm._s(_item[_vm.labelKey]))])]
                          )
                    ]
                  )
                ]
              })
            ]
          })
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
//# sourceMappingURL=MultiSelect.js.map
