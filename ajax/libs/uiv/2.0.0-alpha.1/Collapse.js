import { createVNode } from "vue";
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
const COLLAPSE = "collapse";
const IN = "in";
const COLLAPSING = "collapsing";
var _sfc_main = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    transition: {
      type: Number,
      default: 350
    }
  },
  emits: ["show", "shown", "hide", "hidden"],
  data() {
    return {
      timeoutId: 0
    };
  },
  watch: {
    modelValue(show) {
      this.toggle(show);
    }
  },
  mounted() {
    const el = this.$el;
    addClass(el, COLLAPSE);
    if (this.modelValue) {
      addClass(el, IN);
    }
  },
  methods: {
    toggle(show) {
      clearTimeout(this.timeoutId);
      const el = this.$el;
      if (show) {
        this.$emit("show");
        removeClass(el, COLLAPSE);
        el.style.height = "auto";
        const height = window.getComputedStyle(el).height;
        el.style.height = null;
        addClass(el, COLLAPSING);
        el.offsetHeight;
        el.style.height = height;
        this.timeoutId = setTimeout(() => {
          removeClass(el, COLLAPSING);
          addClass(el, COLLAPSE);
          addClass(el, IN);
          el.style.height = null;
          this.timeoutId = 0;
          this.$emit("shown");
        }, this.transition);
      } else {
        this.$emit("hide");
        el.style.height = window.getComputedStyle(el).height;
        removeClass(el, IN);
        removeClass(el, COLLAPSE);
        el.offsetHeight;
        el.style.height = null;
        addClass(el, COLLAPSING);
        this.timeoutId = setTimeout(() => {
          addClass(el, COLLAPSE);
          removeClass(el, COLLAPSING);
          el.style.height = null;
          this.timeoutId = 0;
          this.$emit("hidden");
        }, this.transition);
      }
    }
  },
  render() {
    const Tag = this.tag;
    return createVNode(Tag, null, {
      default: () => {
        var _a, _b;
        return [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)];
      }
    });
  }
};
export { _sfc_main as default };
