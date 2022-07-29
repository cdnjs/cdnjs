import { openBlock as l, createElementBlock as f, normalizeClass as p, renderSlot as c, createBlock as h, Teleport as $, createCommentVNode as b } from "vue";
function m(t, e) {
  if (Array.isArray(t)) {
    const s = t.indexOf(e);
    s >= 0 && t.splice(s, 1);
  }
}
function d(t) {
  return t && t.nodeType === Node.ELEMENT_NODE;
}
function i(t, e) {
  !d(t) || t.classList.add(e);
}
function u(t, e) {
  !d(t) || t.classList.remove(e);
}
const y = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, n] of e)
    s[r] = n;
  return s;
}, o = "active", a = "in";
let _ = 0;
const E = {
  props: {
    title: {
      type: String,
      default: "Tab Title"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    tabClasses: {
      type: Object,
      default: () => ({})
    },
    group: { type: String, default: void 0 },
    pullRight: {
      type: Boolean,
      default: !1
    },
    hidden: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      active: null,
      transition: 150,
      uid: `tab_${++_}`,
      isMounted: !1
    };
  },
  watch: {
    active(t) {
      t ? setTimeout(() => {
        i(this.$el, o), this.$el.offsetHeight, i(this.$el, a);
        try {
          this.$parent.$emit("changed", this.$parent.activeIndex);
        } catch {
          throw new Error("<tab> parent must be <tabs>.");
        }
      }, this.transition) : (u(this.$el, a), setTimeout(() => {
        u(this.$el, o);
      }, this.transition));
    }
  },
  created() {
    try {
      this.$parent.tabs.push(this);
    } catch {
      throw new Error("<tab> parent must be <tabs>.");
    }
  },
  mounted() {
    this.isMounted = !0;
  },
  beforeUnmount() {
    const t = this.$parent && this.$parent.tabs;
    m(t, this);
  },
  methods: {
    show() {
      this.$nextTick(() => {
        i(this.$el, o), i(this.$el, a);
      });
    }
  }
};
function T(t, e, s, r, n, v) {
  return l(), f("div", {
    class: p(["tab-pane", { fade: n.transition > 0 }]),
    role: "tabpanel"
  }, [
    c(t.$slots, "default"),
    n.isMounted && t.$slots.title ? (l(), h($, {
      key: 0,
      to: "#" + n.uid.toString()
    }, [
      c(t.$slots, "title")
    ], 8, ["to"])) : b("", !0)
  ], 2);
}
const C = /* @__PURE__ */ y(E, [["render", T]]);
export {
  C as default
};
