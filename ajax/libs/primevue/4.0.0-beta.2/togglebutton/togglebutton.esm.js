import Ripple from 'primevue/ripple';
import { ObjectUtils } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import ToggleButtonStyle from 'primevue/togglebutton/style';
import { resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, renderSlot, normalizeClass, createCommentVNode, createElementVNode, toDisplayString } from 'vue';

var script$1 = {
  name: 'BaseToggleButton',
  "extends": BaseComponent,
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
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: ToggleButtonStyle,
  provide: function provide() {
    return {
      $pcToggleButton: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ToggleButton',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change'],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === 'root' ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          active: this.active,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        this.$emit('update:modelValue', !this.modelValue);
        this.$emit('change', event);
      }
    }
  },
  computed: {
    active: function active() {
      return this.modelValue === true;
    },
    hasLabel: function hasLabel() {
      return ObjectUtils.isNotEmpty(this.onLabel) && ObjectUtils.isNotEmpty(this.offLabel);
    },
    label: function label() {
      return this.hasLabel ? this.modelValue ? this.onLabel : this.offLabel : '&nbsp;';
    }
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1 = ["tabindex", "disabled", "aria-pressed", "data-p-highlight", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createElementBlock("button", mergeProps({
    type: "button",
    "class": _ctx.cx('root'),
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    "aria-pressed": _ctx.modelValue,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions('root'), {
    "data-p-highlight": $options.active,
    "data-p-disabled": _ctx.disabled
  }), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [renderSlot(_ctx.$slots, "icon", {
      value: _ctx.modelValue,
      "class": normalizeClass(_ctx.cx('icon'))
    }, function () {
      return [_ctx.onIcon || _ctx.offIcon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 0,
        "class": [_ctx.cx('icon'), _ctx.modelValue ? _ctx.onIcon : _ctx.offIcon]
      }, $options.getPTOptions('icon')), null, 16)) : createCommentVNode("", true)];
    }), createElementVNode("span", mergeProps({
      "class": _ctx.cx('label')
    }, $options.getPTOptions('label')), toDisplayString($options.label), 17)];
  })], 16, _hoisted_1)), [[_directive_ripple]]);
}

script.render = render;

export { script as default };
