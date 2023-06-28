this.primevue = this.primevue || {};
this.primevue.rating = (function (utils, vue) {
    'use strict';

    var script = {
        name: 'Rating',
        emits: ['update:modelValue', 'change', 'focus', 'blur'],
        props: {
            modelValue: {
                type: Number,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            stars: {
                type: Number,
                default: 5
            },
            cancel: {
                type: Boolean,
                default: true
            },
            onIcon: {
                type: String,
                default: 'pi pi-star-fill'
            },
            offIcon: {
                type: String,
                default: 'pi pi-star'
            },
            cancelIcon: {
                type: String,
                default: 'pi pi-ban'
            }
        },
        data() {
            return {
                name: this.$attrs.name,
                focusedOptionIndex: -1
            };
        },
        watch: {
            '$attrs.name': function (newValue) {
                this.name = newValue || utils.UniqueComponentId();
            }
        },
        mounted() {
            this.name = this.name || utils.UniqueComponentId();
        },
        methods: {
            onOptionClick(event, value) {
                if (!this.readonly && !this.disabled) {
                    this.onOptionSelect(event, value);
                    const firstFocusableEl = utils.DomHandler.getFirstFocusableElement(event.currentTarget);

                    firstFocusableEl && utils.DomHandler.focus(firstFocusableEl);
                }
            },
            onFocus(event, value) {
                this.focusedOptionIndex = value;
                this.$emit('focus', event);
            },
            onBlur(event) {
                this.focusedOptionIndex = -1;
                this.$emit('blur', event);
            },
            onChange(event, value) {
                this.onOptionSelect(event, value);
            },
            onOptionSelect(event, value) {
                this.focusedOptionIndex = value;
                this.updateModel(event, value || null);
            },
            updateModel(event, value) {
                this.$emit('update:modelValue', value);
                this.$emit('change', { originalEvent: event, value });
            },
            cancelAriaLabel() {
                return this.$primevue.config.locale.clear;
            },
            starAriaLabel(value) {
                return value === 1 ? this.$primevue.config.locale.aria.star : this.$primevue.config.locale.aria.stars.replace(/{star}/g, value);
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-rating',
                    {
                        'p-readonly': this.readonly,
                        'p-disabled': this.disabled
                    }
                ];
            },
            cancelIconClass() {
                return ['p-rating-icon p-rating-cancel', this.cancelIcon];
            },
            onIconClass() {
                return ['p-rating-icon', this.onIcon];
            },
            offIconClass() {
                return ['p-rating-icon', this.offIcon];
            }
        }
    };

    const _hoisted_1 = { class: "p-hidden-accessible" };
    const _hoisted_2 = ["name", "checked", "disabled", "readonly", "aria-label"];
    const _hoisted_3 = ["onClick"];
    const _hoisted_4 = { class: "p-hidden-accessible" };
    const _hoisted_5 = ["value", "name", "checked", "disabled", "readonly", "aria-label", "onFocus", "onChange"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass($options.containerClass)
      }, [
        ($props.cancel)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(['p-rating-item p-rating-cancel-item', { 'p-focus': $data.focusedOptionIndex === 0 }]),
              onClick: _cache[3] || (_cache[3] = $event => ($options.onOptionClick($event, 0)))
            }, [
              vue.createElementVNode("span", _hoisted_1, [
                vue.createElementVNode("input", {
                  type: "radio",
                  value: "0",
                  name: $data.name,
                  checked: $props.modelValue === 0,
                  disabled: $props.disabled,
                  readonly: $props.readonly,
                  "aria-label": $options.cancelAriaLabel(),
                  onFocus: _cache[0] || (_cache[0] = $event => ($options.onFocus($event, 0))),
                  onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onBlur && $options.onBlur(...args))),
                  onChange: _cache[2] || (_cache[2] = $event => ($options.onChange($event, 0)))
                }, null, 40, _hoisted_2)
              ]),
              vue.renderSlot(_ctx.$slots, "cancelicon", {}, () => [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass($options.cancelIconClass)
                }, null, 2)
              ])
            ], 2))
          : vue.createCommentVNode("", true),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.stars, (value) => {
          return (vue.openBlock(), vue.createElementBlock("div", {
            key: value,
            class: vue.normalizeClass(['p-rating-item', { 'p-rating-item-active': value <= $props.modelValue, 'p-focus': value === $data.focusedOptionIndex }]),
            onClick: $event => ($options.onOptionClick($event, value))
          }, [
            vue.createElementVNode("span", _hoisted_4, [
              vue.createElementVNode("input", {
                type: "radio",
                value: value,
                name: $data.name,
                checked: $props.modelValue === value,
                disabled: $props.disabled,
                readonly: $props.readonly,
                "aria-label": $options.starAriaLabel(value),
                onFocus: $event => ($options.onFocus($event, value)),
                onBlur: _cache[4] || (_cache[4] = (...args) => ($options.onBlur && $options.onBlur(...args))),
                onChange: $event => ($options.onChange($event, value))
              }, null, 40, _hoisted_5)
            ]),
            (value <= $props.modelValue)
              ? vue.renderSlot(_ctx.$slots, "onicon", {
                  key: 0,
                  value: value
                }, () => [
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass($options.onIconClass)
                  }, null, 2)
                ])
              : vue.renderSlot(_ctx.$slots, "officon", {
                  key: 1,
                  value: value
                }, () => [
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass($options.offIconClass)
                  }, null, 2)
                ])
          ], 10, _hoisted_3))
        }), 128))
      ], 2))
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

    var css_248z = "\n.p-rating {\n    position: relative;\n    display: flex;\n    align-items: center;\n}\n.p-rating-item {\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n}\n.p-rating.p-readonly .p-rating-item {\n    cursor: default;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.utils, Vue);
