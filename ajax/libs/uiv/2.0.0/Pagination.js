import { ref, computed, watch, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, withModifiers, createCommentVNode, Fragment, renderList, toDisplayString } from "vue";
function range(end, start = 0, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}
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
const _sfc_main = {
  props: {
    modelValue: { type: Number, required: true, validator: (v) => v >= 1 },
    boundaryLinks: { type: Boolean, default: false },
    directionLinks: { type: Boolean, default: true },
    size: { type: String, default: void 0 },
    align: { type: String, default: void 0 },
    totalPage: { type: Number, required: true, validator: (v) => v >= 0 },
    maxSize: { type: Number, default: 5, validator: (v) => v >= 0 },
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const sliceStart = ref(0);
    const navClasses = computed(() => ({
      [`text-${props.align}`]: !!props.align
    }));
    const classes = computed(() => ({
      [`pagination-${props.size}`]: !!props.size
    }));
    const sliceArray = computed(() => range(props.totalPage).slice(sliceStart.value, sliceStart.value + props.maxSize));
    watch(() => [props.modelValue, props.maxSize, props.totalPage], () => {
      calculateSliceStart();
    }, {
      immediate: true
    });
    function calculateSliceStart() {
      const currentPage = props.modelValue;
      const chunkSize = props.maxSize;
      const currentChunkStart = sliceStart.value;
      const currentChunkEnd = currentChunkStart + chunkSize;
      if (currentPage > currentChunkEnd) {
        const lastChunkStart = props.totalPage - chunkSize;
        if (currentPage > lastChunkStart) {
          sliceStart.value = lastChunkStart;
        } else {
          sliceStart.value = currentPage - 1;
        }
      } else if (currentPage < currentChunkStart + 1) {
        if (currentPage > chunkSize) {
          sliceStart.value = currentPage - chunkSize;
        } else {
          sliceStart.value = 0;
        }
      }
    }
    function onPageChange(page) {
      if (!props.disabled && page > 0 && page <= props.totalPage && page !== props.modelValue) {
        emit("update:modelValue", page);
        emit("change", page);
      }
    }
    function toPage(pre) {
      if (props.disabled) {
        return;
      }
      const chunkSize = props.maxSize;
      const currentChunkStart = sliceStart.value;
      const lastChunkStart = props.totalPage - chunkSize;
      const start = pre ? currentChunkStart - chunkSize : currentChunkStart + chunkSize;
      if (start < 0) {
        sliceStart.value = 0;
      } else if (start > lastChunkStart) {
        sliceStart.value = lastChunkStart;
      } else {
        sliceStart.value = start;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", {
        "aria-label": "Page navigation",
        class: normalizeClass(unref(navClasses))
      }, [
        createElementVNode("ul", {
          class: normalizeClass(["pagination", unref(classes)])
        }, [
          __props.boundaryLinks ? (openBlock(), createElementBlock("li", {
            key: 0,
            class: normalizeClass({ disabled: __props.modelValue <= 1 || __props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "First",
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => onPageChange(1), ["prevent"]))
            }, _hoisted_2)
          ], 2)) : createCommentVNode("", true),
          __props.directionLinks ? (openBlock(), createElementBlock("li", {
            key: 1,
            class: normalizeClass({ disabled: __props.modelValue <= 1 || __props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Previous",
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => onPageChange(__props.modelValue - 1), ["prevent"]))
            }, _hoisted_4)
          ], 2)) : createCommentVNode("", true),
          sliceStart.value > 0 ? (openBlock(), createElementBlock("li", {
            key: 2,
            class: normalizeClass({ disabled: __props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Previous group",
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => toPage(1), ["prevent"]))
            }, _hoisted_6)
          ], 2)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sliceArray), (item) => {
            return openBlock(), createElementBlock("li", {
              key: item,
              class: normalizeClass({ active: __props.modelValue === item + 1, disabled: __props.disabled })
            }, [
              createElementVNode("a", {
                href: "#",
                role: "button",
                onClick: withModifiers(($event) => onPageChange(item + 1), ["prevent"])
              }, toDisplayString(item + 1), 9, _hoisted_7)
            ], 2);
          }), 128)),
          sliceStart.value < __props.totalPage - __props.maxSize ? (openBlock(), createElementBlock("li", {
            key: 3,
            class: normalizeClass({ disabled: __props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Next group",
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => toPage(0), ["prevent"]))
            }, _hoisted_9)
          ], 2)) : createCommentVNode("", true),
          __props.directionLinks ? (openBlock(), createElementBlock("li", {
            key: 4,
            class: normalizeClass({ disabled: __props.modelValue >= __props.totalPage || __props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Next",
              onClick: _cache[4] || (_cache[4] = withModifiers(($event) => onPageChange(__props.modelValue + 1), ["prevent"]))
            }, _hoisted_11)
          ], 2)) : createCommentVNode("", true),
          __props.boundaryLinks ? (openBlock(), createElementBlock("li", {
            key: 5,
            class: normalizeClass({ disabled: __props.modelValue >= __props.totalPage || __props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Last",
              onClick: _cache[5] || (_cache[5] = withModifiers(($event) => onPageChange(__props.totalPage), ["prevent"]))
            }, _hoisted_13)
          ], 2)) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
};
export { _sfc_main as default };
