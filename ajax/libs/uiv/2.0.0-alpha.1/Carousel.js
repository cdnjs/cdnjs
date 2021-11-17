import { openBlock, createElementBlock, renderSlot, createElementVNode, Fragment, renderList, normalizeClass, createCommentVNode, withModifiers } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  props: {
    modelValue: {
      type: Number,
      default: void 0
    },
    indicators: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5e3
    },
    iconControlLeft: {
      type: String,
      default: "glyphicon glyphicon-chevron-left"
    },
    iconControlRight: {
      type: String,
      default: "glyphicon glyphicon-chevron-right"
    }
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      slides: [],
      activeIndex: 0,
      timeoutId: 0,
      intervalId: 0
    };
  },
  watch: {
    interval() {
      this.startInterval();
    },
    modelValue(index, oldValue) {
      this.run(index, oldValue);
      this.activeIndex = index;
    }
  },
  mounted() {
    if (isExist(this.modelValue)) {
      this.activeIndex = this.modelValue;
    }
    if (this.slides.length > 0) {
      this.$select(this.activeIndex);
    }
    this.startInterval();
  },
  beforeUnmount() {
    this.stopInterval();
  },
  methods: {
    run(newIndex, oldIndex) {
      const currentActiveIndex = oldIndex || 0;
      let direction;
      if (newIndex > currentActiveIndex) {
        direction = ["next", "left"];
      } else {
        direction = ["prev", "right"];
      }
      this.slides[newIndex].slideClass[direction[0]] = true;
      this.$nextTick(() => {
        this.slides[newIndex].$el.offsetHeight;
        this.slides.forEach((slide, i) => {
          if (i === currentActiveIndex) {
            slide.slideClass.active = true;
            slide.slideClass[direction[1]] = true;
          } else if (i === newIndex) {
            slide.slideClass[direction[1]] = true;
          }
        });
        this.timeoutId = setTimeout(() => {
          this.$select(newIndex);
          this.$emit("change", newIndex);
          this.timeoutId = 0;
        }, 600);
      });
    },
    startInterval() {
      this.stopInterval();
      if (this.interval > 0) {
        this.intervalId = setInterval(() => {
          this.next();
        }, this.interval);
      }
    },
    stopInterval() {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    },
    resetAllSlideClass() {
      this.slides.forEach((slide) => {
        slide.slideClass.active = false;
        slide.slideClass.left = false;
        slide.slideClass.right = false;
        slide.slideClass.next = false;
        slide.slideClass.prev = false;
      });
    },
    $select(index) {
      this.resetAllSlideClass();
      this.slides[index].slideClass.active = true;
    },
    select(index) {
      if (this.timeoutId !== 0 || index === this.activeIndex) {
        return;
      }
      if (isExist(this.modelValue)) {
        this.$emit("update:modelValue", index);
      } else {
        this.run(index, this.activeIndex);
        this.activeIndex = index;
      }
    },
    prev() {
      this.select(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1);
    },
    next() {
      this.select(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1);
    }
  }
};
const _hoisted_1 = { class: "carousel-indicators" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = {
  class: "carousel-inner",
  role: "listbox"
};
const _hoisted_4 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Previous", -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Next", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "carousel slide",
    "data-ride": "carousel",
    onMouseenter: _cache[2] || (_cache[2] = (...args) => $options.stopInterval && $options.stopInterval(...args)),
    onMouseleave: _cache[3] || (_cache[3] = (...args) => $options.startInterval && $options.startInterval(...args))
  }, [
    $props.indicators ? renderSlot(_ctx.$slots, "indicators", {
      key: 0,
      select: $options.select,
      activeIndex: $data.activeIndex
    }, () => [
      createElementVNode("ol", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.slides, (slide, index) => {
          return openBlock(), createElementBlock("li", {
            key: index,
            class: normalizeClass({ active: index === $data.activeIndex }),
            onClick: ($event) => $options.select(index)
          }, null, 10, _hoisted_2);
        }), 128))
      ])
    ]) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ]),
    $props.controls ? (openBlock(), createElementBlock("a", {
      key: 1,
      class: "left carousel-control",
      href: "#",
      role: "button",
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $options.prev(), ["prevent"]))
    }, [
      createElementVNode("span", {
        class: normalizeClass($props.iconControlLeft),
        "aria-hidden": "true"
      }, null, 2),
      _hoisted_4
    ])) : createCommentVNode("", true),
    $props.controls ? (openBlock(), createElementBlock("a", {
      key: 2,
      class: "right carousel-control",
      href: "#",
      role: "button",
      onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $options.next(), ["prevent"]))
    }, [
      createElementVNode("span", {
        class: normalizeClass($props.iconControlRight),
        "aria-hidden": "true"
      }, null, 2),
      _hoisted_5
    ])) : createCommentVNode("", true)
  ], 32);
}
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Carousel as default };
