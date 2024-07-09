import Badge from 'primevue/badge';
import OverlayBadgeStyle from 'primevue/overlaybadge/style';
import { resolveComponent, openBlock, createElementBlock, mergeProps, renderSlot, createVNode } from 'vue';

var script$1 = {
  name: 'OverlayBadge',
  "extends": Badge,
  style: OverlayBadgeStyle,
  provide: function provide() {
    return {
      $pcOverlayBadge: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'OverlayBadge',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Badge = resolveComponent("Badge");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default"), createVNode(_component_Badge, mergeProps(_ctx.$props, {
    pt: _ctx.ptm('pcBadge')
  }), null, 16, ["pt"])], 16);
}

script.render = render;

export { script as default };
