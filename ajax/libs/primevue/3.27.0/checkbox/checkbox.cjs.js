'use strict';

var CheckIcon = require('primevue/icons/check');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);

var script = {
    name: 'Checkbox',
    emits: ['click', 'update:modelValue', 'change', 'input', 'focus', 'blur'],
    props: {
        value: null,
        modelValue: null,
        binary: Boolean,
        name: {
            type: String,
            default: null
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
        readonly: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        tabindex: {
            type: Number,
            default: null
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
            if (!this.disabled && !this.readonly) {
                let newModelValue;

                if (this.binary) {
                    newModelValue = this.checked ? this.falseValue : this.trueValue;
                } else {
                    if (this.checked) newModelValue = this.modelValue.filter((val) => !utils.ObjectUtils.equals(val, this.value));
                    else newModelValue = this.modelValue ? [...this.modelValue, this.value] : [this.value];
                }

                this.$emit('click', event);
                this.$emit('update:modelValue', newModelValue);
                this.$emit('change', event);
                this.$emit('input', newModelValue);
                this.$refs.input.focus();
            }
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
        checked() {
            return this.binary ? this.modelValue === this.trueValue : utils.ObjectUtils.contains(this.value, this.modelValue);
        },
        containerClass() {
            return [
                'p-checkbox p-component',
                {
                    'p-checkbox-checked': this.checked,
                    'p-checkbox-disabled': this.disabled,
                    'p-checkbox-focused': this.focused
                }
            ];
        }
    },
    components: {
        CheckIcon: CheckIcon__default["default"]
    }
};

const _hoisted_1 = { class: "p-hidden-accessible" };
const _hoisted_2 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "required", "aria-labelledby", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass($options.containerClass),
    onClick: _cache[2] || (_cache[2] = $event => ($options.onClick($event)))
  }, [
    vue.createElementVNode("div", _hoisted_1, [
      vue.createElementVNode("input", vue.mergeProps({
        ref: "input",
        id: $props.inputId,
        type: "checkbox",
        value: $props.value,
        name: $props.name,
        checked: $options.checked,
        tabindex: $props.tabindex,
        disabled: $props.disabled,
        readonly: $props.readonly,
        required: $props.required,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onFocus: _cache[0] || (_cache[0] = $event => ($options.onFocus($event))),
        onBlur: _cache[1] || (_cache[1] = $event => ($options.onBlur($event)))
      }, $props.inputProps), null, 16, _hoisted_2)
    ]),
    vue.createElementVNode("div", {
      ref: "box",
      class: vue.normalizeClass(['p-checkbox-box', $props.inputClass, { 'p-highlight': $options.checked, 'p-disabled': $props.disabled, 'p-focus': $data.focused }]),
      style: vue.normalizeStyle($props.inputStyle)
    }, [
      vue.renderSlot(_ctx.$slots, "icon", { checked: $options.checked }, () => [
        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.checked ? 'CheckIcon' : null), { class: "p-checkbox-icon" }))
      ])
    ], 6)
  ], 2))
}

script.render = render;

module.exports = script;
