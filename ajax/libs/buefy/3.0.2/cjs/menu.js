'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var Icon = require('./Icon-lsDKE2wQ.js');
var config = require('./config-DR826Ki2.js');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./helpers.js');

var MenuItemContainerMixin = vue.defineComponent({
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

var _sfc_main$2 = vue.defineComponent({
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
  return vue.openBlock(), vue.createElementBlock("section", null, [
    vue.createElementVNode("div", _hoisted_1$2, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var Menu = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

var _sfc_main$1 = vue.defineComponent({
  name: "BMenuList",
  components: {
    BIcon: Icon.BIcon
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
  const _component_b_icon = vue.resolveComponent("b-icon");
  return vue.openBlock(), vue.createElementBlock(
    vue.Fragment,
    null,
    [
      _ctx.label || _ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_1$1, [
        _ctx.label ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            _ctx.icon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createVNode(_component_b_icon, {
                  icon: _ctx.icon,
                  pack: _ctx.iconPack,
                  size: _ctx.size
                }, null, 8, ["icon", "pack", "size"]),
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createTextVNode(
                  vue.toDisplayString(_ctx.label),
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
        )) : vue.renderSlot(_ctx.$slots, "label", { key: 1 })
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("ul", {
        class: "menu-list",
        role: _ctx.ariaRole === "menu" ? _ctx.ariaRole : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 8, _hoisted_2$1)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
var MenuList = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

var _sfc_main = vue.defineComponent({
  name: "BMenuItem",
  components: {
    BIcon: Icon.BIcon
  },
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin, MenuItemContainerMixin],
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
        return typeof value === "object" || config.config.defaultLinkTags.indexOf(value) >= 0;
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
  const _component_b_icon = vue.resolveComponent("b-icon");
  return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({ role: _ctx.ariaRoleMenu }, _ctx.rootAttrs), [
    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), vue.mergeProps(_ctx.fallthroughAttrs, {
      class: {
        "is-active": _ctx.newActive,
        "is-expanded": _ctx.newExpanded,
        "is-disabled": _ctx.disabled,
        "icon-text": _ctx.icon
      },
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClick())
    }), {
      default: vue.withCtx(() => [
        _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
          key: 0,
          icon: _ctx.icon,
          pack: _ctx.iconPack,
          size: _ctx.size
        }, null, 8, ["icon", "pack", "size"])) : vue.createCommentVNode("v-if", true),
        _ctx.label ? (vue.openBlock(), vue.createElementBlock(
          "span",
          _hoisted_2,
          vue.toDisplayString(_ctx.label),
          1
          /* TEXT */
        )) : vue.renderSlot(_ctx.$slots, "label", {
          key: 2,
          expanded: _ctx.newExpanded,
          active: _ctx.newActive
        })
      ]),
      _: 3
      /* FORWARDED */
    }, 16, ["class"])),
    vue.createCommentVNode(" sub menu items "),
    _ctx.$slots.default ? (vue.openBlock(), vue.createBlock(vue.Transition, {
      key: 0,
      name: _ctx.animation,
      persisted: ""
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode(
          "ul",
          null,
          [
            vue.renderSlot(_ctx.$slots, "default")
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, _ctx.newExpanded]
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])) : vue.createCommentVNode("v-if", true)
  ], 16, _hoisted_1);
}
var MenuItem = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Menu);
    plugins.registerComponent(Vue, MenuList, "BMenuList");
    plugins.registerComponent(Vue, MenuItem);
  }
};

exports.BMenu = Menu;
exports.BMenuItem = MenuItem;
exports.BMenuList = MenuList;
exports.default = Plugin;
