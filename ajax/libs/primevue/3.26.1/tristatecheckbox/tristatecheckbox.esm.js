import { openBlock, createElementBlock, normalizeClass, createElementVNode, mergeProps, toDisplayString } from 'vue';

var script = {
    name: 'TriStateCheckbox',
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
        icon() {
            let icon;

            switch (this.modelValue) {
                case true:
                    icon = 'pi pi-check';
                    break;

                case false:
                    icon = 'pi pi-times';
                    break;

                case null:
                    icon = null;
                    break;
            }

            return icon;
        },
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
    }
};

const _hoisted_1 = { class: "p-hidden-accessible" };
const _hoisted_2 = ["id", "checked", "tabindex", "disabled", "aria-labelledby", "aria-label"];
const _hoisted_3 = {
  class: "p-sr-only",
  "aria-live": "polite"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClass),
    onClick: _cache[3] || (_cache[3] = $event => ($options.onClick($event)))
  }, [
    createElementVNode("div", _hoisted_1, [
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
      }, $props.inputProps), null, 16, _hoisted_2)
    ]),
    createElementVNode("span", _hoisted_3, toDisplayString($options.ariaValueLabel), 1),
    createElementVNode("div", {
      ref: "box",
      class: normalizeClass(['p-checkbox-box', { 'p-highlight': $props.modelValue != null, 'p-disabled': $props.disabled, 'p-focus': $data.focused }])
    }, [
      createElementVNode("span", {
        class: normalizeClass(['p-checkbox-icon', $options.icon])
      }, null, 2)
    ], 2)
  ], 2))
}

script.render = render;

export { script as default };
