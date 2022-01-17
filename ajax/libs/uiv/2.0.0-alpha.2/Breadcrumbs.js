var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, withCtx, Fragment, renderList, createTextVNode, toDisplayString } from "vue";
const linkProps = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  exact: { type: Boolean, default: false }
};
const _hoisted_1$1 = ["href", "target"];
const _sfc_main$1 = {
  props: __spreadProps(__spreadValues({}, linkProps), {
    active: { type: Boolean, default: false }
  }),
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      return openBlock(), createElementBlock("li", {
        class: normalizeClass({ active: __props.active })
      }, [
        __props.active ? renderSlot(_ctx.$slots, "default", { key: 0 }) : _ctx.to ? (openBlock(), createBlock(_component_RouterLink, {
          key: 1,
          to: _ctx.to,
          replace: _ctx.replace,
          append: _ctx.append,
          exact: _ctx.exact
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["to", "replace", "append", "exact"])) : (openBlock(), createElementBlock("a", {
          key: 2,
          href: _ctx.href,
          target: _ctx.target
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 8, _hoisted_1$1))
      ], 2);
    };
  }
};
const _hoisted_1 = { class: "breadcrumb" };
const _sfc_main = {
  props: {
    items: { type: Array, default: () => [] }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ol", _hoisted_1, [
        renderSlot(_ctx.$slots, "default"),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, index) => {
          var _a, _b;
          return openBlock(), createBlock(_sfc_main$1, {
            key: (_a = item.key) != null ? _a : index,
            active: (_b = item.active) != null ? _b : index === __props.items.length - 1,
            href: item.href,
            to: item.to,
            replace: item.replace,
            append: item.append,
            exact: item.exact
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(item.text), 1)
            ]),
            _: 2
          }, 1032, ["active", "href", "to", "replace", "append", "exact"]);
        }), 128))
      ]);
    };
  }
};
export { _sfc_main as default };
