/*!
 * Jarallax v2.1.3 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jarallax = factory());
})(this, (function () { 'use strict';

  /**
   * Document ready callback.
   * @param {Function} callback - callback will be fired once Document ready.
   */
  function ready(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Already ready or interactive, execute callback
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback, {
        capture: true,
        once: true,
        passive: true
      });
    }
  }

  /* eslint-disable import/no-mutable-exports */
  /* eslint-disable no-restricted-globals */
  let win;
  if (typeof window !== 'undefined') {
    win = window;
  } else if (typeof global !== 'undefined') {
    win = global;
  } else if (typeof self !== 'undefined') {
    win = self;
  } else {
    win = {};
  }
  var global$1 = win;

  var defaults = {
    // Base parallax options.
    type: 'scroll',
    speed: 0.5,
    containerClass: 'jarallax-container',
    imgSrc: null,
    imgElement: '.jarallax-img',
    imgSize: 'cover',
    imgPosition: '50% 50%',
    imgRepeat: 'no-repeat',
    keepImg: false,
    elementInViewport: null,
    zIndex: -100,
    disableParallax: false,
    // Callbacks.
    onScroll: null,
    onInit: null,
    onDestroy: null,
    onCoverImage: null,
    // Video options.
    videoClass: 'jarallax-video',
    videoSrc: null,
    videoStartTime: 0,
    videoEndTime: 0,
    videoVolume: 0,
    videoLoop: true,
    videoPlayOnlyVisible: true,
    videoLazyLoading: true,
    disableVideo: false,
    // Video callbacks.
    onVideoInsert: null,
    onVideoWorkerInit: null
  };

  /**
   * Add styles to element.
   *
   * @param {Element} el - element.
   * @param {String|Object} styles - styles list.
   *
   * @returns {Element}
   */
  function css(el, styles) {
    if (typeof styles === 'string') {
      return global$1.getComputedStyle(el).getPropertyValue(styles);
    }
    Object.keys(styles).forEach(key => {
      el.style[key] = styles[key];
    });
    return el;
  }

  /**
   * Extend like jQuery.extend
   *
   * @param {Object} out - output object.
   * @param {...any} args - additional objects to extend.
   *
   * @returns {Object}
   */
  function extend(out, ...args) {
    out = out || {};
    Object.keys(args).forEach(i => {
      if (!args[i]) {
        return;
      }
      Object.keys(args[i]).forEach(key => {
        out[key] = args[i][key];
      });
    });
    return out;
  }

  /**
   * Get all parents of the element.
   *
   * @param {Element} elem - DOM element.
   *
   * @returns {Array}
   */
  function getParents(elem) {
    const parents = [];
    while (elem.parentElement !== null) {
      elem = elem.parentElement;
      if (elem.nodeType === 1) {
        parents.push(elem);
      }
    }
    return parents;
  }

  const {
    navigator: navigator$1
  } = global$1;
  const mobileAgent = /*#__PURE__*/ /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator$1.userAgent);
  function isMobile() {
    return mobileAgent;
  }

  let wndW;
  let wndH;
  let $deviceHelper;

  /**
   * The most popular mobile browsers changes height after page scroll and this generates image jumping.
   * We can fix it using this workaround with vh units.
   */
  function getDeviceHeight() {
    if (!$deviceHelper && document.body) {
      $deviceHelper = document.createElement('div');
      $deviceHelper.style.cssText = 'position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;';
      document.body.appendChild($deviceHelper);
    }
    return ($deviceHelper ? $deviceHelper.clientHeight : 0) || global$1.innerHeight || document.documentElement.clientHeight;
  }
  function updateWindowHeight() {
    wndW = global$1.innerWidth || document.documentElement.clientWidth;
    if (isMobile()) {
      wndH = getDeviceHeight();
    } else {
      wndH = global$1.innerHeight || document.documentElement.clientHeight;
    }
  }
  updateWindowHeight();
  global$1.addEventListener('resize', updateWindowHeight);
  global$1.addEventListener('orientationchange', updateWindowHeight);
  global$1.addEventListener('load', updateWindowHeight);
  ready(() => {
    updateWindowHeight();
  });
  function getWindowSize() {
    return {
      width: wndW,
      height: wndH
    };
  }

  // List with all jarallax instances
  // need to render all in one scroll/resize event.
  const jarallaxList = [];
  function updateParallax() {
    if (!jarallaxList.length) {
      return;
    }
    const {
      width: wndW,
      height: wndH
    } = getWindowSize();
    jarallaxList.forEach((data, k) => {
      const {
        instance,
        oldData
      } = data;
      if (!instance.isVisible()) {
        return;
      }
      const clientRect = instance.$item.getBoundingClientRect();
      const newData = {
        width: clientRect.width,
        height: clientRect.height,
        top: clientRect.top,
        bottom: clientRect.bottom,
        wndW,
        wndH
      };
      const isResized = !oldData || oldData.wndW !== newData.wndW || oldData.wndH !== newData.wndH || oldData.width !== newData.width || oldData.height !== newData.height;
      const isScrolled = isResized || !oldData || oldData.top !== newData.top || oldData.bottom !== newData.bottom;
      jarallaxList[k].oldData = newData;
      if (isResized) {
        instance.onResize();
      }
      if (isScrolled) {
        instance.onScroll();
      }
    });
    global$1.requestAnimationFrame(updateParallax);
  }
  const visibilityObserver = /*#__PURE__*/new global$1.IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.jarallax.isElementInViewport = entry.isIntersecting;
    });
  }, {
    // We have to start parallax calculation before the block is in view
    // to prevent possible parallax jumping.
    rootMargin: '50px'
  });
  function addObserver(instance) {
    jarallaxList.push({
      instance
    });
    if (jarallaxList.length === 1) {
      global$1.requestAnimationFrame(updateParallax);
    }
    visibilityObserver.observe(instance.options.elementInViewport || instance.$item);
  }
  function removeObserver(instance) {
    jarallaxList.forEach((data, key) => {
      if (data.instance.instanceID === instance.instanceID) {
        jarallaxList.splice(key, 1);
      }
    });
    visibilityObserver.unobserve(instance.options.elementInViewport || instance.$item);
  }

  /* eslint-disable class-methods-use-this */
  const {
    navigator
  } = global$1;
  let instanceID = 0;

  // Jarallax class
  class Jarallax {
    constructor(item, userOptions) {
      const self = this;
      self.instanceID = instanceID;
      instanceID += 1;
      self.$item = item;
      self.defaults = {
        ...defaults
      };

      // prepare data-options
      const dataOptions = self.$item.dataset || {};
      const pureDataOptions = {};
      Object.keys(dataOptions).forEach(key => {
        const lowerCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);
        if (lowerCaseOption && typeof self.defaults[lowerCaseOption] !== 'undefined') {
          pureDataOptions[lowerCaseOption] = dataOptions[key];
        }
      });
      self.options = self.extend({}, self.defaults, pureDataOptions, userOptions);
      self.pureOptions = self.extend({}, self.options);

      // prepare 'true' and 'false' strings to boolean
      Object.keys(self.options).forEach(key => {
        if (self.options[key] === 'true') {
          self.options[key] = true;
        } else if (self.options[key] === 'false') {
          self.options[key] = false;
        }
      });

      // fix speed option [-1.0, 2.0]
      self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed)));

      // prepare disableParallax callback
      if (typeof self.options.disableParallax === 'string') {
        self.options.disableParallax = new RegExp(self.options.disableParallax);
      }
      if (self.options.disableParallax instanceof RegExp) {
        const disableParallaxRegexp = self.options.disableParallax;
        self.options.disableParallax = () => disableParallaxRegexp.test(navigator.userAgent);
      }
      if (typeof self.options.disableParallax !== 'function') {
        self.options.disableParallax = () => false;
      }

      // prepare disableVideo callback
      if (typeof self.options.disableVideo === 'string') {
        self.options.disableVideo = new RegExp(self.options.disableVideo);
      }
      if (self.options.disableVideo instanceof RegExp) {
        const disableVideoRegexp = self.options.disableVideo;
        self.options.disableVideo = () => disableVideoRegexp.test(navigator.userAgent);
      }
      if (typeof self.options.disableVideo !== 'function') {
        self.options.disableVideo = () => false;
      }

      // custom element to check if parallax in viewport
      let elementInVP = self.options.elementInViewport;
      // get first item from array
      if (elementInVP && typeof elementInVP === 'object' && typeof elementInVP.length !== 'undefined') {
        [elementInVP] = elementInVP;
      }
      // check if dom element
      if (!(elementInVP instanceof Element)) {
        elementInVP = null;
      }
      self.options.elementInViewport = elementInVP;
      self.image = {
        src: self.options.imgSrc || null,
        $container: null,
        useImgTag: false,
        // 1. Position fixed is needed for the most of browsers because absolute position have glitches
        // 2. On MacOS with smooth scroll there is a huge lags with absolute position - https://github.com/nk-o/jarallax/issues/75
        // 3. Previously used 'absolute' for mobile devices. But we re-tested on iPhone 12 and 'fixed' position is working better, then 'absolute', so for now position is always 'fixed'
        position: 'fixed'
      };
      if (self.initImg() && self.canInitParallax()) {
        self.init();
      }
    }
    css(el, styles) {
      return css(el, styles);
    }
    extend(out, ...args) {
      return extend(out, ...args);
    }

    // get window size and scroll position. Useful for extensions
    getWindowData() {
      const {
        width,
        height
      } = getWindowSize();
      return {
        width,
        height,
        y: document.documentElement.scrollTop
      };
    }

    // Jarallax functions
    initImg() {
      const self = this;

      // find image element
      let $imgElement = self.options.imgElement;
      if ($imgElement && typeof $imgElement === 'string') {
        $imgElement = self.$item.querySelector($imgElement);
      }

      // check if dom element
      if (!($imgElement instanceof Element)) {
        if (self.options.imgSrc) {
          $imgElement = new Image();
          $imgElement.src = self.options.imgSrc;
        } else {
          $imgElement = null;
        }
      }
      if ($imgElement) {
        if (self.options.keepImg) {
          self.image.$item = $imgElement.cloneNode(true);
        } else {
          self.image.$item = $imgElement;
          self.image.$itemParent = $imgElement.parentNode;
        }
        self.image.useImgTag = true;
      }

      // true if there is img tag
      if (self.image.$item) {
        return true;
      }

      // get image src
      if (self.image.src === null) {
        self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        self.image.bgImage = self.css(self.$item, 'background-image');
      }
      return !(!self.image.bgImage || self.image.bgImage === 'none');
    }
    canInitParallax() {
      return !this.options.disableParallax();
    }
    init() {
      const self = this;
      const containerStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      };
      let imageStyles = {
        pointerEvents: 'none',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      };
      if (!self.options.keepImg) {
        // save default user styles
        const curStyle = self.$item.getAttribute('style');
        if (curStyle) {
          self.$item.setAttribute('data-jarallax-original-styles', curStyle);
        }
        if (self.image.useImgTag) {
          const curImgStyle = self.image.$item.getAttribute('style');
          if (curImgStyle) {
            self.image.$item.setAttribute('data-jarallax-original-styles', curImgStyle);
          }
        }
      }

      // set relative position and z-index to the parent
      if (self.css(self.$item, 'position') === 'static') {
        self.css(self.$item, {
          position: 'relative'
        });
      }
      if (self.css(self.$item, 'z-index') === 'auto') {
        self.css(self.$item, {
          zIndex: 0
        });
      }

      // container for parallax image
      self.image.$container = document.createElement('div');
      self.css(self.image.$container, containerStyles);
      self.css(self.image.$container, {
        'z-index': self.options.zIndex
      });

      // it will remove some image overlapping
      // overlapping occur due to an image position fixed inside absolute position element
      // needed only when background in fixed position
      if (this.image.position === 'fixed') {
        self.css(self.image.$container, {
          '-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        });
      }

      // Add container unique ID.
      self.image.$container.setAttribute('id', `jarallax-container-${self.instanceID}`);

      // Add container class.
      if (self.options.containerClass) {
        self.image.$container.setAttribute('class', self.options.containerClass);
      }
      self.$item.appendChild(self.image.$container);

      // use img tag
      if (self.image.useImgTag) {
        imageStyles = self.extend({
          'object-fit': self.options.imgSize,
          'object-position': self.options.imgPosition,
          'max-width': 'none'
        }, containerStyles, imageStyles);

        // use div with background image
      } else {
        self.image.$item = document.createElement('div');
        if (self.image.src) {
          imageStyles = self.extend({
            'background-position': self.options.imgPosition,
            'background-size': self.options.imgSize,
            'background-repeat': self.options.imgRepeat,
            'background-image': self.image.bgImage || `url("${self.image.src}")`
          }, containerStyles, imageStyles);
        }
      }
      if (self.options.type === 'opacity' || self.options.type === 'scale' || self.options.type === 'scale-opacity' || self.options.speed === 1) {
        self.image.position = 'absolute';
      }

      // 1. Check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
      //    discussion - https://github.com/nk-o/jarallax/issues/9
      // 2. Check if parents have overflow scroll
      if (self.image.position === 'fixed') {
        const $parents = getParents(self.$item).filter(el => {
          const styles = global$1.getComputedStyle(el);
          const parentTransform = styles['-webkit-transform'] || styles['-moz-transform'] || styles.transform;
          const overflowRegex = /(auto|scroll)/;
          return parentTransform && parentTransform !== 'none' || overflowRegex.test(styles.overflow + styles['overflow-y'] + styles['overflow-x']);
        });
        self.image.position = $parents.length ? 'absolute' : 'fixed';
      }

      // add position to parallax block
      imageStyles.position = self.image.position;

      // insert parallax image
      self.css(self.image.$item, imageStyles);
      self.image.$container.appendChild(self.image.$item);

      // set initial position and size
      self.onResize();
      self.onScroll(true);

      // call onInit event
      if (self.options.onInit) {
        self.options.onInit.call(self);
      }

      // remove default user background
      if (self.css(self.$item, 'background-image') !== 'none') {
        self.css(self.$item, {
          'background-image': 'none'
        });
      }
      addObserver(self);
    }
    destroy() {
      const self = this;
      removeObserver(self);

      // return styles on container as before jarallax init
      const originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
      self.$item.removeAttribute('data-jarallax-original-styles');
      // null occurs if there is no style tag before jarallax init
      if (!originalStylesTag) {
        self.$item.removeAttribute('style');
      } else {
        self.$item.setAttribute('style', originalStylesTag);
      }
      if (self.image.useImgTag) {
        // return styles on img tag as before jarallax init
        const originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
        self.image.$item.removeAttribute('data-jarallax-original-styles');
        // null occurs if there is no style tag before jarallax init
        if (!originalStylesImgTag) {
          self.image.$item.removeAttribute('style');
        } else {
          self.image.$item.setAttribute('style', originalStylesTag);
        }

        // move img tag to its default position
        if (self.image.$itemParent) {
          self.image.$itemParent.appendChild(self.image.$item);
        }
      }

      // remove additional dom elements
      if (self.image.$container) {
        self.image.$container.parentNode.removeChild(self.image.$container);
      }

      // call onDestroy event
      if (self.options.onDestroy) {
        self.options.onDestroy.call(self);
      }

      // delete jarallax from item
      delete self.$item.jarallax;
    }
    coverImage() {
      const self = this;
      const {
        height: wndH
      } = getWindowSize();
      const rect = self.image.$container.getBoundingClientRect();
      const contH = rect.height;
      const {
        speed
      } = self.options;
      const isScroll = self.options.type === 'scroll' || self.options.type === 'scroll-opacity';
      let scrollDist = 0;
      let resultH = contH;
      let resultMT = 0;

      // scroll parallax
      if (isScroll) {
        // scroll distance and height for image
        if (speed < 0) {
          scrollDist = speed * Math.max(contH, wndH);
          if (wndH < contH) {
            scrollDist -= speed * (contH - wndH);
          }
        } else {
          scrollDist = speed * (contH + wndH);
        }

        // size for scroll parallax
        if (speed > 1) {
          resultH = Math.abs(scrollDist - wndH);
        } else if (speed < 0) {
          resultH = scrollDist / speed + Math.abs(scrollDist);
        } else {
          resultH += (wndH - contH) * (1 - speed);
        }
        scrollDist /= 2;
      }

      // store scroll distance
      self.parallaxScrollDistance = scrollDist;

      // vertical center
      if (isScroll) {
        resultMT = (wndH - resultH) / 2;
      } else {
        resultMT = (contH - resultH) / 2;
      }

      // apply result to item
      self.css(self.image.$item, {
        height: `${resultH}px`,
        marginTop: `${resultMT}px`,
        left: self.image.position === 'fixed' ? `${rect.left}px` : '0',
        width: `${rect.width}px`
      });

      // call onCoverImage event
      if (self.options.onCoverImage) {
        self.options.onCoverImage.call(self);
      }

      // return some useful data. Used in the video cover function
      return {
        image: {
          height: resultH,
          marginTop: resultMT
        },
        container: rect
      };
    }
    isVisible() {
      return this.isElementInViewport || false;
    }
    onScroll(force) {
      const self = this;

      // stop calculations if item is not in viewport
      if (!force && !self.isVisible()) {
        return;
      }
      const {
        height: wndH
      } = getWindowSize();
      const rect = self.$item.getBoundingClientRect();
      const contT = rect.top;
      const contH = rect.height;
      const styles = {};

      // calculate parallax helping variables
      const beforeTop = Math.max(0, contT);
      const beforeTopEnd = Math.max(0, contH + contT);
      const afterTop = Math.max(0, -contT);
      const beforeBottom = Math.max(0, contT + contH - wndH);
      const beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
      const afterBottom = Math.max(0, -contT + wndH - contH);
      const fromViewportCenter = 1 - 2 * ((wndH - contT) / (wndH + contH));

      // calculate on how percent of section is visible
      let visiblePercent = 1;
      if (contH < wndH) {
        visiblePercent = 1 - (afterTop || beforeBottom) / contH;
      } else if (beforeTopEnd <= wndH) {
        visiblePercent = beforeTopEnd / wndH;
      } else if (beforeBottomEnd <= wndH) {
        visiblePercent = beforeBottomEnd / wndH;
      }

      // opacity
      if (self.options.type === 'opacity' || self.options.type === 'scale-opacity' || self.options.type === 'scroll-opacity') {
        styles.transform = 'translate3d(0,0,0)';
        styles.opacity = visiblePercent;
      }

      // scale
      if (self.options.type === 'scale' || self.options.type === 'scale-opacity') {
        let scale = 1;
        if (self.options.speed < 0) {
          scale -= self.options.speed * visiblePercent;
        } else {
          scale += self.options.speed * (1 - visiblePercent);
        }
        styles.transform = `scale(${scale}) translate3d(0,0,0)`;
      }

      // scroll
      if (self.options.type === 'scroll' || self.options.type === 'scroll-opacity') {
        let positionY = self.parallaxScrollDistance * fromViewportCenter;

        // fix if parallax block in absolute position
        if (self.image.position === 'absolute') {
          positionY -= contT;
        }
        styles.transform = `translate3d(0,${positionY}px,0)`;
      }
      self.css(self.image.$item, styles);

      // call onScroll event
      if (self.options.onScroll) {
        self.options.onScroll.call(self, {
          section: rect,
          beforeTop,
          beforeTopEnd,
          afterTop,
          beforeBottom,
          beforeBottomEnd,
          afterBottom,
          visiblePercent,
          fromViewportCenter
        });
      }
    }
    onResize() {
      this.coverImage();
    }
  }

  // global definition
  const jarallax = function (items, options, ...args) {
    // check for dom element
    // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    if (typeof HTMLElement === 'object' ? items instanceof HTMLElement : items && typeof items === 'object' && items !== null && items.nodeType === 1 && typeof items.nodeName === 'string') {
      items = [items];
    }
    const len = items.length;
    let k = 0;
    let ret;
    for (k; k < len; k += 1) {
      if (typeof options === 'object' || typeof options === 'undefined') {
        if (!items[k].jarallax) {
          items[k].jarallax = new Jarallax(items[k], options);
        }
      } else if (items[k].jarallax) {
        // eslint-disable-next-line prefer-spread
        ret = items[k].jarallax[options].apply(items[k].jarallax, args);
      }
      if (typeof ret !== 'undefined') {
        return ret;
      }
    }
    return items;
  };
  jarallax.constructor = Jarallax;

  const $ = global$1.jQuery;

  // jQuery support
  if (typeof $ !== 'undefined') {
    const $Plugin = function (...args) {
      Array.prototype.unshift.call(args, this);
      const res = jarallax.apply(global$1, args);
      return typeof res !== 'object' ? res : this;
    };
    $Plugin.constructor = jarallax.constructor;

    // no conflict
    const old$Plugin = $.fn.jarallax;
    $.fn.jarallax = $Plugin;
    $.fn.jarallax.noConflict = function () {
      $.fn.jarallax = old$Plugin;
      return this;
    };
  }

  // data-jarallax initialization
  ready(() => {
    jarallax(document.querySelectorAll('[data-jarallax]'));
  });

  return jarallax;

}));
//# sourceMappingURL=jarallax.js.map
