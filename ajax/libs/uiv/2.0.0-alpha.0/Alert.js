import { openBlock, createElementBlock, normalizeClass, createCommentVNode, renderSlot, createElementVNode } from 'vue';

var script = {
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  emits: ['dismissed'],
  data: function data() {
    return {
      timeout: 0,
    }
  },
  computed: {
    alertClass: function alertClass() {
      var obj;

      return ( obj = {
        alert: true
      }, obj[("alert-" + (this.type))] = Boolean(this.type), obj['alert-dismissible'] = this.dismissible, obj )
    },
  },
  mounted: function mounted() {
    if (this.duration > 0) {
      this.timeout = setTimeout(this.closeAlert, this.duration);
    }
  },
  unmounted: function unmounted() {
    clearTimeout(this.timeout);
  },
  methods: {
    closeAlert: function closeAlert() {
      clearTimeout(this.timeout);
      this.$emit('dismissed');
    },
  },
};

var _hoisted_1 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "×", -1 /* HOISTED */);
var _hoisted_2 = [
  _hoisted_1
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    role: "alert",
    class: normalizeClass($options.alertClass)
  }, [
    ($props.dismissible)
      ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "close",
          "aria-label": "Close",
          onClick: _cache[0] || (_cache[0] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.closeAlert && $options.closeAlert.apply($options, args));
  })
        }, _hoisted_2))
      : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/alert/Alert.vue";

export { script as default };
//# sourceMappingURL=Alert.js.map
