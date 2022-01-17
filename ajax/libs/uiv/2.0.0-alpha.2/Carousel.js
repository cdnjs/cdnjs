import { ref, reactive, watch, onMounted, onBeforeUnmount, openBlock, createElementBlock, renderSlot, unref, createElementVNode, Fragment, renderList, normalizeClass, createCommentVNode, withModifiers, nextTick } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
const _hoisted_1 = { class: "carousel-indicators" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = {
  class: "carousel-inner",
  role: "listbox"
};
const _hoisted_4 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Previous", -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Next", -1);
const _sfc_main = {
  props: {
    modelValue: { type: Number, default: void 0 },
    indicators: { type: Boolean, default: true },
    controls: { type: Boolean, default: true },
    interval: { type: Number, default: 5e3 },
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
  setup(__props, { expose, emit }) {
    const props = __props;
    let activeIndex = ref(0);
    let timeoutId = 0;
    let intervalId = 0;
    const slides = reactive([]);
    function run(newIndex, oldIndex) {
      const currentActiveIndex = oldIndex || 0;
      let direction;
      if (newIndex > currentActiveIndex) {
        direction = ["next", "left"];
      } else {
        direction = ["prev", "right"];
      }
      slides[newIndex].exposed.slideClass[direction[0]] = true;
      nextTick(() => {
        slides[newIndex].vnode.el.offsetHeight;
        slides.forEach((slide, i) => {
          if (i === currentActiveIndex) {
            slide.exposed.slideClass.active = true;
            slide.exposed.slideClass[direction[1]] = true;
          } else if (i === newIndex) {
            slide.exposed.slideClass[direction[1]] = true;
          }
        });
        timeoutId = setTimeout(() => {
          _select(newIndex);
          emit("change", newIndex);
          timeoutId = 0;
        }, 600);
      });
    }
    function startInterval() {
      stopInterval();
      if (props.interval > 0) {
        intervalId = setInterval(() => {
          next();
        }, props.interval);
      }
    }
    function stopInterval() {
      clearInterval(intervalId);
      intervalId = 0;
    }
    function resetAllSlideClass() {
      slides.forEach((slide) => {
        slide.exposed.slideClass.active = false;
        slide.exposed.slideClass.left = false;
        slide.exposed.slideClass.right = false;
        slide.exposed.slideClass.next = false;
        slide.exposed.slideClass.prev = false;
      });
    }
    function _select(index) {
      resetAllSlideClass();
      slides[index].exposed.slideClass.active = true;
    }
    function select(index) {
      if (timeoutId !== 0 || index === activeIndex.value) {
        return;
      }
      if (isExist(props.modelValue)) {
        emit("update:modelValue", index);
      } else {
        run(index, activeIndex.value);
        activeIndex.value = index;
      }
    }
    function prev() {
      select(activeIndex.value === 0 ? slides.length - 1 : activeIndex.value - 1);
    }
    function next() {
      select(activeIndex.value === slides.length - 1 ? 0 : activeIndex.value + 1);
    }
    watch(() => props.interval, () => {
      startInterval();
    });
    watch(() => props.modelValue, (index, oldValue) => {
      run(index, oldValue);
      activeIndex.value = index;
    });
    onMounted(() => {
      if (isExist(props.modelValue)) {
        activeIndex.value = props.modelValue;
      }
      if (slides.length > 0) {
        _select(activeIndex.value);
      }
      startInterval();
    });
    onBeforeUnmount(() => {
      stopInterval();
    });
    expose({
      slides
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "carousel slide",
        "data-ride": "carousel",
        onMouseenter: stopInterval,
        onMouseleave: startInterval
      }, [
        __props.indicators ? renderSlot(_ctx.$slots, "indicators", {
          key: 0,
          select,
          activeIndex: unref(activeIndex)
        }, () => [
          createElementVNode("ol", _hoisted_1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(slides), (slide, index) => {
              return openBlock(), createElementBlock("li", {
                key: index,
                class: normalizeClass({ active: index === unref(activeIndex) }),
                onClick: ($event) => select(index)
              }, null, 10, _hoisted_2);
            }), 128))
          ])
        ]) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "default")
        ]),
        __props.controls ? (openBlock(), createElementBlock("a", {
          key: 1,
          class: "left carousel-control",
          href: "#",
          role: "button",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => prev(), ["prevent"]))
        }, [
          createElementVNode("span", {
            class: normalizeClass(__props.iconControlLeft),
            "aria-hidden": "true"
          }, null, 2),
          _hoisted_4
        ])) : createCommentVNode("", true),
        __props.controls ? (openBlock(), createElementBlock("a", {
          key: 2,
          class: "right carousel-control",
          href: "#",
          role: "button",
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => next(), ["prevent"]))
        }, [
          createElementVNode("span", {
            class: normalizeClass(__props.iconControlRight),
            "aria-hidden": "true"
          }, null, 2),
          _hoisted_5
        ])) : createCommentVNode("", true)
      ], 32);
    };
  }
};
export { _sfc_main as default };
