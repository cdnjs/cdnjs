import { B as BTag } from './Tag-jS5Bcj6N.js';
import { defineComponent, createElementBlock, openBlock, normalizeClass, renderSlot } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './Icon-DPyGDeRK.js';
import './config-CKuo-p6e.js';
import './helpers.js';

var _sfc_main = defineComponent({
  name: "BTaglist",
  props: {
    attached: Boolean
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["tags", { "has-addons": _ctx.attached }])
    },
    [
      renderSlot(_ctx.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
var Taglist = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BTag);
    registerComponent(Vue, Taglist);
  }
};

export { BTag, Taglist as BTaglist, Plugin as default };
