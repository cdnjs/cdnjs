'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var config = require('./config-DR826Ki2.js');
var Icon = require('./Icon-lsDKE2wQ.js');
var InjectedChildMixin = require('./InjectedChildMixin-CUKn09dB.js');
var helpers = require('./helpers.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var Image = require('./Image-CocPwU3n.js');
var plugins = require('./plugins-DbyYGVpp.js');

var _sfc_main$2 = vue.defineComponent({
  name: "BCarousel",
  components: {
    BIcon: Icon.BIcon
  },
  mixins: [InjectedChildMixin.ProviderParentMixin("carousel", InjectedChildMixin.Sorted)],
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
        return config.config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.config.defaultIconNext;
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
      }, this.interval || config.config.defaultCarouselInterval);
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
      newIndex = this.repeat ? helpers.mod(newIndex, this.childItems.length) : helpers.bound(newIndex, 0, this.childItems.length - 1);
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

const _hoisted_1$2 = ["value", "max"];
const _hoisted_2 = {
  key: 1,
  class: "carousel-pause"
};
const _hoisted_3 = ["onMouseover", "onClick"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
      }, vue.toDisplayString(_ctx.childItems.length - 1), 11, _hoisted_1$2)) : vue.createCommentVNode("v-if", true),
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
      _ctx.autoplay && _ctx.pauseHover && _ctx.pauseInfo && _ctx.isPause ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
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
              ], 42, _hoisted_3);
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
var Carousel = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

var _sfc_main$1 = vue.defineComponent({
  name: "BCarouselItem",
  mixins: [InjectedChildMixin.InjectedChildMixin("carousel", InjectedChildMixin.Sorted$1)],
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

const _hoisted_1$1 = { class: "carousel-item" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: _ctx.transition,
    persisted: ""
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode(
        "div",
        _hoisted_1$1,
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
var CarouselItem = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

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
    BIcon: Icon.BIcon,
    BImage: Image.Image
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
        return config.config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.config.defaultIconNext;
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
      return -helpers.bound(
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
        this.activeItem = helpers.bound(value, 0, this.data.length - 1);
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
        newIndex = helpers.mod(newIndex, this.total + 1);
      }
      newIndex = helpers.bound(newIndex, 0, this.total);
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
        const signCheck = helpers.sign(this.delta);
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
var CarouselList = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Carousel);
    plugins.registerComponent(Vue, CarouselItem);
    plugins.registerComponent(Vue, CarouselList);
  }
};

exports.BCarousel = Carousel;
exports.BCarouselItem = CarouselItem;
exports.BCarouselList = CarouselList;
exports.default = Plugin;
