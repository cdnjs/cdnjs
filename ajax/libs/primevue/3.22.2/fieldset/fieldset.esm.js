import Ripple from 'primevue/ripple';
import { UniqueComponentId } from 'primevue/utils';
import { resolveDirective, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, toDisplayString, createCommentVNode, withDirectives, mergeProps, createVNode, Transition, withCtx, vShow } from 'vue';

var script = {
    name: 'Fieldset',
    emits: ['update:collapsed', 'toggle'],
    props: {
        legend: String,
        toggleable: Boolean,
        collapsed: Boolean,
        toggleButtonProps: {
            type: null,
            default: null
        }
    },
    data() {
        return {
            d_collapsed: this.collapsed
        };
    },
    watch: {
        collapsed(newValue) {
            this.d_collapsed = newValue;
        }
    },
    methods: {
        toggle(event) {
            this.d_collapsed = !this.d_collapsed;
            this.$emit('update:collapsed', this.d_collapsed);
            this.$emit('toggle', {
                originalEvent: event,
                value: this.d_collapsed
            });
        },
        onKeyDown(event) {
            if (event.code === 'Enter' || event.code === 'Space') {
                this.toggle(event);
                event.preventDefault();
            }
        }
    },
    computed: {
        iconClass() {
            return [
                'p-fieldset-toggler pi ',
                {
                    'pi-minus': !this.d_collapsed,
                    'pi-plus': this.d_collapsed
                }
            ];
        },
        ariaId() {
            return UniqueComponentId();
        },
        buttonAriaLabel() {
            return this.toggleButtonProps && this.toggleButtonProps['aria-label'] ? this.toggleButtonProps['aria-label'] : this.legend;
        }
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = { class: "p-fieldset-legend" };
const _hoisted_2 = ["id"];
const _hoisted_3 = ["id", "aria-controls", "aria-expanded", "aria-label"];
const _hoisted_4 = { class: "p-fieldset-legend-text" };
const _hoisted_5 = ["id", "aria-labelledby"];
const _hoisted_6 = { class: "p-fieldset-content" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("fieldset", {
    class: normalizeClass(['p-fieldset p-component', { 'p-fieldset-toggleable': $props.toggleable }])
  }, [
    createElementVNode("legend", _hoisted_1, [
      (!$props.toggleable)
        ? renderSlot(_ctx.$slots, "legend", { key: 0 }, () => [
            createElementVNode("span", {
              id: $options.ariaId + '_header',
              class: "p-fieldset-legend-text"
            }, toDisplayString($props.legend), 9, _hoisted_2)
          ])
        : createCommentVNode("", true),
      ($props.toggleable)
        ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
            key: 1,
            id: $options.ariaId + '_header',
            tabindex: "0",
            role: "button",
            "aria-controls": $options.ariaId + '_content',
            "aria-expanded": !$data.d_collapsed,
            "aria-label": $options.buttonAriaLabel,
            onClick: _cache[0] || (_cache[0] = (...args) => ($options.toggle && $options.toggle(...args))),
            onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args)))
          }, $props.toggleButtonProps), [
            createElementVNode("span", {
              class: normalizeClass($options.iconClass)
            }, null, 2),
            renderSlot(_ctx.$slots, "legend", {}, () => [
              createElementVNode("span", _hoisted_4, toDisplayString($props.legend), 1)
            ])
          ], 16, _hoisted_3)), [
            [_directive_ripple]
          ])
        : createCommentVNode("", true)
    ]),
    createVNode(Transition, { name: "p-toggleable-content" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          id: $options.ariaId + '_content',
          class: "p-toggleable-content",
          role: "region",
          "aria-labelledby": $options.ariaId + '_header'
        }, [
          createElementVNode("div", _hoisted_6, [
            renderSlot(_ctx.$slots, "default")
          ])
        ], 8, _hoisted_5), [
          [vShow, !$data.d_collapsed]
        ])
      ]),
      _: 3
    })
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

var css_248z = "\n.p-fieldset-legend > a,\n.p-fieldset-legend > span {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-fieldset-toggleable .p-fieldset-legend a {\n    cursor: pointer;\n    user-select: none;\n    overflow: hidden;\n    position: relative;\n    text-decoration: none;\n}\n.p-fieldset-legend-text {\n    line-height: 1;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
