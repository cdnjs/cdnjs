this.primevue = this.primevue || {};
this.primevue.togglebutton = (function (Ripple, utils, BaseComponent, ToggleButtonStyle, vue) {
    'use strict';

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
      style: ToggleButtonStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ToggleButton',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:modelValue', 'change', 'focus', 'blur'],
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
        },
        onFocus: function onFocus(event) {
          this.$emit('focus', event);
        },
        onBlur: function onBlur(event) {
          this.$emit('blur', event);
        }
      },
      computed: {
        active: function active() {
          return this.modelValue === true;
        },
        hasLabel: function hasLabel() {
          return utils.ObjectUtils.isNotEmpty(this.onLabel) && utils.ObjectUtils.isNotEmpty(this.offLabel);
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

    var _hoisted_1 = ["data-p-highlight", "data-p-disabled"];
    var _hoisted_2 = ["id", "value", "checked", "tabindex", "disabled", "readonly", "aria-labelledby", "aria-label", "aria-invalid"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, $options.getPTOptions('root'), {
        "data-p-highlight": $options.active,
        "data-p-disabled": _ctx.disabled
      }), [vue.createElementVNode("input", vue.mergeProps({
        id: _ctx.inputId,
        type: "checkbox",
        role: "switch",
        "class": [_ctx.cx('input'), _ctx.inputClass],
        style: _ctx.inputStyle,
        value: _ctx.modelValue,
        checked: $options.active,
        tabindex: _ctx.tabindex,
        disabled: _ctx.disabled,
        readonly: _ctx.readonly,
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
      }, $options.getPTOptions('input')), null, 16, _hoisted_2), vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('box')
      }, $options.getPTOptions('box')), [vue.renderSlot(_ctx.$slots, "icon", {
        value: _ctx.modelValue,
        "class": vue.normalizeClass(_ctx.cx('icon'))
      }, function () {
        return [_ctx.onIcon || _ctx.offIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          "class": [_ctx.cx('icon'), _ctx.modelValue ? _ctx.onIcon : _ctx.offIcon]
        }, $options.getPTOptions('icon')), null, 16)) : vue.createCommentVNode("", true)];
      }), vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('label')
      }, $options.getPTOptions('label')), vue.toDisplayString($options.label), 17)], 16)), [[_directive_ripple]])], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.ripple, primevue.utils, primevue.basecomponent, primevue.togglebutton.style, Vue);
