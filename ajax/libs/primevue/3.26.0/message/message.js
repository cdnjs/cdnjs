this.primevue = this.primevue || {};
this.primevue.message = (function (Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script = {
        name: 'Message',
        emits: ['close'],
        props: {
            severity: {
                type: String,
                default: 'info'
            },
            closable: {
                type: Boolean,
                default: true
            },
            sticky: {
                type: Boolean,
                default: true
            },
            life: {
                type: Number,
                default: 3000
            },
            icon: {
                type: String,
                default: null
            },
            closeIcon: {
                type: String,
                default: 'pi pi-times'
            },
            closeButtonProps: {
                type: null,
                default: null
            }
        },
        timeout: null,
        data() {
            return {
                visible: true
            };
        },
        mounted() {
            if (!this.sticky) {
                this.x();
            }
        },
        methods: {
            close(event) {
                this.visible = false;
                this.$emit('close', event);
            },
            x() {
                setTimeout(() => {
                    this.visible = false;
                }, this.life);
            }
        },
        computed: {
            containerClass() {
                return 'p-message p-component p-message-' + this.severity;
            },
            iconClass() {
                return [
                    'p-message-icon pi',
                    this.icon
                        ? this.icon
                        : {
                              'pi-info-circle': this.severity === 'info',
                              'pi-check': this.severity === 'success',
                              'pi-exclamation-triangle': this.severity === 'warn',
                              'pi-times-circle': this.severity === 'error'
                          }
                ];
            },
            closeAriaLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1 = { class: "p-message-wrapper" };
    const _hoisted_2 = { class: "p-message-text" };
    const _hoisted_3 = ["aria-label"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createBlock(vue.Transition, {
        name: "p-message",
        appear: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("div", {
            class: vue.normalizeClass($options.containerClass),
            role: "alert",
            "aria-live": "assertive",
            "aria-atomic": "true"
          }, [
            vue.createElementVNode("div", _hoisted_1, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass($options.iconClass)
              }, null, 2),
              vue.createElementVNode("div", _hoisted_2, [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              ($props.closable)
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                    key: 0,
                    class: "p-message-close p-link",
                    "aria-label": $options.closeAriaLabel,
                    type: "button",
                    onClick: _cache[0] || (_cache[0] = $event => ($options.close($event)))
                  }, $props.closeButtonProps), [
                    vue.createElementVNode("i", {
                      class: vue.normalizeClass(['p-message-close-icon', $props.closeIcon])
                    }, null, 2)
                  ], 16, _hoisted_3)), [
                    [_directive_ripple]
                  ])
                : vue.createCommentVNode("", true)
            ])
          ], 2), [
            [vue.vShow, $data.visible]
          ])
        ]),
        _: 3
      }))
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

    var css_248z = "\n.p-message-wrapper {\n    display: flex;\n    align-items: center;\n}\n.p-message-close {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-message-close.p-link {\n    margin-left: auto;\n    overflow: hidden;\n    position: relative;\n}\n.p-message-enter-from {\n    opacity: 0;\n}\n.p-message-enter-active {\n    transition: opacity 0.3s;\n}\n.p-message.p-message-leave-from {\n    max-height: 1000px;\n}\n.p-message.p-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin: 0 !important;\n}\n.p-message-leave-active {\n    overflow: hidden;\n    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.15s;\n}\n.p-message-leave-active .p-message-close {\n    display: none;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.ripple, Vue);
