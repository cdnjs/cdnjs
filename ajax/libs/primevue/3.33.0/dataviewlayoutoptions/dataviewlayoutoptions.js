this.primevue = this.primevue || {};
this.primevue.dataviewlayoutoptions = (function (BarsIcon, ThLargeIcon, BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BarsIcon__default = /*#__PURE__*/_interopDefaultLegacy(BarsIcon);
    var ThLargeIcon__default = /*#__PURE__*/_interopDefaultLegacy(ThLargeIcon);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var classes = {
      root: 'p-dataview-layout-options p-selectbutton p-buttonset',
      listButton: function listButton(_ref) {
        var props = _ref.props;
        return ['p-button p-button-icon-only', {
          'p-highlight': props.modelValue === 'list'
        }];
      },
      gridButton: function gridButton(_ref2) {
        var props = _ref2.props;
        return ['p-button p-button-icon-only', {
          'p-highlight': props.modelValue === 'grid'
        }];
      }
    };
    var script$1 = {
      name: 'BaseDataViewLayoutOptions',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: String
      },
      css: {
        classes: classes
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'DataViewLayoutOptions',
      "extends": script$1,
      emits: ['update:modelValue'],
      data: function data() {
        return {
          isListButtonPressed: false,
          isGridButtonPressed: false
        };
      },
      methods: {
        changeLayout: function changeLayout(layout) {
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
        listViewAriaLabel: function listViewAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listView : undefined;
        },
        gridViewAriaLabel: function gridViewAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.gridView : undefined;
        }
      },
      components: {
        BarsIcon: BarsIcon__default["default"],
        ThLargeIcon: ThLargeIcon__default["default"]
      }
    };

    var _hoisted_1 = ["aria-label", "aria-pressed"];
    var _hoisted_2 = ["aria-label", "aria-pressed"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_BarsIcon = vue.resolveComponent("BarsIcon");
      var _component_ThLargeIcon = vue.resolveComponent("ThLargeIcon");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        role: "group"
      }, _ctx.ptm('root')), [vue.createElementVNode("button", vue.mergeProps({
        "aria-label": $options.listViewAriaLabel,
        "class": _ctx.cx('listButton'),
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.changeLayout('list');
        }),
        type: "button",
        "aria-pressed": $data.isListButtonPressed
      }, _ctx.ptm('listButton')), [vue.renderSlot(_ctx.$slots, "listicon", {}, function () {
        return [vue.createVNode(_component_BarsIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('listIcon'))), null, 16)];
      })], 16, _hoisted_1), vue.createElementVNode("button", vue.mergeProps({
        "aria-label": $options.gridViewAriaLabel,
        "class": _ctx.cx('gridButton'),
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.changeLayout('grid');
        }),
        type: "button",
        "aria-pressed": $data.isGridButtonPressed
      }, _ctx.ptm('gridButton')), [vue.renderSlot(_ctx.$slots, "gridicon", {}, function () {
        return [vue.createVNode(_component_ThLargeIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('gridIcon'))), null, 16)];
      })], 16, _hoisted_2)], 16);
    }

    script.render = render;

    return script;

})(primevue.icons.bars, primevue.icons.thlarge, primevue.basecomponent, Vue);
