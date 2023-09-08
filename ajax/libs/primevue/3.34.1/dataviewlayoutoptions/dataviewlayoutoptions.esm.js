import BarsIcon from 'primevue/icons/bars';
import ThLargeIcon from 'primevue/icons/thlarge';
import BaseComponent from 'primevue/basecomponent';
import { resolveComponent, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, createVNode, normalizeProps, guardReactiveProps } from 'vue';

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
  "extends": BaseComponent,
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
    BarsIcon: BarsIcon,
    ThLargeIcon: ThLargeIcon
  }
};

var _hoisted_1 = ["aria-label", "aria-pressed"];
var _hoisted_2 = ["aria-label", "aria-pressed"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_BarsIcon = resolveComponent("BarsIcon");
  var _component_ThLargeIcon = resolveComponent("ThLargeIcon");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    role: "group"
  }, _ctx.ptm('root')), [createElementVNode("button", mergeProps({
    "aria-label": $options.listViewAriaLabel,
    "class": _ctx.cx('listButton'),
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.changeLayout('list');
    }),
    type: "button",
    "aria-pressed": $data.isListButtonPressed
  }, _ctx.ptm('listButton')), [renderSlot(_ctx.$slots, "listicon", {}, function () {
    return [createVNode(_component_BarsIcon, normalizeProps(guardReactiveProps(_ctx.ptm('listIcon'))), null, 16)];
  })], 16, _hoisted_1), createElementVNode("button", mergeProps({
    "aria-label": $options.gridViewAriaLabel,
    "class": _ctx.cx('gridButton'),
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.changeLayout('grid');
    }),
    type: "button",
    "aria-pressed": $data.isGridButtonPressed
  }, _ctx.ptm('gridButton')), [renderSlot(_ctx.$slots, "gridicon", {}, function () {
    return [createVNode(_component_ThLargeIcon, normalizeProps(guardReactiveProps(_ctx.ptm('gridIcon'))), null, 16)];
  })], 16, _hoisted_2)], 16);
}

script.render = render;

export { script as default };
