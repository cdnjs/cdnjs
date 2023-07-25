'use strict';

var TimesCircleIcon = require('primevue/icons/timescircle');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-chips {\n    display: inline-flex;\n}\n\n.p-chips-multiple-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    cursor: text;\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n}\n\n.p-chips-token {\n    cursor: default;\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n}\n\n.p-chips-input-token {\n    flex: 1 1 auto;\n    display: inline-flex;\n}\n\n.p-chips-token-icon {\n    cursor: pointer;\n}\n\n.p-chips-input-token input {\n    border: 0 none;\n    outline: 0 none;\n    background-color: transparent;\n    margin: 0;\n    padding: 0;\n    box-shadow: none;\n    border-radius: 0;\n    width: 100%;\n}\n\n.p-fluid .p-chips {\n    display: flex;\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-chips p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-focus': instance.focused,
      'p-inputwrapper-filled': props.modelValue && props.modelValue.length || instance.inputValue && instance.inputValue.length,
      'p-inputwrapper-focus': instance.focused
    }];
  },
  container: 'p-inputtext p-chips-multiple-container',
  token: function token(_ref2) {
    var state = _ref2.state,
      index = _ref2.index;
    return ['p-chips-token', {
      'p-focus': state.focusedIndex === index
    }];
  },
  label: 'p-chips-token-label',
  removeTokenIcon: 'p-chips-token-icon',
  inputToken: 'p-chips-input-token'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'chips',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseChips',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: {
      type: Array,
      "default": null
    },
    max: {
      type: Number,
      "default": null
    },
    separator: {
      type: [String, Object],
      "default": null
    },
    addOnBlur: {
      type: Boolean,
      "default": null
    },
    allowDuplicate: {
      type: Boolean,
      "default": true
    },
    placeholder: {
      type: String,
      "default": null
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    removeTokenIcon: {
      type: String,
      "default": undefined
    },
    'aria-labelledby': {
      type: String,
      "default": null
    },
    'aria-label': {
      type: String,
      "default": null
    }
  },
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'Chips',
  "extends": script$1,
  emits: ['update:modelValue', 'add', 'remove', 'focus', 'blur'],
  data: function data() {
    return {
      id: utils.UniqueComponentId(),
      inputValue: null,
      focused: false,
      focusedIndex: null
    };
  },
  methods: {
    onWrapperClick: function onWrapperClick() {
      this.$refs.input.focus();
    },
    onInput: function onInput(event) {
      this.inputValue = event.target.value;
      this.focusedIndex = null;
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.focusedIndex = null;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.focusedIndex = null;
      if (this.addOnBlur) {
        this.addItem(event, event.target.value, false);
      }
      this.$emit('blur', event);
    },
    onKeyDown: function onKeyDown(event) {
      var inputValue = event.target.value;
      switch (event.code) {
        case 'Backspace':
          if (inputValue.length === 0 && this.modelValue && this.modelValue.length > 0) {
            if (this.focusedIndex !== null) {
              this.removeItem(event, this.focusedIndex);
            } else this.removeItem(event, this.modelValue.length - 1);
          }
          break;
        case 'Enter':
          if (inputValue && inputValue.trim().length && !this.maxedOut) {
            this.addItem(event, inputValue, true);
          }
          break;
        case 'ArrowLeft':
          if (inputValue.length === 0 && this.modelValue && this.modelValue.length > 0) {
            this.$refs.container.focus();
          }
          break;
        case 'ArrowRight':
          event.stopPropagation();
          break;
        default:
          if (this.separator) {
            if (this.separator === event.key || event.key.match(this.separator)) {
              this.addItem(event, inputValue, true);
            }
          }
          break;
      }
    },
    onPaste: function onPaste(event) {
      var _this = this;
      if (this.separator) {
        var pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
        if (pastedData) {
          var value = this.modelValue || [];
          var pastedValues = pastedData.split(this.separator);
          pastedValues = pastedValues.filter(function (val) {
            return _this.allowDuplicate || value.indexOf(val) === -1;
          });
          value = [].concat(_toConsumableArray(value), _toConsumableArray(pastedValues));
          this.updateModel(event, value, true);
        }
      }
    },
    onContainerFocus: function onContainerFocus() {
      this.focused = true;
    },
    onContainerBlur: function onContainerBlur() {
      this.focusedIndex = -1;
      this.focused = false;
    },
    onContainerKeyDown: function onContainerKeyDown(event) {
      switch (event.code) {
        case 'ArrowLeft':
          this.onArrowLeftKeyOn(event);
          break;
        case 'ArrowRight':
          this.onArrowRightKeyOn(event);
          break;
        case 'Backspace':
          this.onBackspaceKeyOn(event);
          break;
      }
    },
    onArrowLeftKeyOn: function onArrowLeftKeyOn() {
      if (this.inputValue.length === 0 && this.modelValue && this.modelValue.length > 0) {
        this.focusedIndex = this.focusedIndex === null ? this.modelValue.length - 1 : this.focusedIndex - 1;
        if (this.focusedIndex < 0) this.focusedIndex = 0;
      }
    },
    onArrowRightKeyOn: function onArrowRightKeyOn() {
      if (this.inputValue.length === 0 && this.modelValue && this.modelValue.length > 0) {
        if (this.focusedIndex === this.modelValue.length - 1) {
          this.focusedIndex = null;
          this.$refs.input.focus();
        } else {
          this.focusedIndex++;
        }
      }
    },
    onBackspaceKeyOn: function onBackspaceKeyOn(event) {
      if (this.focusedIndex !== null) {
        this.removeItem(event, this.focusedIndex);
      }
    },
    updateModel: function updateModel(event, value, preventDefault) {
      var _this2 = this;
      this.$emit('update:modelValue', value);
      this.$emit('add', {
        originalEvent: event,
        value: value
      });
      this.$refs.input.value = '';
      this.inputValue = '';
      setTimeout(function () {
        _this2.maxedOut && (_this2.focused = false);
      }, 0);
      if (preventDefault) {
        event.preventDefault();
      }
    },
    addItem: function addItem(event, item, preventDefault) {
      if (item && item.trim().length) {
        var value = this.modelValue ? _toConsumableArray(this.modelValue) : [];
        if (this.allowDuplicate || value.indexOf(item) === -1) {
          value.push(item);
          this.updateModel(event, value, preventDefault);
        }
      }
    },
    removeItem: function removeItem(event, index) {
      if (this.disabled) {
        return;
      }
      var values = _toConsumableArray(this.modelValue);
      var removedItem = values.splice(index, 1);
      this.focusedIndex = null;
      this.$refs.input.focus();
      this.$emit('update:modelValue', values);
      this.$emit('remove', {
        originalEvent: event,
        value: removedItem
      });
    }
  },
  computed: {
    maxedOut: function maxedOut() {
      return this.max && this.modelValue && this.max === this.modelValue.length;
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedIndex !== null ? "".concat(this.id, "_chips_item_").concat(this.focusedIndex) : null;
    }
  },
  components: {
    TimesCircleIcon: TimesCircleIcon__default["default"]
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["aria-labelledby", "aria-label", "aria-activedescendant"];
var _hoisted_2 = ["id", "aria-label", "aria-setsize", "aria-posinset", "data-p-focused"];
var _hoisted_3 = ["id", "disabled", "placeholder"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "chips"
  }), [vue.createElementVNode("ul", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('container'),
    tabindex: "-1",
    role: "listbox",
    "aria-orientation": "horizontal",
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return $options.onWrapperClick();
    }),
    onFocus: _cache[6] || (_cache[6] = function () {
      return $options.onContainerFocus && $options.onContainerFocus.apply($options, arguments);
    }),
    onBlur: _cache[7] || (_cache[7] = function () {
      return $options.onContainerBlur && $options.onContainerBlur.apply($options, arguments);
    }),
    onKeydown: _cache[8] || (_cache[8] = function () {
      return $options.onContainerKeyDown && $options.onContainerKeyDown.apply($options, arguments);
    })
  }, _ctx.ptm('container')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.modelValue, function (val, i) {
    return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: "".concat(i, "_").concat(val),
      id: $data.id + '_chips_item_' + i,
      role: "option",
      "class": _ctx.cx('token', {
        index: i
      }),
      "aria-label": val,
      "aria-selected": true,
      "aria-setsize": _ctx.modelValue.length,
      "aria-posinset": i + 1
    }, _ctx.ptm('token'), {
      "data-p-focused": $data.focusedIndex === i
    }), [vue.renderSlot(_ctx.$slots, "chip", {
      "class": vue.normalizeClass(_ctx.cx('label')),
      value: val
    }, function () {
      return [vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('label')
      }, _ctx.ptm('label')), vue.toDisplayString(val), 17)];
    }), vue.renderSlot(_ctx.$slots, "removetokenicon", {
      "class": vue.normalizeClass(_ctx.cx('removeTokenIcon')),
      onClick: function onClick(event) {
        return $options.removeItem(event, i);
      }
    }, function () {
      return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.removeTokenIcon ? 'span' : 'TimesCircleIcon'), vue.mergeProps({
        "class": [_ctx.cx('removeTokenIcon'), _ctx.removeTokenIcon],
        onClick: function onClick($event) {
          return $options.removeItem($event, i);
        },
        "aria-hidden": "true"
      }, _ctx.ptm('removeTokenIcon')), null, 16, ["class", "onClick"]))];
    })], 16, _hoisted_2);
  }), 128)), vue.createElementVNode("li", vue.mergeProps({
    "class": _ctx.cx('inputToken'),
    role: "option"
  }, _ctx.ptm('inputToken')), [vue.createElementVNode("input", vue.mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: "text",
    "class": _ctx.inputClass,
    style: _ctx.inputStyle,
    disabled: _ctx.disabled || $options.maxedOut,
    placeholder: _ctx.placeholder,
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return $options.onBlur($event);
    }),
    onInput: _cache[2] || (_cache[2] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onKeydown: _cache[3] || (_cache[3] = function ($event) {
      return $options.onKeyDown($event);
    }),
    onPaste: _cache[4] || (_cache[4] = function ($event) {
      return $options.onPaste($event);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input'))), null, 16, _hoisted_3)], 16)], 16, _hoisted_1)], 16);
}

script.render = render;

module.exports = script;
