import { defineComponent, createElementBlock, openBlock, normalizeClass, renderSlot } from 'vue';
import { D as DROPDOWN_INJECTION_KEY } from './Dropdown-CGTYVyoL.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
  name: "BDropdownItem",
  inject: {
    parent: {
      from: DROPDOWN_INJECTION_KEY,
      default: void 0
    }
  },
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    separator: Boolean,
    disabled: Boolean,
    custom: Boolean,
    focusable: {
      type: Boolean,
      default: true
    },
    paddingless: Boolean,
    hasLink: Boolean,
    ariaRole: {
      type: String,
      default: ""
    }
  },
  emits: {
    click: () => true
  },
  computed: {
    anchorClasses() {
      return {
        "is-disabled": this.parent.disabled || this.disabled,
        "is-paddingless": this.paddingless,
        "is-active": this.isActive
      };
    },
    itemClasses() {
      return {
        "dropdown-item": !this.hasLink,
        "is-disabled": this.disabled,
        "is-paddingless": this.paddingless,
        "is-active": this.isActive,
        "has-link": this.hasLink
      };
    },
    ariaRoleItem() {
      return this.ariaRole === "menuitem" || this.ariaRole === "listitem" ? this.ariaRole : void 0;
    },
    isClickable() {
      return !this.parent.disabled && !this.separator && !this.disabled && !this.custom;
    },
    isActive() {
      if (this.parent.selected === null) return false;
      if (this.parent.multiple) {
        return this.parent.selected.indexOf(this.value) >= 0;
      }
      return this.value === this.parent.selected;
    },
    isFocusable() {
      return this.hasLink ? false : this.focusable;
    }
  },
  methods: {
    /*
    * Click listener, select the item.
    */
    selectItem() {
      if (!this.isClickable) return;
      this.parent.selectItem(this.value);
      this.$emit("click");
    }
  }
});

const _hoisted_1 = {
  key: 0,
  class: "dropdown-divider"
};
const _hoisted_2 = ["role", "tabindex"];
const _hoisted_3 = ["role", "tabindex"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.separator ? (openBlock(), createElementBlock("hr", _hoisted_1)) : !_ctx.custom && !_ctx.hasLink ? (openBlock(), createElementBlock("a", {
    key: 1,
    class: normalizeClass(["dropdown-item", _ctx.anchorClasses]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
    role: _ctx.ariaRoleItem,
    tabindex: _ctx.isFocusable ? 0 : void 0
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_2)) : (openBlock(), createElementBlock("div", {
    key: 2,
    class: normalizeClass(_ctx.itemClasses),
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
    role: _ctx.ariaRoleItem,
    tabindex: _ctx.isFocusable ? 0 : void 0
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_3));
}
var BDropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BDropdownItem as B };
