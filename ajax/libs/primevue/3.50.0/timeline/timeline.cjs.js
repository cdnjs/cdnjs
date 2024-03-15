'use strict';

var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var TimelineStyle = require('primevue/timeline/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TimelineStyle__default = /*#__PURE__*/_interopDefaultLegacy(TimelineStyle);

var script$1 = {
  name: 'BaseTimeline',
  "extends": BaseComponent__default["default"],
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
  style: TimelineStyle__default["default"],
  provide: function provide() {
    return {
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
      return this.dataKey ? utils.ObjectUtils.resolveFieldData(item, this.dataKey) : index;
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
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.value, function (item, index) {
    return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: $options.getKey(item, index),
      "class": _ctx.cx('event')
    }, $options.getPTOptions('event', index)), [vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('opposite', {
        index: index
      })
    }, $options.getPTOptions('opposite', index)), [vue.renderSlot(_ctx.$slots, "opposite", {
      item: item,
      index: index
    })], 16), vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('separator')
    }, $options.getPTOptions('separator', index)), [vue.renderSlot(_ctx.$slots, "marker", {
      item: item,
      index: index
    }, function () {
      return [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('marker')
      }, $options.getPTOptions('marker', index)), null, 16)];
    }), index !== _ctx.value.length - 1 ? vue.renderSlot(_ctx.$slots, "connector", {
      key: 0,
      item: item,
      index: index
    }, function () {
      return [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('connector')
      }, $options.getPTOptions('connector', index)), null, 16)];
    }) : vue.createCommentVNode("", true)], 16), vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('content')
    }, $options.getPTOptions('content', index)), [vue.renderSlot(_ctx.$slots, "content", {
      item: item,
      index: index
    })], 16)], 16);
  }), 128))], 16);
}

script.render = render;

module.exports = script;
