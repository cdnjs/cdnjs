'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-inputswitch {\n    display: inline-block;\n}\n\n.p-inputswitch-slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border: 1px solid transparent;\n}\n\n.p-inputswitch-slider:before {\n    position: absolute;\n    content: '';\n    top: 50%;\n}\n";
var inlineStyles = {
  root: {
    position: 'relative'
  }
};
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-inputswitch p-component', {
      'p-inputswitch-checked': instance.checked,
      'p-disabled': props.disabled,
      'p-focus': instance.focused
    }];
  },
  slider: 'p-inputswitch-slider'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'inputswitch',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseInputSwitch',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: {
      type: null,
      "default": false
    },
    trueValue: {
      type: null,
      "default": true
    },
    falseValue: {
      type: null,
      "default": false
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
    classes: classes,
    inlineStyles: inlineStyles,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InputSwitch',
  "extends": script$1,
  emits: ['click', 'update:modelValue', 'change', 'input', 'focus', 'blur'],
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick: function onClick(event) {
      if (!this.disabled) {
        var newValue = this.checked ? this.falseValue : this.trueValue;
        this.$emit('click', event);
        this.$emit('update:modelValue', newValue);
        this.$emit('change', event);
        this.$emit('input', newValue);
        this.$refs.input.focus();
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
      return this.modelValue === this.trueValue;
    }
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id", "checked", "disabled", "aria-checked", "aria-labelledby", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    style: _ctx.sx('root'),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.onClick($event);
    })
  }, _ctx.ptm('root'), {
    "data-pc-name": "inputswitch"
  }), [vue.createElementVNode("div", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: "checkbox",
    role: "switch",
    "class": _ctx.inputClass,
    style: _ctx.inputStyle,
    checked: $options.checked,
    disabled: _ctx.disabled,
    "aria-checked": $options.checked,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return $options.onBlur($event);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_1)], 16), vue.createElementVNode("span", vue.mergeProps({
    "class": _ctx.cx('slider')
  }, _ctx.ptm('slider')), null, 16)], 16);
}

script.render = render;

module.exports = script;
