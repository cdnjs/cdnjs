'use strict';

var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var ToggleButtonStyle = require('primevue/togglebutton/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ToggleButtonStyle__default = /*#__PURE__*/_interopDefaultLegacy(ToggleButtonStyle);

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
  style: ToggleButtonStyle__default["default"],
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
      return utils.ObjectUtils.isNotEmpty(this.onLabel) && utils.ObjectUtils.isNotEmpty(this.offLabel);
    },
    label: function label() {
      return this.hasLabel ? this.modelValue ? this.onLabel : this.offLabel : '&nbsp;';
    }
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

var _hoisted_1 = ["tabindex", "disabled", "aria-pressed", "data-p-highlight", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
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
  }), [vue.renderSlot(_ctx.$slots, "default", {}, function () {
    return [vue.renderSlot(_ctx.$slots, "icon", {
      value: _ctx.modelValue,
      "class": vue.normalizeClass(_ctx.cx('icon'))
    }, function () {
      return [_ctx.onIcon || _ctx.offIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 0,
        "class": [_ctx.cx('icon'), _ctx.modelValue ? _ctx.onIcon : _ctx.offIcon]
      }, $options.getPTOptions('icon')), null, 16)) : vue.createCommentVNode("", true)];
    }), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('label')
    }, $options.getPTOptions('label')), vue.toDisplayString($options.label), 17)];
  })], 16, _hoisted_1)), [[_directive_ripple]]);
}

script.render = render;

module.exports = script;
