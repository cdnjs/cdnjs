import { openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';

var script = {
  props: {
    size: { type: String, default: undefined },
    vertical: {
      type: Boolean,
      default: false,
    },
    justified: {
      type: Boolean,
      default: false,
    },
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var obj;

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(( obj = {
      'btn-group': !$props.vertical,
      'btn-group-vertical': $props.vertical,
      'btn-group-justified': $props.justified
    }, obj[("btn-group-" + ($props.size))] = $props.size, obj )),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/button/BtnGroup.vue";

export { script as default };
//# sourceMappingURL=BtnGroup.js.map
