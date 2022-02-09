import { getCurrentInstance, reactive, onBeforeMount, onBeforeUnmount, openBlock, createElementBlock, normalizeClass, unref, renderSlot } from "vue";
function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    const index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}
const _sfc_main = {
  setup(__props, { expose }) {
    const instance = getCurrentInstance();
    const slideClass = reactive({
      active: false,
      prev: false,
      next: false,
      left: false,
      right: false
    });
    onBeforeMount(() => {
      var _a, _b, _c;
      (_c = (_b = (_a = instance.parent) == null ? void 0 : _a.exposed) == null ? void 0 : _b.slides) == null ? void 0 : _c.push(instance);
    });
    onBeforeUnmount(() => {
      var _a, _b;
      spliceIfExist((_b = (_a = instance.parent) == null ? void 0 : _a.exposed) == null ? void 0 : _b.slides, instance);
    });
    expose({
      slideClass
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["item", unref(slideClass)])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
};
export { _sfc_main as default };
