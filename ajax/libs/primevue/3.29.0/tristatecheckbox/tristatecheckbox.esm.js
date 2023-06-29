import BaseComponent from 'primevue/basecomponent';
import CheckIcon from 'primevue/icons/check';
import TimesIcon from 'primevue/icons/times';
import { openBlock, createElementBlock, mergeProps, createElementVNode, toDisplayString, renderSlot, createBlock, resolveDynamicComponent } from 'vue';

var script = {
    name: 'TriStateCheckbox',
    extends: BaseComponent,
    emits: ['click', 'update:modelValue', 'change', 'keydown', 'focus', 'blur'],
    props: {
        modelValue: null,
        inputId: {
            type: String,
            default: null
        },
        inputProps: {
            type: null,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tabindex: {
            type: Number,
            default: 0
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
        getPTOptions(key) {
            return this.ptm(key, {
                context: {
                    active: this.modelValue !== null,
                    focused: this.focused,
                    disabled: this.disabled
                }
            });
        },
        updateModel() {
            if (!this.disabled) {
                let newValue;

                switch (this.modelValue) {
                    case true:
                        newValue = false;
                        break;

                    case false:
                        newValue = null;
                        break;

                    default:
                        newValue = true;
                        break;
                }

                this.$emit('update:modelValue', newValue);
            }
        },
        onClick(event) {
            this.updateModel();
            this.$emit('click', event);
            this.$emit('change', event);
            this.$refs.input.focus();
        },
        onKeyDown(event) {
            if (event.code === 'Enter') {
                this.updateModel();
                this.$emit('keydown', event);
                event.preventDefault();
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
        containerClass() {
            return [
                'p-checkbox p-component',
                {
                    'p-checkbox-checked': this.modelValue === true,
                    'p-checkbox-disabled': this.disabled,
                    'p-checkbox-focused': this.focused
                }
            ];
        },
        ariaValueLabel() {
            return this.modelValue ? this.$primevue.config.locale.aria.trueLabel : this.modelValue === false ? this.$primevue.config.locale.aria.falseLabel : this.$primevue.config.locale.aria.nullLabel;
        }
    },
    components: {
        CheckIcon: CheckIcon,
        TimesIcon: TimesIcon
    }
};

const _hoisted_1 = ["id", "checked", "tabindex", "disabled", "aria-labelledby", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    class: $options.containerClass,
    onClick: _cache[3] || (_cache[3] = $event => ($options.onClick($event)))
  }, _ctx.ptm('root')), [
    createElementVNode("div", mergeProps({ class: "p-hidden-accessible" }, _ctx.ptm('hiddenInputWrapper')), [
      createElementVNode("input", mergeProps({
        ref: "input",
        id: $props.inputId,
        type: "checkbox",
        checked: $props.modelValue === true,
        tabindex: $props.tabindex,
        disabled: $props.disabled,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onKeydown: _cache[0] || (_cache[0] = $event => ($options.onKeyDown($event))),
        onFocus: _cache[1] || (_cache[1] = $event => ($options.onFocus($event))),
        onBlur: _cache[2] || (_cache[2] = $event => ($options.onBlur($event)))
      }, { ...$props.inputProps, ..._ctx.ptm('hiddenInput') }), null, 16, _hoisted_1)
    ], 16),
    createElementVNode("span", mergeProps({
      class: "p-sr-only",
      "aria-live": "polite"
    }, _ctx.ptm('srOnlyAria')), toDisplayString($options.ariaValueLabel), 17),
    createElementVNode("div", mergeProps({
      ref: "box",
      class: ['p-checkbox-box', { 'p-highlight': $props.modelValue != null, 'p-disabled': $props.disabled, 'p-focus': $data.focused }]
    }, $options.getPTOptions('checbox')), [
      ($props.modelValue === true)
        ? renderSlot(_ctx.$slots, "checkicon", { key: 0 }, () => [
            (openBlock(), createBlock(resolveDynamicComponent('CheckIcon'), mergeProps({ class: "p-checkbox-icon" }, _ctx.ptm('checkIcon')), null, 16))
          ])
        : ($props.modelValue === false)
          ? renderSlot(_ctx.$slots, "uncheckicon", { key: 1 }, () => [
              (openBlock(), createBlock(resolveDynamicComponent('TimesIcon'), mergeProps({ class: "p-checkbox-icon" }, _ctx.ptm('uncheckIcon')), null, 16))
            ])
          : renderSlot(_ctx.$slots, "nullableicon", { key: 2 }, () => [
              createElementVNode("span", mergeProps({ class: "p-checkbox-icon" }, _ctx.ptm('nullableIcon')), null, 16)
            ])
    ], 16)
  ], 16))
}

script.render = render;

export { script as default };
