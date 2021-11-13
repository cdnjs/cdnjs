import { h, resolveComponent, openBlock, createBlock, normalizeStyle, withKeys, withCtx, createElementBlock, withDirectives, createElementVNode, withModifiers, vModelText, createCommentVNode, Fragment, renderList, toDisplayString, normalizeClass, renderSlot } from 'vue';

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

function isBoolean(obj) {
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
      week7: 'Sun',
    },
    timePicker: {
      am: 'AM',
      pm: 'PM',
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK',
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...',
    },
  },
};

var lang = defaultLang;

var i18nHandler = function () {
  if ('$t' in this) {
    return this.$t.apply(this, arguments)
  }
  return null
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
    t: function t$1() {
      var arguments$1 = arguments;

      var args = [];
      for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments$1[i]);
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1]);
      return t.apply(this, args)
    },
  },
  props: {
    locale: Object,
  },
};

function onlyUnique(value, index, self) {
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
  mixins: [Local],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    limit: {
      type: Number,
      default: 0,
    },
    size: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    split: {
      type: String,
      default: ', ',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    collapseSelected: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    filterAutoFocus: {
      type: Boolean,
      default: true,
    },
    filterFunction: { type: Function, default: undefined },
    filterPlaceholder: { type: String, default: undefined },
    selectedIcon: {
      type: String,
      default: 'glyphicon glyphicon-ok',
    },
    itemSelectedClass: { type: String, default: undefined },
  },
  emits: [
    'focus',
    'blur',
    'visible-change',
    'update:modelValue',
    'change',
    'limit-exceed',
    'search' ],
  data: function data() {
    return {
      showDropdown: false,
      els: [],
      filterInput: '',
      currentActive: -1,
    }
  },
  computed: {
    containerStyles: function containerStyles() {
      return {
        width: this.block ? '100%' : '',
      }
    },
    filteredOptions: function filteredOptions() {
      var this$1$1 = this;

      if (this.filterable && this.filterInput) {
        if (this.filterFunction) {
          return this.filterFunction(this.filterInput)
        } else {
          var filterInput = this.filterInput.toLowerCase();
          return this.options.filter(
            function (v) { return v[this$1$1.valueKey].toString().toLowerCase().indexOf(filterInput) >=
                0 ||
              v[this$1$1.labelKey].toString().toLowerCase().indexOf(filterInput) >=
                0; }
          )
        }
      } else {
        return this.options
      }
    },
    groupedOptions: function groupedOptions() {
      var this$1$1 = this;

      return this.filteredOptions
        .map(function (v) { return v.group; })
        .filter(onlyUnique)
        .map(function (v) { return ({
          options: this$1$1.filteredOptions.filter(function (option) { return option.group === v; }),
          $group: v,
        }); })
    },
    flattenGroupedOptions: function flattenGroupedOptions() {
      var ref;

      return (ref = []).concat.apply(ref, this.groupedOptions.map(function (v) { return v.options; }))
    },
    selectClasses: function selectClasses() {
      var obj;

      return ( obj = {}, obj[("input-" + (this.size))] = this.size, obj )
    },
    selectedIconClasses: function selectedIconClasses() {
      var obj;

      return ( obj = {}, obj[this.selectedIcon] = true, obj['pull-right'] = true, obj )
    },
    selectTextClasses: function selectTextClasses() {
      return {
        'text-muted': this.modelValue.length === 0,
      }
    },
    labelValue: function labelValue() {
      var this$1$1 = this;

      var optionsByValue = this.options.map(function (v) { return v[this$1$1.valueKey]; });
      return this.modelValue.map(function (v) {
        var index = optionsByValue.indexOf(v);
        return index >= 0 ? this$1$1.options[index][this$1$1.labelKey] : v
      })
    },
    selectedText: function selectedText() {
      if (this.modelValue.length) {
        var labelValue = this.labelValue;
        if (this.collapseSelected) {
          var str = labelValue[0];
          str +=
            labelValue.length > 1
              ? ((this.split) + "+" + (labelValue.length - 1))
              : '';
          return str
        } else {
          return labelValue.join(this.split)
        }
      } else {
        return this.placeholder || this.t('uiv.multiSelect.placeholder')
      }
    },
    customOptionsVisible: function customOptionsVisible() {
      return !!this.$slots.option || !!this.$slots.option
    },
  },
  watch: {
    showDropdown: function showDropdown(v) {
      var this$1$1 = this;

      // clear filter input when dropdown toggles
      this.filterInput = '';
      this.currentActive = -1;
      this.$emit('visible-change', v);
      if (v && this.filterable && this.filterAutoFocus) {
        this.$nextTick(function () {
          this$1$1.$refs.filterInput.focus();
        });
      }
    },
  },
  mounted: function mounted() {
    this.els = [this.$el];
  },
  methods: {
    goPrevOption: function goPrevOption() {
      if (!this.showDropdown) {
        return
      }
      this.currentActive > 0
        ? this.currentActive--
        : (this.currentActive = this.flattenGroupedOptions.length - 1);
    },
    goNextOption: function goNextOption() {
      if (!this.showDropdown) {
        return
      }
      this.currentActive < this.flattenGroupedOptions.length - 1
        ? this.currentActive++
        : (this.currentActive = 0);
    },
    selectOption: function selectOption() {
      var index = this.currentActive;
      var options = this.flattenGroupedOptions;
      if (!this.showDropdown) {
        this.showDropdown = true;
      } else if (index >= 0 && index < options.length) {
        this.toggle(options[index]);
      }
    },
    itemClasses: function itemClasses(item) {
      var result = {
        disabled: item.disabled,
        active: this.currentActive === this.flattenGroupedOptions.indexOf(item),
      };
      if (this.itemSelectedClass) {
        result[this.itemSelectedClass] = this.isItemSelected(item);
      }
      return result
    },
    isItemSelected: function isItemSelected(item) {
      return this.modelValue.indexOf(item[this.valueKey]) >= 0
    },
    toggle: function toggle(item) {
      if (item.disabled) {
        return
      }
      var value = item[this.valueKey];
      var index = this.modelValue.indexOf(value);
      if (this.limit === 1) {
        var newValue = index >= 0 ? [] : [value];
        this.$emit('update:modelValue', newValue);
        this.$emit('change', newValue);
      } else {
        if (index >= 0) {
          var newVal = this.modelValue.slice();
          newVal.splice(index, 1);
          this.$emit('update:modelValue', newVal);
          this.$emit('change', newVal);
        } else if (this.limit === 0 || this.modelValue.length < this.limit) {
          var newVal$1 = this.modelValue.slice();
          newVal$1.push(value);
          this.$emit('update:modelValue', newVal$1);
          this.$emit('change', newVal$1);
        } else {
          this.$emit('limit-exceed');
        }
      }
    },
    searchClicked: function searchClicked() {
      this.$emit('search', this.filterInput);
    },
  },
};

