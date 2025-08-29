import { defineComponent, createElementBlock, openBlock, normalizeStyle, normalizeClass, createCommentVNode, createVNode, renderSlot, Transition, withCtx, createElementVNode } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { isWebpSupported } from './helpers.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

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
var _sfc_main = defineComponent({
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
        if (typeof config.defaultImageSrcsetFormatter === "function") {
          return config.defaultImageSrcsetFormatter(src, size);
        } else {
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
      return __spreadValues({
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

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["srcset", "src", "alt", "width", "sizes", "loading"];
const _hoisted_3 = ["src", "alt"];
const _hoisted_4 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "figure",
    {
      class: normalizeClass(["b-image-wrapper", _ctx.figureClasses]),
      style: normalizeStyle(_ctx.figureStyles)
    },
    [
      _ctx.isCaptionFirst ? (openBlock(), createElementBlock("figcaption", _hoisted_1, [
        renderSlot(_ctx.$slots, "caption")
      ])) : createCommentVNode("v-if", true),
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          _ctx.isDisplayed ? (openBlock(), createElementBlock("img", {
            key: 0,
            srcset: _ctx.computedSrcset,
            src: _ctx.computedSrc,
            alt: _ctx.alt,
            class: normalizeClass(_ctx.imgClasses),
            width: _ctx.computedWidth,
            sizes: _ctx.computedSizes,
            loading: _ctx.computedNativeLazy,
            onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
            onError: _cache[1] || (_cache[1] = (...args) => _ctx.onError && _ctx.onError(...args))
          }, null, 42, _hoisted_2)) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          _ctx.isPlaceholderDisplayed ? renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
            createElementVNode("img", {
              src: _ctx.computedPlaceholder,
              alt: _ctx.alt,
              class: normalizeClass([_ctx.imgClasses, "placeholder"])
            }, null, 10, _hoisted_3)
          ]) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }),
      _ctx.isCaptionLast ? (openBlock(), createElementBlock("figcaption", _hoisted_4, [
        renderSlot(_ctx.$slots, "caption")
      ])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var Image = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Image as I };
