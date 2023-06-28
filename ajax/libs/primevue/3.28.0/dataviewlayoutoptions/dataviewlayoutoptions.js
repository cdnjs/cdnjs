this.primevue = this.primevue || {};
this.primevue.dataviewlayoutoptions = (function (BarsIcon, ThLargeIcon, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BarsIcon__default = /*#__PURE__*/_interopDefaultLegacy(BarsIcon);
    var ThLargeIcon__default = /*#__PURE__*/_interopDefaultLegacy(ThLargeIcon);

    var script = {
        name: 'DataViewLayoutOptions',
        emits: ['update:modelValue'],
        props: {
            modelValue: String
        },
        data() {
            return {
                isListButtonPressed: false,
                isGridButtonPressed: false
            };
        },
        methods: {
            changeLayout(layout) {
                this.$emit('update:modelValue', layout);

                if (layout === 'list') {
                    this.isListButtonPressed = true;
                    this.isGridButtonPressed = false;
                } else if (layout === 'grid') {
                    this.isGridButtonPressed = true;
                    this.isListButtonPressed = false;
                }
            }
        },
        computed: {
            buttonListClass() {
                return ['p-button p-button-icon-only', { 'p-highlight': this.modelValue === 'list' }];
            },
            buttonGridClass() {
                return ['p-button p-button-icon-only', { 'p-highlight': this.modelValue === 'grid' }];
            },
            listViewAriaLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listView : undefined;
            },
            gridViewAriaLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.gridView : undefined;
            }
        },
        components: {
            BarsIcon: BarsIcon__default["default"],
            ThLargeIcon: ThLargeIcon__default["default"]
        }
    };

    const _hoisted_1 = {
      class: "p-dataview-layout-options p-selectbutton p-buttonset",
      role: "group"
    };
    const _hoisted_2 = ["aria-label", "aria-pressed"];
    const _hoisted_3 = ["aria-label", "aria-pressed"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_BarsIcon = vue.resolveComponent("BarsIcon");
      const _component_ThLargeIcon = vue.resolveComponent("ThLargeIcon");

      return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode("button", {
          "aria-label": $options.listViewAriaLabel,
          class: vue.normalizeClass($options.buttonListClass),
          onClick: _cache[0] || (_cache[0] = $event => ($options.changeLayout('list'))),
          type: "button",
          "aria-pressed": $data.isListButtonPressed
        }, [
          vue.renderSlot(_ctx.$slots, "listicon", {}, () => [
            vue.createVNode(_component_BarsIcon)
          ])
        ], 10, _hoisted_2),
        vue.createElementVNode("button", {
          "aria-label": $options.gridViewAriaLabel,
          class: vue.normalizeClass($options.buttonGridClass),
          onClick: _cache[1] || (_cache[1] = $event => ($options.changeLayout('grid'))),
          type: "button",
          "aria-pressed": $data.isGridButtonPressed
        }, [
          vue.renderSlot(_ctx.$slots, "gridicon", {}, () => [
            vue.createVNode(_component_ThLargeIcon)
          ])
        ], 10, _hoisted_3)
      ]))
    }

    script.render = render;

    return script;

})(primevue.icons.bars, primevue.icons.thlarge, Vue);
