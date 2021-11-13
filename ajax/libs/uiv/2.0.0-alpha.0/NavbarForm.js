import { openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';

var script = {
  props: {
    left: Boolean,
    right: Boolean,
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("form", {
    class: normalizeClass({
      'navbar-form': true,
      'navbar-left': $props.left,
      'navbar-right': $props.right,
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/navbar/NavbarForm.vue";

export { script as default };
//# sourceMappingURL=NavbarForm.js.map
