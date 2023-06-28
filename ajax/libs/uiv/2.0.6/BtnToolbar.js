import { openBlock as t, createElementBlock as e, renderSlot as r } from "vue";
const l = {
  class: "btn-toolbar",
  role: "toolbar"
}, c = {
  __name: "BtnToolbar",
  setup(a) {
    return (o, n) => (t(), e("div", l, [
      r(o.$slots, "default")
    ]));
  }
};
export {
  c as default
};
