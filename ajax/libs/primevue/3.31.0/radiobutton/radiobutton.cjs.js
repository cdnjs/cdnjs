'use strict';

var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-radiobutton p-component', {
      'p-radiobutton-checked': instance.checked,
      'p-radiobutton-disabled': props.disabled,
      'p-radiobutton-focused': instance.focused
    }];
  },
  input: function input(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-radiobutton-box', {
      'p-highlight': instance.checked,
      'p-disabled': props.disabled,
      'p-focus': instance.focused
    }];
  },
  icon: 'p-radiobutton-icon'
};
var script$1 = {
  name: 'BaseRadioButton',
  "extends": BaseComponent__default["default"],
  props: {
    value: null,
    modelValue: null,
    name: {
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
    classes: classes
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'RadioButton',
  "extends": script$1,
  emits: ['click', 'update:modelValue', 'change', 'focus', 'blur'],
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick: function onClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
        this.$emit('update:modelValue', this.value);
        this.$refs.input.focus();
        if (!this.checked) {
          this.$emit('change', event);
        }
      }
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    }
  },
  computed: {
    checked: function checked() {
      return this.modelValue != null && utils.ObjectUtils.equals(this.modelValue, this.value);
    }
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id", "name", "checked", "disabled", "value", "aria-labelledby", "aria-label"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.onClick($event);
    })
  }, _ctx.ptm('root'), {
    "data-pc-name": "radiobutton"
  }), [vue.createElementVNode("div", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: "radio",
    name: _ctx.name,
    checked: $options.checked,
    disabled: _ctx.disabled,
    value: _ctx.value,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onFocus: _cache[0] || (_cache[0] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    })
  }, _ctx.ptm('hiddenInput')), null, 16, _hoisted_1)], 16), vue.createElementVNode("div", vue.mergeProps({
    ref: "box",
    "class": [_ctx.cx('input'), _ctx.inputClass],
    style: _ctx.inputStyle
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input')), {
    "data-p-highlight": $options.checked,
    "data-p-disabled": _ctx.disabled,
    "data-p-focused": $data.focused
  }), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('icon')
  }, _ctx.ptm('icon')), null, 16)], 16, _hoisted_2)], 16);
}

script.render = render;

module.exports = script;
