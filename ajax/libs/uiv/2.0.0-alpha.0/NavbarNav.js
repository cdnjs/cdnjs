import { openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';

var script = {
  props: {
    left: Boolean,
    right: Boolean,
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("ul", {
    class: normalizeClass({
      nav: true,
      'navbar-nav': true,
      'navbar-left': $props.left,
      'navbar-right': $props.right,
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/navbar/NavbarNav.vue";

export { script as default };
//# sourceMappingURL=NavbarNav.js.map
