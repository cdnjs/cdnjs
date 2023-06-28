this.primevue = this.primevue || {};
this.primevue.splitterpanel = (function (BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script = {
        name: 'SplitterPanel',
        extends: BaseComponent__default["default"],
        props: {
            size: {
                type: Number,
                default: null
            },
            minSize: {
                type: Number,
                default: null
            }
        },
        computed: {
            containerClass() {
                return ['p-splitter-panel', { 'p-splitter-panel-nested': this.isNested }];
            },
            isNested() {
                return this.$slots.default().some((child) => {
                    return child.type.name === 'Splitter';
                });
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container",
        class: $options.containerClass
      }, _ctx.ptm('root')), [
        vue.renderSlot(_ctx.$slots, "default")
      ], 16))
    }

    script.render = render;

    return script;

})(primevue.basecomponent, Vue);
