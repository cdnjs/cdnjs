import { openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, Teleport, createCommentVNode } from "vue";
function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    const index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}
function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
}
function addClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  if (el.className) {
    const classes = el.className.split(" ");
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      el.className = classes.join(" ");
    }
  } else {
    el.className = className;
  }
}
function removeClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  if (el.className) {
    const classes = el.className.split(" ");
    const newClasses = [];
    for (let i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    el.className = newClasses.join(" ");
  }
}
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const ACTIVE_CLASS = "active";
const IN_CLASS = "in";
let id = 0;
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: "Tab Title"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tabClasses: {
      type: Object,
      default: () => {
        return {};
      }
    },
    group: { type: String, default: void 0 },
    pullRight: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: null,
      transition: 150,
      uid: `tab_${++id}`,
      isMounted: false
    };
  },
  watch: {
    active(active) {
      if (active) {
        setTimeout(() => {
          addClass(this.$el, ACTIVE_CLASS);
          this.$el.offsetHeight;
          addClass(this.$el, IN_CLASS);
          try {
            this.$parent.$emit("changed", this.$parent.activeIndex);
          } catch (e) {
            throw new Error("<tab> parent must be <tabs>.");
          }
        }, this.transition);
      } else {
        removeClass(this.$el, IN_CLASS);
        setTimeout(() => {
          removeClass(this.$el, ACTIVE_CLASS);
        }, this.transition);
      }
    }
  },
  created() {
    try {
      this.$parent.tabs.push(this);
    } catch (e) {
      throw new Error("<tab> parent must be <tabs>.");
    }
  },
  mounted() {
    this.isMounted = true;
  },
  beforeUnmount() {
    const tabs = this.$parent && this.$parent.tabs;
    spliceIfExist(tabs, this);
  },
  methods: {
    show() {
      this.$nextTick(() => {
        addClass(this.$el, ACTIVE_CLASS);
        addClass(this.$el, IN_CLASS);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["tab-pane", { fade: $data.transition > 0 }]),
    role: "tabpanel"
  }, [
    renderSlot(_ctx.$slots, "default"),
    $data.isMounted && _ctx.$slots.title ? (openBlock(), createBlock(Teleport, {
      key: 0,
      to: "#" + $data.uid.toString()
    }, [
      renderSlot(_ctx.$slots, "title")
    ], 8, ["to"])) : createCommentVNode("", true)
  ], 2);
}
var Tab = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Tab as default };
