import CheckIcon from 'primevue/icons/check';
import TimesIcon from 'primevue/icons/times';
import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, createElementVNode, toDisplayString, renderSlot, normalizeClass, createBlock, resolveDynamicComponent } from 'vue';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-checkbox p-component', {
      'p-checkbox-checked': props.modelValue === true,
      'p-checkbox-disabled': props.disabled,
      'p-checkbox-focused': instance.focused
    }];
  },
  checkbox: function checkbox(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-checkbox-box', {
      'p-highlight': props.modelValue != null,
      'p-disabled': props.disabled,
      'p-focus': instance.focused
    }];
  },
  checkIcon: 'p-checkbox-icon',
  uncheckIcon: 'p-checkbox-icon',
  nullableIcon: 'p-checkbox-icon'
};
var script$1 = {
  name: 'BaseTriStateCheckbox',
  "extends": BaseComponent,
  props: {
    modelValue: null,
    inputId: {
      type: String,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
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
  name: 'TriStateCheckbox',
  "extends": script$1,
  emits: ['click', 'update:modelValue', 'change', 'keydown', 'focus', 'blur'],
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          active: this.modelValue !== null,
          focused: this.focused,
          disabled: this.disabled
        }
      });
    },
    updateModel: function updateModel() {
      if (!this.disabled) {
        var newValue;
        switch (this.modelValue) {
          case true:
            newValue = false;
            break;
          case false:
            newValue = null;
            break;
          default:
            newValue = true;
            break;
        }
        this.$emit('update:modelValue', newValue);
      }
    },
    onClick: function onClick(event) {
      this.updateModel();
      this.$emit('click', event);
      this.$emit('change', event);
      this.$refs.input.focus();
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === 'Enter') {
        this.updateModel();
        this.$emit('keydown', event);
        event.preventDefault();
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
    ariaValueLabel: function ariaValueLabel() {
      return this.modelValue ? this.$primevue.config.locale.aria.trueLabel : this.modelValue === false ? this.$primevue.config.locale.aria.falseLabel : this.$primevue.config.locale.aria.nullLabel;
    }
  },
  components: {
    CheckIcon: CheckIcon,
    TimesIcon: TimesIcon
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id", "checked", "tabindex", "disabled", "aria-labelledby", "aria-label"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.onClick($event);
    })
  }, _ctx.ptm('root'), {
    "data-pc-name": "tristatecheckbox"
  }), [createElementVNode("div", mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [createElementVNode("input", mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: "checkbox",
    checked: _ctx.modelValue === true,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onKeydown: _cache[0] || (_cache[0] = function ($event) {
      return $options.onKeyDown($event);
    }),
    onFocus: _cache[1] || (_cache[1] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[2] || (_cache[2] = function ($event) {
      return $options.onBlur($event);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_1)], 16), createElementVNode("span", mergeProps({
    role: "status",
    "class": "p-hidden-accessible",
    "aria-live": "polite"
  }, _ctx.ptm('hiddenValueLabel'), {
    "data-p-hidden-accessible": true
  }), toDisplayString($options.ariaValueLabel), 17), createElementVNode("div", mergeProps({
    ref: "box",
    "class": _ctx.cx('checkbox')
  }, $options.getPTOptions('checkbox'), {
    "data-p-highlight": _ctx.modelValue != null,
    "data-p-disabled": _ctx.disabled,
    "data-p-focused": $data.focused
  }), [_ctx.modelValue === true ? renderSlot(_ctx.$slots, "checkicon", {
    key: 0,
    "class": normalizeClass(_ctx.cx('checkIcon'))
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent('CheckIcon'), mergeProps({
      "class": _ctx.cx('checkIcon')
    }, _ctx.ptm('checkIcon')), null, 16, ["class"]))];
  }) : _ctx.modelValue === false ? renderSlot(_ctx.$slots, "uncheckicon", {
    key: 1,
    "class": normalizeClass(_ctx.cx('uncheckIcon'))
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent('TimesIcon'), mergeProps({
      "class": _ctx.cx('uncheckIcon')
    }, _ctx.ptm('uncheckIcon')), null, 16, ["class"]))];
  }) : renderSlot(_ctx.$slots, "nullableicon", {
    key: 2,
    "class": normalizeClass(_ctx.cx('nullableIcon'))
  }, function () {
    return [createElementVNode("span", mergeProps({
      "class": _ctx.cx('nullableIcon')
    }, _ctx.ptm('nullableIcon')), null, 16)];
  })], 16, _hoisted_2)], 16);
}

script.render = render;

export { script as default };
