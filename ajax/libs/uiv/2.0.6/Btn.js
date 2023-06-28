import { openBlock as n, createElementBlock as f, normalizeClass as u, renderSlot as d, computed as r, unref as a, createBlock as y, resolveDynamicComponent as m, withCtx as b, createElementVNode as k, withModifiers as v } from "vue";
const h = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(l) {
    return (s, t) => (n(), f("div", {
      class: u({
        "btn-group": !l.vertical,
        "btn-group-vertical": l.vertical,
        "btn-group-justified": l.justified,
        [`btn-group-${l.size}`]: l.size
      }),
      role: "group",
      "data-toggle": "buttons"
    }, [
      d(s.$slots, "default")
    ], 2));
  }
}, B = {
  // <a> props
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  // <router-link> props
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, V = ["href", "target"], C = ["type", "checked", "disabled"], $ = ["type", "disabled"], T = ["type", "disabled"], z = {
  __name: "Btn",
  props: {
    ...B,
    justified: { type: Boolean, default: !1 },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    // <input> props
    modelValue: { type: null, default: null },
    inputValue: { type: null, default: null },
    inputType: {
      type: String,
      validator(l) {
        return l === "checkbox" || l === "radio";
      },
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  setup(l, { emit: s }) {
    const t = l, p = r(
      () => t.inputType === "checkbox" ? t.modelValue.indexOf(t.inputValue) >= 0 : t.modelValue === t.inputValue
    ), i = r(() => ({
      btn: !0,
      active: t.inputType ? p.value : t.active,
      disabled: t.disabled,
      "btn-block": t.block,
      [`btn-${t.type}`]: !!t.type,
      [`btn-${t.size}`]: !!t.size
    }));
    function o(e) {
      t.disabled && e instanceof Event && (e.preventDefault(), e.stopPropagation());
    }
    function g() {
      if (t.inputType === "checkbox") {
        const e = t.modelValue.slice();
        p.value ? e.splice(e.indexOf(t.inputValue), 1) : e.push(t.inputValue), s("update:modelValue", e);
      } else
        s("update:modelValue", t.inputValue);
    }
    return (e, c) => e.href ? (n(), f("a", {
      key: 0,
      href: e.href,
      target: e.target,
      role: "button",
      class: u(a(i)),
      onClick: o
    }, [
      d(e.$slots, "default")
    ], 10, V)) : e.to ? (n(), y(m("RouterLink"), {
      key: 1,
      to: e.to,
      class: u(a(i)),
      event: l.disabled ? "" : "click",
      replace: e.replace,
      append: e.append,
      exact: e.exact,
      role: "button",
      onClick: o
    }, {
      default: b(() => [
        d(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["to", "class", "event", "replace", "append", "exact"])) : l.inputType ? (n(), f("label", {
      key: 2,
      class: u(a(i)),
      onClick: o
    }, [
      k("input", {
        autocomplete: "off",
        type: l.inputType,
        checked: a(p),
        disabled: l.disabled,
        onInput: c[0] || (c[0] = v(() => {
        }, ["stop"])),
        onChange: g
      }, null, 40, C),
      d(e.$slots, "default")
    ], 2)) : l.justified ? (n(), y(h, { key: 3 }, {
      default: b(() => [
        k("button", {
          class: u(a(i)),
          type: l.nativeType,
          disabled: l.disabled,
          onClick: o
        }, [
          d(e.$slots, "default")
        ], 10, $)
      ]),
      _: 3
    })) : (n(), f("button", {
      key: 4,
      class: u(a(i)),
      type: l.nativeType,
      disabled: l.disabled,
      onClick: o
    }, [
      d(e.$slots, "default")
    ], 10, T));
  }
};
export {
  z as default
};
