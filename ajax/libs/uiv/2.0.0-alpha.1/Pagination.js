import { openBlock, createElementBlock, normalizeClass, createElementVNode, withModifiers, createCommentVNode, Fragment, renderList, toDisplayString } from "vue";
function range(end, start = 0, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
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
      required: true,
      validator: (v) => v >= 1
    },
    boundaryLinks: {
      type: Boolean,
      default: false
    },
    directionLinks: {
      type: Boolean,
      default: true
    },
    size: { type: String, default: void 0 },
    align: { type: String, default: void 0 },
    totalPage: {
      type: Number,
      required: true,
      validator: (v) => v >= 0
    },
    maxSize: {
      type: Number,
      default: 5,
      validator: (v) => v >= 0
    },
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      sliceStart: 0
    };
  },
  computed: {
    navClasses() {
      return {
        [`text-${this.align}`]: Boolean(this.align)
      };
    },
    classes() {
      return {
        [`pagination-${this.size}`]: Boolean(this.size)
      };
    },
    sliceArray() {
      return range(this.totalPage).slice(this.sliceStart, this.sliceStart + this.maxSize);
    }
  },
  created() {
    this.$watch((vm) => [vm.modelValue, vm.maxSize, vm.totalPage].join(), this.calculateSliceStart, {
      immediate: true
    });
  },
  methods: {
    calculateSliceStart() {
      const currentPage = this.modelValue;
      const chunkSize = this.maxSize;
      const currentChunkStart = this.sliceStart;
      const currentChunkEnd = currentChunkStart + chunkSize;
      if (currentPage > currentChunkEnd) {
        const lastChunkStart = this.totalPage - chunkSize;
        if (currentPage > lastChunkStart) {
          this.sliceStart = lastChunkStart;
        } else {
          this.sliceStart = currentPage - 1;
        }
      } else if (currentPage < currentChunkStart + 1) {
        if (currentPage > chunkSize) {
          this.sliceStart = currentPage - chunkSize;
        } else {
          this.sliceStart = 0;
        }
      }
    },
    onPageChange(page) {
      if (!this.disabled && page > 0 && page <= this.totalPage && page !== this.modelValue) {
        this.$emit("update:modelValue", page);
        this.$emit("change", page);
      }
    },
    toPage(pre) {
      if (this.disabled) {
        return;
      }
      const chunkSize = this.maxSize;
      const currentChunkStart = this.sliceStart;
      const lastChunkStart = this.totalPage - chunkSize;
      const start = pre ? currentChunkStart - chunkSize : currentChunkStart + chunkSize;
      if (start < 0) {
        this.sliceStart = 0;
      } else if (start > lastChunkStart) {
        this.sliceStart = lastChunkStart;
      } else {
        this.sliceStart = start;
      }
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xAB", -1);
const _hoisted_2 = [
  _hoisted_1
];
const _hoisted_3 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u2039", -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u2026", -1);
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = ["onClick"];
const _hoisted_8 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u2026", -1);
const _hoisted_9 = [
  _hoisted_8
];
const _hoisted_10 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\u203A", -1);
const _hoisted_11 = [
  _hoisted_10
];
const _hoisted_12 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xBB", -1);
const _hoisted_13 = [
  _hoisted_12
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("nav", {
    "aria-label": "Page navigation",
    class: normalizeClass($options.navClasses)
  }, [
    createElementVNode("ul", {
      class: normalizeClass(["pagination", $options.classes])
    }, [
      $props.boundaryLinks ? (openBlock(), createElementBlock("li", {
        key: 0,
        class: normalizeClass({ disabled: $props.modelValue <= 1 || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "First",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $options.onPageChange(1), ["prevent"]))
        }, _hoisted_2)
      ], 2)) : createCommentVNode("", true),
      $props.directionLinks ? (openBlock(), createElementBlock("li", {
        key: 1,
        class: normalizeClass({ disabled: $props.modelValue <= 1 || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Previous",
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $options.onPageChange($props.modelValue - 1), ["prevent"]))
        }, _hoisted_4)
      ], 2)) : createCommentVNode("", true),
      $data.sliceStart > 0 ? (openBlock(), createElementBlock("li", {
        key: 2,
        class: normalizeClass({ disabled: $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Previous group",
          onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $options.toPage(1), ["prevent"]))
        }, _hoisted_6)
      ], 2)) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.sliceArray, (item) => {
        return openBlock(), createElementBlock("li", {
          key: item,
          class: normalizeClass({ active: $props.modelValue === item + 1, disabled: $props.disabled })
        }, [
          createElementVNode("a", {
            href: "#",
            role: "button",
            onClick: withModifiers(($event) => $options.onPageChange(item + 1), ["prevent"])
          }, toDisplayString(item + 1), 9, _hoisted_7)
        ], 2);
      }), 128)),
      $data.sliceStart < $props.totalPage - $props.maxSize ? (openBlock(), createElementBlock("li", {
        key: 3,
        class: normalizeClass({ disabled: $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Next group",
          onClick: _cache[3] || (_cache[3] = withModifiers(($event) => $options.toPage(0), ["prevent"]))
        }, _hoisted_9)
      ], 2)) : createCommentVNode("", true),
      $props.directionLinks ? (openBlock(), createElementBlock("li", {
        key: 4,
        class: normalizeClass({ disabled: $props.modelValue >= $props.totalPage || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Next",
          onClick: _cache[4] || (_cache[4] = withModifiers(($event) => $options.onPageChange(_ctx.value + 1), ["prevent"]))
        }, _hoisted_11)
      ], 2)) : createCommentVNode("", true),
      $props.boundaryLinks ? (openBlock(), createElementBlock("li", {
        key: 5,
        class: normalizeClass({ disabled: $props.modelValue >= $props.totalPage || $props.disabled })
      }, [
        createElementVNode("a", {
          href: "#",
          role: "button",
          "aria-label": "Last",
          onClick: _cache[5] || (_cache[5] = withModifiers(($event) => $options.onPageChange($props.totalPage), ["prevent"]))
        }, _hoisted_13)
      ], 2)) : createCommentVNode("", true)
    ], 2)
  ], 2);
}
var Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Pagination as default };
