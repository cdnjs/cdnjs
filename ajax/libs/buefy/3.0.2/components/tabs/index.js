/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tabs = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultTabsExpanded: false,
      defaultTabsAnimated: true,
      defaultTabsType: null};

    function hasFlag(val, flag) {
      return (val & flag) === flag;
    }
    function bound(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

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

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);

    var BSlotComponent = vue.defineComponent({
      name: "BSlotComponent",
      props: {
        component: {
          type: Object,
          required: true
        },
        name: {
          type: String,
          default: "default"
        },
        scoped: {
          type: Boolean
        },
        props: {
          type: Object
        },
        tag: {
          type: [String, Object],
          default: "div"
        }
      },
      methods: {
        refresh() {
          this.$forceUpdate();
        }
      },
      render() {
        return vue.h(
          this.tag,
          {},
          this.component.$slots ? this.scoped ? this.component.$slots[this.name](this.props) : this.component.$slots[this.name]() : void 0
        );
      }
    });

    var __defProp$1 = Object.defineProperty;
    var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
    var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
    var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
    var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues$1 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp$1.call(b, prop))
          __defNormalProp$1(a, prop, b[prop]);
      if (__getOwnPropSymbols$1)
        for (var prop of __getOwnPropSymbols$1(b)) {
          if (__propIsEnum$1.call(b, prop))
            __defNormalProp$1(a, prop, b[prop]);
        }
      return a;
    };
    const items = 1;
    const sorted$1 = 3;
    const Sorted$1 = sorted$1;
    var ProviderParentMixin = (itemName, flags) => {
      const mixin = {
        provide() {
          return {
            ["b" + itemName]: this
          };
        }
      };
      if (hasFlag(flags, items)) {
        mixin.data = function() {
          return __spreadValues$1({
            childItems: []
          }, hasFlag(flags, sorted$1) ? { nextIndex: 0 } : {});
        };
        mixin.methods = {
          _registerItem(item) {
            if (hasFlag(flags, sorted$1)) {
              item.dynamicIndex = this.nextIndex;
              ++this.nextIndex;
            }
            this.childItems.push(item);
          },
          _unregisterItem(item) {
            this.childItems = this.childItems.filter((i) => i.uniqueValue !== item.uniqueValue);
          }
        };
        if (hasFlag(flags, sorted$1)) {
          mixin.computed = {
            /*
             * When items are added/removed sort them according to their position
             */
            sortedItems() {
              return this.childItems.slice().sort((i1, i2) => {
                return i1.index - i2.index;
              });
            }
          };
        }
      }
      return mixin;
    };

    var TabbedMixin = (cmp) => vue.defineComponent({
      components: {
        BIcon,
        BSlotComponent
      },
      mixins: [ProviderParentMixin(cmp, Sorted$1)],
      props: {
        modelValue: {
          type: [String, Number, null],
          default: void 0
        },
        size: String,
        animated: {
          type: Boolean,
          default: true
        },
        animation: String,
        animateInitially: Boolean,
        vertical: {
          type: Boolean,
          default: false
        },
        position: String,
        destroyOnHide: {
          type: Boolean,
          default: false
        }
      },
      emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "update:modelValue": (_value) => true
      },
      data() {
        return {
          activeId: this.modelValue,
          // Internal state
          defaultSlots: [],
          contentHeight: 0,
          isTransitioning: false
        };
      },
      computed: {
        activeItem() {
          const childItems = this.childItems;
          return this.activeId === void 0 ? this.items[0] : this.activeId === null ? null : childItems.find((i) => i.uniqueValue === this.activeId);
        },
        items() {
          return this.sortedItems;
        }
      },
      watch: {
        /*
         * When v-model is changed set the new active tab.
         */
        modelValue(value) {
          if (typeof value === "number") {
            value = bound(value, 0, this.items.length - 1);
            this.activeId = this.items[value].uniqueValue;
          } else {
            this.activeId = value;
          }
        },
        /*
         * Sync internal state with external state
         */
        activeId(val, oldValue) {
          const oldTab = oldValue !== void 0 && oldValue !== null ? this.childItems.find((i) => i.uniqueValue === oldValue) : null;
          if (oldTab && this.activeItem) {
            oldTab.deactivate(this.activeItem.index);
            this.activeItem.activate(oldTab.index);
          }
          val = this.activeItem ? typeof this.modelValue === "number" ? this.items.indexOf(this.activeItem) : this.activeItem.uniqueValue : void 0;
          if (val !== this.modelValue) {
            this.$emit("update:modelValue", val);
          }
        }
      },
      methods: {
        /*
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
          this.activeId = child.uniqueValue;
        },
        getNextItemIdx(fromIdx, skipDisabled = false) {
          let nextItemIdx = null;
          for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (fromIdx < item.index && (item.visible && (!skipDisabled || skipDisabled && !item.disabled))) {
              nextItemIdx = item.index;
              break;
            }
          }
          return nextItemIdx;
        },
        getPrevItemIdx(fromIdx, skipDisabled = false) {
          let prevItemIdx = null;
          for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (item.index < fromIdx && (item.visible && (!skipDisabled || skipDisabled && !item.disabled))) {
              prevItemIdx = item.index;
              break;
            }
          }
          return prevItemIdx;
        }
      },
      mounted() {
        if (typeof this.modelValue === "number") {
          const value = bound(this.modelValue, 0, this.items.length - 1);
          this.activeId = this.items[value].uniqueValue;
        } else {
          this.activeId = this.modelValue;
        }
      }
    });

    var _sfc_main$1 = vue.defineComponent({
      name: "BTabs",
      components: {
        BIcon,
        BSlotComponent
      },
      mixins: [TabbedMixin("tab")],
      props: {
        expanded: {
          type: Boolean,
          default: () => {
            return config.defaultTabsExpanded;
          }
        },
        type: {
          type: [String, Object],
          default: () => {
            return config.defaultTabsType;
          }
        },
        animated: {
          type: Boolean,
          default: () => {
            return config.defaultTabsAnimated;
          }
        },
        multiline: Boolean
      },
      data() {
        return {
          currentFocus: null
        };
      },
      computed: {
        mainClasses() {
          return {
            "is-fullwidth": this.expanded,
            "is-vertical": this.vertical,
            "is-multiline": this.multiline,
            [this.position]: this.position && this.vertical
          };
        },
        navClasses() {
          return [
            this.type,
            this.size,
            {
              [this.position]: this.position && !this.vertical,
              "is-fullwidth": this.expanded,
              "is-toggle": this.type === "is-toggle-rounded"
            }
          ];
        }
      },
      methods: {
        giveFocusToTab(tab) {
          if (Array.isArray(tab)) {
            tab = tab[0];
            if (tab == null) {
              return;
            }
          }
          if (tab.$el && tab.$el.focus) {
            tab.$el.focus();
          } else if (tab.focus) {
            tab.focus();
          }
        },
        manageTablistKeydown(event) {
          const { key } = event;
          switch (key) {
            case (this.vertical ? "ArrowUp" : "ArrowLeft"):
            case (this.vertical ? "Up" : "Left"): {
              let prevIdx = this.getPrevItemIdx(this.currentFocus, true);
              if (prevIdx === null) {
                prevIdx = this.getPrevItemIdx(Infinity, true);
              }
              const prevItem = this.items.find((i) => i.index === prevIdx);
              if (prevItem && this.$refs[`tabLink${prevIdx}`] && !prevItem.disabled) {
                this.giveFocusToTab(this.$refs[`tabLink${prevIdx}`]);
              }
              event.preventDefault();
              break;
            }
            case (this.vertical ? "ArrowDown" : "ArrowRight"):
            case (this.vertical ? "Down" : "Right"): {
              let nextIdx = this.getNextItemIdx(this.currentFocus, true);
              if (nextIdx === null) {
                nextIdx = this.getNextItemIdx(-1, true);
              }
              const nextItem = this.items.find((i) => i.index === nextIdx);
              if (nextItem && this.$refs[`tabLink${nextIdx}`] && !nextItem.disabled) {
                this.giveFocusToTab(this.$refs[`tabLink${nextIdx}`]);
              }
              event.preventDefault();
              break;
            }
          }
        },
        manageTabKeydown(event, childItem) {
          const { key } = event;
          switch (key) {
            case " ":
            case "Space":
            case "Spacebar":
            case "Enter": {
              this.childClick(childItem);
              event.preventDefault();
              break;
            }
          }
        }
      }
    });

    const _hoisted_1 = ["aria-orientation"];
    const _hoisted_2 = ["aria-controls", "aria-selected"];
    const _hoisted_3 = ["id", "tabindex", "onFocus", "onClick", "onKeydown"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_slot_component = vue.resolveComponent("b-slot-component");
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["b-tabs", _ctx.mainClasses])
        },
        [
          vue.createElementVNode(
            "nav",
            {
              class: vue.normalizeClass(["tabs", _ctx.navClasses]),
              onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.manageTablistKeydown && _ctx.manageTablistKeydown(...args))
            },
            [
              vue.renderSlot(_ctx.$slots, "start"),
              vue.createElementVNode("ul", {
                "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
                role: "tablist"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(_ctx.items, (childItem) => {
                    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
                      key: childItem.uniqueValue,
                      class: vue.normalizeClass([childItem.headerClass, {
                        "is-active": childItem.isActive,
                        "is-disabled": childItem.disabled
                      }]),
                      role: "tab",
                      "aria-controls": `${childItem.uniqueValue}-content`,
                      "aria-selected": `${childItem.isActive}`
                    }, [
                      childItem.$slots.header ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                        key: 0,
                        ref_for: true,
                        ref: `tabLink${childItem.index}`,
                        component: childItem,
                        name: "header",
                        tag: "a",
                        id: `${childItem.uniqueValue}-label`,
                        tabindex: childItem.isActive ? 0 : -1,
                        onFocus: ($event) => _ctx.currentFocus = childItem.index,
                        onClick: ($event) => _ctx.childClick(childItem),
                        onKeydown: ($event) => _ctx.manageTabKeydown($event, childItem)
                      }, null, 8, ["component", "id", "tabindex", "onFocus", "onClick", "onKeydown"])) : (vue.openBlock(), vue.createElementBlock("a", {
                        key: 1,
                        ref_for: true,
                        ref: `tabLink${childItem.index}`,
                        id: `${childItem.uniqueValue}-label`,
                        tabindex: childItem.isActive ? 0 : -1,
                        onFocus: ($event) => _ctx.currentFocus = childItem.index,
                        onClick: ($event) => _ctx.childClick(childItem),
                        onKeydown: ($event) => _ctx.manageTabKeydown($event, childItem)
                      }, [
                        childItem.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                          key: 0,
                          icon: childItem.icon,
                          pack: childItem.iconPack,
                          size: _ctx.size
                        }, null, 8, ["icon", "pack", "size"])) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "span",
                          null,
                          vue.toDisplayString(childItem.label),
                          1
                          /* TEXT */
                        )
                      ], 40, _hoisted_3))
                    ], 10, _hoisted_2)), [
                      [vue.vShow, childItem.visible]
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 8, _hoisted_1),
              vue.renderSlot(_ctx.$slots, "end")
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ),
          vue.createElementVNode(
            "section",
            {
              class: vue.normalizeClass(["tab-content", { "is-transitioning": _ctx.isTransitioning }])
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      );
    }
    var Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);

    var __defProp = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
    const sorted = 1;
    const optional = 2;
    const Sorted = sorted;
    var InjectedChildMixin = (parentItemName, flags) => {
      const mixin = {
        // FIXME: initializing `parent` with an empty string does not make
        // sense at all, but some code supposes that `parent` is non-null.
        // so I leave it as is for now.
        inject: { parent: { from: "b" + parentItemName, default: "" } },
        props: {
          // if `value` is non-null, it must be unique among all the siblings.
          // see `uniqueValue`
          value: {
            type: String,
            default: null
          }
        },
        computed: {
          // `ProviderParentMixin` uses `uniqueValue` computed value to
          // identify the child in its `childItems` collection.
          // so the value must be unique among all the siblings.
          // falls back to the `uid` internal field to ensure uniqueness.
          uniqueValue() {
            return this.value != null ? this.value : this.$.uid;
          }
        },
        created() {
          if (!this.parent) {
            if (!hasFlag(flags, optional)) {
              throw new Error("You should wrap " + this.$options.name + " in a " + parentItemName);
            }
          } else if (this.parent._registerItem) {
            this.parent._registerItem(this);
          }
        },
        beforeUnmount() {
          if (this.parent && this.parent._unregisterItem) {
            this.parent._unregisterItem(this);
          }
        }
      };
      if (hasFlag(flags, sorted)) {
        mixin.props = __spreadProps(__spreadValues({}, mixin.props), {
          order: {
            type: Number,
            required: false
          }
        });
        mixin.data = () => {
          return {
            dynamicIndex: void 0
          };
        };
        mixin.computed = __spreadProps(__spreadValues({}, mixin.computed), {
          index() {
            return this.order != null ? this.order : this.dynamicIndex;
          }
        });
      }
      return mixin;
    };

    var TabbedChildMixin = (parentCmp) => vue.defineComponent({
      mixins: [InjectedChildMixin(parentCmp, Sorted)],
      props: {
        label: String,
        icon: String,
        iconPack: String,
        visible: {
          type: Boolean,
          default: true
        },
        headerClass: {
          type: [String, Array, Object],
          default: null
        }
      },
      data() {
        return {
          transitionName: null,
          elementClass: "item",
          elementRole: null
        };
      },
      computed: {
        isActive() {
          return this.parent.activeItem === this;
        }
      },
      methods: {
        /*
         * Activate element, alter animation name based on the index.
         */
        activate(oldIndex) {
          this.transitionName = this.index < oldIndex ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
        },
        /*
         * Deactivate element, alter animation name based on the index.
         */
        deactivate(newIndex) {
          this.transitionName = newIndex < this.index ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
        }
      },
      render() {
        var _a;
        if (this.parent.destroyOnHide) {
          if (!this.isActive || !this.visible) {
            return;
          }
        }
        const vnode = vue.withDirectives(
          vue.h(
            "div",
            {
              // NOTE: possible regression of #3272
              // https://github.com/buefy/buefy/issues/3272
              class: this.elementClass,
              role: this.elementRole,
              id: `${this.uniqueValue}-content`,
              "aria-labelledby": this.elementRole ? `${this.uniqueValue}-label` : null,
              tabindex: this.isActive ? 0 : -1
            },
            this.$slots
          ),
          [[vue.vShow, this.isActive && this.visible]]
        );
        if (this.parent.animated) {
          return vue.h(
            vue.Transition,
            {
              name: (_a = this.parent.animation || this.transitionName) != null ? _a : void 0,
              appear: this.parent.animateInitially === true || void 0,
              onBeforeEnter: () => {
                this.parent.isTransitioning = true;
              },
              onAfterEnter: () => {
                this.parent.isTransitioning = false;
              }
            },
            { default: () => vnode }
          );
        }
        return vnode;
      }
    });

    var _sfc_main = vue.defineComponent({
      name: "BTabItem",
      mixins: [TabbedChildMixin("tab")],
      props: {
        disabled: Boolean
      },
      data() {
        return {
          elementClass: "tab-item",
          elementRole: "tabpanel"
        };
      }
    });

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Tabs);
        registerComponent(Vue, _sfc_main);
      }
    };

    exports.BTabItem = _sfc_main;
    exports.BTabs = Tabs;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
