import { defineComponent, createElementBlock, openBlock, createElementVNode, renderSlot, resolveComponent, Fragment, createCommentVNode, createVNode, toDisplayString, createTextVNode, mergeProps, createBlock, resolveDynamicComponent, withCtx, Transition, withDirectives, vShow } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { c as config } from './config-CKuo-p6e.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './helpers.js';

var MenuItemContainerMixin = defineComponent({
  provide() {
    return {
      BMenuItemContainer: this
    };
  },
  data() {
    return {
      menuItems: []
    };
  },
  methods: {
    appendMenuItem(item) {
      this.menuItems.push(item);
    },
    removeMenuItem(item) {
      const index = this.menuItems.indexOf(item);
      if (index !== -1) {
        this.menuItems.splice(index, 1);
      }
    }
  }
});

var _sfc_main$2 = defineComponent({
  name: "BMenu",
  mixins: [MenuItemContainerMixin],
  props: {
    accordion: {
      type: Boolean,
      default: true
    },
    activable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      _isMenu: true
      // Used by MenuItem
    };
  }
});

const _hoisted_1$2 = { class: "menu" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", null, [
    createElementVNode("div", _hoisted_1$2, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var Menu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

var _sfc_main$1 = defineComponent({
  name: "BMenuList",
  components: {
    BIcon
  },
  props: {
    label: String,
    icon: String,
    iconPack: String,
    ariaRole: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "is-small"
    }
  }
});

const _hoisted_1$1 = {
  key: 0,
  class: "menu-label"
};
const _hoisted_2$1 = ["role"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      _ctx.label || _ctx.$slots.label ? (openBlock(), createElementBlock("p", _hoisted_1$1, [
        _ctx.label ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            _ctx.icon ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                createVNode(_component_b_icon, {
                  icon: _ctx.icon,
                  pack: _ctx.iconPack,
                  size: _ctx.size
                }, null, 8, ["icon", "pack", "size"]),
                createElementVNode(
                  "span",
                  null,
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : renderSlot(_ctx.$slots, "label", { key: 1 })
      ])) : createCommentVNode("v-if", true),
      createElementVNode("ul", {
        class: "menu-list",
        role: _ctx.ariaRole === "menu" ? _ctx.ariaRole : void 0
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, _hoisted_2$1)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
var MenuList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

var _sfc_main = defineComponent({
  name: "BMenuItem",
  components: {
    BIcon
  },
  mixins: [CompatFallthroughMixin, MenuItemContainerMixin],
  inject: {
    parent: {
      from: "BMenuItemContainer",
      default: null
    }
  },
  // deprecated, to replace with default 'value' in the next breaking change
  props: {
    label: String,
    modelValue: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    iconPack: String,
    icon: String,
    animation: {
      type: String,
      default: "slide"
    },
    tag: {
      type: [String, Object],
      default: "a",
      validator: (value) => {
        return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
      }
    },
    ariaRole: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "is-small"
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "update:modelValue": (_isActive) => true,
    "update:expanded": (_isExpanded) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newActive: this.modelValue,
      newExpanded: this.expanded
    };
  },
  computed: {
    ariaRoleMenu() {
      return this.ariaRole === "menuitem" ? this.ariaRole : void 0;
    }
  },
  watch: {
    modelValue(value) {
      this.newActive = value;
    },
    expanded(value) {
      this.newExpanded = value;
    }
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      const menu = this.getMenu();
      this.reset(this.parent, menu);
      this.newExpanded = this.$props.expanded || !this.newExpanded;
      this.$emit("update:expanded", this.newExpanded);
      if (menu && menu.activable) {
        this.newActive = true;
        this.$emit("update:modelValue", this.newActive);
      }
    },
    reset(parent, menu) {
      if (parent == null) {
        return;
      }
      parent.menuItems.forEach((item) => {
        if (item !== this) {
          this.reset(item, menu);
          if (!parent.$data._isMenu || parent.$data._isMenu && parent.accordion) {
            item.newExpanded = false;
            item.$emit("update:expanded", item.newExpanded);
          }
          if (menu && menu.activable) {
            item.newActive = false;
            item.$emit("update:modelValue", item.newActive);
          }
        }
      });
    },
    getMenu() {
      let parent = this.parent;
      while (parent && !parent.$data._isMenu) {
        parent = parent.parent;
      }
      return parent;
    }
  },
  mounted() {
    if (this.parent) {
      this.parent.appendMenuItem(this);
    }
  },
  beforeUnmount() {
    if (this.parent) {
      this.parent.removeMenuItem(this);
    }
  }
});

const _hoisted_1 = ["role"];
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock("li", mergeProps({ role: _ctx.ariaRoleMenu }, _ctx.rootAttrs), [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps(_ctx.fallthroughAttrs, {
      class: {
        "is-active": _ctx.newActive,
        "is-expanded": _ctx.newExpanded,
        "is-disabled": _ctx.disabled,
        "icon-text": _ctx.icon
      },
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClick())
    }), {
      default: withCtx(() => [
        _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
          key: 0,
          icon: _ctx.icon,
          pack: _ctx.iconPack,
          size: _ctx.size
        }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true),
        _ctx.label ? (openBlock(), createElementBlock(
          "span",
          _hoisted_2,
          toDisplayString(_ctx.label),
          1
          /* TEXT */
        )) : renderSlot(_ctx.$slots, "label", {
          key: 2,
          expanded: _ctx.newExpanded,
          active: _ctx.newActive
        })
      ]),
      _: 3
      /* FORWARDED */
    }, 16, ["class"])),
    createCommentVNode(" sub menu items "),
    _ctx.$slots.default ? (openBlock(), createBlock(Transition, {
      key: 0,
      name: _ctx.animation,
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode(
          "ul",
          null,
          [
            renderSlot(_ctx.$slots, "default")
          ],
          512
          /* NEED_PATCH */
        ), [
          [vShow, _ctx.newExpanded]
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])) : createCommentVNode("v-if", true)
  ], 16, _hoisted_1);
}
var MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Menu);
    registerComponent(Vue, MenuList, "BMenuList");
    registerComponent(Vue, MenuItem);
  }
};

export { Menu as BMenu, MenuItem as BMenuItem, MenuList as BMenuList, Plugin as default };
