this.primevue = this.primevue || {};
this.primevue.tristatecheckbox = (function (BaseComponent, CheckIcon, TimesIcon, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);

    var script = {
        name: 'TriStateCheckbox',
        extends: BaseComponent__default["default"],
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
            CheckIcon: CheckIcon__default["default"],
            TimesIcon: TimesIcon__default["default"]
        }
    };

    const _hoisted_1 = ["id", "checked", "tabindex", "disabled", "aria-labelledby", "aria-label"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        class: $options.containerClass,
        onClick: _cache[3] || (_cache[3] = $event => ($options.onClick($event)))
      }, _ctx.ptm('root')), [
        vue.createElementVNode("div", vue.mergeProps({ class: "p-hidden-accessible" }, _ctx.ptm('hiddenInputWrapper')), [
          vue.createElementVNode("input", vue.mergeProps({
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
        vue.createElementVNode("span", vue.mergeProps({
          class: "p-sr-only",
          "aria-live": "polite"
        }, _ctx.ptm('srOnlyAria')), vue.toDisplayString($options.ariaValueLabel), 17),
        vue.createElementVNode("div", vue.mergeProps({
          ref: "box",
          class: ['p-checkbox-box', { 'p-highlight': $props.modelValue != null, 'p-disabled': $props.disabled, 'p-focus': $data.focused }]
        }, $options.getPTOptions('checbox')), [
          ($props.modelValue === true)
            ? vue.renderSlot(_ctx.$slots, "checkicon", { key: 0 }, () => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent('CheckIcon'), vue.mergeProps({ class: "p-checkbox-icon" }, _ctx.ptm('checkIcon')), null, 16))
              ])
            : ($props.modelValue === false)
              ? vue.renderSlot(_ctx.$slots, "uncheckicon", { key: 1 }, () => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent('TimesIcon'), vue.mergeProps({ class: "p-checkbox-icon" }, _ctx.ptm('uncheckIcon')), null, 16))
                ])
              : vue.renderSlot(_ctx.$slots, "nullableicon", { key: 2 }, () => [
                  vue.createElementVNode("span", vue.mergeProps({ class: "p-checkbox-icon" }, _ctx.ptm('nullableIcon')), null, 16)
                ])
        ], 16)
      ], 16))
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.icons.check, primevue.icons.times, Vue);
