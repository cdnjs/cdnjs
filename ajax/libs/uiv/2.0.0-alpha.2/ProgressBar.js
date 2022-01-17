var __defProp = Object.defineProperty;
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
import { openBlock, createElementBlock, normalizeClass, normalizeStyle, toDisplayString, renderSlot, createBlock, normalizeProps, mergeProps } from "vue";
const progressBarProps = {
  modelValue: {
    type: Number,
    required: true,
    validator(value) {
      return value >= 0 && value <= 100;
    }
  },
  labelText: { type: String, default: void 0 },
  type: { type: String, default: void 0 },
  label: { type: Boolean, default: false },
  minWidth: { type: Boolean, default: false },
  striped: { type: Boolean, default: false },
  active: { type: Boolean, default: false }
};
const _hoisted_1$1 = ["aria-valuenow"];
const _sfc_main$1 = {
  props: __spreadValues({}, progressBarProps),
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "progress-bar": true,
          "progress-bar-striped": _ctx.striped,
          active: _ctx.striped && _ctx.active,
          [`progress-bar-${_ctx.type}`]: !!_ctx.type
        }),
        style: normalizeStyle({
          minWidth: _ctx.minWidth ? "2em" : null,
          width: `${_ctx.modelValue}%`
        }),
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuenow": _ctx.modelValue,
        "aria-valuemax": "100"
      }, toDisplayString(_ctx.label ? _ctx.labelText ? _ctx.labelText : `${_ctx.modelValue}%` : null), 15, _hoisted_1$1);
    };
  }
};
const _hoisted_1 = { class: "progress" };
const _sfc_main = {
  props: __spreadValues({}, progressBarProps),
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(_sfc_main$1, normalizeProps(mergeProps({ key: 1 }, _ctx.$props)), null, 16))
      ]);
    };
  }
};
export { _sfc_main as default };
