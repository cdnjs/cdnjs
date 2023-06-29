import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, renderSlot, createCommentVNode, createElementVNode } from 'vue';

var script = {
    name: 'Card',
    extends: BaseComponent
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({ class: "p-card p-component" }, _ctx.ptm('root')), [
    (_ctx.$slots.header)
      ? (openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          class: "p-card-header"
        }, _ctx.ptm('header')), [
          renderSlot(_ctx.$slots, "header")
        ], 16))
      : createCommentVNode("", true),
    createElementVNode("div", mergeProps({ class: "p-card-body" }, _ctx.ptm('body')), [
      (_ctx.$slots.title)
        ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            class: "p-card-title"
          }, _ctx.ptm('title')), [
            renderSlot(_ctx.$slots, "title")
          ], 16))
        : createCommentVNode("", true),
      (_ctx.$slots.subtitle)
        ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            class: "p-card-subtitle"
          }, _ctx.ptm('subtitle')), [
            renderSlot(_ctx.$slots, "subtitle")
          ], 16))
        : createCommentVNode("", true),
      createElementVNode("div", mergeProps({ class: "p-card-content" }, _ctx.ptm('content')), [
        renderSlot(_ctx.$slots, "content")
      ], 16),
      (_ctx.$slots.footer)
        ? (openBlock(), createElementBlock("div", mergeProps({
            key: 2,
            class: "p-card-footer"
          }, _ctx.ptm('footer')), [
            renderSlot(_ctx.$slots, "footer")
          ], 16))
        : createCommentVNode("", true)
    ], 16)
  ], 16))
}

script.render = render;

export { script as default };
