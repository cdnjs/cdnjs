import Ripple from 'primevue/ripple';
import { resolveDirective, withDirectives, openBlock, createElementBlock, normalizeClass, renderSlot, createCommentVNode, createElementVNode, toDisplayString } from 'vue';

var script = {
    name: 'Button',
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
            default: 'pi pi-spinner pi-spin'
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
                    'p-button-icon-only': this.icon && !this.label,
                    'p-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
                    'p-disabled': this.$attrs.disabled || this.loading,
                    'p-button-loading': this.loading,
                    'p-button-loading-label-only': this.loading && !this.icon && this.label,
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
                this.loading ? 'p-button-loading-icon ' + this.loadingIcon : this.icon,
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
        }
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = ["aria-label", "disabled"];
const _hoisted_2 = { class: "p-button-label" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");

  return withDirectives((openBlock(), createElementBlock("button", {
    class: normalizeClass($options.buttonClass),
    type: "button",
    "aria-label": $options.defaultAriaLabel,
    disabled: $options.disabled
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      ($props.loading && !$props.icon)
        ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass($options.iconStyleClass)
          }, null, 2))
        : createCommentVNode("", true),
      ($props.icon)
        ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: normalizeClass($options.iconStyleClass)
          }, null, 2))
        : createCommentVNode("", true),
      createElementVNode("span", _hoisted_2, toDisplayString($props.label || ' '), 1),
      ($props.badge)
        ? (openBlock(), createElementBlock("span", {
            key: 2,
            class: normalizeClass($options.badgeStyleClass)
          }, toDisplayString($props.badge), 3))
        : createCommentVNode("", true)
    ])
  ], 10, _hoisted_1)), [
    [_directive_ripple]
  ])
}

script.render = render;

export { script as default };
