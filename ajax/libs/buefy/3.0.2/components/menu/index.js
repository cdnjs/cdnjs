/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Menu = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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

    var _sfc_main$3 = vue.defineComponent({
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

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    const _hoisted_1$2 = { class: "menu" };
    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("section", null, [
        vue.createElementVNode("div", _hoisted_1$2, [
          vue.renderSlot(_ctx.$slots, "default")
        ])
      ]);
    }
    var Menu = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultCompatFallthrough: true,
      defaultLinkTags: [
        "a",
        "button",
        "input",
        "router-link",
        "nuxt-link",
        "n-link",
        "RouterLink",
        "NuxtLink",
        "NLink"
      ]};

    const mdiIcons = {
      sizes: {
        default: "mdi-24px",
        "is-small": null,
        "is-medium": "mdi-36px",
        "is-large": "mdi-48px"
      },
      iconPrefix: "mdi-"
    };
    const faIcons = () => {
      const faIconPrefix = "fa-";
      return {
        sizes: {
          default: null,
          "is-small": null,
          "is-medium": faIconPrefix + "lg",
          "is-large": faIconPrefix + "2x"
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
          information: "info-circle",
          alert: "exclamation-triangle",
          "alert-circle": "exclamation-circle",
          "chevron-right": "angle-right",
          "chevron-left": "angle-left",
          "chevron-down": "angle-down",
          "eye-off": "eye-slash",
          "menu-down": "caret-down",
          "menu-up": "caret-up",
          "close-circle": "times-circle"
        }
      };
    };
    const getIcons = () => {
      let icons = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons(),
        "fa-solid": faIcons(),
        "fa-regular": faIcons(),
        "fa-light": faIcons(),
        "fa-thin": faIcons(),
        "fa-duotone": faIcons(),
        "fa-brands": faIcons()
      };
      return icons;
    };

    var _sfc_main$2 = vue.defineComponent({
      name: "BIcon",
      props: {
        type: [String, Object],
        component: String,
        pack: String,
        icon: {
          type: String,
          required: true
        },
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean
        // This is used internally to show both MDI and FA icon
      },
      computed: {
        iconConfig() {
          const allIcons = getIcons();
          return allIcons[this.newPack];
        },
        iconPrefix() {
          if (this.iconConfig && this.iconConfig.iconPrefix) {
            return this.iconConfig.iconPrefix;
          }
          return "";
        },
        /*
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
          return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
        },
        newPack() {
          return this.pack || config.defaultIconPack;
        },
        newType() {
          if (!this.type) return;
          let splitType = [];
          if (typeof this.type === "string") {
            splitType = this.type.split("-");
          } else {
            for (const key in this.type) {
              if (this.type[key]) {
                splitType = key.split("-");
                break;
              }
            }
          }
          if (splitType.length <= 1) return;
          const [, ...type] = splitType;
          return `has-text-${type.join("-")}`;
        },
        newCustomSize() {
          return this.customSize || this.customSizeByPack;
        },
        customSizeByPack() {
          if (this.iconConfig && this.iconConfig.sizes) {
            if (this.size && this.iconConfig.sizes[this.size] !== void 0) {
              return this.iconConfig.sizes[this.size];
            } else if (this.iconConfig.sizes.default) {
              return this.iconConfig.sizes.default;
            }
          }
          return null;
        },
        useIconComponent() {
          return this.component || config.defaultIconComponent;
        }
      },
      methods: {
        /*
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
          if (!this.both) {
            return value;
          }
          if (this.iconConfig == null) {
            return value;
          }
          const maybeInternal = this.iconConfig;
          if (maybeInternal && maybeInternal.internalIcons && maybeInternal.internalIcons[value]) {
            return maybeInternal.internalIcons[value];
          }
          return value;
        }
      }
    });

    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "span",
        {
          class: vue.normalizeClass(["icon", [_ctx.newType, _ctx.size]])
        },
        [
          !_ctx.useIconComponent ? (vue.openBlock(), vue.createElementBlock(
            "i",
            {
              key: 0,
              class: vue.normalizeClass([_ctx.newPack, _ctx.newIcon, _ctx.newCustomSize, _ctx.customClass])
            },
            null,
            2
            /* CLASS */
          )) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.useIconComponent), {
            key: 1,
            icon: [_ctx.newPack, _ctx.newIcon],
            size: _ctx.newCustomSize,
            class: vue.normalizeClass([_ctx.customClass])
          }, null, 8, ["icon", "size", "class"]))
        ],
        2
        /* CLASS */
      );
    }
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

    var _sfc_main$1 = vue.defineComponent({
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
    var MenuList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __objRest = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    };
    var CompatFallthroughMixin = vue.defineComponent({
      inheritAttrs: false,
      props: {
        compatFallthrough: {
          type: Boolean,
          default: () => config.defaultCompatFallthrough
        }
      },
      computed: {
        rootAttrs() {
          return this.compatFallthrough ? {
            class: this.$attrs.class,
            style: this.$attrs.style,
            id: this.$attrs.id
          } : {};
        },
        fallthroughAttrs() {
          if (this.compatFallthrough) {
            const _a = this.$attrs, { style: _1, class: _2, id: _3 } = _a, rest = __objRest(_a, ["style", "class", "id"]);
            return rest;
          } else {
            return this.$attrs;
          }
        }
      }
    });

    var _sfc_main = vue.defineComponent({
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
    var MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = name || component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Menu);
        registerComponent(Vue, MenuList, "BMenuList");
        registerComponent(Vue, MenuItem);
      }
    };

    exports.BMenu = Menu;
    exports.BMenuItem = MenuItem;
    exports.BMenuList = MenuList;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
