/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Steps = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultIconPrev: "chevron-left",
      defaultIconNext: "chevron-right"};

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

    const LABEL_POSITIONS = ["bottom", "right", "left"];
    const MOBILE_MODES = ["minimalist", "compact"];
    var _sfc_main$1 = vue.defineComponent({
      name: "BSteps",
      components: {
        BIcon
      },
      mixins: [TabbedMixin("step")],
      props: {
        type: [String, Object],
        iconPack: String,
        iconPrev: {
          type: String,
          default: () => {
            return config.defaultIconPrev;
          }
        },
        iconNext: {
          type: String,
          default: () => {
            return config.defaultIconNext;
          }
        },
        hasNavigation: {
          type: Boolean,
          default: true
        },
        labelPosition: {
          type: String,
          validator(value) {
            return LABEL_POSITIONS.indexOf(value) > -1;
          },
          default: "bottom"
        },
        rounded: {
          type: Boolean,
          default: true
        },
        mobileMode: {
          type: String,
          validator(value) {
            return MOBILE_MODES.indexOf(value) > -1;
          },
          default: "minimalist"
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String
      },
      computed: {
        // Override mixin implementation to always have a value
        activeItem() {
          return this.childItems.filter((i) => i.uniqueValue === this.activeId)[0] || this.items[0];
        },
        wrapperClasses() {
          return [
            this.size,
            {
              "is-vertical": this.vertical,
              [this.position]: this.position && this.vertical
            }
          ];
        },
        mainClasses() {
          return [
            this.type,
            {
              "has-label-right": this.labelPosition === "right",
              "has-label-left": this.labelPosition === "left",
              "is-animated": this.animated,
              "is-rounded": this.rounded,
              [`mobile-${this.mobileMode}`]: this.mobileMode !== null
            }
          ];
        },
        /*
         * Check if previous button is available.
         */
        hasPrev() {
          return this.prevItemIdx !== null;
        },
        /*
         * Retrieves the next visible item index
         */
        nextItemIdx() {
          const idx = this.activeItem ? this.activeItem.index : 0;
          return this.getNextItemIdx(idx);
        },
        /*
         * Retrieves the next visible item
         */
        nextItem() {
          let nextItem = null;
          if (this.nextItemIdx !== null) {
            nextItem = this.items.find((i) => i.index === this.nextItemIdx);
          }
          return nextItem;
        },
        /*
        * Retrieves the next visible item index
        */
        prevItemIdx() {
          if (!this.activeItem) {
            return null;
          }
          const idx = this.activeItem.index;
          return this.getPrevItemIdx(idx);
        },
        /*
         * Retrieves the previous visible item
         */
        prevItem() {
          if (!this.activeItem) {
            return null;
          }
          let prevItem = null;
          if (this.prevItemIdx !== null) {
            prevItem = this.items.find((i) => i.index === this.prevItemIdx);
          }
          return prevItem;
        },
        /*
         * Check if next button is available.
         */
        hasNext() {
          return this.nextItemIdx !== null;
        },
        navigationProps() {
          return {
            previous: {
              disabled: !this.hasPrev,
              action: this.prev
            },
            next: {
              disabled: !this.hasNext,
              action: this.next
            }
          };
        }
      },
      methods: {
        /*
         * Return if the step should be clickable or not.
         */
        isItemClickable(stepItem) {
          if (stepItem.clickable === void 0) {
            return stepItem.index < this.activeItem.index;
          }
          return stepItem.clickable;
        },
        /*
         * Previous button click listener.
         */
        prev() {
          if (this.hasPrev) {
            this.activeId = this.prevItem.uniqueValue;
          }
        },
        /*
         * Previous button click listener.
         */
        next() {
          if (this.hasNext) {
            this.activeId = this.nextItem.uniqueValue;
          }
        }
      }
    });

    const _hoisted_1 = { class: "step-items" };
    const _hoisted_2 = ["onClick"];
    const _hoisted_3 = { class: "step-marker" };
    const _hoisted_4 = { key: 1 };
    const _hoisted_5 = { class: "step-details" };
    const _hoisted_6 = { class: "step-title" };
    const _hoisted_7 = {
      key: 0,
      class: "step-navigation"
    };
    const _hoisted_8 = ["disabled", "aria-label"];
    const _hoisted_9 = ["disabled", "aria-label"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["b-steps", _ctx.wrapperClasses])
        },
        [
          vue.createElementVNode(
            "nav",
            {
              class: vue.normalizeClass(["steps", _ctx.mainClasses])
            },
            [
              vue.createElementVNode("ul", _hoisted_1, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(_ctx.items, (childItem) => {
                    return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                      "li",
                      {
                        key: childItem.uniqueValue,
                        class: vue.normalizeClass(["step-item", [childItem.type || _ctx.type, childItem.headerClass, {
                          "is-active": childItem.isActive,
                          "is-previous": _ctx.activeItem.index > childItem.index
                        }]])
                      },
                      [
                        vue.createElementVNode("a", {
                          class: vue.normalizeClass(["step-link", { "is-clickable": _ctx.isItemClickable(childItem) }]),
                          onClick: ($event) => _ctx.isItemClickable(childItem) && _ctx.childClick(childItem)
                        }, [
                          vue.createElementVNode("div", _hoisted_3, [
                            childItem.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                              key: 0,
                              icon: childItem.icon,
                              pack: childItem.iconPack,
                              size: _ctx.size
                            }, null, 8, ["icon", "pack", "size"])) : childItem.step ? (vue.openBlock(), vue.createElementBlock(
                              "span",
                              _hoisted_4,
                              vue.toDisplayString(childItem.step),
                              1
                              /* TEXT */
                            )) : vue.createCommentVNode("v-if", true)
                          ]),
                          vue.createElementVNode("div", _hoisted_5, [
                            vue.createElementVNode(
                              "span",
                              _hoisted_6,
                              vue.toDisplayString(childItem.label),
                              1
                              /* TEXT */
                            )
                          ])
                        ], 10, _hoisted_2)
                      ],
                      2
                      /* CLASS */
                    )), [
                      [vue.vShow, childItem.visible]
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "section",
            {
              class: vue.normalizeClass(["step-content", { "is-transitioning": _ctx.isTransitioning }])
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          vue.renderSlot(_ctx.$slots, "navigation", {
            previous: _ctx.navigationProps.previous,
            next: _ctx.navigationProps.next
          }, () => [
            _ctx.hasNavigation ? (vue.openBlock(), vue.createElementBlock("nav", _hoisted_7, [
              vue.createElementVNode("a", {
                role: "button",
                class: "pagination-previous",
                disabled: _ctx.navigationProps.previous.disabled || void 0,
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.navigationProps.previous.action && _ctx.navigationProps.previous.action(...args), ["prevent"])),
                "aria-label": _ctx.ariaPreviousLabel
              }, [
                vue.createVNode(_component_b_icon, {
                  icon: _ctx.iconPrev,
                  pack: _ctx.iconPack,
                  both: "",
                  "aria-hidden": "true"
                }, null, 8, ["icon", "pack"])
              ], 8, _hoisted_8),
              vue.createElementVNode("a", {
                role: "button",
                class: "pagination-next",
                disabled: _ctx.navigationProps.next.disabled || void 0,
                onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.navigationProps.next.action && _ctx.navigationProps.next.action(...args), ["prevent"])),
                "aria-label": _ctx.ariaNextLabel
              }, [
                vue.createVNode(_component_b_icon, {
                  icon: _ctx.iconNext,
                  pack: _ctx.iconPack,
                  both: "",
                  "aria-hidden": "true"
                }, null, 8, ["icon", "pack"])
              ], 8, _hoisted_9)
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      );
    }
    var Steps = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);

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
      name: "BStepItem",
      mixins: [TabbedChildMixin("step")],
      props: {
        step: [String, Number],
        type: [String, Object],
        clickable: {
          type: Boolean,
          default: void 0
        }
      },
      data() {
        return {
          elementClass: "step-item"
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
        registerComponent(Vue, Steps);
        registerComponent(Vue, _sfc_main);
      }
    };

    exports.BStepItem = _sfc_main;
    exports.BSteps = Steps;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
