/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Carousel = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultIconPrev: "chevron-left",
      defaultIconNext: "chevron-right",
      defaultCarouselInterval: 3500,
      defaultImageWebpFallback: null,
      defaultImageLazy: true,
      defaultImageResponsive: true,
      defaultImageRatio: null};

    function signPoly(value) {
      if (value < 0) return -1;
      return value > 0 ? 1 : 0;
    }
    const sign = Math.sign || signPoly;
    function hasFlag(val, flag) {
      return (val & flag) === flag;
    }
    function mod(n, mod2) {
      return (n % mod2 + mod2) % mod2;
    }
    function bound(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }
    function isWebpSupported() {
      return new Promise((resolve) => {
        const image = new Image();
        image.onerror = () => resolve(false);
        image.onload = () => resolve(image.width === 1);
        image.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
      }).catch(() => false);
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

    var _sfc_main$4 = vue.defineComponent({
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

    function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);

    var __defProp$3 = Object.defineProperty;
    var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
    var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
    var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
    var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues$3 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp$3.call(b, prop))
          __defNormalProp$3(a, prop, b[prop]);
      if (__getOwnPropSymbols$3)
        for (var prop of __getOwnPropSymbols$3(b)) {
          if (__propIsEnum$3.call(b, prop))
            __defNormalProp$3(a, prop, b[prop]);
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
          return __spreadValues$3({
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

    var _sfc_main$3 = vue.defineComponent({
      name: "BCarousel",
      components: {
        BIcon
      },
      mixins: [ProviderParentMixin("carousel", Sorted$1)],
      props: {
        modelValue: {
          type: Number,
          default: 0
        },
        animated: {
          type: String,
          default: "slide"
        },
        interval: Number,
        hasDrag: {
          type: Boolean,
          default: true
        },
        autoplay: {
          type: Boolean,
          default: true
        },
        pauseHover: {
          type: Boolean,
          default: true
        },
        pauseInfo: {
          type: Boolean,
          default: true
        },
        pauseInfoType: {
          type: String,
          default: "is-white"
        },
        pauseText: {
          type: String,
          default: "Pause"
        },
        arrow: {
          type: Boolean,
          default: true
        },
        arrowHover: {
          type: Boolean,
          default: true
        },
        repeat: {
          type: Boolean,
          default: true
        },
        iconPack: String,
        iconSize: String,
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
        indicator: {
          type: Boolean,
          default: true
        },
        indicatorBackground: Boolean,
        indicatorCustom: Boolean,
        indicatorCustomSize: {
          type: String,
          default: "is-small"
        },
        indicatorInside: {
          type: Boolean,
          default: true
        },
        indicatorMode: {
          type: String,
          default: "click"
        },
        indicatorPosition: {
          type: String,
          default: "is-bottom"
        },
        indicatorStyle: {
          type: String,
          default: "is-dots"
        },
        overlay: Boolean,
        progress: Boolean,
        progressType: {
          type: String,
          default: "is-primary"
        },
        withCarouselList: Boolean
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        change: (_index) => true,
        click: () => true,
        "update:modelValue": (_value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          transition: "next",
          activeChild: this.modelValue || 0,
          isPause: false,
          dragX: false,
          timer: void 0
        };
      },
      computed: {
        indicatorClasses() {
          return [
            {
              "has-background": this.indicatorBackground,
              "has-custom": this.indicatorCustom,
              "is-inside": this.indicatorInside
            },
            this.indicatorCustom && this.indicatorCustomSize,
            this.indicatorInside && this.indicatorPosition
          ];
        },
        // checking arrows
        hasPrev() {
          return this.repeat || this.activeChild !== 0;
        },
        hasNext() {
          return this.repeat || this.activeChild < this.childItems.length - 1;
        },
        activeChildIndex() {
          const item = this.sortedItems[this.activeChild];
          return item != null ? item.index : void 0;
        }
      },
      watch: {
        /*
         * When v-model is changed set the new active item.
         */
        modelValue(value) {
          this.changeActive(value);
        },
        /*
         * When carousel-items are updated, set active one.
         */
        sortedItems(items) {
          if (this.activeChild >= items.length && this.activeChild > 0) {
            this.changeActive(this.activeChild - 1);
          }
        },
        /*
         *  When autoplay is changed, start or pause timer accordingly
         */
        autoplay(status) {
          status ? this.startTimer() : this.pauseTimer();
        },
        /*
         *  Since the timer can get paused at the end, if repeat is changed we need to restart it
         */
        repeat(status) {
          if (status) {
            this.startTimer();
          }
        }
      },
      methods: {
        startTimer() {
          if (!this.autoplay || this.timer) return;
          this.isPause = false;
          this.timer = setInterval(() => {
            if (!this.repeat && this.activeChild >= this.childItems.length - 1) {
              this.pauseTimer();
            } else {
              this.next();
            }
          }, this.interval || config.defaultCarouselInterval);
        },
        pauseTimer() {
          this.isPause = true;
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = void 0;
          }
        },
        restartTimer() {
          this.pauseTimer();
          this.startTimer();
        },
        checkPause() {
          if (this.pauseHover && this.autoplay) {
            this.pauseTimer();
          }
        },
        /*
         * Change the active item and emit change event.
         * action only for animated slide, there true = next, false = prev
         */
        changeActive(newIndex, direction = 0) {
          if (this.activeChild === newIndex || isNaN(newIndex)) return;
          direction = direction || newIndex - this.activeChild;
          newIndex = this.repeat ? mod(newIndex, this.childItems.length) : bound(newIndex, 0, this.childItems.length - 1);
          this.transition = direction > 0 ? "prev" : "next";
          this.activeChild = newIndex;
          if (newIndex !== this.modelValue) {
            this.$emit("update:modelValue", newIndex);
          }
          this.restartTimer();
          this.$emit("change", newIndex);
        },
        // Indicator trigger when change active item.
        modeChange(trigger, value) {
          if (this.indicatorMode === trigger) {
            return this.changeActive(value);
          }
        },
        prev() {
          this.changeActive(this.activeChild - 1, -1);
        },
        next() {
          this.changeActive(this.activeChild + 1, 1);
        },
        // handle drag event
        dragStart(event) {
          if (!this.hasDrag || !event.target.draggable) return;
          const touches = event.touches;
          this.dragX = touches ? event.changedTouches[0].pageX : event.pageX;
          if (touches) {
            this.pauseTimer();
          } else {
            event.preventDefault();
          }
        },
        dragEnd(event) {
          if (this.dragX === false) return;
          const touches = event.touches;
          const detected = touches ? event.changedTouches[0].pageX : event.pageX;
          const diffX = detected - this.dragX;
          if (Math.abs(diffX) > 30) {
            if (diffX < 0) {
              this.next();
            } else {
              this.prev();
            }
          } else {
            event.target.click();
            this.sortedItems[this.activeChild].$emit("click");
            this.$emit("click");
          }
          if (touches) {
            this.startTimer();
          }
          this.dragX = false;
        }
      },
      mounted() {
        this.startTimer();
      },
      beforeUnmount() {
        this.pauseTimer();
      }
    });

    const _hoisted_1$3 = ["value", "max"];
    const _hoisted_2$1 = {
      key: 1,
      class: "carousel-pause"
    };
    const _hoisted_3$1 = ["onMouseover", "onClick"];
    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["carousel", { "is-overlay": _ctx.overlay }]),
          onMouseenter: _cache[4] || (_cache[4] = (...args) => _ctx.checkPause && _ctx.checkPause(...args)),
          onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.startTimer && _ctx.startTimer(...args))
        },
        [
          _ctx.progress ? (vue.openBlock(), vue.createElementBlock("progress", {
            key: 0,
            class: vue.normalizeClass(["progress", _ctx.progressType]),
            value: _ctx.activeChild,
            max: _ctx.childItems.length - 1
          }, vue.toDisplayString(_ctx.childItems.length - 1), 11, _hoisted_1$3)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: "carousel-items",
              onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.dragStart && _ctx.dragStart(...args)),
              onMouseup: _cache[1] || (_cache[1] = (...args) => _ctx.dragEnd && _ctx.dragEnd(...args)),
              onTouchstart: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.dragStart && _ctx.dragStart(...args), ["stop"])),
              onTouchend: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.dragEnd && _ctx.dragEnd(...args), ["stop"]))
            },
            [
              vue.renderSlot(_ctx.$slots, "default"),
              _ctx.arrow ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(["carousel-arrow", { "is-hovered": _ctx.arrowHover }])
                },
                [
                  vue.withDirectives(vue.createVNode(_component_b_icon, {
                    class: "has-icons-left",
                    onClick: _ctx.prev,
                    pack: _ctx.iconPack,
                    icon: _ctx.iconPrev,
                    size: _ctx.iconSize,
                    both: ""
                  }, null, 8, ["onClick", "pack", "icon", "size"]), [
                    [vue.vShow, _ctx.hasPrev]
                  ]),
                  vue.withDirectives(vue.createVNode(_component_b_icon, {
                    class: "has-icons-right",
                    onClick: _ctx.next,
                    pack: _ctx.iconPack,
                    icon: _ctx.iconNext,
                    size: _ctx.iconSize,
                    both: ""
                  }, null, 8, ["onClick", "pack", "icon", "size"]), [
                    [vue.vShow, _ctx.hasNext]
                  ])
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ],
            32
            /* NEED_HYDRATION */
          ),
          _ctx.autoplay && _ctx.pauseHover && _ctx.pauseInfo && _ctx.isPause ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, [
            vue.createElementVNode(
              "span",
              {
                class: vue.normalizeClass(["tag", _ctx.pauseInfoType])
              },
              vue.toDisplayString(_ctx.pauseText),
              3
              /* TEXT, CLASS */
            )
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.withCarouselList && !_ctx.indicator ? vue.renderSlot(_ctx.$slots, "list", {
            key: 2,
            active: _ctx.activeChild,
            switch: _ctx.changeActive
          }) : vue.createCommentVNode("v-if", true),
          _ctx.indicator ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 3,
              class: vue.normalizeClass(["carousel-indicator", _ctx.indicatorClasses])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.sortedItems, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("a", {
                    class: vue.normalizeClass(["indicator-item", { "is-active": item.isActive }]),
                    onMouseover: ($event) => _ctx.modeChange("hover", index),
                    onClick: ($event) => _ctx.modeChange("click", index),
                    key: item.uniqueValue
                  }, [
                    vue.renderSlot(_ctx.$slots, "indicators", { i: index }, () => [
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass(["indicator-style", _ctx.indicatorStyle])
                        },
                        null,
                        2
                        /* CLASS */
                      )
                    ])
                  ], 42, _hoisted_3$1);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          _ctx.overlay ? vue.renderSlot(_ctx.$slots, "overlay", { key: 4 }) : vue.createCommentVNode("v-if", true)
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    }
    var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);

    var __defProp$2 = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
    var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
    var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
    var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues$2 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp$2.call(b, prop))
          __defNormalProp$2(a, prop, b[prop]);
      if (__getOwnPropSymbols$2)
        for (var prop of __getOwnPropSymbols$2(b)) {
          if (__propIsEnum$2.call(b, prop))
            __defNormalProp$2(a, prop, b[prop]);
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
        mixin.props = __spreadProps(__spreadValues$2({}, mixin.props), {
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
        mixin.computed = __spreadProps(__spreadValues$2({}, mixin.computed), {
          index() {
            return this.order != null ? this.order : this.dynamicIndex;
          }
        });
      }
      return mixin;
    };

    var _sfc_main$2 = vue.defineComponent({
      name: "BCarouselItem",
      mixins: [InjectedChildMixin("carousel", Sorted)],
      data() {
        return {
          transitionName: null
        };
      },
      computed: {
        transition() {
          if (this.parent.animated === "fade") {
            return "fade";
          } else if (this.parent.transition) {
            return "slide-" + this.parent.transition;
          } else {
            return void 0;
          }
        },
        isActive() {
          return this.parent.activeChildIndex === this.index;
        }
      }
    });

    const _hoisted_1$2 = { class: "carousel-item" };
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: _ctx.transition,
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode(
            "div",
            _hoisted_1$2,
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, _ctx.isActive]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    }
    var CarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

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
    const BULMA_KNOWN_RATIO = [
      "square",
      "1by1",
      "5by4",
      "4by3",
      "3by2",
      "5by3",
      "16by9",
      "b2y1",
      "3by1",
      "4by5",
      "3by4",
      "2by3",
      "3by5",
      "9by16",
      "1by2",
      "1by3"
    ];
    function isBulmaKnownRatio(value) {
      return BULMA_KNOWN_RATIO.indexOf(value) !== -1;
    }
    var _sfc_main$1 = vue.defineComponent({
      name: "BImage",
      props: {
        src: String,
        alt: String,
        srcFallback: String,
        webpFallback: {
          type: String,
          default: () => {
            return config.defaultImageWebpFallback;
          }
        },
        lazy: {
          type: Boolean,
          default: () => {
            return config.defaultImageLazy;
          }
        },
        responsive: {
          type: Boolean,
          default: () => {
            return config.defaultImageResponsive;
          }
        },
        ratio: {
          type: String,
          default: () => {
            return config.defaultImageRatio;
          }
        },
        placeholder: String,
        srcset: String,
        srcsetSizes: Array,
        srcsetFormatter: {
          type: Function,
          default: (src, size, vm) => {
            {
              return vm.formatSrcset(src, size);
            }
          }
        },
        rounded: {
          type: Boolean,
          default: false
        },
        captionFirst: {
          type: Boolean,
          default: false
        },
        customClass: String
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        load: (event, src) => true,
        error: (event, src) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          clientWidth: 0,
          webpSupportVerified: false,
          webpSupported: false,
          useNativeLazy: false,
          observer: null,
          inViewPort: false,
          loaded: false,
          failed: false
        };
      },
      computed: {
        ratioPattern() {
          return /([0-9]+)by([0-9]+)/;
        },
        hasRatio() {
          return this.ratio != null && this.ratioPattern.test(this.ratio);
        },
        figureClasses() {
          const classes = { image: this.responsive };
          if (this.hasRatio && isBulmaKnownRatio(this.ratio)) {
            classes[`is-${this.ratio}`] = true;
          }
          return classes;
        },
        figureStyles() {
          if (this.hasRatio && !isBulmaKnownRatio(this.ratio)) {
            const ratioValues = this.ratioPattern.exec(this.ratio);
            return {
              paddingTop: `${+ratioValues[2] / +ratioValues[1] * 100}%`
            };
          }
          return void 0;
        },
        imgClasses() {
          return __spreadValues$1({
            "is-rounded": this.rounded,
            "has-ratio": this.hasRatio
          }, this.customClass ? { [this.customClass]: !!this.customClass } : {});
        },
        srcExt() {
          return this.getExt(this.src);
        },
        isWepb() {
          return this.srcExt === "webp";
        },
        computedSrc() {
          let src = this.src;
          if (this.failed && this.srcFallback) {
            src = this.srcFallback;
          }
          if (!this.webpSupported && this.isWepb && this.webpFallback) {
            if (this.webpFallback.startsWith(".")) {
              return src.replace(/\.webp/gi, `${this.webpFallback}`);
            }
            return this.webpFallback;
          }
          return src;
        },
        computedWidth() {
          if (this.responsive && this.clientWidth > 0) {
            return this.clientWidth;
          }
          return void 0;
        },
        computedNativeLazy() {
          if (this.lazy && this.useNativeLazy) {
            return "lazy";
          }
          return void 0;
        },
        isDisplayed() {
          return (this.webpSupportVerified || !this.isWepb) && (!this.lazy || this.useNativeLazy || this.inViewPort);
        },
        placeholderExt() {
          if (this.placeholder) {
            return this.getExt(this.placeholder);
          }
          return void 0;
        },
        isPlaceholderWepb() {
          if (this.placeholder) {
            return this.placeholderExt === "webp";
          }
          return false;
        },
        computedPlaceholder() {
          if (!this.webpSupported && this.isPlaceholderWepb && this.webpFallback && this.webpFallback.startsWith(".")) {
            return this.placeholder.replace(/\.webp/gi, `${this.webpFallback}`);
          }
          return this.placeholder;
        },
        isPlaceholderDisplayed() {
          return !this.loaded && (this.$slots.placeholder || this.placeholder && (this.webpSupportVerified || !this.isPlaceholderWepb));
        },
        computedSrcset() {
          if (this.srcset) {
            if (!this.webpSupported && this.isWepb && this.webpFallback && this.webpFallback.startsWith(".")) {
              return this.srcset.replace(/\.webp/gi, `${this.webpFallback}`);
            }
            return this.srcset;
          }
          if (this.srcsetSizes && Array.isArray(this.srcsetSizes) && this.srcsetSizes.length > 0) {
            return this.srcsetSizes.map((size) => {
              return `${this.srcsetFormatter(this.computedSrc, size, this)} ${size}w`;
            }).join(",");
          }
          return void 0;
        },
        computedSizes() {
          if (this.computedSrcset && this.computedWidth) {
            return `${this.computedWidth}px`;
          }
          return void 0;
        },
        isCaptionFirst() {
          return this.$slots.caption && this.captionFirst;
        },
        isCaptionLast() {
          return this.$slots.caption && !this.captionFirst;
        }
      },
      methods: {
        getExt(filename, clean = true) {
          if (filename) {
            const noParam = clean ? filename.split("?")[0] : filename;
            return noParam.split(".").pop();
          }
          return "";
        },
        setWidth() {
          this.clientWidth = this.$el.clientWidth;
        },
        formatSrcset(src, size) {
          const ext = this.getExt(src, false);
          const name = src.split(".").slice(0, -1).join(".");
          return `${name}-${size}.${ext}`;
        },
        onLoad(event) {
          this.loaded = true;
          this.emitSrc(event, (src) => this.$emit("load", event, src));
        },
        onError(event) {
          this.emitSrc(event, (src) => this.$emit("error", event, src));
          if (!this.failed) {
            this.failed = true;
          }
        },
        emitSrc(event, emit) {
          const target = event.target;
          emit(target.currentSrc || target.src || this.computedSrc);
        }
      },
      created() {
        if (this.isWepb) {
          isWebpSupported().then((supported) => {
            this.webpSupportVerified = true;
            this.webpSupported = supported;
          });
        }
        if (this.lazy) {
          const nativeLazySupported = typeof window !== "undefined" && "HTMLImageElement" in window && "loading" in HTMLImageElement.prototype;
          const intersectionObserverSupported = typeof window !== "undefined" && "IntersectionObserver" in window;
          if (!nativeLazySupported && intersectionObserverSupported) {
            this.observer = new IntersectionObserver((events) => {
              const { target, isIntersecting } = events[0];
              if (isIntersecting && !this.inViewPort) {
                this.inViewPort = true;
                this.observer.unobserve(target);
              }
            });
          } else {
            this.useNativeLazy = true;
          }
        }
      },
      mounted() {
        if (this.lazy && this.observer) {
          this.observer.observe(this.$el);
        }
        this.setWidth();
        if (typeof window !== "undefined") {
          window.addEventListener("resize", this.setWidth);
        }
      },
      beforeUnmount() {
        if (this.observer) {
          this.observer.disconnect();
        }
        if (typeof window !== "undefined") {
          window.removeEventListener("resize", this.setWidth);
        }
      }
    });

    const _hoisted_1$1 = { key: 0 };
    const _hoisted_2 = ["srcset", "src", "alt", "width", "sizes", "loading"];
    const _hoisted_3 = ["src", "alt"];
    const _hoisted_4 = { key: 1 };
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "figure",
        {
          class: vue.normalizeClass(["b-image-wrapper", _ctx.figureClasses]),
          style: vue.normalizeStyle(_ctx.figureStyles)
        },
        [
          _ctx.isCaptionFirst ? (vue.openBlock(), vue.createElementBlock("figcaption", _hoisted_1$1, [
            vue.renderSlot(_ctx.$slots, "caption")
          ])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.Transition, { name: "fade" }, {
            default: vue.withCtx(() => [
              _ctx.isDisplayed ? (vue.openBlock(), vue.createElementBlock("img", {
                key: 0,
                srcset: _ctx.computedSrcset,
                src: _ctx.computedSrc,
                alt: _ctx.alt,
                class: vue.normalizeClass(_ctx.imgClasses),
                width: _ctx.computedWidth,
                sizes: _ctx.computedSizes,
                loading: _ctx.computedNativeLazy,
                onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
                onError: _cache[1] || (_cache[1] = (...args) => _ctx.onError && _ctx.onError(...args))
              }, null, 42, _hoisted_2)) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(vue.Transition, { name: "fade" }, {
            default: vue.withCtx(() => [
              _ctx.isPlaceholderDisplayed ? vue.renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
                vue.createElementVNode("img", {
                  src: _ctx.computedPlaceholder,
                  alt: _ctx.alt,
                  class: vue.normalizeClass([_ctx.imgClasses, "placeholder"])
                }, null, 10, _hoisted_3)
              ]) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }),
          _ctx.isCaptionLast ? (vue.openBlock(), vue.createElementBlock("figcaption", _hoisted_4, [
            vue.renderSlot(_ctx.$slots, "caption")
          ])) : vue.createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    }
    var BImage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    var __defProp = Object.defineProperty;
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
    var _sfc_main = vue.defineComponent({
      name: "BCarouselList",
      components: {
        BIcon,
        BImage
      },
      props: {
        data: {
          type: Array,
          default: () => []
        },
        modelValue: {
          type: Number,
          default: 0
        },
        scrollValue: {
          type: Number,
          default: 0
        },
        hasDrag: {
          type: Boolean,
          default: true
        },
        hasGrayscale: Boolean,
        hasOpacity: Boolean,
        repeat: Boolean,
        itemsToShow: {
          type: Number,
          default: 4
        },
        itemsToList: {
          type: Number,
          default: 1
        },
        asIndicator: Boolean,
        arrow: {
          type: Boolean,
          default: true
        },
        arrowHover: {
          type: Boolean,
          default: true
        },
        iconPack: String,
        iconSize: String,
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
        breakpoints: {
          type: Object,
          default: () => ({})
        }
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        switch: (_value) => true,
        "update:modelValue": (_value) => true,
        "updated:scroll": (_index) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          activeItem: this.modelValue,
          scrollIndex: this.asIndicator ? this.scrollValue : this.modelValue,
          delta: 0,
          dragX: false,
          hold: 0,
          windowWidth: 0,
          touch: false,
          observer: null,
          refresh_: 0
        };
      },
      computed: {
        dragging() {
          return this.dragX !== false;
        },
        listClass() {
          return [
            {
              "has-grayscale": this.settings.hasGrayscale,
              "has-opacity": this.settings.hasOpacity,
              "is-dragging": this.dragging
            }
          ];
        },
        itemStyle() {
          return `width: ${this.itemWidth}px;`;
        },
        translation() {
          return -bound(
            this.delta + this.scrollIndex * this.itemWidth,
            0,
            (this.data.length - this.settings.itemsToShow) * this.itemWidth
          );
        },
        total() {
          return this.data.length - this.settings.itemsToShow;
        },
        hasPrev() {
          return this.settings.repeat || this.scrollIndex > 0;
        },
        hasNext() {
          return this.settings.repeat || this.scrollIndex < this.total;
        },
        breakpointKeys() {
          return Object.keys(this.breakpoints).sort((a, b) => +b - +a);
        },
        settings() {
          const breakpoint = this.breakpointKeys.filter((breakpoint2) => {
            if (this.windowWidth >= +breakpoint2) {
              return true;
            } else {
              return false;
            }
          })[0];
          if (breakpoint) {
            return __spreadValues(__spreadValues({}, this.$props), this.breakpoints[+breakpoint]);
          }
          return this.$props;
        },
        itemWidth() {
          if (this.windowWidth) {
            this.refresh_;
            const rect = this.$el.getBoundingClientRect();
            return rect.width / this.settings.itemsToShow;
          }
          return 0;
        }
      },
      watch: {
        /*
         * When v-model is changed set the new active item.
         */
        modelValue(value) {
          this.switchTo(this.asIndicator ? value - (this.itemsToShow - 3) / 2 : value);
          if (this.activeItem !== value) {
            this.activeItem = bound(value, 0, this.data.length - 1);
          }
        },
        scrollValue(value) {
          this.switchTo(value);
        }
      },
      methods: {
        resized() {
          this.windowWidth = window.innerWidth;
        },
        switchTo(newIndex) {
          if (newIndex === this.scrollIndex || isNaN(newIndex)) {
            return;
          }
          if (this.settings.repeat) {
            newIndex = mod(newIndex, this.total + 1);
          }
          newIndex = bound(newIndex, 0, this.total);
          this.scrollIndex = newIndex;
          if (!this.asIndicator && this.modelValue !== newIndex) {
            this.$emit("update:modelValue", newIndex);
          } else if (this.scrollIndex !== newIndex) {
            this.$emit("updated:scroll", newIndex);
          }
        },
        next() {
          this.switchTo(this.scrollIndex + this.settings.itemsToList);
        },
        prev() {
          this.switchTo(this.scrollIndex - this.settings.itemsToList);
        },
        checkAsIndicator(value, event) {
          if (!this.asIndicator) return;
          const dragEndX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
          if (this.hold - Date.now() > 2e3 || Math.abs(+this.dragX - dragEndX) > 10) return;
          this.dragX = false;
          this.hold = 0;
          event.preventDefault();
          this.activeItem = value;
          this.$emit("switch", value);
        },
        // handle drag event
        dragStart(event) {
          if (this.dragging || !this.settings.hasDrag || event.button !== 0 && event.type !== "touchstart") return;
          this.hold = Date.now();
          this.touch = !!event.touches;
          this.dragX = this.touch ? event.touches[0].clientX : event.clientX;
          window.addEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove);
          window.addEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd);
        },
        dragMove(event) {
          if (!this.dragging) return;
          const dragEndX = event.touches ? (event.changedTouches[0] || event.touches[0]).clientX : event.clientX;
          this.delta = +this.dragX - dragEndX;
          if (!event.touches) {
            event.preventDefault();
          }
        },
        dragEnd() {
          if (!this.dragging && !this.hold) return;
          if (this.hold) {
            const signCheck = sign(this.delta);
            const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15);
            this.switchTo(this.scrollIndex + signCheck * results);
          }
          this.delta = 0;
          this.dragX = false;
          window.removeEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove);
          window.removeEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd);
        },
        refresh() {
          this.$nextTick(() => {
            this.refresh_++;
          });
        }
      },
      mounted() {
        if (typeof window !== "undefined") {
          if (window.ResizeObserver) {
            this.observer = new ResizeObserver(this.refresh);
            this.observer.observe(this.$el);
          }
          window.addEventListener("resize", this.resized);
          document.addEventListener("animationend", this.refresh);
          document.addEventListener("transitionend", this.refresh);
          document.addEventListener("transitionstart", this.refresh);
          this.resized();
        }
        if (this.$attrs.config) {
          throw new Error("The config prop was removed, you need to use v-bind instead");
        }
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          if (window.ResizeObserver) {
            this.observer.disconnect();
          }
          window.removeEventListener("resize", this.resized);
          document.removeEventListener("animationend", this.refresh);
          document.removeEventListener("transitionend", this.refresh);
          document.removeEventListener("transitionstart", this.refresh);
          this.dragEnd();
        }
      }
    });

    const _hoisted_1 = ["onMouseup", "onTouchend"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_image = vue.resolveComponent("b-image");
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["carousel-list", { "has-shadow": _ctx.scrollIndex > 0 }]),
          onMousedown: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.dragStart && _ctx.dragStart(...args), ["prevent"])),
          onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.dragStart && _ctx.dragStart(...args))
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(["carousel-slides", _ctx.listClass]),
              style: vue.normalizeStyle("transform:translateX(" + _ctx.translation + "px)")
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.data, (list, index) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    class: vue.normalizeClass(["carousel-slide", { "is-active": _ctx.asIndicator ? _ctx.activeItem === index : _ctx.scrollIndex === index }]),
                    onMouseup: ($event) => _ctx.checkAsIndicator(index, $event),
                    onTouchend: ($event) => _ctx.checkAsIndicator(index, $event),
                    key: index,
                    style: vue.normalizeStyle(_ctx.itemStyle)
                  }, [
                    vue.renderSlot(_ctx.$slots, "item", vue.mergeProps({
                      index,
                      active: _ctx.activeItem,
                      scroll: _ctx.scrollIndex
                    }, list, { list }), () => [
                      vue.createVNode(_component_b_image, vue.mergeProps({
                        src: list.image
                      }, list), null, 16, ["src"])
                    ])
                  ], 46, _hoisted_1);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            6
            /* CLASS, STYLE */
          ),
          _ctx.arrow ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(["carousel-arrow", { "is-hovered": _ctx.settings.arrowHover }])
            },
            [
              vue.withDirectives(vue.createVNode(_component_b_icon, {
                class: "has-icons-left",
                onClick: vue.withModifiers(_ctx.prev, ["prevent"]),
                pack: _ctx.settings.iconPack,
                icon: _ctx.settings.iconPrev,
                size: _ctx.settings.iconSize,
                both: ""
              }, null, 8, ["onClick", "pack", "icon", "size"]), [
                [vue.vShow, _ctx.hasPrev]
              ]),
              vue.withDirectives(vue.createVNode(_component_b_icon, {
                class: "has-icons-right",
                onClick: vue.withModifiers(_ctx.next, ["prevent"]),
                pack: _ctx.settings.iconPack,
                icon: _ctx.settings.iconNext,
                size: _ctx.settings.iconSize,
                both: ""
              }, null, 8, ["onClick", "pack", "icon", "size"]), [
                [vue.vShow, _ctx.hasNext]
              ])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    }
    var CarouselList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Carousel);
        registerComponent(Vue, CarouselItem);
        registerComponent(Vue, CarouselList);
      }
    };

    exports.BCarousel = Carousel;
    exports.BCarouselItem = CarouselItem;
    exports.BCarouselList = CarouselList;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
