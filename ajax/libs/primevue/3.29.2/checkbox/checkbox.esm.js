import BaseComponent from 'primevue/basecomponent';
import CheckIcon from 'primevue/icons/check';
import { ObjectUtils } from 'primevue/utils';
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, createBlock, resolveDynamicComponent } from 'vue';

var script = {
    name: 'Checkbox',
    extends: BaseComponent,
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
                    if (this.checked) newModelValue = this.modelValue.filter((val) => !ObjectUtils.equals(val, this.value));
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
            return this.binary ? this.modelValue === this.trueValue : ObjectUtils.contains(this.value, this.modelValue);
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
        CheckIcon: CheckIcon
    }
};

const _hoisted_1 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "required", "aria-labelledby", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    class: $options.containerClass,
    onClick: _cache[2] || (_cache[2] = $event => ($options.onClick($event)))
  }, _ctx.ptm('root')), [
    createElementVNode("div", mergeProps({ class: "p-hidden-accessible" }, _ctx.ptm('hiddenInputWrapper')), [
      createElementVNode("input", mergeProps({
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
      }, _ctx.ptm('hiddenInput')), null, 16, _hoisted_1)
    ], 16),
    createElementVNode("div", mergeProps({
      ref: "box",
      class: ['p-checkbox-box', $props.inputClass, { 'p-highlight': $options.checked, 'p-disabled': $props.disabled, 'p-focus': $data.focused }],
      style: $props.inputStyle
    }, { ...$props.inputProps, ..._ctx.ptm('input') }), [
      renderSlot(_ctx.$slots, "icon", { checked: $options.checked }, () => [
        (openBlock(), createBlock(resolveDynamicComponent($options.checked ? 'CheckIcon' : null), mergeProps({ class: "p-checkbox-icon" }, _ctx.ptm('icon')), null, 16))
      ])
    ], 16)
  ], 16))
}

script.render = render;

export { script as default };
