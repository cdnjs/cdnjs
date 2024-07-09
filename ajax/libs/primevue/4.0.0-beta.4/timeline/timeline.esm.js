import { ObjectUtils } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import TimelineStyle from 'primevue/timeline/style';
import { openBlock, createElementBlock, mergeProps, Fragment, renderList, createElementVNode, renderSlot, createCommentVNode } from 'vue';

var script$1 = {
  name: 'BaseTimeline',
  "extends": BaseComponent,
  props: {
    value: null,
    align: {
      mode: String,
      "default": 'left'
    },
    layout: {
      mode: String,
      "default": 'vertical'
    },
    dataKey: null
  },
  style: TimelineStyle,
  provide: function provide() {
    return {
      $pcTimeline: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Timeline',
  "extends": script$1,
  inheritAttrs: false,
  methods: {
    getKey: function getKey(item, index) {
      return this.dataKey ? ObjectUtils.resolveFieldData(item, this.dataKey) : index;
    },
    getPTOptions: function getPTOptions(key, index) {
      return this.ptm(key, {
        context: {
          index: index,
          count: this.value.length
        }
      });
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.value, function (item, index) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: $options.getKey(item, index),
      "class": _ctx.cx('event'),
      ref_for: true
    }, $options.getPTOptions('event', index)), [createElementVNode("div", mergeProps({
      "class": _ctx.cx('eventOpposite', {
        index: index
      }),
      ref_for: true
    }, $options.getPTOptions('eventOpposite', index)), [renderSlot(_ctx.$slots, "opposite", {
      item: item,
      index: index
    })], 16), createElementVNode("div", mergeProps({
      "class": _ctx.cx('eventSeparator'),
      ref_for: true
    }, $options.getPTOptions('eventSeparator', index)), [renderSlot(_ctx.$slots, "marker", {
      item: item,
      index: index
    }, function () {
      return [createElementVNode("div", mergeProps({
        "class": _ctx.cx('eventMarker'),
        ref_for: true
      }, $options.getPTOptions('eventMarker', index)), null, 16)];
    }), index !== _ctx.value.length - 1 ? renderSlot(_ctx.$slots, "connector", {
      key: 0,
      item: item,
      index: index
    }, function () {
      return [createElementVNode("div", mergeProps({
        "class": _ctx.cx('eventConnector'),
        ref_for: true
      }, $options.getPTOptions('eventConnector', index)), null, 16)];
    }) : createCommentVNode("", true)], 16), createElementVNode("div", mergeProps({
      "class": _ctx.cx('eventContent'),
      ref_for: true
    }, $options.getPTOptions('eventContent', index)), [renderSlot(_ctx.$slots, "content", {
      item: item,
      index: index
    })], 16)], 16);
  }), 128))], 16);
}

script.render = render;

export { script as default };
