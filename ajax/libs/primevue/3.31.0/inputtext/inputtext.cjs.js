'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-inputtext p-component', {
      'p-filled': instance.filled,
      'p-inputtext-sm': props.size === 'small',
      'p-inputtext-lg': props.size === 'large'
    }];
  }
};
var script$1 = {
  name: 'BaseInputText',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: null,
    size: {
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
  name: 'InputText',
  "extends": script$1,
  emits: ['update:modelValue'],
  methods: {
    onInput: function onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    ptmParams: function ptmParams() {
      return {
        context: {
          filled: this.filled,
          disabled: this.$attrs.disabled || this.$attrs.disabled === ''
        }
      };
    }
  }
};

var _hoisted_1 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
    "class": _ctx.cx('root'),
    value: _ctx.modelValue,
    onInput: _cache[0] || (_cache[0] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, _ctx.ptm('root', $options.ptmParams), {
    "data-pc-name": "inputtext"
  }), null, 16, _hoisted_1);
}

script.render = render;

module.exports = script;
