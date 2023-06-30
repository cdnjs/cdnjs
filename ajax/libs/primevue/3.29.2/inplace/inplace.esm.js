import BaseComponent from 'primevue/basecomponent';
import Button from 'primevue/button';
import FocusTrap from 'primevue/focustrap';
import TimesIcon from 'primevue/icons/times';
import { resolveComponent, resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, withKeys, renderSlot, createBlock, withCtx, resolveDynamicComponent, createCommentVNode } from 'vue';

var script = {
    name: 'Inplace',
    extends: BaseComponent,
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
            default: undefined
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
        IPButton: Button,
        TimesIcon
    },
    directives: {
        focustrap: FocusTrap
    }
};

const _hoisted_1 = ["tabindex"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IPButton = resolveComponent("IPButton");
  const _directive_focustrap = resolveDirective("focustrap");

  return withDirectives((openBlock(), createElementBlock("div", mergeProps({
    class: $options.containerClass,
    "aria-live": "polite"
  }, _ctx.ptm('root')), [
    (!$data.d_active)
      ? (openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          ref: "display",
          class: $options.displayClass,
          tabindex: _ctx.$attrs.tabindex || '0',
          role: "button",
          onClick: _cache[0] || (_cache[0] = (...args) => ($options.open && $options.open(...args))),
          onKeydown: _cache[1] || (_cache[1] = withKeys((...args) => ($options.open && $options.open(...args)), ["enter"]))
        }, { ...$props.displayProps, ..._ctx.ptm('display') }), [
          renderSlot(_ctx.$slots, "display")
        ], 16, _hoisted_1))
      : (openBlock(), createElementBlock("div", mergeProps({
          key: 1,
          class: "p-inplace-content"
        }, _ctx.ptm('content')), [
          renderSlot(_ctx.$slots, "content"),
          ($props.closable)
            ? (openBlock(), createBlock(_component_IPButton, mergeProps({
                key: 0,
                "aria-label": $options.closeAriaLabel,
                onClick: $options.close,
                pt: _ctx.ptm('closeButton')
              }, $props.closeButtonProps), {
                icon: withCtx(() => [
                  renderSlot(_ctx.$slots, "closeicon", {}, () => [
                    (openBlock(), createBlock(resolveDynamicComponent($props.closeIcon ? 'span' : 'TimesIcon'), mergeProps({ class: $props.closeIcon }, _ctx.ptm('closeButton')['icon']), null, 16, ["class"]))
                  ])
                ]),
                _: 3
              }, 16, ["aria-label", "onClick", "pt"]))
            : createCommentVNode("", true)
        ], 16))
  ], 16)), [
    [_directive_focustrap]
  ])
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

export { script as default };
