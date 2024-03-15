import BaseComponent from 'primevue/basecomponent';
import InputSwitchStyle from 'primevue/inputswitch/style';
import { openBlock, createElementBlock, mergeProps, createElementVNode } from 'vue';

var script$1 = {
  name: 'BaseInputSwitch',
  "extends": BaseComponent,
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
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
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
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: InputSwitchStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InputSwitch',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === 'root' ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        var newValue = this.checked ? this.falseValue : this.trueValue;
        this.$emit('update:modelValue', newValue);
        this.$emit('change', event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.$emit('blur', event);
    }
  },
  computed: {
    checked: function checked() {
      return this.modelValue === this.trueValue;
    }
  }
};

var _hoisted_1 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_2 = ["id", "checked", "tabindex", "disabled", "readonly", "aria-checked", "aria-labelledby", "aria-label", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    style: _ctx.sx('root')
  }, $options.getPTOptions('root'), {
    "data-p-highlight": $options.checked,
    "data-p-disabled": _ctx.disabled
  }), [createElementVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    role: "switch",
    "class": [_ctx.cx('input'), _ctx.inputClass],
    style: _ctx.inputStyle,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-checked": $options.checked,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || undefined,
    onFocus: _cache[0] || (_cache[0] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function () {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions('input')), null, 16, _hoisted_2), createElementVNode("span", mergeProps({
    "class": _ctx.cx('slider')
  }, $options.getPTOptions('slider')), null, 16)], 16, _hoisted_1);
}

script.render = render;

export { script as default };
