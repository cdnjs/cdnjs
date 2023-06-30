this.primevue = this.primevue || {};
this.primevue.badge = (function (BaseComponent, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script = {
        name: 'Badge',
        extends: BaseComponent__default["default"],
        props: {
            value: {
                type: [String, Number],
                default: null
            },
            severity: {
                type: String,
                default: null
            },
            size: {
                type: String,
                default: null
            }
        },
        computed: {
            containerClass() {
                return this.$slots.default ? 'p-overlay-badge' : this.badgeClass;
            },
            badgeClass() {
                return [
                    'p-badge p-component',
                    {
                        'p-badge-no-gutter': utils.ObjectUtils.isNotEmpty(this.value) && String(this.value).length === 1,
                        'p-badge-dot': utils.ObjectUtils.isEmpty(this.value) && !this.$slots.default,
                        'p-badge-lg': this.size === 'large',
                        'p-badge-xl': this.size === 'xlarge',
                        'p-badge-info': this.severity === 'info',
                        'p-badge-success': this.severity === 'success',
                        'p-badge-warning': this.severity === 'warning',
                        'p-badge-danger': this.severity === 'danger'
                    }
                ];
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({ class: $options.badgeClass }, _ctx.ptm('root')), [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createTextVNode(vue.toDisplayString($props.value), 1)
        ])
      ], 16))
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.utils, Vue);
