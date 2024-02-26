import BaseComponent from 'primevue/basecomponent';
import TagStyle from 'primevue/tag/style';
import { openBlock, createElementBlock, mergeProps, createBlock, resolveDynamicComponent, createCommentVNode, renderSlot, createElementVNode, toDisplayString } from 'vue';

var script$1 = {
  name: 'BaseTag',
  "extends": BaseComponent,
  props: {
    value: null,
    severity: null,
    rounded: Boolean,
    icon: String
  },
  style: TagStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Tag',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [_ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), mergeProps({
    key: 0,
    "class": _ctx.cx('icon')
  }, _ctx.ptm('icon')), null, 16, ["class"])) : _ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    "class": [_ctx.cx('icon'), _ctx.icon]
  }, _ctx.ptm('icon')), null, 16)) : createCommentVNode("", true), _ctx.value || _ctx.$slots["default"] ? renderSlot(_ctx.$slots, "default", {
    key: 2
  }, function () {
    return [createElementVNode("span", mergeProps({
      "class": _ctx.cx('value')
    }, _ctx.ptm('value')), toDisplayString(_ctx.value), 17)];
  }) : createCommentVNode("", true)], 16);
}

script.render = render;

export { script as default };
