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
import { openBlock, createElementBlock, normalizeClass, renderSlot, computed, resolveComponent, unref, createBlock, withCtx, createElementVNode, withModifiers } from "vue";
const _sfc_main$1 = {
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: false },
    justified: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "btn-group": !__props.vertical,
          "btn-group-vertical": __props.vertical,
          "btn-group-justified": __props.justified,
          [`btn-group-${__props.size}`]: __props.size
        }),
        role: "group",
        "data-toggle": "buttons"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
};
const linkProps = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  exact: { type: Boolean, default: false }
};
const _hoisted_1 = ["href", "target"];
const _hoisted_2 = ["type", "checked", "disabled"];
const _hoisted_3 = ["type", "disabled"];
const _hoisted_4 = ["type", "disabled"];
const _sfc_main = {
  props: __spreadProps(__spreadValues({}, linkProps), {
    justified: { type: Boolean, default: false },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    modelValue: { type: null, default: null },
    inputValue: { type: null, default: null },
    inputType: {
      type: String,
      validator(value) {
        return value === "checkbox" || value === "radio";
      },
      default: void 0
    }
  }),
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const isInputActive = computed(() => props.inputType === "checkbox" ? props.modelValue.indexOf(props.inputValue) >= 0 : props.modelValue === props.inputValue);
    const classes = computed(() => ({
      btn: true,
      active: props.inputType ? isInputActive.value : props.active,
      disabled: props.disabled,
      "btn-block": props.block,
      [`btn-${props.type}`]: !!props.type,
      [`btn-${props.size}`]: !!props.size
    }));
    function onClick(e) {
      if (props.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    function onInputChange() {
      if (props.inputType === "checkbox") {
        const valueCopied = props.modelValue.slice();
        if (isInputActive.value) {
          valueCopied.splice(valueCopied.indexOf(props.inputValue), 1);
        } else {
          valueCopied.push(props.inputValue);
        }
        emit("update:modelValue", valueCopied);
      } else {
        emit("update:modelValue", props.inputValue);
      }
    }
    return (_ctx, _cache) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      return _ctx.href ? (openBlock(), createElementBlock("a", {
        key: 0,
        href: _ctx.href,
        target: _ctx.target,
        role: "button",
        class: normalizeClass(unref(classes)),
        onClick
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1)) : _ctx.to ? (openBlock(), createBlock(_component_RouterLink, {
        key: 1,
        to: _ctx.to,
        class: normalizeClass(unref(classes)),
        event: __props.disabled ? "" : "click",
        replace: _ctx.replace,
        append: _ctx.append,
        exact: _ctx.exact,
        role: "button",
        onClick
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : __props.inputType ? (openBlock(), createElementBlock("label", {
        key: 2,
        class: normalizeClass(unref(classes)),
        onClick
      }, [
        createElementVNode("input", {
          autocomplete: "off",
          type: __props.inputType,
          checked: unref(isInputActive),
          disabled: __props.disabled,
          onInput: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"])),
          onChange: onInputChange
        }, null, 40, _hoisted_2),
        renderSlot(_ctx.$slots, "default")
      ], 2)) : __props.justified ? (openBlock(), createBlock(_sfc_main$1, { key: 3 }, {
        default: withCtx(() => [
          createElementVNode("button", {
            class: normalizeClass(unref(classes)),
            type: __props.nativeType,
            disabled: __props.disabled,
            onClick
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_3)
        ]),
        _: 3
      })) : (openBlock(), createElementBlock("button", {
        key: 4,
        class: normalizeClass(unref(classes)),
        type: __props.nativeType,
        disabled: __props.disabled,
        onClick
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_4));
    };
  }
};
export { _sfc_main as default };
