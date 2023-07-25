'use strict';

var Ripple = require('primevue/ripple');
var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-button p-togglebutton p-component', {
      'p-focus': instance.focused,
      'p-button-icon-only': instance.hasIcon && !instance.hasLabel,
      'p-disabled': props.disabled,
      'p-highlight': props.modelValue === true
    }];
  },
  icon: function icon(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-button-icon', {
      'p-button-icon-left': props.iconPos === 'left' && instance.label,
      'p-button-icon-right': props.iconPos === 'right' && instance.label
    }];
  },
  label: 'p-button-label'
};
var script$1 = {
  name: 'BaseToggleButton',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: Boolean,
    onIcon: String,
    offIcon: String,
    onLabel: {
      type: String,
      "default": 'Yes'
    },
    offLabel: {
      type: String,
      "default": 'No'
    },
    iconPos: {
      type: String,
      "default": 'left'
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
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
  name: 'ToggleButton',
  "extends": script$1,
  emits: ['update:modelValue', 'change', 'click', 'focus', 'blur'],
  outsideClickListener: null,
  data: function data() {
    return {
      focused: false
    };
  },
  mounted: function mounted() {
    this.bindOutsideClickListener();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
  },
  methods: {
    onClick: function onClick(event) {
      if (!this.disabled) {
        this.$emit('update:modelValue', !this.modelValue);
        this.$emit('change', event);
        this.$emit('click', event);
        this.focused = true;
      }
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this.focused && !_this.$refs.container.contains(event.target)) {
            _this.focused = false;
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    }
  },
  computed: {
    hasLabel: function hasLabel() {
      return this.onLabel && this.onLabel.length > 0 && this.offLabel && this.offLabel.length > 0;
    },
    hasIcon: function hasIcon() {
      return this.$slots.icon || this.onIcon && this.offIcon;
    },
    label: function label() {
      return this.hasLabel ? this.modelValue ? this.onLabel : this.offLabel : '&nbsp;';
    }
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["data-p-active"];
var _hoisted_2 = ["id", "checked", "value", "aria-labelledby", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.onClick($event);
    })
  }, _ctx.ptm('root'), {
    "data-p-active": _ctx.modelValue === true,
    "data-pc-name": "togglebutton"
  }), [vue.createElementVNode("span", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    role: "switch",
    "class": _ctx.inputClass,
    style: _ctx.inputStyle,
    checked: _ctx.modelValue,
    value: _ctx.modelValue,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return $options.onBlur($event);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_2)], 16), vue.renderSlot(_ctx.$slots, "icon", {
    value: _ctx.modelValue,
    "class": vue.normalizeClass(_ctx.cx('icon'))
  }, function () {
    return [_ctx.onIcon || _ctx.offIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 0,
      "class": [_ctx.cx('icon'), _ctx.modelValue ? _ctx.onIcon : _ctx.offIcon]
    }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true)];
  }), vue.createElementVNode("span", vue.mergeProps({
    "class": _ctx.cx('label')
  }, _ctx.ptm('label')), vue.toDisplayString($options.label), 17)], 16, _hoisted_1)), [[_directive_ripple]]);
}

script.render = render;

module.exports = script;
