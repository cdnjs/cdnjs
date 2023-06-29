import BaseComponent from 'primevue/basecomponent';
import Ripple from 'primevue/ripple';
import { resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, normalizeClass, createCommentVNode, toDisplayString } from 'vue';

var script = {
    name: 'ToggleButton',
    extends: BaseComponent,
    emits: ['update:modelValue', 'change', 'click', 'focus', 'blur'],
    props: {
        modelValue: Boolean,
        onIcon: String,
        offIcon: String,
        onLabel: {
            type: String,
            default: 'Yes'
        },
        offLabel: {
            type: String,
            default: 'No'
        },
        iconPos: {
            type: String,
            default: 'left'
        },
        disabled: {
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
    outsideClickListener: null,
    data() {
        return {
            focused: false
        };
    },
    mounted() {
        this.bindOutsideClickListener();
    },
    beforeUnmount() {
        this.unbindOutsideClickListener();
    },
    methods: {
        onClick(event) {
            if (!this.disabled) {
                this.$emit('update:modelValue', !this.modelValue);
                this.$emit('change', event);
                this.$emit('click', event);
                this.focused = true;
            }
        },
        onFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.focused && !this.$refs.container.contains(event.target)) {
                        this.focused = false;
                    }
                };

                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        }
    },
    computed: {
        buttonClass() {
            return [
                'p-button p-togglebutton p-component',
                {
                    'p-focus': this.focused,
                    'p-button-icon-only': this.hasIcon && !this.hasLabel,
                    'p-disabled': this.disabled,
                    'p-highlight': this.modelValue === true
                }
            ];
        },
        iconClass() {
            return [
                this.modelValue ? this.onIcon : this.offIcon,
                'p-button-icon',
                {
                    'p-button-icon-left': this.iconPos === 'left' && this.label,
                    'p-button-icon-right': this.iconPos === 'right' && this.label
                }
            ];
        },
        hasLabel() {
            return this.onLabel && this.onLabel.length > 0 && this.offLabel && this.offLabel.length > 0;
        },
        hasIcon() {
            return this.$slots.icon || (this.onIcon && this.offIcon);
        },
        label() {
            return this.hasLabel ? (this.modelValue ? this.onLabel : this.offLabel) : '&nbsp;';
        }
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = ["id", "checked", "value", "aria-labelledby", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");

  return withDirectives((openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    class: $options.buttonClass,
    onClick: _cache[2] || (_cache[2] = $event => ($options.onClick($event)))
  }, _ctx.ptm('root')), [
    createElementVNode("span", mergeProps({ class: "p-hidden-accessible" }, _ctx.ptm('hiddenInputWrapper')), [
      createElementVNode("input", mergeProps({
        id: $props.inputId,
        type: "checkbox",
        role: "switch",
        class: $props.inputClass,
        style: $props.inputStyle,
        checked: $props.modelValue,
        value: $props.modelValue,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onFocus: _cache[0] || (_cache[0] = $event => ($options.onFocus($event))),
        onBlur: _cache[1] || (_cache[1] = $event => ($options.onBlur($event)))
      }, { ...$props.inputProps, ..._ctx.ptm('hiddenInput') }), null, 16, _hoisted_1)
    ], 16),
    renderSlot(_ctx.$slots, "icon", {
      value: $props.modelValue,
      class: normalizeClass($options.iconClass)
    }, () => [
      ($props.onIcon || $props.offIcon)
        ? (openBlock(), createElementBlock("span", mergeProps({
            key: 0,
            class: $options.iconClass
          }, _ctx.ptm('icon')), null, 16))
        : createCommentVNode("", true)
    ]),
    createElementVNode("span", mergeProps({ class: "p-button-label" }, _ctx.ptm('label')), toDisplayString($options.label), 17)
  ], 16)), [
    [_directive_ripple]
  ])
}

script.render = render;

export { script as default };
