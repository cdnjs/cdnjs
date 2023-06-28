import BaseComponent from 'primevue/basecomponent';
import MinusIcon from 'primevue/icons/minus';
import PlusIcon from 'primevue/icons/plus';
import Ripple from 'primevue/ripple';
import { UniqueComponentId } from 'primevue/utils';
import { resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, toDisplayString, createCommentVNode, withDirectives, createBlock, resolveDynamicComponent, createVNode, Transition, withCtx, vShow } from 'vue';

var script = {
    name: 'Fieldset',
    extends: BaseComponent,
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
        ariaId() {
            return UniqueComponentId();
        },
        buttonAriaLabel() {
            return this.toggleButtonProps && this.toggleButtonProps['aria-label'] ? this.toggleButtonProps['aria-label'] : this.legend;
        }
    },
    directives: {
        ripple: Ripple
    },
    components: {
        PlusIcon,
        MinusIcon
    }
};

const _hoisted_1 = ["id"];
const _hoisted_2 = ["id", "aria-controls", "aria-expanded", "aria-label"];
const _hoisted_3 = ["id", "aria-labelledby"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("fieldset", mergeProps({
    class: ['p-fieldset p-component', { 'p-fieldset-toggleable': $props.toggleable }]
  }, _ctx.ptm('root')), [
    createElementVNode("legend", mergeProps({ class: "p-fieldset-legend" }, _ctx.ptm('legend')), [
      (!$props.toggleable)
        ? renderSlot(_ctx.$slots, "legend", { key: 0 }, () => [
            createElementVNode("span", mergeProps({
              id: $options.ariaId + '_header',
              class: "p-fieldset-legend-text"
            }, _ctx.ptm('legendtitle')), toDisplayString($props.legend), 17, _hoisted_1)
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
          }, { ...$props.toggleButtonProps, ..._ctx.ptm('toggler') }), [
            renderSlot(_ctx.$slots, "togglericon", { collapsed: $data.d_collapsed }, () => [
              (openBlock(), createBlock(resolveDynamicComponent($data.d_collapsed ? 'PlusIcon' : 'MinusIcon'), mergeProps({ class: "p-fieldset-toggler" }, _ctx.ptm('togglericon')), null, 16))
            ]),
            renderSlot(_ctx.$slots, "legend", {}, () => [
              createElementVNode("span", mergeProps({ class: "p-fieldset-legend-text" }, _ctx.ptm('legendtitle')), toDisplayString($props.legend), 17)
            ])
          ], 16, _hoisted_2)), [
            [_directive_ripple]
          ])
        : createCommentVNode("", true)
    ], 16),
    createVNode(Transition, { name: "p-toggleable-content" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", mergeProps({
          id: $options.ariaId + '_content',
          class: "p-toggleable-content",
          role: "region",
          "aria-labelledby": $options.ariaId + '_header'
        }, _ctx.ptm('toggleablecontent')), [
          createElementVNode("div", mergeProps({ class: "p-fieldset-content" }, _ctx.ptm('content')), [
            renderSlot(_ctx.$slots, "default")
          ], 16)
        ], 16, _hoisted_3), [
          [vShow, !$data.d_collapsed]
        ])
      ]),
      _: 3
    })
  ], 16))
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
