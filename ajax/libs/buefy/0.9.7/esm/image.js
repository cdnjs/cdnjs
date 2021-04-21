import './chunk-1fafdf15.js';
import { isWebpSupported } from './helpers.js';
import { c as config } from './chunk-953eb524.js';
import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-cca88db8.js';

//
var script = {
  name: 'BImage',
  props: {
    src: String,
    alt: String,
    srcFallback: String,
    webpFallback: {
      type: String,
      default: function _default() {
        return config.defaultImageWebpFallback;
      }
    },
    lazy: {
      type: Boolean,
      default: function _default() {
        return config.defaultImageLazy;
      }
    },
    responsive: {
      type: Boolean,
      default: function _default() {
        return config.defaultImageResponsive;
      }
    },
    ratio: {
      type: String,
      default: function _default() {
        return config.defaultImageRatio;
      }
    },
    placeholder: String,
    srcset: String,
    srcsetSizes: Array,
    srcsetFormatter: {
      type: Function,
      default: function _default(src, size, vm) {
        if (typeof config.defaultImageSrcsetFormatter === 'function') {
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
    }
  },
  data: function data() {
    return {
      clientWidth: 0,
      webpSupportVerified: false,
      webpSupported: false,
      useNativeLazy: false,
      observer: null,
      inViewPort: false,
      bulmaKnownRatio: ['square', '1by1', '5by4', '4by3', '3by2', '5by3', '16by9', 'b2y1', '3by1', '4by5', '3by4', '2by3', '3by5', '9by16', '1by2', '1by3'],
      loaded: false,
      failed: false
    };
  },
  computed: {
    ratioPattern: function ratioPattern() {
      return new RegExp(/([0-9]+)by([0-9]+)/);
    },
    hasRatio: function hasRatio() {
      return this.ratio && this.ratioPattern.test(this.ratio);
    },
    figureClasses: function figureClasses() {
      var classes = {
        image: this.responsive
      };

      if (this.hasRatio && this.bulmaKnownRatio.indexOf(this.ratio) >= 0) {
        classes["is-".concat(this.ratio)] = true;
      }

      return classes;
    },
    figureStyles: function figureStyles() {
      if (this.hasRatio && this.bulmaKnownRatio.indexOf(this.ratio) < 0) {
        var ratioValues = this.ratioPattern.exec(this.ratio);
        return {
          paddingTop: "".concat(ratioValues[2] / ratioValues[1] * 100, "%")
        };
      }
    },
    imgClasses: function imgClasses() {
      return {
        'is-rounded': this.rounded,
        'has-ratio': this.hasRatio
      };
    },
    srcExt: function srcExt() {
      return this.getExt(this.src);
    },
    isWepb: function isWepb() {
      return this.srcExt === 'webp';
    },
    computedSrc: function computedSrc() {
      var src = this.src;

      if (this.failed && this.srcFallback) {
        src = this.srcFallback;
      }

      if (!this.webpSupported && this.isWepb && this.webpFallback) {
        if (this.webpFallback.startsWith('.')) {
          return src.replace(/\.webp/gi, "".concat(this.webpFallback));
        }

        return this.webpFallback;
      }

      return src;
    },
    computedWidth: function computedWidth() {
      if (this.responsive && this.clientWidth > 0) {
        return this.clientWidth;
      }
    },
    computedNativeLazy: function computedNativeLazy() {
      if (this.lazy && this.useNativeLazy) {
        return 'lazy';
      }
    },
    isDisplayed: function isDisplayed() {
      return (this.webpSupportVerified || !this.isWepb) && (!this.lazy || this.useNativeLazy || this.inViewPort);
    },
    placeholderExt: function placeholderExt() {
      if (this.placeholder) {
        return this.getExt(this.placeholder);
      }
    },
    isPlaceholderWepb: function isPlaceholderWepb() {
      if (this.placeholder) {
        return this.placeholderExt === 'webp';
      }
    },
    computedPlaceholder: function computedPlaceholder() {
      if (!this.webpSupported && this.isPlaceholderWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
        return this.placeholder.replace(/\.webp/gi, "".concat(this.webpFallback));
      }

      return this.placeholder;
    },
    isPlaceholderDisplayed: function isPlaceholderDisplayed() {
      return !this.loaded && (this.$slots.placeholder || this.placeholder && (this.webpSupportVerified || !this.isPlaceholderWepb));
    },
    computedSrcset: function computedSrcset() {
      var _this = this;

      if (this.srcset) {
        if (!this.webpSupported && this.isWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
          return this.srcset.replace(/\.webp/gi, "".concat(this.webpFallback));
        }

        return this.srcset;
      }

      if (this.srcsetSizes && Array.isArray(this.srcsetSizes) && this.srcsetSizes.length > 0) {
        return this.srcsetSizes.map(function (size) {
          return "".concat(_this.srcsetFormatter(_this.computedSrc, size, _this), " ").concat(size, "w");
        }).join(',');
      }
    },
    computedSizes: function computedSizes() {
      if (this.computedSrcset && this.computedWidth) {
        return "".concat(this.computedWidth, "px");
      }
    },
    isCaptionFirst: function isCaptionFirst() {
      return this.$slots.caption && this.captionFirst;
    },
    isCaptionLast: function isCaptionLast() {
      return this.$slots.caption && !this.captionFirst;
    }
  },
  methods: {
    getExt: function getExt(filename) {
      var clean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (filename) {
        var noParam = clean ? filename.split('?')[0] : filename;
        return noParam.split('.').pop();
      }

      return '';
    },
    setWidth: function setWidth() {
      this.clientWidth = this.$el.clientWidth;
    },
    formatSrcset: function formatSrcset(src, size) {
      var ext = this.getExt(src, false);
      var name = src.split('.').slice(0, -1).join('.');
      return "".concat(name, "-").concat(size, ".").concat(ext);
    },
    onLoad: function onLoad(event) {
      this.loaded = true;
      this.emit('load', event);
    },
    onError: function onError(event) {
      this.emit('error', event);

      if (!this.failed) {
        this.failed = true;
      }
    },
    emit: function emit(eventName, event) {
      var target = event.target;
      this.$emit(eventName, event, target.currentSrc || target.src || this.computedSrc);
    }
  },
  created: function created() {
    var _this2 = this;

    if (this.isWepb) {
      isWebpSupported().then(function (supported) {
        _this2.webpSupportVerified = true;
        _this2.webpSupported = supported;
      });
    }

    if (this.lazy) {
      // We use native lazy loading if supported
      // We try to use Intersection Observer if native lazy loading is not supported
      // We use the lazy attribute anyway if we cannot detect support (SSR for example).
      var nativeLazySupported = typeof window !== 'undefined' && 'HTMLImageElement' in window && 'loading' in HTMLImageElement.prototype;
      var intersectionObserverSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;

      if (!nativeLazySupported && intersectionObserverSupported) {
        this.observer = new IntersectionObserver(function (events) {
          var _events$ = events[0],
              target = _events$.target,
              isIntersecting = _events$.isIntersecting;

          if (isIntersecting && !_this2.inViewPort) {
            _this2.inViewPort = true;

            _this2.observer.unobserve(target);
          }
        });
      } else {
        this.useNativeLazy = true;
      }
    }
  },
  mounted: function mounted() {
    if (this.lazy && this.observer) {
      this.observer.observe(this.$el);
    }

    this.setWidth();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.setWidth);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.setWidth);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"b-image-wrapper",class:_vm.figureClasses,style:(_vm.figureStyles)},[(_vm.isCaptionFirst)?_c('figcaption',[_vm._t("caption")],2):_vm._e(),_c('transition',{attrs:{"name":"fade"}},[(_vm.isDisplayed)?_c('img',{class:_vm.imgClasses,attrs:{"srcset":_vm.computedSrcset,"src":_vm.computedSrc,"alt":_vm.alt,"width":_vm.computedWidth,"sizes":_vm.computedSizes,"loading":_vm.computedNativeLazy},on:{"load":_vm.onLoad,"error":_vm.onError}}):_vm._e()]),_c('transition',{attrs:{"name":"fade"}},[(_vm.isPlaceholderDisplayed)?_vm._t("placeholder",[_c('img',{staticClass:"placeholder",class:_vm.imgClasses,attrs:{"src":_vm.computedPlaceholder,"alt":_vm.alt}})]):_vm._e()],2),(_vm.isCaptionLast)?_c('figcaption',[_vm._t("caption")],2):_vm._e()],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Image = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Image);
  }
};
use(Plugin);

export default Plugin;
export { Image as BImage };
