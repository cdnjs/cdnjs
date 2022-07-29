import { openBlock as n, createElementBlock as p, normalizeClass as u, renderSlot as o, computed as r, resolveComponent as v, unref as a, createBlock as y, withCtx as b, createElementVNode as k, withModifiers as h } from "vue";
const B = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(l) {
    return (s, t) => (n(), p("div", {
      class: u({
        "btn-group": !l.vertical,
        "btn-group-vertical": l.vertical,
        "btn-group-justified": l.justified,
        [`btn-group-${l.size}`]: l.size
      }),
      role: "group",
      "data-toggle": "buttons"
    }, [
      o(s.$slots, "default")
    ], 2));
  }
}, V = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, C = ["href", "target"], $ = ["type", "checked", "disabled"], T = ["type", "disabled"], S = ["type", "disabled"], j = {
  __name: "Btn",
  props: {
    ...V,
    justified: { type: Boolean, default: !1 },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
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
    const t = l, f = r(
      () => t.inputType === "checkbox" ? t.modelValue.indexOf(t.inputValue) >= 0 : t.modelValue === t.inputValue
    ), d = r(() => ({
      btn: !0,
      active: t.inputType ? f.value : t.active,
      disabled: t.disabled,
      "btn-block": t.block,
      [`btn-${t.type}`]: !!t.type,
      [`btn-${t.size}`]: !!t.size
    }));
    function i(e) {
      t.disabled && e instanceof Event && (e.preventDefault(), e.stopPropagation());
    }
    function g() {
      if (t.inputType === "checkbox") {
        const e = t.modelValue.slice();
        f.value ? e.splice(e.indexOf(t.inputValue), 1) : e.push(t.inputValue), s("update:modelValue", e);
      } else
        s("update:modelValue", t.inputValue);
    }
    return (e, c) => {
      const m = v("RouterLink");
      return e.href ? (n(), p("a", {
        key: 0,
        href: e.href,
        target: e.target,
        role: "button",
        class: u(a(d)),
        onClick: i
      }, [
        o(e.$slots, "default")
      ], 10, C)) : e.to ? (n(), y(m, {
        key: 1,
        to: e.to,
        class: u(a(d)),
        event: l.disabled ? "" : "click",
        replace: e.replace,
        append: e.append,
        exact: e.exact,
        role: "button",
        onClick: i
      }, {
        default: b(() => [
          o(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : l.inputType ? (n(), p("label", {
        key: 2,
        class: u(a(d)),
        onClick: i
      }, [
        k("input", {
          autocomplete: "off",
          type: l.inputType,
          checked: a(f),
          disabled: l.disabled,
          onInput: c[0] || (c[0] = h(() => {
          }, ["stop"])),
          onChange: g
        }, null, 40, $),
        o(e.$slots, "default")
      ], 2)) : l.justified ? (n(), y(B, { key: 3 }, {
        default: b(() => [
          k("button", {
            class: u(a(d)),
            type: l.nativeType,
            disabled: l.disabled,
            onClick: i
          }, [
            o(e.$slots, "default")
          ], 10, T)
        ]),
        _: 3
      })) : (n(), p("button", {
        key: 4,
        class: u(a(d)),
        type: l.nativeType,
        disabled: l.disabled,
        onClick: i
      }, [
        o(e.$slots, "default")
      ], 10, S));
    };
  }
};
export {
  j as default
};
