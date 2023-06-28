this.primevue = this.primevue || {};
this.primevue.inplace = (function (Button, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);

    var script = {
        name: 'Inplace',
        emits: ['open', 'close', 'update:active'],
        props: {
            closable: {
                type: Boolean,
                default: false
            },
            active: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            closeIcon: {
                type: String,
                default: 'pi pi-times'
            },
            displayProps: {
                type: null,
                default: null
            },
            closeButtonProps: {
                type: null,
                default: null
            }
        },
        data() {
            return {
                d_active: this.active
            };
        },
        watch: {
            active(newValue) {
                this.d_active = newValue;
            }
        },
        methods: {
            open(event) {
                if (this.disabled) {
                    return;
                }

                this.$emit('open', event);
                this.d_active = true;
                this.$emit('update:active', true);
            },
            close(event) {
                this.$emit('close', event);
                this.d_active = false;
                this.$emit('update:active', false);
                setTimeout(() => {
                    this.$refs.display.focus();
                }, 0);
            }
        },
        computed: {
            containerClass() {
                return ['p-inplace p-component', { 'p-inplace-closable': this.closable }];
            },
            displayClass() {
                return ['p-inplace-display', { 'p-disabled': this.disabled }];
            },
            closeAriaLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
            }
        },
        components: {
            IPButton: Button__default["default"]
        }
    };

    const _hoisted_1 = ["tabindex"];
    const _hoisted_2 = {
      key: 1,
      class: "p-inplace-content"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_IPButton = vue.resolveComponent("IPButton");

      return (vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass($options.containerClass),
        "aria-live": "polite"
      }, [
        (!$data.d_active)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              ref: "display",
              class: $options.displayClass,
              tabindex: _ctx.$attrs.tabindex || '0',
              role: "button",
              onClick: _cache[0] || (_cache[0] = (...args) => ($options.open && $options.open(...args))),
              onKeydown: _cache[1] || (_cache[1] = vue.withKeys((...args) => ($options.open && $options.open(...args)), ["enter"]))
            }, $props.displayProps), [
              vue.renderSlot(_ctx.$slots, "display")
            ], 16, _hoisted_1))
          : (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.renderSlot(_ctx.$slots, "content"),
              ($props.closable)
                ? (vue.openBlock(), vue.createBlock(_component_IPButton, vue.mergeProps({
                    key: 0,
                    icon: $props.closeIcon,
                    "aria-label": $options.closeAriaLabel,
                    onClick: $options.close
                  }, $props.closeButtonProps), null, 16, ["icon", "aria-label", "onClick"]))
                : vue.createCommentVNode("", true)
            ]))
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

    var css_248z = "\n.p-inplace .p-inplace-display {\n    display: inline;\n    cursor: pointer;\n}\n.p-inplace .p-inplace-content {\n    display: inline;\n}\n.p-fluid .p-inplace.p-inplace-closable .p-inplace-content {\n    display: flex;\n}\n.p-fluid .p-inplace.p-inplace-closable .p-inplace-content > .p-inputtext {\n    flex: 1 1 auto;\n    width: 1%;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.button, Vue);
