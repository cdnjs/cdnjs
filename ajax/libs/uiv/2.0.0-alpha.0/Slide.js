import { openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';

function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}

var script = {
  data: function data() {
    return {
      slideClass: {
        active: false,
        prev: false,
        next: false,
        left: false,
        right: false,
      },
    }
  },
  created: function created() {
    try {
      this.$parent.slides.push(this);
    } catch (e) {
      throw new Error('Slide parent must be Carousel.')
    }
  },
  beforeUnmount: function beforeUnmount() {
    var slides = this.$parent && this.$parent.slides;
    spliceIfExist(slides, this);
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["item", $data.slideClass])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/carousel/Slide.vue";

export { script as default };
//# sourceMappingURL=Slide.js.map
