this.primevue = this.primevue || {};
this.primevue.radiobutton = (function (utils, BaseComponent, RadioButtonStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var RadioButtonStyle__default = /*#__PURE__*/_interopDefaultLegacy(RadioButtonStyle);

    var script$1 = {
      name: 'BaseRadioButton',
      "extends": BaseComponent__default["default"],
      props: {
        value: null,
        modelValue: null,
        binary: Boolean,
        name: {
          type: String,
          "default": null
        },
        variant: {
          type: String,
          "default": null
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
      style: RadioButtonStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'RadioButton',
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
            var newModelValue = this.binary ? !this.checked : this.value;
            this.$emit('update:modelValue', newModelValue);
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
          return this.modelValue != null && (this.binary ? !!this.modelValue : utils.ObjectUtils.equals(this.modelValue, this.value));
        }
      }
    };

    var _hoisted_1 = ["data-p-highlight", "data-p-disabled"];
    var _hoisted_2 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "aria-labelledby", "aria-label", "aria-invalid"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, $options.getPTOptions('root'), {
        "data-p-highlight": $options.checked,
        "data-p-disabled": _ctx.disabled
      }), [vue.createElementVNode("input", vue.mergeProps({
        id: _ctx.inputId,
        type: "radio",
        "class": [_ctx.cx('input'), _ctx.inputClass],
        style: _ctx.inputStyle,
        value: _ctx.value,
        name: _ctx.name,
        checked: $options.checked,
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
      }, $options.getPTOptions('input')), null, 16, _hoisted_2), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('box')
      }, $options.getPTOptions('box')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('icon')
      }, $options.getPTOptions('icon')), null, 16)], 16)], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.utils, primevue.basecomponent, primevue.radiobutton.style, Vue);
