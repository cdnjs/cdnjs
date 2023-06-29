import BaseComponent from 'primevue/basecomponent';
import { ObjectUtils } from 'primevue/utils';
import { openBlock, createElementBlock, mergeProps, createElementVNode } from 'vue';

var script = {
    name: 'RadioButton',
    extends: BaseComponent,
    emits: ['click', 'update:modelValue', 'change', 'focus', 'blur'],
    props: {
        value: null,
        modelValue: null,
        name: {
            type: String,
            default: null
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
                this.$emit('click', event);
                this.$emit('update:modelValue', this.value);
                this.$refs.input.focus();

                if (!this.checked) {
                    this.$emit('change', event);
                }
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
            return this.modelValue != null && ObjectUtils.equals(this.modelValue, this.value);
        },
        containerClass() {
            return [
                'p-radiobutton p-component',
                {
                    'p-radiobutton-checked': this.checked,
                    'p-radiobutton-disabled': this.disabled,
                    'p-radiobutton-focused': this.focused
                }
            ];
        }
    }
};

const _hoisted_1 = ["id", "name", "checked", "disabled", "value", "aria-labelledby", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    class: $options.containerClass,
    onClick: _cache[2] || (_cache[2] = $event => ($options.onClick($event)))
  }, _ctx.ptm('root')), [
    createElementVNode("div", mergeProps({ class: "p-hidden-accessible" }, _ctx.ptm('hiddenInputWrapper')), [
      createElementVNode("input", mergeProps({
        ref: "input",
        id: $props.inputId,
        type: "radio",
        class: $props.inputClass,
        style: $props.inputStyle,
        name: $props.name,
        checked: $options.checked,
        disabled: $props.disabled,
        value: $props.value,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onFocus && $options.onFocus(...args))),
        onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onBlur && $options.onBlur(...args)))
      }, _ctx.ptm('hiddenInput')), null, 16, _hoisted_1)
    ], 16),
    createElementVNode("div", mergeProps({
      ref: "box",
      class: ['p-radiobutton-box', { 'p-highlight': $options.checked, 'p-disabled': $props.disabled, 'p-focus': $data.focused }]
    }, { ...$props.inputProps, ..._ctx.ptm('input') }), [
      createElementVNode("div", mergeProps({ class: "p-radiobutton-icon" }, _ctx.ptm('icon')), null, 16)
    ], 16)
  ], 16))
}

script.render = render;

export { script as default };
