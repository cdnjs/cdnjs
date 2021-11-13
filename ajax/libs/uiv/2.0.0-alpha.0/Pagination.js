import { openBlock, createElementBlock, normalizeClass, createElementVNode, withModifiers, createCommentVNode, Fragment, renderList, toDisplayString } from 'vue';

function range(end, start, step) {
  if ( start === void 0 ) start = 0;
  if ( step === void 0 ) step = 1;

  var arr = [];
  for (var i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr
}

var script = {
  props: {
    modelValue: {
      type: Number,
      required: true,
      validator: function (v) { return v >= 1; },
    },
    boundaryLinks: {
      type: Boolean,
      default: false,
    },
    directionLinks: {
      type: Boolean,
      default: true,
    },
    size: { type: String, default: undefined },
    align: { type: String, default: undefined },
    totalPage: {
      type: Number,
      required: true,
      validator: function (v) { return v >= 0; },
    },
    maxSize: {
      type: Number,
      default: 5,
      validator: function (v) { return v >= 0; },
    },
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  data: function data() {
    return {
      sliceStart: 0,
    }
  },
  computed: {
    navClasses: function navClasses() {
      var obj;

      return ( obj = {}, obj[("text-" + (this.align))] = Boolean(this.align), obj )
    },
    classes: function classes() {
      var obj;

      return ( obj = {}, obj[("pagination-" + (this.size))] = Boolean(this.size), obj )
    },
    sliceArray: function sliceArray() {
      return range(this.totalPage).slice(
        this.sliceStart,
        this.sliceStart + this.maxSize
      )
    },
  },
  created: function created() {
    this.$watch(
      function (vm) { return [vm.modelValue, vm.maxSize, vm.totalPage].join(); },
      this.calculateSliceStart,
      {
        immediate: true,
      }
    );
  },
  methods: {
    calculateSliceStart: function calculateSliceStart() {
      var currentPage = this.modelValue;
      var chunkSize = this.maxSize;
      var currentChunkStart = this.sliceStart;
      var currentChunkEnd = currentChunkStart + chunkSize;
      if (currentPage > currentChunkEnd) {
        var lastChunkStart = this.totalPage - chunkSize;
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
    onPageChange: function onPageChange(page) {
      if (
        !this.disabled &&
        page > 0 &&
        page <= this.totalPage &&
        page !== this.modelValue
      ) {
        this.$emit('update:modelValue', page);
        this.$emit('change', page);
      }
    },
    toPage: function toPage(pre) {
      if (this.disabled) {
        return
      }
      var chunkSize = this.maxSize;
      var currentChunkStart = this.sliceStart;
      var lastChunkStart = this.totalPage - chunkSize;
      var start = pre
        ? currentChunkStart - chunkSize
        : currentChunkStart + chunkSize;
      if (start < 0) {
        this.sliceStart = 0;
      } else if (start > lastChunkStart) {
        this.sliceStart = lastChunkStart;
      } else {
        this.sliceStart = start;
      }
    },
  },
};

var _hoisted_1 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "«", -1 /* HOISTED */);
var _hoisted_2 = [
  _hoisted_1
];
var _hoisted_3 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "‹", -1 /* HOISTED */);
var _hoisted_4 = [
  _hoisted_3
];
var _hoisted_5 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "…", -1 /* HOISTED */);
var _hoisted_6 = [
  _hoisted_5
];
var _hoisted_7 = ["onClick"];
var _hoisted_8 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "…", -1 /* HOISTED */);
var _hoisted_9 = [
  _hoisted_8
];
var _hoisted_10 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "›", -1 /* HOISTED */);
var _hoisted_11 = [
  _hoisted_10
];
var _hoisted_12 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "»", -1 /* HOISTED */);
var _hoisted_13 = [
  _hoisted_12
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("nav", {
    "aria-label": "Page navigation",
    class: normalizeClass($options.navClasses)
  }, [
    createElementVNode("ul", {
      class: normalizeClass(["pagination", $options.classes])
    }, [
      ($props.boundaryLinks)
        ? (openBlock(), createElementBlock("li", {
            key: 0,
            class: normalizeClass({ disabled: $props.modelValue <= 1 || $props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "First",
              onClick: _cache[0] || (_cache[0] = withModifiers(function ($event) { return ($options.onPageChange(1)); }, ["prevent"]))
            }, _hoisted_2)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      ($props.directionLinks)
        ? (openBlock(), createElementBlock("li", {
            key: 1,
            class: normalizeClass({ disabled: $props.modelValue <= 1 || $props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Previous",
              onClick: _cache[1] || (_cache[1] = withModifiers(function ($event) { return ($options.onPageChange($props.modelValue - 1)); }, ["prevent"]))
            }, _hoisted_4)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      ($data.sliceStart > 0)
        ? (openBlock(), createElementBlock("li", {
            key: 2,
            class: normalizeClass({ disabled: $props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Previous group",
              onClick: _cache[2] || (_cache[2] = withModifiers(function ($event) { return ($options.toPage(1)); }, ["prevent"]))
            }, _hoisted_6)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.sliceArray, function (item) {
        return (openBlock(), createElementBlock("li", {
          key: item,
          class: normalizeClass({ active: $props.modelValue === item + 1, disabled: $props.disabled })
        }, [
          createElementVNode("a", {
            href: "#",
            role: "button",
            onClick: withModifiers(function ($event) { return ($options.onPageChange(item + 1)); }, ["prevent"])
          }, toDisplayString(item + 1), 9 /* TEXT, PROPS */, _hoisted_7)
        ], 2 /* CLASS */))
      }), 128 /* KEYED_FRAGMENT */)),
      ($data.sliceStart < $props.totalPage - $props.maxSize)
        ? (openBlock(), createElementBlock("li", {
            key: 3,
            class: normalizeClass({ disabled: $props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Next group",
              onClick: _cache[3] || (_cache[3] = withModifiers(function ($event) { return ($options.toPage(0)); }, ["prevent"]))
            }, _hoisted_9)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      ($props.directionLinks)
        ? (openBlock(), createElementBlock("li", {
            key: 4,
            class: normalizeClass({ disabled: $props.modelValue >= $props.totalPage || $props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Next",
              onClick: _cache[4] || (_cache[4] = withModifiers(function ($event) { return ($options.onPageChange(_ctx.value + 1)); }, ["prevent"]))
            }, _hoisted_11)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      ($props.boundaryLinks)
        ? (openBlock(), createElementBlock("li", {
            key: 5,
            class: normalizeClass({ disabled: $props.modelValue >= $props.totalPage || $props.disabled })
          }, [
            createElementVNode("a", {
              href: "#",
              role: "button",
              "aria-label": "Last",
              onClick: _cache[5] || (_cache[5] = withModifiers(function ($event) { return ($options.onPageChange($props.totalPage)); }, ["prevent"]))
            }, _hoisted_13)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/pagination/Pagination.vue";

export { script as default };
//# sourceMappingURL=Pagination.js.map
