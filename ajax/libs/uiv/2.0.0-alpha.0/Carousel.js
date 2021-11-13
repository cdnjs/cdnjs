import { openBlock, createElementBlock, renderSlot, createElementVNode, Fragment, renderList, normalizeClass, createCommentVNode, withModifiers } from 'vue';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null
}

var script = {
  props: {
    modelValue: {
      type: Number,
      default: undefined,
    },
    indicators: {
      type: Boolean,
      default: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 5000,
    },
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left',
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right',
    },
  },
  emits: ['update:modelValue', 'change'],
  data: function data() {
    return {
      slides: [],
      activeIndex: 0, // Make v-model not required
      timeoutId: 0,
      intervalId: 0,
    }
  },
  watch: {
    interval: function interval() {
      this.startInterval();
    },
    modelValue: function modelValue(index, oldValue) {
      this.run(index, oldValue);
      this.activeIndex = index;
    },
  },
  mounted: function mounted() {
    if (isExist(this.modelValue)) {
      this.activeIndex = this.modelValue;
    }
    if (this.slides.length > 0) {
      this.$select(this.activeIndex);
    }
    this.startInterval();
  },
  beforeUnmount: function beforeUnmount() {
    this.stopInterval();
  },
  methods: {
    run: function run(newIndex, oldIndex) {
      var this$1$1 = this;

      var currentActiveIndex = oldIndex || 0;
      var direction;
      if (newIndex > currentActiveIndex) {
        direction = ['next', 'left'];
      } else {
        direction = ['prev', 'right'];
      }
      this.slides[newIndex].slideClass[direction[0]] = true;
      this.$nextTick(function () {
        this$1$1.slides[newIndex].$el.offsetHeight;
        this$1$1.slides.forEach(function (slide, i) {
          if (i === currentActiveIndex) {
            slide.slideClass.active = true;
            slide.slideClass[direction[1]] = true;
          } else if (i === newIndex) {
            slide.slideClass[direction[1]] = true;
          }
        });
        this$1$1.timeoutId = setTimeout(function () {
          this$1$1.$select(newIndex);
          this$1$1.$emit('change', newIndex);
          this$1$1.timeoutId = 0;
        }, 600);
      });
    },
    startInterval: function startInterval() {
      var this$1$1 = this;

      this.stopInterval();
      if (this.interval > 0) {
        this.intervalId = setInterval(function () {
          this$1$1.next();
        }, this.interval);
      }
    },
    stopInterval: function stopInterval() {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    },
    resetAllSlideClass: function resetAllSlideClass() {
      this.slides.forEach(function (slide) {
        slide.slideClass.active = false;
        slide.slideClass.left = false;
        slide.slideClass.right = false;
        slide.slideClass.next = false;
        slide.slideClass.prev = false;
      });
    },
    $select: function $select(index) {
      this.resetAllSlideClass();
      this.slides[index].slideClass.active = true;
    },
    select: function select(index) {
      if (this.timeoutId !== 0 || index === this.activeIndex) {
        return
      }
      if (isExist(this.modelValue)) {
        this.$emit('update:modelValue', index);
      } else {
        this.run(index, this.activeIndex);
        this.activeIndex = index;
      }
    },
    prev: function prev() {
      this.select(
        this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1
      );
    },
    next: function next() {
      this.select(
        this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1
      );
    },
  },
};

var _hoisted_1 = { class: "carousel-indicators" };
var _hoisted_2 = ["onClick"];
var _hoisted_3 = {
  class: "carousel-inner",
  role: "listbox"
};
var _hoisted_4 = /*#__PURE__*/createElementVNode("span", { class: "sr-only" }, "Previous", -1 /* HOISTED */);
var _hoisted_5 = /*#__PURE__*/createElementVNode("span", { class: "sr-only" }, "Next", -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: "carousel slide",
    "data-ride": "carousel",
    onMouseenter: _cache[2] || (_cache[2] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return ($options.stopInterval && $options.stopInterval.apply($options, args));
  }),
    onMouseleave: _cache[3] || (_cache[3] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return ($options.startInterval && $options.startInterval.apply($options, args));
  })
  }, [
    ($props.indicators)
      ? renderSlot(_ctx.$slots, "indicators", {
          key: 0,
          select: $options.select,
          activeIndex: $data.activeIndex
        }, function () { return [
          createElementVNode("ol", _hoisted_1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.slides, function (slide, index) {
              return (openBlock(), createElementBlock("li", {
                key: index,
                class: normalizeClass({ active: index === $data.activeIndex }),
                onClick: function ($event) { return ($options.select(index)); }
              }, null, 10 /* CLASS, PROPS */, _hoisted_2))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ]; })
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ]),
    ($props.controls)
      ? (openBlock(), createElementBlock("a", {
          key: 1,
          class: "left carousel-control",
          href: "#",
          role: "button",
          onClick: _cache[0] || (_cache[0] = withModifiers(function ($event) { return ($options.prev()); }, ["prevent"]))
        }, [
          createElementVNode("span", {
            class: normalizeClass($props.iconControlLeft),
            "aria-hidden": "true"
          }, null, 2 /* CLASS */),
          _hoisted_4
        ]))
      : createCommentVNode("v-if", true),
    ($props.controls)
      ? (openBlock(), createElementBlock("a", {
          key: 2,
          class: "right carousel-control",
          href: "#",
          role: "button",
          onClick: _cache[1] || (_cache[1] = withModifiers(function ($event) { return ($options.next()); }, ["prevent"]))
        }, [
          createElementVNode("span", {
            class: normalizeClass($props.iconControlRight),
            "aria-hidden": "true"
          }, null, 2 /* CLASS */),
          _hoisted_5
        ]))
      : createCommentVNode("v-if", true)
  ], 32 /* HYDRATE_EVENTS */))
}

script.render = render;
script.__file = "src/components/carousel/Carousel.vue";

export { script as default };
//# sourceMappingURL=Carousel.js.map
