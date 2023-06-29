import BaseComponent from 'primevue/basecomponent';
import SpinnerIcon from 'primevue/icons/spinner';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, renderSlot, normalizeClass, createBlock, createCommentVNode, createElementVNode, toDisplayString } from 'vue';

var script = {
    name: 'Button',
    extends: BaseComponent,
    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        iconPos: {
            type: String,
            default: 'left'
        },
        iconClass: {
            type: String,
            default: null
        },
        badge: {
            type: String,
            default: null
        },
        badgeClass: {
            type: String,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingIcon: {
            type: String,
            default: undefined
        },
        link: {
            type: Boolean,
            default: false
        },
        severity: {
            type: String,
            default: null
        },
        raised: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        },
        text: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null
        },
        plain: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        buttonClass() {
            return [
                'p-button p-component',
                {
                    'p-button-icon-only': this.hasIcon && !this.label,
                    'p-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
                    'p-disabled': this.$attrs.disabled || this.loading,
                    'p-button-loading': this.loading,
                    'p-button-loading-label-only': this.loading && !this.hasIcon && this.label,
                    'p-button-link': this.link,
                    [`p-button-${this.severity}`]: this.severity,
                    'p-button-raised': this.raised,
                    'p-button-rounded': this.rounded,
                    'p-button-text': this.text,
                    'p-button-outlined': this.outlined,
                    'p-button-sm': this.size === 'small',
                    'p-button-lg': this.size === 'large',
                    'p-button-plain': this.plain
                }
            ];
        },
        iconStyleClass() {
            return [
                'p-button-icon',
                this.iconClass,
                {
                    'p-button-icon-left': this.iconPos === 'left' && this.label,
                    'p-button-icon-right': this.iconPos === 'right' && this.label,
                    'p-button-icon-top': this.iconPos === 'top' && this.label,
                    'p-button-icon-bottom': this.iconPos === 'bottom' && this.label
                }
            ];
        },
        loadingIconStyleClass() {
            return ['p-button-loading-icon pi-spin', this.iconStyleClass];
        },
        badgeStyleClass() {
            return [
                'p-badge p-component',
                this.badgeClass,
                {
                    'p-badge-no-gutter': this.badge && String(this.badge).length === 1
                }
            ];
        },
        disabled() {
            return this.$attrs.disabled || this.loading;
        },
        defaultAriaLabel() {
            return this.label ? this.label + (this.badge ? ' ' + this.badge : '') : this.$attrs['aria-label'];
        },
        hasIcon() {
            return this.icon || this.$slots.icon;
        }
    },
    components: {
        SpinnerIcon
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = ["aria-label", "disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  const _directive_ripple = resolveDirective("ripple");

  return withDirectives((openBlock(), createElementBlock("button", mergeProps({
    class: $options.buttonClass,
    type: "button",
    "aria-label": $options.defaultAriaLabel,
    disabled: $options.disabled
  }, _ctx.ptm('root')), [
    renderSlot(_ctx.$slots, "default", {}, () => [
      ($props.loading)
        ? renderSlot(_ctx.$slots, "loadingicon", {
            key: 0,
            class: normalizeClass($options.loadingIconStyleClass)
          }, () => [
            ($props.loadingIcon)
              ? (openBlock(), createElementBlock("span", mergeProps({
                  key: 0,
                  class: [$options.loadingIconStyleClass, $props.loadingIcon]
                }, _ctx.ptm('loadingIcon')), null, 16))
              : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
                  key: 1,
                  class: $options.loadingIconStyleClass,
                  spin: ""
                }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))
          ])
        : renderSlot(_ctx.$slots, "icon", {
            key: 1,
            class: normalizeClass($options.iconStyleClass)
          }, () => [
            ($props.icon)
              ? (openBlock(), createElementBlock("span", mergeProps({
                  key: 0,
                  class: [$options.iconStyleClass, $props.icon]
                }, _ctx.ptm('icon')), null, 16))
              : createCommentVNode("", true)
          ]),
      createElementVNode("span", mergeProps({ class: "p-button-label" }, _ctx.ptm('label')), toDisplayString($props.label || ' '), 17),
      ($props.badge)
        ? (openBlock(), createElementBlock("span", mergeProps({
            key: 2,
            class: $options.badgeStyleClass
          }, _ctx.ptm('badge')), toDisplayString($props.badge), 17))
        : createCommentVNode("", true)
    ])
  ], 16, _hoisted_1)), [
    [_directive_ripple]
  ])
}

script.render = render;

export { script as default };
