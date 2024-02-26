import BaseComponent from 'primevue/basecomponent';
import TextareaStyle from 'primevue/textarea/style';
import { openBlock, createElementBlock, mergeProps } from 'vue';

var script$1 = {
  name: 'BaseTextarea',
  "extends": BaseComponent,
  props: {
    modelValue: null,
    autoResize: Boolean,
    invalid: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    }
  },
  style: TextareaStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Textarea',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue'],
  mounted: function mounted() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  updated: function updated() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  methods: {
    resize: function resize() {
      this.$el.style.height = 'auto';
      this.$el.style.height = this.$el.scrollHeight + 'px';
      if (parseFloat(this.$el.style.height) >= parseFloat(this.$el.style.maxHeight)) {
        this.$el.style.overflowY = 'scroll';
        this.$el.style.height = this.$el.style.maxHeight;
      } else {
        this.$el.style.overflow = 'hidden';
      }
    },
    onInput: function onInput(event) {
      if (this.autoResize) {
        this.resize();
      }
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
          disabled: this.$attrs.disabled || this.$attrs.disabled === ''
        }
      };
    }
  }
};

var _hoisted_1 = ["value", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("textarea", mergeProps({
    "class": _ctx.cx('root'),
    value: _ctx.modelValue,
    "aria-invalid": _ctx.invalid || undefined,
    onInput: _cache[0] || (_cache[0] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, _ctx.ptmi('root', $options.ptmParams)), null, 16, _hoisted_1);
}

script.render = render;

export { script as default };
