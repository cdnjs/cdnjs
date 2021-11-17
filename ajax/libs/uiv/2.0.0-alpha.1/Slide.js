import { openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    const index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  data() {
    return {
      slideClass: {
        active: false,
        prev: false,
        next: false,
        left: false,
        right: false
      }
    };
  },
  created() {
    try {
      this.$parent.slides.push(this);
    } catch (e) {
      throw new Error("Slide parent must be Carousel.");
    }
  },
  beforeUnmount() {
    const slides = this.$parent && this.$parent.slides;
    spliceIfExist(slides, this);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["item", $data.slideClass])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Slide = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Slide as default };
