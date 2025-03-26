'use strict';

var BaseComponent = require('primevue/basecomponent');
var CardStyle = require('primevue/card/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var CardStyle__default = /*#__PURE__*/_interopDefaultLegacy(CardStyle);

var script$1 = {
  name: 'BaseCard',
  "extends": BaseComponent__default["default"],
  style: CardStyle__default["default"]
};

var script = {
  name: 'Card',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [_ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header")], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('body')
  }, _ctx.ptm('body')), [_ctx.$slots.title || _ctx.$slots.subtitle ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('caption')
  }, _ctx.ptm('caption')), [_ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('title')
  }, _ctx.ptm('title')), [vue.renderSlot(_ctx.$slots, "title")], 16)) : vue.createCommentVNode("", true), _ctx.$slots.subtitle ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('subtitle')
  }, _ctx.ptm('subtitle')), [vue.renderSlot(_ctx.$slots, "subtitle")], 16)) : vue.createCommentVNode("", true)], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('content')
  }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "content")], 16), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('footer')
  }, _ctx.ptm('footer')), [vue.renderSlot(_ctx.$slots, "footer")], 16)) : vue.createCommentVNode("", true)], 16)], 16);
}

script.render = render;

module.exports = script;
