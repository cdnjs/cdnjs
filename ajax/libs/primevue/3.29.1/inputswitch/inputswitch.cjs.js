'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'InputSwitch',
    extends: BaseComponent__default["default"],
    emits: ['click', 'update:modelValue', 'change', 'input', 'focus', 'blur'],
    props: {
        modelValue: {
            type: null,
            default: false
        },
        trueValue: {
            type: null,
            default: true
        },
        falseValue: {
            type: null,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inputId: {
            type: String,
            default: null
        },
        inputClass: {
            type: [String, Object],
            default: null
        },
        inputStyle: {
            type: Object,
            default: null
        },
        inputProps: {
            type: null,
            default: null
        },
        'aria-labelledby': {
            type: String,
            default: null
        },
        'aria-label': {
            type: String,
            default: null
        }
    },
    data() {
        return {
            focused: false
        };
    },
    methods: {
        onClick(event) {
            if (!this.disabled) {
                const newValue = this.checked ? this.falseValue : this.trueValue;

                this.$emit('click', event);
                this.$emit('update:modelValue', newValue);
                this.$emit('change', event);
                this.$emit('input', newValue);
                this.$refs.input.focus();
            }

            event.preventDefault();
        },
        onFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
        }
    },
    computed: {
        containerClass() {
            return [
                'p-inputswitch p-component',
                {
                    'p-inputswitch-checked': this.checked,
                    'p-disabled': this.disabled,
                    'p-focus': this.focused
                }
            ];
        },
        checked() {
            return this.modelValue === this.trueValue;
        }
    }
};

const _hoisted_1 = ["id", "checked", "disabled", "aria-checked", "aria-labelledby", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: $options.containerClass,
    onClick: _cache[2] || (_cache[2] = $event => ($options.onClick($event)))
  }, _ctx.ptm('root')), [
    vue.createElementVNode("div", vue.mergeProps({ class: "p-hidden-accessible" }, _ctx.ptm('hiddenInputWrapper')), [
      vue.createElementVNode("input", vue.mergeProps({
        ref: "input",
        id: $props.inputId,
        type: "checkbox",
        role: "switch",
        class: $props.inputClass,
        style: $props.inputStyle,
        checked: $options.checked,
        disabled: $props.disabled,
        "aria-checked": $options.checked,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onFocus: _cache[0] || (_cache[0] = $event => ($options.onFocus($event))),
        onBlur: _cache[1] || (_cache[1] = $event => ($options.onBlur($event)))
      }, _ctx.ptm('hiddenInput')), null, 16, _hoisted_1)
    ], 16),
    vue.createElementVNode("span", vue.mergeProps({ class: "p-inputswitch-slider" }, { ...$props.inputProps, ..._ctx.ptm('slider') }), null, 16)
  ], 16))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-inputswitch {\n    position: relative;\n    display: inline-block;\n}\n.p-inputswitch-slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border: 1px solid transparent;\n}\n.p-inputswitch-slider:before {\n    position: absolute;\n    content: '';\n    top: 50%;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
