import BaseComponent from 'primevue/basecomponent';
import InputTextStyle from 'primevue/inputtext/style';
import { openBlock, createElementBlock, mergeProps } from 'vue';

var script$1 = {
  name: 'BaseInputText',
  "extends": BaseComponent,
  props: {
    modelValue: null,
    size: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    }
  },
  style: InputTextStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InputText',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue'],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === 'root' ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          filled: this.filled,
          disabled: this.$attrs.disabled || this.$attrs.disabled === ''
        }
      });
    },
    onInput: function onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};

var _hoisted_1 = ["value", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({
    "class": _ctx.cx('root'),
    value: _ctx.modelValue,
    "aria-invalid": _ctx.invalid || undefined,
    onInput: _cache[0] || (_cache[0] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, $options.getPTOptions('root')), null, 16, _hoisted_1);
}

script.render = render;

export { script as default };