var _hoisted_1 = ["disabled"];
var _hoisted_2 = /*#__PURE__*/createElementVNode("div", {
  class: "pull-right",
  style: {"display":"inline-block","vertical-align":"middle"}
}, [
  /*#__PURE__*/createElementVNode("span", null, " "),
  /*#__PURE__*/createElementVNode("span", { class: "caret" })
], -1 /* HOISTED */);
var _hoisted_3 = ["textContent"];
var _hoisted_4 = {
  key: 0,
  style: {"padding":"4px 8px"}
};
var _hoisted_5 = ["placeholder"];
var _hoisted_6 = ["textContent"];
var _hoisted_7 = ["onClick"];
var _hoisted_8 = {
  key: 0,
  role: "button",
  style: {"outline":"0"}
};
var _hoisted_9 = {
  key: 1,
  role: "button",
  style: {"outline":"0"}
};
var _hoisted_10 = {
  key: 2,
  role: "button",
  style: {"outline":"0"}
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dropdown = resolveComponent("dropdown");

  return (openBlock(), createBlock(_component_dropdown, {
    ref: "dropdown",
    modelValue: $data.showDropdown,
    "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) { return (($data.showDropdown) = $event); }),
    "not-close-elements": $data.els,
    "append-to-body": $props.appendToBody,
    disabled: $props.disabled,
    style: normalizeStyle($options.containerStyles),
    onKeydown: _cache[15] || (_cache[15] = withKeys(function ($event) { return ($data.showDropdown = false); }, ["esc"]))
  }, {
    dropdown: withCtx(function () { return [
      ($props.filterable)
        ? (openBlock(), createElementBlock("li", _hoisted_4, [
            withDirectives(createElementVNode("input", {
              ref: "filterInput",
              "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return (($data.filterInput) = $event); }),
              "aria-label": "Filter...",
              class: "form-control input-sm",
              type: "text",
              placeholder: 
            $props.filterPlaceholder || _ctx.t('uiv.multiSelect.filterPlaceholder')
          ,
              onKeyup: _cache[6] || (_cache[6] = withKeys(function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.searchClicked && $options.searchClicked.apply($options, args));
      }, ["enter"])),
              onKeydown: [
                _cache[7] || (_cache[7] = withKeys(withModifiers(function () {
                  var args = [], len = arguments.length;
                  while ( len-- ) args[ len ] = arguments[ len ];

                  return ($options.goNextOption && $options.goNextOption.apply($options, args));
      }, ["prevent","stop"]), ["down"])),
                _cache[8] || (_cache[8] = withKeys(withModifiers(function () {
                  var args = [], len = arguments.length;
                  while ( len-- ) args[ len ] = arguments[ len ];

                  return ($options.goPrevOption && $options.goPrevOption.apply($options, args));
      }, ["prevent","stop"]), ["up"])),
                _cache[9] || (_cache[9] = withKeys(withModifiers(function () {
                  var args = [], len = arguments.length;
                  while ( len-- ) args[ len ] = arguments[ len ];

                  return ($options.selectOption && $options.selectOption.apply($options, args));
      }, ["prevent","stop"]), ["enter"]))
              ]
            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_5), [
              [vModelText, $data.filterInput]
            ])
          ]))
        : createCommentVNode("v-if", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.groupedOptions, function (item, i) {
        return (openBlock(), createElementBlock(Fragment, null, [
          (item.$group)
            ? (openBlock(), createElementBlock("li", {
                key: i,
                class: "dropdown-header",
                textContent: toDisplayString(item.$group)
              }, null, 8 /* PROPS */, _hoisted_6))
            : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(item.options, function (_item, j) {
            return (openBlock(), createElementBlock("li", {
              key: (i + "_" + j),
              class: normalizeClass($options.itemClasses(_item)),
              style: {"outline":"0"},
              onKeydown: [
                _cache[10] || (_cache[10] = withKeys(withModifiers(function () {
                  var args = [], len = arguments.length;
                  while ( len-- ) args[ len ] = arguments[ len ];

                  return ($options.goNextOption && $options.goNextOption.apply($options, args));
            }, ["prevent","stop"]), ["down"])),
                _cache[11] || (_cache[11] = withKeys(withModifiers(function () {
                  var args = [], len = arguments.length;
                  while ( len-- ) args[ len ] = arguments[ len ];

                  return ($options.goPrevOption && $options.goPrevOption.apply($options, args));
            }, ["prevent","stop"]), ["up"])),
                _cache[12] || (_cache[12] = withKeys(withModifiers(function () {
                  var args = [], len = arguments.length;
                  while ( len-- ) args[ len ] = arguments[ len ];

                  return ($options.selectOption && $options.selectOption.apply($options, args));
            }, ["prevent","stop"]), ["enter"]))
              ],
              onClick: withModifiers(function ($event) { return ($options.toggle(_item, $event)); }, ["stop"]),
              onMouseenter: _cache[13] || (_cache[13] = function ($event) { return ($data.currentActive = -1); })
            }, [
              ($options.customOptionsVisible)
                ? (openBlock(), createElementBlock("a", _hoisted_8, [
                    renderSlot(_ctx.$slots, "option", { item: _item }),
                    ($props.selectedIcon && $options.isItemSelected(_item))
                      ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass($options.selectedIconClasses)
                        }, null, 2 /* CLASS */))
                      : createCommentVNode("v-if", true)
                  ]))
                : ($options.isItemSelected(_item))
                  ? (openBlock(), createElementBlock("a", _hoisted_9, [
                      createElementVNode("b", null, toDisplayString(_item[$props.labelKey]), 1 /* TEXT */),
                      ($props.selectedIcon)
                        ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: normalizeClass($options.selectedIconClasses)
                          }, null, 2 /* CLASS */))
                        : createCommentVNode("v-if", true)
                    ]))
                  : (openBlock(), createElementBlock("a", _hoisted_10, [
                      createElementVNode("span", null, toDisplayString(_item[$props.labelKey]), 1 /* TEXT */)
                    ]))
            ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_7))
          }), 128 /* KEYED_FRAGMENT */))
        ], 64 /* STABLE_FRAGMENT */))
      }), 256 /* UNKEYED_FRAGMENT */))
    ]; }),
    default: withCtx(function () { return [
      createElementVNode("div", {
        class: normalizeClass(["form-control dropdown-toggle clearfix", $options.selectClasses]),
        disabled: $props.disabled ? true : undefined,
        tabindex: "0",
        "data-role": "trigger",
        onFocus: _cache[0] || (_cache[0] = function ($event) { return (_ctx.$emit('focus', $event)); }),
        onBlur: _cache[1] || (_cache[1] = function ($event) { return (_ctx.$emit('blur', $event)); }),
        onKeydown: [
          _cache[2] || (_cache[2] = withKeys(withModifiers(function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.goNextOption && $options.goNextOption.apply($options, args));
      }, ["prevent","stop"]), ["down"])),
          _cache[3] || (_cache[3] = withKeys(withModifiers(function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.goPrevOption && $options.goPrevOption.apply($options, args));
      }, ["prevent","stop"]), ["up"])),
          _cache[4] || (_cache[4] = withKeys(withModifiers(function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.selectOption && $options.selectOption.apply($options, args));
      }, ["prevent","stop"]), ["enter"]))
        ]
      }, [
        _hoisted_2,
        createElementVNode("div", {
          class: normalizeClass($options.selectTextClasses),
          style: {"overflow-x":"hidden","text-overflow":"ellipsis","white-space":"nowrap"},
          textContent: toDisplayString($options.selectedText)
        }, null, 10 /* CLASS, PROPS */, _hoisted_3)
      ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_1)
    ]; }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["modelValue", "not-close-elements", "append-to-body", "disabled", "style"]))
}

script.render = render;
script.__file = "src/components/select/MultiSelect.vue";

export { script as default };
//# sourceMappingURL=MultiSelect.js.map
